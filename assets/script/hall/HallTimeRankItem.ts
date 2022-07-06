import { Config } from "../common/config/Config";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallTimeRankItem extends UIView {
    @property(cc.Label)
    index: cc.Label = null;


    @property(cc.Label)
    uname: cc.Label = null;

    @property(cc.Label)
    userId: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Node)
    imgAvatar: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.node.opacity = 0;
        this.index.string = "";

        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            dispatch('openRankInfo', [])
        });
    }

    updateItem(data, itemId) {
        this.index.string = itemId + 3
        this.uname.string = UtilMgr.setString(data.Nick);
        this.userId.string = data.AccountId;
        this.gold.string = `Rp ${data.Score}`;

        let imgAvatar = this.imgAvatar.getComponent(cc.Sprite);
        if (data.headImgUrl)
            UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this)
    }

    onClick(event) {
        console.log(event)
    }

    // update (dt) {}
}
