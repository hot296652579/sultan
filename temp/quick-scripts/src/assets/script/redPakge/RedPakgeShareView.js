"use strict";
cc._RF.push(module, 'fd336vQ58NHtr+BlU7voD7o', 'RedPakgeShareView');
// script/redPakge/RedPakgeShareView.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const android_1 = require("../platform/android");
const RedPakgeView_1 = __importDefault(require("./RedPakgeView"));
const { ccclass, property } = cc._decorator;
let RedPakgeShareView = class RedPakgeShareView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.share = null;
        this.head = null;
        this.icon = null;
        this.shareLabel = null;
        this.faceBookLabel = null;
        this.saveImageLabel = null;
        this.copyLineLabel = null;
        this.shareUrl = null;
        this._isSaveIamge = false;
    }
    static getPrefabUrl() {
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
                this.unscheduleAllCallbacks();
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REDPAKGE.saveSuccess);
                this._isSaveIamge = false;
            }
        });
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args[0]) {
            this.shareUrl = args[0];
        }
    }
    start() {
        this.initIU();
        Manager_1.Manager.uiManager.getView(RedPakgeView_1.default).then((view) => {
            if (view) {
                view.node.active = false;
            }
        });
    }
    initIU() {
        if (this.shareUrl) {
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, User_1.User._headImgUrl, User_1.User._userID, this);
            let qrcode = this.shareUrl.split("&url=")[1];
            this.createQRcode(decodeURIComponent(qrcode));
            this.shareLabel.language = Manager_1.Manager.makeLanguage("REDPAKGE.shareTo");
            this.faceBookLabel.language = Manager_1.Manager.makeLanguage("REDPAKGE.faceBook");
            this.saveImageLabel.language = Manager_1.Manager.makeLanguage("REDPAKGE.saveImage");
            this.copyLineLabel.language = Manager_1.Manager.makeLanguage("REDPAKGE.copyLink");
        }
    }
    createQRcode(url) {
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
                Manager_1.Manager.uiManager.getView(RedPakgeView_1.default).then((view) => {
                    if (view) {
                        view.node.active = true;
                    }
                });
                break;
            case "facebook":
                this.shareToFacebook();
                break;
            case "instagram":
                this.shareToInstagram();
                break;
            case "whatApp":
                this.shareToWhatsApp();
                break;
            case "more":
                this.onMove();
                break;
            case "copy":
                this.onCopyInvateURL();
                break;
            case "save":
                this.onSaveImage();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    shareToFacebook() {
        window['platformUtil'].shareToFacebook(android_1.shareType.PHOTO, this.shareUrl, this.shareUrl);
    }
    shareToInstagram() {
        G.ShareHelpder.instagram.shareImage(this.shareUrl);
    }
    shareToWhatsApp() {
        G.ShareHelpder.whatsapp.shareImage(this.shareUrl);
    }
    onMove() {
        // G.ShareHelpder.instagram.downRemoteImage(this.shareUrl, (imagePath) => {
        //     if (cc.sys.os === cc.sys.OS_ANDROID) {
        //         window['platformUtil'].shareImageToLocal(imagePath);
        //     }
        // })
    }
    onSaveImage() {
        if (this._isSaveIamge) {
            return;
        }
        this._isSaveIamge = true;
        UtilMgr_1.UtilMgr.captureTexture(this.share);
        this.scheduleOnce(() => {
            this._isSaveIamge = false;
        }, 5);
    }
    /**
     * 复制邀请链接
     */
    onCopyInvateURL() {
        let copy = this.shareUrl.split("&url=")[1];
        window['platformUtil'].copyToClip(decodeURIComponent(copy));
    }
    onDestroy() {
        super.onDestroy();
        this.unscheduleAllCallbacks();
    }
};
__decorate([
    property(cc.Node)
], RedPakgeShareView.prototype, "share", void 0);
__decorate([
    property(cc.Sprite)
], RedPakgeShareView.prototype, "head", void 0);
__decorate([
    property(cc.Graphics)
], RedPakgeShareView.prototype, "icon", void 0);
__decorate([
    property(cc.Label)
], RedPakgeShareView.prototype, "shareLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeShareView.prototype, "faceBookLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeShareView.prototype, "saveImageLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeShareView.prototype, "copyLineLabel", void 0);
RedPakgeShareView = __decorate([
    ccclass
], RedPakgeShareView);
exports.default = RedPakgeShareView;

cc._RF.pop();