"use strict";
cc._RF.push(module, 'c9ef1tuCidPIKW5AkwxB8WK', 'LoginNewView');
// script/login/LoginNewView.ts

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
exports.LoginEvent = exports.LoginType = void 0;
const LogicEvent_1 = require("../common/event/LogicEvent");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const RegisterView_1 = __importDefault(require("./RegisterView"));
const ForgetPassView_1 = __importDefault(require("./ForgetPassView"));
const protoc_1 = require("../framework/external/protoc");
const UserData_1 = __importDefault(require("../data/UserData"));
const fbsdk_1 = __importDefault(require("../sdk/fbsdk"));
const Validator_1 = __importDefault(require("./Validator"));
const googlesdk_1 = __importDefault(require("../sdk/googlesdk"));
const BindPhoneView_1 = __importDefault(require("../common/bindItemView/BindPhoneView"));
const AppData_1 = __importDefault(require("../data/AppData"));
const { ccclass, property } = cc._decorator;
var LoginType;
(function (LoginType) {
    LoginType[LoginType["phone"] = 1] = "phone";
    LoginType[LoginType["tourist"] = 2] = "tourist";
    LoginType[LoginType["password"] = 3] = "password";
    LoginType[LoginType["facebook"] = 4] = "facebook";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
/**
 * @description 登录方式逻辑事件定义
 */
exports.LoginEvent = {
    /**@description 进行指定场景完成 */
    TOURIST: "TOURIST",
    /**@description 进入大厅*/
    FACEBOOK: "FACEBOOK",
    /**@description 进入游戏 */
    PHONE: "PHONE",
};
let LoginNewView = class LoginNewView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.btnBack = null;
        this.hidePassNode = null;
        this.btnForgetPass = null;
        this.btnRegister = null;
        this.emailEditbox = null;
        this.pwdEditbox = null;
        this.loginType = null;
        this.service = null;
    }
    static getPrefabUrl() {
        return "login/prefabs/LoginNewView";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        this.btnBack.on(cc.Node.EventType.TOUCH_END, () => {
            this.close();
        });
        this.btnForgetPass.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickForgetPass();
        });
        this.btnRegister.on(cc.Node.EventType.TOUCH_END, () => {
            this.clickRegister();
        });
        // this.pwdEditbox.inputFlag = cc.EditBox.InputFlag.DEFAULT;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_HALL, this.onEnterHall);
        this.registerEvent('updateUserInfo', this.onEnterHall);
    }
    onEnterHall() {
        this.checkBindPhone();
        this.close();
    }
    checkBindPhone() {
        let userData = G.DataMgr.get(UserData_1.default);
        if (userData.id !== null) {
            if (!userData.BindPhone) {
                Manager_1.Manager.uiManager.open({ type: BindPhoneView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
            }
        }
    }
    start() {
        fbsdk_1.default.instance.init();
        this.refreshPlayInfo();
    }
    refreshPlayInfo() {
        let userData = G.DataMgr.get(UserData_1.default);
        let playerInfo = userData['PlayerInfo'];
        if (playerInfo) {
        }
    }
    clickForgetPass() {
        Manager_1.Manager.uiManager.open({ type: ForgetPassView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    clickRegister() {
        Manager_1.Manager.uiManager.open({ type: RegisterView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
    }
    onClick(name, node) {
        switch (name) {
            case 'btnMasuk':
                this.todoLogin();
                break;
            case 'btnFacebook':
                this.facebookLogin();
                break;
            case 'btnGoogle':
                this.googleLogin();
                break;
            case 'btnTelegram':
                this.telegramLogin();
                break;
            case 'btnTestLogin':
                this.testLogin();
                break;
            case 'btnHidePassword':
                this.clickHidePass();
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
        let validator = new Validator_1.default();
        let email = this.emailEditbox.string;
        let pwd = this.pwdEditbox.string;
        validator.add(email, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.EDITBOX.EMAILNULL
            }]);
        validator.add(pwd, [{
                strategy: 'isNonEmpty',
                errorMsg: LanguageImpl_1.i18n.EDITBOX.PSWNULL
            }]);
        validator.add(email, [{
                strategy: 'isEmail',
                errorMsg: LanguageImpl_1.i18n.REGISTER.EMAILWRONG
            }]);
        let errorMsg = validator.start();
        return errorMsg;
    }
    todoLogin() {
        let _appData = G.DataMgr.get(AppData_1.default);
        let email = this.emailEditbox.string;
        let pwd = this.pwdEditbox.string;
        let invcode = _appData.invcode;
        let errorMsg = this.validataFunc();
        if (errorMsg) {
            PanelHelp_1.default.showTip(errorMsg);
            // console.log(errorMsg)
            return;
        }
        let ThirdId = 'test ThirdId';
        let imei = Manager_1.Manager.localStorage.getItem('IMEI');
        if (!imei) {
            imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
            Manager_1.Manager.localStorage.setItem('IMEI', imei);
        }
        let req = protoc_1.MST.C2M_Auth_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            AuthKey: email.toString(),
            Password: pwd,
            AuthType: 1,
            imei,
            ThirdId,
            invcode
        });
        let buffer = protoc_1.MST.C2M_Auth_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_Auth_Req, protoc_1.MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
    }
    telegramLogin() {
        // console.log(window)
        let self = this;
        let Telegram = window['Telegram'];
        if (!Telegram)
            return;
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
            console.log(data, '这是回调数据'); //这里的data和之前返回的user数据和格式无差异
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
            let _appData = G.DataMgr.get(AppData_1.default);
            let invcode = _appData.invcode;
            let imei = Manager_1.Manager.localStorage.getItem('IMEI');
            if (!imei) {
                imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
                Manager_1.Manager.localStorage.setItem('IMEI', imei);
            }
            let args = {};
            args['AuthKey'] = JSON.stringify(data);
            console.log(args['AuthKey']);
            args['Password'] = '123456';
            args['AuthType'] = 5;
            args['imei'] = imei;
            args['invcode'] = invcode;
            self.requestLoginHandler(args);
        });
        // const script = document.createElement('script');
    }
    testLogin() {
        let AuthKey = String(Math.floor(Math.random() * 10000 + 1));
        let imei = Manager_1.Manager.localStorage.getItem('IMEI');
        if (!imei) {
            imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
            Manager_1.Manager.localStorage.setItem('IMEI', imei);
        }
        let _appData = G.DataMgr.get(AppData_1.default);
        let invcode = _appData.invcode;
        let args = {};
        args['AuthKey'] = AuthKey;
        args['Password'] = '';
        args['ThirdId'] = '';
        args['AuthType'] = 6;
        args['imei'] = imei;
        args['invcode'] = invcode;
        this.requestLoginHandler(args);
    }
    facebookLogin() {
        let self = this;
        fbsdk_1.default.instance.FB_Login(function (info) {
            if (info) {
                let imei = Manager_1.Manager.localStorage.getItem('IMEI');
                if (!imei) {
                    imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
                    Manager_1.Manager.localStorage.setItem('IMEI', imei);
                }
                let _appData = G.DataMgr.get(AppData_1.default);
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
                    let args = {};
                    args['AuthKey'] = info.accessToken;
                    args['Password'] = '123456';
                    args['ThirdId'] = info.id;
                    args['AuthType'] = 3;
                    args['imei'] = imei;
                    args['invcode'] = invcode;
                    self.requestLoginHandler(args);
                }
            }
        });
    }
    googleLogin() {
        let self = this;
        googlesdk_1.default.instance.Google_Login(function (info) {
            if (info) {
                let imei = Manager_1.Manager.localStorage.getItem('IMEI');
                if (!imei) {
                    imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
                    Manager_1.Manager.localStorage.setItem('IMEI', imei);
                }
                let _appData = G.DataMgr.get(AppData_1.default);
                let invcode = _appData.invcode;
                let args = {};
                args['AuthKey'] = info.id;
                args['Password'] = '123456';
                args['AuthType'] = 2;
                args['imei'] = imei;
                args['invcode'] = invcode;
                self.requestLoginHandler(args);
            }
        });
    }
    requestLoginHandler(args) {
        let AuthKey = args['AuthKey'];
        let Password = args['Password'];
        let AuthType = args['AuthType'];
        let ThirdId = args['ThirdId'];
        let imei = args['imei'];
        let invcode = args['invcode'];
        let req = protoc_1.MST.C2M_Auth_Req.create({
            RpcId: Manager_1.Manager.netManager.getNewSeqId(),
            AuthKey,
            Password,
            ThirdId,
            AuthType,
            imei,
            invcode
        });
        let buffer = protoc_1.MST.C2M_Auth_Req.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_Auth_Req, protoc_1.MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], LoginNewView.prototype, "btnBack", void 0);
__decorate([
    property(cc.Node)
], LoginNewView.prototype, "hidePassNode", void 0);
__decorate([
    property(cc.Node)
], LoginNewView.prototype, "btnForgetPass", void 0);
__decorate([
    property(cc.Node)
], LoginNewView.prototype, "btnRegister", void 0);
__decorate([
    property(cc.EditBox)
], LoginNewView.prototype, "emailEditbox", void 0);
__decorate([
    property(cc.EditBox)
], LoginNewView.prototype, "pwdEditbox", void 0);
LoginNewView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], LoginNewView);
exports.default = LoginNewView;

cc._RF.pop();