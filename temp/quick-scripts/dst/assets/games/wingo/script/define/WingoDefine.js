
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/define/WingoDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '94fedXOFcRHnodmbk4WL6mx', 'WingoDefine');
// games/wingo/script/define/WingoDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WingoDefine = void 0;
var WingoDefine;
(function (WingoDefine) {
    // 历史记录数量
    WingoDefine.HISTORY_COUNT = 100;
    // 允许下拉的功能
    let PullBottomFunction;
    (function (PullBottomFunction) {
        // 个人下注记录
        PullBottomFunction[PullBottomFunction["MY_RECORD"] = 0] = "MY_RECORD";
    })(PullBottomFunction = WingoDefine.PullBottomFunction || (WingoDefine.PullBottomFunction = {}));
})(WingoDefine = exports.WingoDefine || (exports.WingoDefine = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvZGVmaW5lL1dpbmdvRGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQWlCLFdBQVcsQ0FVM0I7QUFWRCxXQUFpQixXQUFXO0lBRXhCLFNBQVM7SUFDSSx5QkFBYSxHQUFXLEdBQUcsQ0FBQztJQUV6QyxVQUFVO0lBQ1YsSUFBWSxrQkFHWDtJQUhELFdBQVksa0JBQWtCO1FBQzFCLFNBQVM7UUFDVCxxRUFBYSxDQUFBO0lBQ2pCLENBQUMsRUFIVyxrQkFBa0IsR0FBbEIsOEJBQWtCLEtBQWxCLDhCQUFrQixRQUc3QjtBQUNMLENBQUMsRUFWZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFVM0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbmFtZXNwYWNlIFdpbmdvRGVmaW5lIHtcblxuICAgIC8vIOWOhuWPsuiusOW9leaVsOmHj1xuICAgIGV4cG9ydCBjb25zdCBISVNUT1JZX0NPVU5UOiBudW1iZXIgPSAxMDA7XG5cbiAgICAvLyDlhYHorrjkuIvmi4nnmoTlip/og71cbiAgICBleHBvcnQgZW51bSBQdWxsQm90dG9tRnVuY3Rpb24ge1xuICAgICAgICAvLyDkuKrkurrkuIvms6jorrDlvZVcbiAgICAgICAgTVlfUkVDT1JEID0gMCxcbiAgICB9XG59Il19