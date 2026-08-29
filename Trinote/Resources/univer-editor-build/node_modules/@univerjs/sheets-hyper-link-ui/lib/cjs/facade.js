let _univerjs_sheets_hyper_link = require("@univerjs/sheets-hyper-link");
let _univerjs_sheets_hyper_link_ui = require("@univerjs/sheets-hyper-link-ui");
let _univerjs_sheets_facade = require("@univerjs/sheets/facade");

//#region src/facade/f-workbook.ts
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
var FWorkbookHyperlinkUIMixin = class extends _univerjs_sheets_facade.FWorkbook {
	navigateToSheetHyperlink(hyperlink) {
		const parserService = this._injector.get(_univerjs_sheets_hyper_link.SheetsHyperLinkParserService);
		const resolverService = this._injector.get(_univerjs_sheets_hyper_link_ui.SheetsHyperLinkResolverService);
		const info = parserService.parseHyperLink(hyperlink);
		resolverService.navigate(info);
	}
};
_univerjs_sheets_facade.FWorkbook.extend(FWorkbookHyperlinkUIMixin);

//#endregion