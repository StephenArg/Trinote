// MindElixir pinch-zooms on two-finger touch but skips pan in that branch.
// Track the pinch centroid and call mind.move() so users can drag while zooming.
(function () {
    const attached = new WeakSet();

    window.installMindMapPinchPan = function (mind) {
        const container = mind && mind.container;
        if (!container || attached.has(container)) return;
        attached.add(container);

        const pointers = new Map();
        let lastCenter = null;

        function pinchCenter() {
            if (pointers.size < 2) return null;
            const pts = Array.from(pointers.values()).slice(0, 2);
            return {
                x: (pts[0].x + pts[1].x) / 2,
                y: (pts[0].y + pts[1].y) / 2
            };
        }

        function onPointerDown(e) {
            if (e.pointerType !== 'touch') return;
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (pointers.size >= 2) {
                lastCenter = pinchCenter();
            }
        }

        function onPointerMove(e) {
            if (e.pointerType !== 'touch' || !pointers.has(e.pointerId)) return;
            pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (pointers.size < 2) return;

            const center = pinchCenter();
            if (lastCenter && center) {
                const dx = center.x - lastCenter.x;
                const dy = center.y - lastCenter.y;
                if (dx !== 0 || dy !== 0) {
                    mind.move(dx, dy);
                }
            }
            lastCenter = center;
        }

        function onPointerEnd(e) {
            pointers.delete(e.pointerId);
            lastCenter = pointers.size >= 2 ? pinchCenter() : null;
        }

        // Register after MindElixir's own listeners so scale runs first, then pan.
        container.addEventListener('pointerdown', onPointerDown, { passive: true });
        container.addEventListener('pointermove', onPointerMove, { passive: true });
        container.addEventListener('pointerup', onPointerEnd, { passive: true });
        container.addEventListener('pointercancel', onPointerEnd, { passive: true });
    };
})();

// Trilium desktop stores node photos as relative API URLs
// (`api/attachments/{id}/image/…` or `api/images/{noteId}/…`). Mind maps load
// from file://, so those never hit the server. Rewrite to trinote-img:// for
// WKWebView; data:/blob: (Trinote uploads) and existing trinote-img:// stay.
// MindElixir's imageProxy only changes <img src>, not node JSON, so save still
// writes the canonical Trilium URL.
window.trinoteMindMapImageProxy = function (url) {
    if (!url || typeof url !== 'string') return url;
    var trimmed = url.trim();
    if (!trimmed) return url;
    var head = trimmed.slice(0, 12).toLowerCase();
    if (head.indexOf('data:') === 0 || head.indexOf('blob:') === 0) return url;
    if (trimmed.toLowerCase().indexOf('trinote-img:') === 0) return url;
    var match = trimmed.match(/api\/(attachments|images)\/([A-Za-z0-9_-]+)\//i);
    if (!match) return url;
    return 'trinote-img://' + match[1].toLowerCase() + '/' + match[2];
};
