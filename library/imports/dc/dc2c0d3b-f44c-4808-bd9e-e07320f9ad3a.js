"use strict";
cc._RF.push(module, 'dc2c0079ExICL2e4HMg+a06', 'LogicManager');
// script/common/manager/LogicManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicManager = void 0;
const LogicEvent_1 = require("../event/LogicEvent");
const Manager_1 = require("./Manager");
class LogicManager {
    constructor() {
        this._logTag = `[LogicManager]`;
        this._logics = [];
        this._logicTypes = [];
        this.node = null;
    }
    static Instance() { return this._instance || (this._instance = new LogicManager()); }
    push(logicType) {
        for (let i = 0; i < this._logicTypes.length; i++) {
            if (this._logicTypes[i] == logicType) {
                cc.error(this._logTag, `重复添加${cc.js.getClassName(logicType)}`);
                return;
            }
        }
        if (this.node) {
            //已经进入过onLoad,这里需要单独的进行初始化
            let logic = new logicType;
            logic.init(this.node);
            this._logics.push(logic);
            logic.onLoad();
        }
        else {
            this._logicTypes.push(logicType);
        }
    }
    onLoad(node) {
        this.node = node;
        Manager_1.Manager.eventDispatcher.addEventListener(LogicEvent_1.LogicEvent.ENTER_COMPLETE, this.onEnterComplete, this);
        if (this._logics.length == 0) {
            for (let i = 0; i < this._logicTypes.length; i++) {
                let type = this._logicTypes[i];
                cc.log(this._logTag, `添加Logic : ${cc.js.getClassName(type)}`);
                let logic = new type;
                logic.init(node);
                this._logics.push(logic);
            }
        }
        this._logics.forEach((data) => {
            data.onLoad();
        });
    }
    onDestroy(node) {
        Manager_1.Manager.eventDispatcher.removeEventListener(LogicEvent_1.LogicEvent.ENTER_COMPLETE, this);
        this._logics.forEach((data) => {
            data.onDestroy();
        });
    }
    onEnterComplete(data) {
        //房间列表会直接加在大厅上，不对界面进行关闭操作
        if (data.type != LogicEvent_1.LogicType.ROOM_LIST) {
            if (data && data.views && data.views.length > 0) {
                //关闭掉除排除项之外的所有界面
                Manager_1.Manager.uiManager.closeExcept(data.views);
            }
            for (let i = 0; i < this._logics.length; i++) {
                let logic = this._logics[i];
                if (logic) {
                    logic.onEnterComplete(data);
                }
            }
        }
    }
}
exports.LogicManager = LogicManager;
LogicManager._instance = null;

cc._RF.pop();