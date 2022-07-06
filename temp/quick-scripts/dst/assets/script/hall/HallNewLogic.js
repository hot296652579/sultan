
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hall/HallNewLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvaGFsbC9IYWxsTmV3TG9naWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNkM7QUFDN0MsZ0VBQXdDO0FBQ3hDLGdFQUF3QztBQUN4Qyx5RUFBaUQ7QUFDakQsMkRBQW1FO0FBQ25FLHVEQUE2RDtBQUM3RCx1REFBb0Q7QUFDcEQsc0VBQThDO0FBRTlDLDBFQUFrRDtBQUVsRCxNQUFNLFlBQWEsU0FBUSxhQUFLO0lBQWhDOztRQUVJLGNBQVMsR0FBYyxzQkFBUyxDQUFDLElBQUksQ0FBQztJQTJDMUMsQ0FBQztJQXpDRyxJQUFJLE1BQU07UUFDTixPQUFPLDBCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2Ysc0JBQXNCO0lBQzFCLENBQUM7SUFDTyxXQUFXLENBQUMsSUFBSTtRQUNwQixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQVcsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVPLFVBQVU7UUFDZCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVEsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyxXQUFXO1FBQ2YsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFZLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU8sWUFBWTtRQUNoQixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTyxXQUFXO0lBRW5CLENBQUM7SUFFTyxZQUFZO1FBQ2hCLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxxQkFBVyxFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNKO0FBRUQsaUJBQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9naWMgfSBmcm9tIFwiLi4vY29tbW9uL2Jhc2UvTG9naWNcIjtcbmltcG9ydCBIYWxsTmV3VmlldyBmcm9tIFwiLi9IYWxsTmV3Vmlld1wiO1xuaW1wb3J0IEFrdW5WaWV3IGZyb20gXCIuLi9ha3VuL0FrdW5WaWV3XCI7XG5pbXBvcnQgTG9naW5OZXdWaWV3IGZyb20gXCIuLi9sb2dpbi9Mb2dpbk5ld1ZpZXdcIjtcbmltcG9ydCB7IExvZ2ljVHlwZSwgTG9naWNFdmVudCB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCBXYWxsZXRWaWV3IGZyb20gXCIuLi93YWxsZXQvV2FsbGV0Vmlld1wiO1xuaW1wb3J0IFJvdWxldHRlVmlldyBmcm9tIFwiLi4vLi4vZ2FtZXMvcm91bGV0dGUvc2NyaXB0L3ZpZXcvUm91bGV0dGVWaWV3XCI7XG5pbXBvcnQgTWlzc2lvblZpZXcgZnJvbSBcIi4uL2FjdGl2aXR5L01pc3Npb25WaWV3XCI7XG5cbmNsYXNzIEhhbGxOZXdMb2dpYyBleHRlbmRzIExvZ2ljIHtcblxuICAgIGxvZ2ljVHlwZTogTG9naWNUeXBlID0gTG9naWNUeXBlLkhBTEw7XG5cbiAgICBnZXQgYnVuZGxlKCkge1xuICAgICAgICByZXR1cm4gQlVORExFX1JFU09VUkNFUztcbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChMb2dpY0V2ZW50LkVOVEVSX0hBTEwsIHRoaXMub25FbnRlckhhbGwpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJvcGVuQWt1blZpZXdcIiwgdGhpcy5vbk9wZW5Ba3VuKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwib3BlbkRvbXBldFZpZXdcIiwgdGhpcy5vbk9wZW5Eb21wZXQpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJvcGVuTG9naW5WaWV3XCIsIHRoaXMub25PcGVuTG9naW4pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJvcGVuQWN0aXZlVmlld1wiLCB0aGlzLm9uT3BlbkFjdGl2ZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIm9wZW5SdWxldHRlXCIsIHRoaXMub3BlblJ1bGV0dGUpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIC8vIHRoaXMub25FbnRlckhhbGwoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkVudGVySGFsbChkYXRhKSB7XG4gICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBIYWxsTmV3VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBkYXRhIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25PcGVuQWt1bigpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IEFrdW5WaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk9wZW5Mb2dpbigpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IExvZ2luTmV3VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25PcGVuRG9tcGV0KCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogV2FsbGV0VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb3BlblJ1bGV0dGUoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uT3BlbkFjdGl2ZSgpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IE1pc3Npb25WaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgfVxufVxuXG5NYW5hZ2VyLmxvZ2ljTWFuYWdlci5wdXNoKEhhbGxOZXdMb2dpYyk7XG4iXX0=