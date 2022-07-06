
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/HostData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b6192FAKuFHCrCQOEYXKzNn', 'HostData');
// script/data/HostData.ts

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
let HostData = class HostData extends BaseData_1.default {
    constructor() {
        super();
        // 登陆主机
        this.loginHost = null;
        // 游戏主机
        this.gameHost = null;
        // 下载 APP 主机
        this.appHost = null;
        // 热更主机
        this.hotUpdateHost = null;
        // 支付主机
        this.payHost = null;
        // 资源服主机
        this.resHost = null;
    }
    destroy() {
        this.loginHost = null;
        this.gameHost = null;
        this.appHost = null;
        this.hotUpdateHost = null;
        this.payHost = null;
        this.resHost = null;
    }
    /**
     * 获取不同平台的 app 整包链接
     * @return {string} 整包链接
     */
    getAppURL() {
        let appURL = "";
        switch (cc.sys.os) {
            case cc.sys.OS_ANDROID:
                appURL = "这里需要填写对应下载链接";
                break;
            case cc.sys.OS_IOS:
                appURL = "这里需要填写对应下载链接";
                break;
            default:
                console.warn(`当前平台 ${cc.sys.os} 未定义整包下载链接`);
                break;
        }
        return appURL;
    }
    /**
     * 获取不同平台的商店链接
     * @return {string} 商城链接
     */
    getAppStoreURL() {
        let appStoreURL = "";
        switch (cc.sys.os) {
            case cc.sys.OS_ANDROID:
                appStoreURL = "这里需要填写对应商城链接";
                break;
            case cc.sys.OS_IOS:
                appStoreURL = "这里需要填写对应商城链接";
                break;
            default:
                console.warn(`当前平台 ${cc.sys.os} 未定义整包下载链接`);
                break;
        }
        return appStoreURL;
    }
};
HostData = __decorate([
    ClassDecorator_1.default.classname
], HostData);
exports.default = HostData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZGF0YS9Ib3N0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUF3QztBQUN4QywyRkFBbUU7QUFHbkUsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsa0JBQVE7SUFlMUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQWRaLE9BQU87UUFDQSxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2hDLE9BQU87UUFDQSxhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQy9CLFlBQVk7UUFDTCxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQzlCLE9BQU87UUFDQSxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUNwQyxPQUFPO1FBQ0EsWUFBTyxHQUFXLElBQUksQ0FBQztRQUM5QixRQUFRO1FBQ0QsWUFBTyxHQUFXLElBQUksQ0FBQztJQUs5QixDQUFDO0lBRU0sT0FBTztRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDSSxTQUFTO1FBQ1osSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFBO1FBQ3ZCLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDZixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVTtnQkFDbEIsTUFBTSxHQUFHLGNBQWMsQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNO2dCQUNkLE1BQU0sR0FBRyxjQUFjLENBQUM7Z0JBQ3hCLE1BQU07WUFDVjtnQkFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUM1QyxNQUFNO1NBQ2I7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssY0FBYztRQUNsQixJQUFJLFdBQVcsR0FBVyxFQUFFLENBQUE7UUFDNUIsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUNmLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVO2dCQUNsQixXQUFXLEdBQUcsY0FBYyxDQUFDO2dCQUM3QixNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU07Z0JBQ2QsV0FBVyxHQUFHLGNBQWMsQ0FBQztnQkFDN0IsTUFBTTtZQUNWO2dCQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQzVDLE1BQU07U0FDYjtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7Q0FFSixDQUFBO0FBckVvQixRQUFRO0lBRDVCLHdCQUFjLENBQUMsU0FBUztHQUNKLFFBQVEsQ0FxRTVCO2tCQXJFb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRGF0YSBmcm9tIFwiLi4vYmFzZS9CYXNlRGF0YVwiO1xuaW1wb3J0IENsYXNzRGVjb3JhdG9yIGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0NsYXNzRGVjb3JhdG9yXCI7XG5cbkBDbGFzc0RlY29yYXRvci5jbGFzc25hbWVcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvc3REYXRhIGV4dGVuZHMgQmFzZURhdGEge1xuXG4gICAgLy8g55m76ZmG5Li75py6XG4gICAgcHVibGljIGxvZ2luSG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDmuLjmiI/kuLvmnLpcbiAgICBwdWJsaWMgZ2FtZUhvc3Q6IHN0cmluZyA9IG51bGw7XG4gICAgLy8g5LiL6L29IEFQUCDkuLvmnLpcbiAgICBwdWJsaWMgYXBwSG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDng63mm7TkuLvmnLpcbiAgICBwdWJsaWMgaG90VXBkYXRlSG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDmlK/ku5jkuLvmnLpcbiAgICBwdWJsaWMgcGF5SG9zdDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDotYTmupDmnI3kuLvmnLpcbiAgICBwdWJsaWMgcmVzSG9zdDogc3RyaW5nID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9naW5Ib3N0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5nYW1lSG9zdCA9IG51bGw7XG4gICAgICAgIHRoaXMuYXBwSG9zdCA9IG51bGw7XG4gICAgICAgIHRoaXMuaG90VXBkYXRlSG9zdCA9IG51bGw7XG4gICAgICAgIHRoaXMucGF5SG9zdCA9IG51bGw7XG4gICAgICAgIHRoaXMucmVzSG9zdCA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5LiN5ZCM5bmz5Y+w55qEIGFwcCDmlbTljIXpk77mjqVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IOaVtOWMhemTvuaOpVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRBcHBVUkwoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGFwcFVSTDogc3RyaW5nID0gXCJcIlxuICAgICAgICBzd2l0Y2ggKGNjLnN5cy5vcykge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuT1NfQU5EUk9JRDpcbiAgICAgICAgICAgICAgICBhcHBVUkwgPSBcIui/memHjOmcgOimgeWhq+WGmeWvueW6lOS4i+i9vemTvuaOpVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuT1NfSU9TOlxuICAgICAgICAgICAgICAgIGFwcFVSTCA9IFwi6L+Z6YeM6ZyA6KaB5aGr5YaZ5a+55bqU5LiL6L296ZO+5o6lXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg5b2T5YmN5bmz5Y+wICR7Y2Muc3lzLm9zfSDmnKrlrprkuYnmlbTljIXkuIvovb3pk77mjqVgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXBwVVJMO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluS4jeWQjOW5s+WPsOeahOWVhuW6l+mTvuaOpVxuICAgICAqIEByZXR1cm4ge3N0cmluZ30g5ZWG5Z+O6ZO+5o6lXG4gICAgICovXG4gICAgIHB1YmxpYyBnZXRBcHBTdG9yZVVSTCgpOiBzdHJpbmcge1xuICAgICAgICBsZXQgYXBwU3RvcmVVUkw6IHN0cmluZyA9IFwiXCJcbiAgICAgICAgc3dpdGNoIChjYy5zeXMub3MpIHtcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLk9TX0FORFJPSUQ6XG4gICAgICAgICAgICAgICAgYXBwU3RvcmVVUkwgPSBcIui/memHjOmcgOimgeWhq+WGmeWvueW6lOWVhuWfjumTvuaOpVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuT1NfSU9TOlxuICAgICAgICAgICAgICAgIGFwcFN0b3JlVVJMID0gXCLov5nph4zpnIDopoHloavlhpnlr7nlupTllYbln47pk77mjqVcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGDlvZPliY3lubPlj7AgJHtjYy5zeXMub3N9IOacquWumuS5ieaVtOWMheS4i+i9vemTvuaOpWApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcHBTdG9yZVVSTDtcbiAgICB9XG5cbn0iXX0=