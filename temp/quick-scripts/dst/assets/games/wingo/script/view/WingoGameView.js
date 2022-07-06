
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/view/WingoGameView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvdmlldy9XaW5nb0dhbWVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQTBHO0FBQzFHLDZFQUEwRTtBQUUxRSxrRkFBMkY7QUFDM0Ysb0ZBQTREO0FBQzVELDhFQUFzRDtBQUN0RCx3RkFBZ0U7QUFDaEUsZ0ZBQXdEO0FBQ3hELHlEQUE4QztBQUM5QywrREFBNEQ7QUFDNUQseUVBQW1FO0FBQ25FLGlFQUE4RDtBQUM5RCx1RUFBb0U7QUFDcEUsa0dBQTBFO0FBQzFFLHVFQUFtRjtBQUNuRiwwRUFBdUU7QUFDdkUsb0ZBQTREO0FBQzVELG9FQUFpRTtBQUVqRSxrRUFBMEM7QUFDMUMsMEZBQWtFO0FBQ2xFLHVEQUFvRDtBQUVwRCx1RkFBK0Q7QUFDL0QseUZBQWlFO0FBQ2pFLCtEQUE0RDtBQUM1RCxrRUFBMEM7QUFDMUMsaUVBQThEO0FBQzlELHNGQUE4RDtBQUM5RCwrRkFBdUU7QUFDdkUsdUZBQStEO0FBRS9ELHVEQUFvRDtBQUNwRCxrRkFBdUU7QUFFdkUscUJBQXFCO0FBQ3JCLE1BQU0sdUNBQXVDLEdBQVcsR0FBRyxDQUFDO0FBQzVELGtCQUFrQjtBQUNsQixNQUFNLCtCQUErQixHQUFXLENBQUMsQ0FBQztBQUNsRCxpQkFBaUI7QUFDakIsTUFBTSxrQkFBa0IsR0FBVyxDQUFDLENBQUM7QUFDckMsdUJBQXVCO0FBQ3ZCLE1BQU0sbUJBQW1CLEdBQVcsR0FBRyxDQUFDO0FBQ3hDLHdCQUF3QjtBQUN4QixNQUFNLHVCQUF1QixHQUFXLElBQUksQ0FBQztBQUM3QyxXQUFXO0FBQ1gsTUFBTSxtQkFBbUIsR0FBVyxHQUFHLENBQUM7QUFDeEMsV0FBVztBQUNYLE1BQU0sb0JBQW9CLEdBQVcsRUFBRSxDQUFDO0FBQ3hDLGNBQWM7QUFDZCxNQUFNLGdCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO0FBRXBDLE1BQU0sRUFBRSxPQUFPLEVB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LENBQUM7bURBQ21CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MERBQzBCO0FBRzlDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0RBQytCO0FBR25EO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ21CO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ2lCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ29CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ21CO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLDJCQUFpQixDQUFDO21EQUNtQjtBQUcvQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUMwQjtBQUc1QztJQURDLFFBQVEsQ0FBQyw0QkFBa0IsQ0FBQztxREFDcUI7QUFHbEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4REFDOEI7QUFHaEQ7SUFEQyxRQUFRLENBQUMsK0JBQXFCLENBQUM7a0RBQ2tCO0FBR2xEO0lBREMsUUFBUSxDQUFDLGtCQUFRLENBQUM7K0NBQ2U7QUFHbEM7SUFEQyxRQUFRLENBQUMsZ0NBQXNCLENBQUM7d0RBQ3dCO0FBNUV4QyxhQUFhO0lBRmpDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGFBQWEsQ0FrZ0NqQztrQkFsZ0NvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY1R5cGUsIExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCBXaW5nb05ldENvbnRyb2xsZXIgZnJvbSBcIi4uL3Byb3RvY29sL1dpbmdvTmV0Q29udHJvbGxlclwiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IHsgV2luZ28gfSBmcm9tIFwiLi4vZGF0YS9XaW5nb0dhbWVEYXRhXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBXaW5nb0NvbG9yRGVmaW5lIH0gZnJvbSBcIi4uL2RlZmluZS9XaW5nb0NvbG9yRGVmaW5lXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgRGF0ZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvRGF0ZVV0aWxzXCI7XG5pbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IFRpdGxlSXRlbVBhZ2VVc2VyIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2l0ZW0vVGl0bGVJdGVtUGFnZVVzZXJcIjtcbmltcG9ydCBXaW5nb0RhdGEgZnJvbSBcIi4uL2RhdGEvV2luZ29EYXRhXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IHsgV2luZ29Db25maWcgfSBmcm9tIFwiLi4vY29uZmlnL1dpbmdvQ29uZmlnXCI7XG5pbXBvcnQgeyBXaW5nb0ludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2UvV2luZ29JbnRlcmZhY2VcIjtcbmltcG9ydCBXaW5nb0xpbmtMaXN0VmlldyBmcm9tIFwiLi4vY29tcG9uZW50L1dpbmdvTGlua0xpc3RWaWV3XCI7XG5pbXBvcnQgV2luZ29Db2xvckxpc3RWaWV3IGZyb20gXCIuLi9jb21wb25lbnQvV2luZ29Db2xvckxpc3RWaWV3XCI7XG5pbXBvcnQgeyBXaW5nb01vZGVEZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL1dpbmdvTW9kZURlZmluZVwiO1xuaW1wb3J0IFdpbmdvQmV0VmlldyBmcm9tIFwiLi9XaW5nb0JldFZpZXdcIjtcbmltcG9ydCB7IFdpbmdvRXZlbnREZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL1dpbmdvRXZlbnREZWZpbmVcIjtcbmltcG9ydCBXaW5nb1RpdGxlSXRlbVBhZ2VVc2VyIGZyb20gXCIuL1dpbmdvVGl0bGVJdGVtUGFnZVVzZXJcIjtcbmltcG9ydCBXaW5nb015UmVjb3JkTGlzdFZpZXcgZnJvbSBcIi4uL2NvbXBvbmVudC9XaW5nb015UmVjb3JkTGlzdFZpZXdcIjtcbmltcG9ydCBOb25lSXRlbSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9pdGVtL05vbmVJdGVtXCI7XG5pbXBvcnQgTGlzdFZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vY29tcG9uZW50L0xpc3RWaWV3XCI7XG5pbXBvcnQgeyBXaW5nb0RlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvV2luZ29EZWZpbmVcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcblxuLy8g5Yi35paw5byA5aWW5YCS6K6h5pe26Ze06ZqU5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBVUERBVEVfTE9UVEVSWV9DT1VORF9ET1dOX0lOVEVSVkFMX1RJTUU6IG51bWJlciA9IDEwMDtcbi8vIOWAkuiuoeaXtumrmOS6ruW8gOWni+aXtumXtO+8iOWNleS9je+8muenku+8iVxuY29uc3QgQ09VTlRfRE9XTl9ISUdITElHSFRfU1RBUlRfVElNRTogbnVtYmVyID0gNTtcbi8vIOemgeatouS4i+azqOW8gOWni+aXtumXtO+8iOWNleS9je+8muenku+8iVxuY29uc3QgQkFOX0JFVF9TVEFSVF9USU1FOiBudW1iZXIgPSAzO1xuLy8g5q+P5qyh5Yqo55S75pWw5a2X55CD5Lqu5pqX57yp5pS+5pe26Ze077yI5Y2V5L2N77ya5q+r56eS77yJXG5jb25zdCBOVU1fQU5JTV9TQ0FMRV9USU1FOiBudW1iZXIgPSAyMDA7XG4vLyDmnIDlkI7liqjnlLvmlbDlrZflvIDlpZblkI7lgZznlZnnmoTml7bpl7TvvIjljZXkvY3vvJrmr6vnp5LvvIlcbmNvbnN0IE5VTV9MQVNUX0FOSU1fV0FJVF9USU1FOiBudW1iZXIgPSAxODAwO1xuLy8g5pWw5a2X6auY5Lqu5pS+5aSn57yp5pS+XG5jb25zdCBOVU1fSElHSExJR0hUX1NDQUxFOiBudW1iZXIgPSAxLjM7XG4vLyDkuKrkurrorrDlvZXmr4/pobXmlbDph49cbmNvbnN0IE1ZX1JFQ09SRF9QQUdFX0NPVU5UOiBudW1iZXIgPSAyMDtcbi8vIOm7mOiupOmmluasoeivt+axguWIhumhtSBJRFxuY29uc3QgREVGQVVMVF9GSVJTVF9JRDogbnVtYmVyID0gLTE7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5nb0dhbWVWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0bkNlcGF0UGx1czogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5DZXBhdDogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5TdGFuZGFyOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RMb3R0ZXJ5VGltZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJc3N1ZVRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJc3N1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTG90dGVyeUNvdW5kRG93blRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIG5vZFBsYXk6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQmFuQmV0Q291bmREb3duOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nUGxheUJnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0bkNoYXJ0VHJlbjogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5DYXRhdGFuQ2VwYXRQbHVzOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBwcml2YXRlIGJ0bkNhdGF0YW5DZXBwYXRQbHVzU2F5YTogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kQ2hhcnRUcmVuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYk1pc3Npbmc6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkF2Z01pc3Npbmc6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkZyZXF1ZW5jeTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTWF4Q29udGludWVkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoV2luZ29MaW5rTGlzdFZpZXcpXG4gICAgcHJpdmF0ZSBsc3ZOdW1SZWNvcmQ6IFdpbmdvTGlua0xpc3RWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kQ2F0YXRhbkNlcGF0UGx1czogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoV2luZ29Db2xvckxpc3RWaWV3KVxuICAgIHByaXZhdGUgbHN2Q29sb3JSZWNvcmQ6IFdpbmdvQ29sb3JMaXN0VmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIG5vZENhdGF0YW5DZXBhdFBsdXNTYXlhOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShXaW5nb015UmVjb3JkTGlzdFZpZXcpXG4gICAgcHJpdmF0ZSBsc3ZNeVJlY29yZDogV2luZ29NeVJlY29yZExpc3RWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShOb25lSXRlbSlcbiAgICBwcml2YXRlIG5vbmVJdGVtOiBOb25lSXRlbSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoV2luZ29UaXRsZUl0ZW1QYWdlVXNlcilcbiAgICBwcml2YXRlIHRpdGxlSXRlbVBhZ2VVc2VyOiBXaW5nb1RpdGxlSXRlbVBhZ2VVc2VyID0gbnVsbDtcblxuICAgIC8vIOa4uOaIj+aVsOaNrlxuICAgIHByaXZhdGUgX3dpbmdvRGF0YTogV2luZ29EYXRhID0gbnVsbDtcbiAgICAvLyDlupTnlKjmlbDmja5cbiAgICBwcml2YXRlIF9hcHBEYXRhOiBBcHBEYXRhID0gbnVsbDtcbiAgICAvLyDnlKjmiLfmlbDmja5cbiAgICBwcml2YXRlIF91c2VyRGF0YTogVXNlckRhdGEgPSBudWxsO1xuICAgIC8vIOW8gOWlluWKqOeUu1xuICAgIHByaXZhdGUgX2xvdHRlcnlUd2VlbjogY2MuVHdlZW4gPSBudWxsO1xuICAgIC8vIOmrmOS6ruWKqOeUuyBNYXBcbiAgICBwcml2YXRlIF9oaWdobGlnaHRUd2Vlbk1hcDogTWFwPG51bWJlciwgV2luZ29JbnRlcmZhY2UuSGlnaGxpZ2h0VHdlZW4+ID0gbnVsbDtcbiAgICAvLyDlvZPliY3ljoblj7LpgInpoblcbiAgICBwcml2YXRlIF9jdXJySGlzdG9yeU9wdGlvbjogV2luZ29Nb2RlRGVmaW5lLkhpc3RvcnkgPSBudWxsO1xuICAgIC8vIOaYr+WQpuacgOWQjuS4gOmhtVxuICAgIHByaXZhdGUgX2lzTGFzdFBhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyDkuKrkurrorrDlvZXliJfooahcbiAgICBwcml2YXRlIF9teVJlY29yZExpc3Q6IE1TVC5JV2luZ29NeVJlY29yZEluZm9bXSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwicHJlZmFicy9XaW5nb0dhbWVWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgZGlzcGF0Y2hFbnRlckNvbXBsZXRlKHsgdHlwZTogTG9naWNUeXBlLkdBTUUsIHZpZXdzOiBbdGhpc10gfSk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheU11c2ljKFdpbmdvLlNPVU5EUy5CR00sIHRoaXMuYnVuZGxlKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgICAgdGhpcy5DMk1fR2V0V2luZ29JbmZvX1JlcSgpO1xuICAgICAgICB0aGlzLnNlbGVjdE1vZGUoTVNULldpbmdvTW9kZS5DZXBhdFBsdXMsIHRydWUpO1xuICAgICAgICB0aGlzLnNlbGVjdE1vZGUoTVNULldpbmdvTW9kZS5DZXBhdCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0TW9kZShNU1QuV2luZ29Nb2RlLlN0YW5kYXIsIHRydWUpO1xuICAgICAgICB0aGlzLmNsaWNrUmVjb3JkKFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNoYXJ0VHJlbik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcblxuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl93aW5nb0RhdGEgPSBHLkRhdGFNZ3IuZ2V0KFdpbmdvRGF0YSk7XG4gICAgICAgIHRoaXMuX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICB0aGlzLl91c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICB0aGlzLl9oaWdobGlnaHRUd2Vlbk1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fbXlSZWNvcmRMaXN0ID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0TG90dGVyeVRpbWUoKTtcbiAgICAgICAgdGhpcy5lbmFibGVCZXRPcHRpb24oKTtcbiAgICAgICAgdGhpcy5pbml0SGlzdG9yeSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE1vZGVPcHRpb24ocGFyZW50OiBjYy5Ob2RlKTogdm9pZCB7XG4gICAgICAgIGxldCBsYWJUaXRsZTogY2MuTGFiZWwgPSBwYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJUaXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsYWJUaXRsZS5ub2RlLmNvbG9yID0gV2luZ29Db2xvckRlZmluZS5UZXh0LkdyYXk7XG4gICAgICAgIGxldCBpbWdMaW5lOiBjYy5TcHJpdGUgPSBsYWJUaXRsZS5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nTGluZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgaW1nTGluZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBsZXQgbGFiVGltZTogY2MuTGFiZWwgPSBwYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJUaW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYlRpbWUubm9kZS5jb2xvciA9IFdpbmdvQ29sb3JEZWZpbmUuVGV4dC5HcmF5O1xuICAgICAgICBsYWJUaW1lLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmFibGVDb2xvck9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgdiBvZiBXaW5nb0NvbmZpZy5Db2xvck9wdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIGxldCBidG5DOiBjYy5CdXR0b24gPSB0aGlzLm5vZFBsYXkuZ2V0Q2hpbGRCeU5hbWUodikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgICAgICBsZXQgbm9kTWFzazogY2MuTm9kZSA9IGJ0bkMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ01hc2tcIik7XG4gICAgICAgICAgICBub2RNYXNrLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBidG5DLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuYWJsZU51bU9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgdiBvZiBXaW5nb0NvbmZpZy5OdW1PcHRpb25MaXN0KSB7XG4gICAgICAgICAgICBsZXQgYnRuTjogY2MuQnV0dG9uID0gdGhpcy5ub2RQbGF5LmdldENoaWxkQnlOYW1lKHYpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgICAgbGV0IG5vZEJhcjogY2MuTm9kZSA9IGJ0bk4ubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNwZUJhclwiKTtcbiAgICAgICAgICAgIG5vZEJhci5jb2xvciA9IFdpbmdvQ29sb3JEZWZpbmUuQmV0T3B0aW9uLkVOQUJMRTtcbiAgICAgICAgICAgIG5vZEJhci5zY2FsZSA9IDE7XG4gICAgICAgICAgICBidG5OLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuYWJsZUJldE9wZXJhdGUoKTogdm9pZCB7XG4gICAgICAgIGRpc3BhdGNoKFdpbmdvRXZlbnREZWZpbmUuV2luZ29TdGFydEJldCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmFibGVCZXRPcHRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nUGxheUJnLm5vZGUuY29sb3IgPSBXaW5nb0NvbG9yRGVmaW5lLkJldE9wdGlvbi5FTkFCTEU7XG4gICAgICAgIHRoaXMuZW5hYmxlQ29sb3JPcHRpb24oKTtcbiAgICAgICAgdGhpcy5lbmFibGVOdW1PcHRpb24oKTtcbiAgICAgICAgdGhpcy5lbmFibGVCZXRPcGVyYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRCZXRPcHRpb24oKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGRhcmtCZXRPcHRpb24oKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRIaXN0b3J5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRIaXN0b3J5T3B0aW9uKHRoaXMuYnRuQ2hhcnRUcmVuLm5vZGUpO1xuICAgICAgICB0aGlzLmluaXRIaXN0b3J5T3B0aW9uKHRoaXMuYnRuQ2F0YXRhbkNlcGF0UGx1cy5ub2RlKTtcbiAgICAgICAgdGhpcy5pbml0SGlzdG9yeU9wdGlvbih0aGlzLmJ0bkNhdGF0YW5DZXBwYXRQbHVzU2F5YS5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RDaGFydFRyZW4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kQ2F0YXRhbkNlcGF0UGx1cy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc2FibGVDb2xvck9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgdiBvZiBXaW5nb0NvbmZpZy5Db2xvck9wdGlvbkxpc3QpIHtcbiAgICAgICAgICAgIGxldCBidG5DOiBjYy5CdXR0b24gPSB0aGlzLm5vZFBsYXkuZ2V0Q2hpbGRCeU5hbWUodikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgICAgICBsZXQgbm9kTWFzazogY2MuTm9kZSA9IGJ0bkMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ01hc2tcIik7XG4gICAgICAgICAgICBub2RNYXNrLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIGJ0bkMuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc2FibGVOdW1PcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGZvciAobGV0IHYgb2YgV2luZ29Db25maWcuTnVtT3B0aW9uTGlzdCkge1xuICAgICAgICAgICAgbGV0IGJ0bk46IGNjLkJ1dHRvbiA9IHRoaXMubm9kUGxheS5nZXRDaGlsZEJ5TmFtZSh2KS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcbiAgICAgICAgICAgIGxldCBub2RCYXI6IGNjLk5vZGUgPSBidG5OLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcGVCYXJcIik7XG4gICAgICAgICAgICBub2RCYXIuY29sb3IgPSBXaW5nb0NvbG9yRGVmaW5lLkJldE9wdGlvbi5ESVNBQkxFO1xuICAgICAgICAgICAgbm9kQmFyLnNjYWxlID0gMTtcbiAgICAgICAgICAgIGJ0bk4uaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRpc2FibGVCZXRPcGVyYXRlKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXNhYmxlQmV0T3B0aW9uKCk6IHZvaWQge1xuICAgICAgICBkaXNwYXRjaChXaW5nb0V2ZW50RGVmaW5lLldpbmdvU3RvcEJldCk7XG4gICAgICAgIHRoaXMuaW1nUGxheUJnLm5vZGUuY29sb3IgPSBXaW5nb0NvbG9yRGVmaW5lLkJldE9wdGlvbi5ESVNBQkxFO1xuICAgICAgICB0aGlzLmRpc2FibGVDb2xvck9wdGlvbigpO1xuICAgICAgICB0aGlzLmRpc2FibGVOdW1PcHRpb24oKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlQmV0T3BlcmF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaSreaUvuaVsOWtl+aYr+WQpumrmOS6ruW5tue8qeaUvlxuICAgICAqIEBwYXJhbSBudW0ge251bWJlcn0g5pWw5a2XXG4gICAgICogQHBhcmFtIGlzTGlnaGxpZ2h0IHtib29sZWFufSDmmK/lkKbpq5jkuq5cbiAgICAgKi9cbiAgICBwcml2YXRlIHBsYXlOdW1MaWdobGlnaHRBbmRTY2FsZUFuaW0obnVtOiBudW1iZXIsIGlzTGlnaGxpZ2h0OiBib29sZWFuKTogY2MuVHdlZW4ge1xuICAgICAgICBpZiAobnVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbm9kQmFyOiBjYy5Ob2RlID0gdGhpcy5ub2RQbGF5LmdldENoaWxkQnlOYW1lKGBidG5OJHtudW19YCkuZ2V0Q2hpbGRCeU5hbWUoXCJzcGVCYXJcIik7XG5cbiAgICAgICAgbGV0IHNjYWxlOiBudW1iZXIgPSAxO1xuICAgICAgICBsZXQgY29sb3I6IGNjLkNvbG9yID0gV2luZ29Db2xvckRlZmluZS5CZXRPcHRpb24uRElTQUJMRTtcbiAgICAgICAgaWYgKGlzTGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICBzY2FsZSA9IE5VTV9ISUdITElHSFRfU0NBTEU7XG4gICAgICAgICAgICBjb2xvciA9IFdpbmdvQ29sb3JEZWZpbmUuQmV0T3B0aW9uLkVOQUJMRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYy50d2Vlbihub2RCYXIpXG4gICAgICAgICAgICAudG8oTlVNX0FOSU1fU0NBTEVfVElNRSAvIDEwMDAsIHsgc2NhbGU6IHNjYWxlLCBjb2xvcjogY29sb3IgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VW5zZWxlY3RNb2RlT3B0aW9uKG1vZGU/OiBNU1QuV2luZ29Nb2RlKTogdm9pZCB7XG4gICAgICAgIGlmIChUeXBlVXRpbHMuaXNOdWxsKG1vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFVuc2VsZWN0TW9kZU9wdGlvbihNU1QuV2luZ29Nb2RlLkNlcGF0UGx1cyk7XG4gICAgICAgICAgICB0aGlzLnNldFVuc2VsZWN0TW9kZU9wdGlvbihNU1QuV2luZ29Nb2RlLkNlcGF0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0VW5zZWxlY3RNb2RlT3B0aW9uKE1TVC5XaW5nb01vZGUuU3RhbmRhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgTVNULldpbmdvTW9kZS5DZXBhdFBsdXM6XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHRoaXMuYnRuQ2VwYXRQbHVzLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgTVNULldpbmdvTW9kZS5DZXBhdDpcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DZXBhdC5ub2RlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIE1TVC5XaW5nb01vZGUuU3RhbmRhcjpcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5TdGFuZGFyLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxhYlRpdGxlOiBjYy5MYWJlbCA9IHBhcmVudC5nZXRDaGlsZEJ5TmFtZShcImxhYlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBsYWJUaXRsZS5ub2RlLmNvbG9yID0gV2luZ29Db2xvckRlZmluZS5UZXh0LkdyYXk7XG4gICAgICAgICAgICBsZXQgaW1nTGluZTogY2MuU3ByaXRlID0gbGFiVGl0bGUubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ0xpbmVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICBpbWdMaW5lLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNlbGVjdE1vZGVPcHRpb24obW9kZTogTVNULldpbmdvTW9kZSk6IHZvaWQge1xuICAgICAgICBpZiAobW9kZSA9PT0gbnVsbCB8fCBtb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG1vZGUgPSBNU1QuV2luZ29Nb2RlLkNlcGF0UGx1cztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnQ6IGNjLk5vZGUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgTVNULldpbmdvTW9kZS5DZXBhdFBsdXM6XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DZXBhdFBsdXMubm9kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTVNULldpbmdvTW9kZS5DZXBhdDpcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmJ0bkNlcGF0Lm5vZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1TVC5XaW5nb01vZGUuU3RhbmRhcjpcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmJ0blN0YW5kYXIubm9kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFiVGl0bGU6IGNjLkxhYmVsID0gcGFyZW50LmdldENoaWxkQnlOYW1lKFwibGFiVGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiVGl0bGUubm9kZS5jb2xvciA9IFdpbmdvQ29sb3JEZWZpbmUuVGV4dC5XSElURTtcbiAgICAgICAgbGV0IGltZ0xpbmU6IGNjLlNwcml0ZSA9IGxhYlRpdGxlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdMaW5lXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpbWdMaW5lLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrUmVjb3JkKG1vZGU6IFdpbmdvTW9kZURlZmluZS5IaXN0b3J5KTogdm9pZCB7XG4gICAgICAgIGlmIChtb2RlID09PSB0aGlzLl9jdXJySGlzdG9yeU9wdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGUgPT09IFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNhdGF0YW5DZXBhdFBsdXNTYXlhKSB7XG4gICAgICAgICAgICB0aGlzLl93aW5nb0RhdGEuY3VyclB1bGxGdW5jID0gV2luZ29EZWZpbmUuUHVsbEJvdHRvbUZ1bmN0aW9uLk1ZX1JFQ09SRDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3dpbmdvRGF0YS5jdXJyUHVsbEZ1bmMgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRVbnNlbGVjdEhpc3RvcnlPcHRpb24oKTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RIaXN0b3J5T3B0aW9uKG1vZGUpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJIaXN0b3J5T3B0aW9uID0gbW9kZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNlbGVjdEhpc3RvcnlPcHRpb24obW9kZT86IFdpbmdvTW9kZURlZmluZS5IaXN0b3J5KTogdm9pZCB7XG4gICAgICAgIGxldCBwYXJlbnQ6IGNjLk5vZGUgPSBudWxsO1xuICAgICAgICBsZXQgbHN2Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgY2FzZSBXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DaGFydFRyZW46XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DaGFydFRyZW4ubm9kZTtcbiAgICAgICAgICAgICAgICBsc3ZOb2RlID0gdGhpcy5ub2RDaGFydFRyZW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNhdGF0YW5DZXBhdFBsdXM6XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DYXRhdGFuQ2VwYXRQbHVzLm5vZGU7XG4gICAgICAgICAgICAgICAgbHN2Tm9kZSA9IHRoaXMubm9kQ2F0YXRhbkNlcGF0UGx1cztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgV2luZ29Nb2RlRGVmaW5lLkhpc3RvcnkuQ2F0YXRhbkNlcGF0UGx1c1NheWE6XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DYXRhdGFuQ2VwcGF0UGx1c1NheWEubm9kZTtcbiAgICAgICAgICAgICAgICBsc3ZOb2RlID0gdGhpcy5ub2RDYXRhdGFuQ2VwYXRQbHVzU2F5YTtcbiAgICAgICAgICAgICAgICB0aGlzLkMyU19XaW5nb015UmVjb3JkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhYlRpdGxlOiBjYy5MYWJlbCA9IHBhcmVudC5nZXRDaGlsZEJ5TmFtZShcImxhYlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYlRpdGxlLm5vZGUuY29sb3IgPSBXaW5nb0NvbG9yRGVmaW5lLkhpc3Ryb3lPcHRpb25UZXh0LlNFTEVDVEVEO1xuICAgICAgICBsZXQgaW1nTGluZTogY2MuU3ByaXRlID0gbGFiVGl0bGUubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ0xpbmVcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGltZ0xpbmUubm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIGlmIChsc3ZOb2RlKSB7XG4gICAgICAgICAgICBsc3ZOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFVuc2VsZWN0SGlzdG9yeU9wdGlvbihtb2RlPzogV2luZ29Nb2RlRGVmaW5lLkhpc3RvcnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKFR5cGVVdGlscy5pc051bGwobW9kZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VW5zZWxlY3RIaXN0b3J5T3B0aW9uKFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNoYXJ0VHJlbik7XG4gICAgICAgICAgICB0aGlzLnNldFVuc2VsZWN0SGlzdG9yeU9wdGlvbihXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DYXRhdGFuQ2VwYXRQbHVzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VW5zZWxlY3RIaXN0b3J5T3B0aW9uKFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNhdGF0YW5DZXBhdFBsdXNTYXlhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnQ6IGNjLk5vZGUgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGxzdk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DaGFydFRyZW46XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHRoaXMuYnRuQ2hhcnRUcmVuLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxzdk5vZGUgPSB0aGlzLm5vZENoYXJ0VHJlbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DYXRhdGFuQ2VwYXRQbHVzOlxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmJ0bkNhdGF0YW5DZXBhdFBsdXMubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbHN2Tm9kZSA9IHRoaXMubm9kQ2F0YXRhbkNlcGF0UGx1cztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DYXRhdGFuQ2VwYXRQbHVzU2F5YTpcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DYXRhdGFuQ2VwcGF0UGx1c1NheWEubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbHN2Tm9kZSA9IHRoaXMubm9kQ2F0YXRhbkNlcGF0UGx1c1NheWE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGxhYlRpdGxlOiBjYy5MYWJlbCA9IHBhcmVudC5nZXRDaGlsZEJ5TmFtZShcImxhYlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBsYWJUaXRsZS5ub2RlLmNvbG9yID0gV2luZ29Db2xvckRlZmluZS5IaXN0cm95T3B0aW9uVGV4dC5VTlNFTEVDVDtcbiAgICAgICAgICAgIGxldCBpbWdMaW5lOiBjYy5TcHJpdGUgPSBsYWJUaXRsZS5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nTGluZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgIGltZ0xpbmUubm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGxzdk5vZGUpIHtcbiAgICAgICAgICAgICAgICBsc3ZOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q3VyckNvdW5kRG93bigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IDQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IG5vZFRpbWVCZzogY2MuTm9kZSA9IHRoaXMubm9kTG90dGVyeVRpbWUuZ2V0Q2hpbGRCeU5hbWUoYGltZ1RpbWVCZyR7aX1gKTtcbiAgICAgICAgICAgIGxldCBsYWJUaW1lOiBjYy5MYWJlbCA9IG5vZFRpbWVCZy5nZXRDaGlsZEJ5TmFtZShcImxhYlRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGxhYlRpbWUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEhpc3RvcnlPcHRpb24ocGFyZW50OiBjYy5Ob2RlKTogdm9pZCB7XG4gICAgICAgIHBhcmVudC5nZXRDaGlsZEJ5TmFtZShgbGFiVGl0bGVgKS5nZXRDaGlsZEJ5TmFtZShgaW1nTGluZWApLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdExvdHRlcnlUaW1lKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRNb2RlT3B0aW9uKHRoaXMuYnRuQ2VwYXRQbHVzLm5vZGUpO1xuICAgICAgICB0aGlzLmluaXRNb2RlT3B0aW9uKHRoaXMuYnRuQ2VwYXQubm9kZSk7XG4gICAgICAgIHRoaXMuaW5pdE1vZGVPcHRpb24odGhpcy5idG5TdGFuZGFyLm5vZGUpO1xuICAgICAgICB0aGlzLmxhYklzc3VlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMuaW5pdEN1cnJDb3VuZERvd24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5leHRWaWV3KCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0dldFdpbmdvSW5mb19SZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19HZXRXaW5nb0luZm9fUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0dldFdpbmdvSGlzdG9yeV9SZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19HZXRXaW5nb0hpc3RvcnlfUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX1dpbmdvTG90dGVyeV9NZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19XaW5nb0xvdHRlcnlfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfUzJDX1dpbmdvTXlSZWNvcmRcIiwgdGhpcy5vbkV2ZW50X1MyQ19XaW5nb015UmVjb3JkKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX1dpbmdvQmV0X1Jlc1wiLCB0aGlzLm9uRXZlbnRfTTJDX1dpbmdvQmV0X1Jlcyk7XG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzXCIsIHRoaXMub25FdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzKTtcbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnRpdGxlSXRlbVBhZ2VVc2VyLmxhbmd1YWdlUGFnZU5hbWUoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJQYWdlTmFtZVwiLCB0cnVlKSk7XG4gICAgICAgIHRoaXMuYnRuQ2VwYXRQbHVzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJUaXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJidG5DZXBhdFBsdXNcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuYnRuQ2VwYXQubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImJ0bkNlcGF0XCIsIHRydWUpO1xuICAgICAgICB0aGlzLmJ0blN0YW5kYXIubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImJ0blN0YW5kYXJcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiSXNzdWVUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiSXNzdWVUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJMb3R0ZXJ5Q291bmREb3duVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkxvdHRlcnlDb3VuZERvd25UaXRsZVwiLCB0cnVlKTtcblxuICAgICAgICBmb3IgKGxldCB2IG9mIFdpbmdvQ29uZmlnLkNvbG9yT3B0aW9uTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5ub2RQbGF5LmdldENoaWxkQnlOYW1lKHYpLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZSh2LCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnRuQ2VwYXQubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYlRpdGxlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiYnRuQ2VwYXRcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuYnRuQ2F0YXRhbkNlcGF0UGx1cy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiVGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJidG5DYXRhdGFuQ2VwYXRQbHVzXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmJ0bkNhdGF0YW5DZXBwYXRQbHVzU2F5YS5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiVGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJidG5DYXRhdGFuQ2VwcGF0UGx1c1NheWFcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RNb2RlKG1vZGU6IE1TVC5XaW5nb01vZGUsIGlzRmlyc3Q6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl93aW5nb0RhdGEuaXNGaXJzdCA9IGlzRmlyc3Q7XG4gICAgICAgIHRoaXMuQzJNX0dldFdpbmdvSGlzdG9yeV9SZXEobW9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRMb3R0ZXJ5Q291bnREb3duKG1vZGU6IE1TVC5XaW5nb01vZGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGxvdHRlcnlJbmZvOiBNU1QuSU0yQ19XaW5nb0xvdHRlcnlfTWVzID0gdGhpcy5fd2luZ29EYXRhLmxvdHRlcnlNYXAuZ2V0KG1vZGUpO1xuICAgICAgICBsZXQgdGltZXN0YW1wOiBudW1iZXIgPSBOdW1iZXIobG90dGVyeUluZm8uTmV4dFRpbWVzdGFtcCk7XG4gICAgICAgIGxldCBwYXJlbnQ6IGNjLk5vZGUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgTVNULldpbmdvTW9kZS5DZXBhdFBsdXM6XG4gICAgICAgICAgICAgICAgcGFyZW50ID0gdGhpcy5idG5DZXBhdFBsdXMubm9kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTVNULldpbmdvTW9kZS5DZXBhdDpcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmJ0bkNlcGF0Lm5vZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1TVC5XaW5nb01vZGUuU3RhbmRhcjpcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSB0aGlzLmJ0blN0YW5kYXIubm9kZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsYWJUaW1lOiBjYy5MYWJlbCA9IHBhcmVudC5nZXRDaGlsZEJ5TmFtZShcImxhYlRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiVGltZS5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0UmVtYWluVGltZUhNUyh0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpLCB0aW1lc3RhbXApO1xuXG4gICAgICAgIGxldCBzZWM6IG51bWJlciA9IE1hdGguZmxvb3IoKHRpbWVzdGFtcCAtIHRoaXMuX2FwcERhdGEuZ2V0U2VydmVyVGltZXN0YW1wKCkpIC8gMTAwMCk7XG4gICAgICAgIGlmIChzZWMgPD0gQ09VTlRfRE9XTl9ISUdITElHSFRfU1RBUlRfVElNRSkge1xuICAgICAgICAgICAgbGFiVGltZS5ub2RlLmNvbG9yID0gV2luZ29Db2xvckRlZmluZS5UZXh0LldISVRFO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFiVGltZS5ub2RlLmNvbG9yID0gV2luZ29Db2xvckRlZmluZS5UZXh0LkdyYXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE51bUhpZ2hsaWdodChudW06IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm5vZFBsYXkuZ2V0Q2hpbGRCeU5hbWUoYGJ0bk4ke251bX1gKS5nZXRDaGlsZEJ5TmFtZShcInNwZUJhclwiKS5jb2xvciA9IFdpbmdvQ29sb3JEZWZpbmUuQmV0T3B0aW9uLkVOQUJMRTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGdldENvbG9yTWFwRXhpc3QoY29sb3I6IE1TVC5XaW5nb0NvbG9yKTogbnVtYmVyW10ge1xuICAgIC8vICAgICBsZXQgY29sb3JLZXlMaXN0OiBudW1iZXJbXSA9IFtdO1xuICAgIC8vICAgICBmb3IgKGxldCBpIGluIFdpbmdvQ29uZmlnLkNvbG9yTWFwKSB7XG4gICAgLy8gICAgICAgICBsZXQgY29sb3JNYXA6IE1TVC5XaW5nb0NvbG9yW10gPSBXaW5nb0NvbmZpZy5Db2xvck1hcFtpXTtcbiAgICAvLyAgICAgICAgIGlmIChjb2xvck1hcC5pbmRleE9mKGNvbG9yKSAhPT0gLTEpIHtcbiAgICAvLyAgICAgICAgICAgICBjb2xvcktleUxpc3QucHVzaChOdW1iZXIoaSkpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBjb2xvcktleUxpc3Q7XG4gICAgLy8gfVxuXG4gICAgcHJpdmF0ZSBzZXRDb2xvckhpZ2hsaWdodChjb2xvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGxldCBjb2xvckxpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgIC8vIGZvciAobGV0IHYgb2YgY29sb3JJbmZvKSB7XG4gICAgICAgIC8vICAgICBjb2xvckxpc3QgPSBjb2xvckxpc3QuY29uY2F0KHRoaXMuZ2V0Q29sb3JNYXBFeGlzdCh2KSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBjb2xvckxpc3QgPSBjb2xvckxpc3QuZmlsdGVyKCh2YWx1ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIC8vICAgICByZXR1cm4gY29sb3JMaXN0LmluZGV4T2YodmFsdWUpID09PSBpbmRleDtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gZm9yIChsZXQgdiBvZiBjb2xvckxpc3QpIHtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kUGxheS5nZXRDaGlsZEJ5TmFtZShgYnRuQyR7dn1gKS5nZXRDaGlsZEJ5TmFtZShcImltZ01hc2tcIikuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIC8vIH1cblxuICAgICAgICB0aGlzLm5vZFBsYXkuZ2V0Q2hpbGRCeU5hbWUoYGJ0bkMke2NvbG9yfWApLmdldENoaWxkQnlOYW1lKFwiaW1nTWFza1wiKS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldExvdHRlcnlIaWdobGlnaHQoaW5mbzogTVNULklXaW5nb0hpc3RvcnlJbmZvKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0TnVtSGlnaGxpZ2h0KGluZm8uTnVtKTtcblxuICAgICAgICBmb3IgKGxldCB2IG9mIFdpbmdvQ29uZmlnLk51bUJ5Q29sb3JbaW5mby5OdW1dKSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbG9ySGlnaGxpZ2h0KHYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMYXN0UmVjb3JkSWQoKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGlkOiBudW1iZXIgPSBERUZBVUxUX0ZJUlNUX0lEO1xuICAgICAgICBpZiAodGhpcy5fbXlSZWNvcmRMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBsYXN0UmVjb3JkRGF0YTogTVNULklXaW5nb015UmVjb3JkSW5mbyA9IHRoaXMuX215UmVjb3JkTGlzdFt0aGlzLl9teVJlY29yZExpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZCA9IGxhc3RSZWNvcmREYXRhLmlkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUmVmcmVzaE15UmVjb3JkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyckhpc3RvcnlPcHRpb24gPT09IFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNhdGF0YW5DZXBhdFBsdXNTYXlhICYmXG4gICAgICAgICAgICAhVHlwZVV0aWxzLmlzTnVsbCh0aGlzLl9teVJlY29yZExpc3QpICYmXG4gICAgICAgICAgICB0aGlzLl9teVJlY29yZExpc3QubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgIXRoaXMuX215UmVjb3JkTGlzdFswXS5pc0ZpbmlzaDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUN1cnJNb2RlTG90dGVyeVRpbWUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl93aW5nb0RhdGEuY3Vyck1vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsb3R0ZXJ5SW5mbzogTVNULklNMkNfV2luZ29Mb3R0ZXJ5X01lcyA9IHRoaXMuX3dpbmdvRGF0YS5sb3R0ZXJ5TWFwLmdldCh0aGlzLl93aW5nb0RhdGEuY3Vyck1vZGUpO1xuICAgICAgICAgICAgbGV0IHN0clRpbWU6IHN0cmluZyA9IERhdGVVdGlscy5nZXRSZW1haW5UaW1lTVModGhpcy5fYXBwRGF0YS5nZXRTZXJ2ZXJUaW1lc3RhbXAoKSwgTnVtYmVyKGxvdHRlcnlJbmZvLk5leHRUaW1lc3RhbXApKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZFRpbWVCZzogY2MuTm9kZSA9IHRoaXMubm9kTG90dGVyeVRpbWUuZ2V0Q2hpbGRCeU5hbWUoYGltZ1RpbWVCZyR7aX1gKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiVGltZTogY2MuTGFiZWwgPSBub2RUaW1lQmcuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJUaW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgbGFiVGltZS5zdHJpbmcgPSBzdHJUaW1lW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVCYW5CZXRPcHRpb25BbmRUaW1lKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fd2luZ29EYXRhLmN1cnJNb2RlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbG90dGVyeUluZm86IE1TVC5JTTJDX1dpbmdvTG90dGVyeV9NZXMgPSB0aGlzLl93aW5nb0RhdGEubG90dGVyeU1hcC5nZXQodGhpcy5fd2luZ29EYXRhLmN1cnJNb2RlKTtcbiAgICAgICAgICAgIGxldCBzZWM6IG51bWJlciA9IERhdGVVdGlscy5nZXRSZW1haW5UaW1lUyh0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpLCBOdW1iZXIobG90dGVyeUluZm8uTmV4dFRpbWVzdGFtcCkpO1xuICAgICAgICAgICAgaWYgKHNlYyA8PSBCQU5fQkVUX1NUQVJUX1RJTUUgJiYgc2VjICE9PSBOdW1iZXIodGhpcy5sYWJCYW5CZXRDb3VuZERvd24uc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUJldE9wdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiQmFuQmV0Q291bmREb3duLnN0cmluZyA9IHNlYy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChzZWMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChXaW5nby5TT1VORFMuQ09VTlQzMjEsIHRoaXMuYnVuZGxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUxvdHRlcnlDb3VudERvd24oKTogdm9pZCB7XG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHLkxvZ2dlci5jb2xvcihcIuacjeWKoeWZqOaXtumXtOaIs1wiLCBgJHt0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpfWApO1xuXG5cbiAgICAgICAgdGhpcy5zZXRMb3R0ZXJ5Q291bnREb3duKE1TVC5XaW5nb01vZGUuQ2VwYXRQbHVzKTtcbiAgICAgICAgdGhpcy5zZXRMb3R0ZXJ5Q291bnREb3duKE1TVC5XaW5nb01vZGUuQ2VwYXQpO1xuICAgICAgICB0aGlzLnNldExvdHRlcnlDb3VudERvd24oTVNULldpbmdvTW9kZS5TdGFuZGFyKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJNb2RlTG90dGVyeVRpbWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVCYW5CZXRPcHRpb25BbmRUaW1lKCk7XG5cbiAgICAgICAgLy8gdGhpcy50ZXN0X00yQ19XaW5nb0xvdHRlcnlfTWVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ZCv5Yqo5byA5aWW5YCS6K6h5pe2XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGFydExvdHRlcnlDb3VudERvd24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RvcExvdHRlcnlDb3VudERvd24oKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZUxvdHRlcnlDb3VudERvd24sIFVQREFURV9MT1RURVJZX0NPVU5EX0RPV05fSU5URVJWQUxfVElNRSAvIDEwMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWBnOatouW8gOWlluWAkuiuoeaXtlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RvcExvdHRlcnlDb3VudERvd24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnVwZGF0ZUxvdHRlcnlDb3VudERvd24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEFsbEhpZ2hMaWdodEFuaW0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hpZ2hsaWdodFR3ZWVuTWFwLmZvckVhY2goKHR3ZWVuRGF0YTogV2luZ29JbnRlcmZhY2UuSGlnaGxpZ2h0VHdlZW4pID0+IHtcbiAgICAgICAgICAgIHR3ZWVuRGF0YS5wcmV2ICYmIHR3ZWVuRGF0YS5wcmV2LnN0b3AoKTtcbiAgICAgICAgICAgIHR3ZWVuRGF0YS5jdXJyICYmIHR3ZWVuRGF0YS5jdXJyLnN0b3AoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pKt5pS+5byA5aWW5Yqo55S7XG4gICAgICogQHBhcmFtIGluZm8ge01TVC5JV2luZ29Mb3R0ZXJ5SW5mb30g5byA5aWW5L+h5oGvXG4gICAgICovXG4gICAgcHJpdmF0ZSBwbGF5TG90dGVyeUFuaW0oaW5mbzogTVNULklXaW5nb0hpc3RvcnlJbmZvLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3dpbmdvRGF0YS5pc1BsYXlpbmdMb3R0ZXJ5QW5pbSA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZU51bU9wdGlvbigpO1xuXG4gICAgICAgIHRoaXMuX2xvdHRlcnlUd2VlbiA9IGNjLnR3ZWVuKHt9KTtcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IFdpbmdvQ29uZmlnLk51bUFuaW1PcmRlci5sZW5ndGggKyAoV2luZ29Db25maWcuTnVtQW5pbU9yZGVyLmluZGV4T2YoaW5mby5OdW0pICsgMSk7ICsraSkge1xuICAgICAgICAgICAgbGV0IGN1cnI6IG51bWJlciA9IFdpbmdvQ29uZmlnLk51bUFuaW1PcmRlcltpICUgV2luZ29Db25maWcuTnVtQW5pbU9yZGVyLmxlbmd0aF07XG4gICAgICAgICAgICBsZXQgcHJldjogbnVtYmVyID0gV2luZ29Db25maWcuTnVtQW5pbU9yZGVyWyhpIC0gMSkgJSBXaW5nb0NvbmZpZy5OdW1BbmltT3JkZXIubGVuZ3RoXTtcbiAgICAgICAgICAgIHRoaXMuX2xvdHRlcnlUd2VlblxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZUd2VlbjogY2MuVHdlZW4gPSB0aGlzLnBsYXlOdW1MaWdobGlnaHRBbmRTY2FsZUFuaW0ocHJldiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VyclR3ZWVuOiBjYy5Ud2VlbiA9IHRoaXMucGxheU51bUxpZ2hsaWdodEFuZFNjYWxlQW5pbShjdXJyLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdHdlZW5EYXRhOiBXaW5nb0ludGVyZmFjZS5IaWdobGlnaHRUd2VlbiA9IHRoaXMuX2hpZ2hsaWdodFR3ZWVuTWFwLmdldChpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHdlZW5EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2VlbkRhdGEucHJldiAmJiB0d2VlbkRhdGEucHJldi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0d2VlbkRhdGEuY3VyciAmJiB0d2VlbkRhdGEuY3Vyci5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRUd2Vlbk1hcC5kZWxldGUoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRUd2Vlbk1hcC5zZXQoaSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldjogcHJldlR3ZWVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycjogY3VyclR3ZWVuLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFdpbmdvLlNPVU5EUy5OVU1fSElHSExJR0hULCB0aGlzLmJ1bmRsZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZGVsYXkoTlVNX0FOSU1fU0NBTEVfVElNRSAvIDEwMDApXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHdlZW5EYXRhOiBXaW5nb0ludGVyZmFjZS5IaWdobGlnaHRUd2VlbiA9IHRoaXMuX2hpZ2hsaWdodFR3ZWVuTWFwLmdldChpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR3ZWVuRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5EYXRhLnByZXYgJiYgdHdlZW5EYXRhLnByZXYuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5EYXRhLnByZXYgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5EYXRhLmN1cnIgJiYgdHdlZW5EYXRhLmN1cnIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5EYXRhLmN1cnIgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0VHdlZW5NYXAuZGVsZXRlKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb3R0ZXJ5VHdlZW5cbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvdHRlcnlIaWdobGlnaHQoaW5mbyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFdpbmdvLlNPVU5EUy5OVU1fUkVTVUxULCB0aGlzLmJ1bmRsZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRlbGF5KE5VTV9MQVNUX0FOSU1fV0FJVF9USU1FIC8gMTAwMClcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQmV0T3B0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2luZ29EYXRhLmlzUGxheWluZ0xvdHRlcnlBbmltID0gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wTG90dGVyeUFuaW0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9sb3R0ZXJ5VHdlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2xvdHRlcnlUd2Vlbi5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9sb3R0ZXJ5VHdlZW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlcUVudGVyTG9iYnkoKTogdm9pZCB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX1RyYW5zZmVyTWFwX1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgUm9vbU5hbWU6IENvbmZpZy5HYW1lSWQuTG9iYnksXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX1RyYW5zZmVyTWFwX1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTV9UcmFuc2Zlck1hcF9SZXEsIE1TVC5PdXRlck9wY29kZV9NYXAuQzJNX1RyYW5zZmVyTWFwX1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hJc3N1ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJJc3N1ZS5zdHJpbmcgPSB0aGlzLl93aW5nb0RhdGEuY3Vycklzc3VlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoTW9kZU9wdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRVbnNlbGVjdE1vZGVPcHRpb24oKTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RNb2RlT3B0aW9uKHRoaXMuX3dpbmdvRGF0YS5jdXJyTW9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoTG90dGVyeSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGxvdHRlcnlJbmZvOiBNU1QuSU0yQ19XaW5nb0xvdHRlcnlfTWVzID0gdGhpcy5fd2luZ29EYXRhLmxvdHRlcnlNYXAuZ2V0KHRoaXMuX3dpbmdvRGF0YS5jdXJyTW9kZSk7XG4gICAgICAgIGxldCBzZWM6IG51bWJlciA9IERhdGVVdGlscy5nZXRSZW1haW5UaW1lUyh0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpLCBOdW1iZXIobG90dGVyeUluZm8uTmV4dFRpbWVzdGFtcCkpO1xuICAgICAgICBHLkxvZ2dlci5jb2xvcihcIuaooeW8j1wiLCB0aGlzLl93aW5nb0RhdGEuY3Vyck1vZGUudG9TdHJpbmcoKSwgc2VjLnRvU3RyaW5nKCksIE51bWJlcihsb3R0ZXJ5SW5mby5OZXh0VGltZXN0YW1wKSk7XG4gICAgICAgIGlmIChzZWMgPD0gQkFOX0JFVF9TVEFSVF9USU1FKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVCZXRPcHRpb24oKTtcbiAgICAgICAgICAgIHRoaXMubGFiQmFuQmV0Q291bmREb3duLnN0cmluZyA9IHNlYy50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVCZXRPcHRpb24oKTtcbiAgICAgICAgICAgIHRoaXMubGFiQmFuQmV0Q291bmREb3duLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7nu5/orqHmlbDmja5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFN0YXQocGFyZW50OiBjYy5Ob2RlLCBkYXRhOiBudW1iZXJbXSk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IGxhYkNvdW50OiBjYy5MYWJlbCA9IHBhcmVudC5nZXRDaGlsZEJ5TmFtZShgbGFiJHtpfWApLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICBsYWJDb3VudC5zdHJpbmcgPSBkYXRhW2ldLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hTdGF0KCk6IHZvaWQge1xuICAgICAgICBsZXQgbWlzc2luZzogbnVtYmVyW10gPSB0aGlzLl93aW5nb0RhdGEuZ2V0TWlzc2luZygpO1xuICAgICAgICBsZXQgYXZnTWlzc2luZzogbnVtYmVyW10gPSB0aGlzLl93aW5nb0RhdGEuZ2V0QXZnTWlzc2luZygpO1xuICAgICAgICBsZXQgZnJlcXVlbmN5OiBudW1iZXJbXSA9IHRoaXMuX3dpbmdvRGF0YS5nZXRGcmVxdWVuY3koKTtcbiAgICAgICAgbGV0IG1heENvbnRpbnVlZDogbnVtYmVyW10gPSB0aGlzLl93aW5nb0RhdGEuZ2V0TWF4Q29udGludWVkKCk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0KHRoaXMubGFiTWlzc2luZy5ub2RlLCBtaXNzaW5nKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0KHRoaXMubGFiQXZnTWlzc2luZy5ub2RlLCBhdmdNaXNzaW5nKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0KHRoaXMubGFiRnJlcXVlbmN5Lm5vZGUsIGZyZXF1ZW5jeSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdCh0aGlzLmxhYk1heENvbnRpbnVlZC5ub2RlLCBtYXhDb250aW51ZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaExpbmsoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubHN2TnVtUmVjb3JkLnNldCh0aGlzLl93aW5nb0RhdGEuaGlzdG9yeUxvdHRlcnlNYXAuZ2V0KHRoaXMuX3dpbmdvRGF0YS5jdXJyTW9kZSkpO1xuICAgICAgICB0aGlzLm5vZENoYXJ0VHJlbi5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLmxzdk51bVJlY29yZC5ub2RlLnkpICsgdGhpcy5sc3ZOdW1SZWNvcmQuZ2V0SW5uZXJFc3RpbWF0ZVNpemUoKS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoQ29sb3IoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubHN2Q29sb3JSZWNvcmQuc2V0KHRoaXMuX3dpbmdvRGF0YS5oaXN0b3J5TG90dGVyeU1hcC5nZXQodGhpcy5fd2luZ29EYXRhLmN1cnJNb2RlKSk7XG4gICAgICAgIHRoaXMubm9kQ2F0YXRhbkNlcGF0UGx1cy5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLmxzdkNvbG9yUmVjb3JkLm5vZGUueSkgKyB0aGlzLmxzdkNvbG9yUmVjb3JkLmdldElubmVyRXN0aW1hdGVTaXplKCkuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEhpc3RvcnkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXQoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTGluaygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hDb2xvcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaE15UmVjb3JkTm9kZUhlaWdodCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub2RDYXRhdGFuQ2VwYXRQbHVzU2F5YS5oZWlnaHQgPSBNYXRoLmFicyh0aGlzLmxzdk15UmVjb3JkLm5vZGUueSkgKyB0aGlzLmxzdk15UmVjb3JkLmdldElubmVyRXN0aW1hdGVTaXplKCkuaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJNeVJlY29yZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sc3ZNeVJlY29yZC5jbGVhcigpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0JldENvbG9yT3B0aW9uKGNvbG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtOiBXaW5nb0ludGVyZmFjZS5CZXREYXRhID0ge1xuICAgICAgICAgICAgdHlwZTogTVNULldpbmdvQmV0VHlwZS5Db2xvcixcbiAgICAgICAgICAgIHZhbHVlOiBjb2xvcixcbiAgICAgICAgICAgIHNlcnZpY2VDb3N0OiB0aGlzLl93aW5nb0RhdGEuY29zdCxcbiAgICAgICAgfVxuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogV2luZ29CZXRWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlLCBhcmdzOiBbcGFyYW1dIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0JldE51bU9wdGlvbihudW06IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgcGFyYW06IFdpbmdvSW50ZXJmYWNlLkJldERhdGEgPSB7XG4gICAgICAgICAgICB0eXBlOiBNU1QuV2luZ29CZXRUeXBlLk51bSxcbiAgICAgICAgICAgIHZhbHVlOiBudW0sXG4gICAgICAgICAgICBzZXJ2aWNlQ29zdDogdGhpcy5fd2luZ29EYXRhLmNvc3QsXG4gICAgICAgIH1cbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFdpbmdvQmV0VmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSwgYXJnczogW3BhcmFtXSB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xpY2tNb2RlKG1vZGU6IE1TVC5XaW5nb01vZGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3dpbmdvRGF0YS5jdXJyTW9kZSA9PT0gbW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fd2luZ29EYXRhLmlzUGxheWluZ0xvdHRlcnlBbmltID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGl0bGVJdGVtUGFnZVVzZXIubWFudWFsUmVmcmVzaEdvbGQoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdE1vZGUobW9kZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soQnV0dG9uTmFtZTogc3RyaW5nLCBCdXR0b25Ob2RlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChCdXR0b25OYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnJlcUVudGVyTG9iYnkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5DZXBhdFBsdXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTW9kZShNU1QuV2luZ29Nb2RlLkNlcGF0UGx1cyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2VwYXRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTW9kZShNU1QuV2luZ29Nb2RlLkNlcGF0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5TdGFuZGFyXCI6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTW9kZShNU1QuV2luZ29Nb2RlLlN0YW5kYXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkMwXCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuQzFcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5DMlwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bkMzXCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuQzRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5DNVwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bkM2XCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuQzdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5DOFwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bkM5XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0JldENvbG9yT3B0aW9uKE51bWJlcihCdXR0b25OYW1lLnJlcGxhY2UoXCJidG5DXCIsIFwiXCIpKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuTjBcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5OMVwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bk4yXCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuTjNcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5ONFwiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bk41XCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuTjZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5ON1wiOlxuICAgICAgICAgICAgY2FzZSBcImJ0bk44XCI6XG4gICAgICAgICAgICBjYXNlIFwiYnRuTjlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQmV0TnVtT3B0aW9uKE51bWJlcihCdXR0b25OYW1lLnJlcGxhY2UoXCJidG5OXCIsIFwiXCIpKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2hhcnRUcmVuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1JlY29yZChXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DaGFydFRyZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkNhdGF0YW5DZXBhdFBsdXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrUmVjb3JkKFdpbmdvTW9kZURlZmluZS5IaXN0b3J5LkNhdGF0YW5DZXBhdFBsdXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkNhdGF0YW5DZXBwYXRQbHVzU2F5YVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tSZWNvcmQoV2luZ29Nb2RlRGVmaW5lLkhpc3RvcnkuQ2F0YXRhbkNlcGF0UGx1c1NheWEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDMk1fR2V0V2luZ29JbmZvX1JlcSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMk1fR2V0V2luZ29JbmZvX1JlcS5jcmVhdGUoeyBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCkgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX0dldFdpbmdvSW5mb19SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKE1TVC5DMk1fR2V0V2luZ29JbmZvX1JlcSwgTVNULk91dGVyT3Bjb2RlX1dpbmdvR2FtZS5DMk1fR2V0V2luZ29JbmZvX1JlcSwgYnVmZmVyKTtcblxuICAgICAgICAvLyB0aGlzLnRlc3RfTTJDX0dldFdpbmdvSW5mb19SZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIEMyTV9HZXRXaW5nb0hpc3RvcnlfUmVxKG1vZGU6IE1TVC5XaW5nb01vZGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMk1fR2V0V2luZ29IaXN0b3J5X1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgTW9kZTogbW9kZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX0dldFdpbmdvSGlzdG9yeV9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKE1TVC5DMk1fR2V0V2luZ29IaXN0b3J5X1JlcSwgTVNULk91dGVyT3Bjb2RlX1dpbmdvR2FtZS5DMk1fR2V0V2luZ29IaXN0b3J5X1JlcSwgYnVmZmVyKTtcblxuICAgICAgICAvLyB0aGlzLnRlc3RfTTJDX0dldFdpbmdvSGlzdG9yeV9SZXMobW9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDMlNfV2luZ29NeVJlY29yZChpZD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChpZCkpIHtcbiAgICAgICAgICAgIGlkID0gREVGQVVMVF9GSVJTVF9JRDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJTX1dpbmdvTXlSZWNvcmQuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBtb2RlOiB0aGlzLl93aW5nb0RhdGEuY3Vyck1vZGUsXG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBjb3VudDogTVlfUkVDT1JEX1BBR0VfQ09VTlQsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyU19XaW5nb015UmVjb3JkLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJTX1dpbmdvTXlSZWNvcmQsIE1TVC5PdXRlck9wY29kZV9XaW5nb0dhbWUuQzJTX1dpbmdvTXlSZWNvcmQsIGJ1ZmZlcik7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHRlc3RfTTJDX0dldFdpbmdvSW5mb19SZXMoKTogdm9pZCB7XG4gICAgICAgIGxldCBjb250cm9sbGVyOiBXaW5nb05ldENvbnRyb2xsZXIgPSBNYW5hZ2VyLm5ldE1hbmFnZXIubWFpbk5vZGUuZ2V0Q29tcG9uZW50KFdpbmdvTmV0Q29udHJvbGxlcik7XG4gICAgICAgIGxldCBzZXJ2ZXJUaW1lc3RhbXA6IG51bWJlciA9IHRoaXMuX2FwcERhdGEuZ2V0U2VydmVyVGltZXN0YW1wKCk7XG4gICAgICAgIGNvbnRyb2xsZXIub25NMkNfR2V0V2luZ29JbmZvX1Jlcyh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCkgLSAxLFxuICAgICAgICAgICAgRXJyb3I6IDAsXG4gICAgICAgICAgICBNZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgQ2VwYXRQbHVzVGltZXN0YW1wOiBzZXJ2ZXJUaW1lc3RhbXAgKyBXaW5nb0NvbmZpZy5Mb3R0ZXJ5SW50ZXJ2YWxUaW1lW01TVC5XaW5nb01vZGUuQ2VwYXRQbHVzXSxcbiAgICAgICAgICAgIENlcGF0VGltZXN0YW1wOiBzZXJ2ZXJUaW1lc3RhbXAgKyBXaW5nb0NvbmZpZy5Mb3R0ZXJ5SW50ZXJ2YWxUaW1lW01TVC5XaW5nb01vZGUuQ2VwYXRdLFxuICAgICAgICAgICAgU3RhbmRhclRpbWVzdGFtcDogc2VydmVyVGltZXN0YW1wICsgV2luZ29Db25maWcuTG90dGVyeUludGVydmFsVGltZVtNU1QuV2luZ29Nb2RlLlN0YW5kYXJdLFxuICAgICAgICAgICAgQ29zdDogMTAsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0ZXN0X00yQ19HZXRXaW5nb0hpc3RvcnlfUmVzKG1vZGU6IE1TVC5XaW5nb01vZGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbnRyb2xsZXI6IFdpbmdvTmV0Q29udHJvbGxlciA9IE1hbmFnZXIubmV0TWFuYWdlci5tYWluTm9kZS5nZXRDb21wb25lbnQoV2luZ29OZXRDb250cm9sbGVyKTtcblxuICAgICAgICBsZXQgaGlzdG9yeUluZm9MaXN0OiBNU1QuSVdpbmdvSGlzdG9yeUluZm9bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgMTAwOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBpc3N1ZTogbnVtYmVyID0gMjAyMjA0MjYxNzEzICsgaTtcbiAgICAgICAgICAgIGxldCBudW06IG51bWJlciA9IFV0aWxNZ3IucmFuZG9tKDAsIDkpO1xuICAgICAgICAgICAgbGV0IGxvdHRlcnlJbmZvOiBNU1QuSVdpbmdvSGlzdG9yeUluZm8gPSB7XG4gICAgICAgICAgICAgICAgSXNzdWU6IGlzc3VlLFxuICAgICAgICAgICAgICAgIE51bTogbnVtLFxuICAgICAgICAgICAgICAgIEhhcmdhOiAyNTUzNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpc3RvcnlJbmZvTGlzdC5wdXNoKGxvdHRlcnlJbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRyb2xsZXIub25NMkNfR2V0V2luZ29IaXN0b3J5X1Jlcyh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCkgLSAxLFxuICAgICAgICAgICAgRXJyb3I6IDAsXG4gICAgICAgICAgICBNZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgTW9kZTogbW9kZSxcbiAgICAgICAgICAgIEN1cnJJc3N1ZTogTnVtYmVyKGhpc3RvcnlJbmZvTGlzdFtoaXN0b3J5SW5mb0xpc3QubGVuZ3RoIC0gMV0uSXNzdWUpICsgMSxcbiAgICAgICAgICAgIEhpc3RvcnlJbmZvOiBoaXN0b3J5SW5mb0xpc3QsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0ZXN0X00yQ19XaW5nb0xvdHRlcnlfTWVzKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBbaywgdl0gb2YgdGhpcy5fd2luZ29EYXRhLmxvdHRlcnlNYXApIHtcbiAgICAgICAgICAgIGxldCBzZWM6IG51bWJlciA9IERhdGVVdGlscy5nZXRSZW1haW5UaW1lUyh0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpLCBOdW1iZXIodi5OZXh0VGltZXN0YW1wKSk7XG4gICAgICAgICAgICBpZiAoc2VjIDw9IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgbnVtOiBudW1iZXIgPSBVdGlsTWdyLnJhbmRvbSgwLCA5KTtcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbGxlcjogV2luZ29OZXRDb250cm9sbGVyID0gTWFuYWdlci5uZXRNYW5hZ2VyLm1haW5Ob2RlLmdldENvbXBvbmVudChXaW5nb05ldENvbnRyb2xsZXIpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIub25NMkNfV2luZ29Mb3R0ZXJ5X01lcyh7XG4gICAgICAgICAgICAgICAgICAgIE1vZGU6IHYuTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgTG90dGVyeUluZm86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIElzc3VlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtOiBudW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBIYXJnYTogNTU1LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBOZXh0VGltZXN0YW1wOiB0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpICsgV2luZ29Db25maWcuTG90dGVyeUludGVydmFsVGltZVt2Lk1vZGVdLFxuICAgICAgICAgICAgICAgICAgICBOZXh0SXNzdWU6IDU1NSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RvcEFsbFNvdW5kKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnN0b3BNdXNpYygpO1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnN0b3BFZmZlY3RCeVBhdGgoV2luZ28uU09VTkRTLkNPVU5UMzIxKTtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5zdG9wRWZmZWN0QnlQYXRoKFdpbmdvLlNPVU5EUy5OVU1fSElHSExJR0hUKTtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5zdG9wRWZmZWN0QnlQYXRoKFdpbmdvLlNPVU5EUy5OVU1fUkVTVUxUKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgICAgICB0aGlzLnN0b3BBbGxTb3VuZCgpO1xuICAgICAgICB0aGlzLnN0b3BMb3R0ZXJ5QW5pbSgpO1xuICAgICAgICB0aGlzLnN0b3BMb3R0ZXJ5Q291bnREb3duKCk7XG4gICAgICAgIHRoaXMuc3RvcEFsbEhpZ2hMaWdodEFuaW0oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTTJDX0dldFdpbmdvSW5mb19SZXMoZGF0YTogTVNULklNMkNfR2V0Q3Jhc2hJbmZvX1Jlcyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXJ0TG90dGVyeUNvdW50RG93bigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfR2V0V2luZ29IaXN0b3J5X1JlcyhkYXRhOiBNU1QuSU0yQ19HZXRXaW5nb0hpc3RvcnlfUmVzKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaElzc3VlKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaE1vZGVPcHRpb24oKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoSGlzdG9yeSgpO1xuICAgICAgICB0aGlzLnN0b3BMb3R0ZXJ5QW5pbSgpO1xuICAgICAgICB0aGlzLnN0b3BBbGxIaWdoTGlnaHRBbmltKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaExvdHRlcnkoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3dpbmdvRGF0YS5pc0ZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTXlSZWNvcmQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJySGlzdG9yeU9wdGlvbiA9PT0gV2luZ29Nb2RlRGVmaW5lLkhpc3RvcnkuQ2F0YXRhbkNlcGF0UGx1c1NheWEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkMyU19XaW5nb015UmVjb3JkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfV2luZ29Mb3R0ZXJ5X01lcyhkYXRhOiBNU1QuSU0yQ19XaW5nb0xvdHRlcnlfTWVzKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl93aW5nb0RhdGEuY3Vyck1vZGUgPT09IG51bGwgfHwgdGhpcy5fd2luZ29EYXRhLmN1cnJNb2RlICE9PSBkYXRhLk1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFiQmFuQmV0Q291bmREb3duLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMucmVmcmVzaElzc3VlKCk7XG5cbiAgICAgICAgdGhpcy5wbGF5TG90dGVyeUFuaW0oZGF0YS5Mb3R0ZXJ5SW5mbywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhpc3RvcnlJbmZvTGlzdDogTVNULklXaW5nb0hpc3RvcnlJbmZvW10gPSB0aGlzLl93aW5nb0RhdGEuaGlzdG9yeUxvdHRlcnlNYXAuZ2V0KHRoaXMuX3dpbmdvRGF0YS5jdXJyTW9kZSk7XG4gICAgICAgICAgICBsZXQgaGlzdG9yeUluZm86IE1TVC5JV2luZ29IaXN0b3J5SW5mbyA9IGhpc3RvcnlJbmZvTGlzdFtoaXN0b3J5SW5mb0xpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB0aGlzLmxzdkNvbG9yUmVjb3JkLmluc2VydChoaXN0b3J5SW5mbywgMCk7XG4gICAgICAgICAgICB0aGlzLmxzdk51bVJlY29yZC5pbnNlcnQoaGlzdG9yeUluZm8sIDApO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLmlzTG9naW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZUl0ZW1QYWdlVXNlci5tYW51YWxSZWZyZXNoR29sZCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUmVmcmVzaE15UmVjb3JkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DMlNfV2luZ29NeVJlY29yZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X1MyQ19XaW5nb015UmVjb3JkKGRhdGE6IE1TVC5JUzJDX1dpbmdvTXlSZWNvcmQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuaWQgPT09IERFRkFVTFRfRklSU1RfSUQgJiYgZGF0YS5teVJlY29yZEluZm8ubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMubm9uZUl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sc3ZNeVJlY29yZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub25lSXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sc3ZNeVJlY29yZC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmmK/lkKbmnIDlkI7kuIDpobVcbiAgICAgICAgdGhpcy5faXNMYXN0UGFnZSA9IGRhdGEubXlSZWNvcmRJbmZvLmxlbmd0aCA8IE1ZX1JFQ09SRF9QQUdFX0NPVU5UO1xuXG4gICAgICAgIGlmIChkYXRhLmlkID09PSBERUZBVUxUX0ZJUlNUX0lEKSB7XG4gICAgICAgICAgICB0aGlzLl9teVJlY29yZExpc3QgPSBbXS5jb25jYXQoZGF0YS5teVJlY29yZEluZm8pO1xuICAgICAgICAgICAgdGhpcy5sc3ZNeVJlY29yZC5zZXQoZGF0YS5teVJlY29yZEluZm8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbXlSZWNvcmRMaXN0ID0gdGhpcy5fbXlSZWNvcmRMaXN0LmNvbmNhdChkYXRhLm15UmVjb3JkSW5mbyk7XG4gICAgICAgICAgICB0aGlzLmxzdk15UmVjb3JkLmluc2VydChkYXRhLm15UmVjb3JkSW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hNeVJlY29yZE5vZGVIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRfTTJDX1dpbmdvQmV0X1JlcyhkYXRhOiBNU1QuSU0yQ19XaW5nb0JldF9SZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJIaXN0b3J5T3B0aW9uID09PSBXaW5nb01vZGVEZWZpbmUuSGlzdG9yeS5DYXRhdGFuQ2VwYXRQbHVzU2F5YSkge1xuICAgICAgICAgICAgdGhpcy5DMlNfV2luZ29NeVJlY29yZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50X00yQ19UcmFuc2Zlck1hcF9SZXMoZGF0YTogTVNULklNMkNfVHJhbnNmZXJNYXBfUmVzKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yID09PSAwKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0hBTEwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHB1bGxNeVJlY29yZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzTGFzdFBhZ2UpIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIldpbmdvIOa1j+iniOS4quS6uuS4i+azqOiusOW9lSDlt7LmmK/mnIDlkI7kuIDpobUg5peg6ZyA6K+35rGC57+76aG1XCIpO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5Db21tb24uTm9EYXRhKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkMyU19XaW5nb015UmVjb3JkKHRoaXMuZ2V0TGFzdFJlY29yZElkKCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4i+aLieWbnuiwg1xuICAgICAqL1xuICAgIHByaXZhdGUgb25QdWxsQm90dG9tKHRhcmdldDogTGlzdFZpZXcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl93aW5nb0RhdGEuY3VyclB1bGxGdW5jKSB7XG4gICAgICAgICAgICBjYXNlIFdpbmdvRGVmaW5lLlB1bGxCb3R0b21GdW5jdGlvbi5NWV9SRUNPUkQ6XG4gICAgICAgICAgICAgICAgdGhpcy5wdWxsTXlSZWNvcmQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19