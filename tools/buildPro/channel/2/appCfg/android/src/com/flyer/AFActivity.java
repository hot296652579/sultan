package com.flyer;;

import android.util.Log;

import com.appsflyer.AFInAppEventParameterName;
import com.appsflyer.AFInAppEventType;
import com.appsflyer.AppsFlyerLib;
import com.appsflyer.AppsFlyerLibCore;
import com.appsflyer.AppsFlyerTrackingRequestListener;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class AFActivity  {
    public static AppActivity getApp() {
        return AppActivity.ccActivity;
    }

    public static void AFBuyInfoInApp(String buyInfo){

        JSONObject  json = null;
        try {
            json = new JSONObject(buyInfo);
            int revenue = json.getInt("revenue");
            String content_type = json.getString("content_type");
            final String content_id = json.getString("content_id");
            String currency = json.getString("currency");

            Map<String, Object> eventValue = new HashMap<String, Object>();
            eventValue.put(AFInAppEventParameterName.REVENUE,revenue);//价额
            eventValue.put(AFInAppEventParameterName.CONTENT_TYPE,content_type);//商品名称
            eventValue.put(AFInAppEventParameterName.CONTENT_ID,content_id);//编号
            eventValue.put(AFInAppEventParameterName.CURRENCY,currency);//INR 币种
            Log.i("=========buyInfo=====", buyInfo);//查看所有的数据
            Log.i("==============event", eventValue.toString());//查看所有的数据
            AppsFlyerLib.getInstance().trackEvent(getApp().getApplicationContext() , AFInAppEventType.PURCHASE , eventValue);

            /**
             *应用内事件已成功记录。
             * 记录应用内事件时发生错误。
             */
            AppsFlyerLib.getInstance().trackEvent(getApp().getApplicationContext(), AFInAppEventType.PURCHASE, eventValue, new AppsFlyerTrackingRequestListener() {
                @Override
                public void onTrackingRequestSuccess() {
                    Log.d(AppsFlyerLibCore.LOG_TAG, "onTrackingRequestSuccess");
                    getApp().runOnGLThread(new Runnable() {
                        @Override
                        public void run() {
                            Log.i("==============content", content_id.toString());//查看所有的数据
                            Cocos2dxJavascriptJavaBridge.evalString("platformUtil.isInAppSuccess('" + content_id.toString() + "')");
                        }
                    });
                }
                @Override
                public void onTrackingRequestFailure(String error) {
                    Log.d(AppsFlyerLibCore.LOG_TAG, "onTrackingRequestFailure: " + error);
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
}