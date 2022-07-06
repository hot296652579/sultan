
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/promotion/PromotionView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcHJvbW90aW9uL1Byb21vdGlvblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBNkQ7QUFDN0QsaUZBQXlEO0FBQ3pELHVEQUFvRDtBQUNwRCw2REFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELGlGQUF5RDtBQUN6RCw4REFBc0M7QUFDdEMsZ0VBQXdDO0FBQ3hDLHVEQUFxRjtBQUVyRixrRUFBa0U7QUFDbEUsMERBQXVEO0FBQ3ZELGtGQUEwRDtBQUMxRCx5REFBbUQ7QUFDbkQsb0VBQTRDO0FBQzVDLCtDQUE0QztBQUU1QyxvRkFBNEQ7QUFFNUQsY0FBYztBQUNkLE1BQU0sNEJBQTRCLEdBQVcsRUFBRSxDQUFDO0FBQ2hELGNBQWM7QUFDZCxNQUFNLDRCQUE0QixHQUFXLEVBQUUsQ0FBQztBQUVoRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsZ0JBQU07SUFBakQ7O1FBSVksa0JBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsWUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixXQUFNLEdBQWdCLEVBQUUsQ0FBQztRQUd6QiwyQkFBc0IsR0FBYSxJQUFJLENBQUM7UUFHeEMsNkJBQXdCLEdBQWEsSUFBSSxDQUFDO1FBRzFDLDBCQUFxQixHQUFhLElBQUksQ0FBQztRQUd2Qyw0QkFBdUIsR0FBYSxJQUFJLENBQUM7UUFHekMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsc0JBQWlCLEdBQWEsSUFBSSxDQUFDO1FBR25DLHdCQUFtQixHQUFhLElBQUksQ0FBQztRQUdyQyx5QkFBb0IsR0FBYSxJQUFJLENBQUM7UUFHdEMsMkJBQXNCLEdBQWEsSUFBSSxDQUFDO1FBR3hDLDBCQUFxQixHQUFhLElBQUksQ0FBQztRQUd2Qyw0QkFBdUIsR0FBYSxJ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S0FBSyxDQUFDO21EQUNtQjtBQUd0QztJQURDLFFBQVEsQ0FBQywrQkFBcUIsQ0FBQzs4Q0FDYztBQUc5QztJQURDLFFBQVEsQ0FBQyx1QkFBYSxDQUFDO29EQUNvQjtBQXhGM0IsYUFBYTtJQUZqQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixhQUFhLENBMmNqQztrQkEzY29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IENvbW1vbkRlZmluZSB9IGZyb20gXCIuLi9jb21tb24vZGVmaW5lL0NvbW1vbkRlZmluZVwiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2UgZnJvbSBcIi4uL2NvbW1vbi9pdGVtL1RpdGxlSXRlbVBhZ2VcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uL2NvbW1vbi91dGlscy9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IEluZGljYXRvclZpZXcgZnJvbSBcIi4uL2NvbW1vbi92aWV3L0luZGljYXRvclZpZXdcIjtcbmltcG9ydCBBcHBEYXRhIGZyb20gXCIuLi9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUywgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgRGF0ZVV0aWxzIGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgeyBQcm9tb3Rpb25JbnRlcmZhY2UgfSBmcm9tIFwiLi9Qcm9tb3Rpb25JbnRlcmZhY2VcIjtcbmltcG9ydCBQcm9tb3Rpb25SYW5rTGlzdFZpZXcgZnJvbSBcIi4vUHJvbW90aW9uUmFua0xpc3RWaWV3XCI7XG5cbi8vIOacgOWwj+aOqOW5v+S4i+e6p+aUtuebiueZvuWIhuavlFxuY29uc3QgTUlOX1BST01PVElPTl9JTkNPTUVfUEVSQ0VOVDogbnVtYmVyID0gMzA7XG4vLyDmnIDlpKfmjqjlub/kuIvnuqfmlLbnm4rnmb7liIbmr5RcbmNvbnN0IE1BWF9QUk9NT1RJT05fSU5DT01FX1BFUkNFTlQ6IG51bWJlciA9IDUwO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvbW90aW9uVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTGV2ZWxUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0ZpbGw6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZV0pXG4gICAgcHJpdmF0ZSBpbWdCYXI6IGNjLlNwcml0ZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJbnZpdGF0aW9uQ29kZVRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJbnZpdGF0aW9uQ29kZUNvbnRlbnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkludml0YXRpb25VcmxUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiSW52aXRhdGlvblVybENvbnRlbnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlN0YXRUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiVG90YWxHb2xkVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlRvdGFsR29sZENvbnRlbnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYldpdGhkcmF3R29sZFRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJXaXRoZHJhd0dvbGRDb250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJZZXN0ZXJkYXlHb2xkVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlllc3RlcmRheUdvbGRDb250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJZZXN0ZXJkYXlJbnZpdGF0aW9uVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlllc3RlcmRheUludml0YXRpb25Db250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJBbGxJbnZpdGF0aW9uVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkFsbEludml0YXRpb25Db250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJVcGRhdGVEYXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJHb2xkR3JhcGhUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RHb2xkR3JhcGg6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkdyYXBoaWNzKVxuICAgIHByaXZhdGUgZ3BoSW5jb21lOiBjYy5HcmFwaGljcyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJbnZpdGF0aW9uR3JhcGhUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RJbnZpdGF0aW9uR3JhcGg6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkdyYXBoaWNzKVxuICAgIHByaXZhdGUgZ3BoUmVnaXN0ZXI6IGNjLkdyYXBoaWNzID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5HcmFwaGljcylcbiAgICBwcml2YXRlIGdwaFZhbGlkOiBjYy5HcmFwaGljcyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJSYW5rVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShQcm9tb3Rpb25SYW5rTGlzdFZpZXcpXG4gICAgcHJpdmF0ZSBsc3ZSYW5rOiBQcm9tb3Rpb25SYW5rTGlzdFZpZXcgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFRpdGxlSXRlbVBhZ2UpXG4gICAgcHJpdmF0ZSB0aXRsZUl0ZW1QYWdlOiBUaXRsZUl0ZW1QYWdlID0gbnVsbDtcblxuICAgIC8vIOeUqOaIt+aVsOaNrlxuICAgIHByaXZhdGUgX3VzZXJEYXRhOiBVc2VyRGF0YSA9IG51bGw7XG4gICAgLy8g5bqU55So5pWw5o2uXG4gICAgcHJpdmF0ZSBfYXBwRGF0YTogQXBwRGF0YSA9IG51bGw7XG4gICAgLy8g5pWw5o2uXG4gICAgcHJpdmF0ZSBfZGF0YTogTVNULklTMkNfUHJvbW90aW9uSW5mbyA9IG51bGw7XG4gICAgLy8g5Y6f5aeL562J57qn57uP6aqM5a695bqmXG4gICAgcHJpdmF0ZSBfb3JpZ2luRmlsbFdpZHRoOiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOWOn+Wni+mCgOivt+S6uuaVsOe7mOWbvumrmOW6plxuICAgIHByaXZhdGUgX29yaWdpbkludml0YXRpb25IZWlnaHQ6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5Y6f5aeL5o6o5bm/5pS25YWl57uY5Zu+6auY5bqmXG4gICAgcHJpdmF0ZSBfb3JpZ2luSW5jb21lSGVpZ2h0OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIDcg5aSp5pyA5aSn5o6o5bm/5pS25YWlXG4gICAgcHJpdmF0ZSBfbWF4SW5jb21lR29sZDogbnVtYmVyID0gbnVsbDtcbiAgICAvLyA3IOWkqeacgOWkp+azqOWGjOS6uuaVsFxuICAgIHByaXZhdGUgX21heFJlZ2lzdGVyQ291bnQ6IG51bWJlciA9IG51bGw7XG4gICAgLy8gNyDlpKnmnIDlpKfmnInmlYjkurrmlbBcbiAgICBwcml2YXRlIF9tYXhWYWxpZENvdW50OiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByb21vdGlvbi9wcmVmYWJzL1Byb21vdGlvblZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcblxuICAgICAgICB0aGlzLkMyU19Qcm9tb3Rpb25JbmZvKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICB0aGlzLl9hcHBEYXRhID0gRy5EYXRhTWdyLmdldChBcHBEYXRhKTtcbiAgICAgICAgdGhpcy5fb3JpZ2luRmlsbFdpZHRoID0gdGhpcy5pbWdGaWxsLm5vZGUud2lkdGg7XG4gICAgICAgIHRoaXMuX29yaWdpbkludml0YXRpb25IZWlnaHQgPSB0aGlzLm5vZEludml0YXRpb25HcmFwaC5nZXRDaGlsZEJ5TmFtZShcImltZ1JlZ2lzdGVyTGluZVwiKS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuX29yaWdpbkluY29tZUhlaWdodCA9IHRoaXMubm9kR29sZEdyYXBoLmdldENoaWxkQnlOYW1lKFwiaW1nR29sZExpbmVcIikuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFVJKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkxldmVsVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJJbnZpdGF0aW9uQ29kZVRpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW52aXRhdGlvbkNvZGVDb250ZW50LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW52aXRhdGlvblVybFRpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW52aXRhdGlvblVybENvbnRlbnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJTdGF0VGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJUb3RhbEdvbGRUaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlRvdGFsR29sZENvbnRlbnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJXaXRoZHJhd0dvbGRUaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYldpdGhkcmF3R29sZENvbnRlbnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJZZXN0ZXJkYXlHb2xkVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJZZXN0ZXJkYXlHb2xkQ29udGVudC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlllc3RlcmRheUludml0YXRpb25UaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlllc3RlcmRheUludml0YXRpb25Db250ZW50LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQWxsSW52aXRhdGlvblRpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQWxsSW52aXRhdGlvbkNvbnRlbnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJVcGRhdGVEYXRlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiR29sZEdyYXBoVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJJbnZpdGF0aW9uR3JhcGhUaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlJhbmtUaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmltZ0ZpbGwubm9kZS53aWR0aCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLmltZ0Jhcikge1xuICAgICAgICAgICAgdi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1MyQ19Qcm9tb3Rpb25JbmZvXCIsIHRoaXMub25FdmVudF9TMkNfUHJvbW90aW9uSW5mbyk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGFuZ3VhZ2VDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGl0bGVJdGVtUGFnZS5sYW5ndWFnZVBhZ2VOYW1lKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYlBhZ2VOYW1lXCIpKTtcbiAgICAgICAgdGhpcy5sYWJMZXZlbFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiTGV2ZWxUaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJJbnZpdGF0aW9uQ29kZVRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiSW52aXRhdGlvbkNvZGVUaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJJbnZpdGF0aW9uVXJsVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJJbnZpdGF0aW9uVXJsVGl0bGVcIik7XG4gICAgICAgIHRoaXMubGFiU3RhdFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiU3RhdFRpdGxlXCIpO1xuICAgICAgICB0aGlzLmxhYlRvdGFsR29sZFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiVG90YWxHb2xkVGl0bGVcIik7XG4gICAgICAgIHRoaXMubGFiV2l0aGRyYXdHb2xkVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJXaXRoZHJhd0dvbGRUaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJZZXN0ZXJkYXlHb2xkVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJZZXN0ZXJkYXlHb2xkVGl0bGVcIik7XG4gICAgICAgIHRoaXMubGFiWWVzdGVyZGF5SW52aXRhdGlvblRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiWWVzdGVyZGF5SW52aXRhdGlvblRpdGxlXCIpO1xuICAgICAgICB0aGlzLmxhYkFsbEludml0YXRpb25UaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkFsbEludml0YXRpb25UaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJHb2xkR3JhcGhUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkdvbGRHcmFwaFRpdGxlXCIpO1xuICAgICAgICB0aGlzLmxhYkludml0YXRpb25HcmFwaFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiSW52aXRhdGlvbkdyYXBoVGl0bGVcIik7XG4gICAgICAgIHRoaXMubGFiUmFua1RpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiUmFua1RpdGxlXCIpO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRMYXN0RGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuXG4gICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd0luY29tZUxpbmUoKTogdm9pZCB7XG4gICAgICAgIGxldCBsYXREYXRlOiBjYy5MYXlvdXQgPSB0aGlzLm5vZEdvbGRHcmFwaC5nZXRDaGlsZEJ5TmFtZShcImxhdERhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XG4gICAgICAgIHRoaXMuZ3BoSW5jb21lLmNsZWFyKCk7XG4gICAgICAgIGxldCB0YXJnZXRQb3M6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuX2RhdGEuaW5jb21lTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLl9kYXRhLmluY29tZUxpc3RbaV07XG4gICAgICAgICAgICBsZXQgYnRuR3JhcGg6IGNjLkJ1dHRvbiA9IGxhdERhdGUubm9kZS5nZXRDaGlsZEJ5TmFtZShgYnRuR3JhcGgke2l9YCkuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgICAgICBsZXQgd29ybGRQb3M6IGNjLlZlYzIgPSBidG5HcmFwaC5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICBsZXQgbG9jYWxQb3M6IGNjLlZlYzIgPSB0aGlzLmdwaEluY29tZS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XG4gICAgICAgICAgICB0YXJnZXRQb3MueCA9IGxvY2FsUG9zLng7XG4gICAgICAgICAgICB0YXJnZXRQb3MueSA9IHRoaXMuZ2V0RHJhd0xpbmVIZWlnaHQodGhpcy5fb3JpZ2luSW5jb21lSGVpZ2h0LCB0aGlzLl9tYXhJbmNvbWVHb2xkLCB2KTtcbiAgICAgICAgICAgIHRoaXMuZ3BoSW5jb21lLmxpbmVUbyh0YXJnZXRQb3MueCwgdGFyZ2V0UG9zLnkpO1xuICAgICAgICAgICAgdGhpcy5ncGhJbmNvbWUuc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmdwaEluY29tZS5tb3ZlVG8odGFyZ2V0UG9zLngsIHRhcmdldFBvcy55KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1ZhbGlkQ291bnRMaW5lKCk6IHZvaWQge1xuICAgICAgICBsZXQgbGF0RGF0ZTogY2MuTGF5b3V0ID0gdGhpcy5ub2RJbnZpdGF0aW9uR3JhcGguZ2V0Q2hpbGRCeU5hbWUoXCJsYXREYXRlXCIpLmdldENvbXBvbmVudChjYy5MYXlvdXQpO1xuICAgICAgICB0aGlzLmdwaFZhbGlkLmNsZWFyKCk7XG4gICAgICAgIGxldCB0YXJnZXRQb3M6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuX2RhdGEudmFsaWRDb3VudExpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCB2ID0gdGhpcy5fZGF0YS52YWxpZENvdW50TGlzdFtpXTtcbiAgICAgICAgICAgIGxldCBidG5HcmFwaDogY2MuQnV0dG9uID0gbGF0RGF0ZS5ub2RlLmdldENoaWxkQnlOYW1lKGBidG5HcmFwaCR7aX1gKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgICAgIGxldCB3b3JsZFBvczogY2MuVmVjMiA9IGJ0bkdyYXBoLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIGxldCBsb2NhbFBvczogY2MuVmVjMiA9IHRoaXMuZ3BoVmFsaWQubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xuICAgICAgICAgICAgdGFyZ2V0UG9zLnggPSBsb2NhbFBvcy54O1xuICAgICAgICAgICAgdGFyZ2V0UG9zLnkgPSB0aGlzLmdldERyYXdMaW5lSGVpZ2h0KHRoaXMuX29yaWdpbkludml0YXRpb25IZWlnaHQsIHRoaXMuX21heFJlZ2lzdGVyQ291bnQsIHYpO1xuICAgICAgICAgICAgdGhpcy5ncGhWYWxpZC5saW5lVG8odGFyZ2V0UG9zLngsIHRhcmdldFBvcy55KTtcbiAgICAgICAgICAgIHRoaXMuZ3BoVmFsaWQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmdwaFZhbGlkLm1vdmVUbyh0YXJnZXRQb3MueCwgdGFyZ2V0UG9zLnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkcmF3UmVnaXN0ZXJDb3VudExpbmUoKTogdm9pZCB7XG4gICAgICAgIGxldCBsYXREYXRlOiBjYy5MYXlvdXQgPSB0aGlzLm5vZEludml0YXRpb25HcmFwaC5nZXRDaGlsZEJ5TmFtZShcImxhdERhdGVcIikuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XG4gICAgICAgIHRoaXMuZ3BoUmVnaXN0ZXIuY2xlYXIoKTtcbiAgICAgICAgbGV0IHRhcmdldFBvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5fZGF0YS5yZWdpc3RlckNvdW50TGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHYgPSB0aGlzLl9kYXRhLnJlZ2lzdGVyQ291bnRMaXN0W2ldO1xuICAgICAgICAgICAgbGV0IGJ0bkdyYXBoOiBjYy5CdXR0b24gPSBsYXREYXRlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYGJ0bkdyYXBoJHtpfWApLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgbGV0IHdvcmxkUG9zOiBjYy5WZWMyID0gYnRuR3JhcGgubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgbGV0IGxvY2FsUG9zOiBjYy5WZWMyID0gdGhpcy5ncGhSZWdpc3Rlci5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XG4gICAgICAgICAgICB0YXJnZXRQb3MueCA9IGxvY2FsUG9zLng7XG4gICAgICAgICAgICB0YXJnZXRQb3MueSA9IHRoaXMuZ2V0RHJhd0xpbmVIZWlnaHQodGhpcy5fb3JpZ2luSW52aXRhdGlvbkhlaWdodCwgdGhpcy5fbWF4UmVnaXN0ZXJDb3VudCwgdik7XG4gICAgICAgICAgICB0aGlzLmdwaFJlZ2lzdGVyLmxpbmVUbyh0YXJnZXRQb3MueCwgdGFyZ2V0UG9zLnkpO1xuICAgICAgICAgICAgdGhpcy5ncGhSZWdpc3Rlci5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuZ3BoUmVnaXN0ZXIubW92ZVRvKHRhcmdldFBvcy54LCB0YXJnZXRQb3MueSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERyYXdMaW5lSGVpZ2h0KG1heEhlaWdodDogbnVtYmVyLCBtYXhDb3VudDogbnVtYmVyLCBjdXJyQ291bnQ6IG51bWJlciB8IExvbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKE51bWJlcihjdXJyQ291bnQpIC8gbWF4Q291bnQpICogbWF4SGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaExldmVsKCk6IHZvaWQge1xuICAgICAgICBsZXQgbWF4U3RlcFBlcmNlbnQ6IG51bWJlciA9IDEwMCAvIChPYmplY3QudmFsdWVzKE1TVC5Qcm9tb3Rpb25MZXZlbCkubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCBwZXJjZW50OiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgaGFsZlBlcmNlbnQ6IG51bWJlciA9ICh0aGlzLl9kYXRhLmxldmVsUGVyY2VudCAvIDEwMCkgKiBtYXhTdGVwUGVyY2VudDtcbiAgICAgICAgaWYgKGhhbGZQZXJjZW50ID4gbWF4U3RlcFBlcmNlbnQpIHtcbiAgICAgICAgICAgIGhhbGZQZXJjZW50ID0gbWF4U3RlcFBlcmNlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2RhdGEubGV2ZWwgPT09IE1TVC5Qcm9tb3Rpb25MZXZlbC5MZXZlbDApIHtcbiAgICAgICAgICAgIHBlcmNlbnQgPSBoYWxmUGVyY2VudCAvIDEwMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhLmxldmVsID09PSBNU1QuUHJvbW90aW9uTGV2ZWwuTGV2ZWwxKSB7XG4gICAgICAgICAgICBwZXJjZW50ID0gKG1heFN0ZXBQZXJjZW50ICsgaGFsZlBlcmNlbnQpIC8gMTAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVyY2VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBwZXJjZW50ICogdGhpcy5fb3JpZ2luRmlsbFdpZHRoO1xuICAgICAgICBpZiAod2lkdGggPiB0aGlzLl9vcmlnaW5GaWxsV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5fb3JpZ2luRmlsbFdpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgICAgICAgd2lkdGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1nRmlsbC5ub2RlLndpZHRoID0gd2lkdGg7XG5cbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8PSB0aGlzLl9kYXRhLmxldmVsOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuaW1nQmFyW2ldLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEludml0YXRpb25JbmZvKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkludml0YXRpb25Db2RlQ29udGVudC5zdHJpbmcgPSB0aGlzLl91c2VyRGF0YS5leHRlbmRDb2RlO1xuICAgICAgICB0aGlzLmxhYkludml0YXRpb25VcmxDb250ZW50LnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKHRoaXMuZ2V0SW52aXRhdGlvblVSTCgpLCAzNSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoU3RhdExhc3REYXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5sYWJVcGRhdGVEYXRlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoW1wiUHJvbW90aW9uLmxhYlVwZGF0ZURhdGVcIiwgRGF0ZVV0aWxzLmdldFlNRCh0aGlzLl9kYXRhLnByb21vdGlvbkRhdGFJbmZvLmxhc3RVcGRhdGVUaW1lLCBcIi1cIildKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFN0YXRJbmZvKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYlRvdGFsR29sZENvbnRlbnQubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShbXCJQcm9tb3Rpb24uUnBHb2xkXCIsIE51bWJlclV0aWxzLmNvbnZlclRvQyh0aGlzLl9kYXRhLnByb21vdGlvbkRhdGFJbmZvLnRvdGFsSW5jb21lR29sZCldKTtcbiAgICAgICAgdGhpcy5sYWJXaXRoZHJhd0dvbGRDb250ZW50Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoW1wiUHJvbW90aW9uLlJwR29sZFwiLCBOdW1iZXJVdGlscy5jb252ZXJUb0ModGhpcy5fZGF0YS5wcm9tb3Rpb25EYXRhSW5mby50b3RhbFdpdGhkcmF3R29sZCldKTtcbiAgICAgICAgdGhpcy5sYWJZZXN0ZXJkYXlHb2xkQ29udGVudC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcIlByb21vdGlvbi5ScEdvbGRcIiwgTnVtYmVyVXRpbHMuY29udmVyVG9DKHRoaXMuX2RhdGEucHJvbW90aW9uRGF0YUluZm8uYXllckluY29tZUdvbGQpXSk7XG4gICAgICAgIHRoaXMubGFiWWVzdGVyZGF5SW52aXRhdGlvbkNvbnRlbnQubGFuZ3VhZ2UgPSB0aGlzLl9kYXRhLnByb21vdGlvbkRhdGFJbmZvLmF5ZXJJbnZpdGF0aW9uQ291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5sYWJBbGxJbnZpdGF0aW9uQ29udGVudC5zdHJpbmcgPSB0aGlzLl9kYXRhLnByb21vdGlvbkRhdGFJbmZvLnRvdGFsSW52aXRhdGlvbkNvdW50LnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXRMYXN0RGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFJhbmsoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubHN2UmFuay5zZXQodGhpcy5nZXRSYW5rUGxheWVyTGlzdCgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hJbmNvbWVHcmFwaCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGxhdERhdGU6IGNjLkxheW91dCA9IHRoaXMubm9kR29sZEdyYXBoLmdldENoaWxkQnlOYW1lKFwibGF0RGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGxhdERhdGUubm9kZS5jaGlsZHJlbkNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBidG5JbnZpdGF0aW9uOiBjYy5CdXR0b24gPSBsYXREYXRlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYGJ0bkdyYXBoJHtpfWApLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgbGV0IGxhYkRhdGU6IGNjLkxhYmVsID0gYnRuSW52aXRhdGlvbi5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiRGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgbGFiRGF0ZS5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0RGF5QmVmb3JlQWZ0ZXIodGhpcy5fYXBwRGF0YS5nZXRDbGllbnRUaW1lc3RhbXAoKSwgLShsYXREYXRlLm5vZGUuY2hpbGRyZW5Db3VudCAtIChpICsgMSkpLCBcIk1NLmRkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3SW5jb21lTGluZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEludml0YXRpb25HcmFwaCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGxhdERhdGU6IGNjLkxheW91dCA9IHRoaXMubm9kSW52aXRhdGlvbkdyYXBoLmdldENoaWxkQnlOYW1lKFwibGF0RGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGxhdERhdGUubm9kZS5jaGlsZHJlbkNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBidG5JbnZpdGF0aW9uOiBjYy5CdXR0b24gPSBsYXREYXRlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYGJ0bkdyYXBoJHtpfWApLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgbGV0IGxhYkRhdGU6IGNjLkxhYmVsID0gYnRuSW52aXRhdGlvbi5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiRGF0ZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgbGFiRGF0ZS5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0RGF5QmVmb3JlQWZ0ZXIodGhpcy5fYXBwRGF0YS5nZXRDbGllbnRUaW1lc3RhbXAoKSwgLShsYXREYXRlLm5vZGUuY2hpbGRyZW5Db3VudCAtIChpICsgMSkpLCBcIk1NLmRkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3VmFsaWRDb3VudExpbmUoKTtcbiAgICAgICAgdGhpcy5kcmF3UmVnaXN0ZXJDb3VudExpbmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEludml0YXRpb25VUkwoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIGAke3VybH0/aW52Y29kZT0ke3RoaXMuX3VzZXJEYXRhLmV4dGVuZENvZGV9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmtQbGF5ZXJMaXN0KCk6IFByb21vdGlvbkludGVyZmFjZS5QbGF5ZXJCcm9rZXJhZ2VSYW5rW10ge1xuICAgICAgICBsZXQgbGlzdDogUHJvbW90aW9uSW50ZXJmYWNlLlBsYXllckJyb2tlcmFnZVJhbmtbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGEucHJvbW90aW9uUmFua0luZm8ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBwbGF5ZXJCcm9rZXJhZ2VSYW5rOiBQcm9tb3Rpb25JbnRlcmZhY2UuUGxheWVyQnJva2VyYWdlUmFuayA9IHtcbiAgICAgICAgICAgICAgICByYW5rOiBpICsgMSxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLl9kYXRhLnByb21vdGlvblJhbmtJbmZvW2ldLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdFtpXSA9IHBsYXllckJyb2tlcmFnZVJhbms7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0ludml0YXRpb25HcmFwaCgpOiB2b2lkIHtcblxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjbGlja0luZGljYXRvcih0YXJnZXROb2RlOiBjYy5Ob2RlKTogdm9pZCB7XG4gICAgICAgIGxldCB3b3JsZFBvczogY2MuVmVjMiA9IHRhcmdldE5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcbiAgICAgICAgbGV0IGxvY2FsUG9zOiBjYy5WZWMyID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcblxuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogSW5kaWNhdG9yVmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSwgYXJnczogW2xvY2FsUG9zLCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5wcm9tb3Rpb25VcGRhdGVEYXRlVGlwc1wiKSwgNDAwLCBDb21tb25EZWZpbmUuRGlyZWN0aW9uLlVQXSB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhCdXR0b25OYW1lOiBhbnksIEJ1dHRvbk5vZGU6IGFueSwgZGF0YT86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKEJ1dHRvbk5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5JbnZpdGF0aW9uQ29kZUNvcHlcIjpcbiAgICAgICAgICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmNvcHlUb0NsaXAodGhpcy5sYWJJbnZpdGF0aW9uQ29kZUNvbnRlbnQuc3RyaW5nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5JbnZpdGF0aW9uVXJsQ29weVwiOlxuICAgICAgICAgICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcCh0aGlzLmdldEludml0YXRpb25VUkwoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuSW52aXRhdGlvbjBcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5JbnZpdGF0aW9uMVwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bkludml0YXRpb24yXCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuSW52aXRhdGlvbjNcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5JbnZpdGF0aW9uNFwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bkludml0YXRpb241XCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuSW52aXRhdGlvbjZcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSW52aXRhdGlvbkdyYXBoKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuVXBkYXRlRGF0ZVRpcHNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSW5kaWNhdG9yKEJ1dHRvbk5vZGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkNsb3NlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBcnJheU1heFZhbHVlKGFycjogKG51bWJlciB8IExvbmcpW10pOiBudW1iZXIge1xuICAgICAgICBsZXQgbWF4VmFsdWU6IG51bWJlciA9IDA7XG4gICAgICAgIGZvciAobGV0IHYgb2YgYXJyKSB7XG4gICAgICAgICAgICBsZXQgbnVtVmFsdWU6IG51bWJlciA9IE51bWJlcih2KTtcbiAgICAgICAgICAgIG1heFZhbHVlID0gTWF0aC5tYXgobnVtVmFsdWUsIG1heFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4VmFsdWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDor7fmsYLmjqjlub/kv6Hmga9cbiAgICAgKi9cbiAgICBwcml2YXRlIEMyU19Qcm9tb3Rpb25JbmZvKCk6IHZvaWQge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19Qcm9tb3Rpb25JbmZvLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfUHJvbW90aW9uSW5mby5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19Qcm9tb3Rpb25JbmZvLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJTX1Byb21vdGlvbkluZm8sIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0ZXN0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5fZGF0YS5pbmNvbWVMaXN0ID0gW107XG4gICAgICAgIC8vIHRoaXMuX2RhdGEuaW5jb21lTGlzdFswXSA9IDEwMDAwMDtcbiAgICAgICAgLy8gdGhpcy5fZGF0YS5pbmNvbWVMaXN0WzFdID0gNDg4OTk7XG4gICAgICAgIC8vIHRoaXMuX2RhdGEuaW5jb21lTGlzdFsyXSA9IDU1MzQ0MTM7XG4gICAgICAgIC8vIHRoaXMuX2RhdGEuaW5jb21lTGlzdFszXSA9IDQ0MzUzNztcbiAgICAgICAgLy8gdGhpcy5fZGF0YS5pbmNvbWVMaXN0WzRdID0gMTIxMDE0O1xuICAgICAgICAvLyB0aGlzLl9kYXRhLmluY29tZUxpc3RbNV0gPSA2NTEwNjA2O1xuICAgICAgICAvLyB0aGlzLl9kYXRhLmluY29tZUxpc3RbNl0gPSA2NTQ2NDtcblxuICAgICAgICB0aGlzLl9kYXRhLnJlZ2lzdGVyQ291bnRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuX2RhdGEucmVnaXN0ZXJDb3VudExpc3RbMF0gPSAwO1xuICAgICAgICB0aGlzLl9kYXRhLnJlZ2lzdGVyQ291bnRMaXN0WzFdID0gMTtcbiAgICAgICAgdGhpcy5fZGF0YS5yZWdpc3RlckNvdW50TGlzdFsyXSA9IDI7XG4gICAgICAgIHRoaXMuX2RhdGEucmVnaXN0ZXJDb3VudExpc3RbM10gPSAwO1xuICAgICAgICB0aGlzLl9kYXRhLnJlZ2lzdGVyQ291bnRMaXN0WzRdID0gMDtcbiAgICAgICAgdGhpcy5fZGF0YS5yZWdpc3RlckNvdW50TGlzdFs1XSA9IDA7XG4gICAgICAgIHRoaXMuX2RhdGEucmVnaXN0ZXJDb3VudExpc3RbNl0gPSAwO1xuXG4gICAgICAgIHRoaXMuX2RhdGEudmFsaWRDb3VudExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fZGF0YS52YWxpZENvdW50TGlzdFswXSA9IDA7XG4gICAgICAgIHRoaXMuX2RhdGEudmFsaWRDb3VudExpc3RbMV0gPSAwO1xuICAgICAgICB0aGlzLl9kYXRhLnZhbGlkQ291bnRMaXN0WzJdID0gMDtcbiAgICAgICAgdGhpcy5fZGF0YS52YWxpZENvdW50TGlzdFszXSA9IDA7XG4gICAgICAgIHRoaXMuX2RhdGEudmFsaWRDb3VudExpc3RbNF0gPSAxO1xuICAgICAgICB0aGlzLl9kYXRhLnZhbGlkQ291bnRMaXN0WzVdID0gMDtcbiAgICAgICAgdGhpcy5fZGF0YS52YWxpZENvdW50TGlzdFs2XSA9IDA7XG5cbiAgICAgICAgdGhpcy5fZGF0YS5sZXZlbCA9IDE7XG4gICAgICAgIHRoaXMuX2RhdGEubGV2ZWxQZXJjZW50ID0gNDU7XG5cbiAgICAgICAgdGhpcy5fZGF0YS5wcm9tb3Rpb25EYXRhSW5mby50b3RhbEluY29tZUdvbGQgPSAxO1xuICAgICAgICB0aGlzLl9kYXRhLnByb21vdGlvbkRhdGFJbmZvLnRvdGFsV2l0aGRyYXdHb2xkID0gMjtcbiAgICAgICAgdGhpcy5fZGF0YS5wcm9tb3Rpb25EYXRhSW5mby5heWVySW5jb21lR29sZCA9IDM7XG4gICAgICAgIHRoaXMuX2RhdGEucHJvbW90aW9uRGF0YUluZm8uYXllckludml0YXRpb25Db3VudCA9IDQ7XG4gICAgICAgIHRoaXMuX2RhdGEucHJvbW90aW9uRGF0YUluZm8udG90YWxJbnZpdGF0aW9uQ291bnQgPSA1O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWTjeW6lOaOqOW5v+S/oeaBr1xuICAgICAqL1xuICAgIHByaXZhdGUgb25FdmVudF9TMkNfUHJvbW90aW9uSW5mbyhkYXRhOiBNU1QuSVMyQ19Qcm9tb3Rpb25JbmZvKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuXG4gICAgICAgIC8vIHRoaXMudGVzdERhdGEoKTtcblxuICAgICAgICB0aGlzLl9tYXhJbmNvbWVHb2xkID0gdGhpcy5nZXRBcnJheU1heFZhbHVlKHRoaXMuX2RhdGEuaW5jb21lTGlzdCk7XG4gICAgICAgIHRoaXMuX21heFJlZ2lzdGVyQ291bnQgPSB0aGlzLmdldEFycmF5TWF4VmFsdWUodGhpcy5fZGF0YS5yZWdpc3RlckNvdW50TGlzdCk7XG4gICAgICAgIHRoaXMuX21heFZhbGlkQ291bnQgPSB0aGlzLmdldEFycmF5TWF4VmFsdWUodGhpcy5fZGF0YS52YWxpZENvdW50TGlzdCk7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoTGV2ZWwoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoSW52aXRhdGlvbkluZm8oKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoU3RhdEluZm8oKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUmFuaygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hJbmNvbWVHcmFwaCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hJbnZpdGF0aW9uR3JhcGgoKTtcbiAgICB9XG5cbn1cbiJdfQ==