"use strict";
cc._RF.push(module, 'b1861msIH9JZ4RHTV7kew48', 'PBExtractPasswdView');
// script/piggyBank/PBExtractPasswdView.ts

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
const PBPasswdComponent_1 = __importDefault(require("./PBPasswdComponent"));
const { ccclass, property } = cc._decorator;
const MAX_DIGIT = 6;
let PBExtractPasswdView = class PBExtractPasswdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.edbPasswd1 = null;
        this.edbComponent1 = null;
        this.m_data = null;
    }
    static getPrefabUrl() {
        return "piggyBank/prefabs/PBExtractPasswdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    bindingEvents() {
        this.registerEvent("EVENT_EXTRACT_SUCCEED", this.onExtractSucceed);
    }
    show(data) {
        super.show(data);
        this.init();
        this.showWithAction(true);
        this.m_data = data[0];
    }
    initView() {
        this.edbPasswd1.string = "";
        this.edbComponent1 = this.edbPasswd1.getComponent(PBPasswdComponent_1.default);
    }
    initData() {
        this.m_data = null;
    }
    init() {
        this.initData();
        this.initView();
    }
    onClickClose() {
        this.playDefaultEffect("close");
        this.closeWithAction();
    }
    onClickConfirm() {
        this.playDefaultEffect();
        if (!this.isPasswordDigit()) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.PASSWORD_INCOMPLETE);
            return;
        }
        let req = CommonService_1.protoPackage.hall.ExtractAmountReq.create({ id: this.m_data.id, passwd: this.edbComponent1.string });
        let buffer = CommonService_1.protoPackage.hall.ExtractAmountReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT, buffer);
    }
    onExtractSucceed() {
        this.init();
        this.onClickClose();
    }
    /**
     * 是否6满足位数
     */
    isPasswordDigit() {
        let str1 = this.edbComponent1.string;
        if (str1.length !== MAX_DIGIT) {
            return false;
        }
        return true;
    }
};
__decorate([
    property(cc.EditBox)
], PBExtractPasswdView.prototype, "edbPasswd1", void 0);
PBExtractPasswdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PBExtractPasswdView);
exports.default = PBExtractPasswdView;

cc._RF.pop();