
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/TournamentData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ub3VybmFtZW50RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFZLG9CQUlYO0FBSkQsV0FBWSxvQkFBb0I7SUFDNUIsdUVBQVksQ0FBQTtJQUNaLG1HQUFzQixDQUFBO0lBQ3RCLHlFQUFTLENBQUE7QUFDYixDQUFDLEVBSlcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFJL0I7QUFDRCxNQUFxQixjQUFjO0lBQW5DO1FBR0ksT0FBTztRQUNDLGNBQVMsR0FBYSxJQUFJLENBQUE7UUFDbEMsb0JBQW9CO1FBQ2IsZUFBVSxHQUFXLElBQUksQ0FBQztRQUNqQyxhQUFhO1FBQ04scUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBRWhDLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUVsQyxlQUFVLEdBQVcsSUFBSSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFFMUIsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLElBQUksQ0FBQztRQUUxQixvQkFBZSxHQUFVLElBQUksQ0FBQztRQUNyQyxhQUFhO1FBQ04seUJBQW9CLEdBQVksS0FBSyxDQUFDO0lBaUNqRCxDQUFDO0lBOUJVLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFpQjtRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBO0lBQ3pCLENBQUM7SUFNTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFDdEMsQ0FBQzs7QUFyREwsaUNBdURDO0FBdERrQix1QkFBUSxHQUFtQixJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuXG5cbmV4cG9ydCBlbnVtIENyZWF0ZVRvdXJuYW1lbnRTdGVwIHtcbiAgICBTZXRSdWxlcyA9IDEsXG4gICAgQ3JlYXRlQmFzaWNJbmZvcm1hdGlvbixcbiAgICBTZXRSZXdhcmRcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvdXJuYW1lbnREYXRhIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVG91cm5hbWVudERhdGEgPSBudWxsO1xuXG4gICAgLy/lvIDmlL7nmoTmuLjmiI9cbiAgICBwcml2YXRlIG1fZ2FtZUlkczogbnVtYmVyW10gPSBudWxsXG4gICAgLy/lvZPliY3ngrnlh7vnmoTotZvkuosg546p5a626Ieq5bex5piv5ZCm5bey57uP5oql5ZCNXG4gICAgcHVibGljIHNpZ25TdGF0dXM6IG51bWJlciA9IG51bGw7XG4gICAgLy/lvZPliY3ngrnlh7vnmoTotZvkuosg54q25oCBIFxuICAgIHB1YmxpYyB0b3VybmFtZW50U3RhdHVzOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHRvdXJuYW1lbnRJRDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgaXNUb3VybmFtZW50R2FtZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIHRvU2VydmVySWQ6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIHNlcnZlclR5cGU6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgZmx1c2hJdG1lSUQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc2VydmljZUZlZTogbnVtYmVyID0gbnVsbDsgIFxuXG4gICAgcHVibGljIGlzQ291bnREb3duRGF0ZTpudW1iZXIgPSBudWxsO1xuICAgIC8v5piv5ZCm5Zyo5aSn5Y6F5omT5byAIOmUpuagh+i1m1xuICAgIHB1YmxpYyBpc09wZW5Ub3VybmFtZW50VmlldzogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFRvdXJuYW1lbnREYXRhIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgVG91cm5hbWVudERhdGEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBzZXQgZ2FtZUlkcyhnYW1lSWRzOiBudW1iZXJbXSkge1xuICAgICAgICB0aGlzLm1fZ2FtZUlkcyA9IGdhbWVJZHM7XG4gICAgfVxuXG4gICAgZ2V0IGdhbWVJZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1fZ2FtZUlkc1xuICAgIH1cblxuXG5cblxuXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICB0aGlzLm1fZ2FtZUlkcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc2lnblN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMudG91cm5hbWVudFN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMudG91cm5hbWVudElEID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc1RvdXJuYW1lbnRHYW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9TZXJ2ZXJJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VydmVyVHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNPcGVuVG91cm5hbWVudFZpZXcgPSBmYWxzZTtcbiAgICB9XG5cbn0iXX0=