// CSS — order matches Trilium v0.105 Spreadsheet.tsx.
import "@univerjs/preset-sheets-core/lib/index.css";
import "@univerjs/preset-sheets-drawing/lib/index.css";
import "@univerjs/preset-sheets-sort/lib/index.css";
import "@univerjs/preset-sheets-conditional-formatting/lib/index.css";
import "@univerjs/preset-sheets-find-replace/lib/index.css";
import "@univerjs/preset-sheets-note/lib/index.css";
import "@univerjs/preset-sheets-filter/lib/index.css";
import "@univerjs/preset-sheets-hyper-link/lib/index.css";
import "@univerjs/preset-sheets-data-validation/lib/index.css";

import { CommandType, IURLImageService, LocaleType, LogLevel } from "@univerjs/core";
import { IDrawingManagerService, getDrawingShapeKeyByDrawingSearch } from "@univerjs/drawing";
import { IRenderManagerService } from "@univerjs/engine-render";
import {
  UniverSheetsConditionalFormattingMobileUIPlugin,
  UniverSheetsConditionalFormattingPreset,
  UniverSheetsConditionalFormattingUIPlugin,
} from "@univerjs/preset-sheets-conditional-formatting";
import {
  UniverMobileUIPlugin,
  UniverSheetsCorePreset,
  UniverSheetsMobileUIPlugin,
  UniverSheetsUIPlugin,
  UniverUIPlugin,
} from "@univerjs/preset-sheets-core";
import {
  UniverSheetsDataValidationMobileUIPlugin,
  UniverSheetsDataValidationPreset,
  UniverSheetsDataValidationUIPlugin,
} from "@univerjs/preset-sheets-data-validation";
import { UniverSheetsDrawingPreset } from "@univerjs/preset-sheets-drawing";
import {
  UniverSheetsFilterMobileUIPlugin,
  UniverSheetsFilterPreset,
  UniverSheetsFilterUIPlugin,
} from "@univerjs/preset-sheets-filter";
import { UniverSheetsFindReplacePreset } from "@univerjs/preset-sheets-find-replace";
import { UniverSheetsHyperLinkPreset } from "@univerjs/preset-sheets-hyper-link";
import { UniverSheetsNotePreset } from "@univerjs/preset-sheets-note";
import { UniverSheetsSortPreset } from "@univerjs/preset-sheets-sort";
import { createUniver, mergeLocales } from "@univerjs/presets";
import UniverPresetSheetsCoreEnUS from "@univerjs/preset-sheets-core/locales/en-US";
import UniverPresetSheetsConditionalFormattingEnUS from "@univerjs/preset-sheets-conditional-formatting/locales/en-US";
import UniverPresetSheetsDataValidationEnUS from "@univerjs/preset-sheets-data-validation/locales/en-US";
import UniverPresetSheetsDrawingEnUS from "@univerjs/preset-sheets-drawing/locales/en-US";
import UniverPresetSheetsFilterEnUS from "@univerjs/preset-sheets-filter/locales/en-US";
import UniverPresetSheetsFindReplaceEnUS from "@univerjs/preset-sheets-find-replace/locales/en-US";
import UniverPresetSheetsHyperLinkEnUS from "@univerjs/preset-sheets-hyper-link/locales/en-US";
import UniverPresetSheetsNoteEnUS from "@univerjs/preset-sheets-note/locales/en-US";
import UniverPresetSheetsSortEnUS from "@univerjs/preset-sheets-sort/locales/en-US";
import { CalculationMode } from "@univerjs/sheets-formula";
import {
  AUTO_FILL_APPLY_TYPE,
  AUTO_FILL_HOOK_TYPE,
  IAutoFillService,
} from "@univerjs/sheets";
import { IEditorBridgeService, SheetCellEditorResizeService } from "@univerjs/sheets-ui";
import {
  configureMobileSelectionHandles,
  resetMobileSelectionHandlePatch,
} from "./trinote-mobile-selection-handles.js";
import {
  configureMobileDrawingTouch,
  resetMobileDrawingTouchPatch,
} from "./trinote-mobile-drawing-touch.js";

/** @typedef {import('@univerjs/core').PluginCtor} PluginCtor */
/** @typedef {PluginCtor | [PluginCtor, Record<string, unknown>]} PluginEntry */
/** @typedef {{ plugins: PluginEntry[] }} UniverPreset */

