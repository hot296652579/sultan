import BaseData from "../../../../script/base/BaseData";
import TypeUtils from "../../../../script/common/utils/TypeUtils";
import AppData from "../../../../script/data/AppData";
import ClassDecorator from "../../../../script/framework/decorator/ClassDecorator";
import { MST } from "../../../../script/framework/external/protoc";
import { CrashInterface } from "../interface/CrashInterface";
import CrashUtils from "../utils/CrashUtils";

@ClassDecorator.classname
export default class CrashData extends BaseData {

    private _appData: AppData = null;

    public betList: CrashInterface.BetPlayer[] = null;
    public status: MST.CrashStatus = null;
    public startGameTimestamp: number = null;
    public startBetTimestamp: number = null;
    public stopBetTimestamp: number = null;
    public bombTimestamp: number = null;
    public rateRecordList: number[] = null;
    public betTotalGold: number = null;
    public myBetList: CrashInterface.BetPlayer[] = null;
    public betTotalCount: number = null;
    public autoBetData: MST.ICrashAutoBetInfo = null;
    public hashInfo: CrashInterface.Hash = null;
    // 本轮爆炸倍数
    public roundBombRate: number = null;
    // 下注玩家 Map<下注玩家节点下标, 下注玩家数据>
    public betPlayerMap: Map<number, CrashInterface.BetPlayer> = null;
    // 总历史记录数据
    public totalRecordData: MST.IM2C_CrashHashRecord_Res = null;

    constructor() {
        super();

        this._appData = G.DataMgr.get(AppData);
        this.betList = [];
        this.rateRecordList = []
        this.myBetList = [];
        this.hashInfo = {
            serverSeed: "",
            gameNo: 0,
            publicSeed: "",
            roundHash: "",
            acak: 0,
            point: 0,
        };
        this.betPlayerMap = new Map();
    }

    public destroy(): void {

    }

    public initNext(): void {
        this.betList.length = 0;
        this.status = null;
        this.startGameTimestamp = null;
        this.startBetTimestamp = null;
        this.stopBetTimestamp = null;
        this.betTotalGold = null;
        this.myBetList.length = 0;
        this.betTotalCount = null;
    }

    public getRate(): number {
        if (TypeUtils.isNull(this.startGameTimestamp)) {
            return 0;
        }

        let runTime: number = (this._appData.getServerTimestamp() - this.startGameTimestamp);
        return CrashUtils.getRateByRunTime(runTime);
    }

}