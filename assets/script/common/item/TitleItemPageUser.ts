import UserData from "../../data/UserData";
import { BUNDLE_RESOURCES } from "../../framework/base/Defines";
import UIView from "../../framework/ui/UIView";
import { UtilMgr } from "../../global/UtilMgr";
import LoginNewView from "../../login/LoginNewView";
import RechargeNewView from "../../wallet/RechargeNewView";
import { Manager } from "../manager/Manager";
import NumberUtils from "../utils/NumberUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TitleItemPageUser extends UIView {

    @property(cc.Label)
    protected labPageName: cc.Label = null;

    @property(cc.Button)
    protected btnLogin: cc.Button = null;

    @property(cc.Node)
    protected nodUserInfo: cc.Node = null;

    @property(cc.Sprite)
    protected imgAvatar: cc.Sprite = null;

    @property(cc.Label)
    protected labUserName: cc.Label = null;

    @property(cc.Sprite)
    protected imgGold: cc.Sprite = null;

    @property(cc.Label)
    protected labGold: cc.Label = null;

    // 用户数据
    protected _userData: UserData = null;

    onLoad() {
        super.onLoad();

        this.initData();
        this.initUI()
        this.refreshUser();
    }

    start() {

    }

    protected bindingEvents(): void {
        super.bindingEvents();

        this.registerEvent("Event_M2C_GoldChange_Mes", this.onEvent_M2C_GoldChange_Mes);
        this.registerEvent('Event_S2C_ModifyAvartar', this.onRefreshUserInfo);
        this.registerEvent("updateUserInfo", this.onRefreshUserInfo)
    }

    protected initData(): void {
        this._userData = G.DataMgr.get(UserData);
    }

    protected initUI(): void {
        this.labPageName.string = "";
        this.btnLogin.node.active = false;
        this.nodUserInfo.active = false;
        this.imgAvatar.spriteFrame = null;
        this.labGold.string = "";
    }

    public onRefreshUserInfo() {
        this.refreshUser();
    }

    public setPageName(name: string): void {
        this.labPageName.string = name;
    }

    public languagePageName(i18n: (string | number)[] | string): void {
        this.labPageName.language = i18n;
    }

    public refreshUser(): void {
        this.btnLogin.node.active = false;
        this.nodUserInfo.active = false;
        if (this._userData.isLogined()) {
            this.nodUserInfo.active = true;
            this.refreshAvatar();
            this.refreshGold();
            this.refreshNick();
        } else {
            this.btnLogin.node.active = true;
        }
    }

    protected refreshAvatar(): void {
        UtilMgr.loadHeadImg(this.imgAvatar, this._userData.info.HeaderUrl, this._userData.info.UnitId, this);
    }

    public refreshGold(): void {
        this.labGold.string = NumberUtils.converToC(Number(this._userData.info.Gold));
    }

    protected refreshNick(): void {
        this.labUserName.string = UtilMgr.setString(this._userData.info.Nick);
    }

    /**
     * 获取金币世界坐标
     * @returns {cc.Vec2}
     */
    public getGoldWorldPos(): cc.Vec2 {
        return this.imgGold.node.convertToWorldSpaceAR(cc.v2(0, 0));
    }

    protected onEvent_M2C_GoldChange_Mes(oldGold: number): void {
        this.refreshGold();
    }

    onClick(name: string): void {
        switch (name) {
            case "btnLogin":
                Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
                break;
            case "btnBuyGold":
                Manager.uiManager.open({ type: RechargeNewView, bundle: BUNDLE_RESOURCES });
                break;
        }
    }

    // update (dt) {}
}
