
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/component/ScroViewBaseItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld0Jhc2VJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsTUFBTSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzFDLElBQXFCLGdCQUFnQixHQUFyQyxNQUFxQixnQkFBaUIsU0FBUSxFQUFFLENBQUMsU0FBUztJQU90RCxVQUFVLENBQUMsSUFBSSxFQUFDLE1BQU07UUFFbEIseURBQXlEO1FBQ3pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFRCxTQUFTO1FBRUwsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7Q0FHSixDQUFBO0FBcEJvQixnQkFBZ0I7SUFEcEMsT0FBTztHQUNhLGdCQUFnQixDQW9CcEM7a0JBcEJvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9WaWV3QmFzZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnR7XG5cbiAgIFxuICAgIFxuICAgIF9pdGVtSWQ6IGFueTtcbiAgICBfZGF0YTogYW55O1xuXG4gICAgdXBkYXRlSXRlbShkYXRhLGl0ZW1JZClcbiAgICB7XG4gICAgICAgIC8vY2MuYXNzZXJ0KGl0ZW1JZCB8fCBpdGVtSWQgPT0gMCwgXCJpdGVtSWQgaXMgdW5kZWZpbmVkXCIpXG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9pdGVtSWQgPSBpdGVtSWQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUlkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtSWRcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19