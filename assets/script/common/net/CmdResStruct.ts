import { MST } from "../../framework/external/protoc";
import { protoPackage, serverType } from "./CommonService";

// /**
//  * 解析消息proto注册
//  *  @description proto 解析注册 
//  */
// export  let CmdResStruct = {
//     //--大厅消息解析注册
//     [serverType.GateWay+''+protoPackage.gateway.Gate_Cmd_ID.Identity_Auth]: protoPackage.gateway.IdenityAuthRes,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.LOGIN]: protoPackage.hall.base.LoginRes,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.HORSE_LANTERN]: protoPackage.hall.HorseLantern,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.SIGN_REWARD]: protoPackage.hall.SignRewardResp,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.GET_USER_SIGN]: protoPackage.hall.GetUserSignRes,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.USER_SIGN]: protoPackage.hall.GetUserSignRes,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.USER_WEALTH]: protoPackage.hall.UserWealth,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.SEND_PHONE_CODE]: protoPackage.hall.SendPhoneCodeRes,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.BIND_PHONE]: protoPackage.hall.base.BindPhoneRes,
//     [serverType.Lobby+''+protoPackage.hall.HallCmd.USER_INFORMATION]: protoPackage.hall.UserInformationRes,

//     [serverType.Lobby+''+protoPackage.hall.HallCmd.UPDATE_NICKNAME]: protoPackage.hall.UpdateNicknameRes,
// }


class _CmdResStruct {

    protected resMsg = {};
    protected resGameMsg = {};

