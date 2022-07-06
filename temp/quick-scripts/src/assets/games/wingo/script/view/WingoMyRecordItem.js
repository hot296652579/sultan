"use strict";
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