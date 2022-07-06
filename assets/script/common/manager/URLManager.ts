
// 自定义热更新地址（如果所有注释后，动态取服务器下发的）
let CUSTOM_HOT_UPDATE_URL: string = null;
// CUSTOM_HOT_UPDATE_URL = "http://192.168.6.201:81/hotUpdate/";//内网
// CUSTOM_HOT_UPDATE_URL = "http://fei928.com/hotUpdate/";//内网

// const CUSTOM_HOT_UPDATE_URL: string = "http://192.168.6.59:8111/hotUpdate/";//内网
// 自定义登陆地址（如果所有注释后，动态取服务器下发的）
let CUSTOM_LOGIN_URL: string = null;
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
let CUSTOM_PAY_URL: string = null;
// CUSTOM_PAY_URL = "https://www.baidu.com/";
let CUSTOM_CUSTOMER_URL: string = null;
//好友房自定义分享地址
let CUSTOM_SHARE_URL: string = null;

export default class URLManager {

    private static s_instance: URLManager = null;
    // APK 版本号
    private m_apkVersion: string = null;
    // APK 下载地址
    private m_apkURL: string = null;
    // 热更新地址
    private m_hotUpdateURL: string = null;
    // 登陆地址
    private m_loginURL: string = null;
    // 支付地址
    private m_payURL: string = null;
    // 客服地址
    private m_customerURL: string = null;
    //好友房分享地址
    private m_shareFriendRoomURL: string = null; 
    public static getInstance(): URLManager {
        if (this.s_instance === null) {
            this.s_instance = new URLManager();
        }
        return this.s_instance;
    }

    public static destroy(): void {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }

    constructor() {
        this.m_apkVersion = null;
        this.m_apkURL = null;
        this.m_hotUpdateURL = null;
        this.m_loginURL = null;
        this.m_payURL = null;
    }

    public get apkVersion(): string {
        return this.m_apkVersion;
    }

    public set apkVersion(value: string) {
        this.m_apkVersion = value;
    }

    public get apkURL(): string {
        return this.m_apkURL;
    }

    public set apkURL(url: string) {
        this.m_apkURL = url;
    }

    public get hotUpdateURL(): string {
        if (CUSTOM_HOT_UPDATE_URL) {
            this.m_hotUpdateURL = CUSTOM_HOT_UPDATE_URL;
        }
        return this.m_hotUpdateURL;
    }

    public set hotUpdateURL(url: string) {
        this.m_hotUpdateURL = url;
    }

    public get loginURL(): string {
        if (CUSTOM_LOGIN_URL) {
            this.m_loginURL = CUSTOM_LOGIN_URL;
        }
        return this.m_loginURL;
    }

    public set loginURL(url: string) {
        this.m_loginURL = url;
    }

    public get payURL(): string {
        if (CUSTOM_PAY_URL) {
            this.m_payURL = CUSTOM_PAY_URL;
        }
        return this.m_payURL;
    }

    public set payURL(url: string) {
        this.m_payURL = url;
    }

    public get customerURL(): string {
        if (CUSTOM_CUSTOMER_URL) {
            this.m_customerURL = CUSTOM_CUSTOMER_URL;
        }
        return this.m_customerURL;
    }

    public set customerURL(url: string) {
        this.m_customerURL = url;
    }

    public get shareFriendRoomURL(): string {
        if (CUSTOM_SHARE_URL) {
            this.m_shareFriendRoomURL = CUSTOM_SHARE_URL;
        }
        return this.m_shareFriendRoomURL;
    }

    public set shareFriendRoomURL(url: string) {
        this.m_shareFriendRoomURL = url;
    }

    public destroy(): void {
        this.m_apkVersion = null;
        this.m_apkURL = null;
        this.m_hotUpdateURL = null;
        this.m_loginURL = null;
        this.m_payURL = null;
        this.m_customerURL = null;
        this.m_shareFriendRoomURL = null;
    }

}