import { dispatchEnterComplete, LogicType, LogicEvent } from "../../../../script/common/event/LogicEvent";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService, makeKey } from "../../../../script/framework/decorator/Decorators";
import UIView from "../../../../script/framework/ui/UIView";
import AppData from "../../../../script/data/AppData";
import WingoNetController from "../protocol/WingoNetController";
import UserData from "../../../../script/data/UserData";
import { Wingo } from "../data/WingoGameData";
import { UtilMgr } from "../../../../script/global/UtilMgr";
import { MST } from "../../../../script/framework/external/protoc";
import { WingoColorDefine } from "../define/WingoColorDefine";
import { Manager } from "../../../../script/common/manager/Manager";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { EventApi } from "../../../../script/framework/event/EventApi";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import { Config } from "../../../../script/common/config/Config";
import TitleItemPageUser from "../../../../script/common/item/TitleItemPageUser";
import WingoData from "../data/WingoData";
import TypeUtils from "../../../../script/common/utils/TypeUtils";
import { WingoConfig } from "../config/WingoConfig";
import { WingoInterface } from "../interface/WingoInterface";
import WingoLinkListView from "../component/WingoLinkListView";
import WingoColorListView from "../component/WingoColorListView";
import { WingoModeDefine } from "../define/WingoModeDefine";
import WingoBetView from "./WingoBetView";
import { WingoEventDefine } from "../define/WingoEventDefine";
import WingoTitleItemPageUser from "./WingoTitleItemPageUser";
import WingoMyRecordListView from "../component/WingoMyRecordListView";
import NoneItem from "../../../../script/common/item/NoneItem";
import ListView from "../../../../script/common/component/ListView";
import { WingoDefine } from "../define/WingoDefine";
import { i18n } from "../../../../script/common/language/LanguageImpl";

