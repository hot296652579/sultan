"use strict";
cc._RF.push(module, 'aef19i0aeFBvY497I6IWj/K', 'Logic');
// script/common/base/Logic.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logic = void 0;
const LogicEvent_1 = require("../event/LogicEvent");
const EventComponent_1 = __importDefault(require("../../framework/base/EventComponent"));
const Defines_1 = require("../../framework/base/Defines");
const ResourceLoader_1 = __importDefault(require("../../framework/assetManager/ResourceLoader"));
const EventApi_1 = require("../../framework/event/EventApi");
const Config_1 = require("../config/Config");
/**
 * @description 逻辑控制器 需要实现LogicInterface
*/
class Logic extends EventComponent_1.default {
    constructor() {
        super();
        this.logTag = `[Logic]`;
        this._loader = null;
        this.logicType = LogicEvent_1.LogicType.UNKNOWN;
        this._loader = new ResourceLoader_1.default();
        //绑定加载器获取资源的回调
        this._loader.getLoadResources = this.getLoadResources.bind(this);
        //绑定加载器加载资源完成回调
        this._loader.onLoadComplete = this.onLoadResourceComplete.bind(this);
        this._loader.onLoadProgress = this.onLoadResourceProgress.bind(this);
    }
    bindingEvents() {
        super.bindingEvents();
        if (Defines_1.ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi_1.EventApi.CHANGE_LANGUAGE, this.onLanguageChange);
        }
    }
    get bundle() {
        cc.error(`请子类重写protected get bundle,返回游戏的包名,即 asset bundle name`);
        return "";
    }
    /**@description 进入各模块完成回调 */
    onEnterComplete(data) {
    }
    onLanguageChange() {
    }
    init(data) {
        if (this.logicType == LogicEvent_1.LogicType.UNKNOWN) {
            cc.error(`未对正确的对logicType赋值`);
        }
        this.node = data;
    }
    onLoad() {
        if (!!this.bundle) {
            Config_1.Config.assetBundle[`${this.bundle}`] = this.bundle;
        }
        else {
            cc.error(`请子类重写protected get bundle,返回游戏的包名,即 asset bundle name`);
        }
        super.onLoad();
    }
    onDestroy() {
        super.onDestroy();
        this.node = null;
    }
    /**@description 获取需要加载的资源 */
    getLoadResources() {
        return [];
    }
    /**@description 资源加载完成 */
    onLoadResourceComplete(err) {
    }
    /**@description 资源加载中 */
    onLoadResourceProgress(loadedCount, total, data) {
    }
    //移除网络组件
    removeNetComponent() {
    }
    //添加网络组件
    addNetComponent() {
    }
}
exports.Logic = Logic;

cc._RF.pop();