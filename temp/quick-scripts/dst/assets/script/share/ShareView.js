
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/share/ShareView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2hhcmUvU2hhcmVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUUxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBQzVDLHlDQUFzQztBQUd0QyxpREFBZ0Q7QUFDaEQsa0VBQXVEO0FBRXZELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixTQUFTLEdBQTlCLE1BQXFCLFNBQVUsU0FBUSxnQkFBTTtJQUE3Qzs7UUFHSSxTQUFJLEdBQWdCLElBQUksQ0FBQztRQUd6QixTQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLFVBQUssR0FBYyxJQUFJLENBQUM7UUFHeEIsWUFBTyxHQUFZLElBQUksQ0FBQztRQTRHeEIsaUJBQWlCO0lBQ3JCLENBQUM7SUF4R1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyx5QkFBeUIsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFXO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFD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Q0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsbUJBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBRXpFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwRixPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsbUJBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBRWhFO0lBRUwsQ0FBQztDQUdKLENBQUE7QUF0SEc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzt1Q0FDRztBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VDQUNHO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0NBQ0k7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswQ0FDTTtBQVpQLFNBQVM7SUFGN0IsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsU0FBUyxDQXlIN0I7a0JBekhvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgc2hhcmVUeXBlIH0gZnJvbSBcIi4uL3BsYXRmb3JtL2FuZHJvaWRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmVWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPntcblxuICAgIEBwcm9wZXJ0eShjYy5HcmFwaGljcylcbiAgICBpY29uOiBjYy5HcmFwaGljcyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGluazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBrdWFuZzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBhbmVsYmc6IGNjLk5vZGUgPSBudWxsO1xuICAgIFxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInNoYXJlL3ByZWZhYnMvU2hhcmVWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5rdWFuZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcblxuICAgICAgICB0aGlzLnNoYXJlSW5mbygpO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVRUmNvZGUodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyB3aW5kb3dbXCJRUkNvZGVcIl0oLTEsIDIpO1xuICAgICAgICBxcmNvZGUuYWRkRGF0YSh1cmwpO1xuICAgICAgICBxcmNvZGUubWFrZSgpO1xuXG4gICAgICAgIHRoaXMuaWNvbi5maWxsQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcbiAgICAgICAgLy/lnZflrr3pq5hcbiAgICAgICAgdmFyIHRpbGVXID0gdGhpcy5pY29uLm5vZGUud2lkdGggLyBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICAgICAgdmFyIHRpbGVIID0gdGhpcy5pY29uLm5vZGUuaGVpZ2h0IC8gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XG5cbiAgICAgICAgLy8gZHJhdyBpbiB0aGUgR3JhcGhpY3NcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocXJjb2RlLmlzRGFyayhyb3csIGNvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3R4LmZpbGxDb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IChNYXRoLmNlaWwoKGNvbCArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihjb2wgKiB0aWxlVykpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IChNYXRoLmNlaWwoKHJvdyArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihyb3cgKiB0aWxlVykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24ucmVjdChNYXRoLnJvdW5kKGNvbCAqIHRpbGVXKSwgTWF0aC5yb3VuZChyb3cgKiB0aWxlSCksIHcsIGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24uZmlsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNoYXJlSW5mbygpIHtcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gVXNlci5fcHJvbW90ZVVybDtcbiAgICAgICAgdGhpcy5jcmVhdGVRUmNvZGUodXJsKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh1cmwubGVuZ3RoID4gMjQpIHtcbiAgICAgICAgICAgIHVybCA9IHVybC5zbGljZSgwLCAyNCkgKyBcIi4uLlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saW5rLnN0cmluZyA9IHVybDtcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgdGhpcy5rdWFuZy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImZhY2Vib29rXCI6IHRoaXMuc2hhcmVUb0ZhY2Vib29rKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImluc3RhZ3JhbVwiOiB0aGlzLnNoYXJlVG9JbnN0YWdyYW0oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwid2hhdHNBcHBcIjogdGhpcy5zaGFyZVRvV2hhdHNBcHAoKTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaGFyZVRvRmFjZWJvb2soKSB7XG4gICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uc2hhcmVUb0ZhY2Vib29rKHNoYXJlVHlwZS5QSE9UTywgVXNlci5fcHJvbW90ZVVybCwgVXNlci5fc2hhcmVJbWdVcmwpO1xuICAgIH1cbiAgICBzaGFyZVRvSW5zdGFncmFtKCkge1xuICAgICAgICBHLlNoYXJlSGVscGRlci5pbnN0YWdyYW0uc2hhcmVJbWFnZShVc2VyLl9zaGFyZUltZ1VybCk7XG4gICAgfVxuICAgIHNoYXJlVG9XaGF0c0FwcCgpIHtcbiAgICAgICAgRy5TaGFyZUhlbHBkZXIud2hhdHNhcHAuc2hhcmVJbWFnZShVc2VyLl9zaGFyZUltZ1VybCk7XG4gICAgfVxuICAgIHJlcVNoYXJlKCkge1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5TaGFyZS5jcmVhdGUoeyB1c2VySWQ6IFVzZXIuX3VzZXJJRCB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLmJhc2UuU2hhcmUuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlNIQVJFLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpI3liLbpgoDor7fpk77mjqVcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uQ29weUludmF0ZVVSTCgpOiB2b2lkIHtcbiAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5jb3B5VG9DbGlwKFVzZXIuX3Byb21vdGVVcmwpO1xuICAgICAgICB0aGlzLnBsYXlEZWZhdWx0RWZmZWN0KClcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYodGhpcy5wYW5lbGJnKXtcbiAgICAgICAgICAgIGxldCBleGNsdXNpdmVMaW5rID0gdGhpcy5wYW5lbGJnLmdldENoaWxkQnlOYW1lKCdleGNsdXNpdmVMaW5rJyk7XG4gICAgICAgICAgICBleGNsdXNpdmVMaW5rLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBpMThuLlNIQVJFLkVYQ0xVU0lWRUxJTks7XG5cbiAgICAgICAgICAgIGxldCBzaGFyZVRvID0gdGhpcy5wYW5lbGJnLmdldENoaWxkQnlOYW1lKCdsYXlvdXRfc2hhcmUnKS5nZXRDaGlsZEJ5TmFtZSgnc2hhcmVUbycpO1xuICAgICAgICAgICAgc2hhcmVUby5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gaTE4bi5TSEFSRS5TSEFSRVRPO1xuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==