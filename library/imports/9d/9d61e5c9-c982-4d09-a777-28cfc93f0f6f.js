"use strict";
cc._RF.push(module, '9d61eXJyYJNCad3KM/JPw9v', 'PrizeItem');
// script/turntable/PrizeItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Defines_1 = require("../framework/base/Defines");
const { ccclass, property } = cc._decorator;
let PrizeItem = class PrizeItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.image = null;
        this.count = null;
        this.nickName = null;
        this.color = ["#6c038e", "#2c0d83", "#2c0d83", "#074f77", "#005d73", "#465e02", "#886200", "#722102", "#600309", "#8e104b",];
    }
    onLoad() {
    }
    updateItem(data) {
        this.node.angle = (data.tableId - 1) * 0.1 * 360;
        this.image.loadRemoteImage({ url: data.picUrl, view: this, defaultSpriteFrame: "turntable/image/10", bundle: Defines_1.BUNDLE_RESOURCES });
        this.count.string = data.rewardNum.toString();
        this.nickName.string = data.goodsName;
        this.nickName.node.getComponent(cc.LabelOutline).color = new cc.Color().fromHEX(this.color[data.tableId - 1]);
    }
};
__decorate([
    property(cc.Sprite)
], PrizeItem.prototype, "image", void 0);
__decorate([
    property(cc.Label)
], PrizeItem.prototype, "count", void 0);
__decorate([
    property(cc.Label)
], PrizeItem.prototype, "nickName", void 0);
PrizeItem = __decorate([
    ccclass
], PrizeItem);
exports.default = PrizeItem;

cc._RF.pop();