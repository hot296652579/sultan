
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/define/WingoModeDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvZGVmaW5lL1dpbmdvTW9kZURlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFpQixlQUFlLENBWS9CO0FBWkQsV0FBaUIsZUFBZTtJQUU1QixTQUFTO0lBQ1QsSUFBWSxPQU9YO0lBUEQsV0FBWSxPQUFPO1FBQ2YsT0FBTztRQUNQLCtDQUFhLENBQUE7UUFDYixPQUFPO1FBQ1AsNkRBQW9CLENBQUE7UUFDcEIsT0FBTztRQUNQLHFFQUF3QixDQUFBO0lBQzVCLENBQUMsRUFQVyxPQUFPLEdBQVAsdUJBQU8sS0FBUCx1QkFBTyxRQU9sQjtBQUVMLENBQUMsRUFaZ0IsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFZL0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbmFtZXNwYWNlIFdpbmdvTW9kZURlZmluZSB7XG5cbiAgICAvLyDljoblj7LorrDlvZXmqKHlvI9cbiAgICBleHBvcnQgZW51bSBIaXN0b3J5IHtcbiAgICAgICAgLy8g5pWw5a2X6L+e57q/XG4gICAgICAgIENoYXJ0VHJlbiA9IDAsXG4gICAgICAgIC8vIOminOiJsuivpuaDhVxuICAgICAgICBDYXRhdGFuQ2VwYXRQbHVzID0gMSxcbiAgICAgICAgLy8g5Liq5Lq66K6w5b2VXG4gICAgICAgIENhdGF0YW5DZXBhdFBsdXNTYXlhID0gMixcbiAgICB9XG5cbn1cblxuIl19