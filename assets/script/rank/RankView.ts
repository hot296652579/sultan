
import ScroViewCtrl from "../common/component/ScroViewCtrl";
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

const { ccclass, property } = cc._decorator;

export enum rankType {
    Friends = 1,  //好友
    Wealth = 2,   //财富
    DayEarn = 3,  //日赚
}

@ccclass
@injectService(LobbyService.instance)
export default class RankView extends UIView implements IController<LobbyService>{

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Label)
    myName: cc.Label = null;

    @property(cc.Label)
    myId: cc.Label = null;

    @property(cc.Label)
    myRankIndex: cc.Label = null;

    @property(cc.Label)
    myGold: cc.Label = null;

    @property(cc.Label)
    myRank: cc.Label = null;

    @property(cc.Sprite)
    myHead: cc.Sprite = null;

    _rankingList: any = []

    _type: number = rankType.Wealth

    _page: number = 1

    _pageSize: number = 50

    _pageTotal: number = 0

    service: LobbyService;

    public static getPrefabUrl() {
        return "rank/prefabs/RankView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        //暂时只显示50条  先不做分页  后面有需要再加
        //this.scrollView.node.on('bounce-bottom', this.onBounceBottom, this)
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.RANKING_LIST), this.updateList);
        this.registerEvent("updateUserInfo", this.updateUserInfo);

    }
    updateUserInfo() {
        this.myName.string = UtilMgr.setString(User._userName);
        this.myId.string = User._userID || '';
        this.myGold.string = User.isRechargedPlayer ? UtilMgr.changeMoney(User._gold) : i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr.loadHeadImg(this.myHead, User._headImgUrl, User._userID, this)
    }
    updateList(data) {
        cc.log(data, "Rank")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.rankingList.length > 0) {
                    this._rankingList = data.rankingList
                    this._page = data.currPage
                    this._pageTotal = data.total

                    let meRankIndex = this.getMeRankIndex()
                    this.myRankIndex.string = meRankIndex;

                    //处理分页排行id
                    data.rankingList.forEach((element) => {
                        element.id = this._pageSize * (this._page - 1) + element.id
                    });

                    this.rankView(data.rankingList)
                }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    getMeRankIndex() {
        let rankIndex = "50+"
        for (let i = 0; i < this._rankingList.length; i++) {
            let rankInfo = this._rankingList[i]
            if (rankInfo.userId == User._userID) {
                rankIndex = this._pageSize * (this._page - 1) + rankInfo.id
                break;
            }
        }
        return rankIndex
    }

    async rankView(rankingList) {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = rankingList
        await scroViewCtrlCom.framingLoad(rankingList.length, false)
        PanelHelp.hideLoading()
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
    }

    onBounceBottom() {
        if (this._pageTotal > this._page) {
            this._page = this._page + 1
            this.refreshRank()
        }
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;

            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    refreshRank() {
        let req = protoPackage.hall.base.RankingList.create({ userId: User._userID, type: this._type, page: this._page, size: this._pageSize });
        let buffer = protoPackage.hall.base.RankingList.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.RANKING_LIST,
            buffer);
    }

    start() {
        this.myName.string = UtilMgr.setString(User._userName);
        this.myId.string = User._userID || '';
        this.myGold.string = User.isRechargedPlayer ? UtilMgr.changeMoney(User._gold) : i18n.EXPERIENCE_FIELD.NoGold;
        UtilMgr.loadHeadImg(this.myHead, User._headImgUrl, User._userID, this)
        PanelHelp.showLoading(i18n.WAIT.LOADING)
        this.refreshRank()

        this.myRank.language = i18n.RANK.MYRANK;
    }

    // update (dt) {}
}
