import UIView from "../framework/ui/UIView";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { GameConfig } from "../common/base/HotUpdate";
import { i18n } from "../common/language/LanguageImpl";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { IController } from "../framework/controller/Controller";
import { Manager } from "../common/manager/Manager";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import UserData from "../data/UserData";
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import HallNewGameItem from "./HallNewGameItem";
import PanelHelp from "../msgbox/PanelHelp";
import HallData from "../data/HallData";
import { MST } from "../framework/external/protoc";
import { EventApi } from "../framework/event/EventApi";
import { SubGameDefine } from "../common/define/SubGameDefine";
import MinigameView from "../minigame/MinigameView";
import { UtilMgr } from "../global/UtilMgr";
import BindPhoneView from "../common/bindItemView/BindPhoneView";
import HallBetRankItem from "./HallBetRankItem";
import LoginNewView from "../login/LoginNewView";
import AppData from "../data/AppData";
import RegisterView from "../login/RegisterView";
import NumberUtils from "../common/utils/NumberUtils";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class HallNewView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.Node)
    btnHarian: cc.Node = null;

    @property(cc.Node)
    btnMingguan: cc.Node = null;

    @property(cc.Node)
    btnSemua: cc.Node = null;

    @property(cc.Node)
    rankPlayInfo: cc.Node = null;

    @property(cc.Node)
    btnClosePInfo: cc.Node = null;

    @property(cc.Node)
    betRankView: cc.Node = null;
    @property(cc.Node)
    winRankView: cc.Node = null;

    @property(cc.PageView)
    pageView: cc.PageView = null;
    // 用户数据
    _userData: UserData = null;

    _winRankingList: any = [];
    _betRankingList: any = [];
    _rankSelectName = 'btnHarian'

    @property(cc.Node)
    gameItem0: cc.Node = null;
    @property(cc.Node)
    gameItem1: cc.Node = null;
    @property(cc.Node)
    gameItem2: cc.Node = null;
    @property(cc.Node)
    gameItem3: cc.Node = null;

    @property(cc.Node)
    topThree: cc.Node = null;
    loopInterval: number = null;

    //多语言文本
    @property(cc.Label)
    HottestGame: cc.Label = null;
    @property(cc.Label)
    LatestBet: cc.Label = null;
    @property(cc.Label)
    BiggestWinner: cc.Label = null;

    @property(cc.Label)
    labGame: cc.Label = null;
    @property(cc.Label)
    labUname: cc.Label = null;
    @property(cc.Label)
    labBetAmount: cc.Label = null;

    @property(cc.Label)
    labDaily: cc.Label = null;
    @property(cc.Label)
    labWeekly: cc.Label = null;
    @property(cc.Label)
    labAll: cc.Label = null;

    public static getPrefabUrl() {
        return "hall/prefabs/HallView";
    }

    onLoad() {
        super.onLoad();
        this.audioHelper.stopMusic()
        // this.audioHelper.playMusic("common/audio/hall_bg", BUNDLE_RESOURCES, true, true);

        this.closeSplashView();

        this.btnHarian.on(cc.Node.EventType.TOUCH_END, (evt) => {
            this.clickRankTitle('btnHarian')
        });
        this.btnMingguan.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickRankTitle('btnMingguan')
        });
        this.btnSemua.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickRankTitle('btnSemua')
        });

        this.btnClosePInfo.on(cc.Node.EventType.TOUCH_END, () => {
            this.rankPlayInfo.active = false
        });
        this.initData()
        this.clickRankTitle(this._rankSelectName)
        // this.reqRankList()
        this.reqBetRankList()
        this.reqHallGames()

        // this.checkOnGame()
        this.pageView.setCurrentPageIndex(0);
        dispatchEnterComplete({ type: LogicType.HALL, views: [this] });

        this.checkInvitationRegister();
    }

    private closeSplashView(): void {
        if (cc.sys.isBrowser) {
            document.getElementById('splash').style.display = 'none';
        }
    }

    private checkInvitationRegister(): void {
        if (G.DataMgr.get(AppData).invcode && !G.DataMgr.get(UserData).isLogined()) {
            Manager.uiManager.open({ type: RegisterView, bundle: BUNDLE_RESOURCES, zIndex: 99999 });
        }
    }

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
    }

    checkOnGame() {
        let userData = G.DataMgr.get(UserData);
        let hallData = G.DataMgr.get(HallData);
        let inGame = userData.inGame
        if (inGame) {
            if (inGame != 'Lobby') {
                let id = 0;
                let Name

                let rooms = hallData.games
                if (!rooms) return
                let getGameIndexByRooms = () => {
                    for (let index = 0; index < rooms.length; index++) {
                        const element = rooms[index];
                        if (element == inGame) {
                            Name = element
                            // id = element.id
                            break
                        }
                        id++;
                    }
                }
                getGameIndexByRooms()

                let gameItem = this[`gameItem${id}`]
                if (!gameItem) return;
                let hallGameItem = gameItem.getComponent(HallNewGameItem)
                hallGameItem.updateItem(Name, id)
                hallGameItem.jumpToGame()
            }
        }
    }

    reqRankList() {
        // let req = MST.C2L_GoldRankDay_Req.create({
        //     RpcId: Manager.netManager.getNewSeqId()
        // });
        // let buffer = MST.C2L_GoldRankDay_Req.encode(req).finish();
        // LobbyService.instance.sendMsg(MST.C2L_GoldRankDay_Req, MST.OuterOpcode_Lobby.C2L_GoldRankDay_Req, buffer);
        if (this._rankSelectName == 'btnHarian') {
            let req = MST.C2L_WinDayRank_Req.create({
                RpcId: Manager.netManager.getNewSeqId()
            });
            let buffer = MST.C2L_WinDayRank_Req.encode(req).finish();
            LobbyService.instance.sendMsg(MST.C2L_WinDayRank_Req, MST.OuterOpcode_Lobby.C2L_WinDayRank_Req, buffer);
        } else if (this._rankSelectName == 'btnMingguan') {
            let req = MST.C2L_WinWeekRank_Req.create({
                RpcId: Manager.netManager.getNewSeqId()
            });
            let buffer = MST.C2L_WinWeekRank_Req.encode(req).finish();
            LobbyService.instance.sendMsg(MST.C2L_WinWeekRank_Req, MST.OuterOpcode_Lobby.C2L_WinWeekRank_Req, buffer);
        } else {
            let req = MST.C2L_WinMonthRank_Req.create({
                RpcId: Manager.netManager.getNewSeqId()
            });
            let buffer = MST.C2L_WinMonthRank_Req.encode(req).finish();
            LobbyService.instance.sendMsg(MST.C2L_WinMonthRank_Req, MST.OuterOpcode_Lobby.C2L_WinMonthRank_Req, buffer);
        }
    }

    reqHallGames() {
        let req = MST.C2L_GetGameList_Req.create({
            RpcId: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2L_GetGameList_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetGameList_Req, MST.OuterOpcode_Lobby.C2L_GetGameList_Req, buffer);
    }

    reqBetRankList() {
        let req = MST.C2L_BetRank_Req.create({
            RpcId: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2L_BetRank_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_BetRank_Req, MST.OuterOpcode_Lobby.C2L_BetRank_Req, buffer);
    }

    clickRankTitle(name) {
        this._rankSelectName = name
        this.refreshRankTitleBtn()
    }

    refreshRankTitleBtn() {
        let _rankSelectName = this._rankSelectName
        let btnTitles = ['btnHarian', 'btnMingguan', 'btnSemua']
        for (let index = 0; index < btnTitles.length; index++) {
            const element = btnTitles[index];
            let btn = this[element]
            let activeImg = btn.getChildByName('active');
            activeImg.active = _rankSelectName == element;
            this._rankSelectName = element;
        }
        this.reqRankList()
    }

    openRankInfo() {
        this.rankPlayInfo.active = true
    }

    openLoginView() {
        dispatch("openLoginView");
    }

    bindingEvents() {
        super.bindingEvents()
        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent('openRankInfo', this.openRankInfo);
        this.registerEvent('openLoginEvent', this.openLoginView);
        this.registerEvent(LogicEvent.ENTER_GAME_READY, this.onEnterGameReady);
        // this.registerEvent('L2C_GoldRankDay_Res', this.L2C_GoldRankDay_Res);
        this.registerEvent('L2C_WinDayRank_Res', this.L2C_WinDayRank_Res);
        this.registerEvent('L2C_WinWeekRank_Res', this.L2C_WinDayRank_Res);
        this.registerEvent('L2C_WinMonthRank_Res', this.L2C_WinDayRank_Res);
        this.registerEvent('L2C_BetRank_Res', this.L2C_BetRank_Res);
        // this.registerEvent('updateUserInfo', this.refreshPlayerInfo);
        this.registerEvent('M2C_KickOut_Mes', this.M2C_KickOut_Mes);
        this.registerEvent('updateHallGames', this.refreshGameRooms);

        // this.refreshGameRooms()
    }

    onLanguageChange() {
        this.HottestGame.string = i18n.TITLE.HOTTESTGAME;
        this.LatestBet.string = i18n.BET_TITLE.LATESTBET;
        this.BiggestWinner.string = i18n.BIGGESTWINNER.BIGGESTWINNER;
        this.labGame.string = i18n.TITLE.LABGAME;
        this.labUname.string = i18n.TITLE.LABPLAYER;
        this.labBetAmount.string = i18n.TITLE.LABBETAMOUNT;

        this.labDaily.string = i18n.TITLE.LABDAILY;
        this.labWeekly.string = i18n.TITLE.LABWEEKLY;
        this.labAll.string = i18n.TITLE.LABALL;
    }

    refreshGameRooms() {
        let hallData = G.DataMgr.get(HallData);
        let gameList = hallData.games;

        if (!gameList) return
        let gameMax = 4

        for (let index = 0; index < gameMax; index++) {
            let item = this[`gameItem${index}`]
            if (!item) return;
            item.active = false
            if (index < gameList.length) {
                if (gameList[index]) {
                    item.active = true
                    let script = item.getComponent(HallNewGameItem)
                    let id = gameList[index].id
                    script.updateItem(gameList[index], id)
                }
            }
        }

        this.checkOnGame();
    }

    L2C_WinDayRank_Res() {
        let hallData = G.DataMgr.get(HallData);
        let winRankList = hallData.winRankList
        //test data
        // let testData = [{ 'AccountId': 11111, 'Nick': 'jj', 'Score': 11 }, { 'AccountId': 222, 'Nick': 'gg', 'Score': 222 }]
        // this._winRankingList = testData;
        this._winRankingList = winRankList
        this.updateWinRankList()
    }

    L2C_BetRank_Res() {
        let hallData = G.DataMgr.get(HallData);
        let betRankList = hallData.betRankList
        this._betRankingList = betRankList
        // this.betRankListView();
        this.refreshBetRankView();
    }

    refreshBetRankView() {
        if (!this.betRankView) return;
        let betRankData = this._betRankingList;
        for (let index = 0; index < 9; index++) {
            let data = betRankData[index];
            let rankItem = this.betRankView.getChildByName('HallBetRankItem' + index);
            let rankItemComm = rankItem.getComponent(HallBetRankItem);
            rankItem.active = false;
            if (index < betRankData.length) {
                rankItem.active = true;
                rankItemComm.updateItem(data, index);
            }
        }
    }

    updateWinRankList() {
        let ranList = this._winRankingList
        if (ranList.length > 0) {
            if (ranList.length <= 3) {
                this['topThreeList'] = ranList;
                this.hideWinRankView();
            } else {
                let spliceRankList = []
                for (let index = 0; index < 3; index++) {
                    let element = ranList[0];
                    spliceRankList.push(element)
                    ranList.splice(0, 1)
                }
                this['topThreeList'] = spliceRankList;
                this.refreshWinRankView();
            }

            this.refreshRankTopThree()
        }
        else {
            let topThree = this.topThree;
            if (topThree) {
                topThree.active = false;
                this.hideWinRankView();
            }
        }
    }

    refreshRankTopThree() {
        if (!this.topThree) return;
        let names = ['One', 'Two', 'Three']
        let topThreeList = this['topThreeList']
        for (let index = 0; index < 3; index++) {
            let item = this.topThree.getChildByName(`top${names[index]}`)
            item.active = false
            if (index < topThreeList.length) {
                item.active = true
                let data = topThreeList[index]
                let nickName = data.Nick
                let score = data.Score

                item.getChildByName('nickName').getComponent(cc.Label).string = nickName;
                let scoreNum = NumberUtils.converToC(score);
                let scoreStr = NumberUtils.converToE(7, Number(scoreNum));
                item.getChildByName('btnHuang').getChildByName('rp').getComponent(cc.Label).string = `Rp ${scoreStr}`;
                let imgAvatar = item.getChildByName('imgAvatar').getComponent(cc.Sprite)
                UtilMgr.loadHeadImg(imgAvatar, data.headUrl, data.headUrl, this);
            }
        }
    }

    hideWinRankView() {
        if (!this.winRankView) return;
        for (let index = 0; index < 9; index++) {
            let rankItem = this.winRankView.getChildByName('HallWinRankItem' + index);
            rankItem.active = false;
        }
    }
    refreshWinRankView() {
        if (!this.winRankView) return;
        let winRankData = this._winRankingList;
        for (let index = 0; index < 9; index++) {
            let data = winRankData[index];
            let rankItem = this.winRankView.getChildByName('HallWinRankItem' + index);
            rankItem.active = false;
            if (index < winRankData.length) {
                rankItem.active = true;

                let labIndex = rankItem.getChildByName('labIndex').getComponent(cc.Label);
                let uname = rankItem.getChildByName('nameLabel').getComponent(cc.Label);
                let gold = rankItem.getChildByName('goldLabel').getComponent(cc.Label);
                let imgAvatar = rankItem.getChildByName('imgAvatar').getComponent(cc.Sprite)
                if ((index + 4) < 10)
                    labIndex.string = `0${String(index + 4)}`;
                else
                    labIndex.string = `${String(index + 4)}`;

                uname.string = UtilMgr.setString(data.Nick);
                gold.string = `Rp ${NumberUtils.converToC(data.Score)}`;

                if (data.headImgUrl)
                    UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this)
            }
        }
    }

    onPageEvent(sender, eventType) {
        // 翻页事件
        if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
            return;
        }
        console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
    }

    onClick(name, node) {
        switch (name) {
            case 'btnAkun':
                dispatch("openAkunView");
                break;
            case 'btnDompet':
                dispatch("openDompetView");
                break;
            case 'btnEvent':
                dispatch("openActiveView");
                break;
            case 'head':
                dispatch("openAkunView");
                break;
            case 'btnQiandao':
                if (this.checkLogined())
                    dispatch("openSigninView");
                break;
            case 'berputarNode':
                dispatch("openMinigameView");
                break;
        }
    }

    show(args) {
        // this.pageView.setCurrentPageIndex(0);
        this.onLanguageChange();
        this.loopRequestBetRank();

        //test
        // this.betRankListView()
        // PanelHelp.showTip(Manager.makeLanguage('TIPS.RECHARGESUCCESS', true));
    }

    checkLogined() {
        if (!this._userData.id) {
            Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }

    loopRequestBetRank() {
        let self = this;
        let loopHandler = function () {
            self.reqBetRankList();
        }

        // this.schedule(loopHandler, 3);
        this['loopHandler'] = loopHandler;
    }

    enterTimes = 0
    onEnterGameReady(game) {
        let gameBundle
        switch (game) {
            case 'crash':
                gameBundle = SubGameDefine.GameName.CRASH;
                break;
            case "roulette":
                gameBundle = SubGameDefine.GameName.ROULETTE;
                break
            case "wingo":
                gameBundle = SubGameDefine.GameName.WINGO;
                break;
            default:
                break;
        }
        PanelHelp.showLoading(i18n.Waiting.EnterGame, true);
        if (this.enterTimes >= 1) return
        dispatch(LogicEvent.ENTER_GAME, { bundle: gameBundle });
        this.enterTimes++
    }

    M2C_KickOut_Mes() {
        let userData = G.DataMgr.get(UserData);
        userData.clearUserData();
        // dispatch("openLoginView");
    }

    onDestroy(): void {
        console.log("2222");
        let loopHandler = this['loopHandler'];
        if (loopHandler) {
            this.unschedule(this['loopHandler']);
            loopHandler = null;
        }

    }

}
