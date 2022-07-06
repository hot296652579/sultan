/**
 * 
 * 打包APK  
 */

require('shelljs/global'); 
var path = require('path')
let fs = require("fs");
let buildcfg = require("./cfg/build-native-config.json");
let channelIdList = process.argv[2];
if (!channelIdList) {
    channelIdList = "0"
    console.error('渠道id默认 0');
}

let getBuildCfgValueByKey = function(key) {
    return buildcfg[key].value;
};
let _mkdirSync = function (dir) {
    try {
        fs.mkdirSync(dir)
    } catch (e) {
        if ("EEXIST" !== e.code) throw e
    }
}
function createAPK(channelId){  
    
    exec(`node cpCfg.js ${channelId}`);

    if (channelIds[0]) channelIds.splice(0, 1)
    // android 项目路径
    let androidProPath = `../../../build/jsb-${getBuildCfgValueByKey("template")}/frameworks/runtime-src/proj.android-studio`;

    let ConstDefine = path.join(`${androidProPath}/src/org/cocos2dx/javascript/`, "ConstDefine.java");
    let grable = path.join(`${androidProPath}/app/`, "build.gradle");
    // console.log("写入渠道ID:",channelId);
    fs.readFile(ConstDefine, "utf8", function (error, content) {
        if (error) {
            console.error(error);
        } else {
            console.log("写入渠道ID:",channelId);
            content = content.replace(/APP_QUDAO_ID = \d+/g, `APP_QUDAO_ID = ${channelId}`)
            fs.writeFile(ConstDefine, content, function (e) {
                if (error) throw error;
                console.log("修改渠道ID完成")
                console.log('开始生成apk！！！',channelId);
                // 打包命令
                exec(`cd ${androidProPath} && gradle assemblerelease`);
            
                console.log('结束生成apk！！！');

                fs.readFile(grable, "utf8", function (error, content) {
                    if (error) {
                        console.error(error);
                    } else {
                        let verstion = content.substring(content.indexOf("versionName"),content.indexOf("versionName")+25).trim().split(" ") 
                        var reg = /^['|"](.*)['|"]$/;
                        let v = verstion[1].replace(reg, "$1")
                        let apkName=`TopEntertainment-release${v}_${channelId}.apk`
                        cp(`-rf`, `${androidProPath}/app/build/outputs/apk/release/btgame-release.apk`,`../../../packVersion/output/${apkName}`);
                        console.log('生成成功apk！！！',apkName);

                        if(channelIds.length > 0){
                            createAPK(channelIds[0]);
                        }
                    }
                })
               
            })
        }
    })
} 

// exec(` rm -r -f output && mkdir output`);
_mkdirSync('../../../packVersion/output');
let channelIds = channelIdList.split('#')
createAPK(channelIds[0]);
