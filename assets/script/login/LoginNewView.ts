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
import RichTextHandler from "./RichTextHandler";
import { UIManager } from "../framework/base/UIManager";
import RegisterView from "./RegisterView";
import ForgetPassView from "./ForgetPassView";
import { MST } from "../framework/external/protoc";
import UserData from "../data/UserData";
import * as LocalStoreageDefine from "../common/define/LocalStorageDefine";
import fbsdk from "../sdk/fbsdk";
import Validator from "./Validator";
import googlesdk from "../sdk/googlesdk";
import BindPhoneView from "../common/bindItemView/BindPhoneView";
import AppData from "../data/AppData";


const { ccclass, property } = cc._decorator;

export enum LoginType {
    phone = 1,
    tourist = 2,
    password = 3,
    facebook = 4,
}

/**
 * @description 登录方式逻辑事件定义
 */
export let LoginEvent = {
    /**@description 进行指定场景完成 */
    TOURIST: "TOURIST",

    /**@description 进入大厅*/
    FACEBOOK: "FACEBOOK",

    /**@description 进入游戏 */
    PHONE: "PHONE",

};

@ccclass
@injectService(LobbyService.instance)
export default class LoginNewView extends UIView implements IController<LobbyService> {

    @property(cc.Node)
    btnBack: cc.Node = null;

    @property(cc.Node)
    hidePassNode: cc.Node = null;

    @property(cc.Node)
    btnForgetPass: cc.Node = null;

    @property(cc.Node)
    btnRegister: cc.Node = null;

    @property(cc.EditBox)
    emailEditbox: cc.EditBox = null;
    @property(cc.EditBox)
    pwdEditbox: cc.EditBox = null;

    loginType: any = null;
    outTimeCall: NodeJS.Timeout;
    isAuto: boolean;

