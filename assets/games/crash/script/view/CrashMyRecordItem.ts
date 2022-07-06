import Long from "long";
import { Manager } from "../../../../script/common/manager/Manager";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import { EventApi } from "../../../../script/framework/event/EventApi";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import { CrashColorDefine } from "../define/CrashColorDefine";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashMyRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Label)
    private labGameNoTitle: cc.Label = null;

    @property(cc.Label)
    private labDate: cc.Label = null;

    @property(cc.Label)
    private labBetRate: cc.Label = null;

    @property(cc.Label)
    private labBetGold: cc.Label = null;

    @property(cc.Label)
    private labIncome: cc.Label = null;

    // 数据
    private _data: MST.IMyRecordInfo = null;

    onLoad(): void {
        super.onLoad();

        this.initData();
        this.initView();
    }

    protected start(): void {

    }

    private initData(): void {
        this._data = null;
    }

    private initView(): void {
        this.labGameNoTitle.string = "";
        this.labDate.string = "";
        this.labBetRate.string = "";
        this.labBetGold.string = "";
        this.labIncome.string = "";
        this.labIncome.node.color = CrashColorDefine.ProfitLoss.NORMAL;
    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }

    onLanguageChange() {
        this.labGameNoTitle.language = Manager.makeLanguage("labGameNoTitle", true);
        this.labDate.language = Manager.makeLanguage("labDate", true);
        this.labBetRate.language = Manager.makeLanguage("labBetRate", true);
        this.labBetGold.language = Manager.makeLanguage("labBetGold", true);
        this.labIncome.language = Manager.makeLanguage("labIncome", true);
    }

    private getIncomeColor(incomeGold: number | Long): cc.Color {
        let color: cc.Color = null;
        if (incomeGold < 0) {
            color = CrashColorDefine.ProfitLoss.RED;
        } else if (incomeGold > 0) {
            color = CrashColorDefine.ProfitLoss.GREEN;
        } else {
            color = CrashColorDefine.ProfitLoss.NORMAL;
        }
        return color;
    }

    private getIncomeString(incomeGold: number | Long): string {
        let strIncomeGold: string = NumberUtils.converToC(incomeGold);
        if (incomeGold > 0) {
            strIncomeGold = `+${strIncomeGold}`;
        }
        return strIncomeGold;
    }

    public onShow(data: MST.IMyRecordInfo): void {
        this.onLanguageChange();

        this._data = data;

        this.labGameNoTitle.string = data.gameNo.toString();
        this.labDate.string = new Date(Number(data.betTimestamp)).format("MM/dd hh:mm");
        this.labBetRate.string = NumberUtils.converToC(data.betMulti);
        this.labBetGold.string = NumberUtils.converToC(data.betGold);
        this.labIncome.string = this.getIncomeString(data.incomeGold);
        this.labIncome.node.color = this.getIncomeColor(data.incomeGold);
    }

    public reset(): void {
        this.initData();
        this.initView();

    }

}
