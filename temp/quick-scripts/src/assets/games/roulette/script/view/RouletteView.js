"use strict";
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