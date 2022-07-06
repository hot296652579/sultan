import ScroViewLogic from "../common/component/ScroViewLogic";
import { i18n } from "../common/language/LanguageImpl";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class MyTournamentView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.Node)
    myTournament:cc.Node = null;

    @property(cc.Node)
    myCreation:cc.Node = null;

    public static getPrefabUrl() {
        return "tournament/prefabs/MyTournamentView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }

    start() {
     
    }

    show(args) {
        super.show(args);
        this.showWithAction(true,()=>{
            this.reqMyTournament();
        });
   
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_MyTournament), this.onNetMyTournament);
    }

    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "myTournament":
                this.myTournament.color = new cc.Color().fromHEX('#FFFFFF');
                this.myCreation.color = new cc.Color().fromHEX('#AE9F96');
                this.reqMyTournament();
                break;
            case "myCreation":
                this.myTournament.color = new cc.Color().fromHEX('#AE9F96');
                this.myCreation.color = new cc.Color().fromHEX('#FFFFFF');
                this.reqMyTournament(1);
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    reqMyTournament(tournamentType = 0) {
        let jsonData = {
            type: tournamentType,
        }
        let req = protoPackage.hall.MyTournamentReq.create(jsonData);
        let buffer = protoPackage.hall.MyTournamentReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_MyTournament,
            buffer);

    }
    onNetMyTournament(data: com.bt.game.proto.hall.ITournamentListRes) {
        if (data.statusMsg.status == 0) {
            this.getComponent(ScroViewLogic).initUI(data.tournaments);
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }

    }
    onDestroy() {
        super.onDestroy();
    }
}
