
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/assetManager/ResourceLoader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c2732/K5T1ACJsHnXRUvfbR', 'ResourceLoader');
// script/framework/assetManager/ResourceLoader.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceLoaderError = void 0;
const Defines_1 = require("../base/Defines");
const Framework_1 = require("../Framework");
var ResourceLoaderError;
(function (ResourceLoaderError) {
    /**@description 加载中 */
    ResourceLoaderError[ResourceLoaderError["LOADING"] = 0] = "LOADING";
    /** @description 未找到或设置加载资源*/
    ResourceLoaderError[ResourceLoaderError["NO_FOUND_LOAD_RESOURCE"] = 1] = "NO_FOUND_LOAD_RESOURCE";
    /**@description 完美加载 */
    ResourceLoaderError[ResourceLoaderError["SUCCESS"] = 2] = "SUCCESS";
})(ResourceLoaderError = exports.ResourceLoaderError || (exports.ResourceLoaderError = {}));
/**
 * @description 资源加载器
 */
class ResourceLoader {
    constructor() {
        /** @description 加载资源数据 */
        this._resources = new Map();
        /**@description 当前已经加载的资源数量 */
        this._loadedCount = 0;
        /**@description 加载完成后的数据，为了方便释放时精准释放，没加载成功的资源，不在做释放的判断 */
        this._loadedResource = new Map();
        /**@description 当前是否正在加载资源 */
        this._isLoading = false;
        /**@description 标识 */
        this._tag = null;
        /**@description 加载完成回调 */
        this._onLoadComplete = null;
        /**
         * @description 实现类必须给个需要加载资源
         */
        this._getLoadResource = null;
    }
    get tag() {
        return this._tag;
    }
    set tag(tag) {
        this._tag = tag;
    }
    set onLoadComplete(cb) {
        this._onLoadComplete = cb;
    }
    get onLoadComplete() {
        return this._onLoadComplete;
    }
    set onLoadProgress(value) {
        this._onLoadProgress = value;
    }
    get onLoadProgress() {
        return this._onLoadProgress;
    }
    set getLoadResources(func) {
        this._getLoadResource = func;
    }
    get getLoadResources() {
        return this._getLoadResource;
    }
    /**
     * @description 加载资源
     */
    loadResources() {
        if (!this.getLoadResources) {
            if (CC_DEBUG)
                cc.error("未指定 getLoadResources 函数");
            this.onLoadComplete && this.onLoadComplete(ResourceLoaderError.NO_FOUND_LOAD_RESOURCE);
            return;
        }
        let res = this.getLoadResources();
        if (!res) {
            if (CC_DEBUG)
                cc.error(`未指定加载资源`);
            this.onLoadComplete && this.onLoadComplete(ResourceLoaderError.NO_FOUND_LOAD_RESOURCE);
            return;
        }
        if (res.length <= 0) {
            if (CC_DEBUG)
                cc.warn(`加载的资源为空`);
            this.onLoadComplete && this.onLoadComplete(ResourceLoaderError.NO_FOUND_LOAD_RESOURCE);
            return;
        }
        //如果正在加载中，防止重复调用
        if (this._isLoading) {
            if (CC_DEBUG)
                cc.warn(`资源加载中，未完成加载`);
            this.onLoadComplete && this.onLoadComplete(ResourceLoaderError.LOADING);
            return;
        }
        if (this._resources.size > 0 && this.isLoadComplete()) {
            if (CC_DEBUG)
                cc.warn(`资源已经加载完成，使用已经加载完成的资源`);
            this.onLoadComplete && this.onLoadComplete(ResourceLoaderError.SUCCESS);
            this.onLoadResourceComplete();
            return;
        }
        this._isLoading = true;
        //为防止重复，这里把资源放在一个map中
        res.forEach((value, index) => {
            if (value.url) {
                this._resources.set(value.url, value);
            }
            else {
                if (value.preloadView)
                    this._resources.set(value.preloadView.getPrefabUrl(), value);
            }
        });
        this._loadedCount = 0;
        this._resources.forEach((value, key, source) => {
            if (value.preloadView) {
                Framework_1.Manager.uiManager.preload(value.preloadView, value.bundle).then((view) => {
                    let cache = new Defines_1.ResourceCacheData();
                    cache.isLoaded = true;
                    cache.data = view;
                    cache.url = value.preloadView.getPrefabUrl();
                    cache.bundle = value.bundle;
                    this._onLoadResourceComplete(cache);
                });
            }
            else {
                Framework_1.Manager.assetManager.load(value.bundle, value.url, value.type, null, this._onLoadResourceComplete.bind(this));
            }
        });
    }
    /**
     * @description 卸载已经加载资源资源
     */
    unLoadResources() {
        this._unLoadResources();
    }
    _unLoadResources() {
        if (this._isLoading || this._resources.size <= 0) {
            //当前正在加载中
            if (this._isLoading) {
                cc.log("resources is loading , waiting for unload!!!");
            }
            return;
        }
        if (this._resources.size > 0) {
            this._resources.forEach((value) => {
                if (value.url) {
                    if (this._loadedResource.has(value.url)) {
                        let data = this._loadedResource.get(value.url);
                        if (data) {
                            Framework_1.Manager.assetManager.releaseAsset(data);
                        }
                        this._loadedResource.delete(value.url);
                    }
                }
            });
        }
        //重置标记
        this._isLoading = false;
        this._loadedCount = 0;
        this._resources.clear();
    }
    _onLoadResourceComplete(data) {
        this._loadedCount++;
        if (this._onLoadProgress) {
            if (this._loadedCount > this._resources.size) {
                this._loadedCount = this._resources.size;
            }
            //cc.log(`----------loadprogress ${this._loadedCount} / ${this._resources.length}--------------`);
            this._onLoadProgress(this._loadedCount, this._resources.size, data);
        }
        if (data && data.data instanceof cc.Asset) {
            //排除掉界面管理器
            let info = new Defines_1.ResourceInfo;
            info.url = data.url;
            info.type = data.assetType;
            info.data = data.data;
            info.bundle = data.bundle;
            this._loadedResource.set(info.url, info);
        }
        this.checkLoadResourceComplete();
    }
    /**
     * @description 资源加载完成
     */
    checkLoadResourceComplete() {
        //抛出事件给业务逻辑处理
        if (this.isLoadComplete()) {
            //加载完成
            this._isLoading = false;
            this.onLoadComplete && this.onLoadComplete(ResourceLoaderError.SUCCESS);
            this.onLoadResourceComplete();
        }
    }
    /**@description 加载资源完成 */
    onLoadResourceComplete() {
    }
    isLoadComplete() {
        return this._loadedCount >= this._resources.size;
    }
}
exports.default = ResourceLoader;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Fzc2V0TWFuYWdlci9SZXNvdXJjZUxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBZ0Y7QUFDaEYsNENBQXVDO0FBRXZDLElBQVksbUJBT1g7QUFQRCxXQUFZLG1CQUFtQjtJQUMzQixzQkFBc0I7SUFDdEIsbUVBQU8sQ0FBQTtJQUNQLDZCQUE2QjtJQUM3QixpR0FBc0IsQ0FBQTtJQUN0Qix1QkFBdUI7SUFDdkIsbUVBQU8sQ0FBQTtBQUNYLENBQUMsRUFQVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQU85QjtBQUVEOztHQUVHO0FBQ0gsTUFBcUIsY0FBYztJQUFuQztRQUVJLDBCQUEwQjtRQUNsQixlQUFVLEdBQTZCLElBQUksR0FBRyxFQUF1QixDQUFDO1FBQzlFLDhCQUE4QjtRQUN0QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUVqQyx5REFBeUQ7UUFDakQsb0JBQWUsR0FBOEIsSUFBSSxHQUFHLEVBQXVCLENBQUM7UUFFcEYsNkJBQTZCO1FBQ3JCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFcEMscUJBQXFCO1FBQ2IsU0FBSSxHQUFXLElBQUksQ0FBQztRQVE1Qix5QkFBeUI7UUFDakIsb0JBQWUsR0FBeUMsSUFBSSxDQUFDO1FBa0JyRTs7V0FFRztRQUNLLHFCQUFnQixHQUF5QixJQUFJLENBQUM7SUF3SjFELENBQUM7SUFyTEcsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFXLEdBQUcsQ0FBQyxHQUFXO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFJRCxJQUFXLGNBQWMsQ0FBQyxFQUF3QztRQUM5RCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3JCLE9BQU8s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QVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxLQUFLLEVBQUc7WUFDeEMsVUFBVTtZQUNWLElBQUksSUFBSSxHQUFHLElBQUksc0JBQVksQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7T0FFRztJQUNPLHlCQUF5QjtRQUMvQixhQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDdkIsTUFBTTtZQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBRXhCLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCx5QkFBeUI7SUFDZixzQkFBc0I7SUFFaEMsQ0FBQztJQUVNLGNBQWM7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7Q0FFSjtBQXBNRCxpQ0FvTUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZURhdGEsIFJlc291cmNlQ2FjaGVEYXRhLCBSZXNvdXJjZUluZm8gfSBmcm9tIFwiLi4vYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG5leHBvcnQgZW51bSBSZXNvdXJjZUxvYWRlckVycm9yIHtcbiAgICAvKipAZGVzY3JpcHRpb24g5Yqg6L295LitICovXG4gICAgTE9BRElORyxcbiAgICAvKiogQGRlc2NyaXB0aW9uIOacquaJvuWIsOaIluiuvue9ruWKoOi9vei1hOa6kCovXG4gICAgTk9fRk9VTkRfTE9BRF9SRVNPVVJDRSxcbiAgICAvKipAZGVzY3JpcHRpb24g5a6M576O5Yqg6L29ICovXG4gICAgU1VDQ0VTUyxcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6LWE5rqQ5Yqg6L295ZmoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc291cmNlTG9hZGVyIHtcblxuICAgIC8qKiBAZGVzY3JpcHRpb24g5Yqg6L296LWE5rqQ5pWw5o2uICovXG4gICAgcHJpdmF0ZSBfcmVzb3VyY2VzOiBNYXA8c3RyaW5nLFJlc291cmNlRGF0YT4gPSBuZXcgTWFwPHN0cmluZyxSZXNvdXJjZURhdGE+KCk7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjeW3sue7j+WKoOi9veeahOi1hOa6kOaVsOmHjyAqL1xuICAgIHByaXZhdGUgX2xvYWRlZENvdW50OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWKoOi9veWujOaIkOWQjueahOaVsOaNru+8jOS4uuS6huaWueS+v+mHiuaUvuaXtueyvuWHhumHiuaUvu+8jOayoeWKoOi9veaIkOWKn+eahOi1hOa6kO+8jOS4jeWcqOWBmumHiuaUvueahOWIpOaWrSAqL1xuICAgIHByaXZhdGUgX2xvYWRlZFJlc291cmNlOiBNYXA8c3RyaW5nLFJlc291cmNlSW5mbz4gID0gbmV3IE1hcDxzdHJpbmcsUmVzb3VyY2VJbmZvPigpO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjeaYr+WQpuato+WcqOWKoOi9vei1hOa6kCAqL1xuICAgIHByaXZhdGUgX2lzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOagh+ivhiAqL1xuICAgIHByaXZhdGUgX3RhZzogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgZ2V0IHRhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZztcbiAgICB9XG4gICAgcHVibGljIHNldCB0YWcodGFnOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fdGFnID0gdGFnO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDliqDovb3lrozmiJDlm57osIMgKi9cbiAgICBwcml2YXRlIF9vbkxvYWRDb21wbGV0ZTogKGVycm9yOiBSZXNvdXJjZUxvYWRlckVycm9yKSA9PiB2b2lkID0gbnVsbDtcbiAgICBwdWJsaWMgc2V0IG9uTG9hZENvbXBsZXRlKGNiOiAoZXJyb3I6IFJlc291cmNlTG9hZGVyRXJyb3IpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5fb25Mb2FkQ29tcGxldGUgPSBjYjtcbiAgICB9XG4gICAgcHVibGljIGdldCBvbkxvYWRDb21wbGV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uTG9hZENvbXBsZXRlO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDliqDovb3ov5vluqYgKi9cbiAgICBwdWJsaWMgX29uTG9hZFByb2dyZXNzOiAobG9hZGVkQ291bnQ6IG51bWJlciwgdG9hdGw6IG51bWJlciwgZGF0YTogUmVzb3VyY2VDYWNoZURhdGEpID0+IHZvaWQ7XG4gICAgcHVibGljIHNldCBvbkxvYWRQcm9ncmVzcyh2YWx1ZTogKGxvYWRlZENvdW50OiBudW1iZXIsIHRvYXRsOiBudW1iZXIsIGRhdGE6IFJlc291cmNlQ2FjaGVEYXRhKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuX29uTG9hZFByb2dyZXNzID0gdmFsdWU7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgb25Mb2FkUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkxvYWRQcm9ncmVzcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlrp7njrDnsbvlv4Xpobvnu5nkuKrpnIDopoHliqDovb3otYTmupBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9nZXRMb2FkUmVzb3VyY2U6ICgpID0+IFJlc291cmNlRGF0YVtdID0gbnVsbDtcbiAgICBwdWJsaWMgc2V0IGdldExvYWRSZXNvdXJjZXMoZnVuYzogKCkgPT4gUmVzb3VyY2VEYXRhW10pIHtcbiAgICAgICAgdGhpcy5fZ2V0TG9hZFJlc291cmNlID0gZnVuYztcbiAgICB9XG4gICAgcHVibGljIGdldCBnZXRMb2FkUmVzb3VyY2VzKCk6ICgpID0+IFJlc291cmNlRGF0YVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldExvYWRSZXNvdXJjZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5Yqg6L296LWE5rqQXG4gICAgICovXG4gICAgcHVibGljIGxvYWRSZXNvdXJjZXMoKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLmdldExvYWRSZXNvdXJjZXMpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoXCLmnKrmjIflrpogZ2V0TG9hZFJlc291cmNlcyDlh73mlbBcIik7XG4gICAgICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlICYmIHRoaXMub25Mb2FkQ29tcGxldGUoUmVzb3VyY2VMb2FkZXJFcnJvci5OT19GT1VORF9MT0FEX1JFU09VUkNFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmdldExvYWRSZXNvdXJjZXMoKTtcbiAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoYOacquaMh+WumuWKoOi9vei1hOa6kGApO1xuICAgICAgICAgICAgdGhpcy5vbkxvYWRDb21wbGV0ZSAmJiB0aGlzLm9uTG9hZENvbXBsZXRlKFJlc291cmNlTG9hZGVyRXJyb3IuTk9fRk9VTkRfTE9BRF9SRVNPVVJDRSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGDliqDovb3nmoTotYTmupDkuLrnqbpgKTtcbiAgICAgICAgICAgIHRoaXMub25Mb2FkQ29tcGxldGUgJiYgdGhpcy5vbkxvYWRDb21wbGV0ZShSZXNvdXJjZUxvYWRlckVycm9yLk5PX0ZPVU5EX0xPQURfUkVTT1VSQ0UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lpoLmnpzmraPlnKjliqDovb3kuK3vvIzpmLLmraLph43lpI3osIPnlKhcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9hZGluZykge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGDotYTmupDliqDovb3kuK3vvIzmnKrlrozmiJDliqDovb1gKTtcbiAgICAgICAgICAgIHRoaXMub25Mb2FkQ29tcGxldGUgJiYgdGhpcy5vbkxvYWRDb21wbGV0ZShSZXNvdXJjZUxvYWRlckVycm9yLkxPQURJTkcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9yZXNvdXJjZXMuc2l6ZSA+IDAgJiYgdGhpcy5pc0xvYWRDb21wbGV0ZSgpICl7XG4gICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2Mud2Fybihg6LWE5rqQ5bey57uP5Yqg6L295a6M5oiQ77yM5L2/55So5bey57uP5Yqg6L295a6M5oiQ55qE6LWE5rqQYCk7XG4gICAgICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlICYmIHRoaXMub25Mb2FkQ29tcGxldGUoUmVzb3VyY2VMb2FkZXJFcnJvci5TVUNDRVNTKTtcbiAgICAgICAgICAgIHRoaXMub25Mb2FkUmVzb3VyY2VDb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgLy/kuLrpmLLmraLph43lpI3vvIzov5nph4zmiorotYTmupDmlL7lnKjkuIDkuKptYXDkuK1cbiAgICAgICAgcmVzLmZvckVhY2goKHZhbHVlLGluZGV4KT0+e1xuICAgICAgICAgICAgaWYgKCB2YWx1ZS51cmwgKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KHZhbHVlLnVybCx2YWx1ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlLnByZWxvYWRWaWV3KSB0aGlzLl9yZXNvdXJjZXMuc2V0KHZhbHVlLnByZWxvYWRWaWV3LmdldFByZWZhYlVybCgpLHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fbG9hZGVkQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZm9yRWFjaCgodmFsdWU6IFJlc291cmNlRGF0YSxrZXksc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIHZhbHVlLnByZWxvYWRWaWV3ICl7XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIucHJlbG9hZCh2YWx1ZS5wcmVsb2FkVmlldyx2YWx1ZS5idW5kbGUpLnRoZW4oKHZpZXcpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYWNoZSA9IG5ldyBSZXNvdXJjZUNhY2hlRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5pc0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmRhdGEgPSA8YW55PnZpZXc7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLnVybCA9IHZhbHVlLnByZWxvYWRWaWV3LmdldFByZWZhYlVybCgpO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5idW5kbGUgPSB2YWx1ZS5idW5kbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uTG9hZFJlc291cmNlQ29tcGxldGUoY2FjaGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLmFzc2V0TWFuYWdlci5sb2FkKHZhbHVlLmJ1bmRsZSx2YWx1ZS51cmwsdmFsdWUudHlwZSxudWxsLHRoaXMuX29uTG9hZFJlc291cmNlQ29tcGxldGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDljbjovb3lt7Lnu4/liqDovb3otYTmupDotYTmupBcbiAgICAgKi9cbiAgICBwdWJsaWMgdW5Mb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICB0aGlzLl91bkxvYWRSZXNvdXJjZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91bkxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xvYWRpbmcgfHwgdGhpcy5fcmVzb3VyY2VzLnNpemUgPD0gMCApIHtcbiAgICAgICAgICAgIC8v5b2T5YmN5q2j5Zyo5Yqg6L295LitXG4gICAgICAgICAgICBpZiAodGhpcy5faXNMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicmVzb3VyY2VzIGlzIGxvYWRpbmcgLCB3YWl0aW5nIGZvciB1bmxvYWQhISFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3Jlc291cmNlcy5zaXplID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmZvckVhY2goKHZhbHVlOiBSZXNvdXJjZURhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlLnVybCApe1xuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5fbG9hZGVkUmVzb3VyY2UuaGFzKHZhbHVlLnVybCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9sb2FkZWRSZXNvdXJjZS5nZXQodmFsdWUudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBkYXRhICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZGVkUmVzb3VyY2UuZGVsZXRlKHZhbHVlLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL+mHjee9ruagh+iusFxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbG9hZGVkQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl9yZXNvdXJjZXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkxvYWRSZXNvdXJjZUNvbXBsZXRlKGRhdGE6IFJlc291cmNlQ2FjaGVEYXRhKSB7XG4gICAgICAgIHRoaXMuX2xvYWRlZENvdW50Kys7XG5cbiAgICAgICAgaWYgKHRoaXMuX29uTG9hZFByb2dyZXNzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGVkQ291bnQgPiB0aGlzLl9yZXNvdXJjZXMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlZENvdW50ID0gdGhpcy5fcmVzb3VyY2VzLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NjLmxvZyhgLS0tLS0tLS0tLWxvYWRwcm9ncmVzcyAke3RoaXMuX2xvYWRlZENvdW50fSAvICR7dGhpcy5fcmVzb3VyY2VzLmxlbmd0aH0tLS0tLS0tLS0tLS0tLWApO1xuICAgICAgICAgICAgdGhpcy5fb25Mb2FkUHJvZ3Jlc3ModGhpcy5fbG9hZGVkQ291bnQsIHRoaXMuX3Jlc291cmNlcy5zaXplLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuZGF0YSBpbnN0YW5jZW9mIGNjLkFzc2V0ICkge1xuICAgICAgICAgICAgLy/mjpLpmaTmjonnlYzpnaLnrqHnkIblmahcbiAgICAgICAgICAgIGxldCBpbmZvID0gbmV3IFJlc291cmNlSW5mbztcbiAgICAgICAgICAgIGluZm8udXJsID0gZGF0YS51cmw7XG4gICAgICAgICAgICBpbmZvLnR5cGUgPSBkYXRhLmFzc2V0VHlwZTtcbiAgICAgICAgICAgIGluZm8uZGF0YSA9IGRhdGEuZGF0YTtcbiAgICAgICAgICAgIGluZm8uYnVuZGxlID0gZGF0YS5idW5kbGU7XG4gICAgICAgICAgICB0aGlzLl9sb2FkZWRSZXNvdXJjZS5zZXQoaW5mby51cmwsaW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrTG9hZFJlc291cmNlQ29tcGxldGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOi1hOa6kOWKoOi9veWujOaIkFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjaGVja0xvYWRSZXNvdXJjZUNvbXBsZXRlKCkge1xuICAgICAgICAvL+aKm+WHuuS6i+S7tue7meS4muWKoemAu+i+keWkhOeQhlxuICAgICAgICBpZiAodGhpcy5pc0xvYWRDb21wbGV0ZSgpKSB7XG4gICAgICAgICAgICAvL+WKoOi9veWujOaIkFxuICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMub25Mb2FkQ29tcGxldGUgJiYgdGhpcy5vbkxvYWRDb21wbGV0ZShSZXNvdXJjZUxvYWRlckVycm9yLlNVQ0NFU1MpO1xuICAgICAgICAgICAgdGhpcy5vbkxvYWRSZXNvdXJjZUNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5Yqg6L296LWE5rqQ5a6M5oiQICovXG4gICAgcHJvdGVjdGVkIG9uTG9hZFJlc291cmNlQ29tcGxldGUoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNMb2FkQ29tcGxldGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZWRDb3VudCA+PSB0aGlzLl9yZXNvdXJjZXMuc2l6ZTtcbiAgICB9XG5cbn0iXX0=