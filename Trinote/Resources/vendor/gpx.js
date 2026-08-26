/* GPX parsing for Trinote geo maps — port of Trilium apps/client/src/services/gpx.ts */
(function (global) {
  const GPX_MIME = "application/gpx+xml";
  const ELEVATION_NOISE_M = 5;
  const JOURNEY_JUMP_M = 1000;
  const PROFILE_BUCKETS = 250;
  const EARTH_RADIUS_M = 6371000;

  function childNamed(element, name) {
    for (const child of element.children) {
      if (child.localName === name) return child;
    }
    return undefined;
  }

  function childText(element, name) {
    return childNamed(element, name)?.textContent ?? undefined;
  }

  function readCoordinates(points) {
    const coordinates = [];
    for (const point of points) {
      const lat = parseFloat(point.getAttribute("lat") ?? "");
      const lon = parseFloat(point.getAttribute("lon") ?? "");
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
      coordinates.push([lon, lat]);
    }
    return coordinates;
  }

  function haversine(a, b) {
    const toRadians = Math.PI / 180;
    const dLat = (b.lat - a.lat) * toRadians;
    const dLon = (b.lon - a.lon) * toRadians;
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(a.lat * toRadians) * Math.cos(b.lat * toRadians) * Math.sin(dLon / 2) ** 2;
    return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
  }

  function splitAtJumps(lines, positionOf) {
    const runs = [];
    let current = [];
    for (const line of lines) {
      const lastLine = current[current.length - 1];
      const previous = lastLine?.[lastLine.length - 1];
      if (previous && haversine(positionOf(previous), positionOf(line[0])) > JOURNEY_JUMP_M) {
        runs.push(current);
        current = [];
      }
      current.push(line);
    }
    if (current.length > 0) runs.push(current);
    return runs;
  }

  function readTrackLines(doc) {
    const tracks = [];
    for (const container of doc.querySelectorAll("trk, rte")) {
      const lines =
        container.localName === "rte"
          ? [readCoordinates(container.querySelectorAll("rtept"))]
          : [...container.querySelectorAll("trkseg")].map((seg) =>
              readCoordinates(seg.querySelectorAll("trkpt"))
            );
      const name = childText(container, "name")?.trim() || undefined;
      for (const run of splitAtJumps(
        lines.filter((l) => l.length > 0),
        ([lon, lat]) => ({ lat, lon })
      )) {
        tracks.push({ name, lines: run });
      }
    }
    if (tracks.length === 0) {
      const points = readCoordinates(doc.querySelectorAll("trkpt, rtept"));
      if (points.length > 0) tracks.push({ lines: [points] });
    }
    return tracks;
  }

  function readPoints(elements, withTime = true) {
    const points = [];
    for (const element of elements) {
      const lat = parseFloat(element.getAttribute("lat") ?? "");
      const lon = parseFloat(element.getAttribute("lon") ?? "");
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
      const point = { lat, lon };
      const elevation = parseFloat(childText(element, "ele") ?? "");
      if (Number.isFinite(elevation)) point.elevation = elevation;
      if (withTime) {
        const time = Date.parse(childText(element, "time") ?? "");
        if (Number.isFinite(time)) point.time = time;
      }
      points.push(point);
    }
    return points;
  }

  function readJourneys(doc) {
    const journeys = [];
    for (const container of doc.querySelectorAll("trk, rte")) {
      const kind = container.localName === "rte" ? "route" : "track";
      const segments = (
        kind === "route"
          ? [readPoints(container.querySelectorAll("rtept"), false)]
          : [...container.querySelectorAll("trkseg")].map((seg) =>
              readPoints(seg.querySelectorAll("trkpt"))
            )
      ).filter((s) => s.length > 0);
      const name = childText(container, "name")?.trim();
      for (const run of splitAtJumps(segments, (p) => p)) {
        journeys.push({ kind, ...(name ? { name } : {}), segments: run });
      }
    }
    if (journeys.length === 0) {
      const points = readPoints(doc.querySelectorAll("trkpt, rtept"));
      if (points.length > 0) journeys.push({ kind: "track", segments: [points] });
    }
    return journeys;
  }

  function readMetadataOrFirst(root, name) {
    for (const container of [childNamed(root, "metadata"), root, childNamed(root, "trk"), childNamed(root, "rte")]) {
      const text = container && childText(container, name)?.trim();
      if (text) return text;
    }
    return undefined;
  }

  function decimate(profile) {
    if (profile.length <= PROFILE_BUCKETS * 2) return profile;
    const out = [profile[0]];
    const bucketSize = profile.length / PROFILE_BUCKETS;
    for (let bucket = 0; bucket < PROFILE_BUCKETS; bucket++) {
      const from = Math.max(1, Math.floor(bucket * bucketSize));
      const to = Math.min(profile.length - 1, Math.floor((bucket + 1) * bucketSize));
      let lowest = -1;
      let highest = -1;
      for (let i = from; i < to; i++) {
        if (lowest < 0 || profile[i].elevation < profile[lowest].elevation) lowest = i;
        if (highest < 0 || profile[i].elevation > profile[highest].elevation) highest = i;
      }
      if (lowest >= 0) {
        const indices =
          lowest === highest ? [lowest] : [Math.min(lowest, highest), Math.max(lowest, highest)];
        for (const index of indices) out.push(profile[index]);
      }
    }
    out.push(profile[profile.length - 1]);
    return out;
  }

  function parseGpxStats(xml) {
    let doc;
    try {
      doc = new DOMParser().parseFromString(xml, "application/xml");
    } catch {
      return null;
    }
    if (doc.querySelector("parsererror")) return null;
    const root = doc.documentElement;
    const journeys = readJourneys(doc);
    const stats = {
      name: readMetadataOrFirst(root, "name"),
      description: readMetadataOrFirst(root, "desc"),
      trackCount: doc.querySelectorAll("trk").length,
      routeCount: doc.querySelectorAll("rte").length,
      segmentCount: doc.querySelectorAll("trkseg").length,
      pointCount: journeys.reduce(
        (c, j) => c + j.segments.reduce((n, s) => n + s.length, 0),
        0
      ),
      journeys: [],
      waypoints: [],
      distance: 0,
    };
    const profile = [];
    let min = Infinity;
    let max = -Infinity;
    let gain = 0;
    let loss = 0;
    let start = Infinity;
    let end = -Infinity;
    for (const journey of journeys) {
      let journeyDistance = 0;
      for (const segment of journey.segments) {
        let anchor;
        for (const [index, point] of segment.entries()) {
          if (index > 0) journeyDistance += haversine(segment[index - 1], point);
          if (point.elevation !== undefined) {
            profile.push({ distance: stats.distance + journeyDistance, elevation: point.elevation });
            min = Math.min(min, point.elevation);
            max = Math.max(max, point.elevation);
            if (anchor === undefined) anchor = point.elevation;
            else if (point.elevation - anchor >= ELEVATION_NOISE_M) {
              gain += point.elevation - anchor;
              anchor = point.elevation;
            } else if (anchor - point.elevation >= ELEVATION_NOISE_M) {
              loss += anchor - point.elevation;
              anchor = point.elevation;
            }
          }
          if (point.time !== undefined) {
            start = Math.min(start, point.time);
            end = Math.max(end, point.time);
          }
        }
      }
      stats.journeys.push({
        kind: journey.kind,
        ...(journey.name ? { name: journey.name } : {}),
        distance: journeyDistance,
      });
      stats.distance += journeyDistance;
    }
    if (profile.length > 0) stats.elevation = { min, max, gain, loss, profile: decimate(profile) };
    if (start <= end)
      stats.time = { start: new Date(start), end: new Date(end), duration: end - start };
    return stats;
  }

  function parseGpxTrackLines(xml) {
    let doc;
    try {
      doc = new DOMParser().parseFromString(xml, "application/xml");
    } catch {
      return [];
    }
    if (doc.querySelector("parsererror")) return [];
    return readTrackLines(doc);
  }

  global.TrinoteGPX = {
    GPX_MIME,
    parseGpxStats,
    parseGpxTrackLines,
    readTrackLinesFromDoc: readTrackLines,
  };
})(typeof window !== "undefined" ? window : globalThis);
