import { BUNDLE_RESOURCES } from "../../framework/base/Defines";
import Controller from "../../framework/controller/Controller";
import { makeKey } from "../../framework/decorator/Decorators";
import { reStartGame } from "../../global/Global";
import Loading from "../../loading/Loading";
import PanelHelp from "../../msgbox/PanelHelp";
import { android } from "../../platform/android";
import { ios } from "../../platform/ios";
import { web } from "../../platform/web";
import { Config } from "../config/Config";
import { CommonService, protoPackage, serverType } from "../net/CommonService";
import { LobbyService } from "../net/LobbyService";
import { Manager } from "./Manager";
import { goToLogin } from "../../global/Global";
import { i18n } from "../language/LanguageImpl";
import UserInfo from "../../userInfo/UserInfo";
import { LogicEvent } from "../event/LogicEvent";
import { MST } from "../../framework/external/protoc";
import ConfirmBox from "../../msgbox/ConfirmBox";
import DisconnectWait from "../../wait/DisconnectWait";
import { EventDefine } from "../define/EventDefine";
import { GameConfig } from "../base/HotUpdate";
import { gameManager } from "./GameManager";
import AppData from "../../data/AppData";
import { RequestPackge } from "../../framework/net/HttpClient";
import UIView from "../../framework/ui/UIView";

/**
 * @description 主控制器 
 */

const { ccclass, property, menu } = cc._decorator;

// 置顶按钮集间隔
const TOP_BTNS_INTERVAL: number = 20;
// 置顶按钮集边缘宽
const TOP_BTNS_PADDING_W: number = 20;
// 置顶按钮集边缘高
const TOP_BTNS_PADDING_H: number = 50;

@ccclass
@menu("manager/MainController")
export default class MainController extends Controller<CommonService> {

    /**@description 进入后台的时间 */
    private _enterBackgroundTime = 0;
    private _appData: AppData = null;
    private _diffWorldPos: cc.Vec2 = null;
    private _startMsgBtnPos: cc.Vec2 = null;

    @property(cc.Node)
    private nodTopBtn: cc.Node = null;

    @property(cc.Button)
    private btnMsg: cc.Button = null;

    @property(cc.Layout)
    private latBtns: cc.Layout = null;

    @property(cc.Button)
    private btnToTop: cc.Button = null;

    onLoad() {
        super.onLoad()

        this._appData = G.DataMgr.get(AppData);

        if (cc.sys.isBrowser) {
            window['platformUtil'] = web;
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            window['platformUtil'] = ios;
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            window['platformUtil'] = android;
        }

        this._appData.invcode = window["platformUtil"].getQueryString("invcode");
        G.Logger.color("邀请码", this._appData.invcode);

        //显示 FPS 调试信息
        if (Config.WS_URL === "192.168.2.254:10000" || Config.WS_URL === "game.sultan777.io:8443") {
            cc.debug.setDisplayStats(false);
        } else {
            cc.debug.setDisplayStats(true);
        }
        // 动态合批
        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
        // cc.dynamicAtlasManager.maxFrameSize = 512;
        // cc.dynamicAtlasManager.showDebug(true);

        this.latBtns.node.active = false;
        this.nodTopBtn.zIndex = 9999;

        Manager.adaptor.onLoad(this.node);

        //本地缓存数据库打开
        Manager.dataBase.open();

        //先添加全局的网络组件
        Manager.netManager.addNetControllers(this.node);

        //预先加载预置体
        Manager.uiManager.preload(Loading, BUNDLE_RESOURCES);
        Manager.uiManager.preload(ConfirmBox, BUNDLE_RESOURCES);
        Manager.uiManager.preload(DisconnectWait, BUNDLE_RESOURCES);

        //调试按钮事件注册
        let showUI = cc.find("showUI", this.node);
        let showNode = cc.find("showNode", this.node);
        let showRes = cc.find("showRes", this.node);
        if (showUI && showNode && showRes) {
            showUI.zIndex = 9999;
            showNode.zIndex = 9999;
            showRes.zIndex = 9999;
            let isShow = false;
            if (Config.isShowDebugButton) {
                isShow = true;
                showUI.on(cc.Node.EventType.TOUCH_END, () => {
                    Manager.uiManager.printViews();
                });
                showNode.on(cc.Node.EventType.TOUCH_END, () => {
                    Manager.uiManager.printCanvasChildren();
                });
                showRes.on(cc.Node.EventType.TOUCH_END, () => {

                    // if (Manager.language.getLanguage() == cc.sys.LANGUAGE_ENGLISH) {
                    //     Manager.language.change(cc.sys.LANGUAGE_CHINESE);
                    // } else {
                    //     Manager.language.change(cc.sys.LANGUAGE_ENGLISH);
                    // }
                    // reStartGame();


                });
            }
            showUI.active = isShow;
            showNode.active = isShow;
            showRes.active = isShow;
        }

        let loadingNode = cc.find("updateNode", this.node);
        loadingNode.active = true;
        // setTimeout(() => {
        //     dispatch(LogicEvent.ENTER_HALL)
        // }, 1000);

        //游戏事件注册
        cc.game.on(cc.game.EVENT_HIDE, this.onEnterBackground, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onEnterForgeground, this);

        cc.director.on(cc.Director.EVENT_AFTER_DRAW, this._onDirectorAfterDraw, this);

        //逻辑管理器
        Manager.logicManager.onLoad(this.node);


        if (cc.sys.isNative) cc.game.setFrameRate(60);

        this.onRefreshVersion()
        //web 窗口尺寸改变
        cc.view.setResizeCallback(function () {
            dispatch("reWinSize")
        });

    }

