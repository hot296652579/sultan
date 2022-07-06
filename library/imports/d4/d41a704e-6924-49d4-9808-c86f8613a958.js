"use strict";
cc._RF.push(module, 'd41a7BOaSRJ1JgIyG+GE6lY', 'CountDownCode');
// script/common/component/CountDownCode.ts

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
exports.VerificationCodeType = void 0;
const Decorators_1 = require("../../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const LobbyService_1 = require("../net/LobbyService");
var VerificationCodeType;
(function (VerificationCodeType) {
    VerificationCodeType[VerificationCodeType["none"] = 0] = "none";
    VerificationCodeType[VerificationCodeType["resetPwd"] = 1] = "resetPwd";
})(VerificationCodeType = exports.VerificationCodeType || (exports.VerificationCodeType = {}));
const { ccclass, property } = cc._decorator;
let CountDownCode = class CountDownCode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.btnGetCode = null;
        this.service = null;
        this.verificationCodeType = VerificationCodeType.none;
    }
    onLoad() {
        // this._doStartTime();
    }
    bindingEvents() {
        super.bindingEvents();
    }
    _doStartTime() {
        this.node.active = true;
        this.btnGetCode.enabled = false;
        this.verifiCD = 60;
        if (this.node.getComponent(cc.Button)) {
            this.node.getComponent(cc.Button).interactable = false;
        }
        this.label.string = this.verifiCD + 's';
        this.verifiCD -= 1;
        this.updateVerifiCD = setInterval(() => {
            if (this.verifiCD < 0) {
                clearInterval(this.updateVerifiCD);
                this.verifiCD = 60;
                this.countDownEnd();
                if (this.node.getComponent(cc.Button)) {
                    this.node.getComponent(cc.Button).interactable = true;
                }
            }
            else {
                if (this.label == null) {
                    clearInterval(this.updateVerifiCD);
                    if (cc.isValid(this.node)) {
                        this.onDestroy();
                    }
                }
                else {
                    this.label.string = this.verifiCD + 's';
                    this.verifiCD--;
                }
            }
        }, 1000);
    }
    countDownEnd() {
        this.node.active = false;
        this.btnGetCode.enabled = true;
    }
};
__decorate([
    property(cc.Label)
], CountDownCode.prototype, "label", void 0);
__decorate([
    property(cc.Button)
], CountDownCode.prototype, "btnGetCode", void 0);
CountDownCode = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CountDownCode);
exports.default = CountDownCode;

cc._RF.pop();