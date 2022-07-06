/**@description 语言包具体的代码实现 */

import { LanguageDelegate, LanguageData } from "../../framework/base/Language";
import { LanguageZH } from "./LanguageZH";
import { LanguageEN } from "./LanguageEN";
import { LanguageHI } from "./LanguageHI";

export let i18n = LanguageEN;

export class LanguageImpl implements LanguageDelegate{
    private static _instance: LanguageImpl = null;
    public static Instance() { return this._instance || (this._instance = new LanguageImpl()); }
    data( language : string ): LanguageData {
        i18n = LanguageEN;
        if ( language && language == LanguageZH.language ){
            i18n = LanguageZH;
        }else if(language && language == LanguageHI.language ){
            i18n = LanguageHI;
        }
        //默认中文
        return i18n;
    }
}