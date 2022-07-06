import UserData from "../../data/UserData";
import { BUNDLE_RESOURCES } from "../../framework/base/Defines";
import { IController } from "../../framework/controller/Controller";
import { MST } from "../../framework/external/protoc";
import UIView from "../../framework/ui/UIView";
import { UtilMgr } from "../../global/UtilMgr";
import LoginNewView from "../../login/LoginNewView";
import Validator from "../../login/Validator";
import PanelHelp from "../../msgbox/PanelHelp";
import CountDownCode from "../component/CountDownCode";
import { i18n } from "../language/LanguageImpl";
import { Manager } from "../manager/Manager";
import { LobbyService } from "../net/LobbyService";
import NumberUtils from "../utils/NumberUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BindEmailView extends UIView implements IController<LobbyService>{
    service: LobbyService;
    public static getPrefabUrl() {
        return "common/prefabs/BindEmailView";
    }

    @property(cc.EditBox)
    emailEditBox: cc.EditBox = null;
    m_emailStr: string = "";

    @property(cc.Node)
    btnCountDown: cc.Node = null;

    @property(cc.EditBox)
    codeEditBox: cc.EditBox = null;
    m_codeStr: string = "";
    // 用户数据
    private _userData: UserData = null;

    onLoad() {
        super.onLoad();
        this.bindEvents();
        this.initData();

        this.btnCountDown.active = false;
    }

    start() {

    }

    public show(args?: any[]): void {
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

    protected bindingEvents(): void {
        super.bindingEvents();
        this.registerEvent("Event_S2C_BindEmail", this.onEvent_S2C_BindEmail);
        this.registerEvent("Event_S2C_GetCheckCode", this.onEvent_S2C_GetCheckCode);
    }

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
    }

    requestGetRewardConfig() {
        let req = MST.C2S_GetRegisterRewardConfig.create({
            serial: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2S_GetRegisterRewardConfig.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_GetRegisterRewardConfig, MST.OuterOpcode_Lobby.C2S_GetRegisterRewardConfig, buffer);
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

    onClick(name: string): void {
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
        let validator = new Validator();

        validator.add(username, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.EMAILINFORMATIONEMPTY
        }]);

        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            return;
        }
        this.startCountDown();
        let req = MST.C2S_GetCheckCode.create({
            serial: Manager.netManager.getNewSeqId(),
            username
        });
        let buffer = MST.C2S_GetCheckCode.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_GetCheckCode, MST.OuterOpcode_Lobby.C2S_GetCheckCode, buffer);
    }

    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode);
        common._doStartTime();
    }


    clickBtnBind() {
        let username = this.m_emailStr;
        let validator = new Validator();

        let Code = this.m_codeStr;
        validator.add(Code, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.CODEINFORMATIONEMPTY
        }]);

        validator.add(username, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.REGISTER.EMAILINFORMATIONEMPTY
        }]);
        validator.add(username, [{
            strategy: 'isEmail',
            errorMsg: i18n.REGISTER.EMAILWRONG
        }]);

        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            return;
        }

        this.requestBindEmail();
    }

    requestBindEmail() {
        let email = this.m_emailStr;
        let checkCode = this.m_codeStr;
        let req = MST.C2S_BindEmail.create({
            serial: Manager.netManager.getNewSeqId(),
            email,
            checkCode
        });
        let buffer = MST.C2S_BindEmail.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_BindEmail, MST.OuterOpcode_Lobby.C2S_BindEmail, buffer);
    }

    onEvent_S2C_BindEmail() {
        PanelHelp.showTip(i18n.REGISTER.BINDSUCCESS);
        this.close();
    }

    onEvent_S2C_GetCheckCode() {
        PanelHelp.showTip(i18n.TIPS.SENDCHECK);
    }

    // update (dt) {}
}
