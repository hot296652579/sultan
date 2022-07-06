"use strict";
cc._RF.push(module, '0af6bjfIfRIma8ArBlKoqOx', 'RouletteMyBetRecordItem');
// games/roulette/script/view/RouletteMyBetRecordItem.ts

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
const RouletteColorDefine_1 = require("../define/RouletteColorDefine");
const { ccclass, property } = cc._decorator;
let RouletteMyBetRecordItem = class RouletteMyBetRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon0 = null;
        this.icon1 = null;
        this.icon2 = null;
        this.labGameNo = null;
        this.labBetChips = null;
        this.labWinChips = null;
        this.imgLine = null;
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
        this.labGameNo.string = "";
        this.labBetChips.string = "";
        this.labWinChips.string = "";
        this.icon0.active = false;
        this.icon1.active = false;
        this.icon2.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNo.language = Manager_1.Manager.makeLanguage(["labGameNo", data.round], true);
        this[`icon${data.color}`].active = true;
        this.labBetChips.string = String(NumberUtils_1.default.converToC(data.betChips));
        this.labWinChips.string = String(NumberUtils_1.default.converToC(data.winChips));
        this.labWinChips.node.color = this.getIncomeColor(data.winChips);
    }
    getIncomeColor(incomeGold) {
        let color = null;
        if (incomeGold < 0) {
            color = RouletteColorDefine_1.RouletteColorDefine.ProfitLoss.RED;
        }
        else if (incomeGold > 0) {
            color = RouletteColorDefine_1.RouletteColorDefine.ProfitLoss.GREEN;
        }
        else {
            color = RouletteColorDefine_1.RouletteColorDefine.ProfitLoss.NORMAL;
        }
        return color;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Node)
], RouletteMyBetRecordItem.prototype, "icon0", void 0);
__decorate([
    property(cc.Node)
], RouletteMyBetRecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RouletteMyBetRecordItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordItem.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordItem.prototype, "labBetChips", void 0);
__decorate([
    property(cc.Label)
], RouletteMyBetRecordItem.prototype, "labWinChips", void 0);
__decorate([
    property(cc.Sprite)
], RouletteMyBetRecordItem.prototype, "imgLine", void 0);
RouletteMyBetRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteMyBetRecordItem);
exports.default = RouletteMyBetRecordItem;

cc._RF.pop();