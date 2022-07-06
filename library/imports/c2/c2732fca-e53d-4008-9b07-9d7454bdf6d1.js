"use strict";
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