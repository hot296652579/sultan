"use strict";
cc._RF.push(module, 'f2199SxG2ZDe71lHhNN4e6V', 'RoomTexaCowTableItem');
// script/roomlist/RoomTexaCowTableItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../common/config/Config");
const LogicEvent_1 = require("../common/event/LogicEvent");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const protoc_1 = require("../framework/external/protoc");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const RoomItemBase_1 = __importDefault(require("./RoomItemBase"));
const { ccclass, property } = cc._decorator;
let RoomTexaCowTableItem = class RoomTexaCowTableItem extends RoomItemBase_1.default {
    onLoad() {
        super.onLoad();
        this.updateView();
    }
    start() {
    }
    updateView() {
        let language = Manager_1.Manager.language.getLanguage();
        if (this.m_infoType === protoc_1.com.bt.game.proto.hall.RoomInfoType.Pve) {
            let data = this.m_data;
            let spf = null;
            if (data.gameType === 0) {
                spf = language == cc.sys.LANGUAGE_HINDI ? this.spfPublicRoomHI : this.spfPublicRoom;
            }
            else if (data.gameType === 1) {
                spf = language == cc.sys.LANGUAGE_HINDI ? this.spfAgentRoomHI : this.spfAgentRoom;
            }
            this.imgRoom.spriteFrame = spf;
        }
        else if (this.m_infoType === protoc_1.com.bt.game.proto.hall.RoomInfoType.Pvp) {
        }
        else {
            G.Logger.warn(`房间类型错误 ${this.m_infoType}`);
        }
    }
    onClickEnter() {
        super.playDefaultEffect();
        let data = {
            gameId: Config_1.Config.GameId.TexaCowTable,
            areaId: this.m_data.areaId,
            deskId: this.m_data.roomId,
        };
        dispatch(LogicEvent_1.LogicEvent.ENTER_GAME_MATCH, data);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.Waiting.EnterGame);
    }
};
RoomTexaCowTableItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RoomTexaCowTableItem);
exports.default = RoomTexaCowTableItem;

cc._RF.pop();