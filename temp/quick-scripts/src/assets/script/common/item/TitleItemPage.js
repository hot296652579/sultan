"use strict";
cc._RF.push(module, 'c554bHJMOBExoTNGQc8eSX1', 'TitleItemPage');
// script/common/item/TitleItemPage.ts

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
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let TitleItemPage = class TitleItemPage extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labPageName = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initUI();
    }
    start() {
    }
    bindingEvents() {
        super.bindingEvents();
    }
    initData() {
    }
    initUI() {
        this.labPageName.string = "";
    }
    setPageName(name) {
        this.labPageName.string = name;
    }
    languagePageName(i18n) {
        this.labPageName.language = i18n;
    }
};
__decorate([
    property(cc.Label)
], TitleItemPage.prototype, "labPageName", void 0);
TitleItemPage = __decorate([
    ccclass
], TitleItemPage);
exports.default = TitleItemPage;

cc._RF.pop();