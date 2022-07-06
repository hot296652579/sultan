/**
 * @description 全局的网络组件管理
 */

export class NetManager {
    private _logTag = `[ActionManager]`;
    private static _instance: NetManager = null;
    mainNode: cc.Node;
    private _seqId: number = 0;


    public static Instance() {
        if (!this._instance) {
            this._instance = new NetManager();
        }
        return this._instance;
    }

    /**@description 网络控制器添加 */
    public push(controller: any) {
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

    public addNetControllers(node: cc.Node) {
        this.mainNode = node;
        for (let i = 0; i < this.controllers.length; i++) {
            let controller = this.controllers[i];
            if (controller) {
                node.addComponent(controller);
            }
        }
    }

    public removeNetControllers(node: cc.Node) {
        for (let i = 0; i < this.controllers.length; i++) {
            let controller = this.controllers[i];
            if (controller) {
                node.removeComponent(controller);
            }
        }
    }

    public getNewSeqId(): number {
        return this._seqId++;
    }

    private controllers = [];
}