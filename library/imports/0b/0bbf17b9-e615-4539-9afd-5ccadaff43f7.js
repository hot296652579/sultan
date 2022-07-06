"use strict";
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