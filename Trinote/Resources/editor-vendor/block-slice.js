/* Keeps only the blocks a Trilium v0.107 excerpt points at (`data-block="id"` or `"startId:endId"`), inside their
   ancestors. Ported from Trilium's `sliceToBlockReference` (packages/commons/src/lib/block_reference.ts).
   Shared by the read-only note view and the editor's include previews. */
(function (global) {
  'use strict';

  var BLOCK_ID_ATTRIBUTE = 'data-trilium-block-id';
  var LAYOUT_CLASS = 'trilium-multicolumn-layout';

  function parseRange(value) {
    var ids = (value || '').split(':');
    if (ids.length > 2 || ids.some(function (id) { return !id; })) return null;
    return { startId: ids[0], endId: ids.length > 1 ? ids[1] : ids[0] };
  }

  function resolveRange(root, range) {
    var start = null;
    var end = null;
    var isEndFirst = false;
    var blocks = root.querySelectorAll('[' + BLOCK_ID_ATTRIBUTE + ']');
    for (var i = 0; i < blocks.length; i++) {
      var id = blocks[i].getAttribute(BLOCK_ID_ATTRIBUTE);
      if (!start && id === range.startId) start = blocks[i];
      if (!end && id === range.endId) {
        end = blocks[i];
        isEndFirst = !start;
      }
      if (start && end) break;
    }
    return isEndFirst ? { start: end, end: start } : { start: start, end: end };
  }

  function isTag(node, name) {
    return !!node.tagName && node.tagName.toUpperCase() === name;
  }

  function listItemNumber(list, index) {
    var reversed = list.hasAttribute('reversed');
    var start = parseInt(list.getAttribute('start') || '', 10);
    var count = Array.from(list.childNodes).filter(function (n) { return isTag(n, 'LI'); }).length;
    var first = isNaN(start) ? (reversed ? count : 1) : start;
    return reversed ? first - index : first + index;
  }

  function pathTo(node, root) {
    var path = [];
    for (var current = node; current !== root; current = current.parentNode) path.unshift(current);
    return path;
  }

  function unwrapSingleColumn(node) {
    if (!node.classList || !node.classList.contains(LAYOUT_CLASS)) return;
    var columns = Array.from(node.childNodes).filter(function (child) { return child.tagName; });
    if (columns.length === 1) node.replaceWith.apply(node, Array.from(columns[0].childNodes));
  }

  function sliceToRange(root, start, end) {
    var node;
    for (node = start; node !== root && node.parentNode; node = node.parentNode) {
      var before = Array.from(node.parentNode.childNodes);
      var removed = before.slice(0, before.indexOf(node));
      if (isTag(node.parentNode, 'OL')) {
        // The first item left keeps the number it had.
        node.parentNode.setAttribute('start', String(listItemNumber(node.parentNode, removed.filter(function (o) { return isTag(o, 'LI'); }).length)));
      }
      removed.forEach(function (n) { n.remove(); });
    }
    for (node = end; node !== root && node.parentNode; node = node.parentNode) {
      var after = Array.from(node.parentNode.childNodes);
      after.slice(after.indexOf(node) + 1).forEach(function (n) { n.remove(); });
    }
  }

  /** Trims `root` to the blocks `value` names. Returns false, changing nothing, when one is missing. */
  function sliceToReference(root, value) {
    var range = parseRange(value);
    if (!range) return false;
    var found = resolveRange(root, range);
    if (!found.start || !found.end) return false;
    var path = pathTo(found.start, root).concat(pathTo(found.end, root));
    sliceToRange(root, found.start, found.end);
    Array.from(new Set(path)).forEach(unwrapSingleColumn);
    return true;
  }

  function apply(scope) {
    Array.from(scope.querySelectorAll('[data-trinote-block]')).forEach(function (el) {
      var value = el.getAttribute('data-trinote-block');
      el.removeAttribute('data-trinote-block');
      if (sliceToReference(el, value)) return;
      var message = document.createElement('p');
      message.className = 'trinote-include__broken';
      message.textContent = el.getAttribute('data-trinote-block-broken') || '';
      el.textContent = '';
      el.appendChild(message);
    });
  }

  global.trinoteBlockSlice = { apply: apply, sliceToReference: sliceToReference };
})(window);
