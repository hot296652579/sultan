"use strict";
cc._RF.push(module, '62e5c5yqsdAGI6fxoZ3NCIO', 'Framework');
// script/framework/Framework.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = exports._FramewokManager = void 0;
const Language_1 = require("./base/Language");
const EventDispatcher_1 = require("./event/EventDispatcher");
const DataBase_1 = require("./database/DataBase");
const UIManager_1 = require("./base/UIManager");
const LocalStorage_1 = require("./base/LocalStorage");
const AssetManager_1 = require("./assetManager/AssetManager");
const CacheManager_1 = require("./assetManager/CacheManager");
const Singleton_1 = require("./base/Singleton");
const Adaptor_1 = require("./adaptor/Adaptor");
class _FramewokManager {
    /**@description 语言包 */
    get language() {
        return Singleton_1.getSingleton(Language_1.Language);
    }
    /**@description 事件派发器 */
    get eventDispatcher() {
        return Singleton_1.getSingleton(EventDispatcher_1.EventDispatcher);
    }
    /**@description 数据库，仅web下可用 */
    get dataBase() {
        return Singleton_1.getSingleton(DataBase_1.DataBase);
    }
    /**@description 界面管理器 */
    get uiManager() {
        return Singleton_1.getSingleton(UIManager_1.UIManager);
    }
    /**@description 本地仓库 */
    get localStorage() {
        return Singleton_1.getSingleton(LocalStorage_1.LocalStorage);
    }
    /**@description 资源管理器 */
    get assetManager() {
        return Singleton_1.getSingleton(AssetManager_1.AssetManager);
    }
    /**@description 资源缓存管理器 */
    get cacheManager() {
        return Singleton_1.getSingleton(CacheManager_1.CacheManager);
    }
    /**@description 屏幕适配 */
    get adaptor() {
        return Singleton_1.getSingleton(Adaptor_1.Adaptor);
    }
}
exports._FramewokManager = _FramewokManager;
exports.Manager = new _FramewokManager();

cc._RF.pop();