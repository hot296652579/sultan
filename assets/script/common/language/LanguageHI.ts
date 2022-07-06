cc.sys.LANGUAGE_HINDI = "hi"

export let LanguageHI = {

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
    E20010001: "Network disconnected, please login again！", //token Invalid
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
    378: "Gold shortage",//金币不足坐下失败
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
    702: "Currently carrying insufficient gold coins", /**@description  当前携带金币不足，请选择较低房间或及时补充金币*/
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

}