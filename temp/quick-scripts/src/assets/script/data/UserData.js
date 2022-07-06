"use strict";
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