import { com } from "../framework/external/protoc";


export enum CreateTournamentStep {
    SetRules = 1,
    CreateBasicInformation,
    SetReward
}
export default class TournamentData {
    private static instance: TournamentData = null;

    //开放的游戏
    private m_gameIds: number[] = null
    //当前点击的赛事 玩家自己是否已经报名
    public signStatus: number = null;
    //当前点击的赛事 状态 
    public tournamentStatus: number = null;

    public tournamentID: number = null;
    public isTournamentGame: boolean = false;

    public toServerId: number = null;
    public serverType: number = null;

    public flushItmeID: number = null;

    public serviceFee: number = null;  

    public isCountDownDate:number = null;
    //是否在大厅打开 锦标赛
    public isOpenTournamentView: boolean = false;


    public static getInstance(): TournamentData {
        if (this.instance === null) {
            this.instance = new TournamentData();
        }
        return this.instance;
    }

    set gameIds(gameIds: number[]) {
        this.m_gameIds = gameIds;
    }

    get gameIds() {
        return this.m_gameIds
    }





    public clear() {
        this.m_gameIds = null;
        this.signStatus = null;
        this.tournamentStatus = null;
        this.tournamentID = null;
        this.isTournamentGame = false;
        this.toServerId = null;
        this.serverType = null;
        this.isOpenTournamentView = false;
    }

}