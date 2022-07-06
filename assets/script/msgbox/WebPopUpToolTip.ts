class _WebPopUpTipTool {
  contentWindow = null;
  init(webView) {
    //   this.initHtmlHuanJin();
    //   this.contentWindow = webView._impl._iframe.contentWindow;

    //  功能未完善 暂时也用不上
  }
  showTip(string) {

    this.postMessage({ key: "showTip", msg: string })
  }

  showDialog(title, content, next?, cancel?, cancleText?, conmfirmText?, showclose = true, autoclose = true) {


    this.postMessage({ key: "showDialog", msgobj: { title, content, next, cancel, cancleText, conmfirmText } })
  }
  showMsgBox(title, content, next?, confirm_label?, showclose = true, autoclose = true) {
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

</html>`
    var iframe = document.getElementsByTagName('iframe')[1]
    iframe.src = "data:text/html;charset=utf-8," + escape(htmlStr);
    iframe.style.pointerEvents = 1 ? 'none' : ''
  }
}
export let WebPopUpTipTool = new _WebPopUpTipTool();


