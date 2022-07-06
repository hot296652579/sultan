
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PBPasswdComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ccf96oXbshAQL+mOqY8Gh8W', 'PBPasswdComponent');
// script/piggyBank/PBPasswdComponent.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const PanelHelp_1 = __importDefault(require("../msgbox/PanelHelp"));
const { ccclass, property } = cc._decorator;
// 密码字符
const PASSWORD_CHAR = "●";
let NewClass = class NewClass extends cc.Component {
    constructor() {
        super(...arguments);
        this.editBox = null;
        this.m_realContent = "";
        // update (dt) {}
    }
    onLoad() {
        this.register();
    }
    start() {
    }
    get string() {
        return this.m_realContent;
    }
    register() {
        this.editBox.node.on("editing-did-began", this.onDidBegan, this);
        this.editBox.node.on("editing-did-ended", this.onDidEnded, this);
        this.editBox.node.on("editing-return", this.onDidEnded, this);
        this.editBox.node.on("text-changed", this.onTextChanged, this);
    }
    onDidBegan(target) {
        this.editBox.string = this.m_realContent;
    }
    onDidEnded(target) {
        if (this.m_realContent.length <= 0) {
            return;
        }
        let reg = new RegExp(/^\d{1,}$/g);
        if (!reg.test(this.m_realContent)) {
            this.m_realContent = "";
            this.editBox.string = this.m_realContent;
            PanelHelp_1.default.showTip(LanguageImpl_1.i18n.PIGGY_BANK.MUST_6_DIGITS);
            return;
        }
        this.editBox.string = this.m_realContent.replace(/./g, () => {
            return PASSWORD_CHAR;
        });
    }
    onTextChanged(content) {
        this.m_realContent = content.string;
    }
};
__decorate([
    property(cc.EditBox)
], NewClass.prototype, "editBox", void 0);
NewClass = __decorate([
    ccclass
], NewClass);
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BCUGFzc3dkQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7QUFFbEYsa0VBQXVEO0FBQ3ZELG9FQUE0QztBQUU1QyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMsT0FBTztBQUNQLE1BQU0sYUFBYSxHQUFXLEdBQUcsQ0FBQztBQUdsQyxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxFQUFFLENBQUMsU0FBUztJQUFsRDs7UUFHSSxZQUFPLEdBQWUsSUFBSSxDQUFDO1FBRW5CLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBK0NuQyxpQkFBaUI7SUFDckIsQ0FBQztJQTlDRyxNQUFNO1FBQ0YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLO0lBRUwsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRU8sUUFBUTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU8sVUFBVSxDQUFDLE1BQWtCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQztJQUVPLFVBQVUsQ0FBQyxNQUFrQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNoQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLEdBQUcsR0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN6QyxtQkFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ3hELE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGFBQWEsQ0FBQyxPQUFtQjtRQUNyQyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDeEMsQ0FBQztDQUdKLENBQUE7QUFsREc7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzt5Q0FDTTtBQUhWLFFBQVE7SUFENUIsT0FBTztHQUNhLFFBQVEsQ0FxRDVCO2tCQXJEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcIi4uL2NvbW1vbi9sYW5ndWFnZS9MYW5ndWFnZUltcGxcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLy8g5a+G56CB5a2X56ymXG5jb25zdCBQQVNTV09SRF9DSEFSOiBzdHJpbmcgPSBcIuKXj1wiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Q2xhc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgZWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1fcmVhbENvbnRlbnQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1fcmVhbENvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGl0Qm94Lm5vZGUub24oXCJlZGl0aW5nLWRpZC1iZWdhblwiLCB0aGlzLm9uRGlkQmVnYW4sIHRoaXMpO1xuICAgICAgICB0aGlzLmVkaXRCb3gubm9kZS5vbihcImVkaXRpbmctZGlkLWVuZGVkXCIsIHRoaXMub25EaWRFbmRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuZWRpdEJveC5ub2RlLm9uKFwiZWRpdGluZy1yZXR1cm5cIiwgdGhpcy5vbkRpZEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5lZGl0Qm94Lm5vZGUub24oXCJ0ZXh0LWNoYW5nZWRcIiwgdGhpcy5vblRleHRDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRGlkQmVnYW4odGFyZ2V0OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcmVhbENvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRpZEVuZGVkKHRhcmdldDogY2MuRWRpdEJveCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tX3JlYWxDb250ZW50Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVnOiBSZWdFeHAgPSBuZXcgUmVnRXhwKC9eXFxkezEsfSQvZyk7XG4gICAgICAgIGlmICghcmVnLnRlc3QodGhpcy5tX3JlYWxDb250ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5tX3JlYWxDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuZWRpdEJveC5zdHJpbmcgPSB0aGlzLm1fcmVhbENvbnRlbnQ7XG4gICAgICAgICAgICBQYW5lbEhlbHAuc2hvd1RpcChpMThuLlBJR0dZX0JBTksuTVVTVF82X0RJR0lUUyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkaXRCb3guc3RyaW5nID0gdGhpcy5tX3JlYWxDb250ZW50LnJlcGxhY2UoLy4vZywgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFBBU1NXT1JEX0NIQVI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25UZXh0Q2hhbmdlZChjb250ZW50OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMubV9yZWFsQ29udGVudCA9IGNvbnRlbnQuc3RyaW5nO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=