    constructor() {
        this.resMsg = {};
        this.resGameMsg = {};
        this.registerHall()
    }
    //--大厅消息解析注册
    private registerHall() {
        // TODO: 处理消息注册

        this.resMsg[MST.OuterOpcode_Gate.G2C_EnterMap_Res] = MST.G2C_EnterMap_Res;
        this.resMsg[MST.OuterOpcode_Gate.G2C_Ping_Res] = MST.G2C_Ping_Res;
        this.resMsg[MST.OuterOpcode_Gate.G2C_LoginGate_Res] = MST.G2C_LoginGate_Res;

        this.resMsg[MST.OuterOpcode_Lobby.L2C_BindMailBox_Res] = MST.L2C_BindMailBox_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_BindPhone_Res] = MST.L2C_BindPhone_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GoldRankDay_Res] = MST.L2C_GoldRankDay_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_WinDayRank_Res] = MST.L2C_WinDayRank_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_WinWeekRank_Res] = MST.L2C_WinWeekRank_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_WinMonthRank_Res] = MST.L2C_WinMonthRank_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetGameList_Res] = MST.L2C_GetGameList_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_BetRank_Res] = MST.L2C_BetRank_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_Deposit_Res] = MST.L2C_Deposit_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_ChipsChange_Mes] = MST.L2C_ChipsChange_Mes;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_Withdraw_Res] = MST.L2C_Withdraw_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetStoreList_Res] = MST.L2C_GetStoreList_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetDepositLimit_Res] = MST.L2C_GetDepositLimit_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetWithdrawLimit_Res] = MST.L2C_GetWithdrawLimit_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetBankList_Res] = MST.L2C_GetBankList_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetBankCardInfo_Res] = MST.L2C_GetBankCardInfo_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_BindBankCard_Res] = MST.L2C_BindBankCard_Res;
        this.resMsg[MST.OuterOpcode_Lobby.L2C_GetWithdrawRecords_Res] = MST.L2C_GetWithdrawRecords_Res;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_GetDepositList] = MST.S2C_GetDepositList;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_MinigameInfo] = MST.S2C_MinigameInfo;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_MinigameLottery] = MST.S2C_MinigameLottery;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_GetSignedInfo] = MST.S2C_GetSignedInfo;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_Signed] = MST.S2C_Signed;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_GetCheckCode] = MST.S2C_GetCheckCode;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_Register] = MST.S2C_Register;
        this.resMsg[MST.OuterOpcode_Lobby.C2S_BindPhone] = MST.C2S_BindPhone;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_BindEmail] = MST.S2C_BindEmail;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_ResetPassword] = MST.S2C_ResetPassword;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_BindPhone] = MST.S2C_BindPhone;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_GetRegisterRewordConfig] = MST.S2C_GetRegisterRewordConfig;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_ModifyAvartar] = MST.S2C_ModifyAvartar;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_PromotionInfo] = MST.S2C_PromotionInfo;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_GetMissionList] = MST.S2C_GetMissionList;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_MissionClaim] = MST.S2C_MissionClaim;
        this.resMsg[MST.OuterOpcode_Lobby.S2C_MessageNotify] = MST.S2C_MessageNotify;
        this.resMsg[MST.OuterOpcode_Map.M2C_CreateMyUnit_Mes] = MST.M2C_CreateMyUnit_Mes;
        this.resMsg[MST.OuterOpcode_Map.M2C_RemoveUnits_Mes] = MST.M2C_RemoveUnits_Mes;
        this.resMsg[MST.OuterOpcode_Map.M2C_TransferMap_Res] = MST.M2C_TransferMap_Res;
        this.resMsg[MST.OuterOpcode_Map.M2C_Auth_Res] = MST.M2C_Auth_Res;
        this.resMsg[MST.OuterOpcode_Map.M2C_AuthOut_Res] = MST.M2C_AuthOut_Res;
        this.resMsg[MST.OuterOpcode_Map.M2C_KickOut_Mes] = MST.M2C_KickOut_Mes;
        this.resMsg[MST.OuterOpcode_Map.M2C_GoldChange_Mes] = MST.M2C_GoldChange_Mes;

        // this.resMsg[serverType.GateWay + '' + protoPackage.gateway.Gate_Cmd_ID.Identity_Auth] = protoPackage.gateway.IdenityAuthRes
        // // this.resMsg[serverType.GateWay+''+protoPackage.gateway.Gate_Cmd_ID.Identity_Auth] = protoPackage.gateway.IdenityAuthRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.LOGIN] = protoPackage.hall.base.LoginRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.HORSE_LANTERN] = protoPackage.hall.HorseLantern
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.SIGN_REWARD] = protoPackage.hall.SignRewardResp
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.GET_USER_SIGN] = protoPackage.hall.GetUserSignRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.USER_SIGN] = protoPackage.hall.GetUserSignRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.USER_WEALTH] = protoPackage.hall.UserWealth
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.SEND_PHONE_CODE] = protoPackage.hall.SendPhoneCodeRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.BIND_PHONE] = protoPackage.hall.base.BindPhoneRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.USER_INFORMATION] = protoPackage.hall.UserInformationRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.UPDATE_NICKNAME] = protoPackage.hall.UpdateNicknameRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.UPDATE_HEAD_IMG] = protoPackage.hall.base.UpdateHeadImgRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.RANKING_LIST] = protoPackage.hall.base.RankingListRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.BIG_WINNER_NOTICE] = protoPackage.hall.BigWinnerNotice
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.NOTIFY_OTHER_LOGIN] = protoPackage.hall.OtherLogin
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.FLUSH_RED_DOT] = protoPackage.hall.base.FlushRedDotRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.MAIL_REQ] = protoPackage.hall.MailRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.REFRESH_SAFETY_BOX] = protoPackage.hall.RefreshSafetyBoxRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.OPERATE_SAFETY_BOX] = protoPackage.hall.OperateSafetyBoxRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.FETCH_PROUCTS] = protoPackage.hall.FetchProductsRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID] = protoPackage.hall.FetchHwPayRequestIdRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_GetBankInfo] = protoPackage.hall.base.GetBankInfoRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_BankList] = protoPackage.hall.base.BankListRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_BindBankInfo] = protoPackage.hall.StatusMsg
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_ModifyBankInfo] = protoPackage.hall.StatusMsg
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_WithdrawalConfig] = protoPackage.hall.base.WithdrawalConfigRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_Withdrawal] = protoPackage.hall.StatusMsg
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_WithdrawalRecord] = protoPackage.hall.base.WithdrawalRecordRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.SHARE] = protoPackage.hall.base.ShareRes
        // this.resMsg[serverType.Lobby + '' + protoPackage.hall.HallCmd.CMD_GAME_LIST] = protoPackage.hall.base.GameListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_GetRoomList] = protoPackage.hall.GetRoomListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.MatchRoom] = protoPackage.hall.MatchRoomRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AGENT_LEVEL] = protoPackage.hall.base.AgentLevelListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_BIND_AGENT] = protoPackage.hall.base.BindAgentRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AGENT_TOTAL] = protoPackage.hall.base.UserAgentStatsRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AGENT_DAY_STATS] = protoPackage.hall.base.UserAgentDayStatsRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AGENT_DETAIL] = protoPackage.hall.base.UserAgentDetailRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AGENT_WITHDRAW_RECORD] = protoPackage.hall.base.UserAgentWithdrawRecordRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AGENT_WITHDRAW] = protoPackage.hall.base.UserAgentWithdrawRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CheckPlayerJoinGameReq] = protoPackage.hall.CheckPlayerJoinGameRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_SETTING_PASSWD] = protoPackage.hall.SettingPasswdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_TOTAL_AMOUNT] = protoPackage.hall.TotalAmountRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD] = protoPackage.hall.ChangePasswdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_STORED_AMOUNT] = protoPackage.hall.StoredAmountRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_INCOME_BREAKDOWN] = protoPackage.hall.IncomeBreakdownRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CANCEL_STORED_AMOUNT] = protoPackage.hall.CancelStoredAmountRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT] = protoPackage.hall.ExtractAmountRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.UPLOAD_HEAD_IMG] = protoPackage.hall.base.UploadHeadImgRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_SET_PASSWD] = protoPackage.hall.SetPasswdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD] = protoPackage.hall.SetSecondPasswdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD] = protoPackage.hall.ChangeSecondPasswdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD] = protoPackage.hall.CheckSecondPasswdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_PushInsertNewPlayerGuid] = protoPackage.hall.PushInsertNewPlayerGuid
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_PAY_CHANNEL_LIST] = protoPackage.hall.PayChannelListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID] = protoPackage.hall.FetchHwPayRequestIdRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_PushResetNewPlayerGuid] = protoPackage.hall.PushResetNewPlayerGuid
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeHallIconConfig] = protoPackage.hall.NoticeHallIconConfig
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CUSTOMER_SERVICE_CONFIG] = protoPackage.hall.CustomerServiceConfigRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_FriendsList] = protoPackage.hall.FriendsListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_DeleteFriend] = protoPackage.hall.DeleteFriendRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_FindUser] = protoPackage.hall.FindUserRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AddFriend] = protoPackage.hall.AddFriendRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_Application] = protoPackage.hall.ApplicationRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_DealApplication] = protoPackage.hall.DealApplicationRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_FriendSetting] = protoPackage.hall.FriendSettingRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_FriendInvite] = protoPackage.hall.FriendInviteRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeInvite] = protoPackage.hall.NoticeInvite
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_UpdateUserArea] = protoPackage.hall.UpdateUserAreaRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_JoinDesk] = protoPackage.hall.JoinDeskRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_InTheHall] = protoPackage.hall.InTheHallRes



        // //红包
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_SendRedPacket] = protoPackage.hall.SendRedPacketRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_RedPacketSendRecord] = protoPackage.hall.RedPacketSendRecordRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_RedPacketDetails] = protoPackage.hall.RedPacketDetailsRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_RedPacketReceiveRecord] = protoPackage.hall.RedPacketReceiveRecordRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_RedPacketLogin] = protoPackage.hall.RedPacketLoginRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_ProductOrder] = protoPackage.hall.ProductOrderRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_AddressBook] = protoPackage.hall.AddressBookRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_PreSendRedPacket] = protoPackage.hall.PreSendRedPacketRes


        // // 梦幻体育
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_DreamGame] = protoPackage.hall.DreamGameRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_DreamHistory] = protoPackage.hall.DreamHistoryRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_DreamTransfer] = protoPackage.hall.DreamTransferRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_DreamTransferRecord] = protoPackage.hall.DreamTransferRecordRes

        // // 救济金
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeRelief] = protoPackage.hall.NoticeRelief
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeExchangeUserGoldType] = protoPackage.hall.NoticeExchangeUserGoldType

        // // BTI体育
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_BTIGame] = protoPackage.hall.BTIGameRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_BTIHistory] = protoPackage.hall.BTIHistoryRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_BTITransfer] = protoPackage.hall.BTITransferRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_BTITransferRecord] = protoPackage.hall.BTITransferRecordRes

        // //转盘
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.Activity_Turntable] = protoPackage.hall.ActivityTurntableRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.Play_Turntable] = protoPackage.hall.PlayTurntableRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.Turntable_Record] = protoPackage.hall.TurntableRecordRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.Turntable_Address] = protoPackage.hall.TurntableAddressRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeActivityTurntable] = protoPackage.hall.NoticeActivityTurntable  

        // //首冲活动
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeFirstPay] = protoPackage.hall.NoticeFirstPay  

        // //好友房

        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CreatePrivateRoomDesk] = protoPackage.hall.CreatePrivateRoomDeskRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeHasBeenKicked] = protoPackage.hall.NoticeHasBeenKicked   
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_FriendDeskConfig] = protoPackage.hall.FriendDeskConfigRes

        // //新排行榜
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NewRankingList] = protoPackage.hall.NewRankingListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NewRankingRecord] = protoPackage.hall.NewRankingRecordRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NewRankingReceive] = protoPackage.hall.NewRankingReceiveRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NewRankingRule] = protoPackage.hall.NewRankingRuleRes

        // //Banner弹窗
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_BannerPopup] = protoPackage.hall.BannerPopupRes

        // //大厅资源
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_HallResource] = protoPackage.hall.HallResourceRes

        // //福利中心
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_WelfareCenter] = protoPackage.hall.WelfareCenterRes

        // //锦标赛
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_TournamentConfig] = protoPackage.hall.TournamentConfigRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CreateTournament] = protoPackage.hall.CreateTournamentRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_TournamentSignUp] = protoPackage.hall.TournamentSignUpRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_TournamentSignUpUsers] = protoPackage.hall.TournamentSignUpUsersRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_TournamentList] = protoPackage.hall.TournamentListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_TournamentDetail] = protoPackage.hall.TournamentDetailRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CloseTournament] = protoPackage.hall.CloseTournamentRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_MyTournament] = protoPackage.hall.TournamentListRes
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeTournamentStart] = protoPackage.hall.NoticeTournamentStart
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_NoticeTournamentClose] = protoPackage.hall.NoticeTournamentClose
        // this.resMsg[serverType.Lobby + "" + protoPackage.hall.HallCmd.CMD_CheckTournament] = protoPackage.hall.CheckTournamentRes
    }

    /**
     * 消息解析注册
     * @param mainCmd 
     * @param res 
     */
    public register(mainCmd, res) {
        if (this.resGameMsg[mainCmd]) {
            return;
        }
        this.resGameMsg[mainCmd] = res;
    }
    /**
     * 消息解析
     * @param mainCmd 
     */
    public decode(mainCmd) {
        if (this.resMsg[mainCmd]) {
            return this.resMsg[mainCmd]
        } else if (this.resGameMsg[mainCmd]) {
            return this.resGameMsg[mainCmd]
        }
        return null;
    }

}

export const CmdResStruct = new _CmdResStruct();


