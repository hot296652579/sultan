"use strict";
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