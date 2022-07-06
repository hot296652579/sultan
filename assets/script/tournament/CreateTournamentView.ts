import { Config } from "../common/config/Config";
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { Manager } from "../framework/Framework";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import ConfirmCreateTournament from "./ConfirmCreateTournament";
import TournamentData, { CreateTournamentStep } from "./TournamentData";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CreateTournamentView extends UIView implements IController<LobbyService> {

    @property({ type: cc.Node, tooltip: "" })
    setRulesNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    createBasicInformationNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: "" })
    setRewardNode: cc.Node = null;

    @property(cc.EditBox)
    gameEditbox: cc.EditBox = null;

    @property(cc.EditBox)
    passwordEditbox: cc.EditBox = null;

    @property(cc.Node)
    gameListNode: cc.Node = null;

    @property(cc.Node)
    passwordTipNode: cc.Node = null;

    @property(cc.Node)
    modeTipNode: cc.Node = null;

    @property(cc.Node)
    createStepNode: cc.Node[] = [];

    @property(cc.Node)
    createStepJTNode: cc.Node[] = [];

    @property(cc.Node)
    peopleToggleNode: cc.Node = null;

    @property(cc.Node)
    bonusSourceToggleNode: cc.Node = null;

    @property(cc.Node)
    awardsToggleNode: cc.Node = null;

    @property(cc.Node)
    serviceFeeNode: cc.Node = null;

    @property(cc.Label)
    serviceFeeLabel: cc.Label = null;

    @property(cc.Label)
    jackpotLabel: cc.Label = null;

    @property(cc.EditBox)
    setAmountEdit: cc.EditBox = null;

    @property(cc.Label)
    setAmountTips: cc.Label = null;

    @property(cc.Node)
    awardsNodes: cc.Node[] = [];

    @property(cc.Node)
    scrollViewNode: cc.Node = null;

    @property(cc.Node)
    viewMaskNode: cc.Node = null;

    service: LobbyService;
    private toutnamentData: TournamentData = null;
    private curentStep: number;
    private curGameId: number;
    private partcipantsNum: number;
    private serviceFee: number;
    private bonusSource: number;
    private peopleReward: number;
    private propleToggle: number[];
    private enterAmountMin: number;
    private enterAmountMax: number;
    private rewardPercent: string;

    public static getPrefabUrl() {
        return "tournament/prefabs/CreateTournamentView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.toutnamentData = TournamentData.getInstance();

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
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentConfig), this.onNetTournamentConfig);
        this.registerEvent("close_createTournamentView", this.closeWithAction)

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
                        if (+champoinEdit.string < 0 || champoinEdit.string.length == 0) champoinEdit.string = "0";
                        if (+champoinEdit.string > 100) champoinEdit.string = "100";
                        let champoinNum = parseInt(champoinEdit.string);
                        champoinEdit.string = champoinNum.toString();
                        if (this.peopleReward == 1) {
                            champoinEdit.string = "100";
                        } else if (this.peopleReward == 2) {
                            runnerUpEdit.string = (100 - champoinNum).toString();
                        } else {
                            if (runnerUpEdit.string.length) {
                                let tNum = 100 - champoinNum - +runnerUpEdit.string;
                                if (tNum > 0) {
                                    thirdPlaceEdit.string = tNum.toString();
                                } else {
                                    thirdPlaceEdit.string = "0";
                                    runnerUpEdit.string = (100 - champoinNum).toString();
                                }
                            } else if (thirdPlaceEdit.string.length) {
                                let tNum = 100 - champoinNum - +thirdPlaceEdit.string;
                                if (tNum > 0) {
                                    runnerUpEdit.string = tNum.toString();
                                } else {
                                    runnerUpEdit.string = "0";
                                    thirdPlaceEdit.string = (100 - champoinNum).toString();
                                }
                            } else {
                                runnerUpEdit.string = "";
                                thirdPlaceEdit.string = "";
                            }
                        }

                        break;
                    case 1:
                        if (+runnerUpEdit.string < 0 || runnerUpEdit.string.length == 0) runnerUpEdit.string = "0";
                        if (+runnerUpEdit.string > 100) runnerUpEdit.string = "100";
                        let runnerUpNum = parseInt(runnerUpEdit.string);
                        runnerUpEdit.string = runnerUpNum.toString();
                        if (this.peopleReward == 2) {
                            champoinEdit.string = (100 - runnerUpNum).toString();
                        } else if (this.peopleReward == 3) {
                            if (champoinEdit.string.length) {
                                let tNum = 100 - runnerUpNum - +champoinEdit.string;
                                if (tNum > 0) {
                                    thirdPlaceEdit.string = tNum.toString();
                                } else {
                                    thirdPlaceEdit.string = "0";
                                    champoinEdit.string = (100 - runnerUpNum).toString();
                                }

                            } else if (thirdPlaceEdit.string.length) {
                                let tNum = 100 - runnerUpNum - +thirdPlaceEdit.string;
                                if (tNum > 0) {
                                    champoinEdit.string = tNum.toString();
                                } else {
                                    champoinEdit.string = "0";
                                    thirdPlaceEdit.string = (100 - runnerUpNum).toString();
                                }
                            } else {
                                champoinEdit.string = "";
                                thirdPlaceEdit.string = "";
                            }
                        }
                        break;
                    case 2:
                        if (+thirdPlaceEdit.string < 0 || thirdPlaceEdit.string.length == 0) thirdPlaceEdit.string = "0";
                        if (+thirdPlaceEdit.string > 100) thirdPlaceEdit.string = "100";
                        let thirdPlaceNum = parseInt(thirdPlaceEdit.string);
                        thirdPlaceEdit.string = thirdPlaceNum.toString();
                        if (champoinEdit.string.length) {
                            let tNum = 100 - thirdPlaceNum - +champoinEdit.string;
                            if (tNum > 0) {
                                runnerUpEdit.string = tNum.toString();
                            } else {
                                runnerUpEdit.string = "0";
                                champoinEdit.string = (100 - thirdPlaceNum).toString();
                            }

                        } else if (runnerUpEdit.string.length) {
                            let tNum = 100 - thirdPlaceNum - +runnerUpEdit.string;
                            if (tNum > 0) {
                                champoinEdit.string = tNum.toString();
                            } else {
                                champoinEdit.string = "0";
                                runnerUpEdit.string = (100 - thirdPlaceNum).toString();
                            }
                        } else {
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
                } else if (champoinPercent.length && runnerUpPercent.length) {
                    rewardPercent = champoinPercent + "," + runnerUpPercent;
                } else {
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
                    } else {
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
                    } else {
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
                } else if (this.peopleReward == 2) {
                    isNull = champoinStr.length == 0 || runnerUpStr.length == 0;
                } else if (this.peopleReward == 3) {
                    isNull = champoinStr.length == 0 || runnerUpStr.length == 0 || thirdPlaceStr.length == 0;
                }
                if (isNull) {
                    PanelHelp.showTip(i18n.Tournament.Incomplete);
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
                Manager.uiManager.open({ type: ConfirmCreateTournament, bundle: BUNDLE_RESOURCES, args: [jsonData] });
                break;
            case "setAmountDesc":
                this.setAmountTips.node.active = !this.setAmountTips.node.active;
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    private reqTournamentConfig() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TournamentConfig,
            null);

    }

    private onNetTournamentConfig(data: com.bt.game.proto.hall.ITournamentConfigRes) {
        if (data.statusMsg.status == 0) {
            this.toutnamentData.gameIds = data.gameIds;
            TournamentData.getInstance().serviceFee = this.serviceFee = data.serviceFee;
            this.propleToggle = data.people;
            this.showCreateView(CreateTournamentStep.SetRules);
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }

    }




    showCreateView(step: CreateTournamentStep) {
        this.resetSetpView();
        switch (step) {
            case CreateTournamentStep.SetRules:
                this.setRulesNode.active = true;
                let gameItem = this.gameListNode.children[0];
                this.gameListNode.removeAllChildren();
                let num = this.toutnamentData.gameIds.length > 3 ? 3 : this.toutnamentData.gameIds.length;
                this.scrollViewNode.height = this.toutnamentData.gameIds.length > 3 ? 55 * 3.75 : 55 * num;
                this.viewMaskNode.height = this.scrollViewNode.height - 10;
                for (let i = 0; i < this.toutnamentData.gameIds.length; i++) {
                    let gameName = Config.games[this.toutnamentData.gameIds[i]].disName;
                    let item = cc.instantiate(gameItem);
                    item.parent = this.gameListNode;
                    item['gameId'] = this.toutnamentData.gameIds[i];
                    item.getChildByName('game').getComponent(cc.Label).string = gameName;
                    item.off(cc.Node.EventType.TOUCH_END);
                    item.on(cc.Node.EventType.TOUCH_END, this.clickGameItem.bind(this, item), this);
                }

                if (this.toutnamentData.gameIds[0]) {
                    this.gameEditbox.string = this.gameEditbox.string.length ? this.gameEditbox.string : Config.games[this.toutnamentData.gameIds[0]].disName;
                    this.curGameId = this.curGameId ? this.curGameId : this.toutnamentData.gameIds[0];
                }

                break;
            case CreateTournamentStep.CreateBasicInformation:
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
            case CreateTournamentStep.SetReward:
                this.setRewardNode.active = true
                this.peopleReward = this.peopleReward ? this.peopleReward : 1;
                this.showReward();
                this.bonusSourceToggleNode.children.forEach(item => {
                    item.getChildByName('b').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
                    if (item.getComponent(cc.Toggle).isChecked) {
                        this.bonusSource = +item.name;
                    }
                })
                this.awardsToggleNode.children.forEach(item => {
                    item.getChildByName('people').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
                })
                this.enterAmountMin = this.bonusSource == 0 ? this.partcipantsNum * 10 : 10;
                this.enterAmountMax = this.bonusSource == 0 ? this.partcipantsNum * 10000 : 10000;
                this.setAmountEdit.placeholder = "Enter the amount" + this.enterAmountMin + "-" + this.enterAmountMax;
                this.setAmountEdit.string = this.enterAmountMin.toString();

                if (this.bonusSource == 0) {
                    this.jackpotLabel.string = UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * 0.01) * 10000, false);
                } else {
                    this.jackpotLabel.string = UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * this.partcipantsNum * 0.01) * 10000, false);
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
            case CreateTournamentStep.SetRules:
                if (addSetp) {
                    if (this.gameEditbox.string.length == 0) {
                        PanelHelp.showTip(i18n.Tournament.SelectGame);
                    } else if (this.passwordEditbox.string.length != 6 && this.passwordEditbox.string.length != 0) {
                        PanelHelp.showTip(i18n.Tournament.EnterCorrectPassword);
                    } else {
                        this.showCreateView(CreateTournamentStep.CreateBasicInformation);
                    }
                }
                break;
            case CreateTournamentStep.CreateBasicInformation:
                if (addSetp) {
                    this.showCreateView(CreateTournamentStep.SetReward);
                } else {
                    this.showCreateView(CreateTournamentStep.SetRules);
                }
                break;
            case CreateTournamentStep.SetReward:
                if (!addSetp) {
                    this.showCreateView(CreateTournamentStep.CreateBasicInformation);
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
            } else {
                item.active = true;
            }
        });
        if (step == 1) {
            this.createStepJTNode[0].active = false;
            this.createStepJTNode[1].active = true;
        } else if (step == 2) {
            this.createStepJTNode[0].active = true;
            this.createStepJTNode[1].active = false;
        } else {
            this.createStepJTNode[0].active = true;
            this.createStepJTNode[1].active = true;
        }
    }

    resetSetpView() {
        this.setRulesNode.active = false;
        this.createBasicInformationNode.active = false;
        this.setRewardNode.active = false;
    }
    clickGameItem(taget: cc.Node) {
        this.curGameId = taget['gameId'];
        this.gameEditbox.string = taget.getChildByName('game').getComponent(cc.Label).string
        this.scrollViewNode.parent.active = false;
    }

    clickPeopleItem(toggle) {
        this.partcipantsNum = +toggle.node.getChildByName('peopleNum').getComponent(cc.Label).string;
        this.peopleToggleNode.children.forEach(item => {
            item.getChildByName('peopleNum').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
        })
    }

    clickBonusSource(toggle) {
        if (this.bonusSource == +toggle.node.name) return;
        this.bonusSource = +toggle.node.name;
        this.bonusSourceToggleNode.children.forEach(item => {
            item.getChildByName('b').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
        })
        this.enterAmountMin = this.bonusSource == 0 ? this.partcipantsNum * 10 : 10;
        this.enterAmountMax = this.bonusSource == 0 ? this.partcipantsNum * 10000 : 10000;
        let amountNum = +this.setAmountEdit.string;
        if (this.bonusSource == 0) {
            this.setAmountEdit.string = UtilMgr.changeMoney((amountNum * this.partcipantsNum) * 10000, false, true);
            this.jackpotLabel.string = UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * 0.01) * 10000, false);
        } else {
            this.setAmountEdit.string = UtilMgr.changeMoney((amountNum / this.partcipantsNum) * 10000, false, true);
            this.jackpotLabel.string = UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * this.partcipantsNum * 0.01) * 10000, false);
        }
        this.setAmountEdit.placeholder = "Enter the amount " + this.enterAmountMin + "-" + this.enterAmountMax;
    }

    clickPeopleReward(toggle) {
        if (this.peopleReward == +toggle.node.name) return;
        this.rewardPercent = "";
        this.peopleReward = +toggle.node.name;
        this.awardsToggleNode.children.forEach(item => {
            item.getChildByName('people').color = new cc.Color().fromHEX(item.getComponent(cc.Toggle).isChecked ? '#FFFFFF' : '#AE9F96');
        })
        this.showReward();
    }

    showReward() {
        let showNum = 0;
        this.awardsNodes.forEach((item, index) => {
            if (index + 1 > this.peopleReward) {
                item.active = false;
            } else {
                showNum++;
                item.active = true;
            }
        });
        if (showNum == 1) {
            this.awardsNodes[0].getComponent(cc.EditBox).string = "100";
            this.rewardPercent = "100";
        } else {
            this.awardsNodes[0].getComponent(cc.EditBox).string = "";
            this.awardsNodes[1].getComponent(cc.EditBox).string = "";
            this.awardsNodes[2].getComponent(cc.EditBox).string = "";
        }

    }

    updateJackPot(editbox = null) {
        if (editbox) {
            if (editbox.string.length) {
                let ifsc = editbox.string;
                let ifscT = new RegExp('^[0-9]*$').test(ifsc);//检测是否都是英文和数字
                if (!ifscT) {
                    editbox.string = "";
                    PanelHelp.showTip(i18n.Tournament.AmountWong)
                    return;
                }
            }
        }
        if (+this.setAmountEdit.string < this.enterAmountMin) {
            this.setAmountEdit.string = this.enterAmountMin + "";
            PanelHelp.showTip("Enter the amount " + this.enterAmountMin + "-" + this.enterAmountMax);
        }
        if (+this.setAmountEdit.string > this.enterAmountMax) {
            this.setAmountEdit.string = this.enterAmountMax + "";
            PanelHelp.showTip("Enter the amount " + this.enterAmountMin + "-" + this.enterAmountMax);
        }
        if (this.bonusSource == 0) {
            this.jackpotLabel.string = UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * 0.01) * 10000, false);
        } else {
            this.jackpotLabel.string = UtilMgr.changeMoney((+this.setAmountEdit.string * (100 - this.serviceFee) * this.partcipantsNum * 0.01) * 10000, false);
        }

    }

    editBoxEnded(editbox: cc.EditBox) {
        if (editbox.string.length) {
            let ifsc = editbox.string;
            let ifscT = new RegExp('^[0-9]*$').test(ifsc);//检测是否都是英文和数字
            if (!ifscT) {
                editbox.string = "";
                PanelHelp.showTip(i18n.Tournament.passwordWong)
            }
        }
    }

    onDestroy() {
        super.onDestroy();
    }
}
