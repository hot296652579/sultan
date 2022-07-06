"use strict";
cc._RF.push(module, '3821d3m/qFORKEAQGaJkuXf', 'UserInfo');
// script/userInfo/UserInfo.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const Manager_1 = require("../common/manager/Manager");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Defines_1 = require("../framework/base/Defines");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const User_1 = require("../global/User");
const UtilMgr_1 = require("../global/UtilMgr");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const SetSecondaryPwdView_1 = require("../withdrawal/SetSecondaryPwdView");
const ScroViewPlus_1 = __importDefault(require("../common/component/ScroViewPlus"));
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const HallNetController_1 = require("../hall/HallNetController");
const { ccclass, property } = cc._decorator;
let UserInfo = class UserInfo extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.nameEditBox = null;
        this.userId = null;
        this.gold = null;
        this.bank = null;
        this.phone = null;
        this.area = null;
        this.pay = null;
        this.lvBarLabel = null;
        this.lvBarProgreLabel = null;
        this.lvBar = null;
        this.head = null;
        this.headPanel = null;
        this.changeNamePanel = null;
        this.headContent = null;
        this.bindBtn = null;
        this.headUpPanel = null;
        this.scrollView = null;
        this.scrollViewMask = null;
        this.friendTip = null;
        this.addFriend = null;
        this.nickNameEditBox = null;
        this.signatureEditBox = null;
        //点击大厅头像展示的
        this.changeHead = null;
        this.namebg = null;
        this.modifyBtn = null;
        this.areaNode = null;
        this.phoneNode = null;
        this.bankNode = null;
        this.payNode = null;
        //点击其他地方头像展示
        this.copyBtn = null;
        this.nickName = null;
        this.signatureLabel = null;
        this.addFriendTip = null;
        this.addFriendBtn = null;
        this.headItmes = [];
        this.selectHeadIndex = 0;
        this._areasList = [];
        this._areasItemHeight = 40;
        this._areasCount = 16;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "userInfo/prefabs/UserInfo";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.nameEditBox.node.on('editing-did-ended', this.nameCallback, this);
        this.nameEditBox.node.on('text-changed', this.nameChangeCallback, this);
        this.nameEditBox.enabled = false;
        this.initHeadPanel();
        this.showUpHeadPanel(false);
    }
    initHeadPanel() {
        for (let index = 1; index <= 16; index++) {
            let item = this.headContent.getChildByName('headItem' + index);
            item.name = UtilMgr_1.UtilMgr.setString(index.toString());
            let select = item.getChildByName("select");
            select.active = false;
            item.on(cc.Node.EventType.TOUCH_END, this.headItemClick, this);
            this.headItmes.push(item);
        }
    }
    headItemClick(event) {
        G.Logger.log(event);
        this.headItmes.forEach((element) => {
            if (event.target.name == '1') {
                this.showUpHeadPanel(true);
                this.onShowHeadPanel(false);
            }
            else {
                if (element.name == event.target.name) {
                    let select = element.getChildByName("select");
                    select.active = true;
                    this.selectHeadIndex = parseInt(element.name);
                }
                else {
                    let select = element.getChildByName("select");
                    select.active = false;
                }
            }
        });
        this.audioHelper.playEffect("common/audio/click", Defines_1.BUNDLE_RESOURCES);
    }
    showUpHeadPanel(show) {
        if (this.headUpPanel) {
            this.headUpPanel.active = show;
        }
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.USER_INFORMATION), this.onUpdateInfo);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPDATE_NICKNAME), this.onUpdateName);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPDATE_HEAD_IMG), this.onUpdateHeadImg);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPLOAD_HEAD_IMG), this.onUpLoadHeadImg);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_UpdateUserArea), this.onUpdateUserAreaRes);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_AddFriend), this.onNetAddFriendRes);
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_FindUser), this.onNetFindUserRes);
        this.registerEvent('bindPhoneSuccess', this.initBindPhone);
        this.registerEvent('handleUpLoadPhoto', this.handleUpLoadPhoto);
        this.registerEvent("updateUserInfo", this.reqUserInfo);
    }
    initBindPhone(phone) {
        if (phone) {
            this.phone.string = UtilMgr_1.UtilMgr.setStringCover(phone);
            this.bindBtn.active = false;
        }
        else {
            this.bindBtn.active = true;
            this.phone.string = LanguageImpl_1.i18n.USERINFO.UNBOUND;
        }
    }
    //头像上传回调
    onUpLoadHeadImg(data) {
        if (data) {
            if (data.statusMsg.status == 0) {
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.USERINFO.HEADCHANESUCCESS);
                this.reqUserInfo();
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    onUpdateHeadImg(data) {
        cc.log(data, "updateHeadImg");
        if (data) {
            if (data.statusMsg.status == 0) {
                User_1.User._headImgUrl = "base_" + this.selectHeadIndex + ".png";
                UtilMgr_1.UtilMgr.loadHeadImg(this.head, User_1.User._headImgUrl, User_1.User._userID, this);
                // PanelHelp.showTip(i18n.USERINFO.HEADCHANESUCCESS);
                dispatch("updateUserInfo");
                this.onShowHeadPanel(false);
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    onUpdateName(data) {
        if (data) {
            if (data.statusMsg.status == 0) {
                this.nickName.string = this.nameEditBox.string = UtilMgr_1.UtilMgr.setString(data.nickName);
                PanelHelp_1.default.showTip(LanguageImpl_1.i18n.USERINFO.NAMECHANESUCCESS);
                User_1.User._userName = data.nickName;
                this.signatureLabel.string = User_1.User._signature = data.sign;
                dispatch("updateUserInfo");
            }
            else {
                PanelHelp_1.default.showMsgBox('', Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    onUpdateInfo(data) {
        G.Logger.log("用户信息", data);
        if (data) {
            if (data.statusMsg.status == 0) {
                this.nickName.string = this.nameEditBox.string = UtilMgr_1.UtilMgr.setString(data.nickName);
                this.signatureLabel.string = data.sign;
                this.userId.string = data.userId;
                this.gold.string = UtilMgr_1.UtilMgr.changeMoney(data.gold);
                this.bank.string = UtilMgr_1.UtilMgr.changeMoney(User_1.User._bank);
                this.lvBarLabel.string = (data.vipLevel - 1).toString();
                if (data.nextLevelTurnover) {
                    let currentTurnover = UtilMgr_1.UtilMgr.changeMoney(data.currentTurnover, false);
                    if (currentTurnover.indexOf(".") != -1) {
                        currentTurnover = currentTurnover.substring(0, currentTurnover.indexOf("."));
                    }
                    this.lvBarProgreLabel.string = currentTurnover + '/' + UtilMgr_1.UtilMgr.changeMoney(data.nextLevelTurnover, false);
                    this.lvBar.progress = data.currentTurnover / data.nextLevelTurnover;
                }
                else {
                    this.lvBar.progress = 1;
                }
                this.initBindPhone(data.phone);
                UtilMgr_1.UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this);
                this.area.string = data.area.length ? data.area : LanguageImpl_1.i18n.USERINFO.UNBOUND;
                this._areasList = data.areas;
                let num = data.areas.length > this._areasCount ? this._areasCount : data.areas.length;
                this.scrollView.node.height = this._areasItemHeight * num;
                this.scrollViewMask.height = this._areasItemHeight * num;
                this.refreshBankItem(data.areas);
            }
        }
    }
    refreshBankItem(areas) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = areas;
            scroViewCtrlCom.onItemClickCallback = this.onClickAccountItemCallback.bind(this);
            yield scroViewCtrlCom.framingLoad(areas.length);
        });
    }
    onClickAccountItemCallback(node, itemId) {
        cc.tween(this.scrollView.node)
            .set({ scaleY: 1 })
            .to(0.1, { scaleY: 0 })
            .call(() => {
            this.scrollView.node.active = false;
        })
            .start();
        let req = CommonService_1.protoPackage.hall.UpdateUserAreaReq.create({ areaName: this._areasList[itemId] });
        let buffer = CommonService_1.protoPackage.hall.UpdateUserAreaReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_UpdateUserArea, buffer);
    }
    onUpdateUserAreaRes(msg) {
        G.Logger.log("区域名称", msg);
        if (msg.statusMsg.status == 0) {
            this.area.string = msg.areaName.length ? msg.areaName : LanguageImpl_1.i18n.USERINFO.UNBOUND;
        }
    }
    onNetAddFriendRes(data) {
        G.Logger.log("AddUserRes", data);
        if (data.statusMsg.status == 0) {
            if (data.friend.state == 2) {
                this.addFriendBtn.active = true;
                this.addFriendTip.node.active = false;
            }
            else if (data.friend.state == 1) {
                this.addFriendBtn.active = false;
                this.addFriendTip.node.active = true;
                this.addFriendTip.language = Manager_1.Manager.makeLanguage("FRIEND.HAVE_BECOME_FRIEND");
                this.addFriendTip.node.color = new cc.Color().fromHEX("#01E922");
            }
            else if (data.friend.state == 0) {
                this.addFriendBtn.active = false;
                this.addFriendTip.node.active = true;
                this.addFriendTip.language = Manager_1.Manager.makeLanguage("FRIEND.ALREADY_APPLIED");
                this.addFriendTip.node.color = new cc.Color().fromHEX("#fd1414");
            }
            else {
                this.addFriendBtn.active = true;
                this.addFriendTip.node.active = false;
            }
        }
        else {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    nameChangeCallback(editbox) {
        let name = editbox.string;
        let len = UtilMgr_1.UtilMgr.strLen(name);
        if (len > 14) {
            editbox.string = UtilMgr_1.UtilMgr.setString(name);
        }
    }
    nameCallback(editbox) {
        G.Logger.log(editbox.string);
        let name = editbox.string;
        if (!name || name == User_1.User._userName) {
            editbox.string = User_1.User._userName;
            return;
        }
        this.nameEditBox.enabled = false;
        let req = CommonService_1.protoPackage.hall.UpdateNickname.create({ userId: User_1.User._userID, nickName: name });
        let buffer = CommonService_1.protoPackage.hall.UpdateNickname.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPDATE_NICKNAME, buffer);
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        if (args && args.length) {
            this._UserID = args[0].userID;
        }
        else {
            this._UserID = User_1.User._userID;
        }
    }
    playDefaultEffect(name) {
        switch (name) {
            case 'headClose':
                super.playDefaultEffect("close");
                break;
            case 'headUpClose':
                super.playDefaultEffect("close");
                break;
            default: super.playDefaultEffect(name);
        }
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case 'changeHead':
            case "headSprite":
                this.onShowHeadPanel(true);
                break;
            case "headClose":
                this.onShowHeadPanel(false);
                break;
            case "headChange":
                this.onChangeHead();
                break;
            case "namebtn":
                this.onNameEditBtn(true);
                break;
            case "bindPhonebtn":
                this.onBindPhoneBtn();
                break;
            case "bindPaybtn":
                this.onBindPayBtn();
                break;
            case "bankbtn":
                this.onBankBtn();
                break;
            case "headUpClose":
                this.showUpHeadPanel(false);
                break;
            case "takePhoto":
                this.ontakePhotoBtn();
                break;
            case "localPhoto":
                this.onlocalPhotoBtn();
                break;
            case "maskClose":
                this.onClickCheck();
                break;
            case "modifybtn":
                this.onClickCheck();
                break;
            case "copyBtn":
                this.onCopyIDBtn();
                break;
            case "changeNameClose":
                this.onNameEditBtn(false);
                break;
            case "changeInfoBtn":
                this.onConfirmBtn();
                break;
            case "addfriendBtn":
                this.onAddFriendBtn();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    handleUpLoadPhoto(path) {
        // PanelHelp.showTip("头像上传")
        this.showUpHeadPanel(false);
        if (cc.sys.isBrowser) {
            this.reqUpLoadHead(path);
        }
        else {
            let data = UtilMgr_1.UtilMgr.getUpLoadPhotoBase64(path);
            if (data) {
                this.reqUpLoadHead(data);
            }
        }
        // let head = this.head;
        // cc.assetManager.loadRemote(path, function (err, texture) {
        //     // Use texture to create sprite frame
        //     if (texture && head) {
        //         head.spriteFrame = new cc.SpriteFrame(texture);
        //     }
        // });
    }
    /**
     * 上传头像
     * @param data
     */
    reqUpLoadHead(data) {
        PanelHelp_1.default.showLoading(LanguageImpl_1.i18n.WAIT.UPLOADING);
        let req = CommonService_1.protoPackage.hall.base.UploadHeadImgReq.create({ userId: User_1.User._userID, imgData: data });
        let buffer = CommonService_1.protoPackage.hall.base.UploadHeadImgReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPLOAD_HEAD_IMG, buffer);
        // let packge = new RequestPackge;
        // packge.data.url =  Config.uploadHeadURL;
        // packge.data.type = HttpRequestType.POST
        // let obj = {token:User._token,imgData:data}
        // packge.data.data = JSON.stringify(obj)
        // packge.data.timeout = 10000;
        // packge.send((netData) => {
        //     G.Logger.log('reqUpLoadHead = ', netData);
        //     if (netData.state == 0) {
        //         PanelHelp.showTip(i18n.USERINFO.HEADCHANESUCCESS)
        //         this.reqUserInfo()
        //     }else{
        //         PanelHelp.showMsgBox('',i18n.ERRORCODE.DATAERROR+netData.state)
        //     }
        // }, (err) => {
        //     PanelHelp.showMsgBox('',i18n.ERRORCODE.DATAERROR+err.reason)
        // });
    }
    /**
     * 打开相机
     */
    ontakePhotoBtn() {
        window['platformUtil'].takePhotoMethod();
    }
    /**
     * 打开相册
     */
    onlocalPhotoBtn() {
        window['platformUtil'].localPhotoMethod();
    }
    onBindPhoneBtn() {
        dispatch('openBindPhone');
    }
    onBankBtn() {
        dispatch("openBankView");
    }
    onBindPayBtn() {
        if (User_1.User._phone.length > 0) {
            if (User_1.User.piggyBank) {
                dispatch('openWithdrawalView');
            }
            else {
                dispatch('openSetSecondaryPwdView', SetSecondaryPwdView_1.SettSecondaryPwdType.set);
            }
        }
        else {
            PanelHelp_1.default.showMsgBoxIcon("", LanguageImpl_1.i18n.WITHDRAWAL.NOBINDPHONETIP, () => {
                dispatch('openBindPhone');
            }, LanguageImpl_1.i18n.WITHDRAWAL.GOTOBINDPHONE);
        }
    }
    onNameEditBtn(show) {
        // this.nameEditBox.enabled = true;
        // this.nameEditBox.focus();
        if (this.changeNamePanel) {
            this.changeNamePanel.active = show;
        }
    }
    onConfirmBtn() {
        let name = this.nickNameEditBox.string;
        let signature = this.signatureEditBox.string;
        if (name.length == 0) {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.USERINFO.ENTERNAME_ERROR);
            return;
        }
        this.nameEditBox.enabled = false;
        let req = CommonService_1.protoPackage.hall.UpdateNickname.create({ userId: User_1.User._userID, nickName: name, sign: signature });
        let buffer = CommonService_1.protoPackage.hall.UpdateNickname.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPDATE_NICKNAME, buffer);
        this.onNameEditBtn(false);
    }
    onAddFriendBtn() {
        let data = {
            otherId: this._UserID,
        };
        let req = CommonService_1.protoPackage.hall.AddFriendReq.create(data);
        let buffer = CommonService_1.protoPackage.hall.AddFriendReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_AddFriend, buffer);
        // PanelHelp.showTip(Manager.makeLanguage("USERINFO.ADDFRIEND"));
    }
    getMeHeadIndex() {
        let isNetWorkHead = (User_1.User._headImgUrl && User_1.User._headImgUrl.indexOf("base") == -1);
        let headIndex = 0;
        if (!isNetWorkHead) {
            if (User_1.User._headImgUrl) {
                let arr = User_1.User._headImgUrl.split("_");
                headIndex = parseInt(arr[arr.length - 1]);
            }
            else {
                headIndex = UtilMgr_1.UtilMgr.getLocalHeadIndex(User_1.User._userID);
            }
        }
        return headIndex;
    }
    onShowHeadPanel(show) {
        if (show) {
            let meHeadIndex = this.getMeHeadIndex();
            this.selectHeadIndex = meHeadIndex;
            this.headPanel.active = true;
            this.headItmes.forEach((element) => {
                let select = element.getChildByName("select");
                let headIndex = parseInt(element.name);
                select.active = headIndex == meHeadIndex;
            });
        }
        else {
            this.selectHeadIndex = 0;
            this.headPanel.active = false;
        }
    }
    onChangeHead() {
        if (this.selectHeadIndex > 0) {
            let headName = "base_" + this.selectHeadIndex + ".png";
            if (User_1.User._headImgUrl == headName) {
                this.onShowHeadPanel(false);
                return;
            }
            let req = CommonService_1.protoPackage.hall.base.UpdateHeadImgReq.create({ userId: User_1.User._userID, imgName: headName });
            let buffer = CommonService_1.protoPackage.hall.base.UpdateHeadImgReq.encode(req).finish();
            this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.UPDATE_HEAD_IMG, buffer);
        }
    }
    onCopyIDBtn() {
        window['platformUtil'].copyToClip(this.userId.string);
    }
    reqUserInfo() {
        let req = CommonService_1.protoPackage.hall.UserInformation.create({ userId: this._UserID });
        let buffer = CommonService_1.protoPackage.hall.UserInformation.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.USER_INFORMATION, buffer);
    }
    findUser() {
        FriendData.getInstance().isUserInfoSendFind = true;
        let req = CommonService_1.protoPackage.hall.FindUserReq.create({ otherId: this._UserID });
        let buffer = CommonService_1.protoPackage.hall.FindUserReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_FindUser, buffer);
    }
    onNetFindUserRes(data) {
        G.Logger.log("finduser", data);
        if (data.statusMsg.status == 0) {
            let state = 0;
            if (data.friend) {
                state = data.friend.state;
                this._UserID = data.friend.friendId;
            }
            let isMe = this._UserID == User_1.User._userID;
            let isFriend = state == 1;
            G.Logger.log("判断玩家是否是好友", isFriend);
            this.addFriendTip.node.active = !isMe && isFriend;
            this.addFriendBtn.active = !isMe && !isFriend;
            this.addFriendTip.language = Manager_1.Manager.makeLanguage("FRIEND.HAVE_BECOME_FRIEND");
        }
        else {
            PanelHelp_1.default.showTip(Manager_1.Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    start() {
        this.changeLanguage();
        this.reqUserInfo();
        if (FriendData.getInstance().isOpenFriend)
            this.findUser();
        let isMe = this._UserID == User_1.User._userID;
        let isHallView = Manager_1.Manager.uiManager.isInCurrentGame('HallView') && !Manager_1.Manager.uiManager.isInCurrentGame("LeaderBoardView");
        //点击大厅头像展示的
        this.changeHead.active = isHallView && isMe;
        this.namebg.active = isHallView && isMe;
        this.modifyBtn.active = isHallView && isMe;
        this.areaNode.active = isHallView && isMe;
        this.phoneNode.active = isHallView && isMe;
        this.bankNode.active = isHallView && isMe;
        this.payNode.active = isHallView && isMe && (!User_1.User.isRechargedPlayer ? (() => {
            let obj = HallNetController_1.HallConfig.hallIconConfig && HallNetController_1.HallConfig.hallIconConfig.find(function (obj) {
                return obj.key == "goldBankCardBindStatus";
            });
            return obj && obj.value > 0;
        })() : true);
        //点击其他地方头像展示
        this.copyBtn.active = !isHallView && !isMe;
        this.nickName.node.active = isHallView && isMe ? false : true;
        this.phone.string = LanguageImpl_1.i18n.USERINFO.UNBOUND;
        this.area.string = LanguageImpl_1.i18n.USERINFO.UNBOUND;
        this.nickName.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.area.horizontalAlign = isMe ? cc.Label.HorizontalAlign.CENTER : cc.Label.HorizontalAlign.LEFT;
        if (!isMe)
            return;
        this.signatureLabel.string = User_1.User._signature.length ? User_1.User._signature : "You haven't said anything yet";
        this.nickNameEditBox.string = this.nickName.string = this.nameEditBox.string = UtilMgr_1.UtilMgr.setString(User_1.User._userName);
        this.userId.string = User_1.User._userID || '';
        this.gold.string = UtilMgr_1.UtilMgr.changeMoney(User_1.User._gold);
        this.bank.string = UtilMgr_1.UtilMgr.changeMoney(User_1.User._bank);
        UtilMgr_1.UtilMgr.loadHeadImg(this.head, User_1.User._headImgUrl, User_1.User._userID, this);
        this.headPanel.active = false;
        if (User_1.User._phone) {
            let bankIndex = Manager_1.Manager.localStorage.getItem("selectBankIndex");
            if (User_1.User._bankList.length > 0) {
                if (bankIndex != null && bankIndex >= 0)
                    this.pay.string = UtilMgr_1.UtilMgr.setBankCardStringCover(User_1.User._bankList[bankIndex]);
                else
                    this.pay.string = UtilMgr_1.UtilMgr.setBankCardStringCover(User_1.User._bankList[0]);
            }
            else {
                this.pay.string = LanguageImpl_1.i18n.USERINFO.UNBOUND;
            }
        }
        else {
            this.pay.string = LanguageImpl_1.i18n.USERINFO.NOBINDPHONE;
        }
    }
    onClickCheck() {
        if (this.scrollView.node.active) {
            cc.tween(this.scrollView.node)
                .set({ scaleY: 1 })
                .to(0.1, { scaleY: 0 })
                .call(() => {
                this.scrollView.node.active = false;
            })
                .start();
        }
        else {
            this.scrollView.node.active = true;
            cc.tween(this.scrollView.node)
                .set({ scaleY: 0 })
                .to(0.1, { scaleY: 1 })
                .start();
        }
    }
    onDisable() {
        super.onDestroy();
        //处理头像黑板
        FriendData.getInstance().isUserInfoSendFind = false;
    }
    changeLanguage() {
        if (this.changeNamePanel) {
            this.find('content/nickName', this.changeNamePanel).getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("USERINFO.NICKNAME");
            this.find('content/signature', this.changeNamePanel).getComponent(cc.Label).language = Manager_1.Manager.makeLanguage("USERINFO.SIGNATURE");
        }
    }
};
__decorate([
    property(cc.EditBox)
], UserInfo.prototype, "nameEditBox", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "userId", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "gold", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "bank", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "phone", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "area", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "pay", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "lvBarLabel", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "lvBarProgreLabel", void 0);
__decorate([
    property(cc.ProgressBar)
], UserInfo.prototype, "lvBar", void 0);
__decorate([
    property(cc.Sprite)
], UserInfo.prototype, "head", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "headPanel", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "changeNamePanel", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "headContent", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "bindBtn", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "headUpPanel", void 0);
__decorate([
    property(ScroViewPlus_1.default)
], UserInfo.prototype, "scrollView", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "scrollViewMask", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "friendTip", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "addFriend", void 0);
__decorate([
    property(cc.EditBox)
], UserInfo.prototype, "nickNameEditBox", void 0);
__decorate([
    property(cc.EditBox)
], UserInfo.prototype, "signatureEditBox", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "changeHead", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "namebg", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "modifyBtn", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "areaNode", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "phoneNode", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "bankNode", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "payNode", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "copyBtn", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "nickName", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "signatureLabel", void 0);
__decorate([
    property(cc.Label)
], UserInfo.prototype, "addFriendTip", void 0);
__decorate([
    property(cc.Node)
], UserInfo.prototype, "addFriendBtn", void 0);
UserInfo = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], UserInfo);
exports.default = UserInfo;

cc._RF.pop();