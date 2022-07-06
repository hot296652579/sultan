import { util } from "protobufjs";
import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { LobbyService } from "../common/net/LobbyService";
import { injectService } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { UtilMgr } from "../global/UtilMgr";
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class TournamentEndItem extends ScroViewBaseItem {
    service: LobbyService;
    @property(cc.Label)
    rank: cc.Label = null;

    @property(cc.Label)
    userid: cc.Label = null;

    @property(cc.Label)
    nickname: cc.Label = null;

    @property(cc.Label)
    bonus: cc.Label = null;

    onLoad() {

    }

    updateItem(data: com.bt.game.proto.hall.ITournamentSignUpUser, itemId) {
        super.updateItem(data, itemId);
        this.rank.string = data.rank.toString();
        this.userid.string = data.userId.toString();
        this.nickname.string = UtilMgr.setString(data.nickname);
        this.bonus.string = UtilMgr.changeMoney(data.bonus);

    }
}
