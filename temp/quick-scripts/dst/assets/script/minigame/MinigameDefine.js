
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/minigame/MinigameDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7223QPX/9Kf5lbwNtkD3wp', 'MinigameDefine');
// script/minigame/MinigameDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinigameDefine = void 0;
var MinigameDefine;
(function (MinigameDefine) {
    // 背景音乐
    MinigameDefine.BGM = "minigame/audio/audio_bgm";
    // 音效
    MinigameDefine.Sound = {
        // 飞金币
        FLY_GOLD: "minigame/audio/audio_fly_gold",
        // 开宝箱
        OPEN_BOX: "minigame/audio/audio_open_box",
    };
})(MinigameDefine = exports.MinigameDefine || (exports.MinigameDefine = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbWluaWdhbWUvTWluaWdhbWVEZWZpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBaUIsY0FBYyxDQWM5QjtBQWRELFdBQWlCLGNBQWM7SUFFM0IsT0FBTztJQUNNLGtCQUFHLEdBQUcsMEJBQTBCLENBQUM7SUFFOUMsS0FBSztJQUNRLG9CQUFLLEdBQUc7UUFDakIsTUFBTTtRQUNOLFFBQVEsRUFBRSwrQkFBK0I7UUFDekMsTUFBTTtRQUNOLFFBQVEsRUFBRSwrQkFBK0I7S0FDNUMsQ0FBQTtBQUdMLENBQUMsRUFkZ0IsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFjOUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgbmFtZXNwYWNlIE1pbmlnYW1lRGVmaW5lIHtcblxuICAgIC8vIOiDjOaZr+mfs+S5kFxuICAgIGV4cG9ydCBjb25zdCBCR00gPSBcIm1pbmlnYW1lL2F1ZGlvL2F1ZGlvX2JnbVwiO1xuXG4gICAgLy8g6Z+z5pWIXG4gICAgZXhwb3J0IGNvbnN0IFNvdW5kID0ge1xuICAgICAgICAvLyDpo57ph5HluIFcbiAgICAgICAgRkxZX0dPTEQ6IFwibWluaWdhbWUvYXVkaW8vYXVkaW9fZmx5X2dvbGRcIixcbiAgICAgICAgLy8g5byA5a6d566xXG4gICAgICAgIE9QRU5fQk9YOiBcIm1pbmlnYW1lL2F1ZGlvL2F1ZGlvX29wZW5fYm94XCIsXG4gICAgfVxuXG5cbn0iXX0=