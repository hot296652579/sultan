import UIView from "../framework/ui/UIView";


const {ccclass, property} = cc._decorator;

@ccclass
export default class DisconnectWait extends UIView {

    @property(cc.Label)
    label: cc.Label = null;

    public static getPrefabUrl() {
        return "wait/prefabs/DisconnectWait";
    }

    onLoad () {
        super.onLoad(); 
        
    }
    show(args){
        if (args[0]) {
            this.label.language = args[0];
        }
        // if (this.args[1] &&  typeof this.args[1] == 'function') {
        //     let ctr = this.node.getComponent('BaseWaitPanelEnter'); 
        //     if( !!ctr){
        //         ctr.registerTimeoutCb(this.args[1]);
        //     } 
        // }
    }

    start () {
        // cc.tween(this.iconWait)
        // .repeatForever(cc.tween().by(0.1,{angle : 30})
        // .delay(0.01))
        // .start()
        
        // cc.tween(this.juhuaicon)
        // .repeatForever(cc.tween().to(0.3,{scaleX : 0})
        // .to(0.3,{scaleX : 1})
        // .delay(0.2))
        // .start()

    }

    // update (dt) {}
}
