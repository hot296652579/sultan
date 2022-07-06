"use strict";
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