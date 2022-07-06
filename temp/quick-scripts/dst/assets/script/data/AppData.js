
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/AppData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50884/R/JZFtaht8X+Ro7ak', 'AppData');
// script/data/AppData.ts

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
const BaseData_1 = __importDefault(require("../base/BaseData"));
const ClassDecorator_1 = __importDefault(require("../framework/decorator/ClassDecorator"));
let AppData = class AppData extends BaseData_1.default {
    constructor() {
        super();
        // 版本号
        this.version = null;
        // 动态校验码
        this.token = null;
        // 静态校验码
        this.refreshToken = null;
        // 渠道号
        this.channel = null;
        // 客户端与服务器的时差
        this.timeDifference = null;
        // 带入邀请码
        this.invcode = null;
    }
    destroy() {
        this.version = null;
        this.token = null;
        this.refreshToken = null;
        this.channel = null;
        this.timeDifference = null;
        this.invcode = null;
    }
    /**
     * 获取客户端时间戳
     * @returns {number} 时间戳
     */
    getClientTimestamp() {
        return Date.now();
    }
    /**
     * 获取服务器时间戳（每次通过心跳校正差值）
     * @returns {number} 时间戳
     */
    getServerTimestamp() {
        return Date.now() + this.timeDifference;
    }
};
AppData = __decorate([
    ClassDecorator_1.default.classname
], AppData);
exports.default = AppData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZGF0YS9BcHBEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXdDO0FBQ3hDLDJGQUFtRTtBQUduRSxJQUFxQixPQUFPLEdBQTVCLE1BQXFCLE9BQVEsU0FBUSxrQkFBUTtJQWV6QztRQUNJLEtBQUssRUFBRSxDQUFDO1FBZFosTUFBTTtRQUNDLFlBQU8sR0FBVyxJQUFJLENBQUM7UUFDOUIsUUFBUTtRQUNELFVBQUssR0FBVyxJQUFJLENBQUM7UUFDNUIsUUFBUTtRQUNELGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQ25DLE1BQU07UUFDQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQzlCLGFBQWE7UUFDTixtQkFBYyxHQUFXLElBQUksQ0FBQztRQUNyQyxRQUFRO1FBQ0QsWUFBTyxHQUFXLElBQUksQ0FBQztJQUs5QixDQUFDO0lBRU0sT0FBTztRQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQkFBa0I7UUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGtCQUFrQjtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzVDLENBQUM7Q0FFSixDQUFBO0FBN0NvQixPQUFPO0lBRDNCLHdCQUFjLENBQUMsU0FBUztHQUNKLE9BQU8sQ0E2QzNCO2tCQTdDb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRGF0YSBmcm9tIFwiLi4vYmFzZS9CYXNlRGF0YVwiO1xuaW1wb3J0IENsYXNzRGVjb3JhdG9yIGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0NsYXNzRGVjb3JhdG9yXCI7XG5cbkBDbGFzc0RlY29yYXRvci5jbGFzc25hbWVcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcERhdGEgZXh0ZW5kcyBCYXNlRGF0YSB7XG5cbiAgICAvLyDniYjmnKzlj7dcbiAgICBwdWJsaWMgdmVyc2lvbjogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDliqjmgIHmoKHpqoznoIFcbiAgICBwdWJsaWMgdG9rZW46IHN0cmluZyA9IG51bGw7XG4gICAgLy8g6Z2Z5oCB5qCh6aqM56CBXG4gICAgcHVibGljIHJlZnJlc2hUb2tlbjogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDmuKDpgZPlj7dcbiAgICBwdWJsaWMgY2hhbm5lbDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDlrqLmiLfnq6/kuI7mnI3liqHlmajnmoTml7blt65cbiAgICBwdWJsaWMgdGltZURpZmZlcmVuY2U6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5bim5YWl6YKA6K+356CBXG4gICAgcHVibGljIGludmNvZGU6IHN0cmluZyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnRva2VuID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW4gPSBudWxsO1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBudWxsO1xuICAgICAgICB0aGlzLnRpbWVEaWZmZXJlbmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnZjb2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blrqLmiLfnq6/ml7bpl7TmiLNcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDml7bpl7TmiLNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q2xpZW50VGltZXN0YW1wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluacjeWKoeWZqOaXtumXtOaIs++8iOavj+asoemAmui/h+W/g+i3s+agoeato+W3ruWAvO+8iVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IOaXtumXtOaIs1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRTZXJ2ZXJUaW1lc3RhbXAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCkgKyB0aGlzLnRpbWVEaWZmZXJlbmNlO1xuICAgIH1cblxufSJdfQ==