import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import { Manager } from "../common/manager/Manager";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { com } from "../framework/external/protoc";
import AddressView from "./AddressView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrizeRecordItem extends ScroViewBaseItem {



    @property(cc.Label)
    time: cc.Label = null;

    @property(cc.Label)
    prize: cc.Label = null;

    @property(cc.Label)
    status: cc.Label = null;

    @property(cc.Node)
    btn_address: cc.Node = null;

    private turntableRecord: com.bt.game.proto.hall.ITurntableRecord;
    updateItem(data, itemId) {
        this.time.string = new Date(data.time).format("yy/MM/dd");
        this.prize.string = data.prize;
        let status = '';
        this.btn_address.active = false;
        this.turntableRecord = data;
        switch (data.status) {//奖品状态(0=未中奖,1=未领取（not receive）,2=待发放（Waiting to Receive）,3=已领取)
            case 0:
                status = "-";
                break;
            case 1:
                status = "Not Receive";
                this.btn_address.active = true;
                break;
            case 2:
                status = "Waiting to Receive";
                break;
            case 3:
                status = "Received";
                break;
            default:
                break;
        }
        this.status.string = status;
    }
    onClick(event) {
        let buttonName = event.target.name;
        Manager.globalAudio.playEffect("common/audio/click", BUNDLE_RESOURCES);
        switch (buttonName) {
            case "btn_address": Manager.uiManager.open({ type: AddressView, bundle: BUNDLE_RESOURCES, args: [this.turntableRecord.id] }); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }

    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }

}
