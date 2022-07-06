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

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashMyRecordView extends UIView implements IController<LobbyService> {
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

    @property(ListView)
    private lsvRecord: ListView = null;

    @property(TitleItemPage)
    private titleItemPage: TitleItemPage = null;

    @property(NoneItem)
    private noneItem: NoneItem = null;

    // App 数据
    private _appData: AppData = null;
    // 是否最后一页
    private _isLastPage: boolean = false;
    // 个人历史下注数据列表
    private _dataList: MST.IMyRecordInfo[] = null;

    public static getPrefabUrl() {
        return "prefabs/CrashMyRecordView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();

        this.C2S_CrashMyRecord();
    }

    start() {

    }

    public show(args?: any[]): void {
        super.show(args);

        this.onLanguageChange();
    }

    private initData(): void {
        this._appData = G.DataMgr.get(AppData);
        this._isLastPage = false;
        this._dataList = [];
    }

    private initView(): void {
        this.labGameNoTitle.string = "";
        this.labDate.string = "";
        this.labBetRate.string = "";
        this.labBetGold.string = "";
        this.labIncome.string = "";

        this.noneItem.node.active = false;
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_S2C_CrashMyRecord", this.onEvent_S2C_CrashMyRecord);

    }

    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager.makeLanguage("labMyRecordPageName", true));

        this.labGameNoTitle.language = Manager.makeLanguage("labGameNoTitle", true);
        this.labDate.language = Manager.makeLanguage("labDate", true);
        this.labBetRate.language = Manager.makeLanguage("labBetRate", true);
        this.labBetGold.language = Manager.makeLanguage("labBetGold", true);
        this.labIncome.language = Manager.makeLanguage("labIncome", true);

    }

    private getLastRecordId(): number {
        let id: number = DEFAULT_FIRST_ID;
        if (this._dataList.length > 0) {
            let lastRecordData: MST.IMyRecordInfo = this._dataList[this._dataList.length - 1];
            id = lastRecordData.id;
        }
        return id;
    }

    /**
     * 查询历史记录
     * @param id {number} id 为了避免查询后，出现重复数据 首次请求默认为 -1 （查询后的数据不包含自身 ID）
     */
    private C2S_CrashMyRecord(id?: number): void {
        if (TypeUtils.isNull(id)) {
            id = DEFAULT_FIRST_ID;
        }

        let data: MST.IC2S_CrashMyRecord = {
            serial: Manager.netManager.getNewSeqId(),
            id: id,
            count: PAGE_COUNT,
        }
        let req = MST.C2S_CrashMyRecord.create(data);
        let buffer = MST.C2S_CrashMyRecord.encode(req).finish();
        this.service.sendMsg(MST.C2S_CrashMyRecord, MST.OuterOpcode_CrashGame.C2S_CrashMyRecord, buffer);
    }

    private onEvent_S2C_CrashMyRecord(data: MST.IS2C_CrashMyRecord): void {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }

        if (data.id === DEFAULT_FIRST_ID && data.myRecordInfo.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        } else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }

        // 是否最后一页
        this._isLastPage = data.myRecordInfo.length < PAGE_COUNT;

        if (data.id === DEFAULT_FIRST_ID) {
            this._dataList = [].concat(data.myRecordInfo);
            this.lsvRecord.set(data.myRecordInfo);
        } else {
            this._dataList = this._dataList.concat(data.myRecordInfo);
            this.lsvRecord.insert(data.myRecordInfo);
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
        this.C2S_CrashMyRecord();
    }

    /**
     * 下拉回调
     */
    private onPullBottom(target: ListView): void {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览个人历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2S_CrashMyRecord(this.getLastRecordId());
    }

}
