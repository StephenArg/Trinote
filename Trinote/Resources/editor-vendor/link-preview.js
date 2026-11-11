/*
 * Trilium link previews (v0.104+): `span.link-mention` (inline) and `section.link-embed` (card or video).
 *
 * Trilium stores each preview as an EMPTY element whose whole content lives in `data-*` attributes, and draws
 * the visible markup from them every time the note is shown. This file is that drawing step for Trinote, shared
 * by the rich text editor (editor.html) and the read-only note view (inlined by `LinkPreviewHTML.swift`).
 * It mirrors Trilium's `packages/commons/src/lib/link_embed_markup.ts` and the safety rules in `link_embed.ts`:
 *
 * - a link's `href` is the stored URL only when it is http(s), `about:blank` otherwise;
 * - a picture loads only from an inline `data:image/…` URI or one of this server's attachments
 *   (`api/attachments/{id}/image/…`), never from a third-party site. Attachments are shown through
 *   Trinote's `trinote-img://attachments/{id}` scheme; the stored attribute itself is never rewritten.
 *
 * Plain script, no build step. Exposes `window.trinoteLinkPreview`.
 */
(function () {
  'use strict';

  var YOUTUBE_REGEX = /(?:youtube\.com\/watch\?[^\s#]*v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;

  /** Model key → stored attribute, in the order Trilium writes them. */
  var ATTRIBUTES = [
    ['url', 'data-url'],
    ['embedType', 'data-embed-type'],
    ['title', 'data-title'],
    ['description', 'data-description'],
    ['favicon', 'data-favicon'],
    ['siteName', 'data-site-name'],
    ['image', 'data-image'],
    ['aspectRatio', 'data-aspect-ratio']
  ];

  var CARD_IMAGE_PLACEHOLDER = '<div class="link-embed-card-image-placeholder">&#128279;</div>';

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isHttpUrl(url) {
    if (!url) return false;
    try {
      var protocol = new URL(String(url)).protocol;
      return protocol === 'http:' || protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  function href(url) {
    return isHttpUrl(url) ? String(url) : 'about:blank';
  }

  function hostname(url) {
    try {
      return new URL(String(url)).hostname || String(url || '');
    } catch (e) {
      return String(url || '');
    }
  }

  function youTubeVideoId(url) {
    var match = String(url || '').match(YOUTUBE_REGEX);
    return match ? match[1] : null;
  }

  /** The `src` a preview picture may load from, or '' when the stored value is not one we may load. */
  function imageSrc(raw) {
    if (!raw) return '';
    var value = String(raw).trim();
    // An SVG data URI is allowed on purpose, as in Trilium: scripts inside an SVG loaded through <img> don't run.
    if (/^data:image\/[a-z0-9.+-]+[;,]/i.test(value)) return value;
    var match = value.match(/^api\/attachments\/([a-zA-Z0-9_]+)\/image\/[^\s"'<>]*$/);
    if (match) return 'trinote-img://attachments/' + match[1];
    match = value.match(/^trinote-img:\/\/attachments\/([a-zA-Z0-9_-]+)$/i);
    if (match) return 'trinote-img://attachments/' + match[1];
    return '';
  }

  /** The stored preview on `el` as `{url, embedType, title, …}` (raw values), or null when it has no URL. */
  function readData(el) {
    if (!el || !el.getAttribute) return null;
    var url = el.getAttribute('data-url');
    if (!url) return null;
    var data = {};
    for (var i = 0; i < ATTRIBUTES.length; i++) {
      data[ATTRIBUTES[i][0]] = el.getAttribute(ATTRIBUTES[i][1]);
    }
    return data;
  }

  /** True when the block preview draws a video player rather than a card. A missing type reads as a card. */
  function isVideo(data) {
    if (!data) return false;
    var embedType = data.embedType || 'opengraph';
    return embedType !== 'opengraph' && youTubeVideoId(data.url) != null;
  }

  /** `video` or `audio` when the preview plays the file at its URL (Trilium v0.107), else null. */
  function mediaKind(data) {
    if (!data || (data.embedType !== 'video' && data.embedType !== 'audio')) return null;
    return isHttpUrl(data.url) ? data.embedType : null;
  }

  function picture(raw, className, size) {
    var src = imageSrc(raw);
    if (!src) return '';
    var sizeAttributes = size ? ' width="' + size + '" height="' + size + '"' : '';
    return '<img class="' + className + '" src="' + escapeHtml(src) + '" alt="" draggable="false"' + sizeAttributes + '>';
  }

  function favicon(raw) {
    return picture(raw, 'link-embed-mention-favicon', 16);
  }

  /** The inline mention: the site's favicon and the page title (the host when there is none). */
  function mentionHTML(data) {
    return '<a class="link-embed-mention" href="' + escapeHtml(href(data.url)) + '" rel="noopener noreferrer">'
      + favicon(data.favicon)
      + '<span class="link-embed-mention-title">' + escapeHtml(data.title || hostname(data.url)) + '</span>'
      + '</a>';
  }

  /**
   * The block preview: a card, or for a YouTube embed the stored thumbnail with a play badge. Trinote opens the
   * video outside the app instead of swapping in an inline player.
   */
  function embedHTML(data, boxSize) {
    var media = mediaKind(data);
    if (media === 'audio') {
      return '<button type="button" class="link-embed-media-facade link-embed-audio-facade" data-media-kind="audio"'
        + ' data-media-url="' + escapeHtml(data.url) + '" aria-label="' + escapeHtml(data.title || 'Play audio') + '">'
        + '<span class="link-embed-audio-play" aria-hidden="true"></span>'
        + '<span class="link-embed-audio-title">' + escapeHtml(data.title || hostname(data.url)) + '</span>'
        + '</button>';
    }
    if (media === 'video') {
      // A compact video is its title row alone.
      if (boxSize === 'compact') return mentionHTML(data);
      var shape = /^\d{1,4}\/\d{1,4}$/.test(data.aspectRatio || '') ? ' style="aspect-ratio:' + data.aspectRatio + '"' : '';
      return '<div class="link-embed-video">'
        + '<button type="button" class="link-embed-media-facade link-embed-video-facade" data-media-kind="video"'
        + ' data-media-url="' + escapeHtml(data.url) + '" aria-label="' + escapeHtml(data.title || 'Play video') + '"' + shape + '>'
        + picture(data.image, 'link-embed-video-thumbnail')
        + '<span class="link-embed-video-play" aria-hidden="true"></span>'
        + '</button></div>';
    }
    if (isVideo(data)) {
      if (boxSize === 'compact') return mentionHTML(data);
      return '<a class="link-embed-video" href="' + escapeHtml(href(data.url)) + '" rel="noopener noreferrer"'
        + ' aria-label="' + escapeHtml(data.title || 'Play video') + '">'
        + '<div class="link-embed-video-facade">'
        + picture(data.image, 'link-embed-video-thumbnail')
        + '<span class="link-embed-video-play" aria-hidden="true"></span>'
        + '</div></a>';
    }

    var cardImage = picture(data.image, 'link-embed-card-image') || CARD_IMAGE_PLACEHOLDER;
    var title = data.title ? '<div class="link-embed-card-title">' + escapeHtml(data.title) + '</div>' : '';
    var description = data.description
      ? '<div class="link-embed-card-description">' + escapeHtml(data.description) + '</div>'
      : '';
    return '<a class="link-embed-card" href="' + escapeHtml(href(data.url)) + '" rel="noopener noreferrer">'
      + '<div class="link-embed-card-image-wrapper">' + cardImage + '</div>'
      + '<div class="link-embed-card-content">' + title + description
      + '<div class="link-embed-card-url">' + favicon(data.favicon)
      + '<span>' + escapeHtml(data.siteName || hostname(data.url)) + '</span></div>'
      + '</div></a>';
  }

  /*
   * Favicon contrast, ported from Trilium's `favicon_contrast.ts`. A site draws its icon for its own background:
   * GitHub's black octocat vanishes on a dark page, and an icon drawn white for a dark header vanishes on a light
   * one. Each icon is rasterised once, every pixel weighted by its opacity, and judged by how much of it clears
   * the WCAG 3:1 contrast for graphics against a near-black and a white surface. One that barely shows on a
   * surface gets `link-embed-favicon-dark` or `-light`, and link-preview.css turns it round on that surface.
   */
  var MIN_ICON_CONTRAST_RATIO = 3;
  var MIN_VISIBLE_SHARE = 0.04;
  var FAVICON_SAMPLE_SIZE = 32;

  function linearChannel(value) {
    var channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }

  function relativeLuminance(r, g, b) {
    return 0.2126 * linearChannel(r) + 0.7152 * linearChannel(g) + 0.0722 * linearChannel(b);
  }

  function contrastRatio(one, other) {
    return (Math.max(one, other) + 0.05) / (Math.min(one, other) + 0.05);
  }

  var DARK_SURFACE_LUMINANCE = relativeLuminance(0x1e, 0x1e, 0x1e);
  var LIGHT_SURFACE_LUMINANCE = relativeLuminance(0xff, 0xff, 0xff);

  /** `{ onDark, onLight, hasContent }`: the share of what an RGBA bitmap draws that shows on each surface. */
  function summarizeFaviconVisibility(pixels) {
    var drawn = 0, onDark = 0, onLight = 0;
    for (var i = 0; i + 3 < pixels.length; i += 4) {
      var alpha = pixels[i + 3] / 255;
      if (alpha === 0) continue;
      var luminance = relativeLuminance(pixels[i], pixels[i + 1], pixels[i + 2]);
      drawn += alpha;
      if (contrastRatio(luminance, DARK_SURFACE_LUMINANCE) >= MIN_ICON_CONTRAST_RATIO) onDark += alpha;
      if (contrastRatio(luminance, LIGHT_SURFACE_LUMINANCE) >= MIN_ICON_CONTRAST_RATIO) onLight += alpha;
    }
    if (drawn === 0) return { onDark: 0, onLight: 0, hasContent: false };
    return { onDark: onDark / drawn, onLight: onLight / drawn, hasContent: true };
  }

  /** 'dark' for an icon that fades into a dark page, 'light' for one that fades into a light page, else 'neutral'. */
  function classifyFaviconContrast(visibility) {
    if (!visibility || !visibility.hasContent) return 'neutral';
    if (visibility.onDark < MIN_VISIBLE_SHARE) return 'dark';
    if (visibility.onLight < MIN_VISIBLE_SHARE) return 'light';
    return 'neutral';
  }

  /** Measurements by icon URL: a note that links one site twenty times measures its icon once. */
  var faviconContrasts = {};

  /**
   * Loads the icon into an image of its own and measures that. The image asks for CORS access, because a
   * `trinote-img://` picture is another origin than the page and would otherwise taint the canvas; the scheme
   * handler answers with `Access-Control-Allow-Origin: *`. Never rejects: an unreadable icon is left alone.
   */
  function measureFaviconContrast(src) {
    return new Promise(function (resolve) {
      // Not `new Image()`: editor.html declares a global `const Image` (TipTap's extension) that hides the constructor.
      var image = document.createElement('img');
      if (!/^data:/i.test(src)) image.crossOrigin = 'anonymous';
      image.addEventListener('load', function () {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = FAVICON_SAMPLE_SIZE;
          canvas.height = FAVICON_SAMPLE_SIZE;
          var context = canvas.getContext('2d', { willReadFrequently: true });
          if (!context) { resolve('neutral'); return; }
          // An explicit size: an SVG with only a viewBox has no intrinsic size to fall back on.
          context.drawImage(image, 0, 0, FAVICON_SAMPLE_SIZE, FAVICON_SAMPLE_SIZE);
          var pixels = context.getImageData(0, 0, FAVICON_SAMPLE_SIZE, FAVICON_SAMPLE_SIZE).data;
          resolve(classifyFaviconContrast(summarizeFaviconVisibility(pixels)));
        } catch (e) {
          resolve('neutral');
        }
      }, { once: true });
      image.addEventListener('error', function () { resolve('neutral'); }, { once: true });
      image.src = src;
    });
  }

  function applyFaviconContrast(img) {
    var src = img.getAttribute('src');
    if (!src) return;
    if (!faviconContrasts[src]) faviconContrasts[src] = measureFaviconContrast(src);
    faviconContrasts[src].then(function (contrast) {
      if (contrast !== 'neutral') img.classList.add('link-embed-favicon-' + contrast);
    });
  }

  /**
   * A picture that fails to load gives way to what stands in for a missing one, and a favicon gets the class that
   * lets the stylesheet correct an icon drawn for the other background.
   */
  function wireImages(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('img.link-embed-mention-favicon').forEach(function (img) {
      img.addEventListener('error', function () { img.remove(); }, { once: true });
      applyFaviconContrast(img);
    });
    root.querySelectorAll('img.link-embed-video-thumbnail').forEach(function (img) {
      img.addEventListener('error', function () { img.remove(); }, { once: true });
    });
    root.querySelectorAll('img.link-embed-card-image').forEach(function (img) {
      img.addEventListener('error', function () { img.outerHTML = CARD_IMAGE_PLACEHOLDER; }, { once: true });
    });
  }

  /** Fills `el` (a stored `span.link-mention` or `section.link-embed`) with its drawn preview. */
  function fill(el) {
    var data = readData(el);
    if (!data) return false;
    el.innerHTML = el.tagName === 'SECTION' ? embedHTML(data, el.getAttribute('data-box-size')) : mentionHTML(data);
    wireImages(el);
    return true;
  }

  /** In a read-only note, a tap swaps the thumbnail for a player: nothing loads from the host until then. */
  function enhanceMedia(container) {
    var root = container || document.body;
    root.querySelectorAll('.link-embed-media-facade').forEach(function (facade) {
      facade.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var player = document.createElement(facade.getAttribute('data-media-kind') === 'audio' ? 'audio' : 'video');
        player.className = 'link-embed-media-player';
        player.src = facade.getAttribute('data-media-url');
        player.controls = true;
        player.setAttribute('playsinline', '');
        var parent = facade.parentNode;
        parent.replaceChild(player, facade);
        if (player.play) {
          var playing = player.play();
          if (playing && playing.catch) playing.catch(function () {});
        }
      });
    });
  }

  /** Draws every stored preview under `container` (the read-only note view). */
  function render(container) {
    var root = container || document.body;
    if (!root || !root.querySelectorAll) return 0;
    var count = 0;
    root.querySelectorAll('span.link-mention, section.link-embed').forEach(function (el) {
      if (fill(el)) count++;
    });
    return count;
  }

  window.trinoteLinkPreview = {
    ATTRIBUTES: ATTRIBUTES,
    escapeHtml: escapeHtml,
    isHttpUrl: isHttpUrl,
    href: href,
    hostname: hostname,
    youTubeVideoId: youTubeVideoId,
    imageSrc: imageSrc,
    readData: readData,
    isVideo: isVideo,
    summarizeFaviconVisibility: summarizeFaviconVisibility,
    classifyFaviconContrast: classifyFaviconContrast,
    measureFaviconContrast: measureFaviconContrast,
    mentionHTML: mentionHTML,
    embedHTML: embedHTML,
    wireImages: wireImages,
    fill: fill,
    render: render,
    enhanceMedia: enhanceMedia,
    mediaKind: mediaKind
  };
})();
