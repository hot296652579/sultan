"use strict";
cc._RF.push(module, 'b844aswRTpBYaGNjHprBLcx', 'WingoData');
// games/wingo/script/data/WingoData.ts

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
const ClassDecorator_1 = __importDefault(require("../../../../script/framework/decorator/ClassDecorator"));
const protoc_1 = require("../../../../script/framework/external/protoc");
// 最大历史记录
const MAX_HISTORY_COUNT = 100;
// 最大数
const MAX_NUM = 10;
let WingoData = class WingoData extends BaseData_1.default {
    constructor() {
        super();
        // 手续费率百分比
        this.cost = null;
        // 当前模式
        this.currMode = null;
        // 当前待开奖期号
        this.currIssue = null;
        // 历史开奖记录
        this.historyLotteryMap = null;
        // 开奖信息 Map
        this.lotteryMap = null;
        // 是否首次进入
        this.isFirst = true;
        // 是否正在播放开奖动画
        this.isPlayingLotteryAnim = false;
        // 个人下注记录
        this.myRecordMap = null;
        // 当前处于下拉功能
        this.currPullFunc = null;
        this.historyLotteryMap = new Map();
        this.lotteryMap = new Map();
        let wingoModeList = Object.values(protoc_1.MST.WingoMode);
        for (let k of wingoModeList) {
            let mode = Number(k);
            let data = {
                Mode: mode,
                LotteryInfo: null,
                NextTimestamp: 0,
                NextIssue: null,
            };
            this.lotteryMap.set(mode, data);
        }
    }
    destroy() {
    }
    initNext() {
    }
    /**
     * 获取最近的历史记录
     * @returns {MST.IWingoHistoryInfo[]}
     */
    getLatelyList() {
        let historyList = null;
        let historyLotteryList = this.historyLotteryMap.get(this.currMode);
        let historyLen = historyLotteryList.length;
        if (historyLen >= MAX_HISTORY_COUNT) {
            historyList = historyLotteryList.slice(-MAX_HISTORY_COUNT);
        }
        else {
            historyList = historyLotteryList.slice(-historyLen);
        }
        return historyList.reverse();
    }
    /**
     * 获取初始填满的统计列表
     * @returns {number[]}
     */
    getFillStatList(count) {
        let statList = [];
        for (let i = 0; i < MAX_NUM; ++i) {
            statList[i] = count;
        }
        return statList;
    }
    /**
     * 距离上次出现 到现在 有多少局没有出现
     * @return {number[]}
     */
    getMissing() {
        let list = this.getFillStatList(0);
        let historyList = this.getLatelyList();
        for (let i = 0; i < MAX_NUM; ++i) {
            let missingCount = 0;
            for (let v of historyList) {
                if (v.Num !== i) {
                    list[i] = missingCount;
                    continue;
                }
                ++missingCount;
            }
        }
        return list;
    }
    /**
     * 100 局内平均消失多少局出现一次
     */
    getAvgMissing() {
        let historyList = this.getLatelyList();
        let historyLen = historyList.length;
        let list = this.getFillStatList(historyLen);
        let frequencyList = this.getFrequency();
        for (let i = 0; i < MAX_NUM; ++i) {
            let frequencyCount = frequencyList[i];
            let missingCount = (historyLen - frequencyCount);
            list[i] = Math.floor(missingCount / (frequencyCount + 1));
        }
        return list;
    }
    /**
     * 100 局以内 出现的次数
     */
    getFrequency() {
        let list = this.getFillStatList(0);
        let historyList = this.getLatelyList();
        for (let v of historyList) {
            let count = list[v.Num];
            if (TypeUtils_1.default.isNull(count)) {
                count = 0;
            }
            list[v.Num] = ++count;
        }
        return list;
    }
    /**
     * 100 局以内 最大连续出现次数
     */
    getMaxContinued() {
        let list = this.getFillStatList(0);
        let historyList = this.getLatelyList();
        let continuedCount = 1;
        let continuedNum = null;
        for (let v of historyList) {
            if (v.Num === continuedNum) {
                ++continuedCount;
            }
            else {
                if (continuedNum !== null) {
                    let count = list[continuedNum];
                    if (count < continuedCount) {
                        list[continuedNum] = continuedCount;
                    }
                }
                continuedCount = 1;
            }
            continuedNum = v.Num;
        }
        return list;
    }
};
WingoData = __decorate([
    ClassDecorator_1.default.classname
], WingoData);
exports.default = WingoData;

cc._RF.pop();