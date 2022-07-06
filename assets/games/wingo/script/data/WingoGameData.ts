/**@@description 德州扑克游戏数据 */

import { GameData } from "../../../../script/common/base/GameData";
import { i18n } from "../../../../script/common/language/LanguageImpl";
import { Manager } from "../../../../script/common/manager/Manager";
import { WINGO_LAN_EN } from "./WingoLanguageEN";
import { WINGO_LAN_ZH } from "./WingoLanguageZH";
import { WINGO_LAN_HI } from "./WingoLanguageHI";

class WingoGameData extends GameData {
    onLanguageChange() {
        let lan = WINGO_LAN_ZH;
        if (Manager.language.getLanguage() == WINGO_LAN_EN.language) {
            lan = WINGO_LAN_EN;
        } else if (Manager.language.getLanguage() == WINGO_LAN_HI.language) {
            lan = WINGO_LAN_HI;
        }
        i18n[`${this.bundle}`] = {};
        i18n[`${this.bundle}`] = lan.data;
    }

    public get bundle() {
        return "wingo";
    }
}

export namespace Wingo {
    export const gameData = new WingoGameData;

    export enum SOUNDS {
        // 背景音乐
        BGM = "audio/audio_bgm",
        // 321 倒计时
        COUNT321 = "audio/audio_count321",
        // 数字高亮
        NUM_HIGHLIGHT = "audio/audio_wheel",
        // 数字结果
        NUM_RESULT = "audio/audio-result",
    }
}
