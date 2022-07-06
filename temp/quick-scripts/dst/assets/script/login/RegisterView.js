
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/RegisterView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vUmVnaXN0ZXJWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0VBQXVEO0FBRXZELHVEQUFvRDtBQUVwRCw2REFBMEQ7QUFHMUQsa0VBQTJFO0FBRzNFLG9FQUE0QztBQUU1QyxvRUFBNEM7QUFLNUMsNERBQW9DO0FBQ3BDLHlEQUFtRDtBQUNuRCxzRkFBOEQ7QUFDOUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLGdCQUFNO0lBQWhEOztRQUdJLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUcxQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBWSxHQUFlLElBQUksQ0FBQztRQUNoQyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBR3hCLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBQy9CLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFHdkIsb0JBQWUsR0FBZSxJQUFJLENBQUM7UUFDbkMsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFHM0IsaUJBQVksR0FBZSxJQUFJLENBQUM7UUFDaEMsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUk3QixrQkFBYSxHQUFlLElBQUksQ0FBQztRQUNqQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUt6QixZQUFPLEdBQWlCLElBQUksQ0FBQztJQTRRakMsQ0FBQztJQS9RVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLDRCQUE0QixDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLDBFQUEwRTtRQUUxRSxJQUFJ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akQsQ0FBQztJQUVELG9CQUFvQjtRQUNoQixtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7QUEvU0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNRO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1c7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztrREFDVztBQUloQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2lEQUNVO0FBSS9CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7cURBQ2M7QUFJbkM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztrREFDVztBQUloQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNXO0FBSTdCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7bURBQ1k7QUFoQ2hCLFlBQVk7SUFGaEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsWUFBWSxDQWtUaEM7a0JBbFRvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY0V2ZW50LCBMb2dpY1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgZ2FtZU1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvR2FtZU1hbmFnZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgQ29tbW9uTWVzc2FnZSwgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCB7IEh0dHBFcnJvclR5cGUsIFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBTaGFyZVRyYWNlSGVscGRlciB9IGZyb20gXCIuLi9IZWxwZGVyL3NoYXJlVHJhY2UvU2hhcmVUcmFjZUhlbHBkZXJcIjtcbmltcG9ydCBMYW5ndWFnZUNoYW5nZSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlQ2hhbmdlXCI7XG5pbXBvcnQgU2VydmljZVZpZXcgZnJvbSBcIi4uL3NlcnZpY2UvU2VydmljZVZpZXdcIjtcbmltcG9ydCBSaWNoVGV4dEhhbmRsZXIgZnJvbSBcIi4vUmljaFRleHRIYW5kbGVyXCI7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gXCIuL1ZhbGlkYXRvclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBDb3VudERvd25Db2RlIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L0NvdW50RG93bkNvZGVcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWdpc3RlclZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkRhZnRhcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoaWRlUGFzc05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgZW1haWxFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcbiAgICBtX2VtYWlsU3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgY29kZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fY29kZVN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHBhc3N3b3JkRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9wYXNzd29yZFN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHBob25lRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9waG9uZVN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkNvdW50RG93bjogY2MuTm9kZSA9IG51bGw7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIGV4dGVudEVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fZXh0ZW50U3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcImxvZ2luL3ByZWZhYnMvUmVnaXN0ZXJWaWV3XCI7XG4gICAgfVxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZSA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIC8vIHRoaXMuYXVkaW9IZWxwZXIucGxheU11c2ljKFwiY29tbW9uL2F1ZGlvL2xvZ2luX2JnbVwiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcblxuICAgICAgICB0aGlzLmJ0bkNsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5idG5Db3VudERvd24uYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uRW1haWxCZWdhbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1lbmRlZFwiLCB0aGlzLm9uRW1haWxFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLXJldHVyblwiLCB0aGlzLm9uRW1haWxFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbkVtYWlsQ2hhbmdlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vbkNvZGVCZWdhbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWVuZGVkXCIsIHRoaXMub25Db2RlRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLXJldHVyblwiLCB0aGlzLm9uQ29kZUVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25Db2RlQ2hhbmdlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5wYXNzd29yZEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWJlZ2FuXCIsIHRoaXMub25QYXNzV29yZEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWVuZGVkXCIsIHRoaXMub25QYXNzV29yZEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25QYXNzV29yZEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVkaXRCb3gubm9kZS5vbihcInRleHQtY2hhbmdlZFwiLCB0aGlzLm9uUGFzc1dvcmRDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICAvLyB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vblBob25lQmVnYW4sIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vblBob25lRW5kZWQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vblBob25lRW5kZWQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLnBob25lRWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25QaG9uZUNoYW5nZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZXh0ZW50RWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vbkV4dGVudEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5leHRlbnRFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1lbmRlZFwiLCB0aGlzLm9uRXh0ZW50RW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmV4dGVudEVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25FeHRlbnRFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZXh0ZW50RWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25FeHRlbnRDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0V2ZW50X1MyQ19HZXRDaGVja0NvZGUnLCB0aGlzLm9uRXZlbnRfUzJDX0dldENoZWNrQ29kZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX1JlZ2lzdGVyJywgdGhpcy5vbkV2ZW50X1MyQ19SZWdpc3Rlcik7XG4gICAgfVxuXG4gICAgdmFsaWRhdGFGdW5jKCkge1xuICAgICAgICBsZXQgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcigpXG5cbiAgICAgICAgbGV0IENvZGUgPSB0aGlzLm1fY29kZVN0cjtcbiAgICAgICAgdmFsaWRhdG9yLmFkZChDb2RlLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkNPREVJTkZPUk1BVElPTkVNUFRZXG4gICAgICAgIH1dKTtcblxuICAgICAgICAvLyBsZXQgcGhvbmUgPSB0aGlzLm1fcGhvbmVTdHI7XG4gICAgICAgIC8vIHZhbGlkYXRvci5hZGQocGhvbmUsIFt7XG4gICAgICAgIC8vICAgICBzdHJhdGVneTogJ2lzTW9iaWxlJyxcbiAgICAgICAgLy8gICAgIGVycm9yTXNnOiBNYW5hZ2VyLm1ha2VMYW5ndWFnZSgnUkVHSVNURVIuUEhPTkVXUk9ORycsIHRydWUpXG4gICAgICAgIC8vIH1dKTtcblxuICAgICAgICAvLyBsZXQgZW1haWwgPSB0aGlzLm1fZW1haWxTdHI7XG4gICAgICAgIC8vIHZhbGlkYXRvci5hZGQoZW1haWwsIFt7XG4gICAgICAgIC8vICAgICBzdHJhdGVneTogJ2lzRW1haWwnLFxuICAgICAgICAvLyAgICAgZXJyb3JNc2c6IE1hbmFnZXIubWFrZUxhbmd1YWdlKCdSRUdJU1RFUi5FTUFJTFdST05HJywgdHJ1ZSlcbiAgICAgICAgLy8gfV0pO1xuXG4gICAgICAgIGxldCBlbWFpbCA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICAgICAgdmFsaWRhdG9yLmFkZChlbWFpbCwgW3tcbiAgICAgICAgICAgIHN0cmF0ZWd5OiAnaXNOb25FbXB0eScsXG4gICAgICAgICAgICBlcnJvck1zZzogaTE4bi5SRUdJU1RFUi5FTUFJTElORk9STUFUSU9ORU1QVFlcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIGxldCBwYXNzd29yZCA9IHRoaXMubV9wYXNzd29yZFN0cjtcbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZCwgW3tcbiAgICAgICAgICAgIHN0cmF0ZWd5OiAnbWluTGVuZ3RoOjgnLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuUEFTU1dPUkQ4XG4gICAgICAgIH1dKTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHBhc3N3b3JkLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdwYXNzd29yZFJ1bGUnLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuTVVTVF9JTkNMVURFX0NBU0VfTlVNQkVSXG4gICAgICAgIH1dKTtcblxuICAgICAgICBsZXQgZXJyb3JNc2cgPSB2YWxpZGF0b3Iuc3RhcnQoKVxuICAgICAgICByZXR1cm4gZXJyb3JNc2dcbiAgICB9XG5cbiAgICBzdGFydENvdW50RG93bigpIHtcbiAgICAgICAgbGV0IGNvbW1vbiA9IHRoaXMuYnRuQ291bnREb3duLmdldENvbXBvbmVudChDb3VudERvd25Db2RlKTtcbiAgICAgICAgY29tbW9uLl9kb1N0YXJ0VGltZSgpO1xuICAgIH1cblxuICAgIGNsaWNrUmVnaXN0ZXIoKSB7XG4gICAgICAgIGxldCBlcnJvck1zZyA9IHRoaXMudmFsaWRhdGFGdW5jKClcbiAgICAgICAgaWYgKGVycm9yTXNnKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChlcnJvck1zZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVlc3RSZWdpc3RlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FbWFpbEJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLmVtYWlsRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fZW1haWxTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVtYWlsRW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fZW1haWxTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW1haWxDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2VtYWlsU3RyID0gY29udGVudC5zdHJpbmc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvZGVCZWdhbih0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fY29kZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29kZUVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX2NvZGVTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2NvZGVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvZGVDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2NvZGVTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGFzc1dvcmRCZWdhbih0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX3Bhc3N3b3JkU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25QYXNzV29yZEVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX3Bhc3N3b3JkU3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBhc3N3b3JkRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcGFzc3dvcmRTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBhc3NXb3JkQ2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9wYXNzd29yZFN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25QaG9uZUJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBob25lRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcGhvbmVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBob25lRW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fcGhvbmVTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGhvbmVFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9waG9uZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGhvbmVDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX3Bob25lU3RyID0gY29udGVudC5zdHJpbmc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV4dGVudEJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV4dGVudEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2V4dGVudFN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXh0ZW50RW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fZXh0ZW50U3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dGVudEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2V4dGVudFN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXh0ZW50Q2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9leHRlbnRTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdidG5HZXRDb2RlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrR2V0Q29kZUhhbmxkZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNsb3NlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5SZWdpc3Rlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja1JlZ2lzdGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5IaWRlUGFzc3dvcmQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tIaWRlUGFzcygpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0hpZGVQYXNzKCkge1xuICAgICAgICBsZXQgaWNvbkhpZGUgPSB0aGlzLmhpZGVQYXNzTm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbkhpZGUnKTtcbiAgICAgICAgbGV0IGljb25TaG93ID0gdGhpcy5oaWRlUGFzc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25TaG93Jyk7XG5cbiAgICAgICAgaWNvbkhpZGUuYWN0aXZlID0gIWljb25IaWRlLmFjdGl2ZTtcbiAgICAgICAgaWNvblNob3cuYWN0aXZlID0gIWljb25TaG93LmFjdGl2ZTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkRWRpdEJveC5pbnB1dEZsYWcgPSBpY29uU2hvdy5hY3RpdmUgPyBjYy5FZGl0Qm94LklucHV0RmxhZy5ERUZBVUxUIDogY2MuRWRpdEJveC5JbnB1dEZsYWcuUEFTU1dPUkQ7XG4gICAgfVxuXG4gICAgY2xpY2tHZXRDb2RlSGFubGRlcigpIHtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcbiAgICAgICAgbGV0IGVtYWlsID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKGVtYWlsLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc0VtYWlsJyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMV1JPTkdcbiAgICAgICAgfV0pO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKGVtYWlsLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMSU5GT1JNQVRJT05FTVBUWVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVycm9yTXNnID0gdmFsaWRhdG9yLnN0YXJ0KCk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoZXJyb3JNc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0Q2hlY2tDb2RlKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldENoZWNrQ29kZSgpIHtcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19HZXRDaGVja0NvZGUuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICB1c2VybmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0Q2hlY2tDb2RlLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX0dldENoZWNrQ29kZSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19HZXRDaGVja0NvZGUsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcmVxdWVzdFJlZ2lzdGVyKCkge1xuICAgICAgICBsZXQgdXNlcm5hbWUgPSB0aGlzLm1fZW1haWxTdHI7XG4gICAgICAgIGxldCBwYXNzd29yZCA9IHRoaXMubV9wYXNzd29yZFN0cjtcbiAgICAgICAgbGV0IGNoZWNrQ29kZSA9IHRoaXMubV9jb2RlU3RyO1xuICAgICAgICBsZXQgZXh0ZW50Q29kZSA9IHRoaXMubV9leHRlbnRTdHI7XG4gICAgICAgIGxldCBpbWVpID0gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSU1FSScpO1xuICAgICAgICBpZiAoIWltZWkpIHtcbiAgICAgICAgICAgIGltZWkgPSAndGVzdCBpbWVpJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwICsgMSlcbiAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0lNRUknLCBpbWVpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19SZWdpc3Rlci5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBjaGVja0NvZGUsXG4gICAgICAgICAgICBleHRlbnRDb2RlLFxuICAgICAgICAgICAgaW1laVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfUmVnaXN0ZXIuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMlNfUmVnaXN0ZXIsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfUmVnaXN0ZXIsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfR2V0Q2hlY2tDb2RlKCkge1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFR0lTVEVSLlBMRUFTRUNIRUNLKTtcbiAgICB9XG5cbiAgICBvbkV2ZW50X1MyQ19SZWdpc3RlcigpIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5SRUdJU1RFUi5SRUdJU1RFUlNVQ0NFU1MpO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxufVxuIl19