import UIView from "../../framework/ui/UIView";


const {ccclass, property} = cc._decorator;

@ccclass
export default class AreaCode extends UIView{

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Node)
    parentNode: cc.Node = null;

    @property(cc.Prefab)
    ListPrefab: cc.Prefab = null;



    onLoad () {
        super.onLoad()
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("AreaCodeInfo", (data)=>{
            if (data) {
                this.label.string = data.Code
            }
           
        });
    }
    start () {

    }

    onTouchEnd(){
        if (this.ListPrefab) {
            let prefab =  cc.instantiate(this.ListPrefab)
            prefab.parent = this.parentNode
        }
    }

    // update (dt) {}
}
