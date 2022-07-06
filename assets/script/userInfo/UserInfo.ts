import { Config } from "../common/config/Config";
import { i18n } from "../common/language/LanguageImpl";
import { Manager } from "../common/manager/Manager";
import { protoPackage, serverType } from "../common/net/CommonService";
import { LobbyService } from "../common/net/LobbyService";
import { BUNDLE_RESOURCES } from "../framework/base/Defines";
import { IController } from "../framework/controller/Controller";
import { injectService, makeKey } from "../framework/decorator/Decorators";
import { HttpRequestType, RequestPackge } from "../framework/net/HttpClient";
import UIView from "../framework/ui/UIView";
import { User } from "../global/User";
import { UtilMgr } from "../global/UtilMgr";
import PanelHelp from "../msgbox/PanelHelp";
import { SettSecondaryPwdType } from "../withdrawal/SetSecondaryPwdView";
import ScroViewPlus from "../common/component/ScroViewPlus";
import ScroViewCtrl from "../common/component/ScroViewCtrl";
import { HallConfig } from "../hall/HallNetController";


const { ccclass, property } = cc._decorator;

@ccclass
@injectService(LobbyService.instance)
export default class UserInfo extends UIView implements IController<LobbyService> {

    @property(cc.EditBox)
    nameEditBox: cc.EditBox = null;

    @property(cc.Label)
    userId: cc.Label = null;

    @property(cc.Label)
    gold: cc.Label = null;

    @property(cc.Label)
    bank: cc.Label = null;

    @property(cc.Label)
    phone: cc.Label = null;

    @property(cc.Label)
    area: cc.Label = null;

    @property(cc.Label)
    pay: cc.Label = null;

    @property(cc.Label)
    lvBarLabel: cc.Label = null;

    @property(cc.Label)
    lvBarProgreLabel: cc.Label = null;

    @property(cc.ProgressBar)
    lvBar: cc.ProgressBar = null;

    @property(cc.Sprite)
    head: cc.Sprite = null;

    @property(cc.Node)
    headPanel: cc.Node = null;

    @property(cc.Node)
    changeNamePanel: cc.Node = null;

    @property(cc.Node)
    headContent: cc.Node = null;

    @property(cc.Node)
    bindBtn: cc.Node = null;

    @property(cc.Node)
    headUpPanel: cc.Node = null;

    @property(ScroViewPlus)
    scrollView: ScroViewPlus = null

    @property(cc.Node)
    scrollViewMask: cc.Node = null

    @property(cc.Label)
    friendTip: cc.Label = null;

    @property(cc.Node)
    addFriend: cc.Node = null;

    @property(cc.EditBox)
    nickNameEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    signatureEditBox: cc.EditBox = null;

    //点击大厅头像展示的
    @property(cc.Node)
    changeHead: cc.Node = null;

    @property(cc.Node)
    namebg: cc.Node = null;

    @property(cc.Node)
    modifyBtn: cc.Node = null;

    @property(cc.Node)
    areaNode: cc.Node = null;

    @property(cc.Node)
    phoneNode: cc.Node = null;

    @property(cc.Node)
    bankNode: cc.Node = null;

    @property(cc.Node)
    payNode: cc.Node = null;

    //点击其他地方头像展示
    @property(cc.Node)
    copyBtn: cc.Node = null;

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    signatureLabel: cc.Label = null;

    @property(cc.Label)
    addFriendTip: cc.Label = null;

    @property(cc.Node)
    addFriendBtn: cc.Node = null;

    headItmes: any = [];

    selectHeadIndex: number = 0;

    service: LobbyService;

    _areasList: any = []

    _areasItemHeight: number = 40
    _areasCount: number = 16

    _UserID: number;

    public static getPrefabUrl() {
        return "userInfo/prefabs/UserInfo";
    }

    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');

