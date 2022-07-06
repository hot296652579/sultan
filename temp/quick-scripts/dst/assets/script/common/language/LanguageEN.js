
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageEN.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '68bedXgXqhAR6OQN4AqyK+p', 'LanguageEN');
// script/common/language/LanguageEN.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageEN = void 0;
exports.LanguageEN = {
    language: cc.sys.LANGUAGE_ENGLISH,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlRU4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVcsUUFBQSxVQUFVLEdBQUc7SUFFdEIsUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO0lBQ2pDOztNQUVFO0lBQ0YsS0FBSyxFQUFFO1FBQ0wsV0FBVyxFQUFFLGFBQWE7UUFDMUIsU0FBUyxFQUFFLFlBQVk7UUFDdkIsYUFBYSxFQUFFLGdCQUFnQjtRQUMvQixPQUFPLEVBQUUsV0FBVztRQUNwQixTQUFTLEVBQUUsUUFBUTtRQUNuQixZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxRQUFRO1FBQ25CLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7SUFDRCxTQUFTLEVBQUU7UUFDVCxTQUFTLEVBQUUsWUFBWTtRQUN2QixLQUFLLEVBQUUsV0FBVztRQUNsQixNQUFNLEVBQUUsUUFBUTtRQUNoQixTQUFTLEVBQUUsZ0JBQWdCO0tBQzVCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsYUFBYSxFQUFFLGdCQUFnQjtRQUMvQixLQUFLLEVBQUUsT0FBTztRQUNkLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLEdBQUcsRUFBRSxLQUFLO0tBQ1g7SUFDRCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsT0FBTztRQUNkLFdBQVcsRUFBRSxhQUFhO1FBQzFCLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLFdBQVc7UUFDdEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsa0JBQWtCLEVBQUUsa0JBQWtCO1FBQ3RDLGtCQUFrQixFQUFFLG9CQUFvQjtRQUN4QyxnQkFBZ0IsRUFBRSxtQkFBbUI7UUFDckMsZUFBZSxFQUFFLG1CQUFtQjtRQUNwQyxlQUFlLEVBQUUsbUJBQW1CO1FBQ3BDLFFBQVEs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LGdCQUFnQjtRQUM5QixXQUFXO1FBQ1gsWUFBWSxFQUFFLHNDQUFzQztRQUNwRCxLQUFLO1FBQ0wsYUFBYSxFQUFFLEtBQUs7UUFDcEIsT0FBTztRQUNQLFlBQVksRUFBRSxxQkFBcUI7S0FDcEM7Q0FFRixDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGxldCBMYW5ndWFnZUVOID0ge1xuXG4gIGxhbmd1YWdlOiBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCxcbiAgLyoqXG4gICog5qCH6aKY5pi+56S6XG4gICovXG4gIFRJVExFOiB7XG4gICAgSE9UVEVTVEdBTUU6IFwiSG90dGVzIEdhbWVcIixcbiAgICBMQVRFU1RCRVQ6IFwiTGF0ZXN0IEJldFwiLFxuICAgIEJJR0dFU1RXSU5ORVI6IFwiQmlnZ2VzdCBXaW5uZXJcIixcbiAgICBMQUJHQU1FOiAnUGVybWFpbmFuJyxcbiAgICBMQUJQTEFZRVI6ICdQZW1haW4nLFxuICAgIExBQkJFVEFNT1VOVDogJ0p1bWxhaCBUYXJ1aGFuJyxcbiAgICBMQUJEQUlMWTogJ0RhaWx5JyxcbiAgICBMQUJXRUVLTFk6ICdXZWVrbHknLFxuICAgIExBQkFMTDogJ0FsbCdcbiAgfSxcbiAgQkVUX1RJVExFOiB7XG4gICAgTEFURVNUQkVUOiBcIkxhdGVzdCBCZXRcIixcbiAgICBHQU1FUzogXCJQZXJtYWluYW5cIixcbiAgICBQTEFZRVI6IFwiUGVtYWluXCIsXG4gICAgQkVUQU1PVU5UOiBcIkp1bWxhaCBUYXJ1aGFuXCIsXG4gIH0sXG4gIEJJR0dFU1RXSU5ORVI6IHtcbiAgICBCSUdHRVNUV0lOTkVSOiBcIkJpZ2dlc3QgV2lubmVyXCIsXG4gICAgREFJTFk6IFwiRGFpbHlcIixcbiAgICBXRUVLTFk6IFwiV2Vla2x5XCIsXG4gICAgQUxMOiBcIkFsbFwiLFxuICB9LFxuICBBS1VOX1RJVExFOiB7XG4gICAgUFJPRklMRTogXCJQcm9maWxlXCIsXG4gICAgUkFOS0lORzogXCJSYW5raW5nXCIsXG4gICAgR0FNRVM6IFwiR2FtZXNcIixcbiAgICBJTlRFR1JBVElPTjogXCJJbnRlZ3JhdGlvblwiLFxuICAgIFVTRUQ6IFwiVXNlZFwiLFxuICAgIFJFRkVSRU5DRTogXCJSZWZlcmVuY2VcIixcbiAgICBBUlJBTkdFOiBcIkFycmFuZ2VcIixcbiAgICBFTUFJTF9WRVJJRklDQVRJT046IFwiVmVyaWZpa2FzbCBFbWFpbFwiLFxuICAgIFBIT05FX1ZFUklGSUNBVElPTjogXCJWZXJpZmlrYXNsIFRlbGVwb25cIixcbiAgICBTRUNVUklUWV9TRVRUSU5HOiBcIlNlY3VyaXR5IFNldHRpbmdzXCIsXG4gICAgQ0hBTkdFX1BBU1NXT1JEOiBcIk1lbmd1YmFoS2F0ZXNhbmRpXCIsXG4gICAgUFJJVkFDWV9TRVRUSU5HOiBcIlBlbmdhdHVyYW5Qcml2YXNsXCIsXG4gICAgTEFOR1VBR0U6IFwiQmFoYXNhXCIsXG4gICAgQUJPVVQ6IFwiVGVudGFuZ1wiLFxuICAgIEZBUTogXCJGQVFcIixcbiAgICBDT05UQUNUX1VTOiBcIkh1YnVuZ2lLYW1sXCIsXG4gIH0sXG5cbiAgTUlTU0lPTjoge1xuICAgIFJFQ0VJVkVEU1VDQ0VTUzogXCJSZWNlaXZlZCBzdWNjZXNzZnVsbHkhXCJcbiAgfSxcblxuICAvLyAgIGhhbGxfdmlld19icm9hZGNhc3RfY29udGVudDogJ1ticm9hZGNhc3RdIGNvbmdyYXR1bGF0aW9ucyEnLFxuICAvLyAgIGhhbGxfdmlld19ub2dhbWVfbm90aWNlOiAn44CQezB944CRZGV2ZWxvcGluZyEhIScsXG4gIC8vICAgdGVzdDogXCIgdGVzdCA6IHswfS0tPnsxfS0tPnsyfS0tPnszfS0tPlwiLFxuXG4gIFdBSVQ6IHtcbiAgICAvKipAZGVzY3JpcHRpb24gIOe9kee7nOaWreW8gOato+WcqOmHjeaWsOi/nuaOpS4uLiovXG4gICAgRElTQ09OTkVDVDogXCJOZXR3b3JrIGRpc2Nvbm5lY3RlZCwgcmVjb25uZWN0aW5nIG5vdy4uLlwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5q2j5Zyo6L+b5YWl5ri45oiPLOivt+eojeWQji4uLiovXG4gICAgRU5URVJHQU1FV0FJVDogXCJFbnRlcmluZyBnYW1lLCBwbGVhc2UgaG9sZC4uLlwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg572R57uc6K+35rGC5aSx6LSlLOivt+mHjeivle+8gSovXG4gICAgTkVURVJST1I6IFwiTmV0d29yayByZXF1ZXN0IGZhaWxlZCwgcGxlYXNlIHJldHJ577yBXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDov57mjqXmnI3liqHlmaguLi4qL1xuICAgIENPTk5FQ1RTRVJWRVI6IFwiQ29ubmVjdGluZyB0byB0aGUgc2VydmVyLi4uXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDouqvku73orqTor4EqL1xuICAgIFdBR0VXQVk6IFwiaWRlbnRpdHkgYXV0aGVudGljYXRpb24uLi5cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOeZu+W9leS4rSovXG4gICAgTE9HSU46IFwiTG9naW4uLi5cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOWKoOi9veS4rSovXG4gICAgTE9BRElORzogXCJMb2FkaW5nLi4uXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDliqDovb3kuK0qL1xuICAgIFVQTE9BRElORzogXCJVcGxvYWRpbmcuLi5cIixcbiAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOmAmueUqOmUmeivr+eggVxuICAvLyAgICAqL1xuICAvLyAgIEVSUk9SU1RBVFVTOiB7XG4gIC8vICAgICAvKipAZGVzY3JpcHRpb24gIOW9k+WJjeaQuuW4pumHkeW4geS4jei2s++8jOivt+mAieaLqei+g+S9juaIv+mXtOaIluWPiuaXtuihpeWFhemHkeW4gSovXG4gIC8vICAgICBcIjcwMlwiOiBcIkN1cnJlbnRseSBjYXJyeWluZyBpbnN1ZmZpY2llbnQgZ29sZCBjb2luc1wiLFxuICAvLyAgIH0sXG5cbiAgLyoqXG4gICog5rOo5YaM5o+Q56S6XG4gICovXG4gIFJFR0lTVEVSOiB7XG4gICAgLyoqQGRlc2NyaXB0aW9uICDmmoLml6Dnu5Hlrprpgq7nrrEhKi9cbiAgICBOT0JPVURNQUlMOiBcIk5vIGJvdW5kIG1haWxib3ghXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDpgq7nrrHmoLzlvI/kuI3mraPnoa4hKi9cbiAgICBFTUFJTFdST05HOiBcIlRoZSBtYWlsYm94IGZvcm1hdCBpcyBpbmNvcnJlY3QhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDpgq7nrrHlkozmiYvmnLrlj7fkuI3og73kuLrnqbohKi9cbiAgICBFTUFJTElORk9STUFUSU9ORU1QVFk6IFwiUGxlYXNlIGZpbGwgaW4gdGhlIGVtYWlsIG9yIHRlbGVwaG9uZSFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOmqjOivgeeggeS/oeaBr+S4jeiDveS4uuepuiEqL1xuICAgIENPREVJTkZPUk1BVElPTkVNUFRZOiBcIlBsZWFzZSBmaWxsIGluIHRoZSB2ZXJpZmljYXRpb24gY29kZSFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOW3suWPkemAgeivt+azqOaEj+afpeaUtiEqL1xuICAgIFBMRUFTRUNIRUNLOiBcIlNlbnQsIHBsZWFzZSBjaGVjayFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOaJi+acuuagvOW8j+S4jeato+ehriEqL1xuICAgIFBIT05FV1JPTkc6IFwiSW5jb3JyZWN0IG1vYmlsZSBwaG9uZSBmb3JtYXQhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDlr4bnoIHplb/luqbkuI3og73lsI/kuo445L2NISovXG4gICAgUEFTU1dPUkQ4OiBcIlBhc3N3b3JkIGxlbmd0aCBjYW5ub3QgYmUgbGVzcyB0aGFuIDghXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDlr4bnoIHljIXlkKvlpKflsI/lhpnlrZfmr43lkozmlbDlrZchKi9cbiAgICBNVVNUX0lOQ0xVREVfQ0FTRV9OVU1CRVI6IFwiUGFzc3dvcmRzIG11c3QgY29udGFpbiB1cHBlciBhbmQgbG93ZXIgY2FzZSBsZXR0ZXJzIGFuZCBudW1iZXJzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDms6jlhozmiJDlip8hKi9cbiAgICBSRUdJU1RFUlNVQ0NFU1M6IFwiUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwsIEdvb2QgTHVjayFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOS/ruaUueWvhueggeaIkOWKnyEqL1xuICAgIENIQU5HRVBBU1NXT1JEU1VDQ0VTUzogXCJDaGFuZ2VQYXNzd29yZCBzdWNjZXNzZnVsIVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5L+u5pS55aS05YOP5oiQ5YqfISovXG4gICAgQ0hBTkdFQVZBVEFSU1VDQ0VTUzogXCJDaGFuZ2VBdmF0YXIgc3VjY2Vzc2Z1bCFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOe7keWumuaIkOWKnyEqL1xuICAgIEJJTkRTVUNDRVNTOiBcIkJvdW5kIHN1Y2Nlc3NmdWwhXCIsXG4gIH0sXG5cbiAgLyoqXG4gICAqIOaPkOekulRJUFNcbiAgICovXG4gIFRJUFM6IHtcbiAgICAvKipAZGVzY3JpcHRpb24gIOayoeaciee7keWumueahOmCrueusSEqL1xuICAgIE5PVEJJTkRFTUFJTDogXCJObyBib3VuZCBtYWlsYm94IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5aSN5Yi25aSx6LSlISovXG4gICAgR0FNRURPV05MT0FEQ09QWUVSUk9SOiBcIkZhaWxlZCB0byBjb3B5IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg572R57uc562J5b6F6LaF5pe2ISovXG4gICAgTkVUV0FJVFRJTUVPVVQ6IFwiTmV0LXdvcmsgdGltZS1vdXQhXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmmoLmnKrlvIDlkK/vvIzlsL3or7fmnJ/lvoUhKi9cbiAgICBOT1RPUEVOUExFQVNFV0FJVDogXCJOb3QgeWV0IG9wZW4sIHBsZWFzZSB3YWl0IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5YiG5Lqr5oiQ5YqfISovXG4gICAgU0hBUkVTVUNDRVNTOiBcIlNoYXJlIFN1Y2Nlc3NcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOWIhuS6q+Wksei0pSEqL1xuICAgIFNIQVJFRkFJTEVEOiBcIlNoYXJlIEZhaWxlZFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5YWF5YC85oiQ5YqfISovXG4gICAgUkVDSEFSR0VTVUNDRVNTOiBcIlJlY2hhcmdlIFN1Y2Nlc3NcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOivt+i+k+WFpeWFheWAvOmHkemineaIlumAieaLqeWVhuWTgSEqL1xuICAgIEVOVEVSUkVDSEFSR0U6IFwiUGxlYXNlIGVudGVyIHRoZSByZWNoYXJnZSBhbW91bnQgb3Igc2VsZWN0IHRoZSBwcm9kdWN0XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmj5DnjrDmiJDlip8hKi9cbiAgICBXSVRIRFJBV1NVQ0NFU1M6IFwiV2l0aGRyYXcgU3VjY2Vzc1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg57uR5a6a6ZO26KGM5oiQ5YqfISovXG4gICAgQklOREJBTktTVUNDRVNTOiBcIkJpbmRCYW5rIFN1Y2Nlc3NcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOivt+Whq+WGmeWujOaVtOmTtuihjOe7keWumuS/oeaBryEqL1xuICAgIEJBTkRCQU5LSU5GT0ZBSUw6IFwiUGxlYXNlIGNvbXBsZXRlIHRoZSBiYW5rIGJpbmRpbmcgaW5mb3JtYXRpb25cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOiOt+W+l+S4g+WkqeWlluWKsSEqL1xuICAgIFNFVkVOU0lHTklOU1VDQ0VTUzogXCJDb25ncmF0dWxhdGlvbnMgb24gZ2V0dGluZyB0aGUgc2V2ZW4gZGF5IHNpZ24gaW4gcmV3YXJkXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDojrflvpfkuInljYHlpKnlpKnlpZblirEhKi9cbiAgICBUSElSVFlTSUdOSU5TVUNDRVNTOiBcIkNvbmdyYXR1bGF0aW9ucyBvbiBnZXR0aW5nIHRoZSAzMCBkYXkgc2lnbiBpbiByZXdhcmRcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOetvuWIsOaIkOWKnyEqL1xuICAgIFNJR05JTlNVQ0NFU1M6IFwiU2lnbiBTdWNjZXNzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDlt7Llj5HpgIHor7fms6jmhI/mn6XmlLYhKi9cbiAgICBTRU5EQ0hFQ0s6IFwiU2VudCwgcGxlYXNlIGNoZWNrXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDor7fpgInmi6npk7booYwhKi9cbiAgICBTRUxFQ1RCQU5rOiBcIlBsZWFzZSBzZWxlY3QgYSBiYW5rIGZpcnN0XCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24gIOmAgOWHuua4uOaIjyEqL1xuICAgIFFVSVRHQU1FOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBxdWl0IHRoZSBnYW1lID9cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOW8uuWItuabtOaWsCEqL1xuICAgIFZFUlNJT05VUERBVEU6IFwiQ3VycmVudCB2ZXJzaW9uIGRvZXMgbm90IG1hdGNoIGFuZCBuZWVkIGRvd25sb2FkIGdhbWUgcGFjayFcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pu05pawISovXG4gICAgVVBEQVRFOiBcIlVwZGF0ZVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5b2T5YmN5q2j5aSE5LqO5YW25LuW5ri45oiP5LitISovXG4gICAgQ0hFQ0tKT0lOR0FNRTogXCJZb3UgYXJlIGluIHRoZSBob3N0aW5nIG9mIHswfSBHYW1lLCB0ZW1wb3JhcmlseSB1bmFibGUgdG8gZW50ZXIgb3RoZXIgZ2FtZXNcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5LiL6L295pu05paw5aSx6LSlISovXG4gICAgRE9XTkxPQURGQUlMRUQ6IFwiTmV0d29yayBpcyBub3QgZ29vZC4gUGxlYXNlIGNoYW5nZSB0aGUgbmV0d29yayBlbnZpcm9ubWVudCFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOS4i+i9veabtOaWsOaIkOWKnyEqL1xuICAgIERPV05MT0FEU1VDQ0VFRDogXCJEb3dubG9hZCB1cGRhdGUgc3VjY2VlZGVkIVwiLFxuXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmuLjmiI/mnInmlrDniYjmnKzvvIzmmK/lkKbph43lkK/mm7TmlrDvvJ8qL1xuICAgIEdBTUVORVdWRVJTSU9OOiBcIlRoZXJlIGlzIGEgbmV3IHZlcnNpb24gb2YgdGhlIGdhbWUuIERvIHlvdSB3YW50IHRvIHJlc3RhcnQgaXQ/XCIsXG5cbiAgICAvKirmlq3nur/ph43ov57mj5DnpLogKi9cbiAgICBSRVRSWTogXCJSZXRyeVwiLFxuICAgIC8qKuWOhuWPsuiusOW9leaPkOekuiAqL1xuICAgIGhpc3RvcnlUaXA6IFwiT25seSBrZWVwIHRoZSBsYXN0IHNldmVuIGRheXMgb2YgaGlzdG9yeVwiLFxuICAgIEJldElEOiBcIkJldCBJRFwiLFxuICAgIFRpbWU6IFwiVGltZVwiLFxuICAgIEJldEFtb3VudDogXCJCZXQgQW1vdW50XCIsXG4gICAgT2RkczogXCJPZGRzXCIsXG4gICAgUHJvZml0OiBcIlByb2ZpdFwiLFxuICAgIE11bHRpcGxlOiBcIk11bHRpcGxlXCIsXG4gICAgVHlwZW9mYmV0OiBcIlR5cGUgb2YgYmV0XCIsXG4gICAgV2lub3JMb3N0OiBcIldpbiBvciBMb3N0XCIsXG4gICAgU2V0dGxlbWVudEFtb3VudDogXCJTZXR0bGVtZW50IEFtb3VudFwiLFxuXG4gICAgLyoqQGRlc2NyaXB0aW9uICDph5HluIHkuI3otrMhKi9cbiAgICBub0dvbGRFbnRlclJvb206IFwiWW91IGRvbuKAmXQgaGF2ZSBlbm91Z2ggY2hpcHMuIEEgbWluaW11bSBvZiB7MH0gY2hpcHMgaXMgcmVxdWlyZWQgdG8gZW50ZXIgdGhlIHJvb20uIERvIHlvdSB3YW50IHRvIHJlY2hhcmdlIG5vdz9cIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5o2V6bG86ZW/5pyf5pyq5ri45oiPIOi4ouWHuuaIv+mXtCAqL1xuICAgIHJlbW92ZWRSb29tOiBcIllvdSBoYXZlIG5vdCBmaXJlZCBmb3IgbW9yZSB0aGFuIDEgbWludXRlIGFuZCBhcmUgcmVtb3ZlZCBmcm9tIHRoZSByb29tXCIsXG4gIH0sXG5cbiAgLyoqXG4gICAqIOmUmeivr+aPkOekulxuICAgKi9cbiAgRVJST1JUSVBTOiB7XG4gICAgLyoqQGRlc2NyaXB0aW9uICDor7fmsYLlt7Llj5HpgIEqL1xuICAgIFJFUVNFTkQ6IFwiQWFwcGxpY2F0aW9uIGhhcyBzZW50XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDor7fmsYLlt7Llj5HpgIEs6K+35rOo5oSP5p+l5pS255+t5L+hKi9cbiAgICBSRVFTRU5EQ0hFQ0tNRVNTQUdFOiBcIkFwcGxpY2F0aW9uIHNlbnQgYWxyZWFkeSwgcGxlYXNlIG5vdGUgdGhlIG1lc3NhZ2VzXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDlj5HpgIHpqozor4HnoIHpl7TpmpTov4fnn60qL1xuICAgIENPREVUSU1FU0hPUlQ6IFwiVGhlIGludGVydmFsIG9mIHNlbmRpbmcgT1RQcyBpcyB0b28gc2hvcnRcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOmdnuazleaTjeS9nCovXG4gICAgRkVJRkFDQU9aVU86IFwiSWxsZWdhbCBvcGVyYXRpb25cIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOmHkeW4geS4jei2syovXG4gICAgR09MREZFVzogXCJJbmFkZXF1YXRlIGNvaW5zXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDliqDms6jph5Hpop3kuI3lkIjms5UqL1xuICAgIEFEREdPTERGRUlGQTogXCJCZXQgYW1vdW50IGlzIGlsbGVnYWxcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOeOqeWutuW3suW8g+eJjCovXG4gICAgUUlQQUk6IFwiUGxheWVyIGZvbGRlZFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6Z2e5YeG5aSH54q25oCBKi9cbiAgICBOT1RSRUFEWVNUQVRFOiBcIk5vbi1wcmVwYXJlIHN0YXR1c1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pON5L2c5aSq6L+H6aKR57mBLOivt+etieW+hSVz56eS5YaN6K+VKi9cbiAgICBDQU9aVU9UT0ZBU1Q6IFwiQWN0aW9ucyB0b28gb2Z0ZW5tLCBwbGVhc2Ugd2FpdCBmb3IgJXMgcmV0cnlcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOacjeWKoeWZqOivt+axgui2heaXtiovXG4gICAgU0VSVkVSVElNRU9VVDogXCJTZXJ2ZXIgcmVxdWVzdCB0aW1lLW91dCFcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOiOtyDlj5YqL1xuICAgIEhVT1FVOiBcIk9idGFpblwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6YCa55+l6KKr6aG25Y+3Ki9cbiAgICBUT1BBQ0NPVU5UOiBcIllvdXIgYWNjb3VudCBpcyBsb2dnZWQgaW4gb24gYW5vdGhlciBkZXZpY2UsIElmIHlvdSBkaWQgbm90IGRvIGl0IHlvdXJzZWxmLCBwbGVhc2UgY2hhbmdlIHRoZSBwYXNzd29yZCBpbiB0aW1lXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmuLjlrqLpnIDopoHlhYjnu5HlrprmiYvmnLrlj7cqL1xuICAgIEdVRVNUQklOREVSUk9SOiBcIkd1ZXN0IG5lZWQgdG8gYmluZCBtb2JpbGUgcGhvbmUgbnVtYmVyIGZpcnN0XCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmiL/pl7TliJfooajkuI3lrZjlnKgqL1xuICAgIFJPT01MSVNURVJST1I6IFwiUm9vbSBsaXN0IGRvZXMgbm90IGV4aXN0XCIsXG4gIH0sXG5cbiAgLyoqXG4gICAqIOS7o+eQhlxuICAgKi9cbiAgQUdFTlQ6IHtcbiAgICBJTlBVVF9QQVJFTlRfSUQ6IFwiUHJvbW90ZXIgSURcIixcbiAgICBQQVJFTlRfSURfTEVOR1RIX0VSUk9SOiBcIldyb25nIHN1cGVyaW9yIGFnZW50IElEXCIsXG4gICAgQklORF9TVUNDRUVEOiBcIkJpbmQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgREFUQV9FTVBUWTogXCJFbXB0eSBkYXRhXCIsXG4gICAgQ0hFQ0tJTkc6IFwiUmV2aWV3XCIsXG4gICAgUEFTUzogXCJQYXNzXCIsXG4gICAgUkVKRUNURUQ6IFwiTm90IFBhc3NcIixcbiAgICBXSVRIRFJBV19OVU1fRVJSOiBcIkluY29ycmVjdCByZWNlaXZlIGFtb3VudFwiLFxuICAgIEFQUExZX1dJVEhEUkFXOiBcIkhhcyBhcHBsaWVkIGZvciByZWNlaXZlXCIsXG4gICAgQUdFTlRQT1Q6IFwiQWdlbnQgUG90XCIsXG4gIH0sXG4gIC8qKlxuICAgKiDmjqjlub9cbiAgICovXG4gIFBST01PVElPTjoge1xuICAgIExBQkVMQTogXCJVc2VyXCIsXG4gICAgTEFCRUxCOiBcIk1lbWJlciBsaW5rZWQgdG8gVXNlclwiLFxuICAgIExBQkVMQzogXCJNZW1iZXIgbGlua2VkIHRvIEJcIixcbiAgICBMQUJFTEQ6IFwiTWVtYmVyIGxpbmtlZCB0byBDXCIsXG4gICAgQk9VTlNDQUxDVUxBVElPTjogXCI9U2V2aWNlIEZlZSBieSBCIHggTGV2ZWwgMSBSYXRpbytTZXZpY2UgRmVlIGJ5IEMgeCBMZXZlbCAyIFJhdGlvK1NldmljZSBGZWUgYnkgRCB4IExldmVsIDMgUmF0aW9cIixcbiAgICBDT05ORUNUTEFCRUw6IFwiRW50ZXIgeW91ciBwcm9tb3RlciBJRFwiLFxuICAgIEVYQ0xVU0lWRUxJTks6IFwiaW5kaXZpZHVhbCBsaW5r77yaXCIsXG4gICAgRVhDTFVTSVZFTElOSzI6IFwiaW5kaXZpZHVhbCBsaW5rXCIsXG4gICAgU0hBUkVUTzogXCJTaGFyZSB0b++8mlwiLFxuICAgIFRPVEFMQk9OVVM6IFwiVG90YWwgQm9udXNcIixcbiAgICBBVkFJTEFCRUw6IFwiQXZhaWxhYmVsIEJvbnVzXCIsXG4gICAgQk9OVVM6IFwiQm9udXNcIixcbiAgICBSQVRJTzogXCJSYXRpb1wiLFxuICAgIERUUkFJTFNOT0RFOiB7XG4gICAgICBUSVAxOiBcIkFsbCBUdXJub3ZlcjpcIixcbiAgICAgIFRJUDI6IFwiQWxsIFJlYmF0ZTpcIixcbiAgICAgIFRJUDM6IFwiVGhlIHRvdGFsIG51bWJlciBvZjpcIixcbiAgICAgIFRJUDQ6IFwiT25seSBzaG93IHRoZSBkZXRhaWxzIG9mIDEgd2Vla1wiLFxuICAgICAgVElUTEUxOiBcIk5hbWVcIixcbiAgICAgIFRJVExFMjogXCJJRFwiLFxuICAgICAgVElUTEUzOiBcIlR5cGVcIixcbiAgICAgIFRJVExFNDogXCJUdXJub3ZlclwiLFxuICAgICAgVElUTEU1OiBcIlJlYmF0ZVwiLFxuICAgICAgTkVBUkxZQVdFRUs6IFwiTmVhcmx5IGEgd2Vla1wiLFxuICAgICAgQUxMVFlQRTogXCJBbGwgVHlwZXNcIixcbiAgICB9LFxuICAgIEFDQ09VTlRERVRBSUxTT1JSRUNPUkROT0RFOiB7XG4gICAgICBMRVZFTF9USVRMRTE6IFwiSW52aXRhdGlvbiBUaW1lXCIsXG4gICAgICBMRVZFTF9USVRMRTI6IFwiTmFtZVwiLFxuICAgICAgTEVWRUxfVElUTEUzOiBcIklEXCIsXG4gICAgICBMRVZFTF9USVRMRTQ6IFwiTk8ub2ZmbGluZVwiLFxuICAgICAgTEVWRUxfVElUTEU1OiBcIlRvdGFsIEJvbnVzXCIsXG4gICAgICBOT0RfVElUTEUxOiBcIk51bWJlclwiLFxuICAgICAgTk9EX1RJVExFMjogXCJUaW1lXCIsXG4gICAgICBOT0RfVElUTEUzOiBcIkFtb3VudFwiLFxuICAgICAgTk9EX1RJVExFNDogXCJPdmVyYWdlXCIsXG4gICAgfVxuXG4gIH0sXG4gIC8qKlxuICAqIOe9kee7nOmUmeivr+S7o+eggVxuICAqL1xuICBFUlJPUkNPREU6IHtcbiAgICAvKipAZGVzY3JpcHRpb24gIOacjeWKoeWZqOeJiOacrOagoemqjCzlpLHotKXor7fph43or5UqL1xuICAgIFZFUlNJT05DSEVDSzogXCJTZXJ2ZXJ2ZXJzaW9uIGV4YW1pbmUsIGZhaWxlZCBwbGVhc2UgcmV0cnlcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOacjeWKoeWZqOe9kee7nOW3sue7j+aWreW8gOi/nuaOpSzor7fph43or5UhISEqL1xuICAgIE5FVENMT1NFOiBcIlRoZSBuZXR3b3JrIGlzIGRpc2Nvbm5lY3RlZC4gUGxlYXNlIGNoZWNrIHRoZSBuZXR3b3JrXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uIOa4uOaIj+acjeWKoeWZqOW8gOWPkeS6uuWRmOivt+ajgOafpSovXG4gICAgUExFQVNFQ0hFQ0s6IFwiR2FtZSBzZXJ2ZXIgZGV2ZWxvcGVyIHBsZWFzZSBjaGVja1wiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pyN5Yqh5Zmo6K+35rGC5aSx6LSl77yM6K+36YeN6K+Vc3RhdHVzOiovXG4gICAgU0VSVkVSRVJST1I6IFwiU2VydmVyIHJlcXVlc3QgZmFpbGVkLCBwbGVhc2UgcmV0cnlcIixcbiAgICAvKipAZGVzY3JpcHRpb24g5pyN5Yqh5Zmo6K+35rGC6LaF5pe277yM6K+36YeN6K+VISovXG4gICAgU0VSVkVSVElNRU9VVDogXCJTZXJ2ZXIgcmVxdWVzdCB0aW1lb3V077yMcGxlYXNlIHJldHJ5IVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg6I635Y+W5ri45oiP5YiX6KGo5aSx6LSl6K+36YeN6K+VKi9cbiAgICBHQU1FTElTVEVSUk9SOiBcIkZhaWxlZCB0byBnZXQgdGhlIGdhbWUgbGlzdCBwbGVhc2UgdHJ5IGFnYWluXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmnI3liqHlmajor7fmsYLov5Tlm57mlbDmja7plJnor69zdGF0dXMqL1xuICAgIERBVEFFUlJPUjogXCJTZXJ2ZXIgcmVxdWVzdCByZXR1cm5lZCBkYXRhIGVycm9yLHN0YXR1czpcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOe9kee7nOaWreW8gOi/nuaOpe+8jOivt+mHjeaWsOeZu+W9lSovXG4gICAgRTIwMDEwMDAxOiBcIk5ldHdvcmsgZGlzY29ubmVjdGVkLCBwbGVhc2UgbG9naW4gYWdhaW7vvIFcIiwgLy90b2tlbiBJbnZhbGlkXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnmbvlvZXlpLHotKUqL1xuICAgIEUxMDAyMDAwNzogXCJGYWlsZWQgdG8gbG9naW5cIixcblxuICAgIDExOiBcIkxvZ2luIHRpbWVvdXQsIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuLi5cIixcbiAgICAxMjogXCJUaGUgY3VycmVudCByb29tIGlzIG5vdCBvcGVuLi4uLlwiLFxuICAgIDEzOiBcIlBhc3N3b3JkIHJlc2V0IGZhaWxlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIixcbiAgICAxNDogXCJUaGUgcGFyYW1ldGVyIGlzIHdyb25nXCIsXG4gICAgMTU6IFwiVG9vIG1hbnkgbmV3IHVzZXJzIGhhdmUgcmVnaXN0ZXJlZCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIixcbiAgICAxMDQ6IFwiVGhpcyBzZXNzaW9uIGlzIG5vdCBvcGVuIHlldCFcIixcbiAgICAxMDc6IFwiVGhlIHBsYXllciBkb2VzIG5vdCBleGlzdCFcIixcbiAgICAxMTA6IFwiVGhlIHBsYXllciBsb2dpbiBoYXMgZXhwaXJlZCwgcGxlYXNlIGxvZyBpbiBhZ2FpblwiLFxuICAgIDExMTogXCJUaGUgcGxheWVyIGlzIG5vdCByZWdpc3RlcmVkXCIsXG4gICAgMTE0OiBcIlRoZXJlIGlzIGFscmVhZHkgc29tZW9uZSBhdCB0aGlzIGxvY2F0aW9uXCIsXG4gICAgMTIwOiBcIllvdXIgYWNjb3VudCBpcyBsb2dnZWQgaW4gZWxzZXdoZXJlLCB5b3UgYXJlIGZvcmNlZCB0byBnbyBvZmZsaW5lXCIsXG4gICAgMTIyOiBcIlRoZSByb29tIGhhcyBiZWVuIGRpc2JhbmRlZC4uLlwiLFxuICAgIDE0NTogXCJUaGlzIGFjY291bnQgaXMgZm9yYmlkZGVuIHRvIGxvZyBpblwiLFxuICAgIDE0NjogXCJUaGUgcGxheWVyIGlzIG5vdCBsb2dnZWQgaW4hXCIsXG4gICAgMTQ5OiBcIlRoZSBzZXJ2ZXIgaGFzIGJlZW4gbWFpbnRhaW5lZCBQbGVhc2UgZm9sbG93IHRoZSBvZmZpY2lhbCBuZXdzIGZvciB0aGUgZHVyYXRpb25cIixcbiAgICAxNzA6IFwiRnJpZW5kIHJvb20gaXMgbm90IG9wZW5lZFwiLFxuICAgIDE3NDogXCJUaGUgZ2FtZSBoYXMgc3RhcnRlZCFcIixcbiAgICAxNzU6IFwiVGhlIG51bWJlciBvZiBwZW9wbGUgd2hvIGNhbiBzdGFydCBpcyBub3QgcmVhY2hlZFwiLFxuICAgIDE3NjogXCJNb2JpbGUgcGhvbmUgbnVtYmVyIGhhcyBiZWVuIHJlZ2lzdGVyZWRcIixcbiAgICAyMjc6IFwiVGhlIHJvb20gZG9lcyBub3QgZXhpc3Qgb3IgaGFzIGJlZW4gZGlzYmFuZGVkIVwiLFxuICAgIDIyOTogXCJJbiB0aGUgZ2FtZSFcIixcbiAgICAyMzE6IFwiVGhpcyBwaG9uZSBudW1iZXIgaXMgbm90IHJlZ2lzdGVyZWRcIixcbiAgICAyMzI6IFwiSW5jb3JyZWN0IHZlcmlmaWNhdGlvbiBjb2RlXCIsXG4gICAgMjMzOiBcIllvdSBoYXZlIHNpZ25lZCBpbiB0b2RheSwgcGxlYXNlIGRvIG5vdCBzaWduIGluIGFnYWluXCIsXG4gICAgMjM1OiBcIkNhbid0IGFkZCB5b3Vyc2VsZiBhcyBhIGZyaWVuZFwiLFxuICAgIDIzNzogXCJUaGVyZSBpcyBhIHByb2JsZW0gd2l0aCB0aGUgYW1vdW50IHlvdSBlbnRlcmVkLCBwbGVhc2UgcmUtZW50ZXJcIixcbiAgICAyNDA6IFwiVGhlIHBsYXllciBpcyBub3QgaW4gdGhlIHJvb21cIixcbiAgICAyNDE6IFwiVGhlIHJvb20gZG9lcyBub3QgZXhpc3Qgb3IgaGFzIGJlZW4gZGlzYmFuZGVkIVwiLFxuICAgIDI0MjogXCJZb3VyIGNoaXBzIGFyZSBvdmVybXVjaFwiLFxuICAgIDI0MzogXCJZb3VyIGNoaXBzIGFyZSBpbnN1ZmZpY2llbnRcIixcbiAgICAyNDQ6IFwiWW91IGFyZSBpbiB0aGUgZ2FtZSwgcGxlYXNlIHdhaXQgdG8gbG9nIG91dCBhZnRlciB0aGlzIHJvdW5kIGlzIG92ZXJcIixcbiAgICAyNDU6IFwiRmFpbGVkIHRvIHN0YW5kIHVwLCB0aGUgcGxheWVyIGhhcyBub3QgeWV0IHNhdCBkb3duXCIsXG4gICAgMjQ5OiBcIkNhbm5vdCBiZXQgbm93XCIsXG4gICAgMjUxOiBcIllvdXIgYWNjb3VudCBiYWxhbmNlIGlzIGluc3VmZmljaWVudFwiLFxuICAgIDI1NDogXCJUaGUgYW1vdW50IHlvdSBlbnRlcmVkIGV4Y2VlZHMgdGhlIHNhZmUgZGVwb3NpdCBib3ggYXNzZXRzXCIsXG4gICAgMjU3OiBcIlRoZSBwbGF5ZXIgc3RhdHVzIGlzIHdyb25nXCIsXG4gICAgMjY0OiBcIlRoZSBiZXR0aW5nIGxpbWl0IGhhcyBiZWVuIHJlYWNoZWRcIixcbiAgICAyNzI6IFwiQ2Fubm90IGZpbmQgYSBzdWl0YWJsZSByb29tLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyXCIsXG4gICAgMjc2OiBcIllvdSBjYW4gc3RhbmQgdXAgYWZ0ZXIgeW91IGZvbGRcIixcbiAgICAyNzk6IFwiWW91ciBiYWxhbmNlIGRvZXMgbm90IG1hdGNoLCBwbGVhc2UgbG9nIGluIGFnYWluIGFuZCB0aGVuIG9wZXJhdGVcIixcbiAgICAyODA6IFwiVGhlIHBob25lIG51bWJlciBoYXMgYmVlbiBib3VuZCwgcGxlYXNlIGRvIG5vdCBiaW5kIGl0IGFnYWluIVwiLFxuICAgIDI5NzogXCJUaGUgb3BlcmF0aW9uIGZhaWxlZFwiLFxuICAgIDMwODogXCJQbGVhc2UgZW50ZXIgcGFzc3dvcmRcIixcbiAgICAzMDk6IFwiWW91ciBvbGQgcGFzc3dvcmQgaXMgd3JvbmcsIHBsZWFzZSByZS1lbnRlcu+8gVwiLFxuICAgIDMzNzogXCJUb28gbWFueSByZWdpc3RlcmVkIHVzZXJzIHVuZGVyIHRoZSBzYW1lIGlwIVwiLFxuICAgIDM1MjogXCJDdXJyZW50IHNlYXQgaXMgZnVsbFwiLFxuICAgIDM1NDogXCJBdCBsZWFzdCAyIHBlb3BsZSBjYW4gc3RhcnQgdGhlIGdhbWUuXCIsXG4gICAgMzU3OiBcIlRoaXMgRmFjZWJvb2sgYWNjb3VudCBoYXMgYmVlbiBib3VuZCwgcGxlYXNlIGRvIG5vdCBiaW5kIGl0IGFnYWluIVwiLFxuICAgIDM1ODogXCJUaGUgYW1vdW50IG9mIHdpdGhkcmF3YWwgZG9lcyBub3QgbWVldCB0aGUgcmVxdWlyZW1lbnRzIVwiLFxuICAgIDM1OTogXCJUaGUgYmFuayBjYXJkIGN1cnJlbnRseSBib3VuZCBkb2VzIG5vdCBvcGVuIHRoZSB3aXRoZHJhd2FsIGZ1bmN0aW9uIVwiLFxuICAgIDM2MDogXCJFYWNoIHVzZXIgY2FuIGJpbmQgdXAgdG8gMyBiYW5rc+KAmCBpbmZvcm1hdGlvbiFcIixcbiAgICAzNjE6IFwiVGhlIGJhbmsgaW5mb3JtYXRpb24gdGhhdCBuZWVkcyB0byBiZSB1cGRhdGVkIGRvZXMgbm90IGV4aXN0IVwiLFxuICAgIDM2MjogXCJJbmNvcnJlY3QgdmVyaWZpY2F0aW9uIGNvZGVcIixcbiAgICAzNjM6IFwiVGhlIG1haWwgaGFzIGJlZW4gcmVhZCFcIixcbiAgICAzNjQ6IFwiVGhlIHJlY29yZCBkb2VzIG5vdCBleGlzdCFcIixcbiAgICAzNjU6IFwiVGhlIHJlY29yZCBzdGF0dXMgb2YgdGhlIHBsYXllciBwaWdneSBiYW5rIGlzIGluY29ycmVjdCBhbmQgY2Fubm90IGJlIG9wZXJhdGVkIVwiLFxuICAgIDM2NjogXCJUaGUgcGxheWVyJ3MgcGlnZ3kgYmFuayBhbHJlYWR5IGhhcyBhIHByb2ZpdCBhbmQgY2Fubm90IGJlIGNhbmNlbGxlZCFcIixcbiAgICAzNjc6IFwiVGhlIHBsYXllciBmYWlsZWQgdG8gY2FuY2VsIHRoZSBwaWdneSBiYW5rIG9wZXJhdGlvbiFcIixcbiAgICAzNjg6IFwiVGhlIHBsYXllciBmYWlsZWQgdG8gdHJhbnNmZXIgdG8gdGhlIHBpZ2d5IGJhbmshXCIsXG4gICAgMzY5OiBcIlRoZSBwbGF5ZXIgZmFpbGVkIHRvIHRyYW5zZmVyIG91dCBvZiB0aGUgcGlnZ3kgYmFuayFcIixcbiAgICAzNzA6IFwiVGhlIHBsYXllciBwaWdneSBiYW5rIGhhcyBubyBpbmNvbWUgYW5kIGNhbm5vdCBiZSB0cmFuc2ZlcnJlZCBvdXQhXCIsXG4gICAgMzcxOiBcIkNvbmZpZ3VyYXRpb24gZG9lcyBub3QgZXhpc3QsIHNhdmluZyBmYWlsZWQhXCIsXG4gICAgMzcyOiBcIlRoZSBwbGF5ZXIncyBhY2NvdW50IGJhbGFuY2UgaXMgaW5zdWZmaWNpZW50IGFuZCB0aGUgZGVwb3NpdCBmYWlsZWQhXCIsXG4gICAgMzczOiBcIllvdXIgZGVwb3NpdCBsaW1pdCBpcyBpbnN1ZmZpY2llbnQsIHBsZWFzZSByZS1lbnRlciFcIixcbiAgICAzNzQ6IFwiRGVwb3NpdCBmYWlsZWQsIGRlcG9zaXQgdG9vIGZldyBnb2xkIGNvaW5zIVwiLFxuICAgIDM3NTogXCJUaGUgaW5wdXQgcGFzc3dvcmQgaXMgd3JvbmcsIHRoZSB0cmFuc2ZlciBmYWlsZWQhXCIsXG4gICAgMzc4OiBcIkdvbGQgc2hvcnRhZ2VcIiwvL+mHkeW4geS4jei2s+WdkOS4i+Wksei0pVxuICAgIDM3OTogXCJBY2NvdW50IG5vdCByZWdpc3RlcmVkXCIsXG4gICAgMzgwOiBcIkFjY291bnQgYW5kIHBhc3N3b3JkIGRvIG5vdCBtYXRjaO+8gVwiLFxuICAgIDM4NTogXCJUaGUgYmFuayBhY2NvdW50IGJlZW4gdXNlZCFcIixcbiAgICAzODY6IFwiQmFuayBjb25maWcgaW5mbyBlcnJvciFcIixcbiAgICAzODc6IFwiQmFuayBpbmZvIHNhdmUgZXJyb3IhXCIsXG4gICAgMzg4OiBcIlRoZSBudW1iZXIgb2YgZnJpZW5kcyBvZiB0aGUgb3RoZXIgcGFydHkgaGFzIHJlYWNoZWQgdGhlIHVwcGVyIGxpbWl0XCIsXG4gICAgMzg5OiBcIlRoZSByZWNvcmQgaGFzIGV4cGlyZWQsIHRyeSByZWZyZXNoaW5nXCIsXG4gICAgMzkwOiBcIkNhbm5vdCBiZXQgcmVwZWF0ZWRseVwiLFxuXG4gICAgLy/ovaznm5hcbiAgICAvKipAZGVzY3JpcHRpb24gIOa0u+WKqOacquW8gOWQryovXG4gICAgMzkyOiBcIkFjdGl2aXR5IG5vdCBvcGVuXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDpooblj5blpLHotKXvvIzor7fogZTns7vlrqLmnI0qL1xuICAgIDM5MzogXCJGYWlsZWQgdG8gcmVjZWl2ZSwgcGxlYXNlIGNvbnRhY3QgY3VzdG9tZXIgc2VydmljZVwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg546p5a625pyq562+5YiwKi9cbiAgICAzOTU6IFwiUGxheWVyIG5vdCBjaGVja2VkIGluXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDliankvZnlj6/njqnmrKHmlbDkuI3lpJ8qL1xuICAgIDM5NjogXCJUaGVyZSBpcyBubyBudW1iZXIgb2YgZHJhd3MgYXZhaWxhYmxlXCIsXG4gICAgLyoqQGRlc2NyaXB0aW9uICDmnKrphY3nva7mtLvliqjnianlk4EqL1xuICAgIDM5NzogXCJObyBhY3RpdmUgaXRlbXMgY29uZmlndXJlZFwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5pON5L2c5aSx6LSl77yM6K+35YaN6K+V5LiA5qyhKi9cbiAgICAzOTg6IFwiT3BlcmF0aW9uIGZhaWxlZCwgcGxlYXNlIHRyeSBhZ2FpblwiLFxuICAgIC8qKkBkZXNjcmlwdGlvbiAg5aWW5ZOB5bqT5a2Y5LiN6Laz77yM6K+36IGU57O75a6i5pyNKi9cbiAgICA0MDA6IFwiSW5zdWZmaWNpZW50IHN0b2NrLCBwbGVhc2UgY29udGFjdCBjdXN0b21lciBzZXJ2aWNlXCIsXG5cbiAgICA0NDA6IFwiVGhpcyBwbGF5ZXIgaXMgYWxyZWFkeSB5b3VyIGZyaWVuZFwiLFxuICAgIDQ0MTogXCJBbHJlYWR5IGFwcGxpZWRcIixcbiAgICA0NDI6IFwiWW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBudW1iZXIgb2YgZnJpZW5kc1wiLFxuICAgIDQ0MzogXCJUaGUgb3RoZXIgcGFydHkgaXMgbm90IGFsbG93ZWQgdG8gYWRkIGZyaWVuZHNcIixcbiAgICAvKipAZGVzY3JpcHRpb24gIOi2hei/h+mmluWFheasoeaVsCovXG4gICAgNDY2OiBcIk1vcmUgdGhhbiB0aGUgbnVtYmVyIG9mIGZyaXN0IHBheVwiLFxuICAgIC8vICDmoqblubvkvZPogrLmlrDliqDnmoQtLS0tLS0tLS0tXG4gICAgNDcwOiBcIkxvZ2luIEZhaWxlZFwiLFxuICAgIDQ3MTogXCJGYWlsZWQgdG8gb2J0YWluIHVzZXIgaW5mb3JtYXRpb25cIixcbiAgICA0NzI6IFwiUGxlYXNlIHNldCB0aGUgc2Vjb25kYXJ5IHBhc3N3b3JkIGZpcnN0XCIsXG4gICAgNDczOiBcIkN1cnJlbmN5IEV4Y2hhbmdlIEZhaWxlZFwiLFxuICAgIDQ3NDogXCJUaGUgaW5wdXQgY3VycmVuY3kgaXMgYmVsb3cgdGhlIG1pbmltdW0gbGltaXRcIixcbiAgICA0NzU6IFwiRmFpbGVkIHRvIG9idGFpbiB0aGUgaGlzdG9yeVwiLFxuICAgIDQ3NjogXCJBY2Nlc3MgdGltZW91dFwiLFxuICAgIDQ3NzogXCJBbW91bnQgZXhjZWVkcyBsaW1pdFwiLFxuICAgIDQ3ODogXCJUaGUgbnVtYmVyIG9mIHRyYW5zZmVycyBleGNlZWRzIHRoZSBsaW1pdFwiLFxuICAgIDQ3OTogXCJUaGUgdHJhbnNmZXIgYW1vdW50IGV4Y2VlZHMgdGhlIGxpbWl0XCIsXG5cblxuICAgIDQ4MDogXCJCVEkgU1BPUlRTIExvZ2luIEZhaWxlZCwgcGxlYXNlIHJldHJ5XCIsXG4gICAgNDgxOiBcIkJUSSBTUE9SVFMgVHJhbnNmZXIgaW4gRmFpbGVkLCBwbGVhc2UgcmV0cnlcIixcbiAgICA0ODI6IFwiQlRJIFNQT1JUUyBUcmFuc2ZlciBvdXQgRmFpbGVkLCBwbGVhc2UgcmV0cnlcIixcbiAgICAvLyDkuI3lsZ7kuo7or6XlnLrmrKFcbiAgICA0OTA6IFwiUGxlYXNlIHdhaXQsIHRoZSBnYW1lIGlzIHByZXBhcmluZy5cIixcbiAgICAvLyDph5HluIHlnLrmnKrlvIDlkK9cbiAgICA0OTE6IFwiR29sZCBjb2luIGZpZWxkIGlzIGNsb3NlZO+8jHBsZWFzZSBsb2cgaW4gYWdhaW4uXCIsXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIDUwMDogXCJUaGUgY29ubmVjdGlvbiBpcyBhYm5vcm1hbCwgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4uLlwiLFxuICAgIDUwNTogXCJXcm9uZyBiZXQgY2hpcHNcIixcbiAgICA1MzA6IFwiTG9naW4gc3dpdGNoIGlzIG5vdCB0dXJuZWQgb25cIixcbiAgICA1MzE6IFwiVGhlIHJlY2hhcmdlIHN3aXRjaCBpcyBub3QgdHVybmVkIG9uXCIsXG4gICAgNTMyOiBcIlRoZSB3aXRoZHJhd2FsIHN3aXRjaCBpcyBub3QgdHVybmVkIG9uXCIsXG4gICAgNTMzOiBcIkdhbWUgc3dpdGNoIGlzIG5vdCB0dXJuZWQgb25cIixcbiAgICAvL+aOkuihjOamnFxuICAgIDYxMDogXCJsZWFkZXJib2FyZCBpcyBub3QgZW5hYmxlZFwiLFxuICAgIDYxMTogXCJ0aGVyZSBpcyBubyByZXdhcmQgdG8gcmVjZWl2ZVwiLFxuICAgIDYxMjogXCJyZXdhcmQgcmVjZWl2ZWRcIixcbiAgICA2MTM6IFwicnVsZSBjb25maWd1cmF0aW9uIGVycm9yLCBwbGVhc2UgY29udGFjdCBjdXN0b21lciBzZXJ2aWNlXCIsXG4gICAgLy/plKbmoIfotZtcbiAgICA2MjA6IFwiVGhlIHRvdXJuYW1lbnQgaGFzIGJlZW4gZGlzYmFuZGVkXCIsXG4gICAgNjIxOiBcInRoZSBnYW1lIGhhcyBiZWd1blwiLFxuICAgIDYyMjogXCJhbHJlYWR5IHNpZ25lZCB1cFwiLFxuICAgIDYyMzogXCJ0aGUgbnVtYmVyIG9mIHBlb3BsZSBpcyBmdWxsXCIsXG4gICAgNjI0OiBcIm5vdCByZWdpc3RlcmVkXCIsXG4gICAgNjI1OiBcImZ1bGwgb3Igc3RhcnRlZFwiLFxuICAgIDYyNjogXCJ0aGUgZ2FtZSBpcyBvdmVyXCIsXG4gICAgNjI3OiBcImZhaWxlZCB0byBjbG9zZSB0aGUgZ2FtZVwiLFxuICAgIDYyODogXCJGYWlsZWQgdG8gY3JlYXRlIHRoZSBnYW1lLCBleGNlZWRpbmcgdGhlIG1heGltdW0gbGltaXQgb2YgY3JlYXRpbmcgdGhlIGdhbWUgb24gdGhlIGRheVwiLFxuICAgIDYyOTogXCJHYW1lIHN0YXJ0ZWQgb3IgZW5kZWQgb3Igbm90IGZvdW5kXCIsXG4gICAgNTAwMTogXCJIYXMgYSBzdXBlcmlvciBhbmQgY2Fubm90IGJlIGJvdW5kXCIsXG4gICAgNTAwMjogXCJEbyBub3QgYWxsb3cgbG9vcCBiaW5kaW5nXCIsXG4gICAgNTAwMzogXCJVc2VyIGRvZXMgbm90IGV4aXN0XCIsXG4gICAgNTAwNDogXCJOb3QgYWxsb3dlZCB0byBiaW5kIHlvdXJzZWxmXCIsXG4gICAgNTAwNTogXCJJbnN1ZmZpY2llbnQgYmFsYW5jZSB0byB3aXRoZHJhd1wiLFxuICAgIDUwMDY6IFwiT25seSBxdWVyeSBkYXRhIHdpdGhpbiBzZXZlbiBkYXlzXCIsXG4gICAgNzAxOiBcIklsbGVnYWwgb3BlcmF0aW9uXCIsXG4gICAgNzAyOiBcIkN1cnJlbnRseSBjYXJyeWluZyBpbnN1ZmZpY2llbnQgZ29sZCBjb2luc1wiLCAvKipAZGVzY3JpcHRpb24gIOW9k+WJjeaQuuW4pumHkeW4geS4jei2s++8jOivt+mAieaLqei+g+S9juaIv+mXtOaIluWPiuaXtuihpeWFhemHkeW4gSovXG4gICAgLyoqQGRlc2NyaXB0aW9uICDnrbnnoIHkuI3otrMqL1xuICAgIDcwNDogXCJHb2xkIFNob3J0YWdlXCIsXG4gIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDorr7nva5cbiAgLy8gICAgKi9cbiAgLy8gICBTRVRUSU5HOiB7XG4gIC8vICAgICBUSVRUTEU6IFwiU2V0dGluZ3NcIixcbiAgLy8gICAgIE1VU0lDOiBcIk11c2ljXCIsXG4gIC8vICAgICBFRkZFQ1Q6IFwiRWZmZWN0XCIsXG4gIC8vICAgICBPUEVOOiBcIk9uXCIsXG4gIC8vICAgICBDTE9TRTogXCJPZmZcIixcbiAgLy8gICAgIENIQU5HRUlEOiBcIlN3aXRjaCBhY2NvdW50XCIsXG4gIC8vICAgICBOT1dJRDogXCJDdXJyZW50IGFjY291bnQ6IFwiLFxuICAvLyAgICAgVkVSU0lPTjogXCJWZXJzaW9uIE5vOiBcIixcbiAgLy8gICAgIFJFU0VUR1VJRFRJUDogXCJBZnRlciByZXNldHRpbmcsIGVudGVyIHRoZSBnYW1lIGFnYWluIGFuZCBlbnRlciB0aGUgbm92aWNlIHRyYWluaW5nLiBEbyB5b3Ugd2FudCB0byByZXNldD9cIixcbiAgLy8gICAgIFJFU0VUR1VJRFRJUFNVQ0M6IFwiUmVzZXQgc3VjY2Vzc2Z1bGx5XCIsXG4gIC8vICAgICBMQU5HVUFHRTogXCJFbmdsaXNoXCIsXG5cbiAgLy8gICB9LFxuICAvLyAgIC8qKlxuICAvLyAgICog562+5YiwXG4gIC8vICAgKi9cbiAgLy8gICBTSUdOSU46IHtcbiAgLy8gICAgIEZSRUU6IFwiRnJlZVwiLFxuICAvLyAgICAgREFZOiBcIkRBWXswfVwiLFxuICAvLyAgICAgU0lHTklOU1VDQ0VTUzogXCJTaWduIGluIHN1Y2Nlc3NmdWxseVwiLFxuICAvLyAgICAgU0lHTklORkFJTDogXCJTaWduIGluIGZhaWxcIixcbiAgLy8gICAgIEFMUkVBRFlTSUdOSU46IFwiQWxyZWFkeSBzaWduZWRcIixcbiAgLy8gICAgIE5PVFNJR05JTjogXCJDb21lIGJhY2sgdG9tb3Jyb3dcIixcbiAgLy8gICAgIFRJVExFOiBcIkRhbGl5IEJvbnVzXCIsXG4gIC8vICAgICBSRVNFVDogXCJSZXNldCBldmVyeSBzZXZlbiBkYXlzXCIsXG4gIC8vICAgICBSRUZSRVNIOiBcIlJlZnJlc2ggYXQgMjQ6MDAgZGFpbHlcIixcbiAgLy8gICAgIENMSUNLOiBcIkNsaWNrIHRoZSBidXR0b24gYWJvdmUgdG8gY29sbGVjdCFcIixcbiAgLy8gICAgIFRPREFZOiBcIlRvZGF5XCIsXG4gIC8vICAgfSxcbiAgLy8gICAvKipcbiAgLy8gICAgKiDnu5HlrppcbiAgLy8gICAgKi9cbiAgLy8gICBCSU5EOiB7XG4gIC8vICAgICBUSVRUTEU6IFwiQmluZCBwaG9uZVwiLFxuICAvLyAgICAgUEhPTkU6IFwiTW9iaWxlIG51bWJlcjogXCIsXG4gIC8vICAgICBDT0RFOiBcIk9UUDogXCIsXG4gIC8vICAgICBORVc6IFwiTmV3IFBhc3N3b3JkOiBcIixcbiAgLy8gICAgIENIRUNLOiBcIlJlLWVudGVyIFBhc3N3b3JkOiBcIixcbiAgLy8gICAgIElOUFVUUEhPTkU6IFwiUGhvbmUgTnVtYmVyXCIsXG4gIC8vICAgICBJTlBVVENPREU6IFwiUGxlYXNlIGVudGVyIHRoZSB2ZXJpZmljYXRpb24gY29kZVwiLFxuICAvLyAgICAgQ09ERUxFTjogXCJUaGUgbGVuZ3RoIG9mIHRoZSB2ZXJpZmljYXRpb24gY29kZSBpcyA2IGNoYXJhY3RlcnNcIixcbiAgLy8gICAgIElOUFVUUkVDRUlWRVJOQU1FOiBcIlBsZWFzZSBlbnRlciB0aGUgbmFtZSBvZiB0aGUgcmVjZWl2ZXJcIixcbiAgLy8gICAgIElOUFVUQUNDT1VOVDogXCJQbGVhc2UgZW50ZXIgdGhlIGJhbmsgYWNjb3VudCBudW1iZXJcIixcbiAgLy8gICAgIElOUFVUSUZTQzogXCJQbGVhc2UgZW50ZXIgdGhlIGJhbmsgSUZTQyBjb2RlXCIsXG4gIC8vICAgICBJTlBVVElGU0NXUk9ORzogXCJUaGUgSUZTQyBiYW5rIGNvZGUgeW91IGVudGVyZWQgaXMgd3JvbmchXCIsXG4gIC8vICAgICBJTlBVVEFNT1VOVDogXCJQbGVhc2UgZW50ZXIgdGhlIHdpdGhkcmF3YWwgYW1vdW50XCIsXG4gIC8vICAgICBOT1NFTEVDVEJBTks6IFwiTm8gYmFuayBzZWxlY3RlZFwiLFxuICAvLyAgICAgSU5QVVRORVc6IFwiNiBjaGFyYWN0ZXJzXCIsXG4gIC8vICAgICBJTlBVVENIRUNLOiBcIlBsZWFzZSBiZSBjb25zaXN0ZW50XCIsXG4gIC8vICAgICBTRU5EOiBcIlNlbmRcIixcbiAgLy8gICAgIENPTkZJUk06IFwiQ29uZmlybVwiLFxuICAvLyAgICAgQklORFNVQ0NFU1M6IFwiU2V0dXAgc3VjY2VlZGVkXCIsXG4gIC8vICAgICBDSEFOR0VTVUNDRVNTOiBcIk1vZGlmaWNhdGlvbiBzdWNjZWVkZWRcIixcbiAgLy8gICB9LFxuXG4gIC8vICAgLyoqXG4gIC8vICAgICog5Liq5Lq65L+h5oGvXG4gIC8vICAgICovXG4gIC8vICAgVVNFUklORk86IHtcbiAgLy8gICAgIFVOQk9VTkQ6IFwiVW5ib3VuZFwiLFxuICAvLyAgICAgTkFNRUNIQU5FU1VDQ0VTUzogXCJOaWNrbmFtZSBtb2RpZmllZCBzdWNjZXNzZnVsbHlcIixcbiAgLy8gICAgIEhFQURDSEFORVNVQ0NFU1M6IFwiSGVhZCBtb2RpZmllZCBzdWNjZXNzZnVsbHlcIixcbiAgLy8gICAgIE5PQklORFBIT05FOiBcIk5lZWQgdG8gYmluZCBwaG9uZSBhY2NvdW50XCIsXG4gIC8vICAgICBBRERGUklFTkQ6IFwiSW52aXRhdGlvbiBzZW50IHN1Y2Nlc3NmdWxseVwiLFxuICAvLyAgICAgRU5URVJOQU1FX0VSUk9SOiBcIlBsZWFzZSBlbnRlciBuaWNrbmFtZSEgXCIsXG4gIC8vICAgICBOSUNLTkFNRTogXCJOaWNrTmFtZVwiLFxuICAvLyAgICAgU0lHTkFUVVJFOiBcIlNpZ25hdHVyZVwiXG4gIC8vICAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOmCruS7tlxuICAvLyAgICAqL1xuICAvLyAgIEVNQUlMOiB7XG4gIC8vICAgICBERUFSUExBWUVSOiBcIkRlYXIgcGxheWVy77yaXCIsXG4gIC8vICAgICBOT05FV1M6IFwiTm8gbmV3c1wiLFxuICAvLyAgIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDpk7booYxcbiAgLy8gICAgKi9cbiAgLy8gICBCQU5LOiB7XG4gIC8vICAgICBBTU9VTlRFUlJPUjE6IFwiUGxlYXNlIGlucHV0IGFtb3VudO+8gVwiLFxuICAvLyAgICAgQU1PVU5URVJST1IyOiBcIlRyYW5zZmVyIGluIC8gb3V0IGFtb3VudCBjYW5ub3QgYmUgMCFcIixcbiAgLy8gICAgIEFNT1VOVEVSUk9SMzogXCJJbnN1ZmZpY2llbnQgY2FycnlpbmcgYW1vdW50LCBwbGVhc2UgcmVjaGFyZ2UhXCIsXG4gIC8vICAgICBBTU9VTlRFUlJPUjQ6IFwiSW5zdWZmaWNpZW50IGJhbmsgYmFsYW5jZSwgcGxlYXNlIHRyeSBhZ2FpbiFcIixcbiAgLy8gICAgIE9QRVJBVEVTVUNDRVNTOiBcIlRoZSBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWxcIixcbiAgLy8gICAgIC8vXG4gIC8vICAgICBERVBPU0lUX0FNT1VOVDogXCJEZXBvc2l0IEFtb3VudDpcIixcbiAgLy8gICAgIEVOVEVSX0FNT1VOVDogXCJFbnRlciBBbW91bnRcIixcbiAgLy8gICAgIEJBTks6IFwiQmFuazpcIixcbiAgLy8gICAgIENBUlJJRUQ6IFwiQ2FycmllZDpcIixcbiAgLy8gICAgIFRBS0VPVVRBTU9VTlQ6IFwiVGFrZSBPdXQgQW1vdW50OlwiLFxuICAvLyAgIH0sXG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiDlhYXlgLxcbiAgLy8gICAgKi9cbiAgLy8gICBSRUNIQVJHRToge1xuICAvLyAgICAgTk9HT09EUzogXCJQcm9kdWN0IGluZm9ybWF0aW9uIG5vdCBvYnRhaW5lZCFcIixcbiAgLy8gICAgIFdhaXRpbmdQYXk6IFwiV2FpdGluZyBmb3IgcGF5bWVudFwiLFxuICAvLyAgICAgUGF5U3VjY2VzczogJ1N1Y2Nlc3MnLFxuICAvLyAgICAgUGF5RmFpbGVkOiAnRmFpbGVkJyxcbiAgLy8gICAgIFRpbWU6IFwiVGltZVwiLFxuICAvLyAgICAgQ29tbW9kaXR5OiBcIkNvbW1vZGl0eVwiLFxuICAvLyAgICAgQW1vdW50OiBcIkFtb3VudFwiLFxuICAvLyAgICAgU3RhdGU6IFwiU3RhdGVcIlxuXG4gIC8vICAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOaPkOeOsFxuICAvLyAgICAqL1xuICAvLyAgIFdJVEhEUkFXQUw6IHtcbiAgLy8gICAgIFVOQk9VTkRCQU5LOiBcIlVuYm91bmQgYmFuayBhY2NvdW50IG51bWJlclwiLFxuICAvLyAgICAgUkFURTogXCJGZWUgcmF0Ze+8mnswfSVcIixcbiAgLy8gICAgIFJBVEVMaW1pdGVkOiBcIkZlZSByYXRl77yaIExpbWl0ZWQgZnJlZVwiLFxuICAvLyAgICAgTGltaXRlZGZyZWU6IFwiTGltaXRlZCBmcmVlXCIsXG4gIC8vICAgICBNSU5BTU9VTlQ6IFwiTWluL01heC1BbW91bnTvvJpcIixcbiAgLy8gICAgIElOUFVUTUlOQU1PVU5UOiBcIkxlc3MgdGhhbiB0aGUgbWluaW11bSB3aXRoZHJhd2FsIGFtb3VudFwiLFxuICAvLyAgICAgSVdCOiBcIkluc3VmZmljaWVudCBhY2NvdW50IGJhbGFuY2VcIixcbiAgLy8gICAgIElXQkJFVDogXCJJbnN1ZmZpY2llbnQgYmV0IGFtb3VudFwiLFxuICAvLyAgICAgTk9CSU5EUEhPTkU6IFwiTW9iaWxlIHBob25lIG51bWJlciBub3QgYm91bmRcIixcbiAgLy8gICAgIFNVQ0NFU1M6IFwiV2l0aGRyYXdhbCBhcHBsaWNhdGlvbiBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gIC8vICAgICBXSVRIRFJBV0FMQU1PVU5UOiBcIldpdGhkcmF3YWwgQW1vdW50XCIsXG4gIC8vICAgICBXaXRoZHJhd2FsU3RhdHVzOiB7XG4gIC8vICAgICAgIFwiMFwiOiBcIldhaXRpbmcgZm9yIHByb2Nlc3NpbmdcIixcbiAgLy8gICAgICAgXCIxMDBcIjogXCJBcHByb3ZlZFwiLFxuICAvLyAgICAgICBcIjIwMFwiOiBcIkRyYXdpbmdcIixcbiAgLy8gICAgICAgXCIzMDBcIjogXCJXaXRoZHJhd2FsIHN1Y2Nlc3NmdWxcIixcbiAgLy8gICAgICAgXCItMTAwXCI6IFwiQXVkaXQgZmFpbHVyZVwiLFxuICAvLyAgICAgICBcIi0zMDBcIjogXCJXaXRoZHJhd2FsIGZhaWxlZFwiLFxuICAvLyAgICAgICBcIjMwOVwiOiBcIkluY29ycmVjdCBzZWNvbmRhcnkgcGFzc3dvcmRcIixcbiAgLy8gICAgIH0sXG4gIC8vICAgICBHT1RPQklORFBIT05FOiBcIkdvLXRvLWJpbmQtcGhvbmVcIixcbiAgLy8gICAgIE5PQklORFBIT05FVElQOiBcIkZvciB0aGUgc2FmZXR5IG9mIHlvdXIgZnVuZHMscGxlYXNlIGJpbmQgeW91ciBtb2JpbGUgbnVtYmVyIGZpcnN0XCIsXG4gIC8vICAgICBBRERCQU5LQ0FSRDogXCIrIEFkZCBiYW5rIGNhcmRcIixcbiAgLy8gICAgIFNFTEVDVEJBTks6IFwiU2VsZWN0IEJhbmtcIixcbiAgLy8gICAgIEJBTktOVU1CRVI6IFwiQmFuayBhY2NvdW50IG51bWJlclwiLFxuICAvLyAgICAgUkVDRUlWRVJOQU1FOiBcIlJlY2VpdmVyIE5hbWVcIixcbiAgLy8gICAgIElGU0NDT0RFOiBcIkVudGVyIHRoZSBiYW5rIElGU0MgY29kZVwiLFxuICAvLyAgICAgRVJST1I6IHtcbiAgLy8gICAgICAgRU1QVFlfUFdEOiBcIlBsZWFzZSBlbnRlciBzZWNvbmRhcnkgcGFzc3dvcmRcIlxuICAvLyAgICAgfSxcbiAgLy8gICAgIFNFQ09OREFSWVBBU1NXT1JEOiBcIlNlY29uZGFyeSBQYXNzd29yZFwiXG4gIC8vICAgfSxcblxuICAvLyAgIC8qKlxuICAvLyAgICAqIOWtmOmSsee9kFxuICAvLyAgICAqL1xuICAvLyAgIFBJR0dZX0JBTks6IHtcbiAgLy8gICAgIC8vIOWvhueggeS4jeS4gOiHtFxuICAvLyAgICAgSU5DT05TSVNURU5UX1BBU1NXT1JEOiBcIkluY29uc2lzdGVudCBwYXNzd29yZFwiLFxuICAvLyAgICAgLy8g5a+G56CB5LiN5YWoXG4gIC8vICAgICBQQVNTV09SRF9JTkNPTVBMRVRFOiBcIllvdXIgcGFzc3dvcmQgaXMgaW5jb21wbGV0ZVwiLFxuICAvLyAgICAgLy8g5pen5a+G56CB5ZKM5paw5a+G56CB5LiA6Ie0XG4gIC8vICAgICBPTERfTkVXX1BBU1NXRF9TQU1FOiBcIllvdXIgbmV3IHBhc3N3b3JkIGlzIHRoZSBzYW1lIGFzIHlvdXIgb2xkIHBhc3N3b3JkLCBwbGVhc2UgcmUtZW50ZXIuXCIsXG4gIC8vICAgICAvLyDmlrDlr4bnoIHkuI3kuIDoh7RcbiAgLy8gICAgIE5FV19QQVNTV0RfRElGRjogXCJUaGUgbmV3IHBhc3N3b3JkIGFuZCB0aGUgY29uZmlybWVkIHBhc3N3b3JkIGFyZSBpbmNvbnNpc3RlbnQsIHBsZWFzZSByZS1lbnRlci5cIixcbiAgLy8gICAgIC8vIOS/ruaUueWvhueggeaIkOWKn1xuICAvLyAgICAgQ0hBTkdFX1NVQ0NFU1M6IFwiU3VjY2Vzc2Z1bGx5IG1vZGlmaWVkLlwiLFxuICAvLyAgICAgLy8g5a+G56CB5Li656m677yM6K+36L6T5YWl5a+G56CBXG4gIC8vICAgICBQTEVBU0VfRU5URVJfUEFTU1dPUkQ6IFwiUGxlYXNlIGVudGVyIHBhc3N3b3JkXCIsXG4gIC8vICAgICAvLyDor7fovpPlhaXovazlhaXph5Hpop1cbiAgLy8gICAgIFBMRUFTRV9FTlRFUl9USEVfQU1PVU5UOiBcIlBsZWFzZSBlbnRlciB0aGUgYW1vdW50XCIsXG4gIC8vICAgICAvLyDlrZjlhaXlpLHotKVcbiAgLy8gICAgIERFUE9TSVRfRkFJTFVSRTogXCJEZXBvc2l0IGZhaWx1cmUsIFBsZWFzZSBlbnRlciB0aGUgY29ycmVjdCBhbW91bnQgIVwiLFxuICAvLyAgICAgLy8g6aKd5bqm5LiN6LazXG4gIC8vICAgICBERVBPU0lUX0xJTUlUOiBcIllvdXIgZGVwb3NpdCBsaW1pdCBpcyBpbnN1ZmZpY2llbnQsIHBsZWFzZSByZS1lbnRlci5cIixcbiAgLy8gICAgIC8vIOWtmOWFpeaIkOWKn1xuICAvLyAgICAgREVQT1NJVEVEX1NVQ0NFU1NGVUxMWTogXCJEZXBvc2l0ZWQgc3VjY2Vzc2Z1bGx5LlwiLFxuICAvLyAgICAgLy8g5Y+W5raI5oiQ5YqfXG4gIC8vICAgICBDQU5DRUxfU1VDQ0VTUzogXCJDYW5jZWwgc3VjY2Vzc1wiLFxuICAvLyAgICAgLy8g5pyA5aSn5a2Y5qy+6aKd5bqm5LiN6LazXG4gIC8vICAgICBJTlNVRkZJQ0lFTlRfTUFYSU1VTTogXCJJbnN1ZmZpY2llbnQgbWF4aW11bSB0cmFuc2ZlciBhbW91bnRcIixcbiAgLy8gICAgIC8vIOi+k+WFpeS4jeiDveWkp+S6juacgOWkp+mineW6plxuICAvLyAgICAgSU5TVUZGSUNJRU5UX0RFUE9TSVRfQU1PVU5UOiBcIkluc3VmZmljaWVudCBkZXBvc2l0IGFtb3VudFwiLFxuICAvLyAgICAgLy8g5b+F6aG76L6T5YWlIDYg5L2N5pWw5a2XXG4gIC8vICAgICBNVVNUXzZfRElHSVRTOiBcIlBhc3N3b3JkIG11c3QgYmUgNiBkaWdpdHNcIixcblxuICAvLyAgICAgLy/lhajpg6hcbiAgLy8gICAgIEFMTDogXCJBTExcIixcbiAgLy8gICAgIFRPVEFMX0lOQ09NRTogXCJUb3RhbCBJbmNvbWVcIixcbiAgLy8gICAgIFJBVEU6IFwiUmF0ZVwiLFxuICAvLyAgICAgQ09NRklSTUVEX0FNT1VOVDogXCJDb25maXJtZWQgXFxuYW1vdW50XCIsXG4gIC8vICAgICBZRVNURVJEQVlfSU5DT01FOiBcIlllc3RlcmRheSdzIFxcbmluY29tZVwiLFxuXG4gIC8vICAgICBNQVhJTVVOX1RSQU5TRkVSX0FNSVVOVDogXCJNYXhpbXVtIHRyYW5zZmVyIGFtb3VudDpcIixcbiAgLy8gICAgIFRFQU5TRkVSX0lOOiBcIlRyYW5zZmVyIEluOlwiLFxuICAvLyAgICAgTUlOSU1VTV9TSUdMRTogXCJNaW5pbXVtIHNpbmdsZSBpbnZlc3RtZW50IGFtb3VudDpcIixcbiAgLy8gICAgIFBST0ZJVDogXCJQcm9maXRcIixcblxuICAvLyAgICAgUExFQVNFX0VOVEVSOiBcIlBsZWFzZSBlbnRlclwiLFxuXG4gIC8vICAgICAvL1BCRGVwb3NpdFJlY2VpcHRWaWV3XG4gIC8vICAgICBUSU1FOiBcIlRpbWVcIixcbiAgLy8gICAgIE9QRVJBVElPTl9BTU9VTlQ6IFwiT3BlcmF0aW9uXFxuQW1vdW50XCIsXG4gIC8vICAgICBJTlRFUkVTUkFURTogXCJJbnRlcmVzdFxcblJhdGVcIixcbiAgLy8gICAgIEVYUEVDVEVEUkVUVVJOOiBcIkV4cGVjdGVkXFxuUmV0dXJuXCIsXG4gIC8vICAgICBUSU1FTEVGVDogXCJUaW1lXFxuTGVmdFwiLFxuICAvLyAgICAgT1BFUkFURTogXCJPcGVyYXRlXCIsXG4gIC8vICAgICAvL1BCRGVwb3NpdFJlY2VpcHRJdGVtTm9kZVxuICAvLyAgICAgQ0FOQ0VMRUQ6IFwiQ2FuY2VsZWRcIixcbiAgLy8gICAgIFRSQU5TRkVSUkVET1VUOiBcIlRyYW5zZmVycmVkIG91dFwiLFxuICAvLyAgIH0sXG4gIC8vICAgLyoqXG4gIC8vICAgICog5o6S6KGM5qacXG4gIC8vICAgICovXG4gIC8vICAgUkFOSzoge1xuICAvLyAgICAgTVlSQU5LOiBcIk15IFJhbmtcIixcbiAgLy8gICAgIFJlY2VpdmU6IFwiQ29uZ3JhdHVsYXRpb25zIG9uIGdldHRpbmcgdGhlIHswfSBjaGlwIHJld2FyZFwiLFxuICAvLyAgIH0sXG4gIC8vICAgLyoqXG4gIC8vICAqIOWIhuS6q1xuICAvLyAgKi9cbiAgLy8gICBTSEFSRToge1xuICAvLyAgICAgRVhDTFVTSVZFTElOSzogXCJpbmRpdmlkdWFsIGxpbmvvvJpcIixcbiAgLy8gICAgIFNIQVJFVE86IFwiU2hhcmUgdG/vvJpcIixcbiAgLy8gICB9LFxuXG4gIC8vICAgLyoqXG4gIC8vICAgICog5aW95Y+LXG4gIC8vICAgICovXG4gIC8vICAgRlJJRU5EOiB7XG4gIC8vICAgICBJTkZPUk1BVElPTjogXCJJTkZPUk1BVElPTlwiLFxuICAvLyAgICAgREVMRVRFRlJJRU5EOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgZnJpZW5kcyB7MH0/XCIsXG4gIC8vICAgICBJTlZJVEVGUklFTkQ6IFwiIGludml0ZXMgeW91IHRvIHBsYXkgezB9P1wiLFxuICAvLyAgICAgRU5URVJST09NOiBcInswfSBlbnRlciB0aGUgcm9vbVwiLFxuICAvLyAgICAgSU5WSVRBVElPTlNFTkQ6IFwiSW52aXRhdGlvbiBzZW50XCIsXG4gIC8vICAgICBBTFJFQURZSU5ST09NOiBcIlRoZSBwbGF5ZXIgaXMgYWxyZWFkeSBpbiB0aGUgcm9vbVwiLFxuICAvLyAgICAgT05MSU5FOiBcIk9ubGluZVwiLFxuICAvLyAgICAgT0ZGT05FOiBcIk9mZmluZVwiLFxuICAvLyAgICAgRlJJRU5EOiBcIkZyaWVuZFwiLFxuICAvLyAgICAgQUxSRUFEWV9BUFBMSUVEOiBcIkFscmVhZHkgYXBwbGllZFwiLFxuICAvLyAgICAgSEFWRV9CRUNPTUVfRlJJRU5EOiBcIkhhdmUgYmVjb21lIGZyaWVuZHNcIixcbiAgLy8gICAgIEZBSUxMX1RPX0ZSSUVORFM6IFwiRmFpbCB0byBiZSBmcmllbmRzXFxuezB9XCIsXG4gIC8vICAgICBIQVZFX0JFQ09NRV9GUklFTkRTOiBcIkhhdmUgYmVjb21lIGZyaWVuZHNcXG57MH1cIixcbiAgLy8gICAgIFdBTlRfQkVfRlJJRU5EOiBcIldhbnQgYmUgeW91ciBmcmllbmRcXG57MH1cIixcbiAgLy8gICAgIE5PX1JFU1VMVDogJ05vIHJlc3VsdCcsXG4gIC8vICAgICBOT19DT05UQVNUOiAnTm8gY29udGFjdHMgY2FuIGJlIGFkZGVkJyxcbiAgLy8gICAgIE5PX0ZSSUVORDogJ05vIGZyaWVuZCcsXG4gIC8vICAgICBOT19ORVdTOiAnTm8gbmV3cycsXG4gIC8vICAgICBBTExPV19BRERfRlJJRU5EOiBcIkFsbG93IHRvIGFkZCBtZSBhcyBhIGZyaWVuZFwiLFxuICAvLyAgICAgQUxMT1dfSU5WSVRFX1RPR0FNRTogXCJBbGxvdyB0byBpbnZpdGUgbWUgdG8gcGxheSBnYW1lc1wiLFxuICAvLyAgICAgRU5URVJfVVNFUklEOiBcIkVudGVyIHVzZXIgSURcIixcbiAgLy8gICAgIENPTlRBU1RGQUlMRUQ6IFwiRmFpbGVkIHRvIG9idGFpbiBkZXZpY2UgcGVybWlzc2lvbnNcIixcbiAgLy8gICAgIENPTlRJTlVTX0dBTUU6IFwiWW91ciBwcmV2aW91cyBnYW1lIHdhcyBub3QgY29tcGxldGVkLiBXaGV0aGVyIHRvIGVudGVyIHRoZSBwcmV2aW91cyBnYW1lIHRvIGNvbnRpbnVlP1wiLFxuICAvLyAgICAgVVNFUklEX0VSUjogJ1VzZXIgSUQgaXMgZXJyb3IscGxlYXNlIHJldHJ5JyxcblxuICAvLyAgIH0sXG4gIC8vICAgLyoqXG4gIC8vICAqIOi0puWPt+eZu+W9lSBcbiAgLy8gICovXG4gIC8vICAgQUNDT1VOVF9MT0dJTjoge1xuICAvLyAgICAgLy8g5Y2g5L2N56ymXG4gIC8vICAgICBQQUxDRV9IT0xERVI6IHtcbiAgLy8gICAgICAgLy8g6aqM6K+B56CBXG4gIC8vICAgICAgIFZFUl9DT0RFOiBcInZlcmlmaWNhdGlvbiBjb2RlXCIsXG4gIC8vICAgICAgIFBBU1NXT1JEOiBcInBhc3N3b3JkXCIsXG4gIC8vICAgICAgIFBBU1NXT1JEX0NPTkZJUk06IFwiY29uZmlybSBwYXNzd29yZFwiLFxuICAvLyAgICAgICBQSE9ORTogJ3Bob25lJyxcbiAgLy8gICAgIH0sXG4gIC8vICAgICAvLyDplJnor6/mj5DnpLpcbiAgLy8gICAgIEVSUk9SOiB7XG4gIC8vICAgICAgIC8vIOaJi+acuuWPt+aXoOaViOOAgemUmeivr1xuICAvLyAgICAgICBQSE9ORV9OVU06IFwiUGhvbmUgbnVtYmVyIGVycm9yXCIsXG4gIC8vICAgICAgIC8vIOmqjOivgeeggeaXoOaViFxuICAvLyAgICAgICBWRVJfQ09ERTogXCJJbmNvcnJlY3QgdmVyaWZpY2F0aW9uIGNvZGVcIixcbiAgLy8gICAgICAgLy8g5Lik5qyh5a+G56CB5LiN5LiA6Ie0IGRpc2FjY29yZFxuICAvLyAgICAgICBUV09fUFdEX0RJU0FDQ09SRDogXCJFbnRlciB0aGUgcGFzc3dvcmQgdHdpY2UgaW5jb25zaXN0ZW50XCIsXG4gIC8vICAgICAgIC8vIOi0puWPt+acquazqOWGjFxuICAvLyAgICAgICBBQ0NfTk9fUkVHSVNURVI6IFwiQWNjb3VudCBub3QgcmVnaXN0ZXJlZFwiLFxuICAvLyAgICAgICBFTVBUWV9QV0Q6IFwiUGxlYXNlIGVudGVyIHBhc3N3b3JkXCIsXG4gIC8vICAgICB9LFxuICAvLyAgICAgU1VDQ0VFREVEOiBcIlN1Y2NlZWRlZFwiLFxuICAvLyAgICAgLy8g5Y+R6YCB6aqM6K+B56CB5Yiw44CC44CC44CCXG4gIC8vICAgICBTRU5EX0NPREVfVE9fUEhPTkU6IFwiVmVyaWZjYXRpb24gU01TIHdpbGwgYmUgc2VudCB0b1wiXG5cblxuICAvLyAgIH0sXG4gIC8vICAgUk9PTUxJU1Q6IHtcbiAgLy8gICAgIFJVTU1ZOiB7XG4gIC8vICAgICAgIEVOVFJZQU1PVU5UOiBcIkVudHJ5IEFtb3VudFwiLFxuICAvLyAgICAgICBQRVJQT0lOVDogXCJQZXIgUG9pbnRcIixcbiAgLy8gICAgIH0sXG4gIC8vICAgICBURUVOUEFUVEk6IHtcbiAgLy8gICAgICAgQk9UVE9NTElORTogXCJCb3R0b20gTGluZVwiLFxuICAvLyAgICAgICBFTlRSWUFNT1VOVDogXCJFbnRyeSBBbW91bnRcIixcbiAgLy8gICAgIH0sXG4gIC8vICAgICBEWlBLOiB7XG4gIC8vICAgICAgIFNCX0JCOiBcIlNCL0JCXCIsXG4gIC8vICAgICAgIEJVWV9JTl9SQU5HRTogXCJCdXktaW4gUmFuZ2VcIixcbiAgLy8gICAgIH0sXG4gIC8vICAgfSxcbiAgLy8gICBHVUlERToge1xuICAvLyAgICAgY29udGludWU6IFwiQ2xpY2sgdG8gY29udGludWVcIixcbiAgLy8gICAgIHRpcDE6IFwiV2VsY29tZSB0byB0aGUgTmF0aW9uYWwgR2FtZSEgSSB3aWxsIGV4cGxhaW4gdG8geW91IHRoZSBiYXNpYyBmdW5jdGlvbnMgb2YgdGhlIGdhbWUuIFBsZWFzZSBjbGljayBhbnl3aGVyZSBvbiB0aGUgc2NyZWVuIHRvIGVudGVyIHRoZSBuZXh0IHN0ZXAuXCIsXG4gIC8vICAgICB0aXAyOiBcIkhlcmUgeW91IGNhbiBtb2RpZnkgeW91ciBnYW1lIG5pY2tuYW1lIGFuZCBwcm9maWxlIHBpY3R1cmUuIFlvdSBjYW4gYWxzbyBjaGVjayB5b3VyIHBlcnNvbmFsIGluZm9ybWF0aW9uLlwiLFxuICAvLyAgICAgdGlwMzogXCJIZXJlIGlzIHlvdXIgaW5kaXZpZHVhbC4gSW52aXRlIGZyaWVuZHMgdG8gZG93bmxvYWQsIHlvdSB3aWxsIGdldCByZWJhdGVzIVwiLFxuICAvLyAgICAgdGlwNDogXCJZb3UgY2FuIGNoZWNrIHRoZSBmcmllbmRzIHlvdSBpbnZpdGVkLCBhbmQgZ2V0IHlvdXIgaW52aXRhdGlvbiByZWJhdGUhXCIsXG4gIC8vICAgICB0aXA1OiBcIllvdSBjYW4gYnV5IGNoaXBzIGhlcmUhXCIsXG4gIC8vICAgICB0aXA2OiBcIkNvbWUgYW5kIGV4cGVyaWVuY2UgdGhlIGdhbWUhXCIsXG5cbiAgLy8gICB9XG5cbiAgLy8gICBNU0dfQk9YOiB7XG4gIC8vICAgICB0aXBzOiBcIlRJUFNcIixcbiAgLy8gICAgIENvbmZpcm06IFwiQ29uZmlybVwiLFxuICAvLyAgICAgQ2FuY2VsOiBcIkNhbmNlbFwiXG4gIC8vICAgfSxcbiAgLy8gICAvLyAg5L2T6aqM5Zy65aSa6LSn5biB55u45YWz6K+t6KiA5YyFXG4gIC8vICAgRVhQRVJJRU5DRV9GSUVMRDoge1xuICAvLyAgICAgLy8g5o+Q56S6562556CB5pWw6YePXG4gIC8vICAgICBoaW50Q2hpcENvdW50OiBcIkhlcmUgaXMgeW91ciBjaGlwIGNvdW5077yMcmVjaGFyZ2UgdG8gZ2V0IGNoaXBzXCIsXG4gIC8vICAgICAvLyDmj5DnpLrlhYXlgLxcbiAgLy8gICAgIGhpbnRSZWNoYXJnZTogXCJZb3UgaGF2ZSBubyBjaGlwcyxyZWNoYXJnZSB0byBnZXQgY2hpcHNcIixcbiAgLy8gICAgIE5vR29sZDogXCJZb3UgaGF2ZSBubyBjaGlwc1wiLFxuICAvLyAgICAgLy8g56aB5q2i5o+Q546wXG4gIC8vICAgICBDYW5ub3RXaXRoZHJhdzogXCJZb3UgY2FuIHdpdGhkcmF3IGNhc2ggYWZ0ZXIgYW55IHJlY2hhcmdlXCIsXG4gIC8vICAgICAvLyDotaDpgIHph5HluIFcbiAgLy8gICAgIEdpdmVHb2xkOiBcIkdpdmUgeW91IHswfSBnb2xkIGNvaW5zLCBwbGVhc2Uga2VlcCB1cC4gXCIsXG4gIC8vICAgICAvLyDliankvZnmrKHmlbBcbiAgLy8gICAgIHJlc2lkdWVDb3VudDogXCIgKHswfSByZW1haW5pbmcpXCIsXG4gIC8vICAgICAvLyDlhbPpl63ph5HluIHlnLrpgJrnn6VcbiAgLy8gICAgIGNsb3NlR29sZEZpZWxkTm90ZTogXCJUaGUgZ29sZCBjb2luIG1hcmtldCBoYXMgYmVlbiBjbG9zZWQgYW5kIHdpbGwgZW50ZXIgdGhlIHJlYWwgZ29sZCBtYXJrZXQgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgZ2FtZS5cIixcblxuICAvLyAgICAgLy8g5Y2z5bCG6L+b5YWl55yf6YeR5Zy66YCa55+lXG4gIC8vICAgICBlbnRlclJlYWxGaWVsZDogYCBDbGljayBPSyB0byBlbnRlciB0aGUgcmVhbCBnb2xkIGZpZWxkISBcXHJcXG5Ob3cgc3RhcnQgb3VyIGpvdXJuZXkgb2YgcmljaCBncm93dGghYCxcblxuICAvLyAgIH0sXG4gIC8vICAgLy/lpb3lj4vmiL9cbiAgLy8gICBGUklFTkRST09NOiB7XG4gIC8vICAgICBEaXNiYW5kUm9vbTogXCJEaXNiYW5kIHRoZSBSb29tXCIsXG4gIC8vICAgICAvL+iHquW3seeCueWHu+ino+aVo+aIv+mXtOaPkOekulxuICAvLyAgICAgRGlzYmFuZFJvb21EZXNjMTogXCJUaGUgZ2FtZSBoYXMgbm90IHN0YXJ0ZWQsIGRvIHlvdSB3YW50IHRvIGRpc2JhbmQgdGhlIHJvb20/XCIsXG4gIC8vICAgICAvL+ino+aVo+aIv+mXtOWQjuWFtuS7lueOqeWutuaPkOekulxuICAvLyAgICAgRGlzYmFuZFJvb21EZXNjMjogXCJUaGUgcm9vbSBoYXMgYmVlbiBkaXNiYW5kZWQsIHBsZWFzZSBjbGljayBDb25maXJtIHRvIGV4aXQuXCIsXG4gIC8vICAgICAvL+aIv+mXtOWIsOS6huiHquWKqOino+aVo1xuICAvLyAgICAgRGlzYmFuZFJvb21EZXNjMzogXCJUaGUgcm9vbSB0aW1lb3V0IGhhcyBub3Qgc3RhcnRlZCBhbmQgaGFzIGJlZW4gZGlzYmFuZGVkLlwiLFxuICAvLyAgICAgLy/op4LmiJjnjqnlrrbouKLlh7pcbiAgLy8gICAgIERpc2JhbmRSb29tRGVzYzQ6IFwiV2F0Y2hpbmcgdGhlIGdhbWUgaXMgbm90IGFsbG93ZWQgaW4gdGhpcyByb29tLCB5b3UgaGF2ZSBsZWZ0IHRoZSByb29tLlwiLFxuICAvLyAgICAgLy/ooqvouKLlh7rmiL/pl7RcbiAgLy8gICAgIEtJS0VST09NOiBcIllvdSBoYXZlIGp1c3QgYmVlbiBraWNrZWQgb3V0IG9mIHRoZSBwcml2YXRlIHJvb20uXCIsXG4gIC8vICAgICAvL+i4ouWHuuaIv+mXtFxuICAvLyAgICAgS0lLRVJPT00yOiAnQXJlIHlvdSBzdXJlIHRvIGtpY2sgezB9IG91dCBvZiB0aGUgcHJpdmF0ZSByb29tPycsXG4gIC8vICAgICAvL+S4u+WKqOmAgOWHuuaIv+mXtFxuICAvLyAgICAgRXhpdFJvb206IFwiRXhpdCB0aGUgUm9vbVwiLFxuICAvLyAgICAgRXhpdFJvb21EZXNjOiBcIlRoZSBnYW1lIGlzIGFib3V0IHRvIHN0YXJ0LiBEbyB5b3Ugd2FudCB0byBleGl0IHRoZSBwcml2YXRlIHJvb20/XCIsXG4gIC8vICAgICBFeGl0Um9vbURlc2MyOiBcIkRvIHlvdSB3YW50IHRvIGV4aXQgdGhlIHJvb20/IEFmdGVyIGV4aXRpbmcgdGhlIHJvb20sIHlvdXIgY2xvY2t3aXNlIHBsYXllciB3aWxsIGJlY29tZSB0aGUgbmV3IGhvbWVvd25lci5cIixcbiAgLy8gICAgIFRvUmVjaGFyZ2U6IFwiWW91IGRvbuKAmXQgaGF2ZSBlbm91Z2ggY2hpcHMuIERvIHlvdSB3YW50IHRvIHJlY2hhcmdlIG5vdz9cIixcbiAgLy8gICAgIEpvaW5Sb29tRXJyb3I6IFwiUm9vbSBjb2RlIGVudGVyIGVycm9yXCIsXG4gIC8vICAgICBDb3B5Um9vbUluZm9TdWNjZXNzOiBcIiBDb3B5IHN1Y2Nlc3NmdWxseSEgU2VuZCBpdCB0byB5b3VyIGZyaWVuZHMhXCIsXG4gIC8vICAgfSxcbiAgLy8gICBUVVJOX1RBQkxFOiB7XG4gIC8vICAgICBBZGRyZXNzU3VjY2VzczogXCJUaGUgYWRkcmVzcyBpcyBmaWxsZWQgaW4gc3VjY2Vzc2Z1bGx5LCBwbGVhc2Ugd2FpdCBwYXRpZW50bHkgZm9yIHRoZSBwcml6ZSB0byBiZSBpc3N1ZWQhXCJcbiAgLy8gICB9LFxuXG4gIC8vICAgLyoqXG4gIC8vICAgICog56aP5Yip5Lit5b+DXG4gIC8vICAgICovXG4gIC8vICAgV2VsZmFyZUNlbnRlcjoge1xuICAvLyAgICAgbm9UaXA6IFwiTm8gQWN0aXZpdHlcIlxuICAvLyAgIH0sXG5cbiAgLy8gICBUb3VybmFtZW50OiB7XG4gIC8vICAgICBDbG9zZVRvdXJuYW1lbnQ6IFwiQXJlIHlvdSBzdXJlIHRvIGNsb3NlIHRoaXMgdG91cm5hbWVudD8gVGhlIHBhaWQgZmVlIHdpbGwgYmUgcmVmdW5kZWQgYWZ0ZXIgZGVsZXRpb24uXCIsXG4gIC8vICAgICBOb3RpY2VUb3VybmFtZW50VGV4dDogXCI8Y29sb3I9I0ZFREZFNT5UaGUgY29tcGV0aXRpb24geW91IHNpZ25lZCB1cCBmb3Igd2lsbCBzdGFydCBpbiA8L2M+PGNvbG9yPSNGRkU1M0E+PHNpemUgPSAzMD4gezB9IDwvc2l6ZT48L2NvbG9yPjxjb2xvcj0jRkVERkU1PnNlY29uZHMuXFxuSWYgeW91IGRvIG5vdCBwYXJ0aWNpcGF0ZSwgaXQgaXMgY29uc2lkZXJlZCBhIHdhaXZlciEgPC9jPlwiLFxuICAvLyAgICAgTGVhdmVUb3VybmFtZW50OiBcIkRvIHlvdSBnaXZlIHVwIHRoZSBnYW1lPyBObyByZXdhcmRzIHdpbGwgYmUgb2J0YWluZWQgYWZ0ZXIgZ2l2aW5nIHVwIVwiLFxuICAvLyAgICAgTm90T3BlbjogXCJOb3Qgb3BlbiB5ZXQsIHBsZWFzZSB3YWl0IHBhdGllbnRseS5cIixcbiAgLy8gICAgIFNlbGVjdEdhbWU6IFwiUGxlYXNlIHNlbGVjdCBhIGdhbWVcIixcbiAgLy8gICAgIEVudGVyQ29ycmVjdFBhc3N3b3JkOiBcIlBsZWFzZSBlbnRlciB0aGUgY29ycmVjdCBwYXNzd29yZFwiLFxuICAvLyAgICAgTm90VG91cm5hbWVudDogXCJUb3VybmFtZW50IGRvZXMgbm90IGV4aXN0LlwiLFxuICAvLyAgICAgU2lnblN1Y2Nlc3NmdWxseTogXCJTaWduIHVwIHN1Y2Nlc3NmdWxseVwiLFxuICAvLyAgICAgSW5jb21wbGV0ZTogXCJJbmNvbXBsZXRlIGRhdGEsIHBsZWFzZSBjb250aW51ZSB0byBmaWxsIGluXCIsXG4gIC8vICAgICBNeVRvdXJuYW1lbnRUaXAxOiBcImFib3V0IHRvIHN0YXJ0XCIsXG4gIC8vICAgICBNeVRvdXJuYW1lbnRUaXAyOiBcImluIHByb2dyZXNzXCIsXG4gIC8vICAgICBNeVRvdXJuYW1lbnRUaXAzOiBcIml0IGhhcyBlbmRlZFwiLFxuICAvLyAgICAgTXlUb3VybmFtZW50VGlwNDogXCJDbG9zZWRcIixcbiAgLy8gICAgIE15VG91cm5hbWVudFRpcDU6IFwiRGlzYmFuZGVkIGR1ZSB0byBpbnN1ZmZpY2llbnQgbnVtYmVyc1wiLFxuICAvLyAgICAgTXlUb3VybmFtZW50VGlwNjogXCJBYmFuZG9uZWQgdGhlIHRvdXJuYW1lbnRcIixcbiAgLy8gICAgIE15VG91cm5hbWVudFBlb3BsZTogXCJTdGFydCBhZnRlciB7MH0gcGVvcGxlXCIsXG4gIC8vICAgICBwYXNzd29yZFdvbmc6IFwid3JvbmcgUGFzc3dvcmRcIixcbiAgLy8gICAgIEFtb3VudFdvbmc6IFwid3JvbmcgQW1vdW50XCIsXG4gIC8vICAgICBDbG9zZWQ6IFwiVGhpcyB0b3VybmFtZW50IHswfSBoYXMgYmVlbiBkaXNiYW5kZWQgYnkgaXRzIGNyZWF0b3JcIixcbiAgLy8gICAgIFRvdXJuYW1lbnRPdmVyOiBcIlRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzIGlzIGluc3VmZmljaWVudCBhbmQgdGhlIHRvdXJuYW1lbnQgaXMgb3Zlci4gVGhlIGNoaXBzIHlvdSBwYWlkIHdpbGwgYmUgcmV0dXJuZWQuXCIsXG4gIC8vICAgfSxcblxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSDku6XkuIrmmK/mlbTkuKrljIXkv67mlLnlroznm7TmjqXliKDpmaTmjokgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgUGFnZU5hbWU6IHtcbiAgICAvLyBDcmFzaCDmuLjmiI/pobVcbiAgICBMb3JlbUlwc3VtOiBcIkxvcmVtIElwc3VtXCIsXG4gIH0sXG5cbiAgV2FpdGluZzoge1xuICAgIC8vIOato+WcqOi/m+WFpea4uOaIjyzor7fnqI3lkI4uLi5cbiAgICBFbnRlckdhbWU6IFwiRW50ZXJpbmcgZ2FtZSwgcGxlYXNlIGhvbGQuLi5cIixcbiAgfSxcblxuICBUaXBzOiB7XG4gICAgLy8g55m75b2V6LSm5Y+3XG4gICAgU2lsYWthbk1hc3VrOiBcIlNpbGFrYW4gTWFzdWtcIixcbiAgICAvLyDmuLjmiI/liqDovb3kuK3vvIzor7flnKjlrozmiJDlkI7lho3mrKHlsJ3or5VcbiAgICBHYW1lSXNMb2FkaW5nOiBcIlRoZSBnYW1lIGlzIGxvYWRpbmcsIHBsZWFzZSB0cnkgYWdhaW4gd2hlbiBmaW5pc2hlZFwiLFxuICAgIC8vIOivt+i+k+WFpeS4i+azqOmHkeminVxuICAgIElucHV0QmV0R29sZDogXCJNYXN1a2thbiBKdW1sYWggVGFydWhhbiB7MH0tezF9XCIsXG4gICAgLy8g5aSN5Yi25oiQ5YqfXG4gICAgQ29weVN1Y2Nlc3M6IFwiU2FsaW4gYmVyaGFzaWxcIixcbiAgICAvLyDku4rml6Xku7vliqHlpZblirHlt7Lpooblj5ZcbiAgICBCb251c0FscmVhZHlSZWNlaXZlZDogXCJIYWRpYWggbWlzaSBoYXJpIGluaSB0ZWxhaCBkaXRlcmltYVwiLFxuICAgIC8vIOivt+e7keWumumCrueusVxuICAgIFBsZWFzZUJpbmRZb3VyRW1haWw6IFwiVG9sb25nIGlrYXQgZW1haWwgQW5kYVwiLFxuICAgIC8vIOWujOaIkOS7u+aEj+S4gOWxgOa4uOaIj+WNs+WPr+mihuWPllxuICAgIENvbXBsZXRlQW55R2FtZVRvR2V0SXQ6IFwiU2VsZXNhaWthbiBnYW1lIGFwYSBzYWphIHVudHVrIG1lbmRhcGF0a2FubnlhXCIsXG4gIH0sXG5cbiAgRXJyQ29kZToge1xuICAgIC8v55m75b2V6ZSZ6K+vXG4gICAgMzAwMDAyOiBcImtlc2FsYWhhbiBtYXN1a1wiLFxuICAgIC8v6YeN5aSN6LCD55SoXG4gICAgMzAwMDAzOiBcInBhbmdnaWxhbiBiZXJ1bGFuZ1wiLFxuICAgIC8v55m75b2V6KKr6Zi75q2iXG4gICAgMzAwMDA0OiBcIkxvZ2luIGRpYmxva2lyXCIsXG4gICAgLy/ov5vlhaXmuLjmiI/lpLHotKVcbiAgICAzMDAwMDU6IFwiR2FnYWwgbWVtYXN1a2kgcGVybWFpbmFuXCIsXG4gICAgLy/otKblj7fmlbDmja7lvILluLhcbiAgICAzMDAwMDY6IFwiRGF0YSBha3VuIHRpZGFrIG5vcm1hbFwiLFxuICAgIC8v6LSm5Y+35pWw5o2u54q25oCB5byC5bi4XG4gICAgMzAwMDA3OiBcIlN0YXR1cyBkYXRhIGFrdW4gdGlkYWsgbm9ybWFsXCIsXG4gICAgLy/muLjmiI/msqHmnInnmbvlvZVcbiAgICAzMDAwMDg6IFwiR2FtZSB0aWRhayBtYXN1a1wiLFxuICAgIC8v6ZyA6KaB6YeN5paw6L+b5YWlXG4gICAgMzAwMDA5OiBcInBlcmx1IG1hc3VrIGtlbWJhbGlcIixcbiAgICAvL+W9k+WJjeeKtuaAgeS4jeiDveS4i+azqFxuICAgIDMwMDAxMDogXCJLZWFkYWFuIHNhYXQgaW5pIHRpZGFrIGJpc2EgYmVydGFydWhcIixcbiAgICAvL+S4i+azqOmHkeW4gemUmeivr1xuICAgIDMwMDAxMTogXCJrb2luIHRhcnVoYW4gc2FsYWhcIixcbiAgICAvLyDmt7vliqDorqLpmIXlpLHotKVcbiAgICAzMDAwMTI6IFwiR2FnYWwgbWVuYW1iYWhrYW4gbGFuZ2dhbmFuXCIsXG4gICAgLy8gQ3Jhc2joh6rliqjmirzms6jpmZDljotcbiAgICAzMDAwMTM6IFwiQmF0YXMgdGVrYW5hbiB0YXJ1aGFuIG90b21hdGlzIGNyYXNoXCIsXG4gICAgLy8g5LiL5rOo5qyh5pWw6ZmQ5Yi2XG4gICAgMzAwMDE0OiBcImJhdGFzIHRhcnVoYW5cIixcbiAgICAvLyDkuI3lhYHorrjmt7vliqDoh6rliqjkuIvms6hcbiAgICAzMDAwMTU6IFwiTWVuYW1iYWhrYW4gdGFydWhhbiBvdG9tYXRpcyB0aWRhayBkaXBlcmJvbGVoa2FuXCIsXG4gICAgLy8gQ3Jhc2joh6rliqjkuIvms6jmraLmjZ9cbiAgICAzMDAwMTY6IFwiQ3Jhc2ggc2VjYXJhIG90b21hdGlzIGJlcnRhcnVoIHN0b3AgbG9zc1wiLFxuICAgIC8vIENyYXNo6Ieq5Yqo5LiL5rOo5q2i55uIXG4gICAgMzAwMDE3OiBcIkNyYXNoIG90b21hdGlzIGJlcnRhcnVoIHRha2UgcHJvZml0XCIsXG4gICAgLy8gQ3Jhc2joh6rliqjkuIvms6jlrozmiJBcbiAgICAzMDAwMTg6IFwiVGFydWhhbiBjcmFzaCBvdG9tYXRpcyBzZWxlc2FpXCIsXG4gICAgLy8gQ3Jhc2jlj5bmtojkuIvms6jlpLHotKXvvIzkuI3lrZjlnKhcbiAgICAzMDAwMTk6IFwiS2VjZWxha2FhbiB1bmJldCBnYWdhbCwgdGlkYWsgYWRhXCIsXG4gICAgLy8g6YeN5aSN5re75Yqg6K6i6ZiFXG4gICAgMzAwMDIwOiBcIlVsYW5naSB1bnR1ayBtZW5hbWJhaGthbiBsYW5nZ2FuYW5cIixcbiAgICAvLyDojrflj5ZoYXNo6K6w5b2V5Y+C5pWw6ZSZ6K+vXG4gICAgMzAwMDIxOiBcIkRhcGF0a2FuIGtlc2FsYWhhbiBwYXJhbWV0ZXIgY2F0YXRhbiBoYXNoXCIsXG4gICAgLy8g6I635Y+WaGFzaOiusOW9leS4jeWtmOWcqFxuICAgIDMwMDAyMjogXCJEYXBhdGthbiBjYXRhdGFuIGhhc2ggdGlkYWsgYWRhXCIsXG4gICAgLy8g5peg5pWI55qEVG9rZW5cbiAgICAzMDAwMjM6IFwiVG9rZW4gVGlkYWsgVmFsaWRcIixcbiAgICAvLyDnmbvlh7rlpLHotKVcbiAgICAzMDAwMjQ6IFwiTG9nb3V0IGdhZ2FsXCIsXG4gICAgLy8g5L2Z6aKd5LiN6LazXG4gICAgMzAwMDI1OiBcIlNhbGRvIHRpZGFrIG1lbmN1a3VwaVwiLFxuICAgIC8vIOWFheWAvOWksei0pVxuICAgIDMwMDAyNjogXCJJc2kgdWxhbmcgZ2FnYWxcIixcbiAgICAvLyDmj5DnjrDlpLHotKVcbiAgICAzMDAwMjc6IFwiUGVuYXJpa2FuIGdhZ2FsXCIsXG4gICAgLy8g6I635Y+W6ZO26KGM5Y2h5YiX6KGo5aSx6LSlXG4gICAgMzAwMDI4OiBcIkdhZ2FsIG1lbmRhcGF0a2FuIGRhZnRhciBrYXJ0dSBiYW5rXCIsXG4gICAgLy8g562+5Yiw5aSx6LSlXG4gICAgMzAwMDI5OiBcIkdhZ2FsIG1hc3VrXCIsXG4gICAgLy8g5peg5pWI55qE5omL5py65Y+35oiW6YKu566xXG4gICAgMzAwMDMwOiBcIk5vbW9yIHRlbGVwb24gYXRhdSBlbWFpbCB0aWRhayB2YWxpZFwiLFxuICAgIC8vIOWPguaVsOmUmeivr1xuICAgIDMwMDAzMTogXCJLZXNhbGFoYW4gcGFyYW1ldGVyXCIsXG4gICAgLy8g5peg5pWI55qE6aqM6K+B56CBXG4gICAgMzAwMDMyOiBcIktvZGUgdmVyaWZpa2FzaSB0aWRhayBiZW5hclwiLFxuICAgIC8vIOaJi+acuuWPt+W3suWtmOWcqFxuICAgIDMwMDAzMzogXCJOb21vciB0ZWxlcG9uIHN1ZGFoIGFkYVwiLFxuICAgIC8vIOmCrueuseW3suWtmOWcqFxuICAgIDMwMDAzNDogXCJFbWFpbCBzdWRhaCBhZGFcIixcbiAgICAvLyBpbWVp5bey5a2Y5ZyoXG4gICAgMzAwMDM1OiBcImltZWkgc3VkYWggYWRhXCIsXG4gICAgLy8g5rOo5YaM5aSx6LSlXG4gICAgMzAwMDM2OiBcInJlZ2lzdHJhc2kgZ2FnYWxcIixcbiAgICAvLyDph43nva7lr4bnoIHlpLHotKVcbiAgICAzMDAwMzc6IFwiR2FnYWwgbWVueWV0ZWwgdWxhbmcgc2FuZGlcIixcbiAgICAvLyDnjqnlsI/muLjmiI/lpLHotKVcbiAgICAzMDAwMzg6IFwiR2FnYWwgbWVtYWlua2FuIG1pbmktZ2FtZVwiLFxuICB9LFxuXG4gIC8qKlxuICAqIOi+k+WFpeahhuajgOafpVxuICAqL1xuICBFRElUQk9YOiB7XG4gICAgTklDS05BTUVOVUxMOiBcIlBsZWFzZSBlbnRlciBuaWNrbmFtZSFcIixcbiAgICBWRVJJRklOVUxMOiBcIlBsZWFzZSBlbnRlciB2ZXJpZmljYXRpb24gY29kZVwiLFxuICAgIFBIT05FTlVMTDogXCJQbGVhc2UgZW50ZXIgcGhvbmUgbnVtYmVyXCIsXG4gICAgRU1BSUxOVUxMOiBcIlBsZWFzZSBlbnRlciBlbWFpbCBudW1iZXJcIixcbiAgICBQSE9ORVRZUEVFUlI6IFwiV3JvbmcgcGhvbmUgbnVtYmVyIGZvcm1hdFwiLFxuICAgIFBTV05VTEw6IFwiUGxlYXNlIGVudGVyIGNvZGVcIixcbiAgICBQU1dXUk9OR0ZVTDogXCJDb2RlIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2hhcmFjdGVyLCBwbGVhc2UgcmUtZW50ZXJcIixcbiAgICBQU1dDT0ZBSUw6IFwiVHdvIGNvZGVzIHlvdSBlbnRlcmVkIGFyZSBkaWZmZXJlbnQsIHBsZWFzZSByZS1lbnRlclwiLFxuICAgIE5FV1BTV05VTEw6IFwiUGxlYXNlIGVudGVyIG5ldyBjb2RlXCIsXG4gICAgTkVXUFNXV1JPTkdGVUw6IFwiTmV3IGNvZGUgY29udGFpbnMgYWRkaXRpb25hbCBjaGFyYWN0ZXJzLCBwbGVhc2UgcmUtZW50ZXJcIixcbiAgICBDT05GSVJNUFNXTlVMTDogXCJUd28gY29kZXMgeW91IGVudGVyZWQgYXJlIGRpZmZlcmVudCxwbGVhc2UgcmUtZW50ZXIuXCIsXG4gICAgQ09ORklSTVBTV1dST05HRlVMOiBcIlR3byBjb2RlcyB5b3UgZW50ZXJlZCBhcmUgZGlmZmVyZW50LHBsZWFzZSByZS1lbnRlci5cIixcbiAgICBPTERORVdQU1dFUVVBTFM6IFwiTmV3IGNvZGUgaXMgc2FtZSB3aXRoIG9sZCBvbmUsZmFpbGVkIHRvIG1vZGlmeS5cIixcbiAgICBCQU5LUFNXTlVMTDogXCJQbGVhc2UgZW50ZXIgYmFuayBhY2NvdW50IHBhc3N3b3JkXCIsXG4gICAgQkFOS1BTV0ZBSUw6IFwiV3JvbmcgYmFuayBhY2NvdW50IHBhc3N3b3JkXCIsXG4gICAgUFNETEVOR1RIRVJST0U6IFwiV3JvbmcgcGFzc3dvcmQgbGVuZ3RoISBQbGVhc2UgZW50ZXIgNi0xMiBjaGFyYWN0ZXJzIVwiLFxuICAgIFVJUElEOiBcIlBsZWFzZSBlbnRlciBCYW5rIGFjY291bnQgbnVtYmVyXCIsXG4gICAgVVNFUk5BTUU6IFwiUGxlYXNlIGVudGVyIFJlY2VpdmVyIE5hbWVcIixcbiAgICBCQU5LTkFNRTogXCJQbGVhc2UgZW50ZXIgQmFuayBOYW1lXCIsXG4gICAgSUZTQzogXCJQbGVhc2UgZW50ZXIgQWNjb3VudHMgQmFuayBcIixcbiAgICBCQU5LVElYVUFOQU1PVU5UOiBcIlBsZWFzZSBlbnN1cmUgdGhhdCAgV2l0aGRyYXdhbCBhbW91bnQgZW50ZXJlZCBjb3JyZWN0bHlcIixcbiAgICBBRERSRVNTTlVMTDogXCJQbGVhc2UgZW50ZXIgYWRkcmVzcyBudW1iZXJcIixcbiAgfSxcblxuICAvLyDlhazlhbFcbiAgQ29tbW9uOiB7XG4gICAgLy8g5rKh5pyJ5pWw5o2uXG4gICAgTm9EYXRhOiBcIlVwcyEgQmVsdW0gYWRhIGRhdGEhXCIsXG4gIH0sXG5cblxuICAvLyDmjqjlub9cbiAgUHJvbW90aW9uOiB7XG4gICAgLy8g5o6o5bm/XG4gICAgbGFiUGFnZU5hbWU6IFwiUmVmZXJlbnNpXCIsXG4gICAgLy8g5o6o5bm/562J57qnXG4gICAgbGFiTGV2ZWxUaXRsZTogXCJSYXNpbyByZWJhdGUgQW5kYVwiLFxuICAgIC8vIOaOqOW5v+eggVxuICAgIGxhYkludml0YXRpb25Db2RlVGl0bGU6IFwiS29kZSBBbmRhXCIsXG4gICAgLy8g5o6o5bm/6ZO+5o6lXG4gICAgbGFiSW52aXRhdGlvblVybFRpdGxlOiBcIlRhdXRhbiBSZWZlcmVuc2kgQW5kYVwiLFxuICAgIC8vIOaOqOW5v+e7n+iuoeaVsOaNrlxuICAgIGxhYlN0YXRUaXRsZTogXCJSaW5na2FzYW4gZGF0YVwiLFxuICAgIC8vIOaAu+aOqOW5v+aUtuWFpVxuICAgIGxhYlRvdGFsR29sZFRpdGxlOiBcIlBlbmdoYXNpbGFuIHRvdGFsXCIsXG4gICAgLy8g5oC75o6o5bm/5o+Q546wXG4gICAgbGFiV2l0aGRyYXdHb2xkVGl0bGU6IFwiSnVtbGFoIHBlbmFyaWthblwiLFxuICAgIC8vIOaYqOaXpeaOqOW5v+aUtuWFpVxuICAgIGxhYlllc3RlcmRheUdvbGRUaXRsZTogXCJQZW5naGFzaWxhbiBrZW1hcmluXCIsXG4gICAgLy8g5pio5pel6YKA6K+35Lq65pWwXG4gICAgbGFiWWVzdGVyZGF5SW52aXRhdGlvblRpdGxlOiBcIkRpdW5kYW5nIGtlbWFyaW5cIixcbiAgICAvLyDmgLvpgoDor7fkurrmlbBcbiAgICBsYWJBbGxJbnZpdGF0aW9uVGl0bGU6IFwiU2VtdWEgZGl1bmRhbmdcIixcbiAgICAvLyDmlbDmja7mnIDlkI7mm7TmlrDml7bpl7RcbiAgICBsYWJVcGRhdGVEYXRlOiBcIlBlcmJhcnVpIHdha3R1OiB7MH1cIixcbiAgICAvLyDmjqjlub/mlLblhaXljoblj7JcbiAgICBsYWJHb2xkR3JhcGhUaXRsZTogXCJSaXdheWF0IFBlbmRhcGF0YW4gQW5kYVwiLFxuICAgIC8vIOaOqOW5v+S6uuaVsOWOhuWPslxuICAgIGxhYkludml0YXRpb25HcmFwaFRpdGxlOiBcIlJpd2F5YXQgUmVmZXJlbnNpIEFuZGFcIixcbiAgICAvLyDmjqjlub/mlLblhaXmjpLlkI1cbiAgICBsYWJSYW5rVGl0bGU6IFwiTWl0cmEgdXRhbWEga2FtaVwiLFxuICAgIC8vIOmHkeW4gVxuICAgIFJwR29sZDogXCJSUCB7MH1cIixcbiAgICAvLyDmiJDkuLrmiJHku6znmoTlkIjkvZzkvJnkvLRcbiAgICBsYWJDb2xsYWJvcmF0ZVRpdGxlOiBcIk1lbmphZGkgcGFydG5lciBrYW1pXCIsXG4gICAgLy8g5oiQ5Li65oiR5Lus55qE5ZCI5L2c5LyZ5Ly05ZCO77yM5oKo5bCG5Lqr5Y+X6auY6aKd5Zue5oql44CCIOWQjOaXtu+8jOWhq+WGmeaCqOeahOaOqOiNkOeggeeahOaci+WPi+i/mOWPr+S7peiOt+W+l+mineWklueahOazqOWGjOWSjOWFheWAvOWlluWKseOAglxuICAgIGxhYkNvbGxhYm9yYXRlQ29udGVudDogXCJBZnRlciBiZWNvbWluZyBvdXIgcGFydG5lciwgeW91IHdpbGwgZW5qb3kgaGlnaCByZXdhcmRzLiBBdCB0aGUgc2FtZSB0aW1lLCBmcmllbmRzIHdobyBmaWxsIGluIHlvdXIgcmVmZXJyYWwgY29kZSBjYW4gYWxzbyBnZXQgYWRkaXRpb25hbCByZWdpc3RyYXRpb24gYW5kIHJlY2hhcmdlIHJld2FyZHMuXCIsXG4gICAgLy8g56uL5Y2z6I635Y+W5oKo55qE5LiT5bGe5o6o6I2Q56CBXG4gICAgbGFiR2V0SW52aXRhdGlvbkNvbnRlbnQ6IFwiRGFwYXRrYW4ga29kZSByZWZlcmVuc2kgZWtza2x1c2lmIEFuZGEgc2VrYXJhbmdcIixcbiAgICAvLyDog73ojrflvpflpJrlsJHlpZblirFcbiAgICBsYWJHb3RBd2FyZFRpdGxlOiBcIkJlcmFwYSBiYW55YWsgaGFkaWFoIHlhbmcgYmlzYSBhbmRhIGRhcGF0a2FuP1wiLFxuICAgIC8vIOS4jeWQjOe6p+WIq+eahOaOqOW5v+iAhe+8jOaIkeS7rOaPkOS+m+S4jeWQjOe6p+WIq+eahOWlluWKseS7pem8k+WKseaOqOW5v1xuICAgIGxhYkxldmVsQ29udGVudDogXCJUaW5na2F0IHByb21vdG9yIHlhbmcgYmVyYmVkYSwga2FtaSBtZW1iZXJpa2FuIHRpbmdrYXQgcGVuZ2hhcmdhYW4geWFuZyBiZXJiZWRhIHVudHVrIG1lbmRvcm9uZyBwcm9tb3NpXCIsXG4gICAgLy8g6YeR54mM5o6o5bm/XG4gICAgbGFiTGV2ZWxUaXRsZTA6IFwiUHJvbW90b3IgRW1hc1wiLFxuICAgIC8vIOmcgOimgeaOqOW5v+i+vuWIsDEwMDDkurrvvIznm4jliKnovr7liLAgMTAwMDAwMDAwXG4gICAgbGFiTGV2ZWxDb250ZW50MDogXCJQcm9tb3NpIHRpbmdrYXQgMSBtZW5jYXBhaSAxMDAwIG9yYW5nLCB1bnR1bmcgbWVuY2FwYWkgUnAxMDAwMDAwMDBcIixcbiAgICAvLyDpk7bniYzmjqjlub9cbiAgICBsYWJMZXZlbFRpdGxlMTogXCJQcm9tb3RvciBwZXJha1wiLFxuICAgIC8vIOmcgOimgeaOqOW5v+i+vuWIsDEwMOS6uu+8jOebiOWIqei+vuWIsCAxMDAwMDAwMFxuICAgIGxhYkxldmVsQ29udGVudDE6IFwiUHJvbW9zaSB0aW5na2F0IDIgbWVuY2FwYWkgMTAwIG9yYW5nLCB1bnR1bmcgbWVuY2FwYWkgUnAxMDAwMDAwMFwiLFxuICAgIC8vIOmTnOeJjOaOqOW5v1xuICAgIGxhYkxldmVsVGl0bGUyOiBcIlByb21vdG9yIHBlcnVuZ2d1XCIsXG4gICAgLy8g5peg6ZyA5rGCXG4gICAgbGFiTGV2ZWxDb250ZW50MjogXCJUaWRhayBhZGEgcGVyc3lhcmF0YW5cIixcbiAgICAvLyDmgqjkvJrlpoLkvZXojrflvpflpZblirFcbiAgICBsYWJBd2FyZFRpdGxlOiBcIkJhZ2FpbWFuYSBtZW1iZXJpIEFuZGEgcGVuZ2hhcmdhYW4gP1wiLFxuICAgIC8vIOaCqOeahOaci+WPi+eOqea4uOaIj+WQju+8jOaIkeS7rOS8muagueaNruS9oOeahOetiee6p+WIhuS6q+S7lui1muWIsOeahOWIqea2pue7meS9oFxuICAgIGxhYkF3YXJkQ29udGVudDogXCJTZXRlbGFoIHRlbWFuIEFuZGEgbWVtYWlua2FuIGdhbWUgdGVyc2VidXQsIGthbWkgYWthbiBtZW1iYWdpIGtldW50dW5nYW4geWFuZyBkaWEgaGFzaWxrYW4ga2VwYWRhIEFuZGEgc2VzdWFpIGRlbmdhbiBsZXZlbCBBbmRhXCIsXG4gICAgLy8g5oKo55qE5L2j6YeRXG4gICAgbGFiQnJva2VyYWdlVGl0bGU6IFwiWW91ciBjb21taXNzaW9uXCIsXG4gICAgLy8g5oKo5pyL5Y+L55qE5Yip5ramwrfmir3msLTCt1xuICAgIGxhYkJyb2tlcmFnZUNvbnRlbnQ6IFwiS2V1bnR1bmdhbiB0ZW1hbiBhbmRhwrdIb3VzZSBlZGdlwrcgXCIsXG4gICAgLy8g5byA5aeL6LWa6ZKxXG4gICAgbGFiTG9naW46IFwiTXVsYWkgTWVuZ2hhc2lsa2FuXCIsXG4gICAgLy8g55Sx5LqO6K6h566X6YeP5aSn77yM57O757uf5Lya5q+P5aSp5pu05paw5LiA5qyh5pWw5o2u77yM5oKo5Y+v5Lul5q+P5aSp5p+l55yL5pio5aSp55qE5pWw5o2uXG4gICAgcHJvbW90aW9uVXBkYXRlRGF0ZVRpcHM6IFwiS2FyZW5hIGJhbnlha255YSBwZW5naGl0dW5nYW4sIHNpc3RlbSBha2FuIG1lbXBlcmJhcnVpIGRhdGEgc2VrYWxpIHNlaGFuLCBkYW4gQW5kYSBkYXBhdCBtZWxpaGF0IGRhdGEga2VtYXJpbiBzZXRpYXAgaGFyaS5cIixcbiAgfSxcblxuICBNaW5pZ2FtZToge1xuICAgIC8vIOinhuWbvuWQjVxuICAgIGxhYlBhZ2VOYW1lOiBcIkJlcnB1dGFyXCIsXG4gICAgLy8g6YeR5biBXG4gICAgUnBHb2xkOiBcIlJQIHswfVwiLFxuICAgIC8vIOS7u+WKoVxuICAgIGxhYlRhc2tUaXRsZTogXCJQZXJzeWFyYXRhblwiLFxuICAgIC8vIOmCrueusee7keWumuaPj+i/sFxuICAgIGxhYlRhc2tEZXNjMDogXCIxLk1lbmdpa2F0IGVtYWlsIEFuZGFcIixcbiAgICAvLyDnu5Hlrprpgq7nrrFcbiAgICBsYWJCaW5kRW1haWw6IFwiUGVyZ2kgbWVuZ2lrYXRcIixcbiAgICAvLyDlrozmiJDkuIDlsYDmuLjmiI/mj4/ov7BcbiAgICBsYWJUYXNrRGVzYzE6IFwiMi5CZXJtYWluIHNhdHUga2FsaSBwdXRhcmFuIHBlbWFpbmFuXCIsXG4gICAgLy8g5aWW6YeRXG4gICAgbGFiQm9udXNUaXRsZTogXCJMc2lcIixcbiAgICAvLyDlpZbph5Hmj4/ov7BcbiAgICBsYWJCb251c1RpcHM6IFwiQnVub3MgaGFyaWFuIGhpbmdnYVwiLFxuICB9XG5cbn0iXX0=