
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/data/CrashData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvZGF0YS9DcmFzaERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRkFBd0Q7QUFDeEQsMEZBQWtFO0FBQ2xFLDhFQUFzRDtBQUN0RCwyR0FBbUY7QUFHbkYscUVBQTZDO0FBRzdDLElBQXFCLFNBQVMsR0FBOUIsTUFBcUIsU0FBVSxTQUFRLGtCQUFRO0lBdUIzQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBdEJKLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFMUIsWUFBTyxHQUErQixJQUFJLENBQUM7UUFDM0MsV0FBTSxHQUFvQixJQUFJLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLHNCQUFpQixHQUFXLElBQUksQ0FBQztRQUNqQyxxQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFDaEMsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFDN0IsbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFDaEMsaUJBQVksR0FBVyxJQUFJLENBQUM7UUFDNUIsY0FBUyxHQUErQixJQUFJLENBQUM7UUFDN0Msa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFDN0IsZ0JBQVcsR0FBMEIsSUFBSSxDQUFDO1FBQzFDLGFBQVEsR0FBd0IsSUFBSSxDQUFDO1FBQzVDLFNBQVM7UUFDRixrQkFBYSxHQUFXLElBQUksQ0FBQztRQUNwQyw2QkFBNkI7UUFDdEIsaUJBQVksR0FBMEMsSUFBSSxDQUFDO1FBQ2xFLFVBQVU7UUFDSCxvQkFBZSxHQUFpQyxJQUFJLENBQUM7UUFLeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLFVBQVUsRUFBRSxFQUFFO1lBQ2QsTUFBTSxFQUFFLENBQUM7WUFDVCxVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLE9BQU87SUFFZCxDQUFDO0lBRU0sUUFBUTtRQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVNLE9BQU87UUFDVixJQUFJLG1CQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7UUFFRCxJQUFJLE9BQU8sR0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRixPQUFPLG9CQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUVKLENBQUE7QUFqRW9CLFNBQVM7SUFEN0Isd0JBQWMsQ0FBQyxTQUFTO0dBQ0osU0FBUyxDQWlFN0I7a0JBakVvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvYmFzZS9CYXNlRGF0YVwiO1xuaW1wb3J0IFR5cGVVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi91dGlscy9UeXBlVXRpbHNcIjtcbmltcG9ydCBBcHBEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9BcHBEYXRhXCI7XG5pbXBvcnQgQ2xhc3NEZWNvcmF0b3IgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0NsYXNzRGVjb3JhdG9yXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IENyYXNoSW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9DcmFzaEludGVyZmFjZVwiO1xuaW1wb3J0IENyYXNoVXRpbHMgZnJvbSBcIi4uL3V0aWxzL0NyYXNoVXRpbHNcIjtcblxuQENsYXNzRGVjb3JhdG9yLmNsYXNzbmFtZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jhc2hEYXRhIGV4dGVuZHMgQmFzZURhdGEge1xuXG4gICAgcHJpdmF0ZSBfYXBwRGF0YTogQXBwRGF0YSA9IG51bGw7XG5cbiAgICBwdWJsaWMgYmV0TGlzdDogQ3Jhc2hJbnRlcmZhY2UuQmV0UGxheWVyW10gPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0dXM6IE1TVC5DcmFzaFN0YXR1cyA9IG51bGw7XG4gICAgcHVibGljIHN0YXJ0R2FtZVRpbWVzdGFtcDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhcnRCZXRUaW1lc3RhbXA6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIHN0b3BCZXRUaW1lc3RhbXA6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIGJvbWJUaW1lc3RhbXA6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIHJhdGVSZWNvcmRMaXN0OiBudW1iZXJbXSA9IG51bGw7XG4gICAgcHVibGljIGJldFRvdGFsR29sZDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgbXlCZXRMaXN0OiBDcmFzaEludGVyZmFjZS5CZXRQbGF5ZXJbXSA9IG51bGw7XG4gICAgcHVibGljIGJldFRvdGFsQ291bnQ6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIGF1dG9CZXREYXRhOiBNU1QuSUNyYXNoQXV0b0JldEluZm8gPSBudWxsO1xuICAgIHB1YmxpYyBoYXNoSW5mbzogQ3Jhc2hJbnRlcmZhY2UuSGFzaCA9IG51bGw7XG4gICAgLy8g5pys6L2u54iG54K45YCN5pWwXG4gICAgcHVibGljIHJvdW5kQm9tYlJhdGU6IG51bWJlciA9IG51bGw7XG4gICAgLy8g5LiL5rOo546p5a62IE1hcDzkuIvms6jnjqnlrrboioLngrnkuIvmoIcsIOS4i+azqOeOqeWutuaVsOaNrj5cbiAgICBwdWJsaWMgYmV0UGxheWVyTWFwOiBNYXA8bnVtYmVyLCBDcmFzaEludGVyZmFjZS5CZXRQbGF5ZXI+ID0gbnVsbDtcbiAgICAvLyDmgLvljoblj7LorrDlvZXmlbDmja5cbiAgICBwdWJsaWMgdG90YWxSZWNvcmREYXRhOiBNU1QuSU0yQ19DcmFzaEhhc2hSZWNvcmRfUmVzID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICB0aGlzLmJldExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5yYXRlUmVjb3JkTGlzdCA9IFtdXG4gICAgICAgIHRoaXMubXlCZXRMaXN0ID0gW107XG4gICAgICAgIHRoaXMuaGFzaEluZm8gPSB7XG4gICAgICAgICAgICBzZXJ2ZXJTZWVkOiBcIlwiLFxuICAgICAgICAgICAgZ2FtZU5vOiAwLFxuICAgICAgICAgICAgcHVibGljU2VlZDogXCJcIixcbiAgICAgICAgICAgIHJvdW5kSGFzaDogXCJcIixcbiAgICAgICAgICAgIGFjYWs6IDAsXG4gICAgICAgICAgICBwb2ludDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5iZXRQbGF5ZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdE5leHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmV0TGlzdC5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhcnRHYW1lVGltZXN0YW1wID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGFydEJldFRpbWVzdGFtcCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RvcEJldFRpbWVzdGFtcCA9IG51bGw7XG4gICAgICAgIHRoaXMuYmV0VG90YWxHb2xkID0gbnVsbDtcbiAgICAgICAgdGhpcy5teUJldExpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5iZXRUb3RhbENvdW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmF0ZSgpOiBudW1iZXIge1xuICAgICAgICBpZiAoVHlwZVV0aWxzLmlzTnVsbCh0aGlzLnN0YXJ0R2FtZVRpbWVzdGFtcCkpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJ1blRpbWU6IG51bWJlciA9ICh0aGlzLl9hcHBEYXRhLmdldFNlcnZlclRpbWVzdGFtcCgpIC0gdGhpcy5zdGFydEdhbWVUaW1lc3RhbXApO1xuICAgICAgICByZXR1cm4gQ3Jhc2hVdGlscy5nZXRSYXRlQnlSdW5UaW1lKHJ1blRpbWUpO1xuICAgIH1cblxufSJdfQ==