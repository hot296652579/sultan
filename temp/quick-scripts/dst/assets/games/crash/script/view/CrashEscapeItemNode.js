
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/view/CrashEscapeItemNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ba82oxPEpErqFOZA7A3l7B', 'CrashEscapeItemNode');
// games/crash/script/view/CrashEscapeItemNode.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const ACTION_TIME = 3;
const FLY_X = 100;
const { ccclass, property } = cc._decorator;
let CrashEscapeItemNode = class CrashEscapeItemNode extends cc.Component {
    constructor() {
        super(...arguments);
        this.m_nick = null;
        this.m_rate = null;
        this.m_originPos = null;
        this.m_tween = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.getComponent(cc.Label).string = "";
    }
    start() {
    }
    onEnable() {
        this.setView();
    }
    setOriginPos(pos) {
        this.node.setPosition(pos);
        this.m_originPos = pos;
    }
    setData(nick, rate) {
        this.m_nick = nick;
        this.m_rate = rate;
    }
    setView() {
        // this.node.getComponent(cc.Label).string = `● ${this.m_nick}@${UtilMgr.toFixed(this.m_rate / 100, 2)}x`;
        this.node.getComponent(cc.Label).string = `${this.m_nick}@${UtilMgr_1.UtilMgr.toFixed(this.m_rate / 100, 2)}x`;
    }
    clear() {
        this.m_nick = null;
        this.m_rate = null;
        this.m_originPos = null;
        this.stopAnim();
    }
    runDrop(completeCallback) {
        this.setView();
        this.stopAnim();
        this.m_tween = cc.tween(this.node)
            .to(ACTION_TIME, { y: 0, opacity: 50 })
            .call(() => {
            this.stopAnim();
            completeCallback && completeCallback();
        })
            .start();
    }
    runFly(completeCallback) {
        this.setView();
        this.stopAnim();
        let residuePercent = this.node.y / this.m_originPos.y;
        let residueTime = UtilMgr_1.UtilMgr.toFixed(ACTION_TIME * residuePercent, 2);
        let residueX = UtilMgr_1.UtilMgr.toFixed(FLY_X * residuePercent, 2);
        if (this.node.y > this.m_originPos.y) {
            this.node.y = this.m_originPos.y;
        }
        let x = this.m_originPos.x - residueX;
        if (x < 0) {
            x = 0;
        }
        this.m_tween = cc.tween(this.node)
            .to(residueTime, { x: x, y: 0, opacity: 50 })
            .call(() => {
            this.stopAnim();
            completeCallback && completeCallback();
        })
            .start();
    }
    stopAnim() {
        if (this.m_tween) {
            this.m_tween.stop();
            this.m_tween = null;
        }
    }
};
CrashEscapeItemNode = __decorate([
    ccclass
], CrashEscapeItemNode);
exports.default = CrashEscapeItemNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvdmlldy9DcmFzaEVzY2FwZUl0ZW1Ob2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0RBQTREO0FBRTVELE1BQU0sV0FBVyxHQUFXLENBQUMsQ0FBQztBQUM5QixNQUFNLEtBQUssR0FBVyxHQUFHLENBQUM7QUFDMUIsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxFQUFFLENBQUMsU0FBUztJQUE3RDs7UUFFWSxXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFDdEIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsWUFBTyxHQUFhLElBQUksQ0FBQztRQWtGakMsaUJBQWlCO0lBQ3JCLENBQUM7SUFqRkcsTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLFlBQVksQ0FBQyxHQUFZO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFFTSxPQUFPLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVNLE9BQU87UUFDViwwR0FBMEc7UUFDMUcsSUFBSSxDQUFDLElB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Q29udGVudCI6WyJpbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9nbG9iYWwvVXRpbE1nclwiO1xuXG5jb25zdCBBQ1RJT05fVElNRTogbnVtYmVyID0gMztcbmNvbnN0IEZMWV9YOiBudW1iZXIgPSAxMDA7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jhc2hFc2NhcGVJdGVtTm9kZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIG1fbmljazogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIG1fcmF0ZTogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIG1fb3JpZ2luUG9zOiBjYy5WZWMyID0gbnVsbDtcbiAgICBwcml2YXRlIG1fdHdlZW46IGNjLlR3ZWVuID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIjtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLnNldFZpZXcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0T3JpZ2luUG9zKHBvczogY2MuVmVjMik6IHZvaWQge1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgdGhpcy5tX29yaWdpblBvcyA9IHBvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGF0YShuaWNrOiBzdHJpbmcsIHJhdGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1fbmljayA9IG5pY2s7XG4gICAgICAgIHRoaXMubV9yYXRlID0gcmF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0VmlldygpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYOKXjyAke3RoaXMubV9uaWNrfUAke1V0aWxNZ3IudG9GaXhlZCh0aGlzLm1fcmF0ZSAvIDEwMCwgMil9eGA7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke3RoaXMubV9uaWNrfUAke1V0aWxNZ3IudG9GaXhlZCh0aGlzLm1fcmF0ZSAvIDEwMCwgMil9eGA7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fbmljayA9IG51bGw7XG4gICAgICAgIHRoaXMubV9yYXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5tX29yaWdpblBvcyA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcnVuRHJvcChjb21wbGV0ZUNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRWaWV3KCk7XG4gICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcblxuICAgICAgICB0aGlzLm1fdHdlZW4gPSBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgICAgICAudG8oQUNUSU9OX1RJTUUsIHsgeTogMCwgb3BhY2l0eTogNTAgfSlcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BBbmltKCk7XG4gICAgICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayAmJiBjb21wbGV0ZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJ1bkZseShjb21wbGV0ZUNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRWaWV3KCk7XG4gICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcblxuICAgICAgICBsZXQgcmVzaWR1ZVBlcmNlbnQ6IG51bWJlciA9IHRoaXMubm9kZS55IC8gdGhpcy5tX29yaWdpblBvcy55O1xuICAgICAgICBsZXQgcmVzaWR1ZVRpbWU6IG51bWJlciA9IFV0aWxNZ3IudG9GaXhlZChBQ1RJT05fVElNRSAqIHJlc2lkdWVQZXJjZW50LCAyKTtcbiAgICAgICAgbGV0IHJlc2lkdWVYOiBudW1iZXIgPSBVdGlsTWdyLnRvRml4ZWQoRkxZX1ggKiByZXNpZHVlUGVyY2VudCwgMik7XG5cbiAgICAgICAgaWYgKHRoaXMubm9kZS55ID4gdGhpcy5tX29yaWdpblBvcy55KSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IHRoaXMubV9vcmlnaW5Qb3MueTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4OiBudW1iZXIgPSB0aGlzLm1fb3JpZ2luUG9zLnggLSByZXNpZHVlWDtcbiAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubV90d2VlbiA9IGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC50byhyZXNpZHVlVGltZSwgeyB4OiB4LCB5OiAwLCBvcGFjaXR5OiA1MCB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrICYmIGNvbXBsZXRlQ2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RvcEFuaW0oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1fdHdlZW4pIHtcbiAgICAgICAgICAgIHRoaXMubV90d2Vlbi5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLm1fdHdlZW4gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==