let univerAPI = null;
let activeWorkbook = null;
let dirtyTimer = null;
let scrollAnchorDisposable = null;
let urlImageDownloaderDisposable = null;
let editorReadyPosted = false;

function postMessage(handler, body) {
  try {
    window.webkit.messageHandlers[handler].postMessage(body);
  } catch (_) {}
}

function log(msg) {
  try {
    postMessage("univerLog", String(msg));
  } catch (_) {}
}

function scheduleDirty() {
  if (dirtyTimer) clearTimeout(dirtyTimer);
  dirtyTimer = setTimeout(() => {
    dirtyTimer = null;
    postMessage("workbookChanged", "changed");
  }, 400);
}

// Desktop UI shell plugins mapped to touch-optimised mobile variants (Trilium v0.105).
/** @type {Map<PluginCtor, PluginCtor>} */
const DESKTOP_TO_MOBILE_UI = new Map([
  [UniverUIPlugin, UniverMobileUIPlugin],
  [UniverSheetsUIPlugin, UniverSheetsMobileUIPlugin],
  [UniverSheetsConditionalFormattingUIPlugin, UniverSheetsConditionalFormattingMobileUIPlugin],
  [UniverSheetsDataValidationUIPlugin, UniverSheetsDataValidationMobileUIPlugin],
  [UniverSheetsFilterUIPlugin, UniverSheetsFilterMobileUIPlugin],
]);

/** @param {UniverPreset[]} presets */
function toMobilePresets(presets) {
  return presets.map((preset) => ({
    ...preset,
    plugins: preset.plugins.map((entry) => {
      const [ctor, options] = Array.isArray(entry) ? entry : [entry, undefined];
      const mobileCtor = DESKTOP_TO_MOBILE_UI.get(ctor);
      if (!mobileCtor) return entry;
      return options === undefined ? mobileCtor : [mobileCtor, options];
    }),
  }));
}

function wireWorkbookMutationListener(workbook) {
  if (!workbook) return;
  try {
    workbook.onCommandExecuted((cmd) => {
      if (cmd && cmd.type === CommandType.MUTATION) {
        scheduleDirty();
      }
    });
  } catch (e) {
    log("onCommandExecuted wiring error: " + (e && e.message));
  }
}

function anchorCellEditorOnScroll() {
  if (!univerAPI) return;
  try {
    const injector = univerAPI._injector;
    scrollAnchorDisposable = univerAPI.addEvent(univerAPI.Event.Scroll, () => {
      const editorBridgeService = injector.get(IEditorBridgeService);
      if (!editorBridgeService.isVisible().visible) return;
      editorBridgeService.refreshEditCellPosition(false);
      injector.get(SheetCellEditorResizeService).fitTextSize();
    });
  } catch (e) {
    log("anchorCellEditorOnScroll error: " + (e && e.message));
  }
}

function fixRadixPortals() {
  function preventDismiss(e) {
    if (e.target instanceof HTMLElement && e.target.closest("[id^='radix-']")) {
      e.preventDefault();
    }
  }
  document.addEventListener("dismissableLayer.pointerDownOutside", preventDismiss, true);
  document.addEventListener("dismissableLayer.focusOutside", preventDismiss, true);
}

/**
 * Univer's Image shape sets `crossOrigin = "anonymous"` after assigning `src`.
 * That CORS mode fails for `data:` and custom-scheme URLs in WKWebView, so float
 * images fall back to the placeholder icon. Ignore crossOrigin for those sources.
 */
function patchImageCrossOriginForLocalSources() {
  const proto = HTMLImageElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(proto, "crossOrigin");
  if (!descriptor || descriptor.configurable === false) return;
  Object.defineProperty(proto, "crossOrigin", {
    configurable: true,
    enumerable: descriptor.enumerable,
    get() {
      return descriptor.get ? descriptor.get.call(this) : this.getAttribute("crossorigin");
    },
    set(value) {
      const src = this.getAttribute("src") || "";
      if (
        src.startsWith("data:") ||
        src.startsWith("trinote-img:") ||
        src.startsWith("blob:")
      ) {
        this.removeAttribute("crossorigin");
        return;
      }
      if (descriptor.set) descriptor.set.call(this, value);
      else if (value == null) this.removeAttribute("crossorigin");
      else this.setAttribute("crossorigin", String(value));
    },
  });
}

