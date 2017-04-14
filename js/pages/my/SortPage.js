/**
 * Created by sirius on 2017-4-14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    TouchableHighlight,
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import SortableListView from "react-native-sortable-listview";
import Toast, {DURATION} from 'react-native-easy-toast'

var STORAGE_KEY = 'key_map';
export default class SortPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
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
            <TouchableOpacity activeOpacity={0.7} onPress={this.save}>
                <Text style={{color: "#fff", fontSize: 16}}> 保存 </ Text >
            </TouchableOpacity  >
        </View>
    }
    back = () => {
        this.props.navigator.pop();
    }
    save = () => {
        console.log(`save_sort:${JSON.stringify(this.state.data)}`)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.data))
            .then(() => {
                this.refs.toast.show("保存成功");
            }).catch((e) => console.log(e.message));
    }


    render() {
        return <View style={{flex: 1}}>
            <NavigationBar
                title={"分类排序"}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />

            <SortableListView
                style={{flex: 1}}
                data={this.state.data}
                order={Object.keys(this.state.data)}
                onRowMoved={e => {
                    this.state.data.splice(e.to, 0, this.state.data.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row => <RowComponent data={row}/>}
            />
            <Toast ref="toast"/>
        </View>
    }

    componentDidMount() {
        //加载本地数据
        AsyncStorage.getItem(STORAGE_KEY)
            .then(value => {
                //有用户数据，选中该选中CheckBox
                if (value !== null) {
                    console.log(`read_sort:${value}`)
                    this.setState({data: JSON.parse(value)});

                }
            });
    }
}

let RowComponent = React.createClass({
    render: function () {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500}
                style={{padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth: 1, borderColor: '#eee'}}
                {...this.props.sortHandlers}
            >
                <Text>{this.props.data.name}</Text>
            </TouchableHighlight>
        );
    }
});