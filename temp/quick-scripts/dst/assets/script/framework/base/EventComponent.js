
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/EventComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvRXZlbnRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBdUM7QUFFdkM7O0dBRUc7QUFFSCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMsd0NBQXdDO0FBQ3hDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBVzVELElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXhEOztRQUVjLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsV0FBTSxHQUFHLGtCQUFrQixDQUFDO1FBRTlCLFlBQU8sR0FBZ0IsRUFBRSxDQUFDO0lBNEx0QyxDQUFDO0lBMUxXLGFBQWE7UUFDakIsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixJQUFJLFFBQVE7Z0JBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxJQUFJLEdBQWMsRUFBRSxDQUFDO1FBQ3pCLElBQUksT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFO1lBQ2pDLFFBQVE7WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0gsUUFBUTtZQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFD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SSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQ3JCLEtBQUssQ0FBQyxPQUFPLEVBQ2IsS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLElBQUksRUFDVixLQUFLLENBQUMsT0FBTyxFQUNiLElBQUksQ0FDUCxDQUFBO3FCQUNKO3lCQUFNO3dCQUNILEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7cUJBQ3BHO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCxDQUFDLG9CQUFvQixDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDWixRQUFRO2dCQUNSLG1CQUFPLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDakU7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBRUwsQ0FBQztDQUNKLENBQUE7QUFqTW9CLGNBQWM7SUFEbEMsT0FBTztHQUNhLGNBQWMsQ0FpTWxDO2tCQWpNb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlcnZpY2UgfSBmcm9tIFwiLi9TZXJ2aWNlXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuovku7blpITnkIbnu4Tku7ZcbiAqL1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipAZGVzY3JpcHRpb24g6L+Z5Liq5Zyw5pa55YGa5LiL54m55q6K5aSE55CG77yM6Ziy5q2i5aSW6Z2i55qE5Lq66L+b6KGM5L+u5pS5ICovXG5jb25zdCBhZGRMaXN0ZW5lcnMgPSBTeW1ib2woXCJhZGRMaXN0ZW5lcnNcIik7XG5jb25zdCByZW1vdmVFdmVudExpc3RlbmVycyA9IFN5bWJvbChcInJlbW92ZUV2ZW50TGlzdGVuZXJzXCIpO1xuXG5pbnRlcmZhY2UgRXZlbnRBcmdzIHtcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIGZ1bmM/OiAoZGF0YTogYW55KSA9PiBhbnk7XG4gICAgbWFpbkNtZD86IG51bWJlcixcbiAgICBoYW5kbGVUeXBlPzogYW55LFxuICAgIGlzUXVldWU/OiBib29sZWFuLFxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRDb21wb25lbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJvdGVjdGVkIF9zZXJ2aWNlOiBTZXJ2aWNlID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgbG9nVGFnID0gYFtFdmVudENvbXBvbmVudF1gO1xuXG4gICAgcHJpdmF0ZSBfZXZlbnRzOiBFdmVudEFyZ3NbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfZ2V0RXZlbnRBcmdzKCk6IEV2ZW50QXJncyB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihg5rOo5YaM5LqL5Lu25Y+C5pWw6ZSZ6K+vYCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhcmdzOiBFdmVudEFyZ3MgPSB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLy/mma7pgJrmtojmga/ms6jlhoxcbiAgICAgICAgICAgIGFyZ3MubmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGFyZ3MuZnVuYyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v572R57uc5raI5oGv5rOo5YaMXG4gICAgICAgICAgICBhcmdzLm1haW5DbWQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBhcmdzLmhhbmRsZVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgYXJncy5pc1F1ZXVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBhcmdzLmZ1bmMgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgYXJncy5oYW5kbGVUeXBlID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgICAgIGFyZ3MuaXNRdWV1ZSA9IGFyZ3VtZW50c1szXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5rOo5YaM572R57uc5LqL5Lu2IO+8jOWcqG9uTG9hZOS4reazqOWGjO+8jOWcqG9uRGVzdHJveeiHquWKqOenu+mZpFxuICAgICAqIEBwYXJhbSBtYW5DbWQgXG4gICAgICogQHBhcmFtIGZ1bmMg5aSE55CG5Ye95pWwXG4gICAgICogQHBhcmFtIGhhbmRsZVR5cGUg5raI5oGv6Kej5p6Q57G75Z6LXG4gICAgICogQHBhcmFtIGlzUXVldWUg5piv5ZCm5Yqg5YWl6Zif5YiXXG4gICAgICovXG4gICAgcmVnaXN0ZXJFdmVudChtYW5DbWQ6IG51bWJlciwgZnVuYzogKGRhdGE6IGFueSkgPT4gdm9pZCwgaGFuZGxlVHlwZT86IGFueSwgaXNRdWV1ZT86IGJvb2xlYW4pO1xuICAgIC8qKlxuICAgICAqIOazqOWGjOS6i+S7tiDvvIzlnKhvbkxvYWTkuK3ms6jlhozvvIzlnKhvbkRlc3Ryb3noh6rliqjnp7vpmaRcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIFxuICAgICAqIEBwYXJhbSBmdW5jIFxuICAgICAqL1xuICAgIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGZ1bmM6IChkYXRhOiBhbnkpID0+IHZvaWQpO1xuICAgIHJlZ2lzdGVyRXZlbnQoKSB7XG4gICAgICAgIGxldCBhcmdzID0gdGhpcy5fZ2V0RXZlbnRBcmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMucHVzaChhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDms6jlhoznvZHnu5zkuovku7Yg77yM5Zyob25Mb2Fk5Lit5rOo5YaM77yM5Zyob25EZXN0cm956Ieq5Yqo56e76ZmkXG4gICAgICogQHBhcmFtIG1hbkNtZCBcbiAgICAgKiBAcGFyYW0gZnVuYyDlpITnkIblh73mlbBcbiAgICAgKiBAcGFyYW0gaGFuZGxlVHlwZSDmtojmga/op6PmnpDnsbvlnosg5aaC5p6c5LiN5rOo5YaM57G75Z6L77yM6L+U5Zue55qE5piv5pyN5Yqh5Zmo5pyq6L+b6KGM6Kej5p6Q55qE5rqQ5pWw5o2u77yM6ZyA6KaB6Ieq5bex6L+b6KGM6Kej5YyF5aSE55CGXG4gICAgICogQHBhcmFtIGlzUXVldWUg5piv5ZCm5Yqg5YWl6Zif5YiXXG4gICAgICovXG4gICAgYWRkRXZlbnQobWFuQ21kOiBudW1iZXIsIGZ1bmM6IChkYXRhOiBhbnkpID0+IHZvaWQsIGhhbmRsZVR5cGU/OiBhbnksIGlzUXVldWU/OiBib29sZWFuKTtcbiAgICAvKipcbiAgICAgKiDms6jlhozkuovku7Yg77yM5Zyob25Mb2Fk5Lit5rOo5YaM77yM5Zyob25EZXN0cm956Ieq5Yqo56e76ZmkXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSBcbiAgICAgKiBAcGFyYW0gZnVuYyBcbiAgICAgKi9cbiAgICBhZGRFdmVudChldmVudE5hbWU6IHN0cmluZywgZnVuYzogKGRhdGE6IGFueSkgPT4gdm9pZCk7XG4gICAgYWRkRXZlbnQoKSB7XG4gICAgICAgIGxldCBldmVudDogRXZlbnRBcmdzID0gdGhpcy5fZ2V0RXZlbnRBcmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQubmFtZSkge1xuICAgICAgICAgICAgICAgIE1hbmFnZXIuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQubmFtZSwgZXZlbnQuZnVuYywgdGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v572R57uc5raI5oGv5LqL5Lu25rOo5YaMXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm1haW5DbWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkTGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQubWFpbkNtZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5oYW5kbGVUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmZ1bmMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuaXNRdWV1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IodGhpcy5sb2dUYWcsIGDms6jlhoznmoTnvZHnu5zlm57osIPmnInor68gY2xhc3MgOiAke2NjLmpzLmdldENsYXNzTmFtZSh0aGlzKX0gbWFuQ21kIDogJHtldmVudC5tYWluQ21kfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWIoOmZpOazqOWGjOe9kee7nOS6i+S7tlxuICAgICAqIEBwYXJhbSBtYW5DbWQg5Li7Y21kXG4gICAgICovXG4gICAgcmVtb3ZlRXZlbnQobWFuQ21kOiBudW1iZXIpO1xuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDliKDpmaTmma7pgJrkuovku7ZcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIOS6i+S7tuWQjVxuICAgICAqL1xuICAgIHJlbW92ZUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nKTtcbiAgICByZW1vdmVFdmVudCgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmVycm9yKGDlj4LmlbDmnInor69gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAvL+S6i+S7tuenu+mZpFxuICAgICAgICAgICAgTWFuYWdlci5ldmVudERpc3BhdGNoZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihhcmd1bWVudHNbMF0sIHRoaXMpO1xuICAgICAgICAgICAgLy/liKDpmaTmnKzlnLDkuovku7ZcbiAgICAgICAgICAgIGxldCBpID0gdGhpcy5fZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRzW2ldLm5hbWUgPT0gYXJndW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+WIoOmZpOe9kee7nOa2iOaBr1xuICAgICAgICAgICAgbGV0IG1haW5DbWQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VydmljZSAmJiB0eXBlb2YgbWFpbkNtZCA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5yZW1vdmVMaXN0ZW5lcnModGhpcywgbWFpbkNtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+WIoOmZpOacrOWcsOS6i+S7tlxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLl9ldmVudHMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudHNbaV0ubWFpbkNtZCA9PSBtYWluQ21kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKSB7XG5cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzW2FkZExpc3RlbmVyc10oKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXNbcmVtb3ZlRXZlbnRMaXN0ZW5lcnNdKCk7XG4gICAgfVxuXG4gICAgW2FkZExpc3RlbmVyc10oKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IHRoaXMuX2V2ZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChldmVudC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgLy/mma7pgJrkuovku7bms6jlhoxcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmZ1bmMsIHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+e9kee7nOa2iOaBr+S6i+S7tuazqOWGjFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5tYWluQ21kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50Lm1haW5DbWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuaGFuZGxlVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5mdW5jLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmlzUXVldWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IodGhpcy5sb2dUYWcsIGDms6jlhoznmoTnvZHnu5zlm57osIPmnInor68gY2xhc3MgOiAke2NjLmpzLmdldENsYXNzTmFtZSh0aGlzKX0gbWFuQ21kIDogJHtldmVudC5tYWluQ21kfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgW3JlbW92ZUV2ZW50TGlzdGVuZXJzXSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IHRoaXMuX2V2ZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChldmVudC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgLy/mma7pgJrkuovku7bms6jlhoxcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLmV2ZW50RGlzcGF0Y2hlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3NlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiJdfQ==