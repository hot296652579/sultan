
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/MoveRepeatForever.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b49caGY1BFDq6FL59Es6ppI', 'MoveRepeatForever');
// script/common/component/MoveRepeatForever.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let moveType = cc.Enum({
    horizontal: 0,
    vertical: 1
});
let MoveRepeatForever = class MoveRepeatForever extends cc.Component {
    constructor() {
        super(...arguments);
        this.moveType = moveType.horizontal;
        this.temp = 10;
        this.tweenAnim = null;
        // update (dt) {}
    }
    onLoad() {
    }
    start() {
    }
    onDisable() {
        this.node.stopAllActions();
    }
    onEnable() {
        this.node.stopAllActions();
        if (this.moveType === moveType.horizontal) {
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.v2(this.temp, 0)), cc.moveBy(0.5, cc.v2(-this.temp, 0)))));
        }
        else {
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.v2(0, this.temp)), cc.moveBy(0.5, cc.v2(0, -this.temp)))));
        }
    }
};
__decorate([
    property({
        type: moveType
    })
], MoveRepeatForever.prototype, "moveType", void 0);
MoveRepeatForever = __decorate([
    ccclass
], MoveRepeatForever);
exports.default = MoveRepeatForever;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9Nb3ZlUmVwZWF0Rm9yZXZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUMxQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ25CLFVBQVUsRUFBQyxDQUFDO0lBQ1osUUFBUSxFQUFDLENBQUM7Q0FDYixDQUFDLENBQUE7QUFFRixJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBM0Q7O1FBS0ksYUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDL0IsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBMkJqQixpQkFBaUI7SUFDckIsQ0FBQztJQXhCRyxNQUFNO0lBQ04sQ0FBQztJQUNELEtBQUs7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsVUFBVSxFQUFHO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQ2hDLEVBQUUsQ0FBQyxRQUFRLENBQ1gsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQ2xFLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDWDthQUFJO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FDaEMsRUFBRSxDQUFDLFFBQVEsQ0FDWCxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNYO0lBQ0wsQ0FBQztDQUdKLENBQUE7QUE5Qkc7SUFIQyxRQUFRLENBQUM7UUFDTixJQUFJLEVBQUMsUUFBUTtLQUNoQixDQUFDO21EQUM2QjtBQUxkLGlCQUFpQjtJQURyQyxPQUFPO0dBQ2EsaUJBQWlCLENBbUNyQztrQkFuQ29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbmxldCBtb3ZlVHlwZSA9IGNjLkVudW0oe1xuICAgIGhvcml6b250YWw6MCxcbiAgICB2ZXJ0aWNhbDoxXG59KVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmVSZXBlYXRGb3JldmVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6bW92ZVR5cGVcbiAgICB9KVxuICAgIG1vdmVUeXBlID0gbW92ZVR5cGUuaG9yaXpvbnRhbDtcbiAgICB0ZW1wOiBudW1iZXIgPSAxMDtcbiAgICB0d2VlbkFuaW0gPSBudWxsO1xuXG4gICAgXG5cbiAgICBvbkxvYWQgKCkge1xuICAgIH1cbiAgICBzdGFydCgpe1xuICAgIH1cbiAgXG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpXG4gICAgfVxuICAgIG9uRW5hYmxlKCl7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpXG4gICAgICAgIGlmICh0aGlzLm1vdmVUeXBlID09PSBtb3ZlVHlwZS5ob3Jpem9udGFsICkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjUsY2MudjIodGhpcy50ZW1wLDApKSxjYy5tb3ZlQnkoMC41LGNjLnYyKC10aGlzLnRlbXAsMClcbiAgICAgICAgICAgICAgICApKSkpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgIGNjLnNlcXVlbmNlKFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeSgwLjUsY2MudjIoMCx0aGlzLnRlbXApKSxjYy5tb3ZlQnkoMC41LGNjLnYyKDAsLXRoaXMudGVtcClcbiAgICAgICAgICAgICAgICApKSkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19