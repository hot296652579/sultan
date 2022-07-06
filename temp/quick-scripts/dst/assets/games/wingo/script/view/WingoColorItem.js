
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/view/WingoColorItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '13536v22VlDupRHYmhYs8hU', 'WingoColorItem');
// games/wingo/script/view/WingoColorItem.ts

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
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let WingoColorItem = class WingoColorItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labIssue = null;
        this.labHarga = null;
        this.labNum = null;
        this.nodColor = null;
        this.pfbWingoColorGroupItemList = [];
        this._data = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initUI() {
        this.labIssue.string = "";
        this.labHarga.string = "";
        this.labNum.string = "";
        this.initColor();
    }
    initColor() {
        this.nodColor.removeAllChildren();
    }
    setIssue(issue) {
        this.labIssue.string = issue.toString();
    }
    setNum(num) {
        this.labNum.string = num.toString();
    }
    setHarga(harga) {
        this.labHarga.string = harga.toString();
    }
    setColor(num) {
        this.nodColor.addChild(cc.instantiate(this.pfbWingoColorGroupItemList[num]));
    }
    onShow(data) {
        this._data = data;
        this.initUI();
        this.setIssue(Number(data.Issue));
        this.setHarga(data.Harga);
        this.setNum(data.Num);
        this.setColor(data.Num);
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Label)
], WingoColorItem.prototype, "labIssue", void 0);
__decorate([
    property(cc.Label)
], WingoColorItem.prototype, "labHarga", void 0);
__decorate([
    property(cc.Label)
], WingoColorItem.prototype, "labNum", void 0);
__decorate([
    property(cc.Node)
], WingoColorItem.prototype, "nodColor", void 0);
__decorate([
    property([cc.Prefab])
], WingoColorItem.prototype, "pfbWingoColorGroupItemList", void 0);
WingoColorItem = __decorate([
    ccclass
], WingoColorItem);
exports.default = WingoColorItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvdmlldy9XaW5nb0NvbG9ySXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9GQUE0RDtBQUU1RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsZ0JBQU07SUFBbEQ7O1FBR1ksYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLFdBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QiwrQkFBMEIsR0FBZ0IsRUFBRSxDQUFDO1FBRTdDLFVBQUssR0FBMEIsSUFBSSxDQUFDO1FBeUQ1QyxpQkFBaUI7SUFDckIsQ0FBQztJQXhERyxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsS0FBSztJQUVMLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVPLE1BQU07UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFNBQVM7UUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRU8sTUFBTSxDQUFDLEdBQVc7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTyxRQUFRLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFVO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRU0sTUFBTSxDQUFDLElBQTJCO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBR0osQ0FBQTtBQXhFRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNlO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ2U7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDYTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNlO0FBR2pDO0lBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2tFQUMrQjtBQWZwQyxjQUFjO0lBRGxDLE9BQU87R0FDYSxjQUFjLENBMkVsQztrQkEzRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5nb0NvbG9ySXRlbSBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJJc3N1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiSGFyZ2E6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYk51bTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RDb2xvcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgcHJpdmF0ZSBwZmJXaW5nb0NvbG9yR3JvdXBJdGVtTGlzdDogY2MuUHJlZmFiW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2RhdGE6IE1TVC5JV2luZ29IaXN0b3J5SW5mbyA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFVJKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYklzc3VlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSGFyZ2Euc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJOdW0uc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5pbml0Q29sb3IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRDb2xvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub2RDb2xvci5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SXNzdWUoaXNzdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYklzc3VlLnN0cmluZyA9IGlzc3VlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROdW0obnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJOdW0uc3RyaW5nID0gbnVtLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRIYXJnYShoYXJnYTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiSGFyZ2Euc3RyaW5nID0gaGFyZ2EudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENvbG9yKG51bTpudW1iZXIpOnZvaWQge1xuICAgICAgICB0aGlzLm5vZENvbG9yLmFkZENoaWxkKGNjLmluc3RhbnRpYXRlKHRoaXMucGZiV2luZ29Db2xvckdyb3VwSXRlbUxpc3RbbnVtXSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coZGF0YTogTVNULklXaW5nb0hpc3RvcnlJbmZvKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuXG4gICAgICAgIHRoaXMuc2V0SXNzdWUoTnVtYmVyKGRhdGEuSXNzdWUpKTtcbiAgICAgICAgdGhpcy5zZXRIYXJnYShkYXRhLkhhcmdhKTtcbiAgICAgICAgdGhpcy5zZXROdW0oZGF0YS5OdW0pXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoZGF0YS5OdW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=