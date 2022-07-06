
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/msgbox/LabelTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '083f42x3axB5JSWK8z00xwZ', 'LabelTip');
// script/msgbox/LabelTip.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let LabelTip = class LabelTip extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.item = null;
        this.imgBg = null;
        this.label = null;
        this.delayTime = 0.5;
        this.bgOriginSize = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "msgbox/prefabs/LabelTip";
    }
    onLoad() {
        super.onLoad();
        this.bgOriginSize = this.imgBg.node.getContentSize();
    }
    show(args) {
        super.show(args);
        // this.showTip(this.args[0]);
        if (this.args[0]) {
            this.label.language = this.args[0];
            this.label._forceUpdateRenderData();
            this.delayTime = this.args[1] ? this.args[1] : 0.5;
            this.doOpenAction();
        }
        if (this.label.node.width > this.bgOriginSize.width) {
            this.imgBg.node.width = this.label.node.width + 40;
        }
        this.imgBg.node.height = this.label.node.height + 40;
    }
    doOpenAction() {
        this.node.stopAllActions();
        this.node.opacity = 255;
        let t = cc.tween;
        t(this.node)
            .delay(this.delayTime)
            .parallel(t().by(0.5, { position: cc.v2(0, 100) }), t().to(0.5, { opacity: 0 }))
            .call(() => {
            this.close();
        })
            .start();
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], LabelTip.prototype, "item", void 0);
__decorate([
    property(cc.Sprite)
], LabelTip.prototype, "imgBg", void 0);
__decorate([
    property(cc.Label)
], LabelTip.prototype, "label", void 0);
LabelTip = __decorate([
    ccclass
], LabelTip);
exports.default = LabelTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbXNnYm94L0xhYmVsVGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxnQkFBTTtJQUE1Qzs7UUFHSSxTQUFJLEdBQVksSUFBSSxDQUFDO1FBR2IsVUFBSyxHQUFjLElBQUksQ0FBQztRQUdoQyxVQUFLLEdBQWEsSUFBSSxDQUFDO1FBRXZCLGNBQVMsR0FBVyxHQUFHLENBQUM7UUFDaEIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUErQ3JDLGlCQUFpQjtJQUNyQixDQUFDO0lBOUNVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFDRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEIsOEJBQThCO1FBQzlCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQWEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ2pELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFeEQsQ0FBQztJQUNELFlBQVk7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ1AsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckIsUUFBUSxDQUNMLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUN4QyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQzlCO2FBQ0EsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQTtJQUdoQixDQUFDO0lBQ0QsU0FBUztRQUNMLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBRUosQ0FBQTtBQXpERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NDQUNHO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dUNBQ1k7QUFHaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt1Q0FDSTtBQVROLFFBQVE7SUFENUIsT0FBTztHQUNhLFFBQVEsQ0E0RDVCO2tCQTVEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhYmVsVGlwIGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0JnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBkZWxheVRpbWU6IG51bWJlciA9IDAuNTtcbiAgICBwcml2YXRlIGJnT3JpZ2luU2l6ZTogY2MuU2l6ZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwibXNnYm94L3ByZWZhYnMvTGFiZWxUaXBcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuYmdPcmlnaW5TaXplID0gdGhpcy5pbWdCZy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgfVxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpXG4gICAgICAgIC8vIHRoaXMuc2hvd1RpcCh0aGlzLmFyZ3NbMF0pO1xuICAgICAgICBpZiAodGhpcy5hcmdzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsLmxhbmd1YWdlID0gdGhpcy5hcmdzWzBdO1xuICAgICAgICAgICAgKHRoaXMubGFiZWwgYXMgYW55KS5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLmRlbGF5VGltZSA9IHRoaXMuYXJnc1sxXSA/IHRoaXMuYXJnc1sxXSA6IDAuNTtcbiAgICAgICAgICAgIHRoaXMuZG9PcGVuQWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYWJlbC5ub2RlLndpZHRoID4gdGhpcy5iZ09yaWdpblNpemUud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW1nQmcubm9kZS53aWR0aCA9IHRoaXMubGFiZWwubm9kZS53aWR0aCArIDQwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1nQmcubm9kZS5oZWlnaHQgPSB0aGlzLmxhYmVsLm5vZGUuaGVpZ2h0ICsgNDBcblxuICAgIH1cbiAgICBkb09wZW5BY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgbGV0IHQgPSBjYy50d2VlbjtcbiAgICAgICAgdCh0aGlzLm5vZGUpXG4gICAgICAgICAgICAuZGVsYXkodGhpcy5kZWxheVRpbWUpXG4gICAgICAgICAgICAucGFyYWxsZWwoXG4gICAgICAgICAgICAgICAgdCgpLmJ5KDAuNSwgeyBwb3NpdGlvbjogY2MudjIoMCwgMTAwKSB9KSxcbiAgICAgICAgICAgICAgICB0KCkudG8oMC41LCB7IG9wYWNpdHk6IDAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KClcblxuXG4gICAgfVxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=