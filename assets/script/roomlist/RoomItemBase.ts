import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { RoomItemInterface } from "./RoomItemInterface";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomItemBase extends UIView implements RoomItemInterface {

    @property(cc.SpriteFrame)
    protected spfAgentRoom: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    protected spfPublicRoom: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    protected spfAgentRoomHI: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    protected spfPublicRoomHI: cc.SpriteFrame = null;

    @property(cc.Sprite)
    protected imgRoom: cc.Sprite = null;

    // 游戏 ID
    protected m_gameId: number = null;
    // 房间类型
    protected m_infoType: com.bt.game.proto.hall.RoomInfoType = null;
    // 房间项的数据
    protected m_data: com.bt.game.proto.hall.IRoomInfo | com.bt.game.proto.hall.IPveRoomInfo | com.bt.game.proto.hall.IPvpRoomInfo = null;

    onLoad() {

    }

    start() {

    }

    public preloadData(gameId: number, infoType: com.bt.game.proto.hall.RoomInfoType, data: com.bt.game.proto.hall.IRoomInfo | com.bt.game.proto.hall.IPveRoomInfo | com.bt.game.proto.hall.IPvpRoomInfo): void {
        this.m_gameId = gameId;
        this.m_infoType = infoType;
        this.m_data = data;
    }

    // update (dt) {}
}
