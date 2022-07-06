
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/turntable/TurntableView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0f2bd9wafxNUYzJeIS6fxTe', 'TurntableView');
// script/turntable/TurntableView.ts

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
var TurntableView_1;
Object.defineProperty(exports, "__esModule", { value: true });
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const Manager_1 = require("../common/manager/Manager");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const AwardWinningView_1 = __importDefault(require("./AwardWinningView"));
const HelpView_1 = __importDefault(require("./HelpView"));
const MyPrizeView_1 = __importDefault(require("./MyPrizeView"));
const PrizeItem_1 = __importDefault(require("./PrizeItem"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let TurntableView = TurntableView_1 = class TurntableView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.remainingTimes = null;
        this.itemContent = null;
        this.lightGround = null;
        this.itemPrize = null;
        this.awardTips = null;
        this.movex = 0;
        this.isCheckSpin = false;
    }
    static getPrefabUrl() {
        return "turntable/prefab/TurntableView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.awardTips.string = '';
        TurntableView_1.inst = this;
    }
    start() {
        this.activityTurntableRes(this.activityTurntableData);
        this.showLightAnimation();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args) {
            this.activityTurntableData = args;
            this.turnTableType = args.type;
        }
        G.Logger.log("args-----------------------", args);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.Play_Turntable), this.playTurntableRes);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                if (this.itemContent.getNumberOfRunningActions() > 0)
                    return;
                UtilMgr_1.UtilMgr.popWindows("OpenTurntable");
                this.closeWithAction();
                break;
            case "btn_bangzhu":
                Manager_1.Manager.uiManager.open({ type: HelpView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this.rule] });
                break;
            case "btn_myprize":
                if (this.isCheckSpin)
                    return;
                Manager_1.Manager.uiManager.open({ type: MyPrizeView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this.turnTableType] });
                break;
            case "btn_spin":
                this.reqPlayTurntable();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    activityTurntableRes(msg) {
        if (msg.statusMsg.status == 0) {
            this.remainingTimes.string = msg.remainingTimes;
            this.currentTimes = msg.remainingTimes;
            this.rule = msg.rule;
            if (msg.rotations.length > 0)
                this.updateAwardTips(msg.rotations);
            this.drawTurntable(msg.activeTurntable);
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[msg.statusMsg.status]);
        }
    }
    drawTurntable(data) {
        this.prizeData = data;
        this.itemContent.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let item = cc.instantiate(this.itemPrize);
            item.parent = this.itemContent;
            item.getComponent(PrizeItem_1.default).updateItem(data[i]);
        }
    }
    reqPlayTurntable() {
        if (this.isCheckSpin)
            return;
        this.isCheckSpin = true;
        let req = CommonService_1.protoPackage.hall.PlayTurntableReq.create({ type: this.turnTableType }); //转盘类型 1签到转盘 2充值转盘
        let buffer = CommonService_1.protoPackage.hall.PlayTurntableReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.Play_Turntable, buffer);
    }
    playTurntableRes(data) {
        if (data.statusMsg.status == 0) {
            this.runTurnTable(data);
        }
        else {
            this.isCheckSpin = false;
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    runTurnTable(data) {
        let tableId = data.tableId - 1;
        let delay = 2; //先转两圈
        let delay1 = 4; //回弹
        let startMoveRotate = 1080;
        let offsetR = this.itemContent.angle % 360;
        this.itemContent.angle = offsetR; //当前item偏差度数;
        let rotate = tableId * 360 * 0.1 + startMoveRotate * 2;
        Manager_1.Manager.globalAudio.playEffect("turntable/audio/rotate", Defines_1.BUNDLE_RESOURCES);
        this.remainingTimes.string = (this.currentTimes - 1) >= 0 ? (this.currentTimes - 1).toString() : "0";
        cc.tween(this.itemContent)
            .to(delay, { angle: -startMoveRotate }, { easing: 'sineIn' })
            .to(delay1, { angle: -rotate }, { easing: 'quadOut' })
            .delay(0.2).call(() => {
            let prizeData = this.prizeData.find(pdata => { return pdata.tableId == data.tableId; });
            this.remainingTimes.string = data.remainingTimes >= 0 ? data.remainingTimes.toString() : "0";
            this.currentTimes = data.remainingTimes;
            Manager_1.Manager.globalAudio.playEffect("turntable/audio/win", Defines_1.BUNDLE_RESOURCES);
            Manager_1.Manager.uiManager.open({ type: AwardWinningView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data, prizeData] });
        }).delay(0.5).call(() => {
            //转盘启动按钮是否可以点击  延迟0.5s 防止弹出奖励界面的时候 再次旋转
            this.isCheckSpin = false;
        })
            .start();
    }
    updateAwardTips(tipRotations) {
        let nodeWidth = 300; //显示区域宽
        let speed = 50;
        let tipsLen = tipRotations.length;
        let rand = UtilMgr_1.UtilMgr.random(0, tipsLen);
        let arr1 = tipRotations.splice(rand);
        let endTips = arr1.concat(tipRotations);
        let startTip = 0;
        this.movex = nodeWidth * 0.5 + (this.awardTips.node.width > nodeWidth ? this.awardTips.node.width : nodeWidth);
        this.awardTips.string = endTips[startTip].username + " Won " + endTips[startTip].goodsName;
        let time = Math.floor(this.movex / speed);
        this.awardTips.node.x = this.movex;
        G.Logger.log("endTips", endTips);
        let changeTips = () => {
            startTip += 1;
            if (startTip > tipsLen - 1) {
                startTip = 0;
            }
            let x = this.awardTips.node.width * 0.5 + nodeWidth * 0.5;
            if (this.awardTips.node.x >= x || this.awardTips.node.x <= -x) {
                this.awardTips.string = endTips[startTip].username + " Won " + endTips[startTip].goodsName;
                this.movex = nodeWidth * 0.5 + (this.awardTips.node.width > nodeWidth ? this.awardTips.node.width : nodeWidth);
            }
        };
        cc.tween(this.awardTips.node)
            .repeatForever(cc.tween().to(time, { position: cc.v2(-this.movex, 0) })
            .call(() => {
            this.awardTips.node.x = this.movex;
            changeTips();
        })).start();
        //改了 不用间隔十秒滚动
        // this.schedule(changeTips, 10);
    }
    showLightAnimation() {
        if (this.lightGround && this.lightGround.children[0]) {
            let light = this.lightGround.children[0];
            this.lightGround.removeAllChildren();
            for (let i = 0; i < 24; i++) {
                let lightItem = cc.instantiate(light);
                lightItem.parent = this.lightGround;
                lightItem.angle = -15 * i;
            }
            this.lightGround.children.forEach((lt, i) => {
                if (i % 4 == 0) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(0.8), cc.fadeOut(0.8), cc.delayTime(4.8))));
                }
                else if (i % 4 == 1) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.6), cc.fadeIn(0.8), cc.fadeOut(0.8), cc.delayTime(3.2))));
                }
                else if (i % 4 == 2) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3.2), cc.fadeIn(0.8), cc.fadeOut(0.8), cc.delayTime(1.6))));
                }
                else if (i % 4 == 3) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.delayTime(4.8), cc.fadeIn(0.8), cc.fadeOut(0.8))));
                }
            });
        }
    }
    onDestroy() {
        // this.unscheduleAllCallbacks();
        this.turnTableType = 0;
        TurntableView_1.inst = null;
        super.onDestroy();
    }
};
TurntableView.inst = null;
__decorate([
    property(cc.Label)
], TurntableView.prototype, "remainingTimes", void 0);
__decorate([
    property(cc.Node)
], TurntableView.prototype, "itemContent", void 0);
__decorate([
    property(cc.Node)
], TurntableView.prototype, "lightGround", void 0);
__decorate([
    property(cc.Prefab)
], TurntableView.prototype, "itemPrize", void 0);
__decorate([
    property(cc.Label)
], TurntableView.prototype, "awardTips", void 0);
TurntableView = TurntableView_1 = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TurntableView);
exports.default = TurntableView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlL1R1cm50YWJsZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0VBQXVEO0FBQ3ZELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsdURBQTZEO0FBRTdELGtFQUEyRTtBQUUzRSx1REFBb0Q7QUFDcEQsb0VBQTRDO0FBRTVDLG9FQUE0QztBQUM1QywwRUFBa0Q7QUFDbEQsMERBQWtDO0FBQ2xDLGdFQUF3QztBQUN4Qyw0REFBb0M7QUFDcEMsK0NBQTRDO0FBQzVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixhQUFhLHFCQUFsQyxNQUFxQixhQUFjLFNBQVEsZ0JBQU07SUFBakQ7O1FBS0ksbUJBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsY0FBUyxHQUFjLElBQUksQ0FBQztRQUc1QixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBS25CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7SUE4THpDLENBQUM7SUF6TFUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxnQ0FBZ0MsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzNCLGVBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FB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LEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1U7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDUTtBQUc1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNRO0FBakJWLGFBQWE7SUFGakMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsYUFBYSxDQXFOakM7a0JBck5vQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IHNlcnZlclR5cGUsIHByb3RvUGFja2FnZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IEF3YXJkV2lubmluZ1ZpZXcgZnJvbSBcIi4vQXdhcmRXaW5uaW5nVmlld1wiO1xuaW1wb3J0IEhlbHBWaWV3IGZyb20gXCIuL0hlbHBWaWV3XCI7XG5pbXBvcnQgTXlQcml6ZVZpZXcgZnJvbSBcIi4vTXlQcml6ZVZpZXdcIjtcbmltcG9ydCBQcml6ZUl0ZW0gZnJvbSBcIi4vUHJpemVJdGVtXCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVybnRhYmxlVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuXG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHJlbWFpbmluZ1RpbWVzOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpdGVtQ29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsaWdodEdyb3VuZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGl0ZW1Qcml6ZTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBhd2FyZFRpcHM6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHB1YmxpYyB0dXJuVGFibGVUeXBlOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBwcml6ZURhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUFjdGl2aXR5VHVybnRhYmxlW107XG4gICAgcHJpdmF0ZSBydWxlOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBtb3ZleDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGlzQ2hlY2tTcGluOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBhY3Rpdml0eVR1cm50YWJsZURhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSUFjdGl2aXR5VHVybnRhYmxlUmVzO1xuICAgIHByaXZhdGUgY3VycmVudFRpbWVzOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc3QgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ0dXJudGFibGUvcHJlZmFiL1R1cm50YWJsZVZpZXdcIjtcbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG4gICAgICAgIHRoaXMuYXdhcmRUaXBzLnN0cmluZyA9ICcnO1xuICAgICAgICBUdXJudGFibGVWaWV3Lmluc3QgPSB0aGlzO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmFjdGl2aXR5VHVybnRhYmxlUmVzKHRoaXMuYWN0aXZpdHlUdXJudGFibGVEYXRhKTtcbiAgICAgICAgdGhpcy5zaG93TGlnaHRBbmltYXRpb24oKTtcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlUdXJudGFibGVEYXRhID0gYXJncztcbiAgICAgICAgICAgIHRoaXMudHVyblRhYmxlVHlwZSA9IGFyZ3MudHlwZTtcbiAgICAgICAgfVxuICAgICAgICBHLkxvZ2dlci5sb2coXCJhcmdzLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIiwgYXJncyk7XG4gICAgfVxuXG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuUGxheV9UdXJudGFibGUpLCB0aGlzLnBsYXlUdXJudGFibGVSZXMpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLml0ZW1Db250ZW50LmdldE51bWJlck9mUnVubmluZ0FjdGlvbnMoKSA+IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBVdGlsTWdyLnBvcFdpbmRvd3MoXCJPcGVuVHVybnRhYmxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuX2Jhbmd6aHVcIjogTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IEhlbHBWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IFt0aGlzLnJ1bGVdIH0pOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5fbXlwcml6ZVwiOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQ2hlY2tTcGluKSByZXR1cm47XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IE15UHJpemVWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgLGFyZ3M6W3RoaXMudHVyblRhYmxlVHlwZV19KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5fc3BpblwiOiB0aGlzLnJlcVBsYXlUdXJudGFibGUoKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgcHJpdmF0ZSBhY3Rpdml0eVR1cm50YWJsZVJlcyhtc2cpOiB2b2lkIHtcbiAgICAgICAgaWYgKG1zZy5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVtYWluaW5nVGltZXMuc3RyaW5nID0gbXNnLnJlbWFpbmluZ1RpbWVzO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZXMgPSBtc2cucmVtYWluaW5nVGltZXM7XG4gICAgICAgICAgICB0aGlzLnJ1bGUgPSBtc2cucnVsZTtcbiAgICAgICAgICAgIGlmKG1zZy5yb3RhdGlvbnMubGVuZ3RoID4gMCl0aGlzLnVwZGF0ZUF3YXJkVGlwcyhtc2cucm90YXRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuZHJhd1R1cm50YWJsZShtc2cuYWN0aXZlVHVybnRhYmxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRVJST1JDT0RFW21zZy5zdGF0dXNNc2cuc3RhdHVzXSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZHJhd1R1cm50YWJsZShkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklBY3Rpdml0eVR1cm50YWJsZVtdKSB7XG4gICAgICAgIHRoaXMucHJpemVEYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5pdGVtQ29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJpemUpO1xuICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLml0ZW1Db250ZW50O1xuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUHJpemVJdGVtKS51cGRhdGVJdGVtKGRhdGFbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXFQbGF5VHVybnRhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0NoZWNrU3BpbikgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzQ2hlY2tTcGluID0gdHJ1ZTtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlBsYXlUdXJudGFibGVSZXEuY3JlYXRlKHsgdHlwZTogdGhpcy50dXJuVGFibGVUeXBlIH0pOy8v6L2s55uY57G75Z6LIDHnrb7liLDovaznm5ggMuWFheWAvOi9rOebmFxuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuUGxheVR1cm50YWJsZVJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuUGxheV9UdXJudGFibGUsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGxheVR1cm50YWJsZVJlcyhkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklQbGF5VHVybnRhYmxlUmVzKSB7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5ydW5UdXJuVGFibGUoZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzQ2hlY2tTcGluID0gZmFsc2U7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVSUk9SQ09ERVtkYXRhLnN0YXR1c01zZy5zdGF0dXNdKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcnVuVHVyblRhYmxlKGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVBsYXlUdXJudGFibGVSZXMpIHtcbiAgICAgICAgbGV0IHRhYmxlSWQgPSBkYXRhLnRhYmxlSWQgLSAxO1xuICAgICAgICBsZXQgZGVsYXkgPSAyOy8v5YWI6L2s5Lik5ZyIXG4gICAgICAgIGxldCBkZWxheTEgPSA0Ly/lm57lvLlcbiAgICAgICAgbGV0IHN0YXJ0TW92ZVJvdGF0ZSA9IDEwODA7XG4gICAgICAgIGxldCBvZmZzZXRSID0gdGhpcy5pdGVtQ29udGVudC5hbmdsZSAlIDM2MDtcbiAgICAgICAgdGhpcy5pdGVtQ29udGVudC5hbmdsZSA9IG9mZnNldFI7Ly/lvZPliY1pdGVt5YGP5beu5bqm5pWwO1xuICAgICAgICBsZXQgcm90YXRlID0gdGFibGVJZCAqIDM2MCAqIDAuMSArIHN0YXJ0TW92ZVJvdGF0ZSAqIDI7XG4gICAgICAgIE1hbmFnZXIuZ2xvYmFsQXVkaW8ucGxheUVmZmVjdChcInR1cm50YWJsZS9hdWRpby9yb3RhdGVcIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgICAgIHRoaXMucmVtYWluaW5nVGltZXMuc3RyaW5nID0gKHRoaXMuY3VycmVudFRpbWVzIC0gMSkgPj0gMCA/ICh0aGlzLmN1cnJlbnRUaW1lcyAtIDEpLnRvU3RyaW5nKCkgOiBcIjBcIjtcbiAgICAgICAgY2MudHdlZW4odGhpcy5pdGVtQ29udGVudClcbiAgICAgICAgICAgIC50byhkZWxheSwgeyBhbmdsZTogLXN0YXJ0TW92ZVJvdGF0ZSB9LCB7IGVhc2luZzogJ3NpbmVJbicgfSlcbiAgICAgICAgICAgIC50byhkZWxheTEsIHsgYW5nbGU6IC1yb3RhdGUgfSwgeyBlYXNpbmc6ICdxdWFkT3V0JyB9KVxuICAgICAgICAgICAgLmRlbGF5KDAuMikuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHByaXplRGF0YSA9IHRoaXMucHJpemVEYXRhLmZpbmQocGRhdGEgPT4geyByZXR1cm4gcGRhdGEudGFibGVJZCA9PSBkYXRhLnRhYmxlSWQgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1haW5pbmdUaW1lcy5zdHJpbmcgPSBkYXRhLnJlbWFpbmluZ1RpbWVzID49IDAgPyBkYXRhLnJlbWFpbmluZ1RpbWVzLnRvU3RyaW5nKCkgOiBcIjBcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lcyA9IGRhdGEucmVtYWluaW5nVGltZXM7XG4gICAgICAgICAgICAgICAgTWFuYWdlci5nbG9iYWxBdWRpby5wbGF5RWZmZWN0KFwidHVybnRhYmxlL2F1ZGlvL3dpblwiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQXdhcmRXaW5uaW5nVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbZGF0YSwgcHJpemVEYXRhXSB9KTtcbiAgICAgICAgICAgIH0pLmRlbGF5KDAuNSkuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgIC8v6L2s55uY5ZCv5Yqo5oyJ6ZKu5piv5ZCm5Y+v5Lul54K55Ye7ICDlu7bov58wLjVzIOmYsuatouW8ueWHuuWlluWKseeVjOmdoueahOaXtuWAmSDlho3mrKHml4vovaxcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ2hlY2tTcGluID0gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQXdhcmRUaXBzKHRpcFJvdGF0aW9uczogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JUm90YXRpb25bXSkge1xuICAgICAgICBsZXQgbm9kZVdpZHRoID0gMzAwOy8v5pi+56S65Yy65Z+f5a69XG4gICAgICAgIGxldCBzcGVlZCA9IDUwO1xuICAgICAgICBsZXQgdGlwc0xlbiA9IHRpcFJvdGF0aW9ucy5sZW5ndGg7XG4gICAgICAgIGxldCByYW5kID0gVXRpbE1nci5yYW5kb20oMCwgdGlwc0xlbik7XG4gICAgICAgIGxldCBhcnIxID0gdGlwUm90YXRpb25zLnNwbGljZShyYW5kKTtcbiAgICAgICAgbGV0IGVuZFRpcHMgPSBhcnIxLmNvbmNhdCh0aXBSb3RhdGlvbnMpO1xuICAgICAgICBsZXQgc3RhcnRUaXAgPSAwO1xuICAgICAgICB0aGlzLm1vdmV4ID0gbm9kZVdpZHRoICogMC41ICsgKHRoaXMuYXdhcmRUaXBzLm5vZGUud2lkdGggPiBub2RlV2lkdGggPyB0aGlzLmF3YXJkVGlwcy5ub2RlLndpZHRoIDogbm9kZVdpZHRoKTtcbiAgICAgICAgdGhpcy5hd2FyZFRpcHMuc3RyaW5nID0gZW5kVGlwc1tzdGFydFRpcF0udXNlcm5hbWUgKyBcIiBXb24gXCIgKyBlbmRUaXBzW3N0YXJ0VGlwXS5nb29kc05hbWU7XG4gICAgICAgIGxldCB0aW1lID0gTWF0aC5mbG9vcih0aGlzLm1vdmV4IC8gc3BlZWQpXG4gICAgICAgIHRoaXMuYXdhcmRUaXBzLm5vZGUueCA9IHRoaXMubW92ZXg7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcImVuZFRpcHNcIiwgZW5kVGlwcyk7XG5cblxuICAgICAgICBsZXQgY2hhbmdlVGlwcyA9ICgpID0+IHtcbiAgICAgICAgICAgIHN0YXJ0VGlwICs9IDE7XG4gICAgICAgICAgICBpZiAoc3RhcnRUaXAgPiB0aXBzTGVuIC0gMSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0VGlwID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5hd2FyZFRpcHMubm9kZS53aWR0aCAqIDAuNSArIG5vZGVXaWR0aCAqIDAuNTtcbiAgICAgICAgICAgIGlmICh0aGlzLmF3YXJkVGlwcy5ub2RlLnggPj0geCB8fCB0aGlzLmF3YXJkVGlwcy5ub2RlLnggPD0gLXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF3YXJkVGlwcy5zdHJpbmcgPSBlbmRUaXBzW3N0YXJ0VGlwXS51c2VybmFtZSArIFwiIFdvbiBcIiArIGVuZFRpcHNbc3RhcnRUaXBdLmdvb2RzTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmV4ID0gbm9kZVdpZHRoICogMC41ICsgKHRoaXMuYXdhcmRUaXBzLm5vZGUud2lkdGggPiBub2RlV2lkdGggPyB0aGlzLmF3YXJkVGlwcy5ub2RlLndpZHRoIDogbm9kZVdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuYXdhcmRUaXBzLm5vZGUpXG4gICAgICAgICAgICAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLnRvKHRpbWUsIHsgcG9zaXRpb246IGNjLnYyKC10aGlzLm1vdmV4LCAwKSB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZFRpcHMubm9kZS54ID0gdGhpcy5tb3ZleDtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlVGlwcygpO1xuICAgICAgICAgICAgICAgIH0pKS5zdGFydCgpXG5cbiAgICAgICAgLy/mlLnkuoYg5LiN55So6Ze06ZqU5Y2B56eS5rua5YqoXG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGUoY2hhbmdlVGlwcywgMTApO1xuICAgIH1cbiAgICBzaG93TGlnaHRBbmltYXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmxpZ2h0R3JvdW5kICYmIHRoaXMubGlnaHRHcm91bmQuY2hpbGRyZW5bMF0pIHtcbiAgICAgICAgICAgIGxldCBsaWdodCA9IHRoaXMubGlnaHRHcm91bmQuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICB0aGlzLmxpZ2h0R3JvdW5kLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlnaHRJdGVtID0gY2MuaW5zdGFudGlhdGUobGlnaHQpO1xuICAgICAgICAgICAgICAgIGxpZ2h0SXRlbS5wYXJlbnQgPSB0aGlzLmxpZ2h0R3JvdW5kO1xuICAgICAgICAgICAgICAgIGxpZ2h0SXRlbS5hbmdsZSA9IC0xNSAqIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpZ2h0R3JvdW5kLmNoaWxkcmVuLmZvckVhY2goKGx0LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGkgJSA0ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbHQucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZmFkZUluKDAuOCksIGNjLmZhZGVPdXQoMC44KSwgY2MuZGVsYXlUaW1lKDQuOCkpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpICUgNCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGx0LnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZSgxLjYpLCBjYy5mYWRlSW4oMC44KSwgY2MuZmFkZU91dCgwLjgpLCBjYy5kZWxheVRpbWUoMy4yKSkpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgJSA0ID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbHQucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDMuMiksIGNjLmZhZGVJbigwLjgpLCBjYy5mYWRlT3V0KDAuOCksIGNjLmRlbGF5VGltZSgxLjYpKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSAlIDQgPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBsdC5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoNC44KSwgY2MuZmFkZUluKDAuOCksIGNjLmZhZGVPdXQoMC44KSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgLy8gdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIHRoaXMudHVyblRhYmxlVHlwZSA9IDA7XG4gICAgICAgIFR1cm50YWJsZVZpZXcuaW5zdCA9IG51bGw7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==