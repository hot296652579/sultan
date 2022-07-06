
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/manager/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL21hbmFnZXIvR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQThEO0FBQzlELG9EQUFpRDtBQUNqRCxpREFBa0g7QUFDbEgsb0RBQWlEO0FBQ2pELHVFQUErQztBQUMvQywyREFBZ0Q7QUFDaEQsdUNBQW9DO0FBRXBDLFNBQWdCLFdBQVc7SUFDeEIsT0FBTyx3QkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCxrQ0FFQztBQUVELE1BQU0sV0FBVztJQUFqQjtRQUVXLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLFlBQU8sR0FBZSxJQUFJLENBQUM7UUFDM0IsY0FBUyxHQUFHLEtBQUssQ0FBQztJQThPN0IsQ0FBQztJQWhQUyxNQUFNLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUkzRjs7O09BR0c7SUFDSSxTQUFTLENBQUMsTUFBa0I7UUFDaEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckIscURBQXFEO1lBQ3JELE9BQU87U0FDVDtRQUNELDJDQUEyQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixJQUFJLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN4RCxxQkFBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztTQUNoRTtRQUVELElBQUksV0FBVyxHQUFHLHFCQUFTLENB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RSxDQUFDLENBQUM7YUFDdEY7U0FFSDtJQUNKLENBQUM7O0FBalBjLHFCQUFTLEdBQWdCLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNpbmdsZXRvbiB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9TaW5nbGV0b25cIjtcbmltcG9ydCB7IExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgSG90VXBkYXRlLCBBc3NldE1hbmFnZXJDb2RlLCBBc3NldE1hbmFnZXJTdGF0ZSwgU3ViR2FtZVVwZGF0ZVR5cGUsIEdhbWVDb25maWcgfSBmcm9tIFwiLi4vYmFzZS9Ib3RVcGRhdGVcIjtcbmltcG9ydCB7IEhhbGxFdmVudCB9IGZyb20gXCIuLi8uLi9oYWxsL0hhbGxFdmVudFwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi9NYW5hZ2VyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lTWFuYWdlcigpIHtcbiAgIHJldHVybiBnZXRTaW5nbGV0b24oR2FtZU1hbmFnZXIpO1xufVxuXG5jbGFzcyBHYW1lTWFuYWdlciB7XG4gICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEdhbWVNYW5hZ2VyID0gbnVsbDtcbiAgIHByaXZhdGUgdXBkYXRlRmFpbGVkTnVtID0gMDtcbiAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgR2FtZU1hbmFnZXIoKSk7IH1cbiAgIHByaXZhdGUgY3VyR2FtZTogR2FtZUNvbmZpZyA9IG51bGw7XG4gICBwcml2YXRlIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gICAvKipcbiAgICAqIOWklumDqOaOpeWPoyDov5vlhaXmuLjmiI9cbiAgICAqIEBwYXJhbSBhcmVhVHlwZVxuICAgICovXG4gICBwdWJsaWMgZW50ZXJHYW1lKGNvbmZpZzogR2FtZUNvbmZpZykgey8v6L+b5YWl5ri45oiP77yI6L6T5YWl5oi/6Ze05Y+377yJXG4gICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgIGNjLmxvZyhcIuato+WcqOabtOaWsOa4uOaIj++8jOivt+eojeetiVwiKTtcbiAgICAgICAgIC8vIFBhbmVsSGVscC5zaG93TXNnQm94KFwiXCIsIGkxOG4uVGlwcy5HYW1lSXNMb2FkaW5nKTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuTE9BRElORylcbiAgICAgIHRoaXMuY3VyR2FtZSA9IGNvbmZpZztcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKCFIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdKSB7XG4gICAgICAgICBIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdID0gY29uZmlnO1xuICAgICAgfVxuXG4gICAgICBsZXQgdmVyc2lvbkluZm8gPSBIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdO1xuICAgICAgaWYgKEhvdFVwZGF0ZS5zdWJHYW1lVXBkYXRlVHlwZSA9PSBTdWJHYW1lVXBkYXRlVHlwZS5Ob3JtYWwpIHtcbiAgICAgICAgIGlmICh2ZXJzaW9uSW5mby5pc0xvYWRlZCkge1xuICAgICAgICAgICAgY2MubG9nKGDmuLjmiI/lt7Lnu4/liqDovb3ov4fkuoZgKTtcbiAgICAgICAgICAgIHRoaXMub25HYW1lUmVhZHkoKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+ajgOa1i+a4uOaIj+eJiOacrOabtOaWsFxuICAgICAgICAgICAgZGlzcGF0Y2goXCJvbkNoZWNrVXBkYXRlR2FtZVN0YXJ0XCIsIHRoaXMuY3VyR2FtZS5zdWJwYWNrYWdlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBkYXRlKHZlcnNpb25JbmZvKTtcbiAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBkaXNwYXRjaChcIm9uQ2hlY2tVcGRhdGVHYW1lU3RhcnRcIiwgdGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lKTtcbiAgICAgICAgIHRoaXMuY2hlY2tVcGRhdGUodmVyc2lvbkluZm8pO1xuICAgICAgfVxuICAgfVxuICAgcHVibGljIGVudGVyR2FtZU5vVXBkYXRlKGNvbmZpZzogR2FtZUNvbmZpZykge1xuICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgICBjYy5sb2coXCLmraPlnKjmm7TmlrDmuLjmiI/vvIzor7fnqI3nrYlcIik7XG4gICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveChcIlwiLCBpMThuLlRpcHMuR2FtZUlzTG9hZGluZylcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuTE9BRElORylcbiAgICAgIHRoaXMuY3VyR2FtZSA9IGNvbmZpZztcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKCFIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdKSB7XG4gICAgICAgICBIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdID0gY29uZmlnO1xuICAgICAgfVxuXG4gICAgICBsZXQgdmVyc2lvbkluZm8gPSBIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdO1xuICAgICAgaWYgKHZlcnNpb25JbmZvLmlzTG9hZGVkKSB7XG4gICAgICAgICBjYy5sb2coYOa4uOaIj+W3sue7j+WKoOi9vei/h+S6hmApO1xuICAgICAgICAgdGhpcy5vbkdhbWVSZWFkeSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIHRoaXMubG9hZFN1YnBhY2thZ2UoKTtcbiAgICAgIH1cblxuICAgfVxuICAgcHJpdmF0ZSBvbkdhbWVSZWFkeSgpIHtcbiAgICAgIGlmICh0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGRpc3BhdGNoKExvZ2ljRXZlbnQuRU5URVJfR0FNRV9SRUFEWSwgdGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lKTtcbiAgIH1cblxuICAgLyoqQGRlc2NyaXB0aW9uIOajgOa1i+WtkOa4uOaIj+abtOaWsCAqL1xuICAgcHJpdmF0ZSBjaGVja1VwZGF0ZSh2ZXJzaW9uSW5mbzogR2FtZUNvbmZpZykge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgY2MubG9nKGDmo4DmtYvmm7TmlrDkv6Hmga86JHt2ZXJzaW9uSW5mby5nYW1lTmFtZX0oJHt2ZXJzaW9uSW5mby5zdWJwYWNrYWdlTmFtZX0pYCk7XG4gICAgICAvLyBkaXNwYXRjaChcIm9uQ2hlY2tVcGRhdGVHYW1lU3RhcnRcIiwgdGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lKTtcbiAgICAgIEhvdFVwZGF0ZS5jaGVja0dhbWVVcGRhdGUodGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lLCAoY29kZSwgc3RhdGUpID0+IHtcbiAgICAgICAgIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuTkVXX1ZFUlNJT05fRk9VTkQpIHtcbiAgICAgICAgICAgIC8v5pyJ5paw54mI5pysXG4gICAgICAgICAgICBIb3RVcGRhdGUub25Eb3dubG9hZCA9IHRoaXMub25Eb3dubG9hZC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgY2MubG9nKGDmo4DmtYvliLAke3ZlcnNpb25JbmZvLmdhbWVOYW1lfSgke3ZlcnNpb25JbmZvLnN1YnBhY2thZ2VOYW1lfSnmnInmlrDnmoTniYjmnKxgKTtcbiAgICAgICAgICAgIEhvdFVwZGF0ZS5ob3RVcGRhdGUoKTtcbiAgICAgICAgICAgIFBhbmVsSGVscC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICBkaXNwYXRjaChcIkNsb3NlSW52aXRlVmlld1wiKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwib25DaGVja1VwZGF0ZUdhbWVFbmRcIiwgdGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lKTtcbiAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gQXNzZXRNYW5hZ2VyU3RhdGUuVFJZX0RPV05MT0FEX0ZBSUxFRF9BU1NFVFMpIHtcbiAgICAgICAgICAgIC8v5bCd6K+V6YeN5paw5LiL6L295LmL5YmN5LiL6L295aSx6LSl55qE5paH5Lu2XG4gICAgICAgICAgICBIb3RVcGRhdGUub25Eb3dubG9hZCA9IHRoaXMub25Eb3dubG9hZC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgY2MubG9nKGDmraPlnKjlsJ3or5Xph43mlrDkuIvovb3kuYvliY3kuIvovb3lpLHotKXnmoTotYTmupBgKTtcbiAgICAgICAgICAgIEhvdFVwZGF0ZS5kb3dubG9hZEZhaWxlZEFzc2V0cygpO1xuICAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuVVBEQVRFX0ZJTklTSEVEKSB7XG4gICAgICAgICAgICAvL+abtOaWsOWujOaIkFxuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBnYW1lQ29uZmlnID0gSG90VXBkYXRlLmdldEdhbWVMb2NhbE5hbWUodGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKEhhbGxFdmVudC5ET1dOTE9BRF9QUk9HUkVTUywgeyBwcm9ncmVzczogMS4xLCBjb25maWc6IGdhbWVDb25maWcgfSk7XG4gICAgICAgICAgICBkaXNwYXRjaChcIm9uQ2hlY2tVcGRhdGVHYW1lRW5kXCIsIHRoaXMuY3VyR2FtZS5zdWJwYWNrYWdlTmFtZSk7XG4gICAgICAgICAgICAvLyBQYW5lbEhlbHAuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuQUxSRUFEWV9VUF9UT19EQVRFKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChcIm9uQ2hlY2tVcGRhdGVHYW1lRW5kXCIsIHRoaXMuY3VyR2FtZS5zdWJwYWNrYWdlTmFtZSk7XG4gICAgICAgICAgICAvL+W3sue7j+aYr+acgOaWsOeJiOacrFxuICAgICAgICAgICAgaWYgKHZlcnNpb25JbmZvLmlzTG9hZGVkKSB7XG4gICAgICAgICAgICAgICBzZWxmLm9uR2FtZVJlYWR5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgc2VsZi5sb2FkU3VicGFja2FnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuRVJST1JfRE9XTkxPQURfTUFOSUZFU1QgfHxcbiAgICAgICAgICAgIGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVCB8fFxuICAgICAgICAgICAgY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX1BBUlNFX01BTklGRVNUKSB7XG4gICAgICAgICAgICAvL+S4i+i9vW1hbmlmZXN05paH5Lu25aSx6LSlXG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBcIuS4i+i9veeJiOacrOaWh+S7tuWksei0pSFcIjtcbiAgICAgICAgICAgIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1QpIHtcbiAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIuaJvuS4jeWIsOeJiOacrOaWh+S7tiFcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX1BBUlNFX01BTklGRVNUKSB7XG4gICAgICAgICAgICAgICBjb250ZW50ID0gXCLniYjmnKzmlofku7bop6PmnpDplJnor68hXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL01hbmFnZXIudG9hc3Quc2hvdyhjb250ZW50KTtcbiAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkNIRUNLSU5HKSB7XG4gICAgICAgICAgICAvL+W9k+WJjeato+WcqOajgOa1i+abtOaWsFxuICAgICAgICAgICAgY2MubG9nKGDmraPlnKjmo4DmtYvmm7TmlrAhIWApO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjYy5sb2coYOajgOa1i+abtOaWsOW9k+WJjeeKtuaAgSBjb2RlIDogJHtjb2RlfSBzdGF0ZSA6ICR7c3RhdGV9YCk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cblxuICAgcHJpdmF0ZSBsb2FkU3VicGFja2FnZSgpIHtcbiAgICAgIGNjLmxvZyhgdXBkYXRlR2FtZSA6ICR7dGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lfWApO1xuICAgICAgbGV0IG1lID0gdGhpcztcbiAgICAgIC8v5Yqg6L295a2Q5YyFXG4gICAgICBsZXQgdmVyc2lvbkluZm8gPSBIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1t0aGlzLmN1ckdhbWUuc3VicGFja2FnZU5hbWVdO1xuICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUodmVyc2lvbkluZm8uc3VicGFja2FnZU5hbWUsIChlcnI6IEVycm9yLCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcbiAgICAgICAgIG1lLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgLy9NYW5hZ2VyLmxvYWRpbmcuaGlkZSgpO1xuICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2MuZXJyb3IoYGxvYWQgc3VicGFja2FnZSA6ICR7dmVyc2lvbkluZm8uc3VicGFja2FnZU5hbWV9IGZhaWwgISEhYCk7XG4gICAgICAgICAgICAvL01hbmFnZXIudG9hc3Quc2hvdyhg5Yqg6L29JHt2ZXJzaW9uSW5mby5zdWJwYWNrYWdlTmFtZX3lpLHotKUhYCk7XG4gICAgICAgICAgICB2ZXJzaW9uSW5mby5pc0xvYWRlZCA9IGZhbHNlO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvZyhgbG9hZCBzdWJwYWNrYWdlIDogJHt2ZXJzaW9uSW5mby5zdWJwYWNrYWdlTmFtZX0gc3VjY2VzcyAhISFgKTtcbiAgICAgICAgICAgIHZlcnNpb25JbmZvLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG1lLm9uR2FtZVJlYWR5KCk7XG4gICAgICAgICB9XG4gICAgICB9KTtcbiAgIH1cbiAgIHByaXZhdGUgb25Eb3dubG9hZChcbiAgICAgIGRvd25sb2FkZWRCeXRlczogbnVtYmVyLFxuICAgICAgdG90YWxCeXRlczogbnVtYmVyLFxuICAgICAgZG93bmxvYWRlZEZpbGVzOiBudW1iZXIsXG4gICAgICB0b3RhbEZpbGVzOiBudW1iZXIsXG4gICAgICBwZXJjZW50OiBudW1iZXIsXG4gICAgICBwZXJjZW50QnlGaWxlOiBudW1iZXIsXG4gICAgICBjb2RlOiBBc3NldE1hbmFnZXJDb2RlLFxuICAgICAgc3RhdGU6IEFzc2V0TWFuYWdlclN0YXRlLFxuICAgICAgbmVlZFJlc3RhcnQ6IGJvb2xlYW4pIHtcbiAgICAgIGlmIChDQ19ERUJVRykgY2MubG9nKGBcbmRvd25sb2FkZWRCeXRlcyA6ICR7ZG93bmxvYWRlZEJ5dGVzfVxudG90YWxCeXRlcyA6ICR7dG90YWxCeXRlc31cbmRvd25sb2FkZWRGaWxlcyA6ICR7ZG93bmxvYWRlZEZpbGVzfVxudG90YWxGaWxlcyA6ICR7dG90YWxGaWxlc31cbnBlcmNlbnQgOiAke3BlcmNlbnR9XG5wZXJjZW50QnlGaWxlIDogJHtwZXJjZW50QnlGaWxlfVxuY29kZSA6ICR7Y29kZX1cbnN0YXRlIDogJHtzdGF0ZX1cbm5lZWRSZXN0YXJ0IDogJHtuZWVkUmVzdGFydH1cbmApO1xuICAgICAgbGV0IG5ld1BlcmNlbnQgPSAwO1xuXG4gICAgICAvKipcbiAgICAgICAqICBAZGVzY3JpcHRpb24g5om+5LiN5Yiw5pys5ZywbWFpbmZlc3Tmlofku7ZcbiAgICBFUlJPUl9OT19MT0NBTF9NQU5JRkVTVCxcbiAgICBAZGVzY3JpcHRpb24g5LiL6L29bWFuaWZlc3Tmlofku7bplJnor68gXG4gICAgRVJST1JfRE9XTkxPQURfTUFOSUZFU1QsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOino+aekG1hbmlmZXN05paH5Lu26ZSZ6K+vIFxuICAgIEVSUk9SX1BBUlNFX01BTklGRVNULFxuICAgIC8qKkBkZXNjcmlwdGlvbiDmib7liLDmlrDniYjmnKwgXG4gICAgTkVXX1ZFUlNJT05fRk9VTkQsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOW9k+WJjeW3sue7j+aYr+acgOaWsOeJiOacrCBcbiAgICBBTFJFQURZX1VQX1RPX0RBVEUsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOS4i+i9vei/m+W6puS4rSBcbiAgICBVUERBVEVfUFJPR1JFU1NJT04sXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi1hOa6kOabtOaWsOS4rSBcbiAgICBBU1NFVF9VUERBVEVELFxuICAgIC8qKkBkZXNjcmlwdGlvbiDmm7TmlrDplJnor68gXG4gICAgRVJST1JfVVBEQVRJTkcsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOWujOaIkCBcbiAgICBVUERBVEVfRklOSVNIRUQsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOWksei0pSBcbiAgICBVUERBVEVfRkFJTEVELFxuICAgIC8qKkBkZXNjcmlwdGlvbiDop6PljovotYTmupDlpLHotKUgXG4gICAgRVJST1JfREVDT01QUkVTUyxcbiAgICAgICAqL1xuXG4gICAgICBsZXQgZ2FtZUNvbmZpZyA9IEhvdFVwZGF0ZS5nZXRHYW1lTG9jYWxOYW1lKHRoaXMuY3VyR2FtZS5zdWJwYWNrYWdlTmFtZSk7XG5cbiAgICAgIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuVVBEQVRFX1BST0dSRVNTSU9OKSB7XG4gICAgICAgICBuZXdQZXJjZW50ID0gcGVyY2VudEJ5RmlsZSA9PSBOdW1iZXIuTmFOID8gMCA6IHBlcmNlbnRCeUZpbGU7XG4gICAgICAgICBsZXQgZmFpbGVQZXJjZW50ID0gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShnYW1lQ29uZmlnLmdhbWVOYW1lICsgXCJIb3RVcGRhdGVGYWlsZVBlcmNlbnRcIilcbiAgICAgICAgIGlmIChmYWlsZVBlcmNlbnQgJiYgZmFpbGVQZXJjZW50ID4gbmV3UGVyY2VudCkge1xuICAgICAgICAgICAgbmV3UGVyY2VudCA9IGZhaWxlUGVyY2VudFxuICAgICAgICAgfVxuICAgICAgICAgZGlzcGF0Y2goSGFsbEV2ZW50LkRPV05MT0FEX1BST0dSRVNTLCB7IHByb2dyZXNzOiBuZXdQZXJjZW50LCBjb25maWc6IGdhbWVDb25maWcgfSk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5BTFJFQURZX1VQX1RPX0RBVEUpIHtcbiAgICAgICAgIG5ld1BlcmNlbnQgPSAxO1xuICAgICAgICAgZGlzcGF0Y2goSGFsbEV2ZW50LkRPV05MT0FEX1BST0dSRVNTLCB7IHByb2dyZXNzOiBuZXdQZXJjZW50LCBjb25maWc6IGdhbWVDb25maWcgfSk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5VUERBVEVfRklOSVNIRUQpIHtcbiAgICAgICAgIG5ld1BlcmNlbnQgPSAxLjE7XG4gICAgICAgICBjYy5sb2coYOabtOaWsCR7Z2FtZUNvbmZpZy5nYW1lTmFtZX3miJDlip9gKTtcbiAgICAgICAgIGlmICghbmVlZFJlc3RhcnQpIHtcbiAgICAgICAgICAgIC8v5LiN6ZyA6KaB6YeN5ZCvLy/nm7TmjqXliqDovb3lrZDmuLjmiI/ov5vlhaVcbiAgICAgICAgICAgIC8vIGNjLmxvZyhg5q2j5Zyo5Yqg6L29JHtnYW1lQ29uZmlnLmdhbWVOYW1lfWApO1xuICAgICAgICAgICAgLy8gdGhpcy5sb2FkU3VicGFja2FnZSgpOyAvLyDmm7TmlrDlrozkuobkuI3ov5vmuLjmiI9cbiAgICAgICAgIH1cbiAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICB0aGlzLnVwZGF0ZUZhaWxlZE51bSA9IDA7XG4gICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGdhbWVDb25maWcuZ2FtZU5hbWUgKyBcIkhvdFVwZGF0ZUZhaWxlUGVyY2VudFwiLCAwKVxuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQsIGNvbmZpZzogZ2FtZUNvbmZpZyB9KTtcbiAgICAgICAgIH0sIDUwMClcblxuICAgICAgfSBlbHNlIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuVVBEQVRFX0ZBSUxFRCB8fFxuICAgICAgICAgY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX05PX0xPQ0FMX01BTklGRVNUIHx8XG4gICAgICAgICBjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuRVJST1JfRE9XTkxPQURfTUFOSUZFU1QgfHxcbiAgICAgICAgIGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9QQVJTRV9NQU5JRkVTVCB8fFxuICAgICAgICAgY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX0RFQ09NUFJFU1MpIHtcblxuICAgICAgICAgbGV0IGZhaWxlUGVyY2VudCA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2FtZUNvbmZpZy5nYW1lTmFtZSArIFwiSG90VXBkYXRlRmFpbGVQZXJjZW50XCIpXG4gICAgICAgICBpZiAoIWZhaWxlUGVyY2VudCkge1xuICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShnYW1lQ29uZmlnLmdhbWVOYW1lICsgXCJIb3RVcGRhdGVGYWlsZVBlcmNlbnRcIiwgcGVyY2VudClcbiAgICAgICAgIH1cbiAgICAgICAgIHRoaXMudXBkYXRlRmFpbGVkTnVtKytcbiAgICAgICAgIGlmICh0aGlzLnVwZGF0ZUZhaWxlZE51bSA8IDQpIHsvL+Wksei0peWQjuiHquWKqOabtOaWsFxuICAgICAgICAgICAgbGV0IHZlcnNpb25JbmZvID0gSG90VXBkYXRlLmFsbEdhbWVDb25maWdbdGhpcy5jdXJHYW1lLnN1YnBhY2thZ2VOYW1lXTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVcGRhdGUodmVyc2lvbkluZm8pXG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3UGVyY2VudCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNjLmVycm9yKGDmm7TmlrAke2dhbWVDb25maWcuZ2FtZU5hbWV95aSx6LSlYCk7XG4gICAgICAgICAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQsIGNvbmZpZzogZ2FtZUNvbmZpZyB9KTtcbiAgICAgICAgIH1cblxuICAgICAgfVxuICAgfVxufVxuIl19