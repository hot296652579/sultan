
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/tournament/TournamentDetailView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdG91cm5hbWVudC9Ub3VybmFtZW50RGV0YWlsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFpRDtBQUNqRCxrRUFBdUQ7QUFDdkQsK0RBQXVFO0FBQ3ZFLDZEQUEwRDtBQUMxRCx1REFBNkQ7QUFFN0Qsa0VBQTJFO0FBRTNFLHNEQUFpRDtBQUNqRCxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFDNUMsaURBQWdEO0FBQ2hELDRFQUFvRDtBQUNwRCxzRUFBOEM7QUFFOUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBSTVDLElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxnQkFBTTtJQUF4RDs7UUFLSSxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsU0FBSSxHQUFjLElBQUksQ0FBQztRQUd2QixnQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixTQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsZUFBVSxHQUFjLEVBQUUsQ0FBQztRQUczQixrQkFBYSxHQUFlLElBQUksQ0FBQztRQUdqQyxpQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixvQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBR2pDLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBR2xDLFlBQU8sR0FBWSxJQUFJLENBQUM7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QyxFQUFFLENBQUMsS0FBSyxDQUFDOzJEQUNZO0FBRy9CO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ1k7QUFHL0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDTztBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNlO0FBR2pDO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1E7QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrREFDZ0I7QUFHbEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDTTtBQUl4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNRO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ007QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyREFDWTtBQUcvQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytEQUNnQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2tEQUNHO0FBeEVSLG9CQUFvQjtJQUZ4QyxPQUFPO0lBQ1AsMEJBQWEsQ0FBQywyQkFBWSxDQUFDLFFBQVEsQ0FBQztHQUNoQixvQkFBb0IsQ0FvV3hDO2tCQXBXb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCB7IHNlcnZlclR5cGUsIHByb3RvUGFja2FnZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0NvbW1vblNlcnZpY2VcIjtcbmltcG9ydCB7IExvYmJ5U2VydmljZSB9IGZyb20gXCIuLi9jb21tb24vbmV0L0xvYmJ5U2VydmljZVwiO1xuaW1wb3J0IHsgQlVORExFX1JFU09VUkNFUyB9IGZyb20gXCIuLi9mcmFtZXdvcmsvYmFzZS9EZWZpbmVzXCI7XG5pbXBvcnQgeyBJQ29udHJvbGxlciB9IGZyb20gXCIuLi9mcmFtZXdvcmsvY29udHJvbGxlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL0ZyYW1ld29ya1wiO1xuaW1wb3J0IFVJVmlldyBmcm9tIFwiLi4vZnJhbWV3b3JrL3VpL1VJVmlld1wiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgc2hhcmVUeXBlIH0gZnJvbSBcIi4uL3BsYXRmb3JtL2FuZHJvaWRcIjtcbmltcG9ydCBTaWduVXBQbGF5ZXJzVmlldyBmcm9tIFwiLi9TaWduVXBQbGF5ZXJzVmlld1wiO1xuaW1wb3J0IFRvdXJuYW1lbnREYXRhIGZyb20gXCIuL1RvdXJuYW1lbnREYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5AaW5qZWN0U2VydmljZShMb2JieVNlcnZpY2UuaW5zdGFuY2UpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb3VybmFtZW50RGV0YWlsVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT4ge1xuXG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGV0YWlsTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzaWduVXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjcmVhdG9yTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGdhbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwUGVvcGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByZXdhcmRDaGlwOiBjYy5Ob2RlW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIGVudGVyUGFzc3dvcmQ6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRvdWVuYW1lbnRJRDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBhc3N3b3JkX1NpZ25VcDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBhc3N3b3JkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgZGV0YWlsam9pbkZlZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNnaW5VcGpvaW5GZWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNsb3NlQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNpZ25VcFBsYXllcnNCdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2lnblVwQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGV4aXRUb3VybmFtZW50QnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGpvaW5CdG46IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzaGFyZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2hhcmVCRzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2hhbnJQYXNzd29yZDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNoYW5yVG91cm5hbWVudElEOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuR3JhcGhpY3MpXG4gICAgaWNvbjogY2MuR3JhcGhpY3MgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBkYXRhOiBjb20uYnQuZ2FtZS5wcm90by5oYWxsLklUb3VybmFtZW50RGV0YWlsUmVzXG4gICAgcHJpdmF0ZSBzaWduVHlwZTogbnVtYmVyO1xuICAgIHByaXZhdGUgcHc6IHN0cmluZztcbiAgICBwcml2YXRlIF9pc1NhdmVJYW1nZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ0b3VybmFtZW50L3ByZWZhYnMvVG91cm5hbWVudERldGFpbFZpZXdcIjtcbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgaGlkZVVJKCkge1xuICAgICAgICB0aGlzLmNsb3NlQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNpZ25VcEJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaWduVXBQbGF5ZXJzQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4aXRUb3VybmFtZW50QnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoYXJlQkcuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2hvdyhhcmdzKSB7XG4gICAgICAgIHN1cGVyLnNob3coYXJncyk7XG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSk7XG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGFyZ3NbMF07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJJVG91cm5hbWVudERldGFpbFJlc1wiLCB0aGlzLmRhdGEpO1xuICAgICAgICB0aGlzLmhpZGVVSSgpO1xuICAgICAgICAvL+aYvuekuuivpuaDhei/mOaYr+aYvuekuuaKpeWQjVxuICAgICAgICBpZiAodGhpcy5kYXRhLnVzZXJJZCA9PSAwKSB7Ly/liJvmiL9JRCA9IDAg5a6Y5pa56LWbXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2lnblN0YXR1cyA9PSAwID8gdGhpcy5zaWduVXBOb2RlLmFjdGl2ZSA9IHRydWUgOiB0aGlzLmRldGFpbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHsvL+iHquW7uui1myBcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEudXNlcklkID09IFVzZXIuX3VzZXJJRCkgey8v5oiR5Yib5bu655qEXG4gICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2lnblVwUGxheWVyc0J0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHsvL+WIq+S6uuWIm+W7uueahFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zaWduU3RhdHVzID09IDAgPyB0aGlzLnNpZ25VcE5vZGUuYWN0aXZlID0gdHJ1ZSA6IHRoaXMuZGV0YWlsTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kYXRhLnNpZ25TdGF0dXMgPT0gMCA/IHRoaXMuc2lnblVwQnRuLmFjdGl2ZSA9IHRydWUgOiB0aGlzLmV4aXRUb3VybmFtZW50QnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmpvaW5CdG4uYWN0aXZlID0gdGhpcy5kYXRhLnNpZ25TdGF0dXMgIT0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlTm9kZS54ID0gdGhpcy5zaWduVXBOb2RlLmFjdGl2ZSA/IDExMCA6IDA7XG4gICAgfVxuXG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnRTaWduVXApLCB0aGlzLm9uTmV0VG91cm5hbWVudFNpZ25VcCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX1RvdXJuYW1lbnRTaWduVXBVc2VycyksIHRoaXMub25OZXRUb3VybmFtZW50U2lnblVwVXNlcnNSZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DbG9zZVRvdXJuYW1lbnQpLCB0aGlzLm9uTmV0Q2xvc2VUb3VybmFtZW50UmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwiaGFuZGxlU2F2ZUltYWdlVG9Mb2NhbFwiLCAoaXNTdWNjZXNzKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKClcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlJFRFBBS0dFLnNhdmVTdWNjZXNzKVxuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2F2ZUlhbWdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZUltYWdlQ2hhbmdlVUkoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVWaWV3KCkge1xuICAgICAgICB0aGlzLmNyZWF0b3JOYW1lLnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKHRoaXMuZGF0YS5uaWNrbmFtZSk7XG4gICAgICAgIHRoaXMucFBlb3BsZS5zdHJpbmcgPSB0aGlzLmRhdGEubnVtYmVyT2ZQYXJ0aWNpcGFudHMgKyBcIi1wZW9wbGVcIjtcbiAgICAgICAgdGhpcy5zaGFuclBhc3N3b3JkLnN0cmluZyA9IHRoaXMucGFzc3dvcmRfU2lnblVwLnN0cmluZyA9IHRoaXMucGFzc3dvcmQuc3RyaW5nID0gdGhpcy5kYXRhLnBhc3N3b3JkLmxlbmd0aCA9PSAwID8gXCJObyBQYXNzd29yZFwiIDogdGhpcy5kYXRhLnBhc3N3b3JkO1xuICAgICAgICB0aGlzLnNoYW5yVG91cm5hbWVudElELnN0cmluZyA9IHRoaXMudG91ZW5hbWVudElELnN0cmluZyA9IHRoaXMuZGF0YS50b3VybmFtZW50SWQgKyBcIlwiO1xuICAgICAgICB0aGlzLnNnaW5VcGpvaW5GZWUuc3RyaW5nID0gdGhpcy5kZXRhaWxqb2luRmVlLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkodGhpcy5kYXRhLmpvaW5GZWUpO1xuICAgICAgICB0aGlzLmdhbWUuc3RyaW5nID0gQ29uZmlnLmdhbWVzW3RoaXMuZGF0YS5nYW1lSWRdLmRpc05hbWU7XG4gICAgICAgIGxldCByZXdhcmQgPSB0aGlzLmRhdGEucmV3YXJkLnNwbGl0KCcsJyk7XG4gICAgICAgIHRoaXMucmV3YXJkQ2hpcC5mb3JFYWNoKChuZDogY2MuTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHJld2FyZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBuZC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5kLmdldENoaWxkQnlOYW1lKCdsYl9HbG9kJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KHJld2FyZFtpbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLmhlYWQsIHRoaXMuZGF0YS5oZWFkSW1nLCB0aGlzLmRhdGEudXNlcklkICsgXCJcIiwgdGhpcyk7XG4gICAgICAgIHRoaXMuZW50ZXJQYXNzd29yZC5ub2RlLmFjdGl2ZSA9ICEhdGhpcy5kYXRhLmVudGVyUGFzc3dvcmQ7XG4gICAgICAgIC8vIHRoaXMuc2dpblVwam9pbkZlZS5ub2RlLnBhcmVudC5hY3RpdmUgPSB0aGlzLmRldGFpbGpvaW5GZWUubm9kZS5wYXJlbnQuYWN0aXZlID0gdGhpcy5kYXRhLmJvbnVzU291cmNlID09IDA7XG4gICAgICAgIHRoaXMuc2dpblVwam9pbkZlZS5ub2RlLnBhcmVudC5hY3RpdmUgPSB0aGlzLmRldGFpbGpvaW5GZWUubm9kZS5wYXJlbnQuYWN0aXZlID0gdGhpcy5kYXRhLmpvaW5GZWUgIT0gMDtcbiAgICAgICAgbGV0IHFyY29kZSA9IHRoaXMuc2hhcmVVcmwoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVRUmNvZGUoZGVjb2RlVVJJQ29tcG9uZW50KHFyY29kZSkpO1xuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZUJ0blwiOlxuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93RGlhbG9nKFwiXCIsIGkxOG4uVG91cm5hbWVudC5DbG9zZVRvdXJuYW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy/lhbPpl63plKbmoIfotZsg6L+U5Zue5aSn5Y6FXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVxQ2xvc2VUb3VybmFtZW50KCk7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+i/lOWbnuS4iuS4gOe6p1xuICAgICAgICAgICAgICAgIH0sIFwiYnRuX0NhbmNlbFwiLCBcImJ0bl9Db25maXJtXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInNpZ25VcFBsYXllckJ0blwiOiB0aGlzLnJlcVNpZ25VcFVzZXJzKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImpvaW5CdG5cIjogdGhpcy5yZXFKb2luVG91cm5hbWVudCgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzaWduVXBCdG5fMVwiOiB0aGlzLnJlcVNpZ25VcCgxKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic2dpblVwQnRuXzJcIjogdGhpcy5yZXFTaWduVXAoMik7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImV4aXRUb3VybmFtZW50QnRuXCI6IHRoaXMucmVxU2lnblVwKDMpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzYXZlSW1hZ2VCdG5cIjogdGhpcy5vblNhdmVJbWFnZSgpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJmYWNlYm9va0J0blwiOiB0aGlzLm9uU2hhcmVGYWNlQm9vaygpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjb3B5TGluZUJ0blwiOiB0aGlzLm9uQ29weVRvdXJuYW1lbnRJbmZvKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNvcHlJREJ0blwiOiB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLmNvcHlUb0NsaXAodGhpcy50b3VlbmFtZW50SUQuc3RyaW5nKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHJlcVNpZ25VcCh0eXBlKSB7XG4gICAgICAgIGxldCBwYXNzd29yZDogc3RyaW5nLCBzaWduVHlwZTogbnVtYmVyO1xuICAgICAgICBpZiAodHlwZSA9PSAxKSB7Ly/ovpPlhaXlr4bnoIHmiqXlkI1cbiAgICAgICAgICAgIHBhc3N3b3JkID0gdGhpcy5kYXRhLmVudGVyUGFzc3dvcmQgPT0gMSA/IHRoaXMuZW50ZXJQYXNzd29yZC5zdHJpbmcgOiBcIlwiO1xuICAgICAgICAgICAgc2lnblR5cGUgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikgey8v5bey55+l5a+G56CB5oql5ZCNXG4gICAgICAgICAgICBwYXNzd29yZCA9IHRoaXMuZGF0YS5wYXNzd29yZDtcbiAgICAgICAgICAgIHNpZ25UeXBlID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDMpIHsvL+mAgOi1m1xuICAgICAgICAgICAgcGFzc3dvcmQgPSB0aGlzLmRhdGEucGFzc3dvcmQ7XG4gICAgICAgICAgICBzaWduVHlwZSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGpzb25EYXRhID0ge1xuICAgICAgICAgICAgdG91cm5hbWVudElkOiB0aGlzLmRhdGEudG91cm5hbWVudElkLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLFxuICAgICAgICAgICAgdHlwZTogc2lnblR5cGUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaWduVHlwZSA9IHNpZ25UeXBlO1xuICAgICAgICB0aGlzLnB3ID0gcGFzc3dvcmQ7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcIuaKpeWQjemUpuagh+i1m1wiLHR5cGUsIGpzb25EYXRhKTtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlRvdXJuYW1lbnRTaWduVXBSZXEuY3JlYXRlKGpzb25EYXRhKTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLlRvdXJuYW1lbnRTaWduVXBSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9Ub3VybmFtZW50U2lnblVwLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBvbk5ldFRvdXJuYW1lbnRTaWduVXAoZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG91cm5hbWVudFNpZ25VcFJlcykge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2lnblVwQnRuLmFjdGl2ZSA9IHRoaXMuc2lnblR5cGUgPT0gMTtcbiAgICAgICAgICAgIHRoaXMuZXhpdFRvdXJuYW1lbnRCdG4uYWN0aXZlID0gdGhpcy5zaWduVHlwZSAhPSAxO1xuICAgICAgICAgICAgdGhpcy5zaWduVXBOb2RlLmFjdGl2ZSA9IHRoaXMuc2lnblR5cGUgPT0gMSAmJiB0aGlzLmRhdGEudXNlcklkICE9IFVzZXIuX3VzZXJJRDtcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsTm9kZS5hY3RpdmUgPSB0aGlzLmRhdGEudXNlcklkID09IFVzZXIuX3VzZXJJRCA/IHRydWUgOiB0aGlzLnNpZ25UeXBlICE9IDE7XG4gICAgICAgICAgICB0aGlzLmpvaW5CdG4uYWN0aXZlID0gdGhpcy5zaWduVHlwZSAhPSAxO1xuICAgICAgICAgICAgVG91cm5hbWVudERhdGEuZ2V0SW5zdGFuY2UoKS5mbHVzaEl0bWVJRCA9IHRoaXMuZGF0YS50b3VybmFtZW50SWQ7XG4gICAgICAgICAgICB0aGlzLnNoYXJlTm9kZS54ID0gdGhpcy5zaWduVXBOb2RlLmFjdGl2ZSA/IDExMCA6IDA7XG4gICAgICAgICAgICBpZih0aGlzLnNpZ25UeXBlID09IDApIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVG91cm5hbWVudC5TaWduU3VjY2Vzc2Z1bGx5KTtcbiAgICAgICAgICAgIHRoaXMuc2hhbnJQYXNzd29yZC5zdHJpbmcgPSB0aGlzLnBhc3N3b3JkX1NpZ25VcC5zdHJpbmcgPSB0aGlzLnBhc3N3b3JkLnN0cmluZyA9IHRoaXMucHcubGVuZ3RoID09IDAgPyBcIk5vIFBhc3N3b3JkXCIgOiB0aGlzLnB3O1xuICAgICAgICAgICAgZGlzcGF0Y2goXCJVcGRhdGVUb3VybmFtZW50TGlzdFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAyNTEpe1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93TXNnQm94KFwiXCIsIGkxOG4uRlJJRU5EUk9PTS5Ub1JlY2hhcmdlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKFwib3BlblJlY2hhcmdlVmlld1wiKTtcbiAgICAgICAgICAgICAgICB9LCBcImJ0bl9SZWNoYXJnZVwiKTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAzMDkpe1xuICAgICAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVG91cm5hbWVudC5wYXNzd29yZFdvbmcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5FUlJPUkNPREVbZGF0YS5zdGF0dXNNc2cuc3RhdHVzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJlcVNpZ25VcFVzZXJzKCkge1xuICAgICAgICBsZXQganNvbkRhdGEgPSB7XG4gICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRoaXMuZGF0YS50b3VybmFtZW50SWQsXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlRvdXJuYW1lbnRTaWduVXBVc2Vyc1JlcS5jcmVhdGUoanNvbkRhdGEpO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuVG91cm5hbWVudFNpZ25VcFVzZXJzUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVG91cm5hbWVudFNpZ25VcFVzZXJzLFxuICAgICAgICAgICAgYnVmZmVyKTtcblxuICAgIH1cblxuICAgIG9uTmV0VG91cm5hbWVudFNpZ25VcFVzZXJzUmVzKGRhdGE6IGNvbS5idC5nYW1lLnByb3RvLmhhbGwuSVRvdXJuYW1lbnRTaWduVXBVc2Vyc1Jlcykge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIE1hbmFnZXIudWlNYW5hZ2VyLm9wZW4oeyB0eXBlOiBTaWduVXBQbGF5ZXJzVmlldywgYnVuZGxlOiBCVU5ETEVfUkVTT1VSQ0VTLCBhcmdzOiBbZGF0YS51c2Vyc10gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkVSUk9SQ09ERVtkYXRhLnN0YXR1c01zZy5zdGF0dXNdKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmVxQ2xvc2VUb3VybmFtZW50KCkge1xuICAgICAgICBsZXQganNvbkRhdGEgPSB7XG4gICAgICAgICAgICB0b3VybmFtZW50SWQ6IHRoaXMuZGF0YS50b3VybmFtZW50SWQsXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLkNsb3NlVG91cm5hbWVudFJlcS5jcmVhdGUoanNvbkRhdGEpO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuQ2xvc2VUb3VybmFtZW50UmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfQ2xvc2VUb3VybmFtZW50LFxuICAgICAgICAgICAgYnVmZmVyKTtcblxuICAgIH1cblxuICAgIG9uTmV0Q2xvc2VUb3VybmFtZW50UmVzKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICBkaXNwYXRjaChcIlVwZGF0ZVRvdXJuYW1lbnRMaXN0XCIpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZVdpdGhBY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uRVJST1JDT0RFW2RhdGEuc3RhdHVzTXNnLnN0YXR1c10pO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLy/ov5vlhaXmr5TotZvlnLpcbiAgICByZXFKb2luVG91cm5hbWVudCgpIHtcbiAgICAgICAgUGFuZWxIZWxwLnNob3dMb2FkaW5nKGkxOG4uV2FpdGluZy5FbnRlckdhbWUpXG4gICAgICAgIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkuaXNUb3VybmFtZW50R2FtZSA9IHRydWU7XG4gICAgICAgIFRvdXJuYW1lbnREYXRhLmdldEluc3RhbmNlKCkudG91cm5hbWVudElEID0gdGhpcy5kYXRhLnRvdXJuYW1lbnRJZDtcbiAgICAgICAgVG91cm5hbWVudERhdGEuZ2V0SW5zdGFuY2UoKS50b1NlcnZlcklkID0gdGhpcy5kYXRhLnNlcnZlcklkO1xuICAgICAgICBUb3VybmFtZW50RGF0YS5nZXRJbnN0YW5jZSgpLnNlcnZlclR5cGUgPSB0aGlzLmRhdGEuc2VydmVyVHlwZTtcbiAgICAgICAgZGlzcGF0Y2goXCJKb2luVG91cm5hbWVudFwiLCB7IHNlcnZpY2VUeXBlOiB0aGlzLmRhdGEuc2VydmVyVHlwZSwgdG9TZXJ2ZXJJZDogdGhpcy5kYXRhLnNlcnZlcklkIH0pO1xuICAgIH1cblxuICAgIHNoYXJlVXJsKCkge1xuICAgICAgICBsZXQgc2hhcmVBZGRyZXNzID0gRy5VUkxNZ3Iuc2hhcmVGcmllbmRSb29tVVJMO1xuICAgICAgICBsZXQgY2hhbm5lbCA9IHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uZ2V0QXBwUXVEYW9JZCgpO1xuICAgICAgICBsZXQgdXNlcklkID0gVXNlci5fdXNlcklEO1xuICAgICAgICBsZXQgZ2FtZUlkID0gdGhpcy5kYXRhLmdhbWVJZDtcbiAgICAgICAgbGV0IHRvdXJuYW1lbnRJZCA9IHRoaXMuZGF0YS50b3VybmFtZW50SWQ7XG4gICAgICAgIGxldCBzaGFyZVVybCA9IHNoYXJlQWRkcmVzcyArIFwiL3QvXCIgKyBjaGFubmVsICsgXCIvXCIgKyB1c2VySWQgKyBcIi9cIiArIGdhbWVJZCArIFwiL1wiICsgdG91cm5hbWVudElkICsgXCIvaW5kZXguaHRtbFwiXG4gICAgICAgIHJldHVybiBzaGFyZVVybDtcbiAgICB9XG5cbiAgICBvbkNvcHlUb3VybmFtZW50SW5mbygpIHtcbiAgICAgICAgbGV0IGNvcHlTdHIgPSB0aGlzLnNoYXJlVXJsKCk7XG4gICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcChjb3B5U3RyLCBpMThuLkZSSUVORFJPT00uQ29weVJvb21JbmZvU3VjY2Vzcyk7XG4gICAgfVxuICAgIG9uU2hhcmVGYWNlQm9vaygpIHtcbiAgICAgICAgbGV0IHNoYXJlVXJsID0gdGhpcy5zaGFyZVVybCgpO1xuICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLnNoYXJlVG9GYWNlYm9vayhzaGFyZVR5cGUuTElOSywgc2hhcmVVcmwsIHNoYXJlVXJsKTtcbiAgICB9XG5cbiAgICBzaGFyZUltYWdlQ2hhbmdlVUkoaXNTaGFyZSkge1xuICAgICAgICB0aGlzLnNoYXJlQkcuYWN0aXZlID0gaXNTaGFyZTtcbiAgICAgICAgdGhpcy5kZXRhaWxOb2RlLmFjdGl2ZSA9ICFpc1NoYXJlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TYXZlSW1hZ2UoKSB7XG4gICAgICAgIHRoaXMuc2hhcmVJbWFnZUNoYW5nZVVJKHRydWUpO1xuICAgICAgICBpZiAodGhpcy5faXNTYXZlSWFtZ2UpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzU2F2ZUlhbWdlID0gdHJ1ZTtcbiAgICAgICAgVXRpbE1nci5jYXB0dXJlVGV4dHVyZSh0aGlzLnNoYXJlTm9kZSlcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faXNTYXZlSWFtZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVJbWFnZUNoYW5nZVVJKGZhbHNlKTtcbiAgICAgICAgfSwgNSlcbiAgICB9XG5cbiAgICBjcmVhdGVRUmNvZGUodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHFyY29kZSA9IG5ldyB3aW5kb3dbXCJRUkNvZGVcIl0oLTEsIDMpO1xuICAgICAgICBxcmNvZGUuYWRkRGF0YSh1cmwpO1xuICAgICAgICBxcmNvZGUubWFrZSgpO1xuXG4gICAgICAgIHRoaXMuaWNvbi5maWxsQ29sb3IgPSBjYy5Db2xvci5CTEFDSztcbiAgICAgICAgLy/lnZflrr3pq5hcbiAgICAgICAgdmFyIHRpbGVXID0gdGhpcy5pY29uLm5vZGUud2lkdGggLyBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICAgICAgdmFyIHRpbGVIID0gdGhpcy5pY29uLm5vZGUuaGVpZ2h0IC8gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XG5cbiAgICAgICAgLy8gZHJhdyBpbiB0aGUgR3JhcGhpY3NcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBxcmNvZGUuZ2V0TW9kdWxlQ291bnQoKTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocXJjb2RlLmlzRGFyayhyb3csIGNvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY3R4LmZpbGxDb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IChNYXRoLmNlaWwoKGNvbCArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihjb2wgKiB0aWxlVykpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IChNYXRoLmNlaWwoKHJvdyArIDEpICogdGlsZVcpIC0gTWF0aC5mbG9vcihyb3cgKiB0aWxlVykpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24ucmVjdChNYXRoLnJvdW5kKGNvbCAqIHRpbGVXKSwgTWF0aC5yb3VuZChyb3cgKiB0aWxlSCksIHcsIGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24uZmlsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxufVxuIl19