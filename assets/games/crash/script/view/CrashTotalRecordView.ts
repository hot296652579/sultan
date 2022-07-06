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

// 每页数量
const PAGE_COUNT: number = 20;
// 一天毫秒
const ONE_DAY_MS: number = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID: number = -1;
// 最大显示前几天数据
const MAX_BEFORE_DAY: number = 7;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashTotalRecordView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Button)
    private btnLeft: cc.Button = null;

    @property(cc.Label)
    private labDate: cc.Label = null;

    @property(cc.Button)
    private btnRight: cc.Button = null;

    @property(cc.Label)
    private labCurrServerSeed: cc.Label = null;

    @property(cc.Label)
    private labCurrServerSeedValue: cc.Label = null;

    @property(cc.Label)
    private labPrevServerSeed: cc.Label = null;

    @property(cc.Label)
    private labPrevServerSeedValue: cc.Label = null;

    @property(cc.Label)
    private labPublicSeed: cc.Label = null;

    @property(cc.Label)
    private labPublicSeedValue: cc.Label = null;

    @property(ListView)
    private lsvRecord: ListView = null;

    @property(TitleItemPage)
    private titleItemPage: TitleItemPage = null;

    @property(NoneItem)
    private noneItem: NoneItem = null;

    // App 数据
    private _appData: AppData = null;
    // 当前查找时间戳
    private _currFindTimestamp: number = null;
    // 是否最后一页
    private _isLastPage: boolean = false;
    // 当天历史数据列表
    private _todayRecordDataList: MST.ICrashRecordInfo[] = null;

    public static getPrefabUrl() {
        return "prefabs/CrashTotalRecordView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();

        this.C2M_CrashHashRecord_Req(this._currFindTimestamp);
    }

    start() {

    }

    public show(args?: any[]): void {
        super.show(args);

        this.onLanguageChange();
    }

    private initData(): void {
        this._appData = G.DataMgr.get(AppData);
        this._currFindTimestamp = DateUtils.getDayTimestamp(this._appData.getClientTimestamp());
        this._isLastPage = false;
        this._todayRecordDataList = [];
    }

    private initView(): void {
        this.btnRight.interactable = false;
        this.labDate.string = DateUtils.getYMD(this._currFindTimestamp, "-");
        this.labCurrServerSeedValue.string = "";
        this.labPrevServerSeedValue.string = "";
        this.labPublicSeedValue.string = "";
        this.noneItem.node.active = false;
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_M2C_CrashHashRecord_Res", this.onEvent_M2C_CrashHashRecord_Res);

    }

    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager.makeLanguage("labRecordPageName", true));
        this.labCurrServerSeed.language = Manager.makeLanguage("labCurrServerSeed", true);
        this.labPrevServerSeed.language = Manager.makeLanguage("labPrevServerSeed", true);
        this.labPublicSeed.language = Manager.makeLanguage("labPublicSeed", true);

    }

    private refreshLeftRightBtn(): void {
        if (this._currFindTimestamp >= DateUtils.getDayTimestamp(this._appData.getClientTimestamp())) {
            this.btnRight.interactable = false;
        } else {
            this.btnRight.interactable = true;
        }

        this.btnLeft.interactable = true;
        if (this._currFindTimestamp <= DateUtils.getTimestampByDate(DateUtils.getDayBeforeAfter(this._appData.getClientTimestamp(), -(MAX_BEFORE_DAY - 1)))) {
            // && this._todayRecordDataList.length <= 0) {
            this.btnLeft.interactable = false;
        }

    }

    private getLastRecordId(): number {
        let id: number = DEFAULT_FIRST_ID;
        if (this._todayRecordDataList.length > 0) {
            let lastRecordData: MST.ICrashRecordInfo = this._todayRecordDataList[this._todayRecordDataList.length - 1];
            id = lastRecordData.ID;
        }
        return id;
    }

    private clickPrevDayData(): void {
        let prevTimestamp: number = this._currFindTimestamp - ONE_DAY_MS;
        this._todayRecordDataList.length = 0;
        this._isLastPage = false;
        this.C2M_CrashHashRecord_Req(prevTimestamp);
    }

    private clickNextDayData(): void {
        let nextTimestamp: number = this._currFindTimestamp + ONE_DAY_MS;
        this._todayRecordDataList.length = 0;
        this._isLastPage = false;
        this.C2M_CrashHashRecord_Req(nextTimestamp);
    }

    /**
     * 查询历史记录
     * @param timestamp {number} 查询哪天时间戳
     */
    private C2M_CrashHashRecord_Req(timestamp: number, id?: number): void {
        if (TypeUtils.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }

        let data: MST.IC2M_CrashHashRecord_Req = {
            RpcId: Manager.netManager.getNewSeqId(),
            Date: DateUtils.getYMD(timestamp, "-"),
            ID: id,
            PageNumber: PAGE_COUNT,
        }
        let req = MST.C2M_CrashHashRecord_Req.create(data);
        let buffer = MST.C2M_CrashHashRecord_Req.encode(req).finish();
        this.service.sendMsg(MST.C2M_CrashHashRecord_Req, MST.OuterOpcode_CrashGame.C2M_CrashHashRecord_Req, buffer);
    }

    private onEvent_M2C_CrashHashRecord_Res(data: MST.IM2C_CrashHashRecord_Res): void {
        if (data.Error !== 0) {
            PanelHelp.showErrTip(data.Error);
            return;
        }

        if (data.SeedInfo.ServerSeed.length <= 0) {
            this.labCurrServerSeedValue.language = Manager.makeLanguage("labCurrServerSeedValue", true);
        } else {
            this.labCurrServerSeedValue.string = data.SeedInfo.ServerSeed;
        }

        if (data.ID === DEFAULT_FIRST_ID && data.RecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        } else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }

        // 是否最后一页
        this._isLastPage = data.RecordInfo.length < PAGE_COUNT;

        this.labDate.string = data.Date;
        this._currFindTimestamp = DateUtils.getTimestampByDate(data.Date);

        this.labPrevServerSeedValue.string = data.SeedInfo.ServerSeedHash;
        this.labPublicSeedValue.string = data.SeedInfo.PublicSeed;

        if (data.ID === DEFAULT_FIRST_ID) {
            this._todayRecordDataList = [].concat(data.RecordInfo);
            this.lsvRecord.set(data.RecordInfo);
        } else {
            this._todayRecordDataList = this._todayRecordDataList.concat(data.RecordInfo);
            this.lsvRecord.insert(data.RecordInfo);
        }

        this.refreshLeftRightBtn();
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
        switch (ButtonName) {
            case "btnLeft":
                this.clickPrevDayData();
                break;
            case "btnRight":
                this.clickNextDayData();
                break;
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
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp);
    }

    /**
     * 下拉回调
     */
    private onPullBottom(target: ListView): void {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览总历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2M_CrashHashRecord_Req(this._currFindTimestamp, this.getLastRecordId());
    }

}
