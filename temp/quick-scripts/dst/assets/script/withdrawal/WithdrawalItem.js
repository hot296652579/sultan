
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/withdrawal/WithdrawalItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b27a1R3i7RGtqA+sbOJAXgz', 'WithdrawalItem');
// script/withdrawal/WithdrawalItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Framework_1 = require("../framework/Framework");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let WithdrawalItem = class WithdrawalItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.bankName = null;
        this.account = null;
        this.checkToggle = null;
        this._itemClickCallback = null;
        this._itemId = 0;
        this._changeId = null;
        // update (dt) {}
    }
    onLoad() {
    }
    init(data, itemId, itemClickCallback) {
        this._itemId = itemId;
        this._changeId = data.id;
        this._data = data;
        this._itemClickCallback = itemClickCallback;
        this.bankName.string = data.bankName;
        this.account.string = UtilMgr_1.UtilMgr.setBankCardStringCover(data.bankCard);
        //this.checkToggle.node.active = itemId == 0
        let bankIndex = Framework_1.Manager.localStorage.getItem("selectBankIndex");
        if (!bankIndex) {
            this.checkToggle.isChecked = itemId == 0;
            if (itemId == 0) {
                Framework_1.Manager.localStorage.setItem("selectBankIndex", 0);
            }
        }
        else {
            this.checkToggle.isChecked = itemId == bankIndex;
        }
    }
    onItemClick(event, type) {
        Framework_1.Manager.localStorage.setItem("selectBankIndex", this._itemId);
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId);
        }
    }
    onClickChangeAccount(event, type) {
        dispatch("openBindChangeWithdrawalAccount", [2, this._data]);
    }
};
__decorate([
    property(cc.Label)
], WithdrawalItem.prototype, "bankName", void 0);
__decorate([
    property(cc.Label)
], WithdrawalItem.prototype, "account", void 0);
__decorate([
    property(cc.Toggle)
], WithdrawalItem.prototype, "checkToggle", void 0);
WithdrawalItem = __decorate([
    ccclass
], WithdrawalItem);
exports.default = WithdrawalItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2l0aGRyYXdhbC9XaXRoZHJhd2FsSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCwrQ0FBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXhEOztRQUdJLGFBQVEsR0FBYSxJQUFJLENBQUE7UUFHekIsWUFBTyxHQUFhLElBQUksQ0FBQTtRQUd4QixnQkFBVyxHQUFjLElBQUksQ0FBQTtRQUU3Qix1QkFBa0IsR0FBUSxJQUFJLENBQUE7UUFFOUIsWUFBTyxHQUFXLENBQUMsQ0FBQTtRQUVuQixjQUFTLEdBQVcsSUFBSSxDQUFBO1FBcUN4QixpQkFBaUI7SUFDckIsQ0FBQztJQW5DRyxNQUFNO0lBQ04sQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGlCQUFpQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFBO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDbkUsNENBQTRDO1FBRTVDLElBQUksU0FBUyxHQUFHLG1CQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFBO1lBQ3hDLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDYixtQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDckQ7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQTtTQUNuRDtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbkIsbUJBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3RCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3hDO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQUssRUFBRSxJQUFJO1FBQzVCLFFBQVEsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0NBR0osQ0FBQTtBQWxERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNNO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ0s7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUztBQVRaLGNBQWM7SUFEbEMsT0FBTztHQUNhLGNBQWMsQ0FxRGxDO2tCQXJEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL0ZyYW1ld29ya1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2l0aGRyYXdhbEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGJhbmtOYW1lOiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBhY2NvdW50OiBjYy5MYWJlbCA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgY2hlY2tUb2dnbGU6IGNjLlRvZ2dsZSA9IG51bGxcblxuICAgIF9pdGVtQ2xpY2tDYWxsYmFjazogYW55ID0gbnVsbFxuXG4gICAgX2l0ZW1JZDogbnVtYmVyID0gMFxuXG4gICAgX2NoYW5nZUlkOiBudW1iZXIgPSBudWxsXG4gICAgX2RhdGE6IGFueTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICB9XG5cbiAgICBpbml0KGRhdGEsIGl0ZW1JZCwgaXRlbUNsaWNrQ2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5faXRlbUlkID0gaXRlbUlkXG4gICAgICAgIHRoaXMuX2NoYW5nZUlkID0gZGF0YS5pZFxuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YVxuICAgICAgICB0aGlzLl9pdGVtQ2xpY2tDYWxsYmFjayA9IGl0ZW1DbGlja0NhbGxiYWNrXG4gICAgICAgIHRoaXMuYmFua05hbWUuc3RyaW5nID0gZGF0YS5iYW5rTmFtZVxuICAgICAgICB0aGlzLmFjY291bnQuc3RyaW5nID0gVXRpbE1nci5zZXRCYW5rQ2FyZFN0cmluZ0NvdmVyKGRhdGEuYmFua0NhcmQpXG4gICAgICAgIC8vdGhpcy5jaGVja1RvZ2dsZS5ub2RlLmFjdGl2ZSA9IGl0ZW1JZCA9PSAwXG5cbiAgICAgICAgbGV0IGJhbmtJbmRleCA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZWxlY3RCYW5rSW5kZXhcIilcbiAgICAgICAgaWYgKCFiYW5rSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUb2dnbGUuaXNDaGVja2VkID0gaXRlbUlkID09IDBcbiAgICAgICAgICAgIGlmIChpdGVtSWQgPT0gMCkge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZWxlY3RCYW5rSW5kZXhcIiwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUb2dnbGUuaXNDaGVja2VkID0gaXRlbUlkID09IGJhbmtJbmRleFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIHR5cGUpIHtcbiAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNlbGVjdEJhbmtJbmRleFwiLCB0aGlzLl9pdGVtSWQpXG4gICAgICAgIGlmICh0aGlzLl9pdGVtQ2xpY2tDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5faXRlbUNsaWNrQ2FsbGJhY2sodGhpcy5faXRlbUlkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja0NoYW5nZUFjY291bnQoZXZlbnQsIHR5cGUpIHtcbiAgICAgICAgZGlzcGF0Y2goXCJvcGVuQmluZENoYW5nZVdpdGhkcmF3YWxBY2NvdW50XCIsIFsyLCB0aGlzLl9kYXRhXSk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==