/* Makes Trilium v0.107's stored layouts work outside the editor: tabs get a title strip, and a Mermaid code block
   becomes a diagram. Shared by the read-only note view and the editor's include previews. */
(function (global) {
  'use strict';

  var BLOCK_ID_ATTRIBUTE = 'data-trilium-block-id';

  /** `<pre><code class="language-mermaid">` → `<div class="mermaid">`, which the page's Mermaid script draws. */
  function renderMermaidBlocks(scope) {
    Array.from(scope.querySelectorAll('pre > code.language-mermaid')).forEach(function (code) {
      var pre = code.parentNode;
      var diagram = document.createElement('div');
      diagram.className = 'mermaid';
      diagram.textContent = code.textContent;
      // A code block keeps its block id on <code>, a Mermaid embed on <pre>; a link can point at either.
      var blockId = pre.getAttribute(BLOCK_ID_ATTRIBUTE) || code.getAttribute(BLOCK_ID_ATTRIBUTE);
      if (blockId) diagram.setAttribute(BLOCK_ID_ATTRIBUTE, blockId);
      pre.replaceWith(diagram);
    });
  }

  function childWithClass(parent, className) {
    return Array.from(parent.children).find(function (child) { return child.classList.contains(className); });
  }

  function setUpTabs(block) {
    if (block.querySelector(':scope > .trinote-tabs-bar')) return;
    var tabs = Array.from(block.children).filter(function (child) { return child.classList.contains('trilium-tab'); });
    if (!tabs.length) return;
    var bar = document.createElement('div');
    bar.className = 'trinote-tabs-bar';
    bar.setAttribute('role', 'tablist');
    var titles = tabs.map(function (tab, index) {
      var stored = childWithClass(tab, 'trilium-tab-title');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'trinote-tab-title';
      button.setAttribute('role', 'tab');
      if (stored) {
        button.innerHTML = stored.innerHTML;
        stored.remove();
      }
      if (!button.textContent.trim()) button.textContent = String(index + 1);
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        block.__trinoteShowTab(index);
      });
      bar.appendChild(button);
      return button;
    });
    block.__trinoteShowTab = function (shown) {
      tabs.forEach(function (tab, index) { tab.classList.toggle('trinote-tab--active', index === shown); });
      titles.forEach(function (title, index) { title.setAttribute('aria-selected', index === shown ? 'true' : 'false'); });
      if (titles[shown].scrollIntoView) titles[shown].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };
    block.__trinoteTabs = tabs;
    if (block.getAttribute('data-trilium-tab-alignment') === 'bottom') block.appendChild(bar);
    else block.insertBefore(bar, block.firstChild);
    block.__trinoteShowTab(0);
  }

  function apply(scope) {
    renderMermaidBlocks(scope);
    Array.from(scope.querySelectorAll('.trilium-tabs')).forEach(setUpTabs);
  }

  /** Shows every tab around `element`, from the outside in, so a find result or a link's target can be seen. */
  function revealTab(element) {
    var chain = [];
    for (var tab = element.closest('.trilium-tab'); tab; tab = tab.parentElement.closest('.trilium-tab')) chain.unshift(tab);
    chain.forEach(function (tab) {
      var block = tab.parentElement;
      if (block && block.__trinoteTabs) block.__trinoteShowTab(block.__trinoteTabs.indexOf(tab));
    });
  }

  global.trinoteContentBlocks = { apply: apply, revealTab: revealTab };
})(window);
