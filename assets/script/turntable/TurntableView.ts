
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { Manager } from "../common/manager/Manager";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import PanelHelp from "../msgbox/PanelHelp";
import AwardWinningView from "./AwardWinningView";
import HelpView from "./HelpView";
import MyPrizeView from "./MyPrizeView";
import PrizeItem from "./PrizeItem";
import { UtilMgr } from "../global/UtilMgr";
const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class TurntableView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.Label)
    remainingTimes: cc.Label = null;

    @property(cc.Node)
    itemContent: cc.Node = null;

    @property(cc.Node)
    lightGround: cc.Node = null;

    @property(cc.Prefab)
    itemPrize: cc.Prefab = null;

    @property(cc.Label)
    awardTips: cc.Label = null;

    public turnTableType: number;
    private prizeData: com.bt.game.proto.hall.IActivityTurntable[];
    private rule: string;
    private movex: number = 0;
    private isCheckSpin: boolean = false;
    private activityTurntableData: com.bt.game.proto.hall.IActivityTurntableRes;
    private currentTimes: number;

    public static inst = null;
    public static getPrefabUrl() {
        return "turntable/prefab/TurntableView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.awardTips.string = '';
        TurntableView.inst = this;
    }

    start() {
        this.activityTurntableRes(this.activityTurntableData);
        this.showLightAnimation();
    }

    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args) {
            this.activityTurntableData = args;
            this.turnTableType = args.type;
        }
        G.Logger.log("args-----------------------", args);
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.Play_Turntable), this.playTurntableRes);
    }

    onClick(name, node) {
        switch (name) {
            case "close":
                if (this.itemContent.getNumberOfRunningActions() > 0) return;
                UtilMgr.popWindows("OpenTurntable");
                this.closeWithAction();
                break;
            case "btn_bangzhu": Manager.uiManager.open({ type: HelpView, bundle: BUNDLE_RESOURCES, args: [this.rule] }); break;
            case "btn_myprize":
                if (this.isCheckSpin) return;
                Manager.uiManager.open({ type: MyPrizeView, bundle: BUNDLE_RESOURCES ,args:[this.turnTableType]});
                break;
            case "btn_spin": this.reqPlayTurntable(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }



    private activityTurntableRes(msg): void {
        if (msg.statusMsg.status == 0) {
            this.remainingTimes.string = msg.remainingTimes;
            this.currentTimes = msg.remainingTimes;
            this.rule = msg.rule;
            if(msg.rotations.length > 0)this.updateAwardTips(msg.rotations);
            this.drawTurntable(msg.activeTurntable);
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[msg.statusMsg.status]);
        }

    }

    private drawTurntable(data: com.bt.game.proto.hall.IActivityTurntable[]) {
        this.prizeData = data;
        this.itemContent.removeAllChildren();
        for (let i = 0; i < data.length; i++) {
            let item = cc.instantiate(this.itemPrize);
            item.parent = this.itemContent;
            item.getComponent(PrizeItem).updateItem(data[i]);
        }
    }

    private reqPlayTurntable() {
        if (this.isCheckSpin) return;
        this.isCheckSpin = true;
        let req = protoPackage.hall.PlayTurntableReq.create({ type: this.turnTableType });//转盘类型 1签到转盘 2充值转盘
        let buffer = protoPackage.hall.PlayTurntableReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.Play_Turntable,
            buffer);
    }

    private playTurntableRes(data: com.bt.game.proto.hall.IPlayTurntableRes) {
        if (data.statusMsg.status == 0) {
            this.runTurnTable(data);
        } else {
            this.isCheckSpin = false;
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }

    }

    runTurnTable(data: com.bt.game.proto.hall.IPlayTurntableRes) {
        let tableId = data.tableId - 1;
        let delay = 2;//先转两圈
        let delay1 = 4//回弹
        let startMoveRotate = 1080;
        let offsetR = this.itemContent.angle % 360;
        this.itemContent.angle = offsetR;//当前item偏差度数;
        let rotate = tableId * 360 * 0.1 + startMoveRotate * 2;
        Manager.globalAudio.playEffect("turntable/audio/rotate", BUNDLE_RESOURCES);
        this.remainingTimes.string = (this.currentTimes - 1) >= 0 ? (this.currentTimes - 1).toString() : "0";
        cc.tween(this.itemContent)
            .to(delay, { angle: -startMoveRotate }, { easing: 'sineIn' })
            .to(delay1, { angle: -rotate }, { easing: 'quadOut' })
            .delay(0.2).call(() => {
                let prizeData = this.prizeData.find(pdata => { return pdata.tableId == data.tableId });
                this.remainingTimes.string = data.remainingTimes >= 0 ? data.remainingTimes.toString() : "0";
                this.currentTimes = data.remainingTimes;
                Manager.globalAudio.playEffect("turntable/audio/win", BUNDLE_RESOURCES);
                Manager.uiManager.open({ type: AwardWinningView, bundle: BUNDLE_RESOURCES, args: [data, prizeData] });
            }).delay(0.5).call(()=>{
                //转盘启动按钮是否可以点击  延迟0.5s 防止弹出奖励界面的时候 再次旋转
                this.isCheckSpin = false;
            })
            .start();
    }

    updateAwardTips(tipRotations: com.bt.game.proto.hall.IRotation[]) {
        let nodeWidth = 300;//显示区域宽
        let speed = 50;
        let tipsLen = tipRotations.length;
        let rand = UtilMgr.random(0, tipsLen);
        let arr1 = tipRotations.splice(rand);
        let endTips = arr1.concat(tipRotations);
        let startTip = 0;
        this.movex = nodeWidth * 0.5 + (this.awardTips.node.width > nodeWidth ? this.awardTips.node.width : nodeWidth);
        this.awardTips.string = endTips[startTip].username + " Won " + endTips[startTip].goodsName;
        let time = Math.floor(this.movex / speed)
        this.awardTips.node.x = this.movex;
        G.Logger.log("endTips", endTips);


        let changeTips = () => {
            startTip += 1;
            if (startTip > tipsLen - 1) {
                startTip = 0;
            }
            let x = this.awardTips.node.width * 0.5 + nodeWidth * 0.5;
            if (this.awardTips.node.x >= x || this.awardTips.node.x <= -x) {
                this.awardTips.string = endTips[startTip].username + " Won " + endTips[startTip].goodsName;
                this.movex = nodeWidth * 0.5 + (this.awardTips.node.width > nodeWidth ? this.awardTips.node.width : nodeWidth);
            }
        }

        cc.tween(this.awardTips.node)
            .repeatForever(cc.tween().to(time, { position: cc.v2(-this.movex, 0) })
                .call(() => {
                    this.awardTips.node.x = this.movex;
                    changeTips();
                })).start()

        //改了 不用间隔十秒滚动
        // this.schedule(changeTips, 10);
    }
    showLightAnimation() {
        if (this.lightGround && this.lightGround.children[0]) {
            let light = this.lightGround.children[0];
            this.lightGround.removeAllChildren();
            for (let i = 0; i < 24; i++) {
                let lightItem = cc.instantiate(light);
                lightItem.parent = this.lightGround;
                lightItem.angle = -15 * i;
            }
            this.lightGround.children.forEach((lt, i) => {
                if (i % 4 == 0) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(0.8), cc.fadeOut(0.8), cc.delayTime(4.8))));
                } else if (i % 4 == 1) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.delayTime(1.6), cc.fadeIn(0.8), cc.fadeOut(0.8), cc.delayTime(3.2))));
                } else if (i % 4 == 2) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.delayTime(3.2), cc.fadeIn(0.8), cc.fadeOut(0.8), cc.delayTime(1.6))));
                } else if (i % 4 == 3) {
                    lt.runAction(cc.repeatForever(cc.sequence(cc.delayTime(4.8), cc.fadeIn(0.8), cc.fadeOut(0.8))));
                }
            });
        }

    }
    onDestroy() {
        // this.unscheduleAllCallbacks();
        this.turnTableType = 0;
        TurntableView.inst = null;
        super.onDestroy();
    }
}
