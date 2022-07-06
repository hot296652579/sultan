
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/base/Singleton.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2Jhc2UvU2luZ2xldG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztHQU9HOzs7QUFXSCw2QkFBNkI7QUFDN0IsU0FBZ0IsWUFBWSxDQUFLLGNBQTZCO0lBQzFELE9BQU8sY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JDLENBQUM7QUFGRCxvQ0FFQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiB5b3VyIG5hbWVcbiAqIEBEYXRlOiAyMDIwLTA0LTEwIDEyOjA5OjE1XG4gKiBATGFzdEVkaXRUaW1lOiAyMDIwLTA0LTEwIDEyOjQyOjAxXG4gKiBATGFzdEVkaXRvcnM6IFBsZWFzZSBzZXQgTGFzdEVkaXRvcnNcbiAqIEBEZXNjcmlwdGlvbjog5YaF6YOo5L2/55So566h55CG5Zmo77yM55So5LqO5rOo5YWl5LiK5bGC566h55CG5ZmoXG4gKiBARmlsZVBhdGg6IFxcZGR6XFxhc3NldHNcXGZyYW1ld29ya1xcYmFzZVxcSW5uZXJNYW5hZ2VyLnRzXG4gKi9cblxuIFxuZXhwb3J0IGludGVyZmFjZSBTaW5nbGV0b248VD4ge1xuICAgIG5ldygpOiBUO1xuICAgIC8qKlxuICAgICAqQGRlc2NyaXB0aW9uIOWNleS+i+e7n+S4gOWunueOsCBcbiAgICAgKi9cbiAgICBJbnN0YW5jZSgpOiBUO1xufVxuXG4vKipAZGVzY3JpcHRpb24g6I635Y+W5qC55o2u57G75Z6L6I635Y+W5Y2V5YiXICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2luZ2xldG9uPFQ+KCBTaW5nbGV0b25DbGFzcyA6IFNpbmdsZXRvbjxUPil7XG4gICAgcmV0dXJuIFNpbmdsZXRvbkNsYXNzLkluc3RhbmNlKCk7XG59XG5cbiJdfQ==