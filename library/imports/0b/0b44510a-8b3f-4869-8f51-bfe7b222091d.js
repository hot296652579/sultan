"use strict";
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