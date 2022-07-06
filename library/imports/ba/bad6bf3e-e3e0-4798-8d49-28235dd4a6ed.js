"use strict";
cc._RF.push(module, 'bad6b8+4+BHmI1JKCNd1Kbt', 'NoticeItem');
// script/common/component/NoticeItem.ts

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
const Decorators_1 = require("../../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const LobbyService_1 = require("../net/LobbyService");
const HallData_1 = __importDefault(require("../../data/HallData"));
const { ccclass, property } = cc._decorator;
let NoticeItem = class NoticeItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.mask = null;
        this.startX = null;
        this.endX = null;
        this.speed = 20;
        this.service = null;
    }
    onLoad() {
        //guest162468409 win Rp3800000in Crash
        let contentSize = this.label.node.getBoundingBox();
        this.startX = this.mask.width * this.mask.anchorX;
        this.endX = -this.mask.width * this.mask.anchorX - contentSize.size.width;
        this.label.node.x = this.startX;
        //test
        // let hallData = G.DataMgr.get(HallData);
        // let notices = hallData.notice;
        // notices.push({ message: "guest162468409 win Rp3800000in Crash", type: 0 });
        this.initView();
    }
    start() {
    }
    initView() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let notices = hallData.notice;
        if (notices.length <= 0)
            return;
        let notice = notices[0];
        let str;
        if (notice.type == 0)
            str = this.getRichTxt(notice.message);
        else
            str = notice.message;
        this.label.string = str;
    }
    update(dt) {
        if (this.label.node.x <= this.endX) {
            this.label.node.x = this.startX;
        }
        this.label.node.x -= this.speed * dt;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_MessageNotify', this.onEvent_S2C_MessageNotify);
    }
    onEvent_S2C_MessageNotify() {
        this.schedule(this.checkLabelPos);
    }
    checkLabelPos() {
        // console.log('this.label.node.x:++++++++++++++' + this.label.node.x);
        if (this.label.node.x <= this.endX) {
            let hallData = G.DataMgr.get(HallData_1.default);
            let notices = hallData.notice;
            if (notices.length <= 0)
                return;
            let str;
            if (notices[0].type == 0) {
                let message = notices[0].message;
                str = this.getRichTxt(message);
            }
            else
                str = notices[0].message;
            this.label.string = str;
            if (notices.length > 1)
                notices.splice(0, 1);
        }
    }
    getRichTxt(message) {
        let winIndex = message.lastIndexOf('win');
        let rpIndex = message.lastIndexOf('Rp');
        let inIndex = message.lastIndexOf('in ');
        let name = message.substring(0, winIndex);
        let rp = message.substring(rpIndex, inIndex);
        let game = message.substring(inIndex, message.length);
        let str = `<color=#ffffff>${name}</c><color=#E1BC11> win${rp}</color><color=#ffffff>${game}</c>`;
        return str;
    }
    onDestroy() {
        this.unschedule(this.checkLabelPos);
    }
};
__decorate([
    property(cc.RichText)
], NoticeItem.prototype, "label", void 0);
__decorate([
    property(cc.Node)
], NoticeItem.prototype, "mask", void 0);
NoticeItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], NoticeItem);
exports.default = NoticeItem;

cc._RF.pop();