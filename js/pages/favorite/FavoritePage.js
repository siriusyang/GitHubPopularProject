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
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import TrendingProjectRow from "../../component/TrendingProjectRow"
import PopularProjectRow from "../../component/PopularProjectRow"
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view"
import GitHubTrending from 'GitHubTrending';
import Toast, {DURATION} from 'react-native-easy-toast'
const HOT = "android";
import Consts from "../utils/Consts"
import ArrayUtils from "../utils/ArrayUtils"
export default class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [HOT, "java"]
        };
    }

    getRightButton = () => {
        return <View style={{flexDirection: "row"}}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Image source={require('../../../res/images/ic_search_white_48pt.png')}
                       style={{width: 24, height: 24}}/>
            </TouchableOpacity>

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
                    title={"收藏"}
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
                            return <TabView key={`item_${i}`} tabLabel={item}/>
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
        if (this.props.tabLabel === HOT) {
            AsyncStorage.getItem(Consts.FAVORITE_POPULAR).then(value => {
                let favoriteJsonData = JSON.parse(value == "" ? "{}" : value);
                this.setState({
                    isLoading: false,
                    dataSource:this.state.dataSource.cloneWithRows(favoriteJsonData),

                })
            }).catch((e) =>{console.log(e.message);
                this.setState({
                    isLoading: false,
                })});

        } else {
            time = "since=daily"
            new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?${time}`)
                .then(json => this.setState({
                    isLoading: false,
                    dataSource:this.state.dataSource.cloneWithRows(json),
                })).catch((error) => {
                console.error(error);
            }).done();

        }
    }

    handleRefresh = () => {
        this.loadData();
    }
    handleProjectSelect = (item) => {
        this.props.navigator.push({title: DetailPage, params: {news_title: item.full_name, url: item.html_url}})

    }
    handleFavoriteProjectSelect = (item) => {
        let jsData=ArrayUtils.clone(this.state.dataSource._dataBlob.s1);
        let index = ArrayUtils.indexof(jsData, item);
        if (index> -1) {
            jsData.splice(index, 1);
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(jsData),
            });
            AsyncStorage.setItem(Consts.FAVORITE_POPULAR, JSON.stringify(jsData))
                .then(() => {
                    this.refs.toast.show("取消收藏");
                }).catch((e) => console.log(e.message));

        }

    }

    render() {
        return (<View style={{flex: 1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={rowSource => {
                          if (this.props.tabLabel === HOT) {
                              return <PopularProjectRow item={rowSource}  onSelect={() => this.handleProjectSelect(rowSource)}
                                                        onPressFavorite={() => this.handleFavoriteProjectSelect(rowSource)}/>;
                          } else {
                              return <TrendingProjectRow item={rowSource}/>;
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

    componentDidMount = () => {
        this.loadData()
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