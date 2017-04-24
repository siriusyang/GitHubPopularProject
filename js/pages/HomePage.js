/**
 * Created by sirius on 2017-4-13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import TabNavigator from "react-native-tab-navigator"
import PopularPage from "./PopularPage"
import MyPage from "./my/MyPage"
import TrendingPage from "./trending/TrendingPage"
import FavoritePage from "./favorite/FavoritePage"
import Consts from "./utils/Consts"
export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'popular',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'popular'}
                        title={Consts.HOT}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../res/images/ic_popular.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, , {tintColor: '#63B8FF'}]}
                                                         source={require("../../res/images/ic_popular.png")}/>}
                        onPress={() => this.setState({selectedTab: 'popular'})}
                    >
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'trending'}
                        title={Consts.TRENDING}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../res/images/ic_trending.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, , {tintColor: '#63B8FF'}]}
                                                         source={require("../../res/images/ic_trending.png")}/>}
                        onPress={() => this.setState({selectedTab: 'trending'})}
                    >
                        <TrendingPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'favorite'}
                        title={Consts.FAVORITE}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../res/images/ic_favorite.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, , {tintColor: '#63B8FF'}]}
                                                         source={require("../../res/images/ic_favorite.png")}/>}
                        onPress={() => this.setState({selectedTab: 'favorite'})}
                    >
                        <FavoritePage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'my'}
                        title={Consts.MY}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon}
                                                 source={require("../../res/images/ic_my.png")}/>}
                        renderSelectedIcon={() => <Image style={[styles.icon, , {tintColor: '#63B8FF'}]}
                                                         source={require("../../res/images/ic_my.png")}/>}
                        onPress={() => this.setState({selectedTab: 'my'})}
                    >
                        <MyPage {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigator: {},
    tabText: {
        color: "#7F7F7F",
        fontSize: 14,
    },
    selectedTabText: {
        color: "#63B8FF",
        fontSize: 14,
    },
    icon: {
        width: 20,
        height: 20,
    },
});