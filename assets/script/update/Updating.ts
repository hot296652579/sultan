import { AssetManagerCode, AssetManagerState, HotUpdate } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { LobbyService } from "../common/net/LobbyService";
import { RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { reStartGame } from "../global/Global";
import { HallEvent } from "../hall/HallEvent";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Updating extends UIView {

   @property(cc.Label)
   progressLabel: cc.Label = null;

   @property(cc.ProgressBar)
   progressBar: cc.ProgressBar = null;

   private updateFailedNum = 0;

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
      this.registerEvent(HallEvent.DOWNLOAD_PROGRESS, this.onDownloadProgess);
   }

   private onDownloadProgess(data: { progress: number }) {
      if (cc.isValid(this.node)) {
         if (data.progress == -1) {
            this.progressBar.node.active = false;
            PanelHelp.showMsgBox("", i18n.TIPS.DOWNLOADFAILED, () => {
               this.checkUpdate()
            })
         } else if (data.progress <= 1) {
            this.progressBar.node.active = true;
            if (data.progress > this.progressBar.progress ) {
               this.progressBar.progress = data.progress;
               this.progressLabel.string = "" + Math.floor(data.progress * 100) + "%";
            }
         } else {
            this.progressBar.node.active = false;
         }
      }
   }

   async start() {
      
      if (!Config.isOpenHotUpdate) {
         this.hide();
         dispatch(LogicEvent.ENTER_LOGIN);
         return;
      }
      
      PanelHelp.hideLoading();
      
      if (cc.sys.os === cc.sys.OS_ANDROID && cc.sys.isNative) {
         let version = window['platformUtil'].getVersionName();
         if (version &&  G.URLMgr.apkVersion) {//强制更新apk 小于服务器版本才更新
            if (this.compareVersion(version) < 0) {
               PanelHelp.showMsgBox('', i18n.TIPS.VERSIONUPDATE, () => {
                  cc.sys.openURL(G.URLMgr.apkURL)
               }, i18n.TIPS.UPDATE, false, false)
            }else{
               this.checkUpdate()
            }
         } else {
            this.checkUpdate()
         }
      } else {
         this.checkUpdate()
      }
   }
   private compareVersion(version){
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
      HotUpdate.checkHallUpdate((code, state) => {
         G.Logger.log('checkHallUpdate = ', code);

         if (code == AssetManagerCode.NEW_VERSION_FOUND) {
            //有新版本
            HotUpdate.onDownload = this.onDownload.bind(this);
            cc.log(`检测到有新的版本`);
            HotUpdate.hotUpdate();
            this.progressBar.node.active = true;
         } else if (state == AssetManagerState.TRY_DOWNLOAD_FAILED_ASSETS) {
            //尝试重新下载之前下载失败的文件
            HotUpdate.onDownload = this.onDownload.bind(this);
            cc.log(`正在尝试重新下载之前下载失败的资源`);
            HotUpdate.downloadFailedAssets();
         } else if (code == AssetManagerCode.UPDATE_FINISHED) {
            //更新完成
            reStartGame()//重启游戏
         }else if (code == AssetManagerCode.ALREADY_UP_TO_DATE) {
            //已经是最新版本
            this.hide();
            dispatch('RefreshVersion')
            PanelHelp.showLoading(i18n.WAIT.LOADING,true)
            dispatch(LogicEvent.ENTER_LOGIN);
         } else if (code == AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
            code == AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
            code == AssetManagerCode.ERROR_PARSE_MANIFEST) {
            //下载manifest文件失败
            // this.isLoading = false;
            let content = "下载版本文件失败!";
            if (code == AssetManagerCode.ERROR_NO_LOCAL_MANIFEST) {
               content = "找不到版本文件!";
            } else if (code == AssetManagerCode.ERROR_PARSE_MANIFEST) {
               content = "版本文件解析错误!";
            }
            //Manager.toast.show(content);
         } else if (code == AssetManagerCode.CHECKING) {
            //当前正在检测更新
            cc.log(`正在检测更新!!`);
         } else {
            // this.isLoading = false;
            cc.log(`检测更新当前状态 code : ${code} state : ${state}`);
         }
      });
   }
   private onDownload(
      downloadedBytes: number,
      totalBytes: number,
      downloadedFiles: number,
      totalFiles: number,
      percent: number,
      percentByFile: number,
      code: AssetManagerCode,
      state: AssetManagerState,
      needRestart: boolean) {
      if (CC_DEBUG) cc.log(`
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

      if (code == AssetManagerCode.UPDATE_PROGRESSION) {
         newPercent = percentByFile == Number.NaN ? 0 : percentByFile;
         //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
         dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent });
      } else if (code == AssetManagerCode.ALREADY_UP_TO_DATE) {
         newPercent = 1;
         dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent });
         //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
      } else if (code == AssetManagerCode.UPDATE_FINISHED) {
         newPercent = 1.1;
         this.updateFailedNum = 0;
         cc.log(`更新成功`);
         setTimeout(()=>{
            dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent});
           },500)
         //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
      } else if (code == AssetManagerCode.UPDATE_FAILED ||
         code == AssetManagerCode.ERROR_NO_LOCAL_MANIFEST ||
         code == AssetManagerCode.ERROR_DOWNLOAD_MANIFEST ||
         code == AssetManagerCode.ERROR_PARSE_MANIFEST ||
         code == AssetManagerCode.ERROR_DECOMPRESS) {
            this.updateFailedNum++
            if (this.updateFailedNum < 4) {//失败后自动更新
               this.checkUpdate()
            }else{
               newPercent = -1;
               //    this.isLoading = false;
                  cc.error(`更新失败`);
                  dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent});
               //    dispatch(HallEvent.DOWNLOAD_PROGRESS, { progress: newPercent, config: gameConfig });
            }
      }
   }
   
   // update (dt) {}
}
