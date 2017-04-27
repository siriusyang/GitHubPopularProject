/**
 * Created by sirius on 2017-4-26.
 */
import {NativeModules} from 'react-native';

export default class AndroidNavigator {
    static OpenActivity(path, parameters) {
        // AndroidNavigator.OpenActivity("ww://android/TowActivity?message=kkkkk");
        NativeModules.AndroidRoute.OpenActivity('ww', 'android', path, parameters);
    }
    static OpenActivitySimple() {
        // AndroidNavigator.OpenActivity("ww://android/TowActivity?parameters=kkkkk");
        NativeModules.AndroidRoute.OpenActivitySimple("ww://android/TowActivity?parameters=kkkkk");
    }
}
