import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { injectService } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import PBChangePasswdView from "./PBChangePasswdView";
import PBDepositReceiptView from "./PBDepositReceiptView";
import PBHelpView from "./PBHelpView";
import PBTransferInView from "./PBTransferInView";
import PiggyBankData from "./PiggyBankData";
import { i18n } from "../common/language/LanguageImpl";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class PiggyBankView extends UIView {

    @property(cc.Label)
    private labDepositAmountValue: cc.Label = null;

    @property(cc.Label)
    private labTotalRevenueValue: cc.Label = null;

    @property(cc.Label)
    private labRateValue: cc.Label = null;

    @property(cc.Label)
    private labConfirmedAmountValue: cc.Label = null;

    @property(cc.Label)
    private labAyerIncomeValue: cc.Label = null;

    @property(cc.Node)
    imgGridding: cc.Node = null;

    private m_data: any = null;

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PiggyBankView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }

    start() {
        if (this.imgGridding) {
            let labTotalRevenue = cc.find('labTotalRevenue', this.imgGridding)
            labTotalRevenue.getComponent(cc.Label).language = i18n.PIGGY_BANK.TOTAL_INCOME;

            let labRate = cc.find('labRate', this.imgGridding)
            labRate.getComponent(cc.Label).language = i18n.PIGGY_BANK.RATE;

            let labConfirmedAmount = cc.find('labConfirmedAmount', this.imgGridding)
            labConfirmedAmount.getComponent(cc.Label).language = i18n.PIGGY_BANK.COMFIRMED_AMOUNT;

            let labAyerIncome = cc.find('labAyerIncome', this.imgGridding)
            labAyerIncome.getComponent(cc.Label).language = i18n.PIGGY_BANK.YESTERDAY_INCOME;
        }
    }

    bindingEvents() {
        super.bindingEvents();

        this.registerEvent("CMD_UPDATE_PIGGY_BANK_DATA", this.onUpdatePiggyBank);
    }

    show(data): void {
        super.show(data);
        this.showWithAction(true);
        PiggyBankData.getInstance().data = data;

        this.m_data = data;
        this.updateView();
    }

    onUpdatePiggyBank(): void {
        this.m_data = PiggyBankData.getInstance().data;
        this.updateView();
    }

    updateView(): void {
        this.labDepositAmountValue.string = UtilMgr.changeMoney(this.m_data.amount);
        this.labTotalRevenueValue.string = UtilMgr.changeMoney(this.m_data.income);
        this.labRateValue.string = `${this.m_data.rate / 100}%`;
        this.labConfirmedAmountValue.string = UtilMgr.changeMoney(this.m_data.confirmAmount);
        this.labAyerIncomeValue.string = UtilMgr.changeMoney(this.m_data.ayerIncome);
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }

    onClickHelp(): void {
        this.playDefaultEffect();
        Manager.uiManager.open({ type: PBHelpView, bundle: BUNDLE_RESOURCES });
    }

    onClickTransferIn(): void {
        this.playDefaultEffect();
        if (!User.isRechargedPlayer) return PanelHelp.showTip(i18n.EXPERIENCE_FIELD.hintRecharge)
        Manager.uiManager.open({ type: PBTransferInView, bundle: BUNDLE_RESOURCES });
    }

    onClickChangePasswd(): void {
        this.playDefaultEffect();
        Manager.uiManager.open({ type: PBChangePasswdView, bundle: BUNDLE_RESOURCES });
    }

    onClickDepositReceipt(): void {
        this.playDefaultEffect();
        Manager.uiManager.open({ type: PBDepositReceiptView, bundle: BUNDLE_RESOURCES });
    }

    // update (dt) {}
}
