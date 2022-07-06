
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/roomlist/RoomRedVsBlackItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4a200wCHtKB7avw4qcuexO', 'RoomRedVsBlackItem');
// script/roomlist/RoomRedVsBlackItem.ts

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
let RoomRedVsBlackItem = class RoomRedVsBlackItem extends RoomItemBase_1.default {
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
            gameId: Config_1.Config.GameId.RedVsBlack,
            areaId: this.m_data.areaId,
            deskId: this.m_data.roomId,
        };
        dispatch(LogicEvent_1.LogicEvent.ENTER_GAME_MATCH, data);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.Waiting.EnterGame);
    }
};
RoomRedVsBlackItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RoomRedVsBlackItem);
exports.default = RoomRedVsBlackItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcm9vbWxpc3QvUm9vbVJlZFZzQmxhY2tJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWlEO0FBQ2pELDJEQUF3RDtBQUN4RCxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBRXBELDZEQUEwRDtBQUMxRCxrRUFBa0U7QUFDbEUseURBQW1EO0FBR25ELG9FQUE0QztBQUM1QyxrRUFBMEM7QUFFMUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGtCQUFrQixHQUF2QyxNQUFxQixrQkFBbUIsU0FBUSxzQkFBWTtJQUd4RCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVNLFVBQVU7UUFDYixJQUFJLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssWUFBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQzdELElBQUksSUFBSSxHQUF3QyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVELElBQUksR0FBRyxHQUFtQixJQUFJLENBQUM7WUFDL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDckIsR0FBRyxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUN2RjtpQkFBTSxJQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixHQUFHLEdBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3RGO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1NBQ2xDO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFlBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtTQUV2RTthQUFNO1lBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1IsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUc7WUFDUCxNQUFNLEVBQUUsZUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDMUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtTQUM3QixDQUFBO1FBRUQsUUFBUSxDQUFDLHVCQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUMsbUJBQVMsQ0FBQyxXQUFXLENBQUMsbUJBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUVKLENBQUE7QUExQ29CLGtCQUFrQjtJQUZ0QyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixrQkFBa0IsQ0EwQ3RDO2tCQTFDb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBMb2dpY0V2ZW50IH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBSb29tSXRlbUJhc2UgZnJvbSBcIi4vUm9vbUl0ZW1CYXNlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tUmVkVnNCbGFja0l0ZW0gZXh0ZW5kcyBSb29tSXRlbUJhc2Uge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgICAgIGxldCBsYW5ndWFnZSA9IE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKTtcbiAgICAgICAgaWYgKHRoaXMubV9pbmZvVHlwZSA9PT0gY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5Sb29tSW5mb1R5cGUuUHZlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZlUm9vbUluZm8gPSB0aGlzLm1fZGF0YTtcbiAgICAgICAgICAgIGxldCBzcGY6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkYXRhLmdhbWVUeXBlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3BmID0gbGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJID8gdGhpcy5zcGZQdWJsaWNSb29tSEkgOiB0aGlzLnNwZlB1YmxpY1Jvb207XG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5nYW1lVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHNwZiA9ICBsYW5ndWFnZSA9PSBjYy5zeXMuTEFOR1VBR0VfSElOREkgPyB0aGlzLnNwZkFnZW50Um9vbUhJIDogdGhpcy5zcGZBZ2VudFJvb207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltZ1Jvb20uc3ByaXRlRnJhbWUgPSBzcGY7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tX2luZm9UeXBlID09PSBjb20uYnQuZ2FtZS5wcm90by5oYWxsLlJvb21JbmZvVHlwZS5QdnApIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRy5Mb2dnZXIud2Fybihg5oi/6Ze057G75Z6L6ZSZ6K+vICR7dGhpcy5tX2luZm9UeXBlfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja0VudGVyKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5wbGF5RGVmYXVsdEVmZmVjdCgpO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGdhbWVJZDogQ29uZmlnLkdhbWVJZC5SZWRWc0JsYWNrLFxuICAgICAgICAgICAgYXJlYUlkOiB0aGlzLm1fZGF0YS5hcmVhSWQsXG4gICAgICAgICAgICBkZXNrSWQ6IHRoaXMubV9kYXRhLnJvb21JZCxcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3BhdGNoKExvZ2ljRXZlbnQuRU5URVJfR0FNRV9NQVRDSCwgZGF0YSk7XG4gICAgICAgIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldhaXRpbmcuRW50ZXJHYW1lKTtcbiAgICB9XG5cbn1cbiJdfQ==