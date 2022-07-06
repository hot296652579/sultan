
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/activity/MissionView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cef0b5JGnlCHY5bxf0rZk6S', 'MissionView');
// script/activity/MissionView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const AkunView_1 = __importDefault(require("../akun/AkunView"));
const HallNewView_1 = __importDefault(require("../hall/HallNewView"));
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
const WalletView_1 = __importDefault(require("../wallet/WalletView"));
const ScroViewPlus_1 = __importDefault(require("../common/component/ScroViewPlus"));
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const MissionItem_1 = __importDefault(require("./MissionItem"));
const protoc_1 = require("../framework/external/protoc");
const UserData_1 = __importDefault(require("../data/UserData"));
const SigninNew_1 = __importDefault(require("../signin/SigninNew"));
const HallData_1 = __importDefault(require("../data/HallData"));
const { ccclass, property } = cc._decorator;
/**
 * @description 登录方式逻辑事件定义
 */
let MissionView = class MissionView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this._clickItemId = 0;
        this._missionList = [];
        this.missionId = null;
    }
    static getPrefabUrl() {
        return "mission/prefabs/MissionView";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_GetMissionList', this.onEvent_S2C_GetMissionList);
        this.registerEvent('Event_S2C_MissionClaim', this.onEvent_S2C_MissionClaim);
        this.registerEvent('updateUserInfo', this.onEvent_S2C_GetMissionList);
    }
    show() {
        this.requestGetMissionList();
    }
    requestGetMissionList() {
        let req = protoc_1.MST.C2S_GetMissionList.create({
            serial: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2S_GetMissionList.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetMissionList, protoc_1.MST.OuterOpcode_Lobby.C2S_GetMissionList, buffer);
    }
    onClick(name, node) {
        switch (name) {
            case 'btnHome':
                Manager_1.Manager.uiManager.open({ type: HallNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnDompet':
                Manager_1.Manager.uiManager.open({ type: WalletView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnLogin':
                Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'btnEvent':
                // Manager.uiManager.open({ type: MissionView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnAkun':
                Manager_1.Manager.uiManager.open({ type: AkunView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnQiandao':
                if (this.checkLogined())
                    Manager_1.Manager.uiManager.open({ type: SigninNew_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
        }
    }
    checkLogined() {
        let userData = G.DataMgr.get(UserData_1.default);
        if (!userData.id) {
            Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }
    onEvent_S2C_GetMissionList() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let missionList = hallData.missionList;
        if (missionList) {
            this._missionList = missionList;
            this.MissionItemView(missionList);
        }
    }
    onEvent_S2C_MissionClaim(data) {
        PanelHelp_1.default.showTip(LanguageImpl_1.i18n.MISSION.RECEIVEDSUCCESS);
        let index = 0;
        let missionId = data.missionId;
        for (let index = 0; index < this._missionList.length; index++) {
            const info = this._missionList[index];
            if (data.missionId == missionId) {
                info.curProgress = 0;
                break;
            }
            index++;
        }
        this.scrollView.content.children.forEach((element) => {
            let missionItemCom = element.getComponent(MissionItem_1.default);
            let _missionId = missionItemCom.missionId;
            if (_missionId == missionId) {
                missionItemCom.updateData(this._missionList[index]);
            }
        });
    }
    MissionItemView(missionList) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = missionList;
            scroViewCtrlCom.onItemClickCallback = this.onClickEmailItem.bind(this);
            yield scroViewCtrlCom.framingLoad(missionList.length);
        });
    }
    onClickEmailItem(_itemId) {
        this._clickItemId = _itemId;
        // this.scrollView.content.children.forEach((element) => {
        //     let emailItemCom = element.getComponent(MissionItem)
        //     let itemId = emailItemCom._itemId
        //     if (_itemId == itemId) {
        //         emailItemCom.updateData(this._missionList[this._clickItemId])
        //     } else {
        //         emailItemCom.bgCheck.active = false
        //     }
        // })
        let missionId = this._missionList[_itemId].missionId;
        this.missionId = missionId;
        this.requestMissionClaim();
    }
    requestMissionClaim() {
        let req = protoc_1.MST.C2S_MissionClaim.create({
            serial: Manager_1.Manager.netManager.getNewSeqId(),
            missionId: this.missionId
        });
        let buffer = protoc_1.MST.C2S_MissionClaim.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_MissionClaim, protoc_1.MST.OuterOpcode_Lobby.C2S_MissionClaim, buffer);
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(ScroViewPlus_1.default)
], MissionView.prototype, "scrollView", void 0);
MissionView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], MissionView);
exports.default = MissionView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvYWN0aXZpdHkvTWlzc2lvblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrRUFBdUQ7QUFFdkQsdURBQW9EO0FBRXBELDZEQUEwRDtBQUMxRCx1REFBNkQ7QUFFN0Qsa0VBQTJFO0FBRzNFLG9FQUE0QztBQUU1QyxvRUFBNEM7QUFLNUMsZ0VBQXdDO0FBQ3hDLHNFQUE4QztBQUM5Qyx5RUFBaUQ7QUFDakQsc0VBQThDO0FBQzlDLG9GQUE0RDtBQUM1RCxvRkFBNEQ7QUFDNUQsZ0VBQXdDO0FBQ3hDLHlEQUFtRDtBQUNuRCxnRUFBd0M7QUFDeEMsb0VBQTRDO0FBQzVDLGdFQUF3QztBQUV4QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFDNUM7O0dBRUc7QUFJSCxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSxnQkFBTTtJQUEvQzs7UUFJSSxlQUFVLEdBQWlCLElBQUksQ0FBQztRQUNoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixjQUFTLEdBQVcsSUFBSSxDQUFDO0lBc0k3QixDQUFDO0lBcElVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sNkJBQTZCLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZiwwRUFBMEU7SUFDOUUsQ0FBQztJQUNELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLElBQUksR0FBRyxHQUFHLFlBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDcEMsTUFBTSxFQUFFLGlCQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtTQUMzQyxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sR0FBRyxZQUFHLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pELDJCQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFHLENBQUMsa0JBQWtCLEVBQUUsWUFBRyxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVHLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUk7UUFDZCxRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssU0FBUztnQkFDVixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQVcsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNWLEtBQUssV0FBVztnQkFDWixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQVUsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsc0JBQVksRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLDJFQUEyRTtnQkFDM0UsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixpQkFBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQVEsRUFBRSxNQUFNLEVBQUUsMEJBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtZQUNWLEtBQUssWUFBWTtnQkFDYixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ25CLGlCQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBUyxFQUFFLE1BQU0sRUFBRSwwQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQzFFLE1BQU07U0FDYjtJQUVMLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2QsaUJBQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFZLEVBQUUsTUFBTSxFQUFFLDBCQUFnQixFQUFFLENBQUMsQ0FBQztZQUN6RSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxXQUFXLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVELHdCQUF3QixDQUFDLElBQUk7UUFDekIsbUJBQVMsQ0FBQyxPQUFPLENBQUMsbUJBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFaEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxFQUFFO2dCQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsTUFBTTthQUNUO1lBQ0QsS0FBSyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNqRCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQTtZQUN0RCxJQUFJLFVBQVUsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFBO1lBQ3pDLElBQUksVUFBVSxJQUFJLFNBQVMsRUFBRTtnQkFDekIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7YUFDdEQ7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFSyxlQUFlLENBQUMsV0FBVzs7WUFDN0IsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUE7WUFDckQsZUFBZSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUE7WUFDdEMsZUFBZSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEUsTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN6RCxDQUFDO0tBQUE7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFPO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFBO1FBQzNCLDBEQUEwRDtRQUMxRCwyREFBMkQ7UUFDM0Qsd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUMvQix3RUFBd0U7UUFDeEUsZUFBZTtRQUNmLDhDQUE4QztRQUM5QyxRQUFRO1FBQ1IsS0FBSztRQUNMLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxtQkFBbUI7UUFDZixJQUFJLEdBQUcsR0FBRyxZQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1lBQ2xDLE1BQU0sRUFBRSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUMsQ0FBQztRQUNILElBQUksTUFBTSxHQUFHLFlBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkQsMkJBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFHLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVELFNBQVM7UUFDTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUVKLENBQUE7QUF6SUc7SUFEQyxRQUFRLENBQUMsc0JBQVksQ0FBQzsrQ0FDUztBQUpmLFdBQVc7SUFGL0IsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsV0FBVyxDQTZJL0I7a0JBN0lvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUNvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vYmFzZS9Ib3RVcGRhdGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IHsgZGlzcGF0Y2hFbnRlckNvbXBsZXRlLCBMb2dpY0V2ZW50LCBMb2dpY1R5cGUgfSBmcm9tIFwiLi4vY29tbW9uL2V2ZW50L0xvZ2ljRXZlbnRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgZ2FtZU1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvR2FtZU1hbmFnZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgQ29tbW9uTWVzc2FnZSwgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgeyBFdmVudEFwaSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnRBcGlcIjtcbmltcG9ydCB7IEh0dHBFcnJvclR5cGUsIFJlcXVlc3RQYWNrZ2UgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL25ldC9IdHRwQ2xpZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBTaGFyZVRyYWNlSGVscGRlciB9IGZyb20gXCIuLi9IZWxwZGVyL3NoYXJlVHJhY2UvU2hhcmVUcmFjZUhlbHBkZXJcIjtcbmltcG9ydCBMYW5ndWFnZUNoYW5nZSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlQ2hhbmdlXCI7XG5pbXBvcnQgU2VydmljZVZpZXcgZnJvbSBcIi4uL3NlcnZpY2UvU2VydmljZVZpZXdcIjtcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9VSU1hbmFnZXJcIjtcbmltcG9ydCBBa3VuVmlldyBmcm9tIFwiLi4vYWt1bi9Ba3VuVmlld1wiO1xuaW1wb3J0IEhhbGxOZXdWaWV3IGZyb20gXCIuLi9oYWxsL0hhbGxOZXdWaWV3XCI7XG5pbXBvcnQgTG9naW5OZXdWaWV3IGZyb20gXCIuLi9sb2dpbi9Mb2dpbk5ld1ZpZXdcIjtcbmltcG9ydCBXYWxsZXRWaWV3IGZyb20gXCIuLi93YWxsZXQvV2FsbGV0Vmlld1wiO1xuaW1wb3J0IFNjcm9WaWV3UGx1cyBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld1BsdXNcIjtcbmltcG9ydCBTY3JvVmlld0N0cmwgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdDdHJsXCI7XG5pbXBvcnQgTWlzc2lvbkl0ZW0gZnJvbSBcIi4vTWlzc2lvbkl0ZW1cIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCBTaWduaW5OZXcgZnJvbSBcIi4uL3NpZ25pbi9TaWduaW5OZXdcIjtcbmltcG9ydCBIYWxsRGF0YSBmcm9tIFwiLi4vZGF0YS9IYWxsRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuLyoqXG4gKiBAZGVzY3JpcHRpb24g55m75b2V5pa55byP6YC76L6R5LqL5Lu25a6a5LmJXG4gKi9cblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pc3Npb25WaWV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KFNjcm9WaWV3UGx1cylcbiAgICBzY3JvbGxWaWV3OiBTY3JvVmlld1BsdXMgPSBudWxsO1xuICAgIF9jbGlja0l0ZW1JZDogbnVtYmVyID0gMDtcbiAgICBfbWlzc2lvbkxpc3QgPSBbXTtcbiAgICBtaXNzaW9uSWQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwibWlzc2lvbi9wcmVmYWJzL01pc3Npb25WaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgLy8gdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoXCJjb21tb24vYXVkaW8vbG9naW5fYmdtXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgIH1cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX0dldE1pc3Npb25MaXN0JywgdGhpcy5vbkV2ZW50X1MyQ19HZXRNaXNzaW9uTGlzdCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX01pc3Npb25DbGFpbScsIHRoaXMub25FdmVudF9TMkNfTWlzc2lvbkNsYWltKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVVc2VySW5mbycsIHRoaXMub25FdmVudF9TMkNfR2V0TWlzc2lvbkxpc3QpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdEdldE1pc3Npb25MaXN0KCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldE1pc3Npb25MaXN0KCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyU19HZXRNaXNzaW9uTGlzdC5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0TWlzc2lvbkxpc3QuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMlNfR2V0TWlzc2lvbkxpc3QsIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfR2V0TWlzc2lvbkxpc3QsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYnRuSG9tZSc6XG4gICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IEhhbGxOZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuRG9tcGV0JzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogV2FsbGV0VmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkxvZ2luJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5FdmVudCc6XG4gICAgICAgICAgICAgICAgLy8gTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IE1pc3Npb25WaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5Ba3VuJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQWt1blZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5RaWFuZGFvJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0xvZ2luZWQoKSlcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFNpZ25pbk5ldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjaGVja0xvZ2luZWQoKSB7XG4gICAgICAgIGxldCB1c2VyRGF0YSA9IEcuRGF0YU1nci5nZXQoVXNlckRhdGEpO1xuICAgICAgICBpZiAoIXVzZXJEYXRhLmlkKSB7XG4gICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTG9naW5OZXdWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfR2V0TWlzc2lvbkxpc3QoKSB7XG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICBsZXQgbWlzc2lvbkxpc3QgPSBoYWxsRGF0YS5taXNzaW9uTGlzdDtcbiAgICAgICAgaWYgKG1pc3Npb25MaXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9taXNzaW9uTGlzdCA9IG1pc3Npb25MaXN0O1xuICAgICAgICAgICAgdGhpcy5NaXNzaW9uSXRlbVZpZXcobWlzc2lvbkxpc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfTWlzc2lvbkNsYWltKGRhdGEpIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5NSVNTSU9OLlJFQ0VJVkVEU1VDQ0VTUyk7XG5cbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgbGV0IG1pc3Npb25JZCA9IGRhdGEubWlzc2lvbklkO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fbWlzc2lvbkxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5fbWlzc2lvbkxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKGRhdGEubWlzc2lvbklkID09IG1pc3Npb25JZCkge1xuICAgICAgICAgICAgICAgIGluZm8uY3VyUHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBtaXNzaW9uSXRlbUNvbSA9IGVsZW1lbnQuZ2V0Q29tcG9uZW50KE1pc3Npb25JdGVtKVxuICAgICAgICAgICAgbGV0IF9taXNzaW9uSWQgPSBtaXNzaW9uSXRlbUNvbS5taXNzaW9uSWRcbiAgICAgICAgICAgIGlmIChfbWlzc2lvbklkID09IG1pc3Npb25JZCkge1xuICAgICAgICAgICAgICAgIG1pc3Npb25JdGVtQ29tLnVwZGF0ZURhdGEodGhpcy5fbWlzc2lvbkxpc3RbaW5kZXhdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIE1pc3Npb25JdGVtVmlldyhtaXNzaW9uTGlzdCkge1xuICAgICAgICBsZXQgc2Nyb1ZpZXdDdHJsQ29tID0gdGhpcy5nZXRDb21wb25lbnQoU2Nyb1ZpZXdDdHJsKVxuICAgICAgICBzY3JvVmlld0N0cmxDb20uZGF0YUxpc3QgPSBtaXNzaW9uTGlzdFxuICAgICAgICBzY3JvVmlld0N0cmxDb20ub25JdGVtQ2xpY2tDYWxsYmFjayA9IHRoaXMub25DbGlja0VtYWlsSXRlbS5iaW5kKHRoaXMpXG4gICAgICAgIGF3YWl0IHNjcm9WaWV3Q3RybENvbS5mcmFtaW5nTG9hZChtaXNzaW9uTGlzdC5sZW5ndGgpXG4gICAgfVxuXG4gICAgb25DbGlja0VtYWlsSXRlbShfaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuX2NsaWNrSXRlbUlkID0gX2l0ZW1JZFxuICAgICAgICAvLyB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIC8vICAgICBsZXQgZW1haWxJdGVtQ29tID0gZWxlbWVudC5nZXRDb21wb25lbnQoTWlzc2lvbkl0ZW0pXG4gICAgICAgIC8vICAgICBsZXQgaXRlbUlkID0gZW1haWxJdGVtQ29tLl9pdGVtSWRcbiAgICAgICAgLy8gICAgIGlmIChfaXRlbUlkID09IGl0ZW1JZCkge1xuICAgICAgICAvLyAgICAgICAgIGVtYWlsSXRlbUNvbS51cGRhdGVEYXRhKHRoaXMuX21pc3Npb25MaXN0W3RoaXMuX2NsaWNrSXRlbUlkXSlcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgZW1haWxJdGVtQ29tLmJnQ2hlY2suYWN0aXZlID0gZmFsc2VcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcbiAgICAgICAgbGV0IG1pc3Npb25JZCA9IHRoaXMuX21pc3Npb25MaXN0W19pdGVtSWRdLm1pc3Npb25JZDtcbiAgICAgICAgdGhpcy5taXNzaW9uSWQgPSBtaXNzaW9uSWQ7XG4gICAgICAgIHRoaXMucmVxdWVzdE1pc3Npb25DbGFpbSgpO1xuICAgIH1cblxuICAgIHJlcXVlc3RNaXNzaW9uQ2xhaW0oKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJTX01pc3Npb25DbGFpbS5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgIG1pc3Npb25JZDogdGhpcy5taXNzaW9uSWRcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJTX01pc3Npb25DbGFpbS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19NaXNzaW9uQ2xhaW0sIE1TVC5PdXRlck9wY29kZV9Mb2JieS5DMlNfTWlzc2lvbkNsYWltLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxuXG59XG4iXX0=