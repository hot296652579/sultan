
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/define/ComponentDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2RlZmluZS9Db21wb25lbnREZWZpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTztBQUNQLElBQVksYUFLWDtBQUxELFdBQVksYUFBYTtJQUNyQixLQUFLO0lBQ0wsNkRBQWMsQ0FBQTtJQUNkLEtBQUs7SUFDTCx5REFBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUt4QjtBQUVELGdCQUFnQjtBQUNoQixJQUFZLGdCQU9YO0FBUEQsV0FBWSxnQkFBZ0I7SUFDeEIsT0FBTztJQUNQLHVEQUFRLENBQUE7SUFDUixPQUFPO0lBQ1AseURBQVMsQ0FBQTtJQUNULE9BQU87SUFDUCw2REFBVyxDQUFBO0FBQ2YsQ0FBQyxFQVBXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBTzNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5pa55ZCR57G75Z6LXG5leHBvcnQgZW51bSBEaXJlY3Rpb25UeXBlIHtcbiAgICAvLyDmsLTlubNcbiAgICBIT1JJWk9OVEFMID0gMCxcbiAgICAvLyDlnoLnm7RcbiAgICBWRVJUSUNBTCA9IDEsXG59XG5cbi8vIExpc3RWaWV3IOWKoOi9veaWueW8j1xuZXhwb3J0IGVudW0gTGlzdFZpZXdMb2FkTW9kZSB7XG4gICAgLy8g55u05o6l5Yqg6L29XG4gICAgTk9ORSA9IDAsXG4gICAgLy8g5YiG5bin5Yqg6L29XG4gICAgRlJBTUUgPSAxLFxuICAgIC8vIOaXoOmZkOWKoOi9vVxuICAgIEVORExFU1MgPSAyLFxufSJdfQ==