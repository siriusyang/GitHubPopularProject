/**
 * Created by sirius on 2017-4-13.
 */
/**
 * Created by sirius on 2017-4-13.
 */
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    Platform,
    View
} from 'react-native';

export default class NavigationBar extends Component {
    static propTypes = {
        //验证，不传element组件类型，会报错提示
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
        title: PropTypes.string,
    }
    static defaultProps = {title: "标题"}

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.statusBar}>
                    <StatusBar hidden={false} barStyle="light-content"/>
                </View>
                <View style={styles.nav}>
                    <View style={styles.left}>
                        {this.props.leftButton}
                    </View>
                    <View style={styles.mid}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>
                    <View style={styles.right}>
                        {this.props.rightButton}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"column"
    },
    statusBar: {
        height: Platform.OS === 'ios' ? 20 : 0
    },
    nav: {
        flexDirection: "row",
        alignItems: "center",
        height:48,
        backgroundColor:"#63B8FF",
    },
    mid: {
        flex: 1,
        justifyContent:"center",
/*        backgroundColor:"#ff0000",*/
    },
    left: {
        flex: 1,
        flexDirection: "row",
        justifyContent:"flex-start",
 /*       backgroundColor:"#00ff00",*/
    },
    right: {
        flex: 1,
        flexDirection: "row",
        justifyContent:"flex-end",
    /*    backgroundColor:"#0000ff",*/
    },

    title: {
        fontSize: 16,
        textAlign: 'center',
        color:"#fff"
    },
});