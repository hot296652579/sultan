
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/Strategies.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac495r8FUFEA7G3vaHhJtO+', 'Strategies');
// script/login/Strategies.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 策略对象 注册
 */
class Strategies {
    constructor() { }
    isNonEmpty(value, errorMsg) {
        if (value === '') {
            return errorMsg[0];
        }
    }
    minLength(value, param) {
        if (value.length < param[0]) {
            return param[1];
        }
    }
    isMobile(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg[0];
        }
    }
    isEmail(value, errorMsg) {
        if (!/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(value)) {
            return errorMsg[0];
        }
    }
    //包含大小写字母加数字
    passwordRule(value, errorMsg) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(value)) {
            return errorMsg[0];
        }
    }
}
exports.default = Strategies;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vU3RyYXRlZ2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsTUFBcUIsVUFBVTtJQUMzQixnQkFBZ0IsQ0FBQztJQUNqQixVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVE7UUFDdEIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckI7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLO1FBQ2xCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEI7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRO1FBQ3BCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckMsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRO1FBQ25CLElBQUksQ0FBQyw4Q0FBOEMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBQ0QsWUFBWTtJQUNaLFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUTtRQUN4QixJQUFJLDJDQUEyQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6RCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7Q0FDSjtBQS9CRCw2QkErQkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOetlueVpeWvueixoSDms6jlhoxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyYXRlZ2llcyB7XG4gICAgY29uc3RydWN0b3IoKSB7IH1cbiAgICBpc05vbkVtcHR5KHZhbHVlLCBlcnJvck1zZykge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JNc2dbMF1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1pbkxlbmd0aCh2YWx1ZSwgcGFyYW0pIHtcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHBhcmFtWzBdKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1bMV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTW9iaWxlKHZhbHVlLCBlcnJvck1zZykge1xuICAgICAgICBpZiAoIS8oXjFbM3w1fDhdWzAtOV17OX0kKS8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvck1zZ1swXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW1haWwodmFsdWUsIGVycm9yTXNnKSB7XG4gICAgICAgIGlmICghL15cXHcrQFthLXpBLVowLTldezIsMTB9KD86XFwuW2Etel17Miw0fSl7MSwzfSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3JNc2dbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/ljIXlkKvlpKflsI/lhpnlrZfmr43liqDmlbDlrZdcbiAgICBwYXNzd29yZFJ1bGUodmFsdWUsIGVycm9yTXNnKSB7XG4gICAgICAgIGlmICgvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZClbXl17OCwxNn0kLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yTXNnWzBdO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==