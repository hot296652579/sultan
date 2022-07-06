import { i18n } from "../common/language/LanguageImpl";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import { OpenAppHelpder } from "../Helpder/openAppHelpder/openAppHelpder";
import { Manager } from "../common/manager/Manager";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class ServiceView extends UIView {
    service: LobbyService = null;
    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;



    public static getPrefabUrl() {
        return "service/prefabs/ServiceView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.scrollView.enabled = false
    }
    bindingEvents() {
        super.bindingEvents();
        // this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CUSTOMER_SERVICE_CONFIG), this.onShowList);
    }
    private onShowList(data) {
        if (data) {
            G.Logger.log('客服', data)
            if (data.statusMsg.status == 0) {
                if (data.customerServiceConfigList && data.customerServiceConfigList.length > 0) {
                    if (data.customerServiceConfigList.length > 5) {
                        this.scrollView.enabled = true
                    } else {
                        this.scrollView.enabled = false
                    }
                    data.customerServiceConfigList.sort((a, b) => {
                        return a.sort - b.sort;
                    })
                    this.scrollView.content.removeAllChildren();
                    for (let index = 0; index < data.customerServiceConfigList.length; index++) {
                        const element = data.customerServiceConfigList[index];
                        if (element.status === 1) {
                            let item = cc.instantiate(this.item)
                            item.active = true
                            item.parent = this.scrollView.content
                            item.x = 0
                            item["buttonId"] = element.buttonId;
                            item["url"] = element.url;
                            item.getChildByName("Layout").getChildByName("nameLabel").getComponent(cc.Label).string = element.appName + ": ";
                            item.getChildByName("Layout").getChildByName("appNum").getComponent(cc.Label).string = element.number;
                            item.getChildByName("appOpen").getChildByName("Background").getChildByName("btnName").getComponent(cc.Label).string = element.buttonName;

                            // item.getChildByName("appOpen").active = false
                            // if (element.buttonId === 2) {
                            //     item.getChildByName("appOpen").active = true
                            // }else if(element.buttonId === 3){
                            //     if (element.url && element.url.length > 0) {
                            //         item.getChildByName("appOpen").active = true
                            //         item.getChildByName("url").getComponent(cc.Label).string = element.url
                            //     }
                            // }
                            // else {
                            //     item.getChildByName("appCopy").active = true
                            // }
                        }

                    }

                    this.scrollView.scrollToTop()
                }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args[0]) {
            this.onShowList(args[0])
        }
        // let channelId = window['platformUtil'].getAppQuDaoId()
        // let req = protoPackage.hall.CustomerServiceConfigReq.create({ channelId: channelId  });
        //     let buffer = protoPackage.hall.CustomerServiceConfigReq.encode(req).finish();
        //     this.service.sendMsg(serverType.Lobby,
        //         protoPackage.hall.HallCmd.CMD_CUSTOMER_SERVICE_CONFIG,
        //         buffer);

    }
    onClick(name, node) {
        //应用id(1=E-mail,2=telegram,3=ins,4=facebook,5=whatsapp)
        if (name === "close") {
            this.closeWithAction()
        } else {
            let str = node.parent.getChildByName("Layout").getChildByName("appNum").getComponent(cc.Label).string
            switch (node.parent.buttonId) {
                case 1:
                    window['platformUtil'].copyToClip(str);
                    if (name === "appOpen") {
                        window['platformUtil'].openEmail(str);
                    }
                    break;
                case 2:
                    window['platformUtil'].copyToClip(str);
                    if (name === "appOpen") {
                        OpenAppHelpder.openApp(OpenAppHelpder.APP_NAMES.facebook)
                    }
                    break;
                case 3:
                    window['platformUtil'].copyToClip(str);
                    if (name === "appOpen") {
                        OpenAppHelpder.openApp(OpenAppHelpder.APP_NAMES.whatsApp)
                    }
                    break;
                case 4:
                    window['platformUtil'].copyToClip(str);
                    if (name === "appOpen") {
                        OpenAppHelpder.openApp(OpenAppHelpder.APP_NAMES.telegram)
                    }
                    break;
                case 5:
                    if (node.parent.url) {
                        window['platformUtil'].copyToClip(str);
                        window['platformUtil'].openURL(node.parent.url);
                    }
                    break;
                case 6:
                    window['platformUtil'].copyToClip(str);
                    break;
                default: G.Logger.error("no find button name -> %s", name);
            }
        }
    }

}
