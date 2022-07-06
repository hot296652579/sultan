"use strict";
cc._RF.push(module, '82a04879jJLPoe7gziQvrXH', 'ShareView');
// script/share/ShareView.ts

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
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const android_1 = require("../platform/android");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const { ccclass, property } = cc._decorator;
let ShareView = class ShareView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon = null;
        this.link = null;
        this.kuang = null;
        this.panelbg = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
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
    createQRcode(url) {
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
        let url = User_1.User._promoteUrl;
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
            case "close":
                this.closeWithAction();
                break;
            case "facebook":
                this.shareToFacebook();
                break;
            case "instagram":
                this.shareToInstagram();
                break;
            case "whatsApp":
                this.shareToWhatsApp();
                break;
        }
    }
    shareToFacebook() {
        window['platformUtil'].shareToFacebook(android_1.shareType.PHOTO, User_1.User._promoteUrl, User_1.User._shareImgUrl);
    }
    shareToInstagram() {
        G.ShareHelpder.instagram.shareImage(User_1.User._shareImgUrl);
    }
    shareToWhatsApp() {
        G.ShareHelpder.whatsapp.shareImage(User_1.User._shareImgUrl);
    }
    reqShare() {
        let req = CommonService_1.protoPackage.hall.base.Share.create({ userId: User_1.User._userID });
        let buffer = CommonService_1.protoPackage.hall.base.Share.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.SHARE, buffer);
    }
    /**
     * 复制邀请链接
     */
    onCopyInvateURL() {
        window['platformUtil'].copyToClip(User_1.User._promoteUrl);
        this.playDefaultEffect();
    }
    start() {
        if (this.panelbg) {
            let exclusiveLink = this.panelbg.getChildByName('exclusiveLink');
            exclusiveLink.getComponent(cc.Label).language = LanguageImpl_1.i18n.SHARE.EXCLUSIVELINK;
            let shareTo = this.panelbg.getChildByName('layout_share').getChildByName('shareTo');
            shareTo.getComponent(cc.Label).language = LanguageImpl_1.i18n.SHARE.SHARETO;
        }
    }
};
__decorate([
    property(cc.Graphics)
], ShareView.prototype, "icon", void 0);
__decorate([
    property(cc.Label)
], ShareView.prototype, "link", void 0);
__decorate([
    property(cc.Sprite)
], ShareView.prototype, "kuang", void 0);
__decorate([
    property(cc.Node)
], ShareView.prototype, "panelbg", void 0);
ShareView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], ShareView);
exports.default = ShareView;

cc._RF.pop();