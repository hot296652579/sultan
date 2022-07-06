"use strict";
cc._RF.push(module, '5b62be1xVVMz76HML7dzjeM', 'PhoneVerification');
// script/wallet/PhoneVerification.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let PhoneVerification = class PhoneVerification extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.showPhoneNode = null;
        this.editPhoneNode = null;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/PhoneVerification";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindingEvents() {
        super.bindingEvents();
    }
    start() {
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
            case 'btnReset':
                break;
            case 'btnConfirmation':
                this.confirmationHandler();
                break;
        }
    }
    confirmationHandler() {
        this.close();
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], PhoneVerification.prototype, "showPhoneNode", void 0);
__decorate([
    property(cc.Node)
], PhoneVerification.prototype, "editPhoneNode", void 0);
PhoneVerification = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PhoneVerification);
exports.default = PhoneVerification;

cc._RF.pop();