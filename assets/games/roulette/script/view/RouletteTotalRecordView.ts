import ListView from "../../../../script/common/component/ListView";
import NoneItem from "../../../../script/common/item/NoneItem";
import TitleItemPage from "../../../../script/common/item/TitleItemPage";
import { Manager } from "../../../../script/common/manager/Manager";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import TypeUtils from "../../../../script/common/utils/TypeUtils";
import AppData from "../../../../script/data/AppData";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import { EventApi } from "../../../../script/framework/event/EventApi";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import RouletteData from "../data/RouletteData";

// 每页数量
const PAGE_COUNT: number = 20;
// 一天毫秒
const ONE_DAY_MS: number = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID: number = -1;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RouletteTotalRecordView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(ListView)
    private lsvRecord: ListView = null;

    @property(TitleItemPage)
    private titleItemPage: TitleItemPage = null;

    @property(NoneItem)
    private noneItem: NoneItem = null;

    // App 数据
    private _appData: AppData = null;
    // App 数据
    private _rouletteData: RouletteData = null;
    // 是否最后一页
    private _isLastPage: boolean = false;
    // 当天历史数据列表
    private _gameRecordDataList: MST.IRouletteGameRecord[] = null;

    public static getPrefabUrl() {
        return "prefabs/RouletteTotalRecordView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();

        let round = this._rouletteData.curRound;
        this.C2R_GetGameRecords_Req(round);
    }

    start() {

    }

    public show(args?: any[]): void {
        super.show(args);

        this.onLanguageChange();
    }

    private initData(): void {
        this._appData = G.DataMgr.get(AppData);
        this._rouletteData = G.DataMgr.get(RouletteData);
        this._isLastPage = false;
        this._gameRecordDataList = [];
    }

    private initView(): void {
        this.noneItem.node.active = false;
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_R2C_GetGameRecords_Res", this.onEvent_R2C_GetGameRecords_Res);

    }

    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager.makeLanguage("labRecordPageName", true));

    }

    private getLastRecordId(): number {
        let id: number = DEFAULT_FIRST_ID;
        if (this._gameRecordDataList.length > 0) {
            let lastRecordData: MST.IRouletteGameRecord = this._gameRecordDataList[this._gameRecordDataList.length - 1];
            id = lastRecordData.round;
        }
        return id;
    }

    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    private C2R_GetGameRecords_Req(round?: number): void {
        if (TypeUtils.isNull(round)) {
            round = DEFAULT_FIRST_ID;
        }

        let data: MST.C2R_GetGameRecords_Req = {
            RpcId: Manager.netManager.getNewSeqId(),
            limit: PAGE_COUNT,
            round
        }
        let req = MST.C2R_GetGameRecords_Req.create(data);
        let buffer = MST.C2R_GetGameRecords_Req.encode(req).finish();
        this.service.sendMsg(MST.C2R_GetGameRecords_Req, MST.OuterOpcode_Roulette.C2R_GetGameRecords_Req, buffer);
    }

    private onEvent_R2C_GetGameRecords_Res(data: MST.IR2C_GetGameRecords_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }

        if (data.round === DEFAULT_FIRST_ID && data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        } else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }

        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;


        if (data.round === DEFAULT_FIRST_ID) {
            this._gameRecordDataList = [].concat(data.records);
            this.lsvRecord.set(data.records);
        } else {
            this._gameRecordDataList = this._gameRecordDataList.concat(data.records);
            this.lsvRecord.insert(data.records);
        }
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
        switch (ButtonName) {
            case "btnClose":
                this.close();
                break;
        }
    }

    /**
     * 上拉回调
     * @param target 
     */
    private onPullTop(target: ListView): void {
        this.C2R_GetGameRecords_Req(0);
    }

    /**
     * 下拉回调
     */
    private onPullBottom(target: ListView): void {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览总历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2R_GetGameRecords_Req(this.getLastRecordId());
    }

}
