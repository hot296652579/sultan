"use strict";
cc._RF.push(module, '96d893ntB5AAamxbhfnwVGu', 'URLManager');
// script/common/manager/URLManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 自定义热更新地址（如果所有注释后，动态取服务器下发的）
let CUSTOM_HOT_UPDATE_URL = null;
// CUSTOM_HOT_UPDATE_URL = "http://192.168.6.201:81/hotUpdate/";//内网
// CUSTOM_HOT_UPDATE_URL = "http://fei928.com/hotUpdate/";//内网
// const CUSTOM_HOT_UPDATE_URL: string = "http://192.168.6.59:8111/hotUpdate/";//内网
// 自定义登陆地址（如果所有注释后，动态取服务器下发的）
let CUSTOM_LOGIN_URL = null;
// CUSTOM_LOGIN_URL = "http://192.168.6.63:8088/";//内网 
// CUSTOM_LOGIN_URL = "http://192.168.6.200:8088/";//内网
// CUSTOM_LOGIN_URL = "http://192.168.6.63:8088/";//李洋
// CUSTOM_LOGIN_URL = "http://192.168.6.59:8088/"; // 丰游
// CUSTOM_LOGIN_URL = "http://192.168.6.78:8000/"; // 郭鼎
// CUSTOM_LOGIN_URL = "http://login.fei928.com/";//外网
// CUSTOM_LOGIN_URL = "http://192.168.6.64:8088/"; // 刘科男
// CUSTOM_LOGIN_URL = "http://192.168.6.68:8000/"; // 李鹏菲
// CUSTOM_LOGIN_URL = "http://192.168.6.45:8088/"; // 小顺
// 自定义支付地址（如果所有注释后，动态取服务器下发的）
let CUSTOM_PAY_URL = null;
// CUSTOM_PAY_URL = "https://www.baidu.com/";
let CUSTOM_CUSTOMER_URL = null;
//好友房自定义分享地址
let CUSTOM_SHARE_URL = null;
class URLManager {
    constructor() {
        // APK 版本号
        this.m_apkVersion = null;
        // APK 下载地址
        this.m_apkURL = null;
        // 热更新地址
        this.m_hotUpdateURL = null;
        // 登陆地址
        this.m_loginURL = null;
        // 支付地址
        this.m_payURL = null;
        // 客服地址
        this.m_customerURL = null;
        //好友房分享地址
        this.m_shareFriendRoomURL = null;
        this.m_apkVersion = null;
        this.m_apkURL = null;
        this.m_hotUpdateURL = null;
        this.m_loginURL = null;
        this.m_payURL = null;
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new URLManager();
        }
        return this.s_instance;
    }
    static destroy() {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }
    get apkVersion() {
        return this.m_apkVersion;
    }
    set apkVersion(value) {
        this.m_apkVersion = value;
    }
    get apkURL() {
        return this.m_apkURL;
    }
    set apkURL(url) {
        this.m_apkURL = url;
    }
    get hotUpdateURL() {
        if (CUSTOM_HOT_UPDATE_URL) {
            this.m_hotUpdateURL = CUSTOM_HOT_UPDATE_URL;
        }
        return this.m_hotUpdateURL;
    }
    set hotUpdateURL(url) {
        this.m_hotUpdateURL = url;
    }
    get loginURL() {
        if (CUSTOM_LOGIN_URL) {
            this.m_loginURL = CUSTOM_LOGIN_URL;
        }
        return this.m_loginURL;
    }
    set loginURL(url) {
        this.m_loginURL = url;
    }
    get payURL() {
        if (CUSTOM_PAY_URL) {
            this.m_payURL = CUSTOM_PAY_URL;
        }
        return this.m_payURL;
    }
    set payURL(url) {
        this.m_payURL = url;
    }
    get customerURL() {
        if (CUSTOM_CUSTOMER_URL) {
            this.m_customerURL = CUSTOM_CUSTOMER_URL;
        }
        return this.m_customerURL;
    }
    set customerURL(url) {
        this.m_customerURL = url;
    }
    get shareFriendRoomURL() {
        if (CUSTOM_SHARE_URL) {
            this.m_shareFriendRoomURL = CUSTOM_SHARE_URL;
        }
        return this.m_shareFriendRoomURL;
    }
    set shareFriendRoomURL(url) {
        this.m_shareFriendRoomURL = url;
    }
    destroy() {
        this.m_apkVersion = null;
        this.m_apkURL = null;
        this.m_hotUpdateURL = null;
        this.m_loginURL = null;
        this.m_payURL = null;
        this.m_customerURL = null;
        this.m_shareFriendRoomURL = null;
    }
}
exports.default = URLManager;
URLManager.s_instance = null;

cc._RF.pop();