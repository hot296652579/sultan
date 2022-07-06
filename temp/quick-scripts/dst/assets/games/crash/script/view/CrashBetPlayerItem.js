
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashBetPlayerItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '98566FD4GpCCbgot80YDIoq', 'CrashBetPlayerItem');
// games/crash/script/view/CrashBetPlayerItem.ts

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
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const CrashColorDefine_1 = require("../define/CrashColorDefine");
const { ccclass, property } = cc._decorator;
let CrashBetPlayerItem = class CrashBetPlayerItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgAvatar = null;
        this.labPlayer = null;
        this.labRate = null;
        this.labBetGold = null;
        this.labInCome = null;
        this._data = null;
        this._isWin = null;
        this._userData = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._data = null;
        this._isWin = null;
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    initUI() {
        this.imgAvatar.spriteFrame = null;
        this.labPlayer.string = "";
        this.labRate.string = "";
        this.labBetGold.string = "";
        this.labInCome.string = "";
        this.labPlayer.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        this.labRate.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        this.labBetGold.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
    }
    refreshUI() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, this._data.betInfo.player.HeaderUrl, this._data.betInfo.player.UnitId, this);
        this.labPlayer.string = UtilMgr_1.UtilMgr.setString(this._data.betInfo.player.Nick);
        this.labBetGold.string = NumberUtils_1.default.converToC(Number(this._data.betInfo.BetGold));
        this.refreshInCome();
        if (this._data.betInfo.player.UnitId === this._userData.id) {
            this.labRate.string = NumberUtils_1.default.converToC(this._data.betInfo.Multiple);
        }
    }
    refreshInCome() {
        if (this._isWin === null) {
            this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
            this.labInCome.string = "";
        }
        else {
            if (this._data.isEscape) {
                this.labRate.string = NumberUtils_1.default.converToC(Number(this._data.betInfo.Multiple));
                this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labPlayer.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labRate.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labBetGold.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labInCome.string = Math.floor(Operation_1.default.mul(Operation_1.default.div(Number(this._data.betInfo.BetGold), 100), Operation_1.default.div(this._data.betInfo.Multiple, 100))).toString();
            }
            else {
                this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labPlayer.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labRate.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labBetGold.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labInCome.string = NumberUtils_1.default.converToC(Number(this._data.betInfo.BetGold));
            }
        }
    }
    setIsWin(is) {
        this._isWin = is;
        this._data.isEscape = is;
        this.refreshInCome();
    }
    getIsWin() {
        return this._isWin;
    }
    getId() {
        return Number(this._data.betInfo.player.UnitId);
    }
    getBetRate() {
        return Number(this._data.betInfo.Multiple);
    }
    onShow(data) {
        this._data = data;
        if (data.isEscape) {
            this._isWin = data.isEscape;
        }
        this.initUI();
        this.refreshUI();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Sprite)
], CrashBetPlayerItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labPlayer", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labRate", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labBetGold", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labInCome", void 0);
CrashBetPlayerItem = __decorate([
    ccclass
], CrashBetPlayerItem);
exports.default = CrashBetPlayerItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaEJldFBsYXllckl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4RkFBc0U7QUFDdEUsZ0ZBQXdEO0FBQ3hELGtHQUEwRTtBQUUxRSxvRkFBNEQ7QUFDNUQsK0RBQTREO0FBQzVELGlFQUE4RDtBQUc5RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLGdCQUFNO0lBQXREOztRQUdZLGNBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsY0FBUyxHQUFhLElBQUksQ0FBQztRQUUzQixVQUFLLEdBQTZCLElBQUksQ0FBQztRQUN2QyxXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFnR25DLGlCQUFpQjtJQUNyQixDQUFDO0lBL0ZHLE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sTUFBTTtRQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxD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Q0FBQztJQUN2QixDQUFDO0lBRU0sS0FBSztRQUNSLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sVUFBVTtRQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBOEI7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBR0osQ0FBQTtBQWpIRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNnQjtBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNnQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ2lCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2dCO0FBZmxCLGtCQUFrQjtJQUR0QyxPQUFPO0dBQ2Esa0JBQWtCLENBb0h0QztrQkFwSG9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOdW1iZXJVdGlscyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi91dGlscy9OdW1iZXJVdGlsc1wiO1xuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IE9wZXJhdGlvbiBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9leHRlbnRpb25zL09wZXJhdGlvblwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCB7IENyYXNoQ29sb3JEZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL0NyYXNoQ29sb3JEZWZpbmVcIjtcbmltcG9ydCB7IENyYXNoSW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9DcmFzaEludGVyZmFjZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jhc2hCZXRQbGF5ZXJJdGVtIGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdBdmF0YXI6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJQbGF5ZXI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlJhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldEdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkluQ29tZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfZGF0YTogQ3Jhc2hJbnRlcmZhY2UuQmV0UGxheWVyID0gbnVsbDtcbiAgICBwcml2YXRlIF9pc1dpbjogYm9vbGVhbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdXNlckRhdGE6IFVzZXJEYXRhID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzV2luID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVSSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWdBdmF0YXIuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhYlBsYXllci5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYlJhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCZXRHb2xkLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW5Db21lLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiUGxheWVyLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLlByb2ZpdExvc3MuTk9STUFMO1xuICAgICAgICB0aGlzLmxhYlJhdGUubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5OT1JNQUw7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5ub2RlLmNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5Qcm9maXRMb3NzLk5PUk1BTDtcbiAgICAgICAgdGhpcy5sYWJJbkNvbWUubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5OT1JNQUw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoVUkoKTogdm9pZCB7XG4gICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5pbWdBdmF0YXIsIHRoaXMuX2RhdGEuYmV0SW5mby5wbGF5ZXIuSGVhZGVyVXJsLCB0aGlzLl9kYXRhLmJldEluZm8ucGxheWVyLlVuaXRJZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubGFiUGxheWVyLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKHRoaXMuX2RhdGEuYmV0SW5mby5wbGF5ZXIuTmljayk7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoTnVtYmVyKHRoaXMuX2RhdGEuYmV0SW5mby5CZXRHb2xkKSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEluQ29tZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9kYXRhLmJldEluZm8ucGxheWVyLlVuaXRJZCA9PT0gdGhpcy5fdXNlckRhdGEuaWQpIHtcbiAgICAgICAgICAgIHRoaXMubGFiUmF0ZS5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0ModGhpcy5fZGF0YS5iZXRJbmZvLk11bHRpcGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEluQ29tZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzV2luID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxhYkluQ29tZS5ub2RlLmNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5Qcm9maXRMb3NzLk5PUk1BTDtcbiAgICAgICAgICAgIHRoaXMubGFiSW5Db21lLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YS5pc0VzY2FwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiUmF0ZS5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoTnVtYmVyKHRoaXMuX2RhdGEuYmV0SW5mby5NdWx0aXBsZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiSW5Db21lLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLlByb2ZpdExvc3MuR1JFRU47XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJQbGF5ZXIubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5HUkVFTjtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYlJhdGUubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5HUkVFTjtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYkJldEdvbGQubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5HUkVFTjtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYkluQ29tZS5zdHJpbmcgPSBNYXRoLmZsb29yKE9wZXJhdGlvbi5tdWwoT3BlcmF0aW9uLmRpdihOdW1iZXIodGhpcy5fZGF0YS5iZXRJbmZvLkJldEdvbGQpLCAxMDApLCBPcGVyYXRpb24uZGl2KHRoaXMuX2RhdGEuYmV0SW5mby5NdWx0aXBsZSwgMTAwKSkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiSW5Db21lLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLlByb2ZpdExvc3MuUkVEO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiUGxheWVyLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLlByb2ZpdExvc3MuUkVEO1xuICAgICAgICAgICAgICAgIHRoaXMubGFiUmF0ZS5ub2RlLmNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5Qcm9maXRMb3NzLlJFRDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYkJldEdvbGQubm9kZS5jb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5SRUQ7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJJbkNvbWUuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKE51bWJlcih0aGlzLl9kYXRhLmJldEluZm8uQmV0R29sZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldElzV2luKGlzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2lzV2luID0gaXM7XG4gICAgICAgIHRoaXMuX2RhdGEuaXNFc2NhcGUgPSBpcztcbiAgICAgICAgdGhpcy5yZWZyZXNoSW5Db21lKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldElzV2luKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNXaW47XG4gICAgfVxuXG4gICAgcHVibGljIGdldElkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5fZGF0YS5iZXRJbmZvLnBsYXllci5Vbml0SWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCZXRSYXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5fZGF0YS5iZXRJbmZvLk11bHRpcGxlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KGRhdGE6IENyYXNoSW50ZXJmYWNlLkJldFBsYXllcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcblxuICAgICAgICBpZiAoZGF0YS5pc0VzY2FwZSkge1xuICAgICAgICAgICAgdGhpcy5faXNXaW4gPSBkYXRhLmlzRXNjYXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVUkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19