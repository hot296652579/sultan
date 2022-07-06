import { Manager } from "../../../../script/common/manager/Manager";
import { CmdResStruct } from "../../../../script/common/net/CmdResStruct";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import AppData from "../../../../script/data/AppData";
import HallData from "../../../../script/data/HallData";
import UserData from "../../../../script/data/UserData";
import Controller from "../../../../script/framework/controller/Controller";
import { injectService, makeKey } from "../../../../script/framework/decorator/Decorators";
import { MST } from "../../../../script/framework/external/protoc";
import CrashData from "../data/CrashData";
import { CrashDefine } from "../define/CrashDefine";
import { CrashInterface } from "../interface/CrashInterface";

/**
 * @description 逻辑流程控制器  
 */
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashNetController extends Controller<LobbyService> {

    protected bindingEvents() {
        super.bindingEvents();
        this.registerRes();
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_GetCrashInfo_Res, this.onM2C_GetCrashInfo_Res);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashStart_mes, this.onM2C_CrashStart_mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_MyCrashBet_Res, this.onM2C_MyCrashBet_Res);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashBet_Mes, this.onM2C_CrashBet_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashStop_Mes, this.onM2C_CrashStop_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashStartBet_Mes, this.onM2C_CrashStartBet_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashEscape_Mes, this.onM2C_CrashEscape_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashStopBet_Mes, this.onM2C_CrashStopBet_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Res, this.onM2C_CrashCancelAutoBet_Res);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Mes, this.onM2C_CrashCancelAutoBet_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashHash_Mes, this.onM2C_CrashHash_Mes);
        this.registerEvent(MST.OuterOpcode_CrashGame.M2C_CrashHashRecord_Res, this.onM2C_CrashHashRecord_Res);
        this.registerEvent(MST.OuterOpcode_CrashGame.S2C_CrashMyRecord, this.onS2C_CrashMyRecord);
        this.registerEvent(MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);

    }

    private registerRes() {
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_GetCrashInfo_Res, MST.M2C_GetCrashInfo_Res);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashStart_mes, MST.M2C_CrashStart_mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_MyCrashBet_Res, MST.M2C_MyCrashBet_Res);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashBet_Mes, MST.M2C_CrashBet_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashStop_Mes, MST.M2C_CrashStop_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashStartBet_Mes, MST.M2C_CrashStartBet_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashEscape_Mes, MST.M2C_CrashEscape_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashStopBet_Mes, MST.M2C_CrashStopBet_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Res, MST.M2C_CrashCancelAutoBet_Res);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashCancelAutoBet_Mes, MST.M2C_CrashCancelAutoBet_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashHash_Mes, MST.M2C_CrashHash_Mes);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.M2C_CrashHashRecord_Res, MST.M2C_CrashHashRecord_Res);
        CmdResStruct.register(MST.OuterOpcode_CrashGame.S2C_CrashMyRecord, MST.S2C_CrashMyRecord);
        CmdResStruct.register(MST.OuterOpcode_Map.M2C_TransferMap_Res, MST.M2C_TransferMap_Res);

    }

    public onM2C_GetCrashInfo_Res(data: MST.IM2C_GetCrashInfo_Res) {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.betList.length = 0;
        crashData.myBetList.length = 0;
        crashData.rateRecordList.length = 0;

        for (let v of data.Bets) {
            let betPlayer: CrashInterface.BetPlayer = {
                betInfo: v,
                isEscape: crashData.getRate() >= v.Multiple,
            }
            crashData.betList.push(betPlayer);
        }
        for (let v of data.MyBet) {
            let betPlayer: CrashInterface.BetPlayer = {
                betInfo: v,
                isEscape: crashData.getRate() >= v.Multiple,
            }
            crashData.myBetList.push(betPlayer);
        }

        crashData.betPlayerMap.clear();
        let index: number = 0;
        for (let i: number = crashData.myBetList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.myBetList[i]);
        }
        for (let i: number = crashData.betList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.betList[i]);
            if (crashData.betPlayerMap.size >= CrashDefine.BET_LIST_COUNT) {
                break;
            }
        }

        crashData.status = data.Status;
        switch (crashData.status) {
            case MST.CrashStatus.StartBet:
                crashData.stopBetTimestamp = Number(data.StartTimeStamp);
                break;
            case MST.CrashStatus.GameBegin:
                crashData.startGameTimestamp = Number(data.StartTimeStamp);
                break;
            case MST.CrashStatus.GameOver:
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

    public onM2C_CrashStart_mes(data: MST.IM2C_CrashStart_mes) {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.status = MST.CrashStatus.GameBegin;
        crashData.startGameTimestamp = Number(data.StartTimeStamp);
        if (data.Multi) {
            crashData.roundBombRate = Number(data.Multi);
        }
        dispatch("Event_M2C_CrashStart_mes", data);
    }

    public onM2C_MyCrashBet_Res(data: MST.IM2C_MyCrashBet_Res) {
        dispatch("Event_M2C_MyCrashBet_Res", data);
    }

    public onM2C_CrashBet_Mes(data: MST.IM2C_CrashBet_Mes) {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        let userData: UserData = G.DataMgr.get(UserData);
        crashData.betTotalGold = Number(data.TotalGold);
        crashData.betTotalCount = Number(data.TotalPlayer);
        for (let v of data.Bets) {
            let betPlayer: CrashInterface.BetPlayer = {
                betInfo: v,
                isEscape: false,
            }
            if (v.player.UnitId === userData.id) {
                crashData.myBetList.push(betPlayer);
            } else {
                crashData.betList.push(betPlayer);
            }
        }

        crashData.betPlayerMap.clear();
        let index: number = 0;
        for (let i: number = crashData.myBetList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.myBetList[i]);
        }
        for (let i: number = crashData.betList.length - 1; i >= 0; --i) {
            crashData.betPlayerMap.set(index++, crashData.betList[i]);
            if (crashData.betPlayerMap.size >= CrashDefine.BET_LIST_COUNT) {
                break;
            }
        }

        dispatch("Event_M2C_CrashBet_Mes", data);
    }

    public onM2C_CrashStop_Mes(data: MST.IM2C_CrashStop_Mes) {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.status = MST.CrashStatus.GameOver;
        crashData.rateRecordList.push(Number(data.Multiples));
        crashData.bombTimestamp = Number(data.ExplosionTimeStamp);
        crashData.hashInfo.roundHash = data.HashResult;
        crashData.hashInfo.acak = data.Acak;
        crashData.hashInfo.point = Number(data.Multiples);
        dispatch("Event_M2C_CrashStop_Mes", data);
    }

    public onM2C_CrashStartBet_Mes(data: MST.IM2C_CrashStartBet_Mes) {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        let appData: AppData = G.DataMgr.get(AppData);
        crashData.initNext();
        crashData.status = MST.CrashStatus.StartBet;
        crashData.startBetTimestamp = appData.getServerTimestamp();
        crashData.stopBetTimestamp = Number(data.StopBetTimeStamp);
        crashData.hashInfo.gameNo = data.GameNo;
        crashData.roundBombRate = null;
        dispatch("Event_M2C_CrashStartBet_Mes", data);
    }

    public onM2C_CrashEscape_Mes(data: MST.IM2C_CrashEscape_Mes) {
        dispatch("Event_M2C_CrashEscape_Mes", data);
    }

    public onM2C_CrashStopBet_Mes(data: MST.IM2C_CrashStopBet_Mes) {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.status = MST.CrashStatus.StopBet;
        dispatch("Event_M2C_CrashStopBet_Mes", data);
    }

    public onM2C_CrashCancelAutoBet_Res(data: MST.IM2C_CrashCancelAutoBet_Res): void {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.autoBetData = null;
        dispatch("Event_M2C_CrashCancelAutoBet_Res", data);
    }

    public onM2C_CrashCancelAutoBet_Mes(data: MST.IM2C_CrashCancelAutoBet_Mes): void {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.autoBetData = null;
        dispatch("Event_M2C_CrashCancelAutoBet_Mes", data);

    }

    public onM2C_CrashHash_Mes(data: MST.IM2C_CrashHash_Mes): void {
        let crashData: CrashData = G.DataMgr.get(CrashData);

        crashData.hashInfo.serverSeed = data.SeedInfo.ServerSeed;
        crashData.hashInfo.serverSeedHash = data.SeedInfo.ServerSeedHash;
        crashData.hashInfo.publicSeed = data.SeedInfo.PublicSeed;

        dispatch("Event_M2C_CrashHash_Mes", data);

    }

    public onM2C_CrashHashRecord_Res(data: MST.IM2C_CrashHashRecord_Res): void {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        crashData.totalRecordData = data;
        dispatch("Event_M2C_CrashHashRecord_Res", data);
    }

    public onS2C_CrashMyRecord(data: MST.IS2C_CrashMyRecord): void {
        dispatch("Event_S2C_CrashMyRecord", data);
    }

    public onM2C_TransferMap_Res(data: MST.IM2C_TransferMap_Res) {
        let userData = G.DataMgr.get(UserData);
        userData.inGame = data.RoomName;
        dispatch("Event_M2C_TransferMap_Res", data);
    }

}

Manager.netManager.push(CrashNetController);
