import TitleItemPageUser from "../../../../script/common/item/TitleItemPageUser";
import NumberUtils from "../../../../script/common/utils/NumberUtils";
import WingoData from "../data/WingoData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WingoTitleItemPageUser extends TitleItemPageUser {

    // Wingo 游戏数据
    public _wingoData: WingoData = null;

    onLoad() {
        super.onLoad();

    }

    protected initData(): void {
        super.initData();

        this._wingoData = G.DataMgr.get(WingoData);
    }

    protected onEvent_M2C_GoldChange_Mes(oldGold: number): void {
        if (this._wingoData.isPlayingLotteryAnim) {
            return;
        }

        this.refreshGold();
    }

    public manualRefreshGold(): void {
        if (!this._userData.isLogined()) {
            return;
        }

        this.refreshGold();
    }

}