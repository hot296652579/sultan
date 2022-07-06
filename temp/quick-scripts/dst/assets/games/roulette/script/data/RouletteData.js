
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/data/RouletteData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvZGF0YS9Sb3VsZXR0ZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRkFBd0Q7QUFDeEQsOEVBQXNEO0FBQ3RELDJHQUFtRjtBQUtuRixJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxrQkFBUTtJQTRCOUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQTNCSixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2pDLFlBQVk7UUFDTCxtQkFBYyxHQUFhLElBQUksQ0FBQztRQUN2QyxZQUFZO1FBQ0wsZUFBVSxHQUFrQyxJQUFJLENBQUM7UUFDakQsV0FBTSxHQUF1QixJQUFJLENBQUM7UUFDbEMscUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBQ2hDLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUMxQyxhQUFhO1FBQ04sbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBRTdDLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDeEIsY0FBUyxHQUFXLElBQUksQ0FBQztRQUVoQyxZQUFZO1FBQ0wsbUJBQWMsR0FBVyxJQUFJLENBQUM7UUFDckMsWUFBWTtRQUNMLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsYUFBUSxHQUFXLElBQUksQ0FBQztRQUN4QixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2hDLG1DQUFtQztRQUU1QixtQkFBYyxHQUFrQyxJQUFJLENBQUM7UUFLeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEI7Z0JBQ0ksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7YUFDWDtZQUNEO2dCQUNJLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2FBQ1g7WUFDRDtnQkFDSSxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQzthQUNYO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFTSxPQUFPO0lBRWQsQ0FBQztDQUNKLENBQUE7QUExRG9CLFlBQVk7SUFEaEMsd0JBQWMsQ0FBQyxTQUFTO0dBQ0osWUFBWSxDQTBEaEM7a0JBMURvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvbmcgZnJvbSBcImxvbmdcIjtcbmltcG9ydCBCYXNlRGF0YSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2Jhc2UvQmFzZURhdGFcIjtcbmltcG9ydCBBcHBEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgQ2xhc3NEZWNvcmF0b3IgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0NsYXNzRGVjb3JhdG9yXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IFJvdWxldHRlSW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9Sb3VsZXR0ZUludGVyZmFjZVwiO1xuXG5AQ2xhc3NEZWNvcmF0b3IuY2xhc3NuYW1lXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3VsZXR0ZURhdGEgZXh0ZW5kcyBCYXNlRGF0YSB7XG5cbiAgICBwcml2YXRlIF9hcHBEYXRhOiBBcHBEYXRhID0gbnVsbDtcbiAgICAvKiroh6rlt7HkuIvms6jnmoTorrDlvZUqL1xuICAgIHB1YmxpYyBnYW1lUmVjb3JkTGlzdDogbnVtYmVyW10gPSBudWxsO1xuICAgIC8qKuW9k+WJjeWxgOS4i+azqOS/oeaBryovXG4gICAgcHVibGljIG9uUm9vbUJldHM6IFJvdWxldHRlSW50ZXJmYWNlLkJldFBsYXllcltdID0gbnVsbDtcbiAgICBwdWJsaWMgU3RhdHVzOiBNU1QuUm91bGV0dGVTdGF0dXMgPSBudWxsO1xuICAgIHB1YmxpYyBzdG9wQmV0VGltZVN0YW1wOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBFbmRUaW1lU3RhbXA6IG51bWJlciB8IExvbmcgPSBudWxsO1xuICAgIC8qKuS4ieS4quiJsuS4i+azqOaAu+mHkeminSovXG4gICAgcHVibGljIG9uUm9vbVRvdGFsQmV0OiBNU1QuSVRvdGFsQmV0UmVjb3JkW10gPSBudWxsO1xuXG4gICAgcHVibGljIGN1clJvdW5kOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyByb3VuZEhhc2g6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKirlvIDlp4vmu5rliqjml7bpl7TmiLMqL1xuICAgIHB1YmxpYyBTdGFydFRpbWVTdGFtcDogbnVtYmVyID0gbnVsbDtcbiAgICAvKirnu5PmnZ/mu5rliqjml7bpl7TmiLMqL1xuICAgIHB1YmxpYyBTdG9wVGltZVN0YW1wOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBlbmRJbmRleDogbnVtYmVyID0gbnVsbDtcblxuICAgIHB1YmxpYyBoYXNoU2FsdDogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgcmFuZG9tTnVtOiBudW1iZXIgPSBudWxsO1xuICAgIC8vIHB1YmxpYyBuZXh0Um91bmQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgYmV0QmlnUmFua0luZm86IFJvdWxldHRlSW50ZXJmYWNlLkJldFBsYXllcltdID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICB0aGlzLmdhbWVSZWNvcmRMaXN0ID0gW107XG4gICAgICAgIHRoaXMub25Sb29tQmV0cyA9IFtdO1xuICAgICAgICB0aGlzLmJldEJpZ1JhbmtJbmZvID0gW107XG4gICAgfVxuXG4gICAgY2xlYXJSb3VsZXR0ZURhdGEoKSB7XG4gICAgICAgIHRoaXMub25Sb29tQmV0cyA9IFtdO1xuICAgICAgICB0aGlzLm9uUm9vbVRvdGFsQmV0ID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAwLFxuICAgICAgICAgICAgICAgIGNoaXBzOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAxLFxuICAgICAgICAgICAgICAgIGNoaXBzOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAyLFxuICAgICAgICAgICAgICAgIGNoaXBzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICB9XG59Il19