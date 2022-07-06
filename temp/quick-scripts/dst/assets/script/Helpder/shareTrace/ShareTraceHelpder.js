
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/Helpder/shareTrace/ShareTraceHelpder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvSGVscGRlci9zaGFyZVRyYWNlL1NoYXJlVHJhY2VIZWxwZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUF1RDtBQUN2RCxrRUFBMEU7QUFDMUUsZ0VBQTZEO0FBQzdELHFFQUErRDtBQUMvRCw0Q0FBeUM7QUFFekMsSUFBSSx1QkFBdUIsR0FBRywrQ0FBK0MsQ0FBQTtBQUU3RSxNQUFNLGtCQUFrQjtJQUF4QjtRQUNJLGNBQVMsR0FBRyxDQUFDLENBQUEsQ0FBQyxLQUFLO1FBQ25CLFlBQU8sR0FBRyxDQUFDLENBQUEsQ0FBQSxNQUFNO1FBQ2pCLFdBQVc7UUFDWCxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixXQUFXO1FBQ1gsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUViLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFnR25CLENBQUM7SUEvRkcsSUFBSTtRQUNBLGlCQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLG9CQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQUUsNEJBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRTtZQUMvRyxXQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDcEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixrQkFBa0IsQ0FBQyxPQUFPO1FBQ3RCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQTtRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTztRQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxDQUFBO0lBQzFELENBQUM7SUFDRCxPQUFP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QixDQUFDO0NBRUo7QUFHVSxRQUFBLGlCQUFpQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBtYWtlS2V5IH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9nbG9iYWwvVXNlclwiO1xuXG5sZXQgQXBwQ2xhc3NOYW1lX1NoYXJlVHJhY2UgPSBcImNvbS90aHJlZW9jdG9wdXMvc2hhcmVUcmFjZS9TaGFyZVRyYWNlSGVscGRlclwiXG5cbmNsYXNzIF9TaGFyZVRyYWNlSGVscGRlciB7XG4gICAgaW52aXRlcklkID0gMCAvL+mCgOivt+eggVxuICAgIGFnZW50SWQgPSAwLy/ku6PnkIZJRFxuICAgIC8v5pyA5aSnIOWumuaXtuajgOa1i+asoeaVsFxuICAgIHRpbWVyQ2hlY2tDb3VudCA9IDA7XG4gICAgLy/mnIDlpKcg5a6a5pe25qOA5rWL5qyh5pWwXG4gICAgbWF4Q291bnQgPSAzO1xuXG4gICAgaXNJbml0ID0gZmFsc2U7XG4gICAgaW5pdCgpIHtcbiAgICAgICAgTWFuYWdlci5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0JJTkRfQUdFTlQpLCAoKSA9PiB7XG4gICAgICAgICAgICBVc2VyLl9pbnZpdGVySWQgPSB0aGlzLmludml0ZXJJZFxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvL+iOt+W+l+mCgOivt+eggeeUseW6leWxguadpeWbnuiwg+i/meS4quaWueazlS0tLSBcbiAgICBpbnZpdGVDb2RlQ2FsbEJhY2soZGF0YVN0cikge1xuICAgICAgICBHLkxvZ2dlci5sb2coXCLojrflj5bpgoDor7fnoIHkv6Hmga/miJDlip/vvJpcIiArIGRhdGFTdHIpXG4gICAgICAgIHRoaXMuaGFuZGxlRGF0YShkYXRhU3RyKTtcbiAgICB9XG4gICAgZmFpbGVkKGRhdGFTdHIpIHtcbiAgICAgICAgRy5Mb2dnZXIuZXJyb3IoXCJTaGFyZVRyYWNlSGVscGRlci7ojrflj5bpgoDor7fnoIHlpLHotKXvvJpcIiArIGRhdGFTdHIpXG4gICAgfVxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHZhciBkYXRhSW5mbyA9IFwiXCJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xuICAgICAgICAgICAgZGF0YUluZm8gPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiU2hhcmVUcmFjZUhlbHBkZXJcIiwgXCJnZXRTaGFyZVRyYWNlQXBwRGF0ZVwiLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xuICAgICAgICAgICAgZGF0YUluZm8gPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKEFwcENsYXNzTmFtZV9TaGFyZVRyYWNlLCBcImdldFNoYXJlVHJhY2VBcHBEYXRlXCIsIFwiKClMamF2YS9sYW5nL1N0cmluZztcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGF0YUluZm8gPSAnaHR0cDovLzE5Mi4xNjguNi41Nzo4MDgxL3ByZURvd25sb2FkP2FnZW50SWQ9MSdcbiAgICAgICAgLy8gZGF0YUluZm8gPSBcImh0dHA6Ly8xOTIuMTY4LjYuNzgvbS9wcmVEb3dubG9hZCYmdXNlcklkPTMzMDBcIlxuICAgICAgICByZXR1cm4gZGF0YUluZm9cblxuICAgIH1cbiAgICBoYW5kbGVEYXRhKGRhdGFJbmZvKSB7XG4gICAgICAgIEcuTG9nZ2VyLndhcm4oJ2dldEludml0ZXJJZCcgKyBkYXRhSW5mbylcbiAgICAgICAgaWYgKGRhdGFJbmZvKSB7XG4gICAgICAgICAgICBsZXQgaW52aXRlcklkID0gZGF0YUluZm8uc3BsaXQoXCJ1c2VySWQ9XCIpWzFdIHx8ICcnXG4gICAgICAgICAgICBpZiAoaW52aXRlcklkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZpdGVySWQgPSBOdW1iZXIoaW52aXRlcklkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgYWdlbnRJZCA9IGRhdGFJbmZvLnNwbGl0KFwiYWdlbnRJZD1cIilbMV0gfHwgJydcbiAgICAgICAgICAgICAgICBpZiAoYWdlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFnZW50SWQgPSBOdW1iZXIoYWdlbnRJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/ojrflj5blhY3loavpgoDor7fnoIHmlbDmja5cbiAgICBnZXRJbnZpdGVySWQoKSB7XG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSByZXR1cm4gMDtcbiAgICAgICAgaWYgKHRoaXMuaW52aXRlcklkICE9IDApIHJldHVybiB0aGlzLmludml0ZXJJZFxuICAgICAgICB2YXIgZGF0YUluZm8gPSB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEYXRhKGRhdGFJbmZvKVxuICAgICAgICBHLkxvZ2dlci5sb2coXCLpgoDor7fnoIHvvJpcIiArIHRoaXMuaW52aXRlcklkKVxuICAgICAgICByZXR1cm4gdGhpcy5pbnZpdGVySWRcbiAgICB9XG4gICAgZ2V0QWdlbnRJZCgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHJldHVybiAwO1xuICAgICAgICBpZiAodGhpcy5hZ2VudElkICE9IDApIHJldHVybiB0aGlzLmFnZW50SWRcbiAgICAgICAgdmFyIGRhdGFJbmZvID0gdGhpcy5nZXREYXRhKCk7XG4gICAgICAgIHRoaXMuaGFuZGxlRGF0YShkYXRhSW5mbylcbiAgICAgICAgRy5Mb2dnZXIubG9nKFwi5Luj55CGaWTvvJpcIiArIHRoaXMuYWdlbnRJZClcbiAgICAgICAgcmV0dXJuIHRoaXMuYWdlbnRJZFxuICAgIH1cbiAgICAvL+ajgOa1i+mcgOimgee7keWumiDpgoDor7fnoIHkuI1cbiAgICBjaGVja05lZWRCaW5kSW52aXRlcklkKGlzbG9naW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3NlcikgcmV0dXJuXG5cbiAgICAgICAgaWYgKFVzZXIuX2ludml0ZXJJZCAhPSAwKSByZXR1cm4gRy5Mb2dnZXIubG9nKFwi5bey57uP57uR5a6a6YKA6K+356CB77yaXCIgKyBVc2VyLl9pbnZpdGVySWQpXG4gICAgICAgIGlmIChpc2xvZ2luKSB0aGlzLnRpbWVyQ2hlY2tDb3VudCA9IHRoaXMubWF4Q291bnQ7XG4gICAgICAgIGlmICh0aGlzLmlzSW5pdCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBHLkxvZ2dlci53YXJuKCdjaGVja05lZWRCaW5kSW52aXRlcklkJylcblxuICAgICAgICBpZiAodGhpcy5pbnZpdGVySWQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5nZXRJbnZpdGVySWQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnZpdGVySWQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRJbnZpdGVySWRJZCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZXJDaGVja0NvdW50ID4gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lckNoZWNrQ291bnQgLT0gMVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja05lZWRCaW5kSW52aXRlcklkKCk7XG4gICAgICAgICAgICB9LCAzMDAwKTtcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy/nu5HlrprpgoDor7fnoIFcbiAgICBiaW5kSW52aXRlcklkSWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmludml0ZXJJZCA9PSAwKSByZXR1cm47XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5iYXNlLkJpbmRBZ2VudFJlcS5jcmVhdGUoeyBpbnZpdGVySWQ6IHRoaXMuaW52aXRlcklkIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5CaW5kQWdlbnRSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIExvYmJ5U2VydmljZS5pbnN0YW5jZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9CSU5EX0FHRU5ULFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbn1cblxuXG5leHBvcnQgbGV0IFNoYXJlVHJhY2VIZWxwZGVyID0gbmV3IF9TaGFyZVRyYWNlSGVscGRlcigpXG4iXX0=