/**
 * Created by sirius on 2017-4-13.
 */
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
    AsyncStorage,
    View
} from 'react-native';
import NavigationBar from "../../component/NavigationBar"
import Toast, {DURATION} from 'react-native-easy-toast'
import CheckBox from "react-native-check-box";
var STORAGE_KEY = 'key_map';
export default class CustomKeyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {"name": "android", "isCheck": true},
                {"name": "ios", "isCheck": false},
                {"name": "java", "isCheck": false},
                {"name": "react", "isCheck": false},
                {"name": "javascript", "isCheck": false}
            ],
        };
    }

    back = () => {
        this.props.navigator.pop();
    }
    save = () => {
        console.log(`save:${JSON.stringify(this.state.data)}`)
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.data))
            .then(() => {
                this.refs.toast.show("保存成功");
            });
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
    onClick = (data) => {
        data.isCheck = !data.isCheck;
        console.log(`click:${JSON.stringify(this.state.data)}`)
    }

    renderCheckBox(data) {
        var leftText = data.name;
        return <CheckBox
            style={{flex: 1, padding: 10,}}
            onClick={() => this.onClick(data)}
            isChecked={data.isCheck}
            leftText={leftText}
            unCheckedImage={<Image source={require('../../../res/images/ic_check_box_outline_blank.png')}
                                   style={styles.checkbox}/>}
            checkedImage={<Image source={require('../../../res/images/ic_check_box.png')} style={styles.checkbox}/>}
        />;
    }

    renderViews = () => {
        let views = [];
        let temp = this.state.data.length % 2;
        let size = 0;
        size = this.state.data.length / 2;

        for (let i = 0; i < size; i = i + 2) {
            views.push(<View key={`view_${i}`} style={{flexDirection: 'row',}}>
                    { this.renderCheckBox(this.state.data[i])}
                    {this.renderCheckBox(this.state.data[i + 1])}

                </View>
            );
        }
        if (temp !== 0) {
            views.push(<View key={`view_${this.state.data.length - 1}`} style={{flexDirection: 'row',}}>
                    {
                        this.renderCheckBox(this.state.data[this.state.data.length - 1])
                    }
                    <View style={{flex: 1, padding: 10,}}></View>
                </View>
            );
        }
        return views;
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={" 自定义分类"}
                    rightButton={this.getRightButton()}
                    leftButton={this.getLeftButton()}
                />
                <View>
                    {this.renderViews()}
                </View>
                <Toast ref="toast"/>
            </View>
        );
    }

    componentDidMount() {
        //加载本地数据
        AsyncStorage.getItem(STORAGE_KEY)
            .then(value => {
                //有用户数据，选中该选中CheckBox
                if (value !== null) {
                    console.log(`read:${value}`)
                    this.setState({data: JSON.parse(value)});
                }
            });
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
    checkbox: {
        tintColor: "#63B8FF"
    }
});