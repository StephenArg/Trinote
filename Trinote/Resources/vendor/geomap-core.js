/* Trinote geo map — shared MapLibre engine for editor and viewer */
(function (global) {
  const DEFAULT_CENTER = [0, 0];
  const DEFAULT_ZOOM = 2;
  const TRACK_COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#9b59b6", "#f39c12", "#1abc9c"];

  const OSM_RASTER_STYLE = {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
    },
    layers: [{ id: "osm", type: "raster", source: "osm" }],
  };

  const VERSATILES_COLORFUL_PATH = "vendor/geomap-styles/versatiles-colorful.json";

  const SHORTBREAD_SOURCE = "versatiles-shortbread";
  const BUILDINGS_3D_LAYER = "buildings-3d";
  const BUILDINGS_MIN_ZOOM = 14;
  const ASSUMED_BUILDING_HEIGHT = 5;

  // Boxicons bx-trip (Trilium GPX import) — inline SVG so WKWebView does not depend on font loading.
  const GPX_TRIP_ICON_SVG =
    '<svg class="geomap-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="currentColor" d="M14.844 20H6.5C5.121 20 4 18.879 4 17.5S5.121 15 6.5 15h7c1.93 0 3.5-1.57 3.5-3.5S15.43 8 13.5 8H8.639a9.812 9.812 0 0 1-1.354 2H13.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-7C4.019 13 2 15.019 2 17.5S4.019 22 6.5 22h9.593a10.415 10.415 0 0 1-1.249-2zM5 2C3.346 2 2 3.346 2 5c0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 5 6.5z"/>' +
    '<path fill="currentColor" d="M19 14c-1.654 0-3 1.346-3 3 0 3.188 3 5 3 5s3-1.813 3-5c0-1.654-1.346-3-3-3zm0 4.5a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 19 18.5z"/>' +
    "</svg>";

  const TRACK_HIT_WIDTH = 20;
  const TRACK_MARKS_DETAIL_ZOOM = 12;
  const TRACK_END_ICON = "tn-icon bx bxs-flag-checkered";
  const TRACK_WAYPOINT_ICON = "tn-icon bx bx-pin";

  function post(handler, payload) {
    try {
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[handler]) {
        window.webkit.messageHandlers[handler].postMessage(payload);
      }
    } catch (e) {}
  }

  function logMarkers(message) {
    post("geoMapDebugLog", String(message));
  }

  function imageDimensions(image) {
    if (!image) return "null";
    const w = image.naturalWidth || image.width;
    const h = image.naturalHeight || image.height;
    if (w && h) return w + "x" + h;
    if (image.data && image.width && image.height) return image.width + "x" + image.height + " (ImageData)";
    return typeof image;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str || ""));
    return div.innerHTML;
  }

  function normalizeCenter(c) {
    if (c == null) return DEFAULT_CENTER;
    if (Array.isArray(c) && c.length >= 2) return [Number(c[0]), Number(c[1])];
    if (typeof c === "object") {
      const lat = typeof c.lat === "number" ? c.lat : Number(c.lat);
      let lng = typeof c.lng === "number" ? c.lng : Number(c.lng);
      if (!Number.isFinite(lng) && c.Ing != null) lng = Number(c.Ing);
      if (!Number.isFinite(lng) && c.Lng != null) lng = Number(c.Lng);
      if (!Number.isFinite(lng) && c.long != null) lng = Number(c.long);
      if (!Number.isFinite(lng) && c.lon != null) lng = Number(c.lon);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return [lat, lng];
    }
    return DEFAULT_CENTER;
  }

  function decodeInjectedVersatilesStyle() {
    try {
      const b64 = global.__TRINOTE_VERSATILES_COLORFUL_STYLE_B64__;
      if (!b64) return null;
      const binary = atob(b64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return JSON.parse(new TextDecoder("utf-8").decode(bytes));
    } catch (e) {
      return null;
    }
  }

  function fetchLocalJSON(relativePath) {
    const url = new URL(relativePath, window.location.href).href;
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "text";
      xhr.onload = function () {
        if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error("xhr status " + xhr.status));
        }
      };
      xhr.onerror = function () {
        reject(new Error("xhr failed"));
      };
      xhr.send();
    });
  }

  function loadStyleSpec(styleId) {
    const id = styleId === "versatiles-colorful" ? "versatiles-colorful" : "openstreetmap";
    if (id === "openstreetmap") {
      return Promise.resolve(OSM_RASTER_STYLE);
    }
    const injected = decodeInjectedVersatilesStyle();
    if (injected) {
      return Promise.resolve(injected);
    }
    return fetchLocalJSON(VERSATILES_COLORFUL_PATH)
      .catch(function () {
        return fetch(new URL(VERSATILES_COLORFUL_PATH, window.location.href).href).then(function (response) {
          if (!response.ok) throw new Error("style fetch failed: " + response.status);
          return response.json();
        });
      })
      .catch(function (err) {
        post("geoMapJSError", "Failed to load VersaTiles style: " + (err && err.message ? err.message : String(err)));
        return OSM_RASTER_STYLE;
      });
  }

  function createEngine(options) {
    const readOnly = !!options.readOnly;
    const apiName = options.apiName || "geoMapEditor";
    let map = null;
    let scaleControl = null;
    let settings = {
      mapStyle: "openstreetmap",
      showScale: false,
      scaleUnit: "metric",
      hideLabels: true,
      cluster: true,
      is3D: false,
    };
    let markers = [];
    let tracks = [];
    let selectedFeature = null;
    let selectedTrackMark = null;
    let selectedPinMark = null;
    let viewportSaveTimer = null;
    let lastSavedViewportKey = "";
    let buildings3DInstalled = false;
    let invalidateSizeTimer = null;
    let suppressViewportSaveUntil = 0;
    let longPressTimer = null;
    let pendingMoveNoteId = null;
    let is3DEnabled = false;
    let styleLoaded = false;
    let styleRequestId = 0;
    let pendingStyleApply = null;
    let pendingInit = null;
    let markerBuildGeneration = 0;
    const registeredMarkerImages = new Set();

    function getMarkerImages() {
      return global.TrinoteGeoMap && global.TrinoteGeoMap.MarkerImages;
    }
    let markersInstalled = false;
    let lastMarkersDataKey = "";
    let lastMarkerClusterSetting = null;
    let rebuildMarkersScheduled = false;
    let trackBuildGeneration = 0;
    let mapInteractionsWired = false;
    let featureClickSuppressClearUntil = 0;
    let lastTracksDataKey = "";
    function markFeatureClickHandled() {
      featureClickSuppressClearUntil = Date.now() + 250;
    }

    function shouldSuppressMapClickClear() {
      return Date.now() < featureClickSuppressClearUntil;
    }

    function logGeoMapDebug(message) {
      logMarkers("DEBUG " + message);
    }

    function firstExistingLayer(ids) {
      for (let i = 0; i < ids.length; i++) {
        if (map && map.getLayer(ids[i])) return ids[i];
      }
      return null;
    }

    function addFocusLayerBelow(layerSpec, belowCandidates) {
      const beforeId = firstExistingLayer(belowCandidates);
      if (beforeId) {
        map.addLayer(layerSpec, beforeId);
        logGeoMapDebug("addFocusLayerBelow id=" + layerSpec.id + " before=" + beforeId);
      } else {
        map.addLayer(layerSpec);
        logGeoMapDebug("addFocusLayerBelow id=" + layerSpec.id + " before=(top)");
      }
    }

    function suppressViewportSave(ms) {
      suppressViewportSaveUntil = Date.now() + (ms || 1500);
    }

    function suppressViewportFor(ms) {
      suppressViewportSave(ms || 1500);
    }

    let viewportSaveGestureActive = false;

    function invalidateMapSizeSoon() {
      if (!map) return;
      suppressViewportSave(1500);
      if (invalidateSizeTimer) return;
      invalidateSizeTimer = setTimeout(function () {
        invalidateSizeTimer = null;
        try {
          map.resize();
        } catch (e) {}
        setTimeout(function () {
          try {
            map.resize();
          } catch (e) {}
        }, 300);
      }, 50);
    }

    function roundViewportNumber(value, decimals) {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    }

    function viewportKey() {
      if (!map) return "";
      const c = map.getCenter();
      // Match Trilium desktop: only center + zoom are persisted (no pitch/bearing).
      return [c.lat.toFixed(4), c.lng.toFixed(4), map.getZoom().toFixed(2)].join("|");
    }

    function rememberViewportAsSaved() {
      lastSavedViewportKey = viewportKey();
    }

    function saveViewport() {
      if (!map || readOnly) return;
      const key = viewportKey();
      if (key === lastSavedViewportKey) {
        return;
      }
      lastSavedViewportKey = key;
      const c = map.getCenter();
      const payload = JSON.stringify({
        view: {
          center: {
            lat: roundViewportNumber(c.lat, 4),
            lng: roundViewportNumber(c.lng, 4),
          },
          zoom: roundViewportNumber(map.getZoom(), 2),
        },
      });
      post("geoMapViewportChanged", payload);
    }

    function debouncedSaveViewport(source) {
      if (!map || readOnly) return;
      if (source !== "user") {
        return;
      }
      if (Date.now() < suppressViewportSaveUntil) {
        return;
      }
      const key = viewportKey();
      if (key === lastSavedViewportKey) {
        return;
      }
      if (viewportSaveTimer) clearTimeout(viewportSaveTimer);
      viewportSaveTimer = setTimeout(saveViewport, 2000);
    }

    function clearMovePinMode() {
      pendingMoveNoteId = null;
      const b = document.getElementById("move-mode-banner");
      if (b) b.classList.remove("visible");
    }

    function startMovePinMode(noteId) {
      if (readOnly) return;
      pendingMoveNoteId = noteId;
      const b = document.getElementById("move-mode-banner");
      const t = document.getElementById("move-mode-text");
      if (t) t.textContent = "Long-press the map to place this pin at a new location.";
      if (b) b.classList.add("visible");
    }

    function markersToGeoJSON(list) {
      const defaultIcon = getMarkerImages() ? getMarkerImages().DEFAULT_ICON_CLASS : "tn-icon bx bx-map-pin";
      return {
        type: "FeatureCollection",
        features: list.map((pin) => {
          const color = pin.color || "#3388ff";
          const iconClass = pin.iconClass || defaultIcon;
          const markerImage = getMarkerImages()
            ? getMarkerImages().markerImageId(color, iconClass)
            : "marker-fallback";
          return {
            type: "Feature",
            geometry: { type: "Point", coordinates: [pin.lng, pin.lat] },
            properties: {
              noteId: pin.noteId,
              title: pin.title || "",
              color,
              iconClass,
              markerImage,
            },
          };
        }),
      };
    }

    function unregisterMarkerImages() {
      if (!map) return;
      registeredMarkerImages.forEach(function (id) {
        try {
          if (map.hasImage(id)) map.removeImage(id);
        } catch (e) {}
      });
      registeredMarkerImages.clear();
    }

    function summarizeTrackMarks(markFeatures) {
      let summary = 0;
      let detail = 0;
      const sample = [];
      (markFeatures || []).forEach(function (feature) {
        const props = feature.properties || {};
        if (props.markDetail) detail++;
        else summary++;
        if (sample.length < 4) {
          const coords = feature.geometry && feature.geometry.coordinates;
          sample.push({
            noteId: props.noteId,
            markDetail: !!props.markDetail,
            markerImage: props.markerImage,
            title: props.title || "",
            lng: coords ? coords[0] : null,
            lat: coords ? coords[1] : null,
          });
        }
      });
      return { total: (markFeatures || []).length, summary: summary, detail: detail, sample: sample };
    }

    function queryRenderedTrackMarks() {
      const layers = trackMarksLayerIds();
      if (!map || !layers.length) {
        return { layerExists: false, rendered: 0, sample: [] };
      }
      try {
        const rendered = map.queryRenderedFeatures({ layers: layers }) || [];
        return {
          layerExists: true,
          rendered: rendered.length,
          sample: rendered.slice(0, 3).map(function (feature) {
            const props = feature.properties || {};
            return {
              noteId: props.noteId,
              markerImage: props.markerImage,
              markDetail: props.markDetail,
              title: props.title || "",
            };
          }),
        };
      } catch (e) {
        return { layerExists: true, rendered: -1, error: e && e.message ? e.message : String(e) };
      }
    }

    function queryRenderedPins() {
      if (!map || !map.getLayer("unclustered-pin")) {
        return { layerExists: false, rendered: 0, sample: [] };
      }
      try {
        const rendered = map.queryRenderedFeatures({ layers: ["unclustered-pin"] }) || [];
        return {
          layerExists: true,
          rendered: rendered.length,
          sample: rendered.slice(0, 3).map(function (feature) {
            const props = feature.properties || {};
            return {
              noteId: props.noteId,
              markerImage: props.markerImage,
              title: props.title || "",
            };
          }),
        };
      } catch (e) {
        return { layerExists: true, rendered: -1, error: e && e.message ? e.message : String(e) };
      }
    }

    function trackCenter(track) {
      let minLng = Infinity;
      let minLat = Infinity;
      let maxLng = -Infinity;
      let maxLat = -Infinity;
      (track.lines || []).forEach(function (line) {
        (line || []).forEach(function (coord) {
          const lng = Number(coord[0]);
          const lat = Number(coord[1]);
          if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;
          if (lng < minLng) minLng = lng;
          if (lat < minLat) minLat = lat;
          if (lng > maxLng) maxLng = lng;
          if (lat > maxLat) maxLat = lat;
        });
      });
      if (!Number.isFinite(minLng)) return null;
      return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
    }

    function readTrackMarks(track, pinColor, defaultIconClass) {
      const marks = [];
      const noteId = track.noteId;
      const noteTitle = track.title || "";
      const summaryTitle = track.summaryTitle || noteTitle;
      const lineNames = track.lineNames || [];
      const startIcon = track.iconClass || defaultIconClass;

      function addMark(coordinates, iconClass, markTitle, markDetail, markId) {
        if (!getMarkerImages()) return;
        marks.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: coordinates },
          properties: {
            noteId: noteId,
            markerImage: getMarkerImages().markerImageId(pinColor, iconClass),
            title: markTitle || "",
            kind: "track-mark",
            markDetail: markDetail ? 1 : 0,
            markId: markId,
          },
        });
      }

      const center = trackCenter(track);
      if (center) {
        addMark(center, startIcon, summaryTitle, false, "summary");
      }

      (track.lines || []).forEach(function (line, lineIndex) {
        if (!line || line.length === 0) return;
        const lineTitle = lineNames[lineIndex] || summaryTitle;
        addMark(line[0], startIcon, lineTitle, true, "line-start:" + lineIndex);
        const end = line[line.length - 1];
        if (end && line.length > 1 && (end[0] !== line[0][0] || end[1] !== line[0][1])) {
          addMark(end, TRACK_END_ICON, "", true, "line-end:" + lineIndex);
        }
      });

      if (track.waypoints) {
        track.waypoints.forEach(function (waypoint, waypointIndex) {
          const lng = Number(waypoint.lng);
          const lat = Number(waypoint.lat);
          if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;
          addMark([lng, lat], TRACK_WAYPOINT_ICON, waypoint.name || "", true, "waypoint:" + waypointIndex);
        });
      }

      logMarkers(
        "readTrackMarks noteId=" +
          String(noteId).slice(0, 8) +
          " startIcon=" +
          startIcon +
          " pinColor=" +
          pinColor +
          " marks=" +
          marks.length +
          " center=" +
          (center ? center[0].toFixed(4) + "," + center[1].toFixed(4) : "none") +
          " lines=" +
          (track.lines ? track.lines.length : 0) +
          " waypoints=" +
          (track.waypoints ? track.waypoints.length : 0)
      );

      return marks;
    }

    function buildTrackGeoJSON(list) {
      const lineFeatures = [];
      const markFeatures = [];
      const defaultIcon = getMarkerImages() ? getMarkerImages().DEFAULT_ICON_CLASS : "tn-icon bx bx-map-pin";

      list.forEach(function (track, trackIndex) {
        const color = track.color || TRACK_COLORS[trackIndex % TRACK_COLORS.length];
        const lineNames = track.lineNames || [];
        const summaryTitle = track.summaryTitle || track.title || "";
        (track.lines || []).forEach(function (line, lineIndex) {
          if (!line || line.length < 2) return;
          lineFeatures.push({
            type: "Feature",
            geometry: { type: "LineString", coordinates: line },
            properties: {
              noteId: track.noteId,
              title: lineNames[lineIndex] || summaryTitle,
              color: color,
              lineIndex: lineIndex,
            },
          });
        });
        markFeatures.push.apply(markFeatures, readTrackMarks(track, color, defaultIcon));
      });

      const markSummary = summarizeTrackMarks(markFeatures);
      logMarkers(
        "buildTrackGeoJSON lines=" +
          lineFeatures.length +
          " marks=" +
          markSummary.total +
          " summaryMarks=" +
          markSummary.summary +
          " detailMarks=" +
          markSummary.detail +
          " sample=" +
          JSON.stringify(markSummary.sample)
      );

      return { lineFeatures: lineFeatures, markFeatures: markFeatures };
    }

    function trackMarkImageSpecs(markFeatures) {
      const specs = new Map();
      markFeatures.forEach(function (feature) {
        const imageId = feature.properties && feature.properties.markerImage;
        if (!imageId || specs.has(imageId)) return;
        const parts = String(imageId).split("|");
        if (parts.length < 3) return;
        specs.set(imageId, { color: parts[1], iconClass: parts.slice(2).join("|") });
      });
      return specs;
    }

    function collectUsedTrackMarkImageIds() {
      const ids = new Set();
      if (!tracks.length || !getMarkerImages()) return ids;
      const built = buildTrackGeoJSON(tracks);
      built.markFeatures.forEach(function (feature) {
        const imageId = feature.properties && feature.properties.markerImage;
        if (imageId) ids.add(imageId);
      });
      return ids;
    }

    function mergeTrackMarkImageIds(usedIds) {
      collectUsedTrackMarkImageIds().forEach(function (id) {
        usedIds.add(id);
      });
      return usedIds;
    }

    function trackMarksLayerIds() {
      const layers = [];
      if (map && map.getLayer("tracks-marks-summary")) layers.push("tracks-marks-summary");
      if (map && map.getLayer("tracks-marks-detail")) layers.push("tracks-marks-detail");
      if (!layers.length && map && map.getLayer("tracks-marks")) layers.push("tracks-marks");
      return layers;
    }

    function ensureTrackMarkImagesRegistered() {
      if (!map || !tracks.length || !getMarkerImages() || !trackMarksLayerIds().length) return;
      const specs = trackMarkImageSpecs(buildTrackGeoJSON(tracks).markFeatures);
      specs.forEach(function (spec, id) {
        if (map.hasImage(id)) return;
        getMarkerImages().buildMarkerImage(spec.color, spec.iconClass).then(function (image) {
          if (image && map) registerMapImage(id, image);
        });
      });
    }

    function updateTrackMarkLabelLayout() {
      if (!map) return;
      const layoutValue = settings.hideLabels ? "" : ["get", "title"];
      trackMarksLayerIds().forEach(function (layerId) {
        map.setLayoutProperty(layerId, "text-field", layoutValue);
      });
    }

    function markersDataKey(list) {
      const defaultIcon = getMarkerImages() ? getMarkerImages().DEFAULT_ICON_CLASS : "tn-icon bx bx-map-pin";
      return JSON.stringify(
        (list || []).map(function (pin) {
          return {
            noteId: pin.noteId,
            title: pin.title || "",
            lat: pin.lat,
            lng: pin.lng,
            color: pin.color || "#3388ff",
            iconClass: pin.iconClass || defaultIcon,
          };
        })
      );
    }

    function tracksDataKey(list) {
      return JSON.stringify(
        (list || []).map(function (track) {
          return {
            noteId: track.noteId,
            title: track.title || "",
            summaryTitle: track.summaryTitle || "",
            lineCount: track.lines ? track.lines.length : 0,
            waypointCount: track.waypoints ? track.waypoints.length : 0,
            color: track.color || "",
            iconClass: track.iconClass || "",
          };
        })
      );
    }

    function updateMarkerLabelLayout() {
      if (!map || !map.getLayer("unclustered-pin")) return;
      map.setLayoutProperty(
        "unclustered-pin",
        "text-field",
        settings.hideLabels ? "" : ["get", "title"]
      );
    }

    function pruneMarkerImages(usedIds) {
      if (!map) return;
      registeredMarkerImages.forEach(function (id) {
        if (!usedIds.has(id)) {
          try {
            if (map.hasImage(id)) map.removeImage(id);
          } catch (e) {}
          registeredMarkerImages.delete(id);
        }
      });
    }

    function registerMapImage(id, image) {
      if (!map) {
        logMarkers("registerMapImage SKIP map=null id=" + id);
        return false;
      }
      if (!image) {
        logMarkers("registerMapImage SKIP image=null id=" + id);
        return false;
      }
      if (map.hasImage(id)) {
        logMarkers("registerMapImage already registered id=" + id);
        return true;
      }
      try {
        const pixelRatio =
          image && image.__pixelRatio
            ? image.__pixelRatio
            : getMarkerImages() && getMarkerImages().devicePixelRatio
              ? getMarkerImages().devicePixelRatio()
              : window.devicePixelRatio || 1;
        map.addImage(id, image, { pixelRatio: pixelRatio });
        logMarkers("registerMapImage addImage id=" + id + " pixelRatio=" + pixelRatio);
      } catch (e) {
        post(
          "geoMapJSError",
          "map.addImage threw for " + id + " — " + (e && e.message ? e.message : String(e))
        );
        return false;
      }
      if (!map.hasImage(id)) {
        logMarkers("registerMapImage FAILED hasImage=false id=" + id + " dims=" + imageDimensions(image));
        return false;
      }
      registeredMarkerImages.add(id);
      logMarkers("registerMapImage OK id=" + id + " dims=" + imageDimensions(image));
      return true;
    }

    function styleHasGlyphs() {
      return !!(map && map.getStyle() && map.getStyle().glyphs);
    }

    function installMarkerLayers(geojson) {
      try {
        map.addSource("markers", {
          type: "geojson",
          data: geojson,
          cluster: settings.cluster,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
        lastMarkerClusterSetting = settings.cluster;

        if (settings.cluster) {
          map.addLayer({
            id: "clusters",
            type: "circle",
            source: "markers",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": "#51bbd6",
              "circle-radius": ["step", ["get", "point_count"], 18, 10, 22, 30, 28],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff",
            },
          });
          if (styleHasGlyphs()) {
            map.addLayer({
              id: "cluster-count",
              type: "symbol",
              source: "markers",
              filter: ["has", "point_count"],
              layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["Open Sans Regular"],
                "text-size": 12,
              },
              paint: { "text-color": "#fff" },
            });
          }
        }

        const pinLayout = {
          "icon-image": ["get", "markerImage"],
          "icon-size": 1,
          "icon-anchor": "bottom",
          "icon-offset": [0, getMarkerImages().MARKER_SHADOW_PADDING],
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "text-field": settings.hideLabels || !styleHasGlyphs() ? "" : ["get", "title"],
          "text-size": 11,
          "text-offset": [0, 0.5],
          "text-anchor": "top",
          "text-max-width": 12,
          "text-optional": true,
        };
        if (styleHasGlyphs()) {
          pinLayout["text-font"] = ["Open Sans Regular"];
        }

        map.addLayer({
          id: "unclustered-pin",
          type: "symbol",
          source: "markers",
          filter: settings.cluster ? ["!", ["has", "point_count"]] : ["all"],
          layout: pinLayout,
          paint: {
            "text-color": "#222222",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1,
          },
        });
        markersInstalled = true;
        logMarkers(
          "installMarkerLayers OK features=" +
            (geojson.features ? geojson.features.length : 0) +
            " cluster=" +
            settings.cluster +
            " glyphs=" +
            styleHasGlyphs()
        );
      } catch (e) {
        post("geoMapJSError", "Marker layers failed: " + (e && e.message ? e.message : String(e)));
        installMarkerCircleFallback(geojson);
      }
    }

    function installMarkerCircleFallback(geojson) {
      try {
        if (!map.getSource("markers")) {
          map.addSource("markers", {
            type: "geojson",
            data: geojson,
            cluster: settings.cluster,
            clusterMaxZoom: 14,
            clusterRadius: 50,
          });
        }
        if (!map.getLayer("unclustered-pin-fallback")) {
          map.addLayer({
            id: "unclustered-pin-fallback",
            type: "circle",
            source: "markers",
            filter: settings.cluster ? ["!", ["has", "point_count"]] : ["all"],
            paint: {
              "circle-color": ["coalesce", ["get", "color"], "#3388ff"],
              "circle-radius": 8,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff",
            },
          });
        }
        markersInstalled = true;
        logMarkers(
          "installMarkerCircleFallback OK features=" +
            (geojson.features ? geojson.features.length : 0) +
            " cluster=" +
            settings.cluster
        );
      } catch (err) {
        post("geoMapJSError", "Marker fallback failed: " + (err && err.message ? err.message : String(err)));
      }
    }

    function removeMarkerLayers() {
      if (!map) return;
      [
        "clusters",
        "cluster-count",
        "unclustered-pin",
        "unclustered-pin-fallback",
        "selected-pin",
      ].forEach(function (id) {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      if (map.getSource("markers")) map.removeSource("markers");
      markersInstalled = false;
      lastMarkerClusterSetting = null;
    }

    function removeTrackLayers() {
      if (!map) return;
      ["tracks-line", "tracks-hit", "tracks-marks-summary", "tracks-marks-detail", "tracks-selected", "tracks-mark-focus"].forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      if (map.getSource("tracks")) map.removeSource("tracks");
      if (map.getSource("tracks-mark-focus")) map.removeSource("tracks-mark-focus");
    }

    function installTrackLayers(lineFeatures, markFeatures, images) {
      const markSummary = summarizeTrackMarks(markFeatures);
      logMarkers(
        "installTrackLayers START lines=" +
          lineFeatures.length +
          " marks=" +
          markSummary.total +
          " images=" +
          images.size +
          " zoom=" +
          (map ? map.getZoom() : null) +
          " detailZoomThreshold=" +
          TRACK_MARKS_DETAIL_ZOOM +
          " markSample=" +
          JSON.stringify(markSummary.sample)
      );

      const allFeatures = lineFeatures.concat(markFeatures);
      map.addSource("tracks", {
        type: "geojson",
        data: { type: "FeatureCollection", features: allFeatures },
      });

      map.addLayer({
        id: "tracks-line",
        type: "line",
        source: "tracks",
        filter: ["==", ["geometry-type"], "LineString"],
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": ["get", "color"],
          "line-width": 4,
          "line-opacity": 0.85,
        },
      });

      map.addLayer({
        id: "tracks-hit",
        type: "line",
        source: "tracks",
        filter: ["==", ["geometry-type"], "LineString"],
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": ["get", "color"],
          "line-opacity": 0,
          "line-width": TRACK_HIT_WIDTH,
        },
      });

      if (markFeatures.length > 0 && getMarkerImages()) {
        let registeredMarkImages = 0;
        const failedImageIds = [];
        images.forEach(function (image, id) {
          if (registerMapImage(id, image)) {
            registeredMarkImages++;
          } else {
            failedImageIds.push(id);
          }
        });

        logMarkers(
          "installTrackLayers images registered=" +
            registeredMarkImages +
            "/" +
            images.size +
            (failedImageIds.length ? " failed=" + JSON.stringify(failedImageIds.slice(0, 5)) : "")
        );

        if (!registeredMarkImages) {
          logMarkers("installTrackLayers marks skipped — no images registered");
          highlightSelection();
          return;
        }

        const trackMarkLayout = {
          "icon-image": ["get", "markerImage"],
          "icon-size": 1,
          "icon-anchor": "bottom",
          "icon-offset": [0, getMarkerImages().MARKER_SHADOW_PADDING],
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "text-field": settings.hideLabels || !styleHasGlyphs() ? "" : ["get", "title"],
          ...(styleHasGlyphs() ? { "text-font": ["Open Sans Regular"] } : {}),
          "text-size": 12,
          "text-anchor": "top",
          "text-offset": [0, 0.5],
          "text-optional": true,
        };
        const trackMarkPaint = {
          "text-color": "#1c1c1e",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        };

        map.addLayer({
          id: "tracks-marks-summary",
          type: "symbol",
          source: "tracks",
          maxzoom: TRACK_MARKS_DETAIL_ZOOM,
          filter: ["all", ["==", ["get", "kind"], "track-mark"], ["==", ["get", "markDetail"], 0]],
          layout: trackMarkLayout,
          paint: trackMarkPaint,
        });

        map.addLayer({
          id: "tracks-marks-detail",
          type: "symbol",
          source: "tracks",
          minzoom: TRACK_MARKS_DETAIL_ZOOM,
          filter: ["all", ["==", ["get", "kind"], "track-mark"], ["==", ["get", "markDetail"], 1]],
          layout: trackMarkLayout,
          paint: trackMarkPaint,
        });
        logMarkers(
          "installTrackLayers tracks-marks ADDED zoom=" +
            map.getZoom() +
            " glyphs=" +
            styleHasGlyphs() +
            " hideLabels=" +
            settings.hideLabels +
            " rendered=" +
            JSON.stringify(queryRenderedTrackMarks())
        );
      } else {
        logMarkers(
          "installTrackLayers NO marks layer markFeatures=" +
            markFeatures.length +
            " markerImagesModule=" +
            !!getMarkerImages()
        );
      }

      highlightSelection();
    }

    function rebuildMarkersNow() {
      if (!map || !styleLoaded) {
        logMarkers(
          "rebuildMarkersNow DEFERRED map=" +
            !!map +
            " styleLoaded=" +
            styleLoaded +
            " pendingPins=" +
            markers.length
        );
        return;
      }

      if (!markers.length) {
        logMarkers("rebuildMarkersNow CLEAR pins=0 markersInstalled=" + markersInstalled);
        if (markersInstalled) {
          removeMarkerLayers();
          pruneMarkerImages(mergeTrackMarkImageIds(new Set()));
        }
        lastMarkersDataKey = "";
        return;
      }
      if (!getMarkerImages()) {
        post("geoMapJSError", "Marker image module missing");
        return;
      }

      const dataKey = markersDataKey(markers);
      if (
        dataKey === lastMarkersDataKey &&
        markersInstalled &&
        lastMarkerClusterSetting === settings.cluster &&
        map.getSource("markers")
      ) {
        logMarkers("rebuildMarkersNow SKIP unchanged pins=" + markers.length);
        updateMarkerLabelLayout();
        return;
      }

      const generation = ++markerBuildGeneration;
      logMarkers(
        "rebuildMarkersNow START pins=" +
          markers.length +
          " cluster=" +
          settings.cluster +
          " gen=" +
          generation
      );
      getMarkerImages().buildForMarkers(markers).then(function (built) {
        if (!map || !styleLoaded || generation !== markerBuildGeneration) {
          logMarkers(
            "rebuildMarkersNow ABORT after rasterize map=" +
              !!map +
              " styleLoaded=" +
              styleLoaded +
              " genMatch=" +
              (generation === markerBuildGeneration)
          );
          return;
        }

        const geojson = { type: "FeatureCollection", features: built.features };
        const usedImageIds = new Set();
        built.images.forEach(function (_image, id) {
          usedImageIds.add(id);
        });

        let registeredCount = 0;
        built.images.forEach(function (image, id) {
          if (registerMapImage(id, image)) registeredCount++;
        });
        logMarkers(
          "rebuildMarkersNow RASTERIZED features=" +
            built.features.length +
            " builtImages=" +
            built.images.size +
            " registered=" +
            registeredCount
        );
        if (!registeredCount && built.features.length) {
          post("geoMapJSError", "No marker images were registered");
        }
        mergeTrackMarkImageIds(usedImageIds);
        pruneMarkerImages(usedImageIds);
        ensureTrackMarkImagesRegistered();

        const clusterChanged = markersInstalled && lastMarkerClusterSetting !== settings.cluster;
        const useCircleFallback = registeredCount === 0 && built.features.length > 0;
        if (markersInstalled && map.getSource("markers") && !clusterChanged && !useCircleFallback) {
          map.getSource("markers").setData(geojson);
          updateMarkerLabelLayout();
          lastMarkersDataKey = dataKey;
          logMarkers("rebuildMarkersNow UPDATED source data features=" + built.features.length);
          return;
        }

        if (markersInstalled || map.getSource("markers")) {
          removeMarkerLayers();
        }
        if (useCircleFallback) {
          logMarkers("rebuildMarkersNow using circle fallback");
          installMarkerCircleFallback(geojson);
        } else {
          installMarkerLayers(geojson);
        }
        lastMarkersDataKey = dataKey;
        logMarkers(
          "rebuildMarkersNow DONE hasSource=" +
            !!map.getSource("markers") +
            " hasPinLayer=" +
            !!map.getLayer("unclustered-pin") +
            " hasPinFallback=" +
            !!map.getLayer("unclustered-pin-fallback") +
            " renderedPins=" +
            JSON.stringify(queryRenderedPins())
        );
        scheduleTrackMarksVisibilityLog();
      });
    }

    function scheduleRebuildMarkers() {
      if (rebuildMarkersScheduled) return;
      rebuildMarkersScheduled = true;
      requestAnimationFrame(function () {
        rebuildMarkersScheduled = false;
        rebuildMarkersNow();
      });
    }

    function rebuildMarkers() {
      scheduleRebuildMarkers();
    }

    function rebuildTracks() {
      if (!map || !styleLoaded) {
        logMarkers(
          "rebuildTracks DEFERRED map=" + !!map + " styleLoaded=" + styleLoaded + " pendingTracks=" + tracks.length
        );
        return;
      }
      removeTrackLayers();
      if (!tracks.length) {
        logMarkers("rebuildTracks CLEAR tracks=0");
        return;
      }
      if (!getMarkerImages()) {
        logMarkers("rebuildTracks SKIP MarkerImages missing");
        return;
      }

      const built = buildTrackGeoJSON(tracks);
      logMarkers(
        "rebuildTracks START tracks=" +
          tracks.length +
          " lines=" +
          built.lineFeatures.length +
          " marks=" +
          built.markFeatures.length
      );
      const generation = ++trackBuildGeneration;
      const imageSpecs = trackMarkImageSpecs(built.markFeatures);

      Promise.all(
        Array.from(imageSpecs.entries()).map(function (entry) {
          return getMarkerImages().buildMarkerImage(entry[1].color, entry[1].iconClass).then(function (image) {
            return image ? [entry[0], image] : null;
          });
        })
      ).then(function (pairs) {
        if (!map || !styleLoaded || generation !== trackBuildGeneration) {
          logMarkers(
            "rebuildTracks ABORT after rasterize map=" +
              !!map +
              " styleLoaded=" +
              styleLoaded +
              " genMatch=" +
              (generation === trackBuildGeneration)
          );
          return;
        }
        const images = new Map();
        pairs.forEach(function (pair) {
          if (pair) images.set(pair[0], pair[1]);
        });
        installTrackLayers(built.lineFeatures, built.markFeatures, images);
        logMarkers(
          "rebuildTracks DONE hasTracksSource=" +
            !!map.getSource("tracks") +
            " hasMarksLayer=" +
            !!trackMarksLayerIds().length +
            " zoom=" +
            (map ? map.getZoom() : null) +
            " renderedTrackMarks=" +
            JSON.stringify(queryRenderedTrackMarks())
        );
        scheduleTrackMarksVisibilityLog();
      });
    }

    function scheduleTrackMarksVisibilityLog() {
      // Debug-only; queryRenderedFeatures is expensive on the render thread.
    }

    function updateScaleControl() {
      if (!map) return;
      if (scaleControl) {
        try {
          map.removeControl(scaleControl);
        } catch (e) {}
        scaleControl = null;
      }
      if (settings.showScale) {
        const unit = settings.scaleUnit === "imperial" ? "imperial" : "metric";
        scaleControl = new maplibregl.ScaleControl({ maxWidth: 120, unit });
        map.addControl(scaleControl, "bottom-left");
      }
    }

    function flatBuildingLayerIds() {
      if (!map || !map.getStyle()) return [];
      return map
        .getStyle()
        .layers.filter(function (layer) {
          return (
            "source-layer" in layer &&
            layer["source-layer"] === "buildings" &&
            layer.type === "fill"
          );
        })
        .map(function (layer) {
          return layer.id;
        });
    }

    function firstSymbolLayerId() {
      if (!map || !map.getStyle()) return undefined;
      const symbol = map.getStyle().layers.find(function (layer) {
        return layer.type === "symbol";
      });
      return symbol ? symbol.id : undefined;
    }

    function buildings3DLayerSpec() {
      return {
        id: BUILDINGS_3D_LAYER,
        type: "fill-extrusion",
        source: SHORTBREAD_SOURCE,
        "source-layer": "buildings",
        minzoom: BUILDINGS_MIN_ZOOM,
        filter: ["!=", ["get", "hide_3d"], true],
        paint: {
          "fill-extrusion-color": "#d8d3cc",
          "fill-extrusion-height": ["coalesce", ["get", "height"], ASSUMED_BUILDING_HEIGHT],
          "fill-extrusion-base": ["coalesce", ["get", "min_height"], 0],
          "fill-extrusion-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            BUILDINGS_MIN_ZOOM,
            0,
            BUILDINGS_MIN_ZOOM + 1,
            1,
          ],
        },
      };
    }

    function hasShortbreadSource() {
      return !!(map && map.getSource(SHORTBREAD_SOURCE));
    }

    function is3DViewActive() {
      return is3DEnabled;
    }

    function onMapPitchEndFor3D() {
      if (!is3DEnabled) {
        if (buildings3DInstalled) uninstallBuildings3D();
        return;
      }
      if (!buildings3DInstalled) updateBuildings3D();
    }

    function installBuildings3D() {
      if (!map || !styleLoaded) return false;
      try {
        if (map.getLayer(BUILDINGS_3D_LAYER)) {
          map.removeLayer(BUILDINGS_3D_LAYER);
        }
        if (!hasShortbreadSource()) return false;
        map.addLayer(buildings3DLayerSpec(), firstSymbolLayerId());
        flatBuildingLayerIds().forEach(function (id) {
          map.setLayoutProperty(id, "visibility", "none");
        });
        return true;
      } catch (e) {
        post(
          "geoMapJSError",
          "3D buildings layer failed: " + (e && e.message ? e.message : String(e))
        );
        return false;
      }
    }

    function uninstallBuildings3D() {
      if (!map || !buildings3DInstalled) return;
      if (map.getLayer(BUILDINGS_3D_LAYER)) {
        map.removeLayer(BUILDINGS_3D_LAYER);
      }
      flatBuildingLayerIds().forEach(function (id) {
        map.setLayoutProperty(id, "visibility", "visible");
      });
      buildings3DInstalled = false;
    }

    function updateBuildings3D() {
      if (!map || !styleLoaded) return;
      const want3D = is3DViewActive() && hasShortbreadSource();
      if (want3D === buildings3DInstalled) {
        return;
      }
      if (want3D) {
        buildings3DInstalled = installBuildings3D();
      } else {
        uninstallBuildings3D();
      }
    }

    function scheduleBuildings3DRefresh() {
      updateBuildings3D();
      if (!map) return;
      map.once("pitchend", updateBuildings3D);
      map.once("moveend", updateBuildings3D);
      map.once("idle", updateBuildings3D);
      setTimeout(updateBuildings3D, 450);
    }

    function onShortbreadSourceData(e) {
      if (!e || e.sourceId !== SHORTBREAD_SOURCE) return;
      if (!is3DEnabled || buildings3DInstalled) return;
      if (e.isSourceLoaded || e.tile) {
        updateBuildings3D();
      }
    }

    function set3DInternal(enabled) {
      if (!map) return;
      is3DEnabled = enabled;
      suppressViewportFor(1200);
      map.easeTo({ pitch: enabled ? 60 : 0, duration: 400 });
      const btn = document.getElementById("geomap-btn-3d");
      if (btn) {
        btn.classList.toggle("active", enabled);
        btn.textContent = enabled ? "2D" : "3D";
      }
      if (!enabled) {
        updateBuildings3D();
      } else {
        scheduleBuildings3DRefresh();
      }
      post("geoMap3DChanged", JSON.stringify({ enabled }));
    }

    function selectFeatureInternal(noteId, kind) {
      selectedFeature = { noteId, kind };
      if (kind === "pin") {
        selectedTrackMark = null;
        const pin = markers.find(function (m) {
          return m.noteId === noteId;
        });
        selectedPinMark = pin ? { noteId: noteId, lng: pin.lng, lat: pin.lat } : null;
      } else if (kind === "track") {
        selectedPinMark = null;
        selectedTrackMark = null;
      } else {
        selectedTrackMark = null;
        selectedPinMark = null;
      }
      highlightSelection();
    }

    function clearSelectionInternal() {
      selectedFeature = null;
      selectedTrackMark = null;
      selectedPinMark = null;
      highlightSelection();
      post("geoMapSelectionCleared", "");
    }

    function removePinFocusLayer() {
      if (!map) return;
      if (map.getLayer("pins-mark-focus")) map.removeLayer("pins-mark-focus");
      if (map.getSource("pins-mark-focus")) map.removeSource("pins-mark-focus");
    }

    function removeTrackMarkFocusLayer() {
      if (!map) return;
      if (map.getLayer("tracks-mark-focus")) map.removeLayer("tracks-mark-focus");
      if (map.getSource("tracks-mark-focus")) map.removeSource("tracks-mark-focus");
    }

    function highlightSelectedTrackMark() {
      removeTrackMarkFocusLayer();
      if (!map || !selectedTrackMark) return;
      map.addSource("tracks-mark-focus", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [selectedTrackMark.lng, selectedTrackMark.lat],
          },
          properties: {
            noteId: selectedTrackMark.noteId,
            markId: selectedTrackMark.markId,
          },
        },
      });
      addFocusLayerBelow(
        {
          id: "tracks-mark-focus",
          type: "circle",
          source: "tracks-mark-focus",
          paint: {
            "circle-radius": 20,
            "circle-color": "#ffcc00",
            "circle-opacity": 0.28,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffcc00",
          },
        },
        ["tracks-marks-summary", "tracks-marks-detail"]
      );
    }

    function highlightSelectedPin() {
      removePinFocusLayer();
      if (!map || !selectedPinMark) return;
      map.addSource("pins-mark-focus", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [selectedPinMark.lng, selectedPinMark.lat],
          },
          properties: {
            noteId: selectedPinMark.noteId,
          },
        },
      });
      addFocusLayerBelow(
        {
          id: "pins-mark-focus",
          type: "circle",
          source: "pins-mark-focus",
          paint: {
            "circle-radius": 20,
            "circle-color": "#ffcc00",
            "circle-opacity": 0.28,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffcc00",
          },
        },
        ["unclustered-pin", "unclustered-pin-fallback", "clusters"]
      );
    }

    function focusTrackMarkInternal(noteId, markId, lng, lat) {
      if (!map) return;
      selectedFeature = { noteId: noteId, kind: "track" };
      selectedPinMark = null;
      selectedTrackMark = { noteId: noteId, markId: markId, lng: lng, lat: lat };
      highlightSelection();
      const zoom = Math.max(map.getZoom(), TRACK_MARKS_DETAIL_ZOOM);
      suppressViewportFor(2000);
      map.flyTo({
        center: [lng, lat],
        zoom: zoom,
        duration: 650,
        essential: true,
      });
    }

    function highlightSelection() {
      if (!map || !styleLoaded) return;
      if (map.getLayer("tracks-selected")) map.removeLayer("tracks-selected");
      removeTrackMarkFocusLayer();
      removePinFocusLayer();
      if (!selectedFeature) return;
      if (selectedFeature.kind === "pin") {
        highlightSelectedPin();
        return;
      }
      if (selectedFeature.kind === "track" && map.getSource("tracks")) {
        map.addLayer({
          id: "tracks-selected",
          type: "line",
          source: "tracks",
          filter: ["all", ["==", ["geometry-type"], "LineString"], ["==", ["get", "noteId"], selectedFeature.noteId]],
          paint: {
            "line-color": "#ffcc00",
            "line-width": 7,
            "line-opacity": 0.9,
          },
        });
        if (selectedTrackMark) {
          highlightSelectedTrackMark();
        }
      }
    }

    function flyToFeature(noteId, kind) {
      if (!map) return;
      suppressViewportFor(2000);
      if (kind === "pin") {
        const pin = markers.find((m) => m.noteId === noteId);
        if (pin) map.flyTo({ center: [pin.lng, pin.lat], zoom: Math.max(map.getZoom(), 14) });
        return;
      }
      const source = map.getSource("tracks");
      if (!source || !source._data) return;
      const coords = [];
      source._data.features.forEach((f) => {
        if (f.properties && f.properties.noteId === noteId && f.geometry.type === "LineString") {
          coords.push(...f.geometry.coordinates);
        }
      });
      if (!coords.length) return;
      const bounds = coords.reduce(
        (b, c) => b.extend(c),
        new maplibregl.LngLatBounds(coords[0], coords[0])
      );
      map.fitBounds(bounds, { padding: 48, maxZoom: 15 });
    }

    function wireInteractions() {
      if (!map) return;
      if (mapInteractionsWired) {
        logGeoMapDebug("wireInteractions SKIP already wired");
        return;
      }
      mapInteractionsWired = true;
      logGeoMapDebug("wireInteractions ATTACH");

      map.on("click", "clusters", (e) => {
        e.preventDefault();
        markFeatureClickHandled();
        const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        if (!features.length) return;
        const clusterId = features[0].properties.cluster_id;
        const source = map.getSource("markers");
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          suppressViewportFor(1200);
          map.easeTo({ center: features[0].geometry.coordinates, zoom });
        });
      });

      const pinLayers = ["unclustered-pin", "unclustered-pin-fallback"];
      pinLayers.forEach((layer) => {
        map.on("click", layer, (e) => {
          if (!e.features || !e.features.length) return;
          e.preventDefault();
          markFeatureClickHandled();
          const feature = e.features[0];
          const noteId = feature.properties.noteId;
          if (!noteId) return;
          logGeoMapDebug("click pin layer=" + layer + " noteId=" + noteId);
          selectFeatureInternal(noteId, "pin");
          post("geoMapFeatureSelected", JSON.stringify({ noteId, kind: "pin" }));
        });
      });

      function handleTrackFeatureClick(e) {
        if (!e.features || !e.features.length) return;
        e.preventDefault();
        markFeatureClickHandled();
        const feature = e.features[0];
        const noteId = feature.properties.noteId;
        if (!noteId) return;
        logGeoMapDebug(
          "click track layer=" +
            (feature.layer && feature.layer.id ? feature.layer.id : "?") +
            " noteId=" +
            noteId +
            " kind=" +
            (feature.properties.kind || "?") +
            " markId=" +
            (feature.properties.markId || "")
        );
        selectFeatureInternal(noteId, "track");
        if (feature.properties.kind === "track-mark" && feature.properties.markId) {
          const coords = feature.geometry && feature.geometry.coordinates;
          if (coords && coords.length >= 2) {
            selectedTrackMark = {
              noteId: noteId,
              markId: feature.properties.markId,
              lng: coords[0],
              lat: coords[1],
            };
            highlightSelection();
          }
        }
        const payload = { noteId: noteId, kind: "track" };
        if (selectedTrackMark) {
          payload.markId = selectedTrackMark.markId;
          payload.lat = selectedTrackMark.lat;
          payload.lng = selectedTrackMark.lng;
        }
        post("geoMapFeatureSelected", JSON.stringify(payload));
      }

      ["tracks-line", "tracks-hit", "tracks-marks-summary", "tracks-marks-detail"].forEach((layer) => {
        map.on("click", layer, handleTrackFeatureClick);
      });

      map.on("click", (e) => {
        if (e.defaultPrevented || shouldSuppressMapClickClear()) {
          return;
        }
        const hit = map.queryRenderedFeatures(e.point, {
          layers: [
            "unclustered-pin",
            "unclustered-pin-fallback",
            "tracks-line",
            "tracks-hit",
            "tracks-marks-summary",
            "tracks-marks-detail",
            "clusters",
          ],
        });
        if (!hit.length) {
          logGeoMapDebug("click map background clearSelection");
          clearSelectionInternal();
        }
      });

      map.on("mouseenter", "unclustered-pin", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "unclustered-pin", () => {
        map.getCanvas().style.cursor = "";
      });
      ["tracks-marks-summary", "tracks-marks-detail", "tracks-hit"].forEach((layer) => {
        map.on("mouseenter", layer, () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", layer, () => {
          map.getCanvas().style.cursor = "";
        });
      });
    }

    function markerFeatureAtPoint(point) {
      const layers = [];
      if (map && map.getLayer("unclustered-pin")) layers.push("unclustered-pin");
      if (map && map.getLayer("unclustered-pin-fallback")) layers.push("unclustered-pin-fallback");
      if (map && map.getLayer("clusters")) layers.push("clusters");
      trackMarksLayerIds().forEach(function (layerId) {
        layers.push(layerId);
      });
      if (!layers.length) return false;
      return map.queryRenderedFeatures(point, { layers }).length > 0;
    }

    function attachMapLongPress(mapEl) {
      if (readOnly) return;
      mapEl.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        const target = e.target;
        if (target && target.closest && target.closest(".geomap-toolbar")) return;
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        longPressTimer = setTimeout(() => {
          longPressTimer = null;
          const rect = mapEl.getBoundingClientRect();
          const point = [startX - rect.left, startY - rect.top];
          if (markerFeatureAtPoint(point)) return;
          const latlng = map.unproject(point);
          if (pendingMoveNoteId) {
            const id = pendingMoveNoteId;
            clearMovePinMode();
            const pin = markers.find((m) => m.noteId === id);
            if (pin) {
              pin.lat = latlng.lat;
              pin.lng = latlng.lng;
              rebuildMarkers();
            }
            post("geoMapPinMoved", JSON.stringify({ noteId: id, lat: latlng.lat, lng: latlng.lng }));
            return;
          }
          post("geoMapCreatePin", JSON.stringify({ lat: latlng.lat, lng: latlng.lng }));
        }, 600);
        const moveHandler = (ev) => {
          const t = ev.touches[0];
          if (Math.abs(t.clientX - startX) > 10 || Math.abs(t.clientY - startY) > 10) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
          }
        };
        mapEl._lpMoveHandler = moveHandler;
        mapEl.addEventListener("touchmove", moveHandler);
      }, { passive: true });
      mapEl.addEventListener("touchend", () => {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (mapEl._lpMoveHandler) mapEl.removeEventListener("touchmove", mapEl._lpMoveHandler);
      });
      mapEl.addEventListener("touchcancel", () => {
        clearTimeout(longPressTimer);
        longPressTimer = null;
        if (mapEl._lpMoveHandler) mapEl.removeEventListener("touchmove", mapEl._lpMoveHandler);
      });
    }

    function buildToolbar() {
      if (readOnly) return;
      let bar = document.getElementById("geomap-toolbar");
      if (!bar) {
        bar = document.createElement("div");
        bar.id = "geomap-toolbar";
        bar.className = "geomap-toolbar";
        bar.innerHTML =
          '<button type="button" id="geomap-btn-3d" class="geomap-tool-btn" aria-label="3D view">3D</button>' +
          '<button type="button" id="geomap-btn-gpx" class="geomap-tool-btn" aria-label="Add GPX track">' +
          GPX_TRIP_ICON_SVG +
          "</button>";
        document.body.appendChild(bar);
        document.getElementById("geomap-btn-3d").addEventListener("click", () => {
          set3DInternal(!is3DEnabled);
        });
        document.getElementById("geomap-btn-gpx").addEventListener("click", () => {
          post("geoMapImportGpxRequested", "");
        });
      }
    }

    function onStyleReady() {
      styleLoaded = true;
      suppressViewportSave(2000);
      markersInstalled = false;
      logMarkers(
        "onStyleReady api=" +
          apiName +
          " markers=" +
          markers.length +
          " tracks=" +
          tracks.length +
          " style=" +
          settings.mapStyle
      );
      rebuildMarkers();
      rebuildTracks();
      updateScaleControl();
      updateBuildings3D();
      if (is3DViewActive() && hasShortbreadSource()) {
        scheduleBuildings3DRefresh();
      }
      highlightSelection();
      invalidateMapSizeSoon();
      if (pendingStyleApply !== null) {
        const restoreView = pendingStyleApply === true ? null : pendingStyleApply;
        pendingStyleApply = null;
        applyMapStyle(restoreView);
        return;
      }
      if (pendingInit && pendingInit.fitBounds && markers.length) {
        fitMarkerBounds();
        pendingInit = null;
      }
    }

    function fitMarkerBounds() {
      if (!map || !markers.length) return;
      const bounds = new maplibregl.LngLatBounds();
      markers.forEach((m) => bounds.extend([m.lng, m.lat]));
      tracks.forEach((t) => {
        (t.lines || []).forEach((line) => line.forEach((c) => bounds.extend(c)));
      });
      if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 40, maxZoom: 14 });
    }

    function applyMapStyle(restoreView) {
      if (!map) return;
      if (!styleLoaded) {
        pendingStyleApply = restoreView || true;
        return;
      }
      pendingStyleApply = null;
      styleLoaded = false;
      const requestId = ++styleRequestId;
      loadStyleSpec(settings.mapStyle).then(function (spec) {
        if (!map || requestId !== styleRequestId) return;
        map.setStyle(spec);
        map.once("style.load", function () {
          if (!map || requestId !== styleRequestId) return;
          if (restoreView) {
            suppressViewportFor(1500);
            map.jumpTo(restoreView);
          }
          onStyleReady();
        });
      });
    }

    function createMap(viewport, styleSpec) {
      if (map) {
        try {
          map.remove();
        } catch (e) {}
        map = null;
        styleLoaded = false;
      }
      clearMovePinMode();
      selectedFeature = null;
      selectedTrackMark = null;
      selectedPinMark = null;
      mapInteractionsWired = false;
      markersInstalled = false;
      lastMarkersDataKey = "";
      lastTracksDataKey = "";
      lastMarkerClusterSetting = null;
      buildings3DInstalled = false;
      markerBuildGeneration++;
      trackBuildGeneration++;

      const v = viewport.view || {};
      const center = normalizeCenter(v.center);
      const zoom = typeof v.zoom === "number" ? v.zoom : DEFAULT_ZOOM;
      const pitch = 0;
      const bearing = 0;
      is3DEnabled = false;

      map = new maplibregl.Map({
        container: "map",
        style: styleSpec,
        center: [center[1], center[0]],
        zoom,
        pitch,
        bearing,
        maxPitch: 60,
        touchPitch: true,
        antialias: false,
        // Symbol fades and expiring-tile refetches keep re-dirtying the style, which
        // prevents the render loop from settling into `idle`.
        fadeDuration: 0,
        refreshExpiredTiles: false,
        attributionControl: false,
      });

      map.on("style.load", function () {
        onStyleReady();
      });

      logMarkers(
        "createMap api=" +
          apiName +
          " center=" +
          center[0] +
          "," +
          center[1] +
          " zoom=" +
          zoom +
          " pendingPins=" +
          markers.length
      );

      map.on("pitchend", onMapPitchEndFor3D);
      map.on("sourcedata", onShortbreadSourceData);

      if (!readOnly) {
        map.on("dragstart", function (e) {
          if (e.originalEvent) viewportSaveGestureActive = true;
        });
        map.on("zoomstart", function (e) {
          if (e.originalEvent) viewportSaveGestureActive = true;
        });
        map.on("rotatestart", function (e) {
          if (e.originalEvent) viewportSaveGestureActive = true;
        });
        map.on("moveend", function () {
          if (!viewportSaveGestureActive) {
            return;
          }
          viewportSaveGestureActive = false;
          debouncedSaveViewport("user");
        });
      }

      map.once("idle", rememberViewportAsSaved);

      wireInteractions();
      const mapEl = document.getElementById("map");
      attachMapLongPress(mapEl);
      buildToolbar();
      invalidateMapSizeSoon();
    }

    function beginCreateMap(viewport) {
      logMarkers(
        "beginCreateMap api=" +
          apiName +
          " style=" +
          settings.mapStyle +
          " pendingPins=" +
          markers.length +
          " pendingTracks=" +
          tracks.length
      );
      const requestId = ++styleRequestId;
      loadStyleSpec(settings.mapStyle).then(function (styleSpec) {
        if (requestId !== styleRequestId) return;
        createMap(viewport, styleSpec);
      });
    }

    function parseJSONValue(value, fallback) {
      if (value == null) return fallback;
      if (typeof value === "object") return value;
      try {
        return JSON.parse(value);
      } catch (e) {
        return fallback;
      }
    }

    function setMarkersData(next) {
      const nextMarkers = Array.isArray(next) ? next : [];
      const prevKey = markersDataKey(markers);
      const nextKey = markersDataKey(nextMarkers);
      markers = nextMarkers;
      if (
        selectedFeature &&
        selectedFeature.kind === "pin" &&
        !markers.some(function (m) {
          return m.noteId === selectedFeature.noteId;
        })
      ) {
        clearSelectionInternal();
      }
      if (nextKey === prevKey && nextKey === lastMarkersDataKey && markersInstalled && map && map.getSource("markers")) {
        logGeoMapDebug("setMarkersData SKIP unchanged count=" + markers.length + " key=" + nextKey.slice(0, 24));
        return;
      }
      if (nextKey !== prevKey) {
        lastMarkersDataKey = "";
      }
      const sample = markers[0];
      logGeoMapDebug(
        "setMarkersData REBUILD count=" +
          markers.length +
          " keyChanged=" +
          (nextKey !== prevKey) +
          " map=" +
          !!map +
          " styleLoaded=" +
          styleLoaded +
          (sample ? " first=" + sample.noteId : "")
      );
      rebuildMarkers();
      if (readOnly && markers.length) fitMarkerBounds();
    }

    function setTracksData(next) {
      const nextTracks = Array.isArray(next) ? next : [];
      const prevKey = tracksDataKey(tracks);
      const nextKey = tracksDataKey(nextTracks);
      if (nextKey === prevKey && nextKey === lastTracksDataKey && map && map.getSource("tracks")) {
        logMarkers("setTracksData SKIP unchanged count=" + nextTracks.length);
        return;
      }
      tracks = nextTracks;
      lastTracksDataKey = nextKey;
      const first = tracks[0] || null;
      logMarkers(
        "setTracksData count=" +
          tracks.length +
          " map=" +
          !!map +
          " styleLoaded=" +
          styleLoaded +
          (first
            ? " firstTrack noteId=" +
              String(first.noteId).slice(0, 8) +
              " iconClass=" +
              (first.iconClass || "null") +
              " color=" +
              (first.color || "null") +
              " lines=" +
              (first.lines ? first.lines.length : 0)
            : "")
      );
      rebuildTracks();
    }

    function markerDebugState() {
      const firstPin = markers[0] || null;
      const firstTrack = tracks[0] || null;
      const zoom = map ? map.getZoom() : null;
      let trackSourceFeatureCount = null;
      let trackMarkFeatureCount = null;
      try {
        if (map && map.getSource("tracks")) {
          const data = map.getSource("tracks")._data || map.getSource("tracks").serialize().data;
          const features = data && data.features ? data.features : [];
          trackSourceFeatureCount = features.length;
          trackMarkFeatureCount = features.filter(function (f) {
            return f.properties && f.properties.kind === "track-mark";
          }).length;
        }
      } catch (e) {}
      return {
        api: apiName,
        zoom: zoom,
        trackMarksDetailZoom: TRACK_MARKS_DETAIL_ZOOM,
        markerCount: markers.length,
        trackCount: tracks.length,
        styleLoaded: styleLoaded,
        markersInstalled: markersInstalled,
        markerImagesModule: !!getMarkerImages(),
        boxiconsCatalog: global.__TRINOTE_BOXICONS__ ? Object.keys(global.__TRINOTE_BOXICONS__).length : 0,
        hasMap: !!map,
        hasMarkersSource: !!(map && map.getSource("markers")),
        hasPinLayer: !!(map && map.getLayer("unclustered-pin")),
        hasPinFallback: !!(map && map.getLayer("unclustered-pin-fallback")),
        hasClustersLayer: !!(map && map.getLayer("clusters")),
        hasTracksSource: !!(map && map.getSource("tracks")),
        hasTracksMarks: trackMarksLayerIds().length > 0,
        registeredImageCount: registeredMarkerImages.size,
        cluster: settings.cluster,
        mapStyle: settings.mapStyle,
        hideLabels: settings.hideLabels,
        styleHasGlyphs: styleHasGlyphs(),
        renderedPins: queryRenderedPins(),
        renderedTrackMarks: queryRenderedTrackMarks(),
        trackSourceFeatureCount: trackSourceFeatureCount,
        trackMarkFeatureCount: trackMarkFeatureCount,
        firstPin: firstPin
          ? {
              noteId: firstPin.noteId,
              lat: firstPin.lat,
              lng: firstPin.lng,
              color: firstPin.color || null,
              iconClass: firstPin.iconClass || null,
            }
          : null,
        firstTrack: firstTrack
          ? {
              noteId: firstTrack.noteId,
              title: firstTrack.title || "",
              iconClass: firstTrack.iconClass || null,
              color: firstTrack.color || null,
              lineCount: firstTrack.lines ? firstTrack.lines.length : 0,
              waypointCount: firstTrack.waypoints ? firstTrack.waypoints.length : 0,
            }
          : null,
      };
    }

    function debugIconProbe(iconClass) {
      const images = getMarkerImages();
      if (!images || !images.debugProbeIcon) {
        logMarkers("debugIconProbe SKIP MarkerImages.debugProbeIcon missing");
        return Promise.resolve(JSON.stringify({ error: "debugProbeIcon missing" }));
      }
      const probeClass =
        iconClass ||
        (markers[0] && markers[0].iconClass) ||
        (tracks[0] && tracks[0].iconClass) ||
        images.DEFAULT_ICON_CLASS;
      logMarkers("debugIconProbe START iconClass=" + probeClass);
      return images.debugProbeIcon(probeClass).then(function (summary) {
        return JSON.stringify(summary);
      });
    }

    const api = {
      init(viewportJSON, settingsJSON) {
        const viewport = parseJSONValue(viewportJSON, {});
        const settingsPatch = parseJSONValue(settingsJSON, {});
        settings = { ...settings, ...settingsPatch };
        let normalizedViewport = viewport;
        if (!normalizedViewport.view && normalizedViewport.center != null) {
          normalizedViewport = { view: { center: normalizedViewport.center, zoom: normalizedViewport.zoom } };
        }
        logMarkers("init api=" + apiName + " readOnly=" + readOnly + " markerImagesModule=" + !!getMarkerImages() + " settings=" + JSON.stringify(settings));
        pendingInit = readOnly ? { fitBounds: true } : null;
        beginCreateMap(normalizedViewport);
      },

      loadMarkers(markersJSON) {
        setMarkersData(parseJSONValue(markersJSON, []));
      },

      loadMarkersData(data) {
        setMarkersData(data);
      },

      loadTracks(tracksJSON) {
        setTracksData(parseJSONValue(tracksJSON, []));
      },

      loadTracksData(data) {
        setTracksData(data);
      },

      addPin(noteId, title, lat, lng, color, iconClass) {
        markers.push({
          noteId,
          title,
          lat,
          lng,
          color: color || "#3388ff",
          iconClass: iconClass || (getMarkerImages() ? getMarkerImages().DEFAULT_ICON_CLASS : "tn-icon bx bx-map-pin"),
        });
        rebuildMarkers();
      },

      removePin(noteId) {
        markers = markers.filter((m) => m.noteId !== noteId);
        rebuildMarkers();
        if (pendingMoveNoteId === noteId) clearMovePinMode();
        if (selectedFeature && selectedFeature.noteId === noteId) clearSelectionInternal();
      },

      applySettings(settingsJSON) {
        let next = parseJSONValue(settingsJSON, {});
        const prevStyle = settings.mapStyle;
        const prevCluster = settings.cluster;
        const prevHideLabels = settings.hideLabels;
        const prevShowScale = settings.showScale;
        const prevScaleUnit = settings.scaleUnit;
        const merged = { ...settings, ...next };
        if (
          prevStyle === merged.mapStyle &&
          prevCluster === merged.cluster &&
          prevHideLabels === merged.hideLabels &&
          prevShowScale === merged.showScale &&
          prevScaleUnit === merged.scaleUnit
        ) {
          return;
        }
        settings = merged;
        if (prevStyle !== settings.mapStyle && map) {
          const c = map.getCenter();
          applyMapStyle({ center: c, zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing() });
        } else {
          if (prevCluster !== settings.cluster) {
            rebuildMarkers();
          } else if (prevHideLabels !== settings.hideLabels) {
            updateMarkerLabelLayout();
            updateTrackMarkLabelLayout();
          }
          if (prevShowScale !== settings.showScale || prevScaleUnit !== settings.scaleUnit) {
            updateScaleControl();
          }
        }
      },

      set3DEnabled(enabled) {
        set3DInternal(!!enabled);
      },

      selectFeature(noteId, kind) {
        selectFeatureInternal(noteId, kind || "pin");
        flyToFeature(noteId, kind || "pin");
      },

      focusTrackMark(noteId, markId, lng, lat) {
        focusTrackMarkInternal(noteId, markId, Number(lng), Number(lat));
      },

      clearSelection() {
        clearSelectionInternal();
      },

      beginMovePin(noteId) {
        startMovePinMode(noteId);
      },

      clearMovePinMode() {
        clearMovePinMode();
      },

      invalidateSize() {
        invalidateMapSizeSoon();
      },

      getViewport() {
        if (!map) return "{}";
        const c = map.getCenter();
        return JSON.stringify({
          view: {
            center: { lat: c.lat, lng: c.lng },
            zoom: map.getZoom(),
            pitch: map.getPitch(),
            bearing: map.getBearing(),
          },
        });
      },

      debugMarkerState() {
        const state = markerDebugState();
        logMarkers("STATE " + JSON.stringify(state));
        return JSON.stringify(state);
      },

      debugIconProbe(iconClass) {
        return debugIconProbe(iconClass);
      },
    };

    return api;
  }

  global.TrinoteGeoMap = global.TrinoteGeoMap || {};
  global.TrinoteGeoMap.createEngine = createEngine;
})(typeof window !== "undefined" ? window : globalThis);
