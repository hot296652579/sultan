"use strict";
cc._RF.push(module, '91c9aKr6rhC/aIfBPluoBZY', 'AllowEventTistribution');
// script/common/eventDistribution/AllowEventTistribution.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let AllowEventTistribution = class AllowEventTistribution extends cc.Component {
    constructor() {
        super(...arguments);
        //是否吞噬点击事件
        this._isSwallow = false;
    }
    onEnable() {
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(this._isSwallow);
        }
    }
};
AllowEventTistribution = __decorate([
    ccclass
], AllowEventTistribution);
exports.default = AllowEventTistribution;

cc._RF.pop();