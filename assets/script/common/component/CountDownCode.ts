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
export default class CountDownCode extends UIView implements IController<LobbyService>{

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Button)
    btnGetCode: cc.Button = null;

    verifiCD: number;
    updateVerifiCD: NodeJS.Timeout;

    service: LobbyService = null;
    onLoad() {
        // this._doStartTime();
    }
    verificationCodeType = VerificationCodeType.none;

    bindingEvents() {
        super.bindingEvents();
    }

    _doStartTime() {
        this.node.active = true;
        this.btnGetCode.enabled = false;
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
        this.node.active = false;
        this.btnGetCode.enabled = true;
    }
}
