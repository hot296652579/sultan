"use strict";
cc._RF.push(module, 'b4bfajBspdK6rFm4JM2XHck', 'CacheManager');
// script/framework/assetManager/CacheManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
const Defines_1 = require("../base/Defines");
const Framework_1 = require("../Framework");
class ResourceCache {
    constructor(name) {
        this._caches = new Map();
        this.name = "unknown";
        this.name = name;
    }
    isInvalid(cache) {
        return cache.isLoaded && cache.data && !cc.isValid(cache.data);
    }
    get(path, isCheck) {
        if (this._caches.has(path)) {
            let cache = this._caches.get(path);
            if (isCheck && this.isInvalid(cache)) {
                //资源已经释放
                cc.warn(`资源加载完成，但已经被释放 , 重新加载资源 : ${path}`);
                this.remove(path);
                return null;
            }
            return this._caches.get(path);
        }
        return null;
    }
    set(path, data) {
        this._caches.set(path, data);
    }
    remove(path) {
        return this._caches.delete(path);
    }
}
class CacheInfo {
    constructor() {
        this.refCount = 0;
        this.url = "";
        /**@description 是否常驻于内存中 */
        this.retain = false;
    }
}
class RemoteCaches {
    constructor() {
        this._caches = new Map();
        this._spriteFrameCaches = new Map();
        this._resMap = new Map();
    }
    /**
     * @description 获取远程缓存数据
     * @param type 远程奖状类型
     * @param remoteUrl url数据
     */
    get(url) {
        let tempUrl = "";
        if (typeof url == "string") {
            let remoteUrl = parseRemoteUrl(url);
            tempUrl = makeRemoteUrl(remoteUrl);
        }
        else {
            tempUrl = makeRemoteUrl(url);
        }
        if (this._caches.has(tempUrl)) {
            return this._caches.get(tempUrl);
        }
        return null;
    }
    getSpriteFrame(url) {
        let tempUrl = "";
        if (typeof url == "string") {
            let remoteUrl = parseRemoteUrl(url);
            tempUrl = makeRemoteUrl(remoteUrl);
        }
        else {
            tempUrl = makeRemoteUrl(url);
        }
        if (this._spriteFrameCaches.has(tempUrl)) {
            let cache = this._spriteFrameCaches.get(tempUrl);
            let texture2D = this.get(url);
            if (texture2D) {
                return cache;
            }
            else {
                this.remove(url);
                return null;
            }
        }
        return null;
    }
    setSpriteFrame(url, data) {
        let tempUrl = "";
        if (typeof url == "string") {
            let remoteUrl = parseRemoteUrl(url);
            tempUrl = makeRemoteUrl(remoteUrl);
        }
        else {
            tempUrl = makeRemoteUrl(url);
        }
        if (data && data instanceof cc.Texture2D) {
            //同一图片加载两次也会回调到这里，这里如果当前精灵缓存中有，不在重新创建
            let spriteFrame = this.getSpriteFrame(url);
            if (spriteFrame) {
                return (spriteFrame.data);
            }
            let cache = new Defines_1.ResourceCacheData();
            cache.data = new cc.SpriteFrame(data);
            // cache.data.url = tempUrl;
            cache.isLoaded = true;
            cache.url = tempUrl;
            this._spriteFrameCaches.set(tempUrl, cache);
            return (cache.data);
        }
        return null;
    }
    set(url, data) {
        let tempUrl = "";
        if (typeof url == "string") {
            let remoteUrl = parseRemoteUrl(url);
            tempUrl = makeRemoteUrl(remoteUrl);
        }
        else {
            tempUrl = makeRemoteUrl(url);
        }
        data.url = tempUrl;
        this._caches.set(tempUrl, data);
    }
    _getCacheInfo(info, isNoFoundCreate = true) {
        if (info && info.url && info.url.length > 0) {
            let remoteUrl = parseRemoteUrl(info.url);
            let url = makeRemoteUrl(remoteUrl);
            if (!this._resMap.has(url)) {
                if (isNoFoundCreate) {
                    let cache = new CacheInfo;
                    cache.url = info.url;
                    this._resMap.set(url, cache);
                }
                else {
                    return null;
                }
            }
            return this._resMap.get(url);
        }
        return null;
    }
    retainAsset(info) {
        if (info && info.data) {
            let cache = this._getCacheInfo(info);
            if (cache) {
                if (cache.retain) {
                    if (!info.retain) {
                        if (CC_DEBUG)
                            cc.warn(`资源 : ${info.url} 已经被设置成常驻资源，不能改变其属性`);
                    }
                }
                else {
                    cache.retain = info.retain;
                }
                cache.refCount++;
                if (cache.retain) {
                    cache.refCount = 999999;
                }
            }
        }
    }
    releaseAsset(info) {
        if (info && info.data) {
            let cache = this._getCacheInfo(info, false);
            if (cache) {
                if (cache.retain) {
                    //常驻内存中
                    return;
                }
                cache.refCount--;
                if (cache.refCount <= 0) {
                    this.remove(cache.url);
                }
            }
        }
    }
    remove(url) {
        let tempUrl = "";
        if (typeof url == "string") {
            let remoteUrl = parseRemoteUrl(url);
            tempUrl = makeRemoteUrl(remoteUrl);
        }
        else {
            tempUrl = makeRemoteUrl(url);
        }
        this._resMap.delete(tempUrl);
        //先删除精灵帧
        if (this._spriteFrameCaches.has(tempUrl)) {
            this._spriteFrameCaches.delete(tempUrl);
            if (CC_DEBUG)
                cc.log(`remove remote sprite frames resource url : ${tempUrl}`);
        }
        let cache = this._caches.has(tempUrl) ? this._caches.get(tempUrl) : null;
        if (cache && cache.data instanceof sp.SkeletonData) {
            //这里面需要删除加载进去的三个文件缓存 
            this.remove(`${cache.url}.atlas`);
            this.remove(`${cache.url}.png`);
            this.remove(`${cache.url}.json`);
        }
        let success = this._caches.delete(tempUrl);
        if (success) {
            if (CC_JSB && cache && cache.data instanceof cc.Asset) {
                cc.assetManager.releaseAsset(cache.data);
                if (CC_DEBUG)
                    cc.log(`释放加载的本地远程资源:${cache.jsbStoragePath}`);
            }
            if (CC_DEBUG)
                cc.log(`remove remote cache url : ${tempUrl}`);
        }
        return success;
    }
    showCaches() {
        cc.log(`---- [RemoteCaches] showCaches ----`);
        let content = [];
        let invalidContent = [];
        this._spriteFrameCaches.forEach((data, key, source) => {
            let itemContent = { url: data.url, isLoaded: data.isLoaded, isValid: cc.isValid(data.data), assetType: cc.js.getClassName(data.assetType), data: data.data ? cc.js.getClassName(data.data) : null, status: data.status };
            let item = { url: key, data: itemContent };
            if (data.isLoaded && ((data.data && !cc.isValid(data.data)) || !data.data)) {
                invalidContent.push(item);
            }
            else {
                content.push(item);
            }
        });
        if (content.length > 0) {
            cc.log(`----------------Current valid spriteFrame Caches------------------`);
            cc.log(JSON.stringify(content));
        }
        if (invalidContent.length > 0) {
            cc.log(`----------------Current invalid spriteFrame Caches------------------`);
            cc.log(JSON.stringify(invalidContent));
        }
        content = [];
        invalidContent = [];
        this._caches.forEach((data, key, source) => {
            let itemContent = { url: data.url, isLoaded: data.isLoaded, isValid: cc.isValid(data.data), assetType: cc.js.getClassName(data.assetType), data: data.data ? cc.js.getClassName(data.data) : null, status: data.status };
            let item = { url: key, data: itemContent };
            if (data.isLoaded && data.data && !cc.isValid(data.data)) {
                invalidContent.push(item);
            }
            else {
                content.push(item);
            }
        });
        if (content.length > 0) {
            cc.log(`----------------Current valid Caches------------------`);
            cc.log(JSON.stringify(content));
        }
        if (invalidContent.length > 0) {
            cc.log(`----------------Current invalid Caches------------------`);
            cc.log(JSON.stringify(invalidContent));
        }
        if (this._resMap.size > 0) {
            cc.log(`----------------Current resource reference Caches------------------`);
            content = [];
            this._resMap.forEach((value, key) => {
                let item = { url: key, data: { refCount: value.refCount, url: value.url, retain: value.retain } };
                content.push(item);
            });
            cc.log(JSON.stringify(content));
        }
    }
}
class CacheManager {
    constructor() {
        this.logTag = `[CacheManager]: `;
        this._bundles = new Map();
        this._remoteCaches = new RemoteCaches();
    }
    static Instance() {
        return this._instance || (this._instance = new CacheManager());
    }
    get remoteCaches() { return this._remoteCaches; }
    getBundleName(bundle) {
        if (typeof bundle == "string") {
            return bundle;
        }
        else {
            return bundle ? bundle.name : null;
        }
    }
    get(bundle, path, isCheck = true) {
        let bundleName = this.getBundleName(bundle);
        if (bundleName && this._bundles.has(bundleName)) {
            return this._bundles.get(bundleName).get(path, isCheck);
        }
        return null;
    }
    set(bundle, path, data) {
        let bundleName = this.getBundleName(bundle);
        if (bundleName) {
            if (!this._bundles.has(bundleName)) {
                let cache = new ResourceCache(bundleName);
                cache.set(path, data);
                this._bundles.set(bundleName, cache);
            }
            else {
                this._bundles.get(bundleName).set(path, data);
            }
        }
    }
    remove(bundle, path) {
        let bundleName = this.getBundleName(bundle);
        if (bundleName) {
            if (this._bundles.has(bundleName)) {
                return this._bundles.get(bundleName).remove(path);
            }
        }
        return false;
    }
    _getGetCacheByAsyncArgs() {
        if (arguments.length < 3) {
            if (CC_DEBUG)
                cc.error(`${this.logTag}参数传入有误，必须两个参数`);
            return null;
        }
        if (typeof arguments[0] != "string") {
            if (CC_DEBUG)
                cc.error(`${this.logTag}传入第一个参数有误,必须是string`);
            return null;
        }
        if (!cc.js.isChildClassOf(arguments[1], cc.Asset)) {
            if (CC_DEBUG)
                cc.error(`${this.logTag}传入的第二个参数有误,必须是cc.Asset的子类`);
            return null;
        }
        return { url: arguments[0], type: arguments[1], bundle: arguments[2] };
    }
    getCache() {
        let args = arguments;
        let me = this;
        return new Promise((resolve) => {
            let _args = me._getGetCacheByAsyncArgs.apply(me, args);
            if (!_args) {
                resolve(null);
                return;
            }
            let cache = me.get(_args.bundle, _args.url);
            if (cache) {
                if (cache.isLoaded) {
                    //已经加载完成
                    if (_args.type) {
                        if (cache.data instanceof _args.type) {
                            resolve(cache.data);
                        }
                        else {
                            if (CC_DEBUG)
                                cc.error(`${this.logTag}传入类型:${cc.js.getClassName(_args.type)}与资源实际类型: ${cc.js.getClassName(cache.data)}不同 url : ${cache.url}`);
                            resolve(null);
                        }
                    }
                    else {
                        resolve(cache.data);
                    }
                }
                else {
                    //加载中
                    cache.getCb.push(resolve);
                }
            }
            else {
                resolve(null);
            }
        });
    }
    getCacheByAsync() {
        let me = this;
        let args = this._getGetCacheByAsyncArgs.apply(this, arguments);
        return new Promise((resolve) => {
            if (!args) {
                resolve(null);
                return;
            }
            me.getCache(args.url, args.type, args.bundle).then((data) => {
                if (data && data instanceof args.type) {
                    resolve(data);
                }
                else {
                    //加载资源
                    Framework_1.Manager.assetManager.load(args.bundle, args.url, args.type, null, (cache) => {
                        if (cache && cache.data && cache.data instanceof args.type) {
                            resolve(cache.data);
                        }
                        else {
                            cc.error(`${this.logTag}加载失败 : ${args.url}`);
                            resolve(null);
                        }
                    });
                }
            });
        });
    }
    getSpriteFrameByAsync(urls, key, view, addExtraLoadResource, bundle) {
        let me = this;
        return new Promise((resolve) => {
            let nIndex = 0;
            let getFun = (url) => {
                me.getCacheByAsync(url, cc.SpriteAtlas, bundle).then((atlas) => {
                    let info = new Defines_1.ResourceInfo;
                    info.url = url;
                    info.type = cc.SpriteAtlas;
                    info.data = atlas;
                    info.bundle = bundle;
                    addExtraLoadResource(view, info);
                    if (atlas) {
                        let spriteFrame = atlas.getSpriteFrame(key);
                        if (spriteFrame) {
                            if (cc.isValid(spriteFrame)) {
                                resolve({ url: url, spriteFrame: spriteFrame });
                            }
                            else {
                                //来到这里面，其实程序已经崩溃了，已经没什么意思，也不知道写这个有啥用，尽量安慰,哈哈哈
                                cc.error(`精灵帧被释放，释放当前无法的图集资源 url ：${url} key : ${key}`);
                                Framework_1.Manager.assetManager.releaseAsset(info);
                                resolve({ url: url, spriteFrame: null, isTryReload: true });
                            }
                        }
                        else {
                            nIndex++;
                            if (nIndex >= urls.length) {
                                resolve({ url: url, spriteFrame: null });
                            }
                            else {
                                getFun(urls[nIndex]);
                            }
                        }
                    }
                    else {
                        resolve({ url: url, spriteFrame: null });
                    }
                });
            };
            getFun(urls[nIndex]);
        });
    }
}
exports.CacheManager = CacheManager;
CacheManager._instance = null;

cc._RF.pop();