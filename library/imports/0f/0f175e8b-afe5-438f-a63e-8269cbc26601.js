"use strict";
cc._RF.push(module, '0f1756Lr+VDj6Y+gmnLwmYB', 'GameManager');
// script/common/manager/GameManager.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameManager = void 0;
const Singleton_1 = require("../../framework/base/Singleton");
const LogicEvent_1 = require("../event/LogicEvent");
const HotUpdate_1 = require("../base/HotUpdate");
const HallEvent_1 = require("../../hall/HallEvent");
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("./Manager");
function gameManager() {
    return Singleton_1.getSingleton(GameManager);
}
exports.gameManager = gameManager;
class GameManager {
    constructor() {
        this.updateFailedNum = 0;
        this.curGame = null;
        this.isLoading = false;
    }
    static Instance() { return this._instance || (this._instance = new GameManager()); }
    /**
     * 外部接口 进入游戏
     * @param areaType
     */
    enterGame(config) {
        if (this.isLoading) {
            cc.log("正在更新游戏，请稍等");
            // PanelHelp.showMsgBox("", i18n.Tips.GameIsLoading);
            return;
        }
        // PanelHelp.showLoading(i18n.WAIT.LOADING)
        this.curGame = config;
        this.isLoading = true;
        if (!HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName]) {
            HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName] = config;
        }
        let versionInfo = HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName];
        if (HotUpdate_1.HotUpdate.subGameUpdateType == HotUpdate_1.SubGameUpdateType.Normal) {
            if (versionInfo.isLoaded) {
                cc.log(`游戏已经加载过了`);
                this.onGameReady();
            }
            else {
                //检测游戏版本更新
                dispatch("onCheckUpdateGameStart", this.curGame.subpackageName);
                this.checkUpdate(versionInfo);
            }
        }
        else {
            dispatch("onCheckUpdateGameStart", this.curGame.subpackageName);
            this.checkUpdate(versionInfo);
        }
    }
    enterGameNoUpdate(config) {
        if (this.isLoading) {
            cc.log("正在更新游戏，请稍等");
            PanelHelp_1.default.showMsgBox("", LanguageImpl_1.i18n.Tips.GameIsLoading);
            return;
        }
        // PanelHelp.showLoading(i18n.WAIT.LOADING)
        this.curGame = config;
        this.isLoading = true;
        if (!HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName]) {
            HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName] = config;
        }
        let versionInfo = HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName];
        if (versionInfo.isLoaded) {
            cc.log(`游戏已经加载过了`);
            this.onGameReady();
        }
        else {
            this.loadSubpackage();
        }
    }
    onGameReady() {
        if (this.isLoading) {
            this.isLoading = false;
        }
        dispatch(LogicEvent_1.LogicEvent.ENTER_GAME_READY, this.curGame.subpackageName);
    }
    /**@description 检测子游戏更新 */
    checkUpdate(versionInfo) {
        let self = this;
        cc.log(`检测更新信息:${versionInfo.gameName}(${versionInfo.subpackageName})`);
        // dispatch("onCheckUpdateGameStart", this.curGame.subpackageName);
        HotUpdate_1.HotUpdate.checkGameUpdate(this.curGame.subpackageName, (code, state) => {
            if (code == HotUpdate_1.AssetManagerCode.NEW_VERSION_FOUND) {
                //有新版本
                HotUpdate_1.HotUpdate.onDownload = this.onDownload.bind(this);
                cc.log(`检测到${versionInfo.gameName}(${versionInfo.subpackageName})有新的版本`);
                HotUpdate_1.HotUpdate.hotUpdate();
                PanelHelp_1.default.hideLoading();
                dispatch("CloseInviteView");
                dispatch("onCheckUpdateGameEnd", this.curGame.subpackageName);
            }
            else if (state == HotUpdate_1.AssetManagerState.TRY_DOWNLOAD_FAILED_ASSETS) {
                //尝试重新下载之前下载失败的文件
                HotUpdate_1.HotUpdate.onDownload = this.onDownload.bind(this);
                cc.log(`正在尝试重新下载之前下载失败的资源`);
                HotUpdate_1.HotUpdate.downloadFailedAssets();
            }
            else if (code == HotUpdate_1.AssetManagerCode.UPDATE_FINISHED) {
                //更新完成
                this.isLoading = false;
                let gameConfig = HotUpdate_1.HotUpdate.getGameLocalName(this.curGame.subpackageName);
                dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: 1.1, config: gameConfig });
                dispatch("onCheckUpdateGameEnd", this.curGame.subpackageName);
                // PanelHelp.hideLoading()
            }
            else if (code == HotUpdate_1.AssetManagerCode.ALREADY_UP_TO_DATE) {
                dispatch("onCheckUpdateGameEnd", this.curGame.subpackageName);
                //已经是最新版本
                if (versionInfo.isLoaded) {
                    self.onGameReady();
                }
                else {
                    self.loadSubpackage();
                }
            }
            else if (code == HotUpdate_1.AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
                code == HotUpdate_1.AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
                code == HotUpdate_1.AssetManagerCode.ERROR_PARSE_MANIFEST) {
                //下载manifest文件失败
                this.isLoading = false;
                let content = "下载版本文件失败!";
                if (code == HotUpdate_1.AssetManagerCode.ERROR_NO_LOCAL_MANIFEST) {
                    content = "找不到版本文件!";
                }
                else if (code == HotUpdate_1.AssetManagerCode.ERROR_PARSE_MANIFEST) {
                    content = "版本文件解析错误!";
                }
                //Manager.toast.show(content);
            }
            else if (code == HotUpdate_1.AssetManagerCode.CHECKING) {
                //当前正在检测更新
                cc.log(`正在检测更新!!`);
            }
            else {
                this.isLoading = false;
                cc.log(`检测更新当前状态 code : ${code} state : ${state}`);
            }
        });
    }
    loadSubpackage() {
        cc.log(`updateGame : ${this.curGame.subpackageName}`);
        let me = this;
        //加载子包
        let versionInfo = HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName];
        cc.assetManager.loadBundle(versionInfo.subpackageName, (err, bundle) => {
            me.isLoading = false;
            //Manager.loading.hide();
            if (err) {
                cc.error(`load subpackage : ${versionInfo.subpackageName} fail !!!`);
                //Manager.toast.show(`加载${versionInfo.subpackageName}失败!`);
                versionInfo.isLoaded = false;
            }
            else {
                cc.log(`load subpackage : ${versionInfo.subpackageName} success !!!`);
                versionInfo.isLoaded = true;
                me.onGameReady();
            }
        });
    }
    onDownload(downloadedBytes, totalBytes, downloadedFiles, totalFiles, percent, percentByFile, code, state, needRestart) {
        if (CC_DEBUG)
            cc.log(`
downloadedBytes : ${downloadedBytes}
totalBytes : ${totalBytes}
downloadedFiles : ${downloadedFiles}
totalFiles : ${totalFiles}
percent : ${percent}
percentByFile : ${percentByFile}
code : ${code}
state : ${state}
needRestart : ${needRestart}
`);
        let newPercent = 0;
        /**
         *  @description 找不到本地mainfest文件
      ERROR_NO_LOCAL_MANIFEST,
      @description 下载manifest文件错误
      ERROR_DOWNLOAD_MANIFEST,
      /**@description 解析manifest文件错误
      ERROR_PARSE_MANIFEST,
      /**@description 找到新版本
      NEW_VERSION_FOUND,
      /**@description 当前已经是最新版本
      ALREADY_UP_TO_DATE,
      /**@description 更新下载进度中
      UPDATE_PROGRESSION,
      /**@description 资源更新中
      ASSET_UPDATED,
      /**@description 更新错误
      ERROR_UPDATING,
      /**@description 更新完成
      UPDATE_FINISHED,
      /**@description 更新失败
      UPDATE_FAILED,
      /**@description 解压资源失败
      ERROR_DECOMPRESS,
         */
        let gameConfig = HotUpdate_1.HotUpdate.getGameLocalName(this.curGame.subpackageName);
        if (code == HotUpdate_1.AssetManagerCode.UPDATE_PROGRESSION) {
            newPercent = percentByFile == Number.NaN ? 0 : percentByFile;
            let failePercent = Manager_1.Manager.localStorage.getItem(gameConfig.gameName + "HotUpdateFailePercent");
            if (failePercent && failePercent > newPercent) {
                newPercent = failePercent;
            }
            dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
        }
        else if (code == HotUpdate_1.AssetManagerCode.ALREADY_UP_TO_DATE) {
            newPercent = 1;
            dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
        }
        else if (code == HotUpdate_1.AssetManagerCode.UPDATE_FINISHED) {
            newPercent = 1.1;
            cc.log(`更新${gameConfig.gameName}成功`);
            if (!needRestart) {
                //不需要重启//直接加载子游戏进入
                // cc.log(`正在加载${gameConfig.gameName}`);
                // this.loadSubpackage(); // 更新完了不进游戏
            }
            this.isLoading = false;
            this.updateFailedNum = 0;
            Manager_1.Manager.localStorage.setItem(gameConfig.gameName + "HotUpdateFailePercent", 0);
            setTimeout(() => {
                dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
            }, 500);
        }
        else if (code == HotUpdate_1.AssetManagerCode.UPDATE_FAILED ||
            code == HotUpdate_1.AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
            code == HotUpdate_1.AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
            code == HotUpdate_1.AssetManagerCode.ERROR_PARSE_MANIFEST ||
            code == HotUpdate_1.AssetManagerCode.ERROR_DECOMPRESS) {
            let failePercent = Manager_1.Manager.localStorage.getItem(gameConfig.gameName + "HotUpdateFailePercent");
            if (!failePercent) {
                Manager_1.Manager.localStorage.setItem(gameConfig.gameName + "HotUpdateFailePercent", percent);
            }
            this.updateFailedNum++;
            if (this.updateFailedNum < 4) { //失败后自动更新
                let versionInfo = HotUpdate_1.HotUpdate.allGameConfig[this.curGame.subpackageName];
                this.checkUpdate(versionInfo);
            }
            else {
                newPercent = -1;
                this.isLoading = false;
                cc.error(`更新${gameConfig.gameName}失败`);
                dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
            }
        }
    }
}
GameManager._instance = null;

cc._RF.pop();