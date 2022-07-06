import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import { shareType } from "../platform/android";
import { i18n } from "../common/language/LanguageImpl";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class ShareView extends UIView implements IController<LobbyService>{

    @property(cc.Graphics)
    icon: cc.Graphics = null;

    @property(cc.Label)
    link: cc.Label = null;

    @property(cc.Sprite)
    kuang: cc.Sprite = null;

    @property(cc.Node)
    panelbg: cc.Node = null;
    
    service: LobbyService;


    public static getPrefabUrl() {
        return "share/prefabs/ShareView";
    }

    onLoad() {
        super.onLoad();
        this.kuang.node.active = false;
        this.content = this.node.getChildByName('content');

        this.shareInfo();
    }

    bindingEvents() {
        super.bindingEvents();
    }

    createQRcode(url: string) {
        var qrcode = new window["QRCode"](-1, 2);
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

    shareInfo() {
        let url: string = User._promoteUrl;
        this.createQRcode(url);
        
        if (url.length > 24) {
            url = url.slice(0, 24) + "...";
        }

        this.link.string = url;
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        this.kuang.node.active = true;
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "facebook": this.shareToFacebook(); break;
            case "instagram": this.shareToInstagram(); break;
            case "whatsApp": this.shareToWhatsApp(); break;
        }
    }

    shareToFacebook() {
        window['platformUtil'].shareToFacebook(shareType.PHOTO, User._promoteUrl, User._shareImgUrl);
    }
    shareToInstagram() {
        G.ShareHelpder.instagram.shareImage(User._shareImgUrl);
    }
    shareToWhatsApp() {
        G.ShareHelpder.whatsapp.shareImage(User._shareImgUrl);
    }
    reqShare() {
        let req = protoPackage.hall.base.Share.create({ userId: User._userID });
        let buffer = protoPackage.hall.base.Share.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.SHARE,
            buffer);
    }

    /**
     * 复制邀请链接
     */
    private onCopyInvateURL(): void {
        window['platformUtil'].copyToClip(User._promoteUrl);
        this.playDefaultEffect()
    }

    start() {
        if(this.panelbg){
            let exclusiveLink = this.panelbg.getChildByName('exclusiveLink');
            exclusiveLink.getComponent(cc.Label).language = i18n.SHARE.EXCLUSIVELINK;

            let shareTo = this.panelbg.getChildByName('layout_share').getChildByName('shareTo');
            shareTo.getComponent(cc.Label).language = i18n.SHARE.SHARETO;

        }
        
    }

    // update (dt) {}
}
