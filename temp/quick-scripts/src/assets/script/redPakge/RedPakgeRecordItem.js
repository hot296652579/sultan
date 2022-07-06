"use strict";
cc._RF.push(module, '93728R+E2dCeb8PtN34ejGE', 'RedPakgeRecordItem');
// script/redPakge/RedPakgeRecordItem.ts

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
const ScroViewBaseItem_1 = __importDefault(require("../common/component/ScroViewBaseItem"));
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const UtilMgr_1 = require("../global/UtilMgr");
const RedPakgeShareView_1 = __importDefault(require("./RedPakgeShareView"));
const { ccclass, property } = cc._decorator;
let RedPakgeRecordItem = class RedPakgeRecordItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.typeLabel = null;
        this.codeLabel = null;
        this.amountLabel = null;
        this.numLabel = null;
        this.stateLabel = null;
        this.shareBtn = null;
        // update (dt) {}
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            this.typeLabel.language = data.type == 1 ? Manager_1.Manager.makeLanguage("REDPAKGE.recordAverageType") : Manager_1.Manager.makeLanguage("REDPAKGE.recordRandomType");
            this.codeLabel.string = data.receiveCode;
            this.amountLabel.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.totalAmount);
            this.numLabel.string = data.receivedNumber + "/" + data.number;
            if (new Date().getTime() > data.expireTime) { //过期
                this.shareBtn.node.active = false;
                this.stateLabel.language = Manager_1.Manager.makeLanguage("REDPAKGE.Expired");
                this.codeLabel.string = "";
            }
            else {
                this.shareBtn.node.active = true;
                this.stateLabel.language = Manager_1.Manager.makeLanguage(["REDPAKGE.ValidUntil", new Date(data.expireTime).format("MM-dd hh:mm")]);
                if (data.receiveCode.length > 0) {
                    this.codeLabel.string = "(" + data.receiveCode + ")";
                }
            }
        }
    }
    onClick(event, type) {
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        let buttonName = event.target.name;
        switch (buttonName) {
            case "shareBtn":
                this.onShare();
                break;
            default: this.onShowInfo();
        }
    }
    onShowInfo() {
        dispatch("showRedPakgeRecordDetail", this._data);
    }
    onShare() {
        Manager_1.Manager.uiManager.open({ type: RedPakgeShareView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this._data.shareUrl] });
    }
};
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "typeLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "codeLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "amountLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "numLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordItem.prototype, "stateLabel", void 0);
__decorate([
    property(cc.Button)
], RedPakgeRecordItem.prototype, "shareBtn", void 0);
RedPakgeRecordItem = __decorate([
    ccclass
], RedPakgeRecordItem);
exports.default = RedPakgeRecordItem;

cc._RF.pop();