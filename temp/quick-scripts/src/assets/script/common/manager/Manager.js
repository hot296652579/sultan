"use strict";
cc._RF.push(module, 'b461aTzwptH0o6X2ZMDgv+z', 'Manager');
// script/common/manager/Manager.ts

"use strict";
/**@description 管理器 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Framework_1 = require("../../framework/Framework");
const NetManager_1 = require("./NetManager");
const LogicManager_1 = require("./LogicManager");
const GlobalAudio_1 = __importDefault(require("../component/GlobalAudio"));
const Extentions_1 = require("../../framework/extentions/Extentions");
const CocosExtention_1 = require("../../framework/extentions/CocosExtention");
const LanguageImpl_1 = require("../language/LanguageImpl");
const Singleton_1 = require("../../framework/base/Singleton");
const Defines_1 = require("../../framework/base/Defines");
class _Manager extends Framework_1._FramewokManager {
    constructor() {
        super(...arguments);
        /**@description 全局网络播放声音组件，如播放按钮音效，弹出框音效等 */
        this._globalAudio = null;
        /**@description 当前游戏GameView, GameView进入onLoad赋值 */
        this.gameView = null;
        /**@description 游戏数据 */
        this.gameData = null;
    }
    /**@description 网络组件管理器 */
    get netManager() {
        return Singleton_1.getSingleton(NetManager_1.NetManager);
    }
    /**@description 逻辑控制器管理器 */
    get logicManager() {
        return Singleton_1.getSingleton(LogicManager_1.LogicManager);
    }
    get globalAudio() {
        // if ( this._globalAudio ){
        //     return this._globalAudio;
        // }
        this._globalAudio = this.uiManager.getCanvas().getComponent(GlobalAudio_1.default);
        return this._globalAudio;
    }
    /**
     * @description 把语言包转换成i18n.xxx形式
     * @param param 语言包配置
     * @param isUsingAssetBundle 是否使用currentGameBundle进行转换如在某游戏内，需要获取某游戏的语言包路径
     * @example
     * export let TANK_LAN_ZH = {
     * language: cc.sys.LANGUAGE_CHINESE,
     * data: {
     * title: `坦克大战`,
     * player: '单人模式 ',
     * palyers: '双人模式',
     * }
     * }
     * //以上是坦克大战的语言包,assetBundle为tankBattle
     * Manager.makeLanguage("title",true); //=> i18n.tankBattle.title 指向游戏特定的语言包
     * Manager.makeLanguage("title"); //=> i18n.title 指向的大厅的公共语言包
     */
    makeLanguage(param, isUsingAssetBundle = false) {
        if (typeof param == "string") {
            if (isUsingAssetBundle && this.gameData) {
                return `${Defines_1.USING_LAN_KEY}${this.gameData.bundle}.${param}`;
            }
            return `${Defines_1.USING_LAN_KEY}${param}`;
        }
        if (typeof param[0] == "string" && param instanceof Array) {
            if (isUsingAssetBundle && this.gameData) {
                param[0] = `${Defines_1.USING_LAN_KEY}${this.gameData.bundle}.${param[0]}`;
            }
            else {
                param[0] = `${Defines_1.USING_LAN_KEY}${param[0]}`;
            }
        }
        return param;
    }
    /**@description 获取语言包
     *
     */
    getLanguage(param, bundle = null) {
        let key = "";
        if (typeof param == "string") {
            if (bundle) {
                key = `${Defines_1.USING_LAN_KEY}${bundle}.${param}`;
            }
            else {
                key = `${Defines_1.USING_LAN_KEY}${param}`;
            }
            return this.language.get([key]);
        }
        if (typeof param[0] == "string" && param instanceof Array) {
            if (bundle) {
                param[0] = `${Defines_1.USING_LAN_KEY}${bundle}.${param[0]}`;
            }
            else {
                param[0] = `${Defines_1.USING_LAN_KEY}${param[0]}`;
            }
            return this.language.get(param);
        }
        cc.error(`传入参数有误`);
        return "";
    }
    init() {
        //日志
        // Log.logLevel = LogLevel.ERROR | LogLevel.LOG | LogLevel.WARN | LogLevel.DUMP;
        //适配
        this.adaptor.initBrowserAdaptor();
        //扩展
        Extentions_1.extentionsInit();
        //引擎扩展初始化
        CocosExtention_1.CocosExtentionInit();
        //语言包初始化
        //cc.log("language init");
        this.language.delegate = Singleton_1.getSingleton(LanguageImpl_1.LanguageImpl);
    }
}
exports.Manager = new _Manager();

cc._RF.pop();