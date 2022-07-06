
import UIView from "../framework/ui/UIView";
import { i18n } from "../common/language/LanguageImpl";
import PanelHelp from "../msgbox/PanelHelp";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { IController } from "../framework/controller/Controller";
import { User } from "../global/User";
import { SettSecondaryPwdType } from "./SetSecondaryPwdView";
const { ccclass, property } = cc._decorator;

export enum CheckSecondaryPwdType {
    getPwq,//获取二级密码
    checkSuccCall//验证成功后回调
}

@ccclass
@injectService(LobbyService.instance)
export default class SecondaryPwdView extends UIView implements IController<LobbyService>{
    service: LobbyService = null;



    @property(cc.EditBox)
    pwdEditbox: cc.EditBox = null;


    public static getPrefabUrl() {
        return "withdrawal/prefabs/SecondaryPwdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content')
        this.initLanguage()
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD), this.toCheckPwdRes);
    }
    //args= [ [CheckPwdType,callfun] ]
    show(args) {
        super.show(args[0])
        this.showWithAction(true)
    }
    initLanguage() {
        this.pwdEditbox.placeholder = i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD;
    }
    onClick(name) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "FoegetPassword":
                dispatch('openSetSecondaryPwdView', SettSecondaryPwdType.reset);
                break;
            case "confirm":
                this.toCheckPwd()
                break;
        }

    }
    toCheckPwd() {
        let passwd = this.checkPwd();
        if (!passwd) return;
        switch (this.args[0]) {
            case CheckSecondaryPwdType.getPwq:
                this.args[1] && this.args[1](passwd)
                this.close();
                break
            case CheckSecondaryPwdType.checkSuccCall:
                this.toCheckReq(passwd);
                break

        }




    }
    toCheckReq(passwd) {
        let req = protoPackage.hall.CheckSecondPasswdReq.create({ passwd: passwd });
        let buffer = protoPackage.hall.CheckSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD,
            buffer);
    }
    checkPwd() {
        let passwd = this.pwdEditbox.string;
        if (passwd == '') {
            PanelHelp.showTip(i18n.ACCOUNT_LOGIN.ERROR.EMPTY_PWD)
            return ""
        }
        return passwd
    }
    toCheckPwdRes(data) {
        if (data.statusMsg.status == 0) {
            this.close()
            this.args[1] && this.args[1]()
        } else {
            PanelHelp.showMsgBox('', i18n.ERRORCODE[data.statusMsg.status]);
        }
    }

}
