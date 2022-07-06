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


const { ccclass, property } = cc._decorator;
@ccclass
@injectService(LobbyService.instance)
export default class PhoneVerification extends UIView implements IController<LobbyService> {
    service: LobbyService;
    @property(cc.Node)
    showPhoneNode: cc.Node = null;
    @property(cc.Node)
    editPhoneNode: cc.Node = null;

    public static getPrefabUrl() {
        return "wallet/prefabes/PhoneVerification";
    }

    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindingEvents() {
        super.bindingEvents();

    }

    start() {

    }

    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
            case 'btnReset':

                break;
            case 'btnConfirmation':
                this.confirmationHandler();
                break;
        }

    }

    confirmationHandler() {
        this.close();
    }

    onDestroy() {
        super.onDestroy();
    }

}
