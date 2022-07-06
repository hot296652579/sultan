/****************************************************************************
 Copyright (c) 2015-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxHelper;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ContentResolver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Looper;
import android.provider.ContactsContract;
import android.provider.MediaStore;
import android.provider.Settings;

import android.content.Intent;
import android.content.res.Configuration;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.FileProvider;
import android.text.TextUtils;
import android.util.Log;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.widget.Toast;

import com.PopUpTipTool.PopUpTipTool;
import com.bt.game.R;
import com.threeoctopus.facebookapi.FacebookSDK;
import com.threeoctopus.shareTrace.ShareTraceHelpder;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import android.content.pm.ActivityInfo;

public class AppActivity extends Cocos2dxActivity {

    public static AppActivity ccActivity = null;
    private static final String actTag = "a_App";
    public static int g_handlerID = 0;
    private String fileName = Cocos2dxHelper.getWritablePath() + "/image.png";
    private File tempFile = new File("/mnt/sdcard/image.png");//new File(fileName);
    private int crop = 300;// 裁剪大小
    private static final int OPEN_CAMERA_CODE = 10;
    private static final int OPEN_GALLERY_CODE = 11;
    private static final int CROP_PHOTO_CODE = 12;
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static final int REQUEST_EXTERNAL_CONTACTS = 2;
    private static Toast toast = null;
    private AlertDialog mPermissionDialog;
    private String mPackName;  //获取 a'p'k 包名
    public Cocos2dxGLSurfaceView glSurfaceView = null;
    public static String RoomIDOnShare = null;//声名变量
    private static  String clipBoardStr = null;

    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE
    };

    private static String[] PERMISSIONS_CONTACTS = {
            Manifest.permission.READ_CONTACTS
    };

    public static void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission

        int permission = ActivityCompat.checkSelfPermission(activity,
                Manifest.permission.WRITE_EXTERNAL_STORAGE);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(activity, PERMISSIONS_STORAGE,
                    REQUEST_EXTERNAL_STORAGE);
        }
    }

    public static void verifyContactsPermissions(Activity activity) {
        // Check if we have write permission

        int permission = ActivityCompat.checkSelfPermission(activity,
                Manifest.permission.READ_CONTACTS);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(activity, PERMISSIONS_CONTACTS, REQUEST_EXTERNAL_CONTACTS);
        }
    }

    public AppActivity() {
        ccActivity = this;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Workaround in
        // https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            // so just quietly finish and go away, dropping the user back into the activity
            // at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);

        this.getURLParam();
        
        //初始化Facebook SDK
        FacebookSDK.getInstance().initSDK(this);

        ShareTraceHelpder.init((getApplication()));

        mFrameLayout.setFitsSystemWindows(false);

        this.verifyStoragePermissions(this);
        //屏幕常亮
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        if ((Environment.getExternalStorageState().equals(//判断sd卡是否存在
                Environment.MEDIA_MOUNTED))) {
            tempFile = new File("/mnt/sdcard/image.png");// Environment.getExternalStorageDirectory();//获取跟目录
        }
    }
    private void getURLParam(){
        //获取参数 老版本
        Intent i_getvalue = getIntent();
        String action = i_getvalue.getAction();
        if(Intent.ACTION_VIEW.equals(action)){
            Uri uri = i_getvalue.getData();
            if(uri != null){
                String param = uri.getQueryParameter("param");
                System.out.println("==========param============"+param);
                if (param != null){
                    RoomIDOnShare = param;
                    i_getvalue.setData(null);
                }
            }
        }
        //获取参数 新版本
        Bundle extras = getIntent().getExtras();
        if (extras != null && RoomIDOnShare == null){
            String param = extras.getString("param");
            System.out.println("=====extras==param============="+param);
            if (param != null){
                RoomIDOnShare = param;
                getIntent().removeExtra("param");
            }
        }
    }
    public static String getRoomIdOnShare() {
        String idTemp = RoomIDOnShare;
        RoomIDOnShare = null;
        System.out.println("==========getRoomIdOnShare============"+idTemp);
        return idTemp;
    }
    /**
     * 判断是否缺少权限
     */
    private static boolean lacksPermission(Context mContexts, String permission) {
        return ActivityCompat.checkSelfPermission(mContexts, permission) ==
                PackageManager.PERMISSION_DENIED;
    }

    /**
     * 判断权限集合
     * permissions 权限数组
     * return false-表示没有改权限  true-表示权限已开启
     */
    public boolean lacksPermissions(Context mContexts, String[] mPermissions) {
        for (String permission : mPermissions) {
            if (lacksPermission(mContexts, permission)) {
                //没有开启权限
                return false;
            }
        }
        //权限已开启
        return true;
    }

    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_EXTERNAL_STORAGE) {  //当然权限多了，建议使用Switch，不必纠结于此

            boolean isAllGranted = true;
            // 判断是否所有的权限都已经授予了
            for (int grant : grantResults) {
                if (grant != PackageManager.PERMISSION_GRANTED) {
                    isAllGranted = false;
                    break;
                }
            }
            if (isAllGranted) {
                // 所有的权限都授予了
                Log.e("err", "权限都授权了");
            } else {
                // 弹出对话框告诉用户需要权限的原因, 并引导用户去应用权限管理中手动打开权限按钮
                //容易判断错
                //MyDialog("提示", "某些权限未开启,请手动开启", 1) ;
//                Toast.makeText(this, "权限未开启,请手动开启", Toast.LENGTH_SHORT).show();
                this.showPermissionDialog();
            }
        } else if (requestCode == REQUEST_EXTERNAL_CONTACTS) {
            boolean isAllGranted = true;
            // 判断是否所有的权限都已经授予了
            for (int grant : grantResults) {
                if (grant != PackageManager.PERMISSION_GRANTED) {
                    isAllGranted = false;
                    break;
                }
            }
            if (isAllGranted) {
                // 所有的权限都授予了
                Log.e("err", "权限都授权了");
                try {
                    ccActivity.getPhoneContacts();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            } else {
                // 弹出对话框告诉用户需要权限的原因, 并引导用户去应用权限管理中手动打开权限按钮
                //容易判断错
                //MyDialog("提示", "某些权限未开启,请手动开启", 1) ;
//                Toast.makeText(this, "权限未开启,请手动开启", Toast.LENGTH_SHORT).show();
                this.showPermissionDialog();
                ccActivity.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("platformUtil.getContactsPermission(false)");
                    }
                });
            }
        }

    }

    private void showPermissionDialog() {

        mPackName = ccActivity.getPackageName();
        Log.i("mPackName: ", mPackName);
        if (mPermissionDialog == null) {
            mPermissionDialog = new AlertDialog.Builder(this)
                    .setMessage("Permission is disabled. Please grant it manually")
                    .setPositiveButton("Settings", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            cancelPermissionDialog();

                            Uri packageURI = Uri.parse("package:" + mPackName);     //去设置里面设置
                            Intent intent = new Intent(Settings.
                                    ACTION_APPLICATION_DETAILS_SETTINGS, packageURI);
                            startActivity(intent);
                        }
                    })
                    .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            //关闭页面或者做其他操作
                            cancelPermissionDialog();
                        }
                    })
                    .create();
        }
        mPermissionDialog.show();
    }

    private void cancelPermissionDialog() {
        mPermissionDialog.cancel();
    }

    public static void copyToClip(final String str) {
        Log.d("AppActivity", "copyToClipBoard： " + str);
        Runnable runnable = new Runnable() {
            @TargetApi(Build.VERSION_CODES.HONEYCOMB)
            public void run() {
                ClipboardManager mClipboardManager = (ClipboardManager) ccActivity.getSystemService(CLIPBOARD_SERVICE);
                mClipboardManager.setPrimaryClip(ClipData.newPlainText("Label", str));
            }
        };
        ccActivity.runOnUiThread(runnable);
    }

    /**
     * 获取剪切板内容
     * @return
     */
    public static void getClipBoardStr() {

        Runnable runnable = new Runnable() {
            @TargetApi(Build.VERSION_CODES.HONEYCOMB)
            public void run() {
                ClipboardManager manager = (ClipboardManager) ccActivity.getSystemService(Context.CLIPBOARD_SERVICE);
                if (manager != null) {
                    if (!manager.hasPrimaryClip()) {
                        return;
                    }
                    CharSequence addedText = manager.getPrimaryClip().getItemAt(0).getText();
                //    System.out.println("addedText"+addedText);
                    clipBoardStr = String.valueOf(addedText);
//                    System.out.println("clipBoardStr"+addedText);
                    if (!TextUtils.isEmpty(clipBoardStr)) {
                        manager.setPrimaryClip(manager.getPrimaryClip());
                        manager.setText(null);
                    }
                }
                // System.out.println("获取剪切板内容"+clipBoardStr);
                ccActivity.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("platformUtil.handleClipBoardStr('" + clipBoardStr + "')");
                        clipBoardStr = null;
                    }
                });


            }
        };
        ccActivity.runOnUiThread(runnable);
    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        // ------------改动的------------------
        // glSurfaceView.setEGLConfigChooser(8, 8, 8, 8, 16, 8);
        // glSurfaceView.getHolder().setFormat(PixelFormat.RGBA_8888);
        this.glSurfaceView = glSurfaceView;
        //-----------------------------------------------------------

        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);
        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();
        PopUpTipTool.onResume();
        if (RoomIDOnShare == null){
            this.getURLParam();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();
        PopUpTipTool.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            return;
        }

        SDKWrapper.getInstance().onDestroy();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.i("a", "onActivityResult" + requestCode + "resultCode:" + resultCode);
        String res2 = "/mnt/sdcard/image.png";//获取跟目录
        //m_WSFPayUtil.onPayResult(requestCode, resultCode, data);
        if (resultCode == -1) {
            switch (requestCode) {
                case CROP_PHOTO_CODE:
                    //cropPhoto(Uri.fromFile(tempFile));
                    Log.i("a", "onActivityResult CROP_PHOTO_CODE:" + res2);
                    //压缩
                    Bitmap originBitmap = BitmapFactory.decodeFile(res2);
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    originBitmap.compress(Bitmap.CompressFormat.JPEG, 60, bos);
                    FileOutputStream fos = null;
                    try {
                        fos = new FileOutputStream(new File(res2));
                        fos.write(bos.toByteArray());

                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    } finally {

                        try {
                            fos.flush();
                            fos.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        if (g_handlerID != 0) {
                            fileName = res2;
                            Log.i("a", "onActivityResult fileName:" + fileName);
                            ccActivity.runOnGLThread(new Runnable() {
                                @Override
                                public void run() {
                                    Cocos2dxJavascriptJavaBridge.evalString("platformUtil.handleUpLoadPhoto('" + fileName + "')");
                                }
                            });
                        }
                    }
                    break;
                case OPEN_GALLERY_CODE:
                    if (resultCode == -1) {
                        cropPhoto(data.getData());
                    }
                    break;
                case OPEN_CAMERA_CODE:
                    Bundle bundle = data.getExtras();
                    Bitmap bm = (Bitmap) bundle.get("data");// 获取相机返回的数据，并转换为Bitmap图片格式
                    bm = scaleImg(bm, crop, crop);
                    ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                    bm.compress(Bitmap.CompressFormat.JPEG, 60, bytes);
//                    File f = new File(Cocos2dxHelper.getWritablePath() + "/image.png");
                    File f = new File(res2);
                    FileOutputStream b = null;
                    try {
                        f.createNewFile();
                        b = new FileOutputStream(f);
                        b.write(bytes.toByteArray());
                    } catch (IOException e) {
                        e.printStackTrace();
                    } finally {
                        try {
                            b.flush();
                            b.close();
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
                        fileName = res2;
                        Log.i("a", "onActivityResult fileName:" + fileName);
                        ccActivity.runOnGLThread(new Runnable() {
                            @Override
                            public void run() {
                                Cocos2dxJavascriptJavaBridge.evalString("platformUtil.handleUpLoadPhoto('" + fileName + "')");
                            }
                        });

                    }
                default:
                    break;
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
        FacebookSDK.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }

    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        super.onStart();
    }

    /**
     * 获取设备唯一id
     */
    public static String getDeviceUUID() {
        String androidID = Settings.Secure.getString(ccActivity.getContentResolver(), Settings.Secure.ANDROID_ID);
        String id = androidID + Build.SERIAL;
        return id;
    }

    /**
     * 获取APP versionName
     */
    public static String getAPPVersionName() {
        PackageManager manager = ccActivity.getPackageManager();
        String name = null;
        try {
            PackageInfo info = manager.getPackageInfo(ccActivity.getPackageName(), 0);
            name = info.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        return name;
    }

    /**
     * 退出程序
     */
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            ccActivity.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString("platformUtil.handleKeyBackClicked()");
                }
            });
            return true;
        } else {
            return false;
        }
    }

    /**
     * 打开其他 app
     */
    public static void openApp(String appName) {
        try {
            PackageManager packageManager = ccActivity.getPackageManager();
            Intent intent = new Intent();
            intent = packageManager.getLaunchIntentForPackage(appName);
            ccActivity.startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

    /**
     * 打开其他 邮件
     */
    public static void openEmail(String email) {
        Uri uri = Uri.parse("mailto:" + email);
        String[] emails = {email};
        Intent intent = new Intent(Intent.ACTION_SENDTO, uri);
        intent.putExtra(Intent.EXTRA_CC, emails); // 抄送人
        ccActivity.startActivity(Intent.createChooser(intent, "Email"));
    }

    public static void shareImageToLocal(String imagePath) {
        ccActivity.shareImage(imagePath);
    }

    /**
     * 调用系统分享
     */
    public void shareImage(String imagePath) {
        if (!this.lacksPermissions(this, PERMISSIONS_STORAGE)) {
            this.verifyStoragePermissions(this);
            return;
        }
        File imageFile = new File(imagePath);
        if (!imageFile.exists()) {
            System.out.println("源文件不存在");
            return;
        }
        Uri uri;
        if (Build.VERSION.SDK_INT >= 24) {
            uri = FileProvider.getUriForFile(ccActivity.getApplicationContext(), ccActivity.getPackageName() + ".fileprovider", imageFile);
        } else {
            uri = Uri.fromFile(imageFile);
        }
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("image/png");
        intent.putExtra(Intent.EXTRA_STREAM, uri);
        ccActivity.startActivity(Intent.createChooser(intent, "Share"));
    }


    public static void takePhotoMethod() {
        g_handlerID = 2;
        ccActivity.openCamera();
    }

    public static void localPhotoMethod() {
        g_handlerID = 1;
        ccActivity.openGallery();
    }

    /**
     * 调用相机
     */
    public void openCamera() {
        if (!this.lacksPermissions(ccActivity, PERMISSIONS_STORAGE)) {
            this.verifyStoragePermissions(this);
            return;
        }
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);// 打开相机
        startActivityForResult(intent, OPEN_CAMERA_CODE);
    }

    /**
     * 打开相册
     */
    public void openGallery() {
        if (!this.lacksPermissions(ccActivity, PERMISSIONS_STORAGE)) {
            this.verifyStoragePermissions(this);
            return;
        }
        fileName = Cocos2dxHelper.getWritablePath() + "/image.png";
        Log.i(actTag, "getCocos2dxWritablePath:" + Cocos2dxHelper.getWritablePath() + "/image.png" +
                "tempFile:" + tempFile + "fileName:" + fileName);
        Intent intent = new Intent(Intent.ACTION_PICK);// 打开相册
        intent.setDataAndType(MediaStore.Images.Media.INTERNAL_CONTENT_URI, "image/*");
        intent.putExtra("output", Uri.fromFile(tempFile));
        startActivityForResult(intent, OPEN_GALLERY_CODE);
    }

    public Bitmap scaleImg(Bitmap bm, int newWidth, int newHeight) {
        // 图片源
        // Bitmap bm = BitmapFactory.decodeStream(getResources()
        // .openRawResource(id));
        // 获得图片的宽高
        int width = bm.getWidth();
        int height = bm.getHeight();
        // 设置想要的大小
        int newWidth1 = newWidth;
        int newHeight1 = newHeight;
        // 计算缩放比例
        float scaleWidth = ((float) newWidth1) / width;
        float scaleHeight = ((float) newHeight1) / height;
        // 取得想要缩放的matrix参数
        Matrix matrix = new Matrix();
        matrix.postScale(scaleWidth, scaleHeight);
        // 得到新的图片
        Bitmap newbm = Bitmap.createBitmap(bm, 0, 0, width, height, matrix,
                true);
        return newbm;
    }

    /**
     * 裁剪图片
     *
     * @param uri
     */
    public void cropPhoto(Uri uri) {
        fileName = Cocos2dxHelper.getWritablePath() + "/image.png";
        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(uri, "image/*");
        intent.putExtra("output", Uri.fromFile(tempFile));
        intent.putExtra("crop", true);
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 1);
        intent.putExtra("outputX", crop);
        intent.putExtra("outputY", crop);
        startActivityForResult(intent, CROP_PHOTO_CODE);
    }

    public static void saveTextureToLocal(String fromPath) {
        ccActivity.saveTexture(fromPath);
    }

    // 获取 路径中的图片 保存到本地
    public void saveTexture(String fromPath) {
        if (!this.lacksPermissions(this, PERMISSIONS_STORAGE)) {
            this.verifyStoragePermissions(this);
            return;
        }
        Log.d("图片地址", fromPath);
        // fileName ==textureName  尽量和JS保存的一致
        String fileName = "share_redPacke_image";
        File fromFile = new File(fromPath);
        if (!fromFile.exists()) {
            System.out.println("源文件不存在");
            return;
        }
        if (!fromFile.isFile()) {
            System.out.println("源文件不是文件");
            return;
        }
        //系统相册目录
        String galleryPath = Environment.getExternalStorageDirectory()
                + File.separator + Environment.DIRECTORY_DCIM
                + File.separator + "Camera" + File.separator;


        // 声明文件对象
        File file = null;
        // 声明输出流
        FileOutputStream outStream = null;

        Bitmap bmp;

        try {
            bmp = BitmapFactory.decodeFile(fromPath);
            System.out.print("==============" + bmp);
            // 如果有目标文件，直接获得文件对象，否则创建一个以filename为名称的文件
            file = new File(galleryPath, fileName + ".jpg");

            // 获得文件相对路径
            fileName = file.toString();
            // 获得输出流，如果文件中有内容，追加内容
            outStream = new FileOutputStream(fileName);
            bmp.compress(Bitmap.CompressFormat.JPEG, 90, outStream);


            MediaStore.Images.Media.insertImage(ccActivity.getContentResolver(),
                    bmp, fileName, null);
            Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
            Uri uri = Uri.fromFile(file);
            intent.setData(uri);
            ccActivity.sendBroadcast(intent);
            ccActivity.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString("platformUtil.handleSaveImageToLocal(true)");
                }
            });
        } catch (Exception e) {
            e.getStackTrace();
        } finally {
            try {
                if (outStream != null) {
                    outStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    //获取渠道编号 0:默认、100000:印度、
    public static int getAppQuDaoId() {
        return ConstDefine.APP_QUDAO_ID;
    }

    public static void setRequestedOrientation(boolean islandscape) {
        if (islandscape) {
            ccActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);//横屏
            PopUpTipTool.closeAll();
        } else {
            ccActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);//竖屏
        }
    }

    /**
     * 设置 SurfaceView 是否置顶
     */
    public static void setSurfaceViewZOrderOnTop(boolean bool) {
        ccActivity.glSurfaceView.setZOrderOnTop(bool);
    }

    public static void getAllContact() {
        ccActivity.getContacts();
    }

    public void getContacts() {
        if (!this.lacksPermissions(this, PERMISSIONS_CONTACTS)) {
            this.verifyContactsPermissions(this);
        } else {
            try {
                ccActivity.getPhoneContacts();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    public void getPhoneContacts() throws JSONException {
        final ContactsThread contactsThread = new ContactsThread();
        contactsThread.start();
    }

    static class ContactsThread extends Thread {
        @Override
        public void run() {
            //获取联系人信息的Uri
            Uri uri = ContactsContract.Contacts.CONTENT_URI;
            //获取ContentResolver
            ContentResolver contentResolver = ccActivity.getContentResolver();
            //查询数据，返回Cursor
            Cursor cursor = contentResolver.query(uri, null, null, null, null);
            final List<JSONObject> list = new ArrayList<JSONObject>();
            while (cursor.moveToNext()) {
                JSONObject jsonObject = new JSONObject();
                StringBuilder sb = new StringBuilder();
                //获取联系人的ID
                String contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                //获取联系人的姓名
                String name = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
                //构造联系人信息
                sb.append("contactId=").append(contactId).append(",Name:").append(name);
                try {
                    jsonObject.put("n", name);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                String id = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));//联系人ID

                //查询电话类型的数据操作
                Cursor phones = contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                        null,
                        ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId,
                        null, null);
                while (phones.moveToNext()) {
                    String phoneNumber = phones.getString(phones.getColumnIndex(
                            ContactsContract.CommonDataKinds.Phone.NUMBER));
                    //添加Phone的信息
                    sb.append(",Phone:").append(phoneNumber);
                    try {
                        jsonObject.put("m", phoneNumber);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                phones.close();
                list.add(jsonObject);
                Log.i("=========orgName=====", sb.toString());//查看所有的数据

            }
            cursor.close();
            //sims 卡
            ContentResolver resolver = ccActivity.getContentResolver();
            // 获取Sims卡联系人
            Uri uriSims = Uri.parse("content://icc/adn");
            Cursor phoneCursor = resolver.query(uriSims, null, null, null, null);
            if (phoneCursor != null) {
                JSONObject jsonObject = new JSONObject();
                StringBuilder sb = new StringBuilder();
                while (phoneCursor.moveToNext()) {
                    // 得到手机号码
                    String contactName = phoneCursor.getString(0);
                    String phoneNumber = phoneCursor.getString(1);
                    // 当手机号码为空的或者为空字段 跳过当前循环
                    if (TextUtils.isEmpty(phoneNumber))
                        continue;
                    try {
                        jsonObject.put("m", phoneNumber);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    try {
                        jsonObject.put("n", contactName);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    sb.append(",Phone:").append(phoneNumber);
                    sb.append(",Name:").append(contactName);
                }
                phoneCursor.close();
                list.add(jsonObject);
                Log.i("=========Sims=====", sb.toString());//查看所有的数据
            }
            Log.i("=========list=====", list.toString());
            ccActivity.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString("platformUtil.phoneInfo(" + list + ")");
                }
            });
            ccActivity.runOnGLThread(new Runnable() {
                @Override
                public void run() {
                    Cocos2dxJavascriptJavaBridge.evalString("platformUtil.getContactsPermission(true)");
                }
            });

        }
    }
}
