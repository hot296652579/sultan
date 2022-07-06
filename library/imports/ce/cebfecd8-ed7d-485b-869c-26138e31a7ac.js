"use strict";
cc._RF.push(module, 'cebfezY7X1IW4acJhOOMaes', 'RedPakgeRecordDetailItem');
// script/redPakge/RedPakgeRecordDetailItem.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeRecordDetailItem = class RedPakgeRecordDetailItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.head = null;
        this.userIdLabel = null;
        this.amountLabel = null;
        this.nameLabel = null;
        this.stateLabel = null;
        this.newTipNode = null;
        this.view = null;
        // update (dt) {}
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        if (data) {
            UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this.view);
            this.userIdLabel.string = "ID:" + data.userId;
            this.nameLabel.string = UtilMgr_1.UtilMgr.setString(data.nickname);
            this.amountLabel.string = "₹" + UtilMgr_1.UtilMgr.changeMoney(data.receiveAmount);
            this.stateLabel.language = new Date(data.receiveTime).format("MM-dd hh:mm:ss");
            this.newTipNode.active = data.new == 1 ? true : false;
        }
    }
};
__decorate([
    property(cc.Sprite)
], RedPakgeRecordDetailItem.prototype, "head", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "userIdLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "amountLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "nameLabel", void 0);
__decorate([
    property(cc.Label)
], RedPakgeRecordDetailItem.prototype, "stateLabel", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetailItem.prototype, "newTipNode", void 0);
__decorate([
    property(UIView_1.default)
], RedPakgeRecordDetailItem.prototype, "view", void 0);
RedPakgeRecordDetailItem = __decorate([
    ccclass
], RedPakgeRecordDetailItem);
exports.default = RedPakgeRecordDetailItem;

cc._RF.pop();