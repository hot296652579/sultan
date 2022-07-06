import EventComponent from "../framework/base/EventComponent";
import UIView from "../framework/ui/UIView";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RollNotice extends UIView {

    @property(cc.RichText)
    Label: cc.RichText = null;
    isAction: any;
    second: number = 10;
    // 一秒钟移动速度
    moveSize = 80;

    onLoad() {
        super.onLoad();
        this.node.parent.active = true;
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("rnotice.basestart", this.actionStart);
    }

    show(args) {
        super.show(args)
    }

    start() {
        this.actionStart()
    }

    getContent() {
        let contentData = RollNoticeLogic.getContent();
        return contentData;
    }

    /**
    * 动画启动
    */
    actionStart() {
        if (this.Label.node.getNumberOfRunningActions()) return;
        if (this.isAction) return;
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

        let second = Math.floor(movex / this.moveSize)
        cc.tween(this.Label.node)
            .to(second, { position: cc.v2(-movex, 0) })
            .call(() => {
                RollNoticeLogic.removeContent();
                this.isAction = false;
                this._action();
            })
            .start();

    }

    formatContent(content) {
        let newContent = content.replace(/\[/g, "<")
        newContent = newContent.replace(/\]/g, ">")
        return newContent
    }

    // update (dt) {}
}

class _RollNoticeLogic {
    content_list = [];


    /**
     * 获取普通公告第一条
     */
    getContent() {
        if (!this.content_list[0]) {
            return null;
        }
        return this.content_list[0];
    }
    /**
     * 非单局内出现的公告往后排
     * @param strContent string 公告内容 
     */
    addContent = function (strContent) {
        this.content_list.push(strContent);
        if (this.content_list.length === 1) {
            dispatch("rnotice.basestart");
        };
    };
    /**
     * 对播放结束的列表进行清理
     */
    removeContent = function () {
        if (this.content_list[0]) this.content_list.splice(0, 1);
    };
}
export const RollNoticeLogic = new _RollNoticeLogic()
