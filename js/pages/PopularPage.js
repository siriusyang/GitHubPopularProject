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
    View
} from 'react-native';
import NavigationBar from "../component/NavigationBar"
import ProjectItem from "../component/ProjectItem"
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view"
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: ["Android", "IOS", "Java", "React", "JS"]
        };
    }

    getRightButton = () => {
        return <View style={{flexDirection: "row"}}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Image source={require('../../res/images/ic_search_white_48pt.png')} style={{width: 24, height: 24}}/>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.7}>
                <Image source={require('../../res/images/ic_more_vert_white_48pt.png')}
                       style={{width: 24, height: 24}}/>
            </TouchableOpacity>
        </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"热门"}
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
        this.state = {
            isLoading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    loadData = () => {
        this.setState({isLoading: true});
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`)
            .then(obj => obj.json())
            .then(json => this.setState({
                isLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(json.items)

            })).catch((error) => {
            console.error(error);
        }).done();
    }
    handleRefresh = () => {
        this.loadData();
    }

    render() {
        return <View style={{flex: 1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={rowSource => <ProjectItem data={rowSource}/>}
                      refreshControl={<RefreshControl
                          refreshing={this.state.isLoading}
                          onRefresh={this.handleRefresh}
                          tintColor="#63B8FF"
                          title="正在加载..."
                          titleColor="#63B8FF"
                          colors={['#63B8FF']}/>}/>

        </View >
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