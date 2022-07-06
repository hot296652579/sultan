import TypeUtils from "../../common/utils/TypeUtils";
import { UtilMgr } from "../../global/UtilMgr";

// 一天毫秒
const ONE_DAY_MS: number = 86400000;

export default class DateUtils {

    /**
     * 获取 月日
     * @param timestamp {number} 时间戳
     * @retrun {string} DD/MM
     */
    public static getMD(timestamp: number): string {
        let date: Date = new Date(timestamp);
        let md: string = "";
        let m: number = date.getMonth() + 1;
        let d: number = date.getDate();

        let strM: string = m < 10 ? ("0" + m) : m.toString();
        let strD: string = d < 10 ? ("0" + d) : d.toString();

        md = `${strD}/${strM}`;
        return md;
    }

    /**
     * 获取 年月日
     * @param timestamp {number} 时间戳
     * @param symbol {string} 分隔符
     * @return {string} YYYY/MM/DD 
     */
    public static getYMD(timestamp: number | Long, symbol?: string): string {
        let date: Date = new Date(Number(timestamp));
        let ymd: string = "";
        let y: number = date.getFullYear();
        let m: number = date.getMonth() + 1;
        let d: number = date.getDate();

        if (TypeUtils.isNull(symbol)) {
            symbol = "/";
        }

        let strM: string = m < 10 ? ("0" + m) : m.toString();
        let strD: string = d < 10 ? ("0" + d) : d.toString();

        ymd = `${y}${symbol}${strM}${symbol}${strD}`;
        return ymd;
    }

    /**
     * 获取 月日 时分
     * @param timestamp {number} 时间戳
     * @return {String} MM-DD HH:MM
     */
    public static getMDHM(timestamp: number): string {
        let date: Date = new Date(timestamp);
        let result: string = "";
        let m: number = date.getMonth() + 1;
        let d: number = date.getDate();
        let hour: number = date.getHours();
        let minute: number = date.getMinutes();


        let strM: string = m < 10 ? ("0" + m) : m.toString();
        let strD: string = d < 10 ? ("0" + d) : d.toString();
        let strHour: string = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute: string = minute < 10 ? ("0" + minute) : minute.toString();


        result = `${strM}-${strD} ${strHour}:${strMinute}`;
        return result;
    }

    /**
     * 获取 月日 时分秒
     * @param timestamp {number} 时间戳
     * @return {String} MM-DD HH:MM:SS
     */
    public static getMDHMS(timestamp: number): string {
        let date: Date = new Date(timestamp);
        let result: string = "";
        let m: number = date.getMonth() + 1;
        let d: number = date.getDate();
        let hour: number = date.getHours();
        let minute: number = date.getMinutes();
        let sec: number = date.getSeconds();


        let strM: string = m < 10 ? ("0" + m) : m.toString();
        let strD: string = d < 10 ? ("0" + d) : d.toString();
        let strHour: string = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute: string = minute < 10 ? ("0" + minute) : minute.toString();
        let strSec: string = sec < 10 ? ("0" + sec) : sec.toString();


        result = `${strM}-${strD} ${strHour}:${strMinute}:${strSec}`;
        return result;
    }

    /**
     * 获取 时分秒
     * @param timestamp {number} 时间戳
     * @return {String} HH:MM:SS
     */
    public static getHMS(timestamp: number): string {
        let date: Date = new Date(timestamp);
        let result: string = "";
        let hour: number = date.getHours();
        let minute: number = date.getMinutes();
        let sec: number = date.getSeconds();


        let strHour: string = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute: string = minute < 10 ? ("0" + minute) : minute.toString();
        let strSec: string = sec < 10 ? ("0" + sec) : sec.toString();


        result = `${strHour}:${strMinute}:${strSec}`;
        return result;
    }

    /**
     * 获取 年月日 时分秒
     * @param timestamp {number} 时间戳
     * @return {String} YYYY.MM.DD HH:MM:SS
     */
    public static getYMDHMS(timestamp: number | Long): string {
        let date: Date = new Date(Number(timestamp));
        let ymd: string = "";
        let y: number = date.getFullYear();
        let m: number = date.getMonth() + 1;
        let d: number = date.getDate();
        let hour: number = date.getHours();
        let minute: number = date.getMinutes();
        let sec: number = date.getSeconds();

        let strM: string = m < 10 ? ("0" + m) : m.toString();
        let strD: string = d < 10 ? ("0" + d) : d.toString();

        let strHour: string = hour < 10 ? ("0" + hour) : hour.toString();
        let strMinute: string = minute < 10 ? ("0" + minute) : minute.toString();
        let strSec: string = sec < 10 ? ("0" + sec) : sec.toString()

        ymd = `${y}.${strM}.${strD} ${strHour}:${strMinute}:${strSec}`;
        return ymd;
    }

