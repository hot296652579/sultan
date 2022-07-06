"use strict";
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