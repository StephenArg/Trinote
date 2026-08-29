/**
 * Mobile selection handle layout for Trinote:
 *   left edge (top + bottom)  → drag-fill (copy / series options after release)
 *   right edge (top + bottom) → resize the selection range
 */
import {
  IUniverInstanceService,
  RANGE_TYPE,
  UniverInstanceType,
} from "@univerjs/core";
import {
  CustomObject,
  IRenderManagerService,
  Rect,
  ScrollTimer,
  ScrollTimerType,
  SHEET_VIEWPORT_KEY,
  Vector2,
} from "@univerjs/engine-render";
import { ISheetSelectionRenderService } from "@univerjs/sheets-ui";

const MOBILE_EXPANDING_SELECTION = "MOBILE_EXPANDING_SELECTION";

let protoPatchesApplied = false;

function getSheetSelectionService(injector) {
  const univerInstance = injector.get(IUniverInstanceService);
  const unit = univerInstance.getCurrentUnitOfType(UniverInstanceType.UNIVER_SHEET);
  if (!unit) return null;
  const render = injector.get(IRenderManagerService).getRenderById(unit.getUnitId());
  return render?.with(ISheetSelectionRenderService) ?? null;
}

function roundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/** Two offset squares — reads as copy / drag-fill (distinct from circular resize grips). */
function drawCopyFillIcon(ctx, cx, cy, badgeSize, iconColor) {
  const sq = badgeSize * 0.3;
  const spread = badgeSize * 0.11;
  ctx.fillStyle = iconColor;
  // Rear cell (upper-right)
  ctx.fillRect(cx + spread, cy - sq / 2 - spread * 0.35, sq, sq);
  // Front cell (lower-left)
  ctx.fillRect(cx - sq / 2 - spread * 0.35, cy + spread * 0.35, sq, sq);
}

function createFillHandle(_control, key, zIndex, style) {
  const touchSize = style.expandCornerSize || 40;
  // Resize grips draw at expandCornerSize/4 (~10px). Keep fill badges in that range.
  const visualSize = touchSize / 4;
  const badgeSize = visualSize * 1.2;
  const badgeRadius = Math.max(2, badgeSize * 0.22);
  const iconColor = style.autofillStroke || "#ffffff";
  const fillColor = style.stroke;
  const borderColor = style.autofillStroke || "#ffffff";

  const handle = new CustomObject(key + zIndex, (ctx) => {
    const cx = touchSize / 2;
    const cy = touchSize / 2;
    const x = cx - badgeSize / 2;
    const y = cy - badgeSize / 2;

    roundRectPath(ctx, x, y, badgeSize, badgeSize, badgeRadius);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    drawCopyFillIcon(ctx, cx, cy, badgeSize, iconColor);
  });

  handle.transformByState({ width: touchSize, height: touchSize });
  handle.zIndex = zIndex + 2;
  return handle;
}

function createResizeHandle(_control, key, zIndex, style) {
  const expandCornerSize = style.expandCornerSize || 12;
  const expandCornerInnerSize = expandCornerSize / 4;
  const autofillStrokeWidth = style.autofillStrokeWidth || 1;
  const rect = new Rect(key + zIndex, {
    zIndex: zIndex + 2,
    width: expandCornerSize,
    height: expandCornerSize,
    radius: expandCornerSize / 2,
    visualWidth: expandCornerInnerSize,
    visualHeight: expandCornerInnerSize,
    strokeWidth: autofillStrokeWidth,
  });
  rect.setProps({
    fill: style.stroke,
    stroke: style.autofillStroke,
    strokeScaleEnabled: false,
  });
  return rect;
}

function addHandleToControl(control, handle) {
  const rangeType = control.rangeType;
  if (rangeType === RANGE_TYPE.ROW) {
    control.rowHeaderGroup.addObjects(handle);
  } else if (rangeType === RANGE_TYPE.COLUMN) {
    control.columnHeaderGroup.addObjects(handle);
  } else {
    control.selectionShapeGroup.addObjects(handle);
  }
  control.getScene().addObjects([handle], 1);
}

