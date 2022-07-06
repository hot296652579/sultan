"use strict";
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