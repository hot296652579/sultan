"use strict";
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