/** Tap the autofill options chip Univer renders after a drag-fill completes. */
function openAutoFillOptionsMenu() {
  const layers = document.querySelectorAll(".univer-z-10.univer-size-0");
  for (const layer of layers) {
    const trigger = layer.querySelector(".univer-flex.univer-items-center.univer-gap-2");
    if (trigger instanceof HTMLElement) {
      trigger.click();
      return;
    }
  }
}

/**
 * Drag-fill defaults to Copy cell (not Fill series). After fill, the options chip offers
 * Copy cell / Fill series / Format only / No format — same as Trilium desktop.
 */
function configureAutoFillBehavior(injector) {
  const autoFillService = injector.get(IAutoFillService);
  autoFillService.applyType = AUTO_FILL_APPLY_TYPE.COPY;

  // Registered last so preferTypes prefers COPY over built-in series detection on drag-fill.
  autoFillService.addHook({
    id: "trinote-copy-default",
    type: AUTO_FILL_HOOK_TYPE.APPEND,
    priority: 10000,
    onBeforeFillData: () => AUTO_FILL_APPLY_TYPE.COPY,
  });

  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (isTouch) {
    autoFillService.showMenu$.subscribe((show) => {
      if (!show) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => openAutoFillOptionsMenu());
      });
    });
  }
}

/** Float/cell URL images load through canvas Image; resolve Trilium URLs via the native bridge. */
const pendingNativeImageRequests = new Map();
let nativeImageRequestSeq = 0;

window.__trinoteResolveImage = (id, dataUrl, error) => {
  const pending = pendingNativeImageRequests.get(id);
  if (!pending) return;
  pendingNativeImageRequests.delete(id);
  if (error) pending.reject(new Error(error));
  else pending.resolve(dataUrl);
};

function requestNativeImageDataURL(url) {
  return new Promise((resolve, reject) => {
    const id = String(++nativeImageRequestSeq);
    const timer = setTimeout(() => {
      if (!pendingNativeImageRequests.has(id)) return;
      pendingNativeImageRequests.delete(id);
      reject(new Error("native image timeout: " + url));
    }, 20000);
    pendingNativeImageRequests.set(id, {
      resolve: (dataUrl) => {
        clearTimeout(timer);
        resolve(dataUrl);
      },
      reject: (err) => {
        clearTimeout(timer);
        reject(err);
      },
    });
    log("native image request " + id + " " + url);
    postMessage("trinoteImageRequest", { id, url });
  });
}

function isTrinoteManagedImageURL(url) {
  if (!url || url.startsWith("data:")) return false;
  if (url.startsWith("trinote-img:")) return true;
  return /api\/(attachments|images)\/[a-zA-Z0-9_-]+\//i.test(url);
}

async function fetchURLAsDataURL(url) {
  if (isTrinoteManagedImageURL(url)) {
    return requestNativeImageDataURL(url);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(/** @type {string} */ (reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("FileReader failed"));
    reader.readAsDataURL(blob);
  });
}

function configureURLImageDownloader() {
  if (!univerAPI?._injector) return false;
  try {
    const urlImageService = univerAPI._injector.get(IURLImageService);
    if (!urlImageService || typeof urlImageService.registerURLImageDownloader !== "function") {
      return false;
    }
    if (!urlImageDownloaderDisposable) {
      urlImageDownloaderDisposable = urlImageService.registerURLImageDownloader(async (url) => {
        if (!url || url.startsWith("data:")) return url;
        return fetchURLAsDataURL(url);
      });
      log("URL image downloader registered");
    }
    return true;
  } catch (e) {
    log("configureURLImageDownloader error: " + (e && e.message));
    return false;
  }
}

function applyDocumentDarkMode(on) {
  const enabled = !!on;
  document.documentElement.classList.toggle("univer-dark", enabled);
  document.body?.classList.toggle("univer-dark", enabled);
  document.documentElement.style.colorScheme = enabled ? "dark" : "light";
  if (document.body) {
    document.body.style.colorScheme = enabled ? "dark" : "light";
  }
}

function postEditorReady() {
  if (editorReadyPosted) return;
  editorReadyPosted = true;
  postMessage("univerReady", "ready");
  log("editor ready");
}

