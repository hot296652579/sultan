import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { Manager } from "../common/manager/Manager";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { UtilMgr } from "../global/UtilMgr";
import RedPakgeShareView from "./RedPakgeShareView";


const {ccclass, property} = cc._decorator;

@ccclass
export default class RedPakgeRecordItem extends ScroViewBaseItem {

    @property(cc.Label)
    typeLabel: cc.Label = null;

    @property(cc.Label)
    codeLabel: cc.Label = null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Label)
    stateLabel: cc.Label = null;

    @property(cc.Button)
    shareBtn: cc.Button = null;

    updateItem(data,itemId){
        super.updateItem(data,itemId)
        if (data) {
            this.typeLabel.language = data.type == 1 ? Manager.makeLanguage("REDPAKGE.recordAverageType") : Manager.makeLanguage("REDPAKGE.recordRandomType")
            this.codeLabel.string = data.receiveCode
            this.amountLabel.string = "₹"+UtilMgr.changeMoney(data.totalAmount) 
            this.numLabel.string = data.receivedNumber+"/"+data.number

            if (new Date().getTime() > data.expireTime) {//过期
                this.shareBtn.node.active = false
                this.stateLabel.language = Manager.makeLanguage("REDPAKGE.Expired");
                this.codeLabel.string = ""
            }else{
                this.shareBtn.node.active = true
                this.stateLabel.language = Manager.makeLanguage(["REDPAKGE.ValidUntil",new Date(data.expireTime).format("MM-dd hh:mm")]);
                if (data.receiveCode.length > 0) {
                    this.codeLabel.string = "("+data.receiveCode+")"
                }
            }
            
        }
    }

    onClick(event, type){
        Manager.globalAudio.playEffect("common/audio/click", BUNDLE_RESOURCES);
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
        Manager.uiManager.open({type:RedPakgeShareView,bundle: BUNDLE_RESOURCES,args:[this._data.shareUrl]})
    }
    // update (dt) {}
}
