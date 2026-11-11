import { createElement, useId, useImperativeHandle, useLayoutEffect, useRef } from "react";
//#region ts/base.tsx
const SVG_STROKE_ELEMENT_SELECTOR = "circle, ellipse, line, path, polygon, polyline, rect, text, textPath, tspan, use";
function IconBase({ ref, ...props }) {
	const { preserveStrokeWidth, icon, id, className, extend, ...restProps } = props;
	const cls = `univerjs-icon univerjs-icon-${id} ${className || ""}`.trim();
	const idSuffix = `_${useId()}`;
	const rootRef = useRef(null);
	useImperativeHandle(ref, () => rootRef.current);
	useLayoutEffect(() => {
		if (!preserveStrokeWidth || !rootRef.current || rootRef.current.localName !== icon.tag) return;
		return applyPreserveStrokeWidth(rootRef.current);
	}, [preserveStrokeWidth, icon]);
	return render(icon, `${id}`, {
		defIds: icon.defIds,
		idSuffix
	}, {
		ref: rootRef,
		className: cls,
		...restProps
	}, extend);
}
/**
* use react createElement to render an IconElement with other props
*/
function render(node, id, runtimeProps, rootProps, extend) {
	return createElement(node.tag, {
		key: id,
		...replaceRuntimeIdsAndExtInAttrs(node, runtimeProps, extend),
		...rootProps
	}, (replaceRuntimeIdsInDefs(node, runtimeProps).children || []).map((child, index) => render(child, `${id}-${node.tag}-${index}`, runtimeProps, void 0, extend)));
}
function replaceRuntimeIdsAndExtInAttrs(node, runtimeProps, extend) {
	const attrs = { ...node.attrs };
	if (extend?.colorChannel1 && attrs.fill === "colorChannel1") attrs.fill = extend.colorChannel1;
	if (extend?.colorChannel1 && attrs.stroke === "colorChannel1") attrs.stroke = extend.colorChannel1;
	if (node.tag === "mask" && attrs.id) attrs.id = attrs.id + runtimeProps.idSuffix;
	Object.entries(attrs).forEach(([key, value]) => {
		if (key === "mask" && typeof value === "string") attrs[key] = value.replace(/url\(#(.*)\)/, `url(#$1${runtimeProps.idSuffix})`);
	});
	const { defIds } = runtimeProps;
	if (!defIds || defIds.length === 0) return attrs;
	if (node.tag === "use" && attrs["xlink:href"]) attrs["xlink:href"] = attrs["xlink:href"] + runtimeProps.idSuffix;
	Object.entries(attrs).forEach(([key, value]) => {
		if (typeof value === "string") attrs[key] = value.replace(/url\(#(.*)\)/, `url(#$1${runtimeProps.idSuffix})`);
	});
	return attrs;
}
function replaceRuntimeIdsInDefs(node, runtimeProps) {
	const { defIds } = runtimeProps;
	if (!defIds || defIds.length === 0) return node;
	if (node.tag === "defs" && node.children?.length) return {
		...node,
		children: node.children.map((child) => {
			if (typeof child.attrs.id === "string") {
				if (defIds && defIds.includes(child.attrs.id)) return {
					...child,
					attrs: {
						...child.attrs,
						id: child.attrs.id + runtimeProps.idSuffix
					}
				};
			}
			return child;
		})
	};
	return node;
}
/** Keep scalable strokes at their 16×16 baseline width as the viewport resizes. */
function applyPreserveStrokeWidth(root) {
	const viewBox = root.viewBox.baseVal;
	const viewBoxSize = Math.max(viewBox.width, viewBox.height);
	if (!Number.isFinite(viewBoxSize) || viewBoxSize <= 0 || viewBox.width <= 0 || viewBox.height <= 0) return () => void 0;
	const baselineViewportScale = 16 / viewBoxSize;
	const overrides = Array.from(root.querySelectorAll(SVG_STROKE_ELEMENT_SELECTOR)).flatMap((element) => {
		const computedStyle = getComputedStyle(element);
		const strokeWidth = Number.parseFloat(computedStyle.strokeWidth);
		if (computedStyle.stroke === "none" || Number.parseFloat(computedStyle.strokeOpacity) === 0 || computedStyle.vectorEffect === "non-scaling-stroke" || !Number.isFinite(strokeWidth) || strokeWidth <= 0) return [];
		return [{
			element,
			hadStyleAttribute: element.hasAttribute("style"),
			originalStrokeWidth: strokeWidth,
			strokeWidth: getInlineStyleSnapshot(element.style, "stroke-width")
		}];
	}).map((measurement) => ({
		appliedStrokeWidth: null,
		element: measurement.element,
		hadStyleAttribute: measurement.hadStyleAttribute,
		isReleased: false,
		originalStrokeWidth: measurement.originalStrokeWidth,
		strokeWidth: measurement.strokeWidth
	}));
	if (overrides.length === 0) return () => void 0;
	const updateStrokeWidths = (width, height) => {
		if (viewBox.width <= 0 || viewBox.height <= 0 || width <= 0 || height <= 0) return;
		const currentViewportScale = Math.min(width / viewBox.width, height / viewBox.height);
		if (!Number.isFinite(currentViewportScale) || currentViewportScale <= 0) return;
		overrides.forEach((override) => {
			if (override.isReleased) return;
			if (override.appliedStrokeWidth !== null && (override.element.style.getPropertyValue("stroke-width") !== override.appliedStrokeWidth || override.element.style.getPropertyPriority("stroke-width") !== override.strokeWidth.priority)) {
				override.appliedStrokeWidth = null;
				override.isReleased = true;
				return;
			}
			const strokeWidth = override.originalStrokeWidth * baselineViewportScale / currentViewportScale;
			const appliedStrokeWidth = `${Number(strokeWidth.toFixed(12))}px`;
			override.element.style.setProperty("stroke-width", appliedStrokeWidth, override.strokeWidth.priority);
			override.appliedStrokeWidth = appliedStrokeWidth;
		});
	};
	const initialBounds = root.getBoundingClientRect();
	updateStrokeWidths(initialBounds.width, initialBounds.height);
	const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver((entries) => {
		if (entries.some((candidate) => candidate.target === root)) {
			const bounds = root.getBoundingClientRect();
			updateStrokeWidths(bounds.width, bounds.height);
		}
	});
	resizeObserver?.observe(root);
	return () => {
		resizeObserver?.disconnect();
		overrides.forEach((override) => {
			if (override.appliedStrokeWidth === null) return;
			restoreInlineStyle(override.element.style, "stroke-width", override.appliedStrokeWidth, override.strokeWidth.priority, override.strokeWidth);
			if (!override.hadStyleAttribute && override.element.style.length === 0) override.element.removeAttribute("style");
		});
	};
}
function getInlineStyleSnapshot(style, property) {
	return {
		priority: style.getPropertyPriority(property),
		value: style.getPropertyValue(property)
	};
}
function restoreInlineStyle(style, property, appliedValue, appliedPriority, snapshot) {
	if (style.getPropertyValue(property) !== appliedValue || style.getPropertyPriority(property) !== appliedPriority) return;
	if (snapshot.value) style.setProperty(property, snapshot.value, snapshot.priority);
	else style.removeProperty(property);
}
IconBase.displayName = "UniverIcon";
//#endregion
export { IconBase };
