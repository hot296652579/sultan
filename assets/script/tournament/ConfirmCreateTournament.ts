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
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import TournamentData from "./TournamentData";
import TournamentDetailView from "./TournamentDetailView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class ConfirmCreateTournament extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.Label)
    gameName: cc.Label = null;

    @property(cc.Label)
    password: cc.Label = null;

    @property(cc.Label)
    people: cc.Label = null;

    @property(cc.Label)
    bonusSource: cc.Label = null;

    @property(cc.Label)
    jackPot: cc.Label = null;

    @property(cc.Label)
    rewards: cc.Label[] = [];

    @property(cc.Node)
    confirmNode: cc.Node = null;

    @property(cc.Label)
    createGold: cc.Label = null;

    private data;
    public static getPrefabUrl() {
        return "tournament/prefabs/ConfirmCreateTournament";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

    }

    start() {
        this.updateView();
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.data = args[0];
        }
        console.log("create room info", this.data);
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CreateTournament), this.onNetCreateTournament);

    }

    onClick(name, node) {
        switch (name) {
            case "returnBtn":
            case "close": this.closeWithAction(); break;
            case "confirmBtn": this.reqCreateTournament(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    reqCreateTournament() {
        PanelHelp.showLoading(i18n.WAIT.LOGIN);
        let req = protoPackage.hall.CreateTournamentReq.create(this.data);
        let buffer = protoPackage.hall.CreateTournamentReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_CreateTournament,
            buffer);
    }

    private onNetCreateTournament(data: com.bt.game.proto.hall.ICreateTournamentRes) {
        if (data.statusMsg.status == 0) {
            this.closeWithAction();
            dispatch("close_createTournamentView")
            TournamentData.getInstance().flushItmeID = data.tournamentId;
            dispatch("UpdateTournamentList");
            this.reqTournamentDetail(data.tournamentId)
        } else {
            if(data.statusMsg.status == 251){
                PanelHelp.showMsgBox("", i18n.FRIENDROOM.ToRecharge, () => {
                    dispatch("openRechargeView");
                }, "btn_Recharge");
            }else{
                PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
            }
        }
        PanelHelp.hideLoading();
    }

    reqTournamentDetail(tournamentId) {
        let jsonData = {
            tournamentId: tournamentId,
        }
        let req = protoPackage.hall.TournamentDetailReq.create(jsonData);
        let buffer = protoPackage.hall.TournamentDetailReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TournamentDetail,
            buffer);

    }

    updateView() {
        this.gameName.string = Config.games[this.data.gameId].disName;
        this.password.string = this.data.password.length == 0 ? "No Password" : this.data.password;
        this.people.string = this.data.numberOfParticipants + "-people";
        this.bonusSource.string = this.data.bonusSource == 0 ? "Pay by myself" : "Pay by participant";
        if (this.data.bonusSource == 0) {
            this.jackPot.string = UtilMgr.changeMoney((this.data.createFee * (100 - TournamentData.getInstance().serviceFee) * 0.01), false);
        } else {
            this.jackPot.string = UtilMgr.changeMoney((this.data.joinFee * (100 - TournamentData.getInstance().serviceFee) * this.data.numberOfParticipants * 0.01), false);
        }
        this.createGold.string = UtilMgr.changeMoney(this.data.createFee);
        let rewards = this.data.rewardPercent.split(',');
        this.rewards.forEach((rewardLab, index) => {
            if (rewards[index]) {
                rewardLab.string = UtilMgr.changeMoney(+this.jackPot.string * rewards[index] * 0.01 * 10000,false);
            }
            rewardLab.node.parent.active = index < rewards.length;
        });
        this.createGold.node.parent.active = this.data.bonusSource == 0;
    }

    onDestroy() {
        super.onDestroy();
    }
}
