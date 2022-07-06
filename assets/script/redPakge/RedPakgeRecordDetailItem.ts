import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { Manager } from "../common/manager/Manager";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import RedPakgeRecordDetail from "./RedPakgeRecordDetail";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RedPakgeRecordDetailItem extends ScroViewBaseItem {

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Label)
    userIdLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    stateLabel: cc.Label = null;

    @property(cc.Node)
    newTipNode: cc.Node = null;

    @property(UIView)
    view: UIView = null;

    updateItem(data, itemId) {
        super.updateItem(data, itemId)
        if (data) {
            UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this.view)
            this.userIdLabel.string = "ID:" + data.userId;
            this.nameLabel.string = UtilMgr.setString(data.nickname);
            this.amountLabel.string = "₹"+UtilMgr.changeMoney(data.receiveAmount);
            this.stateLabel.language = new Date(data.receiveTime).format("MM-dd hh:mm:ss");
            this.newTipNode.active = data.new == 1 ? true : false;
        }
    }
    // update (dt) {}
}
