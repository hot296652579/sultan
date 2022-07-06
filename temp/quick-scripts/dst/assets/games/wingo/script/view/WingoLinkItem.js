
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/view/WingoLinkItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ed53RvR5ZNSprTJKWAQk60', 'WingoLinkItem');
// games/wingo/script/view/WingoLinkItem.ts

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
let WingoLinkItem = class WingoLinkItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labIssue = null;
        this.latNum = null;
        this.spfNum = [];
        this.spfDarkNum = null;
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
        this.initColor();
    }
    initColor() {
        for (let v of this.latNum.node.children) {
            v.getComponent(cc.Sprite).spriteFrame = this.spfDarkNum;
        }
    }
    setIssue(issue) {
        this.labIssue.string = issue.toString();
    }
    setColor(num) {
        let imgNum = this.latNum.node.getChildByName(`imgNum${num}`).getComponent(cc.Sprite);
        imgNum.spriteFrame = this.spfNum[num];
    }
    onShow(data) {
        this._data = data;
        this.initUI();
        this.setIssue(Number(data.Issue));
        this.setColor(data.Num);
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Label)
], WingoLinkItem.prototype, "labIssue", void 0);
__decorate([
    property(cc.Layout)
], WingoLinkItem.prototype, "latNum", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoLinkItem.prototype, "spfNum", void 0);
__decorate([
    property(cc.SpriteFrame)
], WingoLinkItem.prototype, "spfDarkNum", void 0);
WingoLinkItem = __decorate([
    ccclass
], WingoLinkItem);
exports.default = WingoLinkItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvdmlldy9XaW5nb0xpbmtJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0ZBQTREO0FBRzVELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixhQUFhLEdBQWxDLE1BQXFCLGFBQWMsU0FBUSxnQkFBTTtJQUFqRDs7UUFHWSxhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLFdBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsV0FBTSxHQUFxQixFQUFFLENBQUM7UUFHOUIsZUFBVSxHQUFtQixJQUFJLENBQUM7UUFFbEMsVUFBSyxHQUEwQixJQUFJLENBQUM7UUFnRDVDLGlCQUFpQjtJQUNyQixDQUFDO0lBL0NHLE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRU8sTUFBTTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFNBQVM7UUFDYixLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFFTyxRQUFRLENBQUMsS0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFXO1FBQ3hCLElBQUksTUFBTSxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxJQUEyQjtRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUdKLENBQUE7QUE1REc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDZTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNhO0FBR2pDO0lBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZDQUNXO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7aURBQ2lCO0FBWnpCLGFBQWE7SUFEakMsT0FBTztHQUNhLGFBQWEsQ0ErRGpDO2tCQS9Eb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi91dGlscy9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IE9wZXJhdGlvbiBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlbnRpb25zL09wZXJhdGlvblwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZ2xvYmFsL1V0aWxNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmdvTGlua0l0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiSXNzdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYXlvdXQpXG4gICAgcHJpdmF0ZSBsYXROdW06IGNjLkxheW91dCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcml2YXRlIHNwZk51bTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIHByaXZhdGUgc3BmRGFya051bTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfZGF0YTogTVNULklXaW5nb0hpc3RvcnlJbmZvID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VUkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiSXNzdWUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5pbml0Q29sb3IoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRDb2xvcigpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgdiBvZiB0aGlzLmxhdE51bS5ub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICB2LmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5zcGZEYXJrTnVtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRJc3N1ZShpc3N1ZTpudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJJc3N1ZS5zdHJpbmcgPSBpc3N1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q29sb3IobnVtOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGltZ051bTpjYy5TcHJpdGUgPSAgdGhpcy5sYXROdW0ubm9kZS5nZXRDaGlsZEJ5TmFtZShgaW1nTnVtJHtudW19YCkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGltZ051bS5zcHJpdGVGcmFtZSA9IHRoaXMuc3BmTnVtW251bV07XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvdyhkYXRhOiBNU1QuSVdpbmdvSGlzdG9yeUluZm8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XG5cbiAgICAgICAgdGhpcy5zZXRJc3N1ZShOdW1iZXIoZGF0YS5Jc3N1ZSkpO1xuICAgICAgICB0aGlzLnNldENvbG9yKGRhdGEuTnVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19