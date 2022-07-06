import UIView from "../../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideExitView extends UIView {

    // 引导退出回调接口
    private m_callbackInterface: GuideExitOptionInterface = null;

    onLoad() {
        super.onLoad();
        
        this.content = this.node.getChildByName('imgBg');
    }

    start() {

    }

    public static getPrefabUrl() {
        return "common/prefabs/GuideExitView";

    }

    show(args) {
        super.show(args);

        // this.showWithAction(true);

        this.m_callbackInterface = args[0];
    }

    private onClickYes(): void {
        if (this.m_callbackInterface.yesCallback) {
            this.m_callbackInterface.yesCallback();
        }
        // this.closeWithAction();
        this.close()
    }

    private onClickNo(): void {
        if (this.m_callbackInterface.noCallback) {
            this.m_callbackInterface.noCallback();
        }
        // this.closeWithAction();
        this.close()
    }

    onClick(name: string): void {
        switch (name) {
            case "btnYes":
                this.onClickYes();
                break;
            case "btnNo":
                this.onClickNo();
                break;
        }
    }

    // update (dt) {}
}
