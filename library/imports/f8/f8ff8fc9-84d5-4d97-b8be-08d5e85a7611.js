"use strict";
cc._RF.push(module, 'f8ff8/JhNVNl7i+CNXoWnYR', 'MyPrizeView');
// script/turntable/MyPrizeView.ts

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
const ScroViewCtrl_1 = __importDefault(require("../common/component/ScroViewCtrl"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
let MyPrizeView = class MyPrizeView extends UIView_1.default {
    static getPrefabUrl() {
        return "turntable/prefab/MyPrizeView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
    }
    start() {
        this.reqTurntableRecord();
    }
    show(args) {
        super.show(args);
        this.showWithAction(true);
        this.turnTableType = args && args[0] ? args[0] : 0;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.Turntable_Record), this.onNetTurntableRecord);
        this.registerEvent("UPDATE_PRIZE_RECORD", this.reqTurntableRecord);
    }
    onClick(name, node) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            default: G.Logger.error("no find button name -> %s", name);
        }
    }
    reqTurntableRecord() {
        G.Logger.log("请求record列表", this.turnTableType);
        let req = CommonService_1.protoPackage.hall.TurntableRecordReq.create({ type: this.turnTableType }); //转盘类型 1签到转盘 2充值转盘
        let buffer = CommonService_1.protoPackage.hall.TurntableRecordReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.Turntable_Record, buffer);
    }
    onNetTurntableRecord(data) {
        if (data.statusMsg.status == 0) {
            if (data.turntableRecords.length) {
                this.turntableRecordListView(data.turntableRecords);
            }
        }
        else {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
    turntableRecordListView(turntableRecords) {
        return __awaiter(this, void 0, void 0, function* () {
            let scroViewCtrlCom = this.getComponent(ScroViewCtrl_1.default);
            scroViewCtrlCom.dataList = turntableRecords;
            yield scroViewCtrlCom.framingLoad(turntableRecords.length, true);
            PanelHelp_1.default.hideLoading();
        });
    }
    onDestroy() {
        super.onDestroy();
    }
};
MyPrizeView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], MyPrizeView);
exports.default = MyPrizeView;

cc._RF.pop();