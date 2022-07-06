
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/piggyBank/PiggyBankData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '682e8eAYYxCMoMJeAOpk7he', 'PiggyBankData');
// script/piggyBank/PiggyBankData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PiggyBankData {
    constructor() {
        this.data = null;
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new PiggyBankData();
        }
        return this.instance;
    }
}
exports.default = PiggyBankData;
PiggyBankData.instance = null;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcGlnZ3lCYW5rL1BpZ2d5QmFua0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxNQUFxQixhQUFhO0lBQWxDO1FBSVcsU0FBSSxHQUEyQyxJQUFJLENBQUM7SUFTL0QsQ0FBQztJQVBVLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7O0FBWEwsZ0NBYUM7QUFYa0Isc0JBQVEsR0FBa0IsSUFBSSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9leHRlcm5hbC9wcm90b2NcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGlnZ3lCYW5rRGF0YSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUGlnZ3lCYW5rRGF0YSA9IG51bGw7XG5cbiAgICBwdWJsaWMgZGF0YTogY29tLmJ0LmdhbWUucHJvdG8uaGFsbC5JVG90YWxBbW91bnRSZXMgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBQaWdneUJhbmtEYXRhIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUGlnZ3lCYW5rRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxufSJdfQ==