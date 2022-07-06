"use strict";
cc._RF.push(module, '15e1724SYRL35MwxDcD8MvH', 'RouletteTotalRecordView');
// games/roulette/script/view/RouletteTotalRecordView.ts

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
const RouletteData_1 = __importDefault(require("../data/RouletteData"));
// 每页数量
const PAGE_COUNT = 20;
// 一天毫秒
const ONE_DAY_MS = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
const { ccclass, property } = cc._decorator;
let RouletteTotalRecordView = class RouletteTotalRecordView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.lsvRecord = null;
        this.titleItemPage = null;
        this.noneItem = null;
        // App 数据
        this._appData = null;
        // App 数据
        this._rouletteData = null;
        // 是否最后一页
        this._isLastPage = false;
        // 当天历史数据列表
        this._gameRecordDataList = null;
    }
    static getPrefabUrl() {
        return "prefabs/RouletteTotalRecordView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        let round = this._rouletteData.curRound;
        this.C2R_GetGameRecords_Req(round);
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._rouletteData = G.DataMgr.get(RouletteData_1.default);
        this._isLastPage = false;
        this._gameRecordDataList = [];
    }
    initView() {
        this.noneItem.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_R2C_GetGameRecords_Res", this.onEvent_R2C_GetGameRecords_Res);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("labRecordPageName", true));
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._gameRecordDataList.length > 0) {
            let lastRecordData = this._gameRecordDataList[this._gameRecordDataList.length - 1];
            id = lastRecordData.round;
        }
        return id;
    }
    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    C2R_GetGameRecords_Req(round) {
        if (TypeUtils_1.default.isNull(round)) {
            round = DEFAULT_FIRST_ID;
        }
        let data = {
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            limit: PAGE_COUNT,
            round
        };
        let req = protoc_1.MST.C2R_GetGameRecords_Req.create(data);
        let buffer = protoc_1.MST.C2R_GetGameRecords_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2R_GetGameRecords_Req, protoc_1.MST.OuterOpcode_Roulette.C2R_GetGameRecords_Req, buffer);
    }
    onEvent_R2C_GetGameRecords_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        if (data.round === DEFAULT_FIRST_ID && data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;
        if (data.round === DEFAULT_FIRST_ID) {
            this._gameRecordDataList = [].concat(data.records);
            this.lsvRecord.set(data.records);
        }
        else {
            this._gameRecordDataList = this._gameRecordDataList.concat(data.records);
            this.lsvRecord.insert(data.records);
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
        this.C2R_GetGameRecords_Req(0);
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览总历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2R_GetGameRecords_Req(this.getLastRecordId());
    }
};
__decorate([
    property(ListView_1.default)
], RouletteTotalRecordView.prototype, "lsvRecord", void 0);
__decorate([
    property(TitleItemPage_1.default)
], RouletteTotalRecordView.prototype, "titleItemPage", void 0);
__decorate([
    property(NoneItem_1.default)
], RouletteTotalRecordView.prototype, "noneItem", void 0);
RouletteTotalRecordView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteTotalRecordView);
exports.default = RouletteTotalRecordView;

cc._RF.pop();