import { Logic } from "../common/base/Logic";
import { LogicType, LogicEvent } from "../common/event/LogicEvent";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { Manager } from "../common/manager/Manager";
import { LobbyService } from "../common/net/LobbyService";
import { Config } from "../common/config/Config";
import { EventApi } from "../framework/event/EventApi";
import { MST } from "../framework/external/protoc";
import * as LocalStoreageDefine from "../common/define/LocalStorageDefine";
import HallData from "../data/HallData";
import UserData from "../data/UserData";
import fbsdk from "../sdk/fbsdk";
import googlesdk from "../sdk/googlesdk";
import { Language } from "../framework/base/Language";
import PanelHelp from "../msgbox/PanelHelp";
import AppData from "../data/AppData";

class LoginLogic extends Logic {

    logicType: LogicType = LogicType.LOGIN;

    get bundle() {
        return BUNDLE_RESOURCES;
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent.ENTER_LOGIN, this.onEnterLogin);
        this.registerEvent(EventApi.NetEvent.ON_OPEN, this.onOpen);
        this.registerEvent('updateUserInfo', this.onUpdateUserInfo);
        // this.addEvent(MST.OuterOpcode_Gate.G2C_LoginGate_Res, this.onG2C_LoginGate_Res);
    }

    onLoad() {
        this._service = LobbyService.instance
        super.onLoad();
        //加载sdk
        // fbsdk.instance.FB_Load()
        // googlesdk.instance.Google_Load()

        Language.Instance().change(cc.sys.LANGUAGE_HINDI);
    }

    // 系统类型 0-安卓 1-ios 2-windowsPC
    private getOS(): number {
        switch (cc.sys.os) {
            case cc.sys.OS_ANDROID:
                return 0;
            case cc.sys.OS_IOS:
                return 1;
            default:
                return 2;
        }
    }

    private onOpen(): void {
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


        let AuthKey = Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        if (AuthKey) {
            let _appData = G.DataMgr.get(AppData);
            let invcode = _appData.invcode;
            let Password = '123456'
            let ThirdId = 'test ThirdId'
            // let imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
            let imei = Manager.localStorage.getItem('IMEI');
            if (!imei) {
                imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
                Manager.localStorage.setItem('IMEI', imei);
            }
            let req = MST.C2M_Auth_Req.create({
                RpcId: Manager.netManager.getNewSeqId(),
                AuthKey,
                Password,
                AuthType: 7,
                ThirdId,
                imei,
                invcode
            });
            let buffer = MST.C2M_Auth_Req.encode(req).finish();
            LobbyService.instance.sendMsg(MST.C2M_Auth_Req, MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
        } else {
            this.removeEvent('updateUserInfo');
            dispatch(LogicEvent.ENTER_HALL);
        }
        // dispatch(LogicEvent.ENTER_HALL);
    }

    private onEnterLogin() {
        G.Logger.log('==onEnterLogin==');
        LobbyService.instance.connect(Config.WS_URL);
    }

    private onG2C_LoginGate_Res(data: MST.G2C_LoginGate_Res): void {
        let hallData = G.DataMgr.get(HallData);
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
        dispatch(LogicEvent.ENTER_HALL);
        this.removeEvent('updateUserInfo');
    }
}

Manager.logicManager.push(LoginLogic);