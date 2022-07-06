import ScroViewCtrl from "../common/component/ScroViewCtrl";
import { Config } from "../common/config/Config";
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { Manager } from "../framework/Framework";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import CreateTournamentView from "./CreateTournamentView";
import MyTournamentView from "./MyTournamentView";
import TournamentData from "./TournamentData";
import TournamentDetailView from "./TournamentDetailView";
import TournamentEndDetailView from "./TournamentEndDetailView ";
import TournamentItem from "./TournamentItem";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class TournamentRoomView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.EditBox)
    gameEditBox: cc.EditBox = null;

    @property(cc.Label)
    lb_myTournamentTip: cc.Label = null;

    @property(cc.Label)
    lb_myTournamentStep: cc.Label = null;

    @property(cc.Label)
    lb_createTournamentTip: cc.Label = null;

    private tournamentList: com.bt.game.proto.hall.ITournamentP[] = null;
    private searchId: number = null;
    public static getPrefabUrl() {
        return "tournament/prefabs/TournamentRoomView";
    }
    onLoad() {
        super.onLoad();

    }

    start() {

    }

    show(args) {
        super.show(args);
        this.reqTournamentList();
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentList), this.onNetTournamentList);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentDetail), this.onNetTournamentDetailRes);
        this.registerEvent("UpdateTournamentList", this.reqTournamentList);
    }

    onClick(name, node) {
        switch (name) {
            case 'btnBack':
                // dispatch(LogicEvent.ENTER_HALL);
                this.close();
                break;
            case "createToutnamentBtn":
                Manager.uiManager.open({ type: CreateTournamentView, bundle: BUNDLE_RESOURCES });
                break;
            case "myTournamentBtn":
                Manager.uiManager.open({ type: MyTournamentView, bundle: BUNDLE_RESOURCES });
                break;
            case "searchTournamentBtn":
                let searchTournamentId = this.gameEditBox.string;
                if(searchTournamentId.length == 0){
                    this.reqTournamentList();
                    return;
                }
                let tournamentItemData = this.tournamentList.find(item => { return item.tournamentId == +searchTournamentId });
                if (tournamentItemData) {
                    this.getComponent(ScroViewCtrl).scroViewPlus.content.removeAllChildren();
                    this.tournamentListView([tournamentItemData]);
                }else{
                    PanelHelp.showTip(i18n.Tournament.NotTournament);
                }
                this.searchId = tournamentItemData ? tournamentItemData.tournamentId : null;
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    reqTournamentList() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TournamentList,
            null);
    }

    onNetTournamentList(data: com.bt.game.proto.hall.ITournamentListRes) {
        if (data.statusMsg.status == 0) {
            this.tournamentList = data.tournaments;
            this.tournamentListView(this.tournamentList);
            this.updateSelfTournament();
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }
        PanelHelp.hideLoading();
    }

    async tournamentListView(tournamentList: com.bt.game.proto.hall.ITournamentP[]) {
        if (this.searchId && TournamentData.getInstance().flushItmeID && this.searchId == TournamentData.getInstance().flushItmeID) {
            let index = tournamentList.findIndex(item => { return item.tournamentId == TournamentData.getInstance().flushItmeID });
            if (index != -1) tournamentList = tournamentList.splice(index, 1);
            TournamentData.getInstance().flushItmeID = null;
        }

        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = tournamentList
        await scroViewCtrlCom.framingLoad(tournamentList.length)
        PanelHelp.hideLoading()
    }

    updateSelfTournament() {
        //my tournament  找到自己报名的比赛
        let mytournament = this.tournamentList.find(t => { return t.signStatus == 1 });
        if (mytournament) {
            this.lb_myTournamentTip.string = "Rummy tournamenth created by " + mytournament.nickname;
            this.lb_myTournamentStep.string = mytournament.tournamentStatus == 0 ? "About to start" : "";
        } else {
            this.lb_myTournamentTip.string = "You are not participating in the tournament";
            this.lb_myTournamentStep.node.active = false;
        }

        //create tournament 找到自己创建的比赛
        let selfId = User._userID;
        let myCreateTournament = this.tournamentList.find(t => { return t.userId == selfId });
        if (myCreateTournament) {
            this.lb_createTournamentTip.string = "You created a Rummy tournament " + Config.games[myCreateTournament.gameId].disName;
        } else {
            this.lb_createTournamentTip.string = "You have not created a tournament";
        }

    }
    onNetTournamentDetailRes(data: com.bt.game.proto.hall.ITournamentDetailRes) {
        if (data.statusMsg.status == 0) {
            if (TournamentData.getInstance().tournamentStatus == 3) {
                Manager.uiManager.open({ type: TournamentEndDetailView, bundle: BUNDLE_RESOURCES, args: [data] });
            } else {
                Manager.uiManager.open({ type: TournamentDetailView, bundle: BUNDLE_RESOURCES, args: [data] });
            }
            TournamentData.getInstance().tournamentStatus = null;
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }
    }

    onDestroy() {
        super.onDestroy();
    }
}

