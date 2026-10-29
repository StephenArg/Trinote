/*
 * Trilium to-do task states (v0.104+), shared by the rich text editor (editor.html) and the read-only note view
 * (inlined by `HTMLNoteView`).
 *
 * Trilium keeps a to-do item's state on its `<li>` as `data-trilium-task-state="<name>"` plus a `title` tooltip;
 * `none` and `done` are never written, they are the checkbox's own `checked`, which is also set for every state that
 * counts as completed. The boxes are drawn by the stylesheet Swift generates (`TaskStateStyles`).
 *
 * The native side configures this with `trinoteTaskStates.configure({ states, tapState, menu, markdown, labels })`:
 * `states` is the server's list in order (name, title, isCompleted, isHidden, markdownSymbol), `tapState` what a plain
 * tap sets, `menu` whether a hold opens the state menu, `markdown` whether only states with a Markdown symbol can be
 * picked (Markdown notes store the symbol).
 *
 * Plain script, no build step. Exposes `window.trinoteTaskStates`.
 */
(function () {
  'use strict';

  var NONE = 'none';
  var DONE = 'done';
  var HOLD_MS = 450;
  var HOLD_SLOP = 8;

  var config = {
    states: [
      { name: NONE, title: 'None', isCompleted: false, isHidden: false, markdownSymbol: ' ' },
      { name: DONE, title: 'Done', isCompleted: true, isHidden: false, markdownSymbol: 'x' }
    ],
    tapState: DONE,
    menu: false,
    markdown: false,
    labels: { editStates: 'Edit States…' }
  };

  function configure(next) {
    if (!next) return;
    if (Array.isArray(next.states) && next.states.length) config.states = next.states;
    if (typeof next.tapState === 'string') config.tapState = next.tapState;
    config.menu = !!next.menu;
    config.markdown = !!next.markdown;
    if (next.labels) config.labels = next.labels;
  }

  function definition(name) {
    for (var i = 0; i < config.states.length; i++) {
      if (config.states[i].name === name) return config.states[i];
    }
    return null;
  }

  function isAnchor(name) {
    return name === NONE || name === DONE;
  }

  /** The visible states the menu offers; in Markdown notes only those with a symbol. */
  function menuStates() {
    return config.states.filter(function (s) {
      if (s.isHidden) return false;
      if (config.markdown && !isAnchor(s.name) && !s.markdownSymbol) return false;
      return true;
    });
  }

  /** `tapState` when it is a visible state other than None; otherwise Done (as `TaskStateCatalog.effectiveTapState`). */
  function effectiveTapState() {
    var tap = config.tapState;
    if (tap === NONE) return DONE;
    if (tap === DONE) return DONE;
    var def = definition(tap);
    if (!def || def.isHidden) return DONE;
    if (config.markdown && !def.markdownSymbol) return DONE;
    return tap;
  }

  /**
   * The state a plain tap moves an item to. With Done as the tap state this is Trilium's toggle: a completed item goes
   * back to None, anything else becomes Done. `checked` decides for a state this server doesn't define.
   */
  function afterTap(current, checked) {
    var tap = effectiveTapState();
    var def = definition(current);
    var completed = current === DONE || (def ? !!def.isCompleted : (current !== NONE && !!checked));
    if (current === tap || completed) return NONE;
    return tap;
  }

  function isCompleted(name) {
    if (name === DONE) return true;
    if (name === NONE) return false;
    var def = definition(name);
    return !!(def && def.isCompleted);
  }

  /** The state an item's attribute and box hold: its `data-trilium-task-state`, or None/Done by `checked`. */
  function stateOf(li, checked) {
    var name = li ? li.getAttribute('data-trilium-task-state') : null;
    if (name && !isAnchor(name)) return name;
    return checked ? DONE : NONE;
  }

  /** Writes `name` onto a stored-markup item (`<li>` + its checkbox), as Trilium's editor stores it. */
  function applyToItem(li, checkbox, name) {
    if (li) {
      if (isAnchor(name)) {
        li.removeAttribute('data-trilium-task-state');
        li.removeAttribute('title');
      } else {
        li.setAttribute('data-trilium-task-state', name);
        var def = definition(name);
        var title = def ? (def.title || def.name) : '';
        if (title) li.setAttribute('title', title);
        else li.removeAttribute('title');
      }
    }
    if (checkbox) {
      var checked = isCompleted(name);
      checkbox.checked = checked;
      if (checked) checkbox.setAttribute('checked', 'checked');
      else checkbox.removeAttribute('checked');
    }
  }

  // MARK: Hold

  /**
   * Calls `opts.onHold(element, event)` when a finger rests on an element `opts.resolve(target)` returns for
   * `HOLD_MS` without moving, or on a right-click (iPad pointer). The tap that ends a hold doesn't click.
   */
  function attachHold(root, opts) {
    var timer = null;
    var start = null;
    var held = false;
    var suppressClickUntil = 0;

    function cancel() {
      if (timer) clearTimeout(timer);
      timer = null;
      start = null;
    }

    root.addEventListener('touchstart', function (e) {
      cancel();
      held = false;
      if (!e.touches || e.touches.length !== 1) return;
      var element = opts.resolve(e.target);
      if (!element) return;
      var touch = e.touches[0];
      start = { x: touch.clientX, y: touch.clientY };
      timer = setTimeout(function () {
        timer = null;
        held = true;
        opts.onHold(element, e);
      }, HOLD_MS);
    }, { capture: true, passive: true });

    root.addEventListener('touchmove', function (e) {
      if (!timer || !start || !e.touches || !e.touches[0]) return;
      var t = e.touches[0];
      if (Math.abs(t.clientX - start.x) > HOLD_SLOP || Math.abs(t.clientY - start.y) > HOLD_SLOP) cancel();
    }, { capture: true, passive: true });

    root.addEventListener('touchend', function (e) {
      cancel();
      if (held) {
        held = false;
        suppressClickUntil = Date.now() + 500;
        if (e.cancelable) e.preventDefault();
      }
    }, { capture: true, passive: false });

    root.addEventListener('touchcancel', function () {
      cancel();
      held = false;
    }, { capture: true });

    root.addEventListener('click', function (e) {
      if (Date.now() < suppressClickUntil) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    root.addEventListener('contextmenu', function (e) {
      var element = opts.resolve(e.target);
      if (!element) return;
      e.preventDefault();
      cancel();
      opts.onHold(element, e);
    }, true);
  }

  // MARK: Menu (editor)

  var menu = null;
  var menuAnchor = null;

  function ensureMenu() {
    if (menu) return menu;
    menu = document.createElement('div');
    menu.className = 'tn-task-menu';
    menu.setAttribute('role', 'menu');
    document.body.appendChild(menu);
    document.addEventListener('pointerdown', function (e) {
      if (!menu.classList.contains('visible')) return;
      if (menu.contains(e.target)) return;
      hideMenu();
    }, true);
    window.addEventListener('scroll', function () { layoutMenu(); }, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', function () { layoutMenu(); });
    return menu;
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var PENCIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4"/></svg>';

  /**
   * Opens the state menu by `anchor` (the checkbox). `onPick(name)` runs for a state, `onEdit()` for Edit States
   * (left out when not given).
   */
  function showMenu(anchor, current, onPick, onEdit) {
    var el = ensureMenu();
    var rows = menuStates().map(function (s) {
      var isCurrent = s.name === current;
      return '<button type="button" class="tn-task-menu-row' + (isCurrent ? ' current' : '') + '" role="menuitemradio"' +
        ' aria-checked="' + (isCurrent ? 'true' : 'false') + '" data-state="' + escapeHtml(s.name) + '">' +
        '<span class="tn-task-checkbox" data-trilium-task-state="' + escapeHtml(s.name) + '"></span>' +
        '<span class="tn-task-menu-title">' + escapeHtml(s.title || s.name) + '</span>' +
        '<span class="tn-task-menu-check">' + (isCurrent ? '&#10003;' : '') + '</span></button>';
    });
    if (onEdit) {
      rows.push('<div class="tn-task-menu-divider"></div>' +
        '<button type="button" class="tn-task-menu-row tn-task-menu-edit" role="menuitem">' + PENCIL +
        '<span class="tn-task-menu-title">' + escapeHtml(config.labels.editStates) + '</span></button>');
    }
    el.innerHTML = rows.join('');
    Array.prototype.forEach.call(el.querySelectorAll('.tn-task-menu-row'), function (row) {
      // pointerdown would move the editor's selection first; act on click and keep the caret where it was.
      row.addEventListener('pointerdown', function (e) { e.preventDefault(); });
      row.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        hideMenu();
        if (row.classList.contains('tn-task-menu-edit')) {
          if (onEdit) onEdit();
        } else {
          onPick(row.getAttribute('data-state'));
        }
      });
    });
    menuAnchor = anchor;
    el.classList.add('visible');
    layoutMenu();
  }

  function hideMenu() {
    if (!menu) return;
    menu.classList.remove('visible');
    menuAnchor = null;
  }

  function isMenuVisible() {
    return !!(menu && menu.classList.contains('visible'));
  }

  function layoutMenu() {
    if (!menu || !menu.classList.contains('visible') || !menuAnchor) return;
    if (!menuAnchor.isConnected) { hideMenu(); return; }
    menu.style.visibility = 'hidden';
    menu.style.left = '0px';
    menu.style.top = '0px';
    var pr = menu.getBoundingClientRect();
    var ar = menuAnchor.getBoundingClientRect();
    var margin = 8;
    var vv = window.visualViewport;
    var viewTop = vv ? vv.offsetTop : 0;
    var viewBottom = vv ? (vv.offsetTop + vv.height) : window.innerHeight;
    var left = Math.max(margin, Math.min(ar.left - 8, window.innerWidth - pr.width - margin));
    var top = ar.bottom + 8;
    if (top + pr.height > viewBottom - margin) {
      top = ar.top - pr.height - 8;
      if (top < viewTop + margin) top = Math.max(viewTop + margin, viewBottom - pr.height - margin);
    }
    menu.style.left = Math.round(left) + 'px';
    menu.style.top = Math.round(top) + 'px';
    menu.style.visibility = '';
  }

  window.trinoteTaskStates = {
    NONE: NONE,
    DONE: DONE,
    configure: configure,
    config: function () { return config; },
    definition: definition,
    isAnchor: isAnchor,
    isCompleted: isCompleted,
    menuStates: menuStates,
    afterTap: afterTap,
    stateOf: stateOf,
    applyToItem: applyToItem,
    attachHold: attachHold,
    showMenu: showMenu,
    hideMenu: hideMenu,
    isMenuVisible: isMenuVisible,
    layoutMenu: layoutMenu
  };
})();
