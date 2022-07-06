"use strict";
cc._RF.push(module, '8a807gEWPZFFrM5CQE9vCgv', 'AreaCodeList');
// script/common/component/AreaCodeList.ts

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
const AreaCodeConfig_1 = require("./AreaCodeConfig");
const ScroViewLogic_1 = __importDefault(require("./ScroViewLogic"));
const { ccclass, property } = cc._decorator;
let AreaCodeList = class AreaCodeList extends cc.Component {
    constructor() {
        super(...arguments);
        this.bg = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            // this.node.destroy();
            this.hide();
        }, this);
    }
    show() {
        this.node.active = true;
    }
    hide() {
        this.node.active = false;
    }
    start() {
        if (AreaCodeConfig_1.AreaCodeConfig.Config) {
            this.getComponent(ScroViewLogic_1.default).initUI(AreaCodeConfig_1.AreaCodeConfig.Config);
        }
    }
};
__decorate([
    property(cc.Node)
], AreaCodeList.prototype, "bg", void 0);
AreaCodeList = __decorate([
    ccclass
], AreaCodeList);
exports.default = AreaCodeList;

cc._RF.pop();