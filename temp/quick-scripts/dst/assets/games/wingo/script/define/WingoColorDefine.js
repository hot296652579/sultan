
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/define/WingoColorDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a953brgZ5dPaZkj3L292MHg', 'WingoColorDefine');
// games/wingo/script/define/WingoColorDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WingoColorDefine = void 0;
var WingoColorDefine;
(function (WingoColorDefine) {
    WingoColorDefine.Text = {
        // 灰色
        Gray: cc.color(150, 150, 150, 255),
        // 白色
        WHITE: cc.color(255, 255, 255, 255),
    };
    WingoColorDefine.BetOption = {
        // 禁止
        DISABLE: cc.color(150, 150, 150, 255),
        // 激活
        ENABLE: cc.color(255, 255, 255, 255),
    };
    WingoColorDefine.HistroyOptionText = {
        // 未选中
        UNSELECT: cc.color(150, 150, 150, 255),
        // 选中
        SELECTED: cc.color(255, 255, 255, 255),
    };
    WingoColorDefine.Income = {
        NORMAL: cc.color(255, 255, 255, 255),
        GREEN: cc.color(0, 255, 91, 255),
        RED: cc.color(255, 0, 0, 255),
    };
    WingoColorDefine.IncomeStatus = {
        WIN: cc.color(0, 255, 91, 255),
        LOSS: cc.color(255, 0, 0, 255),
        WAITING: cc.color(255, 173, 30, 255),
    };
    // export const Record = {
    //     RED: cc.color(243, 61, 104, 255),
    //     GREEN: cc.color(58, 206, 126, 255),
    //     BLUE: cc.color(85, 173, 255, 255),
    //     YEELOW: cc.color(248, 194, 48, 255),
    // }
    // export const Tail = {
    //     RED: cc.color(255, 93, 119, 255),
    //     GREEN: cc.color(89, 215, 174, 255),
    //     BLUE: cc.color(103, 181, 246, 255),
    //     YEELOW: cc.color(255, 226, 126, 255),
    //     WHITE: cc.color(255, 255, 255, 255),
    // }
    // export const BetMode = {
    //     SELECTED: cc.color(255, 255, 255),
    //     UN_SELECt: cc.color(147, 147, 157),
    // }
    // export const EnableRate = {
    //     ENABLE: cc.color(255, 255, 255),
    //     DISABLE: cc.color(147, 147, 157),
    // }
    // export const ProfitLoss = {
    //     NORMAL: cc.color(255, 255, 255, 255),
    //     GREEN: cc.color(0, 255, 91, 255),
    //     RED: cc.color(255, 0, 0, 255),
    // }
})(WingoColorDefine = exports.WingoColorDefine || (exports.WingoColorDefine = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvZGVmaW5lL1dpbmdvQ29sb3JEZWZpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBaUIsZ0JBQWdCLENBa0VoQztBQWxFRCxXQUFpQixnQkFBZ0I7SUFFaEIscUJBQUksR0FBRztRQUNoQixLQUFLO1FBQ0wsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2xDLEtBQUs7UUFDTCxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDdEMsQ0FBQTtJQUVZLDBCQUFTLEdBQUc7UUFDckIsS0FBSztRQUNMLE9BQU8sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNyQyxLQUFLO1FBQ0wsTUFBTSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0tBQ3ZDLENBQUE7SUFFWSxrQ0FBaUIsR0FBRztRQUM3QixNQUFNO1FBQ04sUUFBUSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3RDLEtBQUs7UUFDTCxRQUFRLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7S0FDekMsQ0FBQTtJQUVZLHVCQUFNLEdBQUc7UUFDbEIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3BDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztRQUNoQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7S0FDaEMsQ0FBQTtJQUVZLDZCQUFZLEdBQUc7UUFDeEIsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDO1FBQzlCLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUM5QixPQUFPLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUM7S0FDdkMsQ0FBQTtJQUVELDBCQUEwQjtJQUMxQix3Q0FBd0M7SUFDeEMsMENBQTBDO0lBQzFDLHlDQUF5QztJQUN6QywyQ0FBMkM7SUFDM0MsSUFBSTtJQUVKLHdCQUF3QjtJQUN4Qix3Q0FBd0M7SUFDeEMsMENBQTBDO0lBQzFDLDBDQUEwQztJQUMxQyw0Q0FBNEM7SUFDNUMsMkNBQTJDO0lBQzNDLElBQUk7SUFFSiwyQkFBMkI7SUFDM0IseUNBQXlDO0lBQ3pDLDBDQUEwQztJQUMxQyxJQUFJO0lBRUosOEJBQThCO0lBQzlCLHVDQUF1QztJQUN2Qyx3Q0FBd0M7SUFDeEMsSUFBSTtJQUVKLDhCQUE4QjtJQUM5Qiw0Q0FBNEM7SUFDNUMsd0NBQXdDO0lBQ3hDLHFDQUFxQztJQUNyQyxJQUFJO0FBRVIsQ0FBQyxFQWxFZ0IsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFrRWhDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IG5hbWVzcGFjZSBXaW5nb0NvbG9yRGVmaW5lIHtcblxuICAgIGV4cG9ydCBjb25zdCBUZXh0ID0ge1xuICAgICAgICAvLyDngbDoibJcbiAgICAgICAgR3JheTogY2MuY29sb3IoMTUwLCAxNTAsIDE1MCwgMjU1KSxcbiAgICAgICAgLy8g55m96ImyXG4gICAgICAgIFdISVRFOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpLFxuICAgIH1cblxuICAgIGV4cG9ydCBjb25zdCBCZXRPcHRpb24gPSB7XG4gICAgICAgIC8vIOemgeatolxuICAgICAgICBESVNBQkxFOiBjYy5jb2xvcigxNTAsIDE1MCwgMTUwLCAyNTUpLFxuICAgICAgICAvLyDmv4DmtLtcbiAgICAgICAgRU5BQkxFOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpLFxuICAgIH1cblxuICAgIGV4cG9ydCBjb25zdCBIaXN0cm95T3B0aW9uVGV4dCA9IHtcbiAgICAgICAgLy8g5pyq6YCJ5LitXG4gICAgICAgIFVOU0VMRUNUOiBjYy5jb2xvcigxNTAsIDE1MCwgMTUwLCAyNTUpLFxuICAgICAgICAvLyDpgInkuK1cbiAgICAgICAgU0VMRUNURUQ6IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSksXG4gICAgfVxuXG4gICAgZXhwb3J0IGNvbnN0IEluY29tZSA9IHtcbiAgICAgICAgTk9STUFMOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpLFxuICAgICAgICBHUkVFTjogY2MuY29sb3IoMCwgMjU1LCA5MSwgMjU1KSxcbiAgICAgICAgUkVEOiBjYy5jb2xvcigyNTUsIDAsIDAsIDI1NSksXG4gICAgfVxuXG4gICAgZXhwb3J0IGNvbnN0IEluY29tZVN0YXR1cyA9IHtcbiAgICAgICAgV0lOOiBjYy5jb2xvcigwLCAyNTUsIDkxLCAyNTUpLFxuICAgICAgICBMT1NTOiBjYy5jb2xvcigyNTUsIDAsIDAsIDI1NSksXG4gICAgICAgIFdBSVRJTkc6IGNjLmNvbG9yKDI1NSwgMTczLCAzMCwgMjU1KSxcbiAgICB9XG5cbiAgICAvLyBleHBvcnQgY29uc3QgUmVjb3JkID0ge1xuICAgIC8vICAgICBSRUQ6IGNjLmNvbG9yKDI0MywgNjEsIDEwNCwgMjU1KSxcbiAgICAvLyAgICAgR1JFRU46IGNjLmNvbG9yKDU4LCAyMDYsIDEyNiwgMjU1KSxcbiAgICAvLyAgICAgQkxVRTogY2MuY29sb3IoODUsIDE3MywgMjU1LCAyNTUpLFxuICAgIC8vICAgICBZRUVMT1c6IGNjLmNvbG9yKDI0OCwgMTk0LCA0OCwgMjU1KSxcbiAgICAvLyB9XG5cbiAgICAvLyBleHBvcnQgY29uc3QgVGFpbCA9IHtcbiAgICAvLyAgICAgUkVEOiBjYy5jb2xvcigyNTUsIDkzLCAxMTksIDI1NSksXG4gICAgLy8gICAgIEdSRUVOOiBjYy5jb2xvcig4OSwgMjE1LCAxNzQsIDI1NSksXG4gICAgLy8gICAgIEJMVUU6IGNjLmNvbG9yKDEwMywgMTgxLCAyNDYsIDI1NSksXG4gICAgLy8gICAgIFlFRUxPVzogY2MuY29sb3IoMjU1LCAyMjYsIDEyNiwgMjU1KSxcbiAgICAvLyAgICAgV0hJVEU6IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSksXG4gICAgLy8gfVxuXG4gICAgLy8gZXhwb3J0IGNvbnN0IEJldE1vZGUgPSB7XG4gICAgLy8gICAgIFNFTEVDVEVEOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KSxcbiAgICAvLyAgICAgVU5fU0VMRUN0OiBjYy5jb2xvcigxNDcsIDE0NywgMTU3KSxcbiAgICAvLyB9XG5cbiAgICAvLyBleHBvcnQgY29uc3QgRW5hYmxlUmF0ZSA9IHtcbiAgICAvLyAgICAgRU5BQkxFOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KSxcbiAgICAvLyAgICAgRElTQUJMRTogY2MuY29sb3IoMTQ3LCAxNDcsIDE1NyksXG4gICAgLy8gfVxuXG4gICAgLy8gZXhwb3J0IGNvbnN0IFByb2ZpdExvc3MgPSB7XG4gICAgLy8gICAgIE5PUk1BTDogY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KSxcbiAgICAvLyAgICAgR1JFRU46IGNjLmNvbG9yKDAsIDI1NSwgOTEsIDI1NSksXG4gICAgLy8gICAgIFJFRDogY2MuY29sb3IoMjU1LCAwLCAwLCAyNTUpLFxuICAgIC8vIH1cblxufVxuIl19