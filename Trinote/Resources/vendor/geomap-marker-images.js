/* Geo map marker pins — rasterized colour + note icon (Trilium-compatible). */
(function (global) {
  const MARKER_WIDTH = 25;
  const MARKER_HEIGHT = 41;
  const MARKER_SHADOW_PADDING = 6;
  const MARKER_ICON_SIZE = 20;
  const MARKER_ICON_X = (MARKER_WIDTH - MARKER_ICON_SIZE) / 2;
  const MARKER_ICON_Y = (MARKER_WIDTH - MARKER_ICON_SIZE) / 2;
  const DEFAULT_ICON_CLASS = "tn-icon bx bx-map-pin";
  const PROBE_CLASS = "icon-glyph-probe";
  const BOXICONS_FAMILY = "boxicons";

  const imageCache = new Map();
  const iconImageCache = new Map();
  const fontWarmupCache = new Map();

  function logMarkers(msg) {
    try {
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.geoMapDebugLog
      ) {
        window.webkit.messageHandlers.geoMapDebugLog.postMessage("MarkerImages: " + msg);
      }
    } catch (e) {}
  }

  function glyphDebugLabel(glyph) {
    if (!glyph) return "null";
    const code = glyph.content && glyph.content.length ? glyph.content.charCodeAt(0) : 0;
    return (
      "font=" +
      glyph.fontFamily +
      " charCode=U+" +
      code.toString(16).toUpperCase() +
      " len=" +
      (glyph.content ? glyph.content.length : 0)
    );
  }

  function canvasInkSummary(canvas) {
    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) return "no-ctx";
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let opaque = 0;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 8) opaque++;
      }
      return "opaquePx=" + opaque + "/" + (canvas.width * canvas.height);
    } catch (e) {
      return "ink-check-failed";
    }
  }

  let loggedInit = false;
  function logInitOnce() {
    if (loggedInit) return;
    loggedInit = true;
    const catalog = global.__TRINOTE_BOXICONS__;
    const catalogCount = catalog ? Object.keys(catalog).length : 0;
    logMarkers(
      "init fontsAPI=" +
        !!document.fonts +
        " boxiconsCatalog=" +
        catalogCount +
        " dpr=" +
        devicePixelRatio()
    );
    if (document.fonts && document.fonts.check) {
      logMarkers(
        "init fontCheck boxicons=" +
          document.fonts.check('16px boxicons', "\ue9af") +
          " readyState=" +
          (document.fonts.status || "unknown")
      );
    }
  }

  function reportError(msg) {
    logMarkers("ERROR " + msg);
    try {
      if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.geoMapJSError
      ) {
        window.webkit.messageHandlers.geoMapJSError.postMessage("MarkerImages: " + msg);
      }
    } catch (e) {}
  }

  function devicePixelRatio() {
    return window.devicePixelRatio || 1;
  }

  function normalizeIconClass(iconClass) {
    const trimmed = String(iconClass || "").trim();
    if (!trimmed) return DEFAULT_ICON_CLASS;
    if (trimmed.indexOf("tn-icon") >= 0) return trimmed;
    return "tn-icon " + trimmed;
  }

  function probeIconClass(iconClass) {
    const normalized = normalizeIconClass(iconClass);
    const tokens = normalized.split(/\s+/).filter(Boolean);
    if (!tokens.some(function (token) {
      return token === "bx" || token === "bxl" || token === "bxs";
    })) {
      if (tokens.some(function (token) {
        return token.indexOf("bx-") === 0 || token.indexOf("bxs-") === 0 || token.indexOf("bxl-") === 0;
      })) {
        return normalized + " bx";
      }
    }
    return normalized;
  }

  function markerImageId(color, iconClass) {
    return "marker|" + color + "|" + normalizeIconClass(iconClass);
  }

  function parseHexColor(color) {
    if (!color) return null;
    let hex = String(color).trim();
    if (hex.startsWith("#")) hex = hex.slice(1);
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) return null;
    const n = parseInt(hex, 16);
    if (!Number.isFinite(n)) return null;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function getReadableTextColor(color) {
    const rgb = parseHexColor(color);
    if (!rgb) return "#ffffff";
    const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return lum > 0.55 ? "#000000" : "#ffffff";
  }

  function parseCssContent(raw) {
    if (!raw || raw === "none") return null;
    let content = String(raw).replace(/^["']|["']$/g, "");
    if (!content || content === "none") return null;
    const hexEscape = content.match(/^\\([0-9a-fA-F]{1,6})$/);
    if (hexEscape) {
      try {
        return String.fromCodePoint(parseInt(hexEscape[1], 16));
      } catch (e) {
        return null;
      }
    }
    if (content.indexOf("\\") >= 0) {
      content = content.replace(/\\([0-9a-fA-F]{1,6})/g, function (_match, hex) {
        try {
          return String.fromCodePoint(parseInt(hex, 16));
        } catch (e) {
          return "";
        }
      });
    }
    return content || null;
  }

  function iconKeyFromClass(iconClass) {
    const parts = String(iconClass || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
      const token = parts[i];
      if (token.startsWith("bx-") || token.startsWith("bxs-") || token.startsWith("bxl-")) {
        return token;
      }
    }
    return null;
  }

  function glyphFromCodepointMap(iconClass) {
    const key = iconKeyFromClass(iconClass);
    if (!key) {
      return null;
    }
    if (!global.__TRINOTE_BOXICONS__) {
      logMarkers("glyphMap missing __TRINOTE_BOXICONS__ key=" + key);
      return null;
    }
    const codepoint = global.__TRINOTE_BOXICONS__[key];
    if (!codepoint) {
      logMarkers("glyphMap no entry key=" + key + " iconClass=" + normalizeIconClass(iconClass));
      return null;
    }
    try {
      return {
        fontFamily: BOXICONS_FAMILY,
        content: String.fromCodePoint(codepoint),
        __source: "catalog",
        __key: key,
        __codepoint: codepoint,
      };
    } catch (e) {
      logMarkers("glyphMap codepoint failed key=" + key + " cp=" + codepoint);
      return null;
    }
  }

  /** Trilium icon_glyphs.ts — read ::before content + font-family from stylesheet. */
  function resolveIconGlyph(iconClass) {
    logInitOnce();
    const normalized = probeIconClass(iconClass);
    const fromMap = glyphFromCodepointMap(normalized);
    if (fromMap) {
      logMarkers(
        "resolveGlyph source=catalog icon=" +
          normalized +
          " key=" +
          fromMap.__key +
          " " +
          glyphDebugLabel(fromMap)
      );
      return fromMap;
    }

    const probe = document.createElement("span");
    probe.className = PROBE_CLASS + " " + normalized;
    document.body.appendChild(probe);
    try {
      const style = window.getComputedStyle(probe, "::before");
      const rawContent = style && style.content ? style.content : "";
      const content = parseCssContent(rawContent);
      if (!content) {
        logMarkers(
          "resolveGlyph source=css MISS icon=" +
            normalized +
            " rawContent=" +
            String(rawContent).slice(0, 40)
        );
        return null;
      }
      const fontFamily = (style && style.fontFamily) || BOXICONS_FAMILY;
      const glyph = { fontFamily: fontFamily, content: content, __source: "css", __rawContent: rawContent };
      logMarkers(
        "resolveGlyph source=css icon=" + normalized + " raw=" + String(rawContent).slice(0, 40) + " " + glyphDebugLabel(glyph)
      );
      return glyph;
    } catch (e) {
      logMarkers("resolveGlyph css ERROR icon=" + normalized + " err=" + (e && e.message ? e.message : String(e)));
      return null;
    } finally {
      probe.remove();
    }
  }

  let boxiconsFontReady = null;

  async function ensureBoxiconsFont() {
    if (!boxiconsFontReady) {
      boxiconsFontReady = (async function () {
        if (global.__TRINOTE_BOXICONS_FONT_READY__) {
          await global.__TRINOTE_BOXICONS_FONT_READY__;
        }
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        const sample = String.fromCodePoint(0xeb58);
        const check =
          document.fonts && document.fonts.check
            ? document.fonts.check("16px " + BOXICONS_FAMILY, sample)
            : false;
        logMarkers(
          "ensureBoxiconsFont injected=" +
            (global.__TRINOTE_BOXICONS_FONT_LOADED__ === true) +
            " check=" +
            check +
            (global.__TRINOTE_BOXICONS_FONT_ERROR__
              ? " err=" + global.__TRINOTE_BOXICONS_FONT_ERROR__
              : "")
        );
        return check;
      })();
    }
    return boxiconsFontReady;
  }

  async function loadIconFont(fontFamily, content) {
    await ensureBoxiconsFont();
    const key = fontFamily + "|" + (content && content.length ? content.charCodeAt(0) : 0);
    if (fontWarmupCache.has(key)) return fontWarmupCache.get(key);
    const promise = Promise.resolve();
    fontWarmupCache.set(key, promise);
    return promise;
  }

  async function renderIconImage(iconClass, options) {
    const size = options.size;
    const color = options.color || "#000000";
    const scale = options.scale || devicePixelRatio();
    const key = size + "|" + scale + "|" + color + "|" + normalizeIconClass(iconClass);
    if (!iconImageCache.has(key)) {
      iconImageCache.set(key, drawIconImage(iconClass, { size: size, color: color, scale: scale }));
    }
    return iconImageCache.get(key);
  }

  async function drawIconImage(iconClass, options) {
    const normalized = normalizeIconClass(iconClass);
    await ensureBoxiconsFont();
    const glyph = resolveIconGlyph(iconClass);
    if (!glyph) {
      logMarkers("drawIcon MISS glyph iconClass=" + normalized);
      return null;
    }
    await loadIconFont(glyph.fontFamily, glyph.content);

    const size = options.size;
    const color = options.color;
    const scale = options.scale;
    const canvas = document.createElement("canvas");
    const pixelSize = Math.max(1, Math.round(size * scale));
    canvas.width = pixelSize;
    canvas.height = pixelSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      logMarkers("drawIcon MISS canvas ctx iconClass=" + normalized);
      return null;
    }

    ctx.scale(scale, scale);
    ctx.font = size + "px " + glyph.fontFamily;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    try {
      ctx.fillText(glyph.content, size / 2, size / 2);
    } catch (e) {
      reportError("fillText failed for " + normalized + " err=" + (e && e.message ? e.message : String(e)));
      return null;
    }

    const ink = canvasInkSummary(canvas);
    try {
      const dataUrl = canvas.toDataURL("image/png");
      logMarkers(
        "drawIcon OK icon=" +
          normalized +
          " source=" +
          (glyph.__source || "?") +
          " color=" +
          color +
          " scale=" +
          scale +
          " " +
          ink +
          " dataLen=" +
          dataUrl.length
      );
      return dataUrl;
    } catch (e) {
      reportError("icon toDataURL failed: " + (e && e.message ? e.message : String(e)));
      return null;
    }
  }

  function drawTeardrop(ctx, fillColor) {
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 1.5;
    ctx.shadowOffsetY = 1.5;
    ctx.beginPath();
    ctx.moveTo(12.5, 0);
    ctx.bezierCurveTo(5.6, 0, 0, 5.6, 0, 12.5);
    ctx.bezierCurveTo(0, 21.9, 12.5, 41, 12.5, 41);
    ctx.bezierCurveTo(12.5, 41, 25, 21.9, 25, 12.5);
    ctx.bezierCurveTo(25, 5.6, 19.4, 0, 12.5, 0);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.stroke();
    ctx.restore();
  }

  function loadImageFromDataUrl(dataUrl) {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        logMarkers("loadImageFromDataUrl FAILED");
        resolve(null);
      };
      img.src = dataUrl;
    });
  }

  function canvasToImage(canvas) {
    return new Promise(function (resolve) {
      let url;
      try {
        url = canvas.toDataURL("image/png");
      } catch (e) {
        reportError("toDataURL failed: " + (e && e.message ? e.message : String(e)));
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function () {
        reportError("marker Image() failed to load data URL");
        resolve(null);
      };
      img.src = url;
    });
  }

  async function drawMarkerImage(color, iconClass) {
    const scale = devicePixelRatio();
    await ensureBoxiconsFont();
    const iconDataUrl = await renderIconImage(iconClass, {
      size: MARKER_ICON_SIZE,
      color: getReadableTextColor(color),
      scale: scale,
    });

    const canvasWidth = MARKER_WIDTH + 2 * MARKER_SHADOW_PADDING;
    const canvasHeight = MARKER_HEIGHT + 2 * MARKER_SHADOW_PADDING;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(canvasWidth * scale));
    canvas.height = Math.max(1, Math.round(canvasHeight * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      logMarkers("drawMarker FAILED no canvas ctx icon=" + normalizeIconClass(iconClass));
      return null;
    }

    ctx.scale(scale, scale);
    ctx.translate(MARKER_SHADOW_PADDING, MARKER_SHADOW_PADDING);
    drawTeardrop(ctx, color);

    if (iconDataUrl) {
      const iconImg = await loadImageFromDataUrl(iconDataUrl);
      if (iconImg) {
        ctx.drawImage(iconImg, MARKER_ICON_X, MARKER_ICON_Y, MARKER_ICON_SIZE, MARKER_ICON_SIZE);
      } else {
        logMarkers("drawMarker badge load failed icon=" + normalizeIconClass(iconClass));
      }
    }

    const pinInk = canvasInkSummary(canvas);
    const image = await canvasToImage(canvas);
    if (image) {
      image.__pixelRatio = scale;
      logMarkers(
        "rasterized canvas color=" +
          color +
          " icon=" +
          normalizeIconClass(iconClass) +
          " size=" +
          (image.naturalWidth || image.width) +
          "x" +
          (image.naturalHeight || image.height) +
          " pr=" +
          scale +
          " badge=" +
          !!iconDataUrl +
          " " +
          pinInk
      );
    } else {
      logMarkers("rasterized FAILED canvas color=" + color + " icon=" + normalizeIconClass(iconClass));
    }
    return image;
  }

  async function debugProbeIcon(iconClass) {
    logInitOnce();
    const normalized = normalizeIconClass(iconClass);
    const glyph = resolveIconGlyph(iconClass);
    const iconDataUrl = glyph
      ? await drawIconImage(iconClass, {
          size: MARKER_ICON_SIZE,
          color: "#ffffff",
          scale: devicePixelRatio(),
        })
      : null;
    const pin = await drawMarkerImage("#3388FF", iconClass);
    const summary = {
      iconClass: normalized,
      glyph: glyph
        ? {
            source: glyph.__source || null,
            key: glyph.__key || null,
            fontFamily: glyph.fontFamily,
            charCode: glyph.content && glyph.content.length ? glyph.content.charCodeAt(0) : null,
          }
        : null,
      iconDataUrlLen: iconDataUrl ? iconDataUrl.length : 0,
      pinLoaded: !!pin,
      pinSize: pin ? (pin.naturalWidth || pin.width) + "x" + (pin.naturalHeight || pin.height) : null,
    };
    logMarkers("debugProbe " + JSON.stringify(summary));
    return summary;
  }

  async function buildMarkerImage(color, iconClass) {
    const id = markerImageId(color, iconClass);
    if (!imageCache.has(id)) {
      imageCache.set(id, drawMarkerImage(color, iconClass || DEFAULT_ICON_CLASS));
    }
    return imageCache.get(id);
  }

  async function buildForMarkers(markers) {
    const wanted = new Map();
    const features = [];
    (markers || []).forEach(function (pin) {
      const color = pin.color || "#3388ff";
      const iconClass = pin.iconClass || DEFAULT_ICON_CLASS;
      const imageId = markerImageId(color, iconClass);
      if (!wanted.has(imageId)) {
        wanted.set(imageId, { color: color, iconClass: iconClass });
      }
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [pin.lng, pin.lat] },
        properties: {
          noteId: pin.noteId,
          title: pin.title || "",
          color: color,
          markerImage: imageId,
        },
      });
    });

    const images = new Map();
    const drawn = await Promise.all(
      Array.from(wanted.entries()).map(async function (entry) {
        const id = entry[0];
        const spec = entry[1];
        const image = await buildMarkerImage(spec.color, spec.iconClass);
        return [id, image];
      })
    );
    drawn.forEach(function (pair) {
      if (pair[1]) images.set(pair[0], pair[1]);
    });
    logMarkers(
      "buildForMarkers pins=" +
        features.length +
        " uniqueImages=" +
        wanted.size +
        " rasterized=" +
        images.size
    );
    return { features: features, images: images };
  }

  global.TrinoteGeoMap = global.TrinoteGeoMap || {};
  global.TrinoteGeoMap.MarkerImages = {
    MARKER_SHADOW_PADDING: MARKER_SHADOW_PADDING,
    DEFAULT_ICON_CLASS: DEFAULT_ICON_CLASS,
    markerImageId: markerImageId,
    buildForMarkers: buildForMarkers,
    buildMarkerImage: buildMarkerImage,
    devicePixelRatio: devicePixelRatio,
    debugProbeIcon: debugProbeIcon,
  };
})(typeof window !== "undefined" ? window : globalThis);
