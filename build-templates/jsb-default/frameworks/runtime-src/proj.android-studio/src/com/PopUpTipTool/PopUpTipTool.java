package com.PopUpTipTool;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.widget.Toast;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.javascript.SDKWrapper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;


public class PopUpTipTool {
    public static Dialog mdialog = null;

    public static AppActivity getApp() {
        return AppActivity.ccActivity;
    }

    static void showDialog(final String jsonStr) {
        try {
            JSONObject json = new JSONObject(jsonStr);
            final String title = json.getString("title");
            final String content = json.getString("content");
            final String conmfirmText = json.getString("conmfirmText");
            final String cancleText = json.getString("cancleText");
            ShowDialog(title, content, conmfirmText, cancleText);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static void ShowDialog(final String title, final String content,
                                  final String conmfirmText, final String cancleText) {

        new Thread(new Runnable() {

            @Override
            public void run() {
                Looper.prepare();
                AlertDialog.Builder dialog = new AlertDialog.Builder(getApp());
                dialog.setCancelable(false);
                dialog.setTitle(title);
                dialog.setMessage(content);
                dialog.setPositiveButton(conmfirmText, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface arg0, int arg1) {
                        System.out.print("点击了确定");
                        mdialog = null;
                        getApp().runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString("onPopSelectCall(true)");
                            }
                        });
                    }
                });
                if ("".equals(cancleText) == false) {
                    dialog.setNegativeButton(cancleText, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface arg0, int arg1) {
                            System.out.print("点击了取消");
                            mdialog = null;
                            getApp().runOnGLThread(new Runnable() {
                                @Override
                                public void run() {
                                    Cocos2dxJavascriptJavaBridge.evalString("onPopSelectCall(false)");
                                }
                            });
                        }
                    });
                }
                mdialog = dialog.create();
                mdialog.show();
                Looper.loop();
            }
        }).start();
    }


    public static void showToask(final String text) {
        new Thread(new Runnable() {

            @Override
            public void run() {
                Looper.prepare();
                Toast.makeText(getApp(), text, Toast.LENGTH_SHORT).show();
                Looper.loop();
            }
        }).start();
    }

    public static void showLoading(final String jsonStr) {
        try {
            JSONObject json = new JSONObject(jsonStr);
            final String content = json.getString("content");
            final double outTime = json.getDouble("outTime");
            LoadingDialogUtils.showWaitDialog(content, outTime);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    public static void hideLoading() {
        LoadingDialogUtils.closeDialog();
    }

    public static void closeDialog() {
        if (mdialog != null && mdialog.isShowing()) {
            mdialog.dismiss();
        }
    }

    public static void onResume() {
        LoadingDialogUtils.setInvisible(true);
    }

    public static void onPause() {
        LoadingDialogUtils.setInvisible(false);
    }
    //    cocos restart 时 也不会关闭 底层弹窗，所以要手动关闭
    public static void closeAll() {
        hideLoading();
        closeDialog();
    }
}
