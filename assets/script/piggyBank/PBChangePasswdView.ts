import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";
import PBPasswdComponent from "./PBPasswdComponent";

const { ccclass, property } = cc._decorator;

const MAX_DIGIT: number = 6;

@ccclass
@injectService(LobbyService.instance)
export default class PBChangePasswdView extends UIView {
    service: LobbyService;

    @property(cc.EditBox)
    private edbPasswd1: cc.EditBox = null;

    @property(cc.EditBox)
    private edbPasswd2: cc.EditBox = null;

    @property(cc.EditBox)
    private edbPasswd3: cc.EditBox = null;

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PBChangePasswdView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }

    start() {

    }

    bindingEvents() {
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD), this.onChangePasswd);
    }

    show(): void {
        this.showWithAction(true);
        super.show();
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }

    onClickOK(): void {
        this.playDefaultEffect();

        let edbComponent1: PBPasswdComponent = this.edbPasswd1.getComponent(PBPasswdComponent);
        let edbComponent2: PBPasswdComponent = this.edbPasswd2.getComponent(PBPasswdComponent);
        let edbComponent3: PBPasswdComponent = this.edbPasswd3.getComponent(PBPasswdComponent);

        if (this.isPasswordNull(edbComponent1.string) ||
            this.isPasswordNull(edbComponent2.string) ||
            this.isPasswordNull(edbComponent3.string)) {
            PanelHelp.showTip(i18n.PIGGY_BANK.PLEASE_ENTER_PASSWORD);
            return;
        }

        if (!this.isPasswordDigit(edbComponent1.string) ||
            !this.isPasswordDigit(edbComponent2.string) ||
            !this.isPasswordDigit(edbComponent3.string)) {
            PanelHelp.showTip(i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }

        if (this.isPasswordSame(edbComponent1.string, edbComponent2.string, edbComponent3.string)) {
            PanelHelp.showTip(i18n.PIGGY_BANK.OLD_NEW_PASSWD_SAME);
            return;
        }

        if (!this.isPasswordSame(edbComponent2.string, edbComponent3.string)) {
            PanelHelp.showTip(i18n.PIGGY_BANK.NEW_PASSWD_DIFF);
            return;
        }

        let req = protoPackage.hall.ChangePasswdReq.create({ oldPasswd: edbComponent1.string, newPasswd: edbComponent2.string });
        let buffer = protoPackage.hall.ChangePasswdReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD,
            buffer);
    }

    private onChangePasswd(data): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        PanelHelp.showTip(i18n.PIGGY_BANK.CHANGE_SUCCESS);
        this.closeWithAction();
    }

    /**
     * 是否密码一致
     * @return {boolean}
     */
    private isPasswordSame(...args: string[]): boolean {
        let isSame: boolean = true;
        let str: string = args[0];
        for (let i: number = 1; i < args.length; ++i) {
            if (args[i] !== str) {
                isSame = false;
                break;
            }
        }
        return isSame;
    }

    /**
     * 是否6满足位数
     */
    private isPasswordDigit(str: string): boolean {
        if (str.length !== MAX_DIGIT) {
            return false;
        }

        return true;
    }

    /**
     * 密码是否为空
     */
    private isPasswordNull(str: string = ""): boolean {
        if (str.length <= 0) {
            return true;
        }
        return false;
    }
}
