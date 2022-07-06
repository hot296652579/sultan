"use strict";
cc._RF.push(module, 'a0e38G90gxL8aXstNSabbuQ', 'ConfirmBox');
// script/msgbox/ConfirmBox.ts

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
exports.ConfirmBoxBtnSprite = void 0;
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
exports.ConfirmBoxBtnSprite = {
    btn_Cancel: "btn_Cancel",
    btn_Confirm: "btn_Confirm",
    btn_Reset: "btn_Reset",
    btn_OK: "btn_OK",
    Go_to_bind_phone: "Go-to-bind-phone",
    btn_yes: "btn_yes",
    btn_no: "btn_no",
    btn_Recharge: "btn_Recharge",
    Update: "Update",
};
//需要动态加载的图标
const Dyn_Image = [exports.ConfirmBoxBtnSprite.Update, exports.ConfirmBoxBtnSprite.Go_to_bind_phone, exports.ConfirmBoxBtnSprite.btn_Cancel, exports.ConfirmBoxBtnSprite.btn_Reset,
    exports.ConfirmBoxBtnSprite.btn_OK, exports.ConfirmBoxBtnSprite.btn_yes, exports.ConfirmBoxBtnSprite.btn_no, exports.ConfirmBoxBtnSprite.btn_Confirm, , exports.ConfirmBoxBtnSprite.btn_Recharge];
const Path_EN = "common/images/tipsIcon/";
const Path_HI = "languageRes/hindi/common/tipsIcon/";
let ConfirmBox = class ConfirmBox extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        this.title = null;
        this.title_default = null;
        this.cancel_label = null;
        this.confirm_label = null;
        this.cancel = null;
        this.confirm = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "msgbox/prefabs/ConfirmBox";
    }
    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        this.okCall = null;
    }
    onEnable() {
        dispatch("showTipPop");
    }
    onDisable() {
        dispatch("hideTipPop");
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (this.args.length > 0) {
            let data = this.args[0];
            let title = data.title;
            let content = data.content;
            let isSingle = data.isSingle;
            let next = data.next || function () { };
            let cancel = data.cancel || function () { };
            let cancel_label = data.cancel_label;
            let confirm_label = data.confirm_label;
            this.showMsg(title, content, isSingle, next, cancel, cancel_label, confirm_label);
            this.autoclose = data.autoclose;
        }
        else {
            G.Logger.log('参数为空');
        }
    }
    /**
   * @param title 标题
   * @param content 提示内容
   * @param isSingle 是否显示单个确定按钮
   * @param next 确定回调
   * @param cancel 取消回调
   * @param cancel_label 取消按钮文本
   * @param confirm_label 确定按钮文本
   */
    showMsg(title, content, isSingle, next, cancel, cancel_label, confirm_label) {
        console.log("text", cancel_label, confirm_label);
        this.okCall = next;
        this.cannelCall = cancel;
        if (isSingle) {
            this.cancel.node.active = false;
        }
        if (title) {
            this.title.language = title;
            this.title.node.active = true;
            this.title_default.active = false;
        }
        if (content) {
            this.label.language = content;
        }
        if (cancel_label) {
            this.cancel_label.language = cancel_label;
            this.cancel_label.node.active = true;
        }
        if (confirm_label) {
            this.confirm_label.language = confirm_label;
            this.confirm_label.node.active = true;
        }
    }
    onClick(name, node) {
        switch (name) {
            case "cancel":
                this.cannelCall();
                break;
            case "confirm":
                this.okCall();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
        if (this.autoclose) {
            this.closeWithAction();
        }
    }
};
__decorate([
    property(cc.Label)
], ConfirmBox.prototype, "label", void 0);
__decorate([
    property(cc.Label)
], ConfirmBox.prototype, "title", void 0);
__decorate([
    property(cc.Node)
], ConfirmBox.prototype, "title_default", void 0);
__decorate([
    property(cc.Label)
], ConfirmBox.prototype, "cancel_label", void 0);
__decorate([
    property(cc.Label)
], ConfirmBox.prototype, "confirm_label", void 0);
__decorate([
    property(cc.Button)
], ConfirmBox.prototype, "cancel", void 0);
__decorate([
    property(cc.Button)
], ConfirmBox.prototype, "confirm", void 0);
ConfirmBox = __decorate([
    ccclass
], ConfirmBox);
exports.default = ConfirmBox;

cc._RF.pop();