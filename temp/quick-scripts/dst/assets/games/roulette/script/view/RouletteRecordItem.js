
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/roulette/script/view/RouletteRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f2906q9ZVJDqWsOadynJ49', 'RouletteRecordItem');
// games/roulette/script/view/RouletteRecordItem.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RouletteRecordItem = class RouletteRecordItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.icon0 = null;
        this.icon1 = null;
        this.icon2 = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
    }
    initView() {
        this.icon0.node.active = false;
        this.icon1.node.active = false;
        this.icon2.node.active = false;
    }
    setColor(color) {
        this.icon0.node.active = false;
        this.icon1.node.active = false;
        this.icon2.node.active = false;
        this[`icon${color}`].node.active = true;
    }
    clear() {
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], RouletteRecordItem.prototype, "icon0", void 0);
__decorate([
    property(cc.Sprite)
], RouletteRecordItem.prototype, "icon1", void 0);
__decorate([
    property(cc.Sprite)
], RouletteRecordItem.prototype, "icon2", void 0);
RouletteRecordItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteRecordItem);
exports.default = RouletteRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9yb3VsZXR0ZS9zY3JpcHQvdmlldy9Sb3VsZXR0ZVJlY29yZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBMEU7QUFHMUUsa0ZBQWtGO0FBQ2xGLG9GQUE0RDtBQUU1RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLGdCQUFNO0lBQXREOztRQUlZLFVBQUssR0FBYyxJQUFJLENBQUM7UUFFeEIsVUFBSyxHQUFjLElBQUksQ0FBQztRQUV4QixVQUFLLEdBQWMsSUFBSSxDQUFDO0lBa0NwQyxDQUFDO0lBaENHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxLQUFLO0lBRWYsQ0FBQztJQUVPLFFBQVE7SUFFaEIsQ0FBQztJQUVPLFFBQVE7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRU0sUUFBUSxDQUFDLEtBQWE7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUM1QyxDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBRUosQ0FBQTtBQXRDRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNZO0FBRWhDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1k7QUFFaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDWTtBQVJmLGtCQUFrQjtJQUZ0QyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixrQkFBa0IsQ0EwQ3RDO2tCQTFDb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvY29tbW9uL3V0aWxzL051bWJlclV0aWxzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91bGV0dGVSZWNvcmRJdGVtIGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGljb24wOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpY29uMTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByaXZhdGUgaWNvbjI6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0VmlldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdERhdGEoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmljb24wLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbjEubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pY29uMi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDb2xvcihjb2xvcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaWNvbjAubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pY29uMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmljb24yLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXNbYGljb24ke2NvbG9yfWBdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbn1cbiJdfQ==