import { Config } from "../../../../script/common/config/Config";
import { Manager } from "../../../../script/common/manager/Manager";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import UserData from "../../../../script/data/UserData";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService, makeKey } from "../../../../script/framework/decorator/Decorators";
import { EventApi } from "../../../../script/framework/event/EventApi";
import Operation from "../../../../script/framework/extentions/Operation";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import { UtilMgr } from "../../../../script/global/UtilMgr";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import { WingoConfig } from "../config/WingoConfig";
import WingoData from "../data/WingoData";
import { WingoEventDefine } from "../define/WingoEventDefine";
import { WingoInterface } from "../interface/WingoInterface";
import WingoNetController from "../protocol/WingoNetController";

const { ccclass, property } = cc._decorator;

// 最小倍数
const MIN_MULTI: number = 1;
// 最大倍数
const MAX_MULTI: number = 999;
// 最小下注金额
const MIN_BET_GOLD: number = 2000;

@ccclass
@injectService(LobbyService.instance)
export default class WingoBetView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property([cc.SpriteFrame])
    private spfNumBetTitle: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    private spfColorBetTitle: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    private spfNumBetOption: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    private spfColorBetOption: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    private spfNumBet: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    private spfColorBet: cc.SpriteFrame[] = [];

    @property(cc.Node)
    private nodRoot: cc.Node = null;

    @property(cc.Sprite)
    private imgTitleBg: cc.Sprite = null;

    @property(cc.Label)
    private labTitle: cc.Label = null;

    @property(cc.Label)
    private labBetOptionTitle: cc.Label = null;

    @property(cc.ToggleContainer)
    private togBetOption: cc.ToggleContainer = null;

    @property([cc.Sprite])
    private imgBetOption: cc.Sprite[] = [];

    @property(cc.Label)
    private labMultiTitle: cc.Label = null;

    @property(cc.EditBox)
    private edbMulti: cc.EditBox = null;

    @property(cc.Label)
    private labServiceCostTitle: cc.Label = null;

    @property(cc.Label)
    private labMaxMultiTitle: cc.Label = null;

    @property(cc.Label)
    private labServiceCost: cc.Label = null;

    @property(cc.Label)
    private labCancel: cc.Label = null;

    @property(cc.Button)
    private btnBet: cc.Button = null;

    @property(cc.Sprite)
    private imgBet: cc.Sprite = null;

    @property(cc.Label)
    private labTotalCost: cc.Label = null;

    // 数据
    private _data: WingoInterface.BetData = null;
    // 用户数据
    private _userData: UserData = null;
    // 游戏数据
    private _wingoData: WingoData = null;
    // 显示位置
    private _showPosition: cc.Vec2 = null;
    // 隐藏位置
    private _hidePosition: cc.Vec2 = null;
    // 当前选择金币 服务器需要的乘以 100 的数据
    private _currSelectGold: number = null;
    // 当前选择金币类型
    private _currSelectGoldType: MST.WingoBetGoldType = null;

    public static getPrefabUrl() {
        return "prefabs/WingoBetView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();
    }

    start() {

    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_M2C_WingoBet_Res", this.onEvent_M2C_WingoBet_Res);

        this.registerEvent(WingoEventDefine.WingoStopBet, this.onEventWingoStopBet);
        this.registerEvent(WingoEventDefine.WingoStartBet, this.onEventWingoStartBet);

    }

    show(args) {
        super.show(args);
        this._data = args[0];
        this.clickBetGold(0);
        this.refreshColour();
        this.showWithAction(true);
        this.onLanguageChange();
    }

    public showWithAction(isOverrideShow?: boolean, completeCallback?: () => void): void {
        if (this.content) {
            if (!isOverrideShow) this.show(this.args);
            this.content.stopAllActions();
            if (this.content.getComponent(cc.Widget)) {
                this.content.getComponent(cc.Widget).enabled = false
            }
            cc.tween(this.content)
                .set({ position: this._hidePosition })
                .to(0.1, { position: this._showPosition })
                .call(() => {
                    if (completeCallback) completeCallback();
                    if (this.content.getComponent(cc.Widget)) {
                        this.content.getComponent(cc.Widget).enabled = true
                    }
                })
                .start();
        }
    }

    public hideWithAction(completeCallback?: () => void): void {
        if (this.content) {
            this.content.stopAllActions();
            cc.tween(this.content)
                .set({ position: this._showPosition })
                .to(0.1, { position: this._hidePosition })
                .call(() => {
                    this.hide();
                    if (completeCallback) completeCallback();
                })
                .start();
        }
    }

    onLanguageChange() {
        this.refreshTitleText();
        this.labBetOptionTitle.language = Manager.makeLanguage("labBetOptionTitle", true);
        this.labMultiTitle.language = Manager.makeLanguage("labMultiTitle", true);
        this.labServiceCostTitle.language = Manager.makeLanguage("labServiceCostTitle", true);
        this.labMaxMultiTitle.language = Manager.makeLanguage("labMaxMultiTitle", true);
        this.labCancel.language = Manager.makeLanguage("labCancel", true);
        this.refreshTotalBetGoldText();
    }

    private initData(): void {
        this._userData = G.DataMgr.get(UserData);
        this._wingoData = G.DataMgr.get(WingoData);
        this.content = this.nodRoot;
        this._showPosition = cc.v2(0, -(this.node.height / 2) + (this.nodRoot.height / 2));
        this._hidePosition = cc.v2(0, -(this.node.height / 2) - (this.nodRoot.height / 2));
    }

    private initView(): void {
        this.initColor();
        this.nodRoot.position = this._hidePosition;
        this.setEditboxMulti(MIN_MULTI);
    }

    private initColor(): void {
        this.imgTitleBg.spriteFrame = null;
        for (let v of this.imgBetOption) {
            v.spriteFrame = null;
        }
        this.imgBet.spriteFrame = null;
    }

    private refreshColour(): void {
        if (this._data.type === MST.WingoBetType.Num) {
            this.imgTitleBg.spriteFrame = this.spfNumBetTitle[this._data.value];
            this.imgBet.spriteFrame = this.spfNumBet[this._data.value];
            for (let v of this.imgBetOption) {
                v.spriteFrame = this.spfNumBetOption[this._data.value];
            }
        } else if (this._data.type === MST.WingoBetType.Color) {
            this.imgTitleBg.spriteFrame = this.spfColorBetTitle[this._data.value];
            this.imgBet.spriteFrame = this.spfColorBet[this._data.value];
            for (let v of this.imgBetOption) {
                v.spriteFrame = this.spfColorBetOption[this._data.value];
            }
        }
    }

    private setEditboxMulti(multi: number): void {
        this.edbMulti.string = multi.toString();
    }

    private getEditboxMulti(): number {
        let numMulti: number = Number(this.edbMulti.string);
        if (numMulti < MIN_MULTI) {
            numMulti = MIN_MULTI;
        } else if (numMulti > MAX_MULTI) {
            numMulti = MAX_MULTI;
        }
        return numMulti;
    }

    private setTotalBetGoldText(gold: number): void {
        this.labTotalCost.language = Manager.makeLanguage(["labTotalCost", UtilMgr.formatMoney(gold.toString(), true)], true);
    }

    private refreshTitleText(): void {
        if (this._data.type === MST.WingoBetType.Num) {
            this.labTitle.language = Manager.makeLanguage(["labTitle", this._data.value], true);
        } else if (this._data.type === MST.WingoBetType.Color) {
            this.labTitle.language = Manager.makeLanguage(WingoConfig.BetTitleLanguage[this._data.value], true);
        }
    }

    private refreshTotalBetGoldText(): void {
        let multi: number = this.getEditboxMulti();
        this.setTotalBetGoldText(Math.floor(Operation.mul(multi, this._currSelectGold)));
    }

    private refreshMultiText(): void {
        let multi: number = this.getEditboxMulti();
        this.labServiceCost.string = Math.floor(Operation.mul(Operation.mul(multi, this._currSelectGold), Operation.div(this._wingoData.cost, 10000))).toString();
    }

    private getBetGoldByIndex(index: number): number {
        let userGold: number = 0;
        if (this._userData && this._userData.info && this._userData.info.Gold) {
            userGold = Number(this._userData.info.Gold);
        }

        let betGold: number = null;
        switch (index) {
            case 0:
                betGold = 2000;
                break;
            case 1:
                betGold = 20000;
                break;
            case 2:
                betGold = Number(NumberUtils.converToC(userGold * 0.5));
                break;
            case 3:
                betGold = Number(NumberUtils.converToC(userGold));
                break;
        }
        return betGold;
    }

    private getBetGoldTypeByIndex(index: number): MST.WingoBetGoldType {
        let betGoldType: MST.WingoBetGoldType = null;
        switch (index) {
            case 0:
                betGoldType = MST.WingoBetGoldType.Gold2000;
                break;
            case 1:
                betGoldType = MST.WingoBetGoldType.Gold20000;
                break;
            case 2:
                betGoldType = MST.WingoBetGoldType.Half;
                break;
            case 3:
                betGoldType = MST.WingoBetGoldType.AllIn;
                break;
        }
        return betGoldType;
    }

    private clickBetGold(index: number): void {
        this._currSelectGold = this.getBetGoldByIndex(index);
        this._currSelectGoldType = this.getBetGoldTypeByIndex(index);
        this.togBetOption.node.getChildByName(`toggle${index}`).getComponent(cc.Toggle).isChecked = true;
        this.refreshMultiText();
        this.refreshTotalBetGoldText();
    }

    private clickMulti(index: number): void {
        let multi: number = this.getEditboxMulti();
        let tempMulti: number = multi;
        switch (index) {
            case 0: {
                tempMulti = tempMulti - 1;
                if (tempMulti < MIN_MULTI) {
                    multi = MIN_MULTI;
                } else {
                    multi = tempMulti;
                }
            }
                break;
            case 1: {
                tempMulti = tempMulti + 1;
                if (tempMulti > MAX_MULTI) {
                    multi = MAX_MULTI;
                } else {
                    multi = tempMulti;
                }
            }
                break;
            case 2:
                tempMulti = Math.floor(tempMulti / 2);
                if (tempMulti < MIN_MULTI) {
                    multi = MIN_MULTI;
                } else {
                    multi = tempMulti;
                }
                break;
            case 3:
                tempMulti = tempMulti * 2;
                if (tempMulti > MAX_MULTI) {
                    multi = MAX_MULTI;
                } else {
                    multi = tempMulti;
                }
                break;
        }
        this.setEditboxMulti(multi);
        this.refreshMultiText();
        this.refreshTotalBetGoldText();
    }

    private onChangedMulti(content: string, edb: cc.EditBox): void {
        let arrContent: string[] = content.split('');
        for (let i = arrContent.length - 1; i >= 0; --i) {
            let reg: RegExp = /[0-9]/g;
            if (!reg.test(arrContent[i])) {
                arrContent.splice(i, 1);
            }
        }

        let numContent: number = MIN_MULTI;

        let legalContent: string = arrContent.join(",").replace(/,/g, "");
        if (legalContent.length > 0) {
            numContent = Number(legalContent);
        }

        content = numContent.toString();

        edb.string = content;

        this.refreshMultiText();
        this.refreshTotalBetGoldText();
    }

    private testM2C_WingoBet_Res(): void {
        let controller: WingoNetController = Manager.netManager.mainNode.getComponent(WingoNetController);
        controller.onM2C_WingoBet_Res({
            RpcId: Manager.netManager.getNewSeqId() - 1,
            Error: 0,
            Message: "",
        })
    }

    private C2M_WingoBet_Req(goldType: MST.WingoBetGoldType): void {
        let req = MST.C2M_WingoBet_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            Mode: this._wingoData.currMode,
            BetType: this._data.type,
            BetValue: this._data.value,
            Multi: this.getEditboxMulti(),
            GoldType: goldType,
        })
        let buffer = MST.C2M_WingoBet_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_WingoBet_Req, MST.OuterOpcode_WingoGame.C2M_WingoBet_Req, buffer);

        // this.testM2C_WingoBet_Res();
    }

    private clickBet(): void {
        let betGold: number = Operation.mul(this._currSelectGold, this.getEditboxMulti());
        if (betGold < MIN_BET_GOLD) {
            PanelHelp.showTip(Manager.makeLanguage("MinimumBet", true));
            return;
        }

        if (betGold > Number(this._userData.info.Gold)) {
            PanelHelp.showTip(Manager.makeLanguage("InsufficientAmount", true));
            return;
        }

        this.C2M_WingoBet_Req(this._currSelectGoldType);
    }

    private onEvent_M2C_WingoBet_Res(data: MST.IM2C_WingoBet_Res): void {
        this._data = null;
        this._currSelectGold = null;
        this.hideWithAction();
    }

    private onEventWingoStopBet(): void {
        this.btnBet.interactable = false;
    }

    private onEventWingoStartBet(): void {
        this.btnBet.interactable = true;
    }

    public onClick(ButtonName: any, ButtonNode: any, index: string): void {
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

    onDestroy(): void {
        super.onDestroy();
    }

}
