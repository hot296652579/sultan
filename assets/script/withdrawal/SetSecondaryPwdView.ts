
import UIView from "../framework/ui/UIView";
import SendVerificationCodePlus from "../common/component/SendVerificationCodePlus";
import { i18n } from "../common/language/LanguageImpl";
import PanelHelp from "../msgbox/PanelHelp";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { IController } from "../framework/controller/Controller";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import { VerificationCodeType } from "../common/component/SendVerificationCode";

const { ccclass, property } = cc._decorator;

export enum SettSecondaryPwdType {
    set,
    reset,
}

@ccclass
@injectService(LobbyService.instance)
export default class SetSecondaryPwdView extends UIView implements IController<LobbyService>{
    service: LobbyService = null;

    @property(cc.EditBox)
    verCodeEditbox: cc.EditBox = null;

    @property(cc.EditBox)
    pwdEditbox: cc.EditBox = null;

    @property(cc.EditBox)
    pwdEditboxConfirm: cc.EditBox = null;

    @property(cc.Node)
    titlesNode: cc.Node = null;

    @property(cc.Label)
    lbl_restPhoneTips: cc.Label = null;


    @property(SendVerificationCodePlus)
    sendVerificationCode: SendVerificationCodePlus = null;
    passwordType = SettSecondaryPwdType.set;

    public static getPrefabUrl() {
        return "withdrawal/prefabs/SetSecondaryPwdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content')
        this.initLanguage()
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD), this.toSetPwdRes);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD), this.tochangePwdRes);
    }
    show(args) {
        let type = args[0];
        this.showWithAction(true)
        this.initView(type)
        this.lbl_restPhoneTips.string = i18n.ACCOUNT_LOGIN.SEND_CODE_TO_PHONE + " " + UtilMgr.setStringCover(User._phone);
        this.sendVerificationCode.setVerificationCodeType(VerificationCodeType.resetPwd)
    }
    initLanguage() {
        this.pwdEditbox.placeholder = i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD;
        this.verCodeEditbox.placeholder = i18n.ACCOUNT_LOGIN.PALCE_HOLDER.VER_CODE;
        this.pwdEditboxConfirm.placeholder = i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD_CONFIRM;
    }
    initView(type) {
        this.passwordType = type;
        var titleName = 'resetPwd';
        switch (type) {
            case SettSecondaryPwdType.set:
                titleName = 'setPwd';
                break;
            case SettSecondaryPwdType.reset:
                break;
        }
        this.titlesNode.children.forEach(nd => {
            nd.active = nd.name == titleName;
        })
    }
 
    onClick(name) {
        switch (name) {
            case "getCode":
                this.sendAccVerification();
                break;
            case "close":
                this.closeWithAction();
                break;
            case "conirm":
                if (this.passwordType == SettSecondaryPwdType.set) {
                    this.toSetPwd();
                } else {
                    this.toFoegetOrResetPwd();
                }
                break;
        }

    }
    toSetPwd() {
        let code = this.verCodeEditbox.string;
        if (!code) return PanelHelp.showTip(i18n.EDITBOX.VERIFINULL);
        let passwd = this.checkPwd();
        if (!passwd) return;
        let req = protoPackage.hall.SetSecondPasswdReq.create({passwd: base64Encrypt(passwd),code: parseInt(code) });
        let buffer = protoPackage.hall.SetSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD,
            buffer);
    }
    toFoegetOrResetPwd() {

        let code = this.verCodeEditbox.string;
        if (!code) return PanelHelp.showTip(i18n.EDITBOX.VERIFINULL);
        let passwd = this.checkPwd();
        if (!passwd) return;
        let req = protoPackage.hall.ChangeSecondPasswdReq.create({passwd: base64Encrypt(passwd),code: parseInt(code) });
        let buffer = protoPackage.hall.ChangeSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD,
            buffer);
    }
    toSetPwdRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp.showTip(i18n.ACCOUNT_LOGIN.SUCCEEDED);
            this.close()
            User.piggyBank = true
            // dispatch('openWithdrawalView')
        } else {
            G.Logger.warn("toSetPwdRes:", data)
            PanelHelp.showMsgBox('', i18n.ERRORCODE[data.statusMsg.status] );
        }
    }
    tochangePwdRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp.showTip(i18n.ACCOUNT_LOGIN.SUCCEEDED);
            this.close()
        } else {
            G.Logger.warn("tochangePwdRes:", data)
            PanelHelp.showMsgBox('', i18n.ERRORCODE[data.statusMsg.status] );
        }

    }
    // 验证码检查
    checkVerification(verif) {
        if (!verif) {
            PanelHelp.showTip(i18n.EDITBOX.VERIFINULL);
            return null;
        }
        return verif;
    }
    checkPwd() {
        let passwd = this.pwdEditbox.string;
        let passwdConfi = this.pwdEditboxConfirm.string;
        if (passwd == '' || passwdConfi == '') {
            PanelHelp.showTip(i18n.ACCOUNT_LOGIN.ERROR.EMPTY_PWD)
            return ""
        }
        if (passwd != passwdConfi) {
            PanelHelp.showTip(i18n.ACCOUNT_LOGIN.ERROR.TWO_PWD_DISACCORD)
            return ""
        }
        return passwd

    }
    checkPhone(phone) {
        if (!phone) {
            PanelHelp.showTip(i18n.EDITBOX.PHONENULL);
            return null;
        }
        if (phone.length < 7) {
            PanelHelp.showTip(i18n.EDITBOX.PHONETYPEERR);
            return null;
        }
        return phone;
    }
    sendAccVerification() {
        // this.sendVerificationCode.doSendVerificationCode({ phone: User._phone, areaCode: User._areaCode ,type:1});
        this.sendVerificationCode.doSendVerificationCode({ phone: User._phone, areaCode: User._areaCode });
    }
   
}
