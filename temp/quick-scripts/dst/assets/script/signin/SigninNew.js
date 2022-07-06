
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/signin/SigninNew.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2lnbmluL1NpZ25pbk5ldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtFQUF1RDtBQUV2RCw2REFBMEQ7QUFFMUQsa0VBQTJFO0FBQzNFLG9FQUE0QztBQUU1QyxvRUFBNEM7QUFDNUMsdURBQW9EO0FBRXBELHlEQUFtRDtBQUNuRCxnRUFBd0M7QUFHeEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLFNBQVMsR0FBOUIsTUFBcUIsU0FBVSxTQUFRLGdCQUFNO0lBQTdDOztRQUlJLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd6QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsYUFBUSxHQUFZLElBQUksQ0FBQztRQWdOekIsaUJBQWlCO0lBQ3JCLENBQUM7SUEvTVUsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTywwQkFBMEIsQ0FBQztJQUN0QyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRUQsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixJQUFJLENB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SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDTztBQUV6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUNPO0FBbENSLFNBQVM7SUFGN0IsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsU0FBUyxDQW1QN0I7a0JBblBvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL2dsb2JhbC9Vc2VyXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZXh0ZXJuYWwvcHJvdG9jXCI7XG5pbXBvcnQgSGFsbERhdGEgZnJvbSBcIi4uL2RhdGEvSGFsbERhdGFcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2lnbmluTmV3IGV4dGVuZHMgVUlWaWV3IGltcGxlbWVudHMgSUNvbnRyb2xsZXI8TG9iYnlTZXJ2aWNlPiB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgU2V2ZW5TaWdpbjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgVGhpcnR5U2lnaW46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGF5SXRlbTA6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRheUl0ZW0xOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkYXlJdGVtMjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGF5SXRlbTM6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRheUl0ZW00OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkYXlJdGVtNTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGF5SXRlbTY6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGF5Tm9kZTA6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRheU5vZGUxOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkYXlOb2RlMjogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGF5Tm9kZTM6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGRheU5vZGU0OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkYXlOb2RlNTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwic2lnbmluL3ByZWZhYnMvU2lnbmluTmV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcblxuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCdFdmVudF9TMkNfR2V0U2lnbmVkSW5mbycsIHRoaXMub25FdmVudF9TMkNfR2V0U2lnbmVkSW5mbyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnRXZlbnRfUzJDX1NpZ25lZCcsIHRoaXMub25FdmVudF9TMkNfU2lnbmVkKTtcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgLy8gc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0U2lnbmVkKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEdldFNpZ25lZCgpIHtcbiAgICAgICAgbGV0IHJlcSA9IE1TVC5DMlNfR2V0U2lnbmVkSW5mby5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfR2V0U2lnbmVkSW5mby5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyU19HZXRTaWduZWRJbmZvLCBNU1QuT3V0ZXJPcGNvZGVfTG9iYnkuQzJTX0dldFNpZ25lZEluZm8sIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgb25FdmVudF9TMkNfR2V0U2lnbmVkSW5mbygpIHtcbiAgICAgICAgbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIGxldCBzaWduaW5EYXRhID0gaGFsbERhdGEuc2lnbmluRGF0YTtcbiAgICAgICAgdGhpcy5TZXZlblNpZ2luLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLlRoaXJ0eVNpZ2luLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzaWduaW5EYXRhLnNpZ25lZFR5cGUgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5TZXZlblNpZ2luLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hTZXZlblZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuVGhpcnR5U2lnaW4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFRoaXJ0eVZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRXZlbnRfUzJDX1NpZ25lZCgpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0R2V0U2lnbmVkKCk7XG5cbiAgICAgICAgbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIGxldCBzaWduaW5EYXRhID0gaGFsbERhdGEuc2lnbmluRGF0YTtcbiAgICAgICAgbGV0IHNlcmlhbCA9IHNpZ25pbkRhdGEuc2VyaWFsO1xuICAgICAgICBsZXQgcmV3YXJkID0gc2lnbmluRGF0YS5yZXdhcmRcbiAgICAgICAgaWYgKHJld2FyZCAmJiByZXdhcmQgPiAwKSB7XG4gICAgICAgICAgICBpZiAoc2VyaWFsID09IDApIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlRJUFMuU0VWRU5TSUdOSU5TVUNDRVNTKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5USVBTLlRISVJUWVNJR05JTlNVQ0NFU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVElQUy5TSUdOSU5TVUNDRVNTKTtcbiAgICB9XG5cbiAgICByZWZyZXNoU2V2ZW5WaWV3KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBoYWxsRGF0YSA9IEcuRGF0YU1nci5nZXQoSGFsbERhdGEpO1xuICAgICAgICBsZXQgc2lnbmluRGF0YSA9IGhhbGxEYXRhLnNpZ25pbkRhdGE7XG4gICAgICAgIGxldCBzaWduZWREYXlzID0gc2lnbmluRGF0YS5zaWduZWREYXlzO1xuICAgICAgICBsZXQgaXNTaWduZWQgPSBzaWduaW5EYXRhLmlzU2lnbmVkO1xuXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA3OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgZGF5SXRlbSA9IHRoaXNbYGRheUl0ZW0ke2luZGV4fWBdO1xuICAgICAgICAgICAgbGV0IGJnID0gZGF5SXRlbS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcbiAgICAgICAgICAgIGxldCBjYW5HZXQgPSBiZy5nZXRDaGlsZEJ5TmFtZSgnY2FuR2V0Jyk7XG4gICAgICAgICAgICBsZXQgb2J0YWluID0gYmcuZ2V0Q2hpbGRCeU5hbWUoJ29idGFpbicpO1xuICAgICAgICAgICAgbGV0IG5vUmVhY2ggPSBiZy5nZXRDaGlsZEJ5TmFtZSgnbm9SZWFjaCcpO1xuICAgICAgICAgICAgbGV0IGJ0bk1hc3VrID0gY2FuR2V0LmdldENoaWxkQnlOYW1lKCdidG5NYXN1aycpO1xuICAgICAgICAgICAgbm9SZWFjaC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY2FuR2V0LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgb2J0YWluLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NpZ25lZERheXMtPjonICsgc2lnbmVkRGF5cyk7XG4gICAgICAgICAgICBpZiAoc2lnbmVkRGF5cyA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzaWduZWREYXlzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9idGFpbi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBub1JlYWNoLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IHNpZ25lZERheXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNTaWduZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5HZXQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnRhaW4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9SZWFjaC5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bk1hc3VrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW5kZXggLT46JyArIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXF1ZXN0U2lnbkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vUmVhY2guYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbkdldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBub1JlYWNoLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGJ0bk1hc3VrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2luZGV4IC0+OicgKyBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcXVlc3RTaWduSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXF1ZXN0U2lnbkhhbmRsZXIoKSB7XG4gICAgICAgIGxldCByZXEgPSBNU1QuQzJTX1NpZ25lZC5jcmVhdGUoe1xuICAgICAgICAgICAgc2VyaWFsOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMlNfU2lnbmVkLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJTX1NpZ25lZCwgTVNULk91dGVyT3Bjb2RlX0xvYmJ5LkMyU19TaWduZWQsIGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgcmVmcmVzaFRoaXJ0eVZpZXcoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGhhbGxEYXRhID0gRy5EYXRhTWdyLmdldChIYWxsRGF0YSk7XG4gICAgICAgIGxldCBzaWduaW5EYXRhID0gaGFsbERhdGEuc2lnbmluRGF0YTtcbiAgICAgICAgbGV0IHNpZ25lZERheXMgPSBzaWduaW5EYXRhLnNpZ25lZERheXM7XG4gICAgICAgIGxldCBpc1NpZ25lZCA9IHNpZ25pbkRhdGEuaXNTaWduZWQ7XG5cbiAgICAgICAgbGV0IF90b3RhbCA9IDA7XG4gICAgICAgIGxldCBfaSA9IDA7XG4gICAgICAgIGxldCBsYXlOdW0gPSAwO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgNjsgaW5kZXgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDU7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoX2kgPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgIF9pID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGF5TnVtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXlOdW0gOiAnICsgbGF5TnVtKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnX2kgLT4nICsgX2kpO1xuICAgICAgICAgICAgICAgIGxldCBkYXlOb2RlID0gdGhpc1tgZGF5Tm9kZSR7bGF5TnVtfWBdO1xuICAgICAgICAgICAgICAgIGxldCBkYXlJdGVtID0gZGF5Tm9kZS5nZXRDaGlsZEJ5TmFtZShgZGF5JHtfaX1gKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiRGF5ID0gZGF5SXRlbS5nZXRDaGlsZEJ5TmFtZSgnZGF5MCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgbGFiRGF5LnN0cmluZyA9IGBEYXkke190b3RhbCArIDF9YDtcblxuICAgICAgICAgICAgICAgIGxldCBjYW5HZXQgPSBkYXlJdGVtLmdldENoaWxkQnlOYW1lKCdjYW5HZXQnKTtcbiAgICAgICAgICAgICAgICBsZXQgb2J0YWluID0gZGF5SXRlbS5nZXRDaGlsZEJ5TmFtZSgnb2J0YWluJyk7XG4gICAgICAgICAgICAgICAgbGV0IG5vUmVhY2ggPSBkYXlJdGVtLmdldENoaWxkQnlOYW1lKCdub1JlYWNoJyk7XG4gICAgICAgICAgICAgICAgbGV0IGJ0bk1hc3VrID0gY2FuR2V0LmdldENoaWxkQnlOYW1lKCdidG5NYXN1aycpO1xuICAgICAgICAgICAgICAgIGNhbkdldC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvYnRhaW4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbm9SZWFjaC5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNpZ25lZERheXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdG90YWwgPCBzaWduZWREYXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnRhaW4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vUmVhY2guYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RvdGFsID09IHNpZ25lZERheXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU2lnbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbkdldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnRhaW4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vUmVhY2guYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuTWFzdWsub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaW5kZXggLT46JyArIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVxdWVzdFNpZ25IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9SZWFjaC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RvdGFsID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbkdldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9SZWFjaC5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuTWFzdWsub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2luZGV4IC0+OicgKyBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXF1ZXN0U2lnbkhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX3RvdGFsKys7XG4gICAgICAgICAgICAgICAgX2krKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNsb3NlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=