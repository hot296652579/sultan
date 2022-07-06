"use strict";
cc._RF.push(module, '32a36IIi0tIspdGLf5JgxUX', 'RouletteNetController');
// games/roulette/protocol/RouletteNetController.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../../../script/common/manager/Manager");
const CmdResStruct_1 = require("../../../script/common/net/CmdResStruct");
const LobbyService_1 = require("../../../script/common/net/LobbyService");
const UserData_1 = __importDefault(require("../../../script/data/UserData"));
const Controller_1 = __importDefault(require("../../../script/framework/controller/Controller"));
const Decorators_1 = require("../../../script/framework/decorator/Decorators");
const protoc_1 = require("../../../script/framework/external/protoc");
const PanelHelp_1 = __importDefault(require("../../../script/msgbox/PanelHelp"));
const RouletteData_1 = __importDefault(require("../script/data/RouletteData"));
/**
 * @description 逻辑流程控制器
 */
const { ccclass, property } = cc._decorator;
let RouletteNetController = class RouletteNetController extends Controller_1.default {
    bindingEvents() {
        super.bindingEvents();
        this.registerRes();
        this.registerEvent(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.M2C_GetRouletteInfo_Res, this.onM2C_GetRouletteInfo_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.M2C_RouletteStartBet_Mes, this.onM2C_RouletteStartBet_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.M2C_MyRouletteBet_Res, this.onM2C_MyRouletteBet_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.M2C_RouletteStart_mes, this.onM2C_RouletteStart_mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.R2C_PaybackPhase_Mes, this.onR2C_PaybackPhase_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.R2C_Bet_Mes, this.onR2C_Bet_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.R2C_GetBetRandInfo_Res, this.onR2C_GetBetRandInfo_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.R2C_GetGameRecords_Res, this.onR2C_GetGameRecords_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_Roulette.R2C_GetBetInfo_Res, this.onR2C_GetBetInfo_Res);
    }
    registerRes() {
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, protoc_1.MST.M2C_TransferMap_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.M2C_GetRouletteInfo_Res, protoc_1.MST.M2C_GetRouletteInfo_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.M2C_RouletteStartBet_Mes, protoc_1.MST.M2C_RouletteStartBet_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.M2C_MyRouletteBet_Res, protoc_1.MST.M2C_MyRouletteBet_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.M2C_RouletteStart_mes, protoc_1.MST.M2C_RouletteStart_mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.R2C_PaybackPhase_Mes, protoc_1.MST.R2C_PaybackPhase_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.R2C_Bet_Mes, protoc_1.MST.R2C_Bet_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.R2C_GetBetRandInfo_Res, protoc_1.MST.R2C_GetBetRandInfo_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.R2C_GetGameRecords_Res, protoc_1.MST.R2C_GetGameRecords_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Roulette.R2C_GetBetInfo_Res, protoc_1.MST.R2C_GetBetInfo_Res);
    }
    onM2C_TransferMap_Res(data) {
        let userData = G.DataMgr.get(UserData_1.default);
        userData.inGame = data.RoomName;
        dispatch("Event_M2C_TransferMap_Res", data);
    }
    onM2C_GetRouletteInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        rouletteData.Status = data.Status;
        rouletteData.EndTimeStamp = data.EndTimeStamp;
        rouletteData.gameRecordList.length = 0;
        rouletteData.onRoomBets = [];
        for (let v of data.Bets) {
            let betPlayer = {
                betInfo: v,
            };
            rouletteData.onRoomBets.push(betPlayer);
        }
        rouletteData.onRoomBets.reverse();
        rouletteData.onRoomTotalBet = data.betRecord;
        rouletteData.gameRecordList = [].concat(data.MultipleRecord);
        rouletteData.curRound = data.round;
        rouletteData.hashSalt = data.hashSalt;
        rouletteData.randomNum = data.randomNo;
        rouletteData.roundHash = data.roundHash;
        if (data.Status == protoc_1.MST.RouletteStatus.BetPhase) {
            rouletteData.stopBetTimeStamp = Number(data.EndTimeStamp);
        }
        dispatch("Event_M2C_GetRouletteInfo_Res");
    }
    onM2C_RouletteStartBet_Mes(data) {
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        rouletteData.Status = protoc_1.MST.RouletteStatus.BetPhase;
        rouletteData.stopBetTimeStamp = Number(data.StopBetTimeStamp);
        rouletteData.roundHash = data.randHash;
        rouletteData.clearRouletteData();
        dispatch("Event_M2C_RouletteStartBet_Mes");
    }
    onM2C_MyRouletteBet_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
    }
    onM2C_RouletteStart_mes(data) {
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        rouletteData.Status = protoc_1.MST.RouletteStatus.AnimationPhase;
        // rouletteData.StartTimeStamp = Number(data.StartTimeStamp);
        rouletteData.StopTimeStamp = Number(data.StopTimeStamp);
        rouletteData.endIndex = data.endIndex;
        dispatch("Event_M2C_RouletteStart_mes");
    }
    onR2C_PaybackPhase_Mes(data) {
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        rouletteData.Status = protoc_1.MST.RouletteStatus.PaybackPhase;
        let gameRecordList = rouletteData.gameRecordList;
        rouletteData.curRound = data.nextRound;
        rouletteData.hashSalt = data.hashSalt;
        rouletteData.randomNum = data.randomNum;
        rouletteData.endIndex = data.color;
        gameRecordList.push(Number(data.color));
        dispatch("Event_R2C_PaybackPhase_Mes");
    }
    onR2C_Bet_Mes(data) {
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        if (!data.info)
            return;
        let onRoomTotalBet = rouletteData.onRoomTotalBet;
        let betPlayer = {
            betInfo: data.info
        };
        if (!rouletteData.onRoomBets)
            rouletteData.onRoomBets = [];
        rouletteData.onRoomBets.push(betPlayer);
        rouletteData.onRoomBets.reverse();
        for (let index = 0; index < onRoomTotalBet.length; index++) {
            const totalData = onRoomTotalBet[index];
            if (totalData.color == data.info.Color) {
                let chips = Number(totalData.chips);
                chips += Number(data.info.BetGold);
                totalData.chips = chips;
            }
        }
        dispatch("Event_R2C_Bet_Mes");
    }
    onR2C_GetBetRandInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let rouletteData = G.DataMgr.get(RouletteData_1.default);
        rouletteData.betBigRankInfo = [];
        for (let v of data.records) {
            let betPlayer = {
                betInfo: v,
            };
            rouletteData.betBigRankInfo.push(betPlayer);
        }
        dispatch("Event_R2C_GetBetRandInfo_Res");
    }
    onR2C_GetGameRecords_Res(data) {
        dispatch("Event_R2C_GetGameRecords_Res", data);
    }
    onR2C_GetBetInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        dispatch("Event_onR2C_GetBetInfo_Res", data);
    }
};
RouletteNetController = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteNetController);
exports.default = RouletteNetController;
Manager_1.Manager.netManager.push(RouletteNetController);

cc._RF.pop();