"use strict";
cc._RF.push(module, '3c58cPIE2FKm5IsS+uR/dZN', 'PiggyBankView');
// script/piggyBank/PiggyBankView.ts

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
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PBChangePasswdView_1 = __importDefault(require("./PBChangePasswdView"));
const PBDepositReceiptView_1 = __importDefault(require("./PBDepositReceiptView"));
const PBHelpView_1 = __importDefault(require("./PBHelpView"));
const PBTransferInView_1 = __importDefault(require("./PBTransferInView"));
const PiggyBankData_1 = __importDefault(require("./PiggyBankData"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const User_1 = require("../global/User");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let PiggyBankView = class PiggyBankView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDepositAmountValue = null;
        this.labTotalRevenueValue = null;
        this.labRateValue = null;
        this.labConfirmedAmountValue = null;
        this.labAyerIncomeValue = null;
        this.imgGridding = null;
        this.m_data = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PiggyBankView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
        if (this.imgGridding) {
            let labTotalRevenue = cc.find('labTotalRevenue', this.imgGridding);
            labTotalRevenue.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.TOTAL_INCOME;
            let labRate = cc.find('labRate', this.imgGridding);
            labRate.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.RATE;
            let labConfirmedAmount = cc.find('labConfirmedAmount', this.imgGridding);
            labConfirmedAmount.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.COMFIRMED_AMOUNT;
            let labAyerIncome = cc.find('labAyerIncome', this.imgGridding);
            labAyerIncome.getComponent(cc.Label).language = LanguageImpl_1.i18n.PIGGY_BANK.YESTERDAY_INCOME;
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("CMD_UPDATE_PIGGY_BANK_DATA", this.onUpdatePiggyBank);
    }
    show(data) {
        super.show(data);
        this.showWithAction(true);
        PiggyBankData_1.default.getInstance().data = data;
        this.m_data = data;
        this.updateView();
    }
    onUpdatePiggyBank() {
        this.m_data = PiggyBankData_1.default.getInstance().data;
        this.updateView();
    }
    updateView() {
        this.labDepositAmountValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.amount);
        this.labTotalRevenueValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.income);
        this.labRateValue.string = `${this.m_data.rate / 100}%`;
        this.labConfirmedAmountValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.confirmAmount);
        this.labAyerIncomeValue.string = UtilMgr_1.UtilMgr.changeMoney(this.m_data.ayerIncome);
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickHelp() {
        this.playDefaultEffect();
        Manager_1.Manager.uiManager.open({ type: PBHelpView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClickTransferIn() {
        this.playDefaultEffect();
        if (!User_1.User.isRechargedPlayer)
            return PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EXPERIENCE_FIELD.hintRecharge);
        Manager_1.Manager.uiManager.open({ type: PBTransferInView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClickChangePasswd() {
        this.playDefaultEffect();
        Manager_1.Manager.uiManager.open({ type: PBChangePasswdView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClickDepositReceipt() {
        this.playDefaultEffect();
        Manager_1.Manager.uiManager.open({ type: PBDepositReceiptView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
};
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labDepositAmountValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labTotalRevenueValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labRateValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labConfirmedAmountValue", void 0);
__decorate([
    property(cc.Label)
], PiggyBankView.prototype, "labAyerIncomeValue", void 0);
__decorate([
    property(cc.Node)
], PiggyBankView.prototype, "imgGridding", void 0);
PiggyBankView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PiggyBankView);
exports.default = PiggyBankView;

cc._RF.pop();