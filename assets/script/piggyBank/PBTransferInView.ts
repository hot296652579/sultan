import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import PiggyBankData from "./PiggyBankData";
import { com } from "../framework/external/protoc";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import { i18n } from "../common/language/LanguageImpl";
import { protoPackage, serverType } from "../common/net/CommonService";
import { Manager } from "../common/manager/Manager";
import Operation from "../framework/extentions/Operation";

const { ccclass, property } = cc._decorator;

// 最小利率
const MIN_RATE: number = 0.0002;
// 最小收益
const MIN_PROFIT: number = 0.01;

@ccclass
@injectService(LobbyService.instance)
export default class PBTransferInView extends UIView {
    service: LobbyService;

    @property(cc.Label)
    private labDepositAmount: cc.Label = null;

    @property(cc.Label)
    private labPiggyBank: cc.Label = null;

    @property(cc.Label)
    private labMaximumAmountValue: cc.Label = null;

    @property(cc.EditBox)
    private edbTransferIn: cc.EditBox = null;

    @property(cc.Label)
    private labMinimumInputAmountValue: cc.Label = null;

    @property(cc.Label)
    private labProfitValue: cc.Label = null;

    @property(cc.Label)
    private all: cc.Label = null;

    // 输入金额
    private m_transferInAmount: number = 0;
    // 合法输入字符串金额
    private m_legalAmount: string = "";

    public static getPrefabUrl() {
        return "piggyBank/prefabs/PBTransferInView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');

    }

    start() {
        this.all.language = i18n.PIGGY_BANK.ALL;
        let labMaximumAmount = this.content.getChildByName('labMaximumAmount');
        labMaximumAmount.getComponent(cc.Label).language = i18n.PIGGY_BANK.MAXIMUN_TRANSFER_AMIUNT;

        let imgBase = this.content.getChildByName('imgBase');
        let labTransferIn = imgBase.getChildByName("labTransferIn");
        labTransferIn.getComponent(cc.Label).language = i18n.PIGGY_BANK.TEANSFER_IN;

        let labMinimumInputAmount = imgBase.getChildByName("labMinimumInputAmount");
        labMinimumInputAmount.getComponent(cc.Label).language = i18n.PIGGY_BANK.MINIMUM_SIGLE;

        let labProfit = imgBase.getChildByName("labProfit");
        labProfit.getComponent(cc.Label).language = i18n.PIGGY_BANK.PROFIT;

    }

