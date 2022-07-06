"use strict";
cc._RF.push(module, '5af0eqpInZAY4eyx1jKB3jI', 'EventComponent');
// script/framework/base/EventComponent.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Framework_1 = require("../Framework");
/**
 * @description 事件处理组件
 */
const { ccclass, property } = cc._decorator;
/**@description 这个地方做下特殊处理，防止外面的人进行修改 */
const addListeners = Symbol("addListeners");
const removeEventListeners = Symbol("removeEventListeners");
let EventComponent = class EventComponent extends cc.Component {
    constructor() {
        super(...arguments);
        this._service = null;
        this.logTag = `[EventComponent]`;
        this._events = [];
    }
    _getEventArgs() {
        if (arguments.length < 2) {
            if (CC_DEBUG)
                cc.error(`注册事件参数错误`);
            return null;
        }
        let args = {};
        if (typeof arguments[0] == "string") {
            //普通消息注册
            args.name = arguments[0];
            args.func = arguments[1];
        }
        else {
            //网络消息注册
            args.mainCmd = arguments[0];
            args.handleType = null;
            args.isQueue = true;
            if (arguments.length >= 2) {
                args.func = arguments[1];
            }
            if (arguments.length >= 3) {
                args.handleType = arguments[2];
            }
            if (arguments.length >= 4) {
                args.isQueue = arguments[3];
            }
        }
        return args;
    }
    registerEvent() {
        let args = this._getEventArgs.apply(this, arguments);
        if (args) {
            this._events.push(args);
        }
    }
    addEvent() {
        let event = this._getEventArgs.apply(this, arguments);
        if (event) {
            this._events.push(event);
            if (event.name) {
                Framework_1.Manager.eventDispatcher.addEventListener(event.name, event.func, this);
            }
            else {
                //网络消息事件注册
                if (this._service) {
                    if (event.mainCmd) {
                        this._service.addListener(event.mainCmd, event.handleType, event.func, event.isQueue, this);
                    }
                    else {
                        cc.error(this.logTag, `注册的网络回调有误 class : ${cc.js.getClassName(this)} manCmd : ${event.mainCmd}`);
                    }
                }
            }
        }
    }
    removeEvent() {
        if (arguments.length < 1) {
            if (CC_DEBUG)
                cc.error(`参数有误`);
            return;
        }
        if (arguments.length == 1) {
            //事件移除
            Framework_1.Manager.eventDispatcher.removeEventListener(arguments[0], this);
            //删除本地事件
            let i = this._events.length;
            while (i--) {
                if (this._events[i].name == arguments[0]) {
                    this._events.splice(i, 1);
                }
            }
        }
        else {
            //删除网络消息
            let mainCmd = arguments[0];
            if (this._service && typeof mainCmd == "number") {
                this._service.removeListeners(this, mainCmd);
            }
            //删除本地事件
            let i = this._events.length;
            while (i--) {
                if (this._events[i].mainCmd == mainCmd) {
                    this._events.splice(i, 1);
                }
            }
        }
    }
    bindingEvents() {
    }
    onLoad() {
        this.bindingEvents();
        this[addListeners]();
    }
    onDestroy() {
        this[removeEventListeners]();
    }
    [addListeners]() {
        for (let i = 0; i < this._events.length; i++) {
            let event = this._events[i];
            if (event.name) {
                //普通事件注册
                Framework_1.Manager.eventDispatcher.addEventListener(event.name, event.func, this);
            }
            else {
                //网络消息事件注册
                if (this._service) {
                    if (event.mainCmd) {
                        this._service.addListener(event.mainCmd, event.handleType, event.func, event.isQueue, this);
                    }
                    else {
                        cc.error(this.logTag, `注册的网络回调有误 class : ${cc.js.getClassName(this)} manCmd : ${event.mainCmd}`);
                    }
                }
            }
        }
    }
    [removeEventListeners]() {
        for (let i = 0; i < this._events.length; i++) {
            let event = this._events[i];
            if (event.name) {
                //普通事件注册
                Framework_1.Manager.eventDispatcher.removeEventListener(event.name, this);
            }
        }
        if (this._service) {
            this._service.removeListeners(this);
            this._service = null;
        }
    }
};
EventComponent = __decorate([
    ccclass
], EventComponent);
exports.default = EventComponent;

cc._RF.pop();