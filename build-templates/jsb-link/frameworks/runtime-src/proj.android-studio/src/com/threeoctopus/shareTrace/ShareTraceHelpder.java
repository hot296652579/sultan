package com.threeoctopus.shareTrace;

import android.app.Application;
import android.content.Context;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import cn.net.shoot.sharetracesdk.AppData;
import cn.net.shoot.sharetracesdk.ShareTrace;
import cn.net.shoot.sharetracesdk.ShareTraceInstallListener;


public class ShareTraceHelpder {

    public static String appData_str = "";
    public static String resumePage = null;
    public static String paramsData = null;

    public static void init(Application context) {
        ShareTrace.init(context);
        getInstallTrace();
    }

    public static String getShareTraceAppDate() {
        System.out.println("getShareTraceAppDate:"+appData_str);
        if(paramsData!=null)return appData_str;
        getInstallTrace();
        return appData_str;
    }
    public  static void  getInstallTrace(){
        System.out.println("ShareTraceInstallListener11-getInstallTrace:"+appData_str);
        ShareTrace.getInstallTrace(new ShareTraceInstallListener() {
            @Override
            public void onInstall(AppData data) {
//                ShareTraceInstallListener11-成功null&&null
                appData_str=data.resumePage+"&&"+data.paramsData;
                paramsData=data.paramsData;
                System.out.println("ShareTraceInstallListener11-成功"+appData_str);
             // Cocos2dxJavascriptJavaBridge.evalString(String.format("ShareTraceHelpder.inviteCodeCallBack(\"%s\")", appData_str));
            }

            @Override
            public void onError(int code, String msg) {
                System.out.println("ShareTraceInstallListener-失败"+code+":"+msg);
             // Cocos2dxJavascriptJavaBridge.evalString(String.format("ShareTraceHelpder.failed(\"%s\")", code+":"+msg));
            }
        });

    }
}
