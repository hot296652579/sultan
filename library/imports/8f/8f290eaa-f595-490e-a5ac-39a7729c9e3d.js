"use strict";
cc._RF.push(module, '8f2906q9ZVJDqWsOadynJ49', 'RouletteRecordItem');
// games/roulette/script/view/RouletteRecordItem.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RouletteRecordItem = class RouletteRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon0 = null;
        this.icon1 = null;
        this.icon2 = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
    }
    initView() {
        this.icon0.node.active = false;
        this.icon1.node.active = false;
        this.icon2.node.active = false;
    }
    setColor(color) {
        this.icon0.node.active = false;
        this.icon1.node.active = false;
        this.icon2.node.active = false;
        this[`icon${color}`].node.active = true;
    }
    clear() {
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], RouletteRecordItem.prototype, "icon0", void 0);
__decorate([
    property(cc.Sprite)
], RouletteRecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Sprite)
], RouletteRecordItem.prototype, "icon2", void 0);
RouletteRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteRecordItem);
exports.default = RouletteRecordItem;

cc._RF.pop();