import UIView from "../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LabelTip extends UIView {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Sprite)
    private imgBg: cc.Sprite = null;

    @property(cc.Label)
    label: cc.Label = null;

    delayTime: number = 0.5;
    private bgOriginSize: cc.Size = null;

    public static getPrefabUrl() {
        return "msgbox/prefabs/LabelTip";
    }

    onLoad() {
        super.onLoad();

        this.bgOriginSize = this.imgBg.node.getContentSize();
    }
    show(args) {
        super.show(args)
        // this.showTip(this.args[0]);
        if (this.args[0]) {
            this.label.language = this.args[0];
            (this.label as any)._forceUpdateRenderData();
            this.delayTime = this.args[1] ? this.args[1] : 0.5;
            this.doOpenAction();
        }

        if (this.label.node.width > this.bgOriginSize.width) {
            this.imgBg.node.width = this.label.node.width + 40;
        }
        this.imgBg.node.height = this.label.node.height + 40

    }
    doOpenAction() {
        this.node.stopAllActions();
        this.node.opacity = 255;
        let t = cc.tween;
        t(this.node)
            .delay(this.delayTime)
            .parallel(
                t().by(0.5, { position: cc.v2(0, 100) }),
                t().to(0.5, { opacity: 0 })
            )
            .call(() => {
                this.close();
            })
            .start()


    }
    onDestroy() {
        super.onDestroy();
    }
    // update (dt) {}
}
