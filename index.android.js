/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import NavigatorApp from "./js/pages/NavigatorApp"
export default class GitHubPopularProject extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigatorApp/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AppRegistry.registerComponent('GitHubPopularProject', () => GitHubPopularProject);
