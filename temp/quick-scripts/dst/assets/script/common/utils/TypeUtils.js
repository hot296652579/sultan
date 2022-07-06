
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/utils/TypeUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0be95lRqrdJWZ5NkZRQouWm', 'TypeUtils');
// script/common/utils/TypeUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeUtils {
    /**
     * 判断是否数组
     * @param data {any} 数据
     * @returns 是否数组
     */
    static isArray(data) {
        if (Array.isArray) {
            return Array.isArray(data);
        }
        else {
            return Object.prototype.toString.call(data) === '[object Array]';
        }
    }
    /**
     * 判断是否为空
     * @param data {any} 数据
     * @returns 是否为空
     */
    static isNull(data) {
        return data === undefined || data === null;
    }
}
exports.default = TypeUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQXFCLFNBQVM7SUFFMUI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBUztRQUMzQixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNILE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLGdCQUFnQixDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVM7UUFDMUIsT0FBTyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUM7SUFDL0MsQ0FBQztDQUVKO0FBeEJELDRCQXdCQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFR5cGVVdGlscyB7XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3mmK/lkKbmlbDnu4RcbiAgICAgKiBAcGFyYW0gZGF0YSB7YW55fSDmlbDmja5cbiAgICAgKiBAcmV0dXJucyDmmK/lkKbmlbDnu4RcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzQXJyYXkoZGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KSB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3mmK/lkKbkuLrnqbpcbiAgICAgKiBAcGFyYW0gZGF0YSB7YW55fSDmlbDmja5cbiAgICAgKiBAcmV0dXJucyDmmK/lkKbkuLrnqbpcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGlzTnVsbChkYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhID09PSBudWxsO1xuICAgIH1cblxufSJdfQ==