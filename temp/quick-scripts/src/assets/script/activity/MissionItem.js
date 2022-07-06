"use strict";
cc._RF.push(module, 'f7f08HyPbxGbY5jZQ4D3H1w', 'MissionItem');
// script/activity/MissionItem.ts

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
const UserData_1 = __importDefault(require("../data/UserData"));
const Defines_1 = require("../framework/base/Defines");
const DateUtils_1 = __importDefault(require("../framework/extentions/DateUtils"));
const Manager_1 = require("../common/manager/Manager");
const LoginNewView_1 = __importDefault(require("../login/LoginNewView"));
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
};
let MissionItem = class MissionItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.bg = null;
        this.bgCheck = null;
        this.iconFrame = null;
        this.iconTitle = null;
        this.labRule = null;
        this.labTime = null;
        this.progressBar = null;
        this.labBar = null;
        this.btnDraw = null;
        this.btnSigin = null;
        this._itemId = 0;
        this.missionId = null;
        this._itemClickCallback = null;
        // update (dt) {}
    }
    onLoad() {
        this.node.opacity = 0;
        this.bg.active = true;
        this.btnDraw.active = false;
        // this.bgCheck.active = false
        this.btnSigin.active = this.checkIsLogin();
    }
    checkIsLogin() {
        let userData = G.DataMgr.get(UserData_1.default);
        if (!userData.id) {
            return true;
        }
        return false;
    }
    updateItem(data, itemId, onClickCallback) {
        this._itemId = itemId;
        this.missionId = data.missionId;
        this._itemClickCallback = onClickCallback;
        this.updateData(data);
    }
    updateData(data) {
        if (data) {
            let missionId = data.missionId;
            let beginTime = data.beginTime;
            let endTime = data.endTime;
            let reward = data.reward;
            let targetProgess = Number(data.targetProgress);
            let curProgress = Number(data.curProgress);
            let info = missionInfo[missionId];
            let formatBeginTime = DateUtils_1.default.getYMD(beginTime);
            let formatEndTime = DateUtils_1.default.getYMD(endTime);
            let framePath = info.framePath;
            let titlePath = info.titlePath;
            // console.log('结束时间:' + formatEndTime);
            let rouleStr = info.roule;
            rouleStr = String(rouleStr).replace(/xxxx/g, String(reward));
            if (data.endTime == 0)
                formatEndTime = '';
            this.labTime.string = `${formatBeginTime} - ${formatEndTime}`;
            this.labRule.string = rouleStr;
            let bar = this.progressBar.getComponent(cc.Sprite);
            bar.fillRange = Number(curProgress / targetProgess);
            this.btnDraw.active = curProgress == targetProgess;
            this.labBar.string = Math.floor(curProgress) + '/' + Math.floor(targetProgess);
            this.iconFrame.loadImage({ url: framePath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
            this.iconTitle.loadImage({ url: titlePath, view: this, bundle: Defines_1.BUNDLE_RESOURCES });
        }
    }
    onItemClick(event, type) {
        if (this._itemClickCallback) {
            this._itemClickCallback(this._itemId);
        }
        // console.log(event);
    }
    onClickSigin() {
        Manager_1.Manager.uiManager.open({ type: LoginNewView_1.default, bundle: Defines_1.BUNDLE_RESOURCES });
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
};
__decorate([
    property(cc.Node)
], MissionItem.prototype, "bg", void 0);
__decorate([
    property(cc.Node)
], MissionItem.prototype, "bgCheck", void 0);
__decorate([
    property(cc.Sprite)
], MissionItem.prototype, "iconFrame", void 0);
__decorate([
    property(cc.Sprite)
], MissionItem.prototype, "iconTitle", void 0);
__decorate([
    property(cc.Label)
], MissionItem.prototype, "labRule", void 0);
__decorate([
    property(cc.Label)
], MissionItem.prototype, "labTime", void 0);
__decorate([
    property(cc.Sprite)
], MissionItem.prototype, "progressBar", void 0);
__decorate([
    property(cc.Label)
], MissionItem.prototype, "labBar", void 0);
__decorate([
    property(cc.Node)
], MissionItem.prototype, "btnDraw", void 0);
__decorate([
    property(cc.Node)
], MissionItem.prototype, "btnSigin", void 0);
MissionItem = __decorate([
    ccclass
], MissionItem);
exports.default = MissionItem;

cc._RF.pop();