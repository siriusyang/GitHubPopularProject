/**
 * Created by sirius on 2017-4-13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    WebView,
    RefreshControl,
    View
} from 'react-native';
import NavigationBar from "../component/NavigationBar"
export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: ["Android", "IOS", "Java", "React", "JS"]
        };
    }
    getLeftButton = () => {
        return <View>
            <TouchableOpacity activeOpacity={0.7} onPress={this.back}>
                <Image style={{width: 24, height: 24, marginLeft: 5}}
                       source={require("../../res/images/ic_arrow_back_white_36pt.png")}/>
            </TouchableOpacity  >
        </View>
    }
    getRightButton = () => {
        return <View style={{flexDirection: "row"}}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Image source={require('../../res/images/ic_more_vert_white_48pt.png')}
                       style={{width: 24, height: 24}}/>
            </TouchableOpacity>
        </View>;
    }
    back = () => {
        this.props.navigator.pop();
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.news_title}
                    leftButton={this.getLeftButton()}
                    rightButton={this.getRightButton()}
                />
                <WebView
                    style={styles.webView}
                    source={{uri: this.props.url}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
});