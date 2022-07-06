
export namespace HallConfig {
    /**@description 大厅图标 */
    export let hallIconConfig = null;
    /**@description 大厅运营区 */
    export let hallIconConfig1 = null;

    /**@description 大厅功能列表区 */
    export let hallIconConfig2 = null;

    /**@description 锦标赛列表区 */
    export let hallIconConfig3 = null;

}

/**
 * @description 登录场景逻辑流程控制器  
 */

import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import Controller from "../framework/controller/Controller";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import PanelHelp from "../msgbox/PanelHelp";
import { i18n } from "../common/language/LanguageImpl";
import { LogicEvent } from "../common/event/LogicEvent";
import { User } from "../global/User";
import { MST } from "../framework/external/protoc";
import { Config } from "../common/config/Config";
import { UtilMgr } from "../global/UtilMgr";
import HallData from "../data/HallData";
import UserData from "../data/UserData";
import * as LocalStoreageDefine from "../common/define/LocalStorageDefine";
import RechargeData from "../data/RechargeData";
import fbsdk from "../sdk/fbsdk";
import googlesdk from "../sdk/googlesdk";
import twittersdk from "../sdk/twittersdk";

const { ccclass, property } = cc._decorator;
export enum LoginType {
    youke = 0,
    telephon = 1,
    google = 2,
    facebook = 3,
    twitter = 4,
    telegram = 5,
    fast = 6
}
@ccclass
@injectService(LobbyService.instance)
export default class HallNetController extends Controller<LobbyService> {

    protected bindingEvents() {
        super.bindingEvents()
        // this.addEvent(MST.OuterOpcode_Lobby.L2C_GoldRankDay_Res, this.L2C_GoldRankDay_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_WinDayRank_Res, this.onL2C_WinDayRank_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_WinWeekRank_Res, this.onL2C_WinWeekRank_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_WinMonthRank_Res, this.onL2C_WinMonthRank_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_BetRank_Res, this.onL2C_BetRank_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_Deposit_Res, this.onL2C_Deposit_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_Withdraw_Res, this.onL2C_Withdraw_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_ChipsChange_Mes, this.onL2C_ChipsChange_Mes);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetStoreList_Res, this.onL2C_GetStoreList_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetDepositLimit_Res, this.onL2C_GetDepositLimit_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetWithdrawLimit_Res, this.onL2C_GetWithdrawLimit_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetBankList_Res, this.onL2C_GetBankList_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetBankCardInfo_Res, this.onL2C_GetBankCardInfo_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_BindBankCard_Res, this.onL2C_BindBankCard_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetWithdrawRecords_Res, this.onL2C_GetWithdrawRecords_Res);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_GetDepositList, this.onS2C_GetDepositList);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_GetSignedInfo, this.onS2C_GetSignedInfo);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_Signed, this.onS2C_Signed);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_GetCheckCode, this.onS2C_GetCheckCode);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_Register, this.onS2C_Register);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_BindPhone, this.onS2C_BindPhone);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_BindEmail, this.onS2C_BindEmail);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_ResetPassword, this.onS2C_ResetPassword);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_GetRegisterRewordConfig, this.onS2C_GetRegisterRewordConfig);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_ModifyAvartar, this.onS2C_ModifyAvartar);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_GetMissionList, this.onS2C_GetMissionList);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_MissionClaim, this.onS2C_MissionClaim);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_MessageNotify, this.onS2C_MessageNotify);
        this.addEvent(MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
        this.addEvent(MST.OuterOpcode_Map.M2C_AuthOut_Res, this.onM2C_AuthOut_Res);
        this.addEvent(MST.OuterOpcode_Map.M2C_KickOut_Mes, this.onM2C_KickOut_Mes);
        this.addEvent(MST.OuterOpcode_Map.M2C_GoldChange_Mes, this.onM2C_GoldChange_Mes);
        this.addEvent(MST.OuterOpcode_Map.M2C_Auth_Res, this.onM2C_Auth_Res);
        this.addEvent(MST.OuterOpcode_Lobby.L2C_GetGameList_Res, this.onL2C_GetGameList_Res);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_MinigameInfo, this.onS2C_MinigameInfo);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_MinigameLottery, this.onS2C_MinigameLottery);
        this.addEvent(MST.OuterOpcode_Lobby.S2C_PromotionInfo, this.onS2C_PromotionInfo);
        // this.registerEvent(serverType.GateWay, protoPackage.gateway.Gate_Cmd_ID.Identity_Auth, this.onSendMsg);
        // this.registerEvent(serverType.GateWay, protoPackage.gateway.Gate_Cmd_ID.Identity_Auth, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.LOGIN, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.GET_USER_SIGN, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.SIGN_REWARD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.BIND_PHONE, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.SEND_PHONE_CODE, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.USER_SIGN, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.USER_INFORMATION, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.UPDATE_NICKNAME, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.UPDATE_HEAD_IMG, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.RANKING_LIST, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.BIG_WINNER_NOTICE, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.NOTIFY_OTHER_LOGIN, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.FLUSH_RED_DOT, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.MAIL_REQ, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.REFRESH_SAFETY_BOX, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.OPERATE_SAFETY_BOX, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.FETCH_PROUCTS, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_GetBankInfo, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BankList, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BindBankInfo, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_ModifyBankInfo, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_WithdrawalConfig, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_Withdrawal, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_WithdrawalRecord, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.SHARE, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.RANKING_LIST, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_GAME_LIST, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_GetRoomList, this.getRoomlistRes);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.MatchRoom, this.onMatchGame);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AGENT_LEVEL, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BIND_AGENT, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AGENT_TOTAL, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AGENT_DAY_STATS, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AGENT_DETAIL, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AGENT_WITHDRAW_RECORD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AGENT_WITHDRAW, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CheckPlayerJoinGameReq, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SETTING_PASSWD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TOTAL_AMOUNT, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CHANGE_PASSWD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_STORED_AMOUNT, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_INCOME_BREAKDOWN, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CANCEL_STORED_AMOUNT, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.UPLOAD_HEAD_IMG, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SET_PASSWD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SET_SECOND_PASSWORD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CHANGE_SECOND_PASSWD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PAY_CHANNEL_LIST, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.FETCH_HW_PAY_ORDERID, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PushInsertNewPlayerGuid, this.onPushInsertNewPlayerGuid);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PushResetNewPlayerGuid, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeHallIconConfig, this.onHallIconConfig);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CUSTOMER_SERVICE_CONFIG, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_FriendsList, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_DeleteFriend, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_FindUser, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AddFriend, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_Application, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_DealApplication, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_FriendSetting, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_FriendInvite, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeInvite, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_UpdateUserArea, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_JoinDesk, this.onSendMsg);

