"use strict";
cc._RF.push(module, 'dde8d/ge2NAnZGuIw9sPRZx', 'MainController');
// script/common/manager/MainController.ts

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
const Defines_1 = require("../../framework/base/Defines");
const Controller_1 = __importDefault(require("../../framework/controller/Controller"));
const Global_1 = require("../../global/Global");
const Loading_1 = __importDefault(require("../../loading/Loading"));
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const android_1 = require("../../platform/android");
const ios_1 = require("../../platform/ios");
const web_1 = require("../../platform/web");
const Config_1 = require("../config/Config");
const LobbyService_1 = require("../net/LobbyService");
const Manager_1 = require("./Manager");
const Global_2 = require("../../global/Global");
const LanguageImpl_1 = require("../language/LanguageImpl");
const UserInfo_1 = __importDefault(require("../../userInfo/UserInfo"));
const ConfirmBox_1 = __importDefault(require("../../msgbox/ConfirmBox"));
const DisconnectWait_1 = __importDefault(require("../../wait/DisconnectWait"));
const EventDefine_1 = require("../define/EventDefine");
const AppData_1 = __importDefault(require("../../data/AppData"));
/**
 * @description 主控制器
 */
const { ccclass, property, menu } = cc._decorator;
// 置顶按钮集间隔
const TOP_BTNS_INTERVAL = 20;
// 置顶按钮集边缘宽
const TOP_BTNS_PADDING_W = 20;
// 置顶按钮集边缘高
const TOP_BTNS_PADDING_H = 50;
let MainController = class MainController extends Controller_1.default {
    constructor() {
        super(...arguments);
        /**@description 进入后台的时间 */
        this._enterBackgroundTime = 0;
        this._appData = null;
        this._diffWorldPos = null;
        this._startMsgBtnPos = null;
        this.nodTopBtn = null;
        this.btnMsg = null;
        this.latBtns = null;
        this.btnToTop = null;
    }
    onLoad() {
        super.onLoad();
        this._appData = G.DataMgr.get(AppData_1.default);
        if (cc.sys.isBrowser) {
            window['platformUtil'] = web_1.web;
        }
        else if (cc.sys.os === cc.sys.OS_IOS) {
            window['platformUtil'] = ios_1.ios;
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            window['platformUtil'] = android_1.android;
        }
        this._appData.invcode = window["platformUtil"].getQueryString("invcode");
        G.Logger.color("邀请码", this._appData.invcode);
        //显示 FPS 调试信息
        if (Config_1.Config.WS_URL === "192.168.2.254:10000" || Config_1.Config.WS_URL === "game.sultan777.io:8443") {
            cc.debug.setDisplayStats(false);
        }
        else {
            cc.debug.setDisplayStats(true);
        }
        // 动态合批
        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
        // cc.dynamicAtlasManager.maxFrameSize = 512;
        // cc.dynamicAtlasManager.showDebug(true);
        this.latBtns.node.active = false;
        this.nodTopBtn.zIndex = 9999;
        Manager_1.Manager.adaptor.onLoad(this.node);
        //本地缓存数据库打开
        Manager_1.Manager.dataBase.open();
        //先添加全局的网络组件
        Manager_1.Manager.netManager.addNetControllers(this.node);
        //预先加载预置体
        Manager_1.Manager.uiManager.preload(Loading_1.default, Defines_1.BUNDLE_RESOURCES);
        Manager_1.Manager.uiManager.preload(ConfirmBox_1.default, Defines_1.BUNDLE_RESOURCES);
        Manager_1.Manager.uiManager.preload(DisconnectWait_1.default, Defines_1.BUNDLE_RESOURCES);
        //调试按钮事件注册
        let showUI = cc.find("showUI", this.node);
        let showNode = cc.find("showNode", this.node);
        let showRes = cc.find("showRes", this.node);
        if (showUI && showNode && showRes) {
            showUI.zIndex = 9999;
            showNode.zIndex = 9999;
            showRes.zIndex = 9999;
            let isShow = false;
            if (Config_1.Config.isShowDebugButton) {
                isShow = true;
                showUI.on(cc.Node.EventType.TOUCH_END, () => {
                    Manager_1.Manager.uiManager.printViews();
                });
                showNode.on(cc.Node.EventType.TOUCH_END, () => {
                    Manager_1.Manager.uiManager.printCanvasChildren();
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
        Manager_1.Manager.logicManager.onLoad(this.node);
        if (cc.sys.isNative)
            cc.game.setFrameRate(60);
        this.onRefreshVersion();
        //web 窗口尺寸改变
        cc.view.setResizeCallback(function () {
            dispatch("reWinSize");
        });
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("RefreshVersion", this.onRefreshVersion);
        // this.registerEvent("OpenUserHeadInfo", this.showUserInfo);
        this.registerEvent(EventDefine_1.EventDefine.NOT_LOGIN_CLICK_BUTTON, this.onNotLoginClickButton);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_START, this.onTopTouchStart, this);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTopTouchMove, this);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_END, this.onTopTouchEnd, this);
        this.btnMsg.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTopTouchCancel, this);
        //监听返回按钮
        this.registerEvent("handleKeyBackClicked", () => {
            PanelHelp_1.default.showDialog('', LanguageImpl_1.i18n.TIPS.QUITGAME, () => {
                cc.game.end();
            });
        });
    }
    onRefreshVersion() {
        //APP 版本
        let versionNode = cc.find("version", this.node);
        if (versionNode) {
            let version = window['platformUtil'].getVersionName();
            let resversion = window['platformUtil'].getResVersionName();
            if (version) {
                versionNode.getComponent(cc.Label).string = "App:" + version + " Res:" + resversion;
            }
        }
    }
    onNotifyOtherLogin(data) {
        cc.log(data, "onNotifyOtherLogin");
        PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.errorCode], () => {
            Global_2.goToLogin();
        }, null, false);
    }
    /**@description 游戏完成一次渲染过程之后 */
    _onDirectorAfterDraw() {
        Manager_1.Manager.uiManager.onDirectorAfterDraw();
    }
    update() {
        //大厅网络连接调度
        LobbyService_1.LobbyService.instance.handMessage();
        //远程资源下载任务调度
        Manager_1.Manager.assetManager.remote.update();
    }
    onDestroy() {
        super.onDestroy();
        G.Logger.log('移除网络组件');
        Manager_1.Manager.adaptor.onDestroy();
        //移除网络组件 
        Manager_1.Manager.netManager.removeNetControllers(this.node);
        //移除键盘事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP);
        //移除游戏事件注册
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_SHOW);
        //逻辑管理器
        Manager_1.Manager.logicManager.onDestroy(this.node);
    }
    showUserInfo(data) {
        Manager_1.Manager.uiManager.open({ type: UserInfo_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data] });
    }
    onNotLoginClickButton() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tips.SilakanMasuk);
    }
    onTopTouchStart(e) {
        let clickLocalPos = this.node.convertToNodeSpaceAR(e.getLocation());
        let btnWorldPos = this.btnMsg.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let btnLocalPos = this.node.convertToNodeSpaceAR(btnWorldPos);
        this._diffWorldPos = btnLocalPos.sub(clickLocalPos);
        this._startMsgBtnPos = e.getLocation();
    }
    onTopTouchMove(e) {
        let clickLocalPos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.btnMsg.node.setPosition(clickLocalPos.add(this._diffWorldPos));
        this.refreshLatBtns();
    }
    onTopTouchEnd(e) {
        this.topTouchEnd(e);
    }
    onTopTouchCancel(e) {
        this.topTouchEnd(e);
    }
    topTouchEnd(e) {
        let btnWorldPos = this.btnMsg.node.convertToWorldSpaceAR(cc.v2(0, 0));
        // 左右
        if (btnWorldPos.x - this.btnMsg.node.width / 2 < 0 + TOP_BTNS_PADDING_W) {
            this.btnMsg.node.x = 0 + (this.btnMsg.node.width / 2) - (cc.winSize.width / 2) + TOP_BTNS_PADDING_W;
        }
        else if (btnWorldPos.x + this.btnMsg.node.width / 2 > cc.winSize.width - TOP_BTNS_PADDING_W) {
            this.btnMsg.node.x = cc.winSize.width - (this.btnMsg.node.width / 2) - (cc.winSize.width / 2) - TOP_BTNS_PADDING_W;
        }
        // 上下
        if (btnWorldPos.y - this.btnMsg.node.height / 2 < 0 + TOP_BTNS_PADDING_H) {
            this.btnMsg.node.y = 0 + (this.btnMsg.node.height / 2) - (cc.winSize.height / 2) + TOP_BTNS_PADDING_H;
        }
        else if (btnWorldPos.y + this.btnMsg.node.height / 2 > cc.winSize.height - TOP_BTNS_PADDING_H) {
            this.btnMsg.node.y = cc.winSize.height - (this.btnMsg.node.height / 2) - (cc.winSize.height / 2) - TOP_BTNS_PADDING_H;
        }
        let moveDiffPos = e.getLocation().sub(this._startMsgBtnPos);
        if (Math.abs(moveDiffPos.x) < 10
            && Math.abs(moveDiffPos.y) < 10) {
            this.onClickMsg();
        }
    }
    onEnterBackground() {
        this._enterBackgroundTime = Date.timeNow();
        cc.log(`[MainController]`, `onEnterBackground ${this._enterBackgroundTime}`);
        Manager_1.Manager.globalAudio.onEnterBackground();
        LobbyService_1.LobbyService.instance.onEnterBackground();
    }
    onEnterForgeground() {
        if (this._enterBackgroundTime == 0) {
            return;
        }
        let now = Date.timeNow();
        let inBackgroundTime = now - this._enterBackgroundTime;
        cc.log(`[MainController]`, `onEnterForgeground ${now} background total time : ${inBackgroundTime}`);
        Manager_1.Manager.globalAudio.onEnterForgeground(inBackgroundTime);
        LobbyService_1.LobbyService.instance.onEnterForgeground(inBackgroundTime);
        this._enterBackgroundTime = 0;
        if (inBackgroundTime > 60) {
            Global_1.reStartGame();
        }
    }
    /**
     * 点击置顶按钮
     */
    onClickToTop() {
        let currView = Manager_1.Manager.uiManager.getLastView();
        if (currView) {
            currView.onScrollTop();
        }
    }
    /**
     * 点击 Telegram 聊天室
     */
    onClickTelegram() {
        cc.sys.openURL(Config_1.Config.TelegramURL);
        this.latBtns.node.active = false;
    }
    /**
     * 点击客服
     */
    onClickService() {
        this.latBtns.node.active = false;
    }
    refreshLatBtns() {
        if (!this.latBtns.node.active) {
            return;
        }
        let btnWorldPos = this.btnMsg.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let latTopBtnPos = cc.v2(0, 0);
        if (btnWorldPos.x > cc.winSize.width / 2) {
            latTopBtnPos.x = 0 - ((this.btnMsg.node.width / 2) + (this.latBtns.node.width / 2) + TOP_BTNS_INTERVAL);
        }
        else {
            latTopBtnPos.x = 0 + ((this.btnMsg.node.width / 2) + (this.latBtns.node.width / 2) + TOP_BTNS_INTERVAL);
        }
        this.latBtns.node.position = latTopBtnPos;
    }
    /**
     * 点击消息集合
     */
    onClickMsg() {
        this.latBtns.node.active = !this.latBtns.node.active;
        this.refreshLatBtns();
    }
};
__decorate([
    property(cc.Node)
], MainController.prototype, "nodTopBtn", void 0);
__decorate([
    property(cc.Button)
], MainController.prototype, "btnMsg", void 0);
__decorate([
    property(cc.Layout)
], MainController.prototype, "latBtns", void 0);
__decorate([
    property(cc.Button)
], MainController.prototype, "btnToTop", void 0);
MainController = __decorate([
    ccclass,
    menu("manager/MainController")
], MainController);
exports.default = MainController;

cc._RF.pop();