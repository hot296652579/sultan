
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/language/LanguageChange.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2d2cC2PjtHf6nPC6nwu7HC', 'LanguageChange');
// script/common/language/LanguageChange.ts

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
const Manager_1 = require("../manager/Manager");
const { ccclass, property } = cc._decorator;
/**
 * 多语言切换界面
 */
let LanguageChange = class LanguageChange extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.toggleContainer = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/LanguageChange";
    }
    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        let language = "english";
        if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_ENGLISH) {
            language = "english";
        }
        else if (Manager_1.Manager.language.getLanguage() === cc.sys.LANGUAGE_HINDI) {
            language = "hindi";
        }
        this.toggleContainer.toggleItems.forEach((toggle) => {
            if (toggle.node.name == language)
                toggle.isChecked = true;
        });
        this.showWithAction();
    }
    onClick(name, node) {
        switch (name) {
            case "confirm":
                this.okCall();
                break;
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    okCall() {
        this.toggleContainer.toggleItems.forEach((toggle) => {
            if (toggle.isChecked) {
                switch (toggle.node.name) {
                    case "english":
                        if (Manager_1.Manager.language.getLanguage() != cc.sys.LANGUAGE_ENGLISH) {
                            Manager_1.Manager.language.change(cc.sys.LANGUAGE_ENGLISH);
                        }
                        break;
                    case "hindi":
                        if (Manager_1.Manager.language.getLanguage() != cc.sys.LANGUAGE_HINDI) {
                            Manager_1.Manager.language.change(cc.sys.LANGUAGE_HINDI);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
        this.closeWithAction();
    }
};
__decorate([
    property(cc.ToggleContainer)
], LanguageChange.prototype, "toggleContainer", void 0);
LanguageChange = __decorate([
    ccclass
], LanguageChange);
exports.default = LanguageChange;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlQ2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQStDO0FBQy9DLGdEQUE2QztBQUU3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUM7O0dBRUc7QUFHSCxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWUsU0FBUSxnQkFBTTtJQUFsRDs7UUFJSSxvQkFBZSxHQUF1QixJQUFJLENBQUM7UUFvRDNDLGlCQUFpQjtJQUNyQixDQUFDO0lBbkRVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sK0JBQStCLENBQUM7SUFDM0MsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFLLFFBQVEsR0FBRyxTQUFTLENBQUE7UUFDekIsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzVELFFBQVEsR0FBRyxTQUFTLENBQUE7U0FDdkI7YUFBSyxJQUFHLGlCQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFDO1lBQzlELFFBQVEsR0FBRyxPQUFPLENBQUE7U0FDckI7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRTtZQUMvQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVE7Z0JBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7UUFDNUQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFFMUIsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUNkLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxTQUFTO2dCQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFBQyxNQUFNO1lBQ3JDLEtBQUssT0FBTztnQkFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQUMsTUFBTTtZQUM1QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RDtJQUNMLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUU7WUFDL0MsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUNsQixRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUN0QixLQUFLLFNBQVM7d0JBQ1YsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzRCQUMzRCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3lCQUNwRDt3QkFDRCxNQUFNO29CQUNWLEtBQUssT0FBTzt3QkFDUixJQUFJLGlCQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFOzRCQUN6RCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDbEQ7d0JBQ0QsTUFBTTtvQkFDVjt3QkFDSSxNQUFNO2lCQUNiO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0NBR0osQ0FBQTtBQXJERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDO3VEQUNjO0FBSjFCLGNBQWM7SUFEbEMsT0FBTztHQUNhLGNBQWMsQ0F5RGxDO2tCQXpEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbi8qKlxuICog5aSa6K+t6KiA5YiH5o2i55WM6Z2iXG4gKi9cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmd1YWdlQ2hhbmdlIGV4dGVuZHMgVUlWaWV3IHtcblxuXG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZUNvbnRhaW5lcilcbiAgICB0b2dnbGVDb250YWluZXI6IGNjLlRvZ2dsZUNvbnRhaW5lciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiY29tbW9uL3ByZWZhYnMvTGFuZ3VhZ2VDaGFuZ2VcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjYy5maW5kKCdjb250ZW50JywgdGhpcy5ub2RlKTtcbiAgICAgICAgbGV0ICBsYW5ndWFnZSA9IFwiZW5nbGlzaFwiXG4gICAgICAgIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT09IGNjLnN5cy5MQU5HVUFHRV9FTkdMSVNIKSB7XG4gICAgICAgICAgICBsYW5ndWFnZSA9IFwiZW5nbGlzaFwiXG4gICAgICAgIH1lbHNlIGlmKE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKSA9PT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKXtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gXCJoaW5kaVwiXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRhaW5lci50b2dnbGVJdGVtcy5mb3JFYWNoKCh0b2dnbGUpPT57XG4gICAgICAgICAgICBpZiAodG9nZ2xlLm5vZGUubmFtZSA9PSBsYW5ndWFnZSl0b2dnbGUuaXNDaGVja2VkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKCk7XG4gICAgICAgXG4gICAgfVxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjb25maXJtXCI6IHRoaXMub2tDYWxsKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9rQ2FsbCgpe1xuICAgICAgICB0aGlzLnRvZ2dsZUNvbnRhaW5lci50b2dnbGVJdGVtcy5mb3JFYWNoKCh0b2dnbGUpPT57XG4gICAgICAgICAgICBpZiAodG9nZ2xlLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodG9nZ2xlLm5vZGUubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5nbGlzaFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hbmFnZXIubGFuZ3VhZ2UuZ2V0TGFuZ3VhZ2UoKSAhPSBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hbmFnZXIubGFuZ3VhZ2UuY2hhbmdlKGNjLnN5cy5MQU5HVUFHRV9FTkdMSVNIKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaGluZGlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgIT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5sYW5ndWFnZS5jaGFuZ2UoY2Muc3lzLkxBTkdVQUdFX0hJTkRJKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKClcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19