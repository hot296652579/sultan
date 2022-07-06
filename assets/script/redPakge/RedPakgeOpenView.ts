import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
const { ccclass, property } = cc._decorator;

@ccclass
export default class RedPakgeOpenView extends UIView {

    @property(cc.Label)
    amountLab: cc.Label = null
    @property(cc.Label)
    nameLab: cc.Label = null
    @property(cc.Sprite)
    head: cc.Sprite = null

    @property(cc.Sprite)
    head2: cc.Sprite = null

    @property(cc.Node)
    headNode: cc.Node = null

    @property(sp.Skeleton)
    hongbaoSpine: sp.Skeleton = null

    @property(sp.Skeleton)
    caidaiSpine: sp.Skeleton = null
    private _data: any = null;
    private isEnabledTouch: any = true;

    public static getPrefabUrl() {
        return "redPakge/prefabs/RedPakgeOpenView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

    }

    bindingEvents() {
        super.bindingEvents();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args) {
            if (args[0]) this._data = args[0]
        }
    }

    start() {
        this.hongbaoSpine.paused = true;
        this.caidaiSpine.paused = true;
        this.amountLab.node.parent.active = false;
        this.showContent()
    }
    showContent() {
        let data = this.getData()
        if (data) {
            G.Logger.log(data)
            this.isEnabledTouch = true
            this.hongbaoSpine.setAnimation(0, "newAnimation", false);
            this.caidaiSpine.setAnimation(0, "newAnimation", false);
            this.hongbaoSpine.paused = true;
            this.caidaiSpine.paused = true;
            this.amountLab.node.parent.active = false;
            this.headNode.active = true
            UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this)
            UtilMgr.loadHeadImg(this.head2, data.headImgUrl, data.userId, this)
            this.amountLab.string = "₹" + UtilMgr.changeMoney(data.receiveAmount)
            this.nameLab.string = UtilMgr.setString(data.nickname)
        }
    }
    getData() {
        if (!this._data || !this._data[0]) {
            return null;
        }
        return this._data[0];
    }
    removeData() {
        if (this._data[0]) this._data.splice(0, 1);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();

                break;
            case "onClickNode": this.showRedPakge(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    private showRedPakge() {
        let data = this.getData()
        if (data && this.isEnabledTouch) {

            this.isEnabledTouch = false
            this.hongbaoSpine.paused = false;
            this.caidaiSpine.paused = false;
            this.hongbaoSpine.setAnimation(0, "newAnimation", false);
            this.caidaiSpine.setAnimation(0, "newAnimation", false);
            this.amountLab.node.parent.active = false;


            this.scheduleOnce(() => {
                this.audioHelper.playEffect("common/audio/openRedpackge", BUNDLE_RESOURCES);
                this.headNode.active = false
                this.amountLab.node.parent.active = true;
            }, 0.6)

            this.scheduleOnce(() => {
                this.removeData()
                this.showContent()
            }, 1.5)
        }
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        super.onDestroy()
    }

}
