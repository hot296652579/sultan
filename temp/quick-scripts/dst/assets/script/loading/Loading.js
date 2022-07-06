
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/loading/Loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0bfc0+1NYVIFZzN7U4JqAro', 'Loading');
// script/loading/Loading.ts

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
let Loading = class Loading extends UIView_1.default {
    constructor() {
        super(...arguments);
        this.label = null;
        // update (dt) {}
    }
    static getPrefabUrl() {
        return "common/prefabs/Loading";
    }
    onLoad() {
        super.onLoad();
        // this.progressbar.node.active = false;
    }
    bindingEvents() {
        super.bindingEvents();
        // this.registerEvent(HallEvent.DOWNLOAD_PROGRESS, this.onDownloadProgess);
        if (cc.sys.isBrowser) {
            // this.registerEvent("loadGameProgress", (progress) => {
            //     this.progressbar.node.active = true;
            //     if ((progress / 100) >= this.progressbar.progress) {
            //         this.progressbar.progress = progress / 100;
            //         this.progressbarLabel.string = progress + "%";
            //     }
            // });
        }
    }
    show(args) {
        super.show(args);
        // this.progressbarNode.active = false;
        // this.progressbar.node.active = false;
        // this.progressbar.progress = 0;
        // this.progressbarLabel.string = "";
        if (this.args[0]) {
            this.label.language = this.args[0];
        }
        if (this.outTimeCall) {
            clearTimeout(this.outTimeCall);
        }
        this.outTimeCall = setTimeout(() => {
            this.close();
            dispatch("serverOutTime");
        }, this.args[1]);
        if (this.args[2] && cc.sys.isBrowser) {
            // this.progressbarNode.active = true;
            // this.progressbarNode.y = 0;
            // if (!Manager.uiManager.isInCurrentGame("HallView")) {
            //     this.progressbarNode.y = -50;
            // }
        }
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
    onDestroy() {
        super.onDestroy();
        if (this.outTimeCall) {
            clearTimeout(this.outTimeCall);
        }
    }
};
__decorate([
    property(cc.Label)
], Loading.prototype, "label", void 0);
Loading = __decorate([
    ccclass
], Loading);
exports.default = Loading;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9hZGluZy9Mb2FkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0VBQTRDO0FBSTVDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztBQUc1QyxJQUFxQixPQUFPLEdBQTVCLE1BQXFCLE9BQVEsU0FBUSxnQkFBTTtJQUEzQzs7UUFHSSxVQUFLLEdBQWEsSUFBSSxDQUFDO1FBdUZ2QixpQkFBaUI7SUFDckIsQ0FBQztJQXhFVSxNQUFNLENBQUMsWUFBWTtRQUN0QixPQUFPLHdCQUF3QixDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNO1FBQ0YsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2Ysd0NBQXdDO0lBRTVDLENBQUM7SUFDRCxhQUFhO1FBQ1QsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLDJFQUEyRTtRQUMzRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ2xCLHlEQUF5RDtZQUN6RCwyQ0FBMkM7WUFDM0MsMkRBQTJEO1lBQzNELHNEQUFzRDtZQUN0RCx5REFBeUQ7WUFDekQsUUFBUTtZQUNSLE1BQU07U0FDVDtJQUVMLENBQUM7SUFDRCxJQUFJLENBQUMsSUFBSTtRQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEIsdUNBQXVDO1FBQ3ZDLHdDQUF3QztRQUN4QyxpQ0FBaUM7UUFDakMscUNBQXFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUVoQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDbEMsc0NBQXNDO1lBQ3RDLDhCQUE4QjtZQUM5Qix3REFBd0Q7WUFDeEQsb0NBQW9DO1lBQ3BDLElBQUk7U0FDUDtJQUVMLENBQUM7SUFFRCxLQUFLO1FBQ0QsMEJBQTBCO1FBQzFCLGlEQUFpRDtRQUNqRCxnQkFBZ0I7UUFDaEIsV0FBVztRQUVYLDJCQUEyQjtRQUMzQixpREFBaUQ7UUFDakQsd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZixXQUFXO0lBRWYsQ0FBQztJQUNELFNBQVM7UUFDTCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0NBR0osQ0FBQTtBQXhGRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NDQUNJO0FBSE4sT0FBTztJQUQzQixPQUFPO0dBQ2EsT0FBTyxDQTJGM0I7a0JBM0ZvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvbW1vbi9tYW5hZ2VyL01hbmFnZXJcIjtcbmltcG9ydCBVSVZpZXcgZnJvbSBcIi4uL2ZyYW1ld29yay91aS9VSVZpZXdcIjtcbmltcG9ydCBQYW5lbEhlbHAgZnJvbSBcIi4uL21zZ2JveC9QYW5lbEhlbHBcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIFVJVmlldyB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIC8vIHByb2dyZXNzYmFyTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgLy8gcHJvZ3Jlc3NiYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICAvLyBwcm9ncmVzc2JhckxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIG91dFRpbWVDYWxsOiBOb2RlSlMuVGltZW91dDtcblxuXG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYlVybCgpIHtcbiAgICAgICAgcmV0dXJuIFwiY29tbW9uL3ByZWZhYnMvTG9hZGluZ1wiO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIC8vIHRoaXMucHJvZ3Jlc3NiYXIubm9kZS5hY3RpdmUgPSBmYWxzZTtcblxuICAgIH1cbiAgICBiaW5kaW5nRXZlbnRzKCkge1xuICAgICAgICBzdXBlci5iaW5kaW5nRXZlbnRzKCk7XG4gICAgICAgIC8vIHRoaXMucmVnaXN0ZXJFdmVudChIYWxsRXZlbnQuRE9XTkxPQURfUFJPR1JFU1MsIHRoaXMub25Eb3dubG9hZFByb2dlc3MpO1xuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgLy8gdGhpcy5yZWdpc3RlckV2ZW50KFwibG9hZEdhbWVQcm9ncmVzc1wiLCAocHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnByb2dyZXNzYmFyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgICBpZiAoKHByb2dyZXNzIC8gMTAwKSA+PSB0aGlzLnByb2dyZXNzYmFyLnByb2dyZXNzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMucHJvZ3Jlc3NiYXIucHJvZ3Jlc3MgPSBwcm9ncmVzcyAvIDEwMDtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5wcm9ncmVzc2JhckxhYmVsLnN0cmluZyA9IHByb2dyZXNzICsgXCIlXCI7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBzaG93KGFyZ3MpIHtcbiAgICAgICAgc3VwZXIuc2hvdyhhcmdzKVxuICAgICAgICAvLyB0aGlzLnByb2dyZXNzYmFyTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5wcm9ncmVzc2Jhci5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB0aGlzLnByb2dyZXNzYmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgLy8gdGhpcy5wcm9ncmVzc2JhckxhYmVsLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWwubGFuZ3VhZ2UgPSB0aGlzLmFyZ3NbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3V0VGltZUNhbGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm91dFRpbWVDYWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm91dFRpbWVDYWxsID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICBkaXNwYXRjaChcInNlcnZlck91dFRpbWVcIik7XG5cbiAgICAgICAgfSwgdGhpcy5hcmdzWzFdKVxuXG4gICAgICAgIGlmICh0aGlzLmFyZ3NbMl0gJiYgY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgLy8gdGhpcy5wcm9ncmVzc2Jhck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIHRoaXMucHJvZ3Jlc3NiYXJOb2RlLnkgPSAwO1xuICAgICAgICAgICAgLy8gaWYgKCFNYW5hZ2VyLnVpTWFuYWdlci5pc0luQ3VycmVudEdhbWUoXCJIYWxsVmlld1wiKSkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMucHJvZ3Jlc3NiYXJOb2RlLnkgPSAtNTA7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmljb25XYWl0KVxuICAgICAgICAvLyAucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KDAuMSx7YW5nbGUgOiAzMH0pXG4gICAgICAgIC8vIC5kZWxheSgwLjAxKSlcbiAgICAgICAgLy8gLnN0YXJ0KClcblxuICAgICAgICAvLyBjYy50d2Vlbih0aGlzLmp1aHVhaWNvbilcbiAgICAgICAgLy8gLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS50bygwLjMse3NjYWxlWCA6IDB9KVxuICAgICAgICAvLyAudG8oMC4zLHtzY2FsZVggOiAxfSlcbiAgICAgICAgLy8gLmRlbGF5KDAuMikpXG4gICAgICAgIC8vIC5zdGFydCgpXG5cbiAgICB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMub3V0VGltZUNhbGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm91dFRpbWVDYWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=