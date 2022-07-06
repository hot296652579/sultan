
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/common/net/GameService.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6c33czRRRKAJsyyZzeZ+Dh', 'GameService');
// script/common/net/GameService.ts

"use strict";
/**
 * @description 子游戏连接服务
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const CommonService_1 = require("./CommonService");
class GameService extends CommonService_1.CommonService {
    static get instance() { return this._instance || (this._instance = new GameService()); }
}
exports.GameService = GameService;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29tbW9uL25ldC9HYW1lU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7OztBQUVILG1EQUFnRDtBQUVoRCxNQUFhLFdBQVksU0FBUSw2QkFBYTtJQUNuQyxNQUFNLEtBQUssUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsRztBQUZELGtDQUVDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb24g5a2Q5ri45oiP6L+e5o6l5pyN5YqhXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uU2VydmljZSB9IGZyb20gXCIuL0NvbW1vblNlcnZpY2VcIjtcblxuZXhwb3J0IGNsYXNzIEdhbWVTZXJ2aWNlIGV4dGVuZHMgQ29tbW9uU2VydmljZSB7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLl9pbnN0YW5jZSB8fCAodGhpcy5faW5zdGFuY2UgPSBuZXcgR2FtZVNlcnZpY2UoKSk7IH1cbn1cblxuIl19