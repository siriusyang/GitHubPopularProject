/**
 * Created by sirius on 2017-4-13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Navigator,
    View
} from 'react-native';
import HomePage from "./HomePage"
export default class NavigatorApp extends Component {
    render() {
        return (

            <Navigator
                initialRoute={{title: HomePage}}
                navigationBar={this.navigationBar}
                renderScene={(route, navigator) => {
                    let Component = route.title;
                    return <Component navigator={navigator} {...route.params}/>
                }}
                configureScene={(route, navigator) => {
                    return Navigator.SceneConfigs.HorizontalSwipeJump
                }}
            />

        );
    }
}