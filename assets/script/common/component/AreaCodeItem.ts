import { Manager } from "../manager/Manager";
import ScroViewBaseItem from "./ScroViewBaseItem";


const {ccclass, property} = cc._decorator;

@ccclass
export default class AreaCodeItem extends ScroViewBaseItem {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    codeLabel: cc.Label = null;


    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
            dispatch('AreaCodeInfo',this._data)
        },this)
    }

    updateItem (data,itemId) {
        super.updateItem(data,itemId);
        this.nameLabel.string = data.En
        if (Manager.language.getLanguage() == cc.sys.LANGUAGE_CHINESE) {
            this.nameLabel.string = data.Zh
        }
       
        this.codeLabel.string = data.Code
    }

    // update (dt) {}
}
