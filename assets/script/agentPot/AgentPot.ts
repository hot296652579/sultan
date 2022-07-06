import EventComponent from "../framework/base/EventComponent";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import { i18n } from "../common/language/LanguageImpl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AgentPot extends UIView {


    @property(cc.Node)
    showNode: cc.Node = null;


    @property(cc.Label)
    Label: cc.Label = null;

    private m_isLoaded: boolean = false;
    private m_value: number = null;


    onLoad() {
        super.onLoad();
        this.m_isLoaded = true;
        this.showNode.active = false;
        this.node.parent.active = true;

        this.change(this.m_value);
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("agentpot.change", this.change);
    }

    change(data) {
        if (data !== undefined && data !== null && data != -1) {
            this.showNode.active = true;
            this.Label.string = UtilMgr.changeMoney(data);
        } else {
            this.showNode.active = false;
        }
    }
    show(args) {
        super.show(args)
    }

    setData(value: number): void {
        this.m_value = value;
        if (this.m_isLoaded) {
            this.change(value);
        }
    }

    start() {
        if (this.showNode) {
            // this.showNode.getChildByName("labAgentPot").getComponent(cc.Label).language = i18n.AGENT.AGENTPOT;
        }
    }


    // update (dt) {}
}

