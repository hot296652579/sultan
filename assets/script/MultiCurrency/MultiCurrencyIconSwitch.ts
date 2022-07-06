import EventComponent from "../framework/base/EventComponent";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { User } from "../global/User";
import UIView from "../framework/ui/UIView";

const { ccclass, property } = cc._decorator;
const _MultiCurrencyIconBaseUrl = 'MultiCurrency/images/icon/gold_'
enum GOLD_IMG_TYPE {
    Gold_White = 2,//
    Gold_Red = 3,
    Gold_Hearts = 4,
    Gold_Tournament = 5,
}
@ccclass
export default class MultiCurrencyIconSwitch extends UIView {

    @property({
        tooltip: "Gold_White:白色筹码，Gold_Red：红色筹码，Gold_Hearts：红心筹码",
        type: cc.Enum(GOLD_IMG_TYPE),
    })
    real_Gold_Type: GOLD_IMG_TYPE = GOLD_IMG_TYPE.Gold_White;
    sprite: cc.Sprite = null
    onLoad() {
        super.onLoad();
        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.toUpdataMultiCurrencyIcon();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("updataMultiCurrencyIcon", this.toUpdataMultiCurrencyIcon);
    }
    toUpdataMultiCurrencyIcon(goldSpriteName = null) {
        this.sprite.spriteFrame = null;
        //icon  0 是筹码 1是金币
        let url;
        if (goldSpriteName == null) {
            url = _MultiCurrencyIconBaseUrl + (User.isRechargedPlayer ? this.real_Gold_Type : User._goldType);
        } else {
            url = _MultiCurrencyIconBaseUrl + goldSpriteName;
        }

        this.sprite.loadImage({ url: url, view: this, bundle: BUNDLE_RESOURCES })
    }
}
