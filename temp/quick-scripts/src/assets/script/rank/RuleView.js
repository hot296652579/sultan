"use strict";
cc._RF.push(module, '4f9ddhu5wxOOJDJ1/oIETSn', 'RuleView');
// script/rank/RuleView.ts

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
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let RuleView = class RuleView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.layout = null;
        this.item = null;
    }
    static getPrefabUrl() {
        return "rank/prefabs/RuleView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingRule), this.updateRuleView);
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    updateRuleView(data) {
        G.Logger.log("规则", data);
        this.layout.children.splice(1);
        if (data.statusMsg.status == 0) {
            if (data.reward.length) {
                for (let index = 0; index < data.reward.length; index++) {
                    const element = data.reward[index];
                    let item = cc.instantiate(this.item);
                    item.parent = this.layout;
                    item.active = true;
                    item.x = 0;
                    item.getChildByName('rankLab').getComponent(cc.Label).string = element.rank;
                    item.getChildByName('rewardLab').getComponent(cc.Label).string = UtilMgr_1.UtilMgr.changeMoney(element.reward);
                }
            }
            this.layout.active = data.reward.length;
        }
        else {
            PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    start() {
        this.layout.active = false;
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_NewRankingRule, null);
    }
};
__decorate([
    property(cc.Node)
], RuleView.prototype, "layout", void 0);
__decorate([
    property(cc.Node)
], RuleView.prototype, "item", void 0);
RuleView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RuleView);
exports.default = RuleView;

cc._RF.pop();