import { Config } from "../common/config/Config";
import { CommonDefine } from "../common/define/CommonDefine";
import TitleItemPage from "../common/item/TitleItemPage";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import NumberUtils from "../common/utils/NumberUtils";
import IndicatorView from "../common/view/IndicatorView";
import AppData from "../data/AppData";
import UserData from "../data/UserData";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import DateUtils from "../framework/extentions/DateUtils";
import { MST } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import { PromotionInterface } from "./PromotionInterface";
import PromotionRankListView from "./PromotionRankListView";

// 最小推广下级收益百分比
const MIN_PROMOTION_INCOME_PERCENT: number = 30;
// 最大推广下级收益百分比
const MAX_PROMOTION_INCOME_PERCENT: number = 50;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class PromotionView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.Label)
    private labLevelTitle: cc.Label = null;

    @property(cc.Sprite)
    private imgFill: cc.Sprite = null;

    @property([cc.Sprite])
    private imgBar: cc.Sprite[] = [];

    @property(cc.Label)
    private labInvitationCodeTitle: cc.Label = null;

    @property(cc.Label)
    private labInvitationCodeContent: cc.Label = null;

    @property(cc.Label)
    private labInvitationUrlTitle: cc.Label = null;

    @property(cc.Label)
    private labInvitationUrlContent: cc.Label = null;

    @property(cc.Label)
    private labStatTitle: cc.Label = null;

    @property(cc.Label)
    private labTotalGoldTitle: cc.Label = null;

    @property(cc.Label)
    private labTotalGoldContent: cc.Label = null;

    @property(cc.Label)
    private labWithdrawGoldTitle: cc.Label = null;

    @property(cc.Label)
    private labWithdrawGoldContent: cc.Label = null;

    @property(cc.Label)
    private labYesterdayGoldTitle: cc.Label = null;

    @property(cc.Label)
    private labYesterdayGoldContent: cc.Label = null;

    @property(cc.Label)
    private labYesterdayInvitationTitle: cc.Label = null;

    @property(cc.Label)
    private labYesterdayInvitationContent: cc.Label = null;

    @property(cc.Label)
    private labAllInvitationTitle: cc.Label = null;

    @property(cc.Label)
    private labAllInvitationContent: cc.Label = null;

    @property(cc.Label)
    private labUpdateDate: cc.Label = null;

    @property(cc.Label)
    private labGoldGraphTitle: cc.Label = null;

    @property(cc.Node)
    private nodGoldGraph: cc.Node = null;

    @property(cc.Graphics)
    private gphIncome: cc.Graphics = null;

    @property(cc.Label)
    private labInvitationGraphTitle: cc.Label = null;

    @property(cc.Node)
    private nodInvitationGraph: cc.Node = null;

    @property(cc.Graphics)
    private gphRegister: cc.Graphics = null;

    @property(cc.Graphics)
    private gphValid: cc.Graphics = null;

    @property(cc.Label)
    private labRankTitle: cc.Label = null;

    @property(PromotionRankListView)
    private lsvRank: PromotionRankListView = null;

    @property(TitleItemPage)
    private titleItemPage: TitleItemPage = null;

    // 用户数据
    private _userData: UserData = null;
    // 应用数据
    private _appData: AppData = null;
    // 数据
    private _data: MST.IS2C_PromotionInfo = null;
    // 原始等级经验宽度
    private _originFillWidth: number = null;
    // 原始邀请人数绘图高度
    private _originInvitationHeight: number = null;
    // 原始推广收入绘图高度
    private _originIncomeHeight: number = null;
    // 7 天最大推广收入
    private _maxIncomeGold: number = null;
    // 7 天最大注册人数
    private _maxRegisterCount: number = null;
    // 7 天最大有效人数
    private _maxValidCount: number = null;

    public static getPrefabUrl() {
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

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
        this._appData = G.DataMgr.get(AppData);
        this._originFillWidth = this.imgFill.node.width;
        this._originInvitationHeight = this.nodInvitationGraph.getChildByName("imgRegisterLine").height;
        this._originIncomeHeight = this.nodGoldGraph.getChildByName("imgGoldLine").height;
    }

    private initUI(): void {
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

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_S2C_PromotionInfo", this.onEvent_S2C_PromotionInfo);

    }

    private onLanguageChange(): void {
        this.titleItemPage.languagePageName(Manager.makeLanguage("Promotion.labPageName"));
        this.labLevelTitle.language = Manager.makeLanguage("Promotion.labLevelTitle");
        this.labInvitationCodeTitle.language = Manager.makeLanguage("Promotion.labInvitationCodeTitle");
        this.labInvitationUrlTitle.language = Manager.makeLanguage("Promotion.labInvitationUrlTitle");
        this.labStatTitle.language = Manager.makeLanguage("Promotion.labStatTitle");
        this.labTotalGoldTitle.language = Manager.makeLanguage("Promotion.labTotalGoldTitle");
        this.labWithdrawGoldTitle.language = Manager.makeLanguage("Promotion.labWithdrawGoldTitle");
        this.labYesterdayGoldTitle.language = Manager.makeLanguage("Promotion.labYesterdayGoldTitle");
        this.labYesterdayInvitationTitle.language = Manager.makeLanguage("Promotion.labYesterdayInvitationTitle");
        this.labAllInvitationTitle.language = Manager.makeLanguage("Promotion.labAllInvitationTitle");
        this.labGoldGraphTitle.language = Manager.makeLanguage("Promotion.labGoldGraphTitle");
        this.labInvitationGraphTitle.language = Manager.makeLanguage("Promotion.labInvitationGraphTitle");
        this.labRankTitle.language = Manager.makeLanguage("Promotion.labRankTitle");

        this.refreshStatLastDate();
    }

    public show(args?: any[]): void {
        super.show(args);

        this.onLanguageChange();
    }

    private drawIncomeLine(): void {
        let latDate: cc.Layout = this.nodGoldGraph.getChildByName("latDate").getComponent(cc.Layout);
        this.gphIncome.clear();
        let targetPos: cc.Vec2 = cc.v2(0, 0);
        for (let i: number = 0; i < this._data.incomeList.length; ++i) {
            let v = this._data.incomeList[i];
            let btnGraph: cc.Button = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let worldPos: cc.Vec2 = btnGraph.node.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos: cc.Vec2 = this.gphIncome.node.parent.convertToNodeSpaceAR(worldPos);
            targetPos.x = localPos.x;
            targetPos.y = this.getDrawLineHeight(this._originIncomeHeight, this._maxIncomeGold, v);
            this.gphIncome.lineTo(targetPos.x, targetPos.y);
            this.gphIncome.stroke();
            this.gphIncome.moveTo(targetPos.x, targetPos.y);
        }
    }

    private drawValidCountLine(): void {
        let latDate: cc.Layout = this.nodInvitationGraph.getChildByName("latDate").getComponent(cc.Layout);
        this.gphValid.clear();
        let targetPos: cc.Vec2 = cc.v2(0, 0);
        for (let i: number = 0; i < this._data.validCountList.length; ++i) {
            let v = this._data.validCountList[i];
            let btnGraph: cc.Button = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let worldPos: cc.Vec2 = btnGraph.node.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos: cc.Vec2 = this.gphValid.node.parent.convertToNodeSpaceAR(worldPos);
            targetPos.x = localPos.x;
            targetPos.y = this.getDrawLineHeight(this._originInvitationHeight, this._maxRegisterCount, v);
            this.gphValid.lineTo(targetPos.x, targetPos.y);
            this.gphValid.stroke();
            this.gphValid.moveTo(targetPos.x, targetPos.y);
        }
    }

    private drawRegisterCountLine(): void {
        let latDate: cc.Layout = this.nodInvitationGraph.getChildByName("latDate").getComponent(cc.Layout);
        this.gphRegister.clear();
        let targetPos: cc.Vec2 = cc.v2(0, 0);
        for (let i: number = 0; i < this._data.registerCountList.length; ++i) {
            let v = this._data.registerCountList[i];
            let btnGraph: cc.Button = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let worldPos: cc.Vec2 = btnGraph.node.convertToWorldSpaceAR(cc.v2(0, 0));
            let localPos: cc.Vec2 = this.gphRegister.node.parent.convertToNodeSpaceAR(worldPos);
            targetPos.x = localPos.x;
            targetPos.y = this.getDrawLineHeight(this._originInvitationHeight, this._maxRegisterCount, v);
            this.gphRegister.lineTo(targetPos.x, targetPos.y);
            this.gphRegister.stroke();
            this.gphRegister.moveTo(targetPos.x, targetPos.y);
        }
    }

    private getDrawLineHeight(maxHeight: number, maxCount: number, currCount: number | Long): number {
        return (Number(currCount) / maxCount) * maxHeight;
    }

    private refreshLevel(): void {
        let maxStepPercent: number = 100 / (Object.values(MST.PromotionLevel).length - 1);
        let percent: number = 0;
        let halfPercent: number = (this._data.levelPercent / 100) * maxStepPercent;
        if (halfPercent > maxStepPercent) {
            halfPercent = maxStepPercent;
        }
        if (this._data.level === MST.PromotionLevel.Level0) {
            percent = halfPercent / 100;
        } else if (this._data.level === MST.PromotionLevel.Level1) {
            percent = (maxStepPercent + halfPercent) / 100;
        } else {
            percent = 1;
        }
        let width: number = percent * this._originFillWidth;
        if (width > this._originFillWidth) {
            width = this._originFillWidth;
        } else if (width < 0) {
            width = 0;
        }
        this.imgFill.node.width = width;

        for (let i: number = 0; i <= this._data.level; ++i) {
            this.imgBar[i].node.active = true;
        }
    }

    private refreshInvitationInfo(): void {
        this.labInvitationCodeContent.string = this._userData.extendCode;
        this.labInvitationUrlContent.string = UtilMgr.setString(this.getInvitationURL(), 35, true);
    }

    private refreshStatLastDate(): void {
        if (this._data) {
            this.labUpdateDate.language = Manager.makeLanguage(["Promotion.labUpdateDate", DateUtils.getYMD(this._data.promotionDataInfo.lastUpdateTime, "-")]);
        }
    }

    private refreshStatInfo(): void {
        this.labTotalGoldContent.language = Manager.makeLanguage(["Promotion.RpGold", NumberUtils.converToC(this._data.promotionDataInfo.totalIncomeGold)]);
        this.labWithdrawGoldContent.language = Manager.makeLanguage(["Promotion.RpGold", NumberUtils.converToC(this._data.promotionDataInfo.totalWithdrawGold)]);
        this.labYesterdayGoldContent.language = Manager.makeLanguage(["Promotion.RpGold", NumberUtils.converToC(this._data.promotionDataInfo.ayerIncomeGold)]);
        this.labYesterdayInvitationContent.language = this._data.promotionDataInfo.ayerInvitationCount.toString();
        this.labAllInvitationContent.string = this._data.promotionDataInfo.totalInvitationCount.toString();
        this.refreshStatLastDate();
    }

    private refreshRank(): void {
        this.lsvRank.set(this.getRankPlayerList());
    }

    private refreshIncomeGraph(): void {
        let latDate: cc.Layout = this.nodGoldGraph.getChildByName("latDate").getComponent(cc.Layout);
        for (let i: number = 0; i < latDate.node.childrenCount; ++i) {
            let btnInvitation: cc.Button = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let labDate: cc.Label = btnInvitation.node.getChildByName("labDate").getComponent(cc.Label);
            labDate.string = DateUtils.getDayBeforeAfter(this._appData.getClientTimestamp(), -(latDate.node.childrenCount - (i + 1)), "MM.dd");
        }

        this.drawIncomeLine();
    }

    private refreshInvitationGraph(): void {
        let latDate: cc.Layout = this.nodInvitationGraph.getChildByName("latDate").getComponent(cc.Layout);
        for (let i: number = 0; i < latDate.node.childrenCount; ++i) {
            let btnInvitation: cc.Button = latDate.node.getChildByName(`btnGraph${i}`).getComponent(cc.Button);
            let labDate: cc.Label = btnInvitation.node.getChildByName("labDate").getComponent(cc.Label);
            labDate.string = DateUtils.getDayBeforeAfter(this._appData.getClientTimestamp(), -(latDate.node.childrenCount - (i + 1)), "MM.dd");
        }

        this.drawValidCountLine();
        this.drawRegisterCountLine();
    }

    private getInvitationURL(): string {
        let url: string = window.location.href.replace(window.location.search, "");
        return `${url}?invcode=${this._userData.extendCode}`;
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

    private clickInvitationGraph(): void {

    }


    private clickIndicator(targetNode: cc.Node): void {
        let worldPos: cc.Vec2 = targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        let localPos: cc.Vec2 = this.node.convertToNodeSpaceAR(worldPos);

        Manager.uiManager.open({ type: IndicatorView, bundle: this.bundle, args: [localPos, Manager.makeLanguage("Promotion.promotionUpdateDateTips"), 400, CommonDefine.Direction.UP] });
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
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

    private getArrayMaxValue(arr: (number | Long)[]): number {
        let maxValue: number = 0;
        for (let v of arr) {
            let numValue: number = Number(v);
            maxValue = Math.max(numValue, maxValue);
        }
        return maxValue
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

    private testData(): void {
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
    private onEvent_S2C_PromotionInfo(data: MST.IS2C_PromotionInfo): void {
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

}
