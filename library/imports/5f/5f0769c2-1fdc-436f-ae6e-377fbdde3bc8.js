"use strict";
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