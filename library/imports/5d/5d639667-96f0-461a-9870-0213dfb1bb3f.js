"use strict";
cc._RF.push(module, '5d639ZnlvBGGphwAhPfsbs/', 'Controller');
// script/framework/controller/Controller.ts

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
const EventApi_1 = require("../event/EventApi");
const EventComponent_1 = __importDefault(require("../base/EventComponent"));
/**
 * @description 控制器基类 , 对service 的自动注入
 */
const { ccclass, property } = cc._decorator;
let Controller = class Controller extends EventComponent_1.default {
    /**
     * @description 这个变量会在脚本onLoad时自动赋值，使用者请勿进行修改
     */
    get service() {
        return (this._service);
    }
    ;
    set service(value) {
        this._service = value;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_OPEN, this.onNetOpen);
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_CLOSE, this.onNetClose);
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_ERROR, this.onNetError);
    }
    onNetOpen() {
        if (CC_DEBUG)
            cc.log(`--Controller-- onNetOpen---`);
    }
    onNetClose(ev) {
        if (CC_DEBUG)
            cc.log(`--Controller-- onNetClose---`);
    }
    onNetError(ev) {
        if (CC_DEBUG)
            cc.log(`--Controller-- onNetError---`);
    }
};
Controller = __decorate([
    ccclass
], Controller);
exports.default = Controller;

cc._RF.pop();