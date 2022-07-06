
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallNetController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsTmV0Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBaUIsVUFBVSxDQVkxQjtBQVpELFdBQWlCLFVBQVU7SUFDdkIsdUJBQXVCO0lBQ1oseUJBQWMsR0FBRyxJQUFJLENBQUM7SUFDakMsd0JBQXdCO0lBQ2IsMEJBQWUsR0FBRyxJQUFJLENBQUM7SUFFbEMsMEJBQTBCO0lBQ2YsMEJBQWUsR0FBRyxJQUFJLENBQUM7SUFFbEMseUJBQXlCO0lBQ2QsMEJBQWUsR0FBRyxJQUFJLENBQUM7QUFFdEMsQ0FBQyxFQVpnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQVkxQjtBQUVEOztHQUVHO0FBRUgsNkRBQTBEO0FBQzFELGtFQUEyRTtBQUMzRSxvRkFBNEQ7QUFDNUQsdURBQW9EO0FBRXBELG9FQUE0QztBQUM1QyxrRUFBdUQ7QUFFdkQseUNBQXNDO0FBQ3RDLHlEQUFtRDtBQUVuRCwrQ0FBNEM7QUFDNUMsZ0VBQXdDO0FBQ3hDLGdFQUF3QztBQUN4Qyx5RkFBMkU7QUFDM0Usd0VBQWdEO0FBQ2hELHlEQUFpQztBQUNqQyxpRUFBeUM7QUFDekMsbUVBQTJDO0FBRTNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUM1QyxJQUFZLFNBUVg7QUFSRCxXQUFZLFNBQVM7SUFDakIsMkNBQVMsQ0FBQTtJQUNULGlEQUFZLENBQUE7SUFDWiw2Q0FBVSxDQUFBO0lBQ1YsaURBQVksQ0FBQTtJQUNaLCtDQUFXLENBQUE7SUFDWCxpREFBWSxDQUFBO0lBQ1oseUNBQVEsQ0FBQTtBQUNaLENBQUMsRUFSVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVFwQjtBQUdELElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxvQkFBd0I7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QUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsSUFBNEI7UUFDNUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDSixDQUFBO0FBNXJCb0IsaUJBQWlCO0lBRnJDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGlCQUFpQixDQTRyQnJDO2tCQTVyQm9CLGlCQUFpQjtBQThyQnRDLGlCQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgbmFtZXNwYWNlIEhhbGxDb25maWcge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDlpKfljoXlm77moIcgKi9cbiAgICBleHBvcnQgbGV0IGhhbGxJY29uQ29uZmlnID0gbnVsbDtcbiAgICAvKipAZGVzY3JpcHRpb24g5aSn5Y6F6L+Q6JCl5Yy6ICovXG4gICAgZXhwb3J0IGxldCBoYWxsSWNvbkNvbmZpZzEgPSBudWxsO1xuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOWkp+WOheWKn+iDveWIl+ihqOWMuiAqL1xuICAgIGV4cG9ydCBsZXQgaGFsbEljb25Db25maWcyID0gbnVsbDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDplKbmoIfotZvliJfooajljLogKi9cbiAgICBleHBvcnQgbGV0IGhhbGxJY29uQ29uZmlnMyA9IG51bGw7XG5cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g55m75b2V5Zy65pmv6YC76L6R5rWB56iL5o6n5Yi25ZmoICBcbiAqL1xuXG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IExvZ2ljRXZlbnQgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBIYWxsRGF0YSBmcm9tIFwiLi4vZGF0YS9IYWxsRGF0YVwiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgKiBhcyBMb2NhbFN0b3JlYWdlRGVmaW5lIGZyb20gXCIuLi9jb21tb24vZGVmaW5lL0xvY2FsU3RvcmFnZURlZmluZVwiO1xuaW1wb3J0IFJlY2hhcmdlRGF0YSBmcm9tIFwiLi4vZGF0YS9SZWNoYXJnZURhdGFcIjtcbmltcG9ydCBmYnNkayBmcm9tIFwiLi4vc2RrL2Zic2RrXCI7XG5pbXBvcnQgZ29vZ2xlc2RrIGZyb20gXCIuLi9zZGsvZ29vZ2xlc2RrXCI7XG5pbXBvcnQgdHdpdHRlcnNkayBmcm9tIFwiLi4vc2RrL3R3aXR0ZXJzZGtcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbmV4cG9ydCBlbnVtIExvZ2luVHlwZSB7XG4gICAgeW91a2UgPSAwLFxuICAgIHRlbGVwaG9uID0gMSxcbiAgICBnb29nbGUgPSAyLFxuICAgIGZhY2Vib29rID0gMyxcbiAgICB0d2l0dGVyID0gNCxcbiAgICB0ZWxlZ3JhbSA9IDUsXG4gICAgZmFzdCA9IDZcbn1cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsTmV0Q29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG5cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpXG4gICAgICAgIC8vIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19Hb2xkUmFua0RheV9SZXMsIHRoaXMuTDJDX0dvbGRSYW5rRGF5X1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19XaW5EYXlSYW5rX1JlcywgdGhpcy5vbkwyQ19XaW5EYXlSYW5rX1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19XaW5XZWVrUmFua19SZXMsIHRoaXMub25MMkNfV2luV2Vla1JhbmtfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuTDJDX1dpbk1vbnRoUmFua19SZXMsIHRoaXMub25MMkNfV2luTW9udGhSYW5rX1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19CZXRSYW5rX1JlcywgdGhpcy5vbkwyQ19CZXRSYW5rX1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19EZXBvc2l0X1JlcywgdGhpcy5vbkwyQ19EZXBvc2l0X1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19XaXRoZHJhd19SZXMsIHRoaXMub25MMkNfV2l0aGRyYXdfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuTDJDX0NoaXBzQ2hhbmdlX01lcywgdGhpcy5vbkwyQ19DaGlwc0NoYW5nZV9NZXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5MMkNfR2V0U3RvcmVMaXN0X1JlcywgdGhpcy5vbkwyQ19HZXRTdG9yZUxpc3RfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuTDJDX0dldERlcG9zaXRMaW1pdF9SZXMsIHRoaXMub25MMkNfR2V0RGVwb3NpdExpbWl0X1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19HZXRXaXRoZHJhd0xpbWl0X1JlcywgdGhpcy5vbkwyQ19HZXRXaXRoZHJhd0xpbWl0X1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19HZXRCYW5rTGlzdF9SZXMsIHRoaXMub25MMkNfR2V0QmFua0xpc3RfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuTDJDX0dldEJhbmtDYXJkSW5mb19SZXMsIHRoaXMub25MMkNfR2V0QmFua0NhcmRJbmZvX1Jlcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkwyQ19CaW5kQmFua0NhcmRfUmVzLCB0aGlzLm9uTDJDX0JpbmRCYW5rQ2FyZF9SZXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5MMkNfR2V0V2l0aGRyYXdSZWNvcmRzX1JlcywgdGhpcy5vbkwyQ19HZXRXaXRoZHJhd1JlY29yZHNfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuUzJDX0dldERlcG9zaXRMaXN0LCB0aGlzLm9uUzJDX0dldERlcG9zaXRMaXN0KTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuUzJDX0dldFNpZ25lZEluZm8sIHRoaXMub25TMkNfR2V0U2lnbmVkSW5mbyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LlMyQ19TaWduZWQsIHRoaXMub25TMkNfU2lnbmVkKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuUzJDX0dldENoZWNrQ29kZSwgdGhpcy5vblMyQ19HZXRDaGVja0NvZGUpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5TMkNfUmVnaXN0ZXIsIHRoaXMub25TMkNfUmVnaXN0ZXIpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5TMkNfQmluZFBob25lLCB0aGlzLm9uUzJDX0JpbmRQaG9uZSk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LlMyQ19CaW5kRW1haWwsIHRoaXMub25TMkNfQmluZEVtYWlsKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuUzJDX1Jlc2V0UGFzc3dvcmQsIHRoaXMub25TMkNfUmVzZXRQYXNzd29yZCk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LlMyQ19HZXRSZWdpc3RlclJld29yZENvbmZpZywgdGhpcy5vblMyQ19HZXRSZWdpc3RlclJld29yZENvbmZpZyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LlMyQ19Nb2RpZnlBdmFydGFyLCB0aGlzLm9uUzJDX01vZGlmeUF2YXJ0YXIpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5TMkNfR2V0TWlzc2lvbkxpc3QsIHRoaXMub25TMkNfR2V0TWlzc2lvbkxpc3QpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5TMkNfTWlzc2lvbkNsYWltLCB0aGlzLm9uUzJDX01pc3Npb25DbGFpbSk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LlMyQ19NZXNzYWdlTm90aWZ5LCB0aGlzLm9uUzJDX01lc3NhZ2VOb3RpZnkpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9NYXAuTTJDX1RyYW5zZmVyTWFwX1JlcywgdGhpcy5vbk0yQ19UcmFuc2Zlck1hcF9SZXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9NYXAuTTJDX0F1dGhPdXRfUmVzLCB0aGlzLm9uTTJDX0F1dGhPdXRfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTWFwLk0yQ19LaWNrT3V0X01lcywgdGhpcy5vbk0yQ19LaWNrT3V0X01lcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX01hcC5NMkNfR29sZENoYW5nZV9NZXMsIHRoaXMub25NMkNfR29sZENoYW5nZV9NZXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9NYXAuTTJDX0F1dGhfUmVzLCB0aGlzLm9uTTJDX0F1dGhfUmVzKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuTDJDX0dldEdhbWVMaXN0X1JlcywgdGhpcy5vbkwyQ19HZXRHYW1lTGlzdF9SZXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50KE1TVC5PdXRlck9wY29kZV9Mb2JieS5TMkNfTWluaWdhbWVJbmZvLCB0aGlzLm9uUzJDX01pbmlnYW1lSW5mbyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0xvYmJ5LlMyQ19NaW5pZ2FtZUxvdHRlcnksIHRoaXMub25TMkNfTWluaWdhbWVMb3R0ZXJ5KTtcbiAgICAgICAgdGhpcy5hZGRFdmVudChNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuUzJDX1Byb21vdGlvbkluZm8sIHRoaXMub25TMkNfUHJvbW90aW9uSW5mbyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkdhdGVXYXksIHByb3RvUGFja2FnZS5nYXRld2F5LkdhdGVfQ21kX0lELklkZW50aXR5X0F1dGgsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuR2F0ZVdheSwgcHJvdG9QYWNrYWdlLmdhdGV3YXkuR2F0ZV9DbWRfSUQuSWRlbnRpdHlfQXV0aCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkxPR0lOLCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuR0VUX1VTRVJfU0lHTiwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlNJR05fUkVXQVJELCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQklORF9QSE9ORSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlNFTkRfUEhPTkVfQ09ERSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlVTRVJfU0lHTiwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlVTRVJfSU5GT1JNQVRJT04sIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VUERBVEVfTklDS05BTUUsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VUERBVEVfSEVBRF9JTUcsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5SQU5LSU5HX0xJU1QsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5CSUdfV0lOTkVSX05PVElDRSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLk5PVElGWV9PVEhFUl9MT0dJTiwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkZMVVNIX1JFRF9ET1QsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5NQUlMX1JFUSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlJFRlJFU0hfU0FGRVRZX0JPWCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLk9QRVJBVEVfU0FGRVRZX0JPWCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkZFVENIX1BST1VDVFMsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5GRVRDSF9IV19QQVlfT1JERVJJRCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9HZXRCYW5rSW5mbywgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9CYW5rTGlzdCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9CaW5kQmFua0luZm8sIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfTW9kaWZ5QmFua0luZm8sIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfV2l0aGRyYXdhbENvbmZpZywgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XaXRoZHJhd2FsLCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1dpdGhkcmF3YWxSZWNvcmQsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5TSEFSRSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlJBTktJTkdfTElTVCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9HQU1FX0xJU1QsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfR2V0Um9vbUxpc3QsIHRoaXMuZ2V0Um9vbWxpc3RSZXMpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLk1hdGNoUm9vbSwgdGhpcy5vbk1hdGNoR2FtZSk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0FHRU5UX0xFVkVMLCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0JJTkRfQUdFTlQsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQUdFTlRfVE9UQUwsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQUdFTlRfREFZX1NUQVRTLCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0FHRU5UX0RFVEFJTCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9BR0VOVF9XSVRIRFJBV19SRUNPUkQsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQUdFTlRfV0lUSERSQVcsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ2hlY2tQbGF5ZXJKb2luR2FtZVJlcSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9TRVRUSU5HX1BBU1NXRCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9UT1RBTF9BTU9VTlQsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ0hBTkdFX1BBU1NXRCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9TVE9SRURfQU1PVU5ULCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0lOQ09NRV9CUkVBS0RPV04sIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ0FOQ0VMX1NUT1JFRF9BTU9VTlQsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRVhUUkFDVF9BTU9VTlQsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VUExPQURfSEVBRF9JTUcsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfU0VUX1BBU1NXRCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9TRVRfU0VDT05EX1BBU1NXT1JELCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0NIQU5HRV9TRUNPTkRfUEFTU1dELCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0NIRUNLX1NFQ09ORF9QQVNTV0QsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUEFZX0NIQU5ORUxfTElTVCwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkZFVENIX0hXX1BBWV9PUkRFUklELCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1B1c2hJbnNlcnROZXdQbGF5ZXJHdWlkLCB0aGlzLm9uUHVzaEluc2VydE5ld1BsYXllckd1aWQpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9QdXNoUmVzZXROZXdQbGF5ZXJHdWlkLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ob3RpY2VIYWxsSWNvbkNvbmZpZywgdGhpcy5vbkhhbGxJY29uQ29uZmlnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ1VTVE9NRVJfU0VSVklDRV9DT05GSUcsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRnJpZW5kc0xpc3QsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0RlbGV0ZUZyaWVuZCwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRmluZFVzZXIsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0FkZEZyaWVuZCwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQXBwbGljYXRpb24sIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0RlYWxBcHBsaWNhdGlvbiwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRnJpZW5kU2V0dGluZywgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRnJpZW5kSW52aXRlLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ob3RpY2VJbnZpdGUsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1VwZGF0ZVVzZXJBcmVhLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Kb2luRGVzaywgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIC8v57qi5YyF55u45YWzXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9TZW5kUmVkUGFja2V0LCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZWRQYWNrZXRTZW5kUmVjb3JkLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZWRQYWNrZXREZXRhaWxzLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZWRQYWNrZXRSZWNlaXZlUmVjb3JkLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZWRQYWNrZXRMb2dpbiwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Qcm9kdWN0T3JkZXIsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0FkZHJlc3NCb29rLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9QcmVTZW5kUmVkUGFja2V0LCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gLy8g5qKm5bm75L2T6IKyLS0tLS0tLS0tXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9EcmVhbUdhbWUsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0RyZWFtVHJhbnNmZXIsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0RyZWFtVHJhbnNmZXJSZWNvcmQsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0RyZWFtSGlzdG9yeSwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyAvLyDmlZHmtY7ph5FcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05vdGljZVJlbGllZiwgdGhpcy5vbk5vdGljZVJlbGllZik7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ob3RpY2VFeGNoYW5nZVVzZXJHb2xkVHlwZSwgdGhpcy5vbk5vdGljZUV4Y2hhbmdlVXNlckdvbGRUeXBlKTtcbiAgICAgICAgLy8gLy9CVEnkvZPogrJcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0JUSUdhbWUsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0JUSVRyYW5zZmVyLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9CVElUcmFuc2ZlclJlY29yZCwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQlRJSGlzdG9yeSwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyAvL+i9rOebmFxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5BY3Rpdml0eV9UdXJudGFibGUsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuUGxheV9UdXJudGFibGUsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVHVybnRhYmxlX1JlY29yZCwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5UdXJudGFibGVfQWRkcmVzcywgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfTm90aWNlQWN0aXZpdHlUdXJudGFibGUsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyAvL+mmluWGsua0u+WKqFxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfTm90aWNlRmlyc3RQYXksIHRoaXMub25Ob3RpY2VGaXJzdFBheSk7XG4gICAgICAgIC8vIC8v5aW95Y+L5oi/XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DcmVhdGVQcml2YXRlUm9vbURlc2ssIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05vdGljZUhhc0JlZW5LaWNrZWQsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0ZyaWVuZERlc2tDb25maWcsIHRoaXMub25TZW5kTXNnKTtcblxuICAgICAgICAvLyAvL+aWsOaOkuihjOamnFxuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfTmV3UmFua2luZ0xpc3QsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05ld1JhbmtpbmdSZWNvcmQsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05ld1JhbmtpbmdSZWNlaXZlLCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9OZXdSYW5raW5nUnVsZSwgdGhpcy5vblNlbmRNc2cpO1xuXG5cbiAgICAgICAgLy8gLy9CYW5uZXLlvLnnqpdcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0Jhbm5lclBvcHVwLCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gLy/lpKfljoXotYTmupBcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0hhbGxSZXNvdXJjZSwgdGhpcy5vblNlbmRNc2cpO1xuXG4gICAgICAgIC8vIC8v56aP5Yip5Lit5b+DXG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XZWxmYXJlQ2VudGVyLCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICAgICAgLy8gLy/plKbmoIfotZtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnRDb25maWcsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0NyZWF0ZVRvdXJuYW1lbnQsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnRTaWduVXAsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnRTaWduVXBVc2VycywgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVG91cm5hbWVudExpc3QsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnREZXRhaWwsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0Nsb3NlVG91cm5hbWVudCwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfTXlUb3VybmFtZW50LCB0aGlzLm9uU2VuZE1zZyk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ob3RpY2VUb3VybmFtZW50U3RhcnQsIHRoaXMub25TZW5kTXNnKTtcbiAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX05vdGljZVRvdXJuYW1lbnRDbG9zZSwgdGhpcy5vblNlbmRNc2cpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ2hlY2tUb3VybmFtZW50LCB0aGlzLm9uU2VuZE1zZyk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIEwyQ19Hb2xkUmFua0RheV9SZXMoZGF0YSkge1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgLy8gbGV0IHVuaXRzID0gZGF0YS5Vbml0c1xuICAgICAgICBoYWxsRGF0YS53aW5SYW5rTGlzdCA9IGRhdGEuVW5pdHNcblxuICAgICAgICBkaXNwYXRjaChcIkwyQ19Hb2xkUmFua0RheV9SZXNcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkwyQ19XaW5EYXlSYW5rX1JlcyhkYXRhKSB7XG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICAvLyBsZXQgdW5pdHMgPSBkYXRhLlVuaXRzXG4gICAgICAgIGhhbGxEYXRhLndpblJhbmtMaXN0ID0gZGF0YS5pbmZvc1xuXG4gICAgICAgIGRpc3BhdGNoKFwiTDJDX1dpbkRheVJhbmtfUmVzXCIpO1xuICAgIH1cbiAgICBwcml2YXRlIG9uTDJDX1dpbldlZWtSYW5rX1JlcyhkYXRhKSB7XG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICAvLyBsZXQgdW5pdHMgPSBkYXRhLlVuaXRzXG4gICAgICAgIGhhbGxEYXRhLndpblJhbmtMaXN0ID0gZGF0YS5pbmZvc1xuXG4gICAgICAgIGRpc3BhdGNoKFwiTDJDX1dpbldlZWtSYW5rX1Jlc1wiKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkwyQ19XaW5Nb250aFJhbmtfUmVzKGRhdGEpIHtcbiAgICAgICAgbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIC8vIGxldCB1bml0cyA9IGRhdGEuVW5pdHNcbiAgICAgICAgaGFsbERhdGEud2luUmFua0xpc3QgPSBkYXRhLmluZm9zXG5cbiAgICAgICAgZGlzcGF0Y2goXCJMMkNfV2luTW9udGhSYW5rX1Jlc1wiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTDJDX0JldFJhbmtfUmVzKGRhdGEpIHtcbiAgICAgICAgbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIC8vIGxldCB1bml0cyA9IGRhdGEuVW5pdHNcbiAgICAgICAgaGFsbERhdGEuYmV0UmFua0xpc3QgPSBkYXRhLmluZm9zXG5cbiAgICAgICAgZGlzcGF0Y2goXCJMMkNfQmV0UmFua19SZXNcIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk0yQ19UcmFuc2Zlck1hcF9SZXMoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChcIk0yQ19UcmFuc2Zlck1hcF9SZXNcIiwgZGF0YSlcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTTJDX0F1dGhPdXRfUmVzKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuXG4gICAgICAgIEcuRGF0YU1nci5nZXQoVXNlckRhdGEpLmNsZWFyVXNlckRhdGEoKTtcblxuICAgICAgICBkaXNwYXRjaChcIk0yQ19BdXRoT3V0X1Jlc1wiLCBkYXRhKVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Ob3RpY2VGaXJzdFBheShkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuZGF0YSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwi6aaW5YayXCIsIGRhdGEpXG4gICAgICAgICAgICBpZiAoVXNlci5fcG9wV2luZG93cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBVdGlsTWdyLnB1c2hXaW5kb3dzKFtcIm9wZW5GaXJzdFBheVZpZXdcIiwgZGF0YS5kYXRhLmZpcnN0UGF5V2luZG93c0ZvcmNlU3dpdGNoLCA0MF0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwib3BlbkZpcnN0UGF5Vmlld1wiLCBkYXRhLmRhdGEuZmlyc3RQYXlXaW5kb3dzRm9yY2VTd2l0Y2gpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5aSn5Y6F5Zu+5qCHXG4gICAgICogQHBhcmFtIG1zZyBcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uSGFsbEljb25Db25maWcobXNnKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcIuWkp+WOheWbvuagh1wiLCBtc2cpXG4gICAgICAgIGlmIChtc2cgJiYgbXNnLmRhdGEgJiYgbXNnLmRhdGEuaGFsbEljb25Db25maWcpIHtcbiAgICAgICAgICAgIEhhbGxDb25maWcuaGFsbEljb25Db25maWcgPSBtc2cuZGF0YS5oYWxsSWNvbkNvbmZpZ1xuICAgICAgICAgICAgSGFsbENvbmZpZy5oYWxsSWNvbkNvbmZpZzEgPSBtc2cuZGF0YS5oYWxsSWNvbkNvbmZpZzFcbiAgICAgICAgICAgIEhhbGxDb25maWcuaGFsbEljb25Db25maWcyID0gbXNnLmRhdGEuaGFsbEljb25Db25maWcyXG4gICAgICAgICAgICBIYWxsQ29uZmlnLmhhbGxJY29uQ29uZmlnMyA9IG1zZy5kYXRhLmhhbGxJY29uQ29uZmlnM1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKCdoYWxsSWNvbkNvbmZpZycpXG5cbiAgICB9XG4gICAgLyoqXG4gICAgICog5ri45oiP5paw5omL5byV5a+8XG4gICAgICogQHBhcmFtIG1zZyBcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uUHVzaEluc2VydE5ld1BsYXllckd1aWQobXNnKSB7XG4gICAgICAgIGlmIChtc2cgJiYgbXNnLmRhdGEgJiYgbXNnLmRhdGEuZ2FtZUlkKSB7XG4gICAgICAgICAgICBVc2VyLl9nYW1lSWRzLnB1c2gobXNnLmRhdGEuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKFwiQ01EX1B1c2hJbnNlcnROZXdQbGF5ZXJHdWlkXCIsIG1zZy5kYXRhLmdhbWVJZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNlbmRNc2cobXNnKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhtc2cpO1xuICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChtYWtlS2V5KG1zZy5tYWluQ21kKSwgbXNnLmRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBnZXRSb29tbGlzdChkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklHZXRSb29tTGlzdFJlcyk6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVJvb21JbmZvW10gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdmVSb29tSW5mb1tdIHwgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZwUm9vbUluZm9bXSB7XG4gICAgLy8gICAgIGxldCByb29tTGlzdDogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUm9vbUluZm9bXSB8IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVB2ZVJvb21JbmZvW10gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdnBSb29tSW5mb1tdID0gbnVsbDtcbiAgICAvLyAgICAgc3dpdGNoIChkYXRhLmluZm9UeXBlKSB7XG4gICAgLy8gICAgICAgICBjYXNlIGNvbS5idC5nYW1lLnByb3RvLmhhbGwuUm9vbUluZm9UeXBlLlB2ZTpcbiAgICAvLyAgICAgICAgICAgICByb29tTGlzdCA9IGRhdGEucHZlSW5mb3MgYXMgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZlUm9vbUluZm9bXTtcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcbiAgICAvLyAgICAgICAgIGNhc2UgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5Sb29tSW5mb1R5cGUuUHZwOlxuICAgIC8vICAgICAgICAgICAgIHJvb21MaXN0ID0gZGF0YS5yb29tTGlzdCBhcyBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklSb29tSW5mb1tdO1xuICAgIC8vICAgICAgICAgICAgIGJyZWFrO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiByb29tTGlzdDtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIGdldFJvb21saXN0UmVzKG1zZykge1xuICAgICAgICAvLyBHLkxvZ2dlci5sb2coXCLmlLbliLDmiL/pl7TliJfooajkv6Hmga/vvIHvvIHvvIHvvIFcIiwgbXNnKTtcbiAgICAgICAgLy8gaWYgKG1zZy5kYXRhICYmIG1zZy5kYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAvLyAgICAgbGV0IGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUdldFJvb21MaXN0UmVzID0gbXNnLmRhdGE7XG4gICAgICAgIC8vICAgICBsZXQgcm9vbUxpc3Q6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVJvb21JbmZvW10gfCBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQdmVSb29tSW5mb1tdIHwgY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUHZwUm9vbUluZm9bXSA9IHRoaXMuZ2V0Um9vbWxpc3QoZGF0YSk7XG5cbiAgICAgICAgLy8gICAgIGlmICghcm9vbUxpc3QgfHwgcm9vbUxpc3QubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgLy8gICAgICAgICBQYW5lbEhlbHAuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgLy8gICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVSUk9SVElQUy5ST09NTElTVEVSUk9SKTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSBpZiAoVXNlci5pc1JlY2hhcmdlZFBsYXllciA/IHJvb21MaXN0Lmxlbmd0aCA9PT0gMSA6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuUm9vbUluZm9UeXBlLlB2ZSA9PSBkYXRhLmluZm9UeXBlKSB7XG4gICAgICAgIC8vICAgICAgICAgLy8g55u05o6l6L+b5YWlXG4gICAgICAgIC8vICAgICAgICAgbGV0IHJvb21EYXRhID0gcm9vbUxpc3RbMF07XG4gICAgICAgIC8vICAgICAgICAgbGV0IG1hdGNoRGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JTWF0Y2hSb29tUmVxID0ge1xuICAgICAgICAvLyAgICAgICAgICAgICBnYW1lSWQ6IGRhdGEuZ2FtZUlkLFxuICAgICAgICAvLyAgICAgICAgICAgICBhcmVhSWQ6IHJvb21EYXRhLmFyZWFJZCxcbiAgICAgICAgLy8gICAgICAgICAgICAgZGVza0lkOiByb29tRGF0YS5yb29tSWQsXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIGRpc3BhdGNoKExvZ2ljRXZlbnQuRU5URVJfR0FNRV9NQVRDSCwgbWF0Y2hEYXRhKTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgLy8g5bGV56S65YiX6KGoXG4gICAgICAgIC8vICAgICAgICAgZGlzcGF0Y2goTG9naWNFdmVudC5FTlRFUl9ST09NX0xJU1QsIGRhdGEpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBtc2cuZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSlcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDljLnphY3ov5vlhaXmiL/pl7RcbiAgICAgKiBAcGFyYW0gbXNnIFxuICAgICAqL1xuICAgIHByaXZhdGUgb25NYXRjaEdhbWUobXNnKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhtc2cpO1xuICAgIH1cbiAgICAvLyDmlZHmtY7ph5FcbiAgICBwcml2YXRlIG9uTm90aWNlUmVsaWVmKG1zZykge1xuICAgICAgICBkaXNwYXRjaChcIm9wZW5HaXZlR29sZE5vdGlcIiwgbXNnLmRhdGEpO1xuXG4gICAgfVxuICAgIC8vIOaUueWPmOeOqeWutui0p+W4geexu+Wei1xuICAgIHByaXZhdGUgb25Ob3RpY2VFeGNoYW5nZVVzZXJHb2xkVHlwZShtc2cpIHtcbiAgICAgICAgZGlzcGF0Y2goXCJvcGVuRW50ZXJSZWFsRmllbGROb3RpXCIsIG1zZy5kYXRhKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTTJDX0tpY2tPdXRfTWVzKGRhdGE6IE1TVC5JTTJDX0tpY2tPdXRfTWVzKSB7XG4gICAgICAgIGRpc3BhdGNoKFwiTTJDX0tpY2tPdXRfTWVzXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NMkNfR29sZENoYW5nZV9NZXMoZGF0YTogTVNULklNMkNfR29sZENoYW5nZV9NZXMpOiB2b2lkIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIGxldCBvbGRHb2xkID0gdXNlckRhdGEuaW5mby5Hb2xkO1xuICAgICAgICB1c2VyRGF0YS5pbmZvLkdvbGQgPSBkYXRhLkdvbGQ7XG4gICAgICAgIGRpc3BhdGNoKCdFdmVudF9NMkNfR29sZENoYW5nZV9NZXMnLCBvbGRHb2xkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTTJDX0F1dGhfUmVzKGRhdGE6IE1TVC5NMkNfQXV0aF9SZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgICAgICB1c2VyRGF0YS5jbGVhclVzZXJEYXRhKCk7XG5cbiAgICAgICAgICAgIGRpc3BhdGNoKCdvcGVuTG9naW5FdmVudCcpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIHVzZXJEYXRhLmlkID0gTnVtYmVyKGRhdGEuQWNjb3VudElkKTtcbiAgICAgICAgdXNlckRhdGEubmljayA9IGRhdGEuUGxheWVySW5mby5OaWNrO1xuICAgICAgICB1c2VyRGF0YS5lbWFpbCA9IGRhdGEuQmluZEVtYWlsO1xuICAgICAgICB1c2VyRGF0YS5CaW5kUGhvbmUgPSBkYXRhLnBob25vTm87XG4gICAgICAgIHVzZXJEYXRhLmV4dGVuZENvZGUgPSBkYXRhLmV4dGVuZENvZGU7XG4gICAgICAgIHVzZXJEYXRhLmluZm8gPSBkYXRhLlBsYXllckluZm87XG4gICAgICAgIHVzZXJEYXRhLmluR2FtZSA9IGRhdGEuUm9vbU5hbWU7XG5cbiAgICAgICAgLy/mtYvor5Ug55So6LSm5Y+3aWQg5q2j5byP5L2/55SoRmFzdEF1dGhUb2tlblxuICAgICAgICBsZXQgZmFzdEF1dGhUb2tlbiA9IGRhdGEuRmFzdEF1dGhUb2tlblxuICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKExvY2FsU3RvcmVhZ2VEZWZpbmUuQUNDT1VOVF9UT0tFTiwgZmFzdEF1dGhUb2tlbik7XG4gICAgICAgIGRpc3BhdGNoKCd1cGRhdGVVc2VySW5mbycpXG5cbiAgICAgICAgbGV0IGxvZ2luVHlwZSA9IGRhdGEubG9naW5UeXBlO1xuICAgICAgICB0aGlzLnNpZ25PdXRIYW5kbGVyKGxvZ2luVHlwZSk7XG4gICAgfVxuXG4gICAgc2lnbk91dEhhbmRsZXIobG9naW5UeXBlKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc3dpdGNoIChsb2dpblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTG9naW5UeXBlLmZhY2Vib29rOlxuICAgICAgICAgICAgICAgIGZic2RrLmluc3RhbmNlLkZCX1NpZ25PdXQoZnVuY3Rpb24gKCkgeyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naW5UeXBlLmdvb2dsZTpcbiAgICAgICAgICAgICAgICBnb29nbGVzZGsuaW5zdGFuY2UuR29vZ2xlX1NpZ25PdXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTG9naW5UeXBlLnR3aXR0ZXI6XG4gICAgICAgICAgICAgICAgdHdpdHRlcnNkay5pbnN0YW5jZS5Ud2l0dGVyX1NpZ25PdXQoZnVuY3Rpb24gKCkgeyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTDJDX0dldEdhbWVMaXN0X1JlcyhkYXRhOiBNU1QuTDJDX0dldEdhbWVMaXN0X1Jlcykge1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgaGFsbERhdGEuZ2FtZXMgPSBkYXRhLmdhbWVzO1xuICAgICAgICBkaXNwYXRjaCgndXBkYXRlSGFsbEdhbWVzJylcbiAgICB9XG5cbiAgICBvbkwyQ19EZXBvc2l0X1JlcyhkYXRhOiBNU1QuTDJDX0RlcG9zaXRfUmVzKSB7XG4gICAgICAgIFBhbmVsSGVscC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIHJlY2hhcmdlRGF0YS5wYXltZW50VXJsID0gZGF0YS5wYXltZW50VXJsO1xuICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuUkVDSEFSR0VTVUNDRVNTKTtcbiAgICAgICAgZGlzcGF0Y2goXCJMMkNfRGVwb3NpdF9SZXNcIik7XG4gICAgfVxuXG4gICAgb25MMkNfQ2hpcHNDaGFuZ2VfTWVzKGRhdGE6IE1TVC5MMkNfQ2hpcHNDaGFuZ2VfTWVzKSB7XG4gICAgICAgIGRpc3BhdGNoKFwiTDJDX0NoaXBzQ2hhbmdlX01lc1wiLCBkYXRhKVxuICAgIH1cblxuICAgIG9uTDJDX1dpdGhkcmF3X1JlcyhkYXRhOiBNU1QuTDJDX1dpdGhkcmF3X1Jlcykge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5XSVRIRFJBV1NVQ0NFU1MpO1xuICAgICAgICBkaXNwYXRjaChcIkwyQ19XaXRoZHJhd19SZXNcIik7XG4gICAgfVxuXG4gICAgb25MMkNfR2V0U3RvcmVMaXN0X1JlcyhkYXRhOiBNU1QuTDJDX0dldFN0b3JlTGlzdF9SZXMpIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlY2hhcmdlRGF0YSA9IEcuRGF0YU1nci5nZXQoUmVjaGFyZ2VEYXRhKTtcbiAgICAgICAgcmVjaGFyZ2VEYXRhLnN0b3JlSW5mb0xpc3QgPSBkYXRhLmluZm87XG4gICAgICAgIGRpc3BhdGNoKFwiTDJDX0dldFN0b3JlTGlzdF9SZXNcIilcbiAgICB9XG5cbiAgICBvbkwyQ19HZXREZXBvc2l0TGltaXRfUmVzKGRhdGE6IE1TVC5MMkNfR2V0RGVwb3NpdExpbWl0X1Jlcykge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICByZWNoYXJnZURhdGEubWluRGVwQW1vdW50ID0gZGF0YS5taW5BbW91bnQ7XG4gICAgICAgIHJlY2hhcmdlRGF0YS5tYXhEZXBBbW91bnQgPSBkYXRhLm1heEFtb3VudDtcbiAgICAgICAgLy8gZGlzcGF0Y2goXCJMMkNfR2V0RGVwb3NpdExpbWl0X1Jlc1wiKVxuICAgIH1cblxuICAgIG9uTDJDX0dldFdpdGhkcmF3TGltaXRfUmVzKGRhdGE6IE1TVC5MMkNfR2V0V2l0aGRyYXdMaW1pdF9SZXMpIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlY2hhcmdlRGF0YSA9IEcuRGF0YU1nci5nZXQoUmVjaGFyZ2VEYXRhKTtcbiAgICAgICAgcmVjaGFyZ2VEYXRhLm1pbldpdGhBbW91bnQgPSBOdW1iZXIoZGF0YS5taW5BbW91bnQpIC8gMTAwO1xuICAgICAgICByZWNoYXJnZURhdGEubWF4V2l0aEFtb3VudCA9IE51bWJlcihkYXRhLm1heEFtb3VudCkgLyAxMDA7XG4gICAgfVxuXG4gICAgb25MMkNfR2V0QmFua0xpc3RfUmVzKGRhdGE6IE1TVC5MMkNfR2V0QmFua0xpc3RfUmVzKSB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCByZWNoYXJnZURhdGEgPSBHLkRhdGFNZ3IuZ2V0KFJlY2hhcmdlRGF0YSk7XG4gICAgICAgIHJlY2hhcmdlRGF0YS5iYW5rSW5mb0xpc3QgPSBkYXRhLmluZm87XG4gICAgICAgIGRpc3BhdGNoKFwiTDJDX0dldEJhbmtMaXN0X1Jlc1wiKTtcbiAgICB9XG5cbiAgICBvbkwyQ19HZXRCYW5rQ2FyZEluZm9fUmVzKGRhdGE6IE1TVC5MMkNfR2V0QmFua0NhcmRJbmZvX1Jlcykge1xuICAgICAgICBpZiAoZGF0YS5FcnJvciAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5FcnJvcik7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVjaGFyZ2VEYXRhID0gRy5EYXRhTWdyLmdldChSZWNoYXJnZURhdGEpO1xuICAgICAgICBpZiAoZGF0YS5iYW5rTm8gJiYgZGF0YS5iYW5rQ29kZSkge1xuICAgICAgICAgICAgbGV0IGJhbmRCYW5rQ2FyZEluZm8gPSByZWNoYXJnZURhdGEuYmFuZEJhbmtDYXJkSW5mbztcbiAgICAgICAgICAgIGJhbmRCYW5rQ2FyZEluZm8gPSB7fTtcbiAgICAgICAgICAgIGJhbmRCYW5rQ2FyZEluZm8uYmFua0NvZGUgPSBkYXRhLmJhbmtDb2RlO1xuICAgICAgICAgICAgYmFuZEJhbmtDYXJkSW5mby5iYW5rVXNlck5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICAgICBiYW5kQmFua0NhcmRJbmZvLmJhbmtObyA9IGRhdGEuYmFua05vO1xuICAgICAgICAgICAgcmVjaGFyZ2VEYXRhLmJhbmRCYW5rQ2FyZEluZm8gPSBiYW5kQmFua0NhcmRJbmZvO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKFwiTDJDX0dldEJhbmtDYXJkSW5mb19SZXNcIik7XG4gICAgfVxuXG4gICAgb25MMkNfQmluZEJhbmtDYXJkX1JlcyhkYXRhOiBNU1QuTDJDX0JpbmRCYW5rQ2FyZF9SZXMpIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBkaXNwYXRjaChcIkwyQ19CaW5kQmFua0NhcmRfUmVzXCIpO1xuICAgIH1cblxuICAgIG9uTDJDX0dldFdpdGhkcmF3UmVjb3Jkc19SZXMoZGF0YTogTVNULkwyQ19HZXRXaXRoZHJhd1JlY29yZHNfUmVzKSB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X0wyQ19XaXRoZHJhd1JlY29yZFwiLCBkYXRhKTtcbiAgICB9XG5cbiAgICBvblMyQ19HZXREZXBvc2l0TGlzdChkYXRhOiBNU1QuUzJDX0dldERlcG9zaXRMaXN0KSB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfR2V0RGVwb3NpdExpc3RcIiwgZGF0YSk7XG4gICAgfVxuXG4gICAgb25TMkNfR2V0U2lnbmVkSW5mbyhkYXRhOiBNU1QuUzJDX0dldFNpZ25lZEluZm8pIHtcbiAgICAgICAgaWYgKGRhdGEuY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5jb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICBoYWxsRGF0YS5zaWduaW5EYXRhID0gZGF0YTtcbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfR2V0U2lnbmVkSW5mb1wiKTtcbiAgICB9XG5cbiAgICBvblMyQ19TaWduZWQoZGF0YTogTVNULlMyQ19TaWduZWQpIHtcbiAgICAgICAgaWYgKGRhdGEuY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5jb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICBoYWxsRGF0YS5zaWduaW5EYXRhLnNlcmlhbCA9IGRhdGEuc2VyaWFsO1xuICAgICAgICBoYWxsRGF0YS5zaWduaW5EYXRhLnJld2FyZCA9IGRhdGEucmV3YXJkO1xuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X1MyQ19TaWduZWRcIik7XG4gICAgfVxuXG4gICAgb25TMkNfR2V0Q2hlY2tDb2RlKGRhdGE6IE1TVC5TMkNfR2V0Q2hlY2tDb2RlKSB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfR2V0Q2hlY2tDb2RlXCIpO1xuICAgIH1cblxuICAgIG9uUzJDX1JlZ2lzdGVyKGRhdGE6IE1TVC5TMkNfUmVnaXN0ZXIpIHtcbiAgICAgICAgaWYgKGRhdGEuY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5jb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X1MyQ19SZWdpc3RlclwiKTtcbiAgICB9XG5cbiAgICBvblMyQ19CaW5kRW1haWwoZGF0YTogTVNULlMyQ19CaW5kRW1haWwpIHtcbiAgICAgICAgaWYgKGRhdGEuY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5jb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICAgICAgdXNlckRhdGEuZW1haWwgPSBkYXRhLmVtYWlsO1xuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X1MyQ19CaW5kRW1haWxcIik7XG4gICAgfVxuXG4gICAgb25TMkNfUmVzZXRQYXNzd29yZChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfUmVzZXRQYXNzd29yZFwiKTtcbiAgICB9XG5cbiAgICBvblMyQ19CaW5kUGhvbmUoZGF0YTogTVNULlMyQ19CaW5kUGhvbmUpIHtcbiAgICAgICAgaWYgKGRhdGEuY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5jb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICAgICAgdXNlckRhdGEuQmluZFBob25lID0gZGF0YS5waG9uZU5vO1xuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X1MyQ19CaW5kUGhvbmVcIik7XG4gICAgfVxuXG4gICAgb25TMkNfR2V0UmVnaXN0ZXJSZXdvcmRDb25maWcoZGF0YTogTVNULlMyQ19HZXRSZWdpc3RlclJld29yZENvbmZpZykge1xuICAgICAgICBpZiAoZGF0YS5jb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLmNvZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKFwiRXZlbnRfUzJDX0dldFJlZ2lzdGVyUmV3b3JkQ29uZmlnXCIsIGRhdGEpO1xuICAgIH1cblxuICAgIG9uUzJDX01vZGlmeUF2YXJ0YXIoZGF0YTogTVNULlMyQ19Nb2RpZnlBdmFydGFyKSB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIHVzZXJEYXRhLmluZm8uSGVhZGVyVXJsID0gZGF0YS5hdmFydGFyO1xuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X1MyQ19Nb2RpZnlBdmFydGFyXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TMkNfTWluaWdhbWVJbmZvKGRhdGE6IE1TVC5JUzJDX01pbmlnYW1lSW5mbyk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5jb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLmNvZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfTWluaWdhbWVJbmZvXCIsIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TMkNfTWluaWdhbWVMb3R0ZXJ5KGRhdGE6IE1TVC5JUzJDX01pbmlnYW1lTG90dGVyeSk6IHZvaWQge1xuICAgICAgICBpZiAoZGF0YS5jb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLmNvZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfTWluaWdhbWVMb3R0ZXJ5XCIsIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TMkNfUHJvbW90aW9uSW5mbyhkYXRhOiBNU1QuSVMyQ19Qcm9tb3Rpb25JbmZvKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkaXNwYXRjaChcIkV2ZW50X1MyQ19Qcm9tb3Rpb25JbmZvXCIsIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TMkNfR2V0TWlzc2lvbkxpc3QoZGF0YTogTVNULklTMkNfR2V0TWlzc2lvbkxpc3QpIHtcbiAgICAgICAgaWYgKGRhdGEuY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dFcnJUaXAoZGF0YS5jb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgaGFsbERhdGEubWlzc2lvbkxpc3QgPSBkYXRhLmluZm87XG4gICAgICAgIGRpc3BhdGNoKFwiRXZlbnRfUzJDX0dldE1pc3Npb25MaXN0XCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TMkNfTWlzc2lvbkNsYWltKGRhdGE6IE1TVC5JUzJDX01pc3Npb25DbGFpbSkge1xuICAgICAgICBpZiAoZGF0YS5jb2RlICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLmNvZGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfTWlzc2lvbkNsYWltXCIsIGRhdGEpO1xuICAgIH1cblxuICAgIG9uUzJDX01lc3NhZ2VOb3RpZnkoZGF0YTogTVNULklTMkNfTWVzc2FnZU5vdGlmeSkge1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgaGFsbERhdGEubm90aWNlLnB1c2goZGF0YSk7XG4gICAgICAgIGRpc3BhdGNoKFwiRXZlbnRfUzJDX01lc3NhZ2VOb3RpZnlcIik7XG4gICAgfVxufVxuXG5NYW5hZ2VyLm5ldE1hbmFnZXIucHVzaChIYWxsTmV0Q29udHJvbGxlcik7XG4iXX0=