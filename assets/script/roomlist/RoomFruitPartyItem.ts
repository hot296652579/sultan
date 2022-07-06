import { Config } from "../common/config/Config";
import { LogicEvent } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import RoomItemBase from "./RoomItemBase";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RoomFruitPartyItem extends RoomItemBase {
    service: LobbyService;

    onLoad() {
        super.onLoad();
        this.updateView();
    }

    start() {

    }

    public updateView(): void {
        let language = Manager.language.getLanguage();
        if (this.m_infoType === com.bt.game.proto.hall.RoomInfoType.Pve) {
            let data: com.bt.game.proto.hall.IPveRoomInfo = this.m_data;
            let spf: cc.SpriteFrame = null;
            if (data.gameType === 0) {
                spf = language == cc.sys.LANGUAGE_HINDI ? this.spfPublicRoomHI : this.spfPublicRoom;
            } else if(data.gameType === 1) {
                spf =  language == cc.sys.LANGUAGE_HINDI ? this.spfAgentRoomHI : this.spfAgentRoom;
            }
            this.imgRoom.spriteFrame = spf;
        } else if (this.m_infoType === com.bt.game.proto.hall.RoomInfoType.Pvp) {
            
        } else {
            G.Logger.warn(`房间类型错误 ${this.m_infoType}`);
        }
    }

    onClickEnter(): void {
        super.playDefaultEffect();
        let data = {
            gameId: Config.GameId.FruitParty,
            areaId: this.m_data.areaId,
            deskId: this.m_data.roomId,
        }
        dispatch(LogicEvent.ENTER_GAME_MATCH, data);
        PanelHelp.showLoading(i18n.Waiting.EnterGame);
    }

}