async function inlineImageNode(node) {
  if (!node || typeof node !== "object") return;
  if (node.imageSourceType !== "URL" || typeof node.source !== "string") return;
  if (!isTrinoteManagedImageURL(node.source)) return;
  if (!node.trinoteOriginalSrc) node.trinoteOriginalSrc = node.source;
  try {
    const dataUrl = await fetchURLAsDataURL(node.source);
    node.source = dataUrl;
    node.imageSourceType = "BASE64";
  } catch (e) {
    log("inline image failed: " + (e && e.message) + " " + node.source);
  }
}

async function walkAndInlineImages(value) {
  if (Array.isArray(value)) {
    for (const item of value) await walkAndInlineImages(item);
    return;
  }
  if (!value || typeof value !== "object") return;
  await inlineImageNode(value);
  for (const key of Object.keys(value)) {
    if (key === "trinoteOriginalSrc" || key === "source") continue;
    await walkAndInlineImages(value[key]);
  }
}

async function inlineWorkbookImages(workbookData) {
  if (!workbookData || typeof workbookData !== "object") return;
  await walkAndInlineImages(workbookData);
  const resources = workbookData.resources;
  if (!Array.isArray(resources)) return;
  for (const resource of resources) {
    if (resource.name !== "SHEET_DRAWING_PLUGIN") continue;
    if (typeof resource.data !== "string" || !resource.data || resource.data === "{}") continue;
    try {
      const parsed = JSON.parse(resource.data);
      await walkAndInlineImages(parsed);
      resource.data = JSON.stringify(parsed);
    } catch (e) {
      log("inline drawing resource error: " + (e && e.message));
    }
  }
}

async function hydrateRenderedDrawings() {
  if (!univerAPI || !activeWorkbook) return;
  try {
    const unitId = activeWorkbook.getId ? activeWorkbook.getId() : activeWorkbook.id;
    if (!unitId) return;
    const drawingManager = univerAPI._injector.get(IDrawingManagerService);
    const renderManager = univerAPI._injector.get(IRenderManagerService);
    const scene = renderManager.getRenderById(unitId)?.scene;
    if (!scene) return;
    const unitData = drawingManager.getDrawingDataForUnit(unitId) || {};
    for (const subUnitId of Object.keys(unitData)) {
      const drawings = unitData[subUnitId]?.data || {};
      for (const drawing of Object.values(drawings)) {
        const source = drawing && drawing.source;
        if (typeof source !== "string" || !source) continue;
        let url = source;
        if (isTrinoteManagedImageURL(url)) {
          try {
            url = await fetchURLAsDataURL(url);
          } catch (e) {
            log("hydrate image failed: " + (e && e.message));
            continue;
          }
        }
        if (!url.startsWith("data:")) continue;
        const key = getDrawingShapeKeyByDrawingSearch({
          unitId,
          subUnitId,
          drawingId: drawing.drawingId,
        });
        const shape = scene.getObject(key);
        if (shape && typeof shape.changeSource === "function") {
          shape.changeSource(url);
        }
      }
    }
  } catch (e) {
    log("hydrateRenderedDrawings error: " + (e && e.message));
  }
}

/** After a workbook exists, refresh float images once drawing renderers are live. */
function scheduleDrawingRefreshAfterRender() {
  if (!univerAPI || !activeWorkbook) return;

  const refresh = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hydrateRenderedDrawings();
      });
    });
  };

  const rendered = univerAPI.Enum.LifecycleStages.Rendered;
  if (univerAPI.getCurrentLifecycleStage() >= rendered) {
    refresh();
    return;
  }

  const disposable = univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (stage < rendered) return;
    disposable.dispose();
    refresh();
  });
}

/** Sheet plugins register asynchronously; wait until services like IAutoFillService exist. */
function deferPostBootSetup() {
  if (!univerAPI) return;

  const run = () => {
    configureURLImageDownloader();
    try {
      configureAutoFillBehavior(univerAPI._injector);
    } catch (e) {
      log("configureAutoFillBehavior error: " + (e && e.message));
    }
    try {
      configureMobileSelectionHandles(univerAPI._injector);
    } catch (e) {
      log("configureMobileSelectionHandles error: " + (e && e.message));
    }
    try {
      configureMobileDrawingTouch(univerAPI._injector);
    } catch (e) {
      log("configureMobileDrawingTouch error: " + (e && e.message));
    }
  };

  const rendered = univerAPI.Enum.LifecycleStages.Rendered;
  if (univerAPI.getCurrentLifecycleStage() >= rendered) {
    run();
    return;
  }

  const disposable = univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
    if (stage < rendered) return;
    disposable.dispose();
    run();
  });
}

