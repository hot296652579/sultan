import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { protoPackage, serverType } from "../common/net/CommonService";
import { injectService } from "../framework/decorator/Decorators";
import { LobbyService } from "../common/net/LobbyService";
import RoomListView from "./RoomListView";
import { com } from "../framework/external/protoc";
import { Config } from "../common/config/Config";
import RoomTexaCowTableItem from "./RoomTexaCowTableItem";
import RoomFruitPartyItem from "./RoomFruitPartyItem";
import RoomRedVsBlackItem from "./RoomRedVsBlackItem";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RoomListGuide extends UIView {
    service: LobbyService;

    room: cc.Node;
    step: number;
    roomListView: RoomListView;

    private m_data: com.bt.game.proto.hall.IGetRoomListRes = null;

    public static getPrefabUrl() {
        return "roomlist/prefabs/RoomListGuide";
    }

    onLoad() {
        super.onLoad()
        this.room = this.node.getChildByName("room")
        this.room.active = false
    }
    show(args) {
        super.show(args);
        if (args[0] && cc.js.getClassName(args[0]) == "RoomListView") {
            this.roomListView = args[0]
            this.step = 0
            this.setStep()
        }
        this.m_data = args[1];
      
    }
    start() {

    }

    private setStep() {
        this.step++
        let wp
        switch (this.step) {
            case 1:
                this.room.active = true
                if (this.roomListView.scvRoomList.content.children.length> 0) {
                    wp = this.roomListView.scvRoomList.content.children[0].convertToWorldSpaceAR(cc.v2(0, 0))
                }
                this.room.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                this.room.getChildByName("mask").setPosition(this.node.convertToNodeSpaceAR(wp));
                this.room.getChildByName("mask").setContentSize(cc.size(354, 372))
                this.room.getChildByName("jiantou").active = true
                this.room.getChildByName("jiantou").x = this.room.getChildByName("mask").x
                this.room.getChildByName("jiantou").y = this.room.getChildByName("mask").y + this.room.getChildByName("mask").height / 2 + 50
                
            break;
            case 2:
                this.toGame();
                this.reqGuide()
                this.close()
            break;
            default:
                break;
        }

    }
    onClick(name, node) {
        switch (name) {
            case 'skip':
                this.node.active = false;
                this.reqGuide()
                break;
            default:
                this.setStep()
                break;

        }

    }
    toGame(){
        let itemComponent;
        switch (this.m_data.gameId) {
            case Config.GameId.TexaCowTable:
                this.roomListView.scvRoomList.content.children[0].getComponent(RoomTexaCowTableItem);
                break;
            case Config.GameId.FruitParty:
                this.roomListView.scvRoomList.content.children[0].getComponent(RoomFruitPartyItem);
                break;
            case Config.GameId.RedVsBlack:
                this.roomListView.scvRoomList.content.children[0].getComponent(RoomRedVsBlackItem);
                break;
        }  
        itemComponent.onClickEnter();
    }
  
    reqGuide() {
        G.Logger.log(User._gameIds);
        if (User._gameIds.indexOf(2002) === -1) {
            let req = protoPackage.hall.ReqInsertNewPlayerGuid.create({ gameId: 2002 });
            let buffer = protoPackage.hall.ReqInsertNewPlayerGuid.encode(req).finish();
            this.service.sendMsg(serverType.Lobby,
                protoPackage.hall.HallCmd.CMD_ReqInsertNewPlayerGuid,
                buffer);
        }
    }
    // update (dt) {}
}
