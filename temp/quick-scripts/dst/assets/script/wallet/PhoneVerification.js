
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wallet/PhoneVerification.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5b62be1xVVMz76HML7dzjeM', 'PhoneVerification');
// script/wallet/PhoneVerification.ts

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
const LobbyService_1 = require("../common/net/LobbyService");
const Decorators_1 = require("../framework/decorator/Decorators");
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let PhoneVerification = class PhoneVerification extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.showPhoneNode = null;
        this.editPhoneNode = null;
    }
    static getPrefabUrl() {
        return "wallet/prefabes/PhoneVerification";
    }
    onLoad() {
        super.onLoad();
        // this.audioHelper.playMusic("common/audio/login_bgm", BUNDLE_RESOURCES);
    }
    bindingEvents() {
        super.bindingEvents();
    }
    start() {
    }
    onClick(name, node) {
        switch (name) {
            case 'btnClose':
                this.close();
                break;
            case 'btnReset':
                break;
            case 'btnConfirmation':
                this.confirmationHandler();
                break;
        }
    }
    confirmationHandler() {
        this.close();
    }
    onDestroy() {
        super.onDestroy();
    }
};
__decorate([
    property(cc.Node)
], PhoneVerification.prototype, "showPhoneNode", void 0);
__decorate([
    property(cc.Node)
], PhoneVerification.prototype, "editPhoneNode", void 0);
PhoneVerification = __decorate([
    ccclass,
    Decorators_1.injectService(LobbyService_1.LobbyService.instance)
], PhoneVerification);
exports.default = PhoneVerification;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FsbGV0L1Bob25lVmVyaWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsNkRBQTBEO0FBRzFELGtFQUEyRTtBQUczRSxvRUFBNEM7QUFZNUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLGlCQUFpQixHQUF0QyxNQUFxQixpQkFBa0IsU0FBUSxnQkFBTTtJQUFyRDs7UUFHSSxrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixrQkFBYSxHQUFZLElBQUksQ0FBQztJQTBDbEMsQ0FBQztJQXhDVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLG1DQUFtQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsMEVBQTBFO0lBQzlFLENBQUM7SUFDRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBRTFCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUNkLFFBQVEsSUFBSSxFQUFFO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUVYLE1BQU07WUFDVixLQUFLLGlCQUFpQjtnQkFDbEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzNCLE1BQU07U0FDYjtJQUVMLENBQUM7SUFFRCxtQkFBbUI7UUFDZixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVM7UUFDTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEIsQ0FBQztDQUVKLENBQUE7QUE1Q0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDWTtBQUU5QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNZO0FBTGIsaUJBQWlCO0lBRnJDLE9BQU87SUFDUCwwQkFBYSxDQUFDLDJCQUFZLENBQUMsUUFBUSxDQUFDO0dBQ2hCLGlCQUFpQixDQStDckM7a0JBL0NvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9iYXNlL0hvdFVwZGF0ZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi9jb25maWcvQ29uZmlnXCI7XG5pbXBvcnQgeyBkaXNwYXRjaEVudGVyQ29tcGxldGUsIExvZ2ljRXZlbnQsIExvZ2ljVHlwZSB9IGZyb20gXCIuLi9jb21tb24vZXZlbnQvTG9naWNFdmVudFwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBnYW1lTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9jb21tb24vbWFuYWdlci9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBDb21tb25NZXNzYWdlLCBwcm90b1BhY2thZ2UsIHNlcnZlclR5cGUgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Db21tb25TZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2JieVNlcnZpY2UgfSBmcm9tIFwiLi4vY29tbW9uL25ldC9Mb2JieVNlcnZpY2VcIjtcbmltcG9ydCB7IEJVTkRMRV9SRVNPVVJDRVMgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2Jhc2UvRGVmaW5lc1wiO1xuaW1wb3J0IHsgSUNvbnRyb2xsZXIgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5qZWN0U2VydmljZSwgbWFrZUtleSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvZGVjb3JhdG9yL0RlY29yYXRvcnNcIjtcbmltcG9ydCB7IEV2ZW50QXBpIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9ldmVudC9FdmVudEFwaVwiO1xuaW1wb3J0IHsgSHR0cEVycm9yVHlwZSwgUmVxdWVzdFBhY2tnZSB9IGZyb20gXCIuLi9mcmFtZXdvcmsvbmV0L0h0dHBDbGllbnRcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vZ2xvYmFsL1VzZXJcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcbmltcG9ydCB7IFNoYXJlVHJhY2VIZWxwZGVyIH0gZnJvbSBcIi4uL0hlbHBkZXIvc2hhcmVUcmFjZS9TaGFyZVRyYWNlSGVscGRlclwiO1xuaW1wb3J0IExhbmd1YWdlQ2hhbmdlIGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VDaGFuZ2VcIjtcbmltcG9ydCBTZXJ2aWNlVmlldyBmcm9tIFwiLi4vc2VydmljZS9TZXJ2aWNlVmlld1wiO1xuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9iYXNlL1VJTWFuYWdlclwiO1xuaW1wb3J0IEFrdW5WaWV3IGZyb20gXCIuLi9ha3VuL0FrdW5WaWV3XCI7XG5pbXBvcnQgSGFsbE5ld1ZpZXcgZnJvbSBcIi4uL2hhbGwvSGFsbE5ld1ZpZXdcIjtcbmltcG9ydCBMb2dpbk5ld1ZpZXcgZnJvbSBcIi4uL2xvZ2luL0xvZ2luTmV3Vmlld1wiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuQGluamVjdFNlcnZpY2UoTG9iYnlTZXJ2aWNlLmluc3RhbmNlKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvbmVWZXJpZmljYXRpb24gZXh0ZW5kcyBVSVZpZXcgaW1wbGVtZW50cyBJQ29udHJvbGxlcjxMb2JieVNlcnZpY2U+IHtcbiAgICBzZXJ2aWNlOiBMb2JieVNlcnZpY2U7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2hvd1Bob25lTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZWRpdFBob25lTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwid2FsbGV0L3ByZWZhYmVzL1Bob25lVmVyaWZpY2F0aW9uXCI7XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgLy8gdGhpcy5hdWRpb0hlbHBlci5wbGF5TXVzaWMoXCJjb21tb24vYXVkaW8vbG9naW5fYmdtXCIsIEJVTkRMRV9SRVNPVVJDRVMpO1xuICAgIH1cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG5cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIG9uQ2xpY2sobmFtZSwgbm9kZSkge1xuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNsb3NlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdidG5SZXNldCc6XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2J0bkNvbmZpcm1hdGlvbic6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb25IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNvbmZpcm1hdGlvbkhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xuICAgIH1cblxufVxuIl19