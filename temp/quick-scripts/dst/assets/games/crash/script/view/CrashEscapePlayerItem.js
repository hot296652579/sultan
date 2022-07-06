
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashEscapePlayerItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fd0e6aOR6xMup03aF9/zR4+', 'CrashEscapePlayerItem');
// games/crash/script/view/CrashEscapePlayerItem.ts

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
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const { ccclass, property } = cc._decorator;
let CrashEscapePlayerItem = class CrashEscapePlayerItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgBg = null;
        this.labNick = null;
        this._nick = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._nick = null;
    }
    initUI() {
        this.labNick.string = "";
    }
    refreshNick() {
        this.labNick.string = UtilMgr_1.UtilMgr.setString(this._nick);
        this.labNick._forceUpdateRenderData();
        this.imgBg.node.width = this.labNick.node.width;
    }
    onShow(nick) {
        this._nick = nick;
        this.initUI();
        this.refreshNick();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Sprite)
], CrashEscapePlayerItem.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], CrashEscapePlayerItem.prototype, "labNick", void 0);
CrashEscapePlayerItem = __decorate([
    ccclass
], CrashEscapePlayerItem);
exports.default = CrashEscapePlayerItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaEVzY2FwZVBsYXllckl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRkFBNEQ7QUFDNUQsK0RBQTREO0FBSTVELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXNCLFNBQVEsZ0JBQU07SUFBekQ7O1FBR1ksVUFBSyxHQUFjLElBQUksQ0FBQztRQUd4QixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBRXpCLFVBQUssR0FBVyxJQUFJLENBQUM7UUFvQzdCLGlCQUFpQjtJQUNyQixDQUFDO0lBbkNHLE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRU8sTUFBTTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8sV0FBVztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBZSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwRCxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQVk7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBR0osQ0FBQTtBQTFDRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNZO0FBR2hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ2M7QUFOaEIscUJBQXFCO0lBRHpDLE9BQU87R0FDYSxxQkFBcUIsQ0E2Q3pDO2tCQTdDb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgeyBDcmFzaENvbG9yRGVmaW5lIH0gZnJvbSBcIi4uL2RlZmluZS9DcmFzaENvbG9yRGVmaW5lXCI7XG5pbXBvcnQgeyBDcmFzaEludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2UvQ3Jhc2hJbnRlcmZhY2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoRXNjYXBlUGxheWVySXRlbSBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nQmc6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJOaWNrOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9uaWNrOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9uaWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVSSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJOaWNrLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoTmljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYWJOaWNrLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKHRoaXMuX25pY2spO1xuICAgICAgICAodGhpcy5sYWJOaWNrIGFzIGFueSkuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgICAgICB0aGlzLmltZ0JnLm5vZGUud2lkdGggPSB0aGlzLmxhYk5pY2subm9kZS53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KG5pY2s6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9uaWNrID0gbmljaztcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTmljaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=