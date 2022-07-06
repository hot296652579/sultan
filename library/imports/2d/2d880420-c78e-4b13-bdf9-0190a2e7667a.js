"use strict";
cc._RF.push(module, '2d880Qgx45LE735AZCi52Z6', 'WingoGameView');
// games/wingo/script/view/WingoGameView.ts

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
const LogicEvent_1 = require("../../../../script/common/event/LogicEvent");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const WingoNetController_1 = __importDefault(require("../protocol/WingoNetController"));
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const WingoGameData_1 = require("../data/WingoGameData");
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const protoc_1 = require("../../../../script/framework/external/protoc");
const WingoColorDefine_1 = require("../define/WingoColorDefine");
const Manager_1 = require("../../../../script/common/manager/Manager");
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const Config_1 = require("../../../../script/common/config/Config");
const WingoData_1 = __importDefault(require("../data/WingoData"));
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const WingoConfig_1 = require("../config/WingoConfig");
const WingoLinkListView_1 = __importDefault(require("../component/WingoLinkListView"));
const WingoColorListView_1 = __importDefault(require("../component/WingoColorListView"));
const WingoModeDefine_1 = require("../define/WingoModeDefine");
const WingoBetView_1 = __importDefault(require("./WingoBetView"));
const WingoEventDefine_1 = require("../define/WingoEventDefine");
const WingoTitleItemPageUser_1 = __importDefault(require("./WingoTitleItemPageUser"));
const WingoMyRecordListView_1 = __importDefault(require("../component/WingoMyRecordListView"));
const NoneItem_1 = __importDefault(require("../../../../script/common/item/NoneItem"));
const WingoDefine_1 = require("../define/WingoDefine");
const LanguageImpl_1 = require("../../../../script/common/language/LanguageImpl");
// 刷新开奖倒计时间隔时间（单位：毫秒）
const UPDATE_LOTTERY_COUND_DOWN_INTERVAL_TIME = 100;
// 倒计时高亮开始时间（单位：秒）
const COUNT_DOWN_HIGHLIGHT_START_TIME = 5;
// 禁止下注开始时间（单位：秒）
const BAN_BET_START_TIME = 3;
// 每次动画数字球亮暗缩放时间（单位：毫秒）
const NUM_ANIM_SCALE_TIME = 200;
// 最后动画数字开奖后停留的时间（单位：毫秒）
const NUM_LAST_ANIM_WAIT_TIME = 1800;
// 数字高亮放大缩放
const NUM_HIGHLIGHT_SCALE = 1.3;
// 个人记录每页数量
const MY_RECORD_PAGE_COUNT = 20;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID = -1;
const { ccclass, property } = cc._decorator;
let WingoGameView = class WingoGameView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnCepatPlus = null;
        this.btnCepat = null;
        this.btnStandar = null;
        this.nodLotteryTime = null;
        this.labIssueTitle = null;
        this.labIssue = null;
        this.labLotteryCoundDownTitle = null;
        this.nodPlay = null;
        this.labBanBetCoundDown = null;
        this.imgPlayBg = null;
        this.btnChartTren = null;
        this.btnCatatanCepatPlus = null;
        this.btnCatatanCeppatPlusSaya = null;
        this.nodChartTren = null;
        this.labMissing = null;
        this.labAvgMissing = null;
        this.labFrequency = null;
        this.labMaxContinued = null;
        this.lsvNumRecord = null;
        this.nodCatatanCepatPlus = null;
        this.lsvColorRecord = null;
        this.nodCatatanCepatPlusSaya = null;
        this.lsvMyRecord = null;
        this.noneItem = null;
        this.titleItemPageUser = null;
        // 游戏数据
        this._wingoData = null;
        // 应用数据
        this._appData = null;
        // 用户数据
        this._userData = null;
        // 开奖动画
        this._lotteryTween = null;
        // 高亮动画 Map
        this._highlightTweenMap = null;
        // 当前历史选项
        this._currHistoryOption = null;
        // 是否最后一页
        this._isLastPage = false;
        // 个人记录列表
        this._myRecordList = null;
    }
    static getPrefabUrl() {
        return "prefabs/WingoGameView";
    }
    onLoad() {
        super.onLoad();
        LogicEvent_1.dispatchEnterComplete({ type: LogicEvent_1.LogicType.GAME, views: [this] });
        this.audioHelper.playMusic(WingoGameData_1.Wingo.SOUNDS.BGM, this.bundle);
        this.initData();
        this.initView();
        this.C2M_GetWingoInfo_Req();
        this.selectMode(protoc_1.MST.WingoMode.CepatPlus, true);
        this.selectMode(protoc_1.MST.WingoMode.Cepat, true);
        this.selectMode(protoc_1.MST.WingoMode.Standar, true);
        this.clickRecord(WingoModeDefine_1.WingoModeDefine.History.ChartTren);
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
    }
    initData() {
        this._wingoData = G.DataMgr.get(WingoData_1.default);
        this._appData = G.DataMgr.get(AppData_1.default);
        this._userData = G.DataMgr.get(UserData_1.default);
        this._highlightTweenMap = new Map();
        this._myRecordList = [];
    }
    initView() {
        this.initLotteryTime();
        this.enableBetOption();
        this.initHistory();
    }
    initModeOption(parent) {
        let labTitle = parent.getChildByName("labTitle").getComponent(cc.Label);
        labTitle.node.color = WingoColorDefine_1.WingoColorDefine.Text.Gray;
        let imgLine = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
        imgLine.node.active = false;
        let labTime = parent.getChildByName("labTime").getComponent(cc.Label);
        labTime.node.color = WingoColorDefine_1.WingoColorDefine.Text.Gray;
        labTime.string = "";
    }
    enableColorOption() {
        for (let v of WingoConfig_1.WingoConfig.ColorOptionList) {
            let btnC = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodMask = btnC.node.getChildByName("imgMask");
            nodMask.active = false;
            btnC.interactable = true;
        }
    }
    enableNumOption() {
        for (let v of WingoConfig_1.WingoConfig.NumOptionList) {
            let btnN = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodBar = btnN.node.getChildByName("speBar");
            nodBar.color = WingoColorDefine_1.WingoColorDefine.BetOption.ENABLE;
            nodBar.scale = 1;
            btnN.interactable = true;
        }
    }
    enableBetOperate() {
        dispatch(WingoEventDefine_1.WingoEventDefine.WingoStartBet);
    }
    enableBetOption() {
        this.imgPlayBg.node.color = WingoColorDefine_1.WingoColorDefine.BetOption.ENABLE;
        this.enableColorOption();
        this.enableNumOption();
        this.enableBetOperate();
    }
    highlightBetOption() {
    }
    darkBetOption() {
    }
    initHistory() {
        this.initHistoryOption(this.btnChartTren.node);
        this.initHistoryOption(this.btnCatatanCepatPlus.node);
        this.initHistoryOption(this.btnCatatanCeppatPlusSaya.node);
        this.nodChartTren.active = false;
        this.nodCatatanCepatPlus.active = false;
    }
    disableColorOption() {
        for (let v of WingoConfig_1.WingoConfig.ColorOptionList) {
            let btnC = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodMask = btnC.node.getChildByName("imgMask");
            nodMask.active = true;
            btnC.interactable = false;
        }
    }
    disableNumOption() {
        for (let v of WingoConfig_1.WingoConfig.NumOptionList) {
            let btnN = this.nodPlay.getChildByName(v).getComponent(cc.Button);
            let nodBar = btnN.node.getChildByName("speBar");
            nodBar.color = WingoColorDefine_1.WingoColorDefine.BetOption.DISABLE;
            nodBar.scale = 1;
            btnN.interactable = false;
        }
    }
    disableBetOperate() {
    }
    disableBetOption() {
        dispatch(WingoEventDefine_1.WingoEventDefine.WingoStopBet);
        this.imgPlayBg.node.color = WingoColorDefine_1.WingoColorDefine.BetOption.DISABLE;
        this.disableColorOption();
        this.disableNumOption();
        this.disableBetOperate();
    }
    /**
     * 播放数字是否高亮并缩放
     * @param num {number} 数字
     * @param isLighlight {boolean} 是否高亮
     */
    playNumLighlightAndScaleAnim(num, isLighlight) {
        if (num === undefined) {
            return;
        }
        let nodBar = this.nodPlay.getChildByName(`btnN${num}`).getChildByName("speBar");
        let scale = 1;
        let color = WingoColorDefine_1.WingoColorDefine.BetOption.DISABLE;
        if (isLighlight) {
            scale = NUM_HIGHLIGHT_SCALE;
            color = WingoColorDefine_1.WingoColorDefine.BetOption.ENABLE;
        }
        return cc.tween(nodBar)
            .to(NUM_ANIM_SCALE_TIME / 1000, { scale: scale, color: color })
            .start();
    }
    setUnselectModeOption(mode) {
        if (TypeUtils_1.default.isNull(mode)) {
            this.setUnselectModeOption(protoc_1.MST.WingoMode.CepatPlus);
            this.setUnselectModeOption(protoc_1.MST.WingoMode.Cepat);
            this.setUnselectModeOption(protoc_1.MST.WingoMode.Standar);
        }
        else {
            let parent = null;
            switch (mode) {
                case protoc_1.MST.WingoMode.CepatPlus:
                    parent = this.btnCepatPlus.node;
                    break;
                case protoc_1.MST.WingoMode.Cepat:
                    parent = this.btnCepat.node;
                    break;
                case protoc_1.MST.WingoMode.Standar:
                    parent = this.btnStandar.node;
                    break;
            }
            let labTitle = parent.getChildByName("labTitle").getComponent(cc.Label);
            labTitle.node.color = WingoColorDefine_1.WingoColorDefine.Text.Gray;
            let imgLine = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
            imgLine.node.active = false;
        }
    }
    setSelectModeOption(mode) {
        if (mode === null || mode === undefined) {
            mode = protoc_1.MST.WingoMode.CepatPlus;
        }
        let parent = null;
        switch (mode) {
            case protoc_1.MST.WingoMode.CepatPlus:
                parent = this.btnCepatPlus.node;
                break;
            case protoc_1.MST.WingoMode.Cepat:
                parent = this.btnCepat.node;
                break;
            case protoc_1.MST.WingoMode.Standar:
                parent = this.btnStandar.node;
                break;
        }
        let labTitle = parent.getChildByName("labTitle").getComponent(cc.Label);
        labTitle.node.color = WingoColorDefine_1.WingoColorDefine.Text.WHITE;
        let imgLine = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
        imgLine.node.active = true;
    }
    clickRecord(mode) {
        if (mode === this._currHistoryOption) {
            return;
        }
        if (mode === WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya) {
            this._wingoData.currPullFunc = WingoDefine_1.WingoDefine.PullBottomFunction.MY_RECORD;
        }
        else {
            this._wingoData.currPullFunc = null;
        }
        this.setUnselectHistoryOption();
        this.setSelectHistoryOption(mode);
        this._currHistoryOption = mode;
    }
    setSelectHistoryOption(mode) {
        let parent = null;
        let lsvNode = null;
        switch (mode) {
            case WingoModeDefine_1.WingoModeDefine.History.ChartTren:
                parent = this.btnChartTren.node;
                lsvNode = this.nodChartTren;
                break;
            case WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlus:
                parent = this.btnCatatanCepatPlus.node;
                lsvNode = this.nodCatatanCepatPlus;
                break;
            case WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya:
                parent = this.btnCatatanCeppatPlusSaya.node;
                lsvNode = this.nodCatatanCepatPlusSaya;
                this.C2S_WingoMyRecord();
                break;
        }
        let labTitle = parent.getChildByName("labTitle").getComponent(cc.Label);
        labTitle.node.color = WingoColorDefine_1.WingoColorDefine.HistroyOptionText.SELECTED;
        let imgLine = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
        imgLine.node.active = true;
        if (lsvNode) {
            lsvNode.active = true;
        }
    }
    setUnselectHistoryOption(mode) {
        if (TypeUtils_1.default.isNull(mode)) {
            this.setUnselectHistoryOption(WingoModeDefine_1.WingoModeDefine.History.ChartTren);
            this.setUnselectHistoryOption(WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlus);
            this.setUnselectHistoryOption(WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya);
        }
        else {
            let parent = null;
            let lsvNode = null;
            switch (mode) {
                case WingoModeDefine_1.WingoModeDefine.History.ChartTren:
                    parent = this.btnChartTren.node;
                    lsvNode = this.nodChartTren;
                    break;
                case WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlus:
                    parent = this.btnCatatanCepatPlus.node;
                    lsvNode = this.nodCatatanCepatPlus;
                    break;
                case WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya:
                    parent = this.btnCatatanCeppatPlusSaya.node;
                    lsvNode = this.nodCatatanCepatPlusSaya;
                    break;
            }
            let labTitle = parent.getChildByName("labTitle").getComponent(cc.Label);
            labTitle.node.color = WingoColorDefine_1.WingoColorDefine.HistroyOptionText.UNSELECT;
            let imgLine = labTitle.node.getChildByName("imgLine").getComponent(cc.Sprite);
            imgLine.node.active = false;
            if (lsvNode) {
                lsvNode.active = false;
            }
        }
    }
    initCurrCoundDown() {
        for (let i = 0; i < 4; ++i) {
            let nodTimeBg = this.nodLotteryTime.getChildByName(`imgTimeBg${i}`);
            let labTime = nodTimeBg.getChildByName("labTime").getComponent(cc.Label);
            labTime.string = "";
        }
    }
    initHistoryOption(parent) {
        parent.getChildByName(`labTitle`).getChildByName(`imgLine`).active = false;
    }
    initLotteryTime() {
        this.initModeOption(this.btnCepatPlus.node);
        this.initModeOption(this.btnCepat.node);
        this.initModeOption(this.btnStandar.node);
        this.labIssue.string = "";
        this.initCurrCoundDown();
    }
    nextView() {
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_M2C_GetWingoInfo_Res", this.onEvent_M2C_GetWingoInfo_Res);
        this.registerEvent("Event_M2C_GetWingoHistory_Res", this.onEvent_M2C_GetWingoHistory_Res);
        this.registerEvent("Event_M2C_WingoLottery_Mes", this.onEvent_M2C_WingoLottery_Mes);
        this.registerEvent("Event_S2C_WingoMyRecord", this.onEvent_S2C_WingoMyRecord);
        this.registerEvent("Event_M2C_WingoBet_Res", this.onEvent_M2C_WingoBet_Res);
        this.registerEvent("Event_M2C_TransferMap_Res", this.onEvent_M2C_TransferMap_Res);
    }
    onLanguageChange() {
        this.titleItemPageUser.languagePageName(Manager_1.Manager.makeLanguage("labPageName", true));
        this.btnCepatPlus.node.getChildByName("labTitle").getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("btnCepatPlus", true);
        this.btnCepat.node.getChildByName("labTitle").getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("btnCepat", true);
        this.btnStandar.node.getChildByName("labTitle").getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("btnStandar", true);
        this.labIssueTitle.language = Manager_1.Manager.makeLanguage("labIssueTitle", true);
        this.labLotteryCoundDownTitle.language = Manager_1.Manager.makeLanguage("labLotteryCoundDownTitle", true);
        for (let v of WingoConfig_1.WingoConfig.ColorOptionList) {
            this.nodPlay.getChildByName(v).getChildByName("Background").getChildByName("Label").getComponent(cc.Label).language = Manager_1.Manager.makeLanguage(v, true);
        }
        this.btnCepat.node.getChildByName("labTitle").getComponent(cc.Label).getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("btnCepat", true);
        this.btnCatatanCepatPlus.node.getChildByName("labTitle").getComponent(cc.Label).getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("btnCatatanCepatPlus", true);
        this.btnCatatanCeppatPlusSaya.node.getChildByName("labTitle").getComponent(cc.Label).getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("btnCatatanCeppatPlusSaya", true);
    }
    selectMode(mode, isFirst = false) {
        this._wingoData.isFirst = isFirst;
        this.C2M_GetWingoHistory_Req(mode);
    }
    setLotteryCountDown(mode) {
        let lotteryInfo = this._wingoData.lotteryMap.get(mode);
        let timestamp = Number(lotteryInfo.NextTimestamp);
        let parent = null;
        switch (mode) {
            case protoc_1.MST.WingoMode.CepatPlus:
                parent = this.btnCepatPlus.node;
                break;
            case protoc_1.MST.WingoMode.Cepat:
                parent = this.btnCepat.node;
                break;
            case protoc_1.MST.WingoMode.Standar:
                parent = this.btnStandar.node;
                break;
        }
        let labTime = parent.getChildByName("labTime").getComponent(cc.Label);
        labTime.string = DateUtils_1.default.getRemainTimeHMS(this._appData.getServerTimestamp(), timestamp);
        let sec = Math.floor((timestamp - this._appData.getServerTimestamp()) / 1000);
        if (sec <= COUNT_DOWN_HIGHLIGHT_START_TIME) {
            labTime.node.color = WingoColorDefine_1.WingoColorDefine.Text.WHITE;
        }
        else {
            labTime.node.color = WingoColorDefine_1.WingoColorDefine.Text.Gray;
        }
    }
    setNumHighlight(num) {
        this.nodPlay.getChildByName(`btnN${num}`).getChildByName("speBar").color = WingoColorDefine_1.WingoColorDefine.BetOption.ENABLE;
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
    setColorHighlight(color) {
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
    setLotteryHighlight(info) {
        this.setNumHighlight(info.Num);
        for (let v of WingoConfig_1.WingoConfig.NumByColor[info.Num]) {
            this.setColorHighlight(v);
        }
    }
    getLastRecordId() {
        let id = DEFAULT_FIRST_ID;
        if (this._myRecordList.length > 0) {
            let lastRecordData = this._myRecordList[this._myRecordList.length - 1];
            id = lastRecordData.id;
        }
        return id;
    }
    isRefreshMyRecord() {
        return this._currHistoryOption === WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya &&
            !TypeUtils_1.default.isNull(this._myRecordList) &&
            this._myRecordList.length > 0 &&
            !this._myRecordList[0].isFinish;
    }
    updateCurrModeLotteryTime() {
        if (this._wingoData.currMode !== null) {
            let lotteryInfo = this._wingoData.lotteryMap.get(this._wingoData.currMode);
            let strTime = DateUtils_1.default.getRemainTimeMS(this._appData.getServerTimestamp(), Number(lotteryInfo.NextTimestamp));
            for (let i = 0; i < 4; ++i) {
                let nodTimeBg = this.nodLotteryTime.getChildByName(`imgTimeBg${i}`);
                let labTime = nodTimeBg.getChildByName("labTime").getComponent(cc.Label);
                labTime.string = strTime[i];
            }
        }
    }
    updateBanBetOptionAndTime() {
        if (this._wingoData.currMode !== null) {
            let lotteryInfo = this._wingoData.lotteryMap.get(this._wingoData.currMode);
            let sec = DateUtils_1.default.getRemainTimeS(this._appData.getServerTimestamp(), Number(lotteryInfo.NextTimestamp));
            if (sec <= BAN_BET_START_TIME && sec !== Number(this.labBanBetCoundDown.string)) {
                this.disableBetOption();
                this.labBanBetCoundDown.string = sec.toString();
                if (sec > 0) {
                    this.audioHelper.playEffect(WingoGameData_1.Wingo.SOUNDS.COUNT321, this.bundle);
                }
            }
        }
    }
    updateLotteryCountDown() {
        if (!cc.isValid(this.node)) {
            return;
        }
        // G.Logger.color("服务器时间戳", `${this._appData.getServerTimestamp()}`);
        this.setLotteryCountDown(protoc_1.MST.WingoMode.CepatPlus);
        this.setLotteryCountDown(protoc_1.MST.WingoMode.Cepat);
        this.setLotteryCountDown(protoc_1.MST.WingoMode.Standar);
        this.updateCurrModeLotteryTime();
        this.updateBanBetOptionAndTime();
        // this.test_M2C_WingoLottery_Mes();
    }
    /**
     * 启动开奖倒计时
     */
    startLotteryCountDown() {
        this.stopLotteryCountDown();
        this.schedule(this.updateLotteryCountDown, UPDATE_LOTTERY_COUND_DOWN_INTERVAL_TIME / 1000);
    }
    /**
     * 停止开奖倒计时
     */
    stopLotteryCountDown() {
        this.unschedule(this.updateLotteryCountDown);
    }
    stopAllHighLightAnim() {
        this._highlightTweenMap.forEach((tweenData) => {
            tweenData.prev && tweenData.prev.stop();
            tweenData.curr && tweenData.curr.stop();
        });
    }
    /**
     * 播放开奖动画
     * @param info {MST.IWingoLotteryInfo} 开奖信息
     */
    playLotteryAnim(info, callback) {
        this._wingoData.isPlayingLotteryAnim = true;
        this.disableNumOption();
        this._lotteryTween = cc.tween({});
        for (let i = 0; i < WingoConfig_1.WingoConfig.NumAnimOrder.length + (WingoConfig_1.WingoConfig.NumAnimOrder.indexOf(info.Num) + 1); ++i) {
            let curr = WingoConfig_1.WingoConfig.NumAnimOrder[i % WingoConfig_1.WingoConfig.NumAnimOrder.length];
            let prev = WingoConfig_1.WingoConfig.NumAnimOrder[(i - 1) % WingoConfig_1.WingoConfig.NumAnimOrder.length];
            this._lotteryTween
                .call(() => {
                let prevTween = this.playNumLighlightAndScaleAnim(prev, false);
                let currTween = this.playNumLighlightAndScaleAnim(curr, true);
                let tweenData = this._highlightTweenMap.get(i);
                if (tweenData) {
                    tweenData.prev && tweenData.prev.stop();
                    tweenData.curr && tweenData.curr.stop();
                    this._highlightTweenMap.delete(i);
                }
                this._highlightTweenMap.set(i, {
                    prev: prevTween,
                    curr: currTween,
                });
                this.audioHelper.playEffect(WingoGameData_1.Wingo.SOUNDS.NUM_HIGHLIGHT, this.bundle);
            })
                .delay(NUM_ANIM_SCALE_TIME / 1000)
                .call(() => {
                let tweenData = this._highlightTweenMap.get(i);
                if (tweenData) {
                    tweenData.prev && tweenData.prev.stop();
                    tweenData.prev = null;
                    tweenData.curr && tweenData.curr.stop();
                    tweenData.curr = null;
                    this._highlightTweenMap.delete(i);
                }
            });
        }
        this._lotteryTween
            .call(() => {
            this.setLotteryHighlight(info);
            this.audioHelper.playEffect(WingoGameData_1.Wingo.SOUNDS.NUM_RESULT, this.bundle);
        })
            .delay(NUM_LAST_ANIM_WAIT_TIME / 1000)
            .call(() => {
            callback && callback();
            this.enableBetOption();
            this._wingoData.isPlayingLotteryAnim = false;
        })
            .start();
    }
    stopLotteryAnim() {
        if (this._lotteryTween) {
            this._lotteryTween.stop();
            this._lotteryTween = null;
        }
    }
    reqEnterLobby() {
        let req = protoc_1.MST.C2M_TransferMap_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            RoomName: Config_1.Config.GameId.Lobby,
        });
        let buffer = protoc_1.MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_TransferMap_Req, protoc_1.MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
    }
    refreshIssue() {
        this.labIssue.string = this._wingoData.currIssue.toString();
    }
    refreshModeOption() {
        this.setUnselectModeOption();
        this.setSelectModeOption(this._wingoData.currMode);
    }
    refreshLottery() {
        let lotteryInfo = this._wingoData.lotteryMap.get(this._wingoData.currMode);
        let sec = DateUtils_1.default.getRemainTimeS(this._appData.getServerTimestamp(), Number(lotteryInfo.NextTimestamp));
        G.Logger.color("模式", this._wingoData.currMode.toString(), sec.toString(), Number(lotteryInfo.NextTimestamp));
        if (sec <= BAN_BET_START_TIME) {
            this.disableBetOption();
            this.labBanBetCoundDown.string = sec.toString();
        }
        else {
            this.enableBetOption();
            this.labBanBetCoundDown.string = "";
        }
    }
    /**
     * 设置统计数据
     */
    setStat(parent, data) {
        for (let i = 0; i < parent.childrenCount; ++i) {
            let labCount = parent.getChildByName(`lab${i}`).getComponent(cc.Label);
            labCount.string = data[i].toString();
        }
    }
    refreshStat() {
        let missing = this._wingoData.getMissing();
        let avgMissing = this._wingoData.getAvgMissing();
        let frequency = this._wingoData.getFrequency();
        let maxContinued = this._wingoData.getMaxContinued();
        this.setStat(this.labMissing.node, missing);
        this.setStat(this.labAvgMissing.node, avgMissing);
        this.setStat(this.labFrequency.node, frequency);
        this.setStat(this.labMaxContinued.node, maxContinued);
    }
    refreshLink() {
        this.lsvNumRecord.set(this._wingoData.historyLotteryMap.get(this._wingoData.currMode));
        this.nodChartTren.height = Math.abs(this.lsvNumRecord.node.y) + this.lsvNumRecord.getInnerEstimateSize().height;
    }
    refreshColor() {
        this.lsvColorRecord.set(this._wingoData.historyLotteryMap.get(this._wingoData.currMode));
        this.nodCatatanCepatPlus.height = Math.abs(this.lsvColorRecord.node.y) + this.lsvColorRecord.getInnerEstimateSize().height;
    }
    refreshHistory() {
        this.refreshStat();
        this.refreshLink();
        this.refreshColor();
    }
    refreshMyRecordNodeHeight() {
        this.nodCatatanCepatPlusSaya.height = Math.abs(this.lsvMyRecord.node.y) + this.lsvMyRecord.getInnerEstimateSize().height;
    }
    clearMyRecord() {
        this.lsvMyRecord.clear();
    }
    clickBetColorOption(color) {
        let param = {
            type: protoc_1.MST.WingoBetType.Color,
            value: color,
            serviceCost: this._wingoData.cost,
        };
        Manager_1.Manager.uiManager.open({ type: WingoBetView_1.default, bundle: this.bundle, args: [param] });
    }
    clickBetNumOption(num) {
        let param = {
            type: protoc_1.MST.WingoBetType.Num,
            value: num,
            serviceCost: this._wingoData.cost,
        };
        Manager_1.Manager.uiManager.open({ type: WingoBetView_1.default, bundle: this.bundle, args: [param] });
    }
    clickMode(mode) {
        if (this._wingoData.currMode === mode) {
            return;
        }
        this._wingoData.isPlayingLotteryAnim = false;
        this.titleItemPageUser.manualRefreshGold();
        this.selectMode(mode);
    }
    onClick(ButtonName, ButtonNode) {
        switch (ButtonName) {
            case "btnClose":
                this.reqEnterLobby();
                break;
            case "btnCepatPlus":
                this.clickMode(protoc_1.MST.WingoMode.CepatPlus);
                break;
            case "btnCepat":
                this.clickMode(protoc_1.MST.WingoMode.Cepat);
                break;
            case "btnStandar":
                {
                    this.clickMode(protoc_1.MST.WingoMode.Standar);
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
                this.clickRecord(WingoModeDefine_1.WingoModeDefine.History.ChartTren);
                break;
            case "btnCatatanCepatPlus":
                this.clickRecord(WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlus);
                break;
            case "btnCatatanCeppatPlusSaya":
                this.clickRecord(WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya);
                break;
        }
    }
    C2M_GetWingoInfo_Req() {
        let req = protoc_1.MST.C2M_GetWingoInfo_Req.create({ RpcId: Manager_1.Manager.netManager.getNewSeqId() });
        let buffer = protoc_1.MST.C2M_GetWingoInfo_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_GetWingoInfo_Req, protoc_1.MST.OuterOpcode_WingoGame.C2M_GetWingoInfo_Req, buffer);
        // this.test_M2C_GetWingoInfo_Res();
    }
    C2M_GetWingoHistory_Req(mode) {
        let req = protoc_1.MST.C2M_GetWingoHistory_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            Mode: mode,
        });
        let buffer = protoc_1.MST.C2M_GetWingoHistory_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_GetWingoHistory_Req, protoc_1.MST.OuterOpcode_WingoGame.C2M_GetWingoHistory_Req, buffer);
        // this.test_M2C_GetWingoHistory_Res(mode);
    }
    C2S_WingoMyRecord(id) {
        if (TypeUtils_1.default.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }
        let req = protoc_1.MST.C2S_WingoMyRecord.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            mode: this._wingoData.currMode,
            id: id,
            count: MY_RECORD_PAGE_COUNT,
        });
        let buffer = protoc_1.MST.C2S_WingoMyRecord.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2S_WingoMyRecord, protoc_1.MST.OuterOpcode_WingoGame.C2S_WingoMyRecord, buffer);
    }
    test_M2C_GetWingoInfo_Res() {
        let controller = Manager_1.Manager.netManager.mainNode.getComponent(WingoNetController_1.default);
        let serverTimestamp = this._appData.getServerTimestamp();
        controller.onM2C_GetWingoInfo_Res({
            RpcId: Manager_1.Manager.netManager.getNewSeqId() - 1,
            Error: 0,
            Message: "",
            CepatPlusTimestamp: serverTimestamp + WingoConfig_1.WingoConfig.LotteryIntervalTime[protoc_1.MST.WingoMode.CepatPlus],
            CepatTimestamp: serverTimestamp + WingoConfig_1.WingoConfig.LotteryIntervalTime[protoc_1.MST.WingoMode.Cepat],
            StandarTimestamp: serverTimestamp + WingoConfig_1.WingoConfig.LotteryIntervalTime[protoc_1.MST.WingoMode.Standar],
            Cost: 10,
        });
    }
    test_M2C_GetWingoHistory_Res(mode) {
        let controller = Manager_1.Manager.netManager.mainNode.getComponent(WingoNetController_1.default);
        let historyInfoList = [];
        for (let i = 0; i < 100; ++i) {
            let issue = 202204261713 + i;
            let num = UtilMgr_1.UtilMgr.random(0, 9);
            let lotteryInfo = {
                Issue: issue,
                Num: num,
                Harga: 25535,
            };
            historyInfoList.push(lotteryInfo);
        }
        controller.onM2C_GetWingoHistory_Res({
            RpcId: Manager_1.Manager.netManager.getNewSeqId() - 1,
            Error: 0,
            Message: "",
            Mode: mode,
            CurrIssue: Number(historyInfoList[historyInfoList.length - 1].Issue) + 1,
            HistoryInfo: historyInfoList,
        });
    }
    test_M2C_WingoLottery_Mes() {
        for (let [k, v] of this._wingoData.lotteryMap) {
            let sec = DateUtils_1.default.getRemainTimeS(this._appData.getServerTimestamp(), Number(v.NextTimestamp));
            if (sec <= 0) {
                let num = UtilMgr_1.UtilMgr.random(0, 9);
                let controller = Manager_1.Manager.netManager.mainNode.getComponent(WingoNetController_1.default);
                controller.onM2C_WingoLottery_Mes({
                    Mode: v.Mode,
                    LotteryInfo: {
                        Issue: 0,
                        Num: num,
                        Harga: 555,
                    },
                    NextTimestamp: this._appData.getServerTimestamp() + WingoConfig_1.WingoConfig.LotteryIntervalTime[v.Mode],
                    NextIssue: 555,
                });
            }
        }
    }
    stopAllSound() {
        this.audioHelper.stopMusic();
        this.audioHelper.stopEffectByPath(WingoGameData_1.Wingo.SOUNDS.COUNT321);
        this.audioHelper.stopEffectByPath(WingoGameData_1.Wingo.SOUNDS.NUM_HIGHLIGHT);
        this.audioHelper.stopEffectByPath(WingoGameData_1.Wingo.SOUNDS.NUM_RESULT);
    }
    onDestroy() {
        super.onDestroy();
        this.stopAllSound();
        this.stopLotteryAnim();
        this.stopLotteryCountDown();
        this.stopAllHighLightAnim();
    }
    onEvent_M2C_GetWingoInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        this.startLotteryCountDown();
    }
    onEvent_M2C_GetWingoHistory_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
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
            if (this._currHistoryOption === WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya) {
                this.C2S_WingoMyRecord();
            }
        }
    }
    onEvent_M2C_WingoLottery_Mes(data) {
        if (this._wingoData.currMode === null || this._wingoData.currMode !== data.Mode) {
            return;
        }
        this.labBanBetCoundDown.string = "";
        this.refreshIssue();
        this.playLotteryAnim(data.LotteryInfo, () => {
            let historyInfoList = this._wingoData.historyLotteryMap.get(this._wingoData.currMode);
            let historyInfo = historyInfoList[historyInfoList.length - 1];
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
    onEvent_S2C_WingoMyRecord(data) {
        if (data.id === DEFAULT_FIRST_ID && data.myRecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvMyRecord.node.active = false;
        }
        else {
            this.noneItem.node.active = false;
            this.lsvMyRecord.node.active = true;
        }
        // 是否最后一页
        this._isLastPage = data.myRecordInfo.length < MY_RECORD_PAGE_COUNT;
        if (data.id === DEFAULT_FIRST_ID) {
            this._myRecordList = [].concat(data.myRecordInfo);
            this.lsvMyRecord.set(data.myRecordInfo);
        }
        else {
            this._myRecordList = this._myRecordList.concat(data.myRecordInfo);
            this.lsvMyRecord.insert(data.myRecordInfo);
        }
        this.refreshMyRecordNodeHeight();
    }
    onEvent_M2C_WingoBet_Res(data) {
        if (this._currHistoryOption === WingoModeDefine_1.WingoModeDefine.History.CatatanCepatPlusSaya) {
            this.C2S_WingoMyRecord();
        }
    }
    onEvent_M2C_TransferMap_Res(data) {
        if (data.Error === 0) {
            dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        }
        else {
            PanelHelp_1.default.showErrTip(data.Error);
        }
    }
    pullMyRecord() {
        if (this._isLastPage) {
            G.Logger.log("Wingo 浏览个人下注记录 已是最后一页 无需请求翻页");
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Common.NoData);
            return;
        }
        this.C2S_WingoMyRecord(this.getLastRecordId());
    }
    /**
     * 下拉回调
     */
    onPullBottom(target) {
        switch (this._wingoData.currPullFunc) {
            case WingoDefine_1.WingoDefine.PullBottomFunction.MY_RECORD:
                this.pullMyRecord();
                break;
        }
    }
};
__decorate([
    property(cc.Button)
], WingoGameView.prototype, "btnCepatPlus", void 0);
__decorate([
    property(cc.Button)
], WingoGameView.prototype, "btnCepat", void 0);
__decorate([
    property(cc.Button)
], WingoGameView.prototype, "btnStandar", void 0);
__decorate([
    property(cc.Node)
], WingoGameView.prototype, "nodLotteryTime", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labIssueTitle", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labIssue", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labLotteryCoundDownTitle", void 0);
__decorate([
    property(cc.Node)
], WingoGameView.prototype, "nodPlay", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labBanBetCoundDown", void 0);
__decorate([
    property(cc.Sprite)
], WingoGameView.prototype, "imgPlayBg", void 0);
__decorate([
    property(cc.Button)
], WingoGameView.prototype, "btnChartTren", void 0);
__decorate([
    property(cc.Button)
], WingoGameView.prototype, "btnCatatanCepatPlus", void 0);
__decorate([
    property(cc.Button)
], WingoGameView.prototype, "btnCatatanCeppatPlusSaya", void 0);
__decorate([
    property(cc.Node)
], WingoGameView.prototype, "nodChartTren", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labMissing", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labAvgMissing", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labFrequency", void 0);
__decorate([
    property(cc.Label)
], WingoGameView.prototype, "labMaxContinued", void 0);
__decorate([
    property(WingoLinkListView_1.default)
], WingoGameView.prototype, "lsvNumRecord", void 0);
__decorate([
    property(cc.Node)
], WingoGameView.prototype, "nodCatatanCepatPlus", void 0);
__decorate([
    property(WingoColorListView_1.default)
], WingoGameView.prototype, "lsvColorRecord", void 0);
__decorate([
    property(cc.Node)
], WingoGameView.prototype, "nodCatatanCepatPlusSaya", void 0);
__decorate([
    property(WingoMyRecordListView_1.default)
], WingoGameView.prototype, "lsvMyRecord", void 0);
__decorate([
    property(NoneItem_1.default)
], WingoGameView.prototype, "noneItem", void 0);
__decorate([
    property(WingoTitleItemPageUser_1.default)
], WingoGameView.prototype, "titleItemPageUser", void 0);
WingoGameView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], WingoGameView);
exports.default = WingoGameView;

cc._RF.pop();