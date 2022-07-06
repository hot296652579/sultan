"use strict";
cc._RF.push(module, '4d4a3bmWn1IP4nG6XoNmM3p', 'Validator');
// script/login/Validator.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Strategies_1 = __importDefault(require("./Strategies"));
/**
 * 策略验证
 */
class Validator {
    constructor() {
        this['cache'] = [];
        let strategies = new Strategies_1.default();
        this['strategies'] = strategies;
    }
    add(dom, rules) {
        let self = this;
        for (let i = 0, rule; rule = rules[i++];) {
            (function (rule) {
                let strategyAry = rule.strategy.split(':');
                let errorMsg = rule.errorMsg;
                self['cache'].push(function () {
                    let strategy = strategyAry.shift();
                    // strategyAry.unshift(dom.value);
                    strategyAry.push(errorMsg);
                    let strategies = self['strategies'];
                    return strategies[strategy].call(self, dom, strategyAry);
                });
            })(rule);
        }
    }
    start() {
        for (let i = 0, validatorFunc; validatorFunc = this['cache'][i++];) {
            let errorMsg = validatorFunc();
            if (errorMsg) {
                return errorMsg;
            }
        }
    }
}
exports.default = Validator;

cc._RF.pop();