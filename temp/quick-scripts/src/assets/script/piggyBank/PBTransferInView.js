"use strict";
cc._RF.push(module, '7388blYlk9OQpSFiDLQ4HSj', 'PBTransferInView');
// script/piggyBank/PBTransferInView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PiggyBankData_1 = __importDefault(require("./PiggyBankData"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const Manager_1 = require("../common/manager/Manager");
const Operation_1 = __importDefault(require("../framework/extentions/Operation"));
const { ccclass, property } = cc._decorator;
// 最小利率
const MIN_RATE = 0.0002;
// 最小收益
const MIN_PROFIT = 0.01;
let PBTransferInView = class PBTransferInView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDepositAmount = null;
        this.labPiggyBank = null;
        this.labMaximumAmountValue = null;
        this.edbTransferIn = null;
        this.labMinimumInputAmountValue = null;
        this.labProfitValue = null;
        this.all = null;
        // 输入金额
        this.m_transferInAmount = 0;
        // 合法输入字符串金额
        this.m_legalAmount = "";
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBTransferInView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
        this.all.language = LanguageImpl_1.i18n.PIGGY_BANK.ALL;
        let labMaximumAmount = this.content.getChildByName('labMaximumAmount');
        labMaximumAmount.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.MAXIMUN_TRANSFER_AMIUNT;
        let imgBase = this.content.getChildByName('imgBase');
        let labTransferIn = imgBase.getChildByName("labTransferIn");
        labTransferIn.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.TEANSFER_IN;
        let labMinimumInputAmount = imgBase.getChildByName("labMinimumInputAmount");
        labMinimumInputAmount.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.MINIMUM_SIGLE;
        let labProfit = imgBase.getChildByName("labProfit");
        labProfit.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.PROFIT;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_STORED_AMOUNT), this.onStoredAmount);
    }
    show() {
        super.show();
        this.showWithAction(true);
        this.initView();
    }
    onClickClose() {
        this.playDefaultEffect("close");
        dispatch("CMD_UPDATE_PIGGY_BANK_DATA");
        this.closeWithAction();
    }
    onClickConfirm() {
        this.playDefaultEffect();
        let strTransferInAmount = this.edbTransferIn.string;
        let numTransferInAmount = Number(strTransferInAmount);
        let numProfitAmount = Number(this.labProfitValue);
        if (strTransferInAmount.length <= 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.DEPOSIT_FAILURE);
            return;
        }
        if (numTransferInAmount === 0 || numProfitAmount <= 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.DEPOSIT_FAILURE);
            return;
        }
        if (numTransferInAmount > Number(PiggyBankData_1.default.getInstance().data.maxTransferAmount) / 10000) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.DEPOSIT_FAILURE);
            return;
        }
        if (numTransferInAmount > (User_1.User._gold / 10000)) {
            numTransferInAmount = Math.floor(numTransferInAmount);
        }
        this.m_transferInAmount = numTransferInAmount;
        let req = CommonService_1.protoPackage.hall.StoredAmountReq.create({ amount: numTransferInAmount * 10000 });
        let buffer = CommonService_1.protoPackage.hall.StoredAmountReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_STORED_AMOUNT, buffer);
    }
    onClickAll() {
        this.playDefaultEffect();
        let minTransferIn = Math.floor(Math.min(Number(PiggyBankData_1.default.getInstance().data.maxTransferAmount), User_1.User._gold) / 10000);
        this.setInputTransferInAmount(minTransferIn);
    }
    onDidBegan(target) {
    }
    onDidEnded(target) {
        let minTransferIn = Math.floor(Math.min(Number(PiggyBankData_1.default.getInstance().data.maxTransferAmount), User_1.User._gold) / 10000);
        let strInputAmount = target.string;
        let numInputAmount = Number(strInputAmount);
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
    onDidChanged(str) {
        if (str.length <= 0) {
            return;
        }
        let reg = new RegExp(/^\d{1,}$/g);
        if (!reg.test(str)) {
            this.edbTransferIn.string = this.m_legalAmount;
            return;
        }
        this.m_legalAmount = str;
        let numInputAmount = Number(str);
        if (isNaN(numInputAmount)) {
            return;
        }
        this.setInputTransferInAmount(numInputAmount);
    }
    onStoredAmount(data) {
        if (data.statusMsg.status !== 0) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            return;
        }
        PiggyBankData_1.default.getInstance().data.amount = Number(PiggyBankData_1.default.getInstance().data.amount) + (this.m_transferInAmount * 10000);
        PiggyBankData_1.default.getInstance().data.maxTransferAmount = Number(PiggyBankData_1.default.getInstance().data.maxTransferAmount) - (this.m_transferInAmount * 10000);
        PiggyBankData_1.default.getInstance().data.confirmAmount = Number(PiggyBankData_1.default.getInstance().data.confirmAmount) + (this.m_transferInAmount * 10000);
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.DEPOSITED_SUCCESSFULLY);
        this.initView();
    }
    setInputTransferInAmount(amount) {
        if (amount === undefined || amount === null) {
            this.edbTransferIn.string = "";
        }
        else {
            this.edbTransferIn.string = amount.toString();
        }
        let minInput = this.getMinInput(this.edbTransferIn.string);
        let maxTransfer = Number(PiggyBankData_1.default.getInstance().data.maxTransferAmount) / 10000;
        let userGold = User_1.User._gold / 10000;
        let maxInput = Math.floor(Math.min(maxTransfer, userGold));
        this.labMinimumInputAmountValue.string = UtilMgr_1.UtilMgr.changeMoney(minInput * 10000, false);
        let placeholderTips = "";
        if (maxTransfer < minInput) {
            placeholderTips = LanguageImpl_1.i18n.PIGGY_BANK.INSUFFICIENT_MAXIMUM;
        }
        else if (userGold < minInput) {
            placeholderTips = LanguageImpl_1.i18n.PIGGY_BANK.INSUFFICIENT_DEPOSIT_AMOUNT;
        }
        else {
            placeholderTips = LanguageImpl_1.i18n.PIGGY_BANK.PLEASE_ENTER + `${minInput} - ${maxInput}`;
        }
        this.edbTransferIn.placeholder = placeholderTips;
        let profit = this.getProfit(amount);
        let strProfit = profit.toString();
        if (profit !== 0) {
            strProfit = UtilMgr_1.UtilMgr.changeMoney(profit * 10000, true);
        }
        this.labProfitValue.string = strProfit;
    }
    initView() {
        let data = PiggyBankData_1.default.getInstance().data;
        this.labDepositAmount.string = User_1.User.isRechargedPlayer ? UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold) : "0";
        this.labPiggyBank.string = UtilMgr_1.UtilMgr.changeMoney(data.amount);
        let maxTransferAmount = UtilMgr_1.UtilMgr.changeMoney(data.maxTransferAmount);
        if (maxTransferAmount.indexOf(".") != -1) {
            maxTransferAmount = maxTransferAmount.substring(0, maxTransferAmount.indexOf("."));
        }
        this.labMaximumAmountValue.string = maxTransferAmount;
        this.setInputTransferInAmount();
    }
    getMinInput(strAmount = "") {
        let amount = 0;
        let profit = MIN_PROFIT;
        let rate = PiggyBankData_1.default.getInstance().data.rate / 10000;
        let minInputNum = 0;
        if (strAmount.length > 0) {
            let tempAmount = Number(strAmount);
            if (!isNaN(tempAmount)) {
                amount = tempAmount;
            }
        }
        if (rate > 0) {
            minInputNum = Math.ceil(profit / rate);
        }
        return minInputNum;
    }
    getProfit(amount) {
        if (amount === null || amount === undefined) {
            amount = 0;
        }
        else {
            if (isNaN(amount)) {
                amount = 0;
            }
        }
        let profit = 0;
        let rate = Operation_1.default.div(PiggyBankData_1.default.getInstance().data.rate, 10000);
        if (rate > 0) {
            profit = UtilMgr_1.UtilMgr.toFixed(Operation_1.default.mul(amount, rate), 2);
        }
        return profit;
    }
};
__decorate([
    property(cc.Label)
], PBTransferInView.prototype, "labDepositAmount", void 0);
__decorate([
    property(cc.Label)
], PBTransferInView.prototype, "labPiggyBank", void 0);
__decorate([
    property(cc.Label)
], PBTransferInView.prototype, "labMaximumAmountValue", void 0);
__decorate([
    property(cc.EditBox)
], PBTransferInView.prototype, "edbTransferIn", void 0);
__decorate([
    property(cc.Label)
], PBTransferInView.prototype, "labMinimumInputAmountValue", void 0);
__decorate([
    property(cc.Label)
], PBTransferInView.prototype, "labProfitValue", void 0);
__decorate([
    property(cc.Label)
], PBTransferInView.prototype, "all", void 0);
PBTransferInView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBTransferInView);
exports.default = PBTransferInView;

cc._RF.pop();