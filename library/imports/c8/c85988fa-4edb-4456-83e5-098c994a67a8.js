"use strict";
cc._RF.push(module, 'c8598j6TttEVoPlCYyZSmeo', 'TournamentDetailView');
// script/tournament/TournamentDetailView.ts

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
const Config_1 = require("../common/config/Config");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const Framework_1 = require("../framework/Framework");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const android_1 = require("../platform/android");
const SignUpPlayersView_1 = __importDefault(require("./SignUpPlayersView"));
const TournamentData_1 = __importDefault(require("./TournamentData"));
const { ccclass, property } = cc._decorator;
let TournamentDetailView = class TournamentDetailView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.detailNode = null;
        this.signUpNode = null;
        this.head = null;
        this.creatorName = null;
        this.game = null;
        this.pPeople = null;
        this.rewardChip = [];
        this.enterPassword = null;
        this.touenamentID = null;
        this.password_SignUp = null;
        this.password = null;
        this.detailjoinFee = null;
        this.sginUpjoinFee = null;
        this.closeBtn = null;
        this.signUpPlayersBtn = null;
        this.signUpBtn = null;
        this.exitTournamentBtn = null;
        this.joinBtn = null;
        this.shareNode = null;
        this.shareBG = null;
        this.shanrPassword = null;
        this.shanrTournamentID = null;
        this.icon = null;
        this._isSaveIamge = false;
    }
    static getPrefabUrl() {
        return "tournament/prefabs/TournamentDetailView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
        this.updateView();
    }
    hideUI() {
        this.closeBtn.active = false;
        this.signUpBtn.active = false;
        this.signUpPlayersBtn.active = false;
        this.exitTournamentBtn.active = false;
        this.shareBG.active = false;
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args[0]) {
            this.data = args[0];
        }
        console.log("ITournamentDetailRes", this.data);
        this.hideUI();
        //显示详情还是显示报名
        if (this.data.userId == 0) { //创房ID = 0 官方赛
            this.data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
        }
        else { //自建赛 
            if (this.data.userId == User_1.User._userID) { //我创建的
                this.detailNode.active = true;
                this.closeBtn.active = true;
                this.signUpPlayersBtn.active = true;
            }
            else { //别人创建的
                this.data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
            }
            this.data.signStatus == 0 ? this.signUpBtn.active = true : this.exitTournamentBtn.active = true;
            this.joinBtn.active = this.data.signStatus != 0;
        }
        this.shareNode.x = this.signUpNode.active ? 110 : 0;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentSignUp), this.onNetTournamentSignUp);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentSignUpUsers), this.onNetTournamentSignUpUsersRes);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CloseTournament), this.onNetCloseTournamentRes);
        this.registerEvent("handleSaveImageToLocal", (isSuccess) => {
            if (isSuccess) {
                this.unscheduleAllCallbacks();
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.REDPAKGE.saveSuccess);
                this._isSaveIamge = false;
                this.shareImageChangeUI(false);
            }
        });
    }
    updateView() {
        this.creatorName.string = UtilMgr_1.UtilMgr.setString(this.data.nickname);
        this.pPeople.string = this.data.numberOfParticipants + "-people";
        this.shanrPassword.string = this.password_SignUp.string = this.password.string = this.data.password.length == 0 ? "No Password" : this.data.password;
        this.shanrTournamentID.string = this.touenamentID.string = this.data.tournamentId + "";
        this.sginUpjoinFee.string = this.detailjoinFee.string = UtilMgr_1.UtilMgr.changeMoney(this.data.joinFee);
        this.game.string = Config_1.Config.games[this.data.gameId].disName;
        let reward = this.data.reward.split(',');
        this.rewardChip.forEach((nd, index) => {
            if (index < reward.length) {
                nd.active = true;
                nd.getChildByName('lb_Glod').getComponent(cc.Label).string = UtilMgr_1.UtilMgr.changeMoney(reward[index]);
            }
        });
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, this.data.headImg, this.data.userId + "", this);
        this.enterPassword.node.active = !!this.data.enterPassword;
        // this.sginUpjoinFee.node.parent.active = this.detailjoinFee.node.parent.active = this.data.bonusSource == 0;
        this.sginUpjoinFee.node.parent.active = this.detailjoinFee.node.parent.active = this.data.joinFee != 0;
        let qrcode = this.shareUrl();
        this.createQRcode(decodeURIComponent(qrcode));
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "closeBtn":
                PanelHelp_1.default.showDialog("", LanguageImpl_1.i18n.Tournament.CloseTournament, () => {
                    //关闭锦标赛 返回大厅
                    this.reqCloseTournament();
                }, () => {
                    //返回上一级
                }, "btn_Cancel", "btn_Confirm");
                break;
            case "signUpPlayerBtn":
                this.reqSignUpUsers();
                break;
            case "joinBtn":
                this.reqJoinTournament();
                break;
            case "signUpBtn_1":
                this.reqSignUp(1);
                break;
            case "sginUpBtn_2":
                this.reqSignUp(2);
                break;
            case "exitTournamentBtn":
                this.reqSignUp(3);
                break;
            case "saveImageBtn":
                this.onSaveImage();
                break;
            case "facebookBtn":
                this.onShareFaceBook();
                break;
            case "copyLineBtn":
                this.onCopyTournamentInfo();
                break;
            case "copyIDBtn":
                window['platformUtil'].copyToClip(this.touenamentID.string);
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqSignUp(type) {
        let password, signType;
        if (type == 1) { //输入密码报名
            password = this.data.enterPassword == 1 ? this.enterPassword.string : "";
            signType = 0;
        }
        else if (type == 2) { //已知密码报名
            password = this.data.password;
            signType = 0;
        }
        else if (type == 3) { //退赛
            password = this.data.password;
            signType = 1;
        }
        let jsonData = {
            tournamentId: this.data.tournamentId,
            password: password,
            type: signType,
        };
        this.signType = signType;
        this.pw = password;
        G.Logger.log("报名锦标赛", type, jsonData);
        let req = CommonService_1.protoPackage.hall.TournamentSignUpReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.TournamentSignUpReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentSignUp, buffer);
    }
    onNetTournamentSignUp(data) {
        if (data.statusMsg.status == 0) {
            this.signUpBtn.active = this.signType == 1;
            this.exitTournamentBtn.active = this.signType != 1;
            this.signUpNode.active = this.signType == 1 && this.data.userId != User_1.User._userID;
            this.detailNode.active = this.data.userId == User_1.User._userID ? true : this.signType != 1;
            this.joinBtn.active = this.signType != 1;
            TournamentData_1.default.getInstance().flushItmeID = this.data.tournamentId;
            this.shareNode.x = this.signUpNode.active ? 110 : 0;
            if (this.signType == 0)
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.SignSuccessfully);
            this.shanrPassword.string = this.password_SignUp.string = this.password.string = this.pw.length == 0 ? "No Password" : this.pw;
            dispatch("UpdateTournamentList");
        }
        else {
            if (data.statusMsg.status == 251) {
                PanelHelp_1.default.showMsgBox("", LanguageImpl_1.i18n.FRIENDROOM.ToRecharge, () => {
                    dispatch("openRechargeView");
                }, "btn_Recharge");
            }
            else if (data.statusMsg.status == 309) {
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.Tournament.passwordWong);
            }
            else {
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
            }
        }
    }
    reqSignUpUsers() {
        let jsonData = {
            tournamentId: this.data.tournamentId,
        };
        let req = CommonService_1.protoPackage.hall.TournamentSignUpUsersReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.TournamentSignUpUsersReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_TournamentSignUpUsers, buffer);
    }
    onNetTournamentSignUpUsersRes(data) {
        if (data.statusMsg.status == 0) {
            Framework_1.Manager.uiManager.open({ type: SignUpPlayersView_1.default, bundle: Defines_1.BUNDLE_RESOURCES, args: [data.users] });
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    reqCloseTournament() {
        let jsonData = {
            tournamentId: this.data.tournamentId,
        };
        let req = CommonService_1.protoPackage.hall.CloseTournamentReq.create(jsonData);
        let buffer = CommonService_1.protoPackage.hall.CloseTournamentReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CloseTournament, buffer);
    }
    onNetCloseTournamentRes(data) {
        if (data.statusMsg.status == 0) {
            dispatch("UpdateTournamentList");
            this.closeWithAction();
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    //进入比赛场
    reqJoinTournament() {
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.Waiting.EnterGame);
        TournamentData_1.default.getInstance().isTournamentGame = true;
        TournamentData_1.default.getInstance().tournamentID = this.data.tournamentId;
        TournamentData_1.default.getInstance().toServerId = this.data.serverId;
        TournamentData_1.default.getInstance().serverType = this.data.serverType;
        dispatch("JoinTournament", { serviceType: this.data.serverType, toServerId: this.data.serverId });
    }
    shareUrl() {
        let shareAddress = G.URLMgr.shareFriendRoomURL;
        let channel = window['platformUtil'].getAppQuDaoId();
        let userId = User_1.User._userID;
        let gameId = this.data.gameId;
        let tournamentId = this.data.tournamentId;
        let shareUrl = shareAddress + "/t/" + channel + "/" + userId + "/" + gameId + "/" + tournamentId + "/index.html";
        return shareUrl;
    }
    onCopyTournamentInfo() {
        let copyStr = this.shareUrl();
        window['platformUtil'].copyToClip(copyStr, LanguageImpl_1.i18n.FRIENDROOM.CopyRoomInfoSuccess);
    }
    onShareFaceBook() {
        let shareUrl = this.shareUrl();
        window['platformUtil'].shareToFacebook(android_1.shareType.LINK, shareUrl, shareUrl);
    }
    shareImageChangeUI(isShare) {
        this.shareBG.active = isShare;
        this.detailNode.active = !isShare;
    }
    onSaveImage() {
        this.shareImageChangeUI(true);
        if (this._isSaveIamge) {
            return;
        }
        this._isSaveIamge = true;
        UtilMgr_1.UtilMgr.captureTexture(this.shareNode);
        this.scheduleOnce(() => {
            this._isSaveIamge = false;
            this.shareImageChangeUI(false);
        }, 5);
    }
    createQRcode(url) {
        var qrcode = new window["QRCode"](-1, 3);
        qrcode.addData(url);
        qrcode.make();
        this.icon.fillColor = cc.Color.BLACK;
        //块宽高
        var tileW = this.icon.node.width / qrcode.getModuleCount();
        var tileH = this.icon.node.height / qrcode.getModuleCount();
        // draw in the Graphics
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    // ctx.fillColor = cc.Color.BLACK;
                    var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                    var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                    this.icon.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    this.icon.fill();
                }
            }
        }
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "detailNode", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "signUpNode", void 0);
__decorate([
    property(cc.Sprite)
], TournamentDetailView.prototype, "head", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "creatorName", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "game", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "pPeople", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "rewardChip", void 0);
__decorate([
    property(cc.EditBox)
], TournamentDetailView.prototype, "enterPassword", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "touenamentID", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "password_SignUp", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "password", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "detailjoinFee", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "sginUpjoinFee", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "closeBtn", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "signUpPlayersBtn", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "signUpBtn", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "exitTournamentBtn", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "joinBtn", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "shareNode", void 0);
__decorate([
    property(cc.Node)
], TournamentDetailView.prototype, "shareBG", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "shanrPassword", void 0);
__decorate([
    property(cc.Label)
], TournamentDetailView.prototype, "shanrTournamentID", void 0);
__decorate([
    property(cc.Graphics)
], TournamentDetailView.prototype, "icon", void 0);
TournamentDetailView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], TournamentDetailView);
exports.default = TournamentDetailView;

cc._RF.pop();