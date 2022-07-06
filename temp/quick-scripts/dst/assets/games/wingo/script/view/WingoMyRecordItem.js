
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/view/WingoMyRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84416BQlsRE5ZOHsWTEc86L', 'WingoMyRecordItem');
// games/wingo/script/view/WingoMyRecordItem.ts

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
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const DateUtils_1 = __importDefault(require("../../../../script/framework/extentions/DateUtils"));
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const protoc_1 = require("../../../../script/framework/external/protoc");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const WingoColorDefine_1 = require("../define/WingoColorDefine");
const { ccclass, property } = cc._decorator;
let WingoMyRecordItem = class WingoMyRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labIssue = null;
        this.labDate = null;
        this.labBetTotalGold = null;
        this.labIncomeGold = null;
        this.labBetGoldTitle = null;
        this.labBetGoldValue = null;
        this.labHargaTitle = null;
        this.labHargaValue = null;
        this.labStatusTitle = null;
        this.labStatusValue = null;
        this.labBetValueTitle = null;
        this.labBetValueValue = null;
        this.labCostTitle = null;
        this.labCostValue = null;
        this.labLotteryTitle = null;
        this.labLotteryValue = null;
        this._data = null;
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
    }
    initUI() {
        this.labIssue.string = "";
        this.labDate.string = "";
        this.labBetTotalGold.string = "";
        this.labIncomeGold.string = "";
        this.labBetGoldTitle.string = "";
        this.labBetGoldValue.string = "";
        this.labHargaTitle.string = "";
        this.labHargaValue.string = "";
        this.labStatusTitle.string = "";
        this.labStatusValue.string = "";
        this.labBetValueTitle.string = "";
        this.labBetValueValue.string = "";
        this.labCostTitle.string = "";
        this.labCostValue.string = "";
        this.labLotteryTitle.string = "";
        this.labLotteryValue.string = "";
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.labBetGoldTitle.language = Manager_1.Manager.makeLanguage("labBetGoldTitle", true);
        this.labHargaTitle.language = Manager_1.Manager.makeLanguage("labHargaTitle", true);
        this.labStatusTitle.language = Manager_1.Manager.makeLanguage("labStatusTitle", true);
        this.labBetValueTitle.language = Manager_1.Manager.makeLanguage("labBetValueTitle", true);
        this.labCostTitle.language = Manager_1.Manager.makeLanguage("labCostTitle", true);
        this.labLotteryTitle.language = Manager_1.Manager.makeLanguage("labLotteryTitle", true);
    }
    refreshIncome() {
        if (!this._data.isFinish) {
            this.labIncomeGold.string = "";
            return;
        }
        let strIncomeGold = NumberUtils_1.default.converToC(this._data.incomeGold).toString();
        let color = null;
        if (this._data.incomeGold > 0) {
            strIncomeGold = `+${strIncomeGold}`;
            color = WingoColorDefine_1.WingoColorDefine.Income.GREEN;
        }
        else if (this._data.incomeGold < 0) {
            color = WingoColorDefine_1.WingoColorDefine.Income.RED;
        }
        else {
            color = WingoColorDefine_1.WingoColorDefine.Income.NORMAL;
        }
        this.labIncomeGold.string = strIncomeGold;
        this.labIncomeGold.node.color = color;
    }
    refreshStatus() {
        let color = null;
        let textLanguage = null;
        if (this._data.isFinish) {
            if (this._data.incomeGold < 0) {
                color = WingoColorDefine_1.WingoColorDefine.IncomeStatus.LOSS;
                textLanguage = "loss";
            }
            else {
                color = WingoColorDefine_1.WingoColorDefine.IncomeStatus.WIN;
                textLanguage = "win";
            }
        }
        else {
            color = WingoColorDefine_1.WingoColorDefine.IncomeStatus.WAITING;
            textLanguage = "waiting";
        }
        this.labStatusValue.language = Manager_1.Manager.makeLanguage(textLanguage, true);
        ;
        this.labStatusValue.node.color = color;
    }
    refreshBetValue() {
        if (this._data.betType === protoc_1.MST.WingoBetType.Color) {
            this.labBetValueValue.language = Manager_1.Manager.makeLanguage(`abbr${this._data.betValue}`, true);
        }
        else if (this._data.betType === protoc_1.MST.WingoBetType.Num) {
            this.labBetValueValue.string = this._data.betValue.toString();
        }
    }
    refreshLottery() {
        if (!this._data.isFinish) {
            this.labLotteryValue.string = "-";
            return;
        }
        this.labLotteryValue.string = this._data.num.toString();
    }
    onShow(data) {
        this.initUI();
        this.onLanguageChange();
        this._data = data;
        let betTotalGold = Operation_1.default.add(Number(data.betActualGold), Number(data.costGold));
        this.labIssue.string = data.gameNo.toString();
        this.labDate.string = DateUtils_1.default.getDateByTimestamp(data.betTimestamp, "MM/dd hh:mm:ss");
        this.labBetTotalGold.language = Manager_1.Manager.makeLanguage(["labBetTotalGold", NumberUtils_1.default.converToC(betTotalGold)], true);
        this.refreshIncome();
        this.labBetGoldValue.string = NumberUtils_1.default.converToC(data.betActualGold);
        this.labHargaValue.string = data.harga.toString();
        this.refreshStatus();
        this.refreshBetValue();
        this.labCostValue.string = NumberUtils_1.default.converToC(data.costGold);
        this.refreshLottery();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labIssue", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labBetTotalGold", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labIncomeGold", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labBetGoldTitle", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labBetGoldValue", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labHargaTitle", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labHargaValue", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labStatusTitle", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labStatusValue", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labBetValueTitle", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labBetValueValue", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labCostTitle", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labCostValue", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labLotteryTitle", void 0);
