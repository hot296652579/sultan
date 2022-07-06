import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";
import TournamentData from "./TournamentData";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class NoticeTournamentView extends UIView implements IController<LobbyService> {

    @property(cc.RichText)
    noticeText: cc.RichText = null;

    @property(cc.Node)
    joinNode: cc.Node = null;

    service: LobbyService;

    private data: com.bt.game.proto.hall.INoticeTournamentStart;
    timeInterval: any;
    public static getPrefabUrl() {
        return "tournament/prefabs/NoticeTournamentView";
    }
    onLoad() {
        super.onLoad();

    }

    start() {
        this.joinNode.active = Manager.uiManager.isInHall() && !Manager.uiManager.isInGame();
        this.updateView();
    }

    show(args) {
        super.show(args);
        if (args && args[0]) {
            this.data = args[0];
        }
    }


    bindingEvents() {
        super.bindingEvents();

    }

    onClick(name, node) {
        switch (name) {
            case "joinBtn":
                if (this.timeInterval) {
                    clearInterval(this.timeInterval)
                    this.timeInterval = null;
                }
                this.close();
                PanelHelp.showLoading(i18n.Waiting.EnterGame)
                TournamentData.getInstance().isTournamentGame = true;
                TournamentData.getInstance().tournamentID = this.data.tournamentId;
                TournamentData.getInstance().toServerId = this.data.serverId;
                TournamentData.getInstance().serverType = this.data.serverType;
                dispatch("JoinTournament", { serviceType: this.data.serverType, toServerId: this.data.serverId });
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    updateView() {
        let t = this.data.gameStartCountDown;
        TournamentData.getInstance().isCountDownDate = new  Date().getTime() + t * 1000;
        this.noticeText.string = Manager.getLanguage(["Tournament.NoticeTournamentText", t]);
        this.timeInterval = setInterval(() => {
            t--;
            this.noticeText.string = Manager.getLanguage(["Tournament.NoticeTournamentText", t]);
            if (t <= 0) {
                clearInterval(this.timeInterval)
                this.close();
            }
        }, 1000);
    }

    onDestroy() {
        super.onDestroy();
        if (this.timeInterval) {
            clearInterval(this.timeInterval)
            this.timeInterval = null;
        }
    }
}
