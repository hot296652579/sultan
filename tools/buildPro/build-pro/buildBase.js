/**
 * 完成构建_jsb-default
 * 生成热更新资源
 * 用于 热更 或 打包APK
 */

require('shelljs/global');

console.log('-------------------------------------------------------------------1-build-pro appBase.js开始');

let fs = require("fs");
let path = require("path");
var JSZip = require('jszip');
let buildcfg = require("./cfg/build-native-config.json");
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



//更新 main.js
let updateMainJS = function () {
    let i = path.join(`../../../build/jsb-${getBuildCfgValueByKey("template")}`, "main.js");
    console.log("修改main.js-HotUpdateSearchPaths");
    fs.readFile(i, "utf8", function (error, content) {
        if (error) {
            console.error(error);
        } else {
            content = content.replace(/if\s*\(\s*window.jsb\)\s*\{/g, `if (window.jsb) {
    var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');
    if (hotUpdateSearchPaths) {
        jsb.fileUtils.setSearchPaths(JSON.parse(hotUpdateSearchPaths));
    }`)
            fs.writeFile(i, content, function (e) {
                if (error) throw error;
                console.log("修改main.js-HotUpdateSearchPaths完成")
            })
        }

    })
}
//资源png 加密
let endocePng = function () {
    exec(`cd ${projectPath} && python tools/encode/encode.py`);
    console.log("资源png 加密完成")
}

//生成热更新文件
let _gamesPath = `${projectPath}/packages/config/games.json`;
let resourceRootDir = `${projectPath}/build/jsb-${getBuildCfgValueByKey("template")}`
// let genManifestDir = path.join(projectPath, "hot-update-tools-manifestOutPut");
let localServerPath = ``
let curNum = 0;
let totalNum = 0;
let _gamesConfig = fs.readFileSync(_gamesPath);
_gamesConfig = JSON.parse(_gamesConfig);
console.log(_gamesConfig)
let _subGameVersion = {};
let _subGameServerVersion = {};
let _hallVersion = `1`;//大厅版本
let _serverRootDir = ``;//热更新地址
if (_gamesConfig) {
    _serverRootDir = _gamesConfig.packageUrl;
}
//子游戏是否包含
let _subGameInclude = {};
for (let i = 0; i < _gamesConfig.games.length; i++) {
    let gameInfo = _gamesConfig.games[i];
    if (gameInfo.dir && gameInfo.dir.length > 0) {
        _subGameVersion[`${gameInfo.dir}`] = gameInfo.version;
        _subGameInclude[`${gameInfo.dir}`] = gameInfo.includeApk;
        _subGameServerVersion[`${gameInfo.dir}`] = '-';

    }
    if (gameInfo.id == "0") {
        _hallVersion = gameInfo.version;
    }
}
let _delDir = function (e) {
    let t = function (e) {
        let i = fs.readdirSync(e);
        for (let s in i) {
            let r = path.join(e, i[s]);
            fs.statSync(r).isDirectory() ? t(r) : fs.unlinkSync(r)
        }
    },
        i = function (t) {
            let s = fs.readdirSync(t);
            if (s.length > 0) {
                for (let e in s) {
                    let r = path.join(t, s[e]);
                    i(r)
                }
                t !== e && fs.rmdirSync(t)
            } else t !== e && fs.rmdirSync(t)
        };
    t(e), i(e)
}
let _mkdirSync = function (dir) {
    try {
        fs.mkdirSync(dir)
    } catch (e) {
        if ("EEXIST" !== e.code) throw e
    }
}
let _readDir = function (dir, obj, source) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir),
        subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            _readDir(subpath, obj, source);
        } else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = require("crypto").createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            //Editor.log(source);
            relative = path.relative(source, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);

            obj[relative] = {
                'size': size,
                'md5': md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}
