"use strict";
cc._RF.push(module, '1dac0fmqHtNApsWicOqgsQj', 'TitleItemPageUser');
// script/common/item/TitleItemPageUser.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserData_1 = __importDefault(require("../../data/UserData"));
const Defines_1 = require("../../framework/base/Defines");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const UtilMgr_1 = require("../../global/UtilMgr");
const LoginNewView_1 = __importDefault(require("../../login/LoginNewView"));
const RechargeNewView_1 = __importDefault(require("../../wallet/RechargeNewView"));
const Manager_1 = require("../manager/Manager");
const NumberUtils_1 = __importDefault(require("../utils/NumberUtils"));
const { ccclass, property } = cc._decorator;
let TitleItemPageUser = class TitleItemPageUser extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labPageName = null;
        this.btnLogin = null;
        this.nodUserInfo = null;
        this.imgAvatar = null;
        this.labUserName = null;
        this.imgGold = null;
        this.labGold = null;
        // 用户数据
        this._userData = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initUI();
        this.refreshUser();
    }
    start() {
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("Event_M2C_GoldChange_Mes", this.onEvent_M2C_GoldChange_Mes);
        this.registerEvent('Event_S2C_ModifyAvartar', this.onRefreshUserInfo);
        this.registerEvent("updateUserInfo", this.onRefreshUserInfo);
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    initUI() {
        this.labPageName.string = "";
        this.btnLogin.node.active = false;
        this.nodUserInfo.active = false;
        this.imgAvatar.spriteFrame = null;
        this.labGold.string = "";
    }
    onRefreshUserInfo() {
        this.refreshUser();
    }
    setPageName(name) {
        this.labPageName.string = name;
    }
    languagePageName(i18n) {
        this.labPageName.language = i18n;
    }
    refreshUser() {
        this.btnLogin.node.active = false;
        this.nodUserInfo.active = false;
        if (this._userData.isLogined()) {
            this.nodUserInfo.active = true;
            this.refreshAvatar();
            this.refreshGold();
            this.refreshNick();
        }
        else {
            this.btnLogin.node.active = true;
        }
    }
    refreshAvatar() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, this._userData.info.HeaderUrl, this._userData.info.UnitId, this);
    }
    refreshGold() {
        this.labGold.string = NumberUtils_1.default.converToC(Number(this._userData.info.Gold));
    }
    refreshNick() {
        this.labUserName.string = UtilMgr_1.UtilMgr.setString(this._userData.info.Nick);
    }
    /**
     * 获取金币世界坐标
     * @returns {cc.Vec2}
     */
    getGoldWorldPos() {
        return this.imgGold.node.convertToWorldSpaceAR(cc.v2(0, 0));
    }
    onEvent_M2C_GoldChange_Mes(oldGold) {
        this.refreshGold();
    }
    onClick(name) {
        switch (name) {
            case "btnLogin":
                Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case "btnBuyGold":
                Manager_1.Manager.uiManager.open({ type: RechargeNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
        }
    }
};
__decorate([
    property(cc.Label)
], TitleItemPageUser.prototype, "labPageName", void 0);
__decorate([
    property(cc.Button)
], TitleItemPageUser.prototype, "btnLogin", void 0);
__decorate([
    property(cc.Node)
], TitleItemPageUser.prototype, "nodUserInfo", void 0);
__decorate([
    property(cc.Sprite)
], TitleItemPageUser.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], TitleItemPageUser.prototype, "labUserName", void 0);
__decorate([
    property(cc.Sprite)
], TitleItemPageUser.prototype, "imgGold", void 0);
__decorate([
    property(cc.Label)
], TitleItemPageUser.prototype, "labGold", void 0);
TitleItemPageUser = __decorate([
    ccclass
], TitleItemPageUser);
exports.default = TitleItemPageUser;

cc._RF.pop();