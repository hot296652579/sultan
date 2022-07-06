
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/manager/Manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0JBQXNCOzs7Ozs7QUFFdEIseURBQTZEO0FBQzdELDZDQUEwQztBQUMxQyxpREFBOEM7QUFDOUMsMkVBQW1EO0FBRW5ELHNFQUF1RTtBQUN2RSw4RUFBK0U7QUFDL0UsMkRBQXdEO0FBQ3hELDhEQUE4RDtBQUM5RCwwREFBNkQ7QUFJN0QsTUFBTSxRQUFTLFNBQVEsNEJBQWdCO0lBQXZDOztRQVlJLDRDQUE0QztRQUNwQyxpQkFBWSxHQUFnQixJQUFJLENBQUM7UUFTekMsbURBQW1EO1FBQ25ELGFBQVEsR0FBYSxJQUFJLENBQUM7UUFFMUIsdUJBQXVCO1FBQ3ZCLGFBQVEsR0FBYSxJQUFJLENBQUM7SUEwRTlCLENBQUM7SUFsR0csMEJBQTBCO0lBQzFCLElBQUksVUFBVTtRQUNWLE9BQU8sd0JBQVksQ0FBQyx1QkFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDJCQUEyQjtJQUMzQixJQUFJLFlBQVk7UUFDWixPQUFPLHdCQUFZLENBQUMsMkJBQVksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFJRCxJQUFJLFdBQVc7UUFDWCw0QkFBNEI7UUFDNUIsZ0NBQWdDO1FBQ2hDLElBQUk7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQztRQUN6RSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQVFEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsWUFBWSxDQUFDLEtBQW1DLEVBQUUscUJBQThCLEtBQUs7UUFDakYsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDMUIsSUFBSSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNyQyxPQUFPLEdBQUcsdUJBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzthQUM3RDtZQUNELE9BQU8sR0FBRyx1QkFBYSxHQUFHLEtBQUssRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUN2RCxJQUFJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLHVCQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0gsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsdUJBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUM1QztTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLEtBQW1DLEVBQUUsU0FBc0IsSUFBSTtRQUN2RSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUMxQixJQUFJLE1BQU0sRUFBRTtnQkFDUixHQUFHLEdBQUcsR0FBRyx1QkFBYSxHQUFHLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxHQUFHLEdBQUcsR0FBRyx1QkFBYSxHQUFHLEtBQUssRUFBRSxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1lBQ3ZELElBQUksTUFBTSxFQUFFO2dCQUNSLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLHVCQUFhLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLHVCQUFhLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDNUM7WUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSTtRQUNKLGdGQUFnRjtRQUNoRixJQUFJO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2xDLElBQUk7UUFDSiwyQkFBYyxFQUFFLENBQUM7UUFDakIsU0FBUztRQUNULG1DQUFrQixFQUFFLENBQUM7UUFDckIsUUFBUTtRQUNSLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyx3QkFBWSxDQUFDLDJCQUFZLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0NBQ0o7QUFFWSxRQUFBLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqQGRlc2NyaXB0aW9uIOeuoeeQhuWZqCAqL1xuXG5pbXBvcnQgeyBfRnJhbWV3b2tNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9GcmFtZXdvcmtcIjtcbmltcG9ydCB7IE5ldE1hbmFnZXIgfSBmcm9tIFwiLi9OZXRNYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2dpY01hbmFnZXIgfSBmcm9tIFwiLi9Mb2dpY01hbmFnZXJcIjtcbmltcG9ydCBHbG9iYWxBdWRpbyBmcm9tIFwiLi4vY29tcG9uZW50L0dsb2JhbEF1ZGlvXCI7XG5pbXBvcnQgeyBMb2csIExvZ0xldmVsIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9sb2cvTG9nXCI7XG5pbXBvcnQgeyBleHRlbnRpb25zSW5pdCB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXh0ZW50aW9ucy9FeHRlbnRpb25zXCI7XG5pbXBvcnQgeyBDb2Nvc0V4dGVudGlvbkluaXQgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V4dGVudGlvbnMvQ29jb3NFeHRlbnRpb25cIjtcbmltcG9ydCB7IExhbmd1YWdlSW1wbCB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IGdldFNpbmdsZXRvbiB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9TaW5nbGV0b25cIjtcbmltcG9ydCB7IFVTSU5HX0xBTl9LRVkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IEdhbWVWaWV3IGZyb20gXCIuLi9iYXNlL0dhbWVWaWV3XCI7XG5pbXBvcnQgeyBHYW1lRGF0YSB9IGZyb20gXCIuLi9iYXNlL0dhbWVEYXRhXCI7XG5cbmNsYXNzIF9NYW5hZ2VyIGV4dGVuZHMgX0ZyYW1ld29rTWFuYWdlciB7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g572R57uc57uE5Lu2566h55CG5ZmoICovXG4gICAgZ2V0IG5ldE1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGV0b24oTmV0TWFuYWdlcik7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOmAu+i+keaOp+WItuWZqOeuoeeQhuWZqCAqL1xuICAgIGdldCBsb2dpY01hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGV0b24oTG9naWNNYW5hZ2VyKTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5YWo5bGA572R57uc5pKt5pS+5aOw6Z+z57uE5Lu277yM5aaC5pKt5pS+5oyJ6ZKu6Z+z5pWI77yM5by55Ye65qGG6Z+z5pWI562JICovXG4gICAgcHJpdmF0ZSBfZ2xvYmFsQXVkaW86IEdsb2JhbEF1ZGlvID0gbnVsbDtcbiAgICBnZXQgZ2xvYmFsQXVkaW8oKSB7XG4gICAgICAgIC8vIGlmICggdGhpcy5fZ2xvYmFsQXVkaW8gKXtcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLl9nbG9iYWxBdWRpbztcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLl9nbG9iYWxBdWRpbyA9IHRoaXMudWlNYW5hZ2VyLmdldENhbnZhcygpLmdldENvbXBvbmVudChHbG9iYWxBdWRpbyk7XG4gICAgICAgIHJldHVybiB0aGlzLl9nbG9iYWxBdWRpbztcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN5ri45oiPR2FtZVZpZXcsIEdhbWVWaWV36L+b5YWlb25Mb2Fk6LWL5YC8ICovXG4gICAgZ2FtZVZpZXc6IEdhbWVWaWV3ID0gbnVsbDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmuLjmiI/mlbDmja4gKi9cbiAgICBnYW1lRGF0YTogR2FtZURhdGEgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOaKiuivreiogOWMhei9rOaNouaIkGkxOG4ueHh45b2i5byPXG4gICAgICogQHBhcmFtIHBhcmFtIOivreiogOWMhemFjee9rlxuICAgICAqIEBwYXJhbSBpc1VzaW5nQXNzZXRCdW5kbGUg5piv5ZCm5L2/55SoY3VycmVudEdhbWVCdW5kbGXov5vooYzovazmjaLlpoLlnKjmn5DmuLjmiI/lhoXvvIzpnIDopoHojrflj5bmn5DmuLjmiI/nmoTor63oqIDljIXot6/lvoRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGV4cG9ydCBsZXQgVEFOS19MQU5fWkggPSB7XG4gICAgICogbGFuZ3VhZ2U6IGNjLnN5cy5MQU5HVUFHRV9DSElORVNFLFxuICAgICAqIGRhdGE6IHtcbiAgICAgKiB0aXRsZTogYOWdpuWFi+Wkp+aImGAsXG4gICAgICogcGxheWVyOiAn5Y2V5Lq65qih5byPICcsXG4gICAgICogcGFseWVyczogJ+WPjOS6uuaooeW8jycsXG4gICAgICogfVxuICAgICAqIH1cbiAgICAgKiAvL+S7peS4iuaYr+WdpuWFi+Wkp+aImOeahOivreiogOWMhSxhc3NldEJ1bmRsZeS4unRhbmtCYXR0bGVcbiAgICAgKiBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcInRpdGxlXCIsdHJ1ZSk7IC8vPT4gaTE4bi50YW5rQmF0dGxlLnRpdGxlIOaMh+WQkea4uOaIj+eJueWumueahOivreiogOWMhVxuICAgICAqIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwidGl0bGVcIik7IC8vPT4gaTE4bi50aXRsZSDmjIflkJHnmoTlpKfljoXnmoTlhazlhbHor63oqIDljIVcbiAgICAgKi9cbiAgICBtYWtlTGFuZ3VhZ2UocGFyYW06IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10sIGlzVXNpbmdBc3NldEJ1bmRsZTogYm9vbGVhbiA9IGZhbHNlKTogKHN0cmluZyB8IG51bWJlcilbXSB8IHN0cmluZyB7XG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW0gPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKGlzVXNpbmdBc3NldEJ1bmRsZSAmJiB0aGlzLmdhbWVEYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke1VTSU5HX0xBTl9LRVl9JHt0aGlzLmdhbWVEYXRhLmJ1bmRsZX0uJHtwYXJhbX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGAke1VTSU5HX0xBTl9LRVl9JHtwYXJhbX1gO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1bMF0gPT0gXCJzdHJpbmdcIiAmJiBwYXJhbSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBpZiAoaXNVc2luZ0Fzc2V0QnVuZGxlICYmIHRoaXMuZ2FtZURhdGEpIHtcbiAgICAgICAgICAgICAgICBwYXJhbVswXSA9IGAke1VTSU5HX0xBTl9LRVl9JHt0aGlzLmdhbWVEYXRhLmJ1bmRsZX0uJHtwYXJhbVswXX1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbVswXSA9IGAke1VTSU5HX0xBTl9LRVl9JHtwYXJhbVswXX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6I635Y+W6K+t6KiA5YyFIFxuICAgICAqIFxuICAgICAqL1xuICAgIGdldExhbmd1YWdlKHBhcmFtOiBzdHJpbmcgfCAoc3RyaW5nIHwgbnVtYmVyKVtdLCBidW5kbGU6IEJVTkRMRV9UWVBFID0gbnVsbCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBrZXkgPSBcIlwiO1xuICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmIChidW5kbGUpIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBgJHtVU0lOR19MQU5fS0VZfSR7YnVuZGxlfS4ke3BhcmFtfWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleSA9IGAke1VTSU5HX0xBTl9LRVl9JHtwYXJhbX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2UuZ2V0KFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtWzBdID09IFwic3RyaW5nXCIgJiYgcGFyYW0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgaWYgKGJ1bmRsZSkge1xuICAgICAgICAgICAgICAgIHBhcmFtWzBdID0gYCR7VVNJTkdfTEFOX0tFWX0ke2J1bmRsZX0uJHtwYXJhbVswXX1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbVswXSA9IGAke1VTSU5HX0xBTl9LRVl9JHtwYXJhbVswXX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2UuZ2V0KHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5lcnJvcihg5Lyg5YWl5Y+C5pWw5pyJ6K+vYCk7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIC8v5pel5b+XXG4gICAgICAgIC8vIExvZy5sb2dMZXZlbCA9IExvZ0xldmVsLkVSUk9SIHwgTG9nTGV2ZWwuTE9HIHwgTG9nTGV2ZWwuV0FSTiB8IExvZ0xldmVsLkRVTVA7XG4gICAgICAgIC8v6YCC6YWNXG4gICAgICAgIHRoaXMuYWRhcHRvci5pbml0QnJvd3NlckFkYXB0b3IoKTtcbiAgICAgICAgLy/mianlsZVcbiAgICAgICAgZXh0ZW50aW9uc0luaXQoKTtcbiAgICAgICAgLy/lvJXmk47mianlsZXliJ3lp4vljJZcbiAgICAgICAgQ29jb3NFeHRlbnRpb25Jbml0KCk7XG4gICAgICAgIC8v6K+t6KiA5YyF5Yid5aeL5YyWXG4gICAgICAgIC8vY2MubG9nKFwibGFuZ3VhZ2UgaW5pdFwiKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5kZWxlZ2F0ZSA9IGdldFNpbmdsZXRvbihMYW5ndWFnZUltcGwpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTWFuYWdlciA9IG5ldyBfTWFuYWdlcigpOyJdfQ==