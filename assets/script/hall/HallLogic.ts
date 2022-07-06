import { Logic } from "../common/base/Logic";
import { LogicType, LogicEvent } from "../common/event/LogicEvent";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { Manager } from "../common/manager/Manager";
import { RollNoticeLogic } from "../notice/RollNotice";
import Setting from "../setting/Setting";
import UserInfo from "../userInfo/UserInfo";
import ServiceView from "../service/ServiceView";
import RankView from "../rank/RankView";
import RechargeView from "../recharge/RechargeView";
import WithdrawalView from "../withdrawal/WithdrawalView";
import ShareView from "../share/ShareView";
import PiggyBankView from "../piggyBank/PiggyBankView";
import PBSettingPasswdView from "../piggyBank/PBSettingPasswdView";
import SecondaryPwdView from "../withdrawal/SecondaryPwdView";
import SetSecondaryPwdView from "../withdrawal/SetSecondaryPwdView";
import LanguageChange from "../common/language/LanguageChange";
import EnterRealFieldNotiPanel from "../MultiCurrency/EnterRealFieldNotiPanel";
import GiveGoldNotiPanel from "../MultiCurrency/GiveGoldNotiPanel";
import HintRechargePanel from "../MultiCurrency/HintRechargePanel";
import LeaderBoardView from "../rank/LeaderBoardView";
import BannerView from "../banner/BannerView";
import WelfareCenterView from "../WelfareCenter/WelfareCenterView";
import PanelHelp from "../msgbox/PanelHelp";
import { i18n } from "../common/language/LanguageImpl";
import HallNewView from "./HallNewView";
import SigninNew from "../signin/SigninNew";
import MinigameView from "../minigame/MinigameView";

class HallLogic extends Logic {

    logicType: LogicType = LogicType.HALL;

    get bundle() {
        return BUNDLE_RESOURCES;
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent.ENTER_HALL, this.onEnterHall);
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
        this.registerEvent("openEnterRealFieldNoti", this.toEnterRealFieldNotiPanel)
        this.registerEvent("openGiveGoldNoti", this.toGiveGoldNotiPanel)
        this.registerEvent("openHintRecharge", this.toHintRechargePanel)
        this.registerEvent("openBanner", this.openBannerPanel)
        this.registerEvent("openWelfareCenterView", this.openWelfareCenterView)
        this.registerEvent("openSigninView", this.openSigninView)
        this.registerEvent("openMinigameView", this.openMinigameView)
    }

    onLoad() {
        super.onLoad();
        // this.onEnterHall();
    }
    private openWelfareCenterView() {
        Manager.uiManager.open({ type: WelfareCenterView, bundle: BUNDLE_RESOURCES });
    }
    private openBannerPanel(data) {
        if (data) {
            Manager.uiManager.open({ type: BannerView, bundle: BUNDLE_RESOURCES, args: [data] });
        }
    }
    private onOpenLanguageChangeView() {
        Manager.uiManager.open({ type: LanguageChange, bundle: BUNDLE_RESOURCES });
    }
    private onRollNotice(data) {
        G.Logger.log(data);
        if (data) {
            RollNoticeLogic.addContent(data.content);
        }
    }

    openSigninView() {
        Manager.uiManager.open({ type: SigninNew, bundle: BUNDLE_RESOURCES });
    }

    openMinigameView() {
        Manager.uiManager.open({ type: MinigameView, bundle: BUNDLE_RESOURCES });
    }

    private onEnterHall(data) {
        Manager.uiManager.open({ type: HallNewView, bundle: BUNDLE_RESOURCES, args: data });
    }

    private onOpenSetting() {
        Manager.uiManager.open({ type: Setting, bundle: BUNDLE_RESOURCES });
    }

    private onOpenUserInfo() {
        Manager.uiManager.open({ type: UserInfo, bundle: BUNDLE_RESOURCES });
    }
    private onOpenService(data) {
        Manager.uiManager.open({ type: ServiceView, bundle: BUNDLE_RESOURCES, args: [data] });
    }
    private onOpenShareView() {
        Manager.uiManager.open({ type: ShareView, bundle: BUNDLE_RESOURCES });
    }
    private onOpenRankView() {
        Manager.uiManager.open({ type: LeaderBoardView, bundle: BUNDLE_RESOURCES });
    }
    private onOpenRechargeView() {
        Manager.uiManager.open({ type: RechargeView, bundle: BUNDLE_RESOURCES });
    }
    private onOpenWithdrawalView() {
        Manager.uiManager.open({ type: WithdrawalView, bundle: BUNDLE_RESOURCES });
    }
    private onOpenPiggyBankView(data): void {
        Manager.uiManager.open({ type: PiggyBankView, bundle: BUNDLE_RESOURCES, args: data });
    }
    private onOpenPBSettingPasswdView(data): void {
        Manager.uiManager.open({ type: PBSettingPasswdView, bundle: BUNDLE_RESOURCES, args: data });
    }
    private onOpenSetSecondaryPwdView(data): void {
        Manager.uiManager.open({ type: SetSecondaryPwdView, bundle: BUNDLE_RESOURCES, args: [data] });
    }
    private onOpenSecondaryPwdView(data) {
        Manager.uiManager.open({ type: SecondaryPwdView, bundle: BUNDLE_RESOURCES, args: [data] });
    }
    private toEnterRealFieldNotiPanel(data) {
        Manager.uiManager.open({ type: EnterRealFieldNotiPanel, bundle: BUNDLE_RESOURCES, args: [data] });
    }
    private toGiveGoldNotiPanel(data) {
        Manager.uiManager.open({ type: GiveGoldNotiPanel, bundle: BUNDLE_RESOURCES, args: [data] });
    }
    toHintRechargePanel(data) {
        Manager.uiManager.open({ type: HintRechargePanel, bundle: BUNDLE_RESOURCES, zIndex: 1, args: [data] });
    }

}

Manager.logicManager.push(HallLogic);
