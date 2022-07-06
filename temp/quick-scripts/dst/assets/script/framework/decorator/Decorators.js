
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/decorator/Decorators.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a73a3gqxuBG4azywFSxJslZ', 'Decorators');
// script/framework/decorator/Decorators.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeKey = exports.injectService = void 0;
function injectService(service) {
    return function (target) {
        let __load = target.prototype.onLoad;
        target.prototype.onLoad = function () {
            if (CC_DEBUG)
                cc.log(`[injectService] ${cc.js.getClassName(this)} ---onLoad----`);
            this.service = service;
            __load && __load.call(this);
        };
    };
}
exports.injectService = injectService;
/**
* @description 生成key 如果需要改变请 连带decorators 中的protoHandle 方法一起改动，这两个地方使用的同一个生成规则
* @param mainCmd
* @param subCmd
*/
function makeKey(mainCmd) {
    let key = `[${mainCmd}]`;
    return key;
}
exports.makeKey = makeKey;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9EZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLFNBQWdCLGFBQWEsQ0FBQyxPQUFnQjtJQUMxQyxPQUFPLFVBQVUsTUFBVztRQUN4QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRztZQUN0QixJQUFLLFFBQVE7Z0JBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVRELHNDQVNDO0FBRUQ7Ozs7RUFJRTtBQUNGLFNBQWdCLE9BQU8sQ0FBQyxPQUFlO0lBQ25DLElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxHQUFHLENBQUM7SUFDekIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBSEQsMEJBR0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogQGRlc2NyaXB0aW9uIOWQhOenjeijhemlsOWZqOWumuS5iVxuICovXG5pbXBvcnQgeyBTZXJ2aWNlIH0gZnJvbSBcIi4uL2Jhc2UvU2VydmljZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0U2VydmljZShzZXJ2aWNlOiBTZXJ2aWNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQ6IGFueSkge1xuICAgICAgICBsZXQgX19sb2FkID0gdGFyZ2V0LnByb3RvdHlwZS5vbkxvYWQ7XG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCBDQ19ERUJVRyApIGNjLmxvZyhgW2luamVjdFNlcnZpY2VdICR7Y2MuanMuZ2V0Q2xhc3NOYW1lKHRoaXMpfSAtLS1vbkxvYWQtLS0tYCk7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgICAgICAgICAgX19sb2FkICYmIF9fbG9hZC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiogQGRlc2NyaXB0aW9uIOeUn+aIkGtleSDlpoLmnpzpnIDopoHmlLnlj5jor7cg6L+e5bimZGVjb3JhdG9ycyDkuK3nmoRwcm90b0hhbmRsZSDmlrnms5XkuIDotbfmlLnliqjvvIzov5nkuKTkuKrlnLDmlrnkvb/nlKjnmoTlkIzkuIDkuKrnlJ/miJDop4TliJlcbiogQHBhcmFtIG1haW5DbWQgXG4qIEBwYXJhbSBzdWJDbWQgXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VLZXkobWFpbkNtZDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQga2V5ID0gYFske21haW5DbWR9XWA7XG4gICAgcmV0dXJuIGtleTtcbn1cbiJdfQ==