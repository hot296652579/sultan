import { IController } from "../../framework/controller/Controller";
import { injectService, makeKey } from "../../framework/decorator/Decorators";
import { RequestPackge } from "../../framework/net/HttpClient";
import UIView from "../../framework/ui/UIView";
import PanelHelp from "../../msgbox/PanelHelp";
import { Config } from "../config/Config";
import { i18n } from "../language/LanguageImpl";
import { Manager } from "../manager/Manager";
import { protoPackage, serverType } from "../net/CommonService";
import { LobbyService } from "../net/LobbyService";
import { Type } from "protobufjs";

export const  enum VerificationCodeType {
    none,
    resetPwd,
}
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class SendVerificationCode extends UIView implements IController<LobbyService>{

    @property(cc.Label)
    label: cc.Label = null;
    isSendOk: any;
    verifiCD: number;
    updateVerifiCD: NodeJS.Timeout;

    service: LobbyService = null;
    // onLoad () {}
    verificationCodeType = VerificationCodeType.none;

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.SEND_PHONE_CODE), this.onPhoneCodeCall);
    }

    onPhoneCodeCall(netData) {
        if (netData.statusMsg.status == 0) {
            PanelHelp.showTip(i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
            this._doStartTime();
        } else {
            PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + netData.statusMsg.status));
        }
    }
    doSendVerificationCode(msg) {
        if (!!this.isSendOk) {
            PanelHelp.showTip(i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
            return;
        }
        this.isSendOk = true;
        this.label.language = i18n.BIND.SEND;
        if (msg.type) { // webscoket
            let req = protoPackage.hall.SendPhoneCode.create({ phone: msg.phone, area: msg.area });
            let buffer = protoPackage.hall.SendPhoneCode.encode(req).finish();
            this.service.sendMsg(serverType.Lobby,
                protoPackage.hall.HallCmd.SEND_PHONE_CODE,
                buffer);

        } else {//http
            let url = '';
            url += G.URLMgr.loginURL + 'sms?phone=' + encodeURIComponent(msg.phone) + '&area=' + encodeURIComponent(msg.areaCode) + "&type=" + this.verificationCodeType;
            // url += 'http://192.168.6.200:8088/' + 'sms?phone=' + msg.phone;


            let packge = new RequestPackge;
            packge.data.url = url;
            packge.send((netData) => {
                if (netData.state == 0) {
                    PanelHelp.showTip(i18n.ERRORTIPS.REQSENDCHECKMESSAGE);
                    this._doStartTime();
                } else {
                    PanelHelp.showMsgBox('', i18n.ERRORCODE[netData.state] || Manager.makeLanguage("ERRORCODE.SERVERERROR"));
                    this.sendFail()
                }

            }, (err) => {
                G.Logger.log('验证码 = ', err);
                this.sendFail()


            });
        }

    }

    _doStartTime() {
        this.verifiCD = 60;
        if (this.node.getComponent(cc.Button)) {
            this.node.getComponent(cc.Button).interactable = false;
        }
        this.label.string = this.verifiCD + 's';
        this.verifiCD -= 1;
        this.updateVerifiCD = setInterval(() => {
            if (this.verifiCD < 0) {
                clearInterval(this.updateVerifiCD);
                this.verifiCD = 60;
                this.label.language = i18n.BIND.SEND;
                this.isSendOk = null;
                this.countDownEnd();
                if (this.node.getComponent(cc.Button)) {
                    this.node.getComponent(cc.Button).interactable = true;
                }
            } else {
                if (this.label == null) {
                    clearInterval(this.updateVerifiCD);
                    if (cc.isValid(this.node)) {
                        this.onDestroy();
                    }

                } else {
                    this.label.string = this.verifiCD + 's';
                    this.verifiCD--;
                }

            }
        }, 1000)
    }
    countDownEnd() {

    }
    sendFail() {
        this.isSendOk = null;
    }
    setVerificationCodeType(type: VerificationCodeType) {
        this.verificationCodeType = type;
    }
}
