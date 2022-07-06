#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import sys
import getopt
import webbrowser

COMMAND_PATH = os.getcwd()
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

os.chdir(CURRENT_PATH)

PB_EXECUTE_PATH = os.path.abspath(
    os.path.join(CURRENT_PATH, "..", "..", "node_modules", ".bin")
)
PBJS_WINDOWS_EXECUTE_PATH = os.path.join(PB_EXECUTE_PATH, "pbjs.cmd")
PBJS_LINUX_EXECUTE_PATH = os.path.join(PB_EXECUTE_PATH, "pbjs")
PBTS_WINDOWS_EXECUTE_PATH = os.path.join(PB_EXECUTE_PATH, "pbts.cmd")
PBTS_LINUX_EXECUTE_PATH = os.path.join(PB_EXECUTE_PATH, "pbts")
PROTO_INPUT_PATH = os.path.relpath(
    os.path.join(CURRENT_PATH, "..", "..", "protobuf", "*.proto")
)
PROTO_OUTPUT_PATH = os.path.join(CURRENT_PATH, "..", "..", "assets", "script", "framework", "external")
JS_PATH = os.path.relpath(os.path.join(PROTO_OUTPUT_PATH, "protoc.js"))
TS_PATH = os.path.relpath(os.path.join(PROTO_OUTPUT_PATH, "protoc.d.ts"))

MAKE_JS_COMMAND = "%s -t static-module -w commonjs --no-verify --no-convert --no-delimited --no-beautify -o %s %s"
MAKE_TS_COMMAND = "%s -o %s %s"


def make_js(pbjs):
    os.system(MAKE_JS_COMMAND % (pbjs, JS_PATH, PROTO_INPUT_PATH))


def make_ts(pbts):
    os.system(MAKE_TS_COMMAND % (pbts, TS_PATH, JS_PATH))

def change_js():
    js_content = None
    with open(JS_PATH, "r", encoding="utf-8") as fd:
        js_content = fd.read()
        js_content = js_content.replace("var $protobuf = require(\"protobufjs/minimal\");", "var $protobuf = protobuf;")
    with open(JS_PATH, "w", encoding="utf-8") as fd:
        fd.write(js_content)

def main():
    pbjs_execute_path = ""
    pbts_execute_path = ""

    if sys.platform.startswith("win32") or sys.platform.startswith("cygwin"):
        pbjs_execute_path = PBJS_WINDOWS_EXECUTE_PATH
        pbts_execute_path = PBTS_WINDOWS_EXECUTE_PATH
    elif (
        sys.platform.startswith("aix")
        or sys.platform.startswith("linux")
        or sys.platform.startswith("darwin")
    ):
        pbjs_execute_path = PBJS_LINUX_EXECUTE_PATH
        pbts_execute_path = PBTS_LINUX_EXECUTE_PATH
    else:
        print("未知系统，无法自动生成 proto 文件")
        exit(-1)

    make_js(pbjs_execute_path)
    make_ts(pbts_execute_path)
    print(os.path.abspath(JS_PATH))
    print(os.path.abspath(TS_PATH))
    change_js()
    print("proto 文件生成完成")


if __name__ == "__main__":
    main()
