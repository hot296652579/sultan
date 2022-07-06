"use strict";
cc._RF.push(module, '9fd48zalUBMVaKt25/UByRd', 'DepositRecordView');
// script/wallet/DepositRecordView.ts

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
const ListView_1 = __importDefault(require("../common/component/ListView"));
const NoneItem_1 = __importDefault(require("../common/item/NoneItem"));
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const TypeUtils_1 = __importDefault(require("../common/utils/TypeUtils"));
const AppData_1 = __importDefault(require("../data/AppData"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
// 每页数量
const PAGE_COUNT = 10;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = 0;
const { ccclass, property } = cc._decorator;
let DepositRecordView = class DepositRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDate = null;
        this.labChips = null;
        this.labAmount = null;
        this.lsvRecord = null;
        this.titleItem = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 个人历史下注数据列表
        this._dataList = null;
        this.currentIndexPage = 0;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/DepositRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.C2S_MyRecord();
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
        // this.labGameNoTitle.string = "";
        // this.labDate.string = "";
        // this.labBankCode.string = "";
        // this.labAmount.string = "";
        // this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_S2C_GetDepositList", this.onEvent_S2C_GetDepositList);
    }
    onLanguageChange() {
    }
    getLastRecordId() {
        let id;
        id = this.currentIndexPage + PAGE_COUNT;
        return id;
    }
    /**
     * 查询历史记录
     * @param id {number} id 为了避免查询后，出现重复数据 首次请求默认为 -1 （查询后的数据不包含自身 ID）
     */
    C2S_MyRecord(index) {
        if (TypeUtils_1.default.isNull(index)) {
            index = DEFAULT_FIRST_ID;
        }
        let data = {
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            index,
            limit: PAGE_COUNT,
        };
        console.log('C2S_MyRecord ->index :' + index);
        let req = protoc_1.MST.C2S_GetDepositList.create(data);
        let buffer = protoc_1.MST.C2S_GetDepositList.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2S_GetDepositList, protoc_1.MST.OuterOpcode_Lobby.C2S_GetDepositList, buffer);
    }
    onEvent_S2C_GetDepositList(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        this.currentIndexPage = data.index;
        if (data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;
        this._dataList = this._dataList.concat(data.records);
        this.lsvRecord.insert(data.records);
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
        this.C2S_MyRecord(0);
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览个人历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2S_MyRecord(this.getLastRecordId());
    }
};
__decorate([
    property(cc.Label)
], DepositRecordView.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], DepositRecordView.prototype, "labChips", void 0);
__decorate([
    property(cc.Label)
], DepositRecordView.prototype, "labAmount", void 0);
__decorate([
    property(ListView_1.default)
], DepositRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(cc.Node)
], DepositRecordView.prototype, "titleItem", void 0);
__decorate([
    property(NoneItem_1.default)
], DepositRecordView.prototype, "noneItem", void 0);
DepositRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], DepositRecordView);
exports.default = DepositRecordView;

cc._RF.pop();