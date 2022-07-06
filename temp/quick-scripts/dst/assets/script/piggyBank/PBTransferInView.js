
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBTransferInView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCVHJhbnNmZXJJblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBMEQ7QUFDMUQsa0VBQTJFO0FBQzNFLG9FQUE0QztBQUM1QyxvRUFBNEM7QUFFNUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFDNUMsa0VBQXVEO0FBQ3ZELCtEQUF1RTtBQUN2RSx1REFBb0Q7QUFDcEQsa0ZBQTBEO0FBRTFELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUU1QyxPQUFPO0FBQ1AsTUFBTSxRQUFRLEdBQVcsTUFBTSxDQUFDO0FBQ2hDLE9BQU87QUFDUCxNQUFNLFVBQVUsR0FBVyxJQUFJLENBQUM7QUFJaEMsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLGdCQUFNO0lBQXBEOztRQUlZLHFCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyxpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QiwwQkFBcUIsR0FBYSxJQUFJLENBQUM7UUFHdkMsa0JBQWEsR0FBZSxJQUFJLENBQUM7UUFHakMsK0JBQTBCLEdBQWEsSUFBSSxDQUFDO1FBRzVDLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLFFBQUcsR0FBYSxJQUFJLENBQUM7UUFFN0IsT0FBTztRQUNDLHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUN2QyxZQUFZO1FBQ0osa0JBQWEsR0FBVyxFQUFFLENBQUM7SUFvT3ZDLENBQUM7SUFsT1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxvQ0FBb0MsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENB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QUssQ0FBQzswREFDdUI7QUFHMUM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDbUI7QUFHdEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrREFDNEI7QUFHL0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzt1REFDb0I7QUFHekM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvRUFDaUM7QUFHcEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDcUI7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDVTtBQXRCWixnQkFBZ0I7SUFGcEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsZ0JBQWdCLENBK1BwQztrQkEvUG9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBQaWdneUJhbmtEYXRhIGZyb20gXCIuL1BpZ2d5QmFua0RhdGFcIjtcbmltcG9ydCB7IGNvbSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IE9wZXJhdGlvbiBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVudGlvbnMvT3BlcmF0aW9uXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8vIOacgOWwj+WIqeeOh1xuY29uc3QgTUlOX1JBVEU6IG51bWJlciA9IDAuMDAwMjtcbi8vIOacgOWwj+aUtuebilxuY29uc3QgTUlOX1BST0ZJVDogbnVtYmVyID0gMC4wMTtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBCVHJhbnNmZXJJblZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkRlcG9zaXRBbW91bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlBpZ2d5QmFuazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTWF4aW11bUFtb3VudFZhbHVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwcml2YXRlIGVkYlRyYW5zZmVySW46IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTWluaW11bUlucHV0QW1vdW50VmFsdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlByb2ZpdFZhbHVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBhbGw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIOi+k+WFpemHkeminVxuICAgIHByaXZhdGUgbV90cmFuc2ZlckluQW1vdW50OiBudW1iZXIgPSAwO1xuICAgIC8vIOWQiOazlei+k+WFpeWtl+espuS4sumHkeminVxuICAgIHByaXZhdGUgbV9sZWdhbEFtb3VudDogc3RyaW5nID0gXCJcIjtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJwaWdneUJhbmsvcHJlZmFicy9QQlRyYW5zZmVySW5WaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbWdCZycpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuYWxsLmxhbmd1YWdlID0gaTE4bi5QSUdHWV9CQU5LLkFMTDtcbiAgICAgICAgbGV0IGxhYk1heGltdW1BbW91bnQgPSB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2xhYk1heGltdW1BbW91bnQnKTtcbiAgICAgICAgbGFiTWF4aW11bUFtb3VudC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gaTE4bi5QSUdHWV9CQU5LLk1BWElNVU5fVFJBTlNGRVJfQU1JVU5UO1xuXG4gICAgICAgIGxldCBpbWdCYXNlID0gdGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKCdpbWdCYXNlJyk7XG4gICAgICAgIGxldCBsYWJUcmFuc2ZlckluID0gaW1nQmFzZS5nZXRDaGlsZEJ5TmFtZShcImxhYlRyYW5zZmVySW5cIik7XG4gICAgICAgIGxhYlRyYW5zZmVySW4uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5sYW5ndWFnZSA9IGkxOG4uUElHR1lfQkFOSy5URUFOU0ZFUl9JTjtcblxuICAgICAgICBsZXQgbGFiTWluaW11bUlucHV0QW1vdW50ID0gaW1nQmFzZS5nZXRDaGlsZEJ5TmFtZShcImxhYk1pbmltdW1JbnB1dEFtb3VudFwiKTtcbiAgICAgICAgbGFiTWluaW11bUlucHV0QW1vdW50LmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBpMThuLlBJR0dZX0JBTksuTUlOSU1VTV9TSUdMRTtcblxuICAgICAgICBsZXQgbGFiUHJvZml0ID0gaW1nQmFzZS5nZXRDaGlsZEJ5TmFtZShcImxhYlByb2ZpdFwiKTtcbiAgICAgICAgbGFiUHJvZml0LmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBpMThuLlBJR0dZX0JBTksuUFJPRklUO1xuXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1NUT1JFRF9BTU9VTlQpLCB0aGlzLm9uU3RvcmVkQW1vdW50KTtcbiAgICB9XG5cbiAgICBzaG93KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5zaG93KCk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrQ2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoXCJjbG9zZVwiKTtcbiAgICAgICAgZGlzcGF0Y2goXCJDTURfVVBEQVRFX1BJR0dZX0JBTktfREFUQVwiKTtcbiAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrQ29uZmlybSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbGF5RGVmYXVsdEVmZmVjdCgpO1xuICAgICAgICBsZXQgc3RyVHJhbnNmZXJJbkFtb3VudDogc3RyaW5nID0gdGhpcy5lZGJUcmFuc2ZlckluLnN0cmluZztcbiAgICAgICAgbGV0IG51bVRyYW5zZmVySW5BbW91bnQ6IG51bWJlciA9IE51bWJlcihzdHJUcmFuc2ZlckluQW1vdW50KTtcbiAgICAgICAgbGV0IG51bVByb2ZpdEFtb3VudDogbnVtYmVyID0gTnVtYmVyKHRoaXMubGFiUHJvZml0VmFsdWUpO1xuXG4gICAgICAgIGlmIChzdHJUcmFuc2ZlckluQW1vdW50Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuREVQT1NJVF9GQUlMVVJFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW1UcmFuc2ZlckluQW1vdW50ID09PSAwIHx8IG51bVByb2ZpdEFtb3VudCA8PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuREVQT1NJVF9GQUlMVVJFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW1UcmFuc2ZlckluQW1vdW50ID4gTnVtYmVyKFBpZ2d5QmFua0RhdGEuZ2V0SW5zdGFuY2UoKS5kYXRhLm1heFRyYW5zZmVyQW1vdW50KSAvIDEwMDAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuREVQT1NJVF9GQUlMVVJFKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW1UcmFuc2ZlckluQW1vdW50ID4gKFVzZXIuX2dvbGQgLyAxMDAwMCkpIHtcbiAgICAgICAgICAgIG51bVRyYW5zZmVySW5BbW91bnQgPSBNYXRoLmZsb29yKG51bVRyYW5zZmVySW5BbW91bnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tX3RyYW5zZmVySW5BbW91bnQgPSBudW1UcmFuc2ZlckluQW1vdW50O1xuXG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5TdG9yZWRBbW91bnRSZXEuY3JlYXRlKHsgYW1vdW50OiBudW1UcmFuc2ZlckluQW1vdW50ICogMTAwMDAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5TdG9yZWRBbW91bnRSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9TVE9SRURfQU1PVU5ULFxuICAgICAgICAgICAgYnVmZmVyKTtcblxuICAgIH1cblxuICAgIG9uQ2xpY2tBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGxheURlZmF1bHRFZmZlY3QoKTtcbiAgICAgICAgbGV0IG1pblRyYW5zZmVySW46IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5taW4oTnVtYmVyKFBpZ2d5QmFua0RhdGEuZ2V0SW5zdGFuY2UoKS5kYXRhLm1heFRyYW5zZmVyQW1vdW50KSwgVXNlci5fZ29sZCkgLyAxMDAwMCk7XG4gICAgICAgIHRoaXMuc2V0SW5wdXRUcmFuc2ZlckluQW1vdW50KG1pblRyYW5zZmVySW4pO1xuICAgIH1cblxuICAgIG9uRGlkQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBvbkRpZEVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgbWluVHJhbnNmZXJJbjogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLm1pbihOdW1iZXIoUGlnZ3lCYW5rRGF0YS5nZXRJbnN0YW5jZSgpLmRhdGEubWF4VHJhbnNmZXJBbW91bnQpLCBVc2VyLl9nb2xkKSAvIDEwMDAwKTtcbiAgICAgICAgbGV0IHN0cklucHV0QW1vdW50OiBzdHJpbmcgPSB0YXJnZXQuc3RyaW5nO1xuXG4gICAgICAgIGxldCBudW1JbnB1dEFtb3VudDogbnVtYmVyID0gTnVtYmVyKHN0cklucHV0QW1vdW50KTtcbiAgICAgICAgaWYgKGlzTmFOKG51bUlucHV0QW1vdW50KSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbnB1dFRyYW5zZmVySW5BbW91bnQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobnVtSW5wdXRBbW91bnQgPiBtaW5UcmFuc2ZlckluKSB7XG4gICAgICAgICAgICB0aGlzLnNldElucHV0VHJhbnNmZXJJbkFtb3VudChtaW5UcmFuc2ZlckluKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobnVtSW5wdXRBbW91bnQgPD0gMCkge1xuICAgICAgICAgICAgbnVtSW5wdXRBbW91bnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0SW5wdXRUcmFuc2ZlckluQW1vdW50KG51bUlucHV0QW1vdW50KTtcbiAgICB9XG5cbiAgICBvbkRpZENoYW5nZWQoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlZzogUmVnRXhwID0gbmV3IFJlZ0V4cCgvXlxcZHsxLH0kL2cpO1xuICAgICAgICBpZiAoIXJlZy50ZXN0KHN0cikpIHtcbiAgICAgICAgICAgIHRoaXMuZWRiVHJhbnNmZXJJbi5zdHJpbmcgPSB0aGlzLm1fbGVnYWxBbW91bnQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1fbGVnYWxBbW91bnQgPSBzdHI7XG5cbiAgICAgICAgbGV0IG51bUlucHV0QW1vdW50OiBudW1iZXIgPSBOdW1iZXIoc3RyKTtcbiAgICAgICAgaWYgKGlzTmFOKG51bUlucHV0QW1vdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dFRyYW5zZmVySW5BbW91bnQobnVtSW5wdXRBbW91bnQpO1xuICAgIH1cblxuICAgIG9uU3RvcmVkQW1vdW50KGRhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIFBpZ2d5QmFua0RhdGEuZ2V0SW5zdGFuY2UoKS5kYXRhLmFtb3VudCA9IE51bWJlcihQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YS5hbW91bnQpICsgKHRoaXMubV90cmFuc2ZlckluQW1vdW50ICogMTAwMDApO1xuICAgICAgICBQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YS5tYXhUcmFuc2ZlckFtb3VudCA9IE51bWJlcihQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YS5tYXhUcmFuc2ZlckFtb3VudCkgLSAodGhpcy5tX3RyYW5zZmVySW5BbW91bnQgKiAxMDAwMCk7XG4gICAgICAgIFBpZ2d5QmFua0RhdGEuZ2V0SW5zdGFuY2UoKS5kYXRhLmNvbmZpcm1BbW91bnQgPSBOdW1iZXIoUGlnZ3lCYW5rRGF0YS5nZXRJbnN0YW5jZSgpLmRhdGEuY29uZmlybUFtb3VudCkgKyAodGhpcy5tX3RyYW5zZmVySW5BbW91bnQgKiAxMDAwMCk7XG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uUElHR1lfQkFOSy5ERVBPU0lURURfU1VDQ0VTU0ZVTExZKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SW5wdXRUcmFuc2ZlckluQW1vdW50KGFtb3VudD86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoYW1vdW50ID09PSB1bmRlZmluZWQgfHwgYW1vdW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVkYlRyYW5zZmVySW4uc3RyaW5nID0gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWRiVHJhbnNmZXJJbi5zdHJpbmcgPSBhbW91bnQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtaW5JbnB1dDogbnVtYmVyID0gdGhpcy5nZXRNaW5JbnB1dCh0aGlzLmVkYlRyYW5zZmVySW4uc3RyaW5nKTtcbiAgICAgICAgbGV0IG1heFRyYW5zZmVyOiBudW1iZXIgPSBOdW1iZXIoUGlnZ3lCYW5rRGF0YS5nZXRJbnN0YW5jZSgpLmRhdGEubWF4VHJhbnNmZXJBbW91bnQpIC8gMTAwMDA7XG4gICAgICAgIGxldCB1c2VyR29sZDogbnVtYmVyID0gVXNlci5fZ29sZCAvIDEwMDAwO1xuICAgICAgICBsZXQgbWF4SW5wdXQ6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5taW4obWF4VHJhbnNmZXIsIHVzZXJHb2xkKSk7XG5cbiAgICAgICAgdGhpcy5sYWJNaW5pbXVtSW5wdXRBbW91bnRWYWx1ZS5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KG1pbklucHV0ICogMTAwMDAsIGZhbHNlKTtcblxuICAgICAgICBsZXQgcGxhY2Vob2xkZXJUaXBzOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgIGlmIChtYXhUcmFuc2ZlciA8IG1pbklucHV0KSB7XG4gICAgICAgICAgICBwbGFjZWhvbGRlclRpcHMgPSBpMThuLlBJR0dZX0JBTksuSU5TVUZGSUNJRU5UX01BWElNVU07XG4gICAgICAgIH0gZWxzZSBpZiAodXNlckdvbGQgPCBtaW5JbnB1dCkge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJUaXBzID0gaTE4bi5QSUdHWV9CQU5LLklOU1VGRklDSUVOVF9ERVBPU0lUX0FNT1VOVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyVGlwcyA9IGkxOG4uUElHR1lfQkFOSy5QTEVBU0VfRU5URVIgKyBgJHttaW5JbnB1dH0gLSAke21heElucHV0fWA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkYlRyYW5zZmVySW4ucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlclRpcHM7XG4gICAgICAgIGxldCBwcm9maXQ6IG51bWJlciA9IHRoaXMuZ2V0UHJvZml0KGFtb3VudCk7XG4gICAgICAgIGxldCBzdHJQcm9maXQ6IHN0cmluZyA9IHByb2ZpdC50b1N0cmluZygpO1xuICAgICAgICBpZiAocHJvZml0ICE9PSAwKSB7XG4gICAgICAgICAgICBzdHJQcm9maXQgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KHByb2ZpdCAqIDEwMDAwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhYlByb2ZpdFZhbHVlLnN0cmluZyA9IHN0clByb2ZpdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICBsZXQgZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG90YWxBbW91bnRSZXMgPSBQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YTtcblxuICAgICAgICB0aGlzLmxhYkRlcG9zaXRBbW91bnQuc3RyaW5nID0gVXNlci5pc1JlY2hhcmdlZFBsYXllciA/IFV0aWxNZ3IuY2hhbmdlTW9uZXkoVXNlci5fZ29sZCkgOiBcIjBcIjtcbiAgICAgICAgdGhpcy5sYWJQaWdneUJhbmsuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShkYXRhLmFtb3VudCk7XG4gICAgICAgIGxldCBtYXhUcmFuc2ZlckFtb3VudCA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5tYXhUcmFuc2ZlckFtb3VudClcbiAgICAgICAgaWYgKG1heFRyYW5zZmVyQW1vdW50LmluZGV4T2YoXCIuXCIpICE9IC0xKSB7XG4gICAgICAgICAgICBtYXhUcmFuc2ZlckFtb3VudCA9IG1heFRyYW5zZmVyQW1vdW50LnN1YnN0cmluZygwLCBtYXhUcmFuc2ZlckFtb3VudC5pbmRleE9mKFwiLlwiKSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhYk1heGltdW1BbW91bnRWYWx1ZS5zdHJpbmcgPSBtYXhUcmFuc2ZlckFtb3VudDtcbiAgICAgICAgdGhpcy5zZXRJbnB1dFRyYW5zZmVySW5BbW91bnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1pbklucHV0KHN0ckFtb3VudDogc3RyaW5nID0gXCJcIik6IG51bWJlciB7XG4gICAgICAgIGxldCBhbW91bnQ6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBwcm9maXQ6IG51bWJlciA9IE1JTl9QUk9GSVQ7XG4gICAgICAgIGxldCByYXRlOiBudW1iZXIgPSBQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YS5yYXRlIC8gMTAwMDA7XG4gICAgICAgIGxldCBtaW5JbnB1dE51bTogbnVtYmVyID0gMDtcbiAgICAgICAgaWYgKHN0ckFtb3VudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgdGVtcEFtb3VudDogbnVtYmVyID0gTnVtYmVyKHN0ckFtb3VudCk7XG4gICAgICAgICAgICBpZiAoIWlzTmFOKHRlbXBBbW91bnQpKSB7XG4gICAgICAgICAgICAgICAgYW1vdW50ID0gdGVtcEFtb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyYXRlID4gMCkge1xuICAgICAgICAgICAgbWluSW5wdXROdW0gPSBNYXRoLmNlaWwocHJvZml0IC8gcmF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWluSW5wdXROdW07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcm9maXQoYW1vdW50OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAoYW1vdW50ID09PSBudWxsIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhbW91bnQgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGFtb3VudCkpIHtcbiAgICAgICAgICAgICAgICBhbW91bnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2ZpdDogbnVtYmVyID0gMDtcblxuICAgICAgICBsZXQgcmF0ZTogbnVtYmVyID0gT3BlcmF0aW9uLmRpdihQaWdneUJhbmtEYXRhLmdldEluc3RhbmNlKCkuZGF0YS5yYXRlLCAxMDAwMCk7XG4gICAgICAgIGlmIChyYXRlID4gMCkge1xuICAgICAgICAgICAgcHJvZml0ID0gVXRpbE1nci50b0ZpeGVkKE9wZXJhdGlvbi5tdWwoYW1vdW50LCByYXRlKSwgMilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9maXQ7XG4gICAgfVxufVxuIl19