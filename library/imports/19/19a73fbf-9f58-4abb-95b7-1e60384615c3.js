"use strict";
cc._RF.push(module, '19a73+/n1hKu5W3HmA4RhXD', 'HallNetController');
// script/hall/HallNetController.ts

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginType = exports.HallConfig = void 0;
var HallConfig;
(function (HallConfig) {
    /**@description 大厅图标 */
    HallConfig.hallIconConfig = null;
    /**@description 大厅运营区 */
    HallConfig.hallIconConfig1 = null;
    /**@description 大厅功能列表区 */
    HallConfig.hallIconConfig2 = null;
    /**@description 锦标赛列表区 */
    HallConfig.hallIconConfig3 = null;
})(HallConfig = exports.HallConfig || (exports.HallConfig = {}));
/**
 * @description 登录场景逻辑流程控制器
 */
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const Controller_1 = __importDefault(require("../framework/controller/Controller"));
const Manager_1 = require("../common/manager/Manager");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const User_1 = require("../global/User");
const protoc_1 = require("../framework/external/protoc");
const UtilMgr_1 = require("../global/UtilMgr");
const HallData_1 = __importDefault(require("../data/HallData"));
const UserData_1 = __importDefault(require("../data/UserData"));
const LocalStoreageDefine = __importStar(require("../common/define/LocalStorageDefine"));
const RechargeData_1 = __importDefault(require("../data/RechargeData"));
const fbsdk_1 = __importDefault(require("../sdk/fbsdk"));
const googlesdk_1 = __importDefault(require("../sdk/googlesdk"));
const twittersdk_1 = __importDefault(require("../sdk/twittersdk"));
const { ccclass, property } = cc._decorator;
var LoginType;
(function (LoginType) {
    LoginType[LoginType["youke"] = 0] = "youke";
    LoginType[LoginType["telephon"] = 1] = "telephon";
    LoginType[LoginType["google"] = 2] = "google";
    LoginType[LoginType["facebook"] = 3] = "facebook";
    LoginType[LoginType["twitter"] = 4] = "twitter";
    LoginType[LoginType["telegram"] = 5] = "telegram";
    LoginType[LoginType["fast"] = 6] = "fast";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
let HallNetController = class HallNetController extends Controller_1.default {
    bindingEvents() {
        super.bindingEvents();
        // this.addEvent(MST.OuterOpcode_Lobby.L2C_GoldRankDay_Res, this.L2C_GoldRankDay_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_WinDayRank_Res, this.onL2C_WinDayRank_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_WinWeekRank_Res, this.onL2C_WinWeekRank_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_WinMonthRank_Res, this.onL2C_WinMonthRank_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_BetRank_Res, this.onL2C_BetRank_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_Deposit_Res, this.onL2C_Deposit_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_Withdraw_Res, this.onL2C_Withdraw_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_ChipsChange_Mes, this.onL2C_ChipsChange_Mes);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetStoreList_Res, this.onL2C_GetStoreList_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetDepositLimit_Res, this.onL2C_GetDepositLimit_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetWithdrawLimit_Res, this.onL2C_GetWithdrawLimit_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetBankList_Res, this.onL2C_GetBankList_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetBankCardInfo_Res, this.onL2C_GetBankCardInfo_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_BindBankCard_Res, this.onL2C_BindBankCard_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetWithdrawRecords_Res, this.onL2C_GetWithdrawRecords_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_GetDepositList, this.onS2C_GetDepositList);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_GetSignedInfo, this.onS2C_GetSignedInfo);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_Signed, this.onS2C_Signed);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_GetCheckCode, this.onS2C_GetCheckCode);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_Register, this.onS2C_Register);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_BindPhone, this.onS2C_BindPhone);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_BindEmail, this.onS2C_BindEmail);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_ResetPassword, this.onS2C_ResetPassword);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_GetRegisterRewordConfig, this.onS2C_GetRegisterRewordConfig);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_ModifyAvartar, this.onS2C_ModifyAvartar);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_GetMissionList, this.onS2C_GetMissionList);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_MissionClaim, this.onS2C_MissionClaim);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_MessageNotify, this.onS2C_MessageNotify);
        this.addEvent(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Map.M2C_AuthOut_Res, this.onM2C_AuthOut_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Map.M2C_KickOut_Mes, this.onM2C_KickOut_Mes);
        this.addEvent(protoc_1.MST.OuterOpcode_Map.M2C_GoldChange_Mes, this.onM2C_GoldChange_Mes);
        this.addEvent(protoc_1.MST.OuterOpcode_Map.M2C_Auth_Res, this.onM2C_Auth_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.L2C_GetGameList_Res, this.onL2C_GetGameList_Res);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_MinigameInfo, this.onS2C_MinigameInfo);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_MinigameLottery, this.onS2C_MinigameLottery);
        this.addEvent(protoc_1.MST.OuterOpcode_Lobby.S2C_PromotionInfo, this.onS2C_PromotionInfo);
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
    L2C_GoldRankDay_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        // let units = data.Units
        hallData.winRankList = data.Units;
        dispatch("L2C_GoldRankDay_Res");
    }
    onL2C_WinDayRank_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        // let units = data.Units
        hallData.winRankList = data.infos;
        dispatch("L2C_WinDayRank_Res");
    }
    onL2C_WinWeekRank_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        // let units = data.Units
        hallData.winRankList = data.infos;
        dispatch("L2C_WinWeekRank_Res");
    }
    onL2C_WinMonthRank_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        // let units = data.Units
        hallData.winRankList = data.infos;
        dispatch("L2C_WinMonthRank_Res");
    }
    onL2C_BetRank_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        // let units = data.Units
        hallData.betRankList = data.infos;
        dispatch("L2C_BetRank_Res");
    }
    onM2C_TransferMap_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        dispatch("M2C_TransferMap_Res", data);
    }
    onM2C_AuthOut_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        G.DataMgr.get(UserData_1.default).clearUserData();
        dispatch("M2C_AuthOut_Res", data);
    }
    onNoticeFirstPay(data) {
        if (data && data.data) {
            G.Logger.log("首冲", data);
            if (User_1.User._popWindows.length) {
                UtilMgr_1.UtilMgr.pushWindows(["openFirstPayView", data.data.firstPayWindowsForceSwitch, 40]);
            }
            else {
                dispatch("openFirstPayView", data.data.firstPayWindowsForceSwitch);
            }
        }
    }
    /**
     * 大厅图标
     * @param msg
     */
    onHallIconConfig(msg) {
        G.Logger.log("大厅图标", msg);
        if (msg && msg.data && msg.data.hallIconConfig) {
            HallConfig.hallIconConfig = msg.data.hallIconConfig;
            HallConfig.hallIconConfig1 = msg.data.hallIconConfig1;
            HallConfig.hallIconConfig2 = msg.data.hallIconConfig2;
            HallConfig.hallIconConfig3 = msg.data.hallIconConfig3;
        }
        dispatch('hallIconConfig');
    }
    /**
     * 游戏新手引导
     * @param msg
     */
    onPushInsertNewPlayerGuid(msg) {
        if (msg && msg.data && msg.data.gameId) {
            User_1.User._gameIds.push(msg.data.gameId);
        }
        dispatch("CMD_PushInsertNewPlayerGuid", msg.data.gameId);
    }
    onSendMsg(msg) {
        G.Logger.log(msg);
        if (msg) {
            dispatch(Decorators_1.makeKey(msg.mainCmd), msg.data);
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
    getRoomlistRes(msg) {
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
    onMatchGame(msg) {
        G.Logger.log(msg);
    }
    // 救济金
    onNoticeRelief(msg) {
        dispatch("openGiveGoldNoti", msg.data);
    }
    // 改变玩家货币类型
    onNoticeExchangeUserGoldType(msg) {
        dispatch("openEnterRealFieldNoti", msg.data);
    }
    onM2C_KickOut_Mes(data) {
        dispatch("M2C_KickOut_Mes");
    }
    onM2C_GoldChange_Mes(data) {
        let userData = G.DataMgr.get(UserData_1.default);
        let oldGold = userData.info.Gold;
        userData.info.Gold = data.Gold;
        dispatch('Event_M2C_GoldChange_Mes', oldGold);
    }
    onM2C_Auth_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            let userData = G.DataMgr.get(UserData_1.default);
            userData.clearUserData();
            dispatch('openLoginEvent');
            return;
        }
        let userData = G.DataMgr.get(UserData_1.default);
        userData.id = Number(data.AccountId);
        userData.nick = data.PlayerInfo.Nick;
        userData.email = data.BindEmail;
        userData.BindPhone = data.phonoNo;
        userData.extendCode = data.extendCode;
        userData.info = data.PlayerInfo;
        userData.inGame = data.RoomName;
        //测试 用账号id 正式使用FastAuthToken
        let fastAuthToken = data.FastAuthToken;
        Manager_1.Manager.localStorage.setItem(LocalStoreageDefine.ACCOUNT_TOKEN, fastAuthToken);
        dispatch('updateUserInfo');
        let loginType = data.loginType;
        this.signOutHandler(loginType);
    }
    signOutHandler(loginType) {
        let self = this;
        switch (loginType) {
            case LoginType.facebook:
                fbsdk_1.default.instance.FB_SignOut(function () { });
                break;
            case LoginType.google:
                googlesdk_1.default.instance.Google_SignOut();
                break;
            case LoginType.twitter:
                twittersdk_1.default.instance.Twitter_SignOut(function () { });
                break;
            default:
                break;
        }
    }
    onL2C_GetGameList_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        hallData.games = data.games;
        dispatch('updateHallGames');
    }
    onL2C_Deposit_Res(data) {
        PanelHelp_1.default.hideLoading();
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        rechargeData.paymentUrl = data.paymentUrl;
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.RECHARGESUCCESS);
        dispatch("L2C_Deposit_Res");
    }
    onL2C_ChipsChange_Mes(data) {
        dispatch("L2C_ChipsChange_Mes", data);
    }
    onL2C_Withdraw_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.WITHDRAWSUCCESS);
        dispatch("L2C_Withdraw_Res");
    }
    onL2C_GetStoreList_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        rechargeData.storeInfoList = data.info;
        dispatch("L2C_GetStoreList_Res");
    }
    onL2C_GetDepositLimit_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        rechargeData.minDepAmount = data.minAmount;
        rechargeData.maxDepAmount = data.maxAmount;
        // dispatch("L2C_GetDepositLimit_Res")
    }
    onL2C_GetWithdrawLimit_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        rechargeData.minWithAmount = Number(data.minAmount) / 100;
        rechargeData.maxWithAmount = Number(data.maxAmount) / 100;
    }
    onL2C_GetBankList_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
        rechargeData.bankInfoList = data.info;
        dispatch("L2C_GetBankList_Res");
    }
    onL2C_GetBankCardInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rechargeData = G.DataMgr.get(RechargeData_1.default);
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
    onL2C_BindBankCard_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        dispatch("L2C_BindBankCard_Res");
    }
    onL2C_GetWithdrawRecords_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        dispatch("Event_L2C_WithdrawRecord", data);
    }
    onS2C_GetDepositList(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_GetDepositList", data);
    }
    onS2C_GetSignedInfo(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        let hallData = G.DataMgr.get(HallData_1.default);
        hallData.signinData = data;
        dispatch("Event_S2C_GetSignedInfo");
    }
    onS2C_Signed(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        let hallData = G.DataMgr.get(HallData_1.default);
        hallData.signinData.serial = data.serial;
        hallData.signinData.reward = data.reward;
        dispatch("Event_S2C_Signed");
    }
    onS2C_GetCheckCode(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_GetCheckCode");
    }
    onS2C_Register(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_Register");
    }
    onS2C_BindEmail(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        let userData = G.DataMgr.get(UserData_1.default);
        userData.email = data.email;
        dispatch("Event_S2C_BindEmail");
    }
    onS2C_ResetPassword(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_ResetPassword");
    }
    onS2C_BindPhone(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        let userData = G.DataMgr.get(UserData_1.default);
        userData.BindPhone = data.phoneNo;
        dispatch("Event_S2C_BindPhone");
    }
    onS2C_GetRegisterRewordConfig(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_GetRegisterRewordConfig", data);
    }
    onS2C_ModifyAvartar(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        let userData = G.DataMgr.get(UserData_1.default);
        userData.info.HeaderUrl = data.avartar;
        dispatch("Event_S2C_ModifyAvartar");
    }
    onS2C_MinigameInfo(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_MinigameInfo", data);
    }
    onS2C_MinigameLottery(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_MinigameLottery", data);
    }
    onS2C_PromotionInfo(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_PromotionInfo", data);
    }
    onS2C_GetMissionList(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        let hallData = G.DataMgr.get(HallData_1.default);
        hallData.missionList = data.info;
        dispatch("Event_S2C_GetMissionList");
    }
    onS2C_MissionClaim(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        dispatch("Event_S2C_MissionClaim", data);
    }
    onS2C_MessageNotify(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        hallData.notice.push(data);
        dispatch("Event_S2C_MessageNotify");
    }
};
HallNetController = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], HallNetController);
exports.default = HallNetController;
Manager_1.Manager.netManager.push(HallNetController);

cc._RF.pop();