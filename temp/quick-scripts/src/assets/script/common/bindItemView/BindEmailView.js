"use strict";
cc._RF.push(module, 'd3fb5g5RlVMYYq1sOvyyIyd', 'BindEmailView');
// script/common/bindItemView/BindEmailView.ts

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
const UserData_1 = __importDefault(require("../../data/UserData"));
const protoc_1 = require("../../framework/external/protoc");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const Validator_1 = __importDefault(require("../../login/Validator"));
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const CountDownCode_1 = __importDefault(require("../component/CountDownCode"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("../manager/Manager");
const LobbyService_1 = require("../net/LobbyService");
const { ccclass, property } = cc._decorator;
let BindEmailView = class BindEmailView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.emailEditBox = null;
        this.m_emailStr = "";
        this.btnCountDown = null;
        this.codeEditBox = null;
        this.m_codeStr = "";
        // 用户数据
        this._userData = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/BindEmailView";
    }
    onLoad() {
        super.onLoad();
        this.bindEvents();
        this.initData();
        this.btnCountDown.active = false;
    }
    start() {
    }
    show(args) {
        // let type = args[0];
        // this.phoneEditBox.node.active = type == 'BindPhone';
        // this.emailEditBox.node.active = type == 'BindEmail';
        this.requestGetRewardConfig();
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
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("Event_S2C_BindEmail", this.onEvent_S2C_BindEmail);
        this.registerEvent("Event_S2C_GetCheckCode", this.onEvent_S2C_GetCheckCode);
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    requestGetRewardConfig() {
        let req = protoc_1.MST.C2S_GetRegisterRewardConfig.create({
            serial: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2S_GetRegisterRewardConfig.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetRegisterRewardConfig, protoc_1.MST.OuterOpcode_Lobby.C2S_GetRegisterRewardConfig, buffer);
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
    onClick(name) {
        switch (name) {
            case "btnClose":
                this.close();
                break;
            case "btnBind":
                this.clickBtnBind();
                break;
            case 'btnGetCode':
                this.clickGetCode();
                break;
        }
    }
    clickGetCode() {
        let username = this.m_emailStr;
        let validator = new Validator_1.default();
        validator.add(username, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILINFORMATIONEMPTY
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.startCountDown();
        let req = protoc_1.MST.C2S_GetCheckCode.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = protoc_1.MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetCheckCode, protoc_1.MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }
    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode_1.default);
        common._doStartTime();
    }
    clickBtnBind() {
        let username = this.m_emailStr;
        let validator = new Validator_1.default();
        let Code = this.m_codeStr;
        validator.add(Code, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.CODEINFORMATIONEMPTY
            }]);
        validator.add(username, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILINFORMATIONEMPTY
            }]);
        validator.add(username, [{
                strategy: 'isEmail',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILWRONG
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestBindEmail();
    }
    requestBindEmail() {
        let email = this.m_emailStr;
        let checkCode = this.m_codeStr;
        let req = protoc_1.MST.C2S_BindEmail.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            email,
            checkCode
        });
        let buffer = protoc_1.MST.C2S_BindEmail.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_BindEmail, protoc_1.MST.OuterOpcode_Lobby.C2S_BindEmail, buffer);
    }
    onEvent_S2C_BindEmail() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.BINDSUCCESS);
        this.close();
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SENDCHECK);
    }
};
__decorate([
    property(cc.EditBox)
], BindEmailView.prototype, "emailEditBox", void 0);
__decorate([
    property(cc.Node)
], BindEmailView.prototype, "btnCountDown", void 0);
__decorate([
    property(cc.EditBox)
], BindEmailView.prototype, "codeEditBox", void 0);
BindEmailView = __decorate([
    ccclass
], BindEmailView);
exports.default = BindEmailView;

cc._RF.pop();