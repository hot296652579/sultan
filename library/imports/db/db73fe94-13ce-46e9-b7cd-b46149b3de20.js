"use strict";
cc._RF.push(module, 'db73f6UE85G6bfNtGFJs94g', 'TournamentData');
// script/tournament/TournamentData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTournamentStep = void 0;
var CreateTournamentStep;
(function (CreateTournamentStep) {
    CreateTournamentStep[CreateTournamentStep["SetRules"] = 1] = "SetRules";
    CreateTournamentStep[CreateTournamentStep["CreateBasicInformation"] = 2] = "CreateBasicInformation";
    CreateTournamentStep[CreateTournamentStep["SetReward"] = 3] = "SetReward";
})(CreateTournamentStep = exports.CreateTournamentStep || (exports.CreateTournamentStep = {}));
class TournamentData {
    constructor() {
        //开放的游戏
        this.m_gameIds = null;
        //当前点击的赛事 玩家自己是否已经报名
        this.signStatus = null;
        //当前点击的赛事 状态 
        this.tournamentStatus = null;
        this.tournamentID = null;
        this.isTournamentGame = false;
        this.toServerId = null;
        this.serverType = null;
        this.flushItmeID = null;
        this.serviceFee = null;
        this.isCountDownDate = null;
        //是否在大厅打开 锦标赛
        this.isOpenTournamentView = false;
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new TournamentData();
        }
        return this.instance;
    }
    set gameIds(gameIds) {
        this.m_gameIds = gameIds;
    }
    get gameIds() {
        return this.m_gameIds;
    }
    clear() {
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
exports.default = TournamentData;
TournamentData.instance = null;

cc._RF.pop();