
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageSpine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlU3BpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBc0U7QUFDdEUseUZBQWlFO0FBQ2pFLDZEQUEwRDtBQUMxRCx5REFBb0Q7QUFHcEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUVsRDs7R0FFRztBQUdILElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLHdCQUFjO0lBQXpEOztRQU1JLE9BQUUsR0FBb0IsSUFBSSxDQUFDO1FBSzNCLE9BQUUsR0FBb0IsSUFBSSxDQUFDO1FBTTNCLE9BQUUsR0FBb0IsSUFBSSxDQUFDO1FBZ0MzQixpQkFBaUI7SUFDckIsQ0FBQztJQS9CRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2QsSUFBSSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDUyxhQUFhO1FBQ25CLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLGdDQUFzQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBQ0Q7O01BRUU7SUFDRixnQkFBZ0IsQ0FBQyxRQUFRO1FBQ3JCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3JDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1NBQ3pCO2FBQU0sSUFBSSxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM1QyxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtTQUN6QjthQUFNLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO1lBQzFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBO1NBQ3pCO1FBQ0QsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1lBQzNELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hFO0lBRUwsQ0FBQztDQUdKLENBQUE7QUE1Q0c7SUFKQyxRQUFRLENBQUM7UUFDTixXQUFXLEVBQUUsUUFBUTtRQUNyQixJQUFJLEVBQUUsRUFBRSxDQUFDLFlBQVk7S0FDeEIsQ0FBQzt5Q0FDeUI7QUFLM0I7SUFKQyxRQUFRLENBQUM7UUFDTixXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsRUFBRSxDQUFDLFlBQVk7S0FDeEIsQ0FBQzt5Q0FDeUI7QUFNM0I7SUFKQyxRQUFRLENBQUM7UUFDTixXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsRUFBRSxDQUFDLFlBQVk7S0FDeEIsQ0FBQzt5Q0FDeUI7QUFqQlYsYUFBYTtJQUZqQyxPQUFPO0lBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQztHQUNHLGFBQWEsQ0FrRGpDO2tCQWxEb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IEV2ZW50Q29tcG9uZW50IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9FdmVudENvbXBvbmVudFwiO1xuaW1wb3J0IHsgRXZlbnRBcGkgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50QXBpXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9GcmFtZXdvcmtcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIOWkmuivreiogOeahHNwaW5l5Yid5aeL5YyWXG4gKi9cbkBjY2NsYXNzXG5AbWVudShcIuWkmuivreiogC9zcGluZVwiKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFuZ3VhZ2VTcGluZSBleHRlbmRzIEV2ZW50Q29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuiLseaWhyjpu5jorqQpXCIsXG4gICAgICAgIHR5cGU6IHNwLlNrZWxldG9uRGF0YVxuICAgIH0pXG4gICAgZW46IHNwLlNrZWxldG9uRGF0YSA9IG51bGw7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5Lit5paHXCIsXG4gICAgICAgIHR5cGU6IHNwLlNrZWxldG9uRGF0YVxuICAgIH0pXG4gICAgemg6IHNwLlNrZWxldG9uRGF0YSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogXCLljbDlnLBcIixcbiAgICAgICAgdHlwZTogc3AuU2tlbGV0b25EYXRhXG4gICAgfSlcbiAgICBoaTogc3AuU2tlbGV0b25EYXRhID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKClcbiAgICAgICAgbGV0IGxhbmd1YWdlID0gTWFuYWdlci5sYW5ndWFnZS5nZXRMYW5ndWFnZSgpO1xuICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UobGFuZ3VhZ2UpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICBpZiAoRU5BQkxFX0NIQU5HRV9MQU5HVUFHRSkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLkNIQU5HRV9MQU5HVUFHRSwgdGhpcy5vbkxhbmd1YWdlQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIOebkeWQrOWIh+aNouivreiogOS6i+S7tlxuICAgICovXG4gICAgb25MYW5ndWFnZUNoYW5nZShsYW5ndWFnZSkge1xuICAgICAgICBsZXQgc2tlbGV0b25EYXRhID0gbnVsbDtcbiAgICAgICAgaWYgKGxhbmd1YWdlID09IGNjLnN5cy5MQU5HVUFHRV9FTkdMSVNIKSB7XG4gICAgICAgICAgICBza2VsZXRvbkRhdGEgPSB0aGlzLmVuXG4gICAgICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0NISU5FU0UpIHtcbiAgICAgICAgICAgIHNrZWxldG9uRGF0YSA9IHRoaXMuemhcbiAgICAgICAgfSBlbHNlIGlmIChsYW5ndWFnZSA9PSBjYy5zeXMuTEFOR1VBR0VfSElOREkpIHtcbiAgICAgICAgICAgIHNrZWxldG9uRGF0YSA9IHRoaXMuaGlcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2tlbGV0b25EYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuc2tlbGV0b25EYXRhID0gc2tlbGV0b25EYXRhO1xuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLnNldEFuaW1hdGlvbigwLCAnbmV3QW5pbWF0aW9uJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=