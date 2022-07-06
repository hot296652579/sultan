
package com.threeoctopus.ShareHelpder.whatsapp;


import com.threeoctopus.ShareHelpder.ShareBase.ShareBase;

public class WhatsappShare {
    static final String packageName = "com.whatsapp";

    public static int shareTest(String text) {
        int errCode = ShareBase.shareTest(text, packageName);
        return errCode;
    }
    public static int shareImage(String imagePath) {
        int errCode = ShareBase.shareImage(imagePath, packageName);
        return errCode;
    }
}