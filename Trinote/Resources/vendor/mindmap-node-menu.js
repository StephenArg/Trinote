// Node style / memo panel for the mind-map editor.
// MindElixir's constructor `nodeMenu` flag is a no-op without a plugin; this
// implements the Trilium-style panel (size, colors, icons, image, link, tags, note)
// and writes the same NodeObj fields desktop v0.105 stores.
(function () {
    const SIZES = { S: 12, M: 16, L: 20, XL: 28 };
    const IMAGE_MAX = { S: 48, M: 96, L: 160 };
    const TEXT_COLORS = ["#e03131", "#f76707", "#f59f00", "#2f9e44", "#1971c2", "#9c36b5"];
    const BG_COLORS = ["#c92a2a", "#d9480f", "#e67700", "#2b8a3e", "#1864ab", "#862e9c"];
    const BG_MORE = ["#fa5252", "#ff922b", "#fcc419", "#51cf66", "#339af0", "#cc5de8", "#868e96", "#212529", "#fff5f5", "#fff9db"];
    const EMOJI = ["⭐", "🔥", "💡", "✅", "❗", "🎯", "📌", "🚀", "❤️", "🧠"];

    const SVG = {
        palette: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.36-.62-.36-.99a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8zm-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>',
        calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9zM6 7h12a1 1 0 0 1 1 1v1H5V8a1 1 0 0 1 1-1z"/></svg>',
        close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z"/></svg>',
        link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a4 4 0 0 1 0-5.66l3.18-3.18a4 4 0 1 1 5.66 5.66l-1.45 1.45-1.42-1.42 1.45-1.45a2 2 0 0 0-2.82-2.82l-3.18 3.18a2 2 0 0 0 0 2.82l.7.7-1.41 1.42-.7-.7zm2.8-2.8a4 4 0 0 1 0 5.66l-3.18 3.18a4 4 0 1 1-5.66-5.66l1.45-1.45 1.42 1.42-1.45 1.45a2 2 0 1 0 2.82 2.82l3.18-3.18a2 2 0 0 0 0-2.82l-.7-.7 1.41-1.42.7.7z"/></svg>',
        refresh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.65 6.35A8 8 0 1 0 19.5 12h-2a6 6 0 1 1-1.44-3.96L13 11h8V3l-3.35 3.35z"/></svg>',
        trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"/></svg>',
        image: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm2 12h10l-3.2-4.2-2.3 3-1.6-2.1L7 17zm8.5-7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>',
        photoAdd: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.2 5.2h12.2c.9 0 1.6.7 1.6 1.6v7.7c-.5.15-.9.4-1.3.75H4.2c-.9 0-1.6-.7-1.6-1.6V6.8c0-.9.7-1.6 1.6-1.6zm1.5 10h9.2l-2.6-3.4-1.9 2.4-1.4-1.7-3.3 2.7zM13.4 8.05a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/><path d="M17.15 14.85h2.2v2.2h2.2v2.2h-2.2v2.2h-2.2v-2.2h-2.2v-2.2h2.2z"/></svg>',
        ratioSquare: '<svg class="nm-ratio-outline" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="5.5" width="13" height="13" rx="2.2" ry="2.2"/></svg>',
        ratioWide: '<svg class="nm-ratio-outline" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="8" width="19" height="8" rx="2" ry="2"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 9.6 12 14.2l4.6-4.6 1.4 1.4L12 17 6 11z"/></svg>'
    };

    function hex(v) {
        if (!v || typeof v !== "string") return "";
        const s = v.trim().toLowerCase();
        const m3 = s.match(/^#([0-9a-f]{3})$/);
        if (m3) return "#" + m3[1].split("").map(function (c) { return c + c; }).join("");
        const m6 = s.match(/^#([0-9a-f]{6})$/);
        return m6 ? s : s;
    }

    function nearestSizeKey(fontSize) {
        const n = parseInt(fontSize, 10);
        if (!n) return "M";
        return Object.keys(SIZES).reduce(function (best, k) {
            return Math.abs(SIZES[k] - n) < Math.abs(SIZES[best] - n) ? k : best;
        }, "M");
    }

    function nearestImageSize(width) {
        const n = Number(width) || 96;
        return Object.keys(IMAGE_MAX).reduce(function (best, k) {
            return Math.abs(IMAGE_MAX[k] - n) < Math.abs(IMAGE_MAX[best] - n) ? k : best;
        }, "M");
    }

    function scaleBox(nw, nh, sizeKey) {
        const maxW = IMAGE_MAX[sizeKey] || 96;
        const ratio = nw > 0 ? nh / nw : 1;
        let w = maxW;
        let h = Math.round(maxW * ratio) || 1;
        const maxH = Math.round(maxW * 1.5);
        if (h > maxH) {
            h = maxH;
            w = Math.max(1, Math.round(maxH / (ratio || 1)));
        }
        return { width: w, height: h };
    }

    function detectRatio(img) {
        if (!img) return "original";
        if (img.ratio === "original" || img.ratio === "square" || img.ratio === "wide") return img.ratio;
        const w = Number(img.width) || 0;
        const h = Number(img.height) || 0;
        if (!w || !h) return "original";
        const r = w / h;
        if (Math.abs(r - 1) < 0.08) return "square";
        if (r >= 1.55) return "wide";
        return "original";
    }

    function naturalOf(img) {
        return {
            w: Number(img && (img.naturalWidth || img.width)) || 96,
            h: Number(img && (img.naturalHeight || img.height)) || 96
        };
    }

    function layoutBox(ratio, sizeKey, naturalW, naturalH) {
        const maxW = IMAGE_MAX[sizeKey] || 96;
        if (ratio === "square") {
            return { width: maxW, height: maxW, fit: "cover" };
        }
        if (ratio === "wide") {
            return { width: maxW, height: Math.max(1, Math.round(maxW * 9 / 16)), fit: "cover" };
        }
        const sized = scaleBox(naturalW, naturalH, sizeKey);
        return { width: sized.width, height: sized.height, fit: "contain" };
    }

    function imagePayload(img, ratio, sizeKey, naturalW, naturalH) {
        const nat = {
            w: naturalW || naturalOf(img).w,
            h: naturalH || naturalOf(img).h
        };
        const box = layoutBox(ratio, sizeKey, nat.w, nat.h);
        return {
            url: img.url,
            width: box.width,
            height: box.height,
            fit: box.fit,
            ratio: ratio,
            naturalWidth: nat.w,
            naturalHeight: nat.h
        };
    }

    function tagText(tag) {
        if (typeof tag === "string") return tag;
        if (tag && typeof tag.text === "string") return tag.text;
        return "";
    }

    function noteToPlain(note) {
        if (!note) return "";
        if (String(note).indexOf("<") === -1) return String(note);
        const d = document.createElement("div");
        d.innerHTML = note;
        return (d.textContent || "").trim();
    }

    function plainToNote(text) {
        const t = (text || "").replace(/\s+$/, "");
        if (!t) return "";
        const esc = t
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");
        return "<p>" + esc + "</p>";
    }

    function swatchRow(colors, extraClass) {
        return colors.map(function (c) {
            return '<button type="button" class="nm-swatch ' + (extraClass || "") + '" data-color="' + c + '" style="background:' + c + '"></button>';
        }).join("");
    }

    function buildPanel() {
        const el = document.createElement("div");
        el.className = "nm-panel";
        el.hidden = true;
        el.innerHTML =
            '<div class="nm-header">' +
                '<div class="nm-tabs">' +
                    '<button type="button" class="nm-tab is-active" data-tab="style" aria-label="Style">' + SVG.palette + "</button>" +
                    '<button type="button" class="nm-tab" data-tab="note" aria-label="Note">' + SVG.calendar + "</button>" +
                "</div>" +
                '<button type="button" class="nm-close" aria-label="Close">' + SVG.close + "</button>" +
            "</div>" +
            '<div class="nm-pane" data-pane="style">' +
                '<div class="nm-section"><div class="nm-label">SIZE</div>' +
                    '<div class="nm-seg" data-role="size">' +
                        '<button type="button" data-size="S">S</button>' +
                        '<button type="button" data-size="M">M</button>' +
                        '<button type="button" data-size="L">L</button>' +
                        '<button type="button" data-size="XL">XL</button>' +
                    "</div>" +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">TEXT</div>' +
                    '<div class="nm-swatches" data-role="text">' +
                        '<button type="button" class="nm-swatch nm-swatch-clear" data-clear="color">' + SVG.close + "</button>" +
                        swatchRow(TEXT_COLORS) +
                        '<button type="button" class="nm-swatch nm-swatch-rainbow" data-custom="color"></button>' +
                    "</div>" +
                    '<input type="color" class="nm-color-input" data-color-for="color" tabindex="-1" />' +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">BACKGROUND</div>' +
                    '<div class="nm-swatches" data-role="bg">' +
                        '<button type="button" class="nm-swatch nm-swatch-clear" data-clear="background">' + SVG.close + "</button>" +
                        swatchRow(BG_COLORS) +
                        '<button type="button" class="nm-swatch nm-swatch-more" data-more="bg">' + SVG.chevron + "</button>" +
                    "</div>" +
                    '<div class="nm-extra" data-extra="bg" hidden>' +
                        swatchRow(BG_MORE) +
                        '<button type="button" class="nm-swatch nm-swatch-rainbow" data-custom="background"></button>' +
                    "</div>" +
                    '<input type="color" class="nm-color-input" data-color-for="background" tabindex="-1" />' +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">BRANCH</div>' +
                    '<div class="nm-swatches" data-role="branch">' +
                        '<button type="button" class="nm-swatch nm-swatch-clear" data-clear="branchColor">' + SVG.close + "</button>" +
                        swatchRow(TEXT_COLORS) +
                        '<button type="button" class="nm-swatch nm-swatch-rainbow" data-custom="branchColor"></button>' +
                    "</div>" +
                    '<input type="color" class="nm-color-input" data-color-for="branchColor" tabindex="-1" />' +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">ICONS</div>' +
                    '<div class="nm-icons-row" data-role="icons"></div>' +
                    '<div class="nm-icon-tray" hidden>' +
                        '<div class="nm-emoji-presets"></div>' +
                        '<input class="nm-field" data-role="icon-input" maxlength="8" placeholder="Type or paste an emoji" />' +
                    "</div>" +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">IMAGE</div>' +
                    '<button type="button" class="nm-photo-add" data-role="img-add" aria-label="Add photo">' + SVG.photoAdd + "</button>" +
                    '<div class="nm-image-controls" data-role="img-controls" hidden>' +
                        '<div class="nm-image-top">' +
                            '<div class="nm-seg" data-role="img-size">' +
                                '<button type="button" data-img-size="S">S</button>' +
                                '<button type="button" data-img-size="M">M</button>' +
                                '<button type="button" data-img-size="L">L</button>' +
                            "</div>" +
                            '<button type="button" class="nm-icon-btn" data-role="img-replace" aria-label="Replace image">' + SVG.refresh + "</button>" +
                            '<button type="button" class="nm-icon-btn is-danger" data-role="img-trash" aria-label="Remove image">' + SVG.trash + "</button>" +
                        "</div>" +
                        '<div class="nm-layouts" data-role="img-ratio">' +
                            '<button type="button" data-ratio="original" aria-label="Original photo ratio">' + SVG.image + "</button>" +
                            '<button type="button" data-ratio="square" aria-label="Square ratio">' + SVG.ratioSquare + "</button>" +
                            '<button type="button" data-ratio="wide" aria-label="Wide proportion">' + SVG.ratioWide + "</button>" +
                        "</div>" +
                    "</div>" +
                    '<input type="file" class="nm-file" accept="image/*" data-role="img-file" />' +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">LINK</div>' +
                    '<button type="button" class="nm-link-btn" data-role="link-open">' + SVG.link + "<span>Add a link</span></button>" +
                    '<div class="nm-link-edit" hidden>' +
                        '<input class="nm-field" data-role="link-input" type="url" inputmode="url" autocomplete="off" placeholder="https://" />' +
                        '<div class="nm-link-actions">' +
                            '<button type="button" data-role="link-apply">Save</button>' +
                            '<button type="button" class="nm-link-clear" data-role="link-clear">Remove</button>' +
                        "</div>" +
                    "</div>" +
                "</div>" +
                '<div class="nm-section"><div class="nm-label">TAGS</div>' +
                    '<div class="nm-tags" data-role="tags"></div>' +
                    '<input class="nm-field" data-role="tag-input" placeholder="Type a tag and press Enter" />' +
                "</div>" +
            "</div>" +
            '<div class="nm-pane" data-pane="note" hidden>' +
                '<div class="nm-section"><div class="nm-label">NOTE</div>' +
                    '<textarea class="nm-note" data-role="note" rows="6" placeholder="Add a note for this node"></textarea>' +
                "</div>" +
            "</div>";
        return el;
    }

    window.installMindMapNodeMenu = function (mind) {
        if (!mind || !mind.container) return;
        const old = document.querySelector(".nm-panel");
        if (old) old.remove();

        const panel = buildPanel();
        document.body.appendChild(panel);

        const $ = function (sel) { return panel.querySelector(sel); };
        const $$ = function (sel) { return Array.prototype.slice.call(panel.querySelectorAll(sel)); };

        const emojiPresets = $(".nm-emoji-presets");
        EMOJI.forEach(function (e) {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = e;
            b.dataset.emoji = e;
            emojiPresets.appendChild(b);
        });

        let topicEl = null;
        let preferredImageSize = "M";
        let preferredRatio = "original";

        function currentObj() {
            return topicEl && topicEl.nodeObj ? topicEl.nodeObj : null;
        }

        function clean(obj) {
            if (!obj) return;
            if (obj.style) {
                Object.keys(obj.style).forEach(function (k) {
                    if (obj.style[k] === "" || obj.style[k] == null) delete obj.style[k];
                });
                if (!Object.keys(obj.style).length) delete obj.style;
            }
            if (obj.hyperLink === "" || obj.hyperLink == null) delete obj.hyperLink;
            if (obj.branchColor === "" || obj.branchColor == null) delete obj.branchColor;
            if (!obj.image) delete obj.image;
            if (Array.isArray(obj.tags) && !obj.tags.length) delete obj.tags;
            if (Array.isArray(obj.icons) && !obj.icons.length) delete obj.icons;
            if (obj.note === "") delete obj.note;
            if (obj.memo === "") delete obj.memo;
        }

        function patch(data) {
            if (!topicEl) return;
            mind.reshapeNode(topicEl, data);
            clean(topicEl.nodeObj);
        }

        function markActive(buttons, attr, value) {
            buttons.forEach(function (b) {
                b.classList.toggle("is-active", b.getAttribute(attr) === value);
            });
        }

        function renderIcons(obj) {
            const row = $("[data-role=icons]");
            row.innerHTML = "";
            (obj.icons || []).forEach(function (icon, i) {
                const chip = document.createElement("span");
                chip.className = "nm-icon-chip";
                const t = document.createElement("span");
                t.textContent = icon;
                const x = document.createElement("button");
                x.type = "button";
                x.textContent = "×";
                x.dataset.removeIcon = String(i);
                chip.appendChild(t);
                chip.appendChild(x);
                row.appendChild(chip);
            });
            const plus = document.createElement("button");
            plus.type = "button";
            plus.className = "nm-plus";
            plus.dataset.role = "icon-add";
            plus.setAttribute("aria-label", "Add icon");
            plus.textContent = "+";
            row.appendChild(plus);
        }

        function renderTags(obj) {
            const wrap = $("[data-role=tags]");
            wrap.innerHTML = "";
            (obj.tags || []).map(tagText).filter(Boolean).forEach(function (tag, i) {
                const chip = document.createElement("span");
                chip.className = "nm-tag-chip";
                const t = document.createElement("span");
                t.textContent = tag;
                const x = document.createElement("button");
                x.type = "button";
                x.textContent = "×";
                x.dataset.removeTag = String(i);
                chip.appendChild(t);
                chip.appendChild(x);
                wrap.appendChild(chip);
            });
        }

        function syncFromNode(obj) {
            if (!obj) return;
            const style = obj.style || {};
            markActive($$("[data-role=size] button"), "data-size", nearestSizeKey(style.fontSize));

            const color = hex(style.color);
            $$("[data-role=text] .nm-swatch").forEach(function (b) {
                b.classList.toggle("is-active", hex(b.getAttribute("data-color") || "") === color && !!color);
            });
            const bg = hex(style.background);
            $$("[data-role=bg] .nm-swatch, [data-extra=bg] .nm-swatch").forEach(function (b) {
                if (b.hasAttribute("data-more") || b.hasAttribute("data-custom") || b.hasAttribute("data-clear")) {
                    return;
                }
                b.classList.toggle("is-active", hex(b.getAttribute("data-color") || "") === bg && !!bg);
            });
            const inBgPresets = BG_COLORS.concat(BG_MORE).some(function (c) { return hex(c) === bg; });
            const more = $("[data-more=bg]");
            more.classList.toggle("is-active", !!bg && !inBgPresets);
            more.style.background = (bg && !inBgPresets) ? bg : "";

            const branch = hex(obj.branchColor);
            $$("[data-role=branch] .nm-swatch").forEach(function (b) {
                b.classList.toggle("is-active", hex(b.getAttribute("data-color") || "") === branch && !!branch);
            });

            renderIcons(obj);
            renderTags(obj);

            const img = obj.image && obj.image.url;
            $("[data-role=img-add]").hidden = !!img;
            $("[data-role=img-controls]").hidden = !img;
            if (img) {
                const imgSize = nearestImageSize(obj.image.width);
                preferredImageSize = imgSize;
                markActive($$("[data-role=img-size] button"), "data-img-size", imgSize);
                const ratio = detectRatio(obj.image);
                preferredRatio = ratio;
                markActive($$("[data-role=img-ratio] button"), "data-ratio", ratio);
            }

            const link = obj.hyperLink || "";
            const linkBtn = $("[data-role=link-open]");
            const linkEdit = $(".nm-link-edit");
            $("[data-role=link-input]").value = link;
            if (link) {
                linkBtn.querySelector("span").textContent = link;
                linkBtn.hidden = true;
                linkEdit.hidden = false;
            } else {
                linkBtn.querySelector("span").textContent = "Add a link";
                linkBtn.hidden = false;
                linkEdit.hidden = true;
            }

            $("[data-role=note]").value = noteToPlain(obj.note || obj.memo || "");
            $("[data-role=tag-input]").value = "";
            $("[data-role=icon-input]").value = "";
            $(".nm-icon-tray").hidden = true;
        }

        function show(el) {
            topicEl = el;
            panel.hidden = false;
            syncFromNode(el.nodeObj);
        }

        function hide() {
            panel.hidden = true;
            topicEl = null;
        }

        function setStyle(key, value) {
            const style = {};
            style[key] = value;
            patch({ style: style });
            syncFromNode(currentObj());
        }

        function pickImageFile() {
            $("[data-role=img-file]").click();
        }

        function applyImageFromDataUrl(dataUrl, naturalW, naturalH) {
            const sizeKey = preferredImageSize;
            const ratio = preferredRatio || "original";
            patch({
                image: imagePayload(
                    { url: dataUrl, naturalWidth: naturalW, naturalHeight: naturalH, width: naturalW, height: naturalH },
                    ratio,
                    sizeKey,
                    naturalW,
                    naturalH
                )
            });
            syncFromNode(currentObj());
        }

        function resizeExistingImage(sizeKey) {
            const obj = currentObj();
            if (!obj || !obj.image || !obj.image.url) {
                preferredImageSize = sizeKey;
                markActive($$("[data-role=img-size] button"), "data-img-size", sizeKey);
                return;
            }
            preferredImageSize = sizeKey;
            const ratio = detectRatio(obj.image);
            preferredRatio = ratio;
            patch({ image: imagePayload(obj.image, ratio, sizeKey) });
            syncFromNode(currentObj());
        }

        function applyRatio(ratio) {
            const obj = currentObj();
            if (!obj || !obj.image || !obj.image.url) return;
            preferredRatio = ratio;
            const sizeKey = preferredImageSize;
            const nat = naturalOf(obj.image);
            if (ratio === "original" && !(obj.image.naturalWidth && obj.image.naturalHeight)) {
                const probe = new Image();
                probe.onload = function () {
                    patch({ image: imagePayload(obj.image, ratio, sizeKey, probe.naturalWidth, probe.naturalHeight) });
                    syncFromNode(currentObj());
                };
                probe.onerror = function () {
                    patch({ image: imagePayload(obj.image, ratio, sizeKey, nat.w, nat.h) });
                    syncFromNode(currentObj());
                };
                probe.src = window.trinoteMindMapImageProxy
                    ? window.trinoteMindMapImageProxy(obj.image.url)
                    : obj.image.url;
                return;
            }
            patch({ image: imagePayload(obj.image, ratio, sizeKey, nat.w, nat.h) });
            syncFromNode(currentObj());
        }

        ["pointerdown", "mousedown", "touchstart", "click", "wheel"].forEach(function (type) {
            panel.addEventListener(type, function (e) { e.stopPropagation(); }, { passive: type === "touchstart" || type === "wheel" });
        });
        panel.addEventListener("keydown", function (e) {
            e.stopPropagation();
        });
        panel.addEventListener("focusin", function (e) {
            var t = e.target;
            if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA")) return;
            setTimeout(function () {
                t.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }, 280);
        });

        function relayout() {
            var vv = window.visualViewport;
            if (!vv) return;
            var keyboardUp = vv.height < window.innerHeight - 80;
            var bottomReserve = keyboardUp ? 12 : 120;
            panel.style.top = (8 + vv.offsetTop) + "px";
            panel.style.maxHeight = Math.max(160, vv.height - bottomReserve) + "px";
        }
        relayout();
        if (window.__nmViewportCleanup) window.__nmViewportCleanup();
        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", relayout);
            window.visualViewport.addEventListener("scroll", relayout);
            window.__nmViewportCleanup = function () {
                window.visualViewport.removeEventListener("resize", relayout);
                window.visualViewport.removeEventListener("scroll", relayout);
            };
        }

        panel.addEventListener("click", function (e) {
            const t = e.target.closest("button");
            if (!t || !panel.contains(t)) return;
            const obj = currentObj();
            if (!obj && !t.classList.contains("nm-close")) return;

            if (t.classList.contains("nm-close")) {
                hide();
                return;
            }
            if (t.dataset.tab) {
                $$(".nm-tab").forEach(function (b) { b.classList.toggle("is-active", b === t); });
                $$(".nm-pane").forEach(function (p) { p.hidden = p.getAttribute("data-pane") !== t.dataset.tab; });
                return;
            }
            if (t.dataset.size) {
                setStyle("fontSize", SIZES[t.dataset.size] + "px");
                return;
            }
            if (t.dataset.clear) {
                if (t.dataset.clear === "branchColor") {
                    patch({ branchColor: "" });
                } else {
                    setStyle(t.dataset.clear, "");
                    return;
                }
                syncFromNode(currentObj());
                return;
            }
            if (t.dataset.color && t.closest("[data-role=text], [data-role=bg], [data-extra=bg], [data-role=branch]")) {
                const row = t.closest("[data-role], [data-extra]");
                const role = row && (row.getAttribute("data-role") || row.getAttribute("data-extra"));
                if (role === "text") setStyle("color", t.dataset.color);
                else if (role === "bg") setStyle("background", t.dataset.color);
                else if (role === "branch") {
                    patch({ branchColor: t.dataset.color });
                    syncFromNode(currentObj());
                }
                return;
            }
            if (t.dataset.custom) {
                const input = panel.querySelector('[data-color-for="' + t.dataset.custom + '"]');
                if (input) {
                    const obj2 = currentObj();
                    const cur = t.dataset.custom === "branchColor"
                        ? (obj2.branchColor || "#1971c2")
                        : ((obj2.style && obj2.style[t.dataset.custom]) || "#1971c2");
                    input.value = hex(cur) || "#1971c2";
                    input.style.left = t.offsetLeft + "px";
                    input.click();
                }
                return;
            }
            if (t.dataset.more === "bg") {
                const extra = $("[data-extra=bg]");
                extra.hidden = !extra.hidden;
                return;
            }
            if (t.dataset.role === "icon-add") {
                const tray = $(".nm-icon-tray");
                tray.hidden = !tray.hidden;
                if (!tray.hidden) $("[data-role=icon-input]").focus();
                return;
            }
            if (t.dataset.emoji) {
                const icons = (obj.icons || []).concat([t.dataset.emoji]);
                patch({ icons: icons });
                syncFromNode(currentObj());
                return;
            }
            if (t.dataset.removeIcon != null) {
                const icons = (obj.icons || []).slice();
                icons.splice(Number(t.dataset.removeIcon), 1);
                patch({ icons: icons });
                syncFromNode(currentObj());
                return;
            }
            if (t.dataset.removeTag != null) {
                const tags = (obj.tags || []).slice();
                tags.splice(Number(t.dataset.removeTag), 1);
                patch({ tags: tags.map(tagText).filter(Boolean) });
                syncFromNode(currentObj());
                return;
            }
            if (t.dataset.imgSize) {
                resizeExistingImage(t.dataset.imgSize);
                return;
            }
            if (t.dataset.role === "img-add" || t.dataset.role === "img-replace") {
                pickImageFile();
                return;
            }
            if (t.dataset.role === "img-trash") {
                patch({ image: null });
                syncFromNode(currentObj());
                return;
            }
            if (t.dataset.ratio) {
                applyRatio(t.dataset.ratio);
                return;
            }
            if (t.dataset.role === "link-open") {
                t.hidden = true;
                $(".nm-link-edit").hidden = false;
                $("[data-role=link-input]").focus();
                return;
            }
            if (t.dataset.role === "link-apply") {
                const v = $("[data-role=link-input]").value.trim();
                patch({ hyperLink: v });
                syncFromNode(currentObj());
                return;
            }
            if (t.dataset.role === "link-clear") {
                patch({ hyperLink: "" });
                syncFromNode(currentObj());
                return;
            }
        });

        $$(".nm-color-input").forEach(function (input) {
            input.addEventListener("input", function () {
                const key = input.getAttribute("data-color-for");
                if (key === "branchColor") {
                    patch({ branchColor: input.value });
                    syncFromNode(currentObj());
                } else {
                    setStyle(key, input.value);
                }
            });
        });

        $("[data-role=img-file]").addEventListener("change", function (e) {
            const file = e.target.files && e.target.files[0];
            e.target.value = "";
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function () {
                const url = reader.result;
                const img = new Image();
                img.onload = function () {
                    applyImageFromDataUrl(url, img.naturalWidth, img.naturalHeight);
                };
                img.onerror = function () {
                    applyImageFromDataUrl(url, IMAGE_MAX[preferredImageSize], IMAGE_MAX[preferredImageSize]);
                };
                img.src = url;
            };
            reader.readAsDataURL(file);
        });

        $("[data-role=tag-input]").addEventListener("keydown", function (e) {
            if (e.key !== "Enter") return;
            e.preventDefault();
            const v = e.target.value.trim();
            if (!v) return;
            const obj = currentObj();
            if (!obj) return;
            const tags = (obj.tags || []).map(tagText).filter(Boolean);
            if (tags.indexOf(v) === -1) tags.push(v);
            e.target.value = "";
            patch({ tags: tags });
            syncFromNode(currentObj());
        });

        $("[data-role=icon-input]").addEventListener("keydown", function (e) {
            if (e.key !== "Enter") return;
            e.preventDefault();
            const v = e.target.value.trim();
            if (!v) return;
            const obj = currentObj();
            if (!obj) return;
            patch({ icons: (obj.icons || []).concat([v]) });
            e.target.value = "";
            syncFromNode(currentObj());
        });

        $("[data-role=note]").addEventListener("change", function (e) {
            const html = plainToNote(e.target.value);
            patch({ note: html, memo: e.target.value });
        });

        $("[data-role=link-input]").addEventListener("keydown", function (e) {
            if (e.key !== "Enter") return;
            e.preventDefault();
            $("[data-role=link-apply]").click();
        });

        function showNode(nodeObj) {
            if (!nodeObj || !nodeObj.id) {
                hide();
                return;
            }
            var el = mind.currentNode;
            if (!el || !el.nodeObj || el.nodeObj.id !== nodeObj.id) {
                try {
                    el = mind.findEle(nodeObj.id);
                } catch (err) {
                    hide();
                    return;
                }
            }
            show(el);
        }

        mind.bus.addListener("selectNodes", function (nodes) {
            if (!nodes || nodes.length !== 1) {
                hide();
                return;
            }
            showNode(nodes[0]);
        });
        mind.bus.addListener("selectNewNode", function (nodeObj) {
            showNode(nodeObj);
        });
        mind.bus.addListener("unselectNodes", function () {
            hide();
        });

        mind.container.addEventListener("click", function (e) {
            if (e.target.closest && e.target.closest(".nm-panel")) return;
            if (document.getElementById("input-box")) return;
            var tpc = e.target.closest && e.target.closest("me-tpc");
            if (!tpc) return;
            if (mind.currentNode !== tpc) {
                try { mind.selectNode(tpc); } catch (err) {}
            }
            show(tpc);
        });
    };
})();
