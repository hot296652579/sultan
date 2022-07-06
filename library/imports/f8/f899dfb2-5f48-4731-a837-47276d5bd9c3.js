"use strict";
cc._RF.push(module, 'f899d+yX0hHMag3RydtW9nD', 'RouletteData');
// games/roulette/script/data/RouletteData.ts

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
const BaseData_1 = __importDefault(require("../../../../script/base/BaseData"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const ClassDecorator_1 = __importDefault(require("../../../../script/framework/decorator/ClassDecorator"));
let RouletteData = class RouletteData extends BaseData_1.default {
    constructor() {
        super();
        this._appData = null;
        /**自己下注的记录*/
        this.gameRecordList = null;
        /**当前局下注信息*/
        this.onRoomBets = null;
        this.Status = null;
        this.stopBetTimeStamp = null;
        this.EndTimeStamp = null;
        /**三个色下注总金额*/
        this.onRoomTotalBet = null;
        this.curRound = null;
        this.roundHash = null;
        /**开始滚动时间戳*/
        this.StartTimeStamp = null;
        /**结束滚动时间戳*/
        this.StopTimeStamp = null;
        this.endIndex = null;
        this.hashSalt = null;
        this.randomNum = null;
        // public nextRound: number = null;
        this.betBigRankInfo = null;
        this._appData = G.DataMgr.get(AppData_1.default);
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
    destroy() {
    }
};
RouletteData = __decorate([
    ClassDecorator_1.default.classname
], RouletteData);
exports.default = RouletteData;

cc._RF.pop();