// 刷新开奖倒计时间隔时间（单位：毫秒）
const UPDATE_LOTTERY_COUND_DOWN_INTERVAL_TIME: number = 100;
// 倒计时高亮开始时间（单位：秒）
const COUNT_DOWN_HIGHLIGHT_START_TIME: number = 5;
// 禁止下注开始时间（单位：秒）
const BAN_BET_START_TIME: number = 3;
// 每次动画数字球亮暗缩放时间（单位：毫秒）
const NUM_ANIM_SCALE_TIME: number = 200;
// 最后动画数字开奖后停留的时间（单位：毫秒）
const NUM_LAST_ANIM_WAIT_TIME: number = 1800;
// 数字高亮放大缩放
const NUM_HIGHLIGHT_SCALE: number = 1.3;
// 个人记录每页数量
const MY_RECORD_PAGE_COUNT: number = 20;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID: number = -1;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class WingoGameView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Button)
    private btnCepatPlus: cc.Button = null;

    @property(cc.Button)
    private btnCepat: cc.Button = null;

    @property(cc.Button)
    private btnStandar: cc.Button = null;

    @property(cc.Node)
    private nodLotteryTime: cc.Node = null;

    @property(cc.Label)
    private labIssueTitle: cc.Label = null;

    @property(cc.Label)
    private labIssue: cc.Label = null;

    @property(cc.Label)
    private labLotteryCoundDownTitle: cc.Label = null;

    @property(cc.Node)
    private nodPlay: cc.Node = null;

    @property(cc.Label)
    private labBanBetCoundDown: cc.Label = null;

    @property(cc.Sprite)
    private imgPlayBg: cc.Sprite = null;

    @property(cc.Button)
    private btnChartTren: cc.Button = null;

    @property(cc.Button)
    private btnCatatanCepatPlus: cc.Button = null;

    @property(cc.Button)
    private btnCatatanCeppatPlusSaya: cc.Button = null;

    @property(cc.Node)
    private nodChartTren: cc.Node = null;

    @property(cc.Label)
    private labMissing: cc.Label = null;

    @property(cc.Label)
    private labAvgMissing: cc.Label = null;

    @property(cc.Label)
    private labFrequency: cc.Label = null;

    @property(cc.Label)
    private labMaxContinued: cc.Label = null;

    @property(WingoLinkListView)
    private lsvNumRecord: WingoLinkListView = null;

    @property(cc.Node)
    private nodCatatanCepatPlus: cc.Node = null;

    @property(WingoColorListView)
    private lsvColorRecord: WingoColorListView = null;

    @property(cc.Node)
    private nodCatatanCepatPlusSaya: cc.Node = null;

    @property(WingoMyRecordListView)
    private lsvMyRecord: WingoMyRecordListView = null;

    @property(NoneItem)
    private noneItem: NoneItem = null;

    @property(WingoTitleItemPageUser)
    private titleItemPageUser: WingoTitleItemPageUser = null;

    // 游戏数据
    private _wingoData: WingoData = null;
    // 应用数据
    private _appData: AppData = null;
    // 用户数据
    private _userData: UserData = null;
    // 开奖动画
    private _lotteryTween: cc.Tween = null;
    // 高亮动画 Map
    private _highlightTweenMap: Map<number, WingoInterface.HighlightTween> = null;
    // 当前历史选项
    private _currHistoryOption: WingoModeDefine.History = null;
    // 是否最后一页
    private _isLastPage: boolean = false;
    // 个人记录列表
    private _myRecordList: MST.IWingoMyRecordInfo[] = null;

    public static getPrefabUrl() {
        return "prefabs/WingoGameView";
    }

    onLoad() {
        super.onLoad();
        dispatchEnterComplete({ type: LogicType.GAME, views: [this] });
        this.audioHelper.playMusic(Wingo.SOUNDS.BGM, this.bundle);

        this.initData();
        this.initView();
        this.C2M_GetWingoInfo_Req();
        this.selectMode(MST.WingoMode.CepatPlus, true);
        this.selectMode(MST.WingoMode.Cepat, true);
        this.selectMode(MST.WingoMode.Standar, true);
        this.clickRecord(WingoModeDefine.History.ChartTren);
    }

    start() {

    }

    show(args) {
        super.show(args);

        this.onLanguageChange();
    }

    private initData(): void {
        this._wingoData = G.DataMgr.get(WingoData);
        this._appData = G.DataMgr.get(AppData);
        this._userData = G.DataMgr.get(UserData);
        this._highlightTweenMap = new Map();
        this._myRecordList = [];
    }

    private initView(): void {
        this.initLotteryTime();
        this.enableBetOption();
        this.initHistory();
    }

    private initModeOption(parent: cc.Node): void {
        let labTitle: cc.Label = parent.getChildByName("labTitle").getComponent(cc.Label);
        labTitle.node.color = WingoColorDefine.Text.Gray;
        let imgLine: cc.Sprite = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
        imgLine.node.active = false;
        let labTime: cc.Label = parent.getChildByName("labTime").getComponent(cc.Label);
        labTime.node.color = WingoColorDefine.Text.Gray;
        labTime.string = "";
    }

    private enableColorOption(): void {
        for (let v of WingoConfig.ColorOptionList) {
            let btnC: cc.Button = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodMask: cc.Node = btnC.node.getChildByName("imgMask");
            nodMask.active = false
            btnC.interactable = true;
        }
    }

    private enableNumOption(): void {
        for (let v of WingoConfig.NumOptionList) {
            let btnN: cc.Button = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodBar: cc.Node = btnN.node.getChildByName("speBar");
            nodBar.color = WingoColorDefine.BetOption.ENABLE;
            nodBar.scale = 1;
            btnN.interactable = true;
        }
    }

    private enableBetOperate(): void {
        dispatch(WingoEventDefine.WingoStartBet);
    }

    private enableBetOption(): void {
        this.imgPlayBg.node.color = WingoColorDefine.BetOption.ENABLE;
        this.enableColorOption();
        this.enableNumOption();
        this.enableBetOperate();
    }

    private highlightBetOption(): void {

    }

    private darkBetOption(): void {

    }

    private initHistory(): void {
        this.initHistoryOption(this.btnChartTren.node);
        this.initHistoryOption(this.btnCatatanCepatPlus.node);
        this.initHistoryOption(this.btnCatatanCeppatPlusSaya.node);
        this.nodChartTren.active = false;
        this.nodCatatanCepatPlus.active = false;
    }

    private disableColorOption(): void {
        for (let v of WingoConfig.ColorOptionList) {
            let btnC: cc.Button = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodMask: cc.Node = btnC.node.getChildByName("imgMask");
            nodMask.active = true
            btnC.interactable = false;
        }
    }

    private disableNumOption(): void {
        for (let v of WingoConfig.NumOptionList) {
            let btnN: cc.Button = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodBar: cc.Node = btnN.node.getChildByName("speBar");
            nodBar.color = WingoColorDefine.BetOption.DISABLE;
            nodBar.scale = 1;
            btnN.interactable = false;
        }
    }

    private disableBetOperate(): void {

    }

    private disableBetOption(): void {
        dispatch(WingoEventDefine.WingoStopBet);
        this.imgPlayBg.node.color = WingoColorDefine.BetOption.DISABLE;
        this.disableColorOption();
        this.disableNumOption();
        this.disableBetOperate();
    }

    /**
     * 播放数字是否高亮并缩放
     * @param num {number} 数字
     * @param isLighlight {boolean} 是否高亮
     */
    private playNumLighlightAndScaleAnim(num: number, isLighlight: boolean): cc.Tween {
        if (num === undefined) {
            return;
        }
        let nodBar: cc.Node = this.nodPlay.getChildByName(`btnN${num}`).getChildByName("speBar");

        let scale: number = 1;
        let color: cc.Color = WingoColorDefine.BetOption.DISABLE;
        if (isLighlight) {
            scale = NUM_HIGHLIGHT_SCALE;
            color = WingoColorDefine.BetOption.ENABLE;
        }

        return cc.tween(nodBar)
            .to(NUM_ANIM_SCALE_TIME / 1000, { scale: scale, color: color })
            .start();
    }

    private setUnselectModeOption(mode?: MST.WingoMode): void {
        if (TypeUtils.isNull(mode)) {
            this.setUnselectModeOption(MST.WingoMode.CepatPlus);
            this.setUnselectModeOption(MST.WingoMode.Cepat);
            this.setUnselectModeOption(MST.WingoMode.Standar);
        } else {
            let parent: cc.Node = null;
            switch (mode) {
                case MST.WingoMode.CepatPlus:
                    parent = this.btnCepatPlus.node;
                    break;
                case MST.WingoMode.Cepat:
                    parent = this.btnCepat.node;
                    break;
                case MST.WingoMode.Standar:
                    parent = this.btnStandar.node;
                    break;
            }
            let labTitle: cc.Label = parent.getChildByName("labTitle").getComponent(cc.Label);
            labTitle.node.color = WingoColorDefine.Text.Gray;
            let imgLine: cc.Sprite = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
            imgLine.node.active = false;
        }
    }

    private setSelectModeOption(mode: MST.WingoMode): void {
        if (mode === null || mode === undefined) {
            mode = MST.WingoMode.CepatPlus;
        }

        let parent: cc.Node = null;
        switch (mode) {
            case MST.WingoMode.CepatPlus:
                parent = this.btnCepatPlus.node;
                break;
            case MST.WingoMode.Cepat:
                parent = this.btnCepat.node;
                break;
            case MST.WingoMode.Standar:
                parent = this.btnStandar.node;
                break;
        }
        let labTitle: cc.Label = parent.getChildByName("labTitle").getComponent(cc.Label);
        labTitle.node.color = WingoColorDefine.Text.WHITE;
        let imgLine: cc.Sprite = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
        imgLine.node.active = true;
    }

    private clickRecord(mode: WingoModeDefine.History): void {
        if (mode === this._currHistoryOption) {
            return;
        }

        if (mode === WingoModeDefine.History.CatatanCepatPlusSaya) {
            this._wingoData.currPullFunc = WingoDefine.PullBottomFunction.MY_RECORD;
        } else {
            this._wingoData.currPullFunc = null;
        }

        this.setUnselectHistoryOption();
        this.setSelectHistoryOption(mode);

        this._currHistoryOption = mode;
    }

    private setSelectHistoryOption(mode?: WingoModeDefine.History): void {
        let parent: cc.Node = null;
        let lsvNode: cc.Node = null;
        switch (mode) {
            case WingoModeDefine.History.ChartTren:
                parent = this.btnChartTren.node;
                lsvNode = this.nodChartTren;
                break;
            case WingoModeDefine.History.CatatanCepatPlus:
                parent = this.btnCatatanCepatPlus.node;
                lsvNode = this.nodCatatanCepatPlus;
                break;
            case WingoModeDefine.History.CatatanCepatPlusSaya:
                parent = this.btnCatatanCeppatPlusSaya.node;
                lsvNode = this.nodCatatanCepatPlusSaya;
                this.C2S_WingoMyRecord();
                break;
        }
        let labTitle: cc.Label = parent.getChildByName("labTitle").getComponent(cc.Label);
        labTitle.node.color = WingoColorDefine.HistroyOptionText.SELECTED;
        let imgLine: cc.Sprite = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
        imgLine.node.active = true;

        if (lsvNode) {
            lsvNode.active = true;
        }
    }

    private setUnselectHistoryOption(mode?: WingoModeDefine.History): void {
        if (TypeUtils.isNull(mode)) {
            this.setUnselectHistoryOption(WingoModeDefine.History.ChartTren);
            this.setUnselectHistoryOption(WingoModeDefine.History.CatatanCepatPlus);
            this.setUnselectHistoryOption(WingoModeDefine.History.CatatanCepatPlusSaya);
        } else {
            let parent: cc.Node = null;
            let lsvNode: cc.Node = null;
            switch (mode) {
                case WingoModeDefine.History.ChartTren:
                    parent = this.btnChartTren.node;
                    lsvNode = this.nodChartTren;
                    break;
                case WingoModeDefine.History.CatatanCepatPlus:
                    parent = this.btnCatatanCepatPlus.node;
                    lsvNode = this.nodCatatanCepatPlus;
                    break;
                case WingoModeDefine.History.CatatanCepatPlusSaya:
                    parent = this.btnCatatanCeppatPlusSaya.node;
                    lsvNode = this.nodCatatanCepatPlusSaya;
                    break;
            }
            let labTitle: cc.Label = parent.getChildByName("labTitle").getComponent(cc.Label);
            labTitle.node.color = WingoColorDefine.HistroyOptionText.UNSELECT;
            let imgLine: cc.Sprite = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
            imgLine.node.active = false;

            if (lsvNode) {
                lsvNode.active = false;
            }
        }
    }

    private initCurrCoundDown(): void {
        for (let i: number = 0; i < 4; ++i) {
            let nodTimeBg: cc.Node = this.nodLotteryTime.getChildByName(`imgTimeBg${i}`);
            let labTime: cc.Label = nodTimeBg.getChildByName("labTime").getComponent(cc.Label);
            labTime.string = "";
        }
    }

    private initHistoryOption(parent: cc.Node): void {
        parent.getChildByName(`labTitle`).getChildByName(`imgLine`).active = false;
    }

    private initLotteryTime(): void {
        this.initModeOption(this.btnCepatPlus.node);
        this.initModeOption(this.btnCepat.node);
        this.initModeOption(this.btnStandar.node);
        this.labIssue.string = "";
        this.initCurrCoundDown();
    }

    private nextView(): void {

    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_M2C_GetWingoInfo_Res", this.onEvent_M2C_GetWingoInfo_Res);
        this.registerEvent("Event_M2C_GetWingoHistory_Res", this.onEvent_M2C_GetWingoHistory_Res);
        this.registerEvent("Event_M2C_WingoLottery_Mes", this.onEvent_M2C_WingoLottery_Mes);
        this.registerEvent("Event_S2C_WingoMyRecord", this.onEvent_S2C_WingoMyRecord);
        this.registerEvent("Event_M2C_WingoBet_Res", this.onEvent_M2C_WingoBet_Res);


        this.registerEvent("Event_M2C_TransferMap_Res", this.onEvent_M2C_TransferMap_Res);
    }

    onLanguageChange() {
        this.titleItemPageUser.languagePageName(Manager.makeLanguage("labPageName", true));
        this.btnCepatPlus.node.getChildByName("labTitle").getComponent(cc.Label).language = Manager.makeLanguage("btnCepatPlus", true);
        this.btnCepat.node.getChildByName("labTitle").getComponent(cc.Label).language = Manager.makeLanguage("btnCepat", true);
        this.btnStandar.node.getChildByName("labTitle").getComponent(cc.Label).language = Manager.makeLanguage("btnStandar", true);
        this.labIssueTitle.language = Manager.makeLanguage("labIssueTitle", true);
        this.labLotteryCoundDownTitle.language = Manager.makeLanguage("labLotteryCoundDownTitle", true);

        for (let v of WingoConfig.ColorOptionList) {
            this.nodPlay.getChildByName(v).getChildByName("Background").getChildByName("Label").getComponent(cc.Label).language = Manager.makeLanguage(v, true);
        }

        this.btnCepat.node.getChildByName("labTitle").getComponent(cc.Label).getComponent(cc.Label).language = Manager.makeLanguage("btnCepat", true);
        this.btnCatatanCepatPlus.node.getChildByName("labTitle").getComponent(cc.Label).getComponent(cc.Label).language = Manager.makeLanguage("btnCatatanCepatPlus", true);
        this.btnCatatanCeppatPlusSaya.node.getChildByName("labTitle").getComponent(cc.Label).getComponent(cc.Label).language = Manager.makeLanguage("btnCatatanCeppatPlusSaya", true);
    }

    private selectMode(mode: MST.WingoMode, isFirst: boolean = false): void {
        this._wingoData.isFirst = isFirst;
        this.C2M_GetWingoHistory_Req(mode);
    }

    private setLotteryCountDown(mode: MST.WingoMode): void {
        let lotteryInfo: MST.IM2C_WingoLottery_Mes = this._wingoData.lotteryMap.get(mode);
        let timestamp: number = Number(lotteryInfo.NextTimestamp);
        let parent: cc.Node = null;
        switch (mode) {
            case MST.WingoMode.CepatPlus:
                parent = this.btnCepatPlus.node;
                break;
            case MST.WingoMode.Cepat:
                parent = this.btnCepat.node;
                break;
            case MST.WingoMode.Standar:
                parent = this.btnStandar.node;
                break;
        }

        let labTime: cc.Label = parent.getChildByName("labTime").getComponent(cc.Label);
        labTime.string = DateUtils.getRemainTimeHMS(this._appData.getServerTimestamp(), timestamp);

        let sec: number = Math.floor((timestamp - this._appData.getServerTimestamp()) / 1000);
        if (sec <= COUNT_DOWN_HIGHLIGHT_START_TIME) {
            labTime.node.color = WingoColorDefine.Text.WHITE;
        } else {
            labTime.node.color = WingoColorDefine.Text.Gray;
        }
    }

    private setNumHighlight(num: number): void {
        this.nodPlay.getChildByName(`btnN${num}`).getChildByName("speBar").color = WingoColorDefine.BetOption.ENABLE;
    }

    // private getColorMapExist(color: MST.WingoColor): number[] {
    //     let colorKeyList: number[] = [];
    //     for (let i in WingoConfig.ColorMap) {
    //         let colorMap: MST.WingoColor[] = WingoConfig.ColorMap[i];
    //         if (colorMap.indexOf(color) !== -1) {
    //             colorKeyList.push(Number(i));
    //         }
    //     }
    //     return colorKeyList;
    // }

    private setColorHighlight(color: number): void {
        // let colorList: number[] = [];
        // for (let v of colorInfo) {
        //     colorList = colorList.concat(this.getColorMapExist(v));
        // }

        // colorList = colorList.filter((value: number, index: number) => {
        //     return colorList.indexOf(value) === index;
        // });

        // for (let v of colorList) {
        //     this.nodPlay.getChildByName(`btnC${v}`).getChildByName("imgMask").active = false;
        // }

        this.nodPlay.getChildByName(`btnC${color}`).getChildByName("imgMask").active = false;
    }

    private setLotteryHighlight(info: MST.IWingoHistoryInfo): void {
        this.setNumHighlight(info.Num);

        for (let v of WingoConfig.NumByColor[info.Num]) {
            this.setColorHighlight(v);
        }
    }

    private getLastRecordId(): number {
        let id: number = DEFAULT_FIRST_ID;
        if (this._myRecordList.length > 0) {
            let lastRecordData: MST.IWingoMyRecordInfo = this._myRecordList[this._myRecordList.length - 1];
            id = lastRecordData.id;
        }
        return id;
    }

    private isRefreshMyRecord(): boolean {
        return this._currHistoryOption === WingoModeDefine.History.CatatanCepatPlusSaya &&
            !TypeUtils.isNull(this._myRecordList) &&
            this._myRecordList.length > 0 &&
            !this._myRecordList[0].isFinish;
    }

    private updateCurrModeLotteryTime(): void {
        if (this._wingoData.currMode !== null) {
            let lotteryInfo: MST.IM2C_WingoLottery_Mes = this._wingoData.lotteryMap.get(this._wingoData.currMode);
            let strTime: string = DateUtils.getRemainTimeMS(this._appData.getServerTimestamp(), Number(lotteryInfo.NextTimestamp));
            for (let i = 0; i < 4; ++i) {
                let nodTimeBg: cc.Node = this.nodLotteryTime.getChildByName(`imgTimeBg${i}`);
                let labTime: cc.Label = nodTimeBg.getChildByName("labTime").getComponent(cc.Label);
                labTime.string = strTime[i];
            }
        }
    }

    private updateBanBetOptionAndTime(): void {
        if (this._wingoData.currMode !== null) {
            let lotteryInfo: MST.IM2C_WingoLottery_Mes = this._wingoData.lotteryMap.get(this._wingoData.currMode);
            let sec: number = DateUtils.getRemainTimeS(this._appData.getServerTimestamp(), Number(lotteryInfo.NextTimestamp));
            if (sec <= BAN_BET_START_TIME && sec !== Number(this.labBanBetCoundDown.string)) {
                this.disableBetOption();
                this.labBanBetCoundDown.string = sec.toString();
                if (sec > 0) {
                    this.audioHelper.playEffect(Wingo.SOUNDS.COUNT321, this.bundle);
                }
            }
        }
    }

    private updateLotteryCountDown(): void {
        if (!cc.isValid(this.node)) {
            return;
        }

        // G.Logger.color("服务器时间戳", `${this._appData.getServerTimestamp()}`);


        this.setLotteryCountDown(MST.WingoMode.CepatPlus);
        this.setLotteryCountDown(MST.WingoMode.Cepat);
        this.setLotteryCountDown(MST.WingoMode.Standar);

        this.updateCurrModeLotteryTime();
        this.updateBanBetOptionAndTime();

        // this.test_M2C_WingoLottery_Mes();
    }

    /**
     * 启动开奖倒计时
     */
    private startLotteryCountDown(): void {
        this.stopLotteryCountDown();
        this.schedule(this.updateLotteryCountDown, UPDATE_LOTTERY_COUND_DOWN_INTERVAL_TIME / 1000);
    }

    /**
     * 停止开奖倒计时
     */
    private stopLotteryCountDown(): void {
        this.unschedule(this.updateLotteryCountDown);
    }

    private stopAllHighLightAnim(): void {
        this._highlightTweenMap.forEach((tweenData: WingoInterface.HighlightTween) => {
            tweenData.prev && tweenData.prev.stop();
            tweenData.curr && tweenData.curr.stop();
        });
    }

    /**
     * 播放开奖动画
     * @param info {MST.IWingoLotteryInfo} 开奖信息
     */
    private playLotteryAnim(info: MST.IWingoHistoryInfo, callback?: Function): void {
        this._wingoData.isPlayingLotteryAnim = true;
        this.disableNumOption();

        this._lotteryTween = cc.tween({});
        for (let i: number = 0; i < WingoConfig.NumAnimOrder.length + (WingoConfig.NumAnimOrder.indexOf(info.Num) + 1); ++i) {
            let curr: number = WingoConfig.NumAnimOrder[i % WingoConfig.NumAnimOrder.length];
            let prev: number = WingoConfig.NumAnimOrder[(i - 1) % WingoConfig.NumAnimOrder.length];
            this._lotteryTween
                .call(() => {
                    let prevTween: cc.Tween = this.playNumLighlightAndScaleAnim(prev, false);
                    let currTween: cc.Tween = this.playNumLighlightAndScaleAnim(curr, true);

                    let tweenData: WingoInterface.HighlightTween = this._highlightTweenMap.get(i);

                    if (tweenData) {
                        tweenData.prev && tweenData.prev.stop();
                        tweenData.curr && tweenData.curr.stop();
                        this._highlightTweenMap.delete(i);
                    }

                    this._highlightTweenMap.set(i, {
                        prev: prevTween,
                        curr: currTween,
                    });
                    this.audioHelper.playEffect(Wingo.SOUNDS.NUM_HIGHLIGHT, this.bundle);
                })
                .delay(NUM_ANIM_SCALE_TIME / 1000)
                .call(() => {
                    let tweenData: WingoInterface.HighlightTween = this._highlightTweenMap.get(i);
                    if (tweenData) {
                        tweenData.prev && tweenData.prev.stop();
                        tweenData.prev = null;
                        tweenData.curr && tweenData.curr.stop();
                        tweenData.curr = null;
                        this._highlightTweenMap.delete(i);
                    }
                })
        }
        this._lotteryTween
            .call(() => {
                this.setLotteryHighlight(info);
                this.audioHelper.playEffect(Wingo.SOUNDS.NUM_RESULT, this.bundle);
            })
            .delay(NUM_LAST_ANIM_WAIT_TIME / 1000)
            .call(() => {
                callback && callback();
                this.enableBetOption();
                this._wingoData.isPlayingLotteryAnim = false;
            })
            .start();
    }

    private stopLotteryAnim(): void {
        if (this._lotteryTween) {
            this._lotteryTween.stop();
            this._lotteryTween = null;
        }
    }

    public reqEnterLobby(): void {
        let req = MST.C2M_TransferMap_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            RoomName: Config.GameId.Lobby,
        })
        let buffer = MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_TransferMap_Req, MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
    }

    private refreshIssue(): void {
        this.labIssue.string = this._wingoData.currIssue.toString();
    }

    private refreshModeOption(): void {
        this.setUnselectModeOption();
        this.setSelectModeOption(this._wingoData.currMode);
    }

    private refreshLottery(): void {
        let lotteryInfo: MST.IM2C_WingoLottery_Mes = this._wingoData.lotteryMap.get(this._wingoData.currMode);
        let sec: number = DateUtils.getRemainTimeS(this._appData.getServerTimestamp(), Number(lotteryInfo.NextTimestamp));
        G.Logger.color("模式", this._wingoData.currMode.toString(), sec.toString(), Number(lotteryInfo.NextTimestamp));
        if (sec <= BAN_BET_START_TIME) {
            this.disableBetOption();
            this.labBanBetCoundDown.string = sec.toString();
        } else {
            this.enableBetOption();
            this.labBanBetCoundDown.string = "";
        }
    }

    /**
     * 设置统计数据
     */
    private setStat(parent: cc.Node, data: number[]): void {
        for (let i: number = 0; i < parent.childrenCount; ++i) {
            let labCount: cc.Label = parent.getChildByName(`lab${i}`).getComponent(cc.Label);
            labCount.string = data[i].toString();
        }
    }

    private refreshStat(): void {
        let missing: number[] = this._wingoData.getMissing();
        let avgMissing: number[] = this._wingoData.getAvgMissing();
        let frequency: number[] = this._wingoData.getFrequency();
        let maxContinued: number[] = this._wingoData.getMaxContinued();

        this.setStat(this.labMissing.node, missing);
        this.setStat(this.labAvgMissing.node, avgMissing);
        this.setStat(this.labFrequency.node, frequency);
        this.setStat(this.labMaxContinued.node, maxContinued);
    }

    private refreshLink(): void {
        this.lsvNumRecord.set(this._wingoData.historyLotteryMap.get(this._wingoData.currMode));
        this.nodChartTren.height = Math.abs(this.lsvNumRecord.node.y) + this.lsvNumRecord.getInnerEstimateSize().height;
    }

    private refreshColor(): void {
        this.lsvColorRecord.set(this._wingoData.historyLotteryMap.get(this._wingoData.currMode));
        this.nodCatatanCepatPlus.height = Math.abs(this.lsvColorRecord.node.y) + this.lsvColorRecord.getInnerEstimateSize().height;
    }

    private refreshHistory(): void {
        this.refreshStat();
        this.refreshLink();
        this.refreshColor();
    }

    private refreshMyRecordNodeHeight(): void {
        this.nodCatatanCepatPlusSaya.height = Math.abs(this.lsvMyRecord.node.y) + this.lsvMyRecord.getInnerEstimateSize().height;
    }

    private clearMyRecord(): void {
        this.lsvMyRecord.clear();

    }

    private clickBetColorOption(color: number): void {
        let param: WingoInterface.BetData = {
            type: MST.WingoBetType.Color,
            value: color,
            serviceCost: this._wingoData.cost,
        }
        Manager.uiManager.open({ type: WingoBetView, bundle: this.bundle, args: [param] })
    }

    private clickBetNumOption(num: number): void {
        let param: WingoInterface.BetData = {
            type: MST.WingoBetType.Num,
            value: num,
            serviceCost: this._wingoData.cost,
        }
        Manager.uiManager.open({ type: WingoBetView, bundle: this.bundle, args: [param] })
    }

    private clickMode(mode: MST.WingoMode): void {
        if (this._wingoData.currMode === mode) {
            return;
        }

        this._wingoData.isPlayingLotteryAnim = false;
        this.titleItemPageUser.manualRefreshGold();

        this.selectMode(mode);
    }

    public onClick(ButtonName: string, ButtonNode: any): void {
        switch (ButtonName) {
            case "btnClose":
                this.reqEnterLobby();
                break;
            case "btnCepatPlus":
                this.clickMode(MST.WingoMode.CepatPlus);
                break;
            case "btnCepat":
                this.clickMode(MST.WingoMode.Cepat);
                break;
            case "btnStandar": {
                this.clickMode(MST.WingoMode.Standar);
            }
                break;
            case "btnC0":
            case "btnC1":
            case "btnC2":
            case "btnC3":
            case "btnC4":
            case "btnC5":
            case "btnC6":
            case "btnC7":
            case "btnC8":
            case "btnC9":
                this.clickBetColorOption(Number(ButtonName.replace("btnC", "")));
                break;
            case "btnN0":
            case "btnN1":
            case "btnN2":
            case "btnN3":
            case "btnN4":
            case "btnN5":
            case "btnN6":
            case "btnN7":
            case "btnN8":
            case "btnN9":
                this.clickBetNumOption(Number(ButtonName.replace("btnN", "")));
                break;
            case "btnChartTren":
                this.clickRecord(WingoModeDefine.History.ChartTren);
                break;
            case "btnCatatanCepatPlus":
                this.clickRecord(WingoModeDefine.History.CatatanCepatPlus);
                break;
            case "btnCatatanCeppatPlusSaya":
                this.clickRecord(WingoModeDefine.History.CatatanCepatPlusSaya);
                break;
        }
    }

    private C2M_GetWingoInfo_Req(): void {
        let req = MST.C2M_GetWingoInfo_Req.create({ RpcId: Manager.netManager.getNewSeqId() });
        let buffer = MST.C2M_GetWingoInfo_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_GetWingoInfo_Req, MST.OuterOpcode_WingoGame.C2M_GetWingoInfo_Req, buffer);

        // this.test_M2C_GetWingoInfo_Res();
    }

    private C2M_GetWingoHistory_Req(mode: MST.WingoMode): void {
        let req = MST.C2M_GetWingoHistory_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            Mode: mode,
        });
        let buffer = MST.C2M_GetWingoHistory_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_GetWingoHistory_Req, MST.OuterOpcode_WingoGame.C2M_GetWingoHistory_Req, buffer);

        // this.test_M2C_GetWingoHistory_Res(mode);
    }

    private C2S_WingoMyRecord(id?: number): void {
        if (TypeUtils.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }

        let req = MST.C2S_WingoMyRecord.create({
            serial: Manager.netManager.getNewSeqId(),
            mode: this._wingoData.currMode,
            id: id,
            count: MY_RECORD_PAGE_COUNT,
        });
        let buffer = MST.C2S_WingoMyRecord.encode(req).finish();
        this.service.sendMsg(MST.C2S_WingoMyRecord, MST.OuterOpcode_WingoGame.C2S_WingoMyRecord, buffer);

    }

    private test_M2C_GetWingoInfo_Res(): void {
        let controller: WingoNetController = Manager.netManager.mainNode.getComponent(WingoNetController);
        let serverTimestamp: number = this._appData.getServerTimestamp();
        controller.onM2C_GetWingoInfo_Res({
            RpcId: Manager.netManager.getNewSeqId() - 1,
            Error: 0,
            Message: "",
            CepatPlusTimestamp: serverTimestamp + WingoConfig.LotteryIntervalTime[MST.WingoMode.CepatPlus],
            CepatTimestamp: serverTimestamp + WingoConfig.LotteryIntervalTime[MST.WingoMode.Cepat],
            StandarTimestamp: serverTimestamp + WingoConfig.LotteryIntervalTime[MST.WingoMode.Standar],
            Cost: 10,
        })
    }

    private test_M2C_GetWingoHistory_Res(mode: MST.WingoMode): void {
        let controller: WingoNetController = Manager.netManager.mainNode.getComponent(WingoNetController);

        let historyInfoList: MST.IWingoHistoryInfo[] = [];
        for (let i: number = 0; i < 100; ++i) {
            let issue: number = 202204261713 + i;
            let num: number = UtilMgr.random(0, 9);
            let lotteryInfo: MST.IWingoHistoryInfo = {
                Issue: issue,
                Num: num,
                Harga: 25535,
            }
            historyInfoList.push(lotteryInfo);
        }

        controller.onM2C_GetWingoHistory_Res({
            RpcId: Manager.netManager.getNewSeqId() - 1,
            Error: 0,
            Message: "",
            Mode: mode,
            CurrIssue: Number(historyInfoList[historyInfoList.length - 1].Issue) + 1,
            HistoryInfo: historyInfoList,
        })
    }

    private test_M2C_WingoLottery_Mes(): void {
        for (let [k, v] of this._wingoData.lotteryMap) {
            let sec: number = DateUtils.getRemainTimeS(this._appData.getServerTimestamp(), Number(v.NextTimestamp));
            if (sec <= 0) {
                let num: number = UtilMgr.random(0, 9);
                let controller: WingoNetController = Manager.netManager.mainNode.getComponent(WingoNetController);
                controller.onM2C_WingoLottery_Mes({
                    Mode: v.Mode,
                    LotteryInfo: {
                        Issue: 0,
                        Num: num,
                        Harga: 555,
                    },
                    NextTimestamp: this._appData.getServerTimestamp() + WingoConfig.LotteryIntervalTime[v.Mode],
                    NextIssue: 555,
                });
            }
        }
    }

    private stopAllSound(): void {
        this.audioHelper.stopMusic();
        this.audioHelper.stopEffectByPath(Wingo.SOUNDS.COUNT321);
        this.audioHelper.stopEffectByPath(Wingo.SOUNDS.NUM_HIGHLIGHT);
        this.audioHelper.stopEffectByPath(Wingo.SOUNDS.NUM_RESULT);
    }

    onDestroy(): void {
        super.onDestroy();
        this.stopAllSound();
        this.stopLotteryAnim();
        this.stopLotteryCountDown();
        this.stopAllHighLightAnim();
    }

    private onEvent_M2C_GetWingoInfo_Res(data: MST.IM2C_GetCrashInfo_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }

        this.startLotteryCountDown();
    }

    private onEvent_M2C_GetWingoHistory_Res(data: MST.IM2C_GetWingoHistory_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }

        this.refreshIssue();
        this.refreshModeOption();
        this.refreshHistory();
        this.stopLotteryAnim();
        this.stopAllHighLightAnim();
        this.refreshLottery();

        if (!this._wingoData.isFirst) {
            this.clearMyRecord();
            if (this._currHistoryOption === WingoModeDefine.History.CatatanCepatPlusSaya) {
                this.C2S_WingoMyRecord();
            }
        }

    }

    private onEvent_M2C_WingoLottery_Mes(data: MST.IM2C_WingoLottery_Mes): void {
        if (this._wingoData.currMode === null || this._wingoData.currMode !== data.Mode) {
            return;
        }

        this.labBanBetCoundDown.string = "";
        this.refreshIssue();

        this.playLotteryAnim(data.LotteryInfo, () => {
            let historyInfoList: MST.IWingoHistoryInfo[] = this._wingoData.historyLotteryMap.get(this._wingoData.currMode);
            let historyInfo: MST.IWingoHistoryInfo = historyInfoList[historyInfoList.length - 1];
            this.lsvColorRecord.insert(historyInfo, 0);
            this.lsvNumRecord.insert(historyInfo, 0);
            if (this._userData.isLogined()) {
                this.titleItemPageUser.manualRefreshGold();
                if (this.isRefreshMyRecord()) {
                    this.C2S_WingoMyRecord();
                }
            }
        });
    }

    private onEvent_S2C_WingoMyRecord(data: MST.IS2C_WingoMyRecord): void {
        if (data.id === DEFAULT_FIRST_ID && data.myRecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvMyRecord.node.active = false;
        } else {
            this.noneItem.node.active = false;
            this.lsvMyRecord.node.active = true;
        }

        // 是否最后一页
        this._isLastPage = data.myRecordInfo.length < MY_RECORD_PAGE_COUNT;

        if (data.id === DEFAULT_FIRST_ID) {
            this._myRecordList = [].concat(data.myRecordInfo);
            this.lsvMyRecord.set(data.myRecordInfo);
        } else {
            this._myRecordList = this._myRecordList.concat(data.myRecordInfo);
            this.lsvMyRecord.insert(data.myRecordInfo);
        }

        this.refreshMyRecordNodeHeight();
    }

    private onEvent_M2C_WingoBet_Res(data: MST.IM2C_WingoBet_Res): void {
        if (this._currHistoryOption === WingoModeDefine.History.CatatanCepatPlusSaya) {
            this.C2S_WingoMyRecord();
        }
    }

    private onEvent_M2C_TransferMap_Res(data: MST.IM2C_TransferMap_Res): void {
        if (data.Error === 0) {
            dispatch(LogicEvent.ENTER_HALL);
        } else {
            PanelHelp.showErrTip(data.Error);
        }
    }

    private pullMyRecord(): void {
        if (this._isLastPage) {
            G.Logger.log("Wingo 浏览个人下注记录 已是最后一页 无需请求翻页");
            PanelHelp.showTip(i18n.Common.NoData);
            return;
        }
        this.C2S_WingoMyRecord(this.getLastRecordId());
    }

    /**
     * 下拉回调
     */
    private onPullBottom(target: ListView): void {
        switch (this._wingoData.currPullFunc) {
            case WingoDefine.PullBottomFunction.MY_RECORD:
                this.pullMyRecord();
                break;
        }
    }

}
