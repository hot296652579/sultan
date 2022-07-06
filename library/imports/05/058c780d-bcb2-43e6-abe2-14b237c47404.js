"use strict";
cc._RF.push(module, '058c7gNvLJD5qviFLI3xHQE', 'AreaCode');
// script/common/component/AreaCode.ts

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
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let AreaCode = class AreaCode extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.parentNode = null;
        this.ListPrefab = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("AreaCodeInfo", (data) => {
            if (data) {
                this.label.string = data.Code;
            }
        });
    }
    start() {
    }
    onTouchEnd() {
        if (this.ListPrefab) {
            let prefab = cc.instantiate(this.ListPrefab);
            prefab.parent = this.parentNode;
        }
    }
};
__decorate([
    property(cc.Label)
], AreaCode.prototype, "label", void 0);
__decorate([
    property(cc.Node)
], AreaCode.prototype, "parentNode", void 0);
__decorate([
    property(cc.Prefab)
], AreaCode.prototype, "ListPrefab", void 0);
AreaCode = __decorate([
    ccclass
], AreaCode);
exports.default = AreaCode;

cc._RF.pop();