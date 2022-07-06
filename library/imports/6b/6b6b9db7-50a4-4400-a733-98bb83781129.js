"use strict";
cc._RF.push(module, '6b6b923UKREAKczmLuDeBEp', 'User');
// script/global/User.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const { ccclass, property } = cc._decorator;
let _User = class _User {
    constructor() {
        //登录user信息
        this._userName = null; // 玩家昵称
        this._userID = null; // 玩家ID
        this._sex = 0; //玩家的性别，值为1时是男性，值为2时是女性，值为0时是未知
        this._gold = 0; // 金币
        this._token = null; //token
        this._diamonds = 0; //玩家钻石
        this._headImgUrl = ""; //头像
        this._inviterId = 0; //邀请人
        this._phone = ""; //手机
        this._areaCode = ""; //区号
        this._points = 0; //积分
        this._role = 0; //玩家角色 0 = 普通 1 = 代理
        this._promoteUrl = ""; //推广链接
        this._shareImgUrl = ""; //分享链接
        this._needSetPassword = 0; // 等于1 需要设置密码
        this._signature = ""; //个性签名
        //大厅user信息
        this._bankList = []; //银行账号
        this._bank = 0; // 保险柜
        this._vipLevel = 0; //vip等级
        this._goldType = -1; // 0=真金玩家 1=非真金玩家
        //是否开启好友场
        this._friendRoomSwitch = null;
        // 是否设置二级密码
        this.piggyBank = null;
        // 服务器时间戳
        this.timestamp = 0;
        /**@description 已经新手引导的游戏id */
        this._gameIds = [];
        /**@description 弹窗队列 防止与新手引导重叠*/
        this._popWindows = [];
        // 是否游戏中
        this._isGameing = false;
        //是否充值
        this._recharge = 0; //是否充过值 0未充值 1冲过值
        this._firstpay = false;
        this.resetData = function () {
            this._userName = null; // 玩家昵称
            this._userID = null; // 玩家ID
            this._gold = null; // 金币
            this._bank_coin = null; // 金库里的金币
            this._token = null;
            this.piggyBank = null;
            this.timestamp = null;
            this._needSetPassword = 0;
            this._isGameing = false;
            this._goldType = -1;
            this._popWindows = [];
            this._firstpay = false;
        };
        /**
         * 更新玩家数据
         */
        this.updateUserData = function (data) {
            cc.log(data, '更新玩家数据');
            this._userName = data.nickName;
            this._userID = parseInt(data.userId);
            this._gold = data.gold;
            this._sex = data.sex;
            this._diamonds = data.diamonds;
            this._headImgUrl = data.headImgUrl;
            this._inviterId = data.inviterId;
            this._phone = data.phone;
            this._points = data.points;
            this._role = data.role;
            this.piggyBank = data.piggyBank;
            this._areaCode = data.areaCode;
            this._gameIds = data.gameIds;
        };
    }
    // 是否是充值过的 真金玩家
    get isRechargedPlayer() {
        return this._goldType == 0;
    }
};
_User = __decorate([
    ccclass
], _User);
exports.User = new _User();
if (CC_PREVIEW) {
    window['User'] = exports.User;
}

cc._RF.pop();