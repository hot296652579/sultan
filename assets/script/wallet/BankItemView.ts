import { Config } from "../common/config/Config";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BankItemView extends UIView {
    @property(cc.Node)
    gouNode: cc.Node = null;
    @property(cc.Node)
    BankIcon: cc.Node = null;
    @property(cc.Label)
    BankName: cc.Label = null;

    @property(cc.Node)
    choosed: cc.Node = null;
    @property(cc.Node)
    choosedImg: cc.Node = null;

    @property(cc.Node)
    iconHot: cc.Node = null;

    _itemClickCallback: any = null

    _itemId: number = 0
    parent: any;

    onLoad() {
        super.onLoad();
    }

    updateItem(data, itemId, onClickCallback, parent) {
        // this.gold.string = UtilMgr.changeMoney(data.gold);
        // UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
        this._itemId = itemId
        this.parent = parent
        this._itemClickCallback = onClickCallback
        this.updateData(data)
    }

    onItemClick(event, type) {
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId, this.parent)
        }
    }

    updateData(data) {
        this.BankName.string = data.bankCode;
    }

    onClick(event) {
        console.log(event)
    }

    // update (dt) {}
}
