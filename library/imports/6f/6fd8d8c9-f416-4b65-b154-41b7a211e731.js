"use strict";
cc._RF.push(module, '6fd8djJ9BZLZbFUQbeiEecx', 'AwardWinningView');
// script/turntable/AwardWinningView.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const Framework_1 = require("../framework/Framework");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const android_1 = require("../platform/android");
const AddressView_1 = __importDefault(require("./AddressView"));
const { ccclass, property } = cc._decorator;
let AwardWinningView = class AwardWinningView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btn_share = null;
        this.btn_spinAgain = null;
        this.btn_address = null;
        this.spr_Prize = null;
        this.winNode = null;
        this.loseNode = null;
        this.prizeName = null;
        this.awardData = null;
        this.prizeData = null;
    }
    static getPrefabUrl() {
        return "turntable/prefab/AwardWinningView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
        this.updateView();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.awardData = args[0];
        }
        if (args && args[1]) {
            this.prizeData = args[1];
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("UPDATE_PRIZE_RECORD", this.changeBtnStuate);
    }
    onClick(name, node) {
        switch (name) {
            case "mask":
            case "close":
                this.closeWithAction();
                break;
            case "btn_share":
                this.shareToFacebook();
                break;
            case "btn_spinAgain":
                this.closeWithAction();
                break;
            case "btn_address":
                Framework_1.Manager.uiManager.open({ type: AddressView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [this.awardData.id] });
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    shareToFacebook() {
        window['platformUtil'].shareToFacebook(android_1.shareType.PHOTO, User_1.User._promoteUrl, User_1.User._shareImgUrl);
    }
    updateView() {
        if (this.awardData) {
            this.btn_address.active = false;
            this.btn_share.active = false;
            this.btn_spinAgain.active = false;
            switch (this.awardData.rewardType) { // 奖励类型 1=实物,2=筹码,3=未中奖
                case 1:
                    this.btn_address.active = true;
                    this.btn_share.active = true;
                    break;
                case 2:
                    this.btn_share.active = true;
                    break;
                case 4:
                    this.btn_spinAgain.active = true;
                    break;
                default:
                    break;
            }
            this.spr_Prize.loadRemoteImage({ url: this.prizeData.picUrl, view: this, defaultSpriteFrame: "turntable/image/10", bundle: Defines_1.BUNDLE_RESOURCES });
            this.prizeName.string = this.prizeData.goodsName;
            this.loseNode.active = this.awardData.rewardType == 3;
            this.winNode.active = !this.loseNode.active;
        }
    }
    changeBtnStuate() {
        this.btn_address.active = false;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "btn_share", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "btn_spinAgain", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "btn_address", void 0);
__decorate([
    property(cc.Sprite)
], AwardWinningView.prototype, "spr_Prize", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "winNode", void 0);
__decorate([
    property(cc.Node)
], AwardWinningView.prototype, "loseNode", void 0);
__decorate([
    property(cc.Label)
], AwardWinningView.prototype, "prizeName", void 0);
AwardWinningView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AwardWinningView);
exports.default = AwardWinningView;

cc._RF.pop();