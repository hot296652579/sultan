"use strict";
cc._RF.push(module, '4678dX8kAdBJYOBMVmEzEyx', 'PromotionView');
// script/promotion/PromotionView.ts

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
const CommonDefine_1 = require("../common/define/CommonDefine");
const TitleItemPage_1 = __importDefault(require("../common/item/TitleItemPage"));
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const IndicatorView_1 = __importDefault(require("../common/view/IndicatorView"));
const AppData_1 = __importDefault(require("../data/AppData"));
const UserData_1 = __importDefault(require("../data/UserData"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const DateUtils_1 = __importDefault(require("../framework/extentions/DateUtils"));
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PromotionRankListView_1 = __importDefault(require("./PromotionRankListView"));
// 最小推广下级收益百分比
const MIN_PROMOTION_INCOME_PERCENT = 30;
// 最大推广下级收益百分比
const MAX_PROMOTION_INCOME_PERCENT = 50;
const { ccclass, property } = cc._decorator;
let PromotionView = class PromotionView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labLevelTitle = null;
        this.imgFill = null;
        this.imgBar = [];
        this.labInvitationCodeTitle = null;
        this.labInvitationCodeContent = null;
        this.labInvitationUrlTitle = null;
        this.labInvitationUrlContent = null;
        this.labStatTitle = null;
        this.labTotalGoldTitle = null;
        this.labTotalGoldContent = null;
        this.labWithdrawGoldTitle = null;
        this.labWithdrawGoldContent = null;
        this.labYesterdayGoldTitle = null;
        this.labYesterdayGoldContent = null;
        this.labYesterdayInvitationTitle = null;
        this.labYesterdayInvitationContent = null;
        this.labAllInvitationTitle = null;
        this.labAllInvitationContent = null;
        this.labUpdateDate = null;
        this.labGoldGraphTitle = null;
        this.nodGoldGraph = null;
        this.gphIncome = null;
        this.labInvitationGraphTitle = null;
        this.nodInvitationGraph = null;
        this.gphRegister = null;
        this.gphValid = null;
        this.labRankTitle = null;
        this.lsvRank = null;
        this.titleItemPage = null;
        // 用户数据
        this._userData = null;
        // 应用数据
        this._appData = null;
        // 数据
        this._data = null;
        // 原始等级经验宽度
        this._originFillWidth = null;
        // 原始邀请人数绘图高度
        this._originInvitationHeight = null;
        // 原始推广收入绘图高度
        this._originIncomeHeight = null;
        // 7 天最大推广收入
        this._maxIncomeGold = null;
        // 7 天最大注册人数
        this._maxRegisterCount = null;
        // 7 天最大有效人数
        this._maxValidCount = null;
    }
    static getPrefabUrl() {
        return "promotion/prefabs/PromotionView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initUI();
        this.C2S_PromotionInfo();
    }
    start() {
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
        this._appData = G.DataMgr.get(AppData_1.default);
        this._originFillWidth = this.imgFill.node.width;
        this._originInvitationHeight = this.nodInvitationGraph.getChildByName("imgRegisterLine").height;
        this._originIncomeHeight = this.nodGoldGraph.getChildByName("imgGoldLine").height;
    }
    initUI() {
        this.labLevelTitle.string = "";
        this.labInvitationCodeTitle.string = "";
        this.labInvitationCodeContent.string = "";
        this.labInvitationUrlTitle.string = "";
        this.labInvitationUrlContent.string = "";
        this.labStatTitle.string = "";
        this.labTotalGoldTitle.string = "";
        this.labTotalGoldContent.string = "";
        this.labWithdrawGoldTitle.string = "";
        this.labWithdrawGoldContent.string = "";
        this.labYesterdayGoldTitle.string = "";
        this.labYesterdayGoldContent.string = "";
        this.labYesterdayInvitationTitle.string = "";
        this.labYesterdayInvitationContent.string = "";
        this.labAllInvitationTitle.string = "";
        this.labAllInvitationContent.string = "";
        this.labUpdateDate.string = "";
        this.labGoldGraphTitle.string = "";
        this.labInvitationGraphTitle.string = "";
        this.labRankTitle.string = "";
        this.imgFill.node.width = 0;
        for (let v of this.imgBar) {
            v.node.active = false;
        }
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_S2C_PromotionInfo", this.onEvent_S2C_PromotionInfo);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("Promotion.labPageName"));
        this.labLevelTitle.language = Manager_1.Manager.makeLanguage("Promotion.labLevelTitle");
        this.labInvitationCodeTitle.language = Manager_1.Manager.makeLanguage("Promotion.labInvitationCodeTitle");
        this.labInvitationUrlTitle.language = Manager_1.Manager.makeLanguage("Promotion.labInvitationUrlTitle");
        this.labStatTitle.language = Manager_1.Manager.makeLanguage("Promotion.labStatTitle");
        this.labTotalGoldTitle.language = Manager_1.Manager.makeLanguage("Promotion.labTotalGoldTitle");
        this.labWithdrawGoldTitle.language = Manager_1.Manager.makeLanguage("Promotion.labWithdrawGoldTitle");
        this.labYesterdayGoldTitle.language = Manager_1.Manager.makeLanguage("Promotion.labYesterdayGoldTitle");
        this.labYesterdayInvitationTitle.language = Manager_1.Manager.makeLanguage("Promotion.labYesterdayInvitationTitle");
        this.labAllInvitationTitle.language = Manager_1.Manager.makeLanguage("Promotion.labAllInvitationTitle");
        this.labGoldGraphTitle.language = Manager_1.Manager.makeLanguage("Promotion.labGoldGraphTitle");
        this.labInvitationGraphTitle.language = Manager_1.Manager.makeLanguage("Promotion.labInvitationGraphTitle");
        this.labRankTitle.language = Manager_1.Manager.makeLanguage("Promotion.labRankTitle");
        this.refreshStatLastDate();
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    drawIncomeLine() {
        let latDate = this.nodGoldGraph.getChildByName("latDate").getComponent(cc.Layout);
        this.gphIncome.clear();
        let targetPos = cc.v2(0, 0);
        for (let i = 0; i < this._data.incomeList.length; ++i) {
            let v = this._data.incomeList[i];
            let btnGraph = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let worldPos = btnGraph.node.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos = this.gphIncome.node.parent.convertToNodeSpaceAR(worldPos);
            targetPos.x = localPos.x;
            targetPos.y = this.getDrawLineHeight(this._originIncomeHeight, this._maxIncomeGold, v);
            this.gphIncome.lineTo(targetPos.x, targetPos.y);
            this.gphIncome.stroke();
            this.gphIncome.moveTo(targetPos.x, targetPos.y);
        }
    }
    drawValidCountLine() {
        let latDate = this.nodInvitationGraph.getChildByName("latDate").getComponent(cc.Layout);
        this.gphValid.clear();
        let targetPos = cc.v2(0, 0);
        for (let i = 0; i < this._data.validCountList.length; ++i) {
            let v = this._data.validCountList[i];
            let btnGraph = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let worldPos = btnGraph.node.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos = this.gphValid.node.parent.convertToNodeSpaceAR(worldPos);
            targetPos.x = localPos.x;
            targetPos.y = this.getDrawLineHeight(this._originInvitationHeight, this._maxRegisterCount, v);
            this.gphValid.lineTo(targetPos.x, targetPos.y);
            this.gphValid.stroke();
            this.gphValid.moveTo(targetPos.x, targetPos.y);
        }
    }
    drawRegisterCountLine() {
        let latDate = this.nodInvitationGraph.getChildByName("latDate").getComponent(cc.Layout);
        this.gphRegister.clear();
        let targetPos = cc.v2(0, 0);
        for (let i = 0; i < this._data.registerCountList.length; ++i) {
            let v = this._data.registerCountList[i];
            let btnGraph = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let worldPos = btnGraph.node.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos = this.gphRegister.node.parent.convertToNodeSpaceAR(worldPos);
            targetPos.x = localPos.x;
            targetPos.y = this.getDrawLineHeight(this._originInvitationHeight, this._maxRegisterCount, v);
            this.gphRegister.lineTo(targetPos.x, targetPos.y);
            this.gphRegister.stroke();
            this.gphRegister.moveTo(targetPos.x, targetPos.y);
        }
    }
    getDrawLineHeight(maxHeight, maxCount, currCount) {
        return (Number(currCount) / maxCount) * maxHeight;
    }
    refreshLevel() {
        let maxStepPercent = 100 / (Object.values(protoc_1.MST.PromotionLevel).length - 1);
        let percent = 0;
        let halfPercent = (this._data.levelPercent / 100) * maxStepPercent;
        if (halfPercent > maxStepPercent) {
            halfPercent = maxStepPercent;
        }
        if (this._data.level === protoc_1.MST.PromotionLevel.Level0) {
            percent = halfPercent / 100;
        }
        else if (this._data.level === protoc_1.MST.PromotionLevel.Level1) {
            percent = (maxStepPercent + halfPercent) / 100;
        }
        else {
            percent = 1;
        }
        let width = percent * this._originFillWidth;
        if (width > this._originFillWidth) {
            width = this._originFillWidth;
        }
        else if (width < 0) {
            width = 0;
        }
        this.imgFill.node.width = width;
        for (let i = 0; i <= this._data.level; ++i) {
            this.imgBar[i].node.active = true;
        }
    }
    refreshInvitationInfo() {
        this.labInvitationCodeContent.string = this._userData.extendCode;
        this.labInvitationUrlContent.string = UtilMgr_1.UtilMgr.setString(this.getInvitationURL(), 35, true);
    }
    refreshStatLastDate() {
        if (this._data) {
            this.labUpdateDate.language = Manager_1.Manager.makeLanguage(["Promotion.labUpdateDate", DateUtils_1.default.getYMD(this._data.promotionDataInfo.lastUpdateTime, "-")]);
        }
    }
    refreshStatInfo() {
        this.labTotalGoldContent.language = Manager_1.Manager.makeLanguage(["Promotion.RpGold", NumberUtils_1.default.converToC(this._data.promotionDataInfo.totalIncomeGold)]);
        this.labWithdrawGoldContent.language = Manager_1.Manager.makeLanguage(["Promotion.RpGold", NumberUtils_1.default.converToC(this._data.promotionDataInfo.totalWithdrawGold)]);
        this.labYesterdayGoldContent.language = Manager_1.Manager.makeLanguage(["Promotion.RpGold", NumberUtils_1.default.converToC(this._data.promotionDataInfo.ayerIncomeGold)]);
        this.labYesterdayInvitationContent.language = this._data.promotionDataInfo.ayerInvitationCount.toString();
        this.labAllInvitationContent.string = this._data.promotionDataInfo.totalInvitationCount.toString();
        this.refreshStatLastDate();
    }
    refreshRank() {
        this.lsvRank.set(this.getRankPlayerList());
    }
    refreshIncomeGraph() {
        let latDate = this.nodGoldGraph.getChildByName("latDate").getComponent(cc.Layout);
        for (let i = 0; i < latDate.node.childrenCount; ++i) {
            let btnInvitation = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let labDate = btnInvitation.node.getChildByName("labDate").getComponent(cc.Label);
            labDate.string = DateUtils_1.default.getDayBeforeAfter(this._appData.getClientTimestamp(), -(latDate.node.childrenCount - (i + 1)), "MM.dd");
        }
        this.drawIncomeLine();
    }
    refreshInvitationGraph() {
        let latDate = this.nodInvitationGraph.getChildByName("latDate").getComponent(cc.Layout);
        for (let i = 0; i < latDate.node.childrenCount; ++i) {
            let btnInvitation = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let labDate = btnInvitation.node.getChildByName("labDate").getComponent(cc.Label);
            labDate.string = DateUtils_1.default.getDayBeforeAfter(this._appData.getClientTimestamp(), -(latDate.node.childrenCount - (i + 1)), "MM.dd");
        }
        this.drawValidCountLine();
        this.drawRegisterCountLine();
    }
    getInvitationURL() {
        let url = window.location.href.replace(window.location.search, "");
        return `${url}?invcode=${this._userData.extendCode}`;
    }
    getRankPlayerList() {
        let list = [];
        for (let i = 0; i < this._data.promotionRankInfo.length; ++i) {
            let playerBrokerageRank = {
                rank: i + 1,
                data: this._data.promotionRankInfo[i],
            };
            list[i] = playerBrokerageRank;
        }
        return list;
    }
    clickInvitationGraph() {
    }
    clickIndicator(targetNode) {
        let worldPos = targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        Manager_1.Manager.uiManager.open({ type: IndicatorView_1.default, bundle: this.bundle, args: [localPos, Manager_1.Manager.makeLanguage("Promotion.promotionUpdateDateTips"), 400, CommonDefine_1.CommonDefine.Direction.UP] });
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnInvitationCodeCopy":
                window['platformUtil'].copyToClip(this.labInvitationCodeContent.string);
                break;
            case "btnInvitationUrlCopy":
                window['platformUtil'].copyToClip(this.getInvitationURL());
                break;
            case "btnInvitation0":
            case "btnInvitation1":
            case "btnInvitation2":
            case "btnInvitation3":
            case "btnInvitation4":
            case "btnInvitation5":
            case "btnInvitation6":
                this.clickInvitationGraph();
                break;
            case "btnUpdateDateTips":
                this.clickIndicator(ButtonNode);
                break;
            case "btnClose":
                this.close();
                break;
        }
    }
    getArrayMaxValue(arr) {
        let maxValue = 0;
        for (let v of arr) {
            let numValue = Number(v);
            maxValue = Math.max(numValue, maxValue);
        }
        return maxValue;
    }
    /**
     * 请求推广信息
     */
    C2S_PromotionInfo() {
        let req = protoc_1.MST.C2S_PromotionInfo.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
        });
        let buffer = protoc_1.MST.C2S_PromotionInfo.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_PromotionInfo, protoc_1.MST.OuterOpcode_Lobby.C2S_PromotionInfo, buffer);
    }
    testData() {
        // this._data.incomeList = [];
        // this._data.incomeList[0] = 100000;
        // this._data.incomeList[1] = 48899;
        // this._data.incomeList[2] = 5534413;
        // this._data.incomeList[3] = 443537;
        // this._data.incomeList[4] = 121014;
        // this._data.incomeList[5] = 6510606;
        // this._data.incomeList[6] = 65464;
        this._data.registerCountList = [];
        this._data.registerCountList[0] = 0;
        this._data.registerCountList[1] = 1;
        this._data.registerCountList[2] = 2;
        this._data.registerCountList[3] = 0;
        this._data.registerCountList[4] = 0;
        this._data.registerCountList[5] = 0;
        this._data.registerCountList[6] = 0;
        this._data.validCountList = [];
        this._data.validCountList[0] = 0;
        this._data.validCountList[1] = 0;
        this._data.validCountList[2] = 0;
        this._data.validCountList[3] = 0;
        this._data.validCountList[4] = 1;
        this._data.validCountList[5] = 0;
        this._data.validCountList[6] = 0;
        this._data.level = 1;
        this._data.levelPercent = 45;
        this._data.promotionDataInfo.totalIncomeGold = 1;
        this._data.promotionDataInfo.totalWithdrawGold = 2;
        this._data.promotionDataInfo.ayerIncomeGold = 3;
        this._data.promotionDataInfo.ayerInvitationCount = 4;
        this._data.promotionDataInfo.totalInvitationCount = 5;
    }
    /**
     * 响应推广信息
     */
    onEvent_S2C_PromotionInfo(data) {
        this._data = data;
        // this.testData();
        this._maxIncomeGold = this.getArrayMaxValue(this._data.incomeList);
        this._maxRegisterCount = this.getArrayMaxValue(this._data.registerCountList);
        this._maxValidCount = this.getArrayMaxValue(this._data.validCountList);
        this.refreshLevel();
        this.refreshInvitationInfo();
        this.refreshStatInfo();
        this.refreshRank();
        this.refreshIncomeGraph();
        this.refreshInvitationGraph();
    }
};
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labLevelTitle", void 0);
__decorate([
    property(cc.Sprite)
], PromotionView.prototype, "imgFill", void 0);
__decorate([
    property([cc.Sprite])
], PromotionView.prototype, "imgBar", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labInvitationCodeTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labInvitationCodeContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labInvitationUrlTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labInvitationUrlContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labStatTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labTotalGoldTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labTotalGoldContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labWithdrawGoldTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labWithdrawGoldContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labYesterdayGoldTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labYesterdayGoldContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labYesterdayInvitationTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labYesterdayInvitationContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labAllInvitationTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labAllInvitationContent", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labUpdateDate", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labGoldGraphTitle", void 0);
__decorate([
    property(cc.Node)
], PromotionView.prototype, "nodGoldGraph", void 0);
__decorate([
    property(cc.Graphics)
], PromotionView.prototype, "gphIncome", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labInvitationGraphTitle", void 0);
__decorate([
    property(cc.Node)
], PromotionView.prototype, "nodInvitationGraph", void 0);
__decorate([
    property(cc.Graphics)
], PromotionView.prototype, "gphRegister", void 0);
__decorate([
    property(cc.Graphics)
], PromotionView.prototype, "gphValid", void 0);
__decorate([
    property(cc.Label)
], PromotionView.prototype, "labRankTitle", void 0);
__decorate([
    property(PromotionRankListView_1.default)
], PromotionView.prototype, "lsvRank", void 0);
__decorate([
    property(TitleItemPage_1.default)
], PromotionView.prototype, "titleItemPage", void 0);
PromotionView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PromotionView);
exports.default = PromotionView;

cc._RF.pop();