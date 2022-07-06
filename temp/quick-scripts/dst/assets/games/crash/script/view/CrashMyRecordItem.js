
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashMyRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0bbf1e55hVFOZr9XMra/0P3', 'CrashMyRecordItem');
// games/crash/script/view/CrashMyRecordItem.ts

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
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const CrashColorDefine_1 = require("../define/CrashColorDefine");
const { ccclass, property } = cc._decorator;
let CrashMyRecordItem = class CrashMyRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labGameNoTitle = null;
        this.labDate = null;
        this.labBetRate = null;
        this.labBetGold = null;
        this.labIncome = null;
        // 数据
        this._data = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
        this._data = null;
    }
    initView() {
        this.labGameNoTitle.string = "";
        this.labDate.string = "";
        this.labBetRate.string = "";
        this.labBetGold.string = "";
        this.labIncome.string = "";
        this.labIncome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.labGameNoTitle.language = Manager_1.Manager.makeLanguage("labGameNoTitle", true);
        this.labDate.language = Manager_1.Manager.makeLanguage("labDate", true);
        this.labBetRate.language = Manager_1.Manager.makeLanguage("labBetRate", true);
        this.labBetGold.language = Manager_1.Manager.makeLanguage("labBetGold", true);
        this.labIncome.language = Manager_1.Manager.makeLanguage("labIncome", true);
    }
    getIncomeColor(incomeGold) {
        let color = null;
        if (incomeGold < 0) {
            color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
        }
        else if (incomeGold > 0) {
            color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
        }
        else {
            color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        }
        return color;
    }
    getIncomeString(incomeGold) {
        let strIncomeGold = NumberUtils_1.default.converToC(incomeGold);
        if (incomeGold > 0) {
            strIncomeGold = `+${strIncomeGold}`;
        }
        return strIncomeGold;
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNoTitle.string = data.gameNo.toString();
        this.labDate.string = new Date(Number(data.betTimestamp)).format("MM/dd hh:mm");
        this.labBetRate.string = NumberUtils_1.default.converToC(data.betMulti);
        this.labBetGold.string = NumberUtils_1.default.converToC(data.betGold);
        this.labIncome.string = this.getIncomeString(data.incomeGold);
        this.labIncome.node.color = this.getIncomeColor(data.incomeGold);
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Label)
], CrashMyRecordItem.prototype, "labGameNoTitle", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordItem.prototype, "labBetRate", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordItem.prototype, "labBetGold", void 0);
__decorate([
    property(cc.Label)
], CrashMyRecordItem.prototype, "labIncome", void 0);
CrashMyRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CrashMyRecordItem);
exports.default = CrashMyRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaE15UmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVFQUFvRTtBQUNwRSw2RUFBMEU7QUFDMUUsOEZBQXNFO0FBQ3RFLHVFQUFtRjtBQUVuRixrRkFBa0Y7QUFDbEYsMEVBQXVFO0FBR3ZFLG9GQUE0RDtBQUM1RCxpRUFBOEQ7QUFFOUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxnQkFBTTtJQUFyRDs7UUFJWSxtQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyxZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsZUFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBRW5DLEtBQUs7UUFDRyxVQUFLLEdBQXNCLElBQUksQ0FBQztJQWlGNUMsQ0FBQztJQS9FRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsS0FBSztJQUVmLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxF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QyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVwQixDQUFDO0NBRUosQ0FBQTtBQWhHRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNxQjtBQUd4QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2lCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ2lCO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2dCO0FBaEJsQixpQkFBaUI7SUFGckMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsaUJBQWlCLENBb0dyQztrQkFwR29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb25nIGZyb20gXCJsb25nXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IENyYXNoQ29sb3JEZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL0NyYXNoQ29sb3JEZWZpbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYXNoTXlSZWNvcmRJdGVtIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiR2FtZU5vVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkRhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldFJhdGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldEdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkluY29tZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8g5pWw5o2uXG4gICAgcHJpdmF0ZSBfZGF0YTogTVNULklNeVJlY29yZEluZm8gPSBudWxsO1xuXG4gICAgb25Mb2FkKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxhYkdhbWVOb1RpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiRGF0ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJldFJhdGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCZXRHb2xkLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW5jb21lLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW5jb21lLm5vZGUuY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLlByb2ZpdExvc3MuTk9STUFMO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmxhYkdhbWVOb1RpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJHYW1lTm9UaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJEYXRlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJEYXRlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYkJldFJhdGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkJldFJhdGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQmV0R29sZFwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJJbmNvbWUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkluY29tZVwiLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluY29tZUNvbG9yKGluY29tZUdvbGQ6IG51bWJlciB8IExvbmcpOiBjYy5Db2xvciB7XG4gICAgICAgIGxldCBjb2xvcjogY2MuQ29sb3IgPSBudWxsO1xuICAgICAgICBpZiAoaW5jb21lR29sZCA8IDApIHtcbiAgICAgICAgICAgIGNvbG9yID0gQ3Jhc2hDb2xvckRlZmluZS5Qcm9maXRMb3NzLlJFRDtcbiAgICAgICAgfSBlbHNlIGlmIChpbmNvbWVHb2xkID4gMCkge1xuICAgICAgICAgICAgY29sb3IgPSBDcmFzaENvbG9yRGVmaW5lLlByb2ZpdExvc3MuR1JFRU47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xvciA9IENyYXNoQ29sb3JEZWZpbmUuUHJvZml0TG9zcy5OT1JNQUw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5jb21lU3RyaW5nKGluY29tZUdvbGQ6IG51bWJlciB8IExvbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgc3RySW5jb21lR29sZDogc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKGluY29tZUdvbGQpO1xuICAgICAgICBpZiAoaW5jb21lR29sZCA+IDApIHtcbiAgICAgICAgICAgIHN0ckluY29tZUdvbGQgPSBgKyR7c3RySW5jb21lR29sZH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJJbmNvbWVHb2xkO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coZGF0YTogTVNULklNeVJlY29yZEluZm8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5sYWJHYW1lTm9UaXRsZS5zdHJpbmcgPSBkYXRhLmdhbWVOby50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmxhYkRhdGUuc3RyaW5nID0gbmV3IERhdGUoTnVtYmVyKGRhdGEuYmV0VGltZXN0YW1wKSkuZm9ybWF0KFwiTU0vZGQgaGg6bW1cIik7XG4gICAgICAgIHRoaXMubGFiQmV0UmF0ZS5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5iZXRNdWx0aSk7XG4gICAgICAgIHRoaXMubGFiQmV0R29sZC5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5iZXRHb2xkKTtcbiAgICAgICAgdGhpcy5sYWJJbmNvbWUuc3RyaW5nID0gdGhpcy5nZXRJbmNvbWVTdHJpbmcoZGF0YS5pbmNvbWVHb2xkKTtcbiAgICAgICAgdGhpcy5sYWJJbmNvbWUubm9kZS5jb2xvciA9IHRoaXMuZ2V0SW5jb21lQ29sb3IoZGF0YS5pbmNvbWVHb2xkKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuXG4gICAgfVxuXG59XG4iXX0=