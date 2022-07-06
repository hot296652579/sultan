
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/assetManager/CacheManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Fzc2V0TWFuYWdlci9DYWNoZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQThGO0FBRTlGLDRDQUF1QztBQUV2QyxNQUFNLGFBQWE7SUFJZixZQUFZLElBQVk7UUFGaEIsWUFBTyxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO1FBQy9DLFNBQUksR0FBRyxTQUFTLENBQUM7UUFFckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUF3QjtRQUN0QyxPQUFPLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSxHQUFHLENBQUMsSUFBWSxFQUFFLE9BQWdCO1FBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEMsUUFBUTtnQkFDUixFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUE0QixJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQXVCO1FBQzVDLElBQUksQ0FB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LENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUFuTEwsb0NBb0xDO0FBbExrQixzQkFBUyxHQUFpQixJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvdXJjZUNhY2hlRGF0YSwgQlVORExFX1RZUEUsIFJlc291cmNlSW5mbywgQlVORExFX1JFTU9URSB9IGZyb20gXCIuLi9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9GcmFtZXdvcmtcIjtcblxuY2xhc3MgUmVzb3VyY2VDYWNoZSB7XG5cbiAgICBwcml2YXRlIF9jYWNoZXMgPSBuZXcgTWFwPHN0cmluZywgUmVzb3VyY2VDYWNoZURhdGE+KCk7XG4gICAgcHJpdmF0ZSBuYW1lID0gXCJ1bmtub3duXCI7XG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ludmFsaWQoY2FjaGU6IFJlc291cmNlQ2FjaGVEYXRhKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5pc0xvYWRlZCAmJiBjYWNoZS5kYXRhICYmICFjYy5pc1ZhbGlkKGNhY2hlLmRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQocGF0aDogc3RyaW5nLCBpc0NoZWNrOiBib29sZWFuKTogUmVzb3VyY2VDYWNoZURhdGEge1xuICAgICAgICBpZiAodGhpcy5fY2FjaGVzLmhhcyhwYXRoKSkge1xuICAgICAgICAgICAgbGV0IGNhY2hlID0gdGhpcy5fY2FjaGVzLmdldChwYXRoKTtcbiAgICAgICAgICAgIGlmIChpc0NoZWNrICYmIHRoaXMuaXNJbnZhbGlkKGNhY2hlKSkge1xuICAgICAgICAgICAgICAgIC8v6LWE5rqQ5bey57uP6YeK5pS+XG4gICAgICAgICAgICAgICAgY2Mud2Fybihg6LWE5rqQ5Yqg6L295a6M5oiQ77yM5L2G5bey57uP6KKr6YeK5pS+ICwg6YeN5paw5Yqg6L296LWE5rqQIDogJHtwYXRofWApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHBhdGgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlcy5nZXQocGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNldChwYXRoOiBzdHJpbmcsIGRhdGE6IFJlc291cmNlQ2FjaGVEYXRhKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlcy5zZXQocGF0aCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZShwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlcy5kZWxldGUocGF0aCk7XG4gICAgfVxufVxuXG5jbGFzcyBDYWNoZUluZm8ge1xuICAgIHJlZkNvdW50ID0gMDtcbiAgICB1cmw6IHN0cmluZyA9IFwiXCI7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOaYr+WQpuW4uOmpu+S6juWGheWtmOS4rSAqL1xuICAgIHJldGFpbjogYm9vbGVhbiA9IGZhbHNlO1xufVxuXG5jbGFzcyBSZW1vdGVDYWNoZXMge1xuICAgIHByaXZhdGUgX2NhY2hlcyA9IG5ldyBNYXA8c3RyaW5nLCBSZXNvdXJjZUNhY2hlRGF0YT4oKTtcbiAgICBwcml2YXRlIF9zcHJpdGVGcmFtZUNhY2hlcyA9IG5ldyBNYXA8c3RyaW5nLCBSZXNvdXJjZUNhY2hlRGF0YT4oKTtcbiAgICBwcml2YXRlIF9yZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgQ2FjaGVJbmZvPigpO1xuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5bov5znqIvnvJPlrZjmlbDmja5cbiAgICAgKiBAcGFyYW0gdHlwZSDov5znqIvlpZbnirbnsbvlnotcbiAgICAgKiBAcGFyYW0gcmVtb3RlVXJsIHVybOaVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQodXJsOiBzdHJpbmcgfCBSZW1vdGVVcmwpIHtcbiAgICAgICAgbGV0IHRlbXBVcmwgPSBcIlwiO1xuICAgICAgICBpZiAodHlwZW9mIHVybCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgcmVtb3RlVXJsID0gcGFyc2VSZW1vdGVVcmwodXJsKTtcbiAgICAgICAgICAgIHRlbXBVcmwgPSBtYWtlUmVtb3RlVXJsKHJlbW90ZVVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZW1wVXJsID0gbWFrZVJlbW90ZVVybCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZXMuaGFzKHRlbXBVcmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVzLmdldCh0ZW1wVXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3ByaXRlRnJhbWUodXJsOiBzdHJpbmcgfCBSZW1vdGVVcmwpIHtcbiAgICAgICAgbGV0IHRlbXBVcmwgPSBcIlwiO1xuICAgICAgICBpZiAodHlwZW9mIHVybCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBsZXQgcmVtb3RlVXJsID0gcGFyc2VSZW1vdGVVcmwodXJsKTtcbiAgICAgICAgICAgIHRlbXBVcmwgPSBtYWtlUmVtb3RlVXJsKHJlbW90ZVVybCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZW1wVXJsID0gbWFrZVJlbW90ZVVybCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVGcmFtZUNhY2hlcy5oYXModGVtcFVybCkpIHtcbiAgICAgICAgICAgIGxldCBjYWNoZSA9IHRoaXMuX3Nwcml0ZUZyYW1lQ2FjaGVzLmdldCh0ZW1wVXJsKTtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlMkQgPSB0aGlzLmdldCh1cmwpO1xuICAgICAgICAgICAgaWYgKHRleHR1cmUyRCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUodXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcHVibGljIHNldFNwcml0ZUZyYW1lKHVybDogc3RyaW5nIHwgUmVtb3RlVXJsLCBkYXRhOiBhbnkpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGxldCB0ZW1wVXJsID0gXCJcIjtcbiAgICAgICAgaWYgKHR5cGVvZiB1cmwgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IHJlbW90ZVVybCA9IHBhcnNlUmVtb3RlVXJsKHVybCk7XG4gICAgICAgICAgICB0ZW1wVXJsID0gbWFrZVJlbW90ZVVybChyZW1vdGVVcmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVtcFVybCA9IG1ha2VSZW1vdGVVcmwodXJsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhIGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSB7XG5cbiAgICAgICAgICAgIC8v5ZCM5LiA5Zu+54mH5Yqg6L295Lik5qyh5Lmf5Lya5Zue6LCD5Yiw6L+Z6YeM77yM6L+Z6YeM5aaC5p6c5b2T5YmN57K+54G157yT5a2Y5Lit5pyJ77yM5LiN5Zyo6YeN5paw5Yib5bu6XG4gICAgICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLmdldFNwcml0ZUZyYW1lKHVybCk7XG4gICAgICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPGNjLlNwcml0ZUZyYW1lPihzcHJpdGVGcmFtZS5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGNhY2hlID0gbmV3IFJlc291cmNlQ2FjaGVEYXRhKCk7XG4gICAgICAgICAgICBjYWNoZS5kYXRhID0gbmV3IGNjLlNwcml0ZUZyYW1lKGRhdGEpO1xuICAgICAgICAgICAgLy8gY2FjaGUuZGF0YS51cmwgPSB0ZW1wVXJsO1xuICAgICAgICAgICAgY2FjaGUuaXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2FjaGUudXJsID0gdGVtcFVybDtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZUZyYW1lQ2FjaGVzLnNldCh0ZW1wVXJsLCBjYWNoZSk7XG4gICAgICAgICAgICByZXR1cm4gPGNjLlNwcml0ZUZyYW1lPihjYWNoZS5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0KHVybDogc3RyaW5nIHwgUmVtb3RlVXJsLCBkYXRhOiBSZXNvdXJjZUNhY2hlRGF0YSkge1xuICAgICAgICBsZXQgdGVtcFVybCA9IFwiXCI7XG4gICAgICAgIGlmICh0eXBlb2YgdXJsID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCByZW1vdGVVcmwgPSBwYXJzZVJlbW90ZVVybCh1cmwpO1xuICAgICAgICAgICAgdGVtcFVybCA9IG1ha2VSZW1vdGVVcmwocmVtb3RlVXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXBVcmwgPSBtYWtlUmVtb3RlVXJsKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS51cmwgPSB0ZW1wVXJsO1xuICAgICAgICB0aGlzLl9jYWNoZXMuc2V0KHRlbXBVcmwsIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENhY2hlSW5mbyhpbmZvOiBSZXNvdXJjZUluZm8sIGlzTm9Gb3VuZENyZWF0ZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgaWYgKGluZm8gJiYgaW5mby51cmwgJiYgaW5mby51cmwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHJlbW90ZVVybCA9IHBhcnNlUmVtb3RlVXJsKGluZm8udXJsKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSBtYWtlUmVtb3RlVXJsKHJlbW90ZVVybCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Jlc01hcC5oYXModXJsKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc05vRm91bmRDcmVhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gbmV3IENhY2hlSW5mbztcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUudXJsID0gaW5mby51cmw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc01hcC5zZXQodXJsLCBjYWNoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzTWFwLmdldCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXRhaW5Bc3NldChpbmZvOiBSZXNvdXJjZUluZm8pIHtcbiAgICAgICAgaWYgKGluZm8gJiYgaW5mby5kYXRhKSB7XG4gICAgICAgICAgICBsZXQgY2FjaGUgPSB0aGlzLl9nZXRDYWNoZUluZm8oaW5mbyk7XG4gICAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGUucmV0YWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5mby5yZXRhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2Mud2Fybihg6LWE5rqQIDogJHtpbmZvLnVybH0g5bey57uP6KKr6K6+572u5oiQ5bi46am76LWE5rqQ77yM5LiN6IO95pS55Y+Y5YW25bGe5oCnYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5yZXRhaW4gPSBpbmZvLnJldGFpbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FjaGUucmVmQ291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGUucmV0YWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLnJlZkNvdW50ID0gOTk5OTk5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWxlYXNlQXNzZXQoaW5mbzogUmVzb3VyY2VJbmZvKSB7XG4gICAgICAgIGlmIChpbmZvICYmIGluZm8uZGF0YSkge1xuICAgICAgICAgICAgbGV0IGNhY2hlID0gdGhpcy5fZ2V0Q2FjaGVJbmZvKGluZm8sIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZS5yZXRhaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy/luLjpqbvlhoXlrZjkuK1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWNoZS5yZWZDb3VudC0tO1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZS5yZWZDb3VudCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGNhY2hlLnVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW92ZSh1cmw6IHN0cmluZyB8IFJlbW90ZVVybCkge1xuICAgICAgICBsZXQgdGVtcFVybCA9IFwiXCI7XG4gICAgICAgIGlmICh0eXBlb2YgdXJsID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCByZW1vdGVVcmwgPSBwYXJzZVJlbW90ZVVybCh1cmwpO1xuICAgICAgICAgICAgdGVtcFVybCA9IG1ha2VSZW1vdGVVcmwocmVtb3RlVXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXBVcmwgPSBtYWtlUmVtb3RlVXJsKHVybCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXNNYXAuZGVsZXRlKHRlbXBVcmwpO1xuXG4gICAgICAgIC8v5YWI5Yig6Zmk57K+54G15binXG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVGcmFtZUNhY2hlcy5oYXModGVtcFVybCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nwcml0ZUZyYW1lQ2FjaGVzLmRlbGV0ZSh0ZW1wVXJsKTtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGByZW1vdmUgcmVtb3RlIHNwcml0ZSBmcmFtZXMgcmVzb3VyY2UgdXJsIDogJHt0ZW1wVXJsfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNhY2hlID0gdGhpcy5fY2FjaGVzLmhhcyh0ZW1wVXJsKSA/IHRoaXMuX2NhY2hlcy5nZXQodGVtcFVybCkgOiBudWxsO1xuICAgICAgICBpZiAoY2FjaGUgJiYgY2FjaGUuZGF0YSBpbnN0YW5jZW9mIHNwLlNrZWxldG9uRGF0YSkge1xuICAgICAgICAgICAgLy/ov5nph4zpnaLpnIDopoHliKDpmaTliqDovb3ov5vljrvnmoTkuInkuKrmlofku7bnvJPlrZggXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShgJHtjYWNoZS51cmx9LmF0bGFzYCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShgJHtjYWNoZS51cmx9LnBuZ2ApO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoYCR7Y2FjaGUudXJsfS5qc29uYCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN1Y2Nlc3MgPSB0aGlzLl9jYWNoZXMuZGVsZXRlKHRlbXBVcmwpO1xuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgaWYgKENDX0pTQiAmJiBjYWNoZSAmJiBjYWNoZS5kYXRhIGluc3RhbmNlb2YgY2MuQXNzZXQgKSB7XG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldChjYWNoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhg6YeK5pS+5Yqg6L2955qE5pys5Zyw6L+c56iL6LWE5rqQOiR7Y2FjaGUuanNiU3RvcmFnZVBhdGh9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhgcmVtb3ZlIHJlbW90ZSBjYWNoZSB1cmwgOiAke3RlbXBVcmx9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XG4gICAgfVxuXG4gICAgc2hvd0NhY2hlcygpIHtcbiAgICAgICAgY2MubG9nKGAtLS0tIFtSZW1vdGVDYWNoZXNdIHNob3dDYWNoZXMgLS0tLWApO1xuXG4gICAgICAgIGxldCBjb250ZW50ID0gW107XG4gICAgICAgIGxldCBpbnZhbGlkQ29udGVudCA9IFtdO1xuICAgICAgICB0aGlzLl9zcHJpdGVGcmFtZUNhY2hlcy5mb3JFYWNoKChkYXRhLCBrZXksIHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGl0ZW1Db250ZW50ID0geyB1cmw6IGRhdGEudXJsLCBpc0xvYWRlZDogZGF0YS5pc0xvYWRlZCwgaXNWYWxpZDogY2MuaXNWYWxpZChkYXRhLmRhdGEpLCBhc3NldFR5cGU6IGNjLmpzLmdldENsYXNzTmFtZShkYXRhLmFzc2V0VHlwZSksIGRhdGE6IGRhdGEuZGF0YSA/IGNjLmpzLmdldENsYXNzTmFtZShkYXRhLmRhdGEpIDogbnVsbCwgc3RhdHVzOiBkYXRhLnN0YXR1cyB9O1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7IHVybDoga2V5LCBkYXRhOiBpdGVtQ29udGVudCB9O1xuICAgICAgICAgICAgaWYgKGRhdGEuaXNMb2FkZWQgJiYgKChkYXRhLmRhdGEgJiYgIWNjLmlzVmFsaWQoZGF0YS5kYXRhKSkgfHwgIWRhdGEuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkQ29udGVudC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNjLmxvZyhgLS0tLS0tLS0tLS0tLS0tLUN1cnJlbnQgdmFsaWQgc3ByaXRlRnJhbWUgQ2FjaGVzLS0tLS0tLS0tLS0tLS0tLS0tYCk7XG4gICAgICAgICAgICBjYy5sb2coSlNPTi5zdHJpbmdpZnkoY29udGVudCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnZhbGlkQ29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjYy5sb2coYC0tLS0tLS0tLS0tLS0tLS1DdXJyZW50IGludmFsaWQgc3ByaXRlRnJhbWUgQ2FjaGVzLS0tLS0tLS0tLS0tLS0tLS0tYCk7XG4gICAgICAgICAgICBjYy5sb2coSlNPTi5zdHJpbmdpZnkoaW52YWxpZENvbnRlbnQpKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29udGVudCA9IFtdO1xuICAgICAgICBpbnZhbGlkQ29udGVudCA9IFtdO1xuICAgICAgICB0aGlzLl9jYWNoZXMuZm9yRWFjaCgoZGF0YSwga2V5LCBzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtQ29udGVudCA9IHsgdXJsOiBkYXRhLnVybCwgaXNMb2FkZWQ6IGRhdGEuaXNMb2FkZWQsIGlzVmFsaWQ6IGNjLmlzVmFsaWQoZGF0YS5kYXRhKSwgYXNzZXRUeXBlOiBjYy5qcy5nZXRDbGFzc05hbWUoZGF0YS5hc3NldFR5cGUpLCBkYXRhOiBkYXRhLmRhdGEgPyBjYy5qcy5nZXRDbGFzc05hbWUoZGF0YS5kYXRhKSA6IG51bGwsIHN0YXR1czogZGF0YS5zdGF0dXMgfVxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7IHVybDoga2V5LCBkYXRhOiBpdGVtQ29udGVudCB9O1xuICAgICAgICAgICAgaWYgKGRhdGEuaXNMb2FkZWQgJiYgZGF0YS5kYXRhICYmICFjYy5pc1ZhbGlkKGRhdGEuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBpbnZhbGlkQ29udGVudC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjYy5sb2coYC0tLS0tLS0tLS0tLS0tLS1DdXJyZW50IHZhbGlkIENhY2hlcy0tLS0tLS0tLS0tLS0tLS0tLWApO1xuICAgICAgICAgICAgY2MubG9nKEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW52YWxpZENvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2MubG9nKGAtLS0tLS0tLS0tLS0tLS0tQ3VycmVudCBpbnZhbGlkIENhY2hlcy0tLS0tLS0tLS0tLS0tLS0tLWApO1xuICAgICAgICAgICAgY2MubG9nKEpTT04uc3RyaW5naWZ5KGludmFsaWRDb250ZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcmVzTWFwLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBjYy5sb2coYC0tLS0tLS0tLS0tLS0tLS1DdXJyZW50IHJlc291cmNlIHJlZmVyZW5jZSBDYWNoZXMtLS0tLS0tLS0tLS0tLS0tLS1gKTtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc01hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB7IHVybDoga2V5LCBkYXRhOiB7IHJlZkNvdW50OiB2YWx1ZS5yZWZDb3VudCwgdXJsOiB2YWx1ZS51cmwsIHJldGFpbjogdmFsdWUucmV0YWluIH0gfTtcbiAgICAgICAgICAgICAgICBjb250ZW50LnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNjLmxvZyhKU09OLnN0cmluZ2lmeShjb250ZW50KSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1hbmFnZXIge1xuICAgIHByaXZhdGUgbG9nVGFnID0gYFtDYWNoZU1hbmFnZXJdOiBgO1xuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ2FjaGVNYW5hZ2VyID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IENhY2hlTWFuYWdlcigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9idW5kbGVzID0gbmV3IE1hcDxzdHJpbmcsIFJlc291cmNlQ2FjaGU+KCk7XG4gICAgcHJpdmF0ZSBfcmVtb3RlQ2FjaGVzID0gbmV3IFJlbW90ZUNhY2hlcygpO1xuICAgIHB1YmxpYyBnZXQgcmVtb3RlQ2FjaGVzKCl7IHJldHVybiB0aGlzLl9yZW1vdGVDYWNoZXM7fSBcblxuICAgIHB1YmxpYyBnZXRCdW5kbGVOYW1lKGJ1bmRsZTogQlVORExFX1RZUEUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBidW5kbGUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBidW5kbGUgPyBidW5kbGUubmFtZSA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0KGJ1bmRsZTogQlVORExFX1RZUEUsIHBhdGg6IHN0cmluZywgaXNDaGVjazogYm9vbGVhbiA9IHRydWUpOiBSZXNvdXJjZUNhY2hlRGF0YSB7XG4gICAgICAgIGxldCBidW5kbGVOYW1lID0gdGhpcy5nZXRCdW5kbGVOYW1lKGJ1bmRsZSk7XG4gICAgICAgIGlmIChidW5kbGVOYW1lICYmIHRoaXMuX2J1bmRsZXMuaGFzKGJ1bmRsZU5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVuZGxlcy5nZXQoYnVuZGxlTmFtZSkuZ2V0KHBhdGgsIGlzQ2hlY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQoYnVuZGxlOiBCVU5ETEVfVFlQRSwgcGF0aDogc3RyaW5nLCBkYXRhOiBSZXNvdXJjZUNhY2hlRGF0YSkge1xuICAgICAgICBsZXQgYnVuZGxlTmFtZSA9IHRoaXMuZ2V0QnVuZGxlTmFtZShidW5kbGUpO1xuICAgICAgICBpZiAoYnVuZGxlTmFtZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9idW5kbGVzLmhhcyhidW5kbGVOYW1lKSkge1xuICAgICAgICAgICAgICAgIGxldCBjYWNoZSA9IG5ldyBSZXNvdXJjZUNhY2hlKGJ1bmRsZU5hbWUpO1xuICAgICAgICAgICAgICAgIGNhY2hlLnNldChwYXRoLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9idW5kbGVzLnNldChidW5kbGVOYW1lLCBjYWNoZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1bmRsZXMuZ2V0KGJ1bmRsZU5hbWUpLnNldChwYXRoLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmUoYnVuZGxlOiBCVU5ETEVfVFlQRSwgcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBidW5kbGVOYW1lID0gdGhpcy5nZXRCdW5kbGVOYW1lKGJ1bmRsZSk7XG4gICAgICAgIGlmIChidW5kbGVOYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYnVuZGxlcy5oYXMoYnVuZGxlTmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVuZGxlcy5nZXQoYnVuZGxlTmFtZSkucmVtb3ZlKHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHZXRDYWNoZUJ5QXN5bmNBcmdzKCk6IHsgdXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgYnVuZGxlOiBCVU5ETEVfVFlQRSB9IHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIGNjLmVycm9yKGAke3RoaXMubG9nVGFnfeWPguaVsOS8oOWFpeacieivr++8jOW/hemhu+S4pOS4quWPguaVsGApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gIT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHt0aGlzLmxvZ1RhZ33kvKDlhaXnrKzkuIDkuKrlj4LmlbDmnInor68s5b+F6aG75pivc3RyaW5nYCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2MuanMuaXNDaGlsZENsYXNzT2YoYXJndW1lbnRzWzFdLCBjYy5Bc3NldCkpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykgY2MuZXJyb3IoYCR7dGhpcy5sb2dUYWd95Lyg5YWl55qE56ys5LqM5Liq5Y+C5pWw5pyJ6K+vLOW/hemhu+aYr2NjLkFzc2V055qE5a2Q57G7YCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB1cmw6IGFyZ3VtZW50c1swXSwgdHlwZTogYXJndW1lbnRzWzFdLCBidW5kbGU6IGFyZ3VtZW50c1syXSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlpoLmnpzotYTmupDmraPlnKjliqDovb3kuK3vvIzkvJrnrYnlvoXotYTmupDliqDovb3lrozmiJDlkI7ov5Tlm57vvIzlkKbliJnnm7TmjqXov5Tlm55udWxsXG4gICAgICogQHBhcmFtIHVybCBcbiAgICAgKiBAcGFyYW0gdHlwZSDotYTmupDnsbvlnotcbiAgICAgKiBAcGFyYW0gYnVuZGxlXG4gICAgICovXG4gICAgcHVibGljIGdldENhY2hlPFQgZXh0ZW5kcyBjYy5Bc3NldD4odXJsOiBzdHJpbmcsIHR5cGU6IHsgcHJvdG90eXBlOiBUIH0sIGJ1bmRsZTogQlVORExFX1RZUEUpOiBQcm9taXNlPFQ+O1xuICAgIHB1YmxpYyBnZXRDYWNoZSgpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBsZXQgX2FyZ3M6IHsgdXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgYnVuZGxlOiBCVU5ETEVfVFlQRSB9ID0gbWUuX2dldEdldENhY2hlQnlBc3luY0FyZ3MuYXBwbHkobWUsIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKCFfYXJncykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNhY2hlID0gbWUuZ2V0KF9hcmdzLmJ1bmRsZSwgX2FyZ3MudXJsKTtcbiAgICAgICAgICAgIGlmIChjYWNoZSkge1xuICAgICAgICAgICAgICAgIGlmIChjYWNoZS5pc0xvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICAvL+W3sue7j+WKoOi9veWujOaIkFxuICAgICAgICAgICAgICAgICAgICBpZiAoX2FyZ3MudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhY2hlLmRhdGEgaW5zdGFuY2VvZiBfYXJncy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYWNoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSBjYy5lcnJvcihgJHt0aGlzLmxvZ1RhZ33kvKDlhaXnsbvlnos6JHtjYy5qcy5nZXRDbGFzc05hbWUoX2FyZ3MudHlwZSl95LiO6LWE5rqQ5a6e6ZmF57G75Z6LOiAke2NjLmpzLmdldENsYXNzTmFtZShjYWNoZS5kYXRhKX3kuI3lkIwgdXJsIDogJHtjYWNoZS51cmx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FjaGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL+WKoOi9veS4rVxuICAgICAgICAgICAgICAgICAgICBjYWNoZS5nZXRDYi5wdXNoKHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOW8guatpeiOt+WPlui1hOa6kO+8jOWmguaenOi1hOa6kOacquWKoOi9ve+8jOS8muWKoOi9veWujOaIkOWQjui/lOWbnlxuICAgICAqIEBwYXJhbSB1cmwgXG4gICAgICogQHBhcmFtIHR5cGUgXG4gICAgICogQHBhcmFtIGJ1bmRsZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q2FjaGVCeUFzeW5jPFQgZXh0ZW5kcyBjYy5Bc3NldD4odXJsOiBzdHJpbmcsIHR5cGU6IHsgcHJvdG90eXBlOiBUIH0sIGJ1bmRsZTogQlVORExFX1RZUEUpOiBQcm9taXNlPFQ+O1xuICAgIHB1YmxpYyBnZXRDYWNoZUJ5QXN5bmMoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIGxldCBhcmdzOiB7IHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIGJ1bmRsZTogQlVORExFX1RZUEUgfSA9IHRoaXMuX2dldEdldENhY2hlQnlBc3luY0FyZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghYXJncykge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWUuZ2V0Q2FjaGUoYXJncy51cmwsIGFyZ3MudHlwZSwgYXJncy5idW5kbGUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhIGluc3RhbmNlb2YgYXJncy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy/liqDovb3otYTmupBcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5hc3NldE1hbmFnZXIubG9hZChhcmdzLmJ1bmRsZSwgYXJncy51cmwsIGFyZ3MudHlwZSwgbnVsbCwgKGNhY2hlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUgJiYgY2FjaGUuZGF0YSAmJiBjYWNoZS5kYXRhIGluc3RhbmNlb2YgYXJncy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYWNoZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoYCR7dGhpcy5sb2dUYWd95Yqg6L295aSx6LSlIDogJHthcmdzLnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNwcml0ZUZyYW1lQnlBc3luYyh1cmxzOiBzdHJpbmdbXSwga2V5OiBzdHJpbmcsIHZpZXc6IFVJVmlldywgYWRkRXh0cmFMb2FkUmVzb3VyY2U6ICh2aWV3OiBVSVZpZXcsIGluZm86IFJlc291cmNlSW5mbykgPT4gdm9pZCwgYnVuZGxlOiBCVU5ETEVfVFlQRSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8eyB1cmw6IHN0cmluZywgc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lLCBpc1RyeVJlbG9hZD86IGJvb2xlYW4gfT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCBuSW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IGdldEZ1biA9ICh1cmwpID0+IHtcbiAgICAgICAgICAgICAgICBtZS5nZXRDYWNoZUJ5QXN5bmModXJsLCBjYy5TcHJpdGVBdGxhcywgYnVuZGxlKS50aGVuKChhdGxhcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IG5ldyBSZXNvdXJjZUluZm87XG4gICAgICAgICAgICAgICAgICAgIGluZm8udXJsID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnR5cGUgPSBjYy5TcHJpdGVBdGxhcztcbiAgICAgICAgICAgICAgICAgICAgaW5mby5kYXRhID0gYXRsYXM7XG4gICAgICAgICAgICAgICAgICAgIGluZm8uYnVuZGxlID0gYnVuZGxlO1xuICAgICAgICAgICAgICAgICAgICBhZGRFeHRyYUxvYWRSZXNvdXJjZSh2aWV3LCBpbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0bGFzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoc3ByaXRlRnJhbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyB1cmw6IHVybCwgc3ByaXRlRnJhbWU6IHNwcml0ZUZyYW1lIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5p2l5Yiw6L+Z6YeM6Z2i77yM5YW25a6e56iL5bqP5bey57uP5bSp5rqD5LqG77yM5bey57uP5rKh5LuA5LmI5oSP5oCd77yM5Lmf5LiN55+l6YGT5YaZ6L+Z5Liq5pyJ5ZWl55So77yM5bC96YeP5a6J5oWwLOWTiOWTiOWTiFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihg57K+54G15bin6KKr6YeK5pS+77yM6YeK5pS+5b2T5YmN5peg5rOV55qE5Zu+6ZuG6LWE5rqQIHVybCDvvJoke3VybH0ga2V5IDogJHtrZXl9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXIuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldChpbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHVybDogdXJsLCBzcHJpdGVGcmFtZTogbnVsbCwgaXNUcnlSZWxvYWQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobkluZGV4ID49IHVybHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyB1cmw6IHVybCwgc3ByaXRlRnJhbWU6IG51bGwgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RnVuKHVybHNbbkluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IHVybDogdXJsLCBzcHJpdGVGcmFtZTogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBnZXRGdW4odXJsc1tuSW5kZXhdKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==