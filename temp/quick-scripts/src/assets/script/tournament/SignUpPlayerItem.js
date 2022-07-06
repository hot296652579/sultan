"use strict";
cc._RF.push(module, '0727918MJxB1Jg2i0fyFZuS', 'SignUpPlayerItem');
// script/tournament/SignUpPlayerItem.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let SignUpPlayerItem = class SignUpPlayerItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.id = null;
        this.nickname = null;
        this.signUpTime = null;
        this.signUpFee = null;
    }
    onLoad() {
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        let userData = data;
        this.id.string = userData.userId + "";
        this.nickname.string = UtilMgr_1.UtilMgr.setString(userData.nickname);
        this.signUpTime.string = new Date(+userData.signUpTime).format("yyyy-MM-dd hh:mm:ss");
        this.signUpFee.string = UtilMgr_1.UtilMgr.changeMoney(userData.signUpFee);
    }
};
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "id", void 0);
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "nickname", void 0);
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "signUpTime", void 0);
__decorate([
    property(cc.Label)
], SignUpPlayerItem.prototype, "signUpFee", void 0);
SignUpPlayerItem = __decorate([
    ccclass
], SignUpPlayerItem);
exports.default = SignUpPlayerItem;

cc._RF.pop();