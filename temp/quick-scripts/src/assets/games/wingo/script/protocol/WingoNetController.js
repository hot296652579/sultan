"use strict";
cc._RF.push(module, '4ec4a65rJpCN7FBuVN9l/5M', 'WingoNetController');
// games/wingo/script/protocol/WingoNetController.ts

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
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const Controller_1 = __importDefault(require("../../../../script/framework/controller/Controller"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const protoc_1 = require("../../../../script/framework/external/protoc");
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const WingoData_1 = __importDefault(require("../data/WingoData"));
/**
 * @description 逻辑流程控制器
 */
const { ccclass, property } = cc._decorator;
let WingoNetController = class WingoNetController extends Controller_1.default {
    bindingEvents() {
        super.bindingEvents();
        this.registerRes();
        this.registerEvent(protoc_1.MST.OuterOpcode_WingoGame.M2C_GetWingoInfo_Res, this.onM2C_GetWingoInfo_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_WingoGame.M2C_GetWingoHistory_Res, this.onM2C_GetWingoHistory_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_WingoGame.M2C_WingoLottery_Mes, this.onM2C_WingoLottery_Mes);
        this.registerEvent(protoc_1.MST.OuterOpcode_WingoGame.M2C_WingoBet_Res, this.onM2C_WingoBet_Res);
        this.registerEvent(protoc_1.MST.OuterOpcode_WingoGame.S2C_WingoMyRecord, this.onS2C_WingoMyRecord);
        this.registerEvent(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
    }
    registerRes() {
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_WingoGame.M2C_GetWingoInfo_Res, protoc_1.MST.M2C_GetWingoInfo_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_WingoGame.M2C_GetWingoHistory_Res, protoc_1.MST.M2C_GetWingoHistory_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_WingoGame.M2C_WingoLottery_Mes, protoc_1.MST.M2C_WingoLottery_Mes);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_WingoGame.M2C_WingoBet_Res, protoc_1.MST.M2C_WingoBet_Res);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_WingoGame.S2C_WingoMyRecord, protoc_1.MST.S2C_WingoMyRecord);
        CmdResStruct_1.CmdResStruct.register(protoc_1.MST.OuterOpcode_Map.M2C_TransferMap_Res, protoc_1.MST.M2C_TransferMap_Res);
    }
    onM2C_GetWingoInfo_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let wingoData = G.DataMgr.get(WingoData_1.default);
        wingoData.lotteryMap.get(protoc_1.MST.WingoMode.CepatPlus).NextTimestamp = Number(data.CepatPlusTimestamp);
        wingoData.lotteryMap.get(protoc_1.MST.WingoMode.Cepat).NextTimestamp = Number(data.CepatTimestamp);
        wingoData.lotteryMap.get(protoc_1.MST.WingoMode.Standar).NextTimestamp = Number(data.StandarTimestamp);
        wingoData.cost = data.Cost;
        dispatch("Event_M2C_GetWingoInfo_Res", data);
    }
    onM2C_GetWingoHistory_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        let wingoData = G.DataMgr.get(WingoData_1.default);
        if (wingoData.isFirst) {
            wingoData.currMode = protoc_1.MST.WingoMode.CepatPlus;
        }
        else {
            wingoData.currMode = data.Mode;
        }
        wingoData.currIssue = Number(data.CurrIssue);
        wingoData.historyLotteryMap.set(data.Mode, data.HistoryInfo.reverse());
        if (!wingoData.isFirst || data.Mode === wingoData.currMode) {
            dispatch("Event_M2C_GetWingoHistory_Res", data);
        }
    }
    onM2C_WingoLottery_Mes(data) {
        let wingoData = G.DataMgr.get(WingoData_1.default);
        if (wingoData.currMode === data.Mode) {
            wingoData.currIssue = Number(data.NextIssue);
        }
        wingoData.historyLotteryMap.get(data.Mode).push(data.LotteryInfo);
        wingoData.lotteryMap.set(data.Mode, data);
        dispatch("Event_M2C_WingoLottery_Mes", data);
    }
    onM2C_WingoBet_Res(data) {
        if (data.Error !== 0) {
            PanelHelp_1.default.showErrTip(data.Error);
            return;
        }
        dispatch("Event_M2C_WingoBet_Res", data);
    }
    onS2C_WingoMyRecord(data) {
        if (data.code !== 0) {
            PanelHelp_1.default.showErrTip(data.code);
            return;
        }
        // let wingoData: WingoData = G.DataMgr.get(WingoData);
        // let myRecordList: MST.IMyRecordInfo[] = wingoData.myRecordMap.get(wingoData.currMode);
        // if (myRecordList) {
        // }
        dispatch("Event_S2C_WingoMyRecord", data);
    }
    onM2C_TransferMap_Res(data) {
        let userData = G.DataMgr.get(UserData_1.default);
        userData.inGame = data.RoomName;
        dispatch("Event_M2C_TransferMap_Res", data);
    }
};
WingoNetController = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], WingoNetController);
exports.default = WingoNetController;
Manager_1.Manager.netManager.push(WingoNetController);

cc._RF.pop();