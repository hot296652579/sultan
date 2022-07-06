import { Config } from "../common/config/Config";
import NumberUtils from "../common/utils/NumberUtils";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HallBetRankItem extends UIView {
    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Node)
    gamesNode: cc.Node = null;

    @property(cc.Node)
    playerNode: cc.Node = null;
    @property(cc.Sprite)
    iconGame: cc.Sprite = null;

    onLoad() {
        super.onLoad();
        // this.node.opacity = 0;
    }

    public updateItem(data, itemId) {
        // this.gold.string = UtilMgr.changeMoney(data.gold);

        let labGame = this.gamesNode.getChildByName('labGame').getComponent(cc.Label);
        let nick = this.playerNode.getChildByName('nick').getComponent(cc.Label);
        let imgAvatar = this.playerNode.getChildByName('imgAvatar').getComponent(cc.Sprite);
        labGame.string = data.gameName;
        nick.string = data.Nick;
        // this.gold.string = `Rp ${data.Score}`;
        this.gold.string = NumberUtils.converToC(data.Score);
        this.refreshGameIcon(data);
        if (data.headImgUrl)
            UtilMgr.loadHeadImg(imgAvatar, data.headImgUrl, data.headImgUrl, this)

    }

    refreshGameIcon(data) {
        let games = Config.games
        let gameName = data.gameName;
        let imgUrl = `hall/images/domino/icon_${games[gameName].disName}_new`;
        console.log(imgUrl)
        this.iconGame.loadImage({ url: imgUrl, view: this, bundle: BUNDLE_RESOURCES })
    }

    onClick(event) {
        console.log(event)
    }

    // update (dt) {}
}
