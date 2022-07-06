"use strict";
cc._RF.push(module, 'b7a8eHmdbhAQ4Zq8ONa+IkF', 'RouletteBigWinItem');
// games/roulette/script/view/RouletteBigWinItem.ts

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
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RouletteBigWinItem = class RouletteBigWinItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.iconSp = null;
        this.imgAvatar = null;
        this.uname = null;
        this.labRp = null;
        this.labNo = null;
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    initData() {
    }
    initView() {
    }
    updateItem(data, idx) {
        let betInfo = data.betInfo;
        this.uname.string = betInfo.player.Nick;
        this.labRp.string = String(NumberUtils_1.default.converToC(betInfo.BetGold));
        this.labNo.string = idx + 1;
        if (idx > 2) {
            this.iconSp.node.active = false;
        }
        else {
            this.labNo.node.active = false;
        }
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, betInfo.player.HeaderUrl, betInfo.player.UnitId, this);
    }
    clear() {
        this.initView();
    }
};
__decorate([
    property(cc.Sprite)
], RouletteBigWinItem.prototype, "iconSp", void 0);
__decorate([
    property(cc.Sprite)
], RouletteBigWinItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], RouletteBigWinItem.prototype, "uname", void 0);
__decorate([
    property(cc.Label)
], RouletteBigWinItem.prototype, "labRp", void 0);
__decorate([
    property(cc.Label)
], RouletteBigWinItem.prototype, "labNo", void 0);
RouletteBigWinItem = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RouletteBigWinItem);
exports.default = RouletteBigWinItem;

cc._RF.pop();