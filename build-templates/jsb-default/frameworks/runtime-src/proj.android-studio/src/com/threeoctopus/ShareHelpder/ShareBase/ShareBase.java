package com.threeoctopus.ShareHelpder.ShareBase;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.support.v4.content.FileProvider;

import org.cocos2dx.javascript.AppActivity;

import java.io.File;

public class ShareBase {
    //    正常的 成功的
    static int NORMAL = 0;
//    沒有裝這個app
    static int NO_INSTAll = 1;
//    其他錯誤
    static int ERREO_ELSE = 2;
    //    文件不存在
    static int NO_FILE = 3;

    static AppActivity getAppActivity() {
        return AppActivity.ccActivity;
    }


    public static int shareTest(String text, String packageName) {
        if (!checkAppInstalled(getAppActivity().getApplicationContext(), packageName)) {
            System.out.print("沒有安裝" + packageName);
            return NO_INSTAll;
        }
        try {
            Intent shareIntent = new Intent();
            shareIntent.setAction(Intent.ACTION_SEND);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(Intent.EXTRA_TEXT, text);
            shareIntent.setPackage(packageName);
            getAppActivity().startActivity(shareIntent);
        } catch (Exception e) {
            e.printStackTrace();
            return ERREO_ELSE;
        }
        return NORMAL;
    }

    public static int shareImage(String imagePath, String packageName) {
        if (!checkAppInstalled(getAppActivity().getApplicationContext(), packageName)) {
            System.out.print("沒有安裝" + packageName);
            return NO_INSTAll;
        }
// imagePath为图片存在的本地路径
// 默认调起跳转ins页面的选择器
        try {
            File imageFile = new File(imagePath);
            if (!imageFile.exists())
                return NO_FILE;
            Intent shareIntent = new Intent();
            shareIntent.setAction(Intent.ACTION_SEND);
            shareIntent.setType("image/*");
            Uri uri;
            if (Build.VERSION.SDK_INT >= 24) {
                uri = FileProvider.getUriForFile(getAppActivity().getApplicationContext(), getAppActivity().getPackageName() + ".fileprovider", imageFile);
            } else {
                uri = Uri.fromFile(imageFile);
            }
            shareIntent.putExtra(Intent.EXTRA_STREAM, uri);
            shareIntent.setPackage(packageName);
            getAppActivity().startActivity(shareIntent);
        } catch (Exception e) {
            e.printStackTrace();
            return ERREO_ELSE;
        }
        return NORMAL;
    }


    private static Boolean checkAppInstalled(Context context, String pkgName) {
        Boolean isInstalled = false;
        if (pkgName == null || pkgName.isEmpty()) {
            isInstalled = false;
        }

        PackageInfo packageInfo = null;
        try {
            packageInfo = context.getPackageManager().getPackageInfo(pkgName, 0);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        if (packageInfo != null) {
            isInstalled = true;
        }
        return isInstalled;
    }
}
