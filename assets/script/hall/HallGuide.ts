import { Manager } from "../common/manager/Manager";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { protoPackage, serverType } from "../common/net/CommonService";
import { injectService } from "../framework/decorator/Decorators";
import { LobbyService } from "../common/net/LobbyService";
import HallGameItem from "./HallGameItem";
import { i18n } from "../common/language/LanguageImpl";
import { UtilMgr } from "../global/UtilMgr";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class HallGuide extends UIView {
    service: LobbyService;

    @property(cc.Node)
    renwu: cc.Node = null;

    @property(cc.Node)
    kuang: cc.Node = null;

    @property(cc.Node)
    skip: cc.Node = null;

    @property(cc.Label)
    tipLabel: cc.Label = null;

    @property(cc.Sprite)
    userHead: cc.Sprite = null;

    hall: cc.Node;
    step: number;
    hallView: HallView;


    public static getPrefabUrl() {
        return "hall/prefabs/HallViewGuide";
    }

    onLoad() {
        super.onLoad()
        this.hall = this.node.getChildByName("hall")
        UtilMgr.loadHeadImg(this.userHead, User._headImgUrl, User._userID, this)
        this.hall.active = false
    }
    show(args) {
        super.show(args);
        if (args[0] && cc.js.getClassName(args[0]) == "HallView") {
            this.hallView = args[0]
            this.step = 0
            this.setStep()
        }

    }
    start() {
        if (this.kuang) {
            this.kuang.parent.getChildByName("Label").getComponent(cc.Label).language = i18n.GUIDE.continue;
        }
    }

    private setStep() {
        this.step++
        let wp
        switch (this.step) {
            case 1:
                this.hall.active = true
                this.hall.getChildByName("jiantou").active = false;
                this.skip.position = cc.v2(40, -180);
                this.tipLabel.node.position = cc.v2(-230, 55);
                break;
            case 2:
                this.hall.active = true
                wp = this.hallView.node.getChildByName('hall_top').getChildByName('head').convertToWorldSpaceAR(cc.v2(0, 0))
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp)
                this.hall.getChildByName("head").position = this.node.convertToNodeSpaceAR(wp)
                // this.hall.getChildByName("mask").setContentSize(cc.size(95, 95))
                this.hall.getChildByName("jiantou").active = true;
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y - this.hall.getChildByName("mask").height - 10 - 95;
                this.skip.position = cc.v2(40, -180);
                this.tipLabel.node.position = cc.v2(-230, 55);
                this.hall.getChildByName('head').active = true;
                break;
            case 3:
                this.hall.active = true
                wp = this.hallView.share.convertToWorldSpaceAR(cc.v2(0, 0))
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp)
                this.hall.getChildByName("share").position = this.node.convertToNodeSpaceAR(wp)
                // this.hall.getChildByName("mask").setContentSize(cc.size(62, 62))
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y - this.hall.getChildByName("mask").height - 30 - 62;
                this.hall.getChildByName('head').active = false;
                this.hall.getChildByName('share').active = true;
                this.renwu.scaleX = -1
                this.renwu.parent.x = - this.renwu.parent.x

                this.skip.position = cc.v2(-40, -180);
                this.tipLabel.node.position = cc.v2(-215, 55);
                this.kuang.scaleX = -1
                this.kuang.parent.x = this.kuang.parent.x + 200
                break;
            case 4:
                this.hall.active = true
                wp = this.hallView.daili.convertToWorldSpaceAR(cc.v2(0, 0))
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp)
                this.hall.getChildByName('daili').position = this.node.convertToNodeSpaceAR(wp);
                this.hall.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height + 120;
                this.hall.getChildByName("jiantou").scaleY = 1
                this.hall.getChildByName('share').active = false;
                this.hall.getChildByName('daili').active = true;
                this.renwu.scaleX = 1
                this.renwu.parent.x = - this.renwu.parent.x
                this.skip.position = cc.v2(40, -180);
                this.tipLabel.node.position = cc.v2(-230, 55);
                this.kuang.scaleX = 1
                this.kuang.parent.x = this.kuang.parent.x - 200
                break;

            case 5:
                this.hall.active = true
                wp = this.hallView.shop.convertToWorldSpaceAR(cc.v2(0, 0))
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp)
                this.hall.getChildByName("shop").position = this.node.convertToNodeSpaceAR(wp)
                this.hall.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                // this.hall.getChildByName("mask").setContentSize(cc.size(250, 88))
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height + 88
                this.hall.getChildByName('shop').active = true;
                this.hall.getChildByName('daili').active = false;
                this.renwu.parent.x = this.renwu.parent.x + 100
                this.kuang.parent.x = this.kuang.parent.x + 100
                this.skip.position = cc.v2(40, -180);
                break;

            case 6:
                this.hall.active = true
                this.hall.getChildByName("mask").position = cc.v2(0, 0)
                this.hall.getChildByName("mask").setContentSize(cc.size(0, 0))
                this.hall.getChildByName("jiantou").active = false
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height
                // this.renwu.parent.x = this.renwu.parent.x + 100
                // this.kuang.parent.x = this.kuang.parent.x + 100
                this.hall.getChildByName('shop').active = false;
                this.skip.position = cc.v2(40, -180);
                break;
            case 7:
                this.hall.active = true
                this.renwu.active = false
                this.kuang.parent.active = false
                if (this.hallView.scroll_gameList.content.children.length > 0) {
                    wp = this.hallView.scroll_gameList.content.children[2].convertToWorldSpaceAR(cc.v2(0, 0))
                }
                this.hall.getChildByName("mask").getComponent(cc.Mask).type = cc.Mask.Type.RECT;
                this.hall.getChildByName("mask").position = this.node.convertToNodeSpaceAR(wp)
                this.hall.getChildByName("mask").setContentSize(cc.size(263, 450))
                this.hall.getChildByName("jiantou").active = true
                this.hall.getChildByName("jiantou").x = this.hall.getChildByName("mask").x
                this.hall.getChildByName("jiantou").y = this.hall.getChildByName("mask").y + this.hall.getChildByName("mask").height / 2 + 50
                this.skip.position = cc.v2(120, -210);

                break;
            case 8:
                this.toGame();
                this.reqGuide()
                this.close()
                break;
            default:
                break;
        }
        if (this.step < 7) {
            this.showTipLabel()
        }

    }
    private showTipLabel() {
        this.tipLabel.language = Manager.makeLanguage("GUIDE.tip" + this.step);
    }
    private toGame() {
        let hallGameItem: HallGameItem = this.hallView.scroll_gameList.content.children[2].getComponent(HallGameItem) as HallGameItem;
        hallGameItem.onBtnClick('', '')
    }
    onClick(name, node) {
        switch (name) {
            case 'skip':
                this.node.active = false;
                this.reqGuide()
                UtilMgr.popWindows("openSignin")
                break;
            default:
                this.setStep()
                break;

        }

    }
    reqGuide() {
        G.Logger.log(User._gameIds, User._popWindows);
        if (User._gameIds.indexOf(2001) === -1) {
            let req = protoPackage.hall.ReqInsertNewPlayerGuid.create({ gameId: 2001 });
            let buffer = protoPackage.hall.ReqInsertNewPlayerGuid.encode(req).finish();
            this.service.sendMsg(serverType.Lobby,
                protoPackage.hall.HallCmd.CMD_ReqInsertNewPlayerGuid,
                buffer);
        }
    }
    // update (dt) {}
}
