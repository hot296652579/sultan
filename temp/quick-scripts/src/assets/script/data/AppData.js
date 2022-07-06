"use strict";
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