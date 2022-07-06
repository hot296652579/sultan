import { Config } from "../common/config/Config";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItem extends UIView {
    @property(cc.Label)
    index: cc.Label = null;

    @property(cc.Label)
    uname: cc.Label = null;

    @property(cc.Label)
    userId: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Node)
    icon1: cc.Node = null;

    @property(cc.Node)
    icon2: cc.Node = null;

    @property(cc.Node)
    icon3: cc.Node = null;

    onLoad() {
        this.node.opacity = 0;
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.index.string = "";
    }

    updateItem(data, itemId) {
        if (data.id == 1) {
            this.icon1.active = true;
        } else if (data.id == 2) {
            this.icon2.active = true;
        } else if (data.id == 3) {
            this.icon3.active = true;
        } else {
            this.icon1.active = false;
            this.icon2.active = false;
            this.icon3.active = false;
            this.index.string = data.id;
        }

        this.uname.string = UtilMgr.setString(data.nickName);
        this.userId.string = data.userId;
        this.gold.string = UtilMgr.changeMoney(data.gold);
        UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this)
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

    // update (dt) {}
}
