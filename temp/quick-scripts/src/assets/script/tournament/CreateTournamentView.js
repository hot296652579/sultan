"use strict";
cc._RF.push(module, '349c0JyKZNJ7a3wZ9UBpIDm', 'CreateTournamentView');
// script/tournament/CreateTournamentView.ts

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../common/config/Config");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const Framework_1 = require("../framework/Framework");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const ConfirmCreateTournament_1 = __importDefault(require("./ConfirmCreateTournament"));
const TournamentData_1 = __importStar(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let CreateTournamentView = class CreateTournamentView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.setRulesNode = null;
        this.createBasicInformationNode = null;
        this.setRewardNode = null;
        this.gameEditbox = null;
        this.passwordEditbox = null;
        this.gameListNode = null;
        this.passwordTipNode = null;
        this.modeTipNode = null;
        this.createStepNode = [];
        this.createStepJTNode = [];
        this.peopleToggleNode = null;
        this.bonusSourceToggleNode = null;
        this.awardsToggleNode = null;
        this.serviceFeeNode = null;
        this.serviceFeeLabel = null;
        this.jackpotLabel = null;
        this.setAmountEdit = null;
        this.setAmountTips = null;
        this.awardsNodes = [];
        this.scrollViewNode = null;
        this.viewMaskNode = null;
        this.toutnamentData = null;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/CreateTournamentView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.toutnamentData = TournamentData_1.default.getInstance();
    }
    start() {
        this.setAmountEdit.node.on('editing-did-ended', this.updateJackPot, this);
        this.reqTournamentConfig();
        this.onEventHandlerAward();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentConfig), this.onNetTournamentConfig);
        this.registerEvent("close_createTournamentView", this.closeWithAction);
    }
    onEventHandlerAward() {
        let champoinEdit = this.awardsNodes[0].getComponent(cc.EditBox);
        let runnerUpEdit = this.awardsNodes[1].getComponent(cc.EditBox);
        let thirdPlaceEdit = this.awardsNodes[2].getComponent(cc.EditBox);
        this.awardsNodes.forEach((item, index) => {
            item["awardIdx"] = index;
            item.on('editing-did-ended', (nod) => {
                switch (nod.node.awardIdx) {
                    case 0:
                        if (+champoinEdit.string < 0 || champoinEdit.string.length == 0)
                            champoinEdit.string = "0";
                        if (+champoinEdit.string > 100)
                            champoinEdit.string = "100";
                        let champoinNum = parseInt(champoinEdit.string);
                        champoinEdit.string = champoinNum.toString();
                        if (this.peopleReward == 1) {
                            champoinEdit.string = "100";
                        }
                        else if (this.peopleReward == 2) {
                            runnerUpEdit.string = (100 - champoinNum).toString();
                        }
                        else {
                            if (runnerUpEdit.string.length) {
                                let tNum = 100 - champoinNum - +runnerUpEdit.string;
                                if (tNum > 0) {
                                    thirdPlaceEdit.string = tNum.toString();
                                }
                                else {
                                    thirdPlaceEdit.string = "0";
                                    runnerUpEdit.string = (100 - champoinNum).toString();
                                }
                            }
                            else if (thirdPlaceEdit.string.length) {
                                let tNum = 100 - champoinNum - +thirdPlaceEdit.string;
                                if (tNum > 0) {
                                    runnerUpEdit.string = tNum.toString();
                                }
                                else {
                                    runnerUpEdit.string = "0";
                                    thirdPlaceEdit.string = (100 - champoinNum).toString();
                                }
                            }
                            else {
                                runnerUpEdit.string = "";
                                thirdPlaceEdit.string = "";
                            }
                        }
                        break;
                    case 1:
                        if (+runnerUpEdit.string < 0 || runnerUpEdit.string.length == 0)
                            runnerUpEdit.string = "0";
                        if (+runnerUpEdit.string > 100)
                            runnerUpEdit.string = "100";
                        let runnerUpNum = parseInt(runnerUpEdit.string);
                        runnerUpEdit.string = runnerUpNum.toString();
                        if (this.peopleReward == 2) {
                            champoinEdit.string = (100 - runnerUpNum).toString();
                        }
                        else if (this.peopleReward == 3) {
                            if (champoinEdit.string.length) {
                                let tNum = 100 - runnerUpNum - +champoinEdit.string;
                                if (tNum > 0) {
                                    thirdPlaceEdit.string = tNum.toString();
                                }
                                else {
                                    thirdPlaceEdit.string = "0";
                                    champoinEdit.string = (100 - runnerUpNum).toString();
                                }
                            }
                            else if (thirdPlaceEdit.string.length) {
                                let tNum = 100 - runnerUpNum - +thirdPlaceEdit.string;
                                if (tNum > 0) {
                                    champoinEdit.string = tNum.toString();
                                }
                                else {
                                    champoinEdit.string = "0";
                                    thirdPlaceEdit.string = (100 - runnerUpNum).toString();
                                }
                            }
                            else {
                                champoinEdit.string = "";
                                thirdPlaceEdit.string = "";
                            }
                        }
                        break;
                    case 2:
                        if (+thirdPlaceEdit.string < 0 || thirdPlaceEdit.string.length == 0)
                            thirdPlaceEdit.string = "0";
                        if (+thirdPlaceEdit.string > 100)
                            thirdPlaceEdit.string = "100";
                        let thirdPlaceNum = parseInt(thirdPlaceEdit.string);
                        thirdPlaceEdit.string = thirdPlaceNum.toString();
                        if (champoinEdit.string.length) {
                            let tNum = 100 - thirdPlaceNum - +champoinEdit.string;
                            if (tNum > 0) {
                                runnerUpEdit.string = tNum.toString();
                            }
                            else {
                                runnerUpEdit.string = "0";
                                champoinEdit.string = (100 - thirdPlaceNum).toString();
                            }
                        }
                        else if (runnerUpEdit.string.length) {
                            let tNum = 100 - thirdPlaceNum - +runnerUpEdit.string;
                            if (tNum > 0) {
                                champoinEdit.string = tNum.toString();
                            }
                            else {
                                champoinEdit.string = "0";
                                runnerUpEdit.string = (100 - thirdPlaceNum).toString();
                            }
                        }
                        else {
                            champoinEdit.string = "";
                            runnerUpEdit.string = "";
                        }
                        break;
                    default:
                        break;
                }
                let champoinPercent = champoinEdit.string;
                let runnerUpPercent = runnerUpEdit.string;
                let thirdPlacePercent = thirdPlaceEdit.string;
                let rewardPercent = '';
                if (champoinPercent.length && runnerUpPercent.length && thirdPlacePercent.length) {
                    rewardPercent = champoinPercent + "," + runnerUpPercent + "," + thirdPlacePercent;
                }
                else if (champoinPercent.length && runnerUpPercent.length) {
                    rewardPercent = champoinPercent + "," + runnerUpPercent;
                }
                else {
                    rewardPercent = champoinPercent;
                }
                this.rewardPercent = rewardPercent;
            }, this);
        });
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "closeGameList":
                this.scrollViewNode.parent.active = false;
                break;
            case "gameEditbox":
                this.scrollViewNode.parent.active = true;
                break;
            case "passwordWarnBtn":
                this.passwordTipNode.active = !this.passwordTipNode.active;
                break;
            case "nextStepBtn":
                this.nextCreateStep(this.curentStep, true);
                break;
            case "btnModeTip":
                this.modeTipNode.active = !this.modeTipNode.active;
                break;
            case "previousBtn":
                this.nextCreateStep(this.curentStep, false);
                break;
            case "addBtn":
                {
                    let amout = this.setAmountEdit.string;
                    if (+amout >= this.enterAmountMax) {
                        this.setAmountEdit.string = this.enterAmountMin.toString();
                    }
                    else {
                        this.setAmountEdit.string = (+amout + 10).toString();
                    }
                    this.updateJackPot();
                }
                break;
            case "subBtn":
                {
                    let amout = this.setAmountEdit.string;
                    if (+amout <= this.enterAmountMin) {
                        this.setAmountEdit.string = this.enterAmountMax.toString();
                    }
                    else {
                        this.setAmountEdit.string = (+amout - 10).toString();
                    }
                    this.updateJackPot();
                }
                break;
            case "confimBtn":
                let isNull = false;
                let champoinStr = this.awardsNodes[0].getComponent(cc.EditBox).string;
                let runnerUpStr = this.awardsNodes[1].getComponent(cc.EditBox).string;
                let thirdPlaceStr = this.awardsNodes[2].getComponent(cc.EditBox).string;
                if (this.peopleReward == 1) {
                    isNull = champoinStr.length == 0;
                }
                else if (this.peopleReward == 2) {
                    isNull = champoinStr.length == 0 || runnerUpStr.length == 0;
                }
                else if (this.peopleReward == 3) {
                    isNull = champoinStr.length == 0 || runnerUpStr.length == 0 || thirdPlaceStr.length == 0;
                }
                if (isNull) {
                    PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.Incomplete);
                    return;
                }
                console.log("this.jackpotLabel.string", this.jackpotLabel.string);
                let jsonData = {
                    gameId: this.curGameId,
                    password: this.passwordEditbox.string,
                    numberOfParticipants: this.partcipantsNum,
                    tournamentRounds: 0,
                    bonusSource: this.bonusSource,
                    joinFee: this.bonusSource == 1 ? +this.setAmountEdit.string * 10000 : 0,
                    createFee: this.bonusSource == 1 ? 0 : +this.setAmountEdit.string * 10000,
                    rewardPercent: this.rewardPercent,
                };
                Framework_1.Manager.uiManager.open({ type: ConfirmCreateTournament_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [jsonData] });
                break;
            case "setAmountDesc":
                this.setAmountTips.node.active = !this.setAmountTips.node.active;
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqTournamentConfig() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentConfig, null);
    }
    onNetTournamentConfig(data) {
        if (data.statusMsg.status == 0) {
            this.toutnamentData.gameIds = data.gameIds;
            TournamentData_1.default.getInstance().serviceFee = this.serviceFee = data.serviceFee;
            this.propleToggle = data.people;
            this.showCreateView(TournamentData_1.CreateTournamentStep.SetRules);
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    showCreateView(step) {
        this.resetSetpView();
        switch (step) {
            case TournamentData_1.CreateTournamentStep.SetRules:
                this.setRulesNode.active = true;
                let gameItem = this.gameListNode.children[0];
                this.gameListNode.removeAllChildren();
                let num = this.toutnamentData.gameIds.length > 3 ? 3 : this.toutnamentData.gameIds.length;
                this.scrollViewNode.height = this.toutnamentData.gameIds.length > 3 ? 55 * 3.75 : 55 * num;
                this.viewMaskNode.height = this.scrollViewNode.height - 10;
                for (let i = 0; i < this.toutnamentData.gameIds.length; i++) {
                    let gameName = Config_1.Config.games[this.toutnamentData.gameIds[i]].disName;
                    let item = cc.instantiate(gameItem);
                    item.parent = this.gameListNode;
                    item['gameId'] = this.toutnamentData.gameIds[i];
                    item.getChildByName('game').getComponent(cc.Label).string = gameName;
                    item.off(cc.Node.EventType.TOUCH_END);
                    item.on(cc.Node.EventType.TOUCH_END, this.clickGameItem.bind(this, item), this);
                }
                if (this.toutnamentData.gameIds[0]) {
                    this.gameEditbox.string = this.gameEditbox.string.length ? this.gameEditbox.string : Config_1.Config.games[this.toutnamentData.gameIds[0]].disName;
                    this.curGameId = this.curGameId ? this.curGameId : this.toutnamentData.gameIds[0];
                }
                break;
            case TournamentData_1.CreateTournamentStep.CreateBasicInformation:
                this.createBasicInformationNode.active = true;
                let peopleItem = this.peopleToggleNode.children[0];
                this.peopleToggleNode.removeAllChildren();
                this.partcipantsNum = this.partcipantsNum ? this.partcipantsNum : this.propleToggle[0];
                this.serviceFeeLabel.string = this.serviceFee + "%";
                this.serviceFeeNode.active = this.serviceFee != 0;
                for (let i = 0; i < this.propleToggle.length; i++) {
                    let item = cc.instantiate(peopleItem);
                    item.parent = this.peopleToggleNode;
                    item.getChildByName('peopleNum').getComponent(cc.Label).string = this.propleToggle[i].toString();
                    let select = item.getComponent(cc.Toggle).isChecked = this.propleToggle[i] == this.partcipantsNum;
                    item.getChildByName('peopleNum').color = new cc.Color().fromHEX(select ? '#FFFFFF' : '#AE9F96');
                }
                break;
            case TournamentData_1.CreateTournamentStep.SetReward:
                this.setRewardNode.active = true;
                this.peopleReward = this.peopleReward ? this.peopleReward : 1;
                this.showReward();
                this.bonusSourceToggleNode.children.forEach(item => {
                    item.getChildByName('b').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
                    if (item.getComponent(cc.Toggle).isChecked) {
                        this.bonusSource = +item.name;
                    }
                });
                this.awardsToggleNode.children.forEach(item => {
                    item.getChildByName('people').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
                });
                this.enterAmountMin = this.bonusSource == 0 ? this.partcipantsNum * 10 : 10;
                this.enterAmountMax = this.bonusSource == 0 ? this.partcipantsNum * 10000 : 10000;
                this.setAmountEdit.placeholder = "Enter the amount" + this.enterAmountMin + "-" + this.enterAmountMax;
                this.setAmountEdit.string = this.enterAmountMin.toString();
                if (this.bonusSource == 0) {
                    this.jackpotLabel.string = UtilMgr_1.UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * 0.01) * 10000, false);
                }
                else {
                    this.jackpotLabel.string = UtilMgr_1.UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * this.partcipantsNum * 0.01) * 10000, false);
                }
                break;
            default:
                break;
        }
        this.curentStep = step;
        this.showStepTip(step);
    }
    nextCreateStep(step, addSetp) {
        switch (step) {
            case TournamentData_1.CreateTournamentStep.SetRules:
                if (addSetp) {
                    if (this.gameEditbox.string.length == 0) {
                        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.SelectGame);
                    }
                    else if (this.passwordEditbox.string.length != 6 && this.passwordEditbox.string.length != 0) {
                        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.EnterCorrectPassword);
                    }
                    else {
                        this.showCreateView(TournamentData_1.CreateTournamentStep.CreateBasicInformation);
                    }
                }
                break;
            case TournamentData_1.CreateTournamentStep.CreateBasicInformation:
                if (addSetp) {
                    this.showCreateView(TournamentData_1.CreateTournamentStep.SetReward);
                }
                else {
                    this.showCreateView(TournamentData_1.CreateTournamentStep.SetRules);
                }
                break;
            case TournamentData_1.CreateTournamentStep.SetReward:
                if (!addSetp) {
                    this.showCreateView(TournamentData_1.CreateTournamentStep.CreateBasicInformation);
                }
                break;
            default:
                break;
        }
    }
    showStepTip(step) {
        this.createStepNode.forEach((item, index) => {
            if (index + 1 == step) {
                item.active = false;
            }
            else {
                item.active = true;
            }
        });
        if (step == 1) {
            this.createStepJTNode[0].active = false;
            this.createStepJTNode[1].active = true;
        }
        else if (step == 2) {
            this.createStepJTNode[0].active = true;
            this.createStepJTNode[1].active = false;
        }
        else {
            this.createStepJTNode[0].active = true;
            this.createStepJTNode[1].active = true;
        }
    }
    resetSetpView() {
        this.setRulesNode.active = false;
        this.createBasicInformationNode.active = false;
        this.setRewardNode.active = false;
    }
    clickGameItem(taget) {
        this.curGameId = taget['gameId'];
        this.gameEditbox.string = taget.getChildByName('game').getComponent(cc.Label).string;
        this.scrollViewNode.parent.active = false;
    }
    clickPeopleItem(toggle) {
        this.partcipantsNum = +toggle.node.getChildByName('peopleNum').getComponent(cc.Label).string;
        this.peopleToggleNode.children.forEach(item => {
            item.getChildByName('peopleNum').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
        });
    }
    clickBonusSource(toggle) {
        if (this.bonusSource == +toggle.node.name)
            return;
        this.bonusSource = +toggle.node.name;
        this.bonusSourceToggleNode.children.forEach(item => {
            item.getChildByName('b').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
        });
        this.enterAmountMin = this.bonusSource == 0 ? this.partcipantsNum * 10 : 10;
        this.enterAmountMax = this.bonusSource == 0 ? this.partcipantsNum * 10000 : 10000;
        let amountNum = +this.setAmountEdit.string;
        if (this.bonusSource == 0) {
            this.setAmountEdit.string = UtilMgr_1.UtilMgr.changeMoney((amountNum * this.partcipantsNum) * 10000, false, true);
            this.jackpotLabel.string = UtilMgr_1.UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * 0.01) * 10000, false);
        }
        else {
            this.setAmountEdit.string = UtilMgr_1.UtilMgr.changeMoney((amountNum / this.partcipantsNum) * 10000, false, true);
            this.jackpotLabel.string = UtilMgr_1.UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * this.partcipantsNum * 0.01) * 10000, false);
        }
        this.setAmountEdit.placeholder = "Enter the amount " + this.enterAmountMin + "-" + this.enterAmountMax;
    }
    clickPeopleReward(toggle) {
        if (this.peopleReward == +toggle.node.name)
            return;
        this.rewardPercent = "";
        this.peopleReward = +toggle.node.name;
        this.awardsToggleNode.children.forEach(item => {
            item.getChildByName('people').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
        });
        this.showReward();
    }
    showReward() {
        let showNum = 0;
        this.awardsNodes.forEach((item, index) => {
            if (index + 1 > this.peopleReward) {
                item.active = false;
            }
            else {
                showNum++;
                item.active = true;
            }
        });
        if (showNum == 1) {
            this.awardsNodes[0].getComponent(cc.EditBox).string = "100";
            this.rewardPercent = "100";
        }
        else {
            this.awardsNodes[0].getComponent(cc.EditBox).string = "";
            this.awardsNodes[1].getComponent(cc.EditBox).string = "";
            this.awardsNodes[2].getComponent(cc.EditBox).string = "";
        }
    }
    updateJackPot(editbox = null) {
        if (editbox) {
            if (editbox.string.length) {
                let ifsc = editbox.string;
                let ifscT = new RegExp('^[0-9]*$').test(ifsc); //检测是否都是英文和数字
                if (!ifscT) {
                    editbox.string = "";
                    PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.AmountWong);
                    return;
                }
            }
        }
        if (+this.setAmountEdit.string < this.enterAmountMin) {
            this.setAmountEdit.string = this.enterAmountMin + "";
            PanelHelp_1.default.showTip("Enter the amount " + this.enterAmountMin + "-" + this.enterAmountMax);
        }
        if (+this.setAmountEdit.string > this.enterAmountMax) {
            this.setAmountEdit.string = this.enterAmountMax + "";
            PanelHelp_1.default.showTip("Enter the amount " + this.enterAmountMin + "-" + this.enterAmountMax);
        }
        if (this.bonusSource == 0) {
            this.jackpotLabel.string = UtilMgr_1.UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * 0.01) * 10000, false);
        }
        else {
            this.jackpotLabel.string = UtilMgr_1.UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * this.partcipantsNum * 0.01) * 10000, false);
        }
    }
    editBoxEnded(editbox) {
        if (editbox.string.length) {
            let ifsc = editbox.string;
            let ifscT = new RegExp('^[0-9]*$').test(ifsc); //检测是否都是英文和数字
            if (!ifscT) {
                editbox.string = "";
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.passwordWong);
            }
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property({ type: cc.Node, tooltip: "" })
], CreateTournamentView.prototype, "setRulesNode", void 0);
__decorate([
    property({ type: cc.Node, tooltip: "" })
], CreateTournamentView.prototype, "createBasicInformationNode", void 0);
__decorate([
    property({ type: cc.Node, tooltip: "" })
], CreateTournamentView.prototype, "setRewardNode", void 0);
__decorate([
    property(cc.EditBox)
], CreateTournamentView.prototype, "gameEditbox", void 0);
__decorate([
    property(cc.EditBox)
], CreateTournamentView.prototype, "passwordEditbox", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "gameListNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "passwordTipNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "modeTipNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "createStepNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "createStepJTNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "peopleToggleNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "bonusSourceToggleNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "awardsToggleNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "serviceFeeNode", void 0);
__decorate([
    property(cc.Label)
], CreateTournamentView.prototype, "serviceFeeLabel", void 0);
__decorate([
    property(cc.Label)
], CreateTournamentView.prototype, "jackpotLabel", void 0);
__decorate([
    property(cc.EditBox)
], CreateTournamentView.prototype, "setAmountEdit", void 0);
__decorate([
    property(cc.Label)
], CreateTournamentView.prototype, "setAmountTips", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "awardsNodes", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "scrollViewNode", void 0);
__decorate([
    property(cc.Node)
], CreateTournamentView.prototype, "viewMaskNode", void 0);
CreateTournamentView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], CreateTournamentView);
exports.default = CreateTournamentView;

cc._RF.pop();