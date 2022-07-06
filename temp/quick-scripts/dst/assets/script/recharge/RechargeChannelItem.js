
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/RechargeChannelItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3b94XY5h9IZJ+9qy81/Qjn', 'RechargeChannelItem');
// script/recharge/RechargeChannelItem.ts

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
let RechargeChannelItem = class RechargeChannelItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgIcon = null;
        this.labName = null;
        // 商品数据
        this.m_data = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
        this.register();
    }
    start() {
        this.updateView();
    }
    initData() {
    }
    initView() {
        this.imgIcon.spriteFrame = null;
        this.labName.string = "";
    }
    register() {
    }
    updateView() {
        this.imgIcon.spriteFrame = null;
        this.labName.string = this.m_data.name;
        this.imgIcon.loadRemoteImage({ url: this.m_data.icon, view: this });
        // UtilMgr.downloadImg(this.m_data.icon, this.imgIcon, (spriteFrame: cc.SpriteFrame) => {
        //     this.imgIcon.spriteFrame = spriteFrame
        // }, this);
    }
    onClickSelect() {
        dispatch("SELECT_PAY_CHANNEL", this.m_data);
    }
    setData(data) {
        this.m_data = data;
    }
};
__decorate([
    property(cc.Sprite)
], RechargeChannelItem.prototype, "imgIcon", void 0);
__decorate([
    property(cc.Label)
], RechargeChannelItem.prototype, "labName", void 0);
RechargeChannelItem = __decorate([
    ccclass
], RechargeChannelItem);
exports.default = RechargeChannelItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvUmVjaGFyZ2VDaGFubmVsSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUE0QztBQUc1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLGdCQUFNO0lBQXZEOztRQUdZLFlBQU8sR0FBYyxJQUFJLENBQUM7UUFHMUIsWUFBTyxHQUFhLElBQUksQ0FBQztRQUVqQyxPQUFPO1FBQ0MsV0FBTSxHQUEyQyxJQUFJLENBQUM7UUE4QzlELGlCQUFpQjtJQUNyQixDQUFDO0lBN0NHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sUUFBUTtJQUVoQixDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLFFBQVE7SUFFaEIsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFFbkUseUZBQXlGO1FBQ3pGLDZDQUE2QztRQUM3QyxZQUFZO0lBQ2hCLENBQUM7SUFFTyxhQUFhO1FBQ2pCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUE0QztRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0NBR0osQ0FBQTtBQXJERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNjO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ2M7QUFOaEIsbUJBQW1CO0lBRHZDLE9BQU87R0FDYSxtQkFBbUIsQ0F3RHZDO2tCQXhEb0IsbUJBQW1CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlQ2hhbm5lbEl0ZW0gZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0ljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyDllYblk4HmlbDmja5cbiAgICBwcml2YXRlIG1fZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUGF5Q2hhbm5lbEluZm8gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWdJY29uLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYWJOYW1lLnN0cmluZyA9IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcigpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWdJY29uLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYWJOYW1lLnN0cmluZyA9IHRoaXMubV9kYXRhLm5hbWU7XG5cbiAgICAgICAgdGhpcy5pbWdJY29uLmxvYWRSZW1vdGVJbWFnZSh7IHVybDogdGhpcy5tX2RhdGEuaWNvbiwgdmlldzogdGhpcyB9KVxuXG4gICAgICAgIC8vIFV0aWxNZ3IuZG93bmxvYWRJbWcodGhpcy5tX2RhdGEuaWNvbiwgdGhpcy5pbWdJY29uLCAoc3ByaXRlRnJhbWU6IGNjLlNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmltZ0ljb24uc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZVxuICAgICAgICAvLyB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ2xpY2tTZWxlY3QoKTogdm9pZCB7XG4gICAgICAgIGRpc3BhdGNoKFwiU0VMRUNUX1BBWV9DSEFOTkVMXCIsIHRoaXMubV9kYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGF0YShkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQYXlDaGFubmVsSW5mbyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1fZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==