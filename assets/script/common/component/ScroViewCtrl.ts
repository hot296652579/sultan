import PanelHelp from "../../msgbox/PanelHelp";
import { i18n } from "../language/LanguageImpl";
import ScroViewPlus from "./ScroViewPlus";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScroViewCtrl extends cc.Component {

    @property(ScroViewPlus)
    scroViewPlus: ScroViewPlus = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.String)
    itemScriptName = '';

    public onItemClickCallback: any = null

    public dataList: any = []

    private _initItem(itemId: number) {
        let itemNode = cc.instantiate(this.itemPrefab);
        itemNode.parent = this.scroViewPlus.content;
        let itemScriptCom = itemNode.getComponent(this.itemScriptName)
        itemScriptCom.updateItem(this.dataList[itemId], itemId, this.onItemClickCallback)
    }


    /**
     * 分帧加载
     * @param childNodeCount 子节点数量
     * @param removeHistoryChildren 是否删除历史子节点
     */
    async framingLoad(childNodeCount: number, removeHistoryChildren: boolean = true) {
        // PanelHelp.showLoading(i18n.WAIT.LOADING);
        this.unscheduleAllCallbacks()
        if (removeHistoryChildren) {
            this.scroViewPlus.content.removeAllChildren();
        }
        await this.executePreFrame(this._getItemGenerator(childNodeCount), 1);
        this.scroViewPlus.optDc();
        // PanelHelp.hideLoading()
    }

    /**
     * 分帧执行 Generator 逻辑
     *
     * @param generator 生成器
     * @param duration 持续时间（ms），每次执行 Generator 的操作时，最长可持续执行时长。假设值为8ms，那么表示1帧（总共16ms）下，分出8ms时间给此逻辑执行
     */
    private executePreFrame(generator: Generator, duration: number) {
        return new Promise<void>((resolve, reject) => {
            let gen = generator;
            // 创建执行函数
            let execute = () => {
                // 执行之前，先记录开始时间
                let startTime = new Date().getTime();

                // 然后一直从 Generator 中获取已经拆分好的代码段出来执行
                for (let iter = gen.next(); ; iter = gen.next()) {
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

    private *_getItemGenerator(length: number) {
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
}
