import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { com } from "../framework/external/protoc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrizeItem extends cc.Component {


    @property(cc.Sprite)
    image: cc.Sprite = null;

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Label)
    nickName: cc.Label = null;

    private color = ["#6c038e","#2c0d83","#2c0d83","#074f77","#005d73","#465e02","#886200","#722102","#600309","#8e104b",];
    onLoad() {

    }

    updateItem(data: com.bt.game.proto.hall.IActivityTurntable) {
        this.node.angle = (data.tableId - 1) * 0.1 * 360;
        this.image.loadRemoteImage({ url: data.picUrl, view: this, defaultSpriteFrame: "turntable/image/10", bundle: BUNDLE_RESOURCES })
        this.count.string = data.rewardNum.toString();
        this.nickName.string = data.goodsName;
        this.nickName.node.getComponent(cc.LabelOutline).color = new cc.Color().fromHEX(this.color[data.tableId - 1]);
    }
}
