import { GameConfig } from "../common/base/HotUpdate";
import { Config } from "../common/config/Config";
import { dispatchEnterComplete, LogicEvent, LogicType } from "../common/event/LogicEvent";
import { i18n } from "../common/language/LanguageImpl";
import { gameManager } from "../common/manager/GameManager";
import { Manager } from "../common/manager/Manager";
import { CommonMessage, protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { EventApi } from "../framework/event/EventApi";
import { HttpErrorType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import { ShareTraceHelpder } from "../Helpder/shareTrace/ShareTraceHelpder";
import LanguageChange from "../common/language/LanguageChange";
import ServiceView from "../service/ServiceView";
import { UIManager } from "../framework/base/UIManager";
import AkunView from "../akun/AkunView";
import HallNewView from "../hall/HallNewView";
import LoginNewView from "../login/LoginNewView";
import WalletView from "../wallet/WalletView";
import ScroViewPlus from "../common/component/ScroViewPlus";
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import MissionItem from "./MissionItem";
import { MST } from "../framework/external/protoc";
import UserData from "../data/UserData";
import SigninNew from "../signin/SigninNew";
import HallData from "../data/HallData";

const { ccclass, property } = cc._decorator;
/**
 * @description 登录方式逻辑事件定义
 */

@ccclass
@injectService(LobbyService.instance)
export default class MissionView extends UIView implements IController<LobbyService> {
    service: LobbyService;

    @property(ScroViewPlus)
    scrollView: ScroViewPlus = null;
    _clickItemId: number = 0;
    _missionList = [];
    missionId: number = null;

    public static getPrefabUrl() {
        return "mission/prefabs/MissionView";
    }

    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent('Event_S2C_GetMissionList', this.onEvent_S2C_GetMissionList);
        this.registerEvent('Event_S2C_MissionClaim', this.onEvent_S2C_MissionClaim);
        this.registerEvent('updateUserInfo', this.onEvent_S2C_GetMissionList);
    }

    show() {
        this.requestGetMissionList();
    }

    requestGetMissionList() {
        let req = MST.C2S_GetMissionList.create({
            serial: Manager.netManager.getNewSeqId()
        });
        let buffer = MST.C2S_GetMissionList.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_GetMissionList, MST.OuterOpcode_Lobby.C2S_GetMissionList, buffer);
    }

    onClick(name, node) {
        switch (name) {
            case 'btnHome':
                Manager.uiManager.open({ type: HallNewView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnDompet':
                Manager.uiManager.open({ type: WalletView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnLogin':
                Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnEvent':
                // Manager.uiManager.open({ type: MissionView, bundle: BUNDLE_RESOURCES });
                break;
            case 'btnAkun':
                Manager.uiManager.open({ type: AkunView, bundle: BUNDLE_RESOURCES });
                this.close();
                break;
            case 'btnQiandao':
                if (this.checkLogined())
                    Manager.uiManager.open({ type: SigninNew, bundle: BUNDLE_RESOURCES });
                break;
        }

    }

    checkLogined() {
        let userData = G.DataMgr.get(UserData);
        if (!userData.id) {
            Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
            return false;
        }
        return true;
    }

    onEvent_S2C_GetMissionList() {
        let hallData = G.DataMgr.get(HallData);
        let missionList = hallData.missionList;
        if (missionList) {
            this._missionList = missionList;
            this.MissionItemView(missionList);
        }
    }

    onEvent_S2C_MissionClaim(data) {
        PanelHelp.showTip(i18n.MISSION.RECEIVEDSUCCESS);

        let index = 0;
        let missionId = data.missionId;
        for (let index = 0; index < this._missionList.length; index++) {
            const info = this._missionList[index];
            if (data.missionId == missionId) {
                info.curProgress = 0;
                break;
            }
            index++;
        }

        this.scrollView.content.children.forEach((element) => {
            let missionItemCom = element.getComponent(MissionItem)
            let _missionId = missionItemCom.missionId
            if (_missionId == missionId) {
                missionItemCom.updateData(this._missionList[index])
            }
        })
    }

    async MissionItemView(missionList) {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = missionList
        scroViewCtrlCom.onItemClickCallback = this.onClickEmailItem.bind(this)
        await scroViewCtrlCom.framingLoad(missionList.length)
    }

    onClickEmailItem(_itemId) {
        this._clickItemId = _itemId
        // this.scrollView.content.children.forEach((element) => {
        //     let emailItemCom = element.getComponent(MissionItem)
        //     let itemId = emailItemCom._itemId
        //     if (_itemId == itemId) {
        //         emailItemCom.updateData(this._missionList[this._clickItemId])
        //     } else {
        //         emailItemCom.bgCheck.active = false
        //     }
        // })
        let missionId = this._missionList[_itemId].missionId;
        this.missionId = missionId;
        this.requestMissionClaim();
    }

    requestMissionClaim() {
        let req = MST.C2S_MissionClaim.create({
            serial: Manager.netManager.getNewSeqId(),
            missionId: this.missionId
        });
        let buffer = MST.C2S_MissionClaim.encode(req).finish();
        LobbyService.instance.sendMsg(MST.C2S_MissionClaim, MST.OuterOpcode_Lobby.C2S_MissionClaim, buffer);
    }

    onDestroy() {
        super.onDestroy();
    }

}
