import UIView from "../framework/ui/UIView";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { GameConfig } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { i18n } from "../common/language/LanguageImpl";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { IController } from "../framework/controller/Controller";
import { Manager } from "../common/manager/Manager";
import { BUNDLE_RESOURCES, ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import HallNewView from "../hall/HallNewView";
import WalletView from "../wallet/WalletView";
import LoginNewView from "../login/LoginNewView";
import UserData from "../data/UserData";
import fbsdk from "../sdk/fbsdk";
import { MST } from "../framework/external/protoc";
import { EventApi } from "../framework/event/EventApi";
import MissionView from "../activity/MissionView";
import Validator from "../login/Validator";
import PanelHelp from "../msgbox/PanelHelp";
import BindPhoneView from "../common/bindItemView/BindPhoneView";
import { UtilMgr } from "../global/UtilMgr";
import BindEmailView from "../common/bindItemView/BindEmailView";
import PromotionView from "../promotion/PromotionView";
import PromotionUnView from "../promotion/PromotionUnView";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class AkunView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.Node)
    btnAkun: cc.Node = null;
    @property(cc.Node)
    btnSignOut: cc.Node = null;
    @property(cc.Node)
    btnHome: cc.Node = null;

    @property(cc.Node)
    EmailNode: cc.Node = null;
    @property(cc.Node)
    TeleponNode: cc.Node = null;
    @property(cc.Node)
    KeamananNode: cc.Node = null;
    @property(cc.Node)
    ChangePasswordNode: cc.Node = null;
    @property(cc.Node)
    PrivasiNode: cc.Node = null;
    @property(cc.Node)
    ReferensiNode: cc.Node = null;
    @property(cc.Node)
    FANode: cc.Node = null;
    @property(cc.Node)
    BahasaNode: cc.Node = null;
    @property(cc.Node)
    TentangNode: cc.Node = null;
    @property(cc.Node)
    editAvatarNode: cc.Node = null;
    @property(cc.Node)
    ContactUsNode: cc.Node = null;

    @property(cc.Node)
    rightAvatar: cc.Node = null;
    @property(cc.Sprite)
    imgAvatar0: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar1: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar2: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar3: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar4: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar5: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar6: cc.Sprite = null;
    @property(cc.Sprite)
    imgAvatar7: cc.Sprite = null;
    avatarIndex: number = 0;

    @property(cc.Node)
    backTop: cc.Node = null;
    @property(cc.Node)
    topNode: cc.Node = null;
    @property(cc.Node)
    layananNode: cc.Node = null;
    @property(cc.Node)
    privasiNode: cc.Node = null;
    @property(cc.Node)
    tentangImgNode: cc.Node = null;

    @property(cc.EditBox)
    codeEditBox: cc.EditBox = null;
    m_codeStr: string = "";

    @property(cc.EditBox)
    newPasswordEditBox: cc.EditBox = null;
    m_newPasswordStr: string = "";

    curNodeName: string = null;
    curNode: cc.Node = null;
    //多语言UI
    @property(cc.Label)
    Profi: cc.Label = null;
    @property(cc.Label)
    Ranking: cc.Label = null;
    @property(cc.Label)
    Games: cc.Label = null;
    @property(cc.Label)
    Integration: cc.Label = null;
    @property(cc.Label)
    Used: cc.Label = null;
    @property(cc.Label)
    Reference: cc.Label = null;
    @property(cc.Label)
    Reference1: cc.Label = null;
    @property(cc.Label)
    Arrange: cc.Label = null;
    @property(cc.Label)
    EmailVer: cc.Label = null;
    @property(cc.Label)
    PhoneVer: cc.Label = null;
    @property(cc.Label)
    Security: cc.Label = null;
    @property(cc.Label)
    ChangePass: cc.Label = null;
    @property(cc.Label)
    Privacy: cc.Label = null;
    @property(cc.Label)
    Language: cc.Label = null;
    @property(cc.Label)
    About: cc.Label = null;
    @property(cc.Label)
    ContactUS: cc.Label = null;
    @property(cc.Label)
    About1: cc.Label = null;

    // 用户数据
    private _userData: UserData = null;

    public static getPrefabUrl() {
        return "akun/prefabs/AkunView";
    }

    onLoad() {
        super.onLoad();
        this.initData();
        this.bindEvents();
    }

    initData() {
        this._userData = G.DataMgr.get(UserData);
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
        super.bindingEvents()
        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent('M2C_AuthOut_Res', this.onM2C_AuthOut_Res);
        this.registerEvent('updateUserInfo', this.refreshTopInfo);
        this.registerEvent('Event_S2C_ResetPassword', this.onEvent_S2C_ResetPassword);
        this.registerEvent('Event_S2C_ModifyAvartar', this.onEvent_S2C_ModifyAvartar);
    }

    onClick(name, node) {
        switch (name) {
            case 'btnHome':
                Manager.uiManager.open({ type: HallNewView, bundle: BUNDLE_RESOURCES });
                this.close()
                break;
            case 'btnDompet':
                Manager.uiManager.open({ type: WalletView, bundle: BUNDLE_RESOURCES });
                this.close()
                break;
            case 'btnEvent':
                Manager.uiManager.open({ type: MissionView, bundle: BUNDLE_RESOURCES });
                this.close()
                break;
            case 'btnLogin':
                Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnBindEmail':
                if (this.checkLogined()) {
                    this.curNodeName = 'VerifikaslEmail';
                    this.curNode = this.EmailNode
                    this.openNodeView()
                    this.refreshEmailView()
                }
                break;
            case 'btnBindPhone':
                if (this.checkLogined()) {
                    this.curNodeName = 'VerifikaslTelepon';
                    this.curNode = this.TeleponNode
                    this.openNodeView()
                    this.refreshPhoneView()
                }
                break;
            case 'btn2FA':
                if (this.checkLogined()) {
                    this.curNodeName = 'PengaturanKeamanan';
                    this.curNode = this.FANode
                    this.openNodeView()
                }
                break;
            case 'HubungiKaml':
                if (this.checkLogined()) {
                    this.curNodeName = 'HubungiKaml';
                    this.curNode = this.ContactUsNode
                    this.openNodeView()
                }
                break;
            case 'btnChangePassword':
                if (this.checkLogined()) {
                    this.curNodeName = 'MengubahKatesandi';
                    this.curNode = this.ChangePasswordNode
                    this.openNodeView()
                }
                break;
            case 'btnPrivacy':
                if (this.checkLogined()) {
                    this.curNodeName = 'PengaturanPrivasl';
                    this.curNode = this.PrivasiNode
                    this.openNodeView()
                }
                break;
            case 'Peringkat': {
                if (this._userData.isLogined()) {
                    Manager.uiManager.open({ type: PromotionView, bundle: BUNDLE_RESOURCES });
                } else {
                    Manager.uiManager.open({ type: PromotionUnView, bundle: BUNDLE_RESOURCES });
                }
            }
                break;
            case 'Bahasa':
                this.curNodeName = 'Bahasa';
                this.curNode = this.BahasaNode
                this.openNodeView()
                break;
            case 'Tentang':
                this.curNodeName = 'Tentang';
                this.curNode = this.TentangNode
                this.openNodeView()
                break;
            case 'WaktuLayanan':
                this.curNodeName = 'Jangka WaktuLayanan';
                this.curNode = this.layananNode
                this.openNodeView()
                break;
            case 'KebPrivasi':
                this.curNodeName = 'Kebijakan privasi';
                this.curNode = this.privasiNode
                this.openNodeView()
                break;
            case 'TentangSaya':
                this.curNodeName = 'tentang saya';
                this.curNode = this.tentangImgNode
                this.openNodeView()
                break;
            case 'editHead':
                this.editAvatarNode.active = true
                this.clickEditAvatar()
                break;
            case 'btnCloseAvatar':
                this.editAvatarNode.active = false
                break;
            case 'btnGetCode':
                this.clickGetCodeHanlder();
                break;
            case 'btnSetNewPass':
                this.clickSetNewPassHandler();
                break;
            case 'btnSignOut':
                this.signOut()
                break;
            case 'btnSetPhoneBind':
                Manager.uiManager.open({ type: BindPhoneView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnSetEmailBind':
                Manager.uiManager.open({ type: BindEmailView, bundle: BUNDLE_RESOURCES });
                break;
            case 'backBtn':
                this.clickBackBtn()
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
        let req = MST.C2S_ModifyAvartar.create({
            serial: Manager.netManager.getNewSeqId(),
            avartar
        });
        let buffer = MST.C2S_ModifyAvartar.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_ModifyAvartar, MST.OuterOpcode_Lobby.C2S_ModifyAvartar, buffer);
    }

    checkLogined() {
        if (!this._userData.id) {
            Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }

    clickEditAvatar() {
        let userData = this._userData;
        let headerUrl = userData.info.HeaderUrl;

        if (headerUrl == '') {
            this.avatarIndex = 0;
        } else {
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
        imgAvatar.loadImage({ url: Config.avatar_path + (avatarIndex + 1), view: this, bundle: BUNDLE_RESOURCES })
    }

    clickBackBtn() {
        let curNodeName = this.curNodeName
        this.curNode.active = false
        if (curNodeName == 'Jangka WaktuLayanan' || curNodeName == 'Kebijakan privasi' || curNodeName == 'tentang saya') {
            this.curNodeName = 'Tentang'
            this.curNode = this.TentangNode
            this.openNodeView();
        } else {
            this.backTop.active = false
        }
    }

    show(args) {
        this.onLanguageChange();
        this.refreshTopInfo()
    }

    onLanguageChange() {
        this.Profi.string = i18n.AKUN_TITLE.PROFILE
        this.Ranking.string = i18n.AKUN_TITLE.RANKING
        this.Games.string = i18n.AKUN_TITLE.GAMES
        this.Integration.string = i18n.AKUN_TITLE.INTEGRATION
        this.Used.string = i18n.AKUN_TITLE.USED
        this.Reference.string = i18n.AKUN_TITLE.REFERENCE
        this.Reference1.string = i18n.AKUN_TITLE.REFERENCE
        this.Arrange.string = i18n.AKUN_TITLE.ARRANGE
        this.EmailVer.string = i18n.AKUN_TITLE.EMAIL_VERIFICATION
        this.PhoneVer.string = i18n.AKUN_TITLE.PHONE_VERIFICATION
        this.Security.string = i18n.AKUN_TITLE.SECURITY_SETTING
        this.ChangePass.string = i18n.AKUN_TITLE.CHANGE_PASSWORD
        this.Privacy.string = i18n.AKUN_TITLE.PRIVACY_SETTING
        this.Language.string = i18n.AKUN_TITLE.LANGUAGE
        this.About.string = i18n.AKUN_TITLE.ABOUT
        this.About1.string = i18n.AKUN_TITLE.ABOUT
        this.ContactUS.string = i18n.AKUN_TITLE.CONTACT_US
    }

    refreshTopInfo() {
        let Logined = this.topNode.getChildByName('Logined')
        let notLogin = this.topNode.getChildByName('NotLogin')
        Logined.active = false;
        notLogin.active = false;

        let userData = this._userData;
        let playerInfo = userData['info'];

        if (playerInfo) {
            let avatar = Logined.getChildByName('avatar')
            let imgAvatar = avatar.getChildByName('imgAvatar').getComponent(cc.Sprite);
            let userName = Logined.getChildByName('userName')
            userName.getComponent(cc.Label).string = playerInfo.Nick
            UtilMgr.loadHeadImg(imgAvatar, this._userData.info.HeaderUrl, this._userData.info.UnitId, this);

            // let avatarIndex;
            // if (userData.info.HeaderUrl == '' || userData.info.HeaderUrl == undefined)
            //     avatarIndex = 0
            // else
            //     avatarIndex = Number(userData.info.HeaderUrl);

            // imgAvatar.loadImage({ url: Config.avatar_path + (avatarIndex + 1), view: this, bundle: BUNDLE_RESOURCES })
        }
        Logined.active = playerInfo ? true : false
        notLogin.active = !Logined.active
        this.btnSignOut.active = Logined.active
    }

    openNodeView() {
        this.backTop.active = true
        let backBtn = this.backTop.getChildByName('backBtn')
        let viewTitle = backBtn.getChildByName('showViewTitle').getComponent(cc.Label)
        viewTitle.string = this.curNodeName
        this.curNode.active = true
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
        let validator = new Validator();

        if (!username) {
            PanelHelp.showTip(i18n.REGISTER.NOBOUDMAIL);
            return;
        }

        validator.add(checkCode, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.CODEINFORMATIONEMPTY
        }]);
        validator.add(password, [{
            strategy: 'minLength:8',
            errorMsg: i18n.REGISTER.PASSWORD8
        }]);

        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            return;
        }

        this.requestResetPass()
    }

    requestResetPass() {
        // C2S_ResetPassword
        let userData = this._userData;
        let username = userData.email;
        let password = this.m_newPasswordStr;
        let checkCode = this.m_codeStr;
        let req = MST.C2S_ResetPassword.create({
            serial: Manager.netManager.getNewSeqId(),
            username,
            password,
            checkCode
        });
        let buffer = MST.C2S_ResetPassword.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_ResetPassword, MST.OuterOpcode_Lobby.C2S_ResetPassword, buffer);
    }

    requestGetCheckCode() {
        let userData = this._userData;
        let username = userData.email;
        let req = MST.C2S_GetCheckCode.create({
            serial: Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_GetCheckCode, MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }

    onEvent_S2C_ResetPassword() {
        PanelHelp.showTip(i18n.REGISTER.CHANGEPASSWORDSUCCESS);
    }

    onEvent_S2C_ModifyAvartar() {
        PanelHelp.showTip(i18n.REGISTER.CHANGEAVATARSUCCESS);
        this.editAvatarNode.active = false;
        this.refreshTopInfo();
    }

    private onCodeBegan(target: cc.EditBox): void {
        this.codeEditBox.string = this.m_codeStr;
    }

    private onCodeEnded(target: cc.EditBox): void {
        if (this.m_codeStr.length <= 0) {
            return;
        }

        this.codeEditBox.string = this.m_codeStr;
    }

    private onCodeChanged(content: cc.EditBox): void {
        this.m_codeStr = content.string;
    }

    private onNewPassWordBegan(target: cc.EditBox): void {
        this.newPasswordEditBox.string = this.m_newPasswordStr;
    }

    private onNewPassWordEnded(target: cc.EditBox): void {
        if (this.m_newPasswordStr.length <= 0) {
            return;
        }

        this.newPasswordEditBox.string = this.m_newPasswordStr;
    }

    private onNewPassWordChanged(content: cc.EditBox): void {
        this.m_newPasswordStr = content.string;
    }

    refreshEmailView() {
        let bindNode = this.EmailNode.getChildByName('frame').getChildByName('bindNode')
        let noBindNode = this.EmailNode.getChildByName('frame').getChildByName('noBindNode')

        let userData = this._userData;
        if (userData.email) {
            bindNode.active = true
            noBindNode.active = false

            let labBindEmail = bindNode.getChildByName('bindEmail').getComponent(cc.Label);
            labBindEmail.string = userData.email;
        }
        else {
            bindNode.active = false
            noBindNode.active = true
        }
    }

    refreshPhoneView() {
        let labPhone = this.TeleponNode.getChildByName('frame').getChildByName('framePhone').getChildByName('labPhone')

        let userData = this._userData;
        if (userData.BindPhone) {
            labPhone.getComponent(cc.Label).string = userData.BindPhone
        }
        else {
            labPhone.getComponent(cc.Label).string = '';
        }
    }

    onM2C_AuthOut_Res(data: MST.M2C_AuthOut_Res) {
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
        let req = MST.C2M_AuthOut_Req.create({
            RpcId: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2M_AuthOut_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_AuthOut_Req, MST.OuterOpcode_Map.C2M_AuthOut_Req, buffer);


    }
}