function ensureTrinoteHandles(control) {
  if (control.__trinoteHandles) return control.__trinoteHandles;

  const style = control.currentStyle;
  const zIndex = control.zIndex;

  const handles = {
    fillTopLeft: createFillHandle(control, "__TrinoteFillTL__", zIndex, style),
    fillBottomLeft: createFillHandle(control, "__TrinoteFillBL__", zIndex, style),
    resizeTopRight: createResizeHandle(control, "__TrinoteResizeTR__", zIndex, style),
    resizeBottomRight: createResizeHandle(control, "__TrinoteResizeBR__", zIndex, style),
  };

  for (const rect of Object.values(handles)) {
    addHandleToControl(control, rect);
  }

  // Disable Univer's default diagonal corner targets so only our handles receive touches.
  if (control.fillControlTopLeft) {
    control.fillControlTopLeft.evented = false;
    control.fillControlTopLeft.hide();
  }
  if (control.fillControlBottomRight) {
    control.fillControlBottomRight.evented = false;
    control.fillControlBottomRight.hide();
  }

  control.__trinoteHandles = handles;
  return handles;
}

function positionTrinoteHandles(control) {
  const handles = control.__trinoteHandles;
  if (!handles) return;

  const size = control.currentStyle.expandCornerSize || 12;
  const half = size / 2;
  const { startX, startY, endX, endY } = control.selectionModel;

  if (control.selectionModel.rangeType !== RANGE_TYPE.NORMAL) return;

  handles.fillTopLeft.transformByState({ left: -half, top: -half });
  handles.fillBottomLeft.transformByState({ left: -half, top: endY - startY - half });
  handles.resizeTopRight.transformByState({ left: endX - startX - half, top: -half });
  handles.resizeBottomRight.transformByState({
    left: endX - startX - half,
    top: endY - startY - half,
  });
}

function patchMobileSelectionControlProto(control) {
  const proto = Object.getPrototypeOf(control);
  if (proto.__trinoteHandlePatch) return;
  proto.__trinoteHandlePatch = true;

  const origTransform = proto.transformControlPoint;
  proto.transformControlPoint = function (...args) {
    origTransform.apply(this, args);
    positionTrinoteHandles(this);
  };

  const origUpdateLayout = proto._updateLayoutOfSelectionControl;
  proto._updateLayoutOfSelectionControl = function (style) {
    origUpdateLayout.call(this, style);
    if (this._enableAutoFill === true && !this.__trinoteHandles) {
      ensureTrinoteHandles(this);
    }
    const handles = this.__trinoteHandles;
    if (handles) {
      const show = this._enableAutoFill === true;
      for (const rect of Object.values(handles)) {
        show ? rect.show() : rect.hide();
      }
    }
    positionTrinoteHandles(this);
  };
}

function bindResizeHandle(service, handle, expandingMode, rangeType) {
  handle.onPointerDown$.subscribeEvent((evt) => {
    service._expandingSelection = true;
    service._contextService.setContextValue(MOBILE_EXPANDING_SELECTION, true);
    service.expandingControlMode = expandingMode;
    service._selectionMoveStart$.next(service.getSelectionDataWithStyle());
    service._fillControlPointerDownHandler(evt, rangeType, service._activeViewport);
  });
}

function computeFillTargetRange(source, row, column) {
  let { startRow, endRow, startColumn, endColumn } = source;

  if (column < startColumn) startColumn = column;
  else if (column > endColumn) endColumn = column;

  if (row < startRow) startRow = row;
  else if (row > endRow) endRow = row;

  return { startRow, endRow, startColumn, endColumn };
}

