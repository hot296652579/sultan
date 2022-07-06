const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickPlayEffets extends cc.Component {
    @property(cc.Prefab)
    liziPrefab: cc.Prefab = null;
    liziPool = new cc.NodePool();


    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.toTouchHandel, this)
        this.node.zIndex = 9999;
    }
    toTouchHandel(event) {
        let pos = event.getLocation()
        pos = this.node.convertToNodeSpaceAR(pos)
        let lizi = this.getLizi()
        lizi.setPosition(pos);
        lizi.active = true;
        lizi.getComponent(cc.ParticleSystem).resetSystem()
        this.scheduleOnce(() => {
            this.receive(lizi)
        }, 1)
        dispatch('onTouchHand')
    }
    receive(node: cc.Node) {
        node.removeFromParent()
        this.liziPool.put(node)
    }
    getLizi(): cc.Node {
        let lizi = this.liziPool.get() || cc.instantiate(this.liziPrefab)
        this.node.addChild(lizi);

        return lizi
    }
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.toTouchHandel, this)
    }

}
