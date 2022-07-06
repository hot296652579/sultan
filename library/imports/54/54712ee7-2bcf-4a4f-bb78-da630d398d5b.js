"use strict";
cc._RF.push(module, '547127nK89KT7t42mMNOY1b', 'HallNewView');
// script/hall/HallNewView.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LogicEvent_1 = require("../common/event/LogicEvent");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const UserData_1 = __importDefault(require("../data/UserData"));
const HallNewGameItem_1 = __importDefault(require("./HallNewGameItem"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const HallData_1 = __importDefault(require("../data/HallData"));
const protoc_1 = require("../framework/external/protoc");
const EventApi_1 = require("../framework/event/EventApi");
const SubGameDefine_1 = require("../common/define/SubGameDefine");
const UtilMgr_1 = require("../global/UtilMgr");
const HallBetRankItem_1 = __importDefault(require("./HallBetRankItem"));
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const AppData_1 = __importDefault(require("../data/AppData"));
const RegisterView_1 = __importDefault(require("../login/RegisterView"));
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const { ccclass, property } = cc._decorator;
let HallNewView = class HallNewView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnHarian = null;
        this.btnMingguan = null;
        this.btnSemua = null;
        this.rankPlayInfo = null;
        this.btnClosePInfo = null;
        this.betRankView = null;
        this.winRankView = null;
        this.pageView = null;
        // 用户数据
        this._userData = null;
        this._winRankingList = [];
        this._betRankingList = [];
        this._rankSelectName = 'btnHarian';
        this.gameItem0 = null;
        this.gameItem1 = null;
        this.gameItem2 = null;
        this.gameItem3 = null;
        this.topThree = null;
        this.loopInterval = null;
        //多语言文本
        this.HottestGame = null;
        this.LatestBet = null;
        this.BiggestWinner = null;
        this.labGame = null;
        this.labUname = null;
        this.labBetAmount = null;
        this.labDaily = null;
        this.labWeekly = null;
        this.labAll = null;
        this.enterTimes = 0;
    }
    static getPrefabUrl() {
        return "hall/prefabs/HallView";
    }
    onLoad() {
        super.onLoad();
        this.audioHelper.stopMusic();
        // this.audioHelper.playMusic("common/audio/hall_bg", BUNDLE_RESOURCES, true, true);
        this.closeSplashView();
        this.btnHarian.on(cc.Node.EventType.TOUCH_END, (evt) => {
            this.clickRankTitle('btnHarian');
        });
        this.btnMingguan.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickRankTitle('btnMingguan');
        });
        this.btnSemua.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickRankTitle('btnSemua');
        });
        this.btnClosePInfo.on(cc.Node.EventType.TOUCH_END, () => {
            this.rankPlayInfo.active = false;
        });
        this.initData();
        this.clickRankTitle(this._rankSelectName);
        // this.reqRankList()
        this.reqBetRankList();
        this.reqHallGames();
        // this.checkOnGame()
        this.pageView.setCurrentPageIndex(0);
        LogicEvent_1.dispatchEnterComplete({ type: LogicEvent_1.LogicType.HALL, views: [this] });
        this.checkInvitationRegister();
    }
    closeSplashView() {
        if (cc.sys.isBrowser) {
            document.getElementById('splash').style.display = 'none';
        }
    }
    checkInvitationRegister() {
        if (G.DataMgr.get(AppData_1.default).invcode && !G.DataMgr.get(UserData_1.default).isLogined()) {
            Manager_1.Manager.uiManager.open({ type: RegisterView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, zIndex: 99999 });
        }
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    checkOnGame() {
        let userData = G.DataMgr.get(UserData_1.default);
        let hallData = G.DataMgr.get(HallData_1.default);
        let inGame = userData.inGame;
        if (inGame) {
            if (inGame != 'Lobby') {
                let id = 0;
                let Name;
                let rooms = hallData.games;
                if (!rooms)
                    return;
                let getGameIndexByRooms = () => {
                    for (let index = 0; index < rooms.length; index++) {
                        const element = rooms[index];
                        if (element == inGame) {
                            Name = element;
                            // id = element.id
                            break;
                        }
                        id++;
                    }
                };
                getGameIndexByRooms();
                let gameItem = this[`gameItem${id}`];
                if (!gameItem)
                    return;
                let hallGameItem = gameItem.getComponent(HallNewGameItem_1.default);
                hallGameItem.updateItem(Name, id);
                hallGameItem.jumpToGame();
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
            let req = protoc_1.MST.C2L_WinDayRank_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId()
            });
            let buffer = protoc_1.MST.C2L_WinDayRank_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_WinDayRank_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_WinDayRank_Req, buffer);
        }
        else if (this._rankSelectName == 'btnMingguan') {
            let req = protoc_1.MST.C2L_WinWeekRank_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId()
            });
            let buffer = protoc_1.MST.C2L_WinWeekRank_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_WinWeekRank_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_WinWeekRank_Req, buffer);
        }
        else {
            let req = protoc_1.MST.C2L_WinMonthRank_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId()
            });
            let buffer = protoc_1.MST.C2L_WinMonthRank_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_WinMonthRank_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_WinMonthRank_Req, buffer);
        }
    }
    reqHallGames() {
        let req = protoc_1.MST.C2L_GetGameList_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2L_GetGameList_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetGameList_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetGameList_Req, buffer);
    }
    reqBetRankList() {
        let req = protoc_1.MST.C2L_BetRank_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2L_BetRank_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_BetRank_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_BetRank_Req, buffer);
    }
    clickRankTitle(name) {
        this._rankSelectName = name;
        this.refreshRankTitleBtn();
    }
    refreshRankTitleBtn() {
        let _rankSelectName = this._rankSelectName;
        let btnTitles = ['btnHarian', 'btnMingguan', 'btnSemua'];
        for (let index = 0; index < btnTitles.length; index++) {
            const element = btnTitles[index];
            let btn = this[element];
            let activeImg = btn.getChildByName('active');
            activeImg.active = _rankSelectName == element;
            this._rankSelectName = element;
        }
        this.reqRankList();
    }
    openRankInfo() {
        this.rankPlayInfo.active = true;
    }
    openLoginView() {
        dispatch("openLoginView");
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent('openRankInfo', this.openRankInfo);
        this.registerEvent('openLoginEvent', this.openLoginView);
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_GAME_READY, this.onEnterGameReady);
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
        this.HottestGame.string = LanguageImpl_1.i18n.TITLE.HOTTESTGAME;
        this.LatestBet.string = LanguageImpl_1.i18n.BET_TITLE.LATESTBET;
        this.BiggestWinner.string = LanguageImpl_1.i18n.BIGGESTWINNER.BIGGESTWINNER;
        this.labGame.string = LanguageImpl_1.i18n.TITLE.LABGAME;
        this.labUname.string = LanguageImpl_1.i18n.TITLE.LABPLAYER;
        this.labBetAmount.string = LanguageImpl_1.i18n.TITLE.LABBETAMOUNT;
        this.labDaily.string = LanguageImpl_1.i18n.TITLE.LABDAILY;
        this.labWeekly.string = LanguageImpl_1.i18n.TITLE.LABWEEKLY;
        this.labAll.string = LanguageImpl_1.i18n.TITLE.LABALL;
    }
    refreshGameRooms() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let gameList = hallData.games;
        if (!gameList)
            return;
        let gameMax = 4;
        for (let index = 0; index < gameMax; index++) {
            let item = this[`gameItem${index}`];
            if (!item)
                return;
            item.active = false;
            if (index < gameList.length) {
                if (gameList[index]) {
                    item.active = true;
                    let script = item.getComponent(HallNewGameItem_1.default);
                    let id = gameList[index].id;
                    script.updateItem(gameList[index], id);
                }
            }
        }
        this.checkOnGame();
    }
    L2C_WinDayRank_Res() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let winRankList = hallData.winRankList;
        //test data
        // let testData = [{ 'AccountId': 11111, 'Nick': 'jj', 'Score': 11 }, { 'AccountId': 222, 'Nick': 'gg', 'Score': 222 }]
        // this._winRankingList = testData;
        this._winRankingList = winRankList;
        this.updateWinRankList();
    }
    L2C_BetRank_Res() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let betRankList = hallData.betRankList;
        this._betRankingList = betRankList;
        // this.betRankListView();
        this.refreshBetRankView();
    }
    refreshBetRankView() {
        if (!this.betRankView)
            return;
        let betRankData = this._betRankingList;
        for (let index = 0; index < 9; index++) {
            let data = betRankData[index];
            let rankItem = this.betRankView.getChildByName('HallBetRankItem' + index);
            let rankItemComm = rankItem.getComponent(HallBetRankItem_1.default);
            rankItem.active = false;
            if (index < betRankData.length) {
                rankItem.active = true;
                rankItemComm.updateItem(data, index);
            }
        }
    }
    updateWinRankList() {
        let ranList = this._winRankingList;
        if (ranList.length > 0) {
            if (ranList.length <= 3) {
                this['topThreeList'] = ranList;
                this.hideWinRankView();
            }
            else {
                let spliceRankList = [];
                for (let index = 0; index < 3; index++) {
                    let element = ranList[0];
                    spliceRankList.push(element);
                    ranList.splice(0, 1);
                }
                this['topThreeList'] = spliceRankList;
                this.refreshWinRankView();
            }
            this.refreshRankTopThree();
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
        if (!this.topThree)
            return;
        let names = ['One', 'Two', 'Three'];
        let topThreeList = this['topThreeList'];
        for (let index = 0; index < 3; index++) {
            let item = this.topThree.getChildByName(`top${names[index]}`);
            item.active = false;
            if (index < topThreeList.length) {
                item.active = true;
                let data = topThreeList[index];
                let nickName = data.Nick;
                let score = data.Score;
                item.getChildByName('nickName').getComponent(cc.Label).string = nickName;
                let scoreNum = NumberUtils_1.default.converToC(score);
                let scoreStr = NumberUtils_1.default.converToE(7, Number(scoreNum));
                item.getChildByName('btnHuang').getChildByName('rp').getComponent(cc.Label).string = `Rp ${scoreStr}`;
                let imgAvatar = item.getChildByName('imgAvatar').getComponent(cc.Sprite);
                UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, data.headUrl, data.headUrl, this);
            }
        }
    }
    hideWinRankView() {
        if (!this.winRankView)
            return;
        for (let index = 0; index < 9; index++) {
            let rankItem = this.winRankView.getChildByName('HallWinRankItem' + index);
            rankItem.active = false;
        }
    }
    refreshWinRankView() {
        if (!this.winRankView)
            return;
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
                let imgAvatar = rankItem.getChildByName('imgAvatar').getComponent(cc.Sprite);
                if ((index + 4) < 10)
                    labIndex.string = `0${String(index + 4)}`;
                else
                    labIndex.string = `${String(index + 4)}`;
                uname.string = UtilMgr_1.UtilMgr.setString(data.Nick);
                gold.string = `Rp ${NumberUtils_1.default.converToC(data.Score)}`;
                if (data.headImgUrl)
                    UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this);
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
            Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }
    loopRequestBetRank() {
        let self = this;
        let loopHandler = function () {
            self.reqBetRankList();
        };
        // this.schedule(loopHandler, 3);
        this['loopHandler'] = loopHandler;
    }
    onEnterGameReady(game) {
        let gameBundle;
        switch (game) {
            case 'crash':
                gameBundle = SubGameDefine_1.SubGameDefine.GameName.CRASH;
                break;
            case "roulette":
                gameBundle = SubGameDefine_1.SubGameDefine.GameName.ROULETTE;
                break;
            case "wingo":
                gameBundle = SubGameDefine_1.SubGameDefine.GameName.WINGO;
                break;
            default:
                break;
        }
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.Waiting.EnterGame, true);
        if (this.enterTimes >= 1)
            return;
        dispatch(LogicEvent_1.LogicEvent.ENTER_GAME, { bundle: gameBundle });
        this.enterTimes++;
    }
    M2C_KickOut_Mes() {
        let userData = G.DataMgr.get(UserData_1.default);
        userData.clearUserData();
        // dispatch("openLoginView");
    }
    onDestroy() {
        console.log("2222");
        let loopHandler = this['loopHandler'];
        if (loopHandler) {
            this.unschedule(this['loopHandler']);
            loopHandler = null;
        }
    }
};
__decorate([
    property(cc.Node)
], HallNewView.prototype, "btnHarian", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "btnMingguan", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "btnSemua", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "rankPlayInfo", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "btnClosePInfo", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "betRankView", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "winRankView", void 0);
__decorate([
    property(cc.PageView)
], HallNewView.prototype, "pageView", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "gameItem0", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "gameItem1", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "gameItem2", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "gameItem3", void 0);
__decorate([
    property(cc.Node)
], HallNewView.prototype, "topThree", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "HottestGame", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "LatestBet", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "BiggestWinner", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "labGame", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "labUname", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "labBetAmount", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "labDaily", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "labWeekly", void 0);
__decorate([
    property(cc.Label)
], HallNewView.prototype, "labAll", void 0);
HallNewView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], HallNewView);
exports.default = HallNewView;

cc._RF.pop();