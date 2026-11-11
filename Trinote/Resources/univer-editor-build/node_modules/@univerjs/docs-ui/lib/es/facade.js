import { DOC_RANGE_TYPE } from "@univerjs/core";
import { DocSkeletonManagerService } from "@univerjs/docs";
import { DocBackScrollRenderController, DocSelectionRenderService } from "@univerjs/docs-ui";
import { FDocument } from "@univerjs/docs/facade";
import { IRenderManagerService } from "@univerjs/engine-render";

//#region src/facade/f-document.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FDocumentUIMixin = class extends FDocument {
	/**
	* Sets the selection to a specified text range in the document.
	* A computed offscreen target is selected after its render data is loaded.
	* A newer pointer/selection action or changed text supersedes that request.
	* @param startOffset - The starting offset of the selection in the document.
	* @param endOffset - The ending offset of the selection in the document.
	* @example
	* ```typescript
	* const fDocument = univerAPI.getActiveDocument();
	* fDocument.setSelection(10, 20);
	* ```
	*/
	setSelection(startOffset, endOffset) {
		var _skeleton$getSkeleton, _this$getDocumentData, _render$getInjector;
		const render = this._injector.get(IRenderManagerService).getRenderUnitById(this.getId());
		if (render == null) return;
		const docSelectionRenderService = render.with(DocSelectionRenderService);
		const skeleton = render.with(DocSkeletonManagerService).getSkeleton();
		const pageIndex = skeleton.findBodyPageIndexByCharIndex(startOffset);
		const page = (_skeleton$getSkeleton = skeleton.getSkeletonData()) === null || _skeleton$getSkeleton === void 0 ? void 0 : _skeleton$getSkeleton.pages[pageIndex];
		const bodyLength = ((_this$getDocumentData = this.getDocumentDataModel().getBody()) === null || _this$getDocumentData === void 0 ? void 0 : _this$getDocumentData.dataStream.length) ?? 0;
		const unresolvedBodyPage = pageIndex < 0 && startOffset >= 0 && startOffset < bodyLength;
		const segmentId = docSelectionRenderService.getSegment();
		const renderInjector = (_render$getInjector = render.getInjector) === null || _render$getInjector === void 0 ? void 0 : _render$getInjector.call(render);
		const backScrollController = (renderInjector === null || renderInjector === void 0 ? void 0 : renderInjector.has(DocBackScrollRenderController)) ? render.with(DocBackScrollRenderController) : null;
		const range = {
			startOffset,
			endOffset,
			collapsed: startOffset === endOffset
		};
		const applySelection = () => {
			docSelectionRenderService.removeAllRanges();
			docSelectionRenderService.addDocRanges([{
				startOffset,
				endOffset,
				rangeType: DOC_RANGE_TYPE.TEXT
			}], true);
		};
		if (segmentId === "" && backScrollController != null && (unresolvedBodyPage || (page === null || page === void 0 ? void 0 : page.isMaterializationPlaceholder) || !backScrollController.isViewportReady())) {
			var _this$getDocumentData2;
			const dataStream = (_this$getDocumentData2 = this.getDocumentDataModel().getBody()) === null || _this$getDocumentData2 === void 0 ? void 0 : _this$getDocumentData2.dataStream;
			backScrollController.scrollToRange(range, () => {
				var _this$getDocumentData3;
				if (docSelectionRenderService.getSegment() !== segmentId || ((_this$getDocumentData3 = this.getDocumentDataModel().getBody()) === null || _this$getDocumentData3 === void 0 ? void 0 : _this$getDocumentData3.dataStream) !== dataStream) return;
				applySelection();
			});
			docSelectionRenderService.removeAllRanges();
			docSelectionRenderService.addDocRanges([], true, { shouldFocus: false });
			docSelectionRenderService.blur();
			return;
		}
		applySelection();
		if (segmentId === "" && backScrollController != null) backScrollController.scrollToRange(range);
	}
};
FDocument.extend(FDocumentUIMixin);

//#endregion
export {  };