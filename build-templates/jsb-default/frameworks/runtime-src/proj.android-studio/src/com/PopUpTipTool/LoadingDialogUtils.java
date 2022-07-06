package com.PopUpTipTool;

import android.app.Dialog;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.bt.game.R;

import org.cocos2dx.javascript.AppActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import java.util.Timer;
import java.util.TimerTask;

public class LoadingDialogUtils {

    public static Dialog mDialog = null;

    public static AppActivity getApp() {
        return AppActivity.ccActivity;
    }

    private static String lastMsg = null;
    private static long timeMillis = 0;

    private static Dialog showWaitDialog(String msg) {
        LayoutInflater inflater = LayoutInflater.from(getApp());
        View v = inflater.inflate(R.layout.thridlogin_dialog_loading, null);             // 得到加载view
        RelativeLayout layout = (RelativeLayout) v.findViewById(R.id.dialog_view);// 加载布局

        // main.xml中的ImageView
        ImageView spaceshipImage = (ImageView) v.findViewById(R.id.img);
        TextView tipTextView = (TextView) v.findViewById(R.id.tipTextView);   // 提示文字
        // 加载动画
        Animation hyperspaceJumpAnimation = AnimationUtils.loadAnimation(getApp(), R.anim.rotate_animation);
        // 使用ImageView显示动画
        spaceshipImage.startAnimation(hyperspaceJumpAnimation);
        tipTextView.setText(msg);// 设置加载信息

        Dialog loadingDialog = new Dialog(getApp(), R.style.TransDialogStyle);    // 创建自定义样式dialog
        loadingDialog.setContentView(layout);
        loadingDialog.setCancelable(false);
        loadingDialog.setCanceledOnTouchOutside(false);

        Window window = loadingDialog.getWindow();
        WindowManager.LayoutParams lp = window.getAttributes();
        lp.width = WindowManager.LayoutParams.MATCH_PARENT;
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
        window.setGravity(Gravity.CENTER);
        window.setAttributes(lp);
        window.setWindowAnimations(R.style.PopWindowAnimStyle);
        loadingDialog.show();
        return loadingDialog;
    }

    public static void showWaitDialog(final String msg, final double outTime) {
        lastMsg = msg;
        timeMillis = System.currentTimeMillis() + (long) (outTime);
        getApp().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mDialog = showWaitDialog(msg);
                startTimeCount((int) outTime);
            }
        });
    }

    /**
     * 关闭dialog
     *
     * @param mDialogUtils
     */
    private static void closeDialog(Dialog mDialogUtils) {
        if (mDialogUtils != null && mDialogUtils.isShowing()) {
            mDialogUtils.dismiss();

        }
    }

    public static void closeDialog() {
        closeDialog(mDialog);
        mDialog = null;
        stopTimeCount();
//        lastMsg = null;
//        timeMillis = 0;
    }

    private static Timer timer = null;
    public static void startTimeCount(int delay) {
        stopTimeCount();
        timer = new Timer();
        final TimerTask task = new TimerTask() {
            @Override
            public void run() {
                closeDialog();
                getApp().runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("onServerOutTimeCall()");
                    }
                });
            }
        };
        timer.schedule(task, delay);// 1秒一次
    }
    public static void stopTimeCount() {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
        if(delayOpenTimer!=null){
            delayOpenTimer.cancel();
            delayOpenTimer = null;
        }
    }
// 显示 show dialog 时候，切后台在切回来 cocos 不触发 切回前台的事件 所以 写了这个
private static Timer delayOpenTimer = null;
    public static void setInvisible(final boolean bool) {
        if (!bool) {
            closeDialog();
        } else if (timeMillis != 0) {
            final long xx = timeMillis - System.currentTimeMillis();
            if (xx > 0) {
                Timer timer = new Timer();
                final TimerTask task = new TimerTask() {
                    @Override
                    public void run() {
                        closeDialog();
                        showWaitDialog(lastMsg, xx);
                    }
                };
                timer.schedule(task, 100);
            }
        }
    }
}
