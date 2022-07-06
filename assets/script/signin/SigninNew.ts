import { i18n } from "../common/language/LanguageImpl";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import { Manager } from "../common/manager/Manager";
import { UtilMgr } from "../global/UtilMgr";
import { MST } from "../framework/external/protoc";
import HallData from "../data/HallData";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class SigninNew extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(cc.Node)
    SevenSigin: cc.Node = null;
    @property(cc.Node)
    ThirtySigin: cc.Node = null;

    @property(cc.Node)
    dayItem0: cc.Node = null;
    @property(cc.Node)
    dayItem1: cc.Node = null;
    @property(cc.Node)
    dayItem2: cc.Node = null;
    @property(cc.Node)
    dayItem3: cc.Node = null;
    @property(cc.Node)
    dayItem4: cc.Node = null;
    @property(cc.Node)
    dayItem5: cc.Node = null;
    @property(cc.Node)
    dayItem6: cc.Node = null;

    @property(cc.Node)
    dayNode0: cc.Node = null;
    @property(cc.Node)
    dayNode1: cc.Node = null;
    @property(cc.Node)
    dayNode2: cc.Node = null;
    @property(cc.Node)
    dayNode3: cc.Node = null;
    @property(cc.Node)
    dayNode4: cc.Node = null;
    @property(cc.Node)
    dayNode5: cc.Node = null;

    public static getPrefabUrl() {
        return "signin/prefabs/SigninNew";
    }

    onLoad() {
        super.onLoad();

    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_GetSignedInfo', this.onEvent_S2C_GetSignedInfo);
        this.registerEvent('Event_S2C_Signed', this.onEvent_S2C_Signed);
    }

    show(args) {
        // super.show(args);
        this.requestGetSigned();
    }

    requestGetSigned() {
        let req = MST.C2S_GetSignedInfo.create({
            serial: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2S_GetSignedInfo.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_GetSignedInfo, MST.OuterOpcode_Lobby.C2S_GetSignedInfo, buffer);
    }

    onEvent_S2C_GetSignedInfo() {
        let hallData = G.DataMgr.get(HallData);
        let signinData = hallData.signinData;
        this.SevenSigin.active = false;
        this.ThirtySigin.active = false;

        if (signinData.signedType == 0) {
            this.SevenSigin.active = true;
            this.refreshSevenView();
        }
        else {
            this.ThirtySigin.active = true;
            this.refreshThirtyView();
        }
    }

    onEvent_S2C_Signed() {
        this.requestGetSigned();

        let hallData = G.DataMgr.get(HallData);
        let signinData = hallData.signinData;
        let serial = signinData.serial;
        let reward = signinData.reward
        if (reward && reward > 0) {
            if (serial == 0) {
                PanelHelp.showTip(i18n.TIPS.SEVENSIGNINSUCCESS);
            } else {
                PanelHelp.showTip(i18n.TIPS.THIRTYSIGNINSUCCESS);
            }
        } else
            PanelHelp.showTip(i18n.TIPS.SIGNINSUCCESS);
    }

    refreshSevenView() {
        let self = this;
        let hallData = G.DataMgr.get(HallData);
        let signinData = hallData.signinData;
        let signedDays = signinData.signedDays;
        let isSigned = signinData.isSigned;

        for (let index = 0; index < 7; index++) {
            let dayItem = this[`dayItem${index}`];
            let bg = dayItem.getChildByName('bg');
            let canGet = bg.getChildByName('canGet');
            let obtain = bg.getChildByName('obtain');
            let noReach = bg.getChildByName('noReach');
            let btnMasuk = canGet.getChildByName('btnMasuk');
            noReach.active = true;
            canGet.active = false;
            obtain.active = false;
            // console.log('signedDays->:' + signedDays);
            if (signedDays > 0) {
                if (index < signedDays) {
                    obtain.active = true;
                    noReach.active = false;
                }
                else {
                    if (index == signedDays) {
                        if (!isSigned) {
                            canGet.active = true;
                            obtain.active = false;
                            noReach.active = false;

                            btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                                // console.log('index ->:' + index);
                                self.requestSignHandler();
                            });
                        }
                    } else {
                        noReach.active = true;
                    }
                }
            }
            else {
                if (index == 0) {
                    canGet.active = true;
                    noReach.active = false;

                    btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                        // console.log('index ->:' + index);
                        self.requestSignHandler();
                    });
                }
            }
        }
    }

    requestSignHandler() {
        let req = MST.C2S_Signed.create({
            serial: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2S_Signed.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_Signed, MST.OuterOpcode_Lobby.C2S_Signed, buffer);
    }

    refreshThirtyView() {
        let self = this;
        let hallData = G.DataMgr.get(HallData);
        let signinData = hallData.signinData;
        let signedDays = signinData.signedDays;
        let isSigned = signinData.isSigned;

        let _total = 0;
        let _i = 0;
        let layNum = 0;
        for (let index = 0; index < 6; index++) {
            for (let index = 0; index < 5; index++) {
                if (_i > 4) {
                    _i = 0;
                    layNum++;
                }
                // console.log('layNum : ' + layNum);
                // console.log('_i ->' + _i);
                let dayNode = this[`dayNode${layNum}`];
                let dayItem = dayNode.getChildByName(`day${_i}`);
                let labDay = dayItem.getChildByName('day0').getComponent(cc.Label);
                labDay.string = `Day${_total + 1}`;

                let canGet = dayItem.getChildByName('canGet');
                let obtain = dayItem.getChildByName('obtain');
                let noReach = dayItem.getChildByName('noReach');
                let btnMasuk = canGet.getChildByName('btnMasuk');
                canGet.active = false;
                obtain.active = false;
                noReach.active = true;

                if (signedDays > 0) {
                    if (_total < signedDays) {
                        obtain.active = true;
                        noReach.active = false;
                    }
                    else {
                        if (_total == signedDays) {
                            if (!isSigned) {
                                canGet.active = true;
                                obtain.active = false;
                                noReach.active = false;

                                btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                                    // console.log('index ->:' + index);
                                    self.requestSignHandler();
                                });
                            }
                        } else {
                            noReach.active = true;
                        }
                    }
                }
                else {
                    if (_total == 0) {
                        canGet.active = true;
                        noReach.active = false;

                        btnMasuk.on(cc.Node.EventType.TOUCH_END, (evt) => {
                            // console.log('index ->:' + index);
                            self.requestSignHandler();
                        });
                    }
                }

                _total++;
                _i++;
            }
        }
    }

    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
        }
    }

    onDestroy() {
        super.onDestroy();
    }

    // update (dt) {}
}
