"use strict";
cc._RF.push(module, 'b8fb89I9/VLObwP7i1wLuty', 'PrizeRecordItem');
// script/turntable/PrizeRecordItem.ts

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
const AddressView_1 = __importDefault(require("./AddressView"));
const { ccclass, property } = cc._decorator;
let PrizeRecordItem = class PrizeRecordItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.time = null;
        this.prize = null;
        this.status = null;
        this.btn_address = null;
    }
    updateItem(data, itemId) {
        this.time.string = new Date(data.time).format("yy/MM/dd");
        this.prize.string = data.prize;
        let status = '';
        this.btn_address.active = false;
        this.turntableRecord = data;
        switch (data.status) { //奖品状态(0=未中奖,1=未领取（not receive）,2=待发放（Waiting to Receive）,3=已领取)
            case 0:
                status = "-";
                break;
            case 1:
                status = "Not Receive";
                this.btn_address.active = true;
                break;
            case 2:
                status = "Waiting to Receive";
                break;
            case 3:
                status = "Received";
                break;
            default:
                break;
        }
        this.status.string = status;
    }
    onClick(event) {
        let buttonName = event.target.name;
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        switch (buttonName) {
            case "btn_address":
                Manager_1.Manager.uiManager.open({ type: AddressView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this.turntableRecord.id] });
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], PrizeRecordItem.prototype, "time", void 0);
__decorate([
    property(cc.Label)
], PrizeRecordItem.prototype, "prize", void 0);
__decorate([
    property(cc.Label)
], PrizeRecordItem.prototype, "status", void 0);
__decorate([
    property(cc.Node)
], PrizeRecordItem.prototype, "btn_address", void 0);
PrizeRecordItem = __decorate([
    ccclass
], PrizeRecordItem);
exports.default = PrizeRecordItem;

cc._RF.pop();