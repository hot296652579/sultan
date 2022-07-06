import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import NumberUtils from "../common/utils/NumberUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { MST } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class DepositRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Label)
    private labDate: cc.Label = null;

    @property(cc.Label)
    private labChips: cc.Label = null;

    @property(cc.Label)
    private labAmount: cc.Label = null;

    // 数据
    private _data: MST.DepositRecord = null;

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
        this.labDate.string = "";
        this.labAmount.string = "";
        this.labChips.string = "";
    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }

    onLanguageChange() {

    }

    public onShow(data: MST.DepositRecord): void {
        this.onLanguageChange();

        this._data = data;
        this.labDate.string = new Date(Number(data.depositTime)).format("yyyy/MM:dd hh:mm");
        this.labChips.string = NumberUtils.converToC(data.chips);
        this.labAmount.string = `+${data.amount}`;

    }

    public reset(): void {
        this.initData();
        this.initView();

    }

}
