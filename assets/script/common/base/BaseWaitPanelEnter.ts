import PanelHelp from "../../msgbox/PanelHelp";
import { Manager } from "../manager/Manager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseWaitPanelEnter extends cc.Component {

    private timeoutCb: any;
   
    onLoad () {
        // this.timeoutAction(); 
    }
    /**处理超时回调 */
    timeoutAction(){
       
        cc.tween(this.node)
        .delay(5)
        .call(()=>{
            if( null != this.timeoutCb ){
                this.timeoutCb();
            }else{
                PanelHelp.showTip(Manager.makeLanguage(`TIPS.NETWAITTIMEOUT`));
            }
            let waitPanelName = this.node.name;
            // ryyl.waitPanel.closeWaitByKey(waitPanelName);
            Manager.uiManager.close(waitPanelName);
            
            this.node.destroy(); 
            cc.warn('等待超时处理');
        })
        .start()
      
        
        
    }
    registerTimeoutCb( _cb ){
        this.timeoutCb = _cb;
    }

    // update (dt) {}
}