// Public bridge consumed by SpreadsheetEditorView.swift.
window.univerBridge = {
  async loadWorkbook(jsonString) {
    if (!univerAPI) {
      log("loadWorkbook called before univerReady");
      return;
    }
    try {
      const wrapped = JSON.parse(jsonString || "{}");
      const workbookData = wrapped && wrapped.workbook ? wrapped.workbook : wrapped;

      if (activeWorkbook) {
        try {
          const unitId = activeWorkbook.getId ? activeWorkbook.getId() : (activeWorkbook.id || null);
          if (unitId) univerAPI.disposeUnit(unitId);
        } catch (e) {
          log("dispose old workbook error: " + (e && e.message));
        }
        activeWorkbook = null;
        resetMobileSelectionHandlePatch();
        resetMobileDrawingTouchPatch();
      }

      configureURLImageDownloader();
      await inlineWorkbookImages(workbookData || {});
      activeWorkbook = univerAPI.createWorkbook(workbookData || {});
      wireWorkbookMutationListener(activeWorkbook);
      try {
        configureMobileSelectionHandles(univerAPI._injector);
      } catch (e) {
        log("configureMobileSelectionHandles error: " + (e && e.message));
      }
      try {
        configureMobileDrawingTouch(univerAPI._injector);
      } catch (e) {
        log("configureMobileDrawingTouch error: " + (e && e.message));
      }
      scheduleDrawingRefreshAfterRender();
    } catch (e) {
      log("loadWorkbook error: " + (e && e.message));
    }
  },

  getWorkbook() {
    if (!activeWorkbook) {
      return JSON.stringify({ version: 1, workbook: {} });
    }
    try {
      const data = activeWorkbook.save();
      return JSON.stringify({ version: 1, workbook: data });
    } catch (e) {
      log("getWorkbook error: " + (e && e.message));
      return JSON.stringify({ version: 1, workbook: {} });
    }
  },

  setDarkMode(on) {
    applyDocumentDarkMode(on);
    if (!univerAPI) return;
    try {
      if (typeof univerAPI.toggleDarkMode === "function") {
        univerAPI.toggleDarkMode(!!on);
      }
    } catch (e) {
      log("setDarkMode error: " + (e && e.message));
    }
  },
};

function boot() {
  try {
    log("boot starting");
    applyDocumentDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    patchImageCrossOriginForLocalSources();
    fixRadixPortals();

    const presets = [
      UniverSheetsCorePreset({
        container: "app",
        toolbar: true,
        contextMenu: true,
        formulaBar: true,
        formula: { initialFormulaComputing: CalculationMode.NO_CALCULATION },
        menu: {
          "sheet.contextMenu.permission": { hidden: true },
          "sheet-permission.operation.openPanel": { hidden: true },
          "sheet.command.add-range-protection-from-toolbar": { hidden: true },
          "sheet.command.set-range-font-family": { hidden: true },
        },
      }),
      UniverSheetsDrawingPreset(),
      UniverSheetsFindReplacePreset(),
      UniverSheetsNotePreset(),
      UniverSheetsFilterPreset(),
      UniverSheetsSortPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsHyperLinkPreset(),
    ];

    const localeBundle = mergeLocales(
      UniverPresetSheetsCoreEnUS,
      UniverPresetSheetsDrawingEnUS,
      UniverPresetSheetsFindReplaceEnUS,
      UniverPresetSheetsNoteEnUS,
      UniverPresetSheetsFilterEnUS,
      UniverPresetSheetsSortEnUS,
      UniverPresetSheetsDataValidationEnUS,
      UniverPresetSheetsConditionalFormattingEnUS,
      UniverPresetSheetsHyperLinkEnUS,
    );

    const created = createUniver({
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: localeBundle,
      },
      logLevel: LogLevel.ERROR,
      presets: toMobilePresets(presets),
    });

    univerAPI = created.univerAPI;
    window.univerAPI = univerAPI;

    try {
      configureURLImageDownloader();
    } catch (e) {
      log("configureURLImageDownloader error: " + (e && e.message));
    }

    anchorCellEditorOnScroll();
    deferPostBootSetup();
    postEditorReady();
    log("boot complete");
  } catch (e) {
    log("boot error: " + (e && e.message ? e.message : String(e)));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
