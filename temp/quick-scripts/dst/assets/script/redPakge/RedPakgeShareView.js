
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeShareView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VTaGFyZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBQ3BELG9FQUE0QztBQUM1Qyx5Q0FBc0M7QUFDdEMsK0NBQTRDO0FBQzVDLG9FQUE0QztBQUM1QyxpREFBZ0Q7QUFDaEQsa0VBQTBDO0FBRTFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsZ0JBQU07SUFBckQ7O1FBR0ksVUFBSyxHQUFZLElBQUksQ0FBQTtRQUVyQixTQUFJLEdBQWMsSUFBSSxDQUFBO1FBRXRCLFNBQUksR0FBZ0IsSUFBSSxDQUFBO1FBR3hCLGVBQVUsR0FBYSxJQUFJLENBQUE7UUFHM0Isa0JBQWEsR0FBYSxJQUFJLENBQUE7UUFHOUIsbUJBQWMsR0FBYSxJQUFJLENBQUE7UUFJL0Isa0JBQWEsR0FBYSxJQUFJLENBQUE7UUFFOUIsYUFBUSxHQUFXLElBQUksQ0FBQztRQUNoQixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQXNJMUMsQ0FBQztJQXBJVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLG9DQUFvQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2RCxDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsSUFBSSxDQUFD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SSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNULENBQUM7SUFFRDs7T0FFRztJQUNLLGVBQWU7UUFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDMUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxTQUFTO1FBQ0wsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ2pDLENBQUM7Q0FDSixDQUFBO0FBMUpHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0c7QUFFckI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDRTtBQUV0QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDOytDQUNFO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1E7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDVztBQUc5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNZO0FBSS9CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1c7QUFwQmIsaUJBQWlCO0lBRHJDLE9BQU87R0FDYSxpQkFBaUIsQ0E2SnJDO2tCQTdKb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgc2hhcmVUeXBlIH0gZnJvbSBcIi4uL3BsYXRmb3JtL2FuZHJvaWRcIjtcbmltcG9ydCBSZWRQYWtnZVZpZXcgZnJvbSBcIi4vUmVkUGFrZ2VWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVNoYXJlVmlldyBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzaGFyZTogY2MuTm9kZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGhlYWQ6IGNjLlNwcml0ZSA9IG51bGxcbiAgICBAcHJvcGVydHkoY2MuR3JhcGhpY3MpXG4gICAgaWNvbjogY2MuR3JhcGhpY3MgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2hhcmVMYWJlbDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZmFjZUJvb2tMYWJlbDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2F2ZUltYWdlTGFiZWw6IGNjLkxhYmVsID0gbnVsbFxuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY29weUxpbmVMYWJlbDogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBzaGFyZVVybDogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF9pc1NhdmVJYW1nZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInJlZFBha2dlL3ByZWZhYnMvUmVkUGFrZ2VTaGFyZVZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcblxuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiaGFuZGxlU2F2ZUltYWdlVG9Mb2NhbFwiLCAoaXNTdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKClcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFRFBBS0dFLnNhdmVTdWNjZXNzKVxuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2F2ZUlhbWdlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIGlmIChhcmdzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXJlVXJsID0gYXJnc1swXVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXRJVSgpXG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLmdldFZpZXcoUmVkUGFrZ2VWaWV3KS50aGVuKCh2aWV3KSA9PiB7XG4gICAgICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgICAgIHZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBpbml0SVUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNoYXJlVXJsKSB7XG4gICAgICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaGVhZCwgVXNlci5faGVhZEltZ1VybCwgVXNlci5fdXNlcklELCB0aGlzKVxuICAgICAgICAgICAgbGV0IHFyY29kZSA9IHRoaXMuc2hhcmVVcmwuc3BsaXQoXCImdXJsPVwiKVsxXVxuICAgICAgICAgICAgdGhpcy5jcmVhdGVRUmNvZGUoZGVjb2RlVVJJQ29tcG9uZW50KHFyY29kZSkpO1xuICAgICAgICAgICAgdGhpcy5zaGFyZUxhYmVsLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRURQQUtHRS5zaGFyZVRvXCIpO1xuICAgICAgICAgICAgdGhpcy5mYWNlQm9va0xhYmVsLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJSRURQQUtHRS5mYWNlQm9va1wiKTtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUltYWdlTGFiZWwubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlJFRFBBS0dFLnNhdmVJbWFnZVwiKTtcbiAgICAgICAgICAgIHRoaXMuY29weUxpbmVMYWJlbC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiUkVEUEFLR0UuY29weUxpbmtcIik7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBjcmVhdGVRUmNvZGUodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyB3aW5kb3dbXCJRUkNvZGVcIl0oLTEsIDMpO1xuICAgICAgICBxcmNvZGUuYWRkRGF0YSh1cmwpO1xuICAgICAgICBxcmNvZGUubWFrZSgpO1xuXG4gICAgICAgIHRoaXMuaWNvbi5maWxsQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcbiAgICAgICAgLy/lnZflrr3pq5hcbiAgICAgICAgdmFyIHRpbGVXID0gdGhpcy5pY29uLm5vZGUud2lkdGggLyBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICAgICAgdmFyIHRpbGVIID0gdGhpcy5pY29uLm5vZGUuaGVpZ2h0IC8gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XG5cbiAgICAgICAgLy8gZHJhdyBpbiB0aGUgR3JhcGhpY3NcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocXJjb2RlLmlzRGFyayhyb3csIGNvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3R4LmZpbGxDb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IChNYXRoLmNlaWwoKGNvbCArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihjb2wgKiB0aWxlVykpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IChNYXRoLmNlaWwoKHJvdyArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihyb3cgKiB0aWxlVykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24ucmVjdChNYXRoLnJvdW5kKGNvbCAqIHRpbGVXKSwgTWF0aC5yb3VuZChyb3cgKiB0aWxlSCksIHcsIGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24uZmlsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLmdldFZpZXcoUmVkUGFrZ2VWaWV3KS50aGVuKCh2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3Lm5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZmFjZWJvb2tcIjogdGhpcy5zaGFyZVRvRmFjZWJvb2soKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaW5zdGFncmFtXCI6IHRoaXMuc2hhcmVUb0luc3RhZ3JhbSgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3aGF0QXBwXCI6IHRoaXMuc2hhcmVUb1doYXRzQXBwKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1vcmVcIjogdGhpcy5vbk1vdmUoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY29weVwiOiB0aGlzLm9uQ29weUludmF0ZVVSTCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzYXZlXCI6IHRoaXMub25TYXZlSW1hZ2UoKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNoYXJlVG9GYWNlYm9vaygpIHtcbiAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5zaGFyZVRvRmFjZWJvb2soc2hhcmVUeXBlLlBIT1RPLCB0aGlzLnNoYXJlVXJsLCB0aGlzLnNoYXJlVXJsKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzaGFyZVRvSW5zdGFncmFtKCkge1xuICAgICAgICBHLlNoYXJlSGVscGRlci5pbnN0YWdyYW0uc2hhcmVJbWFnZSh0aGlzLnNoYXJlVXJsKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBzaGFyZVRvV2hhdHNBcHAoKSB7XG4gICAgICAgIEcuU2hhcmVIZWxwZGVyLndoYXRzYXBwLnNoYXJlSW1hZ2UodGhpcy5zaGFyZVVybCk7XG4gICAgfVxuICAgIHByaXZhdGUgb25Nb3ZlKCkge1xuICAgICAgICAvLyBHLlNoYXJlSGVscGRlci5pbnN0YWdyYW0uZG93blJlbW90ZUltYWdlKHRoaXMuc2hhcmVVcmwsIChpbWFnZVBhdGgpID0+IHtcbiAgICAgICAgLy8gICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XG4gICAgICAgIC8vICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5zaGFyZUltYWdlVG9Mb2NhbChpbWFnZVBhdGgpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TYXZlSW1hZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1NhdmVJYW1nZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNTYXZlSWFtZ2UgPSB0cnVlO1xuICAgICAgICBVdGlsTWdyLmNhcHR1cmVUZXh0dXJlKHRoaXMuc2hhcmUpXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2F2ZUlhbWdlID0gZmFsc2U7XG4gICAgICAgIH0sIDUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSN5Yi26YKA6K+36ZO+5o6lXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkNvcHlJbnZhdGVVUkwoKTogdm9pZCB7XG4gICAgICAgIGxldCBjb3B5ID0gdGhpcy5zaGFyZVVybC5zcGxpdChcIiZ1cmw9XCIpWzFdXG4gICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcChkZWNvZGVVUklDb21wb25lbnQoY29weSkpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpXG4gICAgfVxufVxuIl19