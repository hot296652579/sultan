import ScroViewBaseItem from "../common/component/ScroViewBaseItem";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LeaderBoardItem extends ScroViewBaseItem {
    @property(cc.Label)
    index: cc.Label = null;

    @property(cc.Label)
    uname: cc.Label = null;

    @property(cc.Label)
    reward: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Node)
    icon1: cc.Node = null;

    @property(cc.Node)
    icon2: cc.Node = null;

    @property(cc.Node)
    icon3: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    bg2: cc.Node = null;

    @property(UIView)
    view: UIView = null;

    onLoad() {
        this.icon1.active = false;
        this.icon2.active = false;
        this.icon3.active = false;
        this.index.string = "";
    }

    updateItem(data,itemId) {
        super.updateItem(data, itemId);
        if(data){
            if (data.rank == 1) {
                this.icon1.active = true;
                this.index.string = "";
            } else if (data.rank == 2) {
                this.icon2.active = true;
                this.index.string = "";
            } else if (data.rank == 3) {
                this.icon3.active = true;
                this.index.string = "";
            } else {
                this.icon1.active = false;
                this.icon2.active = false;
                this.icon3.active = false;
                this.index.string = data.rank;
            }
    
            this.bg.active = data.userId === User._userID;
            this.bg2.active = !this.bg.active; 
            this.uname.string = UtilMgr.setString(data.nickname);
            this.gold.string = UtilMgr.changeMoney(data.winGold,true,true);
            this.reward.string = UtilMgr.changeMoney(data.reward);
            this.reward.node.color = new cc.Color().fromHEX(data.rank <= 3 ? "#7DFFFD" : "#00FF66");
            this.reward.fontSize = data.rank <= 3 ? 30 : 24;
            UtilMgr.loadHeadImg(this.head, data.headImg, data.userId, this.view)
        }
      
    }
}
