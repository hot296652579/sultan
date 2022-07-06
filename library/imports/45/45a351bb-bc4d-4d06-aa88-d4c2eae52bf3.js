"use strict";
cc._RF.push(module, '45a35G7vE1NBqqI1MLq5Svz', 'PrefabLoad');
// script/common/component/PrefabLoad.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
/**
 * 预加载prefab资源
 */
let PrefabLoad = class PrefabLoad extends cc.Component {
    constructor() {
        super(...arguments);
        this.PrefabList = [];
        // update (dt) {}
    }
    onLoad() {
    }
    start() {
    }
};
__decorate([
    property(cc.Prefab)
], PrefabLoad.prototype, "PrefabList", void 0);
PrefabLoad = __decorate([
    ccclass
], PrefabLoad);
exports.default = PrefabLoad;

cc._RF.pop();