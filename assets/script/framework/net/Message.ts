import { CmdResStruct } from "../../common/net/CmdResStruct";
import { User } from "../../global/User";

// 消息号占用字节
const MESSAGE_CODE_BYTE_SIZE: number = 2;

/**@description 与服务器交互的消息 */
export class Message {
    /**@description 消息主cmd码 */
    mainCmd: number = 0;
    /**@description 解析后包体数据 */
    data: any = null;
    /**@description 发送或接收的消息流 */
    buffer: ArrayBuffer = null;

    /**@description data消息流 */
    databuffer: Uint8Array = null;

    /**@description serverId */
    serverId: number = 0;

    /**@description 数据填充 */
    protected fillData() {

    }
    /**
     * 合并 buffer
     * @param buffer1 
     * @param buffer2 
     */
    protected _appendBuffer(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);


        // this.decode(tmp)

        return tmp.buffer;
    };

    /**@description 转换成Uint8Array buffer */
    protected toBuffer() {


        let bodyLen: number = MESSAGE_CODE_BYTE_SIZE + this.databuffer.byteLength;
        let dataLen: number = bodyLen;
        let dataBuffer: ArrayBuffer = new ArrayBuffer(dataLen);
        let dataView: DataView = new DataView(dataBuffer);

        let bufferOffset: number = 0;
        let msgDataLen: number = this.databuffer.byteLength;

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
    encode(): boolean {
        try {
            this.fillData();
            this.toBuffer();
            return true;
        } catch (error) {
            cc.error(error);
            return false;
        }
    }
    /**@description 解析数据 */
    decode(data: Uint8Array): boolean {
        if (data) {
            // ArrayBuffer.isView(data.buffer)
            this.buffer = data;
            var dv = new DataView(data.buffer);
            this.mainCmd = dv.getUint16(0, false);//mainCmd
            //数据体
            try {
                let daTbuff = data.buffer.slice(2, data.buffer.byteLength);
                var dataU8 = new Uint8Array(daTbuff);
                let res = CmdResStruct.decode(this.mainCmd)
                if (res) {
                    let dataMsg = res.decode(dataU8);
                    this.data = dataMsg;
                } else {
                    cc.error(`未配置 ${this.mainCmd} 解析消息proto注册 CmdResStruct`);
                }

            } catch (error) {
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
        const combined = littleEndian ? left + 2 ** 32 * right : 2 ** 32 * left + right;

        if (!Number.isSafeInteger(combined))
            console.warn(combined, 'exceeds MAX_SAFE_INTEGER. Precision may be lost');

        return combined;
    }
}