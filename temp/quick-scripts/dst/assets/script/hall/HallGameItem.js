
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallGameItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsR2FtZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBNEQ7QUFDNUQsb0VBQTRDO0FBQzVDLGtFQUF1RDtBQUN2RCx3REFBaUU7QUFDakUsdURBQXFGO0FBQ3JGLG9FQUE0QztBQUM1QyxvREFBaUQ7QUFDakQsMkNBQXdDO0FBQ3hDLDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFDM0UsK0RBQXVFO0FBQ3ZFLHVEQUFvRDtBQUNwRCwrQ0FBNEM7QUFDNUMsNkNBQStDO0FBRS9DLDBEQUF1RDtBQUV2RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsWUFBWSxHQUFqQyxNQUFxQixZQUFhLFNBQVEsZ0JBQU07SUFBaEQ7O1FBSUksU0FBSSxHQUFjLElBQUksQ0FBQztRQUd2QixZQUFPLEdBQWMsSUFBSSxDQUFDO1FBRzFCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUyxHQUFnQixJQUFJLENBQUM7UUFHOUIsVUFBSyxHQUFvQixJQUFJLENBQUM7UUFFOUIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUVaLFlBQU8sR0FBRyxDQUFDLENBQUE7UUFFWCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWpCLFVBQUssR0FBRywyQkFBMkIsQ0FBQztRQUNwQyxZQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDdEMsWUFBTyxHQUFHLHNDQUFzQyxDQUFDO1FBRWpELGNBQVMsR0FBVyxFQUFFLENBQUM7SUFrTTNCLENBQUM7SUFqTUcsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNkLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNsQixhQUFhLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCLEtBQUssRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUNELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBUyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoSSxJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDdEUsSUFBSSxnQ0FBc0IsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0wsQ0FBQztJQUNPLHNCQUFzQixDQUFDLFFBQVE7UUFDbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsSUFBSSxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ3hFLElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1NBQy9DO0lBQ0wsQ0FBQztJQUNPLG9CQUFvQixDQUFDLFFBQVE7UUFDakMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsSUFBSSxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ3hFLElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1NBQ2hEO0lBQ0wsQ0FBQztJQUNPLGlCQUFpQixDQUFDLElBQThDO1FBQ3BFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNwRixJQUFJLFdBQVcsR0FBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RyxJQUFJLGFBQWEsR0FBYSxFQUFFLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNHLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTthQUM5QztpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxFQUFFO2dCQUMzQixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFO29CQUN0QyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3JDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3JFO2FBRUo7aUJBQU07Z0JBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPO29CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtnQkFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVTtvQkFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7Z0JBQ25ELG1CQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2FBQy9DO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsUUFBUTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU07UUFDbkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU87WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUNuRCxJQUFJLE1BQU0sRUFBRTtZQUVSLElBQUksVUFBVSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzFDLElBQUksVUFBVSxFQUFFO2dCQUNaLElBQUksT0FBTyxHQUFHLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUMxRCxJQUFJLElBQUksQ0FBQyxPQUFPO29CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFBO2dCQUNoRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRXJDLElBQUksT0FBTyxFQUFFO29CQUNULElBQUksT0FBTyxHQUFHLGlCQUFPLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNoRSxJQUFJLE9BQU8sRUFBRTt3QkFDVCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsT0FBTyxFQUFFOzRCQUM1RSxJQUFJLElBQUksQ0FBQyxVQUFVO2dDQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTt5QkFDckQ7cUJBQ0o7eUJBQU07d0JBQ0gsSUFBSSxJQUFJLENBQUMsVUFBVTs0QkFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7cUJBQ3JEO2lCQUNKO2FBQ0o7U0FDSjtRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEQsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO1lBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7WUFDakMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO2dCQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3BFLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWM7Z0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU07Z0JBQUUsT0FBTyxDQUFDLGVBQWU7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQztTQUNuRjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtZQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBRWxDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFBO1NBQy9FO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLE1BQU07UUFDdkIsUUFBUSxNQUFNLEVBQUU7WUFDWixLQUFLLGVBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSztnQkFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCO2dCQUNJLE9BQU8sSUFBSSxDQUFBO1NBQ2xCO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLG1CQUFTLENBQUMsV0FBVyxDQUFDLG1CQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzdDLElBQUksT0FBTyxHQUFHO2dCQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07YUFDaEMsQ0FBQTtZQUNELElBQUksR0FBRyxHQUFHLDRCQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxJQUFJLE1BQU0sR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFDcEQsTUFBTSxDQUFDLENBQUM7WUFDWixvSUFBb0k7WUFDcEksbUNBQW1DO1NBQ3RDO2FBQU07WUFDSCxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsMEJBQWdCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQscUJBQXFCLENBQUMsR0FBRztRQUNyQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2RCxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7Z0JBQ25CLElBQUksUUFBUSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtnQkFDdEQsbUJBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7YUFDN0U7aUJBQU07Z0JBQ0gsSUFBSSxPQUFPLEdBQUcsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3pGLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDakMsSUFBSSxPQUFPLEVBQUUsRUFBQyxPQUFPO29CQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLE1BQU07d0JBQ3ZHLElBQUksV0FBVyxHQUFHLHFCQUFTLENBQUMsYUFBYSxDQUFDLGVBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdkYsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFDLE9BQU87NEJBQzdDLG1CQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxtQkFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO2dDQUNwRCxvQkFBVyxFQUFFLENBQUE7NEJBQ2pCLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0NBQ0osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBOzRCQUNwQixDQUFDLENBQUMsQ0FBQTt5QkFDTDs2QkFBTTs0QkFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7eUJBQ25CO3FCQUNKO3lCQUFNLEVBQUMsS0FBSzt3QkFDVCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTt3QkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLE1BQU07cUJBRTdCO2lCQUNKO3FCQUFNO29CQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtpQkFDbkI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUNEOzs7T0FHRztJQUNLLFNBQVMsQ0FBQyxRQUFTO1FBQ3ZCLDJDQUEyQztRQUMzQyxJQUFJLE1BQU0sR0FBRyxJQUFJLHNCQUFVLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxlQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqSSxJQUFJLFFBQVEsRUFBRTtZQUNWLHlCQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0gseUJBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuQztJQUVMLENBQUM7SUFFRDs7T0FFRztJQUNILGlCQUFpQjtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKLENBQUE7QUFoT0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswQ0FDRztBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNNO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ007QUFFeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDUztBQUUzQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNNO0FBRXhCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsrQ0FDUTtBQUc5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDOzJDQUNJO0FBdEJiLFlBQVk7SUFGaEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsWUFBWSxDQW9PaEM7a0JBcE9vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZU1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgR2FtZUNvbmZpZywgSG90VXBkYXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0hvdFVwZGF0ZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUywgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IEhhbGxFdmVudCB9IGZyb20gXCIuL0hhbGxFdmVudFwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgeyByZVN0YXJ0R2FtZSB9IGZyb20gXCIuLi9nbG9iYWwvR2xvYmFsXCI7XG5pbXBvcnQgeyBMb2dpY0V2ZW50IH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbGxHYW1lSXRlbSBleHRlbmRzIFVJVmlldyB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwaWNOYW1lOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaW5zdGFsbDogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbmV3VmVyc2lvbjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9hZGluZzogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaWNvbldhaXQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxuICAgIGdhbWVTcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uRGF0YSlcbiAgICBjcmFzaDogc3AuU2tlbGV0b25EYXRhID0gbnVsbDtcblxuICAgIF9pdGVtSWQgPSAwO1xuXG4gICAgX3NvcnRJZCA9IDBcblxuICAgIF9nYW1lSW5mbyA9IG51bGw7XG5cbiAgICBfcGF0aCA9IFwiaGFsbC9pbWFnZXMvZHRfZ2FtZV9pY29uX1wiO1xuICAgIF9wYXRoRU4gPSBcImhhbGwvaW1hZ2VzL2R0X2dhbWVfbmFtZV9cIjtcbiAgICBfcGF0aEhJID0gXCJsYW5ndWFnZVJlcy9oaW5kaS9oYWxsL2R0X2dhbWVfbmFtZV9cIjtcblxuICAgIF9sYW5ndWFnZTogc3RyaW5nID0gJyc7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKVxuICAgICAgICBjYy50d2Vlbih0aGlzLmljb25XYWl0KVxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSgwLjMsIHsgYW5nbGU6IDMwIH0pXG4gICAgICAgICAgICAgICAgLmRlbGF5KDAuMDEpKVxuICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gTWFuYWdlci5sYW5ndWFnZS5nZXRMYW5ndWFnZSgpO1xuICAgIH1cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHRoaXMub25Eb3dubG9hZFByb2dlc3MpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DaGVja1BsYXllckpvaW5HYW1lUmVxKSwgdGhpcy5vbkNoZWNrUGxheWVySm9pbkdhbWUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJvbkNoZWNrVXBkYXRlR2FtZVN0YXJ0XCIsIHRoaXMub25DaGVja1VwZGF0ZUdhbWVTdGFydCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9uQ2hlY2tVcGRhdGVHYW1lRW5kXCIsIHRoaXMub25DaGVja1VwZGF0ZUdhbWVFbmQpO1xuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uQ2hlY2tVcGRhdGVHYW1lU3RhcnQoZ2FtZU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2dhbWVJbmZvICYmIGdhbWVOYW1lID09IENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mby5nYW1lSWRdLm5hbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHRoaXMubG9hZGluZy5hY3RpdmUgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNoZWNrVXBkYXRlR2FtZUVuZChnYW1lTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fZ2FtZUluZm8gJiYgZ2FtZU5hbWUgPT0gQ29uZmlnLmdhbWVzW3RoaXMuX2dhbWVJbmZvLmdhbWVJZF0ubmFtZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9hZGluZykgdGhpcy5sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkRvd25sb2FkUHJvZ2VzcyhkYXRhOiB7IHByb2dyZXNzOiBudW1iZXIsIGNvbmZpZzogR2FtZUNvbmZpZyB9KSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcIm9uRG93bmxvYWRQcm9nZXNzID09IFwiLCBkYXRhLnByb2dyZXNzKTtcbiAgICAgICAgaWYgKHRoaXMuX2dhbWVJbmZvICYmIGRhdGEuY29uZmlnLmdhbWVOYW1lID09IENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mby5nYW1lSWRdLm5hbWUpIHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc0JhcjogY2MuUHJvZ3Jlc3NCYXIgPSBjYy5maW5kKGBCYWNrZ3JvdW5kL3Byb2dyZXNzQmFyYCwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICAgICAgbGV0IHByb2dyZXNzTGFiZWw6IGNjLkxhYmVsID0gY2MuZmluZChgQmFja2dyb3VuZC9wcm9ncmVzc0Jhci9wcm9ncmVzc2AsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnByb2dyZXNzID09IC0xKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuRE9XTkxPQURGQUlMRUQpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucHJvZ3Jlc3MgPD0gMSkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wcm9ncmVzcyA+IHByb2dyZXNzQmFyLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLnByb2dyZXNzID0gZGF0YS5wcm9ncmVzcztcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSBcIlwiICsgTWF0aC5mbG9vcihkYXRhLnByb2dyZXNzICogMTAwKSArIFwiJVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbGwpIHRoaXMuaW5zdGFsbC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5ld1ZlcnNpb24pIHRoaXMubmV3VmVyc2lvbi5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5ET1dOTE9BRFNVQ0NFRUQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25MYW5ndWFnZUNoYW5nZShsYW5ndWFnZSkge1xuICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IGxhbmd1YWdlO1xuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW0odGhpcy5fZ2FtZUluZm8sIHRoaXMuX2l0ZW1JZCk7XG4gICAgfVxuICAgIHVwZGF0ZUl0ZW0oZGF0YSwgaXRlbUlkKSB7XG4gICAgICAgIGNjLmxvZyhkYXRhLCBcIkhhbGxHYW1lSXRlbVwiKVxuICAgICAgICB0aGlzLl9nYW1lSW5mbyA9IGRhdGFcbiAgICAgICAgdGhpcy5fc29ydElkID0gZGF0YS5zaG93U29ydFxuICAgICAgICB0aGlzLl9pdGVtSWQgPSBpdGVtSWQ7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbGwpIHRoaXMuaW5zdGFsbC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICBpZiAodGhpcy5uZXdWZXJzaW9uKSB0aGlzLm5ld1ZlcnNpb24uYWN0aXZlID0gZmFsc2VcbiAgICAgICAgaWYgKENDX0pTQikge1xuXG4gICAgICAgICAgICBsZXQgZ2FtZUNvbmZpZyA9IENvbmZpZy5nYW1lc1tkYXRhLmdhbWVJZF1cbiAgICAgICAgICAgIGlmIChnYW1lQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluc3RhbGwgPSBVdGlsTWdyLmNoZWNrR2FtZUluc3RhbGwoZ2FtZUNvbmZpZy5zdWJOYW1lKVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbGwpIHRoaXMuaW5zdGFsbC5hY3RpdmUgPSAhaW5zdGFsbFxuICAgICAgICAgICAgICAgIEcuTG9nZ2VyLmxvZyhcIj09aW5zdGFsbD09XCIsIGluc3RhbGwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBVdGlsTWdyLmdldEdhbWVNYW5pZmVzdFZlcnNpb24oZ2FtZUNvbmZpZy5zdWJOYW1lKVxuICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwiPT12ZXJzaW9uPT1cIiwgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2FtZUluZm8uZ2FtZVZlcnNpb25Db2RlICYmIHRoaXMuX2dhbWVJbmZvLmdhbWVWZXJzaW9uQ29kZSA+IHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXdWZXJzaW9uKSB0aGlzLm5ld1ZlcnNpb24uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV3VmVyc2lvbikgdGhpcy5uZXdWZXJzaW9uLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGluZSA9IHRoaXMuZ2V0R2FtZVNwaW5lQnlHYW1lSUQoZGF0YS5nYW1lSWQpXG4gICAgICAgIGlmIChzcGluZSkge1xuICAgICAgICAgICAgdGhpcy5pY29uLm5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNwaW5lLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5nYW1lU3BpbmUuc2tlbGV0b25EYXRhID0gc3BpbmVcbiAgICAgICAgICAgIHRoaXMuZ2FtZVNwaW5lLnNldEFuaW1hdGlvbigwLCBcIm5ld0FuaW1hdGlvblwiLCB0cnVlKVxuICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9wYXRoRU47IC8vIOaxieivreimgeaKpemUmVxuICAgICAgICAgICAgaWYgKHRoaXMuX2xhbmd1YWdlID09PSBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCkgcGF0aCA9IHRoaXMuX3BhdGhFTjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYW5ndWFnZSA9PT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKSBwYXRoID0gdGhpcy5fcGF0aEhJO1xuICAgICAgICAgICAgbGV0IG5hbWVQYXRoID0gcGF0aCArIGRhdGEuZ2FtZUlkO1xuICAgICAgICAgICAgaWYgKGRhdGEuZ2FtZUlkID09IDkwMDAxOCkgcmV0dXJuOyAvL+aaguaXtiDmlpfpuKHmsqHmnInlm77niYcg5YWI5bGP6JS9XG4gICAgICAgICAgICB0aGlzLnBpY05hbWUubG9hZEltYWdlKHsgdXJsOiBuYW1lUGF0aCwgdmlldzogdGhpcywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pY29uLm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5nYW1lU3BpbmUubm9kZS5hY3RpdmUgPSBmYWxzZVxuXG4gICAgICAgICAgICBsZXQgaWNvblBhdGggPSB0aGlzLl9wYXRoICsgZGF0YS5nYW1lSWRcbiAgICAgICAgICAgIHRoaXMuaWNvbi5sb2FkSW1hZ2UoeyB1cmw6IGljb25QYXRoLCB2aWV3OiB0aGlzLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEdhbWVTcGluZUJ5R2FtZUlEKGdhbWVJZCkge1xuICAgICAgICBzd2l0Y2ggKGdhbWVJZCkge1xuICAgICAgICAgICAgY2FzZSBDb25maWcuR2FtZUlkLkNyYXNoOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyYXNoO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CdG5DbGljayhldmVudCwgdHlwZSkge1xuICAgICAgICBpZiAodGhpcy5fZ2FtZUluZm8uaXNPcGVuKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0xvYWRpbmcoaTE4bi5XYWl0aW5nLkVudGVyR2FtZSlcbiAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGdhbWVJZDogdGhpcy5fZ2FtZUluZm8uZ2FtZUlkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuQ2hlY2tQbGF5ZXJKb2luR2FtZVJlcS5jcmVhdGUob3B0aW9ucyk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuQ2hlY2tQbGF5ZXJKb2luR2FtZVJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ2hlY2tQbGF5ZXJKb2luR2FtZVJlcSxcbiAgICAgICAgICAgICAgICBidWZmZXIpO1xuICAgICAgICAgICAgLy8gbGV0IGNvbmZpZyA9IG5ldyBHYW1lQ29uZmlnKENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mby5nYW1lSWRdLm5hbWUsIENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mby5nYW1lSWRdLnN1Yk5hbWUsIHRoaXMuX2l0ZW1JZCk7XG4gICAgICAgICAgICAvLyBnYW1lTWFuYWdlcigpLmVudGVyR2FtZShjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5USVBTLk5PVE9QRU5QTEVBU0VXQUlUKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChcImNvbW1vbi9hdWRpby9jbGlja1wiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICB9XG5cbiAgICBvbkNoZWNrUGxheWVySm9pbkdhbWUobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLl9nYW1lSW5mbyAmJiBtc2cuZ2FtZUlkID09IHRoaXMuX2dhbWVJbmZvLmdhbWVJZCkge1xuICAgICAgICAgICAgaWYgKG1zZy5jdXJyZW50R2FtZUlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGdhbWVOYW1lID0gQ29uZmlnLmdhbWVzW21zZy5jdXJyZW50R2FtZUlkXS5kaXNOYW1lXG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIFN0cmluZy5mb3JtYXQoaTE4bi5USVBTLkNIRUNLSk9JTkdBTUUsIGdhbWVOYW1lKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBVdGlsTWdyLmdldEdhbWVNYW5pZmVzdFZlcnNpb24oQ29uZmlnLmdhbWVzW3RoaXMuX2dhbWVJbmZvLmdhbWVJZF0uc3ViTmFtZSlcbiAgICAgICAgICAgICAgICBHLkxvZ2dlci5sb2coXCJKb2luR2FtZVwiLCB2ZXJzaW9uKVxuICAgICAgICAgICAgICAgIGlmICh2ZXJzaW9uKSB7Ly/muLjmiI/lt7LljIXlkKtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2dhbWVJbmZvLmdhbWVWZXJzaW9uQ29kZSAmJiBwYXJzZUludCh0aGlzLl9nYW1lSW5mby5nYW1lVmVyc2lvbkNvZGUpID4gcGFyc2VJbnQodmVyc2lvbikpIHsvL+acieaWsOeJiOacrFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZlcnNpb25JbmZvID0gSG90VXBkYXRlLmFsbEdhbWVDb25maWdbQ29uZmlnLmdhbWVzW3RoaXMuX2dhbWVJbmZvLmdhbWVJZF0uc3ViTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbkluZm8gJiYgdmVyc2lvbkluZm8uaXNMb2FkZWQpIHsvL+a4uOaIj+WKoOi9vei/h1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RGlhbG9nKFwiXCIsIGkxOG4uVElQUy5HQU1FTkVXVkVSU0lPTiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZVN0YXJ0R2FtZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyR2FtZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckdhbWUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8v5LiN5pu05pawXG4gICAgICAgICAgICAgICAgICAgICAgICBHLkxvZ2dlci5sb2coXCLot7Pov4fmm7TmlrBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lKHRydWUpLy/ot7Pov4fmm7TmlrBcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlckdhbWUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gbm9VcGRhdGUg5piv5ZCm6Lez6L+H5pu05pawXG4gICAgICovXG4gICAgcHJpdmF0ZSBlbnRlckdhbWUobm9VcGRhdGU/KSB7XG4gICAgICAgIC8vIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuTE9BRElORylcbiAgICAgICAgbGV0IGNvbmZpZyA9IG5ldyBHYW1lQ29uZmlnKENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mby5nYW1lSWRdLm5hbWUsIENvbmZpZy5nYW1lc1t0aGlzLl9nYW1lSW5mby5nYW1lSWRdLnN1Yk5hbWUsIHRoaXMuX2l0ZW1JZCk7XG4gICAgICAgIGlmIChub1VwZGF0ZSkge1xuICAgICAgICAgICAgZ2FtZU1hbmFnZXIoKS5lbnRlckdhbWVOb1VwZGF0ZShjb25maWcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZU1hbmFnZXIoKS5lbnRlckdhbWUoY29uZmlnKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbei/m+WFpVNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkVudGVyU3Jjb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbeemu+W8gFNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkV4aXRTY3JvbGxWaWV3KCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxufVxuIl19