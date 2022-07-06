"use strict";
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