

const {ccclass, property} = cc._decorator;

/**
 * 预加载prefab资源
 */
@ccclass
export default class PrefabLoad extends cc.Component {

    @property(cc.Prefab)
    PrefabList: cc.Prefab [] = [];


    onLoad () {
    }

    start () {

    }

    // update (dt) {}
}
