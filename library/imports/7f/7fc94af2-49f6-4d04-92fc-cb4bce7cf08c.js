"use strict";
cc._RF.push(module, '7fc94rySfZNBJL8y0vOfPCM', 'CrashDefine');
// games/crash/script/define/CrashDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashDefine = void 0;
var CrashDefine;
(function (CrashDefine) {
    // 下注列表人数
    CrashDefine.BET_LIST_COUNT = 9;
    // 指示牌方向
    let Direction;
    (function (Direction) {
        // 上
        Direction[Direction["UP"] = 0] = "UP";
        // 下
        Direction[Direction["DOWN"] = 1] = "DOWN";
    })(Direction = CrashDefine.Direction || (CrashDefine.Direction = {}));
})(CrashDefine = exports.CrashDefine || (exports.CrashDefine = {}));

cc._RF.pop();