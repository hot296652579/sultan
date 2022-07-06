
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/LoginNewView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vTG9naW5OZXdWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDJEQUEwRjtBQUMxRixrRUFBdUQ7QUFFdkQsdURBQW9EO0FBRXBELDZEQUEwRDtBQUMxRCx1REFBNkQ7QUFFN0Qsa0VBQTJFO0FBRzNFLG9FQUE0QztBQUU1QyxvRUFBNEM7QUFNNUMsa0VBQTBDO0FBQzFDLHNFQUE4QztBQUM5Qyx5REFBbUQ7QUFDbkQsZ0VBQXdDO0FBRXhDLHlEQUFpQztBQUNqQyw0REFBb0M7QUFDcEMsaUVBQXlDO0FBQ3pDLHlGQUFpRTtBQUNqRSw4REFBc0M7QUFHdEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQiwyQ0FBUyxDQUFBO0lBQ1QsK0NBQVcsQ0FBQTtJQUNYLGlEQUFZLENBQUE7SUFDWixpREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVEOztHQUVHO0FBQ1EsUUFBQSxVQUFVLEdBQUc7SUFDcEIsMkJBQTJCO0lBQzNCLE9BQU8sRUFBRSxTQUFTO0lBRWxCLHNCQUFzQjtJQUN0QixRQUFRLEVBQUUsVUFBVTtJQUVwQix1QkFBdUI7SUFDdkIsS0FBSyxFQUFFLE9BQU87Q0FFakIsQ0FBQztBQUlGLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLGdCQUFNO0lBQWhEOztRQUdJLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFHN0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsaUJBQVksR0FBZSxJQUFJLENBQUM7UUFFaEMsZUFBVSxHQUFlLElBQUksQ0FBQztRQUU5Qixj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QUcsQ0FBQyxZQUFZLEVBQUUsWUFBRyxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELFNBQVM7UUFDTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUVKLENBQUE7QUFsVkc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDTTtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNXO0FBRzdCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ1k7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDVTtBQUc1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2tEQUNXO0FBRWhDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0RBQ1M7QUFqQmIsWUFBWTtJQUZoQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixZQUFZLENBcVZoQztrQkFyVm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0hvdFVwZGF0ZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBkaXNwYXRjaEVudGVyQ29tcGxldGUsIExvZ2ljRXZlbnQsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBnYW1lTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb21tb25NZXNzYWdlLCBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgSHR0cEVycm9yVHlwZSwgUmVxdWVzdFBhY2tnZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBDbGllbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IFNoYXJlVHJhY2VIZWxwZGVyIH0gZnJvbSBcIi4uL0hlbHBkZXIvc2hhcmVUcmFjZS9TaGFyZVRyYWNlSGVscGRlclwiO1xuaW1wb3J0IExhbmd1YWdlQ2hhbmdlIGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VDaGFuZ2VcIjtcbmltcG9ydCBTZXJ2aWNlVmlldyBmcm9tIFwiLi4vc2VydmljZS9TZXJ2aWNlVmlld1wiO1xuaW1wb3J0IFJpY2hUZXh0SGFuZGxlciBmcm9tIFwiLi9SaWNoVGV4dEhhbmRsZXJcIjtcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9VSU1hbmFnZXJcIjtcbmltcG9ydCBSZWdpc3RlclZpZXcgZnJvbSBcIi4vUmVnaXN0ZXJWaWV3XCI7XG5pbXBvcnQgRm9yZ2V0UGFzc1ZpZXcgZnJvbSBcIi4vRm9yZ2V0UGFzc1ZpZXdcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL2RhdGEvVXNlckRhdGFcIjtcbmltcG9ydCAqIGFzIExvY2FsU3RvcmVhZ2VEZWZpbmUgZnJvbSBcIi4uL2NvbW1vbi9kZWZpbmUvTG9jYWxTdG9yYWdlRGVmaW5lXCI7XG5pbXBvcnQgZmJzZGsgZnJvbSBcIi4uL3Nkay9mYnNka1wiO1xuaW1wb3J0IFZhbGlkYXRvciBmcm9tIFwiLi9WYWxpZGF0b3JcIjtcbmltcG9ydCBnb29nbGVzZGsgZnJvbSBcIi4uL3Nkay9nb29nbGVzZGtcIjtcbmltcG9ydCBCaW5kUGhvbmVWaWV3IGZyb20gXCIuLi9jb21tb24vYmluZEl0ZW1WaWV3L0JpbmRQaG9uZVZpZXdcIjtcbmltcG9ydCBBcHBEYXRhIGZyb20gXCIuLi9kYXRhL0FwcERhdGFcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBMb2dpblR5cGUge1xuICAgIHBob25lID0gMSxcbiAgICB0b3VyaXN0ID0gMixcbiAgICBwYXNzd29yZCA9IDMsXG4gICAgZmFjZWJvb2sgPSA0LFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDnmbvlvZXmlrnlvI/pgLvovpHkuovku7blrprkuYlcbiAqL1xuZXhwb3J0IGxldCBMb2dpbkV2ZW50ID0ge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDov5vooYzmjIflrprlnLrmma/lrozmiJAgKi9cbiAgICBUT1VSSVNUOiBcIlRPVVJJU1RcIixcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDov5vlhaXlpKfljoUqL1xuICAgIEZBQ0VCT09LOiBcIkZBQ0VCT09LXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L+b5YWl5ri45oiPICovXG4gICAgUEhPTkU6IFwiUEhPTkVcIixcblxufTtcblxuQGNjY2xhc3NcbkBpbmplY3RTZXJ2aWNlKExvYmJ5U2VydmljZS5pbnN0YW5jZSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luTmV3VmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuQmFjazogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoaWRlUGFzc05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnRuRm9yZ2V0UGFzczogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidG5SZWdpc3RlcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBlbWFpbEVkaXRib3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHB3ZEVkaXRib3g6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgbG9naW5UeXBlOiBhbnkgPSBudWxsO1xuICAgIG91dFRpbWVDYWxsOiBOb2RlSlMuVGltZW91dDtcbiAgICBpc0F1dG86IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwibG9naW4vcHJlZmFicy9Mb2dpbk5ld1ZpZXdcIjtcbiAgICB9XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICAvLyB0aGlzLmF1ZGlvSGVscGVyLnBsYXlNdXNpYyhcImNvbW1vbi9hdWRpby9sb2dpbl9iZ21cIiwgQlVORExFX1JFU09VUkNFUyk7XG5cbiAgICAgICAgdGhpcy5idG5CYWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5idG5Gb3JnZXRQYXNzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGlja0ZvcmdldFBhc3MoKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5idG5SZWdpc3Rlci5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tSZWdpc3RlcigpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoaXMucHdkRWRpdGJveC5pbnB1dEZsYWcgPSBjYy5FZGl0Qm94LklucHV0RmxhZy5ERUZBVUxUO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoTG9naWNFdmVudC5FTlRFUl9IQUxMLCB0aGlzLm9uRW50ZXJIYWxsKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVVc2VySW5mbycsIHRoaXMub25FbnRlckhhbGwpO1xuICAgIH1cbiAgICBvbkVudGVySGFsbCgpIHtcbiAgICAgICAgdGhpcy5jaGVja0JpbmRQaG9uZSgpO1xuICAgICAgICB0aGlzLmNsb3NlKClcbiAgICB9XG5cbiAgICBjaGVja0JpbmRQaG9uZSgpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIGlmICh1c2VyRGF0YS5pZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKCF1c2VyRGF0YS5CaW5kUGhvbmUpIHtcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogQmluZFBob25lVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGZic2RrLmluc3RhbmNlLmluaXQoKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoUGxheUluZm8oKVxuICAgIH1cblxuICAgIHJlZnJlc2hQbGF5SW5mbygpIHtcbiAgICAgICAgbGV0IHVzZXJEYXRhID0gRy5EYXRhTWdyLmdldChVc2VyRGF0YSk7XG4gICAgICAgIGxldCBwbGF5ZXJJbmZvID0gdXNlckRhdGFbJ1BsYXllckluZm8nXTtcbiAgICAgICAgaWYgKHBsYXllckluZm8pIHtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tGb3JnZXRQYXNzKCkge1xuICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogRm9yZ2V0UGFzc1ZpZXcsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICB9XG4gICAgY2xpY2tSZWdpc3RlcigpIHtcbiAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFJlZ2lzdGVyVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTIH0pO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J0bk1hc3VrJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9Mb2dpbigpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5GYWNlYm9vayc6XG4gICAgICAgICAgICAgICAgdGhpcy5mYWNlYm9va0xvZ2luKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkdvb2dsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5nb29nbGVMb2dpbigpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5UZWxlZ3JhbSc6XG4gICAgICAgICAgICAgICAgdGhpcy50ZWxlZ3JhbUxvZ2luKClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0blRlc3RMb2dpbic6XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0TG9naW4oKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYnRuSGlkZVBhc3N3b3JkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrSGlkZVBhc3MoKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2tIaWRlUGFzcygpIHtcbiAgICAgICAgbGV0IGljb25IaWRlID0gdGhpcy5oaWRlUGFzc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb25IaWRlJyk7XG4gICAgICAgIGxldCBpY29uU2hvdyA9IHRoaXMuaGlkZVBhc3NOb2RlLmdldENoaWxkQnlOYW1lKCdpY29uU2hvdycpO1xuXG4gICAgICAgIGljb25IaWRlLmFjdGl2ZSA9ICFpY29uSGlkZS5hY3RpdmU7XG4gICAgICAgIGljb25TaG93LmFjdGl2ZSA9ICFpY29uU2hvdy5hY3RpdmU7XG5cbiAgICAgICAgdGhpcy5wd2RFZGl0Ym94LmlucHV0RmxhZyA9IGljb25TaG93LmFjdGl2ZSA/IGNjLkVkaXRCb3guSW5wdXRGbGFnLkRFRkFVTFQgOiBjYy5FZGl0Qm94LklucHV0RmxhZy5QQVNTV09SRDtcbiAgICB9XG5cbiAgICB2YWxpZGF0YUZ1bmMoKSB7XG4gICAgICAgIGxldCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKClcblxuICAgICAgICBsZXQgZW1haWwgPSB0aGlzLmVtYWlsRWRpdGJveC5zdHJpbmdcbiAgICAgICAgbGV0IHB3ZCA9IHRoaXMucHdkRWRpdGJveC5zdHJpbmdcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKGVtYWlsLCBbe1xuICAgICAgICAgICAgc3RyYXRlZ3k6ICdpc05vbkVtcHR5JyxcbiAgICAgICAgICAgIGVycm9yTXNnOiBpMThuLkVESVRCT1guRU1BSUxOVUxMXG4gICAgICAgIH1dKTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHB3ZCwgW3tcbiAgICAgICAgICAgIHN0cmF0ZWd5OiAnaXNOb25FbXB0eScsXG4gICAgICAgICAgICBlcnJvck1zZzogaTE4bi5FRElUQk9YLlBTV05VTExcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoZW1haWwsIFt7XG4gICAgICAgICAgICBzdHJhdGVneTogJ2lzRW1haWwnLFxuICAgICAgICAgICAgZXJyb3JNc2c6IGkxOG4uUkVHSVNURVIuRU1BSUxXUk9OR1xuICAgICAgICB9XSk7XG5cbiAgICAgICAgbGV0IGVycm9yTXNnID0gdmFsaWRhdG9yLnN0YXJ0KClcbiAgICAgICAgcmV0dXJuIGVycm9yTXNnXG4gICAgfVxuXG4gICAgdG9kb0xvZ2luKCkge1xuICAgICAgICBsZXQgX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICBsZXQgZW1haWwgPSB0aGlzLmVtYWlsRWRpdGJveC5zdHJpbmc7XG4gICAgICAgIGxldCBwd2QgPSB0aGlzLnB3ZEVkaXRib3guc3RyaW5nO1xuICAgICAgICBsZXQgaW52Y29kZSA9IF9hcHBEYXRhLmludmNvZGU7XG4gICAgICAgIGxldCBlcnJvck1zZyA9IHRoaXMudmFsaWRhdGFGdW5jKClcbiAgICAgICAgaWYgKGVycm9yTXNnKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChlcnJvck1zZyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvck1zZylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBUaGlyZElkID0gJ3Rlc3QgVGhpcmRJZCc7XG4gICAgICAgIGxldCBpbWVpID0gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSU1FSScpO1xuICAgICAgICBpZiAoIWltZWkpIHtcbiAgICAgICAgICAgIGltZWkgPSAndGVzdCBpbWVpJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwICsgMSlcbiAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0lNRUknLCBpbWVpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX0F1dGhfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBBdXRoS2V5OiBlbWFpbC50b1N0cmluZygpLFxuICAgICAgICAgICAgUGFzc3dvcmQ6IHB3ZCxcbiAgICAgICAgICAgIEF1dGhUeXBlOiAxLFxuICAgICAgICAgICAgaW1laSxcbiAgICAgICAgICAgIFRoaXJkSWQsXG4gICAgICAgICAgICBpbnZjb2RlXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gTVNULkMyTV9BdXRoX1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTV9BdXRoX1JlcSwgTVNULk91dGVyT3Bjb2RlX01hcC5DMk1fQXV0aF9SZXEsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgdGVsZWdyYW1Mb2dpbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cod2luZG93KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgbGV0IFRlbGVncmFtID0gd2luZG93WydUZWxlZ3JhbSddO1xuICAgICAgICBpZiAoIVRlbGVncmFtKSByZXR1cm47XG4gICAgICAgIC8vIHZhciBhdXRoX3BhcmFtcyA9IHtcbiAgICAgICAgLy8gICAgIGJvdF9pZDogNTIzNzU2NzUyMSwgLy8gcGxhY2UgaWQgb2YgeW91ciBib3QgaGVyZVxuICAgICAgICAvLyAgICAgc2NvcGU6IHsgZGF0YTogW3sgdHlwZTogJ2lkX2RvY3VtZW50Jywgc2VsZmllOiB0cnVlIH0sICdhZGRyZXNzX2RvY3VtZW50JywgJ3Bob25lX251bWJlcicsICdlbWFpbCddLCB2OiAxIH0sXG4gICAgICAgIC8vICAgICBwdWJsaWNfa2V5OiAnLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1NSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXRmN2VLL09LK2JVM2JESno5ckYrMEJXY1RjTmVrQ3YxMjJqRU9RVFhJRXErcCtJK215LzJHbUFaU01VM05sSDllK1BpZ1Mvckg4Y1c4VUxUMEtWWEdBSFFQVndZcXZwdmxqRmtrQUVkYnFrRmdxWFpNTDgyK0Fzdyt4R0JQeEVSTWJMZmE0bEphenhabEo5NUkySFFuOWNzT2ZUMCtwTGZKZEhZbXJtMFhCdGNCOGZFZlhpZ0hhckFJNmxZMGtwTThPTWlVTFMwczJadEM2TllvU0tMYTRuTjZDLytENXY3OTZnSHhZV0hqOHJ6eWVJSkx3Sjl2QTJCWE9BSCtpQjFqc1IyN2tiUmFXQ0tKMkpHM0d6NTNBL3hxS0JPenpVVVBLWDN5YXdJTk9BelVYSEpZMUorc3ZhaTR0VGY5Uk80RUtjb0xuSzc3UUt5bzRVbHA5NURFd0lEQVFBQi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLScsIC8vIHBsYWNlIHB1YmxpYyBrZXkgb2YgeW91ciBib3QgaGVyZVxuICAgICAgICAvLyAgICAgbm9uY2U6ICdBQUhHT25oS2RNSkZhU1JaTC12bGotMjd3RXZwQks5a0VCTScsIC8vIHBsYWNlIG5vbmNlIGhlcmVcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrX3VybDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgLy8gICAgIH0gLy8gcGxhY2UgY2FsbGJhY2sgdXJsIGhlcmVcbiAgICAgICAgLy8gfTtcbiAgICAgICAgLy8gVGVsZWdyYW0uUGFzc3BvcnQuYXV0aChhdXRoX3BhcmFtcywgZnVuY3Rpb24gKHNob3cpIHtcbiAgICAgICAgLy8gICAgIGlmIChzaG93KSB7XG4gICAgICAgIC8vICAgICAgICAgLy8gc29tZSBjb2RlIHRvIHNob3cgdG9vbHRpcFxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHNob3cpXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgICAgIC8vIHNvbWUgY29kZSB0byBoaWRlIHRvb2x0aXBcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhzaG93KVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICBUZWxlZ3JhbS5Mb2dpbi5hdXRoKHsgYm90X2lkOiAnNTU1NjI5NTU3NycsIHJlcXVlc3RfYWNjZXNzOiAncmVhZCcsIGVtYmVkOiAxIH0sIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCAn6L+Z5piv5Zue6LCD5pWw5o2uJyk7Ly/ov5nph4znmoRkYXRh5ZKM5LmL5YmN6L+U5Zue55qEdXNlcuaVsOaNruWSjOagvOW8j+aXoOW3ruW8glxuICAgICAgICAgICAgLy/kvovlrZDov5Tlm57mlbDmja5cbiAgICAgICAgICAgIC8vIGF1dGhfZGF0ZTogMTY1NjA1MzU0MVxuICAgICAgICAgICAgLy8gZmlyc3RfbmFtZTogXCJHcm9kZW5cIlxuICAgICAgICAgICAgLy8gaGFzaDogXCI0MjdiZWMyNDdiZGY1NGZmNjM0ZWZkNGExYmUwZWE5YzRlY2VmNmU0MDYyYWQyYTFkODZhMTUxYjlkNThjNWM0XCJcbiAgICAgICAgICAgIC8vIGlkOiA1MzgwNTkyNTMwXG4gICAgICAgICAgICAvLyBsYXN0X25hbWU6IFwid29uZ1wiXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICAvL+Wksei0peaXtuS9oOmcgOimgeWBmueahOmAu+i+kVxuICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/nlLXmiqXnmbvlvZXmiJDlip/kvaDpnIDopoHlgZrnmoTpgLvovpHvvIjov5nph4zmiJHmmK/nm7TmjqXlhpnkuobkuIDkuKrlh73mlbDljrvosIPnlKjnmbvlvZXmiJDlip/lkI7nmoTkuJrliqHpgLvovpHvvIlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICBsZXQgX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICAgICAgbGV0IGludmNvZGUgPSBfYXBwRGF0YS5pbnZjb2RlO1xuICAgICAgICAgICAgbGV0IGltZWkgPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdJTUVJJyk7XG4gICAgICAgICAgICBpZiAoIWltZWkpIHtcbiAgICAgICAgICAgICAgICBpbWVpID0gJ3Rlc3QgaW1laScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCArIDEpXG4gICAgICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSU1FSScsIGltZWkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGFyZ3MgPSB7fVxuICAgICAgICAgICAgYXJnc1snQXV0aEtleSddID0gSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZ3NbJ0F1dGhLZXknXSk7XG4gICAgICAgICAgICBhcmdzWydQYXNzd29yZCddID0gJzEyMzQ1NidcbiAgICAgICAgICAgIGFyZ3NbJ0F1dGhUeXBlJ10gPSA1XG4gICAgICAgICAgICBhcmdzWydpbWVpJ10gPSBpbWVpXG4gICAgICAgICAgICBhcmdzWydpbnZjb2RlJ10gPSBpbnZjb2RlXG4gICAgICAgICAgICBzZWxmLnJlcXVlc3RMb2dpbkhhbmRsZXIoYXJncylcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgfVxuXG4gICAgdGVzdExvZ2luKCkge1xuICAgICAgICBsZXQgQXV0aEtleSA9IFN0cmluZyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCArIDEpKVxuICAgICAgICBsZXQgaW1laSA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0lNRUknKTtcbiAgICAgICAgaWYgKCFpbWVpKSB7XG4gICAgICAgICAgICBpbWVpID0gJ3Rlc3QgaW1laScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCArIDEpXG4gICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJTUVJJywgaW1laSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IF9hcHBEYXRhID0gRy5EYXRhTWdyLmdldChBcHBEYXRhKTtcbiAgICAgICAgbGV0IGludmNvZGUgPSBfYXBwRGF0YS5pbnZjb2RlO1xuICAgICAgICBsZXQgYXJncyA9IHt9XG4gICAgICAgIGFyZ3NbJ0F1dGhLZXknXSA9IEF1dGhLZXlcbiAgICAgICAgYXJnc1snUGFzc3dvcmQnXSA9ICcnXG4gICAgICAgIGFyZ3NbJ1RoaXJkSWQnXSA9ICcnXG4gICAgICAgIGFyZ3NbJ0F1dGhUeXBlJ10gPSA2XG4gICAgICAgIGFyZ3NbJ2ltZWknXSA9IGltZWlcbiAgICAgICAgYXJnc1snaW52Y29kZSddID0gaW52Y29kZVxuICAgICAgICB0aGlzLnJlcXVlc3RMb2dpbkhhbmRsZXIoYXJncylcbiAgICB9XG5cbiAgICBmYWNlYm9va0xvZ2luKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgICAgZmJzZGsuaW5zdGFuY2UuRkJfTG9naW4oZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZWkgPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdJTUVJJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFpbWVpKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZWkgPSAndGVzdCBpbWVpJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwICsgMSlcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSU1FSScsIGltZWkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBfYXBwRGF0YSA9IEcuRGF0YU1nci5nZXQoQXBwRGF0YSk7XG4gICAgICAgICAgICAgICAgbGV0IGludmNvZGUgPSBfYXBwRGF0YS5pbnZjb2RlO1xuXG4gICAgICAgICAgICAgICAgLy8gbGV0IFBhc3N3b3JkID0gJzEyMzQ1NidcbiAgICAgICAgICAgICAgICAvLyBsZXQgcmVxID0gTVNULkMyTV9BdXRoX1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIC8vICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICAgICAgLy8gICAgIEF1dGhLZXksXG4gICAgICAgICAgICAgICAgLy8gICAgIFBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIC8vICAgICBBdXRoVHlwZTogMyxcbiAgICAgICAgICAgICAgICAvLyAgICAgVGhpcmRJZCxcbiAgICAgICAgICAgICAgICAvLyAgICAgaW1laTogJ3Rlc3QgaW1laSdcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyBsZXQgYnVmZmVyID0gTVNULkMyTV9BdXRoX1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAvLyBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJNX0F1dGhfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTWFwLkMyTV9BdXRoX1JlcSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnZmFjZWJvb2sg5pS25Yiw5Zue6LCD5pWw5o2uJyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZiLGluZm8uYWNjZXNzVG9rZW4gOiAnICsgaW5mby5hY2Nlc3NUb2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYiBpbmZvLmlkIDogJyArIGluZm8uaWQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJncyA9IHt9XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbJ0F1dGhLZXknXSA9IGluZm8uYWNjZXNzVG9rZW5cbiAgICAgICAgICAgICAgICAgICAgYXJnc1snUGFzc3dvcmQnXSA9ICcxMjM0NTYnXG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbJ1RoaXJkSWQnXSA9IGluZm8uaWRcbiAgICAgICAgICAgICAgICAgICAgYXJnc1snQXV0aFR5cGUnXSA9IDNcbiAgICAgICAgICAgICAgICAgICAgYXJnc1snaW1laSddID0gaW1laVxuICAgICAgICAgICAgICAgICAgICBhcmdzWydpbnZjb2RlJ10gPSBpbnZjb2RlXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVxdWVzdExvZ2luSGFuZGxlcihhcmdzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnb29nbGVMb2dpbigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgIGdvb2dsZXNkay5pbnN0YW5jZS5Hb29nbGVfTG9naW4oZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZWkgPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdJTUVJJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFpbWVpKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZWkgPSAndGVzdCBpbWVpJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwICsgMSlcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSU1FSScsIGltZWkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICAgICAgICAgIGxldCBpbnZjb2RlID0gX2FwcERhdGEuaW52Y29kZTtcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IHt9XG4gICAgICAgICAgICAgICAgYXJnc1snQXV0aEtleSddID0gaW5mby5pZFxuICAgICAgICAgICAgICAgIGFyZ3NbJ1Bhc3N3b3JkJ10gPSAnMTIzNDU2J1xuICAgICAgICAgICAgICAgIGFyZ3NbJ0F1dGhUeXBlJ10gPSAyXG4gICAgICAgICAgICAgICAgYXJnc1snaW1laSddID0gaW1laVxuICAgICAgICAgICAgICAgIGFyZ3NbJ2ludmNvZGUnXSA9IGludmNvZGVcbiAgICAgICAgICAgICAgICBzZWxmLnJlcXVlc3RMb2dpbkhhbmRsZXIoYXJncylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXF1ZXN0TG9naW5IYW5kbGVyKGFyZ3MpIHtcbiAgICAgICAgbGV0IEF1dGhLZXkgPSBhcmdzWydBdXRoS2V5J11cbiAgICAgICAgbGV0IFBhc3N3b3JkID0gYXJnc1snUGFzc3dvcmQnXVxuICAgICAgICBsZXQgQXV0aFR5cGUgPSBhcmdzWydBdXRoVHlwZSddXG4gICAgICAgIGxldCBUaGlyZElkID0gYXJnc1snVGhpcmRJZCddXG4gICAgICAgIGxldCBpbWVpID0gYXJnc1snaW1laSddXG4gICAgICAgIGxldCBpbnZjb2RlID0gYXJnc1snaW52Y29kZSddXG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJNX0F1dGhfUmVxLmNyZWF0ZSh7XG4gICAgICAgICAgICBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCksXG4gICAgICAgICAgICBBdXRoS2V5LFxuICAgICAgICAgICAgUGFzc3dvcmQsXG4gICAgICAgICAgICBUaGlyZElkLFxuICAgICAgICAgICAgQXV0aFR5cGUsXG4gICAgICAgICAgICBpbWVpLFxuICAgICAgICAgICAgaW52Y29kZVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMk1fQXV0aF9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKE1TVC5DMk1fQXV0aF9SZXEsIE1TVC5PdXRlck9wY29kZV9NYXAuQzJNX0F1dGhfUmVxLCBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxuXG59XG4iXX0=