    protected bindingEvents() {
        super.bindingEvents()

        this.registerEvent("RefreshVersion", this.onRefreshVersion);
        // this.registerEvent("OpenUserHeadInfo", this.showUserInfo);
        this.registerEvent(EventDefine.NOT_LOGIN_CLICK_BUTTON, this.onNotLoginClickButton);

        this.btnMsg.node.on(cc.Node.EventType.TOUCH_START, this.onTopTouchStart, this);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTopTouchMove, this);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_END, this.onTopTouchEnd, this);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTopTouchCancel, this);

        //监听返回按钮
        this.registerEvent("handleKeyBackClicked", () => {
            PanelHelp.showDialog('', i18n.TIPS.QUITGAME, () => {
                cc.game.end()
            });
        })
    }

    private onRefreshVersion() {
        //APP 版本
        let versionNode = cc.find("version", this.node);
        if (versionNode) {
            let version = window['platformUtil'].getVersionName();
            let resversion = window['platformUtil'].getResVersionName();
            if (version) {
                versionNode.getComponent(cc.Label).string = "App:" + version + " Res:" + resversion
            }
        }
    }

    private onNotifyOtherLogin(data) {
        cc.log(data, "onNotifyOtherLogin")
        PanelHelp.showMsgBox('', i18n.ERRORCODE[data.errorCode], () => {
            goToLogin()
        }, null, false);
    }

    /**@description 游戏完成一次渲染过程之后 */
    private _onDirectorAfterDraw() {
        Manager.uiManager.onDirectorAfterDraw();
    }

    update() {

        //大厅网络连接调度
        LobbyService.instance.handMessage();

        //远程资源下载任务调度
        Manager.assetManager.remote.update();
    }

    onDestroy() {
        super.onDestroy()
        G.Logger.log('移除网络组件');

        Manager.adaptor.onDestroy();

        //移除网络组件 
        Manager.netManager.removeNetControllers(this.node);
        //移除键盘事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP);

        //移除游戏事件注册
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_SHOW);

        //逻辑管理器
        Manager.logicManager.onDestroy(this.node);


    }
    private showUserInfo(data) {
        Manager.uiManager.open({ type: UserInfo, bundle: BUNDLE_RESOURCES, args: [data] });
    }

    private onNotLoginClickButton(): void {
        PanelHelp.showTip(i18n.Tips.SilakanMasuk);
    }


    private onTopTouchStart(e: cc.Event.EventTouch): void {
        let clickLocalPos: cc.Vec2 = this.node.convertToNodeSpaceAR(e.getLocation());
        let btnWorldPos: cc.Vec2 = this.btnMsg.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let btnLocalPos: cc.Vec2 = this.node.convertToNodeSpaceAR(btnWorldPos);
        this._diffWorldPos = btnLocalPos.sub(clickLocalPos);
        this._startMsgBtnPos = e.getLocation();
    }

    private onTopTouchMove(e: cc.Event.EventTouch): void {
        let clickLocalPos: cc.Vec2 = this.node.convertToNodeSpaceAR(e.getLocation());
        this.btnMsg.node.setPosition(clickLocalPos.add(this._diffWorldPos));

        this.refreshLatBtns();
    }

    private onTopTouchEnd(e: cc.Event.EventTouch): void {
        this.topTouchEnd(e);
    }

    private onTopTouchCancel(e: cc.Event.EventTouch): void {
        this.topTouchEnd(e);
    }

    private topTouchEnd(e: cc.Event.EventTouch): void {
        let btnWorldPos: cc.Vec2 = this.btnMsg.node.convertToWorldSpaceAR(cc.v2(0, 0));

        // 左右
        if (btnWorldPos.x - this.btnMsg.node.width / 2 < 0 + TOP_BTNS_PADDING_W) {
            this.btnMsg.node.x = 0 + (this.btnMsg.node.width / 2) - (cc.winSize.width / 2) + TOP_BTNS_PADDING_W;
        } else if (btnWorldPos.x + this.btnMsg.node.width / 2 > cc.winSize.width - TOP_BTNS_PADDING_W) {
            this.btnMsg.node.x = cc.winSize.width - (this.btnMsg.node.width / 2) - (cc.winSize.width / 2) - TOP_BTNS_PADDING_W;
        }

        // 上下
        if (btnWorldPos.y - this.btnMsg.node.height / 2 < 0 + TOP_BTNS_PADDING_H) {
            this.btnMsg.node.y = 0 + (this.btnMsg.node.height / 2) - (cc.winSize.height / 2) + TOP_BTNS_PADDING_H;
        } else if (btnWorldPos.y + this.btnMsg.node.height / 2 > cc.winSize.height - TOP_BTNS_PADDING_H) {
            this.btnMsg.node.y = cc.winSize.height - (this.btnMsg.node.height / 2) - (cc.winSize.height / 2) - TOP_BTNS_PADDING_H;
        }

        let moveDiffPos: cc.Vec2 = e.getLocation().sub(this._startMsgBtnPos);
        if (Math.abs(moveDiffPos.x) < 10
            && Math.abs(moveDiffPos.y) < 10) {
            this.onClickMsg();
        }
    }

    private onEnterBackground() {
        this._enterBackgroundTime = Date.timeNow();
        cc.log(`[MainController]`, `onEnterBackground ${this._enterBackgroundTime}`);
        Manager.globalAudio.onEnterBackground();
        LobbyService.instance.onEnterBackground();
    }

    private onEnterForgeground() {
        if (this._enterBackgroundTime == 0) {
            return
        }
        let now = Date.timeNow();
        let inBackgroundTime = now - this._enterBackgroundTime;
        cc.log(`[MainController]`, `onEnterForgeground ${now} background total time : ${inBackgroundTime}`);
        Manager.globalAudio.onEnterForgeground(inBackgroundTime);
        LobbyService.instance.onEnterForgeground(inBackgroundTime);
        this._enterBackgroundTime = 0
        if (inBackgroundTime > 60) {
            reStartGame();
        }
    }

    /**
     * 点击置顶按钮
     */
    onClickToTop(): void {
        let currView: UIView = Manager.uiManager.getLastView();
        if (currView) {
            currView.onScrollTop();
        }
    }

    /**
     * 点击 Telegram 聊天室
     */
    onClickTelegram(): void {
        cc.sys.openURL(Config.TelegramURL);
        this.latBtns.node.active = false;
    }

    /**
     * 点击客服
     */
    onClickService(): void {
        this.latBtns.node.active = false;
    }

    private refreshLatBtns(): void {
        if (!this.latBtns.node.active) {
            return;
        }
        let btnWorldPos: cc.Vec2 = this.btnMsg.node.convertToWorldSpaceAR(cc.v2(0, 0));

        let latTopBtnPos: cc.Vec2 = cc.v2(0, 0);
        if (btnWorldPos.x > cc.winSize.width / 2) {
            latTopBtnPos.x = 0 - ((this.btnMsg.node.width / 2) + (this.latBtns.node.width / 2) + TOP_BTNS_INTERVAL);
        } else {
            latTopBtnPos.x = 0 + ((this.btnMsg.node.width / 2) + (this.latBtns.node.width / 2) + TOP_BTNS_INTERVAL);
        }

        this.latBtns.node.position = latTopBtnPos;
    }

    /**
     * 点击消息集合
     */
    onClickMsg(): void {
        this.latBtns.node.active = !this.latBtns.node.active;
        this.refreshLatBtns();
    }

}
