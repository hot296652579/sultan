"use strict";
cc._RF.push(module, 'eef41sVc2lBKZYhvwm90g1V', 'GoodsItem');
// script/recharge/GoodsItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let GoodsItem = class GoodsItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.chipIcon = null;
        this.amount1 = null;
        this.amount2 = null;
        this.chipFrame = [];
        this._rechargeView = null;
        this._itemId = 0;
        //start() {}
        // update (dt) {}
    }
    onLoad() {
    }
    init(rechargeView, itemData, itemId) {
        this._rechargeView = rechargeView;
        this._itemId = itemId;
        if (itemData.give) {
            this.amount1.string = '<color=#ffffff>' + UtilMgr_1.UtilMgr.changeMoney(itemData.gold) + '+ </c><color=#EFED30>' + UtilMgr_1.UtilMgr.changeMoney(itemData.give) + '</color>';
        }
        else {
            this.amount1.string = UtilMgr_1.UtilMgr.changeMoney(itemData.gold);
        }
        this.amount2.string = UtilMgr_1.UtilMgr.changeMoney(itemData.nowPrice);
        let spriteFrame = this.chipFrame[itemId] ? this.chipFrame[itemId] : this.chipFrame[this.chipFrame.length - 1];
        this.chipIcon.spriteFrame = spriteFrame;
    }
    onClickItem() {
        this._rechargeView.onClickGoodsItem(this._itemId);
    }
};
__decorate([
    property(cc.Sprite)
], GoodsItem.prototype, "chipIcon", void 0);
__decorate([
    property(cc.RichText)
], GoodsItem.prototype, "amount1", void 0);
__decorate([
    property(cc.Label)
], GoodsItem.prototype, "amount2", void 0);
__decorate([
    property([cc.SpriteFrame])
], GoodsItem.prototype, "chipFrame", void 0);
GoodsItem = __decorate([
    ccclass
], GoodsItem);
exports.default = GoodsItem;

cc._RF.pop();