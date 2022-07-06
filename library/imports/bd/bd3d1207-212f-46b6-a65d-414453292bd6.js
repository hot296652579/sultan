"use strict";
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