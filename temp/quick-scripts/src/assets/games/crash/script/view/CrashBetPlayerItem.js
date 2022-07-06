"use strict";
cc._RF.push(module, '98566FD4GpCCbgot80YDIoq', 'CrashBetPlayerItem');
// games/crash/script/view/CrashBetPlayerItem.ts

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
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const CrashColorDefine_1 = require("../define/CrashColorDefine");
const { ccclass, property } = cc._decorator;
let CrashBetPlayerItem = class CrashBetPlayerItem extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.imgAvatar = null;
        this.labPlayer = null;
        this.labRate = null;
        this.labBetGold = null;
        this.labInCome = null;
        this._data = null;
        this._isWin = null;
        this._userData = null;
        // update (dt) {}
    }
    onLoad() {
        this.initData();
        this.initUI();
    }
    start() {
    }
    initData() {
        this._data = null;
        this._isWin = null;
        this._userData = G.DataMgr.get(UserData_1.default);
    }
    initUI() {
        this.imgAvatar.spriteFrame = null;
        this.labPlayer.string = "";
        this.labRate.string = "";
        this.labBetGold.string = "";
        this.labInCome.string = "";
        this.labPlayer.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        this.labRate.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        this.labBetGold.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
        this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
    }
    refreshUI() {
        UtilMgr_1.UtilMgr.loadHeadImg(this.imgAvatar, this._data.betInfo.player.HeaderUrl, this._data.betInfo.player.UnitId, this);
        this.labPlayer.string = UtilMgr_1.UtilMgr.setString(this._data.betInfo.player.Nick);
        this.labBetGold.string = NumberUtils_1.default.converToC(Number(this._data.betInfo.BetGold));
        this.refreshInCome();
        if (this._data.betInfo.player.UnitId === this._userData.id) {
            this.labRate.string = NumberUtils_1.default.converToC(this._data.betInfo.Multiple);
        }
    }
    refreshInCome() {
        if (this._isWin === null) {
            this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.NORMAL;
            this.labInCome.string = "";
        }
        else {
            if (this._data.isEscape) {
                this.labRate.string = NumberUtils_1.default.converToC(Number(this._data.betInfo.Multiple));
                this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labPlayer.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labRate.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labBetGold.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.GREEN;
                this.labInCome.string = Math.floor(Operation_1.default.mul(Operation_1.default.div(Number(this._data.betInfo.BetGold), 100), Operation_1.default.div(this._data.betInfo.Multiple, 100))).toString();
            }
            else {
                this.labInCome.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labPlayer.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labRate.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labBetGold.node.color = CrashColorDefine_1.CrashColorDefine.ProfitLoss.RED;
                this.labInCome.string = NumberUtils_1.default.converToC(Number(this._data.betInfo.BetGold));
            }
        }
    }
    setIsWin(is) {
        this._isWin = is;
        this._data.isEscape = is;
        this.refreshInCome();
    }
    getIsWin() {
        return this._isWin;
    }
    getId() {
        return Number(this._data.betInfo.player.UnitId);
    }
    getBetRate() {
        return Number(this._data.betInfo.Multiple);
    }
    onShow(data) {
        this._data = data;
        if (data.isEscape) {
            this._isWin = data.isEscape;
        }
        this.initUI();
        this.refreshUI();
    }
    reset() {
        this.initData();
        this.initUI();
    }
};
__decorate([
    property(cc.Sprite)
], CrashBetPlayerItem.prototype, "imgAvatar", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labPlayer", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labRate", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labBetGold", void 0);
__decorate([
    property(cc.Label)
], CrashBetPlayerItem.prototype, "labInCome", void 0);
CrashBetPlayerItem = __decorate([
    ccclass
], CrashBetPlayerItem);
exports.default = CrashBetPlayerItem;

cc._RF.pop();