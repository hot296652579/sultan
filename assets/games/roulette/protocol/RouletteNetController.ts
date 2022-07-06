
import { Manager } from "../../../script/common/manager/Manager";
import { CmdResStruct } from "../../../script/common/net/CmdResStruct";
import { LobbyService } from "../../../script/common/net/LobbyService";
import UserData from "../../../script/data/UserData";
import Controller from "../../../script/framework/controller/Controller";
import { injectService } from "../../../script/framework/decorator/Decorators";
import { MST } from "../../../script/framework/external/protoc";
import PanelHelp from "../../../script/msgbox/PanelHelp";
import RouletteData from "../script/data/RouletteData";
import { RouletteInterface } from "../script/interface/RouletteInterface";

/**
 * @description 逻辑流程控制器  
 */
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteNetController extends Controller<LobbyService> {

    protected bindingEvents() {
        super.bindingEvents()
        this.registerRes();
        this.registerEvent(MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
        this.registerEvent(MST.OuterOpcode_Roulette.M2C_GetRouletteInfo_Res, this.onM2C_GetRouletteInfo_Res);
        this.registerEvent(MST.OuterOpcode_Roulette.M2C_RouletteStartBet_Mes, this.onM2C_RouletteStartBet_Mes);
        this.registerEvent(MST.OuterOpcode_Roulette.M2C_MyRouletteBet_Res, this.onM2C_MyRouletteBet_Res);
        this.registerEvent(MST.OuterOpcode_Roulette.M2C_RouletteStart_mes, this.onM2C_RouletteStart_mes);
        this.registerEvent(MST.OuterOpcode_Roulette.R2C_PaybackPhase_Mes, this.onR2C_PaybackPhase_Mes);
        this.registerEvent(MST.OuterOpcode_Roulette.R2C_Bet_Mes, this.onR2C_Bet_Mes);
        this.registerEvent(MST.OuterOpcode_Roulette.R2C_GetBetRandInfo_Res, this.onR2C_GetBetRandInfo_Res);
        this.registerEvent(MST.OuterOpcode_Roulette.R2C_GetGameRecords_Res, this.onR2C_GetGameRecords_Res);
        this.registerEvent(MST.OuterOpcode_Roulette.R2C_GetBetInfo_Res, this.onR2C_GetBetInfo_Res);
    }

    private registerRes() {
        CmdResStruct.register(MST.OuterOpcode_Map.M2C_TransferMap_Res, MST.M2C_TransferMap_Res);
        CmdResStruct.register(MST.OuterOpcode_Roulette.M2C_GetRouletteInfo_Res, MST.M2C_GetRouletteInfo_Res);
        CmdResStruct.register(MST.OuterOpcode_Roulette.M2C_RouletteStartBet_Mes, MST.M2C_RouletteStartBet_Mes);
        CmdResStruct.register(MST.OuterOpcode_Roulette.M2C_MyRouletteBet_Res, MST.M2C_MyRouletteBet_Res);
        CmdResStruct.register(MST.OuterOpcode_Roulette.M2C_RouletteStart_mes, MST.M2C_RouletteStart_mes);
        CmdResStruct.register(MST.OuterOpcode_Roulette.R2C_PaybackPhase_Mes, MST.R2C_PaybackPhase_Mes);
        CmdResStruct.register(MST.OuterOpcode_Roulette.R2C_Bet_Mes, MST.R2C_Bet_Mes);
        CmdResStruct.register(MST.OuterOpcode_Roulette.R2C_GetBetRandInfo_Res, MST.R2C_GetBetRandInfo_Res);
        CmdResStruct.register(MST.OuterOpcode_Roulette.R2C_GetGameRecords_Res, MST.R2C_GetGameRecords_Res);
        CmdResStruct.register(MST.OuterOpcode_Roulette.R2C_GetBetInfo_Res, MST.R2C_GetBetInfo_Res);
    }

    public onM2C_TransferMap_Res(data: MST.IM2C_TransferMap_Res) {
        let userData = G.DataMgr.get(UserData);
        userData.inGame = data.RoomName;
        dispatch("Event_M2C_TransferMap_Res", data);
    }

    onM2C_GetRouletteInfo_Res(data: MST.IM2C_GetRouletteInfo_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }

        let rouletteData = G.DataMgr.get(RouletteData);
        rouletteData.Status = data.Status;
        rouletteData.EndTimeStamp = data.EndTimeStamp;
        rouletteData.gameRecordList.length = 0;

        rouletteData.onRoomBets = [];
        for (let v of data.Bets) {
            let betPlayer: RouletteInterface.BetPlayer = {
                betInfo: v,
            }
            rouletteData.onRoomBets.push(betPlayer);
        }
        rouletteData.onRoomBets.reverse();

        rouletteData.onRoomTotalBet = data.betRecord;
        rouletteData.gameRecordList = [].concat(data.MultipleRecord);
        rouletteData.curRound = data.round;
        rouletteData.hashSalt = data.hashSalt;
        rouletteData.randomNum = data.randomNo;
        rouletteData.roundHash = data.roundHash;

        if (data.Status == MST.RouletteStatus.BetPhase) {
            rouletteData.stopBetTimeStamp = Number(data.EndTimeStamp);
        }

        dispatch("Event_M2C_GetRouletteInfo_Res");
    }

    onM2C_RouletteStartBet_Mes(data: MST.M2C_RouletteStartBet_Mes) {
        let rouletteData = G.DataMgr.get(RouletteData);
        rouletteData.Status = MST.RouletteStatus.BetPhase;
        rouletteData.stopBetTimeStamp = Number(data.StopBetTimeStamp);
        rouletteData.roundHash = data.randHash;

        rouletteData.clearRouletteData();
        dispatch("Event_M2C_RouletteStartBet_Mes");
    }

    onM2C_MyRouletteBet_Res(data: MST.M2C_MyRouletteBet_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
    }

    onM2C_RouletteStart_mes(data: MST.M2C_RouletteStart_mes) {
        let rouletteData = G.DataMgr.get(RouletteData);
        rouletteData.Status = MST.RouletteStatus.AnimationPhase;

        // rouletteData.StartTimeStamp = Number(data.StartTimeStamp);
        rouletteData.StopTimeStamp = Number(data.StopTimeStamp);
        rouletteData.endIndex = data.endIndex;

        dispatch("Event_M2C_RouletteStart_mes");
    }

    onR2C_PaybackPhase_Mes(data: MST.R2C_PaybackPhase_Mes) {
        let rouletteData = G.DataMgr.get(RouletteData);
        rouletteData.Status = MST.RouletteStatus.PaybackPhase;
        let gameRecordList = rouletteData.gameRecordList;

        rouletteData.curRound = data.nextRound;
        rouletteData.hashSalt = data.hashSalt;
        rouletteData.randomNum = data.randomNum;
        rouletteData.endIndex = data.color;
        gameRecordList.push(Number(data.color));

        dispatch("Event_R2C_PaybackPhase_Mes");
    }

    onR2C_Bet_Mes(data: MST.R2C_Bet_Mes) {
        let rouletteData = G.DataMgr.get(RouletteData);
        if (!data.info)
            return;

        let onRoomTotalBet = rouletteData.onRoomTotalBet;
        let betPlayer: RouletteInterface.BetPlayer = {
            betInfo: data.info
        }
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

    onR2C_GetBetRandInfo_Res(data: MST.R2C_GetBetRandInfo_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }

        let rouletteData = G.DataMgr.get(RouletteData);
        rouletteData.betBigRankInfo = [];
        for (let v of data.records) {
            let betPlayer: RouletteInterface.BetPlayer = {
                betInfo: v,
            }
            rouletteData.betBigRankInfo.push(betPlayer);
        }
        dispatch("Event_R2C_GetBetRandInfo_Res");
    }

    onR2C_GetGameRecords_Res(data: MST.R2C_GetGameRecords_Res) {
        dispatch("Event_R2C_GetGameRecords_Res", data);
    }

    onR2C_GetBetInfo_Res(data: MST.R2C_GetBetInfo_Res) {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return
        }
        dispatch("Event_onR2C_GetBetInfo_Res", data);
    }

}

Manager.netManager.push(RouletteNetController);
