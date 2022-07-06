
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class HelpView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.RichText)
    str_rule: cc.RichText = null;

    rule: string;
    public static getPrefabUrl() {
        return "turntable/prefab/HelpView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

    }

    start() {
        if (this.rule) {
            this.str_rule.string = this.rule;
        }

    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.rule = args[0];
        }
    }


    bindingEvents() {
        super.bindingEvents();

    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    onDestroy() {
        super.onDestroy();
    }
}
