import { GameConfig } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { gameManager } from "../common/manager/GameManager";
import { Manager } from "../common/manager/Manager";
import { CommonMessage, protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { HttpErrorType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import { ShareTraceHelpder } from "../Helpder/shareTrace/ShareTraceHelpder";
import LanguageChange from "../common/language/LanguageChange";
import ServiceView from "../service/ServiceView";
import { UIManager } from "../framework/base/UIManager";
import AkunView from "../akun/AkunView";
import HallNewView from "../hall/HallNewView";
import LoginNewView from "../login/LoginNewView";
import MissionView from "../activity/MissionView";
import RechargeNewView from "./RechargeNewView";
import AttractView from "./AttractNewView";
import { MST } from "../framework/external/protoc";
import AttractRecordView from "./AttractRecordView";
import NumberUtils from "../common/utils/NumberUtils";
import UserData from "../data/UserData";
import DepositRecordView from "./DepositRecordView";


const { ccclass, property } = cc._decorator;
@ccclass
@injectService(LobbyService.instance)
export default class WalletView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Label)
    private labRp: cc.Label = null;
    private _userData: UserData;

    public static getPrefabUrl() {
        return "wallet/prefabes/walletView";
    }

    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('updateUserInfo', this.refreshUser);
    }

    show(): void {
        this.initData();
        this.requestGetBankList();
        this.requestWithLimit();
        this.refreshUser();
    }
    initData(): void {
        let userData = G.DataMgr.get(UserData);
        this._userData = userData;
    }

    refreshUser() {
        if (this._userData.isLogined()) {
            this.labRp.string = NumberUtils.converToC(Number(this._userData.info.Gold));
        }
    }

    requestWithLimit() {
        let req = MST.C2L_GetWithdrawLimit_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
        });
        let buffer = MST.C2L_GetWithdrawLimit_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetWithdrawLimit_Req, MST.OuterOpcode_Lobby.C2L_GetWithdrawLimit_Req, buffer);
    }

    requestGetBankList() {
        let req = MST.C2L_GetBankList_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            index: 0,
            limit: 6
        });
        let buffer = MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2L_GetBankList_Req, MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }

    onClick(name, node) {
        switch (name) {
            case 'btnHome':
                Manager.uiManager.open({ type: HallNewView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnDompet':

                break;
            case 'btnLogin':
                Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnEvent':
                Manager.uiManager.open({ type: MissionView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnAkun':
                Manager.uiManager.open({ type: AkunView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnRefill':
                if (this.checkLogined())
                    Manager.uiManager.open({ type: RechargeNewView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnWithdrawal':
                if (this.checkLogined())
                    Manager.uiManager.open({ type: AttractView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnAttrackRecord':
                if (this.checkLogined())
                    Manager.uiManager.open({ type: AttractRecordView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnDepositRecord':
                if (this.checkLogined())
                    Manager.uiManager.open({ type: DepositRecordView, bundle: BUNDLE_RESOURCES });
                break;
        }
    }

    checkLogined() {
        if (!this._userData.id) {
            Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }

    onDestroy() {
        super.onDestroy();
    }

}
