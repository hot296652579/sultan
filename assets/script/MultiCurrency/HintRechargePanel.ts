import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import { User } from "../global/User";
import { i18n } from "../common/language/LanguageImpl";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HintRechargePanel extends UIView {

    @property(cc.Label)
    lbl_god: cc.Label = null;
    @property(cc.Label)
    lbl_hit: cc.Label = null;

    static getPrefabUrl() {
        return "MultiCurrency/prefabs/HintRechargePanel"
    }

    show(args) {
        let goldTypeExchange = args[0];
        this.scheduleOnce(this.close, 3)
        this.lbl_god.string = UtilMgr.changeMoney(User._gold)
        this.lbl_hit.string = goldTypeExchange == 1 ? i18n.EXPERIENCE_FIELD.hintRecharge : i18n.EXPERIENCE_FIELD.hintChipCount;
    }
    playDefaultEffect(name = "") {
        switch (name) {
            case 'shop':
            case 'addGold':
                this.audioHelper.playEffect("common/audio/RechargeBtn", BUNDLE_RESOURCES);
                break;
            default: super.playDefaultEffect(name)
                break;
        }
    }
    onClick(name) {
        switch (name) {
            case "continue":
                break;
            case "addGold":
                dispatch("openRechargeView");
                break;
        }
        this.close();
    }
}
