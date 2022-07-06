"use strict";
cc._RF.push(module, '8cc7fW3gehA56CdDr4Y/JdB', 'SendVerificationCodePlus');
// script/common/component/SendVerificationCodePlus.ts

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
const SendVerificationCode_1 = __importDefault(require("./SendVerificationCode"));
const { ccclass, property } = cc._decorator;
let SendVerificationCodePlus = class SendVerificationCodePlus extends SendVerificationCode_1.default {
    constructor() {
        super(...arguments);
        this.prebg = null;
    }
    onLoad() {
        super.onLoad();
        this.countDownEnd();
    }
    doSendVerificationCode(msg) {
        super.doSendVerificationCode(msg);
        this.countDownEnd();
    }
    _doStartTime() {
        super._doStartTime();
        this.prebg.active = false;
    }
    countDownEnd() {
        this.prebg.active = true;
        this.label.string = "";
    }
    sendFail() {
        super.sendFail();
        this.countDownEnd();
    }
};
__decorate([
    property(cc.Node)
], SendVerificationCodePlus.prototype, "prebg", void 0);
SendVerificationCodePlus = __decorate([
    ccclass
], SendVerificationCodePlus);
exports.default = SendVerificationCodePlus;

cc._RF.pop();