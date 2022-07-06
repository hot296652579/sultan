

import ScroViewPlus from "../common/component/ScroViewPlus";
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import UIView from "../framework/ui/UIView";
import { LobbyService } from "../common/net/LobbyService";
import { IController } from "../framework/controller/Controller";
import { makeKey, injectService } from "../framework/decorator/Decorators";
import { serverType, protoPackage } from "../common/net/CommonService";
import { Manager } from "../common/manager/Manager";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class RechargeRecordPanel extends UIView implements IController<LobbyService>{
    service: LobbyService;

    @property(cc.Node)
    noRecord: cc.Node = null;

    @property(cc.Label)
    labTime: cc.Label = null;

    @property(cc.Label)
    labCommodity: cc.Label = null;

    @property(cc.Label)
    labAmount: cc.Label = null;

    @property(cc.Label)
    labState: cc.Label = null;

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_ProductOrder), (res) => {
            this.noRecord.active = res.productOrder.length == 0;
            this.rankView(res.productOrder)
        });
    }
    onLoad() {
        super.onLoad();
    }
    start() {
        this.labTime.language = Manager.makeLanguage("RECHARGE.Time");
        this.labCommodity.language = Manager.makeLanguage("RECHARGE.Commodity");
        this.labAmount.language = Manager.makeLanguage("RECHARGE.Amount");
        this.labState.language = Manager.makeLanguage("RECHARGE.State");
    }
    onEnable() {
        this.requestRecordList();
    }
    requestRecordList() {
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_ProductOrder,
            null);
    }
    async rankView(rankingList) {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = rankingList
        await scroViewCtrlCom.framingLoad(rankingList.length, true)
    }


}
