
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/roomlist/RoomTexaCowTableItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcm9vbWxpc3QvUm9vbVRleGFDb3dUYWJsZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBaUQ7QUFDakQsMkRBQXdEO0FBQ3hELGtFQUF1RDtBQUN2RCx1REFBb0Q7QUFFcEQsNkRBQTBEO0FBQzFELGtFQUFrRTtBQUNsRSx5REFBbUQ7QUFHbkQsb0VBQTRDO0FBQzVDLGtFQUEwQztBQUUxQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLHNCQUFZO0lBRzFELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELEtBQUs7SUFFTCxDQUFDO0lBRU0sVUFBVTtRQUNiLElBQUksUUFBUSxHQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxZQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7WUFDN0QsSUFBSSxJQUFJLEdBQXdDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDNUQsSUFBSSxHQUFHLEdBQW1CLElBQUksQ0FBQztZQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixHQUFHLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ3ZGO2lCQUFNLElBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLEdBQUcsR0FBSSxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDdEY7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7U0FDbEM7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssWUFBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1NBRXZFO2FBQU07WUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVELFlBQVk7UUFDUixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBRztZQUNQLE1BQU0sRUFBRSxlQUFNLENBQUMsTUFBTSxDQUFDLFlBQVk7WUFDbEMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUMxQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1NBQzdCLENBQUE7UUFDRCxRQUFRLENBQUMsdUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxtQkFBUyxDQUFDLFdBQVcsQ0FBQyxtQkFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBRUosQ0FBQTtBQXpDb0Isb0JBQW9CO0lBRnhDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLG9CQUFvQixDQXlDeEM7a0JBekNvQixvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IFJvb21JdGVtQmFzZSBmcm9tIFwiLi9Sb29tSXRlbUJhc2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb21UZXhhQ293VGFibGVJdGVtIGV4dGVuZHMgUm9vbUl0ZW1CYXNlIHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVWaWV3KCk6IHZvaWQge1xuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCk7XG4gICAgICAgIGlmICh0aGlzLm1faW5mb1R5cGUgPT09IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuUm9vbUluZm9UeXBlLlB2ZSkge1xuICAgICAgICAgICAgbGV0IGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2ZVJvb21JbmZvID0gdGhpcy5tX2RhdGE7XG4gICAgICAgICAgICBsZXQgc3BmOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZGF0YS5nYW1lVHlwZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNwZiA9IGxhbmd1YWdlID09IGNjLnN5cy5MQU5HVUFHRV9ISU5ESSA/IHRoaXMuc3BmUHVibGljUm9vbUhJIDogdGhpcy5zcGZQdWJsaWNSb29tO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuZ2FtZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBzcGYgPSAgbGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJID8gdGhpcy5zcGZBZ2VudFJvb21ISSA6IHRoaXMuc3BmQWdlbnRSb29tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWdSb29tLnNwcml0ZUZyYW1lID0gc3BmO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubV9pbmZvVHlwZSA9PT0gY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5Sb29tSW5mb1R5cGUuUHZwKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLndhcm4oYOaIv+mXtOexu+Wei+mUmeivryAke3RoaXMubV9pbmZvVHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tFbnRlcigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucGxheURlZmF1bHRFZmZlY3QoKTtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBnYW1lSWQ6IENvbmZpZy5HYW1lSWQuVGV4YUNvd1RhYmxlLFxuICAgICAgICAgICAgYXJlYUlkOiB0aGlzLm1fZGF0YS5hcmVhSWQsXG4gICAgICAgICAgICBkZXNrSWQ6IHRoaXMubV9kYXRhLnJvb21JZCxcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0dBTUVfTUFUQ0gsIGRhdGEpO1xuICAgICAgICBQYW5lbEhlbHAuc2hvd0xvYWRpbmcoaTE4bi5XYWl0aW5nLkVudGVyR2FtZSk7XG4gICAgfVxuXG59XG4iXX0=