    /**
     * 获取剩余时间 日时
     * @param currTimestamp {number} 当前时间戳
     * @param endTimestamp {Date} 结束时间戳
     * @return {string} 1D12H
     */
    public static getRemainTimeDH(currTimestamp: number, endTimestamp: number): string {
        let result: string = "";

        let distTimestamp: number = endTimestamp - currTimestamp;
        let distSec: number = distTimestamp / 1000;
        if (distSec <= 0) {
            result = "0H";
        } else {
            const DAY_SEC: number = 86400;
            const HOUR_SEC: number = 3600
            let day: number = Math.floor(distSec / DAY_SEC);
            let hour: number = Math.ceil((distSec % DAY_SEC) / HOUR_SEC);
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
    public static getRemainTimeHMS(currTimestamp: number, endTimestamp: number): string {
        let result: string = "";

        let ms: number = endTimestamp - currTimestamp;
        if (ms <= 0) {
            result = "00:00:00";
        } else {
            let hour = Math.floor(ms / 1000 / 60 / 60 % 24);
            let minute = Math.floor(ms / 1000 / 60 % 60);
            let sec = Math.floor(ms / 1000 % 60);
            let strHour: string = hour < 10 ? ("0" + hour) : hour.toString();
            let strMinute: string = minute < 10 ? ("0" + minute) : minute.toString();
            let strSec: string = sec < 10 ? ("0" + sec) : sec.toString();
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
    public static getRemainTimeMS(currTimestamp: number, endTimestamp: number): string {
        let result: string = "";

        let ms: number = endTimestamp - currTimestamp;
        if (ms <= 0) {
            result = "0000";
        } else {
            let minute = Math.floor(ms / 1000 / 60 % 60);
            let sec = Math.floor(ms / 1000 % 60);
            let strMinute: string = minute < 10 ? ("0" + minute) : minute.toString();
            let strSec: string = sec < 10 ? ("0" + sec) : sec.toString();
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
    public static getRemainTimeS(currTimestamp: number, endTimestamp: number): number {
        let result: number = null;

        let ms: number = endTimestamp - currTimestamp;
        if (ms <= 0) {
            result = 0;
        } else {
            let sec = Math.floor(ms / 1000);
            result = sec;
        }

        return result;
    }

    /**
     * 通过毫秒转换为秒
     * @param ms {number} 毫秒
     */
    public static getMsToS(ms: number): string {
        if (ms <= 0) {
            return "";
        }

        let sec: number = ms / 1000;
        return UtilMgr.toPadding(UtilMgr.toFixed(sec, 2), 2);
    }

    /**
     * 精确毫秒时间戳 转换 精确天时间戳
     * @param timestamp {number} 精确毫秒时间戳
     * @returns {number} 精确天时间戳
     */
    public static getDayTimestamp(timestamp: number): number {
        let strDate: string = new Date(timestamp).format("yyyy-MM-dd");
        return this.getTimestampByDate(strDate);
    }

    /**
     * 获取时间戳 通过时间格式
     * @param strDate {string} 字符串日期
     */
    public static getTimestampByDate(strDate: string): number {
        return (new Date(strDate)).getTime();
    }

    /**
     * 获取当前时间戳 前后天数 的日期
     * @param timestamp {number} 精确毫秒时间戳
     * @param baDay {number} 前后天数
     * @param format {string} 格式
     * @returns {number} 精确天时间戳
     */
    public static getDayBeforeAfter(timestamp: number, baDay: number = 0, format: string = "yyyy-MM-dd"): string {
        let zeroTimestamp: number = this.getDayTimestamp(timestamp);
        let targetTimestamp: number = zeroTimestamp + (ONE_DAY_MS * baDay)
        let strDate: string = new Date(targetTimestamp).format(format);
        return strDate;
    }

    /**
     * 获取日期时间通过时间戳
     * @param timestamp {number} 时间戳
     * @param format {string} 格式
     */
    public static getDateByTimestamp(timestamp: number | Long, format: string = "yyyy-MM-dd"): string {
        return new Date(Number(timestamp)).format(format);
    }
}