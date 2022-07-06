
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/LoginLogic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7b178KIKBdGUqrLpGFiIBz+', 'LoginLogic');
// script/login/LoginLogic.ts

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../common/base/Logic");
const LogicEvent_1 = require("../common/event/LogicEvent");
const Defines_1 = require("../framework/base/Defines");
const Manager_1 = require("../common/manager/Manager");
const LobbyService_1 = require("../common/net/LobbyService");
const Config_1 = require("../common/config/Config");
const EventApi_1 = require("../framework/event/EventApi");
const protoc_1 = require("../framework/external/protoc");
const LocalStoreageDefine = __importStar(require("../common/define/LocalStorageDefine"));
const HallData_1 = __importDefault(require("../data/HallData"));
const Language_1 = require("../framework/base/Language");
const AppData_1 = __importDefault(require("../data/AppData"));
class LoginLogic extends Logic_1.Logic {
    constructor() {
        super(...arguments);
        this.logicType = LogicEvent_1.LogicType.LOGIN;
    }
    get bundle() {
        return Defines_1.BUNDLE_RESOURCES;
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(LogicEvent_1.LogicEvent.ENTER_LOGIN, this.onEnterLogin);
        this.registerEvent(EventApi_1.EventApi.NetEvent.ON_OPEN, this.onOpen);
        this.registerEvent('updateUserInfo', this.onUpdateUserInfo);
        // this.addEvent(MST.OuterOpcode_Gate.G2C_LoginGate_Res, this.onG2C_LoginGate_Res);
    }
    onLoad() {
        this._service = LobbyService_1.LobbyService.instance;
        super.onLoad();
        //加载sdk
        // fbsdk.instance.FB_Load()
        // googlesdk.instance.Google_Load()
        Language_1.Language.Instance().change(cc.sys.LANGUAGE_HINDI);
    }
    // 系统类型 0-安卓 1-ios 2-windowsPC
    getOS() {
        switch (cc.sys.os) {
            case cc.sys.OS_ANDROID:
                return 0;
            case cc.sys.OS_IOS:
                return 1;
            default:
                return 2;
        }
    }
    onOpen() {
        // let req = MST.C2G_LoginGate_Req.create({
        //     RpcId: Manager.netManager.getNewSeqId(),
        //     MachineCode: "",
        //     OS: this.getOS(),
        //     Description: "",
        // });
        // let buffer = MST.C2G_LoginGate_Req.encode(req).finish();
        // LobbyService.instance.sendMsg(MST.C2G_LoginGate_Req, MST.OuterOpcode_Gate.C2G_LoginGate_Req, buffer);
        // // TODO 删除
        // let config = new GameConfig(Config.games["Wingo"].name, Config.games["Wingo"].subName, 0);
        // gameManager().enterGameNoUpdate(config);
        // return;
        let AuthKey = Manager_1.Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        if (AuthKey) {
            let _appData = G.DataMgr.get(AppData_1.default);
            let invcode = _appData.invcode;
            let Password = '123456';
            let ThirdId = 'test ThirdId';
            // let imei = 'test imei' + Math.floor(Math.random() * 10000 + 1)
            let imei = Manager_1.Manager.localStorage.getItem('IMEI');
            if (!imei) {
                imei = 'test imei' + Math.floor(Math.random() * 10000 + 1);
                Manager_1.Manager.localStorage.setItem('IMEI', imei);
            }
            let req = protoc_1.MST.C2M_Auth_Req.create({
                RpcId: Manager_1.Manager.netManager.getNewSeqId(),
                AuthKey,
                Password,
                AuthType: 7,
                ThirdId,
                imei,
                invcode
            });
            let buffer = protoc_1.MST.C2M_Auth_Req.encode(req).finish();
            LobbyService_1.LobbyService.instance.sendMsg(protoc_1.MST.C2M_Auth_Req, protoc_1.MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
        }
        else {
            this.removeEvent('updateUserInfo');
            dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        }
        // dispatch(LogicEvent.ENTER_HALL);
    }
    onEnterLogin() {
        G.Logger.log('==onEnterLogin==');
        LobbyService_1.LobbyService.instance.connect(Config_1.Config.WS_URL);
    }
    onG2C_LoginGate_Res(data) {
        let hallData = G.DataMgr.get(HallData_1.default);
        //假数据
        // let testRooms = [
        //     { id: '0', Name: 'Crash' },
        //     { id: '1', Name: 'Roulette' }
        // ]
        // hallData.gameList = testRooms;
        // hallData.gameList = data.Rooms;
        // let token: string = Manager.localStorage.getItem(LocalStoreageDefine.ACCOUNT_TOKEN);
        // if (token) {
        //     let AuthKey = 100000 + Math.floor(Math.random() * (999999 - 100000));
        //     let Password = '123456'
        //     let req = MST.C2M_Auth_Req.create({
        //         RpcId: Manager.netManager.getNewSeqId(),
        //         AuthKey: AuthKey.toString(),
        //         Password,
        //         AuthType: 6,
        //     });
        //     let buffer = MST.C2M_Auth_Req.encode(req).finish();
        //     LobbyService.instance.sendMsg(MST.C2M_Auth_Req, MST.OuterOpcode_Map.C2M_Auth_Req, buffer);
        // } else {
        //     dispatch(LogicEvent.ENTER_HALL);
        // }
    }
    onUpdateUserInfo() {
        dispatch(LogicEvent_1.LogicEvent.ENTER_HALL);
        this.removeEvent('updateUserInfo');
    }
}
Manager_1.Manager.logicManager.push(LoginLogic);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vTG9naW5Mb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNkM7QUFDN0MsMkRBQW1FO0FBQ25FLHVEQUE2RDtBQUM3RCx1REFBb0Q7QUFDcEQsNkRBQTBEO0FBQzFELG9EQUFpRDtBQUNqRCwwREFBdUQ7QUFDdkQseURBQW1EO0FBQ25ELHlGQUEyRTtBQUMzRSxnRUFBd0M7QUFJeEMseURBQXNEO0FBRXRELDhEQUFzQztBQUV0QyxNQUFNLFVBQVcsU0FBUSxhQUFLO0lBQTlCOztRQUVJLGNBQVMsR0FBYyxzQkFBUyxDQUFDLEtBQUssQ0FBQztJQXNIM0MsQ0FBQztJQXBIRyxJQUFJLE1BQU07UUFDTixPQUFPLDBCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVELG1GQUFtRjtJQUN2RixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsMkJBQVksQ0FBQyxRQUFRLENBQUE7UUFDckMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsT0FBTztRQUNQLDJCQUEyQjtRQUMzQixtQ0FBbUM7UUFFbkMsbUJBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0RCxDQUFD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bkQsdUNBQXVDO1FBQ3ZDLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFDdkIsVUFBVTtRQUNWLDBEQUEwRDtRQUMxRCxpR0FBaUc7UUFDakcsV0FBVztRQUNYLHVDQUF1QztRQUN2QyxJQUFJO0lBQ1IsQ0FBQztJQUVELGdCQUFnQjtRQUNaLFFBQVEsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0o7QUFFRCxpQkFBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpYyB9IGZyb20gXCIuLi9jb21tb24vYmFzZS9Mb2dpY1wiO1xuaW1wb3J0IHsgTG9naWNUeXBlLCBMb2dpY0V2ZW50IH0gZnJvbSBcIi4uL2NvbW1vbi9ldmVudC9Mb2dpY0V2ZW50XCI7XG5pbXBvcnQgeyBCVU5ETEVfUkVTT1VSQ0VTIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0RlZmluZXNcIjtcbmltcG9ydCB7IE1hbmFnZXIgfSBmcm9tIFwiLi4vY29tbW9uL21hbmFnZXIvTWFuYWdlclwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL2NvbmZpZy9Db25maWdcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgTVNUIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcbmltcG9ydCAqIGFzIExvY2FsU3RvcmVhZ2VEZWZpbmUgZnJvbSBcIi4uL2NvbW1vbi9kZWZpbmUvTG9jYWxTdG9yYWdlRGVmaW5lXCI7XG5pbXBvcnQgSGFsbERhdGEgZnJvbSBcIi4uL2RhdGEvSGFsbERhdGFcIjtcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vZGF0YS9Vc2VyRGF0YVwiO1xuaW1wb3J0IGZic2RrIGZyb20gXCIuLi9zZGsvZmJzZGtcIjtcbmltcG9ydCBnb29nbGVzZGsgZnJvbSBcIi4uL3Nkay9nb29nbGVzZGtcIjtcbmltcG9ydCB7IExhbmd1YWdlIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL0xhbmd1YWdlXCI7XG5pbXBvcnQgUGFuZWxIZWxwIGZyb20gXCIuLi9tc2dib3gvUGFuZWxIZWxwXCI7XG5pbXBvcnQgQXBwRGF0YSBmcm9tIFwiLi4vZGF0YS9BcHBEYXRhXCI7XG5cbmNsYXNzIExvZ2luTG9naWMgZXh0ZW5kcyBMb2dpYyB7XG5cbiAgICBsb2dpY1R5cGU6IExvZ2ljVHlwZSA9IExvZ2ljVHlwZS5MT0dJTjtcblxuICAgIGdldCBidW5kbGUoKSB7XG4gICAgICAgIHJldHVybiBCVU5ETEVfUkVTT1VSQ0VTO1xuICAgIH1cblxuICAgIGJpbmRpbmdFdmVudHMoKSB7XG4gICAgICAgIHN1cGVyLmJpbmRpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KExvZ2ljRXZlbnQuRU5URVJfTE9HSU4sIHRoaXMub25FbnRlckxvZ2luKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KEV2ZW50QXBpLk5ldEV2ZW50Lk9OX09QRU4sIHRoaXMub25PcGVuKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCd1cGRhdGVVc2VySW5mbycsIHRoaXMub25VcGRhdGVVc2VySW5mbyk7XG4gICAgICAgIC8vIHRoaXMuYWRkRXZlbnQoTVNULk91dGVyT3Bjb2RlX0dhdGUuRzJDX0xvZ2luR2F0ZV9SZXMsIHRoaXMub25HMkNfTG9naW5HYXRlX1Jlcyk7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlID0gTG9iYnlTZXJ2aWNlLmluc3RhbmNlXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICAvL+WKoOi9vXNka1xuICAgICAgICAvLyBmYnNkay5pbnN0YW5jZS5GQl9Mb2FkKClcbiAgICAgICAgLy8gZ29vZ2xlc2RrLmluc3RhbmNlLkdvb2dsZV9Mb2FkKClcblxuICAgICAgICBMYW5ndWFnZS5JbnN0YW5jZSgpLmNoYW5nZShjYy5zeXMuTEFOR1VBR0VfSElOREkpO1xuICAgIH1cblxuICAgIC8vIOezu+e7n+exu+WeiyAwLeWuieWNkyAxLWlvcyAyLXdpbmRvd3NQQ1xuICAgIHByaXZhdGUgZ2V0T1MoKTogbnVtYmVyIHtcbiAgICAgICAgc3dpdGNoIChjYy5zeXMub3MpIHtcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLk9TX0FORFJPSUQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5PU19JT1M6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk9wZW4oKTogdm9pZCB7XG4gICAgICAgIC8vIGxldCByZXEgPSBNU1QuQzJHX0xvZ2luR2F0ZV9SZXEuY3JlYXRlKHtcbiAgICAgICAgLy8gICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgLy8gICAgIE1hY2hpbmVDb2RlOiBcIlwiLFxuICAgICAgICAvLyAgICAgT1M6IHRoaXMuZ2V0T1MoKSxcbiAgICAgICAgLy8gICAgIERlc2NyaXB0aW9uOiBcIlwiLFxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gbGV0IGJ1ZmZlciA9IE1TVC5DMkdfTG9naW5HYXRlX1JlcS5lbmNvZGUocmVxKS5maW5pc2goKTtcbiAgICAgICAgLy8gTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyR19Mb2dpbkdhdGVfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfR2F0ZS5DMkdfTG9naW5HYXRlX1JlcSwgYnVmZmVyKTtcblxuICAgICAgICAvLyAvLyBUT0RPIOWIoOmZpFxuICAgICAgICAvLyBsZXQgY29uZmlnID0gbmV3IEdhbWVDb25maWcoQ29uZmlnLmdhbWVzW1wiV2luZ29cIl0ubmFtZSwgQ29uZmlnLmdhbWVzW1wiV2luZ29cIl0uc3ViTmFtZSwgMCk7XG4gICAgICAgIC8vIGdhbWVNYW5hZ2VyKCkuZW50ZXJHYW1lTm9VcGRhdGUoY29uZmlnKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuXG5cbiAgICAgICAgbGV0IEF1dGhLZXkgPSBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKExvY2FsU3RvcmVhZ2VEZWZpbmUuQUNDT1VOVF9UT0tFTik7XG4gICAgICAgIGlmIChBdXRoS2V5KSB7XG4gICAgICAgICAgICBsZXQgX2FwcERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEFwcERhdGEpO1xuICAgICAgICAgICAgbGV0IGludmNvZGUgPSBfYXBwRGF0YS5pbnZjb2RlO1xuICAgICAgICAgICAgbGV0IFBhc3N3b3JkID0gJzEyMzQ1NidcbiAgICAgICAgICAgIGxldCBUaGlyZElkID0gJ3Rlc3QgVGhpcmRJZCdcbiAgICAgICAgICAgIC8vIGxldCBpbWVpID0gJ3Rlc3QgaW1laScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCArIDEpXG4gICAgICAgICAgICBsZXQgaW1laSA9IE1hbmFnZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0lNRUknKTtcbiAgICAgICAgICAgIGlmICghaW1laSkge1xuICAgICAgICAgICAgICAgIGltZWkgPSAndGVzdCBpbWVpJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwICsgMSlcbiAgICAgICAgICAgICAgICBNYW5hZ2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdJTUVJJywgaW1laSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVxID0gTVNULkMyTV9BdXRoX1JlcS5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIFJwY0lkOiBNYW5hZ2VyLm5ldE1hbmFnZXIuZ2V0TmV3U2VxSWQoKSxcbiAgICAgICAgICAgICAgICBBdXRoS2V5LFxuICAgICAgICAgICAgICAgIFBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIEF1dGhUeXBlOiA3LFxuICAgICAgICAgICAgICAgIFRoaXJkSWQsXG4gICAgICAgICAgICAgICAgaW1laSxcbiAgICAgICAgICAgICAgICBpbnZjb2RlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBidWZmZXIgPSBNU1QuQzJNX0F1dGhfUmVxLmVuY29kZShyZXEpLmZpbmlzaCgpO1xuICAgICAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLnNlbmRNc2coTVNULkMyTV9BdXRoX1JlcSwgTVNULk91dGVyT3Bjb2RlX01hcC5DMk1fQXV0aF9SZXEsIGJ1ZmZlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KCd1cGRhdGVVc2VySW5mbycpO1xuICAgICAgICAgICAgZGlzcGF0Y2goTG9naWNFdmVudC5FTlRFUl9IQUxMKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0hBTEwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FbnRlckxvZ2luKCkge1xuICAgICAgICBHLkxvZ2dlci5sb2coJz09b25FbnRlckxvZ2luPT0nKTtcbiAgICAgICAgTG9iYnlTZXJ2aWNlLmluc3RhbmNlLmNvbm5lY3QoQ29uZmlnLldTX1VSTCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkcyQ19Mb2dpbkdhdGVfUmVzKGRhdGE6IE1TVC5HMkNfTG9naW5HYXRlX1Jlcyk6IHZvaWQge1xuICAgICAgICBsZXQgaGFsbERhdGEgPSBHLkRhdGFNZ3IuZ2V0KEhhbGxEYXRhKTtcbiAgICAgICAgLy/lgYfmlbDmja5cbiAgICAgICAgLy8gbGV0IHRlc3RSb29tcyA9IFtcbiAgICAgICAgLy8gICAgIHsgaWQ6ICcwJywgTmFtZTogJ0NyYXNoJyB9LFxuICAgICAgICAvLyAgICAgeyBpZDogJzEnLCBOYW1lOiAnUm91bGV0dGUnIH1cbiAgICAgICAgLy8gXVxuICAgICAgICAvLyBoYWxsRGF0YS5nYW1lTGlzdCA9IHRlc3RSb29tcztcbiAgICAgICAgLy8gaGFsbERhdGEuZ2FtZUxpc3QgPSBkYXRhLlJvb21zO1xuXG4gICAgICAgIC8vIGxldCB0b2tlbjogc3RyaW5nID0gTWFuYWdlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShMb2NhbFN0b3JlYWdlRGVmaW5lLkFDQ09VTlRfVE9LRU4pO1xuICAgICAgICAvLyBpZiAodG9rZW4pIHtcbiAgICAgICAgLy8gICAgIGxldCBBdXRoS2V5ID0gMTAwMDAwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDk5OTk5OSAtIDEwMDAwMCkpO1xuICAgICAgICAvLyAgICAgbGV0IFBhc3N3b3JkID0gJzEyMzQ1NidcbiAgICAgICAgLy8gICAgIGxldCByZXEgPSBNU1QuQzJNX0F1dGhfUmVxLmNyZWF0ZSh7XG4gICAgICAgIC8vICAgICAgICAgUnBjSWQ6IE1hbmFnZXIubmV0TWFuYWdlci5nZXROZXdTZXFJZCgpLFxuICAgICAgICAvLyAgICAgICAgIEF1dGhLZXk6IEF1dGhLZXkudG9TdHJpbmcoKSxcbiAgICAgICAgLy8gICAgICAgICBQYXNzd29yZCxcbiAgICAgICAgLy8gICAgICAgICBBdXRoVHlwZTogNixcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgICAgbGV0IGJ1ZmZlciA9IE1TVC5DMk1fQXV0aF9SZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIC8vICAgICBMb2JieVNlcnZpY2UuaW5zdGFuY2Uuc2VuZE1zZyhNU1QuQzJNX0F1dGhfUmVxLCBNU1QuT3V0ZXJPcGNvZGVfTWFwLkMyTV9BdXRoX1JlcSwgYnVmZmVyKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGRpc3BhdGNoKExvZ2ljRXZlbnQuRU5URVJfSEFMTCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZVVzZXJJbmZvKCkge1xuICAgICAgICBkaXNwYXRjaChMb2dpY0V2ZW50LkVOVEVSX0hBTEwpO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KCd1cGRhdGVVc2VySW5mbycpO1xuICAgIH1cbn1cblxuTWFuYWdlci5sb2dpY01hbmFnZXIucHVzaChMb2dpbkxvZ2ljKTsiXX0=