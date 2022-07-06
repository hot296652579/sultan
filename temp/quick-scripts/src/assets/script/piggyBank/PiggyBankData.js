"use strict";
cc._RF.push(module, '682e8eAYYxCMoMJeAOpk7he', 'PiggyBankData');
// script/piggyBank/PiggyBankData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PiggyBankData {
    constructor() {
        this.data = null;
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new PiggyBankData();
        }
        return this.instance;
    }
}
exports.default = PiggyBankData;
PiggyBankData.instance = null;

cc._RF.pop();