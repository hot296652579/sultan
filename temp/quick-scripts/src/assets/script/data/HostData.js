"use strict";
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