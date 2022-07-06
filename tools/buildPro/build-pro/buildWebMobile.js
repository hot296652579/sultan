/**
 * 完成构建_web-mobile
 * 
 */

require('shelljs/global');

console.log('-------------------------------------------------------------------1-build-pro appBase.js开始');

let fs = require("fs");
let buildcfg = require("./cfg/build-webmobile-config.json");
let proConfig = require('./../projectConfig.json');


if (null == buildcfg) {
    console.error('no find buildcfg.json');
    return;
}
if (null == proConfig) {
    console.error('no find projectConfig.json');
    return;
}

let getBuildCfgValueByKey = function (key) {
    return buildcfg[key].value;
};

let getProjectConfig = function (key) {
    return proConfig[key].value;
}


// 本地 Cocos Creator 安装路径 /Applications/CocosCreator.app
let CCCInstallRoute = getProjectConfig('CCCInstallRoute');
// 本地项目绝对路径
let projectPath = getProjectConfig('CreateorProjectPath');

if (!CCCInstallRoute || CCCInstallRoute === "") {
    console.error("没有配置 Cocos Creator 的安装路径 ...");
    return;
};
if (!projectPath || projectPath === "") {
    console.error("没有配置当前项目路径 ...");
    return;
};


let buildShellDict = [];
for (let key in buildcfg) {
    buildShellDict.push(`${key}=${buildcfg[key].value}`);
};

// let key = 'packageName';
// let value = 'com.bt.game';
// let keystorePath = 'keystorePath';
// let keystorePathValue = `${projectPath}/keystore/keystore.keystore`;
// buildShellDict.push(`${key}=${value}`);
// buildShellDict.push(`${keystorePath}=${keystorePathValue}`);
console.error(JSON.stringify(buildShellDict));


//生成热更新文件
let _gamesPath = `${projectPath}/packages/config/games.json`;
let _gamesConfig = fs.readFileSync(_gamesPath);
_gamesConfig = JSON.parse(_gamesConfig);
console.log(_gamesConfig)

let main = function () {
    // 资源构建
    console.error("资源构建...");
    console.log(CCCInstallRoute);
    exec(`${CCCInstallRoute} --path ../../../ --build \"${buildShellDict.join(";")}\"`);
    console.log('-------------------------------------------------------------------1-build-pro appBase.js end');
}
main()




