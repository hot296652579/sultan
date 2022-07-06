
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/rank/RecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0bc06tsDxdLXI+g/BqhfZsj', 'RecordItem');
// script/rank/RecordItem.ts

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
let RecordItem = class RecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.rankLabel = null;
        this.icon1 = null;
        this.icon2 = null;
        this.icon3 = null;
        this.periodLabel = null;
        this.winningChipLabel = null;
        this.operateLabel = null;
    }
    onLoad() {
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.rankLabel.string = "";
    }
    updateItem(data) {
        if (data.rank == 1) {
            this.icon1.active = true;
        }
        else if (data.rank == 2) {
            this.icon2.active = true;
        }
        else if (data.rank == 3) {
            this.icon3.active = true;
        }
        else {
            this.icon1.active = false;
            this.icon2.active = false;
            this.icon3.active = false;
            this.rankLabel.string = data.rank;
        }
        this.periodLabel.string = new Date(data.period).format("yy/MM/dd");
        this.winningChipLabel.string = UtilMgr_1.UtilMgr.changeMoney(data.winningChips);
        this.operateLabel.string = UtilMgr_1.UtilMgr.changeMoney(data.reward);
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], RecordItem.prototype, "rankLabel", void 0);
__decorate([
    property(cc.Node)
], RecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RecordItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Node)
], RecordItem.prototype, "icon3", void 0);
__decorate([
    property(cc.Label)
], RecordItem.prototype, "periodLabel", void 0);
__decorate([
    property(cc.Label)
], RecordItem.prototype, "winningChipLabel", void 0);
__decorate([
    property(cc.Label)
], RecordItem.prototype, "operateLabel", void 0);
RecordItem = __decorate([
    ccclass
], RecordItem);
exports.default = RecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmFuay9SZWNvcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0VBQTRDO0FBQzVDLCtDQUE0QztBQUU1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUFXLFNBQVEsZ0JBQU07SUFBOUM7O1FBRUksY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixVQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFHdEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUd0QixnQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixxQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFHbEMsaUJBQVksR0FBYSxJQUFJLENBQUM7SUF5Q2xDLENBQUM7SUF2Q0csTUFBTTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUM1QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FFSixDQUFBO0FBM0RHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ1E7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDSTtBQUd0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lDQUNJO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0k7QUFHdEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDVTtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNlO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ1c7QUFwQmIsVUFBVTtJQUQ5QixPQUFPO0dBQ2EsVUFBVSxDQTZEOUI7a0JBN0RvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZEl0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByYW5rTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGljb24xOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGljb24yOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGljb24zOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwZXJpb2RMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHdpbm5pbmdDaGlwTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBvcGVyYXRlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pY29uMS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pY29uMi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pY29uMy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yYW5rTGFiZWwuc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEucmFuayA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmljb24xLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yYW5rID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuaWNvbjIuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJhbmsgPT0gMykge1xuICAgICAgICAgICAgdGhpcy5pY29uMy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pY29uMS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaWNvbjIuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmljb24zLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yYW5rTGFiZWwuc3RyaW5nID0gZGF0YS5yYW5rO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVyaW9kTGFiZWwuc3RyaW5nID0gbmV3IERhdGUoZGF0YS5wZXJpb2QpLmZvcm1hdChcInl5L01NL2RkXCIpO1xuICAgICAgICB0aGlzLndpbm5pbmdDaGlwTGFiZWwuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShkYXRhLndpbm5pbmdDaGlwcyk7XG4gICAgICAgIHRoaXMub3BlcmF0ZUxhYmVsLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5yZXdhcmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacrEl0ZW3ov5vlhaVTY3JvbGxWaWV355qE5pe25YCZ5Zue6LCDXG4gICAgICovXG4gICAgb25FbnRlclNyY29sbFZpZXcoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOacrEl0ZW3nprvlvIBTY3JvbGxWaWV355qE5pe25YCZ5Zue6LCDXG4gICAgICovXG4gICAgb25FeGl0U2Nyb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgIH1cblxufVxuIl19