/**@@description 德州扑克游戏数据 */

import { GameData } from "../../../../script/common/base/GameData";
import { i18n } from "../../../../script/common/language/LanguageImpl";
import { Manager } from "../../../../script/common/manager/Manager";
import { ROULETTE_LAN_EN } from "./RouletteLanguageEN";
import { ROULETTE_LAN_ZH } from "./RouletteLanguageZH";
import { ROULETTE_LAN_HI } from "./RouletteLanguageHI";

class RouletteGameData extends GameData {
    onLanguageChange() {
        let lan = ROULETTE_LAN_ZH;
        if (Manager.language.getLanguage() == ROULETTE_LAN_EN.language) {
            lan = ROULETTE_LAN_EN;
        } else if (Manager.language.getLanguage() == ROULETTE_LAN_HI.language) {
            lan = ROULETTE_LAN_HI;
        }
        i18n[`${this.bundle}`] = {};
        i18n[`${this.bundle}`] = lan.data;
    }

    public get bundle() {
        return "roulette";
    }
}

export namespace Roulette {
    export const gameData = new RouletteGameData;

    export enum SOUNDS {
        // 背景音乐
        BGM = "audio/audio_bgm",
        // 转盘
        RUN = "audio/audio_zhuanpan01",
        // 结果
        RESULT = "audio/audio_result",
    }
}
