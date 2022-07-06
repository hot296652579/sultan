
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/config/CrashConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b6578JPvJL/pp//CtdLRM3', 'CrashConfig');
// games/crash/script/config/CrashConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashConfig = void 0;
var CrashConfig;
(function (CrashConfig) {
    // 下注金额按钮
    CrashConfig.BetGoldButton = [
        2000,
        20000,
        100000,
        0.5,
        2,
    ];
    // 校验 SHA256 网址前半段
    CrashConfig.CHECK_SHA256_URL = "https://silence-may.github.io/online-tools/sha256.html?content=";
})(CrashConfig = exports.CrashConfig || (exports.CrashConfig = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvY29uZmlnL0NyYXNoQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQWlCLFdBQVcsQ0FjM0I7QUFkRCxXQUFpQixXQUFXO0lBRXhCLFNBQVM7SUFDSSx5QkFBYSxHQUFhO1FBQ25DLElBQUk7UUFDSixLQUFLO1FBQ0wsTUFBTTtRQUNOLEdBQUc7UUFDSCxDQUFDO0tBQ0osQ0FBQztJQUVGLGtCQUFrQjtJQUNMLDRCQUFnQixHQUFXLGlFQUFpRSxDQUFDO0FBRTlHLENBQUMsRUFkZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFjM0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbmFtZXNwYWNlIENyYXNoQ29uZmlnIHtcblxuICAgIC8vIOS4i+azqOmHkemineaMiemSrlxuICAgIGV4cG9ydCBjb25zdCBCZXRHb2xkQnV0dG9uOiBudW1iZXJbXSA9IFtcbiAgICAgICAgMjAwMCxcbiAgICAgICAgMjAwMDAsXG4gICAgICAgIDEwMDAwMCxcbiAgICAgICAgMC41LFxuICAgICAgICAyLFxuICAgIF07XG5cbiAgICAvLyDmoKHpqowgU0hBMjU2IOe9keWdgOWJjeWNiuautVxuICAgIGV4cG9ydCBjb25zdCBDSEVDS19TSEEyNTZfVVJMOiBzdHJpbmcgPSBcImh0dHBzOi8vc2lsZW5jZS1tYXkuZ2l0aHViLmlvL29ubGluZS10b29scy9zaGEyNTYuaHRtbD9jb250ZW50PVwiO1xuXG59Il19