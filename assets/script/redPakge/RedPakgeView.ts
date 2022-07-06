import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RedPakgeView extends UIView {

    @property(cc.Node)
    sendNode: cc.Node = null
    @property(cc.Node)
    recordsNode: cc.Node = null
    @property(cc.Node)
    receiveNode: cc.Node = null

    @property(cc.Node)
    recordsDetailNode: cc.Node = null

    public static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.sendNode.active = false
        this.recordsNode.active = false
        this.receiveNode.active = false
    }

    bindingEvents() {
        super.bindingEvents();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }

    start() {
        this.showSend()
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "send": this.showSend(); break;
            case "records": this.showRecords(); break;
            case "receive": this.showReceive(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    private showSend(){
        this.sendNode.active = true
        this.recordsNode.active = false
        this.receiveNode.active = false
        this.recordsDetailNode.active = false
    }
    private showRecords(){
        this.sendNode.active = false
        this.recordsNode.active = true
        this.receiveNode.active = false
        this.recordsDetailNode.active = false
    }
    private showReceive(){
        this.sendNode.active = false
        this.recordsNode.active = false
        this.receiveNode.active = true
        this.recordsDetailNode.active = false
    }
    update (dt) {
        // G.Logger.log(this.node.width,this.content.width)
    }
}
