"use strict";
cc._RF.push(module, '5904bJ1b6pBhaww9PtqHFib', 'WingoBetView');
// games/wingo/script/view/WingoBetView.ts

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
const Manager_1 = require("../../../../script/common/manager/Manager");
const LobbyService_1 = require("../../../../script/common/net/LobbyService");
const NumberUtils_1 = __importDefault(require("../../../../script/common/utils/NumberUtils"));
const UserData_1 = __importDefault(require("../../../../script/data/UserData"));
const Defines_1 = require("../../../../script/framework/base/Defines");
const Decorators_1 = require("../../../../script/framework/decorator/Decorators");
const EventApi_1 = require("../../../../script/framework/event/EventApi");
const Operation_1 = __importDefault(require("../../../../script/framework/extentions/Operation"));
const protoc_1 = require("../../../../script/framework/external/protoc");
const UIView_1 = __importDefault(require("../../../../script/framework/ui/UIView"));
const UtilMgr_1 = require("../../../../script/global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../../../../script/msgbox/PanelHelp"));
const WingoConfig_1 = require("../config/WingoConfig");
const WingoData_1 = __importDefault(require("../data/WingoData"));
const WingoEventDefine_1 = require("../define/WingoEventDefine");
const WingoNetController_1 = __importDefault(require("../protocol/WingoNetController"));
const { ccclass, property } = cc._decorator;
// 最小倍数
const MIN_MULTI = 1;
// 最大倍数
const MAX_MULTI = 999;
// 最小下注金额
const MIN_BET_GOLD = 2000;
let WingoBetView = class WingoBetView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.spfNumBetTitle = [];
        this.spfColorBetTitle = [];
        this.spfNumBetOption = [];
        this.spfColorBetOption = [];
        this.spfNumBet = [];
        this.spfColorBet = [];
        this.nodRoot = null;
        this.imgTitleBg = null;
        this.labTitle = null;
        this.labBetOptionTitle = null;
        this.togBetOption = null;
        this.imgBetOption = [];
        this.labMultiTitle = null;
        this.edbMulti = null;
        this.labServiceCostTitle = null;
        this.labMaxMultiTitle = null;
        this.labServiceCost = null;
        this.labCancel = null;
        this.btnBet = null;
        this.imgBet = null;
        this.labTotalCost = null;
        // 数据
        this._data = null;
        // 用户数据
        this._userData = null;
        // 游戏数据
        this._wingoData = null;
        // 显示位置
        this._showPosition = null;
        // 隐藏位置
        this._hidePosition = null;
        // 当前选择金币 服务器需要的乘以 100 的数据
        this._currSelectGold = null;
        // 当前选择金币类型
        this._currSelectGoldType = null;
    }
    static getPrefabUrl() {
        return "prefabs/WingoBetView";
    }
    onLoad() {
        super.onLoad();
        this.initData();
        this.initView();
    }
    start() {
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
        this.registerEvent("Event_M2C_WingoBet_Res", this.onEvent_M2C_WingoBet_Res);
        this.registerEvent(WingoEventDefine_1.WingoEventDefine.WingoStopBet, this.onEventWingoStopBet);
        this.registerEvent(WingoEventDefine_1.WingoEventDefine.WingoStartBet, this.onEventWingoStartBet);
    }
    show(args) {
        super.show(args);
        this._data = args[0];
        this.clickBetGold(0);
        this.refreshColour();
        this.showWithAction(true);
        this.onLanguageChange();
    }
    showWithAction(isOverrideShow, completeCallback) {
        if (this.content) {
            if (!isOverrideShow)
                this.show(this.args);
            this.content.stopAllActions();
            if (this.content.getComponent(cc.Widget)) {
                this.content.getComponent(cc.Widget).enabled = false;
            }
            cc.tween(this.content)
                .set({ position: this._hidePosition })
                .to(0.1, { position: this._showPosition })
                .call(() => {
                if (completeCallback)
                    completeCallback();
                if (this.content.getComponent(cc.Widget)) {
                    this.content.getComponent(cc.Widget).enabled = true;
                }
            })
                .start();
        }
    }
    hideWithAction(completeCallback) {
        if (this.content) {
            this.content.stopAllActions();
            cc.tween(this.content)
                .set({ position: this._showPosition })
                .to(0.1, { position: this._hidePosition })
                .call(() => {
                this.hide();
                if (completeCallback)
                    completeCallback();
            })
                .start();
        }
    }
    onLanguageChange() {
        this.refreshTitleText();
        this.labBetOptionTitle.language = Manager_1.Manager.makeLanguage("labBetOptionTitle", true);
        this.labMultiTitle.language = Manager_1.Manager.makeLanguage("labMultiTitle", true);
        this.labServiceCostTitle.language = Manager_1.Manager.makeLanguage("labServiceCostTitle", true);
        this.labMaxMultiTitle.language = Manager_1.Manager.makeLanguage("labMaxMultiTitle", true);
        this.labCancel.language = Manager_1.Manager.makeLanguage("labCancel", true);
        this.refreshTotalBetGoldText();
    }
    initData() {
        this._userData = G.DataMgr.get(UserData_1.default);
        this._wingoData = G.DataMgr.get(WingoData_1.default);
        this.content = this.nodRoot;
        this._showPosition = cc.v2(0, -(this.node.height / 2) + (this.nodRoot.height / 2));
        this._hidePosition = cc.v2(0, -(this.node.height / 2) - (this.nodRoot.height / 2));
    }
    initView() {
        this.initColor();
        this.nodRoot.position = this._hidePosition;
        this.setEditboxMulti(MIN_MULTI);
    }
    initColor() {
        this.imgTitleBg.spriteFrame = null;
        for (let v of this.imgBetOption) {
            v.spriteFrame = null;
        }
        this.imgBet.spriteFrame = null;
    }
    refreshColour() {
        if (this._data.type === protoc_1.MST.WingoBetType.Num) {
            this.imgTitleBg.spriteFrame = this.spfNumBetTitle[this._data.value];
            this.imgBet.spriteFrame = this.spfNumBet[this._data.value];
            for (let v of this.imgBetOption) {
                v.spriteFrame = this.spfNumBetOption[this._data.value];
            }
        }
        else if (this._data.type === protoc_1.MST.WingoBetType.Color) {
            this.imgTitleBg.spriteFrame = this.spfColorBetTitle[this._data.value];
            this.imgBet.spriteFrame = this.spfColorBet[this._data.value];
            for (let v of this.imgBetOption) {
                v.spriteFrame = this.spfColorBetOption[this._data.value];
            }
        }
    }
    setEditboxMulti(multi) {
        this.edbMulti.string = multi.toString();
    }
    getEditboxMulti() {
        let numMulti = Number(this.edbMulti.string);
        if (numMulti < MIN_MULTI) {
            numMulti = MIN_MULTI;
        }
        else if (numMulti > MAX_MULTI) {
            numMulti = MAX_MULTI;
        }
        return numMulti;
    }
    setTotalBetGoldText(gold) {
        this.labTotalCost.language = Manager_1.Manager.makeLanguage(["labTotalCost", UtilMgr_1.UtilMgr.formatMoney(gold.toString(), true)], true);
    }
    refreshTitleText() {
        if (this._data.type === protoc_1.MST.WingoBetType.Num) {
            this.labTitle.language = Manager_1.Manager.makeLanguage(["labTitle", this._data.value], true);
        }
        else if (this._data.type === protoc_1.MST.WingoBetType.Color) {
            this.labTitle.language = Manager_1.Manager.makeLanguage(WingoConfig_1.WingoConfig.BetTitleLanguage[this._data.value], true);
        }
    }
    refreshTotalBetGoldText() {
        let multi = this.getEditboxMulti();
        this.setTotalBetGoldText(Math.floor(Operation_1.default.mul(multi, this._currSelectGold)));
    }
    refreshMultiText() {
        let multi = this.getEditboxMulti();
        this.labServiceCost.string = Math.floor(Operation_1.default.mul(Operation_1.default.mul(multi, this._currSelectGold), Operation_1.default.div(this._wingoData.cost, 10000))).toString();
    }
    getBetGoldByIndex(index) {
        let userGold = 0;
        if (this._userData && this._userData.info && this._userData.info.Gold) {
            userGold = Number(this._userData.info.Gold);
        }
        let betGold = null;
        switch (index) {
            case 0:
                betGold = 2000;
                break;
            case 1:
                betGold = 20000;
                break;
            case 2:
                betGold = Number(NumberUtils_1.default.converToC(userGold * 0.5));
                break;
            case 3:
                betGold = Number(NumberUtils_1.default.converToC(userGold));
                break;
        }
        return betGold;
    }
    getBetGoldTypeByIndex(index) {
        let betGoldType = null;
        switch (index) {
            case 0:
                betGoldType = protoc_1.MST.WingoBetGoldType.Gold2000;
                break;
            case 1:
                betGoldType = protoc_1.MST.WingoBetGoldType.Gold20000;
                break;
            case 2:
                betGoldType = protoc_1.MST.WingoBetGoldType.Half;
                break;
            case 3:
                betGoldType = protoc_1.MST.WingoBetGoldType.AllIn;
                break;
        }
        return betGoldType;
    }
    clickBetGold(index) {
        this._currSelectGold = this.getBetGoldByIndex(index);
        this._currSelectGoldType = this.getBetGoldTypeByIndex(index);
        this.togBetOption.node.getChildByName(`toggle${index}`).getComponent(cc.Toggle).isChecked = true;
        this.refreshMultiText();
        this.refreshTotalBetGoldText();
    }
    clickMulti(index) {
        let multi = this.getEditboxMulti();
        let tempMulti = multi;
        switch (index) {
            case 0:
                {
                    tempMulti = tempMulti - 1;
                    if (tempMulti < MIN_MULTI) {
                        multi = MIN_MULTI;
                    }
                    else {
                        multi = tempMulti;
                    }
                }
                break;
            case 1:
                {
                    tempMulti = tempMulti + 1;
                    if (tempMulti > MAX_MULTI) {
                        multi = MAX_MULTI;
                    }
                    else {
                        multi = tempMulti;
                    }
                }
                break;
            case 2:
                tempMulti = Math.floor(tempMulti / 2);
                if (tempMulti < MIN_MULTI) {
                    multi = MIN_MULTI;
                }
                else {
                    multi = tempMulti;
                }
                break;
            case 3:
                tempMulti = tempMulti * 2;
                if (tempMulti > MAX_MULTI) {
                    multi = MAX_MULTI;
                }
                else {
                    multi = tempMulti;
                }
                break;
        }
        this.setEditboxMulti(multi);
        this.refreshMultiText();
        this.refreshTotalBetGoldText();
    }
    onChangedMulti(content, edb) {
        let arrContent = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }
        let numContent = MIN_MULTI;
        let legalContent = arrContent.join(",").replace(/,/g, "");
        if (legalContent.length > 0) {
            numContent = Number(legalContent);
        }
        content = numContent.toString();
        edb.string = content;
        this.refreshMultiText();
        this.refreshTotalBetGoldText();
    }
    testM2C_WingoBet_Res() {
        let controller = Manager_1.Manager.netManager.mainNode.getComponent(WingoNetController_1.default);
        controller.onM2C_WingoBet_Res({
            RpcId: Manager_1.Manager.netManager.getNewSeqId() - 1,
            Error: 0,
            Message: "",
        });
    }
    C2M_WingoBet_Req(goldType) {
        let req = protoc_1.MST.C2M_WingoBet_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            Mode: this._wingoData.currMode,
            BetType: this._data.type,
            BetValue: this._data.value,
            Multi: this.getEditboxMulti(),
            GoldType: goldType,
        });
        let buffer = protoc_1.MST.C2M_WingoBet_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_WingoBet_Req, protoc_1.MST.OuterOpcode_WingoGame.C2M_WingoBet_Req, buffer);
        // this.testM2C_WingoBet_Res();
    }
    clickBet() {
        let betGold = Operation_1.default.mul(this._currSelectGold, this.getEditboxMulti());
        if (betGold < MIN_BET_GOLD) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("MinimumBet", true));
            return;
        }
        if (betGold > Number(this._userData.info.Gold)) {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("InsufficientAmount", true));
            return;
        }
        this.C2M_WingoBet_Req(this._currSelectGoldType);
    }
    onEvent_M2C_WingoBet_Res(data) {
        this._data = null;
        this._currSelectGold = null;
        this.hideWithAction();
    }
    onEventWingoStopBet() {
        this.btnBet.interactable = false;
    }
    onEventWingoStartBet() {
        this.btnBet.interactable = true;
    }
    onClick(ButtonName, ButtonNode, index) {
        switch (ButtonName) {
            case "toggle0":
            case "toggle1":
            case "toggle2":
            case "toggle3":
                this.clickBetGold(Number(index));
                break;
            case "btnMulti0":
            case "btnMulti1":
            case "btnMulti2":
            case "btnMulti3":
                this.clickMulti(Number(index));
                break;
            case "btnClose":
            case "btnCancel":
                this.hideWithAction();
                break;
            case "btnBet":
                this.clickBet();
                break;
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property([cc.SpriteFrame])
], WingoBetView.prototype, "spfNumBetTitle", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoBetView.prototype, "spfColorBetTitle", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoBetView.prototype, "spfNumBetOption", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoBetView.prototype, "spfColorBetOption", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoBetView.prototype, "spfNumBet", void 0);
__decorate([
    property([cc.SpriteFrame])
], WingoBetView.prototype, "spfColorBet", void 0);
__decorate([
    property(cc.Node)
], WingoBetView.prototype, "nodRoot", void 0);
__decorate([
    property(cc.Sprite)
], WingoBetView.prototype, "imgTitleBg", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labTitle", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labBetOptionTitle", void 0);
__decorate([
    property(cc.ToggleContainer)
], WingoBetView.prototype, "togBetOption", void 0);
__decorate([
    property([cc.Sprite])
], WingoBetView.prototype, "imgBetOption", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labMultiTitle", void 0);
__decorate([
    property(cc.EditBox)
], WingoBetView.prototype, "edbMulti", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labServiceCostTitle", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labMaxMultiTitle", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labServiceCost", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labCancel", void 0);
__decorate([
    property(cc.Button)
], WingoBetView.prototype, "btnBet", void 0);
__decorate([
    property(cc.Sprite)
], WingoBetView.prototype, "imgBet", void 0);
__decorate([
    property(cc.Label)
], WingoBetView.prototype, "labTotalCost", void 0);
WingoBetView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], WingoBetView);
exports.default = WingoBetView;

cc._RF.pop();