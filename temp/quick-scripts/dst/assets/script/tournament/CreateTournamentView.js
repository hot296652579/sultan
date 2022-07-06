
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/CreateTournamentView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9DcmVhdGVUb3VybmFtZW50Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBaUQ7QUFDakQsa0VBQXVEO0FBQ3ZELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsdURBQTZEO0FBRTdELGtFQUEyRTtBQUUzRSxzREFBaUQ7QUFDakQsb0VBQTRDO0FBQzVDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFDNUMsd0ZBQWdFO0FBQ2hFLG1FQUF3RTtBQUV4RSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLGdCQUFNO0lBQXhEOztRQUdJLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLCtCQUEwQixHQUFZLElBQUksQ0FBQztRQUczQyxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixnQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixvQkFBZSxHQUFlLElBQUksQ0FBQztRQUduQyxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUdoQyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixtQkFBYyxHQUFjLEVBQUUsQ0FBQztRQUcvQixxQkFBZ0IsR0FBYyxFQUFFLENBQUM7UUFHakMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBR2pDLDBCQUFxQixHQUFZLElBQUksQ0FBQztRQUd0QyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFHakMsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFHL0Isb0JBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMsaUJBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsa0JBQWEsR0FBZSxJQUFJLENBQUM7UUFHakMsa0JBQWEsR0FBYSxJQUFJ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REFDWTtBQUdqQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzJEQUNZO0FBRy9CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ1U7QUFHNUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDYTtBQUcvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNXO0FBL0RaLG9CQUFvQjtJQUZ4QyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixvQkFBb0IsQ0FvakJ4QztrQkFwakJvQixvQkFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgc2VydmVyVHlwZSwgcHJvdG9QYWNrYWdlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBjb20gfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvRnJhbWV3b3JrXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVdGlsTWdyIH0gZnJvbSBcIi4uL2dsb2JhbC9VdGlsTWdyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgQ29uZmlybUNyZWF0ZVRvdXJuYW1lbnQgZnJvbSBcIi4vQ29uZmlybUNyZWF0ZVRvdXJuYW1lbnRcIjtcbmltcG9ydCBUb3VybmFtZW50RGF0YSwgeyBDcmVhdGVUb3VybmFtZW50U3RlcCB9IGZyb20gXCIuL1RvdXJuYW1lbnREYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVUb3VybmFtZW50VmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCJcIiB9KVxuICAgIHNldFJ1bGVzTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlLCB0b29sdGlwOiBcIlwiIH0pXG4gICAgY3JlYXRlQmFzaWNJbmZvcm1hdGlvbk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSwgdG9vbHRpcDogXCJcIiB9KVxuICAgIHNldFJld2FyZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgZ2FtZUVkaXRib3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgcGFzc3dvcmRFZGl0Ym94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdhbWVMaXN0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwYXNzd29yZFRpcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9kZVRpcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY3JlYXRlU3RlcE5vZGU6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY3JlYXRlU3RlcEpUTm9kZTogY2MuTm9kZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwZW9wbGVUb2dnbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJvbnVzU291cmNlVG9nZ2xlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBhd2FyZHNUb2dnbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNlcnZpY2VGZWVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzZXJ2aWNlRmVlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBqYWNrcG90TGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHNldEFtb3VudEVkaXQ6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNldEFtb3VudFRpcHM6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGF3YXJkc05vZGVzOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNjcm9sbFZpZXdOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHZpZXdNYXNrTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG4gICAgcHJpdmF0ZSB0b3V0bmFtZW50RGF0YTogVG91cm5hbWVudERhdGEgPSBudWxsO1xuICAgIHByaXZhdGUgY3VyZW50U3RlcDogbnVtYmVyO1xuICAgIHByaXZhdGUgY3VyR2FtZUlkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBwYXJ0Y2lwYW50c051bTogbnVtYmVyO1xuICAgIHByaXZhdGUgc2VydmljZUZlZTogbnVtYmVyO1xuICAgIHByaXZhdGUgYm9udXNTb3VyY2U6IG51bWJlcjtcbiAgICBwcml2YXRlIHBlb3BsZVJld2FyZDogbnVtYmVyO1xuICAgIHByaXZhdGUgcHJvcGxlVG9nZ2xlOiBudW1iZXJbXTtcbiAgICBwcml2YXRlIGVudGVyQW1vdW50TWluOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBlbnRlckFtb3VudE1heDogbnVtYmVyO1xuICAgIHByaXZhdGUgcmV3YXJkUGVyY2VudDogc3RyaW5nO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcInRvdXJuYW1lbnQvcHJlZmFicy9DcmVhdGVUb3VybmFtZW50Vmlld1wiO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcbiAgICAgICAgdGhpcy50b3V0bmFtZW50RGF0YSA9IFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCk7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zZXRBbW91bnRFZGl0Lm5vZGUub24oJ2VkaXRpbmctZGlkLWVuZGVkJywgdGhpcy51cGRhdGVKYWNrUG90LCB0aGlzKTtcbiAgICAgICAgdGhpcy5yZXFUb3VybmFtZW50Q29uZmlnKCk7XG4gICAgICAgIHRoaXMub25FdmVudEhhbmRsZXJBd2FyZCgpO1xuICAgIH1cblxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3MpO1xuICAgICAgICB0aGlzLnNob3dXaXRoQWN0aW9uKHRydWUpO1xuXG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ub3VybmFtZW50Q29uZmlnKSwgdGhpcy5vbk5ldFRvdXJuYW1lbnRDb25maWcpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJjbG9zZV9jcmVhdGVUb3VybmFtZW50Vmlld1wiLCB0aGlzLmNsb3NlV2l0aEFjdGlvbilcblxuICAgIH1cbiAgICBvbkV2ZW50SGFuZGxlckF3YXJkKCkge1xuICAgICAgICBsZXQgY2hhbXBvaW5FZGl0ID0gdGhpcy5hd2FyZHNOb2Rlc1swXS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG4gICAgICAgIGxldCBydW5uZXJVcEVkaXQgPSB0aGlzLmF3YXJkc05vZGVzWzFdLmdldENvbXBvbmVudChjYy5FZGl0Qm94KTtcbiAgICAgICAgbGV0IHRoaXJkUGxhY2VFZGl0ID0gdGhpcy5hd2FyZHNOb2Rlc1syXS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG4gICAgICAgIHRoaXMuYXdhcmRzTm9kZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW1bXCJhd2FyZElkeFwiXSA9IGluZGV4O1xuICAgICAgICAgICAgaXRlbS5vbignZWRpdGluZy1kaWQtZW5kZWQnLCAobm9kKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChub2Qubm9kZS5hd2FyZElkeCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoK2NoYW1wb2luRWRpdC5zdHJpbmcgPCAwIHx8IGNoYW1wb2luRWRpdC5zdHJpbmcubGVuZ3RoID09IDApIGNoYW1wb2luRWRpdC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrY2hhbXBvaW5FZGl0LnN0cmluZyA+IDEwMCkgY2hhbXBvaW5FZGl0LnN0cmluZyA9IFwiMTAwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbXBvaW5OdW0gPSBwYXJzZUludChjaGFtcG9pbkVkaXQuc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW1wb2luRWRpdC5zdHJpbmcgPSBjaGFtcG9pbk51bS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGVvcGxlUmV3YXJkID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFtcG9pbkVkaXQuc3RyaW5nID0gXCIxMDBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wZW9wbGVSZXdhcmQgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5lclVwRWRpdC5zdHJpbmcgPSAoMTAwIC0gY2hhbXBvaW5OdW0pLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uZXJVcEVkaXQuc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdE51bSA9IDEwMCAtIGNoYW1wb2luTnVtIC0gK3J1bm5lclVwRWRpdC5zdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0TnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcmRQbGFjZUVkaXQuc3RyaW5nID0gdE51bS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcmRQbGFjZUVkaXQuc3RyaW5nID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uZXJVcEVkaXQuc3RyaW5nID0gKDEwMCAtIGNoYW1wb2luTnVtKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlyZFBsYWNlRWRpdC5zdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0TnVtID0gMTAwIC0gY2hhbXBvaW5OdW0gLSArdGhpcmRQbGFjZUVkaXQuc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodE51bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5lclVwRWRpdC5zdHJpbmcgPSB0TnVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uZXJVcEVkaXQuc3RyaW5nID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZFBsYWNlRWRpdC5zdHJpbmcgPSAoMTAwIC0gY2hhbXBvaW5OdW0pLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uZXJVcEVkaXQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcmRQbGFjZUVkaXQuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoK3J1bm5lclVwRWRpdC5zdHJpbmcgPCAwIHx8IHJ1bm5lclVwRWRpdC5zdHJpbmcubGVuZ3RoID09IDApIHJ1bm5lclVwRWRpdC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrcnVubmVyVXBFZGl0LnN0cmluZyA+IDEwMCkgcnVubmVyVXBFZGl0LnN0cmluZyA9IFwiMTAwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcnVubmVyVXBOdW0gPSBwYXJzZUludChydW5uZXJVcEVkaXQuc3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5lclVwRWRpdC5zdHJpbmcgPSBydW5uZXJVcE51bS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGVvcGxlUmV3YXJkID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFtcG9pbkVkaXQuc3RyaW5nID0gKDEwMCAtIHJ1bm5lclVwTnVtKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBlb3BsZVJld2FyZCA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW1wb2luRWRpdC5zdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0TnVtID0gMTAwIC0gcnVubmVyVXBOdW0gLSArY2hhbXBvaW5FZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHROdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZFBsYWNlRWRpdC5zdHJpbmcgPSB0TnVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlyZFBsYWNlRWRpdC5zdHJpbmcgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW1wb2luRWRpdC5zdHJpbmcgPSAoMTAwIC0gcnVubmVyVXBOdW0pLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcmRQbGFjZUVkaXQuc3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdE51bSA9IDEwMCAtIHJ1bm5lclVwTnVtIC0gK3RoaXJkUGxhY2VFZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHROdW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFtcG9pbkVkaXQuc3RyaW5nID0gdE51bS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbXBvaW5FZGl0LnN0cmluZyA9IFwiMFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcmRQbGFjZUVkaXQuc3RyaW5nID0gKDEwMCAtIHJ1bm5lclVwTnVtKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbXBvaW5FZGl0LnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXJkUGxhY2VFZGl0LnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrdGhpcmRQbGFjZUVkaXQuc3RyaW5nIDwgMCB8fCB0aGlyZFBsYWNlRWRpdC5zdHJpbmcubGVuZ3RoID09IDApIHRoaXJkUGxhY2VFZGl0LnN0cmluZyA9IFwiMFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCt0aGlyZFBsYWNlRWRpdC5zdHJpbmcgPiAxMDApIHRoaXJkUGxhY2VFZGl0LnN0cmluZyA9IFwiMTAwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGhpcmRQbGFjZU51bSA9IHBhcnNlSW50KHRoaXJkUGxhY2VFZGl0LnN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlyZFBsYWNlRWRpdC5zdHJpbmcgPSB0aGlyZFBsYWNlTnVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbXBvaW5FZGl0LnN0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdE51bSA9IDEwMCAtIHRoaXJkUGxhY2VOdW0gLSArY2hhbXBvaW5FZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodE51bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVubmVyVXBFZGl0LnN0cmluZyA9IHROdW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uZXJVcEVkaXQuc3RyaW5nID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW1wb2luRWRpdC5zdHJpbmcgPSAoMTAwIC0gdGhpcmRQbGFjZU51bSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocnVubmVyVXBFZGl0LnN0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdE51bSA9IDEwMCAtIHRoaXJkUGxhY2VOdW0gLSArcnVubmVyVXBFZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodE51bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbXBvaW5FZGl0LnN0cmluZyA9IHROdW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFtcG9pbkVkaXQuc3RyaW5nID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5lclVwRWRpdC5zdHJpbmcgPSAoMTAwIC0gdGhpcmRQbGFjZU51bSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW1wb2luRWRpdC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5lclVwRWRpdC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY2hhbXBvaW5QZXJjZW50ID0gY2hhbXBvaW5FZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICBsZXQgcnVubmVyVXBQZXJjZW50ID0gcnVubmVyVXBFZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICBsZXQgdGhpcmRQbGFjZVBlcmNlbnQgPSB0aGlyZFBsYWNlRWRpdC5zdHJpbmc7XG4gICAgICAgICAgICAgICAgbGV0IHJld2FyZFBlcmNlbnQgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoY2hhbXBvaW5QZXJjZW50Lmxlbmd0aCAmJiBydW5uZXJVcFBlcmNlbnQubGVuZ3RoICYmIHRoaXJkUGxhY2VQZXJjZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRQZXJjZW50ID0gY2hhbXBvaW5QZXJjZW50ICsgXCIsXCIgKyBydW5uZXJVcFBlcmNlbnQgKyBcIixcIiArIHRoaXJkUGxhY2VQZXJjZW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbXBvaW5QZXJjZW50Lmxlbmd0aCAmJiBydW5uZXJVcFBlcmNlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFBlcmNlbnQgPSBjaGFtcG9pblBlcmNlbnQgKyBcIixcIiArIHJ1bm5lclVwUGVyY2VudDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXdhcmRQZXJjZW50ID0gY2hhbXBvaW5QZXJjZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJld2FyZFBlcmNlbnQgPSByZXdhcmRQZXJjZW50O1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlR2FtZUxpc3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXdOb2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJnYW1lRWRpdGJveFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld05vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGFzc3dvcmRXYXJuQnRuXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZFRpcE5vZGUuYWN0aXZlID0gIXRoaXMucGFzc3dvcmRUaXBOb2RlLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuZXh0U3RlcEJ0blwiOlxuICAgICAgICAgICAgICAgIHRoaXMubmV4dENyZWF0ZVN0ZXAodGhpcy5jdXJlbnRTdGVwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5Nb2RlVGlwXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlVGlwTm9kZS5hY3RpdmUgPSAhdGhpcy5tb2RlVGlwTm9kZS5hY3RpdmU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicHJldmlvdXNCdG5cIjpcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRDcmVhdGVTdGVwKHRoaXMuY3VyZW50U3RlcCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFkZEJ0blwiOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFtb3V0ID0gdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCthbW91dCA+PSB0aGlzLmVudGVyQW1vdW50TWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nID0gdGhpcy5lbnRlckFtb3VudE1pbi50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZyA9ICgrYW1vdXQgKyAxMCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUphY2tQb3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3ViQnRuXCI6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW1vdXQgPSB0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoK2Ftb3V0IDw9IHRoaXMuZW50ZXJBbW91bnRNaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QW1vdW50RWRpdC5zdHJpbmcgPSB0aGlzLmVudGVyQW1vdW50TWF4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nID0gKCthbW91dCAtIDEwKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSmFja1BvdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjb25maW1CdG5cIjpcblxuICAgICAgICAgICAgICAgIGxldCBpc051bGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbXBvaW5TdHIgPSB0aGlzLmF3YXJkc05vZGVzWzBdLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmc7XG4gICAgICAgICAgICAgICAgbGV0IHJ1bm5lclVwU3RyID0gdGhpcy5hd2FyZHNOb2Rlc1sxXS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nO1xuICAgICAgICAgICAgICAgIGxldCB0aGlyZFBsYWNlU3RyID0gdGhpcy5hd2FyZHNOb2Rlc1syXS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBlb3BsZVJld2FyZCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzTnVsbCA9IGNoYW1wb2luU3RyLmxlbmd0aCA9PSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wZW9wbGVSZXdhcmQgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpc051bGwgPSBjaGFtcG9pblN0ci5sZW5ndGggPT0gMCB8fCBydW5uZXJVcFN0ci5sZW5ndGggPT0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGVvcGxlUmV3YXJkID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNOdWxsID0gY2hhbXBvaW5TdHIubGVuZ3RoID09IDAgfHwgcnVubmVyVXBTdHIubGVuZ3RoID09IDAgfHwgdGhpcmRQbGFjZVN0ci5sZW5ndGggPT0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRvdXJuYW1lbnQuSW5jb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmphY2twb3RMYWJlbC5zdHJpbmdcIiwgdGhpcy5qYWNrcG90TGFiZWwuc3RyaW5nKTtcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWVJZDogdGhpcy5jdXJHYW1lSWQsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkRWRpdGJveC5zdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgIG51bWJlck9mUGFydGljaXBhbnRzOiB0aGlzLnBhcnRjaXBhbnRzTnVtLFxuICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50Um91bmRzOiAwLFxuICAgICAgICAgICAgICAgICAgICBib251c1NvdXJjZTogdGhpcy5ib251c1NvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgam9pbkZlZTogdGhpcy5ib251c1NvdXJjZSA9PSAxID8gK3RoaXMuc2V0QW1vdW50RWRpdC5zdHJpbmcgKiAxMDAwMCA6IDAsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUZlZTogdGhpcy5ib251c1NvdXJjZSA9PSAxID8gMCA6ICt0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nICogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZFBlcmNlbnQ6IHRoaXMucmV3YXJkUGVyY2VudCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBDb25maXJtQ3JlYXRlVG91cm5hbWVudCwgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbanNvbkRhdGFdIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNldEFtb3VudERlc2NcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFtb3VudFRpcHMubm9kZS5hY3RpdmUgPSAhdGhpcy5zZXRBbW91bnRUaXBzLm5vZGUuYWN0aXZlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXFUb3VybmFtZW50Q29uZmlnKCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVG91cm5hbWVudENvbmZpZyxcbiAgICAgICAgICAgIG51bGwpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk5ldFRvdXJuYW1lbnRDb25maWcoZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudENvbmZpZ1Jlcykge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMudG91dG5hbWVudERhdGEuZ2FtZUlkcyA9IGRhdGEuZ2FtZUlkcztcbiAgICAgICAgICAgIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkuc2VydmljZUZlZSA9IHRoaXMuc2VydmljZUZlZSA9IGRhdGEuc2VydmljZUZlZTtcbiAgICAgICAgICAgIHRoaXMucHJvcGxlVG9nZ2xlID0gZGF0YS5wZW9wbGU7XG4gICAgICAgICAgICB0aGlzLnNob3dDcmVhdGVWaWV3KENyZWF0ZVRvdXJuYW1lbnRTdGVwLlNldFJ1bGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRVJST1JDT0RFW2RhdGEuc3RhdHVzTXNnLnN0YXR1c10pO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuXG5cbiAgICBzaG93Q3JlYXRlVmlldyhzdGVwOiBDcmVhdGVUb3VybmFtZW50U3RlcCkge1xuICAgICAgICB0aGlzLnJlc2V0U2V0cFZpZXcoKTtcbiAgICAgICAgc3dpdGNoIChzdGVwKSB7XG4gICAgICAgICAgICBjYXNlIENyZWF0ZVRvdXJuYW1lbnRTdGVwLlNldFJ1bGVzOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UnVsZXNOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IGdhbWVJdGVtID0gdGhpcy5nYW1lTGlzdE5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTGlzdE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gdGhpcy50b3V0bmFtZW50RGF0YS5nYW1lSWRzLmxlbmd0aCA+IDMgPyAzIDogdGhpcy50b3V0bmFtZW50RGF0YS5nYW1lSWRzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXdOb2RlLmhlaWdodCA9IHRoaXMudG91dG5hbWVudERhdGEuZ2FtZUlkcy5sZW5ndGggPiAzID8gNTUgKiAzLjc1IDogNTUgKiBudW07XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TWFza05vZGUuaGVpZ2h0ID0gdGhpcy5zY3JvbGxWaWV3Tm9kZS5oZWlnaHQgLSAxMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG91dG5hbWVudERhdGEuZ2FtZUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZ2FtZU5hbWUgPSBDb25maWcuZ2FtZXNbdGhpcy50b3V0bmFtZW50RGF0YS5nYW1lSWRzW2ldXS5kaXNOYW1lO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKGdhbWVJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLmdhbWVMaXN0Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVsnZ2FtZUlkJ10gPSB0aGlzLnRvdXRuYW1lbnREYXRhLmdhbWVJZHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2dhbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdhbWVOYW1lO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5jbGlja0dhbWVJdGVtLmJpbmQodGhpcywgaXRlbSksIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvdXRuYW1lbnREYXRhLmdhbWVJZHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lRWRpdGJveC5zdHJpbmcgPSB0aGlzLmdhbWVFZGl0Ym94LnN0cmluZy5sZW5ndGggPyB0aGlzLmdhbWVFZGl0Ym94LnN0cmluZyA6IENvbmZpZy5nYW1lc1t0aGlzLnRvdXRuYW1lbnREYXRhLmdhbWVJZHNbMF1dLmRpc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyR2FtZUlkID0gdGhpcy5jdXJHYW1lSWQgPyB0aGlzLmN1ckdhbWVJZCA6IHRoaXMudG91dG5hbWVudERhdGEuZ2FtZUlkc1swXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ3JlYXRlVG91cm5hbWVudFN0ZXAuQ3JlYXRlQmFzaWNJbmZvcm1hdGlvbjpcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUJhc2ljSW5mb3JtYXRpb25Ob2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGV0IHBlb3BsZUl0ZW0gPSB0aGlzLnBlb3BsZVRvZ2dsZU5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgdGhpcy5wZW9wbGVUb2dnbGVOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0Y2lwYW50c051bSA9IHRoaXMucGFydGNpcGFudHNOdW0gPyB0aGlzLnBhcnRjaXBhbnRzTnVtIDogdGhpcy5wcm9wbGVUb2dnbGVbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlRmVlTGFiZWwuc3RyaW5nID0gdGhpcy5zZXJ2aWNlRmVlICsgXCIlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlRmVlTm9kZS5hY3RpdmUgPSB0aGlzLnNlcnZpY2VGZWUgIT0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcGxlVG9nZ2xlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUocGVvcGxlSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5wZW9wbGVUb2dnbGVOb2RlO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdwZW9wbGVOdW0nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMucHJvcGxlVG9nZ2xlW2ldLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3QgPSBpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA9IHRoaXMucHJvcGxlVG9nZ2xlW2ldID09IHRoaXMucGFydGNpcGFudHNOdW07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3Blb3BsZU51bScpLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChzZWxlY3QgPyAnI0ZGRkZGRicgOiAnI0FFOUY5NicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ3JlYXRlVG91cm5hbWVudFN0ZXAuU2V0UmV3YXJkOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmV3YXJkTm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5wZW9wbGVSZXdhcmQgPSB0aGlzLnBlb3BsZVJld2FyZCA/IHRoaXMucGVvcGxlUmV3YXJkIDogMTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXdhcmQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJvbnVzU291cmNlVG9nZ2xlTm9kZS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiJykuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuaXNDaGVja2VkID8gJyNGRkZGRkYnIDogJyNBRTlGOTYnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSkuaXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJvbnVzU291cmNlID0gK2l0ZW0ubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5hd2FyZHNUb2dnbGVOb2RlLmNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3Blb3BsZScpLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA/ICcjRkZGRkZGJyA6ICcjQUU5Rjk2Jyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmVudGVyQW1vdW50TWluID0gdGhpcy5ib251c1NvdXJjZSA9PSAwID8gdGhpcy5wYXJ0Y2lwYW50c051bSAqIDEwIDogMTA7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlckFtb3VudE1heCA9IHRoaXMuYm9udXNTb3VyY2UgPT0gMCA/IHRoaXMucGFydGNpcGFudHNOdW0gKiAxMDAwMCA6IDEwMDAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QW1vdW50RWRpdC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgdGhlIGFtb3VudFwiICsgdGhpcy5lbnRlckFtb3VudE1pbiArIFwiLVwiICsgdGhpcy5lbnRlckFtb3VudE1heDtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nID0gdGhpcy5lbnRlckFtb3VudE1pbi50b1N0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYm9udXNTb3VyY2UgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmphY2twb3RMYWJlbC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KCgrdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZyAqICgxMDAgLSB0aGlzLnNlcnZpY2VGZWUpICogMC4wMSkgKiAxMDAwMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuamFja3BvdExhYmVsLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoKCt0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nICogKDEwMCAtIHRoaXMuc2VydmljZUZlZSkgKiB0aGlzLnBhcnRjaXBhbnRzTnVtICogMC4wMSkgKiAxMDAwMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cmVudFN0ZXAgPSBzdGVwO1xuICAgICAgICB0aGlzLnNob3dTdGVwVGlwKHN0ZXApO1xuICAgIH1cblxuICAgIG5leHRDcmVhdGVTdGVwKHN0ZXAsIGFkZFNldHApIHtcbiAgICAgICAgc3dpdGNoIChzdGVwKSB7XG4gICAgICAgICAgICBjYXNlIENyZWF0ZVRvdXJuYW1lbnRTdGVwLlNldFJ1bGVzOlxuICAgICAgICAgICAgICAgIGlmIChhZGRTZXRwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdhbWVFZGl0Ym94LnN0cmluZy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5Ub3VybmFtZW50LlNlbGVjdEdhbWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFzc3dvcmRFZGl0Ym94LnN0cmluZy5sZW5ndGggIT0gNiAmJiB0aGlzLnBhc3N3b3JkRWRpdGJveC5zdHJpbmcubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVG91cm5hbWVudC5FbnRlckNvcnJlY3RQYXNzd29yZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDcmVhdGVWaWV3KENyZWF0ZVRvdXJuYW1lbnRTdGVwLkNyZWF0ZUJhc2ljSW5mb3JtYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDcmVhdGVUb3VybmFtZW50U3RlcC5DcmVhdGVCYXNpY0luZm9ybWF0aW9uOlxuICAgICAgICAgICAgICAgIGlmIChhZGRTZXRwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NyZWF0ZVZpZXcoQ3JlYXRlVG91cm5hbWVudFN0ZXAuU2V0UmV3YXJkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dDcmVhdGVWaWV3KENyZWF0ZVRvdXJuYW1lbnRTdGVwLlNldFJ1bGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENyZWF0ZVRvdXJuYW1lbnRTdGVwLlNldFJld2FyZDpcbiAgICAgICAgICAgICAgICBpZiAoIWFkZFNldHApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Q3JlYXRlVmlldyhDcmVhdGVUb3VybmFtZW50U3RlcC5DcmVhdGVCYXNpY0luZm9ybWF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuXG4gICAgc2hvd1N0ZXBUaXAoc3RlcCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN0ZXBOb2RlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggKyAxID09IHN0ZXApIHtcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc3RlcCA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0ZXBKVE5vZGVbMF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0ZXBKVE5vZGVbMV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGVwID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3RlcEpUTm9kZVswXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGVwSlROb2RlWzFdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGVwSlROb2RlWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN0ZXBKVE5vZGVbMV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0U2V0cFZpZXcoKSB7XG4gICAgICAgIHRoaXMuc2V0UnVsZXNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNyZWF0ZUJhc2ljSW5mb3JtYXRpb25Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFJld2FyZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGNsaWNrR2FtZUl0ZW0odGFnZXQ6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5jdXJHYW1lSWQgPSB0YWdldFsnZ2FtZUlkJ107XG4gICAgICAgIHRoaXMuZ2FtZUVkaXRib3guc3RyaW5nID0gdGFnZXQuZ2V0Q2hpbGRCeU5hbWUoJ2dhbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZ1xuICAgICAgICB0aGlzLnNjcm9sbFZpZXdOb2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjbGlja1Blb3BsZUl0ZW0odG9nZ2xlKSB7XG4gICAgICAgIHRoaXMucGFydGNpcGFudHNOdW0gPSArdG9nZ2xlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Blb3BsZU51bScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nO1xuICAgICAgICB0aGlzLnBlb3BsZVRvZ2dsZU5vZGUuY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3Blb3BsZU51bScpLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA/ICcjRkZGRkZGJyA6ICcjQUU5Rjk2Jyk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2xpY2tCb251c1NvdXJjZSh0b2dnbGUpIHtcbiAgICAgICAgaWYgKHRoaXMuYm9udXNTb3VyY2UgPT0gK3RvZ2dsZS5ub2RlLm5hbWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5ib251c1NvdXJjZSA9ICt0b2dnbGUubm9kZS5uYW1lO1xuICAgICAgICB0aGlzLmJvbnVzU291cmNlVG9nZ2xlTm9kZS5jaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnYicpLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA/ICcjRkZGRkZGJyA6ICcjQUU5Rjk2Jyk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZW50ZXJBbW91bnRNaW4gPSB0aGlzLmJvbnVzU291cmNlID09IDAgPyB0aGlzLnBhcnRjaXBhbnRzTnVtICogMTAgOiAxMDtcbiAgICAgICAgdGhpcy5lbnRlckFtb3VudE1heCA9IHRoaXMuYm9udXNTb3VyY2UgPT0gMCA/IHRoaXMucGFydGNpcGFudHNOdW0gKiAxMDAwMCA6IDEwMDAwO1xuICAgICAgICBsZXQgYW1vdW50TnVtID0gK3RoaXMuc2V0QW1vdW50RWRpdC5zdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLmJvbnVzU291cmNlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QW1vdW50RWRpdC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KChhbW91bnROdW0gKiB0aGlzLnBhcnRjaXBhbnRzTnVtKSAqIDEwMDAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmphY2twb3RMYWJlbC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KCgrdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZyAqICgxMDAgLSB0aGlzLnNlcnZpY2VGZWUpICogMC4wMSkgKiAxMDAwMCwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoKGFtb3VudE51bSAvIHRoaXMucGFydGNpcGFudHNOdW0pICogMTAwMDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuamFja3BvdExhYmVsLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoKCt0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nICogKDEwMCAtIHRoaXMuc2VydmljZUZlZSkgKiB0aGlzLnBhcnRjaXBhbnRzTnVtICogMC4wMSkgKiAxMDAwMCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0QW1vdW50RWRpdC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgdGhlIGFtb3VudCBcIiArIHRoaXMuZW50ZXJBbW91bnRNaW4gKyBcIi1cIiArIHRoaXMuZW50ZXJBbW91bnRNYXg7XG4gICAgfVxuXG4gICAgY2xpY2tQZW9wbGVSZXdhcmQodG9nZ2xlKSB7XG4gICAgICAgIGlmICh0aGlzLnBlb3BsZVJld2FyZCA9PSArdG9nZ2xlLm5vZGUubmFtZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJld2FyZFBlcmNlbnQgPSBcIlwiO1xuICAgICAgICB0aGlzLnBlb3BsZVJld2FyZCA9ICt0b2dnbGUubm9kZS5uYW1lO1xuICAgICAgICB0aGlzLmF3YXJkc1RvZ2dsZU5vZGUuY2hpbGRyZW4uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3Blb3BsZScpLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChpdGVtLmdldENvbXBvbmVudChjYy5Ub2dnbGUpLmlzQ2hlY2tlZCA/ICcjRkZGRkZGJyA6ICcjQUU5Rjk2Jyk7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc2hvd1Jld2FyZCgpO1xuICAgIH1cblxuICAgIHNob3dSZXdhcmQoKSB7XG4gICAgICAgIGxldCBzaG93TnVtID0gMDtcbiAgICAgICAgdGhpcy5hd2FyZHNOb2Rlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA+IHRoaXMucGVvcGxlUmV3YXJkKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd051bSsrO1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzaG93TnVtID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYXdhcmRzTm9kZXNbMF0uZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyA9IFwiMTAwXCI7XG4gICAgICAgICAgICB0aGlzLnJld2FyZFBlcmNlbnQgPSBcIjEwMFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hd2FyZHNOb2Rlc1swXS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCkuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuYXdhcmRzTm9kZXNbMV0uZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLmF3YXJkc05vZGVzWzJdLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB1cGRhdGVKYWNrUG90KGVkaXRib3ggPSBudWxsKSB7XG4gICAgICAgIGlmIChlZGl0Ym94KSB7XG4gICAgICAgICAgICBpZiAoZWRpdGJveC5zdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlmc2MgPSBlZGl0Ym94LnN0cmluZztcbiAgICAgICAgICAgICAgICBsZXQgaWZzY1QgPSBuZXcgUmVnRXhwKCdeWzAtOV0qJCcpLnRlc3QoaWZzYyk7Ly/mo4DmtYvmmK/lkKbpg73mmK/oi7HmloflkozmlbDlrZdcbiAgICAgICAgICAgICAgICBpZiAoIWlmc2NUKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5Ub3VybmFtZW50LkFtb3VudFdvbmcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCt0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nIDwgdGhpcy5lbnRlckFtb3VudE1pbikge1xuICAgICAgICAgICAgdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZyA9IHRoaXMuZW50ZXJBbW91bnRNaW4gKyBcIlwiO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoXCJFbnRlciB0aGUgYW1vdW50IFwiICsgdGhpcy5lbnRlckFtb3VudE1pbiArIFwiLVwiICsgdGhpcy5lbnRlckFtb3VudE1heCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCt0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nID4gdGhpcy5lbnRlckFtb3VudE1heCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBbW91bnRFZGl0LnN0cmluZyA9IHRoaXMuZW50ZXJBbW91bnRNYXggKyBcIlwiO1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoXCJFbnRlciB0aGUgYW1vdW50IFwiICsgdGhpcy5lbnRlckFtb3VudE1pbiArIFwiLVwiICsgdGhpcy5lbnRlckFtb3VudE1heCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYm9udXNTb3VyY2UgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5qYWNrcG90TGFiZWwuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leSgoK3RoaXMuc2V0QW1vdW50RWRpdC5zdHJpbmcgKiAoMTAwIC0gdGhpcy5zZXJ2aWNlRmVlKSAqIDAuMDEpICogMTAwMDAsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuamFja3BvdExhYmVsLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoKCt0aGlzLnNldEFtb3VudEVkaXQuc3RyaW5nICogKDEwMCAtIHRoaXMuc2VydmljZUZlZSkgKiB0aGlzLnBhcnRjaXBhbnRzTnVtICogMC4wMSkgKiAxMDAwMCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBlZGl0Qm94RW5kZWQoZWRpdGJveDogY2MuRWRpdEJveCkge1xuICAgICAgICBpZiAoZWRpdGJveC5zdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaWZzYyA9IGVkaXRib3guc3RyaW5nO1xuICAgICAgICAgICAgbGV0IGlmc2NUID0gbmV3IFJlZ0V4cCgnXlswLTldKiQnKS50ZXN0KGlmc2MpOy8v5qOA5rWL5piv5ZCm6YO95piv6Iux5paH5ZKM5pWw5a2XXG4gICAgICAgICAgICBpZiAoIWlmc2NUKSB7XG4gICAgICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVG91cm5hbWVudC5wYXNzd29yZFdvbmcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==