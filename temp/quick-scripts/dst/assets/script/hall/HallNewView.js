
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallNewView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsTmV3Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUM1QywyREFBMEY7QUFFMUYsa0VBQXVEO0FBQ3ZELDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFFM0UsdURBQW9EO0FBQ3BELHVEQUFxRjtBQUNyRixnRUFBd0M7QUFFeEMsd0VBQWdEO0FBQ2hELG9FQUE0QztBQUM1QyxnRUFBd0M7QUFDeEMseURBQW1EO0FBQ25ELDBEQUF1RDtBQUN2RCxrRUFBK0Q7QUFFL0QsK0NBQTRDO0FBRTVDLHdFQUFnRDtBQUNoRCx5RUFBaUQ7QUFDakQsOERBQXNDO0FBQ3RDLHlFQUFpRDtBQUNqRCw4RUFBc0Q7QUFFdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLFdBQVcsR0FBaEMsTUFBcUIsV0FBWSxTQUFRLGdCQUFNO0lBQS9DOztRQUlJLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixhQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixPQUFPO1FBQ1AsY0FBUyxHQUFhLElBQUksQ0FBQztRQUUzQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixvQkFBZSxHQUFHLFdBQVcsQ0FBQTtRQUc3QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUUxQixjQUFT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SUFBSSxDQUFDOzhDQUNRO0FBRTFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ1E7QUFFMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDUTtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNPO0FBS3pCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1U7QUFFN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDUTtBQUUzQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNZO0FBRy9CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NENBQ007QUFFekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDTztBQUUxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNXO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ087QUFFMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDUTtBQUUzQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJDQUNLO0FBakVQLFdBQVc7SUFGL0IsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsV0FBVyxDQWlmL0I7a0JBamZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY0V2ZW50LCBMb2dpY1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUywgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBTY3JvVmlld0N0cmwgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdDdHJsXCI7XG5pbXBvcnQgSGFsbE5ld0dhbWVJdGVtIGZyb20gXCIuL0hhbGxOZXdHYW1lSXRlbVwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IEhhbGxEYXRhIGZyb20gXCIuLi9kYXRhL0hhbGxEYXRhXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBTdWJHYW1lRGVmaW5lIH0gZnJvbSBcIi4uL2NvbW1vbi9kZWZpbmUvU3ViR2FtZURlZmluZVwiO1xuaW1wb3J0IE1pbmlnYW1lVmlldyBmcm9tIFwiLi4vbWluaWdhbWUvTWluaWdhbWVWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgQmluZFBob25lVmlldyBmcm9tIFwiLi4vY29tbW9uL2JpbmRJdGVtVmlldy9CaW5kUGhvbmVWaWV3XCI7XG5pbXBvcnQgSGFsbEJldFJhbmtJdGVtIGZyb20gXCIuL0hhbGxCZXRSYW5rSXRlbVwiO1xuaW1wb3J0IExvZ2luTmV3VmlldyBmcm9tIFwiLi4vbG9naW4vTG9naW5OZXdWaWV3XCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgUmVnaXN0ZXJWaWV3IGZyb20gXCIuLi9sb2dpbi9SZWdpc3RlclZpZXdcIjtcbmltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vY29tbW9uL3V0aWxzL051bWJlclV0aWxzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsTmV3VmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuSGFyaWFuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bk1pbmdndWFuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0blNlbXVhOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJhbmtQbGF5SW5mbzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5DbG9zZVBJbmZvOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJldFJhbmtWaWV3OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3aW5SYW5rVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUGFnZVZpZXcpXG4gICAgcGFnZVZpZXc6IGNjLlBhZ2VWaWV3ID0gbnVsbDtcbiAgICAvLyDnlKjmiLfmlbDmja5cbiAgICBfdXNlckRhdGE6IFVzZXJEYXRhID0gbnVsbDtcblxuICAgIF93aW5SYW5raW5nTGlzdDogYW55ID0gW107XG4gICAgX2JldFJhbmtpbmdMaXN0OiBhbnkgPSBbXTtcbiAgICBfcmFua1NlbGVjdE5hbWUgPSAnYnRuSGFyaWFuJ1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ2FtZUl0ZW0wOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBnYW1lSXRlbTE6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdhbWVJdGVtMjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ2FtZUl0ZW0zOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRvcFRocmVlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBsb29wSW50ZXJ2YWw6IG51bWJlciA9IG51bGw7XG5cbiAgICAvL+WkmuivreiogOaWh+acrFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBIb3R0ZXN0R2FtZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBMYXRlc3RCZXQ6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgQmlnZ2VzdFdpbm5lcjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkdhbWU6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiVW5hbWU6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiQmV0QW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiRGFpbHk6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiV2Vla2x5OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkFsbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcImhhbGwvcHJlZmFicy9IYWxsVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIuc3RvcE11c2ljKClcbiAgICAgICAgLy8gdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoXCJjb21tb24vYXVkaW8vaGFsbF9iZ1wiLCBCVU5ETEVfUkVTT1VSQ0VTLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICB0aGlzLmNsb3NlU3BsYXNoVmlldygpO1xuXG4gICAgICAgIHRoaXMuYnRuSGFyaWFuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGlja1JhbmtUaXRsZSgnYnRuSGFyaWFuJylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYnRuTWluZ2d1YW4ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrUmFua1RpdGxlKCdidG5NaW5nZ3VhbicpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJ0blNlbXVhLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGlja1JhbmtUaXRsZSgnYnRuU2VtdWEnKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJ0bkNsb3NlUEluZm8ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJhbmtQbGF5SW5mby5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICAgIHRoaXMuY2xpY2tSYW5rVGl0bGUodGhpcy5fcmFua1NlbGVjdE5hbWUpXG4gICAgICAgIC8vIHRoaXMucmVxUmFua0xpc3QoKVxuICAgICAgICB0aGlzLnJlcUJldFJhbmtMaXN0KClcbiAgICAgICAgdGhpcy5yZXFIYWxsR2FtZXMoKVxuXG4gICAgICAgIC8vIHRoaXMuY2hlY2tPbkdhbWUoKVxuICAgICAgICB0aGlzLnBhZ2VWaWV3LnNldEN1cnJlbnRQYWdlSW5kZXgoMCk7XG4gICAgICAgIGRpc3BhdGNoRW50ZXJDb21wbGV0ZSh7IHR5cGU6IExvZ2ljVHlwZS5IQUxMLCB2aWV3czogW3RoaXNdIH0pO1xuXG4gICAgICAgIHRoaXMuY2hlY2tJbnZpdGF0aW9uUmVnaXN0ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb3NlU3BsYXNoVmlldygpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGxhc2gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0ludml0YXRpb25SZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKEcuRGF0YU1nci5nZXQoQXBwRGF0YSkuaW52Y29kZSAmJiAhRy5EYXRhTWdyLmdldChVc2VyRGF0YSkuaXNMb2dpbmVkKCkpIHtcbiAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBSZWdpc3RlclZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgekluZGV4OiA5OTk5OSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3VzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgfVxuXG4gICAgY2hlY2tPbkdhbWUoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgbGV0IGluR2FtZSA9IHVzZXJEYXRhLmluR2FtZVxuICAgICAgICBpZiAoaW5HYW1lKSB7XG4gICAgICAgICAgICBpZiAoaW5HYW1lICE9ICdMb2JieScpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBOYW1lXG5cbiAgICAgICAgICAgICAgICBsZXQgcm9vbXMgPSBoYWxsRGF0YS5nYW1lc1xuICAgICAgICAgICAgICAgIGlmICghcm9vbXMpIHJldHVyblxuICAgICAgICAgICAgICAgIGxldCBnZXRHYW1lSW5kZXhCeVJvb21zID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcm9vbXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcm9vbXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gaW5HYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZCA9IGVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRHYW1lSW5kZXhCeVJvb21zKClcblxuICAgICAgICAgICAgICAgIGxldCBnYW1lSXRlbSA9IHRoaXNbYGdhbWVJdGVtJHtpZH1gXVxuICAgICAgICAgICAgICAgIGlmICghZ2FtZUl0ZW0pIHJldHVybjtcbiAgICAgICAgICAgICAgICBsZXQgaGFsbEdhbWVJdGVtID0gZ2FtZUl0ZW0uZ2V0Q29tcG9uZW50KEhhbGxOZXdHYW1lSXRlbSlcbiAgICAgICAgICAgICAgICBoYWxsR2FtZUl0ZW0udXBkYXRlSXRlbShOYW1lLCBpZClcbiAgICAgICAgICAgICAgICBoYWxsR2FtZUl0ZW0uanVtcFRvR2FtZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXFSYW5rTGlzdCgpIHtcbiAgICAgICAgLy8gbGV0IHJlcSA9IE1TVC5DMkxfR29sZFJhbmtEYXlfUmVxLmNyZWF0ZSh7XG4gICAgICAgIC8vICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKClcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIGxldCBidWZmZXIgPSBNU1QuQzJMX0dvbGRSYW5rRGF5X1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgLy8gTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTF9Hb2xkUmFua0RheV9SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfR29sZFJhbmtEYXlfUmVxLCBidWZmZXIpO1xuICAgICAgICBpZiAodGhpcy5fcmFua1NlbGVjdE5hbWUgPT0gJ2J0bkhhcmlhbicpIHtcbiAgICAgICAgICAgIGxldCByZXEgPSBNU1QuQzJMX1dpbkRheVJhbmtfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJMX1dpbkRheVJhbmtfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTF9XaW5EYXlSYW5rX1JlcSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyTF9XaW5EYXlSYW5rX1JlcSwgYnVmZmVyKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9yYW5rU2VsZWN0TmFtZSA9PSAnYnRuTWluZ2d1YW4nKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gTVNULkMyTF9XaW5XZWVrUmFua19SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMkxfV2luV2Vla1JhbmtfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTF9XaW5XZWVrUmFua19SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfV2luV2Vla1JhbmtfUmVxLCBidWZmZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHJlcSA9IE1TVC5DMkxfV2luTW9udGhSYW5rX1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9XaW5Nb250aFJhbmtfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTF9XaW5Nb250aFJhbmtfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJMX1dpbk1vbnRoUmFua19SZXEsIGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXFIYWxsR2FtZXMoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJMX0dldEdhbWVMaXN0X1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9HZXRHYW1lTGlzdF9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMkxfR2V0R2FtZUxpc3RfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJMX0dldEdhbWVMaXN0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICByZXFCZXRSYW5rTGlzdCgpIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMkxfQmV0UmFua19SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMkxfQmV0UmFua19SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMkxfQmV0UmFua19SZXEsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMkxfQmV0UmFua19SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgY2xpY2tSYW5rVGl0bGUobmFtZSkge1xuICAgICAgICB0aGlzLl9yYW5rU2VsZWN0TmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5yZWZyZXNoUmFua1RpdGxlQnRuKClcbiAgICB9XG5cbiAgICByZWZyZXNoUmFua1RpdGxlQnRuKCkge1xuICAgICAgICBsZXQgX3JhbmtTZWxlY3ROYW1lID0gdGhpcy5fcmFua1NlbGVjdE5hbWVcbiAgICAgICAgbGV0IGJ0blRpdGxlcyA9IFsnYnRuSGFyaWFuJywgJ2J0bk1pbmdndWFuJywgJ2J0blNlbXVhJ11cbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJ0blRpdGxlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBidG5UaXRsZXNbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXNbZWxlbWVudF1cbiAgICAgICAgICAgIGxldCBhY3RpdmVJbWcgPSBidG4uZ2V0Q2hpbGRCeU5hbWUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgYWN0aXZlSW1nLmFjdGl2ZSA9IF9yYW5rU2VsZWN0TmFtZSA9PSBlbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fcmFua1NlbGVjdE5hbWUgPSBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVxUmFua0xpc3QoKVxuICAgIH1cblxuICAgIG9wZW5SYW5rSW5mbygpIHtcbiAgICAgICAgdGhpcy5yYW5rUGxheUluZm8uYWN0aXZlID0gdHJ1ZVxuICAgIH1cblxuICAgIG9wZW5Mb2dpblZpZXcoKSB7XG4gICAgICAgIGRpc3BhdGNoKFwib3BlbkxvZ2luVmlld1wiKTtcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKClcbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ29wZW5SYW5rSW5mbycsIHRoaXMub3BlblJhbmtJbmZvKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdvcGVuTG9naW5FdmVudCcsIHRoaXMub3BlbkxvZ2luVmlldyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChMb2dpY0V2ZW50LkVOVEVSX0dBTUVfUkVBRFksIHRoaXMub25FbnRlckdhbWVSZWFkeSk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudCgnTDJDX0dvbGRSYW5rRGF5X1JlcycsIHRoaXMuTDJDX0dvbGRSYW5rRGF5X1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTDJDX1dpbkRheVJhbmtfUmVzJywgdGhpcy5MMkNfV2luRGF5UmFua19SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0wyQ19XaW5XZWVrUmFua19SZXMnLCB0aGlzLkwyQ19XaW5EYXlSYW5rX1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTDJDX1dpbk1vbnRoUmFua19SZXMnLCB0aGlzLkwyQ19XaW5EYXlSYW5rX1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTDJDX0JldFJhbmtfUmVzJywgdGhpcy5MMkNfQmV0UmFua19SZXMpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoJ3VwZGF0ZVVzZXJJbmZvJywgdGhpcy5yZWZyZXNoUGxheWVySW5mbyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnTTJDX0tpY2tPdXRfTWVzJywgdGhpcy5NMkNfS2lja091dF9NZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ3VwZGF0ZUhhbGxHYW1lcycsIHRoaXMucmVmcmVzaEdhbWVSb29tcyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoR2FtZVJvb21zKClcbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLkhvdHRlc3RHYW1lLnN0cmluZyA9IGkxOG4uVElUTEUuSE9UVEVTVEdBTUU7XG4gICAgICAgIHRoaXMuTGF0ZXN0QmV0LnN0cmluZyA9IGkxOG4uQkVUX1RJVExFLkxBVEVTVEJFVDtcbiAgICAgICAgdGhpcy5CaWdnZXN0V2lubmVyLnN0cmluZyA9IGkxOG4uQklHR0VTVFdJTk5FUi5CSUdHRVNUV0lOTkVSO1xuICAgICAgICB0aGlzLmxhYkdhbWUuc3RyaW5nID0gaTE4bi5USVRMRS5MQUJHQU1FO1xuICAgICAgICB0aGlzLmxhYlVuYW1lLnN0cmluZyA9IGkxOG4uVElUTEUuTEFCUExBWUVSO1xuICAgICAgICB0aGlzLmxhYkJldEFtb3VudC5zdHJpbmcgPSBpMThuLlRJVExFLkxBQkJFVEFNT1VOVDtcblxuICAgICAgICB0aGlzLmxhYkRhaWx5LnN0cmluZyA9IGkxOG4uVElUTEUuTEFCREFJTFk7XG4gICAgICAgIHRoaXMubGFiV2Vla2x5LnN0cmluZyA9IGkxOG4uVElUTEUuTEFCV0VFS0xZO1xuICAgICAgICB0aGlzLmxhYkFsbC5zdHJpbmcgPSBpMThuLlRJVExFLkxBQkFMTDtcbiAgICB9XG5cbiAgICByZWZyZXNoR2FtZVJvb21zKCkge1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgbGV0IGdhbWVMaXN0ID0gaGFsbERhdGEuZ2FtZXM7XG5cbiAgICAgICAgaWYgKCFnYW1lTGlzdCkgcmV0dXJuXG4gICAgICAgIGxldCBnYW1lTWF4ID0gNFxuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBnYW1lTWF4OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXNbYGdhbWVJdGVtJHtpbmRleH1gXVxuICAgICAgICAgICAgaWYgKCFpdGVtKSByZXR1cm47XG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoaW5kZXggPCBnYW1lTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUxpc3RbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gaXRlbS5nZXRDb21wb25lbnQoSGFsbE5ld0dhbWVJdGVtKVxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBnYW1lTGlzdFtpbmRleF0uaWRcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0LnVwZGF0ZUl0ZW0oZ2FtZUxpc3RbaW5kZXhdLCBpZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrT25HYW1lKCk7XG4gICAgfVxuXG4gICAgTDJDX1dpbkRheVJhbmtfUmVzKCkge1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgbGV0IHdpblJhbmtMaXN0ID0gaGFsbERhdGEud2luUmFua0xpc3RcbiAgICAgICAgLy90ZXN0IGRhdGFcbiAgICAgICAgLy8gbGV0IHRlc3REYXRhID0gW3sgJ0FjY291bnRJZCc6IDExMTExLCAnTmljayc6ICdqaicsICdTY29yZSc6IDExIH0sIHsgJ0FjY291bnRJZCc6IDIyMiwgJ05pY2snOiAnZ2cnLCAnU2NvcmUnOiAyMjIgfV1cbiAgICAgICAgLy8gdGhpcy5fd2luUmFua2luZ0xpc3QgPSB0ZXN0RGF0YTtcbiAgICAgICAgdGhpcy5fd2luUmFua2luZ0xpc3QgPSB3aW5SYW5rTGlzdFxuICAgICAgICB0aGlzLnVwZGF0ZVdpblJhbmtMaXN0KClcbiAgICB9XG5cbiAgICBMMkNfQmV0UmFua19SZXMoKSB7XG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICBsZXQgYmV0UmFua0xpc3QgPSBoYWxsRGF0YS5iZXRSYW5rTGlzdFxuICAgICAgICB0aGlzLl9iZXRSYW5raW5nTGlzdCA9IGJldFJhbmtMaXN0XG4gICAgICAgIC8vIHRoaXMuYmV0UmFua0xpc3RWaWV3KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEJldFJhbmtWaWV3KCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaEJldFJhbmtWaWV3KCkge1xuICAgICAgICBpZiAoIXRoaXMuYmV0UmFua1ZpZXcpIHJldHVybjtcbiAgICAgICAgbGV0IGJldFJhbmtEYXRhID0gdGhpcy5fYmV0UmFua2luZ0xpc3Q7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA5OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGJldFJhbmtEYXRhW2luZGV4XTtcbiAgICAgICAgICAgIGxldCByYW5rSXRlbSA9IHRoaXMuYmV0UmFua1ZpZXcuZ2V0Q2hpbGRCeU5hbWUoJ0hhbGxCZXRSYW5rSXRlbScgKyBpbmRleCk7XG4gICAgICAgICAgICBsZXQgcmFua0l0ZW1Db21tID0gcmFua0l0ZW0uZ2V0Q29tcG9uZW50KEhhbGxCZXRSYW5rSXRlbSk7XG4gICAgICAgICAgICByYW5rSXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJldFJhbmtEYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJhbmtJdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmFua0l0ZW1Db21tLnVwZGF0ZUl0ZW0oZGF0YSwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlV2luUmFua0xpc3QoKSB7XG4gICAgICAgIGxldCByYW5MaXN0ID0gdGhpcy5fd2luUmFua2luZ0xpc3RcbiAgICAgICAgaWYgKHJhbkxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHJhbkxpc3QubGVuZ3RoIDw9IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzWyd0b3BUaHJlZUxpc3QnXSA9IHJhbkxpc3Q7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlV2luUmFua1ZpZXcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHNwbGljZVJhbmtMaXN0ID0gW11cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHJhbkxpc3RbMF07XG4gICAgICAgICAgICAgICAgICAgIHNwbGljZVJhbmtMaXN0LnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgcmFuTGlzdC5zcGxpY2UoMCwgMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc1sndG9wVGhyZWVMaXN0J10gPSBzcGxpY2VSYW5rTGlzdDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hXaW5SYW5rVmlldygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hSYW5rVG9wVGhyZWUoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRvcFRocmVlID0gdGhpcy50b3BUaHJlZTtcbiAgICAgICAgICAgIGlmICh0b3BUaHJlZSkge1xuICAgICAgICAgICAgICAgIHRvcFRocmVlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVdpblJhbmtWaWV3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWZyZXNoUmFua1RvcFRocmVlKCkge1xuICAgICAgICBpZiAoIXRoaXMudG9wVGhyZWUpIHJldHVybjtcbiAgICAgICAgbGV0IG5hbWVzID0gWydPbmUnLCAnVHdvJywgJ1RocmVlJ11cbiAgICAgICAgbGV0IHRvcFRocmVlTGlzdCA9IHRoaXNbJ3RvcFRocmVlTGlzdCddXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMudG9wVGhyZWUuZ2V0Q2hpbGRCeU5hbWUoYHRvcCR7bmFtZXNbaW5kZXhdfWApXG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0b3BUaHJlZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0b3BUaHJlZUxpc3RbaW5kZXhdXG4gICAgICAgICAgICAgICAgbGV0IG5pY2tOYW1lID0gZGF0YS5OaWNrXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gZGF0YS5TY29yZVxuXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnbmlja05hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5pY2tOYW1lO1xuICAgICAgICAgICAgICAgIGxldCBzY29yZU51bSA9IE51bWJlclV0aWxzLmNvbnZlclRvQyhzY29yZSk7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlU3RyID0gTnVtYmVyVXRpbHMuY29udmVyVG9FKDcsIE51bWJlcihzY29yZU51bSkpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2J0bkh1YW5nJykuZ2V0Q2hpbGRCeU5hbWUoJ3JwJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgUnAgJHtzY29yZVN0cn1gO1xuICAgICAgICAgICAgICAgIGxldCBpbWdBdmF0YXIgPSBpdGVtLmdldENoaWxkQnlOYW1lKCdpbWdBdmF0YXInKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxuICAgICAgICAgICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcoaW1nQXZhdGFyLCBkYXRhLmhlYWRVcmwsIGRhdGEuaGVhZFVybCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlV2luUmFua1ZpZXcoKSB7XG4gICAgICAgIGlmICghdGhpcy53aW5SYW5rVmlldykgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgOTsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IHJhbmtJdGVtID0gdGhpcy53aW5SYW5rVmlldy5nZXRDaGlsZEJ5TmFtZSgnSGFsbFdpblJhbmtJdGVtJyArIGluZGV4KTtcbiAgICAgICAgICAgIHJhbmtJdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlZnJlc2hXaW5SYW5rVmlldygpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpblJhbmtWaWV3KSByZXR1cm47XG4gICAgICAgIGxldCB3aW5SYW5rRGF0YSA9IHRoaXMuX3dpblJhbmtpbmdMaXN0O1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgOTsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB3aW5SYW5rRGF0YVtpbmRleF07XG4gICAgICAgICAgICBsZXQgcmFua0l0ZW0gPSB0aGlzLndpblJhbmtWaWV3LmdldENoaWxkQnlOYW1lKCdIYWxsV2luUmFua0l0ZW0nICsgaW5kZXgpO1xuICAgICAgICAgICAgcmFua0l0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCB3aW5SYW5rRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByYW5rSXRlbS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxhYkluZGV4ID0gcmFua0l0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2xhYkluZGV4JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgICAgICBsZXQgdW5hbWUgPSByYW5rSXRlbS5nZXRDaGlsZEJ5TmFtZSgnbmFtZUxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgICAgICBsZXQgZ29sZCA9IHJhbmtJdGVtLmdldENoaWxkQnlOYW1lKCdnb2xkTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgICAgIGxldCBpbWdBdmF0YXIgPSByYW5rSXRlbS5nZXRDaGlsZEJ5TmFtZSgnaW1nQXZhdGFyJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcbiAgICAgICAgICAgICAgICBpZiAoKGluZGV4ICsgNCkgPCAxMClcbiAgICAgICAgICAgICAgICAgICAgbGFiSW5kZXguc3RyaW5nID0gYDAke1N0cmluZyhpbmRleCArIDQpfWA7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsYWJJbmRleC5zdHJpbmcgPSBgJHtTdHJpbmcoaW5kZXggKyA0KX1gO1xuXG4gICAgICAgICAgICAgICAgdW5hbWUuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5OaWNrKTtcbiAgICAgICAgICAgICAgICBnb2xkLnN0cmluZyA9IGBScCAke051bWJlclV0aWxzLmNvbnZlclRvQyhkYXRhLlNjb3JlKX1gO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGVhZEltZ1VybClcbiAgICAgICAgICAgICAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyhpbWdBdmF0YXIsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS5oZWFkSW1nVXJsLCB0aGlzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYWdlRXZlbnQoc2VuZGVyLCBldmVudFR5cGUpIHtcbiAgICAgICAgLy8g57+76aG15LqL5Lu2XG4gICAgICAgIGlmIChldmVudFR5cGUgIT09IGNjLlBhZ2VWaWV3LkV2ZW50VHlwZS5QQUdFX1RVUk5JTkcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeaJgOWcqOeahOmhtemdoue0ouW8lTpcIiArIHNlbmRlci5nZXRDdXJyZW50UGFnZUluZGV4KCkpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J0bkFrdW4nOlxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwib3BlbkFrdW5WaWV3XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuRG9tcGV0JzpcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcIm9wZW5Eb21wZXRWaWV3XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuRXZlbnQnOlxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwib3BlbkFjdGl2ZVZpZXdcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdoZWFkJzpcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcIm9wZW5Ba3VuVmlld1wiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0blFpYW5kYW8nOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKVxuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChcIm9wZW5TaWduaW5WaWV3XCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmVycHV0YXJOb2RlJzpcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcIm9wZW5NaW5pZ2FtZVZpZXdcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgLy8gdGhpcy5wYWdlVmlldy5zZXRDdXJyZW50UGFnZUluZGV4KDApO1xuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5sb29wUmVxdWVzdEJldFJhbmsoKTtcblxuICAgICAgICAvL3Rlc3RcbiAgICAgICAgLy8gdGhpcy5iZXRSYW5rTGlzdFZpZXcoKVxuICAgICAgICAvLyBQYW5lbEhlbHAuc2hvd1RpcChNYW5hZ2VyLm1ha2VMYW5ndWFnZSgnVElQUy5SRUNIQVJHRVNVQ0NFU1MnLCB0cnVlKSk7XG4gICAgfVxuXG4gICAgY2hlY2tMb2dpbmVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3VzZXJEYXRhLmlkKSB7XG4gICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbG9vcFJlcXVlc3RCZXRSYW5rKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsb29wSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucmVxQmV0UmFua0xpc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGUobG9vcEhhbmRsZXIsIDMpO1xuICAgICAgICB0aGlzWydsb29wSGFuZGxlciddID0gbG9vcEhhbmRsZXI7XG4gICAgfVxuXG4gICAgZW50ZXJUaW1lcyA9IDBcbiAgICBvbkVudGVyR2FtZVJlYWR5KGdhbWUpIHtcbiAgICAgICAgbGV0IGdhbWVCdW5kbGVcbiAgICAgICAgc3dpdGNoIChnYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdjcmFzaCc6XG4gICAgICAgICAgICAgICAgZ2FtZUJ1bmRsZSA9IFN1YkdhbWVEZWZpbmUuR2FtZU5hbWUuQ1JBU0g7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicm91bGV0dGVcIjpcbiAgICAgICAgICAgICAgICBnYW1lQnVuZGxlID0gU3ViR2FtZURlZmluZS5HYW1lTmFtZS5ST1VMRVRURTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcIndpbmdvXCI6XG4gICAgICAgICAgICAgICAgZ2FtZUJ1bmRsZSA9IFN1YkdhbWVEZWZpbmUuR2FtZU5hbWUuV0lOR087XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldhaXRpbmcuRW50ZXJHYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuZW50ZXJUaW1lcyA+PSAxKSByZXR1cm5cbiAgICAgICAgZGlzcGF0Y2goTG9naWNFdmVudC5FTlRFUl9HQU1FLCB7IGJ1bmRsZTogZ2FtZUJ1bmRsZSB9KTtcbiAgICAgICAgdGhpcy5lbnRlclRpbWVzKytcbiAgICB9XG5cbiAgICBNMkNfS2lja091dF9NZXMoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICB1c2VyRGF0YS5jbGVhclVzZXJEYXRhKCk7XG4gICAgICAgIC8vIGRpc3BhdGNoKFwib3BlbkxvZ2luVmlld1wiKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiMjIyMlwiKTtcbiAgICAgICAgbGV0IGxvb3BIYW5kbGVyID0gdGhpc1snbG9vcEhhbmRsZXInXTtcbiAgICAgICAgaWYgKGxvb3BIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpc1snbG9vcEhhbmRsZXInXSk7XG4gICAgICAgICAgICBsb29wSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIl19