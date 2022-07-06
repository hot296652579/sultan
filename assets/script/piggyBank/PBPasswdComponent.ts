// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { i18n } from "../common/language/LanguageImpl";
import PanelHelp from "../msgbox/PanelHelp";

const { ccclass, property } = cc._decorator;

// 密码字符
const PASSWORD_CHAR: string = "●";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox: cc.EditBox = null;

    private m_realContent: string = "";

    onLoad() {
        this.register();
    }

    start() {

    }

    public get string(): string {
        return this.m_realContent;
    }

    private register(): void {
        this.editBox.node.on("editing-did-began", this.onDidBegan, this);
        this.editBox.node.on("editing-did-ended", this.onDidEnded, this);
        this.editBox.node.on("editing-return", this.onDidEnded, this);
        this.editBox.node.on("text-changed", this.onTextChanged, this);
    }

    private onDidBegan(target: cc.EditBox): void {
        this.editBox.string = this.m_realContent;
    }

    private onDidEnded(target: cc.EditBox): void {
        if (this.m_realContent.length <= 0) {
            return;
        }

        let reg: RegExp = new RegExp(/^\d{1,}$/g);
        if (!reg.test(this.m_realContent)) {
            this.m_realContent = "";
            this.editBox.string = this.m_realContent;
            PanelHelp.showTip(i18n.PIGGY_BANK.MUST_6_DIGITS);
            return;
        }

        this.editBox.string = this.m_realContent.replace(/./g, () => {
            return PASSWORD_CHAR;
        });
    }

    private onTextChanged(content: cc.EditBox): void {
        this.m_realContent = content.string;
    }

    // update (dt) {}
}
