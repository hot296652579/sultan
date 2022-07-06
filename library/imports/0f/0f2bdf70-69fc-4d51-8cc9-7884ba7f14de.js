"use strict";
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