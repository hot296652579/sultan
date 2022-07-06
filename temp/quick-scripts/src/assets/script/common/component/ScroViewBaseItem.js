"use strict";
cc._RF.push(module, '975126ZKidEB4994WnfE6qD', 'ScroViewBaseItem');
// script/common/component/ScroViewBaseItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let ScroViewBaseItem = class ScroViewBaseItem extends cc.Component {
    updateItem(data, itemId) {
        //cc.assert(itemId || itemId == 0, "itemId is undefined")
        this._data = data;
        this._itemId = itemId;
    }
    getItemId() {
        return this._itemId;
    }
};
ScroViewBaseItem = __decorate([
    ccclass
], ScroViewBaseItem);
exports.default = ScroViewBaseItem;

cc._RF.pop();