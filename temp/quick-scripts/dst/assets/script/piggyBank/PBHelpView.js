
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBHelpView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aba70wIzmVGdYvM/r+xFX7f', 'PBHelpView');
// script/piggyBank/PBHelpView.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let PBHelpView = class PBHelpView extends UIView_1.default {
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBHelpView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    show() {
        this.showWithAction(true);
        super.show();
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
};
PBHelpView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBHelpView);
exports.default = PBHelpView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCSGVscFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBMEQ7QUFDMUQsa0VBQWtFO0FBQ2xFLG9FQUE0QztBQUU1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUFXLFNBQVEsZ0JBQU07SUFFbkMsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw4QkFBOEIsQ0FBQztJQUMxQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELEtBQUs7SUFFTCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBRUosQ0FBQTtBQXpCb0IsVUFBVTtJQUY5QixPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixVQUFVLENBeUI5QjtrQkF6Qm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQQkhlbHBWaWV3IGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJwaWdneUJhbmsvcHJlZmFicy9QQkhlbHBWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpbWdCZycpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgc3VwZXIuc2hvdygpO1xuICAgIH1cblxuICAgIG9uQ2xpY2tDbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wbGF5RGVmYXVsdEVmZmVjdChcImNsb3NlXCIpO1xuICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgIH1cblxufVxuIl19