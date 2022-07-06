import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import UIView from "../../../../script/framework/ui/UIView";
import { CrashColorDefine } from "../define/CrashColorDefine";
import { CrashRateDefine } from "../define/CrashRateDefine";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Sprite)
    private imgBg: cc.Sprite = null;

    @property(cc.Label)
    private labRate: cc.Label = null;

    // 倍率
    private _rate: number = null;

    onLoad(): void {
        super.onLoad();

        this.initData();
        this.initView();
    }

    protected start(): void {

    }

    private initData(): void {
        this._rate = null;
    }

    private initView(): void {
        this.imgBg.node.active = false;
        this.labRate.string = "";
    }

    private refreshValue(): void {
        this.imgBg.node.active = this._rate !== null;;
        this.labRate.string = NumberUtils.converToC(this._rate);
    }

    private refreshColor(): void {
        if (isNaN(this._rate)) {
            return;
        }

        let color: cc.Color = CrashColorDefine.Record.WHITE;

        if (this._rate >= CrashRateDefine.ColorRate.YEELOW) {
            color = CrashColorDefine.Record.YEELOW;
        } else if (this._rate >= CrashRateDefine.ColorRate.BLUE) {
            color = CrashColorDefine.Record.BLUE;
        } else if (this._rate >= CrashRateDefine.ColorRate.GREEN) {
            color = CrashColorDefine.Record.GREEN;
        } else if (this._rate >= CrashRateDefine.ColorRate.RED) {
            color = CrashColorDefine.Record.RED;
        }

        this.labRate.node.color = color;
    }

    public setRate(rate: number): void {
        this._rate = rate;
        this.refreshValue();
        this.refreshColor();
    }

    public clear(): void {
        this.initData();
        this.initView();
    }

}
