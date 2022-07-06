"use strict";
cc._RF.push(module, '91addo5HKxHypmIXUEqWOPJ', 'HallNewLogic');
// script/hall/HallNewLogic.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../common/base/Logic");
const HallNewView_1 = __importDefault(require("./HallNewView"));
const AkunView_1 = __importDefault(require("../akun/AkunView"));
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const LogicEvent_1 = require("../common/event/LogicEvent");
const Defines_1 = require("../framework/base/Defines");
const Manager_1 = require("../common/manager/Manager");
const WalletView_1 = __importDefault(require("../wallet/WalletView"));
const MissionView_1 = __importDefault(require("../activity/MissionView"));
class HallNewLogic extends Logic_1.Logic {
    constructor() {
        super(...arguments);
        this.logicType = LogicEvent_1.LogicType.HALL;
    }
    get bundle() {
        return Defines_1.BUNDLE_RESOURCES;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_HALL, this.onEnterHall);
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
    onEnterHall(data) {
        Manager_1.Manager.uiManager.open({ type: HallNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: data });
    }
    onOpenAkun() {
        Manager_1.Manager.uiManager.open({ type: AkunView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenLogin() {
        Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onOpenDompet() {
        Manager_1.Manager.uiManager.open({ type: WalletView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    openRulette() {
    }
    onOpenActive() {
        Manager_1.Manager.uiManager.open({ type: MissionView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
}
Manager_1.Manager.logicManager.push(HallNewLogic);

cc._RF.pop();