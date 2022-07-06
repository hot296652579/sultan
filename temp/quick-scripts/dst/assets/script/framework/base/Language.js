
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/Language.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9dd04SnyLlDxaxIql2b+JXA', 'Language');
// script/framework/base/Language.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const EventApi_1 = require("../event/EventApi");
const Defines_1 = require("./Defines");
const Framework_1 = require("../Framework");
const LANG_KEY = "using_language";
class Language {
    constructor() {
        this._data = { language: "unknown" };
    }
    static Instance() { return this._instance || (this._instance = new Language()); }
    set delegate(value) {
        this._delegate = value;
        this.change(this.getLanguage());
    }
    get delegate() {
        return this._delegate;
    }
    /**
     * @description 改变语言包
     * @param language 语言包类型
     */
    change(language) {
        if (!this.delegate) {
            //请先设置代理
            return;
        }
        if (this._data && this._data.language == language) {
            //当前有语言包数据 相同语言包，不再进行设置
            return;
        }
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this._data = this.delegate.data(language);
            Framework_1.Manager.localStorage.setItem(LANG_KEY, this._data.language);
            dispatch(EventApi_1.EventApi.CHANGE_LANGUAGE, language);
        }
        else {
            this._data = this.delegate.data(this.getLanguage());
            Framework_1.Manager.localStorage.setItem(LANG_KEY, this._data.language);
        }
    }
    get(args) {
        let result = "";
        do {
            if (!!!args)
                break;
            if (args.length < 1)
                break;
            let keyString = args[0];
            if (typeof keyString != "string") {
                cc.error("key error");
                break;
            }
            if (keyString.indexOf(Defines_1.USING_LAN_KEY) > -1) {
                let keys = keyString.split(".");
                if (keys.length < 2) {
                    cc.error("key error");
                    break;
                }
                keys.shift(); //删除掉i18n.的头部
                args.shift();
                result = this._data[keys[0]];
                if (!result) {
                    cc.error(`语言包不存在 : ${keyString}`);
                    break;
                }
                let i = 1;
                for (; i < keys.length; i++) {
                    if (result[keys[i]] == undefined) {
                        break;
                    }
                    result = result[keys[i]];
                }
                if (i != keys.length) {
                    cc.error(`语言包不存在 : ${keyString}`);
                }
                result = String.format(result, args);
            }
            else {
                //已经是取出的正确语言包，直接格式化
                keyString = args.shift();
                return String.format(keyString, args);
            }
        } while (0);
        return result;
    }
    /**@description 获取语言包名 */
    getLanguage() {
        // return Manager.localStorage.getItem(LANG_KEY, cc.sys.LANGUAGE_CHINESE);
        return Framework_1.Manager.localStorage.getItem(LANG_KEY, cc.sys.LANGUAGE_ENGLISH);
    }
}
exports.Language = Language;
Language._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvTGFuZ3VhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQTZDO0FBQzdDLHVDQUFrRTtBQUNsRSw0Q0FBdUM7QUFDdkMsTUFBTSxRQUFRLEdBQVcsZ0JBQWdCLENBQUM7QUFVMUMsTUFBYSxRQUFRO0lBQXJCO1FBS1ksVUFBSyxHQUFpQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQW1GMUQsQ0FBQztJQXJGVSxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUl4RixJQUFXLFFBQVEsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNELElBQVcsUUFBUTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLFFBQVE7WUFDUixPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1lBQy9DLHVCQUF1QjtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFLLGdDQUFzQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsbUJBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMs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Y2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTaW5nbGV0b24gfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvU2luZ2xldG9uXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSwgVVNJTkdfTEFOX0tFWSB9IGZyb20gXCIuL0RlZmluZXNcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vRnJhbWV3b3JrXCI7XG5jb25zdCBMQU5HX0tFWTogc3RyaW5nID0gXCJ1c2luZ19sYW5ndWFnZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExhbmd1YWdlRGF0YSB7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMYW5ndWFnZURlbGVnYXRlIHtcbiAgICBkYXRhKGxhbmd1YWdlOiBzdHJpbmcpOiBMYW5ndWFnZURhdGE7XG59XG5cbmV4cG9ydCBjbGFzcyBMYW5ndWFnZSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IExhbmd1YWdlID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IExhbmd1YWdlKCkpOyB9XG5cbiAgICBwcml2YXRlIF9kYXRhOiBMYW5ndWFnZURhdGEgPSB7IGxhbmd1YWdlOiBcInVua25vd25cIiB9O1xuICAgIHByaXZhdGUgX2RlbGVnYXRlOiBMYW5ndWFnZURlbGVnYXRlO1xuICAgIHB1YmxpYyBzZXQgZGVsZWdhdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2UodGhpcy5nZXRMYW5ndWFnZSgpKTtcbiAgICB9XG4gICAgcHVibGljIGdldCBkZWxlZ2F0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLnlj5jor63oqIDljIVcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2Ug6K+t6KiA5YyF57G75Z6LXG4gICAgICovXG4gICAgcHVibGljIGNoYW5nZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5kZWxlZ2F0ZSkge1xuICAgICAgICAgICAgLy/or7flhYjorr7nva7ku6PnkIZcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZGF0YSAmJiB0aGlzLl9kYXRhLmxhbmd1YWdlID09IGxhbmd1YWdlKSB7XG4gICAgICAgICAgICAvL+W9k+WJjeacieivreiogOWMheaVsOaNriDnm7jlkIzor63oqIDljIXvvIzkuI3lho3ov5vooYzorr7nva5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgKXtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLmRlbGVnYXRlLmRhdGEobGFuZ3VhZ2UpO1xuICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShMQU5HX0tFWSwgdGhpcy5fZGF0YS5sYW5ndWFnZSk7XG4gICAgICAgICAgICBkaXNwYXRjaChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsbGFuZ3VhZ2UpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLmRlbGVnYXRlLmRhdGEodGhpcy5nZXRMYW5ndWFnZSgpKTtcbiAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oTEFOR19LRVksIHRoaXMuX2RhdGEubGFuZ3VhZ2UpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KGFyZ3M6IChzdHJpbmcgfCBudW1iZXIpW10pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICghISFhcmdzKSBicmVhaztcbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDEpIGJyZWFrO1xuICAgICAgICAgICAgbGV0IGtleVN0cmluZyA9IGFyZ3NbMF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleVN0cmluZyAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJrZXkgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoa2V5U3RyaW5nLmluZGV4T2YoVVNJTkdfTEFOX0tFWSkgPiAtMSApIHtcblxuICAgICAgICAgICAgICAgIGxldCBrZXlzID0ga2V5U3RyaW5nLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKFwia2V5IGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5cy5zaGlmdCgpOy8v5Yig6Zmk5o6JaTE4bi7nmoTlpLTpg6hcbiAgICAgICAgICAgICAgICBhcmdzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZGF0YVtrZXlzWzBdXTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihg6K+t6KiA5YyF5LiN5a2Y5ZyoIDogJHtrZXlTdHJpbmd9YCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgaSA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICg7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRba2V5c1tpXV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRba2V5c1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpICE9IGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGDor63oqIDljIXkuI3lrZjlnKggOiAke2tleVN0cmluZ31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gU3RyaW5nLmZvcm1hdChyZXN1bHQsIGFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+W3sue7j+aYr+WPluWHuueahOato+ehruivreiogOWMhe+8jOebtOaOpeagvOW8j+WMllxuICAgICAgICAgICAgICAgIGtleVN0cmluZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZvcm1hdChrZXlTdHJpbmcsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgwKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6I635Y+W6K+t6KiA5YyF5ZCNICovXG4gICAgcHVibGljIGdldExhbmd1YWdlKCkge1xuICAgICAgICAvLyByZXR1cm4gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMQU5HX0tFWSwgY2Muc3lzLkxBTkdVQUdFX0NISU5FU0UpO1xuICAgICAgICByZXR1cm4gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMQU5HX0tFWSwgY2Muc3lzLkxBTkdVQUdFX0VOR0xJU0gpO1xuICAgIH1cbn1cbiJdfQ==