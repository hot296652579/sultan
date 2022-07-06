
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";

import PanelHelp from "../msgbox/PanelHelp";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class WelfareCenterView extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null

    @property(cc.Node)
    item: cc.Node = null

    @property(cc.Sprite)
    itemSprite: cc.Sprite = null

    @property(cc.Node)
    noTip: cc.Node = null

    @property(cc.Node)
    loadNode: cc.Node = null

    welfareCentersData: any = null;
    selectData: any = null;

   

   
    public static getPrefabUrl() {
        return "WelfareCenter/prefabs/WelfareCenterView";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.noTip.getComponent(cc.Label).language = i18n.WelfareCenter.noTip;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_WelfareCenter), this.refreshWelfareCenter);
        
    }
    refreshWelfareCenter(data) {
        G.Logger.log(data, "WelfareCenter")
        if (data) {
            if (data.statusMsg.status == 0) {
                if (data.welfareCenters && data.welfareCenters.length) {
                    this.welfareCentersData = data.welfareCenters;
                    this.noTip.active = false;
                    this.loadWelfareCentersView(data.welfareCenters)
                 }
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    private loadWelfareCentersView(data){
        let language = Manager.language.getLanguage();
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let welfareCenterData = element.welfareCenter.find(config => { return config.index == 1 });;
            if (language == cc.sys.LANGUAGE_ENGLISH) {
                welfareCenterData  =  element.welfareCenter.find(config => { return config.index == 1 });
            }else if (language == cc.sys.LANGUAGE_HINDI) {
                welfareCenterData  =  element.welfareCenter.find(config => { return config.index == 2 });
            }
            if (welfareCenterData) {
                let sp = cc.instantiate(this.item);
                sp.active = true;
                sp.x = 0;
                sp.name = welfareCenterData.name;
                sp.getChildByName("Label").getComponent(cc.Label).string = welfareCenterData.name
                sp.parent = this.scrollView.content;
                if (!this.selectData &&  welfareCenterData.imgUrl) {
                    this.loadNode.parent.active = true;
                    this.itemSprite.loadRemoteImage({url:welfareCenterData.imgUrl,view:this,completeCallback:(data)=>{
                        console.log(data);
                        if (data) {
                            this.loadNode.parent.active = false;
                        }
                    }})
                    this.selectData = welfareCenterData;
                }
            }
        }

    }
    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "itemSprite": this.openSpriteURL(); break;
            default: {
                let language = Manager.language.getLanguage();
                let lg = 1
                if (language == cc.sys.LANGUAGE_ENGLISH) {
                    lg = 1
                }else if (language == cc.sys.LANGUAGE_HINDI) {
                    lg = 2
                }
                for (let index = 0; index < this.welfareCentersData.length; index++) {
                    const element = this.welfareCentersData[index];
                    let welfareCenterData  = element.welfareCenter.find(config => { return config.name == name && config.index == lg});
                    if (welfareCenterData) {
                        this.selectData = welfareCenterData;
                        this.loadNode.parent.active = true;
                        this.itemSprite.loadRemoteImage({url:welfareCenterData.imgUrl,view:this,completeCallback:(data)=>{
                            if (data) {
                                this.loadNode.parent.active = false;
                            }
                        }})
                    }
                }
            };
        }
    }
    private openSpriteURL(){
        if (this.selectData) {
            if (this.selectData.jumpType == 0) {
                if (this.selectData.jumpValue && this.selectData.jumpValue != "empty") {
                    let HallView = Manager.uiManager.getView("HallView");
                    if (HallView) {
                        let jumpValue = this.selectData.jumpValue
                        this.closeWithAction()
                        HallView.then((view) => {
                            if (view) {
                                view.onClickByWelfareCenter(jumpValue)
                            }
                        })
                    }
                }

            }else if(this.selectData.jumpType == 1){
                if (this.selectData.imgUrl) {
                    window['platformUtil'].openURL(this.selectData.jumpValue)
                }
            }
            
        }
    }
    start() {
        this.reqWelfareCenterList()
        cc.tween(this.loadNode)
        .repeatForever(cc.tween().by(0.2,{angle : 30})
        .delay(0.01))
        .start()
    }

    private reqWelfareCenterList(){
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_WelfareCenter,
            null);
    }
    show(args){
        super.show(args);
        this.showWithAction(true);
    }
    // update (dt) {}
}
