"use strict";
cc._RF.push(module, '6e0c8UpyzhGyJBPm9a9uffT', 'SigninNew');
// script/signin/SigninNew.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const Manager_1 = require("../common/manager/Manager");
const protoc_1 = require("../framework/external/protoc");
const HallData_1 = __importDefault(require("../data/HallData"));
const { ccclass, property } = cc._decorator;
let SigninNew = class SigninNew extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.SevenSigin = null;
        this.ThirtySigin = null;
        this.dayItem0 = null;
        this.dayItem1 = null;
        this.dayItem2 = null;
        this.dayItem3 = null;
        this.dayItem4 = null;
        this.dayItem5 = null;
        this.dayItem6 = null;
        this.dayNode0 = null;
        this.dayNode1 = null;
        this.dayNode2 = null;
        this.dayNode3 = null;
        this.dayNode4 = null;
        this.dayNode5 = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "signin/prefabs/SigninNew";
    }
    onLoad() {
        super.onLoad();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_GetSignedInfo', this.onEvent_S2C_GetSignedInfo);
        this.registerEvent('Event_S2C_Signed', this.onEvent_S2C_Signed);
    }
    show(args) {
        // super.show(args);
        this.requestGetSigned();
    }
    requestGetSigned() {
        let req = protoc_1.MST.C2S_GetSignedInfo.create({
            serial: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2S_GetSignedInfo.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_GetSignedInfo, protoc_1.MST.OuterOpcode_Lobby.C2S_GetSignedInfo, buffer);
    }
    onEvent_S2C_GetSignedInfo() {
        let hallData = G.DataMgr.get(HallData_1.default);
        let signinData = hallData.signinData;
        this.SevenSigin.active = false;
        this.ThirtySigin.active = false;
        if (signinData.signedType == 0) {
            this.SevenSigin.active = true;
            this.refreshSevenView();
        }
        else {
            this.ThirtySigin.active = true;
            this.refreshThirtyView();
        }
    }
    onEvent_S2C_Signed() {
        this.requestGetSigned();
        let hallData = G.DataMgr.get(HallData_1.default);
        let signinData = hallData.signinData;
        let serial = signinData.serial;
        let reward = signinData.reward;
        if (reward && reward > 0) {
            if (serial == 0) {
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SEVENSIGNINSUCCESS);
            }
            else {
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.THIRTYSIGNINSUCCESS);
            }
        }
        else
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.TIPS.SIGNINSUCCESS);
    }
    refreshSevenView() {
        let self = this;
        let hallData = G.DataMgr.get(HallData_1.default);
        let signinData = hallData.signinData;
        let signedDays = signinData.signedDays;
        let isSigned = signinData.isSigned;
        for (let index = 0; index < 7; index++) {
            let dayItem = this[`dayItem${index}`];
            let bg = dayItem.getChildByName('bg');
            let canGet = bg.getChildByName('canGet');
            let obtain = bg.getChildByName('obtain');
            let noReach = bg.getChildByName('noReach');
            let btnMasuk = canGet.getChildByName('btnMasuk');
            noReach.active = true;
            canGet.active = false;
            obtain.active = false;
            // console.log('signedDays->:' + signedDays);
            if (signedDays > 0) {
                if (index < signedDays) {
                    obtain.active = true;
                    noReach.active = false;
                }
                else {
                    if (index == signedDays) {
                        if (!isSigned) {
                            canGet.active = true;
                            obtain.active = false;
                            noReach.active = false;
                            btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                                // console.log('index ->:' + index);
                                self.requestSignHandler();
                            });
                        }
                    }
                    else {
                        noReach.active = true;
                    }
                }
            }
            else {
                if (index == 0) {
                    canGet.active = true;
                    noReach.active = false;
                    btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                        // console.log('index ->:' + index);
                        self.requestSignHandler();
                    });
                }
            }
        }
    }
    requestSignHandler() {
        let req = protoc_1.MST.C2S_Signed.create({
            serial: Manager_1.Manager.netManager.getNewSeqId()
        });
        let buffer = protoc_1.MST.C2S_Signed.encode(req).finish();
        LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2S_Signed, protoc_1.MST.OuterOpcode_Lobby.C2S_Signed, buffer);
    }
    refreshThirtyView() {
        let self = this;
        let hallData = G.DataMgr.get(HallData_1.default);
        let signinData = hallData.signinData;
        let signedDays = signinData.signedDays;
        let isSigned = signinData.isSigned;
        let _total = 0;
        let _i = 0;
        let layNum = 0;
        for (let index = 0; index < 6; index++) {
            for (let index = 0; index < 5; index++) {
                if (_i > 4) {
                    _i = 0;
                    layNum++;
                }
                // console.log('layNum : ' + layNum);
                // console.log('_i ->' + _i);
                let dayNode = this[`dayNode${layNum}`];
                let dayItem = dayNode.getChildByName(`day${_i}`);
                let labDay = dayItem.getChildByName('day0').getComponent(cc.Label);
                labDay.string = `Day${_total + 1}`;
                let canGet = dayItem.getChildByName('canGet');
                let obtain = dayItem.getChildByName('obtain');
                let noReach = dayItem.getChildByName('noReach');
                let btnMasuk = canGet.getChildByName('btnMasuk');
                canGet.active = false;
                obtain.active = false;
                noReach.active = true;
                if (signedDays > 0) {
                    if (_total < signedDays) {
                        obtain.active = true;
                        noReach.active = false;
                    }
                    else {
                        if (_total == signedDays) {
                            if (!isSigned) {
                                canGet.active = true;
                                obtain.active = false;
                                noReach.active = false;
                                btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                                    // console.log('index ->:' + index);
                                    self.requestSignHandler();
                                });
                            }
                        }
                        else {
                            noReach.active = true;
                        }
                    }
                }
                else {
                    if (_total == 0) {
                        canGet.active = true;
                        noReach.active = false;
                        btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                            // console.log('index ->:' + index);
                            self.requestSignHandler();
                        });
                    }
                }
                _total++;
                _i++;
            }
        }
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], SigninNew.prototype, "SevenSigin", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "ThirtySigin", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem0", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem1", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem2", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem3", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem4", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem5", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayItem6", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayNode0", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayNode1", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayNode2", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayNode3", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayNode4", void 0);
__decorate([
    property(cc.Node)
], SigninNew.prototype, "dayNode5", void 0);
SigninNew = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SigninNew);
exports.default = SigninNew;

cc._RF.pop();