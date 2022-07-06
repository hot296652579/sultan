
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6dd53mKcoVHY7AAwkFceOZW', 'CrashRecordItem');
// games/crash/script/view/CrashRecordItem.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const CrashColorDefine_1 = require("../define/CrashColorDefine");
const CrashRateDefine_1 = require("../define/CrashRateDefine");
const { ccclass, property } = cc._decorator;
let CrashRecordItem = class CrashRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgBg = null;
        this.labRate = null;
        // 倍率
        this._rate = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
        this._rate = null;
    }
    initView() {
        this.imgBg.node.active = false;
        this.labRate.string = "";
    }
    refreshValue() {
        this.imgBg.node.active = this._rate !== null;
        ;
        this.labRate.string = NumberUtils_1.default.converToC(this._rate);
    }
    refreshColor() {
        if (isNaN(this._rate)) {
            return;
        }
        let color = CrashColorDefine_1.CrashColorDefine.Record.WHITE;
        if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.YEELOW) {
            color = CrashColorDefine_1.CrashColorDefine.Record.YEELOW;
        }
        else if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.BLUE) {
            color = CrashColorDefine_1.CrashColorDefine.Record.BLUE;
        }
        else if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.GREEN) {
            color = CrashColorDefine_1.CrashColorDefine.Record.GREEN;
        }
        else if (this._rate >= CrashRateDefine_1.CrashRateDefine.ColorRate.RED) {
            color = CrashColorDefine_1.CrashColorDefine.Record.RED;
        }
        this.labRate.node.color = color;
    }
    setRate(rate) {
        this._rate = rate;
        this.refreshValue();
        this.refreshColor();
    }
    clear() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], CrashRecordItem.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], CrashRecordItem.prototype, "labRate", void 0);
CrashRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashRecordItem);
exports.default = CrashRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaFJlY29yZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBMEU7QUFDMUUsOEZBQXNFO0FBRXRFLGtGQUFrRjtBQUNsRixvRkFBNEQ7QUFDNUQsaUVBQThEO0FBQzlELCtEQUE0RDtBQUU1RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLGdCQUFNO0lBQW5EOztRQUlZLFVBQUssR0FBYyxJQUFJLENBQUM7UUFHeEIsWUFBTyxHQUFhLElBQUksQ0FBQztRQUVqQyxLQUFLO1FBQ0csVUFBSyxHQUFXLElBQUksQ0FBQztJQTBEakMsQ0FBQztJQXhERyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsS0FBSztJQUVmLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7UUFBQSxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLHFCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU8sWUFBWTtRQUNoQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsSUFBSSxLQUFLLEdBQWEsbUNBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUVwRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksaUNBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hELEtBQUssR0FBRyxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQzFDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLGlDQUFlLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtZQUNyRCxLQUFLLEdBQUcsbUNBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN4QzthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxpQ0FBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDdEQsS0FBSyxHQUFHLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDekM7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksaUNBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3BELEtBQUssR0FBRyxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRU0sT0FBTyxDQUFDLElBQVk7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUVKLENBQUE7QUFoRUc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs4Q0FDWTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNjO0FBUGhCLGVBQWU7SUFGbkMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsZUFBZSxDQW9FbkM7a0JBcEVvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL051bWJlclV0aWxzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgQ3Jhc2hDb2xvckRlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvQ3Jhc2hDb2xvckRlZmluZVwiO1xuaW1wb3J0IHsgQ3Jhc2hSYXRlRGVmaW5lIH0gZnJvbSBcIi4uL2RlZmluZS9DcmFzaFJhdGVEZWZpbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoUmVjb3JkSXRlbSBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdCZzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIOWAjeeOh1xuICAgIHByaXZhdGUgX3JhdGU6IG51bWJlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nQmcubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYWJSYXRlLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoVmFsdWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nQmcubm9kZS5hY3RpdmUgPSB0aGlzLl9yYXRlICE9PSBudWxsOztcbiAgICAgICAgdGhpcy5sYWJSYXRlLnN0cmluZyA9IE51bWJlclV0aWxzLmNvbnZlclRvQyh0aGlzLl9yYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hDb2xvcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzTmFOKHRoaXMuX3JhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY29sb3I6IGNjLkNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5SZWNvcmQuV0hJVEU7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JhdGUgPj0gQ3Jhc2hSYXRlRGVmaW5lLkNvbG9yUmF0ZS5ZRUVMT1cpIHtcbiAgICAgICAgICAgIGNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5SZWNvcmQuWUVFTE9XO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3JhdGUgPj0gQ3Jhc2hSYXRlRGVmaW5lLkNvbG9yUmF0ZS5CTFVFKSB7XG4gICAgICAgICAgICBjb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUmVjb3JkLkJMVUU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcmF0ZSA+PSBDcmFzaFJhdGVEZWZpbmUuQ29sb3JSYXRlLkdSRUVOKSB7XG4gICAgICAgICAgICBjb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUmVjb3JkLkdSRUVOO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3JhdGUgPj0gQ3Jhc2hSYXRlRGVmaW5lLkNvbG9yUmF0ZS5SRUQpIHtcbiAgICAgICAgICAgIGNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5SZWNvcmQuUkVEO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYWJSYXRlLm5vZGUuY29sb3IgPSBjb2xvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UmF0ZShyYXRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcmF0ZSA9IHJhdGU7XG4gICAgICAgIHRoaXMucmVmcmVzaFZhbHVlKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaENvbG9yKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbn1cbiJdfQ==