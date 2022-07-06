import { LogicEvent } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { goToLogin } from "../global/Global";
import { User } from "../global/User";
import { ConfirmBoxBtnSprite } from "../msgbox/ConfirmBox";
import PanelHelp from "../msgbox/PanelHelp";
import { SettSecondaryPwdType } from "../withdrawal/SetSecondaryPwdView";
import { ENABLE_CHANGE_LANGUAGE } from "../framework/base/Defines";
import { EventApi } from "../framework/event/EventApi";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class Setting extends UIView {
    service: LobbyService;
    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    musiclabel: cc.Label = null;
    @property(cc.Label)
    effectlabel: cc.Label = null;

    @property(cc.Label)
    btnlabel: cc.Label = null;

    @property(cc.Label)
    languagelabel: cc.Label = null;


    @property(cc.Toggle)
    musicToggle: cc.Toggle = null;

    @property(cc.Toggle)
    effectToggle: cc.Toggle = null;

    @property(cc.Node)
    switchacc: cc.Node = null;

    @property(cc.Node)
    languageItem: cc.Node = null;

    @property(cc.Node)
    resetNode: cc.Node = null;

    @property(cc.Node)
    resetItemNode: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;


    public static getPrefabUrl() {
        return "setting/prefabs/Setting";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.title.language = i18n.SETTING.TITTLE;
        this.musiclabel.language = i18n.SETTING.MUSIC;
        this.effectlabel.language = i18n.SETTING.EFFECT;
        this.btnlabel.language = i18n.SETTING.CHANGEID;

        let isMusicOn = Manager.globalAudio.isMusicOn ? true : false
        cc.log(Manager.globalAudio.isMusicOn, "第三方第三方都是")
        this.musicToggle.isChecked = isMusicOn;
        this.musicToggle.node.getChildByName('Background').active = !isMusicOn
        let isEffectOn = Manager.globalAudio.isEffectOn ? true : false
        this.effectToggle.isChecked = isEffectOn
        this.effectToggle.node.getChildByName('Background').active = !isEffectOn
        this.languagelabel.language = i18n.SETTING.LANGUAGE;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_PushResetNewPlayerGuid), this.resetGuid);
        if (ENABLE_CHANGE_LANGUAGE) {
            this.registerEvent(EventApi.CHANGE_LANGUAGE, () => { this.languagelabel.language = i18n.SETTING.LANGUAGE; });
        }
    }
    private resetGuid(data) {
        if (data) {
            PanelHelp.showTip(i18n.SETTING.RESETGUIDTIPSUCC)
            let donotDelete = [];
            User._gameIds.forEach(id => {
                if (id == 2001 || id == 2002 || id == 2003) {
                    donotDelete.push(id);
                }
            });
            User._gameIds = []
            User._gameIds = User._gameIds.concat(donotDelete);
        }
    }

    show(args: any[]) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0] && args[0].isGame) {
            this.switchacc.active = false;
            this.languageItem.active = false;
            this.resetNode.active = false;
        }
        this.resetItemNode.active = !!User._phone && this.node.parent.getChildByName('HallView') != null;

        if (this.resetItemNode.active) {
            this.scrollView.enabled = true
            this.scrollView.scrollToTop()
        } else {
            this.scrollView.enabled = false
        }
    }

    onClick(name, node) {
        switch (name) {
            case "musicToggle": this.click_music(node); break;
            case "effectToggle": this.click_effect(node); break;
            case "switchacc": this.click_switchacc(); break;
            case "close": this.closeWithAction(); break;
            case "resetPwd":
                dispatch('toResetPwdView');
                this.closeWithAction();
                break;
            case "resetSCPwd":
                dispatch('openSetSecondaryPwdView', SettSecondaryPwdType.reset);
                this.closeWithAction();
                break;
            case "resetGuid":
                PanelHelp.showDialog("", i18n.SETTING.RESETGUIDTIP, () => {
                    let req = protoPackage.hall.ReqResetNewPlayerGuid.create({ gameId: 0 });
                    let buffer = protoPackage.hall.ReqResetNewPlayerGuid.encode(req).finish();
                    this.service.sendMsg(serverType.Lobby,
                        protoPackage.hall.HallCmd.CMD_ReqResetNewPlayerGuid,
                        buffer);
                }, null, ConfirmBoxBtnSprite.btn_Cancel, ConfirmBoxBtnSprite.btn_Reset)
                break;
            case "languageBtn":
                dispatch('openLanguageChangeView');
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    click_switchacc() {
        goToLogin();
    }

    click_music(node) {
        let isChecked = node.getComponent(cc.Toggle).isChecked;
        let background = node.getChildByName("Background");
        background.active = !isChecked;
        Manager.globalAudio.setMusicEnabled(isChecked, true);
    }

    click_effect(node) {
        let isChecked = node.getComponent(cc.Toggle).isChecked;
        let background = node.getChildByName("Background");
        background.active = !isChecked;
        Manager.globalAudio.isEffectOn = isChecked;
    }

    start() {

    }

    // update (dt) {}
}
