/**
 * Created by sirius on 2017-4-13.
 */
/**
 * Created by sirius on 2017-4-13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import CustomKeyPage from "./CustomKeyPage"
export default class MyPage extends Component {
    goToCustomKeyPage = () => {
        this.props.navigator.push({
            title: CustomKeyPage
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"我的"}
                />
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.welcome} onPress={this.goToCustomKeyPage}>
                        自定义分类
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});