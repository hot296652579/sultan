
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/assetManager/AssetManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b4fc1D2m55E+a6Fji/1Ky71', 'AssetManager');
// script/framework/assetManager/AssetManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetManager = void 0;
const Defines_1 = require("../base/Defines");
const HttpClient_1 = require("../net/HttpClient");
const Framework_1 = require("../Framework");
class RemoteLoader {
    constructor() {
        this._logTag = `[RemoteLoader] `;
        this._maxConcurrentTask = 5;
        /**@description 当前下载任务 */
        this._currentTaskCount = 0;
        /**@description 当前任务队列  {下载地址,存储路径}*/
        this._taskQueue = [];
    }
    static Instance() { return this._instance || (this._instance = new RemoteLoader()); }
    /**@description 设置下载任务的最大上限数量，目前仅对CC_JSB有效，限制downloader的任务数量  */
    set maxConcurrentTask(value) {
        this._maxConcurrentTask = value;
    }
    get maxConcurrentTask() {
        return this._maxConcurrentTask;
    }
    loadImage(url, isNeedCache) {
        let me = this;
        return new Promise((resolve) => {
            if (url == null || url == undefined || url.length <= 0) {
                resolve(null);
                return;
            }
            let remoteUrl = parseRemoteUrl(url);
            let spCache = Framework_1.Manager.cacheManager.remoteCaches.getSpriteFrame(remoteUrl);
            if (spCache && spCache.data) {
                if (CC_DEBUG)
                    cc.log(this._logTag, `从缓存精灵帧中获取:${remoteUrl.url}`);
                resolve((spCache.data));
                return;
            }
            me._loadRemoteRes(url, cc.Texture2D, "cache_png", isNeedCache).then((data) => {
                let remoteUrl = parseRemoteUrl(url);
                //改变缓存类型
                let cache = Framework_1.Manager.cacheManager.remoteCaches.get(remoteUrl);
                if (data && cache) {
                    if (CC_DEBUG)
                        cc.log(`${this._logTag}加载图片完成${remoteUrl.url}`);
                    cache.data = data;
                    cache.data.name = remoteUrl.url;
                    // cache.data.url = remoteUrl.url;
                    let spriteFrame = Framework_1.Manager.cacheManager.remoteCaches.setSpriteFrame(remoteUrl, cache.data);
                    resolve(spriteFrame);
                }
                else {
                    if (CC_DEBUG)
                        cc.warn(`${this._logTag}加载图片错误${remoteUrl.url}`);
                    resolve(null);
                }
            });
        });
    }
    loadSkeleton(path, name, isNeedCache) {
        let me = this;
        return new Promise((resolve) => {
            if (path && name) {
                let url = `${path}/${name}`;
                let spineAtlas = `${path}/${name}.atlas`;
                let spinePng = `${path}/${name}.png`;
                let spineJson = `${path}/${name}.json`;
                let remoteUrl = parseRemoteUrl(url);
                let cache = Framework_1.Manager.cacheManager.remoteCaches.get(remoteUrl);
                if (cache) {
                    if (cache.isLoaded) {
                        resolve((cache.data));
                    }
                    else {
                        cache.finishCb.push(resolve);
                    }
                }
                else {
                    cache = new Defines_1.ResourceCacheData();
                    cache.resourceType = Defines_1.ResourceType.Remote;
                    cache.assetType = sp.SkeletonData;
                    cache.bundle = Defines_1.BUNDLE_REMOTE;
                    Framework_1.Manager.cacheManager.remoteCaches.set(remoteUrl, cache);
                    me._loadRemoteRes(spinePng, cc.Texture2D, "cache_png", isNeedCache).then((texture) => {
                        if (texture) {
                            me._loadRemoteRes(spineJson, cc.JsonAsset, "cache_json", isNeedCache).then((json) => {
                                if (json) {
                                    me._loadRemoteRes(spineAtlas, cc.JsonAsset, "cache_atlas", isNeedCache).then((atlas) => {
                                        if (atlas) {
                                            //生成SkeletonData数据
                                            let asset = new sp.SkeletonData;
                                            asset.skeletonJson = json;
                                            asset.atlasText = atlas;
                                            asset.textures = [texture];
                                            let pngName = name + ".png";
                                            asset["textureNames"] = [pngName];
                                            cache.url = url;
                                            asset.name = cache.url;
                                            asset.url = cache.url;
                                            cache.data = asset;
                                            cache.isLoaded = true;
                                            resolve((cache.data));
                                            cache.doFinish(cache.data);
                                        }
                                        else {
                                            resolve(null);
                                            cache.doFinish(null);
                                            Framework_1.Manager.cacheManager.remoteCaches.remove(remoteUrl);
                                        }
                                    });
                                }
                                else {
                                    resolve(null);
                                    cache.doFinish(null);
                                    Framework_1.Manager.cacheManager.remoteCaches.remove(remoteUrl);
                                }
                            });
                        }
                        else {
                            resolve(null);
                            cache.doFinish(null);
                            Framework_1.Manager.cacheManager.remoteCaches.remove(remoteUrl);
                        }
                    });
                }
            }
            else {
                resolve(null);
            }
        });
    }
    /**
     * @description 加载资源
     * @param requestURL 原请求地址
     * @param storagePath 下载完成本地存储地址
     */
    _loadLocalRes(requestURL, storagePath) {
        let me = this;
        if (CC_DEBUG)
            cc.log(`${this._logTag}加载本地文件:${storagePath}`);
        let urlData = parseRemoteUrl(requestURL);
        let cache = Framework_1.Manager.cacheManager.remoteCaches.get(urlData);
        if (cache) {
            cc.assetManager.loadRemote(storagePath, (err, data) => {
                if (cache) {
                    cache.isLoaded = true;
                    if (data) {
                        cache.data = data;
                        cache.doJsbFinish(data);
                        if (CC_DEBUG)
                            cc.log(`${this._logTag}加载本地资源完成:${storagePath} => ${requestURL}`);
                    }
                    else {
                        if (CC_DEBUG)
                            cc.warn(`${this._logTag}加载本地资源异常:${storagePath}`);
                        cache.doJsbFinish(null);
                    }
                    //把再加载过程里，双加载同一资源的回调都回调回去
                    cache.doFinish(data);
                }
            });
        }
        else {
            cc.error(`找不到本地缓存 requestURL : ${requestURL} storagePath : ${storagePath}`);
        }
    }
    _loadRemoteRes(url, type, databaseTable, isNeedCache) {
        return new Promise((resolve) => {
            let urlData = parseRemoteUrl(url);
            let cache = Framework_1.Manager.cacheManager.remoteCaches.get(urlData);
            if (cache) {
                //有缓存,查看是否已经加载
                if (cache.isLoaded) {
                    //如果已经加载完成
                    resolve(cache.data);
                }
                else {
                    //正在加载中
                    cache.finishCb.push(resolve);
                }
            }
            else {
                //没有缓存存在,生成加载缓存
                cache = new Defines_1.ResourceCacheData();
                cache.resourceType = Defines_1.ResourceType.Remote;
                cache.assetType = type;
                Framework_1.Manager.cacheManager.remoteCaches.set(urlData, cache);
                if (CC_JSB) {
                    let path = makeRemoteUrl(urlData);
                    let fullPath = `${jsb.fileUtils.getWritablePath()}${path}`;
                    if (CC_DEBUG)
                        cc.log(`${this._logTag}${urlData.url}下载的资源将存入本地${fullPath}`);
                    //先缓存回调，加载完成后再回调
                    cache.jsbFinishCb = resolve;
                    cache.jsbStoragePath = fullPath;
                    //先再本地查找有没有下载好的资源，如果有，直接创建
                    if (jsb.fileUtils.isFileExist(fullPath)) {
                        if (isNeedCache) {
                            if (CC_DEBUG)
                                cc.log(`${this._logTag}本地已经存在${urlData.url} 本地路径为:${fullPath} ,使用本地缓存资源创建`);
                            this._loadLocalRes(urlData.url, fullPath);
                        }
                        else {
                            if (CC_DEBUG)
                                cc.log(this._logTag, `${urlData.url}资源不需要缓存,重新下载`);
                            jsb.fileUtils.removeFile(fullPath);
                            this.pushTask(urlData.url, fullPath);
                        }
                    }
                    else {
                        let tempPath = `${jsb.fileUtils.getWritablePath()}${urlData.path}`;
                        if (jsb.fileUtils.isDirectoryExist(tempPath)) {
                            if (CC_DEBUG)
                                cc.log(`已经存在文件夹：${tempPath}`);
                        }
                        else {
                            if (CC_DEBUG)
                                cc.log(`创建文件夹:${tempPath}`);
                            jsb.fileUtils.createDirectory(tempPath);
                        }
                        this.pushTask(urlData.url, fullPath);
                    }
                }
                else {
                    if (isNeedCache) {
                        //网页h5方式加载
                        if (Framework_1.Manager.dataBase.isSupport()) {
                            Framework_1.Manager.dataBase.get(databaseTable, urlData.url).then((data) => {
                                if (data) {
                                    this._loadH5DatabaseData(cache, databaseTable, resolve, data);
                                }
                                else {
                                    this._loadH5RemoteData(cache, databaseTable, urlData, resolve, isNeedCache, true);
                                }
                            });
                        }
                        else {
                            this._loadH5RemoteData(cache, databaseTable, urlData, resolve, isNeedCache, false);
                        }
                    }
                    else {
                        //不需要做本地缓存处理
                        this._loadH5RemoteData(cache, databaseTable, urlData, resolve, isNeedCache, false);
                    }
                }
            }
        });
    }
    _loadH5RemoteData(cache, databaseTable, urlData, resolve, isNeedCache, isSupportDatabase) {
        let packge = new HttpClient_1.RequestPackge;
        packge.data.url = urlData.url;
        packge.data.isAutoAttachCurrentTime = !isNeedCache;
        if (databaseTable == "cache_png") {
            packge.data.responseType = "blob";
        }
        packge.send((netData) => {
            //存入数据库
            if (isNeedCache && isSupportDatabase) {
                Framework_1.Manager.dataBase.put(databaseTable, { key: packge.data.url, data: netData });
            }
            this._loadH5DatabaseData(cache, databaseTable, resolve, netData);
        }, (err) => {
            resolve(null);
            if (CC_DEBUG)
                cc.warn(this._logTag, `加载网络资源异常:${urlData.url}`);
            cache.doFinish(null);
            Framework_1.Manager.cacheManager.remoteCaches.remove(urlData);
        });
    }
    _loadH5DatabaseData(cache, databaseTable, resolve, data) {
        if (databaseTable == "cache_png") {
            //创建图片
            let imgUrl = URL.createObjectURL(data);
            let image = new Image();
            image.src = imgUrl;
            //等图片加载完成后，才创建图片贴图，不然没办法正常显示 
            image.addEventListener("load", (ev) => {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                cache.isLoaded = true;
                cache.data = texture;
                resolve(cache.data);
                cache.doFinish(cache.data);
                URL.revokeObjectURL(imgUrl);
            });
        }
        else if (databaseTable == "cache_json") {
            let json = JSON.parse(data);
            cache.isLoaded = true;
            cache.data = json;
            resolve(cache.data);
            cache.doFinish(cache.data);
        }
        else if (databaseTable == "cache_atlas") {
            cache.isLoaded = true;
            cache.data = data;
            resolve(cache.data);
            cache.doFinish(cache.data);
        }
    }
    /**@description 由主游戏控制器驱动，在下载远程资源时，设置一个上限下载任务数据，以免同一时间任务数量过大 */
    update() {
        if (CC_JSB) {
            while (this._currentTaskCount < this.maxConcurrentTask && this._taskQueue.length > 0) {
                this._currentTaskCount++;
                let value = this._taskQueue.shift();
                if (CC_DEBUG)
                    cc.log(`创建下载任务:${value.url}`);
                let packge = new HttpClient_1.RequestPackge;
                let me = this;
                packge.data.url = value.url;
                packge.data.responseType = "arraybuffer";
                packge.send((netData) => {
                    //写本地
                    let data = new Uint8Array(netData);
                    let isSuccess = false;
                    if (CC_JSB) {
                        isSuccess = jsb.fileUtils.writeDataToFile(data, value.path);
                    }
                    if (isSuccess) {
                        me.onLoadSuccess({ requestURL: value.url, storagePath: value.path });
                    }
                    else {
                        me.onLoadError({ requestURL: value.url, storagePath: value.path }, 0, 0, `写入本地${value.path}失败`);
                    }
                }, (err) => {
                    cc.error(`下载错误 : ${value.url}`);
                    me.onLoadError({ requestURL: value.url, storagePath: value.path }, err.type, 0, err.reason);
                });
            }
        }
    }
    /**@description 加载成功 */
    onLoadSuccess(task) {
        if (CC_DEBUG)
            cc.log(`${this._logTag}加载资源完成 : ${task.requestURL}`);
        //下载完成，减少当前任务数量
        this._currentTaskCount--;
        this._loadLocalRes(task.requestURL, task.storagePath);
    }
    onLoadError(task, errorCode, errorCodeInternal, errorStr) {
        if (CC_DEBUG)
            cc.error(`${this._logTag}task url : ${task.requestURL} , errorCode : ${errorCode} , internal : ${errorCodeInternal} reason : ${errorStr}`);
        //下载错误，减少当前任务数量 
        this._currentTaskCount--;
        let remoteUrl = parseRemoteUrl(task.requestURL);
        let cache = Framework_1.Manager.cacheManager.remoteCaches.get(remoteUrl);
        cache.isLoaded = true;
        cache.data = null;
        if (CC_DEBUG)
            cc.warn(`${this._logTag}下载远程资源异常:${task.requestURL}`);
        cache.doJsbFinish(null);
        //把再加载过程里，双加载同一资源的回调都回调回去
        cache.doFinish(null);
        Framework_1.Manager.cacheManager.remoteCaches.remove(remoteUrl);
    }
    pushTask(url, path) {
        for (let i = 0; i < this._taskQueue.length; i++) {
            if (this._taskQueue[i].url == url) {
                if (CC_DEBUG)
                    cc.log(`已经存在下载任务:${url}`);
                return;
            }
        }
        if (CC_DEBUG)
            cc.log(`当前任务数:${this._currentTaskCount} / ${this.maxConcurrentTask} 添加下载任务:${url}`);
        this._taskQueue.push({ url: url, path: path });
    }
}
RemoteLoader._instance = null;
class AssetManager {
    constructor() {
        this.logTag = `[AssetManager]: `;
        this._remote = new RemoteLoader();
    }
    static Instance() {
        return this._instance || (this._instance = new AssetManager());
    }
    get remote() { return this._remote; }
    /**
     * @description 获取Bundle
     * @param bundle Bundle名|Bundle
     */
    getBundle(bundle) {
        if (bundle) {
            if (typeof bundle == "string") {
                return cc.assetManager.getBundle(bundle);
            }
            return bundle;
        }
        return null;
    }
    load(bundle, path, type, onProgress, onComplete) {
        let cache = Framework_1.Manager.cacheManager.get(bundle, path);
        if (cache) {
            //存在缓存信息
            if (cache.isLoaded) {
                //已经加载完成
                if (CC_DEBUG && cache.status == Defines_1.ResourceCacheStatus.WAITTING_FOR_RELEASE) {
                    cc.warn(this.logTag, `资源:${path} 等待释放，但资源已经加载完成，此时有人又重新加载，不进行释放处理`);
                }
                //加载完成
                onComplete(cache);
            }
            else {
                if (CC_DEBUG && cache.status == Defines_1.ResourceCacheStatus.WAITTING_FOR_RELEASE) {
                    cc.warn(this.logTag, `资源:${path}等待释放，但资源处理加载过程中，此时有人又重新加载，不进行释放处理`);
                }
                cache.finishCb.push(onComplete);
            }
            //重新复位资源状态
            cache.status = Defines_1.ResourceCacheStatus.NONE;
        }
        else {
            //无缓存信息
            cache = new Defines_1.ResourceCacheData();
            cache.url = path;
            cache.assetType = type;
            cache.bundle = bundle;
            Framework_1.Manager.cacheManager.set(bundle, path, cache);
            console.time(`加载资源 : ${cache.url}`);
            let _bundle = this.getBundle(bundle);
            if (!_bundle) {
                //如果bundle不存在
                let error = new Error(`${this.logTag} ${bundle} 没有加载，请先加载`);
                this._onLoadComplete(cache, onComplete, error, null);
                return;
            }
            let res = _bundle.get(path, type);
            if (res) {
                this._onLoadComplete(cache, onComplete, null, res);
            }
            else {
                if (onProgress) {
                    _bundle.load(path, type, onProgress, this._onLoadComplete.bind(this, cache, onComplete));
                }
                else {
                    _bundle.load(path, type, this._onLoadComplete.bind(this, cache, onComplete));
                }
            }
        }
    }
    _onLoadComplete(cache, completeCallback, err, data) {
        cache.isLoaded = true;
        //添加引用关系
        let tempCache = cache;
        if (err) {
            cc.error(`${this.logTag}加载资源失败:${cache.url} 原因:${err.message ? err.message : "未知"}`);
            cache.data = null;
            tempCache.data = null;
            Framework_1.Manager.cacheManager.remove(cache.bundle, cache.url);
            completeCallback(cache);
        }
        else {
            if (CC_DEBUG)
                cc.log(`${this.logTag}加载资源成功:${cache.url}`);
            cache.data = data;
            tempCache.data = data;
            completeCallback(cache);
        }
        //加载过程，有不同地方调用过来加载同一个资源的地方，都回调回去
        cache.doFinish(tempCache);
        cache.doGet(tempCache.data);
        if (cache.status == Defines_1.ResourceCacheStatus.WAITTING_FOR_RELEASE) {
            if (CC_DEBUG)
                cc.warn(this.logTag, `资源:${cache.url}加载完成，但缓存状态为等待销毁，销毁资源`);
            if (cache.data) {
                cache.status = Defines_1.ResourceCacheStatus.NONE;
                let info = new Defines_1.ResourceInfo;
                info.url = cache.url;
                info.type = cache.assetType;
                info.data = cache.data;
                info.bundle = cache.bundle;
                this.releaseAsset(info);
            }
        }
        console.timeEnd(`加载资源 : ${cache.url}`);
    }
    releaseAsset(info) {
        if (info && info.bundle) {
            Framework_1.Manager.cacheManager.remove(info.bundle, info.url);
            let bundle = this.getBundle(info.bundle);
            if (bundle) {
                info && info.data && info.data.decRef();
                bundle.release(info.url, info.type);
            }
        }
    }
}
exports.AssetManager = AssetManager;
AssetManager._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Fzc2V0TWFuYWdlci9Bc3NldE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWlJO0FBRWpJLGtEQUFrRDtBQUNsRCw0Q0FBdUM7QUFFdkMsTUFBTSxZQUFZO0lBQWxCO1FBRVksWUFBTyxHQUFHLGlCQUFpQixDQUFDO1FBSTVCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQVMvQix5QkFBeUI7UUFDakIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLHFDQUFxQztRQUM3QixlQUFVLEdBQXNDLEVBQUUsQ0FBQztJQXlVL0QsQ0FBQztJQXhWVSxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUc1RixnRUFBZ0U7SUFDaEUsSUFBVyxpQkFBaUIsQ0FBRSxLQUFjO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUNELElBQVcsaUJBQWlCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7SUFRTSxTQUFTLENBQUMsR0FBVyxFQUFFLFdBQW9CO1FBQzlDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sSUFBSSxPQUFPLENBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxPQUFPLEdBQUcsbUJBQU8s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S0FBSyxDQUFDLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7UUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFlBQVksQ0FBRSxJQUFtQjtRQUNwQyxJQUFLLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RCLG1CQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxJQUFLLE1BQU0sRUFBRTtnQkFDVCxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7SUFDTCxDQUFDOztBQTFITCxvQ0E0SEM7QUExSGtCLHNCQUFTLEdBQWlCLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc291cmNlQ2FjaGVEYXRhLCBSZXNvdXJjZUNhY2hlU3RhdHVzLCBSZXNvdXJjZUluZm8sIEJVTkRMRV9UWVBFLCBSZXNvdXJjZVR5cGUsIEJVTkRMRV9SRU1PVEUgfSBmcm9tIFwiLi4vYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBEYXRhQmFzZVRhYmxlIH0gZnJvbSBcIi4uL2RhdGFiYXNlL0RhdGFCYXNlXCI7XG5pbXBvcnQgeyBSZXF1ZXN0UGFja2dlIH0gZnJvbSBcIi4uL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZyYW1ld29ya1wiO1xuXG5jbGFzcyBSZW1vdGVMb2FkZXIge1xuXG4gICAgcHJpdmF0ZSBfbG9nVGFnID0gYFtSZW1vdGVMb2FkZXJdIGA7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSZW1vdGVMb2FkZXIgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgUmVtb3RlTG9hZGVyKCkpOyB9XG5cbiAgICBwcml2YXRlIF9tYXhDb25jdXJyZW50VGFzayA9IDU7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOiuvue9ruS4i+i9veS7u+WKoeeahOacgOWkp+S4iumZkOaVsOmHj++8jOebruWJjeS7heWvuUNDX0pTQuacieaViO+8jOmZkOWItmRvd25sb2FkZXLnmoTku7vliqHmlbDph48gICovXG4gICAgcHVibGljIHNldCBtYXhDb25jdXJyZW50VGFzayggdmFsdWUgOiBudW1iZXIgKXtcbiAgICAgICAgdGhpcy5fbWF4Q29uY3VycmVudFRhc2sgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHVibGljIGdldCBtYXhDb25jdXJyZW50VGFzayggKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heENvbmN1cnJlbnRUYXNrO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlvZPliY3kuIvovb3ku7vliqEgKi9cbiAgICBwcml2YXRlIF9jdXJyZW50VGFza0NvdW50ID0gMDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlvZPliY3ku7vliqHpmJ/liJcgIHvkuIvovb3lnLDlnYAs5a2Y5YKo6Lev5b6EfSovXG4gICAgcHJpdmF0ZSBfdGFza1F1ZXVlIDoge3VybCA6IHN0cmluZyAsIHBhdGggOiBzdHJpbmd9W10gPSBbXTtcblxuICAgIHB1YmxpYyBsb2FkSW1hZ2UodXJsOiBzdHJpbmcsIGlzTmVlZENhY2hlOiBib29sZWFuKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxjYy5TcHJpdGVGcmFtZT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh1cmwgPT0gbnVsbCB8fCB1cmwgPT0gdW5kZWZpbmVkIHx8IHVybC5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlbW90ZVVybCA9IHBhcnNlUmVtb3RlVXJsKHVybCk7XG4gICAgICAgICAgICBsZXQgc3BDYWNoZSA9IE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnJlbW90ZUNhY2hlcy5nZXRTcHJpdGVGcmFtZShyZW1vdGVVcmwpO1xuICAgICAgICAgICAgaWYgKHNwQ2FjaGUgJiYgc3BDYWNoZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2codGhpcy5fbG9nVGFnLCBg5LuO57yT5a2Y57K+54G15bin5Lit6I635Y+WOiR7cmVtb3RlVXJsLnVybH1gKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKDxjYy5TcHJpdGVGcmFtZT4oc3BDYWNoZS5kYXRhKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS5fbG9hZFJlbW90ZVJlcyh1cmwsY2MuVGV4dHVyZTJEICwgXCJjYWNoZV9wbmdcIiwgaXNOZWVkQ2FjaGUpLnRoZW4oKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByZW1vdGVVcmwgPSBwYXJzZVJlbW90ZVVybCh1cmwpO1xuICAgICAgICAgICAgICAgIC8v5pS55Y+Y57yT5a2Y57G75Z6LXG4gICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gTWFuYWdlci5jYWNoZU1hbmFnZXIucmVtb3RlQ2FjaGVzLmdldChyZW1vdGVVcmwpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ33liqDovb3lm77niYflrozmiJAke3JlbW90ZVVybC51cmx9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5kYXRhLm5hbWUgPSByZW1vdGVVcmwudXJsO1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWNoZS5kYXRhLnVybCA9IHJlbW90ZVVybC51cmw7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnJlbW90ZUNhY2hlcy5zZXRTcHJpdGVGcmFtZShyZW1vdGVVcmwsIGNhY2hlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHNwcml0ZUZyYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLndhcm4oYCR7dGhpcy5fbG9nVGFnfeWKoOi9veWbvueJh+mUmeivryR7cmVtb3RlVXJsLnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFNrZWxldG9uKHBhdGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBpc05lZWRDYWNoZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3AuU2tlbGV0b25EYXRhPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGggJiYgbmFtZSkge1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBgJHtwYXRofS8ke25hbWV9YDtcbiAgICAgICAgICAgICAgICBsZXQgc3BpbmVBdGxhcyA9IGAke3BhdGh9LyR7bmFtZX0uYXRsYXNgO1xuICAgICAgICAgICAgICAgIGxldCBzcGluZVBuZyA9IGAke3BhdGh9LyR7bmFtZX0ucG5nYDtcbiAgICAgICAgICAgICAgICBsZXQgc3BpbmVKc29uID0gYCR7cGF0aH0vJHtuYW1lfS5qc29uYDtcbiAgICAgICAgICAgICAgICBsZXQgcmVtb3RlVXJsID0gcGFyc2VSZW1vdGVVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBsZXQgY2FjaGUgPSBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMuZ2V0KHJlbW90ZVVybCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggY2FjaGUuaXNMb2FkZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHNwLlNrZWxldG9uRGF0YT4oY2FjaGUuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLmZpbmlzaENiLnB1c2gocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWNoZSA9IG5ldyBSZXNvdXJjZUNhY2hlRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5yZXNvdXJjZVR5cGUgPSBSZXNvdXJjZVR5cGUuUmVtb3RlO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5hc3NldFR5cGUgPSBzcC5Ta2VsZXRvbkRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmJ1bmRsZSA9IEJVTkRMRV9SRU1PVEU7XG4gICAgICAgICAgICAgICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnJlbW90ZUNhY2hlcy5zZXQocmVtb3RlVXJsLGNhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgbWUuX2xvYWRSZW1vdGVSZXMoc3BpbmVQbmcsY2MuVGV4dHVyZTJELCBcImNhY2hlX3BuZ1wiLCBpc05lZWRDYWNoZSkudGhlbigodGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5fbG9hZFJlbW90ZVJlcyhzcGluZUpzb24sY2MuSnNvbkFzc2V0LCBcImNhY2hlX2pzb25cIiwgaXNOZWVkQ2FjaGUpLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lLl9sb2FkUmVtb3RlUmVzKHNwaW5lQXRsYXMsY2MuSnNvbkFzc2V0LCBcImNhY2hlX2F0bGFzXCIsIGlzTmVlZENhY2hlKS50aGVuKChhdGxhcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdGxhcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eUn+aIkFNrZWxldG9uRGF0YeaVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXQgPSBuZXcgc3AuU2tlbGV0b25EYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5za2VsZXRvbkpzb24gPSBqc29uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5hdGxhc1RleHQgPSBhdGxhcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQudGV4dHVyZXMgPSBbdGV4dHVyZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbmdOYW1lID0gbmFtZSArIFwiLnBuZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0W1widGV4dHVyZU5hbWVzXCJdID0gW3BuZ05hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLnVybCA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQubmFtZSA9IGNhY2hlLnVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQudXJsID0gY2FjaGUudXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS5kYXRhID0gYXNzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8c3AuU2tlbGV0b25EYXRhPihjYWNoZS5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLmRvRmluaXNoKGNhY2hlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLmRvRmluaXNoKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMucmVtb3ZlKHJlbW90ZVVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUuZG9GaW5pc2gobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMucmVtb3ZlKHJlbW90ZVVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS5kb0ZpbmlzaChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMucmVtb3ZlKHJlbW90ZVVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5Yqg6L296LWE5rqQXG4gICAgICogQHBhcmFtIHJlcXVlc3RVUkwg5Y6f6K+35rGC5Zyw5Z2AXG4gICAgICogQHBhcmFtIHN0b3JhZ2VQYXRoIOS4i+i9veWujOaIkOacrOWcsOWtmOWCqOWcsOWdgFxuICAgICAqL1xuICAgIHByaXZhdGUgX2xvYWRMb2NhbFJlcyhyZXF1ZXN0VVJMOiBzdHJpbmcsIHN0b3JhZ2VQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYCR7dGhpcy5fbG9nVGFnfeWKoOi9veacrOWcsOaWh+S7tjoke3N0b3JhZ2VQYXRofWApO1xuICAgICAgICBsZXQgdXJsRGF0YSA9IHBhcnNlUmVtb3RlVXJsKHJlcXVlc3RVUkwpO1xuICAgICAgICBsZXQgY2FjaGUgPSBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMuZ2V0KHVybERhdGEpO1xuICAgICAgICBpZiAoIGNhY2hlICl7XG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShzdG9yYWdlUGF0aCwoZXJyLGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIGNhY2hlICl7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUuZG9Kc2JGaW5pc2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ33liqDovb3mnKzlnLDotYTmupDlrozmiJA6JHtzdG9yYWdlUGF0aH0gPT4gJHtyZXF1ZXN0VVJMfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy53YXJuKGAke3RoaXMuX2xvZ1RhZ33liqDovb3mnKzlnLDotYTmupDlvILluLg6JHtzdG9yYWdlUGF0aH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlLmRvSnNiRmluaXNoKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8v5oqK5YaN5Yqg6L296L+H56iL6YeM77yM5Y+M5Yqg6L295ZCM5LiA6LWE5rqQ55qE5Zue6LCD6YO95Zue6LCD5Zue5Y67XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmRvRmluaXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNjLmVycm9yKGDmib7kuI3liLDmnKzlnLDnvJPlrZggcmVxdWVzdFVSTCA6ICR7cmVxdWVzdFVSTH0gc3RvcmFnZVBhdGggOiAke3N0b3JhZ2VQYXRofWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZFJlbW90ZVJlcyh1cmw6IHN0cmluZyx0eXBlIDogdHlwZW9mIGNjLkFzc2V0ICwgZGF0YWJhc2VUYWJsZTogRGF0YUJhc2VUYWJsZSwgaXNOZWVkQ2FjaGU6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmxEYXRhID0gcGFyc2VSZW1vdGVVcmwodXJsKTtcbiAgICAgICAgICAgIGxldCBjYWNoZSA9IE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnJlbW90ZUNhY2hlcy5nZXQodXJsRGF0YSk7XG4gICAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAvL+aciee8k+WtmCzmn6XnnIvmmK/lkKblt7Lnu4/liqDovb1cbiAgICAgICAgICAgICAgICBpZiAoY2FjaGUuaXNMb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lpoLmnpzlt7Lnu4/liqDovb3lrozmiJBcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYWNoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+ato+WcqOWKoOi9veS4rVxuICAgICAgICAgICAgICAgICAgICBjYWNoZS5maW5pc2hDYi5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/msqHmnInnvJPlrZjlrZjlnKgs55Sf5oiQ5Yqg6L2957yT5a2YXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBuZXcgUmVzb3VyY2VDYWNoZURhdGEoKTtcbiAgICAgICAgICAgICAgICBjYWNoZS5yZXNvdXJjZVR5cGUgPSBSZXNvdXJjZVR5cGUuUmVtb3RlO1xuICAgICAgICAgICAgICAgIGNhY2hlLmFzc2V0VHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgTWFuYWdlci5jYWNoZU1hbmFnZXIucmVtb3RlQ2FjaGVzLnNldCh1cmxEYXRhLCBjYWNoZSk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0pTQikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aCA9IG1ha2VSZW1vdGVVcmwodXJsRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdWxsUGF0aCA9IGAke2pzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCl9JHtwYXRofWA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ30ke3VybERhdGEudXJsfeS4i+i9veeahOi1hOa6kOWwhuWtmOWFpeacrOWcsCR7ZnVsbFBhdGh9YCk7XG4gICAgICAgICAgICAgICAgICAgIC8v5YWI57yT5a2Y5Zue6LCD77yM5Yqg6L295a6M5oiQ5ZCO5YaN5Zue6LCDXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLmpzYkZpbmlzaENiID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUuanNiU3RvcmFnZVBhdGggPSBmdWxsUGF0aDtcblxuICAgICAgICAgICAgICAgICAgICAvL+WFiOWGjeacrOWcsOafpeaJvuacieayoeacieS4i+i9veWlveeahOi1hOa6kO+8jOWmguaenOacie+8jOebtOaOpeWIm+W7ulxuICAgICAgICAgICAgICAgICAgICBpZiAoanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChmdWxsUGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05lZWRDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ33mnKzlnLDlt7Lnu4/lrZjlnKgke3VybERhdGEudXJsfSDmnKzlnLDot6/lvoTkuLo6JHtmdWxsUGF0aH0gLOS9v+eUqOacrOWcsOe8k+WtmOi1hOa6kOWIm+W7umApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRMb2NhbFJlcyh1cmxEYXRhLnVybCwgZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyh0aGlzLl9sb2dUYWcsIGAke3VybERhdGEudXJsfei1hOa6kOS4jemcgOimgee8k+WtmCzph43mlrDkuIvovb1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc2IuZmlsZVV0aWxzLnJlbW92ZUZpbGUoZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHVzaFRhc2sodXJsRGF0YS51cmwsZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wUGF0aCA9IGAke2pzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCl9JHt1cmxEYXRhLnBhdGh9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QodGVtcFBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5sb2coYOW3sue7j+WtmOWcqOaWh+S7tuWkue+8miR7dGVtcFBhdGh9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGDliJvlu7rmlofku7blpLk6JHt0ZW1wUGF0aH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc2IuZmlsZVV0aWxzLmNyZWF0ZURpcmVjdG9yeSh0ZW1wUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hUYXNrKHVybERhdGEudXJsLGZ1bGxQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05lZWRDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/nvZHpobVoNeaWueW8j+WKoOi9vVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXIuZGF0YUJhc2UuaXNTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmRhdGFCYXNlLmdldChkYXRhYmFzZVRhYmxlLCB1cmxEYXRhLnVybCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEg1RGF0YWJhc2VEYXRhKGNhY2hlLCBkYXRhYmFzZVRhYmxlLCByZXNvbHZlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRINVJlbW90ZURhdGEoY2FjaGUsIGRhdGFiYXNlVGFibGUsIHVybERhdGEsIHJlc29sdmUsIGlzTmVlZENhY2hlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkSDVSZW1vdGVEYXRhKGNhY2hlLCBkYXRhYmFzZVRhYmxlLCB1cmxEYXRhLCByZXNvbHZlLCBpc05lZWRDYWNoZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/kuI3pnIDopoHlgZrmnKzlnLDnvJPlrZjlpITnkIZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRINVJlbW90ZURhdGEoY2FjaGUsIGRhdGFiYXNlVGFibGUsIHVybERhdGEsIHJlc29sdmUsIGlzTmVlZENhY2hlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRINVJlbW90ZURhdGEoY2FjaGU6IFJlc291cmNlQ2FjaGVEYXRhLCBkYXRhYmFzZVRhYmxlOiBEYXRhQmFzZVRhYmxlLCB1cmxEYXRhOiBSZW1vdGVVcmwsIHJlc29sdmUsIGlzTmVlZENhY2hlOiBib29sZWFuLCBpc1N1cHBvcnREYXRhYmFzZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgcGFja2dlID0gbmV3IFJlcXVlc3RQYWNrZ2U7XG4gICAgICAgIHBhY2tnZS5kYXRhLnVybCA9IHVybERhdGEudXJsO1xuICAgICAgICBwYWNrZ2UuZGF0YS5pc0F1dG9BdHRhY2hDdXJyZW50VGltZSA9ICFpc05lZWRDYWNoZTtcbiAgICAgICAgaWYgKGRhdGFiYXNlVGFibGUgPT0gXCJjYWNoZV9wbmdcIikge1xuICAgICAgICAgICAgcGFja2dlLmRhdGEucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XG4gICAgICAgIH1cbiAgICAgICAgcGFja2dlLnNlbmQoKG5ldERhdGEpID0+IHtcbiAgICAgICAgICAgIC8v5a2Y5YWl5pWw5o2u5bqTXG4gICAgICAgICAgICBpZiAoaXNOZWVkQ2FjaGUgJiYgaXNTdXBwb3J0RGF0YWJhc2UpIHtcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLmRhdGFCYXNlLnB1dChkYXRhYmFzZVRhYmxlLCB7IGtleTogcGFja2dlLmRhdGEudXJsLCBkYXRhOiBuZXREYXRhIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbG9hZEg1RGF0YWJhc2VEYXRhKGNhY2hlLCBkYXRhYmFzZVRhYmxlLCByZXNvbHZlLCBuZXREYXRhKTtcbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2Mud2Fybih0aGlzLl9sb2dUYWcsIGDliqDovb3nvZHnu5zotYTmupDlvILluLg6JHt1cmxEYXRhLnVybH1gKTtcbiAgICAgICAgICAgIGNhY2hlLmRvRmluaXNoKG51bGwpO1xuICAgICAgICAgICAgTWFuYWdlci5jYWNoZU1hbmFnZXIucmVtb3RlQ2FjaGVzLnJlbW92ZSh1cmxEYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZEg1RGF0YWJhc2VEYXRhKGNhY2hlOiBSZXNvdXJjZUNhY2hlRGF0YSwgZGF0YWJhc2VUYWJsZTogRGF0YUJhc2VUYWJsZSwgcmVzb2x2ZSwgZGF0YSkge1xuICAgICAgICBpZiAoZGF0YWJhc2VUYWJsZSA9PSBcImNhY2hlX3BuZ1wiKSB7XG4gICAgICAgICAgICAvL+WIm+W7uuWbvueJh1xuICAgICAgICAgICAgbGV0IGltZ1VybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSk7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGltZ1VybDtcblxuICAgICAgICAgICAgLy/nrYnlm77niYfliqDovb3lrozmiJDlkI7vvIzmiY3liJvlu7rlm77niYfotLTlm77vvIzkuI3nhLbmsqHlip7ms5XmraPluLjmmL7npLogXG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5UZXh0dXJlMkQoKTtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLmluaXRXaXRoRWxlbWVudChpbWFnZSk7XG4gICAgICAgICAgICAgICAgY2FjaGUuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhY2hlLmRhdGEgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoY2FjaGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgY2FjaGUuZG9GaW5pc2goY2FjaGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChpbWdVcmwpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhYmFzZVRhYmxlID09IFwiY2FjaGVfanNvblwiKSB7XG4gICAgICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICBjYWNoZS5pc0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBjYWNoZS5kYXRhID0ganNvbjtcbiAgICAgICAgICAgIHJlc29sdmUoY2FjaGUuZGF0YSk7XG4gICAgICAgICAgICBjYWNoZS5kb0ZpbmlzaChjYWNoZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkYXRhYmFzZVRhYmxlID09IFwiY2FjaGVfYXRsYXNcIikge1xuICAgICAgICAgICAgY2FjaGUuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2FjaGUuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICByZXNvbHZlKGNhY2hlLmRhdGEpO1xuICAgICAgICAgICAgY2FjaGUuZG9GaW5pc2goY2FjaGUuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g55Sx5Li75ri45oiP5o6n5Yi25Zmo6amx5Yqo77yM5Zyo5LiL6L296L+c56iL6LWE5rqQ5pe277yM6K6+572u5LiA5Liq5LiK6ZmQ5LiL6L295Lu75Yqh5pWw5o2u77yM5Lul5YWN5ZCM5LiA5pe26Ze05Lu75Yqh5pWw6YeP6L+H5aSnICovXG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmICggQ0NfSlNCICl7XG4gICAgICAgICAgICB3aGlsZSAoIHRoaXMuX2N1cnJlbnRUYXNrQ291bnQgPCB0aGlzLm1heENvbmN1cnJlbnRUYXNrICYmIHRoaXMuX3Rhc2tRdWV1ZS5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFRhc2tDb3VudCArKztcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl90YXNrUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKGDliJvlu7rkuIvovb3ku7vliqE6JHt2YWx1ZS51cmx9YCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhY2tnZSA9IG5ldyBSZXF1ZXN0UGFja2dlO1xuICAgICAgICAgICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcGFja2dlLmRhdGEudXJsID0gdmFsdWUudXJsO1xuICAgICAgICAgICAgICAgIHBhY2tnZS5kYXRhLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICAgICAgICAgICAgICBwYWNrZ2Uuc2VuZCgobmV0RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+WGmeacrOWcsFxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KG5ldERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICggQ0NfSlNCICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1N1Y2Nlc3MgPSAganNiLmZpbGVVdGlscy53cml0ZURhdGFUb0ZpbGUoIGRhdGEgLCB2YWx1ZS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIGlzU3VjY2VzcyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWUub25Mb2FkU3VjY2Vzcyh7cmVxdWVzdFVSTCA6IHZhbHVlLnVybCxzdG9yYWdlUGF0aCA6IHZhbHVlLnBhdGh9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5vbkxvYWRFcnJvcih7cmVxdWVzdFVSTCA6IHZhbHVlLnVybCxzdG9yYWdlUGF0aCA6IHZhbHVlLnBhdGh9LDAsMCxg5YaZ5YWl5pys5ZywJHt2YWx1ZS5wYXRofeWksei0pWApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGDkuIvovb3plJnor68gOiAke3ZhbHVlLnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgbWUub25Mb2FkRXJyb3Ioe3JlcXVlc3RVUkwgOiB2YWx1ZS51cmwsc3RvcmFnZVBhdGggOiB2YWx1ZS5wYXRofSxlcnIudHlwZSwwLGVyci5yZWFzb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWKoOi9veaIkOWKnyAqL1xuICAgIHByaXZhdGUgb25Mb2FkU3VjY2Vzcyh0YXNrKSB7XG4gICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGAke3RoaXMuX2xvZ1RhZ33liqDovb3otYTmupDlrozmiJAgOiAke3Rhc2sucmVxdWVzdFVSTH1gKTtcblxuICAgICAgICAvL+S4i+i9veWujOaIkO+8jOWHj+WwkeW9k+WJjeS7u+WKoeaVsOmHj1xuICAgICAgICB0aGlzLl9jdXJyZW50VGFza0NvdW50LS07XG4gICAgICAgIHRoaXMuX2xvYWRMb2NhbFJlcyh0YXNrLnJlcXVlc3RVUkwsIHRhc2suc3RvcmFnZVBhdGgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2FkRXJyb3IodGFzaywgZXJyb3JDb2RlLCBlcnJvckNvZGVJbnRlcm5hbCwgZXJyb3JTdHIpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHt0aGlzLl9sb2dUYWd9dGFzayB1cmwgOiAke3Rhc2sucmVxdWVzdFVSTH0gLCBlcnJvckNvZGUgOiAke2Vycm9yQ29kZX0gLCBpbnRlcm5hbCA6ICR7ZXJyb3JDb2RlSW50ZXJuYWx9IHJlYXNvbiA6ICR7ZXJyb3JTdHJ9YCk7XG4gICAgICAgIC8v5LiL6L296ZSZ6K+v77yM5YeP5bCR5b2T5YmN5Lu75Yqh5pWw6YePIFxuICAgICAgICB0aGlzLl9jdXJyZW50VGFza0NvdW50LS07XG4gICAgICAgIGxldCByZW1vdGVVcmwgPSBwYXJzZVJlbW90ZVVybCh0YXNrLnJlcXVlc3RVUkwpO1xuICAgICAgICBsZXQgY2FjaGUgPSBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdGVDYWNoZXMuZ2V0KHJlbW90ZVVybCk7XG4gICAgICAgIGNhY2hlLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgY2FjaGUuZGF0YSA9IG51bGw7XG4gICAgICAgIGlmIChDQ19ERUJVRykgY2Mud2FybihgJHt0aGlzLl9sb2dUYWd95LiL6L296L+c56iL6LWE5rqQ5byC5bi4OiR7dGFzay5yZXF1ZXN0VVJMfWApO1xuICAgICAgICBjYWNoZS5kb0pzYkZpbmlzaChudWxsKTtcbiAgICAgICAgLy/miorlho3liqDovb3ov4fnqIvph4zvvIzlj4zliqDovb3lkIzkuIDotYTmupDnmoTlm57osIPpg73lm57osIPlm57ljrtcbiAgICAgICAgY2FjaGUuZG9GaW5pc2gobnVsbCk7XG4gICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnJlbW90ZUNhY2hlcy5yZW1vdmUocmVtb3RlVXJsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHB1c2hUYXNrKCB1cmwgOiBzdHJpbmcgLCBwYXRoIDogc3RyaW5nICl7XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwIDsgaSA8IHRoaXMuX3Rhc2tRdWV1ZS5sZW5ndGggOyBpKysgKXtcbiAgICAgICAgICAgIGlmICggdGhpcy5fdGFza1F1ZXVlW2ldLnVybCA9PSB1cmwgKXtcbiAgICAgICAgICAgICAgICBpZiAoIENDX0RFQlVHICkgY2MubG9nKGDlt7Lnu4/lrZjlnKjkuIvovb3ku7vliqE6JHt1cmx9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggQ0NfREVCVUcgKSBjYy5sb2coYOW9k+WJjeS7u+WKoeaVsDoke3RoaXMuX2N1cnJlbnRUYXNrQ291bnR9IC8gJHt0aGlzLm1heENvbmN1cnJlbnRUYXNrfSDmt7vliqDkuIvovb3ku7vliqE6JHt1cmx9YCk7XG4gICAgICAgIHRoaXMuX3Rhc2tRdWV1ZS5wdXNoKHt1cmw6IHVybCxwYXRoIDogcGF0aH0pO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgQXNzZXRNYW5hZ2VyIHtcbiAgICBwcml2YXRlIGxvZ1RhZyA9IGBbQXNzZXRNYW5hZ2VyXTogYDtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEFzc2V0TWFuYWdlciA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBBc3NldE1hbmFnZXIoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3RlID0gbmV3IFJlbW90ZUxvYWRlcigpO1xuICAgIHB1YmxpYyBnZXQgcmVtb3RlKCl7IHJldHVybiB0aGlzLl9yZW1vdGU7fVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5ZCdW5kbGVcbiAgICAgKiBAcGFyYW0gYnVuZGxlIEJ1bmRsZeWQjXxCdW5kbGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QnVuZGxlKGJ1bmRsZTogQlVORExFX1RZUEUgKSB7XG4gICAgICAgIGlmICggYnVuZGxlICl7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBidW5kbGUgPT0gXCJzdHJpbmdcIiApe1xuICAgICAgICAgICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYnVuZGxlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2FkKFxuICAgICAgICBidW5kbGU6IEJVTkRMRV9UWVBFLFxuICAgICAgICBwYXRoOiBzdHJpbmcsXG4gICAgICAgIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCxcbiAgICAgICAgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsXG4gICAgICAgIG9uQ29tcGxldGU6IChkYXRhOlJlc291cmNlQ2FjaGVEYXRhKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgICAgICBsZXQgY2FjaGUgPSBNYW5hZ2VyLmNhY2hlTWFuYWdlci5nZXQoYnVuZGxlLHBhdGgpO1xuICAgICAgICAgICAgaWYgKCBjYWNoZSApe1xuICAgICAgICAgICAgICAgIC8v5a2Y5Zyo57yT5a2Y5L+h5oGvXG4gICAgICAgICAgICAgICAgaWYgKCBjYWNoZS5pc0xvYWRlZCApe1xuICAgICAgICAgICAgICAgICAgICAvL+W3sue7j+WKoOi9veWujOaIkFxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcgJiYgY2FjaGUuc3RhdHVzID09IFJlc291cmNlQ2FjaGVTdGF0dXMuV0FJVFRJTkdfRk9SX1JFTEVBU0UgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4odGhpcy5sb2dUYWcsIGDotYTmupA6JHtwYXRofSDnrYnlvoXph4rmlL7vvIzkvYbotYTmupDlt7Lnu4/liqDovb3lrozmiJDvvIzmraTml7bmnInkurrlj4jph43mlrDliqDovb3vvIzkuI3ov5vooYzph4rmlL7lpITnkIZgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL+WKoOi9veWujOaIkFxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKGNhY2hlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHICYmIGNhY2hlLnN0YXR1cyA9PSBSZXNvdXJjZUNhY2hlU3RhdHVzLldBSVRUSU5HX0ZPUl9SRUxFQVNFICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKHRoaXMubG9nVGFnLCBg6LWE5rqQOiR7cGF0aH3nrYnlvoXph4rmlL7vvIzkvYbotYTmupDlpITnkIbliqDovb3ov4fnqIvkuK3vvIzmraTml7bmnInkurrlj4jph43mlrDliqDovb3vvIzkuI3ov5vooYzph4rmlL7lpITnkIZgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWNoZS5maW5pc2hDYi5wdXNoKG9uQ29tcGxldGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+mHjeaWsOWkjeS9jei1hOa6kOeKtuaAgVxuICAgICAgICAgICAgICAgIGNhY2hlLnN0YXR1cyA9IFJlc291cmNlQ2FjaGVTdGF0dXMuTk9ORTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8v5peg57yT5a2Y5L+h5oGvXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBuZXcgUmVzb3VyY2VDYWNoZURhdGEoKTtcbiAgICAgICAgICAgICAgICBjYWNoZS51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIGNhY2hlLmFzc2V0VHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgY2FjaGUuYnVuZGxlID0gYnVuZGxlO1xuICAgICAgICAgICAgICAgIE1hbmFnZXIuY2FjaGVNYW5hZ2VyLnNldChidW5kbGUscGF0aCxjYWNoZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS50aW1lKGDliqDovb3otYTmupAgOiAke2NhY2hlLnVybH1gKTtcbiAgICAgICAgICAgICAgICBsZXQgX2J1bmRsZSA9IHRoaXMuZ2V0QnVuZGxlKGJ1bmRsZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFfYnVuZGxlICl7XG4gICAgICAgICAgICAgICAgICAgIC8v5aaC5p6cYnVuZGxl5LiN5a2Y5ZyoXG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihgJHt0aGlzLmxvZ1RhZ30gJHtidW5kbGV9IOayoeacieWKoOi9ve+8jOivt+WFiOWKoOi9vWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkxvYWRDb21wbGV0ZShjYWNoZSxvbkNvbXBsZXRlLGVycm9yLG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBfYnVuZGxlLmdldChwYXRoLHR5cGUpO1xuICAgICAgICAgICAgICAgIGlmICggcmVzICl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uTG9hZENvbXBsZXRlKGNhY2hlLG9uQ29tcGxldGUsbnVsbCxyZXMpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpZiAoIG9uUHJvZ3Jlc3MgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9idW5kbGUubG9hZChwYXRoLHR5cGUsb25Qcm9ncmVzcyx0aGlzLl9vbkxvYWRDb21wbGV0ZS5iaW5kKHRoaXMsY2FjaGUsb25Db21wbGV0ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9idW5kbGUubG9hZChwYXRoLHR5cGUsdGhpcy5fb25Mb2FkQ29tcGxldGUuYmluZCh0aGlzLGNhY2hlLG9uQ29tcGxldGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkxvYWRDb21wbGV0ZSggY2FjaGUgOiBSZXNvdXJjZUNhY2hlRGF0YSAsIGNvbXBsZXRlQ2FsbGJhY2s6IChkYXRhOiBSZXNvdXJjZUNhY2hlRGF0YSkgPT4gdm9pZCxlcnI6RXJyb3IsZGF0YTpjYy5Bc3NldCl7XG4gICAgICAgIGNhY2hlLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgLy/mt7vliqDlvJXnlKjlhbPns7tcbiAgICAgICAgbGV0IHRlbXBDYWNoZSA9IGNhY2hlO1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYy5lcnJvcihgJHt0aGlzLmxvZ1RhZ33liqDovb3otYTmupDlpLHotKU6JHtjYWNoZS51cmx9IOWOn+WboDoke2Vyci5tZXNzYWdlID8gZXJyLm1lc3NhZ2UgOiBcIuacquefpVwifWApO1xuICAgICAgICAgICAgY2FjaGUuZGF0YSA9IG51bGw7XG4gICAgICAgICAgICB0ZW1wQ2FjaGUuZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdmUoY2FjaGUuYnVuZGxlLGNhY2hlLnVybCk7XG4gICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKGNhY2hlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGAke3RoaXMubG9nVGFnfeWKoOi9vei1hOa6kOaIkOWKnzoke2NhY2hlLnVybH1gKTtcbiAgICAgICAgICAgIGNhY2hlLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgdGVtcENhY2hlLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayhjYWNoZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WKoOi9vei/h+eoi++8jOacieS4jeWQjOWcsOaWueiwg+eUqOi/h+adpeWKoOi9veWQjOS4gOS4qui1hOa6kOeahOWcsOaWue+8jOmDveWbnuiwg+WbnuWOu1xuICAgICAgICBjYWNoZS5kb0ZpbmlzaCh0ZW1wQ2FjaGUpO1xuICAgICAgICBjYWNoZS5kb0dldCh0ZW1wQ2FjaGUuZGF0YSk7XG5cbiAgICAgICAgaWYgKGNhY2hlLnN0YXR1cyA9PSBSZXNvdXJjZUNhY2hlU3RhdHVzLldBSVRUSU5HX0ZPUl9SRUxFQVNFKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLndhcm4odGhpcy5sb2dUYWcsIGDotYTmupA6JHtjYWNoZS51cmx95Yqg6L295a6M5oiQ77yM5L2G57yT5a2Y54q25oCB5Li6562J5b6F6ZSA5q+B77yM6ZSA5q+B6LWE5rqQYCk7XG4gICAgICAgICAgICBpZiAoY2FjaGUuZGF0YSkge1xuICAgICAgICAgICAgICAgIGNhY2hlLnN0YXR1cyA9IFJlc291cmNlQ2FjaGVTdGF0dXMuTk9ORTtcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXNvdXJjZUluZm87XG4gICAgICAgICAgICAgICAgaW5mby51cmwgPSBjYWNoZS51cmw7XG4gICAgICAgICAgICAgICAgaW5mby50eXBlID0gY2FjaGUuYXNzZXRUeXBlO1xuICAgICAgICAgICAgICAgIGluZm8uZGF0YSA9IGNhY2hlLmRhdGE7XG4gICAgICAgICAgICAgICAgaW5mby5idW5kbGUgPSBjYWNoZS5idW5kbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlQXNzZXQoaW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLnRpbWVFbmQoYOWKoOi9vei1hOa6kCA6ICR7Y2FjaGUudXJsfWApO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxlYXNlQXNzZXQoIGluZm8gOiBSZXNvdXJjZUluZm8gKXtcbiAgICAgICAgaWYgKCBpbmZvICYmIGluZm8uYnVuZGxlICl7XG4gICAgICAgICAgICBNYW5hZ2VyLmNhY2hlTWFuYWdlci5yZW1vdmUoaW5mby5idW5kbGUsaW5mby51cmwpO1xuICAgICAgICAgICAgbGV0IGJ1bmRsZSA9IHRoaXMuZ2V0QnVuZGxlKGluZm8uYnVuZGxlKTtcbiAgICAgICAgICAgIGlmICggYnVuZGxlICl7XG4gICAgICAgICAgICAgICAgaW5mbyAmJiBpbmZvLmRhdGEgJiYgaW5mby5kYXRhLmRlY1JlZigpO1xuICAgICAgICAgICAgICAgIGJ1bmRsZS5yZWxlYXNlKGluZm8udXJsLGluZm8udHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=