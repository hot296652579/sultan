
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/roomlist/RoomItemBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0e6fcB7O3tM0618kyeGTneT', 'RoomItemBase');
// script/roomlist/RoomItemBase.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RoomItemBase = class RoomItemBase extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.spfAgentRoom = null;
        this.spfPublicRoom = null;
        this.spfAgentRoomHI = null;
        this.spfPublicRoomHI = null;
        this.imgRoom = null;
        // 游戏 ID
        this.m_gameId = null;
        // 房间类型
        this.m_infoType = null;
        // 房间项的数据
        this.m_data = null;
        // update (dt) {}
    }
    onLoad() {
    }
    start() {
    }
    preloadData(gameId, infoType, data) {
        this.m_gameId = gameId;
        this.m_infoType = infoType;
        this.m_data = data;
    }
};
__decorate([
    property(cc.SpriteFrame)
], RoomItemBase.prototype, "spfAgentRoom", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomItemBase.prototype, "spfPublicRoom", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomItemBase.prototype, "spfAgentRoomHI", void 0);
__decorate([
    property(cc.SpriteFrame)
], RoomItemBase.prototype, "spfPublicRoomHI", void 0);
__decorate([
    property(cc.Sprite)
], RoomItemBase.prototype, "imgRoom", void 0);
RoomItemBase = __decorate([
    ccclass
], RoomItemBase);
exports.default = RoomItemBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcm9vbWxpc3QvUm9vbUl0ZW1CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQTRDO0FBRzVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxnQkFBTTtJQUFoRDs7UUFHYyxpQkFBWSxHQUFtQixJQUFJLENBQUM7UUFHcEMsa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDLG1CQUFjLEdBQW1CLElBQUksQ0FBQztRQUd0QyxvQkFBZSxHQUFtQixJQUFJLENBQUM7UUFHdkMsWUFBTyxHQUFjLElBQUksQ0FBQztRQUVwQyxRQUFRO1FBQ0UsYUFBUSxHQUFXLElBQUksQ0FBQztRQUNsQyxPQUFPO1FBQ0csZUFBVSxHQUF3QyxJQUFJLENBQUM7UUFDakUsU0FBUztRQUNDLFdBQU0sR0FBaUgsSUFBSSxDQUFDO1FBZ0J0SSxpQkFBaUI7SUFDckIsQ0FBQztJQWZHLE1BQU07SUFFTixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTSxXQUFXLENBQUMsTUFBYyxFQUFFLFFBQTZDLEVBQUUsSUFBa0g7UUFDaE0sSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztDQUdKLENBQUE7QUFwQ0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztrREFDcUI7QUFHOUM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDc0I7QUFHL0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvREFDdUI7QUFHaEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztxREFDd0I7QUFHakQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDZ0I7QUFmbkIsWUFBWTtJQURoQyxPQUFPO0dBQ2EsWUFBWSxDQXVDaEM7a0JBdkNvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFJvb21JdGVtSW50ZXJmYWNlIH0gZnJvbSBcIi4vUm9vbUl0ZW1JbnRlcmZhY2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb21JdGVtQmFzZSBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIFJvb21JdGVtSW50ZXJmYWNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcm90ZWN0ZWQgc3BmQWdlbnRSb29tOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgcHJvdGVjdGVkIHNwZlB1YmxpY1Jvb206IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcm90ZWN0ZWQgc3BmQWdlbnRSb29tSEk6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBwcm90ZWN0ZWQgc3BmUHVibGljUm9vbUhJOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByb3RlY3RlZCBpbWdSb29tOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgLy8g5ri45oiPIElEXG4gICAgcHJvdGVjdGVkIG1fZ2FtZUlkOiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOaIv+mXtOexu+Wei1xuICAgIHByb3RlY3RlZCBtX2luZm9UeXBlOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLlJvb21JbmZvVHlwZSA9IG51bGw7XG4gICAgLy8g5oi/6Ze06aG555qE5pWw5o2uXG4gICAgcHJvdGVjdGVkIG1fZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUm9vbUluZm8gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdmVSb29tSW5mbyB8IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2cFJvb21JbmZvID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHByZWxvYWREYXRhKGdhbWVJZDogbnVtYmVyLCBpbmZvVHlwZTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5Sb29tSW5mb1R5cGUsIGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVJvb21JbmZvIHwgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZlUm9vbUluZm8gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdnBSb29tSW5mbyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZ2FtZUlkID0gZ2FtZUlkO1xuICAgICAgICB0aGlzLm1faW5mb1R5cGUgPSBpbmZvVHlwZTtcbiAgICAgICAgdGhpcy5tX2RhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=