    bindingEvents() {
        super.bindingEvents();

        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_STORED_AMOUNT), this.onStoredAmount);
    }

    show(): void {
        super.show();
        this.showWithAction(true);
        this.initView();
    }

    onClickClose(): void {
        this.playDefaultEffect("close");
        dispatch("CMD_UPDATE_PIGGY_BANK_DATA");
        this.closeWithAction();
    }

    onClickConfirm(): void {
        this.playDefaultEffect();
        let strTransferInAmount: string = this.edbTransferIn.string;
        let numTransferInAmount: number = Number(strTransferInAmount);
        let numProfitAmount: number = Number(this.labProfitValue);

        if (strTransferInAmount.length <= 0) {
            PanelHelp.showTip(i18n.PIGGY_BANK.DEPOSIT_FAILURE);
            return;
        }

        if (numTransferInAmount === 0 || numProfitAmount <= 0) {
            PanelHelp.showTip(i18n.PIGGY_BANK.DEPOSIT_FAILURE);
            return;
        }

        if (numTransferInAmount > Number(PiggyBankData.getInstance().data.maxTransferAmount) / 10000) {
            PanelHelp.showTip(i18n.PIGGY_BANK.DEPOSIT_FAILURE);
            return;
        }

        if (numTransferInAmount > (User._gold / 10000)) {
            numTransferInAmount = Math.floor(numTransferInAmount);
        }

        this.m_transferInAmount = numTransferInAmount;

        let req = protoPackage.hall.StoredAmountReq.create({ amount: numTransferInAmount * 10000 });
        let buffer = protoPackage.hall.StoredAmountReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_STORED_AMOUNT,
            buffer);

    }

    onClickAll(): void {
        this.playDefaultEffect();
        let minTransferIn: number = Math.floor(Math.min(Number(PiggyBankData.getInstance().data.maxTransferAmount), User._gold) / 10000);
        this.setInputTransferInAmount(minTransferIn);
    }

    onDidBegan(target: cc.EditBox): void {

    }

    onDidEnded(target: cc.EditBox): void {
        let minTransferIn: number = Math.floor(Math.min(Number(PiggyBankData.getInstance().data.maxTransferAmount), User._gold) / 10000);
        let strInputAmount: string = target.string;

        let numInputAmount: number = Number(strInputAmount);
        if (isNaN(numInputAmount)) {
            this.setInputTransferInAmount();
            return;
        }
        if (numInputAmount > minTransferIn) {
            this.setInputTransferInAmount(minTransferIn);
            return;
        }
        if (numInputAmount <= 0) {
            numInputAmount = null;
        }
        this.setInputTransferInAmount(numInputAmount);
    }

    onDidChanged(str: string): void {
        if (str.length <= 0) {
            return;
        }

        let reg: RegExp = new RegExp(/^\d{1,}$/g);
        if (!reg.test(str)) {
            this.edbTransferIn.string = this.m_legalAmount;
            return;
        }

        this.m_legalAmount = str;

        let numInputAmount: number = Number(str);
        if (isNaN(numInputAmount)) {
            return;
        }

        this.setInputTransferInAmount(numInputAmount);
    }

    onStoredAmount(data): void {
        if (data.statusMsg.status !== 0) {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }

        PiggyBankData.getInstance().data.amount = Number(PiggyBankData.getInstance().data.amount) + (this.m_transferInAmount * 10000);
        PiggyBankData.getInstance().data.maxTransferAmount = Number(PiggyBankData.getInstance().data.maxTransferAmount) - (this.m_transferInAmount * 10000);
        PiggyBankData.getInstance().data.confirmAmount = Number(PiggyBankData.getInstance().data.confirmAmount) + (this.m_transferInAmount * 10000);
        PanelHelp.showTip(i18n.PIGGY_BANK.DEPOSITED_SUCCESSFULLY);
        this.initView();
    }

    private setInputTransferInAmount(amount?: number): void {
        if (amount === undefined || amount === null) {
            this.edbTransferIn.string = "";
        } else {
            this.edbTransferIn.string = amount.toString();
        }

        let minInput: number = this.getMinInput(this.edbTransferIn.string);
        let maxTransfer: number = Number(PiggyBankData.getInstance().data.maxTransferAmount) / 10000;
        let userGold: number = User._gold / 10000;
        let maxInput: number = Math.floor(Math.min(maxTransfer, userGold));

        this.labMinimumInputAmountValue.string = UtilMgr.changeMoney(minInput * 10000, false);

        let placeholderTips: string = "";

        if (maxTransfer < minInput) {
            placeholderTips = i18n.PIGGY_BANK.INSUFFICIENT_MAXIMUM;
        } else if (userGold < minInput) {
            placeholderTips = i18n.PIGGY_BANK.INSUFFICIENT_DEPOSIT_AMOUNT;
        } else {
            placeholderTips = i18n.PIGGY_BANK.PLEASE_ENTER + `${minInput} - ${maxInput}`;
        }

        this.edbTransferIn.placeholder = placeholderTips;
        let profit: number = this.getProfit(amount);
        let strProfit: string = profit.toString();
        if (profit !== 0) {
            strProfit = UtilMgr.changeMoney(profit * 10000, true);
        }
        this.labProfitValue.string = strProfit;
    }

    private initView(): void {
        let data: com.bt.game.proto.hall.ITotalAmountRes = PiggyBankData.getInstance().data;

        this.labDepositAmount.string = User.isRechargedPlayer ? UtilMgr.changeMoney(User._gold) : "0";
        this.labPiggyBank.string = UtilMgr.changeMoney(data.amount);
        let maxTransferAmount = UtilMgr.changeMoney(data.maxTransferAmount)
        if (maxTransferAmount.indexOf(".") != -1) {
            maxTransferAmount = maxTransferAmount.substring(0, maxTransferAmount.indexOf("."))
        }
        this.labMaximumAmountValue.string = maxTransferAmount;
        this.setInputTransferInAmount();
    }

    private getMinInput(strAmount: string = ""): number {
        let amount: number = 0;
        let profit: number = MIN_PROFIT;
        let rate: number = PiggyBankData.getInstance().data.rate / 10000;
        let minInputNum: number = 0;
        if (strAmount.length > 0) {
            let tempAmount: number = Number(strAmount);
            if (!isNaN(tempAmount)) {
                amount = tempAmount;
            }
        }

        if (rate > 0) {
            minInputNum = Math.ceil(profit / rate);
        }

        return minInputNum;
    }

    private getProfit(amount: number): number {
        if (amount === null || amount === undefined) {
            amount = 0;
        } else {
            if (isNaN(amount)) {
                amount = 0;
            }
        }

        let profit: number = 0;

        let rate: number = Operation.div(PiggyBankData.getInstance().data.rate, 10000);
        if (rate > 0) {
            profit = UtilMgr.toFixed(Operation.mul(amount, rate), 2)
        }

        return profit;
    }
}
