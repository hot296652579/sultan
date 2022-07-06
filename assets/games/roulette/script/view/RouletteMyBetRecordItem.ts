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
import { CrashColorDefine } from "../../../crash/script/define/CrashColorDefine";
import { CrashRateDefine } from "../../../crash/script/define/CrashRateDefine";
import { RouletteColorDefine } from "../define/RouletteColorDefine";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteMyBetRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Node)
    private icon0: cc.Node = null;
    @property(cc.Node)
    private icon1: cc.Node = null;
    @property(cc.Node)
    private icon2: cc.Node = null;

    @property(cc.Label)
    private labGameNo: cc.Label = null;

    @property(cc.Label)
    private labBetChips: cc.Label = null;
    @property(cc.Label)
    private labWinChips: cc.Label = null;

    @property(cc.Sprite)
    private imgLine: cc.Label = null;

    // 数据
    private _data: MST.IRouletteBetDetail = null;

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
        this.labGameNo.string = "";
        this.labBetChips.string = "";
        this.labWinChips.string = "";
        this.icon0.active = false;
        this.icon1.active = false;
        this.icon2.active = false;
    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }

    onLanguageChange() {

    }

    public onShow(data: MST.IRouletteBetDetail): void {
        this.onLanguageChange();

        this._data = data;

        this.labGameNo.language = Manager.makeLanguage(["labGameNo", data.round], true);
        this[`icon${data.color}`].active = true;
        this.labBetChips.string = String(NumberUtils.converToC(data.betChips));
        this.labWinChips.string = String(NumberUtils.converToC(data.winChips));
        this.labWinChips.node.color = this.getIncomeColor(data.winChips);
    }

    private getIncomeColor(incomeGold: number | Long): cc.Color {
        let color: cc.Color = null;
        if (incomeGold < 0) {
            color = RouletteColorDefine.ProfitLoss.RED;
        } else if (incomeGold > 0) {
            color = RouletteColorDefine.ProfitLoss.GREEN;
        } else {
            color = RouletteColorDefine.ProfitLoss.NORMAL;
        }
        return color;
    }

    public reset(): void {
        this.initData();
        this.initView();

    }

}
