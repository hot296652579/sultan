import { IController } from "../../framework/controller/Controller";
import { injectService, makeKey } from "../../framework/decorator/Decorators";
import { RequestPackge } from "../../framework/net/HttpClient";
import UIView from "../../framework/ui/UIView";
import PanelHelp from "../../msgbox/PanelHelp";
import { Config } from "../config/Config";
import { i18n } from "../language/LanguageImpl";
import { Manager } from "../manager/Manager";
import { protoPackage, serverType } from "../net/CommonService";
import { LobbyService } from "../net/LobbyService";
import { Type } from "protobufjs";
import HallData from "../../data/HallData";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class NoticeItem extends UIView implements IController<LobbyService>{

    @property(cc.RichText)
    label: cc.RichText = null;

    @property(cc.Node)
    mask: cc.Node = null;

    startX: number = null;
    endX: number = null;

    speed = 20;

    service: LobbyService = null;
    onLoad() {
        //guest162468409 win Rp3800000in Crash
        let contentSize = this.label.node.getBoundingBox();
        this.startX = this.mask.width * this.mask.anchorX;
        this.endX = -this.mask.width * this.mask.anchorX - contentSize.size.width;
        this.label.node.x = this.startX;

        //test
        // let hallData = G.DataMgr.get(HallData);
        // let notices = hallData.notice;
        // notices.push({ message: "guest162468409 win Rp3800000in Crash", type: 0 });
        this.initView();
    }

    start() {

    }

    initView() {
        let hallData = G.DataMgr.get(HallData);
        let notices = hallData.notice;
        if (notices.length <= 0)
            return;

        let notice = notices[0];
        let str;
        if (notice.type == 0)
            str = this.getRichTxt(notice.message)
        else
            str = notice.message

        this.label.string = str;
    }

    update(dt) {
        if (this.label.node.x <= this.endX) {
            this.label.node.x = this.startX;
        }
        this.label.node.x -= this.speed * dt;
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_MessageNotify', this.onEvent_S2C_MessageNotify);
    }

    onEvent_S2C_MessageNotify() {
        this.schedule(this.checkLabelPos);
    }

    checkLabelPos() {
        // console.log('this.label.node.x:++++++++++++++' + this.label.node.x);
        if (this.label.node.x <= this.endX) {
            let hallData = G.DataMgr.get(HallData);
            let notices = hallData.notice;
            if (notices.length <= 0)
                return;

            let str;
            if (notices[0].type == 0) {
                let message = notices[0].message;
                str = this.getRichTxt(message);
            } else
                str = notices[0].message

            this.label.string = str;

            if (notices.length > 1)
                notices.splice(0, 1);
        }
    }

    getRichTxt(message) {
        let winIndex = message.lastIndexOf('win');
        let rpIndex = message.lastIndexOf('Rp');
        let inIndex = message.lastIndexOf('in ');

        let name = message.substring(0, winIndex);
        let rp = message.substring(rpIndex, inIndex);
        let game = message.substring(inIndex, message.length);
        let str = `<color=#ffffff>${name}</c><color=#E1BC11> win${rp}</color><color=#ffffff>${game}</c>`;
        return str;
    }

    onDestroy(): void {
        this.unschedule(this.checkLabelPos);
    }
}
