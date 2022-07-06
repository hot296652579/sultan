
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login/RichTextHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91026bZRlJD2L85jQ0x5SlB', 'RichTextHandler');
// script/login/RichTextHandler.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let RichTextHandler = class RichTextHandler extends cc.Component {
    constructor() {
        super(...arguments);
        this.agreeUrl = null;
        this.termsUrl = null;
    }
    agreeUrlHandler() {
        cc.sys.openURL(this.agreeUrl);
    }
    termsUrlHandler() {
        cc.sys.openURL(this.termsUrl);
    }
};
RichTextHandler = __decorate([
    ccclass
], RichTextHandler);
exports.default = RichTextHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbG9naW4vUmljaFRleHRIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzFDLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZ0IsU0FBUSxFQUFFLENBQUMsU0FBUztJQUF6RDs7UUFDSSxhQUFRLEdBQVUsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBVSxJQUFJLENBQUM7SUFPM0IsQ0FBQztJQU5HLGVBQWU7UUFDWCxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELGVBQWU7UUFDWCxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKLENBQUE7QUFUb0IsZUFBZTtJQURuQyxPQUFPO0dBQ2EsZUFBZSxDQVNuQztrQkFUb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSaWNoVGV4dEhhbmRsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIGFncmVlVXJsOnN0cmluZyA9IG51bGw7XG4gICAgdGVybXNVcmw6c3RyaW5nID0gbnVsbDtcbiAgICBhZ3JlZVVybEhhbmRsZXIoKXtcbiAgICAgICAgY2Muc3lzLm9wZW5VUkwodGhpcy5hZ3JlZVVybCk7XG4gICAgfVxuICAgIHRlcm1zVXJsSGFuZGxlcigpe1xuICAgICAgICBjYy5zeXMub3BlblVSTCh0aGlzLnRlcm1zVXJsKTtcbiAgICB9XG59XG4iXX0=