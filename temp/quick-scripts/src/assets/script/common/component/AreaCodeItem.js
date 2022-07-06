"use strict";
cc._RF.push(module, '3e5c58CAYlN9b4truMS1FTv', 'AreaCodeItem');
// script/common/component/AreaCodeItem.ts

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
const Manager_1 = require("../manager/Manager");
const ScroViewBaseItem_1 = __importDefault(require("./ScroViewBaseItem"));
const { ccclass, property } = cc._decorator;
let AreaCodeItem = class AreaCodeItem extends ScroViewBaseItem_1.default {
    constructor() {
        super(...arguments);
        this.nameLabel = null;
        this.codeLabel = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            dispatch('AreaCodeInfo', this._data);
        }, this);
    }
    updateItem(data, itemId) {
        super.updateItem(data, itemId);
        this.nameLabel.string = data.En;
        if (Manager_1.Manager.language.getLanguage() == cc.sys.LANGUAGE_CHINESE) {
            this.nameLabel.string = data.Zh;
        }
        this.codeLabel.string = data.Code;
    }
};
__decorate([
    property(cc.Label)
], AreaCodeItem.prototype, "nameLabel", void 0);
__decorate([
    property(cc.Label)
], AreaCodeItem.prototype, "codeLabel", void 0);
AreaCodeItem = __decorate([
    ccclass
], AreaCodeItem);
exports.default = AreaCodeItem;

cc._RF.pop();