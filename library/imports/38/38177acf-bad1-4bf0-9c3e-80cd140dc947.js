"use strict";
cc._RF.push(module, '38177rPutFL8Jw+gM0UDclH', 'CrashNetController');
// games/crash/script/protocol/CrashNetController.ts

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
const Manager_1 = require("../../../../script/common/manager/Manager");
const CmdResStruct_1 = require("../../../../script/common/net/CmdResStruct");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const Controller_1 = __importDefault(require("../../../../script/framework/controller/Controller"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const protoc_1 = require("../../../../script/framework/external/protoc");
const CrashData_1 = __importDefault(require("../data/CrashData"));
const CrashDefine_1 = require("../define/CrashDefine");
/**
 * @description 逻辑流程控制器
 */
const { ccclass, property } = cc._decorator;
let CrashNetController = class CrashNetController extends Controller_1.default {
    bindingEvents() {
        super.bindingEvents();
        this.registerRes();
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_GetCrashInfo_Res, this.onM2C_GetCrashInfo_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStart_mes, this.onM2C_CrashStart_mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_MyCrashBet_Res, this.onM2C_MyCrashBet_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashBet_Mes, this.onM2C_CrashBet_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStop_Mes, this.onM2C_CrashStop_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStartBet_Mes, this.onM2C_CrashStartBet_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashEscape_Mes, this.onM2C_CrashEscape_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStopBet_Mes, this.onM2C_CrashStopBet_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Res, this.onM2C_CrashCancelAutoBet_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Mes, this.onM2C_CrashCancelAutoBet_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashHash_Mes, this.onM2C_CrashHash_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashHashRecord_Res, this.onM2C_CrashHashRecord_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_CrashGame.S2C_CrashMyRecord, this.onS2C_CrashMyRecord);
        this.registerEvent(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
    }
    registerRes() {
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_GetCrashInfo_Res, protoc_1.MST.M2C_GetCrashInfo_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStart_mes, protoc_1.MST.M2C_CrashStart_mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_MyCrashBet_Res, protoc_1.MST.M2C_MyCrashBet_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashBet_Mes, protoc_1.MST.M2C_CrashBet_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStop_Mes, protoc_1.MST.M2C_CrashStop_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStartBet_Mes, protoc_1.MST.M2C_CrashStartBet_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashEscape_Mes, protoc_1.MST.M2C_CrashEscape_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashStopBet_Mes, protoc_1.MST.M2C_CrashStopBet_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Res, protoc_1.MST.M2C_CrashCancelAutoBet_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Mes, protoc_1.MST.M2C_CrashCancelAutoBet_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashHash_Mes, protoc_1.MST.M2C_CrashHash_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.M2C_CrashHashRecord_Res, protoc_1.MST.M2C_CrashHashRecord_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_CrashGame.S2C_CrashMyRecord, protoc_1.MST.S2C_CrashMyRecord);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, protoc_1.MST.M2C_TransferMap_Res);
    }
    onM2C_GetCrashInfo_Res(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.betList.length = 0;
        crashData.myBetList.length = 0;
        crashData.rateRecordList.length = 0;
        for (let v of data.Bets) {
            let betPlayer = {
                betInfo: v,
                isEscape: crashData.getRate() >= v.Multiple,
            };
            crashData.betList.push(betPlayer);
        }
        for (let v of data.MyBet) {
            let betPlayer = {
                betInfo: v,
                isEscape: crashData.getRate() >= v.Multiple,
            };
            crashData.myBetList.push(betPlayer);
        }
        crashData.betPlayerMap.clear();
        let index = 0;
        for (let i = crashData.myBetList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.myBetList[i]);
        }
        for (let i = crashData.betList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.betList[i]);
            if (crashData.betPlayerMap.size >= CrashDefine_1.CrashDefine.BET_LIST_COUNT) {
                break;
            }
        }
        crashData.status = data.Status;
        switch (crashData.status) {
            case protoc_1.MST.CrashStatus.StartBet:
                crashData.stopBetTimestamp = Number(data.StartTimeStamp);
                break;
            case protoc_1.MST.CrashStatus.GameBegin:
                crashData.startGameTimestamp = Number(data.StartTimeStamp);
                break;
            case protoc_1.MST.CrashStatus.GameOver:
                data.Multi = data.MultipleRecord[data.MultipleRecord.length - 1];
                break;
            default:
                crashData.stopBetTimestamp = 0;
                crashData.startGameTimestamp = 0;
                break;
        }
        crashData.rateRecordList = [].concat(data.MultipleRecord);
        crashData.betTotalGold = Number(data.TotalGold);
        crashData.betTotalCount = Number(data.TotalPlayer);
        crashData.autoBetData = data.AtuoBetInfo;
        crashData.hashInfo.serverSeed = data.SeedInfo.ServerSeedHash;
        crashData.hashInfo.publicSeed = data.SeedInfo.PublicSeed;
        crashData.hashInfo.gameNo = data.GameNo;
        if (data.Multi) {
            crashData.roundBombRate = Number(data.Multi);
        }
        dispatch("Event_M2C_GetCrashInfo_Res", data);
    }
    onM2C_CrashStart_mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.status = protoc_1.MST.CrashStatus.GameBegin;
        crashData.startGameTimestamp = Number(data.StartTimeStamp);
        if (data.Multi) {
            crashData.roundBombRate = Number(data.Multi);
        }
        dispatch("Event_M2C_CrashStart_mes", data);
    }
    onM2C_MyCrashBet_Res(data) {
        dispatch("Event_M2C_MyCrashBet_Res", data);
    }
    onM2C_CrashBet_Mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        let userData = G.DataMgr.get(UserData_1.default);
        crashData.betTotalGold = Number(data.TotalGold);
        crashData.betTotalCount = Number(data.TotalPlayer);
        for (let v of data.Bets) {
            let betPlayer = {
                betInfo: v,
                isEscape: false,
            };
            if (v.player.UnitId === userData.id) {
                crashData.myBetList.push(betPlayer);
            }
            else {
                crashData.betList.push(betPlayer);
            }
        }
        crashData.betPlayerMap.clear();
        let index = 0;
        for (let i = crashData.myBetList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.myBetList[i]);
        }
        for (let i = crashData.betList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.betList[i]);
            if (crashData.betPlayerMap.size >= CrashDefine_1.CrashDefine.BET_LIST_COUNT) {
                break;
            }
        }
        dispatch("Event_M2C_CrashBet_Mes", data);
    }
    onM2C_CrashStop_Mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.status = protoc_1.MST.CrashStatus.GameOver;
        crashData.rateRecordList.push(Number(data.Multiples));
        crashData.bombTimestamp = Number(data.ExplosionTimeStamp);
        crashData.hashInfo.roundHash = data.HashResult;
        crashData.hashInfo.acak = data.Acak;
        crashData.hashInfo.point = Number(data.Multiples);
        dispatch("Event_M2C_CrashStop_Mes", data);
    }
    onM2C_CrashStartBet_Mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        let appData = G.DataMgr.get(AppData_1.default);
        crashData.initNext();
        crashData.status = protoc_1.MST.CrashStatus.StartBet;
        crashData.startBetTimestamp = appData.getServerTimestamp();
        crashData.stopBetTimestamp = Number(data.StopBetTimeStamp);
        crashData.hashInfo.gameNo = data.GameNo;
        crashData.roundBombRate = null;
        dispatch("Event_M2C_CrashStartBet_Mes", data);
    }
    onM2C_CrashEscape_Mes(data) {
        dispatch("Event_M2C_CrashEscape_Mes", data);
    }
    onM2C_CrashStopBet_Mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.status = protoc_1.MST.CrashStatus.StopBet;
        dispatch("Event_M2C_CrashStopBet_Mes", data);
    }
    onM2C_CrashCancelAutoBet_Res(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.autoBetData = null;
        dispatch("Event_M2C_CrashCancelAutoBet_Res", data);
    }
    onM2C_CrashCancelAutoBet_Mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.autoBetData = null;
        dispatch("Event_M2C_CrashCancelAutoBet_Mes", data);
    }
    onM2C_CrashHash_Mes(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.hashInfo.serverSeed = data.SeedInfo.ServerSeed;
        crashData.hashInfo.serverSeedHash = data.SeedInfo.ServerSeedHash;
        crashData.hashInfo.publicSeed = data.SeedInfo.PublicSeed;
        dispatch("Event_M2C_CrashHash_Mes", data);
    }
    onM2C_CrashHashRecord_Res(data) {
        let crashData = G.DataMgr.get(CrashData_1.default);
        crashData.totalRecordData = data;
        dispatch("Event_M2C_CrashHashRecord_Res", data);
    }
    onS2C_CrashMyRecord(data) {
        dispatch("Event_S2C_CrashMyRecord", data);
    }
    onM2C_TransferMap_Res(data) {
        let userData = G.DataMgr.get(UserData_1.default);
        userData.inGame = data.RoomName;
        dispatch("Event_M2C_TransferMap_Res", data);
    }
};
CrashNetController = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashNetController);
exports.default = CrashNetController;
Manager_1.Manager.netManager.push(CrashNetController);

cc._RF.pop();