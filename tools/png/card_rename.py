#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import sys
import getopt
import webbrowser

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

        if filename == "rename.py":
            continue

        # if i == 0:
        #     new_filename = "card_{_index}_100".format(_index=BOARD_CARD_INDEX)
        # else if i === 1:
        #     new_filename = "card_{_index}_101".format(_index=BOARD_CARD_INDEX)
        # else:
        suffix = filename[filename.rfind("."):]
        new_filename = "card_{_index}_{_suit}_{_point}{_suffix}".format(_index=BOARD_CARD_INDEX,_suit=BOARD_CARD_SUIT,_point=point,_suffix=suffix)
        point += 1
        
        old_filename_full_path = os.path.realpath(os.path.join(curr_path, filelist[i]))
        new_filename_full_path = os.path.realpath(os.path.join(curr_path, new_filename))

        os.rename(old_filename_full_path, new_filename_full_path)
        

if __name__ == "__main__":
    main()
