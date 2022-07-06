import { Logic } from "../common/base/Logic";
import HallNewView from "./HallNewView";
import AkunView from "../akun/AkunView";
import LoginNewView from "../login/LoginNewView";
import { LogicType, LogicEvent } from "../common/event/LogicEvent";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { Manager } from "../common/manager/Manager";
import WalletView from "../wallet/WalletView";
import RouletteView from "../../games/roulette/script/view/RouletteView";
import MissionView from "../activity/MissionView";

class HallNewLogic extends Logic {

    logicType: LogicType = LogicType.HALL;

    get bundle() {
        return BUNDLE_RESOURCES;
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent.ENTER_HALL, this.onEnterHall);
        this.registerEvent("openAkunView", this.onOpenAkun);
        this.registerEvent("openDompetView", this.onOpenDompet);
        this.registerEvent("openLoginView", this.onOpenLogin);
        this.registerEvent("openActiveView", this.onOpenActive);
        this.registerEvent("openRulette", this.openRulette);
    }

    onLoad() {
        super.onLoad();
        // this.onEnterHall();
    }
    private onEnterHall(data) {
        Manager.uiManager.open({ type: HallNewView, bundle: BUNDLE_RESOURCES, args: data });
    }

    private onOpenAkun() {
        Manager.uiManager.open({ type: AkunView, bundle: BUNDLE_RESOURCES });
    }

    private onOpenLogin() {
        Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
    }

    private onOpenDompet() {
        Manager.uiManager.open({ type: WalletView, bundle: BUNDLE_RESOURCES });
    }

    private openRulette() {

    }

    private onOpenActive() {
        Manager.uiManager.open({ type: MissionView, bundle: BUNDLE_RESOURCES });
    }
}

Manager.logicManager.push(HallNewLogic);
