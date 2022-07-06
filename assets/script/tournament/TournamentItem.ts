import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { injectService } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import TournamentData from "./TournamentData";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class TournamentItem extends UIView {
    service: LobbyService;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Label)
    creatorName: cc.Label = null;

    @property(cc.Label)
    onlinePeople: cc.Label = null;

    @property(cc.Label)
    championReward: cc.Label = null;

    @property(cc.Node)
    needPassWordNode: cc.Node = null;

    @property(cc.Node)
    detailNode: cc.Node = null;

    @property(cc.Node)
    signUpNode: cc.Node = null;

    @property(cc.Label)
    startTime: cc.Label = null;

    @property(cc.Node)
    startTimeNode: cc.Node = null;

    @property(cc.Sprite)
    tournamentType: cc.Sprite = null;

    @property(cc.SpriteFrame)
    tSprte: cc.SpriteFrame[] = [];

    public _data: com.bt.game.proto.hall.ITournamentP = null;
    onLoad() {
        this.signUpNode.active = false;
        this.detailNode.active = false;
    }

    updateItem(data: com.bt.game.proto.hall.ITournamentP) {
        this._data = data;
        this.creatorName.string = UtilMgr.setString(data.nickname);
        this.onlinePeople.string = data.signNum + "/" + data.totalNum;
        this.championReward.string = UtilMgr.changeMoney(data.championReward);
        UtilMgr.loadHeadImg(this.head, this._data.headImg, data.userId + "", this);
        this.needPassWordNode.active = !!this._data.enterPassword;
        this.startTime.string = new Date(+this._data.startTime).format("yyyy-MM-dd hh:mm:ss");
        if (data.userId == 0) {//创房ID = 0 官方赛
            data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
            this.tournamentType.spriteFrame = this.tSprte[1];
            this.startTimeNode.active= true;
        } else {//自建赛 
            if (data.userId == User._userID) {//我创建的
                this.detailNode.active = true;
                this.tournamentType.spriteFrame = this.tSprte[0];
            } else {//别人创建的
                data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
                this.tournamentType.spriteFrame = null;
            }
            this.startTimeNode.active= false;
        }

    }


    onClick(event) {
        let name = event.target.name;
        Manager.globalAudio.playEffect("common/audio/click", BUNDLE_RESOURCES);
        switch (name) {
            case "detailBtn":
            case "signupBtn":
                TournamentData.getInstance().signStatus = this._data.signStatus;
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
    /**
       * 本Item进入ScrollView的时候回调
       */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }

    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }

}
