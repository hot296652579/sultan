
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageHI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e955NmCjtPb55zQ9XDnB4l', 'LanguageHI');
// script/common/language/LanguageHI.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageHI = void 0;
cc.sys.LANGUAGE_HINDI = "hi";
exports.LanguageHI = {
    language: cc.sys.LANGUAGE_HINDI,
    /**
    * 标题显示
    */
    TITLE: {
        HOTTESTGAME: "Hottes Game",
        LATESTBET: "Latest Bet",
        BIGGESTWINNER: "Biggest Winner",
        LABGAME: 'Permainan',
        LABPLAYER: 'Pemain',
        LABBETAMOUNT: 'Jumlah Taruhan',
        LABDAILY: 'Daily',
        LABWEEKLY: 'Weekly',
        LABALL: 'All'
    },
    BET_TITLE: {
        LATESTBET: "Latest Bet",
        GAMES: "Permainan",
        PLAYER: "Pemain",
        BETAMOUNT: "Jumlah Taruhan",
    },
    BIGGESTWINNER: {
        BIGGESTWINNER: "Biggest Winner",
        DAILY: "Daily",
        WEEKLY: "Weekly",
        ALL: "All",
    },
    AKUN_TITLE: {
        PROFILE: "Profile",
        RANKING: "Ranking",
        GAMES: "Games",
        INTEGRATION: "Integration",
        USED: "Used",
        REFERENCE: "Reference",
        ARRANGE: "Arrange",
        EMAIL_VERIFICATION: "Verifikasl Email",
        PHONE_VERIFICATION: "Verifikasl Telepon",
        SECURITY_SETTING: "Security Settings",
        CHANGE_PASSWORD: "MengubahKatesandi",
        PRIVACY_SETTING: "PengaturanPrivasl",
        LANGUAGE: "Bahasa",
        ABOUT: "Tentang",
        FAQ: "FAQ",
        CONTACT_US: "HubungiKaml",
    },
    MISSION: {
        RECEIVEDSUCCESS: "Received successfully!"
    },
    //   hall_view_broadcast_content: '[broadcast] congratulations!',
    //   hall_view_nogame_notice: '【{0}】developing!!!',
    //   test: " test : {0}-->{1}-->{2}-->{3}-->",
    WAIT: {
        /**@description  网络断开正在重新连接...*/
        DISCONNECT: "Network disconnected, reconnecting now...",
        /**@description  正在进入游戏,请稍后...*/
        ENTERGAMEWAIT: "Entering game, please hold...",
        /**@description  网络请求失败,请重试！*/
        NETERROR: "Network request failed, please retry！",
        /**@description  连接服务器...*/
        CONNECTSERVER: "Connecting to the server...",
        /**@description  身份认证*/
        WAGEWAY: "identity authentication...",
        /**@description  登录中*/
        LOGIN: "Login...",
        /**@description  加载中*/
        LOADING: "Loading...",
        /**@description  加载中*/
        UPLOADING: "Uploading...",
    },
    //   /**
    //    * 通用错误码
    //    */
    //   ERRORSTATUS: {
    //     /**@description  当前携带金币不足，请选择较低房间或及时补充金币*/
    //     "702": "Currently carrying insufficient gold coins",
    //   },
    /**
    * 注册提示
    */
    REGISTER: {
        /**@description  暂无绑定邮箱!*/
        NOBOUDMAIL: "No bound mailbox!",
        /**@description  邮箱格式不正确!*/
        EMAILWRONG: "The mailbox format is incorrect!",
        /**@description  邮箱和手机号不能为空!*/
        EMAILINFORMATIONEMPTY: "Please fill in the email or telephone!",
        /**@description  验证码信息不能为空!*/
        CODEINFORMATIONEMPTY: "Please fill in the verification code!",
        /**@description  已发送请注意查收!*/
        PLEASECHECK: "Sent, please check!",
        /**@description  手机格式不正确!*/
        PHONEWRONG: "Incorrect mobile phone format!",
        /**@description  密码长度不能小于8位!*/
        PASSWORD8: "Password length cannot be less than 8!",
        /**@description  密码包含大小写字母和数字!*/
        MUST_INCLUDE_CASE_NUMBER: "Passwords must contain upper and lower case letters and numbers",
        /**@description  注册成功!*/
        REGISTERSUCCESS: "Registration successful, Good Luck!",
        /**@description  修改密码成功!*/
        CHANGEPASSWORDSUCCESS: "ChangePassword successful!",
        /**@description  修改头像成功!*/
        CHANGEAVATARSUCCESS: "ChangeAvatar successful!",
        /**@description  绑定成功!*/
        BINDSUCCESS: "Bound successful!",
    },
    /**
     * 提示TIPS
     */
    TIPS: {
        /**@description  没有绑定的邮箱!*/
        NOTBINDEMAIL: "No bound mailbox!",
        /**@description  复制失败!*/
        GAMEDOWNLOADCOPYERROR: "Failed to copy!",
        /**@description  网络等待超时!*/
        NETWAITTIMEOUT: "Net-work time-out!",
        /**@description  暂未开启，尽请期待!*/
        NOTOPENPLEASEWAIT: "Not yet open, please wait!",
        /**@description  分享成功!*/
        SHARESUCCESS: "Share Success",
        /**@description  分享失败!*/
        SHAREFAILED: "Share Failed",
        /**@description  充值成功!*/
        RECHARGESUCCESS: "Recharge Success",
        /**@description  请输入充值金额或选择商品!*/
        ENTERRECHARGE: "Please enter the recharge amount or select the product",
        /**@description  提现成功!*/
        WITHDRAWSUCCESS: "Withdraw Success",
        /**@description  绑定银行成功!*/
        BINDBANKSUCCESS: "BindBank Success",
        /**@description  请填写完整银行绑定信息!*/
        BANDBANKINFOFAIL: "Please complete the bank binding information",
        /**@description  获得七天奖励!*/
        SEVENSIGNINSUCCESS: "Congratulations on getting the seven day sign in reward",
        /**@description  获得三十天天奖励!*/
        THIRTYSIGNINSUCCESS: "Congratulations on getting the 30 day sign in reward",
        /**@description  签到成功!*/
        SIGNINSUCCESS: "Sign Success",
        /**@description  已发送请注意查收!*/
        SENDCHECK: "Sent, please check",
        /**@description  请选择银行!*/
        SELECTBANk: "Please select a bank first",
        /**@description  退出游戏!*/
        QUITGAME: "Are you sure you want to quit the game ?",
        /**@description  强制更新!*/
        VERSIONUPDATE: "Current version does not match and need download game pack!",
        /**@description  更新!*/
        UPDATE: "Update",
        /**@description  当前正处于其他游戏中!*/
        CHECKJOINGAME: "You are in the hosting of {0} Game, temporarily unable to enter other games",
        /**@description  下载更新失败!*/
        DOWNLOADFAILED: "Network is not good. Please change the network environment!",
        /**@description  下载更新成功!*/
        DOWNLOADSUCCEED: "Download update succeeded!",
        /**@description  游戏有新版本，是否重启更新？*/
        GAMENEWVERSION: "There is a new version of the game. Do you want to restart it?",
        /**断线重连提示 */
        RETRY: "Retry",
        /**历史记录提示 */
        historyTip: "Only keep the last seven days of history",
        BetID: "Bet ID",
        Time: "Time",
        BetAmount: "Bet Amount",
        Odds: "Odds",
        Profit: "Profit",
        Multiple: "Multiple",
        Typeofbet: "Type of bet",
        WinorLost: "Win or Lost",
        SettlementAmount: "Settlement Amount",
        /**@description  金币不足!*/
        noGoldEnterRoom: "You don’t have enough chips. A minimum of {0} chips is required to enter the room. Do you want to recharge now?",
        /**@description  捕鱼长期未游戏 踢出房间 */
        removedRoom: "You have not fired for more than 1 minute and are removed from the room",
    },
    /**
     * 错误提示
     */
    ERRORTIPS: {
        /**@description  请求已发送*/
        REQSEND: "Aapplication has sent",
        /**@description  请求已发送,请注意查收短信*/
        REQSENDCHECKMESSAGE: "Application sent already, please note the messages",
        /**@description  发送验证码间隔过短*/
        CODETIMESHORT: "The interval of sending OTPs is too short",
        /**@description  非法操作*/
        FEIFACAOZUO: "Illegal operation",
        /**@description  金币不足*/
        GOLDFEW: "Inadequate coins",
        /**@description  加注金额不合法*/
        ADDGOLDFEIFA: "Bet amount is illegal",
        /**@description  玩家已弃牌*/
        QIPAI: "Player folded",
        /**@description  非准备状态*/
        NOTREADYSTATE: "Non-prepare status",
        /**@description  操作太过频繁,请等待%s秒再试*/
        CAOZUOTOFAST: "Actions too oftenm, please wait for %s retry",
        /**@description  服务器请求超时*/
        SERVERTIMEOUT: "Server request time-out!",
        /**@description  获 取*/
        HUOQU: "Obtain",
        /**@description  通知被顶号*/
        TOPACCOUNT: "Your account is logged in on another device, If you did not do it yourself, please change the password in time",
        /**@description  游客需要先绑定手机号*/
        GUESTBINDERROR: "Guest need to bind mobile phone number first",
        /**@description  房间列表不存在*/
        ROOMLISTERROR: "Room list does not exist",
    },
    /**
     * 代理
     */
    AGENT: {
        INPUT_PARENT_ID: "Promoter ID",
        PARENT_ID_LENGTH_ERROR: "Wrong superior agent ID",
        BIND_SUCCEED: "Bind successfully",
        DATA_EMPTY: "Empty data",
        CHECKING: "Review",
        PASS: "Pass",
        REJECTED: "Not Pass",
        WITHDRAW_NUM_ERR: "Incorrect receive amount",
        APPLY_WITHDRAW: "Has applied for receive",
        AGENTPOT: "Agent Pot",
    },
    /**
     * 推广
     */
    PROMOTION: {
        LABELA: "User",
        LABELB: "Member linked to User",
        LABELC: "Member linked to B",
        LABELD: "Member linked to C",
        BOUNSCALCULATION: "=Sevice Fee by B x Level 1 Ratio+Sevice Fee by C x Level 2 Ratio+Sevice Fee by D x Level 3 Ratio",
        CONNECTLABEL: "Enter your promoter ID",
        EXCLUSIVELINK: "individual link：",
        EXCLUSIVELINK2: "individual link",
        SHARETO: "Share to：",
        TOTALBONUS: "Total Bonus",
        AVAILABEL: "Availabel Bonus",
        BONUS: "Bonus",
        RATIO: "Ratio",
        DTRAILSNODE: {
            TIP1: "All Turnover:",
            TIP2: "All Rebate:",
            TIP3: "The total number of:",
            TIP4: "Only show the details of 1 week",
            TITLE1: "Name",
            TITLE2: "ID",
            TITLE3: "Type",
            TITLE4: "Turnover",
            TITLE5: "Rebate",
            NEARLYAWEEK: "Nearly a week",
            ALLTYPE: "All Types",
        },
        ACCOUNTDETAILSORRECORDNODE: {
            LEVEL_TITLE1: "Invitation Time",
            LEVEL_TITLE2: "Name",
            LEVEL_TITLE3: "ID",
            LEVEL_TITLE4: "NO.offline",
            LEVEL_TITLE5: "Total Bonus",
            NOD_TITLE1: "Number",
            NOD_TITLE2: "Time",
            NOD_TITLE3: "Amount",
            NOD_TITLE4: "Overage",
        }
    },
    /**
    * 网络错误代码
    */
    ERRORCODE: {
        /**@description  服务器版本校验,失败请重试*/
        VERSIONCHECK: "Serverversion examine, failed please retry",
        /**@description  服务器网络已经断开连接,请重试!!!*/
        NETCLOSE: "The network is disconnected. Please check the network",
        /**@description 游戏服务器开发人员请检查*/
        PLEASECHECK: "Game server developer please check",
        /**@description  服务器请求失败，请重试status:*/
        SERVERERROR: "Server request failed, please retry",
        /**@description 服务器请求超时，请重试!*/
        SERVERTIMEOUT: "Server request timeout，please retry!",
        /**@description  获取游戏列表失败请重试*/
        GAMELISTERROR: "Failed to get the game list please try again",
        /**@description  服务器请求返回数据错误status*/
        DATAERROR: "Server request returned data error,status:",
        /**@description  网络断开连接，请重新登录*/
        E20010001: "Network disconnected, please login again！",
        /**@description  登录失败*/
        E10020007: "Failed to login",
        11: "Login timeout, please try again later...",
        12: "The current room is not open....",
        13: "Password reset failed, please try again later!",
        14: "The parameter is wrong",
        15: "Too many new users have registered, please try again later!",
        104: "This session is not open yet!",
        107: "The player does not exist!",
        110: "The player login has expired, please log in again",
        111: "The player is not registered",
        114: "There is already someone at this location",
        120: "Your account is logged in elsewhere, you are forced to go offline",
        122: "The room has been disbanded...",
        145: "This account is forbidden to log in",
        146: "The player is not logged in!",
        149: "The server has been maintained Please follow the official news for the duration",
        170: "Friend room is not opened",
        174: "The game has started!",
        175: "The number of people who can start is not reached",
        176: "Mobile phone number has been registered",
        227: "The room does not exist or has been disbanded!",
        229: "In the game!",
        231: "This phone number is not registered",
        232: "Incorrect verification code",
        233: "You have signed in today, please do not sign in again",
        235: "Can't add yourself as a friend",
        237: "There is a problem with the amount you entered, please re-enter",
        240: "The player is not in the room",
        241: "The room does not exist or has been disbanded!",
        242: "Your chips are overmuch",
        243: "Your chips are insufficient",
        244: "You are in the game, please wait to log out after this round is over",
        245: "Failed to stand up, the player has not yet sat down",
        249: "Cannot bet now",
        251: "Your account balance is insufficient",
        254: "The amount you entered exceeds the safe deposit box assets",
        257: "The player status is wrong",
        264: "The betting limit has been reached",
        272: "Cannot find a suitable room, please try again later",
        276: "You can stand up after you fold",
        279: "Your balance does not match, please log in again and then operate",
        280: "The phone number has been bound, please do not bind it again!",
        297: "The operation failed",
        308: "Please enter password",
        309: "Your old password is wrong, please re-enter！",
        337: "Too many registered users under the same ip!",
        352: "Current seat is full",
        354: "At least 2 people can start the game.",
        357: "This Facebook account has been bound, please do not bind it again!",
        358: "The amount of withdrawal does not meet the requirements!",
        359: "The bank card currently bound does not open the withdrawal function!",
        360: "Each user can bind up to 3 banks‘ information!",
        361: "The bank information that needs to be updated does not exist!",
        362: "Incorrect verification code",
        363: "The mail has been read!",
        364: "The record does not exist!",
        365: "The record status of the player piggy bank is incorrect and cannot be operated!",
        366: "The player's piggy bank already has a profit and cannot be cancelled!",
        367: "The player failed to cancel the piggy bank operation!",
        368: "The player failed to transfer to the piggy bank!",
        369: "The player failed to transfer out of the piggy bank!",
        370: "The player piggy bank has no income and cannot be transferred out!",
        371: "Configuration does not exist, saving failed!",
        372: "The player's account balance is insufficient and the deposit failed!",
        373: "Your deposit limit is insufficient, please re-enter!",
        374: "Deposit failed, deposit too few gold coins!",
        375: "The input password is wrong, the transfer failed!",
        378: "Gold shortage",
        379: "Account not registered",
        380: "Account and password do not match！",
        385: "The bank account been used!",
        386: "Bank config info error!",
        387: "Bank info save error!",
        388: "The number of friends of the other party has reached the upper limit",
        389: "The record has expired, try refreshing",
        390: "Cannot bet repeatedly",
        //转盘
        /**@description  活动未开启*/
        392: "Activity not open",
        /**@description  领取失败，请联系客服*/
        393: "Failed to receive, please contact customer service",
        /**@description  玩家未签到*/
        395: "Player not checked in",
        /**@description  剩余可玩次数不够*/
        396: "There is no number of draws available",
        /**@description  未配置活动物品*/
        397: "No active items configured",
        /**@description  操作失败，请再试一次*/
        398: "Operation failed, please try again",
        /**@description  奖品库存不足，请联系客服*/
        400: "Insufficient stock, please contact customer service",
        440: "This player is already your friend",
        441: "Already applied",
        442: "You have reached the maximum number of friends",
        443: "The other party is not allowed to add friends",
        /**@description  超过首充次数*/
        466: "More than the number of frist pay",
        //  梦幻体育新加的----------
        470: "Login Failed",
        471: "Failed to obtain user information",
        472: "Please set the secondary password first",
        473: "Currency Exchange Failed",
        474: "The input currency is below the minimum limit",
        475: "Failed to obtain the history",
        476: "Access timeout",
        477: "Amount exceeds limit",
        478: "The number of transfers exceeds the limit",
        479: "The transfer amount exceeds the limit",
        480: "BTI SPORTS Login Failed, please retry",
        481: "BTI SPORTS Transfer in Failed, please retry",
        482: "BTI SPORTS Transfer out Failed, please retry",
        // 不属于该场次
        490: "Please wait, the game is preparing.",
        // 金币场未开启
        491: "Gold coin field is closed，please log in again.",
        // ----------------------
        500: "The connection is abnormal, please try again later...",
        505: "Wrong bet chips",
        530: "Login switch is not turned on",
        531: "The recharge switch is not turned on",
        532: "The withdrawal switch is not turned on",
        533: "Game switch is not turned on",
        //排行榜
        610: "leaderboard is not enabled",
        611: "there is no reward to receive",
        612: "reward received",
        613: "rule configuration error, please contact customer service",
        //锦标赛
        620: "The tournament has been disbanded",
        621: "the game has begun",
        622: "already signed up",
        623: "the number of people is full",
        624: "not registered",
        625: "full or started",
        626: "the game is over",
        627: "failed to close the game",
        628: "Failed to create the game, exceeding the maximum limit of creating the game on the day",
        629: "Game started or ended or not found",
        5001: "Has a superior and cannot be bound",
        5002: "Do not allow loop binding",
        5003: "User does not exist",
        5004: "Not allowed to bind yourself",
        5005: "Insufficient balance to withdraw",
        5006: "Only query data within seven days",
        701: "Illegal operation",
        702: "Currently carrying insufficient gold coins",
        /**@description  筹码不足*/
        704: "Gold Shortage",
    },
    //   /**
    //    * 设置
    //    */
    //   SETTING: {
    //     TITTLE: "Settings",
    //     MUSIC: "Music",
    //     EFFECT: "Effect",
    //     OPEN: "On",
    //     CLOSE: "Off",
    //     CHANGEID: "Switch account",
    //     NOWID: "Current account: ",
    //     VERSION: "Version No: ",
    //     RESETGUIDTIP: "After resetting, enter the game again and enter the novice training. Do you want to reset?",
    //     RESETGUIDTIPSUCC: "Reset successfully",
    //     LANGUAGE: "English",
    //   },
    //   /**
    //   * 签到
    //   */
    //   SIGNIN: {
    //     FREE: "Free",
    //     DAY: "DAY{0}",
    //     SIGNINSUCCESS: "Sign in successfully",
    //     SIGNINFAIL: "Sign in fail",
    //     ALREADYSIGNIN: "Already signed",
    //     NOTSIGNIN: "Come back tomorrow",
    //     TITLE: "Daliy Bonus",
    //     RESET: "Reset every seven days",
    //     REFRESH: "Refresh at 24:00 daily",
    //     CLICK: "Click the button above to collect!",
    //     TODAY: "Today",
    //   },
    //   /**
    //    * 绑定
    //    */
    //   BIND: {
    //     TITTLE: "Bind phone",
    //     PHONE: "Mobile number: ",
    //     CODE: "OTP: ",
    //     NEW: "New Password: ",
    //     CHECK: "Re-enter Password: ",
    //     INPUTPHONE: "Phone Number",
    //     INPUTCODE: "Please enter the verification code",
    //     CODELEN: "The length of the verification code is 6 characters",
    //     INPUTRECEIVERNAME: "Please enter the name of the receiver",
    //     INPUTACCOUNT: "Please enter the bank account number",
    //     INPUTIFSC: "Please enter the bank IFSC code",
    //     INPUTIFSCWRONG: "The IFSC bank code you entered is wrong!",
    //     INPUTAMOUNT: "Please enter the withdrawal amount",
    //     NOSELECTBANK: "No bank selected",
    //     INPUTNEW: "6 characters",
    //     INPUTCHECK: "Please be consistent",
    //     SEND: "Send",
    //     CONFIRM: "Confirm",
    //     BINDSUCCESS: "Setup succeeded",
    //     CHANGESUCCESS: "Modification succeeded",
    //   },
    //   /**
    //    * 个人信息
    //    */
    //   USERINFO: {
    //     UNBOUND: "Unbound",
    //     NAMECHANESUCCESS: "Nickname modified successfully",
    //     HEADCHANESUCCESS: "Head modified successfully",
    //     NOBINDPHONE: "Need to bind phone account",
    //     ADDFRIEND: "Invitation sent successfully",
    //     ENTERNAME_ERROR: "Please enter nickname! ",
    //     NICKNAME: "NickName",
    //     SIGNATURE: "Signature"
    //   },
    //   /**
    //    * 邮件
    //    */
    //   EMAIL: {
    //     DEARPLAYER: "Dear player：",
    //     NONEWS: "No news",
    //   },
    //   /**
    //    * 银行
    //    */
    //   BANK: {
    //     AMOUNTERROR1: "Please input amount！",
    //     AMOUNTERROR2: "Transfer in / out amount cannot be 0!",
    //     AMOUNTERROR3: "Insufficient carrying amount, please recharge!",
    //     AMOUNTERROR4: "Insufficient bank balance, please try again!",
    //     OPERATESUCCESS: "The operation was successful",
    //     //
    //     DEPOSIT_AMOUNT: "Deposit Amount:",
    //     ENTER_AMOUNT: "Enter Amount",
    //     BANK: "Bank:",
    //     CARRIED: "Carried:",
    //     TAKEOUTAMOUNT: "Take Out Amount:",
    //   },
    //   /**
    //    * 充值
    //    */
    //   RECHARGE: {
    //     NOGOODS: "Product information not obtained!",
    //     WaitingPay: "Waiting for payment",
    //     PaySuccess: 'Success',
    //     PayFailed: 'Failed',
    //     Time: "Time",
    //     Commodity: "Commodity",
    //     Amount: "Amount",
    //     State: "State"
    //   },
    //   /**
    //    * 提现
    //    */
    //   WITHDRAWAL: {
    //     UNBOUNDBANK: "Unbound bank account number",
    //     RATE: "Fee rate：{0}%",
    //     RATELimited: "Fee rate： Limited free",
    //     Limitedfree: "Limited free",
    //     MINAMOUNT: "Min/Max-Amount：",
    //     INPUTMINAMOUNT: "Less than the minimum withdrawal amount",
    //     IWB: "Insufficient account balance",
    //     IWBBET: "Insufficient bet amount",
    //     NOBINDPHONE: "Mobile phone number not bound",
    //     SUCCESS: "Withdrawal application submitted successfully",
    //     WITHDRAWALAMOUNT: "Withdrawal Amount",
    //     WithdrawalStatus: {
    //       "0": "Waiting for processing",
    //       "100": "Approved",
    //       "200": "Drawing",
    //       "300": "Withdrawal successful",
    //       "-100": "Audit failure",
    //       "-300": "Withdrawal failed",
    //       "309": "Incorrect secondary password",
    //     },
    //     GOTOBINDPHONE: "Go-to-bind-phone",
    //     NOBINDPHONETIP: "For the safety of your funds,please bind your mobile number first",
    //     ADDBANKCARD: "+ Add bank card",
    //     SELECTBANK: "Select Bank",
    //     BANKNUMBER: "Bank account number",
    //     RECEIVERNAME: "Receiver Name",
    //     IFSCCODE: "Enter the bank IFSC code",
    //     ERROR: {
    //       EMPTY_PWD: "Please enter secondary password"
    //     },
    //     SECONDARYPASSWORD: "Secondary Password"
    //   },
    //   /**
    //    * 存钱罐
    //    */
    //   PIGGY_BANK: {
    //     // 密码不一致
    //     INCONSISTENT_PASSWORD: "Inconsistent password",
    //     // 密码不全
    //     PASSWORD_INCOMPLETE: "Your password is incomplete",
    //     // 旧密码和新密码一致
    //     OLD_NEW_PASSWD_SAME: "Your new password is the same as your old password, please re-enter.",
    //     // 新密码不一致
    //     NEW_PASSWD_DIFF: "The new password and the confirmed password are inconsistent, please re-enter.",
    //     // 修改密码成功
    //     CHANGE_SUCCESS: "Successfully modified.",
    //     // 密码为空，请输入密码
    //     PLEASE_ENTER_PASSWORD: "Please enter password",
    //     // 请输入转入金额
    //     PLEASE_ENTER_THE_AMOUNT: "Please enter the amount",
    //     // 存入失败
    //     DEPOSIT_FAILURE: "Deposit failure, Please enter the correct amount !",
    //     // 额度不足
    //     DEPOSIT_LIMIT: "Your deposit limit is insufficient, please re-enter.",
    //     // 存入成功
    //     DEPOSITED_SUCCESSFULLY: "Deposited successfully.",
    //     // 取消成功
    //     CANCEL_SUCCESS: "Cancel success",
    //     // 最大存款额度不足
    //     INSUFFICIENT_MAXIMUM: "Insufficient maximum transfer amount",
    //     // 输入不能大于最大额度
    //     INSUFFICIENT_DEPOSIT_AMOUNT: "Insufficient deposit amount",
    //     // 必须输入 6 位数字
    //     MUST_6_DIGITS: "Password must be 6 digits",
    //     //全部
    //     ALL: "ALL",
    //     TOTAL_INCOME: "Total Income",
    //     RATE: "Rate",
    //     COMFIRMED_AMOUNT: "Confirmed \namount",
    //     YESTERDAY_INCOME: "Yesterday's \nincome",
    //     MAXIMUN_TRANSFER_AMIUNT: "Maximum transfer amount:",
    //     TEANSFER_IN: "Transfer In:",
    //     MINIMUM_SIGLE: "Minimum single investment amount:",
    //     PROFIT: "Profit",
    //     PLEASE_ENTER: "Please enter",
    //     //PBDepositReceiptView
    //     TIME: "Time",
    //     OPERATION_AMOUNT: "Operation\nAmount",
    //     INTERESRATE: "Interest\nRate",
    //     EXPECTEDRETURN: "Expected\nReturn",
    //     TIMELEFT: "Time\nLeft",
    //     OPERATE: "Operate",
    //     //PBDepositReceiptItemNode
    //     CANCELED: "Canceled",
    //     TRANSFERREDOUT: "Transferred out",
    //   },
    //   /**
    //    * 排行榜
    //    */
    //   RANK: {
    //     MYRANK: "My Rank",
    //     Receive: "Congratulations on getting the {0} chip reward",
    //   },
    //   /**
    //  * 分享
    //  */
    //   SHARE: {
    //     EXCLUSIVELINK: "individual link：",
    //     SHARETO: "Share to：",
    //   },
    //   /**
    //    * 好友
    //    */
    //   FRIEND: {
    //     INFORMATION: "INFORMATION",
    //     DELETEFRIEND: "Are you sure you want to delete friends {0}?",
    //     INVITEFRIEND: " invites you to play {0}?",
    //     ENTERROOM: "{0} enter the room",
    //     INVITATIONSEND: "Invitation sent",
    //     ALREADYINROOM: "The player is already in the room",
    //     ONLINE: "Online",
    //     OFFONE: "Offine",
    //     FRIEND: "Friend",
    //     ALREADY_APPLIED: "Already applied",
    //     HAVE_BECOME_FRIEND: "Have become friends",
    //     FAILL_TO_FRIENDS: "Fail to be friends\n{0}",
    //     HAVE_BECOME_FRIENDS: "Have become friends\n{0}",
    //     WANT_BE_FRIEND: "Want be your friend\n{0}",
    //     NO_RESULT: 'No result',
    //     NO_CONTAST: 'No contacts can be added',
    //     NO_FRIEND: 'No friend',
    //     NO_NEWS: 'No news',
    //     ALLOW_ADD_FRIEND: "Allow to add me as a friend",
    //     ALLOW_INVITE_TOGAME: "Allow to invite me to play games",
    //     ENTER_USERID: "Enter user ID",
    //     CONTASTFAILED: "Failed to obtain device permissions",
    //     CONTINUS_GAME: "Your previous game was not completed. Whether to enter the previous game to continue?",
    //     USERID_ERR: 'User ID is error,please retry',
    //   },
    //   /**
    //  * 账号登录 
    //  */
    //   ACCOUNT_LOGIN: {
    //     // 占位符
    //     PALCE_HOLDER: {
    //       // 验证码
    //       VER_CODE: "verification code",
    //       PASSWORD: "password",
    //       PASSWORD_CONFIRM: "confirm password",
    //       PHONE: 'phone',
    //     },
    //     // 错误提示
    //     ERROR: {
    //       // 手机号无效、错误
    //       PHONE_NUM: "Phone number error",
    //       // 验证码无效
    //       VER_CODE: "Incorrect verification code",
    //       // 两次密码不一致 disaccord
    //       TWO_PWD_DISACCORD: "Enter the password twice inconsistent",
    //       // 账号未注册
    //       ACC_NO_REGISTER: "Account not registered",
    //       EMPTY_PWD: "Please enter password",
    //     },
    //     SUCCEEDED: "Succeeded",
    //     // 发送验证码到。。。
    //     SEND_CODE_TO_PHONE: "Verifcation SMS will be sent to"
    //   },
    //   ROOMLIST: {
    //     RUMMY: {
    //       ENTRYAMOUNT: "Entry Amount",
    //       PERPOINT: "Per Point",
    //     },
    //     TEENPATTI: {
    //       BOTTOMLINE: "Bottom Line",
    //       ENTRYAMOUNT: "Entry Amount",
    //     },
    //     DZPK: {
    //       SB_BB: "SB/BB",
    //       BUY_IN_RANGE: "Buy-in Range",
    //     },
    //   },
    //   GUIDE: {
    //     continue: "Click to continue",
    //     tip1: "Welcome to the National Game! I will explain to you the basic functions of the game. Please click anywhere on the screen to enter the next step.",
    //     tip2: "Here you can modify your game nickname and profile picture. You can also check your personal information.",
    //     tip3: "Here is your individual. Invite friends to download, you will get rebates!",
    //     tip4: "You can check the friends you invited, and get your invitation rebate!",
    //     tip5: "You can buy chips here!",
    //     tip6: "Come and experience the game!",
    //   }
    //   MSG_BOX: {
    //     tips: "TIPS",
    //     Confirm: "Confirm",
    //     Cancel: "Cancel"
    //   },
    //   //  体验场多货币相关语言包
    //   EXPERIENCE_FIELD: {
    //     // 提示筹码数量
    //     hintChipCount: "Here is your chip count，recharge to get chips",
    //     // 提示充值
    //     hintRecharge: "You have no chips,recharge to get chips",
    //     NoGold: "You have no chips",
    //     // 禁止提现
    //     CannotWithdraw: "You can withdraw cash after any recharge",
    //     // 赠送金币
    //     GiveGold: "Give you {0} gold coins, please keep up. ",
    //     // 剩余次数
    //     residueCount: " ({0} remaining)",
    //     // 关闭金币场通知
    //     closeGoldFieldNote: "The gold coin market has been closed and will enter the real gold market after the end of the game.",
    //     // 即将进入真金场通知
    //     enterRealField: ` Click OK to enter the real gold field! \r\nNow start our journey of rich growth!`,
    //   },
    //   //好友房
    //   FRIENDROOM: {
    //     DisbandRoom: "Disband the Room",
    //     //自己点击解散房间提示
    //     DisbandRoomDesc1: "The game has not started, do you want to disband the room?",
    //     //解散房间后其他玩家提示
    //     DisbandRoomDesc2: "The room has been disbanded, please click Confirm to exit.",
    //     //房间到了自动解散
    //     DisbandRoomDesc3: "The room timeout has not started and has been disbanded.",
    //     //观战玩家踢出
    //     DisbandRoomDesc4: "Watching the game is not allowed in this room, you have left the room.",
    //     //被踢出房间
    //     KIKEROOM: "You have just been kicked out of the private room.",
    //     //踢出房间
    //     KIKEROOM2: 'Are you sure to kick {0} out of the private room?',
    //     //主动退出房间
    //     ExitRoom: "Exit the Room",
    //     ExitRoomDesc: "The game is about to start. Do you want to exit the private room?",
    //     ExitRoomDesc2: "Do you want to exit the room? After exiting the room, your clockwise player will become the new homeowner.",
    //     ToRecharge: "You don’t have enough chips. Do you want to recharge now?",
    //     JoinRoomError: "Room code enter error",
    //     CopyRoomInfoSuccess: " Copy successfully! Send it to your friends!",
    //   },
    //   TURN_TABLE: {
    //     AddressSuccess: "The address is filled in successfully, please wait patiently for the prize to be issued!"
    //   },
    //   /**
    //    * 福利中心
    //    */
    //   WelfareCenter: {
    //     noTip: "No Activity"
    //   },
    //   Tournament: {
    //     CloseTournament: "Are you sure to close this tournament? The paid fee will be refunded after deletion.",
    //     NoticeTournamentText: "<color=#FEDFE5>The competition you signed up for will start in </c><color=#FFE53A><size = 30> {0} </size></color><color=#FEDFE5>seconds.\nIf you do not participate, it is considered a waiver! </c>",
    //     LeaveTournament: "Do you give up the game? No rewards will be obtained after giving up!",
    //     NotOpen: "Not open yet, please wait patiently.",
    //     SelectGame: "Please select a game",
    //     EnterCorrectPassword: "Please enter the correct password",
    //     NotTournament: "Tournament does not exist.",
    //     SignSuccessfully: "Sign up successfully",
    //     Incomplete: "Incomplete data, please continue to fill in",
    //     MyTournamentTip1: "about to start",
    //     MyTournamentTip2: "in progress",
    //     MyTournamentTip3: "it has ended",
    //     MyTournamentTip4: "Closed",
    //     MyTournamentTip5: "Disbanded due to insufficient numbers",
    //     MyTournamentTip6: "Abandoned the tournament",
    //     MyTournamentPeople: "Start after {0} people",
    //     passwordWong: "wrong Password",
    //     AmountWong: "wrong Amount",
    //     Closed: "This tournament {0} has been disbanded by its creator",
    //     TournamentOver: "The number of participants is insufficient and the tournament is over. The chips you paid will be returned.",
    //   },
    // ------------------------------------ 以上是整个包修改完直接删除掉 ---------------------------------------------------
    PageName: {
        // Crash 游戏页
        LoremIpsum: "Lorem Ipsum",
    },
    Waiting: {
        // 正在进入游戏,请稍后...
        EnterGame: "Entering game, please hold...",
    },
    Tips: {
        // 登录账号
        SilakanMasuk: "Silakan Masuk",
        // 游戏加载中，请在完成后再次尝试
        GameIsLoading: "The game is loading, please try again when finished",
        // 请输入下注金额
        InputBetGold: "Masukkan Jumlah Taruhan {0}-{1}",
        // 复制成功
        CopySuccess: "Salin berhasil",
        // 今日任务奖励已领取
        BonusAlreadyReceived: "Hadiah misi hari ini telah diterima",
        // 请绑定邮箱
        PleaseBindYourEmail: "Tolong ikat email Anda",
        // 完成任意一局游戏即可领取
        CompleteAnyGameToGetIt: "Selesaikan game apa saja untuk mendapatkannya",
    },
    ErrCode: {
        //登录错误
        300002: "kesalahan masuk",
        //重复调用
        300003: "panggilan berulang",
        //登录被阻止
        300004: "Login diblokir",
        //进入游戏失败
        300005: "Gagal memasuki permainan",
        //账号数据异常
        300006: "Data akun tidak normal",
        //账号数据状态异常
        300007: "Status data akun tidak normal",
        //游戏没有登录
        300008: "Game tidak masuk",
        //需要重新进入
        300009: "perlu masuk kembali",
        //当前状态不能下注
        300010: "Keadaan saat ini tidak bisa bertaruh",
        //下注金币错误
        300011: "koin taruhan salah",
        // 添加订阅失败
        300012: "Gagal menambahkan langganan",
        // Crash自动押注限压
        300013: "Batas tekanan taruhan otomatis crash",
        // 下注次数限制
        300014: "batas taruhan",
        // 不允许添加自动下注
        300015: "Menambahkan taruhan otomatis tidak diperbolehkan",
        // Crash自动下注止损
        300016: "Crash secara otomatis bertaruh stop loss",
        // Crash自动下注止盈
        300017: "Crash otomatis bertaruh take profit",
        // Crash自动下注完成
        300018: "Taruhan crash otomatis selesai",
        // Crash取消下注失败，不存在
        300019: "Kecelakaan unbet gagal, tidak ada",
        // 重复添加订阅
        300020: "Ulangi untuk menambahkan langganan",
        // 获取hash记录参数错误
        300021: "Dapatkan kesalahan parameter catatan hash",
        // 获取hash记录不存在
        300022: "Dapatkan catatan hash tidak ada",
        // 无效的Token
        300023: "Token Tidak Valid",
        // 登出失败
        300024: "Logout gagal",
        // 余额不足
        300025: "Saldo tidak mencukupi",
        // 充值失败
        300026: "Isi ulang gagal",
        // 提现失败
        300027: "Penarikan gagal",
        // 获取银行卡列表失败
        300028: "Gagal mendapatkan daftar kartu bank",
        // 签到失败
        300029: "Gagal masuk",
        // 无效的手机号或邮箱
        300030: "Nomor telepon atau email tidak valid",
        // 参数错误
        300031: "Kesalahan parameter",
        // 无效的验证码
        300032: "Kode verifikasi tidak benar",
        // 手机号已存在
        300033: "Nomor telepon sudah ada",
        // 邮箱已存在
        300034: "Email sudah ada",
        // imei已存在
        300035: "imei sudah ada",
        // 注册失败
        300036: "registrasi gagal",
        // 重置密码失败
        300037: "Gagal menyetel ulang sandi",
        // 玩小游戏失败
        300038: "Gagal memainkan mini-game",
    },
    /**
    * 输入框检查
    */
    EDITBOX: {
        NICKNAMENULL: "Please enter nickname!",
        VERIFINULL: "Please enter verification code",
        PHONENULL: "Please enter phone number",
        EMAILNULL: "Please enter email number",
        PHONETYPEERR: "Wrong phone number format",
        PSWNULL: "Please enter code",
        PSWWRONGFUL: "Code contains additional character, please re-enter",
        PSWCOFAIL: "Two codes you entered are different, please re-enter",
        NEWPSWNULL: "Please enter new code",
        NEWPSWWRONGFUL: "New code contains additional characters, please re-enter",
        CONFIRMPSWNULL: "Two codes you entered are different,please re-enter.",
        CONFIRMPSWWRONGFUL: "Two codes you entered are different,please re-enter.",
        OLDNEWPSWEQUALS: "New code is same with old one,failed to modify.",
        BANKPSWNULL: "Please enter bank account password",
        BANKPSWFAIL: "Wrong bank account password",
        PSDLENGTHERROE: "Wrong password length! Please enter 6-12 characters!",
        UIPID: "Please enter Bank account number",
        USERNAME: "Please enter Receiver Name",
        BANKNAME: "Please enter Bank Name",
        IFSC: "Please enter Accounts Bank ",
        BANKTIXUANAMOUNT: "Please ensure that  Withdrawal amount entered correctly",
        ADDRESSNULL: "Please enter address number",
    },
    // 公共
    Common: {
        // 没有数据
        NoData: "Ups! Belum ada data!",
    },
    // 推广
    Promotion: {
        // 推广
        labPageName: "Referensi",
        // 推广等级
        labLevelTitle: "Rasio rebate Anda",
        // 推广码
        labInvitationCodeTitle: "Kode Anda",
        // 推广链接
        labInvitationUrlTitle: "Tautan Referensi Anda",
        // 推广统计数据
        labStatTitle: "Ringkasan data",
        // 总推广收入
        labTotalGoldTitle: "Penghasilan total",
        // 总推广提现
        labWithdrawGoldTitle: "Jumlah penarikan",
        // 昨日推广收入
        labYesterdayGoldTitle: "Penghasilan kemarin",
        // 昨日邀请人数
        labYesterdayInvitationTitle: "Diundang kemarin",
        // 总邀请人数
        labAllInvitationTitle: "Semua diundang",
        // 数据最后更新时间
        labUpdateDate: "Perbarui waktu: {0}",
        // 推广收入历史
        labGoldGraphTitle: "Riwayat Pendapatan Anda",
        // 推广人数历史
        labInvitationGraphTitle: "Riwayat Referensi Anda",
        // 推广收入排名
        labRankTitle: "Mitra utama kami",
        // 金币
        RpGold: "RP {0}",
        // 成为我们的合作伙伴
        labCollaborateTitle: "Menjadi partner kami",
        // 成为我们的合作伙伴后，您将享受高额回报。 同时，填写您的推荐码的朋友还可以获得额外的注册和充值奖励。
        labCollaborateContent: "After becoming our partner, you will enjoy high rewards. At the same time, friends who fill in your referral code can also get additional registration and recharge rewards.",
        // 立即获取您的专属推荐码
        labGetInvitationContent: "Dapatkan kode referensi eksklusif Anda sekarang",
        // 能获得多少奖励
        labGotAwardTitle: "Berapa banyak hadiah yang bisa anda dapatkan?",
        // 不同级别的推广者，我们提供不同级别的奖励以鼓励推广
        labLevelContent: "Tingkat promotor yang berbeda, kami memberikan tingkat penghargaan yang berbeda untuk mendorong promosi",
        // 金牌推广
        labLevelTitle0: "Promotor Emas",
        // 需要推广达到1000人，盈利达到 100000000
        labLevelContent0: "Promosi tingkat 1 mencapai 1000 orang, untung mencapai Rp100000000",
        // 银牌推广
        labLevelTitle1: "Promotor perak",
        // 需要推广达到100人，盈利达到 10000000
        labLevelContent1: "Promosi tingkat 2 mencapai 100 orang, untung mencapai Rp10000000",
        // 铜牌推广
        labLevelTitle2: "Promotor perunggu",
        // 无需求
        labLevelContent2: "Tidak ada persyaratan",
        // 您会如何获得奖励
        labAwardTitle: "Bagaimana memberi Anda penghargaan ?",
        // 您的朋友玩游戏后，我们会根据你的等级分享他赚到的利润给你
        labAwardContent: "Setelah teman Anda memainkan game tersebut, kami akan membagi keuntungan yang dia hasilkan kepada Anda sesuai dengan level Anda",
        // 您的佣金
        labBrokerageTitle: "Your commission",
        // 您朋友的利润·抽水·
        labBrokerageContent: "Keuntungan teman anda·House edge· ",
        // 开始赚钱
        labLogin: "Mulai Menghasilkan",
        // 由于计算量大，系统会每天更新一次数据，您可以每天查看昨天的数据
        promotionUpdateDateTips: "Karena banyaknya penghitungan, sistem akan memperbarui data sekali sehan, dan Anda dapat melihat data kemarin setiap hari.",
    },
    Minigame: {
        // 视图名
        labPageName: "Berputar",
        // 金币
        RpGold: "RP {0}",
        // 任务
        labTaskTitle: "Persyaratan",
        // 邮箱绑定描述
        labTaskDesc0: "1.Mengikat email Anda",
        // 绑定邮箱
        labBindEmail: "Pergi mengikat",
        // 完成一局游戏描述
        labTaskDesc1: "2.Bermain satu kali putaran pemainan",
        // 奖金
        labBonusTitle: "Lsi",
        // 奖金描述
        labBonusTips: "Bunos harian hingga",
    }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO0FBRWpCLFFBQUEsVUFBVSxHQUFHO0lBRXRCLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWM7SUFDL0I7O01BRUU7SUFDRixLQUFLLEVBQUU7UUFDTCxXQUFXLEVBQUUsYUFBYTtRQUMxQixTQUFTLEVBQUUsWUFBWTtRQUN2QixhQUFhLEVBQUUsZ0JBQWdCO1FBQy9CLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFNBQVMsRUFBRSxRQUFRO1FBQ25CLFlBQVksRUFBRSxnQkFBZ0I7UUFDOUIsUUFBUSxFQUFFLE9BQU87UUFDakIsU0FBUyxFQUFFLFFBQVE7UUFDbkIsTUFBTSxFQUFFLEtBQUs7S0FDZDtJQUNELFNBQVMsRUFBRTtRQUNULFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLEtBQUssRUFBRSxXQUFXO1FBQ2xCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFNBQVMsRUFBRSxnQkFBZ0I7S0FDNUI7SUFDRCxhQUFhLEVBQUU7UUFDYixhQUFhLEVBQUUsZ0JBQWdCO1FBQy9CLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLFFBQVE7UUFDaEIsR0FBRyxFQUFFLEtBQUs7S0FDWDtJQUNELFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxPQUFPO1FBQ2QsV0FBVyxFQUFFLGFBQWE7UUFDMUIsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsV0FBVztRQUN0QixPQUFPLEVBQUUsU0FBUztRQUNsQixrQkFBa0IsRUFBRSxrQkFBa0I7UUFDdEMsa0JBQWtCLEVBQUUsb0JBQW9CO1FBQ3hDLGdCQUFnQixFQUFFLG1CQUFtQjtRQUNyQyxlQUFlLEVB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VCxZQUFZLEVBQUUsdUJBQXVCO1FBQ3JDLE9BQU87UUFDUCxZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFdBQVc7UUFDWCxZQUFZLEVBQUUsc0NBQXNDO1FBQ3BELEtBQUs7UUFDTCxhQUFhLEVBQUUsS0FBSztRQUNwQixPQUFPO1FBQ1AsWUFBWSxFQUFFLHFCQUFxQjtLQUNwQztDQUVGLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5zeXMuTEFOR1VBR0VfSElOREkgPSBcImhpXCJcblxuZXhwb3J0IGxldCBMYW5ndWFnZUhJID0ge1xuXG4gIGxhbmd1YWdlOiBjYy5zeXMuTEFOR1VBR0VfSElOREksXG4gIC8qKlxuICAqIOagh+mimOaYvuekulxuICAqL1xuICBUSVRMRToge1xuICAgIEhPVFRFU1RHQU1FOiBcIkhvdHRlcyBHYW1lXCIsXG4gICAgTEFURVNUQkVUOiBcIkxhdGVzdCBCZXRcIixcbiAgICBCSUdHRVNUV0lOTkVSOiBcIkJpZ2dlc3QgV2lubmVyXCIsXG4gICAgTEFCR0FNRTogJ1Blcm1haW5hbicsXG4gICAgTEFCUExBWUVSOiAnUGVtYWluJyxcbiAgICBMQUJCRVRBTU9VTlQ6ICdKdW1sYWggVGFydWhhbicsXG4gICAgTEFCREFJTFk6ICdEYWlseScsXG4gICAgTEFCV0VFS0xZOiAnV2Vla2x5JyxcbiAgICBMQUJBTEw6ICdBbGwnXG4gIH0sXG4gIEJFVF9USVRMRToge1xuICAgIExBVEVTVEJFVDogXCJMYXRlc3QgQmV0XCIsXG4gICAgR0FNRVM6IFwiUGVybWFpbmFuXCIsXG4gICAgUExBWUVSOiBcIlBlbWFpblwiLFxuICAgIEJFVEFNT1VOVDogXCJKdW1sYWggVGFydWhhblwiLFxuICB9LFxuICBCSUdHRVNUV0lOTkVSOiB7XG4gICAgQklHR0VTVFdJTk5FUjogXCJCaWdnZXN0IFdpbm5lclwiLFxuICAgIERBSUxZOiBcIkRhaWx5XCIsXG4gICAgV0VFS0xZOiBcIldlZWtseVwiLFxuICAgIEFMTDogXCJBbGxcIixcbiAgfSxcbiAgQUtVTl9USVRMRToge1xuICAgIFBST0ZJTEU6IFwiUHJvZmlsZVwiLFxuICAgIFJBTktJTkc6IFwiUmFua2luZ1wiLFxuICAgIEdBTUVTOiBcIkdhbWVzXCIsXG4gICAgSU5URUdSQVRJT046IFwiSW50ZWdyYXRpb25cIixcbiAgICBVU0VEOiBcIlVzZWRcIixcbiAgICBSRUZFUkVOQ0U6IFwiUmVmZXJlbmNlXCIsXG4gICAgQVJSQU5HRTogXCJBcnJhbmdlXCIsXG4gICAgRU1BSUxfVkVSSUZJQ0FUSU9OOiBcIlZlcmlmaWthc2wgRW1haWxcIixcbiAgICBQSE9ORV9WRVJJRklDQVRJT046IFwiVmVyaWZpa2FzbCBUZWxlcG9uXCIsXG4gICAgU0VDVVJJVFlfU0VUVElORzogXCJTZWN1cml0eSBTZXR0aW5nc1wiLFxuICAgIENIQU5HRV9QQVNTV09SRDogXCJNZW5ndWJhaEthdGVzYW5kaVwiLFxuICAgIFBSSVZBQ1lfU0VUVElORzogXCJQZW5nYXR1cmFuUHJpdmFzbFwiLFxuICAgIExBTkdVQUdFOiBcIkJhaGFzYVwiLFxuICAgIEFCT1VUOiBcIlRlbnRhbmdcIixcbiAgICBGQVE6IFwiRkFRXCIsXG4gICAgQ09OVEFDVF9VUzogXCJIdWJ1bmdpS2FtbFwiLFxuICB9LFxuXG4gIE1JU1NJT046IHtcbiAgICBSRUNFSVZFRFNVQ0NFU1M6IFwiUmVjZWl2ZWQgc3VjY2Vzc2Z1bGx5IVwiXG4gIH0sXG5cbiAgLy8gICBoYWxsX3ZpZXdfYnJvYWRjYXN0X2NvbnRlbnQ6ICdbYnJvYWRjYXN0XSBjb25ncmF0dWxhdGlvbnMhJyxcbiAgLy8gICBoYWxsX3ZpZXdfbm9nYW1lX25vdGljZTogJ+OAkHswfeOAkWRldmVsb3BpbmchISEnLFxuICAvLyAgIHRlc3Q6IFwiIHRlc3QgOiB7MH0tLT57MX0tLT57Mn0tLT57M30tLT5cIixcblxuICBXQUlUOiB7XG4gICAgLyoqQGRlc2NyaXB0aW9uICDnvZHnu5zmlq3lvIDmraPlnKjph43mlrDov57mjqUuLi4qL1xuICAgIERJU0NPTk5FQ1Q6IFwiTmV0d29yayBkaXNjb25uZWN0ZWQsIHJlY29ubmVjdGluZyBub3cuLi5cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOato+WcqOi/m+WFpea4uOaIjyzor7fnqI3lkI4uLi4qL1xuICAgIEVOVEVSR0FNRVdBSVQ6IFwiRW50ZXJpbmcgZ2FtZSwgcGxlYXNlIGhvbGQuLi5cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOe9kee7nOivt+axguWksei0pSzor7fph43or5XvvIEqL1xuICAgIE5FVEVSUk9SOiBcIk5ldHdvcmsgcmVxdWVzdCBmYWlsZWQsIHBsZWFzZSByZXRyee+8gVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6L+e5o6l5pyN5Yqh5ZmoLi4uKi9cbiAgICBDT05ORUNUU0VSVkVSOiBcIkNvbm5lY3RpbmcgdG8gdGhlIHNlcnZlci4uLlwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6Lqr5Lu96K6k6K+BKi9cbiAgICBXQUdFV0FZOiBcImlkZW50aXR5IGF1dGhlbnRpY2F0aW9uLi4uXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnmbvlvZXkuK0qL1xuICAgIExPR0lOOiBcIkxvZ2luLi4uXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDliqDovb3kuK0qL1xuICAgIExPQURJTkc6IFwiTG9hZGluZy4uLlwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5Yqg6L295LitKi9cbiAgICBVUExPQURJTkc6IFwiVXBsb2FkaW5nLi4uXCIsXG4gIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDpgJrnlKjplJnor6/noIFcbiAgLy8gICAgKi9cbiAgLy8gICBFUlJPUlNUQVRVUzoge1xuICAvLyAgICAgLyoqQGRlc2NyaXB0aW9uICDlvZPliY3mkLrluKbph5HluIHkuI3otrPvvIzor7fpgInmi6novoPkvY7miL/pl7TmiJblj4rml7booaXlhYXph5HluIEqL1xuICAvLyAgICAgXCI3MDJcIjogXCJDdXJyZW50bHkgY2FycnlpbmcgaW5zdWZmaWNpZW50IGdvbGQgY29pbnNcIixcbiAgLy8gICB9LFxuXG4gIC8qKlxuICAqIOazqOWGjOaPkOekulxuICAqL1xuICBSRUdJU1RFUjoge1xuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pqC5peg57uR5a6a6YKu566xISovXG4gICAgTk9CT1VETUFJTDogXCJObyBib3VuZCBtYWlsYm94IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6YKu566x5qC85byP5LiN5q2j56GuISovXG4gICAgRU1BSUxXUk9ORzogXCJUaGUgbWFpbGJveCBmb3JtYXQgaXMgaW5jb3JyZWN0IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6YKu566x5ZKM5omL5py65Y+35LiN6IO95Li656m6ISovXG4gICAgRU1BSUxJTkZPUk1BVElPTkVNUFRZOiBcIlBsZWFzZSBmaWxsIGluIHRoZSBlbWFpbCBvciB0ZWxlcGhvbmUhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDpqozor4HnoIHkv6Hmga/kuI3og73kuLrnqbohKi9cbiAgICBDT0RFSU5GT1JNQVRJT05FTVBUWTogXCJQbGVhc2UgZmlsbCBpbiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDlt7Llj5HpgIHor7fms6jmhI/mn6XmlLYhKi9cbiAgICBQTEVBU0VDSEVDSzogXCJTZW50LCBwbGVhc2UgY2hlY2shXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmiYvmnLrmoLzlvI/kuI3mraPnoa4hKi9cbiAgICBQSE9ORVdST05HOiBcIkluY29ycmVjdCBtb2JpbGUgcGhvbmUgZm9ybWF0IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5a+G56CB6ZW/5bqm5LiN6IO95bCP5LqOOOS9jSEqL1xuICAgIFBBU1NXT1JEODogXCJQYXNzd29yZCBsZW5ndGggY2Fubm90IGJlIGxlc3MgdGhhbiA4IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5a+G56CB5YyF5ZCr5aSn5bCP5YaZ5a2X5q+N5ZKM5pWw5a2XISovXG4gICAgTVVTVF9JTkNMVURFX0NBU0VfTlVNQkVSOiBcIlBhc3N3b3JkcyBtdXN0IGNvbnRhaW4gdXBwZXIgYW5kIGxvd2VyIGNhc2UgbGV0dGVycyBhbmQgbnVtYmVyc1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5rOo5YaM5oiQ5YqfISovXG4gICAgUkVHSVNURVJTVUNDRVNTOiBcIlJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsLCBHb29kIEx1Y2shXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDkv67mlLnlr4bnoIHmiJDlip8hKi9cbiAgICBDSEFOR0VQQVNTV09SRFNVQ0NFU1M6IFwiQ2hhbmdlUGFzc3dvcmQgc3VjY2Vzc2Z1bCFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOS/ruaUueWktOWDj+aIkOWKnyEqL1xuICAgIENIQU5HRUFWQVRBUlNVQ0NFU1M6IFwiQ2hhbmdlQXZhdGFyIHN1Y2Nlc3NmdWwhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnu5HlrprmiJDlip8hKi9cbiAgICBCSU5EU1VDQ0VTUzogXCJCb3VuZCBzdWNjZXNzZnVsIVwiLFxuICB9LFxuXG4gIC8qKlxuICAgKiDmj5DnpLpUSVBTXG4gICAqL1xuICBUSVBTOiB7XG4gICAgLyoqQGRlc2NyaXB0aW9uICDmsqHmnInnu5HlrprnmoTpgq7nrrEhKi9cbiAgICBOT1RCSU5ERU1BSUw6IFwiTm8gYm91bmQgbWFpbGJveCFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOWkjeWItuWksei0pSEqL1xuICAgIEdBTUVET1dOTE9BRENPUFlFUlJPUjogXCJGYWlsZWQgdG8gY29weSFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOe9kee7nOetieW+hei2heaXtiEqL1xuICAgIE5FVFdBSVRUSU1FT1VUOiBcIk5ldC13b3JrIHRpbWUtb3V0IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pqC5pyq5byA5ZCv77yM5bC96K+35pyf5b6FISovXG4gICAgTk9UT1BFTlBMRUFTRVdBSVQ6IFwiTm90IHlldCBvcGVuLCBwbGVhc2Ugd2FpdCFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOWIhuS6q+aIkOWKnyEqL1xuICAgIFNIQVJFU1VDQ0VTUzogXCJTaGFyZSBTdWNjZXNzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDliIbkuqvlpLHotKUhKi9cbiAgICBTSEFSRUZBSUxFRDogXCJTaGFyZSBGYWlsZWRcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOWFheWAvOaIkOWKnyEqL1xuICAgIFJFQ0hBUkdFU1VDQ0VTUzogXCJSZWNoYXJnZSBTdWNjZXNzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDor7fovpPlhaXlhYXlgLzph5Hpop3miJbpgInmi6nllYblk4EhKi9cbiAgICBFTlRFUlJFQ0hBUkdFOiBcIlBsZWFzZSBlbnRlciB0aGUgcmVjaGFyZ2UgYW1vdW50IG9yIHNlbGVjdCB0aGUgcHJvZHVjdFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5o+Q546w5oiQ5YqfISovXG4gICAgV0lUSERSQVdTVUNDRVNTOiBcIldpdGhkcmF3IFN1Y2Nlc3NcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOe7keWumumTtuihjOaIkOWKnyEqL1xuICAgIEJJTkRCQU5LU1VDQ0VTUzogXCJCaW5kQmFuayBTdWNjZXNzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDor7floavlhpnlrozmlbTpk7booYznu5Hlrprkv6Hmga8hKi9cbiAgICBCQU5EQkFOS0lORk9GQUlMOiBcIlBsZWFzZSBjb21wbGV0ZSB0aGUgYmFuayBiaW5kaW5nIGluZm9ybWF0aW9uXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDojrflvpfkuIPlpKnlpZblirEhKi9cbiAgICBTRVZFTlNJR05JTlNVQ0NFU1M6IFwiQ29uZ3JhdHVsYXRpb25zIG9uIGdldHRpbmcgdGhlIHNldmVuIGRheSBzaWduIGluIHJld2FyZFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6I635b6X5LiJ5Y2B5aSp5aSp5aWW5YqxISovXG4gICAgVEhJUlRZU0lHTklOU1VDQ0VTUzogXCJDb25ncmF0dWxhdGlvbnMgb24gZ2V0dGluZyB0aGUgMzAgZGF5IHNpZ24gaW4gcmV3YXJkXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnrb7liLDmiJDlip8hKi9cbiAgICBTSUdOSU5TVUNDRVNTOiBcIlNpZ24gU3VjY2Vzc1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5bey5Y+R6YCB6K+35rOo5oSP5p+l5pS2ISovXG4gICAgU0VORENIRUNLOiBcIlNlbnQsIHBsZWFzZSBjaGVja1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6K+36YCJ5oup6ZO26KGMISovXG4gICAgU0VMRUNUQkFOazogXCJQbGVhc2Ugc2VsZWN0IGEgYmFuayBmaXJzdFwiLFxuXG4gICAgLyoqQGRlc2NyaXB0aW9uICDpgIDlh7rmuLjmiI8hKi9cbiAgICBRVUlUR0FNRTogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcXVpdCB0aGUgZ2FtZSA/XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDlvLrliLbmm7TmlrAhKi9cbiAgICBWRVJTSU9OVVBEQVRFOiBcIkN1cnJlbnQgdmVyc2lvbiBkb2VzIG5vdCBtYXRjaCBhbmQgbmVlZCBkb3dubG9hZCBnYW1lIHBhY2shXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24gIOabtOaWsCEqL1xuICAgIFVQREFURTogXCJVcGRhdGVcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOW9k+WJjeato+WkhOS6juWFtuS7lua4uOaIj+S4rSEqL1xuICAgIENIRUNLSk9JTkdBTUU6IFwiWW91IGFyZSBpbiB0aGUgaG9zdGluZyBvZiB7MH0gR2FtZSwgdGVtcG9yYXJpbHkgdW5hYmxlIHRvIGVudGVyIG90aGVyIGdhbWVzXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24gIOS4i+i9veabtOaWsOWksei0pSEqL1xuICAgIERPV05MT0FERkFJTEVEOiBcIk5ldHdvcmsgaXMgbm90IGdvb2QuIFBsZWFzZSBjaGFuZ2UgdGhlIG5ldHdvcmsgZW52aXJvbm1lbnQhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDkuIvovb3mm7TmlrDmiJDlip8hKi9cbiAgICBET1dOTE9BRFNVQ0NFRUQ6IFwiRG93bmxvYWQgdXBkYXRlIHN1Y2NlZWRlZCFcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5ri45oiP5pyJ5paw54mI5pys77yM5piv5ZCm6YeN5ZCv5pu05paw77yfKi9cbiAgICBHQU1FTkVXVkVSU0lPTjogXCJUaGVyZSBpcyBhIG5ldyB2ZXJzaW9uIG9mIHRoZSBnYW1lLiBEbyB5b3Ugd2FudCB0byByZXN0YXJ0IGl0P1wiLFxuXG4gICAgLyoq5pat57q/6YeN6L+e5o+Q56S6ICovXG4gICAgUkVUUlk6IFwiUmV0cnlcIixcbiAgICAvKirljoblj7LorrDlvZXmj5DnpLogKi9cbiAgICBoaXN0b3J5VGlwOiBcIk9ubHkga2VlcCB0aGUgbGFzdCBzZXZlbiBkYXlzIG9mIGhpc3RvcnlcIixcbiAgICBCZXRJRDogXCJCZXQgSURcIixcbiAgICBUaW1lOiBcIlRpbWVcIixcbiAgICBCZXRBbW91bnQ6IFwiQmV0IEFtb3VudFwiLFxuICAgIE9kZHM6IFwiT2Rkc1wiLFxuICAgIFByb2ZpdDogXCJQcm9maXRcIixcbiAgICBNdWx0aXBsZTogXCJNdWx0aXBsZVwiLFxuICAgIFR5cGVvZmJldDogXCJUeXBlIG9mIGJldFwiLFxuICAgIFdpbm9yTG9zdDogXCJXaW4gb3IgTG9zdFwiLFxuICAgIFNldHRsZW1lbnRBbW91bnQ6IFwiU2V0dGxlbWVudCBBbW91bnRcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6YeR5biB5LiN6LazISovXG4gICAgbm9Hb2xkRW50ZXJSb29tOiBcIllvdSBkb27igJl0IGhhdmUgZW5vdWdoIGNoaXBzLiBBIG1pbmltdW0gb2YgezB9IGNoaXBzIGlzIHJlcXVpcmVkIHRvIGVudGVyIHRoZSByb29tLiBEbyB5b3Ugd2FudCB0byByZWNoYXJnZSBub3c/XCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24gIOaNlemxvOmVv+acn+acqua4uOaIjyDouKLlh7rmiL/pl7QgKi9cbiAgICByZW1vdmVkUm9vbTogXCJZb3UgaGF2ZSBub3QgZmlyZWQgZm9yIG1vcmUgdGhhbiAxIG1pbnV0ZSBhbmQgYXJlIHJlbW92ZWQgZnJvbSB0aGUgcm9vbVwiLFxuICB9LFxuXG4gIC8qKlxuICAgKiDplJnor6/mj5DnpLpcbiAgICovXG4gIEVSUk9SVElQUzoge1xuICAgIC8qKkBkZXNjcmlwdGlvbiAg6K+35rGC5bey5Y+R6YCBKi9cbiAgICBSRVFTRU5EOiBcIkFhcHBsaWNhdGlvbiBoYXMgc2VudFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6K+35rGC5bey5Y+R6YCBLOivt+azqOaEj+afpeaUtuefreS/oSovXG4gICAgUkVRU0VORENIRUNLTUVTU0FHRTogXCJBcHBsaWNhdGlvbiBzZW50IGFscmVhZHksIHBsZWFzZSBub3RlIHRoZSBtZXNzYWdlc1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5Y+R6YCB6aqM6K+B56CB6Ze06ZqU6L+H55+tKi9cbiAgICBDT0RFVElNRVNIT1JUOiBcIlRoZSBpbnRlcnZhbCBvZiBzZW5kaW5nIE9UUHMgaXMgdG9vIHNob3J0XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDpnZ7ms5Xmk43kvZwqL1xuICAgIEZFSUZBQ0FPWlVPOiBcIklsbGVnYWwgb3BlcmF0aW9uXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDph5HluIHkuI3otrMqL1xuICAgIEdPTERGRVc6IFwiSW5hZGVxdWF0ZSBjb2luc1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5Yqg5rOo6YeR6aKd5LiN5ZCI5rOVKi9cbiAgICBBRERHT0xERkVJRkE6IFwiQmV0IGFtb3VudCBpcyBpbGxlZ2FsXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnjqnlrrblt7LlvIPniYwqL1xuICAgIFFJUEFJOiBcIlBsYXllciBmb2xkZWRcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOmdnuWHhuWkh+eKtuaAgSovXG4gICAgTk9UUkVBRFlTVEFURTogXCJOb24tcHJlcGFyZSBzdGF0dXNcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOaTjeS9nOWkqui/h+mikee5gSzor7fnrYnlvoUlc+enkuWGjeivlSovXG4gICAgQ0FPWlVPVE9GQVNUOiBcIkFjdGlvbnMgdG9vIG9mdGVubSwgcGxlYXNlIHdhaXQgZm9yICVzIHJldHJ5XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmnI3liqHlmajor7fmsYLotoXml7YqL1xuICAgIFNFUlZFUlRJTUVPVVQ6IFwiU2VydmVyIHJlcXVlc3QgdGltZS1vdXQhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDojrcg5Y+WKi9cbiAgICBIVU9RVTogXCJPYnRhaW5cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOmAmuefpeiiq+mhtuWPtyovXG4gICAgVE9QQUNDT1VOVDogXCJZb3VyIGFjY291bnQgaXMgbG9nZ2VkIGluIG9uIGFub3RoZXIgZGV2aWNlLCBJZiB5b3UgZGlkIG5vdCBkbyBpdCB5b3Vyc2VsZiwgcGxlYXNlIGNoYW5nZSB0aGUgcGFzc3dvcmQgaW4gdGltZVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5ri45a6i6ZyA6KaB5YWI57uR5a6a5omL5py65Y+3Ki9cbiAgICBHVUVTVEJJTkRFUlJPUjogXCJHdWVzdCBuZWVkIHRvIGJpbmQgbW9iaWxlIHBob25lIG51bWJlciBmaXJzdFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5oi/6Ze05YiX6KGo5LiN5a2Y5ZyoKi9cbiAgICBST09NTElTVEVSUk9SOiBcIlJvb20gbGlzdCBkb2VzIG5vdCBleGlzdFwiLFxuICB9LFxuXG4gIC8qKlxuICAgKiDku6PnkIZcbiAgICovXG4gIEFHRU5UOiB7XG4gICAgSU5QVVRfUEFSRU5UX0lEOiBcIlByb21vdGVyIElEXCIsXG4gICAgUEFSRU5UX0lEX0xFTkdUSF9FUlJPUjogXCJXcm9uZyBzdXBlcmlvciBhZ2VudCBJRFwiLFxuICAgIEJJTkRfU1VDQ0VFRDogXCJCaW5kIHN1Y2Nlc3NmdWxseVwiLFxuICAgIERBVEFfRU1QVFk6IFwiRW1wdHkgZGF0YVwiLFxuICAgIENIRUNLSU5HOiBcIlJldmlld1wiLFxuICAgIFBBU1M6IFwiUGFzc1wiLFxuICAgIFJFSkVDVEVEOiBcIk5vdCBQYXNzXCIsXG4gICAgV0lUSERSQVdfTlVNX0VSUjogXCJJbmNvcnJlY3QgcmVjZWl2ZSBhbW91bnRcIixcbiAgICBBUFBMWV9XSVRIRFJBVzogXCJIYXMgYXBwbGllZCBmb3IgcmVjZWl2ZVwiLFxuICAgIEFHRU5UUE9UOiBcIkFnZW50IFBvdFwiLFxuICB9LFxuICAvKipcbiAgICog5o6o5bm/XG4gICAqL1xuICBQUk9NT1RJT046IHtcbiAgICBMQUJFTEE6IFwiVXNlclwiLFxuICAgIExBQkVMQjogXCJNZW1iZXIgbGlua2VkIHRvIFVzZXJcIixcbiAgICBMQUJFTEM6IFwiTWVtYmVyIGxpbmtlZCB0byBCXCIsXG4gICAgTEFCRUxEOiBcIk1lbWJlciBsaW5rZWQgdG8gQ1wiLFxuICAgIEJPVU5TQ0FMQ1VMQVRJT046IFwiPVNldmljZSBGZWUgYnkgQiB4IExldmVsIDEgUmF0aW8rU2V2aWNlIEZlZSBieSBDIHggTGV2ZWwgMiBSYXRpbytTZXZpY2UgRmVlIGJ5IEQgeCBMZXZlbCAzIFJhdGlvXCIsXG4gICAgQ09OTkVDVExBQkVMOiBcIkVudGVyIHlvdXIgcHJvbW90ZXIgSURcIixcbiAgICBFWENMVVNJVkVMSU5LOiBcImluZGl2aWR1YWwgbGlua++8mlwiLFxuICAgIEVYQ0xVU0lWRUxJTksyOiBcImluZGl2aWR1YWwgbGlua1wiLFxuICAgIFNIQVJFVE86IFwiU2hhcmUgdG/vvJpcIixcbiAgICBUT1RBTEJPTlVTOiBcIlRvdGFsIEJvbnVzXCIsXG4gICAgQVZBSUxBQkVMOiBcIkF2YWlsYWJlbCBCb251c1wiLFxuICAgIEJPTlVTOiBcIkJvbnVzXCIsXG4gICAgUkFUSU86IFwiUmF0aW9cIixcbiAgICBEVFJBSUxTTk9ERToge1xuICAgICAgVElQMTogXCJBbGwgVHVybm92ZXI6XCIsXG4gICAgICBUSVAyOiBcIkFsbCBSZWJhdGU6XCIsXG4gICAgICBUSVAzOiBcIlRoZSB0b3RhbCBudW1iZXIgb2Y6XCIsXG4gICAgICBUSVA0OiBcIk9ubHkgc2hvdyB0aGUgZGV0YWlscyBvZiAxIHdlZWtcIixcbiAgICAgIFRJVExFMTogXCJOYW1lXCIsXG4gICAgICBUSVRMRTI6IFwiSURcIixcbiAgICAgIFRJVExFMzogXCJUeXBlXCIsXG4gICAgICBUSVRMRTQ6IFwiVHVybm92ZXJcIixcbiAgICAgIFRJVExFNTogXCJSZWJhdGVcIixcbiAgICAgIE5FQVJMWUFXRUVLOiBcIk5lYXJseSBhIHdlZWtcIixcbiAgICAgIEFMTFRZUEU6IFwiQWxsIFR5cGVzXCIsXG4gICAgfSxcbiAgICBBQ0NPVU5UREVUQUlMU09SUkVDT1JETk9ERToge1xuICAgICAgTEVWRUxfVElUTEUxOiBcIkludml0YXRpb24gVGltZVwiLFxuICAgICAgTEVWRUxfVElUTEUyOiBcIk5hbWVcIixcbiAgICAgIExFVkVMX1RJVExFMzogXCJJRFwiLFxuICAgICAgTEVWRUxfVElUTEU0OiBcIk5PLm9mZmxpbmVcIixcbiAgICAgIExFVkVMX1RJVExFNTogXCJUb3RhbCBCb251c1wiLFxuICAgICAgTk9EX1RJVExFMTogXCJOdW1iZXJcIixcbiAgICAgIE5PRF9USVRMRTI6IFwiVGltZVwiLFxuICAgICAgTk9EX1RJVExFMzogXCJBbW91bnRcIixcbiAgICAgIE5PRF9USVRMRTQ6IFwiT3ZlcmFnZVwiLFxuICAgIH1cblxuICB9LFxuICAvKipcbiAgKiDnvZHnu5zplJnor6/ku6PnoIFcbiAgKi9cbiAgRVJST1JDT0RFOiB7XG4gICAgLyoqQGRlc2NyaXB0aW9uICDmnI3liqHlmajniYjmnKzmoKHpqows5aSx6LSl6K+36YeN6K+VKi9cbiAgICBWRVJTSU9OQ0hFQ0s6IFwiU2VydmVydmVyc2lvbiBleGFtaW5lLCBmYWlsZWQgcGxlYXNlIHJldHJ5XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmnI3liqHlmajnvZHnu5zlt7Lnu4/mlq3lvIDov57mjqUs6K+36YeN6K+VISEhKi9cbiAgICBORVRDTE9TRTogXCJUaGUgbmV0d29yayBpcyBkaXNjb25uZWN0ZWQuIFBsZWFzZSBjaGVjayB0aGUgbmV0d29ya1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiDmuLjmiI/mnI3liqHlmajlvIDlj5HkurrlkZjor7fmo4Dmn6UqL1xuICAgIFBMRUFTRUNIRUNLOiBcIkdhbWUgc2VydmVyIGRldmVsb3BlciBwbGVhc2UgY2hlY2tcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOacjeWKoeWZqOivt+axguWksei0pe+8jOivt+mHjeivlXN0YXR1czoqL1xuICAgIFNFUlZFUkVSUk9SOiBcIlNlcnZlciByZXF1ZXN0IGZhaWxlZCwgcGxlYXNlIHJldHJ5XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOacjeWKoeWZqOivt+axgui2heaXtu+8jOivt+mHjeivlSEqL1xuICAgIFNFUlZFUlRJTUVPVVQ6IFwiU2VydmVyIHJlcXVlc3QgdGltZW91dO+8jHBsZWFzZSByZXRyeSFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOiOt+WPlua4uOaIj+WIl+ihqOWksei0peivt+mHjeivlSovXG4gICAgR0FNRUxJU1RFUlJPUjogXCJGYWlsZWQgdG8gZ2V0IHRoZSBnYW1lIGxpc3QgcGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pyN5Yqh5Zmo6K+35rGC6L+U5Zue5pWw5o2u6ZSZ6K+vc3RhdHVzKi9cbiAgICBEQVRBRVJST1I6IFwiU2VydmVyIHJlcXVlc3QgcmV0dXJuZWQgZGF0YSBlcnJvcixzdGF0dXM6XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnvZHnu5zmlq3lvIDov57mjqXvvIzor7fph43mlrDnmbvlvZUqL1xuICAgIEUyMDAxMDAwMTogXCJOZXR3b3JrIGRpc2Nvbm5lY3RlZCwgcGxlYXNlIGxvZ2luIGFnYWlu77yBXCIsIC8vdG9rZW4gSW52YWxpZFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg55m75b2V5aSx6LSlKi9cbiAgICBFMTAwMjAwMDc6IFwiRmFpbGVkIHRvIGxvZ2luXCIsXG5cbiAgICAxMTogXCJMb2dpbiB0aW1lb3V0LCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLi4uXCIsXG4gICAgMTI6IFwiVGhlIGN1cnJlbnQgcm9vbSBpcyBub3Qgb3Blbi4uLi5cIixcbiAgICAxMzogXCJQYXNzd29yZCByZXNldCBmYWlsZWQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIhXCIsXG4gICAgMTQ6IFwiVGhlIHBhcmFtZXRlciBpcyB3cm9uZ1wiLFxuICAgIDE1OiBcIlRvbyBtYW55IG5ldyB1c2VycyBoYXZlIHJlZ2lzdGVyZWQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIhXCIsXG4gICAgMTA0OiBcIlRoaXMgc2Vzc2lvbiBpcyBub3Qgb3BlbiB5ZXQhXCIsXG4gICAgMTA3OiBcIlRoZSBwbGF5ZXIgZG9lcyBub3QgZXhpc3QhXCIsXG4gICAgMTEwOiBcIlRoZSBwbGF5ZXIgbG9naW4gaGFzIGV4cGlyZWQsIHBsZWFzZSBsb2cgaW4gYWdhaW5cIixcbiAgICAxMTE6IFwiVGhlIHBsYXllciBpcyBub3QgcmVnaXN0ZXJlZFwiLFxuICAgIDExNDogXCJUaGVyZSBpcyBhbHJlYWR5IHNvbWVvbmUgYXQgdGhpcyBsb2NhdGlvblwiLFxuICAgIDEyMDogXCJZb3VyIGFjY291bnQgaXMgbG9nZ2VkIGluIGVsc2V3aGVyZSwgeW91IGFyZSBmb3JjZWQgdG8gZ28gb2ZmbGluZVwiLFxuICAgIDEyMjogXCJUaGUgcm9vbSBoYXMgYmVlbiBkaXNiYW5kZWQuLi5cIixcbiAgICAxNDU6IFwiVGhpcyBhY2NvdW50IGlzIGZvcmJpZGRlbiB0byBsb2cgaW5cIixcbiAgICAxNDY6IFwiVGhlIHBsYXllciBpcyBub3QgbG9nZ2VkIGluIVwiLFxuICAgIDE0OTogXCJUaGUgc2VydmVyIGhhcyBiZWVuIG1haW50YWluZWQgUGxlYXNlIGZvbGxvdyB0aGUgb2ZmaWNpYWwgbmV3cyBmb3IgdGhlIGR1cmF0aW9uXCIsXG4gICAgMTcwOiBcIkZyaWVuZCByb29tIGlzIG5vdCBvcGVuZWRcIixcbiAgICAxNzQ6IFwiVGhlIGdhbWUgaGFzIHN0YXJ0ZWQhXCIsXG4gICAgMTc1OiBcIlRoZSBudW1iZXIgb2YgcGVvcGxlIHdobyBjYW4gc3RhcnQgaXMgbm90IHJlYWNoZWRcIixcbiAgICAxNzY6IFwiTW9iaWxlIHBob25lIG51bWJlciBoYXMgYmVlbiByZWdpc3RlcmVkXCIsXG4gICAgMjI3OiBcIlRoZSByb29tIGRvZXMgbm90IGV4aXN0IG9yIGhhcyBiZWVuIGRpc2JhbmRlZCFcIixcbiAgICAyMjk6IFwiSW4gdGhlIGdhbWUhXCIsXG4gICAgMjMxOiBcIlRoaXMgcGhvbmUgbnVtYmVyIGlzIG5vdCByZWdpc3RlcmVkXCIsXG4gICAgMjMyOiBcIkluY29ycmVjdCB2ZXJpZmljYXRpb24gY29kZVwiLFxuICAgIDIzMzogXCJZb3UgaGF2ZSBzaWduZWQgaW4gdG9kYXksIHBsZWFzZSBkbyBub3Qgc2lnbiBpbiBhZ2FpblwiLFxuICAgIDIzNTogXCJDYW4ndCBhZGQgeW91cnNlbGYgYXMgYSBmcmllbmRcIixcbiAgICAyMzc6IFwiVGhlcmUgaXMgYSBwcm9ibGVtIHdpdGggdGhlIGFtb3VudCB5b3UgZW50ZXJlZCwgcGxlYXNlIHJlLWVudGVyXCIsXG4gICAgMjQwOiBcIlRoZSBwbGF5ZXIgaXMgbm90IGluIHRoZSByb29tXCIsXG4gICAgMjQxOiBcIlRoZSByb29tIGRvZXMgbm90IGV4aXN0IG9yIGhhcyBiZWVuIGRpc2JhbmRlZCFcIixcbiAgICAyNDI6IFwiWW91ciBjaGlwcyBhcmUgb3Zlcm11Y2hcIixcbiAgICAyNDM6IFwiWW91ciBjaGlwcyBhcmUgaW5zdWZmaWNpZW50XCIsXG4gICAgMjQ0OiBcIllvdSBhcmUgaW4gdGhlIGdhbWUsIHBsZWFzZSB3YWl0IHRvIGxvZyBvdXQgYWZ0ZXIgdGhpcyByb3VuZCBpcyBvdmVyXCIsXG4gICAgMjQ1OiBcIkZhaWxlZCB0byBzdGFuZCB1cCwgdGhlIHBsYXllciBoYXMgbm90IHlldCBzYXQgZG93blwiLFxuICAgIDI0OTogXCJDYW5ub3QgYmV0IG5vd1wiLFxuICAgIDI1MTogXCJZb3VyIGFjY291bnQgYmFsYW5jZSBpcyBpbnN1ZmZpY2llbnRcIixcbiAgICAyNTQ6IFwiVGhlIGFtb3VudCB5b3UgZW50ZXJlZCBleGNlZWRzIHRoZSBzYWZlIGRlcG9zaXQgYm94IGFzc2V0c1wiLFxuICAgIDI1NzogXCJUaGUgcGxheWVyIHN0YXR1cyBpcyB3cm9uZ1wiLFxuICAgIDI2NDogXCJUaGUgYmV0dGluZyBsaW1pdCBoYXMgYmVlbiByZWFjaGVkXCIsXG4gICAgMjcyOiBcIkNhbm5vdCBmaW5kIGEgc3VpdGFibGUgcm9vbSwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlclwiLFxuICAgIDI3NjogXCJZb3UgY2FuIHN0YW5kIHVwIGFmdGVyIHlvdSBmb2xkXCIsXG4gICAgMjc5OiBcIllvdXIgYmFsYW5jZSBkb2VzIG5vdCBtYXRjaCwgcGxlYXNlIGxvZyBpbiBhZ2FpbiBhbmQgdGhlbiBvcGVyYXRlXCIsXG4gICAgMjgwOiBcIlRoZSBwaG9uZSBudW1iZXIgaGFzIGJlZW4gYm91bmQsIHBsZWFzZSBkbyBub3QgYmluZCBpdCBhZ2FpbiFcIixcbiAgICAyOTc6IFwiVGhlIG9wZXJhdGlvbiBmYWlsZWRcIixcbiAgICAzMDg6IFwiUGxlYXNlIGVudGVyIHBhc3N3b3JkXCIsXG4gICAgMzA5OiBcIllvdXIgb2xkIHBhc3N3b3JkIGlzIHdyb25nLCBwbGVhc2UgcmUtZW50ZXLvvIFcIixcbiAgICAzMzc6IFwiVG9vIG1hbnkgcmVnaXN0ZXJlZCB1c2VycyB1bmRlciB0aGUgc2FtZSBpcCFcIixcbiAgICAzNTI6IFwiQ3VycmVudCBzZWF0IGlzIGZ1bGxcIixcbiAgICAzNTQ6IFwiQXQgbGVhc3QgMiBwZW9wbGUgY2FuIHN0YXJ0IHRoZSBnYW1lLlwiLFxuICAgIDM1NzogXCJUaGlzIEZhY2Vib29rIGFjY291bnQgaGFzIGJlZW4gYm91bmQsIHBsZWFzZSBkbyBub3QgYmluZCBpdCBhZ2FpbiFcIixcbiAgICAzNTg6IFwiVGhlIGFtb3VudCBvZiB3aXRoZHJhd2FsIGRvZXMgbm90IG1lZXQgdGhlIHJlcXVpcmVtZW50cyFcIixcbiAgICAzNTk6IFwiVGhlIGJhbmsgY2FyZCBjdXJyZW50bHkgYm91bmQgZG9lcyBub3Qgb3BlbiB0aGUgd2l0aGRyYXdhbCBmdW5jdGlvbiFcIixcbiAgICAzNjA6IFwiRWFjaCB1c2VyIGNhbiBiaW5kIHVwIHRvIDMgYmFua3PigJggaW5mb3JtYXRpb24hXCIsXG4gICAgMzYxOiBcIlRoZSBiYW5rIGluZm9ybWF0aW9uIHRoYXQgbmVlZHMgdG8gYmUgdXBkYXRlZCBkb2VzIG5vdCBleGlzdCFcIixcbiAgICAzNjI6IFwiSW5jb3JyZWN0IHZlcmlmaWNhdGlvbiBjb2RlXCIsXG4gICAgMzYzOiBcIlRoZSBtYWlsIGhhcyBiZWVuIHJlYWQhXCIsXG4gICAgMzY0OiBcIlRoZSByZWNvcmQgZG9lcyBub3QgZXhpc3QhXCIsXG4gICAgMzY1OiBcIlRoZSByZWNvcmQgc3RhdHVzIG9mIHRoZSBwbGF5ZXIgcGlnZ3kgYmFuayBpcyBpbmNvcnJlY3QgYW5kIGNhbm5vdCBiZSBvcGVyYXRlZCFcIixcbiAgICAzNjY6IFwiVGhlIHBsYXllcidzIHBpZ2d5IGJhbmsgYWxyZWFkeSBoYXMgYSBwcm9maXQgYW5kIGNhbm5vdCBiZSBjYW5jZWxsZWQhXCIsXG4gICAgMzY3OiBcIlRoZSBwbGF5ZXIgZmFpbGVkIHRvIGNhbmNlbCB0aGUgcGlnZ3kgYmFuayBvcGVyYXRpb24hXCIsXG4gICAgMzY4OiBcIlRoZSBwbGF5ZXIgZmFpbGVkIHRvIHRyYW5zZmVyIHRvIHRoZSBwaWdneSBiYW5rIVwiLFxuICAgIDM2OTogXCJUaGUgcGxheWVyIGZhaWxlZCB0byB0cmFuc2ZlciBvdXQgb2YgdGhlIHBpZ2d5IGJhbmshXCIsXG4gICAgMzcwOiBcIlRoZSBwbGF5ZXIgcGlnZ3kgYmFuayBoYXMgbm8gaW5jb21lIGFuZCBjYW5ub3QgYmUgdHJhbnNmZXJyZWQgb3V0IVwiLFxuICAgIDM3MTogXCJDb25maWd1cmF0aW9uIGRvZXMgbm90IGV4aXN0LCBzYXZpbmcgZmFpbGVkIVwiLFxuICAgIDM3MjogXCJUaGUgcGxheWVyJ3MgYWNjb3VudCBiYWxhbmNlIGlzIGluc3VmZmljaWVudCBhbmQgdGhlIGRlcG9zaXQgZmFpbGVkIVwiLFxuICAgIDM3MzogXCJZb3VyIGRlcG9zaXQgbGltaXQgaXMgaW5zdWZmaWNpZW50LCBwbGVhc2UgcmUtZW50ZXIhXCIsXG4gICAgMzc0OiBcIkRlcG9zaXQgZmFpbGVkLCBkZXBvc2l0IHRvbyBmZXcgZ29sZCBjb2lucyFcIixcbiAgICAzNzU6IFwiVGhlIGlucHV0IHBhc3N3b3JkIGlzIHdyb25nLCB0aGUgdHJhbnNmZXIgZmFpbGVkIVwiLFxuICAgIDM3ODogXCJHb2xkIHNob3J0YWdlXCIsLy/ph5HluIHkuI3otrPlnZDkuIvlpLHotKVcbiAgICAzNzk6IFwiQWNjb3VudCBub3QgcmVnaXN0ZXJlZFwiLFxuICAgIDM4MDogXCJBY2NvdW50IGFuZCBwYXNzd29yZCBkbyBub3QgbWF0Y2jvvIFcIixcbiAgICAzODU6IFwiVGhlIGJhbmsgYWNjb3VudCBiZWVuIHVzZWQhXCIsXG4gICAgMzg2OiBcIkJhbmsgY29uZmlnIGluZm8gZXJyb3IhXCIsXG4gICAgMzg3OiBcIkJhbmsgaW5mbyBzYXZlIGVycm9yIVwiLFxuICAgIDM4ODogXCJUaGUgbnVtYmVyIG9mIGZyaWVuZHMgb2YgdGhlIG90aGVyIHBhcnR5IGhhcyByZWFjaGVkIHRoZSB1cHBlciBsaW1pdFwiLFxuICAgIDM4OTogXCJUaGUgcmVjb3JkIGhhcyBleHBpcmVkLCB0cnkgcmVmcmVzaGluZ1wiLFxuICAgIDM5MDogXCJDYW5ub3QgYmV0IHJlcGVhdGVkbHlcIixcblxuICAgIC8v6L2s55uYXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmtLvliqjmnKrlvIDlkK8qL1xuICAgIDM5MjogXCJBY3Rpdml0eSBub3Qgb3BlblwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6aKG5Y+W5aSx6LSl77yM6K+36IGU57O75a6i5pyNKi9cbiAgICAzOTM6IFwiRmFpbGVkIHRvIHJlY2VpdmUsIHBsZWFzZSBjb250YWN0IGN1c3RvbWVyIHNlcnZpY2VcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOeOqeWutuacquetvuWIsCovXG4gICAgMzk1OiBcIlBsYXllciBub3QgY2hlY2tlZCBpblwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5Ymp5L2Z5Y+v546p5qyh5pWw5LiN5aSfKi9cbiAgICAzOTY6IFwiVGhlcmUgaXMgbm8gbnVtYmVyIG9mIGRyYXdzIGF2YWlsYWJsZVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pyq6YWN572u5rS75Yqo54mp5ZOBKi9cbiAgICAzOTc6IFwiTm8gYWN0aXZlIGl0ZW1zIGNvbmZpZ3VyZWRcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOaTjeS9nOWksei0pe+8jOivt+WGjeivleS4gOasoSovXG4gICAgMzk4OiBcIk9wZXJhdGlvbiBmYWlsZWQsIHBsZWFzZSB0cnkgYWdhaW5cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOWlluWTgeW6k+WtmOS4jei2s++8jOivt+iBlOezu+WuouacjSovXG4gICAgNDAwOiBcIkluc3VmZmljaWVudCBzdG9jaywgcGxlYXNlIGNvbnRhY3QgY3VzdG9tZXIgc2VydmljZVwiLFxuXG4gICAgNDQwOiBcIlRoaXMgcGxheWVyIGlzIGFscmVhZHkgeW91ciBmcmllbmRcIixcbiAgICA0NDE6IFwiQWxyZWFkeSBhcHBsaWVkXCIsXG4gICAgNDQyOiBcIllvdSBoYXZlIHJlYWNoZWQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGZyaWVuZHNcIixcbiAgICA0NDM6IFwiVGhlIG90aGVyIHBhcnR5IGlzIG5vdCBhbGxvd2VkIHRvIGFkZCBmcmllbmRzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDotoXov4fpppblhYXmrKHmlbAqL1xuICAgIDQ2NjogXCJNb3JlIHRoYW4gdGhlIG51bWJlciBvZiBmcmlzdCBwYXlcIixcbiAgICAvLyAg5qKm5bm75L2T6IKy5paw5Yqg55qELS0tLS0tLS0tLVxuICAgIDQ3MDogXCJMb2dpbiBGYWlsZWRcIixcbiAgICA0NzE6IFwiRmFpbGVkIHRvIG9idGFpbiB1c2VyIGluZm9ybWF0aW9uXCIsXG4gICAgNDcyOiBcIlBsZWFzZSBzZXQgdGhlIHNlY29uZGFyeSBwYXNzd29yZCBmaXJzdFwiLFxuICAgIDQ3MzogXCJDdXJyZW5jeSBFeGNoYW5nZSBGYWlsZWRcIixcbiAgICA0NzQ6IFwiVGhlIGlucHV0IGN1cnJlbmN5IGlzIGJlbG93IHRoZSBtaW5pbXVtIGxpbWl0XCIsXG4gICAgNDc1OiBcIkZhaWxlZCB0byBvYnRhaW4gdGhlIGhpc3RvcnlcIixcbiAgICA0NzY6IFwiQWNjZXNzIHRpbWVvdXRcIixcbiAgICA0Nzc6IFwiQW1vdW50IGV4Y2VlZHMgbGltaXRcIixcbiAgICA0Nzg6IFwiVGhlIG51bWJlciBvZiB0cmFuc2ZlcnMgZXhjZWVkcyB0aGUgbGltaXRcIixcbiAgICA0Nzk6IFwiVGhlIHRyYW5zZmVyIGFtb3VudCBleGNlZWRzIHRoZSBsaW1pdFwiLFxuXG5cbiAgICA0ODA6IFwiQlRJIFNQT1JUUyBMb2dpbiBGYWlsZWQsIHBsZWFzZSByZXRyeVwiLFxuICAgIDQ4MTogXCJCVEkgU1BPUlRTIFRyYW5zZmVyIGluIEZhaWxlZCwgcGxlYXNlIHJldHJ5XCIsXG4gICAgNDgyOiBcIkJUSSBTUE9SVFMgVHJhbnNmZXIgb3V0IEZhaWxlZCwgcGxlYXNlIHJldHJ5XCIsXG4gICAgLy8g5LiN5bGe5LqO6K+l5Zy65qyhXG4gICAgNDkwOiBcIlBsZWFzZSB3YWl0LCB0aGUgZ2FtZSBpcyBwcmVwYXJpbmcuXCIsXG4gICAgLy8g6YeR5biB5Zy65pyq5byA5ZCvXG4gICAgNDkxOiBcIkdvbGQgY29pbiBmaWVsZCBpcyBjbG9zZWTvvIxwbGVhc2UgbG9nIGluIGFnYWluLlwiLFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICA1MDA6IFwiVGhlIGNvbm5lY3Rpb24gaXMgYWJub3JtYWwsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuLi5cIixcbiAgICA1MDU6IFwiV3JvbmcgYmV0IGNoaXBzXCIsXG4gICAgNTMwOiBcIkxvZ2luIHN3aXRjaCBpcyBub3QgdHVybmVkIG9uXCIsXG4gICAgNTMxOiBcIlRoZSByZWNoYXJnZSBzd2l0Y2ggaXMgbm90IHR1cm5lZCBvblwiLFxuICAgIDUzMjogXCJUaGUgd2l0aGRyYXdhbCBzd2l0Y2ggaXMgbm90IHR1cm5lZCBvblwiLFxuICAgIDUzMzogXCJHYW1lIHN3aXRjaCBpcyBub3QgdHVybmVkIG9uXCIsXG4gICAgLy/mjpLooYzmppxcbiAgICA2MTA6IFwibGVhZGVyYm9hcmQgaXMgbm90IGVuYWJsZWRcIixcbiAgICA2MTE6IFwidGhlcmUgaXMgbm8gcmV3YXJkIHRvIHJlY2VpdmVcIixcbiAgICA2MTI6IFwicmV3YXJkIHJlY2VpdmVkXCIsXG4gICAgNjEzOiBcInJ1bGUgY29uZmlndXJhdGlvbiBlcnJvciwgcGxlYXNlIGNvbnRhY3QgY3VzdG9tZXIgc2VydmljZVwiLFxuICAgIC8v6ZSm5qCH6LWbXG4gICAgNjIwOiBcIlRoZSB0b3VybmFtZW50IGhhcyBiZWVuIGRpc2JhbmRlZFwiLFxuICAgIDYyMTogXCJ0aGUgZ2FtZSBoYXMgYmVndW5cIixcbiAgICA2MjI6IFwiYWxyZWFkeSBzaWduZWQgdXBcIixcbiAgICA2MjM6IFwidGhlIG51bWJlciBvZiBwZW9wbGUgaXMgZnVsbFwiLFxuICAgIDYyNDogXCJub3QgcmVnaXN0ZXJlZFwiLFxuICAgIDYyNTogXCJmdWxsIG9yIHN0YXJ0ZWRcIixcbiAgICA2MjY6IFwidGhlIGdhbWUgaXMgb3ZlclwiLFxuICAgIDYyNzogXCJmYWlsZWQgdG8gY2xvc2UgdGhlIGdhbWVcIixcbiAgICA2Mjg6IFwiRmFpbGVkIHRvIGNyZWF0ZSB0aGUgZ2FtZSwgZXhjZWVkaW5nIHRoZSBtYXhpbXVtIGxpbWl0IG9mIGNyZWF0aW5nIHRoZSBnYW1lIG9uIHRoZSBkYXlcIixcbiAgICA2Mjk6IFwiR2FtZSBzdGFydGVkIG9yIGVuZGVkIG9yIG5vdCBmb3VuZFwiLFxuICAgIDUwMDE6IFwiSGFzIGEgc3VwZXJpb3IgYW5kIGNhbm5vdCBiZSBib3VuZFwiLFxuICAgIDUwMDI6IFwiRG8gbm90IGFsbG93IGxvb3AgYmluZGluZ1wiLFxuICAgIDUwMDM6IFwiVXNlciBkb2VzIG5vdCBleGlzdFwiLFxuICAgIDUwMDQ6IFwiTm90IGFsbG93ZWQgdG8gYmluZCB5b3Vyc2VsZlwiLFxuICAgIDUwMDU6IFwiSW5zdWZmaWNpZW50IGJhbGFuY2UgdG8gd2l0aGRyYXdcIixcbiAgICA1MDA2OiBcIk9ubHkgcXVlcnkgZGF0YSB3aXRoaW4gc2V2ZW4gZGF5c1wiLFxuICAgIDcwMTogXCJJbGxlZ2FsIG9wZXJhdGlvblwiLFxuICAgIDcwMjogXCJDdXJyZW50bHkgY2FycnlpbmcgaW5zdWZmaWNpZW50IGdvbGQgY29pbnNcIiwgLyoqQGRlc2NyaXB0aW9uICDlvZPliY3mkLrluKbph5HluIHkuI3otrPvvIzor7fpgInmi6novoPkvY7miL/pl7TmiJblj4rml7booaXlhYXph5HluIEqL1xuICAgIC8qKkBkZXNjcmlwdGlvbiAg562556CB5LiN6LazKi9cbiAgICA3MDQ6IFwiR29sZCBTaG9ydGFnZVwiLFxuICB9LFxuXG4gIC8vICAgLyoqXG4gIC8vICAgICog6K6+572uXG4gIC8vICAgICovXG4gIC8vICAgU0VUVElORzoge1xuICAvLyAgICAgVElUVExFOiBcIlNldHRpbmdzXCIsXG4gIC8vICAgICBNVVNJQzogXCJNdXNpY1wiLFxuICAvLyAgICAgRUZGRUNUOiBcIkVmZmVjdFwiLFxuICAvLyAgICAgT1BFTjogXCJPblwiLFxuICAvLyAgICAgQ0xPU0U6IFwiT2ZmXCIsXG4gIC8vICAgICBDSEFOR0VJRDogXCJTd2l0Y2ggYWNjb3VudFwiLFxuICAvLyAgICAgTk9XSUQ6IFwiQ3VycmVudCBhY2NvdW50OiBcIixcbiAgLy8gICAgIFZFUlNJT046IFwiVmVyc2lvbiBObzogXCIsXG4gIC8vICAgICBSRVNFVEdVSURUSVA6IFwiQWZ0ZXIgcmVzZXR0aW5nLCBlbnRlciB0aGUgZ2FtZSBhZ2FpbiBhbmQgZW50ZXIgdGhlIG5vdmljZSB0cmFpbmluZy4gRG8geW91IHdhbnQgdG8gcmVzZXQ/XCIsXG4gIC8vICAgICBSRVNFVEdVSURUSVBTVUNDOiBcIlJlc2V0IHN1Y2Nlc3NmdWxseVwiLFxuICAvLyAgICAgTEFOR1VBR0U6IFwiRW5nbGlzaFwiLFxuXG4gIC8vICAgfSxcbiAgLy8gICAvKipcbiAgLy8gICAqIOetvuWIsFxuICAvLyAgICovXG4gIC8vICAgU0lHTklOOiB7XG4gIC8vICAgICBGUkVFOiBcIkZyZWVcIixcbiAgLy8gICAgIERBWTogXCJEQVl7MH1cIixcbiAgLy8gICAgIFNJR05JTlNVQ0NFU1M6IFwiU2lnbiBpbiBzdWNjZXNzZnVsbHlcIixcbiAgLy8gICAgIFNJR05JTkZBSUw6IFwiU2lnbiBpbiBmYWlsXCIsXG4gIC8vICAgICBBTFJFQURZU0lHTklOOiBcIkFscmVhZHkgc2lnbmVkXCIsXG4gIC8vICAgICBOT1RTSUdOSU46IFwiQ29tZSBiYWNrIHRvbW9ycm93XCIsXG4gIC8vICAgICBUSVRMRTogXCJEYWxpeSBCb251c1wiLFxuICAvLyAgICAgUkVTRVQ6IFwiUmVzZXQgZXZlcnkgc2V2ZW4gZGF5c1wiLFxuICAvLyAgICAgUkVGUkVTSDogXCJSZWZyZXNoIGF0IDI0OjAwIGRhaWx5XCIsXG4gIC8vICAgICBDTElDSzogXCJDbGljayB0aGUgYnV0dG9uIGFib3ZlIHRvIGNvbGxlY3QhXCIsXG4gIC8vICAgICBUT0RBWTogXCJUb2RheVwiLFxuICAvLyAgIH0sXG4gIC8vICAgLyoqXG4gIC8vICAgICog57uR5a6aXG4gIC8vICAgICovXG4gIC8vICAgQklORDoge1xuICAvLyAgICAgVElUVExFOiBcIkJpbmQgcGhvbmVcIixcbiAgLy8gICAgIFBIT05FOiBcIk1vYmlsZSBudW1iZXI6IFwiLFxuICAvLyAgICAgQ09ERTogXCJPVFA6IFwiLFxuICAvLyAgICAgTkVXOiBcIk5ldyBQYXNzd29yZDogXCIsXG4gIC8vICAgICBDSEVDSzogXCJSZS1lbnRlciBQYXNzd29yZDogXCIsXG4gIC8vICAgICBJTlBVVFBIT05FOiBcIlBob25lIE51bWJlclwiLFxuICAvLyAgICAgSU5QVVRDT0RFOiBcIlBsZWFzZSBlbnRlciB0aGUgdmVyaWZpY2F0aW9uIGNvZGVcIixcbiAgLy8gICAgIENPREVMRU46IFwiVGhlIGxlbmd0aCBvZiB0aGUgdmVyaWZpY2F0aW9uIGNvZGUgaXMgNiBjaGFyYWN0ZXJzXCIsXG4gIC8vICAgICBJTlBVVFJFQ0VJVkVSTkFNRTogXCJQbGVhc2UgZW50ZXIgdGhlIG5hbWUgb2YgdGhlIHJlY2VpdmVyXCIsXG4gIC8vICAgICBJTlBVVEFDQ09VTlQ6IFwiUGxlYXNlIGVudGVyIHRoZSBiYW5rIGFjY291bnQgbnVtYmVyXCIsXG4gIC8vICAgICBJTlBVVElGU0M6IFwiUGxlYXNlIGVudGVyIHRoZSBiYW5rIElGU0MgY29kZVwiLFxuICAvLyAgICAgSU5QVVRJRlNDV1JPTkc6IFwiVGhlIElGU0MgYmFuayBjb2RlIHlvdSBlbnRlcmVkIGlzIHdyb25nIVwiLFxuICAvLyAgICAgSU5QVVRBTU9VTlQ6IFwiUGxlYXNlIGVudGVyIHRoZSB3aXRoZHJhd2FsIGFtb3VudFwiLFxuICAvLyAgICAgTk9TRUxFQ1RCQU5LOiBcIk5vIGJhbmsgc2VsZWN0ZWRcIixcbiAgLy8gICAgIElOUFVUTkVXOiBcIjYgY2hhcmFjdGVyc1wiLFxuICAvLyAgICAgSU5QVVRDSEVDSzogXCJQbGVhc2UgYmUgY29uc2lzdGVudFwiLFxuICAvLyAgICAgU0VORDogXCJTZW5kXCIsXG4gIC8vICAgICBDT05GSVJNOiBcIkNvbmZpcm1cIixcbiAgLy8gICAgIEJJTkRTVUNDRVNTOiBcIlNldHVwIHN1Y2NlZWRlZFwiLFxuICAvLyAgICAgQ0hBTkdFU1VDQ0VTUzogXCJNb2RpZmljYXRpb24gc3VjY2VlZGVkXCIsXG4gIC8vICAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOS4quS6uuS/oeaBr1xuICAvLyAgICAqL1xuICAvLyAgIFVTRVJJTkZPOiB7XG4gIC8vICAgICBVTkJPVU5EOiBcIlVuYm91bmRcIixcbiAgLy8gICAgIE5BTUVDSEFORVNVQ0NFU1M6IFwiTmlja25hbWUgbW9kaWZpZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gIC8vICAgICBIRUFEQ0hBTkVTVUNDRVNTOiBcIkhlYWQgbW9kaWZpZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gIC8vICAgICBOT0JJTkRQSE9ORTogXCJOZWVkIHRvIGJpbmQgcGhvbmUgYWNjb3VudFwiLFxuICAvLyAgICAgQURERlJJRU5EOiBcIkludml0YXRpb24gc2VudCBzdWNjZXNzZnVsbHlcIixcbiAgLy8gICAgIEVOVEVSTkFNRV9FUlJPUjogXCJQbGVhc2UgZW50ZXIgbmlja25hbWUhIFwiLFxuICAvLyAgICAgTklDS05BTUU6IFwiTmlja05hbWVcIixcbiAgLy8gICAgIFNJR05BVFVSRTogXCJTaWduYXR1cmVcIlxuICAvLyAgIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDpgq7ku7ZcbiAgLy8gICAgKi9cbiAgLy8gICBFTUFJTDoge1xuICAvLyAgICAgREVBUlBMQVlFUjogXCJEZWFyIHBsYXllcu+8mlwiLFxuICAvLyAgICAgTk9ORVdTOiBcIk5vIG5ld3NcIixcbiAgLy8gICB9LFxuXG4gIC8vICAgLyoqXG4gIC8vICAgICog6ZO26KGMXG4gIC8vICAgICovXG4gIC8vICAgQkFOSzoge1xuICAvLyAgICAgQU1PVU5URVJST1IxOiBcIlBsZWFzZSBpbnB1dCBhbW91bnTvvIFcIixcbiAgLy8gICAgIEFNT1VOVEVSUk9SMjogXCJUcmFuc2ZlciBpbiAvIG91dCBhbW91bnQgY2Fubm90IGJlIDAhXCIsXG4gIC8vICAgICBBTU9VTlRFUlJPUjM6IFwiSW5zdWZmaWNpZW50IGNhcnJ5aW5nIGFtb3VudCwgcGxlYXNlIHJlY2hhcmdlIVwiLFxuICAvLyAgICAgQU1PVU5URVJST1I0OiBcIkluc3VmZmljaWVudCBiYW5rIGJhbGFuY2UsIHBsZWFzZSB0cnkgYWdhaW4hXCIsXG4gIC8vICAgICBPUEVSQVRFU1VDQ0VTUzogXCJUaGUgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsXCIsXG4gIC8vICAgICAvL1xuICAvLyAgICAgREVQT1NJVF9BTU9VTlQ6IFwiRGVwb3NpdCBBbW91bnQ6XCIsXG4gIC8vICAgICBFTlRFUl9BTU9VTlQ6IFwiRW50ZXIgQW1vdW50XCIsXG4gIC8vICAgICBCQU5LOiBcIkJhbms6XCIsXG4gIC8vICAgICBDQVJSSUVEOiBcIkNhcnJpZWQ6XCIsXG4gIC8vICAgICBUQUtFT1VUQU1PVU5UOiBcIlRha2UgT3V0IEFtb3VudDpcIixcbiAgLy8gICB9LFxuXG4gIC8vICAgLyoqXG4gIC8vICAgICog5YWF5YC8XG4gIC8vICAgICovXG4gIC8vICAgUkVDSEFSR0U6IHtcbiAgLy8gICAgIE5PR09PRFM6IFwiUHJvZHVjdCBpbmZvcm1hdGlvbiBub3Qgb2J0YWluZWQhXCIsXG4gIC8vICAgICBXYWl0aW5nUGF5OiBcIldhaXRpbmcgZm9yIHBheW1lbnRcIixcbiAgLy8gICAgIFBheVN1Y2Nlc3M6ICdTdWNjZXNzJyxcbiAgLy8gICAgIFBheUZhaWxlZDogJ0ZhaWxlZCcsXG4gIC8vICAgICBUaW1lOiBcIlRpbWVcIixcbiAgLy8gICAgIENvbW1vZGl0eTogXCJDb21tb2RpdHlcIixcbiAgLy8gICAgIEFtb3VudDogXCJBbW91bnRcIixcbiAgLy8gICAgIFN0YXRlOiBcIlN0YXRlXCJcblxuICAvLyAgIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDmj5DnjrBcbiAgLy8gICAgKi9cbiAgLy8gICBXSVRIRFJBV0FMOiB7XG4gIC8vICAgICBVTkJPVU5EQkFOSzogXCJVbmJvdW5kIGJhbmsgYWNjb3VudCBudW1iZXJcIixcbiAgLy8gICAgIFJBVEU6IFwiRmVlIHJhdGXvvJp7MH0lXCIsXG4gIC8vICAgICBSQVRFTGltaXRlZDogXCJGZWUgcmF0Ze+8miBMaW1pdGVkIGZyZWVcIixcbiAgLy8gICAgIExpbWl0ZWRmcmVlOiBcIkxpbWl0ZWQgZnJlZVwiLFxuICAvLyAgICAgTUlOQU1PVU5UOiBcIk1pbi9NYXgtQW1vdW5077yaXCIsXG4gIC8vICAgICBJTlBVVE1JTkFNT1VOVDogXCJMZXNzIHRoYW4gdGhlIG1pbmltdW0gd2l0aGRyYXdhbCBhbW91bnRcIixcbiAgLy8gICAgIElXQjogXCJJbnN1ZmZpY2llbnQgYWNjb3VudCBiYWxhbmNlXCIsXG4gIC8vICAgICBJV0JCRVQ6IFwiSW5zdWZmaWNpZW50IGJldCBhbW91bnRcIixcbiAgLy8gICAgIE5PQklORFBIT05FOiBcIk1vYmlsZSBwaG9uZSBudW1iZXIgbm90IGJvdW5kXCIsXG4gIC8vICAgICBTVUNDRVNTOiBcIldpdGhkcmF3YWwgYXBwbGljYXRpb24gc3VibWl0dGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAvLyAgICAgV0lUSERSQVdBTEFNT1VOVDogXCJXaXRoZHJhd2FsIEFtb3VudFwiLFxuICAvLyAgICAgV2l0aGRyYXdhbFN0YXR1czoge1xuICAvLyAgICAgICBcIjBcIjogXCJXYWl0aW5nIGZvciBwcm9jZXNzaW5nXCIsXG4gIC8vICAgICAgIFwiMTAwXCI6IFwiQXBwcm92ZWRcIixcbiAgLy8gICAgICAgXCIyMDBcIjogXCJEcmF3aW5nXCIsXG4gIC8vICAgICAgIFwiMzAwXCI6IFwiV2l0aGRyYXdhbCBzdWNjZXNzZnVsXCIsXG4gIC8vICAgICAgIFwiLTEwMFwiOiBcIkF1ZGl0IGZhaWx1cmVcIixcbiAgLy8gICAgICAgXCItMzAwXCI6IFwiV2l0aGRyYXdhbCBmYWlsZWRcIixcbiAgLy8gICAgICAgXCIzMDlcIjogXCJJbmNvcnJlY3Qgc2Vjb25kYXJ5IHBhc3N3b3JkXCIsXG4gIC8vICAgICB9LFxuICAvLyAgICAgR09UT0JJTkRQSE9ORTogXCJHby10by1iaW5kLXBob25lXCIsXG4gIC8vICAgICBOT0JJTkRQSE9ORVRJUDogXCJGb3IgdGhlIHNhZmV0eSBvZiB5b3VyIGZ1bmRzLHBsZWFzZSBiaW5kIHlvdXIgbW9iaWxlIG51bWJlciBmaXJzdFwiLFxuICAvLyAgICAgQUREQkFOS0NBUkQ6IFwiKyBBZGQgYmFuayBjYXJkXCIsXG4gIC8vICAgICBTRUxFQ1RCQU5LOiBcIlNlbGVjdCBCYW5rXCIsXG4gIC8vICAgICBCQU5LTlVNQkVSOiBcIkJhbmsgYWNjb3VudCBudW1iZXJcIixcbiAgLy8gICAgIFJFQ0VJVkVSTkFNRTogXCJSZWNlaXZlciBOYW1lXCIsXG4gIC8vICAgICBJRlNDQ09ERTogXCJFbnRlciB0aGUgYmFuayBJRlNDIGNvZGVcIixcbiAgLy8gICAgIEVSUk9SOiB7XG4gIC8vICAgICAgIEVNUFRZX1BXRDogXCJQbGVhc2UgZW50ZXIgc2Vjb25kYXJ5IHBhc3N3b3JkXCJcbiAgLy8gICAgIH0sXG4gIC8vICAgICBTRUNPTkRBUllQQVNTV09SRDogXCJTZWNvbmRhcnkgUGFzc3dvcmRcIlxuICAvLyAgIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDlrZjpkrHnvZBcbiAgLy8gICAgKi9cbiAgLy8gICBQSUdHWV9CQU5LOiB7XG4gIC8vICAgICAvLyDlr4bnoIHkuI3kuIDoh7RcbiAgLy8gICAgIElOQ09OU0lTVEVOVF9QQVNTV09SRDogXCJJbmNvbnNpc3RlbnQgcGFzc3dvcmRcIixcbiAgLy8gICAgIC8vIOWvhueggeS4jeWFqFxuICAvLyAgICAgUEFTU1dPUkRfSU5DT01QTEVURTogXCJZb3VyIHBhc3N3b3JkIGlzIGluY29tcGxldGVcIixcbiAgLy8gICAgIC8vIOaXp+WvhueggeWSjOaWsOWvhueggeS4gOiHtFxuICAvLyAgICAgT0xEX05FV19QQVNTV0RfU0FNRTogXCJZb3VyIG5ldyBwYXNzd29yZCBpcyB0aGUgc2FtZSBhcyB5b3VyIG9sZCBwYXNzd29yZCwgcGxlYXNlIHJlLWVudGVyLlwiLFxuICAvLyAgICAgLy8g5paw5a+G56CB5LiN5LiA6Ie0XG4gIC8vICAgICBORVdfUEFTU1dEX0RJRkY6IFwiVGhlIG5ldyBwYXNzd29yZCBhbmQgdGhlIGNvbmZpcm1lZCBwYXNzd29yZCBhcmUgaW5jb25zaXN0ZW50LCBwbGVhc2UgcmUtZW50ZXIuXCIsXG4gIC8vICAgICAvLyDkv67mlLnlr4bnoIHmiJDlip9cbiAgLy8gICAgIENIQU5HRV9TVUNDRVNTOiBcIlN1Y2Nlc3NmdWxseSBtb2RpZmllZC5cIixcbiAgLy8gICAgIC8vIOWvhueggeS4uuepuu+8jOivt+i+k+WFpeWvhueggVxuICAvLyAgICAgUExFQVNFX0VOVEVSX1BBU1NXT1JEOiBcIlBsZWFzZSBlbnRlciBwYXNzd29yZFwiLFxuICAvLyAgICAgLy8g6K+36L6T5YWl6L2s5YWl6YeR6aKdXG4gIC8vICAgICBQTEVBU0VfRU5URVJfVEhFX0FNT1VOVDogXCJQbGVhc2UgZW50ZXIgdGhlIGFtb3VudFwiLFxuICAvLyAgICAgLy8g5a2Y5YWl5aSx6LSlXG4gIC8vICAgICBERVBPU0lUX0ZBSUxVUkU6IFwiRGVwb3NpdCBmYWlsdXJlLCBQbGVhc2UgZW50ZXIgdGhlIGNvcnJlY3QgYW1vdW50ICFcIixcbiAgLy8gICAgIC8vIOmineW6puS4jei2s1xuICAvLyAgICAgREVQT1NJVF9MSU1JVDogXCJZb3VyIGRlcG9zaXQgbGltaXQgaXMgaW5zdWZmaWNpZW50LCBwbGVhc2UgcmUtZW50ZXIuXCIsXG4gIC8vICAgICAvLyDlrZjlhaXmiJDlip9cbiAgLy8gICAgIERFUE9TSVRFRF9TVUNDRVNTRlVMTFk6IFwiRGVwb3NpdGVkIHN1Y2Nlc3NmdWxseS5cIixcbiAgLy8gICAgIC8vIOWPlua2iOaIkOWKn1xuICAvLyAgICAgQ0FOQ0VMX1NVQ0NFU1M6IFwiQ2FuY2VsIHN1Y2Nlc3NcIixcbiAgLy8gICAgIC8vIOacgOWkp+WtmOasvumineW6puS4jei2s1xuICAvLyAgICAgSU5TVUZGSUNJRU5UX01BWElNVU06IFwiSW5zdWZmaWNpZW50IG1heGltdW0gdHJhbnNmZXIgYW1vdW50XCIsXG4gIC8vICAgICAvLyDovpPlhaXkuI3og73lpKfkuo7mnIDlpKfpop3luqZcbiAgLy8gICAgIElOU1VGRklDSUVOVF9ERVBPU0lUX0FNT1VOVDogXCJJbnN1ZmZpY2llbnQgZGVwb3NpdCBhbW91bnRcIixcbiAgLy8gICAgIC8vIOW/hemhu+i+k+WFpSA2IOS9jeaVsOWtl1xuICAvLyAgICAgTVVTVF82X0RJR0lUUzogXCJQYXNzd29yZCBtdXN0IGJlIDYgZGlnaXRzXCIsXG5cbiAgLy8gICAgIC8v5YWo6YOoXG4gIC8vICAgICBBTEw6IFwiQUxMXCIsXG4gIC8vICAgICBUT1RBTF9JTkNPTUU6IFwiVG90YWwgSW5jb21lXCIsXG4gIC8vICAgICBSQVRFOiBcIlJhdGVcIixcbiAgLy8gICAgIENPTUZJUk1FRF9BTU9VTlQ6IFwiQ29uZmlybWVkIFxcbmFtb3VudFwiLFxuICAvLyAgICAgWUVTVEVSREFZX0lOQ09NRTogXCJZZXN0ZXJkYXkncyBcXG5pbmNvbWVcIixcblxuICAvLyAgICAgTUFYSU1VTl9UUkFOU0ZFUl9BTUlVTlQ6IFwiTWF4aW11bSB0cmFuc2ZlciBhbW91bnQ6XCIsXG4gIC8vICAgICBURUFOU0ZFUl9JTjogXCJUcmFuc2ZlciBJbjpcIixcbiAgLy8gICAgIE1JTklNVU1fU0lHTEU6IFwiTWluaW11bSBzaW5nbGUgaW52ZXN0bWVudCBhbW91bnQ6XCIsXG4gIC8vICAgICBQUk9GSVQ6IFwiUHJvZml0XCIsXG5cbiAgLy8gICAgIFBMRUFTRV9FTlRFUjogXCJQbGVhc2UgZW50ZXJcIixcblxuICAvLyAgICAgLy9QQkRlcG9zaXRSZWNlaXB0Vmlld1xuICAvLyAgICAgVElNRTogXCJUaW1lXCIsXG4gIC8vICAgICBPUEVSQVRJT05fQU1PVU5UOiBcIk9wZXJhdGlvblxcbkFtb3VudFwiLFxuICAvLyAgICAgSU5URVJFU1JBVEU6IFwiSW50ZXJlc3RcXG5SYXRlXCIsXG4gIC8vICAgICBFWFBFQ1RFRFJFVFVSTjogXCJFeHBlY3RlZFxcblJldHVyblwiLFxuICAvLyAgICAgVElNRUxFRlQ6IFwiVGltZVxcbkxlZnRcIixcbiAgLy8gICAgIE9QRVJBVEU6IFwiT3BlcmF0ZVwiLFxuICAvLyAgICAgLy9QQkRlcG9zaXRSZWNlaXB0SXRlbU5vZGVcbiAgLy8gICAgIENBTkNFTEVEOiBcIkNhbmNlbGVkXCIsXG4gIC8vICAgICBUUkFOU0ZFUlJFRE9VVDogXCJUcmFuc2ZlcnJlZCBvdXRcIixcbiAgLy8gICB9LFxuICAvLyAgIC8qKlxuICAvLyAgICAqIOaOkuihjOamnFxuICAvLyAgICAqL1xuICAvLyAgIFJBTks6IHtcbiAgLy8gICAgIE1ZUkFOSzogXCJNeSBSYW5rXCIsXG4gIC8vICAgICBSZWNlaXZlOiBcIkNvbmdyYXR1bGF0aW9ucyBvbiBnZXR0aW5nIHRoZSB7MH0gY2hpcCByZXdhcmRcIixcbiAgLy8gICB9LFxuICAvLyAgIC8qKlxuICAvLyAgKiDliIbkuqtcbiAgLy8gICovXG4gIC8vICAgU0hBUkU6IHtcbiAgLy8gICAgIEVYQ0xVU0lWRUxJTks6IFwiaW5kaXZpZHVhbCBsaW5r77yaXCIsXG4gIC8vICAgICBTSEFSRVRPOiBcIlNoYXJlIHRv77yaXCIsXG4gIC8vICAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOWlveWPi1xuICAvLyAgICAqL1xuICAvLyAgIEZSSUVORDoge1xuICAvLyAgICAgSU5GT1JNQVRJT046IFwiSU5GT1JNQVRJT05cIixcbiAgLy8gICAgIERFTEVURUZSSUVORDogXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGZyaWVuZHMgezB9P1wiLFxuICAvLyAgICAgSU5WSVRFRlJJRU5EOiBcIiBpbnZpdGVzIHlvdSB0byBwbGF5IHswfT9cIixcbiAgLy8gICAgIEVOVEVSUk9PTTogXCJ7MH0gZW50ZXIgdGhlIHJvb21cIixcbiAgLy8gICAgIElOVklUQVRJT05TRU5EOiBcIkludml0YXRpb24gc2VudFwiLFxuICAvLyAgICAgQUxSRUFEWUlOUk9PTTogXCJUaGUgcGxheWVyIGlzIGFscmVhZHkgaW4gdGhlIHJvb21cIixcbiAgLy8gICAgIE9OTElORTogXCJPbmxpbmVcIixcbiAgLy8gICAgIE9GRk9ORTogXCJPZmZpbmVcIixcbiAgLy8gICAgIEZSSUVORDogXCJGcmllbmRcIixcbiAgLy8gICAgIEFMUkVBRFlfQVBQTElFRDogXCJBbHJlYWR5IGFwcGxpZWRcIixcbiAgLy8gICAgIEhBVkVfQkVDT01FX0ZSSUVORDogXCJIYXZlIGJlY29tZSBmcmllbmRzXCIsXG4gIC8vICAgICBGQUlMTF9UT19GUklFTkRTOiBcIkZhaWwgdG8gYmUgZnJpZW5kc1xcbnswfVwiLFxuICAvLyAgICAgSEFWRV9CRUNPTUVfRlJJRU5EUzogXCJIYXZlIGJlY29tZSBmcmllbmRzXFxuezB9XCIsXG4gIC8vICAgICBXQU5UX0JFX0ZSSUVORDogXCJXYW50IGJlIHlvdXIgZnJpZW5kXFxuezB9XCIsXG4gIC8vICAgICBOT19SRVNVTFQ6ICdObyByZXN1bHQnLFxuICAvLyAgICAgTk9fQ09OVEFTVDogJ05vIGNvbnRhY3RzIGNhbiBiZSBhZGRlZCcsXG4gIC8vICAgICBOT19GUklFTkQ6ICdObyBmcmllbmQnLFxuICAvLyAgICAgTk9fTkVXUzogJ05vIG5ld3MnLFxuICAvLyAgICAgQUxMT1dfQUREX0ZSSUVORDogXCJBbGxvdyB0byBhZGQgbWUgYXMgYSBmcmllbmRcIixcbiAgLy8gICAgIEFMTE9XX0lOVklURV9UT0dBTUU6IFwiQWxsb3cgdG8gaW52aXRlIG1lIHRvIHBsYXkgZ2FtZXNcIixcbiAgLy8gICAgIEVOVEVSX1VTRVJJRDogXCJFbnRlciB1c2VyIElEXCIsXG4gIC8vICAgICBDT05UQVNURkFJTEVEOiBcIkZhaWxlZCB0byBvYnRhaW4gZGV2aWNlIHBlcm1pc3Npb25zXCIsXG4gIC8vICAgICBDT05USU5VU19HQU1FOiBcIllvdXIgcHJldmlvdXMgZ2FtZSB3YXMgbm90IGNvbXBsZXRlZC4gV2hldGhlciB0byBlbnRlciB0aGUgcHJldmlvdXMgZ2FtZSB0byBjb250aW51ZT9cIixcbiAgLy8gICAgIFVTRVJJRF9FUlI6ICdVc2VyIElEIGlzIGVycm9yLHBsZWFzZSByZXRyeScsXG5cbiAgLy8gICB9LFxuICAvLyAgIC8qKlxuICAvLyAgKiDotKblj7fnmbvlvZUgXG4gIC8vICAqL1xuICAvLyAgIEFDQ09VTlRfTE9HSU46IHtcbiAgLy8gICAgIC8vIOWNoOS9jeesplxuICAvLyAgICAgUEFMQ0VfSE9MREVSOiB7XG4gIC8vICAgICAgIC8vIOmqjOivgeeggVxuICAvLyAgICAgICBWRVJfQ09ERTogXCJ2ZXJpZmljYXRpb24gY29kZVwiLFxuICAvLyAgICAgICBQQVNTV09SRDogXCJwYXNzd29yZFwiLFxuICAvLyAgICAgICBQQVNTV09SRF9DT05GSVJNOiBcImNvbmZpcm0gcGFzc3dvcmRcIixcbiAgLy8gICAgICAgUEhPTkU6ICdwaG9uZScsXG4gIC8vICAgICB9LFxuICAvLyAgICAgLy8g6ZSZ6K+v5o+Q56S6XG4gIC8vICAgICBFUlJPUjoge1xuICAvLyAgICAgICAvLyDmiYvmnLrlj7fml6DmlYjjgIHplJnor69cbiAgLy8gICAgICAgUEhPTkVfTlVNOiBcIlBob25lIG51bWJlciBlcnJvclwiLFxuICAvLyAgICAgICAvLyDpqozor4HnoIHml6DmlYhcbiAgLy8gICAgICAgVkVSX0NPREU6IFwiSW5jb3JyZWN0IHZlcmlmaWNhdGlvbiBjb2RlXCIsXG4gIC8vICAgICAgIC8vIOS4pOasoeWvhueggeS4jeS4gOiHtCBkaXNhY2NvcmRcbiAgLy8gICAgICAgVFdPX1BXRF9ESVNBQ0NPUkQ6IFwiRW50ZXIgdGhlIHBhc3N3b3JkIHR3aWNlIGluY29uc2lzdGVudFwiLFxuICAvLyAgICAgICAvLyDotKblj7fmnKrms6jlhoxcbiAgLy8gICAgICAgQUNDX05PX1JFR0lTVEVSOiBcIkFjY291bnQgbm90IHJlZ2lzdGVyZWRcIixcbiAgLy8gICAgICAgRU1QVFlfUFdEOiBcIlBsZWFzZSBlbnRlciBwYXNzd29yZFwiLFxuICAvLyAgICAgfSxcbiAgLy8gICAgIFNVQ0NFRURFRDogXCJTdWNjZWVkZWRcIixcbiAgLy8gICAgIC8vIOWPkemAgemqjOivgeeggeWIsOOAguOAguOAglxuICAvLyAgICAgU0VORF9DT0RFX1RPX1BIT05FOiBcIlZlcmlmY2F0aW9uIFNNUyB3aWxsIGJlIHNlbnQgdG9cIlxuXG5cbiAgLy8gICB9LFxuICAvLyAgIFJPT01MSVNUOiB7XG4gIC8vICAgICBSVU1NWToge1xuICAvLyAgICAgICBFTlRSWUFNT1VOVDogXCJFbnRyeSBBbW91bnRcIixcbiAgLy8gICAgICAgUEVSUE9JTlQ6IFwiUGVyIFBvaW50XCIsXG4gIC8vICAgICB9LFxuICAvLyAgICAgVEVFTlBBVFRJOiB7XG4gIC8vICAgICAgIEJPVFRPTUxJTkU6IFwiQm90dG9tIExpbmVcIixcbiAgLy8gICAgICAgRU5UUllBTU9VTlQ6IFwiRW50cnkgQW1vdW50XCIsXG4gIC8vICAgICB9LFxuICAvLyAgICAgRFpQSzoge1xuICAvLyAgICAgICBTQl9CQjogXCJTQi9CQlwiLFxuICAvLyAgICAgICBCVVlfSU5fUkFOR0U6IFwiQnV5LWluIFJhbmdlXCIsXG4gIC8vICAgICB9LFxuICAvLyAgIH0sXG4gIC8vICAgR1VJREU6IHtcbiAgLy8gICAgIGNvbnRpbnVlOiBcIkNsaWNrIHRvIGNvbnRpbnVlXCIsXG4gIC8vICAgICB0aXAxOiBcIldlbGNvbWUgdG8gdGhlIE5hdGlvbmFsIEdhbWUhIEkgd2lsbCBleHBsYWluIHRvIHlvdSB0aGUgYmFzaWMgZnVuY3Rpb25zIG9mIHRoZSBnYW1lLiBQbGVhc2UgY2xpY2sgYW55d2hlcmUgb24gdGhlIHNjcmVlbiB0byBlbnRlciB0aGUgbmV4dCBzdGVwLlwiLFxuICAvLyAgICAgdGlwMjogXCJIZXJlIHlvdSBjYW4gbW9kaWZ5IHlvdXIgZ2FtZSBuaWNrbmFtZSBhbmQgcHJvZmlsZSBwaWN0dXJlLiBZb3UgY2FuIGFsc28gY2hlY2sgeW91ciBwZXJzb25hbCBpbmZvcm1hdGlvbi5cIixcbiAgLy8gICAgIHRpcDM6IFwiSGVyZSBpcyB5b3VyIGluZGl2aWR1YWwuIEludml0ZSBmcmllbmRzIHRvIGRvd25sb2FkLCB5b3Ugd2lsbCBnZXQgcmViYXRlcyFcIixcbiAgLy8gICAgIHRpcDQ6IFwiWW91IGNhbiBjaGVjayB0aGUgZnJpZW5kcyB5b3UgaW52aXRlZCwgYW5kIGdldCB5b3VyIGludml0YXRpb24gcmViYXRlIVwiLFxuICAvLyAgICAgdGlwNTogXCJZb3UgY2FuIGJ1eSBjaGlwcyBoZXJlIVwiLFxuICAvLyAgICAgdGlwNjogXCJDb21lIGFuZCBleHBlcmllbmNlIHRoZSBnYW1lIVwiLFxuXG4gIC8vICAgfVxuXG4gIC8vICAgTVNHX0JPWDoge1xuICAvLyAgICAgdGlwczogXCJUSVBTXCIsXG4gIC8vICAgICBDb25maXJtOiBcIkNvbmZpcm1cIixcbiAgLy8gICAgIENhbmNlbDogXCJDYW5jZWxcIlxuICAvLyAgIH0sXG4gIC8vICAgLy8gIOS9k+mqjOWcuuWkmui0p+W4geebuOWFs+ivreiogOWMhVxuICAvLyAgIEVYUEVSSUVOQ0VfRklFTEQ6IHtcbiAgLy8gICAgIC8vIOaPkOekuuetueeggeaVsOmHj1xuICAvLyAgICAgaGludENoaXBDb3VudDogXCJIZXJlIGlzIHlvdXIgY2hpcCBjb3VudO+8jHJlY2hhcmdlIHRvIGdldCBjaGlwc1wiLFxuICAvLyAgICAgLy8g5o+Q56S65YWF5YC8XG4gIC8vICAgICBoaW50UmVjaGFyZ2U6IFwiWW91IGhhdmUgbm8gY2hpcHMscmVjaGFyZ2UgdG8gZ2V0IGNoaXBzXCIsXG4gIC8vICAgICBOb0dvbGQ6IFwiWW91IGhhdmUgbm8gY2hpcHNcIixcbiAgLy8gICAgIC8vIOemgeatouaPkOeOsFxuICAvLyAgICAgQ2Fubm90V2l0aGRyYXc6IFwiWW91IGNhbiB3aXRoZHJhdyBjYXNoIGFmdGVyIGFueSByZWNoYXJnZVwiLFxuICAvLyAgICAgLy8g6LWg6YCB6YeR5biBXG4gIC8vICAgICBHaXZlR29sZDogXCJHaXZlIHlvdSB7MH0gZ29sZCBjb2lucywgcGxlYXNlIGtlZXAgdXAuIFwiLFxuICAvLyAgICAgLy8g5Ymp5L2Z5qyh5pWwXG4gIC8vICAgICByZXNpZHVlQ291bnQ6IFwiICh7MH0gcmVtYWluaW5nKVwiLFxuICAvLyAgICAgLy8g5YWz6Zet6YeR5biB5Zy66YCa55+lXG4gIC8vICAgICBjbG9zZUdvbGRGaWVsZE5vdGU6IFwiVGhlIGdvbGQgY29pbiBtYXJrZXQgaGFzIGJlZW4gY2xvc2VkIGFuZCB3aWxsIGVudGVyIHRoZSByZWFsIGdvbGQgbWFya2V0IGFmdGVyIHRoZSBlbmQgb2YgdGhlIGdhbWUuXCIsXG5cbiAgLy8gICAgIC8vIOWNs+Wwhui/m+WFpeecn+mHkeWcuumAmuefpVxuICAvLyAgICAgZW50ZXJSZWFsRmllbGQ6IGAgQ2xpY2sgT0sgdG8gZW50ZXIgdGhlIHJlYWwgZ29sZCBmaWVsZCEgXFxyXFxuTm93IHN0YXJ0IG91ciBqb3VybmV5IG9mIHJpY2ggZ3Jvd3RoIWAsXG5cbiAgLy8gICB9LFxuICAvLyAgIC8v5aW95Y+L5oi/XG4gIC8vICAgRlJJRU5EUk9PTToge1xuICAvLyAgICAgRGlzYmFuZFJvb206IFwiRGlzYmFuZCB0aGUgUm9vbVwiLFxuICAvLyAgICAgLy/oh6rlt7Hngrnlh7vop6PmlaPmiL/pl7Tmj5DnpLpcbiAgLy8gICAgIERpc2JhbmRSb29tRGVzYzE6IFwiVGhlIGdhbWUgaGFzIG5vdCBzdGFydGVkLCBkbyB5b3Ugd2FudCB0byBkaXNiYW5kIHRoZSByb29tP1wiLFxuICAvLyAgICAgLy/op6PmlaPmiL/pl7TlkI7lhbbku5bnjqnlrrbmj5DnpLpcbiAgLy8gICAgIERpc2JhbmRSb29tRGVzYzI6IFwiVGhlIHJvb20gaGFzIGJlZW4gZGlzYmFuZGVkLCBwbGVhc2UgY2xpY2sgQ29uZmlybSB0byBleGl0LlwiLFxuICAvLyAgICAgLy/miL/pl7TliLDkuoboh6rliqjop6PmlaNcbiAgLy8gICAgIERpc2JhbmRSb29tRGVzYzM6IFwiVGhlIHJvb20gdGltZW91dCBoYXMgbm90IHN0YXJ0ZWQgYW5kIGhhcyBiZWVuIGRpc2JhbmRlZC5cIixcbiAgLy8gICAgIC8v6KeC5oiY546p5a626Lii5Ye6XG4gIC8vICAgICBEaXNiYW5kUm9vbURlc2M0OiBcIldhdGNoaW5nIHRoZSBnYW1lIGlzIG5vdCBhbGxvd2VkIGluIHRoaXMgcm9vbSwgeW91IGhhdmUgbGVmdCB0aGUgcm9vbS5cIixcbiAgLy8gICAgIC8v6KKr6Lii5Ye65oi/6Ze0XG4gIC8vICAgICBLSUtFUk9PTTogXCJZb3UgaGF2ZSBqdXN0IGJlZW4ga2lja2VkIG91dCBvZiB0aGUgcHJpdmF0ZSByb29tLlwiLFxuICAvLyAgICAgLy/ouKLlh7rmiL/pl7RcbiAgLy8gICAgIEtJS0VST09NMjogJ0FyZSB5b3Ugc3VyZSB0byBraWNrIHswfSBvdXQgb2YgdGhlIHByaXZhdGUgcm9vbT8nLFxuICAvLyAgICAgLy/kuLvliqjpgIDlh7rmiL/pl7RcbiAgLy8gICAgIEV4aXRSb29tOiBcIkV4aXQgdGhlIFJvb21cIixcbiAgLy8gICAgIEV4aXRSb29tRGVzYzogXCJUaGUgZ2FtZSBpcyBhYm91dCB0byBzdGFydC4gRG8geW91IHdhbnQgdG8gZXhpdCB0aGUgcHJpdmF0ZSByb29tP1wiLFxuICAvLyAgICAgRXhpdFJvb21EZXNjMjogXCJEbyB5b3Ugd2FudCB0byBleGl0IHRoZSByb29tPyBBZnRlciBleGl0aW5nIHRoZSByb29tLCB5b3VyIGNsb2Nrd2lzZSBwbGF5ZXIgd2lsbCBiZWNvbWUgdGhlIG5ldyBob21lb3duZXIuXCIsXG4gIC8vICAgICBUb1JlY2hhcmdlOiBcIllvdSBkb27igJl0IGhhdmUgZW5vdWdoIGNoaXBzLiBEbyB5b3Ugd2FudCB0byByZWNoYXJnZSBub3c/XCIsXG4gIC8vICAgICBKb2luUm9vbUVycm9yOiBcIlJvb20gY29kZSBlbnRlciBlcnJvclwiLFxuICAvLyAgICAgQ29weVJvb21JbmZvU3VjY2VzczogXCIgQ29weSBzdWNjZXNzZnVsbHkhIFNlbmQgaXQgdG8geW91ciBmcmllbmRzIVwiLFxuICAvLyAgIH0sXG4gIC8vICAgVFVSTl9UQUJMRToge1xuICAvLyAgICAgQWRkcmVzc1N1Y2Nlc3M6IFwiVGhlIGFkZHJlc3MgaXMgZmlsbGVkIGluIHN1Y2Nlc3NmdWxseSwgcGxlYXNlIHdhaXQgcGF0aWVudGx5IGZvciB0aGUgcHJpemUgdG8gYmUgaXNzdWVkIVwiXG4gIC8vICAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOemj+WIqeS4reW/g1xuICAvLyAgICAqL1xuICAvLyAgIFdlbGZhcmVDZW50ZXI6IHtcbiAgLy8gICAgIG5vVGlwOiBcIk5vIEFjdGl2aXR5XCJcbiAgLy8gICB9LFxuXG4gIC8vICAgVG91cm5hbWVudDoge1xuICAvLyAgICAgQ2xvc2VUb3VybmFtZW50OiBcIkFyZSB5b3Ugc3VyZSB0byBjbG9zZSB0aGlzIHRvdXJuYW1lbnQ/IFRoZSBwYWlkIGZlZSB3aWxsIGJlIHJlZnVuZGVkIGFmdGVyIGRlbGV0aW9uLlwiLFxuICAvLyAgICAgTm90aWNlVG91cm5hbWVudFRleHQ6IFwiPGNvbG9yPSNGRURGRTU+VGhlIGNvbXBldGl0aW9uIHlvdSBzaWduZWQgdXAgZm9yIHdpbGwgc3RhcnQgaW4gPC9jPjxjb2xvcj0jRkZFNTNBPjxzaXplID0gMzA+IHswfSA8L3NpemU+PC9jb2xvcj48Y29sb3I9I0ZFREZFNT5zZWNvbmRzLlxcbklmIHlvdSBkbyBub3QgcGFydGljaXBhdGUsIGl0IGlzIGNvbnNpZGVyZWQgYSB3YWl2ZXIhIDwvYz5cIixcbiAgLy8gICAgIExlYXZlVG91cm5hbWVudDogXCJEbyB5b3UgZ2l2ZSB1cCB0aGUgZ2FtZT8gTm8gcmV3YXJkcyB3aWxsIGJlIG9idGFpbmVkIGFmdGVyIGdpdmluZyB1cCFcIixcbiAgLy8gICAgIE5vdE9wZW46IFwiTm90IG9wZW4geWV0LCBwbGVhc2Ugd2FpdCBwYXRpZW50bHkuXCIsXG4gIC8vICAgICBTZWxlY3RHYW1lOiBcIlBsZWFzZSBzZWxlY3QgYSBnYW1lXCIsXG4gIC8vICAgICBFbnRlckNvcnJlY3RQYXNzd29yZDogXCJQbGVhc2UgZW50ZXIgdGhlIGNvcnJlY3QgcGFzc3dvcmRcIixcbiAgLy8gICAgIE5vdFRvdXJuYW1lbnQ6IFwiVG91cm5hbWVudCBkb2VzIG5vdCBleGlzdC5cIixcbiAgLy8gICAgIFNpZ25TdWNjZXNzZnVsbHk6IFwiU2lnbiB1cCBzdWNjZXNzZnVsbHlcIixcbiAgLy8gICAgIEluY29tcGxldGU6IFwiSW5jb21wbGV0ZSBkYXRhLCBwbGVhc2UgY29udGludWUgdG8gZmlsbCBpblwiLFxuICAvLyAgICAgTXlUb3VybmFtZW50VGlwMTogXCJhYm91dCB0byBzdGFydFwiLFxuICAvLyAgICAgTXlUb3VybmFtZW50VGlwMjogXCJpbiBwcm9ncmVzc1wiLFxuICAvLyAgICAgTXlUb3VybmFtZW50VGlwMzogXCJpdCBoYXMgZW5kZWRcIixcbiAgLy8gICAgIE15VG91cm5hbWVudFRpcDQ6IFwiQ2xvc2VkXCIsXG4gIC8vICAgICBNeVRvdXJuYW1lbnRUaXA1OiBcIkRpc2JhbmRlZCBkdWUgdG8gaW5zdWZmaWNpZW50IG51bWJlcnNcIixcbiAgLy8gICAgIE15VG91cm5hbWVudFRpcDY6IFwiQWJhbmRvbmVkIHRoZSB0b3VybmFtZW50XCIsXG4gIC8vICAgICBNeVRvdXJuYW1lbnRQZW9wbGU6IFwiU3RhcnQgYWZ0ZXIgezB9IHBlb3BsZVwiLFxuICAvLyAgICAgcGFzc3dvcmRXb25nOiBcIndyb25nIFBhc3N3b3JkXCIsXG4gIC8vICAgICBBbW91bnRXb25nOiBcIndyb25nIEFtb3VudFwiLFxuICAvLyAgICAgQ2xvc2VkOiBcIlRoaXMgdG91cm5hbWVudCB7MH0gaGFzIGJlZW4gZGlzYmFuZGVkIGJ5IGl0cyBjcmVhdG9yXCIsXG4gIC8vICAgICBUb3VybmFtZW50T3ZlcjogXCJUaGUgbnVtYmVyIG9mIHBhcnRpY2lwYW50cyBpcyBpbnN1ZmZpY2llbnQgYW5kIHRoZSB0b3VybmFtZW50IGlzIG92ZXIuIFRoZSBjaGlwcyB5b3UgcGFpZCB3aWxsIGJlIHJldHVybmVkLlwiLFxuICAvLyAgIH0sXG5cblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g5Lul5LiK5piv5pW05Liq5YyF5L+u5pS55a6M55u05o6l5Yig6Zmk5o6JIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIFBhZ2VOYW1lOiB7XG4gICAgLy8gQ3Jhc2gg5ri45oiP6aG1XG4gICAgTG9yZW1JcHN1bTogXCJMb3JlbSBJcHN1bVwiLFxuICB9LFxuXG4gIFdhaXRpbmc6IHtcbiAgICAvLyDmraPlnKjov5vlhaXmuLjmiI8s6K+356iN5ZCOLi4uXG4gICAgRW50ZXJHYW1lOiBcIkVudGVyaW5nIGdhbWUsIHBsZWFzZSBob2xkLi4uXCIsXG4gIH0sXG5cbiAgVGlwczoge1xuICAgIC8vIOeZu+W9lei0puWPt1xuICAgIFNpbGFrYW5NYXN1azogXCJTaWxha2FuIE1hc3VrXCIsXG4gICAgLy8g5ri45oiP5Yqg6L295Lit77yM6K+35Zyo5a6M5oiQ5ZCO5YaN5qyh5bCd6K+VXG4gICAgR2FtZUlzTG9hZGluZzogXCJUaGUgZ2FtZSBpcyBsb2FkaW5nLCBwbGVhc2UgdHJ5IGFnYWluIHdoZW4gZmluaXNoZWRcIixcbiAgICAvLyDor7fovpPlhaXkuIvms6jph5Hpop1cbiAgICBJbnB1dEJldEdvbGQ6IFwiTWFzdWtrYW4gSnVtbGFoIFRhcnVoYW4gezB9LXsxfVwiLFxuICAgIC8vIOWkjeWItuaIkOWKn1xuICAgIENvcHlTdWNjZXNzOiBcIlNhbGluIGJlcmhhc2lsXCIsXG4gICAgLy8g5LuK5pel5Lu75Yqh5aWW5Yqx5bey6aKG5Y+WXG4gICAgQm9udXNBbHJlYWR5UmVjZWl2ZWQ6IFwiSGFkaWFoIG1pc2kgaGFyaSBpbmkgdGVsYWggZGl0ZXJpbWFcIixcbiAgICAvLyDor7fnu5Hlrprpgq7nrrFcbiAgICBQbGVhc2VCaW5kWW91ckVtYWlsOiBcIlRvbG9uZyBpa2F0IGVtYWlsIEFuZGFcIixcbiAgICAvLyDlrozmiJDku7vmhI/kuIDlsYDmuLjmiI/ljbPlj6/pooblj5ZcbiAgICBDb21wbGV0ZUFueUdhbWVUb0dldEl0OiBcIlNlbGVzYWlrYW4gZ2FtZSBhcGEgc2FqYSB1bnR1ayBtZW5kYXBhdGthbm55YVwiLFxuICB9LFxuXG4gIEVyckNvZGU6IHtcbiAgICAvL+eZu+W9lemUmeivr1xuICAgIDMwMDAwMjogXCJrZXNhbGFoYW4gbWFzdWtcIixcbiAgICAvL+mHjeWkjeiwg+eUqFxuICAgIDMwMDAwMzogXCJwYW5nZ2lsYW4gYmVydWxhbmdcIixcbiAgICAvL+eZu+W9leiiq+mYu+atolxuICAgIDMwMDAwNDogXCJMb2dpbiBkaWJsb2tpclwiLFxuICAgIC8v6L+b5YWl5ri45oiP5aSx6LSlXG4gICAgMzAwMDA1OiBcIkdhZ2FsIG1lbWFzdWtpIHBlcm1haW5hblwiLFxuICAgIC8v6LSm5Y+35pWw5o2u5byC5bi4XG4gICAgMzAwMDA2OiBcIkRhdGEgYWt1biB0aWRhayBub3JtYWxcIixcbiAgICAvL+i0puWPt+aVsOaNrueKtuaAgeW8guW4uFxuICAgIDMwMDAwNzogXCJTdGF0dXMgZGF0YSBha3VuIHRpZGFrIG5vcm1hbFwiLFxuICAgIC8v5ri45oiP5rKh5pyJ55m75b2VXG4gICAgMzAwMDA4OiBcIkdhbWUgdGlkYWsgbWFzdWtcIixcbiAgICAvL+mcgOimgemHjeaWsOi/m+WFpVxuICAgIDMwMDAwOTogXCJwZXJsdSBtYXN1ayBrZW1iYWxpXCIsXG4gICAgLy/lvZPliY3nirbmgIHkuI3og73kuIvms6hcbiAgICAzMDAwMTA6IFwiS2VhZGFhbiBzYWF0IGluaSB0aWRhayBiaXNhIGJlcnRhcnVoXCIsXG4gICAgLy/kuIvms6jph5HluIHplJnor69cbiAgICAzMDAwMTE6IFwia29pbiB0YXJ1aGFuIHNhbGFoXCIsXG4gICAgLy8g5re75Yqg6K6i6ZiF5aSx6LSlXG4gICAgMzAwMDEyOiBcIkdhZ2FsIG1lbmFtYmFoa2FuIGxhbmdnYW5hblwiLFxuICAgIC8vIENyYXNo6Ieq5Yqo5oq85rOo6ZmQ5Y6LXG4gICAgMzAwMDEzOiBcIkJhdGFzIHRla2FuYW4gdGFydWhhbiBvdG9tYXRpcyBjcmFzaFwiLFxuICAgIC8vIOS4i+azqOasoeaVsOmZkOWItlxuICAgIDMwMDAxNDogXCJiYXRhcyB0YXJ1aGFuXCIsXG4gICAgLy8g5LiN5YWB6K645re75Yqg6Ieq5Yqo5LiL5rOoXG4gICAgMzAwMDE1OiBcIk1lbmFtYmFoa2FuIHRhcnVoYW4gb3RvbWF0aXMgdGlkYWsgZGlwZXJib2xlaGthblwiLFxuICAgIC8vIENyYXNo6Ieq5Yqo5LiL5rOo5q2i5o2fXG4gICAgMzAwMDE2OiBcIkNyYXNoIHNlY2FyYSBvdG9tYXRpcyBiZXJ0YXJ1aCBzdG9wIGxvc3NcIixcbiAgICAvLyBDcmFzaOiHquWKqOS4i+azqOatouebiFxuICAgIDMwMDAxNzogXCJDcmFzaCBvdG9tYXRpcyBiZXJ0YXJ1aCB0YWtlIHByb2ZpdFwiLFxuICAgIC8vIENyYXNo6Ieq5Yqo5LiL5rOo5a6M5oiQXG4gICAgMzAwMDE4OiBcIlRhcnVoYW4gY3Jhc2ggb3RvbWF0aXMgc2VsZXNhaVwiLFxuICAgIC8vIENyYXNo5Y+W5raI5LiL5rOo5aSx6LSl77yM5LiN5a2Y5ZyoXG4gICAgMzAwMDE5OiBcIktlY2VsYWthYW4gdW5iZXQgZ2FnYWwsIHRpZGFrIGFkYVwiLFxuICAgIC8vIOmHjeWkjea3u+WKoOiuoumYhVxuICAgIDMwMDAyMDogXCJVbGFuZ2kgdW50dWsgbWVuYW1iYWhrYW4gbGFuZ2dhbmFuXCIsXG4gICAgLy8g6I635Y+WaGFzaOiusOW9leWPguaVsOmUmeivr1xuICAgIDMwMDAyMTogXCJEYXBhdGthbiBrZXNhbGFoYW4gcGFyYW1ldGVyIGNhdGF0YW4gaGFzaFwiLFxuICAgIC8vIOiOt+WPlmhhc2jorrDlvZXkuI3lrZjlnKhcbiAgICAzMDAwMjI6IFwiRGFwYXRrYW4gY2F0YXRhbiBoYXNoIHRpZGFrIGFkYVwiLFxuICAgIC8vIOaXoOaViOeahFRva2VuXG4gICAgMzAwMDIzOiBcIlRva2VuIFRpZGFrIFZhbGlkXCIsXG4gICAgLy8g55m75Ye65aSx6LSlXG4gICAgMzAwMDI0OiBcIkxvZ291dCBnYWdhbFwiLFxuICAgIC8vIOS9memineS4jei2s1xuICAgIDMwMDAyNTogXCJTYWxkbyB0aWRhayBtZW5jdWt1cGlcIixcbiAgICAvLyDlhYXlgLzlpLHotKVcbiAgICAzMDAwMjY6IFwiSXNpIHVsYW5nIGdhZ2FsXCIsXG4gICAgLy8g5o+Q546w5aSx6LSlXG4gICAgMzAwMDI3OiBcIlBlbmFyaWthbiBnYWdhbFwiLFxuICAgIC8vIOiOt+WPlumTtuihjOWNoeWIl+ihqOWksei0pVxuICAgIDMwMDAyODogXCJHYWdhbCBtZW5kYXBhdGthbiBkYWZ0YXIga2FydHUgYmFua1wiLFxuICAgIC8vIOetvuWIsOWksei0pVxuICAgIDMwMDAyOTogXCJHYWdhbCBtYXN1a1wiLFxuICAgIC8vIOaXoOaViOeahOaJi+acuuWPt+aIlumCrueusVxuICAgIDMwMDAzMDogXCJOb21vciB0ZWxlcG9uIGF0YXUgZW1haWwgdGlkYWsgdmFsaWRcIixcbiAgICAvLyDlj4LmlbDplJnor69cbiAgICAzMDAwMzE6IFwiS2VzYWxhaGFuIHBhcmFtZXRlclwiLFxuICAgIC8vIOaXoOaViOeahOmqjOivgeeggVxuICAgIDMwMDAzMjogXCJLb2RlIHZlcmlmaWthc2kgdGlkYWsgYmVuYXJcIixcbiAgICAvLyDmiYvmnLrlj7flt7LlrZjlnKhcbiAgICAzMDAwMzM6IFwiTm9tb3IgdGVsZXBvbiBzdWRhaCBhZGFcIixcbiAgICAvLyDpgq7nrrHlt7LlrZjlnKhcbiAgICAzMDAwMzQ6IFwiRW1haWwgc3VkYWggYWRhXCIsXG4gICAgLy8gaW1laeW3suWtmOWcqFxuICAgIDMwMDAzNTogXCJpbWVpIHN1ZGFoIGFkYVwiLFxuICAgIC8vIOazqOWGjOWksei0pVxuICAgIDMwMDAzNjogXCJyZWdpc3RyYXNpIGdhZ2FsXCIsXG4gICAgLy8g6YeN572u5a+G56CB5aSx6LSlXG4gICAgMzAwMDM3OiBcIkdhZ2FsIG1lbnlldGVsIHVsYW5nIHNhbmRpXCIsXG4gICAgLy8g546p5bCP5ri45oiP5aSx6LSlXG4gICAgMzAwMDM4OiBcIkdhZ2FsIG1lbWFpbmthbiBtaW5pLWdhbWVcIixcbiAgfSxcblxuICAvKipcbiAgKiDovpPlhaXmoYbmo4Dmn6VcbiAgKi9cbiAgRURJVEJPWDoge1xuICAgIE5JQ0tOQU1FTlVMTDogXCJQbGVhc2UgZW50ZXIgbmlja25hbWUhXCIsXG4gICAgVkVSSUZJTlVMTDogXCJQbGVhc2UgZW50ZXIgdmVyaWZpY2F0aW9uIGNvZGVcIixcbiAgICBQSE9ORU5VTEw6IFwiUGxlYXNlIGVudGVyIHBob25lIG51bWJlclwiLFxuICAgIEVNQUlMTlVMTDogXCJQbGVhc2UgZW50ZXIgZW1haWwgbnVtYmVyXCIsXG4gICAgUEhPTkVUWVBFRVJSOiBcIldyb25nIHBob25lIG51bWJlciBmb3JtYXRcIixcbiAgICBQU1dOVUxMOiBcIlBsZWFzZSBlbnRlciBjb2RlXCIsXG4gICAgUFNXV1JPTkdGVUw6IFwiQ29kZSBjb250YWlucyBhZGRpdGlvbmFsIGNoYXJhY3RlciwgcGxlYXNlIHJlLWVudGVyXCIsXG4gICAgUFNXQ09GQUlMOiBcIlR3byBjb2RlcyB5b3UgZW50ZXJlZCBhcmUgZGlmZmVyZW50LCBwbGVhc2UgcmUtZW50ZXJcIixcbiAgICBORVdQU1dOVUxMOiBcIlBsZWFzZSBlbnRlciBuZXcgY29kZVwiLFxuICAgIE5FV1BTV1dST05HRlVMOiBcIk5ldyBjb2RlIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2hhcmFjdGVycywgcGxlYXNlIHJlLWVudGVyXCIsXG4gICAgQ09ORklSTVBTV05VTEw6IFwiVHdvIGNvZGVzIHlvdSBlbnRlcmVkIGFyZSBkaWZmZXJlbnQscGxlYXNlIHJlLWVudGVyLlwiLFxuICAgIENPTkZJUk1QU1dXUk9OR0ZVTDogXCJUd28gY29kZXMgeW91IGVudGVyZWQgYXJlIGRpZmZlcmVudCxwbGVhc2UgcmUtZW50ZXIuXCIsXG4gICAgT0xETkVXUFNXRVFVQUxTOiBcIk5ldyBjb2RlIGlzIHNhbWUgd2l0aCBvbGQgb25lLGZhaWxlZCB0byBtb2RpZnkuXCIsXG4gICAgQkFOS1BTV05VTEw6IFwiUGxlYXNlIGVudGVyIGJhbmsgYWNjb3VudCBwYXNzd29yZFwiLFxuICAgIEJBTktQU1dGQUlMOiBcIldyb25nIGJhbmsgYWNjb3VudCBwYXNzd29yZFwiLFxuICAgIFBTRExFTkdUSEVSUk9FOiBcIldyb25nIHBhc3N3b3JkIGxlbmd0aCEgUGxlYXNlIGVudGVyIDYtMTIgY2hhcmFjdGVycyFcIixcbiAgICBVSVBJRDogXCJQbGVhc2UgZW50ZXIgQmFuayBhY2NvdW50IG51bWJlclwiLFxuICAgIFVTRVJOQU1FOiBcIlBsZWFzZSBlbnRlciBSZWNlaXZlciBOYW1lXCIsXG4gICAgQkFOS05BTUU6IFwiUGxlYXNlIGVudGVyIEJhbmsgTmFtZVwiLFxuICAgIElGU0M6IFwiUGxlYXNlIGVudGVyIEFjY291bnRzIEJhbmsgXCIsXG4gICAgQkFOS1RJWFVBTkFNT1VOVDogXCJQbGVhc2UgZW5zdXJlIHRoYXQgIFdpdGhkcmF3YWwgYW1vdW50IGVudGVyZWQgY29ycmVjdGx5XCIsXG4gICAgQUREUkVTU05VTEw6IFwiUGxlYXNlIGVudGVyIGFkZHJlc3MgbnVtYmVyXCIsXG4gIH0sXG5cbiAgLy8g5YWs5YWxXG4gIENvbW1vbjoge1xuICAgIC8vIOayoeacieaVsOaNrlxuICAgIE5vRGF0YTogXCJVcHMhIEJlbHVtIGFkYSBkYXRhIVwiLFxuICB9LFxuXG5cbiAgLy8g5o6o5bm/XG4gIFByb21vdGlvbjoge1xuICAgIC8vIOaOqOW5v1xuICAgIGxhYlBhZ2VOYW1lOiBcIlJlZmVyZW5zaVwiLFxuICAgIC8vIOaOqOW5v+etiee6p1xuICAgIGxhYkxldmVsVGl0bGU6IFwiUmFzaW8gcmViYXRlIEFuZGFcIixcbiAgICAvLyDmjqjlub/noIFcbiAgICBsYWJJbnZpdGF0aW9uQ29kZVRpdGxlOiBcIktvZGUgQW5kYVwiLFxuICAgIC8vIOaOqOW5v+mTvuaOpVxuICAgIGxhYkludml0YXRpb25VcmxUaXRsZTogXCJUYXV0YW4gUmVmZXJlbnNpIEFuZGFcIixcbiAgICAvLyDmjqjlub/nu5/orqHmlbDmja5cbiAgICBsYWJTdGF0VGl0bGU6IFwiUmluZ2thc2FuIGRhdGFcIixcbiAgICAvLyDmgLvmjqjlub/mlLblhaVcbiAgICBsYWJUb3RhbEdvbGRUaXRsZTogXCJQZW5naGFzaWxhbiB0b3RhbFwiLFxuICAgIC8vIOaAu+aOqOW5v+aPkOeOsFxuICAgIGxhYldpdGhkcmF3R29sZFRpdGxlOiBcIkp1bWxhaCBwZW5hcmlrYW5cIixcbiAgICAvLyDmmKjml6Xmjqjlub/mlLblhaVcbiAgICBsYWJZZXN0ZXJkYXlHb2xkVGl0bGU6IFwiUGVuZ2hhc2lsYW4ga2VtYXJpblwiLFxuICAgIC8vIOaYqOaXpemCgOivt+S6uuaVsFxuICAgIGxhYlllc3RlcmRheUludml0YXRpb25UaXRsZTogXCJEaXVuZGFuZyBrZW1hcmluXCIsXG4gICAgLy8g5oC76YKA6K+35Lq65pWwXG4gICAgbGFiQWxsSW52aXRhdGlvblRpdGxlOiBcIlNlbXVhIGRpdW5kYW5nXCIsXG4gICAgLy8g5pWw5o2u5pyA5ZCO5pu05paw5pe26Ze0XG4gICAgbGFiVXBkYXRlRGF0ZTogXCJQZXJiYXJ1aSB3YWt0dTogezB9XCIsXG4gICAgLy8g5o6o5bm/5pS25YWl5Y6G5Y+yXG4gICAgbGFiR29sZEdyYXBoVGl0bGU6IFwiUml3YXlhdCBQZW5kYXBhdGFuIEFuZGFcIixcbiAgICAvLyDmjqjlub/kurrmlbDljoblj7JcbiAgICBsYWJJbnZpdGF0aW9uR3JhcGhUaXRsZTogXCJSaXdheWF0IFJlZmVyZW5zaSBBbmRhXCIsXG4gICAgLy8g5o6o5bm/5pS25YWl5o6S5ZCNXG4gICAgbGFiUmFua1RpdGxlOiBcIk1pdHJhIHV0YW1hIGthbWlcIixcbiAgICAvLyDph5HluIFcbiAgICBScEdvbGQ6IFwiUlAgezB9XCIsXG4gICAgLy8g5oiQ5Li65oiR5Lus55qE5ZCI5L2c5LyZ5Ly0XG4gICAgbGFiQ29sbGFib3JhdGVUaXRsZTogXCJNZW5qYWRpIHBhcnRuZXIga2FtaVwiLFxuICAgIC8vIOaIkOS4uuaIkeS7rOeahOWQiOS9nOS8meS8tOWQju+8jOaCqOWwhuS6q+WPl+mrmOmineWbnuaKpeOAgiDlkIzml7bvvIzloavlhpnmgqjnmoTmjqjojZDnoIHnmoTmnIvlj4vov5jlj6/ku6Xojrflvpfpop3lpJbnmoTms6jlhozlkozlhYXlgLzlpZblirHjgIJcbiAgICBsYWJDb2xsYWJvcmF0ZUNvbnRlbnQ6IFwiQWZ0ZXIgYmVjb21pbmcgb3VyIHBhcnRuZXIsIHlvdSB3aWxsIGVuam95IGhpZ2ggcmV3YXJkcy4gQXQgdGhlIHNhbWUgdGltZSwgZnJpZW5kcyB3aG8gZmlsbCBpbiB5b3VyIHJlZmVycmFsIGNvZGUgY2FuIGFsc28gZ2V0IGFkZGl0aW9uYWwgcmVnaXN0cmF0aW9uIGFuZCByZWNoYXJnZSByZXdhcmRzLlwiLFxuICAgIC8vIOeri+WNs+iOt+WPluaCqOeahOS4k+WxnuaOqOiNkOeggVxuICAgIGxhYkdldEludml0YXRpb25Db250ZW50OiBcIkRhcGF0a2FuIGtvZGUgcmVmZXJlbnNpIGVrc2tsdXNpZiBBbmRhIHNla2FyYW5nXCIsXG4gICAgLy8g6IO96I635b6X5aSa5bCR5aWW5YqxXG4gICAgbGFiR290QXdhcmRUaXRsZTogXCJCZXJhcGEgYmFueWFrIGhhZGlhaCB5YW5nIGJpc2EgYW5kYSBkYXBhdGthbj9cIixcbiAgICAvLyDkuI3lkIznuqfliKvnmoTmjqjlub/ogIXvvIzmiJHku6zmj5DkvpvkuI3lkIznuqfliKvnmoTlpZblirHku6XpvJPlirHmjqjlub9cbiAgICBsYWJMZXZlbENvbnRlbnQ6IFwiVGluZ2thdCBwcm9tb3RvciB5YW5nIGJlcmJlZGEsIGthbWkgbWVtYmVyaWthbiB0aW5na2F0IHBlbmdoYXJnYWFuIHlhbmcgYmVyYmVkYSB1bnR1ayBtZW5kb3JvbmcgcHJvbW9zaVwiLFxuICAgIC8vIOmHkeeJjOaOqOW5v1xuICAgIGxhYkxldmVsVGl0bGUwOiBcIlByb21vdG9yIEVtYXNcIixcbiAgICAvLyDpnIDopoHmjqjlub/ovr7liLAxMDAw5Lq677yM55uI5Yip6L6+5YiwIDEwMDAwMDAwMFxuICAgIGxhYkxldmVsQ29udGVudDA6IFwiUHJvbW9zaSB0aW5na2F0IDEgbWVuY2FwYWkgMTAwMCBvcmFuZywgdW50dW5nIG1lbmNhcGFpIFJwMTAwMDAwMDAwXCIsXG4gICAgLy8g6ZO254mM5o6o5bm/XG4gICAgbGFiTGV2ZWxUaXRsZTE6IFwiUHJvbW90b3IgcGVyYWtcIixcbiAgICAvLyDpnIDopoHmjqjlub/ovr7liLAxMDDkurrvvIznm4jliKnovr7liLAgMTAwMDAwMDBcbiAgICBsYWJMZXZlbENvbnRlbnQxOiBcIlByb21vc2kgdGluZ2thdCAyIG1lbmNhcGFpIDEwMCBvcmFuZywgdW50dW5nIG1lbmNhcGFpIFJwMTAwMDAwMDBcIixcbiAgICAvLyDpk5zniYzmjqjlub9cbiAgICBsYWJMZXZlbFRpdGxlMjogXCJQcm9tb3RvciBwZXJ1bmdndVwiLFxuICAgIC8vIOaXoOmcgOaxglxuICAgIGxhYkxldmVsQ29udGVudDI6IFwiVGlkYWsgYWRhIHBlcnN5YXJhdGFuXCIsXG4gICAgLy8g5oKo5Lya5aaC5L2V6I635b6X5aWW5YqxXG4gICAgbGFiQXdhcmRUaXRsZTogXCJCYWdhaW1hbmEgbWVtYmVyaSBBbmRhIHBlbmdoYXJnYWFuID9cIixcbiAgICAvLyDmgqjnmoTmnIvlj4vnjqnmuLjmiI/lkI7vvIzmiJHku6zkvJrmoLnmja7kvaDnmoTnrYnnuqfliIbkuqvku5botZrliLDnmoTliKnmtqbnu5nkvaBcbiAgICBsYWJBd2FyZENvbnRlbnQ6IFwiU2V0ZWxhaCB0ZW1hbiBBbmRhIG1lbWFpbmthbiBnYW1lIHRlcnNlYnV0LCBrYW1pIGFrYW4gbWVtYmFnaSBrZXVudHVuZ2FuIHlhbmcgZGlhIGhhc2lsa2FuIGtlcGFkYSBBbmRhIHNlc3VhaSBkZW5nYW4gbGV2ZWwgQW5kYVwiLFxuICAgIC8vIOaCqOeahOS9o+mHkVxuICAgIGxhYkJyb2tlcmFnZVRpdGxlOiBcIllvdXIgY29tbWlzc2lvblwiLFxuICAgIC8vIOaCqOaci+WPi+eahOWIqea2psK35oq95rC0wrdcbiAgICBsYWJCcm9rZXJhZ2VDb250ZW50OiBcIktldW50dW5nYW4gdGVtYW4gYW5kYcK3SG91c2UgZWRnZcK3IFwiLFxuICAgIC8vIOW8gOWni+i1mumSsVxuICAgIGxhYkxvZ2luOiBcIk11bGFpIE1lbmdoYXNpbGthblwiLFxuICAgIC8vIOeUseS6juiuoeeul+mHj+Wkp++8jOezu+e7n+S8muavj+WkqeabtOaWsOS4gOasoeaVsOaNru+8jOaCqOWPr+S7peavj+Wkqeafpeeci+aYqOWkqeeahOaVsOaNrlxuICAgIHByb21vdGlvblVwZGF0ZURhdGVUaXBzOiBcIkthcmVuYSBiYW55YWtueWEgcGVuZ2hpdHVuZ2FuLCBzaXN0ZW0gYWthbiBtZW1wZXJiYXJ1aSBkYXRhIHNla2FsaSBzZWhhbiwgZGFuIEFuZGEgZGFwYXQgbWVsaWhhdCBkYXRhIGtlbWFyaW4gc2V0aWFwIGhhcmkuXCIsXG4gIH0sXG5cbiAgTWluaWdhbWU6IHtcbiAgICAvLyDop4blm77lkI1cbiAgICBsYWJQYWdlTmFtZTogXCJCZXJwdXRhclwiLFxuICAgIC8vIOmHkeW4gVxuICAgIFJwR29sZDogXCJSUCB7MH1cIixcbiAgICAvLyDku7vliqFcbiAgICBsYWJUYXNrVGl0bGU6IFwiUGVyc3lhcmF0YW5cIixcbiAgICAvLyDpgq7nrrHnu5Hlrprmj4/ov7BcbiAgICBsYWJUYXNrRGVzYzA6IFwiMS5NZW5naWthdCBlbWFpbCBBbmRhXCIsXG4gICAgLy8g57uR5a6a6YKu566xXG4gICAgbGFiQmluZEVtYWlsOiBcIlBlcmdpIG1lbmdpa2F0XCIsXG4gICAgLy8g5a6M5oiQ5LiA5bGA5ri45oiP5o+P6L+wXG4gICAgbGFiVGFza0Rlc2MxOiBcIjIuQmVybWFpbiBzYXR1IGthbGkgcHV0YXJhbiBwZW1haW5hblwiLFxuICAgIC8vIOWllumHkVxuICAgIGxhYkJvbnVzVGl0bGU6IFwiTHNpXCIsXG4gICAgLy8g5aWW6YeR5o+P6L+wXG4gICAgbGFiQm9udXNUaXBzOiBcIkJ1bm9zIGhhcmlhbiBoaW5nZ2FcIixcbiAgfVxuXG59Il19