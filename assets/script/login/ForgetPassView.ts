import { GameConfig } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { gameManager } from "../common/manager/GameManager";
import { Manager } from "../common/manager/Manager";
import { CommonMessage, protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { HttpErrorType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import { ShareTraceHelpder } from "../Helpder/shareTrace/ShareTraceHelpder";
import LanguageChange from "../common/language/LanguageChange";
import ServiceView from "../service/ServiceView";
import RichTextHandler from "./RichTextHandler";
import Validator from "./Validator";
import { MST } from "../framework/external/protoc";
import CountDownCode from "../common/component/CountDownCode";

const { ccclass, property } = cc._decorator;



@ccclass
@injectService(LobbyService.instance)
export default class ForgetPassView extends UIView implements IController<LobbyService> {

    @property(cc.Node)
    btnClose: cc.Node = null;

    @property(cc.Node)
    btnCountDown: cc.Node = null;

    @property(cc.Node)
    hidePassNode: cc.Node = null;

    @property(cc.EditBox)
    emailEditBox: cc.EditBox = null;
    m_emailStr: string = "";

    @property(cc.EditBox)
    codeEditBox: cc.EditBox = null;
    m_codeStr: string = "";

    @property(cc.EditBox)
    passwordEditBox: cc.EditBox = null;
    m_passwordStr: string = "";

    public static getPrefabUrl() {
        return "login/prefabs/ForgetPassView";
    }
    service: LobbyService = null;
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
        let common = this.btnCountDown.getComponent(CountDownCode);
        common._doStartTime();
    }

    private onEmailBegan(target: cc.EditBox): void {
        this.emailEditBox.string = this.m_emailStr;
    }

    private onEmailEnded(target: cc.EditBox): void {
        if (this.m_emailStr.length <= 0) {
            return;
        }

        this.emailEditBox.string = this.m_emailStr;
    }

    private onEmailChanged(content: cc.EditBox): void {
        this.m_emailStr = content.string;
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

    private onPassWordBegan(target: cc.EditBox): void {
        this.passwordEditBox.string = this.m_passwordStr;
    }

    private onPassWordEnded(target: cc.EditBox): void {
        if (this.m_passwordStr.length <= 0) {
            return;
        }

        this.passwordEditBox.string = this.m_passwordStr;
    }

    private onPassWordChanged(content: cc.EditBox): void {
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
                this.clickHidePass()
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
        let validator = new Validator();
        let email = this.m_emailStr;
        validator.add(email, [{
            strategy: 'isEmail',
            errorMsg: i18n.REGISTER.EMAILWRONG
        }]);
        validator.add(email, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.EMAILINFORMATIONEMPTY
        }]);

        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            return;
        }
        this.startCountDown();
        this.requestGetCheckCode();
    }

    requestGetCheckCode() {
        let username = this.m_emailStr;
        let req = MST.C2S_GetCheckCode.create({
            serial: Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_GetCheckCode, MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }

    onEvent_S2C_GetCheckCode() {
        PanelHelp.showTip(i18n.REGISTER.PLEASECHECK);
    }

    validataFunc() {
        let validator = new Validator()

        let Code = this.m_codeStr;
        validator.add(Code, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.CODEINFORMATIONEMPTY
        }]);

        let email = this.m_emailStr;
        validator.add(email, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.EMAILINFORMATIONEMPTY
        }]);

        let password = this.m_passwordStr;
        validator.add(password, [{
            strategy: 'minLength:8',
            errorMsg: i18n.REGISTER.PASSWORD8
        }]);

        let errorMsg = validator.start()
        return errorMsg
    }

    clickSetPass() {
        let errorMsg = this.validataFunc()
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            return;
        }

        this.requestResetPassword();
    }

    requestResetPassword() {
        let username = this.m_emailStr;
        let password = this.m_passwordStr;
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

    onEvent_S2C_ResetPassword() {
        PanelHelp.showTip(i18n.REGISTER.CHANGEPASSWORDSUCCESS);
        this.close();
    }
}
