
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/ScroViewPlus.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '02718mBGYFOhb5ag/vm7Ws1', 'ScroViewPlus');
// script/common/component/ScroViewPlus.ts

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
var ScroViewPlus_1;
Object.defineProperty(exports, "__esModule", { value: true });
const ScroViewPlusItem_1 = __importDefault(require("./ScroViewPlusItem"));
const { ccclass, property } = cc._decorator;
/**
 * 用法：
 *
 *      1. 将本组件挂载在节点上即可，和正常ScrollView使用一致
 *
 * 原理：
 *
 *      1. 滚动时，判断子节点是否进入了/离开了可视区域
 *      2. 根据结果回调对应事件，在可以实现类似以下功能：
 *          * 控制可视区域Item显示（透明度改为 255 ），非可视区域Item隐藏（透明度改为 0 ）
 */
let ScroViewPlus = ScroViewPlus_1 = class ScroViewPlus extends cc.ScrollView {
    constructor() {
        super(...arguments);
        this.caculatePosition = false;
    }
    onEnable() {
        super.onEnable();
        this.node.on("scrolling", this._onScrollingDrawCallOpt, this);
    }
    onDisable() {
        super.onDisable();
        this.node.off("scrolling", this._onScrollingDrawCallOpt, this);
    }
    _onScrollingDrawCallOpt() {
        if (this.content.childrenCount == 0) {
            return;
        }
        this.optDc();
    }
    optDc() {
        ScroViewPlus_1.optDc(this, this.caculatePosition);
    }
    /**
     * 优化 ScrollView Content 节点 DC，可以手动调用
     *
     * 具体为
     *
     * 1. 进入ScrollView可视区域是，回调对应 Content 子节点上挂载的 ScollViewPlusItem 组件的 onEnterScorllViewEvents 数组事件
     * 2. 退出ScrollView可视区域是，回调对应 Content 子节点上挂载的 ScollViewPlusItem 组件的 onExitScorllViewEvents 数组事件
     */
    static optDc(scrollView, caculatePosition) {
        // 获取 ScrollView Node 的左下角坐标在世界坐标系中的坐标
        let svLeftBottomPoint = scrollView.node.parent.convertToWorldSpaceAR(cc.v2(scrollView.node.x - scrollView.node.anchorX * scrollView.node.width, scrollView.node.y - scrollView.node.anchorY * scrollView.node.height));
        // 求出 ScrollView 可视区域在世界坐标系中的矩形（碰撞盒）
        let svBBoxRect = cc.rect(svLeftBottomPoint.x, svLeftBottomPoint.y, scrollView.node.width, scrollView.node.height);
        // 遍历 ScrollView Content 内容节点的子节点，对每个子节点的包围盒做和 ScrollView 可视区域包围盒做碰撞判断
        scrollView.content.children.forEach((childNode) => {
            // 没有绑定指定组件的子节点不处理
            let itemComponent = childNode.getComponent(ScroViewPlusItem_1.default);
            if (itemComponent == null) {
                return;
            }
            // 如果相交了，那么就显示，否则就隐藏
            let childNodeBBox = childNode.getBoundingBoxToWorld();
            if (childNodeBBox.intersects(svBBoxRect)) {
                if (!itemComponent.isShowing) {
                    itemComponent.isShowing = true;
                    itemComponent.publishOnEnterScrollView();
                }
                if (caculatePosition) {
                    if (itemComponent.isShowing) {
                        itemComponent.publishOnPositionChange((childNodeBBox.x - (svBBoxRect.x - childNodeBBox.width / 2)) / (childNodeBBox.width + svBBoxRect.width), (childNodeBBox.y - (svBBoxRect.y - childNodeBBox.height / 2)) / (childNodeBBox.height + svBBoxRect.height));
                    }
                }
            }
            else {
                if (itemComponent.isShowing) {
                    itemComponent.isShowing = false;
                    itemComponent.publishOnExitScrollView();
                }
            }
        });
    }
};
__decorate([
    property({
        tooltip: "是否计算在可视区域中Item的相对位置（可能会相对耗性能）"
    })
], ScroViewPlus.prototype, "caculatePosition", void 0);
ScroViewPlus = ScroViewPlus_1 = __decorate([
    ccclass
], ScroViewPlus);
exports.default = ScroViewPlus;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld1BsdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQWtEO0FBRWxELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUU1Qzs7Ozs7Ozs7OztHQVVHO0FBRUgsSUFBcUIsWUFBWSxvQkFBakMsTUFBcUIsWUFBYSxTQUFRLEVBQUUsQ0FBQyxVQUFVO0lBQXZEOztRQUlJLHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQTBFdEMsQ0FBQztJQXhFRyxRQUFRO1FBQ0osS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELFNBQVM7UUFDTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU8sdUJBQXVCO1FBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO1lBQ2pDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sS0FBSztRQUNSLGNBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUF5QixFQUFFLGdCQUF5QjtRQUNwRSxzQ0FBc0M7UUFDdEMsSUFBSSxpQkFBaUIsR0FBWSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FDekUsRUFBRSxDQUFDLEVBQUUsQ0FDRCxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDbkUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQ3ZFLENBQ0osQ0FBQztRQUVGLG9DQUFvQztRQUNwQyxJQUFJLFVBQVUsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzSCxzRUFBc0U7UUFDdEUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBa0IsRUFBRSxFQUFFO1lBQ3ZELGtCQUFrQjtZQUNsQixJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUM7WUFDN0QsSUFBSSxhQUFhLElBQUksSUFBSSxFQUFFO2dCQUN2QixPQUFPO2FBQ1Y7WUFFRCxvQkFBb0I7WUFDcEIsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEQsSUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtvQkFDMUIsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQy9CLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2lCQUM1QztnQkFDRCxJQUFJLGdCQUFnQixFQUFFO29CQUNsQixJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7d0JBQ3pCLGFBQWEsQ0FBQyx1QkFBdUIsQ0FDakMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFDdkcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDN0csQ0FBQztxQkFDTDtpQkFDSjthQUNKO2lCQUFNO2dCQUNILElBQUksYUFBYSxDQUFDLFNBQVMsRUFBRTtvQkFDekIsYUFBYSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLGFBQWEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2lCQUMzQzthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQTtBQTFFRztJQUhDLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSwrQkFBK0I7S0FDM0MsQ0FBQztzREFDZ0M7QUFKakIsWUFBWTtJQURoQyxPQUFPO0dBQ2EsWUFBWSxDQThFaEM7a0JBOUVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjcm9WaWV3UGx1c0l0ZW0gZnJvbSBcIi4vU2Nyb1ZpZXdQbHVzSXRlbVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIOeUqOazle+8mlxuICpcbiAqICAgICAgMS4g5bCG5pys57uE5Lu25oyC6L295Zyo6IqC54K55LiK5Y2z5Y+v77yM5ZKM5q2j5bi4U2Nyb2xsVmlld+S9v+eUqOS4gOiHtFxuICpcbiAqIOWOn+eQhu+8mlxuICpcbiAqICAgICAgMS4g5rua5Yqo5pe277yM5Yik5pat5a2Q6IqC54K55piv5ZCm6L+b5YWl5LqGL+emu+W8gOS6huWPr+inhuWMuuWfn1xuICogICAgICAyLiDmoLnmja7nu5Pmnpzlm57osIPlr7nlupTkuovku7bvvIzlnKjlj6/ku6Xlrp7njrDnsbvkvLzku6XkuIvlip/og73vvJpcbiAqICAgICAgICAgICog5o6n5Yi25Y+v6KeG5Yy65Z+fSXRlbeaYvuekuu+8iOmAj+aYjuW6puaUueS4uiAyNTUg77yJ77yM6Z2e5Y+v6KeG5Yy65Z+fSXRlbemakOiXj++8iOmAj+aYjuW6puaUueS4uiAwIO+8iVxuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb1ZpZXdQbHVzIGV4dGVuZHMgY2MuU2Nyb2xsVmlldyB7XG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdG9vbHRpcDogXCLmmK/lkKborqHnrpflnKjlj6/op4bljLrln5/kuK1JdGVt55qE55u45a+55L2N572u77yI5Y+v6IO95Lya55u45a+56ICX5oCn6IO977yJXCJcbiAgICB9KVxuICAgIGNhY3VsYXRlUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBzdXBlci5vbkVuYWJsZSgpO1xuICAgICAgICB0aGlzLm5vZGUub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5fb25TY3JvbGxpbmdEcmF3Q2FsbE9wdCwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBzdXBlci5vbkRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLl9vblNjcm9sbGluZ0RyYXdDYWxsT3B0LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblNjcm9sbGluZ0RyYXdDYWxsT3B0KCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0RGMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3B0RGMoKSB7XG4gICAgICAgIFNjcm9WaWV3UGx1cy5vcHREYyh0aGlzLCB0aGlzLmNhY3VsYXRlUG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS8mOWMliBTY3JvbGxWaWV3IENvbnRlbnQg6IqC54K5IERD77yM5Y+v5Lul5omL5Yqo6LCD55SoXG4gICAgICpcbiAgICAgKiDlhbfkvZPkuLpcbiAgICAgKlxuICAgICAqIDEuIOi/m+WFpVNjcm9sbFZpZXflj6/op4bljLrln5/mmK/vvIzlm57osIPlr7nlupQgQ29udGVudCDlrZDoioLngrnkuIrmjILovb3nmoQgU2NvbGxWaWV3UGx1c0l0ZW0g57uE5Lu255qEIG9uRW50ZXJTY29ybGxWaWV3RXZlbnRzIOaVsOe7hOS6i+S7tlxuICAgICAqIDIuIOmAgOWHulNjcm9sbFZpZXflj6/op4bljLrln5/mmK/vvIzlm57osIPlr7nlupQgQ29udGVudCDlrZDoioLngrnkuIrmjILovb3nmoQgU2NvbGxWaWV3UGx1c0l0ZW0g57uE5Lu255qEIG9uRXhpdFNjb3JsbFZpZXdFdmVudHMg5pWw57uE5LqL5Lu2XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBvcHREYyhzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3LCBjYWN1bGF0ZVBvc2l0aW9uOiBib29sZWFuKSB7XG4gICAgICAgIC8vIOiOt+WPliBTY3JvbGxWaWV3IE5vZGUg55qE5bem5LiL6KeS5Z2Q5qCH5Zyo5LiW55WM5Z2Q5qCH57O75Lit55qE5Z2Q5qCHXG4gICAgICAgIGxldCBzdkxlZnRCb3R0b21Qb2ludDogY2MuVmVjMiA9IHNjcm9sbFZpZXcubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKFxuICAgICAgICAgICAgY2MudjIoXG4gICAgICAgICAgICAgICAgc2Nyb2xsVmlldy5ub2RlLnggLSBzY3JvbGxWaWV3Lm5vZGUuYW5jaG9yWCAqIHNjcm9sbFZpZXcubm9kZS53aWR0aCxcbiAgICAgICAgICAgICAgICBzY3JvbGxWaWV3Lm5vZGUueSAtIHNjcm9sbFZpZXcubm9kZS5hbmNob3JZICogc2Nyb2xsVmlldy5ub2RlLmhlaWdodFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIOaxguWHuiBTY3JvbGxWaWV3IOWPr+inhuWMuuWfn+WcqOS4lueVjOWdkOagh+ezu+S4reeahOefqeW9ou+8iOeisOaSnuebku+8iVxuICAgICAgICBsZXQgc3ZCQm94UmVjdDogY2MuUmVjdCA9IGNjLnJlY3Qoc3ZMZWZ0Qm90dG9tUG9pbnQueCwgc3ZMZWZ0Qm90dG9tUG9pbnQueSwgc2Nyb2xsVmlldy5ub2RlLndpZHRoLCBzY3JvbGxWaWV3Lm5vZGUuaGVpZ2h0KTtcblxuICAgICAgICAvLyDpgY3ljoYgU2Nyb2xsVmlldyBDb250ZW50IOWGheWuueiKgueCueeahOWtkOiKgueCue+8jOWvueavj+S4quWtkOiKgueCueeahOWMheWbtOebkuWBmuWSjCBTY3JvbGxWaWV3IOWPr+inhuWMuuWfn+WMheWbtOebkuWBmueisOaSnuWIpOaWrVxuICAgICAgICBzY3JvbGxWaWV3LmNvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROb2RlOiBjYy5Ob2RlKSA9PiB7XG4gICAgICAgICAgICAvLyDmsqHmnInnu5HlrprmjIflrprnu4Tku7bnmoTlrZDoioLngrnkuI3lpITnkIZcbiAgICAgICAgICAgIGxldCBpdGVtQ29tcG9uZW50ID0gY2hpbGROb2RlLmdldENvbXBvbmVudChTY3JvVmlld1BsdXNJdGVtKTtcbiAgICAgICAgICAgIGlmIChpdGVtQ29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIOWmguaenOebuOS6pOS6hu+8jOmCo+S5iOWwseaYvuekuu+8jOWQpuWImeWwsemakOiXj1xuICAgICAgICAgICAgbGV0IGNoaWxkTm9kZUJCb3ggPSBjaGlsZE5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XG4gICAgICAgICAgICBpZiAoY2hpbGROb2RlQkJveC5pbnRlcnNlY3RzKHN2QkJveFJlY3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtQ29tcG9uZW50LmlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ29tcG9uZW50LmlzU2hvd2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Db21wb25lbnQucHVibGlzaE9uRW50ZXJTY3JvbGxWaWV3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjYWN1bGF0ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ29tcG9uZW50LmlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUNvbXBvbmVudC5wdWJsaXNoT25Qb3NpdGlvbkNoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hpbGROb2RlQkJveC54IC0gKHN2QkJveFJlY3QueCAtIGNoaWxkTm9kZUJCb3gud2lkdGggLyAyKSkgLyAoY2hpbGROb2RlQkJveC53aWR0aCArIHN2QkJveFJlY3Qud2lkdGgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGlsZE5vZGVCQm94LnkgLSAoc3ZCQm94UmVjdC55IC0gY2hpbGROb2RlQkJveC5oZWlnaHQgLyAyKSkgLyAoY2hpbGROb2RlQkJveC5oZWlnaHQgKyBzdkJCb3hSZWN0LmhlaWdodClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtQ29tcG9uZW50LmlzU2hvd2luZykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ29tcG9uZW50LmlzU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtQ29tcG9uZW50LnB1Ymxpc2hPbkV4aXRTY3JvbGxWaWV3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=