let _packageDir = function (e, t) {
    let i = fs.readdirSync(e);
    for (let s = 0; s < i.length; s++) {
        let r = i[s],
            o = path.join(e, r),
            n = fs.statSync(o);
        n.isFile() ? t.file(r, fs.readFileSync(o)) : n.isDirectory() && _packageDir(o, t.folder(r))
    }
}
let _getFileNum = function(e){
    let t = 0,
    i = function (e) {
        let s = fs.readdirSync(e);
        for (let r in s) {
            t++;
            let o = path.join(e, s[r]);
            fs.statSync(o).isDirectory() && i(o)
        }
    };
    return i(e), t
}
let _getTotalCopyFileNum = function(){
    let count = _getFileNum(path.join(resourceRootDir, "src")) + _getFileNum(path.join(resourceRootDir, "assets")) + 2;
    //这里需要加上子游戏版本文件个数
    let subgames = Object.keys(_subGameVersion);
    if (subgames.length > 0) {
        count += subgames.length * 2;
    }
    return count;
}
let _addProgress = function() {
    curNum++;
    let e = curNum / totalNum;
    console.log(e)
    e = e || 0, e >= 1 && (console.log("[部署] 部署到指定目录成功:" + localServerPath))
}
let _copySourceDirToDesDir = function (e, t) {
        s = function (e, t, s) {
            fs.exists(t, function (r) {
                r ? s(e, t) : fs.mkdir(t, function () {
                    _addProgress(),s(e, t)
                })
            })
        },
        r = function (e, t) {
            fs.readdir(e, function (o, n) {
                if (o) throw o;
                n.forEach(function (o) {
                    let n, a, l = e + "/" + o,
                        h = t + "/" + o;
                    fs.stat(l, function (e, t) {
                        if (e) throw e;
                        t.isFile() ? (n = fs.createReadStream(l), a = fs.createWriteStream(h), n.pipe(a),_addProgress()) : t.isDirectory() && s(l, h, r)
                    })
                })
            })
        };
    s(e, t, r)
}
let _copyFileToLocalServer = function () {
    if (!fs.existsSync(localServerPath)) {
        console.log("本地测试服务器目录不存在:" + localServerPath);
        return;
    }

    let src = path.join(resourceRootDir, "src");
    let res = path.join(resourceRootDir, "assets");
    if (!fs.existsSync(resourceRootDir)) {
        console.log("资源目录不存在: " + resourceRootDir + ", 请先构建项目");
        return;
    }
    if (!fs.existsSync(src)) {
        console.log(resourceRootDir + "不存在src目录, 无法拷贝文件");
        return;
    }
    if (!fs.existsSync(res)) {
        console.log(resourceRootDir + "不存在res目录, 无法拷贝文件");
        return;
    }

    console.log("[部署] 开始拷贝文件到:" + localServerPath);
    console.log("[部署] 删除目录路径: " + localServerPath);
    curNum = 0;
    totalNum = _getTotalCopyFileNum();
    console.log("[部署] 复制文件个数:" + totalNum);
    _delDir(localServerPath);
    //复制src目录
    _copySourceDirToDesDir(src, path.join(localServerPath, "src"));
    //复制res目录
    _copySourceDirToDesDir(res, path.join(localServerPath, "assets"));
    //复制manifest文件
    _copySourceDirToDesDir(path.join(resourceRootDir, "manifest"), path.join(localServerPath, "manifest"));
   
}
let _packageVersion = function () {
    console.log("[Pack] 开始打包版本 ...");
    let jszip = new JSZip(),
        versionManifest = path.join(resourceRootDir + "/manifest", "version.manifest");
    //把包src目录的代码资源
    let src = path.join(resourceRootDir, "src");
    _packageDir(src, jszip.folder("src"));
    //批包assets目录的代码资源
    let assets = path.join(resourceRootDir, "assets");
    _packageDir(assets, jszip.folder("assets"));

    //打包manifest的版本文件
    let manifest = path.join(resourceRootDir, "manifest");
    _packageDir(manifest, jszip.folder("manifest"));

    let mainVersionManifest = fs.readFileSync(versionManifest, "utf-8"),
        mainVersion = JSON.parse(mainVersionManifest).version;
    if (console.log("[Pack] 打包版本:" + mainVersion), mainVersion !== _hallVersion) return void console.log("[Pack] 打包版本和当前填写的版本不一致,出现异常,停止打包!");
    let packZipName = "ver_" + (mainVersion = mainVersion.replace(".", "_")) + ".zip",
        packZipRootPath = path.join(projectPath, "packVersion");
        localServerPath = path.join(packZipRootPath, "server");
        fs.existsSync(packZipRootPath) || fs.mkdirSync(packZipRootPath);
        fs.existsSync(localServerPath) || fs.mkdirSync(localServerPath);
    let packVersionZipPath = path.join(packZipRootPath, packZipName);
    fs.existsSync(packVersionZipPath) && (fs.unlinkSync(packVersionZipPath), console.log("[Pack] 发现该版本的zip, 已经删除!")), jszip.generateNodeStream({
        type: "nodebuffer",
        streamFiles: !0
    }).pipe(fs.createWriteStream(packVersionZipPath)).on("finish", function () {
        console.log("[Pack] 打包成功: " + packVersionZipPath)
        // _copyFileToLocalServer()
        deleSubGame()
    }.bind(this)).on("error", function (e) {
        console.log("[Pack] 打包失败:" + e.message)
    }.bind(this))
}
let _genVersion = function (version, serverRootDir) {
    let games = Object.keys(_subGameVersion);

    let manifest = {
        version: version,
        packageUrl: serverRootDir,
        remoteManifestUrl: "",
        remoteVersionUrl: "",
        assets: {},
        searchPaths: [],
        //games: games //此字段不需要了
    };
    if ("/" === serverRootDir[serverRootDir.length - 1]) {
        manifest.remoteManifestUrl = serverRootDir + "manifest/project.manifest";
        manifest.remoteVersionUrl = serverRootDir + "manifest/version.manifest";
    } else {
        manifest.remoteManifestUrl = serverRootDir + "/manifest/project.manifest";
        manifest.remoteVersionUrl = serverRootDir + "/manifest/version.manifest";
    }
    // let dest = genManifestDir;
    let source = resourceRootDir;
    _readDir(path.join(source, "src"), manifest.assets, source);
    _readDir(path.join(source, "assets/internal"), manifest.assets, source);
    _readDir(path.join(source, "assets/main"), manifest.assets, source);
    _readDir(path.join(source, "assets/resources"), manifest.assets, source);
    // let projectManifest = path.join(dest, "project.manifest");
    // let versionManifest = path.join(dest, "version.manifest");
    // _mkdirSync(dest);

    //生成构建目录下的manifest文件
    let bulidPathManifestDir = `${resourceRootDir}/manifest`;
    if (fs.existsSync(bulidPathManifestDir)) {
        _delDir(bulidPathManifestDir);
    }
    _mkdirSync(bulidPathManifestDir);

    // fs.writeFileSync(projectManifest, JSON.stringify(manifest));
    projectManifest = path.join(bulidPathManifestDir, "project.manifest");
    fs.writeFileSync(projectManifest, JSON.stringify(manifest));

    console.log("[Build] 生成 project.manifest成功");
    delete manifest.assets;
    delete manifest.searchPaths;
    // fs.writeFileSync(versionManifest, JSON.stringify(manifest));
    versionManifest = path.join(bulidPathManifestDir, "version.manifest");
    fs.writeFileSync(versionManifest, JSON.stringify(manifest));
    console.log("[Build] 生成 version.manifest成功");

    //子游戏manifest生成
    // Editor.log("source",source);
    for (let i = 0; i < games.length; i++) {

        let key = games[i];
        let submanifest = {
            version: _subGameVersion[key],
            packageUrl: serverRootDir,
            remoteManifestUrl: "",
            remoteVersionUrl: "",
            assets: {},
            searchPaths: []
        };
        if ("/" === serverRootDir[serverRootDir.length - 1]) {
            submanifest.remoteManifestUrl = `${serverRootDir}manifest/${key}_project.manifest`;
            submanifest.remoteVersionUrl = `${serverRootDir}manifest/${key}_version.manifest`;
        } else {
            submanifest.remoteManifestUrl = `${serverRootDir}/manifest/${key}_project.manifest`;
            submanifest.remoteVersionUrl = `${serverRootDir}/manifest/${key}_version.manifest`;
        }

        _readDir(path.join(source, `assets/${key}`), submanifest.assets, source);

        // let subgameManifest = path.join(dest, `${key}_project.manifest`);
        // fs.writeFileSync(subgameManifest, JSON.stringify(submanifest));
        fs.writeFileSync(path.join(bulidPathManifestDir, `${key}_project.manifest`), JSON.stringify(submanifest));

        console.log(`[Build] 生成 ${key}_project.manifest成功`);
        delete submanifest.assets;
        delete submanifest.searchPaths;
        // let subgameVersionManifest = path.join(dest, `${key}_version.manifest`);
        // fs.writeFileSync(subgameVersionManifest, JSON.stringify(submanifest));
        fs.writeFileSync(path.join(bulidPathManifestDir, `${key}_version.manifest`), JSON.stringify(submanifest));
        console.log(`[Build] 生成 ${key}_version.manifest成功`);
    }
    _packageVersion()
}
/**
 * 生成Manifest 文件
 */
