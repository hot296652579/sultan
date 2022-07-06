import { Config } from "../common/config/Config";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecordItem extends UIView {
    @property(cc.Label)
    rankLabel: cc.Label = null;

    @property(cc.Node)
    icon1: cc.Node = null;

    @property(cc.Node)
    icon2: cc.Node = null;

    @property(cc.Node)
    icon3: cc.Node = null;

    @property(cc.Label)
    periodLabel: cc.Label = null;

    @property(cc.Label)
    winningChipLabel: cc.Label = null;

    @property(cc.Label)
    operateLabel: cc.Label = null;

    onLoad() {
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.rankLabel.string = "";
    }

    updateItem(data) {
        if (data.rank == 1) {
            this.icon1.active = true;
        } else if (data.rank == 2) {
            this.icon2.active = true;
        } else if (data.rank == 3) {
            this.icon3.active = true;
        } else {
            this.icon1.active = false;
            this.icon2.active = false;
            this.icon3.active = false;
            this.rankLabel.string = data.rank;
        }
        this.periodLabel.string = new Date(data.period).format("yy/MM/dd");
        this.winningChipLabel.string = UtilMgr.changeMoney(data.winningChips);
        this.operateLabel.string = UtilMgr.changeMoney(data.reward);
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
