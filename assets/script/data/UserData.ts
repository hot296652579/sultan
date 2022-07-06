import BaseData from "../base/BaseData";
import { Manager } from "../common/manager/Manager";
import ClassDecorator from "../framework/decorator/ClassDecorator";
import { MST } from "../framework/external/protoc";
import fbsdk from "../sdk/fbsdk";
import * as LocalStoreageDefine from "../common/define/LocalStorageDefine";

@ClassDecorator.classname
export default class UserData extends BaseData {

    // 用户 ID
    public id: number = null;
    // 用户 名字
    public nick: string = null;
    // 绑定邮箱
    public email: string = null;
    // 绑定手机
    public BindPhone: string = null;
    // 推广码
    public extendCode: string = null;
    // 用户信息
    public info: MST.IUnitInfo = null;

    public inGame: string = null;

    constructor() {
        super();

    }

    clearUserData() {
        this.id = null
        this.nick = null
        // this.BindEmail = null
        this.info = null

        let token = Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        if (token) {
            Manager.localStorage.setItem(LocalStoreageDefine.ACCOUNT_TOKEN, null);
        }

        let imei = Manager.localStorage.getItem('IMEI');
        if (imei) {
            Manager.localStorage.setItem('IMEI', null);
        }
    }

    /**
     * 是否已登录用户
     * @returns {boolean} 是否登录
     */
    public isLogined(): boolean {
        return this.id !== null && this.id !== undefined;
    }

    public destroy(): void {

    }

}