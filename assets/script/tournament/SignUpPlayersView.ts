import ScroViewLogic from "../common/component/ScroViewLogic";
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class SignUpPlayersView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    private data: com.bt.game.proto.hall.ITournamentSignUpUser[];
    public static getPrefabUrl() {
        return "tournament/prefabs/SignUpPlayersView";
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
        console.log("SignUpPlayers", this.data);
    }


    bindingEvents() {
        super.bindingEvents();
     
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    updateView() {
        this.getComponent(ScroViewLogic).initUI(this.data);
    }
   
    onDestroy() {
        super.onDestroy();
    }
}