let createManifest = function () {

    // if (!fs.existsSync(genManifestDir)) {
    //     _mkdirSync(genManifestDir);
    // }
    _genVersion(_hallVersion, _serverRootDir);

}
/**
 * 剔除子游戏
 */
let deleSubGame = function () {
    let games = Object.keys(_subGameVersion);
    let isFind = false;
    console.log(`删除子游戏`);
    for (let i = 0; i < games.length; i++) {
        let game = games[i];
        if (!_subGameInclude[game]) {
            isFind = true;

            let gamePath = path.join(resourceRootDir, "assets");
            gamePath = path.join(gamePath, game);
            if (fs.existsSync(gamePath)) {
                //删除子游戏代码及资源
                _delDir(gamePath)
                fs.rmdirSync(gamePath)
                console.log(`删除子游戏${game} : ${gamePath}`);
                //删除子游戏 版本控制文件
                let versionManifestPath = path.join(resourceRootDir, `manifest/${game}_version.manifest`);
                if (fs.existsSync(versionManifestPath)) {
                    fs.unlinkSync(versionManifestPath)
                    console.log(`删除子游戏${game} : ${versionManifestPath}`);
                }

                let projectManifestPath = path.join(resourceRootDir, `manifest/${game}_project.manifest`);
                if (fs.existsSync(projectManifestPath)) {
                    fs.unlinkSync(projectManifestPath)
                    console.log(`删除子游戏${game} : ${projectManifestPath}`);
                }
            } else {
                console.log(`子游戏${game}已经删除`);
            }

        }
    }
    if (!isFind) {
        console.log("没有子游戏需要剔除")
    }else{
        console.log(`删除子游戏完成`);
    }
}
let main = function () {
    // 资源构建
    console.error("资源构建...");
    rm(`-rf`, `keystore/keystore.keystore`); 
    cp(`-rf`, `../../../keystore/keystore.keystore`, `./keystore/`); 
    // cp(`-rf`, `../../../keystore/keystore.keystore`, `../../../build/jsb-default/frameworks/runtime-src/proj.android-studio/app/keystore/`); 

    console.log(CCCInstallRoute);
    exec(`${CCCInstallRoute} --path ../../../ --build \"${buildShellDict.join(";")}\"`);
    updateMainJS()
    endocePng()
    createManifest()

    console.log('-------------------------------------------------------------------1-build-pro appBase.js end');
}
main()




