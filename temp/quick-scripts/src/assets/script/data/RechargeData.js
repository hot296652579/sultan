"use strict";
cc._RF.push(module, 'd2ef3pWgoFM37HT1hNHNpRm', 'RechargeData');
// script/data/RechargeData.ts

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
const BaseData_1 = __importDefault(require("../base/BaseData"));
const ClassDecorator_1 = __importDefault(require("../framework/decorator/ClassDecorator"));
let RechargeData = class RechargeData extends BaseData_1.default {
    constructor() {
        super();
        this.storeInfoList = null;
        this.minDepAmount = null; //充值最小金额
        this.maxDepAmount = null; //充值最大金额
        this.minWithAmount = null; //提现最小金额
        this.maxWithAmount = null; //提现最大金额
        this.bankInfoList = null;
        this.bandBankCardInfo = null;
        this.paymentUrl = null;
    }
    destroy() {
    }
};
RechargeData = __decorate([
    ClassDecorator_1.default.classname
], RechargeData);
exports.default = RechargeData;

cc._RF.pop();