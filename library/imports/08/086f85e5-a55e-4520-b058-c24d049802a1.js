"use strict";
cc._RF.push(module, '086f8XlpV5FILBYwk0EmAKh', 'CrashTotalRecordView');
// games/crash/script/view/CrashTotalRecordView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ListView_1 = __importDefault(require("../../../../script/common/component/ListView"));
const NoneItem_1 = __importDefault(require("../../../../script/common/item/NoneItem"));
const TitleItemPage_1 = __importDefault(require("../../../../script/common/item/TitleItemPage"));
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const protoc_1 = require("../../../../script/framework/external/protoc");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
// 每页数量
const PAGE_COUNT = 20;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
// 最大显示前几天数据
const MAX_BEFORE_DAY = 7;
const { ccclass, property } = cc._decorator;
let CrashTotalRecordView = class CrashTotalRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnLeft = null;
        this.labDate = null;
        this.btnRight = null;
        this.labCurrServerSeed = null;
        this.labCurrServerSeedValue = null;
        this.labPrevServerSeed = null;
        this.labPrevServerSeedValue = null;
        this.labPublicSeed = null;
        this.labPublicSeedValue = null;
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // 当前查找时间戳
        this._currFindTimestamp = null;
        // 是否最后一页
        this._isLastPage = false;
        // 当天历史数据列表
        this._todayRecordDataList = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashTotalRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp);
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._currFindTimestamp = DateUtils_1.default.getDayTimestamp(this._appData.getClientTimestamp());
        this._isLastPage = false;
        this._todayRecordDataList = [];
    }
    initView() {
        this.btnRight.interactable = false;
        this.labDate.string = DateUtils_1.default.getYMD(this._currFindTimestamp, "-");
        this.labCurrServerSeedValue.string = "";
        this.labPrevServerSeedValue.string = "";
        this.labPublicSeedValue.string = "";
        this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_M2C_CrashHashRecord_Res", this.onEvent_M2C_CrashHashRecord_Res);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labRecordPageName", true));
        this.labCurrServerSeed.language = Manager_1.Manager.makeLanguage("labCurrServerSeed", true);
        this.labPrevServerSeed.language = Manager_1.Manager.makeLanguage("labPrevServerSeed", true);
        this.labPublicSeed.language = Manager_1.Manager.makeLanguage("labPublicSeed", true);
    }
    refreshLeftRightBtn() {
        if (this._currFindTimestamp >= DateUtils_1.default.getDayTimestamp(this._appData.getClientTimestamp())) {
            this.btnRight.interactable = false;
        }
        else {
            this.btnRight.interactable = true;
        }
        this.btnLeft.interactable = true;
        if (this._currFindTimestamp <= DateUtils_1.default.getTimestampByDate(DateUtils_1.default.getDayBeforeAfter(this._appData.getClientTimestamp(), -(MAX_BEFORE_DAY - 1)))) {
            // && this._todayRecordDataList.length <= 0) {
            this.btnLeft.interactable = false;
        }
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._todayRecordDataList.length > 0) {
            let lastRecordData = this._todayRecordDataList[this._todayRecordDataList.length - 1];
            id = lastRecordData.ID;
        }
        return id;
    }
    clickPrevDayData() {
        let prevTimestamp = this._currFindTimestamp - ONE_DAY_MS;
        this._todayRecordDataList.length = 0;
        this._isLastPage = false;
        this.C2M_CrashHashRecord_Req(prevTimestamp);
    }
    clickNextDayData() {
        let nextTimestamp = this._currFindTimestamp + ONE_DAY_MS;
        this._todayRecordDataList.length = 0;
        this._isLastPage = false;
        this.C2M_CrashHashRecord_Req(nextTimestamp);
    }
    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    C2M_CrashHashRecord_Req(timestamp, id) {
        if (TypeUtils_1.default.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }
        let data = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            Date: DateUtils_1.default.getYMD(timestamp, "-"),
            ID: id,
            PageNumber: PAGE_COUNT,
        };
        let req = protoc_1.MST.C2M_CrashHashRecord_Req.create(data);
        let buffer = protoc_1.MST.C2M_CrashHashRecord_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_CrashHashRecord_Req, protoc_1.MST.OuterOpcode_CrashGame.C2M_CrashHashRecord_Req, buffer);
    }
    onEvent_M2C_CrashHashRecord_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        if (data.SeedInfo.ServerSeed.length <= 0) {
            this.labCurrServerSeedValue.language = Manager_1.Manager.makeLanguage("labCurrServerSeedValue", true);
        }
        else {
            this.labCurrServerSeedValue.string = data.SeedInfo.ServerSeed;
        }
        if (data.ID === DEFAULT_FIRST_ID && data.RecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.RecordInfo.length < PAGE_COUNT;
        this.labDate.string = data.Date;
        this._currFindTimestamp = DateUtils_1.default.getTimestampByDate(data.Date);
        this.labPrevServerSeedValue.string = data.SeedInfo.ServerSeedHash;
        this.labPublicSeedValue.string = data.SeedInfo.PublicSeed;
        if (data.ID === DEFAULT_FIRST_ID) {
            this._todayRecordDataList = [].concat(data.RecordInfo);
            this.lsvRecord.set(data.RecordInfo);
        }
        else {
            this._todayRecordDataList = this._todayRecordDataList.concat(data.RecordInfo);
            this.lsvRecord.insert(data.RecordInfo);
        }
        this.refreshLeftRightBtn();
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnLeft":
                this.clickPrevDayData();
                break;
            case "btnRight":
                this.clickNextDayData();
                break;
            case "btnClose":
                this.close();
                break;
        }
    }
    /**
     * 上拉回调
     * @param target
     */
    onPullTop(target) {
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp);
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览总历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp, this.getLastRecordId());
    }
};
__decorate([
    property(cc.Button)
], CrashTotalRecordView.prototype, "btnLeft", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Button)
], CrashTotalRecordView.prototype, "btnRight", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labCurrServerSeed", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labCurrServerSeedValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPrevServerSeed", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPrevServerSeedValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPublicSeed", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordView.prototype, "labPublicSeedValue", void 0);
__decorate([
    property(ListView_1.default)
], CrashTotalRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], CrashTotalRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], CrashTotalRecordView.prototype, "noneItem", void 0);
CrashTotalRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashTotalRecordView);
exports.default = CrashTotalRecordView;

cc._RF.pop();