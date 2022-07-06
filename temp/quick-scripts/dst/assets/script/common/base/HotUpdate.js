
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/base/HotUpdate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '62ade2ht0dPYbWnakcMpNfx', 'HotUpdate');
// script/common/base/HotUpdate.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotUpdate = exports.GameConfig = exports.SubGameUpdateType = exports.AssetManagerState = exports.AssetManagerCode = void 0;
const Global_1 = require("../../global/Global");
const Config_1 = require("../config/Config");
class AssetsManager {
    constructor(name) {
        /**@description  当前资源管理器的状态*/
        this.code = -1;
        /**@description 当前资源管理器的名称 */
        this.name = "";
        /**@description 当前资源管理器的实体 jsb.AssetsManager */
        this.manager = null;
        this.name = name;
    }
}
var AssetManagerCode;
(function (AssetManagerCode) {
    /**@description 找不到本地mainfest文件*/
    AssetManagerCode[AssetManagerCode["ERROR_NO_LOCAL_MANIFEST"] = 0] = "ERROR_NO_LOCAL_MANIFEST";
    /**@description 下载manifest文件错误 */
    AssetManagerCode[AssetManagerCode["ERROR_DOWNLOAD_MANIFEST"] = 1] = "ERROR_DOWNLOAD_MANIFEST";
    /**@description 解析manifest文件错误 */
    AssetManagerCode[AssetManagerCode["ERROR_PARSE_MANIFEST"] = 2] = "ERROR_PARSE_MANIFEST";
    /**@description 找到新版本 */
    AssetManagerCode[AssetManagerCode["NEW_VERSION_FOUND"] = 3] = "NEW_VERSION_FOUND";
    /**@description 当前已经是最新版本 */
    AssetManagerCode[AssetManagerCode["ALREADY_UP_TO_DATE"] = 4] = "ALREADY_UP_TO_DATE";
    /**@description 更新下载进度中 */
    AssetManagerCode[AssetManagerCode["UPDATE_PROGRESSION"] = 5] = "UPDATE_PROGRESSION";
    /**@description 资源更新中 */
    AssetManagerCode[AssetManagerCode["ASSET_UPDATED"] = 6] = "ASSET_UPDATED";
    /**@description 更新错误 */
    AssetManagerCode[AssetManagerCode["ERROR_UPDATING"] = 7] = "ERROR_UPDATING";
    /**@description 更新完成 */
    AssetManagerCode[AssetManagerCode["UPDATE_FINISHED"] = 8] = "UPDATE_FINISHED";
    /**@description 更新失败 */
    AssetManagerCode[AssetManagerCode["UPDATE_FAILED"] = 9] = "UPDATE_FAILED";
    /**@description 解压资源失败 */
    AssetManagerCode[AssetManagerCode["ERROR_DECOMPRESS"] = 10] = "ERROR_DECOMPRESS";
    //以下是js中扩展的字段，上面是引擎中已经有的字段
    /**@description 正检测更新中 */
    AssetManagerCode[AssetManagerCode["CHECKING"] = 11] = "CHECKING";
})(AssetManagerCode = exports.AssetManagerCode || (exports.AssetManagerCode = {}));
var AssetManagerState;
(function (AssetManagerState) {
    /**@description 未初始化 */
    AssetManagerState[AssetManagerState["UNINITED"] = 0] = "UNINITED";
    /**@description 找到manifest文件 */
    AssetManagerState[AssetManagerState["UNCHECKED"] = 1] = "UNCHECKED";
    /**@description 准备下载版本文件 */
    AssetManagerState[AssetManagerState["PREDOWNLOAD_VERSION"] = 2] = "PREDOWNLOAD_VERSION";
    /**@description 下载版本文件中 */
    AssetManagerState[AssetManagerState["DOWNLOADING_VERSION"] = 3] = "DOWNLOADING_VERSION";
    /**@description 版本文件下载完成 */
    AssetManagerState[AssetManagerState["VERSION_LOADED"] = 4] = "VERSION_LOADED";
    /**@description 准备加载project.manifest文件 */
    AssetManagerState[AssetManagerState["PREDOWNLOAD_MANIFEST"] = 5] = "PREDOWNLOAD_MANIFEST";
    /**@description 下载project.manifest文件中 */
    AssetManagerState[AssetManagerState["DOWNLOADING_MANIFEST"] = 6] = "DOWNLOADING_MANIFEST";
    /**@description 下载project.manifest文件完成 */
    AssetManagerState[AssetManagerState["MANIFEST_LOADED"] = 7] = "MANIFEST_LOADED";
    /**@description 需要下载更新 */
    AssetManagerState[AssetManagerState["NEED_UPDATE"] = 8] = "NEED_UPDATE";
    /**@description 准备更新 */
    AssetManagerState[AssetManagerState["READY_TO_UPDATE"] = 9] = "READY_TO_UPDATE";
    /**@description 更新中 */
    AssetManagerState[AssetManagerState["UPDATING"] = 10] = "UPDATING";
    /**@description 解压中 */
    AssetManagerState[AssetManagerState["UNZIPPING"] = 11] = "UNZIPPING";
    /**@description 已经是最新版本 */
    AssetManagerState[AssetManagerState["UP_TO_DATE"] = 12] = "UP_TO_DATE";
    /**@description 更新失败 */
    AssetManagerState[AssetManagerState["FAIL_TO_UPDATE"] = 13] = "FAIL_TO_UPDATE";
    /**自定定义扩展 */
    /**@description 尝试重新下载失败文件 */
    AssetManagerState[AssetManagerState["TRY_DOWNLOAD_FAILED_ASSETS"] = 14] = "TRY_DOWNLOAD_FAILED_ASSETS";
})(AssetManagerState = exports.AssetManagerState || (exports.AssetManagerState = {}));
/**@description 子游戏热更新的方式 */
var SubGameUpdateType;
(function (SubGameUpdateType) {
    /**@description 如果该子游戏的代码已经加载过，
     * 在玩家不重启游戏的情况下，忽略服务器端的所有更新
     * 优点：在玩家未关闭游戏前提，每个子游戏只会进行一次更新
     * 缺点: 每个子游戏只能更新一次，不能时时保证进入子游戏的代码及资源为最新版本
     *  */
    SubGameUpdateType[SubGameUpdateType["Normal"] = 0] = "Normal";
    /**@description 不管子游戏戏代码是否已经加载
     * 都先会检测更新，去服务器拉取到最新的代码及资源
     * 优点 : 本地的代码始终保持最新
     * 缺点 : 当玩家已经进入了该游戏，下次在进入该游戏时，
     * 发现有新的版本，此时下载完成新版本的资源及代码后，会造成应用重启
     */
    SubGameUpdateType[SubGameUpdateType["CheckUpdate"] = 1] = "CheckUpdate";
})(SubGameUpdateType = exports.SubGameUpdateType || (exports.SubGameUpdateType = {}));
class GameConfig {
    constructor(gameName, subpackageName, index) {
        /**@description 游戏子包名 */
        this.subpackageName = "";
        /**@description 游戏名 */
        this.gameName = "";
        /**@description h5是否加载子游戏完成 */
        this.isLoaded = false;
        this.index = 0;
        this.gameName = gameName;
        this.subpackageName = subpackageName;
        this.index = index;
        this.isLoaded = false;
    }
}
exports.GameConfig = GameConfig;
const HALL_ASSETS_MANAGER_NAME = "HALL";
/**
 * @description 热更新组件
 */
