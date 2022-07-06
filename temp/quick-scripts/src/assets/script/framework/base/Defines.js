"use strict";
cc._RF.push(module, '67315ILTptCJ6ugLWRGRR1Y', 'Defines');
// script/framework/base/Defines.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USING_LAN_KEY = exports.ENABLE_CHANGE_LANGUAGE = exports.BUNDLE_REMOTE = exports.BUNDLE_RESOURCES = exports.ViewStatus = exports.ResourceCacheData = exports.ResourceInfo = exports.ResourceType = exports.ResourceCacheStatus = void 0;
/**
 * @description 资源加载缓存数据
 */
var ResourceCacheStatus;
(function (ResourceCacheStatus) {
    /**@description 无状态 */
    ResourceCacheStatus[ResourceCacheStatus["NONE"] = 0] = "NONE";
    /**@description 等待释放 */
    ResourceCacheStatus[ResourceCacheStatus["WAITTING_FOR_RELEASE"] = 1] = "WAITTING_FOR_RELEASE";
})(ResourceCacheStatus = exports.ResourceCacheStatus || (exports.ResourceCacheStatus = {}));
/**@description 资源类型 */
var ResourceType;
(function (ResourceType) {
    /**@description 本地 */
    ResourceType[ResourceType["Local"] = 0] = "Local";
    /**@description 远程资源 */
    ResourceType[ResourceType["Remote"] = 1] = "Remote";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
/**@description 资源信息 */
class ResourceInfo {
    constructor() {
        this.url = "";
        this.type = null;
        this.data = null;
        this.assetUrl = "";
        /**@description 是否常驻内存，远程加载资源有效 */
        this.retain = false;
        this.bundle = null;
    }
}
exports.ResourceInfo = ResourceInfo;
class ResourceCacheData {
    constructor() {
        /**@description 加载资源url地址 */
        this.url = "";
        /**@description 是否已经加载完成 */
        this.isLoaded = false;
        /**@description 加载完成数据
         * cc.Prefab
         * cc.SpriteAtlas
         * cc.SpriteFrame
         * cc.AudioClip
         * cc.Font
         * sp.SkeletonData
         * cc.ParticleAsset
         * cc.Texture2D
         * cc.JsonAsset
         * */
        this.data = null;
        /**@description 加载资源类型 */
        this.assetType = null;
        this.status = ResourceCacheStatus.NONE;
        this.bundle = null;
        /**@description 在加载过程中有地方获取,加载完成后再回调 */
        this.getCb = [];
        /**@description 完成回调，在资源正在加载过程中，又有其它地方调用加载同一个资源，此时需要等待资源加载完成，统一回调 */
        this.finishCb = [];
        /**@description jsb下载完成回调 */
        this.jsbFinishCb = null;
        /**@description 远程下载资源保存本地的物理路径，仅在JSB情况下有效 */
        this.jsbStoragePath = null;
        /**@description 默认为本地资源 */
        this.resourceType = ResourceType.Local;
    }
    doGet(data) {
        for (let i = 0; i < this.getCb.length; i++) {
            if (this.getCb[i])
                this.getCb[i](data);
        }
        this.getCb = [];
    }
    doFinish(data) {
        for (let i = 0; i < this.finishCb.length; i++) {
            if (this.finishCb[i])
                this.finishCb[i](data);
        }
        this.finishCb = [];
    }
    doJsbFinish(data) {
        if (this.jsbFinishCb) {
            this.jsbFinishCb(data);
        }
        this.jsbFinishCb = null;
    }
}
exports.ResourceCacheData = ResourceCacheData;
/**
 * @description 界面视图状态
 * 界面控制器,各界面的类名不能相同，即使是放在不同文件夹下面，也会认为是同一类型，建议加上模块前缀
 */
var ViewStatus;
(function (ViewStatus) {
    /**@description 等待关闭 */
    ViewStatus[ViewStatus["WAITTING_CLOSE"] = 0] = "WAITTING_CLOSE";
    /**@description 等待隐藏 */
    ViewStatus[ViewStatus["WATITING_HIDE"] = 1] = "WATITING_HIDE";
    /**@description 无状态 */
    ViewStatus[ViewStatus["WAITTING_NONE"] = 2] = "WAITTING_NONE";
})(ViewStatus = exports.ViewStatus || (exports.ViewStatus = {}));
exports.BUNDLE_RESOURCES = 'resources';
exports.BUNDLE_REMOTE = "__Remote__Caches__";
/**@description 是否允许游戏启动后切换语言 */
exports.ENABLE_CHANGE_LANGUAGE = true;
/**@description 语言包路径使用前缀 */
exports.USING_LAN_KEY = "i18n.";

cc._RF.pop();