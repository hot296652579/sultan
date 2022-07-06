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
export default class BindPhoneView extends UIView implements IController<LobbyService>{
    service: LobbyService;
    public static getPrefabUrl() {
        return "common/prefabs/BindPhoneView";
    }

    @property(cc.Label)
    labRegister: cc.Label = null;
    @property(cc.Label)
    labFirstRecharge: cc.Label = null;
    @property(cc.Node)
    firstRecharIcon: cc.Node = null;

    @property(cc.Node)
    btnCountDown: cc.Node = null;

    @property(cc.EditBox)
    phoneEditBox: cc.EditBox = null;
    m_phoneStr: string = "";

    @property(cc.EditBox)
    emailEditBox: cc.EditBox = null;
    m_emailStr: string = "";

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

        this.phoneEditBox.node.on("editing-did-began", this.onPhoneBegan, this);
        this.phoneEditBox.node.on("editing-did-ended", this.onPhoneEnded, this);
        this.phoneEditBox.node.on("editing-return", this.onPhoneEnded, this);
        this.phoneEditBox.node.on("text-changed", this.onPhoneChanged, this);
    }

    protected bindingEvents(): void {
        super.bindingEvents();
        this.registerEvent("Event_S2C_BindPhone", this.onEvent_S2C_BindPhone);
        this.registerEvent("Event_S2C_GetRegisterRewordConfig", this.onEvent_S2C_GetRegisterRewordConfig);
        //Event_S2C_GetCheckCode
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

    private onPhoneBegan(target: cc.EditBox): void {
        this.phoneEditBox.string = this.m_phoneStr;
    }

    private onPhoneEnded(target: cc.EditBox): void {
        if (this.m_phoneStr.length <= 0) {
            return;
        }

        this.phoneEditBox.string = this.m_phoneStr;
    }

    private onPhoneChanged(content: cc.EditBox): void {
        this.m_phoneStr = content.string;
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

    startCountDown() {
        let common = this.btnCountDown.getComponent(CountDownCode);
        common._doStartTime();
    }

    clickGetCode() {
        let validator = new Validator();
        let username = this.m_phoneStr;

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

    clickBtnBind() {
        let username = this.m_phoneStr;
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

        let errorMsg = validator.start();
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            return;
        }

        this.requestBindPhone();
    }

    requestBindPhone() {
        let phoneNo = this.m_phoneStr;
        let checkCode = this.m_codeStr;
        let req = MST.C2S_BindPhone.create({
            serial: Manager.netManager.getNewSeqId(),
            phoneNo,
            checkCode
        });
        let buffer = MST.C2S_BindPhone.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_BindPhone, MST.OuterOpcode_Lobby.C2S_BindPhone, buffer);
    }

    onEvent_S2C_BindPhone() {
        PanelHelp.showTip(i18n.REGISTER.BINDSUCCESS);
        this.close();
    }

    onEvent_S2C_GetRegisterRewordConfig(data: MST.S2C_GetRegisterRewordConfig) {
        if (!data.firstDepositReward || !data.chips) return;
        this.labFirstRecharge.string = `+${data.chips}%`;
        this.labRegister.string = `+Rp ${data.firstDepositReward}`;

        let getFirstDeposit = data.isGetFirstDepositReward;
        let depositDone = this.firstRecharIcon.getChildByName('done');
        depositDone.active = getFirstDeposit;
    }

    onEvent_S2C_GetCheckCode() {
        PanelHelp.showTip(i18n.TIPS.SENDCHECK);
    }

    // update (dt) {}
}
