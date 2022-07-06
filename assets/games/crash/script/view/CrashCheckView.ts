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
import { CrashConfig } from "../config/CrashConfig";
import CrashData from "../data/CrashData";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class CrashCheckView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.WebView)
    private wbvCheck: cc.WebView = null;

    @property(TitleItemPage)
    private titleItemPage: TitleItemPage = null;

    // 游戏数据
    private _crashData: CrashData = null;
    // 游戏号
    private _gameNo: string = null;

    public static getPrefabUrl() {
        return "prefabs/CrashCheckView";
    }

    onLoad() {
        super.onLoad();

        this.initData();
        this.initView();

    }

    start() {

    }

    public show(args?: any[]): void {
        super.show(args);
        this.onLanguageChange();

        this._gameNo = args[0];
        this.wbvCheck.url = `${CrashConfig.CHECK_SHA256_URL}${this.getURLParam()}`;
    }

    private initData(): void {
        this._crashData = G.DataMgr.get(CrashData);
        this._gameNo = null;
    }

    private initView(): void {

    }

    private getURLParam(): string {
        return `${this._crashData.totalRecordData.SeedInfo.ServerSeed}${this._crashData.totalRecordData.SeedInfo.PublicSeed}${this._gameNo}`;
    }

    bindingEvents() {
        super.bindingEvents();

        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }

    }

    onLanguageChange() {
        this.titleItemPage.languagePageName(Manager.makeLanguage("labRecordPageName", true));

    }

}
