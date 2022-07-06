
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/data/WingoData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvZGF0YS9XaW5nb0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRkFBd0Q7QUFDeEQsMEZBQWtFO0FBRWxFLDJHQUFtRjtBQUNuRix5RUFBbUU7QUFLbkUsU0FBUztBQUNULE1BQU0saUJBQWlCLEdBQVcsR0FBRyxDQUFDO0FBQ3RDLE1BQU07QUFDTixNQUFNLE9BQU8sR0FBVyxFQUFFLENBQUM7QUFHM0IsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsa0JBQVE7SUFxQjNDO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFwQlosVUFBVTtRQUNILFNBQUksR0FBVyxJQUFJLENBQUM7UUFDM0IsT0FBTztRQUNBLGFBQVEsR0FBa0IsSUFBSSxDQUFDO1FBQ3RDLFVBQVU7UUFDSCxjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2hDLFNBQVM7UUFDRixzQkFBaUIsR0FBZ0QsSUFBSSxDQUFDO1FBQzdFLFdBQVc7UUFDSixlQUFVLEdBQWtELElBQUksQ0FBQztRQUN4RSxTQUFTO1FBQ0YsWUFBTyxHQUFZLElBQUksQ0FBQztRQUMvQixhQUFhO1FBQ04seUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQzdDLFNBQVM7UUFDRixnQkFBVyxHQUFpRCxJQUFJLENBQUM7UUFDeEUsV0FBVztRQUNKLGlCQUFZLEdBQW1DLElBQUksQ0FBQztRQUt2RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFFNUIsSUFBSSxhQUFhLEdBQStCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdFLEtBQUssSUFBSSxDQUFDLElBQUksYUFBYSxFQUFFO1lBQ3pCLElBQUksSUFBSSxHQUFXLE1BQU0sQ0FBQyxDQUFDLENBQUMs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eEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBRUosQ0FBQTtBQWpLb0IsU0FBUztJQUQ3Qix3QkFBYyxDQUFDLFNBQVM7R0FDSixTQUFTLENBaUs3QjtrQkFqS29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZURhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9iYXNlL0Jhc2VEYXRhXCI7XG5pbXBvcnQgVHlwZVV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL1R5cGVVdGlsc1wiO1xuaW1wb3J0IEFwcERhdGEgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9kYXRhL0FwcERhdGFcIjtcbmltcG9ydCBDbGFzc0RlY29yYXRvciBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9kZWNvcmF0b3IvQ2xhc3NEZWNvcmF0b3JcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgV2luZ29EZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL1dpbmdvRGVmaW5lXCI7XG5pbXBvcnQgeyBXaW5nb0ludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2UvV2luZ29JbnRlcmZhY2VcIjtcbmltcG9ydCBXaW5nb1V0aWxzIGZyb20gXCIuLi91dGlscy9XaW5nb1V0aWxzXCI7XG5cbi8vIOacgOWkp+WOhuWPsuiusOW9lVxuY29uc3QgTUFYX0hJU1RPUllfQ09VTlQ6IG51bWJlciA9IDEwMDtcbi8vIOacgOWkp+aVsFxuY29uc3QgTUFYX05VTTogbnVtYmVyID0gMTA7XG5cbkBDbGFzc0RlY29yYXRvci5jbGFzc25hbWVcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmdvRGF0YSBleHRlbmRzIEJhc2VEYXRhIHtcblxuICAgIC8vIOaJi+e7rei0ueeOh+eZvuWIhuavlFxuICAgIHB1YmxpYyBjb3N0OiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOW9k+WJjeaooeW8j1xuICAgIHB1YmxpYyBjdXJyTW9kZTogTVNULldpbmdvTW9kZSA9IG51bGw7XG4gICAgLy8g5b2T5YmN5b6F5byA5aWW5pyf5Y+3XG4gICAgcHVibGljIGN1cnJJc3N1ZTogbnVtYmVyID0gbnVsbDtcbiAgICAvLyDljoblj7LlvIDlpZborrDlvZVcbiAgICBwdWJsaWMgaGlzdG9yeUxvdHRlcnlNYXA6IE1hcDxNU1QuV2luZ29Nb2RlLCBNU1QuSVdpbmdvSGlzdG9yeUluZm9bXT4gPSBudWxsO1xuICAgIC8vIOW8gOWlluS/oeaBryBNYXBcbiAgICBwdWJsaWMgbG90dGVyeU1hcDogTWFwPE1TVC5XaW5nb01vZGUsIE1TVC5JTTJDX1dpbmdvTG90dGVyeV9NZXM+ID0gbnVsbDtcbiAgICAvLyDmmK/lkKbpppbmrKHov5vlhaVcbiAgICBwdWJsaWMgaXNGaXJzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLy8g5piv5ZCm5q2j5Zyo5pKt5pS+5byA5aWW5Yqo55S7XG4gICAgcHVibGljIGlzUGxheWluZ0xvdHRlcnlBbmltOiBib29sZWFuID0gZmFsc2U7XG4gICAgLy8g5Liq5Lq65LiL5rOo6K6w5b2VXG4gICAgcHVibGljIG15UmVjb3JkTWFwOiBNYXA8TVNULldpbmdvTW9kZSwgTVNULklXaW5nb015UmVjb3JkSW5mb1tdPiA9IG51bGw7XG4gICAgLy8g5b2T5YmN5aSE5LqO5LiL5ouJ5Yqf6IO9XG4gICAgcHVibGljIGN1cnJQdWxsRnVuYzogV2luZ29EZWZpbmUuUHVsbEJvdHRvbUZ1bmN0aW9uID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuaGlzdG9yeUxvdHRlcnlNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubG90dGVyeU1hcCA9IG5ldyBNYXAoKTtcblxuICAgICAgICBsZXQgd2luZ29Nb2RlTGlzdDogKHN0cmluZyB8IE1TVC5XaW5nb01vZGUpW10gPSBPYmplY3QudmFsdWVzKE1TVC5XaW5nb01vZGUpO1xuICAgICAgICBmb3IgKGxldCBrIG9mIHdpbmdvTW9kZUxpc3QpIHtcbiAgICAgICAgICAgIGxldCBtb2RlOiBudW1iZXIgPSBOdW1iZXIoayk7XG4gICAgICAgICAgICBsZXQgZGF0YTogTVNULklNMkNfV2luZ29Mb3R0ZXJ5X01lcyA9IHtcbiAgICAgICAgICAgICAgICBNb2RlOiBtb2RlLFxuICAgICAgICAgICAgICAgIExvdHRlcnlJbmZvOiBudWxsLFxuICAgICAgICAgICAgICAgIE5leHRUaW1lc3RhbXA6IDAsXG4gICAgICAgICAgICAgICAgTmV4dElzc3VlOiBudWxsLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb3R0ZXJ5TWFwLnNldChtb2RlLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdE5leHQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmnIDov5HnmoTljoblj7LorrDlvZVcbiAgICAgKiBAcmV0dXJucyB7TVNULklXaW5nb0hpc3RvcnlJbmZvW119XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRMYXRlbHlMaXN0KCk6IE1TVC5JV2luZ29IaXN0b3J5SW5mb1tdIHtcbiAgICAgICAgbGV0IGhpc3RvcnlMaXN0OiBNU1QuSVdpbmdvSGlzdG9yeUluZm9bXSA9IG51bGw7XG4gICAgICAgIGxldCBoaXN0b3J5TG90dGVyeUxpc3Q6IE1TVC5JV2luZ29IaXN0b3J5SW5mb1tdID0gdGhpcy5oaXN0b3J5TG90dGVyeU1hcC5nZXQodGhpcy5jdXJyTW9kZSk7XG4gICAgICAgIGxldCBoaXN0b3J5TGVuOiBudW1iZXIgPSBoaXN0b3J5TG90dGVyeUxpc3QubGVuZ3RoO1xuICAgICAgICBpZiAoaGlzdG9yeUxlbiA+PSBNQVhfSElTVE9SWV9DT1VOVCkge1xuICAgICAgICAgICAgaGlzdG9yeUxpc3QgPSBoaXN0b3J5TG90dGVyeUxpc3Quc2xpY2UoLU1BWF9ISVNUT1JZX0NPVU5UKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhpc3RvcnlMaXN0ID0gaGlzdG9yeUxvdHRlcnlMaXN0LnNsaWNlKC1oaXN0b3J5TGVuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGlzdG9yeUxpc3QucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWIneWni+Whq+a7oeeahOe7n+iuoeWIl+ihqFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEZpbGxTdGF0TGlzdChjb3VudDogbnVtYmVyKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgc3RhdExpc3Q6IG51bWJlcltdID0gW107XG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBNQVhfTlVNOyArK2kpIHtcbiAgICAgICAgICAgIHN0YXRMaXN0W2ldID0gY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRMaXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi3neemu+S4iuasoeWHuueOsCDliLDnjrDlnKgg5pyJ5aSa5bCR5bGA5rKh5pyJ5Ye6546wXG4gICAgICogQHJldHVybiB7bnVtYmVyW119XG4gICAgICovXG4gICAgcHVibGljIGdldE1pc3NpbmcoKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgbGlzdDogbnVtYmVyW10gPSB0aGlzLmdldEZpbGxTdGF0TGlzdCgwKTtcbiAgICAgICAgbGV0IGhpc3RvcnlMaXN0OiBNU1QuSVdpbmdvSGlzdG9yeUluZm9bXSA9IHRoaXMuZ2V0TGF0ZWx5TGlzdCgpO1xuXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBNQVhfTlVNOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBtaXNzaW5nQ291bnQ6IG51bWJlciA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIGhpc3RvcnlMaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYuTnVtICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaV0gPSBtaXNzaW5nQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICArK21pc3NpbmdDb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIDEwMCDlsYDlhoXlubPlnYfmtojlpLHlpJrlsJHlsYDlh7rnjrDkuIDmrKFcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0QXZnTWlzc2luZygpOiBudW1iZXJbXSB7XG4gICAgICAgIGxldCBoaXN0b3J5TGlzdDogTVNULklXaW5nb0hpc3RvcnlJbmZvW10gPSB0aGlzLmdldExhdGVseUxpc3QoKTtcbiAgICAgICAgbGV0IGhpc3RvcnlMZW46IG51bWJlciA9IGhpc3RvcnlMaXN0Lmxlbmd0aDtcbiAgICAgICAgbGV0IGxpc3Q6IG51bWJlcltdID0gdGhpcy5nZXRGaWxsU3RhdExpc3QoaGlzdG9yeUxlbik7XG4gICAgICAgIGxldCBmcmVxdWVuY3lMaXN0OiBudW1iZXJbXSA9IHRoaXMuZ2V0RnJlcXVlbmN5KCk7XG5cbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IE1BWF9OVU07ICsraSkge1xuICAgICAgICAgICAgbGV0IGZyZXF1ZW5jeUNvdW50OiBudW1iZXIgPSBmcmVxdWVuY3lMaXN0W2ldO1xuICAgICAgICAgICAgbGV0IG1pc3NpbmdDb3VudDogbnVtYmVyID0gKGhpc3RvcnlMZW4gLSBmcmVxdWVuY3lDb3VudCk7XG4gICAgICAgICAgICBsaXN0W2ldID0gTWF0aC5mbG9vcihtaXNzaW5nQ291bnQgLyAoZnJlcXVlbmN5Q291bnQgKyAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAxMDAg5bGA5Lul5YaFIOWHuueOsOeahOasoeaVsFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGcmVxdWVuY3koKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgbGlzdDogbnVtYmVyW10gPSB0aGlzLmdldEZpbGxTdGF0TGlzdCgwKTtcbiAgICAgICAgbGV0IGhpc3RvcnlMaXN0OiBNU1QuSVdpbmdvSGlzdG9yeUluZm9bXSA9IHRoaXMuZ2V0TGF0ZWx5TGlzdCgpO1xuXG4gICAgICAgIGZvciAobGV0IHYgb2YgaGlzdG9yeUxpc3QpIHtcbiAgICAgICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gbGlzdFt2Lk51bV07XG4gICAgICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbChjb3VudCkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0W3YuTnVtXSA9ICsrY291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAxMDAg5bGA5Lul5YaFIOacgOWkp+i/nue7reWHuueOsOasoeaVsFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRNYXhDb250aW51ZWQoKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgbGlzdDogbnVtYmVyW10gPSB0aGlzLmdldEZpbGxTdGF0TGlzdCgwKTtcbiAgICAgICAgbGV0IGhpc3RvcnlMaXN0OiBNU1QuSVdpbmdvSGlzdG9yeUluZm9bXSA9IHRoaXMuZ2V0TGF0ZWx5TGlzdCgpO1xuXG4gICAgICAgIGxldCBjb250aW51ZWRDb3VudDogbnVtYmVyID0gMTtcbiAgICAgICAgbGV0IGNvbnRpbnVlZE51bTogbnVtYmVyID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgdiBvZiBoaXN0b3J5TGlzdCkge1xuICAgICAgICAgICAgaWYgKHYuTnVtID09PSBjb250aW51ZWROdW0pIHtcbiAgICAgICAgICAgICAgICArK2NvbnRpbnVlZENvdW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGludWVkTnVtICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gbGlzdFtjb250aW51ZWROdW1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPCBjb250aW51ZWRDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdFtjb250aW51ZWROdW1dID0gY29udGludWVkQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWVkQ291bnQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWVkTnVtID0gdi5OdW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG59Il19