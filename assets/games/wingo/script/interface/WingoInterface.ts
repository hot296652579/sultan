import { MST } from "../../../../script/framework/external/protoc";

export namespace WingoInterface {

    export interface HighlightTween {
        prev: cc.Tween,
        curr: cc.Tween,
    }

    export interface BetData {
        // 下注类型
        type: MST.WingoBetType,
        // 下注值
        value: number,
        // 服务费
        serviceCost: number,
    }

}