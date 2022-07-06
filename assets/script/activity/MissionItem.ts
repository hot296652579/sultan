import UserData from "../data/UserData";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import DateUtils from "../framework/extentions/DateUtils";
import { MST } from "../framework/external/protoc";
import { Manager } from "../common/manager/Manager";
import LoginNewView from "../login/LoginNewView";

const { ccclass, property } = cc._decorator;
const missionInfo = {
    //7天签到
    0: {
        title: 'Seven day sign in task',
        titlePath: 'mission/image/zi_a1',
        framePath: 'mission/image/icon_g1',
        roule: 'Continuously check in the website within a fixed time to obtain gold coins xxxx'
    },
    //30天签到
    1: {
        title: '30 day sign in task',
        titlePath: 'mission/image/zi_a2',
        framePath: 'mission/image/icon_g2',
        roule: 'Continuously check in the website within a fixed time to obtain gold coins xxxx'
    },
    //充值任务
    2: {
        title: 'Recharge task',
        titlePath: 'mission/image/zi_a3',
        framePath: 'mission/image/icon_g3',
        roule: 'You can receive gold coins when your recharge reaches a certain amount within a certain period of time,coins xxxx'
    },
    //推广任务
    3: {
        title: 'Promotion task',
        titlePath: 'mission/image/zi_a4',
        framePath: 'mission/image/icon_g4',
        roule: 'You can receive gold coins when the number of promoters reaches a certain amount within a certain period of time,coins xxxx'
    },
    //下线充值任务
    4: {
        title: 'Offline recharge task',
        titlePath: 'mission/image/zi_a5',
        framePath: 'mission/image/icon_g5',
        roule: 'You can receive gold coins when your accumulated recharge reaches a certain amount during the promotion period,coins xxxx'
    }
}

@ccclass
export default class MissionItem extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null

    @property(cc.Node)
    bgCheck: cc.Node = null

    @property(cc.Sprite)
    iconFrame: cc.Sprite = null

    @property(cc.Sprite)
    iconTitle: cc.Sprite = null

    @property(cc.Label)
    labRule: cc.Label = null

    @property(cc.Label)
    labTime: cc.Label = null

    @property(cc.Sprite)
    progressBar: cc.Sprite = null

    @property(cc.Label)
    labBar: cc.Label = null

    @property(cc.Node)
    btnDraw: cc.Node = null

    @property(cc.Node)
    btnSigin: cc.Node = null

    _itemId: number = 0
    missionId: number = null

    _itemClickCallback: any = null

    onLoad() {
        this.node.opacity = 0;
        this.bg.active = true
        this.btnDraw.active = false;
        // this.bgCheck.active = false

        this.btnSigin.active = this.checkIsLogin();
    }

    checkIsLogin() {
        let userData = G.DataMgr.get(UserData);
        if (!userData.id) {
            return true;
        }

        return false;
    }

    updateItem(data, itemId, onClickCallback) {
        this._itemId = itemId
        this.missionId = data.missionId
        this._itemClickCallback = onClickCallback

        this.updateData(data)
    }

    updateData(data: MST.MissionInfo) {
        if (data) {
            let missionId = data.missionId;
            let beginTime = data.beginTime;
            let endTime = data.endTime;
            let reward = data.reward;
            let targetProgess = Number(data.targetProgress);
            let curProgress = Number(data.curProgress);

            let info = missionInfo[missionId];
            let formatBeginTime = DateUtils.getYMD(beginTime);
            let formatEndTime = DateUtils.getYMD(endTime);
            let framePath = info.framePath;
            let titlePath = info.titlePath;
            // console.log('结束时间:' + formatEndTime);
            let rouleStr = info.roule;
            rouleStr = String(rouleStr).replace(/xxxx/g, String(reward));

            if (data.endTime == 0)
                formatEndTime = '';

            this.labTime.string = `${formatBeginTime} - ${formatEndTime}`

            this.labRule.string = rouleStr;

            let bar = this.progressBar.getComponent(cc.Sprite);
            bar.fillRange = Number(curProgress / targetProgess);
            this.btnDraw.active = curProgress == targetProgess;
            this.labBar.string = Math.floor(curProgress) + '/' + Math.floor(targetProgess)

            this.iconFrame.loadImage({ url: framePath, view: this, bundle: BUNDLE_RESOURCES })
            this.iconTitle.loadImage({ url: titlePath, view: this, bundle: BUNDLE_RESOURCES })
        }
    }

    onItemClick(event, type) {
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId)
        }
        // console.log(event);
    }

    onClickSigin() {
        Manager.uiManager.open({ type: LoginNewView, bundle: BUNDLE_RESOURCES });
    }

    /**
     * 本Item进入ScrollView的时候回调
     */
    onEnterSrcollView() {
        this.node.opacity = 255;
    }

    /**
     * 本Item离开ScrollView的时候回调
     */
    onExitScrollView() {
        this.node.opacity = 0;
    }

    // update (dt) {}
}
