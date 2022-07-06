
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/Framework.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL0ZyYW1ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBMkM7QUFDM0MsNkRBQTBEO0FBQzFELGtEQUErQztBQUMvQyxnREFBNkM7QUFDN0Msc0RBQW1EO0FBQ25ELDhEQUEyRDtBQUMzRCw4REFBMkQ7QUFDM0QsZ0RBQWdEO0FBQ2hELCtDQUE0QztBQUU1QyxNQUFhLGdCQUFnQjtJQUV6QixzQkFBc0I7SUFDdEIsSUFBSSxRQUFRO1FBQ1IsT0FBTyx3QkFBWSxDQUFDLG1CQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksZUFBZTtRQUNmLE9BQU8sd0JBQVksQ0FBQyxpQ0FBZSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFJLFFBQVE7UUFDUixPQUFPLHdCQUFZLENBQUMsbUJBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIsSUFBSSxTQUFTO1FBQ1QsT0FBTyx3QkFBWSxDQUFDLHFCQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLElBQUksWUFBWTtRQUNaLE9BQU8sd0JBQVksQ0FBQywyQkFBWSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHdCQUF3QjtJQUN4QixJQUFJLFlBQVk7UUFDWixPQUFPLHdCQUFZLENBQUMsMkJBQVksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCwwQkFBMEI7SUFDMUIsSUFBSSxZQUFZO1FBQ1osT0FBTyx3QkFBWSxDQUFDLDJCQUFZLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLElBQUksT0FBTztRQUNQLE9BQU8sd0JBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKO0FBekNELDRDQXlDQztBQUVZLFFBQUEsT0FBTyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhbmd1YWdlIH0gZnJvbSBcIi4vYmFzZS9MYW5ndWFnZVwiO1xuaW1wb3J0IHsgRXZlbnREaXNwYXRjaGVyIH0gZnJvbSBcIi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyXCI7XG5pbXBvcnQgeyBEYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlL0RhdGFCYXNlXCI7XG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi9iYXNlL1VJTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vYmFzZS9Mb2NhbFN0b3JhZ2VcIjtcbmltcG9ydCB7IEFzc2V0TWFuYWdlciB9IGZyb20gXCIuL2Fzc2V0TWFuYWdlci9Bc3NldE1hbmFnZXJcIjtcbmltcG9ydCB7IENhY2hlTWFuYWdlciB9IGZyb20gXCIuL2Fzc2V0TWFuYWdlci9DYWNoZU1hbmFnZXJcIjtcbmltcG9ydCB7IGdldFNpbmdsZXRvbiB9IGZyb20gXCIuL2Jhc2UvU2luZ2xldG9uXCI7XG5pbXBvcnQgeyBBZGFwdG9yIH0gZnJvbSBcIi4vYWRhcHRvci9BZGFwdG9yXCI7XG5cbmV4cG9ydCBjbGFzcyBfRnJhbWV3b2tNYW5hZ2VyIHtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDor63oqIDljIUgKi9cbiAgICBnZXQgbGFuZ3VhZ2UoKSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGV0b24oTGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDkuovku7bmtL7lj5HlmaggKi9cbiAgICBnZXQgZXZlbnREaXNwYXRjaGVyKCkge1xuICAgICAgICByZXR1cm4gZ2V0U2luZ2xldG9uKEV2ZW50RGlzcGF0Y2hlcik7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOaVsOaNruW6k++8jOS7hXdlYuS4i+WPr+eUqCAqL1xuICAgIGdldCBkYXRhQmFzZSgpIHtcbiAgICAgICAgcmV0dXJuIGdldFNpbmdsZXRvbihEYXRhQmFzZSk7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOeVjOmdoueuoeeQhuWZqCAqL1xuICAgIGdldCB1aU1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGV0b24oVUlNYW5hZ2VyKTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5pys5Zyw5LuT5bqTICovXG4gICAgZ2V0IGxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgcmV0dXJuIGdldFNpbmdsZXRvbihMb2NhbFN0b3JhZ2UpO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDotYTmupDnrqHnkIblmaggKi9cbiAgICBnZXQgYXNzZXRNYW5hZ2VyKCkge1xuICAgICAgICByZXR1cm4gZ2V0U2luZ2xldG9uKEFzc2V0TWFuYWdlcik7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi1hOa6kOe8k+WtmOeuoeeQhuWZqCAqL1xuICAgIGdldCBjYWNoZU1hbmFnZXIoKSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGV0b24oQ2FjaGVNYW5hZ2VyKTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5bGP5bmV6YCC6YWNICovXG4gICAgZ2V0IGFkYXB0b3IoKSB7XG4gICAgICAgIHJldHVybiBnZXRTaW5nbGV0b24oQWRhcHRvcik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTWFuYWdlciA9IG5ldyBfRnJhbWV3b2tNYW5hZ2VyKCk7Il19