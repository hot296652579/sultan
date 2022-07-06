
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/net/CommonService.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cdac79M5PhBeIG696a7Pj9/', 'CommonService');
// script/common/net/CommonService.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = exports.CommonMessage = exports.protoPackage = exports.serverType = void 0;
const Service_1 = require("../../framework/base/Service");
const JsonMessage_1 = require("../../framework/net/JsonMessage");
const Config_1 = require("../config/Config");
const PanelHelp_1 = __importDefault(require("../../msgbox/PanelHelp"));
const LanguageImpl_1 = require("../language/LanguageImpl");
const Manager_1 = require("../manager/Manager");
const protoc_1 = require("../../framework/external/protoc");
/**@description  网络 mainCmd  配置  */
exports.serverType = {
    GateWay: 1001,
    Lobby: 2001,
    Crash: 3016,
};
/**@description 读取 proto 配置  */
exports.protoPackage = {
    // /**@description 网关身份验证*/
    // gateway: MST.bt.game.proto.game.gateway,
    // /**@description  大厅*/
    // hall: MST.bt.game.proto.hall,
    // /**@description  大厅 base */
    // hallBase: MST.bt.game.proto.hall.base,
    // /**@description  大厅 base */
    // gameBase: MST.bt.game.proto.game.base,
    hall: protoc_1.MST,
    /**@decription  爆点*/
    crash: protoc_1.MST,
};
class CommonMessage extends JsonMessage_1.JsonMessage {
}
exports.CommonMessage = CommonMessage;
/**
 * @description service公共基类
 */
