"use strict";
cc._RF.push(module, '9e30aKf/u1MU5cUxtHqVG0t', 'BindPhoneView');
// script/common/bindItemView/BindPhoneView.ts

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
let BindPhoneView = class BindPhoneView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labRegister = null;
        this.labFirstRecharge = null;
        this.firstRecharIcon = null;
        this.btnCountDown = null;
        this.phoneEditBox = null;
        this.m_phoneStr = "";
        this.emailEditBox = null;
        this.m_emailStr = "";
        this.codeEditBox = null;
        this.m_codeStr = "";
        // 用户数据
        this._userData = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/BindPhoneView";
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
        this.phoneEditBox.node.on("editing-did-began", this.onPhoneBegan, this);
        this.phoneEditBox.node.on("editing-did-ended", this.onPhoneEnded, this);
        this.phoneEditBox.node.on("editing-return", this.onPhoneEnded, this);
        this.phoneEditBox.node.on("text-changed", this.onPhoneChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("Event_S2C_BindPhone", this.onEvent_S2C_BindPhone);
        this.registerEvent("Event_S2C_GetRegisterRewordConfig", this.onEvent_S2C_GetRegisterRewordConfig);
        //Event_S2C_GetCheckCode
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
    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode_1.default);
        common._doStartTime();
    }
    clickGetCode() {
        let validator = new Validator_1.default();
        let username = this.m_phoneStr;
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
    clickBtnBind() {
        let username = this.m_phoneStr;
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
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestBindPhone();
    }
    requestBindPhone() {
        let phoneNo = this.m_phoneStr;
        let checkCode = this.m_codeStr;
        let req = protoc_1.MST.C2S_BindPhone.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            phoneNo,
            checkCode
        });
        let buffer = protoc_1.MST.C2S_BindPhone.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_BindPhone, protoc_1.MST.OuterOpcode_Lobby.C2S_BindPhone, buffer);
    }
    onEvent_S2C_BindPhone() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.BINDSUCCESS);
        this.close();
    }
    onEvent_S2C_GetRegisterRewordConfig(data) {
        if (!data.firstDepositReward || !data.chips)
            return;
        this.labFirstRecharge.string = `+${data.chips}%`;
        this.labRegister.string = `+Rp ${data.firstDepositReward}`;
        let getFirstDeposit = data.isGetFirstDepositReward;
        let depositDone = this.firstRecharIcon.getChildByName('done');
        depositDone.active = getFirstDeposit;
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SENDCHECK);
    }
};
__decorate([
    property(cc.Label)
], BindPhoneView.prototype, "labRegister", void 0);
__decorate([
    property(cc.Label)
], BindPhoneView.prototype, "labFirstRecharge", void 0);
__decorate([
    property(cc.Node)
], BindPhoneView.prototype, "firstRecharIcon", void 0);
__decorate([
    property(cc.Node)
], BindPhoneView.prototype, "btnCountDown", void 0);
__decorate([
    property(cc.EditBox)
], BindPhoneView.prototype, "phoneEditBox", void 0);
__decorate([
    property(cc.EditBox)
], BindPhoneView.prototype, "emailEditBox", void 0);
__decorate([
    property(cc.EditBox)
], BindPhoneView.prototype, "codeEditBox", void 0);
BindPhoneView = __decorate([
    ccclass
], BindPhoneView);
exports.default = BindPhoneView;

cc._RF.pop();