
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9adebAK20FFxaXha2trufC5', 'LanguageLabel');
// script/common/language/LanguageLabel.ts

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
let LanguageLabel = class LanguageLabel extends EventComponent_1.default {
    constructor() {
        super(...arguments);
        this.en = null;
        this.enSize = 20;
        this.zh = null;
        this.zhSize = 20;
        this.hi = null;
        this.hiSize = 20;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_ENGLISH) {
            if (this.en) {
                this.getComponent(cc.Label).font = this.en;
                this.getComponent(cc.Label).fontSize = this.enSize;
            }
        }
        else if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_HINDI) {
            if (this.hi) {
                this.getComponent(cc.Label).font = this.hi;
                this.getComponent(cc.Label).fontSize = this.hiSize;
            }
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
            if (this.en) {
                this.getComponent(cc.Label).font = this.en;
                this.getComponent(cc.Label).fontSize = this.enSize;
            }
            else
                G.Logger.warn("未配置多语言");
        }
        else if (language == cc.sys.LANGUAGE_CHINESE) {
            if (this.zh) {
                this.getComponent(cc.Label).font = this.zh;
                this.getComponent(cc.Label).fontSize = this.zhSize;
            }
            else
                G.Logger.warn("未配置多语言");
        }
        else if (language == cc.sys.LANGUAGE_HINDI) {
            if (this.hi) {
                this.getComponent(cc.Label).font = this.hi;
                this.getComponent(cc.Label).fontSize = this.hiSize;
            }
            else
                G.Logger.warn("未配置多语言");
        }
    }
};
__decorate([
    property({
        displayName: "英文(默认)",
        type: cc.Font
    })
], LanguageLabel.prototype, "en", void 0);
__decorate([
    property({
        displayName: "英文字体大小",
        type: cc.Integer
    })
], LanguageLabel.prototype, "enSize", void 0);
__decorate([
    property({
        displayName: "中文",
        type: cc.Font
    })
], LanguageLabel.prototype, "zh", void 0);
__decorate([
    property({
        displayName: "中文字体大小",
        type: cc.Integer
    })
], LanguageLabel.prototype, "zhSize", void 0);
__decorate([
    property({
        displayName: "印地语",
        type: cc.Font
    })
], LanguageLabel.prototype, "hi", void 0);
__decorate([
    property({
        displayName: "印地字体大小",
        type: cc.Integer
    })
], LanguageLabel.prototype, "hiSize", void 0);
LanguageLabel = __decorate([
    ccclass,
    menu("多语言/FontLabel")
], LanguageLabel);
exports.default = LanguageLabel;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBc0U7QUFDdEUseUZBQWlFO0FBQ2pFLDZEQUEwRDtBQUMxRCxnREFBNkM7QUFHN0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUVsRDs7R0FFRztBQUdILElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLHdCQUFjO0lBQXpEOztRQU1JLE9BQUUsR0FBWSxJQUFJLENBQUM7UUFLbkIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQU1aLE9BQUUsR0FBWSxJQUFJLENBQUM7UUFLbkIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQU1aLE9BQUUsR0FBWSxJQUFJLENBQUM7UUFLbkIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQW1EWixpQkFBaUI7SUFDckIsQ0FBQztJQW5ERyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2QsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzVELElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEQ7U0FDSjthQUFNLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDakUsSUFBSSxJQUFJ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STtLQUNoQixDQUFDO3lDQUNpQjtBQUtuQjtJQUpDLFFBQVEsQ0FBQztRQUNOLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTztLQUNuQixDQUFDOzZDQUNVO0FBTVo7SUFKQyxRQUFRLENBQUM7UUFDTixXQUFXLEVBQUUsS0FBSztRQUNsQixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDaEIsQ0FBQzt5Q0FDaUI7QUFLbkI7SUFKQyxRQUFRLENBQUM7UUFDTixXQUFXLEVBQUUsUUFBUTtRQUNyQixJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU87S0FDbkIsQ0FBQzs2Q0FDVTtBQWpDSyxhQUFhO0lBRmpDLE9BQU87SUFDUCxJQUFJLENBQUMsZUFBZSxDQUFDO0dBQ0QsYUFBYSxDQXFGakM7a0JBckZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgRXZlbnRDb21wb25lbnQgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9iYXNlL0V2ZW50Q29tcG9uZW50XCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSwgbWVudSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLyoqXG4gKiDlpJror63oqIDnmoTlm77niYfliJ3lp4vljJZcbiAqL1xuQGNjY2xhc3NcbkBtZW51KFwi5aSa6K+t6KiAL0ZvbnRMYWJlbFwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFuZ3VhZ2VMYWJlbCBleHRlbmRzIEV2ZW50Q29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuiLseaWhyjpu5jorqQpXCIsXG4gICAgICAgIHR5cGU6IGNjLkZvbnRcbiAgICB9KVxuICAgIGVuOiBjYy5Gb250ID0gbnVsbDtcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLoi7HmloflrZfkvZPlpKflsI9cIixcbiAgICAgICAgdHlwZTogY2MuSW50ZWdlclxuICAgIH0pXG4gICAgZW5TaXplID0gMjA7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLkuK3mlodcIixcbiAgICAgICAgdHlwZTogY2MuRm9udFxuICAgIH0pXG4gICAgemg6IGNjLkZvbnQgPSBudWxsO1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuS4reaWh+Wtl+S9k+Wkp+Wwj1wiLFxuICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyXG4gICAgfSlcbiAgICB6aFNpemUgPSAyMDtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuWNsOWcsOivrVwiLFxuICAgICAgICB0eXBlOiBjYy5Gb250XG4gICAgfSlcbiAgICBoaTogY2MuRm9udCA9IG51bGw7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5Y2w5Zyw5a2X5L2T5aSn5bCPXCIsXG4gICAgICAgIHR5cGU6IGNjLkludGVnZXJcbiAgICB9KVxuICAgIGhpU2l6ZSA9IDIwO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKClcbiAgICAgICAgaWYgKE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKSA9PT0gY2Muc3lzLkxBTkdVQUdFX0VOR0xJU0gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmZvbnQgPSB0aGlzLmVuO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZSA9IHRoaXMuZW5TaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKSA9PT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oaSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250ID0gdGhpcy5oaTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemUgPSB0aGlzLmhpU2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIOebkeWQrOWIh+aNouivreiogOS6i+S7tlxuICAgICovXG4gICAgb25MYW5ndWFnZUNoYW5nZShsYW5ndWFnZSkge1xuICAgICAgICAvLyDlrrnplJnlpITnkIZcbiAgICAgICAgaWYgKCF0aGlzIHx8ICFjYy5pc1ZhbGlkKHRoaXMpIHx8ICF0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpIHx8ICFjYy5pc1ZhbGlkKHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0VOR0xJU0gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmZvbnQgPSB0aGlzLmVuO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZSA9IHRoaXMuZW5TaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBHLkxvZ2dlci53YXJuKFwi5pyq6YWN572u5aSa6K+t6KiAXCIpXG4gICAgICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0NISU5FU0UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnpoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmZvbnQgPSB0aGlzLnpoO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250U2l6ZSA9IHRoaXMuemhTaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBHLkxvZ2dlci53YXJuKFwi5pyq6YWN572u5aSa6K+t6KiAXCIpXG4gICAgICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oaSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5mb250ID0gdGhpcy5oaTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChjYy5MYWJlbCkuZm9udFNpemUgPSB0aGlzLmhpU2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgRy5Mb2dnZXIud2FybihcIuacqumFjee9ruWkmuivreiogFwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==