
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/service/ServiceView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZS9TZXJ2aWNlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDZEQUEwRDtBQUUxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBRTVDLG9FQUE0QztBQUM1Qyw2RUFBMEU7QUFDMUUsdURBQW9EO0FBR3BELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSxnQkFBTTtJQUEvQzs7UUFDSSxZQUFPLEdBQWlCLElBQUksQ0FBQztRQUU3QixTQUFJLEdBQVksSUFBSSxDQUFDO1FBR3JCLGVBQVUsR0FBa0IsSUFBSSxDQUFDO0lBNkhyQyxDQUFDO0lBekhVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sNkJBQTZCLENBQUM7SUFDekMsQ0FBQztJQUNELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtJQUNuQyxDQUFDO0lBQ0QsYUFBYTtRQUNULEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0Qix5SEFBeUg7SUFDN0gsQ0FBQztJQUNPLFVBQVUsQ0FBQyxJQUFJO1FBQ25CLElBQUksSUFBSSxFQUFFO1lBQ04sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUM1QixJQUFJLElBQUksQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDN0UsSUFBSSxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFBO3FCQUNqQzt5QkFBTTt3QkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7cUJBQ2xDO29CQUNELElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3pDLE9BQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUMzQixDQUFDLENBQUMsQ0FBQTtvQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUM1QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDeEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN0RCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUN0QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs0QkFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7NEJBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUE7NEJBQ3JDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDOzRCQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7NEJBQ2pILElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7NEJBQ3RHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDOzRCQUV6SSxnREFBZ0Q7NEJBQ2hELGdDQUFnQzs0QkFDaEMsbURBQW1EOzRCQUNuRCxvQ0FBb0M7NEJBQ3BDLG1EQUFtRDs0QkFDbkQsdURBQXVEOzRCQUN2RCxpRkFBaUY7NEJBQ2pGLFFBQVE7NEJBQ1IsSUFBSTs0QkFDSixTQUFTOzRCQUNULG1EQUFtRDs0QkFDbkQsSUFBSTt5QkFDUDtxQkFFSjtvQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFBO2lCQUNoQzthQUNKO2lCQUFNO2dCQUNILG1CQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxpQkFBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3hGO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUk7UUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzNCO1FBQ0QseURBQXlEO1FBQ3pELDBGQUEwRjtRQUMxRixvRkFBb0Y7UUFDcEYsNkNBQTZDO1FBQzdDLGlFQUFpRTtRQUNqRSxtQkFBbUI7SUFFdkIsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUNkLHVEQUF1RDtRQUN2RCxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQ3pCO2FBQU07WUFDSCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUE7WUFDckcsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDMUIsS0FBSyxDQUFDO29CQUNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTt3QkFDcEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDekM7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUNwQiwrQkFBYyxDQUFDLE9BQU8sQ0FBQywrQkFBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtxQkFDNUQ7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUNwQiwrQkFBYyxDQUFDLE9BQU8sQ0FBQywrQkFBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtxQkFDNUQ7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUNwQiwrQkFBYyxDQUFDLE9BQU8sQ0FBQywrQkFBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtxQkFDNUQ7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTt3QkFDakIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNuRDtvQkFDRCxNQUFNO2dCQUNWLEtBQUssQ0FBQztvQkFDRixNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNO2dCQUNWLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlEO1NBQ0o7SUFDTCxDQUFDO0NBRUosQ0FBQTtBQWhJRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lDQUNHO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7K0NBQ1M7QUFOaEIsV0FBVztJQUYvQixPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixXQUFXLENBbUkvQjtrQkFuSW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IHByb3RvUGFja2FnZSwgc2VydmVyVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IE9wZW5BcHBIZWxwZGVyIH0gZnJvbSBcIi4uL0hlbHBkZXIvb3BlbkFwcEhlbHBkZXIvb3BlbkFwcEhlbHBkZXJcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlVmlldyBleHRlbmRzIFVJVmlldyB7XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpdGVtOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxuICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xuXG5cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJzZXJ2aWNlL3ByZWZhYnMvU2VydmljZVZpZXdcIjtcbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5lbmFibGVkID0gZmFsc2VcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICAvLyB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DVVNUT01FUl9TRVJWSUNFX0NPTkZJRyksIHRoaXMub25TaG93TGlzdCk7XG4gICAgfVxuICAgIHByaXZhdGUgb25TaG93TGlzdChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coJ+WuouacjScsIGRhdGEpXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jdXN0b21lclNlcnZpY2VDb25maWdMaXN0ICYmIGRhdGEuY3VzdG9tZXJTZXJ2aWNlQ29uZmlnTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmN1c3RvbWVyU2VydmljZUNvbmZpZ0xpc3QubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmVuYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuZW5hYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jdXN0b21lclNlcnZpY2VDb25maWdMaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnNvcnQgLSBiLnNvcnQ7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhLmN1c3RvbWVyU2VydmljZUNvbmZpZ0xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZGF0YS5jdXN0b21lclNlcnZpY2VDb25maWdMaXN0W2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnggPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVtcImJ1dHRvbklkXCJdID0gZWxlbWVudC5idXR0b25JZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtW1widXJsXCJdID0gZWxlbWVudC51cmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIkxheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGVsZW1lbnQuYXBwTmFtZSArIFwiOiBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiTGF5b3V0XCIpLmdldENoaWxkQnlOYW1lKFwiYXBwTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZWxlbWVudC5udW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImFwcE9wZW5cIikuZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGVsZW1lbnQuYnV0dG9uTmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJhcHBPcGVuXCIpLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGVsZW1lbnQuYnV0dG9uSWQgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImFwcE9wZW5cIikuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1lbHNlIGlmKGVsZW1lbnQuYnV0dG9uSWQgPT09IDMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZWxlbWVudC51cmwgJiYgZWxlbWVudC51cmwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImFwcE9wZW5cIikuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcInVybFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGVsZW1lbnQudXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJhcHBDb3B5XCIpLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKGFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHRoaXMub25TaG93TGlzdChhcmdzWzBdKVxuICAgICAgICB9XG4gICAgICAgIC8vIGxldCBjaGFubmVsSWQgPSB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmdldEFwcFF1RGFvSWQoKVxuICAgICAgICAvLyBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuQ3VzdG9tZXJTZXJ2aWNlQ29uZmlnUmVxLmNyZWF0ZSh7IGNoYW5uZWxJZDogY2hhbm5lbElkICB9KTtcbiAgICAgICAgLy8gICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5DdXN0b21lclNlcnZpY2VDb25maWdSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIC8vICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAvLyAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0NVU1RPTUVSX1NFUlZJQ0VfQ09ORklHLFxuICAgICAgICAvLyAgICAgICAgIGJ1ZmZlcik7XG5cbiAgICB9XG4gICAgb25DbGljayhuYW1lLCBub2RlKSB7XG4gICAgICAgIC8v5bqU55SoaWQoMT1FLW1haWwsMj10ZWxlZ3JhbSwzPWlucyw0PWZhY2Vib29rLDU9d2hhdHNhcHApXG4gICAgICAgIGlmIChuYW1lID09PSBcImNsb3NlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VXaXRoQWN0aW9uKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdHIgPSBub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcIkxheW91dFwiKS5nZXRDaGlsZEJ5TmFtZShcImFwcE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZ1xuICAgICAgICAgICAgc3dpdGNoIChub2RlLnBhcmVudC5idXR0b25JZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5jb3B5VG9DbGlwKHN0cik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBcImFwcE9wZW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5vcGVuRW1haWwoc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcChzdHIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJhcHBPcGVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9wZW5BcHBIZWxwZGVyLm9wZW5BcHAoT3BlbkFwcEhlbHBkZXIuQVBQX05BTUVTLmZhY2Vib29rKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5jb3B5VG9DbGlwKHN0cik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBcImFwcE9wZW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3BlbkFwcEhlbHBkZXIub3BlbkFwcChPcGVuQXBwSGVscGRlci5BUFBfTkFNRVMud2hhdHNBcHApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmNvcHlUb0NsaXAoc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiYXBwT3BlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPcGVuQXBwSGVscGRlci5vcGVuQXBwKE9wZW5BcHBIZWxwZGVyLkFQUF9OQU1FUy50ZWxlZ3JhbSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudC51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcChzdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5vcGVuVVJMKG5vZGUucGFyZW50LnVybCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmNvcHlUb0NsaXAoc3RyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogRy5Mb2dnZXIuZXJyb3IoXCJubyBmaW5kIGJ1dHRvbiBuYW1lIC0+ICVzXCIsIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=