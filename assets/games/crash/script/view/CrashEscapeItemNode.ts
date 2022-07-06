import { UtilMgr } from "../../../../script/global/UtilMgr";

const ACTION_TIME: number = 3;
const FLY_X: number = 100;
const { ccclass, property } = cc._decorator;

@ccclass
export default class CrashEscapeItemNode extends cc.Component {

    private m_nick: string = null;
    private m_rate: number = null;
    private m_originPos: cc.Vec2 = null;
    private m_tween: cc.Tween = null;

    onLoad() {
        this.node.getComponent(cc.Label).string = "";
    }

    start() {

    }

    onEnable() {
        this.setView();
    }

    public setOriginPos(pos: cc.Vec2): void {
        this.node.setPosition(pos);
        this.m_originPos = pos;
    }

    public setData(nick: string, rate: number): void {
        this.m_nick = nick;
        this.m_rate = rate;
    }

    public setView(): void {
        // this.node.getComponent(cc.Label).string = `● ${this.m_nick}@${UtilMgr.toFixed(this.m_rate / 100, 2)}x`;
        this.node.getComponent(cc.Label).string = `${this.m_nick}@${UtilMgr.toFixed(this.m_rate / 100, 2)}x`;
    }

    public clear(): void {
        this.m_nick = null;
        this.m_rate = null;
        this.m_originPos = null;
        this.stopAnim();
    }

    public runDrop(completeCallback?: Function): void {
        this.setView();
        this.stopAnim();

        this.m_tween = cc.tween(this.node)
            .to(ACTION_TIME, { y: 0, opacity: 50 })
            .call(() => {
                this.stopAnim();
                completeCallback && completeCallback();
            })
            .start();
    }

    public runFly(completeCallback?: Function): void {
        this.setView();
        this.stopAnim();

        let residuePercent: number = this.node.y / this.m_originPos.y;
        let residueTime: number = UtilMgr.toFixed(ACTION_TIME * residuePercent, 2);
        let residueX: number = UtilMgr.toFixed(FLY_X * residuePercent, 2);

        if (this.node.y > this.m_originPos.y) {
            this.node.y = this.m_originPos.y;
        }

        let x: number = this.m_originPos.x - residueX;
        if (x < 0) {
            x = 0;
        }

        this.m_tween = cc.tween(this.node)
            .to(residueTime, { x: x, y: 0, opacity: 50 })
            .call(() => {
                this.stopAnim();
                completeCallback && completeCallback();
            })
            .start();
    }

    public stopAnim(): void {
        if (this.m_tween) {
            this.m_tween.stop();
            this.m_tween = null;
        }
    }

    // update (dt) {}
}
