import { AreaCodeConfig } from "./AreaCodeConfig";
import ScroViewLogic from "./ScroViewLogic";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AreaCodeList extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;


    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            // this.node.destroy();
            this.hide();
        }, this)
    }
    show() {
        this.node.active = true;
    }
    hide() {
        this.node.active = false;
    }

    start() {
        if (AreaCodeConfig.Config) {
            this.getComponent(ScroViewLogic).initUI(AreaCodeConfig.Config)
        }
    }

    // update (dt) {}
}
