import BaseData from "../base/BaseData";
import ClassDecorator from "../framework/decorator/ClassDecorator";

@ClassDecorator.classname
export default class AppData extends BaseData {

    // 版本号
    public version: string = null;
    // 动态校验码
    public token: string = null;
    // 静态校验码
    public refreshToken: string = null;
    // 渠道号
    public channel: string = null;
    // 客户端与服务器的时差
    public timeDifference: number = null;
    // 带入邀请码
    public invcode: string = null;

    constructor() {
        super();

    }

    public destroy(): void {
        this.version = null;
        this.token = null;
        this.refreshToken = null;
        this.channel = null;
        this.timeDifference = null;
        this.invcode = null;
    }

    /**
     * 获取客户端时间戳
     * @returns {number} 时间戳
     */
    public getClientTimestamp(): number {
        return Date.now();
    }

    /**
     * 获取服务器时间戳（每次通过心跳校正差值）
     * @returns {number} 时间戳
     */
    public getServerTimestamp(): number {
        return Date.now() + this.timeDifference;
    }

}