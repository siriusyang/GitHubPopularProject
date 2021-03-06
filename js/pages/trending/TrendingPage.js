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
import GitHubTrending from 'GitHubTrending';
import Toast, {DURATION} from 'react-native-easy-toast'
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view"
import Consts from "../utils/Consts"
import ArrayUtils from "../utils/ArrayUtils"
import DetailPage from "../DetailPage"
export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: ["react", "java"]
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
                    title={Consts.TRENDING}
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
        let time = "since=daily"
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?${time}`)
            .then(json => {
                let jsdata = json;
                AsyncStorage.getItem(Consts.FAVORITE_TRENDING).then(value => {
                    let trendingJsonData = JSON.parse(value === null ? "[]" : value);
                    jsdata.map((item, i) => {
                        let index2 = ArrayUtils.indexOfTrending(trendingJsonData, item);
                        if (index2 > -1) {
                            jsdata[i]["favorited"] = true;
                        } else {
                            jsdata[i]["favorited"] = false;
                        }
                    })
                    this.setState({
                        isLoading: false,
                        dataSource: this.state.dataSource.cloneWithRows(jsdata)

                    })
                })
            }).catch((error) => {
            this.setState({
                isLoading: false,
            });
            console.error(error);
        }).done();


    }

    handleRefresh = () => {
        this.loadData();
    }
    handleProjectSelect = (item) => {
        this.props.navigator.push({title: DetailPage, params: {news_title: item.fullName, url: `https://www.github.com${item.url}`}})

    }
    handleFavoriteProjectSelect = (item) => {
        console.log(JSON.stringify(item))
        AsyncStorage.getItem(Consts.FAVORITE_TRENDING).then(value => {
            let favoriteJsonData = JSON.parse(value === null ? "[]" : value);
            let jsData = ArrayUtils.clone(this.state.dataSource._dataBlob.s1);
            let index = ArrayUtils.indexOfTrending(jsData, item);
            let index2 = ArrayUtils.indexOfTrending(favoriteJsonData, item);
            if (index2 > -1) {
                favoriteJsonData.splice(index2, 1);
                if (index > -1) {
                    jsData[index]["favorited"] = false;
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(jsData),
                });

                AsyncStorage.setItem(Consts.FAVORITE_TRENDING, JSON.stringify(favoriteJsonData))
                    .then(() => {
                        this.refs.toast.show("取消收藏", DURATION.LENGTH_LONG);
                        DeviceEventEmitter.emit(Consts.FAVORITE);
                    }).catch((e) => console.log(e.message));
            } else {
                item["favorited"] = true;
                favoriteJsonData.push(item);
                if (index > -1) {
                    jsData[index]["favorited"] = true;

                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(jsData),
                });
                AsyncStorage.setItem(Consts.FAVORITE_TRENDING, JSON.stringify(favoriteJsonData))
                    .then(() => {
                        this.refs.toast.show("收藏成功", DURATION.LENGTH_LONG);
                        DeviceEventEmitter.emit(Consts.FAVORITE);
                    }).catch((e) => console.log(e.message));
            }
        }).catch((e) => console.log(e.message));

    }

    render() {
        return (<View style={{flex: 1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={rowSource => {
                          return <TrendingProjectRow item={rowSource}
                                                     onSelect={() => this.handleProjectSelect(rowSource)}
                                                     onPressFavorite={() => this.handleFavoriteProjectSelect(rowSource)}/>;
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
        this.listener = DeviceEventEmitter.addListener(Consts.FAVORITE_TRENDING, (n) => {
            console.log("dhdhjdsbhbsdh")
            let jsData = ArrayUtils.clone(this.state.dataSource._dataBlob.s1);
            let index = ArrayUtils.indexOfTrending(jsData, n);
            if (index > -1) {
                jsData[index]["favorited"] = false;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(jsData)

                })
            }
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