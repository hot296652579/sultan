"use strict";
cc._RF.push(module, '610614xUANPO5em0TyoTgKR', 'PromotionUnView');
// script/promotion/PromotionUnView.ts

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
const TitleItemPage_1 = __importDefault(require("../common/item/TitleItemPage"));
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const UserData_1 = __importDefault(require("../data/UserData"));
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const protoc_1 = require("../framework/external/protoc");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const PromotionRankListView_1 = __importDefault(require("./PromotionRankListView"));
const PromotionView_1 = __importDefault(require("./PromotionView"));
const { ccclass, property } = cc._decorator;
let PromotionUnView = class PromotionUnView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labCollaborateTitle = null;
        this.labCollaborateContent = null;
        this.labGetInvitationContent = null;
        this.labGotAwardTitle = null;
        this.labLevelContent = null;
        this.labLevelTitle0 = null;
        this.labLevelContent0 = null;
        this.labLevelTitle1 = null;
        this.labLevelContent1 = null;
        this.labLevelTitle2 = null;
        this.labLevelContent2 = null;
        this.labAwardTitle = null;
        this.labAwardContent = null;
        this.labBrokerageTitle = null;
        this.labBrokerageContent = null;
        this.labRankTitle = null;
        this.labLogin0 = null;
        this.labLogin1 = null;
        this.lsvRank = null;
        this.titleItemPage = null;
        // 用户数据
        this._userData = null;
        // 数据
        this._data = null;
    }
    static getPrefabUrl() {
        return "promotion/prefabs/PromotionUnView";
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
    }
    initUI() {
        this.labCollaborateTitle.string = "";
        this.labCollaborateContent.string = "";
        this.labGetInvitationContent.string = "";
        this.labGotAwardTitle.string = "";
        this.labLevelContent.string = "";
        this.labLevelTitle0.string = "";
        this.labLevelContent0.string = "";
        this.labLevelTitle1.string = "";
        this.labLevelContent1.string = "";
        this.labLevelTitle2.string = "";
        this.labLevelContent2.string = "";
        this.labAwardTitle.string = "";
        this.labAwardContent.string = "";
        this.labBrokerageTitle.string = "";
        this.labBrokerageContent.string = "";
        this.labRankTitle.string = "";
        this.labLogin0.string = "";
        this.labLogin1.string = "";
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_S2C_PromotionInfo", this.onEvent_S2C_PromotionInfo);
        this.registerEvent("updateUserInfo", this.onUpdateUserInfo);
    }
    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager_1.Manager.makeLanguage("Promotion.labPageName"));
        this.labCollaborateTitle.language = Manager_1.Manager.makeLanguage("Promotion.labCollaborateTitle");
        this.labCollaborateContent.language = Manager_1.Manager.makeLanguage("Promotion.labCollaborateContent");
        this.labGetInvitationContent.language = Manager_1.Manager.makeLanguage("Promotion.labGetInvitationContent");
        this.labGotAwardTitle.language = Manager_1.Manager.makeLanguage("Promotion.labGotAwardTitle");
        this.labLevelContent.language = Manager_1.Manager.makeLanguage("Promotion.labLevelContent");
        this.labLevelTitle0.language = Manager_1.Manager.makeLanguage("Promotion.labLevelTitle0");
        this.labLevelContent0.language = Manager_1.Manager.makeLanguage("Promotion.labLevelContent0");
        this.labLevelTitle1.language = Manager_1.Manager.makeLanguage("Promotion.labLevelTitle1");
        this.labLevelContent1.language = Manager_1.Manager.makeLanguage("Promotion.labLevelContent1");
        this.labLevelTitle2.language = Manager_1.Manager.makeLanguage("Promotion.labLevelTitle2");
        this.labLevelContent2.language = Manager_1.Manager.makeLanguage("Promotion.labLevelContent2");
        this.labAwardTitle.language = Manager_1.Manager.makeLanguage("Promotion.labAwardTitle");
        this.labAwardContent.language = Manager_1.Manager.makeLanguage("Promotion.labAwardContent");
        this.labBrokerageTitle.language = Manager_1.Manager.makeLanguage("Promotion.labBrokerageTitle");
        this.labBrokerageContent.language = Manager_1.Manager.makeLanguage("Promotion.labBrokerageContent");
        this.labLogin0.language = Manager_1.Manager.makeLanguage("Promotion.labLogin");
        this.labLogin1.language = Manager_1.Manager.makeLanguage("Promotion.labLogin");
        this.labRankTitle.language = Manager_1.Manager.makeLanguage("Promotion.labRankTitle");
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    refreshRank() {
        this.lsvRank.set(this.getRankPlayerList());
    }
    onClick(ButtonName, ButtonNode, data) {
        switch (ButtonName) {
            case "btnLogin":
                Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "btnClose":
                this.close();
                break;
        }
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
    /**
     * 响应推广信息
     */
    onEvent_S2C_PromotionInfo(data) {
        this._data = data;
        this.refreshRank();
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
    onUpdateUserInfo() {
        Manager_1.Manager.uiManager.open({ type: PromotionView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
        this.close();
    }
};
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labCollaborateTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labCollaborateContent", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labGetInvitationContent", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labGotAwardTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelContent", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelTitle0", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelContent0", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelTitle1", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelContent1", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelTitle2", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLevelContent2", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labAwardTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labAwardContent", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labBrokerageTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labBrokerageContent", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labRankTitle", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLogin0", void 0);
__decorate([
    property(cc.Label)
], PromotionUnView.prototype, "labLogin1", void 0);
__decorate([
    property(PromotionRankListView_1.default)
], PromotionUnView.prototype, "lsvRank", void 0);
__decorate([
    property(TitleItemPage_1.default)
], PromotionUnView.prototype, "titleItemPage", void 0);
PromotionUnView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PromotionUnView);
exports.default = PromotionUnView;

cc._RF.pop();