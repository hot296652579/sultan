import { SubGameDefine } from "../../../../script/common/define/SubGameDefine";
import { Manager } from "../../../../script/common/manager/Manager";
import { LobbyService } from "../../../../script/common/net/LobbyService";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import TypeUtils from "../../../../script/common/utils/TypeUtils";
import { ENABLE_CHANGE_LANGUAGE } from "../../../../script/framework/base/Defines";
import { IController } from "../../../../script/framework/controller/Controller";
import { injectService } from "../../../../script/framework/decorator/Decorators";
import { EventApi } from "../../../../script/framework/event/EventApi";
import DateUtils from "../../../../script/framework/extentions/DateUtils";
import { MST } from "../../../../script/framework/external/protoc";
import UIView from "../../../../script/framework/ui/UIView";
import PanelHelp from "../../../../script/msgbox/PanelHelp";
import { CrashConfig } from "../config/CrashConfig";
import CrashData from "../data/CrashData";
import CrashCheckView from "./CrashCheckView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashTotalRecordItem extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Label)
    private labGameNo: cc.Label = null;

    @property(cc.Label)
    private labDate: cc.Label = null;

    @property(cc.Label)
    private labRoundHash: cc.Label = null;

    @property(cc.Label)
    private labRoundHashValue: cc.Label = null;

    @property(cc.Label)
    private labAcak: cc.Label = null;

    @property(cc.Label)
    private labAcakValue: cc.Label = null;

    @property(cc.Label)
    private labPoint: cc.Label = null;

    @property(cc.Label)
    private labPointValue: cc.Label = null;

    @property(cc.Label)
    private labCheck: cc.Label = null;

    @property(cc.Sprite)
    private imgLine: cc.Label = null;

    // 数据
    private _data: MST.ICrashRecordInfo = null;

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
        this.labDate.string = "";
        this.labRoundHash.string = "";
        this.labRoundHashValue.string = "";
        this.labAcak.string = "";
        this.labAcakValue.string = "";
        this.labPoint.string = "";
        this.labPointValue.string = "";
    }

    protected bindingEvents(): void {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }

    onLanguageChange() {
        this.labPoint.language = Manager.makeLanguage("labPoint", true);
        this.labRoundHash.language = Manager.makeLanguage("labRoundHash", true);
        this.labAcak.language = Manager.makeLanguage("labAcak", true);
    }

    public onShow(data: MST.ICrashRecordInfo): void {
        this.onLanguageChange();

        this._data = data;

        this.labGameNo.language = Manager.makeLanguage(["labGameNo", data.GameNo], true);
        this.labDate.string = DateUtils.getYMDHMS(data.Timestamp);
        this.labPointValue.string = `${NumberUtils.converToC(data.Multiple)}x`;
        this.labRoundHashValue.string = data.RoundHashCell.RoundHash;
        this.labAcakValue.string = data.RoundHashCell.Acak.toString();
    }

    public reset(): void {
        this.initData();
        this.initView();
    }

    public openCheckWeb(): void {
        let crashData: CrashData = G.DataMgr.get(CrashData);
        let serverSeed: string = crashData.totalRecordData.SeedInfo.ServerSeed;

        if (TypeUtils.isNull(serverSeed) || serverSeed.length <= 0) {
            PanelHelp.showTip(Manager.makeLanguage("todayNotFind", true));
            return;
        }

        let publicSeed: string = crashData.totalRecordData.SeedInfo.PublicSeed;
        let gameNo: number = this._data.GameNo;
        let url: string = `${CrashConfig.CHECK_SHA256_URL}${serverSeed}${publicSeed}${gameNo}`;
        cc.sys.openURL(url);
    }

    public onClick(ButtonName: any, ButtonNode: any, data?: string): void {
        switch (ButtonName) {
            case "btnCheck":
                // Manager.uiManager.open({ type: CrashCheckView, bundle: SubGameDefine.GameName.CRASH, args: [this._data.GameNo] });
                this.openCheckWeb();
                break;
        }
    }

}
