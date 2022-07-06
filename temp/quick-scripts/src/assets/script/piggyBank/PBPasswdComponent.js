"use strict";
cc._RF.push(module, 'ccf96oXbshAQL+mOqY8Gh8W', 'PBPasswdComponent');
// script/piggyBank/PBPasswdComponent.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
// 密码字符
const PASSWORD_CHAR = "●";
let NewClass = class NewClass extends cc.Component {
    constructor() {
        super(...arguments);
        this.editBox = null;
        this.m_realContent = "";
        // update (dt) {}
    }
    onLoad() {
        this.register();
    }
    start() {
    }
    get string() {
        return this.m_realContent;
    }
    register() {
        this.editBox.node.on("editing-did-began", this.onDidBegan, this);
        this.editBox.node.on("editing-did-ended", this.onDidEnded, this);
        this.editBox.node.on("editing-return", this.onDidEnded, this);
        this.editBox.node.on("text-changed", this.onTextChanged, this);
    }
    onDidBegan(target) {
        this.editBox.string = this.m_realContent;
    }
    onDidEnded(target) {
        if (this.m_realContent.length <= 0) {
            return;
        }
        let reg = new RegExp(/^\d{1,}$/g);
        if (!reg.test(this.m_realContent)) {
            this.m_realContent = "";
            this.editBox.string = this.m_realContent;
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.MUST_6_DIGITS);
            return;
        }
        this.editBox.string = this.m_realContent.replace(/./g, () => {
            return PASSWORD_CHAR;
        });
    }
    onTextChanged(content) {
        this.m_realContent = content.string;
    }
};
__decorate([
    property(cc.EditBox)
], NewClass.prototype, "editBox", void 0);
NewClass = __decorate([
    ccclass
], NewClass);
exports.default = NewClass;

cc._RF.pop();