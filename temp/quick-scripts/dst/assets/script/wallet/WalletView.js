
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/WalletView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '089efqFpOVMCpO5GDI4BqCc', 'WalletView');
// script/wallet/WalletView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const AkunView_1 = __importDefault(require("../akun/AkunView"));
const HallNewView_1 = __importDefault(require("../hall/HallNewView"));
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const MissionView_1 = __importDefault(require("../activity/MissionView"));
const RechargeNewView_1 = __importDefault(require("./RechargeNewView"));
const AttractNewView_1 = __importDefault(require("./AttractNewView"));
const protoc_1 = require("../framework/external/protoc");
const AttractRecordView_1 = __importDefault(require("./AttractRecordView"));
const NumberUtils_1 = __importDefault(require("../common/utils/NumberUtils"));
const UserData_1 = __importDefault(require("../data/UserData"));
const DepositRecordView_1 = __importDefault(require("./DepositRecordView"));
const { ccclass, property } = cc._decorator;
let WalletView = class WalletView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.labRp = null;
    }
    static getPrefabUrl() {
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
    show() {
        this.initData();
        this.requestGetBankList();
        this.requestWithLimit();
        this.refreshUser();
    }
    initData() {
        let userData = G.DataMgr.get(UserData_1.default);
        this._userData = userData;
    }
    refreshUser() {
        if (this._userData.isLogined()) {
            this.labRp.string = NumberUtils_1.default.converToC(Number(this._userData.info.Gold));
        }
    }
    requestWithLimit() {
        let req = protoc_1.MST.C2L_GetWithdrawLimit_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
        });
        let buffer = protoc_1.MST.C2L_GetWithdrawLimit_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetWithdrawLimit_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetWithdrawLimit_Req, buffer);
    }
    requestGetBankList() {
        let req = protoc_1.MST.C2L_GetBankList_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            index: 0,
            limit: 6
        });
        let buffer = protoc_1.MST.C2L_GetBankList_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2L_GetBankList_Req, protoc_1.MST.OuterOpcode_Lobby.C2L_GetBankList_Req, buffer);
    }
    onClick(name, node) {
        switch (name) {
            case 'btnHome':
                Manager_1.Manager.uiManager.open({ type: HallNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnDompet':
                break;
            case 'btnLogin':
                Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnEvent':
                Manager_1.Manager.uiManager.open({ type: MissionView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnAkun':
                Manager_1.Manager.uiManager.open({ type: AkunView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnRefill':
                if (this.checkLogined())
                    Manager_1.Manager.uiManager.open({ type: RechargeNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnWithdrawal':
                if (this.checkLogined())
                    Manager_1.Manager.uiManager.open({ type: AttractNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnAttrackRecord':
                if (this.checkLogined())
                    Manager_1.Manager.uiManager.open({ type: AttractRecordView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnDepositRecord':
                if (this.checkLogined())
                    Manager_1.Manager.uiManager.open({ type: DepositRecordView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
        }
    }
    checkLogined() {
        if (!this._userData.id) {
            Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Label)
], WalletView.prototype, "labRp", void 0);
WalletView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], WalletView);
exports.default = WalletView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L1dhbGxldFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSx1REFBb0Q7QUFFcEQsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxrRUFBMkU7QUFHM0Usb0VBQTRDO0FBTzVDLGdFQUF3QztBQUN4QyxzRUFBOEM7QUFDOUMseUVBQWlEO0FBQ2pELDBFQUFrRDtBQUNsRCx3RUFBZ0Q7QUFDaEQsc0VBQTJDO0FBQzNDLHlEQUFtRDtBQUNuRCw0RUFBb0Q7QUFDcEQsOEVBQXNEO0FBQ3RELGdFQUF3QztBQUN4Qyw0RUFBb0Q7QUFHcEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVyxTQUFRLGdCQUFNO0lBQTlDOztRQUlZLFVBQUssR0FBYSxJQUFJLENBQUM7SUF1R25DLENBQUM7SUFwR1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw0QkFBNEIsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLDBFQUEwRTtJQUM5RSxDQUFDO0lBQ0QsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcscUJBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxHQUFHLEdBQUcsWUFBRyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQztZQUMxQyxLQUFLLEVBQUUsaUJBQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1NBQzFDLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxHQUFHLFlBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsMkJBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQUcsQ0FBQyx3QkFBd0IsRUFBRSxZQUFHLENBQUMsaUJBQWlCLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksR0FBRyxHQUFHLFlBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7WUFDckMsS0FBSyxFQUFFLGlCQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUN2QyxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLEdBQUcsWUFBRyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxRCwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBRyxDQUFDLG1CQUFtQixFQUFFLFlBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJO1FBQ2QsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLFNBQVM7Z0JBQ1YsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHFCQUFXLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLE1BQU07WUFDVixLQUFLLFdBQVc7Z0JBRVosTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsc0JBQVksRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQVcsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVEsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNWLEtBQUssV0FBVztnQkFDWixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ25CLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBZSxFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQ2hGLE1BQU07WUFDVixLQUFLLGVBQWU7Z0JBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDbkIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHdCQUFXLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDNUUsTUFBTTtZQUNWLEtBQUssa0JBQWtCO2dCQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ25CLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwyQkFBaUIsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRixNQUFNO1lBQ1YsS0FBSyxrQkFBa0I7Z0JBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDbkIsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDJCQUFpQixFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQ3BCLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxzQkFBWSxFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDekUsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUztRQUNMLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBRUosQ0FBQTtBQXZHRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lDQUNZO0FBSmQsVUFBVTtJQUY5QixPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixVQUFVLENBMkc5QjtrQkEzR29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0hvdFVwZGF0ZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBkaXNwYXRjaEVudGVyQ29tcGxldGUsIExvZ2ljRXZlbnQsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBnYW1lTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb21tb25NZXNzYWdlLCBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgSHR0cEVycm9yVHlwZSwgUmVxdWVzdFBhY2tnZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBDbGllbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IFNoYXJlVHJhY2VIZWxwZGVyIH0gZnJvbSBcIi4uL0hlbHBkZXIvc2hhcmVUcmFjZS9TaGFyZVRyYWNlSGVscGRlclwiO1xuaW1wb3J0IExhbmd1YWdlQ2hhbmdlIGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VDaGFuZ2VcIjtcbmltcG9ydCBTZXJ2aWNlVmlldyBmcm9tIFwiLi4vc2VydmljZS9TZXJ2aWNlVmlld1wiO1xuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL1VJTWFuYWdlclwiO1xuaW1wb3J0IEFrdW5WaWV3IGZyb20gXCIuLi9ha3VuL0FrdW5WaWV3XCI7XG5pbXBvcnQgSGFsbE5ld1ZpZXcgZnJvbSBcIi4uL2hhbGwvSGFsbE5ld1ZpZXdcIjtcbmltcG9ydCBMb2dpbk5ld1ZpZXcgZnJvbSBcIi4uL2xvZ2luL0xvZ2luTmV3Vmlld1wiO1xuaW1wb3J0IE1pc3Npb25WaWV3IGZyb20gXCIuLi9hY3Rpdml0eS9NaXNzaW9uVmlld1wiO1xuaW1wb3J0IFJlY2hhcmdlTmV3VmlldyBmcm9tIFwiLi9SZWNoYXJnZU5ld1ZpZXdcIjtcbmltcG9ydCBBdHRyYWN0VmlldyBmcm9tIFwiLi9BdHRyYWN0TmV3Vmlld1wiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCBBdHRyYWN0UmVjb3JkVmlldyBmcm9tIFwiLi9BdHRyYWN0UmVjb3JkVmlld1wiO1xuaW1wb3J0IE51bWJlclV0aWxzIGZyb20gXCIuLi9jb21tb24vdXRpbHMvTnVtYmVyVXRpbHNcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IERlcG9zaXRSZWNvcmRWaWV3IGZyb20gXCIuL0RlcG9zaXRSZWNvcmRWaWV3XCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsZXRWaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHByaXZhdGUgbGFiUnA6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBwcml2YXRlIF91c2VyRGF0YTogVXNlckRhdGE7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwid2FsbGV0L3ByZWZhYmVzL3dhbGxldFZpZXdcIjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICAvLyB0aGlzLmF1ZGlvSGVscGVyLnBsYXlNdXNpYyhcImNvbW1vbi9hdWRpby9sb2dpbl9iZ21cIiwgQlVORExFX1JFU09VUkNFUyk7XG4gICAgfVxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVVc2VySW5mbycsIHRoaXMucmVmcmVzaFVzZXIpO1xuICAgIH1cblxuICAgIHNob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0QmFua0xpc3QoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0V2l0aExpbWl0KCk7XG4gICAgICAgIHRoaXMucmVmcmVzaFVzZXIoKTtcbiAgICB9XG4gICAgaW5pdERhdGEoKTogdm9pZCB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICB0aGlzLl91c2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgIH1cblxuICAgIHJlZnJlc2hVc2VyKCkge1xuICAgICAgICBpZiAodGhpcy5fdXNlckRhdGEuaXNMb2dpbmVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubGFiUnAuc3RyaW5nID0gTnVtYmVyVXRpbHMuY29udmVyVG9DKE51bWJlcih0aGlzLl91c2VyRGF0YS5pbmZvLkdvbGQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcXVlc3RXaXRoTGltaXQoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJMX0dldFdpdGhkcmF3TGltaXRfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTF9HZXRXaXRoZHJhd0xpbWl0X1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTF9HZXRXaXRoZHJhd0xpbWl0X1JlcSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyTF9HZXRXaXRoZHJhd0xpbWl0X1JlcSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0R2V0QmFua0xpc3QoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJMX0dldEJhbmtMaXN0X1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBsaW1pdDogNlxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMkxfR2V0QmFua0xpc3RfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJMX0dldEJhbmtMaXN0X1JlcSwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyTF9HZXRCYW5rTGlzdF9SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYnRuSG9tZSc6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IEhhbGxOZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuRG9tcGV0JzpcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuTG9naW4nOlxuICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBMb2dpbk5ld1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5FdmVudCc6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IE1pc3Npb25WaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuQWt1bic6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IEFrdW5WaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuUmVmaWxsJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0xvZ2luZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFJlY2hhcmdlTmV3VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuV2l0aGRyYXdhbCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBBdHRyYWN0VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuQXR0cmFja1JlY29yZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBBdHRyYWN0UmVjb3JkVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuRGVwb3NpdFJlY29yZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tMb2dpbmVkKCkpXG4gICAgICAgICAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBEZXBvc2l0UmVjb3JkVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tMb2dpbmVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3VzZXJEYXRhLmlkKSB7XG4gICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG5cbn1cbiJdfQ==