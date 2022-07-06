
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/data/CrashGameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd3d1IHIS9GtqZdQURTKSvW', 'CrashGameData');
// games/crash/script/data/CrashGameData.ts

"use strict";
/**@@description 德州扑克游戏数据 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crash = void 0;
const GameData_1 = require("../../../../script/common/base/GameData");
const LanguageImpl_1 = require("../../../../script/common/language/LanguageImpl");
const Manager_1 = require("../../../../script/common/manager/Manager");
const CrashLanguageEN_1 = require("./CrashLanguageEN");
const CrashLanguageZH_1 = require("./CrashLanguageZH");
const CrashLanguageHI_1 = require("./CrashLanguageHI");
class CrashGameData extends GameData_1.GameData {
    onLanguageChange() {
        let lan = CrashLanguageZH_1.CRASH_LAN_ZH;
        if (Manager_1.Manager.language.getLanguage() == CrashLanguageEN_1.CRASH_LAN_EN.language) {
            lan = CrashLanguageEN_1.CRASH_LAN_EN;
        }
        else if (Manager_1.Manager.language.getLanguage() == CrashLanguageHI_1.CRASH_LAN_HI.language) {
            lan = CrashLanguageHI_1.CRASH_LAN_HI;
        }
        LanguageImpl_1.i18n[`${this.bundle}`] = {};
        LanguageImpl_1.i18n[`${this.bundle}`] = lan.data;
    }
    get bundle() {
        return "crash";
    }
}
var Crash;
(function (Crash) {
    Crash.gameData = new CrashGameData;
    let SOUNDS;
    (function (SOUNDS) {
        // 背景音乐
        SOUNDS["BGM"] = "audio/audio_bgm";
        // 火箭飞
        SOUNDS["ROCKET_FLY"] = "audio/audio_fly";
        // 爆炸
        SOUNDS["ROCKET_BOMB"] = "audio/audio_bomb";
    })(SOUNDS = Crash.SOUNDS || (Crash.SOUNDS = {}));
})(Crash = exports.Crash || (exports.Crash = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvZGF0YS9DcmFzaEdhbWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNEI7OztBQUU1QixzRUFBbUU7QUFDbkUsa0ZBQXVFO0FBQ3ZFLHVFQUFvRTtBQUNwRSx1REFBaUQ7QUFDakQsdURBQWlEO0FBQ2pELHVEQUFpRDtBQUVqRCxNQUFNLGFBQWMsU0FBUSxtQkFBUTtJQUNoQyxnQkFBZ0I7UUFDWixJQUFJLEdBQUcsR0FBRyw4QkFBWSxDQUFDO1FBQ3ZCLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksOEJBQVksQ0FBQyxRQUFRLEVBQUU7WUFDekQsR0FBRyxHQUFHLDhCQUFZLENBQUM7U0FDdEI7YUFBTSxJQUFJLGlCQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLDhCQUFZLENBQUMsUUFBUSxFQUFFO1lBQ2hFLEdBQUcsR0FBRyw4QkFBWSxDQUFDO1NBQ3RCO1FBQ0QsbUJBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QixtQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBRUQsSUFBaUIsS0FBSyxDQVdyQjtBQVhELFdBQWlCLEtBQUs7SUFDTCxjQUFRLEdBQUcsSUFBSSxhQUFhLENBQUM7SUFFMUMsSUFBWSxNQU9YO0lBUEQsV0FBWSxNQUFNO1FBQ2QsT0FBTztRQUNQLGlDQUF1QixDQUFBO1FBQ3ZCLE1BQU07UUFDTix3Q0FBOEIsQ0FBQTtRQUM5QixLQUFLO1FBQ0wsMENBQWdDLENBQUE7SUFDcEMsQ0FBQyxFQVBXLE1BQU0sR0FBTixZQUFNLEtBQU4sWUFBTSxRQU9qQjtBQUNMLENBQUMsRUFYZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBV3JCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqQEBkZXNjcmlwdGlvbiDlvrflt57miZHlhYvmuLjmiI/mlbDmja4gKi9cblxuaW1wb3J0IHsgR2FtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9iYXNlL0dhbWVEYXRhXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDUkFTSF9MQU5fRU4gfSBmcm9tIFwiLi9DcmFzaExhbmd1YWdlRU5cIjtcbmltcG9ydCB7IENSQVNIX0xBTl9aSCB9IGZyb20gXCIuL0NyYXNoTGFuZ3VhZ2VaSFwiO1xuaW1wb3J0IHsgQ1JBU0hfTEFOX0hJIH0gZnJvbSBcIi4vQ3Jhc2hMYW5ndWFnZUhJXCI7XG5cbmNsYXNzIENyYXNoR2FtZURhdGEgZXh0ZW5kcyBHYW1lRGF0YSB7XG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgbGV0IGxhbiA9IENSQVNIX0xBTl9aSDtcbiAgICAgICAgaWYgKE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKSA9PSBDUkFTSF9MQU5fRU4ubGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGxhbiA9IENSQVNIX0xBTl9FTjtcbiAgICAgICAgfSBlbHNlIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT0gQ1JBU0hfTEFOX0hJLmxhbmd1YWdlKSB7XG4gICAgICAgICAgICBsYW4gPSBDUkFTSF9MQU5fSEk7XG4gICAgICAgIH1cbiAgICAgICAgaTE4bltgJHt0aGlzLmJ1bmRsZX1gXSA9IHt9O1xuICAgICAgICBpMThuW2Ake3RoaXMuYnVuZGxlfWBdID0gbGFuLmRhdGE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBidW5kbGUoKSB7XG4gICAgICAgIHJldHVybiBcImNyYXNoXCI7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENyYXNoIHtcbiAgICBleHBvcnQgY29uc3QgZ2FtZURhdGEgPSBuZXcgQ3Jhc2hHYW1lRGF0YTtcblxuICAgIGV4cG9ydCBlbnVtIFNPVU5EUyB7XG4gICAgICAgIC8vIOiDjOaZr+mfs+S5kFxuICAgICAgICBCR00gPSBcImF1ZGlvL2F1ZGlvX2JnbVwiLFxuICAgICAgICAvLyDngavnrq3po55cbiAgICAgICAgUk9DS0VUX0ZMWSA9IFwiYXVkaW8vYXVkaW9fZmx5XCIsXG4gICAgICAgIC8vIOeIhueCuFxuICAgICAgICBST0NLRVRfQk9NQiA9IFwiYXVkaW8vYXVkaW9fYm9tYlwiLFxuICAgIH1cbn1cbiJdfQ==