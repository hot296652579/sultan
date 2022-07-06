"use strict";
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