"use strict";
cc._RF.push(module, 'f4669YJDupOa5pHv/ZQ/ClJ', 'RollNotice');
// script/notice/RollNotice.ts

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
exports.RollNoticeLogic = void 0;
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let RollNotice = class RollNotice extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.Label = null;
        this.second = 10;
        // 一秒钟移动速度
        this.moveSize = 80;
        // update (dt) {}
    }
    onLoad() {
        super.onLoad();
        this.node.parent.active = true;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("rnotice.basestart", this.actionStart);
    }
    show(args) {
        super.show(args);
    }
    start() {
        this.actionStart();
    }
    getContent() {
        let contentData = exports.RollNoticeLogic.getContent();
        return contentData;
    }
    /**
    * 动画启动
    */
    actionStart() {
        if (this.Label.node.getNumberOfRunningActions())
            return;
        if (this.isAction)
            return;
        this._action();
    }
    /**
     * 动画流程
     */
    _action() {
        let content_data = this.getContent();
        if (!content_data) {
            this.node.parent.active = false;
            return;
        }
        this.node.parent.active = true;
        this.isAction = true;
        this.Label.string = this.formatContent(content_data);
        let movex = this.node.width / 2 + this.Label.node.width / 2 + 20;
        this.Label.node.x = movex;
        // let move_act = cc.moveTo(this.second, -movex, 0);
        // let call = cc.callFunc(()=>{
        //     if(!this.bolSpecial)ryyl.notice.removeContent();
        //     this.isAction = false;
        //     this._action();
        // })
        // this.content.runAction(cc.sequence(move_act, call))
        let second = Math.floor(movex / this.moveSize);
        cc.tween(this.Label.node)
            .to(second, { position: cc.v2(-movex, 0) })
            .call(() => {
            exports.RollNoticeLogic.removeContent();
            this.isAction = false;
            this._action();
        })
            .start();
    }
    formatContent(content) {
        let newContent = content.replace(/\[/g, "<");
        newContent = newContent.replace(/\]/g, ">");
        return newContent;
    }
};
__decorate([
    property(cc.RichText)
], RollNotice.prototype, "Label", void 0);
RollNotice = __decorate([
    ccclass
], RollNotice);
exports.default = RollNotice;
class _RollNoticeLogic {
    constructor() {
        this.content_list = [];
        /**
         * 非单局内出现的公告往后排
         * @param strContent string 公告内容
         */
        this.addContent = function (strContent) {
            this.content_list.push(strContent);
            if (this.content_list.length === 1) {
                dispatch("rnotice.basestart");
            }
            ;
        };
        /**
         * 对播放结束的列表进行清理
         */
        this.removeContent = function () {
            if (this.content_list[0])
                this.content_list.splice(0, 1);
        };
    }
    /**
     * 获取普通公告第一条
     */
    getContent() {
        if (!this.content_list[0]) {
            return null;
        }
        return this.content_list[0];
    }
}
exports.RollNoticeLogic = new _RollNoticeLogic();

cc._RF.pop();