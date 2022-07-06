"use strict";
cc._RF.push(module, 'e2750cs7/JKALJhhKtmz8U5', 'WingoTitleItemPageUser');
// games/wingo/script/view/WingoTitleItemPageUser.ts

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
const TitleItemPageUser_1 = __importDefault(require("../../../../script/common/item/TitleItemPageUser"));
const WingoData_1 = __importDefault(require("../data/WingoData"));
const { ccclass, property } = cc._decorator;
let WingoTitleItemPageUser = class WingoTitleItemPageUser extends TitleItemPageUser_1.default {
    constructor() {
        super(...arguments);
        // Wingo 游戏数据
        this._wingoData = null;
    }
    onLoad() {
        super.onLoad();
    }
    initData() {
        super.initData();
        this._wingoData = G.DataMgr.get(WingoData_1.default);
    }
    onEvent_M2C_GoldChange_Mes(oldGold) {
        if (this._wingoData.isPlayingLotteryAnim) {
            return;
        }
        this.refreshGold();
    }
    manualRefreshGold() {
        if (!this._userData.isLogined()) {
            return;
        }
        this.refreshGold();
    }
};
WingoTitleItemPageUser = __decorate([
    ccclass
], WingoTitleItemPageUser);
exports.default = WingoTitleItemPageUser;

cc._RF.pop();