import ScroViewLogic from "../common/component/ScroViewLogic";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RedPakgeRecordDetail extends UIView {



    @property(ScroViewLogic)
    scroViewLogic: ScroViewLogic = null;

    @property(cc.RichText)
    numRichText: cc.RichText = null;

    @property(cc.RichText)
    amountRichText: cc.RichText = null;

    @property(cc.Node)
    noTipNode: cc.Node = null;

    @property(cc.Node)
    recordsNode: cc.Node = null;

    @property(cc.Node)
    closeBtn: cc.Node = null;

    service: LobbyService;
    data: any = null;

    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_RedPacketDetails), this.refreshList);

    }
    onEnable() {
        let req = protoPackage.hall.RedPacketDetailsReq.create({ id: this.data.id, currentPage: 1 });
        let buffer = protoPackage.hall.RedPacketDetailsReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_RedPacketDetails,
            buffer);

        this.recordsNode.active = false;
        this.closeBtn.active = false;
    }
    onDisable(){
        this.closeBtn.active = true;
    }
    init(data) {
        this.data = data
    }
    private refreshList(msg) {
        // G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacket) {
                this.numRichText.string = "<color=#cc0202>" + msg.redPacket.receivedNumber + "</c><color=#805326>/" + msg.redPacket.number + "</color>"
                this.amountRichText.string = "<color=#cc0202>" + "₹" + UtilMgr.changeMoney(msg.redPacket.receivedAmount) + "</c><color=#805326>/" + "₹" + UtilMgr.changeMoney(msg.redPacket.totalAmount) + "</color>"
                
                this.scroViewLogic.resetData();
                if (msg.redPacketReceiveRecord.length > 0) {
                    this.noTipNode.active = false
                    this.scroViewLogic.initUI(msg.redPacketReceiveRecord)
                }else{
                    this.noTipNode.active = true
                }
              
            } else {
                this.noTipNode.active = true
            }

        }

    }

    onClick(name) {
        switch (name) {
            case "detailClose":
                this.node.active = false;
                this.recordsNode.active = true; 
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    // update (dt) {}
}
