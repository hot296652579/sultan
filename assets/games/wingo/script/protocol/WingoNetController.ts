import { Manager } from "../../../../script/common/manager/Manager";
import { CmdResStruct } from "../../../../script/common/net/CmdResStruct";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import UserData from "../../../../script/data/UserData";
import Controller from "../../../../script/framework/controller/Controller";
import { injectService, makeKey } from "../../../../script/framework/decorator/Decorators";
import { MST } from "../../../../script/framework/external/protoc";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import WingoData from "../data/WingoData";
import { WingoInterface } from "../interface/WingoInterface";

/**
 * @description 逻辑流程控制器  
 */
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class WingoNetController extends Controller<LobbyService> {

    protected bindingEvents() {
        super.bindingEvents()
        this.registerRes();
        this.registerEvent(MST.OuterOpcode_WingoGame.M2C_GetWingoInfo_Res, this.onM2C_GetWingoInfo_Res);
        this.registerEvent(MST.OuterOpcode_WingoGame.M2C_GetWingoHistory_Res, this.onM2C_GetWingoHistory_Res);
        this.registerEvent(MST.OuterOpcode_WingoGame.M2C_WingoLottery_Mes, this.onM2C_WingoLottery_Mes);
        this.registerEvent(MST.OuterOpcode_WingoGame.M2C_WingoBet_Res, this.onM2C_WingoBet_Res);
        this.registerEvent(MST.OuterOpcode_WingoGame.S2C_WingoMyRecord, this.onS2C_WingoMyRecord);
        this.registerEvent(MST.OuterOpcode_Map.M2C_TransferMap_Res, this.onM2C_TransferMap_Res);
    }

    private registerRes() {
        CmdResStruct.register(MST.OuterOpcode_WingoGame.M2C_GetWingoInfo_Res, MST.M2C_GetWingoInfo_Res);
        CmdResStruct.register(MST.OuterOpcode_WingoGame.M2C_GetWingoHistory_Res, MST.M2C_GetWingoHistory_Res);
        CmdResStruct.register(MST.OuterOpcode_WingoGame.M2C_WingoLottery_Mes, MST.M2C_WingoLottery_Mes);
        CmdResStruct.register(MST.OuterOpcode_WingoGame.M2C_WingoBet_Res, MST.M2C_WingoBet_Res);
        CmdResStruct.register(MST.OuterOpcode_WingoGame.S2C_WingoMyRecord, MST.S2C_WingoMyRecord);
        CmdResStruct.register(MST.OuterOpcode_Map.M2C_TransferMap_Res, MST.M2C_TransferMap_Res);
    }

    public onM2C_GetWingoInfo_Res(data: MST.IM2C_GetWingoInfo_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }
        let wingoData: WingoData = G.DataMgr.get(WingoData);

        wingoData.lotteryMap.get(MST.WingoMode.CepatPlus).NextTimestamp = Number(data.CepatPlusTimestamp);
        wingoData.lotteryMap.get(MST.WingoMode.Cepat).NextTimestamp = Number(data.CepatTimestamp);
        wingoData.lotteryMap.get(MST.WingoMode.Standar).NextTimestamp = Number(data.StandarTimestamp);

        wingoData.cost = data.Cost;
        dispatch("Event_M2C_GetWingoInfo_Res", data);
    }

    public onM2C_GetWingoHistory_Res(data: MST.IM2C_GetWingoHistory_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }
        let wingoData: WingoData = G.DataMgr.get(WingoData);
        if (wingoData.isFirst) {
            wingoData.currMode = MST.WingoMode.CepatPlus;
        } else {
            wingoData.currMode = data.Mode;
        }
        wingoData.currIssue = Number(data.CurrIssue);
        wingoData.historyLotteryMap.set(data.Mode, data.HistoryInfo.reverse());

        if (!wingoData.isFirst || data.Mode === wingoData.currMode) {
            dispatch("Event_M2C_GetWingoHistory_Res", data);
        }
    }

    public onM2C_WingoLottery_Mes(data: MST.IM2C_WingoLottery_Mes): void {
        let wingoData: WingoData = G.DataMgr.get(WingoData);

        if (wingoData.currMode === data.Mode) {
            wingoData.currIssue = Number(data.NextIssue);
        }

        wingoData.historyLotteryMap.get(data.Mode).push(data.LotteryInfo);
        wingoData.lotteryMap.set(data.Mode, data);
        dispatch("Event_M2C_WingoLottery_Mes", data);
    }

    public onM2C_WingoBet_Res(data: MST.IM2C_WingoBet_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }
        dispatch("Event_M2C_WingoBet_Res", data);
    }

    public onS2C_WingoMyRecord(data: MST.IS2C_WingoMyRecord): void {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        // let wingoData: WingoData = G.DataMgr.get(WingoData);
        // let myRecordList: MST.IMyRecordInfo[] = wingoData.myRecordMap.get(wingoData.currMode);
        // if (myRecordList) {

        // }

        dispatch("Event_S2C_WingoMyRecord", data);
    }

    public onM2C_TransferMap_Res(data: MST.IM2C_TransferMap_Res) {
        let userData = G.DataMgr.get(UserData);
        userData.inGame = data.RoomName;
        dispatch("Event_M2C_TransferMap_Res", data);
    }

}

Manager.netManager.push(WingoNetController);
