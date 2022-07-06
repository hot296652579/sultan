"use strict";
cc._RF.push(module, '3dc6f63JrZALoHMzrjf3sUI', 'ClickPlayEffets');
// script/hall/ClickPlayEffets.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let ClickPlayEffets = class ClickPlayEffets extends cc.Component {
    constructor() {
        super(...arguments);
        this.liziPrefab = null;
        this.liziPool = new cc.NodePool();
    }
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.toTouchHandel, this);
        this.node.zIndex = 9999;
    }
    toTouchHandel(event) {
        let pos = event.getLocation();
        pos = this.node.convertToNodeSpaceAR(pos);
        let lizi = this.getLizi();
        lizi.setPosition(pos);
        lizi.active = true;
        lizi.getComponent(cc.ParticleSystem).resetSystem();
        this.scheduleOnce(() => {
            this.receive(lizi);
        }, 1);
        dispatch('onTouchHand');
    }
    receive(node) {
        node.removeFromParent();
        this.liziPool.put(node);
    }
    getLizi() {
        let lizi = this.liziPool.get() || cc.instantiate(this.liziPrefab);
        this.node.addChild(lizi);
        return lizi;
    }
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.toTouchHandel, this);
    }
};
__decorate([
    property(cc.Prefab)
], ClickPlayEffets.prototype, "liziPrefab", void 0);
ClickPlayEffets = __decorate([
    ccclass
], ClickPlayEffets);
exports.default = ClickPlayEffets;

cc._RF.pop();