import BaseData from "../base/BaseData";
import ClassDecorator from "../framework/decorator/ClassDecorator";
import { MST } from "../framework/external/protoc";

@ClassDecorator.classname
export default class HallData extends BaseData {

    // public gameList: MST.IRoomInfo[] = null;
    public games = null;
    // public winRankList: MST.UnitRankInfo[] = null;
    public winRankList: MST.RankInfoCell[] = null;
    public betRankList: MST.BetInfo[] = null;

    public signinData: MST.S2C_GetSignedInfo = null;

    public notice = [];
    public missionList = [];

    constructor() {
        super();

    }

    public destroy(): void {

    }

}