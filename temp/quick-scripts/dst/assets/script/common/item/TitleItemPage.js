
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/item/TitleItemPage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2l0ZW0vVGl0bGVJdGVtUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUErQztBQUUvQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsZ0JBQU07SUFBakQ7O1FBR1ksZ0JBQVcsR0FBYSxJQUFJLENBQUM7UUFpQ3JDLGlCQUFpQjtJQUNyQixDQUFDO0lBaENHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVTLGFBQWE7UUFDbkIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxRQUFRO0lBRWhCLENBQUM7SUFFTyxNQUFNO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTSxXQUFXLENBQUMsSUFBWTtRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLElBQWtDO1FBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0NBR0osQ0FBQTtBQWxDRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNrQjtBQUhwQixhQUFhO0lBRGpDLE9BQU87R0FDYSxhQUFhLENBcUNqQztrQkFyQ29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXRsZUl0ZW1QYWdlIGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlBhZ2VOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VUkoKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VUkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiUGFnZU5hbWUuc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGFnZU5hbWUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiUGFnZU5hbWUuc3RyaW5nID0gbmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbGFuZ3VhZ2VQYWdlTmFtZShpMThuOiAoc3RyaW5nIHwgbnVtYmVyKVtdIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiUGFnZU5hbWUubGFuZ3VhZ2UgPSBpMThuO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=