
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/promotion/PromotionUnView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcHJvbW90aW9uL1Byb21vdGlvblVuVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlGQUF5RDtBQUN6RCx1REFBb0Q7QUFDcEQsNkRBQTBEO0FBRTFELGdFQUF3QztBQUN4Qyx1REFBcUY7QUFFckYsa0VBQWtFO0FBQ2xFLDBEQUF1RDtBQUV2RCx5REFBbUQ7QUFDbkQsb0VBQTRDO0FBQzVDLHlFQUFpRDtBQUVqRCxvRkFBNEQ7QUFDNUQsb0VBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsZ0JBQU07SUFBbkQ7O1FBSVksd0JBQW1CLEdBQWEsSUFBSSxDQUFDO1FBR3JDLDBCQUFxQixHQUFhLElBQUksQ0FBQztRQUd2Qyw0QkFBdUIsR0FBYSxJQUFJLENBQUM7UUFHekMscUJBQWdCLEdBQWEsSUFBSSxDQUFDO1FBR2xDLG9CQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLHFCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyxtQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxxQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFHbEMsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMscUJBQWdCLEdBQWEsSUFBSSxDQUFDO1FBR2xDLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLG9CQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLHNCQUFpQixHQUFhLElBQUksQ0FBQztRQUduQyx3QkFBbUIsR0FBYSxJQUFJLENBQUM7UUFHckMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLFlBQU8sR0FBMEIsSUFBSSxDQUFDO1FBR3RDLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUU1QyxPQUFPO1FBQ0MsY0FBUyxHQUFhLElBQUksQ0FBQztRQUNuQyxLQUFLO1FBQ0csVUFBSyxHQUEyQixJQUFJLENBQUM7SUF3SWpELENBQUM7SUF0SVUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxtQ0FBbUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLE1BQU07UUFDVixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRVMsYUFBYTtRQUNuQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFdEIsSUFBSSxnQ0FBc0IsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZFO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRS9ELENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBTyxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFFaEYsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFZO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLFdBQVc7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxPQUFPLENBQUMsVUFBZSxFQUFFLFVBQWUsRUFBRSxJQUFhO1FBQzFELFFBQVEsVUFBVSxFQUFFO1lBQ2hCLEtBQUssVUFBVTtnQkFDWCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsc0JBQVksRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUI7UUFDckIsSUFBSSxHQUFHLEdBQUcsWUFBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUNuQyxNQUFNLEVBQUUsaUJBQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1NBQzNDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxHQUFHLFlBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEQsMkJBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFHLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVEOztPQUVHO0lBQ0sseUJBQXlCLENBQUMsSUFBNEI7UUFDMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxJQUFJLEdBQTZDLEVBQUUsQ0FBQztRQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxtQkFBbUIsR0FBMkM7Z0JBQzlELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztnQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7YUFDeEMsQ0FBQTtZQUNELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsQ0FBQztTQUNqQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHVCQUFhLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUVKLENBQUE7QUF0TUc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDMEI7QUFHN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4REFDNEI7QUFHL0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnRUFDOEI7QUFHakQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDdUI7QUFHMUM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDc0I7QUFHekM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDcUI7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDdUI7QUFHMUM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDcUI7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDdUI7QUFHMUM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1REFDcUI7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDdUI7QUFHMUM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDb0I7QUFHdkM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDc0I7QUFHekM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDd0I7QUFHM0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0REFDMEI7QUFHN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDbUI7QUFHdEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDZ0I7QUFHbkM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDZ0I7QUFHbkM7SUFEQyxRQUFRLENBQUMsK0JBQXFCLENBQUM7Z0RBQ2M7QUFHOUM7SUFEQyxRQUFRLENBQUMsdUJBQWEsQ0FBQztzREFDb0I7QUE3RDNCLGVBQWU7SUFGbkMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsZUFBZSxDQTBNbkM7a0JBMU1vQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgVGl0bGVJdGVtUGFnZSBmcm9tIFwiLi4vY29tbW9uL2l0ZW0vVGl0bGVJdGVtUGFnZVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL051bWJlclV0aWxzXCI7XG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMsIEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IERhdGVVdGlscyBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVudGlvbnMvRGF0ZVV0aWxzXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IExvZ2luTmV3VmlldyBmcm9tIFwiLi4vbG9naW4vTG9naW5OZXdWaWV3XCI7XG5pbXBvcnQgeyBQcm9tb3Rpb25JbnRlcmZhY2UgfSBmcm9tIFwiLi9Qcm9tb3Rpb25JbnRlcmZhY2VcIjtcbmltcG9ydCBQcm9tb3Rpb25SYW5rTGlzdFZpZXcgZnJvbSBcIi4vUHJvbW90aW9uUmFua0xpc3RWaWV3XCI7XG5pbXBvcnQgUHJvbW90aW9uVmlldyBmcm9tIFwiLi9Qcm9tb3Rpb25WaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9tb3Rpb25VblZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkNvbGxhYm9yYXRlVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkNvbGxhYm9yYXRlQ29udGVudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiR2V0SW52aXRhdGlvbkNvbnRlbnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkdvdEF3YXJkVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkxldmVsQ29udGVudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTGV2ZWxUaXRsZTA6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkxldmVsQ29udGVudDA6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkxldmVsVGl0bGUxOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJMZXZlbENvbnRlbnQxOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJMZXZlbFRpdGxlMjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTGV2ZWxDb250ZW50MjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQXdhcmRUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQXdhcmRDb250ZW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCcm9rZXJhZ2VUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQnJva2VyYWdlQ29udGVudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUmFua1RpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJMb2dpbjA6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkxvZ2luMTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFByb21vdGlvblJhbmtMaXN0VmlldylcbiAgICBwcml2YXRlIGxzdlJhbms6IFByb21vdGlvblJhbmtMaXN0VmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoVGl0bGVJdGVtUGFnZSlcbiAgICBwcml2YXRlIHRpdGxlSXRlbVBhZ2U6IFRpdGxlSXRlbVBhZ2UgPSBudWxsO1xuXG4gICAgLy8g55So5oi35pWw5o2uXG4gICAgcHJpdmF0ZSBfdXNlckRhdGE6IFVzZXJEYXRhID0gbnVsbDtcbiAgICAvLyDmlbDmja5cbiAgICBwcml2YXRlIF9kYXRhOiBNU1QuSVMyQ19Qcm9tb3Rpb25JbmZvID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJwcm9tb3Rpb24vcHJlZmFicy9Qcm9tb3Rpb25VblZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcblxuICAgICAgICB0aGlzLkMyU19Qcm9tb3Rpb25JbmZvKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFVJKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkNvbGxhYm9yYXRlVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJDb2xsYWJvcmF0ZUNvbnRlbnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJHZXRJbnZpdGF0aW9uQ29udGVudC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkdvdEF3YXJkVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJMZXZlbENvbnRlbnQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJMZXZlbFRpdGxlMC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkxldmVsQ29udGVudDAuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJMZXZlbFRpdGxlMS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkxldmVsQ29udGVudDEuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJMZXZlbFRpdGxlMi5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkxldmVsQ29udGVudDIuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJBd2FyZFRpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQXdhcmRDb250ZW50LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQnJva2VyYWdlVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCcm9rZXJhZ2VDb250ZW50LnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiUmFua1RpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiTG9naW4wLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiTG9naW4xLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1MyQ19Qcm9tb3Rpb25JbmZvXCIsIHRoaXMub25FdmVudF9TMkNfUHJvbW90aW9uSW5mbyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcInVwZGF0ZVVzZXJJbmZvXCIsIHRoaXMub25VcGRhdGVVc2VySW5mbylcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25MYW5ndWFnZUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aXRsZUl0ZW1QYWdlLmxhbmd1YWdlUGFnZU5hbWUoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiUGFnZU5hbWVcIikpO1xuICAgICAgICB0aGlzLmxhYkNvbGxhYm9yYXRlVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJDb2xsYWJvcmF0ZVRpdGxlXCIpO1xuICAgICAgICB0aGlzLmxhYkNvbGxhYm9yYXRlQ29udGVudC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkNvbGxhYm9yYXRlQ29udGVudFwiKTtcbiAgICAgICAgdGhpcy5sYWJHZXRJbnZpdGF0aW9uQ29udGVudC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkdldEludml0YXRpb25Db250ZW50XCIpO1xuICAgICAgICB0aGlzLmxhYkdvdEF3YXJkVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJHb3RBd2FyZFRpdGxlXCIpO1xuICAgICAgICB0aGlzLmxhYkxldmVsQ29udGVudC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkxldmVsQ29udGVudFwiKTtcbiAgICAgICAgdGhpcy5sYWJMZXZlbFRpdGxlMC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkxldmVsVGl0bGUwXCIpO1xuICAgICAgICB0aGlzLmxhYkxldmVsQ29udGVudDAubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJMZXZlbENvbnRlbnQwXCIpO1xuICAgICAgICB0aGlzLmxhYkxldmVsVGl0bGUxLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiTGV2ZWxUaXRsZTFcIik7XG4gICAgICAgIHRoaXMubGFiTGV2ZWxDb250ZW50MS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUHJvbW90aW9uLmxhYkxldmVsQ29udGVudDFcIik7XG4gICAgICAgIHRoaXMubGFiTGV2ZWxUaXRsZTIubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJMZXZlbFRpdGxlMlwiKTtcbiAgICAgICAgdGhpcy5sYWJMZXZlbENvbnRlbnQyLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiTGV2ZWxDb250ZW50MlwiKTtcbiAgICAgICAgdGhpcy5sYWJBd2FyZFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiQXdhcmRUaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJBd2FyZENvbnRlbnQubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJBd2FyZENvbnRlbnRcIik7XG4gICAgICAgIHRoaXMubGFiQnJva2VyYWdlVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJCcm9rZXJhZ2VUaXRsZVwiKTtcbiAgICAgICAgdGhpcy5sYWJCcm9rZXJhZ2VDb250ZW50Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJQcm9tb3Rpb24ubGFiQnJva2VyYWdlQ29udGVudFwiKTtcbiAgICAgICAgdGhpcy5sYWJMb2dpbjAubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJMb2dpblwiKTtcbiAgICAgICAgdGhpcy5sYWJMb2dpbjEubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJMb2dpblwiKTtcbiAgICAgICAgdGhpcy5sYWJSYW5rVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlByb21vdGlvbi5sYWJSYW5rVGl0bGVcIik7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdyhhcmdzPzogYW55W10pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcblxuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hSYW5rKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxzdlJhbmsuc2V0KHRoaXMuZ2V0UmFua1BsYXllckxpc3QoKSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogYW55LCBCdXR0b25Ob2RlOiBhbnksIGRhdGE/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuTG9naW5cIjpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDor7fmsYLmjqjlub/kv6Hmga9cbiAgICAgKi9cbiAgICBwcml2YXRlIEMyU19Qcm9tb3Rpb25JbmZvKCk6IHZvaWQge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19Qcm9tb3Rpb25JbmZvLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfUHJvbW90aW9uSW5mby5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19Qcm9tb3Rpb25JbmZvLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJTX1Byb21vdGlvbkluZm8sIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ZON5bqU5o6o5bm/5L+h5oGvXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkV2ZW50X1MyQ19Qcm9tb3Rpb25JbmZvKGRhdGE6IE1TVC5JUzJDX1Byb21vdGlvbkluZm8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMucmVmcmVzaFJhbmsoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJhbmtQbGF5ZXJMaXN0KCk6IFByb21vdGlvbkludGVyZmFjZS5QbGF5ZXJCcm9rZXJhZ2VSYW5rW10ge1xuICAgICAgICBsZXQgbGlzdDogUHJvbW90aW9uSW50ZXJmYWNlLlBsYXllckJyb2tlcmFnZVJhbmtbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGEucHJvbW90aW9uUmFua0luZm8ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBwbGF5ZXJCcm9rZXJhZ2VSYW5rOiBQcm9tb3Rpb25JbnRlcmZhY2UuUGxheWVyQnJva2VyYWdlUmFuayA9IHtcbiAgICAgICAgICAgICAgICByYW5rOiBpICsgMSxcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLl9kYXRhLnByb21vdGlvblJhbmtJbmZvW2ldLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdFtpXSA9IHBsYXllckJyb2tlcmFnZVJhbms7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblVwZGF0ZVVzZXJJbmZvKCk6IHZvaWQge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogUHJvbW90aW9uVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuXG59XG4iXX0=