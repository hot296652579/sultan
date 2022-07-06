
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class AddressView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.EditBox)
    nameEdit: cc.EditBox = null;

    @property(cc.EditBox)
    phoneEdit: cc.EditBox = null;

    @property(cc.Label)
    areaCode: cc.Label = null;

    @property(cc.EditBox)
    addressEdit: cc.EditBox = null;

    private id: number;
    public static getPrefabUrl() {
        return "turntable/prefab/AddressView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

    }

    start() {

    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.id = args[0];
        }
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.Turntable_Address), this.onNetTurntableAddressRes);
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "btn_cancel": this.closeWithAction(); break;
            case "btn_confirm": this.reqTurntableAddress(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    reqTurntableAddress() {
        let name = this.nameEdit.string;
        let phone = this.phoneEdit.string;
        let address = this.addressEdit.string;
        let areaCode = this.areaCode.string;
        if (!name.length) {
            PanelHelp.showTip(i18n.EDITBOX.NICKNAMENULL);
            return;
        }
        if (!phone) {
            PanelHelp.showTip(i18n.EDITBOX.PHONENULL);
            return null;
        }
        if (phone.length < 7) {
            PanelHelp.showTip(i18n.EDITBOX.PHONETYPEERR);
            return null;
        }

        if (!address.length) {
            PanelHelp.showTip(i18n.EDITBOX.ADDRESSNULL);
            return;
        }
        if(!areaCode.length)  return;
        

        let options = {
            id: this.id,// 唯一id
            name: name,// 名字
            phone: areaCode+phone,// 电话
            address: address,// 地址
        }
        G.Logger.log("AddressOptions",options);
        let req = protoPackage.hall.TurntableAddressReq.create(options);
        let buffer = protoPackage.hall.TurntableAddressReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.Turntable_Address,
            buffer);
    }

    onNetTurntableAddressRes(data) {
        if (data.statusMsg.status == 0) {
            PanelHelp.showTip(i18n.TURN_TABLE.AddressSuccess);
            dispatch("UPDATE_PRIZE_RECORD");
            this.closeWithAction();  
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }
    }

    onDestroy() {
        super.onDestroy();
    }
}
