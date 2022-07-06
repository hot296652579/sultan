"use strict";
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