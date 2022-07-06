"use strict";
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