        // //红包相关
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_SendRedPacket, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_RedPacketSendRecord, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_RedPacketDetails, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_RedPacketReceiveRecord, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_RedPacketLogin, this.onSendMsg);

        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_ProductOrder, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AddressBook, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PreSendRedPacket, this.onSendMsg);

        // // 梦幻体育---------
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_DreamGame, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_DreamTransfer, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_DreamTransferRecord, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_DreamHistory, this.onSendMsg);
        // // 救济金
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeRelief, this.onNoticeRelief);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeExchangeUserGoldType, this.onNoticeExchangeUserGoldType);
        // //BTI体育
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BTIGame, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BTITransfer, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BTITransferRecord, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BTIHistory, this.onSendMsg);
        // //转盘
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.Activity_Turntable, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.Play_Turntable, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.Turntable_Record, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.Turntable_Address, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeActivityTurntable, this.onSendMsg);

        // //首冲活动
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeFirstPay, this.onNoticeFirstPay);
        // //好友房
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CreatePrivateRoomDesk, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeHasBeenKicked, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_FriendDeskConfig, this.onSendMsg);

        // //新排行榜
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingList, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingRecord, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingReceive, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NewRankingRule, this.onSendMsg);


        // //Banner弹窗
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_BannerPopup, this.onSendMsg);

        // //大厅资源
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_HallResource, this.onSendMsg);

        // //福利中心
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_WelfareCenter, this.onSendMsg);

        // //锦标赛
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentConfig, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CreateTournament, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentSignUp, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentSignUpUsers, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentList, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentDetail, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CloseTournament, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_MyTournament, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeTournamentStart, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_NoticeTournamentClose, this.onSendMsg);
        // this.registerEvent(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CheckTournament, this.onSendMsg);

    }

    private L2C_GoldRankDay_Res(data) {
        let hallData = G.DataMgr.get(HallData);
        // let units = data.Units
        hallData.winRankList = data.Units

        dispatch("L2C_GoldRankDay_Res");
    }

    private onL2C_WinDayRank_Res(data) {
        let hallData = G.DataMgr.get(HallData);
        // let units = data.Units
        hallData.winRankList = data.infos

        dispatch("L2C_WinDayRank_Res");
    }
    private onL2C_WinWeekRank_Res(data) {
        let hallData = G.DataMgr.get(HallData);
        // let units = data.Units
        hallData.winRankList = data.infos

        dispatch("L2C_WinWeekRank_Res");
    }
    private onL2C_WinMonthRank_Res(data) {
        let hallData = G.DataMgr.get(HallData);
        // let units = data.Units
        hallData.winRankList = data.infos

        dispatch("L2C_WinMonthRank_Res");
    }

    private onL2C_BetRank_Res(data) {
        let hallData = G.DataMgr.get(HallData);
        // let units = data.Units
        hallData.betRankList = data.infos

        dispatch("L2C_BetRank_Res");
    }

    private onM2C_TransferMap_Res(data) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        dispatch("M2C_TransferMap_Res", data)
    }

    private onM2C_AuthOut_Res(data) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }


        G.DataMgr.get(UserData).clearUserData();

        dispatch("M2C_AuthOut_Res", data)
    }

    private onNoticeFirstPay(data) {
        if (data && data.data) {
            G.Logger.log("首冲", data)
            if (User._popWindows.length) {
                UtilMgr.pushWindows(["openFirstPayView", data.data.firstPayWindowsForceSwitch, 40])
            } else {
                dispatch("openFirstPayView", data.data.firstPayWindowsForceSwitch)
            }
        }
    }
    /**
     * 大厅图标
     * @param msg 
     */
    private onHallIconConfig(msg) {
        G.Logger.log("大厅图标", msg)
        if (msg && msg.data && msg.data.hallIconConfig) {
            HallConfig.hallIconConfig = msg.data.hallIconConfig
            HallConfig.hallIconConfig1 = msg.data.hallIconConfig1
            HallConfig.hallIconConfig2 = msg.data.hallIconConfig2
            HallConfig.hallIconConfig3 = msg.data.hallIconConfig3
        }
        dispatch('hallIconConfig')

    }
    /**
     * 游戏新手引导
     * @param msg 
     */
    private onPushInsertNewPlayerGuid(msg) {
        if (msg && msg.data && msg.data.gameId) {
            User._gameIds.push(msg.data.gameId)
        }
        dispatch("CMD_PushInsertNewPlayerGuid", msg.data.gameId);
    }

    private onSendMsg(msg) {
        G.Logger.log(msg);
        if (msg) {
            dispatch(makeKey(msg.mainCmd), msg.data);
        }
    }

    // private getRoomlist(data: com.bt.game.proto.hall.IGetRoomListRes): com.bt.game.proto.hall.IRoomInfo[] | com.bt.game.proto.hall.IPveRoomInfo[] | com.bt.game.proto.hall.IPvpRoomInfo[] {
    //     let roomList: com.bt.game.proto.hall.IRoomInfo[] | com.bt.game.proto.hall.IPveRoomInfo[] | com.bt.game.proto.hall.IPvpRoomInfo[] = null;
    //     switch (data.infoType) {
    //         case com.bt.game.proto.hall.RoomInfoType.Pve:
    //             roomList = data.pveInfos as com.bt.game.proto.hall.IPveRoomInfo[];
    //             break;
    //         case com.bt.game.proto.hall.RoomInfoType.Pvp:
    //             roomList = data.roomList as com.bt.game.proto.hall.IRoomInfo[];
    //             break;
    //     }
    //     return roomList;
    // }

    private getRoomlistRes(msg) {
        // G.Logger.log("收到房间列表信息！！！！", msg);
        // if (msg.data && msg.data.statusMsg.status == 0) {
        //     let data: com.bt.game.proto.hall.IGetRoomListRes = msg.data;
        //     let roomList: com.bt.game.proto.hall.IRoomInfo[] | com.bt.game.proto.hall.IPveRoomInfo[] | com.bt.game.proto.hall.IPvpRoomInfo[] = this.getRoomlist(data);

        //     if (!roomList || roomList.length <= 0) {
        //         PanelHelp.hideLoading();
        //         PanelHelp.showTip(i18n.ERRORTIPS.ROOMLISTERROR);
        //     } else if (User.isRechargedPlayer ? roomList.length === 1 : com.bt.game.proto.hall.RoomInfoType.Pve == data.infoType) {
        //         // 直接进入
        //         let roomData = roomList[0];
        //         let matchData: com.bt.game.proto.hall.IMatchRoomReq = {
        //             gameId: data.gameId,
        //             areaId: roomData.areaId,
        //             deskId: roomData.roomId,
        //         }
        //         dispatch(LogicEvent.ENTER_GAME_MATCH, matchData);
        //     } else {
        //         // 展示列表
        //         dispatch(LogicEvent.ENTER_ROOM_LIST, data);
        //     }
        // } else {
        //     PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + msg.data.statusMsg.status))
        // }
    }
    /**
     * 匹配进入房间
     * @param msg 
     */
    private onMatchGame(msg) {
        G.Logger.log(msg);
    }
    // 救济金
    private onNoticeRelief(msg) {
        dispatch("openGiveGoldNoti", msg.data);

    }
    // 改变玩家货币类型
    private onNoticeExchangeUserGoldType(msg) {
        dispatch("openEnterRealFieldNoti", msg.data);
    }

    private onM2C_KickOut_Mes(data: MST.IM2C_KickOut_Mes) {
        dispatch("M2C_KickOut_Mes");
    }

    private onM2C_GoldChange_Mes(data: MST.IM2C_GoldChange_Mes): void {
        let userData = G.DataMgr.get(UserData);
        let oldGold = userData.info.Gold;
        userData.info.Gold = data.Gold;
        dispatch('Event_M2C_GoldChange_Mes', oldGold);
    }

    private onM2C_Auth_Res(data: MST.M2C_Auth_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            let userData = G.DataMgr.get(UserData);
            userData.clearUserData();

            dispatch('openLoginEvent');
            return
        }
        let userData = G.DataMgr.get(UserData);
        userData.id = Number(data.AccountId);
        userData.nick = data.PlayerInfo.Nick;
        userData.email = data.BindEmail;
        userData.BindPhone = data.phonoNo;
        userData.extendCode = data.extendCode;
        userData.info = data.PlayerInfo;
        userData.inGame = data.RoomName;

        //测试 用账号id 正式使用FastAuthToken
        let fastAuthToken = data.FastAuthToken
        Manager.localStorage.setItem(LocalStoreageDefine.ACCOUNT_TOKEN, fastAuthToken);
        dispatch('updateUserInfo')

        let loginType = data.loginType;
        this.signOutHandler(loginType);
    }

    signOutHandler(loginType) {
        let self = this;
        switch (loginType) {
            case LoginType.facebook:
                fbsdk.instance.FB_SignOut(function () { });
                break;
            case LoginType.google:
                googlesdk.instance.Google_SignOut();
                break;
            case LoginType.twitter:
                twittersdk.instance.Twitter_SignOut(function () { });
                break;

            default:
                break;
        }
    }

    onL2C_GetGameList_Res(data: MST.L2C_GetGameList_Res) {
        let hallData = G.DataMgr.get(HallData);
        hallData.games = data.games;
        dispatch('updateHallGames')
    }

    onL2C_Deposit_Res(data: MST.L2C_Deposit_Res) {
        PanelHelp.hideLoading()
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        rechargeData.paymentUrl = data.paymentUrl;
        PanelHelp.showTip(i18n.TIPS.RECHARGESUCCESS);
        dispatch("L2C_Deposit_Res");
    }

    onL2C_ChipsChange_Mes(data: MST.L2C_ChipsChange_Mes) {
        dispatch("L2C_ChipsChange_Mes", data)
    }

    onL2C_Withdraw_Res(data: MST.L2C_Withdraw_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }

        PanelHelp.showTip(i18n.TIPS.WITHDRAWSUCCESS);
        dispatch("L2C_Withdraw_Res");
    }

    onL2C_GetStoreList_Res(data: MST.L2C_GetStoreList_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        rechargeData.storeInfoList = data.info;
        dispatch("L2C_GetStoreList_Res")
    }

    onL2C_GetDepositLimit_Res(data: MST.L2C_GetDepositLimit_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        rechargeData.minDepAmount = data.minAmount;
        rechargeData.maxDepAmount = data.maxAmount;
        // dispatch("L2C_GetDepositLimit_Res")
    }

    onL2C_GetWithdrawLimit_Res(data: MST.L2C_GetWithdrawLimit_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        rechargeData.minWithAmount = Number(data.minAmount) / 100;
        rechargeData.maxWithAmount = Number(data.maxAmount) / 100;
    }

    onL2C_GetBankList_Res(data: MST.L2C_GetBankList_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        rechargeData.bankInfoList = data.info;
        dispatch("L2C_GetBankList_Res");
    }

    onL2C_GetBankCardInfo_Res(data: MST.L2C_GetBankCardInfo_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        let rechargeData = G.DataMgr.get(RechargeData);
        if (data.bankNo && data.bankCode) {
            let bandBankCardInfo = rechargeData.bandBankCardInfo;
            bandBankCardInfo = {};
            bandBankCardInfo.bankCode = data.bankCode;
            bandBankCardInfo.bankUserName = data.name;
            bandBankCardInfo.bankNo = data.bankNo;
            rechargeData.bandBankCardInfo = bandBankCardInfo;
        }
        dispatch("L2C_GetBankCardInfo_Res");
    }

    onL2C_BindBankCard_Res(data: MST.L2C_BindBankCard_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }

        dispatch("L2C_BindBankCard_Res");
    }

    onL2C_GetWithdrawRecords_Res(data: MST.L2C_GetWithdrawRecords_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }
        dispatch("Event_L2C_WithdrawRecord", data);
    }

    onS2C_GetDepositList(data: MST.S2C_GetDepositList) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_GetDepositList", data);
    }

    onS2C_GetSignedInfo(data: MST.S2C_GetSignedInfo) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        let hallData = G.DataMgr.get(HallData);
        hallData.signinData = data;
        dispatch("Event_S2C_GetSignedInfo");
    }

    onS2C_Signed(data: MST.S2C_Signed) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        let hallData = G.DataMgr.get(HallData);
        hallData.signinData.serial = data.serial;
        hallData.signinData.reward = data.reward;
        dispatch("Event_S2C_Signed");
    }

    onS2C_GetCheckCode(data: MST.S2C_GetCheckCode) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_GetCheckCode");
    }

    onS2C_Register(data: MST.S2C_Register) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_Register");
    }

    onS2C_BindEmail(data: MST.S2C_BindEmail) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        let userData = G.DataMgr.get(UserData);
        userData.email = data.email;
        dispatch("Event_S2C_BindEmail");
    }

    onS2C_ResetPassword(data) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_ResetPassword");
    }

    onS2C_BindPhone(data: MST.S2C_BindPhone) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        let userData = G.DataMgr.get(UserData);
        userData.BindPhone = data.phoneNo;
        dispatch("Event_S2C_BindPhone");
    }

    onS2C_GetRegisterRewordConfig(data: MST.S2C_GetRegisterRewordConfig) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_GetRegisterRewordConfig", data);
    }

    onS2C_ModifyAvartar(data: MST.S2C_ModifyAvartar) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        let userData = G.DataMgr.get(UserData);
        userData.info.HeaderUrl = data.avartar;
        dispatch("Event_S2C_ModifyAvartar");
    }

    private onS2C_MinigameInfo(data: MST.IS2C_MinigameInfo): void {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        dispatch("Event_S2C_MinigameInfo", data);
    }

    private onS2C_MinigameLottery(data: MST.IS2C_MinigameLottery): void {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        dispatch("Event_S2C_MinigameLottery", data);
    }

    private onS2C_PromotionInfo(data: MST.IS2C_PromotionInfo): void {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        dispatch("Event_S2C_PromotionInfo", data);
    }

    private onS2C_GetMissionList(data: MST.IS2C_GetMissionList) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        let hallData = G.DataMgr.get(HallData);
        hallData.missionList = data.info;
        dispatch("Event_S2C_GetMissionList");
    }

    private onS2C_MissionClaim(data: MST.IS2C_MissionClaim) {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        dispatch("Event_S2C_MissionClaim", data);
    }

    onS2C_MessageNotify(data: MST.IS2C_MessageNotify) {
        let hallData = G.DataMgr.get(HallData);
        hallData.notice.push(data);
        dispatch("Event_S2C_MessageNotify");
    }
}

Manager.netManager.push(HallNetController);
