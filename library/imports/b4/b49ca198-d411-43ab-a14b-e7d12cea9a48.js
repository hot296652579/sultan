"use strict";
cc._RF.push(module, 'b49caGY1BFDq6FL59Es6ppI', 'MoveRepeatForever');
// script/common/component/MoveRepeatForever.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let moveType = cc.Enum({
    horizontal: 0,
    vertical: 1
});
let MoveRepeatForever = class MoveRepeatForever extends cc.Component {
    constructor() {
        super(...arguments);
        this.moveType = moveType.horizontal;
        this.temp = 10;
        this.tweenAnim = null;
        // update (dt) {}
    }
    onLoad() {
    }
    start() {
    }
    onDisable() {
        this.node.stopAllActions();
    }
    onEnable() {
        this.node.stopAllActions();
        if (this.moveType === moveType.horizontal) {
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.v2(this.temp, 0)), cc.moveBy(0.5, cc.v2(-this.temp, 0)))));
        }
        else {
            this.node.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, cc.v2(0, this.temp)), cc.moveBy(0.5, cc.v2(0, -this.temp)))));
        }
    }
};
__decorate([
    property({
        type: moveType
    })
], MoveRepeatForever.prototype, "moveType", void 0);
MoveRepeatForever = __decorate([
    ccclass
], MoveRepeatForever);
exports.default = MoveRepeatForever;

cc._RF.pop();