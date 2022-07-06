"use strict";
cc._RF.push(module, '4f052qb3zVJB7pROFaM4Y9p', 'GlobalAt');
// script/GlobalAt.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataManager_1 = __importDefault(require("./common/manager/DataManager"));
const URLManager_1 = __importDefault(require("./common/manager/URLManager"));
const Logger_1 = __importDefault(require("./framework/log/Logger"));
const ShareHelpder_1 = __importDefault(require("./Helpder/ShareHelpder/ShareHelpder"));
class GlobalAt {
    constructor() {
        window.G = this;
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new GlobalAt();
        }
        return this.s_instance;
    }
    static destroy() {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }
    /**
     * 日志访问器
     * @return {Logger} 日志管理器
     */
    get Logger() {
        return Logger_1.default.getInstance();
    }
    get ShareHelpder() {
        return ShareHelpder_1.default.getInstance();
    }
    get URLMgr() {
        return URLManager_1.default.getInstance();
    }
    get DataMgr() {
        return DataManager_1.default.getInstance();
    }
    destroy() {
        delete window.G;
    }
}
exports.default = GlobalAt;
GlobalAt.s_instance = new GlobalAt();

cc._RF.pop();