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
export default class FavoritePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"收藏"}
                />
                <Text style={styles.welcome}>
                    收藏
                </Text>
                <Text style={styles.instructions}>
                    收藏收藏收藏收藏
                </Text>
                <Text style={styles.instructions}>
                    收藏收藏收藏收藏收藏收藏收藏
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