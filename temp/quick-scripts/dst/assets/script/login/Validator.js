
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/Validator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vVmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXNDO0FBRXRDOztHQUVHO0FBQ0gsTUFBcUIsU0FBUztJQUMxQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDbEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUE7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFVBQVUsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLO1FBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUc7WUFDdEMsQ0FBQyxVQUFVLElBQUk7Z0JBQ1gsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2YsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUVuQyxrQ0FBa0M7b0JBQ2xDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtvQkFDbkMsT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDWDtJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBYSxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRztZQUNoRSxJQUFJLFFBQVEsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUMvQixJQUFJLFFBQVEsRUFBRTtnQkFDVixPQUFPLFFBQVEsQ0FBQzthQUNuQjtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBakNELDRCQWlDQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJhdGVnaWVzIGZyb20gXCIuL1N0cmF0ZWdpZXNcIjtcblxuLyoqXG4gKiDnrZbnlaXpqozor4FcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpc1snY2FjaGUnXSA9IFtdXG4gICAgICAgIGxldCBzdHJhdGVnaWVzID0gbmV3IFN0cmF0ZWdpZXMoKVxuICAgICAgICB0aGlzWydzdHJhdGVnaWVzJ10gPSBzdHJhdGVnaWVzXG4gICAgfVxuXG4gICAgYWRkKGRvbSwgcnVsZXMpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgcnVsZTsgcnVsZSA9IHJ1bGVzW2krK107KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RyYXRlZ3lBcnkgPSBydWxlLnN0cmF0ZWd5LnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yTXNnID0gcnVsZS5lcnJvck1zZztcbiAgICAgICAgICAgICAgICBzZWxmWydjYWNoZSddLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyYXRlZ3kgPSBzdHJhdGVneUFyeS5zaGlmdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0cmF0ZWd5QXJ5LnVuc2hpZnQoZG9tLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3lBcnkucHVzaChlcnJvck1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJhdGVnaWVzID0gc2VsZlsnc3RyYXRlZ2llcyddXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJhdGVnaWVzW3N0cmF0ZWd5XS5jYWxsKHNlbGYsZG9tLHN0cmF0ZWd5QXJ5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKHJ1bGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIHZhbGlkYXRvckZ1bmM7IHZhbGlkYXRvckZ1bmMgPSB0aGlzWydjYWNoZSddW2krK107KSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JNc2cgPSB2YWxpZGF0b3JGdW5jKCk7XG4gICAgICAgICAgICBpZiAoZXJyb3JNc2cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JNc2c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59Il19