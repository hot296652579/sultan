/**
 * 滑动列表项的接口类约束
 */
export interface ListViewItemClass {

    /**
     * 准备显示时 | 数据刷新回调 数据带入
     * @param {T} 泛型数据
     */
    onShow: (data: any) => void;

    /**
     * 重置数据和节点
     */
    reset: () => void;

}