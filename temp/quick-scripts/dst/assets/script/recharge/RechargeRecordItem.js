
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/recharge/RechargeRecordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ceed6eRPAZA44AUNTPJ2Qs1', 'RechargeRecordItem');
// script/recharge/RechargeRecordItem.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UtilMgr_1 = require("../global/UtilMgr");
const LanguageImpl_1 = require("../common/language/LanguageImpl");
const { ccclass, property } = cc._decorator;
let RechargeRecordItem = class RechargeRecordItem extends cc.Component {
    constructor() {
        super(...arguments);
        this.lbl_time = null;
        this.lbl_commodity = null;
        this.lbl_Amount = null;
        this.lbl_state = null;
    }
    onLoad() { }
    updateItem(obj) {
        this.lbl_time.string = new Date(obj.time).format('MM-dd hh:mm:ss');
        this.lbl_commodity.string = obj.commodity;
        this.lbl_Amount.string = UtilMgr_1.UtilMgr.changeMoney(obj.amount);
        this.lbl_state.string = obj.state == 0 ? LanguageImpl_1.i18n.RECHARGE.WaitingPay : (obj.state == 1 ? LanguageImpl_1.i18n.RECHARGE.PaySuccess : LanguageImpl_1.i18n.RECHARGE.PayFailed);
        // 充值状态 0待支付 1支付成功
        this.lbl_state.node.color = cc.color().fromHEX(obj.state == 0 ? "FDE5EC" : (obj.state == 1 ? '00ff3c' : "fd1414"));
    }
};
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_time", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_commodity", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_Amount", void 0);
__decorate([
    property(cc.Label)
], RechargeRecordItem.prototype, "lbl_state", void 0);
RechargeRecordItem = __decorate([
    ccclass
], RechargeRecordItem);
exports.default = RechargeRecordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvcmVjaGFyZ2UvUmVjaGFyZ2VSZWNvcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTRDO0FBQzVDLGtFQUF1RDtBQUd2RCxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQTVEOztRQUdJLGFBQVEsR0FBYSxJQUFJLENBQUM7UUFFMUIsa0JBQWEsR0FBYSxJQUFJLENBQUM7UUFFL0IsZUFBVSxHQUFhLElBQUksQ0FBQztRQUU1QixjQUFTLEdBQWEsSUFBSSxDQUFDO0lBYy9CLENBQUM7SUFaRyxNQUFNLEtBQUssQ0FBQztJQUVaLFVBQVUsQ0FBQyxHQUFHO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsbUJBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUksa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUN2SCxDQUFDO0NBR0osQ0FBQTtBQXBCRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNPO0FBRTFCO0lBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ1k7QUFFL0I7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDUztBQUU1QjtJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNRO0FBVFYsa0JBQWtCO0lBRHRDLE9BQU87R0FDYSxrQkFBa0IsQ0F1QnRDO2tCQXZCb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbE1nciB9IGZyb20gXCIuLi9nbG9iYWwvVXRpbE1nclwiO1xuaW1wb3J0IHsgaTE4biB9IGZyb20gXCIuLi9jb21tb24vbGFuZ3VhZ2UvTGFuZ3VhZ2VJbXBsXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlUmVjb3JkSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJsX3RpbWU6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGJsX2NvbW1vZGl0eTogY2MuTGFiZWwgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYmxfQW1vdW50OiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxibF9zdGF0ZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkgeyB9XG5cbiAgICB1cGRhdGVJdGVtKG9iaikge1xuICAgICAgICB0aGlzLmxibF90aW1lLnN0cmluZyA9IG5ldyBEYXRlKG9iai50aW1lKS5mb3JtYXQoJ01NLWRkIGhoOm1tOnNzJyk7XG4gICAgICAgIHRoaXMubGJsX2NvbW1vZGl0eS5zdHJpbmcgPSBvYmouY29tbW9kaXR5O1xuICAgICAgICB0aGlzLmxibF9BbW91bnQuc3RyaW5nID0gVXRpbE1nci5jaGFuZ2VNb25leShvYmouYW1vdW50KTtcbiAgICAgICAgdGhpcy5sYmxfc3RhdGUuc3RyaW5nID0gb2JqLnN0YXRlID09IDAgPyBpMThuLlJFQ0hBUkdFLldhaXRpbmdQYXkgOiAob2JqLnN0YXRlID09IDEgPyBpMThuLlJFQ0hBUkdFLlBheVN1Y2Nlc3MgOiBpMThuLlJFQ0hBUkdFLlBheUZhaWxlZCk7XG4gICAgICAgIC8vIOWFheWAvOeKtuaAgSAw5b6F5pSv5LuYIDHmlK/ku5jmiJDlip9cbiAgICAgICAgdGhpcy5sYmxfc3RhdGUubm9kZS5jb2xvciA9IGNjLmNvbG9yKCkuZnJvbUhFWChvYmouc3RhdGUgPT0gMCA/IFwiRkRFNUVDXCIgOiAob2JqLnN0YXRlID09IDEgPyAnMDBmZjNjJyA6IFwiZmQxNDE0XCIpKTtcbiAgICB9XG5cblxufVxuIl19