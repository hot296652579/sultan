"use strict";
cc._RF.push(module, 'ac073IfM0JC7YKJma4V8Fuq', 'GuideExitView');
// script/common/view/GuideExitView.ts

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
const UIView_1 = __importDefault(require("../../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let GuideExitView = class GuideExitView extends UIView_1.default {
    constructor() {
        super(...arguments);
        // 引导退出回调接口
        this.m_callbackInterface = null;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('imgBg');
    }
    start() {
    }
    static getPrefabUrl() {
        return "common/prefabs/GuideExitView";
    }
    show(args) {
        super.show(args);
        // this.showWithAction(true);
        this.m_callbackInterface = args[0];
    }
    onClickYes() {
        if (this.m_callbackInterface.yesCallback) {
            this.m_callbackInterface.yesCallback();
        }
        // this.closeWithAction();
        this.close();
    }
    onClickNo() {
        if (this.m_callbackInterface.noCallback) {
            this.m_callbackInterface.noCallback();
        }
        // this.closeWithAction();
        this.close();
    }
    onClick(name) {
        switch (name) {
            case "btnYes":
                this.onClickYes();
                break;
            case "btnNo":
                this.onClickNo();
                break;
        }
    }
};
GuideExitView = __decorate([
    ccclass
], GuideExitView);
exports.default = GuideExitView;

cc._RF.pop();