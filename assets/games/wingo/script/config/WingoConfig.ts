import { MST } from "../../../../script/framework/external/protoc";
import { WingoColorDefine } from "../define/WingoColorDefine";

export namespace WingoConfig {

    export const ColorOptionList: string[] = [
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

    export const NumOptionList: string[] = [
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

    export const NumAnimOrder: number[] = [
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

    export const NumByColor = {
        0: [
            MST.WingoColor.Red,
            MST.WingoColor.Purple,
            MST.WingoColor.Azure,
            MST.WingoColor.AR,
        ],
        1: [
            MST.WingoColor.Green,
            MST.WingoColor.Azure,
            MST.WingoColor.AG,
        ],
        2: [
            MST.WingoColor.Red,
            MST.WingoColor.Azure,
            MST.WingoColor.AR
        ],
        3: [
            MST.WingoColor.Green,
            MST.WingoColor.Azure,
            MST.WingoColor.AG,
        ],
        4: [
            MST.WingoColor.Red,
            MST.WingoColor.Yellow,
            MST.WingoColor.Azure,
            MST.WingoColor.AR,
        ],
        5: [
            MST.WingoColor.Green,
            MST.WingoColor.Purple,
            MST.WingoColor.Blue,
            MST.WingoColor.BG,
        ],
        6: [
            MST.WingoColor.Red,
            MST.WingoColor.Blue,
            MST.WingoColor.BR,
        ],
        7: [
            MST.WingoColor.Green,
            MST.WingoColor.Blue,
            MST.WingoColor.BG,
        ],
        8: [
            MST.WingoColor.Red,
            MST.WingoColor.Blue,
            MST.WingoColor.BR,
        ],
        9: [
            MST.WingoColor.Green,
            MST.WingoColor.Yellow,
            MST.WingoColor.Blue,
            MST.WingoColor.BG,
        ],
    }

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

    export const BetTitleLanguage = {
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
    }

    export const LotteryIntervalTime = {
        0: 30000,
        1: 60000,
        2: 120000,
    }

}