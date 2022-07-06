
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/global/User.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZ2xvYmFsL1VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQU0sS0FBSyxHQUFYLE1BQU0sS0FBSztJQUFYO1FBRUksVUFBVTtRQUNWLGNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPO1FBQ3pCLFlBQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPO1FBQ3ZCLFNBQUksR0FBRyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDekMsVUFBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFDaEIsV0FBTSxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU87UUFDdEIsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDckIsZ0JBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJO1FBQ3RCLGVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQ3JCLFdBQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJO1FBQ2pCLGNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQSxJQUFJO1FBQ25CLFlBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBQ2pCLFVBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFDL0IsZ0JBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO1FBQ3hCLGlCQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtRQUN6QixxQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQSxhQUFhO1FBQ2xDLGVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQSxNQUFNO1FBRXRCLFVBQVU7UUFDVixjQUFTLEdBQUcsRUFBRSxDQUFBLENBQUMsTUFBTTtRQUNyQixVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUNqQixjQUFTLEdBQUcsQ0FBQyxDQUFD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QUFDLEdBQUcsWUFBSSxDQUFDO0NBQ3pCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5jbGFzcyBfVXNlciB7XG5cbiAgICAvL+eZu+W9lXVzZXLkv6Hmga9cbiAgICBfdXNlck5hbWUgPSBudWxsOyAvLyDnjqnlrrbmmLXnp7BcbiAgICBfdXNlcklEID0gbnVsbDsgLy8g546p5a62SURcbiAgICBfc2V4ID0gMDsgLy/njqnlrrbnmoTmgKfliKvvvIzlgLzkuLox5pe25piv55S35oCn77yM5YC85Li6MuaXtuaYr+Wls+aAp++8jOWAvOS4ujDml7bmmK/mnKrnn6VcbiAgICBfZ29sZCA9IDA7IC8vIOmHkeW4gVxuICAgIF90b2tlbiA9IG51bGw7IC8vdG9rZW5cbiAgICBfZGlhbW9uZHMgPSAwOyAvL+eOqeWutumSu+efs1xuICAgIF9oZWFkSW1nVXJsID0gXCJcIjsgLy/lpLTlg49cbiAgICBfaW52aXRlcklkID0gMDsgLy/pgoDor7fkurpcbiAgICBfcGhvbmUgPSBcIlwiOyAvL+aJi+aculxuICAgIF9hcmVhQ29kZSA9IFwiXCI7Ly/ljLrlj7dcbiAgICBfcG9pbnRzID0gMDsgLy/np6/liIZcbiAgICBfcm9sZSA9IDA7IC8v546p5a626KeS6ImyIDAgPSDmma7pgJogMSA9IOS7o+eQhlxuICAgIF9wcm9tb3RlVXJsID0gXCJcIjsgLy/mjqjlub/pk77mjqVcbiAgICBfc2hhcmVJbWdVcmwgPSBcIlwiOyAvL+WIhuS6q+mTvuaOpVxuICAgIF9uZWVkU2V0UGFzc3dvcmQgPSAwOy8vIOetieS6jjEg6ZyA6KaB6K6+572u5a+G56CBXG4gICAgX3NpZ25hdHVyZSA9IFwiXCI7Ly/kuKrmgKfnrb7lkI1cblxuICAgIC8v5aSn5Y6FdXNlcuS/oeaBr1xuICAgIF9iYW5rTGlzdCA9IFtdIC8v6ZO26KGM6LSm5Y+3XG4gICAgX2JhbmsgPSAwOyAvLyDkv53pmanmn5xcbiAgICBfdmlwTGV2ZWwgPSAwOyAvL3ZpcOetiee6p1xuICAgIF9nb2xkVHlwZSA9IC0xOy8vIDA955yf6YeR546p5a62IDE96Z2e55yf6YeR546p5a62XG4gICAgXG4gICAgLy8g5piv5ZCm5piv5YWF5YC86L+H55qEIOecn+mHkeeOqeWutlxuICAgIHB1YmxpYyBnZXQgaXNSZWNoYXJnZWRQbGF5ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nb2xkVHlwZSA9PSAwO1xuICAgIH1cblxuICAgIC8v5piv5ZCm5byA5ZCv5aW95Y+L5Zy6XG4gICAgcHVibGljIF9mcmllbmRSb29tU3dpdGNoOmJvb2xlYW4gPSBudWxsO1xuXG4gICAgLy8g5piv5ZCm6K6+572u5LqM57qn5a+G56CBXG4gICAgcHVibGljIHBpZ2d5QmFuazogYm9vbGVhbiA9IG51bGw7XG4gICAgLy8g5pyN5Yqh5Zmo5pe26Ze05oizXG4gICAgcHVibGljIHRpbWVzdGFtcDogbnVtYmVyID0gMDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlt7Lnu4/mlrDmiYvlvJXlr7znmoTmuLjmiI9pZCAqL1xuICAgIHB1YmxpYyBfZ2FtZUlkcyA9IFtdO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOW8ueeql+mYn+WIlyDpmLLmraLkuI7mlrDmiYvlvJXlr7zph43lj6AqL1xuICAgIHB1YmxpYyBfcG9wV2luZG93cyA9IFtdO1xuICAgIC8vIOaYr+WQpua4uOaIj+S4rVxuICAgIF9pc0dhbWVpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8v5piv5ZCm5YWF5YC8XG4gICAgX3JlY2hhcmdlID0gMDsvL+aYr+WQpuWFhei/h+WAvCAw5pyq5YWF5YC8IDHlhrLov4flgLxcblxuICAgIF9maXJzdHBheSA6IGJvb2xlYW4gPSBmYWxzZTsgXG5cbiAgICByZXNldERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJOYW1lID0gbnVsbDsgLy8g546p5a625pi156ewXG4gICAgICAgIHRoaXMuX3VzZXJJRCA9IG51bGw7IC8vIOeOqeWutklEXG4gICAgICAgIHRoaXMuX2dvbGQgPSBudWxsOyAvLyDph5HluIFcbiAgICAgICAgdGhpcy5fYmFua19jb2luID0gbnVsbDsgLy8g6YeR5bqT6YeM55qE6YeR5biBXG4gICAgICAgIHRoaXMuX3Rva2VuID0gbnVsbDtcbiAgICAgICAgdGhpcy5waWdneUJhbmsgPSBudWxsO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IG51bGw7XG4gICAgICAgIHRoaXMuX25lZWRTZXRQYXNzd29yZCA9IDA7XG4gICAgICAgIHRoaXMuX2lzR2FtZWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9nb2xkVHlwZSA9IC0xO1xuICAgICAgICB0aGlzLl9wb3BXaW5kb3dzID0gW107XG4gICAgICAgIHRoaXMuX2ZpcnN0cGF5ID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOabtOaWsOeOqeWutuaVsOaNrlxuICAgICAqL1xuICAgIHVwZGF0ZVVzZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2MubG9nKGRhdGEsICfmm7TmlrDnjqnlrrbmlbDmja4nKTtcbiAgICAgICAgdGhpcy5fdXNlck5hbWUgPSBkYXRhLm5pY2tOYW1lO1xuICAgICAgICB0aGlzLl91c2VySUQgPSBwYXJzZUludChkYXRhLnVzZXJJZCk7XG4gICAgICAgIHRoaXMuX2dvbGQgPSBkYXRhLmdvbGQ7XG4gICAgICAgIHRoaXMuX3NleCA9IGRhdGEuc2V4O1xuICAgICAgICB0aGlzLl9kaWFtb25kcyA9IGRhdGEuZGlhbW9uZHM7XG4gICAgICAgIHRoaXMuX2hlYWRJbWdVcmwgPSBkYXRhLmhlYWRJbWdVcmw7XG4gICAgICAgIHRoaXMuX2ludml0ZXJJZCA9IGRhdGEuaW52aXRlcklkO1xuICAgICAgICB0aGlzLl9waG9uZSA9IGRhdGEucGhvbmU7XG4gICAgICAgIHRoaXMuX3BvaW50cyA9IGRhdGEucG9pbnRzO1xuICAgICAgICB0aGlzLl9yb2xlID0gZGF0YS5yb2xlO1xuICAgICAgICB0aGlzLnBpZ2d5QmFuayA9IGRhdGEucGlnZ3lCYW5rO1xuICAgICAgICB0aGlzLl9hcmVhQ29kZSA9IGRhdGEuYXJlYUNvZGVcbiAgICAgICAgdGhpcy5fZ2FtZUlkcyA9IGRhdGEuZ2FtZUlkc1xuXG4gICAgfVxuXG5cbn1cbmV4cG9ydCBjb25zdCBVc2VyID0gbmV3IF9Vc2VyKCk7XG5cbiAgICAgIFxuXG4gICAgICAgIGlmIChDQ19QUkVWSUVXKSB7XG4gICAgICAgICAgICB3aW5kb3dbJ1VzZXInXSA9IFVzZXI7XG4gICAgICAgIH0iXX0=