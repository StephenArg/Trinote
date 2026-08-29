/**
 * On mobile, Univer's scroll controller calls preventDefault() on every canvas touchstart,
 * which suppresses pointer events the float-image transformer needs. Skip that when the touch
 * hits a drawing object or when a drawing already has focus.
 */
import {
  FOCUSING_COMMON_DRAWINGS,
  IContextService,
  IUniverInstanceService,
  UniverInstanceType,
} from "@univerjs/core";
import {
  DRAWING_OBJECT_LAYER_INDEX,
  IRenderManagerService,
  Vector2,
} from "@univerjs/engine-render";

/** @type {WeakMap<HTMLCanvasElement, () => void>} */
const canvasDisposers = new WeakMap();

function isDrawingObject(obj) {
  if (!obj) return false;
  const key = String(obj.oKey ?? obj.key ?? obj.name ?? "");
  if (/drawing|image/i.test(key)) return true;
  const layer = obj.layerIndex ?? obj.zIndex;
  if (layer === DRAWING_OBJECT_LAYER_INDEX) return true;
  if (typeof obj.classType === "string" && /image|drawing/i.test(obj.classType)) return true;
  return false;
}

function pickDrawingAt(scene, offsetX, offsetY) {
  if (!scene || typeof scene.pick !== "function") return null;
  try {
    let current = scene.pick(Vector2.FromArray([offsetX, offsetY]));
    let guard = 0;
    while (current && guard++ < 8) {
      if (isDrawingObject(current)) return current;
      current = current.parent ?? current._parent;
    }
  } catch (_) {}
  return null;
}

function attachCanvasGuards(injector) {
  const contextService = injector.get(IContextService);
  const renderManager = injector.get(IRenderManagerService);
  const univerInstance = injector.get(IUniverInstanceService);
  const unit = univerInstance.getCurrentUnitOfType(UniverInstanceType.UNIVER_SHEET);
  if (!unit) return;

  const render = renderManager.getRenderById(unit.getUnitId());
  const scene = render?.scene;
  const engine = scene?.getEngine?.();
  const canvas = engine?.getCanvasElement?.();
  if (!(canvas instanceof HTMLCanvasElement)) return;
  if (canvasDisposers.has(canvas)) return;

  const shouldYieldToDrawing = (touch) => {
    if (contextService.getContextValue(FOCUSING_COMMON_DRAWINGS)) return true;
    if (!touch || touch.touches?.length !== 1) return false;
    const rect = canvas.getBoundingClientRect();
    const t = touch.touches[0];
    const offsetX = t.clientX - rect.left;
    const offsetY = t.clientY - rect.top;
    return !!pickDrawingAt(scene, offsetX, offsetY);
  };

  const guardTouchStart = (event) => {
    if (shouldYieldToDrawing(event)) {
      event.stopImmediatePropagation();
    }
  };

  const guardTouchMove = (event) => {
    if (contextService.getContextValue(FOCUSING_COMMON_DRAWINGS)) {
      event.stopImmediatePropagation();
    }
  };

  canvas.addEventListener("touchstart", guardTouchStart, { capture: true, passive: false });
  canvas.addEventListener("touchmove", guardTouchMove, { capture: true, passive: false });

  canvasDisposers.set(canvas, () => {
    canvas.removeEventListener("touchstart", guardTouchStart, { capture: true });
    canvas.removeEventListener("touchmove", guardTouchMove, { capture: true });
  });
}

export function configureMobileDrawingTouch(injector) {
  try {
    attachCanvasGuards(injector);
  } catch (e) {
    console.warn("configureMobileDrawingTouch:", e);
  }
}

export function resetMobileDrawingTouchPatch() {
  // Guards are tied to the canvas element; disposing the workbook clears the DOM tree.
}
