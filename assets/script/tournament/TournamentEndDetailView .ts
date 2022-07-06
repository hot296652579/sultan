import ScroViewLogic from "../common/component/ScroViewLogic";
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
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import SignUpPlayersView from "./SignUpPlayersView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class TournamentEndDetailView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Label)
    creatorName: cc.Label = null;

    @property(cc.Label)
    game: cc.Label = null;

    @property(cc.Label)
    pPeople: cc.Label = null;

    @property(cc.Label)
    jackpot: cc.Label = null;

    @property(cc.Label)
    bonusSource: cc.Label = null;

    private data: com.bt.game.proto.hall.ITournamentDetailRes
    public static getPrefabUrl() {
        return "tournament/prefabs/TournamentEndDetailView";
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
        console.log("TournamentEndDetailView", this.data);
    }

    bindingEvents() {
        super.bindingEvents();
    }

    updateView() {
        UtilMgr.loadHeadImg(this.head, this.data.headImg, this.data.userId + "", this);
        this.creatorName.string = UtilMgr.setString(this.data.nickname);
        this.game.string = Config.games[this.data.gameId].disName;
        this.pPeople.string = this.data.numberOfParticipants + "-people";
        let jackpotArr =  this.data.reward.split(",");
        let jackpotNum = 0;
        jackpotArr.forEach(data=>{
            jackpotNum += +data;
        });
        this.jackpot.string = UtilMgr.changeMoney(jackpotNum);
        this.bonusSource.string = this.data.bonusSource == 0 ? "Pay by myself" : "Pay by participant";
        this.getComponent(ScroViewLogic).initUI(this.data.tournamentSignUpUser);
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    onDestroy() {
        super.onDestroy();
    }
}
