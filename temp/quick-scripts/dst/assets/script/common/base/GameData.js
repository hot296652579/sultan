
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/base/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae8cfivGvhC0Jggi9zclct/', 'GameData');
// script/common/base/GameData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameData = void 0;
/**@description 游戏内数据的公共基类 */
class GameData {
    /**@description 当前的asset bundle name */
    get bundle() {
        return "";
    }
    /**@description 清除数据 */
    clear() {
    }
    onLanguageChange() {
    }
}
exports.GameData = GameData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL2Jhc2UvR2FtZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkJBQTZCO0FBQzdCLE1BQWEsUUFBUTtJQUVqQix1Q0FBdUM7SUFDdkMsSUFBVyxNQUFNO1FBQ2IsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsdUJBQXVCO0lBQ2hCLEtBQUs7SUFFWixDQUFDO0lBRUQsZ0JBQWdCO0lBRWhCLENBQUM7Q0FDSjtBQWZELDRCQWVDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipAZGVzY3JpcHRpb24g5ri45oiP5YaF5pWw5o2u55qE5YWs5YWx5Z+657G7ICovXG5leHBvcnQgY2xhc3MgR2FtZURhdGF7XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5b2T5YmN55qEYXNzZXQgYnVuZGxlIG5hbWUgKi9cbiAgICBwdWJsaWMgZ2V0IGJ1bmRsZSgpe1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICAvKipAZGVzY3JpcHRpb24g5riF6Zmk5pWw5o2uICovXG4gICAgcHVibGljIGNsZWFyKCl7XG5cbiAgICB9XG5cbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCl7XG4gICAgICAgIFxuICAgIH1cbn0iXX0=