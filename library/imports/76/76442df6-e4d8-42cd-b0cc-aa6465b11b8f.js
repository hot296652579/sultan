"use strict";
cc._RF.push(module, '76442325NhCzbDMqmRlsRuP', 'LanguageSprite');
// script/common/language/LanguageSprite.ts

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
const Manager_1 = require("../manager/Manager");
const { ccclass, property, menu } = cc._decorator;
/**
 * 多语言的图片初始化
 */
let LanguageSprite = class LanguageSprite extends EventComponent_1.default {
    constructor() {
        super(...arguments);
        this.en = null;
        this.zh = null;
        this.hi = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_ENGLISH) {
            if (this.en)
                this.getComponent(cc.Sprite).spriteFrame = this.en;
        }
        else if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_HINDI) {
            if (this.hi)
                this.getComponent(cc.Sprite).spriteFrame = this.hi;
        }
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
        // 容错处理
        if (!this || !cc.isValid(this) || !this.getComponent(cc.Sprite) || !cc.isValid(this.getComponent(cc.Sprite))) {
            return;
        }
        if (language == cc.sys.LANGUAGE_ENGLISH) {
            if (this.en)
                this.getComponent(cc.Sprite).spriteFrame = this.en;
            else
                G.Logger.warn("未配置多语言");
        }
        else if (language == cc.sys.LANGUAGE_CHINESE) {
            if (this.zh)
                this.getComponent(cc.Sprite).spriteFrame = this.zh;
            else
                G.Logger.warn("未配置多语言");
        }
        else if (language == cc.sys.LANGUAGE_HINDI) {
            if (this.hi)
                this.getComponent(cc.Sprite).spriteFrame = this.hi;
            else
                G.Logger.warn("未配置多语言");
        }
    }
};
__decorate([
    property({
        displayName: "英文(默认)",
        type: cc.SpriteFrame
    })
], LanguageSprite.prototype, "en", void 0);
__decorate([
    property({
        displayName: "中文",
        type: cc.SpriteFrame
    })
], LanguageSprite.prototype, "zh", void 0);
__decorate([
    property({
        displayName: "印地语",
        type: cc.SpriteFrame
    })
], LanguageSprite.prototype, "hi", void 0);
LanguageSprite = __decorate([
    ccclass,
    menu("多语言/sprite")
], LanguageSprite);
exports.default = LanguageSprite;

cc._RF.pop();