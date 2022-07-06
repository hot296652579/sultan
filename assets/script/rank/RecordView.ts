
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
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
export default class RecordView extends UIView implements IController<LobbyService>{

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Node)
    noRecords: cc.Node = null;

    @property(cc.Node)
    boxNode: cc.Node = null;

    @property(cc.Label)
    boxTime: cc.Label = null;

    @property(cc.Node)
    draw: cc.Node = null;

    _rankingList: any = []

    service: LobbyService;


    _receiveStatus: number;//是否领取

    _isWin: number;//是否中奖

    _contDown: number;

    timeInterval = null;


    public static getPrefabUrl() {
        return "rank/prefabs/RecordView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingRecord), this.updateList);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingReceive), this.newRankingReceiveRes);

    }

    updateList(data) {
        cc.log(data, "newRankingRecord")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.newRankingRecordP.length > 0) {
                    this._rankingList = data.newRankingRecordP
                    this.rankView();
                }
                this._receiveStatus = data.receiveStatus;
                this._isWin = data.isWin;
                this._contDown = data.contDown;
                this.showBox();
                this.noRecords.active = !this._rankingList.length;
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    async rankView() {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = this._rankingList
        await scroViewCtrlCom.framingLoad(this._rankingList.length)
        PanelHelp.hideLoading()
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
    }



    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "boxBtn": this.reqReceive(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqReceive() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_NewRankingReceive,
            null);
    }


    refreshRank() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_NewRankingRecord,
            null);
    }

    start() {
        this.refreshRank()
    }

    newRankingReceiveRes(data) {
        if (data.statusMsg.status == 0) {
            this.boxNode.getComponent(sp.Skeleton).setAnimation(0, "kaixiang", false);
            this.boxNode.getComponent(sp.Skeleton).setCompleteListener(() => {
                this.boxNode.active = false;
                this.refreshRank()
            });
            dispatch("OpenBox");
            PanelHelp.showMsgBox("", Manager.makeLanguage(["RANK.Receive", UtilMgr.changeMoney(data.reward)]), null, "btn_OK");
        } else {
            PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }

    showBox() {
        if (this._isWin == 1 && this._receiveStatus == 0) {
            this.boxNode.active = true;
            this.boxNode.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
        } else {
            this.boxNode.active = false;
        }
        this.draw.active = this._isWin == 1 ? (this._receiveStatus ? true : false) : true;

        this.updateBoxTime(this._contDown);
        if (this._contDown <= 0) {
            this.boxTime.node.active = false;
            this.draw.active = false;
        }

        this.boxTime.node.active = this.draw.active;
    }


    updateBoxTime(time: number) {
        this.timeInterval = () => {
            time -= 1000;
            this.conversionTime(time);
            if (time == 0) {
                this.unschedule(this.timeInterval)
                this.timeInterval = null;
                this.refreshRank()
            }
        }
        if (time > 0) {
            this.schedule(this.timeInterval, 1);
        } else if (time == 0) {
            this.unscheduleAllCallbacks();
            if (this.timeInterval) {
                this.unschedule(this.timeInterval);
                this.timeInterval = null;
            }
            this.refreshRank()
        }

    }


    conversionTime(data) {
        let hours = parseInt(data) / (1000 * 60 * 60);
        let h = parseInt(hours.toString());
        let minutes = (data % (1000 * 60 * 60)) / (1000 * 60);
        let m = parseInt(minutes.toString());
        let seconds = (data % (1000 * 60)) / 1000;
        let s = parseInt(seconds.toString());
        let time = (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
        this.boxTime.string = time;
    }

    onDestroy() {
        super.onDestroy();
        this.unscheduleAllCallbacks();
        if (this.timeInterval) {
            this.unschedule(this.timeInterval);
            this.timeInterval = null;
        }
    }
}
