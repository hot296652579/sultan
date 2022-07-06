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

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteTotalRecordItem extends UIView implements IController<LobbyService> {
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
    private labRoundHash: cc.Label = null;

    @property(cc.Label)
    private labHashSalt: cc.Label = null;

    @property(cc.Label)
    private labRoundNo: cc.Label = null;

    @property(cc.Label)
    private labCheck: cc.Label = null;

    @property(cc.Sprite)
    private imgLine: cc.Label = null;

    // 数据
    private _data: MST.IRouletteGameRecord = null;

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
        this.labRoundHash.string = "";
        this.labHashSalt.string = "";
        this.labRoundNo.string = "";
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
        this.labRoundHash.language = Manager.makeLanguage("labRoundHash", true);
    }

    public onShow(data: MST.IRouletteGameRecord): void {
        this.onLanguageChange();

        this._data = data;

        this.labGameNo.language = Manager.makeLanguage(["labGameNo", data.round], true);
        this.labHashSalt.string = data.hashSalt;
        this.labRoundHash.string = data.roundHash;
        this.labRoundNo.string = String(data.randomNo);
        this[`icon${data.color}`].active = true;
    }

    public reset(): void {
        this.initData();
        this.initView();

    }

}
