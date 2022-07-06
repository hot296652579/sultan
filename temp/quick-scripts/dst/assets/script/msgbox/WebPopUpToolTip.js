
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/msgbox/WebPopUpToolTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '05c7bUshJZH643jVpcyss3Z', 'WebPopUpToolTip');
// script/msgbox/WebPopUpToolTip.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPopUpTipTool = void 0;
class _WebPopUpTipTool {
    constructor() {
        this.contentWindow = null;
    }
    init(webView) {
        //   this.initHtmlHuanJin();
        //   this.contentWindow = webView._impl._iframe.contentWindow;
        //  功能未完善 暂时也用不上
    }
    showTip(string) {
        this.postMessage({ key: "showTip", msg: string });
    }
    showDialog(title, content, next, cancel, cancleText, conmfirmText, showclose = true, autoclose = true) {
        this.postMessage({ key: "showDialog", msgobj: { title, content, next, cancel, cancleText, conmfirmText } });
    }
    showMsgBox(title, content, next, confirm_label, showclose = true, autoclose = true) {
        this.showDialog(title, content, next, null, undefined, confirm_label);
    }
    showLoading(content, outTime = 10000) {
    }
    hideLoading() {
    }
    showDisconnectWait() {
    }
    hideDisconnectWait() {
    }
    postMessage(data) {
        this.contentWindow.postMessage(data, "*");
    }
    initHtmlHuanJin() {
        var htmlStr = `
HTMLResult Skip Results Iframe
EDIT ON
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <style tpe="text/css">
    .el-message-box {
      width: 55%
    }

    .el-message-box__title {
      font-size: 3rem;
    }

    .el-message-box__message p {
      font-size: 2rem;
      margin: 0.5rem;
      line-height: 130%
    }

    .el-button span {
      font-size: 2rem;
    }
  </style>
</head>

<body>
  <div id="app">
    <el-button @click="showDialog()">Button</el-button>

  </div>
</body>
<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
  window.vueTool = new Vue({
    el: '#app',
    data: function () {
      return { visible: false }
    },
    mounted(){
        window.addEventListener('message', (msg) => {
            let data = msg ? msg.data : null;
            if (!data) return;
            switch (data.key) {
                case "showTip":
                    this.showTip(data.msg)
                    break;
                case "showDialog":
                    let { title, content, next, cancel, cancleText, conmfirmText } = data.msgobj
                    this.showDialog(title, content, next, cancel, cancleText, conmfirmText );
                    break;
            }
            console.log('aaaaaaaaaa', data);
        })

    },
    methods: {
      showTip(str) {
        this.$message(str);
      },
      showDialog(title, content, next, cancel, cancleText, conmfirmText) {
        this.$confirm(content, title, {
          confirmButtonText: conmfirmText,
          cancelButtonText: cancleText,
          // type: 'warning'
        }).then(() => {
          next && next();
        }).catch(() => {
          cancel && cancel();
        });
      }
    }
  })

</script>

</html>`;
        var iframe = document.getElementsByTagName('iframe')[1];
        iframe.src = "data:text/html;charset=utf-8," + escape(htmlStr);
        iframe.style.pointerEvents = 1 ? 'none' : '';
    }
}
exports.WebPopUpTipTool = new _WebPopUpTipTool();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbXNnYm94L1dlYlBvcFVwVG9vbFRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLGdCQUFnQjtJQUF0QjtRQUNFLGtCQUFhLEdBQUcsSUFBSSxDQUFDO0lBZ0l2QixDQUFDO0lBL0hDLElBQUksQ0FBQyxPQUFPO1FBQ1YsNEJBQTRCO1FBQzVCLDhEQUE4RDtRQUU5RCxnQkFBZ0I7SUFDbEIsQ0FBQztJQUNELE9BQU8sQ0FBQyxNQUFNO1FBRVosSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUssRUFBRSxNQUFPLEVBQUUsVUFBVyxFQUFFLFlBQWEsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxJQUFJO1FBR3ZHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdHLENBQUM7SUFDRCxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFLLEVBQUUsYUFBYyxFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsU0FBUyxHQUFHLElBQUk7UUFDbEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRCxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sR0FBRyxLQUFLO0lBRXBDLENBQUM7SUFDRCxXQUFXO0lBRVgsQ0FBQztJQUNELGtCQUFrQjtJQUVsQixDQUFDO0lBQ0Qsa0JBQWtCO0lBRWxCLENBQUM7SUFDRCxXQUFXLENBQUMsSUFBSTtRQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUU1QyxDQUFDO0lBRUQsZUFBZTtRQUViLElBQUksT0FBTyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFvRlYsQ0FBQTtRQUNKLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2RCxNQUFNLENBQUMsR0FBRyxHQUFHLCtCQUErQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQzlDLENBQUM7Q0FDRjtBQUNVLFFBQUEsZUFBZSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIF9XZWJQb3BVcFRpcFRvb2wge1xuICBjb250ZW50V2luZG93ID0gbnVsbDtcbiAgaW5pdCh3ZWJWaWV3KSB7XG4gICAgLy8gICB0aGlzLmluaXRIdG1sSHVhbkppbigpO1xuICAgIC8vICAgdGhpcy5jb250ZW50V2luZG93ID0gd2ViVmlldy5faW1wbC5faWZyYW1lLmNvbnRlbnRXaW5kb3c7XG5cbiAgICAvLyAg5Yqf6IO95pyq5a6M5ZaEIOaaguaXtuS5n+eUqOS4jeS4ilxuICB9XG4gIHNob3dUaXAoc3RyaW5nKSB7XG5cbiAgICB0aGlzLnBvc3RNZXNzYWdlKHsga2V5OiBcInNob3dUaXBcIiwgbXNnOiBzdHJpbmcgfSlcbiAgfVxuXG4gIHNob3dEaWFsb2codGl0bGUsIGNvbnRlbnQsIG5leHQ/LCBjYW5jZWw/LCBjYW5jbGVUZXh0PywgY29ubWZpcm1UZXh0Pywgc2hvd2Nsb3NlID0gdHJ1ZSwgYXV0b2Nsb3NlID0gdHJ1ZSkge1xuXG5cbiAgICB0aGlzLnBvc3RNZXNzYWdlKHsga2V5OiBcInNob3dEaWFsb2dcIiwgbXNnb2JqOiB7IHRpdGxlLCBjb250ZW50LCBuZXh0LCBjYW5jZWwsIGNhbmNsZVRleHQsIGNvbm1maXJtVGV4dCB9IH0pXG4gIH1cbiAgc2hvd01zZ0JveCh0aXRsZSwgY29udGVudCwgbmV4dD8sIGNvbmZpcm1fbGFiZWw/LCBzaG93Y2xvc2UgPSB0cnVlLCBhdXRvY2xvc2UgPSB0cnVlKSB7XG4gICAgdGhpcy5zaG93RGlhbG9nKHRpdGxlLCBjb250ZW50LCBuZXh0LCBudWxsLCB1bmRlZmluZWQsIGNvbmZpcm1fbGFiZWwpO1xuICB9XG4gIHNob3dMb2FkaW5nKGNvbnRlbnQsIG91dFRpbWUgPSAxMDAwMCkge1xuXG4gIH1cbiAgaGlkZUxvYWRpbmcoKSB7XG5cbiAgfVxuICBzaG93RGlzY29ubmVjdFdhaXQoKSB7XG5cbiAgfVxuICBoaWRlRGlzY29ubmVjdFdhaXQoKSB7XG5cbiAgfVxuICBwb3N0TWVzc2FnZShkYXRhKSB7XG4gICAgdGhpcy5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKGRhdGEsIFwiKlwiKTtcblxuICB9XG5cbiAgaW5pdEh0bWxIdWFuSmluKCkge1xuXG4gICAgdmFyIGh0bWxTdHIgPSBgXG5IVE1MUmVzdWx0IFNraXAgUmVzdWx0cyBJZnJhbWVcbkVESVQgT05cbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPCEtLSBpbXBvcnQgQ1NTIC0tPlxuICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vdW5wa2cuY29tL2VsZW1lbnQtdWkvbGliL3RoZW1lLWNoYWxrL2luZGV4LmNzc1wiPlxuICA8c3R5bGUgdHBlPVwidGV4dC9jc3NcIj5cbiAgICAuZWwtbWVzc2FnZS1ib3gge1xuICAgICAgd2lkdGg6IDU1JVxuICAgIH1cblxuICAgIC5lbC1tZXNzYWdlLWJveF9fdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgIH1cblxuICAgIC5lbC1tZXNzYWdlLWJveF9fbWVzc2FnZSBwIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIG1hcmdpbjogMC41cmVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDEzMCVcbiAgICB9XG5cbiAgICAuZWwtYnV0dG9uIHNwYW4ge1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgIH1cbiAgPC9zdHlsZT5cbjwvaGVhZD5cblxuPGJvZHk+XG4gIDxkaXYgaWQ9XCJhcHBcIj5cbiAgICA8ZWwtYnV0dG9uIEBjbGljaz1cInNob3dEaWFsb2coKVwiPkJ1dHRvbjwvZWwtYnV0dG9uPlxuXG4gIDwvZGl2PlxuPC9ib2R5PlxuPCEtLSBpbXBvcnQgVnVlIGJlZm9yZSBFbGVtZW50IC0tPlxuPHNjcmlwdCBzcmM9XCJodHRwczovL3VucGtnLmNvbS92dWUvZGlzdC92dWUuanNcIj48L3NjcmlwdD5cbjwhLS0gaW1wb3J0IEphdmFTY3JpcHQgLS0+XG48c2NyaXB0IHNyYz1cImh0dHBzOi8vdW5wa2cuY29tL2VsZW1lbnQtdWkvbGliL2luZGV4LmpzXCI+PC9zY3JpcHQ+XG48c2NyaXB0PlxuICB3aW5kb3cudnVlVG9vbCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI2FwcCcsXG4gICAgZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHsgdmlzaWJsZTogZmFsc2UgfVxuICAgIH0sXG4gICAgbW91bnRlZCgpe1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gbXNnID8gbXNnLmRhdGEgOiBudWxsO1xuICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm47XG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNob3dUaXBcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGlwKGRhdGEubXNnKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic2hvd0RpYWxvZ1wiOlxuICAgICAgICAgICAgICAgICAgICBsZXQgeyB0aXRsZSwgY29udGVudCwgbmV4dCwgY2FuY2VsLCBjYW5jbGVUZXh0LCBjb25tZmlybVRleHQgfSA9IGRhdGEubXNnb2JqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RpYWxvZyh0aXRsZSwgY29udGVudCwgbmV4dCwgY2FuY2VsLCBjYW5jbGVUZXh0LCBjb25tZmlybVRleHQgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYWFhYWFhYWFhYScsIGRhdGEpO1xuICAgICAgICB9KVxuXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBzaG93VGlwKHN0cikge1xuICAgICAgICB0aGlzLiRtZXNzYWdlKHN0cik7XG4gICAgICB9LFxuICAgICAgc2hvd0RpYWxvZyh0aXRsZSwgY29udGVudCwgbmV4dCwgY2FuY2VsLCBjYW5jbGVUZXh0LCBjb25tZmlybVRleHQpIHtcbiAgICAgICAgdGhpcy4kY29uZmlybShjb250ZW50LCB0aXRsZSwge1xuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBjb25tZmlybVRleHQsXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogY2FuY2xlVGV4dCxcbiAgICAgICAgICAvLyB0eXBlOiAnd2FybmluZydcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgbmV4dCAmJiBuZXh0KCk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBjYW5jZWwgJiYgY2FuY2VsKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSlcblxuPC9zY3JpcHQ+XG5cbjwvaHRtbD5gXG4gICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpZnJhbWUnKVsxXVxuICAgIGlmcmFtZS5zcmMgPSBcImRhdGE6dGV4dC9odG1sO2NoYXJzZXQ9dXRmLTgsXCIgKyBlc2NhcGUoaHRtbFN0cik7XG4gICAgaWZyYW1lLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAxID8gJ25vbmUnIDogJydcbiAgfVxufVxuZXhwb3J0IGxldCBXZWJQb3BVcFRpcFRvb2wgPSBuZXcgX1dlYlBvcFVwVGlwVG9vbCgpO1xuXG5cbiJdfQ==