    public static getPrefabUrl() {
        return "login/prefabs/LoginNewView";
    }
    service: LobbyService = null;
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);

        this.btnBack.on(cc.Node.EventType.TOUCH_END, () => {
            this.close();
        });
        this.btnForgetPass.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickForgetPass()
        });
        this.btnRegister.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickRegister()
        });

        // this.pwdEditbox.inputFlag = cc.EditBox.InputFlag.DEFAULT;
    }

    bindingEvents() {
        super.bindingEvents();

        this.registerEvent(LogicEvent.ENTER_HALL, this.onEnterHall);
        this.registerEvent('updateUserInfo', this.onEnterHall);
    }
    onEnterHall() {
        this.checkBindPhone();
        this.close()
    }

    checkBindPhone() {
        let userData = G.DataMgr.get(UserData);
        if (userData.id !== null) {
            if (!userData.BindPhone) {
                Manager.uiManager.open({ type: BindPhoneView, bundle: BUNDLE_RESOURCES });
            }
        }
    }

    start() {
        fbsdk.instance.init();
        this.refreshPlayInfo()
    }

    refreshPlayInfo() {
        let userData = G.DataMgr.get(UserData);
        let playerInfo = userData['PlayerInfo'];
        if (playerInfo) {

        }
    }

    clickForgetPass() {
        Manager.uiManager.open({ type: ForgetPassView, bundle: BUNDLE_RESOURCES });
    }
    clickRegister() {
        Manager.uiManager.open({ type: RegisterView, bundle: BUNDLE_RESOURCES });
    }

    onClick(name, node) {
        switch (name) {
            case 'btnMasuk':
                this.todoLogin()
                break;
            case 'btnFacebook':
                this.facebookLogin()
                break;
            case 'btnGoogle':
                this.googleLogin()
                break;
            case 'btnTelegram':
                this.telegramLogin()
                break;
            case 'btnTestLogin':
                this.testLogin()
                break;
            case 'btnHidePassword':
                this.clickHidePass()
                break;

            default:
                break;
        }
    }

    clickHidePass() {
        let iconHide = this.hidePassNode.getChildByName('iconHide');
        let iconShow = this.hidePassNode.getChildByName('iconShow');

        iconHide.active = !iconHide.active;
        iconShow.active = !iconShow.active;

        this.pwdEditbox.inputFlag = iconShow.active ? cc.EditBox.InputFlag.DEFAULT : cc.EditBox.InputFlag.PASSWORD;
    }

    validataFunc() {
        let validator = new Validator()

        let email = this.emailEditbox.string
        let pwd = this.pwdEditbox.string

        validator.add(email, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.EDITBOX.EMAILNULL
        }]);

        validator.add(pwd, [{
            strategy: 'isNonEmpty',
            errorMsg: i18n.EDITBOX.PSWNULL
        }]);

        validator.add(email, [{
            strategy: 'isEmail',
            errorMsg: i18n.REGISTER.EMAILWRONG
        }]);

        let errorMsg = validator.start()
        return errorMsg
    }

    todoLogin() {
        let _appData = G.DataMgr.get(AppData);
        let email = this.emailEditbox.string;
        let pwd = this.pwdEditbox.string;
        let invcode = _appData.invcode;
        let errorMsg = this.validataFunc()
        if (errorMsg) {
            PanelHelp.showTip(errorMsg);
            // console.log(errorMsg)
            return;
        }

        let ThirdId = 'test ThirdId';
        let imei = Manager.localStorage.getItem('IMEI');
        if (!imei) {
            imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
            Manager.localStorage.setItem('IMEI', imei);
        }

        let req = MST.C2M_Auth_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            AuthKey: email.toString(),
            Password: pwd,
            AuthType: 1,
            imei,
            ThirdId,
            invcode
        });
        let buffer = MST.C2M_Auth_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_Auth_Req, MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
    }

    telegramLogin() {
        // console.log(window)
        let self = this
        let Telegram = window['Telegram'];
        if (!Telegram) return;
        // var auth_params = {
        //     bot_id: 5237567521, // place id of your bot here
        //     scope: { data: [{ type: 'id_document', selfie: true }, 'address_document', 'phone_number', 'email'], v: 1 },
        //     public_key: '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtf7eK/OK+bU3bDJz9rF+0BWcTcNekCv122jEOQTXIEq+p+I+my/2GmAZSMU3NlH9e+PigS/rH8cW8ULT0KVXGAHQPVwYqvpvljFkkAEdbqkFgqXZML82+Asw+xGBPxERMbLfa4lJazxZlJ95I2HQn9csOfT0+pLfJdHYmrm0XBtcB8fEfXigHarAI6lY0kpM8OMiULS0s2ZtC6NYoSKLa4nN6C/+D5v796gHxYWHj8rzyeIJLwJ9vA2BXOAH+iB1jsR27kbRaWCKJ2JG3Gz53A/xqKBOzzUUPKX3yawINOAzUXHJY1J+svai4tTf9RO4EKcoLnK77QKyo4Ulp95DEwIDAQAB-----END PUBLIC KEY-----', // place public key of your bot here
        //     nonce: 'AAHGOnhKdMJFaSRZL-vlj-27wEvpBK9kEBM', // place nonce here
        //     callback_url: function (data) {
        //         console.log(data);
        //     } // place callback url here
        // };
        // Telegram.Passport.auth(auth_params, function (show) {
        //     if (show) {
        //         // some code to show tooltip
        //         console.log(show)
        //     } else {
        //         // some code to hide tooltip
        //         console.log(show)
        //     }
        // });

        Telegram.Login.auth({ bot_id: '5556295577', request_access: 'read', embed: 1 }, (data) => {
            console.log(data, '这是回调数据');//这里的data和之前返回的user数据和格式无差异
            //例子返回数据
            // auth_date: 1656053541
            // first_name: "Groden"
            // hash: "427bec247bdf54ff634efd4a1be0ea9c4ecef6e4062ad2a1d86a151b9d58c5c4"
            // id: 5380592530
            // last_name: "wong"
            if (!data) {
                //失败时你需要做的逻辑
                alert(data);
            }
            //电报登录成功你需要做的逻辑（这里我是直接写了一个函数去调用登录成功后的业务逻辑）
            // console.log(data)
            let _appData = G.DataMgr.get(AppData);
            let invcode = _appData.invcode;
            let imei = Manager.localStorage.getItem('IMEI');
            if (!imei) {
                imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
                Manager.localStorage.setItem('IMEI', imei);
            }
            let args = {}
            args['AuthKey'] = JSON.stringify(data)
            console.log(args['AuthKey']);
            args['Password'] = '123456'
            args['AuthType'] = 5
            args['imei'] = imei
            args['invcode'] = invcode
            self.requestLoginHandler(args)
        });

        // const script = document.createElement('script');
    }

    testLogin() {
        let AuthKey = String(Math.floor(Math.random() * 10000 + 1))
        let imei = Manager.localStorage.getItem('IMEI');
        if (!imei) {
            imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
            Manager.localStorage.setItem('IMEI', imei);
        }
        let _appData = G.DataMgr.get(AppData);
        let invcode = _appData.invcode;
        let args = {}
        args['AuthKey'] = AuthKey
        args['Password'] = ''
        args['ThirdId'] = ''
        args['AuthType'] = 6
        args['imei'] = imei
        args['invcode'] = invcode
        this.requestLoginHandler(args)
    }

    facebookLogin() {
        let self = this
        fbsdk.instance.FB_Login(function (info) {
            if (info) {
                let imei = Manager.localStorage.getItem('IMEI');
                if (!imei) {
                    imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
                    Manager.localStorage.setItem('IMEI', imei);
                }

                let _appData = G.DataMgr.get(AppData);
                let invcode = _appData.invcode;

                // let Password = '123456'
                // let req = MST.C2M_Auth_Req.create({
                //     RpcId: Manager.netManager.getNewSeqId(),
                //     AuthKey,
                //     Password,
                //     AuthType: 3,
                //     ThirdId,
                //     imei: 'test imei'
                // });
                // let buffer = MST.C2M_Auth_Req.encode(req).finish();
                // LobbyService.instance.sendMsg(MST.C2M_Auth_Req, MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
                alert('facebook 收到回调数据');
                if (info) {
                    console.log('fb,info.accessToken : ' + info.accessToken);
                    console.log('fb info.id : ' + info.id);
                    let args = {}
                    args['AuthKey'] = info.accessToken
                    args['Password'] = '123456'
                    args['ThirdId'] = info.id
                    args['AuthType'] = 3
                    args['imei'] = imei
                    args['invcode'] = invcode
                    self.requestLoginHandler(args)
                }
            }
        })
    }

    googleLogin() {
        let self = this
        googlesdk.instance.Google_Login(function (info) {
            if (info) {
                let imei = Manager.localStorage.getItem('IMEI');
                if (!imei) {
                    imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
                    Manager.localStorage.setItem('IMEI', imei);
                }
                let _appData = G.DataMgr.get(AppData);
                let invcode = _appData.invcode;
                let args = {}
                args['AuthKey'] = info.id
                args['Password'] = '123456'
                args['AuthType'] = 2
                args['imei'] = imei
                args['invcode'] = invcode
                self.requestLoginHandler(args)
            }
        })
    }

    requestLoginHandler(args) {
        let AuthKey = args['AuthKey']
        let Password = args['Password']
        let AuthType = args['AuthType']
        let ThirdId = args['ThirdId']
        let imei = args['imei']
        let invcode = args['invcode']
        let req = MST.C2M_Auth_Req.create({
            RpcId: Manager.netManager.getNewSeqId(),
            AuthKey,
            Password,
            ThirdId,
            AuthType,
            imei,
            invcode
        });
        let buffer = MST.C2M_Auth_Req.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2M_Auth_Req, MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
    }

    onDestroy() {
        super.onDestroy();
    }

}
