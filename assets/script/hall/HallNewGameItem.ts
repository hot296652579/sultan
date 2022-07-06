import { gameManager } from "../common/manager/GameManager";
import PanelHelp from "../msgbox/PanelHelp";
import { i18n } from "../common/language/LanguageImpl";
import { GameConfig, HotUpdate } from "../common/base/HotUpdate";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE, ResourceCacheStatus } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { Config } from "../common/config/Config";
import { HallEvent } from "./HallEvent";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { Manager } from "../common/manager/Manager";
import { UtilMgr } from "../global/UtilMgr";
import { reStartGame } from "../global/Global";
import { MST } from "../framework/external/protoc";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class HallNewGameItem extends UIView {
    service: LobbyService;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Sprite)
    gameIcon: cc.Sprite = null;

    @property(sp.Skeleton)
    gameSpine: sp.Skeleton = null;

    @property(cc.Label)
    gameLabel: cc.Label = null;

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

    _itemId = 0;

    // _sortId = 0

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
        this.registerEvent("onCheckUpdateGameStart", this.onCheckUpdateGameStart);
        this.registerEvent("onCheckUpdateGameEnd", this.onCheckUpdateGameEnd);
        this.registerEvent('M2C_TransferMap_Res', this.M2C_TransferMap_Res);
        if (ENABLE_CHANGE_LANGUAGE) {
            // this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    private onCheckUpdateGameStart(gameName) {
        let games = Config.games
        if (this._gameInfo) {
            let configGName = this._gameInfo
            let game = games[configGName]
            if (game) {
                if (game.name && game.name == gameName) {
                    this.loading.active = true
                }
            }
        }
    }
    private onCheckUpdateGameEnd(gameName) {
        let games = Config.games
        if (this._gameInfo) {
            let configGName = this._gameInfo
            let game = games[configGName]
            if (game) {
                if (game.name && game.name == gameName) {
                    this.loading.active = false
                }
            }
        }
    }
    private onDownloadProgess(data: { progress: number, config: GameConfig }) {
        G.Logger.log("onDownloadProgess == ", data.progress);
        if (this._gameInfo && data.config.gameName == Config.games[this._gameInfo].name) {
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
        // this.updateItem(this._gameInfo, this._itemId);
    }
    updateItem(data, itemId) {
        cc.log(data, "HallNewGameItem")
        this._gameInfo = data
        // this._sortId = data.showSort
        this._itemId = itemId;
        if (this.install) this.install.active = false
        if (this.newVersion) this.newVersion.active = false
        let gameConfig = Config.games[data]
        if (CC_JSB) {
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

                // this.refreshGameIcon()
                this.refreshGameSpine()
            }
        }

        // this.refreshGameIcon()
        this.refreshGameSpine()
    }

    refreshGameIcon() {
        let games = Config.games
        let _gameName = games[this._gameInfo].name
        this.icon.loadImage({ url: `hall/images/domino/btn_${_gameName}`, view: this, bundle: BUNDLE_RESOURCES })
        this.gameIcon.loadImage({ url: `hall/images/domino/icon_${_gameName}`, view: this, bundle: BUNDLE_RESOURCES })
        this.gameLabel.string = _gameName
    }

    refreshGameSpine() {
        let self = this
        let games = Config.games
        let _gameName = games[this._gameInfo].subName
        this.gameSpine.loadSkeleton({
            url: `hall/anim/btnEff/${_gameName}/${_gameName}`, view: this, bundle: BUNDLE_RESOURCES, completeCallback: (data) => {
                if (data) {
                    self.gameSpine.animation = "animation";
                    self.gameSpine.loop = true;
                    self.gameSpine.premultipliedAlpha = false;
                }
            }
        });
    }

    onBtnClick(event, type) {
        this.jumpToGame()
    }

    jumpToGame() {
        let req = MST.C2M_TransferMap_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            RoomName: this._gameInfo
        })
        let buffer = MST.C2M_TransferMap_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_TransferMap_Req, MST.OuterOpcode_Map.C2M_TransferMap_Req, buffer);

        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES);
    }

    M2C_TransferMap_Res(data: MST.M2C_TransferMap_Res) {
        if (data && data.RoomName) {
            this._gameInfo = data.RoomName;
            let version = UtilMgr.getGameManifestVersion(Config.games[this._gameInfo].subName)
            G.Logger.log("JoinGame", version)
            if (version) {//游戏已包含
                if (this._gameInfo.gameVersionCode && parseInt(this._gameInfo.gameVersionCode) > parseInt(version)) {//有新版本
                    let versionInfo = HotUpdate.allGameConfig[Config.games[this._gameInfo].subName];
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

    /**
     * 
     * @param noUpdate 是否跳过更新
     */
    private enterGame(noUpdate?) {
        // PanelHelp.showLoading(i18n.WAIT.LOADING)
        let config = new GameConfig(Config.games[this._gameInfo].name, Config.games[this._gameInfo].subName, this._itemId);
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
