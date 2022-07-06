
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/net/Message.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f20bKU7h1JJY2VL032FxV0', 'Message');
// script/framework/net/Message.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const CmdResStruct_1 = require("../../common/net/CmdResStruct");
// 消息号占用字节
const MESSAGE_CODE_BYTE_SIZE = 2;
/**@description 与服务器交互的消息 */
class Message {
    constructor() {
        /**@description 消息主cmd码 */
        this.mainCmd = 0;
        /**@description 解析后包体数据 */
        this.data = null;
        /**@description 发送或接收的消息流 */
        this.buffer = null;
        /**@description data消息流 */
        this.databuffer = null;
        /**@description serverId */
        this.serverId = 0;
    }
    /**@description 数据填充 */
    fillData() {
    }
    /**
     * 合并 buffer
     * @param buffer1
     * @param buffer2
     */
    _appendBuffer(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        // this.decode(tmp)
        return tmp.buffer;
    }
    ;
    /**@description 转换成Uint8Array buffer */
    toBuffer() {
        let bodyLen = MESSAGE_CODE_BYTE_SIZE + this.databuffer.byteLength;
        let dataLen = bodyLen;
        let dataBuffer = new ArrayBuffer(dataLen);
        let dataView = new DataView(dataBuffer);
        let bufferOffset = 0;
        let msgDataLen = this.databuffer.byteLength;
        // 协议号
        dataView.setUint16(bufferOffset, this.mainCmd, false);
        bufferOffset += MESSAGE_CODE_BYTE_SIZE;
        // 协议数据
        (new Uint8Array(dataBuffer, bufferOffset, msgDataLen)).set(this.databuffer, 0);
        bufferOffset += msgDataLen;
        this.buffer = dataBuffer;
        // var buffer = new ArrayBuffer(2);
        // var dv = new DataView(buffer);
        // dv.setUint16(0, this.mainCmd, true);
        // // dv.setUint32(0, buffer.byteLength, true);//len
        // // dv.setUint32(4, 0, true);//code
        // // dv.setUint32(8, Date.now(), true);//time
        // // dv.setUint16(12, this.mainCmd, true);//mainCmd
        // // dv.setUint16(14, this.subCmd, true);//subCmd
        // // dv.setUint32(16, 0, true);//seqId
        // // dv.setUint32(20, User._userID, true);//userId
        // // dv.setUint16(24, this.serverId, true);//serverId
        // // dv.setUint32(26, 0, true);//reserved
        // // // dv.setBigUint64(30, BigInt(0), true); // timestamp
        // this.buffer = buffer;
        // if (this.databuffer) {
        //     this.buffer = this._appendBuffer(buffer, this.databuffer.slice().buffer)
        //     dv.setUint32(0, this.buffer.byteLength, true);//len
        // }
    }
    /**@description 打包数据 */
    encode() {
        try {
            this.fillData();
            this.toBuffer();
            return true;
        }
        catch (error) {
            cc.error(error);
            return false;
        }
    }
    /**@description 解析数据 */
    decode(data) {
        if (data) {
            // ArrayBuffer.isView(data.buffer)
            this.buffer = data;
            var dv = new DataView(data.buffer);
            this.mainCmd = dv.getUint16(0, false); //mainCmd
            //数据体
            try {
                let daTbuff = data.buffer.slice(2, data.buffer.byteLength);
                var dataU8 = new Uint8Array(daTbuff);
                let res = CmdResStruct_1.CmdResStruct.decode(this.mainCmd);
                if (res) {
                    let dataMsg = res.decode(dataU8);
                    this.data = dataMsg;
                }
                else {
                    cc.error(`未配置 ${this.mainCmd} 解析消息proto注册 CmdResStruct`);
                }
            }
            catch (error) {
                return false;
            }
            return true;
        }
        return false;
    }
    getUint64(dataview, byteOffset, littleEndian) {
        // 将 64 位整数值分成两份 32 位整数值
        const left = dataview.getUint32(byteOffset, littleEndian);
        const right = dataview.getUint32(byteOffset + 4, littleEndian);
        // 合并两个 32 位整数值
        const combined = littleEndian ? left + Math.pow(2, 32) * right : Math.pow(2, 32) * left + right;
        if (!Number.isSafeInteger(combined))
            console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');
        return combined;
    }
}
exports.Message = Message;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL25ldC9NZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUE2RDtBQUc3RCxVQUFVO0FBQ1YsTUFBTSxzQkFBc0IsR0FBVyxDQUFDLENBQUM7QUFFekMsNEJBQTRCO0FBQzVCLE1BQWEsT0FBTztJQUFwQjtRQUNJLDBCQUEwQjtRQUMxQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLDBCQUEwQjtRQUMxQixTQUFJLEdBQVEsSUFBSSxDQUFDO1FBQ2pCLDRCQUE0QjtRQUM1QixXQUFNLEdBQWdCLElBQUksQ0FBQztRQUUzQiwwQkFBMEI7UUFDMUIsZUFBVSxHQUFlLElBQUksQ0FBQztRQUU5QiwyQkFBMkI7UUFDM0IsYUFBUSxHQUFXLENBQUMsQ0FBQztJQW9IekIsQ0FBQztJQWxIRyx1QkFBdUI7SUFDYixRQUFRO0lBRWxCLENBQUM7SUFDRDs7OztPQUlHO0lBQ08sYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPO1FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xFLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHckQsbUJBQW1CO1FBRW5CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN0QixDQUFDO0lBQUEsQ0FBQztJQUVGLHVDQUF1QztJQUM3QixRQUFRO1FBR2QsSUFBSSxPQUFPLEdBQVcsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDMUUsSUFBSSxPQUFPLEdBQVcsT0FBTyxDQUFDO1FBQzlCLElBQUksVUFBVSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVsRCxJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7UUFDN0IsSUFBSSxVQUFVLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFFcEQsTUFBTTtRQUNOLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEQsWUFBWSxJQUFJLHNCQUFzQixDQUFDO1FBRXZDLE9BQU87UUFDUCxDQUFDLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRSxZQUFZLElBQUksVUFBVSxDQUFDO1FBRTNCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBRXpCLG1DQUFtQztRQUNuQyxpQ0FBaUM7UUFDakMsdUNBQXVDO1FBQ3ZDLG9EQUFvRDtRQUNwRCxxQ0FBcUM7UUFDckMsOENBQThDO1FBQzlDLG9EQUFvRDtRQUNwRCxrREFBa0Q7UUFDbEQsdUNBQXVDO1FBQ3ZDLG1EQUFtRDtRQUNuRCxzREFBc0Q7UUFDdEQsMENBQTBDO1FBQzFDLDJEQUEyRDtRQUMzRCx3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLCtFQUErRTtRQUMvRSwwREFBMEQ7UUFDMUQsSUFBSTtJQUNSLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsTUFBTTtRQUNGLElBQUk7WUFDQSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBQ0QsdUJBQXVCO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFnQjtRQUNuQixJQUFJLElBQUksRUFBRTtZQUNOLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLEVBQUUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBLFNBQVM7WUFDL0MsS0FBSztZQUNMLElBQUk7Z0JBQ0EsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzNELElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLEdBQUcsR0FBRywyQkFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzNDLElBQUksR0FBRyxFQUFFO29CQUNMLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2lCQUN2QjtxQkFBTTtvQkFDSCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sMkJBQTJCLENBQUMsQ0FBQztpQkFDNUQ7YUFFSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZO1FBQ3hDLHdCQUF3QjtRQUN4QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFL0QsZUFBZTtRQUNmLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQUEsQ0FBQyxFQUFJLEVBQUUsQ0FBQSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBQSxDQUFDLEVBQUksRUFBRSxDQUFBLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVoRixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsaURBQWlELENBQUMsQ0FBQztRQUU5RSxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUFoSUQsMEJBZ0lDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ21kUmVzU3RydWN0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9uZXQvQ21kUmVzU3RydWN0XCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL2dsb2JhbC9Vc2VyXCI7XG5cbi8vIOa2iOaBr+WPt+WNoOeUqOWtl+iKglxuY29uc3QgTUVTU0FHRV9DT0RFX0JZVEVfU0laRTogbnVtYmVyID0gMjtcblxuLyoqQGRlc2NyaXB0aW9uIOS4juacjeWKoeWZqOS6pOS6kueahOa2iOaBryAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2Uge1xuICAgIC8qKkBkZXNjcmlwdGlvbiDmtojmga/kuLtjbWTnoIEgKi9cbiAgICBtYWluQ21kOiBudW1iZXIgPSAwO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDop6PmnpDlkI7ljIXkvZPmlbDmja4gKi9cbiAgICBkYXRhOiBhbnkgPSBudWxsO1xuICAgIC8qKkBkZXNjcmlwdGlvbiDlj5HpgIHmiJbmjqXmlLbnmoTmtojmga/mtYEgKi9cbiAgICBidWZmZXI6IEFycmF5QnVmZmVyID0gbnVsbDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiBkYXRh5raI5oGv5rWBICovXG4gICAgZGF0YWJ1ZmZlcjogVWludDhBcnJheSA9IG51bGw7XG5cbiAgICAvKipAZGVzY3JpcHRpb24gc2VydmVySWQgKi9cbiAgICBzZXJ2ZXJJZDogbnVtYmVyID0gMDtcblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmlbDmja7loavlhYUgKi9cbiAgICBwcm90ZWN0ZWQgZmlsbERhdGEoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCI5bm2IGJ1ZmZlclxuICAgICAqIEBwYXJhbSBidWZmZXIxIFxuICAgICAqIEBwYXJhbSBidWZmZXIyIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfYXBwZW5kQnVmZmVyKGJ1ZmZlcjEsIGJ1ZmZlcjIpIHtcbiAgICAgICAgdmFyIHRtcCA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcjEuYnl0ZUxlbmd0aCArIGJ1ZmZlcjIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIHRtcC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyMSksIDApO1xuICAgICAgICB0bXAuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlcjIpLCBidWZmZXIxLmJ5dGVMZW5ndGgpO1xuXG5cbiAgICAgICAgLy8gdGhpcy5kZWNvZGUodG1wKVxuXG4gICAgICAgIHJldHVybiB0bXAuYnVmZmVyO1xuICAgIH07XG5cbiAgICAvKipAZGVzY3JpcHRpb24g6L2s5o2i5oiQVWludDhBcnJheSBidWZmZXIgKi9cbiAgICBwcm90ZWN0ZWQgdG9CdWZmZXIoKSB7XG5cblxuICAgICAgICBsZXQgYm9keUxlbjogbnVtYmVyID0gTUVTU0FHRV9DT0RFX0JZVEVfU0laRSArIHRoaXMuZGF0YWJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICBsZXQgZGF0YUxlbjogbnVtYmVyID0gYm9keUxlbjtcbiAgICAgICAgbGV0IGRhdGFCdWZmZXI6IEFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGRhdGFMZW4pO1xuICAgICAgICBsZXQgZGF0YVZpZXc6IERhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGRhdGFCdWZmZXIpO1xuXG4gICAgICAgIGxldCBidWZmZXJPZmZzZXQ6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBtc2dEYXRhTGVuOiBudW1iZXIgPSB0aGlzLmRhdGFidWZmZXIuYnl0ZUxlbmd0aDtcblxuICAgICAgICAvLyDljY/orq7lj7dcbiAgICAgICAgZGF0YVZpZXcuc2V0VWludDE2KGJ1ZmZlck9mZnNldCwgdGhpcy5tYWluQ21kLCBmYWxzZSk7XG4gICAgICAgIGJ1ZmZlck9mZnNldCArPSBNRVNTQUdFX0NPREVfQllURV9TSVpFO1xuXG4gICAgICAgIC8vIOWNj+iuruaVsOaNrlxuICAgICAgICAobmV3IFVpbnQ4QXJyYXkoZGF0YUJ1ZmZlciwgYnVmZmVyT2Zmc2V0LCBtc2dEYXRhTGVuKSkuc2V0KHRoaXMuZGF0YWJ1ZmZlciwgMCk7XG4gICAgICAgIGJ1ZmZlck9mZnNldCArPSBtc2dEYXRhTGVuO1xuIFxuICAgICAgICB0aGlzLmJ1ZmZlciA9IGRhdGFCdWZmZXI7XG5cbiAgICAgICAgLy8gdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgICAgICAgLy8gdmFyIGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICAgIC8vIGR2LnNldFVpbnQxNigwLCB0aGlzLm1haW5DbWQsIHRydWUpO1xuICAgICAgICAvLyAvLyBkdi5zZXRVaW50MzIoMCwgYnVmZmVyLmJ5dGVMZW5ndGgsIHRydWUpOy8vbGVuXG4gICAgICAgIC8vIC8vIGR2LnNldFVpbnQzMig0LCAwLCB0cnVlKTsvL2NvZGVcbiAgICAgICAgLy8gLy8gZHYuc2V0VWludDMyKDgsIERhdGUubm93KCksIHRydWUpOy8vdGltZVxuICAgICAgICAvLyAvLyBkdi5zZXRVaW50MTYoMTIsIHRoaXMubWFpbkNtZCwgdHJ1ZSk7Ly9tYWluQ21kXG4gICAgICAgIC8vIC8vIGR2LnNldFVpbnQxNigxNCwgdGhpcy5zdWJDbWQsIHRydWUpOy8vc3ViQ21kXG4gICAgICAgIC8vIC8vIGR2LnNldFVpbnQzMigxNiwgMCwgdHJ1ZSk7Ly9zZXFJZFxuICAgICAgICAvLyAvLyBkdi5zZXRVaW50MzIoMjAsIFVzZXIuX3VzZXJJRCwgdHJ1ZSk7Ly91c2VySWRcbiAgICAgICAgLy8gLy8gZHYuc2V0VWludDE2KDI0LCB0aGlzLnNlcnZlcklkLCB0cnVlKTsvL3NlcnZlcklkXG4gICAgICAgIC8vIC8vIGR2LnNldFVpbnQzMigyNiwgMCwgdHJ1ZSk7Ly9yZXNlcnZlZFxuICAgICAgICAvLyAvLyAvLyBkdi5zZXRCaWdVaW50NjQoMzAsIEJpZ0ludCgwKSwgdHJ1ZSk7IC8vIHRpbWVzdGFtcFxuICAgICAgICAvLyB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgLy8gaWYgKHRoaXMuZGF0YWJ1ZmZlcikge1xuICAgICAgICAvLyAgICAgdGhpcy5idWZmZXIgPSB0aGlzLl9hcHBlbmRCdWZmZXIoYnVmZmVyLCB0aGlzLmRhdGFidWZmZXIuc2xpY2UoKS5idWZmZXIpXG4gICAgICAgIC8vICAgICBkdi5zZXRVaW50MzIoMCwgdGhpcy5idWZmZXIuYnl0ZUxlbmd0aCwgdHJ1ZSk7Ly9sZW5cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8qKkBkZXNjcmlwdGlvbiDmiZPljIXmlbDmja4gKi9cbiAgICBlbmNvZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmZpbGxEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLnRvQnVmZmVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipAZGVzY3JpcHRpb24g6Kej5p6Q5pWw5o2uICovXG4gICAgZGVjb2RlKGRhdGE6IFVpbnQ4QXJyYXkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIEFycmF5QnVmZmVyLmlzVmlldyhkYXRhLmJ1ZmZlcilcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gZGF0YTtcbiAgICAgICAgICAgIHZhciBkdiA9IG5ldyBEYXRhVmlldyhkYXRhLmJ1ZmZlcik7XG4gICAgICAgICAgICB0aGlzLm1haW5DbWQgPSBkdi5nZXRVaW50MTYoMCwgZmFsc2UpOy8vbWFpbkNtZFxuICAgICAgICAgICAgLy/mlbDmja7kvZNcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGRhVGJ1ZmYgPSBkYXRhLmJ1ZmZlci5zbGljZSgyLCBkYXRhLmJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVU4ID0gbmV3IFVpbnQ4QXJyYXkoZGFUYnVmZik7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IENtZFJlc1N0cnVjdC5kZWNvZGUodGhpcy5tYWluQ21kKVxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFNc2cgPSByZXMuZGVjb2RlKGRhdGFVOCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGFNc2c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoYOacqumFjee9riAke3RoaXMubWFpbkNtZH0g6Kej5p6Q5raI5oGvcHJvdG/ms6jlhowgQ21kUmVzU3RydWN0YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldFVpbnQ2NChkYXRhdmlldywgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gICAgICAgIC8vIOWwhiA2NCDkvY3mlbTmlbDlgLzliIbmiJDkuKTku70gMzIg5L2N5pW05pWw5YC8XG4gICAgICAgIGNvbnN0IGxlZnQgPSBkYXRhdmlldy5nZXRVaW50MzIoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSBkYXRhdmlldy5nZXRVaW50MzIoYnl0ZU9mZnNldCArIDQsIGxpdHRsZUVuZGlhbik7XG5cbiAgICAgICAgLy8g5ZCI5bm25Lik5LiqIDMyIOS9jeaVtOaVsOWAvFxuICAgICAgICBjb25zdCBjb21iaW5lZCA9IGxpdHRsZUVuZGlhbiA/IGxlZnQgKyAyICoqIDMyICogcmlnaHQgOiAyICoqIDMyICogbGVmdCArIHJpZ2h0O1xuXG4gICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoY29tYmluZWQpKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKGNvbWJpbmVkLCAnZXhjZWVkcyBNQVhfU0FGRV9JTlRFR0VSLiBQcmVjaXNpb24gbWF5IGJlIGxvc3QnKTtcblxuICAgICAgICByZXR1cm4gY29tYmluZWQ7XG4gICAgfVxufSJdfQ==