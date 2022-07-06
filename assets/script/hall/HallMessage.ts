import { CommonMessage } from "../common/net/CommonService"
import { serialize } from "../framework/net/JsonMessage";

export let MainCmd = {
    LOBBY_UPDATE : 2001,
    GATEWAY : 1001,

}

export let SubCmd = {
    UPDATE_MONEY : 100,
}

export class TestData extends CommonMessage{

    @serialize("test",String)
    test : string = "my test";

}

export class UpdateMoney extends CommonMessage {
    mainCmd = MainCmd.LOBBY_UPDATE;
    @serialize("count",Number)
    count : number = 1000;
}



