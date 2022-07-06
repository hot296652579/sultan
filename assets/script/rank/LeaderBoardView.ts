
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import ScroViewLogic from "../common/component/ScroViewLogic";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import RecordView from "./RecordView";
import RuleView from "./RuleView";

const { ccclass, property } = cc._decorator;

export enum rankType {
    Friends = 1,  //好友
    Wealth = 2,   //财富
    DayEarn = 3,  //日赚
}

@ccclass
@injectService(LobbyService.instance)
export default class LeaderBoardView extends UIView implements IController<LobbyService>{

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Label)
    myName: cc.Label = null;

    @property(cc.Label)
    myReward: cc.Label = null;

    @property(cc.Label)
    myRankIndex: cc.Label = null;

    @property(cc.Label)
    myGold: cc.Label = null;

    @property(cc.Sprite)
    myHead: cc.Sprite = null;

    @property(cc.Node)
    noResult: cc.Node = null;

    @property(cc.Node)
    redPoint: cc.Node = null;

    _rankingList: any = []


    service: LobbyService;

    public static getPrefabUrl() {
        return "rank/prefabs/LeaderBoardView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingList), this.updateList);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.FLUSH_RED_DOT), this.flushRedDot);
        this.registerEvent("updateUserInfo", this.updateUserInfo);
        this.registerEvent("OpenBox", this.reqFlushRedDot);

    }
    updateUserInfo() {
        this.myName.string = UtilMgr.setString(User._userName);
        UtilMgr.loadHeadImg(this.myHead, User._headImgUrl, User._userID, this)
    }
    updateList(data) {
        cc.log(data, "Rank")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.rankingPlayer.length > 0) {
                    this._rankingList = data.rankingPlayer;
                    this.getComponent(ScroViewLogic).initUI(this._rankingList)
                    this.moveToMe();
                    // this.rankView(data.rankingPlayer)
                } 
                PanelHelp.hideLoading()
                let meRankInfo = this.getMeRankInfo()
                this.myRankIndex.string = meRankInfo.rankIndex ? meRankInfo.rankIndex : (data.winGold > 0 ? data.rankingSize + "+" : "none");
                this.myReward.string = meRankInfo.reward ? UtilMgr.changeMoney(meRankInfo.reward) : "none";
                this.myGold.string = meRankInfo.winChips ? UtilMgr.changeMoney(meRankInfo.winChips, true, true) : (data.winGold > 0 ? UtilMgr.changeMoney(data.winGold, true, true) : "0");
                this.noResult.active = data.rankingPlayer.length == 0;
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    getMeRankInfo() {
        let rankIndex = null;
        let reward = null
        let winChips = null
        for (let i = 0; i < this._rankingList.length; i++) {
            let rankInfo = this._rankingList[i]
            if (rankInfo.userId == User._userID) {
                rankIndex = rankInfo.rank;
                reward = rankInfo.reward;
                winChips = rankInfo.winGold;
                break;
            }
        }
        return { rankIndex, reward, winChips }
    }

    async rankView(rankingList) {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = rankingList
        await scroViewCtrlCom.framingLoad(rankingList.length)
        PanelHelp.hideLoading()
        this.moveToMe();
    }



    show(args) {
        super.show(args);
        this.showWithAction(true);
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "ruleBtn": Manager.uiManager.open({ type: RuleView, bundle: BUNDLE_RESOURCES }); break;
            case "recordBtn": Manager.uiManager.open({ type: RecordView, bundle: BUNDLE_RESOURCES }); break;
            case "backBtn": this.moveToMe(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    moveToMe() {
        let myRank = this.getMeRankInfo().rankIndex;
        let showLen = 6;//能显示的最多只有6条
        let maxLen = this._rankingList.length;
        let showPosY = 4;//要偏移的Item数
        let offLen = maxLen - showLen;//能最多偏移的Item数
        if (myRank) {//我存在 移动到我的位置
            //自己名次占比 
            if (maxLen < showLen) { //小于6位 直接滚动到顶层
                this.scrollView.scrollToTop(0.2);
            } else if ((myRank + showPosY - showLen) > maxLen) {// 我Item显示在中间 = 我的排名+ 需要偏移的Item - 不偏移的Item ,越界直接移动到底部
                this.scrollView.scrollToBottom(0.2);
            } else {
                if (offLen <= 3) {
                    if (myRank <= showPosY) { // 我是前四名 那么我不用偏移
                        this.scrollView.scrollToTop(0.2);
                    } else {//正常偏移
                        let offY = myRank - showPosY;
                        let offEnd = 1 - offY / offLen;
                        this.scrollView.scrollTo(new cc.Vec2(0, offEnd), 0.2);
                    }
                } else {//正常偏移
                    let offY = myRank - showPosY;
                    let offEnd = 1 - offY / offLen;
                    this.scrollView.scrollTo(new cc.Vec2(0, offEnd), 0.2);
                }
            }
        } else {//移动到底部
            this.scrollView.scrollToBottom(0.2);
        }
    }

    refreshRank() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_NewRankingList,
            null);
    }

    start() {
        this.myName.string = UtilMgr.setString(User._userName);
        this.myGold.string = User.isRechargedPlayer ? "0" : i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr.loadHeadImg(this.myHead, User._headImgUrl, User._userID, this)
        PanelHelp.showLoading(i18n.WAIT.LOADING)
        this.refreshRank()
        this.reqFlushRedDot();
    }


    private flushRedDot(data) {
        cc.log(data, "rankRedPoint")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (this.redPoint) {
                    this.redPoint.active = data.rank && data.rank.redDot == 1;
                }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    reqFlushRedDot() {
        let req = protoPackage.hall.base.FlushRedDot.create({ userId: User._userID });
        let buffer = protoPackage.hall.base.FlushRedDot.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.FLUSH_RED_DOT,
            buffer);
    }

    onDestroy() {
        super.onDestroy();
    }
    // update (dt) {}
}
