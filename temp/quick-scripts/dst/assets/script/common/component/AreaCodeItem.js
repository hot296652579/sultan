
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/AreaCodeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9BcmVhQ29kZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNkM7QUFDN0MsMEVBQWtEO0FBR2xELE1BQU0sRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUcxQyxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSwwQkFBZ0I7SUFBMUQ7O1FBR0ksY0FBUyxHQUFhLElBQUksQ0FBQztRQUczQixjQUFTLEdBQWEsSUFBSSxDQUFDO1FBbUIzQixpQkFBaUI7SUFDckIsQ0FBQztJQWpCRyxNQUFNO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDLEdBQUUsRUFBRTtZQUN6QyxRQUFRLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2QyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDWCxDQUFDO0lBRUQsVUFBVSxDQUFFLElBQUksRUFBQyxNQUFNO1FBQ25CLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7UUFDL0IsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7U0FDbEM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ3JDLENBQUM7Q0FHSixDQUFBO0FBdkJHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ1E7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDUTtBQU5WLFlBQVk7SUFEaEMsT0FBTztHQUNhLFlBQVksQ0EwQmhDO2tCQTFCb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgU2Nyb1ZpZXdCYXNlSXRlbSBmcm9tIFwiLi9TY3JvVmlld0Jhc2VJdGVtXCI7XG5cblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmVhQ29kZUl0ZW0gZXh0ZW5kcyBTY3JvVmlld0Jhc2VJdGVtIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb2RlTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xuICAgICAgICAgICAgZGlzcGF0Y2goJ0FyZWFDb2RlSW5mbycsdGhpcy5fZGF0YSlcbiAgICAgICAgfSx0aGlzKVxuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW0gKGRhdGEsaXRlbUlkKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZUl0ZW0oZGF0YSxpdGVtSWQpO1xuICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSBkYXRhLkVuXG4gICAgICAgIGlmIChNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCkgPT0gY2Muc3lzLkxBTkdVQUdFX0NISU5FU0UpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IGRhdGEuWmhcbiAgICAgICAgfVxuICAgICAgIFxuICAgICAgICB0aGlzLmNvZGVMYWJlbC5zdHJpbmcgPSBkYXRhLkNvZGVcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19