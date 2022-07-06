
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/LoginView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5616eKwD1FNnYdoyijrEvlF', 'LoginView');
// script/login/LoginView.ts

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
const Config_1 = require("../common/config/Config");
const LogicEvent_1 = require("../common/event/LogicEvent");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const EventApi_1 = require("../framework/event/EventApi");
const HttpClient_1 = require("../framework/net/HttpClient");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const ShareTraceHelpder_1 = require("../Helpder/shareTrace/ShareTraceHelpder");
const LanguageChange_1 = __importDefault(require("../common/language/LanguageChange"));
const ServiceView_1 = __importDefault(require("../service/ServiceView"));
const RichTextHandler_1 = __importDefault(require("./RichTextHandler"));
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
let LoginView = class LoginView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.loginType = null;
        this.service = null;
    }
    static getPrefabUrl() {
        return "login/prefabs/LoginView";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        LogicEvent_1.dispatchEnterComplete({ type: LogicEvent_1.LogicType.LOGIN, views: [this] });
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(exports.LoginEvent.FACEBOOK, this.reqFaceBookAccLogin);
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_OPEN, this.onGateWayReq);
        this.registerEvent("webSocketIsOpen", this.onGateWayReq);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.GateWay, CommonService_1.protoPackage.gateway.Gate_Cmd_ID.Identity_Auth), this.onGateWayCall);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.LOGIN), this.onLoginReqCall);
        this.registerEvent("serverOutTime", this.serverOutTime);
    }
    serverOutTime() {
        LobbyService_1.LobbyService.instance.close();
        PanelHelp_1.default.showMsgBox("", LanguageImpl_1.i18n.ERRORCODE.SERVERTIMEOUT);
    }
    /**
     * 网关身份验证
     */
    onGateWayReq() {
        if (User_1.User._token) {
            PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOGIN);
            let req = CommonService_1.protoPackage.gateway.IdenityAuthReq.create({ token: User_1.User._token });
            let buffer = CommonService_1.protoPackage.gateway.IdenityAuthReq.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.GateWay, CommonService_1.protoPackage.gateway.Gate_Cmd_ID.Identity_Auth, buffer);
        }
    }
    onGateWayCall(resData) {
        G.Logger.log('token验证回调', resData);
        if (resData.statusMsg.status == 0) {
            let req = CommonService_1.protoPackage.hallBase.Login.create({ appType: this.loginType });
            let buffer = CommonService_1.protoPackage.hallBase.Login.encode(req).finish();
            //发送进入大厅
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.LOGIN, buffer);
        }
        else { //token 验证失败
            PanelHelp_1.default.hideLoading();
            PanelHelp_1.default.showMsgBox("", LanguageImpl_1.i18n.ERRORCODE.E20010001);
            Manager_1.Manager.localStorage.cleanLoginCache(); //清理登录缓存
        }
    }
    /**
     * 进入大厅回调
     */
    onLoginReqCall(resData) {
        G.Logger.log('进入大厅回调', resData);
        if (resData.statusMsg.status == 0) {
            // if (resData.reConnect) {
            //     this.reConnectGame(resData.reConnect);
            // } else {
            //     dispatch(LogicEvent.ENTER_HALL);
            // }
            User_1.User.resetData();
            User_1.User.updateUserData(resData.user);
            User_1.User._needSetPassword = resData.setPassword;
            User_1.User._promoteUrl = resData.promoteUrl;
            User_1.User._shareImgUrl = resData.shareImgUrl;
            User_1.User._goldType = resData.newBee;
            ShareTraceHelpder_1.ShareTraceHelpder.checkNeedBindInviterId(true);
            PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOADING, true);
            dispatch(LogicEvent_1.LogicEvent.ENTER_HALL, resData);
        }
        else if (resData.statusMsg.status > 1000000) {
            PanelHelp_1.default.showMsgBox('', resData.statusMsg.msg);
        }
        else {
            PanelHelp_1.default.hideLoading();
            PanelHelp_1.default.showMsgBox("", Manager_1.Manager.makeLanguage("ERRORCODE." + resData.statusMsg.status));
        }
    }
    start() {
        this.reqLoginText();
        let loginCache = Manager_1.Manager.localStorage.getItem("loginCache");
        if (loginCache) {
            this.autoLogin(loginCache);
        }
    }
    onDestroy() {
        super.onDestroy();
        if (this.outTimeCall) {
            clearTimeout(this.outTimeCall);
        }
    }
    onClick(name, node) {
        G.Logger.log(name);
        switch (name) {
            case 'btn_guest':
                // dispatch(LogicEvent.ENTER_HALL);
                this.touLogin();
                break;
            case 'btn_facebook':
                //    PanelHelp.showTip('21314');
                //    PanelHelp.showMsgBox('21314','234535');
                // PanelHelp.showLoading('21314');
                // PanelHelp.showDialog('1231','`133');
                // window['platformUtil'].copyToClip('4545454');
                // this.reqFaceBookAccLogin({fbId:'154176843082171'
                //     ,fbName:'Jun Xiao'
                //     ,fbHeadImg:'https://scontent-lax3-2.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=2&_nc_sid=12b3be&_nc_ohc=OtdmIKfFFJsAX_uqgvi&_nc_ht=scontent-lax3-2.xx&tp=27&oh=362c25faa8ea33acbcca1ec72ca42232&oe=5FBC8BB8'
                // })touLogin
                window['platformUtil'].loginToFacebook(true);
                break;
            case 'btn_phone':
                dispatch("accountLoginIn", this);
                break;
            case 'language':
                Manager_1.Manager.uiManager.open({ type: LanguageChange_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
                break;
            case 'service':
                this.reqService();
                break;
            default:
                break;
        }
    }
    touLogin() {
        //游客已经登录过使用老账号登录
        let touristLoginCache = Manager_1.Manager.localStorage.getItem("touristLoginCache");
        if (touristLoginCache) {
            Manager_1.Manager.localStorage.setItem('loginCache', touristLoginCache);
            // this.autoLogin(touristLoginCache)
            let msg = { uuid: touristLoginCache.openId };
            this.loginType = LoginType.tourist;
            this.reqLogin(msg);
        }
        else {
            let msg = { uuid: null };
            msg.uuid = window['platformUtil'].getDeviceUUID();
            this.loginType = LoginType.tourist;
            this.reqLogin(msg);
        }
    }
    /**
     * facebook 登录
     */
    reqFaceBookAccLogin(data) {
        if (!data)
            return;
        G.Logger.log('facebook 登录 = ', data);
        this.loginType = LoginType.facebook;
        let msg = {};
        msg['uuid'] = data.fbId;
        msg['nickName'] = data.fbName;
        msg['headImgUrl'] = data.fbHeadImg;
        this.reqLogin(msg);
    }
    getReqURL(msg) {
        let url = '';
        let code = ShareTraceHelpder_1.ShareTraceHelpder.getInviterId();
        let agentId = ShareTraceHelpder_1.ShareTraceHelpder.getAgentId();
        let deviceId = window['platformUtil'].getDeviceUUID();
        let chanel = window['platformUtil'].getAppQuDaoId();
        url += G.URLMgr.loginURL + 'login?inviterId=' + code + "&agentId=" + agentId + "&";
        url += 'appType=' + this.loginType;
        if (this.loginType == LoginType.tourist) {
            url += '&openId=' + msg.uuid + '&signData=' + base64Encrypt(msg.uuid) + '&deviceId=' + deviceId + '&channel=' + chanel;
        }
        else if (this.loginType == LoginType.facebook) {
            url += '&openId=' + msg.uuid + '&signData=' + base64Encrypt(msg.uuid) + '&unionid=' + msg.uuid + '&nickName=' + encodeURIComponent(msg['nickName']) + '&headImgUrl=' + encodeURIComponent(msg['headImgUrl']) + '&deviceId=' + deviceId + '&channel=' + chanel;
        }
        else if (this.loginType == LoginType.phone || this.loginType == LoginType.password) {
            url += '&openId=' + msg.uuid + '&signData=' + base64Encrypt(msg.uuid) + '&deviceId=' + deviceId + '&channel=' + chanel + '&phone=' + msg.uuid + '&code=' + msg.code + '&password=' + base64Encrypt(msg.password || '') + '&area=' + encodeURIComponent(msg.areaCode);
        }
        G.Logger.log("url == ", url);
        return url;
    }
    /**
     * 发送登录消息
     * @param msg
     */
    reqLogin(msg) {
        if (!msg)
            return;
        let url = this.getReqURL(msg);
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.CONNECTSERVER);
        let packge = new HttpClient_1.RequestPackge;
        packge.data.url = url;
        packge.send((netData) => {
            G.Logger.log('Login = ', netData);
            // PanelHelp.hideLoading();
            if (netData.state == 0) {
                let result = netData.result;
                User_1.User._userID = result.userId;
                User_1.User._token = result.token;
                Config_1.Config.webServiceCfg = result.serverList[0];
                Config_1.Config.headImageURL = result.picDomain;
                LobbyService_1.LobbyService.instance.connect(Config_1.Config.webServiceCfg.ip, Config_1.Config.webServiceCfg.wsPort, Config_1.Config.webServiceCfg.protocol);
                // Config.uploadHeadURL = String.format(Config.uploadHeadURL, Config.webServiceCfg.ip);
                let loginCache = {
                    openId: msg.uuid,
                    userId: result.userId,
                    type: this.loginType,
                    token: result.token,
                    webServiceCfg: result.serverList[0],
                    picDomain: result.picDomain
                };
                Manager_1.Manager.localStorage.setItem('loginCache', loginCache);
                if (this.loginType == LoginType.tourist) {
                    Manager_1.Manager.localStorage.setItem('touristLoginCache', loginCache);
                }
            }
            else if (netData.state > 1000000) {
                PanelHelp_1.default.showMsgBox('', netData.msg);
            }
            else {
                PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[netData.state] || Manager_1.Manager.makeLanguage("ERRORCODE.11"));
            }
        }, (err) => {
            G.Logger.log('Login = ', err);
            // PanelHelp.hideLoading();
            // if (err.type == HttpErrorType.RequestError) {
            //     PanelHelp.showMsgBox('',i18n.ERRORCODE.SERVERERROR+err.type);
            // }else if (err.type == HttpErrorType.TimeOut) {
            //     PanelHelp.showMsgBox('',i18n.ERRORCODE.SERVERTIMEOUT);
            // } 
        });
    }
    /**
     * 自动登陆
     */
    autoLogin(loginCache) {
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.LOGIN);
        Config_1.Config.webServiceCfg = loginCache.webServiceCfg;
        Config_1.Config.headImageURL = loginCache.picDomain;
        this.loginType = loginCache.type;
        User_1.User._userID = loginCache.userId;
        User_1.User._token = loginCache.token;
        // Config.uploadHeadURL = String.format(Config.uploadHeadURL, Config.webServiceCfg.ip);
        LobbyService_1.LobbyService.instance.connect(Config_1.Config.webServiceCfg.ip, Config_1.Config.webServiceCfg.wsPort, Config_1.Config.webServiceCfg.protocol);
    }
    reqService() {
        let packge = new HttpClient_1.RequestPackge;
        packge.data.url = G.URLMgr.customerURL + "/" + window['platformUtil'].getAppQuDaoId();
        packge.send((netData) => {
            G.Logger.log("service data", netData);
            if (netData.statusMsg.status == 0) {
                if (netData.showType == 1) {
                    if (netData.customerHttpAddress) {
                        window['platformUtil'].openURL(netData.customerHttpAddress);
                    }
                }
                else {
                    Manager_1.Manager.uiManager.open({ type: ServiceView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [netData] });
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + netData.status));
            }
        }, (err) => {
            G.Logger.log('service err= ', err);
        });
    }
    reqLoginText() {
        let packge = new HttpClient_1.RequestPackge;
        packge.data.url = G.URLMgr.loginURL + "/loginText/config?channel=" + window['platformUtil'].getAppQuDaoId();
        packge.send((netData) => {
            G.Logger.log("reqLoginText data", netData);
            if (netData.state == 0) {
                if (netData.result.textContent) {
                    var textContent = this.formatContent(netData.result.textContent);
                }
                if (netData.result.agreeName && netData.result.agreeUrl) {
                    textContent += " <color=#0fffff><on click='agreeUrlHandler'>" + netData.result.agreeName + "</on></color> ";
                    this.node.getChildByName('loginText').getComponent(RichTextHandler_1.default).agreeUrl = netData.result.agreeUrl;
                }
                if (netData.result.termsName && netData.result.termsUrl) {
                    textContent += " <color=#0fffff><on click='termsUrlHandler'>" + netData.result.termsName + "</on></color> ";
                    this.node.getChildByName('loginText').getComponent(RichTextHandler_1.default).termsUrl = netData.result.termsUrl;
                }
                this.node.getChildByName('loginText').getComponent(cc.RichText).string = textContent;
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + netData.status));
            }
        }, (err) => {
            G.Logger.log('reqLoginText err= ', err);
        });
    }
    formatContent(content) {
        let newContent = content.replace(/\[/g, "<");
        newContent = newContent.replace(/\]/g, ">");
        return newContent;
    }
};
LoginView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], LoginView);
exports.default = LoginView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vTG9naW5WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUFpRDtBQUNqRCwyREFBMEY7QUFDMUYsa0VBQXVEO0FBRXZELHVEQUFvRDtBQUNwRCwrREFBc0Y7QUFDdEYsNkRBQTBEO0FBQzFELHVEQUE2RDtBQUU3RCxrRUFBMkU7QUFDM0UsMERBQXVEO0FBQ3ZELDREQUEyRTtBQUMzRSxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLG9FQUE0QztBQUM1QywrRUFBNEU7QUFDNUUsdUZBQStEO0FBQy9ELHlFQUFpRDtBQUNqRCx3RUFBZ0Q7QUFFaEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTVDLElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQiwyQ0FBUyxDQUFBO0lBQ1QsK0NBQVcsQ0FBQTtJQUNYLGlEQUFZLENBQUE7SUFDWixpREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVEOztHQUVHO0FBQ1EsUUFBQSxVQUFVLEdBQUc7SUFDcEIsMkJBQTJCO0lBQzNCLE9BQU8sRUFBRSxTQUFTO0lBRWxCLHNCQUFzQjtJQUN0QixRQUFRLEVBQUUsVUFBVTtJQUVwQix1QkFBdUI7SUFDdkIsS0FBSyxFQUFFLE9BQU87Q0FFakIsQ0FBQztBQUlGLElBQXFCLFNBQVMsR0FBOUIsTUFBcUIsU0FBVSxTQUFRLGdCQUFNO0lBQTdDOztRQUVJLGNBQVMsR0FBUSxJQUFJLENBQUM7UUFPdEIsWUFBTyxHQUFpQixJQUFJLENBQUM7SUF5U2pDLENBQUM7SUE1U1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyx5QkFBeUIsQ0FBQztJQUNyQyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLDBFQUEw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QUFDLFFBQVEsQ0FBQztHQUNoQixTQUFTLENBa1Q3QjtrQkFsVG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0hvdFVwZGF0ZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBkaXNwYXRjaEVudGVyQ29tcGxldGUsIExvZ2ljRXZlbnQsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBnYW1lTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb21tb25NZXNzYWdlLCBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgSHR0cEVycm9yVHlwZSwgUmVxdWVzdFBhY2tnZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBDbGllbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IFNoYXJlVHJhY2VIZWxwZGVyIH0gZnJvbSBcIi4uL0hlbHBkZXIvc2hhcmVUcmFjZS9TaGFyZVRyYWNlSGVscGRlclwiO1xuaW1wb3J0IExhbmd1YWdlQ2hhbmdlIGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VDaGFuZ2VcIjtcbmltcG9ydCBTZXJ2aWNlVmlldyBmcm9tIFwiLi4vc2VydmljZS9TZXJ2aWNlVmlld1wiO1xuaW1wb3J0IFJpY2hUZXh0SGFuZGxlciBmcm9tIFwiLi9SaWNoVGV4dEhhbmRsZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZXhwb3J0IGVudW0gTG9naW5UeXBlIHtcbiAgICBwaG9uZSA9IDEsXG4gICAgdG91cmlzdCA9IDIsXG4gICAgcGFzc3dvcmQgPSAzLFxuICAgIGZhY2Vib29rID0gNCxcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g55m75b2V5pa55byP6YC76L6R5LqL5Lu25a6a5LmJXG4gKi9cbmV4cG9ydCBsZXQgTG9naW5FdmVudCA9IHtcbiAgICAvKipAZGVzY3JpcHRpb24g6L+b6KGM5oyH5a6a5Zy65pmv5a6M5oiQICovXG4gICAgVE9VUklTVDogXCJUT1VSSVNUXCIsXG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L+b5YWl5aSn5Y6FKi9cbiAgICBGQUNFQk9PSzogXCJGQUNFQk9PS1wiLFxuXG4gICAgLyoqQGRlc2NyaXB0aW9uIOi/m+WFpea4uOaIjyAqL1xuICAgIFBIT05FOiBcIlBIT05FXCIsXG5cbn07XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIGxvZ2luVHlwZTogYW55ID0gbnVsbDtcbiAgICBvdXRUaW1lQ2FsbDogTm9kZUpTLlRpbWVvdXQ7XG4gICAgaXNBdXRvOiBib29sZWFuO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcImxvZ2luL3ByZWZhYnMvTG9naW5WaWV3XCI7XG4gICAgfVxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZSA9IG51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgLy8gdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoXCJjb21tb24vYXVkaW8vbG9naW5fYmdtXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgICAgICBkaXNwYXRjaEVudGVyQ29tcGxldGUoeyB0eXBlOiBMb2dpY1R5cGUuTE9HSU4sIHZpZXdzOiBbdGhpc10gfSk7XG4gICAgfVxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KExvZ2luRXZlbnQuRkFDRUJPT0ssIHRoaXMucmVxRmFjZUJvb2tBY2NMb2dpbik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChFdmVudEFwaS5OZXRFdmVudC5PTl9PUEVOLCB0aGlzLm9uR2F0ZVdheVJlcSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChcIndlYlNvY2tldElzT3BlblwiLCB0aGlzLm9uR2F0ZVdheVJlcSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuR2F0ZVdheSwgcHJvdG9QYWNrYWdlLmdhdGV3YXkuR2F0ZV9DbWRfSUQuSWRlbnRpdHlfQXV0aCksIHRoaXMub25HYXRlV2F5Q2FsbCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuTE9HSU4pLCB0aGlzLm9uTG9naW5SZXFDYWxsKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJzZXJ2ZXJPdXRUaW1lXCIsIHRoaXMuc2VydmVyT3V0VGltZSk7XG4gICAgfVxuICAgIHNlcnZlck91dFRpbWUoKSB7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveChcIlwiLCBpMThuLkVSUk9SQ09ERS5TRVJWRVJUSU1FT1VUKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog572R5YWz6Lqr5Lu96aqM6K+BXG4gICAgICovXG4gICAgb25HYXRlV2F5UmVxKCkge1xuICAgICAgICBpZiAoVXNlci5fdG9rZW4pIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuTE9HSU4pO1xuICAgICAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5nYXRld2F5LklkZW5pdHlBdXRoUmVxLmNyZWF0ZSh7IHRva2VuOiBVc2VyLl90b2tlbiB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuZ2F0ZXdheS5JZGVuaXR5QXV0aFJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuR2F0ZVdheSxcbiAgICAgICAgICAgICAgICBwcm90b1BhY2thZ2UuZ2F0ZXdheS5HYXRlX0NtZF9JRC5JZGVudGl0eV9BdXRoLFxuICAgICAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25HYXRlV2F5Q2FsbChyZXNEYXRhKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZygndG9rZW7pqozor4Hlm57osIMnLCByZXNEYXRhKTtcbiAgICAgICAgaWYgKHJlc0RhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGxCYXNlLkxvZ2luLmNyZWF0ZSh7IGFwcFR5cGU6IHRoaXMubG9naW5UeXBlIH0pO1xuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsQmFzZS5Mb2dpbi5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgICAgIC8v5Y+R6YCB6L+b5YWl5aSn5Y6FXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuTE9HSU4sXG4gICAgICAgICAgICAgICAgYnVmZmVyKTtcblxuICAgICAgICB9IGVsc2UgeyAvL3Rva2VuIOmqjOivgeWksei0pVxuICAgICAgICAgICAgUGFuZWxIZWxwLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveChcIlwiLCBpMThuLkVSUk9SQ09ERS5FMjAwMTAwMDEpO1xuICAgICAgICAgICAgTWFuYWdlci5sb2NhbFN0b3JhZ2UuY2xlYW5Mb2dpbkNhY2hlKCk7Ly/muIXnkIbnmbvlvZXnvJPlrZhcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDov5vlhaXlpKfljoXlm57osINcbiAgICAgKi9cbiAgICBvbkxvZ2luUmVxQ2FsbChyZXNEYXRhKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZygn6L+b5YWl5aSn5Y6F5Zue6LCDJywgcmVzRGF0YSk7XG4gICAgICAgIGlmIChyZXNEYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgKHJlc0RhdGEucmVDb25uZWN0KSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5yZUNvbm5lY3RHYW1lKHJlc0RhdGEucmVDb25uZWN0KTtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgZGlzcGF0Y2goTG9naWNFdmVudC5FTlRFUl9IQUxMKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIFVzZXIucmVzZXREYXRhKClcbiAgICAgICAgICAgIFVzZXIudXBkYXRlVXNlckRhdGEocmVzRGF0YS51c2VyKTtcbiAgICAgICAgICAgIFVzZXIuX25lZWRTZXRQYXNzd29yZCA9IHJlc0RhdGEuc2V0UGFzc3dvcmQ7XG4gICAgICAgICAgICBVc2VyLl9wcm9tb3RlVXJsID0gcmVzRGF0YS5wcm9tb3RlVXJsO1xuICAgICAgICAgICAgVXNlci5fc2hhcmVJbWdVcmwgPSByZXNEYXRhLnNoYXJlSW1nVXJsO1xuICAgICAgICAgICAgVXNlci5fZ29sZFR5cGUgPSByZXNEYXRhLm5ld0JlZTtcbiAgICAgICAgICAgIFNoYXJlVHJhY2VIZWxwZGVyLmNoZWNrTmVlZEJpbmRJbnZpdGVySWQodHJ1ZSk7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd0xvYWRpbmcoaTE4bi5XQUlULkxPQURJTkcsIHRydWUpXG4gICAgICAgICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0hBTEwsIHJlc0RhdGEpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVzRGF0YS5zdGF0dXNNc2cuc3RhdHVzID4gMTAwMDAwMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIHJlc0RhdGEuc3RhdHVzTXNnLm1zZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KFwiXCIsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgcmVzRGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5yZXFMb2dpblRleHQoKTtcblxuICAgICAgICBsZXQgbG9naW5DYWNoZSA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsb2dpbkNhY2hlXCIpO1xuICAgICAgICBpZiAobG9naW5DYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5hdXRvTG9naW4obG9naW5DYWNoZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5vdXRUaW1lQ2FsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMub3V0VGltZUNhbGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBHLkxvZ2dlci5sb2cobmFtZSk7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnYnRuX2d1ZXN0JzpcbiAgICAgICAgICAgICAgICAvLyBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0hBTEwpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91TG9naW4oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bl9mYWNlYm9vayc6XG4gICAgICAgICAgICAgICAgLy8gICAgUGFuZWxIZWxwLnNob3dUaXAoJzIxMzE0Jyk7XG4gICAgICAgICAgICAgICAgLy8gICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJzIxMzE0JywnMjM0NTM1Jyk7XG4gICAgICAgICAgICAgICAgLy8gUGFuZWxIZWxwLnNob3dMb2FkaW5nKCcyMTMxNCcpO1xuICAgICAgICAgICAgICAgIC8vIFBhbmVsSGVscC5zaG93RGlhbG9nKCcxMjMxJywnYDEzMycpO1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcCgnNDU0NTQ1NCcpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucmVxRmFjZUJvb2tBY2NMb2dpbih7ZmJJZDonMTU0MTc2ODQzMDgyMTcxJ1xuICAgICAgICAgICAgICAgIC8vICAgICAsZmJOYW1lOidKdW4gWGlhbydcbiAgICAgICAgICAgICAgICAvLyAgICAgLGZiSGVhZEltZzonaHR0cHM6Ly9zY29udGVudC1sYXgzLTIueHguZmJjZG4ubmV0L3YvdDEuMzA0OTctMS9jcDAvYzE1LjAuNTAuNTBhL3A1MHg1MC84NDYyODI3M18xNzYxNTk4MzAyNzc4NTZfOTcyNjkzMzYzOTIyODI5MzEyX24uanBnP19uY19jYXQ9MSZjY2I9MiZfbmNfc2lkPTEyYjNiZSZfbmNfb2hjPU90ZG1JS2ZGRkpzQVhfdXFndmkmX25jX2h0PXNjb250ZW50LWxheDMtMi54eCZ0cD0yNyZvaD0zNjJjMjVmYWE4ZWEzM2FjYmNjYTFlYzcyY2E0MjIzMiZvZT01RkJDOEJCOCdcbiAgICAgICAgICAgICAgICAvLyB9KXRvdUxvZ2luXG4gICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5sb2dpblRvRmFjZWJvb2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5fcGhvbmUnOlxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwiYWNjb3VudExvZ2luSW5cIiwgdGhpcylcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLnVpTWFuYWdlci5vcGVuKHsgdHlwZTogTGFuZ3VhZ2VDaGFuZ2UsIGJ1bmRsZTogQlVORExFX1JFU09VUkNFUyB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnc2VydmljZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXFTZXJ2aWNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG91TG9naW4oKSB7XG4gICAgICAgIC8v5ri45a6i5bey57uP55m75b2V6L+H5L2/55So6ICB6LSm5Y+355m75b2VXG4gICAgICAgIGxldCB0b3VyaXN0TG9naW5DYWNoZSA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b3VyaXN0TG9naW5DYWNoZVwiKTtcbiAgICAgICAgaWYgKHRvdXJpc3RMb2dpbkNhY2hlKSB7XG4gICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dpbkNhY2hlJywgdG91cmlzdExvZ2luQ2FjaGUpO1xuICAgICAgICAgICAgLy8gdGhpcy5hdXRvTG9naW4odG91cmlzdExvZ2luQ2FjaGUpXG4gICAgICAgICAgICBsZXQgbXNnID0geyB1dWlkOiB0b3VyaXN0TG9naW5DYWNoZS5vcGVuSWQgfVxuICAgICAgICAgICAgdGhpcy5sb2dpblR5cGUgPSBMb2dpblR5cGUudG91cmlzdDtcbiAgICAgICAgICAgIHRoaXMucmVxTG9naW4obXNnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBtc2cgPSB7IHV1aWQ6IG51bGwgfVxuICAgICAgICAgICAgbXNnLnV1aWQgPSB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmdldERldmljZVVVSUQoKTtcbiAgICAgICAgICAgIHRoaXMubG9naW5UeXBlID0gTG9naW5UeXBlLnRvdXJpc3Q7XG4gICAgICAgICAgICB0aGlzLnJlcUxvZ2luKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogZmFjZWJvb2sg55m75b2VXG4gICAgICovXG4gICAgcmVxRmFjZUJvb2tBY2NMb2dpbihkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YSkgcmV0dXJuXG4gICAgICAgIEcuTG9nZ2VyLmxvZygnZmFjZWJvb2sg55m75b2VID0gJywgZGF0YSk7XG4gICAgICAgIHRoaXMubG9naW5UeXBlID0gTG9naW5UeXBlLmZhY2Vib29rO1xuICAgICAgICBsZXQgbXNnID0ge307XG4gICAgICAgIG1zZ1sndXVpZCddID0gZGF0YS5mYklkO1xuICAgICAgICBtc2dbJ25pY2tOYW1lJ10gPSBkYXRhLmZiTmFtZTtcbiAgICAgICAgbXNnWydoZWFkSW1nVXJsJ10gPSBkYXRhLmZiSGVhZEltZztcbiAgICAgICAgdGhpcy5yZXFMb2dpbihtc2cpO1xuICAgIH1cblxuICAgIGdldFJlcVVSTChtc2cpIHtcbiAgICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgICBsZXQgY29kZSA9IFNoYXJlVHJhY2VIZWxwZGVyLmdldEludml0ZXJJZCgpO1xuICAgICAgICBsZXQgYWdlbnRJZCA9IFNoYXJlVHJhY2VIZWxwZGVyLmdldEFnZW50SWQoKTtcbiAgICAgICAgbGV0IGRldmljZUlkID0gd2luZG93WydwbGF0Zm9ybVV0aWwnXS5nZXREZXZpY2VVVUlEKCk7XG4gICAgICAgIGxldCBjaGFuZWwgPSB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmdldEFwcFF1RGFvSWQoKTtcbiAgICAgICAgdXJsICs9IEcuVVJMTWdyLmxvZ2luVVJMICsgJ2xvZ2luP2ludml0ZXJJZD0nICsgY29kZSArIFwiJmFnZW50SWQ9XCIgKyBhZ2VudElkICsgXCImXCI7XG4gICAgICAgIHVybCArPSAnYXBwVHlwZT0nICsgdGhpcy5sb2dpblR5cGU7XG4gICAgICAgIGlmICh0aGlzLmxvZ2luVHlwZSA9PSBMb2dpblR5cGUudG91cmlzdCkge1xuICAgICAgICAgICAgdXJsICs9ICcmb3BlbklkPScgKyBtc2cudXVpZCArICcmc2lnbkRhdGE9JyArIGJhc2U2NEVuY3J5cHQobXNnLnV1aWQpICsgJyZkZXZpY2VJZD0nICsgZGV2aWNlSWQgKyAnJmNoYW5uZWw9JyArIGNoYW5lbFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubG9naW5UeXBlID09IExvZ2luVHlwZS5mYWNlYm9vaykge1xuICAgICAgICAgICAgdXJsICs9ICcmb3BlbklkPScgKyBtc2cudXVpZCArICcmc2lnbkRhdGE9JyArIGJhc2U2NEVuY3J5cHQobXNnLnV1aWQpICsgJyZ1bmlvbmlkPScgKyBtc2cudXVpZCArICcmbmlja05hbWU9JyArIGVuY29kZVVSSUNvbXBvbmVudChtc2dbJ25pY2tOYW1lJ10pICsgJyZoZWFkSW1nVXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQobXNnWydoZWFkSW1nVXJsJ10pICsgJyZkZXZpY2VJZD0nICsgZGV2aWNlSWQgKyAnJmNoYW5uZWw9JyArIGNoYW5lbFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubG9naW5UeXBlID09IExvZ2luVHlwZS5waG9uZSB8fCB0aGlzLmxvZ2luVHlwZSA9PSBMb2dpblR5cGUucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIHVybCArPSAnJm9wZW5JZD0nICsgbXNnLnV1aWQgKyAnJnNpZ25EYXRhPScgKyBiYXNlNjRFbmNyeXB0KG1zZy51dWlkKSArICcmZGV2aWNlSWQ9JyArIGRldmljZUlkICsgJyZjaGFubmVsPScgKyBjaGFuZWwgKyAnJnBob25lPScgKyBtc2cudXVpZCArICcmY29kZT0nICsgbXNnLmNvZGUgKyAnJnBhc3N3b3JkPScgKyBiYXNlNjRFbmNyeXB0KG1zZy5wYXNzd29yZCB8fCAnJykgKyAnJmFyZWE9JyArIGVuY29kZVVSSUNvbXBvbmVudChtc2cuYXJlYUNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcInVybCA9PSBcIiwgdXJsKTtcbiAgICAgICAgcmV0dXJuIHVybFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPkemAgeeZu+W9lea2iOaBr1xuICAgICAqIEBwYXJhbSBtc2cgXG4gICAgICovXG4gICAgcmVxTG9naW4obXNnKSB7XG4gICAgICAgIGlmICghbXNnKSByZXR1cm5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0UmVxVVJMKG1zZyk7XG4gICAgICAgIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuQ09OTkVDVFNFUlZFUik7XG4gICAgICAgIGxldCBwYWNrZ2UgPSBuZXcgUmVxdWVzdFBhY2tnZTtcbiAgICAgICAgcGFja2dlLmRhdGEudXJsID0gdXJsO1xuICAgICAgICBwYWNrZ2Uuc2VuZCgobmV0RGF0YSkgPT4ge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKCdMb2dpbiA9ICcsIG5ldERhdGEpO1xuICAgICAgICAgICAgLy8gUGFuZWxIZWxwLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBpZiAobmV0RGF0YS5zdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldERhdGEucmVzdWx0O1xuICAgICAgICAgICAgICAgIFVzZXIuX3VzZXJJRCA9IHJlc3VsdC51c2VySWQ7XG4gICAgICAgICAgICAgICAgVXNlci5fdG9rZW4gPSByZXN1bHQudG9rZW47XG4gICAgICAgICAgICAgICAgQ29uZmlnLndlYlNlcnZpY2VDZmcgPSByZXN1bHQuc2VydmVyTGlzdFswXTtcbiAgICAgICAgICAgICAgICBDb25maWcuaGVhZEltYWdlVVJMID0gcmVzdWx0LnBpY0RvbWFpbjtcbiAgICAgICAgICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2UuY29ubmVjdChDb25maWcud2ViU2VydmljZUNmZy5pcCwgQ29uZmlnLndlYlNlcnZpY2VDZmcud3NQb3J0LCBDb25maWcud2ViU2VydmljZUNmZy5wcm90b2NvbCk7XG4gICAgICAgICAgICAgICAgLy8gQ29uZmlnLnVwbG9hZEhlYWRVUkwgPSBTdHJpbmcuZm9ybWF0KENvbmZpZy51cGxvYWRIZWFkVVJMLCBDb25maWcud2ViU2VydmljZUNmZy5pcCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbG9naW5DYWNoZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbklkOiBtc2cudXVpZCxcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiByZXN1bHQudXNlcklkLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLmxvZ2luVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHJlc3VsdC50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgd2ViU2VydmljZUNmZzogcmVzdWx0LnNlcnZlckxpc3RbMF0sXG4gICAgICAgICAgICAgICAgICAgIHBpY0RvbWFpbjogcmVzdWx0LnBpY0RvbWFpblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIE1hbmFnZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2luQ2FjaGUnLCBsb2dpbkNhY2hlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvZ2luVHlwZSA9PSBMb2dpblR5cGUudG91cmlzdCkge1xuICAgICAgICAgICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b3VyaXN0TG9naW5DYWNoZScsIGxvZ2luQ2FjaGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXREYXRhLnN0YXRlID4gMTAwMDAwMCkge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBuZXREYXRhLm1zZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBpMThuLkVSUk9SQ09ERVtuZXREYXRhLnN0YXRlXSB8fCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIkVSUk9SQ09ERS4xMVwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKCdMb2dpbiA9ICcsIGVycik7XG4gICAgICAgICAgICAvLyBQYW5lbEhlbHAuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIC8vIGlmIChlcnIudHlwZSA9PSBIdHRwRXJyb3JUeXBlLlJlcXVlc3RFcnJvcikge1xuICAgICAgICAgICAgLy8gICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLGkxOG4uRVJST1JDT0RFLlNFUlZFUkVSUk9SK2Vyci50eXBlKTtcbiAgICAgICAgICAgIC8vIH1lbHNlIGlmIChlcnIudHlwZSA9PSBIdHRwRXJyb3JUeXBlLlRpbWVPdXQpIHtcbiAgICAgICAgICAgIC8vICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJyxpMThuLkVSUk9SQ09ERS5TRVJWRVJUSU1FT1VUKTtcbiAgICAgICAgICAgIC8vIH0gXG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiHquWKqOeZu+mZhlxuICAgICAqL1xuICAgIGF1dG9Mb2dpbihsb2dpbkNhY2hlKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuTE9HSU4pO1xuICAgICAgICBDb25maWcud2ViU2VydmljZUNmZyA9IGxvZ2luQ2FjaGUud2ViU2VydmljZUNmZztcbiAgICAgICAgQ29uZmlnLmhlYWRJbWFnZVVSTCA9IGxvZ2luQ2FjaGUucGljRG9tYWluO1xuXG4gICAgICAgIHRoaXMubG9naW5UeXBlID0gbG9naW5DYWNoZS50eXBlO1xuICAgICAgICBVc2VyLl91c2VySUQgPSBsb2dpbkNhY2hlLnVzZXJJZDtcbiAgICAgICAgVXNlci5fdG9rZW4gPSBsb2dpbkNhY2hlLnRva2VuO1xuICAgICAgICAvLyBDb25maWcudXBsb2FkSGVhZFVSTCA9IFN0cmluZy5mb3JtYXQoQ29uZmlnLnVwbG9hZEhlYWRVUkwsIENvbmZpZy53ZWJTZXJ2aWNlQ2ZnLmlwKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLmNvbm5lY3QoQ29uZmlnLndlYlNlcnZpY2VDZmcuaXAsIENvbmZpZy53ZWJTZXJ2aWNlQ2ZnLndzUG9ydCwgQ29uZmlnLndlYlNlcnZpY2VDZmcucHJvdG9jb2wpO1xuICAgIH1cblxuICAgIHJlcVNlcnZpY2UoKSB7XG4gICAgICAgIGxldCBwYWNrZ2UgPSBuZXcgUmVxdWVzdFBhY2tnZTtcbiAgICAgICAgcGFja2dlLmRhdGEudXJsID0gRy5VUkxNZ3IuY3VzdG9tZXJVUkwgKyBcIi9cIiArIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uZ2V0QXBwUXVEYW9JZCgpO1xuICAgICAgICBwYWNrZ2Uuc2VuZCgobmV0RGF0YSkgPT4ge1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKFwic2VydmljZSBkYXRhXCIsIG5ldERhdGEpO1xuICAgICAgICAgICAgaWYgKG5ldERhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ldERhdGEuc2hvd1R5cGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV0RGF0YS5jdXN0b21lckh0dHBBZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLm9wZW5VUkwobmV0RGF0YS5jdXN0b21lckh0dHBBZGRyZXNzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIub3Blbih7IHR5cGU6IFNlcnZpY2VWaWV3LCBidW5kbGU6IEJVTkRMRV9SRVNPVVJDRVMsIGFyZ3M6IFtuZXREYXRhXSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KCcnLCBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIkVSUk9SQ09ERS5cIiArIG5ldERhdGEuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmxvZygnc2VydmljZSBlcnI9ICcsIGVycik7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgcmVxTG9naW5UZXh0KCkge1xuICAgICAgICBsZXQgcGFja2dlID0gbmV3IFJlcXVlc3RQYWNrZ2U7XG4gICAgICAgIHBhY2tnZS5kYXRhLnVybCA9IEcuVVJMTWdyLmxvZ2luVVJMICsgXCIvbG9naW5UZXh0L2NvbmZpZz9jaGFubmVsPVwiICsgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5nZXRBcHBRdURhb0lkKCk7XG4gICAgICAgIHBhY2tnZS5zZW5kKChuZXREYXRhKSA9PiB7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coXCJyZXFMb2dpblRleHQgZGF0YVwiLCBuZXREYXRhKTtcbiAgICAgICAgICAgIGlmIChuZXREYXRhLnN0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAobmV0RGF0YS5yZXN1bHQudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRDb250ZW50ID0gdGhpcy5mb3JtYXRDb250ZW50KG5ldERhdGEucmVzdWx0LnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ldERhdGEucmVzdWx0LmFncmVlTmFtZSAmJiBuZXREYXRhLnJlc3VsdC5hZ3JlZVVybCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudCArPSBcIiA8Y29sb3I9IzBmZmZmZj48b24gY2xpY2s9J2FncmVlVXJsSGFuZGxlcic+XCIgKyBuZXREYXRhLnJlc3VsdC5hZ3JlZU5hbWUgKyBcIjwvb24+PC9jb2xvcj4gXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9naW5UZXh0JykuZ2V0Q29tcG9uZW50KFJpY2hUZXh0SGFuZGxlcikuYWdyZWVVcmwgPSBuZXREYXRhLnJlc3VsdC5hZ3JlZVVybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ldERhdGEucmVzdWx0LnRlcm1zTmFtZSAmJiBuZXREYXRhLnJlc3VsdC50ZXJtc1VybCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29udGVudCArPSBcIiA8Y29sb3I9IzBmZmZmZj48b24gY2xpY2s9J3Rlcm1zVXJsSGFuZGxlcic+XCIgKyBuZXREYXRhLnJlc3VsdC50ZXJtc05hbWUgKyBcIjwvb24+PC9jb2xvcj4gXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbG9naW5UZXh0JykuZ2V0Q29tcG9uZW50KFJpY2hUZXh0SGFuZGxlcikudGVybXNVcmwgPSBuZXREYXRhLnJlc3VsdC50ZXJtc1VybDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsb2dpblRleHQnKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IHRleHRDb250ZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBuZXREYXRhLnN0YXR1cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coJ3JlcUxvZ2luVGV4dCBlcnI9ICcsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvcm1hdENvbnRlbnQoY29udGVudCkge1xuICAgICAgICBsZXQgbmV3Q29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXFxbL2csIFwiPFwiKVxuICAgICAgICBuZXdDb250ZW50ID0gbmV3Q29udGVudC5yZXBsYWNlKC9cXF0vZywgXCI+XCIpXG4gICAgICAgIHJldHVybiBuZXdDb250ZW50XG4gICAgfVxufVxuIl19