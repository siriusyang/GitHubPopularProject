package sirius.nativelibrary.route;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by sirius on 2017-4-26.
 */

public class AndroidRoute extends ReactContextBaseJavaModule {
    private final static String PARAMETERS = "parameters";

    public AndroidRoute(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidRoute";
    }

    @ReactMethod
    public void OpenActivitySimple(String uriString) {
        final Uri uri = Uri.parse(uriString);
        final Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(uri);
        getCurrentActivity().startActivity(intent);
    }

    @ReactMethod
    public void OpenActivity(String scheme, String host, String path, String parameters) {
        final Uri uri = new Uri.Builder().scheme(scheme).authority(host).path(path)
                .appendQueryParameter(PARAMETERS, parameters).build();
        final Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(uri);
        getCurrentActivity().startActivity(intent);
    }

    public static String getParameters(Uri uri) {
        return getParameters(uri, PARAMETERS);
    }

    public static String getParameters(Uri uri, String parameters) {
        return uri == null ? "" : uri.getQueryParameter(parameters);
    }
}
