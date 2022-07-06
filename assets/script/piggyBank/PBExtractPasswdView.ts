import { i18n } from "../common/language/LanguageImpl";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";
import PBPasswdComponent from "./PBPasswdComponent";

const { ccclass, property } = cc._decorator;

const MAX_DIGIT: number = 6;

@ccclass
@injectService(LobbyService.instance)
export default class PBExtractPasswdView extends UIView {
    service: LobbyService;

    @property(cc.EditBox)
    private edbPasswd1: cc.EditBox = null;

    private edbComponent1: PBPasswdComponent = null;

    private m_data = null;

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PBExtractPasswdView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }

    start() {

    }

    bindingEvents() {
        this.registerEvent("EVENT_EXTRACT_SUCCEED", this.onExtractSucceed);
    }

    show(data): void {
        super.show(data);
        this.init();
        this.showWithAction(true);

        this.m_data = data[0];
    }

    initView(): void {
        this.edbPasswd1.string = "";
        this.edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent);
    }

    initData(): void {
        this.m_data = null;
    }

    init(): void {
        this.initData();
        this.initView();
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }

    onClickConfirm(): void {
        this.playDefaultEffect();

        if (!this.isPasswordDigit()) {
            PanelHelp.showTip(i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }

        let req = protoPackage.hall.ExtractAmountReq.create({ id: this.m_data.id, passwd: this.edbComponent1.string });
        let buffer = protoPackage.hall.ExtractAmountReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT,
            buffer);
    }

    onExtractSucceed(): void {
        this.init();
        this.onClickClose();
    }

    /**
     * 是否6满足位数
     */
    private isPasswordDigit(): boolean {
        let str1: string = this.edbComponent1.string;
        if (str1.length !== MAX_DIGIT) {
            return false;
        }

        return true;
    }
}
