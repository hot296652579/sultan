import { Manager } from "../framework/Framework";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WithdrawalItem extends cc.Component {

    @property(cc.Label)
    bankName: cc.Label = null

    @property(cc.Label)
    account: cc.Label = null

    @property(cc.Toggle)
    checkToggle: cc.Toggle = null

    _itemClickCallback: any = null

    _itemId: number = 0

    _changeId: number = null
    _data: any;

    onLoad() {
    }

    init(data, itemId, itemClickCallback) {
        this._itemId = itemId
        this._changeId = data.id
        this._data = data
        this._itemClickCallback = itemClickCallback
        this.bankName.string = data.bankName
        this.account.string = UtilMgr.setBankCardStringCover(data.bankCard)
        //this.checkToggle.node.active = itemId == 0

        let bankIndex = Manager.localStorage.getItem("selectBankIndex")
        if (!bankIndex) {
            this.checkToggle.isChecked = itemId == 0
            if (itemId == 0) {
                Manager.localStorage.setItem("selectBankIndex", 0)
            }
        } else {
            this.checkToggle.isChecked = itemId == bankIndex
        }
    }

    onItemClick(event, type) {
        Manager.localStorage.setItem("selectBankIndex", this._itemId)
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId)
        }
    }

    onClickChangeAccount(event, type) {
        dispatch("openBindChangeWithdrawalAccount", [2, this._data]);
    }

    // update (dt) {}
}
