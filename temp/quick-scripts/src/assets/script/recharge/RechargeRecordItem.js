"use strict";
cc._RF.push(module, 'ceed6eRPAZA44AUNTPJ2Qs1', 'RechargeRecordItem');
// script/recharge/RechargeRecordItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilMgr_1 = require("../global/UtilMgr");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const { ccclass, property } = cc._decorator;
let RechargeRecordItem = class RechargeRecordItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.lbl_time = null;
        this.lbl_commodity = null;
        this.lbl_Amount = null;
        this.lbl_state = null;
    }
    onLoad() { }
    updateItem(obj) {
        this.lbl_time.string = new Date(obj.time).format('MM-dd hh:mm:ss');
        this.lbl_commodity.string = obj.commodity;
        this.lbl_Amount.string = UtilMgr_1.UtilMgr.changeMoney(obj.amount);
        this.lbl_state.string = obj.state == 0 ? LanguageImpl_1.i18n.RECHARGE.WaitingPay : (obj.state == 1 ? LanguageImpl_1.i18n.RECHARGE.PaySuccess : LanguageImpl_1.i18n.RECHARGE.PayFailed);
        // 充值状态 0待支付 1支付成功
        this.lbl_state.node.color = cc.color().fromHEX(obj.state == 0 ? "FDE5EC" : (obj.state == 1 ? '00ff3c' : "fd1414"));
    }
};
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_time", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_commodity", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_Amount", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_state", void 0);
RechargeRecordItem = __decorate([
    ccclass
], RechargeRecordItem);
exports.default = RechargeRecordItem;

cc._RF.pop();