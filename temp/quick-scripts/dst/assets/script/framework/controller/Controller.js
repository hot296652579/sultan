
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/controller/Controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUE2QztBQUM3Qyw0RUFBb0Q7QUFLcEQ7O0dBRUc7QUFFSCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFRNUMsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUF3QixTQUFRLHdCQUFjO0lBRS9EOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQUEsQ0FBQztJQUNGLElBQVcsT0FBTyxDQUFFLEtBQW1CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQVEsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFUyxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRVMsU0FBUztRQUNmLElBQUssUUFBUTtZQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsVUFBVSxDQUFFLEVBQUU7UUFDcEIsSUFBSyxRQUFRO1lBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDUyxVQUFVLENBQUUsRUFBVTtRQUM1QixJQUFLLFFBQVE7WUFBRyxFQUFFLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUVKLENBQUE7QUE5Qm9CLFVBQVU7SUFEOUIsT0FBTztHQUNhLFVBQVUsQ0E4QjlCO2tCQTlCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBFdmVudENvbXBvbmVudCBmcm9tIFwiLi4vYmFzZS9FdmVudENvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5o6n5Yi25Zmo5Z+657G7ICwg5a+5c2VydmljZSDnmoToh6rliqjms6jlhaVcbiAqL1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipAZGVzY3JpcHRpb24g5o6n5Yi25Zmo5o6l5Y+jLOWcqFVJVmlld+S4reazqOWFpVNlcnZpY2Xml7blv4Xpobvlrp7njrAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnRyb2xsZXI8U2VydmljZVR5cGU+e1xuICAgIHNlcnZpY2UgOiBTZXJ2aWNlVHlwZTtcbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXI8U2VydmljZVR5cGU+IGV4dGVuZHMgRXZlbnRDb21wb25lbnQge1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOi/meS4quWPmOmHj+S8muWcqOiEmuacrG9uTG9hZOaXtuiHquWKqOi1i+WAvO+8jOS9v+eUqOiAheivt+WLv+i/m+ihjOS/ruaUuVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2VydmljZSgpIDogU2VydmljZVR5cGV7XG4gICAgICAgIHJldHVybiA8YW55Pih0aGlzLl9zZXJ2aWNlKTtcbiAgICB9O1xuICAgIHB1YmxpYyBzZXQgc2VydmljZSggdmFsdWUgOiBTZXJ2aWNlVHlwZSApIHtcbiAgICAgICAgdGhpcy5fc2VydmljZSA9IDxhbnk+dmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKXtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuTmV0RXZlbnQuT05fT1BFTix0aGlzLm9uTmV0T3Blbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5OZXRFdmVudC5PTl9DTE9TRSx0aGlzLm9uTmV0Q2xvc2UpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuTmV0RXZlbnQuT05fRVJST1IsdGhpcy5vbk5ldEVycm9yKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25OZXRPcGVuKCkge1xuICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKGAtLUNvbnRyb2xsZXItLSBvbk5ldE9wZW4tLS1gKTtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIG9uTmV0Q2xvc2UoIGV2ICkge1xuICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKGAtLUNvbnRyb2xsZXItLSBvbk5ldENsb3NlLS0tYCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvbk5ldEVycm9yKCBldiA6IEV2ZW50ICkge1xuICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKGAtLUNvbnRyb2xsZXItLSBvbk5ldEVycm9yLS0tYCk7XG4gICAgfVxuXG59XG4iXX0=