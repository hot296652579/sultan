"use strict";
cc._RF.push(module, 'ffbd0mcHthAlKb59iyTNT1M', 'DateUtils');
// script/framework/extentions/DateUtils.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TypeUtils_1 = __importDefault(require("../../common/utils/TypeUtils"));
const UtilMgr_1 = require("../../global/UtilMgr");
// 一天毫秒
const ONE_DAY_MS = 86400000;
class DateUtils {
    /**
     * 获取 月日
     * @param timestamp {number} 时间戳
     * @retrun {string} DD/MM
     */
    static getMD(timestamp) {
        let date = new Date(timestamp);
        let md = "";
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let strM = m < 10 ? ("0" + m) : m.toString();
        let strD = d < 10 ? ("0" + d) : d.toString();
        md = `${strD}/${strM}`;
        return md;
    }
    /**
     * 获取 年月日
     * @param timestamp {number} 时间戳
     * @param symbol {string} 分隔符
     * @return {string} YYYY/MM/DD
     */
    static getYMD(timestamp, symbol) {
        let date = new Date(Number(timestamp));
        let ymd = "";
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        if (TypeUtils_1.default.isNull(symbol)) {
            symbol = "/";
        }
        let strM = m < 10 ? ("0" + m) : m.toString();
        let strD = d < 10 ? ("0" + d) : d.toString();
        ymd = `${y}${symbol}${strM}${symbol}${strD}`;
        return ymd;
    }
    /**
     * 获取 月日 时分
     * @param timestamp {number} 时间戳
     * @return {String} MM-DD HH:MM
     */
    static getMDHM(timestamp) {
        let date = new Date(timestamp);
        let result = "";
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let strM = m < 10 ? ("0" + m) : m.toString();
        let strD = d < 10 ? ("0" + d) : d.toString();
        let strHour = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute = minute < 10 ? ("0" + minute) : minute.toString();
        result = `${strM}-${strD} ${strHour}:${strMinute}`;
        return result;
    }
    /**
     * 获取 月日 时分秒
     * @param timestamp {number} 时间戳
     * @return {String} MM-DD HH:MM:SS
     */
    static getMDHMS(timestamp) {
        let date = new Date(timestamp);
        let result = "";
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let sec = date.getSeconds();
        let strM = m < 10 ? ("0" + m) : m.toString();
        let strD = d < 10 ? ("0" + d) : d.toString();
        let strHour = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute = minute < 10 ? ("0" + minute) : minute.toString();
        let strSec = sec < 10 ? ("0" + sec) : sec.toString();
        result = `${strM}-${strD} ${strHour}:${strMinute}:${strSec}`;
        return result;
    }
    /**
     * 获取 时分秒
     * @param timestamp {number} 时间戳
     * @return {String} HH:MM:SS
     */
    static getHMS(timestamp) {
        let date = new Date(timestamp);
        let result = "";
        let hour = date.getHours();
        let minute = date.getMinutes();
        let sec = date.getSeconds();
        let strHour = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute = minute < 10 ? ("0" + minute) : minute.toString();
        let strSec = sec < 10 ? ("0" + sec) : sec.toString();
        result = `${strHour}:${strMinute}:${strSec}`;
        return result;
    }
    /**
     * 获取 年月日 时分秒
     * @param timestamp {number} 时间戳
     * @return {String} YYYY.MM.DD HH:MM:SS
     */
    static getYMDHMS(timestamp) {
        let date = new Date(Number(timestamp));
        let ymd = "";
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let sec = date.getSeconds();
        let strM = m < 10 ? ("0" + m) : m.toString();
        let strD = d < 10 ? ("0" + d) : d.toString();
        let strHour = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute = minute < 10 ? ("0" + minute) : minute.toString();
        let strSec = sec < 10 ? ("0" + sec) : sec.toString();
        ymd = `${y}.${strM}.${strD} ${strHour}:${strMinute}:${strSec}`;
        return ymd;
    }
    /**
     * 获取剩余时间 日时
     * @param currTimestamp {number} 当前时间戳
     * @param endTimestamp {Date} 结束时间戳
     * @return {string} 1D12H
     */
    static getRemainTimeDH(currTimestamp, endTimestamp) {
        let result = "";
        let distTimestamp = endTimestamp - currTimestamp;
        let distSec = distTimestamp / 1000;
        if (distSec <= 0) {
            result = "0H";
        }
        else {
            const DAY_SEC = 86400;
            const HOUR_SEC = 3600;
            let day = Math.floor(distSec / DAY_SEC);
            let hour = Math.ceil((distSec % DAY_SEC) / HOUR_SEC);
            if (day > 0) {
                result = `${day}D`;
            }
            if (hour > 0) {
                result += `${hour}H`;
            }
        }
        return result;
    }
    /**
     * 获取剩余时间 时分秒
     * @param currTimestamp {number} 当前时间戳
     * @param endTimestamp {Date} 结束时间戳
     * @return {string} HH:MM:SS
     */
    static getRemainTimeHMS(currTimestamp, endTimestamp) {
        let result = "";
        let ms = endTimestamp - currTimestamp;
        if (ms <= 0) {
            result = "00:00:00";
        }
        else {
            let hour = Math.floor(ms / 1000 / 60 / 60 % 24);
            let minute = Math.floor(ms / 1000 / 60 % 60);
            let sec = Math.floor(ms / 1000 % 60);
            let strHour = hour < 10 ? ("0" + hour) : hour.toString();
            let strMinute = minute < 10 ? ("0" + minute) : minute.toString();
            let strSec = sec < 10 ? ("0" + sec) : sec.toString();
            result = `${strHour}:${strMinute}:${strSec}`;
        }
        return result;
    }
    /**
     * 获取剩余时间 分秒
     * @param currTimestamp {number} 当前时间戳
     * @param endTimestamp {Date} 结束时间戳
     * @return {string} MMSS
     */
    static getRemainTimeMS(currTimestamp, endTimestamp) {
        let result = "";
        let ms = endTimestamp - currTimestamp;
        if (ms <= 0) {
            result = "0000";
        }
        else {
            let minute = Math.floor(ms / 1000 / 60 % 60);
            let sec = Math.floor(ms / 1000 % 60);
            let strMinute = minute < 10 ? ("0" + minute) : minute.toString();
            let strSec = sec < 10 ? ("0" + sec) : sec.toString();
            result = `${strMinute}${strSec}`;
        }
        return result;
    }
    /**
     * 获取剩余时间 秒
     * @param currTimestamp {number} 当前时间戳
     * @param endTimestamp {Date} 结束时间戳
     * @return {number} SS
     */
    static getRemainTimeS(currTimestamp, endTimestamp) {
        let result = null;
        let ms = endTimestamp - currTimestamp;
        if (ms <= 0) {
            result = 0;
        }
        else {
            let sec = Math.floor(ms / 1000);
            result = sec;
        }
        return result;
    }
    /**
     * 通过毫秒转换为秒
     * @param ms {number} 毫秒
     */
    static getMsToS(ms) {
        if (ms <= 0) {
            return "";
        }
        let sec = ms / 1000;
        return UtilMgr_1.UtilMgr.toPadding(UtilMgr_1.UtilMgr.toFixed(sec, 2), 2);
    }
    /**
     * 精确毫秒时间戳 转换 精确天时间戳
     * @param timestamp {number} 精确毫秒时间戳
     * @returns {number} 精确天时间戳
     */
    static getDayTimestamp(timestamp) {
        let strDate = new Date(timestamp).format("yyyy-MM-dd");
        return this.getTimestampByDate(strDate);
    }
    /**
     * 获取时间戳 通过时间格式
     * @param strDate {string} 字符串日期
     */
    static getTimestampByDate(strDate) {
        return (new Date(strDate)).getTime();
    }
    /**
     * 获取当前时间戳 前后天数 的日期
     * @param timestamp {number} 精确毫秒时间戳
     * @param baDay {number} 前后天数
     * @param format {string} 格式
     * @returns {number} 精确天时间戳
     */
    static getDayBeforeAfter(timestamp, baDay = 0, format = "yyyy-MM-dd") {
        let zeroTimestamp = this.getDayTimestamp(timestamp);
        let targetTimestamp = zeroTimestamp + (ONE_DAY_MS * baDay);
        let strDate = new Date(targetTimestamp).format(format);
        return strDate;
    }
    /**
     * 获取日期时间通过时间戳
     * @param timestamp {number} 时间戳
     * @param format {string} 格式
     */
    static getDateByTimestamp(timestamp, format = "yyyy-MM-dd") {
        return new Date(Number(timestamp)).format(format);
    }
}
exports.default = DateUtils;

cc._RF.pop();