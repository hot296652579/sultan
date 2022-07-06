import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { Manager } from "../common/manager/Manager";
import { UtilMgr } from "../global/UtilMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RedPakgeReceiveItem extends ScroViewBaseItem {

   
    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    updateItem(data,itemId){
        super.updateItem(data,itemId)
        if (data) {
            this.nameLabel.string = Manager.getLanguage("REDPAKGE.receiveFrom")+UtilMgr.setString(data.nickname)
            this.amountLabel.string = "₹"+UtilMgr.changeMoney(data.receiveAmount)
            this.timeLabel.language = new Date(data.receiveTime).format("MM-dd hh:mm:ss");
        }
    }

    onClick(event, type){
        let buttonName = event.target.name;
        switch (buttonName) {
            case "shareBtn": this.onShare(); break;
            default: this.onShowInfo();
        }
    }

    private onShowInfo(){
        dispatch("showRedPakgeRecordDetail",this._data)
    }
    private onShare(){

    }
    // update (dt) {}
}
