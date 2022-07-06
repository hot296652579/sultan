
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/crash/script/define/CrashRateDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c40cULFVRP4pAJtg2tASSj', 'CrashRateDefine');
// games/crash/script/define/CrashRateDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrashRateDefine = void 0;
var CrashRateDefine;
(function (CrashRateDefine) {
    CrashRateDefine.RateInterval = [
        {
            rate: 1.00,
            move: 0.05,
            append: 0.01,
            startTime: 0,
        },
        {
            rate: 1.21,
            move: 0.06,
            append: 0.01,
            startTime: 3,
        },
        {
            rate: 1.45,
            move: 0.1,
            append: 0,
            startTime: 6,
        },
        {
            rate: 1.75,
            move: 0.12,
            append: 0,
            startTime: 9,
        },
        {
            rate: 2.11,
            move: 0.14,
            append: 0,
            startTime: 12,
        },
        {
            rate: 2.39,
            move: 0.14,
            append: 0.02,
            startTime: 14,
        },
        {
            rate: 2.73,
            move: 0.13,
            append: 0.03,
            startTime: 16,
        },
        {
            rate: 3.08,
            move: 0.21,
            append: 0,
            startTime: 18,
        },
        {
            rate: 3.71,
            move: 0.22,
            append: 0.02,
            startTime: 21,
        },
        {
            rate: 4.49,
            move: 0.27,
            append: 0.02,
            startTime: 24,
        },
        {
            rate: 5.09,
            move: 0.32,
            append: 0,
            startTime: 26,
        },
        {
            rate: 5.73,
            move: 0.36,
            append: 0.02,
            startTime: 28,
        },
        {
            rate: 7.37,
            move: 0.44,
            append: 0.03,
            startTime: 32,
        },
        {
            rate: 9.43,
            move: 0.56,
            append: 0.04,
            startTime: 36,
        },
        {
            rate: 12.07,
            move: 0.72,
            append: 0.05,
            startTime: 40,
        },
        {
            rate: 17.44,
            move: 1.02,
            append: 0.1,
            startTime: 46,
        },
        {
            rate: 22.52,
            move: 1.42,
            append: 0.12,
            startTime: 50,
        },
        {
            rate: 31.42,
            move: 2.02,
            append: 0.15,
            startTime: 55,
        },
    ];
    let ColorRate;
    (function (ColorRate) {
        ColorRate[ColorRate["RED"] = 100] = "RED";
        ColorRate[ColorRate["GREEN"] = 120] = "GREEN";
        ColorRate[ColorRate["BLUE"] = 200] = "BLUE";
        ColorRate[ColorRate["YEELOW"] = 2000] = "YEELOW";
    })(ColorRate = CrashRateDefine.ColorRate || (CrashRateDefine.ColorRate = {}));
})(CrashRateDefine = exports.CrashRateDefine || (exports.CrashRateDefine = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy9jcmFzaC9zY3JpcHQvZGVmaW5lL0NyYXNoUmF0ZURlZmluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFpQixlQUFlLENBdUgvQjtBQXZIRCxXQUFpQixlQUFlO0lBRWYsNEJBQVksR0FBa0M7UUFDdkQ7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsQ0FBQztTQUNmO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsQ0FBQztTQUNmO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxHQUFHO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQztTQUNmO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQztTQUNmO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQUNEO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLEVBQUU7U0FDaEI7UUFDRDtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxFQUFFO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQUNEO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLEVBQUU7U0FDaEI7UUFDRDtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxFQUFFO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLENBQUM7WUFDVCxTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQUNEO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLEVBQUU7U0FDaEI7UUFDRDtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsSUFBSTtZQUNaLFNBQVMsRUFBRSxFQUFFO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLEVBQUU7U0FDaEI7UUFDRDtZQUNJLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLFNBQVMsRUFBRSxFQUFFO1NBQ2hCO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLEVBQUU7U0FDaEI7S0FDSixDQUFDO0lBRUYsSUFBWSxTQUtYO0lBTEQsV0FBWSxTQUFTO1FBQ2pCLHlDQUFTLENBQUE7UUFDVCw2Q0FBVyxDQUFBO1FBQ1gsMkNBQVUsQ0FBQTtRQUNWLGdEQUFhLENBQUE7SUFDakIsQ0FBQyxFQUxXLFNBQVMsR0FBVCx5QkFBUyxLQUFULHlCQUFTLFFBS3BCO0FBQ0wsQ0FBQyxFQXZIZ0IsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUF1SC9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3Jhc2hJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL0NyYXNoSW50ZXJmYWNlXCJcblxuZXhwb3J0IG5hbWVzcGFjZSBDcmFzaFJhdGVEZWZpbmUge1xuXG4gICAgZXhwb3J0IGNvbnN0IFJhdGVJbnRlcnZhbDogQ3Jhc2hJbnRlcmZhY2UuUmF0ZUludGVydmFsW10gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhdGU6IDEuMDAsXG4gICAgICAgICAgICBtb3ZlOiAwLjA1LFxuICAgICAgICAgICAgYXBwZW5kOiAwLjAxLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByYXRlOiAxLjIxLFxuICAgICAgICAgICAgbW92ZTogMC4wNixcbiAgICAgICAgICAgIGFwcGVuZDogMC4wMSxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogMyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogMS40NSxcbiAgICAgICAgICAgIG1vdmU6IDAuMSxcbiAgICAgICAgICAgIGFwcGVuZDogMCxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogNixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogMS43NSxcbiAgICAgICAgICAgIG1vdmU6IDAuMTIsXG4gICAgICAgICAgICBhcHBlbmQ6IDAsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhdGU6IDIuMTEsXG4gICAgICAgICAgICBtb3ZlOiAwLjE0LFxuICAgICAgICAgICAgYXBwZW5kOiAwLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAxMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogMi4zOSxcbiAgICAgICAgICAgIG1vdmU6IDAuMTQsXG4gICAgICAgICAgICBhcHBlbmQ6IDAuMDIsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDE0LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByYXRlOiAyLjczLFxuICAgICAgICAgICAgbW92ZTogMC4xMyxcbiAgICAgICAgICAgIGFwcGVuZDogMC4wMyxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogMTYsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhdGU6IDMuMDgsXG4gICAgICAgICAgICBtb3ZlOiAwLjIxLFxuICAgICAgICAgICAgYXBwZW5kOiAwLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAxOCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogMy43MSxcbiAgICAgICAgICAgIG1vdmU6IDAuMjIsXG4gICAgICAgICAgICBhcHBlbmQ6IDAuMDIsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDIxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByYXRlOiA0LjQ5LFxuICAgICAgICAgICAgbW92ZTogMC4yNyxcbiAgICAgICAgICAgIGFwcGVuZDogMC4wMixcbiAgICAgICAgICAgIHN0YXJ0VGltZTogMjQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhdGU6IDUuMDksXG4gICAgICAgICAgICBtb3ZlOiAwLjMyLFxuICAgICAgICAgICAgYXBwZW5kOiAwLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAyNixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogNS43MyxcbiAgICAgICAgICAgIG1vdmU6IDAuMzYsXG4gICAgICAgICAgICBhcHBlbmQ6IDAuMDIsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDI4LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByYXRlOiA3LjM3LFxuICAgICAgICAgICAgbW92ZTogMC40NCxcbiAgICAgICAgICAgIGFwcGVuZDogMC4wMyxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogMzIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJhdGU6IDkuNDMsXG4gICAgICAgICAgICBtb3ZlOiAwLjU2LFxuICAgICAgICAgICAgYXBwZW5kOiAwLjA0LFxuICAgICAgICAgICAgc3RhcnRUaW1lOiAzNixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogMTIuMDcsXG4gICAgICAgICAgICBtb3ZlOiAwLjcyLFxuICAgICAgICAgICAgYXBwZW5kOiAwLjA1LFxuICAgICAgICAgICAgc3RhcnRUaW1lOiA0MCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmF0ZTogMTcuNDQsXG4gICAgICAgICAgICBtb3ZlOiAxLjAyLFxuICAgICAgICAgICAgYXBwZW5kOiAwLjEsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDQ2LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByYXRlOiAyMi41MixcbiAgICAgICAgICAgIG1vdmU6IDEuNDIsXG4gICAgICAgICAgICBhcHBlbmQ6IDAuMTIsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDUwLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByYXRlOiAzMS40MixcbiAgICAgICAgICAgIG1vdmU6IDIuMDIsXG4gICAgICAgICAgICBhcHBlbmQ6IDAuMTUsXG4gICAgICAgICAgICBzdGFydFRpbWU6IDU1LFxuICAgICAgICB9LFxuICAgIF07XG5cbiAgICBleHBvcnQgZW51bSBDb2xvclJhdGUge1xuICAgICAgICBSRUQgPSAxMDAsXG4gICAgICAgIEdSRUVOID0gMTIwLFxuICAgICAgICBCTFVFID0gMjAwLFxuICAgICAgICBZRUVMT1cgPSAyMDAwLFxuICAgIH1cbn0iXX0=