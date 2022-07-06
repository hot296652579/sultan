"use strict";
cc._RF.push(module, '504c3mQXoVJfqx5+tapFckG', 'PBChangePasswdView');
// script/piggyBank/PBChangePasswdView.ts

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
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const PBPasswdComponent_1 = __importDefault(require("./PBPasswdComponent"));
const { ccclass, property } = cc._decorator;
const MAX_DIGIT = 6;
let PBChangePasswdView = class PBChangePasswdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.edbPasswd1 = null;
        this.edbPasswd2 = null;
        this.edbPasswd3 = null;
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBChangePasswdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    bindingEvents() {
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD), this.onChangePasswd);
    }
    show() {
        this.showWithAction(true);
        super.show();
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickOK() {
        this.playDefaultEffect();
        let edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent_1.default);
        let edbComponent2 = this.edbPasswd2.getComponent(PBPasswdComponent_1.default);
        let edbComponent3 = this.edbPasswd3.getComponent(PBPasswdComponent_1.default);
        if (this.isPasswordNull(edbComponent1.string) ||
            this.isPasswordNull(edbComponent2.string) ||
            this.isPasswordNull(edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PLEASE_ENTER_PASSWORD);
            return;
        }
        if (!this.isPasswordDigit(edbComponent1.string) ||
            !this.isPasswordDigit(edbComponent2.string) ||
            !this.isPasswordDigit(edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }
        if (this.isPasswordSame(edbComponent1.string, edbComponent2.string, edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.OLD_NEW_PASSWD_SAME);
            return;
        }
        if (!this.isPasswordSame(edbComponent2.string, edbComponent3.string)) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.NEW_PASSWD_DIFF);
            return;
        }
        let req = CommonService_1.protoPackage.hall.ChangePasswdReq.create({ oldPasswd: edbComponent1.string, newPasswd: edbComponent2.string });
        let buffer = CommonService_1.protoPackage.hall.ChangePasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD, buffer);
    }
    onChangePasswd(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.CHANGE_SUCCESS);
        this.closeWithAction();
    }
    /**
     * 是否密码一致
     * @return {boolean}
     */
    isPasswordSame(...args) {
        let isSame = true;
        let str = args[0];
        for (let i = 1; i < args.length; ++i) {
            if (args[i] !== str) {
                isSame = false;
                break;
            }
        }
        return isSame;
    }
    /**
     * 是否6满足位数
     */
    isPasswordDigit(str) {
        if (str.length !== MAX_DIGIT) {
            return false;
        }
        return true;
    }
    /**
     * 密码是否为空
     */
    isPasswordNull(str = "") {
        if (str.length <= 0) {
            return true;
        }
        return false;
    }
};
__decorate([
    property(cc.EditBox)
], PBChangePasswdView.prototype, "edbPasswd1", void 0);
__decorate([
    property(cc.EditBox)
], PBChangePasswdView.prototype, "edbPasswd2", void 0);
__decorate([
    property(cc.EditBox)
], PBChangePasswdView.prototype, "edbPasswd3", void 0);
PBChangePasswdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBChangePasswdView);
exports.default = PBChangePasswdView;

cc._RF.pop();