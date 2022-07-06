"use strict";
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