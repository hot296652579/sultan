
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { Manager } from "../framework/Framework";
import UIView from "../framework/ui/UIView";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class MyPrizeView extends UIView implements IController<LobbyService> {

    service: LobbyService;
    turnTableType: number;
    public static getPrefabUrl() {
        return "turntable/prefab/MyPrizeView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }

    start() {
        this.reqTurntableRecord();
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        this.turnTableType = args && args[0] ? args[0] : 0;
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.Turntable_Record), this.onNetTurntableRecord);
        this.registerEvent("UPDATE_PRIZE_RECORD", this.reqTurntableRecord);

    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }

    reqTurntableRecord() {
        G.Logger.log("请求record列表",this.turnTableType);

        let req = protoPackage.hall.TurntableRecordReq.create({ type: this.turnTableType });//转盘类型 1签到转盘 2充值转盘
        let buffer = protoPackage.hall.TurntableRecordReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.Turntable_Record,
            buffer);
    }

    onNetTurntableRecord(data) {
        if (data.statusMsg.status == 0) {
            if (data.turntableRecords.length) {
                this.turntableRecordListView(data.turntableRecords);
            }
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }

    }
    async turntableRecordListView(turntableRecords) {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = turntableRecords
        await scroViewCtrlCom.framingLoad(turntableRecords.length, true)
        PanelHelp.hideLoading()
    }
    onDestroy() {
        super.onDestroy();
    }
}

