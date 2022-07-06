
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeRecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4de4cMxpsBDIplju7i+QCdq', 'RedPakgeRecord');
// script/redPakge/RedPakgeRecord.ts

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
const RedPakgeRecordDetail_1 = __importDefault(require("./RedPakgeRecordDetail"));
const { ccclass, property } = cc._decorator;
let RedPakgeRecord = class RedPakgeRecord extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.noTipNode = null;
        this.listNode = null;
        this.eedPakgeRecordDetail = null;
        this.scroViewLogic = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketSendRecord), this.refreshList);
        this.registerEvent("showRedPakgeRecordDetail", this.showDetail);
    }
    onEnable() {
        this.initUI();
        let req = CommonService_1.protoPackage.hall.RedPacketSendRecordReq.create({ currentPage: 1 });
        let buffer = CommonService_1.protoPackage.hall.RedPacketSendRecordReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketSendRecord, buffer);
    }
    initUI() {
        this.eedPakgeRecordDetail.node.active = false;
        this.listNode.active = false;
        this.noTipNode.active = true;
    }
    refreshList(msg) {
        G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacket && msg.redPacket.length > 0) {
                this.listNode.active = true;
                this.noTipNode.active = false;
                this.scroViewLogic.initUI(msg.redPacket);
            }
        }
    }
    showDetail(data) {
        this.eedPakgeRecordDetail.init(data);
        this.eedPakgeRecordDetail.node.active = true;
    }
};
__decorate([
    property(cc.Node)
], RedPakgeRecord.prototype, "noTipNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecord.prototype, "listNode", void 0);
__decorate([
    property(RedPakgeRecordDetail_1.default)
], RedPakgeRecord.prototype, "eedPakgeRecordDetail", void 0);
__decorate([
    property(ScroViewLogic_1.default)
], RedPakgeRecord.prototype, "scroViewLogic", void 0);
RedPakgeRecord = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RedPakgeRecord);
exports.default = RedPakgeRecord;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VSZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRkFBOEQ7QUFFOUQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBQzVDLGtGQUEwRDtBQUcxRCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsZ0JBQU07SUFBbEQ7O1FBR0ksY0FBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLHlCQUFvQixHQUF5QixJQUFJLENBQUM7UUFHbEQsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBMkNwQyxpQkFBaUI7SUFDckIsQ0FBQztJQXpDRyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkgsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFcEUsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDYixJQUFJLEdBQUcsR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsRUFBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLE1BQU0sR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxLQUFLLEVBQ2pDLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFDakQsTUFBTSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUNPLE1BQU07UUFDVixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBQ08sV0FBVyxDQUFDLEdBQUc7UUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2xDLElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtnQkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDM0M7U0FFSjtJQUVMLENBQUM7SUFDTyxVQUFVLENBQUMsSUFBSTtRQUNuQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUVqRCxDQUFDO0NBRUosQ0FBQTtBQXJERztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ087QUFHekI7SUFEQyxRQUFRLENBQUMsOEJBQW9CLENBQUM7NERBQ21CO0FBR2xEO0lBREMsUUFBUSxDQUFDLHVCQUFhLENBQUM7cURBQ1k7QUFabkIsY0FBYztJQUZsQyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixjQUFjLENBd0RsQztrQkF4RG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2Nyb1ZpZXdMb2dpYyBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0xvZ2ljXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBSZWRQYWtnZVJlY29yZERldGFpbCBmcm9tIFwiLi9SZWRQYWtnZVJlY29yZERldGFpbFwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVJlY29yZCBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub1RpcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGlzdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFJlZFBha2dlUmVjb3JkRGV0YWlsKVxuICAgIGVlZFBha2dlUmVjb3JkRGV0YWlsOiBSZWRQYWtnZVJlY29yZERldGFpbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoU2Nyb1ZpZXdMb2dpYylcbiAgICBzY3JvVmlld0xvZ2ljOiBTY3JvVmlld0xvZ2ljID0gbnVsbDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfUmVkUGFja2V0U2VuZFJlY29yZCksIHRoaXMucmVmcmVzaExpc3QpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJzaG93UmVkUGFrZ2VSZWNvcmREZXRhaWxcIiwgdGhpcy5zaG93RGV0YWlsKTtcbiAgICAgICAgXG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLmluaXRVSSgpXG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5SZWRQYWNrZXRTZW5kUmVjb3JkUmVxLmNyZWF0ZSh7Y3VycmVudFBhZ2U6MX0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuUmVkUGFja2V0U2VuZFJlY29yZFJlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1JlZFBhY2tldFNlbmRSZWNvcmQsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cbiAgICBwcml2YXRlIGluaXRVSSgpe1xuICAgICAgICB0aGlzLmVlZFBha2dlUmVjb3JkRGV0YWlsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9UaXBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHByaXZhdGUgcmVmcmVzaExpc3QobXNnKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhtc2cpO1xuICAgICAgICBpZiAobXNnICYmIG1zZy5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIGlmIChtc2cucmVkUGFja2V0ICYmIG1zZy5yZWRQYWNrZXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdE5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHRoaXMubm9UaXBOb2RlLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvVmlld0xvZ2ljLmluaXRVSShtc2cucmVkUGFja2V0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHByaXZhdGUgc2hvd0RldGFpbChkYXRhKXtcbiAgICAgICAgdGhpcy5lZWRQYWtnZVJlY29yZERldGFpbC5pbml0KGRhdGEpXG4gICAgICAgIHRoaXMuZWVkUGFrZ2VSZWNvcmREZXRhaWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=