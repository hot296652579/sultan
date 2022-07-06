
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/framework/extentions/WebEditBoxImpl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6b85ddpujtPSp3HN9JmW+36', 'WebEditBoxImpl');
// script/framework/extentions/WebEditBoxImpl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Framework_1 = require("../Framework");
class WebEditBoxHelper {
    constructor() {
        this.input = null;
        this.textarea = null;
        this.div = null;
    }
    static get instance() { return this._instance || (this._instance = new WebEditBoxHelper()); }
    init() {
        if (this.div == null) {
            //创建一个全黑色的半透明背景
            let div = window.document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.margin = "0px";
            div.style.position = "absolute";
            div.style.zIndex = "1000";
            div.style.bottom = "0px";
            div.style.left = "0px";
            div.style.backgroundColor = "#000";
            div.style.opacity = "0.5";
            div.style.visibility = "hidden";
            div.id = "input_background";
            cc.game.container.appendChild(div);
            this.div = div;
        }
        if (this.input == null) {
            let input = window.document.createElement("input");
            input.style.zIndex = "1001";
            input.id = "EditBox_Input";
            input.style.visibility = "hidden";
            input.style.width = "98%";
            input.style.height = "30px";
            input.style.border = "2px";
            input.style.borderColor = "blue";
            input.style.position = "absolute";
            input.style.top = "5px";
            input.style.left = "1%";
            input.style.borderRadius = "5px";
            input.style.fontSize = "25px";
            input.style.type = "text";
            input.style['-moz-appearance'] = "textfield";
            cc.game.container.appendChild(input);
            this.input = input;
        }
        if (this.textarea == null) {
            let textarea = window.document.createElement("textarea");
            textarea.style.zIndex = "1001";
            textarea.id = "EditBox_Textarea";
            textarea.style.visibility = "hidden";
            textarea.style.width = "98%";
            textarea.style.height = "50px";
            textarea.style.border = "2px";
            textarea.style.borderColor = "blue";
            textarea.style.position = "absolute";
            textarea.style.top = "5px";
            textarea.style.left = "1%";
            textarea.style.borderRadius = "5px";
            textarea.style.resize = "none";
            textarea.style.fontSize = "25px";
            textarea.style.overflow_y = "scroll";
            textarea.style.overflowY = "scroll";
            cc.game.container.appendChild(textarea);
            this.textarea = textarea;
        }
        window.addEventListener("orientationchange", this.onOrientationChange.bind(this), false);
        this.hideDom();
    }
    onOrientationChange() {
        if (this.input)
            this.input.blur();
        if (this.textarea)
            this.textarea.blur();
    }
    adjust(rotate) {
        if (rotate == 0 || rotate == 180) {
            let height = parseInt(cc.game.container.style.height);
            let rate = 0.90;
            let width = height * rate;
            if (this.input) {
                this.input.style.width = `${width}px`;
                this.input.style.top = `${width / 2}px`;
                this.input.style.transform = "rotate(-90deg)";
                this.input.style.left = `-${width / 2 - 30}px`;
            }
            if (this.textarea) {
                this.textarea.style.width = `${width}px`;
                this.textarea.style.top = `${width / 2}px`;
                this.textarea.style.transform = "rotate(-90deg)";
                this.textarea.style.left = `-${width - 50}px`;
            }
        }
        else {
            if (this.input) {
                this.input.style.width = "98%";
                this.input.style.top = "5px";
                this.input.style.transform = "rotate(0deg)";
                this.input.style.left = "1%";
            }
            if (this.textarea) {
                this.textarea.style.width = "98%";
                this.textarea.style.top = "5px";
                this.textarea.style.transform = "rotate(0deg)";
                this.textarea.style.left = "1%";
            }
        }
    }
    createTextArea() {
        return this.textarea;
    }
    createInput() {
        return this.input;
    }
    hideDom() {
        if (this.div) {
            this.div.style.visibility = "hidden";
        }
        if (this.input) {
            this.input.style.visibility = "hidden";
        }
        if (this.textarea) {
            this.textarea.style.visibility = "hidden";
        }
    }
    showDom(isTextArea) {
        if (this.input && this.textarea) {
            if (this.div) {
                this.div.style.visibility = "visible";
            }
            this.input.style.visibility = isTextArea ? "hidden" : "visible";
            this.textarea.style.visibility = isTextArea ? "visible" : "hidden";
            this.adjust(window.orientation);
        }
    }
}
WebEditBoxHelper._instance = null;
class WebEditBoxImpl {
    constructor() {
        this._delegate = null;
        this._elem = null;
        this._isTextArea = false;
        // event listeners
        this._eventListeners = {};
        this._isFocus = false;
    }
    init(delegate) {
        if (!delegate) {
            return;
        }
        this._delegate = delegate;
        WebEditBoxHelper.instance.init();
        if (delegate.inputMode === cc.EditBox.InputMode.ANY) {
            this._createTextArea();
        }
        else {
            this._createInput();
        }
    }
    enable() {
        //do nothing
    }
    disable() {
        if (this._isFocus) {
            this._elem.blur();
        }
    }
    clear() {
        if (this._isFocus) {
            this._removeEventListeners();
            WebEditBoxHelper.instance.hideDom();
        }
    }
    update() {
    }
    setTabIndex(index) {
        // Only support on Web platform
    }
    setSize(width, height) {
        // Only support on Web platform
    }
    setFocus(value) {
        if (value) {
            this.beginEditing();
        }
        else {
            this._isFocus = false;
        }
    }
    isFocused() {
        return this._isFocus;
    }
    beginEditing() {
        this._isFocus = true;
        Framework_1.Manager.adaptor.isShowKeyboard = true;
        this._showDom();
        this._registerEventListeners();
        this._elem.focus();
        this._delegate.editBoxEditingDidBegan();
    }
    endEditing() {
    }
    _createTextArea() {
        this._isTextArea = true;
        this._elem = WebEditBoxHelper.instance.createTextArea();
    }
    _createInput() {
        this._isTextArea = false;
        this._elem = WebEditBoxHelper.instance.createInput();
    }
    _showDom() {
        WebEditBoxHelper.instance.showDom(this._isTextArea);
        this._updateMaxLength();
        this._updateInputType();
        this._updateStyleSheet();
        //this._delegate._hideLabels();
    }
    _hideDom() {
        if (this._isFocus) {
            WebEditBoxHelper.instance.hideDom();
            //this._delegate._showLabels();
        }
    }
    _updateInputType() {
        let delegate = this._delegate, inputMode = delegate.inputMode, inputFlag = delegate.inputFlag, returnType = delegate.returnType, elem = this._elem;
        // FIX ME: TextArea actually dose not support password type.
        if (this._isTextArea) {
            // input flag
            let textTransform = 'none';
            if (inputFlag === cc.EditBox.InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
                textTransform = 'uppercase';
            }
            else if (inputFlag === cc.EditBox.InputFlag.INITIAL_CAPS_WORD) {
                textTransform = 'capitalize';
            }
            elem.style.textTransform = textTransform;
            return;
        }
        // begin to updateInputType
        if (inputFlag === cc.EditBox.InputFlag.PASSWORD) {
            elem.type = 'password';
            return;
        }
        // input mode
        let type = elem.type;
        if (inputMode === cc.EditBox.InputMode.EMAIL_ADDR) {
            type = 'email';
        }
        else if (inputMode === cc.EditBox.InputMode.NUMERIC || inputMode === cc.EditBox.InputMode.DECIMAL) {
            type = 'number';
        }
        else if (inputMode === cc.EditBox.InputMode.PHONE_NUMBER) {
            type = 'number';
            elem.pattern = '[0-9]*';
        }
        else if (inputMode === cc.EditBox.InputMode.URL) {
            type = 'url';
        }
        else {
            type = 'text';
            if (returnType === cc.EditBox.KeyboardReturnType.SEARCH) {
                type = 'search';
            }
        }
        elem.type = type;
        // input flag
        let textTransform = 'none';
        if (inputFlag === cc.EditBox.InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            textTransform = 'uppercase';
        }
        else if (inputFlag === cc.EditBox.InputFlag.INITIAL_CAPS_WORD) {
            textTransform = 'capitalize';
        }
        elem.style.textTransform = textTransform;
    }
    _updateMaxLength() {
        let maxLength = this._delegate.maxLength;
        if (maxLength < 0) {
            //we can't set Number.MAX_VALUE to input's maxLength property
            //so we use a magic number here, it should works at most use cases.
            maxLength = 65535;
        }
        this._elem.maxLength = maxLength;
    }
    _updateStyleSheet() {
        let delegate = this._delegate, elem = this._elem;
        elem.value = delegate.string;
        elem.placeholder = delegate.placeholder;
    }
    _registerEventListeners() {
        let impl = this, elem = this._elem, inputLock = false, cbs = this._eventListeners;
        cbs.compositionStart = function () {
            inputLock = true;
        };
        cbs.compositionEnd = function () {
            inputLock = false;
            impl._delegate.editBoxTextChanged(elem.value);
        };
        cbs.onInput = function () {
            if (inputLock) {
                return;
            }
            let _elem = elem;
            if (_elem.value.length > _elem.maxLength)
                _elem.value = _elem.value.slice(0, _elem.maxLength);
            impl._delegate.editBoxTextChanged(elem.value);
        };
        cbs.onKeydown = function (e) {
            if (e.keyCode === cc.macro.KEY.enter) {
                e.stopPropagation();
                impl._delegate.editBoxEditingReturn();
                if (!impl._isTextArea) {
                    elem.blur();
                }
            }
            else if (e.keyCode === cc.macro.KEY.tab) {
                e.stopPropagation();
                e.preventDefault();
            }
        };
        cbs.onBlur = function () {
            impl._hideDom();
            impl._isFocus = false;
            Framework_1.Manager.adaptor.isShowKeyboard = false;
            //删除注册事件
            impl._removeEventListeners();
            impl._delegate.editBoxEditingDidEnded();
        };
        elem.addEventListener('compositionstart', cbs.compositionStart);
        elem.addEventListener('compositionend', cbs.compositionEnd);
        elem.addEventListener('input', cbs.onInput);
        elem.addEventListener('keydown', cbs.onKeydown);
        elem.addEventListener('blur', cbs.onBlur);
        elem.addEventListener('touchstart', cbs.onClick);
    }
    _removeEventListeners() {
        let elem = this._elem, cbs = this._eventListeners;
        let len = Object.keys(cbs).length;
        if (len > 0) {
            elem.removeEventListener('compositionstart', cbs.compositionStart);
            elem.removeEventListener('compositionend', cbs.compositionEnd);
            elem.removeEventListener('input', cbs.onInput);
            elem.removeEventListener('keydown', cbs.onKeydown);
            elem.removeEventListener('blur', cbs.onBlur);
            elem.removeEventListener('touchstart', cbs.onClick);
            cbs.compositionStart = null;
            cbs.compositionEnd = null;
            cbs.onInput = null;
            cbs.onKeydown = null;
            cbs.onBlur = null;
            cbs.onClick = null;
            this._eventListeners = {};
        }
    }
}
exports.default = WebEditBoxImpl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvZnJhbWV3b3JrL2V4dGVudGlvbnMvV2ViRWRpdEJveEltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFFdkMsTUFBTSxnQkFBZ0I7SUFBdEI7UUFHWSxVQUFLLEdBQXFCLElBQUksQ0FBQztRQUMvQixhQUFRLEdBQXdCLElBQUksQ0FBQztRQUNyQyxRQUFHLEdBQW1CLElBQUksQ0FBQztJQWlJdkMsQ0FBQztJQXBJVSxNQUFNLEtBQUssUUFBUSxLQUFLLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBSXBHLElBQUk7UUFDQSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2xCLGVBQWU7WUFDZixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDdkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FB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R0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDO0NBRUo7QUFyUUQsaUNBcVFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuLi9GcmFtZXdvcmtcIjtcblxuY2xhc3MgV2ViRWRpdEJveEhlbHBlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBXZWJFZGl0Qm94SGVscGVyID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuX2luc3RhbmNlIHx8ICh0aGlzLl9pbnN0YW5jZSA9IG5ldyBXZWJFZGl0Qm94SGVscGVyKCkpOyB9XG4gICAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IG51bGw7XG4gICAgcHJpdmF0ZSB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IG51bGw7XG4gICAgcHJpdmF0ZSBkaXY6IEhUTUxEaXZFbGVtZW50ID0gbnVsbDtcbiAgICBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5kaXYgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy/liJvlu7rkuIDkuKrlhajpu5HoibLnmoTljYrpgI/mmI7og4zmma9cbiAgICAgICAgICAgIGxldCBkaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgZGl2LnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XG4gICAgICAgICAgICBkaXYuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICBkaXYuc3R5bGUuekluZGV4ID0gXCIxMDAwXCI7XG4gICAgICAgICAgICBkaXYuc3R5bGUuYm90dG9tID0gXCIwcHhcIjtcbiAgICAgICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICAgICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGRpdi5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgICAgICAgICAgIGRpdi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIGRpdi5pZCA9IFwiaW5wdXRfYmFja2dyb3VuZFwiO1xuXG4gICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgICAgICAgdGhpcy5kaXYgPSBkaXY7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnB1dCA9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgaW5wdXQuc3R5bGUuekluZGV4ID0gXCIxMDAxXCJcbiAgICAgICAgICAgIGlucHV0LmlkID0gXCJFZGl0Qm94X0lucHV0XCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLndpZHRoID0gXCI5OCVcIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyID0gXCIycHhcIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gXCJibHVlXCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLnRvcCA9IFwiNXB4XCI7XG4gICAgICAgICAgICBpbnB1dC5zdHlsZS5sZWZ0ID0gXCIxJVwiO1xuICAgICAgICAgICAgaW5wdXQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1cHhcIjtcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmZvbnRTaXplID0gXCIyNXB4XCI7XG4gICAgICAgICAgICAoPGFueT5pbnB1dC5zdHlsZSkudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICAgICAgaW5wdXQuc3R5bGVbJy1tb3otYXBwZWFyYW5jZSddID0gXCJ0ZXh0ZmllbGRcIjtcblxuICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dGFyZWEgPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHRleHRhcmVhID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLnpJbmRleCA9IFwiMTAwMVwiO1xuICAgICAgICAgICAgdGV4dGFyZWEuaWQgPSBcIkVkaXRCb3hfVGV4dGFyZWFcIjtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiXG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS53aWR0aCA9IFwiOTglXCI7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIjtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLmJvcmRlciA9IFwiMnB4XCI7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5ib3JkZXJDb2xvciA9IFwiYmx1ZVwiO1xuICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS50b3AgPSBcIjVweFwiO1xuICAgICAgICAgICAgdGV4dGFyZWEuc3R5bGUubGVmdCA9IFwiMSVcIjtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNXB4XCI7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5yZXNpemUgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gXCIyNXB4XCI7XG4gICAgICAgICAgICAoPGFueT50ZXh0YXJlYS5zdHlsZSkub3ZlcmZsb3dfeSA9IFwic2Nyb2xsXCI7XG4gICAgICAgICAgICB0ZXh0YXJlYS5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xuICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuICAgICAgICAgICAgdGhpcy50ZXh0YXJlYSA9IHRleHRhcmVhO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCB0aGlzLm9uT3JpZW50YXRpb25DaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuaGlkZURvbSgpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBvbk9yaWVudGF0aW9uQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5pbnB1dCkgdGhpcy5pbnB1dC5ibHVyKCk7XG4gICAgICAgIGlmICh0aGlzLnRleHRhcmVhKSB0aGlzLnRleHRhcmVhLmJsdXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkanVzdChyb3RhdGU6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICBpZiAocm90YXRlID09IDAgfHwgcm90YXRlID09IDE4MCkge1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHBhcnNlSW50KGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLmhlaWdodCk7XG4gICAgICAgICAgICBsZXQgcmF0ZSA9IDAuOTA7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBoZWlnaHQgKiByYXRlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc3R5bGUudG9wID0gYCR7d2lkdGggLyAyfXB4YDtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKC05MGRlZylcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnN0eWxlLmxlZnQgPSBgLSR7d2lkdGggLyAyIC0gMzB9cHhgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dGFyZWEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRhcmVhLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dGFyZWEuc3R5bGUudG9wID0gYCR7d2lkdGggLyAyfXB4YDtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRhcmVhLnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKC05MGRlZylcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRhcmVhLnN0eWxlLmxlZnQgPSBgLSR7d2lkdGggLSA1MH1weGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc3R5bGUud2lkdGggPSBcIjk4JVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXQuc3R5bGUudG9wID0gXCI1cHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0LnN0eWxlLnRyYW5zZm9ybSA9IFwicm90YXRlKDBkZWcpXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dC5zdHlsZS5sZWZ0ID0gXCIxJVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dGFyZWEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRhcmVhLnN0eWxlLndpZHRoID0gXCI5OCVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRhcmVhLnN0eWxlLnRvcCA9IFwiNXB4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0YXJlYS5zdHlsZS50cmFuc2Zvcm0gPSBcInJvdGF0ZSgwZGVnKVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dGFyZWEuc3R5bGUubGVmdCA9IFwiMSVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVRleHRBcmVhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0YXJlYTtcbiAgICB9XG5cbiAgICBjcmVhdGVJbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQ7XG4gICAgfVxuXG4gICAgaGlkZURvbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGl2KSB7IHRoaXMuZGl2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiOyB9XG4gICAgICAgIGlmICh0aGlzLmlucHV0KSB7IHRoaXMuaW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7IH1cbiAgICAgICAgaWYgKHRoaXMudGV4dGFyZWEpIHsgdGhpcy50ZXh0YXJlYS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjsgfVxuICAgIH1cblxuICAgIHNob3dEb20oaXNUZXh0QXJlYTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5pbnB1dCAmJiB0aGlzLnRleHRhcmVhKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXYpIHsgdGhpcy5kaXYuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiOyB9XG4gICAgICAgICAgICB0aGlzLmlucHV0LnN0eWxlLnZpc2liaWxpdHkgPSBpc1RleHRBcmVhID8gXCJoaWRkZW5cIiA6IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgdGhpcy50ZXh0YXJlYS5zdHlsZS52aXNpYmlsaXR5ID0gaXNUZXh0QXJlYSA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIHRoaXMuYWRqdXN0KHdpbmRvdy5vcmllbnRhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkVkaXRCb3hJbXBsIHtcblxuICAgIHByaXZhdGUgX2RlbGVnYXRlID0gbnVsbDtcbiAgICBwcml2YXRlIF9lbGVtOiBIVE1MRWxlbWVudCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaXNUZXh0QXJlYSA9IGZhbHNlO1xuICAgIC8vIGV2ZW50IGxpc3RlbmVyc1xuICAgIHByaXZhdGUgX2V2ZW50TGlzdGVuZXJzOiBhbnkgPSB7fTtcbiAgICBwcml2YXRlIF9pc0ZvY3VzID0gZmFsc2U7XG5cbiAgICBpbml0KGRlbGVnYXRlKSB7XG4gICAgICAgIGlmICghZGVsZWdhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICBXZWJFZGl0Qm94SGVscGVyLmluc3RhbmNlLmluaXQoKTtcblxuICAgICAgICBpZiAoZGVsZWdhdGUuaW5wdXRNb2RlID09PSBjYy5FZGl0Qm94LklucHV0TW9kZS5BTlkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVRleHRBcmVhKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVJbnB1dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlKCkge1xuICAgICAgICAvL2RvIG5vdGhpbmdcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5faXNGb2N1cykge1xuICAgICAgICAgICAgdGhpcy5fZWxlbS5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBXZWJFZGl0Qm94SGVscGVyLmluc3RhbmNlLmhpZGVEb20oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcblxuICAgIH1cblxuICAgIHNldFRhYkluZGV4KGluZGV4KSB7XG4gICAgICAgIC8vIE9ubHkgc3VwcG9ydCBvbiBXZWIgcGxhdGZvcm1cbiAgICB9XG5cbiAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgLy8gT25seSBzdXBwb3J0IG9uIFdlYiBwbGF0Zm9ybVxuICAgIH1cblxuICAgIHNldEZvY3VzKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5iZWdpbkVkaXRpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRm9jdXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRm9jdXNlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRm9jdXM7XG4gICAgfVxuXG4gICAgYmVnaW5FZGl0aW5nKCkge1xuICAgICAgICB0aGlzLl9pc0ZvY3VzID0gdHJ1ZTtcbiAgICAgICAgTWFuYWdlci5hZGFwdG9yLmlzU2hvd0tleWJvYXJkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2hvd0RvbSgpO1xuICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMuX2VsZW0uZm9jdXMoKTtcblxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5lZGl0Qm94RWRpdGluZ0RpZEJlZ2FuKCk7XG4gICAgfVxuXG4gICAgZW5kRWRpdGluZygpIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVRleHRBcmVhKCkge1xuICAgICAgICB0aGlzLl9pc1RleHRBcmVhID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZWxlbSA9IFdlYkVkaXRCb3hIZWxwZXIuaW5zdGFuY2UuY3JlYXRlVGV4dEFyZWEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5faXNUZXh0QXJlYSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbGVtID0gV2ViRWRpdEJveEhlbHBlci5pbnN0YW5jZS5jcmVhdGVJbnB1dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dEb20oKSB7XG4gICAgICAgIFdlYkVkaXRCb3hIZWxwZXIuaW5zdGFuY2Uuc2hvd0RvbSh0aGlzLl9pc1RleHRBcmVhKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF4TGVuZ3RoKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUlucHV0VHlwZSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdHlsZVNoZWV0KCk7XG4gICAgICAgIC8vdGhpcy5fZGVsZWdhdGUuX2hpZGVMYWJlbHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oaWRlRG9tKCkge1xuICAgICAgICBpZiAodGhpcy5faXNGb2N1cykge1xuICAgICAgICAgICAgV2ViRWRpdEJveEhlbHBlci5pbnN0YW5jZS5oaWRlRG9tKCk7XG4gICAgICAgICAgICAvL3RoaXMuX2RlbGVnYXRlLl9zaG93TGFiZWxzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVJbnB1dFR5cGUoKSB7XG4gICAgICAgIGxldCBkZWxlZ2F0ZSA9IHRoaXMuX2RlbGVnYXRlLFxuICAgICAgICAgICAgaW5wdXRNb2RlID0gZGVsZWdhdGUuaW5wdXRNb2RlLFxuICAgICAgICAgICAgaW5wdXRGbGFnID0gZGVsZWdhdGUuaW5wdXRGbGFnLFxuICAgICAgICAgICAgcmV0dXJuVHlwZSA9IGRlbGVnYXRlLnJldHVyblR5cGUsXG4gICAgICAgICAgICBlbGVtID0gdGhpcy5fZWxlbTtcblxuICAgICAgICAvLyBGSVggTUU6IFRleHRBcmVhIGFjdHVhbGx5IGRvc2Ugbm90IHN1cHBvcnQgcGFzc3dvcmQgdHlwZS5cbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEFyZWEpIHtcbiAgICAgICAgICAgIC8vIGlucHV0IGZsYWdcbiAgICAgICAgICAgIGxldCB0ZXh0VHJhbnNmb3JtID0gJ25vbmUnO1xuICAgICAgICAgICAgaWYgKGlucHV0RmxhZyA9PT0gY2MuRWRpdEJveC5JbnB1dEZsYWcuSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTKSB7XG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybSA9ICd1cHBlcmNhc2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXRGbGFnID09PSBjYy5FZGl0Qm94LklucHV0RmxhZy5JTklUSUFMX0NBUFNfV09SRCkge1xuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm0gPSAnY2FwaXRhbGl6ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSB0ZXh0VHJhbnNmb3JtO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYmVnaW4gdG8gdXBkYXRlSW5wdXRUeXBlXG4gICAgICAgIGlmIChpbnB1dEZsYWcgPT09IGNjLkVkaXRCb3guSW5wdXRGbGFnLlBBU1NXT1JEKSB7XG4gICAgICAgICAgICAoPGFueT5lbGVtKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlucHV0IG1vZGVcbiAgICAgICAgbGV0IHR5cGUgPSAoPGFueT5lbGVtKS50eXBlO1xuICAgICAgICBpZiAoaW5wdXRNb2RlID09PSBjYy5FZGl0Qm94LklucHV0TW9kZS5FTUFJTF9BRERSKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2VtYWlsJztcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dE1vZGUgPT09IGNjLkVkaXRCb3guSW5wdXRNb2RlLk5VTUVSSUMgfHwgaW5wdXRNb2RlID09PSBjYy5FZGl0Qm94LklucHV0TW9kZS5ERUNJTUFMKSB7XG4gICAgICAgICAgICB0eXBlID0gJ251bWJlcic7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXRNb2RlID09PSBjYy5FZGl0Qm94LklucHV0TW9kZS5QSE9ORV9OVU1CRVIpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnbnVtYmVyJztcbiAgICAgICAgICAgICg8YW55PmVsZW0pLnBhdHRlcm4gPSAnWzAtOV0qJztcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dE1vZGUgPT09IGNjLkVkaXRCb3guSW5wdXRNb2RlLlVSTCkge1xuICAgICAgICAgICAgdHlwZSA9ICd1cmwnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHlwZSA9ICd0ZXh0JztcblxuICAgICAgICAgICAgaWYgKHJldHVyblR5cGUgPT09IGNjLkVkaXRCb3guS2V5Ym9hcmRSZXR1cm5UeXBlLlNFQVJDSCkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAnc2VhcmNoJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoPGFueT5lbGVtKS50eXBlID0gdHlwZTtcblxuICAgICAgICAvLyBpbnB1dCBmbGFnXG4gICAgICAgIGxldCB0ZXh0VHJhbnNmb3JtID0gJ25vbmUnO1xuICAgICAgICBpZiAoaW5wdXRGbGFnID09PSBjYy5FZGl0Qm94LklucHV0RmxhZy5JTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMpIHtcbiAgICAgICAgICAgIHRleHRUcmFuc2Zvcm0gPSAndXBwZXJjYXNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dEZsYWcgPT09IGNjLkVkaXRCb3guSW5wdXRGbGFnLklOSVRJQUxfQ0FQU19XT1JEKSB7XG4gICAgICAgICAgICB0ZXh0VHJhbnNmb3JtID0gJ2NhcGl0YWxpemUnO1xuICAgICAgICB9XG4gICAgICAgIGVsZW0uc3R5bGUudGV4dFRyYW5zZm9ybSA9IHRleHRUcmFuc2Zvcm07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTWF4TGVuZ3RoKCkge1xuICAgICAgICBsZXQgbWF4TGVuZ3RoID0gdGhpcy5fZGVsZWdhdGUubWF4TGVuZ3RoO1xuICAgICAgICBpZiAobWF4TGVuZ3RoIDwgMCkge1xuICAgICAgICAgICAgLy93ZSBjYW4ndCBzZXQgTnVtYmVyLk1BWF9WQUxVRSB0byBpbnB1dCdzIG1heExlbmd0aCBwcm9wZXJ0eVxuICAgICAgICAgICAgLy9zbyB3ZSB1c2UgYSBtYWdpYyBudW1iZXIgaGVyZSwgaXQgc2hvdWxkIHdvcmtzIGF0IG1vc3QgdXNlIGNhc2VzLlxuICAgICAgICAgICAgbWF4TGVuZ3RoID0gNjU1MzU7XG4gICAgICAgIH1cbiAgICAgICAgKDxhbnk+dGhpcykuX2VsZW0ubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVN0eWxlU2hlZXQoKSB7XG4gICAgICAgIGxldCBkZWxlZ2F0ZSA9IHRoaXMuX2RlbGVnYXRlLFxuICAgICAgICAgICAgZWxlbSA9IHRoaXMuX2VsZW07XG4gICAgICAgICg8YW55PmVsZW0pLnZhbHVlID0gZGVsZWdhdGUuc3RyaW5nO1xuICAgICAgICAoPGFueT5lbGVtKS5wbGFjZWhvbGRlciA9IGRlbGVnYXRlLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfcmVnaXN0ZXJFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGltcGwgPSB0aGlzLFxuICAgICAgICAgICAgZWxlbSA9IHRoaXMuX2VsZW0sXG4gICAgICAgICAgICBpbnB1dExvY2sgPSBmYWxzZSxcbiAgICAgICAgICAgIGNicyA9IHRoaXMuX2V2ZW50TGlzdGVuZXJzO1xuXG4gICAgICAgIGNicy5jb21wb3NpdGlvblN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5wdXRMb2NrID0gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjYnMuY29tcG9zaXRpb25FbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbnB1dExvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIGltcGwuX2RlbGVnYXRlLmVkaXRCb3hUZXh0Q2hhbmdlZCgoPGFueT5lbGVtKS52YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2JzLm9uSW5wdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXRMb2NrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgX2VsZW06IGFueSA9IGVsZW07XG5cbiAgICAgICAgICAgIGlmIChfZWxlbS52YWx1ZS5sZW5ndGggPiBfZWxlbS5tYXhMZW5ndGgpIF9lbGVtLnZhbHVlID0gX2VsZW0udmFsdWUuc2xpY2UoMCwgX2VsZW0ubWF4TGVuZ3RoKTtcblxuICAgICAgICAgICAgaW1wbC5fZGVsZWdhdGUuZWRpdEJveFRleHRDaGFuZ2VkKCg8YW55PmVsZW0pLnZhbHVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjYnMub25LZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IGNjLm1hY3JvLktFWS5lbnRlcikge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaW1wbC5fZGVsZWdhdGUuZWRpdEJveEVkaXRpbmdSZXR1cm4oKTtcblxuICAgICAgICAgICAgICAgIGlmICghaW1wbC5faXNUZXh0QXJlYSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtLmJsdXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IGNjLm1hY3JvLktFWS50YWIpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjYnMub25CbHVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1wbC5faGlkZURvbSgpO1xuICAgICAgICAgICAgaW1wbC5faXNGb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgTWFuYWdlci5hZGFwdG9yLmlzU2hvd0tleWJvYXJkID0gZmFsc2U7XG4gICAgICAgICAgICAvL+WIoOmZpOazqOWGjOS6i+S7tlxuICAgICAgICAgICAgaW1wbC5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGltcGwuX2RlbGVnYXRlLmVkaXRCb3hFZGl0aW5nRGlkRW5kZWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uc3RhcnQnLCBjYnMuY29tcG9zaXRpb25TdGFydCk7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCBjYnMuY29tcG9zaXRpb25FbmQpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2JzLm9uSW5wdXQpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjYnMub25LZXlkb3duKTtcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgY2JzLm9uQmx1cik7XG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNicy5vbkNsaWNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtLFxuICAgICAgICAgICAgY2JzID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnM7XG5cbiAgICAgICAgbGV0IGxlbiA9IE9iamVjdC5rZXlzKGNicykubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbnN0YXJ0JywgY2JzLmNvbXBvc2l0aW9uU3RhcnQpO1xuICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbmVuZCcsIGNicy5jb21wb3NpdGlvbkVuZCk7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2JzLm9uSW5wdXQpO1xuICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2JzLm9uS2V5ZG93bik7XG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBjYnMub25CbHVyKTtcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNicy5vbkNsaWNrKTtcblxuICAgICAgICAgICAgY2JzLmNvbXBvc2l0aW9uU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgY2JzLmNvbXBvc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgICAgIGNicy5vbklucHV0ID0gbnVsbDtcbiAgICAgICAgICAgIGNicy5vbktleWRvd24gPSBudWxsO1xuICAgICAgICAgICAgY2JzLm9uQmx1ciA9IG51bGw7XG4gICAgICAgICAgICBjYnMub25DbGljayA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9ldmVudExpc3RlbmVycyA9IHt9O1xuICAgICAgICB9XG4gICAgfVxuXG59Il19