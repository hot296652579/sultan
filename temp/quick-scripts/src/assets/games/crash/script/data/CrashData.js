"use strict";
cc._RF.push(module, '6addcRJontHRL9HWgPs4l8V', 'CrashData');
// games/crash/script/data/CrashData.ts

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
const TypeUtils_1 = __importDefault(require("../../../../script/common/utils/TypeUtils"));
const AppData_1 = __importDefault(require("../../../../script/data/AppData"));
const ClassDecorator_1 = __importDefault(require("../../../../script/framework/decorator/ClassDecorator"));
const CrashUtils_1 = __importDefault(require("../utils/CrashUtils"));
let CrashData = class CrashData extends BaseData_1.default {
    constructor() {
        super();
        this._appData = null;
        this.betList = null;
        this.status = null;
        this.startGameTimestamp = null;
        this.startBetTimestamp = null;
        this.stopBetTimestamp = null;
        this.bombTimestamp = null;
        this.rateRecordList = null;
        this.betTotalGold = null;
        this.myBetList = null;
        this.betTotalCount = null;
        this.autoBetData = null;
        this.hashInfo = null;
        // 本轮爆炸倍数
        this.roundBombRate = null;
        // 下注玩家 Map<下注玩家节点下标, 下注玩家数据>
        this.betPlayerMap = null;
        // 总历史记录数据
        this.totalRecordData = null;
        this._appData = G.DataMgr.get(AppData_1.default);
        this.betList = [];
        this.rateRecordList = [];
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
    destroy() {
    }
    initNext() {
        this.betList.length = 0;
        this.status = null;
        this.startGameTimestamp = null;
        this.startBetTimestamp = null;
        this.stopBetTimestamp = null;
        this.betTotalGold = null;
        this.myBetList.length = 0;
        this.betTotalCount = null;
    }
    getRate() {
        if (TypeUtils_1.default.isNull(this.startGameTimestamp)) {
            return 0;
        }
        let runTime = (this._appData.getServerTimestamp() - this.startGameTimestamp);
        return CrashUtils_1.default.getRateByRunTime(runTime);
    }
};
CrashData = __decorate([
    ClassDecorator_1.default.classname
], CrashData);
exports.default = CrashData;

cc._RF.pop();