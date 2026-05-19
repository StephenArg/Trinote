// CSS — order matters: design first, then UI shells, then sheet-specific UI.
import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula-ui/lib/index.css";
import "@univerjs/sheets-numfmt-ui/lib/index.css";

import {
  CommandType,
  LocaleType,
  LogLevel,
  Univer,
  UniverInstanceType,
  mergeLocales,
} from "@univerjs/core";
import { FUniver } from "@univerjs/core/facade";
import "@univerjs/engine-formula/facade";
import "@univerjs/ui/facade";
import "@univerjs/docs-ui/facade";
import "@univerjs/sheets/facade";
import "@univerjs/sheets-ui/facade";
import "@univerjs/sheets-formula/facade";
import "@univerjs/sheets-numfmt/facade";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverMobileUIPlugin } from "@univerjs/ui";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsMobileUIPlugin } from "@univerjs/sheets-ui";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsFormulaUIPlugin } from "@univerjs/sheets-formula-ui";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { UniverSheetsNumfmtUIPlugin } from "@univerjs/sheets-numfmt-ui";

import DesignEnUS from "@univerjs/design/locale/en-US";
import UIEnUS from "@univerjs/ui/locale/en-US";
import DocsUIEnUS from "@univerjs/docs-ui/locale/en-US";
import SheetsEnUS from "@univerjs/sheets/locale/en-US";
import SheetsUIEnUS from "@univerjs/sheets-ui/locale/en-US";
import SheetsFormulaUIEnUS from "@univerjs/sheets-formula-ui/locale/en-US";
import SheetsNumfmtUIEnUS from "@univerjs/sheets-numfmt-ui/locale/en-US";

let univer = null;
let univerAPI = null;
let activeWorkbook = null;
let dirtyTimer = null;

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

// Public bridge consumed by SpreadsheetEditorView.swift.
window.univerBridge = {
  loadWorkbook(jsonString) {
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
      }

      activeWorkbook = univerAPI.createWorkbook(workbookData || {});
      try {
        activeWorkbook.onCommandExecuted((cmd) => {
          if (cmd && cmd.type === CommandType.MUTATION) {
            scheduleDirty();
          }
        });
      } catch (e) {
        log("onCommandExecuted wiring error: " + (e && e.message));
      }
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
    univer = new Univer({
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: mergeLocales(
          DesignEnUS,
          UIEnUS,
          DocsUIEnUS,
          SheetsEnUS,
          SheetsUIEnUS,
          SheetsFormulaUIEnUS,
          SheetsNumfmtUIEnUS,
        ),
      },
      logLevel: LogLevel.ERROR,
    });

    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverMobileUIPlugin, { container: "app" });

    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsMobileUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsFormulaUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin);
    univer.registerPlugin(UniverSheetsNumfmtUIPlugin);

    univerAPI = FUniver.newAPI(univer);

    window.univer = univer;
    window.univerAPI = univerAPI;

    postMessage("univerReady", "ready");
  } catch (e) {
    log("boot error: " + (e && e.message ? e.message : String(e)));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
