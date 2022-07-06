"use strict";
cc._RF.push(module, '76e60J3VtFFtpDVPb7EZx5v', 'EventDispatcher');
// script/framework/event/EventDispatcher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
/**
 * @description 事件派发器，原生的，当前节点没有在运行时，无法收到消息
 */
// 忽略不打印的事件名
const IgnoreEventNameList = [
    "loadGameProgress",
];
class EventDispatcher {
    constructor() {
        this.logTag = `[EventDispatcher] `;
        this._eventCaches = null;
        this._eventCaches = {};
    }
    static Instance() { return this._instance || (this._instance = new EventDispatcher()); }
    /**
     * @description 添加事件
     * @param type 事件类型
     * @param callback 事件回调
     * @param target target
     */
    addEventListener(type, callback, target) {
        if (!type || !callback || !target)
            return;
        let eventCaches = this._eventCaches[type] || [];
        let hasSame = false;
        for (let i = 0; i < eventCaches.length; i++) {
            if (eventCaches[i].target === target) {
                hasSame = true;
                break;
            }
        }
        if (hasSame) {
            return;
        }
        let newEvent = { type: type, callback: callback, target: target };
        eventCaches.push(newEvent);
        this._eventCaches[type] = eventCaches;
    }
    /**
     * @description 移除事件
     * @param type 事件类型
     * @param target
     */
    removeEventListener(type, target) {
        if (!type || !target) {
            return;
        }
        let eventCaches = this._eventCaches[type];
        if (!eventCaches) {
            return;
        }
        for (let i = 0; i < eventCaches.length; i++) {
            if (eventCaches[i].target === target) {
                eventCaches.splice(i, 1);
                break;
            }
        }
        if (eventCaches.length == 0) {
            delete this._eventCaches[type];
        }
    }
    /**
     * @description 派发事件
     * @param type 事件类型
     * @param data 事件数据
     */
    dispatchEvent(type, data) {
        if (!type)
            return;
        let eventCaches = this._eventCaches[type];
        if (!eventCaches)
            return;
        for (let i = 0; i < eventCaches.length; i++) {
            let event = eventCaches[i];
            try {
                if (typeof Reflect == "object") {
                    if (typeof event.callback == "string") {
                        let func = Reflect.get(event.target, event.callback);
                        if (func) {
                            if (CC_DEBUG)
                                cc.log(`${this.logTag} apply string func : ${event.callback} class : ${cc.js.getClassName(event.target)}`);
                            Reflect.apply(func.bind(event.target), event.target, [data]);
                        }
                        else {
                            if (CC_DEBUG)
                                cc.error(`${this.logTag} class : ${cc.js.getClassName(event.target)} no func : ${event.callback}`);
                        }
                    }
                    else {
                        Reflect.apply(event.callback, event.target, [data]);
                    }
                }
                else {
                    if (typeof event.callback == "string") {
                        if (event.target && event.callback) {
                            let func = event.target[event.callback];
                            if (func && typeof func == "function") {
                                func.apply(event.target, [data]);
                            }
                            else {
                                if (CC_DEBUG)
                                    cc.error(`${event.callback} is not function`);
                            }
                        }
                        else {
                            if (CC_DEBUG)
                                cc.error(`target or callback is null`);
                        }
                    }
                    else {
                        if (event.callback && event.target) {
                            event.callback.apply(event.target, [data]);
                        }
                        else {
                            if (CC_DEBUG)
                                cc.error(`callback is null`);
                        }
                    }
                }
            }
            catch (error) {
                cc.error(error);
            }
        }
    }
}
exports.EventDispatcher = EventDispatcher;
EventDispatcher._instance = null;
window.dispatch = function (name, data) {
    if (CC_DEBUG && !CC_EDITOR && IgnoreEventNameList.indexOf(name) === -1)
        cc.log(`[dispatch] ${name} data : ${data}`);
    //向自己封闭的管理器中也分发
    EventDispatcher.Instance().dispatchEvent(name, data);
};

cc._RF.pop();