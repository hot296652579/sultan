"use strict";
cc._RF.push(module, '2b8edPKxP5JsZkfr8jRqC2l', 'RegisterView');
// script/login/RegisterView.ts

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
let RegisterView = class RegisterView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnClose = null;
        this.btnDaftar = null;
        this.hidePassNode = null;
        this.emailEditBox = null;
        this.m_emailStr = "";
        this.codeEditBox = null;
        this.m_codeStr = "";
        this.passwordEditBox = null;
        this.m_passwordStr = "";
        this.phoneEditBox = null;
        this.m_phoneStr = "";
        this.btnCountDown = null;
        this.extentEditBox = null;
        this.m_extentStr = "";
        this.service = null;
    }
    static getPrefabUrl() {
        return "login/prefabs/RegisterView";
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
        // this.phoneEditBox.node.on("editing-did-began", this.onPhoneBegan, this);
        // this.phoneEditBox.node.on("editing-did-ended", this.onPhoneEnded, this);
        // this.phoneEditBox.node.on("editing-return", this.onPhoneEnded, this);
        // this.phoneEditBox.node.on("text-changed", this.onPhoneChanged, this);
        this.extentEditBox.node.on("editing-did-began", this.onExtentBegan, this);
        this.extentEditBox.node.on("editing-did-ended", this.onExtentEnded, this);
        this.extentEditBox.node.on("editing-return", this.onExtentEnded, this);
        this.extentEditBox.node.on("text-changed", this.onExtentChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_GetCheckCode', this.onEvent_S2C_GetCheckCode);
        this.registerEvent('Event_S2C_Register', this.onEvent_S2C_Register);
    }
    validataFunc() {
        let validator = new Validator_1.default();
        let Code = this.m_codeStr;
        validator.add(Code, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.CODEINFORMATIONEMPTY
            }]);
        // let phone = this.m_phoneStr;
        // validator.add(phone, [{
        //     strategy: 'isMobile',
        //     errorMsg: Manager.makeLanguage('REGISTER.PHONEWRONG', true)
        // }]);
        // let email = this.m_emailStr;
        // validator.add(email, [{
        //     strategy: 'isEmail',
        //     errorMsg: Manager.makeLanguage('REGISTER.EMAILWRONG', true)
        // }]);
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
        validator.add(password, [{
                strategy: 'passwordRule',
                errorMsg: LanguageImpl_1.i18n.REGISTER.MUST_INCLUDE_CASE_NUMBER
            }]);
        let errorMsg = validator.start();
        return errorMsg;
    }
    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode_1.default);
        common._doStartTime();
    }
    clickRegister() {
        let errorMsg = this.validataFunc();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestRegister();
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
    onPhoneBegan(target) {
        this.phoneEditBox.string = this.m_phoneStr;
    }
    onPhoneEnded(target) {
        if (this.m_phoneStr.length <= 0) {
            return;
        }
        this.phoneEditBox.string = this.m_phoneStr;
    }
    onPhoneChanged(content) {
        this.m_phoneStr = content.string;
    }
    onExtentBegan(target) {
        this.extentEditBox.string = this.m_extentStr;
    }
    onExtentEnded(target) {
        if (this.m_extentStr.length <= 0) {
            return;
        }
        this.extentEditBox.string = this.m_extentStr;
    }
    onExtentChanged(content) {
        this.m_extentStr = content.string;
    }
    onClick(name, node) {
        switch (name) {
            case 'btnGetCode':
                this.clickGetCodeHanlder();
                break;
            case 'btnClose':
                this.close();
                break;
            case 'btnRegister':
                this.clickRegister();
                break;
            case 'btnHidePassword':
                this.clickHidePass();
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
    requestRegister() {
        let username = this.m_emailStr;
        let password = this.m_passwordStr;
        let checkCode = this.m_codeStr;
        let extentCode = this.m_extentStr;
        let imei = Manager_1.Manager.localStorage.getItem('IMEI');
        if (!imei) {
            imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
            Manager_1.Manager.localStorage.setItem('IMEI', imei);
        }
        let req = protoc_1.MST.C2S_Register.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username,
            password,
            checkCode,
            extentCode,
            imei
        });
        let buffer = protoc_1.MST.C2S_Register.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_Register, protoc_1.MST.OuterOpcode_Lobby.C2S_Register, buffer);
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.PLEASECHECK);
    }
    onEvent_S2C_Register() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.REGISTERSUCCESS);
        this.close();
    }
};
__decorate([
    property(cc.Node)
], RegisterView.prototype, "btnClose", void 0);
__decorate([
    property(cc.Node)
], RegisterView.prototype, "btnDaftar", void 0);
__decorate([
    property(cc.Node)
], RegisterView.prototype, "hidePassNode", void 0);
__decorate([
    property(cc.EditBox)
], RegisterView.prototype, "emailEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RegisterView.prototype, "codeEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RegisterView.prototype, "passwordEditBox", void 0);
__decorate([
    property(cc.EditBox)
], RegisterView.prototype, "phoneEditBox", void 0);
__decorate([
    property(cc.Node)
], RegisterView.prototype, "btnCountDown", void 0);
__decorate([
    property(cc.EditBox)
], RegisterView.prototype, "extentEditBox", void 0);
RegisterView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RegisterView);
exports.default = RegisterView;

cc._RF.pop();