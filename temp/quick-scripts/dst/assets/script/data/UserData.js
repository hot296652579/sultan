
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/UserData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19b69NLoeZP/Kdd41DUm3aj', 'UserData');
// script/data/UserData.ts

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseData_1 = __importDefault(require("../base/BaseData"));
const Manager_1 = require("../common/manager/Manager");
const ClassDecorator_1 = __importDefault(require("../framework/decorator/ClassDecorator"));
const LocalStoreageDefine = __importStar(require("../common/define/LocalStorageDefine"));
let UserData = class UserData extends BaseData_1.default {
    constructor() {
        super();
        // 用户 ID
        this.id = null;
        // 用户 名字
        this.nick = null;
        // 绑定邮箱
        this.email = null;
        // 绑定手机
        this.BindPhone = null;
        // 推广码
        this.extendCode = null;
        // 用户信息
        this.info = null;
        this.inGame = null;
    }
    clearUserData() {
        this.id = null;
        this.nick = null;
        // this.BindEmail = null
        this.info = null;
        let token = Manager_1.Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        if (token) {
            Manager_1.Manager.localStorage.setItem(LocalStoreageDefine.ACCOUNT_TOKEN, null);
        }
        let imei = Manager_1.Manager.localStorage.getItem('IMEI');
        if (imei) {
            Manager_1.Manager.localStorage.setItem('IMEI', null);
        }
    }
    /**
     * 是否已登录用户
     * @returns {boolean} 是否登录
     */
    isLogined() {
        return this.id !== null && this.id !== undefined;
    }
    destroy() {
    }
};
UserData = __decorate([
    ClassDecorator_1.default.classname
], UserData);
exports.default = UserData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZGF0YS9Vc2VyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBd0M7QUFDeEMsdURBQW9EO0FBQ3BELDJGQUFtRTtBQUduRSx5RkFBMkU7QUFHM0UsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsa0JBQVE7SUFpQjFDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFoQlosUUFBUTtRQUNELE9BQUUsR0FBVyxJQUFJLENBQUM7UUFDekIsUUFBUTtRQUNELFNBQUksR0FBVyxJQUFJLENBQUM7UUFDM0IsT0FBTztRQUNBLFVBQUssR0FBVyxJQUFJLENBQUM7UUFDNUIsT0FBTztRQUNBLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDaEMsTUFBTTtRQUNDLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFDakMsT0FBTztRQUNBLFNBQUksR0FBa0IsSUFBSSxDQUFDO1FBRTNCLFdBQU0sR0FBVyxJQUFJLENBQUM7SUFLN0IsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUVoQixJQUFJLEtBQUssR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUUsSUFBSSxLQUFLLEVBQUU7WUFDUCxpQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxJQUFJLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksSUFBSSxFQUFFO1lBQ04saUJBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sT0FBTztJQUVkLENBQUM7Q0FFSixDQUFBO0FBbkRvQixRQUFRO0lBRDVCLHdCQUFjLENBQUMsU0FBUztHQUNKLFFBQVEsQ0FtRDVCO2tCQW5Eb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRGF0YSBmcm9tIFwiLi4vYmFzZS9CYXNlRGF0YVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgQ2xhc3NEZWNvcmF0b3IgZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvQ2xhc3NEZWNvcmF0b3JcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgZmJzZGsgZnJvbSBcIi4uL3Nkay9mYnNka1wiO1xuaW1wb3J0ICogYXMgTG9jYWxTdG9yZWFnZURlZmluZSBmcm9tIFwiLi4vY29tbW9uL2RlZmluZS9Mb2NhbFN0b3JhZ2VEZWZpbmVcIjtcblxuQENsYXNzRGVjb3JhdG9yLmNsYXNzbmFtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckRhdGEgZXh0ZW5kcyBCYXNlRGF0YSB7XG5cbiAgICAvLyDnlKjmiLcgSURcbiAgICBwdWJsaWMgaWQ6IG51bWJlciA9IG51bGw7XG4gICAgLy8g55So5oi3IOWQjeWtl1xuICAgIHB1YmxpYyBuaWNrOiBzdHJpbmcgPSBudWxsO1xuICAgIC8vIOe7keWumumCrueusVxuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDnu5HlrprmiYvmnLpcbiAgICBwdWJsaWMgQmluZFBob25lOiBzdHJpbmcgPSBudWxsO1xuICAgIC8vIOaOqOW5v+eggVxuICAgIHB1YmxpYyBleHRlbmRDb2RlOiBzdHJpbmcgPSBudWxsO1xuICAgIC8vIOeUqOaIt+S/oeaBr1xuICAgIHB1YmxpYyBpbmZvOiBNU1QuSVVuaXRJbmZvID0gbnVsbDtcblxuICAgIHB1YmxpYyBpbkdhbWU6IHN0cmluZyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgIH1cblxuICAgIGNsZWFyVXNlckRhdGEoKSB7XG4gICAgICAgIHRoaXMuaWQgPSBudWxsXG4gICAgICAgIHRoaXMubmljayA9IG51bGxcbiAgICAgICAgLy8gdGhpcy5CaW5kRW1haWwgPSBudWxsXG4gICAgICAgIHRoaXMuaW5mbyA9IG51bGxcblxuICAgICAgICBsZXQgdG9rZW4gPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKExvY2FsU3RvcmVhZ2VEZWZpbmUuQUNDT1VOVF9UT0tFTik7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMb2NhbFN0b3JlYWdlRGVmaW5lLkFDQ09VTlRfVE9LRU4sIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltZWkgPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdJTUVJJyk7XG4gICAgICAgIGlmIChpbWVpKSB7XG4gICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJTUVJJywgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmmK/lkKblt7LnmbvlvZXnlKjmiLdcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0g5piv5ZCm55m75b2VXG4gICAgICovXG4gICAgcHVibGljIGlzTG9naW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgIT09IG51bGwgJiYgdGhpcy5pZCAhPT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuXG4gICAgfVxuXG59Il19