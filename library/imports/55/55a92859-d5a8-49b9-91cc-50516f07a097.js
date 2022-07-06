"use strict";
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