
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '453618KXphPXKtmWnFztofy', 'HallLogic');
// script/hall/HallLogic.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../common/base/Logic");
const LogicEvent_1 = require("../common/event/LogicEvent");
const Defines_1 = require("../framework/base/Defines");
const Manager_1 = require("../common/manager/Manager");
const RollNotice_1 = require("../notice/RollNotice");
const Setting_1 = __importDefault(require("../setting/Setting"));
const UserInfo_1 = __importDefault(require("../userInfo/UserInfo"));
const ServiceView_1 = __importDefault(require("../service/ServiceView"));
const RechargeView_1 = __importDefault(require("../recharge/RechargeView"));
const WithdrawalView_1 = __importDefault(require("../withdrawal/WithdrawalView"));
const ShareView_1 = __importDefault(require("../share/ShareView"));
const PiggyBankView_1 = __importDefault(require("../piggyBank/PiggyBankView"));
const PBSettingPasswdView_1 = __importDefault(require("../piggyBank/PBSettingPasswdView"));
const SecondaryPwdView_1 = __importDefault(require("../withdrawal/SecondaryPwdView"));
const SetSecondaryPwdView_1 = __importDefault(require("../withdrawal/SetSecondaryPwdView"));
const LanguageChange_1 = __importDefault(require("../common/language/LanguageChange"));
const EnterRealFieldNotiPanel_1 = __importDefault(require("../MultiCurrency/EnterRealFieldNotiPanel"));
const GiveGoldNotiPanel_1 = __importDefault(require("../MultiCurrency/GiveGoldNotiPanel"));
const HintRechargePanel_1 = __importDefault(require("../MultiCurrency/HintRechargePanel"));
const LeaderBoardView_1 = __importDefault(require("../rank/LeaderBoardView"));
const BannerView_1 = __importDefault(require("../banner/BannerView"));
const WelfareCenterView_1 = __importDefault(require("../WelfareCenter/WelfareCenterView"));
const HallNewView_1 = __importDefault(require("./HallNewView"));
const SigninNew_1 = __importDefault(require("../signin/SigninNew"));
const MinigameView_1 = __importDefault(require("../minigame/MinigameView"));
class HallLogic extends Logic_1.Logic {
    constructor() {
        super(...arguments);
        this.logicType = LogicEvent_1.LogicType.HALL;
    }
    get bundle() {
        return Defines_1.BUNDLE_RESOURCES;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_HALL, this.onEnterHall);
        this.registerEvent("rollNotice", this.onRollNotice);
        this.registerEvent("openSetting", this.onOpenSetting);
        this.registerEvent("openUserInfo", this.onOpenUserInfo);
        this.registerEvent("openService", this.onOpenService);
        this.registerEvent("openShareView", this.onOpenShareView);
        this.registerEvent("openRankView", this.onOpenRankView);
        this.registerEvent("openRechargeView", this.onOpenRechargeView);
        this.registerEvent("openWithdrawalView", this.onOpenWithdrawalView);
        this.registerEvent("openPiggyBankView", this.onOpenPiggyBankView);
        this.registerEvent("openPBSettingPasswdView", this.onOpenPBSettingPasswdView);
        this.registerEvent("openSetSecondaryPwdView", this.onOpenSetSecondaryPwdView);
        this.registerEvent("openSecondaryPwdView", this.onOpenSecondaryPwdView);
        this.registerEvent("openLanguageChangeView", this.onOpenLanguageChangeView);
        this.registerEvent("openEnterRealFieldNoti", this.toEnterRealFieldNotiPanel);
        this.registerEvent("openGiveGoldNoti", this.toGiveGoldNotiPanel);
        this.registerEvent("openHintRecharge", this.toHintRechargePanel);
        this.registerEvent("openBanner", this.openBannerPanel);
        this.registerEvent("openWelfareCenterView", this.openWelfareCenterView);
        this.registerEvent("openSigninView", this.openSigninView);
        this.registerEvent("openMinigameView", this.openMinigameView);
    }
    onLoad() {
        super.onLoad();
        // this.onEnterHall();
    }
    openWelfareCenterView() {
        Manager_1.Manager.uiManager.open({ type: WelfareCenterView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    openBannerPanel(data) {
        if (data) {
            Manager_1.Manager.uiManager.open({ type: BannerView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
        }
    }
    onOpenLanguageChangeView() {
        Manager_1.Manager.uiManager.open({ type: LanguageChange_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onRollNotice(data) {
        G.Logger.log(data);
        if (data) {
            RollNotice_1.RollNoticeLogic.addContent(data.content);
        }
    }
    openSigninView() {
        Manager_1.Manager.uiManager.open({ type: SigninNew_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    openMinigameView() {
        Manager_1.Manager.uiManager.open({ type: MinigameView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onEnterHall(data) {
        Manager_1.Manager.uiManager.open({ type: HallNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: data });
    }
    onOpenSetting() {
        Manager_1.Manager.uiManager.open({ type: Setting_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenUserInfo() {
        Manager_1.Manager.uiManager.open({ type: UserInfo_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenService(data) {
        Manager_1.Manager.uiManager.open({ type: ServiceView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
    }
    onOpenShareView() {
        Manager_1.Manager.uiManager.open({ type: ShareView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenRankView() {
        Manager_1.Manager.uiManager.open({ type: LeaderBoardView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenRechargeView() {
        Manager_1.Manager.uiManager.open({ type: RechargeView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenWithdrawalView() {
        Manager_1.Manager.uiManager.open({ type: WithdrawalView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenPiggyBankView(data) {
        Manager_1.Manager.uiManager.open({ type: PiggyBankView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: data });
    }
    onOpenPBSettingPasswdView(data) {
        Manager_1.Manager.uiManager.open({ type: PBSettingPasswdView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: data });
    }
    onOpenSetSecondaryPwdView(data) {
        Manager_1.Manager.uiManager.open({ type: SetSecondaryPwdView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
    }
    onOpenSecondaryPwdView(data) {
        Manager_1.Manager.uiManager.open({ type: SecondaryPwdView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
    }
    toEnterRealFieldNotiPanel(data) {
        Manager_1.Manager.uiManager.open({ type: EnterRealFieldNotiPanel_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
    }
    toGiveGoldNotiPanel(data) {
        Manager_1.Manager.uiManager.open({ type: GiveGoldNotiPanel_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
    }
    toHintRechargePanel(data) {
        Manager_1.Manager.uiManager.open({ type: HintRechargePanel_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: 1, args: [data] });
    }
}
Manager_1.Manager.logicManager.push(HallLogic);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsTG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNkM7QUFDN0MsMkRBQW1FO0FBQ25FLHVEQUE2RDtBQUM3RCx1REFBb0Q7QUFDcEQscURBQXVEO0FBQ3ZELGlFQUF5QztBQUN6QyxvRUFBNEM7QUFDNUMseUVBQWlEO0FBRWpELDRFQUFvRDtBQUNwRCxrRkFBMEQ7QUFDMUQsbUVBQTJDO0FBQzNDLCtFQUF1RDtBQUN2RCwyRkFBbUU7QUFDbkUsc0ZBQThEO0FBQzlELDRGQUFvRTtBQUNwRSx1RkFBK0Q7QUFDL0QsdUdBQStFO0FBQy9FLDJGQUFtRTtBQUNuRSwyRkFBbUU7QUFDbkUsOEVBQXNEO0FBQ3RELHNFQUE4QztBQUM5QywyRkFBbUU7QUFHbkUsZ0VBQXdDO0FBQ3hDLG9FQUE0QztBQUM1Qyw0RUFBb0Q7QUFFcEQsTUFBTSxTQUFVLFNBQVEsYUFBSztJQUE3Qjs7UUFFSSxjQUFTLEdBQWMsc0JBQVMsQ0FBQyxJQUFJLENBQUM7SUE2RzFDLENBQUM7SUEzR0csSUFBSSxNQUFNO1FBQ04sT0FBTywwQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFB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RSxJQUFJLEVBQUUsaUNBQXVCLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBQ08sbUJBQW1CLENBQUMsSUFBSTtRQUM1QixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMkJBQWlCLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBQ0QsbUJBQW1CLENBQUMsSUFBSTtRQUNwQixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsMkJBQWlCLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLENBQUM7Q0FFSjtBQUVELGlCQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2ljIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0xvZ2ljXCI7XG5pbXBvcnQgeyBMb2dpY1R5cGUsIExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBSb2xsTm90aWNlTG9naWMgfSBmcm9tIFwiLi4vbm90aWNlL1JvbGxOb3RpY2VcIjtcbmltcG9ydCBTZXR0aW5nIGZyb20gXCIuLi9zZXR0aW5nL1NldHRpbmdcIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vdXNlckluZm8vVXNlckluZm9cIjtcbmltcG9ydCBTZXJ2aWNlVmlldyBmcm9tIFwiLi4vc2VydmljZS9TZXJ2aWNlVmlld1wiO1xuaW1wb3J0IFJhbmtWaWV3IGZyb20gXCIuLi9yYW5rL1JhbmtWaWV3XCI7XG5pbXBvcnQgUmVjaGFyZ2VWaWV3IGZyb20gXCIuLi9yZWNoYXJnZS9SZWNoYXJnZVZpZXdcIjtcbmltcG9ydCBXaXRoZHJhd2FsVmlldyBmcm9tIFwiLi4vd2l0aGRyYXdhbC9XaXRoZHJhd2FsVmlld1wiO1xuaW1wb3J0IFNoYXJlVmlldyBmcm9tIFwiLi4vc2hhcmUvU2hhcmVWaWV3XCI7XG5pbXBvcnQgUGlnZ3lCYW5rVmlldyBmcm9tIFwiLi4vcGlnZ3lCYW5rL1BpZ2d5QmFua1ZpZXdcIjtcbmltcG9ydCBQQlNldHRpbmdQYXNzd2RWaWV3IGZyb20gXCIuLi9waWdneUJhbmsvUEJTZXR0aW5nUGFzc3dkVmlld1wiO1xuaW1wb3J0IFNlY29uZGFyeVB3ZFZpZXcgZnJvbSBcIi4uL3dpdGhkcmF3YWwvU2Vjb25kYXJ5UHdkVmlld1wiO1xuaW1wb3J0IFNldFNlY29uZGFyeVB3ZFZpZXcgZnJvbSBcIi4uL3dpdGhkcmF3YWwvU2V0U2Vjb25kYXJ5UHdkVmlld1wiO1xuaW1wb3J0IExhbmd1YWdlQ2hhbmdlIGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VDaGFuZ2VcIjtcbmltcG9ydCBFbnRlclJlYWxGaWVsZE5vdGlQYW5lbCBmcm9tIFwiLi4vTXVsdGlDdXJyZW5jeS9FbnRlclJlYWxGaWVsZE5vdGlQYW5lbFwiO1xuaW1wb3J0IEdpdmVHb2xkTm90aVBhbmVsIGZyb20gXCIuLi9NdWx0aUN1cnJlbmN5L0dpdmVHb2xkTm90aVBhbmVsXCI7XG5pbXBvcnQgSGludFJlY2hhcmdlUGFuZWwgZnJvbSBcIi4uL011bHRpQ3VycmVuY3kvSGludFJlY2hhcmdlUGFuZWxcIjtcbmltcG9ydCBMZWFkZXJCb2FyZFZpZXcgZnJvbSBcIi4uL3JhbmsvTGVhZGVyQm9hcmRWaWV3XCI7XG5pbXBvcnQgQmFubmVyVmlldyBmcm9tIFwiLi4vYmFubmVyL0Jhbm5lclZpZXdcIjtcbmltcG9ydCBXZWxmYXJlQ2VudGVyVmlldyBmcm9tIFwiLi4vV2VsZmFyZUNlbnRlci9XZWxmYXJlQ2VudGVyVmlld1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgSGFsbE5ld1ZpZXcgZnJvbSBcIi4vSGFsbE5ld1ZpZXdcIjtcbmltcG9ydCBTaWduaW5OZXcgZnJvbSBcIi4uL3NpZ25pbi9TaWduaW5OZXdcIjtcbmltcG9ydCBNaW5pZ2FtZVZpZXcgZnJvbSBcIi4uL21pbmlnYW1lL01pbmlnYW1lVmlld1wiO1xuXG5jbGFzcyBIYWxsTG9naWMgZXh0ZW5kcyBMb2dpYyB7XG5cbiAgICBsb2dpY1R5cGU6IExvZ2ljVHlwZSA9IExvZ2ljVHlwZS5IQUxMO1xuXG4gICAgZ2V0IGJ1bmRsZSgpIHtcbiAgICAgICAgcmV0dXJuIEJVTkRMRV9SRVNPVVJDRVM7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoTG9naWNFdmVudC5FTlRFUl9IQUxMLCB0aGlzLm9uRW50ZXJIYWxsKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwicm9sbE5vdGljZVwiLCB0aGlzLm9uUm9sbE5vdGljZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5TZXR0aW5nXCIsIHRoaXMub25PcGVuU2V0dGluZyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5Vc2VySW5mb1wiLCB0aGlzLm9uT3BlblVzZXJJbmZvKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblNlcnZpY2VcIiwgdGhpcy5vbk9wZW5TZXJ2aWNlKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblNoYXJlVmlld1wiLCB0aGlzLm9uT3BlblNoYXJlVmlldyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5SYW5rVmlld1wiLCB0aGlzLm9uT3BlblJhbmtWaWV3KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblJlY2hhcmdlVmlld1wiLCB0aGlzLm9uT3BlblJlY2hhcmdlVmlldyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5XaXRoZHJhd2FsVmlld1wiLCB0aGlzLm9uT3BlbldpdGhkcmF3YWxWaWV3KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblBpZ2d5QmFua1ZpZXdcIiwgdGhpcy5vbk9wZW5QaWdneUJhbmtWaWV3KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblBCU2V0dGluZ1Bhc3N3ZFZpZXdcIiwgdGhpcy5vbk9wZW5QQlNldHRpbmdQYXNzd2RWaWV3KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblNldFNlY29uZGFyeVB3ZFZpZXdcIiwgdGhpcy5vbk9wZW5TZXRTZWNvbmRhcnlQd2RWaWV3KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblNlY29uZGFyeVB3ZFZpZXdcIiwgdGhpcy5vbk9wZW5TZWNvbmRhcnlQd2RWaWV3KTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3Blbkxhbmd1YWdlQ2hhbmdlVmlld1wiLCB0aGlzLm9uT3Blbkxhbmd1YWdlQ2hhbmdlVmlldyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5FbnRlclJlYWxGaWVsZE5vdGlcIiwgdGhpcy50b0VudGVyUmVhbEZpZWxkTm90aVBhbmVsKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJvcGVuR2l2ZUdvbGROb3RpXCIsIHRoaXMudG9HaXZlR29sZE5vdGlQYW5lbClcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlbkhpbnRSZWNoYXJnZVwiLCB0aGlzLnRvSGludFJlY2hhcmdlUGFuZWwpXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5CYW5uZXJcIiwgdGhpcy5vcGVuQmFubmVyUGFuZWwpXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5XZWxmYXJlQ2VudGVyVmlld1wiLCB0aGlzLm9wZW5XZWxmYXJlQ2VudGVyVmlldylcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlblNpZ25pblZpZXdcIiwgdGhpcy5vcGVuU2lnbmluVmlldylcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3Blbk1pbmlnYW1lVmlld1wiLCB0aGlzLm9wZW5NaW5pZ2FtZVZpZXcpXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgLy8gdGhpcy5vbkVudGVySGFsbCgpO1xuICAgIH1cbiAgICBwcml2YXRlIG9wZW5XZWxmYXJlQ2VudGVyVmlldygpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFdlbGZhcmVDZW50ZXJWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb3BlbkJhbm5lclBhbmVsKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBCYW5uZXJWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IFtkYXRhXSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uT3Blbkxhbmd1YWdlQ2hhbmdlVmlldygpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IExhbmd1YWdlQ2hhbmdlLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25Sb2xsTm90aWNlKGRhdGEpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgUm9sbE5vdGljZUxvZ2ljLmFkZENvbnRlbnQoZGF0YS5jb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5TaWduaW5WaWV3KCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogU2lnbmluTmV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgb3Blbk1pbmlnYW1lVmlldygpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IE1pbmlnYW1lVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FbnRlckhhbGwoZGF0YSkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogSGFsbE5ld1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgYXJnczogZGF0YSB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uT3BlblNldHRpbmcoKSB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBTZXR0aW5nLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk9wZW5Vc2VySW5mbygpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFVzZXJJbmZvLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25PcGVuU2VydmljZShkYXRhKSB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBTZXJ2aWNlVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbZGF0YV0gfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25PcGVuU2hhcmVWaWV3KCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogU2hhcmVWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25PcGVuUmFua1ZpZXcoKSB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBMZWFkZXJCb2FyZFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbk9wZW5SZWNoYXJnZVZpZXcoKSB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBSZWNoYXJnZVZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbk9wZW5XaXRoZHJhd2FsVmlldygpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFdpdGhkcmF3YWxWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25PcGVuUGlnZ3lCYW5rVmlldyhkYXRhKTogdm9pZCB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBQaWdneUJhbmtWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IGRhdGEgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25PcGVuUEJTZXR0aW5nUGFzc3dkVmlldyhkYXRhKTogdm9pZCB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBQQlNldHRpbmdQYXNzd2RWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IGRhdGEgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25PcGVuU2V0U2Vjb25kYXJ5UHdkVmlldyhkYXRhKTogdm9pZCB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBTZXRTZWNvbmRhcnlQd2RWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IFtkYXRhXSB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbk9wZW5TZWNvbmRhcnlQd2RWaWV3KGRhdGEpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFNlY29uZGFyeVB3ZFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgYXJnczogW2RhdGFdIH0pO1xuICAgIH1cbiAgICBwcml2YXRlIHRvRW50ZXJSZWFsRmllbGROb3RpUGFuZWwoZGF0YSkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogRW50ZXJSZWFsRmllbGROb3RpUGFuZWwsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgYXJnczogW2RhdGFdIH0pO1xuICAgIH1cbiAgICBwcml2YXRlIHRvR2l2ZUdvbGROb3RpUGFuZWwoZGF0YSkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogR2l2ZUdvbGROb3RpUGFuZWwsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgYXJnczogW2RhdGFdIH0pO1xuICAgIH1cbiAgICB0b0hpbnRSZWNoYXJnZVBhbmVsKGRhdGEpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IEhpbnRSZWNoYXJnZVBhbmVsLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIHpJbmRleDogMSwgYXJnczogW2RhdGFdIH0pO1xuICAgIH1cblxufVxuXG5NYW5hZ2VyLmxvZ2ljTWFuYWdlci5wdXNoKEhhbGxMb2dpYyk7XG4iXX0=