
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/GlobalAt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4f052qb3zVJB7pROFaM4Y9p', 'GlobalAt');
// script/GlobalAt.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataManager_1 = __importDefault(require("./common/manager/DataManager"));
const URLManager_1 = __importDefault(require("./common/manager/URLManager"));
const Logger_1 = __importDefault(require("./framework/log/Logger"));
const ShareHelpder_1 = __importDefault(require("./Helpder/ShareHelpder/ShareHelpder"));
class GlobalAt {
    constructor() {
        window.G = this;
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new GlobalAt();
        }
        return this.s_instance;
    }
    static destroy() {
        if (this.s_instance !== null) {
            this.s_instance.destroy();
        }
        this.s_instance = null;
    }
    /**
     * 日志访问器
     * @return {Logger} 日志管理器
     */
    get Logger() {
        return Logger_1.default.getInstance();
    }
    get ShareHelpder() {
        return ShareHelpder_1.default.getInstance();
    }
    get URLMgr() {
        return URLManager_1.default.getInstance();
    }
    get DataMgr() {
        return DataManager_1.default.getInstance();
    }
    destroy() {
        delete window.G;
    }
}
exports.default = GlobalAt;
GlobalAt.s_instance = new GlobalAt();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvR2xvYmFsQXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrRUFBdUQ7QUFDdkQsNkVBQXFEO0FBQ3JELG9FQUE0QztBQUM1Qyx1RkFBZ0U7QUFFaEUsTUFBcUIsUUFBUTtJQWtCekI7UUFDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBaEJNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTztRQUNqQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBTUQ7OztPQUdHO0lBQ0gsSUFBVyxNQUFNO1FBQ2IsT0FBTyxnQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDbkIsT0FBTyxzQkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQVcsT0FBTztRQUNkLE9BQU8scUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRU0sT0FBTztRQUNWLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDOztBQTVDTCwyQkE2Q0M7QUEzQ2tCLG1CQUFVLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYXRhTWFuYWdlciBmcm9tIFwiLi9jb21tb24vbWFuYWdlci9EYXRhTWFuYWdlclwiO1xuaW1wb3J0IFVSTE1hbmFnZXIgZnJvbSBcIi4vY29tbW9uL21hbmFnZXIvVVJMTWFuYWdlclwiO1xuaW1wb3J0IExvZ2dlciBmcm9tIFwiLi9mcmFtZXdvcmsvbG9nL0xvZ2dlclwiO1xuaW1wb3J0IF9TaGFyZUhlbHBkZXIgZnJvbSBcIi4vSGVscGRlci9TaGFyZUhlbHBkZXIvU2hhcmVIZWxwZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsb2JhbEF0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIHNfaW5zdGFuY2U6IEdsb2JhbEF0ID0gbmV3IEdsb2JhbEF0KCk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEdsb2JhbEF0IHtcbiAgICAgICAgaWYgKHRoaXMuc19pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zX2luc3RhbmNlID0gbmV3IEdsb2JhbEF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc19pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNfaW5zdGFuY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc19pbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zX2luc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgd2luZG93LkcgPSB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaXpeW/l+iuv+mXruWZqFxuICAgICAqIEByZXR1cm4ge0xvZ2dlcn0g5pel5b+X566h55CG5ZmoXG4gICAgICovXG4gICAgcHVibGljIGdldCBMb2dnZXIoKTogTG9nZ2VyIHtcbiAgICAgICAgcmV0dXJuIExvZ2dlci5nZXRJbnN0YW5jZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgU2hhcmVIZWxwZGVyKCk6IF9TaGFyZUhlbHBkZXIge1xuICAgICAgICByZXR1cm4gX1NoYXJlSGVscGRlci5nZXRJbnN0YW5jZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgVVJMTWdyKCk6IFVSTE1hbmFnZXIge1xuICAgICAgICByZXR1cm4gVVJMTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgRGF0YU1ncigpOiBEYXRhTWFuYWdlciB7XG4gICAgICAgIHJldHVybiBEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBkZWxldGUgd2luZG93Lkc7XG4gICAgfVxufSJdfQ==