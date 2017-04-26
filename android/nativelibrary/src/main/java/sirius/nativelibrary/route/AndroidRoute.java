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
    public AndroidRoute(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidRoute";
    }

    @ReactMethod
    public void OpenActivity(String scheme) {
        final Uri myUri = Uri.parse(scheme);
        final Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(myUri);
        getCurrentActivity().startActivity(intent);
    }
}
