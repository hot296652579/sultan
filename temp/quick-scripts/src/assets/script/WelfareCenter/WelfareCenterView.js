"use strict";
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