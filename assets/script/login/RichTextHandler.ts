
const {ccclass, property} = cc._decorator;

@ccclass
export default class RichTextHandler extends cc.Component {
    agreeUrl:string = null;
    termsUrl:string = null;
    agreeUrlHandler(){
        cc.sys.openURL(this.agreeUrl);
    }
    termsUrlHandler(){
        cc.sys.openURL(this.termsUrl);
    }
}
