
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/games/wingo/script/config/WingoConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c804chiUkRMGKG4O1uWDAix', 'WingoConfig');
// games/wingo/script/config/WingoConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WingoConfig = void 0;
const protoc_1 = require("../../../../script/framework/external/protoc");
var WingoConfig;
(function (WingoConfig) {
    WingoConfig.ColorOptionList = [
        "btnC0",
        "btnC1",
        "btnC2",
        "btnC3",
        "btnC4",
        "btnC5",
        "btnC6",
        "btnC7",
        "btnC8",
        "btnC9",
    ];
    WingoConfig.NumOptionList = [
        "btnN0",
        "btnN1",
        "btnN2",
        "btnN3",
        "btnN4",
        "btnN5",
        "btnN6",
        "btnN7",
        "btnN8",
        "btnN9",
    ];
    WingoConfig.NumAnimOrder = [
        0,
        1,
        2,
        3,
        4,
        9,
        8,
        7,
        6,
        5
    ];
    WingoConfig.NumByColor = {
        0: [
            protoc_1.MST.WingoColor.Red,
            protoc_1.MST.WingoColor.Purple,
            protoc_1.MST.WingoColor.Azure,
            protoc_1.MST.WingoColor.AR,
        ],
        1: [
            protoc_1.MST.WingoColor.Green,
            protoc_1.MST.WingoColor.Azure,
            protoc_1.MST.WingoColor.AG,
        ],
        2: [
            protoc_1.MST.WingoColor.Red,
            protoc_1.MST.WingoColor.Azure,
            protoc_1.MST.WingoColor.AR
        ],
        3: [
            protoc_1.MST.WingoColor.Green,
            protoc_1.MST.WingoColor.Azure,
            protoc_1.MST.WingoColor.AG,
        ],
        4: [
            protoc_1.MST.WingoColor.Red,
            protoc_1.MST.WingoColor.Yellow,
            protoc_1.MST.WingoColor.Azure,
            protoc_1.MST.WingoColor.AR,
        ],
        5: [
            protoc_1.MST.WingoColor.Green,
            protoc_1.MST.WingoColor.Purple,
            protoc_1.MST.WingoColor.Blue,
            protoc_1.MST.WingoColor.BG,
        ],
        6: [
            protoc_1.MST.WingoColor.Red,
            protoc_1.MST.WingoColor.Blue,
            protoc_1.MST.WingoColor.BR,
        ],
        7: [
            protoc_1.MST.WingoColor.Green,
            protoc_1.MST.WingoColor.Blue,
            protoc_1.MST.WingoColor.BG,
        ],
        8: [
            protoc_1.MST.WingoColor.Red,
            protoc_1.MST.WingoColor.Blue,
            protoc_1.MST.WingoColor.BR,
        ],
        9: [
            protoc_1.MST.WingoColor.Green,
            protoc_1.MST.WingoColor.Yellow,
            protoc_1.MST.WingoColor.Blue,
            protoc_1.MST.WingoColor.BG,
        ],
    };
    // export const NumMap = {
    //     0: [
    //         [MST.WingoColor.Red, MST.WingoColor.Purple],
    //         [MST.WingoColor.Azure]
    //     ],
    //     1: [
    //         [MST.WingoColor.Green],
    //         [MST.WingoColor.Azure]
    //     ],
    //     2: [
    //         [MST.WingoColor.Red],
    //         [MST.WingoColor.Azure]
    //     ],
    //     3: [
    //         [MST.WingoColor.Green],
    //         [MST.WingoColor.Azure]
    //     ],
    //     4: [
    //         [MST.WingoColor.Red, MST.WingoColor.Yellow],
    //         [MST.WingoColor.Azure]
    //     ],
    //     5: [
    //         [MST.WingoColor.Green, MST.WingoColor.Purple],
    //         [MST.WingoColor.Blue]
    //     ],
    //     6: [
    //         [MST.WingoColor.Red],
    //         [MST.WingoColor.Blue]
    //     ],
    //     7: [
    //         [MST.WingoColor.Green],
    //         [MST.WingoColor.Blue]
    //     ],
    //     8: [
    //         [MST.WingoColor.Red],
    //         [MST.WingoColor.Blue]
    //     ],
    //     9: [
    //         [MST.WingoColor.Green, MST.WingoColor.Yellow],
    //         [MST.WingoColor.Blue]
    //     ],
    // }
    // export const ColorMap = {
    //     0: [MST.WingoColor.Green],
    //     1: [MST.WingoColor.Purple],
    //     2: [MST.WingoColor.Red],
    //     3: [MST.WingoColor.Azure],
    //     4: [MST.WingoColor.Yellow],
    //     5: [MST.WingoColor.Blue],
    //     6: [MST.WingoColor.Azure, MST.WingoColor.Red],
    //     7: [MST.WingoColor.Azure, MST.WingoColor.Green],
    //     8: [MST.WingoColor.Blue, MST.WingoColor.Red],
    //     9: [MST.WingoColor.Blue, MST.WingoColor.Green],
    // }
    WingoConfig.BetTitleLanguage = {
        0: "btnC0",
        1: "btnC1",
        2: "btnC2",
        3: "btnC3",
        4: "btnC4",
        5: "btnC5",
        6: "btnC6",
        7: "btnC7",
        8: "btnC8",
        9: "btnC9",
    };
    WingoConfig.LotteryIntervalTime = {
        0: 30000,
        1: 60000,
        2: 120000,
    };
})(WingoConfig = exports.WingoConfig || (exports.WingoConfig = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9nYW1lcy93aW5nby9zY3JpcHQvY29uZmlnL1dpbmdvQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFtRTtBQUduRSxJQUFpQixXQUFXLENBNkszQjtBQTdLRCxXQUFpQixXQUFXO0lBRVgsMkJBQWUsR0FBYTtRQUNyQyxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO0tBQ1YsQ0FBQztJQUVXLHlCQUFhLEdBQWE7UUFDbkMsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsT0FBTztLQUNWLENBQUM7SUFFVyx3QkFBWSxHQUFhO1FBQ2xDLENBQUM7UUFDRCxDQUFDO1FBQ0QsQ0FBQztRQUNELENBQUM7UUFDRCxDQUFDO1FBQ0QsQ0FBQztRQUNELENBQUM7UUFDRCxDQUFDO1FBQ0QsQ0FBQztRQUNELENBQUM7S0FDSixDQUFDO0lBRVcsc0JBQVUsR0FBRztRQUN0QixDQUFDLEVBQUU7WUFDQyxZQUFHLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDbEIsWUFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO1lBQ3JCLFlBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSztZQUNwQixZQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7U0FDcEI7UUFDRCxDQUFDLEVBQUU7WUFDQyxZQUFHLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDcEIsWUFBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ3BCLFlBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtTQUNwQjtRQUNELENBQUMsRUFBRTtZQUNDLFlBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRztZQUNsQixZQUFHLENBQUMsVUFBVSxDQUFDLEtBQUs7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K0JBQW1CLEdBQUc7UUFDL0IsQ0FBQyxFQUFFLEtBQUs7UUFDUixDQUFDLEVBQUUsS0FBSztRQUNSLENBQUMsRUFBRSxNQUFNO0tBQ1osQ0FBQTtBQUVMLENBQUMsRUE3S2dCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBNkszQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1TVCB9IGZyb20gXCIuLi8uLi8uLi8uLi9zY3JpcHQvZnJhbWV3b3JrL2V4dGVybmFsL3Byb3RvY1wiO1xuaW1wb3J0IHsgV2luZ29Db2xvckRlZmluZSB9IGZyb20gXCIuLi9kZWZpbmUvV2luZ29Db2xvckRlZmluZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFdpbmdvQ29uZmlnIHtcblxuICAgIGV4cG9ydCBjb25zdCBDb2xvck9wdGlvbkxpc3Q6IHN0cmluZ1tdID0gW1xuICAgICAgICBcImJ0bkMwXCIsXG4gICAgICAgIFwiYnRuQzFcIixcbiAgICAgICAgXCJidG5DMlwiLFxuICAgICAgICBcImJ0bkMzXCIsXG4gICAgICAgIFwiYnRuQzRcIixcbiAgICAgICAgXCJidG5DNVwiLFxuICAgICAgICBcImJ0bkM2XCIsXG4gICAgICAgIFwiYnRuQzdcIixcbiAgICAgICAgXCJidG5DOFwiLFxuICAgICAgICBcImJ0bkM5XCIsXG4gICAgXTtcblxuICAgIGV4cG9ydCBjb25zdCBOdW1PcHRpb25MaXN0OiBzdHJpbmdbXSA9IFtcbiAgICAgICAgXCJidG5OMFwiLFxuICAgICAgICBcImJ0bk4xXCIsXG4gICAgICAgIFwiYnRuTjJcIixcbiAgICAgICAgXCJidG5OM1wiLFxuICAgICAgICBcImJ0bk40XCIsXG4gICAgICAgIFwiYnRuTjVcIixcbiAgICAgICAgXCJidG5ONlwiLFxuICAgICAgICBcImJ0bk43XCIsXG4gICAgICAgIFwiYnRuTjhcIixcbiAgICAgICAgXCJidG5OOVwiLFxuICAgIF07XG5cbiAgICBleHBvcnQgY29uc3QgTnVtQW5pbU9yZGVyOiBudW1iZXJbXSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMixcbiAgICAgICAgMyxcbiAgICAgICAgNCxcbiAgICAgICAgOSxcbiAgICAgICAgOCxcbiAgICAgICAgNyxcbiAgICAgICAgNixcbiAgICAgICAgNVxuICAgIF07XG5cbiAgICBleHBvcnQgY29uc3QgTnVtQnlDb2xvciA9IHtcbiAgICAgICAgMDogW1xuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuUmVkLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuUHVycGxlLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuQXp1cmUsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5BUixcbiAgICAgICAgXSxcbiAgICAgICAgMTogW1xuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuR3JlZW4sXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5BenVyZSxcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLkFHLFxuICAgICAgICBdLFxuICAgICAgICAyOiBbXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5SZWQsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5BenVyZSxcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLkFSXG4gICAgICAgIF0sXG4gICAgICAgIDM6IFtcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLkdyZWVuLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuQXp1cmUsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5BRyxcbiAgICAgICAgXSxcbiAgICAgICAgNDogW1xuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuUmVkLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuWWVsbG93LFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuQXp1cmUsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5BUixcbiAgICAgICAgXSxcbiAgICAgICAgNTogW1xuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuR3JlZW4sXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5QdXJwbGUsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5CbHVlLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuQkcsXG4gICAgICAgIF0sXG4gICAgICAgIDY6IFtcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLlJlZCxcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLkJsdWUsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5CUixcbiAgICAgICAgXSxcbiAgICAgICAgNzogW1xuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuR3JlZW4sXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5CbHVlLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuQkcsXG4gICAgICAgIF0sXG4gICAgICAgIDg6IFtcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLlJlZCxcbiAgICAgICAgICAgIE1TVC5XaW5nb0NvbG9yLkJsdWUsXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5CUixcbiAgICAgICAgXSxcbiAgICAgICAgOTogW1xuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuR3JlZW4sXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5ZZWxsb3csXG4gICAgICAgICAgICBNU1QuV2luZ29Db2xvci5CbHVlLFxuICAgICAgICAgICAgTVNULldpbmdvQ29sb3IuQkcsXG4gICAgICAgIF0sXG4gICAgfVxuXG4gICAgLy8gZXhwb3J0IGNvbnN0IE51bU1hcCA9IHtcbiAgICAvLyAgICAgMDogW1xuICAgIC8vICAgICAgICAgW01TVC5XaW5nb0NvbG9yLlJlZCwgTVNULldpbmdvQ29sb3IuUHVycGxlXSxcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5BenVyZV1cbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgMTogW1xuICAgIC8vICAgICAgICAgW01TVC5XaW5nb0NvbG9yLkdyZWVuXSxcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5BenVyZV1cbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgMjogW1xuICAgIC8vICAgICAgICAgW01TVC5XaW5nb0NvbG9yLlJlZF0sXG4gICAgLy8gICAgICAgICBbTVNULldpbmdvQ29sb3IuQXp1cmVdXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIDM6IFtcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5HcmVlbl0sXG4gICAgLy8gICAgICAgICBbTVNULldpbmdvQ29sb3IuQXp1cmVdXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIDQ6IFtcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5SZWQsIE1TVC5XaW5nb0NvbG9yLlllbGxvd10sXG4gICAgLy8gICAgICAgICBbTVNULldpbmdvQ29sb3IuQXp1cmVdXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIDU6IFtcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5HcmVlbiwgTVNULldpbmdvQ29sb3IuUHVycGxlXSxcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5CbHVlXVxuICAgIC8vICAgICBdLFxuICAgIC8vICAgICA2OiBbXG4gICAgLy8gICAgICAgICBbTVNULldpbmdvQ29sb3IuUmVkXSxcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5CbHVlXVxuICAgIC8vICAgICBdLFxuICAgIC8vICAgICA3OiBbXG4gICAgLy8gICAgICAgICBbTVNULldpbmdvQ29sb3IuR3JlZW5dLFxuICAgIC8vICAgICAgICAgW01TVC5XaW5nb0NvbG9yLkJsdWVdXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIDg6IFtcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5SZWRdLFxuICAgIC8vICAgICAgICAgW01TVC5XaW5nb0NvbG9yLkJsdWVdXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIDk6IFtcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5HcmVlbiwgTVNULldpbmdvQ29sb3IuWWVsbG93XSxcbiAgICAvLyAgICAgICAgIFtNU1QuV2luZ29Db2xvci5CbHVlXVxuICAgIC8vICAgICBdLFxuICAgIC8vIH1cblxuICAgIC8vIGV4cG9ydCBjb25zdCBDb2xvck1hcCA9IHtcbiAgICAvLyAgICAgMDogW01TVC5XaW5nb0NvbG9yLkdyZWVuXSxcbiAgICAvLyAgICAgMTogW01TVC5XaW5nb0NvbG9yLlB1cnBsZV0sXG4gICAgLy8gICAgIDI6IFtNU1QuV2luZ29Db2xvci5SZWRdLFxuICAgIC8vICAgICAzOiBbTVNULldpbmdvQ29sb3IuQXp1cmVdLFxuICAgIC8vICAgICA0OiBbTVNULldpbmdvQ29sb3IuWWVsbG93XSxcbiAgICAvLyAgICAgNTogW01TVC5XaW5nb0NvbG9yLkJsdWVdLFxuICAgIC8vICAgICA2OiBbTVNULldpbmdvQ29sb3IuQXp1cmUsIE1TVC5XaW5nb0NvbG9yLlJlZF0sXG4gICAgLy8gICAgIDc6IFtNU1QuV2luZ29Db2xvci5BenVyZSwgTVNULldpbmdvQ29sb3IuR3JlZW5dLFxuICAgIC8vICAgICA4OiBbTVNULldpbmdvQ29sb3IuQmx1ZSwgTVNULldpbmdvQ29sb3IuUmVkXSxcbiAgICAvLyAgICAgOTogW01TVC5XaW5nb0NvbG9yLkJsdWUsIE1TVC5XaW5nb0NvbG9yLkdyZWVuXSxcbiAgICAvLyB9XG5cbiAgICBleHBvcnQgY29uc3QgQmV0VGl0bGVMYW5ndWFnZSA9IHtcbiAgICAgICAgMDogXCJidG5DMFwiLFxuICAgICAgICAxOiBcImJ0bkMxXCIsXG4gICAgICAgIDI6IFwiYnRuQzJcIixcbiAgICAgICAgMzogXCJidG5DM1wiLFxuICAgICAgICA0OiBcImJ0bkM0XCIsXG4gICAgICAgIDU6IFwiYnRuQzVcIixcbiAgICAgICAgNjogXCJidG5DNlwiLFxuICAgICAgICA3OiBcImJ0bkM3XCIsXG4gICAgICAgIDg6IFwiYnRuQzhcIixcbiAgICAgICAgOTogXCJidG5DOVwiLFxuICAgIH1cblxuICAgIGV4cG9ydCBjb25zdCBMb3R0ZXJ5SW50ZXJ2YWxUaW1lID0ge1xuICAgICAgICAwOiAzMDAwMCxcbiAgICAgICAgMTogNjAwMDAsXG4gICAgICAgIDI6IDEyMDAwMCxcbiAgICB9XG5cbn0iXX0=