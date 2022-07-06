import { Language } from "./base/Language";
import { EventDispatcher } from "./event/EventDispatcher";
import { DataBase } from "./database/DataBase";
import { UIManager } from "./base/UIManager";
import { LocalStorage } from "./base/LocalStorage";
import { AssetManager } from "./assetManager/AssetManager";
import { CacheManager } from "./assetManager/CacheManager";
import { getSingleton } from "./base/Singleton";
import { Adaptor } from "./adaptor/Adaptor";

export class _FramewokManager {

    /**@description 语言包 */
    get language() {
        return getSingleton(Language);
    }

    /**@description 事件派发器 */
    get eventDispatcher() {
        return getSingleton(EventDispatcher);
    }

    /**@description 数据库，仅web下可用 */
    get dataBase() {
        return getSingleton(DataBase);
    }

    /**@description 界面管理器 */
    get uiManager() {
        return getSingleton(UIManager);
    }

    /**@description 本地仓库 */
    get localStorage() {
        return getSingleton(LocalStorage);
    }

    /**@description 资源管理器 */
    get assetManager() {
        return getSingleton(AssetManager);
    }

    /**@description 资源缓存管理器 */
    get cacheManager() {
        return getSingleton(CacheManager);
    }

    /**@description 屏幕适配 */
    get adaptor() {
        return getSingleton(Adaptor);
    }
}

export const Manager = new _FramewokManager();