"use strict";
cc._RF.push(module, 'a32eeGG/INJ4K3SDsHgw5wg', 'TournamentEndItem');
// script/tournament/TournamentEndItem.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let TournamentEndItem = class TournamentEndItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.rank = null;
        this.userid = null;
        this.nickname = null;
        this.bonus = null;
    }
    onLoad() {
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        this.rank.string = data.rank.toString();
        this.userid.string = data.userId.toString();
        this.nickname.string = UtilMgr_1.UtilMgr.setString(data.nickname);
        this.bonus.string = UtilMgr_1.UtilMgr.changeMoney(data.bonus);
    }
};
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "rank", void 0);
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "userid", void 0);
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "nickname", void 0);
__decorate([
    property(cc.Label)
], TournamentEndItem.prototype, "bonus", void 0);
TournamentEndItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentEndItem);
exports.default = TournamentEndItem;

cc._RF.pop();