
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlU3ByaXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXNFO0FBQ3RFLHlGQUFpRTtBQUNqRSw2REFBMEQ7QUFDMUQsZ0RBQTZDO0FBRzdDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFbEQ7O0dBRUc7QUFHSCxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSx3QkFBYztJQUExRDs7UUFNSSxPQUFFLEdBQW1CLElBQUksQ0FBQztRQU0xQixPQUFFLEdBQW1CLElBQUksQ0FBQztRQU8xQixPQUFFLEdBQW1CLElBQUksQ0FBQztRQXFDMUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFwQ0csTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNkLElBQUksaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM1RCxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ25FO2FBQU0sSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUNqRSxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUNTLGFBQWE7UUFDbkIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksZ0NBQXNCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFDRDs7TUFFRTtJQUNGLGdCQUFnQixDQUFDLFFBQVE7UUFDckIsT0FBTztRQUNQLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDekcsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOztnQkFDM0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDL0I7YUFBTSxJQUFJLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzVDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7O2dCQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUMvQjthQUFNLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7O2dCQUMzRCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUMvQjtJQUNMLENBQUM7Q0FHSixDQUFBO0FBbkRHO0lBSkMsUUFBUSxDQUFDO1FBQ04sV0FBVyxFQUFFLFFBQVE7UUFDckIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXO0tBQ3ZCLENBQUM7MENBQ3dCO0FBTTFCO0lBSkMsUUFBUSxDQUFDO1FBQ04sV0FBVyxFQUFFLElBQUk7UUFDakIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXO0tBQ3ZCLENBQUM7MENBQ3dCO0FBTzFCO0lBSkMsUUFBUSxDQUFDO1FBQ04sV0FBVyxFQUFFLEtBQUs7UUFDbEIsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXO0tBQ3ZCLENBQUM7MENBQ3dCO0FBbkJULGNBQWM7SUFGbEMsT0FBTztJQUNQLElBQUksQ0FBQyxZQUFZLENBQUM7R0FDRSxjQUFjLENBeURsQztrQkF6RG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTkFCTEVfQ0hBTkdFX0xBTkdVQUdFIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBFdmVudENvbXBvbmVudCBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvRXZlbnRDb21wb25lbnRcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9tYW5hZ2VyL01hbmFnZXJcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIOWkmuivreiogOeahOWbvueJh+WIneWni+WMllxuICovXG5AY2NjbGFzc1xuQG1lbnUoXCLlpJror63oqIAvc3ByaXRlXCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYW5ndWFnZVNwcml0ZSBleHRlbmRzIEV2ZW50Q29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuiLseaWhyjpu5jorqQpXCIsXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgfSlcbiAgICBlbjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5Lit5paHXCIsXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgfSlcbiAgICB6aDogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLljbDlnLDor61cIixcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICB9KVxuICAgIGhpOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpXG4gICAgICAgIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT09IGNjLnN5cy5MQU5HVUFHRV9FTkdMSVNIKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbikgdGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuZW47XG4gICAgICAgIH0gZWxzZSBpZiAoTWFuYWdlci5sYW5ndWFnZS5nZXRMYW5ndWFnZSgpID09PSBjYy5zeXMuTEFOR1VBR0VfSElOREkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhpKSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5oaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIOebkeWQrOWIh+aNouivreiogOS6i+S7tlxuICAgICovXG4gICAgb25MYW5ndWFnZUNoYW5nZShsYW5ndWFnZSkge1xuICAgICAgICAvLyDlrrnplJnlpITnkIZcbiAgICAgICAgaWYoIXRoaXMgfHwgIWNjLmlzVmFsaWQodGhpcykgfHwgIXRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkgfHwgIWNjLmlzVmFsaWQodGhpcy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYW5ndWFnZSA9PSBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW4pIHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmVuO1xuICAgICAgICAgICAgZWxzZSBHLkxvZ2dlci53YXJuKFwi5pyq6YWN572u5aSa6K+t6KiAXCIpXG4gICAgICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0NISU5FU0UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnpoKSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy56aDtcbiAgICAgICAgICAgIGVsc2UgRy5Mb2dnZXIud2FybihcIuacqumFjee9ruWkmuivreiogFwiKVxuICAgICAgICB9IGVsc2UgaWYgKGxhbmd1YWdlID09IGNjLnN5cy5MQU5HVUFHRV9ISU5ESSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGkpIHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmhpO1xuICAgICAgICAgICAgZWxzZSBHLkxvZ2dlci53YXJuKFwi5pyq6YWN572u5aSa6K+t6KiAXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19