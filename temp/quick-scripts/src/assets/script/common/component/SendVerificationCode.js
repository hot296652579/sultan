"use strict";
cc._RF.push(module, '40b41aNgUpJTo5/QItI9R3Z', 'SendVerificationCode');
// script/common/component/SendVerificationCode.ts

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
exports.VerificationCodeType = void 0;
const Decorators_1 = require("../../framework/decorator/Decorators");
const HttpClient_1 = require("../../framework/net/HttpClient");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("../manager/Manager");
const CommonService_1 = require("../net/CommonService");
const LobbyService_1 = require("../net/LobbyService");
var VerificationCodeType;
(function (VerificationCodeType) {
    VerificationCodeType[VerificationCodeType["none"] = 0] = "none";
    VerificationCodeType[VerificationCodeType["resetPwd"] = 1] = "resetPwd";
})(VerificationCodeType = exports.VerificationCodeType || (exports.VerificationCodeType = {}));
const { ccclass, property } = cc._decorator;
let SendVerificationCode = class SendVerificationCode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.service = null;
        // onLoad () {}
        this.verificationCodeType = VerificationCodeType.none;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.SEND_PHONE_CODE), this.onPhoneCodeCall);
    }
    onPhoneCodeCall(netData) {
        if (netData.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
            this._doStartTime();
        }
        else {
            PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + netData.statusMsg.status));
        }
    }
    doSendVerificationCode(msg) {
        if (!!this.isSendOk) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
            return;
        }
        this.isSendOk = true;
        this.label.language = LanguageImpl_1.i18n.BIND.SEND;
        if (msg.type) { // webscoket
            let req = CommonService_1.protoPackage.hall.SendPhoneCode.create({ phone: msg.phone, area: msg.area });
            let buffer = CommonService_1.protoPackage.hall.SendPhoneCode.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.SEND_PHONE_CODE, buffer);
        }
        else { //http
            let url = '';
            url += G.URLMgr.loginURL + 'sms?phone=' + encodeURIComponent(msg.phone) + '&area=' + encodeURIComponent(msg.areaCode) + "&type=" + this.verificationCodeType;
            // url += 'http://192.168.6.200:8088/' + 'sms?phone=' + msg.phone;
            let packge = new HttpClient_1.RequestPackge;
            packge.data.url = url;
            packge.send((netData) => {
                if (netData.state == 0) {
                    PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
                    this._doStartTime();
                }
                else {
                    PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[netData.state] || Manager_1.Manager.makeLanguage("ERRORCODE.SERVERERROR"));
                    this.sendFail();
                }
            }, (err) => {
                G.Logger.log('验证码 = ', err);
                this.sendFail();
            });
        }
    }
    _doStartTime() {
        this.verifiCD = 60;
        if (this.node.getComponent(cc.Button)) {
            this.node.getComponent(cc.Button).interactable = false;
        }
        this.label.string = this.verifiCD + 's';
        this.verifiCD -= 1;
        this.updateVerifiCD = setInterval(() => {
            if (this.verifiCD < 0) {
                clearInterval(this.updateVerifiCD);
                this.verifiCD = 60;
                this.label.language = LanguageImpl_1.i18n.BIND.SEND;
                this.isSendOk = null;
                this.countDownEnd();
                if (this.node.getComponent(cc.Button)) {
                    this.node.getComponent(cc.Button).interactable = true;
                }
            }
            else {
                if (this.label == null) {
                    clearInterval(this.updateVerifiCD);
                    if (cc.isValid(this.node)) {
                        this.onDestroy();
                    }
                }
                else {
                    this.label.string = this.verifiCD + 's';
                    this.verifiCD--;
                }
            }
        }, 1000);
    }
    countDownEnd() {
    }
    sendFail() {
        this.isSendOk = null;
    }
    setVerificationCodeType(type) {
        this.verificationCodeType = type;
    }
};
__decorate([
    property(cc.Label)
], SendVerificationCode.prototype, "label", void 0);
SendVerificationCode = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SendVerificationCode);
exports.default = SendVerificationCode;

cc._RF.pop();