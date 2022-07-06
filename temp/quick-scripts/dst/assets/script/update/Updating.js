
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/update/Updating.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7d82Qwlu9AvLHVfyR9jjRa', 'Updating');
// script/update/Updating.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HotUpdate_1 = require("../common/base/HotUpdate");
const Config_1 = require("../common/config/Config");
const LogicEvent_1 = require("../common/event/LogicEvent");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const Global_1 = require("../global/Global");
const HallEvent_1 = require("../hall/HallEvent");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let Updating = class Updating extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.progressLabel = null;
        this.progressBar = null;
        this.updateFailedNum = 0;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        super.onLoad();
        this.className = "Updating";
        this.progressLabel.string = "";
        this.progressBar.progress = 0;
        this.progressBar.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, this.onDownloadProgess);
    }
    onDownloadProgess(data) {
        if (cc.isValid(this.node)) {
            if (data.progress == -1) {
                this.progressBar.node.active = false;
                PanelHelp_1.default.showMsgBox("", LanguageImpl_1.i18n.TIPS.DOWNLOADFAILED, () => {
                    this.checkUpdate();
                });
            }
            else if (data.progress <= 1) {
                this.progressBar.node.active = true;
                if (data.progress > this.progressBar.progress) {
                    this.progressBar.progress = data.progress;
                    this.progressLabel.string = "" + Math.floor(data.progress * 100) + "%";
                }
            }
            else {
                this.progressBar.node.active = false;
            }
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Config_1.Config.isOpenHotUpdate) {
                this.hide();
                dispatch(LogicEvent_1.LogicEvent.ENTER_LOGIN);
                return;
            }
            PanelHelp_1.default.hideLoading();
            if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.isNative) {
                let version = window['platformUtil'].getVersionName();
                if (version && G.URLMgr.apkVersion) { //强制更新apk 小于服务器版本才更新
                    if (this.compareVersion(version) < 0) {
                        PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.TIPS.VERSIONUPDATE, () => {
                            cc.sys.openURL(G.URLMgr.apkURL);
                        }, LanguageImpl_1.i18n.TIPS.UPDATE, false, false);
                    }
                    else {
                        this.checkUpdate();
                    }
                }
                else {
                    this.checkUpdate();
                }
            }
            else {
                this.checkUpdate();
            }
        });
    }
    compareVersion(version) {
        let vA = version.split('.');
        let vB = G.URLMgr.apkVersion.split('.');
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
            return -1;
        }
        return 0;
    }
    checkUpdate() {
        HotUpdate_1.HotUpdate.checkHallUpdate((code, state) => {
            G.Logger.log('checkHallUpdate = ', code);
            if (code == HotUpdate_1.AssetManagerCode.NEW_VERSION_FOUND) {
                //有新版本
                HotUpdate_1.HotUpdate.onDownload = this.onDownload.bind(this);
                cc.log(`检测到有新的版本`);
                HotUpdate_1.HotUpdate.hotUpdate();
                this.progressBar.node.active = true;
            }
            else if (state == HotUpdate_1.AssetManagerState.TRY_DOWNLOAD_FAILED_ASSETS) {
                //尝试重新下载之前下载失败的文件
                HotUpdate_1.HotUpdate.onDownload = this.onDownload.bind(this);
                cc.log(`正在尝试重新下载之前下载失败的资源`);
                HotUpdate_1.HotUpdate.downloadFailedAssets();
            }
            else if (code == HotUpdate_1.AssetManagerCode.UPDATE_FINISHED) {
                //更新完成
                Global_1.reStartGame(); //重启游戏
            }
            else if (code == HotUpdate_1.AssetManagerCode.ALREADY_UP_TO_DATE) {
                //已经是最新版本
                this.hide();
                dispatch('RefreshVersion');
                PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOADING, true);
                dispatch(LogicEvent_1.LogicEvent.ENTER_LOGIN);
            }
            else if (code == HotUpdate_1.AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
                code == HotUpdate_1.AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
                code == HotUpdate_1.AssetManagerCode.ERROR_PARSE_MANIFEST) {
                //下载manifest文件失败
                // this.isLoading = false;
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
                // this.isLoading = false;
                cc.log(`检测更新当前状态 code : ${code} state : ${state}`);
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
        if (code == HotUpdate_1.AssetManagerCode.UPDATE_PROGRESSION) {
            newPercent = percentByFile == Number.NaN ? 0 : percentByFile;
            //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
            dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent });
        }
        else if (code == HotUpdate_1.AssetManagerCode.ALREADY_UP_TO_DATE) {
            newPercent = 1;
            dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent });
            //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
        }
        else if (code == HotUpdate_1.AssetManagerCode.UPDATE_FINISHED) {
            newPercent = 1.1;
            this.updateFailedNum = 0;
            cc.log(`更新成功`);
            setTimeout(() => {
                dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent });
            }, 500);
            //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
        }
        else if (code == HotUpdate_1.AssetManagerCode.UPDATE_FAILED ||
            code == HotUpdate_1.AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
            code == HotUpdate_1.AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
            code == HotUpdate_1.AssetManagerCode.ERROR_PARSE_MANIFEST ||
            code == HotUpdate_1.AssetManagerCode.ERROR_DECOMPRESS) {
            this.updateFailedNum++;
            if (this.updateFailedNum < 4) { //失败后自动更新
                this.checkUpdate();
            }
            else {
                newPercent = -1;
                //    this.isLoading = false;
                cc.error(`更新失败`);
                dispatch(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent });
                //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
            }
        }
    }
};
__decorate([
    property(cc.Label)
], Updating.prototype, "progressLabel", void 0);
__decorate([
    property(cc.ProgressBar)
], Updating.prototype, "progressBar", void 0);
Updating = __decorate([
    ccclass
], Updating);
exports.default = Updating;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdXBkYXRlL1VwZGF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQTBGO0FBQzFGLG9EQUFpRDtBQUNqRCwyREFBMEY7QUFDMUYsa0VBQXVEO0FBR3ZELG9FQUE0QztBQUM1Qyw2Q0FBK0M7QUFDL0MsaURBQThDO0FBQzlDLG9FQUE0QztBQUU1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsZ0JBQU07SUFBNUM7O1FBR0csa0JBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZ0JBQVcsR0FBbUIsSUFBSSxDQUFDO1FBRTNCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBZ041QixpQkFBaUI7SUFDcEIsQ0FBQztJQS9NRSx3QkFBd0I7SUFFeEIsTUFBTTtRQUNILEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0lBQ0QsYUFBYTtRQUNWLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFTLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVPLGlCQUFpQixDQUFDLElBQTBCO1FBQ2pELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIs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R0FBRSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxxQkFBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ1IsMEZBQTBGO1NBQzVGO2FBQU0sSUFBSSxJQUFJLElBQUksNEJBQWdCLENBQUMsYUFBYTtZQUM5QyxJQUFJLElBQUksNEJBQWdCLENBQUMsdUJBQXVCO1lBQ2hELElBQUksSUFBSSw0QkFBZ0IsQ0FBQyx1QkFBdUI7WUFDaEQsSUFBSSxJQUFJLDRCQUFnQixDQUFDLG9CQUFvQjtZQUM3QyxJQUFJLElBQUksNEJBQWdCLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1lBQ3RCLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEVBQUUsRUFBQyxTQUFTO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7YUFDcEI7aUJBQUk7Z0JBQ0YsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQiw2QkFBNkI7Z0JBQzFCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pCLFFBQVEsQ0FBQyxxQkFBUyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7Z0JBQ2xFLDBGQUEwRjthQUM1RjtTQUNOO0lBQ0osQ0FBQztDQUdILENBQUE7QUF0TkU7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDWTtBQUcvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzZDQUNVO0FBTmpCLFFBQVE7SUFENUIsT0FBTztHQUNhLFFBQVEsQ0F5TjVCO2tCQXpOb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFzc2V0TWFuYWdlckNvZGUsIEFzc2V0TWFuYWdlclN0YXRlLCBIb3RVcGRhdGUgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGRpc3BhdGNoRW50ZXJDb21wbGV0ZSwgTG9naWNFdmVudCwgTG9naWNUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgUmVxdWVzdFBhY2tnZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBDbGllbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IHJlU3RhcnRHYW1lIH0gZnJvbSBcIi4uL2dsb2JhbC9HbG9iYWxcIjtcbmltcG9ydCB7IEhhbGxFdmVudCB9IGZyb20gXCIuLi9oYWxsL0hhbGxFdmVudFwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBkYXRpbmcgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICBwcm9ncmVzc0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgIHByb2dyZXNzQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgIHByaXZhdGUgdXBkYXRlRmFpbGVkTnVtID0gMDtcblxuICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgIG9uTG9hZCgpIHtcbiAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgdGhpcy5jbGFzc05hbWUgPSBcIlVwZGF0aW5nXCI7XG4gICAgICB0aGlzLnByb2dyZXNzTGFiZWwuc3RyaW5nID0gXCJcIjtcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgfVxuICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHRoaXMub25Eb3dubG9hZFByb2dlc3MpO1xuICAgfVxuXG4gICBwcml2YXRlIG9uRG93bmxvYWRQcm9nZXNzKGRhdGE6IHsgcHJvZ3Jlc3M6IG51bWJlciB9KSB7XG4gICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XG4gICAgICAgICBpZiAoZGF0YS5wcm9ncmVzcyA9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goXCJcIiwgaTE4bi5USVBTLkRPV05MT0FERkFJTEVELCAoKSA9PiB7XG4gICAgICAgICAgICAgICB0aGlzLmNoZWNrVXBkYXRlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICB9IGVsc2UgaWYgKGRhdGEucHJvZ3Jlc3MgPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZGF0YS5wcm9ncmVzcyA+IHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgKSB7XG4gICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSBcIlwiICsgTWF0aC5mbG9vcihkYXRhLnByb2dyZXNzICogMTAwKSArIFwiJVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cblxuICAgYXN5bmMgc3RhcnQoKSB7XG4gICAgICBcbiAgICAgIGlmICghQ29uZmlnLmlzT3BlbkhvdFVwZGF0ZSkge1xuICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0xPR0lOKTtcbiAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKCk7XG4gICAgICBcbiAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEICYmIGNjLnN5cy5pc05hdGl2ZSkge1xuICAgICAgICAgbGV0IHZlcnNpb24gPSB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmdldFZlcnNpb25OYW1lKCk7XG4gICAgICAgICBpZiAodmVyc2lvbiAmJiAgRy5VUkxNZ3IuYXBrVmVyc2lvbikgey8v5by65Yi25pu05pawYXBrIOWwj+S6juacjeWKoeWZqOeJiOacrOaJjeabtOaWsFxuICAgICAgICAgICAgaWYgKHRoaXMuY29tcGFyZVZlcnNpb24odmVyc2lvbikgPCAwKSB7XG4gICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgaTE4bi5USVBTLlZFUlNJT05VUERBVEUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEcuVVJMTWdyLmFwa1VSTClcbiAgICAgICAgICAgICAgIH0sIGkxOG4uVElQUy5VUERBVEUsIGZhbHNlLCBmYWxzZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpXG4gICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpXG4gICAgICB9XG4gICB9XG4gICBwcml2YXRlIGNvbXBhcmVWZXJzaW9uKHZlcnNpb24pe1xuICAgICAgbGV0IHZBID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuICAgICAgbGV0IHZCID0gRy5VUkxNZ3IuYXBrVmVyc2lvbi5zcGxpdCgnLicpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2QS5sZW5ndGggJiYgaSA8IHZCLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICBsZXQgYSA9IHBhcnNlSW50KHZBW2ldKTtcbiAgICAgICAgIGxldCBiID0gcGFyc2VJbnQodkJbaV0pO1xuICAgICAgICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgIH1cbiAgICAgfVxuICAgICBpZiAodkIubGVuZ3RoID4gdkEubGVuZ3RoKSB7XG4gICAgICAgICByZXR1cm4gLTE7XG4gICAgIH1cbiAgICAgcmV0dXJuIDA7XG4gICB9XG5cbiAgIGNoZWNrVXBkYXRlKCkge1xuICAgICAgSG90VXBkYXRlLmNoZWNrSGFsbFVwZGF0ZSgoY29kZSwgc3RhdGUpID0+IHtcbiAgICAgICAgIEcuTG9nZ2VyLmxvZygnY2hlY2tIYWxsVXBkYXRlID0gJywgY29kZSk7XG5cbiAgICAgICAgIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuTkVXX1ZFUlNJT05fRk9VTkQpIHtcbiAgICAgICAgICAgIC8v5pyJ5paw54mI5pysXG4gICAgICAgICAgICBIb3RVcGRhdGUub25Eb3dubG9hZCA9IHRoaXMub25Eb3dubG9hZC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgY2MubG9nKGDmo4DmtYvliLDmnInmlrDnmoTniYjmnKxgKTtcbiAgICAgICAgICAgIEhvdFVwZGF0ZS5ob3RVcGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSBBc3NldE1hbmFnZXJTdGF0ZS5UUllfRE9XTkxPQURfRkFJTEVEX0FTU0VUUykge1xuICAgICAgICAgICAgLy/lsJ3or5Xph43mlrDkuIvovb3kuYvliY3kuIvovb3lpLHotKXnmoTmlofku7ZcbiAgICAgICAgICAgIEhvdFVwZGF0ZS5vbkRvd25sb2FkID0gdGhpcy5vbkRvd25sb2FkLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBjYy5sb2coYOato+WcqOWwneivlemHjeaWsOS4i+i9veS5i+WJjeS4i+i9veWksei0peeahOi1hOa6kGApO1xuICAgICAgICAgICAgSG90VXBkYXRlLmRvd25sb2FkRmFpbGVkQXNzZXRzKCk7XG4gICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5VUERBVEVfRklOSVNIRUQpIHtcbiAgICAgICAgICAgIC8v5pu05paw5a6M5oiQXG4gICAgICAgICAgICByZVN0YXJ0R2FtZSgpLy/ph43lkK/muLjmiI9cbiAgICAgICAgIH1lbHNlIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuQUxSRUFEWV9VUF9UT19EQVRFKSB7XG4gICAgICAgICAgICAvL+W3sue7j+aYr+acgOaWsOeJiOacrFxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICBkaXNwYXRjaCgnUmVmcmVzaFZlcnNpb24nKVxuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dMb2FkaW5nKGkxOG4uV0FJVC5MT0FESU5HLHRydWUpXG4gICAgICAgICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0xPR0lOKTtcbiAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX0RPV05MT0FEX01BTklGRVNUIHx8XG4gICAgICAgICAgICBjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuRVJST1JfTk9fTE9DQUxfTUFOSUZFU1QgfHxcbiAgICAgICAgICAgIGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9QQVJTRV9NQU5JRkVTVCkge1xuICAgICAgICAgICAgLy/kuIvovb1tYW5pZmVzdOaWh+S7tuWksei0pVxuICAgICAgICAgICAgLy8gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gXCLkuIvovb3niYjmnKzmlofku7blpLHotKUhXCI7XG4gICAgICAgICAgICBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX05PX0xPQ0FMX01BTklGRVNUKSB7XG4gICAgICAgICAgICAgICBjb250ZW50ID0gXCLmib7kuI3liLDniYjmnKzmlofku7YhXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9QQVJTRV9NQU5JRkVTVCkge1xuICAgICAgICAgICAgICAgY29udGVudCA9IFwi54mI5pys5paH5Lu26Kej5p6Q6ZSZ6K+vIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9NYW5hZ2VyLnRvYXN0LnNob3coY29udGVudCk7XG4gICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5DSEVDS0lORykge1xuICAgICAgICAgICAgLy/lvZPliY3mraPlnKjmo4DmtYvmm7TmlrBcbiAgICAgICAgICAgIGNjLmxvZyhg5q2j5Zyo5qOA5rWL5pu05pawISFgKTtcbiAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY2MubG9nKGDmo4DmtYvmm7TmlrDlvZPliY3nirbmgIEgY29kZSA6ICR7Y29kZX0gc3RhdGUgOiAke3N0YXRlfWApO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9XG4gICBwcml2YXRlIG9uRG93bmxvYWQoXG4gICAgICBkb3dubG9hZGVkQnl0ZXM6IG51bWJlcixcbiAgICAgIHRvdGFsQnl0ZXM6IG51bWJlcixcbiAgICAgIGRvd25sb2FkZWRGaWxlczogbnVtYmVyLFxuICAgICAgdG90YWxGaWxlczogbnVtYmVyLFxuICAgICAgcGVyY2VudDogbnVtYmVyLFxuICAgICAgcGVyY2VudEJ5RmlsZTogbnVtYmVyLFxuICAgICAgY29kZTogQXNzZXRNYW5hZ2VyQ29kZSxcbiAgICAgIHN0YXRlOiBBc3NldE1hbmFnZXJTdGF0ZSxcbiAgICAgIG5lZWRSZXN0YXJ0OiBib29sZWFuKSB7XG4gICAgICBpZiAoQ0NfREVCVUcpIGNjLmxvZyhgXG4gICAgICAgICAgICAgICAgZG93bmxvYWRlZEJ5dGVzIDogJHtkb3dubG9hZGVkQnl0ZXN9XG4gICAgICAgICAgICAgICAgdG90YWxCeXRlcyA6ICR7dG90YWxCeXRlc31cbiAgICAgICAgICAgICAgICBkb3dubG9hZGVkRmlsZXMgOiAke2Rvd25sb2FkZWRGaWxlc31cbiAgICAgICAgICAgICAgICB0b3RhbEZpbGVzIDogJHt0b3RhbEZpbGVzfVxuICAgICAgICAgICAgICAgIHBlcmNlbnQgOiAke3BlcmNlbnR9XG4gICAgICAgICAgICAgICAgcGVyY2VudEJ5RmlsZSA6ICR7cGVyY2VudEJ5RmlsZX1cbiAgICAgICAgICAgICAgICBjb2RlIDogJHtjb2RlfVxuICAgICAgICAgICAgICAgIHN0YXRlIDogJHtzdGF0ZX1cbiAgICAgICAgICAgICAgICBuZWVkUmVzdGFydCA6ICR7bmVlZFJlc3RhcnR9XG4gICAgICAgICAgICAgICAgYCk7XG4gICAgICBsZXQgbmV3UGVyY2VudCA9IDA7XG5cbiAgICAgIC8qKlxuICAgICAgICogIEBkZXNjcmlwdGlvbiDmib7kuI3liLDmnKzlnLBtYWluZmVzdOaWh+S7tlxuICAgICAgRVJST1JfTk9fTE9DQUxfTUFOSUZFU1QsXG4gICAgICBAZGVzY3JpcHRpb24g5LiL6L29bWFuaWZlc3Tmlofku7bplJnor68gXG4gICAgICBFUlJPUl9ET1dOTE9BRF9NQU5JRkVTVCxcbiAgICAgIC8qKkBkZXNjcmlwdGlvbiDop6PmnpBtYW5pZmVzdOaWh+S7tumUmeivryBcbiAgICAgICBFUlJPUl9QQVJTRV9NQU5JRkVTVCxcbiAgICAgIC8qKkBkZXNjcmlwdGlvbiDmib7liLDmlrDniYjmnKwgXG4gICAgICAgTkVXX1ZFUlNJT05fRk9VTkQsXG4gICAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN5bey57uP5piv5pyA5paw54mI5pysIFxuICAgICAgIEFMUkVBRFlfVVBfVE9fREFURSxcbiAgICAgIC8qKkBkZXNjcmlwdGlvbiDmm7TmlrDkuIvovb3ov5vluqbkuK0gXG4gICAgICAgVVBEQVRFX1BST0dSRVNTSU9OLFxuICAgICAgLyoqQGRlc2NyaXB0aW9uIOi1hOa6kOabtOaWsOS4rSBcbiAgICAgICBBU1NFVF9VUERBVEVELFxuICAgICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOmUmeivryBcbiAgICAgICBFUlJPUl9VUERBVElORyxcbiAgICAgIC8qKkBkZXNjcmlwdGlvbiDmm7TmlrDlrozmiJAgXG4gICAgICAgVVBEQVRFX0ZJTklTSEVELFxuICAgICAgLyoqQGRlc2NyaXB0aW9uIOabtOaWsOWksei0pSBcbiAgICAgICBVUERBVEVfRkFJTEVELFxuICAgICAgLyoqQGRlc2NyaXB0aW9uIOino+WOi+i1hOa6kOWksei0pSBcbiAgICAgICBFUlJPUl9ERUNPTVBSRVNTLFxuICAgICAgICovXG5cbiAgICAgIGlmIChjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuVVBEQVRFX1BST0dSRVNTSU9OKSB7XG4gICAgICAgICBuZXdQZXJjZW50ID0gcGVyY2VudEJ5RmlsZSA9PSBOdW1iZXIuTmFOID8gMCA6IHBlcmNlbnRCeUZpbGU7XG4gICAgICAgICAvLyAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQsIGNvbmZpZzogZ2FtZUNvbmZpZyB9KTtcbiAgICAgICAgIGRpc3BhdGNoKEhhbGxFdmVudC5ET1dOTE9BRF9QUk9HUkVTUywgeyBwcm9ncmVzczogbmV3UGVyY2VudCB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkFMUkVBRFlfVVBfVE9fREFURSkge1xuICAgICAgICAgbmV3UGVyY2VudCA9IDE7XG4gICAgICAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQgfSk7XG4gICAgICAgICAvLyAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQsIGNvbmZpZzogZ2FtZUNvbmZpZyB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLlVQREFURV9GSU5JU0hFRCkge1xuICAgICAgICAgbmV3UGVyY2VudCA9IDEuMTtcbiAgICAgICAgIHRoaXMudXBkYXRlRmFpbGVkTnVtID0gMDtcbiAgICAgICAgIGNjLmxvZyhg5pu05paw5oiQ5YqfYCk7XG4gICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnR9KTtcbiAgICAgICAgICAgfSw1MDApXG4gICAgICAgICAvLyAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQsIGNvbmZpZzogZ2FtZUNvbmZpZyB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLlVQREFURV9GQUlMRUQgfHxcbiAgICAgICAgIGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9OT19MT0NBTF9NQU5JRkVTVCB8fFxuICAgICAgICAgY29kZSA9PSBBc3NldE1hbmFnZXJDb2RlLkVSUk9SX0RPV05MT0FEX01BTklGRVNUIHx8XG4gICAgICAgICBjb2RlID09IEFzc2V0TWFuYWdlckNvZGUuRVJST1JfUEFSU0VfTUFOSUZFU1QgfHxcbiAgICAgICAgIGNvZGUgPT0gQXNzZXRNYW5hZ2VyQ29kZS5FUlJPUl9ERUNPTVBSRVNTKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZhaWxlZE51bSsrXG4gICAgICAgICAgICBpZiAodGhpcy51cGRhdGVGYWlsZWROdW0gPCA0KSB7Ly/lpLHotKXlkI7oh6rliqjmm7TmlrBcbiAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVcGRhdGUoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICBuZXdQZXJjZW50ID0gLTE7XG4gICAgICAgICAgICAgICAvLyAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoYOabtOaWsOWksei0pWApO1xuICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goSGFsbEV2ZW50LkRPV05MT0FEX1BST0dSRVNTLCB7IHByb2dyZXNzOiBuZXdQZXJjZW50fSk7XG4gICAgICAgICAgICAgICAvLyAgICBkaXNwYXRjaChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHsgcHJvZ3Jlc3M6IG5ld1BlcmNlbnQsIGNvbmZpZzogZ2FtZUNvbmZpZyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cbiAgIFxuICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==