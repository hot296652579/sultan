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
export default class LoginView extends UIView implements IController<LobbyService> {

    loginType: any = null;
    outTimeCall: NodeJS.Timeout;
    isAuto: boolean;

    public static getPrefabUrl() {
        return "login/prefabs/LoginView";
    }
    service: LobbyService = null;
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
        dispatchEnterComplete({ type: LogicType.LOGIN, views: [this] });
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LoginEvent.FACEBOOK, this.reqFaceBookAccLogin);
        this.registerEvent(EventApi.NetEvent.ON_OPEN, this.onGateWayReq);
        this.registerEvent("webSocketIsOpen", this.onGateWayReq);
        this.registerEvent(makeKey(serverType.GateWay, protoPackage.gateway.Gate_Cmd_ID.Identity_Auth), this.onGateWayCall);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.LOGIN), this.onLoginReqCall);

        this.registerEvent("serverOutTime", this.serverOutTime);
    }
    serverOutTime() {
        LobbyService.instance.close();
        PanelHelp.showMsgBox("", i18n.ERRORCODE.SERVERTIMEOUT);
    }
    /**
     * 网关身份验证
     */
    onGateWayReq() {
        if (User._token) {
            PanelHelp.showLoading(i18n.WAIT.LOGIN);
            let req = protoPackage.gateway.IdenityAuthReq.create({ token: User._token });
            let buffer = protoPackage.gateway.IdenityAuthReq.encode(req).finish();
            this.service.sendMsg(serverType.GateWay,
                protoPackage.gateway.Gate_Cmd_ID.Identity_Auth,
                buffer);
        }
    }
    onGateWayCall(resData) {
        G.Logger.log('token验证回调', resData);
        if (resData.statusMsg.status == 0) {
            let req = protoPackage.hallBase.Login.create({ appType: this.loginType });
            let buffer = protoPackage.hallBase.Login.encode(req).finish();
            //发送进入大厅
            this.service.sendMsg(serverType.Lobby,
                protoPackage.hall.HallCmd.LOGIN,
                buffer);

        } else { //token 验证失败
            PanelHelp.hideLoading();
            PanelHelp.showMsgBox("", i18n.ERRORCODE.E20010001);
            Manager.localStorage.cleanLoginCache();//清理登录缓存
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
            User.resetData()
            User.updateUserData(resData.user);
            User._needSetPassword = resData.setPassword;
            User._promoteUrl = resData.promoteUrl;
            User._shareImgUrl = resData.shareImgUrl;
            User._goldType = resData.newBee;
            ShareTraceHelpder.checkNeedBindInviterId(true);
            PanelHelp.showLoading(i18n.WAIT.LOADING, true)
            dispatch(LogicEvent.ENTER_HALL, resData);

        } else if (resData.statusMsg.status > 1000000) {
            PanelHelp.showMsgBox('', resData.statusMsg.msg);
        } else {
            PanelHelp.hideLoading();
            PanelHelp.showMsgBox("", Manager.makeLanguage("ERRORCODE." + resData.statusMsg.status));
        }
    }

    start() {
        this.reqLoginText();

        let loginCache = Manager.localStorage.getItem("loginCache");
        if (loginCache) {
            this.autoLogin(loginCache)
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
                dispatch("accountLoginIn", this)
                break;
            case 'language':
                Manager.uiManager.open({ type: LanguageChange, bundle: BUNDLE_RESOURCES });
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
        let touristLoginCache = Manager.localStorage.getItem("touristLoginCache");
        if (touristLoginCache) {
            Manager.localStorage.setItem('loginCache', touristLoginCache);
            // this.autoLogin(touristLoginCache)
            let msg = { uuid: touristLoginCache.openId }
            this.loginType = LoginType.tourist;
            this.reqLogin(msg);
        } else {
            let msg = { uuid: null }
            msg.uuid = window['platformUtil'].getDeviceUUID();
            this.loginType = LoginType.tourist;
            this.reqLogin(msg);
        }
    }
    /**
     * facebook 登录
     */
    reqFaceBookAccLogin(data) {
        if (!data) return
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
        let code = ShareTraceHelpder.getInviterId();
        let agentId = ShareTraceHelpder.getAgentId();
        let deviceId = window['platformUtil'].getDeviceUUID();
        let chanel = window['platformUtil'].getAppQuDaoId();
        url += G.URLMgr.loginURL + 'login?inviterId=' + code + "&agentId=" + agentId + "&";
        url += 'appType=' + this.loginType;
        if (this.loginType == LoginType.tourist) {
            url += '&openId=' + msg.uuid + '&signData=' + base64Encrypt(msg.uuid) + '&deviceId=' + deviceId + '&channel=' + chanel
        } else if (this.loginType == LoginType.facebook) {
            url += '&openId=' + msg.uuid + '&signData=' + base64Encrypt(msg.uuid) + '&unionid=' + msg.uuid + '&nickName=' + encodeURIComponent(msg['nickName']) + '&headImgUrl=' + encodeURIComponent(msg['headImgUrl']) + '&deviceId=' + deviceId + '&channel=' + chanel
        } else if (this.loginType == LoginType.phone || this.loginType == LoginType.password) {
            url += '&openId=' + msg.uuid + '&signData=' + base64Encrypt(msg.uuid) + '&deviceId=' + deviceId + '&channel=' + chanel + '&phone=' + msg.uuid + '&code=' + msg.code + '&password=' + base64Encrypt(msg.password || '') + '&area=' + encodeURIComponent(msg.areaCode);
        }
        G.Logger.log("url == ", url);
        return url
    }

    /**
     * 发送登录消息
     * @param msg 
     */
    reqLogin(msg) {
        if (!msg) return
        let url = this.getReqURL(msg);
        PanelHelp.showLoading(i18n.WAIT.CONNECTSERVER);
        let packge = new RequestPackge;
        packge.data.url = url;
        packge.send((netData) => {
            G.Logger.log('Login = ', netData);
            // PanelHelp.hideLoading();
            if (netData.state == 0) {
                let result = netData.result;
                User._userID = result.userId;
                User._token = result.token;
                Config.webServiceCfg = result.serverList[0];
                Config.headImageURL = result.picDomain;
                LobbyService.instance.connect(Config.webServiceCfg.ip, Config.webServiceCfg.wsPort, Config.webServiceCfg.protocol);
                // Config.uploadHeadURL = String.format(Config.uploadHeadURL, Config.webServiceCfg.ip);

                let loginCache = {
                    openId: msg.uuid,
                    userId: result.userId,
                    type: this.loginType,
                    token: result.token,
                    webServiceCfg: result.serverList[0],
                    picDomain: result.picDomain
                }

                Manager.localStorage.setItem('loginCache', loginCache);

                if (this.loginType == LoginType.tourist) {
                    Manager.localStorage.setItem('touristLoginCache', loginCache);
                }

            } else if (netData.state > 1000000) {
                PanelHelp.showMsgBox('', netData.msg);
            } else {
                PanelHelp.showMsgBox('', i18n.ERRORCODE[netData.state] || Manager.makeLanguage("ERRORCODE.11"));
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
        PanelHelp.showLoading(i18n.WAIT.LOGIN);
        Config.webServiceCfg = loginCache.webServiceCfg;
        Config.headImageURL = loginCache.picDomain;

        this.loginType = loginCache.type;
        User._userID = loginCache.userId;
        User._token = loginCache.token;
        // Config.uploadHeadURL = String.format(Config.uploadHeadURL, Config.webServiceCfg.ip);
        LobbyService.instance.connect(Config.webServiceCfg.ip, Config.webServiceCfg.wsPort, Config.webServiceCfg.protocol);
    }

    reqService() {
        let packge = new RequestPackge;
        packge.data.url = G.URLMgr.customerURL + "/" + window['platformUtil'].getAppQuDaoId();
        packge.send((netData) => {
            G.Logger.log("service data", netData);
            if (netData.statusMsg.status == 0) {
                if (netData.showType == 1) {
                    if (netData.customerHttpAddress) {
                        window['platformUtil'].openURL(netData.customerHttpAddress)
                    }
                } else {
                    Manager.uiManager.open({ type: ServiceView, bundle: BUNDLE_RESOURCES, args: [netData] });
                }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + netData.status));
            }
        }, (err) => {
            G.Logger.log('service err= ', err);
        });

    }

    reqLoginText() {
        let packge = new RequestPackge;
        packge.data.url = G.URLMgr.loginURL + "/loginText/config?channel=" + window['platformUtil'].getAppQuDaoId();
        packge.send((netData) => {
            G.Logger.log("reqLoginText data", netData);
            if (netData.state == 0) {
                if (netData.result.textContent) {
                    var textContent = this.formatContent(netData.result.textContent);
                }
                if (netData.result.agreeName && netData.result.agreeUrl) {
                    textContent += " <color=#0fffff><on click='agreeUrlHandler'>" + netData.result.agreeName + "</on></color> ";
                    this.node.getChildByName('loginText').getComponent(RichTextHandler).agreeUrl = netData.result.agreeUrl;
                }
                if (netData.result.termsName && netData.result.termsUrl) {
                    textContent += " <color=#0fffff><on click='termsUrlHandler'>" + netData.result.termsName + "</on></color> ";
                    this.node.getChildByName('loginText').getComponent(RichTextHandler).termsUrl = netData.result.termsUrl;
                }
                this.node.getChildByName('loginText').getComponent(cc.RichText).string = textContent;
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + netData.status));
            }
        }, (err) => {
            G.Logger.log('reqLoginText err= ', err);
        });
    }

    formatContent(content) {
        let newContent = content.replace(/\[/g, "<")
        newContent = newContent.replace(/\]/g, ">")
        return newContent
    }
}
