"use strict";
cc._RF.push(module, '3598aKvShNNvI8EhRuxspma', 'LeaderBoardView');
// script/rank/LeaderBoardView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankType = void 0;
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const ScroViewLogic_1 = __importDefault(require("../common/component/ScroViewLogic"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const RecordView_1 = __importDefault(require("./RecordView"));
const RuleView_1 = __importDefault(require("./RuleView"));
const { ccclass, property } = cc._decorator;
var rankType;
(function (rankType) {
    rankType[rankType["Friends"] = 1] = "Friends";
    rankType[rankType["Wealth"] = 2] = "Wealth";
    rankType[rankType["DayEarn"] = 3] = "DayEarn";
})(rankType = exports.rankType || (exports.rankType = {}));
let LeaderBoardView = class LeaderBoardView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.myName = null;
        this.myReward = null;
        this.myRankIndex = null;
        this.myGold = null;
        this.myHead = null;
        this.noResult = null;
        this.redPoint = null;
        this._rankingList = [];
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "rank/prefabs/LeaderBoardView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingList), this.updateList);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FLUSH_RED_DOT), this.flushRedDot);
        this.registerEvent("updateUserInfo", this.updateUserInfo);
        this.registerEvent("OpenBox", this.reqFlushRedDot);
    }
    updateUserInfo() {
        this.myName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        UtilMgr_1.UtilMgr.loadHeadImg(this.myHead, User_1.User._headImgUrl, User_1.User._userID, this);
    }
    updateList(data) {
        cc.log(data, "Rank");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.rankingPlayer.length > 0) {
                    this._rankingList = data.rankingPlayer;
                    this.getComponent(ScroViewLogic_1.default).initUI(this._rankingList);
                    this.moveToMe();
                    // this.rankView(data.rankingPlayer)
                }
                PanelHelp_1.default.hideLoading();
                let meRankInfo = this.getMeRankInfo();
                this.myRankIndex.string = meRankInfo.rankIndex ? meRankInfo.rankIndex : (data.winGold > 0 ? data.rankingSize + "+" : "none");
                this.myReward.string = meRankInfo.reward ? UtilMgr_1.UtilMgr.changeMoney(meRankInfo.reward) : "none";
                this.myGold.string = meRankInfo.winChips ? UtilMgr_1.UtilMgr.changeMoney(meRankInfo.winChips, true, true) : (data.winGold > 0 ? UtilMgr_1.UtilMgr.changeMoney(data.winGold, true, true) : "0");
                this.noResult.active = data.rankingPlayer.length == 0;
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    getMeRankInfo() {
        let rankIndex = null;
        let reward = null;
        let winChips = null;
        for (let i = 0; i < this._rankingList.length; i++) {
            let rankInfo = this._rankingList[i];
            if (rankInfo.userId == User_1.User._userID) {
                rankIndex = rankInfo.rank;
                reward = rankInfo.reward;
                winChips = rankInfo.winGold;
                break;
            }
        }
        return { rankIndex, reward, winChips };
    }
    rankView(rankingList) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = rankingList;
            yield scroViewCtrlCom.framingLoad(rankingList.length);
            PanelHelp_1.default.hideLoading();
            this.moveToMe();
        });
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "ruleBtn":
                Manager_1.Manager.uiManager.open({ type: RuleView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "recordBtn":
                Manager_1.Manager.uiManager.open({ type: RecordView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "backBtn":
                this.moveToMe();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    moveToMe() {
        let myRank = this.getMeRankInfo().rankIndex;
        let showLen = 6; //能显示的最多只有6条
        let maxLen = this._rankingList.length;
        let showPosY = 4; //要偏移的Item数
        let offLen = maxLen - showLen; //能最多偏移的Item数
        if (myRank) { //我存在 移动到我的位置
            //自己名次占比 
            if (maxLen < showLen) { //小于6位 直接滚动到顶层
                this.scrollView.scrollToTop(0.2);
            }
            else if ((myRank + showPosY - showLen) > maxLen) { // 我Item显示在中间 = 我的排名+ 需要偏移的Item - 不偏移的Item ,越界直接移动到底部
                this.scrollView.scrollToBottom(0.2);
            }
            else {
                if (offLen <= 3) {
                    if (myRank <= showPosY) { // 我是前四名 那么我不用偏移
                        this.scrollView.scrollToTop(0.2);
                    }
                    else { //正常偏移
                        let offY = myRank - showPosY;
                        let offEnd = 1 - offY / offLen;
                        this.scrollView.scrollTo(new cc.Vec2(0, offEnd), 0.2);
                    }
                }
                else { //正常偏移
                    let offY = myRank - showPosY;
                    let offEnd = 1 - offY / offLen;
                    this.scrollView.scrollTo(new cc.Vec2(0, offEnd), 0.2);
                }
            }
        }
        else { //移动到底部
            this.scrollView.scrollToBottom(0.2);
        }
    }
    refreshRank() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingList, null);
    }
    start() {
        this.myName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.myGold.string = User_1.User.isRechargedPlayer ? "0" : LanguageImpl_1.i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr_1.UtilMgr.loadHeadImg(this.myHead, User_1.User._headImgUrl, User_1.User._userID, this);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOADING);
        this.refreshRank();
        this.reqFlushRedDot();
    }
    flushRedDot(data) {
        cc.log(data, "rankRedPoint");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (this.redPoint) {
                    this.redPoint.active = data.rank && data.rank.redDot == 1;
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    reqFlushRedDot() {
        let req = CommonService_1.protoPackage.hall.base.FlushRedDot.create({ userId: User_1.User._userID });
        let buffer = CommonService_1.protoPackage.hall.base.FlushRedDot.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.FLUSH_RED_DOT, buffer);
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.ScrollView)
], LeaderBoardView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myName", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myReward", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myRankIndex", void 0);
__decorate([
    property(cc.Label)
], LeaderBoardView.prototype, "myGold", void 0);
__decorate([
    property(cc.Sprite)
], LeaderBoardView.prototype, "myHead", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardView.prototype, "noResult", void 0);
__decorate([
    property(cc.Node)
], LeaderBoardView.prototype, "redPoint", void 0);
LeaderBoardView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], LeaderBoardView);
exports.default = LeaderBoardView;

cc._RF.pop();