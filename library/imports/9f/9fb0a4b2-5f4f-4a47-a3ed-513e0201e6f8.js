"use strict";
cc._RF.push(module, '9fb0aSyX09KR6PtUT4CAeb4', 'LanguageSpine');
// script/common/language/LanguageSpine.ts

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
const EventComponent_1 = __importDefault(require("../../framework/base/EventComponent"));
const EventApi_1 = require("../../framework/event/EventApi");
const Framework_1 = require("../../framework/Framework");
const { ccclass, property, menu } = cc._decorator;
/**
 * 多语言的spine初始化
 */
let LanguageSpine = class LanguageSpine extends EventComponent_1.default {
    constructor() {
        super(...arguments);
        this.en = null;
        this.zh = null;
        this.hi = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        let language = Framework_1.Manager.language.getLanguage();
        this.onLanguageChange(language);
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    /**
    * 监听切换语言事件
    */
    onLanguageChange(language) {
        let skeletonData = null;
        if (language == cc.sys.LANGUAGE_ENGLISH) {
            skeletonData = this.en;
        }
        else if (language == cc.sys.LANGUAGE_CHINESE) {
            skeletonData = this.zh;
        }
        else if (language == cc.sys.LANGUAGE_HINDI) {
            skeletonData = this.hi;
        }
        if (skeletonData) {
            this.getComponent(sp.Skeleton).skeletonData = skeletonData;
            this.getComponent(sp.Skeleton).setAnimation(0, 'newAnimation', true);
        }
    }
};
__decorate([
    property({
        displayName: "英文(默认)",
        type: sp.SkeletonData
    })
], LanguageSpine.prototype, "en", void 0);
__decorate([
    property({
        displayName: "中文",
        type: sp.SkeletonData
    })
], LanguageSpine.prototype, "zh", void 0);
__decorate([
    property({
        displayName: "印地",
        type: sp.SkeletonData
    })
], LanguageSpine.prototype, "hi", void 0);
LanguageSpine = __decorate([
    ccclass,
    menu("多语言/spine")
], LanguageSpine);
exports.default = LanguageSpine;

cc._RF.pop();