
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/agentPot/AgentPot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'df5a8eByw1NRbxJy2oJPDXK', 'AgentPot');
// script/agentPot/AgentPot.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let AgentPot = class AgentPot extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.showNode = null;
        this.Label = null;
        this.m_isLoaded = false;
        this.m_value = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.m_isLoaded = true;
        this.showNode.active = false;
        this.node.parent.active = true;
        this.change(this.m_value);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("agentpot.change", this.change);
    }
    change(data) {
        if (data !== undefined && data !== null && data != -1) {
            this.showNode.active = true;
            this.Label.string = UtilMgr_1.UtilMgr.changeMoney(data);
        }
        else {
            this.showNode.active = false;
        }
    }
    show(args) {
        super.show(args);
    }
    setData(value) {
        this.m_value = value;
        if (this.m_isLoaded) {
            this.change(value);
        }
    }
    start() {
        if (this.showNode) {
            // this.showNode.getChildByName("labAgentPot").getComponent(cc.Label).language = i18n.AGENT.AGENTPOT;
        }
    }
};
__decorate([
    property(cc.Node)
], AgentPot.prototype, "showNode", void 0);
__decorate([
    property(cc.Label)
], AgentPot.prototype, "Label", void 0);
AgentPot = __decorate([
    ccclass
], AgentPot);
exports.default = AgentPot;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYWdlbnRQb3QvQWdlbnRQb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRUFBNEM7QUFDNUMsK0NBQTRDO0FBSTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxnQkFBTTtJQUE1Qzs7UUFJSSxhQUFRLEdBQVksSUFBSSxDQUFDO1FBSXpCLFVBQUssR0FBYSxJQUFJLENBQUM7UUFFZixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLFlBQU8sR0FBVyxJQUFJLENBQUM7UUEyQy9CLGlCQUFpQjtJQUNyQixDQUFDO0lBekNHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUk7UUFDUCxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUk7UUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YscUdBQXFHO1NBQ3hHO0lBQ0wsQ0FBQztDQUlKLENBQUE7QUFuREc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswQ0FDTztBQUl6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VDQUNJO0FBUk4sUUFBUTtJQUQ1QixPQUFPO0dBQ2EsUUFBUSxDQXVENUI7a0JBdkRvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50Q29tcG9uZW50IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9FdmVudENvbXBvbmVudFwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFnZW50UG90IGV4dGVuZHMgVUlWaWV3IHtcblxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2hvd05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgbV9pc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgbV92YWx1ZTogbnVtYmVyID0gbnVsbDtcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5tX2lzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlKHRoaXMubV92YWx1ZSk7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJhZ2VudHBvdC5jaGFuZ2VcIiwgdGhpcy5jaGFuZ2UpO1xuICAgIH1cblxuICAgIGNoYW5nZShkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhICE9PSB1bmRlZmluZWQgJiYgZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLkxhYmVsLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpXG4gICAgfVxuXG4gICAgc2V0RGF0YSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubV92YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5tX2lzTG9hZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd05vZGUpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJBZ2VudFBvdFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gaTE4bi5BR0VOVC5BR0VOVFBPVDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cblxuIl19