
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/notice/RollNotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbm90aWNlL1JvbGxOb3RpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQTRDO0FBRzVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixVQUFVLEdBQS9CLE1BQXFCLFVBQVcsU0FBUSxnQkFBTTtJQUE5Qzs7UUFHSSxVQUFLLEdBQWdCLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFVBQVU7UUFDVixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBNEVkLGlCQUFpQjtJQUNyQixDQUFDO0lBM0VHLE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLFdBQVcsR0FBRyx1QkFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7TUFFRTtJQUNGLFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQUUsT0FBTztRQUN4RCxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUVILElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNoQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDMUIsb0RBQW9EO1FBQ3BELCtCQUErQjtRQUMvQix1REFBdUQ7UUFDdkQsNkJBQTZCO1FBQzdCLHNCQUFzQjtRQUN0QixLQUFLO1FBQ0wsc0RBQXNEO1FBRXRELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM5QyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ3BCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUCx1QkFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztJQUVqQixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQU87UUFDakIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDNUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzNDLE9BQU8sVUFBVSxDQUFBO0lBQ3JCLENBQUM7Q0FHSixDQUFBO0FBakZHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7eUNBQ0k7QUFIVCxVQUFVO0lBRDlCLE9BQU87R0FDYSxVQUFVLENBb0Y5QjtrQkFwRm9CLFVBQVU7QUFzRi9CLE1BQU0sZ0JBQWdCO0lBQXRCO1FBQ0ksaUJBQVksR0FBRyxFQUFFLENBQUM7UUFZbEI7OztXQUdHO1FBQ0gsZUFBVSxHQUFHLFVBQVUsVUFBVTtZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDakM7WUFBQSxDQUFDO1FBQ04sQ0FBQyxDQUFDO1FBQ0Y7O1dBRUc7UUFDSCxrQkFBYSxHQUFHO1lBQ1osSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQXpCRzs7T0FFRztJQUNILFVBQVU7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FpQko7QUFDWSxRQUFBLGVBQWUsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRDb21wb25lbnQgZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0V2ZW50Q29tcG9uZW50XCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGxOb3RpY2UgZXh0ZW5kcyBVSVZpZXcge1xuXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxuICAgIExhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XG4gICAgaXNBY3Rpb246IGFueTtcbiAgICBzZWNvbmQ6IG51bWJlciA9IDEwO1xuICAgIC8vIOS4gOenkumSn+enu+WKqOmAn+W6plxuICAgIG1vdmVTaXplID0gODA7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXCJybm90aWNlLmJhc2VzdGFydFwiLCB0aGlzLmFjdGlvblN0YXJ0KTtcbiAgICB9XG5cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmFjdGlvblN0YXJ0KClcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICBsZXQgY29udGVudERhdGEgPSBSb2xsTm90aWNlTG9naWMuZ2V0Q29udGVudCgpO1xuICAgICAgICByZXR1cm4gY29udGVudERhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDliqjnlLvlkK/liqhcbiAgICAqL1xuICAgIGFjdGlvblN0YXJ0KCkge1xuICAgICAgICBpZiAodGhpcy5MYWJlbC5ub2RlLmdldE51bWJlck9mUnVubmluZ0FjdGlvbnMoKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5pc0FjdGlvbikgcmV0dXJuO1xuICAgICAgICB0aGlzLl9hY3Rpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliqjnlLvmtYHnqItcbiAgICAgKi9cbiAgICBfYWN0aW9uKCkge1xuXG4gICAgICAgIGxldCBjb250ZW50X2RhdGEgPSB0aGlzLmdldENvbnRlbnQoKTtcbiAgICAgICAgaWYgKCFjb250ZW50X2RhdGEpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNBY3Rpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLkxhYmVsLnN0cmluZyA9IHRoaXMuZm9ybWF0Q29udGVudChjb250ZW50X2RhdGEpO1xuICAgICAgICBsZXQgbW92ZXggPSB0aGlzLm5vZGUud2lkdGggLyAyICsgdGhpcy5MYWJlbC5ub2RlLndpZHRoIC8gMiArIDIwO1xuICAgICAgICB0aGlzLkxhYmVsLm5vZGUueCA9IG1vdmV4O1xuICAgICAgICAvLyBsZXQgbW92ZV9hY3QgPSBjYy5tb3ZlVG8odGhpcy5zZWNvbmQsIC1tb3ZleCwgMCk7XG4gICAgICAgIC8vIGxldCBjYWxsID0gY2MuY2FsbEZ1bmMoKCk9PntcbiAgICAgICAgLy8gICAgIGlmKCF0aGlzLmJvbFNwZWNpYWwpcnl5bC5ub3RpY2UucmVtb3ZlQ29udGVudCgpO1xuICAgICAgICAvLyAgICAgdGhpcy5pc0FjdGlvbiA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgdGhpcy5fYWN0aW9uKCk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIHRoaXMuY29udGVudC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobW92ZV9hY3QsIGNhbGwpKVxuXG4gICAgICAgIGxldCBzZWNvbmQgPSBNYXRoLmZsb29yKG1vdmV4IC8gdGhpcy5tb3ZlU2l6ZSlcbiAgICAgICAgY2MudHdlZW4odGhpcy5MYWJlbC5ub2RlKVxuICAgICAgICAgICAgLnRvKHNlY29uZCwgeyBwb3NpdGlvbjogY2MudjIoLW1vdmV4LCAwKSB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIFJvbGxOb3RpY2VMb2dpYy5yZW1vdmVDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FjdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgfVxuXG4gICAgZm9ybWF0Q29udGVudChjb250ZW50KSB7XG4gICAgICAgIGxldCBuZXdDb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXFsvZywgXCI8XCIpXG4gICAgICAgIG5ld0NvbnRlbnQgPSBuZXdDb250ZW50LnJlcGxhY2UoL1xcXS9nLCBcIj5cIilcbiAgICAgICAgcmV0dXJuIG5ld0NvbnRlbnRcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuXG5jbGFzcyBfUm9sbE5vdGljZUxvZ2ljIHtcbiAgICBjb250ZW50X2xpc3QgPSBbXTtcblxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5pmu6YCa5YWs5ZGK56ys5LiA5p2hXG4gICAgICovXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnRfbGlzdFswXSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudF9saXN0WzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpnZ7ljZXlsYDlhoXlh7rnjrDnmoTlhazlkYrlvoDlkI7mjpJcbiAgICAgKiBAcGFyYW0gc3RyQ29udGVudCBzdHJpbmcg5YWs5ZGK5YaF5a65IFxuICAgICAqL1xuICAgIGFkZENvbnRlbnQgPSBmdW5jdGlvbiAoc3RyQ29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRfbGlzdC5wdXNoKHN0ckNvbnRlbnQpO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50X2xpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChcInJub3RpY2UuYmFzZXN0YXJ0XCIpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICog5a+55pKt5pS+57uT5p2f55qE5YiX6KGo6L+b6KGM5riF55CGXG4gICAgICovXG4gICAgcmVtb3ZlQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudF9saXN0WzBdKSB0aGlzLmNvbnRlbnRfbGlzdC5zcGxpY2UoMCwgMSk7XG4gICAgfTtcbn1cbmV4cG9ydCBjb25zdCBSb2xsTm90aWNlTG9naWMgPSBuZXcgX1JvbGxOb3RpY2VMb2dpYygpXG4iXX0=