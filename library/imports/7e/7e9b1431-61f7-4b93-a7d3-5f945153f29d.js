"use strict";
cc._RF.push(module, '7e9b1QxYfdLk6fTX5RRU/Kd', 'ComponentDefine');
// script/common/define/ComponentDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListViewLoadMode = exports.DirectionType = void 0;
// 方向类型
var DirectionType;
(function (DirectionType) {
    // 水平
    DirectionType[DirectionType["HORIZONTAL"] = 0] = "HORIZONTAL";
    // 垂直
    DirectionType[DirectionType["VERTICAL"] = 1] = "VERTICAL";
})(DirectionType = exports.DirectionType || (exports.DirectionType = {}));
// ListView 加载方式
var ListViewLoadMode;
(function (ListViewLoadMode) {
    // 直接加载
    ListViewLoadMode[ListViewLoadMode["NONE"] = 0] = "NONE";
    // 分帧加载
    ListViewLoadMode[ListViewLoadMode["FRAME"] = 1] = "FRAME";
    // 无限加载
    ListViewLoadMode[ListViewLoadMode["ENDLESS"] = 2] = "ENDLESS";
})(ListViewLoadMode = exports.ListViewLoadMode || (exports.ListViewLoadMode = {}));

cc._RF.pop();