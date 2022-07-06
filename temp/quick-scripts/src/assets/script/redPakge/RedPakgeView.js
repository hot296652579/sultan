"use strict";
cc._RF.push(module, '7ca50vkGvdE3Kv4o/7p5py3', 'RedPakgeView');
// script/redPakge/RedPakgeView.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RedPakgeView = class RedPakgeView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.sendNode = null;
        this.recordsNode = null;
        this.receiveNode = null;
        this.recordsDetailNode = null;
    }
    static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.sendNode.active = false;
        this.recordsNode.active = false;
        this.receiveNode.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    start() {
        this.showSend();
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "send":
                this.showSend();
                break;
            case "records":
                this.showRecords();
                break;
            case "receive":
                this.showReceive();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    showSend() {
        this.sendNode.active = true;
        this.recordsNode.active = false;
        this.receiveNode.active = false;
        this.recordsDetailNode.active = false;
    }
    showRecords() {
        this.sendNode.active = false;
        this.recordsNode.active = true;
        this.receiveNode.active = false;
        this.recordsDetailNode.active = false;
    }
    showReceive() {
        this.sendNode.active = false;
        this.recordsNode.active = false;
        this.receiveNode.active = true;
        this.recordsDetailNode.active = false;
    }
    update(dt) {
        // G.Logger.log(this.node.width,this.content.width)
    }
};
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "sendNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "recordsNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "receiveNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeView.prototype, "recordsDetailNode", void 0);
RedPakgeView = __decorate([
    ccclass
], RedPakgeView);
exports.default = RedPakgeView;

cc._RF.pop();