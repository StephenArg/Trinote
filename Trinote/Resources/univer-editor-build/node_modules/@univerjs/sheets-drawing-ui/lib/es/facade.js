import { SheetSkeletonService } from "@univerjs/sheets";
import { ISheetDrawingService, InsertSheetDrawingCommand, RemoveSheetDrawingCommand, SetSheetDrawingCommand, transformToAxisAlignPosition, transformToDrawingPosition } from "@univerjs/sheets-drawing";
import { FileNamePart, IBatchSaveImagesService, SheetCanvasFloatDomManagerService, SheetDrawingUpdateController } from "@univerjs/sheets-drawing-ui";
import { transformComponentKey } from "@univerjs/sheets-ui/facade";
import { FRange, FWorksheet } from "@univerjs/sheets/facade";
import { ComponentManager } from "@univerjs/ui";
import { FEventName, FUniver } from "@univerjs/core/facade";
import { CanceledError, DrawingTypeEnum, ICommandService, IURLImageService, IUniverInstanceService, UniverInstanceType } from "@univerjs/core";
import { IDrawingManagerService } from "@univerjs/drawing";
import { IRenderManagerService, getCurrentTypeOfRenderer } from "@univerjs/engine-render";

//#region src/facade/f-worksheet.ts
var FWorksheetDrawingUIMixin = class extends FWorksheet {
	getFloatDomById(id) {
		const info = this._injector.get(SheetCanvasFloatDomManagerService).getFloatDomInfo(id);
		if (!info) return null;
		const { unitId, subUnitId } = info;
		const { rect } = info;
		const { left = 0, top = 0, width = 0, height = 0, flipX = false, flipY = false, angle = 0, skewX = 0, skewY = 0 } = rect.getState();
		const drawingParm = this._injector.get(ISheetDrawingService).getDrawingByParam({
			drawingId: info.id,
			unitId,
			subUnitId
		});
		if (!drawingParm) return null;
		return {
			position: {
				left,
				top,
				width,
				height,
				flipX,
				flipY,
				angle,
				skewX,
				skewY
			},
			componentKey: drawingParm.componentKey,
			allowTransform: drawingParm.allowTransform,
			data: drawingParm.data,
			id: info.id
		};
	}
	getAllFloatDoms() {
		const floatDomService = this._injector.get(SheetCanvasFloatDomManagerService);
		const unitId = this._workbook.getUnitId();
		const subUnitId = this._worksheet.getSheetId();
		return Array.from(floatDomService.getFloatDomsBySubUnitId(unitId, subUnitId).values()).map((info) => {
			const { rect } = info;
			const drawingParm = this._injector.get(ISheetDrawingService).getDrawingByParam({
				drawingId: info.id,
				unitId,
				subUnitId
			});
			const { left, top, width, height, flipX, flipY, angle, skewX, skewY } = rect.getState();
			return {
				position: {
					left,
					top,
					width,
					height,
					flipX,
					flipY,
					angle,
					skewX,
					skewY
				},
				componentKey: drawingParm.componentKey,
				allowTransform: drawingParm.allowTransform,
				data: drawingParm.data,
				id: info.id
			};
		});
	}
	updateFloatDom(id, config) {
		var _transformToDrawingPo, _transformToAxisAlign;
		const sheetSkeletonService = this._injector.get(SheetSkeletonService);
		const info = this._injector.get(SheetCanvasFloatDomManagerService).getFloatDomInfo(id);
		if (!info) return this;
		const { unitId, subUnitId } = info;
		const skeleton = sheetSkeletonService.getSkeleton(unitId, subUnitId);
		if (!skeleton) return this;
		const drawingParm = this._injector.get(ISheetDrawingService).getDrawingByParam({
			unitId,
			subUnitId,
			drawingId: id
		});
		const newParam = {
			...drawingParm,
			componentKey: config.componentKey || drawingParm.componentKey,
			allowTransform: config.allowTransform !== void 0 ? config.allowTransform : drawingParm.allowTransform,
			data: config.data || drawingParm.data,
			sheetTransform: config.position ? (_transformToDrawingPo = transformToDrawingPosition(config.position, skeleton)) !== null && _transformToDrawingPo !== void 0 ? _transformToDrawingPo : drawingParm.sheetTransform : drawingParm.sheetTransform,
			transform: {
				...drawingParm.transform,
				...config.position
			},
			axisAlignSheetTransform: config.position ? (_transformToAxisAlign = transformToAxisAlignPosition(config.position, skeleton)) !== null && _transformToAxisAlign !== void 0 ? _transformToAxisAlign : drawingParm.sheetTransform : drawingParm.sheetTransform
		};
		if (!this._commandService.syncExecuteCommand(SetSheetDrawingCommand.id, {
			unitId,
			subUnitId,
			drawings: [newParam]
		})) throw new Error("updateFloatDom failed");
		return this;
	}
	batchUpdateFloatDoms(updates) {
		const floatDomService = this._injector.get(SheetCanvasFloatDomManagerService);
		const drawingService = this._injector.get(ISheetDrawingService);
		const sheetSkeletonService = this._injector.get(SheetSkeletonService);
		const drawings = [];
		for (const update of updates) {
			var _transformToDrawingPo2, _transformToAxisAlign2;
			const info = floatDomService.getFloatDomInfo(update.id);
			if (!info) continue;
			const { unitId, subUnitId } = info;
			const skeleton = sheetSkeletonService.getSkeleton(unitId, subUnitId);
			if (!skeleton) continue;
			const drawingParm = drawingService.getDrawingByParam({
				unitId,
				subUnitId,
				drawingId: update.id
			});
			if (!drawingParm) continue;
			const newParam = {
				...drawingParm,
				componentKey: update.config.componentKey || drawingParm.componentKey,
				allowTransform: update.config.allowTransform !== void 0 ? update.config.allowTransform : drawingParm.allowTransform,
				data: update.config.data || drawingParm.data,
				sheetTransform: update.config.position ? (_transformToDrawingPo2 = transformToDrawingPosition(update.config.position, skeleton)) !== null && _transformToDrawingPo2 !== void 0 ? _transformToDrawingPo2 : drawingParm.sheetTransform : drawingParm.sheetTransform,
				transform: {
					...drawingParm.transform,
					...update.config.position
				},
				axisAlignSheetTransform: update.config.position ? (_transformToAxisAlign2 = transformToAxisAlignPosition(update.config.position, skeleton)) !== null && _transformToAxisAlign2 !== void 0 ? _transformToAxisAlign2 : drawingParm.sheetTransform : drawingParm.sheetTransform
			};
			drawings.push(newParam);
		}
		if (drawings.length > 0) {
			const unitId = this._workbook.getUnitId();
			const subUnitId = this._worksheet.getSheetId();
			if (!this._commandService.syncExecuteCommand(SetSheetDrawingCommand.id, {
				unitId,
				subUnitId,
				drawings
			})) throw new Error("batchUpdateFloatDoms failed");
		}
		return this;
	}
	removeFloatDom(id) {
		this._injector.get(SheetCanvasFloatDomManagerService).removeFloatDom(id);
		return this;
	}
	addFloatDomToPosition(layer, id) {
		const unitId = this._workbook.getUnitId();
		const subUnitId = this._worksheet.getSheetId();
		const { key, disposableCollection } = transformComponentKey(layer, this._injector.get(ComponentManager));
		const res = this._injector.get(SheetCanvasFloatDomManagerService).addFloatDomToPosition({
			...layer,
			componentKey: key,
			unitId,
			subUnitId
		}, id);
		if (res) {
			disposableCollection.add(res.dispose);
			return {
				id: res.id,
				dispose: () => {
					disposableCollection.dispose();
					res.dispose();
				}
			};
		}
		disposableCollection.dispose();
		return null;
	}
	addFloatDomToRange(fRange, layer, domLayout, id) {
		const unitId = this._workbook.getUnitId();
		const subUnitId = this._worksheet.getSheetId();
		const { key, disposableCollection } = transformComponentKey(layer, this._injector.get(ComponentManager));
		const res = this._injector.get(SheetCanvasFloatDomManagerService).addFloatDomToRange(fRange.getRange(), {
			...layer,
			componentKey: key,
			unitId,
			subUnitId
		}, domLayout, id);
		if (res) {
			disposableCollection.add(res.dispose);
			return {
				id: res.id,
				dispose: () => {
					disposableCollection.dispose();
					res.dispose();
				}
			};
		}
		disposableCollection.dispose();
		return null;
	}
	addFloatDomToColumnHeader(column, layer, domLayout, id) {
		const unitId = this._workbook.getUnitId();
		const subUnitId = this._worksheet.getSheetId();
		const { key, disposableCollection } = transformComponentKey(layer, this._injector.get(ComponentManager));
		const domRangeDispose = this._injector.get(SheetCanvasFloatDomManagerService).addFloatDomToColumnHeader(column, {
			...layer,
			componentKey: key,
			unitId,
			subUnitId
		}, domLayout, id);
		if (domRangeDispose) {
			disposableCollection.add(domRangeDispose.dispose);
			return {
				id: domRangeDispose.id,
				dispose: () => {
					disposableCollection.dispose();
					domRangeDispose.dispose();
				}
			};
		}
		disposableCollection.dispose();
		return null;
	}
	async saveCellImagesAsync(options, ranges) {
		var _options$useCellAddre;
		const batchSaveService = this._injector.get(IBatchSaveImagesService);
		const unitId = this._fWorkbook.getId();
		const subUnitId = this.getSheetId();
		const iRanges = ranges ? ranges.map((r) => r.getRange()) : [this._worksheet.getCellMatrix().getDataRange()];
		const images = batchSaveService.getCellImagesFromRanges(unitId, subUnitId, iRanges);
		if (images.length === 0) return false;
		if (images.length === 1) try {
			await batchSaveService.downloadSingleImage(images[0]);
			return true;
		} catch (error) {
			console.error("Failed to download image:", error);
			return false;
		}
		const fileNameParts = [];
		const useCellAddress = (_options$useCellAddre = options === null || options === void 0 ? void 0 : options.useCellAddress) !== null && _options$useCellAddre !== void 0 ? _options$useCellAddre : true;
		const useColumnIndex = options === null || options === void 0 ? void 0 : options.useColumnIndex;
		if (useCellAddress) fileNameParts.push(FileNamePart.CELL_ADDRESS);
		if (useColumnIndex !== void 0) fileNameParts.push(FileNamePart.COLUMN_VALUE);
		if (fileNameParts.length === 0) fileNameParts.push(FileNamePart.CELL_ADDRESS);
		try {
			await batchSaveService.saveImagesWithContext(images, {
				fileNameParts,
				columnIndex: useColumnIndex
			}, unitId, subUnitId);
			return true;
		} catch (error) {
			console.error("Failed to save images:", error);
			return false;
		}
	}
};
FWorksheet.extend(FWorksheetDrawingUIMixin);

