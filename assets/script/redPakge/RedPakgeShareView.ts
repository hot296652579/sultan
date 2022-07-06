
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import { shareType } from "../platform/android";
import RedPakgeView from "./RedPakgeView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RedPakgeShareView extends UIView {

    @property(cc.Node)
    share: cc.Node = null
    @property(cc.Sprite)
    head: cc.Sprite = null
    @property(cc.Graphics)
    icon: cc.Graphics = null

    @property(cc.Label)
    shareLabel: cc.Label = null

    @property(cc.Label)
    faceBookLabel: cc.Label = null

    @property(cc.Label)
    saveImageLabel: cc.Label = null


    @property(cc.Label)
    copyLineLabel: cc.Label = null

    shareUrl: string = null;
    private _isSaveIamge: boolean = false;

    public static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeShareView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("handleSaveImageToLocal", (isSuccess) => {
            if (isSuccess) {
                this.unscheduleAllCallbacks()
                PanelHelp.showTip(i18n.REDPAKGE.saveSuccess)
                this._isSaveIamge = false;
            }

        });

    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args[0]) {
            this.shareUrl = args[0]
        }
    }
    start() {
        this.initIU()
        Manager.uiManager.getView(RedPakgeView).then((view) => {
            if (view) {
                view.node.active = false
            }
        });
    }
    private initIU() {
        if (this.shareUrl) {
            UtilMgr.loadHeadImg(this.head, User._headImgUrl, User._userID, this)
            let qrcode = this.shareUrl.split("&url=")[1]
            this.createQRcode(decodeURIComponent(qrcode));
            this.shareLabel.language = Manager.makeLanguage("REDPAKGE.shareTo");
            this.faceBookLabel.language = Manager.makeLanguage("REDPAKGE.faceBook");
            this.saveImageLabel.language = Manager.makeLanguage("REDPAKGE.saveImage");
            this.copyLineLabel.language = Manager.makeLanguage("REDPAKGE.copyLink");
        }

    }
    createQRcode(url: string) {
        var qrcode = new window["QRCode"](-1, 3);
        qrcode.addData(url);
        qrcode.make();

        this.icon.fillColor = cc.Color.BLACK;
        //块宽高
        var tileW = this.icon.node.width / qrcode.getModuleCount();
        var tileH = this.icon.node.height / qrcode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    // ctx.fillColor = cc.Color.BLACK;
                    var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                    var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                    this.icon.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    this.icon.fill();
                }
            }
        }
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                Manager.uiManager.getView(RedPakgeView).then((view) => {
                    if (view) {
                        view.node.active = true
                    }
                });
                break;
            case "facebook": this.shareToFacebook(); break;
            case "instagram": this.shareToInstagram(); break;
            case "whatApp": this.shareToWhatsApp(); break;
            case "more": this.onMove(); break;
            case "copy": this.onCopyInvateURL(); break;
            case "save": this.onSaveImage(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    private shareToFacebook() {
        window['platformUtil'].shareToFacebook(shareType.PHOTO, this.shareUrl, this.shareUrl);
    }
    private shareToInstagram() {
        G.ShareHelpder.instagram.shareImage(this.shareUrl);
    }
    private shareToWhatsApp() {
        G.ShareHelpder.whatsapp.shareImage(this.shareUrl);
    }
    private onMove() {
        // G.ShareHelpder.instagram.downRemoteImage(this.shareUrl, (imagePath) => {
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         window['platformUtil'].shareImageToLocal(imagePath);
        //     }
        // })
    }

    private onSaveImage() {
        if (this._isSaveIamge) {
            return
        }
        this._isSaveIamge = true;
        UtilMgr.captureTexture(this.share)
        this.scheduleOnce(() => {
            this._isSaveIamge = false;
        }, 5)
    }

    /**
     * 复制邀请链接
     */
    private onCopyInvateURL(): void {
        let copy = this.shareUrl.split("&url=")[1]
        window['platformUtil'].copyToClip(decodeURIComponent(copy));
    }

    onDestroy() {
        super.onDestroy();
        this.unscheduleAllCallbacks()
    }
}
