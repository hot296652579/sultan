
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/data/RechargeData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZGF0YS9SZWNoYXJnZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBd0M7QUFDeEMsMkZBQW1FO0FBSW5FLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLGtCQUFRO0lBYzlDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFkTCxrQkFBYSxHQUFxQixJQUFJLENBQUM7UUFFdkMsaUJBQVksR0FBa0IsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUM1QyxpQkFBWSxHQUFrQixJQUFJLENBQUMsQ0FBQyxRQUFRO1FBQzVDLGtCQUFhLEdBQWtCLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFDN0Msa0JBQWEsR0FBa0IsSUFBSSxDQUFDLENBQUMsUUFBUTtRQUU3QyxpQkFBWSxHQUFvQixJQUFJLENBQUM7UUFFckMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRXhCLGVBQVUsR0FBVyxJQUFJLENBQUM7SUFLakMsQ0FBQztJQUVNLE9BQU87SUFFZCxDQUFDO0NBRUosQ0FBQTtBQXZCb0IsWUFBWTtJQURoQyx3QkFBYyxDQUFDLFNBQVM7R0FDSixZQUFZLENBdUJoQztrQkF2Qm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURhdGEgZnJvbSBcIi4uL2Jhc2UvQmFzZURhdGFcIjtcbmltcG9ydCBDbGFzc0RlY29yYXRvciBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9DbGFzc0RlY29yYXRvclwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcblxuQENsYXNzRGVjb3JhdG9yLmNsYXNzbmFtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFyZ2VEYXRhIGV4dGVuZHMgQmFzZURhdGEge1xuICAgIHB1YmxpYyBzdG9yZUluZm9MaXN0OiBNU1QuSVN0b3JlSW5mb1tdID0gbnVsbDtcblxuICAgIHB1YmxpYyBtaW5EZXBBbW91bnQ6IG51bWJlciB8IExvbmcgPSBudWxsOyAvL+WFheWAvOacgOWwj+mHkeminVxuICAgIHB1YmxpYyBtYXhEZXBBbW91bnQ6IG51bWJlciB8IExvbmcgPSBudWxsOyAvL+WFheWAvOacgOWkp+mHkeminVxuICAgIHB1YmxpYyBtaW5XaXRoQW1vdW50OiBudW1iZXIgfCBMb25nID0gbnVsbDsgLy/mj5DnjrDmnIDlsI/ph5Hpop1cbiAgICBwdWJsaWMgbWF4V2l0aEFtb3VudDogbnVtYmVyIHwgTG9uZyA9IG51bGw7IC8v5o+Q546w5pyA5aSn6YeR6aKdXG5cbiAgICBwdWJsaWMgYmFua0luZm9MaXN0OiBNU1QuSUJhbmtJbmZvW10gPSBudWxsO1xuXG4gICAgcHVibGljIGJhbmRCYW5rQ2FyZEluZm8gPSBudWxsO1xuXG4gICAgcHVibGljIHBheW1lbnRVcmw6IHN0cmluZyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuXG4gICAgfVxuXG59Il19