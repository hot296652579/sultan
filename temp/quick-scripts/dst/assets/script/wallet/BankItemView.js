
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/BankItemView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5175ao844pLj7GPd38Ss7MR', 'BankItemView');
// script/wallet/BankItemView.ts

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
let BankItemView = class BankItemView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.gouNode = null;
        this.BankIcon = null;
        this.BankName = null;
        this.choosed = null;
        this.choosedImg = null;
        this.iconHot = null;
        this._itemClickCallback = null;
        this._itemId = 0;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    updateItem(data, itemId, onClickCallback, parent) {
        // this.gold.string = UtilMgr.changeMoney(data.gold);
        // UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
        this._itemId = itemId;
        this.parent = parent;
        this._itemClickCallback = onClickCallback;
        this.updateData(data);
    }
    onItemClick(event, type) {
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId, this.parent);
        }
    }
    updateData(data) {
        this.BankName.string = data.bankCode;
    }
    onClick(event) {
        console.log(event);
    }
};
__decorate([
    property(cc.Node)
], BankItemView.prototype, "gouNode", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "BankIcon", void 0);
__decorate([
    property(cc.Label)
], BankItemView.prototype, "BankName", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "choosed", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "choosedImg", void 0);
__decorate([
    property(cc.Node)
], BankItemView.prototype, "iconHot", void 0);
BankItemView = __decorate([
    ccclass
], BankItemView);
exports.default = BankItemView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L0JhbmtJdGVtVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLG9FQUE0QztBQUc1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsZ0JBQU07SUFBaEQ7O1FBRUksWUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsdUJBQWtCLEdBQVEsSUFBSSxDQUFBO1FBRTlCLFlBQU8sR0FBVyxDQUFDLENBQUE7UUE4Qm5CLGlCQUFpQjtJQUNyQixDQUFDO0lBNUJHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxNQUFNO1FBQzVDLHFEQUFxRDtRQUNyRCxzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGVBQWUsQ0FBQTtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDbkIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3JEO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJO1FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUs7UUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3RCLENBQUM7Q0FHSixDQUFBO0FBL0NHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ007QUFFeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztBQUV6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNPO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ007QUFFeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUztBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNNO0FBZFAsWUFBWTtJQURoQyxPQUFPO0dBQ2EsWUFBWSxDQWlEaEM7a0JBakRvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbmtJdGVtVmlldyBleHRlbmRzIFVJVmlldyB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZ291Tm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgQmFua0ljb246IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBCYW5rTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hvb3NlZDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hvb3NlZEltZzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpY29uSG90OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIF9pdGVtQ2xpY2tDYWxsYmFjazogYW55ID0gbnVsbFxuXG4gICAgX2l0ZW1JZDogbnVtYmVyID0gMFxuICAgIHBhcmVudDogYW55O1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCwgb25DbGlja0NhbGxiYWNrLCBwYXJlbnQpIHtcbiAgICAgICAgLy8gdGhpcy5nb2xkLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5nb2xkKTtcbiAgICAgICAgLy8gVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLmhlYWQsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS51c2VySWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9pdGVtSWQgPSBpdGVtSWRcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcbiAgICAgICAgdGhpcy5faXRlbUNsaWNrQ2FsbGJhY2sgPSBvbkNsaWNrQ2FsbGJhY2tcbiAgICAgICAgdGhpcy51cGRhdGVEYXRhKGRhdGEpXG4gICAgfVxuXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIHR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1DbGlja0NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtQ2xpY2tDYWxsYmFjayh0aGlzLl9pdGVtSWQsIHRoaXMucGFyZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YShkYXRhKSB7XG4gICAgICAgIHRoaXMuQmFua05hbWUuc3RyaW5nID0gZGF0YS5iYW5rQ29kZTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=