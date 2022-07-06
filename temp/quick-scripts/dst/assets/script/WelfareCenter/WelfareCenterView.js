
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/WelfareCenter/WelfareCenterView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8df3e2vZv9Aa7o7yTT5eNl7', 'WelfareCenterView');
// script/WelfareCenter/WelfareCenterView.ts

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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let WelfareCenterView = class WelfareCenterView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.scrollView = null;
        this.item = null;
        this.itemSprite = null;
        this.noTip = null;
        this.loadNode = null;
        this.welfareCentersData = null;
        this.selectData = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "WelfareCenter/prefabs/WelfareCenterView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.noTip.getComponent(cc.Label).language = LanguageImpl_1.i18n.WelfareCenter.noTip;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_WelfareCenter), this.refreshWelfareCenter);
    }
    refreshWelfareCenter(data) {
        G.Logger.log(data, "WelfareCenter");
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.welfareCenters && data.welfareCenters.length) {
                    this.welfareCentersData = data.welfareCenters;
                    this.noTip.active = false;
                    this.loadWelfareCentersView(data.welfareCenters);
                }
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    loadWelfareCentersView(data) {
        let language = Manager_1.Manager.language.getLanguage();
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let welfareCenterData = element.welfareCenter.find(config => { return config.index == 1; });
            ;
            if (language == cc.sys.LANGUAGE_ENGLISH) {
                welfareCenterData = element.welfareCenter.find(config => { return config.index == 1; });
            }
            else if (language == cc.sys.LANGUAGE_HINDI) {
                welfareCenterData = element.welfareCenter.find(config => { return config.index == 2; });
            }
            if (welfareCenterData) {
                let sp = cc.instantiate(this.item);
                sp.active = true;
                sp.x = 0;
                sp.name = welfareCenterData.name;
                sp.getChildByName("Label").getComponent(cc.Label).string = welfareCenterData.name;
                sp.parent = this.scrollView.content;
                if (!this.selectData && welfareCenterData.imgUrl) {
                    this.loadNode.parent.active = true;
                    this.itemSprite.loadRemoteImage({ url: welfareCenterData.imgUrl, view: this, completeCallback: (data) => {
                            console.log(data);
                            if (data) {
                                this.loadNode.parent.active = false;
                            }
                        } });
                    this.selectData = welfareCenterData;
                }
            }
        }
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "itemSprite":
                this.openSpriteURL();
                break;
            default:
                {
                    let language = Manager_1.Manager.language.getLanguage();
                    let lg = 1;
                    if (language == cc.sys.LANGUAGE_ENGLISH) {
                        lg = 1;
                    }
                    else if (language == cc.sys.LANGUAGE_HINDI) {
                        lg = 2;
                    }
                    for (let index = 0; index < this.welfareCentersData.length; index++) {
                        const element = this.welfareCentersData[index];
                        let welfareCenterData = element.welfareCenter.find(config => { return config.name == name && config.index == lg; });
                        if (welfareCenterData) {
                            this.selectData = welfareCenterData;
                            this.loadNode.parent.active = true;
                            this.itemSprite.loadRemoteImage({ url: welfareCenterData.imgUrl, view: this, completeCallback: (data) => {
                                    if (data) {
                                        this.loadNode.parent.active = false;
                                    }
                                } });
                        }
                    }
                }
                ;
        }
    }
    openSpriteURL() {
        if (this.selectData) {
            if (this.selectData.jumpType == 0) {
                if (this.selectData.jumpValue && this.selectData.jumpValue != "empty") {
                    let HallView = Manager_1.Manager.uiManager.getView("HallView");
                    if (HallView) {
                        let jumpValue = this.selectData.jumpValue;
                        this.closeWithAction();
                        HallView.then((view) => {
                            if (view) {
                                view.onClickByWelfareCenter(jumpValue);
                            }
                        });
                    }
                }
            }
            else if (this.selectData.jumpType == 1) {
                if (this.selectData.imgUrl) {
                    window['platformUtil'].openURL(this.selectData.jumpValue);
                }
            }
        }
    }
    start() {
        this.reqWelfareCenterList();
        cc.tween(this.loadNode)
            .repeatForever(cc.tween().by(0.2, { angle: 30 })
            .delay(0.01))
            .start();
    }
    reqWelfareCenterList() {
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_WelfareCenter, null);
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
    }
};
__decorate([
    property(cc.ScrollView)
], WelfareCenterView.prototype, "scrollView", void 0);
__decorate([
    property(cc.Node)
], WelfareCenterView.prototype, "item", void 0);
__decorate([
    property(cc.Sprite)
], WelfareCenterView.prototype, "itemSprite", void 0);
__decorate([
    property(cc.Node)
], WelfareCenterView.prototype, "noTip", void 0);
__decorate([
    property(cc.Node)
], WelfareCenterView.prototype, "loadNode", void 0);
WelfareCenterView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], WelfareCenterView);
exports.default = WelfareCenterView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvV2VsZmFyZUNlbnRlci9XZWxmYXJlQ2VudGVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtFQUF1RDtBQUN2RCx1REFBb0Q7QUFDcEQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUUxRCxrRUFBMkU7QUFDM0Usb0VBQTRDO0FBRTVDLG9FQUE0QztBQUc1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFJNUMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLGdCQUFNO0lBQXJEOztRQUlJLGVBQVUsR0FBa0IsSUFBSSxDQUFBO1FBR2hDLFNBQUksR0FBWSxJQUFJLENBQUE7UUFHcEIsZUFBVSxHQUFjLElBQUksQ0FBQTtRQUc1QixVQUFLLEdBQVksSUFBSSxDQUFBO1FBR3JCLGFBQVEsR0FBWSxJQUFJLENBQUE7UUFFeEIsdUJBQWtCLEdBQVEsSUFBSSxDQUFDO1FBQy9CLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFxSXZCLGlCQUFpQjtJQUNyQixDQUFDO0lBaklVLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8seUNBQXlDLENBQUM7SUFDckQsQ0FBQztJQUVELE1BQU07UUFDRixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsbUJBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7SUFDRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQU8sQ0FBQywwQkFB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O0NBRUosQ0FBQTtBQXJKRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3FEQUNRO0FBR2hDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0U7QUFHcEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDUTtBQUc1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNHO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ007QUFoQlAsaUJBQWlCO0lBRnJDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGlCQUFpQixDQXlKckM7a0JBekpvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IElDb250cm9sbGVyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluamVjdFNlcnZpY2UsIG1ha2VLZXkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzXCI7XG5pbXBvcnQgVUlWaWV3IGZyb20gXCIuLi9mcmFtZXdvcmsvdWkvVUlWaWV3XCI7XG5cbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VsZmFyZUNlbnRlclZpZXcgZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+e1xuICAgIHNlcnZpY2U6IExvYmJ5U2VydmljZTtcblxuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxuICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBpdGVtOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpdGVtU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub1RpcDogY2MuTm9kZSA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvYWROb2RlOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgd2VsZmFyZUNlbnRlcnNEYXRhOiBhbnkgPSBudWxsO1xuICAgIHNlbGVjdERhdGE6IGFueSA9IG51bGw7XG5cbiAgIFxuXG4gICBcbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiV2VsZmFyZUNlbnRlci9wcmVmYWJzL1dlbGZhcmVDZW50ZXJWaWV3XCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG4gICAgICAgIHRoaXMubm9UaXAuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5sYW5ndWFnZSA9IGkxOG4uV2VsZmFyZUNlbnRlci5ub1RpcDtcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XZWxmYXJlQ2VudGVyKSwgdGhpcy5yZWZyZXNoV2VsZmFyZUNlbnRlcik7XG4gICAgICAgIFxuICAgIH1cbiAgICByZWZyZXNoV2VsZmFyZUNlbnRlcihkYXRhKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhkYXRhLCBcIldlbGZhcmVDZW50ZXJcIilcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLndlbGZhcmVDZW50ZXJzICYmIGRhdGEud2VsZmFyZUNlbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2VsZmFyZUNlbnRlcnNEYXRhID0gZGF0YS53ZWxmYXJlQ2VudGVycztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub1RpcC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkV2VsZmFyZUNlbnRlcnNWaWV3KGRhdGEud2VsZmFyZUNlbnRlcnMpXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkV2VsZmFyZUNlbnRlcnNWaWV3KGRhdGEpe1xuICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IHdlbGZhcmVDZW50ZXJEYXRhID0gZWxlbWVudC53ZWxmYXJlQ2VudGVyLmZpbmQoY29uZmlnID0+IHsgcmV0dXJuIGNvbmZpZy5pbmRleCA9PSAxIH0pOztcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSA9PSBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCkge1xuICAgICAgICAgICAgICAgIHdlbGZhcmVDZW50ZXJEYXRhICA9ICBlbGVtZW50LndlbGZhcmVDZW50ZXIuZmluZChjb25maWcgPT4geyByZXR1cm4gY29uZmlnLmluZGV4ID09IDEgfSk7XG4gICAgICAgICAgICB9ZWxzZSBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKSB7XG4gICAgICAgICAgICAgICAgd2VsZmFyZUNlbnRlckRhdGEgID0gIGVsZW1lbnQud2VsZmFyZUNlbnRlci5maW5kKGNvbmZpZyA9PiB7IHJldHVybiBjb25maWcuaW5kZXggPT0gMiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3ZWxmYXJlQ2VudGVyRGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBzcCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSk7XG4gICAgICAgICAgICAgICAgc3AuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzcC54ID0gMDtcbiAgICAgICAgICAgICAgICBzcC5uYW1lID0gd2VsZmFyZUNlbnRlckRhdGEubmFtZTtcbiAgICAgICAgICAgICAgICBzcC5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gd2VsZmFyZUNlbnRlckRhdGEubmFtZVxuICAgICAgICAgICAgICAgIHNwLnBhcmVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50O1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWxlY3REYXRhICYmICB3ZWxmYXJlQ2VudGVyRGF0YS5pbWdVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTm9kZS5wYXJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtU3ByaXRlLmxvYWRSZW1vdGVJbWFnZSh7dXJsOndlbGZhcmVDZW50ZXJEYXRhLmltZ1VybCx2aWV3OnRoaXMsY29tcGxldGVDYWxsYmFjazooZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWROb2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX0pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0YSA9IHdlbGZhcmVDZW50ZXJEYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpdGVtU3ByaXRlXCI6IHRoaXMub3BlblNwcml0ZVVSTCgpOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBsZXQgbGFuZ3VhZ2UgPSBNYW5hZ2VyLmxhbmd1YWdlLmdldExhbmd1YWdlKCk7XG4gICAgICAgICAgICAgICAgbGV0IGxnID0gMVxuICAgICAgICAgICAgICAgIGlmIChsYW5ndWFnZSA9PSBjYy5zeXMuTEFOR1VBR0VfRU5HTElTSCkge1xuICAgICAgICAgICAgICAgICAgICBsZyA9IDFcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAobGFuZ3VhZ2UgPT0gY2Muc3lzLkxBTkdVQUdFX0hJTkRJKSB7XG4gICAgICAgICAgICAgICAgICAgIGxnID0gMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy53ZWxmYXJlQ2VudGVyc0RhdGEubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLndlbGZhcmVDZW50ZXJzRGF0YVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB3ZWxmYXJlQ2VudGVyRGF0YSAgPSBlbGVtZW50LndlbGZhcmVDZW50ZXIuZmluZChjb25maWcgPT4geyByZXR1cm4gY29uZmlnLm5hbWUgPT0gbmFtZSAmJiBjb25maWcuaW5kZXggPT0gbGd9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdlbGZhcmVDZW50ZXJEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGEgPSB3ZWxmYXJlQ2VudGVyRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1TcHJpdGUubG9hZFJlbW90ZUltYWdlKHt1cmw6d2VsZmFyZUNlbnRlckRhdGEuaW1nVXJsLHZpZXc6dGhpcyxjb21wbGV0ZUNhbGxiYWNrOihkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9wZW5TcHJpdGVVUkwoKXtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGF0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGF0YS5qdW1wVHlwZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGF0YS5qdW1wVmFsdWUgJiYgdGhpcy5zZWxlY3REYXRhLmp1bXBWYWx1ZSAhPSBcImVtcHR5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IEhhbGxWaWV3ID0gTWFuYWdlci51aU1hbmFnZXIuZ2V0VmlldyhcIkhhbGxWaWV3XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoSGFsbFZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqdW1wVmFsdWUgPSB0aGlzLnNlbGVjdERhdGEuanVtcFZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBIYWxsVmlldy50aGVuKCh2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5vbkNsaWNrQnlXZWxmYXJlQ2VudGVyKGp1bXBWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnNlbGVjdERhdGEuanVtcFR5cGUgPT0gMSl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0RGF0YS5pbWdVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5vcGVuVVJMKHRoaXMuc2VsZWN0RGF0YS5qdW1wVmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMucmVxV2VsZmFyZUNlbnRlckxpc3QoKVxuICAgICAgICBjYy50d2Vlbih0aGlzLmxvYWROb2RlKVxuICAgICAgICAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KDAuMix7YW5nbGUgOiAzMH0pXG4gICAgICAgIC5kZWxheSgwLjAxKSlcbiAgICAgICAgLnN0YXJ0KClcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcVdlbGZhcmVDZW50ZXJMaXN0KCl7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9XZWxmYXJlQ2VudGVyLFxuICAgICAgICAgICAgbnVsbCk7XG4gICAgfVxuICAgIHNob3coYXJncyl7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=