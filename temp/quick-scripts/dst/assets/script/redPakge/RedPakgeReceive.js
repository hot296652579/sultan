
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeReceive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '559f3TamoNMMIptTFEPA73g', 'RedPakgeReceive');
// script/redPakge/RedPakgeReceive.ts

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
const ScroViewLogic_1 = __importDefault(require("../common/component/ScroViewLogic"));
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RedPakgeReceive = class RedPakgeReceive extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noTipNode = null;
        this.listNode = null;
        this.scroViewLogic = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketReceiveRecord), this.refreshList);
    }
    onEnable() {
        this.initUI();
        let req = CommonService_1.protoPackage.hall.RedPacketSendRecordReq.create({ currentPage: 1 });
        let buffer = CommonService_1.protoPackage.hall.RedPacketSendRecordReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketReceiveRecord, buffer);
    }
    initUI() {
        this.listNode.active = false;
        this.noTipNode.active = true;
    }
    refreshList(msg) {
        // G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacketReceiveRecord && msg.redPacketReceiveRecord.length > 0) {
                this.listNode.active = true;
                this.noTipNode.active = false;
                this.scroViewLogic.initUI(msg.redPacketReceiveRecord);
            }
        }
    }
};
__decorate([
    property(cc.Node)
], RedPakgeReceive.prototype, "noTipNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeReceive.prototype, "listNode", void 0);
__decorate([
    property(ScroViewLogic_1.default)
], RedPakgeReceive.prototype, "scroViewLogic", void 0);
RedPakgeReceive = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RedPakgeReceive);
exports.default = RedPakgeReceive;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VSZWNlaXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0ZBQThEO0FBRTlELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsa0VBQTJFO0FBQzNFLG9FQUE0QztBQUk1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLGdCQUFNO0lBQW5EOztRQUdJLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFvQ3BDLGlCQUFpQjtJQUNyQixDQUFDO0lBbENHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBTyxDQUFDLDBCQUFVLENBQUMsS0FBSyxFQUFFLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUUxSCxDQUFDO0lBQ0QsUUFBUTtRQUNKLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNiLElBQUksR0FBRyxHQUFHLDRCQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQUksTUFBTSxHQUFHLDRCQUFZLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFDakMsNEJBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUNwRCxNQUFNLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBQ08sTUFBTTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7SUFFaEMsQ0FBQztJQUNPLFdBQVcsQ0FBQyxHQUFHO1FBQ25CLHFCQUFxQjtRQUNyQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxHQUFHLENBQUMsc0JBQXNCLElBQUksR0FBRyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQTthQUN4RDtTQUNKO0lBRUwsQ0FBQztDQUVKLENBQUE7QUExQ0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDUTtBQUUxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNPO0FBR3pCO0lBREMsUUFBUSxDQUFDLHVCQUFhLENBQUM7c0RBQ1k7QUFSbkIsZUFBZTtJQUZuQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixlQUFlLENBNkNuQztrQkE3Q29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Nyb1ZpZXdMb2dpYyBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0xvZ2ljXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBSZWRQYWtnZVJlY29yZERldGFpbCBmcm9tIFwiLi9SZWRQYWtnZVJlY29yZERldGFpbFwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVJlY2VpdmUgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbm9UaXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsaXN0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoU2Nyb1ZpZXdMb2dpYylcbiAgICBzY3JvVmlld0xvZ2ljOiBTY3JvVmlld0xvZ2ljID0gbnVsbDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUmVkUGFja2V0UmVjZWl2ZVJlY29yZCksIHRoaXMucmVmcmVzaExpc3QpO1xuICAgICAgICBcbiAgICB9XG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMuaW5pdFVJKClcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlJlZFBhY2tldFNlbmRSZWNvcmRSZXEuY3JlYXRlKHtjdXJyZW50UGFnZToxfSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5SZWRQYWNrZXRTZW5kUmVjb3JkUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUmVkUGFja2V0UmVjZWl2ZVJlY29yZCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuICAgIHByaXZhdGUgaW5pdFVJKCl7XG4gICAgICAgIHRoaXMubGlzdE5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgdGhpcy5ub1RpcE5vZGUuYWN0aXZlID0gdHJ1ZVxuXG4gICAgfVxuICAgIHByaXZhdGUgcmVmcmVzaExpc3QobXNnKSB7XG4gICAgICAgIC8vIEcuTG9nZ2VyLmxvZyhtc2cpO1xuICAgICAgICBpZiAobXNnICYmIG1zZy5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIGlmIChtc2cucmVkUGFja2V0UmVjZWl2ZVJlY29yZCAmJiBtc2cucmVkUGFja2V0UmVjZWl2ZVJlY29yZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Tm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5ub1RpcE5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9WaWV3TG9naWMuaW5pdFVJKG1zZy5yZWRQYWNrZXRSZWNlaXZlUmVjb3JkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==