"use strict";
cc._RF.push(module, '118f3KSbUpE5Lw/qoxh4Zc7', 'RouletteTotalRecordItem');
// games/roulette/script/view/RouletteTotalRecordItem.ts

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
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RouletteTotalRecordItem = class RouletteTotalRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon0 = null;
        this.icon1 = null;
        this.icon2 = null;
        this.labGameNo = null;
        this.labRoundHash = null;
        this.labHashSalt = null;
        this.labRoundNo = null;
        this.labCheck = null;
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
        this.labRoundHash.string = "";
        this.labHashSalt.string = "";
        this.labRoundNo.string = "";
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
        this.labRoundHash.language = Manager_1.Manager.makeLanguage("labRoundHash", true);
    }
    onShow(data) {
        this.onLanguageChange();
        this._data = data;
        this.labGameNo.language = Manager_1.Manager.makeLanguage(["labGameNo", data.round], true);
        this.labHashSalt.string = data.hashSalt;
        this.labRoundHash.string = data.roundHash;
        this.labRoundNo.string = String(data.randomNo);
        this[`icon${data.color}`].active = true;
    }
    reset() {
        this.initData();
        this.initView();
    }
};
__decorate([
    property(cc.Node)
], RouletteTotalRecordItem.prototype, "icon0", void 0);
__decorate([
    property(cc.Node)
], RouletteTotalRecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Node)
], RouletteTotalRecordItem.prototype, "icon2", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labGameNo", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labRoundHash", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labHashSalt", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labRoundNo", void 0);
__decorate([
    property(cc.Label)
], RouletteTotalRecordItem.prototype, "labCheck", void 0);
__decorate([
    property(cc.Sprite)
], RouletteTotalRecordItem.prototype, "imgLine", void 0);
RouletteTotalRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteTotalRecordItem);
exports.default = RouletteTotalRecordItem;

cc._RF.pop();