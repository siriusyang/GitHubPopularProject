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
    ScrollView,
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import CustomKeyPage from "./CustomKeyPage"
import SortPage from "./SortPage"
import Consts from "../utils/Consts"
export default class MyPage extends Component {
    static defaultProps = {
        items: [{
            'name': '自定义分类',
            'image': '../../../res/images/ic_custom_language.png',
            'onPress': this.goToCustomKeyPag
        }, {
            'name': '分类排序',
            'image': '../../../res/images/ic_swap_vert.png', 'onPress': this.sortPage
        }]
    }

    goToCustomKeyPage = () => {
        this.props.navigator.push({
            title: CustomKeyPage
        });
    }
    sortPage = () => {
        this.props.navigator.push({
            title: SortPage
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={Consts.MY}
                />
                <ScrollView style={{flex: 1}}>
                    < View style={styles.items}>
                        <TouchableOpacity activeOpacity={0.7} onPress={this.goToCustomKeyPage} style={{flex: 1,   height:40}}>
                            <View style={styles.welcome}>

                                <Image source={require('../../../res/images/ic_custom_language.png')}
                                       style={{width: 22, height: 22, tintColor: '#63B8FF'}}/>
                                <Text style={{marginLeft: 5, flex: 1}}>
                                    {'自定义分类'}
                                </Text>
                                <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                       style={{width: 22, height: 22, tintColor: '#63B8FF'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    < View style={styles.items}>
                        <TouchableOpacity activeOpacity={0.7} onPress={this.sortPage} style={{flex: 1,   height:40,}}>
                            <View style={styles.welcome}>

                                <Image source={require('../../../res/images/ic_swap_vert.png')}
                                       style={{width: 22, height: 22, tintColor: '#63B8FF'}}/>
                                <Text style={{marginLeft: 5, flex: 1}}>
                                    {'分类排序'}
                                </Text>
                                <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                                       style={{width: 22, height: 22, tintColor: '#63B8FF'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        items: {
            flexDirection: 'row',
            backgroundColor: '#FFF',
            marginLeft: 5,
            marginRight: 5,
            paddingLeft:5,
            marginVertical: 5,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 2,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowRadius: 1, //阴影半径
            shadowOpacity: 0.4,
            elevation: 2 //Android 投影
        },
        welcome: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',

        },

    });