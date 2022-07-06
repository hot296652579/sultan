import { Manager } from "../common/manager/Manager";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";



const { ccclass, property } = cc._decorator;
@ccclass
@injectService(LobbyService.instance)
export default class RuleView extends UIView{
    service: LobbyService;

    @property(cc.Node)
    layout: cc.Node = null;

    @property(cc.Node)
    item: cc.Node = null;

    public static getPrefabUrl() {
        return "rank/prefabs/RuleView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content'); 
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingRule), this.updateRuleView);
    }
  
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;

            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    updateRuleView(data){
        G.Logger.log("规则",data);
        this.layout.children.splice(1);
        if (data.statusMsg.status == 0) {
            if(data.reward.length){
                for (let index = 0; index < data.reward.length; index++) {
                    const element = data.reward[index];
                    let item = cc.instantiate(this.item);
                    item.parent = this.layout;
                    item.active = true;
                    item.x = 0;
                    item.getChildByName('rankLab').getComponent(cc.Label).string = element.rank;
                    item.getChildByName('rewardLab').getComponent(cc.Label).string = UtilMgr.changeMoney(element.reward);
                }
            }
            this.layout.active = data.reward.length
        } else {
            PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    
    start() {
        this.layout.active = false;
          this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_NewRankingRule,
            null);
    }
}