        this.nameEditBox.node.on('editing-did-ended', this.nameCallback, this);
        this.nameEditBox.node.on('text-changed', this.nameChangeCallback, this)
        this.nameEditBox.enabled = false;
        this.initHeadPanel();
        this.showUpHeadPanel(false);
    }

    initHeadPanel() {
        for (let index = 1; index <= 16; index++) {
            let item = this.headContent.getChildByName('headItem' + index)
            item.name = UtilMgr.setString(index.toString());
            let select = item.getChildByName("select");
            select.active = false
            item.on(cc.Node.EventType.TOUCH_END, this.headItemClick, this)
            this.headItmes.push(item);
        }
    }



    headItemClick(event) {
        G.Logger.log(event);
        this.headItmes.forEach((element) => {
            if (event.target.name == '1') {
                this.showUpHeadPanel(true)
                this.onShowHeadPanel(false)
            } else {
                if (element.name == event.target.name) {
                    let select = element.getChildByName("select");
                    select.active = true;
                    this.selectHeadIndex = parseInt(element.name);
                } else {
                    let select = element.getChildByName("select");
                    select.active = false;
                }
            }

        });
        this.audioHelper.playEffect("common/audio/click", BUNDLE_RESOURCES);

    }
    showUpHeadPanel(show) {
        if (this.headUpPanel) {
            this.headUpPanel.active = show
        }
    }

    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.USER_INFORMATION), this.onUpdateInfo);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.UPDATE_NICKNAME), this.onUpdateName);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.UPDATE_HEAD_IMG), this.onUpdateHeadImg);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.UPLOAD_HEAD_IMG), this.onUpLoadHeadImg);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_UpdateUserArea), this.onUpdateUserAreaRes);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_AddFriend), this.onNetAddFriendRes);
        this.registerEvent(makeKey(serverType.Lobby, protoPackage.hall.HallCmd.CMD_FindUser), this.onNetFindUserRes);

        this.registerEvent('bindPhoneSuccess', this.initBindPhone);
        this.registerEvent('handleUpLoadPhoto', this.handleUpLoadPhoto);
        this.registerEvent("updateUserInfo", this.reqUserInfo);

    }

    initBindPhone(phone) {
        if (phone) {
            this.phone.string = UtilMgr.setStringCover(phone);
            this.bindBtn.active = false;
        } else {
            this.bindBtn.active = true;
            this.phone.string = i18n.USERINFO.UNBOUND;
        }
    }
    //头像上传回调
    onUpLoadHeadImg(data) {
        if (data) {
            if (data.statusMsg.status == 0) {
                PanelHelp.showTip(i18n.USERINFO.HEADCHANESUCCESS)
                this.reqUserInfo()
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }
    onUpdateHeadImg(data) {
        cc.log(data, "updateHeadImg")
        if (data) {
            if (data.statusMsg.status == 0) {
                User._headImgUrl = "base_" + this.selectHeadIndex + ".png"
                UtilMgr.loadHeadImg(this.head, User._headImgUrl, User._userID, this)
                // PanelHelp.showTip(i18n.USERINFO.HEADCHANESUCCESS);
                dispatch("updateUserInfo");
                this.onShowHeadPanel(false)
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    onUpdateName(data) {
        if (data) {
            if (data.statusMsg.status == 0) {
                this.nickName.string = this.nameEditBox.string = UtilMgr.setString(data.nickName);
                PanelHelp.showTip(i18n.USERINFO.NAMECHANESUCCESS);
                User._userName = data.nickName;
                this.signatureLabel.string = User._signature = data.sign;
                dispatch("updateUserInfo");
            } else {
                PanelHelp.showMsgBox('', Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
            }
        }
    }

    onUpdateInfo(data) {
        G.Logger.log("用户信息", data);
        if (data) {
            if (data.statusMsg.status == 0) {
                this.nickName.string = this.nameEditBox.string = UtilMgr.setString(data.nickName);
                this.signatureLabel.string = data.sign;
                this.userId.string = data.userId;
                this.gold.string = UtilMgr.changeMoney(data.gold);
                this.bank.string = UtilMgr.changeMoney(User._bank)

                this.lvBarLabel.string = (data.vipLevel - 1).toString();
                if (data.nextLevelTurnover) {
                    let currentTurnover = UtilMgr.changeMoney(data.currentTurnover, false)
                    if (currentTurnover.indexOf(".") != -1) {
                        currentTurnover = currentTurnover.substring(0, currentTurnover.indexOf("."))
                    }
                    this.lvBarProgreLabel.string = currentTurnover + '/' + UtilMgr.changeMoney(data.nextLevelTurnover, false);
                    this.lvBar.progress = data.currentTurnover / data.nextLevelTurnover;
                } else {
                    this.lvBar.progress = 1;
                }

                this.initBindPhone(data.phone);

                UtilMgr.loadHeadImg(this.head, data.headImgUrl, data.userId, this)

                this.area.string = data.area.length ? data.area : i18n.USERINFO.UNBOUND;
                this._areasList = data.areas;
                let num = data.areas.length > this._areasCount ? this._areasCount : data.areas.length
                this.scrollView.node.height = this._areasItemHeight * num
                this.scrollViewMask.height = this._areasItemHeight * num
                this.refreshBankItem(data.areas)
            }

        }
    }

    async refreshBankItem(areas) {
        let scroViewCtrlCom = this.getComponent(ScroViewCtrl)
        scroViewCtrlCom.dataList = areas;
        scroViewCtrlCom.onItemClickCallback = this.onClickAccountItemCallback.bind(this)
        await scroViewCtrlCom.framingLoad(areas.length)
    }
    onClickAccountItemCallback(node, itemId) {


        cc.tween(this.scrollView.node)
            .set({ scaleY: 1 })
            .to(0.1, { scaleY: 0 })
            .call(() => {
                this.scrollView.node.active = false
            })
            .start()

        let req = protoPackage.hall.UpdateUserAreaReq.create({ areaName: this._areasList[itemId] });
        let buffer = protoPackage.hall.UpdateUserAreaReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_UpdateUserArea,
            buffer);
    }

    onUpdateUserAreaRes(msg) {
        G.Logger.log("区域名称", msg);
        if (msg.statusMsg.status == 0) {
            this.area.string = msg.areaName.length ? msg.areaName : i18n.USERINFO.UNBOUND;
        }
    }
    onNetAddFriendRes(data) {
        G.Logger.log("AddUserRes", data);
        if (data.statusMsg.status == 0) {
            if (data.friend.state == 2) {
                this.addFriendBtn.active = true;
                this.addFriendTip.node.active = false;
            } else if (data.friend.state == 1) {
                this.addFriendBtn.active = false;
                this.addFriendTip.node.active = true;
                this.addFriendTip.language = Manager.makeLanguage("FRIEND.HAVE_BECOME_FRIEND");
                this.addFriendTip.node.color = new cc.Color().fromHEX("#01E922");
            } else if (data.friend.state == 0) {
                this.addFriendBtn.active = false;
                this.addFriendTip.node.active = true;
                this.addFriendTip.language = Manager.makeLanguage("FRIEND.ALREADY_APPLIED");
                this.addFriendTip.node.color = new cc.Color().fromHEX("#fd1414");
            } else {
                this.addFriendBtn.active = true;
                this.addFriendTip.node.active = false;
            }
        } else {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }
    nameChangeCallback(editbox) {
        let name = editbox.string;
        let len = UtilMgr.strLen(name);
        if (len > 14) {
            editbox.string = UtilMgr.setString(name);
        }
    }

    nameCallback(editbox) {
        G.Logger.log(editbox.string);
        let name = editbox.string;
        if (!name || name == User._userName) {
            editbox.string = User._userName;
            return;
        }
        this.nameEditBox.enabled = false;
        let req = protoPackage.hall.UpdateNickname.create({ userId: User._userID, nickName: name });
        let buffer = protoPackage.hall.UpdateNickname.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.UPDATE_NICKNAME,
            buffer);
    }

    show(args: any[]) {
        super.show(args);
        this.showWithAction(true);
        if (args && args.length) {
            this._UserID = args[0].userID;
        } else {
            this._UserID = User._userID;
        }
    }
    playDefaultEffect(name) {
        switch (name) {
            case 'headClose':
                super.playDefaultEffect("close")
                break;
            case 'headUpClose':
                super.playDefaultEffect("close")
                break;
            default: super.playDefaultEffect(name);

        }
    }
    onClick(name, node) {
        switch (name) {
            case "close": this.closeWithAction(); break;
            case 'changeHead':
            case "headSprite": this.onShowHeadPanel(true); break;
            case "headClose": this.onShowHeadPanel(false); break;
            case "headChange": this.onChangeHead(); break;
            case "namebtn": this.onNameEditBtn(true); break;
            case "bindPhonebtn": this.onBindPhoneBtn(); break;
            case "bindPaybtn": this.onBindPayBtn(); break;
            case "bankbtn": this.onBankBtn(); break;
            case "headUpClose": this.showUpHeadPanel(false); break;
            case "takePhoto": this.ontakePhotoBtn(); break;
            case "localPhoto": this.onlocalPhotoBtn(); break;
            case "maskClose": this.onClickCheck(); break;
            case "modifybtn": this.onClickCheck(); break;
            case "copyBtn": this.onCopyIDBtn(); break;
            case "changeNameClose": this.onNameEditBtn(false); break;
            case "changeInfoBtn": this.onConfirmBtn(); break;
            case "addfriendBtn": this.onAddFriendBtn(); break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    handleUpLoadPhoto(path) {
        // PanelHelp.showTip("头像上传")
        this.showUpHeadPanel(false)
        if (cc.sys.isBrowser) {
            this.reqUpLoadHead(path)
        } else {
            let data = UtilMgr.getUpLoadPhotoBase64(path)
            if (data) {
                this.reqUpLoadHead(data)
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
        PanelHelp.showLoading(i18n.WAIT.UPLOADING);
        let req = protoPackage.hall.base.UploadHeadImgReq.create({ userId: User._userID, imgData: data });
        let buffer = protoPackage.hall.base.UploadHeadImgReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.UPLOAD_HEAD_IMG,
            buffer);

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
        window['platformUtil'].takePhotoMethod()
    }
    /**
     * 打开相册
     */
    onlocalPhotoBtn() {
        window['platformUtil'].localPhotoMethod()
    }
    onBindPhoneBtn() {
        dispatch('openBindPhone');
    }
    onBankBtn() {
        dispatch("openBankView");
    }
    onBindPayBtn() {
        if (User._phone.length > 0) {
            if (User.piggyBank) {
                dispatch('openWithdrawalView')
            } else {
                dispatch('openSetSecondaryPwdView', SettSecondaryPwdType.set);
            }
        } else {
            PanelHelp.showMsgBoxIcon("", i18n.WITHDRAWAL.NOBINDPHONETIP, () => {
                dispatch('openBindPhone');
            }, i18n.WITHDRAWAL.GOTOBINDPHONE)
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
            PanelHelp.showTip(i18n.USERINFO.ENTERNAME_ERROR);
            return;
        }
        this.nameEditBox.enabled = false;
        let req = protoPackage.hall.UpdateNickname.create({ userId: User._userID, nickName: name, sign: signature });
        let buffer = protoPackage.hall.UpdateNickname.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.UPDATE_NICKNAME,
            buffer);
        this.onNameEditBtn(false);
    }

    onAddFriendBtn() {
        let data = {
            otherId: this._UserID,
        }

        let req = protoPackage.hall.AddFriendReq.create(data);
        let buffer = protoPackage.hall.AddFriendReq.encode(req).finish();

        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_AddFriend,
            buffer);
        // PanelHelp.showTip(Manager.makeLanguage("USERINFO.ADDFRIEND"));

    }

    getMeHeadIndex() {
        let isNetWorkHead = (User._headImgUrl && User._headImgUrl.indexOf("base") == -1)
        let headIndex = 0
        if (!isNetWorkHead) {
            if (User._headImgUrl) {
                let arr = User._headImgUrl.split("_")
                headIndex = parseInt(arr[arr.length - 1])
            } else {
                headIndex = UtilMgr.getLocalHeadIndex(User._userID)
            }
        }
        return headIndex
    }

    onShowHeadPanel(show) {
        if (show) {
            let meHeadIndex = this.getMeHeadIndex()
            this.selectHeadIndex = meHeadIndex;
            this.headPanel.active = true
            this.headItmes.forEach((element) => {
                let select = element.getChildByName("select");
                let headIndex = parseInt(element.name)
                select.active = headIndex == meHeadIndex;
            });

        } else {
            this.selectHeadIndex = 0;
            this.headPanel.active = false
        }
    }

    onChangeHead() {
        if (this.selectHeadIndex > 0) {
            let headName = "base_" + this.selectHeadIndex + ".png"
            if (User._headImgUrl == headName) {
                this.onShowHeadPanel(false)

                return
            }
            let req = protoPackage.hall.base.UpdateHeadImgReq.create({ userId: User._userID, imgName: headName });
            let buffer = protoPackage.hall.base.UpdateHeadImgReq.encode(req).finish();
            this.service.sendMsg(serverType.Lobby,
                protoPackage.hall.HallCmd.UPDATE_HEAD_IMG,
                buffer);
        }
    }

    onCopyIDBtn() {
        window['platformUtil'].copyToClip(this.userId.string);
    }

    reqUserInfo() {
        let req = protoPackage.hall.UserInformation.create({ userId: this._UserID });
        let buffer = protoPackage.hall.UserInformation.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.USER_INFORMATION,
            buffer);
    }
    findUser() {
        FriendData.getInstance().isUserInfoSendFind = true;
        let req = protoPackage.hall.FindUserReq.create({ otherId: this._UserID });
        let buffer = protoPackage.hall.FindUserReq.encode(req).finish();
        this.service.sendMsg(serverType.Lobby,
            protoPackage.hall.HallCmd.CMD_FindUser,
            buffer);
    }
    onNetFindUserRes(data): void {
        G.Logger.log("finduser", data);
        if (data.statusMsg.status == 0) {
            let state = 0;
            if (data.friend) {
                state = data.friend.state;
                this._UserID = data.friend.friendId;
            }
            let isMe = this._UserID == User._userID;
            let isFriend: boolean = state == 1;
            G.Logger.log("判断玩家是否是好友", isFriend);
            this.addFriendTip.node.active = !isMe && isFriend;
            this.addFriendBtn.active = !isMe && !isFriend;
            this.addFriendTip.language = Manager.makeLanguage("FRIEND.HAVE_BECOME_FRIEND");
        } else {
            PanelHelp.showTip(Manager.makeLanguage("ERRORCODE." + data.statusMsg.status));
        }
    }

    start() {
        this.changeLanguage();
        this.reqUserInfo()
        if (FriendData.getInstance().isOpenFriend) this.findUser();
        let isMe = this._UserID == User._userID;
        let isHallView = Manager.uiManager.isInCurrentGame('HallView') && !Manager.uiManager.isInCurrentGame("LeaderBoardView")
        //点击大厅头像展示的
        this.changeHead.active = isHallView && isMe;
        this.namebg.active = isHallView && isMe;
        this.modifyBtn.active = isHallView && isMe;
        this.areaNode.active = isHallView && isMe;
        this.phoneNode.active = isHallView && isMe;
        this.bankNode.active = isHallView && isMe;

        this.payNode.active = isHallView && isMe && (!User.isRechargedPlayer ? (() => {
            let obj = HallConfig.hallIconConfig && HallConfig.hallIconConfig.find(function (obj) {
                return obj.key == "goldBankCardBindStatus"
            })
            return obj && obj.value > 0
        })() : true);
        //点击其他地方头像展示
        this.copyBtn.active = !isHallView && !isMe;
        this.nickName.node.active = isHallView && isMe ? false : true;

        this.phone.string = i18n.USERINFO.UNBOUND;
        this.area.string = i18n.USERINFO.UNBOUND;
        this.nickName.string = UtilMgr.setString(User._userName);
        this.area.horizontalAlign = isMe ? cc.Label.HorizontalAlign.CENTER : cc.Label.HorizontalAlign.LEFT;
        if (!isMe) return;
        this.signatureLabel.string = User._signature.length ? User._signature : "You haven't said anything yet";
        this.nickNameEditBox.string = this.nickName.string = this.nameEditBox.string = UtilMgr.setString(User._userName);
        this.userId.string = User._userID || ''
        this.gold.string = UtilMgr.changeMoney(User._gold)
        this.bank.string = UtilMgr.changeMoney(User._bank)

        UtilMgr.loadHeadImg(this.head, User._headImgUrl, User._userID, this)
        this.headPanel.active = false;

        if (User._phone) {
            let bankIndex = Manager.localStorage.getItem("selectBankIndex")
            if (User._bankList.length > 0) {
                if (bankIndex != null && bankIndex >= 0) this.pay.string = UtilMgr.setBankCardStringCover(User._bankList[bankIndex])
                else this.pay.string = UtilMgr.setBankCardStringCover(User._bankList[0])
            } else {
                this.pay.string = i18n.USERINFO.UNBOUND
            }
        } else {
            this.pay.string = i18n.USERINFO.NOBINDPHONE
        }
    }

    onClickCheck() {
        if (this.scrollView.node.active) {
            cc.tween(this.scrollView.node)
                .set({ scaleY: 1 })
                .to(0.1, { scaleY: 0 })
                .call(() => {
                    this.scrollView.node.active = false
                })
                .start()
        } else {
            this.scrollView.node.active = true
            cc.tween(this.scrollView.node)
                .set({ scaleY: 0 })
                .to(0.1, { scaleY: 1 })
                .start()
        }
    }
    onDisable() {
        super.onDestroy()
        //处理头像黑板
        FriendData.getInstance().isUserInfoSendFind = false;
    }

    changeLanguage() {
        if (this.changeNamePanel) {
            this.find('content/nickName', this.changeNamePanel).getComponent(cc.Label).language = Manager.makeLanguage("USERINFO.NICKNAME");
            this.find('content/signature', this.changeNamePanel).getComponent(cc.Label).language = Manager.makeLanguage("USERINFO.SIGNATURE");
        }
    }
    // update (dt) {}
}
