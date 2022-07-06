"use strict";
cc._RF.push(module, 'c8753dHUrVDmI64vNikCdEr', 'NoneItem');
// script/common/item/NoneItem.ts

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
const Defines_1 = require("../../framework/base/Defines");
const EventApi_1 = require("../../framework/event/EventApi");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const { ccclass, property } = cc._decorator;
let NoneItem = class NoneItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labNone = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initUI();
        this.onLanguageChange();
    }
    start() {
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    onLanguageChange() {
        this.labNone.language = LanguageImpl_1.i18n.Common.NoData;
    }
    initData() {
    }
    initUI() {
        this.labNone.string = "";
    }
};
__decorate([
    property(cc.Label)
], NoneItem.prototype, "labNone", void 0);
NoneItem = __decorate([
    ccclass
], NoneItem);
exports.default = NoneItem;

cc._RF.pop();