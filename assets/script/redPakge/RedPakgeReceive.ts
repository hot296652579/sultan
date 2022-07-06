import ScroViewLogic from "../common/component/ScroViewLogic";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import RedPakgeRecordDetail from "./RedPakgeRecordDetail";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RedPakgeReceive extends UIView {

    @property(cc.Node)
    noTipNode: cc.Node = null;
    @property(cc.Node)
    listNode: cc.Node = null;

    @property(ScroViewLogic)
    scroViewLogic: ScroViewLogic = null;

    service: LobbyService;
    onLoad() {
        super.onLoad();
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_RedPacketReceiveRecord), this.refreshList);
        
    }
    onEnable() {
        this.initUI()
        let req = protoPackage.hall.RedPacketSendRecordReq.create({currentPage:1});
        let buffer = protoPackage.hall.RedPacketSendRecordReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_RedPacketReceiveRecord,
            buffer);
    }
    private initUI(){
        this.listNode.active = false
        this.noTipNode.active = true

    }
    private refreshList(msg) {
        // G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacketReceiveRecord && msg.redPacketReceiveRecord.length > 0) {
                this.listNode.active = true
                this.noTipNode.active = false
                this.scroViewLogic.initUI(msg.redPacketReceiveRecord)
            }
        }

    }
    // update (dt) {}
}
