"use strict";
cc._RF.push(module, 'b27a1R3i7RGtqA+sbOJAXgz', 'WithdrawalItem');
// script/withdrawal/WithdrawalItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Framework_1 = require("../framework/Framework");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let WithdrawalItem = class WithdrawalItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.bankName = null;
        this.account = null;
        this.checkToggle = null;
        this._itemClickCallback = null;
        this._itemId = 0;
        this._changeId = null;
        // update (dt) {}
    }
    onLoad() {
    }
    init(data, itemId, itemClickCallback) {
        this._itemId = itemId;
        this._changeId = data.id;
        this._data = data;
        this._itemClickCallback = itemClickCallback;
        this.bankName.string = data.bankName;
        this.account.string = UtilMgr_1.UtilMgr.setBankCardStringCover(data.bankCard);
        //this.checkToggle.node.active = itemId == 0
        let bankIndex = Framework_1.Manager.localStorage.getItem("selectBankIndex");
        if (!bankIndex) {
            this.checkToggle.isChecked = itemId == 0;
            if (itemId == 0) {
                Framework_1.Manager.localStorage.setItem("selectBankIndex", 0);
            }
        }
        else {
            this.checkToggle.isChecked = itemId == bankIndex;
        }
    }
    onItemClick(event, type) {
        Framework_1.Manager.localStorage.setItem("selectBankIndex", this._itemId);
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId);
        }
    }
    onClickChangeAccount(event, type) {
        dispatch("openBindChangeWithdrawalAccount", [2, this._data]);
    }
};
__decorate([
    property(cc.Label)
], WithdrawalItem.prototype, "bankName", void 0);
__decorate([
    property(cc.Label)
], WithdrawalItem.prototype, "account", void 0);
__decorate([
    property(cc.Toggle)
], WithdrawalItem.prototype, "checkToggle", void 0);
WithdrawalItem = __decorate([
    ccclass
], WithdrawalItem);
exports.default = WithdrawalItem;

cc._RF.pop();