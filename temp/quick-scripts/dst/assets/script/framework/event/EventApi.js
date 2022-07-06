
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/event/EventApi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2ca11E9NLZEiqnYgIoSjr0s', 'EventApi');
// script/framework/event/EventApi.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNetEventType = exports.EventApi = void 0;
let TAG = {
    NetEvent: "NetEvent_",
};
exports.EventApi = {
    NetEvent: {
        ON_OPEN: TAG.NetEvent + "ON_OPEN",
        ON_CLOSE: TAG.NetEvent + "ON_CLOSE",
        ON_ERROR: TAG.NetEvent + "ON_ERROR",
    },
    AdaptScreenEvent: "AdaptScreenEvent",
    CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
};
var CustomNetEventType;
(function (CustomNetEventType) {
    /**@description 应用层主动调用网络层close */
    CustomNetEventType["CLOSE"] = "CustomClose";
})(CustomNetEventType = exports.CustomNetEventType || (exports.CustomNetEventType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUksR0FBRyxHQUFHO0lBQ04sUUFBUSxFQUFHLFdBQVc7Q0FDekIsQ0FBQztBQUVTLFFBQUEsUUFBUSxHQUFHO0lBQ2xCLFFBQVEsRUFBRztRQUNQLE9BQU8sRUFBRyxHQUFHLENBQUMsUUFBUSxHQUFHLFNBQVM7UUFDbEMsUUFBUSxFQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsVUFBVTtRQUNwQyxRQUFRLEVBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxVQUFVO0tBQ3ZDO0lBQ0QsZ0JBQWdCLEVBQUcsa0JBQWtCO0lBQ3JDLGVBQWUsRUFBRyxpQkFBaUI7Q0FDdEMsQ0FBQTtBQUVELElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUMxQixrQ0FBa0M7SUFDbEMsMkNBQXNCLENBQUE7QUFDMUIsQ0FBQyxFQUhXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBRzdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5sZXQgVEFHID0ge1xuICAgIE5ldEV2ZW50IDogXCJOZXRFdmVudF9cIixcbn07XG5cbmV4cG9ydCBsZXQgRXZlbnRBcGkgPSB7XG4gICAgTmV0RXZlbnQgOiB7XG4gICAgICAgIE9OX09QRU4gOiBUQUcuTmV0RXZlbnQgKyBcIk9OX09QRU5cIixcbiAgICAgICAgT05fQ0xPU0UgOiBUQUcuTmV0RXZlbnQgKyBcIk9OX0NMT1NFXCIsXG4gICAgICAgIE9OX0VSUk9SIDogVEFHLk5ldEV2ZW50ICsgXCJPTl9FUlJPUlwiLFxuICAgIH0sXG4gICAgQWRhcHRTY3JlZW5FdmVudCA6IFwiQWRhcHRTY3JlZW5FdmVudFwiLFxuICAgIENIQU5HRV9MQU5HVUFHRSA6IFwiQ0hBTkdFX0xBTkdVQUdFXCIsXG59IFxuXG5leHBvcnQgZW51bSBDdXN0b21OZXRFdmVudFR5cGV7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOW6lOeUqOWxguS4u+WKqOiwg+eUqOe9kee7nOWxgmNsb3NlICovXG4gICAgQ0xPU0UgID0gXCJDdXN0b21DbG9zZVwiLFxufSJdfQ==