const { ccclass, property } = cc._decorator;
let _HotUpdate = class _HotUpdate {
    constructor() {
        this.manifestRoot = `manifest/`;
        /**@description 本地存储热更新文件的路径 */
        this.storagePath = "";
        /**@description 是否在热更新中或检测更新状态 */
        this.updating = false;
        /**@description 子游戏更新类型 */
        this.subGameUpdateType = SubGameUpdateType.Normal;
        this._commonHotUpdateUrl = null;
        this._projectManifest = null;
        /**@description 热更新回调 */
        this.onDownload = null;
        /**@description 检测更新回调 */
        this.checkCallback = null;
        /**@description 子游戏版本信息 */
        this.allGameConfig = {};
        /**@description 资源管理器 */
        this.assetsManagers = {};
        this._hotUpdateUrls = {};
        /**@description 当前热更新的资源管理器 */
        this.currentAssetsManager = null;
    }
    /**@description 通用的热更新地址，当在子游戏或大厅未指定热更新地址时，都统一使用服务器传回来的默认全局更新地址 */
    get commonHotUpdateUrl() {
        this._commonHotUpdateUrl = G.URLMgr.hotUpdateURL;
        if (this._commonHotUpdateUrl.length > 0) {
            return this._commonHotUpdateUrl;
        }
        else {
            return this.projectManifest.packageUrl;
        }
    }
    get projectManifest() {
        if (CC_JSB && !this._projectManifest) {
            let content = jsb.fileUtils.getStringFromFile(this.hallProjectMainfest);
            try {
                this._projectManifest = JSON.parse(content);
            }
            catch (error) {
                this._projectManifest = null;
                cc.error(`读取${this.hallProjectMainfest}失败`);
            }
        }
        return this._projectManifest;
    }
    /**@description 大厅本地的版本项目更新文件配置路径 */
    get hallProjectMainfest() {
        return `${this.manifestRoot}project.manifest`;
    }
    /**@description 热更新地址，为了方便后面当只更新一个游戏，或cdn服务器 */
    getHotUpdateUrl(moduleName) {
        if (CC_DEBUG) {
            let config = {
                "gameOne": this._commonHotUpdateUrl,
                "gameTwo": this._commonHotUpdateUrl,
            };
            if (config[moduleName]) {
                return config[moduleName];
            }
            else {
                return this.commonHotUpdateUrl;
            }
        }
        else {
            if (this._hotUpdateUrls[moduleName]) {
                return this._hotUpdateUrls[moduleName];
            }
            else {
                return this.commonHotUpdateUrl;
            }
        }
    }
    /**@description 获取子游戏名 */
    getGameLocalName(gameName) {
        return this.allGameConfig[gameName];
    }
    /**@description 释放资源管理器，默认为hall 大厅资源管理器 */
    destroyAssetsManager(name = HALL_ASSETS_MANAGER_NAME) {
        if (this.assetsManagers[name]) {
            delete this.assetsManagers[name];
        }
    }
    /**@description 获取资源管理器，默认为hall 大厅的资源管理器 */
    getAssetsManager(name = HALL_ASSETS_MANAGER_NAME) {
        if (this.assetsManagers[name]) {
            return this.assetsManagers[name];
        }
        else {
            //初始化资源管理器
            if (CC_JSB) {
                this.storagePath = jsb.fileUtils.getWritablePath();
                cc.log(`Storage path for remote asset : ${this.storagePath}`);
                this.assetsManagers[name] = new AssetsManager(name);
                this.assetsManagers[name].manager = new jsb.AssetsManager(name == HALL_ASSETS_MANAGER_NAME ? "type.hall" : `type.${name}_`, this.storagePath, this.versionCompareHanle.bind(this));
                //设置下载并发量
                this.assetsManagers[name].manager.setMaxConcurrentTask(8);
                this.assetsManagers[name].manager.setHotUpdateUrl(this.getHotUpdateUrl(name));
                this.assetsManagers[name].manager.setVerifyCallback(function (path, asset) {
                    let compressed = asset.compressed;
                    let expectedMD5 = asset.md5;
                    let relativePath = asset.path;
                    let size = asset.size;
                    if (compressed) {
                        cc.log(`Verification passed : ${relativePath}`);
                        return true;
                    }
                    else {
                        cc.log(`Verification passed : ${relativePath} ( ${expectedMD5} )`);
                        return true;
                    }
                });
                cc.log(`Hot update is ready , please check or directly update.`);
            }
            return this.assetsManagers[name];
        }
    }
    /**@description 判断是否需要重新尝试下载之前下载失败的文件 */
    isTryDownloadFailedAssets() {
        if (this.currentAssetsManager &&
            this.currentAssetsManager.manager.getState() == AssetManagerState.FAIL_TO_UPDATE &&
            (this.currentAssetsManager.code == AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
                this.currentAssetsManager.code == AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
                this.currentAssetsManager.code == AssetManagerCode.ERROR_PARSE_MANIFEST
                || this.currentAssetsManager.code == AssetManagerCode.UPDATE_FAILED)) {
            return true;
        }
        return false;
    }
    /**@description 检测更新 */
    checkUpdate(callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME || CC_PREVIEW || cc.sys.isBrowser) {
            //预览及浏览器下，不需要有更新的操作
            this.updating = false;
            callback(AssetManagerCode.ALREADY_UP_TO_DATE, AssetManagerState.UP_TO_DATE);
        }
        else {
            cc.log(`--checkUpdate--`);
            if (this.updating) {
                cc.log(`Checking or updating...`);
                callback(AssetManagerCode.CHECKING, AssetManagerState.PREDOWNLOAD_VERSION);
                return;
            }
            if (!this.currentAssetsManager.manager.getLocalManifest() || !this.currentAssetsManager.manager.getLocalManifest().isLoaded()) {
                cc.log(`Failed to load local manifest ....`);
                callback(AssetManagerCode.ERROR_DOWNLOAD_MANIFEST, AssetManagerState.FAIL_TO_UPDATE);
                return;
            }
            if (this.isTryDownloadFailedAssets()) {
                //已经更新失败，尝试获取更新下载失败的
                cc.log(`之前下载资源未完全下载完成，请尝试重新下载`);
                callback(AssetManagerCode.UPDATE_FAILED, AssetManagerState.TRY_DOWNLOAD_FAILED_ASSETS);
            }
            else {
                this.updating = true;
                this.checkCallback = callback;
                this.currentAssetsManager.manager.setEventCallback(this.checkCb.bind(this));
                this.currentAssetsManager.manager.checkUpdate();
            }
        }
    }
    downloadFailedAssets() {
        if (this.currentAssetsManager) {
            this.currentAssetsManager.manager.downloadFailedAssets();
        }
    }
    /**@description 检查大厅是否需要更新 */
    checkHallUpdate(callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME || CC_PREVIEW || cc.sys.isBrowser) {
            //预览及浏览器下，不需要有更新的操作
            cc.log(`预览或浏览器`);
            callback(AssetManagerCode.ALREADY_UP_TO_DATE, AssetManagerState.UP_TO_DATE);
        }
        else {
            this.currentAssetsManager = this.getAssetsManager();
            this.currentAssetsManager.manager.loadLocalManifest(this.hallProjectMainfest);
            this.checkUpdate(callback);
        }
    }
    /**
     * @description 获取子游戏manifest url
     * @param gameName 子游戏名
     * @returns manifest url
     */
    getGameManifest(gameName) {
        return `${gameName}_project.manifest`;
    }
    /**
     * @description 检测子游戏更新
     * @param gameName 子游戏名
     * @param callback 检测完成回调
     */
    checkGameUpdate(gameName, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME || CC_PREVIEW || cc.sys.isBrowser || !Config_1.Config.isOpenHotUpdate) {
            //预览及浏览器下，不需要有更新的操作
            cc.log(`不需要有更新的操作`);
            callback(AssetManagerCode.ALREADY_UP_TO_DATE, AssetManagerState.UP_TO_DATE);
        }
        else {
            this.currentAssetsManager = this.getAssetsManager(gameName);
            let manifestUrl = this.getGameManifest(gameName);
            //先检测本地是否已经存在子游戏版本控制文件 
            if (jsb.fileUtils.isFileExist(manifestUrl)) {
                //存在版本控制文件 
                let content = jsb.fileUtils.getStringFromFile(manifestUrl);
                let jsbGameManifest = new jsb.Manifest(content, this.storagePath, this.getHotUpdateUrl(this.currentAssetsManager.name));
                cc.log(`--存在本地版本控制文件checkUpdate--`);
                cc.log(`mainifestUrl : ${manifestUrl}`);
                this.currentAssetsManager.manager.loadLocalManifest(jsbGameManifest, "");
                this.checkUpdate(callback);
            }
            else {
                //不存在版本控制文件 ，生成一个初始版本
                if (this.updating) {
                    cc.log(`Checking or updating...`);
                    callback(AssetManagerCode.CHECKING, AssetManagerState.PREDOWNLOAD_VERSION);
                    return;
                }
                let packageUrl = this.getHotUpdateUrl(gameName);
                let gameManifest = {
                    version: "0",
                    packageUrl: packageUrl,
                    remoteManifestUrl: `${packageUrl}${this.manifestRoot}${manifestUrl}`,
                    remoteVersionUrl: `${packageUrl}${this.manifestRoot}${gameName}_version.manifest`,
                    assets: {},
                    searchPaths: []
                };
                let gameManifestContent = JSON.stringify(gameManifest);
                let jsbGameManifest = new jsb.Manifest(gameManifestContent, this.storagePath, this.getHotUpdateUrl(this.currentAssetsManager.name));
                cc.log(`--checkUpdate--`);
                cc.log(`mainifest content : ${gameManifestContent}`);
                this.currentAssetsManager.manager.loadLocalManifest(jsbGameManifest, "");
                this.checkUpdate(callback);
            }
        }
    }
    /**@description 检测更新 */
    checkCb(event) {
        //这里不能置空，下载manifest文件也会回调过来
        //this.checkCallback = null;
        //存储当前的状态，当下载版本文件失败时，state的状态与下载非版本文件是一样的状态
        this.currentAssetsManager.code = event.getEventCode();
        cc.log(`checkCb event code : ${event.getEventCode()} state : ${this.currentAssetsManager.manager.getState()}`);
        switch (event.getEventCode()) {
            case AssetManagerCode.ERROR_NO_LOCAL_MANIFEST:
                cc.log(`No local manifest file found, hot update skipped.`);
                break;
            case AssetManagerCode.ERROR_DOWNLOAD_MANIFEST:
            case AssetManagerCode.ERROR_PARSE_MANIFEST:
                cc.log(`Fail to download manifest file, hot update skipped.`);
                break;
            case AssetManagerCode.ALREADY_UP_TO_DATE:
                cc.log(`Already up to date with the latest remote version.`);
                break;
            case AssetManagerCode.NEW_VERSION_FOUND:
                cc.log(`New version found, please try to update.`);
                break;
            case AssetManagerCode.UPDATE_FINISHED:
                cc.log(` UPDATE_FINISHED `);
                break;
            default:
                return;
        }
        //this.currentAssetsManager.setEventCallback(null);
        this.updating = false;
        //如果正在下载更新文件，先下载更新文件比较完成后，再回调
        if (this.checkCallback && this.currentAssetsManager.manager.getState() != AssetManagerState.DOWNLOADING_VERSION) {
            this.checkCallback(event.getEventCode(), this.currentAssetsManager.manager.getState());
            this.checkCallback = null;
        }
    }
    /**
     * @description 热更新
     * @param manifestUrl manifest地址
     * @param gameName
     */
    hotUpdate() {
        if (!this.currentAssetsManager) {
            cc.error(`热更新管理器未初始化`);
            return;
        }
        cc.log(`即将热更新模块为:${this.currentAssetsManager.name} , updating : ${this.updating}`);
        if (!this.updating) {
            cc.log(`执行更新 ${this.currentAssetsManager.name} `);
            this.currentAssetsManager.manager.setEventCallback(this.updateCb.bind(this));
            this.currentAssetsManager.manager.update();
        }
    }
    /**@description 热更新回调 */
    updateCb(event) {
        var isUpdateFinished = false;
        var failed = false;
        cc.log(`--update cb code : ${event.getEventCode()} state : ${this.currentAssetsManager.manager.getState()}`);
        //存储当前的状态，当下载版本文件失败时，state的状态与下载非版本文件是一样的状态
        this.currentAssetsManager.code = event.getEventCode();
        switch (event.getEventCode()) {
            case AssetManagerCode.ERROR_NO_LOCAL_MANIFEST:
                cc.log(`No local manifest file found, hot update skipped.`);
                failed = true;
                break;
            case AssetManagerCode.UPDATE_PROGRESSION:
                cc.log(`${event.getDownloadedBytes()} / ${event.getTotalBytes()}`);
                cc.log(`${event.getDownloadedFiles()} / ${event.getTotalFiles()}`);
                cc.log(`percent : ${event.getPercent()}`);
                cc.log(`percent by file : ${event.getPercentByFile()}`);
                var msg = event.getMessage();
                if (msg) {
                    cc.log(`Updated file: ${msg}`);
                }
                break;
            case AssetManagerCode.ERROR_DOWNLOAD_MANIFEST:
            case AssetManagerCode.ERROR_PARSE_MANIFEST:
                cc.log(`Fail to download manifest file, hot update skipped.`);
                failed = true;
                break;
            case AssetManagerCode.ALREADY_UP_TO_DATE:
                cc.log(`Already up to date with the latest remote version.`);
                failed = true;
                break;
            case AssetManagerCode.UPDATE_FINISHED:
                cc.log(`Update finished. ${event.getMessage()}`);
                isUpdateFinished = true;
                break;
            case AssetManagerCode.UPDATE_FAILED:
                cc.log(`Update failed. ${event.getMessage()}`);
                this.updating = false;
                break;
            case AssetManagerCode.ERROR_UPDATING:
                cc.log(`Asset update error: ${event.getAssetId()} , ${event.getMessage()}`);
                break;
            case AssetManagerCode.ERROR_DECOMPRESS:
                cc.log(`${event.getMessage()}`);
                break;
            default:
                break;
        }
        if (failed) {
            this.currentAssetsManager.manager.setEventCallback(null);
            this.updating = false;
        }
        if (isUpdateFinished) {
            //下载完成,需要重新设置搜索路径，添加下载路径
            // Prepend the manifest's search path
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this.currentAssetsManager.manager.getLocalManifest().getSearchPaths();
            cc.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            //这里做一个搜索路径去重处理
            let obj = {};
            for (let i = 0; i < searchPaths.length; i++) {
                obj[searchPaths[i]] = true;
            }
            searchPaths = Object.keys(obj);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
        }
        if (this.currentAssetsManager.name == HALL_ASSETS_MANAGER_NAME) {
            if (isUpdateFinished) {
                this.currentAssetsManager.manager.setEventCallback(null);
                //下载数量大于0，才有必要进入重启，在如下这种情况下，并不会发生下载
                //当只提升了版本号，而并未对代码进行修改时，此时的只下载了一个project.manifest文件，
                //不需要对游戏进行重启的操作
                if (event.getDownloadedFiles() > 0) {
                    cc.log(`更新大厅，需要重启app生效`);
                    // cc.game.restart();
                    Global_1.reStartGame();
                }
            }
        }
        else {
            //子游戏更新
            if (isUpdateFinished) {
                if (event.getDownloadedFiles() > 0) {
                    //已经加载过子游戏代码，如果需要使用到最新，需要重启app才能是最新的代码
                    if (this.allGameConfig[this.currentAssetsManager.name].isLoaded) {
                        cc.log(`已经加载过游戏代码，需要重启app生效`);
                        isUpdateFinished = true;
                        // cc.game.restart();
                        Global_1.reStartGame();
                    }
                    else {
                        //没有加载过子游戏代码
                        cc.log(`第一次加载子游戏代码，不需要重启`);
                        isUpdateFinished = false;
                    }
                }
                else {
                    isUpdateFinished = false;
                }
            }
        }
        if (this.onDownload) {
            this.onDownload(event.getDownloadedBytes(), event.getTotalBytes(), event.getDownloadedFiles(), event.getTotalFiles(), event.getPercent(), event.getPercentByFile(), event.getEventCode(), this.currentAssetsManager.manager.getState(), isUpdateFinished);
        }
        cc.log(`update cb  failed : ${failed}  , need restart : ${isUpdateFinished} , updating : ${this.updating}`);
    }
    versionCompareHanle(versionA, versionB) {
        cc.log(`JS Custom Version Compare : version A is ${versionA} , version B is ${versionB}`);
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        cc.log(`version A ${vA} , version B ${vB}`);
        for (let i = 0; i < vA.length && i < vB.length; ++i) {
            let a = parseInt(vA[i]);
            let b = parseInt(vB[i]);
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return 1;
        }
        return 0;
    }
};
_HotUpdate = __decorate([
    ccclass
], _HotUpdate);
exports.HotUpdate = new _HotUpdate();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2Jhc2UvSG90VXBkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUFrRDtBQUNsRCw2Q0FBMEM7QUFrQjFDLE1BQU0sYUFBYTtJQUVmLFlBQVksSUFBWTtRQUl4Qiw2QkFBNkI7UUFDN0IsU0FBSSxHQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2YsNkJBQTZCO1FBQzdCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsK0NBQStDO1FBQy9DLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFSaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQVFKO0FBRUQsSUFBWSxnQkE0Qlg7QUE1QkQsV0FBWSxnQkFBZ0I7SUFDeEIsaUNBQWlDO0lBQ2pDLDZGQUF1QixDQUFBO0lBQ3ZCLGlDQUFpQztJQUNqQyw2RkFBdUIsQ0FBQTtJQUN2QixpQ0FBaUM7SUFDakMsdUZBQW9CLENBQUE7SUFDcEIsd0JBQXdCO0lBQ3hCLGlGQUFpQixDQUFBO0lBQ2pCLDRCQUE0QjtJQUM1QixtRkFBa0IsQ0FBQTtJQUNsQiwwQkFBMEI7SUFDMUIsbUZBQWtCLENBQUE7SUFDbEIsd0JBQXdCO0lBQ3hCLHlFQUFhLENBQUE7SUFDYix1QkFBdUI7SUFDdkIsMkVBQWMsQ0FBQTtJQUNkLHVCQUF1QjtJQUN2Qiw2RUFBZSxDQUFBO0lBQ2YsdUJBQXVCO0lBQ3ZCLHlFQUFhLENBQUE7SUFDYix5QkFBeUI7SUFDekIsZ0ZBQWdCLENBQUE7SUFHaEIsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6QixnRUFBUSxDQUFBO0FBQ1osQ0FBQyxFQTVCVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQTRCM0I7QUFFRCxJQUFZLGlCQWlDWDtBQWpDRCxXQUFZLGlCQUFpQjtJQUN6Qix1QkFBdUI7SUFDdkIsaUVBQVEsQ0FBQTtJQUNSLCtCQUErQjtJQUMvQixtRUFBUyxD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WjtpQkFDSTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEI7U0FDSjtRQUNELElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDSixDQUFBO0FBdGNLLFVBQVU7SUFEZixPQUFPO0dBQ0YsVUFBVSxDQXNjZjtBQUVVLFFBQUEsU0FBUyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZVN0YXJ0R2FtZSB9IGZyb20gXCIuLi8uLi9nbG9iYWwvR2xvYmFsXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnL0NvbmZpZ1wiO1xuXG5pbnRlcmZhY2UgTWFuaWZlc3Qge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDlpKfljoXniYjmnKwgKi9cbiAgICB2ZXJzaW9uPzogc3RyaW5nLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDlrZDmuLjmiI/niYjmnKwg5aSn5Y6F55qEbWFuaWZlc3TkuI3ljIXlkKvor6XlrZfmrrUgKi9cbiAgICBzdWJWZXJzaW9uPzogc3RyaW5nLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDotYTmupDmnI3liqHlmajlnLDlnYAgKi9cbiAgICBwYWNrYWdlVXJsPzogc3RyaW5nLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDov5znqItwcm9qZWN0Lm1hbmlmZXN05Zyw5Z2AICovXG4gICAgcmVtb3RlTWFuaWZlc3RVcmw/OiBzdHJpbmcsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi/nOeoi3ZlcnNpb24ubWFuaWZlc3TlnLDlnYAgKi9cbiAgICByZW1vdGVWZXJzaW9uVXJsPzogc3RyaW5nLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDljIXlkKvotYTmupAgKi9cbiAgICBhc3NldHM/OiBhbnksXG4gICAgc2VhcmNoUGF0aHM/OiBhbnlcbn1cblxuY2xhc3MgQXNzZXRzTWFuYWdlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24gIOW9k+WJjei1hOa6kOeuoeeQhuWZqOeahOeKtuaAgSovXG4gICAgY29kZTogYW55ID0gLTE7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjei1hOa6kOeuoeeQhuWZqOeahOWQjeensCAqL1xuICAgIG5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjei1hOa6kOeuoeeQhuWZqOeahOWunuS9kyBqc2IuQXNzZXRzTWFuYWdlciAqL1xuICAgIG1hbmFnZXI6IGFueSA9IG51bGw7XG59XG5cbmV4cG9ydCBlbnVtIEFzc2V0TWFuYWdlckNvZGUge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmib7kuI3liLDmnKzlnLBtYWluZmVzdOaWh+S7tiovXG4gICAgRVJST1JfTk9fTE9DQUxfTUFOSUZFU1QsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOS4i+i9vW1hbmlmZXN05paH5Lu26ZSZ6K+vICovXG4gICAgRVJST1JfRE9XTkxPQURfTUFOSUZFU1QsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOino+aekG1hbmlmZXN05paH5Lu26ZSZ6K+vICovXG4gICAgRVJST1JfUEFSU0VfTUFOSUZFU1QsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOaJvuWIsOaWsOeJiOacrCAqL1xuICAgIE5FV19WRVJTSU9OX0ZPVU5ELFxuICAgIC8qKkBkZXNjcmlwdGlvbiDlvZPliY3lt7Lnu4/mmK/mnIDmlrDniYjmnKwgKi9cbiAgICBBTFJFQURZX1VQX1RPX0RBVEUsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOS4i+i9vei/m+W6puS4rSAqL1xuICAgIFVQREFURV9QUk9HUkVTU0lPTixcbiAgICAvKipAZGVzY3JpcHRpb24g6LWE5rqQ5pu05paw5LitICovXG4gICAgQVNTRVRfVVBEQVRFRCxcbiAgICAvKipAZGVzY3JpcHRpb24g5pu05paw6ZSZ6K+vICovXG4gICAgRVJST1JfVVBEQVRJTkcsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOWujOaIkCAqL1xuICAgIFVQREFURV9GSU5JU0hFRCxcbiAgICAvKipAZGVzY3JpcHRpb24g5pu05paw5aSx6LSlICovXG4gICAgVVBEQVRFX0ZBSUxFRCxcbiAgICAvKipAZGVzY3JpcHRpb24g6Kej5Y6L6LWE5rqQ5aSx6LSlICovXG4gICAgRVJST1JfREVDT01QUkVTUyxcblxuXG4gICAgLy/ku6XkuIvmmK9qc+S4reaJqeWxleeahOWtl+aute+8jOS4iumdouaYr+W8leaTjuS4reW3sue7j+acieeahOWtl+autVxuICAgIC8qKkBkZXNjcmlwdGlvbiDmraPmo4DmtYvmm7TmlrDkuK0gKi9cbiAgICBDSEVDS0lORyxcbn1cblxuZXhwb3J0IGVudW0gQXNzZXRNYW5hZ2VyU3RhdGUge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmnKrliJ3lp4vljJYgKi9cbiAgICBVTklOSVRFRCxcbiAgICAvKipAZGVzY3JpcHRpb24g5om+5YiwbWFuaWZlc3Tmlofku7YgKi9cbiAgICBVTkNIRUNLRUQsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWHhuWkh+S4i+i9veeJiOacrOaWh+S7tiAqL1xuICAgIFBSRURPV05MT0FEX1ZFUlNJT04sXG4gICAgLyoqQGRlc2NyaXB0aW9uIOS4i+i9veeJiOacrOaWh+S7tuS4rSAqL1xuICAgIERPV05MT0FESU5HX1ZFUlNJT04sXG4gICAgLyoqQGRlc2NyaXB0aW9uIOeJiOacrOaWh+S7tuS4i+i9veWujOaIkCAqL1xuICAgIFZFUlNJT05fTE9BREVELFxuICAgIC8qKkBkZXNjcmlwdGlvbiDlh4blpIfliqDovb1wcm9qZWN0Lm1hbmlmZXN05paH5Lu2ICovXG4gICAgUFJFRE9XTkxPQURfTUFOSUZFU1QsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOS4i+i9vXByb2plY3QubWFuaWZlc3Tmlofku7bkuK0gKi9cbiAgICBET1dOTE9BRElOR19NQU5JRkVTVCxcbiAgICAvKipAZGVzY3JpcHRpb24g5LiL6L29cHJvamVjdC5tYW5pZmVzdOaWh+S7tuWujOaIkCAqL1xuICAgIE1BTklGRVNUX0xPQURFRCxcbiAgICAvKipAZGVzY3JpcHRpb24g6ZyA6KaB5LiL6L295pu05pawICovXG4gICAgTkVFRF9VUERBVEUsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWHhuWkh+abtOaWsCAqL1xuICAgIFJFQURZX1RPX1VQREFURSxcbiAgICAvKipAZGVzY3JpcHRpb24g5pu05paw5LitICovXG4gICAgVVBEQVRJTkcsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOino+WOi+S4rSAqL1xuICAgIFVOWklQUElORyxcbiAgICAvKipAZGVzY3JpcHRpb24g5bey57uP5piv5pyA5paw54mI5pysICovXG4gICAgVVBfVE9fREFURSxcbiAgICAvKipAZGVzY3JpcHRpb24g5pu05paw5aSx6LSlICovXG4gICAgRkFJTF9UT19VUERBVEUsXG5cbiAgICAvKiroh6rlrprlrprkuYnmianlsZUgKi9cbiAgICAvKipAZGVzY3JpcHRpb24g5bCd6K+V6YeN5paw5LiL6L295aSx6LSl5paH5Lu2ICovXG4gICAgVFJZX0RPV05MT0FEX0ZBSUxFRF9BU1NFVFMsXG59XG5cbi8qKkBkZXNjcmlwdGlvbiDlrZDmuLjmiI/ng63mm7TmlrDnmoTmlrnlvI8gKi9cbmV4cG9ydCBlbnVtIFN1YkdhbWVVcGRhdGVUeXBlIHtcbiAgICAvKipAZGVzY3JpcHRpb24g5aaC5p6c6K+l5a2Q5ri45oiP55qE5Luj56CB5bey57uP5Yqg6L296L+H77yMXG4gICAgICog5Zyo546p5a625LiN6YeN5ZCv5ri45oiP55qE5oOF5Ya15LiL77yM5b+955Wl5pyN5Yqh5Zmo56uv55qE5omA5pyJ5pu05pawXG4gICAgICog5LyY54K577ya5Zyo546p5a625pyq5YWz6Zet5ri45oiP5YmN5o+Q77yM5q+P5Liq5a2Q5ri45oiP5Y+q5Lya6L+b6KGM5LiA5qyh5pu05pawXG4gICAgICog57y654K5OiDmr4/kuKrlrZDmuLjmiI/lj6rog73mm7TmlrDkuIDmrKHvvIzkuI3og73ml7bml7bkv53or4Hov5vlhaXlrZDmuLjmiI/nmoTku6PnoIHlj4rotYTmupDkuLrmnIDmlrDniYjmnKxcbiAgICAgKiAgKi9cbiAgICBOb3JtYWwsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOS4jeeuoeWtkOa4uOaIj+aIj+S7o+eggeaYr+WQpuW3sue7j+WKoOi9vVxuICAgICAqIOmDveWFiOS8muajgOa1i+abtOaWsO+8jOWOu+acjeWKoeWZqOaLieWPluWIsOacgOaWsOeahOS7o+eggeWPiui1hOa6kFxuICAgICAqIOS8mOeCuSA6IOacrOWcsOeahOS7o+eggeWni+e7iOS/neaMgeacgOaWsFxuICAgICAqIOe8uueCuSA6IOW9k+eOqeWutuW3sue7j+i/m+WFpeS6huivpea4uOaIj++8jOS4i+asoeWcqOi/m+WFpeivpea4uOaIj+aXtu+8jFxuICAgICAqIOWPkeeOsOacieaWsOeahOeJiOacrO+8jOatpOaXtuS4i+i9veWujOaIkOaWsOeJiOacrOeahOi1hOa6kOWPiuS7o+eggeWQju+8jOS8mumAoOaIkOW6lOeUqOmHjeWQr1xuICAgICAqL1xuICAgIENoZWNrVXBkYXRlLFxufVxuXG5leHBvcnQgY2xhc3MgR2FtZUNvbmZpZyB7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOa4uOaIj+WtkOWMheWQjSAqL1xuICAgIHN1YnBhY2thZ2VOYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmuLjmiI/lkI0gKi9cbiAgICBnYW1lTmFtZTogc3RyaW5nID0gXCJcIjtcbiAgICAvKipAZGVzY3JpcHRpb24gaDXmmK/lkKbliqDovb3lrZDmuLjmiI/lrozmiJAgKi9cbiAgICBpc0xvYWRlZCA9IGZhbHNlO1xuICAgIGluZGV4ID0gMDtcbiAgICBjb25zdHJ1Y3RvciggZ2FtZU5hbWUgOiBzdHJpbmcgLCBzdWJwYWNrYWdlTmFtZSA6IHN0cmluZyAsIGluZGV4IDogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5nYW1lTmFtZSA9IGdhbWVOYW1lO1xuICAgICAgICB0aGlzLnN1YnBhY2thZ2VOYW1lID0gc3VicGFja2FnZU5hbWU7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5pc0xvYWRlZCA9IGZhbHNlO1xuICAgIH1cbiB9XG5cbmNvbnN0IEhBTExfQVNTRVRTX01BTkFHRVJfTkFNRSA9IFwiSEFMTFwiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDng63mm7TmlrDnu4Tku7ZcbiAqL1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5jbGFzcyBfSG90VXBkYXRlIHtcbiAgICBwcml2YXRlIG1hbmlmZXN0Um9vdDogc3RyaW5nID0gYG1hbmlmZXN0L2A7XG4gICAgLyoqQGRlc2NyaXB0aW9uIOacrOWcsOWtmOWCqOeDreabtOaWsOaWh+S7tueahOi3r+W+hCAqL1xuICAgIHByaXZhdGUgc3RvcmFnZVBhdGggPSBcIlwiO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmmK/lkKblnKjng63mm7TmlrDkuK3miJbmo4DmtYvmm7TmlrDnirbmgIEgKi9cbiAgICBwcml2YXRlIHVwZGF0aW5nID0gZmFsc2U7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5a2Q5ri45oiP5pu05paw57G75Z6LICovXG4gICAgcHVibGljIHN1YkdhbWVVcGRhdGVUeXBlID0gU3ViR2FtZVVwZGF0ZVR5cGUuTm9ybWFsO1xuXG4gICAgcHJpdmF0ZSBfY29tbW9uSG90VXBkYXRlVXJsID0gbnVsbDtcbiAgICAvKipAZGVzY3JpcHRpb24g6YCa55So55qE54Ot5pu05paw5Zyw5Z2A77yM5b2T5Zyo5a2Q5ri45oiP5oiW5aSn5Y6F5pyq5oyH5a6a54Ot5pu05paw5Zyw5Z2A5pe277yM6YO957uf5LiA5L2/55So5pyN5Yqh5Zmo5Lyg5Zue5p2l55qE6buY6K6k5YWo5bGA5pu05paw5Zyw5Z2AICovXG4gICAgcHVibGljIGdldCBjb21tb25Ib3RVcGRhdGVVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgdGhpcy5fY29tbW9uSG90VXBkYXRlVXJsID0gRy5VUkxNZ3IuaG90VXBkYXRlVVJMO1xuICAgICAgICBpZiAodGhpcy5fY29tbW9uSG90VXBkYXRlVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21tb25Ib3RVcGRhdGVVcmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0TWFuaWZlc3QucGFja2FnZVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Byb2plY3RNYW5pZmVzdDogTWFuaWZlc3QgPSBudWxsO1xuICAgIHByaXZhdGUgZ2V0IHByb2plY3RNYW5pZmVzdCgpOiBNYW5pZmVzdCB7XG4gICAgICAgIGlmIChDQ19KU0IgJiYgIXRoaXMuX3Byb2plY3RNYW5pZmVzdCkge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKHRoaXMuaGFsbFByb2plY3RNYWluZmVzdCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2plY3RNYW5pZmVzdCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2plY3RNYW5pZmVzdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoYOivu+WPliR7dGhpcy5oYWxsUHJvamVjdE1haW5mZXN0feWksei0pWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0TWFuaWZlc3Q7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOeDreabtOaWsOWbnuiwgyAqL1xuICAgIHB1YmxpYyBvbkRvd25sb2FkOiAoXG4gICAgICAgIGRvd25sb2FkZWRCeXRlczogbnVtYmVyLFxuICAgICAgICB0b3RhbEJ5dGVzOiBudW1iZXIsXG4gICAgICAgIGRvd25sb2FkZWRGaWxlczogbnVtYmVyLFxuICAgICAgICB0b3RhbEZpbGVzOiBudW1iZXIsXG4gICAgICAgIHBlcmNlbnQ6IG51bWJlcixcbiAgICAgICAgcGVyY2VudEJ5RmlsZTogbnVtYmVyLFxuICAgICAgICBjb2RlOiBBc3NldE1hbmFnZXJDb2RlLFxuICAgICAgICBzdGF0ZTogQXNzZXRNYW5hZ2VyU3RhdGUsXG4gICAgICAgIG5lZWRSZXN0YXJ0OiBib29sZWFuKSA9PiB2b2lkID0gbnVsbDtcbiAgICAvKipAZGVzY3JpcHRpb24g5aSn5Y6F5pys5Zyw55qE54mI5pys6aG555uu5pu05paw5paH5Lu26YWN572u6Lev5b6EICovXG4gICAgcHVibGljIGdldCBoYWxsUHJvamVjdE1haW5mZXN0KCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5tYW5pZmVzdFJvb3R9cHJvamVjdC5tYW5pZmVzdGA7XG4gICAgfVxuICAgIC8qKkBkZXNjcmlwdGlvbiDmo4DmtYvmm7TmlrDlm57osIMgKi9cbiAgICBwdWJsaWMgY2hlY2tDYWxsYmFjazogKGNvZGU6IEFzc2V0TWFuYWdlckNvZGUsIHN0YXRlOiBBc3NldE1hbmFnZXJTdGF0ZSkgPT4gdm9pZCA9IG51bGw7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5a2Q5ri45oiP54mI5pys5L+h5oGvICovXG4gICAgcHVibGljIGFsbEdhbWVDb25maWc6IHsgW2tleTogc3RyaW5nXTogR2FtZUNvbmZpZyB9ID0ge307XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6LWE5rqQ566h55CG5ZmoICovXG4gICAgcHJpdmF0ZSBhc3NldHNNYW5hZ2VyczogeyBba2V5OiBzdHJpbmddOiBBc3NldHNNYW5hZ2VyIH0gPSB7fTtcblxuICAgIHB1YmxpYyBfaG90VXBkYXRlVXJsczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICAgIC8qKkBkZXNjcmlwdGlvbiDng63mm7TmlrDlnLDlnYDvvIzkuLrkuobmlrnkvr/lkI7pnaLlvZPlj6rmm7TmlrDkuIDkuKrmuLjmiI/vvIzmiJZjZG7mnI3liqHlmaggKi9cbiAgICBwcml2YXRlIGdldEhvdFVwZGF0ZVVybChtb2R1bGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIFwiZ2FtZU9uZVwiOiB0aGlzLl9jb21tb25Ib3RVcGRhdGVVcmwsXG4gICAgICAgICAgICAgICAgXCJnYW1lVHdvXCI6IHRoaXMuX2NvbW1vbkhvdFVwZGF0ZVVybCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWdbbW9kdWxlTmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnW21vZHVsZU5hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21tb25Ib3RVcGRhdGVVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faG90VXBkYXRlVXJsc1ttb2R1bGVOYW1lXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ob3RVcGRhdGVVcmxzW21vZHVsZU5hbWVdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21tb25Ib3RVcGRhdGVVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN54Ot5pu05paw55qE6LWE5rqQ566h55CG5ZmoICovXG4gICAgcHJpdmF0ZSBjdXJyZW50QXNzZXRzTWFuYWdlcjogQXNzZXRzTWFuYWdlciA9IG51bGw7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6I635Y+W5a2Q5ri45oiP5ZCNICovXG4gICAgcHVibGljIGdldEdhbWVMb2NhbE5hbWUoZ2FtZU5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxHYW1lQ29uZmlnW2dhbWVOYW1lXTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6YeK5pS+6LWE5rqQ566h55CG5Zmo77yM6buY6K6k5Li6aGFsbCDlpKfljoXotYTmupDnrqHnkIblmaggKi9cbiAgICBkZXN0cm95QXNzZXRzTWFuYWdlcihuYW1lOiBzdHJpbmcgPSBIQUxMX0FTU0VUU19NQU5BR0VSX05BTUUpIHtcbiAgICAgICAgaWYgKHRoaXMuYXNzZXRzTWFuYWdlcnNbbmFtZV0pIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFzc2V0c01hbmFnZXJzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOiOt+WPlui1hOa6kOeuoeeQhuWZqO+8jOm7mOiupOS4umhhbGwg5aSn5Y6F55qE6LWE5rqQ566h55CG5ZmoICovXG4gICAgcHVibGljIGdldEFzc2V0c01hbmFnZXIobmFtZTogc3RyaW5nID0gSEFMTF9BU1NFVFNfTUFOQUdFUl9OQU1FKSB7XG4gICAgICAgIGlmICh0aGlzLmFzc2V0c01hbmFnZXJzW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hc3NldHNNYW5hZ2Vyc1tuYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW6LWE5rqQ566h55CG5ZmoXG4gICAgICAgICAgICBpZiAoQ0NfSlNCKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCk7XG4gICAgICAgICAgICAgICAgY2MubG9nKGBTdG9yYWdlIHBhdGggZm9yIHJlbW90ZSBhc3NldCA6ICR7dGhpcy5zdG9yYWdlUGF0aH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2V0c01hbmFnZXJzW25hbWVdID0gbmV3IEFzc2V0c01hbmFnZXIobmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHNNYW5hZ2Vyc1tuYW1lXS5tYW5hZ2VyID0gbmV3IGpzYi5Bc3NldHNNYW5hZ2VyKG5hbWUgPT0gSEFMTF9BU1NFVFNfTUFOQUdFUl9OQU1FID8gXCJ0eXBlLmhhbGxcIiA6IGB0eXBlLiR7bmFtZX1fYCwgdGhpcy5zdG9yYWdlUGF0aCwgdGhpcy52ZXJzaW9uQ29tcGFyZUhhbmxlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIC8v6K6+572u5LiL6L295bm25Y+R6YePXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NldHNNYW5hZ2Vyc1tuYW1lXS5tYW5hZ2VyLnNldE1heENvbmN1cnJlbnRUYXNrKDgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzTWFuYWdlcnNbbmFtZV0ubWFuYWdlci5zZXRIb3RVcGRhdGVVcmwodGhpcy5nZXRIb3RVcGRhdGVVcmwobmFtZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXNzZXRzTWFuYWdlcnNbbmFtZV0ubWFuYWdlci5zZXRWZXJpZnlDYWxsYmFjayhmdW5jdGlvbiAocGF0aCwgYXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXByZXNzZWQgPSBhc3NldC5jb21wcmVzc2VkO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXhwZWN0ZWRNRDUgPSBhc3NldC5tZDU7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZWxhdGl2ZVBhdGggPSBhc3NldC5wYXRoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IGFzc2V0LnNpemU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wcmVzc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coYFZlcmlmaWNhdGlvbiBwYXNzZWQgOiAke3JlbGF0aXZlUGF0aH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKGBWZXJpZmljYXRpb24gcGFzc2VkIDogJHtyZWxhdGl2ZVBhdGh9ICggJHtleHBlY3RlZE1ENX0gKWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYy5sb2coYEhvdCB1cGRhdGUgaXMgcmVhZHkgLCBwbGVhc2UgY2hlY2sgb3IgZGlyZWN0bHkgdXBkYXRlLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXNzZXRzTWFuYWdlcnNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5Yik5pat5piv5ZCm6ZyA6KaB6YeN5paw5bCd6K+V5LiL6L295LmL5YmN5LiL6L295aSx6LSl55qE5paH5Lu2ICovXG4gICAgcHJpdmF0ZSBpc1RyeURvd25sb2FkRmFpbGVkQXNzZXRzKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlciAmJlxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5tYW5hZ2VyLmdldFN0YXRlKCkgPT0gQXNzZXRNYW5hZ2VyU3RhdGUuRkFJTF9UT19VUERBVEUgJiZcbiAgICAgICAgICAgICh0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLmNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVCB8fFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIuY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX0RPV05MT0FEX01BTklGRVNUIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5jb2RlID09IEFzc2V0TWFuYWdlckNvZGUuRVJST1JfUEFSU0VfTUFOSUZFU1RcbiAgICAgICAgICAgICAgICB8fHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIuY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLlVQREFURV9GQUlMRURcbiAgICAgICAgICAgICAgICApKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOajgOa1i+abtOaWsCAqL1xuICAgIHByaXZhdGUgY2hlY2tVcGRhdGUoY2FsbGJhY2s6IChjb2RlOiBBc3NldE1hbmFnZXJDb2RlLCBzdGF0ZTogQXNzZXRNYW5hZ2VyU3RhdGUpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FIHx8IENDX1BSRVZJRVcgfHwgY2Muc3lzLmlzQnJvd3NlciApIHtcbiAgICAgICAgICAgIC8v6aKE6KeI5Y+K5rWP6KeI5Zmo5LiL77yM5LiN6ZyA6KaB5pyJ5pu05paw55qE5pON5L2cXG4gICAgICAgICAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjYWxsYmFjayhBc3NldE1hbmFnZXJDb2RlLkFMUkVBRFlfVVBfVE9fREFURSwgQXNzZXRNYW5hZ2VyU3RhdGUuVVBfVE9fREFURSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5sb2coYC0tY2hlY2tVcGRhdGUtLWApO1xuICAgICAgICAgICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coYENoZWNraW5nIG9yIHVwZGF0aW5nLi4uYCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soQXNzZXRNYW5hZ2VyQ29kZS5DSEVDS0lORywgQXNzZXRNYW5hZ2VyU3RhdGUuUFJFRE9XTkxPQURfVkVSU0lPTik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIuZ2V0TG9jYWxNYW5pZmVzdCgpIHx8ICF0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIuZ2V0TG9jYWxNYW5pZmVzdCgpLmlzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coYEZhaWxlZCB0byBsb2FkIGxvY2FsIG1hbmlmZXN0IC4uLi5gKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhBc3NldE1hbmFnZXJDb2RlLkVSUk9SX0RPV05MT0FEX01BTklGRVNULCBBc3NldE1hbmFnZXJTdGF0ZS5GQUlMX1RPX1VQREFURSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUcnlEb3dubG9hZEZhaWxlZEFzc2V0cygpKSB7XG4gICAgICAgICAgICAgICAgLy/lt7Lnu4/mm7TmlrDlpLHotKXvvIzlsJ3or5Xojrflj5bmm7TmlrDkuIvovb3lpLHotKXnmoRcbiAgICAgICAgICAgICAgICBjYy5sb2coYOS5i+WJjeS4i+i9vei1hOa6kOacquWujOWFqOS4i+i9veWujOaIkO+8jOivt+WwneivlemHjeaWsOS4i+i9vWApO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKEFzc2V0TWFuYWdlckNvZGUuVVBEQVRFX0ZBSUxFRCwgQXNzZXRNYW5hZ2VyU3RhdGUuVFJZX0RPV05MT0FEX0ZBSUxFRF9BU1NFVFMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIuc2V0RXZlbnRDYWxsYmFjayh0aGlzLmNoZWNrQ2IuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5tYW5hZ2VyLmNoZWNrVXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb3dubG9hZEZhaWxlZEFzc2V0cygpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIubWFuYWdlci5kb3dubG9hZEZhaWxlZEFzc2V0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOajgOafpeWkp+WOheaYr+WQpumcgOimgeabtOaWsCAqL1xuICAgIGNoZWNrSGFsbFVwZGF0ZShjYWxsYmFjazogKGNvZGU6IEFzc2V0TWFuYWdlckNvZGUsIHN0YXRlOiBBc3NldE1hbmFnZXJTdGF0ZSkgPT4gdm9pZCkge1xuICAgICAgICBpZiAoIGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FIHx8IENDX1BSRVZJRVcgfHwgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgLy/pooTop4jlj4rmtY/op4jlmajkuIvvvIzkuI3pnIDopoHmnInmm7TmlrDnmoTmk43kvZxcbiAgICAgICAgICAgIGNjLmxvZyhg6aKE6KeI5oiW5rWP6KeI5ZmoYCk7XG4gICAgICAgICAgICBjYWxsYmFjayhBc3NldE1hbmFnZXJDb2RlLkFMUkVBRFlfVVBfVE9fREFURSwgQXNzZXRNYW5hZ2VyU3RhdGUuVVBfVE9fREFURSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyID0gdGhpcy5nZXRBc3NldHNNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIubG9hZExvY2FsTWFuaWZlc3QodGhpcy5oYWxsUHJvamVjdE1haW5mZXN0KTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcGRhdGUoY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOiOt+WPluWtkOa4uOaIj21hbmlmZXN0IHVybFxuICAgICAqIEBwYXJhbSBnYW1lTmFtZSDlrZDmuLjmiI/lkI1cbiAgICAgKiBAcmV0dXJucyBtYW5pZmVzdCB1cmxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0R2FtZU1hbmlmZXN0KGdhbWVOYW1lKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke2dhbWVOYW1lfV9wcm9qZWN0Lm1hbmlmZXN0YDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5qOA5rWL5a2Q5ri45oiP5pu05pawXG4gICAgICogQHBhcmFtIGdhbWVOYW1lIOWtkOa4uOaIj+WQjVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDmo4DmtYvlrozmiJDlm57osINcbiAgICAgKi9cbiAgICBjaGVja0dhbWVVcGRhdGUoZ2FtZU5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChjb2RlOiBBc3NldE1hbmFnZXJDb2RlLCBzdGF0ZTogQXNzZXRNYW5hZ2VyU3RhdGUpID0+IHZvaWQpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FIHx8IENDX1BSRVZJRVcgfHwgY2Muc3lzLmlzQnJvd3NlciB8fCAhQ29uZmlnLmlzT3BlbkhvdFVwZGF0ZSkge1xuICAgICAgICAgICAgLy/pooTop4jlj4rmtY/op4jlmajkuIvvvIzkuI3pnIDopoHmnInmm7TmlrDnmoTmk43kvZxcbiAgICAgICAgICAgIGNjLmxvZyhg5LiN6ZyA6KaB5pyJ5pu05paw55qE5pON5L2cYCk7XG4gICAgICAgICAgICBjYWxsYmFjayhBc3NldE1hbmFnZXJDb2RlLkFMUkVBRFlfVVBfVE9fREFURSwgQXNzZXRNYW5hZ2VyU3RhdGUuVVBfVE9fREFURSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyID0gdGhpcy5nZXRBc3NldHNNYW5hZ2VyKGdhbWVOYW1lKTtcbiAgICAgICAgICAgIGxldCBtYW5pZmVzdFVybCA9IHRoaXMuZ2V0R2FtZU1hbmlmZXN0KGdhbWVOYW1lKTtcbiAgICAgICAgICAgIC8v5YWI5qOA5rWL5pys5Zyw5piv5ZCm5bey57uP5a2Y5Zyo5a2Q5ri45oiP54mI5pys5o6n5Yi25paH5Lu2IFxuICAgICAgICAgICAgaWYgKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobWFuaWZlc3RVcmwpKSB7XG4gICAgICAgICAgICAgICAgLy/lrZjlnKjniYjmnKzmjqfliLbmlofku7YgXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBqc2IuZmlsZVV0aWxzLmdldFN0cmluZ0Zyb21GaWxlKG1hbmlmZXN0VXJsKTtcbiAgICAgICAgICAgICAgICBsZXQganNiR2FtZU1hbmlmZXN0ID0gbmV3IGpzYi5NYW5pZmVzdChjb250ZW50LCB0aGlzLnN0b3JhZ2VQYXRoLCB0aGlzLmdldEhvdFVwZGF0ZVVybCh0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm5hbWUpKTtcbiAgICAgICAgICAgICAgICBjYy5sb2coYC0t5a2Y5Zyo5pys5Zyw54mI5pys5o6n5Yi25paH5Lu2Y2hlY2tVcGRhdGUtLWApO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhgbWFpbmlmZXN0VXJsIDogJHttYW5pZmVzdFVybH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIubG9hZExvY2FsTWFuaWZlc3QoanNiR2FtZU1hbmlmZXN0LCBcIlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBkYXRlKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/kuI3lrZjlnKjniYjmnKzmjqfliLbmlofku7Yg77yM55Sf5oiQ5LiA5Liq5Yid5aeL54mI5pysXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKGBDaGVja2luZyBvciB1cGRhdGluZy4uLmApO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhBc3NldE1hbmFnZXJDb2RlLkNIRUNLSU5HLCBBc3NldE1hbmFnZXJTdGF0ZS5QUkVET1dOTE9BRF9WRVJTSU9OKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBwYWNrYWdlVXJsID0gdGhpcy5nZXRIb3RVcGRhdGVVcmwoZ2FtZU5hbWUpO1xuICAgICAgICAgICAgICAgIGxldCBnYW1lTWFuaWZlc3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBwYWNrYWdlVXJsOiBwYWNrYWdlVXJsLFxuICAgICAgICAgICAgICAgICAgICByZW1vdGVNYW5pZmVzdFVybDogYCR7cGFja2FnZVVybH0ke3RoaXMubWFuaWZlc3RSb290fSR7bWFuaWZlc3RVcmx9YCxcbiAgICAgICAgICAgICAgICAgICAgcmVtb3RlVmVyc2lvblVybDogYCR7cGFja2FnZVVybH0ke3RoaXMubWFuaWZlc3RSb290fSR7Z2FtZU5hbWV9X3ZlcnNpb24ubWFuaWZlc3RgLFxuICAgICAgICAgICAgICAgICAgICBhc3NldHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hQYXRoczogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGxldCBnYW1lTWFuaWZlc3RDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZ2FtZU1hbmlmZXN0KTtcbiAgICAgICAgICAgICAgICBsZXQganNiR2FtZU1hbmlmZXN0ID0gbmV3IGpzYi5NYW5pZmVzdChnYW1lTWFuaWZlc3RDb250ZW50LCB0aGlzLnN0b3JhZ2VQYXRoLCB0aGlzLmdldEhvdFVwZGF0ZVVybCh0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm5hbWUpKTtcbiAgICAgICAgICAgICAgICBjYy5sb2coYC0tY2hlY2tVcGRhdGUtLWApO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhgbWFpbmlmZXN0IGNvbnRlbnQgOiAke2dhbWVNYW5pZmVzdENvbnRlbnR9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5tYW5hZ2VyLmxvYWRMb2NhbE1hbmlmZXN0KGpzYkdhbWVNYW5pZmVzdCwgXCJcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZShjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5qOA5rWL5pu05pawICovXG4gICAgcHJpdmF0ZSBjaGVja0NiKGV2ZW50KSB7XG5cbiAgICAgICAgLy/ov5nph4zkuI3og73nva7nqbrvvIzkuIvovb1tYW5pZmVzdOaWh+S7tuS5n+S8muWbnuiwg+i/h+adpVxuICAgICAgICAvL3RoaXMuY2hlY2tDYWxsYmFjayA9IG51bGw7XG4gICAgICAgIC8v5a2Y5YKo5b2T5YmN55qE54q25oCB77yM5b2T5LiL6L2954mI5pys5paH5Lu25aSx6LSl5pe277yMc3RhdGXnmoTnirbmgIHkuI7kuIvovb3pnZ7niYjmnKzmlofku7bmmK/kuIDmoLfnmoTnirbmgIFcbiAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5jb2RlID0gZXZlbnQuZ2V0RXZlbnRDb2RlKCk7XG4gICAgICAgIGNjLmxvZyhgY2hlY2tDYiBldmVudCBjb2RlIDogJHtldmVudC5nZXRFdmVudENvZGUoKX0gc3RhdGUgOiAke3RoaXMuY3VycmVudEFzc2V0c01hbmFnZXIubWFuYWdlci5nZXRTdGF0ZSgpfWApO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmdldEV2ZW50Q29kZSgpKSB7XG4gICAgICAgICAgICBjYXNlIEFzc2V0TWFuYWdlckNvZGUuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XG4gICAgICAgICAgICAgICAgY2MubG9nKGBObyBsb2NhbCBtYW5pZmVzdCBmaWxlIGZvdW5kLCBob3QgdXBkYXRlIHNraXBwZWQuYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFzc2V0TWFuYWdlckNvZGUuRVJST1JfRE9XTkxPQURfTUFOSUZFU1Q6XG4gICAgICAgICAgICBjYXNlIEFzc2V0TWFuYWdlckNvZGUuRVJST1JfUEFSU0VfTUFOSUZFU1Q6XG4gICAgICAgICAgICAgICAgY2MubG9nKGBGYWlsIHRvIGRvd25sb2FkIG1hbmlmZXN0IGZpbGUsIGhvdCB1cGRhdGUgc2tpcHBlZC5gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXNzZXRNYW5hZ2VyQ29kZS5BTFJFQURZX1VQX1RPX0RBVEU6XG4gICAgICAgICAgICAgICAgY2MubG9nKGBBbHJlYWR5IHVwIHRvIGRhdGUgd2l0aCB0aGUgbGF0ZXN0IHJlbW90ZSB2ZXJzaW9uLmApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBc3NldE1hbmFnZXJDb2RlLk5FV19WRVJTSU9OX0ZPVU5EOlxuICAgICAgICAgICAgICAgIGNjLmxvZyhgTmV3IHZlcnNpb24gZm91bmQsIHBsZWFzZSB0cnkgdG8gdXBkYXRlLmApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBc3NldE1hbmFnZXJDb2RlLlVQREFURV9GSU5JU0hFRDpcbiAgICAgICAgICAgICAgICBjYy5sb2coYCBVUERBVEVfRklOSVNIRUQgYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xuICAgICAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy/lpoLmnpzmraPlnKjkuIvovb3mm7TmlrDmlofku7bvvIzlhYjkuIvovb3mm7TmlrDmlofku7bmr5TovoPlrozmiJDlkI7vvIzlho3lm57osINcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tDYWxsYmFjayAmJiB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIuZ2V0U3RhdGUoKSAhPSBBc3NldE1hbmFnZXJTdGF0ZS5ET1dOTE9BRElOR19WRVJTSU9OKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ2FsbGJhY2soZXZlbnQuZ2V0RXZlbnRDb2RlKCksIHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIubWFuYWdlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tDYWxsYmFjayA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g54Ot5pu05pawXG4gICAgICogQHBhcmFtIG1hbmlmZXN0VXJsIG1hbmlmZXN05Zyw5Z2AXG4gICAgICogQHBhcmFtIGdhbWVOYW1lIFxuICAgICAqL1xuICAgIGhvdFVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyKSB7XG4gICAgICAgICAgICBjYy5lcnJvcihg54Ot5pu05paw566h55CG5Zmo5pyq5Yid5aeL5YyWYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKGDljbPlsIbng63mm7TmlrDmqKHlnZfkuLo6JHt0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm5hbWV9ICwgdXBkYXRpbmcgOiAke3RoaXMudXBkYXRpbmd9YCk7XG4gICAgICAgIGlmICghdGhpcy51cGRhdGluZykge1xuICAgICAgICAgICAgY2MubG9nKGDmiafooYzmm7TmlrAgJHt0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm5hbWV9IGApO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5tYW5hZ2VyLnNldEV2ZW50Q2FsbGJhY2sodGhpcy51cGRhdGVDYi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIubWFuYWdlci51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDng63mm7TmlrDlm57osIMgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUNiKGV2ZW50KSB7XG4gICAgICAgIHZhciBpc1VwZGF0ZUZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgY2MubG9nKGAtLXVwZGF0ZSBjYiBjb2RlIDogJHtldmVudC5nZXRFdmVudENvZGUoKX0gc3RhdGUgOiAke3RoaXMuY3VycmVudEFzc2V0c01hbmFnZXIubWFuYWdlci5nZXRTdGF0ZSgpfWApO1xuICAgICAgICAvL+WtmOWCqOW9k+WJjeeahOeKtuaAge+8jOW9k+S4i+i9veeJiOacrOaWh+S7tuWksei0peaXtu+8jHN0YXRl55qE54q25oCB5LiO5LiL6L296Z2e54mI5pys5paH5Lu25piv5LiA5qC355qE54q25oCBXG4gICAgICAgIHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIuY29kZSA9IGV2ZW50LmdldEV2ZW50Q29kZSgpO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmdldEV2ZW50Q29kZSgpKSB7XG4gICAgICAgICAgICBjYXNlIEFzc2V0TWFuYWdlckNvZGUuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1Q6XG4gICAgICAgICAgICAgICAgY2MubG9nKGBObyBsb2NhbCBtYW5pZmVzdCBmaWxlIGZvdW5kLCBob3QgdXBkYXRlIHNraXBwZWQuYCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXNzZXRNYW5hZ2VyQ29kZS5VUERBVEVfUFJPR1JFU1NJT046XG4gICAgICAgICAgICAgICAgY2MubG9nKGAke2V2ZW50LmdldERvd25sb2FkZWRCeXRlcygpfSAvICR7ZXZlbnQuZ2V0VG90YWxCeXRlcygpfWApO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhgJHtldmVudC5nZXREb3dubG9hZGVkRmlsZXMoKX0gLyAke2V2ZW50LmdldFRvdGFsRmlsZXMoKX1gKTtcbiAgICAgICAgICAgICAgICBjYy5sb2coYHBlcmNlbnQgOiAke2V2ZW50LmdldFBlcmNlbnQoKX1gKTtcbiAgICAgICAgICAgICAgICBjYy5sb2coYHBlcmNlbnQgYnkgZmlsZSA6ICR7ZXZlbnQuZ2V0UGVyY2VudEJ5RmlsZSgpfWApO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBldmVudC5nZXRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1zZykge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coYFVwZGF0ZWQgZmlsZTogJHttc2d9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX0RPV05MT0FEX01BTklGRVNUOlxuICAgICAgICAgICAgY2FzZSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX1BBUlNFX01BTklGRVNUOlxuICAgICAgICAgICAgICAgIGNjLmxvZyhgRmFpbCB0byBkb3dubG9hZCBtYW5pZmVzdCBmaWxlLCBob3QgdXBkYXRlIHNraXBwZWQuYCk7XG4gICAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXNzZXRNYW5hZ2VyQ29kZS5BTFJFQURZX1VQX1RPX0RBVEU6XG4gICAgICAgICAgICAgICAgY2MubG9nKGBBbHJlYWR5IHVwIHRvIGRhdGUgd2l0aCB0aGUgbGF0ZXN0IHJlbW90ZSB2ZXJzaW9uLmApO1xuICAgICAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFzc2V0TWFuYWdlckNvZGUuVVBEQVRFX0ZJTklTSEVEOlxuICAgICAgICAgICAgICAgIGNjLmxvZyhgVXBkYXRlIGZpbmlzaGVkLiAke2V2ZW50LmdldE1lc3NhZ2UoKX1gKTtcbiAgICAgICAgICAgICAgICBpc1VwZGF0ZUZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXNzZXRNYW5hZ2VyQ29kZS5VUERBVEVfRkFJTEVEOlxuICAgICAgICAgICAgICAgIGNjLmxvZyhgVXBkYXRlIGZhaWxlZC4gJHtldmVudC5nZXRNZXNzYWdlKCl9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX1VQREFUSU5HOlxuICAgICAgICAgICAgICAgIGNjLmxvZyhgQXNzZXQgdXBkYXRlIGVycm9yOiAke2V2ZW50LmdldEFzc2V0SWQoKX0gLCAke2V2ZW50LmdldE1lc3NhZ2UoKX1gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9ERUNPTVBSRVNTOlxuICAgICAgICAgICAgICAgIGNjLmxvZyhgJHtldmVudC5nZXRNZXNzYWdlKCl9YCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmYWlsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFzc2V0c01hbmFnZXIubWFuYWdlci5zZXRFdmVudENhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVXBkYXRlRmluaXNoZWQpIHtcbiAgICAgICAgICAgIC8v5LiL6L295a6M5oiQLOmcgOimgemHjeaWsOiuvue9ruaQnOe0oui3r+W+hO+8jOa3u+WKoOS4i+i9vei3r+W+hFxuICAgICAgICAgICAgLy8gUHJlcGVuZCB0aGUgbWFuaWZlc3QncyBzZWFyY2ggcGF0aFxuICAgICAgICAgICAgdmFyIHNlYXJjaFBhdGhzOiBzdHJpbmdbXSA9IGpzYi5maWxlVXRpbHMuZ2V0U2VhcmNoUGF0aHMoKTtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoczogc3RyaW5nW10gPSB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIuZ2V0TG9jYWxNYW5pZmVzdCgpLmdldFNlYXJjaFBhdGhzKCk7XG4gICAgICAgICAgICBjYy5sb2coSlNPTi5zdHJpbmdpZnkobmV3UGF0aHMpKTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KHNlYXJjaFBhdGhzLCBuZXdQYXRocyk7XG4gICAgICAgICAgICAvLyBUaGlzIHZhbHVlIHdpbGwgYmUgcmV0cmlldmVkIGFuZCBhcHBlbmRlZCB0byB0aGUgZGVmYXVsdCBzZWFyY2ggcGF0aCBkdXJpbmcgZ2FtZSBzdGFydHVwLFxuICAgICAgICAgICAgLy8gcGxlYXNlIHJlZmVyIHRvIHNhbXBsZXMvanMtdGVzdHMvbWFpbi5qcyBmb3IgZGV0YWlsZWQgdXNhZ2UuXG4gICAgICAgICAgICAvLyAhISEgUmUtYWRkIHRoZSBzZWFyY2ggcGF0aHMgaW4gbWFpbi5qcyBpcyB2ZXJ5IGltcG9ydGFudCwgb3RoZXJ3aXNlLCBuZXcgc2NyaXB0cyB3b24ndCB0YWtlIGVmZmVjdC5cblxuICAgICAgICAgICAgLy/ov5nph4zlgZrkuIDkuKrmkJzntKLot6/lvoTljrvph43lpITnkIZcbiAgICAgICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VhcmNoUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYmpbc2VhcmNoUGF0aHNbaV1dID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFBhdGhzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSG90VXBkYXRlU2VhcmNoUGF0aHMnLCBKU09OLnN0cmluZ2lmeShzZWFyY2hQYXRocykpO1xuICAgICAgICAgICAganNiLmZpbGVVdGlscy5zZXRTZWFyY2hQYXRocyhzZWFyY2hQYXRocyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5uYW1lID09IEhBTExfQVNTRVRTX01BTkFHRVJfTkFNRSkge1xuICAgICAgICAgICAgaWYgKGlzVXBkYXRlRmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm1hbmFnZXIuc2V0RXZlbnRDYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICAvL+S4i+i9veaVsOmHj+Wkp+S6jjDvvIzmiY3mnInlv4XopoHov5vlhaXph43lkK/vvIzlnKjlpoLkuIvov5nnp43mg4XlhrXkuIvvvIzlubbkuI3kvJrlj5HnlJ/kuIvovb1cbiAgICAgICAgICAgICAgICAvL+W9k+WPquaPkOWNh+S6hueJiOacrOWPt++8jOiAjOW5tuacquWvueS7o+eggei/m+ihjOS/ruaUueaXtu+8jOatpOaXtueahOWPquS4i+i9veS6huS4gOS4qnByb2plY3QubWFuaWZlc3Tmlofku7bvvIxcbiAgICAgICAgICAgICAgICAvL+S4jemcgOimgeWvuea4uOaIj+i/m+ihjOmHjeWQr+eahOaTjeS9nFxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmdldERvd25sb2FkZWRGaWxlcygpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coYOabtOaWsOWkp+WOhe+8jOmcgOimgemHjeWQr2FwcOeUn+aViGApO1xuICAgICAgICAgICAgICAgICAgICAvLyBjYy5nYW1lLnJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVTdGFydEdhbWUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5a2Q5ri45oiP5pu05pawXG4gICAgICAgICAgICBpZiAoaXNVcGRhdGVGaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5nZXREb3dubG9hZGVkRmlsZXMoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lt7Lnu4/liqDovb3ov4flrZDmuLjmiI/ku6PnoIHvvIzlpoLmnpzpnIDopoHkvb/nlKjliLDmnIDmlrDvvIzpnIDopoHph43lkK9hcHDmiY3og73mmK/mnIDmlrDnmoTku6PnoIFcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1cnJlbnRBc3NldHNNYW5hZ2VyLm5hbWVdLmlzTG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coYOW3sue7j+WKoOi9vei/h+a4uOaIj+S7o+egge+8jOmcgOimgemHjeWQr2FwcOeUn+aViGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGVGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5nYW1lLnJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlU3RhcnRHYW1lKClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5rKh5pyJ5Yqg6L296L+H5a2Q5ri45oiP5Luj56CBXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coYOesrOS4gOasoeWKoOi9veWtkOa4uOaIj+S7o+egge+8jOS4jemcgOimgemHjeWQr2ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGVGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGVGaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uRG93bmxvYWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Eb3dubG9hZChcbiAgICAgICAgICAgICAgICBldmVudC5nZXREb3dubG9hZGVkQnl0ZXMoKSxcbiAgICAgICAgICAgICAgICBldmVudC5nZXRUb3RhbEJ5dGVzKCksXG4gICAgICAgICAgICAgICAgZXZlbnQuZ2V0RG93bmxvYWRlZEZpbGVzKCksXG4gICAgICAgICAgICAgICAgZXZlbnQuZ2V0VG90YWxGaWxlcygpLFxuICAgICAgICAgICAgICAgIGV2ZW50LmdldFBlcmNlbnQoKSxcbiAgICAgICAgICAgICAgICBldmVudC5nZXRQZXJjZW50QnlGaWxlKCksXG4gICAgICAgICAgICAgICAgZXZlbnQuZ2V0RXZlbnRDb2RlKCksXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXNzZXRzTWFuYWdlci5tYW5hZ2VyLmdldFN0YXRlKCksXG4gICAgICAgICAgICAgICAgaXNVcGRhdGVGaW5pc2hlZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmxvZyhgdXBkYXRlIGNiICBmYWlsZWQgOiAke2ZhaWxlZH0gICwgbmVlZCByZXN0YXJ0IDogJHtpc1VwZGF0ZUZpbmlzaGVkfSAsIHVwZGF0aW5nIDogJHt0aGlzLnVwZGF0aW5nfWApO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVyc2lvbkNvbXBhcmVIYW5sZSh2ZXJzaW9uQTogc3RyaW5nLCB2ZXJzaW9uQjogc3RyaW5nKSB7XG4gICAgICAgIGNjLmxvZyhgSlMgQ3VzdG9tIFZlcnNpb24gQ29tcGFyZSA6IHZlcnNpb24gQSBpcyAke3ZlcnNpb25BfSAsIHZlcnNpb24gQiBpcyAke3ZlcnNpb25CfWApO1xuICAgICAgICBsZXQgdkEgPSB2ZXJzaW9uQS5zcGxpdCgnLicpO1xuICAgICAgICBsZXQgdkIgPSB2ZXJzaW9uQi5zcGxpdCgnLicpO1xuICAgICAgICBjYy5sb2coYHZlcnNpb24gQSAke3ZBfSAsIHZlcnNpb24gQiAke3ZCfWApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZBLmxlbmd0aCAmJiBpIDwgdkIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBhID0gcGFyc2VJbnQodkFbaV0pO1xuICAgICAgICAgICAgbGV0IGIgPSBwYXJzZUludCh2QltpXSk7XG4gICAgICAgICAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh2Qi5sZW5ndGggPiB2QS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn1cblxuZXhwb3J0IGxldCBIb3RVcGRhdGUgPSBuZXcgX0hvdFVwZGF0ZSgpO1xuIl19