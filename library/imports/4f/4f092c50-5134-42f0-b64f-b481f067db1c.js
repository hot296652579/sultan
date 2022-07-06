"use strict";
cc._RF.push(module, '4f092xQUTRC8LZPtIHwZ9sc', 'Logger');
// script/framework/log/Logger.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils_1 = __importDefault(require("../extentions/DateUtils"));
class Logger {
    constructor() {
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new Logger();
        }
        return this.s_instance;
    }
    static destroy() {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }
    /**
     * 颜色日志
     * @param title {string} 标题
     * @param content {string} 重要内容
     * @param data {...any[]} 数据
     */
    color(title, content, ...data) {
        let colorList = [
            `${title} %c ${content} %c`,
            'background: #31A43D;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
            'background: #00FF24;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
        ];
        data = colorList.concat(data);
        console.log.apply(console.log, data);
    }
    /**
     * 打印正常信息
     * @param data {...any[]} 多个任意数据
     */
    log(...data) {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("信息：");
        data.push(DateUtils_1.default.getMDHMS(Date.now()));
        console.log.apply(console, data);
    }
    /**
     * 打印警告信息
     * @param data {...any[]} 多个任意数据
     */
    warn(...data) {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("警告：");
        console.warn.apply(console, data);
    }
    /**
     * 打印错误信息
     * @param data {...any[]} 多个任意数据
     */
    error(...data) {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("错误：");
        console.error.apply(console, data);
    }
    /**
     * 销毁
     */
    destroy() {
    }
}
exports.default = Logger;
Logger.s_instance = null;

cc._RF.pop();