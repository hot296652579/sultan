
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/ForgetPassView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vRm9yZ2V0UGFzc1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrRUFBdUQ7QUFFdkQsdURBQW9EO0FBRXBELDZEQUEwRDtBQUcxRCxrRUFBMkU7QUFHM0Usb0VBQTRDO0FBRTVDLG9FQUE0QztBQUs1Qyw0REFBb0M7QUFDcEMseURBQW1EO0FBQ25ELHNGQUE4RDtBQUU5RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFNNUMsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsZ0JBQU07SUFBbEQ7O1FBR0ksYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixpQkFBWSxHQUFlLElBQUksQ0FBQztRQUNoQyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBR3hCLGdCQUFXLEdBQWUsSUFBSSxDQUFDO1FBQy9CLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFHdkIsb0JBQWUsR0FBZSxJQUFJLENBQUM7UUFDbkMsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFLM0IsWUFBTyxHQUFpQixJQUFJLENBQUM7SUErTWpDLENBQUM7SUFsTlUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw4QkFBOEIsQ0FBQztJQUMxQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQiwwRUFBMEU7UUFFMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFF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QUFDLGlCQUFpQixFQUFFLFlBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQseUJBQXlCO1FBQ3JCLG1CQUFTLENBQUMsT0FBTyxDQUFDLG1CQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBO0FBdE9HO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ087QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDVztBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNXO0FBRzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0RBQ1c7QUFJaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzttREFDVTtBQUkvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3VEQUNjO0FBcEJsQixjQUFjO0lBRmxDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGNBQWMsQ0F5T2xDO2tCQXpPb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvSG90VXBkYXRlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGRpc3BhdGNoRW50ZXJDb21wbGV0ZSwgTG9naWNFdmVudCwgTG9naWNUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IGdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL0dhbWVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IENvbW1vbk1lc3NhZ2UsIHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBIdHRwRXJyb3JUeXBlLCBSZXF1ZXN0UGFja2dlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9uZXQvSHR0cENsaWVudFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgU2hhcmVUcmFjZUhlbHBkZXIgfSBmcm9tIFwiLi4vSGVscGRlci9zaGFyZVRyYWNlL1NoYXJlVHJhY2VIZWxwZGVyXCI7XG5pbXBvcnQgTGFuZ3VhZ2VDaGFuZ2UgZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUNoYW5nZVwiO1xuaW1wb3J0IFNlcnZpY2VWaWV3IGZyb20gXCIuLi9zZXJ2aWNlL1NlcnZpY2VWaWV3XCI7XG5pbXBvcnQgUmljaFRleHRIYW5kbGVyIGZyb20gXCIuL1JpY2hUZXh0SGFuZGxlclwiO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tIFwiLi9WYWxpZGF0b3JcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgQ291bnREb3duQ29kZSBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9Db3VudERvd25Db2RlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cblxuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9yZ2V0UGFzc1ZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkNsb3NlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkNvdW50RG93bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoaWRlUGFzc05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgZW1haWxFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcbiAgICBtX2VtYWlsU3RyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgY29kZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fY29kZVN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHBhc3N3b3JkRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9wYXNzd29yZFN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJsb2dpbi9wcmVmYWJzL0ZvcmdldFBhc3NWaWV3XCI7XG4gICAgfVxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZSA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIC8vIHRoaXMuYXVkaW9IZWxwZXIucGxheU11c2ljKFwiY29tbW9uL2F1ZGlvL2xvZ2luX2JnbVwiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcblxuICAgICAgICB0aGlzLmJ0bkNsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJ0bkNvdW50RG93bi5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmVtYWlsRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vbkVtYWlsQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLmVtYWlsRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkVtYWlsRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmVtYWlsRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vbkVtYWlsRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmVtYWlsRWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25FbWFpbENoYW5nZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWJlZ2FuXCIsIHRoaXMub25Db2RlQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1lbmRlZFwiLCB0aGlzLm9uQ29kZUVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vbkNvZGVFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcInRleHQtY2hhbmdlZFwiLCB0aGlzLm9uQ29kZUNoYW5nZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMucGFzc3dvcmRFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uUGFzc1dvcmRCZWdhbiwgdGhpcyk7XG4gICAgICAgIHRoaXMucGFzc3dvcmRFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1lbmRlZFwiLCB0aGlzLm9uUGFzc1dvcmRFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucGFzc3dvcmRFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLXJldHVyblwiLCB0aGlzLm9uUGFzc1dvcmRFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucGFzc3dvcmRFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vblBhc3NXb3JkQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0V2ZW50X1MyQ19HZXRDaGVja0NvZGUnLCB0aGlzLm9uRXZlbnRfUzJDX0dldENoZWNrQ29kZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX1Jlc2V0UGFzc3dvcmQnLCB0aGlzLm9uRXZlbnRfUzJDX1Jlc2V0UGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHN0YXJ0Q291bnREb3duKCkge1xuICAgICAgICBsZXQgY29tbW9uID0gdGhpcy5idG5Db3VudERvd24uZ2V0Q29tcG9uZW50KENvdW50RG93bkNvZGUpO1xuICAgICAgICBjb21tb24uX2RvU3RhcnRUaW1lKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkVtYWlsQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZW1haWxFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRW1haWxFbmRlZCh0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9lbWFpbFN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWFpbEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FbWFpbENoYW5nZWQoY29udGVudDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZW1haWxTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29kZUJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9jb2RlU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db2RlRW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fY29kZVN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fY29kZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29kZUNoYW5nZWQoY29udGVudDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fY29kZVN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25QYXNzV29yZEJlZ2FuKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBhc3N3b3JkRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcGFzc3dvcmRTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBhc3NXb3JkRW5kZWQodGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fcGFzc3dvcmRTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFzc3dvcmRFZGl0Qm94LnN0cmluZyA9IHRoaXMubV9wYXNzd29yZFN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGFzc1dvcmRDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX3Bhc3N3b3JkU3RyID0gY29udGVudC5zdHJpbmc7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYnRuQ2xvc2UnOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0blNldFBhc3MnOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tTZXRQYXNzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5HZXRDb2RlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrR2V0Q29kZUhhbmxkZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkhpZGVQYXNzd29yZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0hpZGVQYXNzKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGlja0hpZGVQYXNzKCkge1xuICAgICAgICBsZXQgaWNvbkhpZGUgPSB0aGlzLmhpZGVQYXNzTm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbkhpZGUnKTtcbiAgICAgICAgbGV0IGljb25TaG93ID0gdGhpcy5oaWRlUGFzc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25TaG93Jyk7XG5cbiAgICAgICAgaWNvbkhpZGUuYWN0aXZlID0gIWljb25IaWRlLmFjdGl2ZTtcbiAgICAgICAgaWNvblNob3cuYWN0aXZlID0gIWljb25TaG93LmFjdGl2ZTtcblxuICAgICAgICB0aGlzLnBhc3N3b3JkRWRpdEJveC5pbnB1dEZsYWcgPSBpY29uU2hvdy5hY3RpdmUgPyBjYy5FZGl0Qm94LklucHV0RmxhZy5ERUZBVUxUIDogY2MuRWRpdEJveC5JbnB1dEZsYWcuUEFTU1dPUkQ7XG4gICAgfVxuXG4gICAgY2xpY2tHZXRDb2RlSGFubGRlcigpIHtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcbiAgICAgICAgbGV0IGVtYWlsID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKGVtYWlsLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc0VtYWlsJyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMV1JPTkdcbiAgICAgICAgfV0pO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKGVtYWlsLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLlJFR0lTVEVSLkVNQUlMSU5GT1JNQVRJT05FTVBUWVxuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVycm9yTXNnID0gdmFsaWRhdG9yLnN0YXJ0KCk7XG4gICAgICAgIGlmIChlcnJvck1zZykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoZXJyb3JNc2cpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRDb3VudERvd24oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0Q2hlY2tDb2RlKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldENoZWNrQ29kZSgpIHtcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gdGhpcy5tX2VtYWlsU3RyO1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19HZXRDaGVja0NvZGUuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcmlhbDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICB1c2VybmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0Q2hlY2tDb2RlLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX0dldENoZWNrQ29kZSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19HZXRDaGVja0NvZGUsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfR2V0Q2hlY2tDb2RlKCkge1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFR0lTVEVSLlBMRUFTRUNIRUNLKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0YUZ1bmMoKSB7XG4gICAgICAgIGxldCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKClcblxuICAgICAgICBsZXQgQ29kZSA9IHRoaXMubV9jb2RlU3RyO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKENvZGUsIFt7XG4gICAgICAgICAgICBzdHJhdGVneTogJ2lzTm9uRW1wdHknLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuQ09ERUlORk9STUFUSU9ORU1QVFlcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIGxldCBlbWFpbCA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICAgICAgdmFsaWRhdG9yLmFkZChlbWFpbCwgW3tcbiAgICAgICAgICAgIHN0cmF0ZWd5OiAnaXNOb25FbXB0eScsXG4gICAgICAgICAgICBlcnJvck1zZzogaTE4bi5SRUdJU1RFUi5FTUFJTElORk9STUFUSU9ORU1QVFlcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIGxldCBwYXNzd29yZCA9IHRoaXMubV9wYXNzd29yZFN0cjtcbiAgICAgICAgdmFsaWRhdG9yLmFkZChwYXNzd29yZCwgW3tcbiAgICAgICAgICAgIHN0cmF0ZWd5OiAnbWluTGVuZ3RoOjgnLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuUEFTU1dPUkQ4XG4gICAgICAgIH1dKTtcblxuICAgICAgICBsZXQgZXJyb3JNc2cgPSB2YWxpZGF0b3Iuc3RhcnQoKVxuICAgICAgICByZXR1cm4gZXJyb3JNc2dcbiAgICB9XG5cbiAgICBjbGlja1NldFBhc3MoKSB7XG4gICAgICAgIGxldCBlcnJvck1zZyA9IHRoaXMudmFsaWRhdGFGdW5jKClcbiAgICAgICAgaWYgKGVycm9yTXNnKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChlcnJvck1zZyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlcXVlc3RSZXNldFBhc3N3b3JkKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdFJlc2V0UGFzc3dvcmQoKSB7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHRoaXMubV9lbWFpbFN0cjtcbiAgICAgICAgbGV0IHBhc3N3b3JkID0gdGhpcy5tX3Bhc3N3b3JkU3RyO1xuICAgICAgICBsZXQgY2hlY2tDb2RlID0gdGhpcy5tX2NvZGVTdHI7XG5cbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfUmVzZXRQYXNzd29yZC5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBjaGVja0NvZGVcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX1Jlc2V0UGFzc3dvcmQuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMlNfUmVzZXRQYXNzd29yZCwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19SZXNldFBhc3N3b3JkLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uRXZlbnRfUzJDX1Jlc2V0UGFzc3dvcmQoKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uUkVHSVNURVIuQ0hBTkdFUEFTU1dPUkRTVUNDRVNTKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbn1cbiJdfQ==