"use strict";
cc._RF.push(module, 'e0668hISX1IKb0nVNxA0bhf', 'AreasItem');
// script/userInfo/AreasItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = require("../common/manager/Manager");
const Defines_1 = require("../framework/base/Defines");
const { ccclass, property } = cc._decorator;
let AreasItem = class AreasItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.areaName = null;
        this._itemId = 0;
        this._itemClickCallback = null;
        // update (dt) {}
    }
    onLoad() {
    }
    updateItem(data, itemId, onClickCallback) {
        this._itemId = itemId;
        this._itemClickCallback = onClickCallback;
        this.areaName.string = data;
    }
    onItemClick(event, type) {
        Manager_1.Manager.globalAudio.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
        if (this._itemClickCallback) {
            this._itemClickCallback(event.target, this._itemId);
        }
    }
    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }
    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }
};
__decorate([
    property(cc.Label)
], AreasItem.prototype, "areaName", void 0);
AreasItem = __decorate([
    ccclass
], AreasItem);
exports.default = AreasItem;

cc._RF.pop();