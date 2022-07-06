
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/ClickPlayEffets.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3dc6f63JrZALoHMzrjf3sUI', 'ClickPlayEffets');
// script/hall/ClickPlayEffets.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let ClickPlayEffets = class ClickPlayEffets extends cc.Component {
    constructor() {
        super(...arguments);
        this.liziPrefab = null;
        this.liziPool = new cc.NodePool();
    }
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.toTouchHandel, this);
        this.node.zIndex = 9999;
    }
    toTouchHandel(event) {
        let pos = event.getLocation();
        pos = this.node.convertToNodeSpaceAR(pos);
        let lizi = this.getLizi();
        lizi.setPosition(pos);
        lizi.active = true;
        lizi.getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(() => {
            this.receive(lizi);
        }, 1);
        dispatch('onTouchHand');
    }
    receive(node) {
        node.removeFromParent();
        this.liziPool.put(node);
    }
    getLizi() {
        let lizi = this.liziPool.get() || cc.instantiate(this.liziPrefab);
        this.node.addChild(lizi);
        return lizi;
    }
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.toTouchHandel, this);
    }
};
__decorate([
    property(cc.Prefab)
], ClickPlayEffets.prototype, "liziPrefab", void 0);
ClickPlayEffets = __decorate([
    ccclass
], ClickPlayEffets);
exports.default = ClickPlayEffets;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9DbGlja1BsYXlFZmZldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXpEOztRQUVJLGVBQVUsR0FBYyxJQUFJLENBQUM7UUFDN0IsYUFBUSxHQUFHLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBaUNqQyxDQUFDO0lBOUJHLE1BQU07UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUNELGFBQWEsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ0wsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFDRCxPQUFPLENBQUMsSUFBYTtRQUNqQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsT0FBTztRQUNILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekIsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzFFLENBQUM7Q0FFSixDQUFBO0FBbENHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1M7QUFGWixlQUFlO0lBRG5DLE9BQU87R0FDYSxlQUFlLENBb0NuQztrQkFwQ29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpY2tQbGF5RWZmZXRzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGxpemlQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG4gICAgbGl6aVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMudG9Ub3VjaEhhbmRlbCwgdGhpcylcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDk5OTk7XG4gICAgfVxuICAgIHRvVG91Y2hIYW5kZWwoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IGV2ZW50LmdldExvY2F0aW9uKClcbiAgICAgICAgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcylcbiAgICAgICAgbGV0IGxpemkgPSB0aGlzLmdldExpemkoKVxuICAgICAgICBsaXppLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIGxpemkuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbGl6aS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pLnJlc2V0U3lzdGVtKClcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlKGxpemkpXG4gICAgICAgIH0sIDEpXG4gICAgICAgIGRpc3BhdGNoKCdvblRvdWNoSGFuZCcpXG4gICAgfVxuICAgIHJlY2VpdmUobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBub2RlLnJlbW92ZUZyb21QYXJlbnQoKVxuICAgICAgICB0aGlzLmxpemlQb29sLnB1dChub2RlKVxuICAgIH1cbiAgICBnZXRMaXppKCk6IGNjLk5vZGUge1xuICAgICAgICBsZXQgbGl6aSA9IHRoaXMubGl6aVBvb2wuZ2V0KCkgfHwgY2MuaW5zdGFudGlhdGUodGhpcy5saXppUHJlZmFiKVxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobGl6aSk7XG5cbiAgICAgICAgcmV0dXJuIGxpemlcbiAgICB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLnRvVG91Y2hIYW5kZWwsIHRoaXMpXG4gICAgfVxuXG59XG4iXX0=