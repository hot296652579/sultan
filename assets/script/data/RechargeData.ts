import BaseData from "../base/BaseData";
import ClassDecorator from "../framework/decorator/ClassDecorator";
import { MST } from "../framework/external/protoc";

@ClassDecorator.classname
export default class RechargeData extends BaseData {
    public storeInfoList: MST.IStoreInfo[] = null;

    public minDepAmount: number | Long = null; //充值最小金额
    public maxDepAmount: number | Long = null; //充值最大金额
    public minWithAmount: number | Long = null; //提现最小金额
    public maxWithAmount: number | Long = null; //提现最大金额

    public bankInfoList: MST.IBankInfo[] = null;

    public bandBankCardInfo = null;

    public paymentUrl: string = null;

    constructor() {
        super();

    }

    public destroy(): void {

    }

}