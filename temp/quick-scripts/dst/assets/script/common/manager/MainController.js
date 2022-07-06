
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/manager/MainController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFpbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBZ0U7QUFDaEUsdUZBQStEO0FBRS9ELGdEQUFrRDtBQUNsRCxvRUFBNEM7QUFDNUMsdUVBQStDO0FBQy9DLG9EQUFpRDtBQUNqRCw0Q0FBeUM7QUFDekMsNENBQXlDO0FBQ3pDLDZDQUEwQztBQUUxQyxzREFBbUQ7QUFDbkQsdUNBQW9DO0FBQ3BDLGdEQUFnRDtBQUNoRCwyREFBZ0Q7QUFDaEQsdUVBQStDO0FBRy9DLHlFQUFpRDtBQUNqRCwrRUFBdUQ7QUFDdkQsdURBQW9EO0FBR3BELGlFQUF5QztBQUl6Qzs7R0FFRztBQUVILE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFbEQsVUFBVTtBQUNWLE1BQU0saUJBQWlCLEdBQVcsRUFBRSxDQUFDO0FBQ3JDLFdBQVc7QUFDWCxNQUFNLGtCQUFrQixHQUFXLEVBQUUsQ0FBQztBQUN0QyxXQUFXO0FBQ1gsTUFBTSxrQkFBa0IsR0FBVyxFQUFFLENBQUM7QUFJdEMsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsb0JBQXlCO0lBQXJFOztRQUVJLDBCQUEwQjtRQUNsQix5QkFBb0IsR0FBRyxDQUFDLENBQUM7UUFDekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUN6QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUdoQyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFdBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsWUFBTyxHQUFjLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQWMsSUFBSSxDQUFDO0lBb1R2QyxDQUFDO0lBbFRHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUE7UUFF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LE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBRUosQ0FBQTtBQTdURztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNnQjtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNhO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ2M7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDZTtBQWxCbEIsY0FBYztJQUZsQyxPQUFPO0lBQ1AsSUFBSSxDQUFDLHdCQUF3QixDQUFDO0dBQ1YsY0FBYyxDQXNVbEM7a0JBdFVvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgbWFrZUtleSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IHJlU3RhcnRHYW1lIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9HbG9iYWxcIjtcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuLi8uLi9sb2FkaW5nL0xvYWRpbmdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IGFuZHJvaWQgfSBmcm9tIFwiLi4vLi4vcGxhdGZvcm0vYW5kcm9pZFwiO1xuaW1wb3J0IHsgaW9zIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL2lvc1wiO1xuaW1wb3J0IHsgd2ViIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL3dlYlwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IENvbW1vblNlcnZpY2UsIHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBnb1RvTG9naW4gfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL0dsb2JhbFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vLi4vdXNlckluZm8vVXNlckluZm9cIjtcbmltcG9ydCB7IExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBDb25maXJtQm94IGZyb20gXCIuLi8uLi9tc2dib3gvQ29uZmlybUJveFwiO1xuaW1wb3J0IERpc2Nvbm5lY3RXYWl0IGZyb20gXCIuLi8uLi93YWl0L0Rpc2Nvbm5lY3RXYWl0XCI7XG5pbXBvcnQgeyBFdmVudERlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvRXZlbnREZWZpbmVcIjtcbmltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vYmFzZS9Ib3RVcGRhdGVcIjtcbmltcG9ydCB7IGdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBBcHBEYXRhIGZyb20gXCIuLi8uLi9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCB7IFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4u+aOp+WItuWZqCBcbiAqL1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vLyDnva7pobbmjInpkq7pm4bpl7TpmpRcbmNvbnN0IFRPUF9CVE5TX0lOVEVSVkFMOiBudW1iZXIgPSAyMDtcbi8vIOe9rumhtuaMiemSrumbhui+uee8mOWuvVxuY29uc3QgVE9QX0JUTlNfUEFERElOR19XOiBudW1iZXIgPSAyMDtcbi8vIOe9rumhtuaMiemSrumbhui+uee8mOmrmFxuY29uc3QgVE9QX0JUTlNfUEFERElOR19IOiBudW1iZXIgPSA1MDtcblxuQGNjY2xhc3NcbkBtZW51KFwibWFuYWdlci9NYWluQ29udHJvbGxlclwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyPENvbW1vblNlcnZpY2U+IHtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDov5vlhaXlkI7lj7DnmoTml7bpl7QgKi9cbiAgICBwcml2YXRlIF9lbnRlckJhY2tncm91bmRUaW1lID0gMDtcbiAgICBwcml2YXRlIF9hcHBEYXRhOiBBcHBEYXRhID0gbnVsbDtcbiAgICBwcml2YXRlIF9kaWZmV29ybGRQb3M6IGNjLlZlYzIgPSBudWxsO1xuICAgIHByaXZhdGUgX3N0YXJ0TXNnQnRuUG9zOiBjYy5WZWMyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kVG9wQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5Nc2c6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGF5b3V0KVxuICAgIHByaXZhdGUgbGF0QnRuczogY2MuTGF5b3V0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgcHJpdmF0ZSBidG5Ub1RvcDogY2MuQnV0dG9uID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKClcblxuICAgICAgICB0aGlzLl9hcHBEYXRhID0gRy5EYXRhTWdyLmdldChBcHBEYXRhKTtcblxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXSA9IHdlYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19JT1MpIHtcbiAgICAgICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10gPSBpb3M7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXSA9IGFuZHJvaWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hcHBEYXRhLmludmNvZGUgPSB3aW5kb3dbXCJwbGF0Zm9ybVV0aWxcIl0uZ2V0UXVlcnlTdHJpbmcoXCJpbnZjb2RlXCIpO1xuICAgICAgICBHLkxvZ2dlci5jb2xvcihcIumCgOivt+eggVwiLCB0aGlzLl9hcHBEYXRhLmludmNvZGUpO1xuXG4gICAgICAgIC8v5pi+56S6IEZQUyDosIPor5Xkv6Hmga9cbiAgICAgICAgaWYgKENvbmZpZy5XU19VUkwgPT09IFwiMTkyLjE2OC4yLjI1NDoxMDAwMFwiIHx8IENvbmZpZy5XU19VUkwgPT09IFwiZ2FtZS5zdWx0YW43NzcuaW86ODQ0M1wiKSB7XG4gICAgICAgICAgICBjYy5kZWJ1Zy5zZXREaXNwbGF5U3RhdHMoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MuZGVidWcuc2V0RGlzcGxheVN0YXRzKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWKqOaAgeWQiOaJuVxuICAgICAgICAvLyBjYy5tYWNyby5DTEVBTlVQX0lNQUdFX0NBQ0hFID0gZmFsc2U7XG4gICAgICAgIC8vIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIC8vIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIubWF4RnJhbWVTaXplID0gNTEyO1xuICAgICAgICAvLyBjYy5keW5hbWljQXRsYXNNYW5hZ2VyLnNob3dEZWJ1Zyh0cnVlKTtcblxuICAgICAgICB0aGlzLmxhdEJ0bnMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RUb3BCdG4uekluZGV4ID0gOTk5OTtcblxuICAgICAgICBNYW5hZ2VyLmFkYXB0b3Iub25Mb2FkKHRoaXMubm9kZSk7XG5cbiAgICAgICAgLy/mnKzlnLDnvJPlrZjmlbDmja7lupPmiZPlvIBcbiAgICAgICAgTWFuYWdlci5kYXRhQmFzZS5vcGVuKCk7XG5cbiAgICAgICAgLy/lhYjmt7vliqDlhajlsYDnmoTnvZHnu5znu4Tku7ZcbiAgICAgICAgTWFuYWdlci5uZXRNYW5hZ2VyLmFkZE5ldENvbnRyb2xsZXJzKHRoaXMubm9kZSk7XG5cbiAgICAgICAgLy/pooTlhYjliqDovb3pooTnva7kvZNcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIucHJlbG9hZChMb2FkaW5nLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIucHJlbG9hZChDb25maXJtQm94LCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIucHJlbG9hZChEaXNjb25uZWN0V2FpdCwgQlVORExFX1JFU09VUkNFUyk7XG5cbiAgICAgICAgLy/osIPor5XmjInpkq7kuovku7bms6jlhoxcbiAgICAgICAgbGV0IHNob3dVSSA9IGNjLmZpbmQoXCJzaG93VUlcIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgbGV0IHNob3dOb2RlID0gY2MuZmluZChcInNob3dOb2RlXCIsIHRoaXMubm9kZSk7XG4gICAgICAgIGxldCBzaG93UmVzID0gY2MuZmluZChcInNob3dSZXNcIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKHNob3dVSSAmJiBzaG93Tm9kZSAmJiBzaG93UmVzKSB7XG4gICAgICAgICAgICBzaG93VUkuekluZGV4ID0gOTk5OTtcbiAgICAgICAgICAgIHNob3dOb2RlLnpJbmRleCA9IDk5OTk7XG4gICAgICAgICAgICBzaG93UmVzLnpJbmRleCA9IDk5OTk7XG4gICAgICAgICAgICBsZXQgaXNTaG93ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoQ29uZmlnLmlzU2hvd0RlYnVnQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgaXNTaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzaG93VUkub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLnByaW50Vmlld3MoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzaG93Tm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIucHJpbnRDYW52YXNDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNob3dSZXMub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKSA9PSBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgTWFuYWdlci5sYW5ndWFnZS5jaGFuZ2UoY2Muc3lzLkxBTkdVQUdFX0NISU5FU0UpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgTWFuYWdlci5sYW5ndWFnZS5jaGFuZ2UoY2Muc3lzLkxBTkdVQUdFX0VOR0xJU0gpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlU3RhcnRHYW1lKCk7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd1VJLmFjdGl2ZSA9IGlzU2hvdztcbiAgICAgICAgICAgIHNob3dOb2RlLmFjdGl2ZSA9IGlzU2hvdztcbiAgICAgICAgICAgIHNob3dSZXMuYWN0aXZlID0gaXNTaG93O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvYWRpbmdOb2RlID0gY2MuZmluZChcInVwZGF0ZU5vZGVcIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgbG9hZGluZ05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0hBTEwpXG4gICAgICAgIC8vIH0sIDEwMDApO1xuXG4gICAgICAgIC8v5ri45oiP5LqL5Lu25rOo5YaMXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLm9uRW50ZXJCYWNrZ3JvdW5kLCB0aGlzKTtcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25FbnRlckZvcmdlZ3JvdW5kLCB0aGlzKTtcblxuICAgICAgICBjYy5kaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXLCB0aGlzLl9vbkRpcmVjdG9yQWZ0ZXJEcmF3LCB0aGlzKTtcblxuICAgICAgICAvL+mAu+i+keeuoeeQhuWZqFxuICAgICAgICBNYW5hZ2VyLmxvZ2ljTWFuYWdlci5vbkxvYWQodGhpcy5ub2RlKTtcblxuXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIGNjLmdhbWUuc2V0RnJhbWVSYXRlKDYwKTtcblxuICAgICAgICB0aGlzLm9uUmVmcmVzaFZlcnNpb24oKVxuICAgICAgICAvL3dlYiDnqpflj6PlsLrlr7jmlLnlj5hcbiAgICAgICAgY2Mudmlldy5zZXRSZXNpemVDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChcInJlV2luU2l6ZVwiKVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKClcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJSZWZyZXNoVmVyc2lvblwiLCB0aGlzLm9uUmVmcmVzaFZlcnNpb24pO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJPcGVuVXNlckhlYWRJbmZvXCIsIHRoaXMuc2hvd1VzZXJJbmZvKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50RGVmaW5lLk5PVF9MT0dJTl9DTElDS19CVVRUT04sIHRoaXMub25Ob3RMb2dpbkNsaWNrQnV0dG9uKTtcblxuICAgICAgICB0aGlzLmJ0bk1zZy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG9wVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYnRuTXNnLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvcFRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuYnRuTXNnLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG9wVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB0aGlzLmJ0bk1zZy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvcFRvdWNoQ2FuY2VsLCB0aGlzKTtcblxuICAgICAgICAvL+ebkeWQrOi/lOWbnuaMiemSrlxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJoYW5kbGVLZXlCYWNrQ2xpY2tlZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0RpYWxvZygnJywgaTE4bi5USVBTLlFVSVRHQU1FLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5lbmQoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblJlZnJlc2hWZXJzaW9uKCkge1xuICAgICAgICAvL0FQUCDniYjmnKxcbiAgICAgICAgbGV0IHZlcnNpb25Ob2RlID0gY2MuZmluZChcInZlcnNpb25cIiwgdGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKHZlcnNpb25Ob2RlKSB7XG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uZ2V0VmVyc2lvbk5hbWUoKTtcbiAgICAgICAgICAgIGxldCByZXN2ZXJzaW9uID0gd2luZG93WydwbGF0Zm9ybVV0aWwnXS5nZXRSZXNWZXJzaW9uTmFtZSgpO1xuICAgICAgICAgICAgaWYgKHZlcnNpb24pIHtcbiAgICAgICAgICAgICAgICB2ZXJzaW9uTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiQXBwOlwiICsgdmVyc2lvbiArIFwiIFJlczpcIiArIHJlc3ZlcnNpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Ob3RpZnlPdGhlckxvZ2luKGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsIFwib25Ob3RpZnlPdGhlckxvZ2luXCIpXG4gICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBpMThuLkVSUk9SQ09ERVtkYXRhLmVycm9yQ29kZV0sICgpID0+IHtcbiAgICAgICAgICAgIGdvVG9Mb2dpbigpXG4gICAgICAgIH0sIG51bGwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5ri45oiP5a6M5oiQ5LiA5qyh5riy5p+T6L+H56iL5LmL5ZCOICovXG4gICAgcHJpdmF0ZSBfb25EaXJlY3RvckFmdGVyRHJhdygpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub25EaXJlY3RvckFmdGVyRHJhdygpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcblxuICAgICAgICAvL+Wkp+WOhee9kee7nOi/nuaOpeiwg+W6plxuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2UuaGFuZE1lc3NhZ2UoKTtcblxuICAgICAgICAvL+i/nOeoi+i1hOa6kOS4i+i9veS7u+WKoeiwg+W6plxuICAgICAgICBNYW5hZ2VyLmFzc2V0TWFuYWdlci5yZW1vdGUudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKVxuICAgICAgICBHLkxvZ2dlci5sb2coJ+enu+mZpOe9kee7nOe7hOS7ticpO1xuXG4gICAgICAgIE1hbmFnZXIuYWRhcHRvci5vbkRlc3Ryb3koKTtcblxuICAgICAgICAvL+enu+mZpOe9kee7nOe7hOS7tiBcbiAgICAgICAgTWFuYWdlci5uZXRNYW5hZ2VyLnJlbW92ZU5ldENvbnRyb2xsZXJzKHRoaXMubm9kZSk7XG4gICAgICAgIC8v56e76Zmk6ZSu55uY5LqL5Lu2XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQKTtcblxuICAgICAgICAvL+enu+mZpOa4uOaIj+S6i+S7tuazqOWGjFxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX0hJREUpO1xuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1cpO1xuXG4gICAgICAgIC8v6YC76L6R566h55CG5ZmoXG4gICAgICAgIE1hbmFnZXIubG9naWNNYW5hZ2VyLm9uRGVzdHJveSh0aGlzLm5vZGUpO1xuXG5cbiAgICB9XG4gICAgcHJpdmF0ZSBzaG93VXNlckluZm8oZGF0YSkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogVXNlckluZm8sIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUywgYXJnczogW2RhdGFdIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Ob3RMb2dpbkNsaWNrQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRpcHMuU2lsYWthbk1hc3VrKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgb25Ub3BUb3VjaFN0YXJ0KGU6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNsaWNrTG9jYWxQb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoZS5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgbGV0IGJ0bldvcmxkUG9zOiBjYy5WZWMyID0gdGhpcy5idG5Nc2cubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMCwgMCkpO1xuICAgICAgICBsZXQgYnRuTG9jYWxQb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoYnRuV29ybGRQb3MpO1xuICAgICAgICB0aGlzLl9kaWZmV29ybGRQb3MgPSBidG5Mb2NhbFBvcy5zdWIoY2xpY2tMb2NhbFBvcyk7XG4gICAgICAgIHRoaXMuX3N0YXJ0TXNnQnRuUG9zID0gZS5nZXRMb2NhdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Ub3BUb3VjaE1vdmUoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xuICAgICAgICBsZXQgY2xpY2tMb2NhbFBvczogY2MuVmVjMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihlLmdldExvY2F0aW9uKCkpO1xuICAgICAgICB0aGlzLmJ0bk1zZy5ub2RlLnNldFBvc2l0aW9uKGNsaWNrTG9jYWxQb3MuYWRkKHRoaXMuX2RpZmZXb3JsZFBvcykpO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaExhdEJ0bnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVG9wVG91Y2hFbmQoZTogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvcFRvdWNoRW5kKGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Ub3BUb3VjaENhbmNlbChlOiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9wVG91Y2hFbmQoZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0b3BUb3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XG4gICAgICAgIGxldCBidG5Xb3JsZFBvczogY2MuVmVjMiA9IHRoaXMuYnRuTXNnLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcblxuICAgICAgICAvLyDlt6blj7NcbiAgICAgICAgaWYgKGJ0bldvcmxkUG9zLnggLSB0aGlzLmJ0bk1zZy5ub2RlLndpZHRoIC8gMiA8IDAgKyBUT1BfQlROU19QQURESU5HX1cpIHtcbiAgICAgICAgICAgIHRoaXMuYnRuTXNnLm5vZGUueCA9IDAgKyAodGhpcy5idG5Nc2cubm9kZS53aWR0aCAvIDIpIC0gKGNjLndpblNpemUud2lkdGggLyAyKSArIFRPUF9CVE5TX1BBRERJTkdfVztcbiAgICAgICAgfSBlbHNlIGlmIChidG5Xb3JsZFBvcy54ICsgdGhpcy5idG5Nc2cubm9kZS53aWR0aCAvIDIgPiBjYy53aW5TaXplLndpZHRoIC0gVE9QX0JUTlNfUEFERElOR19XKSB7XG4gICAgICAgICAgICB0aGlzLmJ0bk1zZy5ub2RlLnggPSBjYy53aW5TaXplLndpZHRoIC0gKHRoaXMuYnRuTXNnLm5vZGUud2lkdGggLyAyKSAtIChjYy53aW5TaXplLndpZHRoIC8gMikgLSBUT1BfQlROU19QQURESU5HX1c7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDkuIrkuItcbiAgICAgICAgaWYgKGJ0bldvcmxkUG9zLnkgLSB0aGlzLmJ0bk1zZy5ub2RlLmhlaWdodCAvIDIgPCAwICsgVE9QX0JUTlNfUEFERElOR19IKSB7XG4gICAgICAgICAgICB0aGlzLmJ0bk1zZy5ub2RlLnkgPSAwICsgKHRoaXMuYnRuTXNnLm5vZGUuaGVpZ2h0IC8gMikgLSAoY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSArIFRPUF9CVE5TX1BBRERJTkdfSDtcbiAgICAgICAgfSBlbHNlIGlmIChidG5Xb3JsZFBvcy55ICsgdGhpcy5idG5Nc2cubm9kZS5oZWlnaHQgLyAyID4gY2Mud2luU2l6ZS5oZWlnaHQgLSBUT1BfQlROU19QQURESU5HX0gpIHtcbiAgICAgICAgICAgIHRoaXMuYnRuTXNnLm5vZGUueSA9IGNjLndpblNpemUuaGVpZ2h0IC0gKHRoaXMuYnRuTXNnLm5vZGUuaGVpZ2h0IC8gMikgLSAoY2Mud2luU2l6ZS5oZWlnaHQgLyAyKSAtIFRPUF9CVE5TX1BBRERJTkdfSDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb3ZlRGlmZlBvczogY2MuVmVjMiA9IGUuZ2V0TG9jYXRpb24oKS5zdWIodGhpcy5fc3RhcnRNc2dCdG5Qb3MpO1xuICAgICAgICBpZiAoTWF0aC5hYnMobW92ZURpZmZQb3MueCkgPCAxMFxuICAgICAgICAgICAgJiYgTWF0aC5hYnMobW92ZURpZmZQb3MueSkgPCAxMCkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrTXNnKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW50ZXJCYWNrZ3JvdW5kKCkge1xuICAgICAgICB0aGlzLl9lbnRlckJhY2tncm91bmRUaW1lID0gRGF0ZS50aW1lTm93KCk7XG4gICAgICAgIGNjLmxvZyhgW01haW5Db250cm9sbGVyXWAsIGBvbkVudGVyQmFja2dyb3VuZCAke3RoaXMuX2VudGVyQmFja2dyb3VuZFRpbWV9YCk7XG4gICAgICAgIE1hbmFnZXIuZ2xvYmFsQXVkaW8ub25FbnRlckJhY2tncm91bmQoKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLm9uRW50ZXJCYWNrZ3JvdW5kKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVudGVyRm9yZ2Vncm91bmQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbnRlckJhY2tncm91bmRUaW1lID09IDApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBub3cgPSBEYXRlLnRpbWVOb3coKTtcbiAgICAgICAgbGV0IGluQmFja2dyb3VuZFRpbWUgPSBub3cgLSB0aGlzLl9lbnRlckJhY2tncm91bmRUaW1lO1xuICAgICAgICBjYy5sb2coYFtNYWluQ29udHJvbGxlcl1gLCBgb25FbnRlckZvcmdlZ3JvdW5kICR7bm93fSBiYWNrZ3JvdW5kIHRvdGFsIHRpbWUgOiAke2luQmFja2dyb3VuZFRpbWV9YCk7XG4gICAgICAgIE1hbmFnZXIuZ2xvYmFsQXVkaW8ub25FbnRlckZvcmdlZ3JvdW5kKGluQmFja2dyb3VuZFRpbWUpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uub25FbnRlckZvcmdlZ3JvdW5kKGluQmFja2dyb3VuZFRpbWUpO1xuICAgICAgICB0aGlzLl9lbnRlckJhY2tncm91bmRUaW1lID0gMFxuICAgICAgICBpZiAoaW5CYWNrZ3JvdW5kVGltZSA+IDYwKSB7XG4gICAgICAgICAgICByZVN0YXJ0R2FtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54K55Ye7572u6aG25oyJ6ZKuXG4gICAgICovXG4gICAgb25DbGlja1RvVG9wKCk6IHZvaWQge1xuICAgICAgICBsZXQgY3VyclZpZXc6IFVJVmlldyA9IE1hbmFnZXIudWlNYW5hZ2VyLmdldExhc3RWaWV3KCk7XG4gICAgICAgIGlmIChjdXJyVmlldykge1xuICAgICAgICAgICAgY3VyclZpZXcub25TY3JvbGxUb3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHuyBUZWxlZ3JhbSDogYrlpKnlrqRcbiAgICAgKi9cbiAgICBvbkNsaWNrVGVsZWdyYW0oKTogdm9pZCB7XG4gICAgICAgIGNjLnN5cy5vcGVuVVJMKENvbmZpZy5UZWxlZ3JhbVVSTCk7XG4gICAgICAgIHRoaXMubGF0QnRucy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOeCueWHu+WuouacjVxuICAgICAqL1xuICAgIG9uQ2xpY2tTZXJ2aWNlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhdEJ0bnMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hMYXRCdG5zKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubGF0QnRucy5ub2RlLmFjdGl2ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBidG5Xb3JsZFBvczogY2MuVmVjMiA9IHRoaXMuYnRuTXNnLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDApKTtcblxuICAgICAgICBsZXQgbGF0VG9wQnRuUG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGlmIChidG5Xb3JsZFBvcy54ID4gY2Mud2luU2l6ZS53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgIGxhdFRvcEJ0blBvcy54ID0gMCAtICgodGhpcy5idG5Nc2cubm9kZS53aWR0aCAvIDIpICsgKHRoaXMubGF0QnRucy5ub2RlLndpZHRoIC8gMikgKyBUT1BfQlROU19JTlRFUlZBTCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXRUb3BCdG5Qb3MueCA9IDAgKyAoKHRoaXMuYnRuTXNnLm5vZGUud2lkdGggLyAyKSArICh0aGlzLmxhdEJ0bnMubm9kZS53aWR0aCAvIDIpICsgVE9QX0JUTlNfSU5URVJWQUwpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXRCdG5zLm5vZGUucG9zaXRpb24gPSBsYXRUb3BCdG5Qb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog54K55Ye75raI5oGv6ZuG5ZCIXG4gICAgICovXG4gICAgb25DbGlja01zZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYXRCdG5zLm5vZGUuYWN0aXZlID0gIXRoaXMubGF0QnRucy5ub2RlLmFjdGl2ZTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTGF0QnRucygpO1xuICAgIH1cblxufVxuIl19