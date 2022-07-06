import { MST } from "../framework/external/protoc";

export namespace PromotionInterface {

    export interface PlayerBrokerageRank {
        rank: number;
        data: MST.IPromotionRankInfo;
    }

}