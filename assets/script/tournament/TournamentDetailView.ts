import { Config } from "../common/config/Config";
import { i18n } from "../common/language/LanguageImpl";
import { serverType, protoPackage } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { com } from "../framework/external/protoc";
import { Manager } from "../framework/Framework";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import { shareType } from "../platform/android";
import SignUpPlayersView from "./SignUpPlayersView";
import TournamentData from "./TournamentData";

const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class TournamentDetailView extends UIView implements IController<LobbyService> {

    service: LobbyService;

    @property(cc.Node)
    detailNode: cc.Node = null;

    @property(cc.Node)
    signUpNode: cc.Node = null;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Label)
    creatorName: cc.Label = null;

    @property(cc.Label)
    game: cc.Label = null;

    @property(cc.Label)
    pPeople: cc.Label = null;

    @property(cc.Node)
    rewardChip: cc.Node[] = [];

    @property(cc.EditBox)
    enterPassword: cc.EditBox = null;

    @property(cc.Label)
    touenamentID: cc.Label = null;

    @property(cc.Label)
    password_SignUp: cc.Label = null;

    @property(cc.Label)
    password: cc.Label = null;

    @property(cc.Label)
    detailjoinFee: cc.Label = null;

    @property(cc.Label)
    sginUpjoinFee: cc.Label = null;

    @property(cc.Node)
    closeBtn: cc.Node = null;

    @property(cc.Node)
    signUpPlayersBtn: cc.Node = null;

    @property(cc.Node)
    signUpBtn: cc.Node = null;

    @property(cc.Node)
    exitTournamentBtn: cc.Node = null;

    @property(cc.Node)
    joinBtn: cc.Node = null;


    @property(cc.Node)
    shareNode: cc.Node = null;

    @property(cc.Node)
    shareBG: cc.Node = null;

    @property(cc.Label)
    shanrPassword: cc.Label = null;

    @property(cc.Label)
    shanrTournamentID: cc.Label = null;

    @property(cc.Graphics)
    icon: cc.Graphics = null;

    private data: com.bt.game.proto.hall.ITournamentDetailRes
    private signType: number;
    private pw: string;
    private _isSaveIamge: boolean = false;
    public static getPrefabUrl() {
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
        if (this.data.userId == 0) {//创房ID = 0 官方赛
            this.data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
        } else {//自建赛 
            if (this.data.userId == User._userID) {//我创建的
                this.detailNode.active = true;
                this.closeBtn.active = true;
                this.signUpPlayersBtn.active = true;
            } else {//别人创建的
                this.data.signStatus == 0 ? this.signUpNode.active = true : this.detailNode.active = true;
            }
            this.data.signStatus == 0 ? this.signUpBtn.active = true : this.exitTournamentBtn.active = true;
            this.joinBtn.active = this.data.signStatus != 0;
        }
        this.shareNode.x = this.signUpNode.active ? 110 : 0;
    }


    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentSignUp), this.onNetTournamentSignUp);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_TournamentSignUpUsers), this.onNetTournamentSignUpUsersRes);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_CloseTournament), this.onNetCloseTournamentRes);
        this.registerEvent("handleSaveImageToLocal", (isSuccess) => {
            if (isSuccess) {
                this.unscheduleAllCallbacks()
                PanelHelp.showTip(i18n.REDPAKGE.saveSuccess)
                this._isSaveIamge = false;
                this.shareImageChangeUI(false);
            }
        });
    }

    updateView() {
        this.creatorName.string = UtilMgr.setString(this.data.nickname);
        this.pPeople.string = this.data.numberOfParticipants + "-people";
        this.shanrPassword.string = this.password_SignUp.string = this.password.string = this.data.password.length == 0 ? "No Password" : this.data.password;
        this.shanrTournamentID.string = this.touenamentID.string = this.data.tournamentId + "";
        this.sginUpjoinFee.string = this.detailjoinFee.string = UtilMgr.changeMoney(this.data.joinFee);
        this.game.string = Config.games[this.data.gameId].disName;
        let reward = this.data.reward.split(',');
        this.rewardChip.forEach((nd: cc.Node, index) => {
            if (index < reward.length) {
                nd.active = true;
                nd.getChildByName('lb_Glod').getComponent(cc.Label).string = UtilMgr.changeMoney(reward[index]);
            }
        });
        UtilMgr.loadHeadImg(this.head, this.data.headImg, this.data.userId + "", this);
        this.enterPassword.node.active = !!this.data.enterPassword;
        // this.sginUpjoinFee.node.parent.active = this.detailjoinFee.node.parent.active = this.data.bonusSource == 0;
        this.sginUpjoinFee.node.parent.active = this.detailjoinFee.node.parent.active = this.data.joinFee != 0;
        let qrcode = this.shareUrl();
        this.createQRcode(decodeURIComponent(qrcode));
    }

    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case "closeBtn":
                PanelHelp.showDialog("", i18n.Tournament.CloseTournament, () => {
                    //关闭锦标赛 返回大厅
                    this.reqCloseTournament();
                }, () => {
                    //返回上一级
                }, "btn_Cancel", "btn_Confirm");
                break;
            case "signUpPlayerBtn": this.reqSignUpUsers(); break;
            case "joinBtn": this.reqJoinTournament(); break;
            case "signUpBtn_1": this.reqSignUp(1); break;
            case "sginUpBtn_2": this.reqSignUp(2); break;
            case "exitTournamentBtn": this.reqSignUp(3); break;
            case "saveImageBtn": this.onSaveImage(); break;
            case "facebookBtn": this.onShareFaceBook(); break;
            case "copyLineBtn": this.onCopyTournamentInfo(); break;
            case "copyIDBtn": window['platformUtil'].copyToClip(this.touenamentID.string); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }


    reqSignUp(type) {
        let password: string, signType: number;
        if (type == 1) {//输入密码报名
            password = this.data.enterPassword == 1 ? this.enterPassword.string : "";
            signType = 0;
        } else if (type == 2) {//已知密码报名
            password = this.data.password;
            signType = 0;
        } else if (type == 3) {//退赛
            password = this.data.password;
            signType = 1;
        }
        let jsonData = {
            tournamentId: this.data.tournamentId,
            password: password,
            type: signType,
        }
        this.signType = signType;
        this.pw = password;
        G.Logger.log("报名锦标赛",type, jsonData);
        let req = protoPackage.hall.TournamentSignUpReq.create(jsonData);
        let buffer = protoPackage.hall.TournamentSignUpReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TournamentSignUp,
            buffer);
    }

    onNetTournamentSignUp(data: com.bt.game.proto.hall.ITournamentSignUpRes) {
        if (data.statusMsg.status == 0) {
            this.signUpBtn.active = this.signType == 1;
            this.exitTournamentBtn.active = this.signType != 1;
            this.signUpNode.active = this.signType == 1 && this.data.userId != User._userID;
            this.detailNode.active = this.data.userId == User._userID ? true : this.signType != 1;
            this.joinBtn.active = this.signType != 1;
            TournamentData.getInstance().flushItmeID = this.data.tournamentId;
            this.shareNode.x = this.signUpNode.active ? 110 : 0;
            if(this.signType == 0) PanelHelp.showTip(i18n.Tournament.SignSuccessfully);
            this.shanrPassword.string = this.password_SignUp.string = this.password.string = this.pw.length == 0 ? "No Password" : this.pw;
            dispatch("UpdateTournamentList");
        } else {
            if(data.statusMsg.status == 251){
                PanelHelp.showMsgBox("", i18n.FRIENDROOM.ToRecharge, () => {
                    dispatch("openRechargeView");
                }, "btn_Recharge");
            }else if(data.statusMsg.status == 309){
                PanelHelp.showTip(i18n.Tournament.passwordWong);
            }else{
                PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
            }
        }

    }

    reqSignUpUsers() {
        let jsonData = {
            tournamentId: this.data.tournamentId,
        }
        let req = protoPackage.hall.TournamentSignUpUsersReq.create(jsonData);
        let buffer = protoPackage.hall.TournamentSignUpUsersReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_TournamentSignUpUsers,
            buffer);

    }

    onNetTournamentSignUpUsersRes(data: com.bt.game.proto.hall.ITournamentSignUpUsersRes) {
        if (data.statusMsg.status == 0) {
            Manager.uiManager.open({ type: SignUpPlayersView, bundle: BUNDLE_RESOURCES, args: [data.users] });
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }

    }

    reqCloseTournament() {
        let jsonData = {
            tournamentId: this.data.tournamentId,
        }
        let req = protoPackage.hall.CloseTournamentReq.create(jsonData);
        let buffer = protoPackage.hall.CloseTournamentReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_CloseTournament,
            buffer);

    }

    onNetCloseTournamentRes(data) {
        if (data.statusMsg.status == 0) {
            dispatch("UpdateTournamentList");
            this.closeWithAction();
        } else {
            PanelHelp.showTip(i18n.ERRORCODE[data.statusMsg.status]);
        }

    }
    //进入比赛场
    reqJoinTournament() {
        PanelHelp.showLoading(i18n.Waiting.EnterGame)
        TournamentData.getInstance().isTournamentGame = true;
        TournamentData.getInstance().tournamentID = this.data.tournamentId;
        TournamentData.getInstance().toServerId = this.data.serverId;
        TournamentData.getInstance().serverType = this.data.serverType;
        dispatch("JoinTournament", { serviceType: this.data.serverType, toServerId: this.data.serverId });
    }

    shareUrl() {
        let shareAddress = G.URLMgr.shareFriendRoomURL;
        let channel = window['platformUtil'].getAppQuDaoId();
        let userId = User._userID;
        let gameId = this.data.gameId;
        let tournamentId = this.data.tournamentId;
        let shareUrl = shareAddress + "/t/" + channel + "/" + userId + "/" + gameId + "/" + tournamentId + "/index.html"
        return shareUrl;
    }

    onCopyTournamentInfo() {
        let copyStr = this.shareUrl();
        window['platformUtil'].copyToClip(copyStr, i18n.FRIENDROOM.CopyRoomInfoSuccess);
    }
    onShareFaceBook() {
        let shareUrl = this.shareUrl();
        window['platformUtil'].shareToFacebook(shareType.LINK, shareUrl, shareUrl);
    }

    shareImageChangeUI(isShare) {
        this.shareBG.active = isShare;
        this.detailNode.active = !isShare;
    }

    private onSaveImage() {
        this.shareImageChangeUI(true);
        if (this._isSaveIamge) {
            return
        }
        this._isSaveIamge = true;
        UtilMgr.captureTexture(this.shareNode)
        this.scheduleOnce(() => {
            this._isSaveIamge = false;
            this.shareImageChangeUI(false);
        }, 5)
    }

    createQRcode(url: string) {
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
}
