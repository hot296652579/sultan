import ListView from "../common/component/ListView";
import NoneItem from "../common/item/NoneItem";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import TypeUtils from "../common/utils/TypeUtils";
import AppData from "../data/AppData";
import { ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { MST } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";


// 每页数量
const PAGE_COUNT: number = 10;
// 一天毫秒
const ONE_DAY_MS: number = 86400000;
// 默认首次请求分页 ID
const DEFAULT_FIRST_ID: number = 0;

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class DepositRecordView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Label)
    private labDate: cc.Label = null;

    @property(cc.Label)
    private labChips: cc.Label = null;

    @property(cc.Label)
    private labAmount: cc.Label = null;

    @property(ListView)
    private lsvRecord: ListView = null;

    @property(cc.Node)
    private titleItem: cc.Node = null;

    @property(NoneItem)
    private noneItem: NoneItem = null;

    // App 数据
    private _appData: AppData = null;
    // 是否最后一页
    private _isLastPage: boolean = false;
    // 个人历史下注数据列表
    private _dataList: MST.IWithDrawRecord[] = null;
    currentIndexPage: number = 0;

    public static getPrefabUrl() {
        return "wallet/prefabes/DepositRecordView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();

        this.C2S_MyRecord();
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
        // this.labGameNoTitle.string = "";
        // this.labDate.string = "";
        // this.labBankCode.string = "";
        // this.labAmount.string = "";

        // this.noneItem.node.active = false;
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

        this.registerEvent("Event_S2C_GetDepositList", this.onEvent_S2C_GetDepositList);

    }

    onLanguageChange() {

    }

    private getLastRecordId(): number {
        let id;
        id = this.currentIndexPage + PAGE_COUNT;
        return id;
    }

    /**
     * 查询历史记录
     * @param id {number} id 为了避免查询后，出现重复数据 首次请求默认为 -1 （查询后的数据不包含自身 ID）
     */
    private C2S_MyRecord(index?: number): void {
        if (TypeUtils.isNull(index)) {
            index = DEFAULT_FIRST_ID;
        }

        let data: MST.C2S_GetDepositList = {
            serial: Manager.netManager.getNewSeqId(),
            index,
            limit: PAGE_COUNT,
        }
        console.log('C2S_MyRecord ->index :' + index);
        let req = MST.C2S_GetDepositList.create(data);
        let buffer = MST.C2S_GetDepositList.encode(req).finish();
        this.service.sendMsg(MST.C2S_GetDepositList, MST.OuterOpcode_Lobby.C2S_GetDepositList, buffer);
    }

    private onEvent_S2C_GetDepositList(data: MST.S2C_GetDepositList): void {
        if (data.code !== 0) {
            PanelHelp.showErrTip(data.code);
            return;
        }
        this.currentIndexPage = data.index;
        if (data.records.length <= 0) {
            this.noneItem.node.active = true;
            this.lsvRecord.node.active = false;
        } else {
            this.noneItem.node.active = false;
            this.lsvRecord.node.active = true;
        }

        // 是否最后一页
        this._isLastPage = data.records.length < PAGE_COUNT;
        this._dataList = this._dataList.concat(data.records);
        this.lsvRecord.insert(data.records);
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
        this.C2S_MyRecord(0);
    }

    /**
     * 下拉回调
     */
    private onPullBottom(target: ListView): void {
        if (this._isLastPage) {
            G.Logger.log("Crash 浏览个人历史记录 已是最后一页 无需请求翻页");
            return;
        }
        this.C2S_MyRecord(this.getLastRecordId());
    }

}