function startMobileFillDrag(service, control, evt) {
  const skeleton = service._skeleton;
  const scene = service._scene;
  if (!skeleton || !scene) return;

  const source = {
    startRow: control.model.startRow,
    endRow: control.model.endRow,
    startColumn: control.model.startColumn,
    endColumn: control.model.endColumn,
  };

  const relativeCoords = scene.getCoordRelativeToViewport(
    Vector2.FromArray([evt.offsetX, evt.offsetY]),
  );
  const viewportMain = scene.getViewport(SHEET_VIEWPORT_KEY.VIEW_MAIN);
  const scrollTimer = ScrollTimer.create(scene, ScrollTimerType.ALL);
  scrollTimer.startScroll(relativeCoords.x, relativeCoords.y, viewportMain);

  let lastRow = source.endRow;
  let lastColumn = source.endColumn;
  let moveSub = null;
  let upSub = null;

  const cleanup = () => {
    moveSub?.unsubscribe();
    upSub?.unsubscribe();
    scrollTimer.dispose();
    scene.resetCursor();
    scene.enableObjectsEvent();
  };

  scene.disableObjectsEvent();
  moveSub = scene.onPointerMove$.subscribeEvent((moveEvt) => {
    const { offsetX, offsetY } = moveEvt;
    const { x, y } = scene.getCoordRelativeToViewport(
      Vector2.FromArray([offsetX, offsetY]),
    );
    const scrollXY = scene.getScrollXYInfoByViewport(Vector2.FromArray([offsetX, offsetY]));
    const { scaleX, scaleY } = scene.getAncestorScale();
    const cell = skeleton.getCellIndexByOffset(x, y, scaleX, scaleY, scrollXY);
    if (!cell) return;

    lastRow = cell.row;
    lastColumn = cell.column;
    const target = computeFillTargetRange(source, lastRow, lastColumn);
    control.selectionFilling$.next(target);

    scrollTimer.scrolling(x, y, () => {});
  });

  upSub = scene.onPointerUp$.subscribeEvent(() => {
    cleanup();
    const target = computeFillTargetRange(source, lastRow, lastColumn);
    const changed =
      target.startRow !== source.startRow ||
      target.endRow !== source.endRow ||
      target.startColumn !== source.startColumn ||
      target.endColumn !== source.endColumn;

    if (changed) {
      control.refreshSelectionFilled(target);
    }
  });
}

function bindFillHandle(service, control, handle) {
  handle.onPointerDown$.subscribeEvent((evt) => {
    startMobileFillDrag(service, control, evt);
  });
}

function wireControlHandles(service, control, rangeType) {
  if (control.__trinoteHandlesWired) return;
  control.__trinoteHandlesWired = true;

  patchMobileSelectionControlProto(control);
  const handles = ensureTrinoteHandles(control);
  positionTrinoteHandles(control);

  const resizeModes = (() => {
    switch (rangeType) {
      case RANGE_TYPE.ROW:
        return { topRight: "top", bottomRight: "bottom" };
      case RANGE_TYPE.COLUMN:
        return { topRight: "left", bottomRight: "right" };
      default:
        return { topRight: "top-right", bottomRight: "bottom-right" };
    }
  })();

  bindFillHandle(service, control, handles.fillTopLeft);
  bindFillHandle(service, control, handles.fillBottomLeft);
  bindResizeHandle(service, handles.resizeTopRight, resizeModes.topRight, rangeType);
  bindResizeHandle(service, handles.resizeBottomRight, resizeModes.bottomRight, rangeType);
}

function patchAnchorCellForTopRight(serviceProto) {
  if (serviceProto.__trinoteAnchorPatch) return;
  serviceProto.__trinoteAnchorPatch = true;

  const orig = serviceProto._changeCurrCellWhenControlPointerDown;
  serviceProto._changeCurrCellWhenControlPointerDown = function () {
    const activeSelectionControl = this.getActiveSelectionControl();
    const skeleton = this._skeleton;
    const { startRow, endRow, startColumn } = activeSelectionControl.model;

    if (this.expandingControlMode === "top-right") {
      const currCellRange = skeleton.getCellWithCoordByIndex(endRow, startColumn);
      activeSelectionControl.updateCurrCell(currCellRange);
      return currCellRange;
    }

    return orig.call(this);
  };
}

function patchNewSelectionControl(serviceProto) {
  if (serviceProto.__trinoteNewSelectionPatch) return;
  serviceProto.__trinoteNewSelectionPatch = true;

  const origNew = serviceProto.newSelectionControl;
  serviceProto.newSelectionControl = function (scene, skeleton, selection) {
    const control = origNew.call(this, scene, skeleton, selection);
    wireControlHandles(this, control, selection.range.rangeType);
    return control;
  };
}

function patchSelectionService(service, injector) {
  if (!service) return;

  const serviceProto = Object.getPrototypeOf(service);
  if (!protoPatchesApplied) {
    patchAnchorCellForTopRight(serviceProto);
    patchNewSelectionControl(serviceProto);
    protoPatchesApplied = true;
  }

  service.getSelectionControls().forEach((control) => {
    wireControlHandles(service, control, control.rangeType);
  });

  void injector;
}

export function configureMobileSelectionHandles(injector) {
  const service = getSheetSelectionService(injector);
  patchSelectionService(service, injector);
}

export function resetMobileSelectionHandlePatch() {
  // Prototype patches persist; per-control wiring runs again on the next workbook load.
}
