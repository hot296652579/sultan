
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/define/CrashDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvZGVmaW5lL0NyYXNoRGVmaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQWlCLFdBQVcsQ0FZM0I7QUFaRCxXQUFpQixXQUFXO0lBRXhCLFNBQVM7SUFDSSwwQkFBYyxHQUFXLENBQUMsQ0FBQztJQUV4QyxRQUFRO0lBQ1IsSUFBWSxTQUtYO0lBTEQsV0FBWSxTQUFTO1FBQ2pCLElBQUk7UUFDSixxQ0FBTSxDQUFBO1FBQ04sSUFBSTtRQUNKLHlDQUFRLENBQUE7SUFDWixDQUFDLEVBTFcsU0FBUyxHQUFULHFCQUFTLEtBQVQscUJBQVMsUUFLcEI7QUFDTCxDQUFDLEVBWmdCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBWTNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IG5hbWVzcGFjZSBDcmFzaERlZmluZSB7XG5cbiAgICAvLyDkuIvms6jliJfooajkurrmlbBcbiAgICBleHBvcnQgY29uc3QgQkVUX0xJU1RfQ09VTlQ6IG51bWJlciA9IDk7XG5cbiAgICAvLyDmjIfnpLrniYzmlrnlkJFcbiAgICBleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICAgICAgICAvLyDkuIpcbiAgICAgICAgVVAgPSAwLFxuICAgICAgICAvLyDkuItcbiAgICAgICAgRE9XTiA9IDEsXG4gICAgfVxufSJdfQ==