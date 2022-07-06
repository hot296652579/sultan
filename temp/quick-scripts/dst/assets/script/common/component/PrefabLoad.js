
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/PrefabLoad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '45a35G7vE1NBqqI1MLq5Svz', 'PrefabLoad');
// script/common/component/PrefabLoad.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
/**
 * 预加载prefab资源
 */
let PrefabLoad = class PrefabLoad extends cc.Component {
    constructor() {
        super(...arguments);
        this.PrefabList = [];
        // update (dt) {}
    }
    onLoad() {
    }
    start() {
    }
};
__decorate([
    property(cc.Prefab)
], PrefabLoad.prototype, "PrefabList", void 0);
PrefabLoad = __decorate([
    ccclass
], PrefabLoad);
exports.default = PrefabLoad;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9QcmVmYWJMb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRTFDOztHQUVHO0FBRUgsSUFBcUIsVUFBVSxHQUEvQixNQUFxQixVQUFXLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBcEQ7O1FBR0ksZUFBVSxHQUFpQixFQUFFLENBQUM7UUFVOUIsaUJBQWlCO0lBQ3JCLENBQUM7SUFSRyxNQUFNO0lBQ04sQ0FBQztJQUVELEtBQUs7SUFFTCxDQUFDO0NBR0osQ0FBQTtBQVhHO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ1U7QUFIYixVQUFVO0lBRDlCLE9BQU87R0FDYSxVQUFVLENBYzlCO2tCQWRvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIOmihOWKoOi9vXByZWZhYui1hOa6kFxuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlZmFiTG9hZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIFByZWZhYkxpc3Q6IGNjLlByZWZhYiBbXSA9IFtdO1xuXG5cbiAgICBvbkxvYWQgKCkge1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=