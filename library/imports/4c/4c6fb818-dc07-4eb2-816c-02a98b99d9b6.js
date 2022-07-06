"use strict";
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