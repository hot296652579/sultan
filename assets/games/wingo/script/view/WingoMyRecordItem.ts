import { Manager } from "../../../../script/common/manager/Manager";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { EventApi } from "../../../../script/framework/event/EventApi";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import Operation from "../../../../script/framework/extentions/Operation";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import { WingoColorDefine } from "../define/WingoColorDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WingoMyRecordItem extends UIView {

    @property(cc.Label)
    private labIssue: cc.Label = null;

    @property(cc.Label)
    private labDate: cc.Label = null;

    @property(cc.Label)
    private labBetTotalGold: cc.Label = null;

    @property(cc.Label)
    private labIncomeGold: cc.Label = null;

    @property(cc.Label)
    private labBetGoldTitle: cc.Label = null;

    @property(cc.Label)
    private labBetGoldValue: cc.Label = null;

    @property(cc.Label)
    private labHargaTitle: cc.Label = null;

    @property(cc.Label)
    private labHargaValue: cc.Label = null;

    @property(cc.Label)
    private labStatusTitle: cc.Label = null;

    @property(cc.Label)
    private labStatusValue: cc.Label = null;

    @property(cc.Label)
    private labBetValueTitle: cc.Label = null;

    @property(cc.Label)
    private labBetValueValue: cc.Label = null;

    @property(cc.Label)
    private labCostTitle: cc.Label = null;

    @property(cc.Label)
    private labCostValue: cc.Label = null;

    @property(cc.Label)
    private labLotteryTitle: cc.Label = null;

    @property(cc.Label)
    private labLotteryValue: cc.Label = null;

    private _data: MST.WingoMyRecordInfo = null;

    onLoad() {
        this.initData();
        this.initUI();
    }

    start() {

    }

    private initData(): void {
        this._data = null;
    }

    private initUI(): void {
        this.labIssue.string = "";
        this.labDate.string = "";
        this.labBetTotalGold.string = "";
        this.labIncomeGold.string = "";
        this.labBetGoldTitle.string = "";
        this.labBetGoldValue.string = "";
        this.labHargaTitle.string = "";
        this.labHargaValue.string = "";
        this.labStatusTitle.string = "";
        this.labStatusValue.string = "";
        this.labBetValueTitle.string = "";
        this.labBetValueValue.string = "";
        this.labCostTitle.string = "";
        this.labCostValue.string = "";
        this.labLotteryTitle.string = "";
        this.labLotteryValue.string = "";
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }

    onLanguageChange() {
        this.labBetGoldTitle.language = Manager.makeLanguage("labBetGoldTitle", true);
        this.labHargaTitle.language = Manager.makeLanguage("labHargaTitle", true);
        this.labStatusTitle.language = Manager.makeLanguage("labStatusTitle", true);
        this.labBetValueTitle.language = Manager.makeLanguage("labBetValueTitle", true);
        this.labCostTitle.language = Manager.makeLanguage("labCostTitle", true);
        this.labLotteryTitle.language = Manager.makeLanguage("labLotteryTitle", true);
    }

    private refreshIncome(): void {
        if (!this._data.isFinish) {
            this.labIncomeGold.string = "";
            return;
        }

        let strIncomeGold: string = NumberUtils.converToC(this._data.incomeGold).toString();
        let color: cc.Color = null;
        if (this._data.incomeGold > 0) {
            strIncomeGold = `+${strIncomeGold}`;
            color = WingoColorDefine.Income.GREEN;
        } else if (this._data.incomeGold < 0) {
            color = WingoColorDefine.Income.RED;
        } else {
            color = WingoColorDefine.Income.NORMAL;
        }
        this.labIncomeGold.string = strIncomeGold;
        this.labIncomeGold.node.color = color;
    }

    private refreshStatus(): void {
        let color: cc.Color = null;
        let textLanguage: string = null;
        if (this._data.isFinish) {
            if (this._data.incomeGold < 0) {
                color = WingoColorDefine.IncomeStatus.LOSS;
                textLanguage = "loss";
            } else {
                color = WingoColorDefine.IncomeStatus.WIN;
                textLanguage = "win";
            }
        } else {
            color = WingoColorDefine.IncomeStatus.WAITING;
            textLanguage = "waiting";
        }
        this.labStatusValue.language = Manager.makeLanguage(textLanguage, true);;
        this.labStatusValue.node.color = color;
    }

    private refreshBetValue(): void {
        if (this._data.betType === MST.WingoBetType.Color) {
            this.labBetValueValue.language = Manager.makeLanguage(`abbr${this._data.betValue}`, true);
        } else if (this._data.betType === MST.WingoBetType.Num) {
            this.labBetValueValue.string = this._data.betValue.toString();
        }
    }

    private refreshLottery(): void {
        if (!this._data.isFinish) {
            this.labLotteryValue.string = "-";
            return;
        }
        this.labLotteryValue.string = this._data.num.toString();
    }

    public onShow(data: MST.WingoMyRecordInfo): void {
        this.initUI();
        this.onLanguageChange();

        this._data = data;

        let betTotalGold: number = Operation.add(Number(data.betActualGold), Number(data.costGold));

        this.labIssue.string = data.gameNo.toString();
        this.labDate.string = DateUtils.getDateByTimestamp(data.betTimestamp, "MM/dd hh:mm:ss");
        this.labBetTotalGold.language = Manager.makeLanguage(["labBetTotalGold", NumberUtils.converToC(betTotalGold)], true);
        this.refreshIncome();
        this.labBetGoldValue.string = NumberUtils.converToC(data.betActualGold);
        this.labHargaValue.string = data.harga.toString();
        this.refreshStatus();
        this.refreshBetValue();
        this.labCostValue.string = NumberUtils.converToC(data.costGold);
        this.refreshLottery();
    }

    public reset(): void {
        this.initData();
        this.initUI();
    }

    // update (dt) {}
}
