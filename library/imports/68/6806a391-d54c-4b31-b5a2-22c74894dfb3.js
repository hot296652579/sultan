"use strict";
cc._RF.push(module, '6806aOR1UxLMbWiIsdIlN+z', 'WingoModeDefine');
// games/wingo/script/define/WingoModeDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WingoModeDefine = void 0;
var WingoModeDefine;
(function (WingoModeDefine) {
    // 历史记录模式
    let History;
    (function (History) {
        // 数字连线
        History[History["ChartTren"] = 0] = "ChartTren";
        // 颜色详情
        History[History["CatatanCepatPlus"] = 1] = "CatatanCepatPlus";
        // 个人记录
        History[History["CatatanCepatPlusSaya"] = 2] = "CatatanCepatPlusSaya";
    })(History = WingoModeDefine.History || (WingoModeDefine.History = {}));
})(WingoModeDefine = exports.WingoModeDefine || (exports.WingoModeDefine = {}));

cc._RF.pop();