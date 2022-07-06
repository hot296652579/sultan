import { com } from "../framework/external/protoc";

export default class PiggyBankData {

    private static instance: PiggyBankData = null;

    public data: com.bt.game.proto.hall.ITotalAmountRes = null;

    public static getInstance(): PiggyBankData {
        if (this.instance === null) {
            this.instance = new PiggyBankData();
        }
        return this.instance;
    }

}