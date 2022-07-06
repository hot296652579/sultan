import { Config } from "../common/config/Config";
import TitleItemPage from "../common/item/TitleItemPage";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import NumberUtils from "../common/utils/NumberUtils";
import UserData from "../data/UserData";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import DateUtils from "../framework/extentions/DateUtils";
import { MST } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import LoginNewView from "../login/LoginNewView";
import { PromotionInterface } from "./PromotionInterface";
import PromotionRankListView from "./PromotionRankListView";
import PromotionView from "./PromotionView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class PromotionUnView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.Label)
    private labCollaborateTitle: cc.Label = null;

    @property(cc.Label)
    private labCollaborateContent: cc.Label = null;

    @property(cc.Label)
    private labGetInvitationContent: cc.Label = null;

    @property(cc.Label)
    private labGotAwardTitle: cc.Label = null;

    @property(cc.Label)
    private labLevelContent: cc.Label = null;

    @property(cc.Label)
    private labLevelTitle0: cc.Label = null;

    @property(cc.Label)
    private labLevelContent0: cc.Label = null;

    @property(cc.Label)
    private labLevelTitle1: cc.Label = null;

    @property(cc.Label)
    private labLevelContent1: cc.Label = null;

    @property(cc.Label)
    private labLevelTitle2: cc.Label = null;

    @property(cc.Label)
    private labLevelContent2: cc.Label = null;

    @property(cc.Label)
    private labAwardTitle: cc.Label = null;

    @property(cc.Label)
    private labAwardContent: cc.Label = null;

    @property(cc.Label)
    private labBrokerageTitle: cc.Label = null;

    @property(cc.Label)
    private labBrokerageContent: cc.Label = null;

    @property(cc.Label)
    private labRankTitle: cc.Label = null;

    @property(cc.Label)
    private labLogin0: cc.Label = null;

    @property(cc.Label)
    private labLogin1: cc.Label = null;

    @property(PromotionRankListView)
    private lsvRank: PromotionRankListView = null;

    @property(TitleItemPage)
    private titleItemPage: TitleItemPage = null;

    // 用户数据
    private _userData: UserData = null;
    // 数据
    private _data: MST.IS2C_PromotionInfo = null;

    public static getPrefabUrl() {
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

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
    }

    private initUI(): void {
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

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_S2C_PromotionInfo", this.onEvent_S2C_PromotionInfo);
        this.registerEvent("updateUserInfo", this.onUpdateUserInfo)

    }

    private onLanguageChange(): void {
        this.titleItemPage.languagePageName(Manager.makeLanguage("Promotion.labPageName"));
        this.labCollaborateTitle.language = Manager.makeLanguage("Promotion.labCollaborateTitle");
        this.labCollaborateContent.language = Manager.makeLanguage("Promotion.labCollaborateContent");
        this.labGetInvitationContent.language = Manager.makeLanguage("Promotion.labGetInvitationContent");
        this.labGotAwardTitle.language = Manager.makeLanguage("Promotion.labGotAwardTitle");
        this.labLevelContent.language = Manager.makeLanguage("Promotion.labLevelContent");
        this.labLevelTitle0.language = Manager.makeLanguage("Promotion.labLevelTitle0");
        this.labLevelContent0.language = Manager.makeLanguage("Promotion.labLevelContent0");
        this.labLevelTitle1.language = Manager.makeLanguage("Promotion.labLevelTitle1");
        this.labLevelContent1.language = Manager.makeLanguage("Promotion.labLevelContent1");
        this.labLevelTitle2.language = Manager.makeLanguage("Promotion.labLevelTitle2");
        this.labLevelContent2.language = Manager.makeLanguage("Promotion.labLevelContent2");
        this.labAwardTitle.language = Manager.makeLanguage("Promotion.labAwardTitle");
        this.labAwardContent.language = Manager.makeLanguage("Promotion.labAwardContent");
        this.labBrokerageTitle.language = Manager.makeLanguage("Promotion.labBrokerageTitle");
        this.labBrokerageContent.language = Manager.makeLanguage("Promotion.labBrokerageContent");
        this.labLogin0.language = Manager.makeLanguage("Promotion.labLogin");
        this.labLogin1.language = Manager.makeLanguage("Promotion.labLogin");
        this.labRankTitle.language = Manager.makeLanguage("Promotion.labRankTitle");

    }

    public show(args?: any[]): void {
        super.show(args);

        this.onLanguageChange();
    }

    private refreshRank(): void {
        this.lsvRank.set(this.getRankPlayerList());
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
        switch (ButtonName) {
            case "btnLogin":
                Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
                break;
            case "btnClose":
                this.close();
                break;
        }
    }

    /**
     * 请求推广信息
     */
    private C2S_PromotionInfo(): void {
        let req = MST.C2S_PromotionInfo.create({
            serial: Manager.netManager.getNewSeqId(),
        });
        let buffer = MST.C2S_PromotionInfo.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_PromotionInfo, MST.OuterOpcode_Lobby.C2S_PromotionInfo, buffer);
    }

    /**
     * 响应推广信息
     */
    private onEvent_S2C_PromotionInfo(data: MST.IS2C_PromotionInfo): void {
        this._data = data;
        this.refreshRank();
    }

    private getRankPlayerList(): PromotionInterface.PlayerBrokerageRank[] {
        let list: PromotionInterface.PlayerBrokerageRank[] = [];
        for (let i = 0; i < this._data.promotionRankInfo.length; ++i) {
            let playerBrokerageRank: PromotionInterface.PlayerBrokerageRank = {
                rank: i + 1,
                data: this._data.promotionRankInfo[i],
            }
            list[i] = playerBrokerageRank;
        }
        return list;
    }

    private onUpdateUserInfo(): void {
        Manager.uiManager.open({ type: PromotionView, bundle: BUNDLE_RESOURCES });
        this.close();
    }

}
