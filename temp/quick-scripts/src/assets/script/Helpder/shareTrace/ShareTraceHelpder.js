"use strict";
cc._RF.push(module, '20aecOtJP5L7b4URvvtIrdY', 'ShareTraceHelpder');
// script/Helpder/shareTrace/ShareTraceHelpder.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareTraceHelpder = void 0;
const Manager_1 = require("../../common/manager/Manager");
const CommonService_1 = require("../../common/net/CommonService");
const LobbyService_1 = require("../../common/net/LobbyService");
const Decorators_1 = require("../../framework/decorator/Decorators");
const User_1 = require("../../global/User");
let AppClassName_ShareTrace = "com/threeoctopus/shareTrace/ShareTraceHelpder";
class _ShareTraceHelpder {
    constructor() {
        this.inviterId = 0; //邀请码
        this.agentId = 0; //代理ID
        //最大 定时检测次数
        this.timerCheckCount = 0;
        //最大 定时检测次数
        this.maxCount = 3;
        this.isInit = false;
    }
    init() {
        Manager_1.Manager.eventDispatcher.addEventListener(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_BIND_AGENT), () => {
            User_1.User._inviterId = this.inviterId;
        }, this);
    }
    //获得邀请码由底层来回调这个方法--- 
    inviteCodeCallBack(dataStr) {
        G.Logger.log("获取邀请码信息成功：" + dataStr);
        this.handleData(dataStr);
    }
    failed(dataStr) {
        G.Logger.error("ShareTraceHelpder.获取邀请码失败：" + dataStr);
    }
    getData() {
        var dataInfo = "";
        if (cc.sys.os === cc.sys.OS_IOS) {
            dataInfo = jsb.reflection.callStaticMethod("ShareTraceHelpder", "getShareTraceAppDate", '');
        }
        else if (cc.sys.os === cc.sys.OS_ANDROID) {
            dataInfo = jsb.reflection.callStaticMethod(AppClassName_ShareTrace, "getShareTraceAppDate", "()Ljava/lang/String;");
        }
        // dataInfo = 'http://192.168.6.57:8081/preDownload?agentId=1'
        // dataInfo = "http://192.168.6.78/m/preDownload&&userId=3300"
        return dataInfo;
    }
    handleData(dataInfo) {
        G.Logger.warn('getInviterId' + dataInfo);
        if (dataInfo) {
            let inviterId = dataInfo.split("userId=")[1] || '';
            if (inviterId) {
                this.inviterId = Number(inviterId);
            }
            else {
                let agentId = dataInfo.split("agentId=")[1] || '';
                if (agentId) {
                    this.agentId = Number(agentId);
                }
            }
        }
    }
    //获取免填邀请码数据
    getInviterId() {
        if (cc.sys.isBrowser)
            return 0;
        if (this.inviterId != 0)
            return this.inviterId;
        var dataInfo = this.getData();
        this.handleData(dataInfo);
        G.Logger.log("邀请码：" + this.inviterId);
        return this.inviterId;
    }
    getAgentId() {
        if (cc.sys.isBrowser)
            return 0;
        if (this.agentId != 0)
            return this.agentId;
        var dataInfo = this.getData();
        this.handleData(dataInfo);
        G.Logger.log("代理id：" + this.agentId);
        return this.agentId;
    }
    //检测需要绑定 邀请码不
    checkNeedBindInviterId(islogin = false) {
        if (cc.sys.isBrowser)
            return;
        if (User_1.User._inviterId != 0)
            return G.Logger.log("已经绑定邀请码：" + User_1.User._inviterId);
        if (islogin)
            this.timerCheckCount = this.maxCount;
        if (this.isInit == false) {
            this.isInit = true;
            this.init();
        }
        G.Logger.warn('checkNeedBindInviterId');
        if (this.inviterId == 0) {
            this.getInviterId();
        }
        if (this.inviterId > 0) {
            this.bindInviterIdId();
        }
        else if (this.timerCheckCount > 0) {
            this.timerCheckCount -= 1;
            setTimeout(() => {
                this.checkNeedBindInviterId();
            }, 3000);
        }
    }
    //绑定邀请码
    bindInviterIdId() {
        if (this.inviterId == 0)
            return;
        let req = CommonService_1.protoPackage.hall.base.BindAgentReq.create({ inviterId: this.inviterId });
        let buffer = CommonService_1.protoPackage.hall.base.BindAgentReq.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_BIND_AGENT, buffer);
    }
}
exports.ShareTraceHelpder = new _ShareTraceHelpder();

cc._RF.pop();