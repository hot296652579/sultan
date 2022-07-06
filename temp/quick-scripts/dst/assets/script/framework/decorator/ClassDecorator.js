
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/decorator/ClassDecorator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3ccabKr9QZAQ6Xp/dPAvykm', 'ClassDecorator');
// script/framework/decorator/ClassDecorator.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClassDecorator {
    /**
     * 类名装饰器
     */
    static get classname() {
        return function (target) {
            let frameInfo = cc['_RF'].peek();
            let script = frameInfo.script;
            cc.js.setClassName(script, target);
        };
    }
}
exports.default = ClassDecorator;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2RlY29yYXRvci9DbGFzc0RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQXFCLGNBQWM7SUFFL0I7O09BRUc7SUFDSSxNQUFNLEtBQUssU0FBUztRQUN2QixPQUFPLFVBQVUsTUFBVztZQUN4QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM5QixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUVKO0FBYkQsaUNBYUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDbGFzc0RlY29yYXRvciB7XG5cbiAgICAvKipcbiAgICAgKiDnsbvlkI3oo4XppbDlmahcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldCBjbGFzc25hbWUoKTogRnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldDogYW55KSB7XG4gICAgICAgICAgICBsZXQgZnJhbWVJbmZvID0gY2NbJ19SRiddLnBlZWsoKTtcbiAgICAgICAgICAgIGxldCBzY3JpcHQgPSBmcmFtZUluZm8uc2NyaXB0O1xuICAgICAgICAgICAgY2MuanMuc2V0Q2xhc3NOYW1lKHNjcmlwdCwgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==