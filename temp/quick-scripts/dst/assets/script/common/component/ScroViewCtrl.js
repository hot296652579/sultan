
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/ScroViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74479PUJG5NM6xwH1yGzl+1', 'ScroViewCtrl');
// script/common/component/ScroViewCtrl.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScroViewPlus_1 = __importDefault(require("./ScroViewPlus"));
const { ccclass, property } = cc._decorator;
let ScroViewCtrl = class ScroViewCtrl extends cc.Component {
    constructor() {
        super(...arguments);
        this.scroViewPlus = null;
        this.itemPrefab = null;
        this.itemScriptName = '';
        this.onItemClickCallback = null;
        this.dataList = [];
    }
    _initItem(itemId) {
        let itemNode = cc.instantiate(this.itemPrefab);
        itemNode.parent = this.scroViewPlus.content;
        let itemScriptCom = itemNode.getComponent(this.itemScriptName);
        itemScriptCom.updateItem(this.dataList[itemId], itemId, this.onItemClickCallback);
    }
    /**
     * 分帧加载
     * @param childNodeCount 子节点数量
     * @param removeHistoryChildren 是否删除历史子节点
     */
    framingLoad(childNodeCount, removeHistoryChildren = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // PanelHelp.showLoading(i18n.WAIT.LOADING);
            this.unscheduleAllCallbacks();
            if (removeHistoryChildren) {
                this.scroViewPlus.content.removeAllChildren();
            }
            yield this.executePreFrame(this._getItemGenerator(childNodeCount), 1);
            this.scroViewPlus.optDc();
            // PanelHelp.hideLoading()
        });
    }
    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    executePreFrame(generator, duration) {
        return new Promise((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = () => {
                // 执行之前，先记录开始时间
                let startTime = new Date().getTime();
                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next();; iter = gen.next()) {
                    // 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve();
                        return;
                    }
                    // 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        this.scheduleOnce(() => {
                            execute();
                        });
                        return;
                    }
                }
            };
            // 运行执行函数
            execute();
        });
    }
    *_getItemGenerator(length) {
        for (let i = 0; i < length; i++) {
            yield this._initItem(i);
        }
    }
    removeItem(itemID) {
        this.scroViewPlus.content.children.forEach((removeItem, index) => {
            let _itemID = removeItem.getComponent(this.itemScriptName).getItemId();
            if (_itemID == itemID) {
                this.dataList.splice(itemID, 1);
                this.scroViewPlus.content.removeChild(removeItem);
            }
        });
        this.updateItem();
    }
    updateItem() {
        this.scroViewPlus.content.children.forEach((updateItem, itemId) => {
            updateItem.getComponent(this.itemScriptName).updateItem(this.dataList[itemId], itemId, this.onItemClickCallback);
        });
        this.scroViewPlus.content.getComponent(cc.Layout).updateLayout();
    }
};
__decorate([
    property(ScroViewPlus_1.default)
], ScroViewCtrl.prototype, "scroViewPlus", void 0);
__decorate([
    property(cc.Prefab)
], ScroViewCtrl.prototype, "itemPrefab", void 0);
__decorate([
    property(cc.String)
], ScroViewCtrl.prototype, "itemScriptName", void 0);
ScroViewCtrl = __decorate([
    ccclass
], ScroViewCtrl);
exports.default = ScroViewCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxrRUFBMEM7QUFFMUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBYSxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXREOztRQUdJLGlCQUFZLEdBQWlCLElBQUksQ0FBQztRQUdsQyxlQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBRWIsd0JBQW1CLEdBQVEsSUFBSSxDQUFBO1FBRS9CLGFBQVEsR0FBUSxFQUFFLENBQUE7SUF3RjdCLENBQUM7SUF0RlcsU0FBUyxDQUFDLE1BQWM7UUFDNUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUM1QyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM5RCxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQ3JGLENBQUM7SUFHRDs7OztPQUlHO0lBQ0csV0FBVyxDQUFDLGNBQXNCLEVBQUUsd0JBQWlDLElBQUk7O1lBQzNFLDRDQUE0QztZQUM1QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtZQUM3QixJQUFJLHFCQUFxQixFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxD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QUFBO0FBbEdHO0lBREMsUUFBUSxDQUFDLHNCQUFZLENBQUM7a0RBQ1c7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDUztBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNBO0FBVEgsWUFBWTtJQURoQyxPQUFPO0dBQ2EsWUFBWSxDQXFHaEM7a0JBckdvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCBTY3JvVmlld1BsdXMgZnJvbSBcIi4vU2Nyb1ZpZXdQbHVzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvVmlld0N0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KFNjcm9WaWV3UGx1cylcbiAgICBzY3JvVmlld1BsdXM6IFNjcm9WaWV3UGx1cyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3RyaW5nKVxuICAgIGl0ZW1TY3JpcHROYW1lID0gJyc7XG5cbiAgICBwdWJsaWMgb25JdGVtQ2xpY2tDYWxsYmFjazogYW55ID0gbnVsbFxuXG4gICAgcHVibGljIGRhdGFMaXN0OiBhbnkgPSBbXVxuXG4gICAgcHJpdmF0ZSBfaW5pdEl0ZW0oaXRlbUlkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGl0ZW1Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmFiKTtcbiAgICAgICAgaXRlbU5vZGUucGFyZW50ID0gdGhpcy5zY3JvVmlld1BsdXMuY29udGVudDtcbiAgICAgICAgbGV0IGl0ZW1TY3JpcHRDb20gPSBpdGVtTm9kZS5nZXRDb21wb25lbnQodGhpcy5pdGVtU2NyaXB0TmFtZSlcbiAgICAgICAgaXRlbVNjcmlwdENvbS51cGRhdGVJdGVtKHRoaXMuZGF0YUxpc3RbaXRlbUlkXSwgaXRlbUlkLCB0aGlzLm9uSXRlbUNsaWNrQ2FsbGJhY2spXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDliIbluKfliqDovb1cbiAgICAgKiBAcGFyYW0gY2hpbGROb2RlQ291bnQg5a2Q6IqC54K55pWw6YePXG4gICAgICogQHBhcmFtIHJlbW92ZUhpc3RvcnlDaGlsZHJlbiDmmK/lkKbliKDpmaTljoblj7LlrZDoioLngrlcbiAgICAgKi9cbiAgICBhc3luYyBmcmFtaW5nTG9hZChjaGlsZE5vZGVDb3VudDogbnVtYmVyLCByZW1vdmVIaXN0b3J5Q2hpbGRyZW46IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIC8vIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuTE9BRElORyk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpXG4gICAgICAgIGlmIChyZW1vdmVIaXN0b3J5Q2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb1ZpZXdQbHVzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmV4ZWN1dGVQcmVGcmFtZSh0aGlzLl9nZXRJdGVtR2VuZXJhdG9yKGNoaWxkTm9kZUNvdW50KSwgMSk7XG4gICAgICAgIHRoaXMuc2Nyb1ZpZXdQbHVzLm9wdERjKCk7XG4gICAgICAgIC8vIFBhbmVsSGVscC5oaWRlTG9hZGluZygpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YiG5bin5omn6KGMIEdlbmVyYXRvciDpgLvovpFcbiAgICAgKlxuICAgICAqIEBwYXJhbSBnZW5lcmF0b3Ig55Sf5oiQ5ZmoXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIOaMgee7reaXtumXtO+8iG1z77yJ77yM5q+P5qyh5omn6KGMIEdlbmVyYXRvciDnmoTmk43kvZzml7bvvIzmnIDplb/lj6/mjIHnu63miafooYzml7bplb/jgILlgYforr7lgLzkuLo4bXPvvIzpgqPkuYjooajnpLox5bin77yI5oC75YWxMTZtc++8ieS4i++8jOWIhuWHujhtc+aXtumXtOe7meatpOmAu+i+keaJp+ihjFxuICAgICAqL1xuICAgIHByaXZhdGUgZXhlY3V0ZVByZUZyYW1lKGdlbmVyYXRvcjogR2VuZXJhdG9yLCBkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgZ2VuID0gZ2VuZXJhdG9yO1xuICAgICAgICAgICAgLy8g5Yib5bu65omn6KGM5Ye95pWwXG4gICAgICAgICAgICBsZXQgZXhlY3V0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDmiafooYzkuYvliY3vvIzlhYjorrDlvZXlvIDlp4vml7bpl7RcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgICAgICAgICAvLyDnhLblkI7kuIDnm7Tku44gR2VuZXJhdG9yIOS4reiOt+WPluW3sue7j+aLhuWIhuWlveeahOS7o+eggeauteWHuuadpeaJp+ihjFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZXIgPSBnZW4ubmV4dCgpOyA7IGl0ZXIgPSBnZW4ubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWIpOaWreaYr+WQpuW3sue7j+aJp+ihjOWujOaJgOaciSBHZW5lcmF0b3Ig55qE5bCP5Luj56CB5q6177yM5aaC5p6c5piv55qE6K+d77yM6YKj5LmI5bCx6KGo56S65Lu75Yqh5a6M5oiQXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyID09IG51bGwgfHwgaXRlci5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyDmr4/miafooYzlrozkuIDmrrXlsI/ku6PnoIHmrrXvvIzpg73mo4Dmn6XkuIDkuIvmmK/lkKblt7Lnu4/otoXov4fmiJHku6zliIbphY3nmoTmnKzluKfvvIzov5nkupvlsI/ku6PnoIHnq6/nmoTmnIDlpKflj6/miafooYzml7bpl7RcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lID4gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOi2hei/h+S6hu+8jOmCo+S5iOacrOW4p+WwseS4jeWcqOaJp+ihjO+8jOW8gOWumuaXtuWZqO+8jOiuqeS4i+S4gOW4p+WGjeaJp+ihjFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8g6L+Q6KGM5omn6KGM5Ye95pWwXG4gICAgICAgICAgICBleGVjdXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgKl9nZXRJdGVtR2VuZXJhdG9yKGxlbmd0aDogbnVtYmVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHlpZWxkIHRoaXMuX2luaXRJdGVtKGkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZW1vdmVJdGVtKGl0ZW1JRCkge1xuICAgICAgICB0aGlzLnNjcm9WaWV3UGx1cy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKHJlbW92ZUl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQgX2l0ZW1JRCA9IHJlbW92ZUl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMuaXRlbVNjcmlwdE5hbWUpLmdldEl0ZW1JZCgpO1xuICAgICAgICAgICAgaWYgKF9pdGVtSUQgPT0gaXRlbUlEKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTGlzdC5zcGxpY2UoaXRlbUlELCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9WaWV3UGx1cy5jb250ZW50LnJlbW92ZUNoaWxkKHJlbW92ZUl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbSgpIHtcbiAgICAgICAgdGhpcy5zY3JvVmlld1BsdXMuY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKCh1cGRhdGVJdGVtLCBpdGVtSWQpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUl0ZW0uZ2V0Q29tcG9uZW50KHRoaXMuaXRlbVNjcmlwdE5hbWUpLnVwZGF0ZUl0ZW0odGhpcy5kYXRhTGlzdFtpdGVtSWRdLCBpdGVtSWQsIHRoaXMub25JdGVtQ2xpY2tDYWxsYmFjayk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjcm9WaWV3UGx1cy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLnVwZGF0ZUxheW91dCgpO1xuICAgIH1cbn1cbiJdfQ==