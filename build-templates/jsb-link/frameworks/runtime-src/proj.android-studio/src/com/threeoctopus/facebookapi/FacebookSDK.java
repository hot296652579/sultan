package com.threeoctopus.facebookapi;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import java.net.URL;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;

import com.facebook.share.Sharer;
import com.facebook.share.model.ShareLinkContent;
import com.facebook.share.model.SharePhoto;
import com.facebook.share.model.SharePhotoContent;
import com.facebook.share.widget.ShareDialog;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;

public class FacebookSDK {

	private CallbackManager callbackManager = null;	//回调控制 1
	private static Activity mactivity = null;	//主activity
	private static FacebookSDK mInstace = null;	//单例
	private static boolean isLogin = true;	//调用接口是否是登录
	private static ShareDialog mShareDialog = null;

	public static FacebookSDK getInstance() {
		if (null == mInstace){
			mInstace = new FacebookSDK();
		}
		return mInstace;
	}

	/**
	 * 初始化SDK
	 */
	public void initSDK(Activity activity)
	{
		mactivity = activity;
		callbackManager = CallbackManager.Factory.create();
		//登录初始化
		LoginManager.getInstance().registerCallback(callbackManager,
				new FacebookCallback<LoginResult>() {
					@Override
					public void onSuccess(LoginResult loginResult) {
						loginCB(true);
					}

					@Override
					public void onCancel() {
						loginCB(false);
					}

					@Override
					public void onError(FacebookException exception) {
						loginCB(false);
					}
				});

		//分享初始化
		mShareDialog = new ShareDialog(mactivity);
		mShareDialog.registerCallback(callbackManager,
				new FacebookCallback<Sharer.Result>(){
					@Override
					public void onSuccess(Sharer.Result result) {
						shareCB(true);
					}

					@Override
					public void onCancel() {
						shareCB(false);
					}

					@Override
					public void onError(FacebookException exception) {
						shareCB(false);
					}
				});

	}

	/**
	 * 分享
	 */
	public static void shareFacebook(String shareInfo){
		try {
			JSONObject json = new JSONObject(shareInfo);
			int shareType = json.getInt("shareType");
			String shareUrl = json.getString("shareUrl");
			String imgPath = json.getString("imgPath");

			if (shareType == 0) {
				//链接
				if (ShareDialog.canShow(ShareLinkContent.class)) {
					ShareLinkContent content = new ShareLinkContent.Builder()
							.setContentUrl(Uri.parse(shareUrl))
							.build();
					mShareDialog.show(content);
				}
			} else if (shareType == 1) {
				//图片
				if (ShareDialog.canShow(SharePhotoContent.class)) {
					try
					{
						Bitmap bmp = BitmapFactory.decodeStream(new URL(imgPath).openStream());
						Bitmap img = Bitmap.createScaledBitmap(bmp, 300, 300, true);
						bmp.recycle();
						SharePhoto photo = new SharePhoto.Builder()
								.setBitmap(img)
								.build();
						SharePhotoContent content = new SharePhotoContent.Builder()
								.addPhoto(photo)
								.build();
						mShareDialog.show(content);
					}
					catch (Exception e)
					{
						e.printStackTrace();
					}

				}
			}
		}catch (JSONException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 登录回调
	 */
	public void loginCB(final boolean isSuccess){
		((Cocos2dxActivity)mactivity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				Cocos2dxJavascriptJavaBridge.evalString("platformUtil.loginToFacebookCB('" + isSuccess +"')");
			}
		});
	}
	/**
	 * 登陸
	 */
	public static void loginFacebook(String login){
		if( login.equals("login") )
		{
			isLogin = true;
		}else if( login.equals("bind") )
		{
			isLogin = false;
		}
		LoginManager.getInstance().logInWithReadPermissions(mactivity, Arrays.asList("public_profile"));
	}


	/**
	 * 获取用户信息
	 */
	public static void getUserInfo(String hello){
		Bundle param = new Bundle();
		param.putString("fields", "id,name,gender,picture");
		GraphRequest graphRequest= GraphRequest.newMeRequest(AccessToken.getCurrentAccessToken(),
				new GraphRequest.GraphJSONObjectCallback() {
					@Override
					public void onCompleted(JSONObject object, GraphResponse response) {
						if (null != object) {
							try {
								final String fbId = object.getString("id");
								final String fbName = object.getString("name");
								String headImg = "";
//								jsob.put("gender", object.getString("gender"));
								JSONObject jsonObject = object.optJSONObject("picture");
								if(jsonObject!=null){
									JSONObject data=jsonObject.optJSONObject("data");
									if(data!=null){
										headImg = data.getString("url");
									}
								}
								final String fbHeadImg = headImg;
								((Cocos2dxActivity)mactivity).runOnGLThread(new Runnable() {
									@Override
									public void run() {
										if(isLogin){
											Cocos2dxJavascriptJavaBridge.evalString("platformUtil.getFacebookUserInfoToLogin('" + fbId + "','" + fbName + "', '" + fbHeadImg + "')");
										}else{
											Cocos2dxJavascriptJavaBridge.evalString("platformUtil.getFacebookUserInfoToBind('" + fbId + "','" + fbName + "', '" + fbHeadImg + "')");
										}
									}
								});
							}
							catch (JSONException e) {
								throw new RuntimeException(e);
							}
						}
					}
				});
		graphRequest.setParameters(param);
		graphRequest.executeAsync();
	}

	/**
	 * 分享回调
	 */
	public void shareCB(final boolean isSuccess){
		((Cocos2dxActivity)mactivity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				Cocos2dxJavascriptJavaBridge.evalString("platformUtil.shareToFacebookCB('" + isSuccess +"')");
			}
		});
	}

	/**
	 * 生命周期
	 */
	public void onActivityResult(int requestCode, int resultCode, Intent data){
		callbackManager.onActivityResult(requestCode, resultCode, data);
	}
}
