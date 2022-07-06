
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeOpenView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f2468u+7j5NC5y8axWOhl2z', 'RedPakgeOpenView');
// script/redPakge/RedPakgeOpenView.ts

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
const Defines_1 = require("../framework/base/Defines");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeOpenView = class RedPakgeOpenView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.amountLab = null;
        this.nameLab = null;
        this.head = null;
        this.head2 = null;
        this.headNode = null;
        this.hongbaoSpine = null;
        this.caidaiSpine = null;
        this._data = null;
        this.isEnabledTouch = true;
    }
    static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeOpenView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args) {
            if (args[0])
                this._data = args[0];
        }
    }
    start() {
        this.hongbaoSpine.paused = true;
        this.caidaiSpine.paused = true;
        this.amountLab.node.parent.active = false;
        this.showContent();
    }
    showContent() {
        let data = this.getData();
        if (data) {
            G.Logger.log(data);
            this.isEnabledTouch = true;
            this.hongbaoSpine.setAnimation(0, "newAnimation", false);
            this.caidaiSpine.setAnimation(0, "newAnimation", false);
            this.hongbaoSpine.paused = true;
            this.caidaiSpine.paused = true;
            this.amountLab.node.parent.active = false;
            this.headNode.active = true;
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
            UtilMgr_1.UtilMgr.loadHeadImg(this.head2, data.headImgUrl, data.userId, this);
            this.amountLab.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.receiveAmount);
            this.nameLab.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        }
    }
    getData() {
        if (!this._data || !this._data[0]) {
            return null;
        }
        return this._data[0];
    }
    removeData() {
        if (this._data[0])
            this._data.splice(0, 1);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "onClickNode":
                this.showRedPakge();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    showRedPakge() {
        let data = this.getData();
        if (data && this.isEnabledTouch) {
            this.isEnabledTouch = false;
            this.hongbaoSpine.paused = false;
            this.caidaiSpine.paused = false;
            this.hongbaoSpine.setAnimation(0, "newAnimation", false);
            this.caidaiSpine.setAnimation(0, "newAnimation", false);
            this.amountLab.node.parent.active = false;
            this.scheduleOnce(() => {
                this.audioHelper.playEffect("common/audio/openRedpackge", Defines_1.BUNDLE_RESOURCES);
                this.headNode.active = false;
                this.amountLab.node.parent.active = true;
            }, 0.6);
            this.scheduleOnce(() => {
                this.removeData();
                this.showContent();
            }, 1.5);
        }
    }
    onDestroy() {
        this.unscheduleAllCallbacks();
        super.onDestroy();
    }
};
__decorate([
    property(cc.Label)
], RedPakgeOpenView.prototype, "amountLab", void 0);
__decorate([
    property(cc.Label)
], RedPakgeOpenView.prototype, "nameLab", void 0);
__decorate([
    property(cc.Sprite)
], RedPakgeOpenView.prototype, "head", void 0);
__decorate([
    property(cc.Sprite)
], RedPakgeOpenView.prototype, "head2", void 0);
__decorate([
    property(cc.Node)
], RedPakgeOpenView.prototype, "headNode", void 0);
__decorate([
    property(sp.Skeleton)
], RedPakgeOpenView.prototype, "hongbaoSpine", void 0);
__decorate([
    property(sp.Skeleton)
], RedPakgeOpenView.prototype, "caidaiSpine", void 0);
RedPakgeOpenView = __decorate([
    ccclass
], RedPakgeOpenView);
exports.default = RedPakgeOpenView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VPcGVuVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLHVEQUE2RDtBQUc3RCxvRUFBNEM7QUFFNUMsK0NBQTRDO0FBRTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsZ0JBQU07SUFBcEQ7O1FBR0ksY0FBUyxHQUFhLElBQUksQ0FBQTtRQUUxQixZQUFPLEdBQWEsSUFBSSxDQUFBO1FBRXhCLFNBQUksR0FBYyxJQUFJLENBQUE7UUFHdEIsVUFBSyxHQUFjLElBQUksQ0FBQTtRQUd2QixhQUFRLEdBQVksSUFBSSxDQUFBO1FBR3hCLGlCQUFZLEdBQWdCLElBQUksQ0FBQTtRQUdoQyxnQkFBVyxHQUFnQixJQUFJLENBQUE7UUFDdkIsVUFBSyxHQUFRLElBQUksQ0FBQztRQUNsQixtQkFBYyxHQUFRLElBQUksQ0FBQztJQWdHdkMsQ0FBQztJQTlGVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLG1DQUFtQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2RCxDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUk7UUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLElBQUksQ0FBQyxDQUFDLENB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SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDSztBQUV4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNFO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ0c7QUFHdkI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3NEQUNVO0FBR2hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7cURBQ1M7QUFuQmQsZ0JBQWdCO0lBRHBDLE9BQU87R0FDYSxnQkFBZ0IsQ0FxSHBDO2tCQXJIb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZFBha2dlT3BlblZpZXcgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGFtb3VudExhYjogY2MuTGFiZWwgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG5hbWVMYWI6IGNjLkxhYmVsID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZDogY2MuU3ByaXRlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBoZWFkMjogY2MuU3ByaXRlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaGVhZE5vZGU6IGNjLk5vZGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgaG9uZ2Jhb1NwaW5lOiBzcC5Ta2VsZXRvbiA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcbiAgICBjYWlkYWlTcGluZTogc3AuU2tlbGV0b24gPSBudWxsXG4gICAgcHJpdmF0ZSBfZGF0YTogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGlzRW5hYmxlZFRvdWNoOiBhbnkgPSB0cnVlO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInJlZFBha2dlL3ByZWZhYnMvUmVkUGFrZ2VPcGVuVmlld1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgIH1cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhcmdzWzBdKSB0aGlzLl9kYXRhID0gYXJnc1swXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuaG9uZ2Jhb1NwaW5lLnBhdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FpZGFpU3BpbmUucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbW91bnRMYWIubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoKVxuICAgIH1cbiAgICBzaG93Q29udGVudCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGEoKVxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKGRhdGEpXG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZFRvdWNoID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5ob25nYmFvU3BpbmUuc2V0QW5pbWF0aW9uKDAsIFwibmV3QW5pbWF0aW9uXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpU3BpbmUuc2V0QW5pbWF0aW9uKDAsIFwibmV3QW5pbWF0aW9uXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuaG9uZ2Jhb1NwaW5lLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNhaWRhaVNwaW5lLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFtb3VudExhYi5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGVhZE5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLmhlYWQsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS51c2VySWQsIHRoaXMpXG4gICAgICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaGVhZDIsIGRhdGEuaGVhZEltZ1VybCwgZGF0YS51c2VySWQsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLmFtb3VudExhYi5zdHJpbmcgPSBcIuKCuVwiICsgVXRpbE1nci5jaGFuZ2VNb25leShkYXRhLnJlY2VpdmVBbW91bnQpXG4gICAgICAgICAgICB0aGlzLm5hbWVMYWIuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5uaWNrbmFtZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXREYXRhKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGEgfHwgIXRoaXMuX2RhdGFbMF0pIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhWzBdO1xuICAgIH1cbiAgICByZW1vdmVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YVswXSkgdGhpcy5fZGF0YS5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJvbkNsaWNrTm9kZVwiOiB0aGlzLnNob3dSZWRQYWtnZSgpOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IEcuTG9nZ2VyLmVycm9yKFwibm8gZmluZCBidXR0b24gbmFtZSAtPiAlc1wiLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1JlZFBha2dlKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpXG4gICAgICAgIGlmIChkYXRhICYmIHRoaXMuaXNFbmFibGVkVG91Y2gpIHtcblxuICAgICAgICAgICAgdGhpcy5pc0VuYWJsZWRUb3VjaCA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmhvbmdiYW9TcGluZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2FpZGFpU3BpbmUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhvbmdiYW9TcGluZS5zZXRBbmltYXRpb24oMCwgXCJuZXdBbmltYXRpb25cIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jYWlkYWlTcGluZS5zZXRBbmltYXRpb24oMCwgXCJuZXdBbmltYXRpb25cIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5hbW91bnRMYWIubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChcImNvbW1vbi9hdWRpby9vcGVuUmVkcGFja2dlXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZE5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmFtb3VudExhYi5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMC42KVxuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVEYXRhKClcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KClcbiAgICAgICAgICAgIH0sIDEuNSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKClcbiAgICAgICAgc3VwZXIub25EZXN0cm95KClcbiAgICB9XG5cbn1cbiJdfQ==