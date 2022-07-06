
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/ui/UILoadingDelegate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd1fe84twrZPRK91L4UW5/Qg', 'UILoadingDelegate');
// script/framework/ui/UILoadingDelegate.ts

"use strict";
/*
 * @Author: your name
 * @Date: 2020-04-10 12:31:02
 * @LastEditTime: 2020-04-20 16:54:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ddz\assets\framework\ui\UILoadingView.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**@description 界面加载动画，web端在下载界面时，如果超过了一定时间，需要弹出动画，告诉用户当前加载界面的进度 */
class UILoadingDelegate {
    /**
     * @description 显示全屏幕加载动画
     * @param delay 延迟显示时间 当为null时，不会显示loading进度，但会显示阻隔层 >0时为延迟显示的时间
     */
    show(delay, name) {
    }
    /**
     * @description 更新进度，0-100
     * @param progress 0-100
     */
    updateProgress(progress) {
    }
    hide() {
    }
}
exports.default = UILoadingDelegate;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL3VpL1VJTG9hZGluZ0RlbGVnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HOztBQUVGLG1FQUFtRTtBQUNwRSxNQUFxQixpQkFBaUI7SUFFbEM7OztPQUdHO0lBQ0ksSUFBSSxDQUFFLEtBQWMsRUFBRyxJQUFhO0lBRTNDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxjQUFjLENBQUUsUUFBaUI7SUFFeEMsQ0FBQztJQUVNLElBQUk7SUFFWCxDQUFDO0NBQ0o7QUFyQkQsb0NBcUJDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBBdXRob3I6IHlvdXIgbmFtZVxuICogQERhdGU6IDIwMjAtMDQtMTAgMTI6MzE6MDJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjAtMDQtMjAgMTY6NTQ6MjBcbiAqIEBMYXN0RWRpdG9yczogUGxlYXNlIHNldCBMYXN0RWRpdG9yc1xuICogQERlc2NyaXB0aW9uOiBJbiBVc2VyIFNldHRpbmdzIEVkaXRcbiAqIEBGaWxlUGF0aDogXFxkZHpcXGFzc2V0c1xcZnJhbWV3b3JrXFx1aVxcVUlMb2FkaW5nVmlldy50c1xuICovXG5cbiAvKipAZGVzY3JpcHRpb24g55WM6Z2i5Yqg6L295Yqo55S777yMd2Vi56uv5Zyo5LiL6L2955WM6Z2i5pe277yM5aaC5p6c6LaF6L+H5LqG5LiA5a6a5pe26Ze077yM6ZyA6KaB5by55Ye65Yqo55S777yM5ZGK6K+J55So5oi35b2T5YmN5Yqg6L2955WM6Z2i55qE6L+b5bqmICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUxvYWRpbmdEZWxlZ2F0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24g5pi+56S65YWo5bGP5bmV5Yqg6L295Yqo55S7XG4gICAgICogQHBhcmFtIGRlbGF5IOW7tui/n+aYvuekuuaXtumXtCDlvZPkuLpudWxs5pe277yM5LiN5Lya5pi+56S6bG9hZGluZ+i/m+W6pu+8jOS9huS8muaYvuekuumYu+malOWxgiA+MOaXtuS4uuW7tui/n+aYvuekuueahOaXtumXtFxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KCBkZWxheSA6IG51bWJlciAsIG5hbWUgOiBzdHJpbmcpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOabtOaWsOi/m+W6pu+8jDAtMTAwXG4gICAgICogQHBhcmFtIHByb2dyZXNzIDAtMTAwXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVByb2dyZXNzKCBwcm9ncmVzcyA6IG51bWJlciApe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZSggKSB7XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==