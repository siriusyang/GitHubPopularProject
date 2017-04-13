/**
 * Created by sirius on 2017-4-13.
 */
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
import Toast, {DURATION} from 'react-native-easy-toast'

export default class CustomKeyPage extends Component {
    back = () => {
        this.props.navigator.pop();
    }
    save = () => {
        //TODO 保存
        this.refs.toast.show("保存");
    }
    getLeftButton = () => {
        return <View>
            <TouchableOpacity activeOpacity={0.7} onPress={this.back}>
                <Image style={{width: 24, height: 24, marginLeft: 5}}
                       source={require("../../../res/images/ic_arrow_back_white_36pt.png")}/>
            </TouchableOpacity  >
        </View>
    }
    getRightButton = () => {
        return <View>
            <TouchableOpacity activeOpacity={0.7}  onPress={this.save}>
                <Text style={{color: "#fff", fontSize: 16}}> 保存 </ Text >
            </TouchableOpacity  >
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={" 自定义分类"}
                    rightButton={this.getRightButton()}
                    leftButton={this.getLeftButton()}
                />
                <Text style={styles.welcome}>
                    自定义分类
                </Text>
                <Text style={styles.instructions}>
                    自定义分类自定义分类自定义分类
                </Text>
                <Text style={styles.instructions}>
                    自定义分类自定义分类自定义分类,{'\n'}
                    自定义分类自定义分类自定义分类自定义分类自定义分类
                </Text>
                <Toast ref="toast"/>
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