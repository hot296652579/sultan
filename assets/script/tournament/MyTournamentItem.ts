import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { injectService } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { UtilMgr } from "../global/UtilMgr";
import TournamentData from "./TournamentData";
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class MyTournamentItem extends ScroViewBaseItem {
    service: LobbyService;
    @property(cc.Label)
    creator: cc.Label = null;

    @property(cc.Label)
    people: cc.Label = null;

    @property(cc.Label)
    mode: cc.Label = null;

    @property(cc.Label)
    signUpFee: cc.Label = null;

    @property(cc.Label)
    championReward: cc.Label = null;

    @property(cc.Label)
    time: cc.Label = null;

    @property(cc.Label)
    startState: cc.Label = null;

    @property(cc.Node)
    detailNode: cc.Node = null;

    onLoad() {

    }

    updateItem(data: com.bt.game.proto.hall.ITournamentP, itemId) {
        super.updateItem(data, itemId);
        this.creator.string = UtilMgr.setString(data.nickname);
        this.people.string = data.totalNum + "";
        this.mode.string = data.type == 0 ? "SNG" : "MTT";
        this.signUpFee.string = UtilMgr.changeMoney(data.signUpFee);
        this.championReward.string = UtilMgr.changeMoney(data.championReward);
        switch (data.tournamentStatus) {//比赛状态  0比赛可报名 1报名结束等待游戏开始 2游戏已开始 3游戏已结束 4游戏已取消 5流局
            case 0:
            case 1:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = i18n.Tournament.MyTournamentTip1;
                this.startState.node.color = new cc.Color().fromHEX('#01e922');
                this.detailNode.active = true;
                this.detailNode.getChildByName("huang").active = false;
                break;
            case 2:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = i18n.Tournament.MyTournamentTip2;
                this.startState.node.color = new cc.Color().fromHEX('#c13958');
                this.detailNode.active = false;
                break;
            case 3:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = i18n.Tournament.MyTournamentTip3;
                this.startState.node.color = new cc.Color().fromHEX('#ff000c');
                this.detailNode.active = true;
                this.detailNode.getChildByName("huang").active = true;
                break;
            case 4:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = i18n.Tournament.MyTournamentTip4;
                this.startState.node.color = new cc.Color().fromHEX('#ff000c');
                this.detailNode.active = false;
                break;
            case 5:
                this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
                this.startState.string = i18n.Tournament.MyTournamentTip5;
                this.startState.node.color = new cc.Color().fromHEX('#ff000c');
                this.detailNode.active = false;
                break;
            default:
                break;
        }

        if (data.giveUp) {
            this.time.string = data.type == 1 ? new Date(+data.startTime).format("yyyy-MM-dd hh:mm:ss") : Manager.getLanguage(["Tournament.MyTournamentPeople", data.totalNum]);
            this.startState.string = i18n.Tournament.MyTournamentTip6;
            this.startState.node.color = new cc.Color().fromHEX('#bb9fa6');
            this.detailNode.active = false;
        }

    }


    onClick(event) {
        let name = event.target.name;
        Manager.globalAudio.playEffect("common/audio/click", BUNDLE_RESOURCES);
        switch (name) {
            case "detailBtn":
                TournamentData.getInstance().tournamentStatus = this._data.tournamentStatus;
                this.reqTournamentDetail();
                break;
            default:
                break;
        }
    }

    reqTournamentDetail() {
        let jsonData = {
            tournamentId: this._data.tournamentId,
        }
        let req = protoPackage.hall.TournamentDetailReq.create(jsonData);
        let buffer = protoPackage.hall.TournamentDetailReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TournamentDetail,
            buffer);

    }

}
