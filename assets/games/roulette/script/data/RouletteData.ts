import Long from "long";
import BaseData from "../../../../script/base/BaseData";
import AppData from "../../../../script/data/AppData";
import ClassDecorator from "../../../../script/framework/decorator/ClassDecorator";
import { MST } from "../../../../script/framework/external/protoc";
import { RouletteInterface } from "../interface/RouletteInterface";

@ClassDecorator.classname
export default class RouletteData extends BaseData {

    private _appData: AppData = null;
    /**自己下注的记录*/
    public gameRecordList: number[] = null;
    /**当前局下注信息*/
    public onRoomBets: RouletteInterface.BetPlayer[] = null;
    public Status: MST.RouletteStatus = null;
    public stopBetTimeStamp: number = null;
    public EndTimeStamp: number | Long = null;
    /**三个色下注总金额*/
    public onRoomTotalBet: MST.ITotalBetRecord[] = null;

    public curRound: number = null;
    public roundHash: string = null;

    /**开始滚动时间戳*/
    public StartTimeStamp: number = null;
    /**结束滚动时间戳*/
    public StopTimeStamp: number = null;
    public endIndex: number = null;

    public hashSalt: string = null;
    public randomNum: number = null;
    // public nextRound: number = null;

    public betBigRankInfo: RouletteInterface.BetPlayer[] = null;

    constructor() {
        super();

        this._appData = G.DataMgr.get(AppData);
        this.gameRecordList = [];
        this.onRoomBets = [];
        this.betBigRankInfo = [];
    }

    clearRouletteData() {
        this.onRoomBets = [];
        this.onRoomTotalBet = [
            {
                color: 0,
                chips: 0
            },
            {
                color: 1,
                chips: 0
            },
            {
                color: 2,
                chips: 0
            }
        ];
    }

    public destroy(): void {

    }
}