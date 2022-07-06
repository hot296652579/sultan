
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallNewGameItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '55a92hZ1ahJuZHMUFFvB6CX', 'HallNewGameItem');
// script/hall/HallNewGameItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("../common/manager/GameManager");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const HotUpdate_1 = require("../common/base/HotUpdate");
const Defines_1 = require("../framework/base/Defines");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const Config_1 = require("../common/config/Config");
const HallEvent_1 = require("./HallEvent");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const Manager_1 = require("../common/manager/Manager");
const UtilMgr_1 = require("../global/UtilMgr");
const Global_1 = require("../global/Global");
const protoc_1 = require("../framework/external/protoc");
const { ccclass, property } = cc._decorator;
let HallNewGameItem = class HallNewGameItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon = null;
        this.gameIcon = null;
        this.gameSpine = null;
        this.gameLabel = null;
        this.picName = null;
        this.install = null;
        this.newVersion = null;
        this.loading = null;
        this.iconWait = null;
        this._itemId = 0;
        // _sortId = 0
        this._gameInfo = null;
        this._path = "hall/images/dt_game_icon_";
        this._pathEN = "hall/images/dt_game_name_";
        this._pathHI = "languageRes/hindi/hall/dt_game_name_";
        this._language = '';
    }
    onLoad() {
        super.onLoad();
        cc.tween(this.iconWait)
            .repeatForever(cc.tween().by(0.3, { angle: 30 })
            .delay(0.01))
            .start();
        this.loading.active = false;
        this._language = Manager_1.Manager.language.getLanguage();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(HallEvent_1.HallEvent.DOWNLOAD_PROGRESS, this.onDownloadProgess);
        this.registerEvent("onCheckUpdateGameStart", this.onCheckUpdateGameStart);
        this.registerEvent("onCheckUpdateGameEnd", this.onCheckUpdateGameEnd);
        this.registerEvent('M2C_TransferMap_Res', this.M2C_TransferMap_Res);
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            // this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onCheckUpdateGameStart(gameName) {
        let games = Config_1.Config.games;
        if (this._gameInfo) {
            let configGName = this._gameInfo;
            let game = games[configGName];
            if (game) {
                if (game.name && game.name == gameName) {
                    this.loading.active = true;
                }
            }
        }
    }
    onCheckUpdateGameEnd(gameName) {
        let games = Config_1.Config.games;
        if (this._gameInfo) {
            let configGName = this._gameInfo;
            let game = games[configGName];
            if (game) {
                if (game.name && game.name == gameName) {
                    this.loading.active = false;
                }
            }
        }
    }
    onDownloadProgess(data) {
        G.Logger.log("onDownloadProgess == ", data.progress);
        if (this._gameInfo && data.config.gameName == Config_1.Config.games[this._gameInfo].name) {
            let progressBar = cc.find(`Background/progressBar`, this.node).getComponent(cc.ProgressBar);
            let progressLabel = cc.find(`Background/progressBar/progress`, this.node).getComponent(cc.Label);
            if (data.progress == -1) {
                progressBar.node.active = false;
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.DOWNLOADFAILED);
            }
            else if (data.progress <= 1) {
                progressBar.node.active = true;
                if (data.progress > progressBar.progress) {
                    progressBar.progress = data.progress;
                    progressLabel.string = "" + Math.floor(data.progress * 100) + "%";
                }
            }
            else {
                progressBar.node.active = false;
                if (this.install)
                    this.install.active = false;
                if (this.newVersion)
                    this.newVersion.active = false;
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.DOWNLOADSUCCEED);
            }
        }
    }
    onLanguageChange(language) {
        this._language = language;
        // this.updateItem(this._gameInfo, this._itemId);
    }
    updateItem(data, itemId) {
        cc.log(data, "HallNewGameItem");
        this._gameInfo = data;
        // this._sortId = data.showSort
        this._itemId = itemId;
        if (this.install)
            this.install.active = false;
        if (this.newVersion)
            this.newVersion.active = false;
        let gameConfig = Config_1.Config.games[data];
        if (CC_JSB) {
            if (gameConfig) {
                let install = UtilMgr_1.UtilMgr.checkGameInstall(gameConfig.subName);
                if (this.install)
                    this.install.active = !install;
                G.Logger.log("==install==", install);
                if (install) {
                    let version = UtilMgr_1.UtilMgr.getGameManifestVersion(gameConfig.subName);
                    if (version) {
                        G.Logger.log("==version==", version);
                        if (this._gameInfo.gameVersionCode && this._gameInfo.gameVersionCode > version) {
                            if (this.newVersion)
                                this.newVersion.active = true;
                        }
                    }
                    else {
                        if (this.newVersion)
                            this.newVersion.active = true;
                    }
                }
                // this.refreshGameIcon()
                this.refreshGameSpine();
            }
        }
        // this.refreshGameIcon()
        this.refreshGameSpine();
    }
    refreshGameIcon() {
        let games = Config_1.Config.games;
        let _gameName = games[this._gameInfo].name;
        this.icon.loadImage({ url: `hall/images/domino/btn_${_gameName}`, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
        this.gameIcon.loadImage({ url: `hall/images/domino/icon_${_gameName}`, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
        this.gameLabel.string = _gameName;
    }
    refreshGameSpine() {
        let self = this;
        let games = Config_1.Config.games;
        let _gameName = games[this._gameInfo].subName;
        this.gameSpine.loadSkeleton({
            url: `hall/anim/btnEff/${_gameName}/${_gameName}`, view: this, bundle: Defines_1.BUNDLE_RESOURCES, completeCallback: (data) => {
                if (data) {
                    self.gameSpine.animation = "animation";
                    self.gameSpine.loop = true;
                    self.gameSpine.premultipliedAlpha = false;
                }
            }
        });
    }
    onBtnClick(event, type) {
        this.jumpToGame();
    }
    jumpToGame() {
        let req = protoc_1.MST.C2M_TransferMap_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            RoomName: this._gameInfo
        });
        let buffer = protoc_1.MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_TransferMap_Req, protoc_1.MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
    }
    M2C_TransferMap_Res(data) {
        if (data && data.RoomName) {
            this._gameInfo = data.RoomName;
            let version = UtilMgr_1.UtilMgr.getGameManifestVersion(Config_1.Config.games[this._gameInfo].subName);
            G.Logger.log("JoinGame", version);
            if (version) { //游戏已包含
                if (this._gameInfo.gameVersionCode && parseInt(this._gameInfo.gameVersionCode) > parseInt(version)) { //有新版本
                    let versionInfo = HotUpdate_1.HotUpdate.allGameConfig[Config_1.Config.games[this._gameInfo].subName];
                    if (versionInfo && versionInfo.isLoaded) { //游戏加载过
                        PanelHelp_1.default.showDialog("", LanguageImpl_1.i18n.TIPS.GAMENEWVERSION, () => {
                            Global_1.reStartGame();
                        }, () => {
                            this.enterGame();
                        });
                    }
                    else {
                        this.enterGame();
                    }
                }
                else { //不更新
                    G.Logger.log("跳过更新");
                    this.enterGame(true); //跳过更新
                }
            }
            else {
                this.enterGame();
            }
        }
    }
    /**
     *
     * @param noUpdate 是否跳过更新
     */
    enterGame(noUpdate) {
        // PanelHelp.showLoading(i18n.WAIT.LOADING)
        let config = new HotUpdate_1.GameConfig(Config_1.Config.games[this._gameInfo].name, Config_1.Config.games[this._gameInfo].subName, this._itemId);
        if (noUpdate) {
            GameManager_1.gameManager().enterGameNoUpdate(config);
        }
        else {
            GameManager_1.gameManager().enterGame(config);
        }
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Sprite)
], HallNewGameItem.prototype, "icon", void 0);
__decorate([
    property(cc.Sprite)
], HallNewGameItem.prototype, "gameIcon", void 0);
__decorate([
    property(sp.Skeleton)
], HallNewGameItem.prototype, "gameSpine", void 0);
__decorate([
    property(cc.Label)
], HallNewGameItem.prototype, "gameLabel", void 0);
__decorate([
    property(cc.Sprite)
], HallNewGameItem.prototype, "picName", void 0);
__decorate([
    property(cc.Node)
], HallNewGameItem.prototype, "install", void 0);
__decorate([
    property(cc.Node)
], HallNewGameItem.prototype, "newVersion", void 0);
__decorate([
    property(cc.Node)
], HallNewGameItem.prototype, "loading", void 0);
__decorate([
    property(cc.Node)
], HallNewGameItem.prototype, "iconWait", void 0);
HallNewGameItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], HallNewGameItem);
exports.default = HallNewGameItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsTmV3R2FtZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBNEQ7QUFDNUQsb0VBQTRDO0FBQzVDLGtFQUF1RDtBQUN2RCx3REFBaUU7QUFDakUsdURBQTBHO0FBQzFHLG9FQUE0QztBQUM1QyxvREFBaUQ7QUFDakQsMkNBQXdDO0FBQ3hDLDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFDM0UsdURBQW9EO0FBQ3BELCtDQUE0QztBQUM1Qyw2Q0FBK0M7QUFDL0MseURBQW1EO0FBRW5ELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsZ0JBQU07SUFBbkQ7O1FBSUksU0FBSSxHQUFjLElBQUksQ0FBQztRQUd2QixhQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGNBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRzlCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsWUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixZQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsWUFBTyxHQUFZLElBQUksQ0FBQztRQUV4QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWixjQUFjO1FBRWQsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVqQixVQUFLLEdBQUcsMkJBQTJCLENBQUM7UUFDcEMsWUFBTyxHQUFHLDJCQUEyQixDQUFDO1FBQ3RDLFlBQU8sR0FBRyxzQ0FBc0MsQ0FBQztRQUVqRCxjQUFTLEdBQVcsRUFBRSxDQUFDO0lBeU0zQixDQUFDO0lBeE1HLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDZCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FB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OE9uQztrQkE5T29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBHYW1lQ29uZmlnLCBIb3RVcGRhdGUgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTLCBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFLCBSZXNvdXJjZUNhY2hlU3RhdHVzIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgSGFsbEV2ZW50IH0gZnJvbSBcIi4vSGFsbEV2ZW50XCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCB7IHJlU3RhcnRHYW1lIH0gZnJvbSBcIi4uL2dsb2JhbC9HbG9iYWxcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsTmV3R2FtZUl0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgZ2FtZUljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgZ2FtZVNwaW5lOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZ2FtZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHBpY05hbWU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpbnN0YWxsOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBuZXdWZXJzaW9uOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb2FkaW5nOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpY29uV2FpdDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBfaXRlbUlkID0gMDtcblxuICAgIC8vIF9zb3J0SWQgPSAwXG5cbiAgICBfZ2FtZUluZm8gPSBudWxsO1xuXG4gICAgX3BhdGggPSBcImhhbGwvaW1hZ2VzL2R0X2dhbWVfaWNvbl9cIjtcbiAgICBfcGF0aEVOID0gXCJoYWxsL2ltYWdlcy9kdF9nYW1lX25hbWVfXCI7XG4gICAgX3BhdGhISSA9IFwibGFuZ3VhZ2VSZXMvaGluZGkvaGFsbC9kdF9nYW1lX25hbWVfXCI7XG5cbiAgICBfbGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKClcbiAgICAgICAgY2MudHdlZW4odGhpcy5pY29uV2FpdClcbiAgICAgICAgICAgIC5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKCkuYnkoMC4zLCB7IGFuZ2xlOiAzMCB9KVxuICAgICAgICAgICAgICAgIC5kZWxheSgwLjAxKSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIHRoaXMubG9hZGluZy5hY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKTtcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoSGFsbEV2ZW50LkRPV05MT0FEX1BST0dSRVNTLCB0aGlzLm9uRG93bmxvYWRQcm9nZXNzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib25DaGVja1VwZGF0ZUdhbWVTdGFydFwiLCB0aGlzLm9uQ2hlY2tVcGRhdGVHYW1lU3RhcnQpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJvbkNoZWNrVXBkYXRlR2FtZUVuZFwiLCB0aGlzLm9uQ2hlY2tVcGRhdGVHYW1lRW5kKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdNMkNfVHJhbnNmZXJNYXBfUmVzJywgdGhpcy5NMkNfVHJhbnNmZXJNYXBfUmVzKTtcbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNoZWNrVXBkYXRlR2FtZVN0YXJ0KGdhbWVOYW1lKSB7XG4gICAgICAgIGxldCBnYW1lcyA9IENvbmZpZy5nYW1lc1xuICAgICAgICBpZiAodGhpcy5fZ2FtZUluZm8pIHtcbiAgICAgICAgICAgIGxldCBjb25maWdHTmFtZSA9IHRoaXMuX2dhbWVJbmZvXG4gICAgICAgICAgICBsZXQgZ2FtZSA9IGdhbWVzW2NvbmZpZ0dOYW1lXVxuICAgICAgICAgICAgaWYgKGdhbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5uYW1lICYmIGdhbWUubmFtZSA9PSBnYW1lTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uQ2hlY2tVcGRhdGVHYW1lRW5kKGdhbWVOYW1lKSB7XG4gICAgICAgIGxldCBnYW1lcyA9IENvbmZpZy5nYW1lc1xuICAgICAgICBpZiAodGhpcy5fZ2FtZUluZm8pIHtcbiAgICAgICAgICAgIGxldCBjb25maWdHTmFtZSA9IHRoaXMuX2dhbWVJbmZvXG4gICAgICAgICAgICBsZXQgZ2FtZSA9IGdhbWVzW2NvbmZpZ0dOYW1lXVxuICAgICAgICAgICAgaWYgKGdhbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5uYW1lICYmIGdhbWUubmFtZSA9PSBnYW1lTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkRvd25sb2FkUHJvZ2VzcyhkYXRhOiB7IHByb2dyZXNzOiBudW1iZXIsIGNvbmZpZzogR2FtZUNvbmZpZyB9KSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcIm9uRG93bmxvYWRQcm9nZXNzID09IFwiLCBkYXRhLnByb2dyZXNzKTtcbiAgICAgICAgaWYgKHRoaXMuX2dhbWVJbmZvICYmIGRhdGEuY29uZmlnLmdhbWVOYW1lID09IENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mb10ubmFtZSkge1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzQmFyOiBjYy5Qcm9ncmVzc0JhciA9IGNjLmZpbmQoYEJhY2tncm91bmQvcHJvZ3Jlc3NCYXJgLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3NMYWJlbDogY2MuTGFiZWwgPSBjYy5maW5kKGBCYWNrZ3JvdW5kL3Byb2dyZXNzQmFyL3Byb2dyZXNzYCwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgaWYgKGRhdGEucHJvZ3Jlc3MgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5ET1dOTE9BREZBSUxFRClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9ncmVzcyA8PSAxKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnByb2dyZXNzID4gcHJvZ3Jlc3NCYXIucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSBkYXRhLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0xhYmVsLnN0cmluZyA9IFwiXCIgKyBNYXRoLmZsb29yKGRhdGEucHJvZ3Jlc3MgKiAxMDApICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFsbCkgdGhpcy5pbnN0YWxsLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV3VmVyc2lvbikgdGhpcy5uZXdWZXJzaW9uLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5USVBTLkRPV05MT0FEU1VDQ0VFRClcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTGFuZ3VhZ2VDaGFuZ2UobGFuZ3VhZ2UpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICAgICAgLy8gdGhpcy51cGRhdGVJdGVtKHRoaXMuX2dhbWVJbmZvLCB0aGlzLl9pdGVtSWQpO1xuICAgIH1cbiAgICB1cGRhdGVJdGVtKGRhdGEsIGl0ZW1JZCkge1xuICAgICAgICBjYy5sb2coZGF0YSwgXCJIYWxsTmV3R2FtZUl0ZW1cIilcbiAgICAgICAgdGhpcy5fZ2FtZUluZm8gPSBkYXRhXG4gICAgICAgIC8vIHRoaXMuX3NvcnRJZCA9IGRhdGEuc2hvd1NvcnRcbiAgICAgICAgdGhpcy5faXRlbUlkID0gaXRlbUlkO1xuICAgICAgICBpZiAodGhpcy5pbnN0YWxsKSB0aGlzLmluc3RhbGwuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgaWYgKHRoaXMubmV3VmVyc2lvbikgdGhpcy5uZXdWZXJzaW9uLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIGxldCBnYW1lQ29uZmlnID0gQ29uZmlnLmdhbWVzW2RhdGFdXG4gICAgICAgIGlmIChDQ19KU0IpIHtcbiAgICAgICAgICAgIGlmIChnYW1lQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluc3RhbGwgPSBVdGlsTWdyLmNoZWNrR2FtZUluc3RhbGwoZ2FtZUNvbmZpZy5zdWJOYW1lKVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbGwpIHRoaXMuaW5zdGFsbC5hY3RpdmUgPSAhaW5zdGFsbFxuICAgICAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIj09aW5zdGFsbD09XCIsIGluc3RhbGwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBVdGlsTWdyLmdldEdhbWVNYW5pZmVzdFZlcnNpb24oZ2FtZUNvbmZpZy5zdWJOYW1lKVxuICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwiPT12ZXJzaW9uPT1cIiwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2FtZUluZm8uZ2FtZVZlcnNpb25Db2RlICYmIHRoaXMuX2dhbWVJbmZvLmdhbWVWZXJzaW9uQ29kZSA+IHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXdWZXJzaW9uKSB0aGlzLm5ld1ZlcnNpb24uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV3VmVyc2lvbikgdGhpcy5uZXdWZXJzaW9uLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVmcmVzaEdhbWVJY29uKClcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hHYW1lU3BpbmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoR2FtZUljb24oKVxuICAgICAgICB0aGlzLnJlZnJlc2hHYW1lU3BpbmUoKVxuICAgIH1cblxuICAgIHJlZnJlc2hHYW1lSWNvbigpIHtcbiAgICAgICAgbGV0IGdhbWVzID0gQ29uZmlnLmdhbWVzXG4gICAgICAgIGxldCBfZ2FtZU5hbWUgPSBnYW1lc1t0aGlzLl9nYW1lSW5mb10ubmFtZVxuICAgICAgICB0aGlzLmljb24ubG9hZEltYWdlKHsgdXJsOiBgaGFsbC9pbWFnZXMvZG9taW5vL2J0bl8ke19nYW1lTmFtZX1gLCB2aWV3OiB0aGlzLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICAgICAgdGhpcy5nYW1lSWNvbi5sb2FkSW1hZ2UoeyB1cmw6IGBoYWxsL2ltYWdlcy9kb21pbm8vaWNvbl8ke19nYW1lTmFtZX1gLCB2aWV3OiB0aGlzLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICAgICAgdGhpcy5nYW1lTGFiZWwuc3RyaW5nID0gX2dhbWVOYW1lXG4gICAgfVxuXG4gICAgcmVmcmVzaEdhbWVTcGluZSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGxldCBnYW1lcyA9IENvbmZpZy5nYW1lc1xuICAgICAgICBsZXQgX2dhbWVOYW1lID0gZ2FtZXNbdGhpcy5fZ2FtZUluZm9dLnN1Yk5hbWVcbiAgICAgICAgdGhpcy5nYW1lU3BpbmUubG9hZFNrZWxldG9uKHtcbiAgICAgICAgICAgIHVybDogYGhhbGwvYW5pbS9idG5FZmYvJHtfZ2FtZU5hbWV9LyR7X2dhbWVOYW1lfWAsIHZpZXc6IHRoaXMsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgY29tcGxldGVDYWxsYmFjazogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVTcGluZS5hbmltYXRpb24gPSBcImFuaW1hdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVTcGluZS5sb29wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nYW1lU3BpbmUucHJlbXVsdGlwbGllZEFscGhhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkJ0bkNsaWNrKGV2ZW50LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuanVtcFRvR2FtZSgpXG4gICAgfVxuXG4gICAganVtcFRvR2FtZSgpIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMk1fVHJhbnNmZXJNYXBfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBSb29tTmFtZTogdGhpcy5fZ2FtZUluZm9cbiAgICAgICAgfSlcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMk1fVHJhbnNmZXJNYXBfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJNX1RyYW5zZmVyTWFwX1JlcSwgTVNULk91dGVyT3Bjb2RlX01hcC5DMk1fVHJhbnNmZXJNYXBfUmVxLCBidWZmZXIpO1xuXG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChcImNvbW1vbi9hdWRpby9jbGlja1wiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICB9XG5cbiAgICBNMkNfVHJhbnNmZXJNYXBfUmVzKGRhdGE6IE1TVC5NMkNfVHJhbnNmZXJNYXBfUmVzKSB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuUm9vbU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVJbmZvID0gZGF0YS5Sb29tTmFtZTtcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gVXRpbE1nci5nZXRHYW1lTWFuaWZlc3RWZXJzaW9uKENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mb10uc3ViTmFtZSlcbiAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIkpvaW5HYW1lXCIsIHZlcnNpb24pXG4gICAgICAgICAgICBpZiAodmVyc2lvbikgey8v5ri45oiP5bey5YyF5ZCrXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dhbWVJbmZvLmdhbWVWZXJzaW9uQ29kZSAmJiBwYXJzZUludCh0aGlzLl9nYW1lSW5mby5nYW1lVmVyc2lvbkNvZGUpID4gcGFyc2VJbnQodmVyc2lvbikpIHsvL+acieaWsOeJiOacrFxuICAgICAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbkluZm8gPSBIb3RVcGRhdGUuYWxsR2FtZUNvbmZpZ1tDb25maWcuZ2FtZXNbdGhpcy5fZ2FtZUluZm9dLnN1Yk5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbkluZm8gJiYgdmVyc2lvbkluZm8uaXNMb2FkZWQpIHsvL+a4uOaIj+WKoOi9vei/h1xuICAgICAgICAgICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dEaWFsb2coXCJcIiwgaTE4bi5USVBTLkdBTUVORVdWRVJTSU9OLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVTdGFydEdhbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyR2FtZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8v5LiN5pu05pawXG4gICAgICAgICAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIui3s+i/h+abtOaWsFwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyR2FtZSh0cnVlKS8v6Lez6L+H5pu05pawXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBub1VwZGF0ZSDmmK/lkKbot7Pov4fmm7TmlrBcbiAgICAgKi9cbiAgICBwcml2YXRlIGVudGVyR2FtZShub1VwZGF0ZT8pIHtcbiAgICAgICAgLy8gUGFuZWxIZWxwLnNob3dMb2FkaW5nKGkxOG4uV0FJVC5MT0FESU5HKVxuICAgICAgICBsZXQgY29uZmlnID0gbmV3IEdhbWVDb25maWcoQ29uZmlnLmdhbWVzW3RoaXMuX2dhbWVJbmZvXS5uYW1lLCBDb25maWcuZ2FtZXNbdGhpcy5fZ2FtZUluZm9dLnN1Yk5hbWUsIHRoaXMuX2l0ZW1JZCk7XG4gICAgICAgIGlmIChub1VwZGF0ZSkge1xuICAgICAgICAgICAgZ2FtZU1hbmFnZXIoKS5lbnRlckdhbWVOb1VwZGF0ZShjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZU1hbmFnZXIoKS5lbnRlckdhbWUoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbei/m+WFpVNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkVudGVyU3Jjb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbeemu+W8gFNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkV4aXRTY3JvbGxWaWV3KCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxufVxuIl19