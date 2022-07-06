
import SendVerificationCode from "./SendVerificationCode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SendVerificationCodePlus extends SendVerificationCode {

    @property(cc.Node)
    prebg: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.countDownEnd();
    }
    doSendVerificationCode(msg) {
        super.doSendVerificationCode(msg)
        this.countDownEnd()
    }
    _doStartTime() {
        super._doStartTime();
        this.prebg.active = false;
    }
    countDownEnd() {
        this.prebg.active = true;
        this.label.string = "";
    }
    sendFail(){
        super.sendFail();
        this.countDownEnd();
    }
}
