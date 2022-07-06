"use strict";
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