
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/log/Logger.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4f092xQUTRC8LZPtIHwZ9sc', 'Logger');
// script/framework/log/Logger.ts

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DateUtils_1 = __importDefault(require("../extentions/DateUtils"));
class Logger {
    constructor() {
    }
    static getInstance() {
        if (this.s_instance === null) {
            this.s_instance = new Logger();
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
     * 颜色日志
     * @param title {string} 标题
     * @param content {string} 重要内容
     * @param data {...any[]} 数据
     */
    color(title, content, ...data) {
        let colorList = [
            `${title} %c ${content} %c`,
            'background: #31A43D;padding: 1px;border-radius: 2px 0 0 2px;color: #fff;',
            'background: #00FF24;padding: 1px;border-radius: 0 2px 2px 0;color: #fff;',
        ];
        data = colorList.concat(data);
        console.log.apply(console.log, data);
    }
    /**
     * 打印正常信息
     * @param data {...any[]} 多个任意数据
     */
    log(...data) {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("信息：");
        data.push(DateUtils_1.default.getMDHMS(Date.now()));
        console.log.apply(console, data);
    }
    /**
     * 打印警告信息
     * @param data {...any[]} 多个任意数据
     */
    warn(...data) {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("警告：");
        console.warn.apply(console, data);
    }
    /**
     * 打印错误信息
     * @param data {...any[]} 多个任意数据
     */
    error(...data) {
        if (!CC_DEBUG) {
            return;
        }
        data.unshift("错误：");
        console.error.apply(console, data);
    }
    /**
     * 销毁
     */
    destroy() {
    }
}
exports.default = Logger;
Logger.s_instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2xvZy9Mb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBZ0Q7QUFFaEQsTUFBcUIsTUFBTTtJQWtCdkI7SUFFQSxDQUFDO0lBaEJNLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTztRQUNqQixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBTUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxHQUFHLElBQVc7UUFDdkQsSUFBSSxTQUFTLEdBQWE7WUFDdEIsR0FBRyxLQUFLLE9BQU8sT0FBTyxLQUFLO1lBQzNCLDBFQUEwRTtZQUMxRSwwRUFBMEU7U0FDN0UsQ0FBQztRQUNGLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdEOzs7T0FHRztJQUNJLEdBQUcsQ0FBQyxHQUFHLElBQVc7UUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBVztRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxHQUFHLElBQVc7UUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87SUFFZCxDQUFDOztBQWpGTCx5QkFtRkM7QUFqRmtCLGlCQUFVLEdBQVcsSUFBSSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGVVdGlscyBmcm9tIFwiLi4vZXh0ZW50aW9ucy9EYXRlVXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHNfaW5zdGFuY2U6IExvZ2dlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExvZ2dlciB7XG4gICAgICAgIGlmICh0aGlzLnNfaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc19pbnN0YW5jZSA9IG5ldyBMb2dnZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zX2luc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc19pbnN0YW5jZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zX2luc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNfaW5zdGFuY2UgPSBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6aKc6Imy5pel5b+XXG4gICAgICogQHBhcmFtIHRpdGxlIHtzdHJpbmd9IOagh+mimFxuICAgICAqIEBwYXJhbSBjb250ZW50IHtzdHJpbmd9IOmHjeimgeWGheWuuVxuICAgICAqIEBwYXJhbSBkYXRhIHsuLi5hbnlbXX0g5pWw5o2uXG4gICAgICovXG4gICAgcHVibGljIGNvbG9yKHRpdGxlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgLi4uZGF0YTogYW55W10pOiB2b2lkIHtcbiAgICAgICAgbGV0IGNvbG9yTGlzdDogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBgJHt0aXRsZX0gJWMgJHtjb250ZW50fSAlY2AsXG4gICAgICAgICAgICAnYmFja2dyb3VuZDogIzMxQTQzRDtwYWRkaW5nOiAxcHg7Ym9yZGVyLXJhZGl1czogMnB4IDAgMCAycHg7Y29sb3I6ICNmZmY7JyxcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kOiAjMDBGRjI0O3BhZGRpbmc6IDFweDtib3JkZXItcmFkaXVzOiAwIDJweCAycHggMDtjb2xvcjogI2ZmZjsnLFxuICAgICAgICBdO1xuICAgICAgICBkYXRhID0gY29sb3JMaXN0LmNvbmNhdChkYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZS5sb2csIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog5omT5Y2w5q2j5bi45L+h5oGvXG4gICAgICogQHBhcmFtIGRhdGEgey4uLmFueVtdfSDlpJrkuKrku7vmhI/mlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgbG9nKC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnVuc2hpZnQoXCLkv6Hmga/vvJpcIik7XG4gICAgICAgIGRhdGEucHVzaChEYXRlVXRpbHMuZ2V0TURITVMoRGF0ZS5ub3coKSkpO1xuICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPljbDorablkYrkv6Hmga9cbiAgICAgKiBAcGFyYW0gZGF0YSB7Li4uYW55W119IOWkmuS4quS7u+aEj+aVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyB3YXJuKC4uLmRhdGE6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGlmICghQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnVuc2hpZnQoXCLorablkYrvvJpcIik7XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiZPljbDplJnor6/kv6Hmga9cbiAgICAgKiBAcGFyYW0gZGF0YSB7Li4uYW55W119IOWkmuS4quS7u+aEj+aVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyBlcnJvciguLi5kYXRhOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBpZiAoIUNDX0RFQlVHKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS51bnNoaWZ0KFwi6ZSZ6K+v77yaXCIpO1xuICAgICAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmUgOavgVxuICAgICAqL1xuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuXG4gICAgfVxuXG59Il19