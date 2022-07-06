"use strict";
cc._RF.push(module, '4a7c3tXZQlIiLVrD23bn11V', 'HallGameItem');
// script/hall/HallGameItem.ts

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
const CommonService_1 = require("../common/net/CommonService");
const Manager_1 = require("../common/manager/Manager");
const UtilMgr_1 = require("../global/UtilMgr");
const Global_1 = require("../global/Global");
const EventApi_1 = require("../framework/event/EventApi");
const { ccclass, property } = cc._decorator;
let HallGameItem = class HallGameItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon = null;
        this.picName = null;
        this.install = null;
        this.newVersion = null;
        this.loading = null;
        this.iconWait = null;
        this.gameSpine = null;
        this.crash = null;
        this._itemId = 0;
        this._sortId = 0;
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
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CheckPlayerJoinGameReq), this.onCheckPlayerJoinGame);
        this.registerEvent("onCheckUpdateGameStart", this.onCheckUpdateGameStart);
        this.registerEvent("onCheckUpdateGameEnd", this.onCheckUpdateGameEnd);
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onCheckUpdateGameStart(gameName) {
        if (this._gameInfo && gameName == Config_1.Config.games[this._gameInfo.gameId].name) {
            if (this.loading)
                this.loading.active = true;
        }
    }
    onCheckUpdateGameEnd(gameName) {
        if (this._gameInfo && gameName == Config_1.Config.games[this._gameInfo.gameId].name) {
            if (this.loading)
                this.loading.active = false;
        }
    }
    onDownloadProgess(data) {
        G.Logger.log("onDownloadProgess == ", data.progress);
        if (this._gameInfo && data.config.gameName == Config_1.Config.games[this._gameInfo.gameId].name) {
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
        this.updateItem(this._gameInfo, this._itemId);
    }
    updateItem(data, itemId) {
        cc.log(data, "HallGameItem");
        this._gameInfo = data;
        this._sortId = data.showSort;
        this._itemId = itemId;
        if (this.install)
            this.install.active = false;
        if (this.newVersion)
            this.newVersion.active = false;
        if (CC_JSB) {
            let gameConfig = Config_1.Config.games[data.gameId];
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
            }
        }
        let spine = this.getGameSpineByGameID(data.gameId);
        if (spine) {
            this.icon.node.active = false;
            this.gameSpine.node.active = true;
            this.gameSpine.skeletonData = spine;
            this.gameSpine.setAnimation(0, "newAnimation", true);
            let path = this._pathEN; // 汉语要报错
            if (this._language === cc.sys.LANGUAGE_ENGLISH)
                path = this._pathEN;
            if (this._language === cc.sys.LANGUAGE_HINDI)
                path = this._pathHI;
            let namePath = path + data.gameId;
            if (data.gameId == 900018)
                return; //暂时 斗鸡没有图片 先屏蔽
            this.picName.loadImage({ url: namePath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
        }
        else {
            this.icon.node.active = true;
            this.gameSpine.node.active = false;
            let iconPath = this._path + data.gameId;
            this.icon.loadImage({ url: iconPath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
        }
    }
    getGameSpineByGameID(gameId) {
        switch (gameId) {
            case Config_1.Config.GameId.Crash:
                return this.crash;
            default:
                return null;
        }
    }
    onBtnClick(event, type) {
        if (this._gameInfo.isOpen) {
            PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.Waiting.EnterGame);
            let options = {
                gameId: this._gameInfo.gameId
            };
            let req = CommonService_1.protoPackage.hall.CheckPlayerJoinGameReq.create(options);
            let buffer = CommonService_1.protoPackage.hall.CheckPlayerJoinGameReq.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CheckPlayerJoinGameReq, buffer);
            // let config = new GameConfig(Config.games[this._gameInfo.gameId].name, Config.games[this._gameInfo.gameId].subName, this._itemId);
            // gameManager().enterGame(config);
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.NOTOPENPLEASEWAIT);
        }
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
    }
    onCheckPlayerJoinGame(msg) {
        if (this._gameInfo && msg.gameId == this._gameInfo.gameId) {
            if (msg.currentGameId) {
                let gameName = Config_1.Config.games[msg.currentGameId].disName;
                PanelHelp_1.default.showMsgBox('', String.format(LanguageImpl_1.i18n.TIPS.CHECKJOINGAME, gameName));
            }
            else {
                let version = UtilMgr_1.UtilMgr.getGameManifestVersion(Config_1.Config.games[this._gameInfo.gameId].subName);
                G.Logger.log("JoinGame", version);
                if (version) { //游戏已包含
                    if (this._gameInfo.gameVersionCode && parseInt(this._gameInfo.gameVersionCode) > parseInt(version)) { //有新版本
                        let versionInfo = HotUpdate_1.HotUpdate.allGameConfig[Config_1.Config.games[this._gameInfo.gameId].subName];
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
    }
    /**
     *
     * @param noUpdate 是否跳过更新
     */
    enterGame(noUpdate) {
        // PanelHelp.showLoading(i18n.WAIT.LOADING)
        let config = new HotUpdate_1.GameConfig(Config_1.Config.games[this._gameInfo.gameId].name, Config_1.Config.games[this._gameInfo.gameId].subName, this._itemId);
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
], HallGameItem.prototype, "icon", void 0);
__decorate([
    property(cc.Sprite)
], HallGameItem.prototype, "picName", void 0);
__decorate([
    property(cc.Node)
], HallGameItem.prototype, "install", void 0);
__decorate([
    property(cc.Node)
], HallGameItem.prototype, "newVersion", void 0);
__decorate([
    property(cc.Node)
], HallGameItem.prototype, "loading", void 0);
__decorate([
    property(cc.Node)
], HallGameItem.prototype, "iconWait", void 0);
__decorate([
    property(sp.Skeleton)
], HallGameItem.prototype, "gameSpine", void 0);
__decorate([
    property(sp.SkeletonData)
], HallGameItem.prototype, "crash", void 0);
HallGameItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], HallGameItem);
exports.default = HallGameItem;

cc._RF.pop();