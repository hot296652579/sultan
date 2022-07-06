import UIView from "../framework/ui/UIView";
import { i18n } from "../common/language/LanguageImpl";
import { reStartGame } from "../global/Global";
import { Manager } from "../common/manager/Manager";
import RechargePayView from "../recharge/RechargePayView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnterRealFieldNotiPanel extends UIView {

    @property(cc.Label)
    lbl_content: cc.Label = null;
    public static getPrefabUrl(): string {
        return "MultiCurrency/prefabs/EnterRealFieldNotiPanel"
    }
    show() {
        this.content = this.node.getChildByName("content")
        this.showWithAction(true);
        this.lbl_content.string = i18n.EXPERIENCE_FIELD.enterRealField;
        Manager.uiManager.close(RechargePayView);
    }
    onClick() {
        // this.closeWithAction();
        reStartGame();
    }
}
