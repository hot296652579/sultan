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
import { UIManager } from "../framework/base/UIManager";
import AkunView from "../akun/AkunView";
import HallNewView from "../hall/HallNewView";
import LoginNewView from "../login/LoginNewView";
import CreateAccountView from "./CreateAccountView";
import { MST } from "../framework/external/protoc";
import UserData from "../data/UserData";
import NumberUtils from "../common/utils/NumberUtils";
import RechargeData from "../data/RechargeData";
import BindPhoneView from "../common/bindItemView/BindPhoneView";


const { ccclass, property } = cc._decorator;
@ccclass
@injectService(LobbyService.instance)
export default class AttractNewView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Node)
    noWithdrawal: cc.Node = null;
    @property(cc.Node)
    bandInfoNode: cc.Node = null;
    @property(cc.Label)
    labGold: cc.Label = null;
    @property(cc.Label)
    labTelephone: cc.Label = null;
    @property(cc.Label)
    labEmail: cc.Label = null;

    @property(cc.Node)
    DocNode: cc.Node = null;

    @property(cc.Node)
    btnWithdrawal: cc.Node = null;

    @property(cc.EditBox)
    rpEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    codeEditBox: cc.EditBox = null;
    m_codeStr: string = "";

    m_attractStr: string = '';
    canAttract: boolean = false;

    _2d_sprite_mat: string = '2d-sprite';
    _2d_gray_mat: string = '2d-gray-sprite';

    // 用户数据
    private _userData: UserData = null;
    private _rechargeData: RechargeData = null;

    public static getPrefabUrl() {
        return "wallet/prefabes/AttractNewView";
    }

    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        this.bindEvents();
    }

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
        this._rechargeData = G.DataMgr.get(RechargeData);
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
        let material: cc.Material = cc.Material.getBuiltinMaterial(this._2d_gray_mat);
        let sp = this.btnWithdrawal.getComponent(cc.Sprite);
        sp.setMaterial(0, material);

        let rechargeData = this._rechargeData;
        if (!rechargeData.minWithAmount || !rechargeData.maxWithAmount) return;

        let minWithAmount = rechargeData.minWithAmount;
        let maxWithAmount = rechargeData.maxWithAmount;
        this.rpEditBox.placeholder = `jarak:Rp${minWithAmount}-${maxWithAmount}`;
    }

    requestGetBankList() {
        let req = MST.C2L_GetBankList_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            index: 0,
            limit: 6
        });
        let buffer = MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetBankList_Req, MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }

    requestBankInfo() {
        let req = MST.C2L_GetBankCardInfo_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
        });
        let buffer = MST.C2L_GetBankCardInfo_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetBankCardInfo_Req, MST.OuterOpcode_Lobby.C2L_GetBankCardInfo_Req, buffer);
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
                Manager.uiManager.open({ type: CreateAccountView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnChange':
                Manager.uiManager.open({ type: CreateAccountView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnUpdateTel':
                Manager.uiManager.open({ type: BindPhoneView, bundle: BUNDLE_RESOURCES });
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
        } else {
            // NOTBINDEMAIL
            PanelHelp.showTip(i18n.TIPS.NOTBINDEMAIL);
        }
    }

    onEvent_S2C_GetCheckCode() {
        PanelHelp.showTip(i18n.REGISTER.PLEASECHECK);
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

    withdrawHanlder() {
        if (this.canAttract) {
            let rechargeData = this._rechargeData;
            let bandBankCardInfo = rechargeData.bandBankCardInfo;

            if (!bandBankCardInfo) return;

            let attractNum = Number(this.m_attractStr);
            let bankNo = bandBankCardInfo.bankNo;
            let bankCode = bandBankCardInfo.bankCode;
            let name = bandBankCardInfo.bankUserName;
            let chips = attractNum * 100;

            let req = MST.C2L_Withdraw_Req.create({
                RpcId: Manager.netManager.getNewSeqId(),
                chips,
                bankNo,
                bankCode,
                name
            });
            let buffer = MST.C2L_Withdraw_Req.encode(req).finish();
            LobbyService.instance.sendMsg(MST.C2L_Withdraw_Req, MST.OuterOpcode_Lobby.C2L_Withdraw_Req, buffer);
        }
    }

    onL2C_Withdraw_Res() {
        PanelHelp.showTip(i18n.TIPS.RECHARGESUCCESS);
    }

    refreshUser() {
        if (this._userData.isLogined()) {
            this.labGold.string = NumberUtils.converToC(Number(this._userData.info.Gold));
        }
    }

    onL2C_GetBankCardInfo_Res() {
        let rechargeData = G.DataMgr.get(RechargeData);
        let bandBankCardInfo = rechargeData.bandBankCardInfo;
        this.bandInfoNode.active = false;
        this.noWithdrawal.active = false;
        if (bandBankCardInfo) {
            this.bandInfoNode.active = true;
            this.refreshBandInfo();
        } else {
            this.noWithdrawal.active = true;
        }
    }

    refreshBandInfo() {
        let rechargeData = G.DataMgr.get(RechargeData);
        let bandBankCardInfo = rechargeData.bandBankCardInfo;
        let bandInfoNode = this.bandInfoNode;
        let bankNo = bandInfoNode.getChildByName('bankNo');
        let bankCode = bandInfoNode.getChildByName('bankCode');
        bankNo.getComponent(cc.Label).string = bandBankCardInfo.bankNo;
        bankCode.getComponent(cc.Label).string = bandBankCardInfo.bankCode;
    }

    private onDidBegan(target: cc.EditBox): void {
        this.rpEditBox.string = this.m_attractStr;
    }

    private onDidEnded(target: cc.EditBox): void {
        if (this.m_attractStr.length <= 0) {
            return;
        }

        this.rpEditBox.string = this.m_attractStr;
        this.checkIsAttract();
    }

    checkIsAttract() {
        let rechargeData = G.DataMgr.get(RechargeData);
        if (!rechargeData.minWithAmount || !rechargeData.maxWithAmount) return;

        let minWithAmount = rechargeData.minWithAmount;
        let maxWithAmount = rechargeData.maxWithAmount;
        let attractNum = Number(this.m_attractStr);
        if (attractNum) {
            if (attractNum >= minWithAmount && attractNum <= maxWithAmount) {
                this.btnWithdrawal.getComponent(cc.Button).enabled = true;
                let material: cc.Material = cc.Material.getBuiltinMaterial(this._2d_sprite_mat);
                let sp = this.btnWithdrawal.getComponent(cc.Sprite);
                sp.setMaterial(0, material);

                this.canAttract = true;
            }
        }
    }

    private onTextChanged(content: cc.EditBox): void {
        this.m_attractStr = content.string;
    }

    onDestroy() {
        super.onDestroy();
    }

}
