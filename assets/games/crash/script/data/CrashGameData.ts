/**@@description 德州扑克游戏数据 */

import { GameData } from "../../../../script/common/base/GameData";
import { i18n } from "../../../../script/common/language/LanguageImpl";
import { Manager } from "../../../../script/common/manager/Manager";
import { CRASH_LAN_EN } from "./CrashLanguageEN";
import { CRASH_LAN_ZH } from "./CrashLanguageZH";
import { CRASH_LAN_HI } from "./CrashLanguageHI";

class CrashGameData extends GameData {
    onLanguageChange() {
        let lan = CRASH_LAN_ZH;
        if (Manager.language.getLanguage() == CRASH_LAN_EN.language) {
            lan = CRASH_LAN_EN;
        } else if (Manager.language.getLanguage() == CRASH_LAN_HI.language) {
            lan = CRASH_LAN_HI;
        }
        i18n[`${this.bundle}`] = {};
        i18n[`${this.bundle}`] = lan.data;
    }

    public get bundle() {
        return "crash";
    }
}

export namespace Crash {
    export const gameData = new CrashGameData;

    export enum SOUNDS {
        // 背景音乐
        BGM = "audio/audio_bgm",
        // 火箭飞
        ROCKET_FLY = "audio/audio_fly",
        // 爆炸
        ROCKET_BOMB = "audio/audio_bomb",
    }
}
