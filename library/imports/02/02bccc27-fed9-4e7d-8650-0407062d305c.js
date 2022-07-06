"use strict";
cc._RF.push(module, '02bccwn/tlOfYZQBAcGLTBc', 'AttractNewView');
// script/wallet/AttractNewView.ts

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
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CreateAccountView_1 = __importDefault(require("./CreateAccountView"));
const protoc_1 = require("../framework/external/protoc");
const UserData_1 = __importDefault(require("../data/UserData"));
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const RechargeData_1 = __importDefault(require("../data/RechargeData"));
const BindPhoneView_1 = __importDefault(require("../common/bindItemView/BindPhoneView"));
const { ccclass, property } = cc._decorator;
let AttractNewView = class AttractNewView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noWithdrawal = null;
        this.bandInfoNode = null;
        this.labGold = null;
        this.labTelephone = null;
        this.labEmail = null;
        this.DocNode = null;
        this.btnWithdrawal = null;
        this.rpEditBox = null;
        this.codeEditBox = null;
        this.m_codeStr = "";
        this.m_attractStr = '';
        this.canAttract = false;
        this._2d_sprite_mat = '2d-sprite';
        this._2d_gray_mat = '2d-gray-sprite';
        // 用户数据
        this._userData = null;
        this._rechargeData = null;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/AttractNewView";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        this.bindEvents();
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
        this._rechargeData = G.DataMgr.get(RechargeData_1.default);
    }
    bindEvents() {
        this.rpEditBox.node.on("editing-did-began", this.onDidBegan, this);
        this.rpEditBox.node.on("editing-did-ended", this.onDidEnded, this);
        this.rpEditBox.node.on("editing-return", this.onDidEnded, this);
        this.rpEditBox.node.on("text-changed", this.onTextChanged, this);
        this.codeEditBox.node.on("editing-did-began", this.onCodeBegan, this);
        this.codeEditBox.node.on("editing-did-ended", this.onCodeEnded, this);
        this.codeEditBox.node.on("editing-return", this.onCodeEnded, this);
        this.codeEditBox.node.on("text-changed", this.onCodeChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('L2C_Withdraw_Res', this.onL2C_Withdraw_Res);
        this.registerEvent('L2C_GetBankCardInfo_Res', this.onL2C_GetBankCardInfo_Res);
        this.registerEvent("Event_M2C_GoldChange_Mes", this.refreshUser);
        this.registerEvent("Event_L2C_BindBankCard_Res", this.requestBankInfo);
        this.registerEvent('Event_S2C_BindPhone', this.onEvent_S2C_BindPhone);
        this.registerEvent('Event_S2C_GetCheckCode', this.onEvent_S2C_GetCheckCode);
    }
    show() {
        this.initData();
        this.initView();
        this.requestBankInfo();
        this.requestGetBankList();
        this.refreshUser();
        this.refreshPhoneNo();
        this.refreshEmail();
    }
    initView() {
        this.btnWithdrawal.getComponent(cc.Button).enabled = false;
        let material = cc.Material.getBuiltinMaterial(this._2d_gray_mat);
        let sp = this.btnWithdrawal.getComponent(cc.Sprite);
        sp.setMaterial(0, material);
        let rechargeData = this._rechargeData;
        if (!rechargeData.minWithAmount || !rechargeData.maxWithAmount)
            return;
        let minWithAmount = rechargeData.minWithAmount;
        let maxWithAmount = rechargeData.maxWithAmount;
        this.rpEditBox.placeholder = `jarak:Rp${minWithAmount}-${maxWithAmount}`;
    }
    requestGetBankList() {
        let req = protoc_1.MST.C2L_GetBankList_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            index: 0,
            limit: 6
        });
        let buffer = protoc_1.MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetBankList_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }
    requestBankInfo() {
        let req = protoc_1.MST.C2L_GetBankCardInfo_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
        });
        let buffer = protoc_1.MST.C2L_GetBankCardInfo_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetBankCardInfo_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetBankCardInfo_Req, buffer);
    }
    onEvent_S2C_BindPhone() {
        this.refreshPhoneNo();
    }
    refreshPhoneNo() {
        let userData = this._userData;
        let phone = userData.BindPhone;
        if (phone)
            this.labTelephone.string = phone;
    }
    refreshEmail() {
        let userData = this._userData;
        let email = userData.email;
        if (email)
            this.labEmail.string = email;
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
            case 'btnCloseDoc':
                this.DocNode.active = false;
                break;
            case 'btnArrange':
                Manager_1.Manager.uiManager.open({ type: CreateAccountView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnChange':
                Manager_1.Manager.uiManager.open({ type: CreateAccountView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnUpdateTel':
                Manager_1.Manager.uiManager.open({ type: BindPhoneView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnWithdrawal':
                this.withdrawHanlder();
                break;
            case 'btnGetCode':
                this.clickGetCode();
                break;
            case 'labNumberOfOpen':
                this.DocNode.active = true;
                break;
        }
    }
    clickGetCode() {
        let userdata = this._userData;
        let email = userdata.email;
        if (email) {
            this.requestGetCheckCode();
        }
        else {
            // NOTBINDEMAIL
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.NOTBINDEMAIL);
        }
    }
    onEvent_S2C_GetCheckCode() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.PLEASECHECK);
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
    requestGetCheckCode() {
        let userData = this._userData;
        let username = userData.email;
        let req = protoc_1.MST.C2S_GetCheckCode.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = protoc_1.MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetCheckCode, protoc_1.MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }
    withdrawHanlder() {
        if (this.canAttract) {
            let rechargeData = this._rechargeData;
            let bandBankCardInfo = rechargeData.bandBankCardInfo;
            if (!bandBankCardInfo)
                return;
            let attractNum = Number(this.m_attractStr);
            let bankNo = bandBankCardInfo.bankNo;
            let bankCode = bandBankCardInfo.bankCode;
            let name = bandBankCardInfo.bankUserName;
            let chips = attractNum * 100;
            let req = protoc_1.MST.C2L_Withdraw_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId(),
                chips,
                bankNo,
                bankCode,
                name
            });
            let buffer = protoc_1.MST.C2L_Withdraw_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_Withdraw_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_Withdraw_Req, buffer);
        }
    }
    onL2C_Withdraw_Res() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.RECHARGESUCCESS);
    }
    refreshUser() {
        if (this._userData.isLogined()) {
            this.labGold.string = NumberUtils_1.default.converToC(Number(this._userData.info.Gold));
        }
    }
    onL2C_GetBankCardInfo_Res() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bandBankCardInfo = rechargeData.bandBankCardInfo;
        this.bandInfoNode.active = false;
        this.noWithdrawal.active = false;
        if (bandBankCardInfo) {
            this.bandInfoNode.active = true;
            this.refreshBandInfo();
        }
        else {
            this.noWithdrawal.active = true;
        }
    }
    refreshBandInfo() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        let bandBankCardInfo = rechargeData.bandBankCardInfo;
        let bandInfoNode = this.bandInfoNode;
        let bankNo = bandInfoNode.getChildByName('bankNo');
        let bankCode = bandInfoNode.getChildByName('bankCode');
        bankNo.getComponent(cc.Label).string = bandBankCardInfo.bankNo;
        bankCode.getComponent(cc.Label).string = bandBankCardInfo.bankCode;
    }
    onDidBegan(target) {
        this.rpEditBox.string = this.m_attractStr;
    }
    onDidEnded(target) {
        if (this.m_attractStr.length <= 0) {
            return;
        }
        this.rpEditBox.string = this.m_attractStr;
        this.checkIsAttract();
    }
    checkIsAttract() {
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        if (!rechargeData.minWithAmount || !rechargeData.maxWithAmount)
            return;
        let minWithAmount = rechargeData.minWithAmount;
        let maxWithAmount = rechargeData.maxWithAmount;
        let attractNum = Number(this.m_attractStr);
        if (attractNum) {
            if (attractNum >= minWithAmount && attractNum <= maxWithAmount) {
                this.btnWithdrawal.getComponent(cc.Button).enabled = true;
                let material = cc.Material.getBuiltinMaterial(this._2d_sprite_mat);
                let sp = this.btnWithdrawal.getComponent(cc.Sprite);
                sp.setMaterial(0, material);
                this.canAttract = true;
            }
        }
    }
    onTextChanged(content) {
        this.m_attractStr = content.string;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "noWithdrawal", void 0);
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "bandInfoNode", void 0);
__decorate([
    property(cc.Label)
], AttractNewView.prototype, "labGold", void 0);
__decorate([
    property(cc.Label)
], AttractNewView.prototype, "labTelephone", void 0);
__decorate([
    property(cc.Label)
], AttractNewView.prototype, "labEmail", void 0);
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "DocNode", void 0);
__decorate([
    property(cc.Node)
], AttractNewView.prototype, "btnWithdrawal", void 0);
__decorate([
    property(cc.EditBox)
], AttractNewView.prototype, "rpEditBox", void 0);
__decorate([
    property(cc.EditBox)
], AttractNewView.prototype, "codeEditBox", void 0);
AttractNewView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AttractNewView);
exports.default = AttractNewView;

cc._RF.pop();