
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/userInfo/UserInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvdXNlckluZm8vVXNlckluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrRUFBdUQ7QUFDdkQsdURBQW9EO0FBQ3BELCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsdURBQTZEO0FBRTdELGtFQUEyRTtBQUUzRSxvRUFBNEM7QUFDNUMseUNBQXNDO0FBQ3RDLCtDQUE0QztBQUM1QyxvRUFBNEM7QUFDNUMsMkVBQXlFO0FBQ3pFLG9GQUE0RDtBQUM1RCxvRkFBNEQ7QUFDNUQsaUVBQXVEO0FBR3ZELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUk1QyxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxnQkFBTTtJQUE1Qzs7UUFHSSxnQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixXQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsU0FBSSxHQUFhLElBQUksQ0FBQztRQUd0QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLFNBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsUUFBRyxHQUFhLElBQUksQ0FBQztRQUdyQixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBRzVCLHFCQUFnQixHQUFhLElBQUksQ0FBQztRQUdsQyxVQUFLLEdBQW1CLElBQUksQ0FBQztRQUc3QixTQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFHaEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixlQUFVLEdBQWlCLElBQUksQ0FBQTtRQUcvQixtQkFBYyxHQUFZLElBQUksQ0FBQTtRQUc5QixjQUFT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QUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBDQUNPO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ007QUFJeEI7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5Q0FDTTtBQUd4QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBDQUNPO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ2E7QUFHaEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDVztBQUc5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhDQUNXO0FBeEdaLFFBQVE7SUFGNUIsT0FBTztJQUNQLDBCQUFhLENBQUMsMkJBQVksQ0FBQyxRQUFRLENBQUM7R0FDaEIsUUFBUSxDQStxQjVCO2tCQS9xQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0VHlwZSwgUmVxdWVzdFBhY2tnZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBDbGllbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCB7IFV0aWxNZ3IgfSBmcm9tIFwiLi4vZ2xvYmFsL1V0aWxNZ3JcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IFNldHRTZWNvbmRhcnlQd2RUeXBlIH0gZnJvbSBcIi4uL3dpdGhkcmF3YWwvU2V0U2Vjb25kYXJ5UHdkVmlld1wiO1xuaW1wb3J0IFNjcm9WaWV3UGx1cyBmcm9tIFwiLi4vY29tbW9uL2NvbXBvbmVudC9TY3JvVmlld1BsdXNcIjtcbmltcG9ydCBTY3JvVmlld0N0cmwgZnJvbSBcIi4uL2NvbW1vbi9jb21wb25lbnQvU2Nyb1ZpZXdDdHJsXCI7XG5pbXBvcnQgeyBIYWxsQ29uZmlnIH0gZnJvbSBcIi4uL2hhbGwvSGFsbE5ldENvbnRyb2xsZXJcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8gZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIG5hbWVFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB1c2VySWQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBnb2xkOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYmFuazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBob25lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYXJlYTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBheTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGx2QmFyTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsdkJhclByb2dyZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgbHZCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhlYWRQYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjaGFuZ2VOYW1lUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaGVhZENvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmluZEJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBoZWFkVXBQYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoU2Nyb1ZpZXdQbHVzKVxuICAgIHNjcm9sbFZpZXc6IFNjcm9WaWV3UGx1cyA9IG51bGxcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNjcm9sbFZpZXdNYXNrOiBjYy5Ob2RlID0gbnVsbFxuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGZyaWVuZFRpcDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYWRkRnJpZW5kOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5FZGl0Qm94KVxuICAgIG5pY2tOYW1lRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBzaWduYXR1cmVFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuICAgIC8v54K55Ye75aSn5Y6F5aS05YOP5bGV56S655qEXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY2hhbmdlSGVhZDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBuYW1lYmc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9kaWZ5QnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGFyZWFOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBob25lTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiYW5rTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwYXlOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8v54K55Ye75YW25LuW5Zyw5pa55aS05YOP5bGV56S6XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY29weUJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbmlja05hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzaWduYXR1cmVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGFkZEZyaWVuZFRpcDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYWRkRnJpZW5kQnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGhlYWRJdG1lczogYW55ID0gW107XG5cbiAgICBzZWxlY3RIZWFkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG5cbiAgICBfYXJlYXNMaXN0OiBhbnkgPSBbXVxuXG4gICAgX2FyZWFzSXRlbUhlaWdodDogbnVtYmVyID0gNDBcbiAgICBfYXJlYXNDb3VudDogbnVtYmVyID0gMTZcblxuICAgIF9Vc2VySUQ6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiVXJsKCkge1xuICAgICAgICByZXR1cm4gXCJ1c2VySW5mby9wcmVmYWJzL1VzZXJJbmZvXCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50Jyk7XG5cbiAgICAgICAgdGhpcy5uYW1lRWRpdEJveC5ub2RlLm9uKCdlZGl0aW5nLWRpZC1lbmRlZCcsIHRoaXMubmFtZUNhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lRWRpdEJveC5ub2RlLm9uKCd0ZXh0LWNoYW5nZWQnLCB0aGlzLm5hbWVDaGFuZ2VDYWxsYmFjaywgdGhpcylcbiAgICAgICAgdGhpcy5uYW1lRWRpdEJveC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdEhlYWRQYW5lbCgpO1xuICAgICAgICB0aGlzLnNob3dVcEhlYWRQYW5lbChmYWxzZSk7XG4gICAgfVxuXG4gICAgaW5pdEhlYWRQYW5lbCgpIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8PSAxNjsgaW5kZXgrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmhlYWRDb250ZW50LmdldENoaWxkQnlOYW1lKCdoZWFkSXRlbScgKyBpbmRleClcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFV0aWxNZ3Iuc2V0U3RyaW5nKGluZGV4LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RcIik7XG4gICAgICAgICAgICBzZWxlY3QuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmhlYWRJdGVtQ2xpY2ssIHRoaXMpXG4gICAgICAgICAgICB0aGlzLmhlYWRJdG1lcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIGhlYWRJdGVtQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgRy5Mb2dnZXIubG9nKGV2ZW50KTtcbiAgICAgICAgdGhpcy5oZWFkSXRtZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5uYW1lID09ICcxJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VwSGVhZFBhbmVsKHRydWUpXG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dIZWFkUGFuZWwoZmFsc2UpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5hbWUgPT0gZXZlbnQudGFyZ2V0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdCA9IGVsZW1lbnQuZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhlYWRJbmRleCA9IHBhcnNlSW50KGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdCA9IGVsZW1lbnQuZ2V0Q2hpbGRCeU5hbWUoXCJzZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXVkaW9IZWxwZXIucGxheUVmZmVjdChcImNvbW1vbi9hdWRpby9jbGlja1wiLCBCVU5ETEVfUkVTT1VSQ0VTKTtcblxuICAgIH1cbiAgICBzaG93VXBIZWFkUGFuZWwoc2hvdykge1xuICAgICAgICBpZiAodGhpcy5oZWFkVXBQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkVXBQYW5lbC5hY3RpdmUgPSBzaG93XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVVNFUl9JTkZPUk1BVElPTiksIHRoaXMub25VcGRhdGVJbmZvKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VUERBVEVfTklDS05BTUUpLCB0aGlzLm9uVXBkYXRlTmFtZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChtYWtlS2V5KHNlcnZlclR5cGUuTG9iYnksIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVVBEQVRFX0hFQURfSU1HKSwgdGhpcy5vblVwZGF0ZUhlYWRJbWcpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlVQTE9BRF9IRUFEX0lNRyksIHRoaXMub25VcExvYWRIZWFkSW1nKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVXBkYXRlVXNlckFyZWEpLCB0aGlzLm9uVXBkYXRlVXNlckFyZWFSZXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9BZGRGcmllbmQpLCB0aGlzLm9uTmV0QWRkRnJpZW5kUmVzKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KG1ha2VLZXkoc2VydmVyVHlwZS5Mb2JieSwgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfRmluZFVzZXIpLCB0aGlzLm9uTmV0RmluZFVzZXJSZXMpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnYmluZFBob25lU3VjY2VzcycsIHRoaXMuaW5pdEJpbmRQaG9uZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCgnaGFuZGxlVXBMb2FkUGhvdG8nLCB0aGlzLmhhbmRsZVVwTG9hZFBob3RvKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFwidXBkYXRlVXNlckluZm9cIiwgdGhpcy5yZXFVc2VySW5mbyk7XG5cbiAgICB9XG5cbiAgICBpbml0QmluZFBob25lKHBob25lKSB7XG4gICAgICAgIGlmIChwaG9uZSkge1xuICAgICAgICAgICAgdGhpcy5waG9uZS5zdHJpbmcgPSBVdGlsTWdyLnNldFN0cmluZ0NvdmVyKHBob25lKTtcbiAgICAgICAgICAgIHRoaXMuYmluZEJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5waG9uZS5zdHJpbmcgPSBpMThuLlVTRVJJTkZPLlVOQk9VTkQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/lpLTlg4/kuIrkvKDlm57osINcbiAgICBvblVwTG9hZEhlYWRJbWcoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5VU0VSSU5GTy5IRUFEQ0hBTkVTVUNDRVNTKVxuICAgICAgICAgICAgICAgIHRoaXMucmVxVXNlckluZm8oKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvblVwZGF0ZUhlYWRJbWcoZGF0YSkge1xuICAgICAgICBjYy5sb2coZGF0YSwgXCJ1cGRhdGVIZWFkSW1nXCIpXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICBVc2VyLl9oZWFkSW1nVXJsID0gXCJiYXNlX1wiICsgdGhpcy5zZWxlY3RIZWFkSW5kZXggKyBcIi5wbmdcIlxuICAgICAgICAgICAgICAgIFV0aWxNZ3IubG9hZEhlYWRJbWcodGhpcy5oZWFkLCBVc2VyLl9oZWFkSW1nVXJsLCBVc2VyLl91c2VySUQsIHRoaXMpXG4gICAgICAgICAgICAgICAgLy8gUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5VU0VSSU5GTy5IRUFEQ0hBTkVTVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaChcInVwZGF0ZVVzZXJJbmZvXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMub25TaG93SGVhZFBhbmVsKGZhbHNlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBkYXRlTmFtZShkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lLnN0cmluZyA9IHRoaXMubmFtZUVkaXRCb3guc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5uaWNrTmFtZSk7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoaTE4bi5VU0VSSU5GTy5OQU1FQ0hBTkVTVUNDRVNTKTtcbiAgICAgICAgICAgICAgICBVc2VyLl91c2VyTmFtZSA9IGRhdGEubmlja05hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVMYWJlbC5zdHJpbmcgPSBVc2VyLl9zaWduYXR1cmUgPSBkYXRhLnNpZ247XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goXCJ1cGRhdGVVc2VySW5mb1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3goJycsIE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZUluZm8oZGF0YSkge1xuICAgICAgICBHLkxvZ2dlci5sb2coXCLnlKjmiLfkv6Hmga9cIiwgZGF0YSk7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5pY2tOYW1lLnN0cmluZyA9IHRoaXMubmFtZUVkaXRCb3guc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoZGF0YS5uaWNrTmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaWduYXR1cmVMYWJlbC5zdHJpbmcgPSBkYXRhLnNpZ247XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySWQuc3RyaW5nID0gZGF0YS51c2VySWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nb2xkLnN0cmluZyA9IFV0aWxNZ3IuY2hhbmdlTW9uZXkoZGF0YS5nb2xkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmsuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShVc2VyLl9iYW5rKVxuXG4gICAgICAgICAgICAgICAgdGhpcy5sdkJhckxhYmVsLnN0cmluZyA9IChkYXRhLnZpcExldmVsIC0gMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5uZXh0TGV2ZWxUdXJub3Zlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFR1cm5vdmVyID0gVXRpbE1nci5jaGFuZ2VNb25leShkYXRhLmN1cnJlbnRUdXJub3ZlciwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHVybm92ZXIuaW5kZXhPZihcIi5cIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUdXJub3ZlciA9IGN1cnJlbnRUdXJub3Zlci5zdWJzdHJpbmcoMCwgY3VycmVudFR1cm5vdmVyLmluZGV4T2YoXCIuXCIpKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubHZCYXJQcm9ncmVMYWJlbC5zdHJpbmcgPSBjdXJyZW50VHVybm92ZXIgKyAnLycgKyBVdGlsTWdyLmNoYW5nZU1vbmV5KGRhdGEubmV4dExldmVsVHVybm92ZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sdkJhci5wcm9ncmVzcyA9IGRhdGEuY3VycmVudFR1cm5vdmVyIC8gZGF0YS5uZXh0TGV2ZWxUdXJub3ZlcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmx2QmFyLnByb2dyZXNzID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRCaW5kUGhvbmUoZGF0YS5waG9uZSk7XG5cbiAgICAgICAgICAgICAgICBVdGlsTWdyLmxvYWRIZWFkSW1nKHRoaXMuaGVhZCwgZGF0YS5oZWFkSW1nVXJsLCBkYXRhLnVzZXJJZCwgdGhpcylcblxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYS5zdHJpbmcgPSBkYXRhLmFyZWEubGVuZ3RoID8gZGF0YS5hcmVhIDogaTE4bi5VU0VSSU5GTy5VTkJPVU5EO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZWFzTGlzdCA9IGRhdGEuYXJlYXM7XG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IGRhdGEuYXJlYXMubGVuZ3RoID4gdGhpcy5fYXJlYXNDb3VudCA/IHRoaXMuX2FyZWFzQ291bnQgOiBkYXRhLmFyZWFzLmxlbmd0aFxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLmhlaWdodCA9IHRoaXMuX2FyZWFzSXRlbUhlaWdodCAqIG51bVxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld01hc2suaGVpZ2h0ID0gdGhpcy5fYXJlYXNJdGVtSGVpZ2h0ICogbnVtXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQmFua0l0ZW0oZGF0YS5hcmVhcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVmcmVzaEJhbmtJdGVtKGFyZWFzKSB7XG4gICAgICAgIGxldCBzY3JvVmlld0N0cmxDb20gPSB0aGlzLmdldENvbXBvbmVudChTY3JvVmlld0N0cmwpXG4gICAgICAgIHNjcm9WaWV3Q3RybENvbS5kYXRhTGlzdCA9IGFyZWFzO1xuICAgICAgICBzY3JvVmlld0N0cmxDb20ub25JdGVtQ2xpY2tDYWxsYmFjayA9IHRoaXMub25DbGlja0FjY291bnRJdGVtQ2FsbGJhY2suYmluZCh0aGlzKVxuICAgICAgICBhd2FpdCBzY3JvVmlld0N0cmxDb20uZnJhbWluZ0xvYWQoYXJlYXMubGVuZ3RoKVxuICAgIH1cbiAgICBvbkNsaWNrQWNjb3VudEl0ZW1DYWxsYmFjayhub2RlLCBpdGVtSWQpIHtcblxuXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc2Nyb2xsVmlldy5ub2RlKVxuICAgICAgICAgICAgLnNldCh7IHNjYWxlWTogMSB9KVxuICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZVk6IDAgfSlcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG5cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlVwZGF0ZVVzZXJBcmVhUmVxLmNyZWF0ZSh7IGFyZWFOYW1lOiB0aGlzLl9hcmVhc0xpc3RbaXRlbUlkXSB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLlVwZGF0ZVVzZXJBcmVhUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5DTURfVXBkYXRlVXNlckFyZWEsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIG9uVXBkYXRlVXNlckFyZWFSZXMobXNnKSB7XG4gICAgICAgIEcuTG9nZ2VyLmxvZyhcIuWMuuWfn+WQjeensFwiLCBtc2cpO1xuICAgICAgICBpZiAobXNnLnN0YXR1c01zZy5zdGF0dXMgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5hcmVhLnN0cmluZyA9IG1zZy5hcmVhTmFtZS5sZW5ndGggPyBtc2cuYXJlYU5hbWUgOiBpMThuLlVTRVJJTkZPLlVOQk9VTkQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25OZXRBZGRGcmllbmRSZXMoZGF0YSkge1xuICAgICAgICBHLkxvZ2dlci5sb2coXCJBZGRVc2VyUmVzXCIsIGRhdGEpO1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmZyaWVuZC5zdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmRCdG4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZyaWVuZFRpcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmZyaWVuZC5zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmRCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmRUaXAubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kVGlwLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJGUklFTkQuSEFWRV9CRUNPTUVfRlJJRU5EXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kVGlwLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKFwiIzAxRTkyMlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5mcmllbmQuc3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kVGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZyaWVuZFRpcC5sYW5ndWFnZSA9IE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRlJJRU5ELkFMUkVBRFlfQVBQTElFRFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEZyaWVuZFRpcC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChcIiNmZDE0MTRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kQnRuLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRGcmllbmRUaXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiRVJST1JDT0RFLlwiICsgZGF0YS5zdGF0dXNNc2cuc3RhdHVzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmFtZUNoYW5nZUNhbGxiYWNrKGVkaXRib3gpIHtcbiAgICAgICAgbGV0IG5hbWUgPSBlZGl0Ym94LnN0cmluZztcbiAgICAgICAgbGV0IGxlbiA9IFV0aWxNZ3Iuc3RyTGVuKG5hbWUpO1xuICAgICAgICBpZiAobGVuID4gMTQpIHtcbiAgICAgICAgICAgIGVkaXRib3guc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYW1lQ2FsbGJhY2soZWRpdGJveCkge1xuICAgICAgICBHLkxvZ2dlci5sb2coZWRpdGJveC5zdHJpbmcpO1xuICAgICAgICBsZXQgbmFtZSA9IGVkaXRib3guc3RyaW5nO1xuICAgICAgICBpZiAoIW5hbWUgfHwgbmFtZSA9PSBVc2VyLl91c2VyTmFtZSkge1xuICAgICAgICAgICAgZWRpdGJveC5zdHJpbmcgPSBVc2VyLl91c2VyTmFtZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWVFZGl0Qm94LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlVwZGF0ZU5pY2tuYW1lLmNyZWF0ZSh7IHVzZXJJZDogVXNlci5fdXNlcklELCBuaWNrTmFtZTogbmFtZSB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLlVwZGF0ZU5pY2tuYW1lLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VUERBVEVfTklDS05BTUUsXG4gICAgICAgICAgICBidWZmZXIpO1xuICAgIH1cblxuICAgIHNob3coYXJnczogYW55W10pIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKTtcbiAgICAgICAgdGhpcy5zaG93V2l0aEFjdGlvbih0cnVlKTtcbiAgICAgICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX1VzZXJJRCA9IGFyZ3NbMF0udXNlcklEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fVXNlcklEID0gVXNlci5fdXNlcklEO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBsYXlEZWZhdWx0RWZmZWN0KG5hbWUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdoZWFkQ2xvc2UnOlxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlEZWZhdWx0RWZmZWN0KFwiY2xvc2VcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hlYWRVcENsb3NlJzpcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5RGVmYXVsdEVmZmVjdChcImNsb3NlXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBzdXBlci5wbGF5RGVmYXVsdEVmZmVjdChuYW1lKTtcblxuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOiB0aGlzLmNsb3NlV2l0aEFjdGlvbigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NoYW5nZUhlYWQnOlxuICAgICAgICAgICAgY2FzZSBcImhlYWRTcHJpdGVcIjogdGhpcy5vblNob3dIZWFkUGFuZWwodHJ1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImhlYWRDbG9zZVwiOiB0aGlzLm9uU2hvd0hlYWRQYW5lbChmYWxzZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImhlYWRDaGFuZ2VcIjogdGhpcy5vbkNoYW5nZUhlYWQoKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibmFtZWJ0blwiOiB0aGlzLm9uTmFtZUVkaXRCdG4odHJ1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJpbmRQaG9uZWJ0blwiOiB0aGlzLm9uQmluZFBob25lQnRuKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImJpbmRQYXlidG5cIjogdGhpcy5vbkJpbmRQYXlCdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYmFua2J0blwiOiB0aGlzLm9uQmFua0J0bigpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkVXBDbG9zZVwiOiB0aGlzLnNob3dVcEhlYWRQYW5lbChmYWxzZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRha2VQaG90b1wiOiB0aGlzLm9udGFrZVBob3RvQnRuKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxvY2FsUGhvdG9cIjogdGhpcy5vbmxvY2FsUGhvdG9CdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibWFza0Nsb3NlXCI6IHRoaXMub25DbGlja0NoZWNrKCk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1vZGlmeWJ0blwiOiB0aGlzLm9uQ2xpY2tDaGVjaygpOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjb3B5QnRuXCI6IHRoaXMub25Db3B5SURCdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiY2hhbmdlTmFtZUNsb3NlXCI6IHRoaXMub25OYW1lRWRpdEJ0bihmYWxzZSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNoYW5nZUluZm9CdG5cIjogdGhpcy5vbkNvbmZpcm1CdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYWRkZnJpZW5kQnRuXCI6IHRoaXMub25BZGRGcmllbmRCdG4oKTsgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBHLkxvZ2dlci5lcnJvcihcIm5vIGZpbmQgYnV0dG9uIG5hbWUgLT4gJXNcIiwgbmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVXBMb2FkUGhvdG8ocGF0aCkge1xuICAgICAgICAvLyBQYW5lbEhlbHAuc2hvd1RpcChcIuWktOWDj+S4iuS8oFwiKVxuICAgICAgICB0aGlzLnNob3dVcEhlYWRQYW5lbChmYWxzZSlcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVxVXBMb2FkSGVhZChwYXRoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBVdGlsTWdyLmdldFVwTG9hZFBob3RvQmFzZTY0KHBhdGgpXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxVXBMb2FkSGVhZChkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGxldCBoZWFkID0gdGhpcy5oZWFkO1xuICAgICAgICAvLyBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShwYXRoLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlKSB7XG4gICAgICAgIC8vICAgICAvLyBVc2UgdGV4dHVyZSB0byBjcmVhdGUgc3ByaXRlIGZyYW1lXG4gICAgICAgIC8vICAgICBpZiAodGV4dHVyZSAmJiBoZWFkKSB7XG4gICAgICAgIC8vICAgICAgICAgaGVhZC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICog5LiK5Lyg5aS05YOPXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgcmVxVXBMb2FkSGVhZChkYXRhKSB7XG4gICAgICAgIFBhbmVsSGVscC5zaG93TG9hZGluZyhpMThuLldBSVQuVVBMT0FESU5HKTtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLmJhc2UuVXBsb2FkSGVhZEltZ1JlcS5jcmVhdGUoeyB1c2VySWQ6IFVzZXIuX3VzZXJJRCwgaW1nRGF0YTogZGF0YSB9KTtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHByb3RvUGFja2FnZS5oYWxsLmJhc2UuVXBsb2FkSGVhZEltZ1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuVVBMT0FEX0hFQURfSU1HLFxuICAgICAgICAgICAgYnVmZmVyKTtcblxuICAgICAgICAvLyBsZXQgcGFja2dlID0gbmV3IFJlcXVlc3RQYWNrZ2U7XG4gICAgICAgIC8vIHBhY2tnZS5kYXRhLnVybCA9ICBDb25maWcudXBsb2FkSGVhZFVSTDtcbiAgICAgICAgLy8gcGFja2dlLmRhdGEudHlwZSA9IEh0dHBSZXF1ZXN0VHlwZS5QT1NUXG4gICAgICAgIC8vIGxldCBvYmogPSB7dG9rZW46VXNlci5fdG9rZW4saW1nRGF0YTpkYXRhfVxuICAgICAgICAvLyBwYWNrZ2UuZGF0YS5kYXRhID0gSlNPTi5zdHJpbmdpZnkob2JqKVxuICAgICAgICAvLyBwYWNrZ2UuZGF0YS50aW1lb3V0ID0gMTAwMDA7XG4gICAgICAgIC8vIHBhY2tnZS5zZW5kKChuZXREYXRhKSA9PiB7XG4gICAgICAgIC8vICAgICBHLkxvZ2dlci5sb2coJ3JlcVVwTG9hZEhlYWQgPSAnLCBuZXREYXRhKTtcbiAgICAgICAgLy8gICAgIGlmIChuZXREYXRhLnN0YXRlID09IDApIHtcbiAgICAgICAgLy8gICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlVTRVJJTkZPLkhFQURDSEFORVNVQ0NFU1MpXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yZXFVc2VySW5mbygpXG4gICAgICAgIC8vICAgICB9ZWxzZXtcbiAgICAgICAgLy8gICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJyxpMThuLkVSUk9SQ09ERS5EQVRBRVJST1IrbmV0RGF0YS5zdGF0ZSlcbiAgICAgICAgLy8gICAgIH1cblxuICAgICAgICAvLyB9LCAoZXJyKSA9PiB7XG4gICAgICAgIC8vICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJyxpMThuLkVSUk9SQ09ERS5EQVRBRVJST1IrZXJyLnJlYXNvbilcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaJk+W8gOebuOaculxuICAgICAqL1xuICAgIG9udGFrZVBob3RvQnRuKCkge1xuICAgICAgICB3aW5kb3dbJ3BsYXRmb3JtVXRpbCddLnRha2VQaG90b01ldGhvZCgpXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaJk+W8gOebuOWGjFxuICAgICAqL1xuICAgIG9ubG9jYWxQaG90b0J0bigpIHtcbiAgICAgICAgd2luZG93WydwbGF0Zm9ybVV0aWwnXS5sb2NhbFBob3RvTWV0aG9kKClcbiAgICB9XG4gICAgb25CaW5kUGhvbmVCdG4oKSB7XG4gICAgICAgIGRpc3BhdGNoKCdvcGVuQmluZFBob25lJyk7XG4gICAgfVxuICAgIG9uQmFua0J0bigpIHtcbiAgICAgICAgZGlzcGF0Y2goXCJvcGVuQmFua1ZpZXdcIik7XG4gICAgfVxuICAgIG9uQmluZFBheUJ0bigpIHtcbiAgICAgICAgaWYgKFVzZXIuX3Bob25lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChVc2VyLnBpZ2d5QmFuaykge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKCdvcGVuV2l0aGRyYXdhbFZpZXcnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCgnb3BlblNldFNlY29uZGFyeVB3ZFZpZXcnLCBTZXR0U2Vjb25kYXJ5UHdkVHlwZS5zZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dNc2dCb3hJY29uKFwiXCIsIGkxOG4uV0lUSERSQVdBTC5OT0JJTkRQSE9ORVRJUCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKCdvcGVuQmluZFBob25lJyk7XG4gICAgICAgICAgICB9LCBpMThuLldJVEhEUkFXQUwuR09UT0JJTkRQSE9ORSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTmFtZUVkaXRCdG4oc2hvdykge1xuICAgICAgICAvLyB0aGlzLm5hbWVFZGl0Qm94LmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAvLyB0aGlzLm5hbWVFZGl0Qm94LmZvY3VzKCk7XG4gICAgICAgIGlmICh0aGlzLmNoYW5nZU5hbWVQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VOYW1lUGFuZWwuYWN0aXZlID0gc2hvdztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25Db25maXJtQnRuKCkge1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMubmlja05hbWVFZGl0Qm94LnN0cmluZztcbiAgICAgICAgbGV0IHNpZ25hdHVyZSA9IHRoaXMuc2lnbmF0dXJlRWRpdEJveC5zdHJpbmc7XG5cbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIFBhbmVsSGVscC5zaG93VGlwKGkxOG4uVVNFUklORk8uRU5URVJOQU1FX0VSUk9SKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hbWVFZGl0Qm94LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLlVwZGF0ZU5pY2tuYW1lLmNyZWF0ZSh7IHVzZXJJZDogVXNlci5fdXNlcklELCBuaWNrTmFtZTogbmFtZSwgc2lnbjogc2lnbmF0dXJlIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuVXBkYXRlTmlja25hbWUuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlVQREFURV9OSUNLTkFNRSxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgICAgIHRoaXMub25OYW1lRWRpdEJ0bihmYWxzZSk7XG4gICAgfVxuXG4gICAgb25BZGRGcmllbmRCdG4oKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgb3RoZXJJZDogdGhpcy5fVXNlcklELFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLkFkZEZyaWVuZFJlcS5jcmVhdGUoZGF0YSk7XG4gICAgICAgIGxldCBidWZmZXIgPSBwcm90b1BhY2thZ2UuaGFsbC5BZGRGcmllbmRSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG5cbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgIHByb3RvUGFja2FnZS5oYWxsLkhhbGxDbWQuQ01EX0FkZEZyaWVuZCxcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgICAgIC8vIFBhbmVsSGVscC5zaG93VGlwKE1hbmFnZXIubWFrZUxhbmd1YWdlKFwiVVNFUklORk8uQURERlJJRU5EXCIpKTtcblxuICAgIH1cblxuICAgIGdldE1lSGVhZEluZGV4KCkge1xuICAgICAgICBsZXQgaXNOZXRXb3JrSGVhZCA9IChVc2VyLl9oZWFkSW1nVXJsICYmIFVzZXIuX2hlYWRJbWdVcmwuaW5kZXhPZihcImJhc2VcIikgPT0gLTEpXG4gICAgICAgIGxldCBoZWFkSW5kZXggPSAwXG4gICAgICAgIGlmICghaXNOZXRXb3JrSGVhZCkge1xuICAgICAgICAgICAgaWYgKFVzZXIuX2hlYWRJbWdVcmwpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gVXNlci5faGVhZEltZ1VybC5zcGxpdChcIl9cIilcbiAgICAgICAgICAgICAgICBoZWFkSW5kZXggPSBwYXJzZUludChhcnJbYXJyLmxlbmd0aCAtIDFdKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWFkSW5kZXggPSBVdGlsTWdyLmdldExvY2FsSGVhZEluZGV4KFVzZXIuX3VzZXJJRClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZEluZGV4XG4gICAgfVxuXG4gICAgb25TaG93SGVhZFBhbmVsKHNob3cpIHtcbiAgICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgICAgIGxldCBtZUhlYWRJbmRleCA9IHRoaXMuZ2V0TWVIZWFkSW5kZXgoKVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RIZWFkSW5kZXggPSBtZUhlYWRJbmRleDtcbiAgICAgICAgICAgIHRoaXMuaGVhZFBhbmVsLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuaGVhZEl0bWVzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ID0gZWxlbWVudC5nZXRDaGlsZEJ5TmFtZShcInNlbGVjdFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZEluZGV4ID0gcGFyc2VJbnQoZWxlbWVudC5uYW1lKVxuICAgICAgICAgICAgICAgIHNlbGVjdC5hY3RpdmUgPSBoZWFkSW5kZXggPT0gbWVIZWFkSW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RIZWFkSW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5oZWFkUGFuZWwuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2hhbmdlSGVhZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0SGVhZEluZGV4ID4gMCkge1xuICAgICAgICAgICAgbGV0IGhlYWROYW1lID0gXCJiYXNlX1wiICsgdGhpcy5zZWxlY3RIZWFkSW5kZXggKyBcIi5wbmdcIlxuICAgICAgICAgICAgaWYgKFVzZXIuX2hlYWRJbWdVcmwgPT0gaGVhZE5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvd0hlYWRQYW5lbChmYWxzZSlcblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLmJhc2UuVXBkYXRlSGVhZEltZ1JlcS5jcmVhdGUoeyB1c2VySWQ6IFVzZXIuX3VzZXJJRCwgaW1nTmFtZTogaGVhZE5hbWUgfSk7XG4gICAgICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuYmFzZS5VcGRhdGVIZWFkSW1nUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnNlbmRNc2coc2VydmVyVHlwZS5Mb2JieSxcbiAgICAgICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLlVQREFURV9IRUFEX0lNRyxcbiAgICAgICAgICAgICAgICBidWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db3B5SURCdG4oKSB7XG4gICAgICAgIHdpbmRvd1sncGxhdGZvcm1VdGlsJ10uY29weVRvQ2xpcCh0aGlzLnVzZXJJZC5zdHJpbmcpO1xuICAgIH1cblxuICAgIHJlcVVzZXJJbmZvKCkge1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuVXNlckluZm9ybWF0aW9uLmNyZWF0ZSh7IHVzZXJJZDogdGhpcy5fVXNlcklEIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuVXNlckluZm9ybWF0aW9uLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VuZE1zZyhzZXJ2ZXJUeXBlLkxvYmJ5LFxuICAgICAgICAgICAgcHJvdG9QYWNrYWdlLmhhbGwuSGFsbENtZC5VU0VSX0lORk9STUFUSU9OLFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG4gICAgZmluZFVzZXIoKSB7XG4gICAgICAgIEZyaWVuZERhdGEuZ2V0SW5zdGFuY2UoKS5pc1VzZXJJbmZvU2VuZEZpbmQgPSB0cnVlO1xuICAgICAgICBsZXQgcmVxID0gcHJvdG9QYWNrYWdlLmhhbGwuRmluZFVzZXJSZXEuY3JlYXRlKHsgb3RoZXJJZDogdGhpcy5fVXNlcklEIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuRmluZFVzZXJSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9GaW5kVXNlcixcbiAgICAgICAgICAgIGJ1ZmZlcik7XG4gICAgfVxuICAgIG9uTmV0RmluZFVzZXJSZXMoZGF0YSk6IHZvaWQge1xuICAgICAgICBHLkxvZ2dlci5sb2coXCJmaW5kdXNlclwiLCBkYXRhKTtcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzTXNnLnN0YXR1cyA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGUgPSAwO1xuICAgICAgICAgICAgaWYgKGRhdGEuZnJpZW5kKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBkYXRhLmZyaWVuZC5zdGF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9Vc2VySUQgPSBkYXRhLmZyaWVuZC5mcmllbmRJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpc01lID0gdGhpcy5fVXNlcklEID09IFVzZXIuX3VzZXJJRDtcbiAgICAgICAgICAgIGxldCBpc0ZyaWVuZDogYm9vbGVhbiA9IHN0YXRlID09IDE7XG4gICAgICAgICAgICBHLkxvZ2dlci5sb2coXCLliKTmlq3njqnlrrbmmK/lkKbmmK/lpb3lj4tcIiwgaXNGcmllbmQpO1xuICAgICAgICAgICAgdGhpcy5hZGRGcmllbmRUaXAubm9kZS5hY3RpdmUgPSAhaXNNZSAmJiBpc0ZyaWVuZDtcbiAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kQnRuLmFjdGl2ZSA9ICFpc01lICYmICFpc0ZyaWVuZDtcbiAgICAgICAgICAgIHRoaXMuYWRkRnJpZW5kVGlwLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJGUklFTkQuSEFWRV9CRUNPTUVfRlJJRU5EXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgUGFuZWxIZWxwLnNob3dUaXAoTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJFUlJPUkNPREUuXCIgKyBkYXRhLnN0YXR1c01zZy5zdGF0dXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZUxhbmd1YWdlKCk7XG4gICAgICAgIHRoaXMucmVxVXNlckluZm8oKVxuICAgICAgICBpZiAoRnJpZW5kRGF0YS5nZXRJbnN0YW5jZSgpLmlzT3BlbkZyaWVuZCkgdGhpcy5maW5kVXNlcigpO1xuICAgICAgICBsZXQgaXNNZSA9IHRoaXMuX1VzZXJJRCA9PSBVc2VyLl91c2VySUQ7XG4gICAgICAgIGxldCBpc0hhbGxWaWV3ID0gTWFuYWdlci51aU1hbmFnZXIuaXNJbkN1cnJlbnRHYW1lKCdIYWxsVmlldycpICYmICFNYW5hZ2VyLnVpTWFuYWdlci5pc0luQ3VycmVudEdhbWUoXCJMZWFkZXJCb2FyZFZpZXdcIilcbiAgICAgICAgLy/ngrnlh7vlpKfljoXlpLTlg4/lsZXnpLrnmoRcbiAgICAgICAgdGhpcy5jaGFuZ2VIZWFkLmFjdGl2ZSA9IGlzSGFsbFZpZXcgJiYgaXNNZTtcbiAgICAgICAgdGhpcy5uYW1lYmcuYWN0aXZlID0gaXNIYWxsVmlldyAmJiBpc01lO1xuICAgICAgICB0aGlzLm1vZGlmeUJ0bi5hY3RpdmUgPSBpc0hhbGxWaWV3ICYmIGlzTWU7XG4gICAgICAgIHRoaXMuYXJlYU5vZGUuYWN0aXZlID0gaXNIYWxsVmlldyAmJiBpc01lO1xuICAgICAgICB0aGlzLnBob25lTm9kZS5hY3RpdmUgPSBpc0hhbGxWaWV3ICYmIGlzTWU7XG4gICAgICAgIHRoaXMuYmFua05vZGUuYWN0aXZlID0gaXNIYWxsVmlldyAmJiBpc01lO1xuXG4gICAgICAgIHRoaXMucGF5Tm9kZS5hY3RpdmUgPSBpc0hhbGxWaWV3ICYmIGlzTWUgJiYgKCFVc2VyLmlzUmVjaGFyZ2VkUGxheWVyID8gKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBvYmogPSBIYWxsQ29uZmlnLmhhbGxJY29uQ29uZmlnICYmIEhhbGxDb25maWcuaGFsbEljb25Db25maWcuZmluZChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iai5rZXkgPT0gXCJnb2xkQmFua0NhcmRCaW5kU3RhdHVzXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIG9iai52YWx1ZSA+IDBcbiAgICAgICAgfSkoKSA6IHRydWUpO1xuICAgICAgICAvL+eCueWHu+WFtuS7luWcsOaWueWktOWDj+WxleekulxuICAgICAgICB0aGlzLmNvcHlCdG4uYWN0aXZlID0gIWlzSGFsbFZpZXcgJiYgIWlzTWU7XG4gICAgICAgIHRoaXMubmlja05hbWUubm9kZS5hY3RpdmUgPSBpc0hhbGxWaWV3ICYmIGlzTWUgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgdGhpcy5waG9uZS5zdHJpbmcgPSBpMThuLlVTRVJJTkZPLlVOQk9VTkQ7XG4gICAgICAgIHRoaXMuYXJlYS5zdHJpbmcgPSBpMThuLlVTRVJJTkZPLlVOQk9VTkQ7XG4gICAgICAgIHRoaXMubmlja05hbWUuc3RyaW5nID0gVXRpbE1nci5zZXRTdHJpbmcoVXNlci5fdXNlck5hbWUpO1xuICAgICAgICB0aGlzLmFyZWEuaG9yaXpvbnRhbEFsaWduID0gaXNNZSA/IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbi5DRU5URVIgOiBjYy5MYWJlbC5Ib3Jpem9udGFsQWxpZ24uTEVGVDtcbiAgICAgICAgaWYgKCFpc01lKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlTGFiZWwuc3RyaW5nID0gVXNlci5fc2lnbmF0dXJlLmxlbmd0aCA/IFVzZXIuX3NpZ25hdHVyZSA6IFwiWW91IGhhdmVuJ3Qgc2FpZCBhbnl0aGluZyB5ZXRcIjtcbiAgICAgICAgdGhpcy5uaWNrTmFtZUVkaXRCb3guc3RyaW5nID0gdGhpcy5uaWNrTmFtZS5zdHJpbmcgPSB0aGlzLm5hbWVFZGl0Qm94LnN0cmluZyA9IFV0aWxNZ3Iuc2V0U3RyaW5nKFVzZXIuX3VzZXJOYW1lKTtcbiAgICAgICAgdGhpcy51c2VySWQuc3RyaW5nID0gVXNlci5fdXNlcklEIHx8ICcnXG4gICAgICAgIHRoaXMuZ29sZC5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KFVzZXIuX2dvbGQpXG4gICAgICAgIHRoaXMuYmFuay5zdHJpbmcgPSBVdGlsTWdyLmNoYW5nZU1vbmV5KFVzZXIuX2JhbmspXG5cbiAgICAgICAgVXRpbE1nci5sb2FkSGVhZEltZyh0aGlzLmhlYWQsIFVzZXIuX2hlYWRJbWdVcmwsIFVzZXIuX3VzZXJJRCwgdGhpcylcbiAgICAgICAgdGhpcy5oZWFkUGFuZWwuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKFVzZXIuX3Bob25lKSB7XG4gICAgICAgICAgICBsZXQgYmFua0luZGV4ID0gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNlbGVjdEJhbmtJbmRleFwiKVxuICAgICAgICAgICAgaWYgKFVzZXIuX2JhbmtMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoYmFua0luZGV4ICE9IG51bGwgJiYgYmFua0luZGV4ID49IDApIHRoaXMucGF5LnN0cmluZyA9IFV0aWxNZ3Iuc2V0QmFua0NhcmRTdHJpbmdDb3ZlcihVc2VyLl9iYW5rTGlzdFtiYW5rSW5kZXhdKVxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5wYXkuc3RyaW5nID0gVXRpbE1nci5zZXRCYW5rQ2FyZFN0cmluZ0NvdmVyKFVzZXIuX2JhbmtMaXN0WzBdKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBheS5zdHJpbmcgPSBpMThuLlVTRVJJTkZPLlVOQk9VTkRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGF5LnN0cmluZyA9IGkxOG4uVVNFUklORk8uTk9CSU5EUEhPTkVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tDaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsVmlldy5ub2RlLmFjdGl2ZSkge1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5zY3JvbGxWaWV3Lm5vZGUpXG4gICAgICAgICAgICAgICAgLnNldCh7IHNjYWxlWTogMSB9KVxuICAgICAgICAgICAgICAgIC50bygwLjEsIHsgc2NhbGVZOiAwIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5ub2RlLmFjdGl2ZSA9IHRydWVcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2Nyb2xsVmlldy5ub2RlKVxuICAgICAgICAgICAgICAgIC5zZXQoeyBzY2FsZVk6IDAgfSlcbiAgICAgICAgICAgICAgICAudG8oMC4xLCB7IHNjYWxlWTogMSB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKVxuICAgICAgICAvL+WkhOeQhuWktOWDj+m7keadv1xuICAgICAgICBGcmllbmREYXRhLmdldEluc3RhbmNlKCkuaXNVc2VySW5mb1NlbmRGaW5kID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2hhbmdlTGFuZ3VhZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYW5nZU5hbWVQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5maW5kKCdjb250ZW50L25pY2tOYW1lJywgdGhpcy5jaGFuZ2VOYW1lUGFuZWwpLmdldENvbXBvbmVudChjYy5MYWJlbCkubGFuZ3VhZ2UgPSBNYW5hZ2VyLm1ha2VMYW5ndWFnZShcIlVTRVJJTkZPLk5JQ0tOQU1FXCIpO1xuICAgICAgICAgICAgdGhpcy5maW5kKCdjb250ZW50L3NpZ25hdHVyZScsIHRoaXMuY2hhbmdlTmFtZVBhbmVsKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmxhbmd1YWdlID0gTWFuYWdlci5tYWtlTGFuZ3VhZ2UoXCJVU0VSSU5GTy5TSUdOQVRVUkVcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==