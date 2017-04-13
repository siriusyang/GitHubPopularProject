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
export default class TrendingPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"趋势"}
                />
                <Text style={styles.welcome}>
                    趋势
                </Text>
                <Text style={styles.instructions}>
                    趋势趋势趋势趋势趋势趋势趋势趋势趋势趋势趋势
                </Text>
                <Text style={styles.instructions}>
                    趋势趋势趋势趋势趋势趋势趋势趋势
                </Text>
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});