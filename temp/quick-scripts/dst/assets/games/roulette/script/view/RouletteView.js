
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dac51FZP99ILJv58nQyBcHl', 'RouletteView');
// games/roulette/script/view/RouletteView.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const LogicEvent_1 = require("../../../../script/common/event/LogicEvent");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const protoc_1 = require("../../../../script/framework/external/protoc");
const Manager_1 = require("../../../../script/common/manager/Manager");
const Config_1 = require("../../../../script/common/config/Config");
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const RouletteRecordItem_1 = __importDefault(require("./RouletteRecordItem"));
const RouletteData_1 = __importDefault(require("../data/RouletteData"));
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const RouletteConfig_1 = require("../config/RouletteConfig");
const TitleItemPageUser_1 = __importDefault(require("../../../../script/common/item/TitleItemPageUser"));
const RouletteColorDefine_1 = require("../define/RouletteColorDefine");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const RouletteMyRecordItem_1 = __importDefault(require("./RouletteMyRecordItem"));
const RouletteBigWinItem_1 = __importDefault(require("./RouletteBigWinItem"));
const RouletteTotalRecordView_1 = __importDefault(require("./RouletteTotalRecordView"));
const RouletteMyBetRecordView_1 = __importDefault(require("./RouletteMyBetRecordView"));
const RouletteGameData_1 = require("../data/RouletteGameData");
const LoginNewView_1 = __importDefault(require("../../../../script/login/LoginNewView"));
const { ccclass, property } = cc._decorator;
// 最小下注金额
const MIN_BET_GOLD = 2000;
// 最大下注金额
const MAX_BET_GOLD = 3300000;
let RouletteView = class RouletteView extends UIView_1.default {
    constructor() {
        super(...arguments);
        // 应用数据
        this._appData = null;
        // 用户数据
        this._userData = null;
        // 游戏数据
        this._rouletteData = null;
        this.groupNode = null;
        this.titleItemPageUser = null;
        this.groupParent = null;
        this.gemstoneSpine = null;
        this.endNumLabel = null;
        this.upPointer = null;
        this.downPointer = null;
        this.labStartCountDown = null;
        this.edbBetGold = null;
        this.latRecord = null;
        this.labCurRound = null;
        this.labBigWin = null;
        this.tggCurRound = null;
        this.tggBigWin = null;
        this.nodCurRoundList = null;
        this.nodBigWinList = null;
        this.latManual = null;
        this.lsvBetPlayer = null;
        this.nodVerify = null;
        this.labMyRecord = null;
        this.labHistoryTitle = null;
        this.labWorldRecord = null;
        this.labFairGame = null;
        this.labCopyCheck = null;
        this.maxNum = 2;
        this.minNum = 0;
        //播放时间
        this.time = 0;
        //播放总时间
        this.totalTime = 0;
        // label 行宽
        this.lineWidth = 0;
        // label 总宽度
        this.totalWidth = 0;
        this.rolling = false;
        this.numArray = [];
        this.curNum = 0;
        this.rollRound = 2;
        this.groupMax = 9;
        /**一个宝石的宽度*/
        this.itemWidth = 112;
        this.dialTime = 6;
        /**一个Item总个数29*/
        this.itemTotal = 29;
        this.groupWidth = 0;
        this.endNum = 0;
    }
    static getPrefabUrl() {
        return "prefabs/RouletteView";
    }
    onLoad() {
        super.onLoad();
        LogicEvent_1.dispatchEnterComplete({ type: LogicEvent_1.LogicType.GAME, views: [this] });
        this.initData();
        this.initView();
        this.refreshDefaultByPos();
        this.playPointerByNum();
        this.startCountDown();
        this.audioHelper.playMusic(RouletteGameData_1.Roulette.SOUNDS.BGM, this.bundle);
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_M2C_TransferMap_Res", this.onEvent_M2C_TransferMap_Res);
        this.registerEvent("Event_M2C_GetRouletteInfo_Res", this.onEvent_M2C_GetRouletteInfo_Res);
        this.registerEvent("Event_M2C_RouletteStartBet_Mes", this.onEvent_M2C_RouletteStartBet_Mes);
        this.registerEvent("Event_M2C_RouletteStart_mes", this.onEvent_M2C_RouletteStart_mes);
        this.registerEvent("Event_R2C_PaybackPhase_Mes", this.onEvent_R2C_PaybackPhase_Mes);
        this.registerEvent("Event_R2C_Bet_Mes", this.onEvent_R2C_Bet_Mes);
        this.registerEvent("Event_R2C_GetBetRandInfo_Res", this.onEvent_R2C_GetBetRandInfo_Res);
    }
    show(args) {
        super.show(args);
        this.onLanguageChange();
        this.requestGetRouletteInfo();
    }
    requestGetRouletteInfo() {
        let req = protoc_1.MST.C2M_GetRouletteInfo_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2M_GetRouletteInfo_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_GetRouletteInfo_Req, protoc_1.MST.OuterOpcode_Roulette.C2M_GetRouletteInfo_Req, buffer);
    }
    onLanguageChange() {
        this.titleItemPageUser.languagePageName(Manager_1.Manager.makeLanguage("labPageName", true));
        this.labCurRound.language = Manager_1.Manager.makeLanguage("labCurRound", true);
        this.labBigWin.language = Manager_1.Manager.makeLanguage("labBigWin", true);
        this.labHistoryTitle.language = Manager_1.Manager.makeLanguage("history", true);
        this.labMyRecord.language = Manager_1.Manager.makeLanguage("myHistory", true);
        this.labWorldRecord.language = Manager_1.Manager.makeLanguage("worldHistory", true);
        this.labFairGame.language = Manager_1.Manager.makeLanguage("fairGame", true);
        this.labCopyCheck.language = Manager_1.Manager.makeLanguage("labCopyCheck", true);
    }
    initData() {
        this._appData = G.DataMgr.get(AppData_1.default);
        this._userData = G.DataMgr.get(UserData_1.default);
        this._rouletteData = G.DataMgr.get(RouletteData_1.default);
        this.groupWidth = this.itemTotal * this.itemWidth;
    }
    initView() {
    }
    refreshDefaultByPos() {
        this.groupParent.removeAllChildren();
        this.groupParent.setPosition(0, 0);
        for (let index = 0; index < this.groupMax; index++) {
            let groupPre = cc.instantiate(this.groupNode);
            groupPre.name = 'groupPre' + index;
            this.groupParent.addChild(groupPre);
        }
        this.groupParent.getComponent(cc.Layout).updateLayout();
        let curNum = this.curNum;
        let diffX = 0;
        switch (curNum) {
            case 0:
                diffX = this.itemWidth * 6;
                break;
            case 1:
                diffX = this.itemWidth * 5 - (this.itemWidth * 0.5) + 10;
                break;
            case 2:
                diffX = 25;
                break;
        }
        this.groupParent.x += diffX;
    }
    onEvent_M2C_RouletteStart_mes() {
        let self = this;
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        this.dialTime = (rouletteData.StopTimeStamp - this._appData.getServerTimestamp()) / 1000;
        this.endNum = rouletteData.endIndex;
        console.log('--------滚动时间------->:' + this.dialTime);
        //自己查看结果
        let color = ['purpler', 'red', 'green'];
        this.endNumLabel.string = `结果颜色:${color[this.endNum]}`;
        this.gemstoneSpine.active = false;
        let diffX = this.getDiffX();
        let s = this.rollRound * this.groupWidth + diffX;
        cc.tween(this.groupParent)
            .by(this.dialTime, {
            position: cc.v2(-s, 0)
        }, cc.easeInOut(2))
            .call(function () {
            self.rolling = false;
            self.curNum = self.endNum;
            self.refreshDefaultByPos();
            self.playPointerByNum();
            self.playGemstoneSpine();
            self.hideCurItem();
            self.audioHelper.playEffect(RouletteGameData_1.Roulette.SOUNDS.RESULT, self.bundle);
        })
            .start();
        this.rolling = true;
        this.showCurItem();
        this.loopPointerSpine();
        this.resumeRate();
        this.audioHelper.playEffect(RouletteGameData_1.Roulette.SOUNDS.RUN, this.bundle);
    }
    getDiffX() {
        let self = this;
        let midCount = this.itemTotal / 2 + 0.5;
        let spacingX = 50;
        let distance = ((midCount - 1) - 2) * this.itemWidth;
        let gap = 0;
        if (this.curNum == 0) {
            switch (this.endNum) {
                case 0:
                    gap = distance + 2 * this.itemWidth + 35; //--item10
                    break;
                case 1:
                    gap = distance - (3 * this.itemWidth) - spacingX - 5; //--item11
                    break;
                case 2:
                    gap = distance + 20 * this.itemWidth - 35; //-- item14
                    break;
            }
        }
        else if (this.curNum == 1) {
            switch (this.endNum) {
                case 0:
                    gap = distance + this.itemWidth - 10;
                    break;
                case 1:
                    gap = distance - (5 * this.itemWidth) + 15;
                    break;
                case 2:
                    gap = distance + 18 * this.itemWidth + 30;
                    break;
            }
        }
        else {
            switch (this.endNum) {
                case 0:
                    gap = distance + (2 * this.itemWidth) + 35;
                    break;
                case 1:
                    gap = distance + this.itemWidth - 15;
                    break;
                case 2:
                    gap = distance + 14 * this.itemWidth - 10;
                    break;
            }
        }
        return gap;
    }
    hideCurItem() {
        let hideIndex;
        switch (this.endNum) {
            case 0:
                hideIndex = 10;
                break;
            case 1:
                hideIndex = 11;
                break;
            case 2:
                hideIndex = 14;
                break;
        }
        for (let index = 0; index < this.groupMax; index++) {
            let gemStoneItem = this.groupParent.getChildByName('groupPre' + index);
            gemStoneItem.getChildByName(`item${hideIndex}`).active = false;
        }
    }
    showCurItem() {
        for (let index = 0; index < this.groupMax; index++) {
            let gemStoneItem = this.groupParent.getChildByName('groupPre' + index);
            gemStoneItem.getChildByName(`item10`).active = true;
            gemStoneItem.getChildByName(`item11`).active = true;
            gemStoneItem.getChildByName(`item14`).active = true;
        }
    }
    playGemstoneSpine() {
        let color = ['zi', 'hong', 'lu'];
        this.gemstoneSpine.active = true;
        let node = this.gemstoneSpine.getChildByName('spine');
        let ske = node.getComponent(sp.Skeleton);
        ske.setAnimation(0, `${color[this.endNum]}`, false);
    }
    loopPointerSpine() {
        let upSke = this.upPointer.getComponent(sp.Skeleton);
        upSke.setAnimation(0, 'animation', true);
        let downSke = this.downPointer.getComponent(sp.Skeleton);
        downSke.setAnimation(0, 'animation', true);
    }
    playPointerByNum() {
        let color = ['zi', 'hong', 'lu'];
        let upSke = this.upPointer.getComponent(sp.Skeleton);
        upSke.setAnimation(0, `${color[this.endNum]}`, true);
        let downSke = this.downPointer.getComponent(sp.Skeleton);
        downSke.setAnimation(0, `${color[this.endNum]}`, true);
    }
    onClick(ButtonName, btnNode) {
        switch (ButtonName) {
            case 'testChou':
                if (this.rolling)
                    return;
                let num = Math.floor(Math.random() * ((this.maxNum + 1) - this.minNum)) + this.minNum;
                this.endNum = num;
                let color = ['purpler', 'red', 'green'];
                this.endNumLabel.string = `结果颜色:${color[this.endNum]}`;
                // this.onEvent_M2C_RouletteStart_mes();
                break;
            case "btnClose":
                this.reqEnterLobby();
                break;
            case "btnBet0":
                if (this.checkLogined())
                    this.addBetGold(RouletteConfig_1.RouletteConfig.BetGoldButton[0], this.edbBetGold);
                break;
            case "btnBet1":
                if (this.checkLogined())
                    this.addBetGold(RouletteConfig_1.RouletteConfig.BetGoldButton[1], this.edbBetGold);
                break;
            case "btnBet2":
                if (this.checkLogined())
                    this.addBetGold(RouletteConfig_1.RouletteConfig.BetGoldButton[2], this.edbBetGold);
                break;
            case "btnBet3":
                if (this.checkLogined())
                    this.mulBetGold(RouletteConfig_1.RouletteConfig.BetGoldButton[3], this.edbBetGold);
                break;
            case "btnBet4":
                if (this.checkLogined())
                    this.mulBetGold(RouletteConfig_1.RouletteConfig.BetGoldButton[4], this.edbBetGold);
                break;
            case "tggCurRound":
                this.clickMyRecord();
                break;
            case "tggBigWin":
                this.clickWordRecord();
                break;
            case "btnPurple":
                if (this.checkLogined())
                    this.onC2M_MyRouletteBet_Req(0);
                break;
            case "btnGreen":
                if (this.checkLogined())
                    this.onC2M_MyRouletteBet_Req(2);
                break;
            case "btnRed":
                if (this.checkLogined())
                    this.onC2M_MyRouletteBet_Req(1);
                break;
            case "btnWorldRecord":
                Manager_1.Manager.uiManager.open({ type: RouletteTotalRecordView_1.default, bundle: this.bundle });
                break;
            case "btnMyRecord":
                Manager_1.Manager.uiManager.open({ type: RouletteMyBetRecordView_1.default, bundle: this.bundle });
                break;
            case "btnCopyNo":
                let labRoundHash = this.nodVerify.getChildByName('roundHashNode').getChildByName('labRoundHash').getComponent(cc.Label);
                window['platformUtil'].copyToClip(labRoundHash.string);
                break;
            default:
                break;
        }
    }
    checkLogined() {
        if (!this._userData.id) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("toLogin", true));
            Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }
    getEditboxBetGold(edbBetGold) {
        let content = edbBetGold.string;
        let numBetGold = 0;
        if (content.length > 0) {
            numBetGold = Number(content);
        }
        return numBetGold;
    }
    onC2M_MyRouletteBet_Req(BetIndex) {
        let betGold = this.getEditboxBetGold(this.edbBetGold);
        if (betGold < MIN_BET_GOLD || betGold > MAX_BET_GOLD) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage(["InputBetGold", MIN_BET_GOLD, MAX_BET_GOLD], true));
            return;
        }
        //判断是否在下注阶段
        let status = this._rouletteData.Status;
        if (status != protoc_1.MST.RouletteStatus.BetPhase) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("NotBetState", true));
            return;
        }
        let req = protoc_1.MST.C2M_MyRouletteBet_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            BetGold: NumberUtils_1.default.converToS(betGold),
            BetIndex
        });
        let buffer = protoc_1.MST.C2M_MyRouletteBet_Req.encode(req).finish();
        this.service.sendMsg(protoc_1.MST.C2M_MyRouletteBet_Req, protoc_1.MST.OuterOpcode_Roulette.C2M_MyRouletteBet_Req, buffer);
    }
    clickMyRecord() {
        this.nodBigWinList.active = false;
        this.nodCurRoundList.active = true;
    }
    clickWordRecord() {
        this.nodBigWinList.active = true;
        this.nodCurRoundList.active = false;
        this.requestGetBetRankInfo();
    }
    requestGetBetRankInfo() {
        let req = protoc_1.MST.C2R_GetBetRankInfo_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2R_GetBetRankInfo_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2R_GetBetRankInfo_Req, protoc_1.MST.OuterOpcode_Roulette.C2R_GetBetRankInfo_Req, buffer);
    }
    onChangedBetGold(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let legalContent = arrContent.join(",").replace(/,/g, "");
        let numContent = Number(legalContent);
        if (numContent <= 0) {
            content = "";
        }
        else {
            content = numContent.toString();
        }
        edb.string = content;
    }
    addBetGold(gold, edbBetGold) {
        let numBetGold = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Operation_1.default.add(gold, numBetGold).toString();
    }
    mulBetGold(gold, edbBetGold) {
        let numBetGold = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Math.floor(Operation_1.default.mul(gold, numBetGold)).toString();
    }
    reqEnterLobby() {
        let req = protoc_1.MST.C2M_TransferMap_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            RoomName: Config_1.Config.GameId.Lobby,
        });
        let buffer = protoc_1.MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_TransferMap_Req, protoc_1.MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
    }
    onEvent_M2C_TransferMap_Res(data) {
        if (data.Error === 0) {
            dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        }
        else {
            PanelHelp_1.default.showErrTip(data.Error);
        }
    }
    onEvent_M2C_RouletteStartBet_Mes() {
        this.startCountDown();
        this.resumeRate();
        this.onEvent_R2C_PaybackPhase_Mes();
        this.refreshCurRoomBetsList();
        this.refreshTotalBaoshi();
    }
    /**
     * 启动游戏倒计时
     */
    startCountDown() {
        this.stopCountDown();
        this.schedule(this.updateCountDonw);
    }
    /**
     * 停止游戏倒计时
     */
    stopCountDown() {
        this.labStartCountDown.string = "0.00";
        this.unschedule(this.updateCountDonw);
    }
    /**
     * 刷新游戏倒计时
     */
    updateCountDonw() {
        let ms = this._rouletteData.stopBetTimeStamp - this._appData.getServerTimestamp();
        // console.log('下注剩余时间ms:' + ms);
        if (ms <= 0) {
            ms = 0;
            this.stopCountDown();
            this.labStartCountDown.string = "0.00";
            return;
        }
        this.labStartCountDown.string = DateUtils_1.default.getMsToS(ms);
    }
    refreshGame() {
        switch (this._rouletteData.Status) {
            case protoc_1.MST.RouletteStatus.BetPhase:
                {
                    this.startCountDown();
                }
                break;
            case protoc_1.MST.RouletteStatus.AnimationPhase:
                {
                }
                break;
            case protoc_1.MST.RouletteStatus.PaybackPhase:
                {
                }
                break;
        }
    }
    onEvent_M2C_GetRouletteInfo_Res() {
        this.refreshGame();
        this.resumeRate();
        this.refreshCurRoomBetsList();
        this.onEvent_R2C_PaybackPhase_Mes();
        this.refreshTotalBaoshi();
        this.refreshMultipleRecord();
    }
    resumeRate() {
        let status = this._rouletteData.Status == protoc_1.MST.RouletteStatus.BetPhase;
        this.enableEditboxRate(this.edbBetGold, status);
        this.enableBtnBetRate(status);
        if (!status)
            this.labStartCountDown.string = "0.00";
    }
    enableBtnBetRate(isEnable) {
        let imgBetBg = this.latManual.getChildByName('nodBetRaise').getChildByName('imgBetBg');
        for (let index = 0; index < 5; index++) {
            let btnBet = imgBetBg.getChildByName('btnBet' + index).getComponent(cc.Button);
            btnBet.enabled = isEnable;
        }
        let noBetBtn = this.latManual.getChildByName('noBetBtn');
        let btnPurple = noBetBtn.getChildByName('btnPurple').getComponent(cc.Button);
        let btnGreen = noBetBtn.getChildByName('btnGreen').getComponent(cc.Button);
        let btnRed = noBetBtn.getChildByName('btnRed').getComponent(cc.Button);
        btnPurple.enabled = isEnable;
        btnGreen.enabled = isEnable;
        btnRed.enabled = isEnable;
    }
    enableEditboxRate(edbChangeRate, isEnable) {
        edbChangeRate.enabled = isEnable;
        let nodContent = edbChangeRate.node.getChildByName("TEXT_LABEL");
        let nodPlaceholder = edbChangeRate.node.getChildByName("PLACEHOLDER_LABEL");
        if (isEnable) {
            nodContent.color = RouletteColorDefine_1.RouletteColorDefine.EnableRate.ENABLE;
            nodPlaceholder.color = RouletteColorDefine_1.RouletteColorDefine.EnableRate.ENABLE;
        }
        else {
            nodContent.color = RouletteColorDefine_1.RouletteColorDefine.EnableRate.DISABLE;
            nodPlaceholder.color = RouletteColorDefine_1.RouletteColorDefine.EnableRate.DISABLE;
        }
    }
    onEvent_R2C_PaybackPhase_Mes() {
        let rouletteData = this._rouletteData;
        let labGameNo = this.nodVerify.getChildByName('labGameNo').getComponent(cc.Label);
        let labHash = this.nodVerify.getChildByName('hashNode').getChildByName('labHash').getComponent(cc.Label);
        let labRoundNum = this.nodVerify.getChildByName('roundNode').getChildByName('labRoundNum').getComponent(cc.Label);
        let labRoundHash = this.nodVerify.getChildByName('roundHashNode').getChildByName('labRoundHash').getComponent(cc.Label);
        labGameNo.string = `Game No.${rouletteData.curRound}`;
        labHash.string = rouletteData.hashSalt;
        labRoundNum.string = String(rouletteData.randomNum);
        labRoundHash.string = rouletteData.roundHash;
        this.refreshMultipleRecord();
    }
    refreshTotalBaoshi() {
        let rouletteData = this._rouletteData;
        let onRoomTotalBet = rouletteData.onRoomTotalBet;
        if (!onRoomTotalBet || onRoomTotalBet.length <= 0)
            return;
        let labPurpChips = this.nodCurRoundList.getChildByName('latBaoshi').getChildByName('purp').getChildByName('labChips');
        let labRedChips = this.nodCurRoundList.getChildByName('latBaoshi').getChildByName('red').getChildByName('labChips');
        let labGreenChips = this.nodCurRoundList.getChildByName('latBaoshi').getChildByName('green').getChildByName('labChips');
        for (let index = 0; index < onRoomTotalBet.length; index++) {
            const data = onRoomTotalBet[index];
            if (data.color == 0) {
                labPurpChips.getComponent(cc.Label).string = NumberUtils_1.default.converToC(data.chips);
            }
            else if (data.color == 1) {
                labRedChips.getComponent(cc.Label).string = NumberUtils_1.default.converToC(data.chips);
            }
            else {
                labGreenChips.getComponent(cc.Label).string = NumberUtils_1.default.converToC(data.chips);
            }
        }
    }
    onEvent_R2C_Bet_Mes() {
        this.refreshCurRoomBetsList();
        this.refreshTotalBaoshi();
    }
    onEvent_R2C_GetBetRandInfo_Res() {
        let rouletteData = this._rouletteData;
        let content = this.nodBigWinList.getChildByName('lsvBetPlayer').getChildByName('view').getChildByName('content');
        let betBigRankInfo = rouletteData.betBigRankInfo;
        for (let index = 0; index < 9; index++) {
            let curItem = content.getChildByName(`RouletteBigWinItem${index}`);
            let scriptComm = curItem.getComponent(RouletteBigWinItem_1.default);
            const data = betBigRankInfo[index];
            curItem.active = false;
            if (index < betBigRankInfo.length) {
                curItem.active = true;
                scriptComm.updateItem(data, index);
            }
        }
    }
    refreshCurRoomBetsList() {
        let lsvBetPlayer = this.lsvBetPlayer;
        let content = lsvBetPlayer.getChildByName('view').getChildByName('content');
        let rouletteData = this._rouletteData;
        let onRoomBets = rouletteData.onRoomBets;
        for (let index = 0; index < 6; index++) {
            let curItem = content.getChildByName(`RouletteMyRecordItem${index}`);
            let scriptComm = curItem.getComponent(RouletteMyRecordItem_1.default);
            const data = onRoomBets[index];
            curItem.active = false;
            if (index < onRoomBets.length) {
                curItem.active = true;
                scriptComm.updateItem(data, index);
                cc.tween(curItem)
                    .set({ scaleY: 0 })
                    .to(0.1, { scaleY: 1 })
                    .start();
            }
        }
    }
    refreshMultipleRecord() {
        let recordCount = this._rouletteData.gameRecordList.length;
        let showRecordList = [];
        if (recordCount <= this.latRecord.node.childrenCount) {
            showRecordList = [].concat(this._rouletteData.gameRecordList);
        }
        else {
            showRecordList = this._rouletteData.gameRecordList.slice(-this.latRecord.node.childrenCount, recordCount);
        }
        let index = 0;
        for (let v of this.latRecord.node.children) {
            let color = showRecordList[index++];
            let crashRecordItem = v.getComponent(RouletteRecordItem_1.default);
            if (color === undefined) {
                crashRecordItem.clear();
            }
            else {
                crashRecordItem.setColor(color);
            }
            if (index == showRecordList.length) {
                cc.Tween.stopAllByTarget(v);
                cc.tween(v)
                    .set({ opacity: 0 })
                    .to(0.5, { opacity: 255 })
                    .start();
            }
        }
    }
    stopAllSound() {
        this.audioHelper.stopMusic();
        this.audioHelper.stopEffectByPath(RouletteGameData_1.Roulette.SOUNDS.RUN);
        this.audioHelper.stopEffectByPath(RouletteGameData_1.Roulette.SOUNDS.RESULT);
    }
    onDestroy() {
        super.onDestroy();
        this.stopAllSound();
    }
};
__decorate([
    property(cc.Prefab)
], RouletteView.prototype, "groupNode", void 0);
__decorate([
    property(TitleItemPageUser_1.default)
], RouletteView.prototype, "titleItemPageUser", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "groupParent", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "gemstoneSpine", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "endNumLabel", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "upPointer", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "downPointer", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labStartCountDown", void 0);
__decorate([
    property(cc.EditBox)
], RouletteView.prototype, "edbBetGold", void 0);
__decorate([
    property(cc.Layout)
], RouletteView.prototype, "latRecord", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labCurRound", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labBigWin", void 0);
__decorate([
    property(cc.Toggle)
], RouletteView.prototype, "tggCurRound", void 0);
__decorate([
    property(cc.Toggle)
], RouletteView.prototype, "tggBigWin", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "nodCurRoundList", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "nodBigWinList", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "latManual", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "lsvBetPlayer", void 0);
__decorate([
    property(cc.Node)
], RouletteView.prototype, "nodVerify", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labMyRecord", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labHistoryTitle", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labWorldRecord", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labFairGame", void 0);
__decorate([
    property(cc.Label)
], RouletteView.prototype, "labCopyCheck", void 0);
RouletteView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteView);
exports.default = RouletteView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2RUFBMEU7QUFDMUUsMkVBQTBHO0FBQzFHLG9GQUE0RDtBQUM1RCw4RUFBc0Q7QUFDdEQsZ0ZBQXdEO0FBQ3hELGtGQUFrRjtBQUVsRix5RUFBbUU7QUFDbkUsdUVBQW9FO0FBQ3BFLG9FQUFpRTtBQUNqRSxvRkFBNEQ7QUFDNUQsdUVBQXFHO0FBQ3JHLDBFQUF1RTtBQUN2RSw4RUFBc0Q7QUFDdEQsd0VBQWdEO0FBQ2hELGtHQUEwRTtBQUMxRSxrR0FBMEU7QUFDMUUsNkRBQTBEO0FBQzFELHlHQUFpRjtBQUNqRix1RUFBb0U7QUFDcEUsOEZBQXNFO0FBQ3RFLGtGQUEwRDtBQUMxRCw4RUFBc0Q7QUFDdEQsd0ZBQWdFO0FBQ2hFLHdGQUFnRTtBQUNoRSwrREFBb0Q7QUFDcEQseUZBQWlFO0FBRWpFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUM1QyxTQUFTO0FBQ1QsTUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDO0FBQ2xDLFNBQVM7QUFDVCxNQUFNLFlBQVksR0FBVyxPQUFPLENBQUM7QUFHckMsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsZ0JBQU07SUFBaEQ7O1FBR0ksT0FBTztRQUNDLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDakMsT0FBTztRQUNDLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFDbkMsT0FBTztRQUNDLGtCQUFhLEdBQWlCLElBQUksQ0FBQztRQUczQyxjQUFTLEdBQWMsSUFBSSxDQUFDO1FBR3BCLHNCQUFpQixHQUFzQixJQUFJLENBQUM7UUFHcEQsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsZ0JBQVcsR0FBYSxJQUFJLENB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QUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDYztBQUVqQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNhO0FBRWhDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ1U7QUFFN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDVztBQWpFYixZQUFZO0lBRmhDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLFlBQVksQ0FxdEJoQztrQkFydEJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBkaXNwYXRjaEVudGVyQ29tcGxldGUsIExvZ2ljRXZlbnQsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2RhdGEvQXBwRGF0YVwiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUywgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IFJvdWxldHRlUmVjb3JkSXRlbSBmcm9tIFwiLi9Sb3VsZXR0ZVJlY29yZEl0ZW1cIjtcbmltcG9ydCBSb3VsZXR0ZURhdGEgZnJvbSBcIi4uL2RhdGEvUm91bGV0dGVEYXRhXCI7XG5pbXBvcnQgRGF0ZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvRGF0ZVV0aWxzXCI7XG5pbXBvcnQgT3BlcmF0aW9uIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvT3BlcmF0aW9uXCI7XG5pbXBvcnQgeyBSb3VsZXR0ZUNvbmZpZyB9IGZyb20gXCIuLi9jb25maWcvUm91bGV0dGVDb25maWdcIjtcbmltcG9ydCBUaXRsZUl0ZW1QYWdlVXNlciBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9pdGVtL1RpdGxlSXRlbVBhZ2VVc2VyXCI7XG5pbXBvcnQgeyBSb3VsZXR0ZUNvbG9yRGVmaW5lIH0gZnJvbSBcIi4uL2RlZmluZS9Sb3VsZXR0ZUNvbG9yRGVmaW5lXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBSb3VsZXR0ZU15UmVjb3JkSXRlbSBmcm9tIFwiLi9Sb3VsZXR0ZU15UmVjb3JkSXRlbVwiO1xuaW1wb3J0IFJvdWxldHRlQmlnV2luSXRlbSBmcm9tIFwiLi9Sb3VsZXR0ZUJpZ1dpbkl0ZW1cIjtcbmltcG9ydCBSb3VsZXR0ZVRvdGFsUmVjb3JkVmlldyBmcm9tIFwiLi9Sb3VsZXR0ZVRvdGFsUmVjb3JkVmlld1wiO1xuaW1wb3J0IFJvdWxldHRlTXlCZXRSZWNvcmRWaWV3IGZyb20gXCIuL1JvdWxldHRlTXlCZXRSZWNvcmRWaWV3XCI7XG5pbXBvcnQgeyBSb3VsZXR0ZSB9IGZyb20gXCIuLi9kYXRhL1JvdWxldHRlR2FtZURhdGFcIjtcbmltcG9ydCBMb2dpbk5ld1ZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9sb2dpbi9Mb2dpbk5ld1ZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbi8vIOacgOWwj+S4i+azqOmHkeminVxuY29uc3QgTUlOX0JFVF9HT0xEOiBudW1iZXIgPSAyMDAwO1xuLy8g5pyA5aSn5LiL5rOo6YeR6aKdXG5jb25zdCBNQVhfQkVUX0dPTEQ6IG51bWJlciA9IDMzMDAwMDA7XG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91bGV0dGVWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgLy8g5bqU55So5pWw5o2uXG4gICAgcHJpdmF0ZSBfYXBwRGF0YTogQXBwRGF0YSA9IG51bGw7XG4gICAgLy8g55So5oi35pWw5o2uXG4gICAgcHJpdmF0ZSBfdXNlckRhdGE6IFVzZXJEYXRhID0gbnVsbDtcbiAgICAvLyDmuLjmiI/mlbDmja5cbiAgICBwcml2YXRlIF9yb3VsZXR0ZURhdGE6IFJvdWxldHRlRGF0YSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGdyb3VwTm9kZTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShUaXRsZUl0ZW1QYWdlVXNlcilcbiAgICBwcml2YXRlIHRpdGxlSXRlbVBhZ2VVc2VyOiBUaXRsZUl0ZW1QYWdlVXNlciA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBncm91cFBhcmVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBnZW1zdG9uZVNwaW5lOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZW5kTnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHVwUG9pbnRlcjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZG93blBvaW50ZXI6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJTdGFydENvdW50RG93bjogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHByaXZhdGUgZWRiQmV0R29sZDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGF5b3V0KVxuICAgIHByaXZhdGUgbGF0UmVjb3JkOiBjYy5MYXlvdXQgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ3VyUm91bmQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCaWdXaW46IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIHByaXZhdGUgdGdnQ3VyUm91bmQ6IGNjLlRvZ2dsZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZSlcbiAgICBwcml2YXRlIHRnZ0JpZ1dpbjogY2MuVG9nZ2xlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIG5vZEN1clJvdW5kTGlzdDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RCaWdXaW5MaXN0OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbGF0TWFudWFsOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXRlIGxzdkJldFBsYXllcjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RWZXJpZnk6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYk15UmVjb3JkOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkhpc3RvcnlUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJXb3JsZFJlY29yZDogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJGYWlyR2FtZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJDb3B5Q2hlY2s6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIG1heE51bTogbnVtYmVyID0gMjtcbiAgICBtaW5OdW06IG51bWJlciA9IDA7XG4gICAgLy/mkq3mlL7ml7bpl7RcbiAgICB0aW1lID0gMDtcbiAgICAvL+aSreaUvuaAu+aXtumXtFxuICAgIHRvdGFsVGltZSA9IDA7XG4gICAgLy8gbGFiZWwg6KGM5a69XG4gICAgbGluZVdpZHRoID0gMDtcbiAgICAvLyBsYWJlbCDmgLvlrr3luqZcbiAgICB0b3RhbFdpZHRoID0gMDtcbiAgICByb2xsaW5nID0gZmFsc2U7XG4gICAgbnVtQXJyYXkgPSBbXTtcbiAgICBjdXJOdW06IG51bWJlciA9IDA7XG4gICAgcm9sbFJvdW5kOiBudW1iZXIgPSAyO1xuICAgIGdyb3VwTWF4OiBudW1iZXIgPSA5O1xuICAgIC8qKuS4gOS4quWuneefs+eahOWuveW6piovXG4gICAgaXRlbVdpZHRoOiBudW1iZXIgPSAxMTI7XG4gICAgZGlhbFRpbWU6IG51bWJlciA9IDY7XG4gICAgLyoq5LiA5LiqSXRlbeaAu+S4quaVsDI5Ki9cbiAgICBpdGVtVG90YWw6IG51bWJlciA9IDI5O1xuICAgIGdyb3VwV2lkdGg6IG51bWJlciA9IDA7XG4gICAgZW5kTnVtOiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByZWZhYnMvUm91bGV0dGVWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgZGlzcGF0Y2hFbnRlckNvbXBsZXRlKHsgdHlwZTogTG9naWNUeXBlLkdBTUUsIHZpZXdzOiBbdGhpc10gfSk7XG5cbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaERlZmF1bHRCeVBvcygpO1xuICAgICAgICB0aGlzLnBsYXlQb2ludGVyQnlOdW0oKTtcblxuICAgICAgICB0aGlzLnN0YXJ0Q291bnREb3duKCk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheU11c2ljKFJvdWxldHRlLlNPVU5EUy5CR00sIHRoaXMuYnVuZGxlKTtcbiAgICB9XG5cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzXCIsIHRoaXMub25FdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX0dldFJvdWxldHRlSW5mb19SZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19HZXRSb3VsZXR0ZUluZm9fUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiRXZlbnRfTTJDX1JvdWxldHRlU3RhcnRCZXRfTWVzXCIsIHRoaXMub25FdmVudF9NMkNfUm91bGV0dGVTdGFydEJldF9NZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfUm91bGV0dGVTdGFydF9tZXNcIiwgdGhpcy5vbkV2ZW50X00yQ19Sb3VsZXR0ZVN0YXJ0X21lcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1IyQ19QYXliYWNrUGhhc2VfTWVzXCIsIHRoaXMub25FdmVudF9SMkNfUGF5YmFja1BoYXNlX01lcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1IyQ19CZXRfTWVzXCIsIHRoaXMub25FdmVudF9SMkNfQmV0X01lcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIkV2ZW50X1IyQ19HZXRCZXRSYW5kSW5mb19SZXNcIiwgdGhpcy5vbkV2ZW50X1IyQ19HZXRCZXRSYW5kSW5mb19SZXMpO1xuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0Um91bGV0dGVJbmZvKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldFJvdWxldHRlSW5mbygpIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMk1fR2V0Um91bGV0dGVJbmZvX1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX0dldFJvdWxldHRlSW5mb19SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMk1fR2V0Um91bGV0dGVJbmZvX1JlcSwgTVNULk91dGVyT3Bjb2RlX1JvdWxldHRlLkMyTV9HZXRSb3VsZXR0ZUluZm9fUmVxLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMudGl0bGVJdGVtUGFnZVVzZXIubGFuZ3VhZ2VQYWdlTmFtZShNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYlBhZ2VOYW1lXCIsIHRydWUpKTtcbiAgICAgICAgdGhpcy5sYWJDdXJSb3VuZC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQ3VyUm91bmRcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQmlnV2luLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJCaWdXaW5cIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiSGlzdG9yeVRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJoaXN0b3J5XCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYk15UmVjb3JkLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJteUhpc3RvcnlcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiV29ybGRSZWNvcmQubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIndvcmxkSGlzdG9yeVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJGYWlyR2FtZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiZmFpckdhbWVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQ29weUNoZWNrLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJDb3B5Q2hlY2tcIiwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYXBwRGF0YSA9IEcuRGF0YU1nci5nZXQoQXBwRGF0YSk7XG4gICAgICAgIHRoaXMuX3VzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIHRoaXMuX3JvdWxldHRlRGF0YSA9IEcuRGF0YU1nci5nZXQoUm91bGV0dGVEYXRhKTtcblxuICAgICAgICB0aGlzLmdyb3VwV2lkdGggPSB0aGlzLml0ZW1Ub3RhbCAqIHRoaXMuaXRlbVdpZHRoO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICByZWZyZXNoRGVmYXVsdEJ5UG9zKCkge1xuICAgICAgICB0aGlzLmdyb3VwUGFyZW50LnJlbW92ZUFsbENoaWxkcmVuKClcbiAgICAgICAgdGhpcy5ncm91cFBhcmVudC5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZ3JvdXBNYXg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBncm91cFByZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuZ3JvdXBOb2RlKTtcbiAgICAgICAgICAgIGdyb3VwUHJlLm5hbWUgPSAnZ3JvdXBQcmUnICsgaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmdyb3VwUGFyZW50LmFkZENoaWxkKGdyb3VwUHJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ3JvdXBQYXJlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkudXBkYXRlTGF5b3V0KCk7XG5cbiAgICAgICAgbGV0IGN1ck51bSA9IHRoaXMuY3VyTnVtXG4gICAgICAgIGxldCBkaWZmWCA9IDA7XG4gICAgICAgIHN3aXRjaCAoY3VyTnVtKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZGlmZlggPSB0aGlzLml0ZW1XaWR0aCAqIDY7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZGlmZlggPSB0aGlzLml0ZW1XaWR0aCAqIDUgLSAodGhpcy5pdGVtV2lkdGggKiAwLjUpICsgMTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZGlmZlggPSAyNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwUGFyZW50LnggKz0gZGlmZlg7XG4gICAgfVxuXG4gICAgb25FdmVudF9NMkNfUm91bGV0dGVTdGFydF9tZXMoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJvdWxldHRlRGF0YSA9IEcuRGF0YU1nci5nZXQoUm91bGV0dGVEYXRhKTtcblxuICAgICAgICB0aGlzLmRpYWxUaW1lID0gKHJvdWxldHRlRGF0YS5TdG9wVGltZVN0YW1wIC0gdGhpcy5fYXBwRGF0YS5nZXRTZXJ2ZXJUaW1lc3RhbXAoKSkgLyAxMDAwO1xuICAgICAgICB0aGlzLmVuZE51bSA9IHJvdWxldHRlRGF0YS5lbmRJbmRleDtcbiAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0t5rua5Yqo5pe26Ze0LS0tLS0tLT46JyArIHRoaXMuZGlhbFRpbWUpO1xuICAgICAgICAvL+iHquW3seafpeeci+e7k+aenFxuICAgICAgICBsZXQgY29sb3IgPSBbJ3B1cnBsZXInLCAncmVkJywgJ2dyZWVuJ11cbiAgICAgICAgdGhpcy5lbmROdW1MYWJlbC5zdHJpbmcgPSBg57uT5p6c6aKc6ImyOiR7Y29sb3JbdGhpcy5lbmROdW1dfWA7XG4gICAgICAgIHRoaXMuZ2Vtc3RvbmVTcGluZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBsZXQgZGlmZlggPSB0aGlzLmdldERpZmZYKCk7XG4gICAgICAgIGxldCBzID0gdGhpcy5yb2xsUm91bmQgKiB0aGlzLmdyb3VwV2lkdGggKyBkaWZmWDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ncm91cFBhcmVudClcbiAgICAgICAgICAgIC5ieSh0aGlzLmRpYWxUaW1lLCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGNjLnYyKC1zLCAwKVxuICAgICAgICAgICAgfSwgY2MuZWFzZUluT3V0KDIpKVxuICAgICAgICAgICAgLmNhbGwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYucm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VyTnVtID0gc2VsZi5lbmROdW07XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZyZXNoRGVmYXVsdEJ5UG9zKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5UG9pbnRlckJ5TnVtKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5wbGF5R2Vtc3RvbmVTcGluZSgpO1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZUN1ckl0ZW0oKTtcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvSGVscGVyLnBsYXlFZmZlY3QoUm91bGV0dGUuU09VTkRTLlJFU1VMVCwgc2VsZi5idW5kbGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB0aGlzLnJvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNob3dDdXJJdGVtKCk7XG4gICAgICAgIHRoaXMubG9vcFBvaW50ZXJTcGluZSgpO1xuICAgICAgICB0aGlzLnJlc3VtZVJhdGUoKTtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5wbGF5RWZmZWN0KFJvdWxldHRlLlNPVU5EUy5SVU4sIHRoaXMuYnVuZGxlKTtcbiAgICB9XG5cbiAgICBnZXREaWZmWCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbWlkQ291bnQgPSB0aGlzLml0ZW1Ub3RhbCAvIDIgKyAwLjU7XG4gICAgICAgIGxldCBzcGFjaW5nWCA9IDUwO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSAoKG1pZENvdW50IC0gMSkgLSAyKSAqIHRoaXMuaXRlbVdpZHRoO1xuICAgICAgICBsZXQgZ2FwID0gMDtcblxuICAgICAgICBpZiAodGhpcy5jdXJOdW0gPT0gMCkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmVuZE51bSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gZGlzdGFuY2UgKyAyICogdGhpcy5pdGVtV2lkdGggKyAzNTsgIC8vLS1pdGVtMTBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBnYXAgPSBkaXN0YW5jZSAtICgzICogdGhpcy5pdGVtV2lkdGgpIC0gc3BhY2luZ1ggLSA1OyAvLy0taXRlbTExXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gZGlzdGFuY2UgKyAyMCAqIHRoaXMuaXRlbVdpZHRoIC0gMzU7ICAvLy0tIGl0ZW0xNFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1ck51bSA9PSAxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZW5kTnVtKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBnYXAgPSBkaXN0YW5jZSArIHRoaXMuaXRlbVdpZHRoIC0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gZGlzdGFuY2UgLSAoNSAqIHRoaXMuaXRlbVdpZHRoKSArIDE1O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGdhcCA9IGRpc3RhbmNlICsgMTggKiB0aGlzLml0ZW1XaWR0aCArIDMwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5lbmROdW0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGdhcCA9IGRpc3RhbmNlICsgKDIgKiB0aGlzLml0ZW1XaWR0aCkgKyAzNTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBnYXAgPSBkaXN0YW5jZSArIHRoaXMuaXRlbVdpZHRoIC0gMTU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gZGlzdGFuY2UgKyAxNCAqIHRoaXMuaXRlbVdpZHRoIC0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnYXA7XG4gICAgfVxuXG4gICAgaGlkZUN1ckl0ZW0oKSB7XG4gICAgICAgIGxldCBoaWRlSW5kZXg7XG4gICAgICAgIHN3aXRjaCAodGhpcy5lbmROdW0pIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBoaWRlSW5kZXggPSAxMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBoaWRlSW5kZXggPSAxMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBoaWRlSW5kZXggPSAxNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5ncm91cE1heDsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGdlbVN0b25lSXRlbSA9IHRoaXMuZ3JvdXBQYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2dyb3VwUHJlJyArIGluZGV4KTtcbiAgICAgICAgICAgIGdlbVN0b25lSXRlbS5nZXRDaGlsZEJ5TmFtZShgaXRlbSR7aGlkZUluZGV4fWApLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0N1ckl0ZW0oKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmdyb3VwTWF4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgZ2VtU3RvbmVJdGVtID0gdGhpcy5ncm91cFBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnZ3JvdXBQcmUnICsgaW5kZXgpO1xuICAgICAgICAgICAgZ2VtU3RvbmVJdGVtLmdldENoaWxkQnlOYW1lKGBpdGVtMTBgKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgZ2VtU3RvbmVJdGVtLmdldENoaWxkQnlOYW1lKGBpdGVtMTFgKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgZ2VtU3RvbmVJdGVtLmdldENoaWxkQnlOYW1lKGBpdGVtMTRgKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheUdlbXN0b25lU3BpbmUoKSB7XG4gICAgICAgIGxldCBjb2xvciA9IFsnemknLCAnaG9uZycsICdsdSddXG4gICAgICAgIHRoaXMuZ2Vtc3RvbmVTcGluZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2Vtc3RvbmVTcGluZS5nZXRDaGlsZEJ5TmFtZSgnc3BpbmUnKTtcbiAgICAgICAgbGV0IHNrZSA9IG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgc2tlLnNldEFuaW1hdGlvbigwLCBgJHtjb2xvclt0aGlzLmVuZE51bV19YCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGxvb3BQb2ludGVyU3BpbmUoKSB7XG4gICAgICAgIGxldCB1cFNrZSA9IHRoaXMudXBQb2ludGVyLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHVwU2tlLnNldEFuaW1hdGlvbigwLCAnYW5pbWF0aW9uJywgdHJ1ZSk7XG4gICAgICAgIGxldCBkb3duU2tlID0gdGhpcy5kb3duUG9pbnRlci5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICBkb3duU2tlLnNldEFuaW1hdGlvbigwLCAnYW5pbWF0aW9uJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGxheVBvaW50ZXJCeU51bSgpIHtcbiAgICAgICAgbGV0IGNvbG9yID0gWyd6aScsICdob25nJywgJ2x1J11cbiAgICAgICAgbGV0IHVwU2tlID0gdGhpcy51cFBvaW50ZXIuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdXBTa2Uuc2V0QW5pbWF0aW9uKDAsIGAke2NvbG9yW3RoaXMuZW5kTnVtXX1gLCB0cnVlKTtcbiAgICAgICAgbGV0IGRvd25Ta2UgPSB0aGlzLmRvd25Qb2ludGVyLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIGRvd25Ta2Uuc2V0QW5pbWF0aW9uKDAsIGAke2NvbG9yW3RoaXMuZW5kTnVtXX1gLCB0cnVlKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKEJ1dHRvbk5hbWU6IGFueSwgYnRuTm9kZTogYW55KSB7XG4gICAgICAgIHN3aXRjaCAoQnV0dG9uTmFtZSkge1xuICAgICAgICAgICAgY2FzZSAndGVzdENob3UnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvbGxpbmcpIHJldHVybjtcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKCh0aGlzLm1heE51bSArIDEpIC0gdGhpcy5taW5OdW0pKSArIHRoaXMubWluTnVtO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kTnVtID0gbnVtO1xuXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gWydwdXJwbGVyJywgJ3JlZCcsICdncmVlbiddXG4gICAgICAgICAgICAgICAgdGhpcy5lbmROdW1MYWJlbC5zdHJpbmcgPSBg57uT5p6c6aKc6ImyOiR7Y29sb3JbdGhpcy5lbmROdW1dfWA7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5vbkV2ZW50X00yQ19Sb3VsZXR0ZVN0YXJ0X21lcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkNsb3NlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXFFbnRlckxvYmJ5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0MFwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJldEdvbGQoUm91bGV0dGVDb25maWcuQmV0R29sZEJ1dHRvblswXSwgdGhpcy5lZGJCZXRHb2xkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CZXQxXCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQmV0R29sZChSb3VsZXR0ZUNvbmZpZy5CZXRHb2xkQnV0dG9uWzFdLCB0aGlzLmVkYkJldEdvbGQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bkJldDJcIjpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0xvZ2luZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCZXRHb2xkKFJvdWxldHRlQ29uZmlnLkJldEdvbGRCdXR0b25bMl0sIHRoaXMuZWRiQmV0R29sZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0M1wiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm11bEJldEdvbGQoUm91bGV0dGVDb25maWcuQmV0R29sZEJ1dHRvblszXSwgdGhpcy5lZGJCZXRHb2xkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5CZXQ0XCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXVsQmV0R29sZChSb3VsZXR0ZUNvbmZpZy5CZXRHb2xkQnV0dG9uWzRdLCB0aGlzLmVkYkJldEdvbGQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRnZ0N1clJvdW5kXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja015UmVjb3JkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidGdnQmlnV2luXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1dvcmRSZWNvcmQoKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiYnRuUHVycGxlXCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DMk1fTXlSb3VsZXR0ZUJldF9SZXEoMClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5HcmVlblwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQzJNX015Um91bGV0dGVCZXRfUmVxKDIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuUmVkXCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DMk1fTXlSb3VsZXR0ZUJldF9SZXEoMSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5Xb3JsZFJlY29yZFwiOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBSb3VsZXR0ZVRvdGFsUmVjb3JkVmlldywgYnVuZGxlOiB0aGlzLmJ1bmRsZSB9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bk15UmVjb3JkXCI6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFJvdWxldHRlTXlCZXRSZWNvcmRWaWV3LCBidW5kbGU6IHRoaXMuYnVuZGxlIH0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ29weU5vXCI6XG4gICAgICAgICAgICAgICAgbGV0IGxhYlJvdW5kSGFzaCA9IHRoaXMubm9kVmVyaWZ5LmdldENoaWxkQnlOYW1lKCdyb3VuZEhhc2hOb2RlJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYlJvdW5kSGFzaCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5jb3B5VG9DbGlwKGxhYlJvdW5kSGFzaC5zdHJpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrTG9naW5lZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VyRGF0YS5pZCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJ0b0xvZ2luXCIsIHRydWUpKTtcbiAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBMb2dpbk5ld1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVkaXRib3hCZXRHb2xkKGVkYkJldEdvbGQ6IGNjLkVkaXRCb3gpOiBudW1iZXIge1xuICAgICAgICBsZXQgY29udGVudDogc3RyaW5nID0gZWRiQmV0R29sZC5zdHJpbmc7XG4gICAgICAgIGxldCBudW1CZXRHb2xkOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBudW1CZXRHb2xkID0gTnVtYmVyKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1CZXRHb2xkO1xuICAgIH1cblxuICAgIG9uQzJNX015Um91bGV0dGVCZXRfUmVxKEJldEluZGV4KSB7XG4gICAgICAgIGxldCBiZXRHb2xkOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hCZXRHb2xkKHRoaXMuZWRiQmV0R29sZCk7XG4gICAgICAgIGlmIChiZXRHb2xkIDwgTUlOX0JFVF9HT0xEIHx8IGJldEdvbGQgPiBNQVhfQkVUX0dPTEQpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcIklucHV0QmV0R29sZFwiLCBNSU5fQkVUX0dPTEQsIE1BWF9CRVRfR09MRF0sIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Zyo5LiL5rOo6Zi25q61XG4gICAgICAgIGxldCBzdGF0dXMgPSB0aGlzLl9yb3VsZXR0ZURhdGEuU3RhdHVzO1xuICAgICAgICBpZiAoc3RhdHVzICE9IE1TVC5Sb3VsZXR0ZVN0YXR1cy5CZXRQaGFzZSkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJOb3RCZXRTdGF0ZVwiLCB0cnVlKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVxID0gTVNULkMyTV9NeVJvdWxldHRlQmV0X1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgQmV0R29sZDogTnVtYmVyVXRpbHMuY29udmVyVG9TKGJldEdvbGQpLFxuICAgICAgICAgICAgQmV0SW5kZXhcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX015Um91bGV0dGVCZXRfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhNU1QuQzJNX015Um91bGV0dGVCZXRfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfUm91bGV0dGUuQzJNX015Um91bGV0dGVCZXRfUmVxLCBidWZmZXIpO1xuICAgIH1cblxuICAgIGNsaWNrTXlSZWNvcmQoKSB7XG4gICAgICAgIHRoaXMubm9kQmlnV2luTGlzdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RDdXJSb3VuZExpc3QuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjbGlja1dvcmRSZWNvcmQoKSB7XG4gICAgICAgIHRoaXMubm9kQmlnV2luTGlzdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZEN1clJvdW5kTGlzdC5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnJlcXVlc3RHZXRCZXRSYW5rSW5mbygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RHZXRCZXRSYW5rSW5mbygpIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlJfR2V0QmV0UmFua0luZm9fUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKClcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlJfR2V0QmV0UmFua0luZm9fUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJSX0dldEJldFJhbmtJbmZvX1JlcSwgTVNULk91dGVyT3Bjb2RlX1JvdWxldHRlLkMyUl9HZXRCZXRSYW5rSW5mb19SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZWRCZXRHb2xkKGNvbnRlbnQ6IHN0cmluZywgZWRiOiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGxldCBhcnJDb250ZW50OiBzdHJpbmdbXSA9IGNvbnRlbnQuc3BsaXQoJycpO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJyQ29udGVudC5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgbGV0IHJlZzogUmVnRXhwID0gL1swLTldL2c7XG4gICAgICAgICAgICBpZiAoIXJlZy50ZXN0KGFyckNvbnRlbnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgYXJyQ29udGVudC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGVnYWxDb250ZW50OiBzdHJpbmcgPSBhcnJDb250ZW50LmpvaW4oXCIsXCIpLnJlcGxhY2UoLywvZywgXCJcIik7XG4gICAgICAgIGxldCBudW1Db250ZW50OiBudW1iZXIgPSBOdW1iZXIobGVnYWxDb250ZW50KTtcblxuICAgICAgICBpZiAobnVtQ29udGVudCA8PSAwKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBudW1Db250ZW50LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWRiLnN0cmluZyA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRCZXRHb2xkKGdvbGQ6IG51bWJlciwgZWRiQmV0R29sZDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgbnVtQmV0R29sZDogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKGVkYkJldEdvbGQuc3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG51bUJldEdvbGQgPSBOdW1iZXIoZWRiQmV0R29sZC5zdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVkYkJldEdvbGQuc3RyaW5nID0gT3BlcmF0aW9uLmFkZChnb2xkLCBudW1CZXRHb2xkKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbXVsQmV0R29sZChnb2xkOiBudW1iZXIsIGVkYkJldEdvbGQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgbGV0IG51bUJldEdvbGQ6IG51bWJlciA9IDA7XG4gICAgICAgIGlmIChlZGJCZXRHb2xkLnN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBudW1CZXRHb2xkID0gTnVtYmVyKGVkYkJldEdvbGQuc3RyaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlZGJCZXRHb2xkLnN0cmluZyA9IE1hdGguZmxvb3IoT3BlcmF0aW9uLm11bChnb2xkLCBudW1CZXRHb2xkKSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVxRW50ZXJMb2JieSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMk1fVHJhbnNmZXJNYXBfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBSb29tTmFtZTogQ29uZmlnLkdhbWVJZC5Mb2JieSxcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMk1fVHJhbnNmZXJNYXBfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJNX1RyYW5zZmVyTWFwX1JlcSwgTVNULk91dGVyT3Bjb2RlX01hcC5DMk1fVHJhbnNmZXJNYXBfUmVxLCBidWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzKGRhdGE6IE1TVC5JTTJDX1RyYW5zZmVyTWFwX1Jlcyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgZGlzcGF0Y2goTG9naWNFdmVudC5FTlRFUl9IQUxMKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FdmVudF9NMkNfUm91bGV0dGVTdGFydEJldF9NZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKTtcbiAgICAgICAgdGhpcy5yZXN1bWVSYXRlKCk7XG4gICAgICAgIHRoaXMub25FdmVudF9SMkNfUGF5YmFja1BoYXNlX01lcygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hDdXJSb29tQmV0c0xpc3QoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxCYW9zaGkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlkK/liqjmuLjmiI/lgJLorqHml7ZcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXJ0Q291bnREb3duKCkge1xuICAgICAgICB0aGlzLnN0b3BDb3VudERvd24oKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZUNvdW50RG9udyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YGc5q2i5ri45oiP5YCS6K6h5pe2XG4gICAgICovXG4gICAgcHJpdmF0ZSBzdG9wQ291bnREb3duKCkge1xuICAgICAgICB0aGlzLmxhYlN0YXJ0Q291bnREb3duLnN0cmluZyA9IFwiMC4wMFwiO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy51cGRhdGVDb3VudERvbncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOa4uOaIj+WAkuiuoeaXtlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlQ291bnREb253KCk6IHZvaWQge1xuICAgICAgICBsZXQgbXMgPSB0aGlzLl9yb3VsZXR0ZURhdGEuc3RvcEJldFRpbWVTdGFtcCAtIHRoaXMuX2FwcERhdGEuZ2V0U2VydmVyVGltZXN0YW1wKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfkuIvms6jliankvZnml7bpl7RtczonICsgbXMpO1xuICAgICAgICBpZiAobXMgPD0gMCkge1xuICAgICAgICAgICAgbXMgPSAwO1xuICAgICAgICAgICAgdGhpcy5zdG9wQ291bnREb3duKCk7XG4gICAgICAgICAgICB0aGlzLmxhYlN0YXJ0Q291bnREb3duLnN0cmluZyA9IFwiMC4wMFwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFiU3RhcnRDb3VudERvd24uc3RyaW5nID0gRGF0ZVV0aWxzLmdldE1zVG9TKG1zKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hHYW1lKCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX3JvdWxldHRlRGF0YS5TdGF0dXMpIHtcbiAgICAgICAgICAgIGNhc2UgTVNULlJvdWxldHRlU3RhdHVzLkJldFBoYXNlOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydENvdW50RG93bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNU1QuUm91bGV0dGVTdGF0dXMuQW5pbWF0aW9uUGhhc2U6IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNU1QuUm91bGV0dGVTdGF0dXMuUGF5YmFja1BoYXNlOiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRXZlbnRfTTJDX0dldFJvdWxldHRlSW5mb19SZXMoKSB7XG4gICAgICAgIHRoaXMucmVmcmVzaEdhbWUoKTtcbiAgICAgICAgdGhpcy5yZXN1bWVSYXRlKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEN1clJvb21CZXRzTGlzdCgpO1xuICAgICAgICB0aGlzLm9uRXZlbnRfUjJDX1BheWJhY2tQaGFzZV9NZXMoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxCYW9zaGkoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTXVsdGlwbGVSZWNvcmQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc3VtZVJhdGUoKSB7XG4gICAgICAgIGxldCBzdGF0dXMgPSB0aGlzLl9yb3VsZXR0ZURhdGEuU3RhdHVzID09IE1TVC5Sb3VsZXR0ZVN0YXR1cy5CZXRQaGFzZTtcbiAgICAgICAgdGhpcy5lbmFibGVFZGl0Ym94UmF0ZSh0aGlzLmVkYkJldEdvbGQsIHN0YXR1cyk7XG4gICAgICAgIHRoaXMuZW5hYmxlQnRuQmV0UmF0ZShzdGF0dXMpO1xuXG4gICAgICAgIGlmICghc3RhdHVzKVxuICAgICAgICAgICAgdGhpcy5sYWJTdGFydENvdW50RG93bi5zdHJpbmcgPSBcIjAuMDBcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGVuYWJsZUJ0bkJldFJhdGUoaXNFbmFibGU6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGltZ0JldEJnID0gdGhpcy5sYXRNYW51YWwuZ2V0Q2hpbGRCeU5hbWUoJ25vZEJldFJhaXNlJykuZ2V0Q2hpbGRCeU5hbWUoJ2ltZ0JldEJnJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDU7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBidG5CZXQgPSBpbWdCZXRCZy5nZXRDaGlsZEJ5TmFtZSgnYnRuQmV0JyArIGluZGV4KS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKVxuICAgICAgICAgICAgYnRuQmV0LmVuYWJsZWQgPSBpc0VuYWJsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBub0JldEJ0biA9IHRoaXMubGF0TWFudWFsLmdldENoaWxkQnlOYW1lKCdub0JldEJ0bicpO1xuXG4gICAgICAgIGxldCBidG5QdXJwbGUgPSBub0JldEJ0bi5nZXRDaGlsZEJ5TmFtZSgnYnRuUHVycGxlJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGxldCBidG5HcmVlbiA9IG5vQmV0QnRuLmdldENoaWxkQnlOYW1lKCdidG5HcmVlbicpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICBsZXQgYnRuUmVkID0gbm9CZXRCdG4uZ2V0Q2hpbGRCeU5hbWUoJ2J0blJlZCcpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICBidG5QdXJwbGUuZW5hYmxlZCA9IGlzRW5hYmxlO1xuICAgICAgICBidG5HcmVlbi5lbmFibGVkID0gaXNFbmFibGU7XG4gICAgICAgIGJ0blJlZC5lbmFibGVkID0gaXNFbmFibGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmFibGVFZGl0Ym94UmF0ZShlZGJDaGFuZ2VSYXRlOiBjYy5FZGl0Qm94LCBpc0VuYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBlZGJDaGFuZ2VSYXRlLmVuYWJsZWQgPSBpc0VuYWJsZTtcbiAgICAgICAgbGV0IG5vZENvbnRlbnQ6IGNjLk5vZGUgPSBlZGJDaGFuZ2VSYXRlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJURVhUX0xBQkVMXCIpO1xuICAgICAgICBsZXQgbm9kUGxhY2Vob2xkZXI6IGNjLk5vZGUgPSBlZGJDaGFuZ2VSYXRlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJQTEFDRUhPTERFUl9MQUJFTFwiKTtcbiAgICAgICAgaWYgKGlzRW5hYmxlKSB7XG4gICAgICAgICAgICBub2RDb250ZW50LmNvbG9yID0gUm91bGV0dGVDb2xvckRlZmluZS5FbmFibGVSYXRlLkVOQUJMRTtcbiAgICAgICAgICAgIG5vZFBsYWNlaG9sZGVyLmNvbG9yID0gUm91bGV0dGVDb2xvckRlZmluZS5FbmFibGVSYXRlLkVOQUJMRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZENvbnRlbnQuY29sb3IgPSBSb3VsZXR0ZUNvbG9yRGVmaW5lLkVuYWJsZVJhdGUuRElTQUJMRTtcbiAgICAgICAgICAgIG5vZFBsYWNlaG9sZGVyLmNvbG9yID0gUm91bGV0dGVDb2xvckRlZmluZS5FbmFibGVSYXRlLkRJU0FCTEU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkV2ZW50X1IyQ19QYXliYWNrUGhhc2VfTWVzKCkge1xuICAgICAgICBsZXQgcm91bGV0dGVEYXRhID0gdGhpcy5fcm91bGV0dGVEYXRhO1xuICAgICAgICBsZXQgbGFiR2FtZU5vID0gdGhpcy5ub2RWZXJpZnkuZ2V0Q2hpbGRCeU5hbWUoJ2xhYkdhbWVObycpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxldCBsYWJIYXNoID0gdGhpcy5ub2RWZXJpZnkuZ2V0Q2hpbGRCeU5hbWUoJ2hhc2hOb2RlJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYkhhc2gnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsZXQgbGFiUm91bmROdW0gPSB0aGlzLm5vZFZlcmlmeS5nZXRDaGlsZEJ5TmFtZSgncm91bmROb2RlJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYlJvdW5kTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGV0IGxhYlJvdW5kSGFzaCA9IHRoaXMubm9kVmVyaWZ5LmdldENoaWxkQnlOYW1lKCdyb3VuZEhhc2hOb2RlJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYlJvdW5kSGFzaCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGxhYkdhbWVOby5zdHJpbmcgPSBgR2FtZSBOby4ke3JvdWxldHRlRGF0YS5jdXJSb3VuZH1gO1xuICAgICAgICBsYWJIYXNoLnN0cmluZyA9IHJvdWxldHRlRGF0YS5oYXNoU2FsdDtcbiAgICAgICAgbGFiUm91bmROdW0uc3RyaW5nID0gU3RyaW5nKHJvdWxldHRlRGF0YS5yYW5kb21OdW0pO1xuICAgICAgICBsYWJSb3VuZEhhc2guc3RyaW5nID0gcm91bGV0dGVEYXRhLnJvdW5kSGFzaDtcblxuICAgICAgICB0aGlzLnJlZnJlc2hNdWx0aXBsZVJlY29yZCgpO1xuICAgIH1cblxuICAgIHJlZnJlc2hUb3RhbEJhb3NoaSgpIHtcbiAgICAgICAgbGV0IHJvdWxldHRlRGF0YSA9IHRoaXMuX3JvdWxldHRlRGF0YTtcbiAgICAgICAgbGV0IG9uUm9vbVRvdGFsQmV0ID0gcm91bGV0dGVEYXRhLm9uUm9vbVRvdGFsQmV0O1xuICAgICAgICBpZiAoIW9uUm9vbVRvdGFsQmV0IHx8IG9uUm9vbVRvdGFsQmV0Lmxlbmd0aCA8PSAwKSByZXR1cm47XG4gICAgICAgIGxldCBsYWJQdXJwQ2hpcHMgPSB0aGlzLm5vZEN1clJvdW5kTGlzdC5nZXRDaGlsZEJ5TmFtZSgnbGF0QmFvc2hpJykuZ2V0Q2hpbGRCeU5hbWUoJ3B1cnAnKS5nZXRDaGlsZEJ5TmFtZSgnbGFiQ2hpcHMnKTtcbiAgICAgICAgbGV0IGxhYlJlZENoaXBzID0gdGhpcy5ub2RDdXJSb3VuZExpc3QuZ2V0Q2hpbGRCeU5hbWUoJ2xhdEJhb3NoaScpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5nZXRDaGlsZEJ5TmFtZSgnbGFiQ2hpcHMnKTtcbiAgICAgICAgbGV0IGxhYkdyZWVuQ2hpcHMgPSB0aGlzLm5vZEN1clJvdW5kTGlzdC5nZXRDaGlsZEJ5TmFtZSgnbGF0QmFvc2hpJykuZ2V0Q2hpbGRCeU5hbWUoJ2dyZWVuJykuZ2V0Q2hpbGRCeU5hbWUoJ2xhYkNoaXBzJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG9uUm9vbVRvdGFsQmV0Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IG9uUm9vbVRvdGFsQmV0W2luZGV4XTtcbiAgICAgICAgICAgIGlmIChkYXRhLmNvbG9yID09IDApIHtcbiAgICAgICAgICAgICAgICBsYWJQdXJwQ2hpcHMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5jaGlwcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY29sb3IgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxhYlJlZENoaXBzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKGRhdGEuY2hpcHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYWJHcmVlbkNoaXBzLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKGRhdGEuY2hpcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FdmVudF9SMkNfQmV0X01lcygpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQ3VyUm9vbUJldHNMaXN0KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFRvdGFsQmFvc2hpKCk7XG4gICAgfVxuXG4gICAgb25FdmVudF9SMkNfR2V0QmV0UmFuZEluZm9fUmVzKCkge1xuICAgICAgICBsZXQgcm91bGV0dGVEYXRhID0gdGhpcy5fcm91bGV0dGVEYXRhO1xuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kQmlnV2luTGlzdC5nZXRDaGlsZEJ5TmFtZSgnbHN2QmV0UGxheWVyJykuZ2V0Q2hpbGRCeU5hbWUoJ3ZpZXcnKS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgICAgICBsZXQgYmV0QmlnUmFua0luZm8gPSByb3VsZXR0ZURhdGEuYmV0QmlnUmFua0luZm87XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA5OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgY3VySXRlbSA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoYFJvdWxldHRlQmlnV2luSXRlbSR7aW5kZXh9YCk7XG4gICAgICAgICAgICBsZXQgc2NyaXB0Q29tbSA9IGN1ckl0ZW0uZ2V0Q29tcG9uZW50KFJvdWxldHRlQmlnV2luSXRlbSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYmV0QmlnUmFua0luZm9baW5kZXhdO1xuICAgICAgICAgICAgY3VySXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJldEJpZ1JhbmtJbmZvLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGN1ckl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY3JpcHRDb21tLnVwZGF0ZUl0ZW0oZGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaEN1clJvb21CZXRzTGlzdCgpIHtcbiAgICAgICAgbGV0IGxzdkJldFBsYXllciA9IHRoaXMubHN2QmV0UGxheWVyO1xuICAgICAgICBsZXQgY29udGVudCA9IGxzdkJldFBsYXllci5nZXRDaGlsZEJ5TmFtZSgndmlldycpLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG4gICAgICAgIGxldCByb3VsZXR0ZURhdGEgPSB0aGlzLl9yb3VsZXR0ZURhdGE7XG5cbiAgICAgICAgbGV0IG9uUm9vbUJldHMgPSByb3VsZXR0ZURhdGEub25Sb29tQmV0cztcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDY7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBjdXJJdGVtID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShgUm91bGV0dGVNeVJlY29yZEl0ZW0ke2luZGV4fWApO1xuICAgICAgICAgICAgbGV0IHNjcmlwdENvbW0gPSBjdXJJdGVtLmdldENvbXBvbmVudChSb3VsZXR0ZU15UmVjb3JkSXRlbSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gb25Sb29tQmV0c1tpbmRleF07XG4gICAgICAgICAgICBjdXJJdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgb25Sb29tQmV0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjdXJJdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2NyaXB0Q29tbS51cGRhdGVJdGVtKGRhdGEsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGN1ckl0ZW0pXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoeyBzY2FsZVk6IDAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZVk6IDEgfSlcbiAgICAgICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2hNdWx0aXBsZVJlY29yZCgpIHtcbiAgICAgICAgbGV0IHJlY29yZENvdW50OiBudW1iZXIgPSB0aGlzLl9yb3VsZXR0ZURhdGEuZ2FtZVJlY29yZExpc3QubGVuZ3RoO1xuICAgICAgICBsZXQgc2hvd1JlY29yZExpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgIGlmIChyZWNvcmRDb3VudCA8PSB0aGlzLmxhdFJlY29yZC5ub2RlLmNoaWxkcmVuQ291bnQpIHtcbiAgICAgICAgICAgIHNob3dSZWNvcmRMaXN0ID0gW10uY29uY2F0KHRoaXMuX3JvdWxldHRlRGF0YS5nYW1lUmVjb3JkTGlzdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93UmVjb3JkTGlzdCA9IHRoaXMuX3JvdWxldHRlRGF0YS5nYW1lUmVjb3JkTGlzdC5zbGljZSgtdGhpcy5sYXRSZWNvcmQubm9kZS5jaGlsZHJlbkNvdW50LCByZWNvcmRDb3VudCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5sYXRSZWNvcmQubm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgbGV0IGNvbG9yOiBudW1iZXIgPSBzaG93UmVjb3JkTGlzdFtpbmRleCsrXTtcbiAgICAgICAgICAgIGxldCBjcmFzaFJlY29yZEl0ZW0gPSB2LmdldENvbXBvbmVudChSb3VsZXR0ZVJlY29yZEl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoY29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNyYXNoUmVjb3JkSXRlbS5jbGVhcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjcmFzaFJlY29yZEl0ZW0uc2V0Q29sb3IoY29sb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gc2hvd1JlY29yZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHYpO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHYpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQoeyBvcGFjaXR5OiAwIH0pXG4gICAgICAgICAgICAgICAgICAgIC50bygwLjUsIHsgb3BhY2l0eTogMjU1IH0pXG4gICAgICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0b3BBbGxTb3VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5zdG9wTXVzaWMoKTtcbiAgICAgICAgdGhpcy5hdWRpb0hlbHBlci5zdG9wRWZmZWN0QnlQYXRoKFJvdWxldHRlLlNPVU5EUy5SVU4pO1xuICAgICAgICB0aGlzLmF1ZGlvSGVscGVyLnN0b3BFZmZlY3RCeVBhdGgoUm91bGV0dGUuU09VTkRTLlJFU1VMVCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5zdG9wQWxsU291bmQoKTtcbiAgICB9XG59XG4iXX0=