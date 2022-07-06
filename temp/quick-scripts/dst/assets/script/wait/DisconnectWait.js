
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/wait/DisconnectWait.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cba526R775Hsqf3v49ArlaD', 'DisconnectWait');
// script/wait/DisconnectWait.ts

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
const UIView_1 = __importDefault(require("../framework/ui/UIView"));
const { ccclass, property } = cc._decorator;
let DisconnectWait = class DisconnectWait extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "wait/prefabs/DisconnectWait";
    }
    onLoad() {
        super.onLoad();
    }
    show(args) {
        if (args[0]) {
            this.label.language = args[0];
        }
        // if (this.args[1] &&  typeof this.args[1] == 'function') {
        //     let ctr = this.node.getComponent('BaseWaitPanelEnter'); 
        //     if( !!ctr){
        //         ctr.registerTimeoutCb(this.args[1]);
        //     } 
        // }
    }
    start() {
        // cc.tween(this.iconWait)
        // .repeatForever(cc.tween().by(0.1,{angle : 30})
        // .delay(0.01))
        // .start()
        // cc.tween(this.juhuaicon)
        // .repeatForever(cc.tween().to(0.3,{scaleX : 0})
        // .to(0.3,{scaleX : 1})
        // .delay(0.2))
        // .start()
    }
};
__decorate([
    property(cc.Label)
], DisconnectWait.prototype, "label", void 0);
DisconnectWait = __decorate([
    ccclass
], DisconnectWait);
exports.default = DisconnectWait;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvd2FpdC9EaXNjb25uZWN0V2FpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE0QztBQUc1QyxNQUFNLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHMUMsSUFBcUIsY0FBYyxHQUFuQyxNQUFxQixjQUFlLFNBQVEsZ0JBQU07SUFBbEQ7O1FBR0ksVUFBSyxHQUFhLElBQUksQ0FBQztRQW9DdkIsaUJBQWlCO0lBQ3JCLENBQUM7SUFuQ1UsTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyw2QkFBNkIsQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTTtRQUNGLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUk7UUFDTCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQztRQUNELDREQUE0RDtRQUM1RCwrREFBK0Q7UUFDL0Qsa0JBQWtCO1FBQ2xCLCtDQUErQztRQUMvQyxTQUFTO1FBQ1QsSUFBSTtJQUNSLENBQUM7SUFFRCxLQUFLO1FBQ0QsMEJBQTBCO1FBQzFCLGlEQUFpRDtRQUNqRCxnQkFBZ0I7UUFDaEIsV0FBVztRQUVYLDJCQUEyQjtRQUMzQixpREFBaUQ7UUFDakQsd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZixXQUFXO0lBRWYsQ0FBQztDQUdKLENBQUE7QUFyQ0c7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDSTtBQUhOLGNBQWM7SUFEbEMsT0FBTztHQUNhLGNBQWMsQ0F3Q2xDO2tCQXhDb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2Nvbm5lY3RXYWl0IGV4dGVuZHMgVUlWaWV3IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmVmYWJVcmwoKSB7XG4gICAgICAgIHJldHVybiBcIndhaXQvcHJlZmFicy9EaXNjb25uZWN0V2FpdFwiO1xuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpOyBcbiAgICAgICAgXG4gICAgfVxuICAgIHNob3coYXJncyl7XG4gICAgICAgIGlmIChhcmdzWzBdKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsLmxhbmd1YWdlID0gYXJnc1swXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAodGhpcy5hcmdzWzFdICYmICB0eXBlb2YgdGhpcy5hcmdzWzFdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gICAgIGxldCBjdHIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdCYXNlV2FpdFBhbmVsRW50ZXInKTsgXG4gICAgICAgIC8vICAgICBpZiggISFjdHIpe1xuICAgICAgICAvLyAgICAgICAgIGN0ci5yZWdpc3RlclRpbWVvdXRDYih0aGlzLmFyZ3NbMV0pO1xuICAgICAgICAvLyAgICAgfSBcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgLy8gY2MudHdlZW4odGhpcy5pY29uV2FpdClcbiAgICAgICAgLy8gLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSgwLjEse2FuZ2xlIDogMzB9KVxuICAgICAgICAvLyAuZGVsYXkoMC4wMSkpXG4gICAgICAgIC8vIC5zdGFydCgpXG4gICAgICAgIFxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmp1aHVhaWNvbilcbiAgICAgICAgLy8gLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLjMse3NjYWxlWCA6IDB9KVxuICAgICAgICAvLyAudG8oMC4zLHtzY2FsZVggOiAxfSlcbiAgICAgICAgLy8gLmRlbGF5KDAuMikpXG4gICAgICAgIC8vIC5zdGFydCgpXG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19