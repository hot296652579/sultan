"use strict";
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