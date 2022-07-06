
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/withdrawal/SecondaryPwdView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9df5bGqXglA7q0nkeyG6ovu', 'SecondaryPwdView');
// script/withdrawal/SecondaryPwdView.ts

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
exports.CheckSecondaryPwdType = void 0;
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const CommonService_1 = require("../common/net/CommonService");
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const SetSecondaryPwdView_1 = require("./SetSecondaryPwdView");
const { ccclass, property } = cc._decorator;
var CheckSecondaryPwdType;
(function (CheckSecondaryPwdType) {
    CheckSecondaryPwdType[CheckSecondaryPwdType["getPwq"] = 0] = "getPwq";
    CheckSecondaryPwdType[CheckSecondaryPwdType["checkSuccCall"] = 1] = "checkSuccCall"; //验证成功后回调
})(CheckSecondaryPwdType = exports.CheckSecondaryPwdType || (exports.CheckSecondaryPwdType = {}));
let SecondaryPwdView = class SecondaryPwdView extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.service = null;
        this.pwdEditbox = null;
    }
    static getPrefabUrl() {
        return "withdrawal/prefabs/SecondaryPwdView";
    }
    onLoad() {
        super.onLoad();
        this.content = this.node.getChildByName('content');
        this.initLanguage();
    }
    bindingEvents() {
        super.bindingEvents();
        this.registerEvent(Decorators_1.makeKey(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD), this.toCheckPwdRes);
    }
    //args= [ [CheckPwdType,callfun] ]
    show(args) {
        super.show(args[0]);
        this.showWithAction(true);
    }
    initLanguage() {
        this.pwdEditbox.placeholder = LanguageImpl_1.i18n.ACCOUNT_LOGIN.PALCE_HOLDER.PASSWORD;
    }
    onClick(name) {
        switch (name) {
            case "close":
                this.closeWithAction();
                break;
            case "FoegetPassword":
                dispatch('openSetSecondaryPwdView', SetSecondaryPwdView_1.SettSecondaryPwdType.reset);
                break;
            case "confirm":
                this.toCheckPwd();
                break;
        }
    }
    toCheckPwd() {
        let passwd = this.checkPwd();
        if (!passwd)
            return;
        switch (this.args[0]) {
            case CheckSecondaryPwdType.getPwq:
                this.args[1] && this.args[1](passwd);
                this.close();
                break;
            case CheckSecondaryPwdType.checkSuccCall:
                this.toCheckReq(passwd);
                break;
        }
    }
    toCheckReq(passwd) {
        let req = CommonService_1.protoPackage.hall.CheckSecondPasswdReq.create({ passwd: passwd });
        let buffer = CommonService_1.protoPackage.hall.CheckSecondPasswdReq.encode(req).finish();
        this.service.sendMsg(CommonService_1.serverType.Lobby, CommonService_1.protoPackage.hall.HallCmd.CMD_CHECK_SECOND_PASSWD, buffer);
    }
    checkPwd() {
        let passwd = this.pwdEditbox.string;
        if (passwd == '') {
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.ACCOUNT_LOGIN.ERROR.EMPTY_PWD);
            return "";
        }
        return passwd;
    }
    toCheckPwdRes(data) {
        if (data.statusMsg.status == 0) {
            this.close();
            this.args[1] && this.args[1]();
        }
        else {
            PanelHelp_1.default.showMsgBox('', LanguageImpl_1.i18n.ERRORCODE[data.statusMsg.status]);
        }
    }
};
__decorate([
    property(cc.EditBox)
], SecondaryPwdView.prototype, "pwdEditbox", void 0);
SecondaryPwdView = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], SecondaryPwdView);
exports.default = SecondaryPwdView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2l0aGRyYXdhbC9TZWNvbmRhcnlQd2RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUE0QztBQUM1QyxrRUFBdUQ7QUFDdkQsb0VBQTRDO0FBQzVDLCtEQUF1RTtBQUN2RSw2REFBMEQ7QUFDMUQsa0VBQTJFO0FBRzNFLCtEQUE2RDtBQUM3RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMsSUFBWSxxQkFHWDtBQUhELFdBQVkscUJBQXFCO0lBQzdCLHFFQUFNLENBQUE7SUFDTixtRkFBYSxDQUFBLENBQUEsU0FBUztBQUMxQixDQUFDLEVBSFcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFHaEM7QUFJRCxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsZ0JBQU07SUFBcEQ7O1FBQ0ksWUFBTyxHQUFpQixJQUFJLENBQUM7UUFLN0IsZUFBVSxHQUFlLElBQUksQ0FBQztJQStFbEMsQ0FBQztJQTVFVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLHFDQUFxQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFDdkIsQ0FBQztJQUNELGFBQWE7UUFDVCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBTyxDQUFDLDBCQUFVLENBQUMsS0FBSyxFQUFFLDRCQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FB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QUMsT0FBTyxDQUFDO29EQUNTO0FBTmIsZ0JBQWdCO0lBRnBDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGdCQUFnQixDQXFGcEM7a0JBckZvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vY29tbW9uL2xhbmd1YWdlL0xhbmd1YWdlSW1wbFwiO1xuaW1wb3J0IFBhbmVsSGVscCBmcm9tIFwiLi4vbXNnYm94L1BhbmVsSGVscFwiO1xuaW1wb3J0IHsgcHJvdG9QYWNrYWdlLCBzZXJ2ZXJUeXBlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvQ29tbW9uU2VydmljZVwiO1xuaW1wb3J0IHsgTG9iYnlTZXJ2aWNlIH0gZnJvbSBcIi4uL2NvbW1vbi9uZXQvTG9iYnlTZXJ2aWNlXCI7XG5pbXBvcnQgeyBpbmplY3RTZXJ2aWNlLCBtYWtlS2V5IH0gZnJvbSBcIi4uL2ZyYW1ld29yay9kZWNvcmF0b3IvRGVjb3JhdG9yc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9nbG9iYWwvVXNlclwiO1xuaW1wb3J0IHsgU2V0dFNlY29uZGFyeVB3ZFR5cGUgfSBmcm9tIFwiLi9TZXRTZWNvbmRhcnlQd2RWaWV3XCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZW51bSBDaGVja1NlY29uZGFyeVB3ZFR5cGUge1xuICAgIGdldFB3cSwvL+iOt+WPluS6jOe6p+WvhueggVxuICAgIGNoZWNrU3VjY0NhbGwvL+mqjOivgeaIkOWKn+WQjuWbnuiwg1xufVxuXG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Vjb25kYXJ5UHdkVmlldyBleHRlbmRzIFVJVmlldyBpbXBsZW1lbnRzIElDb250cm9sbGVyPExvYmJ5U2VydmljZT57XG4gICAgc2VydmljZTogTG9iYnlTZXJ2aWNlID0gbnVsbDtcblxuXG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwd2RFZGl0Ym94OiBjYy5FZGl0Qm94ID0gbnVsbDtcblxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcIndpdGhkcmF3YWwvcHJlZmFicy9TZWNvbmRhcnlQd2RWaWV3XCI7XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpXG4gICAgICAgIHRoaXMuaW5pdExhbmd1YWdlKClcbiAgICB9XG4gICAgYmluZGluZ0V2ZW50cygpIHtcbiAgICAgICAgc3VwZXIuYmluZGluZ0V2ZW50cygpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQobWFrZUtleShzZXJ2ZXJUeXBlLkxvYmJ5LCBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DSEVDS19TRUNPTkRfUEFTU1dEKSwgdGhpcy50b0NoZWNrUHdkUmVzKTtcbiAgICB9XG4gICAgLy9hcmdzPSBbIFtDaGVja1B3ZFR5cGUsY2FsbGZ1bl0gXVxuICAgIHNob3coYXJncykge1xuICAgICAgICBzdXBlci5zaG93KGFyZ3NbMF0pXG4gICAgICAgIHRoaXMuc2hvd1dpdGhBY3Rpb24odHJ1ZSlcbiAgICB9XG4gICAgaW5pdExhbmd1YWdlKCkge1xuICAgICAgICB0aGlzLnB3ZEVkaXRib3gucGxhY2Vob2xkZXIgPSBpMThuLkFDQ09VTlRfTE9HSU4uUEFMQ0VfSE9MREVSLlBBU1NXT1JEO1xuICAgIH1cbiAgICBvbkNsaWNrKG5hbWUpIHtcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY2xvc2VcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlV2l0aEFjdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkZvZWdldFBhc3N3b3JkXCI6XG4gICAgICAgICAgICAgICAgZGlzcGF0Y2goJ29wZW5TZXRTZWNvbmRhcnlQd2RWaWV3JywgU2V0dFNlY29uZGFyeVB3ZFR5cGUucmVzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImNvbmZpcm1cIjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvQ2hlY2tQd2QoKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdG9DaGVja1B3ZCgpIHtcbiAgICAgICAgbGV0IHBhc3N3ZCA9IHRoaXMuY2hlY2tQd2QoKTtcbiAgICAgICAgaWYgKCFwYXNzd2QpIHJldHVybjtcbiAgICAgICAgc3dpdGNoICh0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgQ2hlY2tTZWNvbmRhcnlQd2RUeXBlLmdldFB3cTpcbiAgICAgICAgICAgICAgICB0aGlzLmFyZ3NbMV0gJiYgdGhpcy5hcmdzWzFdKHBhc3N3ZClcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ2hlY2tTZWNvbmRhcnlQd2RUeXBlLmNoZWNrU3VjY0NhbGw6XG4gICAgICAgICAgICAgICAgdGhpcy50b0NoZWNrUmVxKHBhc3N3ZCk7XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICB9XG5cblxuXG5cbiAgICB9XG4gICAgdG9DaGVja1JlcShwYXNzd2QpIHtcbiAgICAgICAgbGV0IHJlcSA9IHByb3RvUGFja2FnZS5oYWxsLkNoZWNrU2Vjb25kUGFzc3dkUmVxLmNyZWF0ZSh7IHBhc3N3ZDogcGFzc3dkIH0pO1xuICAgICAgICBsZXQgYnVmZmVyID0gcHJvdG9QYWNrYWdlLmhhbGwuQ2hlY2tTZWNvbmRQYXNzd2RSZXEuZW5jb2RlKHJlcSkuZmluaXNoKCk7XG4gICAgICAgIHRoaXMuc2VydmljZS5zZW5kTXNnKHNlcnZlclR5cGUuTG9iYnksXG4gICAgICAgICAgICBwcm90b1BhY2thZ2UuaGFsbC5IYWxsQ21kLkNNRF9DSEVDS19TRUNPTkRfUEFTU1dELFxuICAgICAgICAgICAgYnVmZmVyKTtcbiAgICB9XG4gICAgY2hlY2tQd2QoKSB7XG4gICAgICAgIGxldCBwYXNzd2QgPSB0aGlzLnB3ZEVkaXRib3guc3RyaW5nO1xuICAgICAgICBpZiAocGFzc3dkID09ICcnKSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLkFDQ09VTlRfTE9HSU4uRVJST1IuRU1QVFlfUFdEKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFzc3dkXG4gICAgfVxuICAgIHRvQ2hlY2tQd2RSZXMoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXNNc2cuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKVxuICAgICAgICAgICAgdGhpcy5hcmdzWzFdICYmIHRoaXMuYXJnc1sxXSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd01zZ0JveCgnJywgaTE4bi5FUlJPUkNPREVbZGF0YS5zdGF0dXNNc2cuc3RhdHVzXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==