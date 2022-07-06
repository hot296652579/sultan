"use strict";
cc._RF.push(module, '5fdb4QdNY1A1puj0f27KJPw', 'HallGuide');
// script/hall/HallGuide.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const CommonService_1 = require("../common/net/CommonService");
const Decorators_1 = require("../framework/decorator/Decorators");
const LobbyService_1 = require("../common/net/LobbyService");
const HallGameItem_1 = __importDefault(require("./HallGameItem"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let HallGuide = class HallGuide extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.renwu = null;
        this.kuang = null;
        this.skip = null;
        this.tipLabel = null;
        this.userHead = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "hall/prefabs/HallViewGuide";
    }
    onLoad() {
        super.onLoad();
        this.hall = this.node.getChildByName("hall");
        UtilMgr_1.UtilMgr.loadHeadImg(this.userHead, User_1.User._headImgUrl, User_1.User._userID, this);
        this.hall.active = false;
    }
    show(args) {
        super.show(args);
        if (args[0] && cc.js.getClassName(args[0]) == "HallView") {
            this.hallView = args[0];
            this.step = 0;
            this.setStep();
        }
    }
    start() {
        if (this.kuang) {
            this.kuang.parent.getChildByName("Label").getComponent(cc.Label).language = LanguageImpl_1.i18n.GUIDE.continue;
        }
    }
    setStep() {
        this.step++;
        let wp;
        switch (this.step) {
            case 1:
                this.hall.active = true;
                this.hall.getChildByName("jiantou").active = false;
                this.skip.position = cc.v2(40, -180);
                this.tipLabel.node.position = cc.v2(-230, 55);
                break;
            case 2:
                this.hall.active = true;
                wp = this.hallView.node.getChildByName('hall_top').getChildByName('head').convertToWorldSpaceAR(cc.v2(0, 0));
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("head").position = this.node.convertToNodeSpaceAR(wp);
                // this.hall.getChildByName("mask").setContentSize(cc.size(95, 95))
                this.hall.getChildByName("jiantou").active = true;
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x;
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y - this.hall.getChildByName("mask").height - 10 - 95;
                this.skip.position = cc.v2(40, -180);
                this.tipLabel.node.position = cc.v2(-230, 55);
                this.hall.getChildByName('head').active = true;
                break;
            case 3:
                this.hall.active = true;
                wp = this.hallView.share.convertToWorldSpaceAR(cc.v2(0, 0));
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("share").position = this.node.convertToNodeSpaceAR(wp);
                // this.hall.getChildByName("mask").setContentSize(cc.size(62, 62))
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x;
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y - this.hall.getChildByName("mask").height - 30 - 62;
                this.hall.getChildByName('head').active = false;
                this.hall.getChildByName('share').active = true;
                this.renwu.scaleX = -1;
                this.renwu.parent.x = -this.renwu.parent.x;
                this.skip.position = cc.v2(-40, -180);
                this.tipLabel.node.position = cc.v2(-215, 55);
                this.kuang.scaleX = -1;
                this.kuang.parent.x = this.kuang.parent.x + 200;
                break;
            case 4:
                this.hall.active = true;
                wp = this.hallView.daili.convertToWorldSpaceAR(cc.v2(0, 0));
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName('daili').position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x;
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height + 120;
                this.hall.getChildByName("jiantou").scaleY = 1;
                this.hall.getChildByName('share').active = false;
                this.hall.getChildByName('daili').active = true;
                this.renwu.scaleX = 1;
                this.renwu.parent.x = -this.renwu.parent.x;
                this.skip.position = cc.v2(40, -180);
                this.tipLabel.node.position = cc.v2(-230, 55);
                this.kuang.scaleX = 1;
                this.kuang.parent.x = this.kuang.parent.x - 200;
                break;
            case 5:
                this.hall.active = true;
                wp = this.hallView.shop.convertToWorldSpaceAR(cc.v2(0, 0));
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("shop").position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                // this.hall.getChildByName("mask").setContentSize(cc.size(250, 88))
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x;
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height + 88;
                this.hall.getChildByName('shop').active = true;
                this.hall.getChildByName('daili').active = false;
                this.renwu.parent.x = this.renwu.parent.x + 100;
                this.kuang.parent.x = this.kuang.parent.x + 100;
                this.skip.position = cc.v2(40, -180);
                break;
            case 6:
                this.hall.active = true;
                this.hall.getChildByName("mask").position = cc.v2(0, 0);
                this.hall.getChildByName("mask").setContentSize(cc.size(0, 0));
                this.hall.getChildByName("jiantou").active = false;
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x;
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height;
                // this.renwu.parent.x = this.renwu.parent.x + 100
                // this.kuang.parent.x = this.kuang.parent.x + 100
                this.hall.getChildByName('shop').active = false;
                this.skip.position = cc.v2(40, -180);
                break;
            case 7:
                this.hall.active = true;
                this.renwu.active = false;
                this.kuang.parent.active = false;
                if (this.hallView.scroll_gameList.content.children.length > 0) {
                    wp = this.hallView.scroll_gameList.content.children[2].convertToWorldSpaceAR(cc.v2(0, 0));
                }
                this.hall.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("mask").setContentSize(cc.size(263, 450));
                this.hall.getChildByName("jiantou").active = true;
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x;
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height / 2 + 50;
                this.skip.position = cc.v2(120, -210);
                break;
            case 8:
                this.toGame();
                this.reqGuide();
                this.close();
                break;
            default:
                break;
        }
        if (this.step < 7) {
            this.showTipLabel();
        }
    }
    showTipLabel() {
        this.tipLabel.language = Manager_1.Manager.makeLanguage("GUIDE.tip" + this.step);
    }
    toGame() {
        let hallGameItem = this.hallView.scroll_gameList.content.children[2].getComponent(HallGameItem_1.default);
        hallGameItem.onBtnClick('', '');
    }
    onClick(name, node) {
        switch (name) {
            case 'skip':
                this.node.active = false;
                this.reqGuide();
                UtilMgr_1.UtilMgr.popWindows("openSignin");
                break;
            default:
                this.setStep();
                break;
        }
    }
    reqGuide() {
        G.Logger.log(User_1.User._gameIds, User_1.User._popWindows);
        if (User_1.User._gameIds.indexOf(2001) === -1) {
            let req = CommonService_1.protoPackage.hall.ReqInsertNewPlayerGuid.create({ gameId: 2001 });
            let buffer = CommonService_1.protoPackage.hall.ReqInsertNewPlayerGuid.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_ReqInsertNewPlayerGuid, buffer);
        }
    }
};
__decorate([
    property(cc.Node)
], HallGuide.prototype, "renwu", void 0);
__decorate([
    property(cc.Node)
], HallGuide.prototype, "kuang", void 0);
__decorate([
    property(cc.Node)
], HallGuide.prototype, "skip", void 0);
__decorate([
    property(cc.Label)
], HallGuide.prototype, "tipLabel", void 0);
__decorate([
    property(cc.Sprite)
], HallGuide.prototype, "userHead", void 0);
HallGuide = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], HallGuide);
exports.default = HallGuide;

cc._RF.pop();