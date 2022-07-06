
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/CountDownCode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd41a7BOaSRJ1JgIyG+GE6lY', 'CountDownCode');
// script/common/component/CountDownCode.ts

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
exports.VerificationCodeType = void 0;
const Decorators_1 = require("../../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const LobbyService_1 = require("../net/LobbyService");
var VerificationCodeType;
(function (VerificationCodeType) {
    VerificationCodeType[VerificationCodeType["none"] = 0] = "none";
    VerificationCodeType[VerificationCodeType["resetPwd"] = 1] = "resetPwd";
})(VerificationCodeType = exports.VerificationCodeType || (exports.VerificationCodeType = {}));
const { ccclass, property } = cc._decorator;
let CountDownCode = class CountDownCode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.btnGetCode = null;
        this.service = null;
        this.verificationCodeType = VerificationCodeType.none;
    }
    onLoad() {
        // this._doStartTime();
    }
    bindingEvents() {
        super.bindingEvents();
    }
    _doStartTime() {
        this.node.active = true;
        this.btnGetCode.enabled = false;
        this.verifiCD = 60;
        if (this.node.getComponent(cc.Button)) {
            this.node.getComponent(cc.Button).interactable = false;
        }
        this.label.string = this.verifiCD + 's';
        this.verifiCD -= 1;
        this.updateVerifiCD = setInterval(() => {
            if (this.verifiCD < 0) {
                clearInterval(this.updateVerifiCD);
                this.verifiCD = 60;
                this.countDownEnd();
                if (this.node.getComponent(cc.Button)) {
                    this.node.getComponent(cc.Button).interactable = true;
                }
            }
            else {
                if (this.label == null) {
                    clearInterval(this.updateVerifiCD);
                    if (cc.isValid(this.node)) {
                        this.onDestroy();
                    }
                }
                else {
                    this.label.string = this.verifiCD + 's';
                    this.verifiCD--;
                }
            }
        }, 1000);
    }
    countDownEnd() {
        this.node.active = false;
        this.btnGetCode.enabled = true;
    }
};
__decorate([
    property(cc.Label)
], CountDownCode.prototype, "label", void 0);
__decorate([
    property(cc.Button)
], CountDownCode.prototype, "btnGetCode", void 0);
CountDownCode = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CountDownCode);
exports.default = CountDownCode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9Db3VudERvd25Db2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFFQUE4RTtBQUU5RSx1RUFBK0M7QUFNL0Msc0RBQW1EO0FBR25ELElBQW1CLG9CQUdsQjtBQUhELFdBQW1CLG9CQUFvQjtJQUNuQywrREFBSSxDQUFBO0lBQ0osdUVBQVEsQ0FBQTtBQUNaLENBQUMsRUFIa0Isb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFHdEM7QUFDRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFjLFNBQVEsZ0JBQU07SUFBakQ7O1FBR0ksVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixlQUFVLEdBQWMsSUFBSSxDQUFDO1FBSzdCLFlBQU8sR0FBaUIsSUFBSSxDQUFDO1FBSTdCLHlCQUFvQixHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztJQTBDckQsQ0FBQztJQTdDRyxNQUFNO1FBQ0YsdUJBQXVCO0lBQzNCLENBQUM7SUFHRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ3pEO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDcEIsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3FCQUNwQjtpQkFFSjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjthQUVKO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ1osQ0FBQztJQUNELFlBQVk7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7Q0FDSixDQUFBO0FBdERHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NENBQ0k7QUFHdkI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDUztBQU5aLGFBQWE7SUFGakMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsYUFBYSxDQXlEakM7a0JBekRvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBUeXBlIH0gZnJvbSBcInByb3RvYnVmanNcIjtcblxuZXhwb3J0IGNvbnN0ICBlbnVtIFZlcmlmaWNhdGlvbkNvZGVUeXBlIHtcbiAgICBub25lLFxuICAgIHJlc2V0UHdkLFxufVxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50RG93bkNvZGUgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIGJ0bkdldENvZGU6IGNjLkJ1dHRvbiA9IG51bGw7XG5cbiAgICB2ZXJpZmlDRDogbnVtYmVyO1xuICAgIHVwZGF0ZVZlcmlmaUNEOiBOb2RlSlMuVGltZW91dDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZSA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyB0aGlzLl9kb1N0YXJ0VGltZSgpO1xuICAgIH1cbiAgICB2ZXJpZmljYXRpb25Db2RlVHlwZSA9IFZlcmlmaWNhdGlvbkNvZGVUeXBlLm5vbmU7XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgX2RvU3RhcnRUaW1lKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idG5HZXRDb2RlLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52ZXJpZmlDRCA9IDYwO1xuICAgICAgICBpZiAodGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSB0aGlzLnZlcmlmaUNEICsgJ3MnO1xuICAgICAgICB0aGlzLnZlcmlmaUNEIC09IDE7XG4gICAgICAgIHRoaXMudXBkYXRlVmVyaWZpQ0QgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZXJpZmlDRCA8IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudXBkYXRlVmVyaWZpQ0QpO1xuICAgICAgICAgICAgICAgIHRoaXMudmVyaWZpQ0QgPSA2MDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50RG93bkVuZCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYWJlbCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy51cGRhdGVWZXJpZmlDRCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25EZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gdGhpcy52ZXJpZmlDRCArICdzJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJpZmlDRC0tO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKVxuICAgIH1cbiAgICBjb3VudERvd25FbmQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5idG5HZXRDb2RlLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==