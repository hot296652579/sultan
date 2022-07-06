
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageImpl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQTZCOzs7QUFHN0IsNkNBQTBDO0FBQzFDLDZDQUEwQztBQUMxQyw2Q0FBMEM7QUFFL0IsUUFBQSxJQUFJLEdBQUcsdUJBQVUsQ0FBQztBQUU3QixNQUFhLFlBQVk7SUFFZCxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RixJQUFJLENBQUUsUUFBaUI7UUFDbkIsWUFBSSxHQUFHLHVCQUFVLENBQUM7UUFDbEIsSUFBSyxRQUFRLElBQUksUUFBUSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFFO1lBQzlDLFlBQUksR0FBRyx1QkFBVSxDQUFDO1NBQ3JCO2FBQUssSUFBRyxRQUFRLElBQUksUUFBUSxJQUFJLHVCQUFVLENBQUMsUUFBUSxFQUFFO1lBQ2xELFlBQUksR0FBRyx1QkFBVSxDQUFDO1NBQ3JCO1FBQ0QsTUFBTTtRQUNOLE9BQU8sWUFBSSxDQUFDO0lBQ2hCLENBQUM7O0FBWkwsb0NBYUM7QUFaa0Isc0JBQVMsR0FBaUIsSUFBSSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqQGRlc2NyaXB0aW9uIOivreiogOWMheWFt+S9k+eahOS7o+eggeWunueOsCAqL1xuXG5pbXBvcnQgeyBMYW5ndWFnZURlbGVnYXRlLCBMYW5ndWFnZURhdGEgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvTGFuZ3VhZ2VcIjtcbmltcG9ydCB7IExhbmd1YWdlWkggfSBmcm9tIFwiLi9MYW5ndWFnZVpIXCI7XG5pbXBvcnQgeyBMYW5ndWFnZUVOIH0gZnJvbSBcIi4vTGFuZ3VhZ2VFTlwiO1xuaW1wb3J0IHsgTGFuZ3VhZ2VISSB9IGZyb20gXCIuL0xhbmd1YWdlSElcIjtcblxuZXhwb3J0IGxldCBpMThuID0gTGFuZ3VhZ2VFTjtcblxuZXhwb3J0IGNsYXNzIExhbmd1YWdlSW1wbCBpbXBsZW1lbnRzIExhbmd1YWdlRGVsZWdhdGV7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMYW5ndWFnZUltcGwgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgTGFuZ3VhZ2VJbXBsKCkpOyB9XG4gICAgZGF0YSggbGFuZ3VhZ2UgOiBzdHJpbmcgKTogTGFuZ3VhZ2VEYXRhIHtcbiAgICAgICAgaTE4biA9IExhbmd1YWdlRU47XG4gICAgICAgIGlmICggbGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UgPT0gTGFuZ3VhZ2VaSC5sYW5ndWFnZSApe1xuICAgICAgICAgICAgaTE4biA9IExhbmd1YWdlWkg7XG4gICAgICAgIH1lbHNlIGlmKGxhbmd1YWdlICYmIGxhbmd1YWdlID09IExhbmd1YWdlSEkubGFuZ3VhZ2UgKXtcbiAgICAgICAgICAgIGkxOG4gPSBMYW5ndWFnZUhJO1xuICAgICAgICB9XG4gICAgICAgIC8v6buY6K6k5Lit5paHXG4gICAgICAgIHJldHVybiBpMThuO1xuICAgIH1cbn0iXX0=