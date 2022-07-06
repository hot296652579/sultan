
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/GoodsItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvR29vZHNJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTRDO0FBSTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixTQUFTLEdBQTlCLE1BQXFCLFNBQVUsU0FBUSxFQUFFLENBQUMsU0FBUztJQUFuRDs7UUFHSSxhQUFRLEdBQWMsSUFBSSxDQUFBO1FBRzFCLFlBQU8sR0FBZ0IsSUFBSSxDQUFBO1FBRzNCLFlBQU8sR0FBYSxJQUFJLENBQUE7UUFHeEIsY0FBUyxHQUFxQixFQUFFLENBQUE7UUFFaEMsa0JBQWEsR0FBaUIsSUFBSSxDQUFBO1FBRWxDLFlBQU8sR0FBVyxDQUFDLENBQUE7UUEwQm5CLFlBQVk7UUFFWixpQkFBaUI7SUFDckIsQ0FBQztJQTNCRyxNQUFNO0lBRU4sQ0FBQztJQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU07UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFFckIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUUsaUJBQWlCLEdBQUMsaUJBQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFDLHVCQUF1QixHQUFDLGlCQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBQyxVQUFVLENBQUE7U0FDbEo7YUFBSTtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMzRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUU1RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzdHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3JELENBQUM7Q0FLSixDQUFBO0FBMUNHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ007QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzswQ0FDSztBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBDQUNLO0FBR3hCO0lBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRDQUNLO0FBWmYsU0FBUztJQUQ3QixPQUFPO0dBQ2EsU0FBUyxDQTZDN0I7a0JBN0NvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFJlY2hhcmdlVmlldyBmcm9tIFwiLi9SZWNoYXJnZVZpZXdcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvb2RzSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGNoaXBJY29uOiBjYy5TcHJpdGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgYW1vdW50MTogY2MuUmljaFRleHQgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYW1vdW50MjogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBjaGlwRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXVxuXG4gICAgX3JlY2hhcmdlVmlldzogUmVjaGFyZ2VWaWV3ID0gbnVsbFxuXG4gICAgX2l0ZW1JZDogbnVtYmVyID0gMFxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgaW5pdChyZWNoYXJnZVZpZXcsIGl0ZW1EYXRhLCBpdGVtSWQpIHtcbiAgICAgICAgdGhpcy5fcmVjaGFyZ2VWaWV3ID0gcmVjaGFyZ2VWaWV3XG4gICAgICAgIHRoaXMuX2l0ZW1JZCA9IGl0ZW1JZFxuXG4gICAgICAgIGlmIChpdGVtRGF0YS5naXZlKSB7XG4gICAgICAgICAgICB0aGlzLmFtb3VudDEuc3RyaW5nID0nPGNvbG9yPSNmZmZmZmY+JytVdGlsTWdyLmNoYW5nZU1vbmV5KGl0ZW1EYXRhLmdvbGQpKycrIDwvYz48Y29sb3I9I0VGRUQzMD4nK1V0aWxNZ3IuY2hhbmdlTW9uZXkoaXRlbURhdGEuZ2l2ZSkrJzwvY29sb3I+J1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50MS5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KGl0ZW1EYXRhLmdvbGQpXG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICB0aGlzLmFtb3VudDIuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShpdGVtRGF0YS5ub3dQcmljZSlcblxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLmNoaXBGcmFtZVtpdGVtSWRdID8gdGhpcy5jaGlwRnJhbWVbaXRlbUlkXSA6IHRoaXMuY2hpcEZyYW1lW3RoaXMuY2hpcEZyYW1lLmxlbmd0aCAtIDFdXG4gICAgICAgIHRoaXMuY2hpcEljb24uc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgIH1cblxuICAgIG9uQ2xpY2tJdGVtKCkge1xuICAgICAgICB0aGlzLl9yZWNoYXJnZVZpZXcub25DbGlja0dvb2RzSXRlbSh0aGlzLl9pdGVtSWQpXG4gICAgfVxuXG4gICAgLy9zdGFydCgpIHt9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19