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
const CUSTOM_PAGE = 'CustomKeyPage';
const SORT_PAGE = 'CustomKeyPage';
export default class MyPage extends Component {
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
    static defaultProps = {
        items: [{
            'name': '自定义分类2',
            'image': require('../../../res/images/ic_custom_language.png'),
            'press': CUSTOM_PAGE,
        }, {
            'name': '分类排序6',
            'image': require('../../../res/images/ic_swap_vert.png'),
            'press': SORT_PAGE
        }]
    }
    press = (type) => {
        if (type === SORT_PAGE) {
            this.sortPage();
        } else if (type === CUSTOM_PAGE) {
            this.goToCustomKeyPage();
        }
    }

    rendItem = (item, i) => {
        return < View style={styles.items} key={`key${i}`}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.press(item.press)} style={{flex: 1, height: 40}}>
                <View style={styles.welcome}>

                    <Image source={item.image}
                           style={{width: 22, height: 22, tintColor: '#63B8FF'}}/>
                    <Text style={{marginLeft: 5, flex: 1}}>
                        {item.name}
                    </Text>
                    <Image source={require('../../../res/images/ic_tiaozhuan.png')}
                           style={{width: 22, height: 22, tintColor: '#63B8FF'}}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={Consts.MY}
                />
                <ScrollView style={{flex: 1}}>
                    {this.props.items.map((item, i) => {
                        return this.rendItem(item, i);
                    })}

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
        paddingLeft: 5,
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