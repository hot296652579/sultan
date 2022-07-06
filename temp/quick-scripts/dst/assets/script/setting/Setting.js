
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/setting/Setting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7dd8d8JnYhJzbKuNo0ShgP+', 'Setting');
// script/setting/Setting.ts

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
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const Global_1 = require("../global/Global");
const User_1 = require("../global/User");
const ConfirmBox_1 = require("../msgbox/ConfirmBox");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const SetSecondaryPwdView_1 = require("../withdrawal/SetSecondaryPwdView");
const Defines_1 = require("../framework/base/Defines");
const EventApi_1 = require("../framework/event/EventApi");
const { ccclass, property } = cc._decorator;
let Setting = class Setting extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.title = null;
        this.musiclabel = null;
        this.effectlabel = null;
        this.btnlabel = null;
        this.languagelabel = null;
        this.musicToggle = null;
        this.effectToggle = null;
        this.switchacc = null;
        this.languageItem = null;
        this.resetNode = null;
        this.resetItemNode = null;
        this.scrollView = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "setting/prefabs/Setting";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.title.language = LanguageImpl_1.i18n.SETTING.TITTLE;
        this.musiclabel.language = LanguageImpl_1.i18n.SETTING.MUSIC;
        this.effectlabel.language = LanguageImpl_1.i18n.SETTING.EFFECT;
        this.btnlabel.language = LanguageImpl_1.i18n.SETTING.CHANGEID;
        let isMusicOn = Manager_1.Manager.globalAudio.isMusicOn ? true : false;
        cc.log(Manager_1.Manager.globalAudio.isMusicOn, "第三方第三方都是");
        this.musicToggle.isChecked = isMusicOn;
        this.musicToggle.node.getChildByName('Background').active = !isMusicOn;
        let isEffectOn = Manager_1.Manager.globalAudio.isEffectOn ? true : false;
        this.effectToggle.isChecked = isEffectOn;
        this.effectToggle.node.getChildByName('Background').active = !isEffectOn;
        this.languagelabel.language = LanguageImpl_1.i18n.SETTING.LANGUAGE;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_PushResetNewPlayerGuid), this.resetGuid);
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, () => { this.languagelabel.language = LanguageImpl_1.i18n.SETTING.LANGUAGE; });
        }
    }
    resetGuid(data) {
        if (data) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.SETTING.RESETGUIDTIPSUCC);
            let donotDelete = [];
            User_1.User._gameIds.forEach(id => {
                if (id == 2001 || id == 2002 || id == 2003) {
                    donotDelete.push(id);
                }
            });
            User_1.User._gameIds = [];
            User_1.User._gameIds = User_1.User._gameIds.concat(donotDelete);
        }
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0] && args[0].isGame) {
            this.switchacc.active = false;
            this.languageItem.active = false;
            this.resetNode.active = false;
        }
        this.resetItemNode.active = !!User_1.User._phone && this.node.parent.getChildByName('HallView') != null;
        if (this.resetItemNode.active) {
            this.scrollView.enabled = true;
            this.scrollView.scrollToTop();
        }
        else {
            this.scrollView.enabled = false;
        }
    }
    onClick(name, node) {
        switch (name) {
            case "musicToggle":
                this.click_music(node);
                break;
            case "effectToggle":
                this.click_effect(node);
                break;
            case "switchacc":
                this.click_switchacc();
                break;
            case "close":
                this.closeWithAction();
                break;
            case "resetPwd":
                dispatch('toResetPwdView');
                this.closeWithAction();
                break;
            case "resetSCPwd":
                dispatch('openSetSecondaryPwdView', SetSecondaryPwdView_1.SettSecondaryPwdType.reset);
                this.closeWithAction();
                break;
            case "resetGuid":
                PanelHelp_1.default.showDialog("", LanguageImpl_1.i18n.SETTING.RESETGUIDTIP, () => {
                    let req = CommonService_1.protoPackage.hall.ReqResetNewPlayerGuid.create({ gameId: 0 });
                    let buffer = CommonService_1.protoPackage.hall.ReqResetNewPlayerGuid.encode(req).finish();
                    this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ReqResetNewPlayerGuid, buffer);
                }, null, ConfirmBox_1.ConfirmBoxBtnSprite.btn_Cancel, ConfirmBox_1.ConfirmBoxBtnSprite.btn_Reset);
                break;
            case "languageBtn":
                dispatch('openLanguageChangeView');
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    click_switchacc() {
        Global_1.goToLogin();
    }
    click_music(node) {
        let isChecked = node.getComponent(cc.Toggle).isChecked;
        let background = node.getChildByName("Background");
        background.active = !isChecked;
        Manager_1.Manager.globalAudio.setMusicEnabled(isChecked, true);
    }
    click_effect(node) {
        let isChecked = node.getComponent(cc.Toggle).isChecked;
        let background = node.getChildByName("Background");
        background.active = !isChecked;
        Manager_1.Manager.globalAudio.isEffectOn = isChecked;
    }
    start() {
    }
};
__decorate([
    property(cc.Label)
], Setting.prototype, "title", void 0);
__decorate([
    property(cc.Label)
], Setting.prototype, "musiclabel", void 0);
__decorate([
    property(cc.Label)
], Setting.prototype, "effectlabel", void 0);
__decorate([
    property(cc.Label)
], Setting.prototype, "btnlabel", void 0);
__decorate([
    property(cc.Label)
], Setting.prototype, "languagelabel", void 0);
__decorate([
    property(cc.Toggle)
], Setting.prototype, "musicToggle", void 0);
__decorate([
    property(cc.Toggle)
], Setting.prototype, "effectToggle", void 0);
__decorate([
    property(cc.Node)
], Setting.prototype, "switchacc", void 0);
__decorate([
    property(cc.Node)
], Setting.prototype, "languageItem", void 0);
__decorate([
    property(cc.Node)
], Setting.prototype, "resetNode", void 0);
__decorate([
    property(cc.Node)
], Setting.prototype, "resetItemNode", void 0);
__decorate([
    property(cc.ScrollView)
], Setting.prototype, "scrollView", void 0);
Setting = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], Setting);
exports.default = Setting;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2V0dGluZy9TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0VBQXVEO0FBQ3ZELHVEQUFvRDtBQUNwRCwrREFBdUU7QUFDdkUsNkRBQTBEO0FBQzFELGtFQUEyRTtBQUMzRSxvRUFBNEM7QUFDNUMsNkNBQTZDO0FBQzdDLHlDQUFzQztBQUN0QyxxREFBMkQ7QUFDM0Qsb0VBQTRDO0FBQzVDLDJFQUF5RTtBQUN6RSx1REFBbUU7QUFDbkUsMERBQXVEO0FBR3ZELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixPQUFPLEdBQTVCLE1BQXFCLE9BQVEsU0FBUSxnQkFBTTtJQUEzQzs7UUFHSSxVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFFNUIsZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixrQkFBYSxHQUFhLElBQUksQ0FBQztRQUkvQixnQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixpQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZUFBVSxHQUFrQixJQUFJLENBQUM7UUFtSGpDLGlCQUFpQjtJQUNyQixDQUFDO0lBakhVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FB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QUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswQ0FDUTtBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNZO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7MkNBQ1M7QUFwQ2hCLE9BQU87SUFGM0IsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsT0FBTyxDQXdKM0I7a0JBeEpvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naWNFdmVudCB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IGdvVG9Mb2dpbiB9IGZyb20gXCIuLi9nbG9iYWwvR2xvYmFsXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgeyBDb25maXJtQm94QnRuU3ByaXRlIH0gZnJvbSBcIi4uL21zZ2JveC9Db25maXJtQm94XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBTZXR0U2Vjb25kYXJ5UHdkVHlwZSB9IGZyb20gXCIuLi93aXRoZHJhd2FsL1NldFNlY29uZGFyeVB3ZFZpZXdcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtdXNpY2xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGVmZmVjdGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYnRubGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYW5ndWFnZWxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXG4gICAgbXVzaWNUb2dnbGU6IGNjLlRvZ2dsZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIGVmZmVjdFRvZ2dsZTogY2MuVG9nZ2xlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHN3aXRjaGFjYzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsYW5ndWFnZUl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcmVzZXROb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlc2V0SXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJzZXR0aW5nL3ByZWZhYnMvU2V0dGluZ1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgICAgICB0aGlzLnRpdGxlLmxhbmd1YWdlID0gaTE4bi5TRVRUSU5HLlRJVFRMRTtcbiAgICAgICAgdGhpcy5tdXNpY2xhYmVsLmxhbmd1YWdlID0gaTE4bi5TRVRUSU5HLk1VU0lDO1xuICAgICAgICB0aGlzLmVmZmVjdGxhYmVsLmxhbmd1YWdlID0gaTE4bi5TRVRUSU5HLkVGRkVDVDtcbiAgICAgICAgdGhpcy5idG5sYWJlbC5sYW5ndWFnZSA9IGkxOG4uU0VUVElORy5DSEFOR0VJRDtcblxuICAgICAgICBsZXQgaXNNdXNpY09uID0gTWFuYWdlci5nbG9iYWxBdWRpby5pc011c2ljT24gPyB0cnVlIDogZmFsc2VcbiAgICAgICAgY2MubG9nKE1hbmFnZXIuZ2xvYmFsQXVkaW8uaXNNdXNpY09uLCBcIuesrOS4ieaWueesrOS4ieaWuemDveaYr1wiKVxuICAgICAgICB0aGlzLm11c2ljVG9nZ2xlLmlzQ2hlY2tlZCA9IGlzTXVzaWNPbjtcbiAgICAgICAgdGhpcy5tdXNpY1RvZ2dsZS5ub2RlLmdldENoaWxkQnlOYW1lKCdCYWNrZ3JvdW5kJykuYWN0aXZlID0gIWlzTXVzaWNPblxuICAgICAgICBsZXQgaXNFZmZlY3RPbiA9IE1hbmFnZXIuZ2xvYmFsQXVkaW8uaXNFZmZlY3RPbiA/IHRydWUgOiBmYWxzZVxuICAgICAgICB0aGlzLmVmZmVjdFRvZ2dsZS5pc0NoZWNrZWQgPSBpc0VmZmVjdE9uXG4gICAgICAgIHRoaXMuZWZmZWN0VG9nZ2xlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0JhY2tncm91bmQnKS5hY3RpdmUgPSAhaXNFZmZlY3RPblxuICAgICAgICB0aGlzLmxhbmd1YWdlbGFiZWwubGFuZ3VhZ2UgPSBpMThuLlNFVFRJTkcuTEFOR1VBR0U7XG4gICAgfVxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUHVzaFJlc2V0TmV3UGxheWVyR3VpZCksIHRoaXMucmVzZXRHdWlkKTtcbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsICgpID0+IHsgdGhpcy5sYW5ndWFnZWxhYmVsLmxhbmd1YWdlID0gaTE4bi5TRVRUSU5HLkxBTkdVQUdFOyB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIHJlc2V0R3VpZChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlNFVFRJTkcuUkVTRVRHVUlEVElQU1VDQylcbiAgICAgICAgICAgIGxldCBkb25vdERlbGV0ZSA9IFtdO1xuICAgICAgICAgICAgVXNlci5fZ2FtZUlkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT0gMjAwMSB8fCBpZCA9PSAyMDAyIHx8IGlkID09IDIwMDMpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9ub3REZWxldGUucHVzaChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBVc2VyLl9nYW1lSWRzID0gW11cbiAgICAgICAgICAgIFVzZXIuX2dhbWVJZHMgPSBVc2VyLl9nYW1lSWRzLmNvbmNhdChkb25vdERlbGV0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KGFyZ3M6IGFueVtdKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3NbMF0gJiYgYXJnc1swXS5pc0dhbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3dpdGNoYWNjLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYW5ndWFnZUl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0SXRlbU5vZGUuYWN0aXZlID0gISFVc2VyLl9waG9uZSAmJiB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdIYWxsVmlldycpICE9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRJdGVtTm9kZS5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5lbmFibGVkID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvVG9wKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5lbmFibGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtdXNpY1RvZ2dsZVwiOiB0aGlzLmNsaWNrX211c2ljKG5vZGUpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlZmZlY3RUb2dnbGVcIjogdGhpcy5jbGlja19lZmZlY3Qobm9kZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN3aXRjaGFjY1wiOiB0aGlzLmNsaWNrX3N3aXRjaGFjYygpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyZXNldFB3ZFwiOlxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKCd0b1Jlc2V0UHdkVmlldycpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmVzZXRTQ1B3ZFwiOlxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKCdvcGVuU2V0U2Vjb25kYXJ5UHdkVmlldycsIFNldHRTZWNvbmRhcnlQd2RUeXBlLnJlc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJlc2V0R3VpZFwiOlxuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RGlhbG9nKFwiXCIsIGkxOG4uU0VUVElORy5SRVNFVEdVSURUSVAsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlJlcVJlc2V0TmV3UGxheWVyR3VpZC5jcmVhdGUoeyBnYW1lSWQ6IDAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5SZXFSZXNldE5ld1BsYXllckd1aWQuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZXFSZXNldE5ld1BsYXllckd1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIpO1xuICAgICAgICAgICAgICAgIH0sIG51bGwsIENvbmZpcm1Cb3hCdG5TcHJpdGUuYnRuX0NhbmNlbCwgQ29uZmlybUJveEJ0blNwcml0ZS5idG5fUmVzZXQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFuZ3VhZ2VCdG5cIjpcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCgnb3Blbkxhbmd1YWdlQ2hhbmdlVmlldycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tfc3dpdGNoYWNjKCkge1xuICAgICAgICBnb1RvTG9naW4oKTtcbiAgICB9XG5cbiAgICBjbGlja19tdXNpYyhub2RlKSB7XG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSBub2RlLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZDtcbiAgICAgICAgbGV0IGJhY2tncm91bmQgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKTtcbiAgICAgICAgYmFja2dyb3VuZC5hY3RpdmUgPSAhaXNDaGVja2VkO1xuICAgICAgICBNYW5hZ2VyLmdsb2JhbEF1ZGlvLnNldE11c2ljRW5hYmxlZChpc0NoZWNrZWQsIHRydWUpO1xuICAgIH1cblxuICAgIGNsaWNrX2VmZmVjdChub2RlKSB7XG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSBub2RlLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZDtcbiAgICAgICAgbGV0IGJhY2tncm91bmQgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKTtcbiAgICAgICAgYmFja2dyb3VuZC5hY3RpdmUgPSAhaXNDaGVja2VkO1xuICAgICAgICBNYW5hZ2VyLmdsb2JhbEF1ZGlvLmlzRWZmZWN0T24gPSBpc0NoZWNrZWQ7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19