package com.threeoctopus.ShareHelpder.instagram;

import com.threeoctopus.ShareHelpder.ShareBase.ShareBase;


public class InstagramShare {

    static final String packageName = "com.instagram.android";
    public static int shareTest(String text) {
        int errCode = ShareBase.shareTest(text, packageName);
        return errCode;
    }
    public static int shareImage(String imagePath) {
        int errCode = ShareBase.shareImage(imagePath, packageName);
        return errCode;
    }

}
