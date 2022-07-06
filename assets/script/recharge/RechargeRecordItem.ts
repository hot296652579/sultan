import { UtilMgr } from "../global/UtilMgr";
import { i18n } from "../common/language/LanguageImpl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RechargeRecordItem extends cc.Component {

    @property(cc.Label)
    lbl_time: cc.Label = null;
    @property(cc.Label)
    lbl_commodity: cc.Label = null;
    @property(cc.Label)
    lbl_Amount: cc.Label = null;
    @property(cc.Label)
    lbl_state: cc.Label = null;

    onLoad() { }

    updateItem(obj) {
        this.lbl_time.string = new Date(obj.time).format('MM-dd hh:mm:ss');
        this.lbl_commodity.string = obj.commodity;
        this.lbl_Amount.string = UtilMgr.changeMoney(obj.amount);
        this.lbl_state.string = obj.state == 0 ? i18n.RECHARGE.WaitingPay : (obj.state == 1 ? i18n.RECHARGE.PaySuccess : i18n.RECHARGE.PayFailed);
        // 充值状态 0待支付 1支付成功
        this.lbl_state.node.color = cc.color().fromHEX(obj.state == 0 ? "FDE5EC" : (obj.state == 1 ? '00ff3c' : "fd1414"));
    }


}
