
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/define/SubGameDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40b7f7whKRERqDWzvij92DR', 'SubGameDefine');
// script/common/define/SubGameDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubGameDefine = void 0;
var SubGameDefine;
(function (SubGameDefine) {
    let GameName;
    (function (GameName) {
        GameName["CRASH"] = "crash";
        GameName["ROULETTE"] = "roulette";
        GameName["WINGO"] = "wingo";
    })(GameName = SubGameDefine.GameName || (SubGameDefine.GameName = {}));
})(SubGameDefine = exports.SubGameDefine || (exports.SubGameDefine = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2RlZmluZS9TdWJHYW1lRGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQWlCLGFBQWEsQ0FRN0I7QUFSRCxXQUFpQixhQUFhO0lBRTFCLElBQVksUUFJWDtJQUpELFdBQVksUUFBUTtRQUNoQiwyQkFBZSxDQUFBO1FBQ2YsaUNBQXFCLENBQUE7UUFDckIsMkJBQWUsQ0FBQTtJQUNuQixDQUFDLEVBSlcsUUFBUSxHQUFSLHNCQUFRLEtBQVIsc0JBQVEsUUFJbkI7QUFFTCxDQUFDLEVBUmdCLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBUTdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IG5hbWVzcGFjZSBTdWJHYW1lRGVmaW5lIHtcblxuICAgIGV4cG9ydCBlbnVtIEdhbWVOYW1lIHtcbiAgICAgICAgQ1JBU0ggPSBcImNyYXNoXCIsXG4gICAgICAgIFJPVUxFVFRFID0gJ3JvdWxldHRlJyxcbiAgICAgICAgV0lOR08gPSBcIndpbmdvXCIsXG4gICAgfVxuXG59Il19