"use strict";
cc._RF.push(module, '24b448yqQNEDLueSt3Z+ohN', 'CrashMyRecordView');
// games/crash/script/view/CrashMyRecordView.ts

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
const protoc_1 = require("../../../../script/framework/external/protoc");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
// 每页数量
const PAGE_COUNT = 20;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
const { ccclass, property } = cc._decorator;
let CrashMyRecordView = class CrashMyRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labGameNoTitle = null;
        this.labDate = null;
        this.labBetRate = null;
        this.labBetGold = null;
        this.labIncome = null;
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 个人历史下注数据列表
        this._dataList = null;
    }
    static getPrefabUrl() {
        return "prefabs/CrashMyRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2S_CrashMyRecord();
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._isLastPage = false;
        this._dataList = [];
    }
    initView() {
        this.labGameNoTitle.string = "";
        this.labDate.string = "";
        this.labBetRate.string = "";
        this.labBetGold.string = "";
        this.labIncome.string = "";
        this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_S2C_CrashMyRecord", this.onEvent_S2C_CrashMyRecord);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labMyRecordPageName", true));
        this.labGameNoTitle.language = Manager_1.Manager.makeLanguage("labGameNoTitle", true);
        this.labDate.language = Manager_1.Manager.makeLanguage("labDate", true);
        this.labBetRate.language = Manager_1.Manager.makeLanguage("labBetRate", true);
        this.labBetGold.language = Manager_1.Manager.makeLanguage("labBetGold", true);
        this.labIncome.language = Manager_1.Manager.makeLanguage("labIncome", true);
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._dataList.length > 0) {
            let lastRecordData = this._dataList[this._dataList.length - 1];
            id = lastRecordData.id;
        }
        return id;
    }
    /**
     * 查询历史记录
     * @param id {number} id 为了避免查询后，出现重复数据 首次请求默认为 -1 （查询后的数据不包含自身 ID）
     */
    C2S_CrashMyRecord(id) {
        if (TypeUtils_1.default.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }
        let data = {
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            id: id,
            count: PAGE_COUNT,
        };
        let req = protoc_1.MST.C2S_CrashMyRecord.create(data);
        let buffer = protoc_1.MST.C2S_CrashMyRecord.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2S_CrashMyRecord, protoc_1.MST.OuterOpcode_CrashGame.C2S_CrashMyRecord, buffer);
    }
    onEvent_S2C_CrashMyRecord(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        if (data.id === DEFAULT_FIRST_ID && data.myRecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.myRecordInfo.length < PAGE_COUNT;
        if (data.id === DEFAULT_FIRST_ID) {
            this._dataList = [].concat(data.myRecordInfo);
            this.lsvRecord.set(data.myRecordInfo);
        }
        else {
            this._dataList = this._dataList.concat(data.myRecordInfo);
            this.lsvRecord.insert(data.myRecordInfo);
        }
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
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
        this.C2S_CrashMyRecord();
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览个人历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2S_CrashMyRecord(this.getLastRecordId());
    }
};
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labGameNoTitle", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labBetRate", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labBetGold", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordView.prototype, "labIncome", void 0);
__decorate([
    property(ListView_1.default)
], CrashMyRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], CrashMyRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], CrashMyRecordView.prototype, "noneItem", void 0);
CrashMyRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashMyRecordView);
exports.default = CrashMyRecordView;

cc._RF.pop();