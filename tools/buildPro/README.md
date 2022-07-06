# 安卓自动打包构建


# 打资源包 依赖 creator 2.4.2, nodejs , Python27 
# 打包apk 依赖 jdk1.8 , SDK : API Level : android-29 ，build-tools ：28.0.3 , NDK : android-ndk-r18b , gradle-4.10.3-all

## 在项目目录下执行以下 初始化 npm 环境 
npm install -d shelljs
npm install -d jszip
	
	
#  projectConfig.json 配置项目路径和creator安装路径
#  build-pro 目录下 build_Base.bat为自动构建热更资源或打apk包资源 , build_Apk.bat 为打安卓渠道0包 


## 注意打apk 渠道包之前，一定是先执行 build_Base.bat 生成打包资源


## 打渠道包  channel 目录下为渠道配置信息

##  defaultCfg目录 为默认渠道配置信息（注意 defaultCfg目录里的配置 应与 build-templates/jsb-default里的配置保持一致）若是渠道包包名等配置信息未变,则不用添加渠道配置，直接使用默认渠道配置即可。
##  若要打新渠道新包名，则需要配置新渠道信息 ,配置信息可参考 ‘示例渠道’ ,可直接复制 ‘示例渠道’ 把文件名称修改为新渠道号，例如：复制‘示例渠道’ 把名称修改为新渠道号 ‘2’ ,并对其内容进行相应修改即可。


## 打渠道包 执行 node buildApk.js + 渠道   如 ：  node buildApk.js 0  （多渠道 各渠道之间用‘#’ 连接 如： node buildApk.js 0#1#2 ） 

