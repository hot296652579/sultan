import { UtilMgr } from "../global/UtilMgr";
import RechargeView from "./RechargeView";
import { protoPackage, serverType } from "../common/net/CommonService";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GoodsItem extends cc.Component {

    @property(cc.Sprite)
    chipIcon: cc.Sprite = null

    @property(cc.RichText)
    amount1: cc.RichText = null

    @property(cc.Label)
    amount2: cc.Label = null

    @property([cc.SpriteFrame])
    chipFrame: cc.SpriteFrame[] = []

    _rechargeView: RechargeView = null

    _itemId: number = 0

    onLoad() {

    }

    init(rechargeView, itemData, itemId) {
        this._rechargeView = rechargeView
        this._itemId = itemId

        if (itemData.give) {
            this.amount1.string ='<color=#ffffff>'+UtilMgr.changeMoney(itemData.gold)+'+ </c><color=#EFED30>'+UtilMgr.changeMoney(itemData.give)+'</color>'
        }else{
            this.amount1.string = UtilMgr.changeMoney(itemData.gold)
        }
      
        this.amount2.string = UtilMgr.changeMoney(itemData.nowPrice)

        let spriteFrame = this.chipFrame[itemId] ? this.chipFrame[itemId] : this.chipFrame[this.chipFrame.length - 1]
        this.chipIcon.spriteFrame = spriteFrame
    }

    onClickItem() {
        this._rechargeView.onClickGoodsItem(this._itemId)
    }

    //start() {}

    // update (dt) {}
}
