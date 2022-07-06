
import { LobbyService } from "../../../../script/common/net/LobbyService";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../../../../script/common/event/LogicEvent";
import UIView from "../../../../script/framework/ui/UIView";
import AppData from "../../../../script/data/AppData";
import UserData from "../../../../script/data/UserData";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import { IController } from "../../../../script/framework/controller/Controller";
import { MST } from "../../../../script/framework/external/protoc";
import { Manager } from "../../../../script/common/manager/Manager";
import { Config } from "../../../../script/common/config/Config";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { EventApi } from "../../../../script/framework/event/EventApi";
import RouletteRecordItem from "./RouletteRecordItem";
import RouletteData from "../data/RouletteData";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import Operation from "../../../../script/framework/extentions/Operation";
import { RouletteConfig } from "../config/RouletteConfig";
import TitleItemPageUser from "../../../../script/common/item/TitleItemPageUser";
import { RouletteColorDefine } from "../define/RouletteColorDefine";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import RouletteMyRecordItem from "./RouletteMyRecordItem";
import RouletteBigWinItem from "./RouletteBigWinItem";
import RouletteTotalRecordView from "./RouletteTotalRecordView";
import RouletteMyBetRecordView from "./RouletteMyBetRecordView";
import { Roulette } from "../data/RouletteGameData";
import LoginNewView from "../../../../script/login/LoginNewView";

