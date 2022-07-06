"use strict";
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