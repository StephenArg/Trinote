//#region src/ts/univer/colla-msg.ts
let CommentSolvedStatus = /* @__PURE__ */ function(CommentSolvedStatus) {
	CommentSolvedStatus[CommentSolvedStatus["OpenOrReOpen"] = 0] = "OpenOrReOpen";
	CommentSolvedStatus[CommentSolvedStatus["Solved"] = 1] = "Solved";
	CommentSolvedStatus[CommentSolvedStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return CommentSolvedStatus;
}({});
let CommentUpdateEventType = /* @__PURE__ */ function(CommentUpdateEventType) {
	CommentUpdateEventType[CommentUpdateEventType["Unknown"] = 0] = "Unknown";
	CommentUpdateEventType[CommentUpdateEventType["Add"] = 1] = "Add";
	CommentUpdateEventType[CommentUpdateEventType["Reply"] = 2] = "Reply";
	CommentUpdateEventType[CommentUpdateEventType["Edit"] = 3] = "Edit";
	CommentUpdateEventType[CommentUpdateEventType["Delete"] = 4] = "Delete";
	CommentUpdateEventType[CommentUpdateEventType["Solve"] = 5] = "Solve";
	CommentUpdateEventType[CommentUpdateEventType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return CommentUpdateEventType;
}({});

//#endregion
//#region src/ts/univer/constants/errors.ts
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
let ErrorCode = /* @__PURE__ */ function(ErrorCode) {
	/** UNDEFINED - general codes */
	ErrorCode[ErrorCode["UNDEFINED"] = 0] = "UNDEFINED";
	ErrorCode[ErrorCode["OK"] = 1] = "OK";
	ErrorCode[ErrorCode["INTERNAL_ERROR"] = 2] = "INTERNAL_ERROR";
	ErrorCode[ErrorCode["PERMISSION_DENIED"] = 3] = "PERMISSION_DENIED";
	ErrorCode[ErrorCode["NOT_FOUND"] = 4] = "NOT_FOUND";
	ErrorCode[ErrorCode["UNAUTHENTICATED"] = 5] = "UNAUTHENTICATED";
	ErrorCode[ErrorCode["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
	ErrorCode[ErrorCode["INVALID_ARGUMENT"] = 7] = "INVALID_ARGUMENT";
	ErrorCode[ErrorCode["TOO_MANY_REQUESTS"] = 8] = "TOO_MANY_REQUESTS";
	ErrorCode[ErrorCode["COMPLETION_FINISHED"] = 9] = "COMPLETION_FINISHED";
	/** LOGIN_FAILED - login */
	ErrorCode[ErrorCode["LOGIN_FAILED"] = 10] = "LOGIN_FAILED";
	ErrorCode[ErrorCode["MOBILE_VERIFY_CODE_MISMATCH"] = 11] = "MOBILE_VERIFY_CODE_MISMATCH";
	ErrorCode[ErrorCode["MOBILE_VERIFY_CODE_NOT_FOUND_OR_EXPIRED"] = 12] = "MOBILE_VERIFY_CODE_NOT_FOUND_OR_EXPIRED";
	ErrorCode[ErrorCode["EMAIL_VERIFY_CODE_MISMATCH"] = 13] = "EMAIL_VERIFY_CODE_MISMATCH";
	ErrorCode[ErrorCode["EMAIL_VERIFY_CODE_NOT_FOUND_OR_EXPIRED"] = 14] = "EMAIL_VERIFY_CODE_NOT_FOUND_OR_EXPIRED";
	ErrorCode[ErrorCode["AUTHORIZE_CODE_ILLEGAL"] = 15] = "AUTHORIZE_CODE_ILLEGAL";
	ErrorCode[ErrorCode["LOGIN_TOKEN_PROCESSING_FAILED"] = 16] = "LOGIN_TOKEN_PROCESSING_FAILED";
	/** CURRENT_STATUS_CANNOT_OPERATE - biz cmn codes with 100 shift */
	ErrorCode[ErrorCode["CURRENT_STATUS_CANNOT_OPERATE"] = 100] = "CURRENT_STATUS_CANNOT_OPERATE";
	ErrorCode[ErrorCode["ERROR_AGAIN"] = 101] = "ERROR_AGAIN";
	/** USER_NOT_FOUND - user codes with 200 shift */
	ErrorCode[ErrorCode["USER_NOT_FOUND"] = 201] = "USER_NOT_FOUND";
	ErrorCode[ErrorCode["USER_IS_ANONYMOUS"] = 202] = "USER_IS_ANONYMOUS";
	/** CHANGESET_REVISION_CONFILICT - changeset codes with 5000 shift */
	ErrorCode[ErrorCode["CHANGESET_REVISION_CONFILICT"] = 5001] = "CHANGESET_REVISION_CONFILICT";
	/** SNAPSHOT_INVALID_SNAPSHOT - snapshotError codes with 6000 shift */
	ErrorCode[ErrorCode["SNAPSHOT_INVALID_SNAPSHOT"] = 6001] = "SNAPSHOT_INVALID_SNAPSHOT";
	ErrorCode[ErrorCode["SNAPSHOT_HAS_BEEN_REMOVED"] = 6002] = "SNAPSHOT_HAS_BEEN_REMOVED";
	ErrorCode[ErrorCode["ENSURE_SNAPSHOT_EXECUTION"] = 6003] = "ENSURE_SNAPSHOT_EXECUTION";
	/** APPLY_REJECT - apply service codes with 7000 shift */
	ErrorCode[ErrorCode["APPLY_REJECT"] = 7001] = "APPLY_REJECT";
	/** APPLY_NON_SEQUENTIAL_REVISION - apply service expects sequential revisions, otherwise return this code */
	ErrorCode[ErrorCode["APPLY_NON_SEQUENTIAL_REVISION"] = 7002] = "APPLY_NON_SEQUENTIAL_REVISION";
	/** APPLY_REVISION_CONFILICT - save changeset failed because of revision exists */
	ErrorCode[ErrorCode["APPLY_REVISION_CONFILICT"] = 7003] = "APPLY_REVISION_CONFILICT";
	/** APPLY_PERMISSION_DENIED - apply failed because of the user permission denied */
	ErrorCode[ErrorCode["APPLY_PERMISSION_DENIED"] = 7004] = "APPLY_PERMISSION_DENIED";
	/** APPLY_DUPLICATED - if the changeset has been applied before, return this code */
	ErrorCode[ErrorCode["APPLY_DUPLICATED"] = 7005] = "APPLY_DUPLICATED";
	/** CONNECTOR_DATA_TOO_LARGE - connector codes with 8000 shift */
	ErrorCode[ErrorCode["CONNECTOR_DATA_TOO_LARGE"] = 8001] = "CONNECTOR_DATA_TOO_LARGE";
	/** LICENSE_MAX_UNITS_EXCEEDED - license code with 9000 shift */
	ErrorCode[ErrorCode["LICENSE_MAX_UNITS_EXCEEDED"] = 9001] = "LICENSE_MAX_UNITS_EXCEEDED";
	ErrorCode[ErrorCode["LICENSE_MAX_MEMBERS_PER_UNIT_EXCEEDED"] = 9002] = "LICENSE_MAX_MEMBERS_PER_UNIT_EXCEEDED";
	ErrorCode[ErrorCode["LICENSE_IMPORT_SIZE_EXCEEDED"] = 9003] = "LICENSE_IMPORT_SIZE_EXCEEDED";
	ErrorCode[ErrorCode["LICENSE_EXPORT_SIZE_EXCEEDED"] = 9004] = "LICENSE_EXPORT_SIZE_EXCEEDED";
	/** LICENSE_DISTRO_REJECTED - the feature not allowed for the distro */
	ErrorCode[ErrorCode["LICENSE_DISTRO_REJECTED"] = 9005] = "LICENSE_DISTRO_REJECTED";
	/** YUUMI_UNABLE_LOAD_URL - yuumi */
	ErrorCode[ErrorCode["YUUMI_UNABLE_LOAD_URL"] = 10001] = "YUUMI_UNABLE_LOAD_URL";
	ErrorCode[ErrorCode["YUUMI_URL_COL_OUT_OF_RANGE"] = 10002] = "YUUMI_URL_COL_OUT_OF_RANGE";
	ErrorCode[ErrorCode["YUUMI_RATE_OVER_LIMIT"] = 10003] = "YUUMI_RATE_OVER_LIMIT";
	ErrorCode[ErrorCode["YUUMI_SUBSCRIPTION_NOT_FOUND"] = 10004] = "YUUMI_SUBSCRIPTION_NOT_FOUND";
	/** YUUMI_NO_CUBOID_FOR_QUESTION - yuumi AI */
	ErrorCode[ErrorCode["YUUMI_NO_CUBOID_FOR_QUESTION"] = 10010] = "YUUMI_NO_CUBOID_FOR_QUESTION";
	ErrorCode[ErrorCode["YUUMI_ASYNCIO_CANCELLED"] = 10011] = "YUUMI_ASYNCIO_CANCELLED";
	ErrorCode[ErrorCode["YUUMI_TABLE_NOT_FOUND_IN_UNIT"] = 10012] = "YUUMI_TABLE_NOT_FOUND_IN_UNIT";
	ErrorCode[ErrorCode["YUUMI_ALL_TABLES_IS_INVALID"] = 10013] = "YUUMI_ALL_TABLES_IS_INVALID";
	ErrorCode[ErrorCode["YUUMI_PROMPT_MAX_TOKENS_EXCEEDED"] = 10014] = "YUUMI_PROMPT_MAX_TOKENS_EXCEEDED";
	ErrorCode[ErrorCode["YUUMI_AI_RUN_FAILED"] = 10015] = "YUUMI_AI_RUN_FAILED";
	ErrorCode[ErrorCode["YUUMI_CONNECTOR_URL_NOT_FOUND"] = 10016] = "YUUMI_CONNECTOR_URL_NOT_FOUND";
	/** PY_RUNTIME_SCRIPT_ERROR - py-runtime */
	ErrorCode[ErrorCode["PY_RUNTIME_SCRIPT_ERROR"] = 11001] = "PY_RUNTIME_SCRIPT_ERROR";
	/** INVITE_CODE_HAS_BEEN_UES - invite-code */
	ErrorCode[ErrorCode["INVITE_CODE_HAS_BEEN_UES"] = 12001] = "INVITE_CODE_HAS_BEEN_UES";
	ErrorCode[ErrorCode["INVALID_INVITE_CODE"] = 12002] = "INVALID_INVITE_CODE";
	ErrorCode[ErrorCode["INVITE_CODE_REQUIRED"] = 12003] = "INVITE_CODE_REQUIRED";
	ErrorCode[ErrorCode["USER_NOT_INVITED_CODE"] = 12004] = "USER_NOT_INVITED_CODE";
	ErrorCode[ErrorCode["INVITE_CODE_ALREADY_BOUND"] = 12005] = "INVITE_CODE_ALREADY_BOUND";
	/** WECHAT_HAS_BEEN_BOUND - user profile */
	ErrorCode[ErrorCode["WECHAT_HAS_BEEN_BOUND"] = 13001] = "WECHAT_HAS_BEEN_BOUND";
	ErrorCode[ErrorCode["MOBILE_HAS_BEEN_BOUND"] = 13002] = "MOBILE_HAS_BEEN_BOUND";
	ErrorCode[ErrorCode["EMAIL_HAS_BEEN_BOUND"] = 13003] = "EMAIL_HAS_BEEN_BOUND";
	/** ENTITLE_CAN_NOT_BUY_LOWER_OTP - entitlement domain errors */
	ErrorCode[ErrorCode["ENTITLE_CAN_NOT_BUY_LOWER_OTP"] = 14001] = "ENTITLE_CAN_NOT_BUY_LOWER_OTP";
	/** ENTITLE_UPDOWN_GRADE_NOT_SUPPORT - subscription upgrade/downgrade is not supported */
	ErrorCode[ErrorCode["ENTITLE_UPDOWN_GRADE_NOT_SUPPORT"] = 14002] = "ENTITLE_UPDOWN_GRADE_NOT_SUPPORT";
	/** ENTITLE_DUP_SUBSCRIPTION - duplicate subscription */
	ErrorCode[ErrorCode["ENTITLE_DUP_SUBSCRIPTION"] = 14003] = "ENTITLE_DUP_SUBSCRIPTION";
	/** PAYMENT_CHANNEL_NOT_SUPPORT - payment channel is not supported */
	ErrorCode[ErrorCode["PAYMENT_CHANNEL_NOT_SUPPORT"] = 14004] = "PAYMENT_CHANNEL_NOT_SUPPORT";
	/** ENTITLE_INVALID_COUPON_CODE - invalid coupon code */
	ErrorCode[ErrorCode["ENTITLE_INVALID_COUPON_CODE"] = 14005] = "ENTITLE_INVALID_COUPON_CODE";
	/** ENTITLE_COUPON_EXPIRED - coupon expired */
	ErrorCode[ErrorCode["ENTITLE_COUPON_EXPIRED"] = 14006] = "ENTITLE_COUPON_EXPIRED";
	/** ENTITLE_COUPON_USED_UP - coupon used up */
	ErrorCode[ErrorCode["ENTITLE_COUPON_USED_UP"] = 14007] = "ENTITLE_COUPON_USED_UP";
	/** ENTITLE_USE_COUPON_NOT_1ST_TRADE - not the first purchase, cannot use coupon */
	ErrorCode[ErrorCode["ENTITLE_USE_COUPON_NOT_1ST_TRADE"] = 14008] = "ENTITLE_USE_COUPON_NOT_1ST_TRADE";
	/** ENTITLE_CHAT_LIMIT_EXCEED - chat rate limit exceeded */
	ErrorCode[ErrorCode["ENTITLE_CHAT_LIMIT_EXCEED"] = 14101] = "ENTITLE_CHAT_LIMIT_EXCEED";
	/** ENTITLE_REPORT_LIMIT_EXCEED - report rate limit exceeded */
	ErrorCode[ErrorCode["ENTITLE_REPORT_LIMIT_EXCEED"] = 14102] = "ENTITLE_REPORT_LIMIT_EXCEED";
	/** ENTITLE_INSUFFICIENT_QUOTA - insufficient quota */
	ErrorCode[ErrorCode["ENTITLE_INSUFFICIENT_QUOTA"] = 14103] = "ENTITLE_INSUFFICIENT_QUOTA";
	/** ENTITLE_NEED_BILLING_ADDRESS - billing address required */
	ErrorCode[ErrorCode["ENTITLE_NEED_BILLING_ADDRESS"] = 14301] = "ENTITLE_NEED_BILLING_ADDRESS";
	/** REDEMPTION_INVALID_CODE - redemption code domain errors */
	ErrorCode[ErrorCode["REDEMPTION_INVALID_CODE"] = 15001] = "REDEMPTION_INVALID_CODE";
	/** REDEMPTION_CODE_INACTIVE - code inactive */
	ErrorCode[ErrorCode["REDEMPTION_CODE_INACTIVE"] = 15002] = "REDEMPTION_CODE_INACTIVE";
	/** REDEMPTION_CODE_FULLY_REDEEMED - fully redeemed */
	ErrorCode[ErrorCode["REDEMPTION_CODE_FULLY_REDEEMED"] = 15003] = "REDEMPTION_CODE_FULLY_REDEEMED";
	/** REDEMPTION_CODE_NOT_STARTED - not started yet */
	ErrorCode[ErrorCode["REDEMPTION_CODE_NOT_STARTED"] = 15004] = "REDEMPTION_CODE_NOT_STARTED";
	/** REDEMPTION_USER_NOT_ELIGIBLE - user not eligible */
	ErrorCode[ErrorCode["REDEMPTION_USER_NOT_ELIGIBLE"] = 15005] = "REDEMPTION_USER_NOT_ELIGIBLE";
	/** REDEMPTION_USER_REDEEM_TIMES_EXCEED - user redemption limit exceeded */
	ErrorCode[ErrorCode["REDEMPTION_USER_REDEEM_TIMES_EXCEED"] = 15006] = "REDEMPTION_USER_REDEEM_TIMES_EXCEED";
	/** REDEMPTION_CODE_HAS_BEEN_CREATED - redemption code already exists */
	ErrorCode[ErrorCode["REDEMPTION_CODE_HAS_BEEN_CREATED"] = 15007] = "REDEMPTION_CODE_HAS_BEEN_CREATED";
	/** DATA_SOURCE_TOO_LARGE - data source errors */
	ErrorCode[ErrorCode["DATA_SOURCE_TOO_LARGE"] = 16001] = "DATA_SOURCE_TOO_LARGE";
	ErrorCode[ErrorCode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return ErrorCode;
}({});

//#endregion
//#region src/ts/univer/constants/univer.ts
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
let UniverType = /* @__PURE__ */ function(UniverType) {
	UniverType[UniverType["UNIVER_UNKNOWN"] = 0] = "UNIVER_UNKNOWN";
	UniverType[UniverType["UNIVER_DOC"] = 1] = "UNIVER_DOC";
	UniverType[UniverType["UNIVER_SHEET"] = 2] = "UNIVER_SHEET";
	UniverType[UniverType["UNIVER_SLIDE"] = 3] = "UNIVER_SLIDE";
	UniverType[UniverType["UNIVER_PROJECT"] = 4] = "UNIVER_PROJECT";
	UniverType[UniverType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return UniverType;
}({});

//#endregion
//#region src/ts/univer/initial-sheet.ts
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
let CellType = /* @__PURE__ */ function(CellType) {
	CellType[CellType["UNDEFINED"] = 0] = "UNDEFINED";
	CellType[CellType["TEXT"] = 1] = "TEXT";
	CellType[CellType["URL"] = 2] = "URL";
	CellType[CellType["IMAGE"] = 3] = "IMAGE";
	CellType[CellType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return CellType;
}({});

//#endregion
//#region src/ts/univer/permission.ts
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
let UnitAction = /* @__PURE__ */ function(UnitAction) {
	UnitAction[UnitAction["View"] = 0] = "View";
	UnitAction[UnitAction["Edit"] = 1] = "Edit";
	UnitAction[UnitAction["ManageCollaborator"] = 2] = "ManageCollaborator";
	UnitAction[UnitAction["Print"] = 3] = "Print";
	/** Duplicate - create a copy */
	UnitAction[UnitAction["Duplicate"] = 4] = "Duplicate";
	UnitAction[UnitAction["Comment"] = 5] = "Comment";
	UnitAction[UnitAction["Copy"] = 6] = "Copy";
	UnitAction[UnitAction["Share"] = 7] = "Share";
	UnitAction[UnitAction["Export"] = 8] = "Export";
	/** @deprecated */
	UnitAction[UnitAction["MoveWorksheet"] = 9] = "MoveWorksheet";
	/** @deprecated */
	UnitAction[UnitAction["DeleteWorksheet"] = 10] = "DeleteWorksheet";
	/** @deprecated */
	UnitAction[UnitAction["HideWorksheet"] = 11] = "HideWorksheet";
	/** @deprecated */
	UnitAction[UnitAction["RenameWorksheet"] = 12] = "RenameWorksheet";
	/** @deprecated */
	UnitAction[UnitAction["CreateWorksheet"] = 13] = "CreateWorksheet";
	/** @deprecated */
	UnitAction[UnitAction["SetWorksheetStyle"] = 14] = "SetWorksheetStyle";
	/** @deprecated */
	UnitAction[UnitAction["EditWorksheetCell"] = 15] = "EditWorksheetCell";
	UnitAction[UnitAction["InsertHyperlink"] = 16] = "InsertHyperlink";
	UnitAction[UnitAction["Sort"] = 17] = "Sort";
	UnitAction[UnitAction["Filter"] = 18] = "Filter";
	UnitAction[UnitAction["PivotTable"] = 19] = "PivotTable";
	/** @deprecated */
	UnitAction[UnitAction["FloatImg"] = 20] = "FloatImg";
	/** @deprecated */
	UnitAction[UnitAction["IHistory"] = 21] = "IHistory";
	/**
	* RwHgtClWdt - row height, column width
	*
	* @deprecated
	*/
	UnitAction[UnitAction["RwHgtClWdt"] = 22] = "RwHgtClWdt";
	/**
	* ViemRwHgtClWdt - row height, column width in view mode
	*
	* @deprecated
	*/
	UnitAction[UnitAction["ViemRwHgtClWdt"] = 23] = "ViemRwHgtClWdt";
	/**
	* ViewFilter - filter in view mode
	*
	* @deprecated
	*/
	UnitAction[UnitAction["ViewFilter"] = 24] = "ViewFilter";
	UnitAction[UnitAction["MoveSheet"] = 25] = "MoveSheet";
	/** DeleteSheet - delete the sub sheet */
	UnitAction[UnitAction["DeleteSheet"] = 26] = "DeleteSheet";
	UnitAction[UnitAction["HideSheet"] = 27] = "HideSheet";
	UnitAction[UnitAction["CopySheet"] = 28] = "CopySheet";
	UnitAction[UnitAction["RenameSheet"] = 29] = "RenameSheet";
	UnitAction[UnitAction["CreateSheet"] = 30] = "CreateSheet";
	UnitAction[UnitAction["SelectProtectedCells"] = 31] = "SelectProtectedCells";
	UnitAction[UnitAction["SelectUnProtectedCells"] = 32] = "SelectUnProtectedCells";
	UnitAction[UnitAction["SetCellStyle"] = 33] = "SetCellStyle";
	UnitAction[UnitAction["SetCellValue"] = 34] = "SetCellValue";
	UnitAction[UnitAction["SetRowStyle"] = 35] = "SetRowStyle";
	UnitAction[UnitAction["SetColumnStyle"] = 36] = "SetColumnStyle";
	UnitAction[UnitAction["InsertRow"] = 37] = "InsertRow";
	UnitAction[UnitAction["InsertColumn"] = 38] = "InsertColumn";
	UnitAction[UnitAction["DeleteRow"] = 39] = "DeleteRow";
	UnitAction[UnitAction["DeleteColumn"] = 40] = "DeleteColumn";
	UnitAction[UnitAction["EditExtraObject"] = 41] = "EditExtraObject";
	/** Delete - delete the unit file */
	UnitAction[UnitAction["Delete"] = 42] = "Delete";
	UnitAction[UnitAction["RecoverHistory"] = 43] = "RecoverHistory";
	UnitAction[UnitAction["ViewHistory"] = 44] = "ViewHistory";
	UnitAction[UnitAction["CreatePermissionObject"] = 45] = "CreatePermissionObject";
	UnitAction[UnitAction["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return UnitAction;
}({});
let UnitRole = /* @__PURE__ */ function(UnitRole) {
	UnitRole[UnitRole["Reader"] = 0] = "Reader";
	UnitRole[UnitRole["Editor"] = 1] = "Editor";
	UnitRole[UnitRole["Owner"] = 2] = "Owner";
	UnitRole[UnitRole["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return UnitRole;
}({});
let UnitObject = /* @__PURE__ */ function(UnitObject) {
	UnitObject[UnitObject["Unkonwn"] = 0] = "Unkonwn";
	UnitObject[UnitObject["Workbook"] = 1] = "Workbook";
	UnitObject[UnitObject["Worksheet"] = 2] = "Worksheet";
	UnitObject[UnitObject["SelectRange"] = 3] = "SelectRange";
	UnitObject[UnitObject["Document"] = 4] = "Document";
	UnitObject[UnitObject["Slide"] = 5] = "Slide";
	UnitObject[UnitObject["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return UnitObject;
}({});
let ObjectScope = /* @__PURE__ */ function(ObjectScope) {
	ObjectScope[ObjectScope["SomeCollaborator"] = 0] = "SomeCollaborator";
	ObjectScope[ObjectScope["AllCollaborator"] = 1] = "AllCollaborator";
	ObjectScope[ObjectScope["OneSelf"] = 2] = "OneSelf";
	ObjectScope[ObjectScope["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return ObjectScope;
}({});

//#endregion
//#region src/ts/univer/workbook.ts
let CellValueType = /* @__PURE__ */ function(CellValueType) {
	CellValueType[CellValueType["UNKNOWN"] = 0] = "UNKNOWN";
	CellValueType[CellValueType["STRING"] = 1] = "STRING";
	CellValueType[CellValueType["NUMBER"] = 2] = "NUMBER";
	CellValueType[CellValueType["BOOLEAN"] = 3] = "BOOLEAN";
	CellValueType[CellValueType["FORCE_STRING"] = 4] = "FORCE_STRING";
	CellValueType[CellValueType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return CellValueType;
}({});

//#endregion
//#region src/ts/univercloud/stats/v1/stats.ts
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
let IRecordType = /* @__PURE__ */ function(IRecordType) {
	/** Unknown - don't use */
	IRecordType[IRecordType["Unknown"] = 0] = "Unknown";
	IRecordType[IRecordType["Colla"] = 1] = "Colla";
	IRecordType[IRecordType["Import"] = 2] = "Import";
	IRecordType[IRecordType["Export"] = 3] = "Export";
	IRecordType[IRecordType["ICreateUnit"] = 4] = "ICreateUnit";
	IRecordType[IRecordType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return IRecordType;
}({});

//#endregion
//#region src/ts/universer/v1/comb.ts
/** more details: https://c3fgartrp2.feishu.cn/docx/OS47dk8BCo1ZeKxXiNvcDLuZn2g#PymGdupuyoYfvTxv1EBciV7in9b */
let CombCmd = /* @__PURE__ */ function(CombCmd) {
	/** UNKNOWN_CMD - unknown cmd */
	CombCmd[CombCmd["UNKNOWN_CMD"] = 0] = "UNKNOWN_CMD";
	/** HELLO - call hello to get comb info, this is essential after you connect to the server */
	CombCmd[CombCmd["HELLO"] = 1] = "HELLO";
	/** JOIN - call join to join couple of rooms */
	CombCmd[CombCmd["JOIN"] = 2] = "JOIN";
	/** LEAVE - call leave to leave a room */
	CombCmd[CombCmd["LEAVE"] = 3] = "LEAVE";
	/** INGEST - call ingest to broadcast a message to a room */
	CombCmd[CombCmd["INGEST"] = 4] = "INGEST";
	/** HEARTBEAT - call heartbeat to keep the connection alive */
	CombCmd[CombCmd["HEARTBEAT"] = 5] = "HEARTBEAT";
	/**
	* RECV - RECV not a cmd actually, you never call a RECV cmd.
	* when you receive a message from comb(may be created by another user), the cmd will be RECV
	*/
	CombCmd[CombCmd["RECV"] = 6] = "RECV";
	CombCmd[CombCmd["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return CombCmd;
}({});
let CmdRspCode = /* @__PURE__ */ function(CmdRspCode) {
	CmdRspCode[CmdRspCode["UNKNOWN_CODE"] = 0] = "UNKNOWN_CODE";
	CmdRspCode[CmdRspCode["OK"] = 1] = "OK";
	CmdRspCode[CmdRspCode["FAIL"] = 2] = "FAIL";
	/**
	* JOIN_ROOM_FULL - 1000~1999 room related
	* max room member reached
	*/
	CmdRspCode[CmdRspCode["JOIN_ROOM_FULL"] = 1001] = "JOIN_ROOM_FULL";
	/** JOIN_ROOM_NOT_EXISTS - the specified room does not exists */
	CmdRspCode[CmdRspCode["JOIN_ROOM_NOT_EXISTS"] = 1002] = "JOIN_ROOM_NOT_EXISTS";
	/** JOIN_ROOM_PERMISSION_DENIED - has no permission to join the room */
	CmdRspCode[CmdRspCode["JOIN_ROOM_PERMISSION_DENIED"] = 1003] = "JOIN_ROOM_PERMISSION_DENIED";
	/** GLOBAL_ROOMS_CNT_EXCEEDS - global live collaboration rooms count exceeds */
	CmdRspCode[CmdRspCode["GLOBAL_ROOMS_CNT_EXCEEDS"] = 1004] = "GLOBAL_ROOMS_CNT_EXCEEDS";
	CmdRspCode[CmdRspCode["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return CmdRspCode;
}({});

//#endregion
//#region src/ts/universer/v1/file.ts
let FileSource = /* @__PURE__ */ function(FileSource) {
	FileSource[FileSource["Undefined"] = 0] = "Undefined";
	/** HttpImport - assign UserID */
	FileSource[FileSource["HttpImport"] = 1] = "HttpImport";
	/** HttpExport - assign UserID */
	FileSource[FileSource["HttpExport"] = 2] = "HttpExport";
	/** UnitEmbedded - assign UnitID */
	FileSource[FileSource["UnitEmbedded"] = 3] = "UnitEmbedded";
	/** UnitSnapshot - assign UnitID */
	FileSource[FileSource["UnitSnapshot"] = 4] = "UnitSnapshot";
	/** UserProfileImg - assign UserID */
	FileSource[FileSource["UserProfileImg"] = 5] = "UserProfileImg";
	/** ClipsheetFragments - assign UserID, fragmented file will be deleted after 30 days */
	FileSource[FileSource["ClipsheetFragments"] = 6] = "ClipsheetFragments";
	/** LLMInputData - assign UserID */
	FileSource[FileSource["LLMInputData"] = 7] = "LLMInputData";
	FileSource[FileSource["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
	return FileSource;
}({});

//#endregion
//#region src/utils.ts
/**
* To examine if a response is an error.
*
* @param error error interface
* @returns if the response is an error
*/
function isError(error) {
	if (error && error.code && error.code !== 1 && error.code !== "OK") return true;
	return false;
}

//#endregion
export { CellType, CellValueType, CmdRspCode, CombCmd, CommentSolvedStatus, CommentUpdateEventType, ErrorCode, FileSource, IRecordType, ObjectScope, UnitAction, UnitObject, UnitRole, UniverType, isError };