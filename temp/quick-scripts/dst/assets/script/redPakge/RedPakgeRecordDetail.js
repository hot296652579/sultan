
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/redPakge/RedPakgeRecordDetail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a954655BgxCw4IwFZ2wjKJv', 'RedPakgeRecordDetail');
// script/redPakge/RedPakgeRecordDetail.ts

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
const UtilMgr_1 = require("../global/UtilMgr");
const { ccclass, property } = cc._decorator;
let RedPakgeRecordDetail = class RedPakgeRecordDetail extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scroViewLogic = null;
        this.numRichText = null;
        this.amountRichText = null;
        this.noTipNode = null;
        this.recordsNode = null;
        this.closeBtn = null;
        this.data = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketDetails), this.refreshList);
    }
    onEnable() {
        let req = CommonService_1.protoPackage.hall.RedPacketDetailsReq.create({ id: this.data.id, currentPage: 1 });
        let buffer = CommonService_1.protoPackage.hall.RedPacketDetailsReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_RedPacketDetails, buffer);
        this.recordsNode.active = false;
        this.closeBtn.active = false;
    }
    onDisable() {
        this.closeBtn.active = true;
    }
    init(data) {
        this.data = data;
    }
    refreshList(msg) {
        // G.Logger.log(msg);
        if (msg && msg.statusMsg.status == 0) {
            if (msg.redPacket) {
                this.numRichText.string = "<color=#cc0202>" + msg.redPacket.receivedNumber + "</c><color=#805326>/" + msg.redPacket.number + "</color>";
                this.amountRichText.string = "<color=#cc0202>" + "₹" + UtilMgr_1.UtilMgr.changeMoney(msg.redPacket.receivedAmount) + "</c><color=#805326>/" + "₹" + UtilMgr_1.UtilMgr.changeMoney(msg.redPacket.totalAmount) + "</color>";
                this.scroViewLogic.resetData();
                if (msg.redPacketReceiveRecord.length > 0) {
                    this.noTipNode.active = false;
                    this.scroViewLogic.initUI(msg.redPacketReceiveRecord);
                }
                else {
                    this.noTipNode.active = true;
                }
            }
            else {
                this.noTipNode.active = true;
            }
        }
    }
    onClick(name) {
        switch (name) {
            case "detailClose":
                this.node.active = false;
                this.recordsNode.active = true;
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
};
__decorate([
    property(ScroViewLogic_1.default)
], RedPakgeRecordDetail.prototype, "scroViewLogic", void 0);
__decorate([
    property(cc.RichText)
], RedPakgeRecordDetail.prototype, "numRichText", void 0);
__decorate([
    property(cc.RichText)
], RedPakgeRecordDetail.prototype, "amountRichText", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetail.prototype, "noTipNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetail.prototype, "recordsNode", void 0);
__decorate([
    property(cc.Node)
], RedPakgeRecordDetail.prototype, "closeBtn", void 0);
RedPakgeRecordDetail = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], RedPakgeRecordDetail);
exports.default = RedPakgeRecordDetail;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVkUGFrZ2UvUmVkUGFrZ2VSZWNvcmREZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRkFBOEQ7QUFFOUQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBQzVDLCtDQUE0QztBQUc1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLGdCQUFNO0lBQXhEOztRQUtJLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUdwQyxnQkFBVyxHQUFnQixJQUFJLENBQUM7UUFHaEMsbUJBQWMsR0FBZ0IsSUFBSSxDQUFDO1FBR25DLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixTQUFJLEdBQVEsSUFBSSxDQUFDO1FBMERqQixpQkFBaUI7SUFDckIsQ0FBQztJQXpERyxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFBVSxDQUFDLEtBQUssRUFBRSw0QkFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFcEgsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLEdBQUcsR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFB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TztBQXBCUixvQkFBb0I7SUFGeEMsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsb0JBQW9CLENBa0Z4QztrQkFsRm9CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY3JvVmlld0xvZ2ljIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50L1Njcm9WaWV3TG9naWNcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRQYWtnZVJlY29yZERldGFpbCBleHRlbmRzIFVJVmlldyB7XG5cblxuXG4gICAgQHByb3BlcnR5KFNjcm9WaWV3TG9naWMpXG4gICAgc2Nyb1ZpZXdMb2dpYzogU2Nyb1ZpZXdMb2dpYyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgbnVtUmljaFRleHQ6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBhbW91bnRSaWNoVGV4dDogY2MuUmljaFRleHQgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbm9UaXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJlY29yZHNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcbiAgICBkYXRhOiBhbnkgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9SZWRQYWNrZXREZXRhaWxzKSwgdGhpcy5yZWZyZXNoTGlzdCk7XG5cbiAgICB9XG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIGxldCByZXEgPSBwcm90b1BhY2thZ2UuaGFsbC5SZWRQYWNrZXREZXRhaWxzUmVxLmNyZWF0ZSh7IGlkOiB0aGlzLmRhdGEuaWQsIGN1cnJlbnRQYWdlOiAxIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuUmVkUGFja2V0RGV0YWlsc1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1JlZFBhY2tldERldGFpbHMsXG4gICAgICAgICAgICBidWZmZXIpO1xuXG4gICAgICAgIHRoaXMucmVjb3Jkc05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIG9uRGlzYWJsZSgpe1xuICAgICAgICB0aGlzLmNsb3NlQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIGluaXQoZGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgfVxuICAgIHByaXZhdGUgcmVmcmVzaExpc3QobXNnKSB7XG4gICAgICAgIC8vIEcuTG9nZ2VyLmxvZyhtc2cpO1xuICAgICAgICBpZiAobXNnICYmIG1zZy5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIGlmIChtc2cucmVkUGFja2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1SaWNoVGV4dC5zdHJpbmcgPSBcIjxjb2xvcj0jY2MwMjAyPlwiICsgbXNnLnJlZFBhY2tldC5yZWNlaXZlZE51bWJlciArIFwiPC9jPjxjb2xvcj0jODA1MzI2Pi9cIiArIG1zZy5yZWRQYWNrZXQubnVtYmVyICsgXCI8L2NvbG9yPlwiXG4gICAgICAgICAgICAgICAgdGhpcy5hbW91bnRSaWNoVGV4dC5zdHJpbmcgPSBcIjxjb2xvcj0jY2MwMjAyPlwiICsgXCLigrlcIiArIFV0aWxNZ3IuY2hhbmdlTW9uZXkobXNnLnJlZFBhY2tldC5yZWNlaXZlZEFtb3VudCkgKyBcIjwvYz48Y29sb3I9IzgwNTMyNj4vXCIgKyBcIuKCuVwiICsgVXRpbE1nci5jaGFuZ2VNb25leShtc2cucmVkUGFja2V0LnRvdGFsQW1vdW50KSArIFwiPC9jb2xvcj5cIlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb1ZpZXdMb2dpYy5yZXNldERhdGEoKTtcbiAgICAgICAgICAgICAgICBpZiAobXNnLnJlZFBhY2tldFJlY2VpdmVSZWNvcmQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vVGlwTm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9WaWV3TG9naWMuaW5pdFVJKG1zZy5yZWRQYWNrZXRSZWNlaXZlUmVjb3JkKVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vVGlwTm9kZS5hY3RpdmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub1RpcE5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJkZXRhaWxDbG9zZVwiOlxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZHNOb2RlLmFjdGl2ZSA9IHRydWU7IFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=