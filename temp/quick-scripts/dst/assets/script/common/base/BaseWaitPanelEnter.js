
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/base/BaseWaitPanelEnter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '49143H/s7pAfpM9B/0Hhdo3', 'BaseWaitPanelEnter');
// script/common/base/BaseWaitPanelEnter.ts

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
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const Manager_1 = require("../manager/Manager");
const { ccclass, property } = cc._decorator;
let BaseWaitPanelEnter = class BaseWaitPanelEnter extends cc.Component {
    onLoad() {
        // this.timeoutAction(); 
    }
    /**处理超时回调 */
    timeoutAction() {
        cc.tween(this.node)
            .delay(5)
            .call(() => {
            if (null != this.timeoutCb) {
                this.timeoutCb();
            }
            else {
                PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage(`TIPS.NETWAITTIMEOUT`));
            }
            let waitPanelName = this.node.name;
            // ryyl.waitPanel.closeWaitByKey(waitPanelName);
            Manager_1.Manager.uiManager.close(waitPanelName);
            this.node.destroy();
            cc.warn('等待超时处理');
        })
            .start();
    }
    registerTimeoutCb(_cb) {
        this.timeoutCb = _cb;
    }
};
BaseWaitPanelEnter = __decorate([
    ccclass
], BaseWaitPanelEnter);
exports.default = BaseWaitPanelEnter;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2Jhc2UvQmFzZVdhaXRQYW5lbEVudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQStDO0FBQy9DLGdEQUE2QztBQUc3QyxNQUFNLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHMUMsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBSXhELE1BQU07UUFDRix5QkFBeUI7SUFDN0IsQ0FBQztJQUNELFlBQVk7SUFDWixhQUFhO1FBRVQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xCLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDUixJQUFJLENBQUMsR0FBRSxFQUFFO1lBQ04sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3BCO2lCQUFJO2dCQUNELG1CQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQzthQUNsRTtZQUNELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ25DLGdEQUFnRDtZQUNoRCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFBO0lBSVosQ0FBQztJQUNELGlCQUFpQixDQUFFLEdBQUc7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDekIsQ0FBQztDQUdKLENBQUE7QUFuQ29CLGtCQUFrQjtJQUR0QyxPQUFPO0dBQ2Esa0JBQWtCLENBbUN0QztrQkFuQ29CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uLy4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlV2FpdFBhbmVsRW50ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSB0aW1lb3V0Q2I6IGFueTtcbiAgIFxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vIHRoaXMudGltZW91dEFjdGlvbigpOyBcbiAgICB9XG4gICAgLyoq5aSE55CG6LaF5pe25Zue6LCDICovXG4gICAgdGltZW91dEFjdGlvbigpe1xuICAgICAgIFxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC5kZWxheSg1KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgaWYoIG51bGwgIT0gdGhpcy50aW1lb3V0Q2IgKXtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVvdXRDYigpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoYFRJUFMuTkVUV0FJVFRJTUVPVVRgKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgd2FpdFBhbmVsTmFtZSA9IHRoaXMubm9kZS5uYW1lO1xuICAgICAgICAgICAgLy8gcnl5bC53YWl0UGFuZWwuY2xvc2VXYWl0QnlLZXkod2FpdFBhbmVsTmFtZSk7XG4gICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5jbG9zZSh3YWl0UGFuZWxOYW1lKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTsgXG4gICAgICAgICAgICBjYy53YXJuKCfnrYnlvoXotoXml7blpITnkIYnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXJ0KClcbiAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIHJlZ2lzdGVyVGltZW91dENiKCBfY2IgKXtcbiAgICAgICAgdGhpcy50aW1lb3V0Q2IgPSBfY2I7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==