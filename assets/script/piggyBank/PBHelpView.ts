import { LobbyService } from "../common/net/LobbyService";
import { injectService } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class PBHelpView extends UIView {

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PBHelpView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }

    start() {

    }

    show(): void {
        this.showWithAction(true);
        super.show();
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }

}
