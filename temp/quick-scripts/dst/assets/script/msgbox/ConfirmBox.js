
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/msgbox/ConfirmBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbXNnYm94L0NvbmZpcm1Cb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTRDO0FBTTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUNqQyxRQUFBLG1CQUFtQixHQUFHO0lBQzdCLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFNBQVMsRUFBRSxXQUFXO0lBQ3RCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLGdCQUFnQixFQUFFLGtCQUFrQjtJQUNwQyxPQUFPLEVBQUUsU0FBUztJQUNsQixNQUFNLEVBQUUsUUFBUTtJQUNoQixZQUFZLEVBQUUsY0FBYztJQUM1QixNQUFNLEVBQUUsUUFBUTtDQUNuQixDQUFBO0FBRUQsV0FBVztBQUNYLE1BQU0sU0FBUyxHQUFHLENBQUMsMkJBQW1CLENBQUMsTUFBTSxFQUFFLDJCQUFtQixDQUFDLGdCQUFnQixFQUFFLDJCQUFtQixDQUFDLFVBQVUsRUFBRSwyQkFBbUIsQ0FBQyxTQUFTO0lBQ2xKLDJCQUFtQixDQUFDLE1BQU0sRUFBRSwyQkFBbUIsQ0FBQyxPQUFPLEVBQUUsMkJBQW1CLENBQUMsTUFBTSxFQUFFLDJCQUFtQixDQUFDLFdBQVcsRUFBQyxBQUFDLEVBQUUsMkJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDekosTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUM7QUFDMUMsTUFBTSxPQUFPLEdBQUcsb0NBQW9DLENBQUM7QUFFckQsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUFXLFNBQVEsZ0JBQU07SUFBOUM7O1FBR0ksVUFBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBSTlCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGtCQUFhLEdB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LCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbmV4cG9ydCBsZXQgQ29uZmlybUJveEJ0blNwcml0ZSA9IHtcbiAgICBidG5fQ2FuY2VsOiBcImJ0bl9DYW5jZWxcIixcbiAgICBidG5fQ29uZmlybTogXCJidG5fQ29uZmlybVwiLFxuICAgIGJ0bl9SZXNldDogXCJidG5fUmVzZXRcIixcbiAgICBidG5fT0s6IFwiYnRuX09LXCIsXG4gICAgR29fdG9fYmluZF9waG9uZTogXCJHby10by1iaW5kLXBob25lXCIsXG4gICAgYnRuX3llczogXCJidG5feWVzXCIsXG4gICAgYnRuX25vOiBcImJ0bl9ub1wiLFxuICAgIGJ0bl9SZWNoYXJnZTogXCJidG5fUmVjaGFyZ2VcIixcbiAgICBVcGRhdGU6IFwiVXBkYXRlXCIsXG59XG5cbi8v6ZyA6KaB5Yqo5oCB5Yqg6L2955qE5Zu+5qCHXG5jb25zdCBEeW5fSW1hZ2UgPSBbQ29uZmlybUJveEJ0blNwcml0ZS5VcGRhdGUsIENvbmZpcm1Cb3hCdG5TcHJpdGUuR29fdG9fYmluZF9waG9uZSwgQ29uZmlybUJveEJ0blNwcml0ZS5idG5fQ2FuY2VsLCBDb25maXJtQm94QnRuU3ByaXRlLmJ0bl9SZXNldCxcbkNvbmZpcm1Cb3hCdG5TcHJpdGUuYnRuX09LLCBDb25maXJtQm94QnRuU3ByaXRlLmJ0bl95ZXMsIENvbmZpcm1Cb3hCdG5TcHJpdGUuYnRuX25vLCBDb25maXJtQm94QnRuU3ByaXRlLmJ0bl9Db25maXJtLCAsIENvbmZpcm1Cb3hCdG5TcHJpdGUuYnRuX1JlY2hhcmdlXVxuY29uc3QgUGF0aF9FTiA9IFwiY29tbW9uL2ltYWdlcy90aXBzSWNvbi9cIjtcbmNvbnN0IFBhdGhfSEkgPSBcImxhbmd1YWdlUmVzL2hpbmRpL2NvbW1vbi90aXBzSWNvbi9cIjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtQm94IGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0aXRsZV9kZWZhdWx0OiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNhbmNlbF9sYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvbmZpcm1fbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgY2FuY2VsOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgICBjb25maXJtOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgb2tDYWxsOiBGdW5jdGlvbjtcbiAgICBjYW5uZWxDYWxsOiBGdW5jdGlvbjtcbiAgICBhdXRvY2xvc2U6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwibXNnYm94L3ByZWZhYnMvQ29uZmlybUJveFwiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNjLmZpbmQoJ2NvbnRlbnQnLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm9rQ2FsbCA9IG51bGw7XG4gICAgfVxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBkaXNwYXRjaChcInNob3dUaXBQb3BcIilcbiAgICB9XG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBkaXNwYXRjaChcImhpZGVUaXBQb3BcIilcbiAgICB9XG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncylcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuYXJnc1swXTtcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IGRhdGEudGl0bGU7XG4gICAgICAgICAgICBsZXQgY29udGVudCA9IGRhdGEuY29udGVudDtcbiAgICAgICAgICAgIGxldCBpc1NpbmdsZSA9IGRhdGEuaXNTaW5nbGU7XG4gICAgICAgICAgICBsZXQgbmV4dCA9IGRhdGEubmV4dCB8fCBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgICAgICBsZXQgY2FuY2VsID0gZGF0YS5jYW5jZWwgfHwgZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICAgICAgbGV0IGNhbmNlbF9sYWJlbCA9IGRhdGEuY2FuY2VsX2xhYmVsO1xuICAgICAgICAgICAgbGV0IGNvbmZpcm1fbGFiZWwgPSBkYXRhLmNvbmZpcm1fbGFiZWw7XG4gICAgICAgICAgICB0aGlzLnNob3dNc2codGl0bGUsIGNvbnRlbnQsIGlzU2luZ2xlLCBuZXh0LCBjYW5jZWwsIGNhbmNlbF9sYWJlbCwgY29uZmlybV9sYWJlbCk7XG4gICAgICAgICAgICB0aGlzLmF1dG9jbG9zZSA9IGRhdGEuYXV0b2Nsb3NlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coJ+WPguaVsOS4uuepuicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgKiBAcGFyYW0gdGl0bGUg5qCH6aKYXG4gICAqIEBwYXJhbSBjb250ZW50IOaPkOekuuWGheWuuVxuICAgKiBAcGFyYW0gaXNTaW5nbGUg5piv5ZCm5pi+56S65Y2V5Liq56Gu5a6a5oyJ6ZKuXG4gICAqIEBwYXJhbSBuZXh0IOehruWumuWbnuiwg1xuICAgKiBAcGFyYW0gY2FuY2VsIOWPlua2iOWbnuiwg1xuICAgKiBAcGFyYW0gY2FuY2VsX2xhYmVsIOWPlua2iOaMiemSruaWh+acrFxuICAgKiBAcGFyYW0gY29uZmlybV9sYWJlbCDnoa7lrprmjInpkq7mlofmnKxcbiAgICovXG4gICAgc2hvd01zZyh0aXRsZSwgY29udGVudCwgaXNTaW5nbGUsIG5leHQsIGNhbmNlbCwgY2FuY2VsX2xhYmVsLCBjb25maXJtX2xhYmVsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGV4dFwiLCBjYW5jZWxfbGFiZWwsIGNvbmZpcm1fbGFiZWwpO1xuICAgICAgICB0aGlzLm9rQ2FsbCA9IG5leHQ7XG4gICAgICAgIHRoaXMuY2FubmVsQ2FsbCA9IGNhbmNlbDtcblxuICAgICAgICBpZiAoaXNTaW5nbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLmxhbmd1YWdlID0gdGl0bGU7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGl0bGVfZGVmYXVsdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbC5sYW5ndWFnZSA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbmNlbF9sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxfbGFiZWwubGFuZ3VhZ2UgPSBjYW5jZWxfbGFiZWw7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbF9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlybV9sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtX2xhYmVsLmxhbmd1YWdlID0gY29uZmlybV9sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybV9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrKG5hbWUsIG5vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2FuY2VsXCI6IHRoaXMuY2FubmVsQ2FsbCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjb25maXJtXCI6IHRoaXMub2tDYWxsKCk7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF1dG9jbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==