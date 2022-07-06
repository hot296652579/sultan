
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/data/WingoGameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5068kQE+1K8IndZttSsuxu', 'WingoGameData');
// games/wingo/script/data/WingoGameData.ts

"use strict";
/**@@description 德州扑克游戏数据 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wingo = void 0;
const GameData_1 = require("../../../../script/common/base/GameData");
const LanguageImpl_1 = require("../../../../script/common/language/LanguageImpl");
const Manager_1 = require("../../../../script/common/manager/Manager");
const WingoLanguageEN_1 = require("./WingoLanguageEN");
const WingoLanguageZH_1 = require("./WingoLanguageZH");
const WingoLanguageHI_1 = require("./WingoLanguageHI");
class WingoGameData extends GameData_1.GameData {
    onLanguageChange() {
        let lan = WingoLanguageZH_1.WINGO_LAN_ZH;
        if (Manager_1.Manager.language.getLanguage() == WingoLanguageEN_1.WINGO_LAN_EN.language) {
            lan = WingoLanguageEN_1.WINGO_LAN_EN;
        }
        else if (Manager_1.Manager.language.getLanguage() == WingoLanguageHI_1.WINGO_LAN_HI.language) {
            lan = WingoLanguageHI_1.WINGO_LAN_HI;
        }
        LanguageImpl_1.i18n[`${this.bundle}`] = {};
        LanguageImpl_1.i18n[`${this.bundle}`] = lan.data;
    }
    get bundle() {
        return "wingo";
    }
}
var Wingo;
(function (Wingo) {
    Wingo.gameData = new WingoGameData;
    let SOUNDS;
    (function (SOUNDS) {
        // 背景音乐
        SOUNDS["BGM"] = "audio/audio_bgm";
        // 321 倒计时
        SOUNDS["COUNT321"] = "audio/audio_count321";
        // 数字高亮
        SOUNDS["NUM_HIGHLIGHT"] = "audio/audio_wheel";
        // 数字结果
        SOUNDS["NUM_RESULT"] = "audio/audio-result";
    })(SOUNDS = Wingo.SOUNDS || (Wingo.SOUNDS = {}));
})(Wingo = exports.Wingo || (exports.Wingo = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvZGF0YS9XaW5nb0dhbWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNEI7OztBQUU1QixzRUFBbUU7QUFDbkUsa0ZBQXVFO0FBQ3ZFLHVFQUFvRTtBQUNwRSx1REFBaUQ7QUFDakQsdURBQWlEO0FBQ2pELHVEQUFpRDtBQUVqRCxNQUFNLGFBQWMsU0FBUSxtQkFBUTtJQUNoQyxnQkFBZ0I7UUFDWixJQUFJLEdBQUcsR0FBRyw4QkFBWSxDQUFDO1FBQ3ZCLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksOEJBQVksQ0FBQyxRQUFRLEVBQUU7WUFDekQsR0FBRyxHQUFHLDhCQUFZLENBQUM7U0FDdEI7YUFBTSxJQUFJLGlCQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLDhCQUFZLENBQUMsUUFBUSxFQUFFO1lBQ2hFLEdBQUcsR0FBRyw4QkFBWSxDQUFDO1NBQ3RCO1FBQ0QsbUJBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QixtQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBRUQsSUFBaUIsS0FBSyxDQWFyQjtBQWJELFdBQWlCLEtBQUs7SUFDTCxjQUFRLEdBQUcsSUFBSSxhQUFhLENBQUM7SUFFMUMsSUFBWSxNQVNYO0lBVEQsV0FBWSxNQUFNO1FBQ2QsT0FBTztRQUNQLGlDQUF1QixDQUFBO1FBQ3ZCLFVBQVU7UUFDViwyQ0FBaUMsQ0FBQTtRQUNqQyxPQUFPO1FBQ1AsNkNBQW1DLENBQUE7UUFDbkMsT0FBTztRQUNQLDJDQUFpQyxDQUFBO0lBQ3JDLENBQUMsRUFUVyxNQUFNLEdBQU4sWUFBTSxLQUFOLFlBQU0sUUFTakI7QUFDTCxDQUFDLEVBYmdCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQWFyQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKkBAZGVzY3JpcHRpb24g5b635bee5omR5YWL5ri45oiP5pWw5o2uICovXG5cbmltcG9ydCB7IEdhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vYmFzZS9HYW1lRGF0YVwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgV0lOR09fTEFOX0VOIH0gZnJvbSBcIi4vV2luZ29MYW5ndWFnZUVOXCI7XG5pbXBvcnQgeyBXSU5HT19MQU5fWkggfSBmcm9tIFwiLi9XaW5nb0xhbmd1YWdlWkhcIjtcbmltcG9ydCB7IFdJTkdPX0xBTl9ISSB9IGZyb20gXCIuL1dpbmdvTGFuZ3VhZ2VISVwiO1xuXG5jbGFzcyBXaW5nb0dhbWVEYXRhIGV4dGVuZHMgR2FtZURhdGEge1xuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UoKSB7XG4gICAgICAgIGxldCBsYW4gPSBXSU5HT19MQU5fWkg7XG4gICAgICAgIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT0gV0lOR09fTEFOX0VOLmxhbmd1YWdlKSB7XG4gICAgICAgICAgICBsYW4gPSBXSU5HT19MQU5fRU47XG4gICAgICAgIH0gZWxzZSBpZiAoTWFuYWdlci5sYW5ndWFnZS5nZXRMYW5ndWFnZSgpID09IFdJTkdPX0xBTl9ISS5sYW5ndWFnZSkge1xuICAgICAgICAgICAgbGFuID0gV0lOR09fTEFOX0hJO1xuICAgICAgICB9XG4gICAgICAgIGkxOG5bYCR7dGhpcy5idW5kbGV9YF0gPSB7fTtcbiAgICAgICAgaTE4bltgJHt0aGlzLmJ1bmRsZX1gXSA9IGxhbi5kYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYnVuZGxlKCkge1xuICAgICAgICByZXR1cm4gXCJ3aW5nb1wiO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBXaW5nbyB7XG4gICAgZXhwb3J0IGNvbnN0IGdhbWVEYXRhID0gbmV3IFdpbmdvR2FtZURhdGE7XG5cbiAgICBleHBvcnQgZW51bSBTT1VORFMge1xuICAgICAgICAvLyDog4zmma/pn7PkuZBcbiAgICAgICAgQkdNID0gXCJhdWRpby9hdWRpb19iZ21cIixcbiAgICAgICAgLy8gMzIxIOWAkuiuoeaXtlxuICAgICAgICBDT1VOVDMyMSA9IFwiYXVkaW8vYXVkaW9fY291bnQzMjFcIixcbiAgICAgICAgLy8g5pWw5a2X6auY5LquXG4gICAgICAgIE5VTV9ISUdITElHSFQgPSBcImF1ZGlvL2F1ZGlvX3doZWVsXCIsXG4gICAgICAgIC8vIOaVsOWtl+e7k+aenFxuICAgICAgICBOVU1fUkVTVUxUID0gXCJhdWRpby9hdWRpby1yZXN1bHRcIixcbiAgICB9XG59XG4iXX0=