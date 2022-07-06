import { gameManager } from "../common/manager/GameManager";
import PanelHelp from "../msgbox/PanelHelp";
import { i18n } from "../common/language/LanguageImpl";
import { GameConfig, HotUpdate } from "../common/base/HotUpdate";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { Config } from "../common/config/Config";
import { HallEvent } from "./HallEvent";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { protoPackage, serverType } from "../common/net/CommonService";
import { Manager } from "../common/manager/Manager";
import { UtilMgr } from "../global/UtilMgr";
import { reStartGame } from "../global/Global";
import { LogicEvent } from "../common/event/LogicEvent";
import { EventApi } from "../framework/event/EventApi";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class HallGameItem extends UIView {
    service: LobbyService;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Sprite)
    picName: cc.Sprite = null;

    @property(cc.Node)
    install: cc.Node = null;
    @property(cc.Node)
    newVersion: cc.Node = null;
    @property(cc.Node)
    loading: cc.Node = null;
    @property(cc.Node)
    iconWait: cc.Node = null;

    @property(sp.Skeleton)
    gameSpine: sp.Skeleton = null;

    @property(sp.SkeletonData)
    crash: sp.SkeletonData = null;

    _itemId = 0;

    _sortId = 0

    _gameInfo = null;

    _path = "hall/images/dt_game_icon_";
    _pathEN = "hall/images/dt_game_name_";
    _pathHI = "languageRes/hindi/hall/dt_game_name_";

    _language: string = '';
    onLoad() {
        super.onLoad()
        cc.tween(this.iconWait)
            .repeatForever(cc.tween().by(0.3, { angle: 30 })
                .delay(0.01))
            .start()
        this.loading.active = false
        this._language = Manager.language.getLanguage();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(HallEvent.DOWNLOAD_PROGRESS, this.onDownloadProgess);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CheckPlayerJoinGameReq), this.onCheckPlayerJoinGame);
        this.registerEvent("onCheckUpdateGameStart", this.onCheckUpdateGameStart);
        this.registerEvent("onCheckUpdateGameEnd", this.onCheckUpdateGameEnd);
        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    private onCheckUpdateGameStart(gameName) {
        if (this._gameInfo && gameName == Config.games[this._gameInfo.gameId].name) {
            if (this.loading) this.loading.active = true
        }
    }
    private onCheckUpdateGameEnd(gameName) {
        if (this._gameInfo && gameName == Config.games[this._gameInfo.gameId].name) {
            if (this.loading) this.loading.active = false
        }
    }
    private onDownloadProgess(data: { progress: number, config: GameConfig }) {
        G.Logger.log("onDownloadProgess == ", data.progress);
        if (this._gameInfo && data.config.gameName == Config.games[this._gameInfo.gameId].name) {
            let progressBar: cc.ProgressBar = cc.find(`Background/progressBar`, this.node).getComponent(cc.ProgressBar);
            let progressLabel: cc.Label = cc.find(`Background/progressBar/progress`, this.node).getComponent(cc.Label);
            if (data.progress == -1) {
                progressBar.node.active = false;
                PanelHelp.showTip(i18n.TIPS.DOWNLOADFAILED)
            } else if (data.progress <= 1) {
                progressBar.node.active = true;
                if (data.progress > progressBar.progress) {
                    progressBar.progress = data.progress;
                    progressLabel.string = "" + Math.floor(data.progress * 100) + "%";
                }

            } else {
                progressBar.node.active = false;
                if (this.install) this.install.active = false
                if (this.newVersion) this.newVersion.active = false
                PanelHelp.showTip(i18n.TIPS.DOWNLOADSUCCEED)
            }
        }
    }
    onLanguageChange(language) {
        this._language = language;
        this.updateItem(this._gameInfo, this._itemId);
    }
    updateItem(data, itemId) {
        cc.log(data, "HallGameItem")
        this._gameInfo = data
        this._sortId = data.showSort
        this._itemId = itemId;
        if (this.install) this.install.active = false
        if (this.newVersion) this.newVersion.active = false
        if (CC_JSB) {

            let gameConfig = Config.games[data.gameId]
            if (gameConfig) {
                let install = UtilMgr.checkGameInstall(gameConfig.subName)
                if (this.install) this.install.active = !install
                G.Logger.log("==install==", install);

                if (install) {
                    let version = UtilMgr.getGameManifestVersion(gameConfig.subName)
                    if (version) {
                        G.Logger.log("==version==", version);
                        if (this._gameInfo.gameVersionCode && this._gameInfo.gameVersionCode > version) {
                            if (this.newVersion) this.newVersion.active = true
                        }
                    } else {
                        if (this.newVersion) this.newVersion.active = true
                    }
                }
            }
        }

        let spine = this.getGameSpineByGameID(data.gameId)
        if (spine) {
            this.icon.node.active = false
            this.gameSpine.node.active = true
            this.gameSpine.skeletonData = spine
            this.gameSpine.setAnimation(0, "newAnimation", true)
            let path = this._pathEN; // 汉语要报错
            if (this._language === cc.sys.LANGUAGE_ENGLISH) path = this._pathEN;
            if (this._language === cc.sys.LANGUAGE_HINDI) path = this._pathHI;
            let namePath = path + data.gameId;
            if (data.gameId == 900018) return; //暂时 斗鸡没有图片 先屏蔽
            this.picName.loadImage({ url: namePath, view: this, bundle: BUNDLE_RESOURCES });
        } else {
            this.icon.node.active = true
            this.gameSpine.node.active = false

            let iconPath = this._path + data.gameId
            this.icon.loadImage({ url: iconPath, view: this, bundle: BUNDLE_RESOURCES })
        }
    }

    getGameSpineByGameID(gameId) {
        switch (gameId) {
            case Config.GameId.Crash:
                return this.crash;
            default:
                return null
        }
    }

    onBtnClick(event, type) {
        if (this._gameInfo.isOpen) {
            PanelHelp.showLoading(i18n.Waiting.EnterGame)
            let options = {
                gameId: this._gameInfo.gameId
            }
            let req = protoPackage.hall.CheckPlayerJoinGameReq.create(options);
            let buffer = protoPackage.hall.CheckPlayerJoinGameReq.encode(req).finish();
            this.service.sendMsg(serverType.Lobby,
                protoPackage.hall.HallCmd.CMD_CheckPlayerJoinGameReq,
                buffer);
            // let config = new GameConfig(Config.games[this._gameInfo.gameId].name, Config.games[this._gameInfo.gameId].subName, this._itemId);
            // gameManager().enterGame(config);
        } else {
            PanelHelp.showTip(i18n.TIPS.NOTOPENPLEASEWAIT)
        }
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES);
    }

    onCheckPlayerJoinGame(msg) {
        if (this._gameInfo && msg.gameId == this._gameInfo.gameId) {
            if (msg.currentGameId) {
                let gameName = Config.games[msg.currentGameId].disName
                PanelHelp.showMsgBox('', String.format(i18n.TIPS.CHECKJOINGAME, gameName))
            } else {
                let version = UtilMgr.getGameManifestVersion(Config.games[this._gameInfo.gameId].subName)
                G.Logger.log("JoinGame", version)
                if (version) {//游戏已包含
                    if (this._gameInfo.gameVersionCode && parseInt(this._gameInfo.gameVersionCode) > parseInt(version)) {//有新版本
                        let versionInfo = HotUpdate.allGameConfig[Config.games[this._gameInfo.gameId].subName];
                        if (versionInfo && versionInfo.isLoaded) {//游戏加载过
                            PanelHelp.showDialog("", i18n.TIPS.GAMENEWVERSION, () => {
                                reStartGame()
                            }, () => {
                                this.enterGame()
                            })
                        } else {
                            this.enterGame()
                        }
                    } else {//不更新
                        G.Logger.log("跳过更新")
                        this.enterGame(true)//跳过更新

                    }
                } else {
                    this.enterGame()
                }
            }
        }
    }
    /**
     * 
     * @param noUpdate 是否跳过更新
     */
    private enterGame(noUpdate?) {
        // PanelHelp.showLoading(i18n.WAIT.LOADING)
        let config = new GameConfig(Config.games[this._gameInfo.gameId].name, Config.games[this._gameInfo.gameId].subName, this._itemId);
        if (noUpdate) {
            gameManager().enterGameNoUpdate(config);
        } else {
            gameManager().enterGame(config);
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
}