//#endregion
//#region src/facade/f-event.ts
var FSheetsDrawingUIEventNameMixin = class extends FEventName {
	get BeforeFloatDomAdd() {
		return "BeforeFloatDomAdd";
	}
	get FloatDomAdded() {
		return "FloatDomAdded";
	}
	get BeforeFloatDomUpdate() {
		return "BeforeFloatDomUpdate";
	}
	get FloatDomUpdated() {
		return "FloatDomUpdated";
	}
	get BeforeFloatDomDelete() {
		return "BeforeFloatDomDelete";
	}
	get FloatDomDeleted() {
		return "FloatDomDeleted";
	}
};
FEventName.extend(FSheetsDrawingUIEventNameMixin);

//#endregion
//#region src/facade/f-univer.ts
/**
* @ignore
*/
var FUniverSheetsDrawingUIMixin = class extends FUniver {
	/**
	* @ignore
	*/
	_initialize(injector) {
		const commandService = injector.get(ICommandService);
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeFloatDomAdd, () => commandService.beforeCommandExecuted((commandInfo) => {
			if (commandInfo.id !== InsertSheetDrawingCommand.id) return;
			const params = commandInfo.params;
			const workbook = this.getActiveWorkbook();
			if (workbook == null || params == null) return;
			const { drawings } = params;
			const floatDomDrawings = drawings.filter((drawing) => drawing.drawingType === DrawingTypeEnum.DRAWING_DOM);
			if (floatDomDrawings.length === 0) return;
			const eventParams = {
				workbook,
				drawings: floatDomDrawings
			};
			this.fireEvent(this.Event.BeforeFloatDomAdd, eventParams);
			if (eventParams.cancel) throw new CanceledError();
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.FloatDomAdded, () => commandService.onCommandExecuted((commandInfo) => {
			if (commandInfo.id !== InsertSheetDrawingCommand.id) return;
			const params = commandInfo.params;
			const workbook = this.getActiveWorkbook();
			if (workbook == null || params == null) return;
			const { drawings } = params;
			const floatDomDrawings = drawings.filter((drawing) => drawing.drawingType === DrawingTypeEnum.DRAWING_DOM);
			if (floatDomDrawings.length === 0) return;
			const eventParams = {
				workbook,
				drawings: floatDomDrawings
			};
			this.fireEvent(this.Event.FloatDomAdded, eventParams);
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeFloatDomUpdate, () => commandService.beforeCommandExecuted((commandInfo) => {
			if (commandInfo.id !== SetSheetDrawingCommand.id) return;
			const params = commandInfo.params;
			const workbook = this.getActiveWorkbook();
			if (workbook == null || params == null) return;
			const { drawings } = params;
			const drawingManagerService = injector.get(IDrawingManagerService);
			const floatDomDrawings = [];
			drawings.forEach((drawing) => {
				const dom = drawingManagerService.getDrawingByParam(drawing);
				if ((dom === null || dom === void 0 ? void 0 : dom.drawingType) === DrawingTypeEnum.DRAWING_DOM) floatDomDrawings.push(dom);
			});
			if (floatDomDrawings.length === 0) return;
			const eventParams = {
				workbook,
				drawings: floatDomDrawings
			};
			this.fireEvent(this.Event.BeforeFloatDomUpdate, eventParams);
			if (eventParams.cancel) {
				drawingManagerService.updateNotification(drawings);
				throw new CanceledError();
			}
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.FloatDomUpdated, () => commandService.onCommandExecuted((commandInfo) => {
			if (commandInfo.id !== SetSheetDrawingCommand.id) return;
			const params = commandInfo.params;
			const workbook = this.getActiveWorkbook();
			if (workbook == null || params == null) return;
			const { drawings } = params;
			const drawingManagerService = injector.get(IDrawingManagerService);
			const floatDomDrawings = [];
			drawings.forEach((drawing) => {
				const dom = drawingManagerService.getDrawingByParam(drawing);
				if ((dom === null || dom === void 0 ? void 0 : dom.drawingType) === DrawingTypeEnum.DRAWING_DOM) floatDomDrawings.push(dom);
			});
			if (floatDomDrawings.length === 0) return;
			const eventParams = {
				workbook,
				drawings: floatDomDrawings
			};
			this.fireEvent(this.Event.FloatDomUpdated, eventParams);
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.BeforeFloatDomDelete, () => commandService.beforeCommandExecuted((commandInfo) => {
			if (commandInfo.id !== RemoveSheetDrawingCommand.id) return;
			const params = commandInfo.params;
			const workbook = this.getActiveWorkbook();
			if (workbook == null || params == null) return;
			const drawingManagerService = injector.get(IDrawingManagerService);
			const { drawings } = params;
			const floatDomDrawings = drawings.map((drawing) => drawingManagerService.getDrawingByParam(drawing)).filter((drawing) => (drawing === null || drawing === void 0 ? void 0 : drawing.drawingType) === DrawingTypeEnum.DRAWING_DOM);
			if (floatDomDrawings.length === 0) return;
			const eventParams = {
				workbook,
				drawings: floatDomDrawings
			};
			this.fireEvent(this.Event.BeforeFloatDomDelete, eventParams);
			if (eventParams.cancel) throw new CanceledError();
		})));
		this.disposeWithMe(this.registerEventHandler(this.Event.FloatDomDeleted, () => commandService.onCommandExecuted((commandInfo) => {
			if (commandInfo.id !== RemoveSheetDrawingCommand.id) return;
			const params = commandInfo.params;
			const workbook = this.getActiveWorkbook();
			if (workbook == null || params == null) return;
			const { drawings } = params;
			const eventParams = {
				workbook,
				drawings: drawings.filter((i) => i.drawingType === DrawingTypeEnum.DRAWING_DOM).map((i) => i.drawingId)
			};
			this.fireEvent(this.Event.FloatDomDeleted, eventParams);
		})));
	}
	registerURLImageDownloader(downloader) {
		return this._injector.get(IURLImageService).registerURLImageDownloader(downloader);
	}
};
FUniver.extend(FUniverSheetsDrawingUIMixin);

//#endregion
//#region src/facade/f-range.ts
var FRangeSheetsDrawingUIMixin = class extends FRange {
	async insertCellImageAsync(file) {
		var _getCurrentTypeOfRend;
		const renderManagerService = this._injector.get(IRenderManagerService);
		const controller = (_getCurrentTypeOfRend = getCurrentTypeOfRenderer(UniverInstanceType.UNIVER_SHEET, this._injector.get(IUniverInstanceService), renderManagerService)) === null || _getCurrentTypeOfRend === void 0 ? void 0 : _getCurrentTypeOfRend.with(SheetDrawingUpdateController);
		if (!controller) return false;
		const location = {
			unitId: this._workbook.getUnitId(),
			subUnitId: this._worksheet.getSheetId(),
			row: this.getRow(),
			col: this.getColumn()
		};
		if (typeof file === "string") return controller.insertCellImageByUrl(file, location);
		else return controller.insertCellImageByFile(file, location);
	}
	async saveCellImagesAsync(options) {
		var _options$useCellAddre;
		const batchSaveService = this._injector.get(IBatchSaveImagesService);
		const unitId = this._workbook.getUnitId();
		const subUnitId = this._worksheet.getSheetId();
		const range = this.getRange();
		const images = batchSaveService.getCellImagesFromRanges(unitId, subUnitId, [range]);
		if (images.length === 0) return false;
		if (images.length === 1) try {
			await batchSaveService.downloadSingleImage(images[0]);
			return true;
		} catch (error) {
			console.error("Failed to download image:", error);
			return false;
		}
		const fileNameParts = [];
		const useCellAddress = (_options$useCellAddre = options === null || options === void 0 ? void 0 : options.useCellAddress) !== null && _options$useCellAddre !== void 0 ? _options$useCellAddre : true;
		const useColumnIndex = options === null || options === void 0 ? void 0 : options.useColumnIndex;
		if (useCellAddress) fileNameParts.push(FileNamePart.CELL_ADDRESS);
		if (useColumnIndex !== void 0) fileNameParts.push(FileNamePart.COLUMN_VALUE);
		if (fileNameParts.length === 0) fileNameParts.push(FileNamePart.CELL_ADDRESS);
		try {
			await batchSaveService.saveImagesWithContext(images, {
				fileNameParts,
				columnIndex: useColumnIndex
			}, unitId, subUnitId);
			return true;
		} catch (error) {
			console.error("Failed to save images:", error);
			return false;
		}
	}
};
FRange.extend(FRangeSheetsDrawingUIMixin);

//#endregion
export {  };