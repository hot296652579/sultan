
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/turntable/AddressView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2a29Zj3IpD/Iu01apuZCXo', 'AddressView');
// script/turntable/AddressView.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let AddressView = class AddressView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.nameEdit = null;
        this.phoneEdit = null;
        this.areaCode = null;
        this.addressEdit = null;
    }
    static getPrefabUrl() {
        return "turntable/prefab/AddressView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.id = args[0];
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.Turntable_Address), this.onNetTurntableAddressRes);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "btn_cancel":
                this.closeWithAction();
                break;
            case "btn_confirm":
                this.reqTurntableAddress();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqTurntableAddress() {
        let name = this.nameEdit.string;
        let phone = this.phoneEdit.string;
        let address = this.addressEdit.string;
        let areaCode = this.areaCode.string;
        if (!name.length) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.NICKNAMENULL);
            return;
        }
        if (!phone) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.PHONENULL);
            return null;
        }
        if (phone.length < 7) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.PHONETYPEERR);
            return null;
        }
        if (!address.length) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.EDITBOX.ADDRESSNULL);
            return;
        }
        if (!areaCode.length)
            return;
        let options = {
            id: this.id,
            name: name,
            phone: areaCode + phone,
            address: address,
        };
        G.Logger.log("AddressOptions", options);
        let req = CommonService_1.protoPackage.hall.TurntableAddressReq.create(options);
        let buffer = CommonService_1.protoPackage.hall.TurntableAddressReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.Turntable_Address, buffer);
    }
    onNetTurntableAddressRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TURN_TABLE.AddressSuccess);
            dispatch("UPDATE_PRIZE_RECORD");
            this.closeWithAction();
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.EditBox)
], AddressView.prototype, "nameEdit", void 0);
__decorate([
    property(cc.EditBox)
], AddressView.prototype, "phoneEdit", void 0);
__decorate([
    property(cc.Label)
], AddressView.prototype, "areaCode", void 0);
__decorate([
    property(cc.EditBox)
], AddressView.prototype, "addressEdit", void 0);
AddressView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], AddressView);
exports.default = AddressView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdHVybnRhYmxlL0FkZHJlc3NWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0VBQXVEO0FBQ3ZELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFFMUQsa0VBQTJFO0FBQzNFLG9FQUE0QztBQUU1QyxvRUFBNEM7QUFFNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLFdBQVcsR0FBaEMsTUFBcUIsV0FBWSxTQUFRLGdCQUFNO0lBQS9DOztRQUtJLGFBQVEsR0FBZSxJQUFJLENBQUM7UUFHNUIsY0FBUyxHQUFlLElBQUksQ0FBQztRQUc3QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGdCQUFXLEdBQWUsSUFBSSxDQUFDO0lBMkZuQyxDQUFDO0lBeEZVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sOEJBQThCLENBQUM7SUFDMUMsQ0FBQztJQUNELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXZELENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJO1FBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFHRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JB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USxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDSCxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixDQUFDO0NBQ0osQ0FBQTtBQXBHRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzZDQUNPO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7OENBQ1E7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDTztBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2dEQUNVO0FBZGQsV0FBVztJQUYvQixPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixXQUFXLENBeUcvQjtrQkF6R29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgc2VydmVyVHlwZSwgcHJvdG9QYWNrYWdlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzc1ZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIG5hbWVFZGl0OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIHBob25lRWRpdDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYXJlYUNvZGU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIGFkZHJlc3NFZGl0OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIHByaXZhdGUgaWQ6IG51bWJlcjtcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwidHVybnRhYmxlL3ByZWZhYi9BZGRyZXNzVmlld1wiO1xuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnQnKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBhcmdzWzBdO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVHVybnRhYmxlX0FkZHJlc3MpLCB0aGlzLm9uTmV0VHVybnRhYmxlQWRkcmVzc1Jlcyk7XG4gICAgfVxuXG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6IHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJ0bl9jYW5jZWxcIjogdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuX2NvbmZpcm1cIjogdGhpcy5yZXFUdXJudGFibGVBZGRyZXNzKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxVHVybnRhYmxlQWRkcmVzcygpIHtcbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLm5hbWVFZGl0LnN0cmluZztcbiAgICAgICAgbGV0IHBob25lID0gdGhpcy5waG9uZUVkaXQuc3RyaW5nO1xuICAgICAgICBsZXQgYWRkcmVzcyA9IHRoaXMuYWRkcmVzc0VkaXQuc3RyaW5nO1xuICAgICAgICBsZXQgYXJlYUNvZGUgPSB0aGlzLmFyZWFDb2RlLnN0cmluZztcbiAgICAgICAgaWYgKCFuYW1lLmxlbmd0aCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FRElUQk9YLk5JQ0tOQU1FTlVMTCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwaG9uZSkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FRElUQk9YLlBIT05FTlVMTCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGhvbmUubGVuZ3RoIDwgNykge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FRElUQk9YLlBIT05FVFlQRUVSUik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYWRkcmVzcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRURJVEJPWC5BRERSRVNTTlVMTCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWFyZWFDb2RlLmxlbmd0aCkgIHJldHVybjtcbiAgICAgICAgXG5cbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5pZCwvLyDllK/kuIBpZFxuICAgICAgICAgICAgbmFtZTogbmFtZSwvLyDlkI3lrZdcbiAgICAgICAgICAgIHBob25lOiBhcmVhQ29kZStwaG9uZSwvLyDnlLXor51cbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3MsLy8g5Zyw5Z2AXG4gICAgICAgIH1cbiAgICAgICAgRy5Mb2dnZXIubG9nKFwiQWRkcmVzc09wdGlvbnNcIixvcHRpb25zKTtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlR1cm50YWJsZUFkZHJlc3NSZXEuY3JlYXRlKG9wdGlvbnMpO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuVHVybnRhYmxlQWRkcmVzc1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVHVybnRhYmxlX0FkZHJlc3MsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uTmV0VHVybnRhYmxlQWRkcmVzc1JlcyhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5UVVJOX1RBQkxFLkFkZHJlc3NTdWNjZXNzKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKFwiVVBEQVRFX1BSSVpFX1JFQ09SRFwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKCk7ICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRVJST1JDT0RFW2RhdGEuc3RhdHVzTXNnLnN0YXR1c10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=