"use strict";
cc._RF.push(module, 'd4760sSVC1OF61w5itElGvR', 'LanguageImpl');
// script/common/language/LanguageImpl.ts

"use strict";
/**@description 语言包具体的代码实现 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageImpl = exports.i18n = void 0;
const LanguageZH_1 = require("./LanguageZH");
const LanguageEN_1 = require("./LanguageEN");
const LanguageHI_1 = require("./LanguageHI");
exports.i18n = LanguageEN_1.LanguageEN;
class LanguageImpl {
    static Instance() { return this._instance || (this._instance = new LanguageImpl()); }
    data(language) {
        exports.i18n = LanguageEN_1.LanguageEN;
        if (language && language == LanguageZH_1.LanguageZH.language) {
            exports.i18n = LanguageZH_1.LanguageZH;
        }
        else if (language && language == LanguageHI_1.LanguageHI.language) {
            exports.i18n = LanguageHI_1.LanguageHI;
        }
        //默认中文
        return exports.i18n;
    }
}
exports.LanguageImpl = LanguageImpl;
LanguageImpl._instance = null;

cc._RF.pop();