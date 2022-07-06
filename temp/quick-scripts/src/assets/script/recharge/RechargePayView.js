"use strict";
cc._RF.push(module, '91a236ji4BO56S2JbXsnltv', 'RechargePayView');
// script/recharge/RechargePayView.ts

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
const EventApi_1 = require("../framework/event/EventApi");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RechargePayView = class RechargePayView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgWebViewBG = null;
        this.wbvPayPage = null;
        this.nodError = null;
        this.imgLoading = null;
        // 支付地址 URL
        this.m_url = null;
        // 加载转动动画
        this.m_animLoading = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "recharge/prefabs/RechargePayView";
    }
    bindingEvents() {
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_CLOSE, () => {
            this.hideLoading();
            this.hideWebViewBG();
            this.hideWebView();
            this.showError();
        });
        this.wbvPayPage.node.on('loaded', () => {
            this.hideLoading();
            this.hideError();
            this.showWebView();
            this.showWebViewBG();
        });
        this.wbvPayPage.node.on("error", () => {
            this.showError();
        });
        this.wbvPayPage.node.on("loading", () => {
            this.showLoading();
        });
        this.registerEvent("updateUserInfo", () => {
            this.onClickClose();
        });
    }
    onLoad() {
        super.onLoad();
        this.initView();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    initView() {
        this.hideLoading();
        this.hideWebViewBG();
        // this.hideWebView();
        this.hideError();
    }
    showLoading() {
        if (this.m_animLoading) {
            this.m_animLoading.stop();
            this.m_animLoading = null;
        }
        this.m_animLoading = cc.tween(this.imgLoading.node)
            .by(2, { angle: -360 })
            .repeatForever()
            .start();
        this.imgLoading.node.active = true;
    }
    hideLoading() {
        if (this.m_animLoading) {
            this.m_animLoading.stop();
        }
        this.m_animLoading = null;
        this.imgLoading.node.active = false;
    }
    showWebViewBG() {
        this.imgWebViewBG.node.active = true;
    }
    hideWebViewBG() {
        this.imgWebViewBG.node.active = false;
    }
    showWebView() {
        this.wbvPayPage.node.active = true;
    }
    hideWebView() {
        this.wbvPayPage.node.active = false;
    }
    showError() {
        this.nodError.active = true;
    }
    hideError() {
        this.nodError.active = false;
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        this.m_url = args[0];
        G.Logger.log("支付网址：", this.m_url);
        this.wbvPayPage.url = this.m_url;
    }
    onClickRetry() {
        this.wbvPayPage.url = "";
        this.wbvPayPage.url = this.m_url;
    }
    onClickClose() {
        this.hideWebView();
        this.hideWebViewBG();
        this.closeWithAction();
    }
};
__decorate([
    property(cc.Sprite)
], RechargePayView.prototype, "imgWebViewBG", void 0);
__decorate([
    property(cc.WebView)
], RechargePayView.prototype, "wbvPayPage", void 0);
__decorate([
    property(cc.Node)
], RechargePayView.prototype, "nodError", void 0);
__decorate([
    property(cc.Sprite)
], RechargePayView.prototype, "imgLoading", void 0);
RechargePayView = __decorate([
    ccclass
], RechargePayView);
exports.default = RechargePayView;

cc._RF.pop();