
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/activity/MissionItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7f08HyPbxGbY5jZQ4D3H1w', 'MissionItem');
// script/activity/MissionItem.ts

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
const UserData_1 = __importDefault(require("../data/UserData"));
const Defines_1 = require("../framework/base/Defines");
const DateUtils_1 = __importDefault(require("../framework/extentions/DateUtils"));
const Manager_1 = require("../common/manager/Manager");
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const { ccclass, property } = cc._decorator;
const missionInfo = {
    //7天签到
    0: {
        title: 'Seven day sign in task',
        titlePath: 'mission/image/zi_a1',
        framePath: 'mission/image/icon_g1',
        roule: 'Continuously check in the website within a fixed time to obtain gold coins xxxx'
    },
    //30天签到
    1: {
        title: '30 day sign in task',
        titlePath: 'mission/image/zi_a2',
        framePath: 'mission/image/icon_g2',
        roule: 'Continuously check in the website within a fixed time to obtain gold coins xxxx'
    },
    //充值任务
    2: {
        title: 'Recharge task',
        titlePath: 'mission/image/zi_a3',
        framePath: 'mission/image/icon_g3',
        roule: 'You can receive gold coins when your recharge reaches a certain amount within a certain period of time,coins xxxx'
    },
    //推广任务
    3: {
        title: 'Promotion task',
        titlePath: 'mission/image/zi_a4',
        framePath: 'mission/image/icon_g4',
        roule: 'You can receive gold coins when the number of promoters reaches a certain amount within a certain period of time,coins xxxx'
    },
    //下线充值任务
    4: {
        title: 'Offline recharge task',
        titlePath: 'mission/image/zi_a5',
        framePath: 'mission/image/icon_g5',
        roule: 'You can receive gold coins when your accumulated recharge reaches a certain amount during the promotion period,coins xxxx'
    }
};
let MissionItem = class MissionItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.bg = null;
        this.bgCheck = null;
        this.iconFrame = null;
        this.iconTitle = null;
        this.labRule = null;
        this.labTime = null;
        this.progressBar = null;
        this.labBar = null;
        this.btnDraw = null;
        this.btnSigin = null;
        this._itemId = 0;
        this.missionId = null;
        this._itemClickCallback = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.opacity = 0;
        this.bg.active = true;
        this.btnDraw.active = false;
        // this.bgCheck.active = false
        this.btnSigin.active = this.checkIsLogin();
    }
    checkIsLogin() {
        let userData = G.DataMgr.get(UserData_1.default);
        if (!userData.id) {
            return true;
        }
        return false;
    }
    updateItem(data, itemId, onClickCallback) {
        this._itemId = itemId;
        this.missionId = data.missionId;
        this._itemClickCallback = onClickCallback;
        this.updateData(data);
    }
    updateData(data) {
        if (data) {
            let missionId = data.missionId;
            let beginTime = data.beginTime;
            let endTime = data.endTime;
            let reward = data.reward;
            let targetProgess = Number(data.targetProgress);
            let curProgress = Number(data.curProgress);
            let info = missionInfo[missionId];
            let formatBeginTime = DateUtils_1.default.getYMD(beginTime);
            let formatEndTime = DateUtils_1.default.getYMD(endTime);
            let framePath = info.framePath;
            let titlePath = info.titlePath;
            // console.log('结束时间:' + formatEndTime);
            let rouleStr = info.roule;
            rouleStr = String(rouleStr).replace(/xxxx/g, String(reward));
            if (data.endTime == 0)
                formatEndTime = '';
            this.labTime.string = `${formatBeginTime} - ${formatEndTime}`;
            this.labRule.string = rouleStr;
            let bar = this.progressBar.getComponent(cc.Sprite);
            bar.fillRange = Number(curProgress / targetProgess);
            this.btnDraw.active = curProgress == targetProgess;
            this.labBar.string = Math.floor(curProgress) + '/' + Math.floor(targetProgess);
            this.iconFrame.loadImage({ url: framePath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
            this.iconTitle.loadImage({ url: titlePath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
        }
    }
    onItemClick(event, type) {
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId);
        }
        // console.log(event);
    }
    onClickSigin() {
        Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Node)
], MissionItem.prototype, "bg", void 0);
__decorate([
    property(cc.Node)
], MissionItem.prototype, "bgCheck", void 0);
__decorate([
    property(cc.Sprite)
], MissionItem.prototype, "iconFrame", void 0);
__decorate([
    property(cc.Sprite)
], MissionItem.prototype, "iconTitle", void 0);
__decorate([
    property(cc.Label)
], MissionItem.prototype, "labRule", void 0);
__decorate([
    property(cc.Label)
], MissionItem.prototype, "labTime", void 0);
__decorate([
    property(cc.Sprite)
], MissionItem.prototype, "progressBar", void 0);
__decorate([
    property(cc.Label)
], MissionItem.prototype, "labBar", void 0);
__decorate([
    property(cc.Node)
], MissionItem.prototype, "btnDraw", void 0);
__decorate([
    property(cc.Node)
], MissionItem.prototype, "btnSigin", void 0);
MissionItem = __decorate([
    ccclass
], MissionItem);
exports.default = MissionItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYWN0aXZpdHkvTWlzc2lvbkl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBd0M7QUFDeEMsdURBQTZEO0FBQzdELGtGQUEwRDtBQUUxRCx1REFBb0Q7QUFDcEQseUVBQWlEO0FBRWpELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUM1QyxNQUFNLFdBQVcsR0FBRztJQUNoQixNQUFNO0lBQ04sQ0FBQyxFQUFFO1FBQ0MsS0FBSyxFQUFFLHdCQUF3QjtRQUMvQixTQUFTLEVBQUUscUJBQXFCO1FBQ2hDLFNBQVMsRUFBRSx1QkFBdUI7UUFDbEMsS0FBSyxFQUFFLGlGQUFpRjtLQUMzRjtJQUNELE9BQU87SUFDUCxDQUFDLEVBQUU7UUFDQyxLQUFLLEVBQUUscUJBQXFCO1FBQzVCLFNBQVMsRUFBRSxxQkFBcUI7UUFDaEMsU0FBUyxFQUFFLHVCQUF1QjtRQUNsQyxLQUFLLEVBQUUsaUZBQWlGO0tBQzNGO0lBQ0QsTUFBTTtJQUNOLENBQUMsRUFBRTtRQUNDLEtBQUssRUFBRSxlQUFlO1FBQ3RCLFNBQVMsRUFBRSxxQkFBcUI7UUFDaEMsU0FBUyxFQUFFLHVCQUF1QjtRQUNsQyxLQUFLLEVBQUUsbUhBQW1IO0tBQzdIO0lBQ0QsTUFBTTtJQUNOLENBQUMsRUFBRTtRQUNDLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsU0FBUyxFQUFFLHFCQUFxQjtRQUNoQyxTQUFTLEVBQUUsdUJBQXVCO1FBQ2xDLEtBQUssRUFBRSw2SEFBNkg7S0FDdkk7SUFDRCxRQUFRO0lBQ1IsQ0FBQyxFQUFFO1FBQ0MsS0FBSyxFQUFFLHVCQUF1QjtRQUM5QixTQUFTLEVBQUUscUJBQXFCO1FBQ2hDLFNBQVMsRUFBRSx1QkFBdUI7UUFDbEMsS0FBSyxFQUFFLDJIQUEySDtLQUNySTtDQUNKLENBQUE7QUFHRCxJQUFxQixXQUFXLEdBQWhD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RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FHSixDQUFBO0FBekhHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dUNBQ0E7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDSztBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNPO0FBRzNCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ087QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs0Q0FDSztBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzRDQUNLO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ1M7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyQ0FDSTtBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNLO0FBR3ZCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ007QUE5QlAsV0FBVztJQUQvQixPQUFPO0dBQ2EsV0FBVyxDQTRIL0I7a0JBNUhvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9kYXRhL1VzZXJEYXRhXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCBEYXRlVXRpbHMgZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlbnRpb25zL0RhdGVVdGlsc1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IExvZ2luTmV3VmlldyBmcm9tIFwiLi4vbG9naW4vTG9naW5OZXdWaWV3XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBtaXNzaW9uSW5mbyA9IHtcbiAgICAvLzflpKnnrb7liLBcbiAgICAwOiB7XG4gICAgICAgIHRpdGxlOiAnU2V2ZW4gZGF5IHNpZ24gaW4gdGFzaycsXG4gICAgICAgIHRpdGxlUGF0aDogJ21pc3Npb24vaW1hZ2UvemlfYTEnLFxuICAgICAgICBmcmFtZVBhdGg6ICdtaXNzaW9uL2ltYWdlL2ljb25fZzEnLFxuICAgICAgICByb3VsZTogJ0NvbnRpbnVvdXNseSBjaGVjayBpbiB0aGUgd2Vic2l0ZSB3aXRoaW4gYSBmaXhlZCB0aW1lIHRvIG9idGFpbiBnb2xkIGNvaW5zIHh4eHgnXG4gICAgfSxcbiAgICAvLzMw5aSp562+5YiwXG4gICAgMToge1xuICAgICAgICB0aXRsZTogJzMwIGRheSBzaWduIGluIHRhc2snLFxuICAgICAgICB0aXRsZVBhdGg6ICdtaXNzaW9uL2ltYWdlL3ppX2EyJyxcbiAgICAgICAgZnJhbWVQYXRoOiAnbWlzc2lvbi9pbWFnZS9pY29uX2cyJyxcbiAgICAgICAgcm91bGU6ICdDb250aW51b3VzbHkgY2hlY2sgaW4gdGhlIHdlYnNpdGUgd2l0aGluIGEgZml4ZWQgdGltZSB0byBvYnRhaW4gZ29sZCBjb2lucyB4eHh4J1xuICAgIH0sXG4gICAgLy/lhYXlgLzku7vliqFcbiAgICAyOiB7XG4gICAgICAgIHRpdGxlOiAnUmVjaGFyZ2UgdGFzaycsXG4gICAgICAgIHRpdGxlUGF0aDogJ21pc3Npb24vaW1hZ2UvemlfYTMnLFxuICAgICAgICBmcmFtZVBhdGg6ICdtaXNzaW9uL2ltYWdlL2ljb25fZzMnLFxuICAgICAgICByb3VsZTogJ1lvdSBjYW4gcmVjZWl2ZSBnb2xkIGNvaW5zIHdoZW4geW91ciByZWNoYXJnZSByZWFjaGVzIGEgY2VydGFpbiBhbW91bnQgd2l0aGluIGEgY2VydGFpbiBwZXJpb2Qgb2YgdGltZSxjb2lucyB4eHh4J1xuICAgIH0sXG4gICAgLy/mjqjlub/ku7vliqFcbiAgICAzOiB7XG4gICAgICAgIHRpdGxlOiAnUHJvbW90aW9uIHRhc2snLFxuICAgICAgICB0aXRsZVBhdGg6ICdtaXNzaW9uL2ltYWdlL3ppX2E0JyxcbiAgICAgICAgZnJhbWVQYXRoOiAnbWlzc2lvbi9pbWFnZS9pY29uX2c0JyxcbiAgICAgICAgcm91bGU6ICdZb3UgY2FuIHJlY2VpdmUgZ29sZCBjb2lucyB3aGVuIHRoZSBudW1iZXIgb2YgcHJvbW90ZXJzIHJlYWNoZXMgYSBjZXJ0YWluIGFtb3VudCB3aXRoaW4gYSBjZXJ0YWluIHBlcmlvZCBvZiB0aW1lLGNvaW5zIHh4eHgnXG4gICAgfSxcbiAgICAvL+S4i+e6v+WFheWAvOS7u+WKoVxuICAgIDQ6IHtcbiAgICAgICAgdGl0bGU6ICdPZmZsaW5lIHJlY2hhcmdlIHRhc2snLFxuICAgICAgICB0aXRsZVBhdGg6ICdtaXNzaW9uL2ltYWdlL3ppX2E1JyxcbiAgICAgICAgZnJhbWVQYXRoOiAnbWlzc2lvbi9pbWFnZS9pY29uX2c1JyxcbiAgICAgICAgcm91bGU6ICdZb3UgY2FuIHJlY2VpdmUgZ29sZCBjb2lucyB3aGVuIHlvdXIgYWNjdW11bGF0ZWQgcmVjaGFyZ2UgcmVhY2hlcyBhIGNlcnRhaW4gYW1vdW50IGR1cmluZyB0aGUgcHJvbW90aW9uIHBlcmlvZCxjb2lucyB4eHh4J1xuICAgIH1cbn1cblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Npb25JdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmdDaGVjazogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaWNvbkZyYW1lOiBjYy5TcHJpdGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGljb25UaXRsZTogY2MuU3ByaXRlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYlJ1bGU6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYlRpbWU6IGNjLkxhYmVsID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcm9ncmVzc0JhcjogY2MuU3ByaXRlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxhYkJhcjogY2MuTGFiZWwgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5EcmF3OiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuU2lnaW46IGNjLk5vZGUgPSBudWxsXG5cbiAgICBfaXRlbUlkOiBudW1iZXIgPSAwXG4gICAgbWlzc2lvbklkOiBudW1iZXIgPSBudWxsXG5cbiAgICBfaXRlbUNsaWNrQ2FsbGJhY2s6IGFueSA9IG51bGxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLmJnLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5idG5EcmF3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLmJnQ2hlY2suYWN0aXZlID0gZmFsc2VcblxuICAgICAgICB0aGlzLmJ0blNpZ2luLmFjdGl2ZSA9IHRoaXMuY2hlY2tJc0xvZ2luKCk7XG4gICAgfVxuXG4gICAgY2hlY2tJc0xvZ2luKCkge1xuICAgICAgICBsZXQgdXNlckRhdGEgPSBHLkRhdGFNZ3IuZ2V0KFVzZXJEYXRhKTtcbiAgICAgICAgaWYgKCF1c2VyRGF0YS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbShkYXRhLCBpdGVtSWQsIG9uQ2xpY2tDYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9pdGVtSWQgPSBpdGVtSWRcbiAgICAgICAgdGhpcy5taXNzaW9uSWQgPSBkYXRhLm1pc3Npb25JZFxuICAgICAgICB0aGlzLl9pdGVtQ2xpY2tDYWxsYmFjayA9IG9uQ2xpY2tDYWxsYmFja1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGF0YShkYXRhKVxuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoZGF0YTogTVNULk1pc3Npb25JbmZvKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBsZXQgbWlzc2lvbklkID0gZGF0YS5taXNzaW9uSWQ7XG4gICAgICAgICAgICBsZXQgYmVnaW5UaW1lID0gZGF0YS5iZWdpblRpbWU7XG4gICAgICAgICAgICBsZXQgZW5kVGltZSA9IGRhdGEuZW5kVGltZTtcbiAgICAgICAgICAgIGxldCByZXdhcmQgPSBkYXRhLnJld2FyZDtcbiAgICAgICAgICAgIGxldCB0YXJnZXRQcm9nZXNzID0gTnVtYmVyKGRhdGEudGFyZ2V0UHJvZ3Jlc3MpO1xuICAgICAgICAgICAgbGV0IGN1clByb2dyZXNzID0gTnVtYmVyKGRhdGEuY3VyUHJvZ3Jlc3MpO1xuXG4gICAgICAgICAgICBsZXQgaW5mbyA9IG1pc3Npb25JbmZvW21pc3Npb25JZF07XG4gICAgICAgICAgICBsZXQgZm9ybWF0QmVnaW5UaW1lID0gRGF0ZVV0aWxzLmdldFlNRChiZWdpblRpbWUpO1xuICAgICAgICAgICAgbGV0IGZvcm1hdEVuZFRpbWUgPSBEYXRlVXRpbHMuZ2V0WU1EKGVuZFRpbWUpO1xuICAgICAgICAgICAgbGV0IGZyYW1lUGF0aCA9IGluZm8uZnJhbWVQYXRoO1xuICAgICAgICAgICAgbGV0IHRpdGxlUGF0aCA9IGluZm8udGl0bGVQYXRoO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+e7k+adn+aXtumXtDonICsgZm9ybWF0RW5kVGltZSk7XG4gICAgICAgICAgICBsZXQgcm91bGVTdHIgPSBpbmZvLnJvdWxlO1xuICAgICAgICAgICAgcm91bGVTdHIgPSBTdHJpbmcocm91bGVTdHIpLnJlcGxhY2UoL3h4eHgvZywgU3RyaW5nKHJld2FyZCkpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5lbmRUaW1lID09IDApXG4gICAgICAgICAgICAgICAgZm9ybWF0RW5kVGltZSA9ICcnO1xuXG4gICAgICAgICAgICB0aGlzLmxhYlRpbWUuc3RyaW5nID0gYCR7Zm9ybWF0QmVnaW5UaW1lfSAtICR7Zm9ybWF0RW5kVGltZX1gXG5cbiAgICAgICAgICAgIHRoaXMubGFiUnVsZS5zdHJpbmcgPSByb3VsZVN0cjtcblxuICAgICAgICAgICAgbGV0IGJhciA9IHRoaXMucHJvZ3Jlc3NCYXIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICBiYXIuZmlsbFJhbmdlID0gTnVtYmVyKGN1clByb2dyZXNzIC8gdGFyZ2V0UHJvZ2Vzcyk7XG4gICAgICAgICAgICB0aGlzLmJ0bkRyYXcuYWN0aXZlID0gY3VyUHJvZ3Jlc3MgPT0gdGFyZ2V0UHJvZ2VzcztcbiAgICAgICAgICAgIHRoaXMubGFiQmFyLnN0cmluZyA9IE1hdGguZmxvb3IoY3VyUHJvZ3Jlc3MpICsgJy8nICsgTWF0aC5mbG9vcih0YXJnZXRQcm9nZXNzKVxuXG4gICAgICAgICAgICB0aGlzLmljb25GcmFtZS5sb2FkSW1hZ2UoeyB1cmw6IGZyYW1lUGF0aCwgdmlldzogdGhpcywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pXG4gICAgICAgICAgICB0aGlzLmljb25UaXRsZS5sb2FkSW1hZ2UoeyB1cmw6IHRpdGxlUGF0aCwgdmlldzogdGhpcywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudCwgdHlwZSkge1xuICAgICAgICBpZiAodGhpcy5faXRlbUNsaWNrQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1DbGlja0NhbGxiYWNrKHRoaXMuX2l0ZW1JZClcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgfVxuXG4gICAgb25DbGlja1NpZ2luKCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbei/m+WFpVNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkVudGVyU3Jjb2xsVmlldygpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pysSXRlbeemu+W8gFNjcm9sbFZpZXfnmoTml7blgJnlm57osINcbiAgICAgKi9cbiAgICBvbkV4aXRTY3JvbGxWaWV3KCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==