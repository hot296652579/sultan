
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/data/RouletteGameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0b445EKiz9IaY9Rv+eyIgkd', 'RouletteGameData');
// games/roulette/script/data/RouletteGameData.ts

"use strict";
/**@@description 德州扑克游戏数据 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roulette = void 0;
const GameData_1 = require("../../../../script/common/base/GameData");
const LanguageImpl_1 = require("../../../../script/common/language/LanguageImpl");
const Manager_1 = require("../../../../script/common/manager/Manager");
const RouletteLanguageEN_1 = require("./RouletteLanguageEN");
const RouletteLanguageZH_1 = require("./RouletteLanguageZH");
const RouletteLanguageHI_1 = require("./RouletteLanguageHI");
class RouletteGameData extends GameData_1.GameData {
    onLanguageChange() {
        let lan = RouletteLanguageZH_1.ROULETTE_LAN_ZH;
        if (Manager_1.Manager.language.getLanguage() == RouletteLanguageEN_1.ROULETTE_LAN_EN.language) {
            lan = RouletteLanguageEN_1.ROULETTE_LAN_EN;
        }
        else if (Manager_1.Manager.language.getLanguage() == RouletteLanguageHI_1.ROULETTE_LAN_HI.language) {
            lan = RouletteLanguageHI_1.ROULETTE_LAN_HI;
        }
        LanguageImpl_1.i18n[`${this.bundle}`] = {};
        LanguageImpl_1.i18n[`${this.bundle}`] = lan.data;
    }
    get bundle() {
        return "roulette";
    }
}
var Roulette;
(function (Roulette) {
    Roulette.gameData = new RouletteGameData;
    let SOUNDS;
    (function (SOUNDS) {
        // 背景音乐
        SOUNDS["BGM"] = "audio/audio_bgm";
        // 转盘
        SOUNDS["RUN"] = "audio/audio_zhuanpan01";
        // 结果
        SOUNDS["RESULT"] = "audio/audio_result";
    })(SOUNDS = Roulette.SOUNDS || (Roulette.SOUNDS = {}));
})(Roulette = exports.Roulette || (exports.Roulette = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvZGF0YS9Sb3VsZXR0ZUdhbWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBNEI7OztBQUU1QixzRUFBbUU7QUFDbkUsa0ZBQXVFO0FBQ3ZFLHVFQUFvRTtBQUNwRSw2REFBdUQ7QUFDdkQsNkRBQXVEO0FBQ3ZELDZEQUF1RDtBQUV2RCxNQUFNLGdCQUFpQixTQUFRLG1CQUFRO0lBQ25DLGdCQUFnQjtRQUNaLElBQUksR0FBRyxHQUFHLG9DQUFlLENBQUM7UUFDMUIsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxvQ0FBZSxDQUFDLFFBQVEsRUFBRTtZQUM1RCxHQUFHLEdBQUcsb0NBQWUsQ0FBQztTQUN6QjthQUFNLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksb0NBQWUsQ0FBQyxRQUFRLEVBQUU7WUFDbkUsR0FBRyxHQUFHLG9DQUFlLENBQUM7U0FDekI7UUFDRCxtQkFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVCLG1CQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0NBQ0o7QUFFRCxJQUFpQixRQUFRLENBV3hCO0FBWEQsV0FBaUIsUUFBUTtJQUNSLGlCQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztJQUU3QyxJQUFZLE1BT1g7SUFQRCxXQUFZLE1BQU07UUFDZCxPQUFPO1FBQ1AsaUNBQXVCLENBQUE7UUFDdkIsS0FBSztRQUNMLHdDQUE4QixDQUFBO1FBQzlCLEtBQUs7UUFDTCx1Q0FBNkIsQ0FBQTtJQUNqQyxDQUFDLEVBUFcsTUFBTSxHQUFOLGVBQU0sS0FBTixlQUFNLFFBT2pCO0FBQ0wsQ0FBQyxFQVhnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQVd4QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKkBAZGVzY3JpcHRpb24g5b635bee5omR5YWL5ri45oiP5pWw5o2uICovXG5cbmltcG9ydCB7IEdhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vYmFzZS9HYW1lRGF0YVwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgUk9VTEVUVEVfTEFOX0VOIH0gZnJvbSBcIi4vUm91bGV0dGVMYW5ndWFnZUVOXCI7XG5pbXBvcnQgeyBST1VMRVRURV9MQU5fWkggfSBmcm9tIFwiLi9Sb3VsZXR0ZUxhbmd1YWdlWkhcIjtcbmltcG9ydCB7IFJPVUxFVFRFX0xBTl9ISSB9IGZyb20gXCIuL1JvdWxldHRlTGFuZ3VhZ2VISVwiO1xuXG5jbGFzcyBSb3VsZXR0ZUdhbWVEYXRhIGV4dGVuZHMgR2FtZURhdGEge1xuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UoKSB7XG4gICAgICAgIGxldCBsYW4gPSBST1VMRVRURV9MQU5fWkg7XG4gICAgICAgIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT0gUk9VTEVUVEVfTEFOX0VOLmxhbmd1YWdlKSB7XG4gICAgICAgICAgICBsYW4gPSBST1VMRVRURV9MQU5fRU47XG4gICAgICAgIH0gZWxzZSBpZiAoTWFuYWdlci5sYW5ndWFnZS5nZXRMYW5ndWFnZSgpID09IFJPVUxFVFRFX0xBTl9ISS5sYW5ndWFnZSkge1xuICAgICAgICAgICAgbGFuID0gUk9VTEVUVEVfTEFOX0hJO1xuICAgICAgICB9XG4gICAgICAgIGkxOG5bYCR7dGhpcy5idW5kbGV9YF0gPSB7fTtcbiAgICAgICAgaTE4bltgJHt0aGlzLmJ1bmRsZX1gXSA9IGxhbi5kYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYnVuZGxlKCkge1xuICAgICAgICByZXR1cm4gXCJyb3VsZXR0ZVwiO1xuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBSb3VsZXR0ZSB7XG4gICAgZXhwb3J0IGNvbnN0IGdhbWVEYXRhID0gbmV3IFJvdWxldHRlR2FtZURhdGE7XG5cbiAgICBleHBvcnQgZW51bSBTT1VORFMge1xuICAgICAgICAvLyDog4zmma/pn7PkuZBcbiAgICAgICAgQkdNID0gXCJhdWRpby9hdWRpb19iZ21cIixcbiAgICAgICAgLy8g6L2s55uYXG4gICAgICAgIFJVTiA9IFwiYXVkaW8vYXVkaW9femh1YW5wYW4wMVwiLFxuICAgICAgICAvLyDnu5PmnpxcbiAgICAgICAgUkVTVUxUID0gXCJhdWRpby9hdWRpb19yZXN1bHRcIixcbiAgICB9XG59XG4iXX0=