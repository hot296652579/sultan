import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { injectService } from "../framework/decorator/Decorators";
import DateUtils from "../framework/extentions/DateUtils";
import { com } from "../framework/external/protoc";
import UIView from "../framework/ui/UIView";
import { UtilMgr } from "../global/UtilMgr";
import PBExtractPasswdView from "./PBExtractPasswdView";
import { i18n } from "../common/language/LanguageImpl";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class DepositReceiptItemNode extends UIView {
    service: LobbyService;

    @property(cc.Label)
    labTime: cc.Label = null;

    @property(cc.Label)
    labOperationAmount: cc.Label = null;

    @property(cc.Label)
    labInterestRate: cc.Label = null;

    @property(cc.Label)
    labExpectedReturn: cc.Label = null;

    @property(cc.Label)
    labTimeLeft: cc.Label = null;

    @property(cc.Label)
    labTransferredOut: cc.Label = null;

    @property(cc.Label)
    labCancelled: cc.Label = null;

    @property(cc.Button)
    btnTransferOut: cc.Button = null;

    @property(cc.Button)
    btnCancel: cc.Button = null;

    private m_data: com.bt.game.proto.hall.IIncomeBreakdownInfo = null;


    onLoad() {
        super.onLoad();
        this.initView();
        this.updateView();
    }

    start() {
        this.labCancelled.language = i18n.PIGGY_BANK.CANCELED;
        this.labTransferredOut.language = i18n.PIGGY_BANK.TRANSFERREDOUT;
    }

    public get data(): com.bt.game.proto.hall.IIncomeBreakdownInfo {
        return this.m_data;
    }

    public setData(data: com.bt.game.proto.hall.IIncomeBreakdownInfo): void {
        this.m_data = data;
    }

    public setStatus(status: com.bt.game.proto.hall.IncomeBreakdownStatus): void {
        this.m_data.status = status;
        this.initStatus();
        this.updateStatus(status);
    }

    private initView(): void {
        this.labTime.string = "";
        this.labOperationAmount.string = "";
        this.labInterestRate.string = "";
        this.labExpectedReturn.string = "";
        this.labTimeLeft.string = "";
        this.initStatus();
    }

    private initStatus(): void {
        this.labTransferredOut.node.active = false;
        this.labCancelled.node.active = false;
        this.btnTransferOut.node.active = false;
        this.btnCancel.node.active = false;
    }

    private updateView(): void {
        this.labTime.string = DateUtils.getMDHM(this.m_data.timestamp);
        this.labOperationAmount.string = UtilMgr.changeMoney(Number(this.m_data.amount));
        this.labInterestRate.string = `${this.m_data.rate / 100}%`;
        this.labExpectedReturn.string = UtilMgr.changeMoney(this.m_data.expectedIncome);
        this.labTimeLeft.string = DateUtils.getRemainTimeDH((new Date()).getTime(), Number(this.m_data.incomeDeadline));
        this.updateStatus(this.m_data.status);
    }

    private updateStatus(status: com.bt.game.proto.hall.IncomeBreakdownStatus): void {
        switch (status) {
            case com.bt.game.proto.hall.IncomeBreakdownStatus.CANCELABLE:
                this.btnCancel.node.active = true;
                break;
            case com.bt.game.proto.hall.IncomeBreakdownStatus.CANCELED:
                this.labCancelled.node.active = true;
                break;
            case com.bt.game.proto.hall.IncomeBreakdownStatus.EXTRACTABLE:
                this.btnTransferOut.node.active = true;
                break;
            case com.bt.game.proto.hall.IncomeBreakdownStatus.EXTRACED:
                this.labTransferredOut.node.active = true;
                break;
        }
    }

    onClick(name: string) {
        switch (name) {
            case "btnCancel":
                this.onClickCancel();
                break;
            case "btnTransferOut":
                this.onClickExtract();
                break;
        }
    }

    onClickCancel(): void {
        this.playDefaultEffect();
        let req = protoPackage.hall.CancelStoredAmountReq.create({ id: this.m_data.id });
        let buffer = protoPackage.hall.CancelStoredAmountReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_CANCEL_STORED_AMOUNT,
            buffer);
    }

    onClickExtract(): void {
        this.playDefaultEffect();

        let req = protoPackage.hall.ExtractAmountReq.create({ id: this.m_data.id, passwd: "" });
        let buffer = protoPackage.hall.ExtractAmountReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_EXTRACT_AMOUNT,
            buffer);

        // Manager.uiManager.open({ type: PBExtractPasswdView, bundle: BUNDLE_RESOURCES, args: [this.m_data] });
    }

}
