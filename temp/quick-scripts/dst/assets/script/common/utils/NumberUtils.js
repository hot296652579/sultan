
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/utils/NumberUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f076nCH9xDb65uN3+93jvI', 'NumberUtils');
// script/common/utils/NumberUtils.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Operation_1 = __importDefault(require("../../framework/extentions/Operation"));
class NumberUtils {
    /**
     * 转换到服务器数据 需要乘以 100 发给服务器
     * @param value {number} 需转换值
     * @returns 转换后值
     */
    static converToS(value) {
        return Operation_1.default.mul(value, 100);
    }
    /**
     * 转换到客户端数据 需要除以 100 用于展示
     * @param value {number | Long} 需转换值
     * @returns 转换后值
     */
    static converToC(value) {
        return Operation_1.default.div(Number(value), 100).toString();
    }
    /**
     * 数字大于多少位之后，用省略号代替
     * @param value {number | Long} 需转换值
     * @returns 转换后值
     */
    static converToE(max, value) {
        let numStr = String(value);
        if (numStr.length > max) {
            return `${numStr.slice(0, max)}...`;
        }
        else
            return numStr;
    }
}
exports.default = NumberUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL3V0aWxzL051bWJlclV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUZBQTZEO0FBRTdELE1BQXFCLFdBQVc7SUFFNUI7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBYTtRQUNqQyxPQUFPLG1CQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBb0I7UUFDeEMsT0FBTyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFvQjtRQUM3QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNyQixPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQTtTQUN0Qzs7WUFFRyxPQUFPLE1BQU0sQ0FBQTtJQUNyQixDQUFDO0NBRUo7QUFsQ0QsOEJBa0NDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9wZXJhdGlvbiBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V4dGVudGlvbnMvT3BlcmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlclV0aWxzIHtcblxuICAgIC8qKlxuICAgICAqIOi9rOaNouWIsOacjeWKoeWZqOaVsOaNriDpnIDopoHkuZjku6UgMTAwIOWPkee7meacjeWKoeWZqFxuICAgICAqIEBwYXJhbSB2YWx1ZSB7bnVtYmVyfSDpnIDovazmjaLlgLxcbiAgICAgKiBAcmV0dXJucyDovazmjaLlkI7lgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlclRvUyh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE9wZXJhdGlvbi5tdWwodmFsdWUsIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6L2s5o2i5Yiw5a6i5oi356uv5pWw5o2uIOmcgOimgemZpOS7pSAxMDAg55So5LqO5bGV56S6XG4gICAgICogQHBhcmFtIHZhbHVlIHtudW1iZXIgfCBMb25nfSDpnIDovazmjaLlgLxcbiAgICAgKiBAcmV0dXJucyDovazmjaLlkI7lgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlclRvQyh2YWx1ZTogbnVtYmVyIHwgTG9uZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBPcGVyYXRpb24uZGl2KE51bWJlcih2YWx1ZSksIDEwMCkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmlbDlrZflpKfkuo7lpJrlsJHkvY3kuYvlkI7vvIznlKjnnIHnlaXlj7fku6Pmm79cbiAgICAgKiBAcGFyYW0gdmFsdWUge251bWJlciB8IExvbmd9IOmcgOi9rOaNouWAvFxuICAgICAqIEByZXR1cm5zIOi9rOaNouWQjuWAvFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVyVG9FKG1heCwgdmFsdWU6IG51bWJlciB8IExvbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbnVtU3RyID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgaWYgKG51bVN0ci5sZW5ndGggPiBtYXgpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtudW1TdHIuc2xpY2UoMCwgbWF4KX0uLi5gXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bVN0clxuICAgIH1cblxufSJdfQ==