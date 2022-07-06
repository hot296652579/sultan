import BaseData from "../../../../script/base/BaseData";
import TypeUtils from "../../../../script/common/utils/TypeUtils";
import AppData from "../../../../script/data/AppData";
import ClassDecorator from "../../../../script/framework/decorator/ClassDecorator";
import { MST } from "../../../../script/framework/external/protoc";
import { WingoDefine } from "../define/WingoDefine";
import { WingoInterface } from "../interface/WingoInterface";
import WingoUtils from "../utils/WingoUtils";

// 最大历史记录
const MAX_HISTORY_COUNT: number = 100;
// 最大数
const MAX_NUM: number = 10;

@ClassDecorator.classname
export default class WingoData extends BaseData {

    // 手续费率百分比
    public cost: number = null;
    // 当前模式
    public currMode: MST.WingoMode = null;
    // 当前待开奖期号
    public currIssue: number = null;
    // 历史开奖记录
    public historyLotteryMap: Map<MST.WingoMode, MST.IWingoHistoryInfo[]> = null;
    // 开奖信息 Map
    public lotteryMap: Map<MST.WingoMode, MST.IM2C_WingoLottery_Mes> = null;
    // 是否首次进入
    public isFirst: boolean = true;
    // 是否正在播放开奖动画
    public isPlayingLotteryAnim: boolean = false;
    // 个人下注记录
    public myRecordMap: Map<MST.WingoMode, MST.IWingoMyRecordInfo[]> = null;
    // 当前处于下拉功能
    public currPullFunc: WingoDefine.PullBottomFunction = null;

    constructor() {
        super();

        this.historyLotteryMap = new Map();
        this.lotteryMap = new Map();

        let wingoModeList: (string | MST.WingoMode)[] = Object.values(MST.WingoMode);
        for (let k of wingoModeList) {
            let mode: number = Number(k);
            let data: MST.IM2C_WingoLottery_Mes = {
                Mode: mode,
                LotteryInfo: null,
                NextTimestamp: 0,
                NextIssue: null,
            }
            this.lotteryMap.set(mode, data);
        }

    }

    public destroy(): void {

    }

    public initNext(): void {

    }

    /**
     * 获取最近的历史记录
     * @returns {MST.IWingoHistoryInfo[]}
     */
    private getLatelyList(): MST.IWingoHistoryInfo[] {
        let historyList: MST.IWingoHistoryInfo[] = null;
        let historyLotteryList: MST.IWingoHistoryInfo[] = this.historyLotteryMap.get(this.currMode);
        let historyLen: number = historyLotteryList.length;
        if (historyLen >= MAX_HISTORY_COUNT) {
            historyList = historyLotteryList.slice(-MAX_HISTORY_COUNT);
        } else {
            historyList = historyLotteryList.slice(-historyLen);
        }
        return historyList.reverse();
    }

    /**
     * 获取初始填满的统计列表
     * @returns {number[]}
     */
    private getFillStatList(count: number): number[] {
        let statList: number[] = [];
        for (let i: number = 0; i < MAX_NUM; ++i) {
            statList[i] = count;
        }
        return statList;
    }

    /**
     * 距离上次出现 到现在 有多少局没有出现
     * @return {number[]}
     */
    public getMissing(): number[] {
        let list: number[] = this.getFillStatList(0);
        let historyList: MST.IWingoHistoryInfo[] = this.getLatelyList();

        for (let i: number = 0; i < MAX_NUM; ++i) {
            let missingCount: number = 0;
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
    public getAvgMissing(): number[] {
        let historyList: MST.IWingoHistoryInfo[] = this.getLatelyList();
        let historyLen: number = historyList.length;
        let list: number[] = this.getFillStatList(historyLen);
        let frequencyList: number[] = this.getFrequency();

        for (let i: number = 0; i < MAX_NUM; ++i) {
            let frequencyCount: number = frequencyList[i];
            let missingCount: number = (historyLen - frequencyCount);
            list[i] = Math.floor(missingCount / (frequencyCount + 1));
        }

        return list;
    }

    /**
     * 100 局以内 出现的次数
     */
    public getFrequency(): number[] {
        let list: number[] = this.getFillStatList(0);
        let historyList: MST.IWingoHistoryInfo[] = this.getLatelyList();

        for (let v of historyList) {
            let count: number = list[v.Num];
            if (TypeUtils.isNull(count)) {
                count = 0;
            }
            list[v.Num] = ++count;
        }

        return list;
    }

    /**
     * 100 局以内 最大连续出现次数
     */
    public getMaxContinued(): number[] {
        let list: number[] = this.getFillStatList(0);
        let historyList: MST.IWingoHistoryInfo[] = this.getLatelyList();

        let continuedCount: number = 1;
        let continuedNum: number = null;
        for (let v of historyList) {
            if (v.Num === continuedNum) {
                ++continuedCount;
            } else {
                if (continuedNum !== null) {
                    let count: number = list[continuedNum];
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

}