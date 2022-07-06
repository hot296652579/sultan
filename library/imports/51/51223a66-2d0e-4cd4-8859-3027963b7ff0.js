"use strict";
cc._RF.push(module, '51223pmLQ5M1IhZMCeWO3/w', 'ServiceView');
// script/service/ServiceView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const openAppHelpder_1 = require("../Helpder/openAppHelpder/openAppHelpder");
const Manager_1 = require("../common/manager/Manager");
const { ccclass, property } = cc._decorator;
let ServiceView = class ServiceView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.service = null;
        this.item = null;
        this.scrollView = null;
    }
    static getPrefabUrl() {
        return "service/prefabs/ServiceView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.scrollView.enabled = false;
    }
    bindingEvents() {
        super.bindingEvents();
        // this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CUSTOMER_SERVICE_CONFIG), this.onShowList);
    }
    onShowList(data) {
        if (data) {
            G.Logger.log('客服', data);
            if (data.statusMsg.status == 0) {
                if (data.customerServiceConfigList && data.customerServiceConfigList.length > 0) {
                    if (data.customerServiceConfigList.length > 5) {
                        this.scrollView.enabled = true;
                    }
                    else {
                        this.scrollView.enabled = false;
                    }
                    data.customerServiceConfigList.sort((a, b) => {
                        return a.sort - b.sort;
                    });
                    this.scrollView.content.removeAllChildren();
                    for (let index = 0; index < data.customerServiceConfigList.length; index++) {
                        const element = data.customerServiceConfigList[index];
                        if (element.status === 1) {
                            let item = cc.instantiate(this.item);
                            item.active = true;
                            item.parent = this.scrollView.content;
                            item.x = 0;
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
                    this.scrollView.scrollToTop();
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args[0]) {
            this.onShowList(args[0]);
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
            this.closeWithAction();
        }
        else {
            let str = node.parent.getChildByName("Layout").getChildByName("appNum").getComponent(cc.Label).string;
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
                        openAppHelpder_1.OpenAppHelpder.openApp(openAppHelpder_1.OpenAppHelpder.APP_NAMES.facebook);
                    }
                    break;
                case 3:
                    window['platformUtil'].copyToClip(str);
                    if (name === "appOpen") {
                        openAppHelpder_1.OpenAppHelpder.openApp(openAppHelpder_1.OpenAppHelpder.APP_NAMES.whatsApp);
                    }
                    break;
                case 4:
                    window['platformUtil'].copyToClip(str);
                    if (name === "appOpen") {
                        openAppHelpder_1.OpenAppHelpder.openApp(openAppHelpder_1.OpenAppHelpder.APP_NAMES.telegram);
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
};
__decorate([
    property(cc.Node)
], ServiceView.prototype, "item", void 0);
__decorate([
    property(cc.ScrollView)
], ServiceView.prototype, "scrollView", void 0);
ServiceView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], ServiceView);
exports.default = ServiceView;

cc._RF.pop();