"use strict";
cc._RF.push(module, 'df5a8eByw1NRbxJy2oJPDXK', 'AgentPot');
// script/agentPot/AgentPot.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let AgentPot = class AgentPot extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.showNode = null;
        this.Label = null;
        this.m_isLoaded = false;
        this.m_value = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.m_isLoaded = true;
        this.showNode.active = false;
        this.node.parent.active = true;
        this.change(this.m_value);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("agentpot.change", this.change);
    }
    change(data) {
        if (data !== undefined && data !== null && data != -1) {
            this.showNode.active = true;
            this.Label.string = UtilMgr_1.UtilMgr.changeMoney(data);
        }
        else {
            this.showNode.active = false;
        }
    }
    show(args) {
        super.show(args);
    }
    setData(value) {
        this.m_value = value;
        if (this.m_isLoaded) {
            this.change(value);
        }
    }
    start() {
        if (this.showNode) {
            // this.showNode.getChildByName("labAgentPot").getComponent(cc.Label).language = i18n.AGENT.AGENTPOT;
        }
    }
};
__decorate([
    property(cc.Node)
], AgentPot.prototype, "showNode", void 0);
__decorate([
    property(cc.Label)
], AgentPot.prototype, "Label", void 0);
AgentPot = __decorate([
    ccclass
], AgentPot);
exports.default = AgentPot;

cc._RF.pop();