"use strict";
cc._RF.push(module, '2fe468cuKBGbZEfWEhetJ27', 'SetSecondaryPwdView');
// script/withdrawal/SetSecondaryPwdView.ts

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
exports.SettSecondaryPwdType = void 0;
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const SendVerificationCodePlus_1 = __importDefault(require("../common/component/SendVerificationCodePlus"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const SendVerificationCode_1 = require("../common/component/SendVerificationCode");
const { ccclass, property } = cc._decorator;
var SettSecondaryPwdType;
(function (SettSecondaryPwdType) {
    SettSecondaryPwdType[SettSecondaryPwdType["set"] = 0] = "set";
    SettSecondaryPwdType[SettSecondaryPwdType["reset"] = 1] = "reset";
})(SettSecondaryPwdType = exports.SettSecondaryPwdType || (exports.SettSecondaryPwdType = {}));
let SetSecondaryPwdView = class SetSecondaryPwdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.service = null;
        this.verCodeEditbox = null;
        this.pwdEditbox = null;
        this.pwdEditboxConfirm = null;
        this.titlesNode = null;
        this.lbl_restPhoneTips = null;
        this.sendVerificationCode = null;
        this.passwordType = SettSecondaryPwdType.set;
    }
    static getPrefabUrl() {
        return "withdrawal/prefabs/SetSecondaryPwdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.initLanguage();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD), this.toSetPwdRes);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD), this.tochangePwdRes);
    }
    show(args) {
        let type = args[0];
        this.showWithAction(true);
        this.initView(type);
        this.lbl_restPhoneTips.string = LanguageImpl_1.i18n.ACCOUNT_LOGIN.SEND_CODE_TO_PHONE + " " + UtilMgr_1.UtilMgr.setStringCover(User_1.User._phone);
        this.sendVerificationCode.setVerificationCodeType(SendVerificationCode_1.VerificationCodeType.resetPwd);
    }
    initLanguage() {
        this.pwdEditbox.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD;
        this.verCodeEditbox.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.VER_CODE;
        this.pwdEditboxConfirm.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD_CONFIRM;
    }
    initView(type) {
        this.passwordType = type;
        var titleName = 'resetPwd';
        switch (type) {
            case SettSecondaryPwdType.set:
                titleName = 'setPwd';
                break;
            case SettSecondaryPwdType.reset:
                break;
        }
        this.titlesNode.children.forEach(nd => {
            nd.active = nd.name == titleName;
        });
    }
    onClick(name) {
        switch (name) {
            case "getCode":
                this.sendAccVerification();
                break;
            case "close":
                this.closeWithAction();
                break;
            case "conirm":
                if (this.passwordType == SettSecondaryPwdType.set) {
                    this.toSetPwd();
                }
                else {
                    this.toFoegetOrResetPwd();
                }
                break;
        }
    }
    toSetPwd() {
        let code = this.verCodeEditbox.string;
        if (!code)
            return PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.VERIFINULL);
        let passwd = this.checkPwd();
        if (!passwd)
            return;
        let req = CommonService_1.protoPackage.hall.SetSecondPasswdReq.create({ passwd: base64Encrypt(passwd), code: parseInt(code) });
        let buffer = CommonService_1.protoPackage.hall.SetSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD, buffer);
    }
    toFoegetOrResetPwd() {
        let code = this.verCodeEditbox.string;
        if (!code)
            return PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.VERIFINULL);
        let passwd = this.checkPwd();
        if (!passwd)
            return;
        let req = CommonService_1.protoPackage.hall.ChangeSecondPasswdReq.create({ passwd: base64Encrypt(passwd), code: parseInt(code) });
        let buffer = CommonService_1.protoPackage.hall.ChangeSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD, buffer);
    }
    toSetPwdRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.SUCCEEDED);
            this.close();
            User_1.User.piggyBank = true;
            // dispatch('openWithdrawalView')
        }
        else {
            G.Logger.warn("toSetPwdRes:", data);
            PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    tochangePwdRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.SUCCEEDED);
            this.close();
        }
        else {
            G.Logger.warn("tochangePwdRes:", data);
            PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    // 验证码检查
    checkVerification(verif) {
        if (!verif) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.VERIFINULL);
            return null;
        }
        return verif;
    }
    checkPwd() {
        let passwd = this.pwdEditbox.string;
        let passwdConfi = this.pwdEditboxConfirm.string;
        if (passwd == '' || passwdConfi == '') {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.ERROR.EMPTY_PWD);
            return "";
        }
        if (passwd != passwdConfi) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.ERROR.TWO_PWD_DISACCORD);
            return "";
        }
        return passwd;
    }
    checkPhone(phone) {
        if (!phone) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.PHONENULL);
            return null;
        }
        if (phone.length < 7) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.PHONETYPEERR);
            return null;
        }
        return phone;
    }
    sendAccVerification() {
        // this.sendVerificationCode.doSendVerificationCode({ phone: User._phone, areaCode: User._areaCode ,type:1});
        this.sendVerificationCode.doSendVerificationCode({ phone: User_1.User._phone, areaCode: User_1.User._areaCode });
    }
};
__decorate([
    property(cc.EditBox)
], SetSecondaryPwdView.prototype, "verCodeEditbox", void 0);
__decorate([
    property(cc.EditBox)
], SetSecondaryPwdView.prototype, "pwdEditbox", void 0);
__decorate([
    property(cc.EditBox)
], SetSecondaryPwdView.prototype, "pwdEditboxConfirm", void 0);
__decorate([
    property(cc.Node)
], SetSecondaryPwdView.prototype, "titlesNode", void 0);
__decorate([
    property(cc.Label)
], SetSecondaryPwdView.prototype, "lbl_restPhoneTips", void 0);
__decorate([
    property(SendVerificationCodePlus_1.default)
], SetSecondaryPwdView.prototype, "sendVerificationCode", void 0);
SetSecondaryPwdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SetSecondaryPwdView);
exports.default = SetSecondaryPwdView;

cc._RF.pop();