
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/view/WingoBetView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvdmlldy9XaW5nb0JldFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBb0U7QUFDcEUsNkVBQTBFO0FBQzFFLDhGQUFzRTtBQUN0RSxnRkFBd0Q7QUFDeEQsdUVBQW1GO0FBRW5GLGtGQUEyRjtBQUMzRiwwRUFBdUU7QUFDdkUsa0dBQTBFO0FBQzFFLHlFQUFtRTtBQUNuRSxvRkFBNEQ7QUFDNUQsK0RBQTREO0FBQzVELG9GQUE0RDtBQUM1RCx1REFBb0Q7QUFDcEQsa0VBQTBDO0FBQzFDLGlFQUE4RDtBQUU5RCx3RkFBZ0U7QUFFaEUsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLE9BQU87QUFDUCxNQUFNLFNBQVMsR0FBVyxDQUFDLENBQUM7QUFDNUIsT0FBTztBQUNQLE1BQU0sU0FBUyxHQUFXLEdBQUcsQ0FBQztBQUM5QixTQUFTO0FBQ1QsTUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDO0FBSWxDLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLGdCQUFNO0lBQWhEOztRQUlZLG1CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUd0QyxxQkFBZ0IsR0FBcUIsRUFBRSxDQUFDO1FBR3hDLG9CQUFlLEdBQXFCLEVBQUUsQ0FBQztRQUd2QyxzQkFBaUIsR0FBcUIsRUFBRSxDQUFDO1FBR3pDLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBR2pDLGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUduQyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGVBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsYUFBUSxHQUFhLElBQUksQ0FBQztRQUcxQixzQkFBaUIsR0FBYSxJQUFJLENBQUM7UUFHbkMsaUJBQVksR0FBdUIsSUFBSSxDQUFDO1FBR3hDLGlCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUcv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QjtBQUdyQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNlO0FBR2xDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ3dCO0FBRzNDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUM7a0RBQ21CO0FBR2hEO0lBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2tEQUNpQjtBQUd2QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNvQjtBQUd2QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzhDQUNlO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQzBCO0FBRzdDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ3VCO0FBRzFDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ3FCO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ2dCO0FBR25DO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ2E7QUFHakM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDYTtBQUdqQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNtQjtBQWhFckIsWUFBWTtJQUZoQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixZQUFZLENBcWJoQztrQkFyYm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyVXRpbHMgZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCB7IEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCBPcGVyYXRpb24gZnJvbSBcIi4uLy4uLy4uLy4uL3NjcmlwdC9mcmFtZXdvcmsvZXh0ZW50aW9ucy9PcGVyYXRpb25cIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2NyaXB0L2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgV2luZ29Db25maWcgfSBmcm9tIFwiLi4vY29uZmlnL1dpbmdvQ29uZmlnXCI7XG5pbXBvcnQgV2luZ29EYXRhIGZyb20gXCIuLi9kYXRhL1dpbmdvRGF0YVwiO1xuaW1wb3J0IHsgV2luZ29FdmVudERlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvV2luZ29FdmVudERlZmluZVwiO1xuaW1wb3J0IHsgV2luZ29JbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL1dpbmdvSW50ZXJmYWNlXCI7XG5pbXBvcnQgV2luZ29OZXRDb250cm9sbGVyIGZyb20gXCIuLi9wcm90b2NvbC9XaW5nb05ldENvbnRyb2xsZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLy8g5pyA5bCP5YCN5pWwXG5jb25zdCBNSU5fTVVMVEk6IG51bWJlciA9IDE7XG4vLyDmnIDlpKflgI3mlbBcbmNvbnN0IE1BWF9NVUxUSTogbnVtYmVyID0gOTk5O1xuLy8g5pyA5bCP5LiL5rOo6YeR6aKdXG5jb25zdCBNSU5fQkVUX0dPTEQ6IG51bWJlciA9IDIwMDA7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5nb0JldFZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcml2YXRlIHNwZk51bUJldFRpdGxlOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcml2YXRlIHNwZkNvbG9yQmV0VGl0bGU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHByaXZhdGUgc3BmTnVtQmV0T3B0aW9uOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcml2YXRlIHNwZkNvbG9yQmV0T3B0aW9uOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcml2YXRlIHNwZk51bUJldDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgcHJpdmF0ZSBzcGZDb2xvckJldDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpdmF0ZSBub2RSb290OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJpdmF0ZSBpbWdUaXRsZUJnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiVGl0bGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYkJldE9wdGlvblRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlQ29udGFpbmVyKVxuICAgIHByaXZhdGUgdG9nQmV0T3B0aW9uOiBjYy5Ub2dnbGVDb250YWluZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVdKVxuICAgIHByaXZhdGUgaW1nQmV0T3B0aW9uOiBjYy5TcHJpdGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiTXVsdGlUaXRsZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcHJpdmF0ZSBlZGJNdWx0aTogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTZXJ2aWNlQ29zdFRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJNYXhNdWx0aVRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpdmF0ZSBsYWJTZXJ2aWNlQ29zdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiQ2FuY2VsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICAgIHByaXZhdGUgYnRuQmV0OiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcml2YXRlIGltZ0JldDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcml2YXRlIGxhYlRvdGFsQ29zdDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgLy8g5pWw5o2uXG4gICAgcHJpdmF0ZSBfZGF0YTogV2luZ29JbnRlcmZhY2UuQmV0RGF0YSA9IG51bGw7XG4gICAgLy8g55So5oi35pWw5o2uXG4gICAgcHJpdmF0ZSBfdXNlckRhdGE6IFVzZXJEYXRhID0gbnVsbDtcbiAgICAvLyDmuLjmiI/mlbDmja5cbiAgICBwcml2YXRlIF93aW5nb0RhdGE6IFdpbmdvRGF0YSA9IG51bGw7XG4gICAgLy8g5pi+56S65L2N572uXG4gICAgcHJpdmF0ZSBfc2hvd1Bvc2l0aW9uOiBjYy5WZWMyID0gbnVsbDtcbiAgICAvLyDpmpDol4/kvY3nva5cbiAgICBwcml2YXRlIF9oaWRlUG9zaXRpb246IGNjLlZlYzIgPSBudWxsO1xuICAgIC8vIOW9k+WJjemAieaLqemHkeW4gSDmnI3liqHlmajpnIDopoHnmoTkuZjku6UgMTAwIOeahOaVsOaNrlxuICAgIHByaXZhdGUgX2N1cnJTZWxlY3RHb2xkOiBudW1iZXIgPSBudWxsO1xuICAgIC8vIOW9k+WJjemAieaLqemHkeW4geexu+Wei1xuICAgIHByaXZhdGUgX2N1cnJTZWxlY3RHb2xkVHlwZTogTVNULldpbmdvQmV0R29sZFR5cGUgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInByZWZhYnMvV2luZ29CZXRWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaW5kaW5nRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKEVOQUJMRV9DSEFOR0VfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5DSEFOR0VfTEFOR1VBR0UsIHRoaXMub25MYW5ndWFnZUNoYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJFdmVudF9NMkNfV2luZ29CZXRfUmVzXCIsIHRoaXMub25FdmVudF9NMkNfV2luZ29CZXRfUmVzKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoV2luZ29FdmVudERlZmluZS5XaW5nb1N0b3BCZXQsIHRoaXMub25FdmVudFdpbmdvU3RvcEJldCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChXaW5nb0V2ZW50RGVmaW5lLldpbmdvU3RhcnRCZXQsIHRoaXMub25FdmVudFdpbmdvU3RhcnRCZXQpO1xuXG4gICAgfVxuXG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBhcmdzWzBdO1xuICAgICAgICB0aGlzLmNsaWNrQmV0R29sZCgwKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQ29sb3VyKCk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93V2l0aEFjdGlvbihpc092ZXJyaWRlU2hvdz86IGJvb2xlYW4sIGNvbXBsZXRlQ2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICghaXNPdmVycmlkZVNob3cpIHRoaXMuc2hvdyh0aGlzLmFyZ3MpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5XaWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5XaWRnZXQpLmVuYWJsZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5jb250ZW50KVxuICAgICAgICAgICAgICAgIC5zZXQoeyBwb3NpdGlvbjogdGhpcy5faGlkZVBvc2l0aW9uIH0pXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBwb3NpdGlvbjogdGhpcy5fc2hvd1Bvc2l0aW9uIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykgY29tcGxldGVDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5XaWRnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkuZW5hYmxlZCA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZVdpdGhBY3Rpb24oY29tcGxldGVDYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmNvbnRlbnQpXG4gICAgICAgICAgICAgICAgLnNldCh7IHBvc2l0aW9uOiB0aGlzLl9zaG93UG9zaXRpb24gfSlcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHBvc2l0aW9uOiB0aGlzLl9oaWRlUG9zaXRpb24gfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVDYWxsYmFjaykgY29tcGxldGVDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnJlZnJlc2hUaXRsZVRleHQoKTtcbiAgICAgICAgdGhpcy5sYWJCZXRPcHRpb25UaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiQmV0T3B0aW9uVGl0bGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiTXVsdGlUaXRsZS5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwibGFiTXVsdGlUaXRsZVwiLCB0cnVlKTtcbiAgICAgICAgdGhpcy5sYWJTZXJ2aWNlQ29zdFRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJTZXJ2aWNlQ29zdFRpdGxlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLmxhYk1heE11bHRpVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcImxhYk1heE11bHRpVGl0bGVcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubGFiQ2FuY2VsLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJsYWJDYW5jZWxcIiwgdHJ1ZSk7XG4gICAgICAgIHRoaXMucmVmcmVzaFRvdGFsQmV0R29sZFRleHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl91c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICB0aGlzLl93aW5nb0RhdGEgPSBHLkRhdGFNZ3IuZ2V0KFdpbmdvRGF0YSk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kUm9vdDtcbiAgICAgICAgdGhpcy5fc2hvd1Bvc2l0aW9uID0gY2MudjIoMCwgLSh0aGlzLm5vZGUuaGVpZ2h0IC8gMikgKyAodGhpcy5ub2RSb290LmhlaWdodCAvIDIpKTtcbiAgICAgICAgdGhpcy5faGlkZVBvc2l0aW9uID0gY2MudjIoMCwgLSh0aGlzLm5vZGUuaGVpZ2h0IC8gMikgLSAodGhpcy5ub2RSb290LmhlaWdodCAvIDIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRWaWV3KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRDb2xvcigpO1xuICAgICAgICB0aGlzLm5vZFJvb3QucG9zaXRpb24gPSB0aGlzLl9oaWRlUG9zaXRpb247XG4gICAgICAgIHRoaXMuc2V0RWRpdGJveE11bHRpKE1JTl9NVUxUSSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q29sb3IoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1nVGl0bGVCZy5zcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5pbWdCZXRPcHRpb24pIHtcbiAgICAgICAgICAgIHYuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1nQmV0LnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hDb2xvdXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhLnR5cGUgPT09IE1TVC5XaW5nb0JldFR5cGUuTnVtKSB7XG4gICAgICAgICAgICB0aGlzLmltZ1RpdGxlQmcuc3ByaXRlRnJhbWUgPSB0aGlzLnNwZk51bUJldFRpdGxlW3RoaXMuX2RhdGEudmFsdWVdO1xuICAgICAgICAgICAgdGhpcy5pbWdCZXQuc3ByaXRlRnJhbWUgPSB0aGlzLnNwZk51bUJldFt0aGlzLl9kYXRhLnZhbHVlXTtcbiAgICAgICAgICAgIGZvciAobGV0IHYgb2YgdGhpcy5pbWdCZXRPcHRpb24pIHtcbiAgICAgICAgICAgICAgICB2LnNwcml0ZUZyYW1lID0gdGhpcy5zcGZOdW1CZXRPcHRpb25bdGhpcy5fZGF0YS52YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YS50eXBlID09PSBNU1QuV2luZ29CZXRUeXBlLkNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmltZ1RpdGxlQmcuc3ByaXRlRnJhbWUgPSB0aGlzLnNwZkNvbG9yQmV0VGl0bGVbdGhpcy5fZGF0YS52YWx1ZV07XG4gICAgICAgICAgICB0aGlzLmltZ0JldC5zcHJpdGVGcmFtZSA9IHRoaXMuc3BmQ29sb3JCZXRbdGhpcy5fZGF0YS52YWx1ZV07XG4gICAgICAgICAgICBmb3IgKGxldCB2IG9mIHRoaXMuaW1nQmV0T3B0aW9uKSB7XG4gICAgICAgICAgICAgICAgdi5zcHJpdGVGcmFtZSA9IHRoaXMuc3BmQ29sb3JCZXRPcHRpb25bdGhpcy5fZGF0YS52YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEVkaXRib3hNdWx0aShtdWx0aTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWRiTXVsdGkuc3RyaW5nID0gbXVsdGkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEVkaXRib3hNdWx0aSgpOiBudW1iZXIge1xuICAgICAgICBsZXQgbnVtTXVsdGk6IG51bWJlciA9IE51bWJlcih0aGlzLmVkYk11bHRpLnN0cmluZyk7XG4gICAgICAgIGlmIChudW1NdWx0aSA8IE1JTl9NVUxUSSkge1xuICAgICAgICAgICAgbnVtTXVsdGkgPSBNSU5fTVVMVEk7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtTXVsdGkgPiBNQVhfTVVMVEkpIHtcbiAgICAgICAgICAgIG51bU11bHRpID0gTUFYX01VTFRJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1NdWx0aTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRvdGFsQmV0R29sZFRleHQoZ29sZDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFiVG90YWxDb3N0Lmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoW1wibGFiVG90YWxDb3N0XCIsIFV0aWxNZ3IuZm9ybWF0TW9uZXkoZ29sZC50b1N0cmluZygpLCB0cnVlKV0sIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaFRpdGxlVGV4dCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGEudHlwZSA9PT0gTVNULldpbmdvQmV0VHlwZS5OdW0pIHtcbiAgICAgICAgICAgIHRoaXMubGFiVGl0bGUubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShbXCJsYWJUaXRsZVwiLCB0aGlzLl9kYXRhLnZhbHVlXSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YS50eXBlID09PSBNU1QuV2luZ29CZXRUeXBlLkNvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLmxhYlRpdGxlLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoV2luZ29Db25maWcuQmV0VGl0bGVMYW5ndWFnZVt0aGlzLl9kYXRhLnZhbHVlXSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZnJlc2hUb3RhbEJldEdvbGRUZXh0KCk6IHZvaWQge1xuICAgICAgICBsZXQgbXVsdGk6IG51bWJlciA9IHRoaXMuZ2V0RWRpdGJveE11bHRpKCk7XG4gICAgICAgIHRoaXMuc2V0VG90YWxCZXRHb2xkVGV4dChNYXRoLmZsb29yKE9wZXJhdGlvbi5tdWwobXVsdGksIHRoaXMuX2N1cnJTZWxlY3RHb2xkKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVmcmVzaE11bHRpVGV4dCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IG11bHRpOiBudW1iZXIgPSB0aGlzLmdldEVkaXRib3hNdWx0aSgpO1xuICAgICAgICB0aGlzLmxhYlNlcnZpY2VDb3N0LnN0cmluZyA9IE1hdGguZmxvb3IoT3BlcmF0aW9uLm11bChPcGVyYXRpb24ubXVsKG11bHRpLCB0aGlzLl9jdXJyU2VsZWN0R29sZCksIE9wZXJhdGlvbi5kaXYodGhpcy5fd2luZ29EYXRhLmNvc3QsIDEwMDAwKSkpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCZXRHb2xkQnlJbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHVzZXJHb2xkOiBudW1iZXIgPSAwO1xuICAgICAgICBpZiAodGhpcy5fdXNlckRhdGEgJiYgdGhpcy5fdXNlckRhdGEuaW5mbyAmJiB0aGlzLl91c2VyRGF0YS5pbmZvLkdvbGQpIHtcbiAgICAgICAgICAgIHVzZXJHb2xkID0gTnVtYmVyKHRoaXMuX3VzZXJEYXRhLmluZm8uR29sZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYmV0R29sZDogbnVtYmVyID0gbnVsbDtcbiAgICAgICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGJldEdvbGQgPSAyMDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJldEdvbGQgPSAyMDAwMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBiZXRHb2xkID0gTnVtYmVyKE51bWJlclV0aWxzLmNvbnZlclRvQyh1c2VyR29sZCAqIDAuNSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGJldEdvbGQgPSBOdW1iZXIoTnVtYmVyVXRpbHMuY29udmVyVG9DKHVzZXJHb2xkKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJldEdvbGQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCZXRHb2xkVHlwZUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IE1TVC5XaW5nb0JldEdvbGRUeXBlIHtcbiAgICAgICAgbGV0IGJldEdvbGRUeXBlOiBNU1QuV2luZ29CZXRHb2xkVHlwZSA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBiZXRHb2xkVHlwZSA9IE1TVC5XaW5nb0JldEdvbGRUeXBlLkdvbGQyMDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGJldEdvbGRUeXBlID0gTVNULldpbmdvQmV0R29sZFR5cGUuR29sZDIwMDAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGJldEdvbGRUeXBlID0gTVNULldpbmdvQmV0R29sZFR5cGUuSGFsZjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBiZXRHb2xkVHlwZSA9IE1TVC5XaW5nb0JldEdvbGRUeXBlLkFsbEluO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXRHb2xkVHlwZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrQmV0R29sZChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2N1cnJTZWxlY3RHb2xkID0gdGhpcy5nZXRCZXRHb2xkQnlJbmRleChpbmRleCk7XG4gICAgICAgIHRoaXMuX2N1cnJTZWxlY3RHb2xkVHlwZSA9IHRoaXMuZ2V0QmV0R29sZFR5cGVCeUluZGV4KGluZGV4KTtcbiAgICAgICAgdGhpcy50b2dCZXRPcHRpb24ubm9kZS5nZXRDaGlsZEJ5TmFtZShgdG9nZ2xlJHtpbmRleH1gKS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKS5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlZnJlc2hNdWx0aVRleHQoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxCZXRHb2xkVGV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xpY2tNdWx0aShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGxldCBtdWx0aTogbnVtYmVyID0gdGhpcy5nZXRFZGl0Ym94TXVsdGkoKTtcbiAgICAgICAgbGV0IHRlbXBNdWx0aTogbnVtYmVyID0gbXVsdGk7XG4gICAgICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDoge1xuICAgICAgICAgICAgICAgIHRlbXBNdWx0aSA9IHRlbXBNdWx0aSAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBNdWx0aSA8IE1JTl9NVUxUSSkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aSA9IE1JTl9NVUxUSTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aSA9IHRlbXBNdWx0aTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICAgICAgICB0ZW1wTXVsdGkgPSB0ZW1wTXVsdGkgKyAxO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wTXVsdGkgPiBNQVhfTVVMVEkpIHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGkgPSBNQVhfTVVMVEk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGkgPSB0ZW1wTXVsdGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRlbXBNdWx0aSA9IE1hdGguZmxvb3IodGVtcE11bHRpIC8gMik7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBNdWx0aSA8IE1JTl9NVUxUSSkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aSA9IE1JTl9NVUxUSTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aSA9IHRlbXBNdWx0aTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGVtcE11bHRpID0gdGVtcE11bHRpICogMjtcbiAgICAgICAgICAgICAgICBpZiAodGVtcE11bHRpID4gTUFYX01VTFRJKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpID0gTUFYX01VTFRJO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpID0gdGVtcE11bHRpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEVkaXRib3hNdWx0aShtdWx0aSk7XG4gICAgICAgIHRoaXMucmVmcmVzaE11bHRpVGV4dCgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hUb3RhbEJldEdvbGRUZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkNoYW5nZWRNdWx0aShjb250ZW50OiBzdHJpbmcsIGVkYjogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBsZXQgYXJyQ29udGVudDogc3RyaW5nW10gPSBjb250ZW50LnNwbGl0KCcnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyckNvbnRlbnQubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCByZWc6IFJlZ0V4cCA9IC9bMC05XS9nO1xuICAgICAgICAgICAgaWYgKCFyZWcudGVzdChhcnJDb250ZW50W2ldKSkge1xuICAgICAgICAgICAgICAgIGFyckNvbnRlbnQuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG51bUNvbnRlbnQ6IG51bWJlciA9IE1JTl9NVUxUSTtcblxuICAgICAgICBsZXQgbGVnYWxDb250ZW50OiBzdHJpbmcgPSBhcnJDb250ZW50LmpvaW4oXCIsXCIpLnJlcGxhY2UoLywvZywgXCJcIik7XG4gICAgICAgIGlmIChsZWdhbENvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbnVtQ29udGVudCA9IE51bWJlcihsZWdhbENvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IG51bUNvbnRlbnQudG9TdHJpbmcoKTtcblxuICAgICAgICBlZGIuc3RyaW5nID0gY29udGVudDtcblxuICAgICAgICB0aGlzLnJlZnJlc2hNdWx0aVRleHQoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoVG90YWxCZXRHb2xkVGV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdE0yQ19XaW5nb0JldF9SZXMoKTogdm9pZCB7XG4gICAgICAgIGxldCBjb250cm9sbGVyOiBXaW5nb05ldENvbnRyb2xsZXIgPSBNYW5hZ2VyLm5ldE1hbmFnZXIubWFpbk5vZGUuZ2V0Q29tcG9uZW50KFdpbmdvTmV0Q29udHJvbGxlcik7XG4gICAgICAgIGNvbnRyb2xsZXIub25NMkNfV2luZ29CZXRfUmVzKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSAtIDEsXG4gICAgICAgICAgICBFcnJvcjogMCxcbiAgICAgICAgICAgIE1lc3NhZ2U6IFwiXCIsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBDMk1fV2luZ29CZXRfUmVxKGdvbGRUeXBlOiBNU1QuV2luZ29CZXRHb2xkVHlwZSk6IHZvaWQge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyTV9XaW5nb0JldF9SZXEuY3JlYXRlKHtcbiAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIE1vZGU6IHRoaXMuX3dpbmdvRGF0YS5jdXJyTW9kZSxcbiAgICAgICAgICAgIEJldFR5cGU6IHRoaXMuX2RhdGEudHlwZSxcbiAgICAgICAgICAgIEJldFZhbHVlOiB0aGlzLl9kYXRhLnZhbHVlLFxuICAgICAgICAgICAgTXVsdGk6IHRoaXMuZ2V0RWRpdGJveE11bHRpKCksXG4gICAgICAgICAgICBHb2xkVHlwZTogZ29sZFR5cGUsXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX1dpbmdvQmV0X1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTV9XaW5nb0JldF9SZXEsIE1TVC5PdXRlck9wY29kZV9XaW5nb0dhbWUuQzJNX1dpbmdvQmV0X1JlcSwgYnVmZmVyKTtcblxuICAgICAgICAvLyB0aGlzLnRlc3RNMkNfV2luZ29CZXRfUmVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGlja0JldCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGJldEdvbGQ6IG51bWJlciA9IE9wZXJhdGlvbi5tdWwodGhpcy5fY3VyclNlbGVjdEdvbGQsIHRoaXMuZ2V0RWRpdGJveE11bHRpKCkpO1xuICAgICAgICBpZiAoYmV0R29sZCA8IE1JTl9CRVRfR09MRCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJNaW5pbXVtQmV0XCIsIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZXRHb2xkID4gTnVtYmVyKHRoaXMuX3VzZXJEYXRhLmluZm8uR29sZCkpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiSW5zdWZmaWNpZW50QW1vdW50XCIsIHRydWUpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuQzJNX1dpbmdvQmV0X1JlcSh0aGlzLl9jdXJyU2VsZWN0R29sZFR5cGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FdmVudF9NMkNfV2luZ29CZXRfUmVzKGRhdGE6IE1TVC5JTTJDX1dpbmdvQmV0X1Jlcyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY3VyclNlbGVjdEdvbGQgPSBudWxsO1xuICAgICAgICB0aGlzLmhpZGVXaXRoQWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkV2ZW50V2luZ29TdG9wQmV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ0bkJldC5pbnRlcmFjdGFibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXZlbnRXaW5nb1N0YXJ0QmV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ0bkJldC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKEJ1dHRvbk5hbWU6IGFueSwgQnV0dG9uTm9kZTogYW55LCBpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoQnV0dG9uTmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcInRvZ2dsZTBcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ0b2dnbGUxXCI6XG4gICAgICAgICAgICBjYXNlIFwidG9nZ2xlMlwiOlxuICAgICAgICAgICAgY2FzZSBcInRvZ2dsZTNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQmV0R29sZChOdW1iZXIoaW5kZXgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5NdWx0aTBcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5NdWx0aTFcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5NdWx0aTJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5NdWx0aTNcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrTXVsdGkoTnVtYmVyKGluZGV4KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQ2xvc2VcIjpcbiAgICAgICAgICAgIGNhc2UgXCJidG5DYW5jZWxcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVXaXRoQWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuQmV0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0JldCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG5cbn1cbiJdfQ==