__decorate([
    property(cc.Label)
], WingoMyRecordItem.prototype, "labLotteryValue", void 0);
WingoMyRecordItem = __decorate([
    ccclass
], WingoMyRecordItem);
exports.default = WingoMyRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvdmlldy9XaW5nb015UmVjb3JkSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUFvRTtBQUNwRSw4RkFBc0U7QUFDdEUsdUVBQW1GO0FBQ25GLDBFQUF1RTtBQUN2RSxrR0FBMEU7QUFDMUUsa0dBQTBFO0FBQzFFLHlFQUFtRTtBQUNuRSxvRkFBNEQ7QUFDNUQsaUVBQThEO0FBRTlELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsZ0JBQU07SUFBckQ7O1FBR1ksYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixZQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLG9CQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLG9CQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLG9CQUFlLEdBQWEsSUFBSSxDQUFDO1FBR2pDLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLG1CQUFjLEdBQWEsSUFBSSxDQUFDO1FBR2hDLHFCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyxxQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFHbEMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMsb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFFakMsVUFBSyxHQUEwQixJQUFJLENBQUM7UUFtSTVDLGlCQUFpQjtJQUNyQixDQUFDO0lBbElHLE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRU8sTUFBTTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFdEIsSUFBSSxnQ0FBc0IsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU8sYUFBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQy9CLE9BQU87U0FDVjtRQUVELElBQUksYUFBYSxHQUFXLHFCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEYsSUFBSSxLQUFLLEdBQWEsSUFBSSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ3BDLEtBQUssR0FBRyxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDbEMsS0FBSyxHQUFHLG1DQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7U0FDdkM7YUFBTTtZQUNILEtBQUssR0FBRyxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDMUMsQ0FBQztJQUVPLGFBQWE7UUFDakIsSUFBSSxLQUFLLEdBQWEsSUFBSSxDQUFDO1FBQzNCLElBQUksWUFBWSxHQUFXLElBQUksQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixLQUFLLEdBQUcsbUNBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDM0MsWUFBWSxHQUFHLE1BQU0sQ0FBQzthQUN6QjtpQkFBTTtnQkFDSCxLQUFLLEdBQUcsbUNBQWdCLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztnQkFDMUMsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUN4QjtTQUNKO2FBQU07WUFDSCxLQUFLLEdBQUcsbUNBQWdCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUM5QyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUN6RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQzNDLENBQUM7SUFFTyxlQUFlO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssWUFBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLFlBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ3BELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBRU8sY0FBYztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2xDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVELENBQUM7SUFFTSxNQUFNLENBQUMsSUFBMkI7UUFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxZQUFZLEdBQVcsbUJBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFNUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxtQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLGlCQUFpQixFQUFFLHFCQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckgsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLHFCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcscUJBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUdKLENBQUE7QUFuTEc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDZTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNjO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ29CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ29CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ29CO0FBR3ZDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ3FCO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ3FCO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ3VCO0FBRzFDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ3VCO0FBRzFDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ21CO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ21CO0FBR3RDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ3NCO0FBR3pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ3NCO0FBaER4QixpQkFBaUI7SUFEckMsT0FBTztHQUNhLGlCQUFpQixDQXNMckM7a0JBdExvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcbmltcG9ydCBPcGVyYXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9PcGVyYXRpb25cIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFdpbmdvQ29sb3JEZWZpbmUgfSBmcm9tIFwiLi4vZGVmaW5lL1dpbmdvQ29sb3JEZWZpbmVcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpbmdvTXlSZWNvcmRJdGVtIGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYklzc3VlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJEYXRlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJCZXRUb3RhbEdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkluY29tZUdvbGQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldEdvbGRUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQmV0R29sZFZhbHVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJIYXJnYVRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJIYXJnYVZhbHVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTdGF0dXNUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiU3RhdHVzVmFsdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldFZhbHVlVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldFZhbHVlVmFsdWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkNvc3RUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ29zdFZhbHVlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJMb3R0ZXJ5VGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkxvdHRlcnlWYWx1ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfZGF0YTogTVNULldpbmdvTXlSZWNvcmRJbmZvID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmluaXRVSSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VUkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiSXNzdWUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJEYXRlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQmV0VG90YWxHb2xkLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiSW5jb21lR29sZC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJldEdvbGRUaXRsZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJldEdvbGRWYWx1ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkhhcmdhVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJIYXJnYVZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiU3RhdHVzVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJTdGF0dXNWYWx1ZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB0aGlzLmxhYkJldFZhbHVlVGl0bGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgdGhpcy5sYWJCZXRWYWx1ZVZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQ29zdFRpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiQ29zdFZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiTG90dGVyeVRpdGxlLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMubGFiTG90dGVyeVZhbHVlLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuXG4gICAgICAgIGlmIChFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoRXZlbnRBcGkuQ0hBTkdFX0xBTkdVQUdFLCB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5sYWJCZXRHb2xkVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYkJldEdvbGRUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJIYXJnYVRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJIYXJnYVRpdGxlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYlN0YXR1c1RpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJTdGF0dXNUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJCZXRWYWx1ZVRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJCZXRWYWx1ZVRpdGxlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYkNvc3RUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQ29zdFRpdGxlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYkxvdHRlcnlUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiTG90dGVyeVRpdGxlXCIsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaEluY29tZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhLmlzRmluaXNoKSB7XG4gICAgICAgICAgICB0aGlzLmxhYkluY29tZUdvbGQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzdHJJbmNvbWVHb2xkOiBzdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0ModGhpcy5fZGF0YS5pbmNvbWVHb2xkKS50b1N0cmluZygpO1xuICAgICAgICBsZXQgY29sb3I6IGNjLkNvbG9yID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEuaW5jb21lR29sZCA+IDApIHtcbiAgICAgICAgICAgIHN0ckluY29tZUdvbGQgPSBgKyR7c3RySW5jb21lR29sZH1gO1xuICAgICAgICAgICAgY29sb3IgPSBXaW5nb0NvbG9yRGVmaW5lLkluY29tZS5HUkVFTjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kYXRhLmluY29tZUdvbGQgPCAwKSB7XG4gICAgICAgICAgICBjb2xvciA9IFdpbmdvQ29sb3JEZWZpbmUuSW5jb21lLlJFRDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9yID0gV2luZ29Db2xvckRlZmluZS5JbmNvbWUuTk9STUFMO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFiSW5jb21lR29sZC5zdHJpbmcgPSBzdHJJbmNvbWVHb2xkO1xuICAgICAgICB0aGlzLmxhYkluY29tZUdvbGQubm9kZS5jb2xvciA9IGNvbG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFN0YXR1cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbG9yOiBjYy5Db2xvciA9IG51bGw7XG4gICAgICAgIGxldCB0ZXh0TGFuZ3VhZ2U6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhLmlzRmluaXNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YS5pbmNvbWVHb2xkIDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbG9yID0gV2luZ29Db2xvckRlZmluZS5JbmNvbWVTdGF0dXMuTE9TUztcbiAgICAgICAgICAgICAgICB0ZXh0TGFuZ3VhZ2UgPSBcImxvc3NcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSBXaW5nb0NvbG9yRGVmaW5lLkluY29tZVN0YXR1cy5XSU47XG4gICAgICAgICAgICAgICAgdGV4dExhbmd1YWdlID0gXCJ3aW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9yID0gV2luZ29Db2xvckRlZmluZS5JbmNvbWVTdGF0dXMuV0FJVElORztcbiAgICAgICAgICAgIHRleHRMYW5ndWFnZSA9IFwid2FpdGluZ1wiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFiU3RhdHVzVmFsdWUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZSh0ZXh0TGFuZ3VhZ2UsIHRydWUpOztcbiAgICAgICAgdGhpcy5sYWJTdGF0dXNWYWx1ZS5ub2RlLmNvbG9yID0gY29sb3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoQmV0VmFsdWUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhLmJldFR5cGUgPT09IE1TVC5XaW5nb0JldFR5cGUuQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMubGFiQmV0VmFsdWVWYWx1ZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKGBhYmJyJHt0aGlzLl9kYXRhLmJldFZhbHVlfWAsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGEuYmV0VHlwZSA9PT0gTVNULldpbmdvQmV0VHlwZS5OdW0pIHtcbiAgICAgICAgICAgIHRoaXMubGFiQmV0VmFsdWVWYWx1ZS5zdHJpbmcgPSB0aGlzLl9kYXRhLmJldFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hMb3R0ZXJ5KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGEuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgIHRoaXMubGFiTG90dGVyeVZhbHVlLnN0cmluZyA9IFwiLVwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFiTG90dGVyeVZhbHVlLnN0cmluZyA9IHRoaXMuX2RhdGEubnVtLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvdyhkYXRhOiBNU1QuV2luZ29NeVJlY29yZEluZm8pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICAgICAgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKCk7XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgbGV0IGJldFRvdGFsR29sZDogbnVtYmVyID0gT3BlcmF0aW9uLmFkZChOdW1iZXIoZGF0YS5iZXRBY3R1YWxHb2xkKSwgTnVtYmVyKGRhdGEuY29zdEdvbGQpKTtcblxuICAgICAgICB0aGlzLmxhYklzc3VlLnN0cmluZyA9IGRhdGEuZ2FtZU5vLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMubGFiRGF0ZS5zdHJpbmcgPSBEYXRlVXRpbHMuZ2V0RGF0ZUJ5VGltZXN0YW1wKGRhdGEuYmV0VGltZXN0YW1wLCBcIk1NL2RkIGhoOm1tOnNzXCIpO1xuICAgICAgICB0aGlzLmxhYkJldFRvdGFsR29sZC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFtcImxhYkJldFRvdGFsR29sZFwiLCBOdW1iZXJVdGlscy5jb252ZXJUb0MoYmV0VG90YWxHb2xkKV0sIHRydWUpO1xuICAgICAgICB0aGlzLnJlZnJlc2hJbmNvbWUoKTtcbiAgICAgICAgdGhpcy5sYWJCZXRHb2xkVmFsdWUuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKGRhdGEuYmV0QWN0dWFsR29sZCk7XG4gICAgICAgIHRoaXMubGFiSGFyZ2FWYWx1ZS5zdHJpbmcgPSBkYXRhLmhhcmdhLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXR1cygpO1xuICAgICAgICB0aGlzLnJlZnJlc2hCZXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLmxhYkNvc3RWYWx1ZS5zdHJpbmcgPSBOdW1iZXJVdGlscy5jb252ZXJUb0MoZGF0YS5jb3N0R29sZCk7XG4gICAgICAgIHRoaXMucmVmcmVzaExvdHRlcnkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19