class CommonService extends Service_1.Service {
    static get instance() { return this._instance || (this._instance = new CommonService()); }
    /**@description 公共的消息解析类型，必须包含对消息码的解析与打包 */
    get commonMessageType() {
        return CommonMessage;
    }
    /**
     * @description 发送心跳
     */
    sendHeartbeat() {
        let req = protoc_1.MST.C2G_Ping_Req.create({ RpcId: Manager_1.Manager.netManager.getNewSeqId() });
        let buffer = protoc_1.MST.C2G_Ping_Req.encode(req).finish();
        this.sendMsg(protoc_1.MST.C2G_Ping_Req, protoc_1.MST.OuterOpcode_Gate.C2G_Ping_Req, buffer);
    }
    /**
     * @description 获取最大心跳超时的次数
     */
    getMaxHeartbeatTimeOut() {
        return super.getMaxHeartbeatTimeOut();
    }
    getHeartbeatInterval() {
        return super.getHeartbeatInterval();
    }
    /**
     * @description 心跳超时
     */
    onHeartbeatTimeOut() {
        super.onHeartbeatTimeOut();
        cc.warn(`心跳超时，您已经断开网络`);
        PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.WAIT.NETERROR, () => {
            Manager_1.Manager.uiManager.closeExcept(null);
            cc.audioEngine.stopAll();
            super.close();
            super.reset();
            cc.game.restart();
            cc.sys.garbageCollect();
        });
    }
    /**
     * @description 是否为心跳消息
     */
    isHeartBeat(data) {
        //示例
        return data.mainCmd == protoc_1.MST.OuterOpcode_Gate.G2C_Ping_Res || data.mainCmd == protoc_1.MST.OuterOpcode_Gate.C2G_Ping_Req;
    }
    onEnterBackground() {
    }
    onEnterForgeground(inBackgroundTime) {
        // if (inBackgroundTime > 30) {
        //     this.disconnect()
        // }
    }
    /**
     * 发送信息
     * @param mainCmd
     * @param data
     * @param serverId
     */
    sendMsg(proto, mainCmd, databuffer, serverId) {
        let msg = new CommonMessage();
        msg.mainCmd = mainCmd;
        msg.databuffer = databuffer;
        if (serverId) {
            msg.serverId = serverId;
        }
        if (this.isHeartBeat(msg)) {
            // console.log(`发送网络消息 main cmd : ${mainCmd}`);
        }
        else {
            G.Logger.color(`发送消息：`, `${mainCmd}`);
            G.Logger.log(proto.decode(databuffer));
        }
        // this.addListener(mainCmd,null,call,false,target);
        this.send(msg);
    }
    /**
     * 重连
     */
    disconnect() {
        G.Logger.log('重连', Config_1.Config.webServiceCfg);
        if (Config_1.Config.webServiceCfg) {
            this.connect(Config_1.Config.webServiceCfg.ip, Config_1.Config.webServiceCfg.wsPort, Config_1.Config.webServiceCfg.protocol);
        }
    }
    onlyServerSendMsg(msg) {
        super.onlyServerSendMsg(msg);
        return false;
        // if (msg.mainCmd == 0) {//系统主动下发心跳
        //     let msg = new CommonMessage();
        //     msg.mainCmd = 0;
        //     this.send(msg);
        //     return true;
        // } else if (msg.mainCmd == serverType.Lobby) {//大厅
        //     if (msg.subCmd == protoPackage.hall.HallCmd.HORSE_LANTERN) {//跑马灯 message HorseLantern
        //         dispatch("rollNotice", msg.data);
        //         return true;
        //     }
        //     if (msg.subCmd == protoPackage.hall.HallCmd.USER_WEALTH) {//更新玩家的金币 积分 砖石 message UserWealth
        //         User._gold = msg.data.gold;
        //         User._diamonds = msg.data.diamonds;
        //         User._points = msg.data.points;
        //         dispatch("updateUserInfo", msg.data);
        //         return true;
        //     }
        // }
    }
}
exports.CommonService = CommonService;
CommonService._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL25ldC9Db21tb25TZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDBEQUF1RDtBQUd2RCxpRUFBOEQ7QUFFOUQsNkNBQTBDO0FBQzFDLHVFQUErQztBQUMvQywyREFBZ0Q7QUFFaEQsZ0RBQTZDO0FBQzdDLDREQUFzRDtBQUV0RCxtQ0FBbUM7QUFDeEIsUUFBQSxVQUFVLEdBQUc7SUFDcEIsT0FBTyxFQUFFLElBQUk7SUFDYixLQUFLLEVBQUUsSUFBSTtJQUNYLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQTtBQUVELCtCQUErQjtBQUNwQixRQUFBLFlBQVksR0FBRztJQUV0QiwyQkFBMkI7SUFDM0IsMkNBQTJDO0lBRTNDLHdCQUF3QjtJQUN4QixnQ0FBZ0M7SUFFaEMsOEJBQThCO0lBQzlCLHlDQUF5QztJQUV6Qyw4QkFBOEI7SUFDOUIseUNBQXlDO0lBRXpDLElBQUksRUFBRSxZQUFHO0lBRVQsb0JBQW9CO0lBQ3BCLEtBQUssRUFBRSxZQUFHO0NBRWIsQ0FBQTtBQUVELE1BQWEsYUFBYyxTQUFRLHlCQUFXO0NBQzdDO0FBREQsc0NBQ0M7QUFFRDs7R0FFRztBQUVILE1BQWEsYUFBYyxTQUFRLGlCQUFPO0lBRy9CLE1BQU0sS0FBSyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpHLDJDQUEyQztJQUMzQyxJQUFjLGlCQUFpQjtRQUMzQixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDTyxhQUFhO1FBQ25CLElBQUksR0FBRyxHQUFHLFlBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLGlCQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRSxJQUFJLE1BQU0sR0FBRyxZQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQ0Q7O09BRUc7SUFDTyxzQkFBc0I7UUFDNUIsT0FBTyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRVMsb0JBQW9CO1FBQzFCLE9BQU8sS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ08sa0JBQWtCO1FBQ3hCLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEIsbUJBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLG1CQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDOUMsaUJBQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNEOztPQUVHO0lBQ08sV0FBVyxDQUFDLElBQWE7UUFDL0IsSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxZQUFHLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksWUFBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUNsSCxDQUFDO0lBRUQsaUJBQWlCO0lBRWpCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxnQkFBd0I7UUFDdkMsK0JBQStCO1FBQy9CLHdCQUF3QjtRQUN4QixJQUFJO0lBQ1IsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVyxFQUFFLFFBQVM7UUFDMUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN0QixHQUFHLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLFFBQVEsRUFBRTtZQUNWLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLCtDQUErQztTQUNsRDthQUFNO1lBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFFRCxvREFBb0Q7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUVsQixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxVQUFVO1FBQ04sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6QyxJQUFJLGVBQU0sQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxlQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxlQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JHO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQUc7UUFDakIsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sS0FBSyxDQUFDO1FBQ2Isb0NBQW9DO1FBQ3BDLHFDQUFxQztRQUNyQyx1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQixvREFBb0Q7UUFFcEQsNkZBQTZGO1FBQzdGLDRDQUE0QztRQUM1Qyx1QkFBdUI7UUFDdkIsUUFBUTtRQUNSLG1HQUFtRztRQUNuRyxzQ0FBc0M7UUFDdEMsOENBQThDO1FBQzlDLDBDQUEwQztRQUMxQyxnREFBZ0Q7UUFDaEQsdUJBQXVCO1FBQ3ZCLFFBQVE7UUFFUixJQUFJO0lBRVIsQ0FBQzs7QUF6SEwsc0NBMEhDO0FBeEhvQix1QkFBUyxHQUFrQixJQUFJLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvYmFzZS9TZXJ2aWNlXCI7XG5pbXBvcnQgeyBHYW1lRXZlbnRJbnRlcmZhY2UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2Jhc2UvR2FtZUV2ZW50SW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9uZXQvTWVzc2FnZVwiO1xuaW1wb3J0IHsgSnNvbk1lc3NhZ2UgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL25ldC9Kc29uTWVzc2FnZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4vTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29uZmlnL0NvbmZpZ1wiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBNU1QgfSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuXG4vKipAZGVzY3JpcHRpb24gIOe9kee7nCBtYWluQ21kICDphY3nva4gICovXG5leHBvcnQgbGV0IHNlcnZlclR5cGUgPSB7XG4gICAgR2F0ZVdheTogMTAwMSxcbiAgICBMb2JieTogMjAwMSxcbiAgICBDcmFzaDogMzAxNixcbn1cblxuLyoqQGRlc2NyaXB0aW9uIOivu+WPliBwcm90byDphY3nva4gICovXG5leHBvcnQgbGV0IHByb3RvUGFja2FnZSA9IHtcblxuICAgIC8vIC8qKkBkZXNjcmlwdGlvbiDnvZHlhbPouqvku73pqozor4EqL1xuICAgIC8vIGdhdGV3YXk6IE1TVC5idC5nYW1lLnByb3RvLmdhbWUuZ2F0ZXdheSxcblxuICAgIC8vIC8qKkBkZXNjcmlwdGlvbiAg5aSn5Y6FKi9cbiAgICAvLyBoYWxsOiBNU1QuYnQuZ2FtZS5wcm90by5oYWxsLFxuXG4gICAgLy8gLyoqQGRlc2NyaXB0aW9uICDlpKfljoUgYmFzZSAqL1xuICAgIC8vIGhhbGxCYXNlOiBNU1QuYnQuZ2FtZS5wcm90by5oYWxsLmJhc2UsXG5cbiAgICAvLyAvKipAZGVzY3JpcHRpb24gIOWkp+WOhSBiYXNlICovXG4gICAgLy8gZ2FtZUJhc2U6IE1TVC5idC5nYW1lLnByb3RvLmdhbWUuYmFzZSxcblxuICAgIGhhbGw6IE1TVCxcblxuICAgIC8qKkBkZWNyaXB0aW9uICDniIbngrkqL1xuICAgIGNyYXNoOiBNU1QsXG5cbn1cblxuZXhwb3J0IGNsYXNzIENvbW1vbk1lc3NhZ2UgZXh0ZW5kcyBKc29uTWVzc2FnZSB7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIHNlcnZpY2XlhazlhbHln7rnsbtcbiAqL1xuXG5leHBvcnQgY2xhc3MgQ29tbW9uU2VydmljZSBleHRlbmRzIFNlcnZpY2UgaW1wbGVtZW50cyBHYW1lRXZlbnRJbnRlcmZhY2Uge1xuXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zdGFuY2U6IENvbW1vblNlcnZpY2UgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5faW5zdGFuY2UgfHwgKHRoaXMuX2luc3RhbmNlID0gbmV3IENvbW1vblNlcnZpY2UoKSk7IH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDlhazlhbHnmoTmtojmga/op6PmnpDnsbvlnovvvIzlv4XpobvljIXlkKvlr7nmtojmga/noIHnmoTop6PmnpDkuI7miZPljIUgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbW1vbk1lc3NhZ2VUeXBlKCk6IHR5cGVvZiBNZXNzYWdlIHtcbiAgICAgICAgcmV0dXJuIENvbW1vbk1lc3NhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWPkemAgeW/g+i3s1xuICAgICAqL1xuICAgIHByb3RlY3RlZCBzZW5kSGVhcnRiZWF0KCkge1xuICAgICAgICBsZXQgcmVxID0gTVNULkMyR19QaW5nX1JlcS5jcmVhdGUoeyBScGNJZDogTWFuYWdlci5uZXRNYW5hZ2VyLmdldE5ld1NlcUlkKCkgfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJHX1BpbmdfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlbmRNc2coTVNULkMyR19QaW5nX1JlcSwgTVNULk91dGVyT3Bjb2RlX0dhdGUuQzJHX1BpbmdfUmVxLCBidWZmZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g6I635Y+W5pyA5aSn5b+D6Lez6LaF5pe255qE5qyh5pWwXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldE1heEhlYXJ0YmVhdFRpbWVPdXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmdldE1heEhlYXJ0YmVhdFRpbWVPdXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0SGVhcnRiZWF0SW50ZXJ2YWwoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5nZXRIZWFydGJlYXRJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDlv4Pot7PotoXml7ZcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgb25IZWFydGJlYXRUaW1lT3V0KCkge1xuICAgICAgICBzdXBlci5vbkhlYXJ0YmVhdFRpbWVPdXQoKTtcbiAgICAgICAgY2Mud2Fybihg5b+D6Lez6LaF5pe277yM5oKo5bey57uP5pat5byA572R57ucYCk7XG5cbiAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIGkxOG4uV0FJVC5ORVRFUlJPUiwgKCkgPT4ge1xuICAgICAgICAgICAgTWFuYWdlci51aU1hbmFnZXIuY2xvc2VFeGNlcHQobnVsbCk7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XG4gICAgICAgICAgICBzdXBlci5jbG9zZSgpO1xuICAgICAgICAgICAgc3VwZXIucmVzZXQoKTtcbiAgICAgICAgICAgIGNjLmdhbWUucmVzdGFydCgpO1xuICAgICAgICAgICAgY2Muc3lzLmdhcmJhZ2VDb2xsZWN0KCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiDmmK/lkKbkuLrlv4Pot7Pmtojmga9cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaXNIZWFydEJlYXQoZGF0YTogTWVzc2FnZSk6IGJvb2xlYW4ge1xuICAgICAgICAvL+ekuuS+i1xuICAgICAgICByZXR1cm4gZGF0YS5tYWluQ21kID09IE1TVC5PdXRlck9wY29kZV9HYXRlLkcyQ19QaW5nX1JlcyB8fCBkYXRhLm1haW5DbWQgPT0gTVNULk91dGVyT3Bjb2RlX0dhdGUuQzJHX1BpbmdfUmVxO1xuICAgIH1cblxuICAgIG9uRW50ZXJCYWNrZ3JvdW5kKCkge1xuXG4gICAgfVxuXG4gICAgb25FbnRlckZvcmdlZ3JvdW5kKGluQmFja2dyb3VuZFRpbWU6IG51bWJlcikge1xuICAgICAgICAvLyBpZiAoaW5CYWNrZ3JvdW5kVGltZSA+IDMwKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAvLyB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPkemAgeS/oeaBr1xuICAgICAqIEBwYXJhbSBtYWluQ21kIFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIHNlcnZlcklkICBcbiAgICAgKi9cbiAgICBzZW5kTXNnKHByb3RvLCBtYWluQ21kLCBkYXRhYnVmZmVyPywgc2VydmVySWQ/KSB7XG4gICAgICAgIGxldCBtc2cgPSBuZXcgQ29tbW9uTWVzc2FnZSgpO1xuICAgICAgICBtc2cubWFpbkNtZCA9IG1haW5DbWQ7XG4gICAgICAgIG1zZy5kYXRhYnVmZmVyID0gZGF0YWJ1ZmZlcjtcbiAgICAgICAgaWYgKHNlcnZlcklkKSB7XG4gICAgICAgICAgICBtc2cuc2VydmVySWQgPSBzZXJ2ZXJJZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNIZWFydEJlYXQobXNnKSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYOWPkemAgee9kee7nOa2iOaBryBtYWluIGNtZCA6ICR7bWFpbkNtZH1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEcuTG9nZ2VyLmNvbG9yKGDlj5HpgIHmtojmga/vvJpgLCBgJHttYWluQ21kfWApO1xuICAgICAgICAgICAgRy5Mb2dnZXIubG9nKHByb3RvLmRlY29kZShkYXRhYnVmZmVyKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmFkZExpc3RlbmVyKG1haW5DbWQsbnVsbCxjYWxsLGZhbHNlLHRhcmdldCk7XG4gICAgICAgIHRoaXMuc2VuZChtc2cpXG5cbiAgICB9XG4gICAgLyoqXG4gICAgICog6YeN6L+eXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKCfph43ov54nLCBDb25maWcud2ViU2VydmljZUNmZyk7XG4gICAgICAgIGlmIChDb25maWcud2ViU2VydmljZUNmZykge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0KENvbmZpZy53ZWJTZXJ2aWNlQ2ZnLmlwLCBDb25maWcud2ViU2VydmljZUNmZy53c1BvcnQsIENvbmZpZy53ZWJTZXJ2aWNlQ2ZnLnByb3RvY29sKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9ubHlTZXJ2ZXJTZW5kTXNnKG1zZykge1xuICAgICAgICBzdXBlci5vbmx5U2VydmVyU2VuZE1zZyhtc2cpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIGlmIChtc2cubWFpbkNtZCA9PSAwKSB7Ly/ns7vnu5/kuLvliqjkuIvlj5Hlv4Pot7NcbiAgICAgICAgLy8gICAgIGxldCBtc2cgPSBuZXcgQ29tbW9uTWVzc2FnZSgpO1xuICAgICAgICAvLyAgICAgbXNnLm1haW5DbWQgPSAwO1xuICAgICAgICAvLyAgICAgdGhpcy5zZW5kKG1zZyk7XG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gfSBlbHNlIGlmIChtc2cubWFpbkNtZCA9PSBzZXJ2ZXJUeXBlLkxvYmJ5KSB7Ly/lpKfljoVcblxuICAgICAgICAvLyAgICAgaWYgKG1zZy5zdWJDbWQgPT0gcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5IT1JTRV9MQU5URVJOKSB7Ly/ot5Hpqaznga8gbWVzc2FnZSBIb3JzZUxhbnRlcm5cbiAgICAgICAgLy8gICAgICAgICBkaXNwYXRjaChcInJvbGxOb3RpY2VcIiwgbXNnLmRhdGEpO1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgaWYgKG1zZy5zdWJDbWQgPT0gcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VU0VSX1dFQUxUSCkgey8v5pu05paw546p5a6255qE6YeR5biBIOenr+WIhiDnoJbnn7MgbWVzc2FnZSBVc2VyV2VhbHRoXG4gICAgICAgIC8vICAgICAgICAgVXNlci5fZ29sZCA9IG1zZy5kYXRhLmdvbGQ7XG4gICAgICAgIC8vICAgICAgICAgVXNlci5fZGlhbW9uZHMgPSBtc2cuZGF0YS5kaWFtb25kcztcbiAgICAgICAgLy8gICAgICAgICBVc2VyLl9wb2ludHMgPSBtc2cuZGF0YS5wb2ludHM7XG4gICAgICAgIC8vICAgICAgICAgZGlzcGF0Y2goXCJ1cGRhdGVVc2VySW5mb1wiLCBtc2cuZGF0YSk7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vICAgICB9XG5cbiAgICAgICAgLy8gfVxuXG4gICAgfVxufSJdfQ==