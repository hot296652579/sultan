import { EventApi } from "../framework/event/EventApi";
import UIView from "../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RechargePayView extends UIView {

    @property(cc.Sprite)
    private imgWebViewBG: cc.Sprite = null;

    @property(cc.WebView)
    private wbvPayPage: cc.WebView = null;

    @property(cc.Node)
    private nodError: cc.Node = null;

    @property(cc.Sprite)
    private imgLoading: cc.Sprite = null;

    // 支付地址 URL
    private m_url: string = null;
    // 加载转动动画
    private m_animLoading: cc.Tween = null;

    public static getPrefabUrl() {
        return "recharge/prefabs/RechargePayView";
    }

    bindingEvents() {
        this.registerEvent(EventApi.NetEvent.ON_CLOSE, () => {
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
        })
        this.wbvPayPage.node.on("error", () => {
            this.showError();
        });
        this.wbvPayPage.node.on("loading", () => {
            this.showLoading();
        });

        this.registerEvent("updateUserInfo", ()=>{
            this.onClickClose()
        });
    }

    onLoad() {
        super.onLoad();

        this.initView();
        this.content = this.node.getChildByName('imgBg');
    }

    start() {

    }

    private initView(): void {
        this.hideLoading();
        this.hideWebViewBG();
        // this.hideWebView();
        this.hideError();
    }

    private showLoading(): void {
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

    private hideLoading(): void {
        if (this.m_animLoading) {
            this.m_animLoading.stop();
        }
        this.m_animLoading = null;
        this.imgLoading.node.active = false;
    }

    private showWebViewBG(): void {
        this.imgWebViewBG.node.active = true;
    }

    private hideWebViewBG(): void {
        this.imgWebViewBG.node.active = false;
    }

    private showWebView(): void {
        this.wbvPayPage.node.active = true;
    }

    private hideWebView(): void {
        this.wbvPayPage.node.active = false;
    }

    private showError(): void {
        this.nodError.active = true;
    }

    private hideError(): void {
        this.nodError.active = false;
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);

        this.m_url = args[0];

        G.Logger.log("支付网址：", this.m_url);

        this.wbvPayPage.url = this.m_url;
    }

    private onClickRetry(): void { 
        this.wbvPayPage.url = "";
        this.wbvPayPage.url = this.m_url;
    }

    private onClickClose(): void {
        this.hideWebView();
        this.hideWebViewBG();
        this.closeWithAction();
    }

    // update (dt) {}
}
