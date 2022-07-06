"use strict";
cc._RF.push(module, '7b178KIKBdGUqrLpGFiIBz+', 'LoginLogic');
// script/login/LoginLogic.ts

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../common/base/Logic");
const LogicEvent_1 = require("../common/event/LogicEvent");
const Defines_1 = require("../framework/base/Defines");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Config_1 = require("../common/config/Config");
const EventApi_1 = require("../framework/event/EventApi");
const protoc_1 = require("../framework/external/protoc");
const LocalStoreageDefine = __importStar(require("../common/define/LocalStorageDefine"));
const HallData_1 = __importDefault(require("../data/HallData"));
const Language_1 = require("../framework/base/Language");
const AppData_1 = __importDefault(require("../data/AppData"));
class LoginLogic extends Logic_1.Logic {
    constructor() {
        super(...arguments);
        this.logicType = LogicEvent_1.LogicType.LOGIN;
    }
    get bundle() {
        return Defines_1.BUNDLE_RESOURCES;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_LOGIN, this.onEnterLogin);
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_OPEN, this.onOpen);
        this.registerEvent('updateUserInfo', this.onUpdateUserInfo);
        // this.addEvent(MST.OuterOpcode_Gate.G2C_LoginGate_Res, this.onG2C_LoginGate_Res);
    }
    onLoad() {
        this._service = LobbyService_1.LobbyService.instance;
        super.onLoad();
        //加载sdk
        // fbsdk.instance.FB_Load()
        // googlesdk.instance.Google_Load()
        Language_1.Language.Instance().change(cc.sys.LANGUAGE_HINDI);
    }
    // 系统类型 0-安卓 1-ios 2-windowsPC
    getOS() {
        switch (cc.sys.os) {
            case cc.sys.OS_ANDROID:
                return 0;
            case cc.sys.OS_IOS:
                return 1;
            default:
                return 2;
        }
    }
    onOpen() {
        // let req = MST.C2G_LoginGate_Req.create({
        //     RpcId: Manager.netManager.getNewSeqId(),
        //     MachineCode: "",
        //     OS: this.getOS(),
        //     Description: "",
        // });
        // let buffer = MST.C2G_LoginGate_Req.encode(req).finish();
        // LobbyService.instance.sendMsg(MST.C2G_LoginGate_Req, MST.OuterOpcode_Gate.C2G_LoginGate_Req, buffer);
        // // TODO 删除
        // let config = new GameConfig(Config.games["Wingo"].name, Config.games["Wingo"].subName, 0);
        // gameManager().enterGameNoUpdate(config);
        // return;
        let AuthKey = Manager_1.Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        if (AuthKey) {
            let _appData = G.DataMgr.get(AppData_1.default);
            let invcode = _appData.invcode;
            let Password = '123456';
            let ThirdId = 'test ThirdId';
            // let imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
            let imei = Manager_1.Manager.localStorage.getItem('IMEI');
            if (!imei) {
                imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
                Manager_1.Manager.localStorage.setItem('IMEI', imei);
            }
            let req = protoc_1.MST.C2M_Auth_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId(),
                AuthKey,
                Password,
                AuthType: 7,
                ThirdId,
                imei,
                invcode
            });
            let buffer = protoc_1.MST.C2M_Auth_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_Auth_Req, protoc_1.MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
        }
        else {
            this.removeEvent('updateUserInfo');
            dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        }
        // dispatch(LogicEvent.ENTER_HALL);
    }
    onEnterLogin() {
        G.Logger.log('==onEnterLogin==');
        LobbyService_1.LobbyService.instance.connect(Config_1.Config.WS_URL);
    }
    onG2C_LoginGate_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        //假数据
        // let testRooms = [
        //     { id: '0', Name: 'Crash' },
        //     { id: '1', Name: 'Roulette' }
        // ]
        // hallData.gameList = testRooms;
        // hallData.gameList = data.Rooms;
        // let token: string = Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        // if (token) {
        //     let AuthKey = 100000 + Math.floor(Math.random() * (999999 - 100000));
        //     let Password = '123456'
        //     let req = MST.C2M_Auth_Req.create({
        //         RpcId: Manager.netManager.getNewSeqId(),
        //         AuthKey: AuthKey.toString(),
        //         Password,
        //         AuthType: 6,
        //     });
        //     let buffer = MST.C2M_Auth_Req.encode(req).finish();
        //     LobbyService.instance.sendMsg(MST.C2M_Auth_Req, MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
        // } else {
        //     dispatch(LogicEvent.ENTER_HALL);
        // }
    }
    onUpdateUserInfo() {
        dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        this.removeEvent('updateUserInfo');
    }
}
Manager_1.Manager.logicManager.push(LoginLogic);

cc._RF.pop();