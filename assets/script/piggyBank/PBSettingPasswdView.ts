import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import PBPasswdComponent from "./PBPasswdComponent";
import PiggyBankView from "./PiggyBankView";

const { ccclass, property } = cc._decorator;

const MAX_DIGIT: number = 6;

@ccclass
@injectService(LobbyService.instance)
export default class PBSettingPasswdView extends UIView {
    service: LobbyService;

    @property(cc.EditBox)
    private edbPasswd1: cc.EditBox = null;

    @property(cc.EditBox)
    private edbPasswd2: cc.EditBox = null;

    private edbComponent1: PBPasswdComponent = null;
    private edbComponent2: PBPasswdComponent = null;

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PBSettingPasswdView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
        this.initView();
    }

    start() {

    }

    initView(): void {
        this.edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent);
        this.edbComponent2 = this.edbPasswd2.getComponent(PBPasswdComponent);
    }

    bindingEvents() {
        super.bindingEvents();

        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SETTING_PASSWD), this.onSettingPasswd);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TOTAL_AMOUNT), this.onTotalAmount);
    }

    show(): void {
        super.show();
        this.showWithAction(true);
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }

    onClickOK(): void {
        this.playDefaultEffect();

        if (!this.isPasswordSame()) {
            PanelHelp.showTip(i18n.PIGGY_BANK.INCONSISTENT_PASSWORD);
            return;
        }
        if (!this.isPasswordDigit()) {
            PanelHelp.showTip(i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }

        let req = protoPackage.hall.SettingPasswdReq.create({ passwd: this.edbComponent1.string });
        let buffer = protoPackage.hall.SettingPasswdReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_SETTING_PASSWD,
            buffer);
    }

    onSettingPasswd(data): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        User.piggyBank = true;
        this.close();

        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TOTAL_AMOUNT,
            null);
    }

    onTotalAmount(data): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        Manager.uiManager.open({ type: PiggyBankView, bundle: BUNDLE_RESOURCES, args: data });
    }

    /**
     * 是否密码一致
     * @return {boolean}
     */
    private isPasswordSame(): boolean {
        return this.edbComponent1.string === this.edbComponent2.string;
    }

    /**
     * 是否6满足位数
     */
    private isPasswordDigit(): boolean {
        let str1: string = this.edbComponent1.string;
        if (str1.length !== MAX_DIGIT) {
            return false;
        }

        let str2: string = this.edbComponent2.string;
        if (str2.length !== MAX_DIGIT) {
            return false;
        }

        return true;
    }
}
