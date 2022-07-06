import { Manager } from "../common/manager/Manager";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AreasItem extends cc.Component {

    @property(cc.Label)
    areaName: cc.Label = null

    _itemId: number = 0

    _itemClickCallback: any = null

    onLoad() {
    }

    updateItem(data, itemId, onClickCallback) {
        this._itemId = itemId
        this._itemClickCallback = onClickCallback

        this.areaName.string =  data;
    }

    onItemClick(event, type) {
        Manager.globalAudio.playEffect("common/audio/click", BUNDLE_RESOURCES);
        if (this._itemClickCallback) {
            this._itemClickCallback(event.target, this._itemId)
        }
    }

    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }

    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }

    // update (dt) {}
}
