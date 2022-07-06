"use strict";
cc._RF.push(module, '7ba82oxPEpErqFOZA7A3l7B', 'CrashEscapeItemNode');
// games/crash/script/view/CrashEscapeItemNode.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const ACTION_TIME = 3;
const FLY_X = 100;
const { ccclass, property } = cc._decorator;
let CrashEscapeItemNode = class CrashEscapeItemNode extends cc.Component {
    constructor() {
        super(...arguments);
        this.m_nick = null;
        this.m_rate = null;
        this.m_originPos = null;
        this.m_tween = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.getComponent(cc.Label).string = "";
    }
    start() {
    }
    onEnable() {
        this.setView();
    }
    setOriginPos(pos) {
        this.node.setPosition(pos);
        this.m_originPos = pos;
    }
    setData(nick, rate) {
        this.m_nick = nick;
        this.m_rate = rate;
    }
    setView() {
        // this.node.getComponent(cc.Label).string = `● ${this.m_nick}@${UtilMgr.toFixed(this.m_rate / 100, 2)}x`;
        this.node.getComponent(cc.Label).string = `${this.m_nick}@${UtilMgr_1.UtilMgr.toFixed(this.m_rate / 100, 2)}x`;
    }
    clear() {
        this.m_nick = null;
        this.m_rate = null;
        this.m_originPos = null;
        this.stopAnim();
    }
    runDrop(completeCallback) {
        this.setView();
        this.stopAnim();
        this.m_tween = cc.tween(this.node)
            .to(ACTION_TIME, { y: 0, opacity: 50 })
            .call(() => {
            this.stopAnim();
            completeCallback && completeCallback();
        })
            .start();
    }
    runFly(completeCallback) {
        this.setView();
        this.stopAnim();
        let residuePercent = this.node.y / this.m_originPos.y;
        let residueTime = UtilMgr_1.UtilMgr.toFixed(ACTION_TIME * residuePercent, 2);
        let residueX = UtilMgr_1.UtilMgr.toFixed(FLY_X * residuePercent, 2);
        if (this.node.y > this.m_originPos.y) {
            this.node.y = this.m_originPos.y;
        }
        let x = this.m_originPos.x - residueX;
        if (x < 0) {
            x = 0;
        }
        this.m_tween = cc.tween(this.node)
            .to(residueTime, { x: x, y: 0, opacity: 50 })
            .call(() => {
            this.stopAnim();
            completeCallback && completeCallback();
        })
            .start();
    }
    stopAnim() {
        if (this.m_tween) {
            this.m_tween.stop();
            this.m_tween = null;
        }
    }
};
CrashEscapeItemNode = __decorate([
    ccclass
], CrashEscapeItemNode);
exports.default = CrashEscapeItemNode;

cc._RF.pop();