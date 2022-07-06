#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import sys
import getopt
import webbrowser
import json

COMMAND_PATH = os.getcwd()
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

os.chdir(CURRENT_PATH)

# 公牌位置
BOARD_CARD_INDEX = 4
# 公牌花色（♥=0，♦=1，♠=2，♣=3）
BOARD_CARD_SUIT = 3

def main():
    filelist = os.listdir()

    point = 0

    curr_path = os.getcwd()

    for i in range(len(filelist)):
        new_filename = ""
        filename = filelist[i]

        full_path = os.path.realpath(os.path.join(curr_path, filename))

        if filename == "sprite_cancel_trim.py":
            continue

        suffix = filename[filename.rfind("."):]

        if suffix != ".meta":
            continue

        file_content = ""
        with open(full_path, "r", encoding="utf-8") as fd:
            file_content = fd.read()

        json_content = json.loads(file_content)

        subMetas = json_content["subMetas"]
        if not subMetas:
            return
        
        name = os.path.basename(filename)
        card_name = name.replace(".png.meta", "")

        fileobj = subMetas[card_name]

        if not fileobj:
            print("第二错误")
            return

        fileobj["trimType"] = "none"
        fileobj["offsetX"] = 0
        fileobj["offsetY"] = 0
        fileobj["trimX"] = 0
        fileobj["trimY"] = 0
        fileobj["width"] = fileobj["rawWidth"]
        fileobj["height"] = fileobj["rawHeight"]

        new_content = json.dumps(json_content, indent=4)

        with open(full_path, "w", encoding="utf-8") as fd:
            fd.write(new_content)
        

if __name__ == "__main__":
    main()
