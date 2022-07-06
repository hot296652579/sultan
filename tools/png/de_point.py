#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import sys
import getopt
import webbrowser

COMMAND_PATH = os.getcwd()
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

os.chdir(CURRENT_PATH)

def main():
    filelist = os.listdir()

    point = 0

    curr_path = os.getcwd()

    for i in range(len(filelist)):
        new_filename = ""
        filename = filelist[i]

        if filename == "de_point.py":
            continue

        # if i == 0:
        #     new_filename = "card_{_index}_100".format(_index=BOARD_CARD_INDEX)
        # else if i === 1:
        #     new_filename = "card_{_index}_101".format(_index=BOARD_CARD_INDEX)
        # else:
        new_filename = filename.replace("..", ".")
        
        old_filename_full_path = os.path.realpath(os.path.join(curr_path, filelist[i]))
        new_filename_full_path = os.path.realpath(os.path.join(curr_path, new_filename))

        os.rename(old_filename_full_path, new_filename_full_path)
        

if __name__ == "__main__":
    main()
