"use strict";
cc._RF.push(module, '3c1e2cvYbZBz7B3hGxIdjG+', 'Singleton');
// script/framework/base/Singleton.ts

"use strict";
/*
 * @Author: your name
 * @Date: 2020-04-10 12:09:15
 * @LastEditTime: 2020-04-10 12:42:01
 * @LastEditors: Please set LastEditors
 * @Description: 内部使用管理器，用于注入上层管理器
 * @FilePath: \ddz\assets\framework\base\InnerManager.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleton = void 0;
/**@description 获取根据类型获取单列 */
function getSingleton(SingletonClass) {
    return SingletonClass.Instance();
}
exports.getSingleton = getSingleton;

cc._RF.pop();