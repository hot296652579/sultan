"use strict";
cc._RF.push(module, '704d3yTVDtDka5/Gd1ffi2B', 'AttractRecordItem');
// script/wallet/AttractRecordItem.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let AttractRecordItem = class AttractRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labDate = null;
        this.labBankCode = null;
        this.labBankNum = null;
        this.labAmount = null;
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
        this.labDate.string = "";
        this.labAmount.string = "";
        this.labBankCode.string = "";
        this.labBankNum.string = "";
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
        this.labDate.string = new Date(Number(data.withdrawTime)).format("yyyy/MM:dd hh:mm");
        this.labBankCode.string = data.bankCode;
        this.labBankNum.string = data.backNo;
        this.labAmount.string = `+${data.amount}`;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labDate", void 0);
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labBankCode", void 0);
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labBankNum", void 0);
__decorate([
    property(cc.Label)
], AttractRecordItem.prototype, "labAmount", void 0);
AttractRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AttractRecordItem);
exports.default = AttractRecordItem;

cc._RF.pop();