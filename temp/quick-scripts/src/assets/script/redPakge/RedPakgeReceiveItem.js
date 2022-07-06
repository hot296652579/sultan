"use strict";
cc._RF.push(module, 'b4cd71t7MlHbKFIK0PoRVFo', 'RedPakgeReceiveItem');
// script/redPakge/RedPakgeReceiveItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeReceiveItem = class RedPakgeReceiveItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.nameLabel = null;
        this.timeLabel = null;
        this.amountLabel = null;
        // update (dt) {}
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            this.nameLabel.string = Manager_1.Manager.getLanguage("REDPAKGE.receiveFrom") + UtilMgr_1.UtilMgr.setString(data.nickname);
            this.amountLabel.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.receiveAmount);
            this.timeLabel.language = new Date(data.receiveTime).format("MM-dd hh:mm:ss");
        }
    }
    onClick(event, type) {
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
    }
};
__decorate([
    property(cc.Label)
], RedPakgeReceiveItem.prototype, "nameLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeReceiveItem.prototype, "timeLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeReceiveItem.prototype, "amountLabel", void 0);
RedPakgeReceiveItem = __decorate([
    ccclass
], RedPakgeReceiveItem);
exports.default = RedPakgeReceiveItem;

cc._RF.pop();