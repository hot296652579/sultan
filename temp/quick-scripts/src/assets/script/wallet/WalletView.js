"use strict";
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