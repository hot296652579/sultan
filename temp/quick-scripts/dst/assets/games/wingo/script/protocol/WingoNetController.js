
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/protocol/WingoNetController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvcHJvdG9jb2wvV2luZ29OZXRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQW9FO0FBQ3BFLDZFQUEwRTtBQUMxRSw2RUFBMEU7QUFDMUUsZ0ZBQXdEO0FBQ3hELG9HQUE0RTtBQUM1RSxrRkFBMkY7QUFDM0YseUVBQW1FO0FBQ25FLG9GQUE0RDtBQUM1RCxrRUFBMEM7QUFHMUM7O0dBRUc7QUFDSCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLG9CQUF3QjtJQUUxRCxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFHLENBQUMscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFHLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFHLENBQUMscUJBQXFCLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFHLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFHLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLGFBQWEs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QixJQUFJO1FBRUosUUFBUSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxJQUE4QjtRQUN2RCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDdkMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBRUosQ0FBQTtBQWpHb0Isa0JBQWtCO0lBRnRDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGtCQUFrQixDQWlHdEM7a0JBakdvQixrQkFBa0I7QUFtR3ZDLGlCQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgQ21kUmVzU3RydWN0IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0NtZFJlc1N0cnVjdFwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCBXaW5nb0RhdGEgZnJvbSBcIi4uL2RhdGEvV2luZ29EYXRhXCI7XG5pbXBvcnQgeyBXaW5nb0ludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2UvV2luZ29JbnRlcmZhY2VcIjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6YC76L6R5rWB56iL5o6n5Yi25ZmoICBcbiAqL1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmdvTmV0Q29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG5cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpXG4gICAgICAgIHRoaXMucmVnaXN0ZXJSZXMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KE1TVC5PdXRlck9wY29kZV9XaW5nb0dhbWUuTTJDX0dldFdpbmdvSW5mb19SZXMsIHRoaXMub25NMkNfR2V0V2luZ29JbmZvX1Jlcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChNU1QuT3V0ZXJPcGNvZGVfV2luZ29HYW1lLk0yQ19HZXRXaW5nb0hpc3RvcnlfUmVzLCB0aGlzLm9uTTJDX0dldFdpbmdvSGlzdG9yeV9SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoTVNULk91dGVyT3Bjb2RlX1dpbmdvR2FtZS5NMkNfV2luZ29Mb3R0ZXJ5X01lcywgdGhpcy5vbk0yQ19XaW5nb0xvdHRlcnlfTWVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KE1TVC5PdXRlck9wY29kZV9XaW5nb0dhbWUuTTJDX1dpbmdvQmV0X1JlcywgdGhpcy5vbk0yQ19XaW5nb0JldF9SZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoTVNULk91dGVyT3Bjb2RlX1dpbmdvR2FtZS5TMkNfV2luZ29NeVJlY29yZCwgdGhpcy5vblMyQ19XaW5nb015UmVjb3JkKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KE1TVC5PdXRlck9wY29kZV9NYXAuTTJDX1RyYW5zZmVyTWFwX1JlcywgdGhpcy5vbk0yQ19UcmFuc2Zlck1hcF9SZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJSZXMoKSB7XG4gICAgICAgIENtZFJlc1N0cnVjdC5yZWdpc3RlcihNU1QuT3V0ZXJPcGNvZGVfV2luZ29HYW1lLk0yQ19HZXRXaW5nb0luZm9fUmVzLCBNU1QuTTJDX0dldFdpbmdvSW5mb19SZXMpO1xuICAgICAgICBDbWRSZXNTdHJ1Y3QucmVnaXN0ZXIoTVNULk91dGVyT3Bjb2RlX1dpbmdvR2FtZS5NMkNfR2V0V2luZ29IaXN0b3J5X1JlcywgTVNULk0yQ19HZXRXaW5nb0hpc3RvcnlfUmVzKTtcbiAgICAgICAgQ21kUmVzU3RydWN0LnJlZ2lzdGVyKE1TVC5PdXRlck9wY29kZV9XaW5nb0dhbWUuTTJDX1dpbmdvTG90dGVyeV9NZXMsIE1TVC5NMkNfV2luZ29Mb3R0ZXJ5X01lcyk7XG4gICAgICAgIENtZFJlc1N0cnVjdC5yZWdpc3RlcihNU1QuT3V0ZXJPcGNvZGVfV2luZ29HYW1lLk0yQ19XaW5nb0JldF9SZXMsIE1TVC5NMkNfV2luZ29CZXRfUmVzKTtcbiAgICAgICAgQ21kUmVzU3RydWN0LnJlZ2lzdGVyKE1TVC5PdXRlck9wY29kZV9XaW5nb0dhbWUuUzJDX1dpbmdvTXlSZWNvcmQsIE1TVC5TMkNfV2luZ29NeVJlY29yZCk7XG4gICAgICAgIENtZFJlc1N0cnVjdC5yZWdpc3RlcihNU1QuT3V0ZXJPcGNvZGVfTWFwLk0yQ19UcmFuc2Zlck1hcF9SZXMsIE1TVC5NMkNfVHJhbnNmZXJNYXBfUmVzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NMkNfR2V0V2luZ29JbmZvX1JlcyhkYXRhOiBNU1QuSU0yQ19HZXRXaW5nb0luZm9fUmVzKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2luZ29EYXRhOiBXaW5nb0RhdGEgPSBHLkRhdGFNZ3IuZ2V0KFdpbmdvRGF0YSk7XG5cbiAgICAgICAgd2luZ29EYXRhLmxvdHRlcnlNYXAuZ2V0KE1TVC5XaW5nb01vZGUuQ2VwYXRQbHVzKS5OZXh0VGltZXN0YW1wID0gTnVtYmVyKGRhdGEuQ2VwYXRQbHVzVGltZXN0YW1wKTtcbiAgICAgICAgd2luZ29EYXRhLmxvdHRlcnlNYXAuZ2V0KE1TVC5XaW5nb01vZGUuQ2VwYXQpLk5leHRUaW1lc3RhbXAgPSBOdW1iZXIoZGF0YS5DZXBhdFRpbWVzdGFtcCk7XG4gICAgICAgIHdpbmdvRGF0YS5sb3R0ZXJ5TWFwLmdldChNU1QuV2luZ29Nb2RlLlN0YW5kYXIpLk5leHRUaW1lc3RhbXAgPSBOdW1iZXIoZGF0YS5TdGFuZGFyVGltZXN0YW1wKTtcblxuICAgICAgICB3aW5nb0RhdGEuY29zdCA9IGRhdGEuQ29zdDtcbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9NMkNfR2V0V2luZ29JbmZvX1Jlc1wiLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NMkNfR2V0V2luZ29IaXN0b3J5X1JlcyhkYXRhOiBNU1QuSU0yQ19HZXRXaW5nb0hpc3RvcnlfUmVzKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLkVycm9yICE9PSAwKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0VyclRpcChkYXRhLkVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2luZ29EYXRhOiBXaW5nb0RhdGEgPSBHLkRhdGFNZ3IuZ2V0KFdpbmdvRGF0YSk7XG4gICAgICAgIGlmICh3aW5nb0RhdGEuaXNGaXJzdCkge1xuICAgICAgICAgICAgd2luZ29EYXRhLmN1cnJNb2RlID0gTVNULldpbmdvTW9kZS5DZXBhdFBsdXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5nb0RhdGEuY3Vyck1vZGUgPSBkYXRhLk1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgd2luZ29EYXRhLmN1cnJJc3N1ZSA9IE51bWJlcihkYXRhLkN1cnJJc3N1ZSk7XG4gICAgICAgIHdpbmdvRGF0YS5oaXN0b3J5TG90dGVyeU1hcC5zZXQoZGF0YS5Nb2RlLCBkYXRhLkhpc3RvcnlJbmZvLnJldmVyc2UoKSk7XG5cbiAgICAgICAgaWYgKCF3aW5nb0RhdGEuaXNGaXJzdCB8fCBkYXRhLk1vZGUgPT09IHdpbmdvRGF0YS5jdXJyTW9kZSkge1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9NMkNfR2V0V2luZ29IaXN0b3J5X1Jlc1wiLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk0yQ19XaW5nb0xvdHRlcnlfTWVzKGRhdGE6IE1TVC5JTTJDX1dpbmdvTG90dGVyeV9NZXMpOiB2b2lkIHtcbiAgICAgICAgbGV0IHdpbmdvRGF0YTogV2luZ29EYXRhID0gRy5EYXRhTWdyLmdldChXaW5nb0RhdGEpO1xuXG4gICAgICAgIGlmICh3aW5nb0RhdGEuY3Vyck1vZGUgPT09IGRhdGEuTW9kZSkge1xuICAgICAgICAgICAgd2luZ29EYXRhLmN1cnJJc3N1ZSA9IE51bWJlcihkYXRhLk5leHRJc3N1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5nb0RhdGEuaGlzdG9yeUxvdHRlcnlNYXAuZ2V0KGRhdGEuTW9kZSkucHVzaChkYXRhLkxvdHRlcnlJbmZvKTtcbiAgICAgICAgd2luZ29EYXRhLmxvdHRlcnlNYXAuc2V0KGRhdGEuTW9kZSwgZGF0YSk7XG4gICAgICAgIGRpc3BhdGNoKFwiRXZlbnRfTTJDX1dpbmdvTG90dGVyeV9NZXNcIiwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTTJDX1dpbmdvQmV0X1JlcyhkYXRhOiBNU1QuSU0yQ19XaW5nb0JldF9SZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRhdGEuRXJyb3IgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoKFwiRXZlbnRfTTJDX1dpbmdvQmV0X1Jlc1wiLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TMkNfV2luZ29NeVJlY29yZChkYXRhOiBNU1QuSVMyQ19XaW5nb015UmVjb3JkKTogdm9pZCB7XG4gICAgICAgIGlmIChkYXRhLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RXJyVGlwKGRhdGEuY29kZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsZXQgd2luZ29EYXRhOiBXaW5nb0RhdGEgPSBHLkRhdGFNZ3IuZ2V0KFdpbmdvRGF0YSk7XG4gICAgICAgIC8vIGxldCBteVJlY29yZExpc3Q6IE1TVC5JTXlSZWNvcmRJbmZvW10gPSB3aW5nb0RhdGEubXlSZWNvcmRNYXAuZ2V0KHdpbmdvRGF0YS5jdXJyTW9kZSk7XG4gICAgICAgIC8vIGlmIChteVJlY29yZExpc3QpIHtcblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9TMkNfV2luZ29NeVJlY29yZFwiLCBkYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NMkNfVHJhbnNmZXJNYXBfUmVzKGRhdGE6IE1TVC5JTTJDX1RyYW5zZmVyTWFwX1Jlcykge1xuICAgICAgICBsZXQgdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICAgICAgdXNlckRhdGEuaW5HYW1lID0gZGF0YS5Sb29tTmFtZTtcbiAgICAgICAgZGlzcGF0Y2goXCJFdmVudF9NMkNfVHJhbnNmZXJNYXBfUmVzXCIsIGRhdGEpO1xuICAgIH1cblxufVxuXG5NYW5hZ2VyLm5ldE1hbmFnZXIucHVzaChXaW5nb05ldENvbnRyb2xsZXIpO1xuIl19