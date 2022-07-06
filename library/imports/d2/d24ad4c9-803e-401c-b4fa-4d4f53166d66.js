"use strict";
cc._RF.push(module, 'd24adTJgD5AHLT6TU9TFm1m', 'ForgetPassView');
// script/login/ForgetPassView.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const Validator_1 = __importDefault(require("./Validator"));
const protoc_1 = require("../framework/external/protoc");
const CountDownCode_1 = __importDefault(require("../common/component/CountDownCode"));
const { ccclass, property } = cc._decorator;
let ForgetPassView = class ForgetPassView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnClose = null;
        this.btnCountDown = null;
        this.hidePassNode = null;
        this.emailEditBox = null;
        this.m_emailStr = "";
        this.codeEditBox = null;
        this.m_codeStr = "";
        this.passwordEditBox = null;
        this.m_passwordStr = "";
        this.service = null;
    }
    static getPrefabUrl() {
        return "login/prefabs/ForgetPassView";
    }
    onLoad() {
        super.onLoad();
        this.bindEvents();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        this.btnClose.on(cc.Node.EventType.TOUCH_END, () => {
            this.close();
        });
        this.btnCountDown.active = false;
    }
    bindEvents() {
        this.emailEditBox.node.on("editing-did-began", this.onEmailBegan, this);
        this.emailEditBox.node.on("editing-did-ended", this.onEmailEnded, this);
        this.emailEditBox.node.on("editing-return", this.onEmailEnded, this);
        this.emailEditBox.node.on("text-changed", this.onEmailChanged, this);
        this.codeEditBox.node.on("editing-did-began", this.onCodeBegan, this);
        this.codeEditBox.node.on("editing-did-ended", this.onCodeEnded, this);
        this.codeEditBox.node.on("editing-return", this.onCodeEnded, this);
        this.codeEditBox.node.on("text-changed", this.onCodeChanged, this);
        this.passwordEditBox.node.on("editing-did-began", this.onPassWordBegan, this);
        this.passwordEditBox.node.on("editing-did-ended", this.onPassWordEnded, this);
        this.passwordEditBox.node.on("editing-return", this.onPassWordEnded, this);
        this.passwordEditBox.node.on("text-changed", this.onPassWordChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_GetCheckCode', this.onEvent_S2C_GetCheckCode);
        this.registerEvent('Event_S2C_ResetPassword', this.onEvent_S2C_ResetPassword);
    }
    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode_1.default);
        common._doStartTime();
    }
    onEmailBegan(target) {
        this.emailEditBox.string = this.m_emailStr;
    }
    onEmailEnded(target) {
        if (this.m_emailStr.length <= 0) {
            return;
        }
        this.emailEditBox.string = this.m_emailStr;
    }
    onEmailChanged(content) {
        this.m_emailStr = content.string;
    }
    onCodeBegan(target) {
        this.codeEditBox.string = this.m_codeStr;
    }
    onCodeEnded(target) {
        if (this.m_codeStr.length <= 0) {
            return;
        }
        this.codeEditBox.string = this.m_codeStr;
    }
    onCodeChanged(content) {
        this.m_codeStr = content.string;
    }
    onPassWordBegan(target) {
        this.passwordEditBox.string = this.m_passwordStr;
    }
    onPassWordEnded(target) {
        if (this.m_passwordStr.length <= 0) {
            return;
        }
        this.passwordEditBox.string = this.m_passwordStr;
    }
    onPassWordChanged(content) {
        this.m_passwordStr = content.string;
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
            case 'btnSetPass':
                this.clickSetPass();
                break;
            case 'btnGetCode':
                this.clickGetCodeHanlder();
                break;
            case 'btnHidePassword':
                this.clickHidePass();
                break;
            default:
                break;
        }
    }
    clickHidePass() {
        let iconHide = this.hidePassNode.getChildByName('iconHide');
        let iconShow = this.hidePassNode.getChildByName('iconShow');
        iconHide.active = !iconHide.active;
        iconShow.active = !iconShow.active;
        this.passwordEditBox.inputFlag = iconShow.active ? cc.EditBox.InputFlag.DEFAULT : cc.EditBox.InputFlag.PASSWORD;
    }
    clickGetCodeHanlder() {
        let validator = new Validator_1.default();
        let email = this.m_emailStr;
        validator.add(email, [{
                strategy: 'isEmail',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILWRONG
            }]);
        validator.add(email, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILINFORMATIONEMPTY
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.startCountDown();
        this.requestGetCheckCode();
    }
    requestGetCheckCode() {
        let username = this.m_emailStr;
        let req = protoc_1.MST.C2S_GetCheckCode.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = protoc_1.MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetCheckCode, protoc_1.MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.PLEASECHECK);
    }
    validataFunc() {
        let validator = new Validator_1.default();
        let Code = this.m_codeStr;
        validator.add(Code, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.CODEINFORMATIONEMPTY
            }]);
        let email = this.m_emailStr;
        validator.add(email, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILINFORMATIONEMPTY
            }]);
        let password = this.m_passwordStr;
        validator.add(password, [{
                strategy: 'minLength:8',
                errorMsg: LanguageImpl_1.i18n.REGISTER.PASSWORD8
            }]);
        let errorMsg = validator.start();
        return errorMsg;
    }
    clickSetPass() {
        let errorMsg = this.validataFunc();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestResetPassword();
    }
    requestResetPassword() {
        let username = this.m_emailStr;
        let password = this.m_passwordStr;
        let checkCode = this.m_codeStr;
        let req = protoc_1.MST.C2S_ResetPassword.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username,
            password,
            checkCode
        });
        let buffer = protoc_1.MST.C2S_ResetPassword.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_ResetPassword, protoc_1.MST.OuterOpcode_Lobby.C2S_ResetPassword, buffer);
    }
    onEvent_S2C_ResetPassword() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.CHANGEPASSWORDSUCCESS);
        this.close();
    }
};
__decorate([
    property(cc.Node)
], ForgetPassView.prototype, "btnClose", void 0);
__decorate([
    property(cc.Node)
], ForgetPassView.prototype, "btnCountDown", void 0);
__decorate([
    property(cc.Node)
], ForgetPassView.prototype, "hidePassNode", void 0);
__decorate([
    property(cc.EditBox)
], ForgetPassView.prototype, "emailEditBox", void 0);
__decorate([
    property(cc.EditBox)
], ForgetPassView.prototype, "codeEditBox", void 0);
__decorate([
    property(cc.EditBox)
], ForgetPassView.prototype, "passwordEditBox", void 0);
ForgetPassView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], ForgetPassView);
exports.default = ForgetPassView;

cc._RF.pop();