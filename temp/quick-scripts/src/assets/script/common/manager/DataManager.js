"use strict";
cc._RF.push(module, '8b1060tm2FGbr6zzK6trgyu', 'DataManager');
// script/common/manager/DataManager.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseManager_1 = __importDefault(require("../../framework/base/BaseManager"));
class DataManager extends BaseManager_1.default {
    constructor() {
        super();
        // 数据注册结构 Map<数据类名, 数据>
        this.m_dataMap = null;
        this.m_dataMap = new Map();
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new DataManager();
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
     * 销毁 清理所有数据
     */
    destroy() {
        this.m_dataMap.forEach((value, key, map) => {
            value.destroy();
        });
        this.m_dataMap.clear();
        this.m_dataMap = null;
    }
    /**
     * 获取数据对象
     * @param dataClass 数据类
     * @returns {BaseData} 数据对象
     */
    get(dataClass) {
        let className = cc.js.getClassName(dataClass);
        let baseData = this.m_dataMap.get(className);
        if (baseData === undefined || baseData === null) {
            baseData = this.add(dataClass);
        }
        return baseData;
    }
    /**
     * 添加数据
     * @param dataClass {DataInterface.DataClass<T>} 数据类
     */
    add(dataClass) {
        let className = cc.js.getClassName(dataClass);
        if (this.m_dataMap === null) {
            G.Logger.warn(`添加 ${className} 数据失败`);
            return;
        }
        let baseData = this.m_dataMap.get(className);
        if (baseData) {
            G.Logger.warn(`已经存在 ${className} 对象`);
            return baseData;
        }
        baseData = new dataClass();
        this.m_dataMap.set(className, baseData);
        return baseData;
    }
    /**
     * 删除数据
     */
    del(dataClass) {
        let className = cc.js.getClassName(dataClass);
        if (this.m_dataMap === null) {
            return;
        }
        let baseData = this.m_dataMap.get(className);
        if (baseData) {
            baseData.destroy();
            this.m_dataMap.delete(className);
        }
    }
}
exports.default = DataManager;
DataManager.s_instance = null;

cc._RF.pop();