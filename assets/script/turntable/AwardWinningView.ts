
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { Manager } from "../framework/Framework";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { shareType } from "../platform/android";
import AddressView from "./AddressView";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class AwardWinningView extends UIView implements IController<LobbyService> {

    service: LobbyService;


    @property(cc.Node)
    btn_share: cc.Node = null;

    @property(cc.Node)
    btn_spinAgain: cc.Node = null;

    @property(cc.Node)
    btn_address: cc.Node = null;

    @property(cc.Sprite)
    spr_Prize: cc.Sprite = null;

    @property(cc.Node)
    winNode: cc.Node = null;

    @property(cc.Node)
    loseNode: cc.Node = null;

    @property(cc.Label)
    prizeName: cc.Label = null;

    awardData: com.bt.game.proto.hall.IPlayTurntableRes = null;
    prizeData: com.bt.game.proto.hall.IActivityTurntable = null;
    
    public static getPrefabUrl() {
        return "turntable/prefab/AwardWinningView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

    }

    start() {
        this.updateView();
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.awardData = args[0];
        }
        if (args && args[1]) {
            this.prizeData = args[1];
        }
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent("UPDATE_PRIZE_RECORD", this.changeBtnStuate);
    }

    onClick(name, node) {
        switch (name) {
            case "mask":
            case "close": this.closeWithAction(); break;
            case "btn_share": this.shareToFacebook(); break;
            case "btn_spinAgain": this.closeWithAction(); break;
            case "btn_address": Manager.uiManager.open({ type: AddressView, bundle: BUNDLE_RESOURCES, args: [this.awardData.id] }); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    private shareToFacebook() {
        window['platformUtil'].shareToFacebook(shareType.PHOTO, User._promoteUrl, User._shareImgUrl);
    }
    updateView() {
        if (this.awardData) {
            this.btn_address.active = false;
            this.btn_share.active = false;
            this.btn_spinAgain.active = false;
            switch (this.awardData.rewardType) {// 奖励类型 1=实物,2=筹码,3=未中奖
                case 1:
                    this.btn_address.active = true;
                    this.btn_share.active = true;
                    break;
                case 2:
                    this.btn_share.active = true;
                    break;
                case 4:
                    this.btn_spinAgain.active = true;
                    break;
                default:
                    break;
            }
            this.spr_Prize.loadRemoteImage({ url: this.prizeData.picUrl, view: this, defaultSpriteFrame: "turntable/image/10", bundle: BUNDLE_RESOURCES })
            this.prizeName.string = this.prizeData.goodsName;
            this.loseNode.active = this.awardData.rewardType == 3;
            this.winNode.active = !this.loseNode.active;
        }
    }

    changeBtnStuate() {
        this.btn_address.active = false;
    }

    onDestroy() {
        super.onDestroy();
    }
}
