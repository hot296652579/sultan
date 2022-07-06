
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/event/EventDispatcher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V2ZW50L0V2ZW50RGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7R0FFRztBQUVILFlBQVk7QUFDWixNQUFNLG1CQUFtQixHQUFHO0lBQ3hCLGtCQUFrQjtDQUNyQixDQUFBO0FBUUQsTUFBYSxlQUFlO0lBTXhCO1FBRlEsV0FBTSxHQUFHLG9CQUFvQixDQUFDO1FBQzlCLGlCQUFZLEdBQXFDLElBQUksQ0FBQztRQUUxRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBTE0sTUFBTSxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFNL0Y7Ozs7O09BS0c7SUFDSSxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsUUFBd0MsRUFBRSxNQUFXO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUMxQyxJQUFJLFdBQVcsR0FBa0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0QsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ2xDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsTUFBTTthQUNUO1NBQ0o7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNULE9BQU87U0FDVjtRQUNELElBQUksUUFBUSxHQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxR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YyxJQUFJLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNwSCxlQUFlO0lBQ2YsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2luZ2xldG9uIH0gZnJvbSBcIi4uL2Jhc2UvU2luZ2xldG9uXCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS6i+S7tua0vuWPkeWZqO+8jOWOn+eUn+eahO+8jOW9k+WJjeiKgueCueayoeacieWcqOi/kOihjOaXtu+8jOaXoOazleaUtuWIsOa2iOaBr1xuICovXG5cbi8vIOW/veeVpeS4jeaJk+WNsOeahOS6i+S7tuWQjVxuY29uc3QgSWdub3JlRXZlbnROYW1lTGlzdCA9IFtcbiAgICBcImxvYWRHYW1lUHJvZ3Jlc3NcIixcbl1cblxuaW50ZXJmYWNlIElFdmVudCB7XG4gICAgdHlwZTogc3RyaW5nLCAvLyDkuovku7bnsbvlnotcbiAgICB0YXJnZXQ6IGFueSwgLy/kuovku7Z0YXJnZXRcbiAgICBjYWxsYmFjazogKChkYXRhOiBhbnkpID0+IHZvaWQpIHwgc3RyaW5nOy8v5LqL5Lu25Zue6LCDXG59XG5cbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBFdmVudERpc3BhdGNoZXIgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCkpOyB9XG4gICAgcHJpdmF0ZSBsb2dUYWcgPSBgW0V2ZW50RGlzcGF0Y2hlcl0gYDtcbiAgICBwcml2YXRlIF9ldmVudENhY2hlczogeyBba2V5OiBzdHJpbmddOiBBcnJheTxJRXZlbnQ+IH0gPSBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9ldmVudENhY2hlcyA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5re75Yqg5LqL5Lu2XG4gICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOS6i+S7tuWbnuiwg1xuICAgICAqIEBwYXJhbSB0YXJnZXQgdGFyZ2V0XG4gICAgICovXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBjYWxsYmFjazogKChkYXRhOiBhbnkpID0+IHZvaWQpIHwgc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgICAgICBpZiAoIXR5cGUgfHwgIWNhbGxiYWNrIHx8ICF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgbGV0IGV2ZW50Q2FjaGVzOiBBcnJheTxJRXZlbnQ+ID0gdGhpcy5fZXZlbnRDYWNoZXNbdHlwZV0gfHwgW107XG4gICAgICAgIGxldCBoYXNTYW1lID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRDYWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChldmVudENhY2hlc1tpXS50YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIGhhc1NhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNTYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0V2ZW50OiBJRXZlbnQgPSB7IHR5cGU6IHR5cGUsIGNhbGxiYWNrOiBjYWxsYmFjaywgdGFyZ2V0OiB0YXJnZXQgfTtcbiAgICAgICAgZXZlbnRDYWNoZXMucHVzaChuZXdFdmVudCk7XG4gICAgICAgIHRoaXMuX2V2ZW50Q2FjaGVzW3R5cGVdID0gZXZlbnRDYWNoZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOenu+mZpOS6i+S7tlxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xuICAgICAqIEBwYXJhbSB0YXJnZXQgXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCB0YXJnZXQ6IGFueSkge1xuICAgICAgICBpZiAoIXR5cGUgfHwgIXRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBldmVudENhY2hlczogQXJyYXk8SUV2ZW50PiA9IHRoaXMuX2V2ZW50Q2FjaGVzW3R5cGVdO1xuICAgICAgICBpZiAoIWV2ZW50Q2FjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudENhY2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGV2ZW50Q2FjaGVzW2ldLnRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnRDYWNoZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudENhY2hlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50Q2FjaGVzW3R5cGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOa0vuWPkeS6i+S7tlxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xuICAgICAqIEBwYXJhbSBkYXRhIOS6i+S7tuaVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50KHR5cGU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgICAgICBpZiAoIXR5cGUpIHJldHVybjtcbiAgICAgICAgbGV0IGV2ZW50Q2FjaGVzOiBBcnJheTxJRXZlbnQ+ID0gdGhpcy5fZXZlbnRDYWNoZXNbdHlwZV07XG4gICAgICAgIGlmICghZXZlbnRDYWNoZXMpIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudENhY2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRDYWNoZXNbaV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQuY2FsbGJhY2sgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZ1bmMgPSBSZWZsZWN0LmdldChldmVudC50YXJnZXQsIGV2ZW50LmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYCR7dGhpcy5sb2dUYWd9IGFwcGx5IHN0cmluZyBmdW5jIDogJHtldmVudC5jYWxsYmFja30gY2xhc3MgOiAke2NjLmpzLmdldENsYXNzTmFtZShldmVudC50YXJnZXQpfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlZmxlY3QuYXBwbHkoZnVuYy5iaW5kKGV2ZW50LnRhcmdldCksIGV2ZW50LnRhcmdldCwgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHt0aGlzLmxvZ1RhZ30gY2xhc3MgOiAke2NjLmpzLmdldENsYXNzTmFtZShldmVudC50YXJnZXQpfSBubyBmdW5jIDogJHtldmVudC5jYWxsYmFja31gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlZmxlY3QuYXBwbHkoZXZlbnQuY2FsbGJhY2ssIGV2ZW50LnRhcmdldCwgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQuY2FsbGJhY2sgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmdW5jID0gZXZlbnQudGFyZ2V0W2V2ZW50LmNhbGxiYWNrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnVuYyAmJiB0eXBlb2YgZnVuYyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShldmVudC50YXJnZXQsIFtkYXRhXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHtldmVudC5jYWxsYmFja30gaXMgbm90IGZ1bmN0aW9uYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmVycm9yKGB0YXJnZXQgb3IgY2FsbGJhY2sgaXMgbnVsbGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbGxiYWNrICYmIGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmNhbGxiYWNrLmFwcGx5KGV2ZW50LnRhcmdldCwgW2RhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgY2FsbGJhY2sgaXMgbnVsbGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxud2luZG93LmRpc3BhdGNoID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIGlmIChDQ19ERUJVRyAmJiAhQ0NfRURJVE9SICYmIElnbm9yZUV2ZW50TmFtZUxpc3QuaW5kZXhPZihuYW1lKSA9PT0gLTEpIGNjLmxvZyhgW2Rpc3BhdGNoXSAke25hbWV9IGRhdGEgOiAke2RhdGF9YCk7XG4gICAgLy/lkJHoh6rlt7HlsIHpl63nmoTnrqHnkIblmajkuK3kuZ/liIblj5FcbiAgICBFdmVudERpc3BhdGNoZXIuSW5zdGFuY2UoKS5kaXNwYXRjaEV2ZW50KG5hbWUsIGRhdGEpO1xufSJdfQ==