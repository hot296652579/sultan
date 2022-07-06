
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/view/GuideExitView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac073IfM0JC7YKJma4V8Fuq', 'GuideExitView');
// script/common/view/GuideExitView.ts

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
let GuideExitView = class GuideExitView extends UIView_1.default {
    constructor() {
        super(...arguments);
        // 引导退出回调接口
        this.m_callbackInterface = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    static getPrefabUrl() {
        return "common/prefabs/GuideExitView";
    }
    show(args) {
        super.show(args);
        // this.showWithAction(true);
        this.m_callbackInterface = args[0];
    }
    onClickYes() {
        if (this.m_callbackInterface.yesCallback) {
            this.m_callbackInterface.yesCallback();
        }
        // this.closeWithAction();
        this.close();
    }
    onClickNo() {
        if (this.m_callbackInterface.noCallback) {
            this.m_callbackInterface.noCallback();
        }
        // this.closeWithAction();
        this.close();
    }
    onClick(name) {
        switch (name) {
            case "btnYes":
                this.onClickYes();
                break;
            case "btnNo":
                this.onClickNo();
                break;
        }
    }
};
GuideExitView = __decorate([
    ccclass
], GuideExitView);
exports.default = GuideExitView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL3ZpZXcvR3VpZGVFeGl0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUErQztBQUUvQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsZ0JBQU07SUFBakQ7O1FBRUksV0FBVztRQUNILHdCQUFtQixHQUE2QixJQUFJLENBQUM7UUFvRDdELGlCQUFpQjtJQUNyQixDQUFDO0lBbkRHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVNLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sOEJBQThCLENBQUM7SUFFMUMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQiw2QkFBNkI7UUFFN0IsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU8sVUFBVTtRQUNkLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRTtZQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7UUFDRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFTyxTQUFTO1FBQ2IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUN6QztRQUNELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2hCLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU07U0FDYjtJQUNMLENBQUM7Q0FHSixDQUFBO0FBeERvQixhQUFhO0lBRGpDLE9BQU87R0FDYSxhQUFhLENBd0RqQztrQkF4RG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZUV4aXRWaWV3IGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIC8vIOW8leWvvOmAgOWHuuWbnuiwg+aOpeWPo1xuICAgIHByaXZhdGUgbV9jYWxsYmFja0ludGVyZmFjZTogR3VpZGVFeGl0T3B0aW9uSW50ZXJmYWNlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ltZ0JnJyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiY29tbW9uL3ByZWZhYnMvR3VpZGVFeGl0Vmlld1wiO1xuXG4gICAgfVxuXG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG5cbiAgICAgICAgLy8gdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcblxuICAgICAgICB0aGlzLm1fY2FsbGJhY2tJbnRlcmZhY2UgPSBhcmdzWzBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25DbGlja1llcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubV9jYWxsYmFja0ludGVyZmFjZS55ZXNDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5tX2NhbGxiYWNrSW50ZXJmYWNlLnllc0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNsaWNrTm8oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fY2FsbGJhY2tJbnRlcmZhY2Uubm9DYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5tX2NhbGxiYWNrSW50ZXJmYWNlLm5vQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICB0aGlzLmNsb3NlKClcbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJidG5ZZXNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2tZZXMoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5Ob1wiOlxuICAgICAgICAgICAgICAgIHRoaXMub25DbGlja05vKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19