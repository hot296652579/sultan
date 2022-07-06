
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/manager/NetManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '66c69HMa7REJ56z+Yr2Gqpk', 'NetManager');
// script/common/manager/NetManager.ts

"use strict";
/**
 * @description 全局的网络组件管理
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetManager = void 0;
class NetManager {
    constructor() {
        this._logTag = `[ActionManager]`;
        this._seqId = 0;
        this.controllers = [];
    }
    static Instance() {
        if (!this._instance) {
            this._instance = new NetManager();
        }
        return this._instance;
    }
    /**@description 网络控制器添加 */
    push(controller) {
        for (let i = 0; i < this.controllers.length; i++) {
            if (this.controllers[i] == controller) {
                cc.error(this._logTag, `重复添加${cc.js.getClassName(controller)}`);
                return;
            }
        }
        console.log(`网络控制器添加${cc.js.getClassName(controller)}`);
        this.controllers.push(controller);
        if (this.mainNode) {
            this.mainNode.addComponent(controller);
        }
    }
    addNetControllers(node) {
        this.mainNode = node;
        for (let i = 0; i < this.controllers.length; i++) {
            let controller = this.controllers[i];
            if (controller) {
                node.addComponent(controller);
            }
        }
    }
    removeNetControllers(node) {
        for (let i = 0; i < this.controllers.length; i++) {
            let controller = this.controllers[i];
            if (controller) {
                node.removeComponent(controller);
            }
        }
    }
    getNewSeqId() {
        return this._seqId++;
    }
}
exports.NetManager = NetManager;
NetManager._instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL21hbmFnZXIvTmV0TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7OztBQUVILE1BQWEsVUFBVTtJQUF2QjtRQUNZLFlBQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUc1QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBaURuQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBL0NVLE1BQU0sQ0FBQyxRQUFRO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsMEJBQTBCO0lBQ25CLElBQUksQ0FBQyxVQUFlO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUFFO2dCQUNuQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hFLE9BQU87YUFDVjtTQUNKO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxJQUFhO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksVUFBVSxFQUFFO2dCQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakM7U0FDSjtJQUNMLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxJQUFhO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksVUFBVSxFQUFFO2dCQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDcEM7U0FDSjtJQUNMLENBQUM7SUFFTSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7QUFuREwsZ0NBc0RDO0FBcERrQixvQkFBUyxHQUFlLElBQUksQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGRlc2NyaXB0aW9uIOWFqOWxgOeahOe9kee7nOe7hOS7tueuoeeQhlxuICovXG5cbmV4cG9ydCBjbGFzcyBOZXRNYW5hZ2VyIHtcbiAgICBwcml2YXRlIF9sb2dUYWcgPSBgW0FjdGlvbk1hbmFnZXJdYDtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE5ldE1hbmFnZXIgPSBudWxsO1xuICAgIG1haW5Ob2RlOiBjYy5Ob2RlO1xuICAgIHByaXZhdGUgX3NlcUlkOiBudW1iZXIgPSAwO1xuXG5cbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBOZXRNYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDnvZHnu5zmjqfliLblmajmt7vliqAgKi9cbiAgICBwdWJsaWMgcHVzaChjb250cm9sbGVyOiBhbnkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRyb2xsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyc1tpXSA9PSBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IodGhpcy5fbG9nVGFnLCBg6YeN5aSN5re75YqgJHtjYy5qcy5nZXRDbGFzc05hbWUoY29udHJvbGxlcil9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGDnvZHnu5zmjqfliLblmajmt7vliqAke2NjLmpzLmdldENsYXNzTmFtZShjb250cm9sbGVyKX1gKTtcblxuICAgICAgICB0aGlzLmNvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG4gICAgICAgIGlmICh0aGlzLm1haW5Ob2RlKSB7XG4gICAgICAgICAgICB0aGlzLm1haW5Ob2RlLmFkZENvbXBvbmVudChjb250cm9sbGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhZGROZXRDb250cm9sbGVycyhub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMubWFpbk5vZGUgPSBub2RlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udHJvbGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb250cm9sbGVyID0gdGhpcy5jb250cm9sbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hZGRDb21wb25lbnQoY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlTmV0Q29udHJvbGxlcnMobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udHJvbGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb250cm9sbGVyID0gdGhpcy5jb250cm9sbGVyc1tpXTtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDb21wb25lbnQoY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TmV3U2VxSWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcUlkKys7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb250cm9sbGVycyA9IFtdO1xufSJdfQ==