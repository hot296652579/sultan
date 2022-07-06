"use strict";
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