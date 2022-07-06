import { MST } from "../../../../script/framework/external/protoc";

export namespace CrashInterface {

    export interface RateInterval {
        rate: number,
        startTime: number,
        move: number,
        append: number,
    }

    export interface BetPlayer {
        betInfo: MST.ICrashBetInfo,
        isEscape: boolean,
    }

    export interface Hash {
        gameNo: number,
        serverSeed?: string,
        serverSeedHash?: string,
        publicSeed?: string,
        roundHash?: string,
        acak?: number,
        point?: number,
    }

}