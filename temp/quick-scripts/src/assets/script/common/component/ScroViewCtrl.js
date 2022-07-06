"use strict";
cc._RF.push(module, '74479PUJG5NM6xwH1yGzl+1', 'ScroViewCtrl');
// script/common/component/ScroViewCtrl.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScroViewPlus_1 = __importDefault(require("./ScroViewPlus"));
const { ccclass, property } = cc._decorator;
let ScroViewCtrl = class ScroViewCtrl extends cc.Component {
    constructor() {
        super(...arguments);
        this.scroViewPlus = null;
        this.itemPrefab = null;
        this.itemScriptName = '';
        this.onItemClickCallback = null;
        this.dataList = [];
    }
    _initItem(itemId) {
        let itemNode = cc.instantiate(this.itemPrefab);
        itemNode.parent = this.scroViewPlus.content;
        let itemScriptCom = itemNode.getComponent(this.itemScriptName);
        itemScriptCom.updateItem(this.dataList[itemId], itemId, this.onItemClickCallback);
    }
    /**
     * 分帧加载
     * @param childNodeCount 子节点数量
     * @param removeHistoryChildren 是否删除历史子节点
     */
    framingLoad(childNodeCount, removeHistoryChildren = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // PanelHelp.showLoading(i18n.WAIT.LOADING);
            this.unscheduleAllCallbacks();
            if (removeHistoryChildren) {
                this.scroViewPlus.content.removeAllChildren();
            }
            yield this.executePreFrame(this._getItemGenerator(childNodeCount), 1);
            this.scroViewPlus.optDc();
            // PanelHelp.hideLoading()
        });
    }
    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    executePreFrame(generator, duration) {
        return new Promise((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = () => {
                // 执行之前，先记录开始时间
                let startTime = new Date().getTime();
                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next();; iter = gen.next()) {
                    // 判断是否已经执行完所有 Generator 的小代码段，如果是的话，那么就表示任务完成
                    if (iter == null || iter.done) {
                        resolve();
                        return;
                    }
                    // 每执行完一段小代码段，都检查一下是否已经超过我们分配的本帧，这些小代码端的最大可执行时间
                    if (new Date().getTime() - startTime > duration) {
                        // 如果超过了，那么本帧就不在执行，开定时器，让下一帧再执行
                        this.scheduleOnce(() => {
                            execute();
                        });
                        return;
                    }
                }
            };
            // 运行执行函数
            execute();
        });
    }
    *_getItemGenerator(length) {
        for (let i = 0; i < length; i++) {
            yield this._initItem(i);
        }
    }
    removeItem(itemID) {
        this.scroViewPlus.content.children.forEach((removeItem, index) => {
            let _itemID = removeItem.getComponent(this.itemScriptName).getItemId();
            if (_itemID == itemID) {
                this.dataList.splice(itemID, 1);
                this.scroViewPlus.content.removeChild(removeItem);
            }
        });
        this.updateItem();
    }
    updateItem() {
        this.scroViewPlus.content.children.forEach((updateItem, itemId) => {
            updateItem.getComponent(this.itemScriptName).updateItem(this.dataList[itemId], itemId, this.onItemClickCallback);
        });
        this.scroViewPlus.content.getComponent(cc.Layout).updateLayout();
    }
};
__decorate([
    property(ScroViewPlus_1.default)
], ScroViewCtrl.prototype, "scroViewPlus", void 0);
__decorate([
    property(cc.Prefab)
], ScroViewCtrl.prototype, "itemPrefab", void 0);
__decorate([
    property(cc.String)
], ScroViewCtrl.prototype, "itemScriptName", void 0);
ScroViewCtrl = __decorate([
    ccclass
], ScroViewCtrl);
exports.default = ScroViewCtrl;

cc._RF.pop();