import UIView from "../framework/ui/UIView";
import { i18n } from "../common/language/LanguageImpl";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { Manager } from "../common/manager/Manager";


const { ccclass, property } = cc._decorator;
export let ConfirmBoxBtnSprite = {
    btn_Cancel: "btn_Cancel",
    btn_Confirm: "btn_Confirm",
    btn_Reset: "btn_Reset",
    btn_OK: "btn_OK",
    Go_to_bind_phone: "Go-to-bind-phone",
    btn_yes: "btn_yes",
    btn_no: "btn_no",
    btn_Recharge: "btn_Recharge",
    Update: "Update",
}

//需要动态加载的图标
const Dyn_Image = [ConfirmBoxBtnSprite.Update, ConfirmBoxBtnSprite.Go_to_bind_phone, ConfirmBoxBtnSprite.btn_Cancel, ConfirmBoxBtnSprite.btn_Reset,
ConfirmBoxBtnSprite.btn_OK, ConfirmBoxBtnSprite.btn_yes, ConfirmBoxBtnSprite.btn_no, ConfirmBoxBtnSprite.btn_Confirm, , ConfirmBoxBtnSprite.btn_Recharge]
const Path_EN = "common/images/tipsIcon/";
const Path_HI = "languageRes/hindi/common/tipsIcon/";
@ccclass
export default class ConfirmBox extends UIView {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Node)
    title_default: cc.Node = null;


    @property(cc.Label)
    cancel_label: cc.Label = null;

    @property(cc.Label)
    confirm_label: cc.Label = null;

    @property(cc.Button)
    cancel: cc.Button = null;

    @property(cc.Button)
    confirm: cc.Button = null;

    okCall: Function;
    cannelCall: Function;
    autoclose: boolean;

    public static getPrefabUrl() {
        return "msgbox/prefabs/ConfirmBox";
    }

    onLoad() {
        super.onLoad();
        this.content = cc.find('content', this.node);
        this.okCall = null;
    }
    onEnable() {
        dispatch("showTipPop")
    }
    onDisable() {
        dispatch("hideTipPop")
    }
    show(args) {
        super.show(args)
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
            this.autoclose = data.autoclose
        } else {
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
            case "cancel": this.cannelCall(); break;
            case "confirm": this.okCall(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
        if (this.autoclose) {
            this.closeWithAction();
        }

    }

    // update (dt) {}
}
