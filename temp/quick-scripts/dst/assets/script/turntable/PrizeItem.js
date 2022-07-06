
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/turntable/PrizeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlL1ByaXplSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUE2RDtBQUc3RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBbkQ7O1FBSUksVUFBSyxHQUFjLElBQUksQ0FBQztRQUd4QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEIsVUFBSyxHQUFHLENBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFFLENBQUM7SUFZM0gsQ0FBQztJQVhHLE1BQU07SUFFTixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQStDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFBO1FBQ2hJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEgsQ0FBQztDQUNKLENBQUE7QUFwQkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3Q0FDSTtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dDQUNJO0FBR3ZCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ087QUFWVCxTQUFTO0lBRDdCLE9BQU87R0FDYSxTQUFTLENBd0I3QjtrQkF4Qm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcml6ZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGltYWdlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbmlja05hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgY29sb3IgPSBbXCIjNmMwMzhlXCIsXCIjMmMwZDgzXCIsXCIjMmMwZDgzXCIsXCIjMDc0Zjc3XCIsXCIjMDA1ZDczXCIsXCIjNDY1ZTAyXCIsXCIjODg2MjAwXCIsXCIjNzIyMTAyXCIsXCIjNjAwMzA5XCIsXCIjOGUxMDRiXCIsXTtcbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUFjdGl2aXR5VHVybnRhYmxlKSB7XG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IChkYXRhLnRhYmxlSWQgLSAxKSAqIDAuMSAqIDM2MDtcbiAgICAgICAgdGhpcy5pbWFnZS5sb2FkUmVtb3RlSW1hZ2UoeyB1cmw6IGRhdGEucGljVXJsLCB2aWV3OiB0aGlzLCBkZWZhdWx0U3ByaXRlRnJhbWU6IFwidHVybnRhYmxlL2ltYWdlLzEwXCIsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KVxuICAgICAgICB0aGlzLmNvdW50LnN0cmluZyA9IGRhdGEucmV3YXJkTnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMubmlja05hbWUuc3RyaW5nID0gZGF0YS5nb29kc05hbWU7XG4gICAgICAgIHRoaXMubmlja05hbWUubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgodGhpcy5jb2xvcltkYXRhLnRhYmxlSWQgLSAxXSk7XG4gICAgfVxufVxuIl19