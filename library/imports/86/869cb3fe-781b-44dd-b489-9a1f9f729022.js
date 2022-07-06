"use strict";
cc._RF.push(module, '869cbP+eBtE3bSJmh+fcpAi', 'HallRankItem');
// script/hall/HallRankItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let HallRankItem = class HallRankItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.index = null;
        this.uname = null;
        this.userId = null;
        this.gold = null;
        this.imgAvatar = null;
        this.icon = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.node.opacity = 0;
        this.index.string = "";
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            dispatch('openRankInfo', []);
        });
    }
    updateItem(data, itemId) {
        this.index.string = itemId + 3;
        this.uname.string = UtilMgr_1.UtilMgr.setString(data.Nick);
        this.userId.string = data.AccountId;
        this.gold.string = `Rp ${data.Score}`;
        let imgAvatar = this.imgAvatar.getComponent(cc.Sprite);
        if (data.headImgUrl)
            UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this);
    }
    onClick(event) {
        console.log(event);
    }
};
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "index", void 0);
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "userId", void 0);
__decorate([
    property(cc.Label)
], HallRankItem.prototype, "gold", void 0);
__decorate([
    property(cc.Node)
], HallRankItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Sprite)
], HallRankItem.prototype, "icon", void 0);
HallRankItem = __decorate([
    ccclass
], HallRankItem);
exports.default = HallRankItem;

cc._RF.pop();