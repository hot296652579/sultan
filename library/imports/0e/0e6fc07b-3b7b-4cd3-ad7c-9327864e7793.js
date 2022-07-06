"use strict";
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