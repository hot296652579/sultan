
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/akun/AkunView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c6fbgY3AdOsoFsAqmLmdm2', 'AkunView');
// script/akun/AkunView.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const Config_1 = require("../common/config/Config");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const HallNewView_1 = __importDefault(require("../hall/HallNewView"));
const WalletView_1 = __importDefault(require("../wallet/WalletView"));
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const UserData_1 = __importDefault(require("../data/UserData"));
const protoc_1 = require("../framework/external/protoc");
const EventApi_1 = require("../framework/event/EventApi");
const MissionView_1 = __importDefault(require("../activity/MissionView"));
const Validator_1 = __importDefault(require("../login/Validator"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const BindPhoneView_1 = __importDefault(require("../common/bindItemView/BindPhoneView"));
const UtilMgr_1 = require("../global/UtilMgr");
const BindEmailView_1 = __importDefault(require("../common/bindItemView/BindEmailView"));
const PromotionView_1 = __importDefault(require("../promotion/PromotionView"));
const PromotionUnView_1 = __importDefault(require("../promotion/PromotionUnView"));
const { ccclass, property } = cc._decorator;
let AkunView = class AkunView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnAkun = null;
        this.btnSignOut = null;
        this.btnHome = null;
        this.EmailNode = null;
        this.TeleponNode = null;
        this.KeamananNode = null;
        this.ChangePasswordNode = null;
        this.PrivasiNode = null;
        this.ReferensiNode = null;
        this.FANode = null;
        this.BahasaNode = null;
        this.TentangNode = null;
        this.editAvatarNode = null;
        this.ContactUsNode = null;
        this.rightAvatar = null;
        this.imgAvatar0 = null;
        this.imgAvatar1 = null;
        this.imgAvatar2 = null;
        this.imgAvatar3 = null;
        this.imgAvatar4 = null;
        this.imgAvatar5 = null;
        this.imgAvatar6 = null;
        this.imgAvatar7 = null;
        this.avatarIndex = 0;
        this.backTop = null;
        this.topNode = null;
        this.layananNode = null;
        this.privasiNode = null;
        this.tentangImgNode = null;
        this.codeEditBox = null;
        this.m_codeStr = "";
        this.newPasswordEditBox = null;
        this.m_newPasswordStr = "";
        this.curNodeName = null;
        this.curNode = null;
        //多语言UI
        this.Profi = null;
        this.Ranking = null;
        this.Games = null;
        this.Integration = null;
        this.Used = null;
        this.Reference = null;
        this.Reference1 = null;
        this.Arrange = null;
        this.EmailVer = null;
        this.PhoneVer = null;
        this.Security = null;
        this.ChangePass = null;
        this.Privacy = null;
        this.Language = null;
        this.About = null;
        this.ContactUS = null;
        this.About1 = null;
        // 用户数据
        this._userData = null;
    }
    static getPrefabUrl() {
        return "akun/prefabs/AkunView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.bindEvents();
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    bindEvents() {
        this.codeEditBox.node.on("editing-did-began", this.onCodeBegan, this);
        this.codeEditBox.node.on("editing-did-ended", this.onCodeEnded, this);
        this.codeEditBox.node.on("editing-return", this.onCodeEnded, this);
        this.codeEditBox.node.on("text-changed", this.onCodeChanged, this);
        this.newPasswordEditBox.node.on("editing-did-began", this.onNewPassWordBegan, this);
        this.newPasswordEditBox.node.on("editing-did-ended", this.onNewPassWordEnded, this);
        this.newPasswordEditBox.node.on("editing-return", this.onNewPassWordEnded, this);
        this.newPasswordEditBox.node.on("text-changed", this.onNewPassWordChanged, this);
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent('M2C_AuthOut_Res', this.onM2C_AuthOut_Res);
        this.registerEvent('updateUserInfo', this.refreshTopInfo);
        this.registerEvent('Event_S2C_ResetPassword', this.onEvent_S2C_ResetPassword);
        this.registerEvent('Event_S2C_ModifyAvartar', this.onEvent_S2C_ModifyAvartar);
    }
    onClick(name, node) {
        switch (name) {
            case 'btnHome':
                Manager_1.Manager.uiManager.open({ type: HallNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnDompet':
                Manager_1.Manager.uiManager.open({ type: WalletView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnEvent':
                Manager_1.Manager.uiManager.open({ type: MissionView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnLogin':
                Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnBindEmail':
                if (this.checkLogined()) {
                    this.curNodeName = 'VerifikaslEmail';
                    this.curNode = this.EmailNode;
                    this.openNodeView();
                    this.refreshEmailView();
                }
                break;
            case 'btnBindPhone':
                if (this.checkLogined()) {
                    this.curNodeName = 'VerifikaslTelepon';
                    this.curNode = this.TeleponNode;
                    this.openNodeView();
                    this.refreshPhoneView();
                }
                break;
            case 'btn2FA':
                if (this.checkLogined()) {
                    this.curNodeName = 'PengaturanKeamanan';
                    this.curNode = this.FANode;
                    this.openNodeView();
                }
                break;
            case 'HubungiKaml':
                if (this.checkLogined()) {
                    this.curNodeName = 'HubungiKaml';
                    this.curNode = this.ContactUsNode;
                    this.openNodeView();
                }
                break;
            case 'btnChangePassword':
                if (this.checkLogined()) {
                    this.curNodeName = 'MengubahKatesandi';
                    this.curNode = this.ChangePasswordNode;
                    this.openNodeView();
                }
                break;
            case 'btnPrivacy':
                if (this.checkLogined()) {
                    this.curNodeName = 'PengaturanPrivasl';
                    this.curNode = this.PrivasiNode;
                    this.openNodeView();
                }
                break;
            case 'Peringkat':
                {
                    if (this._userData.isLogined()) {
                        Manager_1.Manager.uiManager.open({ type: PromotionView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                    }
                    else {
                        Manager_1.Manager.uiManager.open({ type: PromotionUnView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                    }
                }
                break;
            case 'Bahasa':
                this.curNodeName = 'Bahasa';
                this.curNode = this.BahasaNode;
                this.openNodeView();
                break;
            case 'Tentang':
                this.curNodeName = 'Tentang';
                this.curNode = this.TentangNode;
                this.openNodeView();
                break;
            case 'WaktuLayanan':
                this.curNodeName = 'Jangka WaktuLayanan';
                this.curNode = this.layananNode;
                this.openNodeView();
                break;
            case 'KebPrivasi':
                this.curNodeName = 'Kebijakan privasi';
                this.curNode = this.privasiNode;
                this.openNodeView();
                break;
            case 'TentangSaya':
                this.curNodeName = 'tentang saya';
                this.curNode = this.tentangImgNode;
                this.openNodeView();
                break;
            case 'editHead':
                this.editAvatarNode.active = true;
                this.clickEditAvatar();
                break;
            case 'btnCloseAvatar':
                this.editAvatarNode.active = false;
                break;
            case 'btnGetCode':
                this.clickGetCodeHanlder();
                break;
            case 'btnSetNewPass':
                this.clickSetNewPassHandler();
                break;
            case 'btnSignOut':
                this.signOut();
                break;
            case 'btnSetPhoneBind':
                Manager_1.Manager.uiManager.open({ type: BindPhoneView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnSetEmailBind':
                Manager_1.Manager.uiManager.open({ type: BindEmailView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'backBtn':
                this.clickBackBtn();
                break;
            case 'imgAvatar0':
                this.avatarIndex = 0;
                this.refreshAvatar();
                break;
            case 'imgAvatar1':
                this.avatarIndex = 1;
                this.refreshAvatar();
                break;
            case 'imgAvatar2':
                this.avatarIndex = 2;
                this.refreshAvatar();
                break;
            case 'imgAvatar3':
                this.avatarIndex = 3;
                this.refreshAvatar();
                break;
            case 'imgAvatar4':
                this.avatarIndex = 4;
                this.refreshAvatar();
                break;
            case 'imgAvatar5':
                this.avatarIndex = 5;
                this.refreshAvatar();
                break;
            case 'imgAvatar6':
                this.avatarIndex = 6;
                this.refreshAvatar();
                break;
            case 'imgAvatar7':
                this.avatarIndex = 7;
                this.refreshAvatar();
                break;
            case 'btnAvatarSure':
                this.requestChangeAvatar();
                break;
        }
    }
    requestChangeAvatar() {
        let avartar = String(this.avatarIndex);
        let req = protoc_1.MST.C2S_ModifyAvartar.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            avartar
        });
        let buffer = protoc_1.MST.C2S_ModifyAvartar.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_ModifyAvartar, protoc_1.MST.OuterOpcode_Lobby.C2S_ModifyAvartar, buffer);
    }
    checkLogined() {
        if (!this._userData.id) {
            Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }
    clickEditAvatar() {
        let userData = this._userData;
        let headerUrl = userData.info.HeaderUrl;
        if (headerUrl == '') {
            this.avatarIndex = 0;
        }
        else {
            if (headerUrl.indexOf('http') == -1) {
                this.avatarIndex = Number(headerUrl);
            }
        }
        this.refreshAvatar();
    }
    refreshAvatar() {
        let avatarIndex = this.avatarIndex;
        for (let index = 0; index < 8; index++) {
            let avatarItem = this[`imgAvatar${index}`];
            let choose = avatarItem.node.getChildByName('choose');
            choose.active = false;
            // if (avatarIndex == index)
            //     choose.active = true;
        }
        let rightAvatar = this.rightAvatar;
        let imgAvatar = rightAvatar.getChildByName('imgAvatar').getComponent(cc.Sprite);
        imgAvatar.loadImage({ url: Config_1.Config.avatar_path + (avatarIndex + 1), view: this, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    clickBackBtn() {
        let curNodeName = this.curNodeName;
        this.curNode.active = false;
        if (curNodeName == 'Jangka WaktuLayanan' || curNodeName == 'Kebijakan privasi' || curNodeName == 'tentang saya') {
            this.curNodeName = 'Tentang';
            this.curNode = this.TentangNode;
            this.openNodeView();
        }
        else {
            this.backTop.active = false;
        }
    }
    show(args) {
        this.onLanguageChange();
        this.refreshTopInfo();
    }
    onLanguageChange() {
        this.Profi.string = LanguageImpl_1.i18n.AKUN_TITLE.PROFILE;
        this.Ranking.string = LanguageImpl_1.i18n.AKUN_TITLE.RANKING;
        this.Games.string = LanguageImpl_1.i18n.AKUN_TITLE.GAMES;
        this.Integration.string = LanguageImpl_1.i18n.AKUN_TITLE.INTEGRATION;
        this.Used.string = LanguageImpl_1.i18n.AKUN_TITLE.USED;
        this.Reference.string = LanguageImpl_1.i18n.AKUN_TITLE.REFERENCE;
        this.Reference1.string = LanguageImpl_1.i18n.AKUN_TITLE.REFERENCE;
        this.Arrange.string = LanguageImpl_1.i18n.AKUN_TITLE.ARRANGE;
        this.EmailVer.string = LanguageImpl_1.i18n.AKUN_TITLE.EMAIL_VERIFICATION;
        this.PhoneVer.string = LanguageImpl_1.i18n.AKUN_TITLE.PHONE_VERIFICATION;
        this.Security.string = LanguageImpl_1.i18n.AKUN_TITLE.SECURITY_SETTING;
        this.ChangePass.string = LanguageImpl_1.i18n.AKUN_TITLE.CHANGE_PASSWORD;
        this.Privacy.string = LanguageImpl_1.i18n.AKUN_TITLE.PRIVACY_SETTING;
        this.Language.string = LanguageImpl_1.i18n.AKUN_TITLE.LANGUAGE;
        this.About.string = LanguageImpl_1.i18n.AKUN_TITLE.ABOUT;
        this.About1.string = LanguageImpl_1.i18n.AKUN_TITLE.ABOUT;
        this.ContactUS.string = LanguageImpl_1.i18n.AKUN_TITLE.CONTACT_US;
    }
    refreshTopInfo() {
        let Logined = this.topNode.getChildByName('Logined');
        let notLogin = this.topNode.getChildByName('NotLogin');
        Logined.active = false;
        notLogin.active = false;
        let userData = this._userData;
        let playerInfo = userData['info'];
        if (playerInfo) {
            let avatar = Logined.getChildByName('avatar');
            let imgAvatar = avatar.getChildByName('imgAvatar').getComponent(cc.Sprite);
            let userName = Logined.getChildByName('userName');
            userName.getComponent(cc.Label).string = playerInfo.Nick;
            UtilMgr_1.UtilMgr.loadHeadImg(imgAvatar, this._userData.info.HeaderUrl, this._userData.info.UnitId, this);
            // let avatarIndex;
            // if (userData.info.HeaderUrl == '' || userData.info.HeaderUrl == undefined)
            //     avatarIndex = 0
            // else
            //     avatarIndex = Number(userData.info.HeaderUrl);
            // imgAvatar.loadImage({ url: Config.avatar_path + (avatarIndex + 1), view: this, bundle: BUNDLE_RESOURCES })
        }
        Logined.active = playerInfo ? true : false;
        notLogin.active = !Logined.active;
        this.btnSignOut.active = Logined.active;
    }
    openNodeView() {
        this.backTop.active = true;
        let backBtn = this.backTop.getChildByName('backBtn');
        let viewTitle = backBtn.getChildByName('showViewTitle').getComponent(cc.Label);
        viewTitle.string = this.curNodeName;
        this.curNode.active = true;
    }
    clickGetCodeHanlder() {
        let userData = this._userData;
        if (userData.email)
            this.requestGetCheckCode();
    }
    clickSetNewPassHandler() {
        let userData = this._userData;
        let username = userData.email;
        let password = this.m_newPasswordStr;
        let checkCode = this.m_codeStr;
        let validator = new Validator_1.default();
        if (!username) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.NOBOUDMAIL);
            return;
        }
        validator.add(checkCode, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.REGISTER.CODEINFORMATIONEMPTY
            }]);
        validator.add(password, [{
                strategy: 'minLength:8',
                errorMsg: LanguageImpl_1.i18n.REGISTER.PASSWORD8
            }]);
        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            return;
        }
        this.requestResetPass();
    }
    requestResetPass() {
        // C2S_ResetPassword
        let userData = this._userData;
        let username = userData.email;
        let password = this.m_newPasswordStr;
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
    onEvent_S2C_ResetPassword() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.CHANGEPASSWORDSUCCESS);
    }
    onEvent_S2C_ModifyAvartar() {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REGISTER.CHANGEAVATARSUCCESS);
        this.editAvatarNode.active = false;
        this.refreshTopInfo();
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
    onNewPassWordBegan(target) {
        this.newPasswordEditBox.string = this.m_newPasswordStr;
    }
    onNewPassWordEnded(target) {
        if (this.m_newPasswordStr.length <= 0) {
            return;
        }
        this.newPasswordEditBox.string = this.m_newPasswordStr;
    }
    onNewPassWordChanged(content) {
        this.m_newPasswordStr = content.string;
    }
    refreshEmailView() {
        let bindNode = this.EmailNode.getChildByName('frame').getChildByName('bindNode');
        let noBindNode = this.EmailNode.getChildByName('frame').getChildByName('noBindNode');
        let userData = this._userData;
        if (userData.email) {
            bindNode.active = true;
            noBindNode.active = false;
            let labBindEmail = bindNode.getChildByName('bindEmail').getComponent(cc.Label);
            labBindEmail.string = userData.email;
        }
        else {
            bindNode.active = false;
            noBindNode.active = true;
        }
    }
    refreshPhoneView() {
        let labPhone = this.TeleponNode.getChildByName('frame').getChildByName('framePhone').getChildByName('labPhone');
        let userData = this._userData;
        if (userData.BindPhone) {
            labPhone.getComponent(cc.Label).string = userData.BindPhone;
        }
        else {
            labPhone.getComponent(cc.Label).string = '';
        }
    }
    onM2C_AuthOut_Res(data) {
        let self = this;
        // fbsdk.instance.FB_SignOut(function () {
        //     let userData = G.DataMgr.get(UserData);
        //     userData.clearUserData()
        //     self.refreshTopInfo()
        // })
        let userData = this._userData;
        userData.clearUserData();
        this.refreshTopInfo();
        dispatch('updateUserInfo');
    }
    signOut() {
        let req = protoc_1.MST.C2M_AuthOut_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2M_AuthOut_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_AuthOut_Req, protoc_1.MST.OuterOpcode_Map.C2M_AuthOut_Req, buffer);
    }
};
__decorate([
    property(cc.Node)
], AkunView.prototype, "btnAkun", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "btnSignOut", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "btnHome", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "EmailNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "TeleponNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "KeamananNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "ChangePasswordNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "PrivasiNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "ReferensiNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "FANode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "BahasaNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "TentangNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "editAvatarNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "ContactUsNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "rightAvatar", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar0", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar1", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar2", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar3", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar4", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar5", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar6", void 0);
__decorate([
    property(cc.Sprite)
], AkunView.prototype, "imgAvatar7", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "backTop", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "topNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "layananNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "privasiNode", void 0);
__decorate([
    property(cc.Node)
], AkunView.prototype, "tentangImgNode", void 0);
__decorate([
    property(cc.EditBox)
], AkunView.prototype, "codeEditBox", void 0);
__decorate([
    property(cc.EditBox)
], AkunView.prototype, "newPasswordEditBox", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Profi", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Ranking", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Games", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Integration", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Used", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Reference", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Reference1", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Arrange", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "EmailVer", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "PhoneVer", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Security", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "ChangePass", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Privacy", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "Language", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "About", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "ContactUS", void 0);
__decorate([
    property(cc.Label)
], AkunView.prototype, "About1", void 0);
AkunView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AkunView);
exports.default = AkunView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYWt1bi9Ba3VuVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUc1QyxvREFBaUQ7QUFDakQsa0VBQXVEO0FBQ3ZELDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFFM0UsdURBQW9EO0FBQ3BELHVEQUFxRjtBQUNyRixzRUFBOEM7QUFDOUMsc0VBQThDO0FBQzlDLHlFQUFpRDtBQUNqRCxnRUFBd0M7QUFFeEMseURBQW1EO0FBQ25ELDBEQUF1RDtBQUN2RCwwRUFBa0Q7QUFDbEQsbUVBQTJDO0FBQzNDLG9FQUE0QztBQUM1Qyx5RkFBaUU7QUFDakUsK0NBQTRDO0FBQzVDLHlGQUFpRTtBQUNqRSwrRUFBdUQ7QUFDdkQsbUZBQTJEO0FBRzNELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxnQkFBTTtJQUE1Qzs7UUFJSSxZQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFFL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsZUFB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LENBQUM7dUNBQ0k7QUFFdkI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDVTtBQUU3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NDQUNHO0FBRXRCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkNBQ1E7QUFFM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0Q0FDUztBQUU1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lDQUNNO0FBRXpCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MENBQ087QUFFMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswQ0FDTztBQUUxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBDQUNPO0FBRTFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NENBQ1M7QUFFNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5Q0FDTTtBQUV6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBDQUNPO0FBRTFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dUNBQ0k7QUFFdkI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyQ0FDUTtBQUUzQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dDQUNLO0FBNUdQLFFBQVE7SUFGNUIsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsUUFBUSxDQTRrQjVCO2tCQTVrQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBkaXNwYXRjaEVudGVyQ29tcGxldGUsIExvZ2ljRXZlbnQsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vYmFzZS9Ib3RVcGRhdGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMsIEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IEhhbGxOZXdWaWV3IGZyb20gXCIuLi9oYWxsL0hhbGxOZXdWaWV3XCI7XG5pbXBvcnQgV2FsbGV0VmlldyBmcm9tIFwiLi4vd2FsbGV0L1dhbGxldFZpZXdcIjtcbmltcG9ydCBMb2dpbk5ld1ZpZXcgZnJvbSBcIi4uL2xvZ2luL0xvZ2luTmV3Vmlld1wiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgZmJzZGsgZnJvbSBcIi4uL3Nkay9mYnNka1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IE1pc3Npb25WaWV3IGZyb20gXCIuLi9hY3Rpdml0eS9NaXNzaW9uVmlld1wiO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tIFwiLi4vbG9naW4vVmFsaWRhdG9yXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgQmluZFBob25lVmlldyBmcm9tIFwiLi4vY29tbW9uL2JpbmRJdGVtVmlldy9CaW5kUGhvbmVWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgQmluZEVtYWlsVmlldyBmcm9tIFwiLi4vY29tbW9uL2JpbmRJdGVtVmlldy9CaW5kRW1haWxWaWV3XCI7XG5pbXBvcnQgUHJvbW90aW9uVmlldyBmcm9tIFwiLi4vcHJvbW90aW9uL1Byb21vdGlvblZpZXdcIjtcbmltcG9ydCBQcm9tb3Rpb25VblZpZXcgZnJvbSBcIi4uL3Byb21vdGlvbi9Qcm9tb3Rpb25VblZpZXdcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWt1blZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkFrdW46IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0blNpZ25PdXQ6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJ0bkhvbWU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgRW1haWxOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBUZWxlcG9uTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgS2VhbWFuYW5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBDaGFuZ2VQYXNzd29yZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFByaXZhc2lOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBSZWZlcmVuc2lOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBGQU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIEJhaGFzYU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFRlbnRhbmdOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBlZGl0QXZhdGFyTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgQ29udGFjdFVzTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByaWdodEF2YXRhcjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpbWdBdmF0YXIwOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaW1nQXZhdGFyMTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGltZ0F2YXRhcjI6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpbWdBdmF0YXIzOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaW1nQXZhdGFyNDogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGltZ0F2YXRhcjU6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpbWdBdmF0YXI2OiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaW1nQXZhdGFyNzogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBhdmF0YXJJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJhY2tUb3A6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRvcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxheWFuYW5Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcml2YXNpTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdGVudGFuZ0ltZ05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgY29kZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIG1fY29kZVN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIG5ld1Bhc3N3b3JkRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG4gICAgbV9uZXdQYXNzd29yZFN0cjogc3RyaW5nID0gXCJcIjtcblxuICAgIGN1ck5vZGVOYW1lOiBzdHJpbmcgPSBudWxsO1xuICAgIGN1ck5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8v5aSa6K+t6KiAVUlcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgUHJvZmk6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgUmFua2luZzogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBHYW1lczogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBJbnRlZ3JhdGlvbjogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBVc2VkOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIFJlZmVyZW5jZTogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBSZWZlcmVuY2UxOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIEFycmFuZ2U6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgRW1haWxWZXI6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgUGhvbmVWZXI6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgU2VjdXJpdHk6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgQ2hhbmdlUGFzczogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBQcml2YWN5OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIExhbmd1YWdlOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIEFib3V0OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIENvbnRhY3RVUzogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBBYm91dDE6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIOeUqOaIt+aVsOaNrlxuICAgIHByaXZhdGUgX3VzZXJEYXRhOiBVc2VyRGF0YSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiYWt1bi9wcmVmYWJzL0FrdW5WaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBpbml0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5fdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uQ29kZUJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkNvZGVFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctcmV0dXJuXCIsIHRoaXMub25Db2RlRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvZGVFZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vbkNvZGVDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtYmVnYW5cIiwgdGhpcy5vbk5ld1Bhc3NXb3JkQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbk5ld1Bhc3NXb3JkRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkRWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vbk5ld1Bhc3NXb3JkRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkRWRpdEJveC5ub2RlLm9uKFwidGV4dC1jaGFuZ2VkXCIsIHRoaXMub25OZXdQYXNzV29yZENoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKVxuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ00yQ19BdXRoT3V0X1JlcycsIHRoaXMub25NMkNfQXV0aE91dF9SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ3VwZGF0ZVVzZXJJbmZvJywgdGhpcy5yZWZyZXNoVG9wSW5mbyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX1Jlc2V0UGFzc3dvcmQnLCB0aGlzLm9uRXZlbnRfUzJDX1Jlc2V0UGFzc3dvcmQpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoJ0V2ZW50X1MyQ19Nb2RpZnlBdmFydGFyJywgdGhpcy5vbkV2ZW50X1MyQ19Nb2RpZnlBdmFydGFyKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdidG5Ib21lJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogSGFsbE5ld1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkRvbXBldCc6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFdhbGxldFZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkV2ZW50JzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTWlzc2lvblZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkxvZ2luJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5CaW5kRW1haWwnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZU5hbWUgPSAnVmVyaWZpa2FzbEVtYWlsJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlID0gdGhpcy5FbWFpbE5vZGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTm9kZVZpZXcoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hFbWFpbFZpZXcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkJpbmRQaG9uZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlTmFtZSA9ICdWZXJpZmlrYXNsVGVsZXBvbic7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZSA9IHRoaXMuVGVsZXBvbk5vZGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTm9kZVZpZXcoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hQaG9uZVZpZXcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bjJGQSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlTmFtZSA9ICdQZW5nYXR1cmFuS2VhbWFuYW4nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ck5vZGUgPSB0aGlzLkZBTm9kZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ob2RlVmlldygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnSHVidW5naUthbWwnOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZU5hbWUgPSAnSHVidW5naUthbWwnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ck5vZGUgPSB0aGlzLkNvbnRhY3RVc05vZGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTm9kZVZpZXcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNoYW5nZVBhc3N3b3JkJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0xvZ2luZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ck5vZGVOYW1lID0gJ01lbmd1YmFoS2F0ZXNhbmRpJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlID0gdGhpcy5DaGFuZ2VQYXNzd29yZE5vZGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuTm9kZVZpZXcoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0blByaXZhY3knOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrTG9naW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZU5hbWUgPSAnUGVuZ2F0dXJhblByaXZhc2wnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ck5vZGUgPSB0aGlzLlByaXZhc2lOb2RlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3Blbk5vZGVWaWV3KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdQZXJpbmdrYXQnOiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VzZXJEYXRhLmlzTG9naW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBQcm9tb3Rpb25WaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFByb21vdGlvblVuVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0JhaGFzYSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlTmFtZSA9ICdCYWhhc2EnO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZSA9IHRoaXMuQmFoYXNhTm9kZVxuICAgICAgICAgICAgICAgIHRoaXMub3Blbk5vZGVWaWV3KClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RlbnRhbmcnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZU5hbWUgPSAnVGVudGFuZyc7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlID0gdGhpcy5UZW50YW5nTm9kZVxuICAgICAgICAgICAgICAgIHRoaXMub3Blbk5vZGVWaWV3KClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1dha3R1TGF5YW5hbic6XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlTmFtZSA9ICdKYW5na2EgV2FrdHVMYXlhbmFuJztcbiAgICAgICAgICAgICAgICB0aGlzLmN1ck5vZGUgPSB0aGlzLmxheWFuYW5Ob2RlXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuTm9kZVZpZXcoKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnS2ViUHJpdmFzaSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlTmFtZSA9ICdLZWJpamFrYW4gcHJpdmFzaSc7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlID0gdGhpcy5wcml2YXNpTm9kZVxuICAgICAgICAgICAgICAgIHRoaXMub3Blbk5vZGVWaWV3KClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RlbnRhbmdTYXlhJzpcbiAgICAgICAgICAgICAgICB0aGlzLmN1ck5vZGVOYW1lID0gJ3RlbnRhbmcgc2F5YSc7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJOb2RlID0gdGhpcy50ZW50YW5nSW1nTm9kZVxuICAgICAgICAgICAgICAgIHRoaXMub3Blbk5vZGVWaWV3KClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2VkaXRIZWFkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRBdmF0YXJOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrRWRpdEF2YXRhcigpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5DbG9zZUF2YXRhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0QXZhdGFyTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuR2V0Q29kZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0dldENvZGVIYW5sZGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5TZXROZXdQYXNzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrU2V0TmV3UGFzc0hhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0blNpZ25PdXQnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbk91dCgpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5TZXRQaG9uZUJpbmQnOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBCaW5kUGhvbmVWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5TZXRFbWFpbEJpbmQnOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBCaW5kRW1haWxWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiYWNrQnRuJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQmFja0J0bigpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbWdBdmF0YXIwJzpcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdmF0YXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ltZ0F2YXRhcjEnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFySW5kZXggPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEF2YXRhcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW1nQXZhdGFyMic6XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJJbmRleCA9IDI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXZhdGFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbWdBdmF0YXIzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhckluZGV4ID0gMztcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdmF0YXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ltZ0F2YXRhcjQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFySW5kZXggPSA0O1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEF2YXRhcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW1nQXZhdGFyNSc6XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJJbmRleCA9IDU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXZhdGFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbWdBdmF0YXI2JzpcbiAgICAgICAgICAgICAgICB0aGlzLmF2YXRhckluZGV4ID0gNjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hBdmF0YXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ltZ0F2YXRhcjcnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXZhdGFySW5kZXggPSA3O1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaEF2YXRhcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuQXZhdGFyU3VyZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2hhbmdlQXZhdGFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXF1ZXN0Q2hhbmdlQXZhdGFyKCkge1xuICAgICAgICBsZXQgYXZhcnRhciA9IFN0cmluZyh0aGlzLmF2YXRhckluZGV4KTtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfTW9kaWZ5QXZhcnRhci5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIGF2YXJ0YXJcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX01vZGlmeUF2YXJ0YXIuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMlNfTW9kaWZ5QXZhcnRhciwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19Nb2RpZnlBdmFydGFyLCBidWZmZXIpO1xuICAgIH1cblxuICAgIGNoZWNrTG9naW5lZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl91c2VyRGF0YS5pZCkge1xuICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IExvZ2luTmV3VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNsaWNrRWRpdEF2YXRhcigpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGxldCBoZWFkZXJVcmwgPSB1c2VyRGF0YS5pbmZvLkhlYWRlclVybDtcblxuICAgICAgICBpZiAoaGVhZGVyVXJsID09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLmF2YXRhckluZGV4ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChoZWFkZXJVcmwuaW5kZXhPZignaHR0cCcpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJJbmRleCA9IE51bWJlcihoZWFkZXJVcmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoQXZhdGFyKCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaEF2YXRhcigpIHtcbiAgICAgICAgbGV0IGF2YXRhckluZGV4ID0gdGhpcy5hdmF0YXJJbmRleDtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGxldCBhdmF0YXJJdGVtID0gdGhpc1tgaW1nQXZhdGFyJHtpbmRleH1gXTtcbiAgICAgICAgICAgIGxldCBjaG9vc2UgPSBhdmF0YXJJdGVtLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2Nob29zZScpO1xuICAgICAgICAgICAgY2hvb3NlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiAoYXZhdGFySW5kZXggPT0gaW5kZXgpXG4gICAgICAgICAgICAvLyAgICAgY2hvb3NlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmlnaHRBdmF0YXIgPSB0aGlzLnJpZ2h0QXZhdGFyO1xuICAgICAgICBsZXQgaW1nQXZhdGFyID0gcmlnaHRBdmF0YXIuZ2V0Q2hpbGRCeU5hbWUoJ2ltZ0F2YXRhcicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpbWdBdmF0YXIubG9hZEltYWdlKHsgdXJsOiBDb25maWcuYXZhdGFyX3BhdGggKyAoYXZhdGFySW5kZXggKyAxKSwgdmlldzogdGhpcywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pXG4gICAgfVxuXG4gICAgY2xpY2tCYWNrQnRuKCkge1xuICAgICAgICBsZXQgY3VyTm9kZU5hbWUgPSB0aGlzLmN1ck5vZGVOYW1lXG4gICAgICAgIHRoaXMuY3VyTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICBpZiAoY3VyTm9kZU5hbWUgPT0gJ0phbmdrYSBXYWt0dUxheWFuYW4nIHx8IGN1ck5vZGVOYW1lID09ICdLZWJpamFrYW4gcHJpdmFzaScgfHwgY3VyTm9kZU5hbWUgPT0gJ3RlbnRhbmcgc2F5YScpIHtcbiAgICAgICAgICAgIHRoaXMuY3VyTm9kZU5hbWUgPSAnVGVudGFuZydcbiAgICAgICAgICAgIHRoaXMuY3VyTm9kZSA9IHRoaXMuVGVudGFuZ05vZGVcbiAgICAgICAgICAgIHRoaXMub3Blbk5vZGVWaWV3KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJhY2tUb3AuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG9wSW5mbygpXG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5Qcm9maS5zdHJpbmcgPSBpMThuLkFLVU5fVElUTEUuUFJPRklMRVxuICAgICAgICB0aGlzLlJhbmtpbmcuc3RyaW5nID0gaTE4bi5BS1VOX1RJVExFLlJBTktJTkdcbiAgICAgICAgdGhpcy5HYW1lcy5zdHJpbmcgPSBpMThuLkFLVU5fVElUTEUuR0FNRVNcbiAgICAgICAgdGhpcy5JbnRlZ3JhdGlvbi5zdHJpbmcgPSBpMThuLkFLVU5fVElUTEUuSU5URUdSQVRJT05cbiAgICAgICAgdGhpcy5Vc2VkLnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5VU0VEXG4gICAgICAgIHRoaXMuUmVmZXJlbmNlLnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5SRUZFUkVOQ0VcbiAgICAgICAgdGhpcy5SZWZlcmVuY2UxLnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5SRUZFUkVOQ0VcbiAgICAgICAgdGhpcy5BcnJhbmdlLnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5BUlJBTkdFXG4gICAgICAgIHRoaXMuRW1haWxWZXIuc3RyaW5nID0gaTE4bi5BS1VOX1RJVExFLkVNQUlMX1ZFUklGSUNBVElPTlxuICAgICAgICB0aGlzLlBob25lVmVyLnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5QSE9ORV9WRVJJRklDQVRJT05cbiAgICAgICAgdGhpcy5TZWN1cml0eS5zdHJpbmcgPSBpMThuLkFLVU5fVElUTEUuU0VDVVJJVFlfU0VUVElOR1xuICAgICAgICB0aGlzLkNoYW5nZVBhc3Muc3RyaW5nID0gaTE4bi5BS1VOX1RJVExFLkNIQU5HRV9QQVNTV09SRFxuICAgICAgICB0aGlzLlByaXZhY3kuc3RyaW5nID0gaTE4bi5BS1VOX1RJVExFLlBSSVZBQ1lfU0VUVElOR1xuICAgICAgICB0aGlzLkxhbmd1YWdlLnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5MQU5HVUFHRVxuICAgICAgICB0aGlzLkFib3V0LnN0cmluZyA9IGkxOG4uQUtVTl9USVRMRS5BQk9VVFxuICAgICAgICB0aGlzLkFib3V0MS5zdHJpbmcgPSBpMThuLkFLVU5fVElUTEUuQUJPVVRcbiAgICAgICAgdGhpcy5Db250YWN0VVMuc3RyaW5nID0gaTE4bi5BS1VOX1RJVExFLkNPTlRBQ1RfVVNcbiAgICB9XG5cbiAgICByZWZyZXNoVG9wSW5mbygpIHtcbiAgICAgICAgbGV0IExvZ2luZWQgPSB0aGlzLnRvcE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0xvZ2luZWQnKVxuICAgICAgICBsZXQgbm90TG9naW4gPSB0aGlzLnRvcE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ05vdExvZ2luJylcbiAgICAgICAgTG9naW5lZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgbm90TG9naW4uYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGxldCBwbGF5ZXJJbmZvID0gdXNlckRhdGFbJ2luZm8nXTtcblxuICAgICAgICBpZiAocGxheWVySW5mbykge1xuICAgICAgICAgICAgbGV0IGF2YXRhciA9IExvZ2luZWQuZ2V0Q2hpbGRCeU5hbWUoJ2F2YXRhcicpXG4gICAgICAgICAgICBsZXQgaW1nQXZhdGFyID0gYXZhdGFyLmdldENoaWxkQnlOYW1lKCdpbWdBdmF0YXInKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgIGxldCB1c2VyTmFtZSA9IExvZ2luZWQuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXJOYW1lJylcbiAgICAgICAgICAgIHVzZXJOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGxheWVySW5mby5OaWNrXG4gICAgICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKGltZ0F2YXRhciwgdGhpcy5fdXNlckRhdGEuaW5mby5IZWFkZXJVcmwsIHRoaXMuX3VzZXJEYXRhLmluZm8uVW5pdElkLCB0aGlzKTtcblxuICAgICAgICAgICAgLy8gbGV0IGF2YXRhckluZGV4O1xuICAgICAgICAgICAgLy8gaWYgKHVzZXJEYXRhLmluZm8uSGVhZGVyVXJsID09ICcnIHx8IHVzZXJEYXRhLmluZm8uSGVhZGVyVXJsID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIC8vICAgICBhdmF0YXJJbmRleCA9IDBcbiAgICAgICAgICAgIC8vIGVsc2VcbiAgICAgICAgICAgIC8vICAgICBhdmF0YXJJbmRleCA9IE51bWJlcih1c2VyRGF0YS5pbmZvLkhlYWRlclVybCk7XG5cbiAgICAgICAgICAgIC8vIGltZ0F2YXRhci5sb2FkSW1hZ2UoeyB1cmw6IENvbmZpZy5hdmF0YXJfcGF0aCArIChhdmF0YXJJbmRleCArIDEpLCB2aWV3OiB0aGlzLCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSlcbiAgICAgICAgfVxuICAgICAgICBMb2dpbmVkLmFjdGl2ZSA9IHBsYXllckluZm8gPyB0cnVlIDogZmFsc2VcbiAgICAgICAgbm90TG9naW4uYWN0aXZlID0gIUxvZ2luZWQuYWN0aXZlXG4gICAgICAgIHRoaXMuYnRuU2lnbk91dC5hY3RpdmUgPSBMb2dpbmVkLmFjdGl2ZVxuICAgIH1cblxuICAgIG9wZW5Ob2RlVmlldygpIHtcbiAgICAgICAgdGhpcy5iYWNrVG9wLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgbGV0IGJhY2tCdG4gPSB0aGlzLmJhY2tUb3AuZ2V0Q2hpbGRCeU5hbWUoJ2JhY2tCdG4nKVxuICAgICAgICBsZXQgdmlld1RpdGxlID0gYmFja0J0bi5nZXRDaGlsZEJ5TmFtZSgnc2hvd1ZpZXdUaXRsZScpLmdldENvbXBvbmVudChjYy5MYWJlbClcbiAgICAgICAgdmlld1RpdGxlLnN0cmluZyA9IHRoaXMuY3VyTm9kZU5hbWVcbiAgICAgICAgdGhpcy5jdXJOb2RlLmFjdGl2ZSA9IHRydWVcbiAgICB9XG5cbiAgICBjbGlja0dldENvZGVIYW5sZGVyKCkge1xuICAgICAgICBsZXQgdXNlckRhdGEgPSB0aGlzLl91c2VyRGF0YTtcbiAgICAgICAgaWYgKHVzZXJEYXRhLmVtYWlsKVxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0R2V0Q2hlY2tDb2RlKCk7XG4gICAgfVxuXG4gICAgY2xpY2tTZXROZXdQYXNzSGFuZGxlcigpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHVzZXJEYXRhLmVtYWlsO1xuICAgICAgICBsZXQgcGFzc3dvcmQgPSB0aGlzLm1fbmV3UGFzc3dvcmRTdHI7XG4gICAgICAgIGxldCBjaGVja0NvZGUgPSB0aGlzLm1fY29kZVN0cjtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcblxuICAgICAgICBpZiAoIXVzZXJuYW1lKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFR0lTVEVSLk5PQk9VRE1BSUwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZChjaGVja0NvZGUsIFt7XG4gICAgICAgICAgICBzdHJhdGVneTogJ2lzTm9uRW1wdHknLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuQ09ERUlORk9STUFUSU9ORU1QVFlcbiAgICAgICAgfV0pO1xuICAgICAgICB2YWxpZGF0b3IuYWRkKHBhc3N3b3JkLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdtaW5MZW5ndGg6OCcsXG4gICAgICAgICAgICBlcnJvck1zZzogaTE4bi5SRUdJU1RFUi5QQVNTV09SRDhcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIGxldCBlcnJvck1zZyA9IHZhbGlkYXRvci5zdGFydCgpO1xuICAgICAgICBpZiAoZXJyb3JNc2cpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGVycm9yTXNnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVxdWVzdFJlc2V0UGFzcygpXG4gICAgfVxuXG4gICAgcmVxdWVzdFJlc2V0UGFzcygpIHtcbiAgICAgICAgLy8gQzJTX1Jlc2V0UGFzc3dvcmRcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGxldCB1c2VybmFtZSA9IHVzZXJEYXRhLmVtYWlsO1xuICAgICAgICBsZXQgcGFzc3dvcmQgPSB0aGlzLm1fbmV3UGFzc3dvcmRTdHI7XG4gICAgICAgIGxldCBjaGVja0NvZGUgPSB0aGlzLm1fY29kZVN0cjtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfUmVzZXRQYXNzd29yZC5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBjaGVja0NvZGVcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX1Jlc2V0UGFzc3dvcmQuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMlNfUmVzZXRQYXNzd29yZCwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19SZXNldFBhc3N3b3JkLCBidWZmZXIpO1xuICAgIH1cblxuICAgIHJlcXVlc3RHZXRDaGVja0NvZGUoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IHRoaXMuX3VzZXJEYXRhO1xuICAgICAgICBsZXQgdXNlcm5hbWUgPSB1c2VyRGF0YS5lbWFpbDtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfR2V0Q2hlY2tDb2RlLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJpYWw6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgdXNlcm5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX0dldENoZWNrQ29kZS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19HZXRDaGVja0NvZGUsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfR2V0Q2hlY2tDb2RlLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uRXZlbnRfUzJDX1Jlc2V0UGFzc3dvcmQoKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uUkVHSVNURVIuQ0hBTkdFUEFTU1dPUkRTVUNDRVNTKTtcbiAgICB9XG5cbiAgICBvbkV2ZW50X1MyQ19Nb2RpZnlBdmFydGFyKCkge1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFR0lTVEVSLkNIQU5HRUFWQVRBUlNVQ0NFU1MpO1xuICAgICAgICB0aGlzLmVkaXRBdmF0YXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlZnJlc2hUb3BJbmZvKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvZGVCZWdhbih0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2RlRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fY29kZVN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29kZUVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX2NvZGVTdHIubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29kZUVkaXRCb3guc3RyaW5nID0gdGhpcy5tX2NvZGVTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNvZGVDaGFuZ2VkKGNvbnRlbnQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tX2NvZGVTdHIgPSBjb250ZW50LnN0cmluZztcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTmV3UGFzc1dvcmRCZWdhbih0YXJnZXQ6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5uZXdQYXNzd29yZEVkaXRCb3guc3RyaW5nID0gdGhpcy5tX25ld1Bhc3N3b3JkU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25OZXdQYXNzV29yZEVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX25ld1Bhc3N3b3JkU3RyLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5ld1Bhc3N3b3JkRWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fbmV3UGFzc3dvcmRTdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk5ld1Bhc3NXb3JkQ2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9uZXdQYXNzd29yZFN0ciA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIHJlZnJlc2hFbWFpbFZpZXcoKSB7XG4gICAgICAgIGxldCBiaW5kTm9kZSA9IHRoaXMuRW1haWxOb2RlLmdldENoaWxkQnlOYW1lKCdmcmFtZScpLmdldENoaWxkQnlOYW1lKCdiaW5kTm9kZScpXG4gICAgICAgIGxldCBub0JpbmROb2RlID0gdGhpcy5FbWFpbE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ZyYW1lJykuZ2V0Q2hpbGRCeU5hbWUoJ25vQmluZE5vZGUnKVxuXG4gICAgICAgIGxldCB1c2VyRGF0YSA9IHRoaXMuX3VzZXJEYXRhO1xuICAgICAgICBpZiAodXNlckRhdGEuZW1haWwpIHtcbiAgICAgICAgICAgIGJpbmROb2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIG5vQmluZE5vZGUuYWN0aXZlID0gZmFsc2VcblxuICAgICAgICAgICAgbGV0IGxhYkJpbmRFbWFpbCA9IGJpbmROb2RlLmdldENoaWxkQnlOYW1lKCdiaW5kRW1haWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgbGFiQmluZEVtYWlsLnN0cmluZyA9IHVzZXJEYXRhLmVtYWlsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmluZE5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIG5vQmluZE5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVmcmVzaFBob25lVmlldygpIHtcbiAgICAgICAgbGV0IGxhYlBob25lID0gdGhpcy5UZWxlcG9uTm9kZS5nZXRDaGlsZEJ5TmFtZSgnZnJhbWUnKS5nZXRDaGlsZEJ5TmFtZSgnZnJhbWVQaG9uZScpLmdldENoaWxkQnlOYW1lKCdsYWJQaG9uZScpXG5cbiAgICAgICAgbGV0IHVzZXJEYXRhID0gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIGlmICh1c2VyRGF0YS5CaW5kUGhvbmUpIHtcbiAgICAgICAgICAgIGxhYlBob25lLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdXNlckRhdGEuQmluZFBob25lXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsYWJQaG9uZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25NMkNfQXV0aE91dF9SZXMoZGF0YTogTVNULk0yQ19BdXRoT3V0X1Jlcykge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIC8vIGZic2RrLmluc3RhbmNlLkZCX1NpZ25PdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIC8vICAgICB1c2VyRGF0YS5jbGVhclVzZXJEYXRhKClcbiAgICAgICAgLy8gICAgIHNlbGYucmVmcmVzaFRvcEluZm8oKVxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIGxldCB1c2VyRGF0YSA9IHRoaXMuX3VzZXJEYXRhO1xuICAgICAgICB1c2VyRGF0YS5jbGVhclVzZXJEYXRhKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFRvcEluZm8oKTtcbiAgICAgICAgZGlzcGF0Y2goJ3VwZGF0ZVVzZXJJbmZvJyk7XG4gICAgfVxuXG4gICAgc2lnbk91dCgpIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMk1fQXV0aE91dF9SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMk1fQXV0aE91dF9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMk1fQXV0aE91dF9SZXEsIE1TVC5PdXRlck9wY29kZV9NYXAuQzJNX0F1dGhPdXRfUmVxLCBidWZmZXIpO1xuXG5cbiAgICB9XG59XG4iXX0=