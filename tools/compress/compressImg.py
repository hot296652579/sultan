import os
import os.path
from PIL import Image
import sys,getopt
 
# Please reset the root directory Path !
#ImageFilePath = "E:\Resources"
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
print ("CURRENT_PATH:" + CURRENT_PATH)


def getFilesAbsolutelyPath(ImageFilePath):
    currentfiles = os.listdir(ImageFilePath)
    filesVector = []
    for file_name in currentfiles:
        fullPath = os.path.join(ImageFilePath, file_name)
        if os.path.isdir(fullPath):
            newfiles = getFilesAbsolutelyPath(fullPath)
            filesVector.extend(newfiles)
        else:
            filesVector.append(fullPath)
    return filesVector
 

def compressFiles(ImageFilePath):
    filePathVector = getFilesAbsolutelyPath(ImageFilePath)
    pngFile = []
 
    for filename in filePathVector:
        (shotname,extension) = os.path.splitext(filename)
        if extension == ".png":
            im = Image.open(filename)
            if im.mode != "P":
                pngFile.append(filename)
                #print(mode)
     
    # pngquant.exe path
    pngquantPath = os.path.join(CURRENT_PATH,"pngquant.exe -f --ext .png --quality 80-100 ")
    #get .Png File Name
    for filename in pngFile:
        print(filename)
        os.system(pngquantPath+filename)
    print('压缩完成')   

def main():

    argv   =  sys.argv
    #print ("argv:" + argv)
    try:
        opts, args = getopt.getopt(argv[1:], 'p:')
    except getopt.GetoptError as err:
        print(err)
        sys.exit(2)

    for opt, value in opts:
        if opt == "-p":
            param = value

    print ("param:" + param)
    ImageFilePath = os.path.join(CURRENT_PATH, "..", "..", "build", param, "assets")

    print("ImageFilePath:",ImageFilePath)
    compressFiles(ImageFilePath)

# -------------- main --------------
if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(e) 
        sys.exit(1)

