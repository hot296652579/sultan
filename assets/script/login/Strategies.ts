/**
 * 策略对象 注册
 */
export default class Strategies {
    constructor() { }
    isNonEmpty(value, errorMsg) {
        if (value === '') {
            return errorMsg[0]
        }
    }

    minLength(value, param) {
        if (value.length < param[0]) {
            return param[1]
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