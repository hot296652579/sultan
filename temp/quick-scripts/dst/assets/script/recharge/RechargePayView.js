
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/RechargePayView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvUmVjaGFyZ2VQYXlWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXVEO0FBQ3ZELG9FQUE0QztBQUU1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLGdCQUFNO0lBQW5EOztRQUdZLGlCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLGVBQVUsR0FBZSxJQUFJLENBQUM7UUFHOUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixlQUFVLEdBQWMsSUFBSSxDQUFDO1FBRXJDLFdBQVc7UUFDSCxVQUFLLEdBQVcsSUFBSSxDQUFDO1FBQzdCLFNBQVM7UUFDRCxrQkFBYSxHQUFhLElBQUksQ0FBQztRQXFIdkMsaUJBQWlCO0lBQ3JCLENBQUM7SUFwSFUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxrQ0FBa0MsQ0FBQztJQUM5QyxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJ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LElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyQixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVPLFlBQVk7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVPLFlBQVk7UUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUdKLENBQUE7QUFwSUc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDbUI7QUFHdkM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzttREFDaUI7QUFHdEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDZTtBQUdqQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNpQjtBQVpwQixlQUFlO0lBRG5DLE9BQU87R0FDYSxlQUFlLENBdUluQztrQkF2SW9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlUGF5VmlldyBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaW1nV2ViVmlld0JHOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLldlYlZpZXcpXG4gICAgcHJpdmF0ZSB3YnZQYXlQYWdlOiBjYy5XZWJWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHByaXZhdGUgbm9kRXJyb3I6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0xvYWRpbmc6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICAvLyDmlK/ku5jlnLDlnYAgVVJMXG4gICAgcHJpdmF0ZSBtX3VybDogc3RyaW5nID0gbnVsbDtcbiAgICAvLyDliqDovb3ovazliqjliqjnlLtcbiAgICBwcml2YXRlIG1fYW5pbUxvYWRpbmc6IGNjLlR3ZWVuID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJyZWNoYXJnZS9wcmVmYWJzL1JlY2hhcmdlUGF5Vmlld1wiO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5OZXRFdmVudC5PTl9DTE9TRSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgdGhpcy5oaWRlV2ViVmlld0JHKCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVXZWJWaWV3KCk7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvcigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndidlBheVBhZ2Uubm9kZS5vbignbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgdGhpcy5oaWRlRXJyb3IoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dlYlZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dlYlZpZXdCRygpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLndidlBheVBhZ2Uubm9kZS5vbihcImVycm9yXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndidlBheVBhZ2Uubm9kZS5vbihcImxvYWRpbmdcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJ1cGRhdGVVc2VySW5mb1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrQ2xvc2UoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbWdCZycpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgICAgICB0aGlzLmhpZGVXZWJWaWV3QkcoKTtcbiAgICAgICAgLy8gdGhpcy5oaWRlV2ViVmlldygpO1xuICAgICAgICB0aGlzLmhpZGVFcnJvcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0xvYWRpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fYW5pbUxvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubV9hbmltTG9hZGluZy5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLm1fYW5pbUxvYWRpbmcgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tX2FuaW1Mb2FkaW5nID0gY2MudHdlZW4odGhpcy5pbWdMb2FkaW5nLm5vZGUpXG4gICAgICAgICAgICAuYnkoMiwgeyBhbmdsZTogLTM2MCB9KVxuICAgICAgICAgICAgLnJlcGVhdEZvcmV2ZXIoKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuaW1nTG9hZGluZy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoaWRlTG9hZGluZygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9hbmltTG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy5tX2FuaW1Mb2FkaW5nLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fYW5pbUxvYWRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLmltZ0xvYWRpbmcubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dXZWJWaWV3QkcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nV2ViVmlld0JHLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVXZWJWaWV3QkcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nV2ViVmlld0JHLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93V2ViVmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YnZQYXlQYWdlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZGVXZWJWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLndidlBheVBhZ2Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dFcnJvcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ub2RFcnJvci5hY3RpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUVycm9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5vZEVycm9yLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuXG4gICAgICAgIHRoaXMubV91cmwgPSBhcmdzWzBdO1xuXG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcIuaUr+S7mOe9keWdgO+8mlwiLCB0aGlzLm1fdXJsKTtcblxuICAgICAgICB0aGlzLndidlBheVBhZ2UudXJsID0gdGhpcy5tX3VybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tSZXRyeSgpOiB2b2lkIHsgXG4gICAgICAgIHRoaXMud2J2UGF5UGFnZS51cmwgPSBcIlwiO1xuICAgICAgICB0aGlzLndidlBheVBhZ2UudXJsID0gdGhpcy5tX3VybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWRlV2ViVmlldygpO1xuICAgICAgICB0aGlzLmhpZGVXZWJWaWV3QkcoKTtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19