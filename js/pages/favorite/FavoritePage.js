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
    ListView,
    RefreshControl,
    AsyncStorage,
    DeviceEventEmitter,
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import TrendingProjectRow from "../../component/TrendingProjectRow"
import PopularProjectRow from "../../component/PopularProjectRow"
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view"
import Toast, {DURATION} from 'react-native-easy-toast'
import DetailPage from "../DetailPage"
import Consts from "../utils/Consts"
import ArrayUtils from "../utils/ArrayUtils"
export default class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [Consts.HOT, Consts.TRENDING]
        };
    }

    getRightButton = () => {
        return <View style={{flexDirection: "row"}}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Image source={require('../../../res/images/ic_more_vert_white_48pt.png')}
                       style={{width: 24, height: 24}}/>
            </TouchableOpacity>
        </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={Consts.FAVORITE}
                    rightButton={this.getRightButton()}
                />
                <ScrollableTabView
                    tabBarPosition='top'
                    tabBarActiveTextColor="#63B8FF"
                    tabBarInactiveTextColor='#7F7F7F'
                    tabBarUnderlineColor="#63B8FF"
                    tabBarUnderlineStyle={{backgroundColor: "#63B8FF"}}
                >
                    {
                        this.state.languages.map((item, i) => {
                            return <TabView key={`item_${i}`} tabLabel={item} {...this.props}/>
                        })
                    }
                </ScrollableTabView>
            </View>
        );
    }
}

class TabView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            dataSource: ds,
        };
    }

    loadData = () => {
        this.setState({isLoading: true});
        let params = '';
        if (this.props.tabLabel === Consts.HOT) {
            params = Consts.FAVORITE_POPULAR;
        } else {
            params = Consts.FAVORITE_TRENDING;
        }

        AsyncStorage.getItem(params).then(value => {
            let favoriteJsonData = JSON.parse(value == "" ? "{}" : value);
            this.setState({
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(favoriteJsonData),
            })
        }).catch((e) => {
            console.log(e.message);
            this.setState({
                isLoading: false,
            })
        });
    }

    handleRefresh = () => {
        this.loadData();
    }
    handleProjectSelect = (item) => {
        if (this.props.tabLabel === Consts.HOT) {
            this.props.navigator.push({title: DetailPage, params: {news_title: item.full_name, url: item.html_url}})
        } else {
            this.props.navigator.push({title: DetailPage, params: {news_title: item.fullName, url: `https://www.github.com${item.url}`}})
        }


    }
    handleFavoriteProjectSelect = (item) => {
        let params = '';
        let index = -1;

        let jsData = ArrayUtils.clone(this.state.dataSource._dataBlob.s1);

        if (this.props.tabLabel === Consts.HOT) {
            params = Consts.FAVORITE_POPULAR;
            index = ArrayUtils.indexof(jsData, item);
        } else {
            params = Consts.FAVORITE_TRENDING;
            index = ArrayUtils.indexOfTrending(jsData, item);
        }
        if (index > -1) {
            jsData.splice(index, 1);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(jsData),
            });
            AsyncStorage.setItem(params, JSON.stringify(jsData))
                .then(() => {
                    DeviceEventEmitter.emit(params, item)
                    this.refs.toast.show("取消收藏");
                }).catch((e) => console.log(e.message));
        }

    }

    render() {
        return (<View style={{flex: 1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={rowSource => {
                          if (this.props.tabLabel === Consts.HOT) {
                              return <PopularProjectRow item={rowSource}
                                                        onSelect={() => this.handleProjectSelect(rowSource)}
                                                        onPressFavorite={() => this.handleFavoriteProjectSelect(rowSource)}/>;
                          } else {
                              return <TrendingProjectRow item={rowSource}
                                                         onSelect={() => this.handleProjectSelect(rowSource)}
                                                         onPressFavorite={() => this.handleFavoriteProjectSelect(rowSource)}/>;
                          }
                      }}
                      refreshControl={<RefreshControl
                          refreshing={this.state.isLoading}
                          onRefresh={this.handleRefresh}
                          tintColor="#63B8FF"
                          title="正在加载..."
                          titleColor="#63B8FF"
                          colors={['#63B8FF']}/>}/>
            <Toast ref="toast"/>
        </View >);
    }

    componentDidMount() {
        this.loadData();
        //添加事件监听
        this.listener = DeviceEventEmitter.addListener(Consts.FAVORITE, () => {
            this.loadData();
        });
    }

    componentWillUnmount() {
        this.listener.remove();
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