"use strict";
cc._RF.push(module, '6aab0BVs7dOEZvS/o0OUXeP', 'CrashTotalRecordItem');
// games/crash/script/view/CrashTotalRecordItem.ts

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
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const CrashConfig_1 = require("../config/CrashConfig");
const CrashData_1 = __importDefault(require("../data/CrashData"));
const { ccclass, property } = cc._decorator;
let CrashTotalRecordItem = class CrashTotalRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labGameNo = null;
        this.labDate = null;
        this.labRoundHash = null;
        this.labRoundHashValue = null;
        this.labAcak = null;
        this.labAcakValue = null;
        this.labPoint = null;
        this.labPointValue = null;
        this.labCheck = null;
        this.imgLine = null;
        // 数据
        this._data = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initView() {
        this.labGameNo.string = "";
        this.labDate.string = "";
        this.labRoundHash.string = "";
        this.labRoundHashValue.string = "";
        this.labAcak.string = "";
        this.labAcakValue.string = "";
        this.labPoint.string = "";
        this.labPointValue.string = "";
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.labPoint.language = Manager_1.Manager.makeLanguage("labPoint", true);
        this.labRoundHash.language = Manager_1.Manager.makeLanguage("labRoundHash", true);
        this.labAcak.language = Manager_1.Manager.makeLanguage("labAcak", true);
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNo.language = Manager_1.Manager.makeLanguage(["labGameNo", data.GameNo], true);
        this.labDate.string = DateUtils_1.default.getYMDHMS(data.Timestamp);
        this.labPointValue.string = `${NumberUtils_1.default.converToC(data.Multiple)}x`;
        this.labRoundHashValue.string = data.RoundHashCell.RoundHash;
        this.labAcakValue.string = data.RoundHashCell.Acak.toString();
    }
    reset() {
        this.initData();
        this.initView();
    }
    openCheckWeb() {
        let crashData = G.DataMgr.get(CrashData_1.default);
        let serverSeed = crashData.totalRecordData.SeedInfo.ServerSeed;
        if (TypeUtils_1.default.isNull(serverSeed) || serverSeed.length <= 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("todayNotFind", true));
            return;
        }
        let publicSeed = crashData.totalRecordData.SeedInfo.PublicSeed;
        let gameNo = this._data.GameNo;
        let url = `${CrashConfig_1.CrashConfig.CHECK_SHA256_URL}${serverSeed}${publicSeed}${gameNo}`;
        cc.sys.openURL(url);
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnCheck":
                // Manager.uiManager.open({ type: CrashCheckView, bundle: SubGameDefine.GameName.CRASH, args: [this._data.GameNo] });
                this.openCheckWeb();
                break;
        }
    }
};
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labRoundHash", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labRoundHashValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labAcak", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labAcakValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labPoint", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labPointValue", void 0);
__decorate([
    property(cc.Label)
], CrashTotalRecordItem.prototype, "labCheck", void 0);
__decorate([
    property(cc.Sprite)
], CrashTotalRecordItem.prototype, "imgLine", void 0);
CrashTotalRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashTotalRecordItem);
exports.default = CrashTotalRecordItem;

cc._RF.pop();