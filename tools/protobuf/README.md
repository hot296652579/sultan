# Protobuf 生成序列化文件

## 需要环境

1. [npm（nodejs）](https://nodejs.org/dist/v14.15.3/node-v14.15.3-x64.msi)
2. [python 3.x 版本](https://www.python.org/ftp/python/3.7.8/python-3.7.8-amd64.exe)


## 初始化 npm 环境

```
npm install
```

## 初始化子仓库

```
git submodule init

git submodule update
```

## 拉取子仓库

```
git submodule foreach git pull
```

## 执行序列化批处理

* 在项目根目录执行
```
python tools/protobuf/pb2ts.py
```