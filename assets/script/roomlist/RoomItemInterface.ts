import { com } from "../framework/external/protoc";

export interface RoomItemInterface {
    preloadData: (gameId: number, infoType: com.bt.game.proto.hall.RoomInfoType, data: com.bt.game.proto.hall.IRoomInfo | com.bt.game.proto.hall.IPveRoomInfo | com.bt.game.proto.hall.IPvpRoomInfo) => void,
}