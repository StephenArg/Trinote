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

import { CommandType, ICommandService, IURLImageService, LocaleType, LogLevel } from "@univerjs/core";
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
  ClearSelectionContentCommand,
  IAutoFillService,
  SetRangeValuesMutation,
} from "@univerjs/sheets";
import { ComponentManager } from "@univerjs/ui";
import {
  AutoFillPopupMenu,
  AutoFillUIController,
  IEditorBridgeService,
  SheetCellEditorResizeService,
} from "@univerjs/sheets-ui";
import {
  configureMobileSelectionHandles,
  debugHandlePoints,
  debugSelectionHandles,
  isSheetSelectionServiceReady,
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
// A value edit is followed by a recalculation; a save waits for its results, as Trilium v0.105+ does.
let recalcPending = false;
let cellReportScheduled = false;
let lastCellReport = null;
// Fingers on the page. Reports wait until they lift: an update mid-gesture mustn't touch a drag of a selection's
// corners (or anything else under the finger).
const activePointers = new Set();
let lastPointerEventAt = 0;
let lastPointerUpAt = 0;
let cellReportWaitingForPointer = false;

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

let mutationListener = null;

function wireWorkbookMutationListener(workbook) {
  if (!workbook) return;
  try {
    mutationListener?.dispose();
    const unitId = workbook.getId();
    // The command service rather than `workbook.onCommandExecuted`, which drops the options that say a write is a
    // formula result.
    mutationListener = univerAPI._injector.get(ICommandService).onCommandExecuted((cmd, options) => {
      if (!cmd || !cmd.params || cmd.params.unitId !== unitId) return;
      // Not edits: what the cell bar shows while typing (put back before the real write), what's written meanwhile, and
      // formula results, which follow an edit that already counted (and a save waits for them).
      const isQuiet = cmd.params.trinotePreview || quietWriteDepth > 0 || (options && options.fromFormula);
      if (cmd.type === CommandType.MUTATION && isQuiet) {
        reportActiveCell();
        return;
      }
      if (cmd.type === CommandType.MUTATION) {
        // Recalculation results are written without a trigger, so they don't re-arm this.
        if (cmd.id === "sheet.mutation.set-range-values" && cmd.params && cmd.params.trigger) {
          recalcPending = true;
        }
        scheduleDirty();
      }
      // Selecting, switching sheets and opening the in-cell editor are commands too; only changes are sent.
      reportActiveCell();
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

/** The autofill options chip Univer shows after a fill, found by its icon (its wrapper's classes change between versions). */
function autoFillOptionsTrigger() {
  const icon = document.querySelector("svg.univerjs-icon-autofill-double-icon");
  const trigger = icon && icon.closest("div");
  return trigger instanceof HTMLElement ? trigger : null;
}

/** Opens the chip's menu (Copy Cell, Fill Series, Format Only, No Format): a phone can't hover to reveal it. */
function openAutoFillOptionsMenu(attemptsLeft = 10) {
  const trigger = autoFillOptionsTrigger();
  if (!trigger) {
    // The popup mounts a frame or two after the fill.
    if (attemptsLeft > 0) setTimeout(() => openAutoFillOptionsMenu(attemptsLeft - 1), 50);
    return;
  }
  // The menu opens on a primary pointer press, as Radix menus do.
  trigger.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true, button: 0, pointerType: "mouse" }));
  if (!document.querySelector("[role=menuitemradio]")) trigger.click();
}

/**
 * Univer 1.x sets up autofill's options chip (Copy Cell, Fill Series, Format Only, No Format) only in the desktop UI
 * plugin: its controller and the menu component it shows. The mobile plugin Trinote uses has neither, so a fill couldn't
 * be changed to a series. Both are added here. (The render controller that turns a fill drag into filled cells isn't
 * exported; Trinote's fill handles run the fill command themselves.)
 */
const AUTO_FILL_POPUP_MENU_COMPONENT = "sheets.component.auto-fill-popup-menu";
let mobileAutoFillRegistered = false;
function registerMobileAutoFill(injector) {
  if (mobileAutoFillRegistered) return;
  mobileAutoFillRegistered = true;
  try {
    const components = injector.get(ComponentManager);
    if (!components.get(AUTO_FILL_POPUP_MENU_COMPONENT)) {
      components.register(AUTO_FILL_POPUP_MENU_COMPONENT, AutoFillPopupMenu);
    }
  } catch (e) {
    log("register AutoFillPopupMenu error: " + (e && e.message));
  }
  try {
    if (!injector.has(AutoFillUIController)) injector.add([AutoFillUIController]);
    injector.get(AutoFillUIController);
  } catch (e) {
    log("register AutoFillUIController error: " + (e && e.message));
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

// MARK: The native cell bar

function editorBridgeService() {
  try {
    return univerAPI._injector.get(IEditorBridgeService);
  } catch (_) {
    return null;
  }
}

function isEditingInCell() {
  const service = editorBridgeService();
  try {
    return !!(service && service.isVisible().visible);
  } catch (_) {
    return false;
  }
}

/** What the cell bar shows for a cell: its formula, or its value as one would type it. */
function cellInputText(cell) {
  const formula = cell.getFormula();
  if (formula) return formula;
  const data = cell.getCellData();
  if (!data) return "";
  let pattern = "";
  try {
    pattern = typeof cell.getNumberFormat === "function" ? cell.getNumberFormat() || "" : "";
  } catch (_) {}
  // Rich text, and numbers shown through a format (dates, percentages, currency), read as displayed.
  if (data.p || (pattern && pattern.toLowerCase() !== "general")) return cell.getDisplayValue();
  const value = data.v;
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  if (data.t === 3 || data.t === "boolean") return value ? "TRUE" : "FALSE";
  return String(value);
}

function activeCellState() {
  const workbook = univerAPI && univerAPI.getActiveWorkbook();
  if (!workbook) return null;
  const sheet = workbook.getActiveSheet();
  const selection = sheet.getSelection();
  const current = selection.getCurrentCell();
  const range = selection.getActiveRange();
  if (!current || !range) return null;
  const row = current.actualRow;
  const column = current.actualColumn;
  const cell = sheet.getRange(row, column);
  const bounds = range.getRange();
  const ranges = selection.getActiveRangeList();
  // A merged cell's selection spans the merge, and is still one cell.
  const isOneCell = ranges.length === 1
    && bounds.startRow === current.startRow && bounds.endRow === current.endRow
    && bounds.startColumn === current.startColumn && bounds.endColumn === current.endColumn;
  return {
    sheetId: sheet.getSheetId(),
    row,
    column,
    address: cell.getA1Notation(),
    range: range.getA1Notation(),
    isRange: !isOneCell,
    text: cellInputText(cell),
    isEditingInCell: isEditingInCell(),
    // Chosen by a finger just now, not by Trinote (Return moves down) or Univer itself.
    fromTap: Date.now() - lastPointerUpAt < 700,
  };
}

function isPointerDown() {
  // A lift that never arrived (a gesture taken over by the system) stops counting after a quiet moment.
  if (activePointers.size && Date.now() - lastPointerEventAt > 2000) activePointers.clear();
  return activePointers.size > 0;
}

function trackPointers() {
  const touched = () => {
    lastPointerEventAt = Date.now();
  };
  document.addEventListener("pointerdown", (e) => {
    touched();
    activePointers.add(e.pointerId);
  }, true);
  document.addEventListener("pointermove", touched, true);
  const lifted = (e) => {
    touched();
    if (e.type === "pointerup") lastPointerUpAt = Date.now();
    activePointers.delete(e.pointerId);
    if (!activePointers.size && cellReportWaitingForPointer) {
      cellReportWaitingForPointer = false;
      reportActiveCell();
    }
  };
  document.addEventListener("pointerup", lifted, true);
  document.addEventListener("pointercancel", lifted, true);
}

/** Tells native which cell is selected and what it holds, once for a burst of changes. */
function reportActiveCell() {
  if (cellReportScheduled) return;
  cellReportScheduled = true;
  setTimeout(() => {
    cellReportScheduled = false;
    if (isPointerDown()) {
      cellReportWaitingForPointer = true;
      setTimeout(() => {
        if (cellReportWaitingForPointer && !isPointerDown()) {
          cellReportWaitingForPointer = false;
          reportActiveCell();
        }
      }, 2100);
      return;
    }
    let state = null;
    try {
      state = activeCellState();
    } catch (e) {
      log("activeCellState error: " + (e && e.message));
    }
    const report = state ? JSON.stringify(state) : "";
    if (report === lastCellReport) return;
    lastCellReport = report;
    postMessage("cellSelection", report);
  }, 30);
}

function sheetById(sheetId) {
  const workbook = univerAPI && univerAPI.getActiveWorkbook();
  return workbook ? workbook.getSheetBySheetId(sheetId) : null;
}

/* What's typed in the cell bar shows in its cell as it's typed. That's a mutation (no undo step, no save) over the cell,
   whose original is kept and put back exactly before the real write, so the typing ends as one edit to undo. */
const cellPreviews = new Map();
let quietWriteDepth = 0;

function previewKey(sheetId, row, column) {
  return sheetId + ":" + row + ":" + column;
}

function writeCellQuietly(sheetId, row, column, value) {
  const workbook = univerAPI && univerAPI.getActiveWorkbook();
  if (!workbook) return;
  quietWriteDepth += 1;
  try {
    univerAPI._injector.get(ICommandService).syncExecuteCommand(SetRangeValuesMutation.id, {
      unitId: workbook.getId(),
      subUnitId: sheetId,
      cellValue: { [row]: { [column]: value } },
      trinotePreview: true,
    });
  } finally {
    quietWriteDepth -= 1;
  }
}

/** Puts back the cell a preview covered: emptied first, since a write merges into what's there. */
function restorePreviewedCell(sheetId, row, column) {
  const key = previewKey(sheetId, row, column);
  if (!cellPreviews.has(key)) return;
  const original = cellPreviews.get(key);
  cellPreviews.delete(key);
  writeCellQuietly(sheetId, row, column, null);
  if (original) writeCellQuietly(sheetId, row, column, original);
}

/** Drops what Trilium v0.107 drops on save (`slimWorkbookData`); every version loads the result. */
function slimWorkbookData(data) {
  delete data.id;
  delete data.locale;
  if (Array.isArray(data.resources)) {
    data.resources = data.resources.filter((resource) => resource.data !== "" && resource.data !== "{}");
  }
  return data;
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
    const scene = renderManager.getRenderUnitById(unitId)?.scene;
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
    registerMobileAutoFill(univerAPI._injector);
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

/** Univer 1.x makes a workbook current and builds its renderer after `createWorkbook` returns; the touch patches need both. */
function whenWorkbookRenderReady(run, attemptsLeft = 100) {
  const workbook = activeWorkbook;
  let ready = false;
  try {
    ready = isSheetSelectionServiceReady(univerAPI._injector);
  } catch (_) {}
  if (ready || attemptsLeft <= 0) {
    run();
    return;
  }
  setTimeout(() => {
    if (activeWorkbook === workbook) whenWorkbookRenderReady(run, attemptsLeft - 1);
  }, 50);
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

      cellPreviews.clear();
      configureURLImageDownloader();
      await inlineWorkbookImages(workbookData || {});
      activeWorkbook = univerAPI.createWorkbook(workbookData || {});
      wireWorkbookMutationListener(activeWorkbook);
      whenWorkbookRenderReady(() => {
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
      });
      scheduleDrawingRefreshAfterRender();
      lastCellReport = null;
      reportActiveCell();
    } catch (e) {
      log("loadWorkbook error: " + (e && e.message));
    }
  },

  debugSelectionHandles() {
    return JSON.stringify(debugSelectionHandles(univerAPI._injector));
  },

  debugHandlePoints() {
    return JSON.stringify(debugHandlePoints(univerAPI._injector));
  },

  async getWorkbook() {
    if (!activeWorkbook) {
      return JSON.stringify({ version: 1, workbook: {} });
    }
    if (recalcPending) {
      try {
        await univerAPI.getFormula().onCalculationResultApplied(3000);
      } catch (_) {
        // Took too long: save what's there rather than not at all.
      }
      recalcPending = false;
    }
    try {
      const data = slimWorkbookData(activeWorkbook.save());
      return JSON.stringify({ version: 1, workbook: data });
    } catch (e) {
      log("getWorkbook error: " + (e && e.message));
      return JSON.stringify({ version: 1, workbook: {} });
    }
  },

  /** The selected cell as the cell bar shows it, or "" with no workbook. */
  activeCell() {
    const state = activeCellState();
    return state ? JSON.stringify(state) : "";
  },

  /** Writes what was typed in the cell bar, read as Univer's own cell editor reads it: `=` starts a formula. */
  setCellInput(sheetId, row, column, text) {
    const sheet = sheetById(sheetId);
    if (!sheet) return false;
    restorePreviewedCell(sheetId, row, column);
    const cell = sheet.getRange(row, column);
    if (text === "") cell.setValue({ v: null, f: null, p: null });
    else cell.setValue(text);
    return true;
  },

  /** Shows `text` in the cell while it's typed in the bar, as typed (a formula as its text), keeping the cell's format. */
  previewCellInput(sheetId, row, column, text) {
    const sheet = sheetById(sheetId);
    if (!sheet) return false;
    const key = previewKey(sheetId, row, column);
    if (!cellPreviews.has(key)) {
      const data = sheet.getRange(row, column).getCellData();
      cellPreviews.set(key, data ? JSON.parse(JSON.stringify(data)) : null);
    }
    writeCellQuietly(sheetId, row, column, { v: text === "" ? null : text, f: null, si: null, p: null });
    return true;
  },

  /** The typing was dropped: the cell as it was. */
  endCellPreview(sheetId, row, column) {
    restorePreviewedCell(sheetId, row, column);
    return true;
  },

  selectCell(sheetId, row, column) {
    const sheet = sheetById(sheetId);
    if (!sheet || row < 0 || column < 0) return false;
    sheet.getRange(row, column).activate();
    return true;
  },

  /** Empties every selected cell, keeping its formatting: one step to undo. */
  clearSelectedCells() {
    const workbook = univerAPI && univerAPI.getActiveWorkbook();
    if (!workbook) return false;
    const sheet = workbook.getActiveSheet();
    const ranges = sheet.getSelection().getActiveRangeList().map((range) => range.getRange());
    if (!ranges.length) return false;
    return univerAPI.executeCommand(ClearSelectionContentCommand.id, {
      unitId: workbook.getId(),
      subUnitId: sheet.getSheetId(),
      ranges,
    });
  },

  undo() {
    return univerAPI ? univerAPI.undo() : false;
  },

  redo() {
    return univerAPI ? univerAPI.redo() : false;
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
    trackPointers();

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
