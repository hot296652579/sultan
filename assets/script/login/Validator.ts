import Strategies from "./Strategies";

/**
 * 策略验证
 */
export default class Validator {
    constructor() {
        this['cache'] = []
        let strategies = new Strategies()
        this['strategies'] = strategies
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
                    let strategies = self['strategies']
                    return strategies[strategy].call(self,dom,strategyAry);
                });
            })(rule)
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