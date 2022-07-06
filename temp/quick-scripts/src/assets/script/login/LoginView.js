"use strict";
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