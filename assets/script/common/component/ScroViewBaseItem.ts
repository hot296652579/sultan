


const {ccclass, property} = cc._decorator;

@ccclass
export default class ScroViewBaseItem extends cc.Component{

   
    
    _itemId: any;
    _data: any;

    updateItem(data,itemId)
    {
        //cc.assert(itemId || itemId == 0, "itemId is undefined")
        this._data = data;
        this._itemId = itemId;
    }

    getItemId()
    {
        return this._itemId
    }

    // update (dt) {}
}
