import UIView from "../framework/ui/UIView";
import { i18n } from "../common/language/LanguageImpl";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GiveGoldNotiPanel extends UIView {

    @property(cc.Label)
    lbl_content: cc.Label = null;
    @property(cc.Label)
    lbl_count: cc.Label = null;

    public static getPrefabUrl() {
        return "MultiCurrency/prefabs/GiveGoldNotiPanel"
    }

    show(args) {
        let data = args[0];
        this.content = this.node.getChildByName("content")
        this.showWithAction(true)
        this.lbl_content.string = String.format(i18n.EXPERIENCE_FIELD.GiveGold, UtilMgr.changeMoney(data.reliefGold))
        this.lbl_count.string = String.format(i18n.EXPERIENCE_FIELD.residueCount, data.remainCount);
    }
    onClick() {
        this.closeWithAction();
    }
}