const { ccclass, property } = cc._decorator;
// 最小下注金额
const MIN_BET_GOLD: number = 2000;
// 最大下注金额
const MAX_BET_GOLD: number = 3300000;
@ccclass
@injectService(LobbyService.instance)
export default class RouletteView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    // 应用数据
    private _appData: AppData = null;
    // 用户数据
    private _userData: UserData = null;
    // 游戏数据
    private _rouletteData: RouletteData = null;

    @property(cc.Prefab)
    groupNode: cc.Prefab = null;

    @property(TitleItemPageUser)
    private titleItemPageUser: TitleItemPageUser = null;

    @property(cc.Node)
    groupParent: cc.Node = null;

    @property(cc.Node)
    gemstoneSpine: cc.Node = null;
    @property(cc.Label)
    endNumLabel: cc.Label = null;

    @property(cc.Node)
    upPointer: cc.Node = null;
    @property(cc.Node)
    downPointer: cc.Node = null;
    @property(cc.Label)
    labStartCountDown: cc.Label = null;
    @property(cc.EditBox)
    private edbBetGold: cc.EditBox = null;

    @property(cc.Layout)
    private latRecord: cc.Layout = null;

    @property(cc.Label)
    private labCurRound: cc.Label = null;
    @property(cc.Label)
    private labBigWin: cc.Label = null;
    @property(cc.Toggle)
    private tggCurRound: cc.Toggle = null;
    @property(cc.Toggle)
    private tggBigWin: cc.Toggle = null;
    @property(cc.Node)
    private nodCurRoundList: cc.Node = null;
    @property(cc.Node)
    private nodBigWinList: cc.Node = null;

    @property(cc.Node)
    private latManual: cc.Node = null;
    @property(cc.Node)
    private lsvBetPlayer: cc.Node = null;
    @property(cc.Node)
    private nodVerify: cc.Node = null;

    @property(cc.Label)
    labMyRecord: cc.Label = null;
    @property(cc.Label)
    labHistoryTitle: cc.Label = null;
    @property(cc.Label)
    labWorldRecord: cc.Label = null;
    @property(cc.Label)
    labFairGame: cc.Label = null;
    @property(cc.Label)
    labCopyCheck: cc.Label = null;

    maxNum: number = 2;
    minNum: number = 0;
    //播放时间
    time = 0;
    //播放总时间
    totalTime = 0;
    // label 行宽
    lineWidth = 0;
    // label 总宽度
    totalWidth = 0;
    rolling = false;
    numArray = [];
    curNum: number = 0;
    rollRound: number = 2;
    groupMax: number = 9;
    /**一个宝石的宽度*/
    itemWidth: number = 112;
    dialTime: number = 6;
    /**一个Item总个数29*/
    itemTotal: number = 29;
    groupWidth: number = 0;
    endNum: number = 0;

    public static getPrefabUrl() {
        return "prefabs/RouletteView";
    }

    onLoad() {
        super.onLoad();
        dispatchEnterComplete({ type: LogicType.GAME, views: [this] });

        this.initData();
        this.initView();
        this.refreshDefaultByPos();
        this.playPointerByNum();

        this.startCountDown();
        this.audioHelper.playMusic(Roulette.SOUNDS.BGM, this.bundle);
    }


    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
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
        let req = MST.C2M_GetRouletteInfo_Req.create({
            RpcId: Manager.netManager.getNewSeqId()
        })
        let buffer = MST.C2M_GetRouletteInfo_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_GetRouletteInfo_Req, MST.OuterOpcode_Roulette.C2M_GetRouletteInfo_Req, buffer);
    }

    onLanguageChange() {
        this.titleItemPageUser.languagePageName(Manager.makeLanguage("labPageName", true));
        this.labCurRound.language = Manager.makeLanguage("labCurRound", true);
        this.labBigWin.language = Manager.makeLanguage("labBigWin", true);
        this.labHistoryTitle.language = Manager.makeLanguage("history", true);
        this.labMyRecord.language = Manager.makeLanguage("myHistory", true);
        this.labWorldRecord.language = Manager.makeLanguage("worldHistory", true);
        this.labFairGame.language = Manager.makeLanguage("fairGame", true);
        this.labCopyCheck.language = Manager.makeLanguage("labCopyCheck", true);
    }

    private initData(): void {
        this._appData = G.DataMgr.get(AppData);
        this._userData = G.DataMgr.get(UserData);
        this._rouletteData = G.DataMgr.get(RouletteData);

        this.groupWidth = this.itemTotal * this.itemWidth;
    }

    private initView(): void {

    }

    refreshDefaultByPos() {
        this.groupParent.removeAllChildren()
        this.groupParent.setPosition(0, 0);
        for (let index = 0; index < this.groupMax; index++) {
            let groupPre = cc.instantiate(this.groupNode);
            groupPre.name = 'groupPre' + index;
            this.groupParent.addChild(groupPre);
        }

        this.groupParent.getComponent(cc.Layout).updateLayout();

        let curNum = this.curNum
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
        let rouletteData = G.DataMgr.get(RouletteData);

        this.dialTime = (rouletteData.StopTimeStamp - this._appData.getServerTimestamp()) / 1000;
        this.endNum = rouletteData.endIndex;
        console.log('--------滚动时间------->:' + this.dialTime);
        //自己查看结果
        let color = ['purpler', 'red', 'green']
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
                self.audioHelper.playEffect(Roulette.SOUNDS.RESULT, self.bundle);
            })
            .start();
        this.rolling = true;
        this.showCurItem();
        this.loopPointerSpine();
        this.resumeRate();
        this.audioHelper.playEffect(Roulette.SOUNDS.RUN, this.bundle);
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
                    gap = distance + 2 * this.itemWidth + 35;  //--item10
                    break;
                case 1:
                    gap = distance - (3 * this.itemWidth) - spacingX - 5; //--item11
                    break;
                case 2:
                    gap = distance + 20 * this.itemWidth - 35;  //-- item14
                    break;
            }
        } else if (this.curNum == 1) {
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
        } else {
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
        let color = ['zi', 'hong', 'lu']
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
        let color = ['zi', 'hong', 'lu']
        let upSke = this.upPointer.getComponent(sp.Skeleton);
        upSke.setAnimation(0, `${color[this.endNum]}`, true);
        let downSke = this.downPointer.getComponent(sp.Skeleton);
        downSke.setAnimation(0, `${color[this.endNum]}`, true);
    }

    onClick(ButtonName: any, btnNode: any) {
        switch (ButtonName) {
            case 'testChou':
                if (this.rolling) return;
                let num = Math.floor(Math.random() * ((this.maxNum + 1) - this.minNum)) + this.minNum;
                this.endNum = num;

                let color = ['purpler', 'red', 'green']
                this.endNumLabel.string = `结果颜色:${color[this.endNum]}`;
                // this.onEvent_M2C_RouletteStart_mes();
                break;
            case "btnClose":
                this.reqEnterLobby();
                break;
            case "btnBet0":
                if (this.checkLogined())
                    this.addBetGold(RouletteConfig.BetGoldButton[0], this.edbBetGold);
                break;
            case "btnBet1":
                if (this.checkLogined())
                    this.addBetGold(RouletteConfig.BetGoldButton[1], this.edbBetGold);
                break;
            case "btnBet2":
                if (this.checkLogined())
                    this.addBetGold(RouletteConfig.BetGoldButton[2], this.edbBetGold);
                break;
            case "btnBet3":
                if (this.checkLogined())
                    this.mulBetGold(RouletteConfig.BetGoldButton[3], this.edbBetGold);
                break;
            case "btnBet4":
                if (this.checkLogined())
                    this.mulBetGold(RouletteConfig.BetGoldButton[4], this.edbBetGold);
                break;
            case "tggCurRound":
                this.clickMyRecord();
                break;
            case "tggBigWin":
                this.clickWordRecord()
                break;

            case "btnPurple":
                if (this.checkLogined())
                    this.onC2M_MyRouletteBet_Req(0)
                break;
            case "btnGreen":
                if (this.checkLogined())
                    this.onC2M_MyRouletteBet_Req(2)
                break;
            case "btnRed":
                if (this.checkLogined())
                    this.onC2M_MyRouletteBet_Req(1)
                break;
            case "btnWorldRecord":
                Manager.uiManager.open({ type: RouletteTotalRecordView, bundle: this.bundle })
                break;
            case "btnMyRecord":
                Manager.uiManager.open({ type: RouletteMyBetRecordView, bundle: this.bundle })
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
            PanelHelp.showTip(Manager.makeLanguage("toLogin", true));
            Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }

    private getEditboxBetGold(edbBetGold: cc.EditBox): number {
        let content: string = edbBetGold.string;
        let numBetGold: number = 0;
        if (content.length > 0) {
            numBetGold = Number(content);
        }
        return numBetGold;
    }

    onC2M_MyRouletteBet_Req(BetIndex) {
        let betGold: number = this.getEditboxBetGold(this.edbBetGold);
        if (betGold < MIN_BET_GOLD || betGold > MAX_BET_GOLD) {
            PanelHelp.showTip(Manager.makeLanguage(["InputBetGold", MIN_BET_GOLD, MAX_BET_GOLD], true));
            return;
        }

        //判断是否在下注阶段
        let status = this._rouletteData.Status;
        if (status != MST.RouletteStatus.BetPhase) {
            PanelHelp.showTip(Manager.makeLanguage("NotBetState", true));
            return;
        }

        let req = MST.C2M_MyRouletteBet_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            BetGold: NumberUtils.converToS(betGold),
            BetIndex
        });
        let buffer = MST.C2M_MyRouletteBet_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_MyRouletteBet_Req, MST.OuterOpcode_Roulette.C2M_MyRouletteBet_Req, buffer);
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
        let req = MST.C2R_GetBetRankInfo_Req.create({
            RpcId: Manager.netManager.getNewSeqId()
        })
        let buffer = MST.C2R_GetBetRankInfo_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2R_GetBetRankInfo_Req, MST.OuterOpcode_Roulette.C2R_GetBetRankInfo_Req, buffer);
    }

    private onChangedBetGold(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        let numContent: number = Number(legalContent);

        if (numContent <= 0) {
            content = "";
        } else {
            content = numContent.toString();
        }
        edb.string = content;
    }

    private addBetGold(gold: number, edbBetGold: cc.EditBox): void {
        let numBetGold: number = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Operation.add(gold, numBetGold).toString();
    }

    private mulBetGold(gold: number, edbBetGold: cc.EditBox): void {
        let numBetGold: number = 0;
        if (edbBetGold.string.length > 0) {
            numBetGold = Number(edbBetGold.string);
        }
        edbBetGold.string = Math.floor(Operation.mul(gold, numBetGold)).toString();
    }

    public reqEnterLobby(): void {
        let req = MST.C2M_TransferMap_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            RoomName: Config.GameId.Lobby,
        })
        let buffer = MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_TransferMap_Req, MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
    }

    private onEvent_M2C_TransferMap_Res(data: MST.IM2C_TransferMap_Res): void {
        if (data.Error === 0) {
            dispatch(LogicEvent.ENTER_HALL);
        } else {
            PanelHelp.showErrTip(data.Error);
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
    private startCountDown() {
        this.stopCountDown();
        this.schedule(this.updateCountDonw);
    }

    /**
     * 停止游戏倒计时
     */
    private stopCountDown() {
        this.labStartCountDown.string = "0.00";
        this.unschedule(this.updateCountDonw);
    }

    /**
     * 刷新游戏倒计时
     */
    private updateCountDonw(): void {
        let ms = this._rouletteData.stopBetTimeStamp - this._appData.getServerTimestamp();
        // console.log('下注剩余时间ms:' + ms);
        if (ms <= 0) {
            ms = 0;
            this.stopCountDown();
            this.labStartCountDown.string = "0.00";
            return;
        }
        this.labStartCountDown.string = DateUtils.getMsToS(ms);
    }

    private refreshGame(): void {
        switch (this._rouletteData.Status) {
            case MST.RouletteStatus.BetPhase: {
                this.startCountDown();
            }
                break;
            case MST.RouletteStatus.AnimationPhase: {

            }
                break;
            case MST.RouletteStatus.PaybackPhase: {

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

    private resumeRate() {
        let status = this._rouletteData.Status == MST.RouletteStatus.BetPhase;
        this.enableEditboxRate(this.edbBetGold, status);
        this.enableBtnBetRate(status);

        if (!status)
            this.labStartCountDown.string = "0.00";
    }

    private enableBtnBetRate(isEnable: boolean) {
        let imgBetBg = this.latManual.getChildByName('nodBetRaise').getChildByName('imgBetBg');

        for (let index = 0; index < 5; index++) {
            let btnBet = imgBetBg.getChildByName('btnBet' + index).getComponent(cc.Button)
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

    private enableEditboxRate(edbChangeRate: cc.EditBox, isEnable: boolean): void {
        edbChangeRate.enabled = isEnable;
        let nodContent: cc.Node = edbChangeRate.node.getChildByName("TEXT_LABEL");
        let nodPlaceholder: cc.Node = edbChangeRate.node.getChildByName("PLACEHOLDER_LABEL");
        if (isEnable) {
            nodContent.color = RouletteColorDefine.EnableRate.ENABLE;
            nodPlaceholder.color = RouletteColorDefine.EnableRate.ENABLE;
        } else {
            nodContent.color = RouletteColorDefine.EnableRate.DISABLE;
            nodPlaceholder.color = RouletteColorDefine.EnableRate.DISABLE;
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
        if (!onRoomTotalBet || onRoomTotalBet.length <= 0) return;
        let labPurpChips = this.nodCurRoundList.getChildByName('latBaoshi').getChildByName('purp').getChildByName('labChips');
        let labRedChips = this.nodCurRoundList.getChildByName('latBaoshi').getChildByName('red').getChildByName('labChips');
        let labGreenChips = this.nodCurRoundList.getChildByName('latBaoshi').getChildByName('green').getChildByName('labChips');

        for (let index = 0; index < onRoomTotalBet.length; index++) {
            const data = onRoomTotalBet[index];
            if (data.color == 0) {
                labPurpChips.getComponent(cc.Label).string = NumberUtils.converToC(data.chips);
            } else if (data.color == 1) {
                labRedChips.getComponent(cc.Label).string = NumberUtils.converToC(data.chips);
            } else {
                labGreenChips.getComponent(cc.Label).string = NumberUtils.converToC(data.chips);
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
            let scriptComm = curItem.getComponent(RouletteBigWinItem);
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
            let scriptComm = curItem.getComponent(RouletteMyRecordItem);
            const data = onRoomBets[index];
            curItem.active = false;
            if (index < onRoomBets.length) {
                curItem.active = true;
                scriptComm.updateItem(data, index);

                cc.tween(curItem)
                    .set({ scaleY: 0 })
                    .to(0.1, { scaleY: 1 })
                    .start()
            }
        }
    }

    refreshMultipleRecord() {
        let recordCount: number = this._rouletteData.gameRecordList.length;
        let showRecordList: number[] = [];
        if (recordCount <= this.latRecord.node.childrenCount) {
            showRecordList = [].concat(this._rouletteData.gameRecordList);
        } else {
            showRecordList = this._rouletteData.gameRecordList.slice(-this.latRecord.node.childrenCount, recordCount);
        }

        let index: number = 0;
        for (let v of this.latRecord.node.children) {
            let color: number = showRecordList[index++];
            let crashRecordItem = v.getComponent(RouletteRecordItem);

            if (color === undefined) {
                crashRecordItem.clear();
            } else {
                crashRecordItem.setColor(color);
            }

            if (index == showRecordList.length) {
                cc.Tween.stopAllByTarget(v);
                cc.tween(v)
                    .set({ opacity: 0 })
                    .to(0.5, { opacity: 255 })
                    .start()
            }
        }
    }

    private stopAllSound(): void {
        this.audioHelper.stopMusic();
        this.audioHelper.stopEffectByPath(Roulette.SOUNDS.RUN);
        this.audioHelper.stopEffectByPath(Roulette.SOUNDS.RESULT);
    }

    onDestroy(): void {
        super.onDestroy();
        this.stopAllSound();
    }
}
