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
import codePush from 'react-native-code-push'
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

    componentDidMount() {
        codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix: '\n\n更新内容：\n',
                title: '更新',
                mandatoryUpdateMessage: '',
                mandatoryContinueButtonLabel: '更新',
            },
            mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: 'FXU2FKU4IpCwO0JWx-0HqI_ExhZ94yZ5J6DAG',
        });
    }
}