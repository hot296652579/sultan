

const { ccclass, property } = cc._decorator;

@ccclass
class _User {

    //登录user信息
    _userName = null; // 玩家昵称
    _userID = null; // 玩家ID
    _sex = 0; //玩家的性别，值为1时是男性，值为2时是女性，值为0时是未知
    _gold = 0; // 金币
    _token = null; //token
    _diamonds = 0; //玩家钻石
    _headImgUrl = ""; //头像
    _inviterId = 0; //邀请人
    _phone = ""; //手机
    _areaCode = "";//区号
    _points = 0; //积分
    _role = 0; //玩家角色 0 = 普通 1 = 代理
    _promoteUrl = ""; //推广链接
    _shareImgUrl = ""; //分享链接
    _needSetPassword = 0;// 等于1 需要设置密码
    _signature = "";//个性签名

    //大厅user信息
    _bankList = [] //银行账号
    _bank = 0; // 保险柜
    _vipLevel = 0; //vip等级
    _goldType = -1;// 0=真金玩家 1=非真金玩家
    
    // 是否是充值过的 真金玩家
    public get isRechargedPlayer() {
        return this._goldType == 0;
    }

    //是否开启好友场
    public _friendRoomSwitch:boolean = null;

    // 是否设置二级密码
    public piggyBank: boolean = null;
    // 服务器时间戳
    public timestamp: number = 0;

    /**@description 已经新手引导的游戏id */
    public _gameIds = [];

    /**@description 弹窗队列 防止与新手引导重叠*/
    public _popWindows = [];
    // 是否游戏中
    _isGameing: boolean = false;

    //是否充值
    _recharge = 0;//是否充过值 0未充值 1冲过值

    _firstpay : boolean = false; 

    resetData = function () {
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
    }
    /**
     * 更新玩家数据
     */
    updateUserData = function (data) {
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
        this._areaCode = data.areaCode
        this._gameIds = data.gameIds

    }


}
export const User = new _User();

      

        if (CC_PREVIEW) {
            window['User'] = User;
        }