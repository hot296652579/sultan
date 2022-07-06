import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { com } from "../framework/external/protoc";
import { UtilMgr } from "../global/UtilMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SignUpPlayerItem extends ScroViewBaseItem {

    @property(cc.Label)
    id: cc.Label = null;

    @property(cc.Label)
    nickname: cc.Label = null;

    @property(cc.Label)
    signUpTime: cc.Label = null;

    @property(cc.Label)
    signUpFee: cc.Label = null;

    onLoad() {

    }

    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        let userData: com.bt.game.proto.hall.ITournamentSignUpUser = data;
        this.id.string = userData.userId + "";
        this.nickname.string = UtilMgr.setString(userData.nickname);
        this.signUpTime.string = new Date(+userData.signUpTime).format("yyyy-MM-dd hh:mm:ss")
        this.signUpFee.string = UtilMgr.changeMoney(userData.signUpFee);
    }

}
