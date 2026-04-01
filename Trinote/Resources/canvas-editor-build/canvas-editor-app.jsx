import "@excalidraw/excalidraw/index.css";
import { Excalidraw, getSceneVersion, exportToSvg } from "@excalidraw/excalidraw";
import { createElement, render } from "preact/compat";

let excalidrawApi = null;
let currentSceneVersion = -1;
const SCENE_VERSION_INITIAL = -1;

function postMessage(handler, body) {
  try {
    window.webkit.messageHandlers[handler].postMessage(body);
  } catch (_) {}
}

function getTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function onChangeHandler() {
  if (!excalidrawApi) return;
  const elements = excalidrawApi.getSceneElements();
  const sceneVersion = getSceneVersion(elements);
  const isNew = currentSceneVersion === SCENE_VERSION_INITIAL || currentSceneVersion !== sceneVersion;
  const isNotInitial = currentSceneVersion !== SCENE_VERSION_INITIAL;
  if (isNew && isNotInitial) {
    currentSceneVersion = sceneVersion;
    postMessage("sceneChanged", "changed");
  }
}

// ---------------------------------------------------------------------------
// Keyboard-aware viewport: shrink the Excalidraw container when the iOS
// keyboard appears and scroll the canvas so the active text stays visible.
// ---------------------------------------------------------------------------
function setupKeyboardHandling() {
  if (!window.visualViewport) return;
  const root = document.getElementById("root");
  let fullHeight = window.innerHeight;

  function onResize() {
    const vvh = window.visualViewport.height;
    root.style.height = vvh + "px";

    if (!excalidrawApi) return;
    const keyboardOpen = vvh < fullHeight * 0.8;
    if (!keyboardOpen) return;

    requestAnimationFrame(() => {
      const ta = document.querySelector("textarea.excalidraw-wysiwyg");
      if (!ta) return;
      const rect = ta.getBoundingClientRect();
      const targetY = vvh * 0.35;
      const delta = rect.top - targetY;
      if (Math.abs(delta) < 30) return;
      const st = excalidrawApi.getAppState();
      excalidrawApi.updateScene({
        appState: { ...st, scrollY: st.scrollY - delta / st.zoom.value }
      });
    });
  }

  window.visualViewport.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", () => {
    fullHeight = window.innerHeight;
  });
}

// ---------------------------------------------------------------------------
// Touch helper: make it easier to re-enter text editing mode.
// Excalidraw requires a precise second tap on a selected text element.
// We watch for taps and, when the selected element is a text element, we
// simulate a double-click to trigger edit mode reliably.
// ---------------------------------------------------------------------------
function setupTextEditHelper() {
  let lastSelectedTextId = null;
  let lastTapTime = 0;

  document.addEventListener("pointerup", (e) => {
    if (!excalidrawApi || e.pointerType !== "touch") return;
    const appState = excalidrawApi.getAppState();
    const selectedIds = Object.keys(appState.selectedElementIds || {});
    if (selectedIds.length !== 1) { lastSelectedTextId = null; return; }

    const el = excalidrawApi.getSceneElements().find(
      (el) => el.id === selectedIds[0] && el.type === "text" && !el.isDeleted
    );
    if (!el) { lastSelectedTextId = null; return; }

    const now = Date.now();
    if (el.id === lastSelectedTextId && now - lastTapTime < 600) {
      // Already selected from a prior tap — fire a synthetic dblclick so
      // Excalidraw opens its WYSIWYG text editor.
      const canvas = document.querySelector(".excalidraw canvas.interactive");
      if (canvas) {
        const dbl = new MouseEvent("dblclick", {
          bubbles: true, cancelable: true,
          clientX: e.clientX, clientY: e.clientY,
        });
        canvas.dispatchEvent(dbl);
      }
      lastSelectedTextId = null;
    } else {
      lastSelectedTextId = el.id;
      lastTapTime = now;
    }
  }, { passive: true });
}

function App() {
  return createElement("div", { className: "excalidraw-wrapper", style: { width: "100%", height: "100%" } },
    createElement(Excalidraw, {
      theme: getTheme(),
      onChange: onChangeHandler,
      zenModeEnabled: false,
      gridModeEnabled: false,
      isCollaborating: false,
      detectScroll: false,
      handleKeyboardGlobally: false,
      autoFocus: true,
      excalidrawAPI: (api) => {
        excalidrawApi = api;
        setupKeyboardHandling();
        setupTextEditHelper();
        postMessage("canvasReady", "ready");
      },
      UIOptions: {
        canvasActions: {
          saveToActiveFile: false,
          export: false
        }
      }
    })
  );
}

window.canvasBridge = {
  loadScene(jsonString) {
    if (!excalidrawApi) return;
    try {
      const data = JSON.parse(jsonString);
      const elements = data.elements || [];

      // Only keep theme from appState — ignore desktop scroll/zoom which doesn't
      // translate to the mobile viewport; we'll scrollToContent() instead.
      const appState = { theme: getTheme() };

      const fileArray = [];
      const files = data.files || {};
      if (Array.isArray(files)) {
        files.forEach(f => { if (f && f.id) fileArray.push(f); });
      } else {
        for (const fileId in files) {
          fileArray.push(files[fileId]);
        }
      }

      excalidrawApi.updateScene({ elements, appState });
      excalidrawApi.addFiles(fileArray);
      excalidrawApi.history.clear();

      currentSceneVersion = getSceneVersion(excalidrawApi.getSceneElements());

      // Center content in the viewport after a frame so layout settles
      requestAnimationFrame(() => {
        if (excalidrawApi && elements.length > 0) {
          excalidrawApi.scrollToContent(excalidrawApi.getSceneElements(), { fitToViewport: true, viewportZoomFactor: 0.85 });
        }
      });
    } catch (e) {
      console.error("loadScene error:", e);
    }
  },

  async getSceneData() {
    if (!excalidrawApi) return { json: "{}", svg: "" };

    const elements = excalidrawApi.getSceneElements();
    const appState = excalidrawApi.getAppState();
    const files = excalidrawApi.getFiles();

    let svgString = "";
    try {
      const svg = await exportToSvg({ elements, appState, exportPadding: 5, files });
      svgString = svg.outerHTML;
    } catch (e) {
      console.error("SVG export error:", e);
    }

    const activeFiles = {};
    elements.forEach(element => {
      if ("fileId" in element && element.fileId && files[element.fileId]) {
        activeFiles[element.fileId] = files[element.fileId];
      }
    });

    const content = {
      type: "excalidraw",
      version: 2,
      elements: Array.from(elements),
      files: activeFiles,
      appState: {
        scrollX: appState.scrollX,
        scrollY: appState.scrollY,
        zoom: appState.zoom
      }
    };

    return {
      json: JSON.stringify(content),
      svg: svgString
    };
  }
};

render(createElement(App), document.getElementById("root"));
