
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/ScroViewLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '197a6lAYWtPB6Ey6D+xShF6', 'ScroViewLogic');
// script/common/component/ScroViewLogic.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let ScroViewLogic = class ScroViewLogic extends cc.Component {
    constructor() {
        super(...arguments);
        this.item = null;
        this.scrollView = null;
        this.maxSpawnCount = 9;
        this.maxTotalCount = 50;
        this.bufferZone = 300;
        this.spacing = 10;
        this.itemScriptName = '';
        // update (dt) {}
    }
    // onLoad () {}
    start() {
    }
    initUI(datas) {
        this.resetData();
        this._datas = datas || [];
        this._spawnCount = datas.length < this.maxSpawnCount ? datas.length : this.maxSpawnCount;
        this._totalCount = datas.length < this.maxTotalCount ? datas.length : this.maxTotalCount;
        cc.log("实例化条数： " + this._spawnCount);
        cc.log("总条数： " + this._totalCount);
        cc.log("数据条数：" + this._datas.length);
        // this._isOpenUpdate = this._spawnCount < this.viewCount
        this.initialize();
        this.schedule(this.onUpdate, 0.08);
    }
    addItem(data) {
        if (this.scrollView.content.childrenCount == 0) {
            this.initUI([data]);
            return;
        }
        this.scrollView.content.height = (this._totalCount + 1) * (this.item.height + this.spacing) + this.spacing;
        this._totalCount = this._totalCount + 1;
        this._datas.push(data);
        // if(this.maxSpawnCount < this.viewCount)
        if (this._spawnCount < this.maxSpawnCount) {
            this.createItem(data, this._spawnCount);
            this._spawnCount += 1;
        }
    }
    resetData() {
        if (this.onUpdate) {
            this.unschedule(this.onUpdate);
        }
        this.scrollView.content.destroyAllChildren();
        // this.updateTimer = 0;
        // this.updateInterval = 0.2;
        this.lastContentPosY = 0;
        this._spawnCount = 0;
        this._totalCount = 0;
        this._datas = [];
        this.itemMgr = [];
    }
    initialize() {
        this.scrollView.content.height = this._totalCount * (this.item.height + this.spacing) + this.spacing;
        for (let i = 0; i < this._spawnCount; ++i) {
            let datas = this.getDatas();
            this.createItem(datas[i], i);
        }
    }
    getDatas() {
        return this._datas;
    }
    createItem(data, i) {
        let item = cc.instantiate(this.item);
        this.scrollView.content.addChild(item);
        item.active = true;
        item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
        item.getComponent('' + this.itemScriptName).updateItem(data, i);
        this.itemMgr.push(item);
    }
    removeItem(itemID) {
        let itemNode = this.itemMgr.splice(itemID, 1);
        this.scrollView.content.removeChild(itemNode[0]);
    }
    getPositionInView(item) {
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }
    onUpdate(dt) {
        let items = this.itemMgr;
        if (items.length < 1) {
            return;
        }
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY;
        let offset = (items[0].height + this.spacing) * items.length;
        let datas = this.getDatas();
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent('' + this.itemScriptName);
                    let itemId = item.getItemId() - items.length;
                    item.updateItem(datas[itemId], itemId);
                }
            }
            else {
                if (viewPos.y > buffer && items[i].y - offset > -this.scrollView.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('' + this.itemScriptName);
                    let itemId = item.getItemId() + items.length;
                    item.updateItem(datas[itemId], itemId);
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
    }
};
__decorate([
    property(cc.Node)
], ScroViewLogic.prototype, "item", void 0);
__decorate([
    property(cc.ScrollView)
], ScroViewLogic.prototype, "scrollView", void 0);
__decorate([
    property({
        type: cc.Integer,
        displayName: "实例item最大数"
    })
], ScroViewLogic.prototype, "maxSpawnCount", void 0);
__decorate([
    property({
        type: cc.Integer,
        displayName: "数据最大数"
    })
], ScroViewLogic.prototype, "maxTotalCount", void 0);
__decorate([
    property(cc.Integer)
], ScroViewLogic.prototype, "bufferZone", void 0);
__decorate([
    property(cc.Integer)
], ScroViewLogic.prototype, "spacing", void 0);
__decorate([
    property(cc.String)
], ScroViewLogic.prototype, "itemScriptName", void 0);
ScroViewLogic = __decorate([
    ccclass
], ScroViewLogic);
exports.default = ScroViewLogic;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0xvZ2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGFBQWEsR0FBbEMsTUFBcUIsYUFBYyxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXZEOztRQUdJLFNBQUksR0FBWSxJQUFJLENBQUM7UUFHckIsZUFBVSxHQUFrQixJQUFJLENBQUM7UUFNakMsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFNbEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFHbkIsZUFBVSxHQUFHLEdBQUcsQ0FBQztRQUdqQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUEwSHBCLGlCQUFpQjtJQUNyQixDQUFDO0lBaEhHLGVBQWU7SUFFZixLQUFLO0lBRUwsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLO1FBQ1IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6RixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6RixFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEMsRUFB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a0JBckpvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvVmlld0xvZ2ljIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGl0ZW06IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxuICAgICAgICBkaXNwbGF5TmFtZTogXCLlrp7kvotpdGVt5pyA5aSn5pWwXCJcbiAgICB9KVxuICAgIG1heFNwYXduQ291bnQgPSA5O1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5pWw5o2u5pyA5aSn5pWwXCJcbiAgICB9KVxuICAgIG1heFRvdGFsQ291bnQgPSA1MDtcblxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIGJ1ZmZlclpvbmUgPSAzMDA7XG5cbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcbiAgICBzcGFjaW5nID0gMTA7XG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBpdGVtU2NyaXB0TmFtZSA9ICcnO1xuXG4gICAgcHJpdmF0ZSBfZGF0YXM6IGFueTtcbiAgICBwcml2YXRlIF9zcGF3bkNvdW50OiBhbnk7XG4gICAgcHJpdmF0ZSBfdG90YWxDb3VudDogYW55O1xuICAgIGl0ZW1NZ3I6IGFueVtdO1xuICAgIGxhc3RDb250ZW50UG9zWTogbnVtYmVyO1xuXG5cblxuXG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cbiAgICBpbml0VUkoZGF0YXMpIHtcbiAgICAgICAgdGhpcy5yZXNldERhdGEoKTtcbiAgICAgICAgdGhpcy5fZGF0YXMgPSBkYXRhcyB8fCBbXVxuICAgICAgICB0aGlzLl9zcGF3bkNvdW50ID0gZGF0YXMubGVuZ3RoIDwgdGhpcy5tYXhTcGF3bkNvdW50ID8gZGF0YXMubGVuZ3RoIDogdGhpcy5tYXhTcGF3bkNvdW50O1xuICAgICAgICB0aGlzLl90b3RhbENvdW50ID0gZGF0YXMubGVuZ3RoIDwgdGhpcy5tYXhUb3RhbENvdW50ID8gZGF0YXMubGVuZ3RoIDogdGhpcy5tYXhUb3RhbENvdW50O1xuICAgICAgICBjYy5sb2coXCLlrp7kvovljJbmnaHmlbDvvJogXCIgKyB0aGlzLl9zcGF3bkNvdW50KVxuICAgICAgICBjYy5sb2coXCLmgLvmnaHmlbDvvJogXCIgKyB0aGlzLl90b3RhbENvdW50KVxuICAgICAgICBjYy5sb2coXCLmlbDmja7mnaHmlbDvvJpcIiArIHRoaXMuX2RhdGFzLmxlbmd0aClcbiAgICAgICAgLy8gdGhpcy5faXNPcGVuVXBkYXRlID0gdGhpcy5fc3Bhd25Db3VudCA8IHRoaXMudmlld0NvdW50XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMub25VcGRhdGUsIDAuMDgpO1xuICAgIH1cbiAgICBhZGRJdGVtKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmNoaWxkcmVuQ291bnQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VUkoW2RhdGFdKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuaGVpZ2h0ID0gKHRoaXMuX3RvdGFsQ291bnQgKyAxKSAqICh0aGlzLml0ZW0uaGVpZ2h0ICsgdGhpcy5zcGFjaW5nKSArIHRoaXMuc3BhY2luZztcbiAgICAgICAgdGhpcy5fdG90YWxDb3VudCA9IHRoaXMuX3RvdGFsQ291bnQgKyAxO1xuICAgICAgICB0aGlzLl9kYXRhcy5wdXNoKGRhdGEpXG4gICAgICAgIC8vIGlmKHRoaXMubWF4U3Bhd25Db3VudCA8IHRoaXMudmlld0NvdW50KVxuICAgICAgICBpZiAodGhpcy5fc3Bhd25Db3VudCA8IHRoaXMubWF4U3Bhd25Db3VudCkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJdGVtKGRhdGEsIHRoaXMuX3NwYXduQ291bnQpXG4gICAgICAgICAgICB0aGlzLl9zcGF3bkNvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXREYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5vblVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMub25VcGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgICAgIC8vIHRoaXMudXBkYXRlVGltZXIgPSAwO1xuICAgICAgICAvLyB0aGlzLnVwZGF0ZUludGVydmFsID0gMC4yO1xuICAgICAgICB0aGlzLmxhc3RDb250ZW50UG9zWSA9IDA7XG4gICAgICAgIHRoaXMuX3NwYXduQ291bnQgPSAwXG4gICAgICAgIHRoaXMuX3RvdGFsQ291bnQgPSAwXG4gICAgICAgIHRoaXMuX2RhdGFzID0gW107XG4gICAgICAgIHRoaXMuaXRlbU1nciA9IFtdO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LmhlaWdodCA9IHRoaXMuX3RvdGFsQ291bnQgKiAodGhpcy5pdGVtLmhlaWdodCArIHRoaXMuc3BhY2luZykgKyB0aGlzLnNwYWNpbmc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc3Bhd25Db3VudDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmdldERhdGFzKClcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSXRlbShkYXRhc1tpXSwgaSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERhdGFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YXNcbiAgICB9XG5cbiAgICBjcmVhdGVJdGVtKGRhdGEsIGkpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pO1xuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5hZGRDaGlsZChpdGVtKTtcbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBpdGVtLnNldFBvc2l0aW9uKDAsIC1pdGVtLmhlaWdodCAqICgwLjUgKyBpKSAtIHRoaXMuc3BhY2luZyAqIChpICsgMSkpO1xuICAgICAgICBpdGVtLmdldENvbXBvbmVudCgnJyArIHRoaXMuaXRlbVNjcmlwdE5hbWUpLnVwZGF0ZUl0ZW0oZGF0YSwgaSk7XG4gICAgICAgIHRoaXMuaXRlbU1nci5wdXNoKGl0ZW0pO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0oaXRlbUlEKSB7XG4gICAgICAgIGxldCBpdGVtTm9kZSA9IHRoaXMuaXRlbU1nci5zcGxpY2UoaXRlbUlELCAxKTtcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQucmVtb3ZlQ2hpbGQoaXRlbU5vZGVbMF0pO1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uSW5WaWV3KGl0ZW0pIHtcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gaXRlbS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGl0ZW0ucG9zaXRpb24pO1xuICAgICAgICBsZXQgdmlld1BvcyA9IHRoaXMuc2Nyb2xsVmlldy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcbiAgICAgICAgcmV0dXJuIHZpZXdQb3M7XG4gICAgfVxuICAgIG9uVXBkYXRlKGR0KSB7XG5cbiAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5pdGVtTWdyO1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyWm9uZTtcbiAgICAgICAgbGV0IGlzRG93biA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnkgPCB0aGlzLmxhc3RDb250ZW50UG9zWTtcbiAgICAgICAgbGV0IG9mZnNldCA9IChpdGVtc1swXS5oZWlnaHQgKyB0aGlzLnNwYWNpbmcpICogaXRlbXMubGVuZ3RoO1xuICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmdldERhdGFzKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICBsZXQgdmlld1BvcyA9IHRoaXMuZ2V0UG9zaXRpb25JblZpZXcoaXRlbXNbaV0pO1xuXG4gICAgICAgICAgICBpZiAoaXNEb3duKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodmlld1Bvcy55IDwgLWJ1ZmZlciAmJiBpdGVtc1tpXS55ICsgb2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS55ID0gaXRlbXNbaV0ueSArIG9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtc1tpXS5nZXRDb21wb25lbnQoJycgKyB0aGlzLml0ZW1TY3JpcHROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1JZCA9IGl0ZW0uZ2V0SXRlbUlkKCkgLSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlSXRlbShkYXRhc1tpdGVtSWRdLCBpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2aWV3UG9zLnkgPiBidWZmZXIgJiYgaXRlbXNbaV0ueSAtIG9mZnNldCA+IC10aGlzLnNjcm9sbFZpZXcuY29udGVudC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0ueSA9IGl0ZW1zW2ldLnkgLSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaV0uZ2V0Q29tcG9uZW50KCcnICsgdGhpcy5pdGVtU2NyaXB0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtSWQgPSBpdGVtLmdldEl0ZW1JZCgpICsgaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZUl0ZW0oZGF0YXNbaXRlbUlkXSwgaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19