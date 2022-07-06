"use strict";
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